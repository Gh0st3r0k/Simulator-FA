port module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Browser.Events
import Browser.Dom as Dom
import Task
import Html as H exposing (Html, button, div, h1, h2, text, select, option)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (onClick, onInput, onMouseEnter, onMouseLeave)
import Url
import Route exposing (Route(..))
import I18n exposing (Lang(..), Key(..), t, toggleLang, langFromString, langToString)
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
        , Tokens
        , tokens
        , control
        , card
        , borderFor
        , px
        )
import Pages.Editor as Editor
import Pages.Instructions as Instructions
import Pages.About as About


-- MODEL

type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , route : Route
    , lang : Lang
    , theme : Theme
    , scale : Scale
    , editor : Editor.Model
    , instructions : Instructions.Model
    , about : About.Model
    , hover : Maybe Route
    , vpW : Int
    , vpH : Int
    }


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SetLang String
    | ToggleTheme
    | GoTo Route
    | SetHover (Maybe Route)
    | EditorMsg Editor.Msg
    | InstructionsMsg Instructions.Msg
    | AboutMsg About.Msg
    | ViewportChanged Int Int
    | GotViewport (Result Dom.Error Dom.Viewport)




type alias Flags =
    { lang : String
    , theme : String
    , automatonSlots : String
    }
    

port saveAutomatonSlots : String -> Cmd msg


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
    ( { key = key
      , url = url
      , route = Route.parseHash url.fragment
      , lang = langFromString flags.lang
      , theme = themeFromString flags.theme
      , scale = Large
      , editor = Editor.initWithSlots (Editor.decodeSaveSlots flags.automatonSlots)
      , instructions = Instructions.init
      , about = About.init
      , hover = Nothing
      , vpW = 1200
      , vpH = 800
      }
    , Task.attempt GotViewport Dom.getViewport
    )





themeFromString : String -> Theme
themeFromString s =
    case String.toLower s of
        "dark" -> Dark
        "light" -> Light
        _ -> Dark


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
            ( { model | lang = langFromString s }, Cmd.none )

        ToggleTheme ->
            ( { model | theme = toggle model.theme }, Cmd.none )

        GoTo r ->
            ( model, Nav.pushUrl model.key (Route.toHash r) )

        SetHover maybeR ->
            ( { model | hover = maybeR }, Cmd.none )

        EditorMsg sub ->
            let
                ( subModel, subCmd ) =
                    Editor.update sub model.editor

                persistCmd =
                    if model.editor.saveSlots /= subModel.saveSlots then
                        saveAutomatonSlots (Editor.encodeSaveSlots subModel.saveSlots)

                    else
                        Cmd.none
            in
            ( { model | editor = subModel }, Cmd.batch [ Cmd.map EditorMsg subCmd, persistCmd ] )

        InstructionsMsg sub ->
            let (subModel, subCmd) = Instructions.update sub model.instructions
            in ( { model | instructions = subModel }, Cmd.map InstructionsMsg subCmd )

        AboutMsg sub ->
            let (subModel, subCmd) = About.update sub model.about
            in ( { model | about = subModel }, Cmd.map AboutMsg subCmd )
        
        ViewportChanged w h ->
            ( { model | vpW = w, vpH = h }, Cmd.none )

        GotViewport (Ok vp) ->
            let
                w = round vp.viewport.width
                h = round vp.viewport.height
            in
            ( { model | vpW = w, vpH = h }, Cmd.none )

        GotViewport (Err _) ->
            ( model, Cmd.none )



subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onResize ViewportChanged





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
            , HA.style "min-height" "100dvh"
            , HA.style "box-sizing" "border-box"
            , HA.style "display" "flex"
            , HA.style "flex-direction" "column"
            , HA.style "margin" "0"
            , HA.style "padding" (px tk.spacing.l)   -- было "16px"
            , HA.style "font-family" "Inter, Segoe UI, Arial, sans-serif"
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

                Editor ->
                    H.map EditorMsg (Editor.view { lang = model.lang, theme = model.theme } model.editor)

                Instructions ->
                    H.map InstructionsMsg (Instructions.view { lang = model.lang, theme = model.theme } model.instructions)

                About ->
                    H.map AboutMsg (About.view { lang = model.lang, theme = model.theme } model.about)
            ]
        ]
    }


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

        viewLang : Html Msg
        viewLang =
            select
                (onInput SetLang :: HA.value (langToString model.lang) :: baseControlStyles)
                [ option [ HA.value "sk" ] [ text "SK" ]
                , option [ HA.value "en" ] [ text "EN" ]
                , option [ HA.value "ru" ] [ text "RU" ]
                , option [ HA.value "ua" ] [ text "UA" ]
                ]

        viewTheme : Html Msg
        viewTheme =
            button (onClick ToggleTheme :: baseControlStyles)
                [ text <|
                    case model.theme of
                        Light -> t model.lang ThemeDark
                        Dark  -> t model.lang ThemeLight
                ]

        -- правая часть: всегда справа; при <500 две строки
        rightContainerAttrs : List (H.Attribute Msg)
        rightContainerAttrs =
            [ HA.style "display" "flex"
            , HA.style "flex-direction" (if w < 500 then "column" else "row")
            , HA.style "gap" (px tk.spacing.s)
            , HA.style "align-items" (if w < 500 then "flex-end" else "center")
            , HA.style "justify-content" "flex-end"
            ]

        -- первая строка справа: Язык + Тема (+ Домой только если >=500)
        firstRowRight : List (Html Msg)
        firstRowRight =
            if w < 500 then
                [ viewLang, viewTheme ]
            else
                (if onHome then [] else [ viewHome ]) ++ [ viewLang, viewTheme ]

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
            div
                [ HA.style "display" "flex"
                , HA.style "gap" (px tk.spacing.s)
                , HA.style "justify-content" "flex-end"
                , HA.style "align-items" "center"
                ]
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
            [ menuCard model (t model.lang MenuEditor) Editor
            , menuCard model (t model.lang MenuInstructions) Instructions
            , menuCard model (t model.lang MenuAbout) About
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


