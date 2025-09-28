module Pages.About exposing (Model, Msg(..), init, update, view)

import Html exposing (Html, div, h2, p, text)
import Html.Attributes as HA exposing (..)
import I18n exposing (Lang, Key(..), t)
import Theme exposing (Theme, panelBg, panelBorder, textColor)


type alias Model =
    {}


init : Model
init =
    {}


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update _ model =
    ( model, Cmd.none )


view : { lang : Lang, theme : Theme } -> Model -> Html Msg
view ctx _ =
    div
        [ HA.style "background" (panelBg ctx.theme)
        , HA.style "color" (textColor ctx.theme)
        , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
        , HA.style "padding" "16px"
        , HA.style "border-radius" "12px"
        ]
        [ h2 [] [ text (t ctx.lang AboutTitle) ]
        , p [] [ text (t ctx.lang AboutBody) ]
        ]
