module AutomatonFormat exposing (AutomatonType(..), decodeAutomatonDocument, decodeAutomatonType, encodeAutomatonDocument, encodeAutomatonType, slotTypeMatches, typeToStorageLabel)

import Json.Decode as Decode
import Json.Encode as Encode


type AutomatonType
    = FiniteAutomaton
    | StackAutomaton


encodeAutomatonType : AutomatonType -> Encode.Value
encodeAutomatonType automatonType =
    Encode.int <|
        case automatonType of
            FiniteAutomaton ->
                1

            StackAutomaton ->
                2


decodeAutomatonType : Decode.Decoder AutomatonType
decodeAutomatonType =
    Decode.int
        |> Decode.andThen
            (\rawType ->
                case rawType of
                    1 ->
                        Decode.succeed FiniteAutomaton

                    2 ->
                        Decode.succeed StackAutomaton

                    _ ->
                        Decode.fail "unknown-automaton-type"
            )


typeToStorageLabel : AutomatonType -> String
typeToStorageLabel automatonType =
    case automatonType of
        FiniteAutomaton ->
            "finite"

        StackAutomaton ->
            "stack"


encodeAutomatonDocument : AutomatonType -> Encode.Value -> Encode.Value
encodeAutomatonDocument automatonType automatonValue =
    Encode.object
        [ ( "format", Encode.string "fas" )
        , ( "version", Encode.int 2 )
        , ( "automatonType", encodeAutomatonType automatonType )
        , ( "automaton", automatonValue )
        ]


decodeAutomatonDocument : AutomatonType -> Decode.Decoder automaton -> Decode.Decoder { automatonType : AutomatonType, automaton : automaton }
decodeAutomatonDocument legacyType automatonDecoder =
    Decode.oneOf
        [ Decode.map2
            (\automatonType automaton ->
                { automatonType = automatonType
                , automaton = automaton
                }
            )
            (Decode.field "automatonType" decodeAutomatonType)
            (Decode.field "automaton" automatonDecoder)
        , Decode.map
            (\automaton ->
                { automatonType = legacyType
                , automaton = automaton
                }
            )
            automatonDecoder
        ]


slotTypeMatches : AutomatonType -> Maybe AutomatonType -> Bool
slotTypeMatches expected maybeActual =
    case maybeActual of
        Nothing ->
            True

        Just actual ->
            actual == expected