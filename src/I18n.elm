module I18n exposing (Lang(..), Key(..), t, toggleLang, langFromString, langToString)
import String exposing (toLower)


type Lang
    = RU
    | EN
    | SK
    | UA

toggleLang : Lang -> Lang
toggleLang lang =
    case lang of
        SK -> EN
        EN -> RU
        RU -> UA
        UA -> SK

langToString : Lang -> String
langToString l =
    case l of
        SK -> "sk"
        EN -> "en"
        RU -> "ru"
        UA -> "ua"

langFromString : String -> Lang
langFromString s =
    case toLower s of
        "sk" -> SK
        "ru" -> RU
        "en" -> EN
        "ua" -> UA
        _ -> SK


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
        ( UA, AppTitle ) -> "Симулятор кінцевого автомата (Elm)"

        ( RU, MenuEditor ) -> "Конечный автомат"
        ( EN, MenuEditor ) -> "Automaton"
        ( SK, MenuEditor ) -> "Automat"
        ( UA, MenuEditor ) -> "Кінцевий автомат"

        ( RU, MenuInstructions ) -> "Инструкции"
        ( EN, MenuInstructions ) -> "Instructions"
        ( SK, MenuInstructions ) -> "Návod"
        ( UA, MenuInstructions ) -> "Інструкції"

        ( RU, MenuAbout ) -> "О сайте"
        ( EN, MenuAbout ) -> "About"
        ( SK, MenuAbout ) -> "O projekte"
        ( UA, MenuAbout ) -> "Про сайт"

        ( RU, Greeting ) -> "Выберите раздел ниже"
        ( EN, Greeting ) -> "Choose a section below"
        ( SK, Greeting ) -> "Vyberte sekciu nižšie"
        ( UA, Greeting ) -> "Оберіть розділ нижче"

        ( RU, ThemeLight ) -> "Светлая"
        ( EN, ThemeLight ) -> "Light"
        ( SK, ThemeLight ) -> "Svetlá"
        ( UA, ThemeLight ) -> "Світла"

        ( RU, ThemeDark ) -> "Тёмная"
        ( EN, ThemeDark ) -> "Dark"
        ( SK, ThemeDark ) -> "Tmavá"
        ( UA, ThemeDark ) -> "Темна"

        ( RU, Language ) -> "Язык"
        ( EN, Language ) -> "Language"
        ( SK, Language ) -> "Jazyk"
        ( UA, Language ) -> "Мова"

        ( RU, BackHome ) -> "← На главную"
        ( EN, BackHome ) -> "← Home"
        ( SK, BackHome ) -> "← Domov"
        ( UA, BackHome ) -> "← На головну"

        ( RU, InstructionsTitle ) -> "Инструкции по использованию"
        ( EN, InstructionsTitle ) -> "Usage Instructions"
        ( SK, InstructionsTitle ) -> "Návod na použitie"
        ( UA, InstructionsTitle ) -> "Інструкції з використання"

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
        
        ( UA, InstructionsBody ) ->
            String.join "\n"
                [ "• Клік по порожньому місцю — додати стан."
                , "• Клік по стану — виділити; перетягуйте для переміщення."
                , "• Подвійний клік — переключити приймаючий стан."
                , "• Імпорт/Експорт JSON — справа."
                ]

        ( RU, AboutTitle ) -> "О проекте"
        ( EN, AboutTitle ) -> "About the Project"
        ( SK, AboutTitle ) -> "O projekte"
        ( UA, AboutTitle ) -> "Про проект"

        ( RU, AboutBody ) -> "Учебный проект для FIIT STU: визуальный редактор и симулятор конечных автоматов на Elm."
        ( EN, AboutBody ) -> "Educational project: a visual editor and simulator for finite automata in Elm."
        ( SK, AboutBody ) -> "Vzdelávací projekt: vizuálny editor a simulátor konečných automatov v Elme."
        ( UA, AboutBody ) -> "Навчальний проєкт для FIIT STU: візуальний редактор і симулятор кінцевих автоматів на Elm."
