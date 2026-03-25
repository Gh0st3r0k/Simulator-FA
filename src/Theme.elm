module Theme
    exposing
        ( Theme(..)
        , toggle
        , bgColor
        , textColor
        , panelBg
        , panelBorder
        , interactiveBg
        , inputBg
        , interactiveBorder
        , hoverBg
        , hoverBorder
        , focusOutline
        , hoverShadow
        , successColor
        , warningColor
        , errorColor
        , stackEmptyBg
        , stackFillBg
        , stackBorder
        )

type Theme
    = Light
    | Dark


toggle : Theme -> Theme
toggle th =
    case th of
        Light -> Dark
        Dark -> Light


-- Фон страницы: светлая тема больше не белая, а светло-серая
bgColor : Theme -> String
bgColor th =
    case th of
        Light -> "#e0e3e7"   -- было #ffffff
        Dark  -> "#0f1115"


textColor : Theme -> String
textColor th =
    case th of
        Light -> "#111111"
        Dark  -> "#e6e6e6"


-- “Панель/карточка по умолчанию” – чуть темнее в светлой теме
panelBg : Theme -> String
panelBg th =
    case th of
        Light -> "#eef1f6"   -- было #f7f7f7
        Dark  -> "#151924"


panelBorder : Theme -> String
panelBorder th =
    case th of
        Light -> "#cfd6e4"   -- было #dddddd
        Dark  -> "#2a2f3a"


-- Базовый стиль интерактивных элементов (кнопки/селекты)
interactiveBg : Theme -> String
interactiveBg =
    panelBg


inputBg : Theme -> String
inputBg th =
    case th of
        Light -> "#e6ebf3"
        Dark -> "#1b2233"
        
        
interactiveBorder : Theme -> String
interactiveBorder =
    panelBorder


-- Ховер подсветка:
--  - в тёмной теме: сероватая
--  - в светлой теме: голубая/синяя
hoverBg : Theme -> String
hoverBg th =
    case th of
        Light -> "#e8eefc"   -- голубоватая заливка
        Dark  -> "#2a2f3a"   -- сероватая заливка


hoverBorder : Theme -> String
hoverBorder th =
    case th of
        Light -> "#7aa2ff"   -- контрастная синяя рамка
        Dark  -> panelBorder th


-- Контур (outline) при наведении/фокусе
focusOutline : Theme -> String
focusOutline th =
    case th of
        Light -> "#7aa2ff"
        Dark  -> "#8992a7"


-- Тень при ховере для карточек/кнопок
hoverShadow : Theme -> String
hoverShadow th =
    case th of
        Light -> "0 6px 18px rgba(0,0,0,0.12)"
        Dark  -> "0 6px 18px rgba(0,0,0,0.35)"




successColor : Theme -> String
successColor th =
    case th of
        Light -> "#1f9d55"
        Dark -> "#37d67a"


warningColor : Theme -> String
warningColor th =
    case th of
        Light -> "#c96a12"
        Dark -> "#f39c49"


errorColor : Theme -> String
errorColor th =
    case th of
        Light -> "#c0392b"
        Dark -> "#ff7666"


stackEmptyBg : Theme -> String
stackEmptyBg th =
    case th of
        Light -> "#f6f8fc"
        Dark -> "#1b2130"


stackFillBg : Theme -> String
stackFillBg th =
    case th of
        Light -> "#8fb3ff"
        Dark -> "#5c86ff"


stackBorder : Theme -> String
stackBorder th =
    case th of
        Light -> "#9db0d4"
        Dark -> "#3b4f77"