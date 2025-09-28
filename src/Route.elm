module Route exposing (Route(..), parseHash, toHash)

type Route
    = Home
    | Editor
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
                "/editor" -> Editor
                "/instructions" -> Instructions
                "/about" -> About
                _ -> Home

toHash : Route -> String
toHash route =
    case route of
        Home -> "#/"
        Editor -> "#/editor"
        Instructions -> "#/instructions"
        About -> "#/about"
