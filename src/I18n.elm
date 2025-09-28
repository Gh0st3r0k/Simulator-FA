module I18n exposing (Lang(..), Key(..), t, toggleLang)

type Lang
    = RU
    | EN
    | SK

toggleLang : Lang -> Lang
toggleLang lang =
    case lang of
        SK -> EN
        EN -> RU
        RU -> SK

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
        ( SK, AppTitle ) -> "Simulátor konečného automatu (Elm)"

        ( RU, MenuEditor ) -> "Конечный автомат"
        ( EN, MenuEditor ) -> "Automaton"
        ( SK, MenuEditor ) -> "Automat"

        ( RU, MenuInstructions ) -> "Инструкции"
        ( EN, MenuInstructions ) -> "Instructions"
        ( SK, MenuInstructions ) -> "Návod"

        ( RU, MenuAbout ) -> "О сайте"
        ( EN, MenuAbout ) -> "About"
        ( SK, MenuAbout ) -> "O projekte"

        ( RU, Greeting ) -> "Выберите раздел ниже"
        ( EN, Greeting ) -> "Choose a section below"
        ( SK, Greeting ) -> "Vyberte sekciu nižšie"

        ( RU, ThemeLight ) -> "Светлая"
        ( EN, ThemeLight ) -> "Light"
        ( SK, ThemeLight ) -> "Svetlá"

        ( RU, ThemeDark ) -> "Тёмная"
        ( EN, ThemeDark ) -> "Dark"
        ( SK, ThemeDark ) -> "Tmavá"

        ( RU, Language ) -> "Язык"
        ( EN, Language ) -> "Language"
        ( SK, Language ) -> "Jazyk"

        ( RU, BackHome ) -> "← На главную"
        ( EN, BackHome ) -> "← Home"
        ( SK, BackHome ) -> "← Domov"

        ( RU, InstructionsTitle ) -> "Инструкции по использованию"
        ( EN, InstructionsTitle ) -> "Usage Instructions"
        ( SK, InstructionsTitle ) -> "Návod na použitie"

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

        ( SK, InstructionsBody ) ->
            String.join "\n"
                [ "• Kliknutie na prázdne miesto pridá stav."
                , "• Kliknutie na stav ho vyberie; potiahnutím ho presuniete."
                , "• Dvojklik prepína akceptujúci stav."
                , "• Import/Export JSON vpravo."
                ]

        ( RU, AboutTitle ) -> "О проекте"
        ( EN, AboutTitle ) -> "About the Project"
        ( SK, AboutTitle ) -> "O projekte"

        ( RU, AboutBody ) -> "Учебный проект для FIIT STU: визуальный редактор и симулятор конечных автоматов на Elm."
        ( EN, AboutBody ) -> "Educational project: a visual editor and simulator for finite automata in Elm."
        ( SK, AboutBody ) -> "Vzdelávací projekt: vizuálny editor a simulátor konečných automatov v Elme."
