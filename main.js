(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.b8.bM === region.cm.bM)
	{
		return 'on line ' + region.b8.bM;
	}
	return 'on lines ' + region.b8.bM + ' through ' + region.cm.bM;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (Object.prototype.hasOwnProperty.call(value, key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	var unwrapped = _Json_unwrap(value);
	if (!(key === 'toJSON' && typeof unwrapped === 'function'))
	{
		object[key] = unwrapped;
	}
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.c0,
		impl.dc,
		impl.da,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'outerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		bo: func(record.bo),
		cE: record.cE,
		cv: record.cv
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.bo;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.cE;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.cv) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.c0,
		impl.dc,
		impl.da,
		function(sendToApp, initialModel) {
			var view = impl.dd;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.c0,
		impl.dc,
		impl.da,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.b7 && impl.b7(sendToApp)
			var view = impl.dd;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.cK);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.ca) && (_VirtualDom_doc.title = title = doc.ca);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.c4;
	var onUrlRequest = impl.c5;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		b7: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.cy === next.cy
							&& curr.co === next.co
							&& curr.cu.a === next.cu.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		c0: function(flags)
		{
			return A3(impl.c0, flags, _Browser_getUrl(), key);
		},
		dd: impl.dd,
		dc: impl.dc,
		da: impl.da
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { c_: 'hidden', cT: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { c_: 'mozHidden', cT: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { c_: 'msHidden', cT: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { c_: 'webkitHidden', cT: 'webkitvisibilitychange' }
		: { c_: 'hidden', cT: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		cC: _Browser_getScene(),
		cH: {
			j: _Browser_window.pageXOffset,
			k: _Browser_window.pageYOffset,
			ce: _Browser_doc.documentElement.clientWidth,
			t: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		ce: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		t: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			cC: {
				ce: node.scrollWidth,
				t: node.scrollHeight
			},
			cH: {
				j: node.scrollLeft,
				k: node.scrollTop,
				ce: node.clientWidth,
				t: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			cC: _Browser_getScene(),
			cH: {
				j: x,
				k: y,
				ce: _Browser_doc.documentElement.clientWidth,
				t: _Browser_doc.documentElement.clientHeight
			},
			cX: {
				j: x + rect.left,
				k: y + rect.top,
				ce: rect.width,
				t: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}var $author$project$Main$LinkClicked = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$UrlChanged = function (a) {
	return {$: 1, a: a};
};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.x) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.C),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.C);
		} else {
			var treeLen = builder.x * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.F) : builder.F;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.x);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.C) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.C);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{F: nodeList, x: (len / $elm$core$Array$branchFactor) | 0, C: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {bW: fragment, co: host, cs: path, cu: port_, cy: protocol, cz: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Main$GmailProvider = 0;
var $author$project$Main$GotViewport = function (a) {
	return {$: 12, a: a};
};
var $author$project$Design$Large = 2;
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			A2(
				$elm$core$Task$onError,
				A2(
					$elm$core$Basics$composeL,
					A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
					$elm$core$Result$Err),
				A2(
					$elm$core$Task$andThen,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Ok),
					task)));
	});
var $author$project$AutomatonFormat$FiniteAutomaton = 0;
var $author$project$AutomatonFormat$StackAutomaton = 1;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$AutomatonFormat$decodeAutomatonType = A2(
	$elm$json$Json$Decode$andThen,
	function (rawType) {
		switch (rawType) {
			case 1:
				return $elm$json$Json$Decode$succeed(0);
			case 2:
				return $elm$json$Json$Decode$succeed(1);
			default:
				return $elm$json$Json$Decode$fail('unknown-automaton-type');
		}
	},
	$elm$json$Json$Decode$int);
var $elm$json$Json$Decode$map4 = _Json_map4;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Pages$Editor$decodeSaveSlot = A5(
	$elm$json$Json$Decode$map4,
	F4(
		function (id, name, automatonJson, automatonType) {
			return {aZ: automatonJson, cj: automatonType, a4: id, b3: name};
		}),
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'automatonJson', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'automatonType', $author$project$AutomatonFormat$decodeAutomatonType)));
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$Pages$Editor$defaultSaveSlots = function (count) {
	return A2(
		$elm$core$List$map,
		function (slotId) {
			return {aZ: '', cj: $elm$core$Maybe$Nothing, a4: slotId, b3: ''};
		},
		A2($elm$core$List$range, 1, count));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Pages$Editor$ensureSlotCount = F2(
	function (count, slots) {
		var byId = function (sid) {
			return A2(
				$elm$core$Maybe$withDefault,
				{aZ: '', cj: $elm$core$Maybe$Nothing, a4: sid, b3: ''},
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (slot) {
							return _Utils_eq(slot.a4, sid);
						},
						slots)));
		};
		return A2(
			$elm$core$List$map,
			byId,
			A2($elm$core$List$range, 1, count));
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Pages$Editor$decodeSaveSlots = function (raw) {
	var _v0 = A2(
		$elm$json$Json$Decode$decodeString,
		$elm$json$Json$Decode$list($author$project$Pages$Editor$decodeSaveSlot),
		raw);
	if (!_v0.$) {
		var slots = _v0.a;
		return A2($author$project$Pages$Editor$ensureSlotCount, 5, slots);
	} else {
		return $author$project$Pages$Editor$defaultSaveSlots(5);
	}
};
var $author$project$Pages$EditorStack$decodeSaveSlot = A5(
	$elm$json$Json$Decode$map4,
	F4(
		function (id, name, automatonJson, automatonType) {
			return {aZ: automatonJson, cj: automatonType, a4: id, b3: name};
		}),
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'automatonJson', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'automatonType', $author$project$AutomatonFormat$decodeAutomatonType)));
var $author$project$Pages$EditorStack$defaultSaveSlots = function (count) {
	return A2(
		$elm$core$List$map,
		function (slotId) {
			return {aZ: '', cj: $elm$core$Maybe$Nothing, a4: slotId, b3: ''};
		},
		A2($elm$core$List$range, 1, count));
};
var $author$project$Pages$EditorStack$ensureSlotCount = F2(
	function (count, slots) {
		var byId = function (sid) {
			return A2(
				$elm$core$Maybe$withDefault,
				{aZ: '', cj: $elm$core$Maybe$Nothing, a4: sid, b3: ''},
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (slot) {
							return _Utils_eq(slot.a4, sid);
						},
						slots)));
		};
		return A2(
			$elm$core$List$map,
			byId,
			A2($elm$core$List$range, 1, count));
	});
var $author$project$Pages$EditorStack$decodeSaveSlots = function (raw) {
	var _v0 = A2(
		$elm$json$Json$Decode$decodeString,
		$elm$json$Json$Decode$list($author$project$Pages$EditorStack$decodeSaveSlot),
		raw);
	if (!_v0.$) {
		var slots = _v0.a;
		return A2($author$project$Pages$EditorStack$ensureSlotCount, 5, slots);
	} else {
		return $author$project$Pages$EditorStack$defaultSaveSlots(5);
	}
};
var $author$project$Pages$EditorTuring$decodeSaveSlot = A5(
	$elm$json$Json$Decode$map4,
	F4(
		function (id, name, automatonJson, automatonType) {
			return {aZ: automatonJson, cj: automatonType, a4: id, b3: name};
		}),
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'automatonJson', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'automatonType', $author$project$AutomatonFormat$decodeAutomatonType)));
var $author$project$Pages$EditorTuring$defaultSaveSlots = function (count) {
	return A2(
		$elm$core$List$map,
		function (slotId) {
			return {aZ: '', cj: $elm$core$Maybe$Nothing, a4: slotId, b3: ''};
		},
		A2($elm$core$List$range, 1, count));
};
var $author$project$Pages$EditorTuring$ensureSlotCount = F2(
	function (count, slots) {
		var byId = function (sid) {
			return A2(
				$elm$core$Maybe$withDefault,
				{aZ: '', cj: $elm$core$Maybe$Nothing, a4: sid, b3: ''},
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (slot) {
							return _Utils_eq(slot.a4, sid);
						},
						slots)));
		};
		return A2(
			$elm$core$List$map,
			byId,
			A2($elm$core$List$range, 1, count));
	});
var $author$project$Pages$EditorTuring$decodeSaveSlots = function (raw) {
	var _v0 = A2(
		$elm$json$Json$Decode$decodeString,
		$elm$json$Json$Decode$list($author$project$Pages$EditorTuring$decodeSaveSlot),
		raw);
	if (!_v0.$) {
		var slots = _v0.a;
		return A2($author$project$Pages$EditorTuring$ensureSlotCount, 5, slots);
	} else {
		return $author$project$Pages$EditorTuring$defaultSaveSlots(5);
	}
};
var $author$project$Route$Editor = 2;
var $author$project$Route$EditorStack = 3;
var $author$project$Route$EditorTuring = 4;
var $author$project$Route$Home = 0;
var $author$project$Main$defaultRouteForStartPage = function (startPage) {
	switch (startPage) {
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		default:
			return 0;
	}
};
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $author$project$Pages$About$init = {};
var $author$project$Pages$Instructions$init = {};
var $author$project$Pages$Editor$AddState = 0;
var $author$project$Pages$Editor$Idle = 0;
var $author$project$Pages$Editor$initWithSlots = function (slots) {
	return {
		aN: $elm$core$Maybe$Nothing,
		aE: $elm$core$Maybe$Nothing,
		aG: false,
		aO: 0,
		a_: false,
		an: '',
		T: false,
		aP: 0,
		ab: false,
		bi: 0,
		bj: 0,
		ac: _List_Nil,
		ao: $elm$core$Maybe$Nothing,
		aR: $elm$core$Maybe$Nothing,
		aS: 0,
		z: 0,
		I: 1,
		p: 1,
		U: 0,
		V: 0,
		au: $elm$core$Maybe$Nothing,
		aI: $elm$core$Maybe$Nothing,
		af: '',
		ag: $elm$core$Maybe$Nothing,
		a6: false,
		e: A2($author$project$Pages$Editor$ensureSlotCount, 5, slots),
		h: $elm$core$Maybe$Nothing,
		s: $elm$core$Maybe$Nothing,
		Y: '',
		aa: $elm$core$Maybe$Nothing,
		P: $elm$core$Maybe$Nothing,
		J: $elm$core$Maybe$Nothing,
		aA: '500',
		av: _List_Nil,
		aB: '',
		Q: 0,
		R: _List_Nil,
		S: 0,
		aj: $elm$core$Maybe$Nothing,
		aJ: false,
		K: false,
		u: false,
		ak: false,
		c: _List_Nil,
		ah: $elm$core$Maybe$Nothing,
		a9: '',
		d: _List_Nil,
		cc: 800,
		cd: 1200,
		D: 1
	};
};
var $author$project$Pages$EditorStack$AddState = 0;
var $author$project$Pages$EditorStack$Idle = 0;
var $author$project$Pages$EditorStack$initWithSlots = function (slots) {
	return {
		aN: $elm$core$Maybe$Nothing,
		aE: $elm$core$Maybe$Nothing,
		aG: false,
		aO: 0,
		a_: false,
		an: '',
		T: false,
		aP: 0,
		ab: false,
		bi: 0,
		bj: 0,
		ac: _List_Nil,
		ao: $elm$core$Maybe$Nothing,
		aR: $elm$core$Maybe$Nothing,
		aS: 0,
		z: 0,
		I: 1,
		p: 1,
		U: 0,
		V: 0,
		au: $elm$core$Maybe$Nothing,
		aI: $elm$core$Maybe$Nothing,
		af: '',
		ag: $elm$core$Maybe$Nothing,
		a6: false,
		e: A2($author$project$Pages$EditorStack$ensureSlotCount, 5, slots),
		h: $elm$core$Maybe$Nothing,
		s: $elm$core$Maybe$Nothing,
		Y: '',
		Z: '',
		_: '',
		aa: $elm$core$Maybe$Nothing,
		P: $elm$core$Maybe$Nothing,
		J: $elm$core$Maybe$Nothing,
		aA: '500',
		av: _List_Nil,
		aB: '',
		Q: 0,
		R: _List_Nil,
		S: 0,
		aj: $elm$core$Maybe$Nothing,
		aJ: false,
		W: _List_fromArray(
			['Z']),
		K: false,
		u: false,
		ak: false,
		c: _List_Nil,
		ah: $elm$core$Maybe$Nothing,
		a9: '',
		bx: '',
		by: '',
		d: _List_Nil,
		cc: 800,
		cd: 1200,
		D: 1
	};
};
var $author$project$Pages$EditorTuring$AddState = 0;
var $author$project$Pages$EditorTuring$Idle = 0;
var $author$project$Pages$EditorTuring$initWithSlots = function (slots) {
	return {
		aN: $elm$core$Maybe$Nothing,
		aE: $elm$core$Maybe$Nothing,
		aG: false,
		aO: 0,
		a_: false,
		an: '',
		T: false,
		aP: 0,
		ab: false,
		bi: 0,
		bj: 0,
		ac: _List_Nil,
		ao: $elm$core$Maybe$Nothing,
		aR: $elm$core$Maybe$Nothing,
		aS: 0,
		z: 0,
		I: 1,
		p: 1,
		U: 0,
		V: 0,
		au: $elm$core$Maybe$Nothing,
		aI: $elm$core$Maybe$Nothing,
		af: '',
		ag: $elm$core$Maybe$Nothing,
		a6: false,
		e: A2($author$project$Pages$EditorTuring$ensureSlotCount, 5, slots),
		h: $elm$core$Maybe$Nothing,
		s: $elm$core$Maybe$Nothing,
		Y: '',
		Z: '',
		_: '',
		aa: $elm$core$Maybe$Nothing,
		P: $elm$core$Maybe$Nothing,
		J: $elm$core$Maybe$Nothing,
		aA: '500',
		av: _List_Nil,
		aB: '',
		Q: 0,
		R: _List_Nil,
		S: 0,
		aj: $elm$core$Maybe$Nothing,
		aJ: false,
		W: _List_Nil,
		K: false,
		u: false,
		ak: false,
		c: _List_Nil,
		ah: $elm$core$Maybe$Nothing,
		a9: '',
		bx: '',
		by: '',
		d: _List_Nil,
		cc: 800,
		cd: 1200,
		D: 1
	};
};
var $author$project$I18n$EN = 1;
var $author$project$I18n$RU = 0;
var $author$project$I18n$SK = 2;
var $author$project$I18n$UA = 3;
var $elm$core$String$toLower = _String_toLower;
var $author$project$I18n$langFromString = function (s) {
	var _v0 = $elm$core$String$toLower(s);
	switch (_v0) {
		case 'sk':
			return 2;
		case 'ru':
			return 0;
		case 'en':
			return 1;
		case 'ua':
			return 3;
		default:
			return 2;
	}
};
var $author$project$Route$About = 6;
var $author$project$Route$AutomatonMenu = 1;
var $author$project$Route$Instructions = 5;
var $author$project$Route$parseHash = function (mfrag) {
	if (mfrag.$ === 1) {
		return 0;
	} else {
		var frag = mfrag.a;
		switch (frag) {
			case '':
				return 0;
			case '/':
				return 0;
			case '/automaton':
				return 1;
			case '/editor':
				return 2;
			case '/editor-stack':
				return 3;
			case '/editor-turing':
				return 4;
			case '/instructions':
				return 5;
			case '/about':
				return 6;
			default:
				return 0;
		}
	}
};
var $author$project$Main$StartPageFinite = 2;
var $author$project$Main$StartPageHome = 1;
var $author$project$Main$StartPageStack = 3;
var $author$project$Main$StartPageTuring = 4;
var $author$project$Main$startPageFromInt = function (value) {
	switch (value) {
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		default:
			return 1;
	}
};
var $author$project$Theme$Dark = 1;
var $author$project$Theme$Light = 0;
var $author$project$Main$themeFromString = function (s) {
	var _v0 = $elm$core$String$toLower(s);
	switch (_v0) {
		case 'dark':
			return 1;
		case 'light':
			return 0;
		default:
			return 1;
	}
};
var $author$project$Main$init = F3(
	function (flags, url, key) {
		var startPage = $author$project$Main$startPageFromInt(flags.L);
		var parsedRoute = $author$project$Route$parseHash(url.bW);
		var initialRoute = function () {
			var _v0 = url.bW;
			if (_v0.$ === 1) {
				return $author$project$Main$defaultRouteForStartPage(startPage);
			} else {
				switch (_v0.a) {
					case '':
						return $author$project$Main$defaultRouteForStartPage(startPage);
					case '/':
						return $author$project$Main$defaultRouteForStartPage(startPage);
					default:
						return parsedRoute;
				}
			}
		}();
		return _Utils_Tuple2(
			{
				bd: $author$project$Pages$About$init,
				l: $author$project$Pages$Editor$initWithSlots(
					$author$project$Pages$Editor$decodeSaveSlots(flags.bf)),
				m: $author$project$Pages$EditorStack$initWithSlots(
					$author$project$Pages$EditorStack$decodeSaveSlots(flags.bf)),
				n: $author$project$Pages$EditorTuring$initWithSlots(
					$author$project$Pages$EditorTuring$decodeSaveSlots(flags.bf)),
				a1: '',
				bl: 0,
				bm: false,
				a2: '',
				bJ: $elm$core$Maybe$Nothing,
				bn: $author$project$Pages$Instructions$init,
				bL: key,
				b: $author$project$I18n$langFromString(flags.b),
				B: initialRoute,
				aV: 2,
				bs: false,
				L: startPage,
				a: $author$project$Main$themeFromString(flags.a),
				cb: url,
				aX: 800,
				aM: 1200,
				bT: !flags.L,
				bb: $elm$core$Maybe$Nothing
			},
			A2($elm$core$Task$attempt, $author$project$Main$GotViewport, $elm$browser$Browser$Dom$getViewport));
	});
var $author$project$Main$GotImportAutomatonFile = function (a) {
	return {$: 13, a: a};
};
var $author$project$Main$GotWhatsNew = function (a) {
	return {$: 23, a: a};
};
var $author$project$Main$ViewportChanged = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Main$importAutomatonFileResult = _Platform_incomingPort('importAutomatonFileResult', $elm$json$Json$Decode$value);
var $elm$browser$Browser$Events$Window = 1;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {ct: pids, cF: subs};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {cn: event, bL: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.ct,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.bL;
		var event = _v0.cn;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.cF);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Main$whatsNewDetected = _Platform_incomingPort('whatsNewDetected', $elm$json$Json$Decode$value);
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onResize($author$project$Main$ViewportChanged),
				$author$project$Main$importAutomatonFileResult($author$project$Main$GotImportAutomatonFile),
				$author$project$Main$whatsNewDetected($author$project$Main$GotWhatsNew)
			]));
};
var $author$project$Main$AboutMsg = function (a) {
	return {$: 10, a: a};
};
var $author$project$Pages$Editor$ApplyImportedSlot = F2(
	function (a, b) {
		return {$: 48, a: a, b: b};
	});
var $author$project$Pages$EditorStack$ApplyImportedSlot = F2(
	function (a, b) {
		return {$: 52, a: a, b: b};
	});
var $author$project$Pages$EditorTuring$ApplyImportedSlot = F2(
	function (a, b) {
		return {$: 52, a: a, b: b};
	});
var $author$project$Main$EditorMsg = function (a) {
	return {$: 6, a: a};
};
var $author$project$Main$EditorStackMsg = function (a) {
	return {$: 7, a: a};
};
var $author$project$Main$EditorTuringMsg = function (a) {
	return {$: 8, a: a};
};
var $author$project$Pages$Editor$ImportSlotFailed = {$: 49};
var $author$project$Pages$EditorStack$ImportSlotFailed = {$: 53};
var $author$project$Pages$EditorTuring$ImportSlotFailed = {$: 53};
var $author$project$Main$InstructionsMsg = function (a) {
	return {$: 9, a: a};
};
var $author$project$Pages$Editor$SetViewport = F2(
	function (a, b) {
		return {$: 33, a: a, b: b};
	});
var $author$project$Pages$EditorStack$SetViewport = F2(
	function (a, b) {
		return {$: 37, a: a, b: b};
	});
var $author$project$Pages$EditorTuring$SetViewport = F2(
	function (a, b) {
		return {$: 37, a: a, b: b};
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Main$decodeImportFileResult = A3(
	$elm$json$Json$Decode$map2,
	$elm$core$Tuple$pair,
	A2($elm$json$Json$Decode$field, 'slotId', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'content', $elm$json$Json$Decode$string));
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $author$project$Main$WhatsNewModal = F3(
	function (version, entries, showReloadWarning) {
		return {bV: entries, cD: showReloadWarning, bB: version};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$Main$WhatsNewEntry = F3(
	function (version, title, items) {
		return {cp: items, ca: title, bB: version};
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$Main$decodeWhatsNewEntry = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Main$WhatsNewEntry,
	A2($elm$json$Json$Decode$field, 'version', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'items',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
var $author$project$Main$decodeWhatsNewPayload = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Main$WhatsNewModal,
	A2($elm$json$Json$Decode$field, 'version', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'entries',
		$elm$json$Json$Decode$list($author$project$Main$decodeWhatsNewEntry)),
	A2($elm$json$Json$Decode$field, 'showReloadWarning', $elm$json$Json$Decode$bool));
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $author$project$AutomatonFormat$encodeAutomatonType = function (automatonType) {
	return $elm$json$Json$Encode$int(
		function () {
			if (!automatonType) {
				return 1;
			} else {
				return 2;
			}
		}());
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Pages$Editor$maybeAutomatonTypeValue = function (maybeAutomatonType) {
	if (!maybeAutomatonType.$) {
		var automatonType = maybeAutomatonType.a;
		return $author$project$AutomatonFormat$encodeAutomatonType(automatonType);
	} else {
		return $elm$json$Json$Encode$null;
	}
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Pages$Editor$encodeSaveSlots = function (slots) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		A2(
			$elm$json$Json$Encode$list,
			function (slot) {
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'id',
							$elm$json$Json$Encode$int(slot.a4)),
							_Utils_Tuple2(
							'name',
							$elm$json$Json$Encode$string(slot.b3)),
							_Utils_Tuple2(
							'automatonJson',
							$elm$json$Json$Encode$string(slot.aZ)),
							_Utils_Tuple2(
							'automatonType',
							$author$project$Pages$Editor$maybeAutomatonTypeValue(slot.cj))
						]));
			},
			slots));
};
var $author$project$Pages$EditorStack$maybeAutomatonTypeValue = function (maybeAutomatonType) {
	if (!maybeAutomatonType.$) {
		var automatonType = maybeAutomatonType.a;
		return $author$project$AutomatonFormat$encodeAutomatonType(automatonType);
	} else {
		return $elm$json$Json$Encode$null;
	}
};
var $author$project$Pages$EditorStack$encodeSaveSlots = function (slots) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		A2(
			$elm$json$Json$Encode$list,
			function (slot) {
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'id',
							$elm$json$Json$Encode$int(slot.a4)),
							_Utils_Tuple2(
							'name',
							$elm$json$Json$Encode$string(slot.b3)),
							_Utils_Tuple2(
							'automatonJson',
							$elm$json$Json$Encode$string(slot.aZ)),
							_Utils_Tuple2(
							'automatonType',
							$author$project$Pages$EditorStack$maybeAutomatonTypeValue(slot.cj))
						]));
			},
			slots));
};
var $author$project$Pages$EditorTuring$maybeAutomatonTypeValue = function (maybeAutomatonType) {
	if (!maybeAutomatonType.$) {
		var automatonType = maybeAutomatonType.a;
		return $author$project$AutomatonFormat$encodeAutomatonType(automatonType);
	} else {
		return $elm$json$Json$Encode$null;
	}
};
var $author$project$Pages$EditorTuring$encodeSaveSlots = function (slots) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		A2(
			$elm$json$Json$Encode$list,
			function (slot) {
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'id',
							$elm$json$Json$Encode$int(slot.a4)),
							_Utils_Tuple2(
							'name',
							$elm$json$Json$Encode$string(slot.b3)),
							_Utils_Tuple2(
							'automatonJson',
							$elm$json$Json$Encode$string(slot.aZ)),
							_Utils_Tuple2(
							'automatonType',
							$author$project$Pages$EditorTuring$maybeAutomatonTypeValue(slot.cj))
						]));
			},
			slots));
};
var $author$project$Main$exportAutomatonFile = _Platform_outgoingPort('exportAutomatonFile', $elm$core$Basics$identity);
var $author$project$AutomatonFormat$typeToStorageLabel = function (automatonType) {
	if (!automatonType) {
		return 'finite';
	} else {
		return 'stack';
	}
};
var $author$project$Main$exportFileName = F3(
	function (slotId, slotName, maybeAutomatonType) {
		var suffix = function () {
			if (!maybeAutomatonType.$) {
				var automatonType = maybeAutomatonType.a;
				return '-' + $author$project$AutomatonFormat$typeToStorageLabel(automatonType);
			} else {
				return '';
			}
		}();
		var baseName = $elm$core$String$isEmpty(slotName) ? ('slot-' + $elm$core$String$fromInt(slotId)) : slotName;
		return _Utils_ap(baseName, suffix);
	});
var $author$project$Main$importAutomatonFile = _Platform_outgoingPort('importAutomatonFile', $elm$json$Json$Encode$int);
var $author$project$I18n$langToString = function (l) {
	switch (l) {
		case 2:
			return 'sk';
		case 1:
			return 'en';
		case 0:
			return 'ru';
		default:
			return 'ua';
	}
};
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $author$project$Main$OutlookProvider = 1;
var $author$project$Main$mailProviderFromString = function (value) {
	if (value === 'outlook') {
		return 1;
	} else {
		return 0;
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$Main$markVersionSeen = _Platform_outgoingPort('markVersionSeen', $elm$json$Json$Encode$string);
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Basics$not = _Basics_not;
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$core$Basics$round = _Basics_round;
var $author$project$Main$saveAutomatonSlots = _Platform_outgoingPort('saveAutomatonSlots', $elm$json$Json$Encode$string);
var $author$project$Main$saveLang = _Platform_outgoingPort('saveLang', $elm$json$Json$Encode$string);
var $author$project$Main$saveStartPage = _Platform_outgoingPort('saveStartPage', $elm$json$Json$Encode$string);
var $author$project$Main$saveTheme = _Platform_outgoingPort('saveTheme', $elm$json$Json$Encode$string);
var $author$project$Main$startPageFromString = function (rawValue) {
	return $author$project$Main$startPageFromInt(
		A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$String$toInt(rawValue)));
};
var $author$project$Main$startPageToInt = function (startPage) {
	switch (startPage) {
		case 0:
			return 1;
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		default:
			return 4;
	}
};
var $author$project$Main$themeToString = function (theme) {
	if (theme === 1) {
		return 'dark';
	} else {
		return 'light';
	}
};
var $author$project$Route$toHash = function (route) {
	switch (route) {
		case 0:
			return '#/';
		case 1:
			return '#/automaton';
		case 2:
			return '#/editor';
		case 3:
			return '#/editor-stack';
		case 4:
			return '#/editor-turing';
		case 5:
			return '#/instructions';
		default:
			return '#/about';
	}
};
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.cy;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.bW,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.cz,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.cu,
					_Utils_ap(http, url.co)),
				url.cs)));
};
var $author$project$Theme$toggle = function (th) {
	if (!th) {
		return 1;
	} else {
		return 0;
	}
};
var $author$project$Pages$About$update = F2(
	function (_v0, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Editor$AddTransition = 1;
var $author$project$Pages$Editor$AutoRun = 0;
var $author$project$Pages$Editor$AutomatonTypeAnimationFinished = function (a) {
	return {$: 52, a: a};
};
var $author$project$Pages$Editor$CenterOnStartState = {$: 23};
var $author$project$Pages$Editor$ClearDeletedSlotAnimation = function (a) {
	return {$: 45, a: a};
};
var $author$project$Pages$Editor$ClearRecentlySavedSlot = function (a) {
	return {$: 43, a: a};
};
var $author$project$Pages$Editor$ClearSavedSlotAnimation = function (a) {
	return {$: 44, a: a};
};
var $author$project$Pages$Editor$ClearSlotImportError = {$: 50};
var $author$project$Pages$Editor$DeleteState = function (a) {
	return {$: 7, a: a};
};
var $author$project$Pages$Editor$DeleteTransition = function (a) {
	return {$: 8, a: a};
};
var $author$project$I18n$EditorAutomatonTypeMismatch = 58;
var $author$project$I18n$EditorSimulationBlockedByCodeErrors = 110;
var $author$project$I18n$EditorSimulationStopped = 104;
var $author$project$Pages$Editor$MoveState = 2;
var $author$project$Pages$Editor$NoOp = {$: 55};
var $author$project$Pages$Editor$SetMode = function (a) {
	return {$: 11, a: a};
};
var $author$project$Pages$Editor$StartSimulation = {$: 26};
var $author$project$Pages$Editor$StepRun = 1;
var $author$project$Pages$Editor$StopSimulation = {$: 34};
var $author$project$Pages$Editor$ToggleAccepting = function (a) {
	return {$: 10, a: a};
};
var $author$project$Pages$Editor$ToggleAutomatonTypeDetails = {$: 51};
var $author$project$Pages$Editor$ToggleStart = function (a) {
	return {$: 9, a: a};
};
var $author$project$Pages$Editor$TryParseCodeDraft = function (a) {
	return {$: 18, a: a};
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $author$project$Pages$Editor$AdvanceSimulation = {$: 28};
var $author$project$Pages$Editor$DeadEnd = 4;
var $author$project$Pages$Editor$Rejected = 3;
var $author$project$Pages$Editor$Running = 1;
var $author$project$Pages$Editor$Success = 2;
var $author$project$Pages$Editor$getStateById = F2(
	function (id, states) {
		return $elm$core$List$head(
			A2(
				$elm$core$List$filter,
				function (s) {
					return _Utils_eq(s.a4, id);
				},
				states));
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $author$project$Pages$Editor$isLambdaLabel = function (label) {
	return $elm$core$String$isEmpty(label);
};
var $author$project$Pages$Editor$hasLambdaFrom = F2(
	function (sid, transitions) {
		return A2(
			$elm$core$List$any,
			function (t) {
				return _Utils_eq(t.f, sid) && $author$project$Pages$Editor$isLambdaLabel(t.i);
			},
			transitions);
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$String$toFloat = _String_toFloat;
var $elm$core$String$trim = _String_trim;
var $author$project$Pages$Editor$parseDelay = function (raw) {
	var _v0 = $elm$core$String$toFloat(
		$elm$core$String$trim(raw));
	if (!_v0.$) {
		var n = _v0.a;
		return A2($elm$core$Basics$max, 0, n);
	} else {
		return 500;
	}
};
var $author$project$Pages$Editor$DismissGlobalNotice = function (a) {
	return {$: 53, a: a};
};
var $elm$core$Process$sleep = _Process_sleep;
var $author$project$Pages$Editor$showGlobalNotice = F2(
	function (key, model) {
		var nextNonce = model.aS + 1;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					aR: $elm$core$Maybe$Just(key),
					aS: nextNonce
				}),
			A2(
				$elm$core$Task$perform,
				function (_v0) {
					return $author$project$Pages$Editor$DismissGlobalNotice(nextNonce);
				},
				$elm$core$Process$sleep(5000)));
	});
var $author$project$I18n$EditorSimulationDeadEnd = 108;
var $author$project$I18n$EditorSimulationMissingStart = 109;
var $author$project$I18n$EditorSimulationRejected = 107;
var $author$project$I18n$EditorSimulationSuccess = 106;
var $author$project$Pages$Editor$simulationResultNoticeKey = function (result) {
	switch (result) {
		case 2:
			return $elm$core$Maybe$Just(106);
		case 3:
			return $elm$core$Maybe$Just(107);
		case 4:
			return $elm$core$Maybe$Just(108);
		case 5:
			return $elm$core$Maybe$Just(109);
		case 0:
			return $elm$core$Maybe$Nothing;
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Pages$Editor$applySimulationTransition = F5(
	function (transition, consumesInput, rest, queue, model) {
		var nextQueue = consumesInput ? rest : queue;
		var willContinue = (!$elm$core$List$isEmpty(nextQueue)) || A2($author$project$Pages$Editor$hasLambdaFrom, transition.g, model.d);
		var delay = $author$project$Pages$Editor$parseDelay(model.aA);
		var cmd = (willContinue && _Utils_eq(
			model.aj,
			$elm$core$Maybe$Just(0))) ? A2(
			$elm$core$Task$perform,
			function (_v2) {
				return $author$project$Pages$Editor$AdvanceSimulation;
			},
			$elm$core$Process$sleep(delay)) : $elm$core$Platform$Cmd$none;
		var nextResult = function () {
			if (willContinue) {
				return 1;
			} else {
				var _v1 = A2($author$project$Pages$Editor$getStateById, transition.g, model.c);
				if (!_v1.$) {
					var s = _v1.a;
					return (s.E && $elm$core$List$isEmpty(nextQueue)) ? 2 : ($elm$core$List$isEmpty(nextQueue) ? 3 : 4);
				} else {
					return 4;
				}
			}
		}();
		var nextModel = _Utils_update(
			model,
			{
				h: $elm$core$Maybe$Just(transition.g),
				aa: $elm$core$Maybe$Just(transition.a4),
				P: $elm$core$Maybe$Nothing,
				J: $elm$core$Maybe$Just(transition.g),
				Q: consumesInput ? (model.Q + 1) : model.Q,
				R: nextQueue,
				S: nextResult,
				aJ: willContinue && _Utils_eq(
					model.aj,
					$elm$core$Maybe$Just(0))
			});
		if (willContinue) {
			return _Utils_Tuple2(nextModel, cmd);
		} else {
			var _v0 = $author$project$Pages$Editor$simulationResultNoticeKey(nextResult);
			if (!_v0.$) {
				var key = _v0.a;
				return A2($author$project$Pages$Editor$showGlobalNotice, key, nextModel);
			} else {
				return _Utils_Tuple2(nextModel, $elm$core$Platform$Cmd$none);
			}
		}
	});
var $author$project$Pages$Editor$editorLayout = function (model) {
	var editorHeight = A2($elm$core$Basics$max, 560, model.cc - 90);
	var mainRowHeight = A2($elm$core$Basics$max, 320, editorHeight - 120);
	var canvasWidth = A2($elm$core$Basics$max, 360, model.cd - 860);
	var canvasHeight = mainRowHeight - 56;
	return {bg: canvasHeight, bh: canvasWidth, cW: editorHeight, c2: mainRowHeight};
};
var $author$project$Pages$Editor$findStartState = function (states) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filter,
			function ($) {
				return $.M;
			},
			states));
};
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Pages$Editor$preferredStartState = function (states) {
	var _v0 = $author$project$Pages$Editor$findStartState(states);
	if (!_v0.$) {
		var startState = _v0.a;
		return $elm$core$Maybe$Just(startState);
	} else {
		return $elm$core$List$head(
			A2(
				$elm$core$List$sortBy,
				function ($) {
					return $.a4;
				},
				states));
	}
};
var $author$project$Pages$Editor$centerOnPreferredStartState = function (model) {
	var _v0 = $author$project$Pages$Editor$preferredStartState(model.c);
	if (_v0.$ === 1) {
		return model;
	} else {
		var state = _v0.a;
		var layout = $author$project$Pages$Editor$editorLayout(model);
		return _Utils_update(
			model,
			{ao: $elm$core$Maybe$Nothing, U: (layout.bh / 2) - (state.j * model.D), V: (layout.bg / 2) - (state.k * model.D), au: $elm$core$Maybe$Nothing});
	}
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$Pages$Editor$clampZoom = function (value) {
	return A2(
		$elm$core$Basics$max,
		0.5,
		A2($elm$core$Basics$min, 2, value));
};
var $author$project$Pages$Editor$currentAutomatonType = 0;
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$Pages$Editor$normalizeTransitionLabel = function (raw) {
	return A2(
		$elm$core$String$left,
		1,
		$elm$core$String$trim(raw));
};
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Pages$Editor$uniqueLabels = function (labels) {
	var step = F2(
		function (label, acc) {
			return A2($elm$core$List$member, label, acc) ? acc : _Utils_ap(
				acc,
				_List_fromArray(
					[label]));
		});
	return A3($elm$core$List$foldl, step, _List_Nil, labels);
};
var $author$project$Pages$Editor$decodeJsonLabelToTokens = function (raw) {
	var parts = A2($elm$core$String$contains, ';', raw) ? A2($elm$core$String$split, ';', raw) : _List_fromArray(
		[raw]);
	var normalized = A2(
		$elm$core$List$filter,
		function (token) {
			return token !== '';
		},
		A2(
			$elm$core$List$map,
			function (token) {
				return (token === 'λ') ? '' : $author$project$Pages$Editor$normalizeTransitionLabel(token);
			},
			A2($elm$core$List$map, $elm$core$String$trim, parts)));
	return ($elm$core$String$trim(raw) === '') ? _List_fromArray(
		['']) : ($elm$core$List$isEmpty(normalized) ? _List_fromArray(
		['']) : $author$project$Pages$Editor$uniqueLabels(normalized));
};
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$map5 = _Json_map5;
var $author$project$Pages$Editor$decodeState = A2(
	$elm$json$Json$Decode$andThen,
	function (id) {
		return A6(
			$elm$json$Json$Decode$map5,
			F5(
				function (x, y, accepting, isStart, maybeName) {
					return {
						E: accepting,
						a4: id,
						M: isStart,
						b3: A2(
							$elm$core$Maybe$withDefault,
							$elm$core$String$fromInt(id),
							maybeName),
						j: x,
						k: y
					};
				}),
			A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'accepting', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'isStart', $elm$json$Json$Decode$bool),
			$elm$json$Json$Decode$maybe(
				A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string)));
	},
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int));
var $author$project$Pages$Editor$decodeTransition = A4(
	$elm$json$Json$Decode$map3,
	F3(
		function (from, to, label) {
			return {f: from, i: label, g: to};
		}),
	A2($elm$json$Json$Decode$field, 'from', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'to', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'label', $elm$json$Json$Decode$string));
var $author$project$Pages$Editor$decodeAutomaton = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (states, payloadTransitions) {
			var expanded = A2(
				$elm$core$List$indexedMap,
				F2(
					function (idx, transition) {
						return _Utils_update(
							transition,
							{a4: idx + 1});
					}),
				A2(
					$elm$core$List$concatMap,
					function (payload) {
						return A2(
							$elm$core$List$map,
							function (token) {
								return {f: payload.f, a4: 0, i: token, g: payload.g};
							},
							$author$project$Pages$Editor$decodeJsonLabelToTokens(payload.i));
					},
					payloadTransitions));
			return _Utils_Tuple2(states, expanded);
		}),
	A2(
		$elm$json$Json$Decode$field,
		'states',
		$elm$json$Json$Decode$list($author$project$Pages$Editor$decodeState)),
	A2(
		$elm$json$Json$Decode$field,
		'transitions',
		$elm$json$Json$Decode$list($author$project$Pages$Editor$decodeTransition)));
var $author$project$AutomatonFormat$decodeAutomatonDocument = F2(
	function (legacyType, automatonDecoder) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A3(
					$elm$json$Json$Decode$map2,
					F2(
						function (automatonType, automaton) {
							return {ci: automaton, cj: automatonType};
						}),
					A2($elm$json$Json$Decode$field, 'automatonType', $author$project$AutomatonFormat$decodeAutomatonType),
					A2($elm$json$Json$Decode$field, 'automaton', automatonDecoder)),
					A2(
					$elm$json$Json$Decode$map,
					function (automaton) {
						return {ci: automaton, cj: legacyType};
					},
					automatonDecoder)
				]));
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$json$Json$Encode$float = _Json_wrap;
var $author$project$Pages$Editor$encodeState = function (s) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(s.a4)),
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(s.b3)),
				_Utils_Tuple2(
				'x',
				$elm$json$Json$Encode$float(s.j)),
				_Utils_Tuple2(
				'y',
				$elm$json$Json$Encode$float(s.k)),
				_Utils_Tuple2(
				'accepting',
				$elm$json$Json$Encode$bool(s.E)),
				_Utils_Tuple2(
				'isStart',
				$elm$json$Json$Encode$bool(s.M))
			]));
};
var $author$project$Pages$Editor$encodeTransition = function (t) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(0)),
				_Utils_Tuple2(
				'from',
				$elm$json$Json$Encode$int(t.f)),
				_Utils_Tuple2(
				'to',
				$elm$json$Json$Encode$int(t.g)),
				_Utils_Tuple2(
				'label',
				$elm$json$Json$Encode$string(t.i))
			]));
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $author$project$Pages$Editor$groupTransitionsForRender = function (transitions) {
	var step = F2(
		function (transition, _v2) {
			var grouped = _v2.a;
			var order = _v2.b;
			var key = _Utils_Tuple2(transition.f, transition.g);
			var _v1 = A2($elm$core$Dict$get, key, grouped);
			if (!_v1.$) {
				var existing = _v1.a;
				return _Utils_Tuple2(
					A3(
						$elm$core$Dict$insert,
						key,
						_Utils_update(
							existing,
							{
								a5: _Utils_ap(
									existing.a5,
									_List_fromArray(
										[transition.i])),
								al: _Utils_ap(
									existing.al,
									_List_fromArray(
										[transition.a4]))
							}),
						grouped),
					order);
			} else {
				return _Utils_Tuple2(
					A3(
						$elm$core$Dict$insert,
						key,
						{
							f: transition.f,
							a5: _List_fromArray(
								[transition.i]),
							b6: transition.a4,
							g: transition.g,
							al: _List_fromArray(
								[transition.a4])
						},
						grouped),
					A2($elm$core$List$cons, key, order));
			}
		});
	var sortedTransitions = A2(
		$elm$core$List$sortBy,
		function ($) {
			return $.a4;
		},
		transitions);
	var _v0 = A3(
		$elm$core$List$foldl,
		step,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		sortedTransitions);
	var groupedByPair = _v0.a;
	var orderedKeysReversed = _v0.b;
	return A2(
		$elm$core$List$filterMap,
		function (key) {
			return A2($elm$core$Dict$get, key, groupedByPair);
		},
		$elm$core$List$reverse(orderedKeysReversed));
};
var $author$project$Pages$Editor$transitionLabelsForJson = function (labels) {
	return A2(
		$elm$core$String$join,
		';',
		A2(
			$elm$core$List$map,
			function (token) {
				return $author$project$Pages$Editor$isLambdaLabel(token) ? 'λ' : token;
			},
			$author$project$Pages$Editor$uniqueLabels(labels)));
};
var $author$project$Pages$Editor$encodeAutomaton = F2(
	function (states, transitions) {
		var groupedTransitions = A2(
			$elm$core$List$map,
			function (group) {
				return {
					f: group.f,
					i: $author$project$Pages$Editor$transitionLabelsForJson(group.a5),
					g: group.g
				};
			},
			$author$project$Pages$Editor$groupTransitionsForRender(transitions));
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'states',
					A2($elm$json$Json$Encode$list, $author$project$Pages$Editor$encodeState, states)),
					_Utils_Tuple2(
					'transitions',
					A2($elm$json$Json$Encode$list, $author$project$Pages$Editor$encodeTransition, groupedTransitions))
				]));
	});
var $author$project$AutomatonFormat$encodeAutomatonDocument = F2(
	function (automatonType, automatonValue) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'format',
					$elm$json$Json$Encode$string('fas')),
					_Utils_Tuple2(
					'version',
					$elm$json$Json$Encode$int(2)),
					_Utils_Tuple2(
					'automatonType',
					$author$project$AutomatonFormat$encodeAutomatonType(automatonType)),
					_Utils_Tuple2('automaton', automatonValue)
				]));
	});
var $author$project$Pages$Editor$stateDisplayName = function (state) {
	return $elm$core$String$isEmpty(
		$elm$core$String$trim(state.b3)) ? $elm$core$String$fromInt(state.a4) : state.b3;
};
var $author$project$Pages$Editor$stateNameById = F2(
	function (states, stateId) {
		var _v0 = A2($author$project$Pages$Editor$getStateById, stateId, states);
		if (!_v0.$) {
			var state = _v0.a;
			return $author$project$Pages$Editor$stateDisplayName(state);
		} else {
			return $elm$core$String$fromInt(stateId);
		}
	});
var $author$project$Pages$Editor$encodeTransitionLanguage = F2(
	function (states, transitions) {
		return A2(
			$elm$core$String$join,
			'\n',
			A2(
				$elm$core$List$map,
				function (tr) {
					return '(' + (A2($author$project$Pages$Editor$stateNameById, states, tr.f) + (', ' + (($author$project$Pages$Editor$isLambdaLabel(tr.i) ? 'λ' : tr.i) + (') => ' + A2($author$project$Pages$Editor$stateNameById, states, tr.g)))));
				},
				A2(
					$elm$core$List$sortBy,
					function ($) {
						return $.a4;
					},
					transitions)));
	});
var $author$project$Pages$Editor$ensureSingleStart = F2(
	function (id, states) {
		return A2(
			$elm$core$List$map,
			function (s) {
				return _Utils_update(
					s,
					{
						M: _Utils_eq(s.a4, id)
					});
			},
			states);
	});
var $author$project$Pages$Editor$enforceSingleStartFlag = function (states) {
	var _v0 = A2(
		$elm$core$List$filter,
		function ($) {
			return $.M;
		},
		states);
	if (!_v0.b) {
		return states;
	} else {
		var s = _v0.a;
		return A2($author$project$Pages$Editor$ensureSingleStart, s.a4, states);
	}
};
var $elm$browser$Browser$Dom$focus = _Browser_call('focus');
var $author$project$Pages$Editor$hasCodeValidationErrors = function (model) {
	return !$elm$core$List$isEmpty(model.ac);
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$Pages$Editor$unique = F2(
	function (value, acc) {
		return A2($elm$core$List$member, value, acc) ? acc : A2($elm$core$List$cons, value, acc);
	});
var $author$project$Pages$Editor$hasDuplicateStateNames = function (states) {
	var names = A2(
		$elm$core$List$map,
		A2($elm$core$Basics$composeR, $author$project$Pages$Editor$stateDisplayName, $elm$core$String$trim),
		states);
	return !_Utils_eq(
		$elm$core$List$length(names),
		$elm$core$List$length(
			A3($elm$core$List$foldl, $author$project$Pages$Editor$unique, _List_Nil, names)));
};
var $author$project$Pages$Editor$normalizeTransitionIds = function (transitions) {
	var step = F2(
		function (transition, _v1) {
			var nextId = _v1.a;
			var acc = _v1.b;
			return _Utils_Tuple2(
				nextId + 1,
				A2(
					$elm$core$List$cons,
					_Utils_update(
						transition,
						{a4: nextId}),
					acc));
		});
	var sorted = A2(
		$elm$core$List$sortBy,
		function ($) {
			return $.a4;
		},
		transitions);
	var _v0 = A3(
		$elm$core$List$foldl,
		step,
		_Utils_Tuple2(1, _List_Nil),
		sorted);
	var nextTransitionId = _v0.a;
	var reversed = _v0.b;
	return {
		p: nextTransitionId,
		d: $elm$core$List$reverse(reversed)
	};
};
var $author$project$Pages$Editor$normalizeAutomatonIds = F2(
	function (states, transitions) {
		var sortedStates = A2(
			$elm$core$List$sortBy,
			function ($) {
				return $.a4;
			},
			states);
		var renumberStates = F2(
			function (state, _v1) {
				var nextId = _v1.a;
				var mapping = _v1.b;
				var acc = _v1.c;
				var normalizedName = ($elm$core$String$isEmpty(
					$elm$core$String$trim(state.b3)) || _Utils_eq(
					state.b3,
					$elm$core$String$fromInt(state.a4))) ? $elm$core$String$fromInt(nextId) : state.b3;
				var newState = _Utils_update(
					state,
					{a4: nextId, b3: normalizedName});
				return _Utils_Tuple3(
					nextId + 1,
					A3($elm$core$Dict$insert, state.a4, nextId, mapping),
					A2($elm$core$List$cons, newState, acc));
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			renumberStates,
			_Utils_Tuple3(1, $elm$core$Dict$empty, _List_Nil),
			sortedStates);
		var nextStateId = _v0.a;
		var stateIdMap = _v0.b;
		var reversedStates = _v0.c;
		var remapStateId = function (oldId) {
			return A2(
				$elm$core$Maybe$withDefault,
				oldId,
				A2($elm$core$Dict$get, oldId, stateIdMap));
		};
		var remappedTransitions = A2(
			$elm$core$List$map,
			function (transition) {
				return _Utils_update(
					transition,
					{
						f: remapStateId(transition.f),
						g: remapStateId(transition.g)
					});
			},
			transitions);
		var normalizedTransitions = $author$project$Pages$Editor$normalizeTransitionIds(remappedTransitions);
		return {
			I: nextStateId,
			p: normalizedTransitions.p,
			c: $elm$core$List$reverse(reversedStates),
			d: normalizedTransitions.d
		};
	});
var $author$project$Pages$Editor$normalizeTransitionLabels = function (raw) {
	var normalized = A2(
		$elm$core$List$map,
		function (token) {
			return (token === 'λ') ? '' : $author$project$Pages$Editor$normalizeTransitionLabel(token);
		},
		A2(
			$elm$core$List$map,
			$elm$core$String$trim,
			A2($elm$core$String$split, ';', raw)));
	return ($elm$core$String$trim(raw) === '') ? _List_fromArray(
		['']) : $author$project$Pages$Editor$uniqueLabels(normalized);
};
var $author$project$Pages$Editor$panWithWheel = F3(
	function (dx, dy, model) {
		return _Utils_update(
			model,
			{ao: $elm$core$Maybe$Nothing, U: model.U - dx, V: model.V - dy, au: $elm$core$Maybe$Nothing});
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === -2) {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Pages$Editor$buildAutomatonFromParsedTransitions = F2(
	function (existingStates, parsedTransitions) {
		var spacingY = 100;
		var spacingX = 160;
		var placeState = F2(
			function (fallbackName, positions) {
				var _v20 = A2($elm$core$Dict$get, fallbackName, positions);
				if (!_v20.$) {
					return positions;
				} else {
					var index = $elm$core$Dict$size(positions);
					var xCol = (index / 5) | 0;
					var yRow = index % 5;
					return A3(
						$elm$core$Dict$insert,
						fallbackName,
						_Utils_Tuple2(100 + (xCol * spacingX), 100 + (yRow * spacingY)),
						positions);
				}
			});
		var placeFromTo = F2(
			function (transition, positions) {
				placeFromTo:
				while (true) {
					var toPosition = A2($elm$core$Dict$get, transition.aK, positions);
					var fromPosition = A2($elm$core$Dict$get, transition.ay, positions);
					var _v0 = _Utils_Tuple2(fromPosition, toPosition);
					if (!_v0.a.$) {
						if (_v0.b.$ === 1) {
							var _v1 = _v0.a.a;
							var fx = _v1.a;
							var fy = _v1.b;
							var _v2 = _v0.b;
							return A3(
								$elm$core$Dict$insert,
								transition.aK,
								_Utils_Tuple2(fx + spacingX, fy),
								positions);
						} else {
							return positions;
						}
					} else {
						if (!_v0.b.$) {
							var _v3 = _v0.a;
							var _v4 = _v0.b.a;
							var tx = _v4.a;
							var ty = _v4.b;
							return A3(
								$elm$core$Dict$insert,
								transition.ay,
								_Utils_Tuple2(tx - spacingX, ty),
								positions);
						} else {
							var _v5 = _v0.a;
							var _v6 = _v0.b;
							var seeded = A2(placeState, transition.ay, positions);
							var $temp$transition = transition,
								$temp$positions = seeded;
							transition = $temp$transition;
							positions = $temp$positions;
							continue placeFromTo;
						}
					}
				}
			});
		var names = A3(
			$elm$core$List$foldl,
			F2(
				function (name, acc) {
					return A2($elm$core$List$member, name, acc) ? acc : _Utils_ap(
						acc,
						_List_fromArray(
							[name]));
				}),
			_List_Nil,
			A2(
				$elm$core$List$concatMap,
				function (t) {
					return _List_fromArray(
						[t.ay, t.aK]);
				},
				parsedTransitions));
		var isOccupied = F2(
			function (occupied, _v19) {
				var x = _v19.a;
				var y = _v19.b;
				return A2(
					$elm$core$List$any,
					function (_v18) {
						var ox = _v18.a;
						var oy = _v18.b;
						return _Utils_eq(ox, x) && _Utils_eq(oy, y);
					},
					occupied);
			});
		var placeWithoutOverlap = F2(
			function (occupied, _v7) {
				placeWithoutOverlap:
				while (true) {
					var x = _v7.a;
					var y = _v7.b;
					if (A2(
						isOccupied,
						occupied,
						_Utils_Tuple2(x, y))) {
						var $temp$occupied = occupied,
							$temp$_v7 = _Utils_Tuple2(x, y + spacingY);
						occupied = $temp$occupied;
						_v7 = $temp$_v7;
						continue placeWithoutOverlap;
					} else {
						return _Utils_Tuple2(x, y);
					}
				}
			});
		var indexedNames = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, name) {
					return _Utils_Tuple2(name, idx + 1);
				}),
			names);
		var idByName = $elm$core$Dict$fromList(indexedNames);
		var transitions = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, tr) {
					return {
						f: A2(
							$elm$core$Maybe$withDefault,
							1,
							A2($elm$core$Dict$get, tr.ay, idByName)),
						a4: idx + 1,
						i: tr.i,
						g: A2(
							$elm$core$Maybe$withDefault,
							1,
							A2($elm$core$Dict$get, tr.aK, idByName))
					};
				}),
			parsedTransitions);
		var findAnchorFromOutgoing = F2(
			function (name, positions) {
				return A2(
					$elm$core$Maybe$andThen,
					function (tr) {
						return A2($elm$core$Dict$get, tr.aK, positions);
					},
					$elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (tr) {
								return _Utils_eq(tr.ay, name);
							},
							parsedTransitions)));
			});
		var findAnchorFromIncoming = F2(
			function (name, positions) {
				return A2(
					$elm$core$Maybe$andThen,
					function (tr) {
						return A2($elm$core$Dict$get, tr.ay, positions);
					},
					$elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (tr) {
								return _Utils_eq(tr.aK, name);
							},
							parsedTransitions)));
			});
		var placeUnresolved = F2(
			function (namesToPlace, positions) {
				placeUnresolved:
				while (true) {
					if ($elm$core$List$isEmpty(namesToPlace)) {
						return positions;
					} else {
						var step = F2(
							function (name, _v15) {
								var accPositions = _v15.a;
								var unresolved = _v15.b;
								var hasProgress = _v15.c;
								var _v10 = A2($elm$core$Dict$get, name, accPositions);
								if (!_v10.$) {
									return _Utils_Tuple3(accPositions, unresolved, hasProgress);
								} else {
									var occupied = $elm$core$Dict$values(accPositions);
									var _v11 = A2(findAnchorFromIncoming, name, accPositions);
									if (!_v11.$) {
										var _v12 = _v11.a;
										var ax = _v12.a;
										var ay = _v12.b;
										var target = A2(
											placeWithoutOverlap,
											occupied,
											_Utils_Tuple2(ax + spacingX, ay));
										return _Utils_Tuple3(
											A3($elm$core$Dict$insert, name, target, accPositions),
											unresolved,
											true);
									} else {
										var _v13 = A2(findAnchorFromOutgoing, name, accPositions);
										if (!_v13.$) {
											var _v14 = _v13.a;
											var tx = _v14.a;
											var ty = _v14.b;
											var target = A2(
												placeWithoutOverlap,
												occupied,
												_Utils_Tuple2(tx + spacingX, ty));
											return _Utils_Tuple3(
												A3($elm$core$Dict$insert, name, target, accPositions),
												unresolved,
												true);
										} else {
											return _Utils_Tuple3(
												accPositions,
												_Utils_ap(
													unresolved,
													_List_fromArray(
														[name])),
												hasProgress);
										}
									}
								}
							});
						var _v8 = A3(
							$elm$core$List$foldl,
							step,
							_Utils_Tuple3(positions, _List_Nil, false),
							namesToPlace);
						var progressedPositions = _v8.a;
						var unresolvedNames = _v8.b;
						var didProgress = _v8.c;
						if (didProgress) {
							var $temp$namesToPlace = unresolvedNames,
								$temp$positions = progressedPositions;
							namesToPlace = $temp$namesToPlace;
							positions = $temp$positions;
							continue placeUnresolved;
						} else {
							var fallback = F2(
								function (name, acc) {
									var _v9 = A2($elm$core$Dict$get, name, acc);
									if (!_v9.$) {
										return acc;
									} else {
										var index = $elm$core$Dict$size(acc);
										var xCol = (index / 5) | 0;
										var yRow = index % 5;
										var candidate = _Utils_Tuple2(100 + (xCol * spacingX), 100 + (yRow * spacingY));
										var target = A2(
											placeWithoutOverlap,
											$elm$core$Dict$values(acc),
											candidate);
										return A3($elm$core$Dict$insert, name, target, acc);
									}
								});
							return A3($elm$core$List$foldl, fallback, progressedPositions, unresolvedNames);
						}
					}
				}
			});
		var existingStateByName = A3(
			$elm$core$List$foldl,
			F2(
				function (state, acc) {
					return A3(
						$elm$core$Dict$insert,
						$author$project$Pages$Editor$stateDisplayName(state),
						state,
						acc);
				}),
			$elm$core$Dict$empty,
			existingStates);
		var existingPositionsByName = A3(
			$elm$core$List$foldl,
			F2(
				function (state, acc) {
					return A3(
						$elm$core$Dict$insert,
						$author$project$Pages$Editor$stateDisplayName(state),
						_Utils_Tuple2(state.j, state.k),
						acc);
				}),
			$elm$core$Dict$empty,
			existingStates);
		var seededPositions = A3($elm$core$List$foldl, placeFromTo, existingPositionsByName, parsedTransitions);
		var allPositions = A2(placeUnresolved, names, seededPositions);
		var states = A2(
			$elm$core$List$map,
			function (_v16) {
				var name = _v16.a;
				var sid = _v16.b;
				var maybeExistingState = A2($elm$core$Dict$get, name, existingStateByName);
				var _v17 = A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(100, 100),
					A2($elm$core$Dict$get, name, allPositions));
				var x = _v17.a;
				var y = _v17.b;
				return {
					E: A2(
						$elm$core$Maybe$withDefault,
						false,
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.E;
							},
							maybeExistingState)),
					a4: sid,
					M: A2(
						$elm$core$Maybe$withDefault,
						sid === 1,
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.M;
							},
							maybeExistingState)),
					b3: name,
					j: x,
					k: y
				};
			},
			indexedNames);
		return _Utils_Tuple2(states, transitions);
	});
var $elm$core$String$lines = _String_lines;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$String$endsWith = _String_endsWith;
var $author$project$Pages$Editor$parseTransitionLine = function (line) {
	var _v0 = A2($elm$core$String$split, '=>', line);
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var leftRaw = _v0.a;
		var _v1 = _v0.b;
		var rightRaw = _v1.a;
		var right = $elm$core$String$trim(rightRaw);
		var left = $elm$core$String$trim(leftRaw);
		if (A2($elm$core$String$startsWith, '(', left) && A2($elm$core$String$endsWith, ')', left)) {
			var inside = A2(
				$elm$core$String$dropRight,
				1,
				A2($elm$core$String$dropLeft, 1, left));
			var parts = A2(
				$elm$core$List$map,
				$elm$core$String$trim,
				A2($elm$core$String$split, ',', inside));
			if ((parts.b && parts.b.b) && (!parts.b.b.b)) {
				var fromName = parts.a;
				var _v3 = parts.b;
				var condition = _v3.a;
				return ($elm$core$String$isEmpty(fromName) || $elm$core$String$isEmpty(right)) ? $elm$core$Result$Err(line) : $elm$core$Result$Ok(
					{
						ay: fromName,
						i: (condition === 'λ') ? '' : $author$project$Pages$Editor$normalizeTransitionLabel(condition),
						aK: right
					});
			} else {
				return $elm$core$Result$Err(line);
			}
		} else {
			return $elm$core$Result$Err(line);
		}
	} else {
		return $elm$core$Result$Err(line);
	}
};
var $author$project$Pages$Editor$traverseResults = F2(
	function (f, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (item, acc) {
					var _v0 = _Utils_Tuple2(
						f(item),
						acc);
					if (!_v0.a.$) {
						if (!_v0.b.$) {
							var v = _v0.a.a;
							var vs = _v0.b.a;
							return $elm$core$Result$Ok(
								A2($elm$core$List$cons, v, vs));
						} else {
							var e = _v0.b.a;
							return $elm$core$Result$Err(e);
						}
					} else {
						var e = _v0.a.a;
						return $elm$core$Result$Err(e);
					}
				}),
			$elm$core$Result$Ok(_List_Nil),
			list);
	});
var $author$project$Pages$Editor$decodeTransitionLanguage = F2(
	function (existingStates, raw) {
		var lines = A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
			A2(
				$elm$core$List$map,
				$elm$core$String$trim,
				$elm$core$String$lines(raw)));
		var _v0 = A2($author$project$Pages$Editor$traverseResults, $author$project$Pages$Editor$parseTransitionLine, lines);
		if (_v0.$ === 1) {
			var err = _v0.a;
			return $elm$core$Result$Err(err);
		} else {
			var parsedTransitions = _v0.a;
			return $elm$core$Result$Ok(
				A2($author$project$Pages$Editor$buildAutomatonFromParsedTransitions, existingStates, parsedTransitions));
		}
	});
var $author$project$Pages$Editor$parseCodeDraftToAutomaton = F2(
	function (model, draft) {
		var _v0 = A2($elm$json$Json$Decode$decodeString, $author$project$Pages$Editor$decodeAutomaton, draft);
		if (!_v0.$) {
			var _v1 = _v0.a;
			var ss = _v1.a;
			var ts = _v1.b;
			if ($author$project$Pages$Editor$hasDuplicateStateNames(ss)) {
				return $elm$core$Result$Err('duplicate-state-names');
			} else {
				var normalizedStates = $author$project$Pages$Editor$enforceSingleStartFlag(ss);
				return $elm$core$Result$Ok(
					A2($author$project$Pages$Editor$normalizeAutomatonIds, normalizedStates, ts));
			}
		} else {
			var _v2 = A2($author$project$Pages$Editor$decodeTransitionLanguage, model.c, draft);
			if (!_v2.$) {
				var _v3 = _v2.a;
				var ss = _v3.a;
				var ts = _v3.b;
				return $elm$core$Result$Ok(
					A2($author$project$Pages$Editor$normalizeAutomatonIds, ss, ts));
			} else {
				return $elm$core$Result$Err('parse-failed');
			}
		}
	});
var $author$project$Pages$Editor$transitionLabelsToEditorText = function (labels) {
	return A2($elm$core$String$join, ';', labels);
};
var $author$project$Pages$Editor$sanitizeTransitionEditorInput = function (raw) {
	return ($elm$core$String$trim(raw) === '') ? '' : $author$project$Pages$Editor$transitionLabelsToEditorText(
		$author$project$Pages$Editor$normalizeTransitionLabels(raw));
};
var $author$project$Pages$Editor$screenToWorld = F3(
	function (model, x, y) {
		return _Utils_Tuple2((x - model.U) / model.D, (y - model.V) / model.D);
	});
var $author$project$Pages$Editor$simulationSpeedStops = _List_fromArray(
	[10, 250, 500, 750, 1000]);
var $author$project$Pages$Editor$simulationDelayFromSpeedIndex = function (rawIndex) {
	var _v0 = $elm$core$String$toInt(rawIndex);
	if (_v0.$ === 1) {
		return '500';
	} else {
		var index = _v0.a;
		return A2(
			$elm$core$Maybe$withDefault,
			'500',
			A2(
				$elm$core$Maybe$map,
				$elm$core$String$fromInt,
				$elm$core$List$head(
					A2($elm$core$List$drop, index, $author$project$Pages$Editor$simulationSpeedStops))));
	}
};
var $author$project$Pages$Editor$simulationSessionActive = function (model) {
	return !_Utils_eq(model.aj, $elm$core$Maybe$Nothing);
};
var $author$project$Pages$Editor$slotTypeMismatch = function (maybeAutomatonType) {
	if (!maybeAutomatonType.$) {
		var automatonType = maybeAutomatonType.a;
		return !_Utils_eq(automatonType, $author$project$Pages$Editor$currentAutomatonType);
	} else {
		return false;
	}
};
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $author$project$Pages$Editor$MissingStart = 5;
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $author$project$Pages$Editor$startSimulation = F2(
	function (runMode, model) {
		var _v0 = $author$project$Pages$Editor$findStartState(model.c);
		if (_v0.$ === 1) {
			return A2(
				$author$project$Pages$Editor$showGlobalNotice,
				109,
				_Utils_update(
					model,
					{S: 5}));
		} else {
			var startState = _v0.a;
			var queue = $elm$core$String$toList(model.aB);
			var willRun = (!$elm$core$List$isEmpty(queue)) || A2($author$project$Pages$Editor$hasLambdaFrom, startState.a4, model.d);
			var initialResult = willRun ? 1 : (startState.E ? 2 : 3);
			var delay = $author$project$Pages$Editor$parseDelay(model.aA);
			var cmd = (willRun && (!runMode)) ? A2(
				$elm$core$Task$perform,
				function (_v2) {
					return $author$project$Pages$Editor$AdvanceSimulation;
				},
				$elm$core$Process$sleep(delay)) : $elm$core$Platform$Cmd$none;
			var nextModel = _Utils_update(
				model,
				{
					h: $elm$core$Maybe$Just(startState.a4),
					aa: $elm$core$Maybe$Nothing,
					P: $elm$core$Maybe$Nothing,
					J: $elm$core$Maybe$Just(startState.a4),
					av: _List_Nil,
					Q: 0,
					R: queue,
					S: initialResult,
					aj: $elm$core$Maybe$Just(runMode),
					aJ: willRun && (!runMode)
				});
			if (willRun) {
				return _Utils_Tuple2(nextModel, cmd);
			} else {
				var _v1 = $author$project$Pages$Editor$simulationResultNoticeKey(initialResult);
				if (!_v1.$) {
					var key = _v1.a;
					return A2($author$project$Pages$Editor$showGlobalNotice, key, nextModel);
				} else {
					return _Utils_Tuple2(nextModel, $elm$core$Platform$Cmd$none);
				}
			}
		}
	});
var $author$project$Pages$Editor$centerChoiceInCanvas = F2(
	function (sid, model) {
		var _v0 = A2($author$project$Pages$Editor$getStateById, sid, model.c);
		if (_v0.$ === 1) {
			return model;
		} else {
			var state = _v0.a;
			var popupWidth = 280;
			var popupHeight = 140;
			var popupGap = 24;
			var layout = $author$project$Pages$Editor$editorLayout(model);
			var targetPanX = (((layout.bh / 2) + (popupWidth / 2)) + popupGap) - state.j;
			var targetPanY = ((layout.bg / 2) + (popupHeight / 2)) - state.k;
			return _Utils_update(
				model,
				{U: targetPanX, V: targetPanY});
		}
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $author$project$Pages$Editor$stopSimulation = F2(
	function (result, model) {
		return _Utils_update(
			model,
			{aa: $elm$core$Maybe$Nothing, P: $elm$core$Maybe$Nothing, J: $elm$core$Maybe$Nothing, av: _List_Nil, Q: 0, R: _List_Nil, S: result, aj: $elm$core$Maybe$Nothing, aJ: false});
	});
var $author$project$Pages$Editor$stopSimulationWithNotice = F2(
	function (result, model) {
		var nextModel = A2($author$project$Pages$Editor$stopSimulation, result, model);
		var _v0 = $author$project$Pages$Editor$simulationResultNoticeKey(result);
		if (!_v0.$) {
			var key = _v0.a;
			return A2($author$project$Pages$Editor$showGlobalNotice, key, nextModel);
		} else {
			return _Utils_Tuple2(nextModel, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$Editor$stepSimulation = function (model) {
	var _v0 = _Utils_Tuple2(model.J, model.R);
	if (_v0.a.$ === 1) {
		var _v1 = _v0.a;
		return A2($author$project$Pages$Editor$stopSimulationWithNotice, 4, model);
	} else {
		var sid = _v0.a.a;
		var queue = _v0.b;
		var lambdaMatches = A2(
			$elm$core$List$filter,
			function (t) {
				return _Utils_eq(t.f, sid) && $author$project$Pages$Editor$isLambdaLabel(t.i);
			},
			model.d);
		var _v2 = function () {
			if (!queue.b) {
				return _Utils_Tuple2($elm$core$Maybe$Nothing, _List_Nil);
			} else {
				var c = queue.a;
				var remaining = queue.b;
				return _Utils_Tuple2(
					$elm$core$Maybe$Just(
						$elm$core$String$fromChar(c)),
					remaining);
			}
		}();
		var maybeChar = _v2.a;
		var rest = _v2.b;
		var charMatches = function () {
			if (maybeChar.$ === 1) {
				return _List_Nil;
			} else {
				var lbl = maybeChar.a;
				return A2(
					$elm$core$List$filter,
					function (t) {
						return _Utils_eq(t.f, sid) && _Utils_eq(t.i, lbl);
					},
					model.d);
			}
		}();
		var _v4 = $elm$core$List$isEmpty(charMatches) ? _Utils_Tuple3(lambdaMatches, false, 'λ') : _Utils_Tuple3(
			charMatches,
			true,
			A2($elm$core$Maybe$withDefault, '', maybeChar));
		var candidates = _v4.a;
		var consumesInput = _v4.b;
		var inputLabel = _v4.c;
		if (!candidates.b) {
			var result = function () {
				if (!queue.b) {
					var _v7 = A2($author$project$Pages$Editor$getStateById, sid, model.c);
					if (!_v7.$) {
						var s = _v7.a;
						return s.E ? 2 : 3;
					} else {
						return 4;
					}
				} else {
					return 4;
				}
			}();
			return A2($author$project$Pages$Editor$stopSimulationWithNotice, result, model);
		} else {
			if (!candidates.b.b) {
				var single = candidates.a;
				return A5($author$project$Pages$Editor$applySimulationTransition, single, consumesInput, rest, queue, model);
			} else {
				var centeredModel = A2($author$project$Pages$Editor$centerChoiceInCanvas, sid, model);
				return _Utils_Tuple2(
					_Utils_update(
						centeredModel,
						{
							h: $elm$core$Maybe$Just(sid),
							P: $elm$core$Maybe$Just(
								{
									bF: consumesInput,
									bK: inputLabel,
									bQ: sid,
									al: A2(
										$elm$core$List$map,
										function ($) {
											return $.a4;
										},
										candidates)
								}),
							S: 1,
							aJ: false
						}),
					$elm$core$Platform$Cmd$none);
			}
		}
	}
};
var $author$project$Pages$Editor$restoreSimulationSnapshot = F2(
	function (snapshot, model) {
		return _Utils_update(
			model,
			{h: snapshot.h, aa: snapshot.aa, P: snapshot.P, J: snapshot.J, Q: snapshot.Q, R: snapshot.R, S: snapshot.S});
	});
var $author$project$Pages$Editor$stepSimulationBack = function (model) {
	var _v0 = model.av;
	if (_v0.b) {
		var previous = _v0.a;
		var rest = _v0.b;
		return _Utils_Tuple2(
			A2(
				$author$project$Pages$Editor$restoreSimulationSnapshot,
				previous,
				_Utils_update(
					model,
					{av: rest})),
			$elm$core$Platform$Cmd$none);
	} else {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	}
};
var $author$project$Pages$Editor$snapshotSimulation = function (model) {
	return {h: model.h, aa: model.aa, P: model.P, J: model.J, Q: model.Q, R: model.R, S: model.S};
};
var $author$project$Pages$Editor$stepSimulationWithHistory = function (model) {
	var snapshot = $author$project$Pages$Editor$snapshotSimulation(model);
	return $author$project$Pages$Editor$stepSimulation(
		_Utils_update(
			model,
			{
				av: A2($elm$core$List$cons, snapshot, model.av)
			}));
};
var $author$project$Pages$Editor$transitionLabelsForPair = F3(
	function (transitions, fromState, toState) {
		return $author$project$Pages$Editor$uniqueLabels(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.i;
				},
				A2(
					$elm$core$List$filter,
					function (transition) {
						return _Utils_eq(transition.f, fromState) && _Utils_eq(transition.g, toState);
					},
					transitions)));
	});
var $author$project$I18n$EditorCodeValidationArrowLine = 43;
var $author$project$I18n$EditorCodeValidationConditionSingle = 41;
var $author$project$I18n$EditorCodeValidationFormat = 38;
var $author$project$I18n$EditorCodeValidationSourceNoSpaces = 40;
var $author$project$I18n$EditorCodeValidationTargetNoSpaces = 39;
var $author$project$I18n$EditorCodeValidationTwoParts = 42;
var $author$project$Pages$Editor$validateTransitionLine = F2(
	function (idx, originalLine) {
		var line = $elm$core$String$trim(originalLine);
		var build = function (message) {
			return $elm$core$Maybe$Just(
				{
					bN: idx + 1,
					b_: $elm$core$String$isEmpty(line) ? originalLine : line,
					bo: message
				});
		};
		if ($elm$core$String$isEmpty(line)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$split, '=>', line);
			if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
				var leftRaw = _v0.a;
				var _v1 = _v0.b;
				var rightRaw = _v1.a;
				var right = $elm$core$String$trim(rightRaw);
				var left = $elm$core$String$trim(leftRaw);
				if (!(A2($elm$core$String$startsWith, '(', left) && A2($elm$core$String$endsWith, ')', left))) {
					return build(38);
				} else {
					if ($elm$core$String$isEmpty(right) || A2($elm$core$String$contains, ' ', right)) {
						return build(39);
					} else {
						var inside = A2(
							$elm$core$String$dropRight,
							1,
							A2($elm$core$String$dropLeft, 1, left));
						var parts = A2(
							$elm$core$List$map,
							$elm$core$String$trim,
							A2($elm$core$String$split, ',', inside));
						if ((parts.b && parts.b.b) && (!parts.b.b.b)) {
							var fromName = parts.a;
							var _v3 = parts.b;
							var condition = _v3.a;
							return ($elm$core$String$isEmpty(fromName) || A2($elm$core$String$contains, ' ', fromName)) ? build(40) : (($elm$core$String$isEmpty(condition) || (A2($elm$core$String$contains, ' ', condition) || ($elm$core$String$length(condition) !== 1))) ? build(41) : $elm$core$Maybe$Nothing);
						} else {
							return build(42);
						}
					}
				}
			} else {
				return build(43);
			}
		}
	});
var $author$project$Pages$Editor$validateTransitionCode = function (raw) {
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2(
			$elm$core$List$indexedMap,
			$author$project$Pages$Editor$validateTransitionLine,
			$elm$core$String$lines(raw)));
};
var $elm$core$String$words = _String_words;
var $author$project$Pages$Editor$handleShortcut = F2(
	function (shortcut, model) {
		if (shortcut.b9) {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		} else {
			var _v45 = _Utils_Tuple3(shortcut.a7, shortcut.aY, shortcut.a$);
			_v45$13:
			while (true) {
				if (_v45.a) {
					if (_v45.b) {
						switch (_v45.c) {
							case 'KeyS':
								return _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$Editor$NoOp),
										$elm$browser$Browser$Dom$focus('simulation-input-field')));
							case 'Enter':
								return $author$project$Pages$Editor$simulationSessionActive(model) ? A2($author$project$Pages$Editor$update, $author$project$Pages$Editor$StopSimulation, model) : A2($author$project$Pages$Editor$update, $author$project$Pages$Editor$StartSimulation, model);
							case 'KeyN':
								return A2($author$project$Pages$Editor$update, $author$project$Pages$Editor$ToggleAutomatonTypeDetails, model);
							default:
								break _v45$13;
						}
					} else {
						break _v45$13;
					}
				} else {
					if (_v45.b) {
						switch (_v45.c) {
							case 'Digit1':
								return A2(
									$author$project$Pages$Editor$update,
									$author$project$Pages$Editor$SetMode(0),
									model);
							case 'Digit2':
								return A2(
									$author$project$Pages$Editor$update,
									$author$project$Pages$Editor$SetMode(1),
									model);
							case 'Digit3':
								return A2(
									$author$project$Pages$Editor$update,
									$author$project$Pages$Editor$SetMode(2),
									model);
							case 'KeyS':
								var _v46 = model.h;
								if (!_v46.$) {
									var sid = _v46.a;
									return A2(
										$author$project$Pages$Editor$update,
										$author$project$Pages$Editor$ToggleStart(sid),
										model);
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							case 'KeyE':
								var _v47 = model.h;
								if (!_v47.$) {
									var sid = _v47.a;
									return A2(
										$author$project$Pages$Editor$update,
										$author$project$Pages$Editor$ToggleAccepting(sid),
										model);
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							case 'KeyN':
								var _v48 = _Utils_Tuple2(model.h, model.s);
								if (!_v48.a.$) {
									return _Utils_Tuple2(
										model,
										A2(
											$elm$core$Task$attempt,
											$elm$core$Basics$always($author$project$Pages$Editor$NoOp),
											$elm$browser$Browser$Dom$focus('selected-state-name-input')));
								} else {
									if (!_v48.b.$) {
										var _v49 = _v48.a;
										return _Utils_Tuple2(
											model,
											A2(
												$elm$core$Task$attempt,
												$elm$core$Basics$always($author$project$Pages$Editor$NoOp),
												$elm$browser$Browser$Dom$focus('selected-transition-label-input')));
									} else {
										return (model.z === 1) ? _Utils_Tuple2(
											model,
											A2(
												$elm$core$Task$attempt,
												$elm$core$Basics$always($author$project$Pages$Editor$NoOp),
												$elm$browser$Browser$Dom$focus('transition-create-label-input'))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
									}
								}
							case 'KeyQ':
								return A2($author$project$Pages$Editor$update, $author$project$Pages$Editor$CenterOnStartState, model);
							case 'KeyT':
								return _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$Editor$NoOp),
										$elm$browser$Browser$Dom$focus('transition-function-editor')));
							default:
								break _v45$13;
						}
					} else {
						switch (_v45.c) {
							case 'Delete':
								var _v50 = _Utils_Tuple2(model.h, model.s);
								if (!_v50.a.$) {
									var sid = _v50.a.a;
									return A2(
										$author$project$Pages$Editor$update,
										$author$project$Pages$Editor$DeleteState(sid),
										model);
								} else {
									if (!_v50.b.$) {
										var _v51 = _v50.a;
										var tid = _v50.b.a;
										return A2(
											$author$project$Pages$Editor$update,
											$author$project$Pages$Editor$DeleteTransition(tid),
											model);
									} else {
										return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
									}
								}
							case 'Backspace':
								if (shortcut.b1) {
									var _v52 = _Utils_Tuple2(model.h, model.s);
									if (!_v52.a.$) {
										var sid = _v52.a.a;
										return A2(
											$author$project$Pages$Editor$update,
											$author$project$Pages$Editor$DeleteState(sid),
											model);
									} else {
										if (!_v52.b.$) {
											var _v53 = _v52.a;
											var tid = _v52.b.a;
											return A2(
												$author$project$Pages$Editor$update,
												$author$project$Pages$Editor$DeleteTransition(tid),
												model);
										} else {
											return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
										}
									}
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							default:
								break _v45$13;
						}
					}
				}
			}
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$Editor$update = F2(
	function (msg, model) {
		if ($author$project$Pages$Editor$simulationSessionActive(model)) {
			switch (msg.$) {
				case 0:
					var button = msg.b;
					var cx = msg.c;
					var cy = msg.d;
					return (button === 1) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{
								au: $elm$core$Maybe$Just(
									{bq: model.U, br: model.V, bt: cx, bu: cy})
							}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 1:
					var mx = msg.a;
					var my = msg.b;
					var _v1 = model.au;
					if (_v1.$ === 1) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var pan = _v1.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{U: pan.bq + (mx - pan.bt), V: pan.br + (my - pan.bu)}),
							$elm$core$Platform$Cmd$none);
					}
				case 2:
					var button = msg.a;
					return (button === 1) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{au: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 28:
					return $author$project$Pages$Editor$stepSimulation(model);
				case 29:
					var _v2 = model.aj;
					if ((!_v2.$) && (_v2.a === 1)) {
						var _v3 = _v2.a;
						return $author$project$Pages$Editor$stepSimulationWithHistory(model);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 30:
					var _v4 = model.aj;
					if ((!_v4.$) && (_v4.a === 1)) {
						var _v5 = _v4.a;
						return $author$project$Pages$Editor$stepSimulationBack(model);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 31:
					var tid = msg.a;
					var _v6 = _Utils_Tuple2(model.P, model.J);
					if ((!_v6.a.$) && (!_v6.b.$)) {
						var choice = _v6.a.a;
						var _v7 = $elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (transition) {
									return _Utils_eq(transition.a4, tid);
								},
								model.d));
						if (!_v7.$) {
							var transition = _v7.a;
							var queue = model.R;
							var rest = function () {
								if (!queue.b) {
									return _List_Nil;
								} else {
									var remaining = queue.b;
									return remaining;
								}
							}();
							return A5($author$project$Pages$Editor$applySimulationTransition, transition, choice.bF, rest, queue, model);
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 32:
					var dx = msg.a;
					var dy = msg.b;
					return _Utils_Tuple2(
						A3($author$project$Pages$Editor$panWithWheel, dx, dy, model),
						$elm$core$Platform$Cmd$none);
				case 33:
					var w = msg.a;
					var h = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{cc: h, cd: w}),
						$elm$core$Platform$Cmd$none);
				case 34:
					return A2(
						$author$project$Pages$Editor$showGlobalNotice,
						104,
						A2($author$project$Pages$Editor$stopSimulation, 0, model));
				case 19:
					var focused = msg.a;
					return focused ? ($author$project$Pages$Editor$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: A2($author$project$Pages$Editor$encodeTransitionLanguage, model.c, model.d),
								T: false,
								ab: true,
								ac: _List_Nil
							}),
						$elm$core$Platform$Cmd$none)) : ($author$project$Pages$Editor$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: false}),
						$elm$core$Platform$Cmd$none));
				case 20:
					var top = msg.a;
					var left = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bi: left, bj: top}),
						$elm$core$Platform$Cmd$none);
				case 21:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{aB: s}),
						$elm$core$Platform$Cmd$none);
				case 22:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aA: $author$project$Pages$Editor$simulationDelayFromSpeedIndex(s)
							}),
						$elm$core$Platform$Cmd$none);
				case 23:
					return _Utils_Tuple2(
						$author$project$Pages$Editor$centerOnPreferredStartState(model),
						$elm$core$Platform$Cmd$none);
				case 24:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$Editor$clampZoom(model.D - 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 25:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$Editor$clampZoom(model.D + 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 52:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aO) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aG: false}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 53:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aS) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aR: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 54:
					var shortcut = msg.a;
					return A2($author$project$Pages$Editor$handleShortcut, shortcut, model);
				default:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		} else {
			switch (msg.$) {
				case 0:
					var targetTag = msg.a;
					var button = msg.b;
					var cx = msg.c;
					var cy = msg.d;
					switch (button) {
						case 1:
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										au: $elm$core$Maybe$Just(
											{bq: model.U, br: model.V, bt: cx, bu: cy})
									}),
								$elm$core$Platform$Cmd$none);
						case 0:
							var _v11 = model.z;
							if (!_v11) {
								if (targetTag !== 'svg') {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								} else {
									var stateId = model.I;
									var _v12 = A3($author$project$Pages$Editor$screenToWorld, model, cx, cy);
									var wx = _v12.a;
									var wy = _v12.b;
									var newState = {
										E: false,
										a4: stateId,
										M: false,
										b3: $elm$core$String$fromInt(stateId),
										j: wx,
										k: wy
									};
									return _Utils_Tuple2(
										_Utils_update(
											model,
											{
												ao: $elm$core$Maybe$Nothing,
												I: model.I + 1,
												h: $elm$core$Maybe$Just(newState.a4),
												s: $elm$core$Maybe$Nothing,
												c: _Utils_ap(
													model.c,
													_List_fromArray(
														[newState])),
												ah: $elm$core$Maybe$Nothing
											}),
										$elm$core$Platform$Cmd$none);
								}
							} else {
								if (targetTag === 'svg') {
									var _v13 = model.z;
									switch (_v13) {
										case 1:
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, Y: '', ah: $elm$core$Maybe$Nothing}),
												$elm$core$Platform$Cmd$none);
										case 2:
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing}),
												$elm$core$Platform$Cmd$none);
										default:
											return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
									}
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							}
						default:
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 1:
					var mx = msg.a;
					var my = msg.b;
					var updatedPan = function () {
						var _v16 = model.au;
						if (_v16.$ === 1) {
							return model;
						} else {
							var pan = _v16.a;
							return _Utils_update(
								model,
								{U: pan.bq + (mx - pan.bt), V: pan.br + (my - pan.bu)});
						}
					}();
					var updatedStates = function () {
						var _v14 = updatedPan.ao;
						if (_v14.$ === 1) {
							return updatedPan;
						} else {
							var sid = _v14.a;
							var _v15 = A3($author$project$Pages$Editor$screenToWorld, updatedPan, mx, my);
							var wx = _v15.a;
							var wy = _v15.b;
							var move = function (s) {
								return _Utils_eq(s.a4, sid) ? _Utils_update(
									s,
									{j: wx, k: wy}) : s;
							};
							return _Utils_update(
								updatedPan,
								{
									c: A2($elm$core$List$map, move, updatedPan.c)
								});
						}
					}();
					return _Utils_Tuple2(updatedStates, $elm$core$Platform$Cmd$none);
				case 2:
					var button = msg.a;
					var clearedPan = (button === 1) ? _Utils_update(
						model,
						{au: $elm$core$Maybe$Nothing}) : model;
					var clearedDrag = (!button) ? _Utils_update(
						clearedPan,
						{ao: $elm$core$Maybe$Nothing}) : clearedPan;
					return _Utils_Tuple2(clearedDrag, $elm$core$Platform$Cmd$none);
				case 3:
					var sid = msg.a;
					var _v17 = model.z;
					if (_v17 === 2) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ao: $elm$core$Maybe$Just(sid),
									h: $elm$core$Maybe$Just(sid),
									s: $elm$core$Maybe$Nothing,
									Y: ''
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 4:
					var sid = msg.a;
					var _v18 = model.z;
					if (_v18 === 2) {
						var toggle = function (s) {
							return _Utils_eq(s.a4, sid) ? _Utils_update(
								s,
								{E: !s.E}) : s;
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									c: A2($elm$core$List$map, toggle, model.c)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 5:
					var sid = msg.a;
					var _v19 = model.z;
					switch (_v19) {
						case 1:
							var _v20 = model.ah;
							if (_v20.$ === 1) {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											h: $elm$core$Maybe$Just(sid),
											ah: $elm$core$Maybe$Just(sid)
										}),
									$elm$core$Platform$Cmd$none);
							} else {
								var fromId = _v20.a;
								var labels = $author$project$Pages$Editor$normalizeTransitionLabels(model.a9);
								var newTransitions = A2(
									$elm$core$List$indexedMap,
									F2(
										function (idx, token) {
											return {f: fromId, a4: model.p + idx, i: token, g: sid};
										}),
									labels);
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											p: model.p + $elm$core$List$length(newTransitions),
											h: $elm$core$Maybe$Nothing,
											s: $elm$core$Maybe$Nothing,
											ah: $elm$core$Maybe$Nothing,
											d: _Utils_ap(model.d, newTransitions)
										}),
									$elm$core$Platform$Cmd$none);
							}
						case 2:
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										h: $elm$core$Maybe$Just(sid),
										s: $elm$core$Maybe$Nothing,
										Y: '',
										ah: $elm$core$Maybe$Nothing
									}),
								$elm$core$Platform$Cmd$none);
						default:
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 6:
					var tid = msg.a;
					var _v21 = model.z;
					if (_v21 === 2) {
						var draftLabel = function () {
							var _v22 = $elm$core$List$head(
								A2(
									$elm$core$List$filter,
									function (transition) {
										return _Utils_eq(transition.a4, tid);
									},
									model.d));
							if (_v22.$ === 1) {
								return '';
							} else {
								var transition = _v22.a;
								return $author$project$Pages$Editor$transitionLabelsToEditorText(
									A3($author$project$Pages$Editor$transitionLabelsForPair, model.d, transition.f, transition.g));
							}
						}();
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $elm$core$Maybe$Nothing,
									s: $elm$core$Maybe$Just(tid),
									Y: draftLabel
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 7:
					var sid = msg.a;
					var transFiltered = A2(
						$elm$core$List$filter,
						function (t) {
							return (!_Utils_eq(t.f, sid)) && (!_Utils_eq(t.g, sid));
						},
						model.d);
					var statesFiltered = A2(
						$elm$core$List$filter,
						function (s) {
							return !_Utils_eq(s.a4, sid);
						},
						model.c);
					var normalized = A2($author$project$Pages$Editor$normalizeAutomatonIds, statesFiltered, transFiltered);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{I: normalized.I, p: normalized.p, h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, Y: '', c: normalized.c, d: normalized.d}),
						$elm$core$Platform$Cmd$none);
				case 8:
					var tid = msg.a;
					var transFiltered = A2(
						$elm$core$List$filter,
						function (t) {
							return !_Utils_eq(t.a4, tid);
						},
						model.d);
					var normalized = $author$project$Pages$Editor$normalizeTransitionIds(transFiltered);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{p: normalized.p, s: $elm$core$Maybe$Nothing, Y: '', d: normalized.d}),
						$elm$core$Platform$Cmd$none);
				case 9:
					var sid = msg.a;
					var _v23 = model.z;
					if (_v23 === 2) {
						var updatedStates = function () {
							var _v24 = A2($author$project$Pages$Editor$getStateById, sid, model.c);
							if (_v24.$ === 1) {
								return model.c;
							} else {
								var s = _v24.a;
								return s.M ? A2(
									$elm$core$List$map,
									function (t) {
										return _Utils_eq(t.a4, sid) ? _Utils_update(
											t,
											{M: false}) : t;
									},
									model.c) : A2($author$project$Pages$Editor$ensureSingleStart, sid, model.c);
							}
						}();
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $elm$core$Maybe$Just(sid),
									c: updatedStates
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 10:
					var sid = msg.a;
					var _v25 = model.z;
					if (_v25 === 2) {
						var toggle = function (s) {
							return _Utils_eq(s.a4, sid) ? _Utils_update(
								s,
								{E: !s.E}) : s;
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $elm$core$Maybe$Just(sid),
									c: A2($elm$core$List$map, toggle, model.c)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 11:
					var newMode = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{ao: $elm$core$Maybe$Nothing, z: newMode, h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, Y: '', ah: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none);
				case 12:
					var label = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								a9: $author$project$Pages$Editor$sanitizeTransitionEditorInput(label)
							}),
						$elm$core$Platform$Cmd$none);
				case 13:
					var label = msg.a;
					var _v26 = model.s;
					if (_v26.$ === 1) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									Y: $author$project$Pages$Editor$sanitizeTransitionEditorInput(label)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var tid = _v26.a;
						var _v27 = $elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (transition) {
									return _Utils_eq(transition.a4, tid);
								},
								model.d));
						if (_v27.$ === 1) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							var target = _v27.a;
							var sanitizedLabel = $author$project$Pages$Editor$sanitizeTransitionEditorInput(label);
							var remainingTransitions = A2(
								$elm$core$List$filter,
								function (transition) {
									return !(_Utils_eq(transition.f, target.f) && _Utils_eq(transition.g, target.g));
								},
								model.d);
							var pairTransitions = A2(
								$elm$core$List$filter,
								function (transition) {
									return _Utils_eq(transition.f, target.f) && _Utils_eq(transition.g, target.g);
								},
								model.d);
							var preservedIds = $elm$core$List$sort(
								A2(
									$elm$core$List$map,
									function ($) {
										return $.a4;
									},
									pairTransitions));
							var labels = $author$project$Pages$Editor$normalizeTransitionLabels(sanitizedLabel);
							var recreatedTransitions = A2(
								$elm$core$List$indexedMap,
								F2(
									function (index, token) {
										return {
											f: target.f,
											a4: A2(
												$elm$core$Maybe$withDefault,
												model.p + index,
												$elm$core$List$head(
													A2($elm$core$List$drop, index, preservedIds))),
											i: token,
											g: target.g
										};
									}),
								labels);
							var additionalCount = A2(
								$elm$core$Basics$max,
								0,
								$elm$core$List$length(labels) - $elm$core$List$length(preservedIds));
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										p: model.p + additionalCount,
										s: A2(
											$elm$core$Maybe$map,
											function ($) {
												return $.a4;
											},
											$elm$core$List$head(recreatedTransitions)),
										Y: sanitizedLabel,
										d: _Utils_ap(remainingTransitions, recreatedTransitions)
									}),
								$elm$core$Platform$Cmd$none);
						}
					}
				case 14:
					var name = msg.a;
					var _v28 = model.h;
					if (_v28.$ === 1) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var sid = _v28.a;
						var sanitizedName = A2(
							$elm$core$String$join,
							'',
							$elm$core$String$words(name));
						var updateState = function (s) {
							return _Utils_eq(s.a4, sid) ? _Utils_update(
								s,
								{b3: sanitizedName}) : s;
						};
						var updatedStates = A2($elm$core$List$map, updateState, model.c);
						return $author$project$Pages$Editor$hasDuplicateStateNames(updatedStates) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{ak: true}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{ak: false, c: updatedStates}),
							$elm$core$Platform$Cmd$none);
					}
				case 15:
					if ($author$project$Pages$Editor$hasCodeValidationErrors(model)) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{T: true}),
							$elm$core$Platform$Cmd$none);
					} else {
						var _v29 = A2($author$project$Pages$Editor$parseCodeDraftToAutomaton, model, model.an);
						if (!_v29.$) {
							var normalizedAutomaton = _v29.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{T: false, ac: _List_Nil, I: normalizedAutomaton.I, p: normalizedAutomaton.p, ak: false, c: normalizedAutomaton.c, d: normalizedAutomaton.d}),
								$elm$core$Platform$Cmd$none);
						} else {
							var reason = _v29.a;
							return (reason === 'duplicate-state-names') ? _Utils_Tuple2(
								_Utils_update(
									model,
									{ak: true}),
								$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
								_Utils_update(
									model,
									{T: true}),
								$elm$core$Platform$Cmd$none);
						}
					}
				case 16:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: A2($author$project$Pages$Editor$encodeTransitionLanguage, model.c, model.d),
								T: false,
								ac: _List_Nil
							}),
						$elm$core$Platform$Cmd$none);
				case 17:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: s,
								T: true,
								aP: model.aP + 1,
								ac: $author$project$Pages$Editor$validateTransitionCode(s)
							}),
						A2(
							$elm$core$Task$perform,
							function (_v30) {
								return $author$project$Pages$Editor$TryParseCodeDraft(model.aP + 1);
							},
							$elm$core$Process$sleep(500)));
				case 19:
					var focused = msg.a;
					return focused ? ($author$project$Pages$Editor$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: A2($author$project$Pages$Editor$encodeTransitionLanguage, model.c, model.d),
								T: false,
								ab: true,
								ac: _List_Nil
							}),
						$elm$core$Platform$Cmd$none)) : ($author$project$Pages$Editor$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: false}),
						$elm$core$Platform$Cmd$none));
				case 20:
					var top = msg.a;
					var left = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bi: left, bj: top}),
						$elm$core$Platform$Cmd$none);
				case 18:
					var version = msg.a;
					if (!_Utils_eq(version, model.aP)) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						if ($author$project$Pages$Editor$hasCodeValidationErrors(model)) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{T: true}),
								$elm$core$Platform$Cmd$none);
						} else {
							var _v31 = A2($author$project$Pages$Editor$parseCodeDraftToAutomaton, model, model.an);
							if (!_v31.$) {
								var normalizedAutomaton = _v31.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{T: false, ac: _List_Nil, I: normalizedAutomaton.I, p: normalizedAutomaton.p, ak: false, c: normalizedAutomaton.c, d: normalizedAutomaton.d}),
									$elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{T: true}),
									$elm$core$Platform$Cmd$none);
							}
						}
					}
				case 21:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{aB: s}),
						$elm$core$Platform$Cmd$none);
				case 22:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aA: $author$project$Pages$Editor$simulationDelayFromSpeedIndex(s)
							}),
						$elm$core$Platform$Cmd$none);
				case 23:
					return _Utils_Tuple2(
						$author$project$Pages$Editor$centerOnPreferredStartState(model),
						$elm$core$Platform$Cmd$none);
				case 24:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$Editor$clampZoom(model.D - 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 25:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$Editor$clampZoom(model.D + 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 26:
					return $author$project$Pages$Editor$hasCodeValidationErrors(model) ? A2($author$project$Pages$Editor$showGlobalNotice, 110, model) : A2($author$project$Pages$Editor$startSimulation, 0, model);
				case 27:
					return $author$project$Pages$Editor$hasCodeValidationErrors(model) ? A2($author$project$Pages$Editor$showGlobalNotice, 110, model) : A2($author$project$Pages$Editor$startSimulation, 1, model);
				case 28:
					return $author$project$Pages$Editor$stepSimulation(model);
				case 29:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 30:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 31:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 32:
					var dx = msg.a;
					var dy = msg.b;
					return _Utils_Tuple2(
						A3($author$project$Pages$Editor$panWithWheel, dx, dy, model),
						$elm$core$Platform$Cmd$none);
				case 33:
					var w = msg.a;
					var h = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{cc: h, cd: w}),
						$elm$core$Platform$Cmd$none);
				case 34:
					return A2(
						$author$project$Pages$Editor$showGlobalNotice,
						104,
						A2($author$project$Pages$Editor$stopSimulation, 0, model));
				case 35:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{a6: true, K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 36:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{af: '', ag: $elm$core$Maybe$Nothing, a6: false, K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 37:
					var slotId = msg.a;
					var automatonJson = A2(
						$elm$json$Json$Encode$encode,
						0,
						A2(
							$author$project$AutomatonFormat$encodeAutomatonDocument,
							$author$project$Pages$Editor$currentAutomatonType,
							A2($author$project$Pages$Editor$encodeAutomaton, model.c, model.d)));
					var updateSlot = function (slot) {
						return _Utils_eq(slot.a4, slotId) ? _Utils_update(
							slot,
							{
								aZ: automatonJson,
								cj: $elm$core$Maybe$Just($author$project$Pages$Editor$currentAutomatonType)
							}) : slot;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aE: $elm$core$Maybe$Just(slotId),
								aI: $elm$core$Maybe$Just(slotId),
								e: A2($elm$core$List$map, updateSlot, model.e),
								K: false,
								u: false
							}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2(
									$elm$core$Task$perform,
									function (_v32) {
										return $author$project$Pages$Editor$ClearRecentlySavedSlot(slotId);
									},
									$elm$core$Process$sleep(2000)),
									A2(
									$elm$core$Task$perform,
									function (_v33) {
										return $author$project$Pages$Editor$ClearSavedSlotAnimation(slotId);
									},
									$elm$core$Process$sleep(420))
								])));
				case 38:
					var slotId = msg.a;
					var maybeSlot = $elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (slot) {
								return _Utils_eq(slot.a4, slotId);
							},
							model.e));
					if (maybeSlot.$ === 1) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var slot = maybeSlot.a;
						if ($elm$core$String$isEmpty(slot.aZ)) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							if ($author$project$Pages$Editor$slotTypeMismatch(slot.cj)) {
								return A2(
									$author$project$Pages$Editor$showGlobalNotice,
									58,
									_Utils_update(
										model,
										{K: false, u: true}));
							} else {
								var _v35 = A2(
									$elm$json$Json$Decode$decodeString,
									A2($author$project$AutomatonFormat$decodeAutomatonDocument, $author$project$Pages$Editor$currentAutomatonType, $author$project$Pages$Editor$decodeAutomaton),
									slot.aZ);
								if (!_v35.$) {
									var document = _v35.a;
									if (!_Utils_eq(document.cj, $author$project$Pages$Editor$currentAutomatonType)) {
										return A2(
											$author$project$Pages$Editor$showGlobalNotice,
											58,
											_Utils_update(
												model,
												{K: false, u: true}));
									} else {
										var _v36 = document.ci;
										var ss = _v36.a;
										var ts = _v36.b;
										if ($author$project$Pages$Editor$hasDuplicateStateNames(ss)) {
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{ak: true}),
												$elm$core$Platform$Cmd$none);
										} else {
											var normalizedStates = $author$project$Pages$Editor$enforceSingleStartFlag(ss);
											var normalizedAutomaton = A2($author$project$Pages$Editor$normalizeAutomatonIds, normalizedStates, ts);
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{ao: $elm$core$Maybe$Nothing, I: normalizedAutomaton.I, p: normalizedAutomaton.p, h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, aa: $elm$core$Maybe$Nothing, P: $elm$core$Maybe$Nothing, J: $elm$core$Maybe$Nothing, av: _List_Nil, Q: 0, R: _List_Nil, S: 0, aj: $elm$core$Maybe$Nothing, aJ: false, u: false, ak: false, c: normalizedAutomaton.c, ah: $elm$core$Maybe$Nothing, d: normalizedAutomaton.d}),
												$elm$core$Platform$Cmd$none);
										}
									}
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							}
						}
					}
				case 39:
					var slotId = msg.a;
					var updateSlot = function (slot) {
						return _Utils_eq(slot.a4, slotId) ? _Utils_update(
							slot,
							{aZ: '', cj: $elm$core$Maybe$Nothing, b3: ''}) : slot;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aN: $elm$core$Maybe$Just(slotId),
								af: _Utils_eq(
									model.ag,
									$elm$core$Maybe$Just(slotId)) ? '' : model.af,
								ag: _Utils_eq(
									model.ag,
									$elm$core$Maybe$Just(slotId)) ? $elm$core$Maybe$Nothing : model.ag,
								e: A2($elm$core$List$map, updateSlot, model.e),
								K: false,
								u: false
							}),
						A2(
							$elm$core$Task$perform,
							function (_v37) {
								return $author$project$Pages$Editor$ClearDeletedSlotAnimation(slotId);
							},
							$elm$core$Process$sleep(420)));
				case 40:
					var slotId = msg.a;
					var currentName = A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.b3;
							},
							$elm$core$List$head(
								A2(
									$elm$core$List$filter,
									function (slot) {
										return _Utils_eq(slot.a4, slotId);
									},
									model.e))));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								af: currentName,
								ag: $elm$core$Maybe$Just(slotId),
								u: false
							}),
						$elm$core$Platform$Cmd$none);
				case 41:
					var slotName = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{af: slotName, u: false}),
						$elm$core$Platform$Cmd$none);
				case 42:
					var slotId = msg.a;
					var trimmedName = $elm$core$String$trim(model.af);
					var updateSlot = function (slot) {
						return _Utils_eq(slot.a4, slotId) ? _Utils_update(
							slot,
							{b3: trimmedName}) : slot;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								af: '',
								ag: $elm$core$Maybe$Nothing,
								e: A2($elm$core$List$map, updateSlot, model.e),
								u: false
							}),
						$elm$core$Platform$Cmd$none);
				case 43:
					var slotId = msg.a;
					return _Utils_eq(
						model.aI,
						$elm$core$Maybe$Just(slotId)) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aI: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 44:
					var slotId = msg.a;
					return _Utils_eq(
						model.aE,
						$elm$core$Maybe$Just(slotId)) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aE: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 45:
					var slotId = msg.a;
					return _Utils_eq(
						model.aN,
						$elm$core$Maybe$Just(slotId)) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aN: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 46:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 47:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 48:
					var slotId = msg.a;
					var importedJson = msg.b;
					var _v38 = A2(
						$elm$json$Json$Decode$decodeString,
						A2($author$project$AutomatonFormat$decodeAutomatonDocument, $author$project$Pages$Editor$currentAutomatonType, $author$project$Pages$Editor$decodeAutomaton),
						importedJson);
					if (!_v38.$) {
						var document = _v38.a;
						var _v39 = document.ci;
						var importedStates = _v39.a;
						var importedTransitions = _v39.b;
						var minifiedAutomatonJson = A2(
							$elm$json$Json$Encode$encode,
							0,
							A2(
								$author$project$AutomatonFormat$encodeAutomatonDocument,
								document.cj,
								A2($author$project$Pages$Editor$encodeAutomaton, importedStates, importedTransitions)));
						var updateSlot = function (slot) {
							return _Utils_eq(slot.a4, slotId) ? _Utils_update(
								slot,
								{
									aZ: minifiedAutomatonJson,
									cj: $elm$core$Maybe$Just(document.cj)
								}) : slot;
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									aE: $elm$core$Maybe$Just(slotId),
									aI: $elm$core$Maybe$Just(slotId),
									e: A2($elm$core$List$map, updateSlot, model.e),
									K: false,
									u: false
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										A2(
										$elm$core$Task$perform,
										function (_v40) {
											return $author$project$Pages$Editor$ClearRecentlySavedSlot(slotId);
										},
										$elm$core$Process$sleep(2000)),
										A2(
										$elm$core$Task$perform,
										function (_v41) {
											return $author$project$Pages$Editor$ClearSavedSlotAnimation(slotId);
										},
										$elm$core$Process$sleep(420))
									])));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{K: true, u: false}),
							A2(
								$elm$core$Task$perform,
								function (_v42) {
									return $author$project$Pages$Editor$ClearSlotImportError;
								},
								$elm$core$Process$sleep(3000)));
					}
				case 49:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: true, u: false}),
						A2(
							$elm$core$Task$perform,
							function (_v43) {
								return $author$project$Pages$Editor$ClearSlotImportError;
							},
							$elm$core$Process$sleep(3000)));
				case 50:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 51:
					var nextNonce = model.aO + 1;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{aG: true, aO: nextNonce, a_: !model.a_}),
						A2(
							$elm$core$Task$perform,
							function (_v44) {
								return $author$project$Pages$Editor$AutomatonTypeAnimationFinished(nextNonce);
							},
							$elm$core$Process$sleep(260)));
				case 52:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aO) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aG: false}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 53:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aS) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aR: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 54:
					var shortcut = msg.a;
					return A2($author$project$Pages$Editor$handleShortcut, shortcut, model);
				default:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		}
	});
var $author$project$Pages$EditorStack$AddTransition = 1;
var $author$project$Pages$EditorStack$AutoRun = 0;
var $author$project$Pages$EditorStack$AutomatonTypeAnimationFinished = function (a) {
	return {$: 56, a: a};
};
var $author$project$Pages$EditorStack$CenterOnStartState = {$: 27};
var $author$project$Pages$EditorStack$ClearDeletedSlotAnimation = function (a) {
	return {$: 49, a: a};
};
var $author$project$Pages$EditorStack$ClearRecentlySavedSlot = function (a) {
	return {$: 47, a: a};
};
var $author$project$Pages$EditorStack$ClearSavedSlotAnimation = function (a) {
	return {$: 48, a: a};
};
var $author$project$Pages$EditorStack$ClearSlotImportError = {$: 54};
var $author$project$Pages$EditorStack$DeleteState = function (a) {
	return {$: 7, a: a};
};
var $author$project$Pages$EditorStack$DeleteTransition = function (a) {
	return {$: 8, a: a};
};
var $author$project$Pages$EditorStack$MoveState = 2;
var $author$project$Pages$EditorStack$NoOp = {$: 59};
var $author$project$Pages$EditorStack$SetMode = function (a) {
	return {$: 11, a: a};
};
var $author$project$Pages$EditorStack$StartSimulation = {$: 30};
var $author$project$Pages$EditorStack$StepRun = 1;
var $author$project$Pages$EditorStack$StopSimulation = {$: 38};
var $author$project$Pages$EditorStack$ToggleAccepting = function (a) {
	return {$: 10, a: a};
};
var $author$project$Pages$EditorStack$ToggleAutomatonTypeDetails = {$: 55};
var $author$project$Pages$EditorStack$ToggleStart = function (a) {
	return {$: 9, a: a};
};
var $author$project$Pages$EditorStack$TryParseCodeDraft = function (a) {
	return {$: 22, a: a};
};
var $author$project$Pages$EditorStack$AdvanceSimulation = {$: 32};
var $author$project$Pages$EditorStack$DeadEnd = 4;
var $author$project$Pages$EditorStack$Rejected = 3;
var $author$project$Pages$EditorStack$Running = 1;
var $author$project$Pages$EditorStack$Success = 2;
var $author$project$Pages$EditorStack$applyTransitionToStack = F2(
	function (parts, stack) {
		var rawPushedSymbols = $elm$core$String$isEmpty(parts.O) ? _List_Nil : A2(
			$elm$core$List$map,
			$elm$core$String$fromChar,
			$elm$core$String$toList(parts.O));
		var popped = function () {
			if ($elm$core$String$isEmpty(parts.v)) {
				return stack;
			} else {
				if (stack.b) {
					var top = stack.a;
					var rest = stack.b;
					return (top === 'Z') ? stack : rest;
				} else {
					return _List_fromArray(
						['Z']);
				}
			}
		}();
		var pushedSymbols = ((parts.v === 'Z') && ((!$elm$core$List$isEmpty(rawPushedSymbols)) && _Utils_eq(
			$elm$core$List$head(popped),
			$elm$core$Maybe$Just('Z')))) ? $elm$core$List$reverse(
			A2(
				$elm$core$List$drop,
				1,
				$elm$core$List$reverse(rawPushedSymbols))) : rawPushedSymbols;
		return _Utils_ap(pushedSymbols, popped);
	});
var $author$project$Pages$EditorStack$normalizeStackInputToken = function (raw) {
	return A2(
		$elm$core$String$left,
		1,
		$elm$core$String$trim(raw));
};
var $author$project$Pages$EditorStack$normalizeStackOutputToken = function (raw) {
	return $elm$core$String$trim(raw);
};
var $author$project$Pages$EditorStack$normalizeTransitionLabel = function (raw) {
	return A2(
		$elm$core$String$left,
		1,
		$elm$core$String$trim(raw));
};
var $author$project$Pages$EditorStack$decodeStackTransitionLabel = function (raw) {
	var _v0 = A2($elm$core$String$split, '|', raw);
	if (_v0.b) {
		if (_v0.b.b) {
			var inputSymbol = _v0.a;
			var _v1 = _v0.b;
			var inputStack = _v1.a;
			var outputStackParts = _v1.b;
			return {
				v: $author$project$Pages$EditorStack$normalizeStackInputToken(inputStack),
				w: $author$project$Pages$EditorStack$normalizeTransitionLabel(inputSymbol),
				O: $author$project$Pages$EditorStack$normalizeStackOutputToken(
					A2($elm$core$String$join, '|', outputStackParts))
			};
		} else {
			var inputSymbol = _v0.a;
			return {
				v: '',
				w: $author$project$Pages$EditorStack$normalizeTransitionLabel(inputSymbol),
				O: ''
			};
		}
	} else {
		return {v: '', w: '', O: ''};
	}
};
var $author$project$Pages$EditorStack$getStateById = F2(
	function (id, states) {
		return $elm$core$List$head(
			A2(
				$elm$core$List$filter,
				function (s) {
					return _Utils_eq(s.a4, id);
				},
				states));
	});
var $author$project$Pages$EditorStack$isLambdaLabel = function (label) {
	return $elm$core$String$isEmpty(
		$author$project$Pages$EditorStack$decodeStackTransitionLabel(label).w);
};
var $author$project$Pages$EditorStack$hasLambdaFrom = F2(
	function (sid, transitions) {
		return A2(
			$elm$core$List$any,
			function (t) {
				return _Utils_eq(t.f, sid) && $author$project$Pages$EditorStack$isLambdaLabel(t.i);
			},
			transitions);
	});
var $author$project$Pages$EditorStack$parseDelay = function (raw) {
	var _v0 = $elm$core$String$toFloat(
		$elm$core$String$trim(raw));
	if (!_v0.$) {
		var n = _v0.a;
		return A2($elm$core$Basics$max, 0, n);
	} else {
		return 500;
	}
};
var $author$project$Pages$EditorStack$DismissGlobalNotice = function (a) {
	return {$: 57, a: a};
};
var $author$project$Pages$EditorStack$showGlobalNotice = F2(
	function (key, model) {
		var nextNonce = model.aS + 1;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					aR: $elm$core$Maybe$Just(key),
					aS: nextNonce
				}),
			A2(
				$elm$core$Task$perform,
				function (_v0) {
					return $author$project$Pages$EditorStack$DismissGlobalNotice(nextNonce);
				},
				$elm$core$Process$sleep(5000)));
	});
var $author$project$Pages$EditorStack$simulationResultNoticeKey = function (result) {
	switch (result) {
		case 2:
			return $elm$core$Maybe$Just(106);
		case 3:
			return $elm$core$Maybe$Just(107);
		case 4:
			return $elm$core$Maybe$Just(108);
		case 5:
			return $elm$core$Maybe$Just(109);
		case 0:
			return $elm$core$Maybe$Nothing;
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Pages$EditorStack$stackAtBase = function (stack) {
	return _Utils_eq(
		stack,
		_List_fromArray(
			['Z']));
};
var $author$project$Pages$EditorStack$applySimulationTransition = F4(
	function (transition, rest, queue, model) {
		var parts = $author$project$Pages$EditorStack$decodeStackTransitionLabel(transition.i);
		var nextStack = A2($author$project$Pages$EditorStack$applyTransitionToStack, parts, model.W);
		var delay = $author$project$Pages$EditorStack$parseDelay(model.aA);
		var consumesInput = !$elm$core$String$isEmpty(parts.w);
		var nextQueue = consumesInput ? rest : queue;
		var willContinue = (!$elm$core$List$isEmpty(nextQueue)) || A2($author$project$Pages$EditorStack$hasLambdaFrom, transition.g, model.d);
		var cmd = (willContinue && _Utils_eq(
			model.aj,
			$elm$core$Maybe$Just(0))) ? A2(
			$elm$core$Task$perform,
			function (_v2) {
				return $author$project$Pages$EditorStack$AdvanceSimulation;
			},
			$elm$core$Process$sleep(delay)) : $elm$core$Platform$Cmd$none;
		var nextResult = function () {
			if (willContinue) {
				return 1;
			} else {
				var _v1 = A2($author$project$Pages$EditorStack$getStateById, transition.g, model.c);
				if (!_v1.$) {
					var s = _v1.a;
					return (s.E && ($elm$core$List$isEmpty(nextQueue) && $author$project$Pages$EditorStack$stackAtBase(nextStack))) ? 2 : ($elm$core$List$isEmpty(nextQueue) ? 3 : 4);
				} else {
					return 4;
				}
			}
		}();
		var nextModel = _Utils_update(
			model,
			{
				h: $elm$core$Maybe$Just(transition.g),
				aa: $elm$core$Maybe$Just(transition.a4),
				P: $elm$core$Maybe$Nothing,
				J: $elm$core$Maybe$Just(transition.g),
				Q: consumesInput ? (model.Q + 1) : model.Q,
				R: nextQueue,
				S: nextResult,
				aJ: willContinue && _Utils_eq(
					model.aj,
					$elm$core$Maybe$Just(0)),
				W: nextStack
			});
		if (willContinue) {
			return _Utils_Tuple2(nextModel, cmd);
		} else {
			var _v0 = $author$project$Pages$EditorStack$simulationResultNoticeKey(nextResult);
			if (!_v0.$) {
				var key = _v0.a;
				return A2($author$project$Pages$EditorStack$showGlobalNotice, key, nextModel);
			} else {
				return _Utils_Tuple2(nextModel, $elm$core$Platform$Cmd$none);
			}
		}
	});
var $author$project$Pages$EditorStack$editorLayout = function (model) {
	var editorHeight = A2($elm$core$Basics$max, 560, model.cc - 90);
	var mainRowHeight = A2($elm$core$Basics$max, 320, editorHeight - 120);
	var canvasWidth = A2($elm$core$Basics$max, 360, model.cd - 860);
	var canvasHeight = mainRowHeight - 56;
	return {bg: canvasHeight, bh: canvasWidth, cW: editorHeight, c2: mainRowHeight};
};
var $author$project$Pages$EditorStack$findStartState = function (states) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filter,
			function ($) {
				return $.M;
			},
			states));
};
var $author$project$Pages$EditorStack$preferredStartState = function (states) {
	var _v0 = $author$project$Pages$EditorStack$findStartState(states);
	if (!_v0.$) {
		var startState = _v0.a;
		return $elm$core$Maybe$Just(startState);
	} else {
		return $elm$core$List$head(
			A2(
				$elm$core$List$sortBy,
				function ($) {
					return $.a4;
				},
				states));
	}
};
var $author$project$Pages$EditorStack$centerOnPreferredStartState = function (model) {
	var _v0 = $author$project$Pages$EditorStack$preferredStartState(model.c);
	if (_v0.$ === 1) {
		return model;
	} else {
		var state = _v0.a;
		var layout = $author$project$Pages$EditorStack$editorLayout(model);
		return _Utils_update(
			model,
			{ao: $elm$core$Maybe$Nothing, U: (layout.bh / 2) - (state.j * model.D), V: (layout.bg / 2) - (state.k * model.D), au: $elm$core$Maybe$Nothing});
	}
};
var $author$project$Pages$EditorStack$clampZoom = function (value) {
	return A2(
		$elm$core$Basics$max,
		0.5,
		A2($elm$core$Basics$min, 2, value));
};
var $author$project$Pages$EditorStack$currentAutomatonType = 1;
var $author$project$Pages$EditorStack$encodeStackTransitionLabel = F3(
	function (inputSymbol, inputStack, outputStack) {
		return $author$project$Pages$EditorStack$normalizeTransitionLabel(inputSymbol) + ('|' + ($author$project$Pages$EditorStack$normalizeStackInputToken(inputStack) + ('|' + $author$project$Pages$EditorStack$normalizeStackOutputToken(outputStack))));
	});
var $author$project$Pages$EditorStack$uniqueLabels = function (labels) {
	var step = F2(
		function (label, acc) {
			return A2($elm$core$List$member, label, acc) ? acc : _Utils_ap(
				acc,
				_List_fromArray(
					[label]));
		});
	return A3($elm$core$List$foldl, step, _List_Nil, labels);
};
var $author$project$Pages$EditorStack$decodeJsonLabelToTokens = function (raw) {
	var parts = A2($elm$core$String$contains, ';', raw) ? A2($elm$core$String$split, ';', raw) : _List_fromArray(
		[raw]);
	var normalizeToken = function (token) {
		var trimmed = $elm$core$String$trim(token);
		return A2($elm$core$String$contains, '|', trimmed) ? trimmed : (((trimmed === 'λ') || (trimmed === '')) ? A3($author$project$Pages$EditorStack$encodeStackTransitionLabel, '', '', '') : A3($author$project$Pages$EditorStack$encodeStackTransitionLabel, trimmed, '', ''));
	};
	var normalized = A2($elm$core$List$map, normalizeToken, parts);
	return ($elm$core$String$trim(raw) === '') ? _List_fromArray(
		[
			A3($author$project$Pages$EditorStack$encodeStackTransitionLabel, '', '', '')
		]) : $author$project$Pages$EditorStack$uniqueLabels(normalized);
};
var $author$project$Pages$EditorStack$decodeState = A2(
	$elm$json$Json$Decode$andThen,
	function (id) {
		return A6(
			$elm$json$Json$Decode$map5,
			F5(
				function (x, y, accepting, isStart, maybeName) {
					return {
						E: accepting,
						a4: id,
						M: isStart,
						b3: A2(
							$elm$core$Maybe$withDefault,
							$elm$core$String$fromInt(id),
							maybeName),
						j: x,
						k: y
					};
				}),
			A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'accepting', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'isStart', $elm$json$Json$Decode$bool),
			$elm$json$Json$Decode$maybe(
				A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string)));
	},
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int));
var $author$project$Pages$EditorStack$decodeTransition = A4(
	$elm$json$Json$Decode$map3,
	F3(
		function (from, to, label) {
			return {f: from, i: label, g: to};
		}),
	A2($elm$json$Json$Decode$field, 'from', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'to', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'label', $elm$json$Json$Decode$string));
var $author$project$Pages$EditorStack$decodeAutomaton = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (states, payloadTransitions) {
			var expanded = A2(
				$elm$core$List$indexedMap,
				F2(
					function (idx, transition) {
						return _Utils_update(
							transition,
							{a4: idx + 1});
					}),
				A2(
					$elm$core$List$concatMap,
					function (payload) {
						return A2(
							$elm$core$List$map,
							function (token) {
								return {f: payload.f, a4: 0, i: token, g: payload.g};
							},
							$author$project$Pages$EditorStack$decodeJsonLabelToTokens(payload.i));
					},
					payloadTransitions));
			return _Utils_Tuple2(states, expanded);
		}),
	A2(
		$elm$json$Json$Decode$field,
		'states',
		$elm$json$Json$Decode$list($author$project$Pages$EditorStack$decodeState)),
	A2(
		$elm$json$Json$Decode$field,
		'transitions',
		$elm$json$Json$Decode$list($author$project$Pages$EditorStack$decodeTransition)));
var $author$project$Pages$EditorStack$encodeState = function (s) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(s.a4)),
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(s.b3)),
				_Utils_Tuple2(
				'x',
				$elm$json$Json$Encode$float(s.j)),
				_Utils_Tuple2(
				'y',
				$elm$json$Json$Encode$float(s.k)),
				_Utils_Tuple2(
				'accepting',
				$elm$json$Json$Encode$bool(s.E)),
				_Utils_Tuple2(
				'isStart',
				$elm$json$Json$Encode$bool(s.M))
			]));
};
var $author$project$Pages$EditorStack$encodeTransition = function (t) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(0)),
				_Utils_Tuple2(
				'from',
				$elm$json$Json$Encode$int(t.f)),
				_Utils_Tuple2(
				'to',
				$elm$json$Json$Encode$int(t.g)),
				_Utils_Tuple2(
				'label',
				$elm$json$Json$Encode$string(t.i))
			]));
};
var $author$project$Pages$EditorStack$groupTransitionsForRender = function (transitions) {
	var step = F2(
		function (transition, _v2) {
			var grouped = _v2.a;
			var order = _v2.b;
			var key = _Utils_Tuple2(transition.f, transition.g);
			var _v1 = A2($elm$core$Dict$get, key, grouped);
			if (!_v1.$) {
				var existing = _v1.a;
				return _Utils_Tuple2(
					A3(
						$elm$core$Dict$insert,
						key,
						_Utils_update(
							existing,
							{
								a5: _Utils_ap(
									existing.a5,
									_List_fromArray(
										[transition.i])),
								al: _Utils_ap(
									existing.al,
									_List_fromArray(
										[transition.a4]))
							}),
						grouped),
					order);
			} else {
				return _Utils_Tuple2(
					A3(
						$elm$core$Dict$insert,
						key,
						{
							f: transition.f,
							a5: _List_fromArray(
								[transition.i]),
							b6: transition.a4,
							g: transition.g,
							al: _List_fromArray(
								[transition.a4])
						},
						grouped),
					A2($elm$core$List$cons, key, order));
			}
		});
	var sortedTransitions = A2(
		$elm$core$List$sortBy,
		function ($) {
			return $.a4;
		},
		transitions);
	var _v0 = A3(
		$elm$core$List$foldl,
		step,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		sortedTransitions);
	var groupedByPair = _v0.a;
	var orderedKeysReversed = _v0.b;
	return A2(
		$elm$core$List$filterMap,
		function (key) {
			return A2($elm$core$Dict$get, key, groupedByPair);
		},
		$elm$core$List$reverse(orderedKeysReversed));
};
var $author$project$Pages$EditorStack$transitionLabelsForJson = function (labels) {
	return A2(
		$elm$core$String$join,
		';',
		A2(
			$elm$core$List$map,
			function (token) {
				return $author$project$Pages$EditorStack$isLambdaLabel(token) ? 'λ' : token;
			},
			$author$project$Pages$EditorStack$uniqueLabels(labels)));
};
var $author$project$Pages$EditorStack$encodeAutomaton = F2(
	function (states, transitions) {
		var groupedTransitions = A2(
			$elm$core$List$map,
			function (group) {
				return {
					f: group.f,
					i: $author$project$Pages$EditorStack$transitionLabelsForJson(group.a5),
					g: group.g
				};
			},
			$author$project$Pages$EditorStack$groupTransitionsForRender(transitions));
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'states',
					A2($elm$json$Json$Encode$list, $author$project$Pages$EditorStack$encodeState, states)),
					_Utils_Tuple2(
					'transitions',
					A2($elm$json$Json$Encode$list, $author$project$Pages$EditorStack$encodeTransition, groupedTransitions))
				]));
	});
var $author$project$Pages$EditorStack$stateDisplayName = function (state) {
	return $elm$core$String$isEmpty(
		$elm$core$String$trim(state.b3)) ? $elm$core$String$fromInt(state.a4) : state.b3;
};
var $author$project$Pages$EditorStack$stateNameById = F2(
	function (states, stateId) {
		var _v0 = A2($author$project$Pages$EditorStack$getStateById, stateId, states);
		if (!_v0.$) {
			var state = _v0.a;
			return $author$project$Pages$EditorStack$stateDisplayName(state);
		} else {
			return $elm$core$String$fromInt(stateId);
		}
	});
var $author$project$Pages$EditorStack$encodeTransitionLanguage = F2(
	function (states, transitions) {
		return A2(
			$elm$core$String$join,
			'\n',
			A2(
				$elm$core$List$map,
				function (tr) {
					var parts = $author$project$Pages$EditorStack$decodeStackTransitionLabel(tr.i);
					return '(' + (A2($author$project$Pages$EditorStack$stateNameById, states, tr.f) + (', ' + (($elm$core$String$isEmpty(parts.w) ? 'λ' : parts.w) + (', ' + (($elm$core$String$isEmpty(parts.v) ? 'λ' : parts.v) + (') => (' + (A2($author$project$Pages$EditorStack$stateNameById, states, tr.g) + (', ' + (($elm$core$String$isEmpty(parts.O) ? 'λ' : parts.O) + ')')))))))));
				},
				A2(
					$elm$core$List$sortBy,
					function ($) {
						return $.a4;
					},
					transitions)));
	});
var $author$project$Pages$EditorStack$ensureSingleStart = F2(
	function (id, states) {
		return A2(
			$elm$core$List$map,
			function (s) {
				return _Utils_update(
					s,
					{
						M: _Utils_eq(s.a4, id)
					});
			},
			states);
	});
var $author$project$Pages$EditorStack$enforceSingleStartFlag = function (states) {
	var _v0 = A2(
		$elm$core$List$filter,
		function ($) {
			return $.M;
		},
		states);
	if (!_v0.b) {
		return states;
	} else {
		var s = _v0.a;
		return A2($author$project$Pages$EditorStack$ensureSingleStart, s.a4, states);
	}
};
var $author$project$Pages$EditorStack$hasCodeValidationErrors = function (model) {
	return !$elm$core$List$isEmpty(model.ac);
};
var $author$project$Pages$EditorStack$unique = F2(
	function (value, acc) {
		return A2($elm$core$List$member, value, acc) ? acc : A2($elm$core$List$cons, value, acc);
	});
var $author$project$Pages$EditorStack$hasDuplicateStateNames = function (states) {
	var names = A2(
		$elm$core$List$map,
		A2($elm$core$Basics$composeR, $author$project$Pages$EditorStack$stateDisplayName, $elm$core$String$trim),
		states);
	return !_Utils_eq(
		$elm$core$List$length(names),
		$elm$core$List$length(
			A3($elm$core$List$foldl, $author$project$Pages$EditorStack$unique, _List_Nil, names)));
};
var $author$project$Pages$EditorStack$normalizeTransitionIds = function (transitions) {
	var step = F2(
		function (transition, _v1) {
			var nextId = _v1.a;
			var acc = _v1.b;
			return _Utils_Tuple2(
				nextId + 1,
				A2(
					$elm$core$List$cons,
					_Utils_update(
						transition,
						{a4: nextId}),
					acc));
		});
	var sorted = A2(
		$elm$core$List$sortBy,
		function ($) {
			return $.a4;
		},
		transitions);
	var _v0 = A3(
		$elm$core$List$foldl,
		step,
		_Utils_Tuple2(1, _List_Nil),
		sorted);
	var nextTransitionId = _v0.a;
	var reversed = _v0.b;
	return {
		p: nextTransitionId,
		d: $elm$core$List$reverse(reversed)
	};
};
var $author$project$Pages$EditorStack$normalizeAutomatonIds = F2(
	function (states, transitions) {
		var sortedStates = A2(
			$elm$core$List$sortBy,
			function ($) {
				return $.a4;
			},
			states);
		var renumberStates = F2(
			function (state, _v1) {
				var nextId = _v1.a;
				var mapping = _v1.b;
				var acc = _v1.c;
				var normalizedName = ($elm$core$String$isEmpty(
					$elm$core$String$trim(state.b3)) || _Utils_eq(
					state.b3,
					$elm$core$String$fromInt(state.a4))) ? $elm$core$String$fromInt(nextId) : state.b3;
				var newState = _Utils_update(
					state,
					{a4: nextId, b3: normalizedName});
				return _Utils_Tuple3(
					nextId + 1,
					A3($elm$core$Dict$insert, state.a4, nextId, mapping),
					A2($elm$core$List$cons, newState, acc));
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			renumberStates,
			_Utils_Tuple3(1, $elm$core$Dict$empty, _List_Nil),
			sortedStates);
		var nextStateId = _v0.a;
		var stateIdMap = _v0.b;
		var reversedStates = _v0.c;
		var remapStateId = function (oldId) {
			return A2(
				$elm$core$Maybe$withDefault,
				oldId,
				A2($elm$core$Dict$get, oldId, stateIdMap));
		};
		var remappedTransitions = A2(
			$elm$core$List$map,
			function (transition) {
				return _Utils_update(
					transition,
					{
						f: remapStateId(transition.f),
						g: remapStateId(transition.g)
					});
			},
			transitions);
		var normalizedTransitions = $author$project$Pages$EditorStack$normalizeTransitionIds(remappedTransitions);
		return {
			I: nextStateId,
			p: normalizedTransitions.p,
			c: $elm$core$List$reverse(reversedStates),
			d: normalizedTransitions.d
		};
	});
var $author$project$Pages$EditorStack$panWithWheel = F3(
	function (dx, dy, model) {
		return _Utils_update(
			model,
			{ao: $elm$core$Maybe$Nothing, U: model.U - dx, V: model.V - dy, au: $elm$core$Maybe$Nothing});
	});
var $author$project$Pages$EditorStack$buildAutomatonFromParsedTransitions = F2(
	function (existingStates, parsedTransitions) {
		var spacingY = 100;
		var spacingX = 160;
		var placeState = F2(
			function (fallbackName, positions) {
				var _v20 = A2($elm$core$Dict$get, fallbackName, positions);
				if (!_v20.$) {
					return positions;
				} else {
					var index = $elm$core$Dict$size(positions);
					var xCol = (index / 5) | 0;
					var yRow = index % 5;
					return A3(
						$elm$core$Dict$insert,
						fallbackName,
						_Utils_Tuple2(100 + (xCol * spacingX), 100 + (yRow * spacingY)),
						positions);
				}
			});
		var placeFromTo = F2(
			function (transition, positions) {
				placeFromTo:
				while (true) {
					var toPosition = A2($elm$core$Dict$get, transition.aK, positions);
					var fromPosition = A2($elm$core$Dict$get, transition.ay, positions);
					var _v0 = _Utils_Tuple2(fromPosition, toPosition);
					if (!_v0.a.$) {
						if (_v0.b.$ === 1) {
							var _v1 = _v0.a.a;
							var fx = _v1.a;
							var fy = _v1.b;
							var _v2 = _v0.b;
							return A3(
								$elm$core$Dict$insert,
								transition.aK,
								_Utils_Tuple2(fx + spacingX, fy),
								positions);
						} else {
							return positions;
						}
					} else {
						if (!_v0.b.$) {
							var _v3 = _v0.a;
							var _v4 = _v0.b.a;
							var tx = _v4.a;
							var ty = _v4.b;
							return A3(
								$elm$core$Dict$insert,
								transition.ay,
								_Utils_Tuple2(tx - spacingX, ty),
								positions);
						} else {
							var _v5 = _v0.a;
							var _v6 = _v0.b;
							var seeded = A2(placeState, transition.ay, positions);
							var $temp$transition = transition,
								$temp$positions = seeded;
							transition = $temp$transition;
							positions = $temp$positions;
							continue placeFromTo;
						}
					}
				}
			});
		var names = A3(
			$elm$core$List$foldl,
			F2(
				function (name, acc) {
					return A2($elm$core$List$member, name, acc) ? acc : _Utils_ap(
						acc,
						_List_fromArray(
							[name]));
				}),
			_List_Nil,
			A2(
				$elm$core$List$concatMap,
				function (t) {
					return _List_fromArray(
						[t.ay, t.aK]);
				},
				parsedTransitions));
		var isOccupied = F2(
			function (occupied, _v19) {
				var x = _v19.a;
				var y = _v19.b;
				return A2(
					$elm$core$List$any,
					function (_v18) {
						var ox = _v18.a;
						var oy = _v18.b;
						return _Utils_eq(ox, x) && _Utils_eq(oy, y);
					},
					occupied);
			});
		var placeWithoutOverlap = F2(
			function (occupied, _v7) {
				placeWithoutOverlap:
				while (true) {
					var x = _v7.a;
					var y = _v7.b;
					if (A2(
						isOccupied,
						occupied,
						_Utils_Tuple2(x, y))) {
						var $temp$occupied = occupied,
							$temp$_v7 = _Utils_Tuple2(x, y + spacingY);
						occupied = $temp$occupied;
						_v7 = $temp$_v7;
						continue placeWithoutOverlap;
					} else {
						return _Utils_Tuple2(x, y);
					}
				}
			});
		var indexedNames = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, name) {
					return _Utils_Tuple2(name, idx + 1);
				}),
			names);
		var idByName = $elm$core$Dict$fromList(indexedNames);
		var transitions = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, tr) {
					return {
						f: A2(
							$elm$core$Maybe$withDefault,
							1,
							A2($elm$core$Dict$get, tr.ay, idByName)),
						a4: idx + 1,
						i: A3($author$project$Pages$EditorStack$encodeStackTransitionLabel, tr.w, tr.v, tr.O),
						g: A2(
							$elm$core$Maybe$withDefault,
							1,
							A2($elm$core$Dict$get, tr.aK, idByName))
					};
				}),
			parsedTransitions);
		var findAnchorFromOutgoing = F2(
			function (name, positions) {
				return A2(
					$elm$core$Maybe$andThen,
					function (tr) {
						return A2($elm$core$Dict$get, tr.aK, positions);
					},
					$elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (tr) {
								return _Utils_eq(tr.ay, name);
							},
							parsedTransitions)));
			});
		var findAnchorFromIncoming = F2(
			function (name, positions) {
				return A2(
					$elm$core$Maybe$andThen,
					function (tr) {
						return A2($elm$core$Dict$get, tr.ay, positions);
					},
					$elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (tr) {
								return _Utils_eq(tr.aK, name);
							},
							parsedTransitions)));
			});
		var placeUnresolved = F2(
			function (namesToPlace, positions) {
				placeUnresolved:
				while (true) {
					if ($elm$core$List$isEmpty(namesToPlace)) {
						return positions;
					} else {
						var step = F2(
							function (name, _v15) {
								var accPositions = _v15.a;
								var unresolved = _v15.b;
								var hasProgress = _v15.c;
								var _v10 = A2($elm$core$Dict$get, name, accPositions);
								if (!_v10.$) {
									return _Utils_Tuple3(accPositions, unresolved, hasProgress);
								} else {
									var occupied = $elm$core$Dict$values(accPositions);
									var _v11 = A2(findAnchorFromIncoming, name, accPositions);
									if (!_v11.$) {
										var _v12 = _v11.a;
										var ax = _v12.a;
										var ay = _v12.b;
										var target = A2(
											placeWithoutOverlap,
											occupied,
											_Utils_Tuple2(ax + spacingX, ay));
										return _Utils_Tuple3(
											A3($elm$core$Dict$insert, name, target, accPositions),
											unresolved,
											true);
									} else {
										var _v13 = A2(findAnchorFromOutgoing, name, accPositions);
										if (!_v13.$) {
											var _v14 = _v13.a;
											var tx = _v14.a;
											var ty = _v14.b;
											var target = A2(
												placeWithoutOverlap,
												occupied,
												_Utils_Tuple2(tx + spacingX, ty));
											return _Utils_Tuple3(
												A3($elm$core$Dict$insert, name, target, accPositions),
												unresolved,
												true);
										} else {
											return _Utils_Tuple3(
												accPositions,
												_Utils_ap(
													unresolved,
													_List_fromArray(
														[name])),
												hasProgress);
										}
									}
								}
							});
						var _v8 = A3(
							$elm$core$List$foldl,
							step,
							_Utils_Tuple3(positions, _List_Nil, false),
							namesToPlace);
						var progressedPositions = _v8.a;
						var unresolvedNames = _v8.b;
						var didProgress = _v8.c;
						if (didProgress) {
							var $temp$namesToPlace = unresolvedNames,
								$temp$positions = progressedPositions;
							namesToPlace = $temp$namesToPlace;
							positions = $temp$positions;
							continue placeUnresolved;
						} else {
							var fallback = F2(
								function (name, acc) {
									var _v9 = A2($elm$core$Dict$get, name, acc);
									if (!_v9.$) {
										return acc;
									} else {
										var index = $elm$core$Dict$size(acc);
										var xCol = (index / 5) | 0;
										var yRow = index % 5;
										var candidate = _Utils_Tuple2(100 + (xCol * spacingX), 100 + (yRow * spacingY));
										var target = A2(
											placeWithoutOverlap,
											$elm$core$Dict$values(acc),
											candidate);
										return A3($elm$core$Dict$insert, name, target, acc);
									}
								});
							return A3($elm$core$List$foldl, fallback, progressedPositions, unresolvedNames);
						}
					}
				}
			});
		var existingStateByName = A3(
			$elm$core$List$foldl,
			F2(
				function (state, acc) {
					return A3(
						$elm$core$Dict$insert,
						$author$project$Pages$EditorStack$stateDisplayName(state),
						state,
						acc);
				}),
			$elm$core$Dict$empty,
			existingStates);
		var existingPositionsByName = A3(
			$elm$core$List$foldl,
			F2(
				function (state, acc) {
					return A3(
						$elm$core$Dict$insert,
						$author$project$Pages$EditorStack$stateDisplayName(state),
						_Utils_Tuple2(state.j, state.k),
						acc);
				}),
			$elm$core$Dict$empty,
			existingStates);
		var seededPositions = A3($elm$core$List$foldl, placeFromTo, existingPositionsByName, parsedTransitions);
		var allPositions = A2(placeUnresolved, names, seededPositions);
		var states = A2(
			$elm$core$List$map,
			function (_v16) {
				var name = _v16.a;
				var sid = _v16.b;
				var maybeExistingState = A2($elm$core$Dict$get, name, existingStateByName);
				var _v17 = A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(100, 100),
					A2($elm$core$Dict$get, name, allPositions));
				var x = _v17.a;
				var y = _v17.b;
				return {
					E: A2(
						$elm$core$Maybe$withDefault,
						false,
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.E;
							},
							maybeExistingState)),
					a4: sid,
					M: A2(
						$elm$core$Maybe$withDefault,
						sid === 1,
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.M;
							},
							maybeExistingState)),
					b3: name,
					j: x,
					k: y
				};
			},
			indexedNames);
		return _Utils_Tuple2(states, transitions);
	});
var $author$project$I18n$EditorCodeValidationStackInputSingle = 46;
var $author$project$I18n$EditorCodeValidationStackLeftThreeParts = 44;
var $author$project$I18n$EditorCodeValidationStackRightTwoParts = 45;
var $author$project$I18n$EditorCodeValidationStackZMustBeReturned = 47;
var $author$project$Pages$EditorStack$parseTransitionLine = function (line) {
	var _v0 = A2($elm$core$String$split, '=>', line);
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var leftRaw = _v0.a;
		var _v1 = _v0.b;
		var rightRaw = _v1.a;
		var right = $elm$core$String$trim(rightRaw);
		var parseTuple = F2(
			function (raw, sideError) {
				return (A2($elm$core$String$startsWith, '(', raw) && A2($elm$core$String$endsWith, ')', raw)) ? $elm$core$Result$Ok(
					A2(
						$elm$core$List$map,
						$elm$core$String$trim,
						A2(
							$elm$core$String$split,
							',',
							A2(
								$elm$core$String$dropRight,
								1,
								A2($elm$core$String$dropLeft, 1, raw))))) : $elm$core$Result$Err(sideError);
			});
		var left = $elm$core$String$trim(leftRaw);
		var _v2 = _Utils_Tuple2(
			A2(parseTuple, left, 44),
			A2(parseTuple, right, 45));
		if (!_v2.a.$) {
			if (!_v2.b.$) {
				if ((((((_v2.a.a.b && _v2.a.a.b.b) && _v2.a.a.b.b.b) && (!_v2.a.a.b.b.b.b)) && _v2.b.a.b) && _v2.b.a.b.b) && (!_v2.b.a.b.b.b)) {
					var _v3 = _v2.a.a;
					var fromName = _v3.a;
					var _v4 = _v3.b;
					var inputSymbolRaw = _v4.a;
					var _v5 = _v4.b;
					var inputStackRaw = _v5.a;
					var _v6 = _v2.b.a;
					var toName = _v6.a;
					var _v7 = _v6.b;
					var outputStackRaw = _v7.a;
					if ($elm$core$String$isEmpty(fromName) || A2($elm$core$String$contains, ' ', fromName)) {
						return $elm$core$Result$Err(40);
					} else {
						if ($elm$core$String$isEmpty(toName) || A2($elm$core$String$contains, ' ', toName)) {
							return $elm$core$Result$Err(39);
						} else {
							if ((inputSymbolRaw !== 'λ') && ((!$elm$core$String$isEmpty(
								$elm$core$String$trim(inputSymbolRaw))) && ($elm$core$String$length(
								$elm$core$String$trim(inputSymbolRaw)) !== 1))) {
								return $elm$core$Result$Err(41);
							} else {
								if ((inputStackRaw !== 'λ') && ($elm$core$String$length(
									$elm$core$String$trim(inputStackRaw)) > 1)) {
									return $elm$core$Result$Err(46);
								} else {
									var outputStack = (outputStackRaw === 'λ') ? '' : $author$project$Pages$EditorStack$normalizeStackOutputToken(outputStackRaw);
									var inputStack = (inputStackRaw === 'λ') ? '' : $author$project$Pages$EditorStack$normalizeStackInputToken(inputStackRaw);
									return ((inputStack === 'Z') && (!A2($elm$core$String$endsWith, 'Z', outputStack))) ? $elm$core$Result$Err(47) : $elm$core$Result$Ok(
										{
											ay: fromName,
											v: inputStack,
											w: (inputSymbolRaw === 'λ') ? '' : $author$project$Pages$EditorStack$normalizeTransitionLabel(inputSymbolRaw),
											O: outputStack,
											aK: toName
										});
								}
							}
						}
					}
				} else {
					return $elm$core$Result$Err(38);
				}
			} else {
				var key = _v2.b.a;
				return $elm$core$Result$Err(key);
			}
		} else {
			var key = _v2.a.a;
			return $elm$core$Result$Err(key);
		}
	} else {
		return $elm$core$Result$Err(43);
	}
};
var $author$project$Pages$EditorStack$traverseResults = F2(
	function (f, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (item, acc) {
					var _v0 = _Utils_Tuple2(
						f(item),
						acc);
					if (!_v0.a.$) {
						if (!_v0.b.$) {
							var v = _v0.a.a;
							var vs = _v0.b.a;
							return $elm$core$Result$Ok(
								A2($elm$core$List$cons, v, vs));
						} else {
							var e = _v0.b.a;
							return $elm$core$Result$Err(e);
						}
					} else {
						var e = _v0.a.a;
						return $elm$core$Result$Err(e);
					}
				}),
			$elm$core$Result$Ok(_List_Nil),
			list);
	});
var $author$project$Pages$EditorStack$decodeTransitionLanguage = F2(
	function (existingStates, raw) {
		var lines = A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
			A2(
				$elm$core$List$map,
				$elm$core$String$trim,
				$elm$core$String$lines(raw)));
		var _v0 = A2($author$project$Pages$EditorStack$traverseResults, $author$project$Pages$EditorStack$parseTransitionLine, lines);
		if (_v0.$ === 1) {
			var err = _v0.a;
			return $elm$core$Result$Err(err);
		} else {
			var parsedTransitions = _v0.a;
			return $elm$core$Result$Ok(
				A2($author$project$Pages$EditorStack$buildAutomatonFromParsedTransitions, existingStates, parsedTransitions));
		}
	});
var $author$project$Pages$EditorStack$parseCodeDraftToAutomaton = F2(
	function (model, draft) {
		var _v0 = A2($elm$json$Json$Decode$decodeString, $author$project$Pages$EditorStack$decodeAutomaton, draft);
		if (!_v0.$) {
			var _v1 = _v0.a;
			var ss = _v1.a;
			var ts = _v1.b;
			if ($author$project$Pages$EditorStack$hasDuplicateStateNames(ss)) {
				return $elm$core$Result$Err(38);
			} else {
				var normalizedStates = $author$project$Pages$EditorStack$enforceSingleStartFlag(ss);
				return $elm$core$Result$Ok(
					A2($author$project$Pages$EditorStack$normalizeAutomatonIds, normalizedStates, ts));
			}
		} else {
			var _v2 = A2($author$project$Pages$EditorStack$decodeTransitionLanguage, model.c, draft);
			if (!_v2.$) {
				var _v3 = _v2.a;
				var ss = _v3.a;
				var ts = _v3.b;
				return $elm$core$Result$Ok(
					A2($author$project$Pages$EditorStack$normalizeAutomatonIds, ss, ts));
			} else {
				return $elm$core$Result$Err(38);
			}
		}
	});
var $author$project$Pages$EditorStack$normalizeTransitionLabels = function (raw) {
	var normalized = A2(
		$elm$core$List$map,
		function (token) {
			return (token === 'λ') ? '' : $author$project$Pages$EditorStack$normalizeTransitionLabel(token);
		},
		A2(
			$elm$core$List$map,
			$elm$core$String$trim,
			A2($elm$core$String$split, ';', raw)));
	return ($elm$core$String$trim(raw) === '') ? _List_fromArray(
		['']) : $author$project$Pages$EditorStack$uniqueLabels(normalized);
};
var $author$project$Pages$EditorStack$transitionLabelsToEditorText = function (labels) {
	return A2($elm$core$String$join, ';', labels);
};
var $author$project$Pages$EditorStack$sanitizeTransitionEditorInput = function (raw) {
	return ($elm$core$String$trim(raw) === '') ? '' : $author$project$Pages$EditorStack$transitionLabelsToEditorText(
		$author$project$Pages$EditorStack$normalizeTransitionLabels(raw));
};
var $author$project$Pages$EditorStack$screenToWorld = F3(
	function (model, x, y) {
		return _Utils_Tuple2((x - model.U) / model.D, (y - model.V) / model.D);
	});
var $author$project$Pages$EditorStack$simulationSpeedStops = _List_fromArray(
	[10, 250, 500, 750, 1000]);
var $author$project$Pages$EditorStack$simulationDelayFromSpeedIndex = function (rawIndex) {
	var _v0 = $elm$core$String$toInt(rawIndex);
	if (_v0.$ === 1) {
		return '500';
	} else {
		var index = _v0.a;
		return A2(
			$elm$core$Maybe$withDefault,
			'500',
			A2(
				$elm$core$Maybe$map,
				$elm$core$String$fromInt,
				$elm$core$List$head(
					A2($elm$core$List$drop, index, $author$project$Pages$EditorStack$simulationSpeedStops))));
	}
};
var $author$project$Pages$EditorStack$simulationSessionActive = function (model) {
	return !_Utils_eq(model.aj, $elm$core$Maybe$Nothing);
};
var $author$project$Pages$EditorStack$slotTypeMismatch = function (maybeAutomatonType) {
	if (!maybeAutomatonType.$) {
		var automatonType = maybeAutomatonType.a;
		return !_Utils_eq(automatonType, $author$project$Pages$EditorStack$currentAutomatonType);
	} else {
		return false;
	}
};
var $author$project$Pages$EditorStack$MissingStart = 5;
var $author$project$Pages$EditorStack$startSimulation = F2(
	function (runMode, model) {
		var _v0 = $author$project$Pages$EditorStack$findStartState(model.c);
		if (_v0.$ === 1) {
			return A2(
				$author$project$Pages$EditorStack$showGlobalNotice,
				109,
				_Utils_update(
					model,
					{S: 5}));
		} else {
			var startState = _v0.a;
			var queue = $elm$core$String$toList(model.aB);
			var willRun = (!$elm$core$List$isEmpty(queue)) || A2($author$project$Pages$EditorStack$hasLambdaFrom, startState.a4, model.d);
			var initialResult = willRun ? 1 : (startState.E ? 2 : 3);
			var delay = $author$project$Pages$EditorStack$parseDelay(model.aA);
			var cmd = (willRun && (!runMode)) ? A2(
				$elm$core$Task$perform,
				function (_v2) {
					return $author$project$Pages$EditorStack$AdvanceSimulation;
				},
				$elm$core$Process$sleep(delay)) : $elm$core$Platform$Cmd$none;
			var nextModel = _Utils_update(
				model,
				{
					h: $elm$core$Maybe$Just(startState.a4),
					aa: $elm$core$Maybe$Nothing,
					P: $elm$core$Maybe$Nothing,
					J: $elm$core$Maybe$Just(startState.a4),
					av: _List_Nil,
					Q: 0,
					R: queue,
					S: initialResult,
					aj: $elm$core$Maybe$Just(runMode),
					aJ: willRun && (!runMode),
					W: _List_fromArray(
						['Z'])
				});
			if (willRun) {
				return _Utils_Tuple2(nextModel, cmd);
			} else {
				var _v1 = $author$project$Pages$EditorStack$simulationResultNoticeKey(initialResult);
				if (!_v1.$) {
					var key = _v1.a;
					return A2($author$project$Pages$EditorStack$showGlobalNotice, key, nextModel);
				} else {
					return _Utils_Tuple2(nextModel, $elm$core$Platform$Cmd$none);
				}
			}
		}
	});
var $author$project$Pages$EditorStack$centerChoiceInCanvas = F2(
	function (sid, model) {
		var _v0 = A2($author$project$Pages$EditorStack$getStateById, sid, model.c);
		if (_v0.$ === 1) {
			return model;
		} else {
			var state = _v0.a;
			var popupWidth = 280;
			var popupHeight = 140;
			var popupGap = 24;
			var layout = $author$project$Pages$EditorStack$editorLayout(model);
			var targetPanX = (((layout.bh / 2) + (popupWidth / 2)) + popupGap) - state.j;
			var targetPanY = ((layout.bg / 2) + (popupHeight / 2)) - state.k;
			return _Utils_update(
				model,
				{U: targetPanX, V: targetPanY});
		}
	});
var $author$project$Pages$EditorStack$stopSimulation = F2(
	function (result, model) {
		return _Utils_update(
			model,
			{
				aa: $elm$core$Maybe$Nothing,
				P: $elm$core$Maybe$Nothing,
				J: $elm$core$Maybe$Nothing,
				av: _List_Nil,
				Q: 0,
				R: _List_Nil,
				S: result,
				aj: $elm$core$Maybe$Nothing,
				aJ: false,
				W: _List_fromArray(
					['Z'])
			});
	});
var $author$project$Pages$EditorStack$stopSimulationWithNotice = F2(
	function (result, model) {
		var nextModel = A2($author$project$Pages$EditorStack$stopSimulation, result, model);
		var _v0 = $author$project$Pages$EditorStack$simulationResultNoticeKey(result);
		if (!_v0.$) {
			var key = _v0.a;
			return A2($author$project$Pages$EditorStack$showGlobalNotice, key, nextModel);
		} else {
			return _Utils_Tuple2(nextModel, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$EditorStack$transitionMatchesStack = F2(
	function (parts, stack) {
		if ($elm$core$String$isEmpty(parts.v)) {
			return true;
		} else {
			if (stack.b) {
				var top = stack.a;
				return _Utils_eq(top, parts.v);
			} else {
				return false;
			}
		}
	});
var $author$project$Pages$EditorStack$stepSimulation = function (model) {
	var _v0 = _Utils_Tuple3(model.J, model.R, model.W);
	if (_v0.a.$ === 1) {
		var _v1 = _v0.a;
		return A2($author$project$Pages$EditorStack$stopSimulationWithNotice, 4, model);
	} else {
		var sid = _v0.a.a;
		var queue = _v0.b;
		var stack = _v0.c;
		var lambdaMatches = A2(
			$elm$core$List$filter,
			function (t) {
				var parts = $author$project$Pages$EditorStack$decodeStackTransitionLabel(t.i);
				return _Utils_eq(t.f, sid) && ($elm$core$String$isEmpty(parts.w) && A2($author$project$Pages$EditorStack$transitionMatchesStack, parts, stack));
			},
			model.d);
		var _v2 = function () {
			if (!queue.b) {
				return _Utils_Tuple2($elm$core$Maybe$Nothing, _List_Nil);
			} else {
				var c = queue.a;
				var remaining = queue.b;
				return _Utils_Tuple2(
					$elm$core$Maybe$Just(
						$elm$core$String$fromChar(c)),
					remaining);
			}
		}();
		var maybeChar = _v2.a;
		var rest = _v2.b;
		var charMatches = function () {
			if (maybeChar.$ === 1) {
				return _List_Nil;
			} else {
				var lbl = maybeChar.a;
				return A2(
					$elm$core$List$filter,
					function (t) {
						var parts = $author$project$Pages$EditorStack$decodeStackTransitionLabel(t.i);
						return _Utils_eq(t.f, sid) && (_Utils_eq(parts.w, lbl) && A2($author$project$Pages$EditorStack$transitionMatchesStack, parts, stack));
					},
					model.d);
			}
		}();
		var _v4 = $elm$core$List$isEmpty(charMatches) ? _Utils_Tuple3(lambdaMatches, false, 'λ') : _Utils_Tuple3(
			charMatches,
			true,
			A2($elm$core$Maybe$withDefault, '', maybeChar));
		var candidates = _v4.a;
		var consumesInput = _v4.b;
		var inputLabel = _v4.c;
		if (!candidates.b) {
			var result = function () {
				if (!queue.b) {
					var _v7 = A2($author$project$Pages$EditorStack$getStateById, sid, model.c);
					if (!_v7.$) {
						var s = _v7.a;
						return (s.E && $author$project$Pages$EditorStack$stackAtBase(stack)) ? 2 : 3;
					} else {
						return 4;
					}
				} else {
					return 4;
				}
			}();
			return A2($author$project$Pages$EditorStack$stopSimulationWithNotice, result, model);
		} else {
			if (!candidates.b.b) {
				var single = candidates.a;
				return A4($author$project$Pages$EditorStack$applySimulationTransition, single, rest, queue, model);
			} else {
				var centeredModel = A2($author$project$Pages$EditorStack$centerChoiceInCanvas, sid, model);
				return _Utils_Tuple2(
					_Utils_update(
						centeredModel,
						{
							h: $elm$core$Maybe$Just(sid),
							P: $elm$core$Maybe$Just(
								{
									bF: consumesInput,
									bK: inputLabel,
									bQ: sid,
									al: A2(
										$elm$core$List$map,
										function ($) {
											return $.a4;
										},
										candidates)
								}),
							S: 1,
							aJ: false
						}),
					$elm$core$Platform$Cmd$none);
			}
		}
	}
};
var $author$project$Pages$EditorStack$restoreSimulationSnapshot = F2(
	function (snapshot, model) {
		return _Utils_update(
			model,
			{h: snapshot.h, aa: snapshot.aa, P: snapshot.P, J: snapshot.J, Q: snapshot.Q, R: snapshot.R, S: snapshot.S, W: snapshot.W});
	});
var $author$project$Pages$EditorStack$stepSimulationBack = function (model) {
	var _v0 = model.av;
	if (_v0.b) {
		var previous = _v0.a;
		var rest = _v0.b;
		return _Utils_Tuple2(
			A2(
				$author$project$Pages$EditorStack$restoreSimulationSnapshot,
				previous,
				_Utils_update(
					model,
					{av: rest})),
			$elm$core$Platform$Cmd$none);
	} else {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	}
};
var $author$project$Pages$EditorStack$snapshotSimulation = function (model) {
	return {h: model.h, aa: model.aa, P: model.P, J: model.J, Q: model.Q, R: model.R, S: model.S, W: model.W};
};
var $author$project$Pages$EditorStack$stepSimulationWithHistory = function (model) {
	var snapshot = $author$project$Pages$EditorStack$snapshotSimulation(model);
	return $author$project$Pages$EditorStack$stepSimulation(
		_Utils_update(
			model,
			{
				av: A2($elm$core$List$cons, snapshot, model.av)
			}));
};
var $author$project$Pages$EditorStack$validateTransitionLine = F2(
	function (idx, originalLine) {
		var line = $elm$core$String$trim(originalLine);
		var build = function (message) {
			return $elm$core$Maybe$Just(
				{
					bN: idx + 1,
					b_: $elm$core$String$isEmpty(line) ? originalLine : line,
					bo: message
				});
		};
		if ($elm$core$String$isEmpty(line)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = $author$project$Pages$EditorStack$parseTransitionLine(line);
			if (!_v0.$) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = _v0.a;
				return build(key);
			}
		}
	});
var $author$project$Pages$EditorStack$validateTransitionCode = function (raw) {
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2(
			$elm$core$List$indexedMap,
			$author$project$Pages$EditorStack$validateTransitionLine,
			$elm$core$String$lines(raw)));
};
var $author$project$Pages$EditorStack$handleShortcut = F2(
	function (shortcut, model) {
		if (shortcut.b9) {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		} else {
			var _v44 = _Utils_Tuple3(shortcut.a7, shortcut.aY, shortcut.a$);
			_v44$15:
			while (true) {
				if (_v44.a) {
					if (_v44.b) {
						switch (_v44.c) {
							case 'KeyS':
								return _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorStack$NoOp),
										$elm$browser$Browser$Dom$focus('simulation-input-field')));
							case 'Enter':
								return $author$project$Pages$EditorStack$simulationSessionActive(model) ? A2($author$project$Pages$EditorStack$update, $author$project$Pages$EditorStack$StopSimulation, model) : A2($author$project$Pages$EditorStack$update, $author$project$Pages$EditorStack$StartSimulation, model);
							case 'KeyN':
								return A2($author$project$Pages$EditorStack$update, $author$project$Pages$EditorStack$ToggleAutomatonTypeDetails, model);
							default:
								break _v44$15;
						}
					} else {
						break _v44$15;
					}
				} else {
					if (_v44.b) {
						switch (_v44.c) {
							case 'Digit1':
								return A2(
									$author$project$Pages$EditorStack$update,
									$author$project$Pages$EditorStack$SetMode(0),
									model);
							case 'Digit2':
								return A2(
									$author$project$Pages$EditorStack$update,
									$author$project$Pages$EditorStack$SetMode(1),
									model);
							case 'Digit3':
								return A2(
									$author$project$Pages$EditorStack$update,
									$author$project$Pages$EditorStack$SetMode(2),
									model);
							case 'KeyS':
								var _v45 = model.h;
								if (!_v45.$) {
									var sid = _v45.a;
									return A2(
										$author$project$Pages$EditorStack$update,
										$author$project$Pages$EditorStack$ToggleStart(sid),
										model);
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							case 'KeyE':
								var _v46 = model.h;
								if (!_v46.$) {
									var sid = _v46.a;
									return A2(
										$author$project$Pages$EditorStack$update,
										$author$project$Pages$EditorStack$ToggleAccepting(sid),
										model);
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							case 'KeyN':
								var _v47 = _Utils_Tuple2(model.h, model.s);
								if (!_v47.a.$) {
									return _Utils_Tuple2(
										model,
										A2(
											$elm$core$Task$attempt,
											$elm$core$Basics$always($author$project$Pages$EditorStack$NoOp),
											$elm$browser$Browser$Dom$focus('selected-state-name-input')));
								} else {
									if (!_v47.b.$) {
										var _v48 = _v47.a;
										return _Utils_Tuple2(
											model,
											A2(
												$elm$core$Task$attempt,
												$elm$core$Basics$always($author$project$Pages$EditorStack$NoOp),
												$elm$browser$Browser$Dom$focus('selected-transition-label-input')));
									} else {
										return (model.z === 1) ? _Utils_Tuple2(
											model,
											A2(
												$elm$core$Task$attempt,
												$elm$core$Basics$always($author$project$Pages$EditorStack$NoOp),
												$elm$browser$Browser$Dom$focus('transition-create-label-input'))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
									}
								}
							case 'Comma':
								return (model.z === 1) ? _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorStack$NoOp),
										$elm$browser$Browser$Dom$focus('transition-create-stack-input'))) : ((!_Utils_eq(model.s, $elm$core$Maybe$Nothing)) ? _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorStack$NoOp),
										$elm$browser$Browser$Dom$focus('selected-transition-stack-input'))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
							case 'Period':
								return (model.z === 1) ? _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorStack$NoOp),
										$elm$browser$Browser$Dom$focus('transition-create-stack-output'))) : ((!_Utils_eq(model.s, $elm$core$Maybe$Nothing)) ? _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorStack$NoOp),
										$elm$browser$Browser$Dom$focus('selected-transition-stack-output'))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
							case 'KeyQ':
								return A2($author$project$Pages$EditorStack$update, $author$project$Pages$EditorStack$CenterOnStartState, model);
							case 'KeyT':
								return _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorStack$NoOp),
										$elm$browser$Browser$Dom$focus('transition-function-editor')));
							default:
								break _v44$15;
						}
					} else {
						switch (_v44.c) {
							case 'Delete':
								var _v49 = _Utils_Tuple2(model.h, model.s);
								if (!_v49.a.$) {
									var sid = _v49.a.a;
									return A2(
										$author$project$Pages$EditorStack$update,
										$author$project$Pages$EditorStack$DeleteState(sid),
										model);
								} else {
									if (!_v49.b.$) {
										var _v50 = _v49.a;
										var tid = _v49.b.a;
										return A2(
											$author$project$Pages$EditorStack$update,
											$author$project$Pages$EditorStack$DeleteTransition(tid),
											model);
									} else {
										return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
									}
								}
							case 'Backspace':
								if (shortcut.b1) {
									var _v51 = _Utils_Tuple2(model.h, model.s);
									if (!_v51.a.$) {
										var sid = _v51.a.a;
										return A2(
											$author$project$Pages$EditorStack$update,
											$author$project$Pages$EditorStack$DeleteState(sid),
											model);
									} else {
										if (!_v51.b.$) {
											var _v52 = _v51.a;
											var tid = _v51.b.a;
											return A2(
												$author$project$Pages$EditorStack$update,
												$author$project$Pages$EditorStack$DeleteTransition(tid),
												model);
										} else {
											return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
										}
									}
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							default:
								break _v44$15;
						}
					}
				}
			}
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$EditorStack$update = F2(
	function (msg, model) {
		if ($author$project$Pages$EditorStack$simulationSessionActive(model)) {
			switch (msg.$) {
				case 0:
					var button = msg.b;
					var cx = msg.c;
					var cy = msg.d;
					return (button === 1) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{
								au: $elm$core$Maybe$Just(
									{bq: model.U, br: model.V, bt: cx, bu: cy})
							}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 1:
					var mx = msg.a;
					var my = msg.b;
					var _v1 = model.au;
					if (_v1.$ === 1) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var pan = _v1.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{U: pan.bq + (mx - pan.bt), V: pan.br + (my - pan.bu)}),
							$elm$core$Platform$Cmd$none);
					}
				case 2:
					var button = msg.a;
					return (button === 1) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{au: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 32:
					return $author$project$Pages$EditorStack$stepSimulation(model);
				case 33:
					var _v2 = model.aj;
					if ((!_v2.$) && (_v2.a === 1)) {
						var _v3 = _v2.a;
						return $author$project$Pages$EditorStack$stepSimulationWithHistory(model);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 34:
					var _v4 = model.aj;
					if ((!_v4.$) && (_v4.a === 1)) {
						var _v5 = _v4.a;
						return $author$project$Pages$EditorStack$stepSimulationBack(model);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 35:
					var tid = msg.a;
					var _v6 = _Utils_Tuple2(model.P, model.J);
					if ((!_v6.a.$) && (!_v6.b.$)) {
						var choice = _v6.a.a;
						var _v7 = $elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (transition) {
									return _Utils_eq(transition.a4, tid);
								},
								model.d));
						if (!_v7.$) {
							var transition = _v7.a;
							var queue = model.R;
							var rest = function () {
								if (!queue.b) {
									return _List_Nil;
								} else {
									var remaining = queue.b;
									return remaining;
								}
							}();
							return A4($author$project$Pages$EditorStack$applySimulationTransition, transition, rest, queue, model);
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 36:
					var dx = msg.a;
					var dy = msg.b;
					return _Utils_Tuple2(
						A3($author$project$Pages$EditorStack$panWithWheel, dx, dy, model),
						$elm$core$Platform$Cmd$none);
				case 37:
					var w = msg.a;
					var h = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{cc: h, cd: w}),
						$elm$core$Platform$Cmd$none);
				case 38:
					return A2(
						$author$project$Pages$EditorStack$showGlobalNotice,
						104,
						A2($author$project$Pages$EditorStack$stopSimulation, 0, model));
				case 23:
					var focused = msg.a;
					return focused ? ($author$project$Pages$EditorStack$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: A2($author$project$Pages$EditorStack$encodeTransitionLanguage, model.c, model.d),
								T: false,
								ab: true,
								ac: _List_Nil
							}),
						$elm$core$Platform$Cmd$none)) : ($author$project$Pages$EditorStack$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: false}),
						$elm$core$Platform$Cmd$none));
				case 24:
					var top = msg.a;
					var left = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bi: left, bj: top}),
						$elm$core$Platform$Cmd$none);
				case 25:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{aB: s}),
						$elm$core$Platform$Cmd$none);
				case 26:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aA: $author$project$Pages$EditorStack$simulationDelayFromSpeedIndex(s)
							}),
						$elm$core$Platform$Cmd$none);
				case 27:
					return _Utils_Tuple2(
						$author$project$Pages$EditorStack$centerOnPreferredStartState(model),
						$elm$core$Platform$Cmd$none);
				case 28:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$EditorStack$clampZoom(model.D - 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 29:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$EditorStack$clampZoom(model.D + 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 56:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aO) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aG: false}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 57:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aS) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aR: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 58:
					var shortcut = msg.a;
					return A2($author$project$Pages$EditorStack$handleShortcut, shortcut, model);
				default:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		} else {
			switch (msg.$) {
				case 0:
					var targetTag = msg.a;
					var button = msg.b;
					var cx = msg.c;
					var cy = msg.d;
					switch (button) {
						case 1:
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										au: $elm$core$Maybe$Just(
											{bq: model.U, br: model.V, bt: cx, bu: cy})
									}),
								$elm$core$Platform$Cmd$none);
						case 0:
							var _v11 = model.z;
							if (!_v11) {
								if (targetTag !== 'svg') {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								} else {
									var stateId = model.I;
									var _v12 = A3($author$project$Pages$EditorStack$screenToWorld, model, cx, cy);
									var wx = _v12.a;
									var wy = _v12.b;
									var newState = {
										E: false,
										a4: stateId,
										M: false,
										b3: $elm$core$String$fromInt(stateId),
										j: wx,
										k: wy
									};
									return _Utils_Tuple2(
										_Utils_update(
											model,
											{
												ao: $elm$core$Maybe$Nothing,
												I: model.I + 1,
												h: $elm$core$Maybe$Just(newState.a4),
												s: $elm$core$Maybe$Nothing,
												c: _Utils_ap(
													model.c,
													_List_fromArray(
														[newState])),
												ah: $elm$core$Maybe$Nothing
											}),
										$elm$core$Platform$Cmd$none);
								}
							} else {
								if (targetTag === 'svg') {
									var _v13 = model.z;
									switch (_v13) {
										case 1:
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, Y: '', Z: '', _: '', ah: $elm$core$Maybe$Nothing}),
												$elm$core$Platform$Cmd$none);
										case 2:
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing}),
												$elm$core$Platform$Cmd$none);
										default:
											return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
									}
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							}
						default:
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 1:
					var mx = msg.a;
					var my = msg.b;
					var updatedPan = function () {
						var _v16 = model.au;
						if (_v16.$ === 1) {
							return model;
						} else {
							var pan = _v16.a;
							return _Utils_update(
								model,
								{U: pan.bq + (mx - pan.bt), V: pan.br + (my - pan.bu)});
						}
					}();
					var updatedStates = function () {
						var _v14 = updatedPan.ao;
						if (_v14.$ === 1) {
							return updatedPan;
						} else {
							var sid = _v14.a;
							var _v15 = A3($author$project$Pages$EditorStack$screenToWorld, updatedPan, mx, my);
							var wx = _v15.a;
							var wy = _v15.b;
							var move = function (s) {
								return _Utils_eq(s.a4, sid) ? _Utils_update(
									s,
									{j: wx, k: wy}) : s;
							};
							return _Utils_update(
								updatedPan,
								{
									c: A2($elm$core$List$map, move, updatedPan.c)
								});
						}
					}();
					return _Utils_Tuple2(updatedStates, $elm$core$Platform$Cmd$none);
				case 2:
					var button = msg.a;
					var clearedPan = (button === 1) ? _Utils_update(
						model,
						{au: $elm$core$Maybe$Nothing}) : model;
					var clearedDrag = (!button) ? _Utils_update(
						clearedPan,
						{ao: $elm$core$Maybe$Nothing}) : clearedPan;
					return _Utils_Tuple2(clearedDrag, $elm$core$Platform$Cmd$none);
				case 3:
					var sid = msg.a;
					var _v17 = model.z;
					if (_v17 === 2) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ao: $elm$core$Maybe$Just(sid),
									h: $elm$core$Maybe$Just(sid),
									s: $elm$core$Maybe$Nothing,
									Y: '',
									Z: '',
									_: ''
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 4:
					var sid = msg.a;
					var _v18 = model.z;
					if (_v18 === 2) {
						var toggle = function (s) {
							return _Utils_eq(s.a4, sid) ? _Utils_update(
								s,
								{E: !s.E}) : s;
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									c: A2($elm$core$List$map, toggle, model.c)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 5:
					var sid = msg.a;
					var _v19 = model.z;
					switch (_v19) {
						case 1:
							var _v20 = model.ah;
							if (_v20.$ === 1) {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											h: $elm$core$Maybe$Just(sid),
											ah: $elm$core$Maybe$Just(sid)
										}),
									$elm$core$Platform$Cmd$none);
							} else {
								var fromId = _v20.a;
								var newTransition = {
									f: fromId,
									a4: model.p,
									i: A3($author$project$Pages$EditorStack$encodeStackTransitionLabel, model.a9, model.bx, model.by),
									g: sid
								};
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											p: model.p + 1,
											h: $elm$core$Maybe$Nothing,
											s: $elm$core$Maybe$Nothing,
											ah: $elm$core$Maybe$Nothing,
											d: _Utils_ap(
												model.d,
												_List_fromArray(
													[newTransition]))
										}),
									$elm$core$Platform$Cmd$none);
							}
						case 2:
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										h: $elm$core$Maybe$Just(sid),
										s: $elm$core$Maybe$Nothing,
										Y: '',
										Z: '',
										_: '',
										ah: $elm$core$Maybe$Nothing
									}),
								$elm$core$Platform$Cmd$none);
						default:
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 6:
					var tid = msg.a;
					var _v21 = model.z;
					if (_v21 === 2) {
						var _v22 = function () {
							var _v23 = $elm$core$List$head(
								A2(
									$elm$core$List$filter,
									function (transition) {
										return _Utils_eq(transition.a4, tid);
									},
									model.d));
							if (_v23.$ === 1) {
								return _Utils_Tuple3('', '', '');
							} else {
								var transition = _v23.a;
								var parts = $author$project$Pages$EditorStack$decodeStackTransitionLabel(transition.i);
								return _Utils_Tuple3(parts.w, parts.v, parts.O);
							}
						}();
						var draftLabel = _v22.a;
						var stackInDraft = _v22.b;
						var stackOutDraft = _v22.c;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $elm$core$Maybe$Nothing,
									s: $elm$core$Maybe$Just(tid),
									Y: draftLabel,
									Z: stackInDraft,
									_: stackOutDraft
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 7:
					var sid = msg.a;
					var transFiltered = A2(
						$elm$core$List$filter,
						function (t) {
							return (!_Utils_eq(t.f, sid)) && (!_Utils_eq(t.g, sid));
						},
						model.d);
					var statesFiltered = A2(
						$elm$core$List$filter,
						function (s) {
							return !_Utils_eq(s.a4, sid);
						},
						model.c);
					var normalized = A2($author$project$Pages$EditorStack$normalizeAutomatonIds, statesFiltered, transFiltered);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{I: normalized.I, p: normalized.p, h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, Y: '', Z: '', _: '', c: normalized.c, d: normalized.d}),
						$elm$core$Platform$Cmd$none);
				case 8:
					var tid = msg.a;
					var transFiltered = A2(
						$elm$core$List$filter,
						function (t) {
							return !_Utils_eq(t.a4, tid);
						},
						model.d);
					var normalized = $author$project$Pages$EditorStack$normalizeTransitionIds(transFiltered);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{p: normalized.p, s: $elm$core$Maybe$Nothing, Y: '', Z: '', _: '', d: normalized.d}),
						$elm$core$Platform$Cmd$none);
				case 9:
					var sid = msg.a;
					var _v24 = model.z;
					if (_v24 === 2) {
						var updatedStates = function () {
							var _v25 = A2($author$project$Pages$EditorStack$getStateById, sid, model.c);
							if (_v25.$ === 1) {
								return model.c;
							} else {
								var s = _v25.a;
								return s.M ? A2(
									$elm$core$List$map,
									function (t) {
										return _Utils_eq(t.a4, sid) ? _Utils_update(
											t,
											{M: false}) : t;
									},
									model.c) : A2($author$project$Pages$EditorStack$ensureSingleStart, sid, model.c);
							}
						}();
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $elm$core$Maybe$Just(sid),
									c: updatedStates
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 10:
					var sid = msg.a;
					var _v26 = model.z;
					if (_v26 === 2) {
						var toggle = function (s) {
							return _Utils_eq(s.a4, sid) ? _Utils_update(
								s,
								{E: !s.E}) : s;
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $elm$core$Maybe$Just(sid),
									c: A2($elm$core$List$map, toggle, model.c)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 11:
					var newMode = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{ao: $elm$core$Maybe$Nothing, z: newMode, h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, Y: '', Z: '', _: '', ah: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none);
				case 12:
					var label = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								a9: $author$project$Pages$EditorStack$sanitizeTransitionEditorInput(label)
							}),
						$elm$core$Platform$Cmd$none);
				case 15:
					var label = msg.a;
					var sanitizedLabel = $author$project$Pages$EditorStack$sanitizeTransitionEditorInput(label);
					var updateTransition = function (transition) {
						return _Utils_eq(
							$elm$core$Maybe$Just(transition.a4),
							model.s) ? _Utils_update(
							transition,
							{
								i: A3($author$project$Pages$EditorStack$encodeStackTransitionLabel, sanitizedLabel, model.Z, model._)
							}) : transition;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								Y: sanitizedLabel,
								d: A2($elm$core$List$map, updateTransition, model.d)
							}),
						$elm$core$Platform$Cmd$none);
				case 13:
					var value = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bx: $author$project$Pages$EditorStack$normalizeStackInputToken(value)
							}),
						$elm$core$Platform$Cmd$none);
				case 14:
					var value = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								by: $author$project$Pages$EditorStack$normalizeStackOutputToken(value)
							}),
						$elm$core$Platform$Cmd$none);
				case 16:
					var value = msg.a;
					var normalizedValue = $author$project$Pages$EditorStack$normalizeStackInputToken(value);
					var updateTransition = function (transition) {
						return _Utils_eq(
							$elm$core$Maybe$Just(transition.a4),
							model.s) ? _Utils_update(
							transition,
							{
								i: A3($author$project$Pages$EditorStack$encodeStackTransitionLabel, model.Y, normalizedValue, model._)
							}) : transition;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								Z: normalizedValue,
								d: A2($elm$core$List$map, updateTransition, model.d)
							}),
						$elm$core$Platform$Cmd$none);
				case 17:
					var value = msg.a;
					var normalizedValue = $author$project$Pages$EditorStack$normalizeStackOutputToken(value);
					var updateTransition = function (transition) {
						return _Utils_eq(
							$elm$core$Maybe$Just(transition.a4),
							model.s) ? _Utils_update(
							transition,
							{
								i: A3($author$project$Pages$EditorStack$encodeStackTransitionLabel, model.Y, model.Z, normalizedValue)
							}) : transition;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								_: normalizedValue,
								d: A2($elm$core$List$map, updateTransition, model.d)
							}),
						$elm$core$Platform$Cmd$none);
				case 18:
					var name = msg.a;
					var _v27 = model.h;
					if (_v27.$ === 1) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var sid = _v27.a;
						var sanitizedName = A2(
							$elm$core$String$join,
							'',
							$elm$core$String$words(name));
						var updateState = function (s) {
							return _Utils_eq(s.a4, sid) ? _Utils_update(
								s,
								{b3: sanitizedName}) : s;
						};
						var updatedStates = A2($elm$core$List$map, updateState, model.c);
						return $author$project$Pages$EditorStack$hasDuplicateStateNames(updatedStates) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{ak: true}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{ak: false, c: updatedStates}),
							$elm$core$Platform$Cmd$none);
					}
				case 19:
					if ($author$project$Pages$EditorStack$hasCodeValidationErrors(model)) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{T: true}),
							$elm$core$Platform$Cmd$none);
					} else {
						var _v28 = A2($author$project$Pages$EditorStack$parseCodeDraftToAutomaton, model, model.an);
						if (!_v28.$) {
							var normalizedAutomaton = _v28.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{T: false, ac: _List_Nil, I: normalizedAutomaton.I, p: normalizedAutomaton.p, ak: false, c: normalizedAutomaton.c, d: normalizedAutomaton.d}),
								$elm$core$Platform$Cmd$none);
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{T: true}),
								$elm$core$Platform$Cmd$none);
						}
					}
				case 20:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: A2($author$project$Pages$EditorStack$encodeTransitionLanguage, model.c, model.d),
								T: false,
								ac: _List_Nil
							}),
						$elm$core$Platform$Cmd$none);
				case 21:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: s,
								T: true,
								aP: model.aP + 1,
								ac: $author$project$Pages$EditorStack$validateTransitionCode(s)
							}),
						A2(
							$elm$core$Task$perform,
							function (_v29) {
								return $author$project$Pages$EditorStack$TryParseCodeDraft(model.aP + 1);
							},
							$elm$core$Process$sleep(500)));
				case 23:
					var focused = msg.a;
					return focused ? ($author$project$Pages$EditorStack$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: A2($author$project$Pages$EditorStack$encodeTransitionLanguage, model.c, model.d),
								T: false,
								ab: true,
								ac: _List_Nil
							}),
						$elm$core$Platform$Cmd$none)) : ($author$project$Pages$EditorStack$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: false}),
						$elm$core$Platform$Cmd$none));
				case 24:
					var top = msg.a;
					var left = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bi: left, bj: top}),
						$elm$core$Platform$Cmd$none);
				case 22:
					var version = msg.a;
					if (!_Utils_eq(version, model.aP)) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						if ($author$project$Pages$EditorStack$hasCodeValidationErrors(model)) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{T: true}),
								$elm$core$Platform$Cmd$none);
						} else {
							var _v30 = A2($author$project$Pages$EditorStack$parseCodeDraftToAutomaton, model, model.an);
							if (!_v30.$) {
								var normalizedAutomaton = _v30.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{T: false, ac: _List_Nil, I: normalizedAutomaton.I, p: normalizedAutomaton.p, ak: false, c: normalizedAutomaton.c, d: normalizedAutomaton.d}),
									$elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{T: true}),
									$elm$core$Platform$Cmd$none);
							}
						}
					}
				case 25:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{aB: s}),
						$elm$core$Platform$Cmd$none);
				case 26:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aA: $author$project$Pages$EditorStack$simulationDelayFromSpeedIndex(s)
							}),
						$elm$core$Platform$Cmd$none);
				case 27:
					return _Utils_Tuple2(
						$author$project$Pages$EditorStack$centerOnPreferredStartState(model),
						$elm$core$Platform$Cmd$none);
				case 28:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$EditorStack$clampZoom(model.D - 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 29:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$EditorStack$clampZoom(model.D + 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 30:
					return $author$project$Pages$EditorStack$hasCodeValidationErrors(model) ? A2($author$project$Pages$EditorStack$showGlobalNotice, 110, model) : A2($author$project$Pages$EditorStack$startSimulation, 0, model);
				case 31:
					return $author$project$Pages$EditorStack$hasCodeValidationErrors(model) ? A2($author$project$Pages$EditorStack$showGlobalNotice, 110, model) : A2($author$project$Pages$EditorStack$startSimulation, 1, model);
				case 32:
					return $author$project$Pages$EditorStack$stepSimulation(model);
				case 33:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 34:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 35:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 36:
					var dx = msg.a;
					var dy = msg.b;
					return _Utils_Tuple2(
						A3($author$project$Pages$EditorStack$panWithWheel, dx, dy, model),
						$elm$core$Platform$Cmd$none);
				case 37:
					var w = msg.a;
					var h = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{cc: h, cd: w}),
						$elm$core$Platform$Cmd$none);
				case 38:
					return A2(
						$author$project$Pages$EditorStack$showGlobalNotice,
						104,
						A2($author$project$Pages$EditorStack$stopSimulation, 0, model));
				case 39:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{a6: true, K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 40:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{af: '', ag: $elm$core$Maybe$Nothing, a6: false, K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 41:
					var slotId = msg.a;
					var automatonJson = A2(
						$elm$json$Json$Encode$encode,
						0,
						A2(
							$author$project$AutomatonFormat$encodeAutomatonDocument,
							$author$project$Pages$EditorStack$currentAutomatonType,
							A2($author$project$Pages$EditorStack$encodeAutomaton, model.c, model.d)));
					var updateSlot = function (slot) {
						return _Utils_eq(slot.a4, slotId) ? _Utils_update(
							slot,
							{
								aZ: automatonJson,
								cj: $elm$core$Maybe$Just($author$project$Pages$EditorStack$currentAutomatonType)
							}) : slot;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aE: $elm$core$Maybe$Just(slotId),
								aI: $elm$core$Maybe$Just(slotId),
								e: A2($elm$core$List$map, updateSlot, model.e),
								K: false,
								u: false
							}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2(
									$elm$core$Task$perform,
									function (_v31) {
										return $author$project$Pages$EditorStack$ClearRecentlySavedSlot(slotId);
									},
									$elm$core$Process$sleep(2000)),
									A2(
									$elm$core$Task$perform,
									function (_v32) {
										return $author$project$Pages$EditorStack$ClearSavedSlotAnimation(slotId);
									},
									$elm$core$Process$sleep(420))
								])));
				case 42:
					var slotId = msg.a;
					var maybeSlot = $elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (slot) {
								return _Utils_eq(slot.a4, slotId);
							},
							model.e));
					if (maybeSlot.$ === 1) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var slot = maybeSlot.a;
						if ($elm$core$String$isEmpty(slot.aZ)) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							if ($author$project$Pages$EditorStack$slotTypeMismatch(slot.cj)) {
								return A2(
									$author$project$Pages$EditorStack$showGlobalNotice,
									58,
									_Utils_update(
										model,
										{K: false, u: true}));
							} else {
								var _v34 = A2(
									$elm$json$Json$Decode$decodeString,
									A2($author$project$AutomatonFormat$decodeAutomatonDocument, $author$project$Pages$EditorStack$currentAutomatonType, $author$project$Pages$EditorStack$decodeAutomaton),
									slot.aZ);
								if (!_v34.$) {
									var document = _v34.a;
									if (!_Utils_eq(document.cj, $author$project$Pages$EditorStack$currentAutomatonType)) {
										return A2(
											$author$project$Pages$EditorStack$showGlobalNotice,
											58,
											_Utils_update(
												model,
												{K: false, u: true}));
									} else {
										var _v35 = document.ci;
										var ss = _v35.a;
										var ts = _v35.b;
										if ($author$project$Pages$EditorStack$hasDuplicateStateNames(ss)) {
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{ak: true}),
												$elm$core$Platform$Cmd$none);
										} else {
											var normalizedStates = $author$project$Pages$EditorStack$enforceSingleStartFlag(ss);
											var normalizedAutomaton = A2($author$project$Pages$EditorStack$normalizeAutomatonIds, normalizedStates, ts);
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{ao: $elm$core$Maybe$Nothing, I: normalizedAutomaton.I, p: normalizedAutomaton.p, h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, aa: $elm$core$Maybe$Nothing, P: $elm$core$Maybe$Nothing, J: $elm$core$Maybe$Nothing, av: _List_Nil, Q: 0, R: _List_Nil, S: 0, aj: $elm$core$Maybe$Nothing, aJ: false, u: false, ak: false, c: normalizedAutomaton.c, ah: $elm$core$Maybe$Nothing, d: normalizedAutomaton.d}),
												$elm$core$Platform$Cmd$none);
										}
									}
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							}
						}
					}
				case 43:
					var slotId = msg.a;
					var updateSlot = function (slot) {
						return _Utils_eq(slot.a4, slotId) ? _Utils_update(
							slot,
							{aZ: '', cj: $elm$core$Maybe$Nothing, b3: ''}) : slot;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aN: $elm$core$Maybe$Just(slotId),
								af: _Utils_eq(
									model.ag,
									$elm$core$Maybe$Just(slotId)) ? '' : model.af,
								ag: _Utils_eq(
									model.ag,
									$elm$core$Maybe$Just(slotId)) ? $elm$core$Maybe$Nothing : model.ag,
								e: A2($elm$core$List$map, updateSlot, model.e),
								K: false,
								u: false
							}),
						A2(
							$elm$core$Task$perform,
							function (_v36) {
								return $author$project$Pages$EditorStack$ClearDeletedSlotAnimation(slotId);
							},
							$elm$core$Process$sleep(420)));
				case 44:
					var slotId = msg.a;
					var currentName = A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.b3;
							},
							$elm$core$List$head(
								A2(
									$elm$core$List$filter,
									function (slot) {
										return _Utils_eq(slot.a4, slotId);
									},
									model.e))));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								af: currentName,
								ag: $elm$core$Maybe$Just(slotId),
								u: false
							}),
						$elm$core$Platform$Cmd$none);
				case 45:
					var slotName = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{af: slotName, u: false}),
						$elm$core$Platform$Cmd$none);
				case 46:
					var slotId = msg.a;
					var trimmedName = $elm$core$String$trim(model.af);
					var updateSlot = function (slot) {
						return _Utils_eq(slot.a4, slotId) ? _Utils_update(
							slot,
							{b3: trimmedName}) : slot;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								af: '',
								ag: $elm$core$Maybe$Nothing,
								e: A2($elm$core$List$map, updateSlot, model.e),
								u: false
							}),
						$elm$core$Platform$Cmd$none);
				case 47:
					var slotId = msg.a;
					return _Utils_eq(
						model.aI,
						$elm$core$Maybe$Just(slotId)) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aI: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 48:
					var slotId = msg.a;
					return _Utils_eq(
						model.aE,
						$elm$core$Maybe$Just(slotId)) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aE: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 49:
					var slotId = msg.a;
					return _Utils_eq(
						model.aN,
						$elm$core$Maybe$Just(slotId)) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aN: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 50:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 51:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 52:
					var slotId = msg.a;
					var importedJson = msg.b;
					var _v37 = A2(
						$elm$json$Json$Decode$decodeString,
						A2($author$project$AutomatonFormat$decodeAutomatonDocument, $author$project$Pages$EditorStack$currentAutomatonType, $author$project$Pages$EditorStack$decodeAutomaton),
						importedJson);
					if (!_v37.$) {
						var document = _v37.a;
						var _v38 = document.ci;
						var importedStates = _v38.a;
						var importedTransitions = _v38.b;
						var minifiedAutomatonJson = A2(
							$elm$json$Json$Encode$encode,
							0,
							A2(
								$author$project$AutomatonFormat$encodeAutomatonDocument,
								document.cj,
								A2($author$project$Pages$EditorStack$encodeAutomaton, importedStates, importedTransitions)));
						var updateSlot = function (slot) {
							return _Utils_eq(slot.a4, slotId) ? _Utils_update(
								slot,
								{
									aZ: minifiedAutomatonJson,
									cj: $elm$core$Maybe$Just(document.cj)
								}) : slot;
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									aE: $elm$core$Maybe$Just(slotId),
									aI: $elm$core$Maybe$Just(slotId),
									e: A2($elm$core$List$map, updateSlot, model.e),
									K: false,
									u: false
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										A2(
										$elm$core$Task$perform,
										function (_v39) {
											return $author$project$Pages$EditorStack$ClearRecentlySavedSlot(slotId);
										},
										$elm$core$Process$sleep(2000)),
										A2(
										$elm$core$Task$perform,
										function (_v40) {
											return $author$project$Pages$EditorStack$ClearSavedSlotAnimation(slotId);
										},
										$elm$core$Process$sleep(420))
									])));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{K: true, u: false}),
							A2(
								$elm$core$Task$perform,
								function (_v41) {
									return $author$project$Pages$EditorStack$ClearSlotImportError;
								},
								$elm$core$Process$sleep(3000)));
					}
				case 53:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: true, u: false}),
						A2(
							$elm$core$Task$perform,
							function (_v42) {
								return $author$project$Pages$EditorStack$ClearSlotImportError;
							},
							$elm$core$Process$sleep(3000)));
				case 54:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 55:
					var nextNonce = model.aO + 1;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{aG: true, aO: nextNonce, a_: !model.a_}),
						A2(
							$elm$core$Task$perform,
							function (_v43) {
								return $author$project$Pages$EditorStack$AutomatonTypeAnimationFinished(nextNonce);
							},
							$elm$core$Process$sleep(260)));
				case 56:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aO) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aG: false}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 57:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aS) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aR: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 58:
					var shortcut = msg.a;
					return A2($author$project$Pages$EditorStack$handleShortcut, shortcut, model);
				default:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		}
	});
var $author$project$Pages$EditorTuring$AddTransition = 1;
var $author$project$Pages$EditorTuring$AutoRun = 0;
var $author$project$Pages$EditorTuring$AutomatonTypeAnimationFinished = function (a) {
	return {$: 56, a: a};
};
var $author$project$Pages$EditorTuring$CenterOnStartState = {$: 27};
var $author$project$Pages$EditorTuring$ClearDeletedSlotAnimation = function (a) {
	return {$: 49, a: a};
};
var $author$project$Pages$EditorTuring$ClearRecentlySavedSlot = function (a) {
	return {$: 47, a: a};
};
var $author$project$Pages$EditorTuring$ClearSavedSlotAnimation = function (a) {
	return {$: 48, a: a};
};
var $author$project$Pages$EditorTuring$ClearSlotImportError = {$: 54};
var $author$project$Pages$EditorTuring$DeleteState = function (a) {
	return {$: 7, a: a};
};
var $author$project$Pages$EditorTuring$DeleteTransition = function (a) {
	return {$: 8, a: a};
};
var $author$project$Pages$EditorTuring$MoveState = 2;
var $author$project$Pages$EditorTuring$NoOp = {$: 59};
var $author$project$Pages$EditorTuring$SetMode = function (a) {
	return {$: 11, a: a};
};
var $author$project$Pages$EditorTuring$StartSimulation = {$: 30};
var $author$project$Pages$EditorTuring$StepRun = 1;
var $author$project$Pages$EditorTuring$StopSimulation = {$: 38};
var $author$project$Pages$EditorTuring$ToggleAccepting = function (a) {
	return {$: 10, a: a};
};
var $author$project$Pages$EditorTuring$ToggleAutomatonTypeDetails = {$: 55};
var $author$project$Pages$EditorTuring$ToggleStart = function (a) {
	return {$: 9, a: a};
};
var $author$project$Pages$EditorTuring$TryParseCodeDraft = function (a) {
	return {$: 22, a: a};
};
var $author$project$Pages$EditorTuring$AdvanceSimulation = {$: 32};
var $author$project$Pages$EditorTuring$Running = 1;
var $author$project$Pages$EditorTuring$normalizeStackInputToken = function (raw) {
	return A2(
		$elm$core$String$left,
		1,
		$elm$core$String$trim(raw));
};
var $elm$core$String$toUpper = _String_toUpper;
var $author$project$Pages$EditorTuring$normalizeStackOutputToken = function (raw) {
	var _v0 = $elm$core$String$toUpper(
		A2(
			$elm$core$String$left,
			1,
			$elm$core$String$trim(raw)));
	switch (_v0) {
		case 'L':
			return 'L';
		case 'R':
			return 'R';
		default:
			return 'S';
	}
};
var $author$project$Pages$EditorTuring$normalizeTransitionLabel = function (raw) {
	return A2(
		$elm$core$String$left,
		1,
		$elm$core$String$trim(raw));
};
var $author$project$Pages$EditorTuring$decodeStackTransitionLabel = function (raw) {
	var _v0 = A2($elm$core$String$split, '|', raw);
	if (_v0.b) {
		if (_v0.b.b) {
			var inputSymbol = _v0.a;
			var _v1 = _v0.b;
			var inputStack = _v1.a;
			var outputStackParts = _v1.b;
			return {
				v: $author$project$Pages$EditorTuring$normalizeStackInputToken(inputStack),
				w: $author$project$Pages$EditorTuring$normalizeTransitionLabel(inputSymbol),
				O: $author$project$Pages$EditorTuring$normalizeStackOutputToken(
					A2($elm$core$String$join, '|', outputStackParts))
			};
		} else {
			var inputSymbol = _v0.a;
			return {
				v: '',
				w: $author$project$Pages$EditorTuring$normalizeTransitionLabel(inputSymbol),
				O: ''
			};
		}
	} else {
		return {v: '', w: '', O: ''};
	}
};
var $author$project$Pages$EditorTuring$blankSymbol = '_';
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Pages$EditorTuring$moveHead = F3(
	function (direction, index, tape) {
		switch (direction) {
			case 'L':
				return (index <= 0) ? _Utils_Tuple2(
					0,
					A2($elm$core$List$cons, $author$project$Pages$EditorTuring$blankSymbol, tape)) : _Utils_Tuple2(index - 1, tape);
			case 'R':
				var nextIndex = index + 1;
				var nextTape = (_Utils_cmp(
					nextIndex,
					$elm$core$List$length(tape)) > -1) ? _Utils_ap(
					tape,
					_List_fromArray(
						[$author$project$Pages$EditorTuring$blankSymbol])) : tape;
				return _Utils_Tuple2(nextIndex, nextTape);
			default:
				return _Utils_Tuple2(index, tape);
		}
	});
var $author$project$Pages$EditorTuring$parseDelay = function (raw) {
	var _v0 = $elm$core$String$toFloat(
		$elm$core$String$trim(raw));
	if (!_v0.$) {
		var n = _v0.a;
		return A2($elm$core$Basics$max, 0, n);
	} else {
		return 500;
	}
};
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$Pages$EditorTuring$writeTapeSymbol = F3(
	function (tape, index, writeToken) {
		if ($elm$core$String$trim(writeToken) === '') {
			return tape;
		} else {
			var writeChar = A2(
				$elm$core$Maybe$withDefault,
				$author$project$Pages$EditorTuring$blankSymbol,
				$elm$core$List$head(
					$elm$core$String$toList(writeToken)));
			var paddedTape = (_Utils_cmp(
				index,
				$elm$core$List$length(tape)) < 0) ? tape : _Utils_ap(
				tape,
				A2(
					$elm$core$List$repeat,
					(index - $elm$core$List$length(tape)) + 1,
					$author$project$Pages$EditorTuring$blankSymbol));
			return A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, ch) {
						return _Utils_eq(i, index) ? writeChar : ch;
					}),
				paddedTape);
		}
	});
var $author$project$Pages$EditorTuring$applySimulationTransition = F4(
	function (transition, rest, queue, model) {
		var parts = $author$project$Pages$EditorTuring$decodeStackTransitionLabel(transition.i);
		var writtenTape = A3($author$project$Pages$EditorTuring$writeTapeSymbol, queue, model.Q, parts.v);
		var delay = $author$project$Pages$EditorTuring$parseDelay(model.aA);
		var cmd = _Utils_eq(
			model.aj,
			$elm$core$Maybe$Just(0)) ? A2(
			$elm$core$Task$perform,
			function (_v2) {
				return $author$project$Pages$EditorTuring$AdvanceSimulation;
			},
			$elm$core$Process$sleep(delay)) : $elm$core$Platform$Cmd$none;
		var _v0 = A3($author$project$Pages$EditorTuring$moveHead, parts.O, model.Q, writtenTape);
		var movedHead = _v0.a;
		var movedTape = _v0.b;
		var nextModel = _Utils_update(
			model,
			{
				h: $elm$core$Maybe$Just(transition.g),
				aa: $elm$core$Maybe$Just(transition.a4),
				P: $elm$core$Maybe$Nothing,
				J: $elm$core$Maybe$Just(transition.g),
				Q: movedHead,
				R: movedTape,
				S: 1,
				aJ: _Utils_eq(
					model.aj,
					$elm$core$Maybe$Just(0)),
				W: _List_Nil
			});
		var _v1 = rest;
		return _Utils_Tuple2(nextModel, cmd);
	});
var $author$project$Pages$EditorTuring$editorLayout = function (model) {
	var editorHeight = A2($elm$core$Basics$max, 560, model.cc - 90);
	var mainRowHeight = A2($elm$core$Basics$max, 320, editorHeight - 120);
	var canvasWidth = A2($elm$core$Basics$max, 360, model.cd - 860);
	var canvasHeight = mainRowHeight - 56;
	return {bg: canvasHeight, bh: canvasWidth, cW: editorHeight, c2: mainRowHeight};
};
var $author$project$Pages$EditorTuring$findStartState = function (states) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filter,
			function ($) {
				return $.M;
			},
			states));
};
var $author$project$Pages$EditorTuring$preferredStartState = function (states) {
	var _v0 = $author$project$Pages$EditorTuring$findStartState(states);
	if (!_v0.$) {
		var startState = _v0.a;
		return $elm$core$Maybe$Just(startState);
	} else {
		return $elm$core$List$head(
			A2(
				$elm$core$List$sortBy,
				function ($) {
					return $.a4;
				},
				states));
	}
};
var $author$project$Pages$EditorTuring$centerOnPreferredStartState = function (model) {
	var _v0 = $author$project$Pages$EditorTuring$preferredStartState(model.c);
	if (_v0.$ === 1) {
		return model;
	} else {
		var state = _v0.a;
		var layout = $author$project$Pages$EditorTuring$editorLayout(model);
		return _Utils_update(
			model,
			{ao: $elm$core$Maybe$Nothing, U: (layout.bh / 2) - (state.j * model.D), V: (layout.bg / 2) - (state.k * model.D), au: $elm$core$Maybe$Nothing});
	}
};
var $author$project$Pages$EditorTuring$clampZoom = function (value) {
	return A2(
		$elm$core$Basics$max,
		0.5,
		A2($elm$core$Basics$min, 2, value));
};
var $author$project$Pages$EditorTuring$currentAutomatonType = 1;
var $author$project$Pages$EditorTuring$encodeStackTransitionLabel = F3(
	function (inputSymbol, inputStack, outputStack) {
		return $author$project$Pages$EditorTuring$normalizeTransitionLabel(inputSymbol) + ('|' + ($author$project$Pages$EditorTuring$normalizeStackInputToken(inputStack) + ('|' + $author$project$Pages$EditorTuring$normalizeStackOutputToken(outputStack))));
	});
var $author$project$Pages$EditorTuring$uniqueLabels = function (labels) {
	var step = F2(
		function (label, acc) {
			return A2($elm$core$List$member, label, acc) ? acc : _Utils_ap(
				acc,
				_List_fromArray(
					[label]));
		});
	return A3($elm$core$List$foldl, step, _List_Nil, labels);
};
var $author$project$Pages$EditorTuring$decodeJsonLabelToTokens = function (raw) {
	var parts = A2($elm$core$String$contains, ';', raw) ? A2($elm$core$String$split, ';', raw) : _List_fromArray(
		[raw]);
	var normalizeToken = function (token) {
		var trimmed = $elm$core$String$trim(token);
		return A2($elm$core$String$contains, '|', trimmed) ? trimmed : (((trimmed === 'λ') || (trimmed === '')) ? A3($author$project$Pages$EditorTuring$encodeStackTransitionLabel, '', '', '') : A3($author$project$Pages$EditorTuring$encodeStackTransitionLabel, trimmed, '', ''));
	};
	var normalized = A2($elm$core$List$map, normalizeToken, parts);
	return ($elm$core$String$trim(raw) === '') ? _List_fromArray(
		[
			A3($author$project$Pages$EditorTuring$encodeStackTransitionLabel, '', '', '')
		]) : $author$project$Pages$EditorTuring$uniqueLabels(normalized);
};
var $author$project$Pages$EditorTuring$decodeState = A2(
	$elm$json$Json$Decode$andThen,
	function (id) {
		return A6(
			$elm$json$Json$Decode$map5,
			F5(
				function (x, y, accepting, isStart, maybeName) {
					return {
						E: accepting,
						a4: id,
						M: isStart,
						b3: A2(
							$elm$core$Maybe$withDefault,
							$elm$core$String$fromInt(id),
							maybeName),
						j: x,
						k: y
					};
				}),
			A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'accepting', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'isStart', $elm$json$Json$Decode$bool),
			$elm$json$Json$Decode$maybe(
				A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string)));
	},
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int));
var $author$project$Pages$EditorTuring$decodeTransition = A4(
	$elm$json$Json$Decode$map3,
	F3(
		function (from, to, label) {
			return {f: from, i: label, g: to};
		}),
	A2($elm$json$Json$Decode$field, 'from', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'to', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'label', $elm$json$Json$Decode$string));
var $author$project$Pages$EditorTuring$decodeAutomaton = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (states, payloadTransitions) {
			var expanded = A2(
				$elm$core$List$indexedMap,
				F2(
					function (idx, transition) {
						return _Utils_update(
							transition,
							{a4: idx + 1});
					}),
				A2(
					$elm$core$List$concatMap,
					function (payload) {
						return A2(
							$elm$core$List$map,
							function (token) {
								return {f: payload.f, a4: 0, i: token, g: payload.g};
							},
							$author$project$Pages$EditorTuring$decodeJsonLabelToTokens(payload.i));
					},
					payloadTransitions));
			return _Utils_Tuple2(states, expanded);
		}),
	A2(
		$elm$json$Json$Decode$field,
		'states',
		$elm$json$Json$Decode$list($author$project$Pages$EditorTuring$decodeState)),
	A2(
		$elm$json$Json$Decode$field,
		'transitions',
		$elm$json$Json$Decode$list($author$project$Pages$EditorTuring$decodeTransition)));
var $author$project$Pages$EditorTuring$encodeState = function (s) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(s.a4)),
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(s.b3)),
				_Utils_Tuple2(
				'x',
				$elm$json$Json$Encode$float(s.j)),
				_Utils_Tuple2(
				'y',
				$elm$json$Json$Encode$float(s.k)),
				_Utils_Tuple2(
				'accepting',
				$elm$json$Json$Encode$bool(s.E)),
				_Utils_Tuple2(
				'isStart',
				$elm$json$Json$Encode$bool(s.M))
			]));
};
var $author$project$Pages$EditorTuring$encodeTransition = function (t) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(0)),
				_Utils_Tuple2(
				'from',
				$elm$json$Json$Encode$int(t.f)),
				_Utils_Tuple2(
				'to',
				$elm$json$Json$Encode$int(t.g)),
				_Utils_Tuple2(
				'label',
				$elm$json$Json$Encode$string(t.i))
			]));
};
var $author$project$Pages$EditorTuring$groupTransitionsForRender = function (transitions) {
	var step = F2(
		function (transition, _v2) {
			var grouped = _v2.a;
			var order = _v2.b;
			var key = _Utils_Tuple2(transition.f, transition.g);
			var _v1 = A2($elm$core$Dict$get, key, grouped);
			if (!_v1.$) {
				var existing = _v1.a;
				return _Utils_Tuple2(
					A3(
						$elm$core$Dict$insert,
						key,
						_Utils_update(
							existing,
							{
								a5: _Utils_ap(
									existing.a5,
									_List_fromArray(
										[transition.i])),
								al: _Utils_ap(
									existing.al,
									_List_fromArray(
										[transition.a4]))
							}),
						grouped),
					order);
			} else {
				return _Utils_Tuple2(
					A3(
						$elm$core$Dict$insert,
						key,
						{
							f: transition.f,
							a5: _List_fromArray(
								[transition.i]),
							b6: transition.a4,
							g: transition.g,
							al: _List_fromArray(
								[transition.a4])
						},
						grouped),
					A2($elm$core$List$cons, key, order));
			}
		});
	var sortedTransitions = A2(
		$elm$core$List$sortBy,
		function ($) {
			return $.a4;
		},
		transitions);
	var _v0 = A3(
		$elm$core$List$foldl,
		step,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		sortedTransitions);
	var groupedByPair = _v0.a;
	var orderedKeysReversed = _v0.b;
	return A2(
		$elm$core$List$filterMap,
		function (key) {
			return A2($elm$core$Dict$get, key, groupedByPair);
		},
		$elm$core$List$reverse(orderedKeysReversed));
};
var $author$project$Pages$EditorTuring$isLambdaLabel = function (label) {
	return $elm$core$String$isEmpty(
		$author$project$Pages$EditorTuring$decodeStackTransitionLabel(label).w);
};
var $author$project$Pages$EditorTuring$transitionLabelsForJson = function (labels) {
	return A2(
		$elm$core$String$join,
		';',
		A2(
			$elm$core$List$map,
			function (token) {
				return $author$project$Pages$EditorTuring$isLambdaLabel(token) ? 'λ' : token;
			},
			$author$project$Pages$EditorTuring$uniqueLabels(labels)));
};
var $author$project$Pages$EditorTuring$encodeAutomaton = F2(
	function (states, transitions) {
		var groupedTransitions = A2(
			$elm$core$List$map,
			function (group) {
				return {
					f: group.f,
					i: $author$project$Pages$EditorTuring$transitionLabelsForJson(group.a5),
					g: group.g
				};
			},
			$author$project$Pages$EditorTuring$groupTransitionsForRender(transitions));
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'states',
					A2($elm$json$Json$Encode$list, $author$project$Pages$EditorTuring$encodeState, states)),
					_Utils_Tuple2(
					'transitions',
					A2($elm$json$Json$Encode$list, $author$project$Pages$EditorTuring$encodeTransition, groupedTransitions))
				]));
	});
var $author$project$Pages$EditorTuring$getStateById = F2(
	function (id, states) {
		return $elm$core$List$head(
			A2(
				$elm$core$List$filter,
				function (s) {
					return _Utils_eq(s.a4, id);
				},
				states));
	});
var $author$project$Pages$EditorTuring$stateDisplayName = function (state) {
	return $elm$core$String$isEmpty(
		$elm$core$String$trim(state.b3)) ? $elm$core$String$fromInt(state.a4) : state.b3;
};
var $author$project$Pages$EditorTuring$stateNameById = F2(
	function (states, stateId) {
		var _v0 = A2($author$project$Pages$EditorTuring$getStateById, stateId, states);
		if (!_v0.$) {
			var state = _v0.a;
			return $author$project$Pages$EditorTuring$stateDisplayName(state);
		} else {
			return $elm$core$String$fromInt(stateId);
		}
	});
var $author$project$Pages$EditorTuring$encodeTransitionLanguage = F2(
	function (states, transitions) {
		return A2(
			$elm$core$String$join,
			'\n',
			A2(
				$elm$core$List$map,
				function (tr) {
					var parts = $author$project$Pages$EditorTuring$decodeStackTransitionLabel(tr.i);
					return '(' + (A2($author$project$Pages$EditorTuring$stateNameById, states, tr.f) + (', ' + (($elm$core$String$isEmpty(parts.w) ? 'λ' : parts.w) + (', ' + (($elm$core$String$isEmpty(parts.v) ? 'λ' : parts.v) + (') => (' + (A2($author$project$Pages$EditorTuring$stateNameById, states, tr.g) + (', ' + (($elm$core$String$isEmpty(parts.O) ? 'λ' : parts.O) + ')')))))))));
				},
				A2(
					$elm$core$List$sortBy,
					function ($) {
						return $.a4;
					},
					transitions)));
	});
var $author$project$Pages$EditorTuring$ensureSingleStart = F2(
	function (id, states) {
		return A2(
			$elm$core$List$map,
			function (s) {
				return _Utils_update(
					s,
					{
						M: _Utils_eq(s.a4, id)
					});
			},
			states);
	});
var $author$project$Pages$EditorTuring$enforceSingleStartFlag = function (states) {
	var _v0 = A2(
		$elm$core$List$filter,
		function ($) {
			return $.M;
		},
		states);
	if (!_v0.b) {
		return states;
	} else {
		var s = _v0.a;
		return A2($author$project$Pages$EditorTuring$ensureSingleStart, s.a4, states);
	}
};
var $author$project$Pages$EditorTuring$hasCodeValidationErrors = function (model) {
	return !$elm$core$List$isEmpty(model.ac);
};
var $author$project$Pages$EditorTuring$unique = F2(
	function (value, acc) {
		return A2($elm$core$List$member, value, acc) ? acc : A2($elm$core$List$cons, value, acc);
	});
var $author$project$Pages$EditorTuring$hasDuplicateStateNames = function (states) {
	var names = A2(
		$elm$core$List$map,
		A2($elm$core$Basics$composeR, $author$project$Pages$EditorTuring$stateDisplayName, $elm$core$String$trim),
		states);
	return !_Utils_eq(
		$elm$core$List$length(names),
		$elm$core$List$length(
			A3($elm$core$List$foldl, $author$project$Pages$EditorTuring$unique, _List_Nil, names)));
};
var $author$project$Pages$EditorTuring$normalizeTransitionIds = function (transitions) {
	var step = F2(
		function (transition, _v1) {
			var nextId = _v1.a;
			var acc = _v1.b;
			return _Utils_Tuple2(
				nextId + 1,
				A2(
					$elm$core$List$cons,
					_Utils_update(
						transition,
						{a4: nextId}),
					acc));
		});
	var sorted = A2(
		$elm$core$List$sortBy,
		function ($) {
			return $.a4;
		},
		transitions);
	var _v0 = A3(
		$elm$core$List$foldl,
		step,
		_Utils_Tuple2(1, _List_Nil),
		sorted);
	var nextTransitionId = _v0.a;
	var reversed = _v0.b;
	return {
		p: nextTransitionId,
		d: $elm$core$List$reverse(reversed)
	};
};
var $author$project$Pages$EditorTuring$normalizeAutomatonIds = F2(
	function (states, transitions) {
		var sortedStates = A2(
			$elm$core$List$sortBy,
			function ($) {
				return $.a4;
			},
			states);
		var renumberStates = F2(
			function (state, _v1) {
				var nextId = _v1.a;
				var mapping = _v1.b;
				var acc = _v1.c;
				var normalizedName = ($elm$core$String$isEmpty(
					$elm$core$String$trim(state.b3)) || _Utils_eq(
					state.b3,
					$elm$core$String$fromInt(state.a4))) ? $elm$core$String$fromInt(nextId) : state.b3;
				var newState = _Utils_update(
					state,
					{a4: nextId, b3: normalizedName});
				return _Utils_Tuple3(
					nextId + 1,
					A3($elm$core$Dict$insert, state.a4, nextId, mapping),
					A2($elm$core$List$cons, newState, acc));
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			renumberStates,
			_Utils_Tuple3(1, $elm$core$Dict$empty, _List_Nil),
			sortedStates);
		var nextStateId = _v0.a;
		var stateIdMap = _v0.b;
		var reversedStates = _v0.c;
		var remapStateId = function (oldId) {
			return A2(
				$elm$core$Maybe$withDefault,
				oldId,
				A2($elm$core$Dict$get, oldId, stateIdMap));
		};
		var remappedTransitions = A2(
			$elm$core$List$map,
			function (transition) {
				return _Utils_update(
					transition,
					{
						f: remapStateId(transition.f),
						g: remapStateId(transition.g)
					});
			},
			transitions);
		var normalizedTransitions = $author$project$Pages$EditorTuring$normalizeTransitionIds(remappedTransitions);
		return {
			I: nextStateId,
			p: normalizedTransitions.p,
			c: $elm$core$List$reverse(reversedStates),
			d: normalizedTransitions.d
		};
	});
var $author$project$Pages$EditorTuring$panWithWheel = F3(
	function (dx, dy, model) {
		return _Utils_update(
			model,
			{ao: $elm$core$Maybe$Nothing, U: model.U - dx, V: model.V - dy, au: $elm$core$Maybe$Nothing});
	});
var $author$project$Pages$EditorTuring$buildAutomatonFromParsedTransitions = F2(
	function (existingStates, parsedTransitions) {
		var spacingY = 100;
		var spacingX = 160;
		var placeState = F2(
			function (fallbackName, positions) {
				var _v20 = A2($elm$core$Dict$get, fallbackName, positions);
				if (!_v20.$) {
					return positions;
				} else {
					var index = $elm$core$Dict$size(positions);
					var xCol = (index / 5) | 0;
					var yRow = index % 5;
					return A3(
						$elm$core$Dict$insert,
						fallbackName,
						_Utils_Tuple2(100 + (xCol * spacingX), 100 + (yRow * spacingY)),
						positions);
				}
			});
		var placeFromTo = F2(
			function (transition, positions) {
				placeFromTo:
				while (true) {
					var toPosition = A2($elm$core$Dict$get, transition.aK, positions);
					var fromPosition = A2($elm$core$Dict$get, transition.ay, positions);
					var _v0 = _Utils_Tuple2(fromPosition, toPosition);
					if (!_v0.a.$) {
						if (_v0.b.$ === 1) {
							var _v1 = _v0.a.a;
							var fx = _v1.a;
							var fy = _v1.b;
							var _v2 = _v0.b;
							return A3(
								$elm$core$Dict$insert,
								transition.aK,
								_Utils_Tuple2(fx + spacingX, fy),
								positions);
						} else {
							return positions;
						}
					} else {
						if (!_v0.b.$) {
							var _v3 = _v0.a;
							var _v4 = _v0.b.a;
							var tx = _v4.a;
							var ty = _v4.b;
							return A3(
								$elm$core$Dict$insert,
								transition.ay,
								_Utils_Tuple2(tx - spacingX, ty),
								positions);
						} else {
							var _v5 = _v0.a;
							var _v6 = _v0.b;
							var seeded = A2(placeState, transition.ay, positions);
							var $temp$transition = transition,
								$temp$positions = seeded;
							transition = $temp$transition;
							positions = $temp$positions;
							continue placeFromTo;
						}
					}
				}
			});
		var names = A3(
			$elm$core$List$foldl,
			F2(
				function (name, acc) {
					return A2($elm$core$List$member, name, acc) ? acc : _Utils_ap(
						acc,
						_List_fromArray(
							[name]));
				}),
			_List_Nil,
			A2(
				$elm$core$List$concatMap,
				function (t) {
					return _List_fromArray(
						[t.ay, t.aK]);
				},
				parsedTransitions));
		var isOccupied = F2(
			function (occupied, _v19) {
				var x = _v19.a;
				var y = _v19.b;
				return A2(
					$elm$core$List$any,
					function (_v18) {
						var ox = _v18.a;
						var oy = _v18.b;
						return _Utils_eq(ox, x) && _Utils_eq(oy, y);
					},
					occupied);
			});
		var placeWithoutOverlap = F2(
			function (occupied, _v7) {
				placeWithoutOverlap:
				while (true) {
					var x = _v7.a;
					var y = _v7.b;
					if (A2(
						isOccupied,
						occupied,
						_Utils_Tuple2(x, y))) {
						var $temp$occupied = occupied,
							$temp$_v7 = _Utils_Tuple2(x, y + spacingY);
						occupied = $temp$occupied;
						_v7 = $temp$_v7;
						continue placeWithoutOverlap;
					} else {
						return _Utils_Tuple2(x, y);
					}
				}
			});
		var indexedNames = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, name) {
					return _Utils_Tuple2(name, idx + 1);
				}),
			names);
		var idByName = $elm$core$Dict$fromList(indexedNames);
		var transitions = A2(
			$elm$core$List$indexedMap,
			F2(
				function (idx, tr) {
					return {
						f: A2(
							$elm$core$Maybe$withDefault,
							1,
							A2($elm$core$Dict$get, tr.ay, idByName)),
						a4: idx + 1,
						i: A3($author$project$Pages$EditorTuring$encodeStackTransitionLabel, tr.w, tr.v, tr.O),
						g: A2(
							$elm$core$Maybe$withDefault,
							1,
							A2($elm$core$Dict$get, tr.aK, idByName))
					};
				}),
			parsedTransitions);
		var findAnchorFromOutgoing = F2(
			function (name, positions) {
				return A2(
					$elm$core$Maybe$andThen,
					function (tr) {
						return A2($elm$core$Dict$get, tr.aK, positions);
					},
					$elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (tr) {
								return _Utils_eq(tr.ay, name);
							},
							parsedTransitions)));
			});
		var findAnchorFromIncoming = F2(
			function (name, positions) {
				return A2(
					$elm$core$Maybe$andThen,
					function (tr) {
						return A2($elm$core$Dict$get, tr.ay, positions);
					},
					$elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (tr) {
								return _Utils_eq(tr.aK, name);
							},
							parsedTransitions)));
			});
		var placeUnresolved = F2(
			function (namesToPlace, positions) {
				placeUnresolved:
				while (true) {
					if ($elm$core$List$isEmpty(namesToPlace)) {
						return positions;
					} else {
						var step = F2(
							function (name, _v15) {
								var accPositions = _v15.a;
								var unresolved = _v15.b;
								var hasProgress = _v15.c;
								var _v10 = A2($elm$core$Dict$get, name, accPositions);
								if (!_v10.$) {
									return _Utils_Tuple3(accPositions, unresolved, hasProgress);
								} else {
									var occupied = $elm$core$Dict$values(accPositions);
									var _v11 = A2(findAnchorFromIncoming, name, accPositions);
									if (!_v11.$) {
										var _v12 = _v11.a;
										var ax = _v12.a;
										var ay = _v12.b;
										var target = A2(
											placeWithoutOverlap,
											occupied,
											_Utils_Tuple2(ax + spacingX, ay));
										return _Utils_Tuple3(
											A3($elm$core$Dict$insert, name, target, accPositions),
											unresolved,
											true);
									} else {
										var _v13 = A2(findAnchorFromOutgoing, name, accPositions);
										if (!_v13.$) {
											var _v14 = _v13.a;
											var tx = _v14.a;
											var ty = _v14.b;
											var target = A2(
												placeWithoutOverlap,
												occupied,
												_Utils_Tuple2(tx + spacingX, ty));
											return _Utils_Tuple3(
												A3($elm$core$Dict$insert, name, target, accPositions),
												unresolved,
												true);
										} else {
											return _Utils_Tuple3(
												accPositions,
												_Utils_ap(
													unresolved,
													_List_fromArray(
														[name])),
												hasProgress);
										}
									}
								}
							});
						var _v8 = A3(
							$elm$core$List$foldl,
							step,
							_Utils_Tuple3(positions, _List_Nil, false),
							namesToPlace);
						var progressedPositions = _v8.a;
						var unresolvedNames = _v8.b;
						var didProgress = _v8.c;
						if (didProgress) {
							var $temp$namesToPlace = unresolvedNames,
								$temp$positions = progressedPositions;
							namesToPlace = $temp$namesToPlace;
							positions = $temp$positions;
							continue placeUnresolved;
						} else {
							var fallback = F2(
								function (name, acc) {
									var _v9 = A2($elm$core$Dict$get, name, acc);
									if (!_v9.$) {
										return acc;
									} else {
										var index = $elm$core$Dict$size(acc);
										var xCol = (index / 5) | 0;
										var yRow = index % 5;
										var candidate = _Utils_Tuple2(100 + (xCol * spacingX), 100 + (yRow * spacingY));
										var target = A2(
											placeWithoutOverlap,
											$elm$core$Dict$values(acc),
											candidate);
										return A3($elm$core$Dict$insert, name, target, acc);
									}
								});
							return A3($elm$core$List$foldl, fallback, progressedPositions, unresolvedNames);
						}
					}
				}
			});
		var existingStateByName = A3(
			$elm$core$List$foldl,
			F2(
				function (state, acc) {
					return A3(
						$elm$core$Dict$insert,
						$author$project$Pages$EditorTuring$stateDisplayName(state),
						state,
						acc);
				}),
			$elm$core$Dict$empty,
			existingStates);
		var existingPositionsByName = A3(
			$elm$core$List$foldl,
			F2(
				function (state, acc) {
					return A3(
						$elm$core$Dict$insert,
						$author$project$Pages$EditorTuring$stateDisplayName(state),
						_Utils_Tuple2(state.j, state.k),
						acc);
				}),
			$elm$core$Dict$empty,
			existingStates);
		var seededPositions = A3($elm$core$List$foldl, placeFromTo, existingPositionsByName, parsedTransitions);
		var allPositions = A2(placeUnresolved, names, seededPositions);
		var states = A2(
			$elm$core$List$map,
			function (_v16) {
				var name = _v16.a;
				var sid = _v16.b;
				var maybeExistingState = A2($elm$core$Dict$get, name, existingStateByName);
				var _v17 = A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(100, 100),
					A2($elm$core$Dict$get, name, allPositions));
				var x = _v17.a;
				var y = _v17.b;
				return {
					E: A2(
						$elm$core$Maybe$withDefault,
						false,
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.E;
							},
							maybeExistingState)),
					a4: sid,
					M: A2(
						$elm$core$Maybe$withDefault,
						sid === 1,
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.M;
							},
							maybeExistingState)),
					b3: name,
					j: x,
					k: y
				};
			},
			indexedNames);
		return _Utils_Tuple2(states, transitions);
	});
var $author$project$Pages$EditorTuring$parseTransitionLine = function (line) {
	var _v0 = A2($elm$core$String$split, '=>', line);
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var leftRaw = _v0.a;
		var _v1 = _v0.b;
		var rightRaw = _v1.a;
		var right = $elm$core$String$trim(rightRaw);
		var parseTuple = F2(
			function (raw, sideError) {
				return (A2($elm$core$String$startsWith, '(', raw) && A2($elm$core$String$endsWith, ')', raw)) ? $elm$core$Result$Ok(
					A2(
						$elm$core$List$map,
						$elm$core$String$trim,
						A2(
							$elm$core$String$split,
							',',
							A2(
								$elm$core$String$dropRight,
								1,
								A2($elm$core$String$dropLeft, 1, raw))))) : $elm$core$Result$Err(sideError);
			});
		var left = $elm$core$String$trim(leftRaw);
		var _v2 = _Utils_Tuple2(
			A2(parseTuple, left, 44),
			A2(parseTuple, right, 45));
		if (!_v2.a.$) {
			if (!_v2.b.$) {
				if ((((((_v2.a.a.b && _v2.a.a.b.b) && _v2.a.a.b.b.b) && (!_v2.a.a.b.b.b.b)) && _v2.b.a.b) && _v2.b.a.b.b) && (!_v2.b.a.b.b.b)) {
					var _v3 = _v2.a.a;
					var fromName = _v3.a;
					var _v4 = _v3.b;
					var inputSymbolRaw = _v4.a;
					var _v5 = _v4.b;
					var inputStackRaw = _v5.a;
					var _v6 = _v2.b.a;
					var toName = _v6.a;
					var _v7 = _v6.b;
					var outputStackRaw = _v7.a;
					if ($elm$core$String$isEmpty(fromName) || A2($elm$core$String$contains, ' ', fromName)) {
						return $elm$core$Result$Err(40);
					} else {
						if ($elm$core$String$isEmpty(toName) || A2($elm$core$String$contains, ' ', toName)) {
							return $elm$core$Result$Err(39);
						} else {
							if ((inputSymbolRaw !== 'λ') && ((!$elm$core$String$isEmpty(
								$elm$core$String$trim(inputSymbolRaw))) && ($elm$core$String$length(
								$elm$core$String$trim(inputSymbolRaw)) !== 1))) {
								return $elm$core$Result$Err(41);
							} else {
								if ((inputStackRaw !== 'λ') && ($elm$core$String$length(
									$elm$core$String$trim(inputStackRaw)) > 1)) {
									return $elm$core$Result$Err(46);
								} else {
									var outputStack = (outputStackRaw === 'λ') ? '' : $author$project$Pages$EditorTuring$normalizeStackOutputToken(outputStackRaw);
									var inputStack = (inputStackRaw === 'λ') ? '' : $author$project$Pages$EditorTuring$normalizeStackInputToken(inputStackRaw);
									return ((inputStack === 'Z') && (!A2($elm$core$String$endsWith, 'Z', outputStack))) ? $elm$core$Result$Err(47) : $elm$core$Result$Ok(
										{
											ay: fromName,
											v: inputStack,
											w: (inputSymbolRaw === 'λ') ? '' : $author$project$Pages$EditorTuring$normalizeTransitionLabel(inputSymbolRaw),
											O: outputStack,
											aK: toName
										});
								}
							}
						}
					}
				} else {
					return $elm$core$Result$Err(38);
				}
			} else {
				var key = _v2.b.a;
				return $elm$core$Result$Err(key);
			}
		} else {
			var key = _v2.a.a;
			return $elm$core$Result$Err(key);
		}
	} else {
		return $elm$core$Result$Err(43);
	}
};
var $author$project$Pages$EditorTuring$traverseResults = F2(
	function (f, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (item, acc) {
					var _v0 = _Utils_Tuple2(
						f(item),
						acc);
					if (!_v0.a.$) {
						if (!_v0.b.$) {
							var v = _v0.a.a;
							var vs = _v0.b.a;
							return $elm$core$Result$Ok(
								A2($elm$core$List$cons, v, vs));
						} else {
							var e = _v0.b.a;
							return $elm$core$Result$Err(e);
						}
					} else {
						var e = _v0.a.a;
						return $elm$core$Result$Err(e);
					}
				}),
			$elm$core$Result$Ok(_List_Nil),
			list);
	});
var $author$project$Pages$EditorTuring$decodeTransitionLanguage = F2(
	function (existingStates, raw) {
		var lines = A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
			A2(
				$elm$core$List$map,
				$elm$core$String$trim,
				$elm$core$String$lines(raw)));
		var _v0 = A2($author$project$Pages$EditorTuring$traverseResults, $author$project$Pages$EditorTuring$parseTransitionLine, lines);
		if (_v0.$ === 1) {
			var err = _v0.a;
			return $elm$core$Result$Err(err);
		} else {
			var parsedTransitions = _v0.a;
			return $elm$core$Result$Ok(
				A2($author$project$Pages$EditorTuring$buildAutomatonFromParsedTransitions, existingStates, parsedTransitions));
		}
	});
var $author$project$Pages$EditorTuring$parseCodeDraftToAutomaton = F2(
	function (model, draft) {
		var _v0 = A2($elm$json$Json$Decode$decodeString, $author$project$Pages$EditorTuring$decodeAutomaton, draft);
		if (!_v0.$) {
			var _v1 = _v0.a;
			var ss = _v1.a;
			var ts = _v1.b;
			if ($author$project$Pages$EditorTuring$hasDuplicateStateNames(ss)) {
				return $elm$core$Result$Err(38);
			} else {
				var normalizedStates = $author$project$Pages$EditorTuring$enforceSingleStartFlag(ss);
				return $elm$core$Result$Ok(
					A2($author$project$Pages$EditorTuring$normalizeAutomatonIds, normalizedStates, ts));
			}
		} else {
			var _v2 = A2($author$project$Pages$EditorTuring$decodeTransitionLanguage, model.c, draft);
			if (!_v2.$) {
				var _v3 = _v2.a;
				var ss = _v3.a;
				var ts = _v3.b;
				return $elm$core$Result$Ok(
					A2($author$project$Pages$EditorTuring$normalizeAutomatonIds, ss, ts));
			} else {
				return $elm$core$Result$Err(38);
			}
		}
	});
var $author$project$Pages$EditorTuring$normalizeTransitionLabels = function (raw) {
	var normalized = A2(
		$elm$core$List$map,
		function (token) {
			return (token === 'λ') ? '' : $author$project$Pages$EditorTuring$normalizeTransitionLabel(token);
		},
		A2(
			$elm$core$List$map,
			$elm$core$String$trim,
			A2($elm$core$String$split, ';', raw)));
	return ($elm$core$String$trim(raw) === '') ? _List_fromArray(
		['']) : $author$project$Pages$EditorTuring$uniqueLabels(normalized);
};
var $author$project$Pages$EditorTuring$transitionLabelsToEditorText = function (labels) {
	return A2($elm$core$String$join, ';', labels);
};
var $author$project$Pages$EditorTuring$sanitizeTransitionEditorInput = function (raw) {
	return ($elm$core$String$trim(raw) === '') ? '' : $author$project$Pages$EditorTuring$transitionLabelsToEditorText(
		$author$project$Pages$EditorTuring$normalizeTransitionLabels(raw));
};
var $author$project$Pages$EditorTuring$screenToWorld = F3(
	function (model, x, y) {
		return _Utils_Tuple2((x - model.U) / model.D, (y - model.V) / model.D);
	});
var $author$project$Pages$EditorTuring$DismissGlobalNotice = function (a) {
	return {$: 57, a: a};
};
var $author$project$Pages$EditorTuring$showGlobalNotice = F2(
	function (key, model) {
		var nextNonce = model.aS + 1;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					aR: $elm$core$Maybe$Just(key),
					aS: nextNonce
				}),
			A2(
				$elm$core$Task$perform,
				function (_v0) {
					return $author$project$Pages$EditorTuring$DismissGlobalNotice(nextNonce);
				},
				$elm$core$Process$sleep(5000)));
	});
var $author$project$Pages$EditorTuring$simulationSpeedStops = _List_fromArray(
	[10, 250, 500, 750, 1000]);
var $author$project$Pages$EditorTuring$simulationDelayFromSpeedIndex = function (rawIndex) {
	var _v0 = $elm$core$String$toInt(rawIndex);
	if (_v0.$ === 1) {
		return '500';
	} else {
		var index = _v0.a;
		return A2(
			$elm$core$Maybe$withDefault,
			'500',
			A2(
				$elm$core$Maybe$map,
				$elm$core$String$fromInt,
				$elm$core$List$head(
					A2($elm$core$List$drop, index, $author$project$Pages$EditorTuring$simulationSpeedStops))));
	}
};
var $author$project$Pages$EditorTuring$simulationSessionActive = function (model) {
	return !_Utils_eq(model.aj, $elm$core$Maybe$Nothing);
};
var $author$project$Pages$EditorTuring$slotTypeMismatch = function (maybeAutomatonType) {
	if (!maybeAutomatonType.$) {
		var automatonType = maybeAutomatonType.a;
		return !_Utils_eq(automatonType, $author$project$Pages$EditorTuring$currentAutomatonType);
	} else {
		return false;
	}
};
var $author$project$Pages$EditorTuring$MissingStart = 5;
var $author$project$Pages$EditorTuring$Rejected = 3;
var $author$project$Pages$EditorTuring$Success = 2;
var $author$project$Pages$EditorTuring$simulationResultNoticeKey = function (result) {
	switch (result) {
		case 2:
			return $elm$core$Maybe$Just(106);
		case 3:
			return $elm$core$Maybe$Just(107);
		case 4:
			return $elm$core$Maybe$Just(108);
		case 5:
			return $elm$core$Maybe$Just(109);
		case 0:
			return $elm$core$Maybe$Nothing;
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Pages$EditorTuring$startSimulation = F2(
	function (runMode, model) {
		var _v0 = $author$project$Pages$EditorTuring$findStartState(model.c);
		if (_v0.$ === 1) {
			return A2(
				$author$project$Pages$EditorTuring$showGlobalNotice,
				109,
				_Utils_update(
					model,
					{S: 5}));
		} else {
			var startState = _v0.a;
			var willRun = true;
			var rawQueue = $elm$core$String$toList(model.aB);
			var queue = $elm$core$List$isEmpty(rawQueue) ? _List_fromArray(
				[$author$project$Pages$EditorTuring$blankSymbol]) : rawQueue;
			var initialResult = willRun ? 1 : (startState.E ? 2 : 3);
			var delay = $author$project$Pages$EditorTuring$parseDelay(model.aA);
			var cmd = (willRun && (!runMode)) ? A2(
				$elm$core$Task$perform,
				function (_v2) {
					return $author$project$Pages$EditorTuring$AdvanceSimulation;
				},
				$elm$core$Process$sleep(delay)) : $elm$core$Platform$Cmd$none;
			var nextModel = _Utils_update(
				model,
				{
					h: $elm$core$Maybe$Just(startState.a4),
					aa: $elm$core$Maybe$Nothing,
					P: $elm$core$Maybe$Nothing,
					J: $elm$core$Maybe$Just(startState.a4),
					av: _List_Nil,
					Q: 0,
					R: queue,
					S: initialResult,
					aj: $elm$core$Maybe$Just(runMode),
					aJ: willRun && (!runMode),
					W: _List_Nil
				});
			if (willRun) {
				return _Utils_Tuple2(nextModel, cmd);
			} else {
				var _v1 = $author$project$Pages$EditorTuring$simulationResultNoticeKey(initialResult);
				if (!_v1.$) {
					var key = _v1.a;
					return A2($author$project$Pages$EditorTuring$showGlobalNotice, key, nextModel);
				} else {
					return _Utils_Tuple2(nextModel, $elm$core$Platform$Cmd$none);
				}
			}
		}
	});
var $author$project$Pages$EditorTuring$DeadEnd = 4;
var $author$project$Pages$EditorTuring$centerChoiceInCanvas = F2(
	function (sid, model) {
		var _v0 = A2($author$project$Pages$EditorTuring$getStateById, sid, model.c);
		if (_v0.$ === 1) {
			return model;
		} else {
			var state = _v0.a;
			var popupWidth = 280;
			var popupHeight = 140;
			var popupGap = 24;
			var layout = $author$project$Pages$EditorTuring$editorLayout(model);
			var targetPanX = (((layout.bh / 2) + (popupWidth / 2)) + popupGap) - state.j;
			var targetPanY = ((layout.bg / 2) + (popupHeight / 2)) - state.k;
			return _Utils_update(
				model,
				{U: targetPanX, V: targetPanY});
		}
	});
var $author$project$Pages$EditorTuring$readTapeSymbol = F2(
	function (tape, index) {
		return A2(
			$elm$core$Maybe$withDefault,
			$elm$core$String$fromChar($author$project$Pages$EditorTuring$blankSymbol),
			A2(
				$elm$core$Maybe$map,
				$elm$core$String$fromChar,
				$elm$core$List$head(
					A2($elm$core$List$drop, index, tape))));
	});
var $author$project$Pages$EditorTuring$stopSimulation = F2(
	function (result, model) {
		return _Utils_update(
			model,
			{aa: $elm$core$Maybe$Nothing, P: $elm$core$Maybe$Nothing, J: $elm$core$Maybe$Nothing, av: _List_Nil, Q: 0, R: _List_Nil, S: result, aj: $elm$core$Maybe$Nothing, aJ: false, W: _List_Nil});
	});
var $author$project$Pages$EditorTuring$stopSimulationWithNotice = F2(
	function (result, model) {
		var nextModel = A2($author$project$Pages$EditorTuring$stopSimulation, result, model);
		var _v0 = $author$project$Pages$EditorTuring$simulationResultNoticeKey(result);
		if (!_v0.$) {
			var key = _v0.a;
			return A2($author$project$Pages$EditorTuring$showGlobalNotice, key, nextModel);
		} else {
			return _Utils_Tuple2(nextModel, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$EditorTuring$stepSimulation = function (model) {
	var _v0 = model.J;
	if (_v0.$ === 1) {
		return A2($author$project$Pages$EditorTuring$stopSimulationWithNotice, 4, model);
	} else {
		var sid = _v0.a;
		var queue = model.R;
		var lambdaMatches = A2(
			$elm$core$List$filter,
			function (t) {
				var parts = $author$project$Pages$EditorTuring$decodeStackTransitionLabel(t.i);
				return _Utils_eq(t.f, sid) && $elm$core$String$isEmpty(parts.w);
			},
			model.d);
		var currentLabel = A2($author$project$Pages$EditorTuring$readTapeSymbol, queue, model.Q);
		var charMatches = A2(
			$elm$core$List$filter,
			function (t) {
				var parts = $author$project$Pages$EditorTuring$decodeStackTransitionLabel(t.i);
				return _Utils_eq(t.f, sid) && _Utils_eq(parts.w, currentLabel);
			},
			model.d);
		var _v1 = $elm$core$List$isEmpty(charMatches) ? _Utils_Tuple3(lambdaMatches, false, 'ε') : _Utils_Tuple3(charMatches, true, currentLabel);
		var candidates = _v1.a;
		var consumesInput = _v1.b;
		var inputLabel = _v1.c;
		if (!candidates.b) {
			var result = function () {
				var _v3 = A2($author$project$Pages$EditorTuring$getStateById, sid, model.c);
				if (!_v3.$) {
					var s = _v3.a;
					return s.E ? 2 : 3;
				} else {
					return 4;
				}
			}();
			return A2($author$project$Pages$EditorTuring$stopSimulationWithNotice, result, model);
		} else {
			if (!candidates.b.b) {
				var single = candidates.a;
				return A4($author$project$Pages$EditorTuring$applySimulationTransition, single, queue, queue, model);
			} else {
				var centeredModel = A2($author$project$Pages$EditorTuring$centerChoiceInCanvas, sid, model);
				return _Utils_Tuple2(
					_Utils_update(
						centeredModel,
						{
							h: $elm$core$Maybe$Just(sid),
							P: $elm$core$Maybe$Just(
								{
									bF: consumesInput,
									bK: inputLabel,
									bQ: sid,
									al: A2(
										$elm$core$List$map,
										function ($) {
											return $.a4;
										},
										candidates)
								}),
							S: 1,
							aJ: false
						}),
					$elm$core$Platform$Cmd$none);
			}
		}
	}
};
var $author$project$Pages$EditorTuring$restoreSimulationSnapshot = F2(
	function (snapshot, model) {
		return _Utils_update(
			model,
			{h: snapshot.h, aa: snapshot.aa, P: snapshot.P, J: snapshot.J, Q: snapshot.Q, R: snapshot.R, S: snapshot.S, W: snapshot.W});
	});
var $author$project$Pages$EditorTuring$stepSimulationBack = function (model) {
	var _v0 = model.av;
	if (_v0.b) {
		var previous = _v0.a;
		var rest = _v0.b;
		return _Utils_Tuple2(
			A2(
				$author$project$Pages$EditorTuring$restoreSimulationSnapshot,
				previous,
				_Utils_update(
					model,
					{av: rest})),
			$elm$core$Platform$Cmd$none);
	} else {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	}
};
var $author$project$Pages$EditorTuring$snapshotSimulation = function (model) {
	return {h: model.h, aa: model.aa, P: model.P, J: model.J, Q: model.Q, R: model.R, S: model.S, W: model.W};
};
var $author$project$Pages$EditorTuring$stepSimulationWithHistory = function (model) {
	var snapshot = $author$project$Pages$EditorTuring$snapshotSimulation(model);
	return $author$project$Pages$EditorTuring$stepSimulation(
		_Utils_update(
			model,
			{
				av: A2($elm$core$List$cons, snapshot, model.av)
			}));
};
var $author$project$Pages$EditorTuring$validateTransitionLine = F2(
	function (idx, originalLine) {
		var line = $elm$core$String$trim(originalLine);
		var build = function (message) {
			return $elm$core$Maybe$Just(
				{
					bN: idx + 1,
					b_: $elm$core$String$isEmpty(line) ? originalLine : line,
					bo: message
				});
		};
		if ($elm$core$String$isEmpty(line)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = $author$project$Pages$EditorTuring$parseTransitionLine(line);
			if (!_v0.$) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = _v0.a;
				return build(key);
			}
		}
	});
var $author$project$Pages$EditorTuring$validateTransitionCode = function (raw) {
	return A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		A2(
			$elm$core$List$indexedMap,
			$author$project$Pages$EditorTuring$validateTransitionLine,
			$elm$core$String$lines(raw)));
};
var $author$project$Pages$EditorTuring$handleShortcut = F2(
	function (shortcut, model) {
		if (shortcut.b9) {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		} else {
			var _v44 = _Utils_Tuple3(shortcut.a7, shortcut.aY, shortcut.a$);
			_v44$15:
			while (true) {
				if (_v44.a) {
					if (_v44.b) {
						switch (_v44.c) {
							case 'KeyS':
								return _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorTuring$NoOp),
										$elm$browser$Browser$Dom$focus('simulation-input-field')));
							case 'Enter':
								return $author$project$Pages$EditorTuring$simulationSessionActive(model) ? A2($author$project$Pages$EditorTuring$update, $author$project$Pages$EditorTuring$StopSimulation, model) : A2($author$project$Pages$EditorTuring$update, $author$project$Pages$EditorTuring$StartSimulation, model);
							case 'KeyN':
								return A2($author$project$Pages$EditorTuring$update, $author$project$Pages$EditorTuring$ToggleAutomatonTypeDetails, model);
							default:
								break _v44$15;
						}
					} else {
						break _v44$15;
					}
				} else {
					if (_v44.b) {
						switch (_v44.c) {
							case 'Digit1':
								return A2(
									$author$project$Pages$EditorTuring$update,
									$author$project$Pages$EditorTuring$SetMode(0),
									model);
							case 'Digit2':
								return A2(
									$author$project$Pages$EditorTuring$update,
									$author$project$Pages$EditorTuring$SetMode(1),
									model);
							case 'Digit3':
								return A2(
									$author$project$Pages$EditorTuring$update,
									$author$project$Pages$EditorTuring$SetMode(2),
									model);
							case 'KeyS':
								var _v45 = model.h;
								if (!_v45.$) {
									var sid = _v45.a;
									return A2(
										$author$project$Pages$EditorTuring$update,
										$author$project$Pages$EditorTuring$ToggleStart(sid),
										model);
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							case 'KeyE':
								var _v46 = model.h;
								if (!_v46.$) {
									var sid = _v46.a;
									return A2(
										$author$project$Pages$EditorTuring$update,
										$author$project$Pages$EditorTuring$ToggleAccepting(sid),
										model);
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							case 'KeyN':
								var _v47 = _Utils_Tuple2(model.h, model.s);
								if (!_v47.a.$) {
									return _Utils_Tuple2(
										model,
										A2(
											$elm$core$Task$attempt,
											$elm$core$Basics$always($author$project$Pages$EditorTuring$NoOp),
											$elm$browser$Browser$Dom$focus('selected-state-name-input')));
								} else {
									if (!_v47.b.$) {
										var _v48 = _v47.a;
										return _Utils_Tuple2(
											model,
											A2(
												$elm$core$Task$attempt,
												$elm$core$Basics$always($author$project$Pages$EditorTuring$NoOp),
												$elm$browser$Browser$Dom$focus('selected-transition-label-input')));
									} else {
										return (model.z === 1) ? _Utils_Tuple2(
											model,
											A2(
												$elm$core$Task$attempt,
												$elm$core$Basics$always($author$project$Pages$EditorTuring$NoOp),
												$elm$browser$Browser$Dom$focus('transition-create-label-input'))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
									}
								}
							case 'Comma':
								return (model.z === 1) ? _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorTuring$NoOp),
										$elm$browser$Browser$Dom$focus('transition-create-stack-input'))) : ((!_Utils_eq(model.s, $elm$core$Maybe$Nothing)) ? _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorTuring$NoOp),
										$elm$browser$Browser$Dom$focus('selected-transition-stack-input'))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
							case 'Period':
								return (model.z === 1) ? _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorTuring$NoOp),
										$elm$browser$Browser$Dom$focus('transition-create-stack-output'))) : ((!_Utils_eq(model.s, $elm$core$Maybe$Nothing)) ? _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorTuring$NoOp),
										$elm$browser$Browser$Dom$focus('selected-transition-stack-output'))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
							case 'KeyQ':
								return A2($author$project$Pages$EditorTuring$update, $author$project$Pages$EditorTuring$CenterOnStartState, model);
							case 'KeyT':
								return _Utils_Tuple2(
									model,
									A2(
										$elm$core$Task$attempt,
										$elm$core$Basics$always($author$project$Pages$EditorTuring$NoOp),
										$elm$browser$Browser$Dom$focus('transition-function-editor')));
							default:
								break _v44$15;
						}
					} else {
						switch (_v44.c) {
							case 'Delete':
								var _v49 = _Utils_Tuple2(model.h, model.s);
								if (!_v49.a.$) {
									var sid = _v49.a.a;
									return A2(
										$author$project$Pages$EditorTuring$update,
										$author$project$Pages$EditorTuring$DeleteState(sid),
										model);
								} else {
									if (!_v49.b.$) {
										var _v50 = _v49.a;
										var tid = _v49.b.a;
										return A2(
											$author$project$Pages$EditorTuring$update,
											$author$project$Pages$EditorTuring$DeleteTransition(tid),
											model);
									} else {
										return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
									}
								}
							case 'Backspace':
								if (shortcut.b1) {
									var _v51 = _Utils_Tuple2(model.h, model.s);
									if (!_v51.a.$) {
										var sid = _v51.a.a;
										return A2(
											$author$project$Pages$EditorTuring$update,
											$author$project$Pages$EditorTuring$DeleteState(sid),
											model);
									} else {
										if (!_v51.b.$) {
											var _v52 = _v51.a;
											var tid = _v51.b.a;
											return A2(
												$author$project$Pages$EditorTuring$update,
												$author$project$Pages$EditorTuring$DeleteTransition(tid),
												model);
										} else {
											return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
										}
									}
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							default:
								break _v44$15;
						}
					}
				}
			}
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$EditorTuring$update = F2(
	function (msg, model) {
		if ($author$project$Pages$EditorTuring$simulationSessionActive(model)) {
			switch (msg.$) {
				case 0:
					var button = msg.b;
					var cx = msg.c;
					var cy = msg.d;
					return (button === 1) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{
								au: $elm$core$Maybe$Just(
									{bq: model.U, br: model.V, bt: cx, bu: cy})
							}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 1:
					var mx = msg.a;
					var my = msg.b;
					var _v1 = model.au;
					if (_v1.$ === 1) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var pan = _v1.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{U: pan.bq + (mx - pan.bt), V: pan.br + (my - pan.bu)}),
							$elm$core$Platform$Cmd$none);
					}
				case 2:
					var button = msg.a;
					return (button === 1) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{au: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 32:
					return $author$project$Pages$EditorTuring$stepSimulation(model);
				case 33:
					var _v2 = model.aj;
					if ((!_v2.$) && (_v2.a === 1)) {
						var _v3 = _v2.a;
						return $author$project$Pages$EditorTuring$stepSimulationWithHistory(model);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 34:
					var _v4 = model.aj;
					if ((!_v4.$) && (_v4.a === 1)) {
						var _v5 = _v4.a;
						return $author$project$Pages$EditorTuring$stepSimulationBack(model);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 35:
					var tid = msg.a;
					var _v6 = _Utils_Tuple2(model.P, model.J);
					if ((!_v6.a.$) && (!_v6.b.$)) {
						var choice = _v6.a.a;
						var _v7 = $elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (transition) {
									return _Utils_eq(transition.a4, tid);
								},
								model.d));
						if (!_v7.$) {
							var transition = _v7.a;
							var queue = model.R;
							var rest = function () {
								if (!queue.b) {
									return _List_Nil;
								} else {
									var remaining = queue.b;
									return remaining;
								}
							}();
							return A4($author$project$Pages$EditorTuring$applySimulationTransition, transition, rest, queue, model);
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 36:
					var dx = msg.a;
					var dy = msg.b;
					return _Utils_Tuple2(
						A3($author$project$Pages$EditorTuring$panWithWheel, dx, dy, model),
						$elm$core$Platform$Cmd$none);
				case 37:
					var w = msg.a;
					var h = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{cc: h, cd: w}),
						$elm$core$Platform$Cmd$none);
				case 38:
					return A2(
						$author$project$Pages$EditorTuring$showGlobalNotice,
						104,
						A2($author$project$Pages$EditorTuring$stopSimulation, 0, model));
				case 23:
					var focused = msg.a;
					return focused ? ($author$project$Pages$EditorTuring$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: A2($author$project$Pages$EditorTuring$encodeTransitionLanguage, model.c, model.d),
								T: false,
								ab: true,
								ac: _List_Nil
							}),
						$elm$core$Platform$Cmd$none)) : ($author$project$Pages$EditorTuring$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: false}),
						$elm$core$Platform$Cmd$none));
				case 24:
					var top = msg.a;
					var left = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bi: left, bj: top}),
						$elm$core$Platform$Cmd$none);
				case 25:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{aB: s}),
						$elm$core$Platform$Cmd$none);
				case 26:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aA: $author$project$Pages$EditorTuring$simulationDelayFromSpeedIndex(s)
							}),
						$elm$core$Platform$Cmd$none);
				case 27:
					return _Utils_Tuple2(
						$author$project$Pages$EditorTuring$centerOnPreferredStartState(model),
						$elm$core$Platform$Cmd$none);
				case 28:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$EditorTuring$clampZoom(model.D - 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 29:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$EditorTuring$clampZoom(model.D + 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 56:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aO) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aG: false}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 57:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aS) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aR: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 58:
					var shortcut = msg.a;
					return A2($author$project$Pages$EditorTuring$handleShortcut, shortcut, model);
				default:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		} else {
			switch (msg.$) {
				case 0:
					var targetTag = msg.a;
					var button = msg.b;
					var cx = msg.c;
					var cy = msg.d;
					switch (button) {
						case 1:
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										au: $elm$core$Maybe$Just(
											{bq: model.U, br: model.V, bt: cx, bu: cy})
									}),
								$elm$core$Platform$Cmd$none);
						case 0:
							var _v11 = model.z;
							if (!_v11) {
								if (targetTag !== 'svg') {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								} else {
									var stateId = model.I;
									var _v12 = A3($author$project$Pages$EditorTuring$screenToWorld, model, cx, cy);
									var wx = _v12.a;
									var wy = _v12.b;
									var newState = {
										E: false,
										a4: stateId,
										M: false,
										b3: $elm$core$String$fromInt(stateId),
										j: wx,
										k: wy
									};
									return _Utils_Tuple2(
										_Utils_update(
											model,
											{
												ao: $elm$core$Maybe$Nothing,
												I: model.I + 1,
												h: $elm$core$Maybe$Just(newState.a4),
												s: $elm$core$Maybe$Nothing,
												c: _Utils_ap(
													model.c,
													_List_fromArray(
														[newState])),
												ah: $elm$core$Maybe$Nothing
											}),
										$elm$core$Platform$Cmd$none);
								}
							} else {
								if (targetTag === 'svg') {
									var _v13 = model.z;
									switch (_v13) {
										case 1:
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, Y: '', Z: '', _: '', ah: $elm$core$Maybe$Nothing}),
												$elm$core$Platform$Cmd$none);
										case 2:
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing}),
												$elm$core$Platform$Cmd$none);
										default:
											return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
									}
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							}
						default:
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 1:
					var mx = msg.a;
					var my = msg.b;
					var updatedPan = function () {
						var _v16 = model.au;
						if (_v16.$ === 1) {
							return model;
						} else {
							var pan = _v16.a;
							return _Utils_update(
								model,
								{U: pan.bq + (mx - pan.bt), V: pan.br + (my - pan.bu)});
						}
					}();
					var updatedStates = function () {
						var _v14 = updatedPan.ao;
						if (_v14.$ === 1) {
							return updatedPan;
						} else {
							var sid = _v14.a;
							var _v15 = A3($author$project$Pages$EditorTuring$screenToWorld, updatedPan, mx, my);
							var wx = _v15.a;
							var wy = _v15.b;
							var move = function (s) {
								return _Utils_eq(s.a4, sid) ? _Utils_update(
									s,
									{j: wx, k: wy}) : s;
							};
							return _Utils_update(
								updatedPan,
								{
									c: A2($elm$core$List$map, move, updatedPan.c)
								});
						}
					}();
					return _Utils_Tuple2(updatedStates, $elm$core$Platform$Cmd$none);
				case 2:
					var button = msg.a;
					var clearedPan = (button === 1) ? _Utils_update(
						model,
						{au: $elm$core$Maybe$Nothing}) : model;
					var clearedDrag = (!button) ? _Utils_update(
						clearedPan,
						{ao: $elm$core$Maybe$Nothing}) : clearedPan;
					return _Utils_Tuple2(clearedDrag, $elm$core$Platform$Cmd$none);
				case 3:
					var sid = msg.a;
					var _v17 = model.z;
					if (_v17 === 2) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ao: $elm$core$Maybe$Just(sid),
									h: $elm$core$Maybe$Just(sid),
									s: $elm$core$Maybe$Nothing,
									Y: '',
									Z: '',
									_: ''
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 4:
					var sid = msg.a;
					var _v18 = model.z;
					if (_v18 === 2) {
						var toggle = function (s) {
							return _Utils_eq(s.a4, sid) ? _Utils_update(
								s,
								{E: !s.E}) : s;
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									c: A2($elm$core$List$map, toggle, model.c)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 5:
					var sid = msg.a;
					var _v19 = model.z;
					switch (_v19) {
						case 1:
							var _v20 = model.ah;
							if (_v20.$ === 1) {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											h: $elm$core$Maybe$Just(sid),
											ah: $elm$core$Maybe$Just(sid)
										}),
									$elm$core$Platform$Cmd$none);
							} else {
								var fromId = _v20.a;
								var newTransition = {
									f: fromId,
									a4: model.p,
									i: A3($author$project$Pages$EditorTuring$encodeStackTransitionLabel, model.a9, model.bx, model.by),
									g: sid
								};
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											p: model.p + 1,
											h: $elm$core$Maybe$Nothing,
											s: $elm$core$Maybe$Nothing,
											ah: $elm$core$Maybe$Nothing,
											d: _Utils_ap(
												model.d,
												_List_fromArray(
													[newTransition]))
										}),
									$elm$core$Platform$Cmd$none);
							}
						case 2:
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										h: $elm$core$Maybe$Just(sid),
										s: $elm$core$Maybe$Nothing,
										Y: '',
										Z: '',
										_: '',
										ah: $elm$core$Maybe$Nothing
									}),
								$elm$core$Platform$Cmd$none);
						default:
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 6:
					var tid = msg.a;
					var _v21 = model.z;
					if (_v21 === 2) {
						var _v22 = function () {
							var _v23 = $elm$core$List$head(
								A2(
									$elm$core$List$filter,
									function (transition) {
										return _Utils_eq(transition.a4, tid);
									},
									model.d));
							if (_v23.$ === 1) {
								return _Utils_Tuple3('', '', '');
							} else {
								var transition = _v23.a;
								var parts = $author$project$Pages$EditorTuring$decodeStackTransitionLabel(transition.i);
								return _Utils_Tuple3(parts.w, parts.v, parts.O);
							}
						}();
						var draftLabel = _v22.a;
						var stackInDraft = _v22.b;
						var stackOutDraft = _v22.c;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $elm$core$Maybe$Nothing,
									s: $elm$core$Maybe$Just(tid),
									Y: draftLabel,
									Z: stackInDraft,
									_: stackOutDraft
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 7:
					var sid = msg.a;
					var transFiltered = A2(
						$elm$core$List$filter,
						function (t) {
							return (!_Utils_eq(t.f, sid)) && (!_Utils_eq(t.g, sid));
						},
						model.d);
					var statesFiltered = A2(
						$elm$core$List$filter,
						function (s) {
							return !_Utils_eq(s.a4, sid);
						},
						model.c);
					var normalized = A2($author$project$Pages$EditorTuring$normalizeAutomatonIds, statesFiltered, transFiltered);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{I: normalized.I, p: normalized.p, h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, Y: '', Z: '', _: '', c: normalized.c, d: normalized.d}),
						$elm$core$Platform$Cmd$none);
				case 8:
					var tid = msg.a;
					var transFiltered = A2(
						$elm$core$List$filter,
						function (t) {
							return !_Utils_eq(t.a4, tid);
						},
						model.d);
					var normalized = $author$project$Pages$EditorTuring$normalizeTransitionIds(transFiltered);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{p: normalized.p, s: $elm$core$Maybe$Nothing, Y: '', Z: '', _: '', d: normalized.d}),
						$elm$core$Platform$Cmd$none);
				case 9:
					var sid = msg.a;
					var _v24 = model.z;
					if (_v24 === 2) {
						var updatedStates = function () {
							var _v25 = A2($author$project$Pages$EditorTuring$getStateById, sid, model.c);
							if (_v25.$ === 1) {
								return model.c;
							} else {
								var s = _v25.a;
								return s.M ? A2(
									$elm$core$List$map,
									function (t) {
										return _Utils_eq(t.a4, sid) ? _Utils_update(
											t,
											{M: false}) : t;
									},
									model.c) : A2($author$project$Pages$EditorTuring$ensureSingleStart, sid, model.c);
							}
						}();
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $elm$core$Maybe$Just(sid),
									c: updatedStates
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 10:
					var sid = msg.a;
					var _v26 = model.z;
					if (_v26 === 2) {
						var toggle = function (s) {
							return _Utils_eq(s.a4, sid) ? _Utils_update(
								s,
								{E: !s.E}) : s;
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $elm$core$Maybe$Just(sid),
									c: A2($elm$core$List$map, toggle, model.c)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 11:
					var newMode = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{ao: $elm$core$Maybe$Nothing, z: newMode, h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, Y: '', Z: '', _: '', ah: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none);
				case 12:
					var label = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								a9: $author$project$Pages$EditorTuring$sanitizeTransitionEditorInput(label)
							}),
						$elm$core$Platform$Cmd$none);
				case 15:
					var label = msg.a;
					var sanitizedLabel = $author$project$Pages$EditorTuring$sanitizeTransitionEditorInput(label);
					var updateTransition = function (transition) {
						return _Utils_eq(
							$elm$core$Maybe$Just(transition.a4),
							model.s) ? _Utils_update(
							transition,
							{
								i: A3($author$project$Pages$EditorTuring$encodeStackTransitionLabel, sanitizedLabel, model.Z, model._)
							}) : transition;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								Y: sanitizedLabel,
								d: A2($elm$core$List$map, updateTransition, model.d)
							}),
						$elm$core$Platform$Cmd$none);
				case 13:
					var value = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bx: $author$project$Pages$EditorTuring$normalizeStackInputToken(value)
							}),
						$elm$core$Platform$Cmd$none);
				case 14:
					var value = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								by: $author$project$Pages$EditorTuring$normalizeStackOutputToken(value)
							}),
						$elm$core$Platform$Cmd$none);
				case 16:
					var value = msg.a;
					var normalizedValue = $author$project$Pages$EditorTuring$normalizeStackInputToken(value);
					var updateTransition = function (transition) {
						return _Utils_eq(
							$elm$core$Maybe$Just(transition.a4),
							model.s) ? _Utils_update(
							transition,
							{
								i: A3($author$project$Pages$EditorTuring$encodeStackTransitionLabel, model.Y, normalizedValue, model._)
							}) : transition;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								Z: normalizedValue,
								d: A2($elm$core$List$map, updateTransition, model.d)
							}),
						$elm$core$Platform$Cmd$none);
				case 17:
					var value = msg.a;
					var normalizedValue = $author$project$Pages$EditorTuring$normalizeStackOutputToken(value);
					var updateTransition = function (transition) {
						return _Utils_eq(
							$elm$core$Maybe$Just(transition.a4),
							model.s) ? _Utils_update(
							transition,
							{
								i: A3($author$project$Pages$EditorTuring$encodeStackTransitionLabel, model.Y, model.Z, normalizedValue)
							}) : transition;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								_: normalizedValue,
								d: A2($elm$core$List$map, updateTransition, model.d)
							}),
						$elm$core$Platform$Cmd$none);
				case 18:
					var name = msg.a;
					var _v27 = model.h;
					if (_v27.$ === 1) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var sid = _v27.a;
						var sanitizedName = A2(
							$elm$core$String$join,
							'',
							$elm$core$String$words(name));
						var updateState = function (s) {
							return _Utils_eq(s.a4, sid) ? _Utils_update(
								s,
								{b3: sanitizedName}) : s;
						};
						var updatedStates = A2($elm$core$List$map, updateState, model.c);
						return $author$project$Pages$EditorTuring$hasDuplicateStateNames(updatedStates) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{ak: true}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{ak: false, c: updatedStates}),
							$elm$core$Platform$Cmd$none);
					}
				case 19:
					if ($author$project$Pages$EditorTuring$hasCodeValidationErrors(model)) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{T: true}),
							$elm$core$Platform$Cmd$none);
					} else {
						var _v28 = A2($author$project$Pages$EditorTuring$parseCodeDraftToAutomaton, model, model.an);
						if (!_v28.$) {
							var normalizedAutomaton = _v28.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{T: false, ac: _List_Nil, I: normalizedAutomaton.I, p: normalizedAutomaton.p, ak: false, c: normalizedAutomaton.c, d: normalizedAutomaton.d}),
								$elm$core$Platform$Cmd$none);
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{T: true}),
								$elm$core$Platform$Cmd$none);
						}
					}
				case 20:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: A2($author$project$Pages$EditorTuring$encodeTransitionLanguage, model.c, model.d),
								T: false,
								ac: _List_Nil
							}),
						$elm$core$Platform$Cmd$none);
				case 21:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: s,
								T: true,
								aP: model.aP + 1,
								ac: $author$project$Pages$EditorTuring$validateTransitionCode(s)
							}),
						A2(
							$elm$core$Task$perform,
							function (_v29) {
								return $author$project$Pages$EditorTuring$TryParseCodeDraft(model.aP + 1);
							},
							$elm$core$Process$sleep(500)));
				case 23:
					var focused = msg.a;
					return focused ? ($author$project$Pages$EditorTuring$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								an: A2($author$project$Pages$EditorTuring$encodeTransitionLanguage, model.c, model.d),
								T: false,
								ab: true,
								ac: _List_Nil
							}),
						$elm$core$Platform$Cmd$none)) : ($author$project$Pages$EditorTuring$hasCodeValidationErrors(model) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: true}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{ab: false}),
						$elm$core$Platform$Cmd$none));
				case 24:
					var top = msg.a;
					var left = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bi: left, bj: top}),
						$elm$core$Platform$Cmd$none);
				case 22:
					var version = msg.a;
					if (!_Utils_eq(version, model.aP)) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						if ($author$project$Pages$EditorTuring$hasCodeValidationErrors(model)) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{T: true}),
								$elm$core$Platform$Cmd$none);
						} else {
							var _v30 = A2($author$project$Pages$EditorTuring$parseCodeDraftToAutomaton, model, model.an);
							if (!_v30.$) {
								var normalizedAutomaton = _v30.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{T: false, ac: _List_Nil, I: normalizedAutomaton.I, p: normalizedAutomaton.p, ak: false, c: normalizedAutomaton.c, d: normalizedAutomaton.d}),
									$elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{T: true}),
									$elm$core$Platform$Cmd$none);
							}
						}
					}
				case 25:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{aB: s}),
						$elm$core$Platform$Cmd$none);
				case 26:
					var s = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aA: $author$project$Pages$EditorTuring$simulationDelayFromSpeedIndex(s)
							}),
						$elm$core$Platform$Cmd$none);
				case 27:
					return _Utils_Tuple2(
						$author$project$Pages$EditorTuring$centerOnPreferredStartState(model),
						$elm$core$Platform$Cmd$none);
				case 28:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$EditorTuring$clampZoom(model.D - 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 29:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								D: $author$project$Pages$EditorTuring$clampZoom(model.D + 0.1)
							}),
						$elm$core$Platform$Cmd$none);
				case 30:
					return $author$project$Pages$EditorTuring$hasCodeValidationErrors(model) ? A2($author$project$Pages$EditorTuring$showGlobalNotice, 110, model) : A2($author$project$Pages$EditorTuring$startSimulation, 0, model);
				case 31:
					return $author$project$Pages$EditorTuring$hasCodeValidationErrors(model) ? A2($author$project$Pages$EditorTuring$showGlobalNotice, 110, model) : A2($author$project$Pages$EditorTuring$startSimulation, 1, model);
				case 32:
					return $author$project$Pages$EditorTuring$stepSimulation(model);
				case 33:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 34:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 35:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 36:
					var dx = msg.a;
					var dy = msg.b;
					return _Utils_Tuple2(
						A3($author$project$Pages$EditorTuring$panWithWheel, dx, dy, model),
						$elm$core$Platform$Cmd$none);
				case 37:
					var w = msg.a;
					var h = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{cc: h, cd: w}),
						$elm$core$Platform$Cmd$none);
				case 38:
					return A2(
						$author$project$Pages$EditorTuring$showGlobalNotice,
						104,
						A2($author$project$Pages$EditorTuring$stopSimulation, 0, model));
				case 39:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{a6: true, K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 40:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{af: '', ag: $elm$core$Maybe$Nothing, a6: false, K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 41:
					var slotId = msg.a;
					var automatonJson = A2(
						$elm$json$Json$Encode$encode,
						0,
						A2(
							$author$project$AutomatonFormat$encodeAutomatonDocument,
							$author$project$Pages$EditorTuring$currentAutomatonType,
							A2($author$project$Pages$EditorTuring$encodeAutomaton, model.c, model.d)));
					var updateSlot = function (slot) {
						return _Utils_eq(slot.a4, slotId) ? _Utils_update(
							slot,
							{
								aZ: automatonJson,
								cj: $elm$core$Maybe$Just($author$project$Pages$EditorTuring$currentAutomatonType)
							}) : slot;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aE: $elm$core$Maybe$Just(slotId),
								aI: $elm$core$Maybe$Just(slotId),
								e: A2($elm$core$List$map, updateSlot, model.e),
								K: false,
								u: false
							}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2(
									$elm$core$Task$perform,
									function (_v31) {
										return $author$project$Pages$EditorTuring$ClearRecentlySavedSlot(slotId);
									},
									$elm$core$Process$sleep(2000)),
									A2(
									$elm$core$Task$perform,
									function (_v32) {
										return $author$project$Pages$EditorTuring$ClearSavedSlotAnimation(slotId);
									},
									$elm$core$Process$sleep(420))
								])));
				case 42:
					var slotId = msg.a;
					var maybeSlot = $elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (slot) {
								return _Utils_eq(slot.a4, slotId);
							},
							model.e));
					if (maybeSlot.$ === 1) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var slot = maybeSlot.a;
						if ($elm$core$String$isEmpty(slot.aZ)) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							if ($author$project$Pages$EditorTuring$slotTypeMismatch(slot.cj)) {
								return A2(
									$author$project$Pages$EditorTuring$showGlobalNotice,
									58,
									_Utils_update(
										model,
										{K: false, u: true}));
							} else {
								var _v34 = A2(
									$elm$json$Json$Decode$decodeString,
									A2($author$project$AutomatonFormat$decodeAutomatonDocument, $author$project$Pages$EditorTuring$currentAutomatonType, $author$project$Pages$EditorTuring$decodeAutomaton),
									slot.aZ);
								if (!_v34.$) {
									var document = _v34.a;
									if (!_Utils_eq(document.cj, $author$project$Pages$EditorTuring$currentAutomatonType)) {
										return A2(
											$author$project$Pages$EditorTuring$showGlobalNotice,
											58,
											_Utils_update(
												model,
												{K: false, u: true}));
									} else {
										var _v35 = document.ci;
										var ss = _v35.a;
										var ts = _v35.b;
										if ($author$project$Pages$EditorTuring$hasDuplicateStateNames(ss)) {
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{ak: true}),
												$elm$core$Platform$Cmd$none);
										} else {
											var normalizedStates = $author$project$Pages$EditorTuring$enforceSingleStartFlag(ss);
											var normalizedAutomaton = A2($author$project$Pages$EditorTuring$normalizeAutomatonIds, normalizedStates, ts);
											return _Utils_Tuple2(
												_Utils_update(
													model,
													{ao: $elm$core$Maybe$Nothing, I: normalizedAutomaton.I, p: normalizedAutomaton.p, h: $elm$core$Maybe$Nothing, s: $elm$core$Maybe$Nothing, aa: $elm$core$Maybe$Nothing, P: $elm$core$Maybe$Nothing, J: $elm$core$Maybe$Nothing, av: _List_Nil, Q: 0, R: _List_Nil, S: 0, aj: $elm$core$Maybe$Nothing, aJ: false, u: false, ak: false, c: normalizedAutomaton.c, ah: $elm$core$Maybe$Nothing, d: normalizedAutomaton.d}),
												$elm$core$Platform$Cmd$none);
										}
									}
								} else {
									return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
								}
							}
						}
					}
				case 43:
					var slotId = msg.a;
					var updateSlot = function (slot) {
						return _Utils_eq(slot.a4, slotId) ? _Utils_update(
							slot,
							{aZ: '', cj: $elm$core$Maybe$Nothing, b3: ''}) : slot;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								aN: $elm$core$Maybe$Just(slotId),
								af: _Utils_eq(
									model.ag,
									$elm$core$Maybe$Just(slotId)) ? '' : model.af,
								ag: _Utils_eq(
									model.ag,
									$elm$core$Maybe$Just(slotId)) ? $elm$core$Maybe$Nothing : model.ag,
								e: A2($elm$core$List$map, updateSlot, model.e),
								K: false,
								u: false
							}),
						A2(
							$elm$core$Task$perform,
							function (_v36) {
								return $author$project$Pages$EditorTuring$ClearDeletedSlotAnimation(slotId);
							},
							$elm$core$Process$sleep(420)));
				case 44:
					var slotId = msg.a;
					var currentName = A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.b3;
							},
							$elm$core$List$head(
								A2(
									$elm$core$List$filter,
									function (slot) {
										return _Utils_eq(slot.a4, slotId);
									},
									model.e))));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								af: currentName,
								ag: $elm$core$Maybe$Just(slotId),
								u: false
							}),
						$elm$core$Platform$Cmd$none);
				case 45:
					var slotName = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{af: slotName, u: false}),
						$elm$core$Platform$Cmd$none);
				case 46:
					var slotId = msg.a;
					var trimmedName = $elm$core$String$trim(model.af);
					var updateSlot = function (slot) {
						return _Utils_eq(slot.a4, slotId) ? _Utils_update(
							slot,
							{b3: trimmedName}) : slot;
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								af: '',
								ag: $elm$core$Maybe$Nothing,
								e: A2($elm$core$List$map, updateSlot, model.e),
								u: false
							}),
						$elm$core$Platform$Cmd$none);
				case 47:
					var slotId = msg.a;
					return _Utils_eq(
						model.aI,
						$elm$core$Maybe$Just(slotId)) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aI: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 48:
					var slotId = msg.a;
					return _Utils_eq(
						model.aE,
						$elm$core$Maybe$Just(slotId)) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aE: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 49:
					var slotId = msg.a;
					return _Utils_eq(
						model.aN,
						$elm$core$Maybe$Just(slotId)) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aN: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 50:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 51:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 52:
					var slotId = msg.a;
					var importedJson = msg.b;
					var _v37 = A2(
						$elm$json$Json$Decode$decodeString,
						A2($author$project$AutomatonFormat$decodeAutomatonDocument, $author$project$Pages$EditorTuring$currentAutomatonType, $author$project$Pages$EditorTuring$decodeAutomaton),
						importedJson);
					if (!_v37.$) {
						var document = _v37.a;
						var _v38 = document.ci;
						var importedStates = _v38.a;
						var importedTransitions = _v38.b;
						var minifiedAutomatonJson = A2(
							$elm$json$Json$Encode$encode,
							0,
							A2(
								$author$project$AutomatonFormat$encodeAutomatonDocument,
								document.cj,
								A2($author$project$Pages$EditorTuring$encodeAutomaton, importedStates, importedTransitions)));
						var updateSlot = function (slot) {
							return _Utils_eq(slot.a4, slotId) ? _Utils_update(
								slot,
								{
									aZ: minifiedAutomatonJson,
									cj: $elm$core$Maybe$Just(document.cj)
								}) : slot;
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									aE: $elm$core$Maybe$Just(slotId),
									aI: $elm$core$Maybe$Just(slotId),
									e: A2($elm$core$List$map, updateSlot, model.e),
									K: false,
									u: false
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										A2(
										$elm$core$Task$perform,
										function (_v39) {
											return $author$project$Pages$EditorTuring$ClearRecentlySavedSlot(slotId);
										},
										$elm$core$Process$sleep(2000)),
										A2(
										$elm$core$Task$perform,
										function (_v40) {
											return $author$project$Pages$EditorTuring$ClearSavedSlotAnimation(slotId);
										},
										$elm$core$Process$sleep(420))
									])));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{K: true, u: false}),
							A2(
								$elm$core$Task$perform,
								function (_v41) {
									return $author$project$Pages$EditorTuring$ClearSlotImportError;
								},
								$elm$core$Process$sleep(3000)));
					}
				case 53:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: true, u: false}),
						A2(
							$elm$core$Task$perform,
							function (_v42) {
								return $author$project$Pages$EditorTuring$ClearSlotImportError;
							},
							$elm$core$Process$sleep(3000)));
				case 54:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{K: false, u: false}),
						$elm$core$Platform$Cmd$none);
				case 55:
					var nextNonce = model.aO + 1;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{aG: true, aO: nextNonce, a_: !model.a_}),
						A2(
							$elm$core$Task$perform,
							function (_v43) {
								return $author$project$Pages$EditorTuring$AutomatonTypeAnimationFinished(nextNonce);
							},
							$elm$core$Process$sleep(260)));
				case 56:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aO) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aG: false}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 57:
					var nonce = msg.a;
					return _Utils_eq(nonce, model.aS) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{aR: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 58:
					var shortcut = msg.a;
					return A2($author$project$Pages$EditorTuring$handleShortcut, shortcut, model);
				default:
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		}
	});
var $author$project$Pages$Instructions$update = F2(
	function (_v0, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var req = msg.a;
				if (!req.$) {
					var url = req.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.bL,
							$elm$url$Url$toString(url)));
				} else {
					var href = req.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			case 1:
				var url = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							B: $author$project$Route$parseHash(url.bW),
							cb: url
						}),
					$elm$core$Platform$Cmd$none);
			case 2:
				var s = msg.a;
				var nextLang = $author$project$I18n$langFromString(s);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{b: nextLang}),
					$author$project$Main$saveLang(
						$author$project$I18n$langToString(nextLang)));
			case 3:
				var nextTheme = $author$project$Theme$toggle(model.a);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a: nextTheme}),
					$author$project$Main$saveTheme(
						$author$project$Main$themeToString(nextTheme)));
			case 4:
				var r = msg.a;
				return _Utils_Tuple2(
					model,
					A2(
						$elm$browser$Browser$Navigation$pushUrl,
						model.bL,
						$author$project$Route$toHash(r)));
			case 5:
				var maybeR = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bJ: maybeR}),
					$elm$core$Platform$Cmd$none);
			case 6:
				var sub = msg.a;
				var _v2 = A2($author$project$Pages$Editor$update, sub, model.l);
				var subModel = _v2.a;
				var subCmd = _v2.b;
				var maybeExportCmd = function () {
					switch (sub.$) {
						case 46:
							var slotId = sub.a;
							return A2(
								$elm$core$Maybe$withDefault,
								$elm$core$Platform$Cmd$none,
								A2(
									$elm$core$Maybe$map,
									function (slot) {
										return $author$project$Main$exportAutomatonFile(
											$elm$json$Json$Encode$object(
												_List_fromArray(
													[
														_Utils_Tuple2(
														'fileName',
														$elm$json$Json$Encode$string(
															A3($author$project$Main$exportFileName, slot.a4, slot.b3, slot.cj))),
														_Utils_Tuple2(
														'content',
														$elm$json$Json$Encode$string(slot.aZ))
													])));
									},
									$elm$core$List$head(
										A2(
											$elm$core$List$filter,
											function (slot) {
												return _Utils_eq(slot.a4, slotId) && (!$elm$core$String$isEmpty(slot.aZ));
											},
											subModel.e))));
						case 47:
							var slotId = sub.a;
							return $author$project$Main$importAutomatonFile(slotId);
						default:
							return $elm$core$Platform$Cmd$none;
					}
				}();
				var slotsChanged = !_Utils_eq(model.l.e, subModel.e);
				var persistCmd = slotsChanged ? $author$project$Main$saveAutomatonSlots(
					$author$project$Pages$Editor$encodeSaveSlots(subModel.e)) : $elm$core$Platform$Cmd$none;
				var syncedEditorStack = function () {
					var editorStackModel = model.m;
					return slotsChanged ? _Utils_update(
						editorStackModel,
						{e: subModel.e}) : editorStackModel;
				}();
				var syncedEditorTuring = function () {
					var editorTuringModel = model.n;
					return slotsChanged ? _Utils_update(
						editorTuringModel,
						{e: subModel.e}) : editorTuringModel;
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{l: subModel, m: syncedEditorStack, n: syncedEditorTuring}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorMsg, subCmd),
								persistCmd,
								maybeExportCmd
							])));
			case 7:
				var sub = msg.a;
				var _v4 = A2($author$project$Pages$EditorStack$update, sub, model.m);
				var subModel = _v4.a;
				var subCmd = _v4.b;
				var maybeExportCmd = function () {
					switch (sub.$) {
						case 50:
							var slotId = sub.a;
							return A2(
								$elm$core$Maybe$withDefault,
								$elm$core$Platform$Cmd$none,
								A2(
									$elm$core$Maybe$map,
									function (slot) {
										return $author$project$Main$exportAutomatonFile(
											$elm$json$Json$Encode$object(
												_List_fromArray(
													[
														_Utils_Tuple2(
														'fileName',
														$elm$json$Json$Encode$string(
															A3($author$project$Main$exportFileName, slot.a4, slot.b3, slot.cj))),
														_Utils_Tuple2(
														'content',
														$elm$json$Json$Encode$string(slot.aZ))
													])));
									},
									$elm$core$List$head(
										A2(
											$elm$core$List$filter,
											function (slot) {
												return _Utils_eq(slot.a4, slotId) && (!$elm$core$String$isEmpty(slot.aZ));
											},
											subModel.e))));
						case 51:
							var slotId = sub.a;
							return $author$project$Main$importAutomatonFile(slotId);
						default:
							return $elm$core$Platform$Cmd$none;
					}
				}();
				var slotsChanged = !_Utils_eq(model.m.e, subModel.e);
				var persistCmd = slotsChanged ? $author$project$Main$saveAutomatonSlots(
					$author$project$Pages$EditorStack$encodeSaveSlots(subModel.e)) : $elm$core$Platform$Cmd$none;
				var syncedEditor = function () {
					var editorModel = model.l;
					return slotsChanged ? _Utils_update(
						editorModel,
						{e: subModel.e}) : editorModel;
				}();
				var syncedEditorTuring = function () {
					var editorTuringModel = model.n;
					return slotsChanged ? _Utils_update(
						editorTuringModel,
						{e: subModel.e}) : editorTuringModel;
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{l: syncedEditor, m: subModel, n: syncedEditorTuring}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorStackMsg, subCmd),
								persistCmd,
								maybeExportCmd
							])));
			case 8:
				var sub = msg.a;
				var _v6 = A2($author$project$Pages$EditorTuring$update, sub, model.n);
				var subModel = _v6.a;
				var subCmd = _v6.b;
				var maybeExportCmd = function () {
					switch (sub.$) {
						case 50:
							var slotId = sub.a;
							return A2(
								$elm$core$Maybe$withDefault,
								$elm$core$Platform$Cmd$none,
								A2(
									$elm$core$Maybe$map,
									function (slot) {
										return $author$project$Main$exportAutomatonFile(
											$elm$json$Json$Encode$object(
												_List_fromArray(
													[
														_Utils_Tuple2(
														'fileName',
														$elm$json$Json$Encode$string(
															A3($author$project$Main$exportFileName, slot.a4, slot.b3, slot.cj))),
														_Utils_Tuple2(
														'content',
														$elm$json$Json$Encode$string(slot.aZ))
													])));
									},
									$elm$core$List$head(
										A2(
											$elm$core$List$filter,
											function (slot) {
												return _Utils_eq(slot.a4, slotId) && (!$elm$core$String$isEmpty(slot.aZ));
											},
											subModel.e))));
						case 51:
							var slotId = sub.a;
							return $author$project$Main$importAutomatonFile(slotId);
						default:
							return $elm$core$Platform$Cmd$none;
					}
				}();
				var slotsChanged = !_Utils_eq(model.n.e, subModel.e);
				var persistCmd = slotsChanged ? $author$project$Main$saveAutomatonSlots(
					$author$project$Pages$EditorTuring$encodeSaveSlots(subModel.e)) : $elm$core$Platform$Cmd$none;
				var syncedEditor = function () {
					var editorModel = model.l;
					return slotsChanged ? _Utils_update(
						editorModel,
						{e: subModel.e}) : editorModel;
				}();
				var syncedEditorStack = function () {
					var editorStackModel = model.m;
					return slotsChanged ? _Utils_update(
						editorStackModel,
						{e: subModel.e}) : editorStackModel;
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{l: syncedEditor, m: syncedEditorStack, n: subModel}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorTuringMsg, subCmd),
								persistCmd,
								maybeExportCmd
							])));
			case 13:
				var value = msg.a;
				var _v8 = A2($elm$json$Json$Decode$decodeValue, $author$project$Main$decodeImportFileResult, value);
				if (!_v8.$) {
					var _v9 = _v8.a;
					var slotId = _v9.a;
					var content = _v9.b;
					var _v10 = model.B;
					switch (_v10) {
						case 3:
							var currentEditorTuring = model.n;
							var currentEditor = model.l;
							var _v11 = A2(
								$author$project$Pages$EditorStack$update,
								A2($author$project$Pages$EditorStack$ApplyImportedSlot, slotId, content),
								model.m);
							var editorModel = _v11.a;
							var editorCmd = _v11.b;
							var persistCmd = (!_Utils_eq(model.m.e, editorModel.e)) ? $author$project$Main$saveAutomatonSlots(
								$author$project$Pages$EditorStack$encodeSaveSlots(editorModel.e)) : $elm$core$Platform$Cmd$none;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										l: _Utils_update(
											currentEditor,
											{e: editorModel.e}),
										m: editorModel,
										n: _Utils_update(
											currentEditorTuring,
											{e: editorModel.e})
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorStackMsg, editorCmd),
											persistCmd
										])));
						case 4:
							var currentEditorStack = model.m;
							var currentEditor = model.l;
							var _v12 = A2(
								$author$project$Pages$EditorTuring$update,
								A2($author$project$Pages$EditorTuring$ApplyImportedSlot, slotId, content),
								model.n);
							var editorModel = _v12.a;
							var editorCmd = _v12.b;
							var persistCmd = (!_Utils_eq(model.n.e, editorModel.e)) ? $author$project$Main$saveAutomatonSlots(
								$author$project$Pages$EditorTuring$encodeSaveSlots(editorModel.e)) : $elm$core$Platform$Cmd$none;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										l: _Utils_update(
											currentEditor,
											{e: editorModel.e}),
										m: _Utils_update(
											currentEditorStack,
											{e: editorModel.e}),
										n: editorModel
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorTuringMsg, editorCmd),
											persistCmd
										])));
						default:
							var currentEditorTuring = model.n;
							var currentEditorStack = model.m;
							var _v13 = A2(
								$author$project$Pages$Editor$update,
								A2($author$project$Pages$Editor$ApplyImportedSlot, slotId, content),
								model.l);
							var editorModel = _v13.a;
							var editorCmd = _v13.b;
							var persistCmd = (!_Utils_eq(model.l.e, editorModel.e)) ? $author$project$Main$saveAutomatonSlots(
								$author$project$Pages$Editor$encodeSaveSlots(editorModel.e)) : $elm$core$Platform$Cmd$none;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										l: editorModel,
										m: _Utils_update(
											currentEditorStack,
											{e: editorModel.e}),
										n: _Utils_update(
											currentEditorTuring,
											{e: editorModel.e})
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorMsg, editorCmd),
											persistCmd
										])));
					}
				} else {
					var _v14 = model.B;
					switch (_v14) {
						case 3:
							var _v15 = A2($author$project$Pages$EditorStack$update, $author$project$Pages$EditorStack$ImportSlotFailed, model.m);
							var editorModel = _v15.a;
							var editorCmd = _v15.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{m: editorModel}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorStackMsg, editorCmd));
						case 4:
							var _v16 = A2($author$project$Pages$EditorTuring$update, $author$project$Pages$EditorTuring$ImportSlotFailed, model.n);
							var editorModel = _v16.a;
							var editorCmd = _v16.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{n: editorModel}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorTuringMsg, editorCmd));
						default:
							var _v17 = A2($author$project$Pages$Editor$update, $author$project$Pages$Editor$ImportSlotFailed, model.l);
							var editorModel = _v17.a;
							var editorCmd = _v17.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{l: editorModel}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorMsg, editorCmd));
					}
				}
			case 9:
				var sub = msg.a;
				var _v18 = A2($author$project$Pages$Instructions$update, sub, model.bn);
				var subModel = _v18.a;
				var subCmd = _v18.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bn: subModel}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$InstructionsMsg, subCmd));
			case 10:
				var sub = msg.a;
				var _v19 = A2($author$project$Pages$About$update, sub, model.bd);
				var subModel = _v19.a;
				var subCmd = _v19.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bd: subModel}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$AboutMsg, subCmd));
			case 11:
				var w = msg.a;
				var h = msg.b;
				var _v20 = A2(
					$author$project$Pages$EditorTuring$update,
					A2($author$project$Pages$EditorTuring$SetViewport, w, h),
					model.n);
				var editorTuringModel = _v20.a;
				var editorTuringCmd = _v20.b;
				var _v21 = A2(
					$author$project$Pages$EditorStack$update,
					A2($author$project$Pages$EditorStack$SetViewport, w, h),
					model.m);
				var editorStackModel = _v21.a;
				var editorStackCmd = _v21.b;
				var _v22 = A2(
					$author$project$Pages$Editor$update,
					A2($author$project$Pages$Editor$SetViewport, w, h),
					model.l);
				var editorModel = _v22.a;
				var editorCmd = _v22.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{l: editorModel, m: editorStackModel, n: editorTuringModel, aX: h, aM: w}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorMsg, editorCmd),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorStackMsg, editorStackCmd),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorTuringMsg, editorTuringCmd)
							])));
			case 12:
				if (!msg.a.$) {
					var vp = msg.a.a;
					var w = $elm$core$Basics$round(vp.cH.ce);
					var h = $elm$core$Basics$round(vp.cH.t);
					var _v23 = A2(
						$author$project$Pages$EditorTuring$update,
						A2($author$project$Pages$EditorTuring$SetViewport, w, h),
						model.n);
					var editorTuringModel = _v23.a;
					var editorTuringCmd = _v23.b;
					var _v24 = A2(
						$author$project$Pages$EditorStack$update,
						A2($author$project$Pages$EditorStack$SetViewport, w, h),
						model.m);
					var editorStackModel = _v24.a;
					var editorStackCmd = _v24.b;
					var _v25 = A2(
						$author$project$Pages$Editor$update,
						A2($author$project$Pages$Editor$SetViewport, w, h),
						model.l);
					var editorModel = _v25.a;
					var editorCmd = _v25.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{l: editorModel, m: editorStackModel, n: editorTuringModel, aX: h, aM: w}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorMsg, editorCmd),
									A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorStackMsg, editorStackCmd),
									A2($elm$core$Platform$Cmd$map, $author$project$Main$EditorTuringMsg, editorTuringCmd)
								])));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 14:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bm: true}),
					$elm$core$Platform$Cmd$none);
			case 15:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bm: false}),
					$elm$core$Platform$Cmd$none);
			case 16:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bs: true}),
					$elm$core$Platform$Cmd$none);
			case 17:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bs: false}),
					$elm$core$Platform$Cmd$none);
			case 18:
				var normalizedStartPage = function () {
					var _v26 = model.L;
					if (!_v26) {
						return 1;
					} else {
						return model.L;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{L: normalizedStartPage, bT: false}),
					$author$project$Main$saveStartPage(
						$elm$core$String$fromInt(
							$author$project$Main$startPageToInt(normalizedStartPage))));
			case 19:
				var value = msg.a;
				var nextStartPage = $author$project$Main$startPageFromString(value);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{L: nextStartPage}),
					$author$project$Main$saveStartPage(
						$elm$core$String$fromInt(
							$author$project$Main$startPageToInt(nextStartPage))));
			case 20:
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a2: value}),
					$elm$core$Platform$Cmd$none);
			case 21:
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a1: value}),
					$elm$core$Platform$Cmd$none);
			case 22:
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							bl: $author$project$Main$mailProviderFromString(value)
						}),
					$elm$core$Platform$Cmd$none);
			case 23:
				var value = msg.a;
				var _v27 = A2($elm$json$Json$Decode$decodeValue, $author$project$Main$decodeWhatsNewPayload, value);
				if (!_v27.$) {
					var payload = _v27.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bb: $elm$core$Maybe$Just(payload)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 24:
				var _v28 = model.bb;
				if (!_v28.$) {
					var payload = _v28.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bb: $elm$core$Maybe$Nothing}),
						$author$project$Main$markVersionSeen(payload.bB));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$I18n$AppTitle = 0;
var $author$project$I18n$AutomatonMenuTitle = 8;
var $author$project$I18n$MenuAutomatonFinite = 2;
var $author$project$I18n$MenuAutomatonStack = 3;
var $author$project$I18n$MenuAutomatonTuring = 4;
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $author$project$Main$GoTo = function (a) {
	return {$: 4, a: a};
};
var $author$project$Main$SetHover = function (a) {
	return {$: 5, a: a};
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $author$project$Design$borderFor = F2(
	function (kind, tk) {
		switch (kind) {
			case 0:
				return tk.am.bS;
			case 1:
				return tk.am.bp;
			default:
				return tk.am.bR;
		}
	});
var $author$project$Design$card = F2(
	function (sz, tk) {
		switch (sz) {
			case 0:
				return tk.G.o;
			case 1:
				return tk.G.r;
			default:
				return tk.G.q;
		}
	});
var $author$project$Theme$focusOutline = function (th) {
	if (!th) {
		return '#7aa2ff';
	} else {
		return '#8992a7';
	}
};
var $author$project$Theme$hoverBg = function (th) {
	if (!th) {
		return '#e8eefc';
	} else {
		return '#2a2f3a';
	}
};
var $author$project$Theme$panelBorder = function (th) {
	if (!th) {
		return '#cfd6e4';
	} else {
		return '#2a2f3a';
	}
};
var $author$project$Theme$hoverBorder = function (th) {
	if (!th) {
		return '#7aa2ff';
	} else {
		return $author$project$Theme$panelBorder(th);
	}
};
var $author$project$Theme$hoverShadow = function (th) {
	if (!th) {
		return '0 6px 18px rgba(0,0,0,0.12)';
	} else {
		return '0 6px 18px rgba(0,0,0,0.35)';
	}
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseEnter = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseenter',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseLeave = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseleave',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Theme$panelBg = function (th) {
	if (!th) {
		return '#eef1f6';
	} else {
		return '#151924';
	}
};
var $author$project$Design$px = function (n) {
	return $elm$core$String$fromInt(n) + 'px';
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Design$BorderMid = 1;
var $author$project$Design$M = 1;
var $author$project$Design$S = 0;
var $author$project$Design$baseTokens = {
	am: {bU: 1, bp: 1, bR: 2, bS: 1},
	bD: {cL: 1024, cM: 1280, cN: 320, cO: 360, cP: 375, cQ: 390, cR: 412, cS: 768},
	G: {
		q: {t: 56, at: 16, A: 12},
		r: {t: 52, at: 14, A: 10},
		o: {t: 48, at: 12, A: 10}
	},
	bE: {b0: 24},
	bk: {b$: 960, b4: 420},
	H: {
		q: {t: 40, ar: 14, as: 8},
		r: {t: 36, ar: 12, as: 6},
		o: {t: 32, ar: 10, as: 5}
	},
	bG: 6,
	bH: {G: 0, H: 1},
	bI: {q: '0 10px 28px rgba(0,0,0,0.18)', r: '0 6px 18px rgba(0,0,0,0.14)', c3: 'none', o: '0 4px 12px rgba(0,0,0,0.10)'},
	ax: {bC: 14, bX: 22, bY: 18, bZ: 16, o: 13, aD: 12},
	a3: {q: 22, r: 18, o: 14},
	bM: {bC: '1.2', c1: '1.4', db: '1.1'},
	bO: {cV: 'ease', cZ: '120ms', bp: '180ms', c7: '120ms', c9: '240ms'},
	bP: {ce: 2},
	A: {q: 12, r: 10, o: 8, bc: 16, aD: 6},
	aw: {q: 16, r: 12, o: 8, bc: 20, aD: 6, cf: 28, cg: 4}
};
var $author$project$Design$scaleFactor = function (sc) {
	switch (sc) {
		case 0:
			return 0.94;
		case 1:
			return 1.00;
		case 2:
			return 1.08;
		default:
			return 1.24;
	}
};
var $author$project$Design$scaleI = F2(
	function (k, n) {
		return $elm$core$Basics$round(k * n);
	});
var $author$project$Design$tokens = function (sc) {
	var k = $author$project$Design$scaleFactor(sc);
	var b = $author$project$Design$baseTokens;
	return {
		am: {
			bU: b.am.bU,
			bp: A2(
				$elm$core$Basics$max,
				1,
				A2($author$project$Design$scaleI, k, b.am.bp)),
			bR: A2(
				$elm$core$Basics$max,
				2,
				A2($author$project$Design$scaleI, k, b.am.bR)),
			bS: A2(
				$elm$core$Basics$max,
				1,
				A2($author$project$Design$scaleI, k, b.am.bS))
		},
		bD: b.bD,
		G: {
			q: {
				t: A2($author$project$Design$scaleI, k, b.G.q.t),
				at: A2($author$project$Design$scaleI, k, b.G.q.at),
				A: A2($author$project$Design$scaleI, k, b.G.q.A)
			},
			r: {
				t: A2($author$project$Design$scaleI, k, b.G.r.t),
				at: A2($author$project$Design$scaleI, k, b.G.r.at),
				A: A2($author$project$Design$scaleI, k, b.G.r.A)
			},
			o: {
				t: A2($author$project$Design$scaleI, k, b.G.o.t),
				at: A2($author$project$Design$scaleI, k, b.G.o.at),
				A: A2($author$project$Design$scaleI, k, b.G.o.A)
			}
		},
		bE: {
			b0: A2($author$project$Design$scaleI, k, b.bE.b0)
		},
		bk: {
			b$: A2($author$project$Design$scaleI, k, b.bk.b$),
			b4: A2($author$project$Design$scaleI, k, b.bk.b4)
		},
		H: {
			q: {
				t: A2($author$project$Design$scaleI, k, b.H.q.t),
				ar: A2($author$project$Design$scaleI, k, b.H.q.ar),
				as: A2($author$project$Design$scaleI, k, b.H.q.as)
			},
			r: {
				t: A2($author$project$Design$scaleI, k, b.H.r.t),
				ar: A2($author$project$Design$scaleI, k, b.H.r.ar),
				as: A2($author$project$Design$scaleI, k, b.H.r.as)
			},
			o: {
				t: A2($author$project$Design$scaleI, k, b.H.o.t),
				ar: A2($author$project$Design$scaleI, k, b.H.o.ar),
				as: A2($author$project$Design$scaleI, k, b.H.o.as)
			}
		},
		bG: b.bG,
		bH: b.bH,
		bI: b.bI,
		ax: {
			bC: A2($author$project$Design$scaleI, k, b.ax.bC),
			bX: A2($author$project$Design$scaleI, k, b.ax.bX),
			bY: A2($author$project$Design$scaleI, k, b.ax.bY),
			bZ: A2($author$project$Design$scaleI, k, b.ax.bZ),
			o: A2($author$project$Design$scaleI, k, b.ax.o),
			aD: A2($author$project$Design$scaleI, k, b.ax.aD)
		},
		a3: {
			q: A2($author$project$Design$scaleI, k, b.a3.q),
			r: A2($author$project$Design$scaleI, k, b.a3.r),
			o: A2($author$project$Design$scaleI, k, b.a3.o)
		},
		bM: b.bM,
		bO: b.bO,
		bP: {
			ce: A2(
				$elm$core$Basics$max,
				2,
				A2($author$project$Design$scaleI, k, b.bP.ce))
		},
		A: {
			q: A2($author$project$Design$scaleI, k, b.A.q),
			r: A2($author$project$Design$scaleI, k, b.A.r),
			o: A2($author$project$Design$scaleI, k, b.A.o),
			bc: A2($author$project$Design$scaleI, k, b.A.bc),
			aD: A2($author$project$Design$scaleI, k, b.A.aD)
		},
		aw: {
			q: A2($author$project$Design$scaleI, k, b.aw.q),
			r: A2($author$project$Design$scaleI, k, b.aw.r),
			o: A2($author$project$Design$scaleI, k, b.aw.o),
			bc: A2($author$project$Design$scaleI, k, b.aw.bc),
			aD: A2($author$project$Design$scaleI, k, b.aw.aD),
			cf: A2($author$project$Design$scaleI, k, b.aw.cf),
			cg: A2($author$project$Design$scaleI, k, b.aw.cg)
		}
	};
};
var $author$project$Main$menuCard = F3(
	function (model, label, routeTarget) {
		var tk = $author$project$Design$tokens(model.aV);
		var k = A2($author$project$Design$card, tk.bH.G, tk);
		var isHovered = _Utils_eq(
			model.bJ,
			$elm$core$Maybe$Just(routeTarget));
		var outlineStyle = isHovered ? _List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'outline',
				$author$project$Design$px(tk.bP.ce) + (' solid ' + $author$project$Theme$focusOutline(model.a))),
				A2(
				$elm$html$Html$Attributes$style,
				'outline-offset',
				$author$project$Design$px(tk.aw.aD))
			]) : _List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'outline',
				$author$project$Design$px(tk.bP.ce) + ' solid transparent'),
				A2(
				$elm$html$Html$Attributes$style,
				'outline-offset',
				$author$project$Design$px(tk.aw.aD))
			]);
		var shadow = isHovered ? $author$project$Theme$hoverShadow(model.a) : 'none';
		var borderC = isHovered ? $author$project$Theme$hoverBorder(model.a) : $author$project$Theme$panelBorder(model.a);
		var bg = isHovered ? $author$project$Theme$hoverBg(model.a) : $author$project$Theme$panelBg(model.a);
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						$author$project$Main$GoTo(routeTarget)),
						$elm$html$Html$Events$onMouseEnter(
						$author$project$Main$SetHover(
							$elm$core$Maybe$Just(routeTarget))),
						$elm$html$Html$Events$onMouseLeave(
						$author$project$Main$SetHover($elm$core$Maybe$Nothing)),
						A2($elm$html$Html$Attributes$style, 'background', bg),
						A2(
						$elm$html$Html$Attributes$style,
						'border',
						$author$project$Design$px(
							A2($author$project$Design$borderFor, tk.am.bU, tk)) + (' solid ' + borderC)),
						A2(
						$elm$html$Html$Attributes$style,
						'padding',
						$author$project$Design$px(k.at)),
						A2(
						$elm$html$Html$Attributes$style,
						'border-radius',
						$author$project$Design$px(k.A)),
						A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
						A2($elm$html$Html$Attributes$style, 'user-select', 'none'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$author$project$Design$px(k.t)),
						A2($elm$html$Html$Attributes$style, 'box-shadow', shadow),
						A2($elm$html$Html$Attributes$style, 'transition', 'background ' + (tk.bO.c7 + (' ' + (tk.bO.cV + (', box-shadow ' + (tk.bO.c7 + (' ' + (tk.bO.cV + (', border-color ' + (tk.bO.c7 + (' ' + (tk.bO.cV + (', outline-color ' + (tk.bO.c7 + (' ' + (tk.bO.cV + (', outline ' + (tk.bO.c7 + (' ' + tk.bO.cV))))))))))))))))))),
						A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
						$elm$html$Html$Attributes$tabindex(0)
					]),
				outlineStyle),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'margin', '0'),
							A2(
							$elm$html$Html$Attributes$style,
							'font-size',
							$author$project$Design$px(tk.bE.b0))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]))
				]));
	});
var $author$project$I18n$t = F2(
	function (lang, key) {
		var _v0 = _Utils_Tuple2(lang, key);
		switch (_v0.a) {
			case 0:
				switch (_v0.b) {
					case 0:
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return 'Симулятор автоматов (Elm)';
					case 1:
						var _v9 = _v0.a;
						var _v10 = _v0.b;
						return 'Автомат';
					case 2:
						var _v17 = _v0.a;
						var _v18 = _v0.b;
						return 'Конечный автомат';
					case 3:
						var _v25 = _v0.a;
						var _v26 = _v0.b;
						return 'Стековый автомат';
					case 4:
						var _v33 = _v0.a;
						var _v34 = _v0.b;
						return 'Машина Тьюринга';
					case 5:
						var _v41 = _v0.a;
						var _v42 = _v0.b;
						return 'Инструкции';
					case 6:
						var _v49 = _v0.a;
						var _v50 = _v0.b;
						return 'О сайте';
					case 7:
						var _v57 = _v0.a;
						var _v58 = _v0.b;
						return 'Выберите раздел ниже';
					case 8:
						var _v65 = _v0.a;
						var _v66 = _v0.b;
						return 'Выберите тип автомата';
					case 9:
						var _v73 = _v0.a;
						var _v74 = _v0.b;
						return 'Стек';
					case 10:
						var _v81 = _v0.a;
						var _v82 = _v0.b;
						return 'Светлая';
					case 11:
						var _v89 = _v0.a;
						var _v90 = _v0.b;
						return 'Тёмная';
					case 12:
						var _v97 = _v0.a;
						var _v98 = _v0.b;
						return 'Тема';
					case 13:
						var _v105 = _v0.a;
						var _v106 = _v0.b;
						return 'Язык';
					case 14:
						var _v113 = _v0.a;
						var _v114 = _v0.b;
						return 'Настройки';
					case 15:
						var _v121 = _v0.a;
						var _v122 = _v0.b;
						return 'Настройки';
					case 16:
						var _v129 = _v0.a;
						var _v130 = _v0.b;
						return 'Добро пожаловать!';
					case 17:
						var _v137 = _v0.a;
						var _v138 = _v0.b;
						return 'Это симулятор конечного и стекового автоматов: вы можете строить граф, редактировать переходы, запускать симуляцию и сохранять слоты.';
					case 18:
						var _v145 = _v0.a;
						var _v146 = _v0.b;
						return 'Сайт построен как SPA на Elm: интерфейс, логика и состояние работают в браузере, а данные сохраняются в localStorage.';
					case 19:
						var _v153 = _v0.a;
						var _v154 = _v0.b;
						return 'Продолжить';
					case 20:
						var _v161 = _v0.a;
						var _v162 = _v0.b;
						return 'Стартовая страница';
					case 21:
						var _v169 = _v0.a;
						var _v170 = _v0.b;
						return 'Показывать Welcome окно';
					case 22:
						var _v177 = _v0.a;
						var _v178 = _v0.b;
						return 'Home';
					case 23:
						var _v185 = _v0.a;
						var _v186 = _v0.b;
						return 'Конечный автомат';
					case 24:
						var _v193 = _v0.a;
						var _v194 = _v0.b;
						return 'Стековый автомат';
					case 25:
						var _v201 = _v0.a;
						var _v202 = _v0.b;
						return 'Машина Тьюринга';
					case 26:
						var _v209 = _v0.a;
						var _v210 = _v0.b;
						return '← На главную';
					case 27:
						var _v217 = _v0.a;
						var _v218 = _v0.b;
						return 'Инструкции по использованию';
					case 28:
						var _v225 = _v0.a;
						var _v226 = _v0.b;
						return A2(
							$elm$core$String$join,
							'\n',
							_List_fromArray(
								['⚠️ Если что-то работает некорректно, сначала обновите страницу через Ctrl+F5.', '', '1) Конечный автомат', '• Режим «Создать состояния»: клик по пустому месту создаёт состояние.', '• Режим «Создать переходы»: выберите состояние-источник, затем состояние-назначение.', '• Режим «Выбрать»: перетаскивайте состояния, выбирайте состояние или переход для редактирования.', '• Двойной клик по состоянию переключает принимающее состояние.', '• Для выбранного состояния доступны: изменить название, сделать/убрать стартовым, сделать/убрать принимающим, удалить.', '• Для выбранного перехода доступны: изменить метку и удалить переход.', '• Приложение показывает, является ли автомат детерминированным или недетерминированным.', '• Можно открыть детали и посмотреть причины недетерминированности (например, дубликаты условий или λ-переходы).', '• Функция переходов (код слева):', '  — Импорт: применяет текст функции переходов к текущему автомату.', '  — Экспорт: формирует текст функции переходов из текущего автомата.', '  — Подсветка ошибок помогает исправить формат записей.', '  — Формат: (состояние, символ) => состояние_назначения.', '  — Примеры: (q0, a) => q1, (q1, b) => q2, (q2, λ) => q3.', '• Симуляции: обычный запуск и пошаговый режим.', '  — Обычный режим: Старт запускает симуляцию, Стоп останавливает.', '  — Пошаговый режим: можно идти по шагам вперёд/назад и смотреть текущие состояния.', '  — Результаты: принято / отклонено / тупик / нет стартового состояния.', '  — Для НКА при неоднозначности можно выбрать следующий переход вручную.', '• Сохранение и обмен:', '  — Раздел «Сохранение»: сохранение автомата в слот, загрузка, удаление, переименование слотов.', '  — Для слотов поддерживается импорт/экспорт .fas.', '• Горячие клавиши:', '  — Alt+1 — режим «Создать состояния».', '  — Alt+2 — режим «Создать переходы».', '  — Alt+3 — режим «Выбрать / перемещать состояния».', '  — Alt+S — сделать/убрать выбранное состояние стартовым.', '  — Alt+E — сделать/убрать выбранное состояние принимающим.', '  — Alt+N — фокус на поле имени/метки выбранного объекта.', '  — Alt+Q — центрировать холст на стартовом состоянии.', '  — Alt+T — фокус на редакторе функции переходов.', '  — Shift+Alt+S — фокус на поле входной строки симуляции.', '  — Shift+Alt+Enter — старт/стоп симуляции.', '  — Shift+Alt+N — показать/скрыть детали типа автомата.', '  — Delete (Windows/Linux) и Cmd+Backspace (macOS) — удалить выбранное состояние или переход.', '', '2) Засобниковый автомат', '• Есть визуализация стека и редактирование переходов со стековым входом/выходом.', '• Поддерживаются те же базовые режимы работы на холсте: создание состояний, переходов, выбор/перемещение и редактирование.', '• Поддерживается редактирование переходной функции для засобникового автомата.', '• Симуляции тоже доступны в двух вариантах: обычная и пошаговая (вперёд/назад).', '• Доступны те же операции сохранения/загрузки и импорт/экспорт .fas слотов.', '• Горячие клавиши работают так же, включая macOS (Cmd+Backspace для удаления).', '', '3) Если ошибка не ушла после Ctrl+F5', '• Напишите мне через форму обратной связи справа снизу.']));
					case 29:
						var _v233 = _v0.a;
						var _v234 = _v0.b;
						return 'О проекте';
					case 30:
						var _v241 = _v0.a;
						var _v242 = _v0.b;
						return 'Бакалаврская работа по предмету TZIV (teoreticke zaklady informacnych vied) на факультете FIIT STU. Проект создаёт Константин Зайцев — украинец; это визуальный редактор и симулятор конечных автоматов на Elm для обучения, экспериментов и демонстрации работы ДКА/НКА. В планах — добавить и другие виды автоматов (например, со стековой памятью и другие), но только если сайт будет востребован.';
					case 31:
						var _v249 = _v0.a;
						var _v250 = _v0.b;
						return 'Редактор';
					case 32:
						var _v257 = _v0.a;
						var _v258 = _v0.b;
						return 'Тип';
					case 33:
						var _v265 = _v0.a;
						var _v266 = _v0.b;
						return 'Детерминированный автомат';
					case 34:
						var _v273 = _v0.a;
						var _v274 = _v0.b;
						return 'Недетерминированный автомат';
					case 35:
						var _v281 = _v0.a;
						var _v282 = _v0.b;
						return 'Функция переходов';
					case 36:
						var _v289 = _v0.a;
						var _v290 = _v0.b;
						return 'Изменения';
					case 37:
						var _v297 = _v0.a;
						var _v298 = _v0.b;
						return 'Строка';
					case 38:
						var _v305 = _v0.a;
						var _v306 = _v0.b;
						return 'Ожидается формат: (став_откуда, условие) => став_куда';
					case 39:
						var _v313 = _v0.a;
						var _v314 = _v0.b;
						return 'Название става справа должно быть одним словом без пробелов';
					case 40:
						var _v321 = _v0.a;
						var _v322 = _v0.b;
						return 'Название става слева должно быть одним словом без пробелов';
					case 41:
						var _v329 = _v0.a;
						var _v330 = _v0.b;
						return 'Условие должно быть одним значением';
					case 42:
						var _v337 = _v0.a;
						var _v338 = _v0.b;
						return 'Ожидается ровно два элемента: став и условие';
					case 43:
						var _v345 = _v0.a;
						var _v346 = _v0.b;
						return 'Ожидается стрелка => и одна запись на строку';
					case 44:
						var _v353 = _v0.a;
						var _v354 = _v0.b;
						return 'Слева ожидается 3 элемента: (став_откуда, входной_символ, вход_стека)';
					case 45:
						var _v361 = _v0.a;
						var _v362 = _v0.b;
						return 'Справа ожидается 2 элемента: (став_куда, выход_стека)';
					case 46:
						var _v369 = _v0.a;
						var _v370 = _v0.b;
						return 'Вход стека должен быть одним символом или λ';
					case 47:
						var _v377 = _v0.a;
						var _v378 = _v0.b;
						return 'Если вход стека = Z, то в выходе стека символ Z должен быть в конце';
					case 48:
						var _v385 = _v0.a;
						var _v386 = _v0.b;
						return 'Импорт';
					case 49:
						var _v393 = _v0.a;
						var _v394 = _v0.b;
						return 'Экспорт';
					case 50:
						var _v401 = _v0.a;
						var _v402 = _v0.b;
						return 'Сохранение';
					case 51:
						var _v409 = _v0.a;
						var _v410 = _v0.b;
						return 'Слоты сохранения';
					case 52:
						var _v417 = _v0.a;
						var _v418 = _v0.b;
						return 'Сохранить текущий';
					case 53:
						var _v425 = _v0.a;
						var _v426 = _v0.b;
						return 'Загрузить из слота';
					case 54:
						var _v433 = _v0.a;
						var _v434 = _v0.b;
						return 'Удалить из слота';
					case 55:
						var _v441 = _v0.a;
						var _v442 = _v0.b;
						return 'Импорт .fas';
					case 56:
						var _v449 = _v0.a;
						var _v450 = _v0.b;
						return 'Экспорт .fas';
					case 57:
						var _v457 = _v0.a;
						var _v458 = _v0.b;
						return 'Ошибка при импорте';
					case 58:
						var _v465 = _v0.a;
						var _v466 = _v0.b;
						return 'Этот автомат другого типа и не может быть загружен в текущем редакторе';
					case 59:
						var _v473 = _v0.a;
						var _v474 = _v0.b;
						return 'Переименовать';
					case 60:
						var _v481 = _v0.a;
						var _v482 = _v0.b;
						return 'Подтвердить';
					case 61:
						var _v489 = _v0.a;
						var _v490 = _v0.b;
						return 'Сохранено';
					case 62:
						var _v497 = _v0.a;
						var _v498 = _v0.b;
						return 'Ячейка';
					case 63:
						var _v505 = _v0.a;
						var _v506 = _v0.b;
						return 'пусто';
					case 64:
						var _v513 = _v0.a;
						var _v514 = _v0.b;
						return 'Закрыть';
					case 65:
						var _v521 = _v0.a;
						var _v522 = _v0.b;
						return 'Название';
					case 66:
						var _v529 = _v0.a;
						var _v530 = _v0.b;
						return 'Ошибка: названия состояний должны быть уникальными';
					case 67:
						var _v537 = _v0.a;
						var _v538 = _v0.b;
						return 'Режим';
					case 68:
						var _v545 = _v0.a;
						var _v546 = _v0.b;
						return 'Создать состояния';
					case 69:
						var _v553 = _v0.a;
						var _v554 = _v0.b;
						return 'Создать переходы';
					case 70:
						var _v561 = _v0.a;
						var _v562 = _v0.b;
						return 'Выбрать';
					case 71:
						var _v569 = _v0.a;
						var _v570 = _v0.b;
						return 'Настройка переходов';
					case 72:
						var _v577 = _v0.a;
						var _v578 = _v0.b;
						return 'Переходы';
					case 73:
						var _v585 = _v0.a;
						var _v586 = _v0.b;
						return 'Метка';
					case 74:
						var _v593 = _v0.a;
						var _v594 = _v0.b;
						return 'Вход стека';
					case 75:
						var _v601 = _v0.a;
						var _v602 = _v0.b;
						return 'Выход стека';
					case 76:
						var _v609 = _v0.a;
						var _v610 = _v0.b;
						return 'Выберите состояние как начальный узел';
					case 77:
						var _v617 = _v0.a;
						var _v618 = _v0.b;
						return 'Выберите переход для редактирования';
					case 78:
						var _v625 = _v0.a;
						var _v626 = _v0.b;
						return 'Из';
					case 79:
						var _v633 = _v0.a;
						var _v634 = _v0.b;
						return 'Выбрано';
					case 80:
						var _v641 = _v0.a;
						var _v642 = _v0.b;
						return 'Ничего';
					case 81:
						var _v649 = _v0.a;
						var _v650 = _v0.b;
						return 'Не найдено';
					case 82:
						var _v657 = _v0.a;
						var _v658 = _v0.b;
						return 'Состояние';
					case 83:
						var _v665 = _v0.a;
						var _v666 = _v0.b;
						return 'Позиция';
					case 84:
						var _v673 = _v0.a;
						var _v674 = _v0.b;
						return 'Принимающее';
					case 85:
						var _v681 = _v0.a;
						var _v682 = _v0.b;
						return 'Стартовое';
					case 86:
						var _v689 = _v0.a;
						var _v690 = _v0.b;
						return 'Да';
					case 87:
						var _v697 = _v0.a;
						var _v698 = _v0.b;
						return 'Нет';
					case 88:
						var _v705 = _v0.a;
						var _v706 = _v0.b;
						return 'Удалить состояние';
					case 89:
						var _v713 = _v0.a;
						var _v714 = _v0.b;
						return 'Переход';
					case 90:
						var _v721 = _v0.a;
						var _v722 = _v0.b;
						return 'Удалить переход';
					case 91:
						var _v729 = _v0.a;
						var _v730 = _v0.b;
						return 'Снять старт';
					case 92:
						var _v737 = _v0.a;
						var _v738 = _v0.b;
						return 'Сделать стартом';
					case 93:
						var _v745 = _v0.a;
						var _v746 = _v0.b;
						return 'Снять конечный';
					case 94:
						var _v753 = _v0.a;
						var _v754 = _v0.b;
						return 'Сделать конечным';
					case 95:
						var _v761 = _v0.a;
						var _v762 = _v0.b;
						return 'Симуляция';
					case 96:
						var _v769 = _v0.a;
						var _v770 = _v0.b;
						return 'Входная строка';
					case 97:
						var _v777 = _v0.a;
						var _v778 = _v0.b;
						return 'Задержка';
					case 98:
						var _v785 = _v0.a;
						var _v786 = _v0.b;
						return 'К старту';
					case 99:
						var _v793 = _v0.a;
						var _v794 = _v0.b;
						return 'Запустить симуляцию';
					case 100:
						var _v801 = _v0.a;
						var _v802 = _v0.b;
						return 'Начать пошаговую симуляцию';
					case 101:
						var _v809 = _v0.a;
						var _v810 = _v0.b;
						return 'Стоп';
					case 102:
						var _v817 = _v0.a;
						var _v818 = _v0.b;
						return 'Шаг вперед';
					case 103:
						var _v825 = _v0.a;
						var _v826 = _v0.b;
						return 'Шаг назад';
					case 104:
						var _v833 = _v0.a;
						var _v834 = _v0.b;
						return 'Stop';
					case 105:
						var _v841 = _v0.a;
						var _v842 = _v0.b;
						return 'Симуляция выполняется...';
					case 106:
						var _v849 = _v0.a;
						var _v850 = _v0.b;
						return 'Успех';
					case 107:
						var _v857 = _v0.a;
						var _v858 = _v0.b;
						return 'Строка не соответствует автомату';
					case 108:
						var _v865 = _v0.a;
						var _v866 = _v0.b;
						return 'Ошибка: нет подходящего перехода для входа';
					case 109:
						var _v873 = _v0.a;
						var _v874 = _v0.b;
						return 'Ошибка: не выбрано стартовое состояние';
					case 110:
						var _v881 = _v0.a;
						var _v882 = _v0.b;
						return 'Ошибка в переходовой функции, исправьте её чтобы симуляция могла идти';
					case 111:
						var _v889 = _v0.a;
						var _v890 = _v0.b;
						return 'Есть несколько переходов';
					case 112:
						var _v897 = _v0.a;
						var _v898 = _v0.b;
						return 'Выберите, по какому переходу идти из состояния';
					case 113:
						var _v905 = _v0.a;
						var _v906 = _v0.b;
						return 'Показать/скрыть причины недетерминированности';
					case 114:
						var _v913 = _v0.a;
						var _v914 = _v0.b;
						return 'Причины недетерминированности';
					case 115:
						var _v921 = _v0.a;
						var _v922 = _v0.b;
						return 'Из состояния {state} есть несколько переходов по символу ‘{label}’';
					case 116:
						var _v929 = _v0.a;
						var _v930 = _v0.b;
						return 'Есть λ-переход из {from} в {to}';
					case 117:
						var _v937 = _v0.a;
						var _v938 = _v0.b;
						return '←';
					case 118:
						var _v945 = _v0.a;
						var _v946 = _v0.b;
						return 'На главную';
					case 119:
						var _v953 = _v0.a;
						var _v954 = _v0.b;
						return '← На главную';
					case 120:
						var _v961 = _v0.a;
						var _v962 = _v0.b;
						return 'Открыть форму обратной связи';
					case 121:
						var _v969 = _v0.a;
						var _v970 = _v0.b;
						return 'Обратная связь';
					case 122:
						var _v977 = _v0.a;
						var _v978 = _v0.b;
						return 'Опишите, что можно улучшить, и отправьте форму. Сообщение уйдёт через Formspree.';
					case 123:
						var _v985 = _v0.a;
						var _v986 = _v0.b;
						return 'Напишите ваше сообщение...';
					case 124:
						var _v993 = _v0.a;
						var _v994 = _v0.b;
						return 'Отправить';
					case 125:
						var _v1001 = _v0.a;
						var _v1002 = _v0.b;
						return 'Ваш email (необязательно)';
					case 126:
						var _v1009 = _v0.a;
						var _v1010 = _v0.b;
						return 'Ваш email';
					case 127:
						var _v1017 = _v0.a;
						var _v1018 = _v0.b;
						return 'Ваше сообщение';
					case 128:
						var _v1025 = _v0.a;
						var _v1026 = _v0.b;
						return 'Рекомендуемый способ';
					case 129:
						var _v1033 = _v0.a;
						var _v1034 = _v0.b;
						return 'Мейл:';
					case 130:
						var _v1041 = _v0.a;
						var _v1042 = _v0.b;
						return 'Google form:';
					case 131:
						var _v1049 = _v0.a;
						var _v1050 = _v0.b;
						return 'Сообщения отправляются через Formspree и могут быть ограничены по количеству';
					case 132:
						var _v1057 = _v0.a;
						var _v1058 = _v0.b;
						return 'Почтовый сервис:';
					case 133:
						var _v1065 = _v0.a;
						var _v1066 = _v0.b;
						return 'Gmail';
					case 134:
						var _v1073 = _v0.a;
						var _v1074 = _v0.b;
						return 'Outlook';
					case 135:
						var _v1081 = _v0.a;
						var _v1082 = _v0.b;
						return 'Не изменять';
					case 136:
						var _v1089 = _v0.a;
						var _v1090 = _v0.b;
						return 'Опишите как можно подробнее вашу проблему/предложение';
					case 137:
						var _v1097 = _v0.a;
						var _v1098 = _v0.b;
						return 'Что нового — версия';
					case 138:
						var _v1105 = _v0.a;
						var _v1106 = _v0.b;
						return 'Для этой версии пока нет записей changelog.';
					case 139:
						var _v1113 = _v0.a;
						var _v1114 = _v0.b;
						return 'Доступна новая версия. Обновите страницу: Ctrl+F5 (на macOS: Cmd+Shift+R).';
					default:
						var _v1121 = _v0.a;
						var _v1122 = _v0.b;
						return 'Понятно';
				}
			case 1:
				switch (_v0.b) {
					case 0:
						var _v3 = _v0.a;
						var _v4 = _v0.b;
						return 'Automatons Simulator (Elm)';
					case 1:
						var _v11 = _v0.a;
						var _v12 = _v0.b;
						return 'Automaton';
					case 2:
						var _v19 = _v0.a;
						var _v20 = _v0.b;
						return 'Finite automaton';
					case 3:
						var _v27 = _v0.a;
						var _v28 = _v0.b;
						return 'Stack automaton';
					case 4:
						var _v35 = _v0.a;
						var _v36 = _v0.b;
						return 'Turing machine';
					case 5:
						var _v43 = _v0.a;
						var _v44 = _v0.b;
						return 'Instructions';
					case 6:
						var _v51 = _v0.a;
						var _v52 = _v0.b;
						return 'About';
					case 7:
						var _v59 = _v0.a;
						var _v60 = _v0.b;
						return 'Choose a section below';
					case 8:
						var _v67 = _v0.a;
						var _v68 = _v0.b;
						return 'Choose automaton type';
					case 9:
						var _v75 = _v0.a;
						var _v76 = _v0.b;
						return 'Stack';
					case 10:
						var _v83 = _v0.a;
						var _v84 = _v0.b;
						return 'Light';
					case 11:
						var _v91 = _v0.a;
						var _v92 = _v0.b;
						return 'Dark';
					case 12:
						var _v99 = _v0.a;
						var _v100 = _v0.b;
						return 'Theme';
					case 13:
						var _v107 = _v0.a;
						var _v108 = _v0.b;
						return 'Language';
					case 14:
						var _v115 = _v0.a;
						var _v116 = _v0.b;
						return 'Settings';
					case 15:
						var _v123 = _v0.a;
						var _v124 = _v0.b;
						return 'Settings';
					case 16:
						var _v131 = _v0.a;
						var _v132 = _v0.b;
						return 'Welcome!';
					case 17:
						var _v139 = _v0.a;
						var _v140 = _v0.b;
						return 'This is a finite and stack automata simulator: you can build graphs, edit transitions, run simulations, and save slots.';
					case 18:
						var _v147 = _v0.a;
						var _v148 = _v0.b;
						return 'The site is built as an Elm SPA: UI, logic, and state run in the browser, while data is persisted in localStorage.';
					case 19:
						var _v155 = _v0.a;
						var _v156 = _v0.b;
						return 'Continue';
					case 20:
						var _v163 = _v0.a;
						var _v164 = _v0.b;
						return 'Start page';
					case 21:
						var _v171 = _v0.a;
						var _v172 = _v0.b;
						return 'Show Welcome modal';
					case 22:
						var _v179 = _v0.a;
						var _v180 = _v0.b;
						return 'Home';
					case 23:
						var _v187 = _v0.a;
						var _v188 = _v0.b;
						return 'Finite automaton';
					case 24:
						var _v195 = _v0.a;
						var _v196 = _v0.b;
						return 'Stack automaton';
					case 25:
						var _v203 = _v0.a;
						var _v204 = _v0.b;
						return 'Turing machine';
					case 26:
						var _v211 = _v0.a;
						var _v212 = _v0.b;
						return '← Home';
					case 27:
						var _v219 = _v0.a;
						var _v220 = _v0.b;
						return 'Usage Instructions';
					case 28:
						var _v227 = _v0.a;
						var _v228 = _v0.b;
						return A2(
							$elm$core$String$join,
							'\n',
							_List_fromArray(
								['⚠️ If anything works incorrectly, first hard-refresh the page with Ctrl+F5.', '', '1) Finite automaton', '• \'Create states\' mode: click on empty space to create a state.', '• \'Create transitions\' mode: select the source state, then the destination state.', '• \'Select\' mode: drag states, select a state or a transition to edit.', '• Double-clicking a state toggles its accepting flag.', '• For the selected state you can: rename it, set/unset start, set/unset accepting, delete.', '• For the selected transition you can: change the label and delete the transition.', '• The app shows whether the automaton is deterministic or non-deterministic.', '• You can open details and see reasons for non-determinism (for example, duplicate conditions or λ-transitions).', '• Transition function (code on the left):', '  — Import: applies the transition function text to the current automaton.', '  — Export: generates the transition function text from the current automaton.', '  — Error highlighting helps to fix formatting issues in entries.', '  — Format: (state, symbol) => target_state.', '  — Examples: (q0, a) => q1, (q1, b) => q2, (q2, λ) => q3.', '• Simulations: regular run and step-by-step mode.', '  — Regular mode: Start begins the simulation, Stop stops it.', '  — Step-by-step mode: you can move forward/backward through steps and inspect current states.', '  — Results: accepted / rejected / dead end / no start state.', '  — For NFAs, when ambiguous, you can choose the next transition manually.', '• Saving and sharing:', '  — \'Save\' section: save the automaton to a slot, load, delete, rename slots.', '  — Slots support importing/exporting .fas files.', '• Keyboard shortcuts:', '  — Alt+1 — \'Create states\' mode.', '  — Alt+2 — \'Create transitions\' mode.', '  — Alt+3 — \'Select / move states\' mode.', '  — Alt+S — set/unset the selected state as start.', '  — Alt+E — set/unset the selected state as accepting.', '  — Alt+N — focus the name/label field of the selected item.', '  — Alt+Q — center the canvas on the start state.', '  — Alt+T — focus the transition function editor.', '  — Shift+Alt+S — focus the simulation input field.', '  — Shift+Alt+Enter — start/stop simulation.', '  — Shift+Alt+N — show/hide automaton type details.', '  — Delete (Windows/Linux) and Cmd+Backspace (macOS) — delete selected state/transition.', '', '2) Stack automaton', '• Includes stack visualization and transition editing with stack input/output.', '• Supports the same base canvas workflows: create states, create transitions, select/move and edit.', '• Supports transition-function editing for stack automata.', '• Simulations are also available in two variants: regular and step-by-step (forward/backward).', '• Supports the same save/load operations and .fas import/export.', '• Keyboard shortcuts work the same way, including macOS (Cmd+Backspace for delete).', '', '3) If issues remain after Ctrl+F5', '• Contact me via the feedback form in the bottom-right corner.']));
					case 29:
						var _v235 = _v0.a;
						var _v236 = _v0.b;
						return 'About the Project';
					case 30:
						var _v243 = _v0.a;
						var _v244 = _v0.b;
						return 'Bachelor thesis for the TZIV course (teoreticke zaklady informacnych vied) at the FIIT STU faculty. The project is developed by Kostiantyn Zaitsev, a Ukrainian student; it provides a visual editor and simulator of finite automata in Elm for learning, experimentation, and DFA/NFA demonstrations. The plan is to add more types of automata (like storage automata and others) but only if the site proves to be popular.';
					case 31:
						var _v251 = _v0.a;
						var _v252 = _v0.b;
						return 'Editor';
					case 32:
						var _v259 = _v0.a;
						var _v260 = _v0.b;
						return 'Type';
					case 33:
						var _v267 = _v0.a;
						var _v268 = _v0.b;
						return 'Deterministic automaton';
					case 34:
						var _v275 = _v0.a;
						var _v276 = _v0.b;
						return 'Non-deterministic automaton';
					case 35:
						var _v283 = _v0.a;
						var _v284 = _v0.b;
						return 'Transition function';
					case 36:
						var _v291 = _v0.a;
						var _v292 = _v0.b;
						return 'Changes';
					case 37:
						var _v299 = _v0.a;
						var _v300 = _v0.b;
						return 'Line';
					case 38:
						var _v307 = _v0.a;
						var _v308 = _v0.b;
						return 'Expected format: (from_state, condition) => to_state';
					case 39:
						var _v315 = _v0.a;
						var _v316 = _v0.b;
						return 'Target state name must be a single word without spaces';
					case 40:
						var _v323 = _v0.a;
						var _v324 = _v0.b;
						return 'Source state name must be a single word without spaces';
					case 41:
						var _v331 = _v0.a;
						var _v332 = _v0.b;
						return 'Condition must be a single value';
					case 42:
						var _v339 = _v0.a;
						var _v340 = _v0.b;
						return 'Expected exactly two items: state and condition';
					case 43:
						var _v347 = _v0.a;
						var _v348 = _v0.b;
						return 'Expected arrow => and one entry per line';
					case 44:
						var _v355 = _v0.a;
						var _v356 = _v0.b;
						return 'Left side must contain 3 items: (from_state, input_symbol, input_stack)';
					case 45:
						var _v363 = _v0.a;
						var _v364 = _v0.b;
						return 'Right side must contain 2 items: (to_state, output_stack)';
					case 46:
						var _v371 = _v0.a;
						var _v372 = _v0.b;
						return 'Input stack must be a single symbol or λ';
					case 47:
						var _v379 = _v0.a;
						var _v380 = _v0.b;
						return 'If input stack is Z, output stack must end with Z';
					case 48:
						var _v387 = _v0.a;
						var _v388 = _v0.b;
						return 'Import';
					case 49:
						var _v395 = _v0.a;
						var _v396 = _v0.b;
						return 'Export';
					case 50:
						var _v403 = _v0.a;
						var _v404 = _v0.b;
						return 'Save';
					case 51:
						var _v411 = _v0.a;
						var _v412 = _v0.b;
						return 'Save slots';
					case 52:
						var _v419 = _v0.a;
						var _v420 = _v0.b;
						return 'Save current';
					case 53:
						var _v427 = _v0.a;
						var _v428 = _v0.b;
						return 'Load from slot';
					case 54:
						var _v435 = _v0.a;
						var _v436 = _v0.b;
						return 'Delete from slot';
					case 55:
						var _v443 = _v0.a;
						var _v444 = _v0.b;
						return 'Import .fas';
					case 56:
						var _v451 = _v0.a;
						var _v452 = _v0.b;
						return 'Export .fas';
					case 57:
						var _v459 = _v0.a;
						var _v460 = _v0.b;
						return 'Import failed';
					case 58:
						var _v467 = _v0.a;
						var _v468 = _v0.b;
						return 'This automaton type cannot be loaded in the current editor';
					case 59:
						var _v475 = _v0.a;
						var _v476 = _v0.b;
						return 'Rename';
					case 60:
						var _v483 = _v0.a;
						var _v484 = _v0.b;
						return 'Confirm';
					case 61:
						var _v491 = _v0.a;
						var _v492 = _v0.b;
						return 'Saved';
					case 62:
						var _v499 = _v0.a;
						var _v500 = _v0.b;
						return 'Slot';
					case 63:
						var _v507 = _v0.a;
						var _v508 = _v0.b;
						return 'empty';
					case 64:
						var _v515 = _v0.a;
						var _v516 = _v0.b;
						return 'Close';
					case 65:
						var _v523 = _v0.a;
						var _v524 = _v0.b;
						return 'Name';
					case 66:
						var _v531 = _v0.a;
						var _v532 = _v0.b;
						return 'Error: state names must be unique';
					case 67:
						var _v539 = _v0.a;
						var _v540 = _v0.b;
						return 'Mode';
					case 68:
						var _v547 = _v0.a;
						var _v548 = _v0.b;
						return 'Create states';
					case 69:
						var _v555 = _v0.a;
						var _v556 = _v0.b;
						return 'Create transitions';
					case 70:
						var _v563 = _v0.a;
						var _v564 = _v0.b;
						return 'Select';
					case 71:
						var _v571 = _v0.a;
						var _v572 = _v0.b;
						return 'Configure transitions';
					case 72:
						var _v579 = _v0.a;
						var _v580 = _v0.b;
						return 'Transitions';
					case 73:
						var _v587 = _v0.a;
						var _v588 = _v0.b;
						return 'Label';
					case 74:
						var _v595 = _v0.a;
						var _v596 = _v0.b;
						return 'Input stack';
					case 75:
						var _v603 = _v0.a;
						var _v604 = _v0.b;
						return 'Output stack';
					case 76:
						var _v611 = _v0.a;
						var _v612 = _v0.b;
						return 'Select a state as the start node';
					case 77:
						var _v619 = _v0.a;
						var _v620 = _v0.b;
						return 'Select a transition to edit';
					case 78:
						var _v627 = _v0.a;
						var _v628 = _v0.b;
						return 'From';
					case 79:
						var _v635 = _v0.a;
						var _v636 = _v0.b;
						return 'Selected';
					case 80:
						var _v643 = _v0.a;
						var _v644 = _v0.b;
						return 'None';
					case 81:
						var _v651 = _v0.a;
						var _v652 = _v0.b;
						return 'Not found';
					case 82:
						var _v659 = _v0.a;
						var _v660 = _v0.b;
						return 'State';
					case 83:
						var _v667 = _v0.a;
						var _v668 = _v0.b;
						return 'Pos';
					case 84:
						var _v675 = _v0.a;
						var _v676 = _v0.b;
						return 'Accepting';
					case 85:
						var _v683 = _v0.a;
						var _v684 = _v0.b;
						return 'Start';
					case 86:
						var _v691 = _v0.a;
						var _v692 = _v0.b;
						return 'Yes';
					case 87:
						var _v699 = _v0.a;
						var _v700 = _v0.b;
						return 'No';
					case 88:
						var _v707 = _v0.a;
						var _v708 = _v0.b;
						return 'Delete state';
					case 89:
						var _v715 = _v0.a;
						var _v716 = _v0.b;
						return 'Transition';
					case 90:
						var _v723 = _v0.a;
						var _v724 = _v0.b;
						return 'Delete transition';
					case 91:
						var _v731 = _v0.a;
						var _v732 = _v0.b;
						return 'Unset start';
					case 92:
						var _v739 = _v0.a;
						var _v740 = _v0.b;
						return 'Make start';
					case 93:
						var _v747 = _v0.a;
						var _v748 = _v0.b;
						return 'Unset accepting';
					case 94:
						var _v755 = _v0.a;
						var _v756 = _v0.b;
						return 'Make accepting';
					case 95:
						var _v763 = _v0.a;
						var _v764 = _v0.b;
						return 'Simulation';
					case 96:
						var _v771 = _v0.a;
						var _v772 = _v0.b;
						return 'Input string';
					case 97:
						var _v779 = _v0.a;
						var _v780 = _v0.b;
						return 'Delay';
					case 98:
						var _v787 = _v0.a;
						var _v788 = _v0.b;
						return 'Go to start';
					case 99:
						var _v795 = _v0.a;
						var _v796 = _v0.b;
						return 'Start simulation';
					case 100:
						var _v803 = _v0.a;
						var _v804 = _v0.b;
						return 'Start step-by-step simulation';
					case 101:
						var _v811 = _v0.a;
						var _v812 = _v0.b;
						return 'Stop';
					case 102:
						var _v819 = _v0.a;
						var _v820 = _v0.b;
						return 'Step forward';
					case 103:
						var _v827 = _v0.a;
						var _v828 = _v0.b;
						return 'Step back';
					case 104:
						var _v835 = _v0.a;
						var _v836 = _v0.b;
						return 'Stop';
					case 105:
						var _v843 = _v0.a;
						var _v844 = _v0.b;
						return 'Simulation running...';
					case 106:
						var _v851 = _v0.a;
						var _v852 = _v0.b;
						return 'Success';
					case 107:
						var _v859 = _v0.a;
						var _v860 = _v0.b;
						return 'Word does not match the automaton';
					case 108:
						var _v867 = _v0.a;
						var _v868 = _v0.b;
						return 'Error: no suitable transition for input';
					case 109:
						var _v875 = _v0.a;
						var _v876 = _v0.b;
						return 'Error: no start state selected';
					case 110:
						var _v883 = _v0.a;
						var _v884 = _v0.b;
						return 'There is an error in the transition function. Fix it to run simulation';
					case 111:
						var _v891 = _v0.a;
						var _v892 = _v0.b;
						return 'Multiple transitions available';
					case 112:
						var _v899 = _v0.a;
						var _v900 = _v0.b;
						return 'Choose which transition to follow from state';
					case 113:
						var _v907 = _v0.a;
						var _v908 = _v0.b;
						return 'Show/hide non-determinism reasons';
					case 114:
						var _v915 = _v0.a;
						var _v916 = _v0.b;
						return 'Reasons for non-determinism';
					case 115:
						var _v923 = _v0.a;
						var _v924 = _v0.b;
						return 'State {state} has multiple transitions for symbol ‘{label}’';
					case 116:
						var _v931 = _v0.a;
						var _v932 = _v0.b;
						return 'There is a λ-transition from {from} to {to}';
					case 117:
						var _v939 = _v0.a;
						var _v940 = _v0.b;
						return '←';
					case 118:
						var _v947 = _v0.a;
						var _v948 = _v0.b;
						return 'Home';
					case 119:
						var _v955 = _v0.a;
						var _v956 = _v0.b;
						return '← Home';
					case 120:
						var _v963 = _v0.a;
						var _v964 = _v0.b;
						return 'Open feedback form';
					case 121:
						var _v971 = _v0.a;
						var _v972 = _v0.b;
						return 'Feedback';
					case 122:
						var _v979 = _v0.a;
						var _v980 = _v0.b;
						return 'Describe what can be improved and submit the form. The message is sent via Formspree.';
					case 123:
						var _v987 = _v0.a;
						var _v988 = _v0.b;
						return 'Write your message...';
					case 124:
						var _v995 = _v0.a;
						var _v996 = _v0.b;
						return 'Send';
					case 125:
						var _v1003 = _v0.a;
						var _v1004 = _v0.b;
						return 'Your email (optional)';
					case 126:
						var _v1011 = _v0.a;
						var _v1012 = _v0.b;
						return 'Your email';
					case 127:
						var _v1019 = _v0.a;
						var _v1020 = _v0.b;
						return 'Your message';
					case 128:
						var _v1027 = _v0.a;
						var _v1028 = _v0.b;
						return 'Recommended method';
					case 129:
						var _v1035 = _v0.a;
						var _v1036 = _v0.b;
						return 'Mail:';
					case 130:
						var _v1043 = _v0.a;
						var _v1044 = _v0.b;
						return 'Google form:';
					case 131:
						var _v1051 = _v0.a;
						var _v1052 = _v0.b;
						return 'Messages are sent through Formspree and may be rate-limited';
					case 132:
						var _v1059 = _v0.a;
						var _v1060 = _v0.b;
						return 'Mail service:';
					case 133:
						var _v1067 = _v0.a;
						var _v1068 = _v0.b;
						return 'Gmail';
					case 134:
						var _v1075 = _v0.a;
						var _v1076 = _v0.b;
						return 'Outlook';
					case 135:
						var _v1083 = _v0.a;
						var _v1084 = _v0.b;
						return 'Do not modify';
					case 136:
						var _v1091 = _v0.a;
						var _v1092 = _v0.b;
						return 'Describe your issue/suggestion in as much detail as possible';
					case 137:
						var _v1099 = _v0.a;
						var _v1100 = _v0.b;
						return 'What\'s new — version';
					case 138:
						var _v1107 = _v0.a;
						var _v1108 = _v0.b;
						return 'No changelog entries were found for this version yet.';
					case 139:
						var _v1115 = _v0.a;
						var _v1116 = _v0.b;
						return 'A new version is available. Refresh the page: Ctrl+F5 (on macOS: Cmd+Shift+R).';
					default:
						var _v1123 = _v0.a;
						var _v1124 = _v0.b;
						return 'Got it';
				}
			case 2:
				switch (_v0.b) {
					case 0:
						var _v5 = _v0.a;
						var _v6 = _v0.b;
						return 'Simulátor automatov (Elm)';
					case 1:
						var _v13 = _v0.a;
						var _v14 = _v0.b;
						return 'Automat';
					case 2:
						var _v21 = _v0.a;
						var _v22 = _v0.b;
						return 'Konečný automat';
					case 3:
						var _v29 = _v0.a;
						var _v30 = _v0.b;
						return 'Zásobníkový automat';
					case 4:
						var _v37 = _v0.a;
						var _v38 = _v0.b;
						return 'Turingov stroj';
					case 5:
						var _v45 = _v0.a;
						var _v46 = _v0.b;
						return 'Návod';
					case 6:
						var _v53 = _v0.a;
						var _v54 = _v0.b;
						return 'O projekte';
					case 7:
						var _v61 = _v0.a;
						var _v62 = _v0.b;
						return 'Vyberte sekciu nižšie';
					case 8:
						var _v69 = _v0.a;
						var _v70 = _v0.b;
						return 'Vyberte typ automatu';
					case 9:
						var _v77 = _v0.a;
						var _v78 = _v0.b;
						return 'Zásobník';
					case 10:
						var _v85 = _v0.a;
						var _v86 = _v0.b;
						return 'Svetlá';
					case 11:
						var _v93 = _v0.a;
						var _v94 = _v0.b;
						return 'Tmavá';
					case 12:
						var _v101 = _v0.a;
						var _v102 = _v0.b;
						return 'Téma';
					case 13:
						var _v109 = _v0.a;
						var _v110 = _v0.b;
						return 'Jazyk';
					case 14:
						var _v117 = _v0.a;
						var _v118 = _v0.b;
						return 'Nastavenia';
					case 15:
						var _v125 = _v0.a;
						var _v126 = _v0.b;
						return 'Nastavenia';
					case 16:
						var _v133 = _v0.a;
						var _v134 = _v0.b;
						return 'Vitajte!';
					case 17:
						var _v141 = _v0.a;
						var _v142 = _v0.b;
						return 'Toto je simulátor konečných a zásobníkových automatov: môžete vytvárať graf, upravovať prechody, spúšťať simuláciu a ukladať sloty.';
					case 18:
						var _v149 = _v0.a;
						var _v150 = _v0.b;
						return 'Stránka je vytvorená ako Elm SPA: rozhranie, logika aj stav bežia v prehliadači a dáta sa ukladajú do localStorage.';
					case 19:
						var _v157 = _v0.a;
						var _v158 = _v0.b;
						return 'Pokračovať';
					case 20:
						var _v165 = _v0.a;
						var _v166 = _v0.b;
						return 'Úvodná stránka';
					case 21:
						var _v173 = _v0.a;
						var _v174 = _v0.b;
						return 'Zobraziť Welcome okno';
					case 22:
						var _v181 = _v0.a;
						var _v182 = _v0.b;
						return 'Domov';
					case 23:
						var _v189 = _v0.a;
						var _v190 = _v0.b;
						return 'Konečný automat';
					case 24:
						var _v197 = _v0.a;
						var _v198 = _v0.b;
						return 'Zásobníkový automat';
					case 25:
						var _v205 = _v0.a;
						var _v206 = _v0.b;
						return 'Turingov stroj';
					case 26:
						var _v213 = _v0.a;
						var _v214 = _v0.b;
						return '← Domov';
					case 27:
						var _v221 = _v0.a;
						var _v222 = _v0.b;
						return 'Návod na použitie';
					case 28:
						var _v229 = _v0.a;
						var _v230 = _v0.b;
						return A2(
							$elm$core$String$join,
							'\n',
							_List_fromArray(
								['⚠️ Ak niečo nefunguje správne, najprv skúste tvrdé obnovenie stránky cez Ctrl+F5.', '', '1) Konečný automat', '• Režim \'Vytvoriť stavy\': kliknutie na prázdne miesto vytvorí stav.', '• Režim \'Vytvoriť prechody\': vyberte zdrojový stav, potom cieľový stav.', '• Režim \'Vybrať\': ťahajte stavy, vyberte stav alebo prechod na úpravu.', '• Dvojité kliknutie na stav prepína, či je akceptujúci.', '• Pre vybraný stav môžete: zmeniť názov, nastaviť/zrušiť počiatočný, nastaviť/zrušiť akceptujúci, odstrániť.', '• Pre vybraný prechod môžete: zmeniť označenie a odstrániť prechod.', '• Aplikácia zobrazuje, či je automat deterministický alebo nedeterministický.', '• Môžete otvoriť detaily a vidieť dôvody nedeterministickosti (napríklad duplikáty podmienok alebo λ-prechody).', '• Prechodová funkcia (kód vľavo):', '  — Import: aplikuje text prechodovej funkcie na aktuálny automat.', '  — Export: vygeneruje text prechodovej funkcie z aktuálneho automatu.', '  — Zvýraznenie chýb pomáha opraviť formát záznamov.', '  — Formát: (stav, symbol) => cieľový_stav.', '  — Príklady: (q0, a) => q1, (q1, b) => q2, (q2, λ) => q3.', '• Simulácie: bežné spustenie aj krokový režim.', '  — Bežný režim: Start spustí simuláciu, Stop ju zastaví.', '  — Krokový režim: môžete ísť po krokoch dopredu/dozadu a sledovať aktuálne stavy.', '  — Výsledky: prijaté / odmietnuté / slepá ulička / žiadny počiatočný stav.', '  — Pre NKA pri nejednoznačnosti môžete manuálne vybrať ďalší prechod.', '• Ukladanie a zdieľanie:', '  — Sekcia \'Uložiť\': uloženie automatu do slotu, načítanie, vymazanie, premenovanie slotov.', '  — Sloty podporujú import/export súborov .fas.', '• Klávesové skratky:', '  — Alt+1 — režim \'Vytvoriť stavy\'.', '  — Alt+2 — režim \'Vytvoriť prechody\'.', '  — Alt+3 — režim \'Vybrať / presúvať stavy\'.', '  — Alt+S — nastaviť/zrušiť vybraný stav ako počiatočný.', '  — Alt+E — nastaviť/zrušiť vybraný stav ako akceptujúci.', '  — Alt+N — fokus na poli názvu/označenia vybraného objektu.', '  — Alt+Q — vycentrovať plátno na počiatočný stav.', '  — Alt+T — fokus na editor prechodovej funkcie.', '  — Shift+Alt+S — fokus na pole vstupu simulácie.', '  — Shift+Alt+Enter — spustiť/zastaviť simuláciu.', '  — Shift+Alt+N — zobraziť/skryť detaily typu automatu.', '  — Delete (Windows/Linux) a Cmd+Backspace (macOS) — odstrániť vybraný stav/prechod.', '', '2) Zásobníkový automat', '• Obsahuje vizualizáciu zásobníka a úpravu prechodov so vstupom/výstupom zásobníka.', '• Podporuje rovnaké základné režimy práce na plátne: vytváranie stavov, prechodov, výber/presun a úpravy.', '• Podporuje úpravu prechodovej funkcie pre zásobníkový automat.', '• Simulácie sú tiež dostupné v dvoch variantoch: bežná a kroková (dopredu/dozadu).', '• Podporuje rovnaké operácie uloženia/načítania a import/export .fas.', '• Klávesové skratky fungujú rovnako, vrátane macOS (Cmd+Backspace na mazanie).', '', '3) Ak problém zostane aj po Ctrl+F5', '• Napíšte mi cez formulár spätnej väzby vpravo dole.']));
					case 29:
						var _v237 = _v0.a;
						var _v238 = _v0.b;
						return 'O projekte';
					case 30:
						var _v245 = _v0.a;
						var _v246 = _v0.b;
						return 'Bakalárska práca pre predmet TZIV (teoreticke zaklady informacnych vied) na fakulte FIIT STU. Projekt vytvára Kostiantyn Zaitsev, ukrajinský študent; ide o vizuálny editor a simulátor konečných automatov v Elme na učenie, experimenty a demonštráciu DKA/NKA. V pláne je pridať aj iné typy automatov (napríklad so zásobníkovou pamäťou a iné), ale len v prípade, že bude o ne záujem.';
					case 31:
						var _v253 = _v0.a;
						var _v254 = _v0.b;
						return 'Editor';
					case 32:
						var _v261 = _v0.a;
						var _v262 = _v0.b;
						return 'Typ';
					case 33:
						var _v269 = _v0.a;
						var _v270 = _v0.b;
						return 'Deterministický automat';
					case 34:
						var _v277 = _v0.a;
						var _v278 = _v0.b;
						return 'Nedeterministický automat';
					case 35:
						var _v285 = _v0.a;
						var _v286 = _v0.b;
						return 'Prechodová funkcia';
					case 36:
						var _v293 = _v0.a;
						var _v294 = _v0.b;
						return 'Zmeny';
					case 37:
						var _v301 = _v0.a;
						var _v302 = _v0.b;
						return 'Riadok';
					case 38:
						var _v309 = _v0.a;
						var _v310 = _v0.b;
						return 'Očakávaný formát: (z_stavu, podmienka) => do_stavu';
					case 39:
						var _v317 = _v0.a;
						var _v318 = _v0.b;
						return 'Názov cieľového stavu musí byť jedno slovo bez medzier';
					case 40:
						var _v325 = _v0.a;
						var _v326 = _v0.b;
						return 'Názov zdrojového stavu musí byť jedno slovo bez medzier';
					case 41:
						var _v333 = _v0.a;
						var _v334 = _v0.b;
						return 'Podmienka musí byť jedna hodnota';
					case 42:
						var _v341 = _v0.a;
						var _v342 = _v0.b;
						return 'Očakávajú sa presne dve položky: stav a podmienka';
					case 43:
						var _v349 = _v0.a;
						var _v350 = _v0.b;
						return 'Očakáva sa šípka => a jeden záznam na riadok';
					case 44:
						var _v357 = _v0.a;
						var _v358 = _v0.b;
						return 'Ľavá strana musí mať 3 položky: (z_stavu, vstupný_symbol, vstup_zásobníka)';
					case 45:
						var _v365 = _v0.a;
						var _v366 = _v0.b;
						return 'Pravá strana musí mať 2 položky: (do_stavu, výstup_zásobníka)';
					case 46:
						var _v373 = _v0.a;
						var _v374 = _v0.b;
						return 'Vstup zásobníka musí byť jeden symbol alebo λ';
					case 47:
						var _v381 = _v0.a;
						var _v382 = _v0.b;
						return 'Ak je vstup zásobníka Z, výstup zásobníka musí končiť na Z';
					case 48:
						var _v389 = _v0.a;
						var _v390 = _v0.b;
						return 'Import';
					case 49:
						var _v397 = _v0.a;
						var _v398 = _v0.b;
						return 'Export';
					case 50:
						var _v405 = _v0.a;
						var _v406 = _v0.b;
						return 'Uloženie';
					case 51:
						var _v413 = _v0.a;
						var _v414 = _v0.b;
						return 'Ukladacie sloty';
					case 52:
						var _v421 = _v0.a;
						var _v422 = _v0.b;
						return 'Uložiť aktuálny';
					case 53:
						var _v429 = _v0.a;
						var _v430 = _v0.b;
						return 'Načítať zo slotu';
					case 54:
						var _v437 = _v0.a;
						var _v438 = _v0.b;
						return 'Vymazať zo slotu';
					case 55:
						var _v445 = _v0.a;
						var _v446 = _v0.b;
						return 'Import .fas';
					case 56:
						var _v453 = _v0.a;
						var _v454 = _v0.b;
						return 'Export .fas';
					case 57:
						var _v461 = _v0.a;
						var _v462 = _v0.b;
						return 'Chyba pri importe';
					case 58:
						var _v469 = _v0.a;
						var _v470 = _v0.b;
						return 'Tento typ automatu sa nedá načítať v aktuálnom editore';
					case 59:
						var _v477 = _v0.a;
						var _v478 = _v0.b;
						return 'Premenovať';
					case 60:
						var _v485 = _v0.a;
						var _v486 = _v0.b;
						return 'Potvrdiť';
					case 61:
						var _v493 = _v0.a;
						var _v494 = _v0.b;
						return 'Uložené';
					case 62:
						var _v501 = _v0.a;
						var _v502 = _v0.b;
						return 'Slot';
					case 63:
						var _v509 = _v0.a;
						var _v510 = _v0.b;
						return 'prázdne';
					case 64:
						var _v517 = _v0.a;
						var _v518 = _v0.b;
						return 'Zavrieť';
					case 65:
						var _v525 = _v0.a;
						var _v526 = _v0.b;
						return 'Názov';
					case 66:
						var _v533 = _v0.a;
						var _v534 = _v0.b;
						return 'Chyba: názvy stavov musia byť jedinečné';
					case 67:
						var _v541 = _v0.a;
						var _v542 = _v0.b;
						return 'Režim';
					case 68:
						var _v549 = _v0.a;
						var _v550 = _v0.b;
						return 'Vytvoriť stavy';
					case 69:
						var _v557 = _v0.a;
						var _v558 = _v0.b;
						return 'Vytvoriť prechody';
					case 70:
						var _v565 = _v0.a;
						var _v566 = _v0.b;
						return 'Vybrať';
					case 71:
						var _v573 = _v0.a;
						var _v574 = _v0.b;
						return 'Nastaviť prechody';
					case 72:
						var _v581 = _v0.a;
						var _v582 = _v0.b;
						return 'Prechody';
					case 73:
						var _v589 = _v0.a;
						var _v590 = _v0.b;
						return 'Označenie';
					case 74:
						var _v597 = _v0.a;
						var _v598 = _v0.b;
						return 'Vstup zásobníka';
					case 75:
						var _v605 = _v0.a;
						var _v606 = _v0.b;
						return 'Výstup zásobníka';
					case 76:
						var _v613 = _v0.a;
						var _v614 = _v0.b;
						return 'Vyberte stav ako počiatočný uzol';
					case 77:
						var _v621 = _v0.a;
						var _v622 = _v0.b;
						return 'Vyberte prechod na úpravu';
					case 78:
						var _v629 = _v0.a;
						var _v630 = _v0.b;
						return 'Zo stavu';
					case 79:
						var _v637 = _v0.a;
						var _v638 = _v0.b;
						return 'Vybrané';
					case 80:
						var _v645 = _v0.a;
						var _v646 = _v0.b;
						return 'Nič';
					case 81:
						var _v653 = _v0.a;
						var _v654 = _v0.b;
						return 'Nenájdené';
					case 82:
						var _v661 = _v0.a;
						var _v662 = _v0.b;
						return 'Stav';
					case 83:
						var _v669 = _v0.a;
						var _v670 = _v0.b;
						return 'Pozícia';
					case 84:
						var _v677 = _v0.a;
						var _v678 = _v0.b;
						return 'Akceptujúci';
					case 85:
						var _v685 = _v0.a;
						var _v686 = _v0.b;
						return 'Počiatočný';
					case 86:
						var _v693 = _v0.a;
						var _v694 = _v0.b;
						return 'Áno';
					case 87:
						var _v701 = _v0.a;
						var _v702 = _v0.b;
						return 'Nie';
					case 88:
						var _v709 = _v0.a;
						var _v710 = _v0.b;
						return 'Zmazať stav';
					case 89:
						var _v717 = _v0.a;
						var _v718 = _v0.b;
						return 'Prechod';
					case 90:
						var _v725 = _v0.a;
						var _v726 = _v0.b;
						return 'Zmazať prechod';
					case 91:
						var _v733 = _v0.a;
						var _v734 = _v0.b;
						return 'Zrušiť počiatočný';
					case 92:
						var _v741 = _v0.a;
						var _v742 = _v0.b;
						return 'Nastaviť počiatočný';
					case 93:
						var _v749 = _v0.a;
						var _v750 = _v0.b;
						return 'Zrušiť akceptujúci';
					case 94:
						var _v757 = _v0.a;
						var _v758 = _v0.b;
						return 'Nastaviť akceptujúci';
					case 95:
						var _v765 = _v0.a;
						var _v766 = _v0.b;
						return 'Simulácia';
					case 96:
						var _v773 = _v0.a;
						var _v774 = _v0.b;
						return 'Vstupný reťazec';
					case 97:
						var _v781 = _v0.a;
						var _v782 = _v0.b;
						return 'Oneskorenie';
					case 98:
						var _v789 = _v0.a;
						var _v790 = _v0.b;
						return 'Na začiatok';
					case 99:
						var _v797 = _v0.a;
						var _v798 = _v0.b;
						return 'Spustiť simuláciu';
					case 100:
						var _v805 = _v0.a;
						var _v806 = _v0.b;
						return 'Spustiť krokovú simuláciu';
					case 101:
						var _v813 = _v0.a;
						var _v814 = _v0.b;
						return 'Stop';
					case 102:
						var _v821 = _v0.a;
						var _v822 = _v0.b;
						return 'Krok vpred';
					case 103:
						var _v829 = _v0.a;
						var _v830 = _v0.b;
						return 'Krok späť';
					case 104:
						var _v837 = _v0.a;
						var _v838 = _v0.b;
						return 'Stop';
					case 105:
						var _v845 = _v0.a;
						var _v846 = _v0.b;
						return 'Simulácia beží...';
					case 106:
						var _v853 = _v0.a;
						var _v854 = _v0.b;
						return 'Úspech';
					case 107:
						var _v861 = _v0.a;
						var _v862 = _v0.b;
						return 'Reťazec nezodpovedá automatu';
					case 108:
						var _v869 = _v0.a;
						var _v870 = _v0.b;
						return 'Chyba: žiadny vhodný prechod pre vstup';
					case 109:
						var _v877 = _v0.a;
						var _v878 = _v0.b;
						return 'Chyba: nie je zvolený počiatočný stav';
					case 110:
						var _v885 = _v0.a;
						var _v886 = _v0.b;
						return 'V prechodovej funkcii je chyba. Opravte ju, aby sa simulácia spustila';
					case 111:
						var _v893 = _v0.a;
						var _v894 = _v0.b;
						return 'K dispozícii je viac prechodov';
					case 112:
						var _v901 = _v0.a;
						var _v902 = _v0.b;
						return 'Vyberte, ktorý prechod sa má použiť zo stavu';
					case 113:
						var _v909 = _v0.a;
						var _v910 = _v0.b;
						return 'Zobraziť/skryť dôvody nedeterminizmu';
					case 114:
						var _v917 = _v0.a;
						var _v918 = _v0.b;
						return 'Dôvody nedeterminizmu';
					case 115:
						var _v925 = _v0.a;
						var _v926 = _v0.b;
						return 'Zo stavu {state} existuje viac prechodov pre symbol ‘{label}’';
					case 116:
						var _v933 = _v0.a;
						var _v934 = _v0.b;
						return 'Existuje λ-prechod z {from} do {to}';
					case 117:
						var _v941 = _v0.a;
						var _v942 = _v0.b;
						return '←';
					case 118:
						var _v949 = _v0.a;
						var _v950 = _v0.b;
						return 'Domov';
					case 119:
						var _v957 = _v0.a;
						var _v958 = _v0.b;
						return '← Domov';
					case 120:
						var _v965 = _v0.a;
						var _v966 = _v0.b;
						return 'Otvoriť formulár spätnej väzby';
					case 121:
						var _v973 = _v0.a;
						var _v974 = _v0.b;
						return 'Spätná väzba';
					case 122:
						var _v981 = _v0.a;
						var _v982 = _v0.b;
						return 'Popíšte, čo sa dá zlepšiť, a odošlite formulár. Správa sa odošle cez Formspree.';
					case 123:
						var _v989 = _v0.a;
						var _v990 = _v0.b;
						return 'Napíšte vašu správu...';
					case 124:
						var _v997 = _v0.a;
						var _v998 = _v0.b;
						return 'Odoslať';
					case 125:
						var _v1005 = _v0.a;
						var _v1006 = _v0.b;
						return 'Váš email (voliteľné)';
					case 126:
						var _v1013 = _v0.a;
						var _v1014 = _v0.b;
						return 'Váš email';
					case 127:
						var _v1021 = _v0.a;
						var _v1022 = _v0.b;
						return 'Vaša správa';
					case 128:
						var _v1029 = _v0.a;
						var _v1030 = _v0.b;
						return 'Odporúčaný spôsob';
					case 129:
						var _v1037 = _v0.a;
						var _v1038 = _v0.b;
						return 'E-mail:';
					case 130:
						var _v1045 = _v0.a;
						var _v1046 = _v0.b;
						return 'Google form:';
					case 131:
						var _v1053 = _v0.a;
						var _v1054 = _v0.b;
						return 'Správy sa odosielajú cez Formspree a môžu byť obmedzené počtom';
					case 132:
						var _v1061 = _v0.a;
						var _v1062 = _v0.b;
						return 'Poštová služba:';
					case 133:
						var _v1069 = _v0.a;
						var _v1070 = _v0.b;
						return 'Gmail';
					case 134:
						var _v1077 = _v0.a;
						var _v1078 = _v0.b;
						return 'Outlook';
					case 135:
						var _v1085 = _v0.a;
						var _v1086 = _v0.b;
						return 'Neupravovať';
					case 136:
						var _v1093 = _v0.a;
						var _v1094 = _v0.b;
						return 'Opíšte svoj problém/návrh čo najpodrobnejšie';
					case 137:
						var _v1101 = _v0.a;
						var _v1102 = _v0.b;
						return 'Čo je nové — verzia';
					case 138:
						var _v1109 = _v0.a;
						var _v1110 = _v0.b;
						return 'Pre túto verziu zatiaľ nie sú dostupné záznamy changelogu.';
					case 139:
						var _v1117 = _v0.a;
						var _v1118 = _v0.b;
						return 'Je dostupná nová verzia. Obnovte stránku: Ctrl+F5 (na macOS: Cmd+Shift+R).';
					default:
						var _v1125 = _v0.a;
						var _v1126 = _v0.b;
						return 'Rozumiem';
				}
			default:
				switch (_v0.b) {
					case 0:
						var _v7 = _v0.a;
						var _v8 = _v0.b;
						return 'Симулятор автоматів (Elm)';
					case 1:
						var _v15 = _v0.a;
						var _v16 = _v0.b;
						return 'Автомат';
					case 2:
						var _v23 = _v0.a;
						var _v24 = _v0.b;
						return 'Кінцевий автомат';
					case 3:
						var _v31 = _v0.a;
						var _v32 = _v0.b;
						return 'Стековий автомат';
					case 4:
						var _v39 = _v0.a;
						var _v40 = _v0.b;
						return 'Машина Тюрінга';
					case 5:
						var _v47 = _v0.a;
						var _v48 = _v0.b;
						return 'Інструкції';
					case 6:
						var _v55 = _v0.a;
						var _v56 = _v0.b;
						return 'Про сайт';
					case 7:
						var _v63 = _v0.a;
						var _v64 = _v0.b;
						return 'Оберіть розділ нижче';
					case 8:
						var _v71 = _v0.a;
						var _v72 = _v0.b;
						return 'Оберіть тип автомата';
					case 9:
						var _v79 = _v0.a;
						var _v80 = _v0.b;
						return 'Стек';
					case 10:
						var _v87 = _v0.a;
						var _v88 = _v0.b;
						return 'Світла';
					case 11:
						var _v95 = _v0.a;
						var _v96 = _v0.b;
						return 'Темна';
					case 12:
						var _v103 = _v0.a;
						var _v104 = _v0.b;
						return 'Тема';
					case 13:
						var _v111 = _v0.a;
						var _v112 = _v0.b;
						return 'Мова';
					case 14:
						var _v119 = _v0.a;
						var _v120 = _v0.b;
						return 'Налаштування';
					case 15:
						var _v127 = _v0.a;
						var _v128 = _v0.b;
						return 'Налаштування';
					case 16:
						var _v135 = _v0.a;
						var _v136 = _v0.b;
						return 'Ласкаво просимо!';
					case 17:
						var _v143 = _v0.a;
						var _v144 = _v0.b;
						return 'Це симулятор кінцевого та стекового автоматів: ви можете будувати граф, редагувати переходи, запускати симуляцію та зберігати слоти.';
					case 18:
						var _v151 = _v0.a;
						var _v152 = _v0.b;
						return 'Сайт побудовано як SPA на Elm: інтерфейс, логіка й стан працюють у браузері, а дані зберігаються в localStorage.';
					case 19:
						var _v159 = _v0.a;
						var _v160 = _v0.b;
						return 'Продовжити';
					case 20:
						var _v167 = _v0.a;
						var _v168 = _v0.b;
						return 'Стартова сторінка';
					case 21:
						var _v175 = _v0.a;
						var _v176 = _v0.b;
						return 'Показувати Welcome вікно';
					case 22:
						var _v183 = _v0.a;
						var _v184 = _v0.b;
						return 'Home';
					case 23:
						var _v191 = _v0.a;
						var _v192 = _v0.b;
						return 'Кінцевий автомат';
					case 24:
						var _v199 = _v0.a;
						var _v200 = _v0.b;
						return 'Стековий автомат';
					case 25:
						var _v207 = _v0.a;
						var _v208 = _v0.b;
						return 'Машина Тюрінга';
					case 26:
						var _v215 = _v0.a;
						var _v216 = _v0.b;
						return '← На головну';
					case 27:
						var _v223 = _v0.a;
						var _v224 = _v0.b;
						return 'Інструкції з використання';
					case 28:
						var _v231 = _v0.a;
						var _v232 = _v0.b;
						return A2(
							$elm$core$String$join,
							'\n',
							_List_fromArray(
								['⚠️ Якщо щось працює некоректно, спочатку примусово оновіть сторінку через Ctrl+F5.', '', '1) Кінцевий автомат', '• Режим \'Створити стани\': клік по порожньому місцю створює стан.', '• Режим \'Створити переходи\': виберіть стан-джерело, потім стан-призначення.', '• Режим \'Вибрати\': перетягуйте стани, вибирайте стан або перехід для редагування.', '• Подвійний клік по стану перемикає, чи є він приймаючим.', '• Для вибраного стану доступні: змінити назву, зробити/зняти як стартовий, зробити/зняти як приймаючий, видалити.', '• Для вибраного переходу доступні: змінити мітку і видалити перехід.', '• Додаток показує, чи є автомат детермінованим або недетермінованим.', '• Можна відкрити деталі і побачити причини недетермінованості (наприклад, дублікати умов або λ-переходи).', '• Функція переходів (код ліворуч):', '  — Імпорт: застосовує текст функції переходів до поточного автомату.', '  — Експорт: формує текст функції переходів з поточного автомату.', '  — Підсвітка помилок допомагає виправити формат записів.', '  — Формат: (стан, символ) => стан_призначення.', '  — Приклади: (q0, a) => q1, (q1, b) => q2, (q2, λ) => q3.', '• Симуляції: звичайний запуск і покроковий режим.', '  — Звичайний режим: Старт запускає симуляцію, Стоп зупиняє її.', '  — Покроковий режим: можна рухатись по кроках вперед/назад і переглядати поточні стани.', '  — Результати: прийнято / відхилено / тупик / немає стартового стану.', '  — Для НКА при неоднозначності можна вибрати наступний перехід вручну.', '• Збереження та обмін:', '  — Розділ \'Збереження\': збереження автомату в слот, завантаження, видалення, перейменування слотів.', '  — Для слотів підтримується імпорт/експорт файлів .fas.', '• Гарячі клавіші:', '  — Alt+1 — режим \'Створити стани\'.', '  — Alt+2 — режим \'Створити переходи\'.', '  — Alt+3 — режим \'Вибрати / переміщувати стани\'.', '  — Alt+S — зробити/зняти вибраний стан як стартовий.', '  — Alt+E — зробити/зняти вибраний стан як приймаючий.', '  — Alt+N — фокус на полі назви/мітки вибраного об\'єкта.', '  — Alt+Q — центрувати полотно на стартовому стані.', '  — Alt+T — фокус на редакторі функції переходів.', '  — Shift+Alt+S — фокус на полі вхідного рядка симуляції.', '  — Shift+Alt+Enter — старт/стоп симуляції.', '  — Shift+Alt+N — показати/приховати деталі типу автомату.', '  — Delete (Windows/Linux) і Cmd+Backspace (macOS) — видалити вибраний стан/перехід.', '', '2) Стековий (засобниковий) автомат', '• Є візуалізація стеку та редагування переходів зі стековим входом/виходом.', '• Підтримує ті самі базові режими роботи на полотні: створення станів, переходів, вибір/переміщення та редагування.', '• Підтримує редагування функції переходів для стекового автомата.', '• Симуляції також доступні у двох варіантах: звичайна і покрокова (вперед/назад).', '• Підтримує ті самі операції збереження/завантаження та імпорт/експорт .fas.', '• Гарячі клавіші працюють так само, включно з macOS (Cmd+Backspace для видалення).', '', '3) Якщо проблема не зникла після Ctrl+F5', '• Напишіть мені через форму зворотного зв\'язку праворуч унизу.']));
					case 29:
						var _v239 = _v0.a;
						var _v240 = _v0.b;
						return 'Про проект';
					case 30:
						var _v247 = _v0.a;
						var _v248 = _v0.b;
						return 'Бакалаврська робота для предмета TZIV (teoreticke zaklady informacnych vied) на факультеті FIIT STU. Проєкт розробляє Костянтин Зайцев, українець; це візуальний редактор і симулятор кінцевих автоматів на Elm для навчання, експериментів і демонстрації роботи ДКА/НКА. План — додати більше типів автоматів (як-от зі стековою пам\'яттю та інші), але тільки якщо сайт виявиться популярним.';
					case 31:
						var _v255 = _v0.a;
						var _v256 = _v0.b;
						return 'Редактор';
					case 32:
						var _v263 = _v0.a;
						var _v264 = _v0.b;
						return 'Тип';
					case 33:
						var _v271 = _v0.a;
						var _v272 = _v0.b;
						return 'Детермінований автомат';
					case 34:
						var _v279 = _v0.a;
						var _v280 = _v0.b;
						return 'Недетермінований автомат';
					case 35:
						var _v287 = _v0.a;
						var _v288 = _v0.b;
						return 'Функція переходів';
					case 36:
						var _v295 = _v0.a;
						var _v296 = _v0.b;
						return 'Зміни';
					case 37:
						var _v303 = _v0.a;
						var _v304 = _v0.b;
						return 'Рядок';
					case 38:
						var _v311 = _v0.a;
						var _v312 = _v0.b;
						return 'Очікуваний формат: (стан_звідки, умова) => стан_куди';
					case 39:
						var _v319 = _v0.a;
						var _v320 = _v0.b;
						return 'Назва цільового стану має бути одним словом без пробілів';
					case 40:
						var _v327 = _v0.a;
						var _v328 = _v0.b;
						return 'Назва початкового стану має бути одним словом без пробілів';
					case 41:
						var _v335 = _v0.a;
						var _v336 = _v0.b;
						return 'Умова має бути одним значенням';
					case 42:
						var _v343 = _v0.a;
						var _v344 = _v0.b;
						return 'Очікується рівно два елементи: стан і умова';
					case 43:
						var _v351 = _v0.a;
						var _v352 = _v0.b;
						return 'Очікується стрілка => і один запис на рядок';
					case 44:
						var _v359 = _v0.a;
						var _v360 = _v0.b;
						return 'Ліва частина має містити 3 елементи: (стан_звідки, вхідний_символ, вхід_стека)';
					case 45:
						var _v367 = _v0.a;
						var _v368 = _v0.b;
						return 'Права частина має містити 2 елементи: (стан_куди, вихід_стека)';
					case 46:
						var _v375 = _v0.a;
						var _v376 = _v0.b;
						return 'Вхід стека має бути одним символом або λ';
					case 47:
						var _v383 = _v0.a;
						var _v384 = _v0.b;
						return 'Якщо вхід стека = Z, то вихід стека має закінчуватися на Z';
					case 48:
						var _v391 = _v0.a;
						var _v392 = _v0.b;
						return 'Імпорт';
					case 49:
						var _v399 = _v0.a;
						var _v400 = _v0.b;
						return 'Експорт';
					case 50:
						var _v407 = _v0.a;
						var _v408 = _v0.b;
						return 'Зберегти';
					case 51:
						var _v415 = _v0.a;
						var _v416 = _v0.b;
						return 'Слоти збереження';
					case 52:
						var _v423 = _v0.a;
						var _v424 = _v0.b;
						return 'Зберегти поточний';
					case 53:
						var _v431 = _v0.a;
						var _v432 = _v0.b;
						return 'Завантажити зі слота';
					case 54:
						var _v439 = _v0.a;
						var _v440 = _v0.b;
						return 'Видалити зі слота';
					case 55:
						var _v447 = _v0.a;
						var _v448 = _v0.b;
						return 'Імпорт .fas';
					case 56:
						var _v455 = _v0.a;
						var _v456 = _v0.b;
						return 'Експорт .fas';
					case 57:
						var _v463 = _v0.a;
						var _v464 = _v0.b;
						return 'Помилка імпорту';
					case 58:
						var _v471 = _v0.a;
						var _v472 = _v0.b;
						return 'Цей тип автомату не можна завантажити в поточному редакторі';
					case 59:
						var _v479 = _v0.a;
						var _v480 = _v0.b;
						return 'Перейменувати';
					case 60:
						var _v487 = _v0.a;
						var _v488 = _v0.b;
						return 'Підтвердити';
					case 61:
						var _v495 = _v0.a;
						var _v496 = _v0.b;
						return 'Збережено';
					case 62:
						var _v503 = _v0.a;
						var _v504 = _v0.b;
						return 'Комірка';
					case 63:
						var _v511 = _v0.a;
						var _v512 = _v0.b;
						return 'порожньо';
					case 64:
						var _v519 = _v0.a;
						var _v520 = _v0.b;
						return 'Закрити';
					case 65:
						var _v527 = _v0.a;
						var _v528 = _v0.b;
						return 'Назва';
					case 66:
						var _v535 = _v0.a;
						var _v536 = _v0.b;
						return 'Помилка: назви станів мають бути унікальними';
					case 67:
						var _v543 = _v0.a;
						var _v544 = _v0.b;
						return 'Режим';
					case 68:
						var _v551 = _v0.a;
						var _v552 = _v0.b;
						return 'Створити стани';
					case 69:
						var _v559 = _v0.a;
						var _v560 = _v0.b;
						return 'Створити переходи';
					case 70:
						var _v567 = _v0.a;
						var _v568 = _v0.b;
						return 'Вибрати';
					case 71:
						var _v575 = _v0.a;
						var _v576 = _v0.b;
						return 'Налаштування переходів';
					case 72:
						var _v583 = _v0.a;
						var _v584 = _v0.b;
						return 'Переходи';
					case 73:
						var _v591 = _v0.a;
						var _v592 = _v0.b;
						return 'Мітка';
					case 74:
						var _v599 = _v0.a;
						var _v600 = _v0.b;
						return 'Вхід стека';
					case 75:
						var _v607 = _v0.a;
						var _v608 = _v0.b;
						return 'Вихід стека';
					case 76:
						var _v615 = _v0.a;
						var _v616 = _v0.b;
						return 'Оберіть стан як початковий вузол';
					case 77:
						var _v623 = _v0.a;
						var _v624 = _v0.b;
						return 'Оберіть перехід для редагування';
					case 78:
						var _v631 = _v0.a;
						var _v632 = _v0.b;
						return 'Зі стану';
					case 79:
						var _v639 = _v0.a;
						var _v640 = _v0.b;
						return 'Вибрано';
					case 80:
						var _v647 = _v0.a;
						var _v648 = _v0.b;
						return 'Нічого';
					case 81:
						var _v655 = _v0.a;
						var _v656 = _v0.b;
						return 'Не знайдено';
					case 82:
						var _v663 = _v0.a;
						var _v664 = _v0.b;
						return 'Стан';
					case 83:
						var _v671 = _v0.a;
						var _v672 = _v0.b;
						return 'Позиція';
					case 84:
						var _v679 = _v0.a;
						var _v680 = _v0.b;
						return 'Приймаючий';
					case 85:
						var _v687 = _v0.a;
						var _v688 = _v0.b;
						return 'Початковий';
					case 86:
						var _v695 = _v0.a;
						var _v696 = _v0.b;
						return 'Так';
					case 87:
						var _v703 = _v0.a;
						var _v704 = _v0.b;
						return 'Ні';
					case 88:
						var _v711 = _v0.a;
						var _v712 = _v0.b;
						return 'Видалити стан';
					case 89:
						var _v719 = _v0.a;
						var _v720 = _v0.b;
						return 'Перехід';
					case 90:
						var _v727 = _v0.a;
						var _v728 = _v0.b;
						return 'Видалити перехід';
					case 91:
						var _v735 = _v0.a;
						var _v736 = _v0.b;
						return 'Зняти початковий';
					case 92:
						var _v743 = _v0.a;
						var _v744 = _v0.b;
						return 'Зробити початковим';
					case 93:
						var _v751 = _v0.a;
						var _v752 = _v0.b;
						return 'Зняти кінцевий';
					case 94:
						var _v759 = _v0.a;
						var _v760 = _v0.b;
						return 'Зробити кінцевим';
					case 95:
						var _v767 = _v0.a;
						var _v768 = _v0.b;
						return 'Симуляція';
					case 96:
						var _v775 = _v0.a;
						var _v776 = _v0.b;
						return 'Вхідний рядок';
					case 97:
						var _v783 = _v0.a;
						var _v784 = _v0.b;
						return 'Затримка';
					case 98:
						var _v791 = _v0.a;
						var _v792 = _v0.b;
						return 'До початку';
					case 99:
						var _v799 = _v0.a;
						var _v800 = _v0.b;
						return 'Запустити симуляцію';
					case 100:
						var _v807 = _v0.a;
						var _v808 = _v0.b;
						return 'Почати покрокову симуляцію';
					case 101:
						var _v815 = _v0.a;
						var _v816 = _v0.b;
						return 'Стоп';
					case 102:
						var _v823 = _v0.a;
						var _v824 = _v0.b;
						return 'Крок вперед';
					case 103:
						var _v831 = _v0.a;
						var _v832 = _v0.b;
						return 'Крок назад';
					case 104:
						var _v839 = _v0.a;
						var _v840 = _v0.b;
						return 'Stop';
					case 105:
						var _v847 = _v0.a;
						var _v848 = _v0.b;
						return 'Симуляція виконується...';
					case 106:
						var _v855 = _v0.a;
						var _v856 = _v0.b;
						return 'Успіх';
					case 107:
						var _v863 = _v0.a;
						var _v864 = _v0.b;
						return 'Рядок не відповідає автомату';
					case 108:
						var _v871 = _v0.a;
						var _v872 = _v0.b;
						return 'Помилка: немає відповідного переходу для входу';
					case 109:
						var _v879 = _v0.a;
						var _v880 = _v0.b;
						return 'Помилка: не вибрано початковий стан';
					case 110:
						var _v887 = _v0.a;
						var _v888 = _v0.b;
						return 'У функції переходів є помилка. Виправте її, щоб запустити симуляцію';
					case 111:
						var _v895 = _v0.a;
						var _v896 = _v0.b;
						return 'Доступно кілька переходів';
					case 112:
						var _v903 = _v0.a;
						var _v904 = _v0.b;
						return 'Оберіть, яким переходом іти зі стану';
					case 113:
						var _v911 = _v0.a;
						var _v912 = _v0.b;
						return 'Показати/сховати причини недетермінованості';
					case 114:
						var _v919 = _v0.a;
						var _v920 = _v0.b;
						return 'Причини недетермінованості';
					case 115:
						var _v927 = _v0.a;
						var _v928 = _v0.b;
						return 'Із стану {state} є кілька переходів за символом ‘{label}’';
					case 116:
						var _v935 = _v0.a;
						var _v936 = _v0.b;
						return 'Є λ-перехід із {from} в {to}';
					case 117:
						var _v943 = _v0.a;
						var _v944 = _v0.b;
						return '←';
					case 118:
						var _v951 = _v0.a;
						var _v952 = _v0.b;
						return 'На головну';
					case 119:
						var _v959 = _v0.a;
						var _v960 = _v0.b;
						return '← На головну';
					case 120:
						var _v967 = _v0.a;
						var _v968 = _v0.b;
						return 'Відкрити форму зворотного зв’язку';
					case 121:
						var _v975 = _v0.a;
						var _v976 = _v0.b;
						return 'Зворотний зв’язок';
					case 122:
						var _v983 = _v0.a;
						var _v984 = _v0.b;
						return 'Опишіть, що можна покращити, і надішліть форму. Повідомлення буде відправлено через Formspree.';
					case 123:
						var _v991 = _v0.a;
						var _v992 = _v0.b;
						return 'Напишіть ваше повідомлення...';
					case 124:
						var _v999 = _v0.a;
						var _v1000 = _v0.b;
						return 'Надіслати';
					case 125:
						var _v1007 = _v0.a;
						var _v1008 = _v0.b;
						return 'Ваш email (необов’язково)';
					case 126:
						var _v1015 = _v0.a;
						var _v1016 = _v0.b;
						return 'Ваш email';
					case 127:
						var _v1023 = _v0.a;
						var _v1024 = _v0.b;
						return 'Ваше повідомлення';
					case 128:
						var _v1031 = _v0.a;
						var _v1032 = _v0.b;
						return 'Рекомендований спосіб';
					case 129:
						var _v1039 = _v0.a;
						var _v1040 = _v0.b;
						return 'Пошта:';
					case 130:
						var _v1047 = _v0.a;
						var _v1048 = _v0.b;
						return 'Google form:';
					case 131:
						var _v1055 = _v0.a;
						var _v1056 = _v0.b;
						return 'Повідомлення надсилаються через Formspree і можуть мати ліміти за кількістю';
					case 132:
						var _v1063 = _v0.a;
						var _v1064 = _v0.b;
						return 'Поштовий сервіс:';
					case 133:
						var _v1071 = _v0.a;
						var _v1072 = _v0.b;
						return 'Gmail';
					case 134:
						var _v1079 = _v0.a;
						var _v1080 = _v0.b;
						return 'Outlook';
					case 135:
						var _v1087 = _v0.a;
						var _v1088 = _v0.b;
						return 'Не змінювати';
					case 136:
						var _v1095 = _v0.a;
						var _v1096 = _v0.b;
						return 'Опишіть якомога детальніше вашу проблему/пропозицію';
					case 137:
						var _v1103 = _v0.a;
						var _v1104 = _v0.b;
						return 'Що нового — версія';
					case 138:
						var _v1111 = _v0.a;
						var _v1112 = _v0.b;
						return 'Для цієї версії поки немає записів changelog.';
					case 139:
						var _v1119 = _v0.a;
						var _v1120 = _v0.b;
						return 'Доступна нова версія. Оновіть сторінку: Ctrl+F5 (на macOS: Cmd+Shift+R).';
					default:
						var _v1127 = _v0.a;
						var _v1128 = _v0.b;
						return 'Зрозуміло';
				}
		}
	});
var $author$project$Main$automatonTypeHomeView = function (model) {
	var tk = $author$project$Design$tokens(model.aV);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2(
				$elm$html$Html$Attributes$style,
				'gap',
				$author$project$Design$px(tk.aw.r))
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin', '0'),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$author$project$Design$px(tk.ax.bY))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						A2($author$project$I18n$t, model.b, 8))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2(
						$elm$html$Html$Attributes$style,
						'gap',
						$author$project$Design$px(tk.aw.r)),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						'min(' + ($author$project$Design$px(tk.bk.b4) + ', 100%)')),
						A2(
						$elm$html$Html$Attributes$style,
						'padding',
						'0 ' + $author$project$Design$px(tk.aw.o))
					]),
				_List_fromArray(
					[
						A3(
						$author$project$Main$menuCard,
						model,
						A2($author$project$I18n$t, model.b, 2),
						2),
						A3(
						$author$project$Main$menuCard,
						model,
						A2($author$project$I18n$t, model.b, 3),
						3),
						A3(
						$author$project$Main$menuCard,
						model,
						A2($author$project$I18n$t, model.b, 4),
						4)
					]))
			]));
};
var $author$project$Theme$bgColor = function (th) {
	if (!th) {
		return '#e0e3e7';
	} else {
		return '#0f1115';
	}
};
var $author$project$I18n$FeedbackButtonAria = 120;
var $author$project$Main$OpenFeedbackModal = {$: 14};
var $elm$html$Html$button = _VirtualDom_node('button');
var $author$project$Theme$textColor = function (th) {
	if (!th) {
		return '#111111';
	} else {
		return '#e6e6e6';
	}
};
var $author$project$Main$feedbackButton = function (model) {
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Events$onClick($author$project$Main$OpenFeedbackModal),
				A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
				A2($elm$html$Html$Attributes$style, 'right', '24px'),
				A2($elm$html$Html$Attributes$style, 'bottom', '24px'),
				A2($elm$html$Html$Attributes$style, 'width', '60px'),
				A2($elm$html$Html$Attributes$style, 'height', '60px'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '9999px'),
				A2($elm$html$Html$Attributes$style, 'border', 'none'),
				A2($elm$html$Html$Attributes$style, 'font-size', '28px'),
				A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Theme$hoverBg(model.a)),
				A2(
				$elm$html$Html$Attributes$style,
				'color',
				$author$project$Theme$textColor(model.a)),
				A2($elm$html$Html$Attributes$style, 'box-shadow', '0 10px 28px rgba(0, 0, 0, 0.25)'),
				A2($elm$html$Html$Attributes$style, 'z-index', '1100'),
				A2(
				$elm$html$Html$Attributes$attribute,
				'aria-label',
				A2($author$project$I18n$t, model.b, 120))
			]),
		_List_fromArray(
			[
				$elm$html$Html$text('✉')
			]));
};
var $author$project$Main$CloseFeedbackModal = {$: 15};
var $author$project$I18n$EditorClose = 64;
var $author$project$I18n$FeedbackDescribeDetailsLabel = 136;
var $author$project$I18n$FeedbackEmailLabel = 125;
var $author$project$I18n$FeedbackEmailPlaceholder = 126;
var $author$project$I18n$FeedbackFormSectionHint = 131;
var $author$project$I18n$FeedbackMailProviderGmail = 133;
var $author$project$I18n$FeedbackMailProviderLabel = 132;
var $author$project$I18n$FeedbackMailProviderOutlook = 134;
var $author$project$I18n$FeedbackMessageLabel = 127;
var $author$project$I18n$FeedbackModalPlaceholder = 123;
var $author$project$I18n$FeedbackModalTitle = 121;
var $author$project$I18n$FeedbackRecommendedGoogleFormLabel = 130;
var $author$project$I18n$FeedbackRecommendedMailLabel = 129;
var $author$project$I18n$FeedbackRecommendedTitle = 128;
var $author$project$I18n$FeedbackSend = 124;
var $author$project$Main$NoOp = {$: 25};
var $author$project$Main$UpdateFeedbackEmailInput = function (a) {
	return {$: 21, a: a};
};
var $author$project$Main$UpdateFeedbackMailProvider = function (a) {
	return {$: 22, a: a};
};
var $author$project$Main$UpdateFeedbackText = function (a) {
	return {$: 20, a: a};
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$action = function (uri) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'action',
		_VirtualDom_noJavaScriptUri(uri));
};
var $author$project$I18n$FeedbackDoNotModifyLabel = 135;
var $author$project$Pages$Editor$exportAutomatonJson = function (model) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		A2(
			$author$project$AutomatonFormat$encodeAutomatonDocument,
			$author$project$Pages$Editor$currentAutomatonType,
			A2($author$project$Pages$Editor$encodeAutomaton, model.c, model.d)));
};
var $author$project$Pages$EditorStack$exportAutomatonJson = function (model) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		A2(
			$author$project$AutomatonFormat$encodeAutomatonDocument,
			$author$project$Pages$EditorStack$currentAutomatonType,
			A2($author$project$Pages$EditorStack$encodeAutomaton, model.c, model.d)));
};
var $author$project$Pages$EditorTuring$exportAutomatonJson = function (model) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		A2(
			$author$project$AutomatonFormat$encodeAutomatonDocument,
			$author$project$Pages$EditorTuring$currentAutomatonType,
			A2($author$project$Pages$EditorTuring$encodeAutomaton, model.c, model.d)));
};
var $author$project$Main$currentFasJson = function (model) {
	var _v0 = model.B;
	switch (_v0) {
		case 3:
			return $author$project$Pages$EditorStack$exportAutomatonJson(model.m);
		case 4:
			return $author$project$Pages$EditorTuring$exportAutomatonJson(model.n);
		default:
			return $author$project$Pages$Editor$exportAutomatonJson(model.l);
	}
};
var $elm$core$String$fromList = _String_fromList;
var $author$project$Pages$Editor$exportRuntimeSnapshotJson = function (model) {
	var simulationResultValue = function () {
		var _v4 = model.S;
		switch (_v4) {
			case 0:
				return $elm$json$Json$Encode$string('idle');
			case 1:
				return $elm$json$Json$Encode$string('running');
			case 2:
				return $elm$json$Json$Encode$string('success');
			case 3:
				return $elm$json$Json$Encode$string('rejected');
			case 4:
				return $elm$json$Json$Encode$string('dead-end');
			default:
				return $elm$json$Json$Encode$string('missing-start');
		}
	}();
	var simulationChoiceValue = function () {
		var _v3 = model.P;
		if (_v3.$ === 1) {
			return $elm$json$Json$Encode$null;
		} else {
			var choice = _v3.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'stateId',
						$elm$json$Json$Encode$int(choice.bQ)),
						_Utils_Tuple2(
						'inputLabel',
						$elm$json$Json$Encode$string(choice.bK)),
						_Utils_Tuple2(
						'consumesInput',
						$elm$json$Json$Encode$bool(choice.bF)),
						_Utils_Tuple2(
						'optionCount',
						$elm$json$Json$Encode$int(
							$elm$core$List$length(choice.al))),
						_Utils_Tuple2(
						'transitionIds',
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$int, choice.al))
					]));
		}
	}();
	var saveSlotEncoder = function (slot) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$elm$json$Json$Encode$int(slot.a4)),
					_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string(slot.b3)),
					_Utils_Tuple2(
					'automatonJson',
					$elm$json$Json$Encode$string(slot.aZ)),
					_Utils_Tuple2(
					'automatonType',
					$author$project$Pages$Editor$maybeAutomatonTypeValue(slot.cj))
				]));
	};
	var modeToString = function (modeValue) {
		switch (modeValue) {
			case 0:
				return 'add-state';
			case 1:
				return 'add-transition';
			default:
				return 'move-state';
		}
	};
	var maybeInt = function (maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return $elm$json$Json$Encode$int(value);
		} else {
			return $elm$json$Json$Encode$null;
		}
	};
	var globalNoticeValue = function () {
		var _v0 = model.aR;
		if (_v0.$ === 1) {
			return $elm$json$Json$Encode$null;
		} else {
			return $elm$json$Json$Encode$string('present');
		}
	}();
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'automatonType',
					$elm$json$Json$Encode$int(1)),
					_Utils_Tuple2(
					'automaton',
					A2($author$project$Pages$Editor$encodeAutomaton, model.c, model.d)),
					_Utils_Tuple2(
					'nextStateId',
					$elm$json$Json$Encode$int(model.I)),
					_Utils_Tuple2(
					'nextTransitionId',
					$elm$json$Json$Encode$int(model.p)),
					_Utils_Tuple2(
					'panX',
					$elm$json$Json$Encode$float(model.U)),
					_Utils_Tuple2(
					'panY',
					$elm$json$Json$Encode$float(model.V)),
					_Utils_Tuple2(
					'zoom',
					$elm$json$Json$Encode$float(model.D)),
					_Utils_Tuple2(
					'selected',
					maybeInt(model.h)),
					_Utils_Tuple2(
					'selectedTransition',
					maybeInt(model.s)),
					_Utils_Tuple2(
					'selectedTransitionLabelDraft',
					$elm$json$Json$Encode$string(model.Y)),
					_Utils_Tuple2(
					'mode',
					$elm$json$Json$Encode$string(
						modeToString(model.z))),
					_Utils_Tuple2(
					'transitionFrom',
					maybeInt(model.ah)),
					_Utils_Tuple2(
					'transitionLabel',
					$elm$json$Json$Encode$string(model.a9)),
					_Utils_Tuple2(
					'codeDraft',
					$elm$json$Json$Encode$string(model.an)),
					_Utils_Tuple2(
					'codeDraftVersion',
					$elm$json$Json$Encode$int(model.aP)),
					_Utils_Tuple2(
					'codeDraftDirty',
					$elm$json$Json$Encode$bool(model.T)),
					_Utils_Tuple2(
					'codeEditorFocused',
					$elm$json$Json$Encode$bool(model.ab)),
					_Utils_Tuple2(
					'codeValidationErrorCount',
					$elm$json$Json$Encode$int(
						$elm$core$List$length(model.ac))),
					_Utils_Tuple2(
					'simulationInput',
					$elm$json$Json$Encode$string(model.aB)),
					_Utils_Tuple2(
					'simulationDelay',
					$elm$json$Json$Encode$string(model.aA)),
					_Utils_Tuple2(
					'simulationRunning',
					$elm$json$Json$Encode$bool(model.aJ)),
					_Utils_Tuple2(
					'simulationQueue',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromList(model.R))),
					_Utils_Tuple2(
					'simulationCurrent',
					maybeInt(model.J)),
					_Utils_Tuple2('simulationResult', simulationResultValue),
					_Utils_Tuple2('simulationChoice', simulationChoiceValue),
					_Utils_Tuple2(
					'stateNameConflict',
					$elm$json$Json$Encode$bool(model.ak)),
					_Utils_Tuple2(
					'saveModalOpen',
					$elm$json$Json$Encode$bool(model.a6)),
					_Utils_Tuple2(
					'saveSlots',
					A2($elm$json$Json$Encode$list, saveSlotEncoder, model.e)),
					_Utils_Tuple2(
					'renamingSlot',
					maybeInt(model.ag)),
					_Utils_Tuple2(
					'renameDraft',
					$elm$json$Json$Encode$string(model.af)),
					_Utils_Tuple2(
					'recentlySavedSlot',
					maybeInt(model.aI)),
					_Utils_Tuple2(
					'animatingSavedSlot',
					maybeInt(model.aE)),
					_Utils_Tuple2(
					'animatingDeletedSlot',
					maybeInt(model.aN)),
					_Utils_Tuple2(
					'slotImportError',
					$elm$json$Json$Encode$bool(model.K)),
					_Utils_Tuple2(
					'slotTypeMismatchError',
					$elm$json$Json$Encode$bool(model.u)),
					_Utils_Tuple2(
					'viewportWidth',
					$elm$json$Json$Encode$int(model.cd)),
					_Utils_Tuple2(
					'viewportHeight',
					$elm$json$Json$Encode$int(model.cc)),
					_Utils_Tuple2(
					'automatonTypeExpanded',
					$elm$json$Json$Encode$bool(model.a_)),
					_Utils_Tuple2(
					'automatonTypeAnimationActive',
					$elm$json$Json$Encode$bool(model.aG)),
					_Utils_Tuple2(
					'automatonTypeAnimationNonce',
					$elm$json$Json$Encode$int(model.aO)),
					_Utils_Tuple2('globalNotice', globalNoticeValue),
					_Utils_Tuple2(
					'globalNoticeNonce',
					$elm$json$Json$Encode$int(model.aS))
				])));
};
var $author$project$Pages$EditorStack$exportRuntimeSnapshotJson = function (model) {
	var simulationResultValue = function () {
		var _v4 = model.S;
		switch (_v4) {
			case 0:
				return $elm$json$Json$Encode$string('idle');
			case 1:
				return $elm$json$Json$Encode$string('running');
			case 2:
				return $elm$json$Json$Encode$string('success');
			case 3:
				return $elm$json$Json$Encode$string('rejected');
			case 4:
				return $elm$json$Json$Encode$string('dead-end');
			default:
				return $elm$json$Json$Encode$string('missing-start');
		}
	}();
	var simulationChoiceValue = function () {
		var _v3 = model.P;
		if (_v3.$ === 1) {
			return $elm$json$Json$Encode$null;
		} else {
			var choice = _v3.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'stateId',
						$elm$json$Json$Encode$int(choice.bQ)),
						_Utils_Tuple2(
						'inputLabel',
						$elm$json$Json$Encode$string(choice.bK)),
						_Utils_Tuple2(
						'consumesInput',
						$elm$json$Json$Encode$bool(choice.bF)),
						_Utils_Tuple2(
						'optionCount',
						$elm$json$Json$Encode$int(
							$elm$core$List$length(choice.al))),
						_Utils_Tuple2(
						'transitionIds',
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$int, choice.al))
					]));
		}
	}();
	var saveSlotEncoder = function (slot) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$elm$json$Json$Encode$int(slot.a4)),
					_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string(slot.b3)),
					_Utils_Tuple2(
					'automatonJson',
					$elm$json$Json$Encode$string(slot.aZ)),
					_Utils_Tuple2(
					'automatonType',
					$author$project$Pages$EditorStack$maybeAutomatonTypeValue(slot.cj))
				]));
	};
	var modeToString = function (modeValue) {
		switch (modeValue) {
			case 0:
				return 'add-state';
			case 1:
				return 'add-transition';
			default:
				return 'move-state';
		}
	};
	var maybeInt = function (maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return $elm$json$Json$Encode$int(value);
		} else {
			return $elm$json$Json$Encode$null;
		}
	};
	var globalNoticeValue = function () {
		var _v0 = model.aR;
		if (_v0.$ === 1) {
			return $elm$json$Json$Encode$null;
		} else {
			return $elm$json$Json$Encode$string('present');
		}
	}();
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'automatonType',
					$elm$json$Json$Encode$int(2)),
					_Utils_Tuple2(
					'automaton',
					A2($author$project$Pages$EditorStack$encodeAutomaton, model.c, model.d)),
					_Utils_Tuple2(
					'nextStateId',
					$elm$json$Json$Encode$int(model.I)),
					_Utils_Tuple2(
					'nextTransitionId',
					$elm$json$Json$Encode$int(model.p)),
					_Utils_Tuple2(
					'panX',
					$elm$json$Json$Encode$float(model.U)),
					_Utils_Tuple2(
					'panY',
					$elm$json$Json$Encode$float(model.V)),
					_Utils_Tuple2(
					'zoom',
					$elm$json$Json$Encode$float(model.D)),
					_Utils_Tuple2(
					'selected',
					maybeInt(model.h)),
					_Utils_Tuple2(
					'selectedTransition',
					maybeInt(model.s)),
					_Utils_Tuple2(
					'selectedTransitionLabelDraft',
					$elm$json$Json$Encode$string(model.Y)),
					_Utils_Tuple2(
					'mode',
					$elm$json$Json$Encode$string(
						modeToString(model.z))),
					_Utils_Tuple2(
					'transitionFrom',
					maybeInt(model.ah)),
					_Utils_Tuple2(
					'transitionLabel',
					$elm$json$Json$Encode$string(model.a9)),
					_Utils_Tuple2(
					'codeDraft',
					$elm$json$Json$Encode$string(model.an)),
					_Utils_Tuple2(
					'codeDraftVersion',
					$elm$json$Json$Encode$int(model.aP)),
					_Utils_Tuple2(
					'codeDraftDirty',
					$elm$json$Json$Encode$bool(model.T)),
					_Utils_Tuple2(
					'codeEditorFocused',
					$elm$json$Json$Encode$bool(model.ab)),
					_Utils_Tuple2(
					'codeValidationErrorCount',
					$elm$json$Json$Encode$int(
						$elm$core$List$length(model.ac))),
					_Utils_Tuple2(
					'simulationInput',
					$elm$json$Json$Encode$string(model.aB)),
					_Utils_Tuple2(
					'simulationDelay',
					$elm$json$Json$Encode$string(model.aA)),
					_Utils_Tuple2(
					'simulationRunning',
					$elm$json$Json$Encode$bool(model.aJ)),
					_Utils_Tuple2(
					'simulationQueue',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromList(model.R))),
					_Utils_Tuple2(
					'simulationStack',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, model.W)),
					_Utils_Tuple2(
					'simulationCurrent',
					maybeInt(model.J)),
					_Utils_Tuple2('simulationResult', simulationResultValue),
					_Utils_Tuple2('simulationChoice', simulationChoiceValue),
					_Utils_Tuple2(
					'stateNameConflict',
					$elm$json$Json$Encode$bool(model.ak)),
					_Utils_Tuple2(
					'saveModalOpen',
					$elm$json$Json$Encode$bool(model.a6)),
					_Utils_Tuple2(
					'saveSlots',
					A2($elm$json$Json$Encode$list, saveSlotEncoder, model.e)),
					_Utils_Tuple2(
					'renamingSlot',
					maybeInt(model.ag)),
					_Utils_Tuple2(
					'renameDraft',
					$elm$json$Json$Encode$string(model.af)),
					_Utils_Tuple2(
					'recentlySavedSlot',
					maybeInt(model.aI)),
					_Utils_Tuple2(
					'animatingSavedSlot',
					maybeInt(model.aE)),
					_Utils_Tuple2(
					'animatingDeletedSlot',
					maybeInt(model.aN)),
					_Utils_Tuple2(
					'slotImportError',
					$elm$json$Json$Encode$bool(model.K)),
					_Utils_Tuple2(
					'slotTypeMismatchError',
					$elm$json$Json$Encode$bool(model.u)),
					_Utils_Tuple2(
					'viewportWidth',
					$elm$json$Json$Encode$int(model.cd)),
					_Utils_Tuple2(
					'viewportHeight',
					$elm$json$Json$Encode$int(model.cc)),
					_Utils_Tuple2(
					'automatonTypeExpanded',
					$elm$json$Json$Encode$bool(model.a_)),
					_Utils_Tuple2(
					'automatonTypeAnimationActive',
					$elm$json$Json$Encode$bool(model.aG)),
					_Utils_Tuple2(
					'automatonTypeAnimationNonce',
					$elm$json$Json$Encode$int(model.aO)),
					_Utils_Tuple2('globalNotice', globalNoticeValue),
					_Utils_Tuple2(
					'globalNoticeNonce',
					$elm$json$Json$Encode$int(model.aS))
				])));
};
var $author$project$Pages$EditorTuring$exportRuntimeSnapshotJson = function (model) {
	var simulationResultValue = function () {
		var _v4 = model.S;
		switch (_v4) {
			case 0:
				return $elm$json$Json$Encode$string('idle');
			case 1:
				return $elm$json$Json$Encode$string('running');
			case 2:
				return $elm$json$Json$Encode$string('success');
			case 3:
				return $elm$json$Json$Encode$string('rejected');
			case 4:
				return $elm$json$Json$Encode$string('dead-end');
			default:
				return $elm$json$Json$Encode$string('missing-start');
		}
	}();
	var simulationChoiceValue = function () {
		var _v3 = model.P;
		if (_v3.$ === 1) {
			return $elm$json$Json$Encode$null;
		} else {
			var choice = _v3.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'stateId',
						$elm$json$Json$Encode$int(choice.bQ)),
						_Utils_Tuple2(
						'inputLabel',
						$elm$json$Json$Encode$string(choice.bK)),
						_Utils_Tuple2(
						'consumesInput',
						$elm$json$Json$Encode$bool(choice.bF)),
						_Utils_Tuple2(
						'optionCount',
						$elm$json$Json$Encode$int(
							$elm$core$List$length(choice.al))),
						_Utils_Tuple2(
						'transitionIds',
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$int, choice.al))
					]));
		}
	}();
	var saveSlotEncoder = function (slot) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$elm$json$Json$Encode$int(slot.a4)),
					_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string(slot.b3)),
					_Utils_Tuple2(
					'automatonJson',
					$elm$json$Json$Encode$string(slot.aZ)),
					_Utils_Tuple2(
					'automatonType',
					$author$project$Pages$EditorTuring$maybeAutomatonTypeValue(slot.cj))
				]));
	};
	var modeToString = function (modeValue) {
		switch (modeValue) {
			case 0:
				return 'add-state';
			case 1:
				return 'add-transition';
			default:
				return 'move-state';
		}
	};
	var maybeInt = function (maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return $elm$json$Json$Encode$int(value);
		} else {
			return $elm$json$Json$Encode$null;
		}
	};
	var globalNoticeValue = function () {
		var _v0 = model.aR;
		if (_v0.$ === 1) {
			return $elm$json$Json$Encode$null;
		} else {
			return $elm$json$Json$Encode$string('present');
		}
	}();
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'automatonType',
					$elm$json$Json$Encode$int(2)),
					_Utils_Tuple2(
					'automaton',
					A2($author$project$Pages$EditorTuring$encodeAutomaton, model.c, model.d)),
					_Utils_Tuple2(
					'nextStateId',
					$elm$json$Json$Encode$int(model.I)),
					_Utils_Tuple2(
					'nextTransitionId',
					$elm$json$Json$Encode$int(model.p)),
					_Utils_Tuple2(
					'panX',
					$elm$json$Json$Encode$float(model.U)),
					_Utils_Tuple2(
					'panY',
					$elm$json$Json$Encode$float(model.V)),
					_Utils_Tuple2(
					'zoom',
					$elm$json$Json$Encode$float(model.D)),
					_Utils_Tuple2(
					'selected',
					maybeInt(model.h)),
					_Utils_Tuple2(
					'selectedTransition',
					maybeInt(model.s)),
					_Utils_Tuple2(
					'selectedTransitionLabelDraft',
					$elm$json$Json$Encode$string(model.Y)),
					_Utils_Tuple2(
					'mode',
					$elm$json$Json$Encode$string(
						modeToString(model.z))),
					_Utils_Tuple2(
					'transitionFrom',
					maybeInt(model.ah)),
					_Utils_Tuple2(
					'transitionLabel',
					$elm$json$Json$Encode$string(model.a9)),
					_Utils_Tuple2(
					'codeDraft',
					$elm$json$Json$Encode$string(model.an)),
					_Utils_Tuple2(
					'codeDraftVersion',
					$elm$json$Json$Encode$int(model.aP)),
					_Utils_Tuple2(
					'codeDraftDirty',
					$elm$json$Json$Encode$bool(model.T)),
					_Utils_Tuple2(
					'codeEditorFocused',
					$elm$json$Json$Encode$bool(model.ab)),
					_Utils_Tuple2(
					'codeValidationErrorCount',
					$elm$json$Json$Encode$int(
						$elm$core$List$length(model.ac))),
					_Utils_Tuple2(
					'simulationInput',
					$elm$json$Json$Encode$string(model.aB)),
					_Utils_Tuple2(
					'simulationDelay',
					$elm$json$Json$Encode$string(model.aA)),
					_Utils_Tuple2(
					'simulationRunning',
					$elm$json$Json$Encode$bool(model.aJ)),
					_Utils_Tuple2(
					'simulationQueue',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromList(model.R))),
					_Utils_Tuple2(
					'simulationStack',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, model.W)),
					_Utils_Tuple2(
					'simulationCurrent',
					maybeInt(model.J)),
					_Utils_Tuple2('simulationResult', simulationResultValue),
					_Utils_Tuple2('simulationChoice', simulationChoiceValue),
					_Utils_Tuple2(
					'stateNameConflict',
					$elm$json$Json$Encode$bool(model.ak)),
					_Utils_Tuple2(
					'saveModalOpen',
					$elm$json$Json$Encode$bool(model.a6)),
					_Utils_Tuple2(
					'saveSlots',
					A2($elm$json$Json$Encode$list, saveSlotEncoder, model.e)),
					_Utils_Tuple2(
					'renamingSlot',
					maybeInt(model.ag)),
					_Utils_Tuple2(
					'renameDraft',
					$elm$json$Json$Encode$string(model.af)),
					_Utils_Tuple2(
					'recentlySavedSlot',
					maybeInt(model.aI)),
					_Utils_Tuple2(
					'animatingSavedSlot',
					maybeInt(model.aE)),
					_Utils_Tuple2(
					'animatingDeletedSlot',
					maybeInt(model.aN)),
					_Utils_Tuple2(
					'slotImportError',
					$elm$json$Json$Encode$bool(model.K)),
					_Utils_Tuple2(
					'slotTypeMismatchError',
					$elm$json$Json$Encode$bool(model.u)),
					_Utils_Tuple2(
					'viewportWidth',
					$elm$json$Json$Encode$int(model.cd)),
					_Utils_Tuple2(
					'viewportHeight',
					$elm$json$Json$Encode$int(model.cc)),
					_Utils_Tuple2(
					'automatonTypeExpanded',
					$elm$json$Json$Encode$bool(model.a_)),
					_Utils_Tuple2(
					'automatonTypeAnimationActive',
					$elm$json$Json$Encode$bool(model.aG)),
					_Utils_Tuple2(
					'automatonTypeAnimationNonce',
					$elm$json$Json$Encode$int(model.aO)),
					_Utils_Tuple2('globalNotice', globalNoticeValue),
					_Utils_Tuple2(
					'globalNoticeNonce',
					$elm$json$Json$Encode$int(model.aS))
				])));
};
var $author$project$Main$currentRuntimeModelJson = function (model) {
	var _v0 = model.B;
	switch (_v0) {
		case 3:
			return $author$project$Pages$EditorStack$exportRuntimeSnapshotJson(model.m);
		case 4:
			return $author$project$Pages$EditorTuring$exportRuntimeSnapshotJson(model.n);
		default:
			return $author$project$Pages$Editor$exportRuntimeSnapshotJson(model.l);
	}
};
var $author$project$Main$indentBlock = function (raw) {
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			function (line) {
				return '    ' + line;
			},
			A2($elm$core$String$split, '\n', raw)));
};
var $author$project$Main$doNotModifyBlock = function (model) {
	return A2(
		$elm$core$String$join,
		'\n',
		_List_fromArray(
			[
				'========================================',
				A2($author$project$I18n$t, model.b, 135),
				'========================================',
				'',
				'fas:',
				$author$project$Main$indentBlock(
				$author$project$Main$currentFasJson(model)),
				'',
				'model:',
				$author$project$Main$indentBlock(
				$author$project$Main$currentRuntimeModelJson(model))
			]));
};
var $author$project$Main$composeFeedbackMessage = function (model) {
	var userMessage = $elm$core$String$trim(model.a2);
	var detailsBlock = $elm$core$String$isEmpty(userMessage) ? (A2($author$project$I18n$t, model.b, 136) + ':\n-') : (A2($author$project$I18n$t, model.b, 136) + (':\n' + userMessage));
	return detailsBlock + ('\n\n\n\n' + $author$project$Main$doNotModifyBlock(model));
};
var $author$project$Main$defaultSenderEmail = 'finiteautomatonsimulator@gmail.com';
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $author$project$Main$feedbackWebMailLink = function (model) {
	var to = $elm$url$Url$percentEncode($author$project$Main$defaultSenderEmail);
	var subject = $elm$url$Url$percentEncode('Feedback: Finite Automaton Simulator');
	var body = $elm$url$Url$percentEncode(
		$author$project$Main$composeFeedbackMessage(model));
	var _v0 = model.bl;
	if (!_v0) {
		return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + (to + ('&su=' + (subject + ('&body=' + body))));
	} else {
		return 'https://outlook.live.com/mail/0/deeplink/compose?to=' + (to + ('&subject=' + (subject + ('&body=' + body))));
	}
};
var $elm$html$Html$form = _VirtualDom_node('form');
var $author$project$Main$formspreeEndpoint = 'https://formspree.io/f/mjgejzrq';
var $author$project$Main$googleFormUrl = 'https://forms.gle/RekbknkXV3jQcfyy8';
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $author$project$Theme$interactiveBg = $author$project$Theme$panelBg;
var $elm$html$Html$label = _VirtualDom_node('label');
var $author$project$Main$mailProviderToString = function (provider) {
	if (!provider) {
		return 'gmail';
	} else {
		return 'outlook';
	}
};
var $elm$html$Html$Attributes$method = $elm$html$Html$Attributes$stringProperty('method');
var $elm$html$Html$Attributes$name = $elm$html$Html$Attributes$stringProperty('name');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $elm$html$Html$Attributes$required = $elm$html$Html$Attributes$boolProperty('required');
var $elm$html$Html$Attributes$rows = function (n) {
	return A2(
		_VirtualDom_attribute,
		'rows',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Main$feedbackModal = function (model) {
	return (!model.bm) ? $elm$html$Html$text('') : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
				A2($elm$html$Html$Attributes$style, 'inset', '0'),
				A2($elm$html$Html$Attributes$style, 'background', 'rgba(0, 0, 0, 0.55)'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'z-index', '1200'),
				$elm$html$Html$Events$onClick($author$project$Main$CloseFeedbackModal)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Events$stopPropagationOn,
						'click',
						$elm$json$Json$Decode$succeed(
							_Utils_Tuple2($author$project$Main$NoOp, true))),
						A2($elm$html$Html$Attributes$style, 'width', 'min(600px, 94vw)'),
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						$author$project$Theme$panelBg(model.a)),
						A2(
						$elm$html$Html$Attributes$style,
						'border',
						'1px solid ' + $author$project$Theme$panelBorder(model.a)),
						A2($elm$html$Html$Attributes$style, 'border-radius', '16px'),
						A2($elm$html$Html$Attributes$style, 'padding', '16px'),
						A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2($elm$html$Html$Attributes$style, 'gap', '12px')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'margin', '0')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$I18n$t, model.b, 121))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$Attributes$style,
								'border',
								'1px solid ' + $author$project$Theme$panelBorder(model.a)),
								A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
								A2($elm$html$Html$Attributes$style, 'padding', '12px'),
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'font-weight', '600')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, model.b, 128))
									])),
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, model.b, 129)),
										$elm$html$Html$text(' '),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href(
												$author$project$Main$feedbackWebMailLink(model)),
												A2(
												$elm$html$Html$Attributes$style,
												'color',
												$author$project$Theme$textColor(model.a))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text($author$project$Main$defaultSenderEmail)
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
										A2($elm$html$Html$Attributes$style, 'gap', '8px')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, model.b, 132)),
										A2(
										$elm$html$Html$select,
										_List_fromArray(
											[
												$elm$html$Html$Events$onInput($author$project$Main$UpdateFeedbackMailProvider),
												$elm$html$Html$Attributes$value(
												$author$project$Main$mailProviderToString(model.bl)),
												A2($elm$html$Html$Attributes$style, 'padding', '6px'),
												A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
												A2(
												$elm$html$Html$Attributes$style,
												'border',
												'1px solid ' + $author$project$Theme$panelBorder(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'background',
												$author$project$Theme$interactiveBg(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'color',
												$author$project$Theme$textColor(model.a))
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$option,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value('gmail')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, model.b, 133))
													])),
												A2(
												$elm$html$Html$option,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value('outlook')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, model.b, 134))
													]))
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, model.b, 130)),
										$elm$html$Html$text(' '),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href($author$project$Main$googleFormUrl),
												$elm$html$Html$Attributes$target('_blank'),
												$elm$html$Html$Attributes$rel('noopener noreferrer'),
												A2(
												$elm$html$Html$Attributes$style,
												'color',
												$author$project$Theme$textColor(model.a))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text($author$project$Main$googleFormUrl)
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'height', '4px'),
								A2(
								$elm$html$Html$Attributes$style,
								'background',
								$author$project$Theme$hoverBorder(model.a)),
								A2($elm$html$Html$Attributes$style, 'border-radius', '999px'),
								A2($elm$html$Html$Attributes$style, 'margin', '10px 0 6px 0')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$Attributes$style,
								'border',
								'1px solid ' + $author$project$Theme$panelBorder(model.a)),
								A2(
								$elm$html$Html$Attributes$style,
								'border-left',
								'6px solid ' + $author$project$Theme$hoverBorder(model.a)),
								A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
								A2($elm$html$Html$Attributes$style, 'padding', '12px 14px'),
								A2(
								$elm$html$Html$Attributes$style,
								'background',
								$author$project$Theme$interactiveBg(model.a)),
								A2($elm$html$Html$Attributes$style, 'font-weight', '700'),
								A2($elm$html$Html$Attributes$style, 'box-shadow', '0 6px 16px rgba(0,0,0,0.20)')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$I18n$t, model.b, 131))
							])),
						A2(
						$elm$html$Html$form,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$action($author$project$Main$formspreeEndpoint),
								$elm$html$Html$Attributes$method('POST'),
								$elm$html$Html$Attributes$target('_blank'),
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
								A2($elm$html$Html$Attributes$style, 'gap', '12px'),
								A2(
								$elm$html$Html$Attributes$style,
								'border',
								'2px dashed ' + $author$project$Theme$hoverBorder(model.a)),
								A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
								A2($elm$html$Html$Attributes$style, 'padding', '14px'),
								A2(
								$elm$html$Html$Attributes$style,
								'background',
								$author$project$Theme$bgColor(model.a))
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('hidden'),
										$elm$html$Html$Attributes$name('message'),
										$elm$html$Html$Attributes$value(
										$author$project$Main$composeFeedbackMessage(model))
									]),
								_List_Nil),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('hidden'),
										$elm$html$Html$Attributes$name('email'),
										$elm$html$Html$Attributes$value(
										$elm$core$String$isEmpty(
											$elm$core$String$trim(model.a1)) ? $author$project$Main$defaultSenderEmail : $elm$core$String$trim(model.a1))
									]),
								_List_Nil),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
										A2($elm$html$Html$Attributes$style, 'gap', '6px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$label,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, model.b, 125))
											])),
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('email'),
												$elm$html$Html$Attributes$name('contact_email'),
												$elm$html$Html$Attributes$value(model.a1),
												$elm$html$Html$Events$onInput($author$project$Main$UpdateFeedbackEmailInput),
												$elm$html$Html$Attributes$placeholder(
												A2($author$project$I18n$t, model.b, 126)),
												A2($elm$html$Html$Attributes$style, 'width', '100%'),
												A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
												A2($elm$html$Html$Attributes$style, 'padding', '12px'),
												A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
												A2(
												$elm$html$Html$Attributes$style,
												'border',
												'2px solid ' + $author$project$Theme$hoverBorder(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'background',
												$author$project$Theme$panelBg(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'color',
												$author$project$Theme$textColor(model.a)),
												A2($elm$html$Html$Attributes$style, 'box-shadow', 'inset 0 0 0 1px rgba(255,255,255,0.08)')
											]),
										_List_Nil)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
										A2($elm$html$Html$Attributes$style, 'gap', '6px'),
										A2($elm$html$Html$Attributes$style, 'margin-top', '8px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'font-weight', '600')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, model.b, 136))
											])),
										A2(
										$elm$html$Html$label,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, model.b, 127))
											])),
										A2(
										$elm$html$Html$textarea,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$placeholder(
												A2($author$project$I18n$t, model.b, 123)),
												$elm$html$Html$Attributes$value(model.a2),
												$elm$html$Html$Events$onInput($author$project$Main$UpdateFeedbackText),
												$elm$html$Html$Attributes$name('message_user'),
												$elm$html$Html$Attributes$required(true),
												$elm$html$Html$Attributes$rows(8),
												A2($elm$html$Html$Attributes$style, 'width', '100%'),
												A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
												A2($elm$html$Html$Attributes$style, 'resize', 'vertical'),
												A2($elm$html$Html$Attributes$style, 'padding', '12px'),
												A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
												A2(
												$elm$html$Html$Attributes$style,
												'border',
												'2px solid ' + $author$project$Theme$hoverBorder(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'background',
												$author$project$Theme$panelBg(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'color',
												$author$project$Theme$textColor(model.a)),
												A2($elm$html$Html$Attributes$style, 'box-shadow', 'inset 0 0 0 1px rgba(255,255,255,0.08)')
											]),
										_List_Nil)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end'),
										A2($elm$html$Html$Attributes$style, 'gap', '8px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Main$CloseFeedbackModal),
												$elm$html$Html$Attributes$type_('button'),
												A2($elm$html$Html$Attributes$style, 'padding', '10px 14px'),
												A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
												A2(
												$elm$html$Html$Attributes$style,
												'border',
												'1px solid ' + $author$project$Theme$panelBorder(model.a)),
												A2($elm$html$Html$Attributes$style, 'background', 'transparent'),
												A2(
												$elm$html$Html$Attributes$style,
												'color',
												$author$project$Theme$textColor(model.a)),
												A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, model.b, 64))
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('submit'),
												A2($elm$html$Html$Attributes$style, 'padding', '10px 14px'),
												A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
												A2($elm$html$Html$Attributes$style, 'border', 'none'),
												A2(
												$elm$html$Html$Attributes$style,
												'background',
												$author$project$Theme$hoverBg(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'color',
												$author$project$Theme$textColor(model.a)),
												A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
												$elm$html$Html$Attributes$disabled(
												$elm$core$String$isEmpty(
													$elm$core$String$trim(model.a2)))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, model.b, 124))
											]))
									]))
							]))
					]))
			]));
};
var $author$project$I18n$Greeting = 7;
var $author$project$I18n$MenuAbout = 6;
var $author$project$I18n$MenuEditor = 1;
var $author$project$I18n$MenuInstructions = 5;
var $author$project$Main$homeView = function (model) {
	var tk = $author$project$Design$tokens(model.aV);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2(
				$elm$html$Html$Attributes$style,
				'gap',
				$author$project$Design$px(tk.aw.r))
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin', '0'),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$author$project$Design$px(tk.ax.bY))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						A2($author$project$I18n$t, model.b, 7))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2(
						$elm$html$Html$Attributes$style,
						'gap',
						$author$project$Design$px(tk.aw.r)),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						'min(' + ($author$project$Design$px(tk.bk.b4) + ', 100%)')),
						A2(
						$elm$html$Html$Attributes$style,
						'padding',
						'0 ' + $author$project$Design$px(tk.aw.o))
					]),
				_List_fromArray(
					[
						A3(
						$author$project$Main$menuCard,
						model,
						A2($author$project$I18n$t, model.b, 1),
						1),
						A3(
						$author$project$Main$menuCard,
						model,
						A2($author$project$I18n$t, model.b, 5),
						5),
						A3(
						$author$project$Main$menuCard,
						model,
						A2($author$project$I18n$t, model.b, 6),
						6)
					]))
			]));
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $author$project$Main$CloseSettingsModal = {$: 17};
var $author$project$I18n$SettingsTitle = 15;
var $author$project$I18n$Language = 13;
var $author$project$Main$SetLang = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$SetStartPage = function (a) {
	return {$: 19, a: a};
};
var $author$project$I18n$StartPageLabel = 20;
var $author$project$I18n$ThemeDark = 11;
var $author$project$I18n$ThemeLabel = 12;
var $author$project$I18n$ThemeLight = 10;
var $author$project$Main$ToggleTheme = {$: 3};
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$I18n$StartPageFiniteOption = 23;
var $author$project$I18n$StartPageHomeOption = 22;
var $author$project$I18n$StartPageStackOption = 24;
var $author$project$I18n$StartPageTuringOption = 25;
var $author$project$Main$startPageOptions = function (model) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$option,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value('1'),
					$elm$html$Html$Attributes$selected(model.L === 1)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					A2($author$project$I18n$t, model.b, 22))
				])),
			A2(
			$elm$html$Html$option,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value('2'),
					$elm$html$Html$Attributes$selected(model.L === 2)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					A2($author$project$I18n$t, model.b, 23))
				])),
			A2(
			$elm$html$Html$option,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value('3'),
					$elm$html$Html$Attributes$selected(model.L === 3)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					A2($author$project$I18n$t, model.b, 24))
				])),
			A2(
			$elm$html$Html$option,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value('4'),
					$elm$html$Html$Attributes$selected(model.L === 4)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					A2($author$project$I18n$t, model.b, 25))
				]))
		]);
};
var $author$project$Main$settingsForm = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'gap', '14px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'gap', '12px'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'stretch')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'flex', '1'),
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
								A2($elm$html$Html$Attributes$style, 'gap', '6px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, model.b, 13))
									])),
								A2(
								$elm$html$Html$select,
								_List_fromArray(
									[
										$elm$html$Html$Events$onInput($author$project$Main$SetLang),
										$elm$html$Html$Attributes$value(
										$author$project$I18n$langToString(model.b)),
										A2($elm$html$Html$Attributes$style, 'padding', '8px'),
										A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
										A2(
										$elm$html$Html$Attributes$style,
										'border',
										'1px solid ' + $author$project$Theme$panelBorder(model.a)),
										A2(
										$elm$html$Html$Attributes$style,
										'background',
										$author$project$Theme$interactiveBg(model.a)),
										A2(
										$elm$html$Html$Attributes$style,
										'color',
										$author$project$Theme$textColor(model.a)),
										A2($elm$html$Html$Attributes$style, 'width', '100%')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('sk'),
												$elm$html$Html$Attributes$selected(model.b === 2)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('SK')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('en'),
												$elm$html$Html$Attributes$selected(model.b === 1)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('EN')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('ru'),
												$elm$html$Html$Attributes$selected(!model.b)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('RU')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('ua'),
												$elm$html$Html$Attributes$selected(model.b === 3)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('UA')
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'flex', '2'),
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
								A2($elm$html$Html$Attributes$style, 'gap', '6px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, model.b, 12))
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Main$ToggleTheme),
										A2($elm$html$Html$Attributes$style, 'padding', '10px'),
										A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
										A2(
										$elm$html$Html$Attributes$style,
										'border',
										'1px solid ' + $author$project$Theme$panelBorder(model.a)),
										A2(
										$elm$html$Html$Attributes$style,
										'background',
										$author$project$Theme$interactiveBg(model.a)),
										A2(
										$elm$html$Html$Attributes$style,
										'color',
										$author$project$Theme$textColor(model.a)),
										A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
										A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
										A2($elm$html$Html$Attributes$style, 'width', '100%')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										function () {
											var _v0 = model.a;
											if (!_v0) {
												return A2($author$project$I18n$t, model.b, 10);
											} else {
												return A2($author$project$I18n$t, model.b, 11);
											}
										}()),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'font-size', '18px'),
												A2($elm$html$Html$Attributes$style, 'line-height', '1'),
												A2(
												$elm$html$Html$Attributes$style,
												'color',
												function () {
													var _v1 = model.a;
													if (_v1 === 1) {
														return '#ffffff';
													} else {
														return $author$project$Theme$hoverBorder(model.a);
													}
												}())
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												function () {
													var _v2 = model.a;
													if (!_v2) {
														return '☀';
													} else {
														return '☾';
													}
												}())
											]))
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2($elm$html$Html$Attributes$style, 'gap', '6px')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$label,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$I18n$t, model.b, 20))
							])),
						A2(
						$elm$html$Html$select,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput($author$project$Main$SetStartPage),
								$elm$html$Html$Attributes$value(
								$elm$core$String$fromInt(
									$author$project$Main$startPageToInt(model.L))),
								A2($elm$html$Html$Attributes$style, 'padding', '8px'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
								A2(
								$elm$html$Html$Attributes$style,
								'border',
								'1px solid ' + $author$project$Theme$panelBorder(model.a)),
								A2(
								$elm$html$Html$Attributes$style,
								'background',
								$author$project$Theme$interactiveBg(model.a)),
								A2(
								$elm$html$Html$Attributes$style,
								'color',
								$author$project$Theme$textColor(model.a))
							]),
						$author$project$Main$startPageOptions(model))
					]))
			]));
};
var $author$project$Main$settingsModal = function (model) {
	return (!model.bs) ? $elm$html$Html$text('') : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
				A2($elm$html$Html$Attributes$style, 'inset', '0'),
				A2($elm$html$Html$Attributes$style, 'background', 'rgba(0, 0, 0, 0.55)'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'z-index', '1200'),
				$elm$html$Html$Events$onClick($author$project$Main$CloseSettingsModal)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Events$stopPropagationOn,
						'click',
						$elm$json$Json$Decode$succeed(
							_Utils_Tuple2($author$project$Main$NoOp, true))),
						A2($elm$html$Html$Attributes$style, 'width', 'min(520px, 92vw)'),
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						$author$project$Theme$panelBg(model.a)),
						A2(
						$elm$html$Html$Attributes$style,
						'border',
						'1px solid ' + $author$project$Theme$panelBorder(model.a)),
						A2($elm$html$Html$Attributes$style, 'border-radius', '16px'),
						A2($elm$html$Html$Attributes$style, 'padding', '16px'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2($elm$html$Html$Attributes$style, 'gap', '12px')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'margin', '0')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$I18n$t, model.b, 15))
							])),
						$author$project$Main$settingsForm(model),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Main$CloseSettingsModal),
										A2($elm$html$Html$Attributes$style, 'padding', '10px 14px'),
										A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
										A2(
										$elm$html$Html$Attributes$style,
										'border',
										'1px solid ' + $author$project$Theme$panelBorder(model.a)),
										A2(
										$elm$html$Html$Attributes$style,
										'background',
										$author$project$Theme$interactiveBg(model.a)),
										A2(
										$elm$html$Html$Attributes$style,
										'color',
										$author$project$Theme$textColor(model.a)),
										A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, model.b, 64))
									]))
							]))
					]))
			]));
};
var $author$project$I18n$BackHomeIcon = 117;
var $author$project$I18n$BackHomeIconText = 119;
var $author$project$I18n$EditorGoToStartState = 98;
var $author$project$I18n$EditorSave = 50;
var $author$project$Pages$Editor$OpenSaveModal = {$: 35};
var $author$project$Pages$EditorStack$OpenSaveModal = {$: 39};
var $author$project$Pages$EditorTuring$OpenSaveModal = {$: 39};
var $author$project$Main$OpenSettingsModal = {$: 16};
var $author$project$I18n$SettingsButton = 14;
var $author$project$Design$control = F2(
	function (sz, tk) {
		switch (sz) {
			case 0:
				return tk.H.o;
			case 1:
				return tk.H.r;
			default:
				return tk.H.q;
		}
	});
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $author$project$Theme$interactiveBorder = $author$project$Theme$panelBorder;
var $author$project$Main$topBar = function (model) {
	var w = model.aM;
	var tk = $author$project$Design$tokens(model.aV);
	var rightContainerAttrs = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'display', 'flex'),
			A2(
			$elm$html$Html$Attributes$style,
			'flex-direction',
			(w < 500) ? 'column' : 'row'),
			A2(
			$elm$html$Html$Attributes$style,
			'gap',
			$author$project$Design$px(tk.aw.o)),
			A2(
			$elm$html$Html$Attributes$style,
			'align-items',
			(w < 500) ? 'flex-end' : 'center'),
			A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end')
		]);
	var onHome = !model.B;
	var homeLabel = (w < 500) ? A2($author$project$I18n$t, model.b, 119) : ((w < 760) ? A2($author$project$I18n$t, model.b, 117) : A2($author$project$I18n$t, model.b, 119));
	var c = A2($author$project$Design$control, tk.bH.H, tk);
	var minW = function () {
		var kChars = tk.bG;
		var fromPadding = kChars * c.ar;
		var fromFont = kChars * tk.ax.bC;
		return (_Utils_cmp(fromPadding, fromFont) > 0) ? fromPadding : fromFont;
	}();
	var baseControlStyles = _List_fromArray(
		[
			A2(
			$elm$html$Html$Attributes$style,
			'height',
			$author$project$Design$px(c.t)),
			A2(
			$elm$html$Html$Attributes$style,
			'min-width',
			$author$project$Design$px(minW)),
			A2(
			$elm$html$Html$Attributes$style,
			'padding',
			$author$project$Design$px(c.as) + (' ' + $author$project$Design$px(c.ar))),
			A2(
			$elm$html$Html$Attributes$style,
			'border-radius',
			$author$project$Design$px(tk.A.o)),
			A2(
			$elm$html$Html$Attributes$style,
			'border',
			$author$project$Design$px(
				A2($author$project$Design$borderFor, tk.am.bU, tk)) + (' solid ' + $author$project$Theme$interactiveBorder(model.a))),
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			$author$project$Theme$interactiveBg(model.a)),
			A2(
			$elm$html$Html$Attributes$style,
			'color',
			$author$project$Theme$textColor(model.a)),
			A2(
			$elm$html$Html$Attributes$style,
			'font-size',
			$author$project$Design$px(tk.ax.bC)),
			A2($elm$html$Html$Attributes$style, 'line-height', tk.bM.bC),
			A2($elm$html$Html$Attributes$style, 'transition', 'background ' + (tk.bO.c7 + (' ' + (tk.bO.cV + (', border-color ' + (tk.bO.c7 + (' ' + (tk.bO.cV + (', box-shadow ' + (tk.bO.c7 + (' ' + (tk.bO.cV + (', outline-color ' + (tk.bO.c7 + (' ' + tk.bO.cV)))))))))))))))
		]);
	var viewEditorGoToStart = A2(
		$elm$html$Html$button,
		A2(
			$elm$core$List$cons,
			$elm$html$Html$Events$onClick(
				((model.B === 3) || (model.B === 4)) ? ((model.B === 4) ? $author$project$Main$EditorTuringMsg($author$project$Pages$EditorTuring$CenterOnStartState) : $author$project$Main$EditorStackMsg($author$project$Pages$EditorStack$CenterOnStartState)) : $author$project$Main$EditorMsg($author$project$Pages$Editor$CenterOnStartState)),
			baseControlStyles),
		_List_fromArray(
			[
				$elm$html$Html$text(
				A2($author$project$I18n$t, model.b, 98))
			]));
	var viewEditorSave = A2(
		$elm$html$Html$button,
		A2(
			$elm$core$List$cons,
			$elm$html$Html$Events$onClick(
				((model.B === 3) || (model.B === 4)) ? ((model.B === 4) ? $author$project$Main$EditorTuringMsg($author$project$Pages$EditorTuring$OpenSaveModal) : $author$project$Main$EditorStackMsg($author$project$Pages$EditorStack$OpenSaveModal)) : $author$project$Main$EditorMsg($author$project$Pages$Editor$OpenSaveModal)),
			baseControlStyles),
		_List_fromArray(
			[
				$elm$html$Html$text(
				A2($author$project$I18n$t, model.b, 50))
			]));
	var viewHome = A2(
		$elm$html$Html$button,
		A2(
			$elm$core$List$cons,
			$elm$html$Html$Events$onClick(
				$author$project$Main$GoTo(0)),
			baseControlStyles),
		_List_fromArray(
			[
				$elm$html$Html$text(homeLabel)
			]));
	var secondRowRight = ((w < 500) && (!onHome)) ? _List_fromArray(
		[viewHome]) : _List_Nil;
	var viewSettings = A2(
		$elm$html$Html$button,
		A2(
			$elm$core$List$cons,
			$elm$html$Html$Events$onClick($author$project$Main$OpenSettingsModal),
			baseControlStyles),
		_List_fromArray(
			[
				$elm$html$Html$text(
				A2($author$project$I18n$t, model.b, 14))
			]));
	var firstRowRight = function () {
		if (w < 500) {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2(
						$elm$html$Html$Attributes$style,
						'gap',
						$author$project$Design$px(tk.aw.o)),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					]),
				_List_fromArray(
					[viewSettings]));
		} else {
			var editorActions = ((model.B === 2) || ((model.B === 3) || (model.B === 4))) ? _List_fromArray(
				[viewEditorSave]) : _List_Nil;
			var commonActions = _Utils_ap(
				onHome ? _List_Nil : _List_fromArray(
					[viewHome]),
				_List_fromArray(
					[viewSettings]));
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2(
						$elm$html$Html$Attributes$style,
						'gap',
						$author$project$Design$px(tk.aw.r)),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center')
					]),
				_Utils_ap(
					$elm$core$List$isEmpty(editorActions) ? _List_Nil : _List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2(
									$elm$html$Html$Attributes$style,
									'gap',
									$author$project$Design$px(tk.aw.o)),
									A2(
									$elm$html$Html$Attributes$style,
									'padding-right',
									$author$project$Design$px(tk.aw.r)),
									A2(
									$elm$html$Html$Attributes$style,
									'border-right',
									$author$project$Design$px(
										A2($author$project$Design$borderFor, tk.am.bU, tk)) + (' solid ' + $author$project$Theme$panelBorder(model.a)))
								]),
							editorActions)
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2(
									$elm$html$Html$Attributes$style,
									'gap',
									$author$project$Design$px(tk.aw.o))
								]),
							commonActions)
						])));
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'flex-start'),
				A2(
				$elm$html$Html$Attributes$style,
				'gap',
				$author$project$Design$px(tk.aw.o)),
				A2(
				$elm$html$Html$Attributes$style,
				'margin-bottom',
				$author$project$Design$px(tk.aw.o))
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin', '0'),
						A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$author$project$Design$px(tk.ax.bX))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						A2($author$project$I18n$t, model.b, 0))
					])),
				A2(
				$elm$html$Html$div,
				rightContainerAttrs,
				A2(
					$elm$core$List$cons,
					firstRowRight,
					$elm$core$List$isEmpty(secondRowRight) ? _List_Nil : _List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2(
									$elm$html$Html$Attributes$style,
									'gap',
									$author$project$Design$px(tk.aw.o)),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end')
								]),
							secondRowRight)
						])))
			]));
};
var $author$project$I18n$AboutBody = 30;
var $author$project$I18n$AboutTitle = 29;
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Pages$About$view = F2(
	function (ctx, _v0) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('responsive-block'),
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$panelBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'color',
					$author$project$Theme$textColor(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '16px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '12px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2($author$project$I18n$t, ctx.b, 29))
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2($author$project$I18n$t, ctx.b, 30))
						]))
				]));
	});
var $author$project$I18n$EditorTitle = 31;
var $author$project$I18n$EditorAutomatonDeterministic = 33;
var $author$project$I18n$EditorAutomatonNonDeterministic = 34;
var $author$project$I18n$EditorType = 32;
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $author$project$Pages$Editor$isDeterministic = function (transitions) {
	var step = F2(
		function (t, dict) {
			return A3(
				$elm$core$Dict$update,
				_Utils_Tuple2(t.f, t.i),
				function (maybe) {
					return $elm$core$Maybe$Just(
						A2($elm$core$Maybe$withDefault, 0, maybe) + 1);
				},
				dict);
		});
	var hasLambda = A2(
		$elm$core$List$any,
		function (t) {
			return $author$project$Pages$Editor$isLambdaLabel(t.i);
		},
		transitions);
	var counts = A3($elm$core$List$foldl, step, $elm$core$Dict$empty, transitions);
	var hasDuplicate = A2(
		$elm$core$List$any,
		function (n) {
			return n > 1;
		},
		$elm$core$Dict$values(counts));
	return (!hasDuplicate) && (!hasLambda);
};
var $author$project$Theme$successColor = function (th) {
	if (!th) {
		return '#1f9d55';
	} else {
		return '#37d67a';
	}
};
var $author$project$Theme$warningColor = function (th) {
	if (!th) {
		return '#c96a12';
	} else {
		return '#f39c49';
	}
};
var $author$project$Pages$Editor$automatonPanel = F2(
	function (ctx, model) {
		var deterministic = $author$project$Pages$Editor$isDeterministic(model.d);
		var label = deterministic ? A2($author$project$I18n$t, ctx.b, 33) : A2($author$project$I18n$t, ctx.b, 34);
		var color = deterministic ? $author$project$Theme$successColor(ctx.a) : $author$project$Theme$warningColor(ctx.a);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$interactiveBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '4px 8px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '999px'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px'),
					A2($elm$html$Html$Attributes$style, 'width', 'fit-content')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.85')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2($author$project$I18n$t, ctx.b, 32) + ':')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', color),
							A2($elm$html$Html$Attributes$style, 'font-weight', 'bold'),
							A2($elm$html$Html$Attributes$style, 'font-size', '12px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]))
				]));
	});
var $author$project$I18n$EditorAutomatonNonDetReasonsTitle = 114;
var $author$project$I18n$EditorAutomatonTypeDetailsToggle = 113;
var $author$project$I18n$EditorDeleteState = 88;
var $author$project$I18n$EditorDeleteTransition = 90;
var $author$project$I18n$EditorMakeAccepting = 94;
var $author$project$I18n$EditorMakeStart = 92;
var $author$project$I18n$EditorMode = 67;
var $author$project$I18n$EditorModeAddState = 68;
var $author$project$I18n$EditorModeAddTransition = 69;
var $author$project$I18n$EditorModeMoveState = 70;
var $author$project$I18n$EditorNo = 87;
var $author$project$I18n$EditorSelected = 79;
var $author$project$I18n$EditorSelectedAccepting = 84;
var $author$project$I18n$EditorSelectedNone = 80;
var $author$project$I18n$EditorSelectedNotFound = 81;
var $author$project$I18n$EditorSelectedPos = 83;
var $author$project$I18n$EditorSelectedStart = 85;
var $author$project$I18n$EditorSelectedState = 82;
var $author$project$I18n$EditorSelectedTransition = 89;
var $author$project$I18n$EditorStateName = 65;
var $author$project$I18n$EditorStateNameUniqueError = 66;
var $author$project$I18n$EditorTransitionFrom = 78;
var $author$project$I18n$EditorTransitionLabel = 73;
var $author$project$I18n$EditorTransitionSelectStart = 76;
var $author$project$I18n$EditorTransitions = 72;
var $author$project$I18n$EditorUnsetAccepting = 93;
var $author$project$I18n$EditorUnsetStart = 91;
var $author$project$I18n$EditorYes = 86;
var $author$project$Pages$Editor$SetSelectedStateName = function (a) {
	return {$: 14, a: a};
};
var $author$project$Pages$Editor$SetSelectedTransitionLabel = function (a) {
	return {$: 13, a: a};
};
var $author$project$Pages$Editor$SetTransitionLabel = function (a) {
	return {$: 12, a: a};
};
var $author$project$Pages$Editor$editorButtonStyles = function (theme) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			$author$project$Theme$interactiveBg(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'color',
			$author$project$Theme$textColor(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'border',
			'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
			A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
			A2($elm$html$Html$Attributes$style, 'padding', '4px 8px')
		]);
};
var $author$project$Theme$inputBg = function (th) {
	if (!th) {
		return '#e6ebf3';
	} else {
		return '#1b2233';
	}
};
var $author$project$Pages$Editor$editorTextInputStyles = function (theme) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
			A2($elm$html$Html$Attributes$style, 'line-height', 'normal'),
			A2($elm$html$Html$Attributes$style, 'font-family', 'inherit'),
			A2($elm$html$Html$Attributes$style, 'height', '32px'),
			A2($elm$html$Html$Attributes$style, 'min-height', '32px'),
			A2($elm$html$Html$Attributes$style, 'padding', '0 8px'),
			A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
			A2(
			$elm$html$Html$Attributes$style,
			'color',
			$author$project$Theme$textColor(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'caret-color',
			$author$project$Theme$textColor(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			$author$project$Theme$inputBg(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'border',
			'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
			A2($elm$html$Html$Attributes$style, 'border-radius', '6px')
		]);
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$li = _VirtualDom_node('li');
var $author$project$I18n$EditorAutomatonNonDetReasonDuplicate = 115;
var $author$project$I18n$EditorAutomatonNonDetReasonLambda = 116;
var $author$project$Pages$Editor$quotedStateNameById = F2(
	function (states, stateId) {
		return '\'' + (A2($author$project$Pages$Editor$stateNameById, states, stateId) + '\'');
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Pages$Editor$transitionLabelDisplay = function (label) {
	return $author$project$Pages$Editor$isLambdaLabel(label) ? 'λ' : label;
};
var $author$project$Pages$Editor$nonDeterminismReasons = F3(
	function (lang, states, transitions) {
		var replaceToken = F3(
			function (key, value, template) {
				return A3($elm$core$String$replace, '{' + (key + '}'), value, template);
			});
		var lambdaReasons = A2(
			$elm$core$List$map,
			function (transition) {
				return A3(
					replaceToken,
					'to',
					A2($author$project$Pages$Editor$quotedStateNameById, states, transition.g),
					A3(
						replaceToken,
						'from',
						A2($author$project$Pages$Editor$quotedStateNameById, states, transition.f),
						A2($author$project$I18n$t, lang, 116)));
			},
			A2(
				$elm$core$List$filter,
				function (transition) {
					return $author$project$Pages$Editor$isLambdaLabel(transition.i);
				},
				transitions));
		var countByFromAndLabel = F2(
			function (transition, counts) {
				return A3(
					$elm$core$Dict$update,
					_Utils_Tuple2(transition.f, transition.i),
					function (maybeCount) {
						return $elm$core$Maybe$Just(
							A2($elm$core$Maybe$withDefault, 0, maybeCount) + 1);
					},
					counts);
			});
		var duplicateReasons = A2(
			$elm$core$List$filterMap,
			function (_v0) {
				var _v1 = _v0.a;
				var fromState = _v1.a;
				var label = _v1.b;
				var count = _v0.b;
				return (count > 1) ? $elm$core$Maybe$Just(
					A3(
						replaceToken,
						'label',
						$author$project$Pages$Editor$transitionLabelDisplay(label),
						A3(
							replaceToken,
							'state',
							A2($author$project$Pages$Editor$quotedStateNameById, states, fromState),
							A2($author$project$I18n$t, lang, 115)))) : $elm$core$Maybe$Nothing;
			},
			$elm$core$Dict$toList(
				A3($elm$core$List$foldl, countByFromAndLabel, $elm$core$Dict$empty, transitions)));
		return _Utils_ap(duplicateReasons, lambdaReasons);
	});
var $elm$html$Html$Attributes$size = function (n) {
	return A2(
		_VirtualDom_attribute,
		'size',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Pages$Editor$editorControlsPanel = F2(
	function (ctx, model) {
		var simulationLocked = $author$project$Pages$Editor$simulationSessionActive(model);
		var reasons = A3($author$project$Pages$Editor$nonDeterminismReasons, ctx.b, model.c, model.d);
		var modeButton = F2(
			function (target, label) {
				return A2(
					$elm$html$Html$button,
					_Utils_ap(
						$author$project$Pages$Editor$editorButtonStyles(ctx.a),
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Pages$Editor$SetMode(target)),
								A2(
								$elm$html$Html$Attributes$style,
								'background',
								_Utils_eq(model.z, target) ? $author$project$Theme$hoverBg(ctx.a) : $author$project$Theme$interactiveBg(ctx.a)),
								A2(
								$elm$html$Html$Attributes$style,
								'border-color',
								_Utils_eq(model.z, target) ? $author$project$Theme$hoverBorder(ctx.a) : $author$project$Theme$interactiveBorder(ctx.a)),
								$elm$html$Html$Attributes$disabled(simulationLocked)
							])),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]));
			});
		var deterministic = $author$project$Pages$Editor$isDeterministic(model.d);
		var cardStyles = _List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Theme$interactiveBg(ctx.a)),
				A2(
				$elm$html$Html$Attributes$style,
				'border',
				'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
				A2($elm$html$Html$Attributes$style, 'padding', '10px'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
				A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
			]);
		var automatonLabel = deterministic ? A2($author$project$I18n$t, ctx.b, 33) : A2($author$project$I18n$t, ctx.b, 34);
		var automatonDetailsExpanded = (!deterministic) && model.a_;
		var automatonColor = deterministic ? $author$project$Theme$successColor(ctx.a) : $author$project$Theme$warningColor(ctx.a);
		var automatonCardMaxHeight = automatonDetailsExpanded ? '45%' : '48px';
		var automatonCardClosing = (!deterministic) && (model.aG && (!automatonDetailsExpanded));
		var automatonCardExpandedVisual = automatonDetailsExpanded || automatonCardClosing;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '300px'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '10px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_Utils_ap(
						cardStyles,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2(
								$elm$html$Html$Attributes$style,
								'flex',
								automatonCardExpandedVisual ? '55 1 0' : '1 1 auto'),
								A2($elm$html$Html$Attributes$style, 'min-height', '0')
							])),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 67))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'gap', '8px'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'margin-top', '4px'),
									A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
								]),
							_List_fromArray(
								[
									A2(
									modeButton,
									0,
									A2($author$project$I18n$t, ctx.b, 68)),
									A2(
									modeButton,
									1,
									A2($author$project$I18n$t, ctx.b, 69)),
									A2(
									modeButton,
									2,
									A2($author$project$I18n$t, ctx.b, 70))
								])),
							(model.z === 1) ? A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 72))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'gap', '8px'),
											A2($elm$html$Html$Attributes$style, 'align-items', 'center')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$input,
											_Utils_ap(
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('text'),
														$elm$html$Html$Attributes$size(12),
														$elm$html$Html$Attributes$placeholder('λ'),
														$elm$html$Html$Attributes$id('transition-create-label-input'),
														$elm$html$Html$Attributes$value(model.a9),
														$elm$html$Html$Events$onInput($author$project$Pages$Editor$SetTransitionLabel)
													]),
												$author$project$Pages$Editor$editorTextInputStyles(ctx.a)),
											_List_Nil)
										])),
									function () {
									var _v0 = model.ah;
									if (_v0.$ === 1) {
										return $elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 76));
									} else {
										var sid = _v0.a;
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'margin-top', '4px')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 78) + (': ' + (A2($author$project$Pages$Editor$stateNameById, model.c, sid) + (' → ' + A2($author$project$I18n$t, ctx.b, 76)))))
												]));
									}
								}()
								])) : $elm$html$Html$text(''),
							(model.z === 2) ? A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'overflow', 'auto')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 79))
										])),
									function () {
									var _v1 = _Utils_Tuple2(model.h, model.s);
									if (!_v1.a.$) {
										var sid = _v1.a.a;
										var _v2 = A2($author$project$Pages$Editor$getStateById, sid, model.c);
										if (_v2.$ === 1) {
											return A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 81))
													]));
										} else {
											var s = _v2.a;
											return A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 82) + (': ' + $elm$core$String$fromInt(s.a4)))
															])),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'margin-top', '6px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 65) + ': '),
																A2(
																$elm$html$Html$input,
																_Utils_ap(
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$type_('text'),
																			$elm$html$Html$Attributes$id('selected-state-name-input'),
																			$elm$html$Html$Attributes$placeholder(
																			$elm$core$String$fromInt(s.a4)),
																			$elm$html$Html$Attributes$value(s.b3),
																			$elm$html$Html$Events$onInput($author$project$Pages$Editor$SetSelectedStateName)
																		]),
																	$author$project$Pages$Editor$editorTextInputStyles(ctx.a)),
																_List_Nil)
															])),
														model.ak ? A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'color', '#e74c3c'),
																A2($elm$html$Html$Attributes$style, 'margin-top', '4px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 66))
															])) : $elm$html$Html$text(''),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 83) + (': ' + ($elm$core$String$fromFloat(s.j) + (', ' + $elm$core$String$fromFloat(s.k)))))
															])),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 84) + (': ' + (s.E ? A2($author$project$I18n$t, ctx.b, 86) : A2($author$project$I18n$t, ctx.b, 87))))
															])),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 85) + (': ' + (s.M ? A2($author$project$I18n$t, ctx.b, 86) : A2($author$project$I18n$t, ctx.b, 87))))
															])),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
																A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																A2($elm$html$Html$Attributes$style, 'gap', '8px')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$button,
																_Utils_ap(
																	$author$project$Pages$Editor$editorButtonStyles(ctx.a),
																	_List_fromArray(
																		[
																			$elm$html$Html$Events$onClick(
																			$author$project$Pages$Editor$DeleteState(s.a4))
																		])),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		A2($author$project$I18n$t, ctx.b, 88))
																	]))
															])),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																A2($elm$html$Html$Attributes$style, 'gap', '8px'),
																A2($elm$html$Html$Attributes$style, 'margin-top', '8px')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$button,
																_Utils_ap(
																	$author$project$Pages$Editor$editorButtonStyles(ctx.a),
																	_List_fromArray(
																		[
																			$elm$html$Html$Events$onClick(
																			$author$project$Pages$Editor$ToggleStart(s.a4)),
																			$elm$html$Html$Attributes$disabled(simulationLocked)
																		])),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		s.M ? A2($author$project$I18n$t, ctx.b, 91) : A2($author$project$I18n$t, ctx.b, 92))
																	])),
																A2(
																$elm$html$Html$button,
																_Utils_ap(
																	$author$project$Pages$Editor$editorButtonStyles(ctx.a),
																	_List_fromArray(
																		[
																			$elm$html$Html$Events$onClick(
																			$author$project$Pages$Editor$ToggleAccepting(s.a4)),
																			$elm$html$Html$Attributes$disabled(simulationLocked)
																		])),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		s.E ? A2($author$project$I18n$t, ctx.b, 93) : A2($author$project$I18n$t, ctx.b, 94))
																	]))
															]))
													]));
										}
									} else {
										if (!_v1.b.$) {
											var _v3 = _v1.a;
											var tid = _v1.b.a;
											var _v4 = $elm$core$List$head(
												A2(
													$elm$core$List$filter,
													function (tr) {
														return _Utils_eq(tr.a4, tid);
													},
													model.d));
											if (_v4.$ === 1) {
												return A2(
													$elm$html$Html$div,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text(
															A2($author$project$I18n$t, ctx.b, 81))
														]));
											} else {
												var tr = _v4.a;
												return A2(
													$elm$html$Html$div,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	A2($author$project$I18n$t, ctx.b, 89) + (': ' + (A2($author$project$Pages$Editor$quotedStateNameById, model.c, tr.f) + (' → ' + A2($author$project$Pages$Editor$quotedStateNameById, model.c, tr.g)))))
																])),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	A2($elm$html$Html$Attributes$style, 'margin-top', '6px')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	A2($author$project$I18n$t, ctx.b, 73) + ': '),
																	A2(
																	$elm$html$Html$input,
																	_Utils_ap(
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$type_('text'),
																				$elm$html$Html$Attributes$id('selected-transition-label-input'),
																				$elm$html$Html$Attributes$placeholder('λ'),
																				$elm$html$Html$Attributes$value(model.Y),
																				$elm$html$Html$Events$onInput($author$project$Pages$Editor$SetSelectedTransitionLabel)
																			]),
																		$author$project$Pages$Editor$editorTextInputStyles(ctx.a)),
																	_List_Nil)
																])),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
																	A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																	A2($elm$html$Html$Attributes$style, 'gap', '8px')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$button,
																	_Utils_ap(
																		$author$project$Pages$Editor$editorButtonStyles(ctx.a),
																		_List_fromArray(
																			[
																				$elm$html$Html$Events$onClick(
																				$author$project$Pages$Editor$DeleteTransition(tr.a4))
																			])),
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			A2($author$project$I18n$t, ctx.b, 90))
																		]))
																]))
														]));
											}
										} else {
											return A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 80))
													]));
										}
									}
								}()
								])) : $elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_Utils_ap(
						cardStyles,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2(
								$elm$html$Html$Attributes$style,
								'flex',
								automatonCardExpandedVisual ? '45 1 0' : '0 0 auto'),
								A2($elm$html$Html$Attributes$style, 'max-height', automatonCardMaxHeight),
								A2(
								$elm$html$Html$Attributes$style,
								'min-height',
								automatonDetailsExpanded ? '0' : 'auto'),
								A2($elm$html$Html$Attributes$style, 'transition', 'max-height 240ms ease')
							])),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
									A2($elm$html$Html$Attributes$style, 'gap', '8px'),
									A2($elm$html$Html$Attributes$style, 'min-height', '32px')
								]),
							_List_fromArray(
								[
									deterministic ? $elm$html$Html$text('') : A2(
									$elm$html$Html$button,
									_Utils_ap(
										$author$project$Pages$Editor$editorButtonStyles(ctx.a),
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Pages$Editor$ToggleAutomatonTypeDetails),
												A2($elm$html$Html$Attributes$style, 'padding', '2px 8px'),
												A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
												$elm$html$Html$Attributes$title(
												A2($author$project$I18n$t, ctx.b, 113))
											])),
									_List_fromArray(
										[
											$elm$html$Html$text(
											automatonDetailsExpanded ? '▾' : '▴')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
											A2($elm$html$Html$Attributes$style, 'font-weight', '700'),
											A2($elm$html$Html$Attributes$style, 'color', automatonColor),
											A2($elm$html$Html$Attributes$style, 'text-align', 'center')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(automatonLabel)
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
									A2($elm$html$Html$Attributes$style, 'min-height', '0'),
									A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
									A2(
									$elm$html$Html$Attributes$style,
									'max-height',
									automatonDetailsExpanded ? '100%' : '0'),
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									automatonDetailsExpanded ? '1' : '0'),
									A2($elm$html$Html$Attributes$style, 'transition', 'max-height 240ms ease, opacity 180ms ease')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
											A2($elm$html$Html$Attributes$style, 'font-weight', '600')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 114))
										])),
									model.aG ? $elm$html$Html$text('') : A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'margin-top', '6px'),
											A2($elm$html$Html$Attributes$style, 'overflow', 'auto'),
											A2($elm$html$Html$Attributes$style, 'padding-right', '4px')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$ul,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'margin', '0'),
													A2($elm$html$Html$Attributes$style, 'padding-left', '18px'),
													A2($elm$html$Html$Attributes$style, 'font-size', '14px')
												]),
											A2(
												$elm$core$List$map,
												function (reason) {
													return A2(
														$elm$html$Html$li,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'margin-bottom', '4px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(reason)
															]));
												},
												reasons))
										]))
								]))
						]))
				]));
	});
var $author$project$Theme$errorColor = function (th) {
	if (!th) {
		return '#c0392b';
	} else {
		return '#ff7666';
	}
};
var $author$project$Pages$Editor$globalNoticeColor = F2(
	function (theme, key) {
		switch (key) {
			case 106:
				return $author$project$Theme$successColor(theme);
			case 107:
				return $author$project$Theme$warningColor(theme);
			case 108:
				return $author$project$Theme$errorColor(theme);
			case 109:
				return $author$project$Theme$errorColor(theme);
			case 110:
				return $author$project$Theme$errorColor(theme);
			default:
				return $author$project$Theme$textColor(theme);
		}
	});
var $author$project$Pages$Editor$CloseSaveModal = {$: 36};
var $author$project$Pages$Editor$ConfirmRenameSlot = function (a) {
	return {$: 42, a: a};
};
var $author$project$Pages$Editor$DeleteFromSlot = function (a) {
	return {$: 39, a: a};
};
var $author$project$I18n$EditorConfirmRename = 60;
var $author$project$I18n$EditorDeleteFromSlot = 54;
var $author$project$I18n$EditorExportFas = 56;
var $author$project$I18n$EditorImportError = 57;
var $author$project$I18n$EditorImportFas = 55;
var $author$project$I18n$EditorLoadFromSlot = 53;
var $author$project$I18n$EditorRenameSlot = 59;
var $author$project$I18n$EditorSaveModalTitle = 51;
var $author$project$I18n$EditorSaveToSlot = 52;
var $author$project$I18n$EditorSaved = 61;
var $author$project$I18n$EditorSlot = 62;
var $author$project$I18n$EditorSlotEmpty = 63;
var $author$project$Pages$Editor$ExportSlot = function (a) {
	return {$: 46, a: a};
};
var $author$project$Pages$Editor$ImportSlot = function (a) {
	return {$: 47, a: a};
};
var $author$project$Pages$Editor$LoadFromSlot = function (a) {
	return {$: 38, a: a};
};
var $author$project$Pages$Editor$SaveToSlot = function (a) {
	return {$: 37, a: a};
};
var $author$project$Pages$Editor$StartRenameSlot = function (a) {
	return {$: 40, a: a};
};
var $author$project$Pages$Editor$UpdateRenameDraft = function (a) {
	return {$: 41, a: a};
};
var $author$project$Pages$Editor$saveModal = F2(
	function (ctx, model) {
		var viewSlot = function (slot) {
			var slotTypeBadge = function () {
				var _v0 = slot.cj;
				if (!_v0.$) {
					if (!_v0.a) {
						var _v1 = _v0.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'padding', '2px 8px'),
									A2($elm$html$Html$Attributes$style, 'border-radius', '999px'),
									A2(
									$elm$html$Html$Attributes$style,
									'border',
									'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$interactiveBg(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
									A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
									A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 2))
								]));
					} else {
						var _v2 = _v0.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'padding', '2px 8px'),
									A2($elm$html$Html$Attributes$style, 'border-radius', '999px'),
									A2(
									$elm$html$Html$Attributes$style,
									'border',
									'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$interactiveBg(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
									A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
									A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 3))
								]));
					}
				} else {
					return $elm$html$Html$text('');
				}
			}();
			var renameInputWidth = $elm$core$String$fromInt(
				A2(
					$elm$core$Basics$max,
					10,
					$elm$core$String$length(model.af) + 2)) + 'ch';
			var isSaving = _Utils_eq(
				model.aE,
				$elm$core$Maybe$Just(slot.a4));
			var isDeleting = _Utils_eq(
				model.aN,
				$elm$core$Maybe$Just(slot.a4));
			var slotBackground = isSaving ? 'rgba(46, 204, 113, 0.12)' : (isDeleting ? 'rgba(231, 76, 60, 0.12)' : 'transparent');
			var slotOpacity = isDeleting ? '0.82' : '1';
			var slotTransform = isSaving ? 'translateY(-1px) scale(1.01)' : (isDeleting ? 'scale(0.985)' : 'scale(1)');
			var hasAutomaton = !$elm$core$String$isEmpty(slot.aZ);
			var slotLabel = hasAutomaton ? ($elm$core$String$isEmpty(slot.b3) ? '' : slot.b3) : A2($author$project$I18n$t, ctx.b, 63);
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$style,
						'border',
						'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
						A2($elm$html$Html$Attributes$style, 'padding', '10px'),
						A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
						A2($elm$html$Html$Attributes$style, 'background', slotBackground),
						A2($elm$html$Html$Attributes$style, 'transform', slotTransform),
						A2($elm$html$Html$Attributes$style, 'opacity', slotOpacity),
						A2($elm$html$Html$Attributes$style, 'transition', 'background 360ms ease, transform 360ms ease, opacity 360ms ease')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, ctx.b, 62) + (' ' + ($elm$core$String$fromInt(slot.a4) + ':')))
									])),
								_Utils_eq(
								model.ag,
								$elm$core$Maybe$Just(slot.a4)) ? A2(
								$elm$html$Html$input,
								_Utils_ap(
									_List_fromArray(
										[
											$elm$html$Html$Attributes$type_('text'),
											$elm$html$Html$Attributes$value(model.af),
											$elm$html$Html$Attributes$placeholder(
											A2($author$project$I18n$t, ctx.b, 59)),
											$elm$html$Html$Events$onInput($author$project$Pages$Editor$UpdateRenameDraft),
											A2($elm$html$Html$Attributes$style, 'width', renameInputWidth)
										]),
									$author$project$Pages$Editor$editorTextInputStyles(ctx.a)),
								_List_Nil) : A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(slotLabel)
									])),
								_Utils_eq(
								model.ag,
								$elm$core$Maybe$Just(slot.a4)) ? A2(
								$elm$html$Html$button,
								_Utils_ap(
									$author$project$Pages$Editor$editorButtonStyles(ctx.a),
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Pages$Editor$ConfirmRenameSlot(slot.a4)),
											$elm$html$Html$Attributes$title(
											A2($author$project$I18n$t, ctx.b, 60))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('✓')
									])) : A2(
								$elm$html$Html$button,
								_Utils_ap(
									$author$project$Pages$Editor$editorButtonStyles(ctx.a),
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Pages$Editor$StartRenameSlot(slot.a4)),
											$elm$html$Html$Attributes$title(
											A2($author$project$I18n$t, ctx.b, 59))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('✎')
									])),
								slotTypeBadge,
								_Utils_eq(
								model.aI,
								$elm$core$Maybe$Just(slot.a4)) ? A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$Attributes$style,
										'color',
										$author$project$Theme$successColor(ctx.a)),
										A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, ctx.b, 61))
									])) : $elm$html$Html$text('')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
								A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'gap', '8px'),
										A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
									]),
								A2(
									$elm$core$List$cons,
									A2(
										$elm$html$Html$button,
										_Utils_ap(
											$author$project$Pages$Editor$editorButtonStyles(ctx.a),
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick(
													$author$project$Pages$Editor$SaveToSlot(slot.a4))
												])),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, ctx.b, 52))
											])),
									hasAutomaton ? _List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$Editor$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$Editor$LoadFromSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 53))
												])),
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$Editor$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$Editor$DeleteFromSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 54))
												]))
										]) : _List_Nil)),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'gap', '8px'),
										A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
										A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
									]),
								_Utils_ap(
									hasAutomaton ? _List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$Editor$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$Editor$ExportSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 56))
												]))
										]) : _List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$Editor$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$Editor$ImportSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 55))
												]))
										])))
							]))
					]));
		};
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'inset', '0'),
					A2($elm$html$Html$Attributes$style, 'background', 'rgba(0,0,0,0.45)'),
					A2($elm$html$Html$Attributes$style, 'z-index', '2000'),
					$elm$html$Html$Events$onClick($author$project$Pages$Editor$CloseSaveModal)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'max-width', '740px'),
							A2($elm$html$Html$Attributes$style, 'margin', '40px auto'),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$Theme$panelBg(ctx.a)),
							A2(
							$elm$html$Html$Attributes$style,
							'color',
							$author$project$Theme$textColor(ctx.a)),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
							A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
							A2($elm$html$Html$Attributes$style, 'padding', '16px'),
							A2(
							$elm$html$Html$Events$stopPropagationOn,
							'click',
							$elm$json$Json$Decode$succeed(
								_Utils_Tuple2($author$project$Pages$Editor$NoOp, true)))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'margin-bottom', '10px'),
									A2($elm$html$Html$Attributes$style, 'min-height', '32px'),
									A2($elm$html$Html$Attributes$style, 'gap', '12px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'margin', '0')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 51))
										])),
									model.u ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', '#e74c3c'),
											A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
											A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
											A2($elm$html$Html$Attributes$style, 'max-width', '420px')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 58))
										])) : (model.K ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', '#e74c3c'),
											A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
											A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'right')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 57))
										])) : $elm$html$Html$text(''))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'grid'),
									A2($elm$html$Html$Attributes$style, 'grid-template-columns', '1fr'),
									A2($elm$html$Html$Attributes$style, 'gap', '10px')
								]),
							A2($elm$core$List$map, viewSlot, model.e)),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-top', '12px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_Utils_ap(
										$author$project$Pages$Editor$editorButtonStyles(ctx.a),
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Pages$Editor$CloseSaveModal)
											])),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 64))
										]))
								]))
						]))
				]));
	});
var $author$project$Pages$Editor$HandleShortcut = function (a) {
	return {$: 54, a: a};
};
var $author$project$Pages$Editor$ShortcutEvent = F5(
	function (code, shiftKey, altKey, metaKey, targetEditable) {
		return {aY: altKey, a$: code, b1: metaKey, a7: shiftKey, b9: targetEditable};
	});
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $author$project$Pages$Editor$shortcutEvent = A2(
	$elm$html$Html$Events$custom,
	'keydown',
	A2(
		$elm$json$Json$Decode$map,
		function (event) {
			var hasShortcut = (((!event.a7) && (event.aY && A2(
				$elm$core$List$member,
				event.a$,
				_List_fromArray(
					['Digit1', 'Digit2', 'Digit3', 'KeyS', 'KeyE', 'KeyN', 'KeyQ', 'KeyT'])))) || ((event.a7 && (event.aY && A2(
				$elm$core$List$member,
				event.a$,
				_List_fromArray(
					['KeyS', 'Enter', 'KeyN'])))) || (((!event.a7) && ((!event.aY) && (event.a$ === 'Delete'))) || ((!event.a7) && ((!event.aY) && (event.b1 && (event.a$ === 'Backspace'))))))) && (!event.b9);
			return {
				bo: $author$project$Pages$Editor$HandleShortcut(event),
				cv: hasShortcut,
				cE: hasShortcut
			};
		},
		A6(
			$elm$json$Json$Decode$map5,
			$author$project$Pages$Editor$ShortcutEvent,
			A2($elm$json$Json$Decode$field, 'code', $elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'altKey', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'metaKey', $elm$json$Json$Decode$bool),
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['target', 'isContentEditable']),
						$elm$json$Json$Decode$bool),
						A2(
						$elm$json$Json$Decode$map,
						function (tag) {
							var normalized = $elm$core$String$toLower(tag);
							return (normalized === 'input') || ((normalized === 'textarea') || (normalized === 'select'));
						},
						A2(
							$elm$json$Json$Decode$at,
							_List_fromArray(
								['target', 'tagName']),
							$elm$json$Json$Decode$string))
					])))));
var $author$project$I18n$EditorSimulation = 95;
var $author$project$I18n$EditorSimulationDelay = 97;
var $author$project$I18n$EditorSimulationInput = 96;
var $author$project$I18n$EditorSimulationStart = 99;
var $author$project$I18n$EditorSimulationStepBackward = 103;
var $author$project$I18n$EditorSimulationStepForward = 102;
var $author$project$I18n$EditorSimulationStepStart = 100;
var $author$project$I18n$EditorSimulationStop = 101;
var $author$project$Pages$Editor$SetSimulationDelay = function (a) {
	return {$: 22, a: a};
};
var $author$project$Pages$Editor$SetSimulationInput = function (a) {
	return {$: 21, a: a};
};
var $author$project$Pages$Editor$StartStepSimulation = {$: 27};
var $author$project$Pages$Editor$StepBackwardSimulation = {$: 30};
var $author$project$Pages$Editor$StepForwardSimulation = {$: 29};
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $author$project$Pages$Editor$activeSimulationHighlightFill = function (theme) {
	if (!theme) {
		return '#7aa2ff33';
	} else {
		return '#f8e71c30';
	}
};
var $author$project$Pages$Editor$activeSimulationHighlightStroke = function (theme) {
	if (!theme) {
		return '#245dff';
	} else {
		return '#ffd54f';
	}
};
var $author$project$Pages$Editor$simulationInputPreview = F2(
	function (theme, model) {
		var viewportTiles = 9;
		var tileWidthPx = 36;
		var tileGapPx = 6;
		var tileStepPx = tileWidthPx + tileGapPx;
		var viewportWidthPx = (viewportTiles * tileStepPx) - tileGapPx;
		var highlightedInputIndex = model.Q - 1;
		var targetShiftPx = A2($elm$core$Basics$max, 0, (highlightedInputIndex - 5) * tileStepPx);
		var currentMarkerIndex = ((!_Utils_eq(model.J, $elm$core$Maybe$Nothing)) && (!$elm$core$List$isEmpty(model.R))) ? highlightedInputIndex : (-1);
		var viewChar = F2(
			function (idx, _char) {
				var isCurrent = _Utils_eq(idx, currentMarkerIndex);
				var isConsumed = _Utils_cmp(idx, model.Q) < 0;
				return A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline-flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromInt(tileWidthPx) + 'px'),
							A2($elm$html$Html$Attributes$style, 'height', '24px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '6px'),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + (isCurrent ? $author$project$Pages$Editor$activeSimulationHighlightStroke(theme) : $author$project$Theme$interactiveBorder(theme))),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							isCurrent ? $author$project$Pages$Editor$activeSimulationHighlightFill(theme) : $author$project$Theme$interactiveBg(theme)),
							A2(
							$elm$html$Html$Attributes$style,
							'color',
							isCurrent ? $author$project$Pages$Editor$activeSimulationHighlightStroke(theme) : $author$project$Theme$textColor(theme)),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							isConsumed ? '0.55' : '1'),
							A2(
							$elm$html$Html$Attributes$style,
							'font-weight',
							isCurrent ? '700' : '500')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromChar(_char))
						]));
			});
		var chars = $elm$core$String$toList(model.aB);
		var contentChars = A2(
			$elm$core$Basics$max,
			1,
			$elm$core$List$length(chars));
		var totalWidthPx = (contentChars * tileStepPx) - tileGapPx;
		var maxShiftPx = A2($elm$core$Basics$max, 0, totalWidthPx - viewportWidthPx);
		var shiftPx = A2($elm$core$Basics$min, maxShiftPx, targetShiftPx);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-top', '12px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
					A2($elm$html$Html$Attributes$style, 'font-size', '15px'),
					A2($elm$html$Html$Attributes$style, 'line-height', '24px'),
					A2($elm$html$Html$Attributes$style, 'height', '34px'),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
					A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$interactiveBg(theme)),
					A2($elm$html$Html$Attributes$style, 'padding', '4px 8px')
				]),
			$elm$core$List$isEmpty(chars) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline-flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromInt(tileWidthPx) + 'px'),
							A2($elm$html$Html$Attributes$style, 'height', '24px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '6px'),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$Theme$interactiveBg(theme)),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.7'),
							A2($elm$html$Html$Attributes$style, 'font-style', 'italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('λ')
						]))
				]) : _List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline-flex'),
							A2(
							$elm$html$Html$Attributes$style,
							'gap',
							$elm$core$String$fromInt(tileGapPx) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'transform',
							'translateX(-' + ($elm$core$String$fromInt(shiftPx) + 'px)')),
							A2($elm$html$Html$Attributes$style, 'transition', 'transform 220ms ease')
						]),
					A2($elm$core$List$indexedMap, viewChar, chars))
				]));
	});
var $author$project$Pages$Editor$clampInt = F3(
	function (low, high, value) {
		return (_Utils_cmp(value, low) < 0) ? low : ((_Utils_cmp(value, high) > 0) ? high : value);
	});
var $author$project$Pages$Editor$simulationInputWidthCh = function (inputValue) {
	return A3(
		$author$project$Pages$Editor$clampInt,
		18,
		110,
		$elm$core$String$length(inputValue) + 6);
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Pages$Editor$simulationSpeedIndexFromDelay = function (rawDelay) {
	var delay = $elm$core$Basics$round(
		$author$project$Pages$Editor$parseDelay(rawDelay));
	var pickNearest = F2(
		function (current, best) {
			pickNearest:
			while (true) {
				if (!current.b) {
					return best;
				} else {
					var _v1 = current.a;
					var index = _v1.a;
					var candidate = _v1.b;
					var rest = current.b;
					if (_Utils_cmp(
						$elm$core$Basics$abs(delay - candidate),
						$elm$core$Basics$abs(delay - best.b)) < 0) {
						var $temp$current = rest,
							$temp$best = _Utils_Tuple2(index, candidate);
						current = $temp$current;
						best = $temp$best;
						continue pickNearest;
					} else {
						var $temp$current = rest,
							$temp$best = best;
						current = $temp$current;
						best = $temp$best;
						continue pickNearest;
					}
				}
			}
		});
	var _v2 = A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, $author$project$Pages$Editor$simulationSpeedStops);
	if (!_v2.b) {
		return 2;
	} else {
		var first = _v2.a;
		var rest = _v2.b;
		return A2(pickNearest, rest, first).a;
	}
};
var $author$project$I18n$EditorSimulationRunning = 105;
var $author$project$Pages$Editor$simulationStatus = F2(
	function (lang, result) {
		switch (result) {
			case 0:
				return $elm$core$Maybe$Nothing;
			case 1:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 105),
						'#2980b9'));
			case 2:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 106),
						'#2ecc71'));
			case 3:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 107),
						'#e67e22'));
			case 4:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 108),
						'#e74c3c'));
			default:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 109),
						'#e74c3c'));
		}
	});
var $elm$html$Html$Attributes$step = function (n) {
	return A2($elm$html$Html$Attributes$stringProperty, 'step', n);
};
var $author$project$Pages$Editor$simulationPanel = F2(
	function (ctx, model) {
		var speedIndex = $author$project$Pages$Editor$simulationSpeedIndexFromDelay(model.aA);
		var simulationLocked = $author$project$Pages$Editor$simulationSessionActive(model) || $author$project$Pages$Editor$hasCodeValidationErrors(model);
		var inputWidthCh = $author$project$Pages$Editor$simulationInputWidthCh(model.aB);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$panelBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '14px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'flex-shrink', '0')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '10px'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin', '0'),
									A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
									A2($elm$html$Html$Attributes$style, 'min-width', '130px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 95))
								])),
							A2(
							$elm$html$Html$textarea,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$rows(1),
									$elm$html$Html$Attributes$id('simulation-input-field'),
									$elm$html$Html$Attributes$placeholder(
									A2($author$project$I18n$t, ctx.b, 96)),
									$elm$html$Html$Attributes$value(model.aB),
									$elm$html$Html$Events$onInput($author$project$Pages$Editor$SetSimulationInput),
									$elm$html$Html$Attributes$disabled(simulationLocked),
									A2($elm$html$Html$Attributes$style, 'min-width', '170px'),
									A2(
									$elm$html$Html$Attributes$style,
									'width',
									'min(' + ($elm$core$String$fromInt(inputWidthCh) + 'ch, 92vw)')),
									A2($elm$html$Html$Attributes$style, 'max-width', '100%'),
									A2($elm$html$Html$Attributes$style, 'height', '32px'),
									A2($elm$html$Html$Attributes$style, 'min-height', '32px'),
									A2($elm$html$Html$Attributes$style, 'max-height', '120px'),
									A2($elm$html$Html$Attributes$style, 'padding', '6px 12px'),
									A2($elm$html$Html$Attributes$style, 'line-height', '16px'),
									A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
									A2($elm$html$Html$Attributes$style, 'resize', 'none'),
									A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$interactiveBg(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'color',
									$author$project$Theme$textColor(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
									A2(
									$elm$html$Html$Attributes$style,
									'border',
									'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
									A2($elm$html$Html$Attributes$style, 'outline', 'none')
								]),
							_List_Nil),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
									A2($elm$html$Html$Attributes$style, 'gap', '4px'),
									A2($elm$html$Html$Attributes$style, 'min-width', '170px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$input,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$type_('range'),
											$elm$html$Html$Attributes$min('0'),
											$elm$html$Html$Attributes$max('4'),
											$elm$html$Html$Attributes$step('1'),
											$elm$html$Html$Attributes$value(
											$elm$core$String$fromInt(speedIndex)),
											$elm$html$Html$Events$onInput($author$project$Pages$Editor$SetSimulationDelay),
											$elm$html$Html$Attributes$disabled(simulationLocked),
											A2($elm$html$Html$Attributes$style, 'width', '100%')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
											A2($elm$html$Html$Attributes$style, 'opacity', '0.85')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 97) + (': ' + (model.aA + ' ms')))
										]))
								])),
							function () {
							var _v0 = model.aj;
							if (_v0.$ === 1) {
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'gap', '8px'),
											A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$Editor$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick($author$project$Pages$Editor$StartSimulation),
														$elm$html$Html$Attributes$disabled(simulationLocked),
														A2($elm$html$Html$Attributes$style, 'height', '36px')
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 99))
												])),
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$Editor$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick($author$project$Pages$Editor$StartStepSimulation),
														$elm$html$Html$Attributes$disabled(simulationLocked),
														A2($elm$html$Html$Attributes$style, 'height', '36px')
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 100))
												]))
										]));
							} else {
								if (!_v0.a) {
									var _v1 = _v0.a;
									return A2(
										$elm$html$Html$button,
										_Utils_ap(
											$author$project$Pages$Editor$editorButtonStyles(ctx.a),
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick($author$project$Pages$Editor$StopSimulation),
													A2($elm$html$Html$Attributes$style, 'height', '36px')
												])),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, ctx.b, 101))
											]));
								} else {
									var _v2 = _v0.a;
									return A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'display', 'flex'),
												A2($elm$html$Html$Attributes$style, 'gap', '8px'),
												A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$button,
												_Utils_ap(
													$author$project$Pages$Editor$editorButtonStyles(ctx.a),
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Pages$Editor$StopSimulation),
															A2($elm$html$Html$Attributes$style, 'height', '36px')
														])),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 101))
													])),
												A2(
												$elm$html$Html$button,
												_Utils_ap(
													$author$project$Pages$Editor$editorButtonStyles(ctx.a),
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Pages$Editor$StepForwardSimulation),
															$elm$html$Html$Attributes$disabled(
															_Utils_eq(model.J, $elm$core$Maybe$Nothing)),
															A2($elm$html$Html$Attributes$style, 'height', '36px')
														])),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 102))
													])),
												A2(
												$elm$html$Html$button,
												_Utils_ap(
													$author$project$Pages$Editor$editorButtonStyles(ctx.a),
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Pages$Editor$StepBackwardSimulation),
															$elm$html$Html$Attributes$disabled(
															$elm$core$List$isEmpty(model.av)),
															A2($elm$html$Html$Attributes$style, 'height', '36px')
														])),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 103))
													]))
											]));
								}
							}
						}(),
							function () {
							var _v3 = A2($author$project$Pages$Editor$simulationStatus, ctx.b, model.S);
							if (_v3.$ === 1) {
								return $elm$html$Html$text('');
							} else {
								var _v4 = _v3.a;
								var msg = _v4.a;
								var color = _v4.b;
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', color),
											A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
											A2($elm$html$Html$Attributes$style, 'margin-right', 'auto'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
											A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
											A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(msg)
										]));
							}
						}()
						])),
					A2($author$project$Pages$Editor$simulationInputPreview, ctx.a, model)
				]));
	});
var $author$project$Pages$Editor$CanvasMouseDown = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $author$project$Pages$Editor$CanvasMouseUp = function (a) {
	return {$: 2, a: a};
};
var $author$project$Pages$Editor$MovePointer = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Pages$Editor$ZoomIn = {$: 25};
var $author$project$Pages$Editor$ZoomOut = {$: 24};
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$marker = $elm$svg$Svg$trustedNode('marker');
var $elm$svg$Svg$Attributes$markerHeight = _VirtualDom_attribute('markerHeight');
var $elm$svg$Svg$Attributes$markerUnits = _VirtualDom_attribute('markerUnits');
var $elm$svg$Svg$Attributes$markerWidth = _VirtualDom_attribute('markerWidth');
var $elm$svg$Svg$Attributes$orient = _VirtualDom_attribute('orient');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$refX = _VirtualDom_attribute('refX');
var $elm$svg$Svg$Attributes$refY = _VirtualDom_attribute('refY');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$Pages$Editor$arrowMarker = function (color) {
	return A2(
		$elm$svg$Svg$marker,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$id('arrowhead'),
				$elm$svg$Svg$Attributes$markerWidth('10'),
				$elm$svg$Svg$Attributes$markerHeight('7'),
				$elm$svg$Svg$Attributes$viewBox('0 0 10 7'),
				$elm$svg$Svg$Attributes$refX('10'),
				$elm$svg$Svg$Attributes$refY('3.5'),
				$elm$svg$Svg$Attributes$orient('auto'),
				$elm$svg$Svg$Attributes$markerUnits('strokeWidth')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M0,0 L0,7 L10,3.5 z'),
						$elm$svg$Svg$Attributes$fill(color)
					]),
				_List_Nil)
			]));
};
var $author$project$Pages$Editor$canvasControlButtonAttrs = function (theme) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'height', '34px'),
			A2($elm$html$Html$Attributes$style, 'padding', '0 12px'),
			A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
			A2(
			$elm$html$Html$Attributes$style,
			'border',
			'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			$author$project$Theme$interactiveBg(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'color',
			$author$project$Theme$textColor(theme)),
			A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
			A2($elm$html$Html$Attributes$style, 'line-height', '1'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2(
			$elm$html$Html$Attributes$style,
			'box-shadow',
			$author$project$Theme$hoverShadow(theme))
		]);
};
var $author$project$Pages$Editor$canvasIconButtonAttrs = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'width', '34px'),
		A2($elm$html$Html$Attributes$style, 'padding', '0'),
		A2($elm$html$Html$Attributes$style, 'font-size', '18px')
	]);
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Events$on = $elm$html$Html$Events$on;
var $author$project$Pages$Editor$ChooseSimulationTransition = function (a) {
	return {$: 31, a: a};
};
var $author$project$I18n$EditorSimulationChoiceBody = 112;
var $author$project$I18n$EditorSimulationChoiceTitle = 111;
var $author$project$Pages$Editor$simulationChoiceOverlay = F2(
	function (ctx, model) {
		var _v0 = model.P;
		if (_v0.$ === 1) {
			return $elm$html$Html$text('');
		} else {
			var choice = _v0.a;
			var _v1 = A2($author$project$Pages$Editor$getStateById, choice.bQ, model.c);
			if (_v1.$ === 1) {
				return $elm$html$Html$text('');
			} else {
				var state = _v1.a;
				var transitionButton = function (transition) {
					return A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Pages$Editor$ChooseSimulationTransition(transition.a4)),
								A2($elm$html$Html$Attributes$style, 'display', 'block'),
								A2($elm$html$Html$Attributes$style, 'width', '100%'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '6px'),
								A2($elm$html$Html$Attributes$style, 'text-align', 'left')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$Pages$Editor$stateNameById, model.c, transition.f) + (' → ' + (A2($author$project$Pages$Editor$stateNameById, model.c, transition.g) + (' [' + (transition.i + ']')))))
							]));
				};
				var relatedTransitions = A2(
					$elm$core$List$filter,
					function (transition) {
						return A2($elm$core$List$member, transition.a4, choice.al);
					},
					model.d);
				var popupWidth = 280;
				var popupGap = 24;
				var layout = $author$project$Pages$Editor$editorLayout(model);
				var leftPos = function () {
					var maxCanvasLeft = (layout.bh - popupWidth) - 8;
					var desiredLeft = ((((state.j * model.D) + model.U) - popupWidth) - popupGap) - 60;
					return A2($elm$core$Basics$min, maxCanvasLeft, desiredLeft);
				}();
				var topPos = A2(
					$elm$core$Basics$max,
					8,
					A2($elm$core$Basics$min, layout.bg - 170, ((state.k * model.D) + model.V) - 30));
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat(leftPos) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(topPos) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$Theme$panelBg(ctx.a)),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
							A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
							A2($elm$html$Html$Attributes$style, 'padding', '10px'),
							A2($elm$html$Html$Attributes$style, 'width', '280px'),
							A2($elm$html$Html$Attributes$style, 'box-shadow', '0 10px 24px rgba(0,0,0,0.25)'),
							A2($elm$html$Html$Attributes$style, 'z-index', '12')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 111))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-top', '4px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 112) + (' ' + ($author$project$Pages$Editor$stateDisplayName(state) + (', ' + (A2($author$project$I18n$t, ctx.b, 73) + (': ' + choice.bK))))))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-top', '8px')
								]),
							A2($elm$core$List$map, transitionButton, relatedTransitions)),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
									A2($elm$html$Html$Attributes$style, 'right', '-5px'),
									A2($elm$html$Html$Attributes$style, 'top', '38px'),
									A2($elm$html$Html$Attributes$style, 'width', '10px'),
									A2($elm$html$Html$Attributes$style, 'height', '10px'),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$panelBg(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'border-right',
									'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'border-top',
									'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'transform', 'rotate(45deg)')
								]),
							_List_Nil)
						]));
			}
		}
	});
var $author$project$Pages$Editor$startArrowMarker = function (color) {
	return A2(
		$elm$svg$Svg$marker,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$id('start-arrow'),
				$elm$svg$Svg$Attributes$markerWidth('14'),
				$elm$svg$Svg$Attributes$markerHeight('14'),
				$elm$svg$Svg$Attributes$viewBox('0 0 14 14'),
				$elm$svg$Svg$Attributes$refX('14'),
				$elm$svg$Svg$Attributes$refY('7'),
				$elm$svg$Svg$Attributes$orient('auto'),
				$elm$svg$Svg$Attributes$markerUnits('strokeWidth')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M0,0 L0,14 L14,7 z'),
						$elm$svg$Svg$Attributes$fill(color)
					]),
				_List_Nil)
			]));
};
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $author$project$Pages$Editor$DoubleClickState = function (a) {
	return {$: 4, a: a};
};
var $author$project$Pages$Editor$SelectState = function (a) {
	return {$: 5, a: a};
};
var $author$project$Pages$Editor$StartDrag = function (a) {
	return {$: 3, a: a};
};
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$Attributes$markerEnd = _VirtualDom_attribute('marker-end');
var $elm$svg$Svg$Attributes$pointerEvents = _VirtualDom_attribute('pointer-events');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $author$project$Pages$Editor$viewState = F3(
	function (ctx, model, s) {
		var strokeColor = s.E ? $author$project$Theme$successColor(ctx.a) : $author$project$Theme$textColor(ctx.a);
		var stateLabel = $author$project$Pages$Editor$stateDisplayName(s);
		var r = 22;
		var startIndicator = s.M ? _List_fromArray(
			[
				A2(
				$elm$svg$Svg$line,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x1(
						$elm$core$String$fromFloat(s.j - 64)),
						$elm$svg$Svg$Attributes$y1(
						$elm$core$String$fromFloat(s.k)),
						$elm$svg$Svg$Attributes$x2(
						$elm$core$String$fromFloat(s.j - (r + 6))),
						$elm$svg$Svg$Attributes$y2(
						$elm$core$String$fromFloat(s.k)),
						$elm$svg$Svg$Attributes$stroke(
						$author$project$Theme$textColor(ctx.a)),
						$elm$svg$Svg$Attributes$strokeWidth('3'),
						$elm$svg$Svg$Attributes$markerEnd('url(#start-arrow)'),
						$elm$svg$Svg$Attributes$pointerEvents('none')
					]),
				_List_Nil)
			]) : _List_Nil;
		var isSelected = _Utils_eq(
			model.h,
			$elm$core$Maybe$Just(s.a4));
		var strokeWidth = isSelected ? '3' : '2';
		var fillColor = function () {
			var _v4 = _Utils_Tuple2(ctx.a, s.M);
			if (!_v4.a) {
				if (_v4.b) {
					var _v5 = _v4.a;
					return '#ffd84d';
				} else {
					var _v7 = _v4.a;
					return '#ffffff';
				}
			} else {
				if (_v4.b) {
					var _v6 = _v4.a;
					return '#3d3316';
				} else {
					var _v8 = _v4.a;
					return '#1d2433';
				}
			}
		}();
		var _v0 = function () {
			var _v1 = ctx.a;
			if (!_v1) {
				return _Utils_Tuple2('#7aa2ff33', '#7aa2ff');
			} else {
				return _Utils_Tuple2('#f8e71c30', '#f5a623');
			}
		}();
		var highlightFill = _v0.a;
		var highlightStroke = _v0.b;
		var highlight = isSelected ? _List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(s.j)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(s.k)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromInt(r + 4)),
						$elm$svg$Svg$Attributes$fill(highlightFill),
						$elm$svg$Svg$Attributes$stroke(highlightStroke),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$pointerEvents('none')
					]),
				_List_Nil)
			]) : _List_Nil;
		return A2(
			$elm$svg$Svg$g,
			_List_Nil,
			_Utils_ap(
				startIndicator,
				_Utils_ap(
					highlight,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$circle,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$cx(
									$elm$core$String$fromFloat(s.j)),
									$elm$svg$Svg$Attributes$cy(
									$elm$core$String$fromFloat(s.k)),
									$elm$svg$Svg$Attributes$r(
									$elm$core$String$fromInt(r)),
									$elm$svg$Svg$Attributes$fill(fillColor),
									$elm$svg$Svg$Attributes$stroke(strokeColor),
									$elm$svg$Svg$Attributes$strokeWidth(strokeWidth),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'mousedown',
									A4(
										$elm$json$Json$Decode$map3,
										F3(
											function (button, _v2, _v3) {
												return (!button) ? _Utils_Tuple2(
													$author$project$Pages$Editor$StartDrag(s.a4),
													true) : _Utils_Tuple2($author$project$Pages$Editor$NoOp, true);
											}),
										A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int),
										A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$int),
										A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$int))),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'dblclick',
									A2(
										$elm$json$Json$Decode$map,
										function (button) {
											return (!button) ? _Utils_Tuple2(
												$author$project$Pages$Editor$DoubleClickState(s.a4),
												true) : _Utils_Tuple2($author$project$Pages$Editor$NoOp, true);
										},
										A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int))),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'click',
									A2(
										$elm$json$Json$Decode$map,
										function (button) {
											return (!button) ? _Utils_Tuple2(
												$author$project$Pages$Editor$SelectState(s.a4),
												true) : _Utils_Tuple2($author$project$Pages$Editor$NoOp, true);
										},
										A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int)))
								]),
							_List_Nil),
							s.E ? A2(
							$elm$svg$Svg$circle,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$cx(
									$elm$core$String$fromFloat(s.j)),
									$elm$svg$Svg$Attributes$cy(
									$elm$core$String$fromFloat(s.k)),
									$elm$svg$Svg$Attributes$r(
									$elm$core$String$fromInt(r - 6)),
									$elm$svg$Svg$Attributes$fill('none'),
									$elm$svg$Svg$Attributes$stroke(strokeColor),
									$elm$svg$Svg$Attributes$strokeWidth('2'),
									$elm$svg$Svg$Attributes$pointerEvents('none')
								]),
							_List_Nil) : A2($elm$svg$Svg$text_, _List_Nil, _List_Nil),
							A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromFloat(
										s.j - ($elm$core$String$length(stateLabel) * 3.5))),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromFloat(s.k + 6)),
									$elm$svg$Svg$Attributes$fontSize('14'),
									$elm$svg$Svg$Attributes$fill(
									$author$project$Theme$textColor(ctx.a)),
									$elm$svg$Svg$Attributes$style('user-select: none; -webkit-user-select: none; -moz-user-select: none;'),
									$elm$svg$Svg$Attributes$pointerEvents('none')
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(stateLabel)
								]))
						]))));
	});
var $author$project$Pages$Editor$SelectTransition = function (a) {
	return {$: 6, a: a};
};
var $elm$core$Basics$atan2 = _Basics_atan2;
var $elm$svg$Svg$Attributes$dominantBaseline = _VirtualDom_attribute('dominant-baseline');
var $elm$core$Basics$pi = _Basics_pi;
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $author$project$Pages$Editor$transitionLabelsToText = function (labels) {
	return A2(
		$elm$core$String$join,
		', ',
		A2(
			$elm$core$List$map,
			function (label) {
				return $author$project$Pages$Editor$isLambdaLabel(label) ? 'λ' : label;
			},
			$author$project$Pages$Editor$uniqueLabels(labels)));
};
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$Pages$Editor$viewTransition = F3(
	function (ctx, model, transitionGroup) {
		var _v0 = _Utils_Tuple2(
			A2($author$project$Pages$Editor$getStateById, transitionGroup.f, model.c),
			A2($author$project$Pages$Editor$getStateById, transitionGroup.g, model.c));
		if ((!_v0.a.$) && (!_v0.b.$)) {
			var a = _v0.a.a;
			var b = _v0.b.a;
			var shownLabel = $author$project$Pages$Editor$transitionLabelsToText(transitionGroup.a5);
			var selfLoop = _Utils_eq(transitionGroup.f, transitionGroup.g);
			var selectTransitionOnClick = A2(
				$elm$html$Html$Events$stopPropagationOn,
				'click',
				A2(
					$elm$json$Json$Decode$map,
					function (button) {
						return (!button) ? _Utils_Tuple2(
							$author$project$Pages$Editor$SelectTransition(transitionGroup.b6),
							true) : _Utils_Tuple2($author$project$Pages$Editor$NoOp, true);
					},
					A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int)));
			var r = 22;
			var oppositeTransitionExists = (!_Utils_eq(transitionGroup.f, transitionGroup.g)) && A2(
				$elm$core$List$any,
				function (t) {
					return _Utils_eq(t.f, transitionGroup.g) && _Utils_eq(t.g, transitionGroup.f);
				},
				model.d);
			var labelLift = 18;
			var isSelected = function () {
				var _v3 = model.s;
				if (_v3.$ === 1) {
					return false;
				} else {
					var selectedId = _v3.a;
					return A2($elm$core$List$member, selectedId, transitionGroup.al);
				}
			}();
			var isActiveTransition = function () {
				var _v2 = model.aa;
				if (_v2.$ === 1) {
					return false;
				} else {
					var activeId = _v2.a;
					return A2($elm$core$List$member, activeId, transitionGroup.al);
				}
			}();
			var labelBackground = isActiveTransition ? $author$project$Pages$Editor$activeSimulationHighlightFill(ctx.a) : 'transparent';
			var strokeWidth = isSelected ? '4' : (isActiveTransition ? '3' : '2');
			var transitionStrokeColor = isActiveTransition ? $author$project$Pages$Editor$activeSimulationHighlightStroke(ctx.a) : $author$project$Theme$textColor(ctx.a);
			var hitWidth = A2(
				$elm$core$Basics$max,
				24,
				$elm$core$String$length(shownLabel) * 9);
			var hitHeight = 18;
			var curveOffset = 42;
			var _v1 = _Utils_Tuple2(b.j - a.j, b.k - a.k);
			var dx = _v1.a;
			var dy = _v1.b;
			var dist = $elm$core$Basics$sqrt((dx * dx) + (dy * dy));
			var safe = (dist < 0.001) ? 0.001 : dist;
			var ux = dx / safe;
			var endX = selfLoop ? (b.j - 18) : (b.j - (ux * (r + 6)));
			var rightY = ux;
			var labelNormalY = (rightY <= 0) ? rightY : (-rightY);
			var startX = selfLoop ? (a.j + 18) : (a.j + (ux * r));
			var lineAngleDeg = function () {
				if (selfLoop) {
					return -25;
				} else {
					var rawAngleDeg = (A2($elm$core$Basics$atan2, dy, dx) * 180) / $elm$core$Basics$pi;
					return (rawAngleDeg > 90) ? (rawAngleDeg - 180) : ((_Utils_cmp(rawAngleDeg, -90) < 0) ? (rawAngleDeg + 180) : rawAngleDeg);
				}
			}();
			var uy = dy / safe;
			var endY = selfLoop ? (b.k - 22) : (b.k - (uy * (r + 6)));
			var rightX = -uy;
			var controlX = ((startX + endX) / 2) + (rightX * curveOffset);
			var baseLabelX = selfLoop ? (a.j + 2) : (oppositeTransitionExists ? ((((0.25 * startX) + (0.5 * controlX)) + (0.25 * endX)) + (rightX * 14)) : ((startX + endX) / 2));
			var labelNormalX = (rightY <= 0) ? rightX : (-rightX);
			var labelX = selfLoop ? baseLabelX : (baseLabelX + (labelNormalX * labelLift));
			var startY = selfLoop ? (a.k - 22) : (a.k + (uy * r));
			var controlY = ((startY + endY) / 2) + (rightY * curveOffset);
			var baseLabelY = selfLoop ? (a.k - 72) : (oppositeTransitionExists ? ((((0.25 * startY) + (0.5 * controlY)) + (0.25 * endY)) + (rightY * 14)) : ((startY + endY) / 2));
			var labelY = selfLoop ? baseLabelY : (baseLabelY + (labelNormalY * labelLift));
			var labelRotation = 'rotate(' + ($elm$core$String$fromFloat(lineAngleDeg) + (' ' + ($elm$core$String$fromFloat(labelX) + (' ' + ($elm$core$String$fromFloat(labelY) + ')')))));
			var pathD = selfLoop ? ('M ' + ($elm$core$String$fromFloat(startX) + (' ' + ($elm$core$String$fromFloat(startY) + (' C ' + ($elm$core$String$fromFloat(a.j + 40) + (' ' + ($elm$core$String$fromFloat(a.k - 64) + (', ' + ($elm$core$String$fromFloat(a.j - 40) + (' ' + ($elm$core$String$fromFloat(a.k - 64) + (', ' + ($elm$core$String$fromFloat(endX) + (' ' + $elm$core$String$fromFloat(endY)))))))))))))))) : (oppositeTransitionExists ? ('M ' + ($elm$core$String$fromFloat(startX) + (' ' + ($elm$core$String$fromFloat(startY) + (' Q ' + ($elm$core$String$fromFloat(controlX) + (' ' + ($elm$core$String$fromFloat(controlY) + (' ' + ($elm$core$String$fromFloat(endX) + (' ' + $elm$core$String$fromFloat(endY)))))))))))) : ('M ' + ($elm$core$String$fromFloat(startX) + (' ' + ($elm$core$String$fromFloat(startY) + (' L ' + ($elm$core$String$fromFloat(endX) + (' ' + $elm$core$String$fromFloat(endY)))))))));
			return A2(
				$elm$svg$Svg$g,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$d(pathD),
								$elm$svg$Svg$Attributes$stroke('transparent'),
								$elm$svg$Svg$Attributes$strokeWidth('10'),
								$elm$svg$Svg$Attributes$fill('none'),
								selectTransitionOnClick
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$d(pathD),
								$elm$svg$Svg$Attributes$stroke(transitionStrokeColor),
								$elm$svg$Svg$Attributes$strokeWidth(strokeWidth),
								$elm$svg$Svg$Attributes$markerEnd('url(#arrowhead)'),
								$elm$svg$Svg$Attributes$fill('none'),
								$elm$svg$Svg$Attributes$pointerEvents('none')
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$rect,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$x(
								$elm$core$String$fromFloat(labelX - (hitWidth / 2))),
								$elm$svg$Svg$Attributes$y(
								$elm$core$String$fromFloat(labelY - (hitHeight / 2))),
								$elm$svg$Svg$Attributes$width(
								$elm$core$String$fromFloat(hitWidth)),
								$elm$svg$Svg$Attributes$height(
								$elm$core$String$fromFloat(hitHeight)),
								$elm$svg$Svg$Attributes$fill(labelBackground),
								$elm$svg$Svg$Attributes$stroke('none'),
								$elm$svg$Svg$Attributes$transform(labelRotation),
								selectTransitionOnClick
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$text_,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$x(
								$elm$core$String$fromFloat(labelX)),
								$elm$svg$Svg$Attributes$y(
								$elm$core$String$fromFloat(labelY)),
								$elm$svg$Svg$Attributes$textAnchor('middle'),
								$elm$svg$Svg$Attributes$dominantBaseline('middle'),
								$elm$svg$Svg$Attributes$fontSize('12'),
								$elm$svg$Svg$Attributes$fill(transitionStrokeColor),
								$elm$svg$Svg$Attributes$transform(labelRotation),
								$elm$svg$Svg$Attributes$style('user-select: none; -webkit-user-select: none; -moz-user-select: none;'),
								$elm$svg$Svg$Attributes$pointerEvents('none')
							]),
						_List_fromArray(
							[
								$elm$svg$Svg$text(shownLabel)
							]))
					]));
		} else {
			return A2($elm$svg$Svg$text_, _List_Nil, _List_Nil);
		}
	});
var $author$project$Pages$Editor$WheelPan = F2(
	function (a, b) {
		return {$: 32, a: a, b: b};
	});
var $author$project$Pages$Editor$wheelPanEvent = A2(
	$elm$html$Html$Events$custom,
	'wheel',
	A2(
		$elm$json$Json$Decode$map,
		function (msg) {
			return {bo: msg, cv: true, cE: false};
		},
		A3(
			$elm$json$Json$Decode$map2,
			$author$project$Pages$Editor$WheelPan,
			A2($elm$json$Json$Decode$field, 'deltaX', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'deltaY', $elm$json$Json$Decode$float))));
var $author$project$Pages$Editor$svgView = F4(
	function (ctx, model, _v0, _v1) {
		var cursor = function () {
			var _v2 = model.z;
			switch (_v2) {
				case 0:
					return 'crosshair';
				case 1:
					return 'pointer';
				default:
					return 'move';
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'flex', '1'),
					A2($elm$html$Html$Attributes$style, 'min-height', '0'),
					$author$project$Pages$Editor$wheelPanEvent
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width('100%'),
							$elm$svg$Svg$Attributes$height('100%'),
							$elm$svg$Svg$Attributes$style(
							'border:1px solid ' + ($author$project$Theme$panelBorder(ctx.a) + ('; background:' + (((ctx.a === 1) ? '#0b1320' : '#f8f9fb') + ('; cursor: ' + (cursor + '; user-select: none; -webkit-user-select: none; -moz-user-select: none;')))))),
							A2(
							$elm$svg$Svg$Events$on,
							'mousedown',
							A5(
								$elm$json$Json$Decode$map4,
								F4(
									function (tag, button, x, y) {
										return A4(
											$author$project$Pages$Editor$CanvasMouseDown,
											$elm$core$String$toLower(tag),
											button,
											x,
											y);
									}),
								A2(
									$elm$json$Json$Decode$at,
									_List_fromArray(
										['target', 'tagName']),
									$elm$json$Json$Decode$string),
								A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int),
								A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$int),
								A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$int))),
							A2(
							$elm$svg$Svg$Events$on,
							'mousemove',
							A3(
								$elm$json$Json$Decode$map2,
								F2(
									function (x, y) {
										return A2($author$project$Pages$Editor$MovePointer, x, y);
									}),
								A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$int),
								A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$int))),
							A2(
							$elm$svg$Svg$Events$on,
							'mouseup',
							A2(
								$elm$json$Json$Decode$map,
								$author$project$Pages$Editor$CanvasMouseUp,
								A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int)))
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$defs,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Pages$Editor$arrowMarker(
									$author$project$Theme$textColor(ctx.a)),
									$author$project$Pages$Editor$startArrowMarker(
									$author$project$Theme$textColor(ctx.a))
								])),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromFloat(model.U) + (',' + ($elm$core$String$fromFloat(model.V) + (') scale(' + ($elm$core$String$fromFloat(model.D) + ')'))))))
								]),
							$elm$core$List$concat(
								_List_fromArray(
									[
										A2(
										$elm$core$List$map,
										A2($author$project$Pages$Editor$viewTransition, ctx, model),
										$author$project$Pages$Editor$groupTransitionsForRender(model.d)),
										A2(
										$elm$core$List$map,
										A2($author$project$Pages$Editor$viewState, ctx, model),
										model.c)
									])))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'top', '10px'),
							A2($elm$html$Html$Attributes$style, 'right', '10px'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '6px'),
							A2($elm$html$Html$Attributes$style, 'z-index', '11')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$Editor$canvasControlButtonAttrs(ctx.a),
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$Editor$CenterOnStartState)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 98))
								])),
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$Editor$canvasControlButtonAttrs(ctx.a),
								_Utils_ap(
									$author$project$Pages$Editor$canvasIconButtonAttrs,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Pages$Editor$ZoomOut)
										]))),
							_List_fromArray(
								[
									$elm$html$Html$text('-')
								])),
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$Editor$canvasControlButtonAttrs(ctx.a),
								_Utils_ap(
									$author$project$Pages$Editor$canvasIconButtonAttrs,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Pages$Editor$ZoomIn)
										]))),
							_List_fromArray(
								[
									$elm$html$Html$text('+')
								]))
						])),
					A2($author$project$Pages$Editor$simulationChoiceOverlay, ctx, model)
				]));
	});
var $author$project$Pages$Editor$CodeEdited = function (a) {
	return {$: 17, a: a};
};
var $author$project$I18n$EditorCodeDraftChanges = 36;
var $author$project$I18n$EditorCodeValidationLinePrefix = 37;
var $author$project$I18n$EditorExport = 49;
var $author$project$I18n$EditorImport = 48;
var $author$project$I18n$EditorTransitionFunction = 35;
var $author$project$Pages$Editor$ExportCode = {$: 16};
var $author$project$Pages$Editor$ImportCode = {$: 15};
var $author$project$Pages$Editor$SetCodeEditorFocused = function (a) {
	return {$: 19, a: a};
};
var $author$project$Pages$Editor$activeTransitionLineFromIds = F3(
	function (target, ids, currentLine) {
		activeTransitionLineFromIds:
		while (true) {
			if (!ids.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var id_ = ids.a;
				var rest = ids.b;
				if (_Utils_eq(id_, target)) {
					return $elm$core$Maybe$Just(currentLine);
				} else {
					var $temp$target = target,
						$temp$ids = rest,
						$temp$currentLine = currentLine + 1;
					target = $temp$target;
					ids = $temp$ids;
					currentLine = $temp$currentLine;
					continue activeTransitionLineFromIds;
				}
			}
		}
	});
var $author$project$Pages$Editor$activeTransitionLine = function (model) {
	return A2(
		$elm$core$Maybe$andThen,
		function (activeId) {
			return A3(
				$author$project$Pages$Editor$activeTransitionLineFromIds,
				activeId,
				A2(
					$elm$core$List$map,
					function ($) {
						return $.a4;
					},
					A2(
						$elm$core$List$sortBy,
						function ($) {
							return $.a4;
						},
						model.d)),
				1);
		},
		model.aa);
};
var $author$project$Pages$Editor$CodeEditorScrolled = F2(
	function (a, b) {
		return {$: 20, a: a, b: b};
	});
var $author$project$Pages$Editor$codeEditorScrollEvent = A2(
	$elm$html$Html$Events$on,
	'scroll',
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$Pages$Editor$CodeEditorScrolled,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['target', 'scrollTop']),
			$elm$json$Json$Decode$float),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['target', 'scrollLeft']),
			$elm$json$Json$Decode$float)));
var $elm$html$Html$Events$onBlur = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'blur',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onFocus = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'focus',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $author$project$Pages$Editor$transitionFunctionPanel = F2(
	function (ctx, model) {
		var transitionFunctionValue = (model.ab || $author$project$Pages$Editor$hasCodeValidationErrors(model)) ? model.an : A2($author$project$Pages$Editor$encodeTransitionLanguage, model.c, model.d);
		var highlightedTransitionLine = $author$project$Pages$Editor$activeTransitionLine(model);
		var formatValidationError = function (err) {
			return A2($author$project$I18n$t, ctx.b, 37) + (' ' + ($elm$core$String$fromInt(err.bN) + (': ' + (err.b_ + (' — ' + A2($author$project$I18n$t, ctx.b, err.bo))))));
		};
		var draftIndicatorTitle = $author$project$Pages$Editor$hasCodeValidationErrors(model) ? A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, formatValidationError, model.ac)) : A2($author$project$I18n$t, ctx.b, 36);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '251px'),
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$panelBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '12px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 35))
								])),
							model.T ? A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
									A2(
									$elm$html$Html$Attributes$style,
									'color',
									$author$project$Pages$Editor$hasCodeValidationErrors(model) ? $author$project$Theme$errorColor(ctx.a) : $author$project$Theme$warningColor(ctx.a)),
									$elm$html$Html$Attributes$title(draftIndicatorTitle)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('✎')
								])) : $elm$html$Html$text('')
						])),
					function () {
					var errorLineNumbers = A2(
						$elm$core$List$map,
						function ($) {
							return $.bN;
						},
						model.ac);
					var displayLines = function () {
						var _v0 = $elm$core$String$lines(transitionFunctionValue);
						if (!_v0.b) {
							return _List_fromArray(
								['']);
						} else {
							var lines = _v0;
							return lines;
						}
					}();
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'position', 'relative'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
								A2($elm$html$Html$Attributes$style, 'flex', '1'),
								A2($elm$html$Html$Attributes$style, 'min-height', '0'),
								A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$pre,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
										A2($elm$html$Html$Attributes$style, 'inset', '0'),
										A2($elm$html$Html$Attributes$style, 'margin', '0'),
										A2($elm$html$Html$Attributes$style, 'padding', '8px'),
										A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
										A2($elm$html$Html$Attributes$style, 'white-space', 'pre-wrap'),
										A2($elm$html$Html$Attributes$style, 'word-break', 'break-word'),
										A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'line-height', '20px'),
										A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
										A2($elm$html$Html$Attributes$style, 'color', 'transparent')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'min-height', '100%'),
												A2($elm$html$Html$Attributes$style, 'min-width', '100%'),
												A2(
												$elm$html$Html$Attributes$style,
												'transform',
												'translate(' + ($elm$core$String$fromFloat(0 - model.bi) + ('px, ' + ($elm$core$String$fromFloat(0 - model.bj) + 'px)'))))
											]),
										A2(
											$elm$core$List$indexedMap,
											F2(
												function (idx, lineText) {
													return A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2(
																$elm$html$Html$Attributes$style,
																'text-decoration-line',
																A2($elm$core$List$member, idx + 1, errorLineNumbers) ? 'underline' : 'none'),
																A2(
																$elm$html$Html$Attributes$style,
																'text-decoration-style',
																A2($elm$core$List$member, idx + 1, errorLineNumbers) ? 'wavy' : 'solid'),
																A2(
																$elm$html$Html$Attributes$style,
																'text-decoration-color',
																A2($elm$core$List$member, idx + 1, errorLineNumbers) ? $author$project$Theme$errorColor(ctx.a) : 'transparent'),
																A2(
																$elm$html$Html$Attributes$style,
																'background',
																_Utils_eq(
																	highlightedTransitionLine,
																	$elm$core$Maybe$Just(idx + 1)) ? $author$project$Pages$Editor$activeSimulationHighlightFill(ctx.a) : 'transparent'),
																A2(
																$elm$html$Html$Attributes$style,
																'color',
																_Utils_eq(
																	highlightedTransitionLine,
																	$elm$core$Maybe$Just(idx + 1)) ? $author$project$Pages$Editor$activeSimulationHighlightStroke(ctx.a) : $author$project$Theme$textColor(ctx.a)),
																A2($elm$html$Html$Attributes$style, 'border-radius', '6px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																$elm$core$String$isEmpty(lineText) ? ' ' : lineText)
															]));
												}),
											displayLines))
									])),
								A2(
								$elm$html$Html$textarea,
								_List_fromArray(
									[
										$elm$html$Html$Events$onFocus(
										$author$project$Pages$Editor$SetCodeEditorFocused(true)),
										$elm$html$Html$Events$onBlur(
										$author$project$Pages$Editor$SetCodeEditorFocused(false)),
										$elm$html$Html$Events$onInput($author$project$Pages$Editor$CodeEdited),
										$elm$html$Html$Attributes$value(transitionFunctionValue),
										$elm$html$Html$Attributes$id('transition-function-editor'),
										A2($elm$html$Html$Attributes$style, 'position', 'relative'),
										A2($elm$html$Html$Attributes$style, 'z-index', '1'),
										$author$project$Pages$Editor$codeEditorScrollEvent,
										A2($elm$html$Html$Attributes$style, 'width', '100%'),
										A2($elm$html$Html$Attributes$style, 'height', '100%'),
										A2($elm$html$Html$Attributes$style, 'flex', '1'),
										A2($elm$html$Html$Attributes$style, 'min-height', '0'),
										A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
										A2($elm$html$Html$Attributes$style, 'resize', 'none'),
										A2($elm$html$Html$Attributes$style, 'background', 'transparent'),
										A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'line-height', '20px'),
										A2($elm$html$Html$Attributes$style, 'padding', '8px'),
										A2(
										$elm$html$Html$Attributes$style,
										'border',
										'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
										A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
										A2(
										$elm$html$Html$Attributes$style,
										'border-color',
										$author$project$Pages$Editor$hasCodeValidationErrors(model) ? $author$project$Theme$errorColor(ctx.a) : ''),
										A2($elm$html$Html$Attributes$style, 'outline', 'none'),
										A2($elm$html$Html$Attributes$style, 'color', 'transparent'),
										A2(
										$elm$html$Html$Attributes$style,
										'caret-color',
										$author$project$Theme$textColor(ctx.a)),
										A2($elm$html$Html$Attributes$style, 'text-shadow', '0 0 0 transparent')
									]),
								_List_Nil)
							]));
				}(),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px'),
							A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$Editor$editorButtonStyles(ctx.a),
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$Editor$ImportCode)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 48))
								])),
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$Editor$editorButtonStyles(ctx.a),
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$Editor$ExportCode)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 49))
								]))
						]))
				]));
	});
var $author$project$Pages$Editor$view = F2(
	function (ctx, model) {
		var layout = $author$project$Pages$Editor$editorLayout(model);
		var content = A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'gap', '12px'),
					A2(
					$elm$html$Html$Attributes$style,
					'color',
					$author$project$Theme$textColor(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'flex', '1'),
					A2($elm$html$Html$Attributes$style, 'min-height', '320px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
				]),
			_List_fromArray(
				[
					A2($author$project$Pages$Editor$transitionFunctionPanel, ctx, model),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'flex', '1'),
							A2($elm$html$Html$Attributes$style, 'min-width', '0'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'flex-direction', 'column')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
									A2($elm$html$Html$Attributes$style, 'margin-bottom', '8px'),
									A2($elm$html$Html$Attributes$style, 'gap', '8px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'margin', '0')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 31))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
											A2($elm$html$Html$Attributes$style, 'gap', '8px')
										]),
									_List_fromArray(
										[
											A2($author$project$Pages$Editor$automatonPanel, ctx, model)
										]))
								])),
							A4($author$project$Pages$Editor$svgView, ctx, model, layout.bh, layout.bg)
						])),
					A2($author$project$Pages$Editor$editorControlsPanel, ctx, model)
				]));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px'),
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'outline', 'none'),
					$elm$html$Html$Attributes$tabindex(0),
					$author$project$Pages$Editor$shortcutEvent
				]),
			_List_fromArray(
				[
					content,
					A2($author$project$Pages$Editor$simulationPanel, ctx, model),
					model.a6 ? A2($author$project$Pages$Editor$saveModal, ctx, model) : $elm$html$Html$text(''),
					function () {
					var _v0 = model.aR;
					if (!_v0.$) {
						var noticeKey = _v0.a;
						var noticeColor = A2($author$project$Pages$Editor$globalNoticeColor, ctx.a, noticeKey);
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
									A2($elm$html$Html$Attributes$style, 'top', '20px'),
									A2($elm$html$Html$Attributes$style, 'left', '50%'),
									A2($elm$html$Html$Attributes$style, 'transform', 'translateX(-50%)'),
									A2($elm$html$Html$Attributes$style, 'z-index', '9999'),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$panelBg(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'color', noticeColor),
									A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + noticeColor),
									A2($elm$html$Html$Attributes$style, 'padding', '12px 16px'),
									A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
									A2($elm$html$Html$Attributes$style, 'box-shadow', '0 8px 24px rgba(0,0,0,0.2)'),
									A2($elm$html$Html$Attributes$style, 'font-weight', '600')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, noticeKey))
								]));
					} else {
						return $elm$html$Html$text('');
					}
				}()
				]));
	});
var $author$project$Pages$EditorStack$isDeterministic = function (transitions) {
	var step = F2(
		function (t, dict) {
			return A3(
				$elm$core$Dict$update,
				_Utils_Tuple3(
					t.f,
					$author$project$Pages$EditorStack$decodeStackTransitionLabel(t.i).w,
					$author$project$Pages$EditorStack$decodeStackTransitionLabel(t.i).v),
				function (maybe) {
					return $elm$core$Maybe$Just(
						A2($elm$core$Maybe$withDefault, 0, maybe) + 1);
				},
				dict);
		});
	var hasLambda = A2(
		$elm$core$List$any,
		function (t) {
			return $author$project$Pages$EditorStack$isLambdaLabel(t.i);
		},
		transitions);
	var counts = A3($elm$core$List$foldl, step, $elm$core$Dict$empty, transitions);
	var hasDuplicate = A2(
		$elm$core$List$any,
		function (n) {
			return n > 1;
		},
		$elm$core$Dict$values(counts));
	return (!hasDuplicate) && (!hasLambda);
};
var $author$project$Pages$EditorStack$automatonPanel = F2(
	function (ctx, model) {
		var deterministic = $author$project$Pages$EditorStack$isDeterministic(model.d);
		var label = deterministic ? A2($author$project$I18n$t, ctx.b, 33) : A2($author$project$I18n$t, ctx.b, 34);
		var color = deterministic ? $author$project$Theme$successColor(ctx.a) : $author$project$Theme$warningColor(ctx.a);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$interactiveBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '4px 8px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '999px'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px'),
					A2($elm$html$Html$Attributes$style, 'width', 'fit-content')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.85')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2($author$project$I18n$t, ctx.b, 32) + ':')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', color),
							A2($elm$html$Html$Attributes$style, 'font-weight', 'bold'),
							A2($elm$html$Html$Attributes$style, 'font-size', '12px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]))
				]));
	});
var $author$project$I18n$EditorTransitionStackInput = 74;
var $author$project$I18n$EditorTransitionStackOutput = 75;
var $author$project$Pages$EditorStack$SetSelectedStateName = function (a) {
	return {$: 18, a: a};
};
var $author$project$Pages$EditorStack$SetSelectedTransitionLabel = function (a) {
	return {$: 15, a: a};
};
var $author$project$Pages$EditorStack$SetSelectedTransitionStackInput = function (a) {
	return {$: 16, a: a};
};
var $author$project$Pages$EditorStack$SetSelectedTransitionStackOutput = function (a) {
	return {$: 17, a: a};
};
var $author$project$Pages$EditorStack$SetTransitionLabel = function (a) {
	return {$: 12, a: a};
};
var $author$project$Pages$EditorStack$SetTransitionStackInput = function (a) {
	return {$: 13, a: a};
};
var $author$project$Pages$EditorStack$SetTransitionStackOutput = function (a) {
	return {$: 14, a: a};
};
var $author$project$Pages$EditorStack$editorButtonStyles = function (theme) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			$author$project$Theme$interactiveBg(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'color',
			$author$project$Theme$textColor(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'border',
			'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
			A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
			A2($elm$html$Html$Attributes$style, 'padding', '4px 8px')
		]);
};
var $author$project$Pages$EditorStack$editorTextInputStyles = function (theme) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
			A2($elm$html$Html$Attributes$style, 'line-height', 'normal'),
			A2($elm$html$Html$Attributes$style, 'font-family', 'inherit'),
			A2($elm$html$Html$Attributes$style, 'height', '32px'),
			A2($elm$html$Html$Attributes$style, 'min-height', '32px'),
			A2($elm$html$Html$Attributes$style, 'padding', '0 8px'),
			A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
			A2(
			$elm$html$Html$Attributes$style,
			'color',
			$author$project$Theme$textColor(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'caret-color',
			$author$project$Theme$textColor(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			$author$project$Theme$inputBg(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'border',
			'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
			A2($elm$html$Html$Attributes$style, 'border-radius', '6px'),
			A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle')
		]);
};
var $author$project$Pages$EditorStack$quotedStateNameById = F2(
	function (states, stateId) {
		return '\'' + (A2($author$project$Pages$EditorStack$stateNameById, states, stateId) + '\'');
	});
var $author$project$Pages$EditorStack$transitionLabelDisplay = function (label) {
	var parts = $author$project$Pages$EditorStack$decodeStackTransitionLabel(label);
	var stackOutputDisplay = $elm$core$String$isEmpty(parts.O) ? 'λ' : parts.O;
	var inputSymbol = $elm$core$String$isEmpty(parts.w) ? 'λ' : parts.w;
	var inputStackDisplay = $elm$core$String$isEmpty(parts.v) ? 'λ' : parts.v;
	return ($elm$core$String$isEmpty(parts.w) && ($elm$core$String$isEmpty(parts.v) && $elm$core$String$isEmpty(parts.O))) ? 'λ' : (inputSymbol + (', ' + (inputStackDisplay + (' -> ' + stackOutputDisplay))));
};
var $author$project$Pages$EditorStack$nonDeterminismReasons = F3(
	function (lang, states, transitions) {
		var replaceToken = F3(
			function (key, value, template) {
				return A3($elm$core$String$replace, '{' + (key + '}'), value, template);
			});
		var lambdaReasons = A2(
			$elm$core$List$map,
			function (transition) {
				return A3(
					replaceToken,
					'to',
					A2($author$project$Pages$EditorStack$quotedStateNameById, states, transition.g),
					A3(
						replaceToken,
						'from',
						A2($author$project$Pages$EditorStack$quotedStateNameById, states, transition.f),
						A2($author$project$I18n$t, lang, 116)));
			},
			A2(
				$elm$core$List$filter,
				function (transition) {
					return $author$project$Pages$EditorStack$isLambdaLabel(transition.i);
				},
				transitions));
		var countByFromAndLabel = F2(
			function (transition, counts) {
				return A3(
					$elm$core$Dict$update,
					_Utils_Tuple3(
						transition.f,
						$author$project$Pages$EditorStack$decodeStackTransitionLabel(transition.i).w,
						$author$project$Pages$EditorStack$decodeStackTransitionLabel(transition.i).v),
					function (maybeCount) {
						return $elm$core$Maybe$Just(
							A2($elm$core$Maybe$withDefault, 0, maybeCount) + 1);
					},
					counts);
			});
		var duplicateReasons = A2(
			$elm$core$List$filterMap,
			function (_v0) {
				var _v1 = _v0.a;
				var fromState = _v1.a;
				var label = _v1.b;
				var stackInput = _v1.c;
				var count = _v0.b;
				return (count > 1) ? $elm$core$Maybe$Just(
					A3(
						replaceToken,
						'label',
						$author$project$Pages$EditorStack$transitionLabelDisplay(
							A3($author$project$Pages$EditorStack$encodeStackTransitionLabel, label, stackInput, '')),
						A3(
							replaceToken,
							'state',
							A2($author$project$Pages$EditorStack$quotedStateNameById, states, fromState),
							A2($author$project$I18n$t, lang, 115)))) : $elm$core$Maybe$Nothing;
			},
			$elm$core$Dict$toList(
				A3($elm$core$List$foldl, countByFromAndLabel, $elm$core$Dict$empty, transitions)));
		return _Utils_ap(duplicateReasons, lambdaReasons);
	});
var $author$project$Pages$EditorStack$editorControlsPanel = F2(
	function (ctx, model) {
		var simulationLocked = $author$project$Pages$EditorStack$simulationSessionActive(model);
		var reasons = A3($author$project$Pages$EditorStack$nonDeterminismReasons, ctx.b, model.c, model.d);
		var modeButton = F2(
			function (target, label) {
				return A2(
					$elm$html$Html$button,
					_Utils_ap(
						$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Pages$EditorStack$SetMode(target)),
								A2(
								$elm$html$Html$Attributes$style,
								'background',
								_Utils_eq(model.z, target) ? $author$project$Theme$hoverBg(ctx.a) : $author$project$Theme$interactiveBg(ctx.a)),
								A2(
								$elm$html$Html$Attributes$style,
								'border-color',
								_Utils_eq(model.z, target) ? $author$project$Theme$hoverBorder(ctx.a) : $author$project$Theme$interactiveBorder(ctx.a)),
								$elm$html$Html$Attributes$disabled(simulationLocked)
							])),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]));
			});
		var deterministic = $author$project$Pages$EditorStack$isDeterministic(model.d);
		var cardStyles = _List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Theme$interactiveBg(ctx.a)),
				A2(
				$elm$html$Html$Attributes$style,
				'border',
				'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
				A2($elm$html$Html$Attributes$style, 'padding', '10px'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
				A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
			]);
		var automatonLabel = deterministic ? A2($author$project$I18n$t, ctx.b, 33) : A2($author$project$I18n$t, ctx.b, 34);
		var automatonDetailsExpanded = (!deterministic) && model.a_;
		var automatonColor = deterministic ? $author$project$Theme$successColor(ctx.a) : $author$project$Theme$warningColor(ctx.a);
		var automatonCardMaxHeight = automatonDetailsExpanded ? '45%' : '48px';
		var automatonCardClosing = (!deterministic) && (model.aG && (!automatonDetailsExpanded));
		var automatonCardExpandedVisual = automatonDetailsExpanded || automatonCardClosing;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '300px'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '10px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_Utils_ap(
						cardStyles,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2(
								$elm$html$Html$Attributes$style,
								'flex',
								automatonCardExpandedVisual ? '55 1 0' : '1 1 auto'),
								A2($elm$html$Html$Attributes$style, 'min-height', '0')
							])),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 67))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'gap', '8px'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'margin-top', '4px'),
									A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
								]),
							_List_fromArray(
								[
									A2(
									modeButton,
									0,
									A2($author$project$I18n$t, ctx.b, 68)),
									A2(
									modeButton,
									1,
									A2($author$project$I18n$t, ctx.b, 69)),
									A2(
									modeButton,
									2,
									A2($author$project$I18n$t, ctx.b, 70))
								])),
							(model.z === 1) ? A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 72))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
											A2($elm$html$Html$Attributes$style, 'gap', '6px'),
											A2($elm$html$Html$Attributes$style, 'align-items', 'stretch')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 73) + ':'),
											A2(
											$elm$html$Html$input,
											_Utils_ap(
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('text'),
														$elm$html$Html$Attributes$size(12),
														$elm$html$Html$Attributes$placeholder('λ'),
														$elm$html$Html$Attributes$id('transition-create-label-input'),
														$elm$html$Html$Attributes$value(model.a9),
														$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$SetTransitionLabel)
													]),
												$author$project$Pages$EditorStack$editorTextInputStyles(ctx.a)),
											_List_Nil),
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 74) + ':'),
											A2(
											$elm$html$Html$input,
											_Utils_ap(
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('text'),
														$elm$html$Html$Attributes$size(12),
														$elm$html$Html$Attributes$placeholder('λ'),
														$elm$html$Html$Attributes$id('transition-create-stack-input'),
														$elm$html$Html$Attributes$value(model.bx),
														$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$SetTransitionStackInput)
													]),
												$author$project$Pages$EditorStack$editorTextInputStyles(ctx.a)),
											_List_Nil),
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 75) + ':'),
											A2(
											$elm$html$Html$input,
											_Utils_ap(
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('text'),
														$elm$html$Html$Attributes$size(12),
														$elm$html$Html$Attributes$placeholder('λ'),
														$elm$html$Html$Attributes$id('transition-create-stack-output'),
														$elm$html$Html$Attributes$value(model.by),
														$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$SetTransitionStackOutput)
													]),
												$author$project$Pages$EditorStack$editorTextInputStyles(ctx.a)),
											_List_Nil)
										])),
									function () {
									var _v0 = model.ah;
									if (_v0.$ === 1) {
										return $elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 76));
									} else {
										var sid = _v0.a;
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'margin-top', '4px')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 78) + (': ' + (A2($author$project$Pages$EditorStack$stateNameById, model.c, sid) + (' → ' + A2($author$project$I18n$t, ctx.b, 76)))))
												]));
									}
								}()
								])) : $elm$html$Html$text(''),
							(model.z === 2) ? A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'overflow', 'auto')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 79))
										])),
									function () {
									var _v1 = _Utils_Tuple2(model.h, model.s);
									if (!_v1.a.$) {
										var sid = _v1.a.a;
										var _v2 = A2($author$project$Pages$EditorStack$getStateById, sid, model.c);
										if (_v2.$ === 1) {
											return A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 81))
													]));
										} else {
											var s = _v2.a;
											return A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 82) + (': ' + $elm$core$String$fromInt(s.a4)))
															])),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'margin-top', '6px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 65) + ': '),
																A2(
																$elm$html$Html$input,
																_Utils_ap(
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$type_('text'),
																			$elm$html$Html$Attributes$id('selected-state-name-input'),
																			$elm$html$Html$Attributes$placeholder(
																			$elm$core$String$fromInt(s.a4)),
																			$elm$html$Html$Attributes$value(s.b3),
																			$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$SetSelectedStateName)
																		]),
																	$author$project$Pages$EditorStack$editorTextInputStyles(ctx.a)),
																_List_Nil)
															])),
														model.ak ? A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'color', '#e74c3c'),
																A2($elm$html$Html$Attributes$style, 'margin-top', '4px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 66))
															])) : $elm$html$Html$text(''),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 83) + (': ' + ($elm$core$String$fromFloat(s.j) + (', ' + $elm$core$String$fromFloat(s.k)))))
															])),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 84) + (': ' + (s.E ? A2($author$project$I18n$t, ctx.b, 86) : A2($author$project$I18n$t, ctx.b, 87))))
															])),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 85) + (': ' + (s.M ? A2($author$project$I18n$t, ctx.b, 86) : A2($author$project$I18n$t, ctx.b, 87))))
															])),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
																A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																A2($elm$html$Html$Attributes$style, 'gap', '8px')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$button,
																_Utils_ap(
																	$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
																	_List_fromArray(
																		[
																			$elm$html$Html$Events$onClick(
																			$author$project$Pages$EditorStack$DeleteState(s.a4))
																		])),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		A2($author$project$I18n$t, ctx.b, 88))
																	]))
															])),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																A2($elm$html$Html$Attributes$style, 'gap', '8px'),
																A2($elm$html$Html$Attributes$style, 'margin-top', '8px')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$button,
																_Utils_ap(
																	$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
																	_List_fromArray(
																		[
																			$elm$html$Html$Events$onClick(
																			$author$project$Pages$EditorStack$ToggleStart(s.a4)),
																			$elm$html$Html$Attributes$disabled(simulationLocked)
																		])),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		s.M ? A2($author$project$I18n$t, ctx.b, 91) : A2($author$project$I18n$t, ctx.b, 92))
																	])),
																A2(
																$elm$html$Html$button,
																_Utils_ap(
																	$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
																	_List_fromArray(
																		[
																			$elm$html$Html$Events$onClick(
																			$author$project$Pages$EditorStack$ToggleAccepting(s.a4)),
																			$elm$html$Html$Attributes$disabled(simulationLocked)
																		])),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		s.E ? A2($author$project$I18n$t, ctx.b, 93) : A2($author$project$I18n$t, ctx.b, 94))
																	]))
															]))
													]));
										}
									} else {
										if (!_v1.b.$) {
											var _v3 = _v1.a;
											var tid = _v1.b.a;
											var _v4 = $elm$core$List$head(
												A2(
													$elm$core$List$filter,
													function (tr) {
														return _Utils_eq(tr.a4, tid);
													},
													model.d));
											if (_v4.$ === 1) {
												return A2(
													$elm$html$Html$div,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text(
															A2($author$project$I18n$t, ctx.b, 81))
														]));
											} else {
												var tr = _v4.a;
												return A2(
													$elm$html$Html$div,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	A2($author$project$I18n$t, ctx.b, 89) + (': ' + (A2($author$project$Pages$EditorStack$quotedStateNameById, model.c, tr.f) + (' → ' + A2($author$project$Pages$EditorStack$quotedStateNameById, model.c, tr.g)))))
																])),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	A2($elm$html$Html$Attributes$style, 'margin-top', '6px'),
																	A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																	A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
																	A2($elm$html$Html$Attributes$style, 'gap', '6px')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	A2($author$project$I18n$t, ctx.b, 73) + ': '),
																	A2(
																	$elm$html$Html$input,
																	_Utils_ap(
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$type_('text'),
																				$elm$html$Html$Attributes$id('selected-transition-label-input'),
																				$elm$html$Html$Attributes$placeholder('λ'),
																				$elm$html$Html$Attributes$value(model.Y),
																				$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$SetSelectedTransitionLabel)
																			]),
																		$author$project$Pages$EditorStack$editorTextInputStyles(ctx.a)),
																	_List_Nil),
																	$elm$html$Html$text(
																	A2($author$project$I18n$t, ctx.b, 74) + ':'),
																	A2(
																	$elm$html$Html$input,
																	_Utils_ap(
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$type_('text'),
																				$elm$html$Html$Attributes$id('selected-transition-stack-input'),
																				$elm$html$Html$Attributes$placeholder('λ'),
																				$elm$html$Html$Attributes$value(model.Z),
																				$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$SetSelectedTransitionStackInput)
																			]),
																		$author$project$Pages$EditorStack$editorTextInputStyles(ctx.a)),
																	_List_Nil),
																	$elm$html$Html$text(
																	A2($author$project$I18n$t, ctx.b, 75) + ':'),
																	A2(
																	$elm$html$Html$input,
																	_Utils_ap(
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$type_('text'),
																				$elm$html$Html$Attributes$id('selected-transition-stack-output'),
																				$elm$html$Html$Attributes$placeholder('λ'),
																				$elm$html$Html$Attributes$value(model._),
																				$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$SetSelectedTransitionStackOutput)
																			]),
																		$author$project$Pages$EditorStack$editorTextInputStyles(ctx.a)),
																	_List_Nil)
																])),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
																	A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																	A2($elm$html$Html$Attributes$style, 'gap', '8px')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$button,
																	_Utils_ap(
																		$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
																		_List_fromArray(
																			[
																				$elm$html$Html$Events$onClick(
																				$author$project$Pages$EditorStack$DeleteTransition(tr.a4))
																			])),
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			A2($author$project$I18n$t, ctx.b, 90))
																		]))
																]))
														]));
											}
										} else {
											return A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 80))
													]));
										}
									}
								}()
								])) : $elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_Utils_ap(
						cardStyles,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2(
								$elm$html$Html$Attributes$style,
								'flex',
								automatonCardExpandedVisual ? '45 1 0' : '0 0 auto'),
								A2($elm$html$Html$Attributes$style, 'max-height', automatonCardMaxHeight),
								A2(
								$elm$html$Html$Attributes$style,
								'min-height',
								automatonDetailsExpanded ? '0' : 'auto'),
								A2($elm$html$Html$Attributes$style, 'transition', 'max-height 240ms ease')
							])),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
									A2($elm$html$Html$Attributes$style, 'gap', '8px'),
									A2($elm$html$Html$Attributes$style, 'min-height', '32px')
								]),
							_List_fromArray(
								[
									deterministic ? $elm$html$Html$text('') : A2(
									$elm$html$Html$button,
									_Utils_ap(
										$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$ToggleAutomatonTypeDetails),
												A2($elm$html$Html$Attributes$style, 'padding', '2px 8px'),
												A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
												$elm$html$Html$Attributes$title(
												A2($author$project$I18n$t, ctx.b, 113))
											])),
									_List_fromArray(
										[
											$elm$html$Html$text(
											automatonDetailsExpanded ? '▾' : '▴')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
											A2($elm$html$Html$Attributes$style, 'font-weight', '700'),
											A2($elm$html$Html$Attributes$style, 'color', automatonColor),
											A2($elm$html$Html$Attributes$style, 'text-align', 'center')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(automatonLabel)
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
									A2($elm$html$Html$Attributes$style, 'min-height', '0'),
									A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
									A2(
									$elm$html$Html$Attributes$style,
									'max-height',
									automatonDetailsExpanded ? '100%' : '0'),
									A2(
									$elm$html$Html$Attributes$style,
									'opacity',
									automatonDetailsExpanded ? '1' : '0'),
									A2($elm$html$Html$Attributes$style, 'transition', 'max-height 240ms ease, opacity 180ms ease')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
											A2($elm$html$Html$Attributes$style, 'font-weight', '600')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 114))
										])),
									model.aG ? $elm$html$Html$text('') : A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'margin-top', '6px'),
											A2($elm$html$Html$Attributes$style, 'overflow', 'auto'),
											A2($elm$html$Html$Attributes$style, 'padding-right', '4px')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$ul,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'margin', '0'),
													A2($elm$html$Html$Attributes$style, 'padding-left', '18px'),
													A2($elm$html$Html$Attributes$style, 'font-size', '14px')
												]),
											A2(
												$elm$core$List$map,
												function (reason) {
													return A2(
														$elm$html$Html$li,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'margin-bottom', '4px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(reason)
															]));
												},
												reasons))
										]))
								]))
						]))
				]));
	});
var $author$project$Pages$EditorStack$globalNoticeColor = F2(
	function (theme, key) {
		switch (key) {
			case 106:
				return $author$project$Theme$successColor(theme);
			case 107:
				return $author$project$Theme$warningColor(theme);
			case 108:
				return $author$project$Theme$errorColor(theme);
			case 109:
				return $author$project$Theme$errorColor(theme);
			case 110:
				return $author$project$Theme$errorColor(theme);
			default:
				return $author$project$Theme$textColor(theme);
		}
	});
var $author$project$Pages$EditorStack$CloseSaveModal = {$: 40};
var $author$project$Pages$EditorStack$ConfirmRenameSlot = function (a) {
	return {$: 46, a: a};
};
var $author$project$Pages$EditorStack$DeleteFromSlot = function (a) {
	return {$: 43, a: a};
};
var $author$project$Pages$EditorStack$ExportSlot = function (a) {
	return {$: 50, a: a};
};
var $author$project$Pages$EditorStack$ImportSlot = function (a) {
	return {$: 51, a: a};
};
var $author$project$Pages$EditorStack$LoadFromSlot = function (a) {
	return {$: 42, a: a};
};
var $author$project$Pages$EditorStack$SaveToSlot = function (a) {
	return {$: 41, a: a};
};
var $author$project$Pages$EditorStack$StartRenameSlot = function (a) {
	return {$: 44, a: a};
};
var $author$project$Pages$EditorStack$UpdateRenameDraft = function (a) {
	return {$: 45, a: a};
};
var $author$project$Pages$EditorStack$saveModal = F2(
	function (ctx, model) {
		var viewSlot = function (slot) {
			var slotTypeBadge = function () {
				var _v0 = slot.cj;
				if (!_v0.$) {
					if (!_v0.a) {
						var _v1 = _v0.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'padding', '2px 8px'),
									A2($elm$html$Html$Attributes$style, 'border-radius', '999px'),
									A2(
									$elm$html$Html$Attributes$style,
									'border',
									'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$interactiveBg(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
									A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
									A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 2))
								]));
					} else {
						var _v2 = _v0.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'padding', '2px 8px'),
									A2($elm$html$Html$Attributes$style, 'border-radius', '999px'),
									A2(
									$elm$html$Html$Attributes$style,
									'border',
									'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$interactiveBg(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
									A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
									A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 3))
								]));
					}
				} else {
					return $elm$html$Html$text('');
				}
			}();
			var renameInputWidth = $elm$core$String$fromInt(
				A2(
					$elm$core$Basics$max,
					10,
					$elm$core$String$length(model.af) + 2)) + 'ch';
			var isSaving = _Utils_eq(
				model.aE,
				$elm$core$Maybe$Just(slot.a4));
			var isDeleting = _Utils_eq(
				model.aN,
				$elm$core$Maybe$Just(slot.a4));
			var slotBackground = isSaving ? 'rgba(46, 204, 113, 0.12)' : (isDeleting ? 'rgba(231, 76, 60, 0.12)' : 'transparent');
			var slotOpacity = isDeleting ? '0.82' : '1';
			var slotTransform = isSaving ? 'translateY(-1px) scale(1.01)' : (isDeleting ? 'scale(0.985)' : 'scale(1)');
			var hasAutomaton = !$elm$core$String$isEmpty(slot.aZ);
			var slotLabel = hasAutomaton ? ($elm$core$String$isEmpty(slot.b3) ? '' : slot.b3) : A2($author$project$I18n$t, ctx.b, 63);
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$style,
						'border',
						'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
						A2($elm$html$Html$Attributes$style, 'padding', '10px'),
						A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
						A2($elm$html$Html$Attributes$style, 'background', slotBackground),
						A2($elm$html$Html$Attributes$style, 'transform', slotTransform),
						A2($elm$html$Html$Attributes$style, 'opacity', slotOpacity),
						A2($elm$html$Html$Attributes$style, 'transition', 'background 360ms ease, transform 360ms ease, opacity 360ms ease')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, ctx.b, 62) + (' ' + ($elm$core$String$fromInt(slot.a4) + ':')))
									])),
								_Utils_eq(
								model.ag,
								$elm$core$Maybe$Just(slot.a4)) ? A2(
								$elm$html$Html$input,
								_Utils_ap(
									_List_fromArray(
										[
											$elm$html$Html$Attributes$type_('text'),
											$elm$html$Html$Attributes$value(model.af),
											$elm$html$Html$Attributes$placeholder(
											A2($author$project$I18n$t, ctx.b, 59)),
											$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$UpdateRenameDraft),
											A2($elm$html$Html$Attributes$style, 'width', renameInputWidth)
										]),
									$author$project$Pages$EditorStack$editorTextInputStyles(ctx.a)),
								_List_Nil) : A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(slotLabel)
									])),
								_Utils_eq(
								model.ag,
								$elm$core$Maybe$Just(slot.a4)) ? A2(
								$elm$html$Html$button,
								_Utils_ap(
									$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Pages$EditorStack$ConfirmRenameSlot(slot.a4)),
											$elm$html$Html$Attributes$title(
											A2($author$project$I18n$t, ctx.b, 60))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('✓')
									])) : A2(
								$elm$html$Html$button,
								_Utils_ap(
									$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Pages$EditorStack$StartRenameSlot(slot.a4)),
											$elm$html$Html$Attributes$title(
											A2($author$project$I18n$t, ctx.b, 59))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('✎')
									])),
								slotTypeBadge,
								_Utils_eq(
								model.aI,
								$elm$core$Maybe$Just(slot.a4)) ? A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$Attributes$style,
										'color',
										$author$project$Theme$successColor(ctx.a)),
										A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, ctx.b, 61))
									])) : $elm$html$Html$text('')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
								A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'gap', '8px'),
										A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
									]),
								A2(
									$elm$core$List$cons,
									A2(
										$elm$html$Html$button,
										_Utils_ap(
											$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick(
													$author$project$Pages$EditorStack$SaveToSlot(slot.a4))
												])),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, ctx.b, 52))
											])),
									hasAutomaton ? _List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$EditorStack$LoadFromSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 53))
												])),
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$EditorStack$DeleteFromSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 54))
												]))
										]) : _List_Nil)),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'gap', '8px'),
										A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
										A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
									]),
								_Utils_ap(
									hasAutomaton ? _List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$EditorStack$ExportSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 56))
												]))
										]) : _List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$EditorStack$ImportSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 55))
												]))
										])))
							]))
					]));
		};
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'inset', '0'),
					A2($elm$html$Html$Attributes$style, 'background', 'rgba(0,0,0,0.45)'),
					A2($elm$html$Html$Attributes$style, 'z-index', '2000'),
					$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$CloseSaveModal)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'max-width', '740px'),
							A2($elm$html$Html$Attributes$style, 'margin', '40px auto'),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$Theme$panelBg(ctx.a)),
							A2(
							$elm$html$Html$Attributes$style,
							'color',
							$author$project$Theme$textColor(ctx.a)),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
							A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
							A2($elm$html$Html$Attributes$style, 'padding', '16px'),
							A2(
							$elm$html$Html$Events$stopPropagationOn,
							'click',
							$elm$json$Json$Decode$succeed(
								_Utils_Tuple2($author$project$Pages$EditorStack$NoOp, true)))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'margin-bottom', '10px'),
									A2($elm$html$Html$Attributes$style, 'min-height', '32px'),
									A2($elm$html$Html$Attributes$style, 'gap', '12px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'margin', '0')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 51))
										])),
									model.u ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', '#e74c3c'),
											A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
											A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
											A2($elm$html$Html$Attributes$style, 'max-width', '420px')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 58))
										])) : (model.K ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', '#e74c3c'),
											A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
											A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'right')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 57))
										])) : $elm$html$Html$text(''))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'grid'),
									A2($elm$html$Html$Attributes$style, 'grid-template-columns', '1fr'),
									A2($elm$html$Html$Attributes$style, 'gap', '10px')
								]),
							A2($elm$core$List$map, viewSlot, model.e)),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-top', '12px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_Utils_ap(
										$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$CloseSaveModal)
											])),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 64))
										]))
								]))
						]))
				]));
	});
var $author$project$Pages$EditorStack$HandleShortcut = function (a) {
	return {$: 58, a: a};
};
var $author$project$Pages$EditorStack$ShortcutEvent = F5(
	function (code, shiftKey, altKey, metaKey, targetEditable) {
		return {aY: altKey, a$: code, b1: metaKey, a7: shiftKey, b9: targetEditable};
	});
var $author$project$Pages$EditorStack$shortcutEvent = A2(
	$elm$html$Html$Events$custom,
	'keydown',
	A2(
		$elm$json$Json$Decode$map,
		function (event) {
			var hasShortcut = (((!event.a7) && (event.aY && A2(
				$elm$core$List$member,
				event.a$,
				_List_fromArray(
					['Digit1', 'Digit2', 'Digit3', 'KeyS', 'KeyE', 'KeyN', 'KeyQ', 'KeyT', 'Comma', 'Period'])))) || ((event.a7 && (event.aY && A2(
				$elm$core$List$member,
				event.a$,
				_List_fromArray(
					['KeyS', 'Enter', 'KeyN'])))) || (((!event.a7) && ((!event.aY) && (event.a$ === 'Delete'))) || ((!event.a7) && ((!event.aY) && (event.b1 && (event.a$ === 'Backspace'))))))) && (!event.b9);
			return {
				bo: $author$project$Pages$EditorStack$HandleShortcut(event),
				cv: hasShortcut,
				cE: hasShortcut
			};
		},
		A6(
			$elm$json$Json$Decode$map5,
			$author$project$Pages$EditorStack$ShortcutEvent,
			A2($elm$json$Json$Decode$field, 'code', $elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'altKey', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'metaKey', $elm$json$Json$Decode$bool),
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['target', 'isContentEditable']),
						$elm$json$Json$Decode$bool),
						A2(
						$elm$json$Json$Decode$map,
						function (tag) {
							var normalized = $elm$core$String$toLower(tag);
							return (normalized === 'input') || ((normalized === 'textarea') || (normalized === 'select'));
						},
						A2(
							$elm$json$Json$Decode$at,
							_List_fromArray(
								['target', 'tagName']),
							$elm$json$Json$Decode$string))
					])))));
var $author$project$Pages$EditorStack$SetSimulationDelay = function (a) {
	return {$: 26, a: a};
};
var $author$project$Pages$EditorStack$SetSimulationInput = function (a) {
	return {$: 25, a: a};
};
var $author$project$Pages$EditorStack$StartStepSimulation = {$: 31};
var $author$project$Pages$EditorStack$StepBackwardSimulation = {$: 34};
var $author$project$Pages$EditorStack$StepForwardSimulation = {$: 33};
var $author$project$Pages$EditorStack$activeSimulationHighlightFill = function (theme) {
	if (!theme) {
		return '#7aa2ff33';
	} else {
		return '#f8e71c30';
	}
};
var $author$project$Pages$EditorStack$activeSimulationHighlightStroke = function (theme) {
	if (!theme) {
		return '#245dff';
	} else {
		return '#ffd54f';
	}
};
var $author$project$Pages$EditorStack$simulationInputPreview = F2(
	function (theme, model) {
		var viewportTiles = 9;
		var tileWidthPx = 36;
		var tileGapPx = 6;
		var tileStepPx = tileWidthPx + tileGapPx;
		var viewportWidthPx = (viewportTiles * tileStepPx) - tileGapPx;
		var highlightedInputIndex = model.Q - 1;
		var targetShiftPx = A2($elm$core$Basics$max, 0, (highlightedInputIndex - 5) * tileStepPx);
		var currentMarkerIndex = ((!_Utils_eq(model.J, $elm$core$Maybe$Nothing)) && (!$elm$core$List$isEmpty(model.R))) ? highlightedInputIndex : (-1);
		var viewChar = F2(
			function (idx, _char) {
				var isCurrent = _Utils_eq(idx, currentMarkerIndex);
				var isConsumed = _Utils_cmp(idx, model.Q) < 0;
				return A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline-flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromInt(tileWidthPx) + 'px'),
							A2($elm$html$Html$Attributes$style, 'height', '24px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '6px'),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + (isCurrent ? $author$project$Pages$EditorStack$activeSimulationHighlightStroke(theme) : $author$project$Theme$interactiveBorder(theme))),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							isCurrent ? $author$project$Pages$EditorStack$activeSimulationHighlightFill(theme) : $author$project$Theme$interactiveBg(theme)),
							A2(
							$elm$html$Html$Attributes$style,
							'color',
							isCurrent ? $author$project$Pages$EditorStack$activeSimulationHighlightStroke(theme) : $author$project$Theme$textColor(theme)),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							isConsumed ? '0.55' : '1'),
							A2(
							$elm$html$Html$Attributes$style,
							'font-weight',
							isCurrent ? '700' : '500')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromChar(_char))
						]));
			});
		var chars = $elm$core$String$toList(model.aB);
		var contentChars = A2(
			$elm$core$Basics$max,
			1,
			$elm$core$List$length(chars));
		var totalWidthPx = (contentChars * tileStepPx) - tileGapPx;
		var maxShiftPx = A2($elm$core$Basics$max, 0, totalWidthPx - viewportWidthPx);
		var shiftPx = A2($elm$core$Basics$min, maxShiftPx, targetShiftPx);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-top', '12px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
					A2($elm$html$Html$Attributes$style, 'font-size', '15px'),
					A2($elm$html$Html$Attributes$style, 'line-height', '24px'),
					A2($elm$html$Html$Attributes$style, 'height', '34px'),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
					A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$interactiveBg(theme)),
					A2($elm$html$Html$Attributes$style, 'padding', '4px 8px')
				]),
			$elm$core$List$isEmpty(chars) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline-flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromInt(tileWidthPx) + 'px'),
							A2($elm$html$Html$Attributes$style, 'height', '24px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '6px'),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$Theme$interactiveBg(theme)),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.7'),
							A2($elm$html$Html$Attributes$style, 'font-style', 'italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('λ')
						]))
				]) : _List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline-flex'),
							A2(
							$elm$html$Html$Attributes$style,
							'gap',
							$elm$core$String$fromInt(tileGapPx) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'transform',
							'translateX(-' + ($elm$core$String$fromInt(shiftPx) + 'px)')),
							A2($elm$html$Html$Attributes$style, 'transition', 'transform 220ms ease')
						]),
					A2($elm$core$List$indexedMap, viewChar, chars))
				]));
	});
var $author$project$Pages$EditorStack$clampInt = F3(
	function (low, high, value) {
		return (_Utils_cmp(value, low) < 0) ? low : ((_Utils_cmp(value, high) > 0) ? high : value);
	});
var $author$project$Pages$EditorStack$simulationInputWidthCh = function (inputValue) {
	return A3(
		$author$project$Pages$EditorStack$clampInt,
		18,
		110,
		$elm$core$String$length(inputValue) + 6);
};
var $author$project$Pages$EditorStack$simulationSpeedIndexFromDelay = function (rawDelay) {
	var delay = $elm$core$Basics$round(
		$author$project$Pages$EditorStack$parseDelay(rawDelay));
	var pickNearest = F2(
		function (current, best) {
			pickNearest:
			while (true) {
				if (!current.b) {
					return best;
				} else {
					var _v1 = current.a;
					var index = _v1.a;
					var candidate = _v1.b;
					var rest = current.b;
					if (_Utils_cmp(
						$elm$core$Basics$abs(delay - candidate),
						$elm$core$Basics$abs(delay - best.b)) < 0) {
						var $temp$current = rest,
							$temp$best = _Utils_Tuple2(index, candidate);
						current = $temp$current;
						best = $temp$best;
						continue pickNearest;
					} else {
						var $temp$current = rest,
							$temp$best = best;
						current = $temp$current;
						best = $temp$best;
						continue pickNearest;
					}
				}
			}
		});
	var _v2 = A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, $author$project$Pages$EditorStack$simulationSpeedStops);
	if (!_v2.b) {
		return 2;
	} else {
		var first = _v2.a;
		var rest = _v2.b;
		return A2(pickNearest, rest, first).a;
	}
};
var $author$project$Pages$EditorStack$simulationStatus = F2(
	function (lang, result) {
		switch (result) {
			case 0:
				return $elm$core$Maybe$Nothing;
			case 1:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 105),
						'#2980b9'));
			case 2:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 106),
						'#2ecc71'));
			case 3:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 107),
						'#e67e22'));
			case 4:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 108),
						'#e74c3c'));
			default:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 109),
						'#e74c3c'));
		}
	});
var $author$project$Pages$EditorStack$simulationPanel = F2(
	function (ctx, model) {
		var speedIndex = $author$project$Pages$EditorStack$simulationSpeedIndexFromDelay(model.aA);
		var simulationLocked = $author$project$Pages$EditorStack$simulationSessionActive(model) || $author$project$Pages$EditorStack$hasCodeValidationErrors(model);
		var inputWidthCh = $author$project$Pages$EditorStack$simulationInputWidthCh(model.aB);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$panelBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '14px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'flex-shrink', '0')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '10px'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin', '0'),
									A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
									A2($elm$html$Html$Attributes$style, 'min-width', '130px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 95))
								])),
							A2(
							$elm$html$Html$textarea,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$rows(1),
									$elm$html$Html$Attributes$id('simulation-input-field'),
									$elm$html$Html$Attributes$placeholder(
									A2($author$project$I18n$t, ctx.b, 96)),
									$elm$html$Html$Attributes$value(model.aB),
									$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$SetSimulationInput),
									$elm$html$Html$Attributes$disabled(simulationLocked),
									A2($elm$html$Html$Attributes$style, 'min-width', '170px'),
									A2(
									$elm$html$Html$Attributes$style,
									'width',
									'min(' + ($elm$core$String$fromInt(inputWidthCh) + 'ch, 92vw)')),
									A2($elm$html$Html$Attributes$style, 'max-width', '100%'),
									A2($elm$html$Html$Attributes$style, 'height', '32px'),
									A2($elm$html$Html$Attributes$style, 'min-height', '32px'),
									A2($elm$html$Html$Attributes$style, 'max-height', '120px'),
									A2($elm$html$Html$Attributes$style, 'padding', '6px 12px'),
									A2($elm$html$Html$Attributes$style, 'line-height', '16px'),
									A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
									A2($elm$html$Html$Attributes$style, 'resize', 'none'),
									A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$interactiveBg(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'color',
									$author$project$Theme$textColor(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
									A2(
									$elm$html$Html$Attributes$style,
									'border',
									'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
									A2($elm$html$Html$Attributes$style, 'outline', 'none')
								]),
							_List_Nil),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
									A2($elm$html$Html$Attributes$style, 'gap', '4px'),
									A2($elm$html$Html$Attributes$style, 'min-width', '170px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$input,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$type_('range'),
											$elm$html$Html$Attributes$min('0'),
											$elm$html$Html$Attributes$max('4'),
											$elm$html$Html$Attributes$step('1'),
											$elm$html$Html$Attributes$value(
											$elm$core$String$fromInt(speedIndex)),
											$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$SetSimulationDelay),
											$elm$html$Html$Attributes$disabled(simulationLocked),
											A2($elm$html$Html$Attributes$style, 'width', '100%')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
											A2($elm$html$Html$Attributes$style, 'opacity', '0.85')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 97) + (': ' + (model.aA + ' ms')))
										]))
								])),
							function () {
							var _v0 = model.aj;
							if (_v0.$ === 1) {
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'gap', '8px'),
											A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$StartSimulation),
														$elm$html$Html$Attributes$disabled(simulationLocked),
														A2($elm$html$Html$Attributes$style, 'height', '36px')
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 99))
												])),
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$StartStepSimulation),
														$elm$html$Html$Attributes$disabled(simulationLocked),
														A2($elm$html$Html$Attributes$style, 'height', '36px')
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 100))
												]))
										]));
							} else {
								if (!_v0.a) {
									var _v1 = _v0.a;
									return A2(
										$elm$html$Html$button,
										_Utils_ap(
											$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$StopSimulation),
													A2($elm$html$Html$Attributes$style, 'height', '36px')
												])),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, ctx.b, 101))
											]));
								} else {
									var _v2 = _v0.a;
									return A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'display', 'flex'),
												A2($elm$html$Html$Attributes$style, 'gap', '8px'),
												A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$button,
												_Utils_ap(
													$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$StopSimulation),
															A2($elm$html$Html$Attributes$style, 'height', '36px')
														])),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 101))
													])),
												A2(
												$elm$html$Html$button,
												_Utils_ap(
													$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$StepForwardSimulation),
															$elm$html$Html$Attributes$disabled(
															_Utils_eq(model.J, $elm$core$Maybe$Nothing)),
															A2($elm$html$Html$Attributes$style, 'height', '36px')
														])),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 102))
													])),
												A2(
												$elm$html$Html$button,
												_Utils_ap(
													$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$StepBackwardSimulation),
															$elm$html$Html$Attributes$disabled(
															$elm$core$List$isEmpty(model.av)),
															A2($elm$html$Html$Attributes$style, 'height', '36px')
														])),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 103))
													]))
											]));
								}
							}
						}(),
							function () {
							var _v3 = A2($author$project$Pages$EditorStack$simulationStatus, ctx.b, model.S);
							if (_v3.$ === 1) {
								return $elm$html$Html$text('');
							} else {
								var _v4 = _v3.a;
								var msg = _v4.a;
								var color = _v4.b;
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', color),
											A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
											A2($elm$html$Html$Attributes$style, 'margin-right', 'auto'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
											A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
											A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(msg)
										]));
							}
						}()
						])),
					A2($author$project$Pages$EditorStack$simulationInputPreview, ctx.a, model)
				]));
	});
var $author$project$I18n$EditorStackVisual = 9;
var $author$project$Theme$stackBorder = function (th) {
	if (!th) {
		return '#9db0d4';
	} else {
		return '#3b4f77';
	}
};
var $author$project$Pages$EditorStack$stackCellsFromStack = function (stack) {
	return $elm$core$List$isEmpty(stack) ? _List_fromArray(
		[$elm$core$Maybe$Nothing]) : A2($elm$core$List$map, $elm$core$Maybe$Just, stack);
};
var $author$project$Theme$stackEmptyBg = function (th) {
	if (!th) {
		return '#f6f8fc';
	} else {
		return '#1b2130';
	}
};
var $author$project$Theme$stackFillBg = function (th) {
	if (!th) {
		return '#8fb3ff';
	} else {
		return '#5c86ff';
	}
};
var $author$project$Pages$EditorStack$stackVisual = F2(
	function (ctx, model) {
		var cells = $author$project$Pages$EditorStack$stackCellsFromStack(model.W);
		var cellView = function (cellValue) {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'height', '24px'),
						A2(
						$elm$html$Html$Attributes$style,
						'border',
						'1px solid ' + $author$project$Theme$stackBorder(ctx.a)),
						A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						_Utils_eq(cellValue, $elm$core$Maybe$Nothing) ? $author$project$Theme$stackEmptyBg(ctx.a) : $author$project$Theme$stackFillBg(ctx.a)),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '12px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						A2($elm$core$Maybe$withDefault, '', cellValue))
					]));
		};
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'stretch'),
					A2($elm$html$Html$Attributes$style, 'gap', '6px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
							A2($elm$html$Html$Attributes$style, 'font-weight', '700'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2($author$project$I18n$t, ctx.b, 9))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'height', '100%'),
							A2($elm$html$Html$Attributes$style, 'min-height', '0'),
							A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end'),
									A2($elm$html$Html$Attributes$style, 'gap', '4px'),
									A2($elm$html$Html$Attributes$style, 'min-height', '100%')
								]),
							A2($elm$core$List$map, cellView, cells))
						]))
				]));
	});
var $author$project$Pages$EditorStack$stackSidePanel = F2(
	function (ctx, model) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '110px'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$interactiveBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
					A2($elm$html$Html$Attributes$style, 'padding', '8px'),
					A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box')
				]),
			_List_fromArray(
				[
					A2($author$project$Pages$EditorStack$stackVisual, ctx, model)
				]));
	});
var $author$project$Pages$EditorStack$CanvasMouseDown = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $author$project$Pages$EditorStack$CanvasMouseUp = function (a) {
	return {$: 2, a: a};
};
var $author$project$Pages$EditorStack$MovePointer = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Pages$EditorStack$ZoomIn = {$: 29};
var $author$project$Pages$EditorStack$ZoomOut = {$: 28};
var $author$project$Pages$EditorStack$arrowMarker = function (color) {
	return A2(
		$elm$svg$Svg$marker,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$id('arrowhead'),
				$elm$svg$Svg$Attributes$markerWidth('10'),
				$elm$svg$Svg$Attributes$markerHeight('7'),
				$elm$svg$Svg$Attributes$viewBox('0 0 10 7'),
				$elm$svg$Svg$Attributes$refX('10'),
				$elm$svg$Svg$Attributes$refY('3.5'),
				$elm$svg$Svg$Attributes$orient('auto'),
				$elm$svg$Svg$Attributes$markerUnits('strokeWidth')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M0,0 L0,7 L10,3.5 z'),
						$elm$svg$Svg$Attributes$fill(color)
					]),
				_List_Nil)
			]));
};
var $author$project$Pages$EditorStack$canvasControlButtonAttrs = function (theme) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'height', '34px'),
			A2($elm$html$Html$Attributes$style, 'padding', '0 12px'),
			A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
			A2(
			$elm$html$Html$Attributes$style,
			'border',
			'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			$author$project$Theme$interactiveBg(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'color',
			$author$project$Theme$textColor(theme)),
			A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
			A2($elm$html$Html$Attributes$style, 'line-height', '1'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2(
			$elm$html$Html$Attributes$style,
			'box-shadow',
			$author$project$Theme$hoverShadow(theme))
		]);
};
var $author$project$Pages$EditorStack$canvasIconButtonAttrs = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'width', '34px'),
		A2($elm$html$Html$Attributes$style, 'padding', '0'),
		A2($elm$html$Html$Attributes$style, 'font-size', '18px')
	]);
var $author$project$Pages$EditorStack$ChooseSimulationTransition = function (a) {
	return {$: 35, a: a};
};
var $author$project$Pages$EditorStack$simulationChoiceOverlay = F2(
	function (ctx, model) {
		var _v0 = model.P;
		if (_v0.$ === 1) {
			return $elm$html$Html$text('');
		} else {
			var choice = _v0.a;
			var _v1 = A2($author$project$Pages$EditorStack$getStateById, choice.bQ, model.c);
			if (_v1.$ === 1) {
				return $elm$html$Html$text('');
			} else {
				var state = _v1.a;
				var transitionButton = function (transition) {
					return A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Pages$EditorStack$ChooseSimulationTransition(transition.a4)),
								A2($elm$html$Html$Attributes$style, 'display', 'block'),
								A2($elm$html$Html$Attributes$style, 'width', '100%'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '6px'),
								A2($elm$html$Html$Attributes$style, 'text-align', 'left')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$Pages$EditorStack$stateNameById, model.c, transition.f) + (' → ' + (A2($author$project$Pages$EditorStack$stateNameById, model.c, transition.g) + (' [' + ($author$project$Pages$EditorStack$transitionLabelDisplay(transition.i) + ']')))))
							]));
				};
				var relatedTransitions = A2(
					$elm$core$List$filter,
					function (transition) {
						return A2($elm$core$List$member, transition.a4, choice.al);
					},
					model.d);
				var popupWidth = 280;
				var popupGap = 24;
				var layout = $author$project$Pages$EditorStack$editorLayout(model);
				var leftPos = function () {
					var maxCanvasLeft = (layout.bh - popupWidth) - 8;
					var desiredLeft = ((((state.j * model.D) + model.U) - popupWidth) - popupGap) - 60;
					return A2($elm$core$Basics$min, maxCanvasLeft, desiredLeft);
				}();
				var topPos = A2(
					$elm$core$Basics$max,
					8,
					A2($elm$core$Basics$min, layout.bg - 170, ((state.k * model.D) + model.V) - 30));
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat(leftPos) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(topPos) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$Theme$panelBg(ctx.a)),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
							A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
							A2($elm$html$Html$Attributes$style, 'padding', '10px'),
							A2($elm$html$Html$Attributes$style, 'width', '280px'),
							A2($elm$html$Html$Attributes$style, 'box-shadow', '0 10px 24px rgba(0,0,0,0.25)'),
							A2($elm$html$Html$Attributes$style, 'z-index', '12')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 111))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-top', '4px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 112) + (' ' + ($author$project$Pages$EditorStack$stateDisplayName(state) + (', ' + (A2($author$project$I18n$t, ctx.b, 73) + (': ' + choice.bK))))))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-top', '8px')
								]),
							A2($elm$core$List$map, transitionButton, relatedTransitions)),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
									A2($elm$html$Html$Attributes$style, 'right', '-5px'),
									A2($elm$html$Html$Attributes$style, 'top', '38px'),
									A2($elm$html$Html$Attributes$style, 'width', '10px'),
									A2($elm$html$Html$Attributes$style, 'height', '10px'),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$panelBg(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'border-right',
									'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'border-top',
									'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'transform', 'rotate(45deg)')
								]),
							_List_Nil)
						]));
			}
		}
	});
var $author$project$Pages$EditorStack$startArrowMarker = function (color) {
	return A2(
		$elm$svg$Svg$marker,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$id('start-arrow'),
				$elm$svg$Svg$Attributes$markerWidth('14'),
				$elm$svg$Svg$Attributes$markerHeight('14'),
				$elm$svg$Svg$Attributes$viewBox('0 0 14 14'),
				$elm$svg$Svg$Attributes$refX('14'),
				$elm$svg$Svg$Attributes$refY('7'),
				$elm$svg$Svg$Attributes$orient('auto'),
				$elm$svg$Svg$Attributes$markerUnits('strokeWidth')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M0,0 L0,14 L14,7 z'),
						$elm$svg$Svg$Attributes$fill(color)
					]),
				_List_Nil)
			]));
};
var $author$project$Pages$EditorStack$DoubleClickState = function (a) {
	return {$: 4, a: a};
};
var $author$project$Pages$EditorStack$SelectState = function (a) {
	return {$: 5, a: a};
};
var $author$project$Pages$EditorStack$StartDrag = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$EditorStack$viewState = F3(
	function (ctx, model, s) {
		var strokeColor = s.E ? $author$project$Theme$successColor(ctx.a) : $author$project$Theme$textColor(ctx.a);
		var stateLabel = $author$project$Pages$EditorStack$stateDisplayName(s);
		var r = 22;
		var startIndicator = s.M ? _List_fromArray(
			[
				A2(
				$elm$svg$Svg$line,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x1(
						$elm$core$String$fromFloat(s.j - 64)),
						$elm$svg$Svg$Attributes$y1(
						$elm$core$String$fromFloat(s.k)),
						$elm$svg$Svg$Attributes$x2(
						$elm$core$String$fromFloat(s.j - (r + 6))),
						$elm$svg$Svg$Attributes$y2(
						$elm$core$String$fromFloat(s.k)),
						$elm$svg$Svg$Attributes$stroke(
						$author$project$Theme$textColor(ctx.a)),
						$elm$svg$Svg$Attributes$strokeWidth('3'),
						$elm$svg$Svg$Attributes$markerEnd('url(#start-arrow)'),
						$elm$svg$Svg$Attributes$pointerEvents('none')
					]),
				_List_Nil)
			]) : _List_Nil;
		var isSelected = _Utils_eq(
			model.h,
			$elm$core$Maybe$Just(s.a4));
		var strokeWidth = isSelected ? '3' : '2';
		var fillColor = function () {
			var _v4 = _Utils_Tuple2(ctx.a, s.M);
			if (!_v4.a) {
				if (_v4.b) {
					var _v5 = _v4.a;
					return '#ffd84d';
				} else {
					var _v7 = _v4.a;
					return '#ffffff';
				}
			} else {
				if (_v4.b) {
					var _v6 = _v4.a;
					return '#3d3316';
				} else {
					var _v8 = _v4.a;
					return '#1d2433';
				}
			}
		}();
		var _v0 = function () {
			var _v1 = ctx.a;
			if (!_v1) {
				return _Utils_Tuple2('#7aa2ff33', '#7aa2ff');
			} else {
				return _Utils_Tuple2('#f8e71c30', '#f5a623');
			}
		}();
		var highlightFill = _v0.a;
		var highlightStroke = _v0.b;
		var highlight = isSelected ? _List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(s.j)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(s.k)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromInt(r + 4)),
						$elm$svg$Svg$Attributes$fill(highlightFill),
						$elm$svg$Svg$Attributes$stroke(highlightStroke),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$pointerEvents('none')
					]),
				_List_Nil)
			]) : _List_Nil;
		return A2(
			$elm$svg$Svg$g,
			_List_Nil,
			_Utils_ap(
				startIndicator,
				_Utils_ap(
					highlight,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$circle,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$cx(
									$elm$core$String$fromFloat(s.j)),
									$elm$svg$Svg$Attributes$cy(
									$elm$core$String$fromFloat(s.k)),
									$elm$svg$Svg$Attributes$r(
									$elm$core$String$fromInt(r)),
									$elm$svg$Svg$Attributes$fill(fillColor),
									$elm$svg$Svg$Attributes$stroke(strokeColor),
									$elm$svg$Svg$Attributes$strokeWidth(strokeWidth),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'mousedown',
									A4(
										$elm$json$Json$Decode$map3,
										F3(
											function (button, _v2, _v3) {
												return (!button) ? _Utils_Tuple2(
													$author$project$Pages$EditorStack$StartDrag(s.a4),
													true) : _Utils_Tuple2($author$project$Pages$EditorStack$NoOp, true);
											}),
										A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int),
										A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$int),
										A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$int))),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'dblclick',
									A2(
										$elm$json$Json$Decode$map,
										function (button) {
											return (!button) ? _Utils_Tuple2(
												$author$project$Pages$EditorStack$DoubleClickState(s.a4),
												true) : _Utils_Tuple2($author$project$Pages$EditorStack$NoOp, true);
										},
										A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int))),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'click',
									A2(
										$elm$json$Json$Decode$map,
										function (button) {
											return (!button) ? _Utils_Tuple2(
												$author$project$Pages$EditorStack$SelectState(s.a4),
												true) : _Utils_Tuple2($author$project$Pages$EditorStack$NoOp, true);
										},
										A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int)))
								]),
							_List_Nil),
							s.E ? A2(
							$elm$svg$Svg$circle,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$cx(
									$elm$core$String$fromFloat(s.j)),
									$elm$svg$Svg$Attributes$cy(
									$elm$core$String$fromFloat(s.k)),
									$elm$svg$Svg$Attributes$r(
									$elm$core$String$fromInt(r - 6)),
									$elm$svg$Svg$Attributes$fill('none'),
									$elm$svg$Svg$Attributes$stroke(strokeColor),
									$elm$svg$Svg$Attributes$strokeWidth('2'),
									$elm$svg$Svg$Attributes$pointerEvents('none')
								]),
							_List_Nil) : A2($elm$svg$Svg$text_, _List_Nil, _List_Nil),
							A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromFloat(
										s.j - ($elm$core$String$length(stateLabel) * 3.5))),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromFloat(s.k + 6)),
									$elm$svg$Svg$Attributes$fontSize('14'),
									$elm$svg$Svg$Attributes$fill(
									$author$project$Theme$textColor(ctx.a)),
									$elm$svg$Svg$Attributes$style('user-select: none; -webkit-user-select: none; -moz-user-select: none;'),
									$elm$svg$Svg$Attributes$pointerEvents('none')
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(stateLabel)
								]))
						]))));
	});
var $author$project$Pages$EditorStack$SelectTransition = function (a) {
	return {$: 6, a: a};
};
var $author$project$Pages$EditorStack$transitionLabelsToText = function (labels) {
	return A2(
		$elm$core$String$join,
		', ',
		A2(
			$elm$core$List$map,
			$author$project$Pages$EditorStack$transitionLabelDisplay,
			$author$project$Pages$EditorStack$uniqueLabels(labels)));
};
var $author$project$Pages$EditorStack$viewTransition = F3(
	function (ctx, model, transitionGroup) {
		var _v0 = _Utils_Tuple2(
			A2($author$project$Pages$EditorStack$getStateById, transitionGroup.f, model.c),
			A2($author$project$Pages$EditorStack$getStateById, transitionGroup.g, model.c));
		if ((!_v0.a.$) && (!_v0.b.$)) {
			var a = _v0.a.a;
			var b = _v0.b.a;
			var shownLabel = function () {
				var uniqueGroupLabels = $author$project$Pages$EditorStack$uniqueLabels(transitionGroup.a5);
				return ($elm$core$List$length(uniqueGroupLabels) > 1) ? '' : $author$project$Pages$EditorStack$transitionLabelsToText(uniqueGroupLabels);
			}();
			var selfLoop = _Utils_eq(transitionGroup.f, transitionGroup.g);
			var selectTransitionOnClick = A2(
				$elm$html$Html$Events$stopPropagationOn,
				'click',
				A2(
					$elm$json$Json$Decode$map,
					function (button) {
						return (!button) ? _Utils_Tuple2(
							$author$project$Pages$EditorStack$SelectTransition(transitionGroup.b6),
							true) : _Utils_Tuple2($author$project$Pages$EditorStack$NoOp, true);
					},
					A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int)));
			var r = 22;
			var oppositeTransitionExists = (!_Utils_eq(transitionGroup.f, transitionGroup.g)) && A2(
				$elm$core$List$any,
				function (t) {
					return _Utils_eq(t.f, transitionGroup.g) && _Utils_eq(t.g, transitionGroup.f);
				},
				model.d);
			var labelLift = 18;
			var isSelected = function () {
				var _v3 = model.s;
				if (_v3.$ === 1) {
					return false;
				} else {
					var selectedId = _v3.a;
					return A2($elm$core$List$member, selectedId, transitionGroup.al);
				}
			}();
			var isActiveTransition = function () {
				var _v2 = model.aa;
				if (_v2.$ === 1) {
					return false;
				} else {
					var activeId = _v2.a;
					return A2($elm$core$List$member, activeId, transitionGroup.al);
				}
			}();
			var labelBackground = isActiveTransition ? $author$project$Pages$EditorStack$activeSimulationHighlightFill(ctx.a) : 'transparent';
			var strokeWidth = isSelected ? '4' : (isActiveTransition ? '3' : '2');
			var transitionStrokeColor = isActiveTransition ? $author$project$Pages$EditorStack$activeSimulationHighlightStroke(ctx.a) : $author$project$Theme$textColor(ctx.a);
			var hitWidth = A2(
				$elm$core$Basics$max,
				24,
				$elm$core$String$length(shownLabel) * 9);
			var hitHeight = 18;
			var curveOffset = 42;
			var _v1 = _Utils_Tuple2(b.j - a.j, b.k - a.k);
			var dx = _v1.a;
			var dy = _v1.b;
			var dist = $elm$core$Basics$sqrt((dx * dx) + (dy * dy));
			var safe = (dist < 0.001) ? 0.001 : dist;
			var ux = dx / safe;
			var endX = selfLoop ? (b.j - 18) : (b.j - (ux * (r + 6)));
			var rightY = ux;
			var labelNormalY = (rightY <= 0) ? rightY : (-rightY);
			var startX = selfLoop ? (a.j + 18) : (a.j + (ux * r));
			var lineAngleDeg = function () {
				if (selfLoop) {
					return -25;
				} else {
					var rawAngleDeg = (A2($elm$core$Basics$atan2, dy, dx) * 180) / $elm$core$Basics$pi;
					return (rawAngleDeg > 90) ? (rawAngleDeg - 180) : ((_Utils_cmp(rawAngleDeg, -90) < 0) ? (rawAngleDeg + 180) : rawAngleDeg);
				}
			}();
			var uy = dy / safe;
			var endY = selfLoop ? (b.k - 22) : (b.k - (uy * (r + 6)));
			var rightX = -uy;
			var controlX = ((startX + endX) / 2) + (rightX * curveOffset);
			var baseLabelX = selfLoop ? (a.j + 2) : (oppositeTransitionExists ? ((((0.25 * startX) + (0.5 * controlX)) + (0.25 * endX)) + (rightX * 14)) : ((startX + endX) / 2));
			var labelNormalX = (rightY <= 0) ? rightX : (-rightX);
			var labelX = selfLoop ? baseLabelX : (baseLabelX + (labelNormalX * labelLift));
			var startY = selfLoop ? (a.k - 22) : (a.k + (uy * r));
			var controlY = ((startY + endY) / 2) + (rightY * curveOffset);
			var baseLabelY = selfLoop ? (a.k - 72) : (oppositeTransitionExists ? ((((0.25 * startY) + (0.5 * controlY)) + (0.25 * endY)) + (rightY * 14)) : ((startY + endY) / 2));
			var labelY = selfLoop ? baseLabelY : (baseLabelY + (labelNormalY * labelLift));
			var labelRotation = 'rotate(' + ($elm$core$String$fromFloat(lineAngleDeg) + (' ' + ($elm$core$String$fromFloat(labelX) + (' ' + ($elm$core$String$fromFloat(labelY) + ')')))));
			var pathD = selfLoop ? ('M ' + ($elm$core$String$fromFloat(startX) + (' ' + ($elm$core$String$fromFloat(startY) + (' C ' + ($elm$core$String$fromFloat(a.j + 40) + (' ' + ($elm$core$String$fromFloat(a.k - 64) + (', ' + ($elm$core$String$fromFloat(a.j - 40) + (' ' + ($elm$core$String$fromFloat(a.k - 64) + (', ' + ($elm$core$String$fromFloat(endX) + (' ' + $elm$core$String$fromFloat(endY)))))))))))))))) : (oppositeTransitionExists ? ('M ' + ($elm$core$String$fromFloat(startX) + (' ' + ($elm$core$String$fromFloat(startY) + (' Q ' + ($elm$core$String$fromFloat(controlX) + (' ' + ($elm$core$String$fromFloat(controlY) + (' ' + ($elm$core$String$fromFloat(endX) + (' ' + $elm$core$String$fromFloat(endY)))))))))))) : ('M ' + ($elm$core$String$fromFloat(startX) + (' ' + ($elm$core$String$fromFloat(startY) + (' L ' + ($elm$core$String$fromFloat(endX) + (' ' + $elm$core$String$fromFloat(endY)))))))));
			return A2(
				$elm$svg$Svg$g,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$d(pathD),
								$elm$svg$Svg$Attributes$stroke('transparent'),
								$elm$svg$Svg$Attributes$strokeWidth('10'),
								$elm$svg$Svg$Attributes$fill('none'),
								selectTransitionOnClick
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$d(pathD),
								$elm$svg$Svg$Attributes$stroke(transitionStrokeColor),
								$elm$svg$Svg$Attributes$strokeWidth(strokeWidth),
								$elm$svg$Svg$Attributes$markerEnd('url(#arrowhead)'),
								$elm$svg$Svg$Attributes$fill('none'),
								$elm$svg$Svg$Attributes$pointerEvents('none')
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$rect,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$x(
								$elm$core$String$fromFloat(labelX - (hitWidth / 2))),
								$elm$svg$Svg$Attributes$y(
								$elm$core$String$fromFloat(labelY - (hitHeight / 2))),
								$elm$svg$Svg$Attributes$width(
								$elm$core$String$fromFloat(hitWidth)),
								$elm$svg$Svg$Attributes$height(
								$elm$core$String$fromFloat(hitHeight)),
								$elm$svg$Svg$Attributes$fill(labelBackground),
								$elm$svg$Svg$Attributes$stroke('none'),
								$elm$svg$Svg$Attributes$transform(labelRotation),
								selectTransitionOnClick
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$text_,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$x(
								$elm$core$String$fromFloat(labelX)),
								$elm$svg$Svg$Attributes$y(
								$elm$core$String$fromFloat(labelY)),
								$elm$svg$Svg$Attributes$textAnchor('middle'),
								$elm$svg$Svg$Attributes$dominantBaseline('middle'),
								$elm$svg$Svg$Attributes$fontSize('12'),
								$elm$svg$Svg$Attributes$fill(transitionStrokeColor),
								$elm$svg$Svg$Attributes$transform(labelRotation),
								$elm$svg$Svg$Attributes$style('user-select: none; -webkit-user-select: none; -moz-user-select: none;'),
								$elm$svg$Svg$Attributes$pointerEvents('none')
							]),
						_List_fromArray(
							[
								$elm$svg$Svg$text(shownLabel)
							]))
					]));
		} else {
			return A2($elm$svg$Svg$text_, _List_Nil, _List_Nil);
		}
	});
var $author$project$Pages$EditorStack$WheelPan = F2(
	function (a, b) {
		return {$: 36, a: a, b: b};
	});
var $author$project$Pages$EditorStack$wheelPanEvent = A2(
	$elm$html$Html$Events$custom,
	'wheel',
	A2(
		$elm$json$Json$Decode$map,
		function (msg) {
			return {bo: msg, cv: true, cE: false};
		},
		A3(
			$elm$json$Json$Decode$map2,
			$author$project$Pages$EditorStack$WheelPan,
			A2($elm$json$Json$Decode$field, 'deltaX', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'deltaY', $elm$json$Json$Decode$float))));
var $author$project$Pages$EditorStack$svgView = F4(
	function (ctx, model, _v0, _v1) {
		var cursor = function () {
			var _v2 = model.z;
			switch (_v2) {
				case 0:
					return 'crosshair';
				case 1:
					return 'pointer';
				default:
					return 'move';
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'flex', '1'),
					A2($elm$html$Html$Attributes$style, 'min-height', '0'),
					$author$project$Pages$EditorStack$wheelPanEvent
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width('100%'),
							$elm$svg$Svg$Attributes$height('100%'),
							$elm$svg$Svg$Attributes$style(
							'border:1px solid ' + ($author$project$Theme$panelBorder(ctx.a) + ('; background:' + (((ctx.a === 1) ? '#0b1320' : '#f8f9fb') + ('; cursor: ' + (cursor + '; user-select: none; -webkit-user-select: none; -moz-user-select: none;')))))),
							A2(
							$elm$svg$Svg$Events$on,
							'mousedown',
							A5(
								$elm$json$Json$Decode$map4,
								F4(
									function (tag, button, x, y) {
										return A4(
											$author$project$Pages$EditorStack$CanvasMouseDown,
											$elm$core$String$toLower(tag),
											button,
											x,
											y);
									}),
								A2(
									$elm$json$Json$Decode$at,
									_List_fromArray(
										['target', 'tagName']),
									$elm$json$Json$Decode$string),
								A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int),
								A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$int),
								A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$int))),
							A2(
							$elm$svg$Svg$Events$on,
							'mousemove',
							A3(
								$elm$json$Json$Decode$map2,
								F2(
									function (x, y) {
										return A2($author$project$Pages$EditorStack$MovePointer, x, y);
									}),
								A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$int),
								A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$int))),
							A2(
							$elm$svg$Svg$Events$on,
							'mouseup',
							A2(
								$elm$json$Json$Decode$map,
								$author$project$Pages$EditorStack$CanvasMouseUp,
								A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int)))
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$defs,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Pages$EditorStack$arrowMarker(
									$author$project$Theme$textColor(ctx.a)),
									$author$project$Pages$EditorStack$startArrowMarker(
									$author$project$Theme$textColor(ctx.a))
								])),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromFloat(model.U) + (',' + ($elm$core$String$fromFloat(model.V) + (') scale(' + ($elm$core$String$fromFloat(model.D) + ')'))))))
								]),
							$elm$core$List$concat(
								_List_fromArray(
									[
										A2(
										$elm$core$List$map,
										A2($author$project$Pages$EditorStack$viewTransition, ctx, model),
										$author$project$Pages$EditorStack$groupTransitionsForRender(model.d)),
										A2(
										$elm$core$List$map,
										A2($author$project$Pages$EditorStack$viewState, ctx, model),
										model.c)
									])))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'top', '10px'),
							A2($elm$html$Html$Attributes$style, 'right', '10px'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '6px'),
							A2($elm$html$Html$Attributes$style, 'z-index', '11')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$EditorStack$canvasControlButtonAttrs(ctx.a),
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$CenterOnStartState)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 98))
								])),
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$EditorStack$canvasControlButtonAttrs(ctx.a),
								_Utils_ap(
									$author$project$Pages$EditorStack$canvasIconButtonAttrs,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$ZoomOut)
										]))),
							_List_fromArray(
								[
									$elm$html$Html$text('-')
								])),
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$EditorStack$canvasControlButtonAttrs(ctx.a),
								_Utils_ap(
									$author$project$Pages$EditorStack$canvasIconButtonAttrs,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$ZoomIn)
										]))),
							_List_fromArray(
								[
									$elm$html$Html$text('+')
								]))
						])),
					A2($author$project$Pages$EditorStack$simulationChoiceOverlay, ctx, model)
				]));
	});
var $author$project$Pages$EditorStack$CodeEdited = function (a) {
	return {$: 21, a: a};
};
var $author$project$Pages$EditorStack$ExportCode = {$: 20};
var $author$project$Pages$EditorStack$ImportCode = {$: 19};
var $author$project$Pages$EditorStack$SetCodeEditorFocused = function (a) {
	return {$: 23, a: a};
};
var $author$project$Pages$EditorStack$activeTransitionLineFromIds = F3(
	function (target, ids, currentLine) {
		activeTransitionLineFromIds:
		while (true) {
			if (!ids.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var id_ = ids.a;
				var rest = ids.b;
				if (_Utils_eq(id_, target)) {
					return $elm$core$Maybe$Just(currentLine);
				} else {
					var $temp$target = target,
						$temp$ids = rest,
						$temp$currentLine = currentLine + 1;
					target = $temp$target;
					ids = $temp$ids;
					currentLine = $temp$currentLine;
					continue activeTransitionLineFromIds;
				}
			}
		}
	});
var $author$project$Pages$EditorStack$activeTransitionLine = function (model) {
	return A2(
		$elm$core$Maybe$andThen,
		function (activeId) {
			return A3(
				$author$project$Pages$EditorStack$activeTransitionLineFromIds,
				activeId,
				A2(
					$elm$core$List$map,
					function ($) {
						return $.a4;
					},
					A2(
						$elm$core$List$sortBy,
						function ($) {
							return $.a4;
						},
						model.d)),
				1);
		},
		model.aa);
};
var $author$project$Pages$EditorStack$CodeEditorScrolled = F2(
	function (a, b) {
		return {$: 24, a: a, b: b};
	});
var $author$project$Pages$EditorStack$codeEditorScrollEvent = A2(
	$elm$html$Html$Events$on,
	'scroll',
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$Pages$EditorStack$CodeEditorScrolled,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['target', 'scrollTop']),
			$elm$json$Json$Decode$float),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['target', 'scrollLeft']),
			$elm$json$Json$Decode$float)));
var $author$project$Pages$EditorStack$transitionFunctionPanel = F2(
	function (ctx, model) {
		var transitionFunctionValue = (model.ab || $author$project$Pages$EditorStack$hasCodeValidationErrors(model)) ? model.an : A2($author$project$Pages$EditorStack$encodeTransitionLanguage, model.c, model.d);
		var highlightedTransitionLine = $author$project$Pages$EditorStack$activeTransitionLine(model);
		var formatValidationError = function (err) {
			return A2($author$project$I18n$t, ctx.b, 37) + (' ' + ($elm$core$String$fromInt(err.bN) + (': ' + (err.b_ + (' — ' + A2($author$project$I18n$t, ctx.b, err.bo))))));
		};
		var draftIndicatorTitle = $author$project$Pages$EditorStack$hasCodeValidationErrors(model) ? A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, formatValidationError, model.ac)) : A2($author$project$I18n$t, ctx.b, 36);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '251px'),
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$panelBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '12px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 35))
								])),
							model.T ? A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
									A2(
									$elm$html$Html$Attributes$style,
									'color',
									$author$project$Pages$EditorStack$hasCodeValidationErrors(model) ? $author$project$Theme$errorColor(ctx.a) : $author$project$Theme$warningColor(ctx.a)),
									$elm$html$Html$Attributes$title(draftIndicatorTitle)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('✎')
								])) : $elm$html$Html$text('')
						])),
					function () {
					var errorLineNumbers = A2(
						$elm$core$List$map,
						function ($) {
							return $.bN;
						},
						model.ac);
					var displayLines = function () {
						var _v0 = $elm$core$String$lines(transitionFunctionValue);
						if (!_v0.b) {
							return _List_fromArray(
								['']);
						} else {
							var lines = _v0;
							return lines;
						}
					}();
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'position', 'relative'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
								A2($elm$html$Html$Attributes$style, 'flex', '1'),
								A2($elm$html$Html$Attributes$style, 'min-height', '0'),
								A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$pre,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
										A2($elm$html$Html$Attributes$style, 'inset', '0'),
										A2($elm$html$Html$Attributes$style, 'margin', '0'),
										A2($elm$html$Html$Attributes$style, 'padding', '8px'),
										A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
										A2($elm$html$Html$Attributes$style, 'white-space', 'pre-wrap'),
										A2($elm$html$Html$Attributes$style, 'word-break', 'break-word'),
										A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'line-height', '20px'),
										A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
										A2($elm$html$Html$Attributes$style, 'color', 'transparent')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'min-height', '100%'),
												A2($elm$html$Html$Attributes$style, 'min-width', '100%'),
												A2(
												$elm$html$Html$Attributes$style,
												'transform',
												'translate(' + ($elm$core$String$fromFloat(0 - model.bi) + ('px, ' + ($elm$core$String$fromFloat(0 - model.bj) + 'px)'))))
											]),
										A2(
											$elm$core$List$indexedMap,
											F2(
												function (idx, lineText) {
													return A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2(
																$elm$html$Html$Attributes$style,
																'text-decoration-line',
																A2($elm$core$List$member, idx + 1, errorLineNumbers) ? 'underline' : 'none'),
																A2(
																$elm$html$Html$Attributes$style,
																'text-decoration-style',
																A2($elm$core$List$member, idx + 1, errorLineNumbers) ? 'wavy' : 'solid'),
																A2(
																$elm$html$Html$Attributes$style,
																'text-decoration-color',
																A2($elm$core$List$member, idx + 1, errorLineNumbers) ? $author$project$Theme$errorColor(ctx.a) : 'transparent'),
																A2(
																$elm$html$Html$Attributes$style,
																'background',
																_Utils_eq(
																	highlightedTransitionLine,
																	$elm$core$Maybe$Just(idx + 1)) ? $author$project$Pages$EditorStack$activeSimulationHighlightFill(ctx.a) : 'transparent'),
																A2(
																$elm$html$Html$Attributes$style,
																'color',
																_Utils_eq(
																	highlightedTransitionLine,
																	$elm$core$Maybe$Just(idx + 1)) ? $author$project$Pages$EditorStack$activeSimulationHighlightStroke(ctx.a) : $author$project$Theme$textColor(ctx.a)),
																A2($elm$html$Html$Attributes$style, 'border-radius', '6px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																$elm$core$String$isEmpty(lineText) ? ' ' : lineText)
															]));
												}),
											displayLines))
									])),
								A2(
								$elm$html$Html$textarea,
								_List_fromArray(
									[
										$elm$html$Html$Events$onFocus(
										$author$project$Pages$EditorStack$SetCodeEditorFocused(true)),
										$elm$html$Html$Events$onBlur(
										$author$project$Pages$EditorStack$SetCodeEditorFocused(false)),
										$elm$html$Html$Events$onInput($author$project$Pages$EditorStack$CodeEdited),
										$elm$html$Html$Attributes$value(transitionFunctionValue),
										$elm$html$Html$Attributes$id('transition-function-editor'),
										A2($elm$html$Html$Attributes$style, 'position', 'relative'),
										A2($elm$html$Html$Attributes$style, 'z-index', '1'),
										$author$project$Pages$EditorStack$codeEditorScrollEvent,
										A2($elm$html$Html$Attributes$style, 'width', '100%'),
										A2($elm$html$Html$Attributes$style, 'height', '100%'),
										A2($elm$html$Html$Attributes$style, 'flex', '1'),
										A2($elm$html$Html$Attributes$style, 'min-height', '0'),
										A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
										A2($elm$html$Html$Attributes$style, 'resize', 'none'),
										A2($elm$html$Html$Attributes$style, 'background', 'transparent'),
										A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'line-height', '20px'),
										A2($elm$html$Html$Attributes$style, 'padding', '8px'),
										A2(
										$elm$html$Html$Attributes$style,
										'border',
										'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
										A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
										A2(
										$elm$html$Html$Attributes$style,
										'border-color',
										$author$project$Pages$EditorStack$hasCodeValidationErrors(model) ? $author$project$Theme$errorColor(ctx.a) : ''),
										A2($elm$html$Html$Attributes$style, 'outline', 'none'),
										A2($elm$html$Html$Attributes$style, 'color', 'transparent'),
										A2(
										$elm$html$Html$Attributes$style,
										'caret-color',
										$author$project$Theme$textColor(ctx.a)),
										A2($elm$html$Html$Attributes$style, 'text-shadow', '0 0 0 transparent')
									]),
								_List_Nil)
							]));
				}(),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px'),
							A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$ImportCode)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 48))
								])),
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$EditorStack$editorButtonStyles(ctx.a),
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$EditorStack$ExportCode)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 49))
								]))
						]))
				]));
	});
var $author$project$Pages$EditorStack$viewWithStackFlag = F3(
	function (showStack, ctx, model) {
		var layout = $author$project$Pages$EditorStack$editorLayout(model);
		var content = A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'gap', '12px'),
					A2(
					$elm$html$Html$Attributes$style,
					'color',
					$author$project$Theme$textColor(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'flex', '1'),
					A2($elm$html$Html$Attributes$style, 'min-height', '320px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
				]),
			_List_fromArray(
				[
					A2($author$project$Pages$EditorStack$transitionFunctionPanel, ctx, model),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'flex', '1'),
							A2($elm$html$Html$Attributes$style, 'min-width', '0'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'flex-direction', 'column')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
									A2($elm$html$Html$Attributes$style, 'margin-bottom', '8px'),
									A2($elm$html$Html$Attributes$style, 'gap', '8px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'margin', '0')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 31))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
											A2($elm$html$Html$Attributes$style, 'gap', '8px')
										]),
									_List_fromArray(
										[
											A2($author$project$Pages$EditorStack$automatonPanel, ctx, model)
										]))
								])),
							A4($author$project$Pages$EditorStack$svgView, ctx, model, layout.bh, layout.bg)
						])),
					A2(
					$author$project$Pages$EditorStack$editorControlsPanel,
					{b: ctx.b, a: ctx.a},
					model),
					showStack ? A2($author$project$Pages$EditorStack$stackSidePanel, ctx, model) : $elm$html$Html$text('')
				]));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px'),
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'outline', 'none'),
					$elm$html$Html$Attributes$tabindex(0),
					$author$project$Pages$EditorStack$shortcutEvent
				]),
			_List_fromArray(
				[
					content,
					A2($author$project$Pages$EditorStack$simulationPanel, ctx, model),
					model.a6 ? A2($author$project$Pages$EditorStack$saveModal, ctx, model) : $elm$html$Html$text(''),
					function () {
					var _v0 = model.aR;
					if (!_v0.$) {
						var noticeKey = _v0.a;
						var noticeColor = A2($author$project$Pages$EditorStack$globalNoticeColor, ctx.a, noticeKey);
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
									A2($elm$html$Html$Attributes$style, 'top', '20px'),
									A2($elm$html$Html$Attributes$style, 'left', '50%'),
									A2($elm$html$Html$Attributes$style, 'transform', 'translateX(-50%)'),
									A2($elm$html$Html$Attributes$style, 'z-index', '9999'),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$panelBg(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'color', noticeColor),
									A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + noticeColor),
									A2($elm$html$Html$Attributes$style, 'padding', '12px 16px'),
									A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
									A2($elm$html$Html$Attributes$style, 'box-shadow', '0 8px 24px rgba(0,0,0,0.2)'),
									A2($elm$html$Html$Attributes$style, 'font-weight', '600')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, noticeKey))
								]));
					} else {
						return $elm$html$Html$text('');
					}
				}()
				]));
	});
var $author$project$Pages$EditorStack$view = $author$project$Pages$EditorStack$viewWithStackFlag(true);
var $author$project$Pages$EditorTuring$automatonPanel = F2(
	function (ctx, model) {
		var label = 'Turing machine';
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$interactiveBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '4px 8px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '999px'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px'),
					A2($elm$html$Html$Attributes$style, 'width', 'fit-content')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.85')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2($author$project$I18n$t, ctx.b, 32) + ':')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'color',
							$author$project$Theme$textColor(ctx.a)),
							A2($elm$html$Html$Attributes$style, 'font-weight', 'bold'),
							A2($elm$html$Html$Attributes$style, 'font-size', '12px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]))
				]));
	});
var $author$project$Pages$EditorTuring$SetSelectedStateName = function (a) {
	return {$: 18, a: a};
};
var $author$project$Pages$EditorTuring$SetSelectedTransitionLabel = function (a) {
	return {$: 15, a: a};
};
var $author$project$Pages$EditorTuring$SetSelectedTransitionStackInput = function (a) {
	return {$: 16, a: a};
};
var $author$project$Pages$EditorTuring$SetSelectedTransitionStackOutput = function (a) {
	return {$: 17, a: a};
};
var $author$project$Pages$EditorTuring$SetTransitionLabel = function (a) {
	return {$: 12, a: a};
};
var $author$project$Pages$EditorTuring$SetTransitionStackInput = function (a) {
	return {$: 13, a: a};
};
var $author$project$Pages$EditorTuring$SetTransitionStackOutput = function (a) {
	return {$: 14, a: a};
};
var $author$project$Pages$EditorTuring$editorButtonStyles = function (theme) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			$author$project$Theme$interactiveBg(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'color',
			$author$project$Theme$textColor(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'border',
			'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
			A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
			A2($elm$html$Html$Attributes$style, 'padding', '4px 8px')
		]);
};
var $author$project$Pages$EditorTuring$editorTextInputStyles = function (theme) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
			A2($elm$html$Html$Attributes$style, 'line-height', 'normal'),
			A2($elm$html$Html$Attributes$style, 'font-family', 'inherit'),
			A2($elm$html$Html$Attributes$style, 'height', '32px'),
			A2($elm$html$Html$Attributes$style, 'min-height', '32px'),
			A2($elm$html$Html$Attributes$style, 'padding', '0 8px'),
			A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
			A2(
			$elm$html$Html$Attributes$style,
			'color',
			$author$project$Theme$textColor(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'caret-color',
			$author$project$Theme$textColor(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			$author$project$Theme$inputBg(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'border',
			'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
			A2($elm$html$Html$Attributes$style, 'border-radius', '6px'),
			A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle')
		]);
};
var $author$project$Pages$EditorTuring$quotedStateNameById = F2(
	function (states, stateId) {
		return '\'' + (A2($author$project$Pages$EditorTuring$stateNameById, states, stateId) + '\'');
	});
var $author$project$Pages$EditorTuring$editorControlsPanel = F2(
	function (ctx, model) {
		var simulationLocked = $author$project$Pages$EditorTuring$simulationSessionActive(model);
		var modeButton = F2(
			function (target, label) {
				return A2(
					$elm$html$Html$button,
					_Utils_ap(
						$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Pages$EditorTuring$SetMode(target)),
								A2(
								$elm$html$Html$Attributes$style,
								'background',
								_Utils_eq(model.z, target) ? $author$project$Theme$hoverBg(ctx.a) : $author$project$Theme$interactiveBg(ctx.a)),
								A2(
								$elm$html$Html$Attributes$style,
								'border-color',
								_Utils_eq(model.z, target) ? $author$project$Theme$hoverBorder(ctx.a) : $author$project$Theme$interactiveBorder(ctx.a)),
								$elm$html$Html$Attributes$disabled(simulationLocked)
							])),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]));
			});
		var cardStyles = _List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'background',
				$author$project$Theme$interactiveBg(ctx.a)),
				A2(
				$elm$html$Html$Attributes$style,
				'border',
				'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
				A2($elm$html$Html$Attributes$style, 'padding', '10px'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
				A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
			]);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '300px'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '10px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_Utils_ap(
						cardStyles,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2($elm$html$Html$Attributes$style, 'flex', '1 1 auto'),
								A2($elm$html$Html$Attributes$style, 'min-height', '0')
							])),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 67))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'gap', '8px'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'margin-top', '4px'),
									A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
								]),
							_List_fromArray(
								[
									A2(
									modeButton,
									0,
									A2($author$project$I18n$t, ctx.b, 68)),
									A2(
									modeButton,
									1,
									A2($author$project$I18n$t, ctx.b, 69)),
									A2(
									modeButton,
									2,
									A2($author$project$I18n$t, ctx.b, 70))
								])),
							(model.z === 1) ? A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 72))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
											A2($elm$html$Html$Attributes$style, 'gap', '6px'),
											A2($elm$html$Html$Attributes$style, 'align-items', 'stretch')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 73) + ':'),
											A2(
											$elm$html$Html$input,
											_Utils_ap(
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('text'),
														$elm$html$Html$Attributes$size(12),
														$elm$html$Html$Attributes$placeholder('_'),
														$elm$html$Html$Attributes$id('transition-create-label-input'),
														$elm$html$Html$Attributes$value(model.a9),
														$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$SetTransitionLabel)
													]),
												$author$project$Pages$EditorTuring$editorTextInputStyles(ctx.a)),
											_List_Nil),
											$elm$html$Html$text('Write' + ':'),
											A2(
											$elm$html$Html$input,
											_Utils_ap(
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('text'),
														$elm$html$Html$Attributes$size(12),
														$elm$html$Html$Attributes$placeholder('S'),
														$elm$html$Html$Attributes$id('transition-create-stack-input'),
														$elm$html$Html$Attributes$value(model.bx),
														$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$SetTransitionStackInput)
													]),
												$author$project$Pages$EditorTuring$editorTextInputStyles(ctx.a)),
											_List_Nil),
											$elm$html$Html$text('Move (L/R/S)' + ':'),
											A2(
											$elm$html$Html$input,
											_Utils_ap(
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('text'),
														$elm$html$Html$Attributes$size(12),
														$elm$html$Html$Attributes$placeholder('S'),
														$elm$html$Html$Attributes$id('transition-create-stack-output'),
														$elm$html$Html$Attributes$value(model.by),
														$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$SetTransitionStackOutput)
													]),
												$author$project$Pages$EditorTuring$editorTextInputStyles(ctx.a)),
											_List_Nil)
										])),
									function () {
									var _v0 = model.ah;
									if (_v0.$ === 1) {
										return $elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 76));
									} else {
										var sid = _v0.a;
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'margin-top', '4px')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 78) + (': ' + (A2($author$project$Pages$EditorTuring$stateNameById, model.c, sid) + (' → ' + A2($author$project$I18n$t, ctx.b, 76)))))
												]));
									}
								}()
								])) : $elm$html$Html$text(''),
							(model.z === 2) ? A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'overflow', 'auto')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 79))
										])),
									function () {
									var _v1 = _Utils_Tuple2(model.h, model.s);
									if (!_v1.a.$) {
										var sid = _v1.a.a;
										var _v2 = A2($author$project$Pages$EditorTuring$getStateById, sid, model.c);
										if (_v2.$ === 1) {
											return A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 81))
													]));
										} else {
											var s = _v2.a;
											return A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 82) + (': ' + $elm$core$String$fromInt(s.a4)))
															])),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'margin-top', '6px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 65) + ': '),
																A2(
																$elm$html$Html$input,
																_Utils_ap(
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$type_('text'),
																			$elm$html$Html$Attributes$id('selected-state-name-input'),
																			$elm$html$Html$Attributes$placeholder(
																			$elm$core$String$fromInt(s.a4)),
																			$elm$html$Html$Attributes$value(s.b3),
																			$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$SetSelectedStateName)
																		]),
																	$author$project$Pages$EditorTuring$editorTextInputStyles(ctx.a)),
																_List_Nil)
															])),
														model.ak ? A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'color', '#e74c3c'),
																A2($elm$html$Html$Attributes$style, 'margin-top', '4px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 66))
															])) : $elm$html$Html$text(''),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 83) + (': ' + ($elm$core$String$fromFloat(s.j) + (', ' + $elm$core$String$fromFloat(s.k)))))
															])),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 84) + (': ' + (s.E ? A2($author$project$I18n$t, ctx.b, 86) : A2($author$project$I18n$t, ctx.b, 87))))
															])),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2($author$project$I18n$t, ctx.b, 85) + (': ' + (s.M ? A2($author$project$I18n$t, ctx.b, 86) : A2($author$project$I18n$t, ctx.b, 87))))
															])),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
																A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																A2($elm$html$Html$Attributes$style, 'gap', '8px')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$button,
																_Utils_ap(
																	$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
																	_List_fromArray(
																		[
																			$elm$html$Html$Events$onClick(
																			$author$project$Pages$EditorTuring$DeleteState(s.a4))
																		])),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		A2($author$project$I18n$t, ctx.b, 88))
																	]))
															])),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																A2($elm$html$Html$Attributes$style, 'gap', '8px'),
																A2($elm$html$Html$Attributes$style, 'margin-top', '8px')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$button,
																_Utils_ap(
																	$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
																	_List_fromArray(
																		[
																			$elm$html$Html$Events$onClick(
																			$author$project$Pages$EditorTuring$ToggleStart(s.a4)),
																			$elm$html$Html$Attributes$disabled(simulationLocked)
																		])),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		s.M ? A2($author$project$I18n$t, ctx.b, 91) : A2($author$project$I18n$t, ctx.b, 92))
																	])),
																A2(
																$elm$html$Html$button,
																_Utils_ap(
																	$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
																	_List_fromArray(
																		[
																			$elm$html$Html$Events$onClick(
																			$author$project$Pages$EditorTuring$ToggleAccepting(s.a4)),
																			$elm$html$Html$Attributes$disabled(simulationLocked)
																		])),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		s.E ? A2($author$project$I18n$t, ctx.b, 93) : A2($author$project$I18n$t, ctx.b, 94))
																	]))
															]))
													]));
										}
									} else {
										if (!_v1.b.$) {
											var _v3 = _v1.a;
											var tid = _v1.b.a;
											var _v4 = $elm$core$List$head(
												A2(
													$elm$core$List$filter,
													function (tr) {
														return _Utils_eq(tr.a4, tid);
													},
													model.d));
											if (_v4.$ === 1) {
												return A2(
													$elm$html$Html$div,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text(
															A2($author$project$I18n$t, ctx.b, 81))
														]));
											} else {
												var tr = _v4.a;
												return A2(
													$elm$html$Html$div,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	A2($author$project$I18n$t, ctx.b, 89) + (': ' + (A2($author$project$Pages$EditorTuring$quotedStateNameById, model.c, tr.f) + (' → ' + A2($author$project$Pages$EditorTuring$quotedStateNameById, model.c, tr.g)))))
																])),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	A2($elm$html$Html$Attributes$style, 'margin-top', '6px'),
																	A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																	A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
																	A2($elm$html$Html$Attributes$style, 'gap', '6px')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	A2($author$project$I18n$t, ctx.b, 73) + ': '),
																	A2(
																	$elm$html$Html$input,
																	_Utils_ap(
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$type_('text'),
																				$elm$html$Html$Attributes$id('selected-transition-label-input'),
																				$elm$html$Html$Attributes$placeholder('_'),
																				$elm$html$Html$Attributes$value(model.Y),
																				$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$SetSelectedTransitionLabel)
																			]),
																		$author$project$Pages$EditorTuring$editorTextInputStyles(ctx.a)),
																	_List_Nil),
																	$elm$html$Html$text('Write' + ':'),
																	A2(
																	$elm$html$Html$input,
																	_Utils_ap(
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$type_('text'),
																				$elm$html$Html$Attributes$id('selected-transition-stack-input'),
																				$elm$html$Html$Attributes$placeholder('S'),
																				$elm$html$Html$Attributes$value(model.Z),
																				$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$SetSelectedTransitionStackInput)
																			]),
																		$author$project$Pages$EditorTuring$editorTextInputStyles(ctx.a)),
																	_List_Nil),
																	$elm$html$Html$text('Move (L/R/S)' + ':'),
																	A2(
																	$elm$html$Html$input,
																	_Utils_ap(
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$type_('text'),
																				$elm$html$Html$Attributes$id('selected-transition-stack-output'),
																				$elm$html$Html$Attributes$placeholder('S'),
																				$elm$html$Html$Attributes$value(model._),
																				$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$SetSelectedTransitionStackOutput)
																			]),
																		$author$project$Pages$EditorTuring$editorTextInputStyles(ctx.a)),
																	_List_Nil)
																])),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
																	A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																	A2($elm$html$Html$Attributes$style, 'gap', '8px')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$button,
																	_Utils_ap(
																		$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
																		_List_fromArray(
																			[
																				$elm$html$Html$Events$onClick(
																				$author$project$Pages$EditorTuring$DeleteTransition(tr.a4))
																			])),
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			A2($author$project$I18n$t, ctx.b, 90))
																		]))
																]))
														]));
											}
										} else {
											return A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 80))
													]));
										}
									}
								}()
								])) : $elm$html$Html$text('')
						]))
				]));
	});
var $author$project$Pages$EditorTuring$globalNoticeColor = F2(
	function (theme, key) {
		switch (key) {
			case 106:
				return $author$project$Theme$successColor(theme);
			case 107:
				return $author$project$Theme$warningColor(theme);
			case 108:
				return $author$project$Theme$errorColor(theme);
			case 109:
				return $author$project$Theme$errorColor(theme);
			case 110:
				return $author$project$Theme$errorColor(theme);
			default:
				return $author$project$Theme$textColor(theme);
		}
	});
var $author$project$Pages$EditorTuring$CloseSaveModal = {$: 40};
var $author$project$Pages$EditorTuring$ConfirmRenameSlot = function (a) {
	return {$: 46, a: a};
};
var $author$project$Pages$EditorTuring$DeleteFromSlot = function (a) {
	return {$: 43, a: a};
};
var $author$project$Pages$EditorTuring$ExportSlot = function (a) {
	return {$: 50, a: a};
};
var $author$project$Pages$EditorTuring$ImportSlot = function (a) {
	return {$: 51, a: a};
};
var $author$project$Pages$EditorTuring$LoadFromSlot = function (a) {
	return {$: 42, a: a};
};
var $author$project$Pages$EditorTuring$SaveToSlot = function (a) {
	return {$: 41, a: a};
};
var $author$project$Pages$EditorTuring$StartRenameSlot = function (a) {
	return {$: 44, a: a};
};
var $author$project$Pages$EditorTuring$UpdateRenameDraft = function (a) {
	return {$: 45, a: a};
};
var $author$project$Pages$EditorTuring$saveModal = F2(
	function (ctx, model) {
		var viewSlot = function (slot) {
			var slotTypeBadge = function () {
				var _v0 = slot.cj;
				if (!_v0.$) {
					if (!_v0.a) {
						var _v1 = _v0.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'padding', '2px 8px'),
									A2($elm$html$Html$Attributes$style, 'border-radius', '999px'),
									A2(
									$elm$html$Html$Attributes$style,
									'border',
									'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$interactiveBg(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
									A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
									A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 2))
								]));
					} else {
						var _v2 = _v0.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'padding', '2px 8px'),
									A2($elm$html$Html$Attributes$style, 'border-radius', '999px'),
									A2(
									$elm$html$Html$Attributes$style,
									'border',
									'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$interactiveBg(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
									A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
									A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 3))
								]));
					}
				} else {
					return $elm$html$Html$text('');
				}
			}();
			var renameInputWidth = $elm$core$String$fromInt(
				A2(
					$elm$core$Basics$max,
					10,
					$elm$core$String$length(model.af) + 2)) + 'ch';
			var isSaving = _Utils_eq(
				model.aE,
				$elm$core$Maybe$Just(slot.a4));
			var isDeleting = _Utils_eq(
				model.aN,
				$elm$core$Maybe$Just(slot.a4));
			var slotBackground = isSaving ? 'rgba(46, 204, 113, 0.12)' : (isDeleting ? 'rgba(231, 76, 60, 0.12)' : 'transparent');
			var slotOpacity = isDeleting ? '0.82' : '1';
			var slotTransform = isSaving ? 'translateY(-1px) scale(1.01)' : (isDeleting ? 'scale(0.985)' : 'scale(1)');
			var hasAutomaton = !$elm$core$String$isEmpty(slot.aZ);
			var slotLabel = hasAutomaton ? ($elm$core$String$isEmpty(slot.b3) ? '' : slot.b3) : A2($author$project$I18n$t, ctx.b, 63);
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$style,
						'border',
						'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
						A2($elm$html$Html$Attributes$style, 'padding', '10px'),
						A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
						A2($elm$html$Html$Attributes$style, 'background', slotBackground),
						A2($elm$html$Html$Attributes$style, 'transform', slotTransform),
						A2($elm$html$Html$Attributes$style, 'opacity', slotOpacity),
						A2($elm$html$Html$Attributes$style, 'transition', 'background 360ms ease, transform 360ms ease, opacity 360ms ease')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, ctx.b, 62) + (' ' + ($elm$core$String$fromInt(slot.a4) + ':')))
									])),
								_Utils_eq(
								model.ag,
								$elm$core$Maybe$Just(slot.a4)) ? A2(
								$elm$html$Html$input,
								_Utils_ap(
									_List_fromArray(
										[
											$elm$html$Html$Attributes$type_('text'),
											$elm$html$Html$Attributes$value(model.af),
											$elm$html$Html$Attributes$placeholder(
											A2($author$project$I18n$t, ctx.b, 59)),
											$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$UpdateRenameDraft),
											A2($elm$html$Html$Attributes$style, 'width', renameInputWidth)
										]),
									$author$project$Pages$EditorTuring$editorTextInputStyles(ctx.a)),
								_List_Nil) : A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(slotLabel)
									])),
								_Utils_eq(
								model.ag,
								$elm$core$Maybe$Just(slot.a4)) ? A2(
								$elm$html$Html$button,
								_Utils_ap(
									$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Pages$EditorTuring$ConfirmRenameSlot(slot.a4)),
											$elm$html$Html$Attributes$title(
											A2($author$project$I18n$t, ctx.b, 60))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('✓')
									])) : A2(
								$elm$html$Html$button,
								_Utils_ap(
									$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Pages$EditorTuring$StartRenameSlot(slot.a4)),
											$elm$html$Html$Attributes$title(
											A2($author$project$I18n$t, ctx.b, 59))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('✎')
									])),
								slotTypeBadge,
								_Utils_eq(
								model.aI,
								$elm$core$Maybe$Just(slot.a4)) ? A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$Attributes$style,
										'color',
										$author$project$Theme$successColor(ctx.a)),
										A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, ctx.b, 61))
									])) : $elm$html$Html$text('')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'gap', '8px'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
								A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'gap', '8px'),
										A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
									]),
								A2(
									$elm$core$List$cons,
									A2(
										$elm$html$Html$button,
										_Utils_ap(
											$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick(
													$author$project$Pages$EditorTuring$SaveToSlot(slot.a4))
												])),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, ctx.b, 52))
											])),
									hasAutomaton ? _List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$EditorTuring$LoadFromSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 53))
												])),
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$EditorTuring$DeleteFromSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 54))
												]))
										]) : _List_Nil)),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'gap', '8px'),
										A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
										A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
									]),
								_Utils_ap(
									hasAutomaton ? _List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$EditorTuring$ExportSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 56))
												]))
										]) : _List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Pages$EditorTuring$ImportSlot(slot.a4))
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 55))
												]))
										])))
							]))
					]));
		};
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'inset', '0'),
					A2($elm$html$Html$Attributes$style, 'background', 'rgba(0,0,0,0.45)'),
					A2($elm$html$Html$Attributes$style, 'z-index', '2000'),
					$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$CloseSaveModal)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'max-width', '740px'),
							A2($elm$html$Html$Attributes$style, 'margin', '40px auto'),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$Theme$panelBg(ctx.a)),
							A2(
							$elm$html$Html$Attributes$style,
							'color',
							$author$project$Theme$textColor(ctx.a)),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
							A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
							A2($elm$html$Html$Attributes$style, 'padding', '16px'),
							A2(
							$elm$html$Html$Events$stopPropagationOn,
							'click',
							$elm$json$Json$Decode$succeed(
								_Utils_Tuple2($author$project$Pages$EditorTuring$NoOp, true)))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'margin-bottom', '10px'),
									A2($elm$html$Html$Attributes$style, 'min-height', '32px'),
									A2($elm$html$Html$Attributes$style, 'gap', '12px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'margin', '0')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 51))
										])),
									model.u ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', '#e74c3c'),
											A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
											A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
											A2($elm$html$Html$Attributes$style, 'max-width', '420px')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 58))
										])) : (model.K ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', '#e74c3c'),
											A2($elm$html$Html$Attributes$style, 'font-weight', '600'),
											A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'right')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 57))
										])) : $elm$html$Html$text(''))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'grid'),
									A2($elm$html$Html$Attributes$style, 'grid-template-columns', '1fr'),
									A2($elm$html$Html$Attributes$style, 'gap', '10px')
								]),
							A2($elm$core$List$map, viewSlot, model.e)),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-top', '12px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_Utils_ap(
										$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$CloseSaveModal)
											])),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 64))
										]))
								]))
						]))
				]));
	});
var $author$project$Pages$EditorTuring$HandleShortcut = function (a) {
	return {$: 58, a: a};
};
var $author$project$Pages$EditorTuring$ShortcutEvent = F5(
	function (code, shiftKey, altKey, metaKey, targetEditable) {
		return {aY: altKey, a$: code, b1: metaKey, a7: shiftKey, b9: targetEditable};
	});
var $author$project$Pages$EditorTuring$shortcutEvent = A2(
	$elm$html$Html$Events$custom,
	'keydown',
	A2(
		$elm$json$Json$Decode$map,
		function (event) {
			var hasShortcut = (((!event.a7) && (event.aY && A2(
				$elm$core$List$member,
				event.a$,
				_List_fromArray(
					['Digit1', 'Digit2', 'Digit3', 'KeyS', 'KeyE', 'KeyN', 'KeyQ', 'KeyT', 'Comma', 'Period'])))) || ((event.a7 && (event.aY && A2(
				$elm$core$List$member,
				event.a$,
				_List_fromArray(
					['KeyS', 'Enter', 'KeyN'])))) || (((!event.a7) && ((!event.aY) && (event.a$ === 'Delete'))) || ((!event.a7) && ((!event.aY) && (event.b1 && (event.a$ === 'Backspace'))))))) && (!event.b9);
			return {
				bo: $author$project$Pages$EditorTuring$HandleShortcut(event),
				cv: hasShortcut,
				cE: hasShortcut
			};
		},
		A6(
			$elm$json$Json$Decode$map5,
			$author$project$Pages$EditorTuring$ShortcutEvent,
			A2($elm$json$Json$Decode$field, 'code', $elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'altKey', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'metaKey', $elm$json$Json$Decode$bool),
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['target', 'isContentEditable']),
						$elm$json$Json$Decode$bool),
						A2(
						$elm$json$Json$Decode$map,
						function (tag) {
							var normalized = $elm$core$String$toLower(tag);
							return (normalized === 'input') || ((normalized === 'textarea') || (normalized === 'select'));
						},
						A2(
							$elm$json$Json$Decode$at,
							_List_fromArray(
								['target', 'tagName']),
							$elm$json$Json$Decode$string))
					])))));
var $author$project$Pages$EditorTuring$SetSimulationDelay = function (a) {
	return {$: 26, a: a};
};
var $author$project$Pages$EditorTuring$SetSimulationInput = function (a) {
	return {$: 25, a: a};
};
var $author$project$Pages$EditorTuring$StartStepSimulation = {$: 31};
var $author$project$Pages$EditorTuring$StepBackwardSimulation = {$: 34};
var $author$project$Pages$EditorTuring$StepForwardSimulation = {$: 33};
var $author$project$Pages$EditorTuring$activeSimulationHighlightFill = function (theme) {
	if (!theme) {
		return '#7aa2ff33';
	} else {
		return '#f8e71c30';
	}
};
var $author$project$Pages$EditorTuring$activeSimulationHighlightStroke = function (theme) {
	if (!theme) {
		return '#245dff';
	} else {
		return '#ffd54f';
	}
};
var $author$project$Pages$EditorTuring$simulationInputPreview = F2(
	function (theme, model) {
		var viewportTiles = 9;
		var tileWidthPx = 36;
		var tileGapPx = 6;
		var tileStepPx = tileWidthPx + tileGapPx;
		var viewportWidthPx = (viewportTiles * tileStepPx) - tileGapPx;
		var simulationActive = !_Utils_eq(model.J, $elm$core$Maybe$Nothing);
		var highlightedInputIndex = model.Q;
		var targetShiftPx = A2($elm$core$Basics$max, 0, (highlightedInputIndex - 5) * tileStepPx);
		var currentMarkerIndex = simulationActive ? highlightedInputIndex : (-1);
		var viewChar = F2(
			function (idx, _char) {
				var isCurrent = _Utils_eq(idx, currentMarkerIndex);
				var isConsumed = false;
				return A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline-flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromInt(tileWidthPx) + 'px'),
							A2($elm$html$Html$Attributes$style, 'height', '24px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '6px'),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + (isCurrent ? $author$project$Pages$EditorTuring$activeSimulationHighlightStroke(theme) : $author$project$Theme$interactiveBorder(theme))),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							isCurrent ? $author$project$Pages$EditorTuring$activeSimulationHighlightFill(theme) : $author$project$Theme$interactiveBg(theme)),
							A2(
							$elm$html$Html$Attributes$style,
							'color',
							isCurrent ? $author$project$Pages$EditorTuring$activeSimulationHighlightStroke(theme) : $author$project$Theme$textColor(theme)),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							isConsumed ? '0.55' : '1'),
							A2(
							$elm$html$Html$Attributes$style,
							'font-weight',
							isCurrent ? '700' : '500')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromChar(_char))
						]));
			});
		var chars = simulationActive ? ($elm$core$List$isEmpty(model.R) ? _List_fromArray(
			[$author$project$Pages$EditorTuring$blankSymbol]) : model.R) : $elm$core$String$toList(model.aB);
		var contentChars = A2(
			$elm$core$Basics$max,
			1,
			$elm$core$List$length(chars));
		var totalWidthPx = (contentChars * tileStepPx) - tileGapPx;
		var maxShiftPx = A2($elm$core$Basics$max, 0, totalWidthPx - viewportWidthPx);
		var shiftPx = A2($elm$core$Basics$min, maxShiftPx, targetShiftPx);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-top', '12px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
					A2($elm$html$Html$Attributes$style, 'font-size', '15px'),
					A2($elm$html$Html$Attributes$style, 'line-height', '24px'),
					A2($elm$html$Html$Attributes$style, 'height', '34px'),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
					A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$interactiveBg(theme)),
					A2($elm$html$Html$Attributes$style, 'padding', '4px 8px')
				]),
			$elm$core$List$isEmpty(chars) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline-flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2(
							$elm$html$Html$Attributes$style,
							'width',
							$elm$core$String$fromInt(tileWidthPx) + 'px'),
							A2($elm$html$Html$Attributes$style, 'height', '24px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '6px'),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$Theme$interactiveBg(theme)),
							A2($elm$html$Html$Attributes$style, 'opacity', '0.7'),
							A2($elm$html$Html$Attributes$style, 'font-style', 'italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('_')
						]))
				]) : _List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline-flex'),
							A2(
							$elm$html$Html$Attributes$style,
							'gap',
							$elm$core$String$fromInt(tileGapPx) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'transform',
							'translateX(-' + ($elm$core$String$fromInt(shiftPx) + 'px)')),
							A2($elm$html$Html$Attributes$style, 'transition', 'transform 220ms ease')
						]),
					A2($elm$core$List$indexedMap, viewChar, chars))
				]));
	});
var $author$project$Pages$EditorTuring$clampInt = F3(
	function (low, high, value) {
		return (_Utils_cmp(value, low) < 0) ? low : ((_Utils_cmp(value, high) > 0) ? high : value);
	});
var $author$project$Pages$EditorTuring$simulationInputWidthCh = function (inputValue) {
	return A3(
		$author$project$Pages$EditorTuring$clampInt,
		18,
		110,
		$elm$core$String$length(inputValue) + 6);
};
var $author$project$Pages$EditorTuring$simulationSpeedIndexFromDelay = function (rawDelay) {
	var delay = $elm$core$Basics$round(
		$author$project$Pages$EditorTuring$parseDelay(rawDelay));
	var pickNearest = F2(
		function (current, best) {
			pickNearest:
			while (true) {
				if (!current.b) {
					return best;
				} else {
					var _v1 = current.a;
					var index = _v1.a;
					var candidate = _v1.b;
					var rest = current.b;
					if (_Utils_cmp(
						$elm$core$Basics$abs(delay - candidate),
						$elm$core$Basics$abs(delay - best.b)) < 0) {
						var $temp$current = rest,
							$temp$best = _Utils_Tuple2(index, candidate);
						current = $temp$current;
						best = $temp$best;
						continue pickNearest;
					} else {
						var $temp$current = rest,
							$temp$best = best;
						current = $temp$current;
						best = $temp$best;
						continue pickNearest;
					}
				}
			}
		});
	var _v2 = A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, $author$project$Pages$EditorTuring$simulationSpeedStops);
	if (!_v2.b) {
		return 2;
	} else {
		var first = _v2.a;
		var rest = _v2.b;
		return A2(pickNearest, rest, first).a;
	}
};
var $author$project$Pages$EditorTuring$simulationStatus = F2(
	function (lang, result) {
		switch (result) {
			case 0:
				return $elm$core$Maybe$Nothing;
			case 1:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 105),
						'#2980b9'));
			case 2:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 106),
						'#2ecc71'));
			case 3:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 107),
						'#e67e22'));
			case 4:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 108),
						'#e74c3c'));
			default:
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($author$project$I18n$t, lang, 109),
						'#e74c3c'));
		}
	});
var $author$project$Pages$EditorTuring$simulationPanel = F2(
	function (ctx, model) {
		var speedIndex = $author$project$Pages$EditorTuring$simulationSpeedIndexFromDelay(model.aA);
		var simulationLocked = $author$project$Pages$EditorTuring$simulationSessionActive(model) || $author$project$Pages$EditorTuring$hasCodeValidationErrors(model);
		var inputWidthCh = $author$project$Pages$EditorTuring$simulationInputWidthCh(model.aB);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$panelBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '14px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'flex-shrink', '0')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '10px'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin', '0'),
									A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
									A2($elm$html$Html$Attributes$style, 'min-width', '130px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 95))
								])),
							A2(
							$elm$html$Html$textarea,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$rows(1),
									$elm$html$Html$Attributes$id('simulation-input-field'),
									$elm$html$Html$Attributes$placeholder(
									A2($author$project$I18n$t, ctx.b, 96)),
									$elm$html$Html$Attributes$value(model.aB),
									$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$SetSimulationInput),
									$elm$html$Html$Attributes$disabled(simulationLocked),
									A2($elm$html$Html$Attributes$style, 'min-width', '170px'),
									A2(
									$elm$html$Html$Attributes$style,
									'width',
									'min(' + ($elm$core$String$fromInt(inputWidthCh) + 'ch, 92vw)')),
									A2($elm$html$Html$Attributes$style, 'max-width', '100%'),
									A2($elm$html$Html$Attributes$style, 'height', '32px'),
									A2($elm$html$Html$Attributes$style, 'min-height', '32px'),
									A2($elm$html$Html$Attributes$style, 'max-height', '120px'),
									A2($elm$html$Html$Attributes$style, 'padding', '6px 12px'),
									A2($elm$html$Html$Attributes$style, 'line-height', '16px'),
									A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
									A2($elm$html$Html$Attributes$style, 'resize', 'none'),
									A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$interactiveBg(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'color',
									$author$project$Theme$textColor(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
									A2(
									$elm$html$Html$Attributes$style,
									'border',
									'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
									A2($elm$html$Html$Attributes$style, 'outline', 'none')
								]),
							_List_Nil),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
									A2($elm$html$Html$Attributes$style, 'gap', '4px'),
									A2($elm$html$Html$Attributes$style, 'min-width', '170px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$input,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$type_('range'),
											$elm$html$Html$Attributes$min('0'),
											$elm$html$Html$Attributes$max('4'),
											$elm$html$Html$Attributes$step('1'),
											$elm$html$Html$Attributes$value(
											$elm$core$String$fromInt(speedIndex)),
											$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$SetSimulationDelay),
											$elm$html$Html$Attributes$disabled(simulationLocked),
											A2($elm$html$Html$Attributes$style, 'width', '100%')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'font-size', '12px'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
											A2($elm$html$Html$Attributes$style, 'opacity', '0.85')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 97) + (': ' + (model.aA + ' ms')))
										]))
								])),
							function () {
							var _v0 = model.aj;
							if (_v0.$ === 1) {
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'gap', '8px'),
											A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$StartSimulation),
														$elm$html$Html$Attributes$disabled(simulationLocked),
														A2($elm$html$Html$Attributes$style, 'height', '36px')
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 99))
												])),
											A2(
											$elm$html$Html$button,
											_Utils_ap(
												$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$StartStepSimulation),
														$elm$html$Html$Attributes$disabled(simulationLocked),
														A2($elm$html$Html$Attributes$style, 'height', '36px')
													])),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2($author$project$I18n$t, ctx.b, 100))
												]))
										]));
							} else {
								if (!_v0.a) {
									var _v1 = _v0.a;
									return A2(
										$elm$html$Html$button,
										_Utils_ap(
											$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$StopSimulation),
													A2($elm$html$Html$Attributes$style, 'height', '36px')
												])),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, ctx.b, 101))
											]));
								} else {
									var _v2 = _v0.a;
									return A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'display', 'flex'),
												A2($elm$html$Html$Attributes$style, 'gap', '8px'),
												A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$button,
												_Utils_ap(
													$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$StopSimulation),
															A2($elm$html$Html$Attributes$style, 'height', '36px')
														])),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 101))
													])),
												A2(
												$elm$html$Html$button,
												_Utils_ap(
													$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$StepForwardSimulation),
															$elm$html$Html$Attributes$disabled(
															_Utils_eq(model.J, $elm$core$Maybe$Nothing)),
															A2($elm$html$Html$Attributes$style, 'height', '36px')
														])),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 102))
													])),
												A2(
												$elm$html$Html$button,
												_Utils_ap(
													$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$StepBackwardSimulation),
															$elm$html$Html$Attributes$disabled(
															$elm$core$List$isEmpty(model.av)),
															A2($elm$html$Html$Attributes$style, 'height', '36px')
														])),
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$I18n$t, ctx.b, 103))
													]))
											]));
								}
							}
						}(),
							function () {
							var _v3 = A2($author$project$Pages$EditorTuring$simulationStatus, ctx.b, model.S);
							if (_v3.$ === 1) {
								return $elm$html$Html$text('');
							} else {
								var _v4 = _v3.a;
								var msg = _v4.a;
								var color = _v4.b;
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', color),
											A2($elm$html$Html$Attributes$style, 'margin-left', 'auto'),
											A2($elm$html$Html$Attributes$style, 'margin-right', 'auto'),
											A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
											A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
											A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(msg)
										]));
							}
						}()
						])),
					A2($author$project$Pages$EditorTuring$simulationInputPreview, ctx.a, model)
				]));
	});
var $author$project$Pages$EditorTuring$stackCellsFromStack = function (stack) {
	return $elm$core$List$isEmpty(stack) ? _List_fromArray(
		[$elm$core$Maybe$Nothing]) : A2($elm$core$List$map, $elm$core$Maybe$Just, stack);
};
var $author$project$Pages$EditorTuring$stackVisual = F2(
	function (ctx, model) {
		var cells = $author$project$Pages$EditorTuring$stackCellsFromStack(model.W);
		var cellView = function (cellValue) {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'height', '24px'),
						A2(
						$elm$html$Html$Attributes$style,
						'border',
						'1px solid ' + $author$project$Theme$stackBorder(ctx.a)),
						A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						_Utils_eq(cellValue, $elm$core$Maybe$Nothing) ? $author$project$Theme$stackEmptyBg(ctx.a) : $author$project$Theme$stackFillBg(ctx.a)),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
						A2($elm$html$Html$Attributes$style, 'font-size', '12px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						A2($elm$core$Maybe$withDefault, '', cellValue))
					]));
		};
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'stretch'),
					A2($elm$html$Html$Attributes$style, 'gap', '6px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
							A2($elm$html$Html$Attributes$style, 'font-weight', '700'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2($author$project$I18n$t, ctx.b, 9))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'height', '100%'),
							A2($elm$html$Html$Attributes$style, 'min-height', '0'),
							A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end'),
									A2($elm$html$Html$Attributes$style, 'gap', '4px'),
									A2($elm$html$Html$Attributes$style, 'min-height', '100%')
								]),
							A2($elm$core$List$map, cellView, cells))
						]))
				]));
	});
var $author$project$Pages$EditorTuring$stackSidePanel = F2(
	function (ctx, model) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '110px'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$interactiveBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$interactiveBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
					A2($elm$html$Html$Attributes$style, 'padding', '8px'),
					A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box')
				]),
			_List_fromArray(
				[
					A2($author$project$Pages$EditorTuring$stackVisual, ctx, model)
				]));
	});
var $author$project$Pages$EditorTuring$CanvasMouseDown = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $author$project$Pages$EditorTuring$CanvasMouseUp = function (a) {
	return {$: 2, a: a};
};
var $author$project$Pages$EditorTuring$MovePointer = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Pages$EditorTuring$ZoomIn = {$: 29};
var $author$project$Pages$EditorTuring$ZoomOut = {$: 28};
var $author$project$Pages$EditorTuring$arrowMarker = function (color) {
	return A2(
		$elm$svg$Svg$marker,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$id('arrowhead'),
				$elm$svg$Svg$Attributes$markerWidth('10'),
				$elm$svg$Svg$Attributes$markerHeight('7'),
				$elm$svg$Svg$Attributes$viewBox('0 0 10 7'),
				$elm$svg$Svg$Attributes$refX('10'),
				$elm$svg$Svg$Attributes$refY('3.5'),
				$elm$svg$Svg$Attributes$orient('auto'),
				$elm$svg$Svg$Attributes$markerUnits('strokeWidth')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M0,0 L0,7 L10,3.5 z'),
						$elm$svg$Svg$Attributes$fill(color)
					]),
				_List_Nil)
			]));
};
var $author$project$Pages$EditorTuring$canvasControlButtonAttrs = function (theme) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'height', '34px'),
			A2($elm$html$Html$Attributes$style, 'padding', '0 12px'),
			A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
			A2(
			$elm$html$Html$Attributes$style,
			'border',
			'1px solid ' + $author$project$Theme$interactiveBorder(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			$author$project$Theme$interactiveBg(theme)),
			A2(
			$elm$html$Html$Attributes$style,
			'color',
			$author$project$Theme$textColor(theme)),
			A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
			A2($elm$html$Html$Attributes$style, 'line-height', '1'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2(
			$elm$html$Html$Attributes$style,
			'box-shadow',
			$author$project$Theme$hoverShadow(theme))
		]);
};
var $author$project$Pages$EditorTuring$canvasIconButtonAttrs = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'width', '34px'),
		A2($elm$html$Html$Attributes$style, 'padding', '0'),
		A2($elm$html$Html$Attributes$style, 'font-size', '18px')
	]);
var $author$project$Pages$EditorTuring$ChooseSimulationTransition = function (a) {
	return {$: 35, a: a};
};
var $author$project$Pages$EditorTuring$transitionLabelDisplay = function (label) {
	var parts = $author$project$Pages$EditorTuring$decodeStackTransitionLabel(label);
	var stackOutputDisplay = $elm$core$String$isEmpty(parts.O) ? 'λ' : parts.O;
	var inputSymbol = $elm$core$String$isEmpty(parts.w) ? 'λ' : parts.w;
	var inputStackDisplay = $elm$core$String$isEmpty(parts.v) ? 'λ' : parts.v;
	return ($elm$core$String$isEmpty(parts.w) && ($elm$core$String$isEmpty(parts.v) && $elm$core$String$isEmpty(parts.O))) ? 'λ' : (inputSymbol + (', ' + (inputStackDisplay + (' -> ' + stackOutputDisplay))));
};
var $author$project$Pages$EditorTuring$simulationChoiceOverlay = F2(
	function (ctx, model) {
		var _v0 = model.P;
		if (_v0.$ === 1) {
			return $elm$html$Html$text('');
		} else {
			var choice = _v0.a;
			var _v1 = A2($author$project$Pages$EditorTuring$getStateById, choice.bQ, model.c);
			if (_v1.$ === 1) {
				return $elm$html$Html$text('');
			} else {
				var state = _v1.a;
				var transitionButton = function (transition) {
					return A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Pages$EditorTuring$ChooseSimulationTransition(transition.a4)),
								A2($elm$html$Html$Attributes$style, 'display', 'block'),
								A2($elm$html$Html$Attributes$style, 'width', '100%'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '6px'),
								A2($elm$html$Html$Attributes$style, 'text-align', 'left')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$Pages$EditorTuring$stateNameById, model.c, transition.f) + (' → ' + (A2($author$project$Pages$EditorTuring$stateNameById, model.c, transition.g) + (' [' + ($author$project$Pages$EditorTuring$transitionLabelDisplay(transition.i) + ']')))))
							]));
				};
				var relatedTransitions = A2(
					$elm$core$List$filter,
					function (transition) {
						return A2($elm$core$List$member, transition.a4, choice.al);
					},
					model.d);
				var popupWidth = 280;
				var popupGap = 24;
				var layout = $author$project$Pages$EditorTuring$editorLayout(model);
				var leftPos = function () {
					var maxCanvasLeft = (layout.bh - popupWidth) - 8;
					var desiredLeft = ((((state.j * model.D) + model.U) - popupWidth) - popupGap) - 60;
					return A2($elm$core$Basics$min, maxCanvasLeft, desiredLeft);
				}();
				var topPos = A2(
					$elm$core$Basics$max,
					8,
					A2($elm$core$Basics$min, layout.bg - 170, ((state.k * model.D) + model.V) - 30));
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat(leftPos) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'top',
							$elm$core$String$fromFloat(topPos) + 'px'),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$Theme$panelBg(ctx.a)),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
							A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
							A2($elm$html$Html$Attributes$style, 'padding', '10px'),
							A2($elm$html$Html$Attributes$style, 'width', '280px'),
							A2($elm$html$Html$Attributes$style, 'box-shadow', '0 10px 24px rgba(0,0,0,0.25)'),
							A2($elm$html$Html$Attributes$style, 'z-index', '12')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 111))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-top', '4px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 112) + (' ' + ($author$project$Pages$EditorTuring$stateDisplayName(state) + (', ' + (A2($author$project$I18n$t, ctx.b, 73) + (': ' + choice.bK))))))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-top', '8px')
								]),
							A2($elm$core$List$map, transitionButton, relatedTransitions)),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
									A2($elm$html$Html$Attributes$style, 'right', '-5px'),
									A2($elm$html$Html$Attributes$style, 'top', '38px'),
									A2($elm$html$Html$Attributes$style, 'width', '10px'),
									A2($elm$html$Html$Attributes$style, 'height', '10px'),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$panelBg(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'border-right',
									'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
									A2(
									$elm$html$Html$Attributes$style,
									'border-top',
									'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'transform', 'rotate(45deg)')
								]),
							_List_Nil)
						]));
			}
		}
	});
var $author$project$Pages$EditorTuring$startArrowMarker = function (color) {
	return A2(
		$elm$svg$Svg$marker,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$id('start-arrow'),
				$elm$svg$Svg$Attributes$markerWidth('14'),
				$elm$svg$Svg$Attributes$markerHeight('14'),
				$elm$svg$Svg$Attributes$viewBox('0 0 14 14'),
				$elm$svg$Svg$Attributes$refX('14'),
				$elm$svg$Svg$Attributes$refY('7'),
				$elm$svg$Svg$Attributes$orient('auto'),
				$elm$svg$Svg$Attributes$markerUnits('strokeWidth')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M0,0 L0,14 L14,7 z'),
						$elm$svg$Svg$Attributes$fill(color)
					]),
				_List_Nil)
			]));
};
var $author$project$Pages$EditorTuring$DoubleClickState = function (a) {
	return {$: 4, a: a};
};
var $author$project$Pages$EditorTuring$SelectState = function (a) {
	return {$: 5, a: a};
};
var $author$project$Pages$EditorTuring$StartDrag = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$EditorTuring$viewState = F3(
	function (ctx, model, s) {
		var strokeColor = s.E ? $author$project$Theme$successColor(ctx.a) : $author$project$Theme$textColor(ctx.a);
		var stateLabel = $author$project$Pages$EditorTuring$stateDisplayName(s);
		var r = 22;
		var startIndicator = s.M ? _List_fromArray(
			[
				A2(
				$elm$svg$Svg$line,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x1(
						$elm$core$String$fromFloat(s.j - 64)),
						$elm$svg$Svg$Attributes$y1(
						$elm$core$String$fromFloat(s.k)),
						$elm$svg$Svg$Attributes$x2(
						$elm$core$String$fromFloat(s.j - (r + 6))),
						$elm$svg$Svg$Attributes$y2(
						$elm$core$String$fromFloat(s.k)),
						$elm$svg$Svg$Attributes$stroke(
						$author$project$Theme$textColor(ctx.a)),
						$elm$svg$Svg$Attributes$strokeWidth('3'),
						$elm$svg$Svg$Attributes$markerEnd('url(#start-arrow)'),
						$elm$svg$Svg$Attributes$pointerEvents('none')
					]),
				_List_Nil)
			]) : _List_Nil;
		var isSelected = _Utils_eq(
			model.h,
			$elm$core$Maybe$Just(s.a4));
		var strokeWidth = isSelected ? '3' : '2';
		var fillColor = function () {
			var _v4 = _Utils_Tuple2(ctx.a, s.M);
			if (!_v4.a) {
				if (_v4.b) {
					var _v5 = _v4.a;
					return '#ffd84d';
				} else {
					var _v7 = _v4.a;
					return '#ffffff';
				}
			} else {
				if (_v4.b) {
					var _v6 = _v4.a;
					return '#3d3316';
				} else {
					var _v8 = _v4.a;
					return '#1d2433';
				}
			}
		}();
		var _v0 = function () {
			var _v1 = ctx.a;
			if (!_v1) {
				return _Utils_Tuple2('#7aa2ff33', '#7aa2ff');
			} else {
				return _Utils_Tuple2('#f8e71c30', '#f5a623');
			}
		}();
		var highlightFill = _v0.a;
		var highlightStroke = _v0.b;
		var highlight = isSelected ? _List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromFloat(s.j)),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromFloat(s.k)),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromInt(r + 4)),
						$elm$svg$Svg$Attributes$fill(highlightFill),
						$elm$svg$Svg$Attributes$stroke(highlightStroke),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$pointerEvents('none')
					]),
				_List_Nil)
			]) : _List_Nil;
		return A2(
			$elm$svg$Svg$g,
			_List_Nil,
			_Utils_ap(
				startIndicator,
				_Utils_ap(
					highlight,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$circle,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$cx(
									$elm$core$String$fromFloat(s.j)),
									$elm$svg$Svg$Attributes$cy(
									$elm$core$String$fromFloat(s.k)),
									$elm$svg$Svg$Attributes$r(
									$elm$core$String$fromInt(r)),
									$elm$svg$Svg$Attributes$fill(fillColor),
									$elm$svg$Svg$Attributes$stroke(strokeColor),
									$elm$svg$Svg$Attributes$strokeWidth(strokeWidth),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'mousedown',
									A4(
										$elm$json$Json$Decode$map3,
										F3(
											function (button, _v2, _v3) {
												return (!button) ? _Utils_Tuple2(
													$author$project$Pages$EditorTuring$StartDrag(s.a4),
													true) : _Utils_Tuple2($author$project$Pages$EditorTuring$NoOp, true);
											}),
										A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int),
										A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$int),
										A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$int))),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'dblclick',
									A2(
										$elm$json$Json$Decode$map,
										function (button) {
											return (!button) ? _Utils_Tuple2(
												$author$project$Pages$EditorTuring$DoubleClickState(s.a4),
												true) : _Utils_Tuple2($author$project$Pages$EditorTuring$NoOp, true);
										},
										A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int))),
									A2(
									$elm$html$Html$Events$stopPropagationOn,
									'click',
									A2(
										$elm$json$Json$Decode$map,
										function (button) {
											return (!button) ? _Utils_Tuple2(
												$author$project$Pages$EditorTuring$SelectState(s.a4),
												true) : _Utils_Tuple2($author$project$Pages$EditorTuring$NoOp, true);
										},
										A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int)))
								]),
							_List_Nil),
							s.E ? A2(
							$elm$svg$Svg$circle,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$cx(
									$elm$core$String$fromFloat(s.j)),
									$elm$svg$Svg$Attributes$cy(
									$elm$core$String$fromFloat(s.k)),
									$elm$svg$Svg$Attributes$r(
									$elm$core$String$fromInt(r - 6)),
									$elm$svg$Svg$Attributes$fill('none'),
									$elm$svg$Svg$Attributes$stroke(strokeColor),
									$elm$svg$Svg$Attributes$strokeWidth('2'),
									$elm$svg$Svg$Attributes$pointerEvents('none')
								]),
							_List_Nil) : A2($elm$svg$Svg$text_, _List_Nil, _List_Nil),
							A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromFloat(
										s.j - ($elm$core$String$length(stateLabel) * 3.5))),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromFloat(s.k + 6)),
									$elm$svg$Svg$Attributes$fontSize('14'),
									$elm$svg$Svg$Attributes$fill(
									$author$project$Theme$textColor(ctx.a)),
									$elm$svg$Svg$Attributes$style('user-select: none; -webkit-user-select: none; -moz-user-select: none;'),
									$elm$svg$Svg$Attributes$pointerEvents('none')
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(stateLabel)
								]))
						]))));
	});
var $author$project$Pages$EditorTuring$SelectTransition = function (a) {
	return {$: 6, a: a};
};
var $author$project$Pages$EditorTuring$transitionLabelsToText = function (labels) {
	return A2(
		$elm$core$String$join,
		', ',
		A2(
			$elm$core$List$map,
			$author$project$Pages$EditorTuring$transitionLabelDisplay,
			$author$project$Pages$EditorTuring$uniqueLabels(labels)));
};
var $author$project$Pages$EditorTuring$viewTransition = F3(
	function (ctx, model, transitionGroup) {
		var _v0 = _Utils_Tuple2(
			A2($author$project$Pages$EditorTuring$getStateById, transitionGroup.f, model.c),
			A2($author$project$Pages$EditorTuring$getStateById, transitionGroup.g, model.c));
		if ((!_v0.a.$) && (!_v0.b.$)) {
			var a = _v0.a.a;
			var b = _v0.b.a;
			var shownLabel = function () {
				var uniqueGroupLabels = $author$project$Pages$EditorTuring$uniqueLabels(transitionGroup.a5);
				return ($elm$core$List$length(uniqueGroupLabels) > 1) ? '' : $author$project$Pages$EditorTuring$transitionLabelsToText(uniqueGroupLabels);
			}();
			var selfLoop = _Utils_eq(transitionGroup.f, transitionGroup.g);
			var selectTransitionOnClick = A2(
				$elm$html$Html$Events$stopPropagationOn,
				'click',
				A2(
					$elm$json$Json$Decode$map,
					function (button) {
						return (!button) ? _Utils_Tuple2(
							$author$project$Pages$EditorTuring$SelectTransition(transitionGroup.b6),
							true) : _Utils_Tuple2($author$project$Pages$EditorTuring$NoOp, true);
					},
					A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int)));
			var r = 22;
			var oppositeTransitionExists = (!_Utils_eq(transitionGroup.f, transitionGroup.g)) && A2(
				$elm$core$List$any,
				function (t) {
					return _Utils_eq(t.f, transitionGroup.g) && _Utils_eq(t.g, transitionGroup.f);
				},
				model.d);
			var labelLift = 18;
			var isSelected = function () {
				var _v3 = model.s;
				if (_v3.$ === 1) {
					return false;
				} else {
					var selectedId = _v3.a;
					return A2($elm$core$List$member, selectedId, transitionGroup.al);
				}
			}();
			var isActiveTransition = function () {
				var _v2 = model.aa;
				if (_v2.$ === 1) {
					return false;
				} else {
					var activeId = _v2.a;
					return A2($elm$core$List$member, activeId, transitionGroup.al);
				}
			}();
			var labelBackground = isActiveTransition ? $author$project$Pages$EditorTuring$activeSimulationHighlightFill(ctx.a) : 'transparent';
			var strokeWidth = isSelected ? '4' : (isActiveTransition ? '3' : '2');
			var transitionStrokeColor = isActiveTransition ? $author$project$Pages$EditorTuring$activeSimulationHighlightStroke(ctx.a) : $author$project$Theme$textColor(ctx.a);
			var hitWidth = A2(
				$elm$core$Basics$max,
				24,
				$elm$core$String$length(shownLabel) * 9);
			var hitHeight = 18;
			var curveOffset = 42;
			var _v1 = _Utils_Tuple2(b.j - a.j, b.k - a.k);
			var dx = _v1.a;
			var dy = _v1.b;
			var dist = $elm$core$Basics$sqrt((dx * dx) + (dy * dy));
			var safe = (dist < 0.001) ? 0.001 : dist;
			var ux = dx / safe;
			var endX = selfLoop ? (b.j - 18) : (b.j - (ux * (r + 6)));
			var rightY = ux;
			var labelNormalY = (rightY <= 0) ? rightY : (-rightY);
			var startX = selfLoop ? (a.j + 18) : (a.j + (ux * r));
			var lineAngleDeg = function () {
				if (selfLoop) {
					return -25;
				} else {
					var rawAngleDeg = (A2($elm$core$Basics$atan2, dy, dx) * 180) / $elm$core$Basics$pi;
					return (rawAngleDeg > 90) ? (rawAngleDeg - 180) : ((_Utils_cmp(rawAngleDeg, -90) < 0) ? (rawAngleDeg + 180) : rawAngleDeg);
				}
			}();
			var uy = dy / safe;
			var endY = selfLoop ? (b.k - 22) : (b.k - (uy * (r + 6)));
			var rightX = -uy;
			var controlX = ((startX + endX) / 2) + (rightX * curveOffset);
			var baseLabelX = selfLoop ? (a.j + 2) : (oppositeTransitionExists ? ((((0.25 * startX) + (0.5 * controlX)) + (0.25 * endX)) + (rightX * 14)) : ((startX + endX) / 2));
			var labelNormalX = (rightY <= 0) ? rightX : (-rightX);
			var labelX = selfLoop ? baseLabelX : (baseLabelX + (labelNormalX * labelLift));
			var startY = selfLoop ? (a.k - 22) : (a.k + (uy * r));
			var controlY = ((startY + endY) / 2) + (rightY * curveOffset);
			var baseLabelY = selfLoop ? (a.k - 72) : (oppositeTransitionExists ? ((((0.25 * startY) + (0.5 * controlY)) + (0.25 * endY)) + (rightY * 14)) : ((startY + endY) / 2));
			var labelY = selfLoop ? baseLabelY : (baseLabelY + (labelNormalY * labelLift));
			var labelRotation = 'rotate(' + ($elm$core$String$fromFloat(lineAngleDeg) + (' ' + ($elm$core$String$fromFloat(labelX) + (' ' + ($elm$core$String$fromFloat(labelY) + ')')))));
			var pathD = selfLoop ? ('M ' + ($elm$core$String$fromFloat(startX) + (' ' + ($elm$core$String$fromFloat(startY) + (' C ' + ($elm$core$String$fromFloat(a.j + 40) + (' ' + ($elm$core$String$fromFloat(a.k - 64) + (', ' + ($elm$core$String$fromFloat(a.j - 40) + (' ' + ($elm$core$String$fromFloat(a.k - 64) + (', ' + ($elm$core$String$fromFloat(endX) + (' ' + $elm$core$String$fromFloat(endY)))))))))))))))) : (oppositeTransitionExists ? ('M ' + ($elm$core$String$fromFloat(startX) + (' ' + ($elm$core$String$fromFloat(startY) + (' Q ' + ($elm$core$String$fromFloat(controlX) + (' ' + ($elm$core$String$fromFloat(controlY) + (' ' + ($elm$core$String$fromFloat(endX) + (' ' + $elm$core$String$fromFloat(endY)))))))))))) : ('M ' + ($elm$core$String$fromFloat(startX) + (' ' + ($elm$core$String$fromFloat(startY) + (' L ' + ($elm$core$String$fromFloat(endX) + (' ' + $elm$core$String$fromFloat(endY)))))))));
			return A2(
				$elm$svg$Svg$g,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$d(pathD),
								$elm$svg$Svg$Attributes$stroke('transparent'),
								$elm$svg$Svg$Attributes$strokeWidth('10'),
								$elm$svg$Svg$Attributes$fill('none'),
								selectTransitionOnClick
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$d(pathD),
								$elm$svg$Svg$Attributes$stroke(transitionStrokeColor),
								$elm$svg$Svg$Attributes$strokeWidth(strokeWidth),
								$elm$svg$Svg$Attributes$markerEnd('url(#arrowhead)'),
								$elm$svg$Svg$Attributes$fill('none'),
								$elm$svg$Svg$Attributes$pointerEvents('none')
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$rect,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$x(
								$elm$core$String$fromFloat(labelX - (hitWidth / 2))),
								$elm$svg$Svg$Attributes$y(
								$elm$core$String$fromFloat(labelY - (hitHeight / 2))),
								$elm$svg$Svg$Attributes$width(
								$elm$core$String$fromFloat(hitWidth)),
								$elm$svg$Svg$Attributes$height(
								$elm$core$String$fromFloat(hitHeight)),
								$elm$svg$Svg$Attributes$fill(labelBackground),
								$elm$svg$Svg$Attributes$stroke('none'),
								$elm$svg$Svg$Attributes$transform(labelRotation),
								selectTransitionOnClick
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$text_,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$x(
								$elm$core$String$fromFloat(labelX)),
								$elm$svg$Svg$Attributes$y(
								$elm$core$String$fromFloat(labelY)),
								$elm$svg$Svg$Attributes$textAnchor('middle'),
								$elm$svg$Svg$Attributes$dominantBaseline('middle'),
								$elm$svg$Svg$Attributes$fontSize('12'),
								$elm$svg$Svg$Attributes$fill(transitionStrokeColor),
								$elm$svg$Svg$Attributes$transform(labelRotation),
								$elm$svg$Svg$Attributes$style('user-select: none; -webkit-user-select: none; -moz-user-select: none;'),
								$elm$svg$Svg$Attributes$pointerEvents('none')
							]),
						_List_fromArray(
							[
								$elm$svg$Svg$text(shownLabel)
							]))
					]));
		} else {
			return A2($elm$svg$Svg$text_, _List_Nil, _List_Nil);
		}
	});
var $author$project$Pages$EditorTuring$WheelPan = F2(
	function (a, b) {
		return {$: 36, a: a, b: b};
	});
var $author$project$Pages$EditorTuring$wheelPanEvent = A2(
	$elm$html$Html$Events$custom,
	'wheel',
	A2(
		$elm$json$Json$Decode$map,
		function (msg) {
			return {bo: msg, cv: true, cE: false};
		},
		A3(
			$elm$json$Json$Decode$map2,
			$author$project$Pages$EditorTuring$WheelPan,
			A2($elm$json$Json$Decode$field, 'deltaX', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'deltaY', $elm$json$Json$Decode$float))));
var $author$project$Pages$EditorTuring$svgView = F4(
	function (ctx, model, _v0, _v1) {
		var cursor = function () {
			var _v2 = model.z;
			switch (_v2) {
				case 0:
					return 'crosshair';
				case 1:
					return 'pointer';
				default:
					return 'move';
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'flex', '1'),
					A2($elm$html$Html$Attributes$style, 'min-height', '0'),
					$author$project$Pages$EditorTuring$wheelPanEvent
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width('100%'),
							$elm$svg$Svg$Attributes$height('100%'),
							$elm$svg$Svg$Attributes$style(
							'border:1px solid ' + ($author$project$Theme$panelBorder(ctx.a) + ('; background:' + (((ctx.a === 1) ? '#0b1320' : '#f8f9fb') + ('; cursor: ' + (cursor + '; user-select: none; -webkit-user-select: none; -moz-user-select: none;')))))),
							A2(
							$elm$svg$Svg$Events$on,
							'mousedown',
							A5(
								$elm$json$Json$Decode$map4,
								F4(
									function (tag, button, x, y) {
										return A4(
											$author$project$Pages$EditorTuring$CanvasMouseDown,
											$elm$core$String$toLower(tag),
											button,
											x,
											y);
									}),
								A2(
									$elm$json$Json$Decode$at,
									_List_fromArray(
										['target', 'tagName']),
									$elm$json$Json$Decode$string),
								A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int),
								A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$int),
								A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$int))),
							A2(
							$elm$svg$Svg$Events$on,
							'mousemove',
							A3(
								$elm$json$Json$Decode$map2,
								F2(
									function (x, y) {
										return A2($author$project$Pages$EditorTuring$MovePointer, x, y);
									}),
								A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$int),
								A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$int))),
							A2(
							$elm$svg$Svg$Events$on,
							'mouseup',
							A2(
								$elm$json$Json$Decode$map,
								$author$project$Pages$EditorTuring$CanvasMouseUp,
								A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int)))
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$defs,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Pages$EditorTuring$arrowMarker(
									$author$project$Theme$textColor(ctx.a)),
									$author$project$Pages$EditorTuring$startArrowMarker(
									$author$project$Theme$textColor(ctx.a))
								])),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform(
									'translate(' + ($elm$core$String$fromFloat(model.U) + (',' + ($elm$core$String$fromFloat(model.V) + (') scale(' + ($elm$core$String$fromFloat(model.D) + ')'))))))
								]),
							$elm$core$List$concat(
								_List_fromArray(
									[
										A2(
										$elm$core$List$map,
										A2($author$project$Pages$EditorTuring$viewTransition, ctx, model),
										$author$project$Pages$EditorTuring$groupTransitionsForRender(model.d)),
										A2(
										$elm$core$List$map,
										A2($author$project$Pages$EditorTuring$viewState, ctx, model),
										model.c)
									])))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'top', '10px'),
							A2($elm$html$Html$Attributes$style, 'right', '10px'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '6px'),
							A2($elm$html$Html$Attributes$style, 'z-index', '11')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$EditorTuring$canvasControlButtonAttrs(ctx.a),
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$CenterOnStartState)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 98))
								])),
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$EditorTuring$canvasControlButtonAttrs(ctx.a),
								_Utils_ap(
									$author$project$Pages$EditorTuring$canvasIconButtonAttrs,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$ZoomOut)
										]))),
							_List_fromArray(
								[
									$elm$html$Html$text('-')
								])),
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$EditorTuring$canvasControlButtonAttrs(ctx.a),
								_Utils_ap(
									$author$project$Pages$EditorTuring$canvasIconButtonAttrs,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$ZoomIn)
										]))),
							_List_fromArray(
								[
									$elm$html$Html$text('+')
								]))
						])),
					A2($author$project$Pages$EditorTuring$simulationChoiceOverlay, ctx, model)
				]));
	});
var $author$project$Pages$EditorTuring$CodeEdited = function (a) {
	return {$: 21, a: a};
};
var $author$project$Pages$EditorTuring$ExportCode = {$: 20};
var $author$project$Pages$EditorTuring$ImportCode = {$: 19};
var $author$project$Pages$EditorTuring$SetCodeEditorFocused = function (a) {
	return {$: 23, a: a};
};
var $author$project$Pages$EditorTuring$activeTransitionLineFromIds = F3(
	function (target, ids, currentLine) {
		activeTransitionLineFromIds:
		while (true) {
			if (!ids.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var id_ = ids.a;
				var rest = ids.b;
				if (_Utils_eq(id_, target)) {
					return $elm$core$Maybe$Just(currentLine);
				} else {
					var $temp$target = target,
						$temp$ids = rest,
						$temp$currentLine = currentLine + 1;
					target = $temp$target;
					ids = $temp$ids;
					currentLine = $temp$currentLine;
					continue activeTransitionLineFromIds;
				}
			}
		}
	});
var $author$project$Pages$EditorTuring$activeTransitionLine = function (model) {
	return A2(
		$elm$core$Maybe$andThen,
		function (activeId) {
			return A3(
				$author$project$Pages$EditorTuring$activeTransitionLineFromIds,
				activeId,
				A2(
					$elm$core$List$map,
					function ($) {
						return $.a4;
					},
					A2(
						$elm$core$List$sortBy,
						function ($) {
							return $.a4;
						},
						model.d)),
				1);
		},
		model.aa);
};
var $author$project$Pages$EditorTuring$CodeEditorScrolled = F2(
	function (a, b) {
		return {$: 24, a: a, b: b};
	});
var $author$project$Pages$EditorTuring$codeEditorScrollEvent = A2(
	$elm$html$Html$Events$on,
	'scroll',
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$Pages$EditorTuring$CodeEditorScrolled,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['target', 'scrollTop']),
			$elm$json$Json$Decode$float),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['target', 'scrollLeft']),
			$elm$json$Json$Decode$float)));
var $author$project$Pages$EditorTuring$transitionFunctionPanel = F2(
	function (ctx, model) {
		var transitionFunctionValue = (model.ab || $author$project$Pages$EditorTuring$hasCodeValidationErrors(model)) ? model.an : A2($author$project$Pages$EditorTuring$encodeTransitionLanguage, model.c, model.d);
		var highlightedTransitionLine = $author$project$Pages$EditorTuring$activeTransitionLine(model);
		var formatValidationError = function (err) {
			return A2($author$project$I18n$t, ctx.b, 37) + (' ' + ($elm$core$String$fromInt(err.bN) + (': ' + (err.b_ + (' — ' + A2($author$project$I18n$t, ctx.b, err.bo))))));
		};
		var draftIndicatorTitle = $author$project$Pages$EditorTuring$hasCodeValidationErrors(model) ? A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, formatValidationError, model.ac)) : A2($author$project$I18n$t, ctx.b, 36);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '251px'),
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$panelBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '12px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 35))
								])),
							model.T ? A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
									A2(
									$elm$html$Html$Attributes$style,
									'color',
									$author$project$Pages$EditorTuring$hasCodeValidationErrors(model) ? $author$project$Theme$errorColor(ctx.a) : $author$project$Theme$warningColor(ctx.a)),
									$elm$html$Html$Attributes$title(draftIndicatorTitle)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('✎')
								])) : $elm$html$Html$text('')
						])),
					function () {
					var errorLineNumbers = A2(
						$elm$core$List$map,
						function ($) {
							return $.bN;
						},
						model.ac);
					var displayLines = function () {
						var _v0 = $elm$core$String$lines(transitionFunctionValue);
						if (!_v0.b) {
							return _List_fromArray(
								['']);
						} else {
							var lines = _v0;
							return lines;
						}
					}();
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'position', 'relative'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
								A2($elm$html$Html$Attributes$style, 'flex', '1'),
								A2($elm$html$Html$Attributes$style, 'min-height', '0'),
								A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$pre,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
										A2($elm$html$Html$Attributes$style, 'inset', '0'),
										A2($elm$html$Html$Attributes$style, 'margin', '0'),
										A2($elm$html$Html$Attributes$style, 'padding', '8px'),
										A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
										A2($elm$html$Html$Attributes$style, 'white-space', 'pre-wrap'),
										A2($elm$html$Html$Attributes$style, 'word-break', 'break-word'),
										A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'line-height', '20px'),
										A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
										A2($elm$html$Html$Attributes$style, 'color', 'transparent')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'min-height', '100%'),
												A2($elm$html$Html$Attributes$style, 'min-width', '100%'),
												A2(
												$elm$html$Html$Attributes$style,
												'transform',
												'translate(' + ($elm$core$String$fromFloat(0 - model.bi) + ('px, ' + ($elm$core$String$fromFloat(0 - model.bj) + 'px)'))))
											]),
										A2(
											$elm$core$List$indexedMap,
											F2(
												function (idx, lineText) {
													return A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2(
																$elm$html$Html$Attributes$style,
																'text-decoration-line',
																A2($elm$core$List$member, idx + 1, errorLineNumbers) ? 'underline' : 'none'),
																A2(
																$elm$html$Html$Attributes$style,
																'text-decoration-style',
																A2($elm$core$List$member, idx + 1, errorLineNumbers) ? 'wavy' : 'solid'),
																A2(
																$elm$html$Html$Attributes$style,
																'text-decoration-color',
																A2($elm$core$List$member, idx + 1, errorLineNumbers) ? $author$project$Theme$errorColor(ctx.a) : 'transparent'),
																A2(
																$elm$html$Html$Attributes$style,
																'background',
																_Utils_eq(
																	highlightedTransitionLine,
																	$elm$core$Maybe$Just(idx + 1)) ? $author$project$Pages$EditorTuring$activeSimulationHighlightFill(ctx.a) : 'transparent'),
																A2(
																$elm$html$Html$Attributes$style,
																'color',
																_Utils_eq(
																	highlightedTransitionLine,
																	$elm$core$Maybe$Just(idx + 1)) ? $author$project$Pages$EditorTuring$activeSimulationHighlightStroke(ctx.a) : $author$project$Theme$textColor(ctx.a)),
																A2($elm$html$Html$Attributes$style, 'border-radius', '6px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																$elm$core$String$isEmpty(lineText) ? ' ' : lineText)
															]));
												}),
											displayLines))
									])),
								A2(
								$elm$html$Html$textarea,
								_List_fromArray(
									[
										$elm$html$Html$Events$onFocus(
										$author$project$Pages$EditorTuring$SetCodeEditorFocused(true)),
										$elm$html$Html$Events$onBlur(
										$author$project$Pages$EditorTuring$SetCodeEditorFocused(false)),
										$elm$html$Html$Events$onInput($author$project$Pages$EditorTuring$CodeEdited),
										$elm$html$Html$Attributes$value(transitionFunctionValue),
										$elm$html$Html$Attributes$id('transition-function-editor'),
										A2($elm$html$Html$Attributes$style, 'position', 'relative'),
										A2($elm$html$Html$Attributes$style, 'z-index', '1'),
										$author$project$Pages$EditorTuring$codeEditorScrollEvent,
										A2($elm$html$Html$Attributes$style, 'width', '100%'),
										A2($elm$html$Html$Attributes$style, 'height', '100%'),
										A2($elm$html$Html$Attributes$style, 'flex', '1'),
										A2($elm$html$Html$Attributes$style, 'min-height', '0'),
										A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
										A2($elm$html$Html$Attributes$style, 'resize', 'none'),
										A2($elm$html$Html$Attributes$style, 'background', 'transparent'),
										A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
										A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
										A2($elm$html$Html$Attributes$style, 'line-height', '20px'),
										A2($elm$html$Html$Attributes$style, 'padding', '8px'),
										A2(
										$elm$html$Html$Attributes$style,
										'border',
										'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
										A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
										A2(
										$elm$html$Html$Attributes$style,
										'border-color',
										$author$project$Pages$EditorTuring$hasCodeValidationErrors(model) ? $author$project$Theme$errorColor(ctx.a) : ''),
										A2($elm$html$Html$Attributes$style, 'outline', 'none'),
										A2($elm$html$Html$Attributes$style, 'color', 'transparent'),
										A2(
										$elm$html$Html$Attributes$style,
										'caret-color',
										$author$project$Theme$textColor(ctx.a)),
										A2($elm$html$Html$Attributes$style, 'text-shadow', '0 0 0 transparent')
									]),
								_List_Nil)
							]));
				}(),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'gap', '8px'),
							A2($elm$html$Html$Attributes$style, 'flex-wrap', 'wrap')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$ImportCode)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 48))
								])),
							A2(
							$elm$html$Html$button,
							_Utils_ap(
								$author$project$Pages$EditorTuring$editorButtonStyles(ctx.a),
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Pages$EditorTuring$ExportCode)
									])),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, 49))
								]))
						]))
				]));
	});
var $author$project$Pages$EditorTuring$viewWithStackFlag = F3(
	function (showStack, ctx, model) {
		var layout = $author$project$Pages$EditorTuring$editorLayout(model);
		var content = A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'gap', '12px'),
					A2(
					$elm$html$Html$Attributes$style,
					'color',
					$author$project$Theme$textColor(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'flex', '1'),
					A2($elm$html$Html$Attributes$style, 'min-height', '320px'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
				]),
			_List_fromArray(
				[
					A2($author$project$Pages$EditorTuring$transitionFunctionPanel, ctx, model),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'flex', '1'),
							A2($elm$html$Html$Attributes$style, 'min-width', '0'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'flex-direction', 'column')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
									A2($elm$html$Html$Attributes$style, 'margin-bottom', '8px'),
									A2($elm$html$Html$Attributes$style, 'gap', '8px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'margin', '0')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, ctx.b, 31))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
											A2($elm$html$Html$Attributes$style, 'gap', '8px')
										]),
									_List_fromArray(
										[
											A2($author$project$Pages$EditorTuring$automatonPanel, ctx, model)
										]))
								])),
							A4($author$project$Pages$EditorTuring$svgView, ctx, model, layout.bh, layout.bg)
						])),
					A2(
					$author$project$Pages$EditorTuring$editorControlsPanel,
					{b: ctx.b, a: ctx.a},
					model),
					showStack ? A2($author$project$Pages$EditorTuring$stackSidePanel, ctx, model) : $elm$html$Html$text('')
				]));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px'),
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'outline', 'none'),
					$elm$html$Html$Attributes$tabindex(0),
					$author$project$Pages$EditorTuring$shortcutEvent
				]),
			_List_fromArray(
				[
					content,
					A2($author$project$Pages$EditorTuring$simulationPanel, ctx, model),
					model.a6 ? A2($author$project$Pages$EditorTuring$saveModal, ctx, model) : $elm$html$Html$text(''),
					function () {
					var _v0 = model.aR;
					if (!_v0.$) {
						var noticeKey = _v0.a;
						var noticeColor = A2($author$project$Pages$EditorTuring$globalNoticeColor, ctx.a, noticeKey);
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
									A2($elm$html$Html$Attributes$style, 'top', '20px'),
									A2($elm$html$Html$Attributes$style, 'left', '50%'),
									A2($elm$html$Html$Attributes$style, 'transform', 'translateX(-50%)'),
									A2($elm$html$Html$Attributes$style, 'z-index', '9999'),
									A2(
									$elm$html$Html$Attributes$style,
									'background',
									$author$project$Theme$panelBg(ctx.a)),
									A2($elm$html$Html$Attributes$style, 'color', noticeColor),
									A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + noticeColor),
									A2($elm$html$Html$Attributes$style, 'padding', '12px 16px'),
									A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
									A2($elm$html$Html$Attributes$style, 'box-shadow', '0 8px 24px rgba(0,0,0,0.2)'),
									A2($elm$html$Html$Attributes$style, 'font-weight', '600')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, ctx.b, noticeKey))
								]));
					} else {
						return $elm$html$Html$text('');
					}
				}()
				]));
	});
var $author$project$Pages$EditorTuring$view = $author$project$Pages$EditorTuring$viewWithStackFlag(false);
var $author$project$I18n$InstructionsBody = 28;
var $author$project$I18n$InstructionsTitle = 27;
var $author$project$Pages$Instructions$isSectionHeader = function (line) {
	var _v0 = $elm$core$String$uncons(line);
	if (!_v0.$) {
		var _v1 = _v0.a;
		var firstChar = _v1.a;
		var rest = _v1.b;
		return $elm$core$Char$isDigit(firstChar) && A2($elm$core$String$startsWith, ') ', rest);
	} else {
		return false;
	}
};
var $author$project$Pages$Instructions$viewInstructionLine = function (line) {
	return $elm$core$String$isEmpty(line) ? A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '8px')
			]),
		_List_Nil) : ($author$project$Pages$Instructions$isSectionHeader(line) ? A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'font-weight', '700'),
				A2($elm$html$Html$Attributes$style, 'margin', '10px 0 6px'),
				A2($elm$html$Html$Attributes$style, 'font-size', '1.02rem')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(line)
			])) : (A2($elm$core$String$startsWith, '⚠️', line) ? A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'margin', '8px 0'),
				A2($elm$html$Html$Attributes$style, 'padding', '10px 12px'),
				A2($elm$html$Html$Attributes$style, 'background', 'rgba(255, 193, 7, 0.14)'),
				A2($elm$html$Html$Attributes$style, 'border', '1px solid rgba(255, 193, 7, 0.45)'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
				A2($elm$html$Html$Attributes$style, 'font-weight', '600')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(line)
			])) : (A2($elm$core$String$startsWith, '• ', line) ? A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'padding-left', '10px'),
				A2($elm$html$Html$Attributes$style, 'margin', '4px 0')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(line)
			])) : A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(line)
			])))));
};
var $author$project$Pages$Instructions$view = F2(
	function (ctx, _v0) {
		var instructionLines = $elm$core$String$lines(
			A2($author$project$I18n$t, ctx.b, 28));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('responsive-block'),
					A2($elm$html$Html$Attributes$style, 'margin-top', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'background',
					$author$project$Theme$panelBg(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'color',
					$author$project$Theme$textColor(ctx.a)),
					A2(
					$elm$html$Html$Attributes$style,
					'border',
					'1px solid ' + $author$project$Theme$panelBorder(ctx.a)),
					A2($elm$html$Html$Attributes$style, 'padding', '16px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2($author$project$I18n$t, ctx.b, 27))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'line-height', '1.65'),
							A2($elm$html$Html$Attributes$style, 'background', 'rgba(127, 127, 127, 0.08)'),
							A2($elm$html$Html$Attributes$style, 'border', '1px solid rgba(127, 127, 127, 0.25)'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
							A2($elm$html$Html$Attributes$style, 'padding', '14px'),
							A2($elm$html$Html$Attributes$style, 'flex', '1'),
							A2($elm$html$Html$Attributes$style, 'min-height', '0'),
							A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
							A2($elm$html$Html$Attributes$style, 'overflow-x', 'hidden')
						]),
					A2($elm$core$List$map, $author$project$Pages$Instructions$viewInstructionLine, instructionLines))
				]));
	});
var $author$project$Main$CloseWelcomeModal = {$: 18};
var $author$project$I18n$WelcomeContinue = 19;
var $author$project$I18n$WelcomeSummary = 17;
var $author$project$I18n$WelcomeTech = 18;
var $author$project$I18n$WelcomeTitle = 16;
var $author$project$Main$welcomeModal = function (model) {
	return (!model.bT) ? $elm$html$Html$text('') : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
				A2($elm$html$Html$Attributes$style, 'inset', '0'),
				A2($elm$html$Html$Attributes$style, 'background', 'rgba(0, 0, 0, 0.60)'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'z-index', '1300')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'width', 'min(620px, 94vw)'),
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						$author$project$Theme$panelBg(model.a)),
						A2(
						$elm$html$Html$Attributes$style,
						'border',
						'1px solid ' + $author$project$Theme$panelBorder(model.a)),
						A2($elm$html$Html$Attributes$style, 'border-radius', '16px'),
						A2($elm$html$Html$Attributes$style, 'padding', '18px'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2($elm$html$Html$Attributes$style, 'gap', '10px')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'margin', '0')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$I18n$t, model.b, 16))
							])),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$I18n$t, model.b, 17))
							])),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$I18n$t, model.b, 18))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'gap', '12px'),
								A2($elm$html$Html$Attributes$style, 'align-items', 'stretch')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'flex', '1'),
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
										A2($elm$html$Html$Attributes$style, 'gap', '6px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$label,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, model.b, 13))
											])),
										A2(
										$elm$html$Html$select,
										_List_fromArray(
											[
												$elm$html$Html$Events$onInput($author$project$Main$SetLang),
												$elm$html$Html$Attributes$value(
												$author$project$I18n$langToString(model.b)),
												A2($elm$html$Html$Attributes$style, 'padding', '8px'),
												A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
												A2(
												$elm$html$Html$Attributes$style,
												'border',
												'1px solid ' + $author$project$Theme$panelBorder(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'background',
												$author$project$Theme$interactiveBg(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'color',
												$author$project$Theme$textColor(model.a)),
												A2($elm$html$Html$Attributes$style, 'width', '100%')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$option,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value('sk'),
														$elm$html$Html$Attributes$selected(model.b === 2)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('SK')
													])),
												A2(
												$elm$html$Html$option,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value('en'),
														$elm$html$Html$Attributes$selected(model.b === 1)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('EN')
													])),
												A2(
												$elm$html$Html$option,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value('ru'),
														$elm$html$Html$Attributes$selected(!model.b)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('RU')
													])),
												A2(
												$elm$html$Html$option,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value('ua'),
														$elm$html$Html$Attributes$selected(model.b === 3)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('UA')
													]))
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'flex', '2'),
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
										A2($elm$html$Html$Attributes$style, 'gap', '6px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$label,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$I18n$t, model.b, 12))
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick($author$project$Main$ToggleTheme),
												A2($elm$html$Html$Attributes$style, 'padding', '10px'),
												A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
												A2(
												$elm$html$Html$Attributes$style,
												'border',
												'1px solid ' + $author$project$Theme$panelBorder(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'background',
												$author$project$Theme$interactiveBg(model.a)),
												A2(
												$elm$html$Html$Attributes$style,
												'color',
												$author$project$Theme$textColor(model.a)),
												A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
												A2($elm$html$Html$Attributes$style, 'display', 'flex'),
												A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
												A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
												A2($elm$html$Html$Attributes$style, 'width', '100%')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												function () {
													var _v0 = model.a;
													if (!_v0) {
														return A2($author$project$I18n$t, model.b, 10);
													} else {
														return A2($author$project$I18n$t, model.b, 11);
													}
												}()),
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$style, 'font-size', '18px'),
														A2($elm$html$Html$Attributes$style, 'line-height', '1'),
														A2(
														$elm$html$Html$Attributes$style,
														'color',
														function () {
															var _v1 = model.a;
															if (_v1 === 1) {
																return '#ffffff';
															} else {
																return $author$project$Theme$hoverBorder(model.a);
															}
														}())
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(
														function () {
															var _v2 = model.a;
															if (!_v2) {
																return '☀';
															} else {
																return '☾';
															}
														}())
													]))
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
								A2($elm$html$Html$Attributes$style, 'gap', '6px'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '6px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, model.b, 20))
									])),
								A2(
								$elm$html$Html$select,
								_List_fromArray(
									[
										$elm$html$Html$Events$onInput($author$project$Main$SetStartPage),
										$elm$html$Html$Attributes$value(
										$elm$core$String$fromInt(
											$author$project$Main$startPageToInt(model.L))),
										A2($elm$html$Html$Attributes$style, 'padding', '8px'),
										A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
										A2(
										$elm$html$Html$Attributes$style,
										'border',
										'1px solid ' + $author$project$Theme$panelBorder(model.a)),
										A2(
										$elm$html$Html$Attributes$style,
										'background',
										$author$project$Theme$interactiveBg(model.a)),
										A2(
										$elm$html$Html$Attributes$style,
										'color',
										$author$project$Theme$textColor(model.a))
									]),
								$author$project$Main$startPageOptions(model))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'flex'),
								A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Main$CloseWelcomeModal),
										A2($elm$html$Html$Attributes$style, 'padding', '10px 14px'),
										A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
										A2($elm$html$Html$Attributes$style, 'border', 'none'),
										A2(
										$elm$html$Html$Attributes$style,
										'background',
										$author$project$Theme$hoverBg(model.a)),
										A2(
										$elm$html$Html$Attributes$style,
										'color',
										$author$project$Theme$textColor(model.a)),
										A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										A2($author$project$I18n$t, model.b, 19))
									]))
							]))
					]))
			]));
};
var $author$project$Main$CloseWhatsNewModal = {$: 24};
var $author$project$I18n$WhatsNewCloseButton = 140;
var $author$project$I18n$WhatsNewModalNoEntries = 138;
var $author$project$I18n$WhatsNewModalTitle = 137;
var $author$project$I18n$WhatsNewReloadWarning = 139;
var $author$project$Main$whatsNewEntryView = function (entry) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin', '2px 0 4px'),
						A2($elm$html$Html$Attributes$style, 'font-size', '18px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(entry.bB + (' — ' + entry.ca))
					])),
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				A2(
					$elm$core$List$map,
					function (item) {
						return A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(item)
								]));
					},
					entry.cp))
			]));
};
var $author$project$Main$whatsNewModalView = function (model) {
	var _v0 = model.bb;
	if (_v0.$ === 1) {
		return $elm$html$Html$text('');
	} else {
		var payload = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'inset', '0'),
					A2($elm$html$Html$Attributes$style, 'background', 'rgba(0, 0, 0, 0.60)'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'padding', '16px'),
					A2($elm$html$Html$Attributes$style, 'z-index', '1400'),
					$elm$html$Html$Events$onClick($author$project$Main$CloseWhatsNewModal)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Events$stopPropagationOn,
							'click',
							$elm$json$Json$Decode$succeed(
								_Utils_Tuple2($author$project$Main$NoOp, true))),
							A2($elm$html$Html$Attributes$style, 'width', 'min(760px, 96vw)'),
							A2($elm$html$Html$Attributes$style, 'max-height', '85vh'),
							A2($elm$html$Html$Attributes$style, 'overflow', 'auto'),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$Theme$panelBg(model.a)),
							A2(
							$elm$html$Html$Attributes$style,
							'border',
							'1px solid ' + $author$project$Theme$panelBorder(model.a)),
							A2($elm$html$Html$Attributes$style, 'border-radius', '16px'),
							A2($elm$html$Html$Attributes$style, 'padding', '18px'),
							A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
							A2($elm$html$Html$Attributes$style, 'gap', '10px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, model.b, 137) + (' ' + payload.bB))
								])),
							$elm$core$List$isEmpty(payload.bV) ? A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, model.b, 138))
								])) : A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
									A2($elm$html$Html$Attributes$style, 'gap', '10px')
								]),
							A2($elm$core$List$map, $author$project$Main$whatsNewEntryView, payload.bV)),
							payload.cD ? A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-top', '8px'),
									A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
									A2($elm$html$Html$Attributes$style, 'padding', '10px 12px'),
									A2($elm$html$Html$Attributes$style, 'background', 'rgba(245, 158, 11, 0.15)'),
									A2($elm$html$Html$Attributes$style, 'border', '1px solid rgba(245, 158, 11, 0.45)')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$I18n$t, model.b, 139))
								])) : $elm$html$Html$text(''),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'justify-content', 'flex-end')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick($author$project$Main$CloseWhatsNewModal),
											A2($elm$html$Html$Attributes$style, 'padding', '10px 14px'),
											A2($elm$html$Html$Attributes$style, 'border-radius', '10px'),
											A2(
											$elm$html$Html$Attributes$style,
											'border',
											'1px solid ' + $author$project$Theme$panelBorder(model.a)),
											A2(
											$elm$html$Html$Attributes$style,
											'background',
											$author$project$Theme$hoverBg(model.a)),
											A2(
											$elm$html$Html$Attributes$style,
											'color',
											$author$project$Theme$textColor(model.a)),
											A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											A2($author$project$I18n$t, model.b, 140))
										]))
								]))
						]))
				]));
	}
};
var $author$project$Main$view = function (model) {
	var tk = $author$project$Design$tokens(model.aV);
	return {
		cK: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$style,
						'background',
						$author$project$Theme$bgColor(model.a)),
						A2(
						$elm$html$Html$Attributes$style,
						'color',
						$author$project$Theme$textColor(model.a)),
						A2($elm$html$Html$Attributes$style, 'height', '100dvh'),
						A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2($elm$html$Html$Attributes$style, 'margin', '0'),
						A2(
						$elm$html$Html$Attributes$style,
						'padding',
						$author$project$Design$px(tk.aw.q)),
						A2($elm$html$Html$Attributes$style, 'font-family', 'Inter, Segoe UI, Arial, sans-serif'),
						A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
					]),
				_List_fromArray(
					[
						$author$project$Main$topBar(model),
						function () {
						var _v0 = model.B;
						switch (_v0) {
							case 0:
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'flex', '1'),
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
											A2($elm$html$Html$Attributes$style, 'justify-content', 'center')
										]),
									_List_fromArray(
										[
											$author$project$Main$homeView(model)
										]));
							case 1:
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'flex', '1'),
											A2($elm$html$Html$Attributes$style, 'display', 'flex'),
											A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
											A2($elm$html$Html$Attributes$style, 'justify-content', 'center')
										]),
									_List_fromArray(
										[
											$author$project$Main$automatonTypeHomeView(model)
										]));
							case 2:
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'flex', '1'),
											A2($elm$html$Html$Attributes$style, 'min-height', '0'),
											A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$map,
											$author$project$Main$EditorMsg,
											A2(
												$author$project$Pages$Editor$view,
												{b: model.b, a: model.a, cc: model.aX, cd: model.aM},
												model.l))
										]));
							case 3:
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'flex', '1'),
											A2($elm$html$Html$Attributes$style, 'min-height', '0'),
											A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$map,
											$author$project$Main$EditorStackMsg,
											A2(
												$author$project$Pages$EditorStack$view,
												{b: model.b, a: model.a, cc: model.aX, cd: model.aM},
												model.m))
										]));
							case 4:
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'flex', '1'),
											A2($elm$html$Html$Attributes$style, 'min-height', '0'),
											A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$map,
											$author$project$Main$EditorTuringMsg,
											A2(
												$author$project$Pages$EditorTuring$view,
												{b: model.b, a: model.a, cc: model.aX, cd: model.aM},
												model.n))
										]));
							case 5:
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'flex', '1'),
											A2($elm$html$Html$Attributes$style, 'min-height', '0'),
											A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$map,
											$author$project$Main$InstructionsMsg,
											A2(
												$author$project$Pages$Instructions$view,
												{b: model.b, a: model.a},
												model.bn))
										]));
							default:
								return A2(
									$elm$html$Html$map,
									$author$project$Main$AboutMsg,
									A2(
										$author$project$Pages$About$view,
										{b: model.b, a: model.a},
										model.bd));
						}
					}()
					])),
				$author$project$Main$feedbackButton(model),
				$author$project$Main$feedbackModal(model),
				$author$project$Main$settingsModal(model),
				$author$project$Main$welcomeModal(model),
				$author$project$Main$whatsNewModalView(model)
			]),
		ca: A2($author$project$I18n$t, model.b, 0)
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{c0: $author$project$Main$init, c4: $author$project$Main$UrlChanged, c5: $author$project$Main$LinkClicked, da: $author$project$Main$subscriptions, dc: $author$project$Main$update, dd: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (theme) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (startPage) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (lang) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (automatonSlots) {
									return $elm$json$Json$Decode$succeed(
										{bf: automatonSlots, b: lang, L: startPage, a: theme});
								},
								A2($elm$json$Json$Decode$field, 'automatonSlots', $elm$json$Json$Decode$string));
						},
						A2($elm$json$Json$Decode$field, 'lang', $elm$json$Json$Decode$string));
				},
				A2($elm$json$Json$Decode$field, 'startPage', $elm$json$Json$Decode$int));
		},
		A2($elm$json$Json$Decode$field, 'theme', $elm$json$Json$Decode$string)))(0)}});}(this));