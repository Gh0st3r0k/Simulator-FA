module Theme exposing (Theme(..), toggle, bgColor, textColor, panelBg, panelBorder)

type Theme
    = Light
    | Dark

toggle : Theme -> Theme
toggle th =
    case th of
        Light -> Dark
        Dark -> Light

bgColor : Theme -> String
bgColor th =
    case th of
        Light -> "#ffffff"
        Dark -> "#0f1115"

textColor : Theme -> String
textColor th =
    case th of
        Light -> "#111111"
        Dark -> "#e6e6e6"

panelBg : Theme -> String
panelBg th =
    case th of
        Light -> "#f7f7f7"
        Dark -> "#151924"

panelBorder : Theme -> String
panelBorder th =
    case th of
        Light -> "#dddddd"
        Dark -> "#2a2f3a"
