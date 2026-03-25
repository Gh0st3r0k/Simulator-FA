port module Main exposing (main)

import AutomatonFormat exposing (AutomatonType(..), typeToStorageLabel)
import Browser
import Browser.Navigation as Nav
import Browser.Events
import Browser.Dom as Dom
import Task
import Json.Decode as Decode
import Json.Encode as Encode
import Html as H exposing (Html, button, div, h1, h2, text, select, option, textarea)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (onClick, onInput, onMouseEnter, onMouseLeave, stopPropagationOn)
import Url
import String
import Route exposing (Route(..))
import I18n exposing (Lang(..), Key(..), t, langFromString, langToString)
import Theme
    exposing
        ( Theme(..)
        , toggle
        , bgColor
        , textColor
        , panelBg
        , panelBorder
        , interactiveBg
        , interactiveBorder
        , hoverBg
        , hoverBorder
        , focusOutline
        , hoverShadow
        )
import Design
    exposing
        ( Scale(..)
        , Size(..)
        , tokens
        , control
        , card
        , borderFor
        , px
        )
import Pages.Editor as Editor
import Pages.EditorStack as EditorStack
import Pages.Instructions as Instructions
import Pages.About as About
import Svg.Attributes exposing (d)


-- MODEL

type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , route : Route
    , lang : Lang
    , theme : Theme
    , scale : Scale
    , editor : Editor.Model
    , editorStack : EditorStack.Model
    , instructions : Instructions.Model
    , about : About.Model
    , hover : Maybe Route
    , vpW : Int
    , vpH : Int
    , feedbackModalOpen : Bool
    , feedbackText : String
    , feedbackEmailInput : String
    , feedbackMailProvider : MailProvider
    , settingsModalOpen : Bool
    , welcomeModalOpen : Bool
    , startPage : StartPage
    }


type MailProvider
    = GmailProvider
    | OutlookProvider


mailProviderToString : MailProvider -> String
mailProviderToString provider =
    case provider of
        GmailProvider ->
            "gmail"

        OutlookProvider ->
            "outlook"



mailProviderFromString : String -> MailProvider
mailProviderFromString value =
    case value of
        "outlook" ->
            OutlookProvider

        _ ->
            GmailProvider
            

type StartPage
    = StartPageWelcome
    | StartPageHome
    | StartPageFinite
    | StartPageStack


startPageFromInt : Int -> StartPage
startPageFromInt value =
    case value of
        1 ->
            StartPageHome

        2 ->
            StartPageFinite

        3 ->
            StartPageStack

        _ ->
            StartPageHome


startPageToInt : StartPage -> Int
startPageToInt startPage =
    case startPage of
        StartPageWelcome ->
            1

        StartPageHome ->
            1

        StartPageFinite ->
            2

        StartPageStack ->
            3


startPageFromString : String -> StartPage
startPageFromString rawValue =
    rawValue
        |> String.toInt
        |> Maybe.withDefault 0
        |> startPageFromInt


defaultRouteForStartPage : StartPage -> Route
defaultRouteForStartPage startPage =
    case startPage of
        StartPageFinite ->
            Editor

        StartPageStack ->
            EditorStack

        _ ->
            Home
            

type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SetLang String
    | ToggleTheme
    | GoTo Route
    | SetHover (Maybe Route)
    | EditorMsg Editor.Msg
    | EditorStackMsg EditorStack.Msg
    | InstructionsMsg Instructions.Msg
    | AboutMsg About.Msg
    | ViewportChanged Int Int
    | GotViewport (Result Dom.Error Dom.Viewport)
    | GotImportAutomatonFile Decode.Value
    | OpenFeedbackModal
    | CloseFeedbackModal
    | OpenSettingsModal
    | CloseSettingsModal
    | CloseWelcomeModal
    | SetStartPage String
    | UpdateFeedbackText String
    | UpdateFeedbackEmailInput String
    | UpdateFeedbackMailProvider String
    | NoOp




type alias Flags =
    { lang : String
    , theme : String
    , automatonSlots : String
    , startPage : Int
    }
    

port saveAutomatonSlots : String -> Cmd msg


port saveLang : String -> Cmd msg


port saveTheme : String -> Cmd msg


port saveStartPage : String -> Cmd msg


port exportAutomatonFile : Encode.Value -> Cmd msg


port importAutomatonFile : Int -> Cmd msg


port importAutomatonFileResult : (Decode.Value -> msg) -> Sub msg


main : Program Flags Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = LinkClicked
        , onUrlChange = UrlChanged
        }


init : Flags -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    let
        startPage =
            startPageFromInt flags.startPage

        parsedRoute =
            Route.parseHash url.fragment

        initialRoute =
            case url.fragment of
                Nothing ->
                    defaultRouteForStartPage startPage

                Just "" ->
                    defaultRouteForStartPage startPage

                Just "/" ->
                    defaultRouteForStartPage startPage

                _ ->
                    parsedRoute
    in
    ( { key = key
      , url = url
      , route = initialRoute
      , lang = langFromString flags.lang
      , theme = themeFromString flags.theme
      , scale = Large
      , editor = Editor.initWithSlots (Editor.decodeSaveSlots flags.automatonSlots)
      , editorStack = EditorStack.initWithSlots (EditorStack.decodeSaveSlots flags.automatonSlots)
      , instructions = Instructions.init
      , about = About.init
      , hover = Nothing
      , vpW = 1200
      , vpH = 800
      , feedbackModalOpen = False
      , feedbackText = ""
      , feedbackEmailInput = ""
      , feedbackMailProvider = GmailProvider
      , settingsModalOpen = False
      , welcomeModalOpen = flags.startPage == 0
      , startPage = startPage
      }
    , Task.attempt GotViewport Dom.getViewport
    )


formspreeEndpoint : String
formspreeEndpoint =
    "https://formspree.io/f/mjgejzrq"


defaultSenderEmail : String
defaultSenderEmail =
    "finiteautomatonsimulator@gmail.com"


googleFormUrl : String
googleFormUrl =
    "https://forms.gle/RekbknkXV3jQcfyy8"


currentFasJson : Model -> String
currentFasJson model =
    case model.route of
        EditorStack ->
            EditorStack.exportAutomatonJson model.editorStack

        _ ->
            Editor.exportAutomatonJson model.editor


currentRuntimeModelJson : Model -> String
currentRuntimeModelJson model =
    case model.route of
        EditorStack ->
            EditorStack.exportRuntimeSnapshotJson model.editorStack

        _ ->
            Editor.exportRuntimeSnapshotJson model.editor


indentBlock : String -> String
indentBlock raw =
    raw
        |> String.split "\n"
        |> List.map (\line -> "    " ++ line)
        |> String.join "\n"


doNotModifyBlock : Model -> String
doNotModifyBlock model =
    String.join "\n"
        [ "========================================"
        , t model.lang FeedbackDoNotModifyLabel
        , "========================================"
        , ""
        , "fas:"
        , indentBlock (currentFasJson model)
        , ""
        , "model:"
        , indentBlock (currentRuntimeModelJson model)
        ]


composeFeedbackMessage : Model -> String
composeFeedbackMessage model =
    let
        userMessage =
            String.trim model.feedbackText

        detailsBlock =
            if String.isEmpty userMessage then
                t model.lang FeedbackDescribeDetailsLabel ++ ":\n-"

            else
                t model.lang FeedbackDescribeDetailsLabel ++ ":\n" ++ userMessage
    in
    detailsBlock ++ "\n\n\n\n" ++ doNotModifyBlock model


feedbackWebMailLink : Model -> String
feedbackWebMailLink model =
    let
        to = Url.percentEncode defaultSenderEmail
        subject = Url.percentEncode "Feedback: Finite Automaton Simulator"
        body = Url.percentEncode (composeFeedbackMessage model)
    in
    case model.feedbackMailProvider of
        GmailProvider ->
            "https://mail.google.com/mail/?view=cm&fs=1&to=" ++ to ++ "&su=" ++ subject ++ "&body=" ++ body

        OutlookProvider ->
            "https://outlook.live.com/mail/0/deeplink/compose?to=" ++ to ++ "&subject=" ++ subject ++ "&body=" ++ body


exportFileName : Int -> String -> Maybe AutomatonType -> String
exportFileName slotId slotName maybeAutomatonType =
    let
        baseName =
            if String.isEmpty slotName then
                "slot-" ++ String.fromInt slotId

            else
                slotName

        suffix =
            case maybeAutomatonType of
                Just automatonType ->
                    "-" ++ typeToStorageLabel automatonType

                Nothing ->
                    ""
    in
    baseName ++ suffix


    
themeFromString : String -> Theme
themeFromString s =
    case String.toLower s of
        "dark" -> Dark
        "light" -> Light
        _ -> Dark


themeToString : Theme -> String
themeToString theme =
    case theme of
        Dark ->
            "dark"

        Light ->
            "light"


-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked req ->
            case req of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url, route = Route.parseHash url.fragment }, Cmd.none )

        SetLang s ->
            let
                nextLang =
                    langFromString s
            in
            ( { model | lang = nextLang }, saveLang (langToString nextLang) )

        ToggleTheme ->
            let
                nextTheme =
                    toggle model.theme
            in
            ( { model | theme = nextTheme }, saveTheme (themeToString nextTheme) )

        GoTo r ->
            ( model, Nav.pushUrl model.key (Route.toHash r) )

        SetHover maybeR ->
            ( { model | hover = maybeR }, Cmd.none )

        EditorMsg sub ->
            let
                ( subModel, subCmd ) =
                    Editor.update sub model.editor

                slotsChanged =
                    model.editor.saveSlots /= subModel.saveSlots

                persistCmd =
                    if slotsChanged then
                        saveAutomatonSlots (Editor.encodeSaveSlots subModel.saveSlots)

                    else
                        Cmd.none

                syncedEditorStack =
                    let
                        editorStackModel =
                            model.editorStack
                    in
                    if slotsChanged then
                        { editorStackModel | saveSlots = subModel.saveSlots }

                    else
                        editorStackModel

                maybeExportCmd =
                    case sub of
                        Editor.ExportSlot slotId ->
                            subModel.saveSlots
                                |> List.filter (\slot -> slot.id == slotId && not (String.isEmpty slot.automatonJson))
                                |> List.head
                                |> Maybe.map
                                    (\slot ->
                                        exportAutomatonFile
                                            (Encode.object
                                                [ ( "fileName", Encode.string (exportFileName slot.id slot.name slot.automatonType) )
                                                , ( "content", Encode.string slot.automatonJson )
                                                ]
                                            )
                                    )
                                |> Maybe.withDefault Cmd.none

                        Editor.ImportSlot slotId ->
                            importAutomatonFile slotId

                        _ ->
                            Cmd.none
            in
            ( { model | editor = subModel, editorStack = syncedEditorStack }, Cmd.batch [ Cmd.map EditorMsg subCmd, persistCmd, maybeExportCmd ] )

        EditorStackMsg sub ->
            let
                ( subModel, subCmd ) =
                    EditorStack.update sub model.editorStack

                slotsChanged =
                    model.editorStack.saveSlots /= subModel.saveSlots

                persistCmd =
                    if slotsChanged then
                        saveAutomatonSlots (EditorStack.encodeSaveSlots subModel.saveSlots)

                    else
                        Cmd.none

                syncedEditor =
                    let
                        editorModel =
                            model.editor
                    in
                    if slotsChanged then
                        { editorModel | saveSlots = subModel.saveSlots }

                    else
                        editorModel

                maybeExportCmd =
                    case sub of
                        EditorStack.ExportSlot slotId ->
                            subModel.saveSlots
                                |> List.filter (\slot -> slot.id == slotId && not (String.isEmpty slot.automatonJson))
                                |> List.head
                                |> Maybe.map
                                    (\slot ->
                                        exportAutomatonFile
                                            (Encode.object
                                                [ ( "fileName", Encode.string (exportFileName slot.id slot.name slot.automatonType) )
                                                , ( "content", Encode.string slot.automatonJson )
                                                ]
                                            )
                                    )
                                |> Maybe.withDefault Cmd.none

                        EditorStack.ImportSlot slotId ->
                            importAutomatonFile slotId

                        _ ->
                            Cmd.none
            in
            ( { model | editor = syncedEditor, editorStack = subModel }, Cmd.batch [ Cmd.map EditorStackMsg subCmd, persistCmd, maybeExportCmd ] )

        GotImportAutomatonFile value ->
            case Decode.decodeValue decodeImportFileResult value of
                Ok ( slotId, content ) ->
                    case model.route of
                        EditorStack ->
                            let
                                ( editorModel, editorCmd ) =
                                    EditorStack.update (EditorStack.ApplyImportedSlot slotId content) model.editorStack

                                persistCmd =
                                    if model.editorStack.saveSlots /= editorModel.saveSlots then
                                        saveAutomatonSlots (EditorStack.encodeSaveSlots editorModel.saveSlots)

                                    else
                                        Cmd.none

                                currentEditor =
                                    model.editor
                            in
                             ( { model | editor = { currentEditor | saveSlots = editorModel.saveSlots }, editorStack = editorModel }, Cmd.batch [ Cmd.map EditorStackMsg editorCmd, persistCmd ] )

                        _ ->
                            let
                                ( editorModel, editorCmd ) =
                                    Editor.update (Editor.ApplyImportedSlot slotId content) model.editor

                                persistCmd =
                                    if model.editor.saveSlots /= editorModel.saveSlots then
                                        saveAutomatonSlots (Editor.encodeSaveSlots editorModel.saveSlots)

                                    else
                                        Cmd.none

                                currentEditorStack =
                                    model.editorStack
                            in
                            ( { model | editor = editorModel, editorStack = { currentEditorStack | saveSlots = editorModel.saveSlots } }, Cmd.batch [ Cmd.map EditorMsg editorCmd, persistCmd ] )

                Err _ ->
                    case model.route of
                        EditorStack ->
                            let
                                ( editorModel, editorCmd ) =
                                    EditorStack.update EditorStack.ImportSlotFailed model.editorStack
                            in
                            ( { model | editorStack = editorModel }, Cmd.map EditorStackMsg editorCmd )

                        _ ->
                            let
                                ( editorModel, editorCmd ) =
                                    Editor.update Editor.ImportSlotFailed model.editor
                            in
                            ( { model | editor = editorModel }, Cmd.map EditorMsg editorCmd )

        InstructionsMsg sub ->
            let (subModel, subCmd) = Instructions.update sub model.instructions
            in ( { model | instructions = subModel }, Cmd.map InstructionsMsg subCmd )

        AboutMsg sub ->
            let (subModel, subCmd) = About.update sub model.about
            in ( { model | about = subModel }, Cmd.map AboutMsg subCmd )
        
        ViewportChanged w h ->
            let
                ( editorModel, editorCmd ) =
                    Editor.update (Editor.SetViewport w h) model.editor

                ( editorStackModel, editorStackCmd ) =
                    EditorStack.update (EditorStack.SetViewport w h) model.editorStack
            in
            ( { model | vpW = w, vpH = h, editor = editorModel, editorStack = editorStackModel }
            , Cmd.batch [ Cmd.map EditorMsg editorCmd, Cmd.map EditorStackMsg editorStackCmd ]
            )

        GotViewport (Ok vp) ->
            let
                w = round vp.viewport.width
                h = round vp.viewport.height
                ( editorModel, editorCmd ) =
                    Editor.update (Editor.SetViewport w h) model.editor

                ( editorStackModel, editorStackCmd ) =
                    EditorStack.update (EditorStack.SetViewport w h) model.editorStack
            in
            ( { model | vpW = w, vpH = h, editor = editorModel, editorStack = editorStackModel }
            , Cmd.batch [ Cmd.map EditorMsg editorCmd, Cmd.map EditorStackMsg editorStackCmd ]
            )

        GotViewport (Err _) ->
            ( model, Cmd.none )

        OpenFeedbackModal ->
            ( { model | feedbackModalOpen = True }, Cmd.none )

        CloseFeedbackModal ->
            ( { model | feedbackModalOpen = False }, Cmd.none )

        OpenSettingsModal ->
            ( { model | settingsModalOpen = True }, Cmd.none )

        CloseSettingsModal ->
            ( { model | settingsModalOpen = False }, Cmd.none )

        CloseWelcomeModal ->
            let
                normalizedStartPage =
                    case model.startPage of
                        StartPageWelcome ->
                            StartPageHome

                        _ ->
                            model.startPage
            in
            ( { model | welcomeModalOpen = False, startPage = normalizedStartPage }
            , saveStartPage (String.fromInt (startPageToInt normalizedStartPage))
            )

        SetStartPage value ->
            let
                nextStartPage =
                    startPageFromString value
            in
            ( { model | startPage = nextStartPage }
            , saveStartPage (String.fromInt (startPageToInt nextStartPage))
            )

        UpdateFeedbackText value ->
            ( { model | feedbackText = value }, Cmd.none )

        UpdateFeedbackEmailInput value ->
            ( { model | feedbackEmailInput = value }, Cmd.none )

        UpdateFeedbackMailProvider value ->
            ( { model | feedbackMailProvider = mailProviderFromString value }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )



subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onResize ViewportChanged
        , importAutomatonFileResult GotImportAutomatonFile
        ]


decodeImportFileResult : Decode.Decoder ( Int, String )
decodeImportFileResult =
    Decode.map2 Tuple.pair
        (Decode.field "slotId" Decode.int)
        (Decode.field "content" Decode.string)





-- VIEW


view : Model -> Browser.Document Msg
view model =
    let
        tk = tokens model.scale
    in
    { title = t model.lang AppTitle
    , body =
        [ div
            [ HA.style "background" (bgColor model.theme)
            , HA.style "color" (textColor model.theme)
            , HA.style "height" "100dvh"
            , HA.style "box-sizing" "border-box"
            , HA.style "display" "flex"
            , HA.style "flex-direction" "column"
            , HA.style "margin" "0"
            , HA.style "padding" (px tk.spacing.l)   -- было "16px"
            , HA.style "font-family" "Inter, Segoe UI, Arial, sans-serif"
            , HA.style "overflow" "hidden"
            ]
            [ topBar model
            , case model.route of
                Home ->
                    div
                        [ HA.style "flex" "1"
                        , HA.style "display" "flex"
                        , HA.style "flex-direction" "column"
                        , HA.style "justify-content" "center"
                        ]
                        [ homeView model ]

                AutomatonMenu ->
                    div
                        [ HA.style "flex" "1"
                        , HA.style "display" "flex"
                        , HA.style "flex-direction" "column"
                        , HA.style "justify-content" "center"
                        ]
                        [ automatonTypeHomeView model ]
                        
                Editor ->
                    div
                        [ HA.style "flex" "1"
                        , HA.style "min-height" "0"
                        , HA.style "overflow" "hidden"
                        ]
                        [ H.map EditorMsg
                            (Editor.view
                                { lang = model.lang
                                , theme = model.theme
                                , viewportWidth = model.vpW
                                , viewportHeight = model.vpH
                                }
                                model.editor
                            )
                        ]

                EditorStack ->
                    div
                        [ HA.style "flex" "1"
                        , HA.style "min-height" "0"
                        , HA.style "overflow" "hidden"
                        ]
                        [ H.map EditorStackMsg
                            (EditorStack.view
                                { lang = model.lang
                                , theme = model.theme
                                , viewportWidth = model.vpW
                                , viewportHeight = model.vpH
                                }
                                model.editorStack
                            )
                        ]

                Instructions ->
                    div
                        [ HA.style "flex" "1"
                        , HA.style "min-height" "0"
                        , HA.style "overflow" "hidden"
                        ]
                        [ H.map InstructionsMsg (Instructions.view { lang = model.lang, theme = model.theme } model.instructions) ]

                About ->
                    H.map AboutMsg (About.view { lang = model.lang, theme = model.theme } model.about)
            ]
        , feedbackButton model
        , feedbackModal model
        , settingsModal model
        , welcomeModal model
        ]
    }


feedbackButton : Model -> Html Msg
feedbackButton model =
    button
        [ onClick OpenFeedbackModal
        , HA.style "position" "fixed"
        , HA.style "right" "24px"
        , HA.style "bottom" "24px"
        , HA.style "width" "60px"
        , HA.style "height" "60px"
        , HA.style "border-radius" "9999px"
        , HA.style "border" "none"
        , HA.style "font-size" "28px"
        , HA.style "cursor" "pointer"
        , HA.style "background" (hoverBg model.theme)
        , HA.style "color" (textColor model.theme)
        , HA.style "box-shadow" "0 10px 28px rgba(0, 0, 0, 0.25)"
        , HA.style "z-index" "1100"
        , HA.attribute "aria-label" (t model.lang FeedbackButtonAria)
        ]
        [ text "✉" ]


feedbackModal : Model -> Html Msg
feedbackModal model =
    if not model.feedbackModalOpen then
        text ""

    else
        div
            [ HA.style "position" "fixed"
            , HA.style "inset" "0"
            , HA.style "background" "rgba(0, 0, 0, 0.55)"
            , HA.style "display" "flex"
            , HA.style "justify-content" "center"
            , HA.style "align-items" "center"
            , HA.style "z-index" "1200"
            , onClick CloseFeedbackModal
            ]
            [ div
                [ stopPropagationOn "click" (Decode.succeed ( NoOp, True ))
                , HA.style "width" "min(600px, 94vw)"
                , HA.style "background" (panelBg model.theme)
                , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                , HA.style "border-radius" "16px"
                , HA.style "padding" "16px"
                , HA.style "box-sizing" "border-box"
                , HA.style "display" "flex"
                , HA.style "flex-direction" "column"
                , HA.style "gap" "12px"
                ]
                [ h2 [ HA.style "margin" "0" ] [ text (t model.lang FeedbackModalTitle) ]
                , div
                    [ HA.style "border" ("1px solid " ++ panelBorder model.theme)
                    , HA.style "border-radius" "12px"
                    , HA.style "padding" "12px"
                    , HA.style "display" "flex"
                    , HA.style "flex-direction" "column"
                    , HA.style "gap" "8px"
                    ]
                    [ div [ HA.style "font-weight" "600" ] [ text (t model.lang FeedbackRecommendedTitle) ]
                    , div []
                        [ text (t model.lang FeedbackRecommendedMailLabel)
                        , text " "
                        , H.a
                            [ HA.href (feedbackWebMailLink model)
                            , HA.style "color" (textColor model.theme)
                            ]
                            [ text defaultSenderEmail ]
                        ]
                    , div
                        [ HA.style "display" "flex"
                        , HA.style "align-items" "center"
                        , HA.style "gap" "8px"
                        ]
                        [ text (t model.lang FeedbackMailProviderLabel)
                        , select
                            [ onInput UpdateFeedbackMailProvider
                            , HA.value (mailProviderToString model.feedbackMailProvider)
                            , HA.style "padding" "6px"
                            , HA.style "border-radius" "8px"
                            , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                            , HA.style "background" (interactiveBg model.theme)
                            , HA.style "color" (textColor model.theme)
                            ]
                            [ option [ HA.value "gmail" ] [ text (t model.lang FeedbackMailProviderGmail) ]
                            , option [ HA.value "outlook" ] [ text (t model.lang FeedbackMailProviderOutlook) ]
                            ]
                        ]
                    , div []
                        [ text (t model.lang FeedbackRecommendedGoogleFormLabel)
                        , text " "
                        , H.a
                            [ HA.href googleFormUrl
                            , HA.target "_blank"
                            , HA.rel "noopener noreferrer"
                            , HA.style "color" (textColor model.theme)
                            ]
                            [ text googleFormUrl ]
                        ]
                    ]
                , div
                    [ HA.style "height" "4px"
                    , HA.style "background" (hoverBorder model.theme)
                    , HA.style "border-radius" "999px"
                    , HA.style "margin" "10px 0 6px 0"
                    ]
                    []
                , div
                    [ HA.style "border" ("1px solid " ++ panelBorder model.theme)
                    , HA.style "border-left" ("6px solid " ++ hoverBorder model.theme)
                    , HA.style "border-radius" "12px"
                    , HA.style "padding" "12px 14px"
                    , HA.style "background" (interactiveBg model.theme)
                    , HA.style "font-weight" "700"
                    , HA.style "box-shadow" "0 6px 16px rgba(0,0,0,0.20)"
                    ]
                    [ text (t model.lang FeedbackFormSectionHint) ]
                , H.form
                    [ HA.action formspreeEndpoint
                    , HA.method "POST"
                    , HA.target "_blank"
                    , HA.style "display" "flex"
                    , HA.style "flex-direction" "column"
                    , HA.style "gap" "12px"
                    , HA.style "border" ("2px dashed " ++ hoverBorder model.theme)
                    , HA.style "border-radius" "12px"
                    , HA.style "padding" "14px"
                    , HA.style "background" (bgColor model.theme)
                    ]
                    [ H.input
                        [ HA.type_ "hidden"
                        , HA.name "message"
                        , HA.value (composeFeedbackMessage model)
                        ]
                        []
                    , H.input
                        [ HA.type_ "hidden"
                        , HA.name "email"
                        , HA.value
                            (if String.isEmpty (String.trim model.feedbackEmailInput) then
                                defaultSenderEmail
                             else
                                String.trim model.feedbackEmailInput
                            )
                        ]
                        []
                    , div
                        [ HA.style "display" "flex"
                        , HA.style "flex-direction" "column"
                        , HA.style "gap" "6px"
                        ]
                        [ H.label [] [ text (t model.lang FeedbackEmailLabel) ]
                        , H.input
                            [ HA.type_ "email"
                            , HA.name "contact_email"
                            , HA.value model.feedbackEmailInput
                            , onInput UpdateFeedbackEmailInput
                            , HA.placeholder (t model.lang FeedbackEmailPlaceholder)
                            , HA.style "width" "100%"
                            , HA.style "box-sizing" "border-box"
                            , HA.style "padding" "12px"
                            , HA.style "border-radius" "12px"
                            , HA.style "border" ("2px solid " ++ hoverBorder model.theme)
                            , HA.style "background" (panelBg model.theme)
                            , HA.style "color" (textColor model.theme)
                            , HA.style "box-shadow" "inset 0 0 0 1px rgba(255,255,255,0.08)"
                            ]
                            []
                        ]
                    , div
                        [ HA.style "display" "flex"
                        , HA.style "flex-direction" "column"
                        , HA.style "gap" "6px"
                        , HA.style "margin-top" "8px"
                        ]
                        [ div
                            [ HA.style "font-weight" "600" ]
                            [ text (t model.lang FeedbackDescribeDetailsLabel) ]
                        , H.label [] [ text (t model.lang FeedbackMessageLabel) ]
                        , textarea
                            [ HA.placeholder (t model.lang FeedbackModalPlaceholder)
                            , HA.value model.feedbackText
                            , onInput UpdateFeedbackText
                            , HA.name "message_user"
                            , HA.required True
                            , HA.rows 8
                            , HA.style "width" "100%"
                            , HA.style "box-sizing" "border-box"
                            , HA.style "resize" "vertical"
                            , HA.style "padding" "12px"
                            , HA.style "border-radius" "12px"
                            , HA.style "border" ("2px solid " ++ hoverBorder model.theme)
                            , HA.style "background" (panelBg model.theme)
                            , HA.style "color" (textColor model.theme)
                            , HA.style "box-shadow" "inset 0 0 0 1px rgba(255,255,255,0.08)"
                            ]
                            []
                        ]
                    , div
                        [ HA.style "display" "flex"
                        , HA.style "justify-content" "flex-end"
                        , HA.style "gap" "8px"
                        ]
                        [ button
                            [ onClick CloseFeedbackModal
                            , HA.type_ "button"
                            , HA.style "padding" "10px 14px"
                            , HA.style "border-radius" "10px"
                            , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                            , HA.style "background" "transparent"
                            , HA.style "color" (textColor model.theme)
                            , HA.style "cursor" "pointer"
                            ]
                            [ text (t model.lang EditorClose) ]
                        , button
                            [ HA.type_ "submit"
                            , HA.style "padding" "10px 14px"
                            , HA.style "border-radius" "10px"
                            , HA.style "border" "none"
                            , HA.style "background" (hoverBg model.theme)
                            , HA.style "color" (textColor model.theme)
                            , HA.style "cursor" "pointer"
                            , HA.disabled (String.isEmpty (String.trim model.feedbackText))
                            ]
                            [ text (t model.lang FeedbackSend) ]
                        ]
                    ]
                ]
            ]
            

startPageOptions : Model -> List (Html Msg)
startPageOptions model =
    [ option [ HA.value "1", HA.selected (model.startPage == StartPageHome) ] [ text (t model.lang StartPageHomeOption) ]
    , option [ HA.value "2", HA.selected (model.startPage == StartPageFinite) ] [ text (t model.lang StartPageFiniteOption) ]
    , option [ HA.value "3", HA.selected (model.startPage == StartPageStack) ] [ text (t model.lang StartPageStackOption) ]
    ]


settingsForm : Model -> Html Msg
settingsForm model =
    div
        [ HA.style "display" "flex"
        , HA.style "flex-direction" "column"
        , HA.style "gap" "14px"
        ]
        [ div
            [ HA.style "display" "flex"
            , HA.style "gap" "12px"
            , HA.style "align-items" "stretch"
            ]
            [ div
                [ HA.style "flex" "1"
                , HA.style "display" "flex"
                , HA.style "flex-direction" "column"
                , HA.style "gap" "6px"
                ]
                [ H.label [] [ text (t model.lang Language) ]
                , select
                    [ onInput SetLang
                    , HA.value (langToString model.lang)
                    , HA.style "padding" "8px"
                    , HA.style "border-radius" "10px"
                    , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                    , HA.style "background" (interactiveBg model.theme)
                    , HA.style "color" (textColor model.theme)
                    , HA.style "width" "100%"
                    ]
                    [ option [ HA.value "sk", HA.selected (model.lang == SK) ] [ text "SK" ]
                    , option [ HA.value "en", HA.selected (model.lang == EN) ] [ text "EN" ]
                    , option [ HA.value "ru", HA.selected (model.lang == RU) ] [ text "RU" ]
                    , option [ HA.value "ua", HA.selected (model.lang == UA) ] [ text "UA" ]
                    ]
                ]
            , div
                [ HA.style "flex" "2"
                , HA.style "display" "flex"
                , HA.style "flex-direction" "column"
                , HA.style "gap" "6px"
                ]
                [ H.label [] [ text (t model.lang ThemeLabel) ]
                , button
                    [ onClick ToggleTheme
                    , HA.style "padding" "10px"
                    , HA.style "border-radius" "10px"
                    , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                    , HA.style "background" (interactiveBg model.theme)
                    , HA.style "color" (textColor model.theme)
                    , HA.style "cursor" "pointer"
                    , HA.style "display" "flex"
                    , HA.style "justify-content" "space-between"
                    , HA.style "align-items" "center"
                    , HA.style "width" "100%"
                    ]
                    [ text <|
                        case model.theme of
                            Light ->
                                t model.lang ThemeLight

                            Dark ->
                                t model.lang ThemeDark
                    , H.span
                        [ HA.style "font-size" "18px"
                        , HA.style "line-height" "1"
                        , HA.style "color" <|
                            case model.theme of
                                Dark ->
                                    "#ffffff"

                                Light ->
                                    hoverBorder model.theme
                        ]
                        [ text <|
                            case model.theme of
                                Light ->
                                    "☀"

                                Dark ->
                                    "☾"
                        ]
                    ]
                ]
            ]
        , div
            [ HA.style "display" "flex"
            , HA.style "flex-direction" "column"
            , HA.style "gap" "6px"
            ]
            [ H.label [] [ text (t model.lang StartPageLabel) ]
            , select
                [ onInput SetStartPage
                , HA.value (String.fromInt (startPageToInt model.startPage))
                , HA.style "padding" "8px"
                , HA.style "border-radius" "10px"
                , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                , HA.style "background" (interactiveBg model.theme)
                , HA.style "color" (textColor model.theme)
                ]
                (startPageOptions model)
            ]
        ]


settingsModal : Model -> Html Msg
settingsModal model =
    if not model.settingsModalOpen then
        text ""

    else
        div
            [ HA.style "position" "fixed"
            , HA.style "inset" "0"
            , HA.style "background" "rgba(0, 0, 0, 0.55)"
            , HA.style "display" "flex"
            , HA.style "justify-content" "center"
            , HA.style "align-items" "center"
            , HA.style "z-index" "1200"
            , onClick CloseSettingsModal
            ]
            [ div
                [ stopPropagationOn "click" (Decode.succeed ( NoOp, True ))
                , HA.style "width" "min(520px, 92vw)"
                , HA.style "background" (panelBg model.theme)
                , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                , HA.style "border-radius" "16px"
                , HA.style "padding" "16px"
                , HA.style "display" "flex"
                , HA.style "flex-direction" "column"
                , HA.style "gap" "12px"
                ]
                [ h2 [ HA.style "margin" "0" ] [ text (t model.lang SettingsTitle) ]
                , settingsForm model
                , div
                    [ HA.style "display" "flex"
                    , HA.style "justify-content" "flex-end"
                    ]
                    [ button
                        [ onClick CloseSettingsModal
                        , HA.style "padding" "10px 14px"
                        , HA.style "border-radius" "10px"
                        , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                        , HA.style "background" (interactiveBg model.theme)
                        , HA.style "color" (textColor model.theme)
                        , HA.style "cursor" "pointer"
                        ]
                        [ text (t model.lang EditorClose) ]
                    ]
                ]
            ]


welcomeModal : Model -> Html Msg
welcomeModal model =
    if not model.welcomeModalOpen then
        text ""

    else
        div
            [ HA.style "position" "fixed"
            , HA.style "inset" "0"
            , HA.style "background" "rgba(0, 0, 0, 0.60)"
            , HA.style "display" "flex"
            , HA.style "justify-content" "center"
            , HA.style "align-items" "center"
            , HA.style "z-index" "1300"
            ]
            [ div
                [ HA.style "width" "min(620px, 94vw)"
                , HA.style "background" (panelBg model.theme)
                , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                , HA.style "border-radius" "16px"
                , HA.style "padding" "18px"
                , HA.style "display" "flex"
                , HA.style "flex-direction" "column"
                , HA.style "gap" "10px"
                ]
                [ h2 [ HA.style "margin" "0" ] [ text (t model.lang WelcomeTitle) ]
                , div [] [ text (t model.lang WelcomeSummary) ]
                , div [] [ text (t model.lang WelcomeTech) ]
                , div
                    [ HA.style "display" "flex"
                    , HA.style "gap" "12px"
                    , HA.style "align-items" "stretch"
                    ]
                    [ div
                        [ HA.style "flex" "1"
                        , HA.style "display" "flex"
                        , HA.style "flex-direction" "column"
                        , HA.style "gap" "6px"
                        ]
                        [ H.label [] [ text (t model.lang Language) ]
                        , select
                            [ onInput SetLang
                            , HA.value (langToString model.lang)
                            , HA.style "padding" "8px"
                            , HA.style "border-radius" "10px"
                            , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                            , HA.style "background" (interactiveBg model.theme)
                            , HA.style "color" (textColor model.theme)
                            , HA.style "width" "100%"
                            ]
                            [ option [ HA.value "sk", HA.selected (model.lang == SK) ] [ text "SK" ]
                            , option [ HA.value "en", HA.selected (model.lang == EN) ] [ text "EN" ]
                            , option [ HA.value "ru", HA.selected (model.lang == RU) ] [ text "RU" ]
                            , option [ HA.value "ua", HA.selected (model.lang == UA) ] [ text "UA" ]
                            ]
                        ]
                    , div
                        [ HA.style "flex" "2"
                        , HA.style "display" "flex"
                        , HA.style "flex-direction" "column"
                        , HA.style "gap" "6px"
                        ]
                        [ H.label [] [ text (t model.lang ThemeLabel) ]
                        , button
                            [ onClick ToggleTheme
                            , HA.style "padding" "10px"
                            , HA.style "border-radius" "10px"
                            , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                            , HA.style "background" (interactiveBg model.theme)
                            , HA.style "color" (textColor model.theme)
                            , HA.style "cursor" "pointer"
                            , HA.style "display" "flex"
                            , HA.style "justify-content" "space-between"
                            , HA.style "align-items" "center"
                            , HA.style "width" "100%"
                            ]
                            [ text <|
                                case model.theme of
                                    Light ->
                                        t model.lang ThemeLight

                                    Dark ->
                                        t model.lang ThemeDark
                            , H.span
                                [ HA.style "font-size" "18px"
                                , HA.style "line-height" "1"
                                , HA.style "color" <|
                                    case model.theme of
                                        Dark ->
                                            "#ffffff"

                                        Light ->
                                            hoverBorder model.theme
                                ]
                                [ text <|
                                    case model.theme of
                                        Light ->
                                            "☀"

                                        Dark ->
                                            "☾"
                                ]
                            ]
                        ]
                    ]
                , div
                    [ HA.style "display" "flex"
                    , HA.style "flex-direction" "column"
                    , HA.style "gap" "6px"
                    , HA.style "margin-top" "6px"
                    ]
                    [ H.label [] [ text (t model.lang StartPageLabel) ]
                    , select
                        [ onInput SetStartPage
                        , HA.value (String.fromInt (startPageToInt model.startPage))
                        , HA.style "padding" "8px"
                        , HA.style "border-radius" "10px"
                        , HA.style "border" ("1px solid " ++ panelBorder model.theme)
                        , HA.style "background" (interactiveBg model.theme)
                        , HA.style "color" (textColor model.theme)
                        ]
                        (startPageOptions model)
                    ]
                , div
                    [ HA.style "display" "flex"
                    , HA.style "justify-content" "flex-end"
                    ]
                    [ button
                        [ onClick CloseWelcomeModal
                        , HA.style "padding" "10px 14px"
                        , HA.style "border-radius" "10px"
                        , HA.style "border" "none"
                        , HA.style "background" (hoverBg model.theme)
                        , HA.style "color" (textColor model.theme)
                        , HA.style "cursor" "pointer"
                        ]
                        [ text (t model.lang WelcomeContinue) ]
                    ]
                ]
            ]


topBar : Model -> Html Msg
topBar model =
    let
        tk = tokens model.scale
        w = model.vpW
        onHome = model.route == Home

        c = control tk.defaults.control tk

        -- адаптивный min-width
        minW : Int
        minW =
            let
                kChars = tk.controlMinChars
                fromPadding = kChars * c.padH
                fromFont    = kChars * tk.font.base
            in
            if fromPadding > fromFont then fromPadding else fromFont

        baseControlStyles =
            [ HA.style "height" (px c.height)
            , HA.style "min-width" (px minW)
            , HA.style "padding" (px c.padV ++ " " ++ px c.padH)
            , HA.style "border-radius" (px tk.radius.s)
            , HA.style "border" (px (borderFor tk.border.default tk) ++ " solid " ++ interactiveBorder model.theme)
            , HA.style "background" (interactiveBg model.theme)
            , HA.style "color" (textColor model.theme)
            , HA.style "font-size" (px tk.font.base)
            , HA.style "line-height" tk.line.base
            , HA.style "transition"
                ("background " ++ tk.motion.primary ++ " " ++ tk.motion.easing
                 ++ ", border-color " ++ tk.motion.primary ++ " " ++ tk.motion.easing
                 ++ ", box-shadow "   ++ tk.motion.primary ++ " " ++ tk.motion.easing
                 ++ ", outline-color "++ tk.motion.primary ++ " " ++ tk.motion.easing
                )
            ]

        -- метка «домой» через I18n и брейкпоинты
        homeLabel : String
        homeLabel =
            if w < 500 then
                t model.lang BackHomeIconText   -- вторая строка: стрелка + текст
            else if w < 760 then
                t model.lang BackHomeIcon       -- в одну строку: только стрелка
            else
                t model.lang BackHomeIconText       -- в одну строку: только текст


        -- отдельные «вьюшки»
        viewHome : Html Msg
        viewHome =
            button (onClick (GoTo Home) :: baseControlStyles) [ text homeLabel ]

        viewEditorGoToStart : Html Msg
        viewEditorGoToStart =
            button
                (onClick
                    (if model.route == EditorStack then
                        EditorStackMsg EditorStack.CenterOnStartState

                     else
                        EditorMsg Editor.CenterOnStartState
                    )
                    :: baseControlStyles
                )
                [ text (t model.lang EditorGoToStartState) ]

        viewEditorSave : Html Msg
        viewEditorSave =
            button
                (onClick
                    (if model.route == EditorStack then
                        EditorStackMsg EditorStack.OpenSaveModal

                     else
                        EditorMsg Editor.OpenSaveModal
                    )
                    :: baseControlStyles
                )
                [ text (t model.lang EditorSave) ]
                
        viewSettings : Html Msg
        viewSettings =
            button (onClick OpenSettingsModal :: baseControlStyles)
                [ text (t model.lang SettingsButton) ]

        -- правая часть: всегда справа; при <500 две строки
        rightContainerAttrs : List (H.Attribute Msg)
        rightContainerAttrs =
            [ HA.style "display" "flex"
            , HA.style "flex-direction" (if w < 500 then "column" else "row")
            , HA.style "gap" (px tk.spacing.s)
            , HA.style "align-items" (if w < 500 then "flex-end" else "center")
            , HA.style "justify-content" "flex-end"
            ]

        -- первая строка справа: выделяем редакторские кнопки в отдельную группу
        firstRowRight : Html Msg
        firstRowRight =
            if w < 500 then
                div
                    [ HA.style "display" "flex"
                    , HA.style "gap" (px tk.spacing.s)
                    , HA.style "justify-content" "flex-end"
                    , HA.style "align-items" "center"
                    ]
                    [ viewSettings ]
            else
                let
                    editorActions =
                        if (model.route == Editor) || (model.route == EditorStack) then
                            [ viewEditorSave ]
                        else
                            []

                    commonActions =
                        (if onHome then [] else [ viewHome ]) ++ [ viewSettings ]
                in
                div
                    [ HA.style "display" "flex"
                    , HA.style "gap" (px tk.spacing.m)
                    , HA.style "justify-content" "flex-end"
                    , HA.style "align-items" "center"
                    ]
                    ((if List.isEmpty editorActions then
                        []
                      else
                        [ div
                            [ HA.style "display" "flex"
                            , HA.style "gap" (px tk.spacing.s)
                            , HA.style "padding-right" (px tk.spacing.m)
                            , HA.style "border-right" (px (borderFor tk.border.default tk) ++ " solid " ++ panelBorder model.theme)
                            ]
                            editorActions
                        ])
                        ++ [ div
                                [ HA.style "display" "flex"
                                , HA.style "gap" (px tk.spacing.s)
                                ]
                                commonActions
                           ]
                    )

        -- вторая строка справа: Домой ТОЛЬКО если <500 и не на главной
        secondRowRight : List (Html Msg)
        secondRowRight =
            if (w < 500) && (not onHome) then
                [ viewHome ]
            else
                []

    in
    div
        [ HA.style "display" "flex"
        , HA.style "justify-content" "space-between"
        , HA.style "align-items" "flex-start"
        , HA.style "gap" (px tk.spacing.s)
        , HA.style "margin-bottom" (px tk.spacing.s)
        ]
        [ -- слева: заголовок
          h1
            [ HA.style "margin" "0"
            , HA.style "font-size" (px tk.font.h1)
            ]
            [ text (t model.lang AppTitle) ]

          -- справа: кнопки (1 или 2 строки), ВСЕГДА прижаты вправо
        , div rightContainerAttrs <|
            firstRowRight
            :: (if List.isEmpty secondRowRight then
                    []
                else
                    [ div
                        [ HA.style "display" "flex"
                        , HA.style "gap" (px tk.spacing.s)
                        , HA.style "justify-content" "flex-end"
                        ]
                        secondRowRight
                    ]
            )
        ]






homeView : Model -> Html Msg
homeView model =
    let
        tk = tokens model.scale
    in
    div
        [ HA.style "display" "flex"
        , HA.style "flex-direction" "column"
        , HA.style "align-items" "center"
        , HA.style "gap" (px tk.spacing.m)
        ]
        [ h2
            [ HA.style "margin" "0"
            , HA.style "font-size" (px tk.font.h2)
            ]
            [ text (t model.lang Greeting) ]
        , div
            [ HA.style "display" "flex"
            , HA.style "flex-direction" "column"
            , HA.style "gap" (px tk.spacing.m)
            , HA.style "width" ("min(" ++ px tk.container.narrow ++ ", 100%)")
            , HA.style "padding" ("0 " ++ px tk.spacing.s)
            ]
            [ menuCard model (t model.lang MenuEditor) AutomatonMenu
            , menuCard model (t model.lang MenuInstructions) Instructions
            , menuCard model (t model.lang MenuAbout) About
            ]
        ]



automatonTypeHomeView : Model -> Html Msg
automatonTypeHomeView model =
    let
        tk = tokens model.scale
    in
    div
        [ HA.style "display" "flex"
        , HA.style "flex-direction" "column"
        , HA.style "align-items" "center"
        , HA.style "gap" (px tk.spacing.m)
        ]
        [ h2
            [ HA.style "margin" "0"
            , HA.style "font-size" (px tk.font.h2)
            ]
            [ text (t model.lang AutomatonMenuTitle) ]
        , div
            [ HA.style "display" "flex"
            , HA.style "flex-direction" "column"
            , HA.style "gap" (px tk.spacing.m)
            , HA.style "width" ("min(" ++ px tk.container.narrow ++ ", 100%)")
            , HA.style "padding" ("0 " ++ px tk.spacing.s)
            ]
            [ menuCard model (t model.lang MenuAutomatonFinite) Editor
            , menuCard model (t model.lang MenuAutomatonStack) EditorStack
            ]
        ]




        

menuCard : Model -> String -> Route -> Html Msg
menuCard model label routeTarget =
    let
        tk = tokens model.scale
        k  = card tk.defaults.card tk   -- ← CardSpec для карточек (S / M / L)

        isHovered =
            model.hover == Just routeTarget

        bg =
            if isHovered then
                hoverBg model.theme
            else
                panelBg model.theme

        borderC =
            if isHovered then
                hoverBorder model.theme
            else
                panelBorder model.theme

        shadow =
            if isHovered then
                hoverShadow model.theme
            else
                "none"

        outlineStyle =
            if isHovered then
                [ HA.style "outline" (px tk.outline.width ++ " solid " ++ focusOutline model.theme)
                , HA.style "outline-offset" (px tk.spacing.xs)
                ]
            else
                [ HA.style "outline" (px tk.outline.width ++ " solid transparent")
                , HA.style "outline-offset" (px tk.spacing.xs)
                ]

    in
    div
        ([ onClick (GoTo routeTarget)
         , onMouseEnter (SetHover (Just routeTarget))
         , onMouseLeave (SetHover Nothing)
         , HA.style "background" bg
         , HA.style "border"
             (px (borderFor tk.border.default tk) ++ " solid " ++ borderC)
         , HA.style "padding" (px k.padding)     -- ← токен
         , HA.style "border-radius" (px k.radius)
         , HA.style "cursor" "pointer"
         , HA.style "user-select" "none"
         , HA.style "display" "flex"
         , HA.style "justify-content" "center"
         , HA.style "align-items" "center"
         , HA.style "height" (px k.height)
         , HA.style "box-shadow" shadow
         , HA.style "transition"
            ("background " ++ tk.motion.primary ++ " " ++ tk.motion.easing
            ++ ", box-shadow " ++ tk.motion.primary ++ " " ++ tk.motion.easing
            ++ ", border-color " ++ tk.motion.primary ++ " " ++ tk.motion.easing
            ++ ", outline-color " ++ tk.motion.primary ++ " " ++ tk.motion.easing
            ++ ", outline " ++ tk.motion.primary ++ " " ++ tk.motion.easing
            )
         , HA.attribute "role" "button"
         , HA.tabindex 0
         ]
            ++ outlineStyle
        )
        [ h2
            [ HA.style "margin" "0"
            , HA.style "font-size" (px tk.component.menuCardTitle)
            ]
            [ text label ]
        ]


