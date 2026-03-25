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
    | MenuAutomatonFinite
    | MenuAutomatonStack
    | MenuInstructions
    | MenuAbout
    | Greeting
    | AutomatonMenuTitle
    | EditorStackVisual
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
    | EditorCodeDraftChanges
    | EditorCodeValidationLinePrefix
    | EditorCodeValidationFormat
    | EditorCodeValidationTargetNoSpaces
    | EditorCodeValidationSourceNoSpaces
    | EditorCodeValidationConditionSingle
    | EditorCodeValidationTwoParts
    | EditorCodeValidationArrowLine
    | EditorCodeValidationStackLeftThreeParts
    | EditorCodeValidationStackRightTwoParts
    | EditorCodeValidationStackInputSingle
    | EditorCodeValidationStackZMustBeReturned
    | EditorImport
    | EditorExport
    | EditorSave
    | EditorSaveModalTitle
    | EditorSaveToSlot
    | EditorLoadFromSlot
    | EditorDeleteFromSlot
    | EditorImportFas
    | EditorExportFas
    | EditorImportError
    | EditorAutomatonTypeMismatch
    | EditorRenameSlot
    | EditorConfirmRename
    | EditorSaved
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
    | EditorTransitionStackInput
    | EditorTransitionStackOutput
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
    | EditorGoToStartState
    | EditorSimulationStart
    | EditorSimulationStepStart
    | EditorSimulationStop
    | EditorSimulationStepForward
    | EditorSimulationStepBackward
    | EditorSimulationStopped
    | EditorSimulationRunning
    | EditorSimulationSuccess
    | EditorSimulationRejected
    | EditorSimulationDeadEnd
    | EditorSimulationMissingStart
    | EditorSimulationBlockedByCodeErrors
    | EditorSimulationChoiceTitle
    | EditorSimulationChoiceBody
    | EditorAutomatonTypeDetailsToggle
    | EditorAutomatonNonDetReasonsTitle
    | EditorAutomatonNonDetReasonDuplicate
    | EditorAutomatonNonDetReasonLambda
    | BackHomeIcon
    | BackHomeText
    | BackHomeIconText
    | FeedbackButtonAria
    | FeedbackModalTitle
    | FeedbackModalHint
    | FeedbackModalPlaceholder
    | FeedbackSend
    | FeedbackEmailLabel
    | FeedbackEmailPlaceholder
    | FeedbackMessageLabel
    | FeedbackRecommendedTitle
    | FeedbackRecommendedMailLabel
    | FeedbackRecommendedGoogleFormLabel
    | FeedbackFormSectionHint
    | FeedbackMailProviderLabel
    | FeedbackMailProviderGmail
    | FeedbackMailProviderOutlook
    | FeedbackDoNotModifyLabel
    | FeedbackDescribeDetailsLabel


t : Lang -> Key -> String
t lang key =
    case ( lang, key ) of
        ( RU, AppTitle ) -> "Симулятор конечного автомата (Elm)"
        ( EN, AppTitle ) -> "Finite Automaton Simulator (Elm)"
        ( SK, AppTitle ) -> "Simulátor konečného automatu (Elm)"
        ( UA, AppTitle ) -> "Симулятор кінцевого автомата (Elm)"

        ( RU, MenuEditor ) -> "Автомат"
        ( EN, MenuEditor ) -> "Automaton"
        ( SK, MenuEditor ) -> "Automat"
        ( UA, MenuEditor ) -> "Автомат"

        ( RU, MenuAutomatonFinite ) -> "Конечный автомат"
        ( EN, MenuAutomatonFinite ) -> "Finite automaton"
        ( SK, MenuAutomatonFinite ) -> "Konečný automat"
        ( UA, MenuAutomatonFinite ) -> "Кінцевий автомат"

        ( RU, MenuAutomatonStack ) -> "Стековый автомат"
        ( EN, MenuAutomatonStack ) -> "Stack automaton"
        ( SK, MenuAutomatonStack ) -> "Zásobníkový automat"
        ( UA, MenuAutomatonStack ) -> "Стековий автомат"

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

        ( RU, AutomatonMenuTitle ) -> "Выберите тип автомата"
        ( EN, AutomatonMenuTitle ) -> "Choose automaton type"
        ( SK, AutomatonMenuTitle ) -> "Vyberte typ automatu"
        ( UA, AutomatonMenuTitle ) -> "Оберіть тип автомата"

        ( RU, EditorStackVisual ) -> "Стек"
        ( EN, EditorStackVisual ) -> "Stack"
        ( SK, EditorStackVisual ) -> "Zásobník"
        ( UA, EditorStackVisual ) -> "Стек"

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
                [ "1) Работа с автоматом на холсте"
                , "• Режим «Создать состояния»: клик по пустому месту создаёт состояние."
                , "• Режим «Создать переходы»: выберите состояние-источник, затем состояние-назначение."
                , "• Режим «Выбрать»: перетаскивайте состояния, выбирайте состояние или переход для редактирования."
                , "• Двойной клик по состоянию переключает принимающее состояние."
                , "• Для выбранного состояния доступны: изменить название, сделать/убрать стартовым, сделать/убрать принимающим, удалить."
                , "• Для выбранного перехода доступны: изменить метку и удалить переход."
                , ""
                , "2) Тип автомата"
                , "• Приложение показывает, является ли автомат детерминированным или недетерминированным."
                , "• Можно открыть детали и посмотреть причины недетерминированности (например, дубликаты условий или λ-переходы)."
                , ""
                , "3) Функция переходов (код слева)"
                , "• Импорт: применяет текст функции переходов к текущему автомату."
                , "• Экспорт: формирует текст функции переходов из текущего автомата."
                , "• Подсветка ошибок помогает исправить формат записей."
                , "• Текущий формат записи перехода: (состояние, символ) => состояние_назначения."
                , "• Примеры: (q0, a) => q1, (q1, b) => q2, (q2, λ) => q3 (λ — лямбда-переход)."
                , ""
                , "4) Симуляция"
                , "• Введите входную строку и задайте задержку (мс) между шагами."
                , "• Старт запускает симуляцию, Стоп останавливает."
                , "• Пошагово отображаются текущие состояния и результат: принято / отклонено / тупик / нет стартового состояния."
                , "• Для НКА при неоднозначности можно выбрать следующий переход вручную."
                , ""
                , "5) Сохранение и обмен"
                , "• Раздел «Сохранение»: сохранение автомата в слот, загрузка, удаление, переименование слотов."
                , "• Для слотов поддерживается импорт/экспорт .fas."
                , "⚠️ При ошибке попробуйте обновить страницу через Ctrl+F5. Если ошибка сохраняется — напишите мне через форму обратной связи справа снизу."
                , ""
                , "6) Горячие клавиши"
                , "• Alt+1 — режим «Создать состояния»."
                , "• Alt+2 — режим «Создать переходы»."
                , "• Alt+3 — режим «Выбрать / перемещать состояния»."
                , "• Alt+S — сделать/убрать выбранное состояние стартовым."
                , "• Alt+E — сделать/убрать выбранное состояние принимающим."
                , "• Alt+N — фокус на поле имени/метки выбранного объекта."
                , "• Alt+Q — центрировать холст на стартовом состоянии."
                , "• Alt+T — фокус на редакторе функции переходов."
                , "• Shift+Alt+S — фокус на поле входной строки симуляции."
                , "• Shift+Alt+Enter — старт/стоп симуляции."
                , "• Shift+Alt+N — показать/скрыть детали типа автомата."
                , "• Delete — удалить выбранное состояние или переход."
                ]

        ( EN, InstructionsBody ) ->
            String.join "\n"
                [ "1) Working with the automaton on the canvas"
                , "• 'Create states' mode: click on empty space to create a state."
                , "• 'Create transitions' mode: select the source state, then the destination state."
                , "• 'Select' mode: drag states, select a state or a transition to edit."
                , "• Double-clicking a state toggles its accepting flag."
                , "• For the selected state you can: rename it, set/unset start, set/unset accepting, delete."
                , "• For the selected transition you can: change the label and delete the transition."
                , ""
                , "2) Automaton type"
                , "• The app shows whether the automaton is deterministic or non-deterministic."
                , "• You can open details and see reasons for non-determinism (for example, duplicate conditions or λ-transitions)."
                , ""
                , "3) Transition function (code on the left)"
                , "• Import: applies the transition function text to the current automaton."
                , "• Export: generates the transition function text from the current automaton."
                , "• Error highlighting helps to fix formatting issues in entries."
                , "• The expected format for a transition entry is: (state, symbol) => target_state."
                , "• Examples: (q0, a) => q1, (q1, b) => q2, (q2, λ) => q3 (λ is a lambda transition)."
                , ""
                , "4) Simulation"
                , "• Enter the input string and set the delay (ms) between steps."
                , "• Start begins the simulation, Stop stops it."
                , "• The simulation shows current states step-by-step and the result: accepted / rejected / dead end / no start state."
                , "• For NFAs, when ambiguous, you can choose the next transition manually."
                , ""
                , "5) Saving and sharing"
                , "• 'Save' section: save the automaton to a slot, load, delete, rename slots."
                , "• Slots support importing/exporting .fas files."
                , "⚠️ If an error occurs, try hard-refreshing the page with Ctrl+F5. If the error remains, contact me via the feedback form in the bottom-right corner."
                , ""
                , "6) Keyboard shortcuts"
                , "• Alt+1 — 'Create states' mode."
                , "• Alt+2 — 'Create transitions' mode."
                , "• Alt+3 — 'Select / move states' mode."
                , "• Alt+S — set/unset the selected state as start."
                , "• Alt+E — set/unset the selected state as accepting."
                , "• Alt+N — focus the name/label field of the selected item."
                , "• Alt+Q — center the canvas on the start state."
                , "• Alt+T — focus the transition function editor."
                , "• Shift+Alt+S — focus the simulation input field."
                , "• Shift+Alt+Enter — start/stop simulation."
                , "• Shift+Alt+N — show/hide automaton type details."
                , "• Delete — delete the selected state or transition."
                ]

        ( SK, InstructionsBody ) ->
            String.join "\n"
                [ "1) Práca s automatom na plátne"
                , "• Režim 'Vytvoriť stavy': kliknutie na prázdne miesto vytvorí stav."
                , "• Režim 'Vytvoriť prechody': vyberte zdrojový stav, potom cieľový stav."
                , "• Režim 'Vybrať': ťahajte stavy, vyberte stav alebo prechod na úpravu."
                , "• Dvojité kliknutie na stav prepína, či je akceptujúci."
                , "• Pre vybraný stav môžete: zmeniť názov, nastaviť/zrušiť počiatočný, nastaviť/zrušiť akceptujúci, odstrániť."
                , "• Pre vybraný prechod môžete: zmeniť označenie a odstrániť prechod."
                , ""
                , "2) Typ automatu"
                , "• Aplikácia zobrazuje, či je automat deterministický alebo nedeterministický."
                , "• Môžete otvoriť detaily a vidieť dôvody nedeterministickosti (napríklad duplikáty podmienok alebo λ-prechody)."
                , ""
                , "3) Prechodová funkcia (kód vľavo)"
                , "• Import: aplikuje text prechodovej funkcie na aktuálny automat."
                , "• Export: vygeneruje text prechodovej funkcie z aktuálneho automatu."
                , "• Zvýraznenie chýb pomáha opraviť formát záznamov."
                , "• Očakávaný formát záznamu prechodu je: (stav, symbol) => cieľový_stav."
                , "• Príklady: (q0, a) => q1, (q1, b) => q2, (q2, λ) => q3 (λ je lambda prechod)."
                , ""
                , "4) Simulácia"
                , "• Zadajte vstupný reťazec a nastavte oneskorenie (ms) medzi krokmi."
                , "• Start spustí simuláciu, Stop ju zastaví."
                , "• Krokovo sa zobrazujú aktuálne stavy a výsledok: prijaté / odmietnuté / slepá ulička / žiadny počiatočný stav."
                , "• Pre NKA pri nejednoznačnosti môžete manuálne vybrať ďalší prechod."
                , ""
                , "5) Ukladanie a zdieľanie"
                , "• Sekcia 'Uložiť': uloženie automatu do slotu, načítanie, vymazanie, premenovanie slotov."
                , "• Sloty podporujú import/export súborov .fas."
                , "⚠️ Ak sa vyskytne chyba, skúste tvrdé obnovenie stránky cez Ctrl+F5. Ak chyba pretrváva, napíšte mi cez formulár spätnej väzby vpravo dole."
                , ""
                , "6) Klávesové skratky"
                , "• Alt+1 — režim 'Vytvoriť stavy'."
                , "• Alt+2 — režim 'Vytvoriť prechody'."
                , "• Alt+3 — režim 'Vybrať / presúvať stavy'."
                , "• Alt+S — nastaviť/zrušiť vybraný stav ako počiatočný."
                , "• Alt+E — nastaviť/zrušiť vybraný stav ako akceptujúci."
                , "• Alt+N — fokus na poli názvu/označenia vybraného objektu."
                , "• Alt+Q — vycentrovať plátno na počiatočný stav."
                , "• Alt+T — fokus na editor prechodovej funkcie."
                , "• Shift+Alt+S — fokus na pole vstupu simulácie."
                , "• Shift+Alt+Enter — spustiť/zastaviť simuláciu."
                , "• Shift+Alt+N — zobraziť/skryť detaily typu automatu."
                , "• Delete — odstrániť vybraný stav alebo prechod."
                ]

        ( UA, InstructionsBody ) ->
            String.join "\n"
                [ "1) Робота з автоматом на полотні"
                , "• Режим 'Створити стани': клік по порожньому місцю створює стан."
                , "• Режим 'Створити переходи': виберіть стан-джерело, потім стан-призначення."
                , "• Режим 'Вибрати': перетягуйте стани, вибирайте стан або перехід для редагування."
                , "• Подвійний клік по стану перемикає, чи є він приймаючим."
                , "• Для вибраного стану доступні: змінити назву, зробити/зняти як стартовий, зробити/зняти як приймаючий, видалити."
                , "• Для вибраного переходу доступні: змінити мітку і видалити перехід."
                , ""
                , "2) Тип автомату"
                , "• Додаток показує, чи є автомат детермінованим або недетермінованим."
                , "• Можна відкрити деталі і побачити причини недетермінованості (наприклад, дублікати умов або λ-переходи)."
                , ""
                , "3) Функція переходів (код ліворуч)"
                , "• Імпорт: застосовує текст функції переходів до поточного автомату."
                , "• Експорт: формує текст функції переходів з поточного автомату."
                , "• Підсвітка помилок допомагає виправити формат записів."
                , "• Поточний формат запису переходу: (стан, символ) => стан_призначення."
                , "• Приклади: (q0, a) => q1, (q1, b) => q2, (q2, λ) => q3 (λ — лямбда-перехід)."
                , ""
                , "4) Симуляція"
                , "• Введіть вхідний рядок і задайте затримку (мс) між кроками."
                , "• Старт запускає симуляцію, Стоп зупиняє її."
                , "• По кроках відображаються поточні стани та результат: прийнято / відхилено / тупик / немає стартового стану."
                , "• Для НКА при неоднозначності можна вибрати наступний перехід вручну."
                , ""
                , "5) Збереження та обмін"
                , "• Розділ 'Збереження': збереження автомату в слот, завантаження, видалення, перейменування слотів."
                , "• Для слотів підтримується імпорт/експорт файлів .fas."
                , "⚠️ Якщо сталася помилка, спробуйте примусово оновити сторінку через Ctrl+F5. Якщо помилка не зникає — напишіть мені через форму зворотного зв'язку праворуч унизу."
                , ""
                , "6) Гарячі клавіші"
                , "• Alt+1 — режим 'Створити стани'."
                , "• Alt+2 — режим 'Створити переходи'."
                , "• Alt+3 — режим 'Вибрати / переміщувати стани'."
                , "• Alt+S — зробити/зняти вибраний стан як стартовий."
                , "• Alt+E — зробити/зняти вибраний стан як приймаючий."
                , "• Alt+N — фокус на полі назви/мітки вибраного об'єкта."
                , "• Alt+Q — центрувати полотно на стартовому стані."
                , "• Alt+T — фокус на редакторі функції переходів."
                , "• Shift+Alt+S — фокус на полі вхідного рядка симуляції."
                , "• Shift+Alt+Enter — старт/стоп симуляції."
                , "• Shift+Alt+N — показати/приховати деталі типу автомату."
                , "• Delete — видалити вибраний стан або перехід."
                ]

        ( RU, AboutTitle ) -> "О проекте"
        ( EN, AboutTitle ) -> "About the Project"
        ( SK, AboutTitle ) -> "O projekte"
        ( UA, AboutTitle ) -> "Про проект"

        ( RU, AboutBody ) -> "Бакалаврская работа по предмету TZIV (teoreticke zaklady informacnych vied) на факультете FIIT STU. Проект создаёт Константин Зайцев — украинец; это визуальный редактор и симулятор конечных автоматов на Elm для обучения, экспериментов и демонстрации работы ДКА/НКА. В планах — добавить и другие виды автоматов (например, со стековой памятью и другие), но только если сайт будет востребован."
        ( EN, AboutBody ) -> "Bachelor thesis for the TZIV course (teoreticke zaklady informacnych vied) at the FIIT STU faculty. The project is developed by Kostiantyn Zaitsev, a Ukrainian student; it provides a visual editor and simulator of finite automata in Elm for learning, experimentation, and DFA/NFA demonstrations. The plan is to add more types of automata (like storage automata and others) but only if the site proves to be popular."
        ( SK, AboutBody ) -> "Bakalárska práca pre predmet TZIV (teoreticke zaklady informacnych vied) na fakulte FIIT STU. Projekt vytvára Kostiantyn Zaitsev, ukrajinský študent; ide o vizuálny editor a simulátor konečných automatov v Elme na učenie, experimenty a demonštráciu DKA/NKA. V pláne je pridať aj iné typy automatov (napríklad so zásobníkovou pamäťou a iné), ale len v prípade, že bude o ne záujem."
        ( UA, AboutBody ) -> "Бакалаврська робота для предмета TZIV (teoreticke zaklady informacnych vied) на факультеті FIIT STU. Проєкт розробляє Костянтин Зайцев, українець; це візуальний редактор і симулятор кінцевих автоматів на Elm для навчання, експериментів і демонстрації роботи ДКА/НКА. План — додати більше типів автоматів (як-от зі стековою пам'яттю та інші), але тільки якщо сайт виявиться популярним."

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

        ( RU, EditorCodeDraftChanges ) -> "Изменения"
        ( EN, EditorCodeDraftChanges ) -> "Changes"
        ( SK, EditorCodeDraftChanges ) -> "Zmeny"
        ( UA, EditorCodeDraftChanges ) -> "Зміни"

        ( RU, EditorCodeValidationLinePrefix ) -> "Строка"
        ( EN, EditorCodeValidationLinePrefix ) -> "Line"
        ( SK, EditorCodeValidationLinePrefix ) -> "Riadok"
        ( UA, EditorCodeValidationLinePrefix ) -> "Рядок"

        ( RU, EditorCodeValidationFormat ) -> "Ожидается формат: (став_откуда, условие) => став_куда"
        ( EN, EditorCodeValidationFormat ) -> "Expected format: (from_state, condition) => to_state"
        ( SK, EditorCodeValidationFormat ) -> "Očakávaný formát: (z_stavu, podmienka) => do_stavu"
        ( UA, EditorCodeValidationFormat ) -> "Очікуваний формат: (стан_звідки, умова) => стан_куди"

        ( RU, EditorCodeValidationTargetNoSpaces ) -> "Название става справа должно быть одним словом без пробелов"
        ( EN, EditorCodeValidationTargetNoSpaces ) -> "Target state name must be a single word without spaces"
        ( SK, EditorCodeValidationTargetNoSpaces ) -> "Názov cieľového stavu musí byť jedno slovo bez medzier"
        ( UA, EditorCodeValidationTargetNoSpaces ) -> "Назва цільового стану має бути одним словом без пробілів"

        ( RU, EditorCodeValidationSourceNoSpaces ) -> "Название става слева должно быть одним словом без пробелов"
        ( EN, EditorCodeValidationSourceNoSpaces ) -> "Source state name must be a single word without spaces"
        ( SK, EditorCodeValidationSourceNoSpaces ) -> "Názov zdrojového stavu musí byť jedno slovo bez medzier"
        ( UA, EditorCodeValidationSourceNoSpaces ) -> "Назва початкового стану має бути одним словом без пробілів"

        ( RU, EditorCodeValidationConditionSingle ) -> "Условие должно быть одним значением"
        ( EN, EditorCodeValidationConditionSingle ) -> "Condition must be a single value"
        ( SK, EditorCodeValidationConditionSingle ) -> "Podmienka musí byť jedna hodnota"
        ( UA, EditorCodeValidationConditionSingle ) -> "Умова має бути одним значенням"

        ( RU, EditorCodeValidationTwoParts ) -> "Ожидается ровно два элемента: став и условие"
        ( EN, EditorCodeValidationTwoParts ) -> "Expected exactly two items: state and condition"
        ( SK, EditorCodeValidationTwoParts ) -> "Očakávajú sa presne dve položky: stav a podmienka"
        ( UA, EditorCodeValidationTwoParts ) -> "Очікується рівно два елементи: стан і умова"

        ( RU, EditorCodeValidationArrowLine ) -> "Ожидается стрелка => и одна запись на строку"
        ( EN, EditorCodeValidationArrowLine ) -> "Expected arrow => and one entry per line"
        ( SK, EditorCodeValidationArrowLine ) -> "Očakáva sa šípka => a jeden záznam na riadok"
        ( UA, EditorCodeValidationArrowLine ) -> "Очікується стрілка => і один запис на рядок"

        ( RU, EditorCodeValidationStackLeftThreeParts ) -> "Слева ожидается 3 элемента: (став_откуда, входной_символ, вход_стека)"
        ( EN, EditorCodeValidationStackLeftThreeParts ) -> "Left side must contain 3 items: (from_state, input_symbol, input_stack)"
        ( SK, EditorCodeValidationStackLeftThreeParts ) -> "Ľavá strana musí mať 3 položky: (z_stavu, vstupný_symbol, vstup_zásobníka)"
        ( UA, EditorCodeValidationStackLeftThreeParts ) -> "Ліва частина має містити 3 елементи: (стан_звідки, вхідний_символ, вхід_стека)"

        ( RU, EditorCodeValidationStackRightTwoParts ) -> "Справа ожидается 2 элемента: (став_куда, выход_стека)"
        ( EN, EditorCodeValidationStackRightTwoParts ) -> "Right side must contain 2 items: (to_state, output_stack)"
        ( SK, EditorCodeValidationStackRightTwoParts ) -> "Pravá strana musí mať 2 položky: (do_stavu, výstup_zásobníka)"
        ( UA, EditorCodeValidationStackRightTwoParts ) -> "Права частина має містити 2 елементи: (стан_куди, вихід_стека)"

        ( RU, EditorCodeValidationStackInputSingle ) -> "Вход стека должен быть одним символом или λ"
        ( EN, EditorCodeValidationStackInputSingle ) -> "Input stack must be a single symbol or λ"
        ( SK, EditorCodeValidationStackInputSingle ) -> "Vstup zásobníka musí byť jeden symbol alebo λ"
        ( UA, EditorCodeValidationStackInputSingle ) -> "Вхід стека має бути одним символом або λ"

        ( RU, EditorCodeValidationStackZMustBeReturned ) -> "Если вход стека = Z, то в выходе стека символ Z должен быть в конце"
        ( EN, EditorCodeValidationStackZMustBeReturned ) -> "If input stack is Z, output stack must end with Z"
        ( SK, EditorCodeValidationStackZMustBeReturned ) -> "Ak je vstup zásobníka Z, výstup zásobníka musí končiť na Z"
        ( UA, EditorCodeValidationStackZMustBeReturned ) -> "Якщо вхід стека = Z, то вихід стека має закінчуватися на Z"

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

        ( RU, EditorImportFas ) -> "Импорт .fas"
        ( EN, EditorImportFas ) -> "Import .fas"
        ( SK, EditorImportFas ) -> "Import .fas"
        ( UA, EditorImportFas ) -> "Імпорт .fas"

        ( RU, EditorExportFas ) -> "Экспорт .fas"
        ( EN, EditorExportFas ) -> "Export .fas"
        ( SK, EditorExportFas ) -> "Export .fas"
        ( UA, EditorExportFas ) -> "Експорт .fas"

        ( RU, EditorImportError ) -> "Ошибка при импорте"
        ( EN, EditorImportError ) -> "Import failed"
        ( SK, EditorImportError ) -> "Chyba pri importe"
        ( UA, EditorImportError ) -> "Помилка імпорту"

        ( RU, EditorAutomatonTypeMismatch ) -> "Этот автомат другого типа и не может быть загружен в текущем редакторе"
        ( EN, EditorAutomatonTypeMismatch ) -> "This automaton type cannot be loaded in the current editor"
        ( SK, EditorAutomatonTypeMismatch ) -> "Tento typ automatu sa nedá načítať v aktuálnom editore"
        ( UA, EditorAutomatonTypeMismatch ) -> "Цей тип автомату не можна завантажити в поточному редакторі"
        
        ( RU, EditorRenameSlot ) -> "Переименовать"
        ( EN, EditorRenameSlot ) -> "Rename"
        ( SK, EditorRenameSlot ) -> "Premenovať"
        ( UA, EditorRenameSlot ) -> "Перейменувати"

        ( RU, EditorConfirmRename ) -> "Подтвердить"
        ( EN, EditorConfirmRename ) -> "Confirm"
        ( SK, EditorConfirmRename ) -> "Potvrdiť"
        ( UA, EditorConfirmRename ) -> "Підтвердити"

        ( RU, EditorSaved ) -> "Сохранено"
        ( EN, EditorSaved ) -> "Saved"
        ( SK, EditorSaved ) -> "Uložené"
        ( UA, EditorSaved ) -> "Збережено"

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

        ( RU, EditorModeMoveState ) -> "Выбрать"
        ( EN, EditorModeMoveState ) -> "Select"
        ( SK, EditorModeMoveState ) -> "Vybrať"
        ( UA, EditorModeMoveState ) -> "Вибрати"

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

        ( RU, EditorTransitionStackInput ) -> "Вход стека"
        ( EN, EditorTransitionStackInput ) -> "Input stack"
        ( SK, EditorTransitionStackInput ) -> "Vstup zásobníka"
        ( UA, EditorTransitionStackInput ) -> "Вхід стека"

        ( RU, EditorTransitionStackOutput ) -> "Выход стека"
        ( EN, EditorTransitionStackOutput ) -> "Output stack"
        ( SK, EditorTransitionStackOutput ) -> "Výstup zásobníka"
        ( UA, EditorTransitionStackOutput ) -> "Вихід стека"

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

        ( RU, EditorSimulationDelay ) -> "Задержка"
        ( EN, EditorSimulationDelay ) -> "Delay"
        ( SK, EditorSimulationDelay ) -> "Oneskorenie"
        ( UA, EditorSimulationDelay ) -> "Затримка"

        ( RU, EditorGoToStartState ) -> "К старту"
        ( EN, EditorGoToStartState ) -> "Go to start"
        ( SK, EditorGoToStartState ) -> "Na začiatok"
        ( UA, EditorGoToStartState ) -> "До початку"

        ( RU, EditorSimulationStart ) -> "Запустить симуляцию"
        ( EN, EditorSimulationStart ) -> "Start simulation"
        ( SK, EditorSimulationStart ) -> "Spustiť simuláciu"
        ( UA, EditorSimulationStart ) -> "Запустити симуляцію"

        ( RU, EditorSimulationStepStart ) -> "Начать пошаговую симуляцию"
        ( EN, EditorSimulationStepStart ) -> "Start step-by-step simulation"
        ( SK, EditorSimulationStepStart ) -> "Spustiť krokovú simuláciu"
        ( UA, EditorSimulationStepStart ) -> "Почати покрокову симуляцію"

        ( RU, EditorSimulationStop ) -> "Стоп"
        ( EN, EditorSimulationStop ) -> "Stop"
        ( SK, EditorSimulationStop ) -> "Stop"
        ( UA, EditorSimulationStop ) -> "Стоп"

        ( RU, EditorSimulationStepForward ) -> "Шаг вперед"
        ( EN, EditorSimulationStepForward ) -> "Step forward"
        ( SK, EditorSimulationStepForward ) -> "Krok vpred"
        ( UA, EditorSimulationStepForward ) -> "Крок вперед"

        ( RU, EditorSimulationStepBackward ) -> "Шаг назад"
        ( EN, EditorSimulationStepBackward ) -> "Step back"
        ( SK, EditorSimulationStepBackward ) -> "Krok späť"
        ( UA, EditorSimulationStepBackward ) -> "Крок назад"

        ( RU, EditorSimulationStopped ) -> "Stop"
        ( EN, EditorSimulationStopped ) -> "Stop"
        ( SK, EditorSimulationStopped ) -> "Stop"
        ( UA, EditorSimulationStopped ) -> "Stop"

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

        ( RU, EditorSimulationBlockedByCodeErrors ) -> "Ошибка в переходовой функции, исправьте её чтобы симуляция могла идти"
        ( EN, EditorSimulationBlockedByCodeErrors ) -> "There is an error in the transition function. Fix it to run simulation"
        ( SK, EditorSimulationBlockedByCodeErrors ) -> "V prechodovej funkcii je chyba. Opravte ju, aby sa simulácia spustila"
        ( UA, EditorSimulationBlockedByCodeErrors ) -> "У функції переходів є помилка. Виправте її, щоб запустити симуляцію"

        ( RU, EditorSimulationChoiceTitle ) -> "Есть несколько переходов"
        ( EN, EditorSimulationChoiceTitle ) -> "Multiple transitions available"
        ( SK, EditorSimulationChoiceTitle ) -> "K dispozícii je viac prechodov"
        ( UA, EditorSimulationChoiceTitle ) -> "Доступно кілька переходів"

        ( RU, EditorSimulationChoiceBody ) -> "Выберите, по какому переходу идти из состояния"
        ( EN, EditorSimulationChoiceBody ) -> "Choose which transition to follow from state"
        ( SK, EditorSimulationChoiceBody ) -> "Vyberte, ktorý prechod sa má použiť zo stavu"
        ( UA, EditorSimulationChoiceBody ) -> "Оберіть, яким переходом іти зі стану"

        ( RU, EditorAutomatonTypeDetailsToggle ) -> "Показать/скрыть причины недетерминированности"
        ( EN, EditorAutomatonTypeDetailsToggle ) -> "Show/hide non-determinism reasons"
        ( SK, EditorAutomatonTypeDetailsToggle ) -> "Zobraziť/skryť dôvody nedeterminizmu"
        ( UA, EditorAutomatonTypeDetailsToggle ) -> "Показати/сховати причини недетермінованості"

        ( RU, EditorAutomatonNonDetReasonsTitle ) -> "Причины недетерминированности"
        ( EN, EditorAutomatonNonDetReasonsTitle ) -> "Reasons for non-determinism"
        ( SK, EditorAutomatonNonDetReasonsTitle ) -> "Dôvody nedeterminizmu"
        ( UA, EditorAutomatonNonDetReasonsTitle ) -> "Причини недетермінованості"

        ( RU, EditorAutomatonNonDetReasonDuplicate ) -> "Из состояния {state} есть несколько переходов по символу ‘{label}’"
        ( EN, EditorAutomatonNonDetReasonDuplicate ) -> "State {state} has multiple transitions for symbol ‘{label}’"
        ( SK, EditorAutomatonNonDetReasonDuplicate ) -> "Zo stavu {state} existuje viac prechodov pre symbol ‘{label}’"
        ( UA, EditorAutomatonNonDetReasonDuplicate ) -> "Із стану {state} є кілька переходів за символом ‘{label}’"

        ( RU, EditorAutomatonNonDetReasonLambda ) -> "Есть λ-переход из {from} в {to}"
        ( EN, EditorAutomatonNonDetReasonLambda ) -> "There is a λ-transition from {from} to {to}"
        ( SK, EditorAutomatonNonDetReasonLambda ) -> "Existuje λ-prechod z {from} do {to}"
        ( UA, EditorAutomatonNonDetReasonLambda ) -> "Є λ-перехід із {from} в {to}"

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

        ( RU, FeedbackButtonAria ) -> "Открыть форму обратной связи"
        ( EN, FeedbackButtonAria ) -> "Open feedback form"
        ( SK, FeedbackButtonAria ) -> "Otvoriť formulár spätnej väzby"
        ( UA, FeedbackButtonAria ) -> "Відкрити форму зворотного зв’язку"

        ( RU, FeedbackModalTitle ) -> "Обратная связь"
        ( EN, FeedbackModalTitle ) -> "Feedback"
        ( SK, FeedbackModalTitle ) -> "Spätná väzba"
        ( UA, FeedbackModalTitle ) -> "Зворотний зв’язок"

        ( RU, FeedbackModalHint ) -> "Опишите, что можно улучшить, и отправьте форму. Сообщение уйдёт через Formspree."
        ( EN, FeedbackModalHint ) -> "Describe what can be improved and submit the form. The message is sent via Formspree."
        ( SK, FeedbackModalHint ) -> "Popíšte, čo sa dá zlepšiť, a odošlite formulár. Správa sa odošle cez Formspree."
        ( UA, FeedbackModalHint ) -> "Опишіть, що можна покращити, і надішліть форму. Повідомлення буде відправлено через Formspree."

        ( RU, FeedbackModalPlaceholder ) -> "Напишите ваше сообщение..."
        ( EN, FeedbackModalPlaceholder ) -> "Write your message..."
        ( SK, FeedbackModalPlaceholder ) -> "Napíšte vašu správu..."
        ( UA, FeedbackModalPlaceholder ) -> "Напишіть ваше повідомлення..."


        ( RU, FeedbackSend ) -> "Отправить"
        ( EN, FeedbackSend ) -> "Send"
        ( SK, FeedbackSend ) -> "Odoslať"
        ( UA, FeedbackSend ) -> "Надіслати"

        ( RU, FeedbackEmailLabel ) -> "Ваш email (необязательно)"
        ( EN, FeedbackEmailLabel ) -> "Your email (optional)"
        ( SK, FeedbackEmailLabel ) -> "Váš email (voliteľné)"
        ( UA, FeedbackEmailLabel ) -> "Ваш email (необов’язково)"

        ( RU, FeedbackEmailPlaceholder ) -> "Ваш email"
        ( EN, FeedbackEmailPlaceholder ) -> "Your email"
        ( SK, FeedbackEmailPlaceholder ) -> "Váš email"
        ( UA, FeedbackEmailPlaceholder ) -> "Ваш email"

        ( RU, FeedbackMessageLabel ) -> "Ваше сообщение"
        ( EN, FeedbackMessageLabel ) -> "Your message"
        ( SK, FeedbackMessageLabel ) -> "Vaša správa"
        ( UA, FeedbackMessageLabel ) -> "Ваше повідомлення"

        ( RU, FeedbackRecommendedTitle ) -> "Рекомендуемый способ"
        ( EN, FeedbackRecommendedTitle ) -> "Recommended method"
        ( SK, FeedbackRecommendedTitle ) -> "Odporúčaný spôsob"
        ( UA, FeedbackRecommendedTitle ) -> "Рекомендований спосіб"

        ( RU, FeedbackRecommendedMailLabel ) -> "Мейл:"
        ( EN, FeedbackRecommendedMailLabel ) -> "Mail:"
        ( SK, FeedbackRecommendedMailLabel ) -> "E-mail:"
        ( UA, FeedbackRecommendedMailLabel ) -> "Пошта:"

        ( RU, FeedbackRecommendedGoogleFormLabel ) -> "Google form:"
        ( EN, FeedbackRecommendedGoogleFormLabel ) -> "Google form:"
        ( SK, FeedbackRecommendedGoogleFormLabel ) -> "Google form:"
        ( UA, FeedbackRecommendedGoogleFormLabel ) -> "Google form:"

        ( RU, FeedbackFormSectionHint ) -> "Сообщения отправляются через Formspree и могут быть ограничены по количеству"
        ( EN, FeedbackFormSectionHint ) -> "Messages are sent through Formspree and may be rate-limited"
        ( SK, FeedbackFormSectionHint ) -> "Správy sa odosielajú cez Formspree a môžu byť obmedzené počtom"
        ( UA, FeedbackFormSectionHint ) -> "Повідомлення надсилаються через Formspree і можуть мати ліміти за кількістю"

        ( RU, FeedbackMailProviderLabel ) -> "Почтовый сервис:"
        ( EN, FeedbackMailProviderLabel ) -> "Mail service:"
        ( SK, FeedbackMailProviderLabel ) -> "Poštová služba:"
        ( UA, FeedbackMailProviderLabel ) -> "Поштовий сервіс:"

        ( RU, FeedbackMailProviderGmail ) -> "Gmail"
        ( EN, FeedbackMailProviderGmail ) -> "Gmail"
        ( SK, FeedbackMailProviderGmail ) -> "Gmail"
        ( UA, FeedbackMailProviderGmail ) -> "Gmail"

        ( RU, FeedbackMailProviderOutlook ) -> "Outlook"
        ( EN, FeedbackMailProviderOutlook ) -> "Outlook"
        ( SK, FeedbackMailProviderOutlook ) -> "Outlook"
        ( UA, FeedbackMailProviderOutlook ) -> "Outlook"

        ( RU, FeedbackDoNotModifyLabel ) -> "Не изменять"
        ( EN, FeedbackDoNotModifyLabel ) -> "Do not modify"
        ( SK, FeedbackDoNotModifyLabel ) -> "Neupravovať"
        ( UA, FeedbackDoNotModifyLabel ) -> "Не змінювати"

        ( RU, FeedbackDescribeDetailsLabel ) -> "Опишите как можно подробнее вашу проблему/предложение"
        ( EN, FeedbackDescribeDetailsLabel ) -> "Describe your issue/suggestion in as much detail as possible"
        ( SK, FeedbackDescribeDetailsLabel ) -> "Opíšte svoj problém/návrh čo najpodrobnejšie"
        ( UA, FeedbackDescribeDetailsLabel ) -> "Опишіть якомога детальніше вашу проблему/пропозицію"