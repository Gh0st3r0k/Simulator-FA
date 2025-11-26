module Pages.Editor exposing (Model, Msg(..), init, update, view)

import Html as H exposing (Html, button, div, h2, textarea, text)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (onClick, onInput, stopPropagationOn)
import Json.Decode as Decode
import Json.Encode as Encode
import Svg as S
import Svg.Attributes as SA
import Svg.Events as SE
import Theme exposing (Theme, panelBg, panelBorder, textColor)
import I18n exposing (Lang)
import String


-- MODEL


type alias Model =
    { states : List State
    , transitions : List Transition
    , nextId : Int
    , dragging : Maybe Int
    , panning : Maybe PanState
    , panX : Float
    , panY : Float
    , selected : Maybe Int
    , mode : Mode
    , transitionFrom : Maybe Int
    , transitionLabel : String
    , codeDraft : String
    }


type alias State =
    { id : Int
    , x : Float
    , y : Float
    , accepting : Bool
    , isStart : Bool
    }


type alias Transition =
    { id : Int
    , from : Int
    , to : Int
    , label : String
    }


type alias PanState =
    { startX : Float
    , startY : Float
    , originX : Float
    , originY : Float
    }


type Mode
    = AddState
    | AddTransition
    | MoveState


init : Model
init =
    { states = []
    , transitions = []
    , nextId = 1
    , dragging = Nothing
    , panning = Nothing
    , panX = 0
    , panY = 0
    , selected = Nothing
    , mode = AddState
    , transitionFrom = Nothing
    , transitionLabel = ""
    , codeDraft = ""
    }



-- MESSAGES


type Msg
    = CanvasMouseDown String Int Float Float
    | MovePointer Float Float
    | CanvasMouseUp Int
    | StartDrag Int
    | DoubleClickState Int
    | SelectState Int
    | DeleteState Int
    | SetMode Mode
    | SetTransitionLabel String
    | ImportCode
    | ExportCode
    | CodeEdited String
    | NoOp


-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        CanvasMouseDown targetTag button cx cy ->
            case button of
                1 ->
                    ( { model
                        | panning =
                            Just
                                { startX = cx
                                , startY = cy
                                , originX = model.panX
                                , originY = model.panY
                                }
                      }
                    , Cmd.none
                    )

                0 ->
                    case model.mode of
                        AddState ->
                            if targetTag /= "svg" then
                                ( model, Cmd.none )

                            else
                                let
                                    ( wx, wy ) = screenToWorld model cx cy

                                    newState =
                                        { id = model.nextId, x = wx, y = wy, accepting = False, isStart = False }
                                in
                                ( { model
                                    | states = model.states ++ [ newState ]
                                    , nextId = model.nextId + 1
                                    , selected = Just newState.id
                                    , dragging = Nothing
                                    , transitionFrom = Nothing
                                  }
                                , Cmd.none
                                )

                        _ ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        MovePointer mx my ->
            let
                updatedPan =
                    case model.panning of
                        Nothing ->
                            model

                        Just pan ->
                            { model
                                | panX = pan.originX + (mx - pan.startX)
                                , panY = pan.originY + (my - pan.startY)
                            }

                updatedStates =
                    case updatedPan.dragging of
                        Nothing ->
                            updatedPan

                        Just sid ->
                            let
                                ( wx, wy ) = screenToWorld updatedPan mx my

                                move s = if s.id == sid then { s | x = wx, y = wy } else s
                            in
                            { updatedPan | states = List.map move updatedPan.states }
            in
            ( updatedStates, Cmd.none )

        CanvasMouseUp button ->
            let
                clearedPan =
                    if button == 1 then
                        { model | panning = Nothing }

                    else
                        model

                clearedDrag =
                    if button == 0 then
                        { clearedPan | dragging = Nothing }

                    else
                        clearedPan
            in
            ( clearedDrag, Cmd.none )

        StartDrag sid ->
            case model.mode of
                MoveState ->
                    ( { model | dragging = Just sid, selected = Just sid }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        DoubleClickState sid ->
            let
                toggle s = if s.id == sid then { s | accepting = not s.accepting } else s
            in
            ( { model | states = List.map toggle model.states }, Cmd.none )

        SelectState sid ->
            case model.mode of
                AddTransition ->
                    case model.transitionFrom of
                        Nothing ->
                            ( { model | transitionFrom = Just sid, selected = Just sid }, Cmd.none )

                        Just fromId ->
                            if fromId == sid then
                                ( { model | transitionFrom = Nothing, selected = Just sid }, Cmd.none )

                            else
                                let
                                    label =
                                        let
                                            trimmed = String.trim model.transitionLabel
                                        in
                                        if String.isEmpty trimmed then
                                            "λ"

                                        else
                                            trimmed

                                    newTransition =
                                        { id = model.nextId
                                        , from = fromId
                                        , to = sid
                                        , label = label
                                        }
                                in
                                ( { model
                                    | transitions = model.transitions ++ [ newTransition ]
                                    , nextId = model.nextId + 1
                                    , transitionFrom = Nothing
                                    , selected = Nothing
                                  }
                                , Cmd.none
                                )

                _ ->
                    ( { model | selected = Just sid }, Cmd.none )

        DeleteState sid ->
            let
                statesFiltered = List.filter (\s -> s.id /= sid) model.states
                transFiltered = List.filter (\t -> t.from /= sid && t.to /= sid) model.transitions
            in
            ( { model | states = statesFiltered, transitions = transFiltered, selected = Nothing }, Cmd.none )

        SetMode newMode ->
            ( { model
                | mode = newMode
                , transitionFrom = Nothing
                , dragging = Nothing
              }
            , Cmd.none
            )

        SetTransitionLabel label ->
            ( { model | transitionLabel = label }, Cmd.none )

        ImportCode ->
            case Decode.decodeString decodeAutomaton model.codeDraft of
                Ok ( ss, ts ) ->
                    let
                        maxId = List.maximum (List.map .id ss ++ List.map .id ts) |> Maybe.withDefault 0
                    in
                    ( { model | states = ss, transitions = ts, nextId = maxId + 1 }, Cmd.none )

                Err _ -> ( model, Cmd.none )

        ExportCode ->
            let
                json = Encode.encode 4 (encodeAutomaton model.states model.transitions)
            in
            ( { model | codeDraft = json }, Cmd.none )

        CodeEdited s ->
            ( { model | codeDraft = s }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )



-- JSON helpers


encodeState : State -> Encode.Value
encodeState s =
    Encode.object
        [ ( "id", Encode.int s.id )
        , ( "x", Encode.float s.x )
        , ( "y", Encode.float s.y )
        , ( "accepting", Encode.bool s.accepting )
        , ( "isStart", Encode.bool s.isStart )
        ]


encodeTransition : Transition -> Encode.Value
encodeTransition t =
    Encode.object
        [ ( "id", Encode.int t.id )
        , ( "from", Encode.int t.from )
        , ( "to", Encode.int t.to )
        , ( "label", Encode.string t.label )
        ]


encodeAutomaton : List State -> List Transition -> Encode.Value
encodeAutomaton states transitions =
    Encode.object
        [ ( "states", Encode.list encodeState states )
        , ( "transitions", Encode.list encodeTransition transitions )
        ]


decodeAutomaton : Decode.Decoder ( List State, List Transition )
decodeAutomaton =
    Decode.map2 Tuple.pair
        (Decode.field "states" (Decode.list decodeState))
        (Decode.field "transitions" (Decode.list decodeTransition))


decodeState : Decode.Decoder State
decodeState =
    Decode.map5 State
        (Decode.field "id" Decode.int)
        (Decode.field "x" Decode.float)
        (Decode.field "y" Decode.float)
        (Decode.field "accepting" Decode.bool)
        (Decode.field "isStart" Decode.bool)


decodeTransition : Decode.Decoder Transition
decodeTransition =
    -- Decode a serialized transition record into our Transition type
    Decode.map4 Transition
        (Decode.field "id" Decode.int)
        (Decode.field "from" Decode.int)
        (Decode.field "to" Decode.int)
        (Decode.field "label" Decode.string)


screenToWorld : Model -> Float -> Float -> ( Float, Float )
screenToWorld model x y =
    ( x - model.panX, y - model.panY )



-- VIEW


view : { lang : Lang, theme : Theme } -> Model -> Html Msg
view ctx model =
    div [ HA.style "display" "flex", HA.style "gap" "12px", HA.style "color" (textColor ctx.theme) ]
        [ div []
            [ H.h2 [] [ H.text "Editor" ]
            , svgView ctx model
            ]
        , sidePanel ctx model
        ]


svgView ctx model =
    let
        width = 1200
        height = 800
        cursor =
            case model.mode of
                AddState -> "crosshair"
                AddTransition -> "pointer"
                MoveState -> "move"
    in
    S.svg
        [ SA.width (String.fromInt width)
        , SA.height (String.fromInt height)
        , SA.style
            ("border:1px solid "
                ++ panelBorder ctx.theme
                ++ "; background:#0b0b0b10; cursor: "
                ++ cursor
                ++ "; user-select: none; -webkit-user-select: none; -moz-user-select: none;"
            )
        , SE.on "mousedown"
            (Decode.map4 (\tag button x y -> CanvasMouseDown (String.toLower tag) button (toFloat x) (toFloat y))
                (Decode.at [ "target", "tagName" ] Decode.string)
                (Decode.field "button" Decode.int)
                (Decode.field "offsetX" Decode.int)
                (Decode.field "offsetY" Decode.int)
            )
        , SE.on "mousemove"
            (Decode.map2 (\x y -> MovePointer (toFloat x) (toFloat y))
                (Decode.field "offsetX" Decode.int)
                (Decode.field "offsetY" Decode.int)
            )
        , SE.on "mouseup"
            (Decode.map CanvasMouseUp (Decode.field "button" Decode.int))
        ]
        [ S.defs [] [ arrowMarker (textColor ctx.theme) ]
        , S.g
            [ SA.transform
                ("translate(" ++ String.fromFloat model.panX ++ "," ++ String.fromFloat model.panY ++ ")")
            ]
            (List.concat
                [ List.map (viewTransition ctx model) model.transitions
                , List.map (viewState ctx model) model.states
                ]
            )
        ]


viewState ctx model s =
    let
        r = 22
        strokeColor = if s.accepting then "#2ecc71" else (textColor ctx.theme)
        fillColor = if s.isStart then "#fffbe6" else "#ffffff"
        isSelected = model.selected == Just s.id
        strokeWidth = if isSelected then "3" else "2"
        ( highlightFill, highlightStroke ) =
            case ctx.theme of
                Theme.Light ->
                    ( "#7aa2ff33", "#7aa2ff" )

                Theme.Dark ->
                    ( "#f8e71c30", "#f5a623" )

        highlight =
            if isSelected then
                [ S.circle
                    [ SA.cx (String.fromFloat s.x)
                    , SA.cy (String.fromFloat s.y)
                    , SA.r (String.fromInt (r + 4))
                    , SA.fill highlightFill
                    , SA.stroke highlightStroke
                    , SA.strokeWidth "2"
                    , SA.pointerEvents "none"
                    ]
                    []
                ]

            else
                []
    in
    S.g []
        (highlight
            ++ [ S.circle
                    [ SA.cx (String.fromFloat s.x)
                    , SA.cy (String.fromFloat s.y)
                    , SA.r (String.fromInt r)
                    , SA.fill fillColor
                    , SA.stroke strokeColor
                    , SA.strokeWidth strokeWidth
                    , stopPropagationOn "mousedown"
                        (Decode.map3
                            (\button _ _ ->
                                if button == 0 then
                                    ( StartDrag s.id, True )

                                else
                                    ( NoOp, True )
                            )
                            (Decode.field "button" Decode.int)
                            (Decode.field "offsetX" Decode.int)
                            (Decode.field "offsetY" Decode.int)
                        )
                    , stopPropagationOn "dblclick"
                        (Decode.map
                            (\button ->
                                if button == 0 then
                                    ( DoubleClickState s.id, True )

                                else
                                    ( NoOp, True )
                            )
                            (Decode.field "button" Decode.int)
                        )
                    , stopPropagationOn "click"
                        (Decode.map
                            (\button ->
                                if button == 0 then
                                    ( SelectState s.id, True )

                                else
                                    ( NoOp, True )
                            )
                            (Decode.field "button" Decode.int)
                        )
                    ]
                    []
               , (if s.accepting then
                    S.circle [ SA.cx (String.fromFloat s.x), SA.cy (String.fromFloat s.y), SA.r (String.fromInt (r - 6)), SA.fill "none", SA.stroke strokeColor, SA.strokeWidth "2", SA.pointerEvents "none" ] []
                  else
                    S.text_ [] []
                 )
               , S.text_
                    [ SA.x (String.fromFloat (s.x - 6))
                    , SA.y (String.fromFloat (s.y + 6))
                    , SA.fontSize "14"
                    , SA.fill (textColor Theme.Light)
                    , SA.style "user-select: none; -webkit-user-select: none; -moz-user-select: none;"
                    , SA.pointerEvents "none"
                    ]
                    [ S.text (String.fromInt s.id) ]
               ]
        )


viewTransition ctx model t =
    case ( getStateById t.from model.states, getStateById t.to model.states ) of
        ( Just a, Just b ) ->
            let
                r = 22
                ( dx, dy ) = ( b.x - a.x, b.y - a.y )
                dist = sqrt (dx * dx + dy * dy)
                safe = if dist < 0.001 then 0.001 else dist
                ux = dx / safe
                uy = dy / safe
                startX = a.x + ux * (toFloat r)
                startY = a.y + uy * (toFloat r)
                endX = b.x - ux * (toFloat r + 6)
                endY = b.y - uy * (toFloat r + 6)
                midX = (startX + endX) / 2
                midY = (startY + endY) / 2
            in
            S.g []
                [ S.line
                    [ SA.x1 (String.fromFloat startX), SA.y1 (String.fromFloat startY)
                    , SA.x2 (String.fromFloat endX), SA.y2 (String.fromFloat endY)
                    , SA.stroke (textColor ctx.theme)
                    , SA.strokeWidth "2"
                    , SA.markerEnd "url(#arrowhead)"
                    ]
                    []
                , S.text_
                    [ SA.x (String.fromFloat (midX + 6))
                    , SA.y (String.fromFloat (midY - 6))
                    , SA.fontSize "12"
                    , SA.fill (textColor ctx.theme)
                    , SA.style "user-select: none; -webkit-user-select: none; -moz-user-select: none;"
                    , SA.pointerEvents "none"
                    ]
                    [ S.text t.label ]
                ]

        _ ->
            S.text_ [] []


getStateById : Int -> List State -> Maybe State
getStateById id states =
    List.head <| List.filter (\s -> s.id == id) states


arrowMarker : String -> S.Svg msg
arrowMarker color =
    S.marker
        [ SA.id "arrowhead"
        , SA.markerWidth "10"
        , SA.markerHeight "7"
        , SA.viewBox "0 0 10 7"
        , SA.refX "10"
        , SA.refY "3.5"
        , SA.orient "auto"
        , SA.markerUnits "strokeWidth"
        ]
        [ S.path
            [ SA.d "M0,0 L0,7 L10,3.5 z"
            , SA.fill color
            ]
            []
        ]


sidePanel ctx model =
    let
        modeButton target label =
            H.button
                [ onClick (SetMode target)
                , HA.style "background" (if model.mode == target then "#2ecc71" else "")
                , HA.style "color" "#000"
                ]
                [ H.text label ]
    in
    div
        [ HA.style "min-width" "320px"
        , HA.style "background" (panelBg ctx.theme)
        , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
        , HA.style "padding" "12px"
        , HA.style "border-radius" "12px"
        ]
        [ H.h2 [] [ H.text "JSON" ]
        , textarea [ rows 18, cols 40, onInput CodeEdited, value model.codeDraft ] []
        , div [ HA.style "margin-top" "8px" ]
            [ H.button [ onClick ImportCode ] [ H.text "Import" ]
            , H.button [ onClick ExportCode, HA.style "margin-left" "8px" ] [ H.text "Export" ]
            ]
        , H.h2 [] [ H.text "Mode" ]
        , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "align-items" "center" ]
            [ modeButton AddState "Create states"
            , modeButton AddTransition "Create transitions"
            , modeButton MoveState "Move states"
            ]
        , H.h2 [] [ H.text "Transitions" ]
        , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "align-items" "center" ]
            [ textarea
                [ rows 1
                , cols 12
                , placeholder "Label"
                , value model.transitionLabel
                , onInput SetTransitionLabel
                , HA.disabled (model.mode /= AddTransition)
                ]
                []
            ]
        , (case ( model.mode, model.transitionFrom ) of
            ( AddTransition, Nothing ) ->
                text "Select a state as the start node"

            ( AddTransition, Just sid ) ->
                div [ HA.style "margin-top" "4px" ]
                    [ text ("From: " ++ String.fromInt sid ++ " → click destination") ]

            _ ->
                text ""
          )
        , H.h2 [] [ H.text "Selected" ]
        , case model.selected of
            Nothing -> div [] [ H.text "None" ]

            Just sid ->
                case getStateById sid model.states of
                    Nothing -> div [] [ H.text "Not found" ]

                    Just s ->
                        div []
                            [ div [] [ H.text ("State: " ++ String.fromInt s.id) ]
                            , div [] [ H.text ("Pos: " ++ String.fromFloat s.x ++ ", " ++ String.fromFloat s.y) ]
                            , div [] [ H.text ("Accepting: " ++ (if s.accepting then "Yes" else "No")) ]
                            , div [] [ H.text ("Start: " ++ (if s.isStart then "Yes" else "No")) ]
                            , div [ HA.style "margin-top" "8px" ]
                                [ H.button [ onClick (DeleteState s.id) ] [ H.text "Delete state" ] ]
                            ]
        ]