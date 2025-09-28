module I18n exposing (Lang(..), Key(..), t, toggleLang)

type Lang
    = RU
    | EN

toggleLang : Lang -> Lang
toggleLang lang =
    case lang of
        RU -> EN
        EN -> RU

type Key
    = AppTitle
    | MenuEditor
    | MenuInstructions
    | MenuAbout
    | Greeting
    | ThemeLight
    | ThemeDark
    | Language
    | BackHome
    | InstructionsTitle
    | InstructionsBody
    | AboutTitle
    | AboutBody

t : Lang -> Key -> String
t lang key =
    case ( lang, key ) of
        ( RU, AppTitle ) -> "Симулятор конечного автомата (Elm)"
        ( EN, AppTitle ) -> "Finite Automaton Simulator (Elm)"

        ( RU, MenuEditor ) -> "Конечный автомат"
        ( EN, MenuEditor ) -> "Automaton"

        ( RU, MenuInstructions ) -> "Инструкции"
        ( EN, MenuInstructions ) -> "Instructions"

        ( RU, MenuAbout ) -> "О сайте"
        ( EN, MenuAbout ) -> "About"

        ( RU, Greeting ) -> "Выберите раздел ниже"
        ( EN, Greeting ) -> "Choose a section below"

        ( RU, ThemeLight ) -> "Светлая"
        ( EN, ThemeLight ) -> "Light"

        ( RU, ThemeDark ) -> "Тёмная"
        ( EN, ThemeDark ) -> "Dark"

        ( RU, Language ) -> "Язык"
        ( EN, Language ) -> "Language"

        ( RU, BackHome ) -> "← На главную"
        ( EN, BackHome ) -> "← Home"

        ( RU, InstructionsTitle ) -> "Инструкции по использованию"
        ( EN, InstructionsTitle ) -> "Usage Instructions"

        ( RU, InstructionsBody ) ->
            String.join "\n"
                [ "• Клик по пустому месту — добавить состояние."
                , "• Клик по состоянию — выделить; перетаскивайте для перемещения."
                , "• Двойной клик — переключить принимающее состояние."
                , "• Импорт/Экспорт JSON — справа."
                ]

        ( EN, InstructionsBody ) ->
            String.join "\n"
                [ "• Click empty space to create a state."
                , "• Click state to select; drag to move."
                , "• Double-click toggles accepting."
                , "• Import/Export JSON on the right."
                ]

        ( RU, AboutTitle ) -> "О проекте"
        ( EN, AboutTitle ) -> "About the Project"

        ( RU, AboutBody ) -> "Учебный проект для FIIT STU: визуальный редактор и симулятор конечных автоматов на Elm."
        ( EN, AboutBody ) -> "Educational project: a visual editor and simulator for finite automata in Elm."
