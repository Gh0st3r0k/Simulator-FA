module Pages.Editor exposing (Model, Msg(..), init, update, view)

import Dict
import Html as H exposing (Html, button, div, h2, textarea, text)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (onClick, onInput, stopPropagationOn)
import I18n exposing (Key(..), Lang, t)
import Json.Decode as Decode
import Json.Encode as Encode
import Process
import String
import Svg as S
import Svg.Attributes as SA
import Svg.Events as SE
import Task
import Theme exposing (Theme, interactiveBg, interactiveBorder, panelBg, panelBorder, textColor)


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
    , selectedTransition : Maybe Int
    , mode : Mode
    , transitionFrom : Maybe Int
    , transitionLabel : String
    , codeDraft : String
    , simulationInput : String
    , simulationDelay : String
    , simulationRunning : Bool
    , simulationQueue : List Char
    , simulationCurrent : Maybe Int
    , simulationResult : SimulationResult
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
    | ConfigureTransition


type SimulationResult
    = Idle
    | Running
    | Success
    | Rejected
    | DeadEnd
    | MissingStart

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
    , selectedTransition = Nothing
    , mode = AddState
    , transitionFrom = Nothing
    , transitionLabel = ""
    , codeDraft = ""
    , simulationInput = ""
    , simulationDelay = "500"
    , simulationRunning = False
    , simulationQueue = []
    , simulationCurrent = Nothing
    , simulationResult = Idle
    }



-- MESSAGES


type Msg
    = CanvasMouseDown String Int Float Float
    | MovePointer Float Float
    | CanvasMouseUp Int
    | StartDrag Int
    | DoubleClickState Int
    | SelectState Int
    | SelectTransition Int
    | DeleteState Int
    | DeleteTransition Int
    | ToggleStart Int
    | ToggleAccepting Int
    | SetMode Mode
    | SetTransitionLabel String
    | SetSelectedTransitionLabel String
    | ImportCode
    | ExportCode
    | CodeEdited String
    | SetSimulationInput String
    | SetSimulationDelay String
    | StartSimulation
    | AdvanceSimulation
    | StopSimulation
    | NoOp


-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    if model.simulationRunning then
        case msg of
            AdvanceSimulation ->
                stepSimulation model

            StopSimulation ->
                ( stopSimulation Idle model, Cmd.none )

            SetSimulationInput s ->
                ( { model | simulationInput = s }, Cmd.none )

            SetSimulationDelay s ->
                ( { model | simulationDelay = s }, Cmd.none )

            _ ->
                ( model, Cmd.none )

    else
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
                                        , selectedTransition = Nothing
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
                case model.mode of
                    MoveState ->
                        let
                            toggle s = if s.id == sid then { s | accepting = not s.accepting } else s
                        in
                        ( { model | states = List.map toggle model.states }, Cmd.none )

                    _ ->
                        ( model, Cmd.none )

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
                                        , selectedTransition = Nothing
                                      }
                                    , Cmd.none
                                    )

                    MoveState ->
                        ( { model | selected = Just sid }, Cmd.none )

                    _ ->
                        ( model, Cmd.none )

            SelectTransition tid ->
                case model.mode of
                    ConfigureTransition ->
                        ( { model | selectedTransition = Just tid, selected = Nothing }, Cmd.none )

                    _ ->
                        ( model, Cmd.none )

            DeleteState sid ->
                let
                    statesFiltered = List.filter (\s -> s.id /= sid) model.states
                    transFiltered = List.filter (\t -> t.from /= sid && t.to /= sid) model.transitions
                in
                ( { model | states = statesFiltered, transitions = transFiltered, selected = Nothing, selectedTransition = Nothing }, Cmd.none )

            DeleteTransition tid ->
                let
                    transFiltered = List.filter (\t -> t.id /= tid) model.transitions
                in
                ( { model | transitions = transFiltered, selectedTransition = Nothing }, Cmd.none )

            ToggleStart sid ->
                case model.mode of
                    MoveState ->
                        let
                            updatedStates =
                                case getStateById sid model.states of
                                    Nothing ->
                                        model.states

                                    Just s ->
                                        if s.isStart then
                                            List.map (\t -> if t.id == sid then { t | isStart = False } else t) model.states

                                        else
                                            ensureSingleStart sid model.states
                        in
                        ( { model | states = updatedStates, selected = Just sid }, Cmd.none )

                    _ ->
                        ( model, Cmd.none )

            ToggleAccepting sid ->
                case model.mode of
                    MoveState ->
                        let
                            toggle s = if s.id == sid then { s | accepting = not s.accepting } else s
                        in
                        ( { model | states = List.map toggle model.states, selected = Just sid }, Cmd.none )

                    _ ->
                        ( model, Cmd.none )

            SetMode newMode ->
                ( { model
                    | mode = newMode
                    , transitionFrom = Nothing
                    , dragging = Nothing
                    , selected = Nothing
                    , selectedTransition = Nothing
                  }
                , Cmd.none
                )

            SetTransitionLabel label ->
                ( { model | transitionLabel = label }, Cmd.none )

            SetSelectedTransitionLabel label ->
                case model.selectedTransition of
                    Nothing ->
                        ( model, Cmd.none )

                    Just tid ->
                        let
                            normalizedLabel =
                                let
                                    trimmed = String.trim label
                                in
                                if String.isEmpty trimmed then
                                    "λ"

                                else
                                    trimmed

                            updateTransition transition =
                                if transition.id == tid then
                                    { transition | label = normalizedLabel }

                                else
                                    transition
                        in
                        ( { model | transitions = List.map updateTransition model.transitions }, Cmd.none )

            ImportCode ->
                case Decode.decodeString decodeAutomaton model.codeDraft of
                    Ok ( ss, ts ) ->
                        let
                            normalizedStates = enforceSingleStartFlag ss
                            maxId = List.maximum (List.map .id normalizedStates ++ List.map .id ts) |> Maybe.withDefault 0
                        in
                        ( { model | states = normalizedStates, transitions = ts, nextId = maxId + 1 }, Cmd.none )

                    Err _ -> ( model, Cmd.none )

            ExportCode ->
                let
                    json = Encode.encode 4 (encodeAutomaton model.states model.transitions)
                in
                ( { model | codeDraft = json }, Cmd.none )

            CodeEdited s ->
                ( { model | codeDraft = s }, Cmd.none )

            SetSimulationInput s ->
                ( { model | simulationInput = s }, Cmd.none )

            SetSimulationDelay s ->
                ( { model | simulationDelay = s }, Cmd.none )

            StartSimulation ->
                startSimulation model

            AdvanceSimulation ->
                stepSimulation model

            StopSimulation ->
                ( stopSimulation Idle model, Cmd.none )

            NoOp ->
                ( model, Cmd.none )



-- START/STOP HELPERS


ensureSingleStart : Int -> List State -> List State
ensureSingleStart id states =
    List.map (\s -> { s | isStart = s.id == id }) states


enforceSingleStartFlag : List State -> List State
enforceSingleStartFlag states =
    case List.filter .isStart states of
        [] ->
            states

        s :: _ ->
            ensureSingleStart s.id states


findStartState : List State -> Maybe State
findStartState states =
    List.head <| List.filter .isStart states


hasLambdaFrom : Int -> List Transition -> Bool
hasLambdaFrom sid transitions =
    List.any (\t -> t.from == sid && t.label == "λ") transitions


isDeterministic : List Transition -> Bool
isDeterministic transitions =
    let
        step t dict =
            Dict.update ( t.from, t.label )
                (\maybe -> Just (Maybe.withDefault 0 maybe + 1))
                dict

        counts =
            List.foldl step Dict.empty transitions

        hasDuplicate =
            Dict.values counts |> List.any (\n -> n > 1)

        hasLambda =
            List.any (\t -> t.label == "λ") transitions
    in
    (not hasDuplicate) && (not hasLambda)


parseDelay : String -> Float
parseDelay raw =
    case String.toFloat (String.trim raw) of
        Just n ->
            Basics.max 0 n

        Nothing ->
            500


stopSimulation : SimulationResult -> Model -> Model
stopSimulation result model =
    { model
        | simulationRunning = False
        , simulationQueue = []
        , simulationCurrent = Nothing
        , simulationResult = result
    }


startSimulation : Model -> ( Model, Cmd Msg )
startSimulation model =
    case findStartState model.states of
        Nothing ->
            ( { model | simulationResult = MissingStart }, Cmd.none )

        Just startState ->
            let
                queue = String.toList model.simulationInput
                delay = parseDelay model.simulationDelay
                willRun = not (List.isEmpty queue) || hasLambdaFrom startState.id model.transitions
                initialResult =
                    if willRun then
                        Running

                    else if startState.accepting then
                        Success

                    else
                        Rejected
                cmd =
                    if willRun then
                        Process.sleep delay |> Task.perform (\_ -> AdvanceSimulation)

                    else
                        Cmd.none
            in
            ( { model
                | simulationRunning = willRun
                , simulationQueue = queue
                , simulationCurrent = Just startState.id
                , selected = Just startState.id
                , simulationResult = initialResult
              }
            , cmd
            )


stepSimulation : Model -> ( Model, Cmd Msg )
stepSimulation model =
    case ( model.simulationCurrent, model.simulationQueue ) of
        ( Nothing, _ ) ->
            ( stopSimulation DeadEnd model, Cmd.none )

        ( Just sid, queue ) ->
            let
                ( maybeChar, rest ) =
                    case queue of
                        [] ->
                            ( Nothing, [] )

                        c :: remaining ->
                            ( Just (String.fromChar c), remaining )

                pickTransition =
                    let
                        charMatch =
                            case maybeChar of
                                Nothing ->
                                    Nothing

                                Just lbl ->
                                    List.filter (\t -> t.from == sid && t.label == lbl) model.transitions
                                        |> List.head

                        lambdaMatch =
                            List.filter (\t -> t.from == sid && t.label == "λ") model.transitions
                                |> List.head
                    in
                    case ( charMatch, lambdaMatch ) of
                        ( Just t, _ ) ->
                            Just ( t, True )

                        ( Nothing, Just t ) ->
                            Just ( t, False )

                        _ ->
                            Nothing
            in
            case pickTransition of
                Nothing ->
                    let
                        result =
                            case queue of
                                [] ->
                                    case getStateById sid model.states of
                                        Just s ->
                                            if s.accepting then
                                                Success

                                            else
                                                Rejected

                                        Nothing ->
                                            DeadEnd

                                _ ->
                                    DeadEnd
                    in
                    ( stopSimulation result model, Cmd.none )

                Just ( t, consumesInput ) ->
                    let
                        delay = parseDelay model.simulationDelay
                        nextQueue =
                            if consumesInput then
                                rest

                            else
                                queue

                        willContinue =
                            (not (List.isEmpty nextQueue)) || hasLambdaFrom t.to model.transitions

                        cmd =
                            if willContinue then
                                Process.sleep delay |> Task.perform (\_ -> AdvanceSimulation)

                            else
                                Cmd.none
                    in
                    ( { model
                        | simulationQueue = nextQueue
                        , simulationCurrent = Just t.to
                        , selected = Just t.to
                        , simulationRunning = willContinue
                        , simulationResult =
                            if willContinue then
                                Running

                            else
                                case getStateById t.to model.states of
                                    Just s ->
                                        if s.accepting && List.isEmpty nextQueue then
                                            Success

                                        else if List.isEmpty nextQueue then
                                            Rejected

                                        else
                                            DeadEnd

                                    Nothing ->
                                        DeadEnd
                      }
                    , cmd
                    )



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


simulationStatus : Lang -> SimulationResult -> Maybe ( String, String )
simulationStatus lang result =
    case result of
        Idle ->
            Nothing

        Running ->
            Just ( t lang I18n.EditorSimulationRunning, "#2980b9" )

        Success ->
            Just ( t lang I18n.EditorSimulationSuccess, "#2ecc71" )

        Rejected ->
            Just ( t lang I18n.EditorSimulationRejected, "#e67e22" )

        DeadEnd ->
            Just ( t lang I18n.EditorSimulationDeadEnd, "#e74c3c" )

        MissingStart ->
            Just ( t lang I18n.EditorSimulationMissingStart, "#e74c3c" )
-- VIEW


view : { lang : Lang, theme : Theme } -> Model -> Html Msg
view ctx model =
    div [ HA.style "display" "flex", HA.style "gap" "12px", HA.style "color" (textColor ctx.theme) ]
        [ div []
            [ H.h2 [] [ H.text (t ctx.lang EditorTitle) ]
            , svgView ctx model
            ]
        , sidePanel ctx model
        , automatonPanel ctx model
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
                ConfigureTransition -> "pointer"
    in
    S.svg
        [ SA.width (String.fromInt width)
        , SA.height (String.fromInt height)
        , SA.style
            ("border:1px solid "
                ++ panelBorder ctx.theme
                ++ "; background:"
                ++ (if ctx.theme == Theme.Dark then "#0b1320" else "#f8f9fb")
                ++ "; cursor: "
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
        [ S.defs [] [ arrowMarker (textColor ctx.theme), startArrowMarker (textColor ctx.theme) ]
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
        fillColor =
            case ( ctx.theme, s.isStart ) of
                ( Theme.Light, True ) -> "#ffd84d"
                ( Theme.Dark, True ) -> "#3d3316"
                ( Theme.Light, False ) -> "#ffffff"
                ( Theme.Dark, False ) -> "#1d2433"
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

        startIndicator =
            if s.isStart then
                [ S.line
                    [ SA.x1 (String.fromFloat (s.x - 64))
                    , SA.y1 (String.fromFloat s.y)
                    , SA.x2 (String.fromFloat (s.x - (toFloat r + 6)))
                    , SA.y2 (String.fromFloat s.y)
                    , SA.stroke (textColor ctx.theme)
                    , SA.strokeWidth "3"
                    , SA.markerEnd "url(#start-arrow)"
                    , SA.pointerEvents "none"
                    ]
                    []
                ]

            else
                []
    in
    S.g []
        (startIndicator
            ++ highlight
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
                    , SA.fill (textColor ctx.theme)
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
                labelX = midX + 6
                labelY = midY - 6
                hitWidth = Basics.max 24 (toFloat (String.length t.label) * 9)
                hitHeight = 18
                isSelected = model.selectedTransition == Just t.id
                strokeWidth = if isSelected then "4" else "2"
                selectTransitionOnClick =
                    stopPropagationOn "click"
                        (Decode.map
                            (\button ->
                                if button == 0 then
                                    ( SelectTransition t.id, True )

                                else
                                    ( NoOp, True )
                            )
                            (Decode.field "button" Decode.int)
                        )
            in
            S.g []
                [ S.line
                    [ SA.x1 (String.fromFloat startX), SA.y1 (String.fromFloat startY)
                    , SA.x2 (String.fromFloat endX), SA.y2 (String.fromFloat endY)
                    , SA.stroke (textColor ctx.theme)
                    , SA.strokeWidth strokeWidth
                    , SA.markerEnd "url(#arrowhead)"
                    , selectTransitionOnClick
                    ]
                    []
                , S.rect
                    [ SA.x (String.fromFloat (labelX - 4))
                    , SA.y (String.fromFloat (labelY - hitHeight + 2))
                    , SA.width (String.fromFloat hitWidth)
                    , SA.height (String.fromFloat hitHeight)
                    , SA.fill "transparent"
                    , SA.stroke "none"
                    , selectTransitionOnClick
                    ]
                    []
                , S.text_
                    [ SA.x (String.fromFloat labelX)
                    , SA.y (String.fromFloat labelY)
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


automatonPanel : { a | theme : Theme, lang : Lang } -> Model -> Html Msg
automatonPanel ctx model =
    if List.isEmpty model.states && List.isEmpty model.transitions then
        text ""

    else
        let
            deterministic = isDeterministic model.transitions
            label =
                if deterministic then
                    t ctx.lang EditorAutomatonDeterministic

                else
                    t ctx.lang EditorAutomatonNonDeterministic

            color =
                if deterministic then
                    "#2ecc71"

                else
                    "#e67e22"
        in
        div
            [ HA.style "min-width" "220px"
            , HA.style "background" (panelBg ctx.theme)
            , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
            , HA.style "padding" "12px"
            , HA.style "border-radius" "12px"
            , HA.style "align-self" "flex-start"
            ]
            [ H.h2 [] [ H.text (t ctx.lang EditorType) ]
            , H.div [ HA.style "color" color, HA.style "font-weight" "bold" ] [ H.text label ]
            ]


startArrowMarker : String -> S.Svg msg
startArrowMarker color =
    S.marker
        [ SA.id "start-arrow"
        , SA.markerWidth "14"
        , SA.markerHeight "14"
        , SA.viewBox "0 0 14 14"
        , SA.refX "14"
        , SA.refY "7"
        , SA.orient "auto"
        , SA.markerUnits "strokeWidth"
        ]
        [ S.path
            [ SA.d "M0,0 L0,14 L14,7 z"
            , SA.fill color
            ]
            []
        ]


sidePanel ctx model =
    let
        baseButtonStyles =
            [ HA.style "background" (interactiveBg ctx.theme)
            , HA.style "color" (textColor ctx.theme)
            , HA.style "border" ("1px solid " ++ interactiveBorder ctx.theme)
            , HA.style "border-radius" "8px"
            ]
        modeButton target label =
            H.button
                (baseButtonStyles
                    ++ [ onClick (SetMode target)
                       , HA.style "background" (if model.mode == target then "#2ecc71" else interactiveBg ctx.theme)
                       , HA.disabled model.simulationRunning
                       ]
                )
                [ H.text label ]
    in
    div
        [ HA.style "min-width" "320px"
        , HA.style "background" (panelBg ctx.theme)
        , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
        , HA.style "padding" "12px"
        , HA.style "border-radius" "12px"
        ]
        [ H.h2 [] [ H.text (t ctx.lang EditorJson) ]
        , textarea [ rows 18, cols 40, onInput CodeEdited, value model.codeDraft ] []
        , div [ HA.style "margin-top" "8px" ]
            [ H.button (baseButtonStyles ++ [ onClick ImportCode ]) [ H.text (t ctx.lang EditorImport) ]
            , H.button (baseButtonStyles ++ [ onClick ExportCode, HA.style "margin-left" "8px" ]) [ H.text (t ctx.lang EditorExport) ]
            ]
        , H.h2 [] [ H.text (t ctx.lang EditorMode) ]
        , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "align-items" "center" ]
            [ modeButton AddState (t ctx.lang EditorModeAddState)
            , modeButton AddTransition (t ctx.lang EditorModeAddTransition)
            , modeButton MoveState (t ctx.lang EditorModeMoveState)
            , modeButton ConfigureTransition (t ctx.lang EditorModeConfigureTransition)
            ]
        , if model.mode == AddTransition then
            div []
                [ H.h2 [] [ H.text (t ctx.lang EditorTransitions) ]
                , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "align-items" "center" ]
                    [ textarea
                        [ rows 1
                        , cols 12
                        , placeholder (t ctx.lang EditorTransitionLabel)
                        , value model.transitionLabel
                        , onInput SetTransitionLabel
                        ]
                        []
                    ]
                , (case model.transitionFrom of
                    Nothing ->
                        text (t ctx.lang EditorTransitionSelectStart)

                    Just sid ->
                        div [ HA.style "margin-top" "4px" ]
                            [ text (t ctx.lang EditorTransitionFrom ++ ": " ++ String.fromInt sid ++ " → " ++ t ctx.lang EditorTransitionSelectStart) ]
                  )
                ]
            else
            text ""
        , if model.mode == MoveState then
            div []
                [ H.h2 [] [ H.text (t ctx.lang EditorSelected) ]
                , case model.selected of
                    Nothing ->
                        div [] [ H.text (t ctx.lang EditorSelectedNone) ]

                    Just sid ->
                        case getStateById sid model.states of
                            Nothing ->
                                div [] [ H.text (t ctx.lang EditorSelectedNotFound) ]

                            Just s ->
                                div []
                                    [ div [] [ H.text (t ctx.lang EditorSelectedState ++ ": " ++ String.fromInt s.id) ]
                                    , div [] [ H.text (t ctx.lang EditorSelectedPos ++ ": " ++ String.fromFloat s.x ++ ", " ++ String.fromFloat s.y) ]
                                    , div [] [ H.text (t ctx.lang EditorSelectedAccepting ++ ": " ++ (if s.accepting then t ctx.lang EditorYes else t ctx.lang EditorNo)) ]
                                    , div [] [ H.text (t ctx.lang EditorSelectedStart ++ ": " ++ (if s.isStart then t ctx.lang EditorYes else t ctx.lang EditorNo)) ]
                                    , div [ HA.style "margin-top" "8px", HA.style "display" "flex", HA.style "gap" "8px" ]
                                        [ H.button [ onClick (DeleteState s.id) ] [ H.text (t ctx.lang EditorDeleteState) ] ]
                                    , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "margin-top" "8px" ]
                                        [ H.button
                                            [ onClick (ToggleStart s.id)
                                            , HA.disabled model.simulationRunning
                                            ]
                                            [ H.text (if s.isStart then t ctx.lang EditorUnsetStart else t ctx.lang EditorMakeStart) ]
                                        , H.button
                                            [ onClick (ToggleAccepting s.id)
                                            , HA.disabled model.simulationRunning
                                            ]
                                            [ H.text (if s.accepting then t ctx.lang EditorUnsetAccepting else t ctx.lang EditorMakeAccepting) ]
                                        ]
                                    ]
                ]

          else if model.mode == ConfigureTransition then
            div []
                [ H.h2 [] [ H.text (t ctx.lang EditorSelected) ]
                , case model.selectedTransition of
                    Nothing ->
                        div [] [ H.text (t ctx.lang EditorTransitionSelectForEdit) ]

                    Just tid ->
                        case List.head (List.filter (\transition -> transition.id == tid) model.transitions) of
                            Nothing ->
                                div [] [ H.text (t ctx.lang EditorSelectedNotFound) ]

                            Just transition ->
                                div []
                                    [ div [] [ H.text (t ctx.lang EditorSelectedTransition ++ ": " ++ String.fromInt transition.id) ]
                                    , div [] [ H.text (t ctx.lang EditorTransitionFrom ++ ": " ++ String.fromInt transition.from ++ " → " ++ String.fromInt transition.to) ]
                                    , textarea
                                        [ rows 1
                                        , cols 12
                                        , placeholder (t ctx.lang EditorTransitionLabel)
                                        , value transition.label
                                        , onInput SetSelectedTransitionLabel
                                        ]
                                        []
                                    , div [ HA.style "margin-top" "8px", HA.style "display" "flex", HA.style "gap" "8px" ]
                                        [ H.button [ onClick (DeleteTransition transition.id) ] [ H.text (t ctx.lang EditorDeleteTransition) ] ]
                                    ]
                ]

          else
            text ""            
        , H.h2 [] [ H.text (t ctx.lang EditorSimulation) ]
        , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "align-items" "center" ]
            [ textarea
                [ rows 1
                , cols 18
                , placeholder (t ctx.lang EditorSimulationInput)
                , value model.simulationInput
                , onInput SetSimulationInput
                , HA.disabled model.simulationRunning
                ]
                []
            , textarea
                [ rows 1
                , cols 8
                , placeholder (t ctx.lang EditorSimulationDelay)
                , value model.simulationDelay
                , onInput SetSimulationDelay
                , HA.disabled model.simulationRunning
                ]
                []
            ]
        , div [ HA.style "margin-top" "6px", HA.style "display" "flex", HA.style "gap" "8px" ]
            [ H.button
                (baseButtonStyles
                    ++ [ onClick StartSimulation
                       , HA.disabled model.simulationRunning
                       ]
                )
                [ H.text (t ctx.lang EditorSimulationStart) ]
            , H.button
                (baseButtonStyles
                    ++ [ onClick StopSimulation
                       , HA.disabled (not model.simulationRunning)
                       ]
                )
                [ H.text (t ctx.lang EditorSimulationStop) ]
            ]
        , case simulationStatus ctx.lang model.simulationResult of
            Nothing ->
                text ""

            Just ( msg, color ) ->
                div [ HA.style "color" color, HA.style "margin-top" "6px" ] [ H.text msg ]
        ]