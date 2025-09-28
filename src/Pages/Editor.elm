module Pages.Editor exposing (Model, Msg(..), init, update, view)

import Html as H exposing (Html, button, div, h2, textarea, text)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Decode as Decode
import Json.Encode as Encode
import Svg as S
import Svg.Attributes as SA
import Svg.Events as SE
import Theme exposing (Theme, panelBg, panelBorder, textColor)
import I18n exposing (Lang)


-- MODEL


type alias Model =
    { states : List State
    , transitions : List Transition
    , nextId : Int
    , dragging : Maybe Int
    , selected : Maybe Int
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


init : Model
init =
    { states = []
    , transitions = []
    , nextId = 1
    , dragging = Nothing
    , selected = Nothing
    , codeDraft = ""
    }



-- MESSAGES


type Msg
    = CanvasClick Float Float
    | StartDrag Int Float Float
    | DragAt Float Float
    | EndDrag
    | DoubleClickState Int
    | SelectState Int
    | DeleteState Int
    | ImportCode
    | ExportCode
    | CodeEdited String


-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        CanvasClick cx cy ->
            let
                newState =
                    { id = model.nextId, x = cx, y = cy, accepting = False, isStart = False }
            in
            ( { model
                | states = model.states ++ [ newState ]
                , nextId = model.nextId + 1
                , selected = Just newState.id
              }
            , Cmd.none
            )

        StartDrag sid _ _ ->
            ( { model | dragging = Just sid, selected = Just sid }, Cmd.none )

        DragAt mx my ->
            case model.dragging of
                Nothing -> ( model, Cmd.none )
                Just sid ->
                    let
                        move s = if s.id == sid then { s | x = mx, y = my } else s
                    in
                    ( { model | states = List.map move model.states }, Cmd.none )

        EndDrag ->
            ( { model | dragging = Nothing }, Cmd.none )

        DoubleClickState sid ->
            let
                toggle s = if s.id == sid then { s | accepting = not s.accepting } else s
            in
            ( { model | states = List.map toggle model.states }, Cmd.none )

        SelectState sid ->
            ( { model | selected = Just sid }, Cmd.none )

        DeleteState sid ->
            let
                statesFiltered = List.filter (\s -> s.id /= sid) model.states
                transFiltered = List.filter (\t -> t.from /= sid && t.to /= sid) model.transitions
            in
            ( { model | states = statesFiltered, transitions = transFiltered, selected = Nothing }, Cmd.none )

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



-- JSON helpers


encodeState s =
    Encode.object
        [ ( "id", Encode.int s.id )
        , ( "x", Encode.float s.x )
        , ( "y", Encode.float s.y )
        , ( "accepting", Encode.bool s.accepting )
        , ( "isStart", Encode.bool s.isStart )
        ]


encodeTransition t =
    Encode.object
        [ ( "id", Encode.int t.id )
        , ( "from", Encode.int t.from )
        , ( "to", Encode.int t.to )
        , ( "label", Encode.string t.label )
        ]


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
    Decode.map4 Transition
        (Decode.field "id" Decode.int)
        (Decode.field "from" Decode.int)
        (Decode.field "to" Decode.int)
        (Decode.field "label" Decode.string)



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
        width = 800
        height = 600
    in
    S.svg
        [ SA.width (String.fromInt width)
        , SA.height (String.fromInt height)
        , SA.style ("border:1px solid " ++ panelBorder ctx.theme ++ "; background:#0b0b0b10; cursor: crosshair")
        , SE.on "click"
            (Decode.map2 (\x y -> CanvasClick (toFloat x) (toFloat y))
                (Decode.field "offsetX" Decode.int)
                (Decode.field "offsetY" Decode.int)
            )
        , SE.on "mousemove"
            (Decode.map2 (\x y -> DragAt (toFloat x) (toFloat y))
                (Decode.field "offsetX" Decode.int)
                (Decode.field "offsetY" Decode.int)
            )
        , SE.on "mouseup" (Decode.succeed EndDrag)
        ]
        (List.concat
            [ List.map (viewTransition ctx model) model.transitions
            , List.map (viewState ctx) model.states
            ]
        )


viewState ctx s =
    let
        r = 22
        strokeColor = if s.accepting then "#2ecc71" else (textColor ctx.theme)
        fillColor = if s.isStart then "#fffbe6" else "#ffffff"
    in
    S.g []
        [ S.circle
            [ SA.cx (String.fromFloat s.x)
            , SA.cy (String.fromFloat s.y)
            , SA.r (String.fromInt r)
            , SA.fill fillColor
            , SA.stroke strokeColor
            , SA.strokeWidth "2"
            , SE.on "mousedown"
                (Decode.map2 (\cx cy -> StartDrag s.id (toFloat cx) (toFloat cy))
                    (Decode.field "offsetX" Decode.int)
                    (Decode.field "offsetY" Decode.int)
                )
            , SE.on "dblclick" (Decode.succeed (DoubleClickState s.id))
            , SE.on "click" (Decode.succeed (SelectState s.id))
            ]
            []
        , (if s.accepting then
            S.circle [ SA.cx (String.fromFloat s.x), SA.cy (String.fromFloat s.y), SA.r (String.fromInt (r - 6)), SA.fill "none", SA.stroke strokeColor, SA.strokeWidth "2" ] []
           else
            S.text_ [] []
          )
        , S.text_
            [ SA.x (String.fromFloat (s.x - 6)), SA.y (String.fromFloat (s.y + 6)), SA.fontSize "14", SA.fill (textColor Theme.Light) ]
            [ S.text (String.fromInt s.id) ]
        ]


viewTransition ctx model t =
    case ( getStateById t.from model.states, getStateById t.to model.states ) of
        ( Just a, Just b ) ->
            let
                ( x1, y1 ) = ( a.x, a.y )
                ( x2, y2 ) = ( b.x, b.y )
                midX = (x1 + x2) / 2
                midY = (y1 + y2) / 2
            in
            S.g []
                [ S.line
                    [ SA.x1 (String.fromFloat x1), SA.y1 (String.fromFloat y1)
                    , SA.x2 (String.fromFloat x2), SA.y2 (String.fromFloat y2)
                    , SA.stroke (textColor ctx.theme), SA.strokeWidth "2"
                    ]
                    []
                , S.text_ [ SA.x (String.fromFloat (midX + 6)), SA.y (String.fromFloat (midY - 6)), SA.fontSize "12", SA.fill (textColor ctx.theme) ] [ S.text t.label ]
                ]

        _ ->
            S.text_ [] []


getStateById id states =
    List.head <| List.filter (\s -> s.id == id) states


sidePanel ctx model =
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
