module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Html as H exposing (Html, button, div, h1, h2, text, select, option)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (onClick, onInput, onMouseEnter, onMouseLeave)
import Url
import Route exposing (Route(..))
import I18n exposing (Lang(..), Key(..), t, toggleLang, langFromString, langToString)
import Theme exposing (Theme(..), toggle, bgColor, textColor, panelBg, panelBorder)
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
    , editor : Editor.Model
    , instructions : Instructions.Model
    , about : About.Model
    , hover : Maybe Route
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


type alias Flags =
    { lang : String
    , theme : String
    }
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
      , editor = Editor.init
      , instructions = Instructions.init
      , about = About.init
      , hover = Nothing
      }
    , Cmd.none
    )


langFromString : String -> Lang
langFromString s =
    case String.toLower s of
        "sk" -> SK
        "ru" -> RU
        "en" -> EN
        _ -> SK

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
            let (subModel, subCmd) = Editor.update sub model.editor
            in ( { model | editor = subModel }, Cmd.map EditorMsg subCmd )

        InstructionsMsg sub ->
            let (subModel, subCmd) = Instructions.update sub model.instructions
            in ( { model | instructions = subModel }, Cmd.map InstructionsMsg subCmd )

        AboutMsg sub ->
            let (subModel, subCmd) = About.update sub model.about
            in ( { model | about = subModel }, Cmd.map AboutMsg subCmd )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
    { title = t model.lang AppTitle
    , body =
        [ div
            [ HA.style "background" (bgColor model.theme)
            , HA.style "color" (textColor model.theme)
            , HA.style "min-height" "100vh"
            , HA.style "margin" "0"
            , HA.style "padding" "16px"
            , HA.style "font-family" "Inter, Segoe UI, Arial, sans-serif"
            ]
            [ topBar model
            , case model.route of
                Home -> homeView model
                Editor -> H.map EditorMsg (Editor.view { lang = model.lang, theme = model.theme } model.editor)
                Instructions -> H.map InstructionsMsg (Instructions.view { lang = model.lang, theme = model.theme } model.instructions)
                About -> H.map AboutMsg (About.view { lang = model.lang, theme = model.theme } model.about)
            ]
        ]
    }


topBar : Model -> Html Msg
topBar model =
    let
        baseControlStyles =
            [ HA.style "height" "36px"
            , HA.style "min-width" "80px"
            , HA.style "padding" "6px 12px"
            , HA.style "border-radius" "8px"
            , HA.style "border" ("1px solid " ++ panelBorder model.theme)
            , HA.style "background" (panelBg model.theme)
            , HA.style "color" (textColor model.theme)
            , HA.style "font-size" "14px"
            , HA.style "line-height" "1.2"
            ]

        controls : List (Html Msg)
        controls =
            [ -- селект языка
              select
                (onInput SetLang :: HA.value (langToString model.lang) :: baseControlStyles)
                [ option [ HA.value "sk" ] [ text "SK" ]
                , option [ HA.value "en" ] [ text "EN" ]
                , option [ HA.value "ru" ] [ text "RU" ]
                ]

              -- кнопка темы
            , button
                (onClick ToggleTheme :: baseControlStyles)
                [ text <|
                    case model.theme of
                        Light -> t model.lang ThemeDark
                        Dark  -> t model.lang ThemeLight
                  ]
            ]
            ++ (if model.route /= Home then
                    -- кнопка "Домой" появляется только НЕ на главной
                    [ button
                        (onClick (GoTo Home) :: baseControlStyles)
                        [ text (t model.lang BackHome) ]
                    ]
                else
                    []
               )
    in
    div
        [ HA.style "display" "flex"
        , HA.style "justify-content" "space-between"
        , HA.style "align-items" "center"
        , HA.style "gap" "12px"
        , HA.style "margin-bottom" "16px"
        ]
        [ h1 [] [ text (t model.lang AppTitle) ]
        , div
            [ HA.style "display" "flex"
            , HA.style "gap" "8px"
            , HA.style "align-items" "center"
            ]
            controls
        ]






homeView : Model -> Html Msg
homeView model =
    div
        [ HA.style "min-height" "calc(100vh - 120px)"
        , HA.style "display" "flex"
        , HA.style "flex-direction" "column"
        , HA.style "justify-content" "center"
        , HA.style "align-items" "center"
        , HA.style "gap" "24px"
        ]
        [ h2 [] [ text (t model.lang Greeting) ]
        , div
            [ HA.style "display" "flex"
            , HA.style "flex-direction" "column"
            , HA.style "gap" "16px"
            , HA.style "width" "min(420px, 100%)"
            ]
            [ menuCard model (t model.lang MenuEditor) Editor
            , menuCard model (t model.lang MenuInstructions) Instructions
            , menuCard model (t model.lang MenuAbout) About
            ]
        ]



menuCard : Model -> String -> Route -> Html Msg
menuCard model label routeTarget =
    let
        isHovered =
            model.hover == Just routeTarget

        ( bg, borderC, shadow ) =
            if isHovered then
                case model.theme of
                    Light ->
                        -- заметнее в светлой теме
                        ( "#e8eefc"     -- был #f2f5ff → стало ярче
                        , "#7aa2ff"     -- рамка контрастнее
                        , "0 6px 18px rgba(0,0,0,0.12)"
                        )

                    Dark ->
                        ( "#2a2f3a"
                        , panelBorder model.theme
                        , "0 6px 18px rgba(0,0,0,0.35)"
                        )
            else
                ( panelBg model.theme
                , panelBorder model.theme
                , "none"
                )
    in
    div
        [ onClick (GoTo routeTarget)
        , onMouseEnter (SetHover (Just routeTarget))
        , onMouseLeave (SetHover Nothing)
        , HA.style "background" bg
        , HA.style "border" ("1px solid " ++ borderC)
        , HA.style "padding" "20px"
        , HA.style "border-radius" "14px"
        , HA.style "cursor" "pointer"
        , HA.style "user-select" "none"
        , HA.style "display" "flex"
        , HA.style "justify-content" "center"
        , HA.style "align-items" "center"
        , HA.style "height" "64px"
        , HA.style "box-shadow" shadow
        , HA.style "transition" "background 120ms ease, box-shadow 120ms ease, border-color 120ms ease"
        , HA.attribute "role" "button"
        , HA.tabindex 0
        ]
        [ h2 [ HA.style "margin" "0" ] [ text label ] ]

