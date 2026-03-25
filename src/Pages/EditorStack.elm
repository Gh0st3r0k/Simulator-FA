module Pages.EditorStack exposing (Model, Msg(..), SaveSlot, decodeSaveSlots, encodeSaveSlots, exportAutomatonJson, exportRuntimeSnapshotJson, init, initWithSlots, update, view)

import Dict
import AutomatonFormat exposing (AutomatonType(..), decodeAutomatonDocument, encodeAutomatonDocument)
import Browser.Dom as Dom
import Html as H exposing (Html, button, div, input, textarea, text)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (custom, on, onBlur, onClick, onFocus, onInput, stopPropagationOn)
import I18n exposing (Key(..), Lang, t)
import Json.Decode as Decode
import Json.Encode as Encode
import Process
import String
import Svg as S
import Svg.Attributes as SA
import Svg.Events as SE
import Task
import Theme exposing (Theme, errorColor, hoverBg, hoverBorder, hoverShadow, inputBg, interactiveBg, interactiveBorder, panelBg, panelBorder, stackBorder, stackEmptyBg, stackFillBg, successColor, textColor, warningColor)


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
    , zoom : Float
    , selected : Maybe Int
    , selectedTransition : Maybe Int
    , selectedTransitionLabelDraft : String
    , mode : Mode
    , transitionFrom : Maybe Int
    , transitionLabel : String
    , transitionStackInput : String
    , transitionStackOutput : String
    , selectedTransitionStackInputDraft : String
    , selectedTransitionStackOutputDraft : String
    , codeDraft : String
    , codeDraftVersion : Int
    , codeDraftDirty : Bool
    , codeEditorFocused : Bool
    , codeValidationErrors : List CodeValidationError
    , codeEditorScrollTop : Float
    , codeEditorScrollLeft : Float
    , simulationInput : String
    , simulationDelay : String
    , simulationRunning : Bool
    , simulationQueue : List Char
    , simulationStack : List String
    , simulationCurrent : Maybe Int
    , simulationActiveTransition : Maybe Int
    , simulationInputIndex : Int
    , simulationResult : SimulationResult
    , simulationChoice : Maybe PendingChoice
    , simulationRunMode : Maybe SimulationRunMode
    , simulationHistory : List SimulationSnapshot
    , stateNameConflict : Bool
    , saveModalOpen : Bool
    , saveSlots : List SaveSlot
    , renamingSlot : Maybe Int
    , renameDraft : String
    , recentlySavedSlot : Maybe Int
    , animatingSavedSlot : Maybe Int
    , animatingDeletedSlot : Maybe Int
    , slotImportError : Bool
    , slotTypeMismatchError : Bool
    , viewportWidth : Int
    , viewportHeight : Int
    , automatonTypeExpanded : Bool
    , automatonTypeAnimationActive : Bool
    , automatonTypeAnimationNonce : Int
    , globalNotice : Maybe Key
    , globalNoticeNonce : Int
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


type alias TransitionPayload =
    { from : Int
    , to : Int
    , label : String
    }


type alias TransitionGroup =
    { from : Int
    , to : Int
    , transitionIds : List Int
    , labels : List String
    , primaryId : Int
    }


type alias SaveSlot =
    { id : Int
    , name : String
    , automatonJson : String
    , automatonType : Maybe AutomatonType
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

type SimulationRunMode
    = AutoRun
    | StepRun


type alias SimulationSnapshot =
    { simulationQueue : List Char
    , simulationStack : List String
    , simulationCurrent : Maybe Int
    , simulationActiveTransition : Maybe Int
    , simulationInputIndex : Int
    , simulationResult : SimulationResult
    , simulationChoice : Maybe PendingChoice
    , selected : Maybe Int
    }
    

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
    , zoom = 1
    , selected = Nothing
    , selectedTransition = Nothing
    , selectedTransitionLabelDraft = ""
    , mode = AddState
    , transitionFrom = Nothing
    , transitionLabel = ""
    , transitionStackInput = ""
    , transitionStackOutput = ""
    , selectedTransitionStackInputDraft = ""
    , selectedTransitionStackOutputDraft = ""
    , codeDraft = ""
    , codeDraftVersion = 0
    , codeDraftDirty = False
    , codeEditorFocused = False
    , codeValidationErrors = []
    , codeEditorScrollTop = 0
    , codeEditorScrollLeft = 0
    , simulationInput = ""
    , simulationDelay = "500"
    , simulationRunning = False
    , simulationQueue = []
    , simulationStack = [ "Z" ]
    , simulationCurrent = Nothing
    , simulationActiveTransition = Nothing
    , simulationInputIndex = 0
    , simulationResult = Idle
    , simulationChoice = Nothing
    , simulationRunMode = Nothing
    , simulationHistory = []
    , stateNameConflict = False
    , saveModalOpen = False
    , saveSlots = ensureSlotCount 5 slots
    , renamingSlot = Nothing
    , renameDraft = ""
    , recentlySavedSlot = Nothing
    , animatingSavedSlot = Nothing
    , animatingDeletedSlot = Nothing
    , slotImportError = False
    , slotTypeMismatchError = False
    , viewportWidth = 1200
    , viewportHeight = 800
    , automatonTypeExpanded = False
    , automatonTypeAnimationActive = False
    , automatonTypeAnimationNonce = 0
    , globalNotice = Nothing
    , globalNoticeNonce = 0
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
    | SetTransitionStackInput String
    | SetTransitionStackOutput String
    | SetSelectedTransitionLabel String
    | SetSelectedTransitionStackInput String
    | SetSelectedTransitionStackOutput String
    | SetSelectedStateName String
    | ImportCode
    | ExportCode
    | CodeEdited String
    | TryParseCodeDraft Int
    | SetCodeEditorFocused Bool
    | CodeEditorScrolled Float Float
    | SetSimulationInput String
    | SetSimulationDelay String
    | CenterOnStartState
    | ZoomOut
    | ZoomIn
    | StartSimulation
    | StartStepSimulation
    | AdvanceSimulation
    | StepForwardSimulation
    | StepBackwardSimulation
    | ChooseSimulationTransition Int
    | WheelPan Float Float
    | SetViewport Int Int
    | StopSimulation
    | OpenSaveModal
    | CloseSaveModal
    | SaveToSlot Int
    | LoadFromSlot Int
    | DeleteFromSlot Int
    | StartRenameSlot Int
    | UpdateRenameDraft String
    | ConfirmRenameSlot Int
    | ClearRecentlySavedSlot Int
    | ClearSavedSlotAnimation Int
    | ClearDeletedSlotAnimation Int
    | ExportSlot Int
    | ImportSlot Int
    | ApplyImportedSlot Int String
    | ImportSlotFailed
    | ClearSlotImportError
    | ToggleAutomatonTypeDetails
    | AutomatonTypeAnimationFinished Int
    | DismissGlobalNotice Int
    | HandleShortcut ShortcutEvent
    | NoOp


type alias ShortcutEvent =
    { code : String
    , shiftKey : Bool
    , altKey : Bool
    , metaKey : Bool
    , targetEditable : Bool
    }


-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    if simulationSessionActive model then
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

            StepForwardSimulation ->
                case model.simulationRunMode of
                    Just StepRun ->
                        stepSimulationWithHistory model

                    _ ->
                        ( model, Cmd.none )

            StepBackwardSimulation ->
                case model.simulationRunMode of
                    Just StepRun ->
                        stepSimulationBack model

                    _ ->
                        ( model, Cmd.none )
                        
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
                                applySimulationTransition transition rest queue model

                            Nothing ->
                                ( model, Cmd.none )

                    _ ->
                        ( model, Cmd.none )

            WheelPan dx dy ->
                ( panWithWheel dx dy model, Cmd.none )

            SetViewport w h ->
                ( { model | viewportWidth = w, viewportHeight = h }, Cmd.none )
            
            StopSimulation ->
                showGlobalNotice EditorSimulationStopped (stopSimulation Idle model)

            SetCodeEditorFocused focused ->
                if focused then
                    if hasCodeValidationErrors model then
                        ( { model | codeEditorFocused = True }, Cmd.none )

                    else
                        ( { model
                            | codeEditorFocused = True
                            , codeDraft = encodeTransitionLanguage model.states model.transitions
                            , codeDraftDirty = False
                            , codeValidationErrors = []
                          }
                        , Cmd.none
                        )

                else if hasCodeValidationErrors model then
                    ( { model | codeEditorFocused = True }, Cmd.none )

                else
                    ( { model | codeEditorFocused = False }, Cmd.none )

            CodeEditorScrolled top left ->
                ( { model | codeEditorScrollTop = top, codeEditorScrollLeft = left }, Cmd.none )

            SetSimulationInput s ->
                ( { model | simulationInput = s }, Cmd.none )

            SetSimulationDelay s ->
                ( { model | simulationDelay = simulationDelayFromSpeedIndex s }, Cmd.none )

            CenterOnStartState ->
                ( centerOnPreferredStartState model, Cmd.none )
                
            ZoomOut ->
                ( { model | zoom = clampZoom (model.zoom - 0.1) }, Cmd.none )

            ZoomIn ->
                ( { model | zoom = clampZoom (model.zoom + 0.1) }, Cmd.none )

            AutomatonTypeAnimationFinished nonce ->
                if nonce == model.automatonTypeAnimationNonce then
                    ( { model | automatonTypeAnimationActive = False }, Cmd.none )

                else
                    ( model, Cmd.none )

            DismissGlobalNotice nonce ->
                if nonce == model.globalNoticeNonce then
                    ( { model | globalNotice = Nothing }, Cmd.none )

                else
                    ( model, Cmd.none )
            
            HandleShortcut shortcut ->
                handleShortcut shortcut model
                
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
                                        AddTransition ->
                                            ( { model
                                                | transitionFrom = Nothing
                                                , selected = Nothing
                                                , selectedTransition = Nothing
                                                , selectedTransitionLabelDraft = "", selectedTransitionStackInputDraft = "", selectedTransitionStackOutputDraft = ""
                                              }
                                            , Cmd.none
                                            )

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
                        ( { model | dragging = Just sid, selected = Just sid, selectedTransition = Nothing, selectedTransitionLabelDraft = "", selectedTransitionStackInputDraft = "", selectedTransitionStackOutputDraft = "" }, Cmd.none )

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
                                let
                                    newTransition =
                                        { id = model.nextTransitionId
                                        , from = fromId
                                        , to = sid
                                        , label = encodeStackTransitionLabel model.transitionLabel model.transitionStackInput model.transitionStackOutput
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
                        ( { model | selected = Just sid, selectedTransition = Nothing, selectedTransitionLabelDraft = "", selectedTransitionStackInputDraft = "", selectedTransitionStackOutputDraft = "", transitionFrom = Nothing }, Cmd.none )

                    _ ->
                        ( model, Cmd.none )

            SelectTransition tid ->
                case model.mode of
                    MoveState ->
                        let
                            ( draftLabel, stackInDraft, stackOutDraft ) =
                                case List.head (List.filter (\transition -> transition.id == tid) model.transitions) of
                                    Nothing ->
                                        ( "", "", "" )

                                    Just transition ->
                                        let
                                            parts =
                                                decodeStackTransitionLabel transition.label
                                        in
                                        ( parts.inputSymbol, parts.inputStack, parts.outputStack )
                        in
                        ( { model
                            | selectedTransition = Just tid
                            , selected = Nothing
                            , selectedTransitionLabelDraft = draftLabel
                            , selectedTransitionStackInputDraft = stackInDraft
                            , selectedTransitionStackOutputDraft = stackOutDraft
                          }
                        , Cmd.none
                        )

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
                    , selectedTransitionLabelDraft = "", selectedTransitionStackInputDraft = "", selectedTransitionStackOutputDraft = ""
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
                    , selectedTransitionLabelDraft = "", selectedTransitionStackInputDraft = "", selectedTransitionStackOutputDraft = ""
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
                    , selectedTransitionLabelDraft = "", selectedTransitionStackInputDraft = "", selectedTransitionStackOutputDraft = ""
                  }
                , Cmd.none
                )

            SetTransitionLabel label ->
                ( { model | transitionLabel = sanitizeTransitionEditorInput label }, Cmd.none )

            SetSelectedTransitionLabel label ->
                let
                    sanitizedLabel =
                        sanitizeTransitionEditorInput label

                    updateTransition transition =
                        if Just transition.id == model.selectedTransition then
                            { transition
                                | label = encodeStackTransitionLabel sanitizedLabel model.selectedTransitionStackInputDraft model.selectedTransitionStackOutputDraft
                            }

                        else
                            transition
                in
                ( { model
                    | selectedTransitionLabelDraft = sanitizedLabel
                    , transitions = List.map updateTransition model.transitions
                  }
                , Cmd.none
                )

            SetTransitionStackInput value ->
                ( { model | transitionStackInput = normalizeStackInputToken value }, Cmd.none )

            SetTransitionStackOutput value ->
                ( { model | transitionStackOutput = normalizeStackOutputToken value }, Cmd.none )

            SetSelectedTransitionStackInput value ->
                let
                    normalizedValue =
                        normalizeStackInputToken value

                    updateTransition transition =
                        if Just transition.id == model.selectedTransition then
                            { transition
                                | label = encodeStackTransitionLabel model.selectedTransitionLabelDraft normalizedValue model.selectedTransitionStackOutputDraft
                            }

                        else
                            transition
                in
                ( { model
                    | selectedTransitionStackInputDraft = normalizedValue
                    , transitions = List.map updateTransition model.transitions
                  }
                , Cmd.none
                )

            SetSelectedTransitionStackOutput value ->
                let
                    normalizedValue =
                        normalizeStackOutputToken value

                    updateTransition transition =
                        if Just transition.id == model.selectedTransition then
                            { transition
                                | label = encodeStackTransitionLabel model.selectedTransitionLabelDraft model.selectedTransitionStackInputDraft normalizedValue
                            }

                        else
                            transition
                in
                ( { model
                    | selectedTransitionStackOutputDraft = normalizedValue
                    , transitions = List.map updateTransition model.transitions
                  }
                , Cmd.none
                )

            SetSelectedStateName name ->
                case model.selected of
                    Nothing ->
                        ( model, Cmd.none )

                    Just sid ->
                        let
                            sanitizedName =
                                name
                                    |> String.words
                                    |> String.join ""

                            updateState s =
                                if s.id == sid then
                                    { s | name = sanitizedName }

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
                if hasCodeValidationErrors model then
                    ( { model | codeDraftDirty = True }, Cmd.none )

                else
                    case parseCodeDraftToAutomaton model model.codeDraft of
                        Ok normalizedAutomaton ->
                            ( { model
                                | states = normalizedAutomaton.states
                                , transitions = normalizedAutomaton.transitions
                                , nextStateId = normalizedAutomaton.nextStateId
                                , nextTransitionId = normalizedAutomaton.nextTransitionId
                                , stateNameConflict = False
                                , codeDraftDirty = False
                                , codeValidationErrors = []
                              }
                            , Cmd.none
                            )

                        Err _ ->
                            ( { model | codeDraftDirty = True }, Cmd.none )

            ExportCode ->
                ( { model | codeDraft = encodeTransitionLanguage model.states model.transitions, codeDraftDirty = False, codeValidationErrors = [] }, Cmd.none )

            CodeEdited s ->
                ( { model
                    | codeDraft = s
                    , codeDraftVersion = model.codeDraftVersion + 1
                    , codeDraftDirty = True
                    , codeValidationErrors = validateTransitionCode s
                  }
                , Process.sleep 500 |> Task.perform (\_ -> TryParseCodeDraft (model.codeDraftVersion + 1))
                )

            SetCodeEditorFocused focused ->
                if focused then
                    if hasCodeValidationErrors model then
                        ( { model | codeEditorFocused = True }, Cmd.none )

                    else
                        ( { model
                            | codeEditorFocused = True
                            , codeDraft = encodeTransitionLanguage model.states model.transitions
                            , codeDraftDirty = False
                            , codeValidationErrors = []
                          }
                        , Cmd.none
                        )

                else if hasCodeValidationErrors model then
                    ( { model | codeEditorFocused = True }, Cmd.none )

                else
                    ( { model | codeEditorFocused = False }, Cmd.none )

            CodeEditorScrolled top left ->
                ( { model | codeEditorScrollTop = top, codeEditorScrollLeft = left }, Cmd.none )

            TryParseCodeDraft version ->
                if version /= model.codeDraftVersion then
                    ( model, Cmd.none )

                else if hasCodeValidationErrors model then
                    ( { model | codeDraftDirty = True }, Cmd.none )

                else
                    case parseCodeDraftToAutomaton model model.codeDraft of
                        Ok normalizedAutomaton ->
                            ( { model
                                | states = normalizedAutomaton.states
                                , transitions = normalizedAutomaton.transitions
                                , nextStateId = normalizedAutomaton.nextStateId
                                , nextTransitionId = normalizedAutomaton.nextTransitionId
                                , stateNameConflict = False
                                , codeDraftDirty = False
                                , codeValidationErrors = []
                              }
                            , Cmd.none
                            )

                        Err _ ->
                            ( { model | codeDraftDirty = True }, Cmd.none )

            SetSimulationInput s ->
                ( { model | simulationInput = s }, Cmd.none )

            SetSimulationDelay s ->
                ( { model | simulationDelay = simulationDelayFromSpeedIndex s }, Cmd.none )

            CenterOnStartState ->
                ( centerOnPreferredStartState model, Cmd.none )
                
            ZoomOut ->
                ( { model | zoom = clampZoom (model.zoom - 0.1) }, Cmd.none )

            ZoomIn ->
                ( { model | zoom = clampZoom (model.zoom + 0.1) }, Cmd.none )

            StartSimulation ->
                if hasCodeValidationErrors model then
                    showGlobalNotice EditorSimulationBlockedByCodeErrors model

                else
                    startSimulation AutoRun model

            StartStepSimulation ->
                if hasCodeValidationErrors model then
                    showGlobalNotice EditorSimulationBlockedByCodeErrors model

                else
                    startSimulation StepRun model

            AdvanceSimulation ->
                stepSimulation model

            StepForwardSimulation ->
                ( model, Cmd.none )

            StepBackwardSimulation ->
                ( model, Cmd.none )

            ChooseSimulationTransition _ ->
                ( model, Cmd.none )

            WheelPan dx dy ->
                ( panWithWheel dx dy model, Cmd.none )

            SetViewport w h ->
                ( { model | viewportWidth = w, viewportHeight = h }, Cmd.none )

            StopSimulation ->
                showGlobalNotice EditorSimulationStopped (stopSimulation Idle model)

            OpenSaveModal ->
                ( { model | saveModalOpen = True, slotImportError = False, slotTypeMismatchError = False }, Cmd.none )

            CloseSaveModal ->
                ( { model | saveModalOpen = False, renamingSlot = Nothing, renameDraft = "", slotImportError = False, slotTypeMismatchError = False }, Cmd.none )

            SaveToSlot slotId ->
                let
                    automatonJson =
                        Encode.encode 0 (encodeAutomatonDocument currentAutomatonType (encodeAutomaton model.states model.transitions))

                    updateSlot slot =
                        if slot.id == slotId then
                            { slot | automatonJson = automatonJson, automatonType = Just currentAutomatonType }

                        else
                            slot
                in
                ( { model
                    | saveSlots = List.map updateSlot model.saveSlots
                    , recentlySavedSlot = Just slotId
                    , animatingSavedSlot = Just slotId
                    , slotImportError = False
                    , slotTypeMismatchError = False
                  }
                , Cmd.batch
                    [ Process.sleep 2000
                        |> Task.perform (\_ -> ClearRecentlySavedSlot slotId)
                    , Process.sleep 420
                        |> Task.perform (\_ -> ClearSavedSlotAnimation slotId)
                    ]
                )

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
                            if slotTypeMismatch slot.automatonType then
                                showGlobalNotice EditorAutomatonTypeMismatch { model | slotImportError = False, slotTypeMismatchError = True }

                            else
                                case Decode.decodeString (decodeAutomatonDocument currentAutomatonType decodeAutomaton) slot.automatonJson of
                                    Ok document ->
                                        if document.automatonType /= currentAutomatonType then
                                            showGlobalNotice EditorAutomatonTypeMismatch { model | slotImportError = False, slotTypeMismatchError = True }

                                        else
                                            let
                                                ( ss, ts ) =
                                                    document.automaton
                                            in
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
                                                    , simulationActiveTransition = Nothing
                                                    , simulationInputIndex = 0
                                                    , simulationResult = Idle
                                                    , simulationChoice = Nothing
                                                    , simulationRunMode = Nothing
                                                    , simulationHistory = []
                                                    , stateNameConflict = False
                                                    , slotTypeMismatchError = False
                                                  }
                                                , Cmd.none
                                                )

                                    Err _ ->
                                        ( model, Cmd.none )

            DeleteFromSlot slotId ->
                let
                    updateSlot slot =
                        if slot.id == slotId then
                            { slot | automatonJson = "", name = "", automatonType = Nothing }

                        else
                            slot
                in
                ( { model
                    | saveSlots = List.map updateSlot model.saveSlots
                    , animatingDeletedSlot = Just slotId
                    , renamingSlot = if model.renamingSlot == Just slotId then Nothing else model.renamingSlot
                    , renameDraft = if model.renamingSlot == Just slotId then "" else model.renameDraft
                    , slotImportError = False
                    , slotTypeMismatchError = False
                  }
                , Process.sleep 420
                    |> Task.perform (\_ -> ClearDeletedSlotAnimation slotId)
                )

            StartRenameSlot slotId ->
                let
                    currentName =
                        model.saveSlots
                            |> List.filter (\slot -> slot.id == slotId)
                            |> List.head
                            |> Maybe.map .name
                            |> Maybe.withDefault ""
                in
                ( { model | renamingSlot = Just slotId, renameDraft = currentName, slotTypeMismatchError = False }, Cmd.none )

            UpdateRenameDraft slotName ->
                ( { model | renameDraft = slotName, slotTypeMismatchError = False }, Cmd.none )

            ConfirmRenameSlot slotId ->
                let
                    trimmedName =
                        String.trim model.renameDraft

                    updateSlot slot =
                        if slot.id == slotId then
                            { slot | name = trimmedName }

                        else
                            slot
                in
                ( { model | saveSlots = List.map updateSlot model.saveSlots, renamingSlot = Nothing, renameDraft = "", slotTypeMismatchError = False }, Cmd.none )

            ClearRecentlySavedSlot slotId ->
                if model.recentlySavedSlot == Just slotId then
                    ( { model | recentlySavedSlot = Nothing }, Cmd.none )

                else
                    ( model, Cmd.none )

            ClearSavedSlotAnimation slotId ->
                if model.animatingSavedSlot == Just slotId then
                    ( { model | animatingSavedSlot = Nothing }, Cmd.none )

                else
                    ( model, Cmd.none )

            ClearDeletedSlotAnimation slotId ->
                if model.animatingDeletedSlot == Just slotId then
                    ( { model | animatingDeletedSlot = Nothing }, Cmd.none )

                else
                    ( model, Cmd.none )
                    
            ExportSlot _ ->
                ( { model | slotImportError = False, slotTypeMismatchError = False }, Cmd.none )

            ImportSlot _ ->
                ( { model | slotImportError = False, slotTypeMismatchError = False }, Cmd.none )

            ApplyImportedSlot slotId importedJson ->
                case Decode.decodeString (decodeAutomatonDocument currentAutomatonType decodeAutomaton) importedJson of
                    Ok document ->
                        let
                            ( importedStates, importedTransitions ) =
                                document.automaton

                            minifiedAutomatonJson =
                                Encode.encode 0 (encodeAutomatonDocument document.automatonType (encodeAutomaton importedStates importedTransitions))

                            updateSlot slot =
                                if slot.id == slotId then
                                    { slot | automatonJson = minifiedAutomatonJson, automatonType = Just document.automatonType }

                                else
                                    slot
                        in
                        ( { model
                            | saveSlots = List.map updateSlot model.saveSlots
                            , recentlySavedSlot = Just slotId
                            , animatingSavedSlot = Just slotId
                            , slotImportError = False
                            , slotTypeMismatchError = False
                          }
                        , Cmd.batch
                            [ Process.sleep 2000
                                |> Task.perform (\_ -> ClearRecentlySavedSlot slotId)
                            , Process.sleep 420
                                |> Task.perform (\_ -> ClearSavedSlotAnimation slotId)
                            ]
                        )

                    Err _ ->
                        ( { model | slotImportError = True, slotTypeMismatchError = False }
                        , Process.sleep 3000 |> Task.perform (\_ -> ClearSlotImportError)
                        )

            ImportSlotFailed ->
                ( { model | slotImportError = True, slotTypeMismatchError = False }
                , Process.sleep 3000 |> Task.perform (\_ -> ClearSlotImportError)
                )

            ClearSlotImportError ->
                ( { model | slotImportError = False, slotTypeMismatchError = False }, Cmd.none )
            
            ToggleAutomatonTypeDetails ->
                let
                    nextNonce =
                        model.automatonTypeAnimationNonce + 1
                in
                ( { model
                    | automatonTypeExpanded = not model.automatonTypeExpanded
                    , automatonTypeAnimationActive = True
                    , automatonTypeAnimationNonce = nextNonce
                  }
                , Process.sleep 260
                    |> Task.perform (\_ -> AutomatonTypeAnimationFinished nextNonce)
                )

            AutomatonTypeAnimationFinished nonce ->
                if nonce == model.automatonTypeAnimationNonce then
                    ( { model | automatonTypeAnimationActive = False }, Cmd.none )

                else
                    ( model, Cmd.none )
                
            DismissGlobalNotice nonce ->
                if nonce == model.globalNoticeNonce then
                    ( { model | globalNotice = Nothing }, Cmd.none )

                else
                    ( model, Cmd.none )
                    
            HandleShortcut shortcut ->
                handleShortcut shortcut model
                
            NoOp ->
                ( model, Cmd.none )



parseCodeDraftToAutomaton : Model -> String -> Result Key { states : List State, transitions : List Transition, nextStateId : Int, nextTransitionId : Int }
parseCodeDraftToAutomaton model draft =
    case Decode.decodeString decodeAutomaton draft of
        Ok ( ss, ts ) ->
            if hasDuplicateStateNames ss then
                Err EditorCodeValidationFormat

            else
                let
                    normalizedStates =
                        enforceSingleStartFlag ss
                in
                Ok (normalizeAutomatonIds normalizedStates ts)

        Err _ ->
            case decodeTransitionLanguage model.states draft of
                Ok ( ss, ts ) ->
                    Ok (normalizeAutomatonIds ss ts)

                Err _ ->
                    Err EditorCodeValidationFormat
                    

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
    String.left 1 (String.trim raw)


normalizeStackInputToken : String -> String
normalizeStackInputToken raw =
    String.left 1 (String.trim raw)


normalizeStackOutputToken : String -> String
normalizeStackOutputToken raw =
    String.trim raw


encodeStackTransitionLabel : String -> String -> String -> String
encodeStackTransitionLabel inputSymbol inputStack outputStack =
    normalizeTransitionLabel inputSymbol ++ "|" ++ normalizeStackInputToken inputStack ++ "|" ++ normalizeStackOutputToken outputStack


type alias StackTransitionParts =
    { inputSymbol : String
    , inputStack : String
    , outputStack : String
    }


decodeStackTransitionLabel : String -> StackTransitionParts
decodeStackTransitionLabel raw =
    case String.split "|" raw of
        inputSymbol :: inputStack :: outputStackParts ->
            { inputSymbol = normalizeTransitionLabel inputSymbol
            , inputStack = normalizeStackInputToken inputStack
            , outputStack = normalizeStackOutputToken (String.join "|" outputStackParts)
            }

        [ inputSymbol ] ->
            { inputSymbol = normalizeTransitionLabel inputSymbol
            , inputStack = ""
            , outputStack = ""
            }

        _ ->
            { inputSymbol = "", inputStack = "", outputStack = "" }


normalizeTransitionLabels : String -> List String
normalizeTransitionLabels raw =
    let
        normalized =
            raw
                |> String.split ";"
                |> List.map String.trim
                |> List.map
                    (\token ->
                        if token == "λ" then
                            ""

                        else
                            normalizeTransitionLabel token
                    )
    in
    if String.trim raw == "" then
        [ "" ]

    else
        uniqueLabels normalized


sanitizeTransitionEditorInput : String -> String
sanitizeTransitionEditorInput raw =
    if String.trim raw == "" then
        ""

    else
        normalizeTransitionLabels raw
            |> transitionLabelsToEditorText
            

transitionLabelsForJson : List String -> String
transitionLabelsForJson labels =
    labels
        |> uniqueLabels
        |> List.map
            (\token ->
                if isLambdaLabel token then
                    "λ"

                else
                    token
            )
        |> String.join ";"


decodeJsonLabelToTokens : String -> List String
decodeJsonLabelToTokens raw =
    let
        parts =
            if String.contains ";" raw then
                String.split ";" raw

            else
                [ raw ]

        normalizeToken token =
            let
                trimmed =
                    String.trim token
            in
            if String.contains "|" trimmed then
                trimmed

            else if trimmed == "λ" || trimmed == "" then
                encodeStackTransitionLabel "" "" ""

            else
                encodeStackTransitionLabel trimmed "" ""

        normalized =
            parts
                |> List.map normalizeToken
    in
    if String.trim raw == "" then
        [ encodeStackTransitionLabel "" "" "" ]

    else
        uniqueLabels normalized


hasDuplicateStateNames : List State -> Bool
hasDuplicateStateNames states =
    let
        names =
            states |> List.map (stateDisplayName >> String.trim)
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
    String.isEmpty (decodeStackTransitionLabel label).inputSymbol


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
                    if String.isEmpty (String.trim state.name) || state.name == String.fromInt state.id then
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


preferredStartState : List State -> Maybe State
preferredStartState states =
    case findStartState states of
        Just startState ->
            Just startState

        Nothing ->
            states
                |> List.sortBy .id
                |> List.head


centerOnPreferredStartState : Model -> Model
centerOnPreferredStartState model =
    case preferredStartState model.states of
        Nothing ->
            model

        Just state ->
            let
                layout =
                    editorLayout model
            in
            { model
                | panX = toFloat layout.canvasWidth / 2 - (state.x * model.zoom)
                , panY = toFloat layout.canvasHeight / 2 - (state.y * model.zoom)
                , panning = Nothing
                , dragging = Nothing
            }
            
            
hasLambdaFrom : Int -> List Transition -> Bool
hasLambdaFrom sid transitions =
    List.any (\t -> t.from == sid && isLambdaLabel t.label) transitions


isDeterministic : List Transition -> Bool
isDeterministic transitions =
    let
        step t dict =
            Dict.update ( t.from, (decodeStackTransitionLabel t.label).inputSymbol, (decodeStackTransitionLabel t.label).inputStack )
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

nonDeterminismReasons : Lang -> List State -> List Transition -> List String
nonDeterminismReasons lang states transitions =
    let
        countByFromAndLabel transition counts =
            Dict.update ( transition.from, (decodeStackTransitionLabel transition.label).inputSymbol, (decodeStackTransitionLabel transition.label).inputStack )
                (\maybeCount -> Just (Maybe.withDefault 0 maybeCount + 1))
                counts

        replaceToken key value template =
            String.replace ("{" ++ key ++ "}") value template

        duplicateReasons =
            transitions
                |> List.foldl countByFromAndLabel Dict.empty
                |> Dict.toList
                |> List.filterMap
                    (\(( fromState, label, stackInput ), count) ->
                        if count > 1 then
                            t lang EditorAutomatonNonDetReasonDuplicate
                                |> replaceToken "state" (quotedStateNameById states fromState)
                                |> replaceToken "label" (transitionLabelDisplay (encodeStackTransitionLabel label stackInput ""))
                                |> Just

                        else
                            Nothing
                    )

        lambdaReasons =
            transitions
                |> List.filter (\transition -> isLambdaLabel transition.label)
                |> List.map
                    (\transition ->
                        t lang EditorAutomatonNonDetReasonLambda
                            |> replaceToken "from" (quotedStateNameById states transition.from)
                            |> replaceToken "to" (quotedStateNameById states transition.to)
                    )
    in
    duplicateReasons ++ lambdaReasons


transitionLabelDisplay : String -> String
transitionLabelDisplay label =
    let
        parts =
            decodeStackTransitionLabel label

        inputSymbol =
            if String.isEmpty parts.inputSymbol then
                "λ"

            else
                parts.inputSymbol
        inputStackDisplay =
            if String.isEmpty parts.inputStack then
                "λ"

            else
                parts.inputStack

        stackOutputDisplay =
            if String.isEmpty parts.outputStack then
                "λ"

            else
                parts.outputStack
    in
    if String.isEmpty parts.inputSymbol && String.isEmpty parts.inputStack && String.isEmpty parts.outputStack then
        "λ"

    else
        inputSymbol ++ ", " ++ inputStackDisplay ++ " -> " ++ stackOutputDisplay


editorLayout : Model -> { editorHeight : Int, mainRowHeight : Int, canvasWidth : Int, canvasHeight : Int }
editorLayout model =
    let
        editorHeight =
            Basics.max 560 (model.viewportHeight - 90)

        mainRowHeight =
            Basics.max 320 (editorHeight - 120)

        canvasWidth =
            Basics.max 360 (model.viewportWidth - 860)

        canvasHeight =
            mainRowHeight - 56
    in
    { editorHeight = editorHeight, mainRowHeight = mainRowHeight, canvasWidth = canvasWidth, canvasHeight = canvasHeight }


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


simulationSpeedStops : List Int
simulationSpeedStops =
    [ 10, 250, 500, 750, 1000 ]


simulationSpeedIndexFromDelay : String -> Int
simulationSpeedIndexFromDelay rawDelay =
    let
        delay =
            round (parseDelay rawDelay)

        pickNearest current best =
            case current of
                [] ->
                    best

                ( index, candidate ) :: rest ->
                    if abs (delay - candidate) < abs (delay - Tuple.second best) then
                        pickNearest rest ( index, candidate )

                    else
                        pickNearest rest best
    in
    case List.indexedMap Tuple.pair simulationSpeedStops of
        [] ->
            2

        first :: rest ->
            pickNearest rest first |> Tuple.first


simulationDelayFromSpeedIndex : String -> String
simulationDelayFromSpeedIndex rawIndex =
    case String.toInt rawIndex of
        Nothing ->
            "500"

        Just index ->
            simulationSpeedStops
                |> List.drop index
                |> List.head
                |> Maybe.map String.fromInt
                |> Maybe.withDefault "500"


clampInt : Int -> Int -> Int -> Int
clampInt low high value =
    if value < low then
        low

    else if value > high then
        high

    else
        value


simulationInputWidthCh : String -> Int
simulationInputWidthCh inputValue =
    clampInt 18 110 (String.length inputValue + 6)


activeTransitionLine : Model -> Maybe Int
activeTransitionLine model =
    model.simulationActiveTransition
        |> Maybe.andThen
            (\activeId ->
                activeTransitionLineFromIds activeId (model.transitions |> List.sortBy .id |> List.map .id) 1
            )


activeTransitionLineFromIds : Int -> List Int -> Int -> Maybe Int
activeTransitionLineFromIds target ids currentLine =
    case ids of
        [] ->
            Nothing

        id_ :: rest ->
            if id_ == target then
                Just currentLine

            else
                activeTransitionLineFromIds target rest (currentLine + 1)


activeSimulationHighlightFill : Theme -> String
activeSimulationHighlightFill theme =
    case theme of
        Theme.Light ->
            "#7aa2ff33"

        Theme.Dark ->
            "#f8e71c30"


activeSimulationHighlightStroke : Theme -> String
activeSimulationHighlightStroke theme =
    case theme of
        Theme.Light ->
            "#245dff"

        Theme.Dark ->
            "#ffd54f"


simulationInputPreview : Theme -> Model -> Html Msg
simulationInputPreview theme model =
    let
        chars =
            String.toList model.simulationInput

        tileWidthPx =
            36

        tileGapPx =
            6

        tileStepPx =
            tileWidthPx + tileGapPx

        viewportTiles =
            9

        viewportWidthPx =
            (viewportTiles * tileStepPx) - tileGapPx

        contentChars =
            Basics.max 1 (List.length chars)

        totalWidthPx =
            (contentChars * tileStepPx) - tileGapPx

        maxShiftPx =
            Basics.max 0 (totalWidthPx - viewportWidthPx)

        highlightedInputIndex =
            model.simulationInputIndex - 1

        targetShiftPx =
            Basics.max 0 ((highlightedInputIndex - 5) * tileStepPx)

        shiftPx =
            Basics.min maxShiftPx targetShiftPx

        currentMarkerIndex =
            if model.simulationCurrent /= Nothing && (not (List.isEmpty model.simulationQueue)) then
                highlightedInputIndex

            else
                -1

        viewChar idx char =
            let
                isConsumed =
                    idx < model.simulationInputIndex

                isCurrent =
                    idx == currentMarkerIndex
            in
            H.span
                [ HA.style "display" "inline-flex"
                , HA.style "align-items" "center"
                , HA.style "justify-content" "center"
                , HA.style "width" (String.fromInt tileWidthPx ++ "px")
                , HA.style "height" "24px"
                , HA.style "border-radius" "6px"
                , HA.style "border"
                    ("1px solid "
                        ++ (if isCurrent then
                                activeSimulationHighlightStroke theme

                            else
                                interactiveBorder theme
                           )
                    )
                , HA.style "background" (if isCurrent then activeSimulationHighlightFill theme else interactiveBg theme)
                , HA.style "color" (if isCurrent then activeSimulationHighlightStroke theme else textColor theme)
                , HA.style "opacity" (if isConsumed then "0.55" else "1")
                , HA.style "font-weight" (if isCurrent then "700" else "500")
                ]
                [ H.text (String.fromChar char) ]
    in
    div
        [ HA.style "margin-top" "12px"
        , HA.style "overflow" "hidden"
        , HA.style "white-space" "nowrap"
        , HA.style "font-family" "monospace"
        , HA.style "font-size" "15px"
        , HA.style "line-height" "24px"
        , HA.style "height" "34px"
        , HA.style "border" ("1px solid " ++ interactiveBorder theme)
        , HA.style "border-radius" "8px"
        , HA.style "background" (interactiveBg theme)
        , HA.style "padding" "4px 8px"
        ]
        (if List.isEmpty chars then
            [ H.span
                [ HA.style "display" "inline-flex"
                , HA.style "align-items" "center"
                , HA.style "justify-content" "center"
                , HA.style "width" (String.fromInt tileWidthPx ++ "px")
                , HA.style "height" "24px"
                , HA.style "border-radius" "6px"
                , HA.style "border" ("1px solid " ++ interactiveBorder theme)
                , HA.style "background" (interactiveBg theme)
                , HA.style "opacity" "0.7"
                , HA.style "font-style" "italic"
                ]
                [ H.text "λ" ]
            ]

         else
            [ H.div
                [ HA.style "display" "inline-flex"
                , HA.style "gap" (String.fromInt tileGapPx ++ "px")
                , HA.style "transform" ("translateX(-" ++ String.fromInt shiftPx ++ "px)")
                , HA.style "transition" "transform 220ms ease"
                ]
                (List.indexedMap viewChar chars)
            ]
        )


stackAtBase : List String -> Bool
stackAtBase stack =
    stack == [ "Z" ]


transitionMatchesStack : StackTransitionParts -> List String -> Bool
transitionMatchesStack parts stack =
    if String.isEmpty parts.inputStack then
        True

    else
        case stack of
            top :: _ ->
                top == parts.inputStack

            [] ->
                False


applyTransitionToStack : StackTransitionParts -> List String -> List String
applyTransitionToStack parts stack =
    let
        popped =
            if String.isEmpty parts.inputStack then
                stack

            else
                case stack of
                    top :: rest ->
                        if top == "Z" then
                            stack

                        else
                            rest

                    [] ->
                        [ "Z" ]

        rawPushedSymbols =
            if String.isEmpty parts.outputStack then
                []

            else
                parts.outputStack
                    |> String.toList
                    |> List.map String.fromChar

        pushedSymbols =
            if parts.inputStack == "Z" && (not (List.isEmpty rawPushedSymbols)) && List.head popped == Just "Z" then
                rawPushedSymbols
                    |> List.reverse
                    |> List.drop 1
                    |> List.reverse

            else
                rawPushedSymbols
    in
    pushedSymbols ++ popped
                
                
stopSimulation : SimulationResult -> Model -> Model
stopSimulation result model =
    { model
        | simulationRunning = False
        , simulationQueue = []
        , simulationStack = [ "Z" ]
        , simulationCurrent = Nothing
        , simulationActiveTransition = Nothing
        , simulationInputIndex = 0
        , simulationResult = result
        , simulationChoice = Nothing
        , simulationRunMode = Nothing
        , simulationHistory = []
    }


startSimulation : SimulationRunMode -> Model -> ( Model, Cmd Msg )
startSimulation runMode model =
    case findStartState model.states of
        Nothing ->
            showGlobalNotice I18n.EditorSimulationMissingStart { model | simulationResult = MissingStart }

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
                    if willRun && runMode == AutoRun then
                        Process.sleep delay |> Task.perform (\_ -> AdvanceSimulation)

                    else
                        Cmd.none
            in
            let
                nextModel =
                    { model
                        | simulationRunning = willRun && runMode == AutoRun
                        , simulationQueue = queue
                        , simulationStack = [ "Z" ]
                        , simulationCurrent = Just startState.id
                        , simulationActiveTransition = Nothing
                        , simulationInputIndex = 0
                        , selected = Just startState.id
                        , simulationResult = initialResult
                        , simulationChoice = Nothing
                        , simulationRunMode = Just runMode
                        , simulationHistory = []
                    }
            in
            if willRun then
                ( nextModel, cmd )

            else
                case simulationResultNoticeKey initialResult of
                    Just key ->
                        showGlobalNotice key nextModel

                    Nothing ->
                        ( nextModel, Cmd.none )


applySimulationTransition : Transition -> List Char -> List Char -> Model -> ( Model, Cmd Msg )
applySimulationTransition transition rest queue model =
    let
        delay = parseDelay model.simulationDelay

        parts =
            decodeStackTransitionLabel transition.label

        consumesInput =
            not (String.isEmpty parts.inputSymbol)

        nextQueue =
            if consumesInput then
                rest

            else
                queue

        nextStack =
            applyTransitionToStack parts model.simulationStack

        willContinue =
            (not (List.isEmpty nextQueue)) || hasLambdaFrom transition.to model.transitions

        cmd =
            if willContinue && model.simulationRunMode == Just AutoRun then
                Process.sleep delay |> Task.perform (\_ -> AdvanceSimulation)

            else
                Cmd.none
    in
    let
        nextResult =
            if willContinue then
                Running

            else
                case getStateById transition.to model.states of
                    Just s ->
                        if s.accepting && List.isEmpty nextQueue && stackAtBase nextStack then
                            Success

                        else if List.isEmpty nextQueue then
                            Rejected

                        else
                            DeadEnd

                    Nothing ->
                        DeadEnd

        nextModel =
            { model
                | simulationQueue = nextQueue
                , simulationStack = nextStack
                , simulationCurrent = Just transition.to
                , simulationActiveTransition = Just transition.id
                , simulationInputIndex =
                    if consumesInput then
                        model.simulationInputIndex + 1

                    else
                        model.simulationInputIndex
                , selected = Just transition.to
                , simulationRunning = willContinue && model.simulationRunMode == Just AutoRun
                , simulationChoice = Nothing
                , simulationResult = nextResult
            }
    in
    if willContinue then
        ( nextModel, cmd )

    else
        case simulationResultNoticeKey nextResult of
            Just key ->
                showGlobalNotice key nextModel

            Nothing ->
                ( nextModel, Cmd.none )


stepSimulation : Model -> ( Model, Cmd Msg )
stepSimulation model =
    case ( model.simulationCurrent, model.simulationQueue, model.simulationStack ) of
        ( Nothing, _, _ ) ->
            stopSimulationWithNotice DeadEnd model

        ( Just sid, queue, stack ) ->
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
                            List.filter
                                (\t ->
                                    let
                                        parts =
                                            decodeStackTransitionLabel t.label
                                    in
                                    t.from == sid
                                        && parts.inputSymbol == lbl
                                        && transitionMatchesStack parts stack
                                )
                                model.transitions

                lambdaMatches =
                    List.filter
                        (\t ->
                            let
                                parts =
                                    decodeStackTransitionLabel t.label
                            in
                            t.from == sid
                                && String.isEmpty parts.inputSymbol
                                && transitionMatchesStack parts stack
                        )
                        model.transitions

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
                                            if s.accepting && stackAtBase stack then
                                                Success

                                            else
                                                Rejected

                                        Nothing ->
                                            DeadEnd

                                _ ->
                                    DeadEnd
                    in
                    stopSimulationWithNotice result model

                [ single ] ->
                    applySimulationTransition single rest queue model

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
        |> List.map (\slotId -> { id = slotId, name = "", automatonJson = "", automatonType = Nothing })


ensureSlotCount : Int -> List SaveSlot -> List SaveSlot
ensureSlotCount count slots =
    let
        byId sid =
            List.head (List.filter (\slot -> slot.id == sid) slots)
                |> Maybe.withDefault { id = sid, name = "", automatonJson = "", automatonType = Nothing }
    in
    List.range 1 count |> List.map byId


currentAutomatonType : AutomatonType
currentAutomatonType =
    StackAutomaton


maybeAutomatonTypeValue : Maybe AutomatonType -> Encode.Value
maybeAutomatonTypeValue maybeAutomatonType =
    case maybeAutomatonType of
        Just automatonType ->
            AutomatonFormat.encodeAutomatonType automatonType

        Nothing ->
            Encode.null


slotTypeMismatch : Maybe AutomatonType -> Bool
slotTypeMismatch maybeAutomatonType =
    case maybeAutomatonType of
        Just automatonType ->
            automatonType /= currentAutomatonType

        Nothing ->
            False


exportAutomatonJson : Model -> String
exportAutomatonJson model =
    Encode.encode 0 (encodeAutomatonDocument currentAutomatonType (encodeAutomaton model.states model.transitions))


exportRuntimeSnapshotJson : Model -> String
exportRuntimeSnapshotJson model =
    let
        maybeInt maybeValue =
            case maybeValue of
                Just value ->
                    Encode.int value

                Nothing ->
                    Encode.null

        modeToString modeValue =
            case modeValue of
                AddState ->
                    "add-state"

                AddTransition ->
                    "add-transition"

                MoveState ->
                    "move-state"


        saveSlotEncoder slot =
            Encode.object
                [ ( "id", Encode.int slot.id )
                , ( "name", Encode.string slot.name )
                , ( "automatonJson", Encode.string slot.automatonJson )
                , ( "automatonType", maybeAutomatonTypeValue slot.automatonType )
                ]

        simulationChoiceValue =
            case model.simulationChoice of
                Nothing ->
                    Encode.null

                Just choice ->
                    Encode.object
                        [ ( "stateId", Encode.int choice.stateId )
                        , ( "inputLabel", Encode.string choice.inputLabel )
                        , ( "consumesInput", Encode.bool choice.consumesInput )
                        , ( "optionCount", Encode.int (List.length choice.transitionIds) )
                        , ( "transitionIds", Encode.list Encode.int choice.transitionIds )
                        ]

        globalNoticeValue =
            case model.globalNotice of
                Nothing ->
                    Encode.null

                Just _ ->
                    Encode.string "present"

        simulationResultValue =
            case model.simulationResult of
                Idle ->
                    Encode.string "idle"

                Running ->
                    Encode.string "running"

                Success ->
                    Encode.string "success"

                Rejected ->
                    Encode.string "rejected"

                DeadEnd ->
                    Encode.string "dead-end"

                MissingStart ->
                    Encode.string "missing-start"
    in
    Encode.object
        [ ( "automatonType", Encode.int 2 )
        , ( "automaton", encodeAutomaton model.states model.transitions )
        , ( "nextStateId", Encode.int model.nextStateId )
        , ( "nextTransitionId", Encode.int model.nextTransitionId )
        , ( "panX", Encode.float model.panX )
        , ( "panY", Encode.float model.panY )
        , ( "zoom", Encode.float model.zoom )
        , ( "selected", maybeInt model.selected )
        , ( "selectedTransition", maybeInt model.selectedTransition )
        , ( "selectedTransitionLabelDraft", Encode.string model.selectedTransitionLabelDraft )
        , ( "mode", Encode.string (modeToString model.mode) )
        , ( "transitionFrom", maybeInt model.transitionFrom )
        , ( "transitionLabel", Encode.string model.transitionLabel )
        , ( "codeDraft", Encode.string model.codeDraft )
        , ( "codeDraftVersion", Encode.int model.codeDraftVersion )
        , ( "codeDraftDirty", Encode.bool model.codeDraftDirty )
        , ( "codeEditorFocused", Encode.bool model.codeEditorFocused )
        , ( "codeValidationErrorCount", Encode.int (List.length model.codeValidationErrors) )
        , ( "simulationInput", Encode.string model.simulationInput )
        , ( "simulationDelay", Encode.string model.simulationDelay )
        , ( "simulationRunning", Encode.bool model.simulationRunning )
        , ( "simulationQueue", Encode.string (String.fromList model.simulationQueue) )
        , ( "simulationStack", Encode.list Encode.string model.simulationStack )
        , ( "simulationCurrent", maybeInt model.simulationCurrent )
        , ( "simulationResult", simulationResultValue )
        , ( "simulationChoice", simulationChoiceValue )
        , ( "stateNameConflict", Encode.bool model.stateNameConflict )
        , ( "saveModalOpen", Encode.bool model.saveModalOpen )
        , ( "saveSlots", Encode.list saveSlotEncoder model.saveSlots )
        , ( "renamingSlot", maybeInt model.renamingSlot )
        , ( "renameDraft", Encode.string model.renameDraft )
        , ( "recentlySavedSlot", maybeInt model.recentlySavedSlot )
        , ( "animatingSavedSlot", maybeInt model.animatingSavedSlot )
        , ( "animatingDeletedSlot", maybeInt model.animatingDeletedSlot )
        , ( "slotImportError", Encode.bool model.slotImportError )
        , ( "slotTypeMismatchError", Encode.bool model.slotTypeMismatchError )
        , ( "viewportWidth", Encode.int model.viewportWidth )
        , ( "viewportHeight", Encode.int model.viewportHeight )
        , ( "automatonTypeExpanded", Encode.bool model.automatonTypeExpanded )
        , ( "automatonTypeAnimationActive", Encode.bool model.automatonTypeAnimationActive )
        , ( "automatonTypeAnimationNonce", Encode.int model.automatonTypeAnimationNonce )
        , ( "globalNotice", globalNoticeValue )
        , ( "globalNoticeNonce", Encode.int model.globalNoticeNonce )
        ]
        |> Encode.encode 0
    

encodeSaveSlots : List SaveSlot -> String
encodeSaveSlots slots =
    slots
        |> Encode.list
            (\slot ->
                Encode.object
                    [ ( "id", Encode.int slot.id )
                    , ( "name", Encode.string slot.name )
                    , ( "automatonJson", Encode.string slot.automatonJson )
                    , ( "automatonType", maybeAutomatonTypeValue slot.automatonType )
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
    Decode.map4
        (\id name automatonJson automatonType ->
            { id = id, name = name, automatonJson = automatonJson, automatonType = automatonType }
        )
        (Decode.field "id" Decode.int)
        (Decode.field "name" Decode.string)
        (Decode.field "automatonJson" Decode.string)
        (Decode.maybe (Decode.field "automatonType" AutomatonFormat.decodeAutomatonType))

type alias ParsedTransition =
    { fromName : String
    , toName : String
    , inputSymbol : String
    , inputStack : String
    , outputStack : String
    }


type alias CodeValidationError =
    { lineNumber : Int
    , lineText : String
    , message : Key
    }
    

encodeTransitionLanguage : List State -> List Transition -> String
encodeTransitionLanguage states transitions =
    transitions
        |> List.sortBy .id
        |> List.map
            (\tr ->
                let
                    parts =
                        decodeStackTransitionLabel tr.label
                in
                "("
                    ++ stateNameById states tr.from
                    ++ ", "
                    ++ (if String.isEmpty parts.inputSymbol then "λ" else parts.inputSymbol)
                    ++ ", "
                    ++ (if String.isEmpty parts.inputStack then "λ" else parts.inputStack)
                    ++ ") => ("
                    ++ stateNameById states tr.to
                    ++ ", "
                    ++ (if String.isEmpty parts.outputStack then "λ" else parts.outputStack)
                    ++ ")"
            )
        |> String.join "\n"


stateNameById : List State -> Int -> String
stateNameById states stateId =
    case getStateById stateId states of
        Just state ->
            stateDisplayName state

        Nothing ->
            String.fromInt stateId


quotedStateNameById : List State -> Int -> String
quotedStateNameById states stateId =
    "'" ++ stateNameById states stateId ++ "'"
    

stateDisplayName : State -> String
stateDisplayName state =
    if String.isEmpty (String.trim state.name) then
        String.fromInt state.id

    else
        state.name
        

decodeTransitionLanguage : List State -> String -> Result Key ( List State, List Transition )
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


hasCodeValidationErrors : Model -> Bool
hasCodeValidationErrors model =
    not (List.isEmpty model.codeValidationErrors)


validateTransitionCode : String -> List CodeValidationError
validateTransitionCode raw =
    raw
        |> String.lines
        |> List.indexedMap validateTransitionLine
        |> List.filterMap identity


validateTransitionLine : Int -> String -> Maybe CodeValidationError
validateTransitionLine idx originalLine =
    let
        line =
            String.trim originalLine

        build message =
            Just
                { lineNumber = idx + 1
                , lineText = if String.isEmpty line then originalLine else line
                , message = message
                }
    in
    if String.isEmpty line then
        Nothing

    else
        case parseTransitionLine line of
            Ok _ ->
                Nothing

            Err key ->
                build key


parseTransitionLine : String -> Result Key ParsedTransition
parseTransitionLine line =
    case String.split "=>" line of
        [ leftRaw, rightRaw ] ->
            let
                left =
                    String.trim leftRaw

                right =
                    String.trim rightRaw

                parseTuple raw sideError =
                    if String.startsWith "(" raw && String.endsWith ")" raw then
                        raw
                            |> String.dropLeft 1
                            |> String.dropRight 1
                            |> String.split ","
                            |> List.map String.trim
                            |> Ok

                    else
                        Err sideError
            in
            case ( parseTuple left EditorCodeValidationStackLeftThreeParts, parseTuple right EditorCodeValidationStackRightTwoParts ) of
                ( Ok [ fromName, inputSymbolRaw, inputStackRaw ], Ok [ toName, outputStackRaw ] ) ->
                    if String.isEmpty fromName || String.contains " " fromName then
                        Err EditorCodeValidationSourceNoSpaces

                    else if String.isEmpty toName || String.contains " " toName then
                        Err EditorCodeValidationTargetNoSpaces

                    else if (inputSymbolRaw /= "λ") && (not (String.isEmpty (String.trim inputSymbolRaw))) && String.length (String.trim inputSymbolRaw) /= 1 then
                        Err EditorCodeValidationConditionSingle

                    else if (inputStackRaw /= "λ") && String.length (String.trim inputStackRaw) > 1 then
                        Err EditorCodeValidationStackInputSingle

                    else
                        let
                            inputStack =
                                if inputStackRaw == "λ" then
                                    ""

                                else
                                    normalizeStackInputToken inputStackRaw

                            outputStack =
                                if outputStackRaw == "λ" then
                                    ""

                                else
                                    normalizeStackOutputToken outputStackRaw
                        in
                        if inputStack == "Z" && (not (String.endsWith "Z" outputStack)) then
                            Err EditorCodeValidationStackZMustBeReturned

                        else
                            Ok
                                { fromName = fromName
                                , toName = toName
                                , inputSymbol = if inputSymbolRaw == "λ" then "" else normalizeTransitionLabel inputSymbolRaw
                                , inputStack = inputStack
                                , outputStack = outputStack
                                }

                ( Ok _, Ok _ ) ->
                    Err EditorCodeValidationFormat

                ( Err key, _ ) ->
                    Err key

                ( _, Err key ) ->
                    Err key

        _ ->
            Err EditorCodeValidationArrowLine


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
                |> List.foldl (\state acc -> Dict.insert (stateDisplayName state) ( state.x, state.y ) acc) Dict.empty

        existingStateByName =
            existingStates
                |> List.foldl (\state acc -> Dict.insert (stateDisplayName state) state acc) Dict.empty

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
                        , label = encodeStackTransitionLabel tr.inputSymbol tr.inputStack tr.outputStack
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


encodeTransition : TransitionPayload -> Encode.Value
encodeTransition t =
    Encode.object
        [ ( "id", Encode.int 0 )
        , ( "from", Encode.int t.from )
        , ( "to", Encode.int t.to )
        , ( "label", Encode.string t.label )
        ]


encodeAutomaton : List State -> List Transition -> Encode.Value
encodeAutomaton states transitions =
    let
        groupedTransitions =
            groupTransitionsForRender transitions
                |> List.map
                    (\group ->
                        { from = group.from
                        , to = group.to
                        , label = transitionLabelsForJson group.labels
                        }
                    )
    in
    Encode.object
        [ ( "states", Encode.list encodeState states )
        , ( "transitions", Encode.list encodeTransition groupedTransitions  )
        ]


decodeAutomaton : Decode.Decoder ( List State, List Transition )
decodeAutomaton =
    Decode.map2
        (\states payloadTransitions ->
            let
                expanded =
                    payloadTransitions
                        |> List.concatMap
                            (\payload ->
                                decodeJsonLabelToTokens payload.label
                                    |> List.map
                                        (\token ->
                                            { id = 0
                                            , from = payload.from
                                            , to = payload.to
                                            , label = token
                                            }
                                        )
                            )
                        |> List.indexedMap (\idx transition -> { transition | id = idx + 1 })
            in
            ( states, expanded )
        )
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


decodeTransition : Decode.Decoder TransitionPayload
decodeTransition =
    Decode.map3
        (\from to label ->
            { from = from
            , to = to
            , label = label
            }
        )
        (Decode.field "from" Decode.int)
        (Decode.field "to" Decode.int)
        (Decode.field "label" Decode.string)


screenToWorld : Model -> Float -> Float -> ( Float, Float )
screenToWorld model x y =
    ( (x - model.panX) / model.zoom, (y - model.panY) / model.zoom )


clampZoom : Float -> Float
clampZoom value =
    Basics.max 0.5 (Basics.min 2 value)


simulationSessionActive : Model -> Bool
simulationSessionActive model =
    model.simulationRunMode /= Nothing


snapshotSimulation : Model -> SimulationSnapshot
snapshotSimulation model =
    { simulationQueue = model.simulationQueue
    , simulationStack = model.simulationStack
    , simulationCurrent = model.simulationCurrent
    , simulationActiveTransition = model.simulationActiveTransition
    , simulationInputIndex = model.simulationInputIndex
    , simulationResult = model.simulationResult
    , simulationChoice = model.simulationChoice
    , selected = model.selected
    }


restoreSimulationSnapshot : SimulationSnapshot -> Model -> Model
restoreSimulationSnapshot snapshot model =
    { model
        | simulationQueue = snapshot.simulationQueue
        , simulationStack = snapshot.simulationStack
        , simulationCurrent = snapshot.simulationCurrent
        , simulationActiveTransition = snapshot.simulationActiveTransition
        , simulationInputIndex = snapshot.simulationInputIndex
        , simulationResult = snapshot.simulationResult
        , simulationChoice = snapshot.simulationChoice
        , selected = snapshot.selected
    }


stepSimulationWithHistory : Model -> ( Model, Cmd Msg )
stepSimulationWithHistory model =
    let
        snapshot =
            snapshotSimulation model
    in
    stepSimulation { model | simulationHistory = snapshot :: model.simulationHistory }


stepSimulationBack : Model -> ( Model, Cmd Msg )
stepSimulationBack model =
    case model.simulationHistory of
        previous :: rest ->
            ( restoreSimulationSnapshot previous { model | simulationHistory = rest }, Cmd.none )

        [] ->
            ( model, Cmd.none )
            

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


simulationResultNoticeKey : SimulationResult -> Maybe Key
simulationResultNoticeKey result =
    case result of
        Success ->
            Just I18n.EditorSimulationSuccess

        Rejected ->
            Just I18n.EditorSimulationRejected

        DeadEnd ->
            Just I18n.EditorSimulationDeadEnd

        MissingStart ->
            Just I18n.EditorSimulationMissingStart

        Idle ->
            Nothing

        Running ->
            Nothing


stopSimulationWithNotice : SimulationResult -> Model -> ( Model, Cmd Msg )
stopSimulationWithNotice result model =
    let
        nextModel =
            stopSimulation result model
    in
    case simulationResultNoticeKey result of
        Just key ->
            showGlobalNotice key nextModel

        Nothing ->
            ( nextModel, Cmd.none )


globalNoticeColor : Theme -> Key -> String
globalNoticeColor theme key =
    case key of
        I18n.EditorSimulationSuccess ->
            successColor theme

        I18n.EditorSimulationRejected ->
            warningColor theme

        I18n.EditorSimulationDeadEnd ->
            errorColor theme

        I18n.EditorSimulationMissingStart ->
            errorColor theme

        I18n.EditorSimulationBlockedByCodeErrors ->
            errorColor theme

        _ ->
            textColor theme
-- VIEW

view : { lang : Lang, theme : Theme, viewportWidth : Int, viewportHeight : Int } -> Model -> Html Msg
view =
    viewWithStackFlag True


viewWithStack : { lang : Lang, theme : Theme, viewportWidth : Int, viewportHeight : Int } -> Model -> Html Msg
viewWithStack =
    viewWithStackFlag True


viewWithStackFlag : Bool -> { lang : Lang, theme : Theme, viewportWidth : Int, viewportHeight : Int } -> Model -> Html Msg
viewWithStackFlag showStack ctx model =
    let
        layout =
            editorLayout model

        content =
            div
                [ HA.style "display" "flex"
                , HA.style "gap" "12px"
                , HA.style "color" (textColor ctx.theme)
                , HA.style "flex" "1"
                , HA.style "min-height" "320px"
                , HA.style "overflow" "hidden"
                ]
                [ transitionFunctionPanel ctx model
                , div [ HA.style "flex" "1", HA.style "min-width" "0", HA.style "display" "flex", HA.style "flex-direction" "column" ]
                    [ div [ HA.style "display" "flex", HA.style "align-items" "center", HA.style "justify-content" "space-between", HA.style "margin-bottom" "8px", HA.style "gap" "8px" ]
                        [ H.h2 [ HA.style "margin" "0" ] [ H.text (t ctx.lang EditorTitle) ]
                        , div [ HA.style "display" "flex", HA.style "align-items" "center", HA.style "gap" "8px" ]
                            [ automatonPanel ctx model ]
                        ]
                    , svgView ctx model layout.canvasWidth layout.canvasHeight
                    ]
                , editorControlsPanel { theme = ctx.theme, lang = ctx.lang } model
                , if showStack then
                    stackSidePanel ctx model

                  else
                    text ""
                ]
    in
    div [ HA.style "height" "100%", HA.style "overflow" "hidden", HA.style "display" "flex", HA.style "flex-direction" "column", HA.style "gap" "8px", HA.style "position" "relative", HA.style "outline" "none", HA.tabindex 0, shortcutEvent ]
        [ content
        , simulationPanel ctx model
        , if model.saveModalOpen then
            saveModal ctx model

          else
            text ""
        , case model.globalNotice of
            Just noticeKey ->
                let
                    noticeColor =
                        globalNoticeColor ctx.theme noticeKey
                in
                div
                    [ HA.style "position" "fixed"
                    , HA.style "top" "20px"
                    , HA.style "left" "50%"
                    , HA.style "transform" "translateX(-50%)"
                    , HA.style "z-index" "9999"
                    , HA.style "background" (panelBg ctx.theme)
                    , HA.style "color" noticeColor
                    , HA.style "border" ("1px solid " ++ noticeColor)
                    , HA.style "padding" "12px 16px"
                    , HA.style "border-radius" "10px"
                    , HA.style "box-shadow" "0 8px 24px rgba(0,0,0,0.2)"
                    , HA.style "font-weight" "600"
                    ]
                    [ H.text (t ctx.lang noticeKey) ]

            Nothing ->
                text ""
        ]


showGlobalNotice : Key -> Model -> ( Model, Cmd Msg )
showGlobalNotice key model =
    let
        nextNonce =
            model.globalNoticeNonce + 1
    in
    ( { model | globalNotice = Just key, globalNoticeNonce = nextNonce }
    , Process.sleep 5000 |> Task.perform (\_ -> DismissGlobalNotice nextNonce)
    )


handleShortcut : ShortcutEvent -> Model -> ( Model, Cmd Msg )
handleShortcut shortcut model =
    if shortcut.targetEditable then
        ( model, Cmd.none )

    else
        case ( shortcut.shiftKey, shortcut.altKey, shortcut.code ) of
            ( False, True, "Digit1" ) ->
                update (SetMode AddState) model

            ( False, True, "Digit2" ) ->
                update (SetMode AddTransition) model

            ( False, True, "Digit3" ) ->
                update (SetMode MoveState) model

            ( False, True, "KeyS" ) ->
                case model.selected of
                    Just sid ->
                        update (ToggleStart sid) model

                    Nothing ->
                        ( model, Cmd.none )

            ( False, True, "KeyE" ) ->
                case model.selected of
                    Just sid ->
                        update (ToggleAccepting sid) model

                    Nothing ->
                        ( model, Cmd.none )

            ( False, True, "KeyN" ) ->
                case ( model.selected, model.selectedTransition ) of
                    ( Just _, _ ) ->
                        ( model, Dom.focus "selected-state-name-input" |> Task.attempt (always NoOp) )

                    ( Nothing, Just _ ) ->
                        ( model, Dom.focus "selected-transition-label-input" |> Task.attempt (always NoOp) )

                    _ ->
                        if model.mode == AddTransition then
                            ( model, Dom.focus "transition-create-label-input" |> Task.attempt (always NoOp) )

                        else
                            ( model, Cmd.none )

            ( False, True, "Comma" ) ->
                if model.mode == AddTransition then
                    ( model, Dom.focus "transition-create-stack-input" |> Task.attempt (always NoOp) )

                else if model.selectedTransition /= Nothing then
                    ( model, Dom.focus "selected-transition-stack-input" |> Task.attempt (always NoOp) )

                else
                    ( model, Cmd.none )

            ( False, True, "Period" ) ->
                if model.mode == AddTransition then
                    ( model, Dom.focus "transition-create-stack-output" |> Task.attempt (always NoOp) )

                else if model.selectedTransition /= Nothing then
                    ( model, Dom.focus "selected-transition-stack-output" |> Task.attempt (always NoOp) )

                else
                    ( model, Cmd.none )

            ( False, True, "KeyQ" ) ->
                update CenterOnStartState model

            ( False, True, "KeyT" ) ->
                ( model, Dom.focus "transition-function-editor" |> Task.attempt (always NoOp) )

            ( True, True, "KeyS" ) ->
                ( model, Dom.focus "simulation-input-field" |> Task.attempt (always NoOp) )

            ( True, True, "Enter" ) ->
                if simulationSessionActive model then
                    update StopSimulation model

                else
                    update StartSimulation model

            ( True, True, "KeyN" ) ->
                update ToggleAutomatonTypeDetails model

            ( False, False, "Delete" ) ->
                case ( model.selected, model.selectedTransition ) of
                    ( Just sid, _ ) ->
                        update (DeleteState sid) model

                    ( Nothing, Just tid ) ->
                        update (DeleteTransition tid) model

                    _ ->
                        ( model, Cmd.none )

            ( False, False, "Backspace" ) ->
                if shortcut.metaKey then
                    case ( model.selected, model.selectedTransition ) of
                        ( Just sid, _ ) ->
                            update (DeleteState sid) model

                        ( Nothing, Just tid ) ->
                            update (DeleteTransition tid) model

                        _ ->
                            ( model, Cmd.none )

                else
                    ( model, Cmd.none )

            _ ->
                ( model, Cmd.none )


shortcutEvent : H.Attribute Msg
shortcutEvent =
    custom "keydown"
        (Decode.map
            (\event ->
                let
                    hasShortcut =
                        (((not event.shiftKey) && event.altKey && List.member event.code [ "Digit1", "Digit2", "Digit3", "KeyS", "KeyE", "KeyN", "KeyQ", "KeyT", "Comma", "Period" ])
                            || (event.shiftKey && event.altKey && List.member event.code [ "KeyS", "Enter", "KeyN" ])
                            || ((not event.shiftKey) && (not event.altKey) && event.code == "Delete")
                            || ((not event.shiftKey) && (not event.altKey) && event.metaKey && event.code == "Backspace")
                        )
                            && (not event.targetEditable)
                in
                { message = HandleShortcut event
                , stopPropagation = hasShortcut
                , preventDefault = hasShortcut
                }
            )
            (Decode.map5 ShortcutEvent
                (Decode.field "code" Decode.string)
                (Decode.field "shiftKey" Decode.bool)
                (Decode.field "altKey" Decode.bool)
                (Decode.field "metaKey" Decode.bool)
                (Decode.oneOf
                    [ Decode.at [ "target", "isContentEditable" ] Decode.bool
                    , Decode.map
                        (\tag ->
                            let
                                normalized =
                                    String.toLower tag
                            in
                            normalized == "input" || normalized == "textarea" || normalized == "select"
                        )
                        (Decode.at [ "target", "tagName" ] Decode.string)
                    ]
                )
            )
        )
        

codeEditorScrollEvent : H.Attribute Msg
codeEditorScrollEvent =
    on "scroll"
        (Decode.map2 CodeEditorScrolled
            (Decode.at [ "target", "scrollTop" ] Decode.float)
            (Decode.at [ "target", "scrollLeft" ] Decode.float)
        )


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




svgView : { a | lang : Lang, theme : Theme } -> Model -> Int -> Int -> Html Msg
svgView ctx model _ _ =
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
                    ("translate(" ++ String.fromFloat model.panX ++ "," ++ String.fromFloat model.panY ++ ") scale(" ++ String.fromFloat model.zoom ++ ")")
                ]
                (List.concat
                    [ List.map (viewTransition ctx model) (groupTransitionsForRender model.transitions)
                    , List.map (viewState ctx model) model.states
                    ]
                )
            ]
        , div
            [ HA.style "position" "absolute"
            , HA.style "top" "10px"
            , HA.style "right" "10px"
            , HA.style "display" "flex"
            , HA.style "gap" "6px"
            , HA.style "z-index" "11"
            ]
            [ button (canvasControlButtonAttrs ctx.theme ++ [ onClick CenterOnStartState ]) [ text (t ctx.lang I18n.EditorGoToStartState) ]
            , button (canvasControlButtonAttrs ctx.theme ++ canvasIconButtonAttrs ++ [ onClick ZoomOut ]) [ text "-" ]
            , button (canvasControlButtonAttrs ctx.theme ++ canvasIconButtonAttrs ++ [ onClick ZoomIn ]) [ text "+" ]
            ]
        , simulationChoiceOverlay ctx model
        ]



canvasControlButtonAttrs : Theme -> List (H.Attribute msg)
canvasControlButtonAttrs theme =
    [ HA.style "height" "34px"
    , HA.style "padding" "0 12px"
    , HA.style "border-radius" "8px"
    , HA.style "border" ("1px solid " ++ interactiveBorder theme)
    , HA.style "background" (interactiveBg theme)
    , HA.style "color" (textColor theme)
    , HA.style "font-size" "14px"
    , HA.style "line-height" "1"
    , HA.style "cursor" "pointer"
    , HA.style "box-shadow" (hoverShadow theme)
    ]


canvasIconButtonAttrs : List (H.Attribute msg)
canvasIconButtonAttrs =
    [ HA.style "width" "34px"
    , HA.style "padding" "0"
    , HA.style "font-size" "18px"
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
                            Basics.max 8 (Basics.min (toFloat layout.canvasHeight - 170) (state.y * model.zoom + model.panY - 30)) --92

                        leftPos =
                            let
                                desiredLeft =
                                    state.x * model.zoom + model.panX - toFloat popupWidth - toFloat popupGap - 60

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
                                [ H.text (stateNameById model.states transition.from ++ " → " ++ stateNameById model.states transition.to ++ " [" ++ transitionLabelDisplay transition.label ++ "]") ]
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
                        , div [ HA.style "margin-top" "4px" ] [ H.text (t ctx.lang I18n.EditorSimulationChoiceBody ++ " " ++ stateDisplayName state ++ ", " ++ t ctx.lang I18n.EditorTransitionLabel ++ ": " ++ choice.inputLabel) ]
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



viewState : { a | theme : Theme } -> Model -> State -> S.Svg Msg
viewState ctx model s =
    let
        r = 22
        strokeColor = if s.accepting then successColor ctx.theme else (textColor ctx.theme)
        fillColor =
            case ( ctx.theme, s.isStart ) of
                ( Theme.Light, True ) -> "#ffd84d"
                ( Theme.Dark, True ) -> "#3d3316"
                ( Theme.Light, False ) -> "#ffffff"
                ( Theme.Dark, False ) -> "#1d2433"
        isSelected = model.selected == Just s.id
        strokeWidth = if isSelected then "3" else "2"
        stateLabel = stateDisplayName s
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
                    [ SA.x (String.fromFloat (s.x - (toFloat (String.length stateLabel) * 3.5)))
                    , SA.y (String.fromFloat (s.y + 6))
                    , SA.fontSize "14"
                    , SA.fill (textColor ctx.theme)
                    , SA.style "user-select: none; -webkit-user-select: none; -moz-user-select: none;"
                    , SA.pointerEvents "none"
                    ]
                    [ S.text stateLabel ]
               ]
        )


viewTransition : { a | theme : Theme } -> Model -> TransitionGroup -> S.Svg Msg
viewTransition ctx model transitionGroup =
    case ( getStateById transitionGroup.from model.states, getStateById transitionGroup.to model.states ) of
        ( Just a, Just b ) ->
            let
                r = 22
                ( dx, dy ) = ( b.x - a.x, b.y - a.y )
                dist = sqrt (dx * dx + dy * dy)
                safe = if dist < 0.001 then 0.001 else dist
                ux = dx / safe
                uy = dy / safe
                selfLoop = transitionGroup.from == transitionGroup.to
                oppositeTransitionExists =
                    transitionGroup.from /= transitionGroup.to
                        && List.any (\t -> t.from == transitionGroup.to && t.to == transitionGroup.from) model.transitions

                startX =
                    if selfLoop then
                        a.x + 18

                    else
                        a.x + ux * (toFloat r)

                startY =
                    if selfLoop then
                        a.y - 22

                    else
                        a.y + uy * (toFloat r)

                endX =
                    if selfLoop then
                        b.x - 18

                    else
                        b.x - ux * (toFloat r + 6)

                endY =
                    if selfLoop then
                        b.y - 22

                    else
                        b.y - uy * (toFloat r + 6)

                curveOffset = 42
                rightX = -uy
                rightY = ux
                labelLift = 18
                labelNormalX =
                    if rightY <= 0 then
                        rightX

                    else
                        -rightX

                labelNormalY =
                    if rightY <= 0 then
                        rightY

                    else
                        -rightY
                controlX =
                    ((startX + endX) / 2)
                        + rightX * curveOffset

                controlY =
                    ((startY + endY) / 2)
                        + rightY * curveOffset

                pathD =
                    if selfLoop then
                        "M "
                            ++ String.fromFloat startX
                            ++ " "
                            ++ String.fromFloat startY
                            ++ " C "
                            ++ String.fromFloat (a.x + 40)
                            ++ " "
                            ++ String.fromFloat (a.y - 64)
                            ++ ", "
                            ++ String.fromFloat (a.x - 40)
                            ++ " "
                            ++ String.fromFloat (a.y - 64)
                            ++ ", "
                            ++ String.fromFloat endX
                            ++ " "
                            ++ String.fromFloat endY

                    else if oppositeTransitionExists then
                        "M "
                            ++ String.fromFloat startX
                            ++ " "
                            ++ String.fromFloat startY
                            ++ " Q "
                            ++ String.fromFloat controlX
                            ++ " "
                            ++ String.fromFloat controlY
                            ++ " "
                            ++ String.fromFloat endX
                            ++ " "
                            ++ String.fromFloat endY

                    else
                        "M "
                            ++ String.fromFloat startX
                            ++ " "
                            ++ String.fromFloat startY
                            ++ " L "
                            ++ String.fromFloat endX
                            ++ " "
                            ++ String.fromFloat endY

                baseLabelX =
                    if selfLoop then
                        a.x + 2

                    else if oppositeTransitionExists then
                        0.25 * startX + 0.5 * controlX + 0.25 * endX + rightX * 14

                    else
                        (startX + endX) / 2

                baseLabelY =
                    if selfLoop then
                        a.y - 72

                    else if oppositeTransitionExists then
                        0.25 * startY + 0.5 * controlY + 0.25 * endY + rightY * 14

                    else
                        (startY + endY) / 2

                labelX =
                    if selfLoop then
                        baseLabelX

                    else
                        baseLabelX + labelNormalX * labelLift

                labelY =
                    if selfLoop then
                        baseLabelY

                    else
                        baseLabelY + labelNormalY * labelLift

                lineAngleDeg =
                    if selfLoop then
                        -25

                    else
                        let
                            rawAngleDeg =
                                atan2 dy dx * 180 / pi
                        in
                        if rawAngleDeg > 90 then
                            rawAngleDeg - 180

                        else if rawAngleDeg < -90 then
                            rawAngleDeg + 180

                        else
                            rawAngleDeg

                labelRotation =
                    "rotate("
                        ++ String.fromFloat lineAngleDeg
                        ++ " "
                        ++ String.fromFloat labelX
                        ++ " "
                        ++ String.fromFloat labelY
                        ++ ")"

                shownLabel =
                    let
                        uniqueGroupLabels =
                            uniqueLabels transitionGroup.labels
                    in
                    if List.length uniqueGroupLabels > 1 then
                        ""

                    else
                        transitionLabelsToText uniqueGroupLabels

                hitWidth = Basics.max 24 (toFloat (String.length shownLabel) * 9)
                hitHeight = 18
                isSelected =
                    case model.selectedTransition of
                        Nothing ->
                            False

                        Just selectedId ->
                            List.member selectedId transitionGroup.transitionIds

                isActiveTransition =
                    case model.simulationActiveTransition of
                        Nothing ->
                            False

                        Just activeId ->
                            List.member activeId transitionGroup.transitionIds

                strokeWidth =
                    if isSelected then
                        "4"

                    else if isActiveTransition then
                        "3"

                    else
                        "2"

                transitionStrokeColor =
                    if isActiveTransition then
                        activeSimulationHighlightStroke ctx.theme

                    else
                        textColor ctx.theme

                labelBackground =
                    if isActiveTransition then
                        activeSimulationHighlightFill ctx.theme

                    else
                        "transparent"
                selectTransitionOnClick =
                    stopPropagationOn "click"
                        (Decode.map
                            (\button ->
                                if button == 0 then
                                    ( SelectTransition transitionGroup.primaryId, True )

                                else
                                    ( NoOp, True )
                            )
                            (Decode.field "button" Decode.int)
                        )
            in
            S.g []
                [ S.path
                    [ SA.d pathD
                    , SA.stroke "transparent"
                    , SA.strokeWidth "10"
                    , SA.fill "none"
                    , selectTransitionOnClick
                    ]
                    []
                , S.path
                    [ SA.d pathD
                    , SA.stroke transitionStrokeColor
                    , SA.strokeWidth strokeWidth
                    , SA.markerEnd "url(#arrowhead)"
                    , SA.fill "none"
                    , SA.pointerEvents "none"
                    ]
                    []
                , S.rect
                    [ SA.x (String.fromFloat (labelX - (hitWidth / 2)))
                    , SA.y (String.fromFloat (labelY - (toFloat hitHeight / 2)))
                    , SA.width (String.fromFloat hitWidth)
                    , SA.height (String.fromFloat hitHeight)
                    , SA.fill labelBackground
                    , SA.stroke "none"
                    , SA.transform labelRotation
                    , selectTransitionOnClick
                    ]
                    []
                , S.text_
                    [ SA.x (String.fromFloat labelX)
                    , SA.y (String.fromFloat labelY)
                    , SA.textAnchor "middle"
                    , SA.dominantBaseline "middle"
                    , SA.fontSize "12"
                    , SA.fill transitionStrokeColor
                    , SA.transform labelRotation
                    , SA.style "user-select: none; -webkit-user-select: none; -moz-user-select: none;"
                    , SA.pointerEvents "none"
                    ]
                    [ S.text shownLabel ]
                ]

        _ ->
            S.text_ [] []


groupTransitionsForRender : List Transition -> List TransitionGroup
groupTransitionsForRender transitions =
    let
        sortedTransitions =
            List.sortBy .id transitions

        step transition ( grouped, order ) =
            let
                key =
                    ( transition.from, transition.to )
            in
            case Dict.get key grouped of
                Just existing ->
                    ( Dict.insert key
                        { existing
                            | transitionIds = existing.transitionIds ++ [ transition.id ]
                            , labels = existing.labels ++ [ transition.label ]
                        }
                        grouped
                    , order
                    )

                Nothing ->
                    ( Dict.insert key
                        { from = transition.from
                        , to = transition.to
                        , transitionIds = [ transition.id ]
                        , labels = [ transition.label ]
                        , primaryId = transition.id
                        }
                        grouped
                    , key :: order
                    )

        ( groupedByPair, orderedKeysReversed ) =
            List.foldl step ( Dict.empty, [] ) sortedTransitions
    in
    List.reverse orderedKeysReversed
        |> List.filterMap (\key -> Dict.get key groupedByPair)





transitionLabelsForPair : List Transition -> Int -> Int -> List String
transitionLabelsForPair transitions fromState toState =
    transitions
        |> List.filter (\transition -> transition.from == fromState && transition.to == toState)
        |> List.map .label
        |> uniqueLabels


transitionLabelsToEditorText : List String -> String
transitionLabelsToEditorText labels =
    labels
        |> String.join ";"
        
transitionLabelsToText : List String -> String
transitionLabelsToText labels =
    labels
        |> uniqueLabels
        |> List.map transitionLabelDisplay
        |> String.join ", "


uniqueLabels : List String -> List String
uniqueLabels labels =
    let
        step label acc =
            if List.member label acc then
                acc

            else
                acc ++ [ label ]
    in
    List.foldl step [] labels
    

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
    let
        deterministic =
            isDeterministic model.transitions

        label =
            if deterministic then
                t ctx.lang EditorAutomatonDeterministic

            else
                t ctx.lang EditorAutomatonNonDeterministic

        color =
            if deterministic then
                successColor ctx.theme

            else
                warningColor ctx.theme
    in
    div
        [ HA.style "background" (interactiveBg ctx.theme)
        , HA.style "border" ("1px solid " ++ interactiveBorder ctx.theme)
        , HA.style "padding" "4px 8px"
        , HA.style "border-radius" "999px"
        , HA.style "display" "flex"
        , HA.style "align-items" "center"
        , HA.style "gap" "8px"
        , HA.style "width" "fit-content"
        ]
        [ H.div [ HA.style "font-size" "12px", HA.style "opacity" "0.85" ] [ H.text (t ctx.lang EditorType ++ ":") ]
        , H.div [ HA.style "color" color, HA.style "font-weight" "bold", HA.style "font-size" "12px" ] [ H.text label ]
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
                hasAutomaton =
                    not (String.isEmpty slot.automatonJson)

                isSaving =
                    model.animatingSavedSlot == Just slot.id

                isDeleting =
                    model.animatingDeletedSlot == Just slot.id

                slotBackground =
                    if isSaving then
                        "rgba(46, 204, 113, 0.12)"

                    else if isDeleting then
                        "rgba(231, 76, 60, 0.12)"

                    else
                        "transparent"

                slotTransform =
                    if isSaving then
                        "translateY(-1px) scale(1.01)"

                    else if isDeleting then
                        "scale(0.985)"

                    else
                        "scale(1)"

                slotOpacity =
                    if isDeleting then
                        "0.82"

                    else
                        "1"
                        
                slotLabel =
                    if hasAutomaton then
                        if String.isEmpty slot.name then
                            ""

                        else
                            slot.name

                    else
                        t ctx.lang EditorSlotEmpty

                renameInputWidth =
                    String.fromInt (Basics.max 10 (String.length model.renameDraft + 2)) ++ "ch"

                slotTypeBadge =
                    case slot.automatonType of
                        Just FiniteAutomaton ->
                            H.div
                                [ HA.style "padding" "2px 8px"
                                , HA.style "border-radius" "999px"
                                , HA.style "border" ("1px solid " ++ interactiveBorder ctx.theme)
                                , HA.style "background" (interactiveBg ctx.theme)
                                , HA.style "font-size" "12px"
                                , HA.style "font-weight" "600"
                                , HA.style "white-space" "nowrap"
                                ]
                                [ H.text (t ctx.lang MenuAutomatonFinite) ]

                        Just StackAutomaton ->
                            H.div
                                [ HA.style "padding" "2px 8px"
                                , HA.style "border-radius" "999px"
                                , HA.style "border" ("1px solid " ++ interactiveBorder ctx.theme)
                                , HA.style "background" (interactiveBg ctx.theme)
                                , HA.style "font-size" "12px"
                                , HA.style "font-weight" "600"
                                , HA.style "white-space" "nowrap"
                                ]
                                [ H.text (t ctx.lang MenuAutomatonStack) ]

                        Nothing ->
                            text ""
            in
            div
                [ HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
                , HA.style "padding" "10px"
                , HA.style "border-radius" "8px"
                , HA.style "background" slotBackground
                , HA.style "transform" slotTransform
                , HA.style "opacity" slotOpacity
                , HA.style "transition" "background 360ms ease, transform 360ms ease, opacity 360ms ease"
                ]
                [ div [ HA.style "display" "flex", HA.style "align-items" "center", HA.style "gap" "8px", HA.style "flex-wrap" "wrap" ]
                    [ H.div [] [ H.text (t ctx.lang EditorSlot ++ " " ++ String.fromInt slot.id ++ ":") ]
                    , if model.renamingSlot == Just slot.id then
                        input
                            ([ HA.type_ "text"
                             , value model.renameDraft
                             , placeholder (t ctx.lang EditorRenameSlot)
                             , onInput UpdateRenameDraft
                             , HA.style "width" renameInputWidth
                             ]
                                ++ editorTextInputStyles ctx.theme
                            )
                            []

                      else
                        H.div [] [ H.text slotLabel ]
                    , if model.renamingSlot == Just slot.id then
                        H.button (editorButtonStyles ctx.theme ++ [ onClick (ConfirmRenameSlot slot.id), title (t ctx.lang EditorConfirmRename) ]) [ H.text "✓" ]

                      else
                        H.button (editorButtonStyles ctx.theme ++ [ onClick (StartRenameSlot slot.id), title (t ctx.lang EditorRenameSlot) ]) [ H.text "✎" ]
                    , slotTypeBadge
                    , if model.recentlySavedSlot == Just slot.id then
                        H.div [ HA.style "color" (successColor ctx.theme), HA.style "font-weight" "bold" ] [ H.text (t ctx.lang EditorSaved) ]

                      else
                        text ""
                    ]
                , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "margin-top" "8px", HA.style "flex-wrap" "wrap" ]
                    [ div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "flex-wrap" "wrap" ]
                        (H.button (editorButtonStyles ctx.theme ++ [ onClick (SaveToSlot slot.id) ]) [ H.text (t ctx.lang EditorSaveToSlot) ]
                            :: (if hasAutomaton then
                                    [ H.button (editorButtonStyles ctx.theme ++ [ onClick (LoadFromSlot slot.id) ]) [ H.text (t ctx.lang EditorLoadFromSlot) ]
                                    , H.button (editorButtonStyles ctx.theme ++ [ onClick (DeleteFromSlot slot.id) ]) [ H.text (t ctx.lang EditorDeleteFromSlot) ]
                                    ]

                                else
                                    []
                               )
                        )
                    , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "margin-left" "auto", HA.style "flex-wrap" "wrap" ]
                        ((if hasAutomaton then
                            [ H.button (editorButtonStyles ctx.theme ++ [ onClick (ExportSlot slot.id) ]) [ H.text (t ctx.lang EditorExportFas) ] ]

                          else
                            []
                         )
                            ++ [ H.button (editorButtonStyles ctx.theme ++ [ onClick (ImportSlot slot.id) ]) [ H.text (t ctx.lang EditorImportFas) ] ]
                        )
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
            [ div [ HA.style "display" "flex", HA.style "justify-content" "space-between", HA.style "align-items" "center", HA.style "margin-bottom" "10px", HA.style "min-height" "32px", HA.style "gap" "12px" ]
                [ H.h2 [ HA.style "margin" "0" ] [ H.text (t ctx.lang EditorSaveModalTitle) ]
                , if model.slotTypeMismatchError then
                    H.div [ HA.style "color" "#e74c3c", HA.style "font-weight" "600", HA.style "margin-left" "auto", HA.style "text-align" "right", HA.style "max-width" "420px" ] [ H.text (t ctx.lang EditorAutomatonTypeMismatch) ]

                  else if model.slotImportError then
                    H.div [ HA.style "color" "#e74c3c", HA.style "font-weight" "600", HA.style "margin-left" "auto", HA.style "text-align" "right" ] [ H.text (t ctx.lang EditorImportError) ]

                  else
                    text ""
                ]
            , div [ HA.style "display" "grid", HA.style "grid-template-columns" "1fr", HA.style "gap" "10px" ] (List.map viewSlot model.saveSlots)
            , div [ HA.style "margin-top" "12px" ] [ H.button (editorButtonStyles ctx.theme ++ [ onClick CloseSaveModal ]) [ H.text (t ctx.lang EditorClose) ] ]
            ]
        ]


editorButtonStyles : Theme -> List (H.Attribute msg)
editorButtonStyles theme =
    [ HA.style "background" (interactiveBg theme)
    , HA.style "color" (textColor theme)
    , HA.style "border" ("1px solid " ++ interactiveBorder theme)
    , HA.style "border-radius" "8px"
    , HA.style "padding" "4px 8px"
    ]


editorTextInputStyles : Theme -> List (H.Attribute msg)
editorTextInputStyles theme =
    [ HA.style "font-size" "14px"
    , HA.style "line-height" "normal"
    , HA.style "font-family" "inherit"
    , HA.style "height" "32px"
    , HA.style "min-height" "32px"
    , HA.style "padding" "0 8px"
    , HA.style "box-sizing" "border-box"
    , HA.style "color" (textColor theme)
    , HA.style "caret-color" (textColor theme)
    , HA.style "background" (inputBg theme)
    , HA.style "border" ("1px solid " ++ interactiveBorder theme)
    , HA.style "border-radius" "6px"
    , HA.style "vertical-align" "middle"
    ]
    

editorControlsPanel : { a | theme : Theme, lang : Lang } -> Model -> Html Msg
editorControlsPanel ctx model =
    let
        simulationLocked =
            simulationSessionActive model

        deterministic =
            isDeterministic model.transitions

        automatonDetailsExpanded =
            (not deterministic) && model.automatonTypeExpanded

        automatonCardClosing =
            (not deterministic) && model.automatonTypeAnimationActive && (not automatonDetailsExpanded)

        automatonCardExpandedVisual =
            automatonDetailsExpanded || automatonCardClosing

        automatonLabel =
            if deterministic then
                t ctx.lang EditorAutomatonDeterministic

            else
                t ctx.lang EditorAutomatonNonDeterministic

        automatonColor =
            if deterministic then
                successColor ctx.theme

            else
                warningColor ctx.theme

        reasons =
            nonDeterminismReasons ctx.lang model.states model.transitions

        modeButton target label =
            H.button
                (editorButtonStyles ctx.theme
                    ++ [ onClick (SetMode target)
                       , HA.style "background" (if model.mode == target then hoverBg ctx.theme else interactiveBg ctx.theme)
                       , HA.style "border-color" (if model.mode == target then hoverBorder ctx.theme else interactiveBorder ctx.theme)
                       , HA.disabled simulationLocked
                       ]
                )
                [ H.text label ]
        
        cardStyles =
            [ HA.style "background" (interactiveBg ctx.theme)
            , HA.style "border" ("1px solid " ++ interactiveBorder ctx.theme)
            , HA.style "padding" "10px"
            , HA.style "border-radius" "10px"
            , HA.style "overflow" "hidden"
            ]
    
        automatonCardMaxHeight =
            if automatonDetailsExpanded then
                "45%"

            else
                "48px"

    in
    div
        [ HA.style "width" "300px"
        , HA.style "height" "100%"
        , HA.style "display" "flex"
        , HA.style "flex-direction" "column"
        , HA.style "gap" "10px"
        , HA.style "overflow" "hidden"
        ]
        [ div
            (cardStyles
                ++ [ HA.style "display" "flex"
                   , HA.style "flex-direction" "column"
                   , HA.style "gap" "8px"
                   , HA.style "flex" (if automatonCardExpandedVisual then "55 1 0" else "1 1 auto")
                   , HA.style "min-height" "0"
                   ]
            )
            [ H.h2 [ HA.style "margin" "0" ] [ H.text (t ctx.lang EditorMode) ]
            , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "align-items" "center", HA.style "margin-top" "4px", HA.style "flex-wrap" "wrap" ]
                [ modeButton AddState (t ctx.lang EditorModeAddState)
                , modeButton AddTransition (t ctx.lang EditorModeAddTransition)
                , modeButton MoveState (t ctx.lang EditorModeMoveState)
                ]
            , if model.mode == AddTransition then
                div []
                    [ H.h2 [] [ H.text (t ctx.lang EditorTransitions) ]
                    , div [ HA.style "display" "flex", HA.style "flex-direction" "column", HA.style "gap" "6px", HA.style "align-items" "stretch" ]
                        [ H.text (t ctx.lang EditorTransitionLabel ++ ":")
                        , input
                            ([ HA.type_ "text"
                             , size 12
                             , placeholder "λ"
                             , HA.id "transition-create-label-input"
                             , value model.transitionLabel
                             , onInput SetTransitionLabel
                             ]
                                ++ editorTextInputStyles ctx.theme
                            )
                            []
                        , H.text (t ctx.lang EditorTransitionStackInput ++ ":")
                        , input
                            ([ HA.type_ "text"
                             , size 12
                             , placeholder "λ"
                             , HA.id "transition-create-stack-input"
                             , value model.transitionStackInput
                             , onInput SetTransitionStackInput
                             ]
                                ++ editorTextInputStyles ctx.theme
                            )
                            []
                        , H.text (t ctx.lang EditorTransitionStackOutput ++ ":")
                        , input
                            ([ HA.type_ "text"
                             , size 12
                             , placeholder "λ"
                             , HA.id "transition-create-stack-output"
                             , value model.transitionStackOutput
                             , onInput SetTransitionStackOutput
                             ]
                                ++ editorTextInputStyles ctx.theme
                            )
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
                div [ HA.style "overflow" "auto" ]
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
                                                ([ HA.type_ "text"
                                                 , HA.id "selected-state-name-input"
                                                 , placeholder (String.fromInt s.id)
                                                 , value s.name
                                                 , onInput SetSelectedStateName
                                                 ]
                                                    ++ editorTextInputStyles ctx.theme
                                                )
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
                                            [ H.button (editorButtonStyles ctx.theme ++ [ onClick (DeleteState s.id) ]) [ H.text (t ctx.lang EditorDeleteState) ] ]
                                        , div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "margin-top" "8px" ]
                                            [ H.button
                                                (editorButtonStyles ctx.theme
                                                    ++ [ onClick (ToggleStart s.id)
                                                       , HA.disabled simulationLocked
                                                       ]
                                                )
                                                [ H.text (if s.isStart then t ctx.lang EditorUnsetStart else t ctx.lang EditorMakeStart) ]
                                            , H.button
                                                (editorButtonStyles ctx.theme
                                                    ++ [ onClick (ToggleAccepting s.id)
                                                       , HA.disabled simulationLocked
                                                       ]
                                                )
                                                [ H.text (if s.accepting then t ctx.lang EditorUnsetAccepting else t ctx.lang EditorMakeAccepting) ]
                                            ]
                                        ]

                        ( Nothing, Just tid ) ->
                            case List.head (List.filter (\tr -> tr.id == tid) model.transitions) of
                                Nothing ->
                                    div [] [ H.text (t ctx.lang EditorSelectedNotFound) ]

                                Just tr ->
                                    div []
                                        [ div [] [ H.text (t ctx.lang EditorSelectedTransition ++ ": " ++ quotedStateNameById model.states tr.from ++ " → " ++ quotedStateNameById model.states tr.to) ]
                                        , div [ HA.style "margin-top" "6px", HA.style "display" "flex", HA.style "flex-direction" "column", HA.style "gap" "6px" ]
                                            [ H.text (t ctx.lang EditorTransitionLabel ++ ": ")
                                            , input
                                                ([ HA.type_ "text"
                                                 , HA.id "selected-transition-label-input"
                                                 , placeholder "λ"
                                                 , value model.selectedTransitionLabelDraft
                                                 , onInput SetSelectedTransitionLabel
                                                 ]
                                                    ++ editorTextInputStyles ctx.theme
                                                )
                                                []
                                            , H.text (t ctx.lang EditorTransitionStackInput ++ ":")
                                            , input
                                                ([ HA.type_ "text"
                                                 , HA.id "selected-transition-stack-input"
                                                 , placeholder "λ"
                                                 , value model.selectedTransitionStackInputDraft
                                                 , onInput SetSelectedTransitionStackInput
                                                 ]
                                                    ++ editorTextInputStyles ctx.theme
                                                )
                                                []
                                            , H.text (t ctx.lang EditorTransitionStackOutput ++ ":")
                                            , input
                                                ([ HA.type_ "text"
                                                 , HA.id "selected-transition-stack-output"
                                                 , placeholder "λ"
                                                 , value model.selectedTransitionStackOutputDraft
                                                 , onInput SetSelectedTransitionStackOutput
                                                 ]
                                                    ++ editorTextInputStyles ctx.theme
                                                )
                                                []
                                            ]
                                        , div [ HA.style "margin-top" "8px", HA.style "display" "flex", HA.style "gap" "8px" ]
                                            [ H.button (editorButtonStyles ctx.theme ++ [ onClick (DeleteTransition tr.id) ]) [ H.text (t ctx.lang EditorDeleteTransition) ] ]
                                        ]

                        _ ->
                            div [] [ H.text (t ctx.lang EditorSelectedNone) ]
                    ]

              else
                text ""
            ]
        , div
            (cardStyles
                ++ [ HA.style "display" "flex"
                   , HA.style "flex-direction" "column"
                   , HA.style "gap" "8px"
                   , HA.style "flex" (if automatonCardExpandedVisual then "45 1 0" else "0 0 auto")
                   , HA.style "max-height" automatonCardMaxHeight
                   , HA.style "min-height" (if automatonDetailsExpanded then "0" else "auto")
                   , HA.style "transition" "max-height 240ms ease"
                   ]
            )
            [ div
                [ HA.style "display" "flex"
                , HA.style "align-items" "center"
                , HA.style "justify-content" "center"
                , HA.style "gap" "8px"
                , HA.style "min-height" "32px"
                ]
                [ if deterministic then
                    text ""

                  else
                    H.button
                        (editorButtonStyles ctx.theme
                            ++ [ onClick ToggleAutomatonTypeDetails
                               , HA.style "padding" "2px 8px"
                               , HA.style "font-size" "16px"
                               , title (t ctx.lang EditorAutomatonTypeDetailsToggle)
                               ]
                        )
                        [ H.text (if automatonDetailsExpanded then "▾" else "▴") ]
                , H.div [ HA.style "font-size" "16px", HA.style "font-weight" "700", HA.style "color" automatonColor, HA.style "text-align" "center" ] [ H.text automatonLabel ]
                ]
            , div
                [ HA.style "display" "flex"
                , HA.style "flex-direction" "column"
                , HA.style "min-height" "0"
                , HA.style "overflow" "hidden"
                , HA.style "max-height" (if automatonDetailsExpanded then "100%" else "0")
                , HA.style "opacity" (if automatonDetailsExpanded then "1" else "0")
                , HA.style "transition" "max-height 240ms ease, opacity 180ms ease"
                ]
                [ H.div [ HA.style "font-size" "14px", HA.style "font-weight" "600" ]
                    [ H.text
                        (t ctx.lang EditorAutomatonNonDetReasonsTitle)
                    ]
                , if model.automatonTypeAnimationActive then
                    text ""

                  else
                    div [ HA.style "margin-top" "6px", HA.style "overflow" "auto", HA.style "padding-right" "4px" ]
                        [ H.ul [ HA.style "margin" "0", HA.style "padding-left" "18px", HA.style "font-size" "14px" ] (List.map (\reason -> H.li [ HA.style "margin-bottom" "4px" ] [ H.text reason ]) reasons) ]
                ]
            ]
        ]


stackSidePanel : { a | theme : Theme, lang : Lang } -> Model -> Html Msg
stackSidePanel ctx model =
    div
        [ HA.style "width" "110px"
        , HA.style "height" "100%"
        , HA.style "background" (interactiveBg ctx.theme)
        , HA.style "border" ("1px solid " ++ interactiveBorder ctx.theme)
        , HA.style "border-radius" "10px"
        , HA.style "padding" "8px"
        , HA.style "box-sizing" "border-box"
        ]
        [ stackVisual ctx model ]


stackCellsFromStack : List String -> List (Maybe String)
stackCellsFromStack stack =
    if List.isEmpty stack then
        [ Nothing ]

    else
        List.map Just stack


stackVisual : { a | theme : Theme, lang : Lang } -> Model -> Html Msg
stackVisual ctx model =
    let
        cells =
            stackCellsFromStack model.simulationStack

        cellView cellValue =
            div
                [ HA.style "height" "24px"
                , HA.style "border" ("1px solid " ++ stackBorder ctx.theme)
                , HA.style "border-radius" "4px"
                , HA.style "background" (if cellValue == Nothing then stackEmptyBg ctx.theme else stackFillBg ctx.theme)
                , HA.style "display" "flex"
                , HA.style "align-items" "center"
                , HA.style "justify-content" "center"
                , HA.style "font-size" "12px"
                ]
                [ H.text (Maybe.withDefault "" cellValue) ]
    in
    div
        [ HA.style "width" "100%"
        , HA.style "height" "100%"
        , HA.style "display" "flex"
        , HA.style "flex-direction" "column"
        , HA.style "align-items" "stretch"
        , HA.style "gap" "6px"
        ]
        [ H.div [ HA.style "font-size" "14px", HA.style "font-weight" "700", HA.style "text-align" "center" ] [ H.text (t ctx.lang EditorStackVisual) ]
        , div
            [ HA.style "height" "100%"
            , HA.style "min-height" "0"
            , HA.style "overflow-y" "auto"
            ]
            [ div
                [ HA.style "display" "flex"
                , HA.style "flex-direction" "column"
                , HA.style "justify-content" "flex-end"
                , HA.style "gap" "4px"
                , HA.style "min-height" "100%"
                ]
                (List.map cellView cells)
            ]
        ]


transitionFunctionPanel : { a | theme : Theme, lang : Lang } -> Model -> Html Msg
transitionFunctionPanel ctx model =
    let
        formatValidationError err =
            t ctx.lang EditorCodeValidationLinePrefix
                ++ " "
                ++ String.fromInt err.lineNumber
                ++ ": "
                ++ err.lineText
                ++ " — "
                ++ t ctx.lang err.message

        transitionFunctionValue =
            if model.codeEditorFocused || hasCodeValidationErrors model then
                model.codeDraft

            else
                encodeTransitionLanguage model.states model.transitions

        draftIndicatorTitle =
            if hasCodeValidationErrors model then
                model.codeValidationErrors
                    |> List.map formatValidationError
                    |> String.join "\n"

            else
                t ctx.lang EditorCodeDraftChanges

        highlightedTransitionLine =
            activeTransitionLine model
    in
    div
        [ HA.style "width" "251px"
        , HA.style "background" (panelBg ctx.theme)
        , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
        , HA.style "padding" "12px"
        , HA.style "border-radius" "12px"
        , HA.style "overflow" "hidden"
        , HA.style "display" "flex"
        , HA.style "flex-direction" "column"
        ]
        [ div [ HA.style "display" "flex", HA.style "align-items" "center", HA.style "justify-content" "space-between", HA.style "gap" "8px" ]
            [ H.h2 [ HA.style "margin" "0" ] [ H.text (t ctx.lang EditorTransitionFunction) ]
            , if model.codeDraftDirty then
                H.span
                    [ HA.style "font-size" "20px"
                    , HA.style "color" (if hasCodeValidationErrors model then errorColor ctx.theme else warningColor ctx.theme)
                    , title draftIndicatorTitle
                    ]
                    [ H.text "✎" ]

              else
                text ""
            ]
        , let
            errorLineNumbers =
                List.map .lineNumber model.codeValidationErrors

            displayLines =
                case String.lines transitionFunctionValue of
                    [] ->
                        [ "" ]

                    lines ->
                        lines
          in
          div
            [ HA.style "position" "relative"
            , HA.style "margin-top" "8px"
            , HA.style "flex" "1"
            , HA.style "min-height" "0"
            , HA.style "overflow" "hidden"
            ]
            [ H.pre
                [ HA.style "position" "absolute"
                , HA.style "inset" "0"
                , HA.style "margin" "0"
                , HA.style "padding" "8px"
                , HA.style "overflow" "hidden"
                , HA.style "white-space" "pre-wrap"
                , HA.style "word-break" "break-word"
                , HA.style "font-family" "monospace"
                , HA.style "font-size" "14px"
                , HA.style "line-height" "20px"
                , HA.style "pointer-events" "none"
                , HA.style "color" "transparent"
                ]
                [ H.div
                    [ HA.style "min-height" "100%"
                    , HA.style "min-width" "100%"
                    , HA.style "transform" ("translate(" ++ String.fromFloat (0 - model.codeEditorScrollLeft) ++ "px, " ++ String.fromFloat (0 - model.codeEditorScrollTop) ++ "px)")
                    ]
                    (displayLines
                        |> List.indexedMap
                            (\idx lineText ->
                                H.div
                                    [ HA.style "text-decoration-line" (if List.member (idx + 1) errorLineNumbers then "underline" else "none")
                                    , HA.style "text-decoration-style" (if List.member (idx + 1) errorLineNumbers then "wavy" else "solid")
                                    , HA.style "text-decoration-color" (if List.member (idx + 1) errorLineNumbers then errorColor ctx.theme else "transparent")
                                    , HA.style "background"
                                        (if highlightedTransitionLine == Just (idx + 1) then
                                            activeSimulationHighlightFill ctx.theme

                                         else
                                            "transparent"
                                        )
                                    , HA.style "color"
                                        (if highlightedTransitionLine == Just (idx + 1) then
                                            activeSimulationHighlightStroke ctx.theme

                                         else
                                            textColor ctx.theme
                                        )
                                    , HA.style "border-radius" "6px"
                                    ]
                                    [ H.text (if String.isEmpty lineText then " " else lineText) ]
                            )
                    )
                ]
            , textarea
                [ onFocus (SetCodeEditorFocused True)
                , onBlur (SetCodeEditorFocused False)
                , onInput CodeEdited
                , value transitionFunctionValue
                , HA.id "transition-function-editor"
                , HA.style "position" "relative"
                , HA.style "z-index" "1"
                , codeEditorScrollEvent
                , HA.style "width" "100%"
                , HA.style "height" "100%"
                , HA.style "flex" "1"
                , HA.style "min-height" "0"
                , HA.style "box-sizing" "border-box"
                , HA.style "resize" "none"
                , HA.style "background" "transparent"
                , HA.style "font-family" "monospace"
                , HA.style "font-size" "14px"
                , HA.style "line-height" "20px"
                , HA.style "padding" "8px"
                , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
                , HA.style "border-radius" "8px"
                , HA.style "border-color" (if hasCodeValidationErrors model then errorColor ctx.theme else "")
                , HA.style "outline" "none"
                , HA.style "color" "transparent"
                , HA.style "caret-color" (textColor ctx.theme)
                , HA.style "text-shadow" "0 0 0 transparent"
                ]
                []
            ]
        , div [ HA.style "margin-top" "8px", HA.style "display" "flex", HA.style "gap" "8px", HA.style "flex-wrap" "wrap" ]
            [ H.button (editorButtonStyles ctx.theme ++ [ onClick ImportCode ]) [ H.text (t ctx.lang EditorImport) ]
            , H.button (editorButtonStyles ctx.theme ++ [ onClick ExportCode ]) [ H.text (t ctx.lang EditorExport) ]
            ]
        ]


simulationPanel : { a | theme : Theme, lang : Lang } -> Model -> Html Msg
simulationPanel ctx model =
    let
        simulationLocked =
            simulationSessionActive model || hasCodeValidationErrors model

        speedIndex =
            simulationSpeedIndexFromDelay model.simulationDelay

        inputWidthCh =
            simulationInputWidthCh model.simulationInput
    in
    div
        [ HA.style "background" (panelBg ctx.theme)
        , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
        , HA.style "padding" "14px"
        , HA.style "border-radius" "12px"
        , HA.style "overflow" "hidden"
        , HA.style "flex-shrink" "0"
        ]
        [ div [ HA.style "display" "flex", HA.style "gap" "10px", HA.style "align-items" "center", HA.style "flex-wrap" "wrap" ]
            [ H.h2 [ HA.style "margin" "0", HA.style "font-size" "20px", HA.style "min-width" "130px" ] [ H.text (t ctx.lang EditorSimulation) ]
            , textarea
                [ rows 1
                , HA.id "simulation-input-field"
                , placeholder (t ctx.lang EditorSimulationInput)
                , value model.simulationInput
                , onInput SetSimulationInput
                , HA.disabled simulationLocked
                , HA.style "min-width" "170px"
                , HA.style "width" ("min(" ++ String.fromInt inputWidthCh ++ "ch, 92vw)")
                , HA.style "max-width" "100%"
                , HA.style "height" "32px"
                , HA.style "min-height" "32px"
                , HA.style "max-height" "120px"
                , HA.style "padding" "6px 12px"
                , HA.style "line-height" "16px"
                , HA.style "box-sizing" "border-box"
                , HA.style "resize" "none"
                , HA.style "overflow-y" "auto"
                , HA.style "background" (interactiveBg ctx.theme)
                , HA.style "color" (textColor ctx.theme)
                , HA.style "font-size" "16px"
                , HA.style "border" ("1px solid " ++ interactiveBorder ctx.theme)
                , HA.style "border-radius" "8px"
                , HA.style "outline" "none"
                ]
                []
            , div
                [ HA.style "display" "flex"
                , HA.style "flex-direction" "column"
                , HA.style "gap" "4px"
                , HA.style "min-width" "170px"
                ]
                [ input
                    [ type_ "range"
                    , HA.min "0"
                    , HA.max "4"
                    , step "1"
                    , value (String.fromInt speedIndex)
                    , onInput SetSimulationDelay
                    , HA.disabled simulationLocked
                    , HA.style "width" "100%"
                    ]
                    []
                , div [ HA.style "font-size" "12px", HA.style "text-align" "center", HA.style "opacity" "0.85" ]
                    [ text (t ctx.lang EditorSimulationDelay ++ ": " ++ model.simulationDelay ++ " ms") ]
                ]
            , case model.simulationRunMode of
                Nothing ->
                    div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "flex-wrap" "wrap" ]
                        [ H.button
                            (editorButtonStyles ctx.theme
                                ++ [ onClick StartSimulation
                                   , HA.disabled simulationLocked
                                   , HA.style "height" "36px"
                                   ]
                            )
                            [ H.text (t ctx.lang EditorSimulationStart) ]
                        , H.button
                            (editorButtonStyles ctx.theme
                                ++ [ onClick StartStepSimulation
                                   , HA.disabled simulationLocked
                                   , HA.style "height" "36px"
                                   ]
                            )
                            [ H.text (t ctx.lang EditorSimulationStepStart) ]
                        ]

                Just AutoRun ->
                    H.button
                        (editorButtonStyles ctx.theme
                            ++ [ onClick StopSimulation
                               , HA.style "height" "36px"
                               ]
                        )
                        [ H.text (t ctx.lang EditorSimulationStop) ]

                Just StepRun ->
                    div [ HA.style "display" "flex", HA.style "gap" "8px", HA.style "flex-wrap" "wrap" ]
                        [ H.button
                            (editorButtonStyles ctx.theme
                                ++ [ onClick StopSimulation
                                   , HA.style "height" "36px"
                                   ]
                            )
                            [ H.text (t ctx.lang EditorSimulationStop) ]
                        , H.button
                            (editorButtonStyles ctx.theme
                                ++ [ onClick StepForwardSimulation
                                   , HA.disabled (model.simulationCurrent == Nothing)
                                   , HA.style "height" "36px"
                                   ]
                            )
                            [ H.text (t ctx.lang EditorSimulationStepForward) ]
                        , H.button
                            (editorButtonStyles ctx.theme
                                ++ [ onClick StepBackwardSimulation
                                   , HA.disabled (List.isEmpty model.simulationHistory)
                                   , HA.style "height" "36px"
                                   ]
                            )
                            [ H.text (t ctx.lang EditorSimulationStepBackward) ]
                        ]
            , case simulationStatus ctx.lang model.simulationResult of
                Nothing ->
                    text ""

                Just ( msg, color ) ->
                    div
                        [ HA.style "color" color
                        , HA.style "margin-left" "auto"
                        , HA.style "margin-right" "auto"
                        , HA.style "text-align" "center"
                        , HA.style "white-space" "nowrap"
                        , HA.style "font-weight" "bold"
                        ]
                        [ H.text msg ]
            ]
        , simulationInputPreview ctx.theme model
        ]