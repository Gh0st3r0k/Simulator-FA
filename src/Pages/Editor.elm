module Pages.Editor exposing (Model, Msg(..), SaveSlot, decodeSaveSlots, encodeSaveSlots, init, initWithSlots, update, view)

import Dict
import Html as H exposing (Html, button, div, h2, input, textarea, text)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (custom, onClick, onInput, stopPropagationOn)
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
    , nextStateId : Int
    , nextTransitionId : Int
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
    , simulationChoice : Maybe PendingChoice
    , stateNameConflict : Bool
    , saveModalOpen : Bool
    , saveSlots : List SaveSlot
    , viewportWidth : Int
    , viewportHeight : Int
    }


type alias State =
    { id : Int
    , name : String
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


type alias SaveSlot =
    { id : Int
    , name : String
    , automatonJson : String
    }


type alias PanState =
    { startX : Float
    , startY : Float
    , originX : Float
    , originY : Float
    }


type alias PendingChoice =
    { stateId : Int
    , inputLabel : String
    , transitionIds : List Int
    , consumesInput : Bool
    }


type Mode
    = AddState
    | AddTransition
    | MoveState


type SimulationResult
    = Idle
    | Running
    | Success
    | Rejected
    | DeadEnd
    | MissingStart

init : Model
init =
    initWithSlots (defaultSaveSlots 5)


initWithSlots : List SaveSlot -> Model
initWithSlots slots =
    { states = []
    , transitions = []
    , nextStateId = 1
    , nextTransitionId = 1
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
    , simulationChoice = Nothing
    , stateNameConflict = False
    , saveModalOpen = False
    , saveSlots = ensureSlotCount 5 slots
    , viewportWidth = 1200
    , viewportHeight = 800
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
    | SetSelectedStateName String
    | ImportCode
    | ExportCode
    | CodeEdited String
    | SetSimulationInput String
    | SetSimulationDelay String
    | StartSimulation
    | AdvanceSimulation
    | ChooseSimulationTransition Int
    | WheelPan Float Float
    | SetViewport Int Int
    | StopSimulation
    | OpenSaveModal
    | CloseSaveModal
    | SaveToSlot Int
    | LoadFromSlot Int
    | DeleteFromSlot Int
    | RenameSlot Int String
    | NoOp


-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    if model.simulationRunning || (model.simulationChoice /= Nothing) then
        case msg of
            CanvasMouseDown _ button cx cy ->
                if button == 1 then
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

                else
                    ( model, Cmd.none )

            MovePointer mx my ->
                case model.panning of
                    Nothing ->
                        ( model, Cmd.none )

                    Just pan ->
                        ( { model
                            | panX = pan.originX + (mx - pan.startX)
                            , panY = pan.originY + (my - pan.startY)
                          }
                        , Cmd.none
                        )

            CanvasMouseUp button ->
                if button == 1 then
                    ( { model | panning = Nothing }, Cmd.none )

                else
                    ( model, Cmd.none )
                    
            AdvanceSimulation ->
                stepSimulation model

            ChooseSimulationTransition tid ->
                case ( model.simulationChoice, model.simulationCurrent ) of
                    ( Just choice, Just _ ) ->
                        case List.head (List.filter (\transition -> transition.id == tid) model.transitions) of
                            Just transition ->
                                let
                                    queue = model.simulationQueue
                                    rest =
                                        case queue of
                                            [] ->
                                                []

                                            _ :: remaining ->
                                                remaining
                                in
                                applySimulationTransition transition choice.consumesInput rest queue model

                            Nothing ->
                                ( model, Cmd.none )

                    _ ->
                        ( model, Cmd.none )

            WheelPan dx dy ->
                ( panWithWheel dx dy model, Cmd.none )

            SetViewport w h ->
                ( { model | viewportWidth = w, viewportHeight = h }, Cmd.none )
            
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

                                        stateId = model.nextStateId

                                        newState =
                                            { id = stateId, name = String.fromInt stateId, x = wx, y = wy, accepting = False, isStart = False }
                                    in
                                    ( { model
                                        | states = model.states ++ [ newState ]
                                        , nextStateId = model.nextStateId + 1
                                        , selected = Just newState.id
                                        , selectedTransition = Nothing
                                        , dragging = Nothing
                                        , transitionFrom = Nothing
                                      }
                                    , Cmd.none
                                    )

                            _ ->
                                if targetTag == "svg" then
                                    case model.mode of
                                        MoveState ->
                                            ( { model | selected = Nothing, selectedTransition = Nothing }, Cmd.none )

                                        _ ->
                                            ( model, Cmd.none )

                                else
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
                                        label = normalizeTransitionLabel model.transitionLabel

                                        newTransition =
                                            { id = model.nextTransitionId
                                            , from = fromId
                                            , to = sid
                                            , label = label
                                            }
                                    in
                                    ( { model
                                        | transitions = model.transitions ++ [ newTransition ]
                                        , nextTransitionId = model.nextTransitionId + 1
                                        , transitionFrom = Nothing
                                        , selected = Nothing
                                        , selectedTransition = Nothing
                                      }
                                    , Cmd.none
                                    )

                    MoveState ->
                        ( { model | selected = Just sid, selectedTransition = Nothing }, Cmd.none )

                    _ ->
                        ( model, Cmd.none )

            SelectTransition tid ->
                case model.mode of
                    MoveState ->
                        ( { model | selectedTransition = Just tid, selected = Nothing }, Cmd.none )

                    _ ->
                        ( model, Cmd.none )

            DeleteState sid ->
                let
                    statesFiltered = List.filter (\s -> s.id /= sid) model.states
                    transFiltered = List.filter (\t -> t.from /= sid && t.to /= sid) model.transitions
                    normalized = normalizeAutomatonIds statesFiltered transFiltered
                in
                ( { model
                    | states = normalized.states
                    , transitions = normalized.transitions
                    , nextStateId = normalized.nextStateId
                    , nextTransitionId = normalized.nextTransitionId
                    , selected = Nothing
                    , selectedTransition = Nothing
                  }
                , Cmd.none
                )

            DeleteTransition tid ->
                let
                    transFiltered = List.filter (\t -> t.id /= tid) model.transitions
                    normalized = normalizeTransitionIds transFiltered
                in
                ( { model
                    | transitions = normalized.transitions
                    , nextTransitionId = normalized.nextTransitionId
                    , selectedTransition = Nothing
                  }
                , Cmd.none
                )

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
                ( { model | transitionLabel = normalizeTransitionLabel label }, Cmd.none )

            SetSelectedTransitionLabel label ->
                case model.selectedTransition of
                    Nothing ->
                        ( model, Cmd.none )

                    Just tid ->
                        let
                            normalizedLabel = normalizeTransitionLabel label

                            updateTransition transition =
                                if transition.id == tid then
                                    { transition | label = normalizedLabel }

                                else
                                    transition
                        in
                        ( { model | transitions = List.map updateTransition model.transitions }, Cmd.none )

            SetSelectedStateName name ->
                case model.selected of
                    Nothing ->
                        ( model, Cmd.none )

                    Just sid ->
                        let
                            normalizedName =
                                if String.isEmpty (String.trim name) then
                                    String.fromInt sid

                                else
                                    name

                            updateState s =
                                if s.id == sid then
                                    { s | name = normalizedName }

                                else
                                    s
                            updatedStates =
                                List.map updateState model.states
                        in
                        if hasDuplicateStateNames updatedStates then
                            ( { model | stateNameConflict = True }, Cmd.none )

                        else
                            ( { model | states = updatedStates, stateNameConflict = False }, Cmd.none )

            ImportCode ->
                case Decode.decodeString decodeAutomaton model.codeDraft of
                    Ok ( ss, ts ) ->
                        if hasDuplicateStateNames ss then
                            ( { model | stateNameConflict = True }, Cmd.none )

                        else
                            let
                                normalizedStates = enforceSingleStartFlag ss
                                normalizedAutomaton = normalizeAutomatonIds normalizedStates ts
                            in
                            ( { model
                                | states = normalizedAutomaton.states
                                , transitions = normalizedAutomaton.transitions
                                , nextStateId = normalizedAutomaton.nextStateId
                                , nextTransitionId = normalizedAutomaton.nextTransitionId
                                , stateNameConflict = False
                              }
                            , Cmd.none
                            )

                    Err _ ->
                        case decodeTransitionLanguage model.states model.codeDraft of
                            Ok ( ss, ts ) ->
                                let
                                    normalizedAutomaton = normalizeAutomatonIds ss ts
                                in
                                ( { model
                                    | states = normalizedAutomaton.states
                                    , transitions = normalizedAutomaton.transitions
                                    , nextStateId = normalizedAutomaton.nextStateId
                                    , nextTransitionId = normalizedAutomaton.nextTransitionId
                                    , stateNameConflict = False
                                  }
                                , Cmd.none
                                )

                            Err _ ->
                                ( model, Cmd.none )

            ExportCode ->
                ( { model | codeDraft = encodeTransitionLanguage model.states model.transitions }, Cmd.none )

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

            ChooseSimulationTransition _ ->
                ( model, Cmd.none )

            WheelPan dx dy ->
                ( panWithWheel dx dy model, Cmd.none )

            SetViewport w h ->
                ( { model | viewportWidth = w, viewportHeight = h }, Cmd.none )

            StopSimulation ->
                ( stopSimulation Idle model, Cmd.none )

            OpenSaveModal ->
                ( { model | saveModalOpen = True }, Cmd.none )

            CloseSaveModal ->
                ( { model | saveModalOpen = False }, Cmd.none )

            SaveToSlot slotId ->
                let
                    automatonJson =
                        Encode.encode 2 (encodeAutomaton model.states model.transitions)

                    updateSlot slot =
                        if slot.id == slotId then
                            { slot | automatonJson = automatonJson }

                        else
                            slot
                in
                ( { model | saveSlots = List.map updateSlot model.saveSlots }, Cmd.none )

            LoadFromSlot slotId ->
                let
                    maybeSlot =
                        List.head (List.filter (\slot -> slot.id == slotId) model.saveSlots)
                in
                case maybeSlot of
                    Nothing ->
                        ( model, Cmd.none )

                    Just slot ->
                        if String.isEmpty slot.automatonJson then
                            ( model, Cmd.none )

                        else
                            case Decode.decodeString decodeAutomaton slot.automatonJson of
                                Ok ( ss, ts ) ->
                                    if hasDuplicateStateNames ss then
                                        ( { model | stateNameConflict = True }, Cmd.none )

                                    else
                                        let
                                            normalizedStates =
                                                enforceSingleStartFlag ss

                                            normalizedAutomaton =
                                                normalizeAutomatonIds normalizedStates ts
                                        in
                                        ( { model
                                            | states = normalizedAutomaton.states
                                            , transitions = normalizedAutomaton.transitions
                                            , nextStateId = normalizedAutomaton.nextStateId
                                            , nextTransitionId = normalizedAutomaton.nextTransitionId
                                            , selected = Nothing
                                            , selectedTransition = Nothing
                                            , dragging = Nothing
                                            , transitionFrom = Nothing
                                            , simulationRunning = False
                                            , simulationQueue = []
                                            , simulationCurrent = Nothing
                                            , simulationResult = Idle
                                            , simulationChoice = Nothing
                                            , stateNameConflict = False
                                          }
                                        , Cmd.none
                                        )

                                Err _ ->
                                    ( model, Cmd.none )

            DeleteFromSlot slotId ->
                let
                    updateSlot slot =
                        if slot.id == slotId then
                            { slot | automatonJson = "", name = "" }

                        else
                            slot
                in
                ( { model | saveSlots = List.map updateSlot model.saveSlots }, Cmd.none )

            RenameSlot slotId slotName ->
                let
                    updateSlot slot =
                        if slot.id == slotId then
                            { slot | name = String.trim slotName }

                        else
                            slot
                in
                ( { model | saveSlots = List.map updateSlot model.saveSlots }, Cmd.none )

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


normalizeTransitionLabel : String -> String
normalizeTransitionLabel raw =
    String.left 1 raw


hasDuplicateStateNames : List State -> Bool
hasDuplicateStateNames states =
    let
        names =
            states |> List.map (.name >> String.trim)
    in
    List.length names /= List.length (List.foldl unique [] names)


unique : String -> List String -> List String
unique value acc =
    if List.member value acc then
        acc

    else
        value :: acc


isLambdaLabel : String -> Bool
isLambdaLabel label =
    String.isEmpty label


type alias NormalizedTransitionIds =
    { transitions : List Transition
    , nextTransitionId : Int
    }


type alias NormalizedAutomaton =
    { states : List State
    , transitions : List Transition
    , nextStateId : Int
    , nextTransitionId : Int
    }


normalizeTransitionIds : List Transition -> NormalizedTransitionIds
normalizeTransitionIds transitions =
    let
        sorted = List.sortBy .id transitions

        step transition ( nextId, acc ) =
            ( nextId + 1, { transition | id = nextId } :: acc )

        ( nextTransitionId, reversed ) =
            List.foldl step ( 1, [] ) sorted
    in
    { transitions = List.reverse reversed
    , nextTransitionId = nextTransitionId
    }


normalizeAutomatonIds : List State -> List Transition -> NormalizedAutomaton
normalizeAutomatonIds states transitions =
    let
        sortedStates = List.sortBy .id states

        renumberStates state ( nextId, mapping, acc ) =
            let
                normalizedName =
                    if state.name == String.fromInt state.id then
                        String.fromInt nextId

                    else
                        state.name

                newState =
                    { state | id = nextId, name = normalizedName }
            in
            ( nextId + 1
            , Dict.insert state.id nextId mapping
            , newState :: acc
            )

        ( nextStateId, stateIdMap, reversedStates ) =
            List.foldl renumberStates ( 1, Dict.empty, [] ) sortedStates

        remapStateId oldId =
            Dict.get oldId stateIdMap |> Maybe.withDefault oldId

        remappedTransitions =
            List.map
                (\transition ->
                    { transition
                        | from = remapStateId transition.from
                        , to = remapStateId transition.to
                    }
                )
                transitions

        normalizedTransitions =
            normalizeTransitionIds remappedTransitions
    in
    { states = List.reverse reversedStates
    , transitions = normalizedTransitions.transitions
    , nextStateId = nextStateId
    , nextTransitionId = normalizedTransitions.nextTransitionId
    }


findStartState : List State -> Maybe State
findStartState states =
    List.head <| List.filter .isStart states


hasLambdaFrom : Int -> List Transition -> Bool
hasLambdaFrom sid transitions =
    List.any (\t -> t.from == sid && isLambdaLabel t.label) transitions


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
            List.any (\t -> isLambdaLabel t.label) transitions
    in
    (not hasDuplicate) && (not hasLambda)


editorLayout : Model -> { editorHeight : Int, canvasWidth : Int, canvasHeight : Int }
editorLayout model =
    let
        editorHeight =
            Basics.max 420 (model.viewportHeight - 170)

        canvasWidth =
            Basics.max 460 (model.viewportWidth - 640)

        canvasHeight =
            editorHeight - 84
    in
    { editorHeight = editorHeight, canvasWidth = canvasWidth, canvasHeight = canvasHeight }


panWithWheel : Float -> Float -> Model -> Model
panWithWheel dx dy model =
    { model
        | panX = model.panX - dx
        , panY = model.panY - dy
        , panning = Nothing
        , dragging = Nothing
    }


centerChoiceInCanvas : Int -> Model -> Model
centerChoiceInCanvas sid model =
    case getStateById sid model.states of
        Nothing ->
            model

        Just state ->
            let
                layout =
                    editorLayout model

                popupWidth =
                    280

                popupGap =
                    24

                popupHeight =
                    140

                targetPanX =
                    toFloat layout.canvasWidth / 2 + toFloat popupWidth / 2 + toFloat popupGap - state.x

                targetPanY =
                    toFloat layout.canvasHeight / 2 + toFloat popupHeight / 2 - state.y
            in
            { model | panX = targetPanX, panY = targetPanY }
            
            
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
        , simulationChoice = Nothing
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
                , simulationChoice = Nothing
              }
            , cmd
            )


applySimulationTransition : Transition -> Bool -> List Char -> List Char -> Model -> ( Model, Cmd Msg )
applySimulationTransition transition consumesInput rest queue model =
    let
        delay = parseDelay model.simulationDelay
        nextQueue =
            if consumesInput then
                rest

            else
                queue

        willContinue =
            (not (List.isEmpty nextQueue)) || hasLambdaFrom transition.to model.transitions

        cmd =
            if willContinue then
                Process.sleep delay |> Task.perform (\_ -> AdvanceSimulation)

            else
                Cmd.none
    in
    ( { model
        | simulationQueue = nextQueue
        , simulationCurrent = Just transition.to
        , selected = Just transition.to
        , simulationRunning = willContinue
        , simulationChoice = Nothing
        , simulationResult =
            if willContinue then
                Running

            else
                case getStateById transition.to model.states of
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

                charMatches =
                    case maybeChar of
                        Nothing ->
                            []

                        Just lbl ->
                            List.filter (\t -> t.from == sid && t.label == lbl) model.transitions

                lambdaMatches =
                    List.filter (\t -> t.from == sid && isLambdaLabel t.label) model.transitions

                ( candidates, consumesInput, inputLabel ) =
                    if List.isEmpty charMatches then
                        ( lambdaMatches, False, "λ" )

                    else
                        ( charMatches, True, Maybe.withDefault "" maybeChar )
            in
            case candidates of
                [] ->
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

                [ single ] ->
                    applySimulationTransition single consumesInput rest queue model

                _ ->
                    let
                        centeredModel =
                            centerChoiceInCanvas sid model
                    in
                    ( { centeredModel
                        | simulationRunning = False
                        , simulationChoice =
                            Just
                                { stateId = sid
                                , inputLabel = inputLabel
                                , transitionIds = List.map .id candidates
                                , consumesInput = consumesInput
                                }
                        , selected = Just sid
                        , simulationResult = Running
                      }
                    , Cmd.none
                    )




-- JSON helpers

defaultSaveSlots : Int -> List SaveSlot
defaultSaveSlots count =
    List.range 1 count
        |> List.map (\slotId -> { id = slotId, name = "", automatonJson = "" })


ensureSlotCount : Int -> List SaveSlot -> List SaveSlot
ensureSlotCount count slots =
    let
        byId sid =
            List.head (List.filter (\slot -> slot.id == sid) slots)
                |> Maybe.withDefault { id = sid, name = "", automatonJson = "" }
    in
    List.range 1 count |> List.map byId


encodeSaveSlots : List SaveSlot -> String
encodeSaveSlots slots =
    slots
        |> Encode.list
            (\slot ->
                Encode.object
                    [ ( "id", Encode.int slot.id )
                    , ( "name", Encode.string slot.name )
                    , ( "automatonJson", Encode.string slot.automatonJson )
                    ]
            )
        |> Encode.encode 0


decodeSaveSlots : String -> List SaveSlot
decodeSaveSlots raw =
    case Decode.decodeString (Decode.list decodeSaveSlot) raw of
        Ok slots ->
            ensureSlotCount 5 slots

        Err _ ->
            defaultSaveSlots 5


decodeSaveSlot : Decode.Decoder SaveSlot
decodeSaveSlot =
    Decode.map3
        (\id name automatonJson ->
            { id = id, name = name, automatonJson = automatonJson }
        )
        (Decode.field "id" Decode.int)
        (Decode.field "name" Decode.string)
        (Decode.field "automatonJson" Decode.string)

type alias ParsedTransition =
    { fromName : String
    , toName : String
    , label : String
    }


encodeTransitionLanguage : List State -> List Transition -> String
encodeTransitionLanguage states transitions =
    transitions
        |> List.sortBy .id
        |> List.map
            (\tr ->
                "("
                    ++ stateNameById states tr.from
                    ++ ", "
                    ++ (if isLambdaLabel tr.label then
                            "λ"

                        else
                            tr.label
                       )
                    ++ ") => "
                    ++ stateNameById states tr.to
            )
        |> String.join "\n"


stateNameById : List State -> Int -> String
stateNameById states stateId =
    case getStateById stateId states of
        Just state ->
            state.name

        Nothing ->
            String.fromInt stateId


decodeTransitionLanguage : List State -> String -> Result String ( List State, List Transition )
decodeTransitionLanguage existingStates raw =
    let
        lines =
            raw
                |> String.lines
                |> List.map String.trim
                |> List.filter (not << String.isEmpty)
    in
    case traverseResults parseTransitionLine lines of
        Err err ->
            Err err

        Ok parsedTransitions ->
            Ok (buildAutomatonFromParsedTransitions existingStates parsedTransitions)


parseTransitionLine : String -> Result String ParsedTransition
parseTransitionLine line =
    case String.split "=>" line of
        [ leftRaw, rightRaw ] ->
            let
                left = String.trim leftRaw
                right = String.trim rightRaw
            in
            if String.startsWith "(" left && String.endsWith ")" left then
                let
                    inside =
                        left
                            |> String.dropLeft 1
                            |> String.dropRight 1

                    parts =
                        String.split "," inside
                            |> List.map String.trim
                in
                case parts of
                    [ fromName, condition ] ->
                        if String.isEmpty fromName || String.isEmpty right then
                            Err line

                        else
                            Ok
                                { fromName = fromName
                                , toName = right
                                , label =
                                    if condition == "λ" then
                                        ""

                                    else
                                        normalizeTransitionLabel condition
                                }

                    _ ->
                        Err line

            else
                Err line

        _ ->
            Err line


traverseResults : (a -> Result x b) -> List a -> Result x (List b)
traverseResults f list =
    List.foldr
        (\item acc ->
            case ( f item, acc ) of
                ( Ok v, Ok vs ) ->
                    Ok (v :: vs)

                ( Err e, _ ) ->
                    Err e

                ( _, Err e ) ->
                    Err e
        )
        (Ok [])
        list


buildAutomatonFromParsedTransitions : List State -> List ParsedTransition -> ( List State, List Transition )
buildAutomatonFromParsedTransitions existingStates parsedTransitions =
    let
        spacingX = 160
        spacingY = 100

        names =
            parsedTransitions
                |> List.concatMap (\t -> [ t.fromName, t.toName ])
                |> List.foldl
                    (\name acc -> if List.member name acc then acc else acc ++ [ name ])
                    []

        existingPositionsByName =
            existingStates
                |> List.foldl (\state acc -> Dict.insert state.name ( state.x, state.y ) acc) Dict.empty

        existingStateByName =
            existingStates
                |> List.foldl (\state acc -> Dict.insert state.name state acc) Dict.empty

        isOccupied occupied ( x, y ) =
            List.any (\( ox, oy ) -> ox == x && oy == y) occupied

        placeWithoutOverlap occupied ( x, y ) =
            if isOccupied occupied ( x, y ) then
                placeWithoutOverlap occupied ( x, y + toFloat spacingY )

            else
                ( x, y )

        findAnchorFromIncoming name positions =
            parsedTransitions
                |> List.filter (\tr -> tr.toName == name)
                |> List.head
                |> Maybe.andThen (\tr -> Dict.get tr.fromName positions)

        findAnchorFromOutgoing name positions =
            parsedTransitions
                |> List.filter (\tr -> tr.fromName == name)
                |> List.head
                |> Maybe.andThen (\tr -> Dict.get tr.toName positions)

        placeUnresolved namesToPlace positions =
            if List.isEmpty namesToPlace then
                positions

            else
                let
                    step name ( accPositions, unresolved, hasProgress ) =
                        case Dict.get name accPositions of
                            Just _ ->
                                ( accPositions, unresolved, hasProgress )

                            Nothing ->
                                let
                                    occupied = Dict.values accPositions
                                in
                                case findAnchorFromIncoming name accPositions of
                                    Just ( ax, ay ) ->
                                        let
                                            target = placeWithoutOverlap occupied ( ax + toFloat spacingX, ay )
                                        in
                                        ( Dict.insert name target accPositions, unresolved, True )

                                    Nothing ->
                                        case findAnchorFromOutgoing name accPositions of
                                            Just ( tx, ty ) ->
                                                let
                                                    target = placeWithoutOverlap occupied ( tx + toFloat spacingX, ty )
                                                in
                                                ( Dict.insert name target accPositions, unresolved, True )

                                            Nothing ->
                                                ( accPositions, unresolved ++ [ name ], hasProgress )

                    ( progressedPositions, unresolvedNames, didProgress ) =
                        List.foldl step ( positions, [], False ) namesToPlace
                in
                if didProgress then
                    placeUnresolved unresolvedNames progressedPositions

                else
                    let
                        fallback name acc =
                            case Dict.get name acc of
                                Just _ ->
                                    acc

                                Nothing ->
                                    let
                                        index = Dict.size acc
                                        yRow = remainderBy 5 index
                                        xCol = index // 5
                                        candidate = ( 100 + toFloat (xCol * spacingX), 100 + toFloat (yRow * spacingY) )
                                        target = placeWithoutOverlap (Dict.values acc) candidate
                                    in
                                    Dict.insert name target acc
                    in
                    List.foldl fallback progressedPositions unresolvedNames

        placeState fallbackName positions =
            case Dict.get fallbackName positions of
                Just _ ->
                    positions

                Nothing ->
                    let
                        index = Dict.size positions
                        yRow = remainderBy 5 index
                        xCol = index // 5
                    in
                    Dict.insert fallbackName ( 100 + toFloat (xCol * spacingX), 100 + toFloat (yRow * spacingY) ) positions

        placeFromTo transition positions =
            let
                fromPosition = Dict.get transition.fromName positions
                toPosition = Dict.get transition.toName positions
            in
            case ( fromPosition, toPosition ) of
                ( Just ( fx, fy ), Nothing ) ->
                    Dict.insert transition.toName ( fx + toFloat spacingX, fy ) positions

                ( Nothing, Just ( tx, ty ) ) ->
                    Dict.insert transition.fromName ( tx - toFloat spacingX, ty ) positions

                ( Nothing, Nothing ) ->
                    let
                        seeded = placeState transition.fromName positions
                    in
                    placeFromTo transition seeded

                _ ->
                    positions

        seededPositions =
            List.foldl placeFromTo existingPositionsByName parsedTransitions

        allPositions =
            placeUnresolved names seededPositions

        indexedNames =
            List.indexedMap (\idx name -> ( name, idx + 1 )) names

        idByName =
            Dict.fromList indexedNames

        states =
            indexedNames
                |> List.map
                    (\( name, sid ) ->
                        let
                            ( x, y ) = Dict.get name allPositions |> Maybe.withDefault ( 100, 100 )
                            maybeExistingState = Dict.get name existingStateByName
                        in
                        { id = sid
                        , name = name
                        , x = x
                        , y = y
                        , accepting = maybeExistingState |> Maybe.map .accepting |> Maybe.withDefault False
                        , isStart = maybeExistingState |> Maybe.map .isStart |> Maybe.withDefault (sid == 1)
                        }
                    )

        transitions =
            parsedTransitions
                |> List.indexedMap
                    (\idx tr ->
                        { id = idx + 1
                        , from = Dict.get tr.fromName idByName |> Maybe.withDefault 1
                        , to = Dict.get tr.toName idByName |> Maybe.withDefault 1
                        , label = tr.label
                        }
                    )
    in
    ( states, transitions )


encodeState : State -> Encode.Value
encodeState s =
    Encode.object
        [ ( "id", Encode.int s.id )
        , ( "name", Encode.string s.name )
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
    Decode.field "id" Decode.int
        |> Decode.andThen
            (\id ->
                Decode.map5
                    (\x y accepting isStart maybeName ->
                        { id = id
                        , name = Maybe.withDefault (String.fromInt id) maybeName
                        , x = x
                        , y = y
                        , accepting = accepting
                        , isStart = isStart
                        }
                    )
                    (Decode.field "x" Decode.float)
                    (Decode.field "y" Decode.float)
                    (Decode.field "accepting" Decode.bool)
                    (Decode.field "isStart" Decode.bool)
                    (Decode.maybe (Decode.field "name" Decode.string))
            )


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

view : { lang : Lang, theme : Theme, viewportWidth : Int, viewportHeight : Int } -> Model -> Html Msg
view ctx model =
    let
        layout =
            editorLayout model

        content =
            div
                [ HA.style "display" "flex"
                , HA.style "gap" "12px"
                , HA.style "color" (textColor ctx.theme)
                , HA.style "height" (String.fromInt layout.editorHeight ++ "px")
                , HA.style "overflow" "hidden"
                ]
                [ div [ HA.style "flex" "1", HA.style "min-width" "0", HA.style "display" "flex", HA.style "flex-direction" "column" ]
                    [ H.h2 [ HA.style "margin" "0 0 8px 0" ] [ H.text (t ctx.lang EditorTitle) ]
                    , svgView ctx model layout.canvasWidth layout.canvasHeight
                    ]
                , sidePanel ctx model
                , automatonPanel ctx model
                ]
    in
    div [ HA.style "height" "100%", HA.style "overflow" "hidden" ]
        [ div [ HA.style "margin-bottom" "8px" ]
            [ H.button [ onClick OpenSaveModal ] [ H.text (t ctx.lang EditorSave) ] ]
        , content
        , if model.saveModalOpen then
            saveModal ctx model

          else
            text ""
        ]


wheelPanEvent : H.Attribute Msg
wheelPanEvent =
    custom "wheel"
        (Decode.map
            (\msg ->
                { message = msg
                , stopPropagation = False
                , preventDefault = True
                }
            )
            (Decode.map2 WheelPan
                (Decode.field "deltaX" Decode.float)
                (Decode.field "deltaY" Decode.float)
            )
        )




svgView ctx model width height =
    let
        cursor =
            case model.mode of
                AddState -> "crosshair"
                AddTransition -> "pointer"
                MoveState -> "move"
    in
    div
        [ HA.style "position" "relative"
        , HA.style "flex" "1"
        , HA.style "min-height" "0"
        , wheelPanEvent
        ]
        [ S.svg
            [ SA.width "100%"
            , SA.height "100%"
            , SA.viewBox ("0 0 " ++ String.fromInt width ++ " " ++ String.fromInt height)
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
        , simulationChoiceOverlay ctx model
        ]


simulationChoiceOverlay : { a | lang : Lang, theme : Theme } -> Model -> Html Msg
simulationChoiceOverlay ctx model =
    case model.simulationChoice of
        Nothing ->
            text ""

        Just choice ->
            case getStateById choice.stateId model.states of
                Nothing ->
                    text ""

                Just state ->
                    let
                        layout =
                            editorLayout model

                        popupWidth =
                            280

                        popupGap =
                            24

                        topPos =
                            Basics.max 8 (Basics.min (toFloat layout.canvasHeight - 170) (state.y + model.panY - 30)) --92

                        leftPos =
                            let
                                desiredLeft =
                                    state.x + model.panX - toFloat popupWidth - toFloat popupGap - 60

                                maxCanvasLeft =
                                    toFloat layout.canvasWidth - toFloat popupWidth - 8
                            in
                            Basics.min maxCanvasLeft desiredLeft

                        relatedTransitions =
                            List.filter (\transition -> List.member transition.id choice.transitionIds) model.transitions

                        transitionButton transition =
                            H.button
                                [ onClick (ChooseSimulationTransition transition.id)
                                , HA.style "display" "block"
                                , HA.style "width" "100%"
                                , HA.style "margin-top" "6px"
                                , HA.style "text-align" "left"
                                ]
                                [ H.text (stateNameById model.states transition.from ++ " → " ++ stateNameById model.states transition.to ++ " [" ++ transition.label ++ "]") ]
                    in
                    div
                        [ HA.style "position" "absolute"
                        , HA.style "left" (String.fromFloat leftPos ++ "px")
                        , HA.style "top" (String.fromFloat topPos ++ "px")
                        , HA.style "background" (panelBg ctx.theme)
                        , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
                        , HA.style "border-radius" "10px"
                        , HA.style "padding" "10px"
                        , HA.style "width" "280px"
                        , HA.style "box-shadow" "0 10px 24px rgba(0,0,0,0.25)"
                        , HA.style "z-index" "12"
                        ]
                        [ div [ HA.style "font-weight" "bold" ] [ H.text (t ctx.lang I18n.EditorSimulationChoiceTitle) ]
                        , div [ HA.style "margin-top" "4px" ] [ H.text (t ctx.lang I18n.EditorSimulationChoiceBody ++ " " ++ state.name ++ ", " ++ t ctx.lang I18n.EditorTransitionLabel ++ ": " ++ choice.inputLabel) ]
                        , div [ HA.style "margin-top" "8px" ] (List.map transitionButton relatedTransitions)
                        , div
                            [ HA.style "position" "absolute"
                            , HA.style "right" "-5px"
                            , HA.style "top" "38px"
                            , HA.style "width" "10px"
                            , HA.style "height" "10px"
                            , HA.style "background" (panelBg ctx.theme)
                            , HA.style "border-right" ("1px solid " ++ panelBorder ctx.theme)
                            , HA.style "border-top" ("1px solid " ++ panelBorder ctx.theme)
                            , HA.style "transform" "rotate(45deg)"
                            ]
                            []
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
                    [ SA.x (String.fromFloat (s.x - (toFloat (String.length s.name) * 3.5)))
                    , SA.y (String.fromFloat (s.y + 6))
                    , SA.fontSize "14"
                    , SA.fill (textColor ctx.theme)
                    , SA.style "user-select: none; -webkit-user-select: none; -moz-user-select: none;"
                    , SA.pointerEvents "none"
                    ]
                    [ S.text s.name ]
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
                shownLabel =
                    if isLambdaLabel t.label then
                        "λ"

                    else
                        t.label

                hitWidth = Basics.max 24 (toFloat (String.length shownLabel) * 9)
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
                    , SA.stroke "transparent"
                    , SA.strokeWidth "10"
                    , selectTransitionOnClick
                    ]
                    []
                , S.line
                    [ SA.x1 (String.fromFloat startX), SA.y1 (String.fromFloat startY)
                    , SA.x2 (String.fromFloat endX), SA.y2 (String.fromFloat endY)
                    , SA.stroke (textColor ctx.theme)
                    , SA.strokeWidth strokeWidth
                    , SA.markerEnd "url(#arrowhead)"
                    , SA.pointerEvents "none"
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
                    [ S.text shownLabel ]
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
            [ HA.style "width" "220px"
            , HA.style "background" (panelBg ctx.theme)
            , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
            , HA.style "padding" "12px"
            , HA.style "border-radius" "12px"
            , HA.style "align-self" "flex-start"
            , HA.style "overflow" "auto"
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


saveModal : { a | theme : Theme, lang : Lang } -> Model -> Html Msg
saveModal ctx model =
    let
        viewSlot slot =
            let
                slotLabel =
                    if String.isEmpty slot.automatonJson then
                        t ctx.lang EditorSlotEmpty

                    else if String.isEmpty slot.name then
                        ""

                    else
                        slot.name
            in
            div
                [ HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
                , HA.style "padding" "10px"
                , HA.style "border-radius" "8px"
                ]
                [ H.div [] [ H.text (t ctx.lang EditorSlot ++ " " ++ String.fromInt slot.id ++ ": " ++ slotLabel) ]
                , input
                    [ HA.type_ "text"
                    , value slot.name
                    , placeholder (t ctx.lang EditorRenameSlot)
                    , onInput (RenameSlot slot.id)
                    ]
                    []
                , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "margin-top" "8px" ]
                    [ H.button [ onClick (SaveToSlot slot.id) ] [ H.text (t ctx.lang EditorSaveToSlot) ]
                    , H.button [ onClick (LoadFromSlot slot.id), HA.disabled (String.isEmpty slot.automatonJson) ] [ H.text (t ctx.lang EditorLoadFromSlot) ]
                    , H.button [ onClick (DeleteFromSlot slot.id), HA.disabled (String.isEmpty slot.automatonJson) ] [ H.text (t ctx.lang EditorDeleteFromSlot) ]
                    ]
                ]
    in
    div
        [ HA.style "position" "fixed"
        , HA.style "inset" "0"
        , HA.style "background" "rgba(0,0,0,0.45)"
        , HA.style "z-index" "2000"
        , onClick CloseSaveModal
        ]
        [ div
            [ HA.style "max-width" "740px"
            , HA.style "margin" "40px auto"
            , HA.style "background" (panelBg ctx.theme)
            , HA.style "color" (textColor ctx.theme)
            , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
            , HA.style "border-radius" "12px"
            , HA.style "padding" "16px"
            , stopPropagationOn "click" (Decode.succeed ( NoOp, True ))
            ]
            [ H.h2 [] [ H.text (t ctx.lang EditorSaveModalTitle) ]
            , div [ HA.style "display" "grid", HA.style "grid-template-columns" "1fr", HA.style "gap" "10px" ] (List.map viewSlot model.saveSlots)
            , div [ HA.style "margin-top" "12px" ] [ H.button [ onClick CloseSaveModal ] [ H.text (t ctx.lang EditorClose) ] ]
            ]
        ]


sidePanel ctx model =
    let
        simulationLocked =
            model.simulationRunning || (model.simulationChoice /= Nothing)

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
                       , HA.disabled simulationLocked
                       ]
                )
                [ H.text label ]
    in
    div
        [ HA.style "width" "360px"
        , HA.style "background" (panelBg ctx.theme)
        , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
        , HA.style "padding" "12px"
        , HA.style "border-radius" "12px"
        , HA.style "overflow" "auto"
        ]
        [ H.h2 [] [ H.text (t ctx.lang EditorTransitionFunction) ]
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
            ]
        , if model.mode == AddTransition then
            div []
                [ H.h2 [] [ H.text (t ctx.lang EditorTransitions) ]
                , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "align-items" "center" ]
                    [ input
                        [ HA.type_ "text"
                        , size 12
                        , maxlength 1
                        , placeholder "λ"
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
                            [ text (t ctx.lang EditorTransitionFrom ++ ": " ++ stateNameById model.states sid ++ " → " ++ t ctx.lang EditorTransitionSelectStart) ]
                  )
                ]
            else
            text ""
        , if model.mode == MoveState then
            div []
                [ H.h2 [] [ H.text (t ctx.lang EditorSelected) ]
                , case ( model.selected, model.selectedTransition ) of
                    ( Just sid, _ ) ->
                        case getStateById sid model.states of
                            Nothing ->
                                div [] [ H.text (t ctx.lang EditorSelectedNotFound) ]

                            Just s ->
                                div []
                                    [ div [] [ H.text (t ctx.lang EditorSelectedState ++ ": " ++ String.fromInt s.id) ]
                                    , div [ HA.style "margin-top" "6px" ]
                                        [ H.text (t ctx.lang EditorStateName ++ ": ")
                                        , input
                                            [ HA.type_ "text"
                                            , value s.name
                                            , onInput SetSelectedStateName
                                            ]
                                            []
                                        ]
                                    , if model.stateNameConflict then
                                        div [ HA.style "color" "#e74c3c", HA.style "margin-top" "4px" ] [ H.text (t ctx.lang EditorStateNameUniqueError) ]

                                      else
                                        text ""
                                    , div [] [ H.text (t ctx.lang EditorSelectedPos ++ ": " ++ String.fromFloat s.x ++ ", " ++ String.fromFloat s.y) ]
                                    , div [] [ H.text (t ctx.lang EditorSelectedAccepting ++ ": " ++ (if s.accepting then t ctx.lang EditorYes else t ctx.lang EditorNo)) ]
                                    , div [] [ H.text (t ctx.lang EditorSelectedStart ++ ": " ++ (if s.isStart then t ctx.lang EditorYes else t ctx.lang EditorNo)) ]
                                    , div [ HA.style "margin-top" "8px", HA.style "display" "flex", HA.style "gap" "8px" ]
                                        [ H.button [ onClick (DeleteState s.id) ] [ H.text (t ctx.lang EditorDeleteState) ] ]
                                    , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "margin-top" "8px" ]
                                        [ H.button
                                            [ onClick (ToggleStart s.id)
                                            , HA.disabled simulationLocked
                                            ]
                                            [ H.text (if s.isStart then t ctx.lang EditorUnsetStart else t ctx.lang EditorMakeStart) ]
                                        , H.button
                                            [ onClick (ToggleAccepting s.id)
                                            , HA.disabled simulationLocked
                                            ]
                                            [ H.text (if s.accepting then t ctx.lang EditorUnsetAccepting else t ctx.lang EditorMakeAccepting) ]
                                        ]
                                    ]

                    ( Nothing, Just tid ) ->
                        case List.head (List.filter (\transition -> transition.id == tid) model.transitions) of
                            Nothing ->
                                div [] [ H.text (t ctx.lang EditorSelectedNotFound) ]

                            Just transition ->
                                div []
                                    [ div [] [ H.text (t ctx.lang EditorSelectedTransition ++ ": " ++ String.fromInt transition.id) ]
                                    , div [] [ H.text (t ctx.lang EditorTransitionFrom ++ ": " ++ stateNameById model.states transition.from ++ " → " ++ stateNameById model.states transition.to) ]
                                    , input
                                        [ HA.type_ "text"
                                        , size 12
                                        , maxlength 1
                                        , placeholder "λ"
                                        , value transition.label
                                        , onInput SetSelectedTransitionLabel
                                        ]
                                        []
                                    , div [ HA.style "margin-top" "8px", HA.style "display" "flex", HA.style "gap" "8px" ]
                                        [ H.button [ onClick (DeleteTransition transition.id) ] [ H.text (t ctx.lang EditorDeleteTransition) ] ]
                                    ]
                                    
                    _ ->
                        div [] [ H.text (t ctx.lang EditorSelectedNone) ]
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
                , HA.disabled simulationLocked
                ]
                []
            , textarea
                [ rows 1
                , cols 8
                , placeholder (t ctx.lang EditorSimulationDelay)
                , value model.simulationDelay
                , onInput SetSimulationDelay
                , HA.disabled simulationLocked
                ]
                []
            ]
        , div [ HA.style "margin-top" "6px", HA.style "display" "flex", HA.style "gap" "8px" ]
            [ H.button
                (baseButtonStyles
                    ++ [ onClick StartSimulation
                       , HA.disabled simulationLocked
                       ]
                )
                [ H.text (t ctx.lang EditorSimulationStart) ]
            , H.button
                (baseButtonStyles
                    ++ [ onClick StopSimulation
                       , HA.disabled (not (model.simulationRunning || (model.simulationChoice /= Nothing)))
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