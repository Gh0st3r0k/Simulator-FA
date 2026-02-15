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
    | EditorTitle
    | EditorType
    | EditorAutomatonDeterministic
    | EditorAutomatonNonDeterministic
    | EditorTransitionFunction
    | EditorImport
    | EditorExport
    | EditorSave
    | EditorSaveModalTitle
    | EditorSaveToSlot
    | EditorLoadFromSlot
    | EditorDeleteFromSlot
    | EditorRenameSlot
    | EditorSlot
    | EditorSlotEmpty
    | EditorClose
    | EditorStateName
    | EditorStateNameUniqueError
    | EditorMode
    | EditorModeAddState
    | EditorModeAddTransition
    | EditorModeMoveState
    | EditorModeConfigureTransition
    | EditorTransitions
    | EditorTransitionLabel
    | EditorTransitionSelectStart
    | EditorTransitionSelectForEdit
    | EditorTransitionFrom
    | EditorSelected
    | EditorSelectedNone
    | EditorSelectedNotFound
    | EditorSelectedState
    | EditorSelectedPos
    | EditorSelectedAccepting
    | EditorSelectedStart
    | EditorYes
    | EditorNo
    | EditorDeleteState
    | EditorSelectedTransition
    | EditorDeleteTransition
    | EditorUnsetStart
    | EditorMakeStart
    | EditorUnsetAccepting
    | EditorMakeAccepting
    | EditorSimulation
    | EditorSimulationInput
    | EditorSimulationDelay
    | EditorSimulationStart
    | EditorSimulationStop
    | EditorSimulationRunning
    | EditorSimulationSuccess
    | EditorSimulationRejected
    | EditorSimulationDeadEnd
    | EditorSimulationMissingStart
    | BackHomeIcon
    | BackHomeText
    | BackHomeIconText


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


        ( RU, EditorTitle ) -> "Редактор"
        ( EN, EditorTitle ) -> "Editor"
        ( SK, EditorTitle ) -> "Editor"
        ( UA, EditorTitle ) -> "Редактор"

        ( RU, EditorType ) -> "Тип"
        ( EN, EditorType ) -> "Type"
        ( SK, EditorType ) -> "Typ"
        ( UA, EditorType ) -> "Тип"

        ( RU, EditorAutomatonDeterministic ) -> "Детерминированный автомат"
        ( EN, EditorAutomatonDeterministic ) -> "Deterministic automaton"
        ( SK, EditorAutomatonDeterministic ) -> "Deterministický automat"
        ( UA, EditorAutomatonDeterministic ) -> "Детермінований автомат"

        ( RU, EditorAutomatonNonDeterministic ) -> "Недетерминированный автомат"
        ( EN, EditorAutomatonNonDeterministic ) -> "Non-deterministic automaton"
        ( SK, EditorAutomatonNonDeterministic ) -> "Nedeterministický automat"
        ( UA, EditorAutomatonNonDeterministic ) -> "Недетермінований автомат"

        ( RU, EditorTransitionFunction ) -> "Функция переходов"
        ( EN, EditorTransitionFunction ) -> "Transition function"
        ( SK, EditorTransitionFunction ) -> "Prechodová funkcia"
        ( UA, EditorTransitionFunction ) -> "Функція переходів"

        ( RU, EditorImport ) -> "Импорт"
        ( EN, EditorImport ) -> "Import"
        ( SK, EditorImport ) -> "Import"
        ( UA, EditorImport ) -> "Імпорт"

        ( RU, EditorExport ) -> "Экспорт"
        ( EN, EditorExport ) -> "Export"
        ( SK, EditorExport ) -> "Export"
        ( UA, EditorExport ) -> "Експорт"

        ( RU, EditorSave ) -> "Сохранение"
        ( EN, EditorSave ) -> "Save"
        ( SK, EditorSave ) -> "Uložiť"
        ( UA, EditorSave ) -> "Зберегти"

        ( RU, EditorSaveModalTitle ) -> "Слоты сохранения"
        ( EN, EditorSaveModalTitle ) -> "Save slots"
        ( SK, EditorSaveModalTitle ) -> "Ukladacie sloty"
        ( UA, EditorSaveModalTitle ) -> "Слоти збереження"

        ( RU, EditorSaveToSlot ) -> "Сохранить текущий"
        ( EN, EditorSaveToSlot ) -> "Save current"
        ( SK, EditorSaveToSlot ) -> "Uložiť aktuálny"
        ( UA, EditorSaveToSlot ) -> "Зберегти поточний"

        ( RU, EditorLoadFromSlot ) -> "Загрузить из слота"
        ( EN, EditorLoadFromSlot ) -> "Load from slot"
        ( SK, EditorLoadFromSlot ) -> "Načítať zo slotu"
        ( UA, EditorLoadFromSlot ) -> "Завантажити зі слота"

        ( RU, EditorDeleteFromSlot ) -> "Удалить из слота"
        ( EN, EditorDeleteFromSlot ) -> "Delete from slot"
        ( SK, EditorDeleteFromSlot ) -> "Vymazať zo slotu"
        ( UA, EditorDeleteFromSlot ) -> "Видалити зі слота"

        ( RU, EditorRenameSlot ) -> "Переименовать"
        ( EN, EditorRenameSlot ) -> "Rename"
        ( SK, EditorRenameSlot ) -> "Premenovať"
        ( UA, EditorRenameSlot ) -> "Перейменувати"

        ( RU, EditorSlot ) -> "Ячейка"
        ( EN, EditorSlot ) -> "Slot"
        ( SK, EditorSlot ) -> "Slot"
        ( UA, EditorSlot ) -> "Комірка"

        ( RU, EditorSlotEmpty ) -> "пусто"
        ( EN, EditorSlotEmpty ) -> "empty"
        ( SK, EditorSlotEmpty ) -> "prázdne"
        ( UA, EditorSlotEmpty ) -> "порожньо"

        ( RU, EditorClose ) -> "Закрыть"
        ( EN, EditorClose ) -> "Close"
        ( SK, EditorClose ) -> "Zavrieť"
        ( UA, EditorClose ) -> "Закрити"

        ( RU, EditorStateName ) -> "Название"
        ( EN, EditorStateName ) -> "Name"
        ( SK, EditorStateName ) -> "Názov"
        ( UA, EditorStateName ) -> "Назва"

        ( RU, EditorStateNameUniqueError ) -> "Ошибка: названия состояний должны быть уникальными"
        ( EN, EditorStateNameUniqueError ) -> "Error: state names must be unique"
        ( SK, EditorStateNameUniqueError ) -> "Chyba: názvy stavov musia byť jedinečné"
        ( UA, EditorStateNameUniqueError ) -> "Помилка: назви станів мають бути унікальними"

        ( RU, EditorMode ) -> "Режим"
        ( EN, EditorMode ) -> "Mode"
        ( SK, EditorMode ) -> "Režim"
        ( UA, EditorMode ) -> "Режим"

        ( RU, EditorModeAddState ) -> "Создать состояния"
        ( EN, EditorModeAddState ) -> "Create states"
        ( SK, EditorModeAddState ) -> "Vytvoriť stavy"
        ( UA, EditorModeAddState ) -> "Створити стани"

        ( RU, EditorModeAddTransition ) -> "Создать переходы"
        ( EN, EditorModeAddTransition ) -> "Create transitions"
        ( SK, EditorModeAddTransition ) -> "Vytvoriť prechody"
        ( UA, EditorModeAddTransition ) -> "Створити переходи"

        ( RU, EditorModeMoveState ) -> "Перемещать состояния"
        ( EN, EditorModeMoveState ) -> "Move states"
        ( SK, EditorModeMoveState ) -> "Presúvať stavy"
        ( UA, EditorModeMoveState ) -> "Переміщувати стани"

        ( RU, EditorModeConfigureTransition ) -> "Настройка переходов"
        ( EN, EditorModeConfigureTransition ) -> "Configure transitions"
        ( SK, EditorModeConfigureTransition ) -> "Nastaviť prechody"
        ( UA, EditorModeConfigureTransition ) -> "Налаштування переходів"

        ( RU, EditorTransitions ) -> "Переходы"
        ( EN, EditorTransitions ) -> "Transitions"
        ( SK, EditorTransitions ) -> "Prechody"
        ( UA, EditorTransitions ) -> "Переходи"

        ( RU, EditorTransitionLabel ) -> "Метка"
        ( EN, EditorTransitionLabel ) -> "Label"
        ( SK, EditorTransitionLabel ) -> "Označenie"
        ( UA, EditorTransitionLabel ) -> "Мітка"

        ( RU, EditorTransitionSelectStart ) -> "Выберите состояние как начальный узел"
        ( EN, EditorTransitionSelectStart ) -> "Select a state as the start node"
        ( SK, EditorTransitionSelectStart ) -> "Vyberte stav ako počiatočný uzol"
        ( UA, EditorTransitionSelectStart ) -> "Оберіть стан як початковий вузол"

        ( RU, EditorTransitionSelectForEdit ) -> "Выберите переход для редактирования"
        ( EN, EditorTransitionSelectForEdit ) -> "Select a transition to edit"
        ( SK, EditorTransitionSelectForEdit ) -> "Vyberte prechod na úpravu"
        ( UA, EditorTransitionSelectForEdit ) -> "Оберіть перехід для редагування"

        ( RU, EditorTransitionFrom ) -> "Из"
        ( EN, EditorTransitionFrom ) -> "From"
        ( SK, EditorTransitionFrom ) -> "Zo stavu"
        ( UA, EditorTransitionFrom ) -> "Зі стану"

        ( RU, EditorSelected ) -> "Выбрано"
        ( EN, EditorSelected ) -> "Selected"
        ( SK, EditorSelected ) -> "Vybrané"
        ( UA, EditorSelected ) -> "Вибрано"

        ( RU, EditorSelectedNone ) -> "Ничего"
        ( EN, EditorSelectedNone ) -> "None"
        ( SK, EditorSelectedNone ) -> "Nič"
        ( UA, EditorSelectedNone ) -> "Нічого"

        ( RU, EditorSelectedNotFound ) -> "Не найдено"
        ( EN, EditorSelectedNotFound ) -> "Not found"
        ( SK, EditorSelectedNotFound ) -> "Nenájdené"
        ( UA, EditorSelectedNotFound ) -> "Не знайдено"

        ( RU, EditorSelectedState ) -> "Состояние"
        ( EN, EditorSelectedState ) -> "State"
        ( SK, EditorSelectedState ) -> "Stav"
        ( UA, EditorSelectedState ) -> "Стан"

        ( RU, EditorSelectedPos ) -> "Позиция"
        ( EN, EditorSelectedPos ) -> "Pos"
        ( SK, EditorSelectedPos ) -> "Pozícia"
        ( UA, EditorSelectedPos ) -> "Позиція"

        ( RU, EditorSelectedAccepting ) -> "Принимающее"
        ( EN, EditorSelectedAccepting ) -> "Accepting"
        ( SK, EditorSelectedAccepting ) -> "Akceptujúci"
        ( UA, EditorSelectedAccepting ) -> "Приймаючий"

        ( RU, EditorSelectedStart ) -> "Стартовое"
        ( EN, EditorSelectedStart ) -> "Start"
        ( SK, EditorSelectedStart ) -> "Počiatočný"
        ( UA, EditorSelectedStart ) -> "Початковий"

        ( RU, EditorYes ) -> "Да"
        ( EN, EditorYes ) -> "Yes"
        ( SK, EditorYes ) -> "Áno"
        ( UA, EditorYes ) -> "Так"

        ( RU, EditorNo ) -> "Нет"
        ( EN, EditorNo ) -> "No"
        ( SK, EditorNo ) -> "Nie"
        ( UA, EditorNo ) -> "Ні"

        ( RU, EditorDeleteState ) -> "Удалить состояние"
        ( EN, EditorDeleteState ) -> "Delete state"
        ( SK, EditorDeleteState ) -> "Zmazať stav"
        ( UA, EditorDeleteState ) -> "Видалити стан"

        ( RU, EditorSelectedTransition ) -> "Переход"
        ( EN, EditorSelectedTransition ) -> "Transition"
        ( SK, EditorSelectedTransition ) -> "Prechod"
        ( UA, EditorSelectedTransition ) -> "Перехід"

        ( RU, EditorDeleteTransition ) -> "Удалить переход"
        ( EN, EditorDeleteTransition ) -> "Delete transition"
        ( SK, EditorDeleteTransition ) -> "Zmazať prechod"
        ( UA, EditorDeleteTransition ) -> "Видалити перехід"

        ( RU, EditorUnsetStart ) -> "Снять старт"
        ( EN, EditorUnsetStart ) -> "Unset start"
        ( SK, EditorUnsetStart ) -> "Zrušiť počiatočný"
        ( UA, EditorUnsetStart ) -> "Зняти початковий"

        ( RU, EditorMakeStart ) -> "Сделать стартом"
        ( EN, EditorMakeStart ) -> "Make start"
        ( SK, EditorMakeStart ) -> "Nastaviť počiatočný"
        ( UA, EditorMakeStart ) -> "Зробити початковим"

        ( RU, EditorUnsetAccepting ) -> "Снять конечный"
        ( EN, EditorUnsetAccepting ) -> "Unset accepting"
        ( SK, EditorUnsetAccepting ) -> "Zrušiť akceptujúci"
        ( UA, EditorUnsetAccepting ) -> "Зняти кінцевий"

        ( RU, EditorMakeAccepting ) -> "Сделать конечным"
        ( EN, EditorMakeAccepting ) -> "Make accepting"
        ( SK, EditorMakeAccepting ) -> "Nastaviť akceptujúci"
        ( UA, EditorMakeAccepting ) -> "Зробити кінцевим"

        ( RU, EditorSimulation ) -> "Симуляция"
        ( EN, EditorSimulation ) -> "Simulation"
        ( SK, EditorSimulation ) -> "Simulácia"
        ( UA, EditorSimulation ) -> "Симуляція"

        ( RU, EditorSimulationInput ) -> "Входная строка"
        ( EN, EditorSimulationInput ) -> "Input string"
        ( SK, EditorSimulationInput ) -> "Vstupný reťazec"
        ( UA, EditorSimulationInput ) -> "Вхідний рядок"

        ( RU, EditorSimulationDelay ) -> "Задержка мс"
        ( EN, EditorSimulationDelay ) -> "Delay ms"
        ( SK, EditorSimulationDelay ) -> "Oneskorenie ms"
        ( UA, EditorSimulationDelay ) -> "Затримка мс"

        ( RU, EditorSimulationStart ) -> "Запустить симуляцию"
        ( EN, EditorSimulationStart ) -> "Start simulation"
        ( SK, EditorSimulationStart ) -> "Spustiť simuláciu"
        ( UA, EditorSimulationStart ) -> "Запустити симуляцію"

        ( RU, EditorSimulationStop ) -> "Стоп"
        ( EN, EditorSimulationStop ) -> "Stop"
        ( SK, EditorSimulationStop ) -> "Stop"
        ( UA, EditorSimulationStop ) -> "Стоп"

        ( RU, EditorSimulationRunning ) -> "Симуляция выполняется..."
        ( EN, EditorSimulationRunning ) -> "Simulation running..."
        ( SK, EditorSimulationRunning ) -> "Simulácia beží..."
        ( UA, EditorSimulationRunning ) -> "Симуляція виконується..."

        ( RU, EditorSimulationSuccess ) -> "Успех"
        ( EN, EditorSimulationSuccess ) -> "Success"
        ( SK, EditorSimulationSuccess ) -> "Úspech"
        ( UA, EditorSimulationSuccess ) -> "Успіх"

        ( RU, EditorSimulationRejected ) -> "Строка не соответствует автомату"
        ( EN, EditorSimulationRejected ) -> "Word does not match the automaton"
        ( SK, EditorSimulationRejected ) -> "Reťazec nezodpovedá automatu"
        ( UA, EditorSimulationRejected ) -> "Рядок не відповідає автомату"

        ( RU, EditorSimulationDeadEnd ) -> "Ошибка: нет подходящего перехода для входа"
        ( EN, EditorSimulationDeadEnd ) -> "Error: no suitable transition for input"
        ( SK, EditorSimulationDeadEnd ) -> "Chyba: žiadny vhodný prechod pre vstup"
        ( UA, EditorSimulationDeadEnd ) -> "Помилка: немає відповідного переходу для входу"

        ( RU, EditorSimulationMissingStart ) -> "Ошибка: не выбрано стартовое состояние"
        ( EN, EditorSimulationMissingStart ) -> "Error: no start state selected"
        ( SK, EditorSimulationMissingStart ) -> "Chyba: nie je zvolený počiatočný stav"
        ( UA, EditorSimulationMissingStart ) -> "Помилка: не вибрано початковий стан"

        ( RU, BackHomeIcon  ) -> "←"
        ( EN, BackHomeIcon  ) -> "←"
        ( SK, BackHomeIcon  ) -> "←"
        ( UA, BackHomeIcon  ) -> "←"

        ( RU, BackHomeText  ) -> "На главную"
        ( EN, BackHomeText  ) -> "Home"
        ( SK, BackHomeText  ) -> "Domov"
        ( UA, BackHomeText  ) -> "На головну"

        ( RU, BackHomeIconText  ) -> "← На главную"
        ( EN, BackHomeIconText  ) -> "← Home"
        ( SK, BackHomeIconText  ) -> "← Domov"
        ( UA, BackHomeIconText  ) -> "← На головну"
