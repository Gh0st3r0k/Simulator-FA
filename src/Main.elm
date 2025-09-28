module Main exposing (main)

import Browser
import Html as H exposing (Html, button, div, h2, input, pre, span, textarea)
import Html.Attributes as HA exposing (..)
import Html.Events as HE exposing (onClick, onDoubleClick, onInput)
import Json.Decode as Decode
import Json.Encode as Encode
import Svg as S exposing (..)
import Svg.Attributes as SA exposing (..)
import Svg.Events as SE


-- MODEL


type alias Model =
    { states : List State
    , transitions : List Transition
    , nextId : Int
    , dragging : Maybe Int
    , creatingFrom : Maybe Int
    , newLabelFor : Maybe Int
    , labelDraft : String
    , codeDraft : String
    , selected : Maybe Int
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


init : () -> ( Model, Cmd Msg )
init _ =
    ( { states = []
      , transitions = []
      , nextId = 1
      , dragging = Nothing
      , creatingFrom = Nothing
      , newLabelFor = Nothing
      , labelDraft = ""
      , codeDraft = ""
      , selected = Nothing
      }
    , Cmd.none
    )



-- MESSAGES


type Msg
    = CanvasClick Float Float
    | StartDrag Int Float Float
    | DragAt Float Float
    | EndDrag Float Float
    | DoubleClickState Int
    | ShiftClickState Int
    | BeginCreate Int
    | FinishCreate Int
    | SetLabelDraft String
    | SaveLabel
    | CancelLabel
    | ImportCode
    | ExportCode
    | CodeEdited String
    | SelectState Int
    | DeleteState Int


-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        CanvasClick cx cy ->
            -- клик по пустому месту — добавляем состояние
            let
                newState =
                    { id = model.nextId
                    , x = cx
                    , y = cy
                    , accepting = False
                    , isStart = False
                    }
            in
            ( { model | states = model.states ++ [ newState ], nextId = model.nextId + 1, selected = Just newState.id }
            , Cmd.none
            )

        StartDrag sid mx my ->
            ( { model | dragging = Just sid, selected = Just sid }, Cmd.none )

        DragAt mx my ->
            case model.dragging of
                Nothing ->
                    ( model, Cmd.none )

                Just sid ->
                    let
                        updateState s =
                            if s.id == sid then
                                { s | x = mx, y = my }
                            else
                                s
                    in
                    ( { model | states = List.map updateState model.states }, Cmd.none )

        EndDrag _ _ ->
            case model.dragging of
                Nothing ->
                    ( model, Cmd.none )

                Just _ ->
                    ( { model | dragging = Nothing }, Cmd.none )

        DoubleClickState sid ->
            let
                toggle s =
                    if s.id == sid then
                        { s | accepting = not s.accepting }
                    else
                        s
            in
            ( { model | states = List.map toggle model.states }, Cmd.none )

        ShiftClickState sid ->
            let
                mark s =
                    if s.id == sid then
                        { s | isStart = True }
                    else
                        { s | isStart = False }
            in
            ( { model | states = List.map mark model.states }, Cmd.none )

        BeginCreate sid ->
            ( { model | creatingFrom = Just sid }, Cmd.none )

        FinishCreate toId ->
            case model.creatingFrom of
                Nothing ->
                    ( model, Cmd.none )

                Just fromId ->
                    let
                        newT =
                            { id = model.nextId
                            , from = fromId
                            , to = toId
                            , label = ""
                            }

                        model2 =
                            { model
                                | transitions = model.transitions ++ [ newT ]
                                , nextId = model.nextId + 1
                                , creatingFrom = Nothing
                                , newLabelFor = Just newT.id
                                , labelDraft = ""
                            }
                    in
                    ( model2, Cmd.none )

        SetLabelDraft s ->
            ( { model | labelDraft = s }, Cmd.none )

        SaveLabel ->
            case model.newLabelFor of
                Nothing ->
                    ( model, Cmd.none )

                Just tid ->
                    let
                        assign t =
                            if t.id == tid then
                                { t | label = model.labelDraft }
                            else
                                t
                    in
                    ( { model | transitions = List.map assign model.transitions, newLabelFor = Nothing, labelDraft = "" }, Cmd.none )

        CancelLabel ->
            ( { model | newLabelFor = Nothing, labelDraft = "" }, Cmd.none )

        ImportCode ->
            case Decode.decodeString decodeAutomaton model.codeDraft of
                Ok ( statesList, transList ) ->
                    let
                        maxId =
                            List.maximum (List.map .id statesList ++ List.map .id transList) |> Maybe.withDefault 0
                    in
                    ( { model | states = statesList, transitions = transList, nextId = maxId + 1 }, Cmd.none )

                Err _ ->
                    ( model, Cmd.none )

        ExportCode ->
            let
                json = Encode.encode 4 (encodeAutomaton model.states model.transitions)
            in
            ( { model | codeDraft = json }, Cmd.none )

        CodeEdited s ->
            ( { model | codeDraft = s }, Cmd.none )

        SelectState sid ->
            ( { model | selected = Just sid }, Cmd.none )

        DeleteState sid ->
            let
                statesFiltered = List.filter (\s -> s.id /= sid) model.states
                transFiltered = List.filter (\t -> t.from /= sid && t.to /= sid) model.transitions
            in
            ( { model | states = statesFiltered, transitions = transFiltered, selected = Nothing }, Cmd.none )



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


view : Model -> Html Msg
view model =
    div [ HA.style "font-family" "Arial, sans-serif", HA.style "display" "flex", HA.style "gap" "12px" ]
        [ div []
            [ h2 [] [ H.text "Finite Automaton (Elm simulator)" ]
            , div [] [ svgView model ]
            ]
        , div [ HA.style "width" "320px" ]
            [ h2 [] [ H.text "JSON (Import/Export)" ]
            , textarea [ rows 18, cols 40, onInput CodeEdited, value model.codeDraft ] []
            , div [ HA.style "margin-top" "8px" ]
                [ button [ onClick ImportCode ] [ H.text "Import" ]
                , button [ onClick ExportCode, HA.style "margin-left" "8px" ] [ H.text "Export" ]
                ]
            , h2 [] [ H.text "Selected" ]
            , selectedPanel model
            ]
        ]


svgView model =
    let
        width = 800
        height = 600
    in
    S.svg
        [ SA.width (String.fromInt width)
        , SA.height (String.fromInt height)
        , SA.style "border:1px solid #ccc; background:#fafafa; cursor: crosshair"
        , onSvgClick
        ]
        (List.concat
            [ List.map (viewTransition model) model.transitions
            , List.map viewState model.states
            ])


onSvgClick =
    let
        decoder =
            Decode.map2 (\x y -> CanvasClick (toFloat x) (toFloat y))
                (Decode.field "offsetX" Decode.int)
                (Decode.field "offsetY" Decode.int)
    in
    SE.on "click" decoder


viewState s =
    let
        r = 22
        strokeColor = if s.accepting then "darkgreen" else "black"
        fillColor = if s.isStart then "#fffbe6" else "white"
        cxStr = String.fromFloat s.x
        cyStr = String.fromFloat s.y
    in
    S.g []
        [ S.circle
            [ SA.cx cxStr, SA.cy cyStr, SA.r (String.fromInt r)
            , SA.fill fillColor, SA.stroke strokeColor, SA.strokeWidth "2"
            , onMouseDown s.id
            , onDoubleClickState s.id
            , onClickState s.id
            ]
            []
        , (if s.accepting then
            S.circle [ SA.cx cxStr, SA.cy cyStr, SA.r (String.fromInt (r - 6)), SA.fill "none", SA.stroke strokeColor, SA.strokeWidth "2" ] []
           else
            S.text_ [] []
          )
        , S.text_ [ SA.x (String.fromFloat (s.x - 6)), SA.y (String.fromFloat (s.y + 6)), SA.fontSize "14" ] [ S.text (String.fromInt s.id) ]
        ]


viewTransition model t =
    case ( getStateById t.from model.states, getStateById t.to model.states ) of
        ( Just a, Just b ) ->
            let
                ( x1, y1 ) = ( a.x, a.y )
                ( x2, y2 ) = ( b.x, b.y )
                midX = (x1 + x2) / 2
                midY = (y1 + y2) / 2
            in
            S.g []
                [ S.line [ SA.x1 (String.fromFloat x1), SA.y1 (String.fromFloat y1), SA.x2 (String.fromFloat x2), SA.y2 (String.fromFloat y2), SA.stroke "#444", SA.strokeWidth "2" ] []
                , S.text_ [ SA.x (String.fromFloat (midX + 6)), SA.y (String.fromFloat (midY - 6)), SA.fontSize "12" ] [ S.text t.label ]
                ]
        _ ->
            S.text_ [] []



getStateById id states =
    List.head <| List.filter (\s -> s.id == id) states


-- small event helpers


onMouseDown id =
    let
        decoder =
            Decode.map2 (\cx cy -> StartDrag id (toFloat cx) (toFloat cy))
                (Decode.field "offsetX" Decode.int)
                (Decode.field "offsetY" Decode.int)
    in
    SE.on "mousedown" decoder


onDoubleClickState id =
    SE.on "dblclick" (Decode.succeed (DoubleClickState id))


onClickState id =
    SE.on "click" (Decode.succeed (SelectState id))


selectedPanel model =
    case model.selected of
        Nothing ->
            div [] [ H.text "None" ]

        Just sid ->
            case getStateById sid model.states of
                Nothing ->
                    div [] [ H.text "Not found" ]

                Just s ->
                    div []
                        [ div [] [ H.text ("State: " ++ String.fromInt s.id) ]
                        , div [] [ H.text ("Pos: " ++ String.fromFloat s.x ++ ", " ++ String.fromFloat s.y) ]
                        , div [] [ H.text ("Accepting: " ++ (if s.accepting then "Yes" else "No")) ]
                        , div [] [ H.text ("Start: " ++ (if s.isStart then "Yes" else "No")) ]
                        , div [ HA.style "margin-top" "8px" ]
                            [ button [ onClick (DeleteState s.id) ] [ H.text "Delete state" ] ]
                        ]


-- SUBSCRIPTIONS & MAIN


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
