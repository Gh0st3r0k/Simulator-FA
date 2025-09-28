module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Html as H exposing (Html, button, div, h1, h2, text)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (onClick)
import Url
import Route exposing (Route(..))
import I18n exposing (Lang(..), Key(..), t, toggleLang)
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
    }


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | ToggleLang
    | ToggleTheme
    | GoTo Route
    | EditorMsg Editor.Msg
    | InstructionsMsg Instructions.Msg
    | AboutMsg About.Msg


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = LinkClicked
        , onUrlChange = UrlChanged
        }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url key =
    ( { key = key
      , url = url
      , route = Route.parseHash url.fragment
      , lang = RU
      , theme = Light
      , editor = Editor.init
      , instructions = Instructions.init
      , about = About.init
      }
    , Cmd.none
    )


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

        ToggleLang ->
            ( { model | lang = toggleLang model.lang }, Cmd.none )

        ToggleTheme ->
            ( { model | theme = toggle model.theme }, Cmd.none )

        GoTo r ->
            ( model, Nav.pushUrl model.key (Route.toHash r) )

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
    div
        [ HA.style "display" "flex"
        , HA.style "justify-content" "space-between"
        , HA.style "align-items" "center"
        , HA.style "gap" "12px"
        , HA.style "margin-bottom" "16px"
        ]
        [ h1 [] [ text (t model.lang AppTitle) ]
        , div [ HA.style "display" "flex", HA.style "gap" "8px" ]
            [ button [ onClick ToggleLang ]
                [ text (case model.lang of 
                            RU -> "RU/EN"
                            EN -> "EN/RU"
                        )
                ]
            , button [ onClick ToggleTheme ]
                [ text (case model.theme of
                            Light -> t model.lang ThemeDark
                            Dark -> t model.lang ThemeLight
                        )
                ]
            , button [ onClick (GoTo Home) ] [ text (t model.lang BackHome) ]
            ]
        ]


homeView : Model -> Html Msg
homeView model =
    div []
        [ h2 [] [ text (t model.lang Greeting) ]
        , div [ HA.style "display" "grid", HA.style "gap" "12px", HA.style "grid-template-columns" "repeat(auto-fit, minmax(220px, 1fr))" ]
            [ menuCard model (t model.lang MenuEditor) (GoTo Editor)
            , menuCard model (t model.lang MenuInstructions) (GoTo Instructions)
            , menuCard model (t model.lang MenuAbout) (GoTo About)
            ]
        ]


menuCard : Model -> String -> Msg -> Html Msg
menuCard model label msg =
    div
        [ HA.style "background" (panelBg model.theme)
        , HA.style "border" ("1px solid " ++ panelBorder model.theme)
        , HA.style "padding" "16px"
        , HA.style "border-radius" "12px"
        ]
        [ h2 [] [ text label ]
        , button [ onClick msg, HA.style "margin-top" "8px" ] [ text "→" ]
        ]
