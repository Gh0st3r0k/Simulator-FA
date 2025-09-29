module Design
    exposing
        ( Scale(..)
        , Size(..)
        , BorderKind(..)
        , Tokens
        , ControlSpec
        , CardSpec
        , tokens
        , control
        , card
        , borderFor
        , px
        )

-- SCALE / SIZE ---------------------------------------------------------------

type Scale
    = Small
    | Normal
    | Large
    | XLarge


type Size
    = S
    | M
    | L


-- Толщина рамки без слова "normal"
type BorderKind
    = BorderThin
    | BorderMid
    | BorderThick


-- SPECS ----------------------------------------------------------------------

type alias ControlSpec =
    { height : Int
    , padV : Int
    , padH : Int
    }


type alias CardSpec =
    { height : Int
    , padding : Int
    , radius : Int
    }


-- TOKENS ---------------------------------------------------------------------

type alias Tokens =
    { spacing :
        { xxs : Int, xs : Int, s : Int, m : Int, l : Int, xl : Int, xxl : Int
        }
    , radius  : { xs : Int, s : Int, m : Int, l : Int, xl : Int }
    , font    : { xs : Int, s : Int, base : Int, h3 : Int, h2 : Int, h1 : Int }
    , border  : { thin : Int, mid : Int, thick : Int, default : BorderKind }
    , outline : { width : Int }
    , elevation :
        { none : String, s : String, m : String, l : String
        }
    , control : { s : ControlSpec, m : ControlSpec, l : ControlSpec }
    , card    : { s : CardSpec, m : CardSpec, l : CardSpec }
    , icon    : { s : Int, m : Int, l : Int }
    , container : { maxContentWidth : Int, narrow : Int }
    , breakpoints :
        { bp320 : Int, bp360 : Int, bp375 : Int, bp390 : Int, bp412 : Int
        , bp768 : Int, bp1024 : Int, bp1280 : Int
        }
    , defaults : { control : Size, card : Size }
    , motion   : { fast : String, mid : String, slow : String, primary : String, easing : String }
    , line     : { base : String, tight : String, loose : String }
    , controlMinChars : Int
    , component : { menuCardTitle : Int }
    }


-- HELPERS --------------------------------------------------------------------

px : Int -> String
px n =
    String.fromInt n ++ "px"


control : Size -> Tokens -> ControlSpec
control sz tk =
    case sz of
        S -> tk.control.s
        M -> tk.control.m
        L -> tk.control.l


card : Size -> Tokens -> CardSpec
card sz tk =
    case sz of
        S -> tk.card.s
        M -> tk.card.m
        L -> tk.card.l


borderFor : BorderKind -> Tokens -> Int
borderFor kind tk =
    case kind of
        BorderThin  -> tk.border.thin
        BorderMid   -> tk.border.mid
        BorderThick -> tk.border.thick


-- BASE (UNSCALED) ------------------------------------------------------------

baseTokens : Tokens
baseTokens =
    { spacing = { xxs = 4, xs = 6, s = 8, m = 12, l = 16, xl = 20, xxl = 28 }
    , radius  = { xs = 6, s = 8, m = 10, l = 12, xl = 16 }
    , font    = { xs = 12, s = 13, base = 14, h3 = 16, h2 = 18, h1 = 22 }
    , border  = { thin = 1, mid = 1, thick = 2, default = BorderMid }
    , outline = { width = 2 }
    , elevation =
        { none = "none"
        , s = "0 4px 12px rgba(0,0,0,0.10)"
        , m = "0 6px 18px rgba(0,0,0,0.14)"
        , l = "0 10px 28px rgba(0,0,0,0.18)"
        }
    , control =
        { s = { height = 32, padV = 5,  padH = 10 }
        , m = { height = 36, padV = 6,  padH = 12 }
        , l = { height = 40, padV = 8,  padH = 14 }
        }
    , card =
        { s = { height = 48, padding = 12, radius = 10 }
        , m = { height = 52, padding = 14, radius = 10 }
        , l = { height = 56, padding = 16, radius = 12 }
        }
    , icon      = { s = 14, m = 18, l = 22 }
    , container = { maxContentWidth = 960, narrow = 420 }
    , breakpoints =
        { bp320 = 320, bp360 = 360, bp375 = 375, bp390 = 390, bp412 = 412
        , bp768 = 768, bp1024 = 1024, bp1280 = 1280
        }
    , defaults = { control = M, card = S }
    , motion   = { fast = "120ms", mid = "180ms", slow = "240ms", primary = "120ms", easing = "ease" }
    , line     = { base = "1.2", tight = "1.1", loose = "1.4" }
    , controlMinChars = 6
    , component = { menuCardTitle = 24 }
    }


-- SCALING ---------------------------------------------------------------------

scaleFactor : Scale -> Float
scaleFactor sc =
    case sc of
        Small  -> 0.94  -- чуть компактнее базы
        Normal -> 1.00
        Large  -> 1.08  -- «чуть-чуть» больше
        XLarge -> 1.24  -- заметно больше


scaleI : Float -> Int -> Int
scaleI k n =
    round (k * toFloat n)


-- PUBLIC: SCALED TOKENS ------------------------------------------------------

tokens : Scale -> Tokens
tokens sc =
    let
        k = scaleFactor sc
        b = baseTokens
    in
    { spacing =
        { xxs = scaleI k b.spacing.xxs
        , xs  = scaleI k b.spacing.xs
        , s   = scaleI k b.spacing.s
        , m   = scaleI k b.spacing.m
        , l   = scaleI k b.spacing.l
        , xl  = scaleI k b.spacing.xl
        , xxl = scaleI k b.spacing.xxl
        }
    , radius =
        { xs = scaleI k b.radius.xs
        , s  = scaleI k b.radius.s
        , m  = scaleI k b.radius.m
        , l  = scaleI k b.radius.l
        , xl = scaleI k b.radius.xl
        }
    , font =
        { xs   = scaleI k b.font.xs
        , s    = scaleI k b.font.s
        , base = scaleI k b.font.base
        , h3   = scaleI k b.font.h3
        , h2   = scaleI k b.font.h2
        , h1   = scaleI k b.font.h1
        }
    , border =
        { thin   = max 1 (scaleI k b.border.thin)
        , mid    = max 1 (scaleI k b.border.mid)
        , thick  = max 2 (scaleI k b.border.thick)
        , default = b.border.default
        }
    , outline = { width = max 2 (scaleI k b.outline.width) }
    , elevation = b.elevation
    , control =
        { s = { height = scaleI k b.control.s.height, padV = scaleI k b.control.s.padV, padH = scaleI k b.control.s.padH }
        , m = { height = scaleI k b.control.m.height, padV = scaleI k b.control.m.padV, padH = scaleI k b.control.m.padH }
        , l = { height = scaleI k b.control.l.height, padV = scaleI k b.control.l.padV, padH = scaleI k b.control.l.padH }
        }
    , card =
        { s = { height = scaleI k b.card.s.height, padding = scaleI k b.card.s.padding, radius = scaleI k b.card.s.radius }
        , m = { height = scaleI k b.card.m.height, padding = scaleI k b.card.m.padding, radius = scaleI k b.card.m.radius }
        , l = { height = scaleI k b.card.l.height, padding = scaleI k b.card.l.padding, radius = scaleI k b.card.l.radius }
        }
    , icon =
        { s = scaleI k b.icon.s
        , m = scaleI k b.icon.m
        , l = scaleI k b.icon.l
        }
    , container =
        { maxContentWidth = scaleI k b.container.maxContentWidth
        , narrow          = scaleI k b.container.narrow
        }
    , breakpoints = b.breakpoints
    , defaults = b.defaults
    , motion = b.motion
    , line   = b.line
    , controlMinChars = b.controlMinChars
    , component =
        { menuCardTitle = scaleI k b.component.menuCardTitle
        }
    }
