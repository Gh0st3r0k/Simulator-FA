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


bgColor : Theme -> String
bgColor th =
    case th of
        Light -> "#e0e3e7"
        Dark  -> "#0f1115"


textColor : Theme -> String
textColor th =
    case th of
        Light -> "#111111"
        Dark  -> "#e6e6e6"


panelBg : Theme -> String
panelBg th =
    case th of
        Light -> "#eef1f6" 
        Dark  -> "#151924"


panelBorder : Theme -> String
panelBorder th =
    case th of
        Light -> "#cfd6e4" 
        Dark  -> "#2a2f3a"


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

hoverBg : Theme -> String
hoverBg th =
    case th of
        Light -> "#e8eefc"
        Dark  -> "#2a2f3a"


hoverBorder : Theme -> String
hoverBorder th =
    case th of
        Light -> "#7aa2ff"
        Dark  -> panelBorder th


focusOutline : Theme -> String
focusOutline th =
    case th of
        Light -> "#7aa2ff"
        Dark  -> "#8992a7"


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