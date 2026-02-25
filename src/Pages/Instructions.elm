module Pages.Instructions exposing (Model, Msg(..), init, update, view)

import Char
import Html exposing (Html, div, h2, text)
import Html.Attributes as HA exposing (..)
import I18n exposing (Lang, Key(..), t)
import String
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
    let
        instructionLines =
            String.lines (t ctx.lang InstructionsBody)
    in
    div
        [ class "responsive-block"
        , HA.style "margin-top" "0"
        , HA.style "background" (panelBg ctx.theme)
        , HA.style "color" (textColor ctx.theme)
        , HA.style "border" ("1px solid " ++ panelBorder ctx.theme)
        , HA.style "padding" "16px"
        , HA.style "border-radius" "12px"
        , HA.style "height" "100%"
        , HA.style "box-sizing" "border-box"
        , HA.style "display" "flex"
        , HA.style "flex-direction" "column"
        ]
        [ h2 [] [ text (t ctx.lang InstructionsTitle) ]
        , div
            [ HA.style "line-height" "1.65"
            , HA.style "background" "rgba(127, 127, 127, 0.08)"
            , HA.style "border" "1px solid rgba(127, 127, 127, 0.25)"
            , HA.style "border-radius" "10px"
            , HA.style "padding" "14px"
            , HA.style "flex" "1"
            , HA.style "min-height" "0"
            , HA.style "overflow-y" "auto"
            , HA.style "overflow-x" "hidden"
            ]
            (List.map viewInstructionLine instructionLines)
        ]


viewInstructionLine : String -> Html Msg
viewInstructionLine line =
    if String.isEmpty line then
        div [ HA.style "height" "8px" ] []

    else if isSectionHeader line then
        div
            [ HA.style "font-weight" "700"
            , HA.style "margin" "10px 0 6px"
            , HA.style "font-size" "1.02rem"
            ]
            [ text line ]

    else if String.startsWith "• " line then
        div
            [ HA.style "padding-left" "10px"
            , HA.style "margin" "4px 0"
            ]
            [ text line ]

    else
        div [] [ text line ]


isSectionHeader : String -> Bool
isSectionHeader line =
    case String.uncons line of
        Just ( firstChar, rest ) ->
            Char.isDigit firstChar && String.startsWith ") " rest

        Nothing ->
            False