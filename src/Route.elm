module Route exposing (Route(..), parseHash, toHash)

type Route
    = Home
    | AutomatonMenu
    | Editor
    | EditorStack
    | Instructions
    | About

parseHash : Maybe String -> Route
parseHash mfrag =
    case mfrag of
        Nothing ->
            Home

        Just frag ->
            case frag of
                "" -> Home
                "/" -> Home
                "/automaton" -> AutomatonMenu
                "/editor" -> Editor
                "/editor-stack" -> EditorStack
                "/instructions" -> Instructions
                "/about" -> About
                _ -> Home

toHash : Route -> String
toHash route =
    case route of
        Home -> "#/"
        AutomatonMenu -> "#/automaton"
        Editor -> "#/editor"
        EditorStack -> "#/editor-stack"
        Instructions -> "#/instructions"
        About -> "#/about"