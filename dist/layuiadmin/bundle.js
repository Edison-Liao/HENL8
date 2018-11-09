(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],2:[function(require,module,exports){
!function webpackUniversalModuleDefinition(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(window,function(){return function(e){var t={};function __webpack_require__(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,__webpack_require__),n.l=!0,n.exports}return __webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,r){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(__webpack_require__.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)__webpack_require__.d(r,n,function(t){return e[t]}.bind(null,n));return r},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=45)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}();var i={debug:function debug(){},info:function info(){},warn:function warn(){},error:function error(){}},o=void 0,s=void 0;(t.Log=function(){function Log(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Log)}return Log.reset=function reset(){s=3,o=i},Log.debug=function debug(){if(s>=4){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];o.debug.apply(o,Array.from(t))}},Log.info=function info(){if(s>=3){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];o.info.apply(o,Array.from(t))}},Log.warn=function warn(){if(s>=2){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];o.warn.apply(o,Array.from(t))}},Log.error=function error(){if(s>=1){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];o.error.apply(o,Array.from(t))}},n(Log,null,[{key:"NONE",get:function get(){return 0}},{key:"ERROR",get:function get(){return 1}},{key:"WARN",get:function get(){return 2}},{key:"INFO",get:function get(){return 3}},{key:"DEBUG",get:function get(){return 4}},{key:"level",get:function get(){return s},set:function set(e){if(!(0<=e&&e<=4))throw new Error("Invalid log level");s=e}},{key:"logger",get:function get(){return o},set:function set(e){if(!e.debug&&e.info&&(e.debug=e.info),!(e.debug&&e.info&&e.warn&&e.error))throw new Error("Invalid logger");o=e}}]),Log}()).reset()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}();var i={setInterval:function(e){function setInterval(t,r){return e.apply(this,arguments)}return setInterval.toString=function(){return e.toString()},setInterval}(function(e,t){return setInterval(e,t)}),clearInterval:function(e){function clearInterval(t){return e.apply(this,arguments)}return clearInterval.toString=function(){return e.toString()},clearInterval}(function(e){return clearInterval(e)})},o=!1,s=null;t.Global=function(){function Global(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Global)}return Global._testing=function _testing(){o=!0},Global.setXMLHttpRequest=function setXMLHttpRequest(e){s=e},n(Global,null,[{key:"location",get:function get(){if(!o)return location}},{key:"localStorage",get:function get(){if(!o&&"undefined"!=typeof window)return localStorage}},{key:"sessionStorage",get:function get(){if(!o&&"undefined"!=typeof window)return sessionStorage}},{key:"XMLHttpRequest",get:function get(){if(!o&&"undefined"!=typeof window)return s||XMLHttpRequest}},{key:"timer",get:function get(){if(!o)return i}}]),Global}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UrlUtility=void 0;var n=r(0),i=r(1);t.UrlUtility=function(){function UrlUtility(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,UrlUtility)}return UrlUtility.addQueryParam=function addQueryParam(e,t,r){return e.indexOf("?")<0&&(e+="?"),"?"!==e[e.length-1]&&(e+="&"),e+=encodeURIComponent(t),e+="=",e+=encodeURIComponent(r)},UrlUtility.parseUrlFragment=function parseUrlFragment(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.Global;"string"!=typeof e&&(e=r.location.href);var o=e.lastIndexOf(t);o>=0&&(e=e.substr(o+1));for(var s,a={},u=/([^&=]+)=([^&]*)/g,c=0;s=u.exec(e);)if(a[decodeURIComponent(s[1])]=decodeURIComponent(s[2]),c++>50)return n.Log.error("UrlUtility.parseUrlFragment: response exceeded expected number of parameters",e),{error:"Response exceeded expected number of parameters"};for(var h in a)return a;return{}},UrlUtility}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MetadataService=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(17);t.MetadataService=function(){function MetadataService(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.JsonService;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,MetadataService),!e)throw i.Log.error("MetadataService: No settings passed to MetadataService"),new Error("settings");this._settings=e,this._jsonService=new t(["application/jwk-set+json"])}return MetadataService.prototype.getMetadata=function getMetadata(){var e=this;return this._settings.metadata?(i.Log.debug("MetadataService.getMetadata: Returning metadata from settings"),Promise.resolve(this._settings.metadata)):this.metadataUrl?(i.Log.debug("MetadataService.getMetadata: getting metadata from",this.metadataUrl),this._jsonService.getJson(this.metadataUrl).then(function(t){return i.Log.debug("MetadataService.getMetadata: json received"),e._settings.metadata=t,t})):(i.Log.error("MetadataService.getMetadata: No authority or metadataUrl configured on settings"),Promise.reject(new Error("No authority or metadataUrl configured on settings")))},MetadataService.prototype.getIssuer=function getIssuer(){return this._getMetadataProperty("issuer")},MetadataService.prototype.getAuthorizationEndpoint=function getAuthorizationEndpoint(){return this._getMetadataProperty("authorization_endpoint")},MetadataService.prototype.getUserInfoEndpoint=function getUserInfoEndpoint(){return this._getMetadataProperty("userinfo_endpoint")},MetadataService.prototype.getTokenEndpoint=function getTokenEndpoint(){return this._getMetadataProperty("token_endpoint",!0)},MetadataService.prototype.getCheckSessionIframe=function getCheckSessionIframe(){return this._getMetadataProperty("check_session_iframe",!0)},MetadataService.prototype.getEndSessionEndpoint=function getEndSessionEndpoint(){return this._getMetadataProperty("end_session_endpoint",!0)},MetadataService.prototype.getRevocationEndpoint=function getRevocationEndpoint(){return this._getMetadataProperty("revocation_endpoint",!0)},MetadataService.prototype._getMetadataProperty=function _getMetadataProperty(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return i.Log.debug("MetadataService.getMetadataProperty for: "+e),this.getMetadata().then(function(r){if(i.Log.debug("MetadataService.getMetadataProperty: metadata recieved"),void 0===r[e]){if(!0===t)return void i.Log.warn("MetadataService.getMetadataProperty: Metadata does not contain optional property "+e);throw i.Log.error("MetadataService.getMetadataProperty: Metadata does not contain property "+e),new Error("Metadata does not contain property "+e)}return r[e]})},MetadataService.prototype.getSigningKeys=function getSigningKeys(){var e=this;return this._settings.signingKeys?(i.Log.debug("MetadataService.getSigningKeys: Returning signingKeys from settings"),Promise.resolve(this._settings.signingKeys)):this._getMetadataProperty("jwks_uri").then(function(t){return i.Log.debug("MetadataService.getSigningKeys: jwks_uri received",t),e._jsonService.getJson(t).then(function(t){if(i.Log.debug("MetadataService.getSigningKeys: key set received",t),!t.keys)throw i.Log.error("MetadataService.getSigningKeys: Missing keys on keyset"),new Error("Missing keys on keyset");return e._settings.signingKeys=t.keys,e._settings.signingKeys})})},n(MetadataService,[{key:"metadataUrl",get:function get(){return this._metadataUrl||(this._settings.metadataUrl?this._metadataUrl=this._settings.metadataUrl:(this._metadataUrl=this._settings.authority,this._metadataUrl&&this._metadataUrl.indexOf(".well-known/openid-configuration")<0&&("/"!==this._metadataUrl[this._metadataUrl.length-1]&&(this._metadataUrl+="/"),this._metadataUrl+=".well-known/openid-configuration"))),this._metadataUrl}}]),MetadataService}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.State=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(r(14));t.State=function(){function State(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,r=e.data,n=e.created;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,State),this._id=t||(0,o.default)(),this._data=r,this._created="number"==typeof n&&n>0?n:parseInt(Date.now()/1e3)}return State.prototype.toStorageString=function toStorageString(){return i.Log.debug("State.toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created})},State.fromStorageString=function fromStorageString(e){return i.Log.debug("State.fromStorageString"),new State(JSON.parse(e))},State.clearStaleState=function clearStaleState(e,t){var r=Date.now()/1e3-t;return e.getAllKeys().then(function(t){i.Log.debug("State.clearStaleState: got keys",t);for(var n=[],o=function _loop(o){var s=t[o];a=e.get(s).then(function(t){var n=!1;if(t)try{var o=State.fromStorageString(t);i.Log.debug("State.clearStaleState: got item from key: ",s,o.created),o.created<=r&&(n=!0)}catch(e){i.Log.error("State.clearStaleState: Error parsing state for key",s,e.message),n=!0}else i.Log.debug("State.clearStaleState: no item in storage for key: ",s),n=!0;if(n)return i.Log.debug("State.clearStaleState: removed item for key: ",s),e.remove(s)}),n.push(a)},s=0;s<t.length;s++){var a;o(s)}return i.Log.debug("State.clearStaleState: waiting on promise count:",n.length),Promise.all(n)})},n(State,[{key:"id",get:function get(){return this._id}},{key:"data",get:function get(){return this._data}},{key:"created",get:function get(){return this._created}}]),State}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WebStorageStateStore=void 0;var n=r(0),i=r(1);t.WebStorageStateStore=function(){function WebStorageStateStore(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.prefix,r=void 0===t?"oidc.":t,n=e.store,o=void 0===n?i.Global.localStorage:n;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,WebStorageStateStore),this._store=o,this._prefix=r}return WebStorageStateStore.prototype.set=function set(e,t){return n.Log.debug("WebStorageStateStore.set",e),e=this._prefix+e,this._store.setItem(e,t),Promise.resolve()},WebStorageStateStore.prototype.get=function get(e){n.Log.debug("WebStorageStateStore.get",e),e=this._prefix+e;var t=this._store.getItem(e);return Promise.resolve(t)},WebStorageStateStore.prototype.remove=function remove(e){n.Log.debug("WebStorageStateStore.remove",e),e=this._prefix+e;var t=this._store.getItem(e);return this._store.removeItem(e),Promise.resolve(t)},WebStorageStateStore.prototype.getAllKeys=function getAllKeys(){n.Log.debug("WebStorageStateStore.getAllKeys");for(var e=[],t=0;t<this._store.length;t++){var r=this._store.key(t);0===r.indexOf(this._prefix)&&e.push(r.substr(this._prefix.length))}return Promise.resolve(e)},WebStorageStateStore}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.OidcClientSettings=void 0;var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),o=r(0),s=r(5),a=r(44),u=r(3);var c="id_token",h="openid",f=900,l=300;t.OidcClientSettings=function(){function OidcClientSettings(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.authority,r=e.metadataUrl,i=e.metadata,o=e.signingKeys,g=e.client_id,p=e.client_secret,d=e.response_type,v=void 0===d?c:d,y=e.scope,m=void 0===y?h:y,S=e.redirect_uri,F=e.post_logout_redirect_uri,b=e.prompt,_=e.display,w=e.max_age,E=e.ui_locales,x=e.acr_values,C=e.resource,P=e.filterProtocolClaims,A=void 0===P||P,k=e.loadUserInfo,I=void 0===k||k,B=e.staleStateAge,R=void 0===B?f:B,T=e.clockSkew,U=void 0===T?l:T,M=e.stateStore,L=void 0===M?new s.WebStorageStateStore:M,D=e.ResponseValidatorCtor,N=void 0===D?a.ResponseValidator:D,O=e.MetadataServiceCtor,H=void 0===O?u.MetadataService:O,j=e.extraQueryParams,K=void 0===j?{}:j;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OidcClientSettings),this._authority=t,this._metadataUrl=r,this._metadata=i,this._signingKeys=o,this._client_id=g,this._client_secret=p,this._response_type=v,this._scope=m,this._redirect_uri=S,this._post_logout_redirect_uri=F,this._prompt=b,this._display=_,this._max_age=w,this._ui_locales=E,this._acr_values=x,this._resource=C,this._filterProtocolClaims=!!A,this._loadUserInfo=!!I,this._staleStateAge=R,this._clockSkew=U,this._stateStore=L,this._validator=new N(this),this._metadataService=new H(this),this._extraQueryParams="object"===(void 0===K?"undefined":n(K))?K:{}}return i(OidcClientSettings,[{key:"client_id",get:function get(){return this._client_id},set:function set(e){if(this._client_id)throw o.Log.error("OidcClientSettings.set_client_id: client_id has already been assigned."),new Error("client_id has already been assigned.");this._client_id=e}},{key:"client_secret",get:function get(){return this._client_secret}},{key:"response_type",get:function get(){return this._response_type}},{key:"scope",get:function get(){return this._scope}},{key:"redirect_uri",get:function get(){return this._redirect_uri}},{key:"post_logout_redirect_uri",get:function get(){return this._post_logout_redirect_uri}},{key:"prompt",get:function get(){return this._prompt}},{key:"display",get:function get(){return this._display}},{key:"max_age",get:function get(){return this._max_age}},{key:"ui_locales",get:function get(){return this._ui_locales}},{key:"acr_values",get:function get(){return this._acr_values}},{key:"resource",get:function get(){return this._resource}},{key:"authority",get:function get(){return this._authority},set:function set(e){if(this._authority)throw o.Log.error("OidcClientSettings.set_authority: authority has already been assigned."),new Error("authority has already been assigned.");this._authority=e}},{key:"metadataUrl",get:function get(){return this._metadataUrl||(this._metadataUrl=this.authority,this._metadataUrl&&this._metadataUrl.indexOf(".well-known/openid-configuration")<0&&("/"!==this._metadataUrl[this._metadataUrl.length-1]&&(this._metadataUrl+="/"),this._metadataUrl+=".well-known/openid-configuration")),this._metadataUrl}},{key:"metadata",get:function get(){return this._metadata},set:function set(e){this._metadata=e}},{key:"signingKeys",get:function get(){return this._signingKeys},set:function set(e){this._signingKeys=e}},{key:"filterProtocolClaims",get:function get(){return this._filterProtocolClaims}},{key:"loadUserInfo",get:function get(){return this._loadUserInfo}},{key:"staleStateAge",get:function get(){return this._staleStateAge}},{key:"clockSkew",get:function get(){return this._clockSkew}},{key:"stateStore",get:function get(){return this._stateStore}},{key:"validator",get:function get(){return this._validator}},{key:"metadataService",get:function get(){return this._metadataService}},{key:"extraQueryParams",get:function get(){return this._extraQueryParams},set:function set(e){"object"===(void 0===e?"undefined":n(e))?this._extraQueryParams=e:this._extraQueryParams={}}}]),OidcClientSettings}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CordovaPopupWindow=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0);var o="location=no,toolbar=no,zoom=no",s="_blank";t.CordovaPopupWindow=function(){function CordovaPopupWindow(e){var t=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,CordovaPopupWindow),this._promise=new Promise(function(e,r){t._resolve=e,t._reject=r}),this.features=e.popupWindowFeatures||o,this.target=e.popupWindowTarget||s,this.redirect_uri=e.startUrl,i.Log.debug("CordovaPopupWindow.ctor: redirect_uri: "+this.redirect_uri)}return CordovaPopupWindow.prototype._isInAppBrowserInstalled=function _isInAppBrowserInstalled(e){return["cordova-plugin-inappbrowser","cordova-plugin-inappbrowser.inappbrowser","org.apache.cordova.inappbrowser"].some(function(t){return e.hasOwnProperty(t)})},CordovaPopupWindow.prototype.navigate=function navigate(e){if(e&&e.url){if(!window.cordova)return this._error("cordova is undefined");var t=window.cordova.require("cordova/plugin_list").metadata;if(!1===this._isInAppBrowserInstalled(t))return this._error("InAppBrowser plugin not found");this._popup=cordova.InAppBrowser.open(e.url,this.target,this.features),this._popup?(i.Log.debug("CordovaPopupWindow.navigate: popup successfully created"),this._exitCallbackEvent=this._exitCallback.bind(this),this._loadStartCallbackEvent=this._loadStartCallback.bind(this),this._popup.addEventListener("exit",this._exitCallbackEvent,!1),this._popup.addEventListener("loadstart",this._loadStartCallbackEvent,!1)):this._error("Error opening popup window")}else this._error("No url provided");return this.promise},CordovaPopupWindow.prototype._loadStartCallback=function _loadStartCallback(e){0===e.url.indexOf(this.redirect_uri)&&this._success({url:e.url})},CordovaPopupWindow.prototype._exitCallback=function _exitCallback(e){this._error(e)},CordovaPopupWindow.prototype._success=function _success(e){this._cleanup(),i.Log.debug("CordovaPopupWindow: Successful response from cordova popup window"),this._resolve(e)},CordovaPopupWindow.prototype._error=function _error(e){this._cleanup(),i.Log.error(e),this._reject(new Error(e))},CordovaPopupWindow.prototype.close=function close(){this._cleanup()},CordovaPopupWindow.prototype._cleanup=function _cleanup(){this._popup&&(i.Log.debug("CordovaPopupWindow: cleaning up popup"),this._popup.removeEventListener("exit",this._exitCallbackEvent,!1),this._popup.removeEventListener("loadstart",this._loadStartCallbackEvent,!1),this._popup.close()),this._popup=null},n(CordovaPopupWindow,[{key:"promise",get:function get(){return this._promise}}]),CordovaPopupWindow}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TokenRevocationClient=void 0;var n=r(0),i=r(3),o=r(1);t.TokenRevocationClient=function(){function TokenRevocationClient(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.Global.XMLHttpRequest,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.MetadataService;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,TokenRevocationClient),!e)throw n.Log.error("TokenRevocationClient.ctor: No settings provided"),new Error("No settings provided.");this._settings=e,this._XMLHttpRequestCtor=t,this._metadataService=new r(this._settings)}return TokenRevocationClient.prototype.revoke=function revoke(e,t){var r=this;if(!e)throw n.Log.error("TokenRevocationClient.revoke: No accessToken provided"),new Error("No accessToken provided.");return this._metadataService.getRevocationEndpoint().then(function(i){if(i){n.Log.error("TokenRevocationClient.revoke: Revoking access token");var o=r._settings.client_id,s=r._settings.client_secret;return r._revoke(i,o,s,e)}if(t)throw n.Log.error("TokenRevocationClient.revoke: Revocation not supported"),new Error("Revocation not supported")})},TokenRevocationClient.prototype._revoke=function _revoke(e,t,r,i){var o=this;return new Promise(function(s,a){var u=new o._XMLHttpRequestCtor;u.open("POST",e),u.onload=function(){n.Log.debug("TokenRevocationClient.revoke: HTTP response received, status",u.status),200===u.status?s():a(Error(u.statusText+" ("+u.status+")"))};var c="client_id="+encodeURIComponent(t);r&&(c+="&client_secret="+encodeURIComponent(r)),c+="&token_type_hint="+encodeURIComponent("access_token"),c+="&token="+encodeURIComponent(i),u.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),u.send(c)})},TokenRevocationClient}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CheckSessionIFrame=void 0;var n=r(0);var i=2e3;t.CheckSessionIFrame=function(){function CheckSessionIFrame(e,t,r,n){var o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,CheckSessionIFrame),this._callback=e,this._client_id=t,this._url=r,this._interval=n||i,this._stopOnError=o;var s=r.indexOf("/",r.indexOf("//")+2);this._frame_origin=r.substr(0,s),this._frame=window.document.createElement("iframe"),this._frame.style.visibility="hidden",this._frame.style.position="absolute",this._frame.style.display="none",this._frame.style.width=0,this._frame.style.height=0,this._frame.src=r}return CheckSessionIFrame.prototype.load=function load(){var e=this;return new Promise(function(t){e._frame.onload=function(){t()},window.document.body.appendChild(e._frame),e._boundMessageEvent=e._message.bind(e),window.addEventListener("message",e._boundMessageEvent,!1)})},CheckSessionIFrame.prototype._message=function _message(e){e.origin===this._frame_origin&&e.source===this._frame.contentWindow&&("error"===e.data?(n.Log.error("CheckSessionIFrame: error message from check session op iframe"),this._stopOnError&&this.stop()):"changed"===e.data?(n.Log.debug("CheckSessionIFrame: changed message from check session op iframe"),this.stop(),this._callback()):n.Log.debug("CheckSessionIFrame: "+e.data+" message from check session op iframe"))},CheckSessionIFrame.prototype.start=function start(e){var t=this;if(this._session_state!==e){n.Log.debug("CheckSessionIFrame.start"),this.stop(),this._session_state=e;var r=function send(){t._frame.contentWindow.postMessage(t._client_id+" "+t._session_state,t._frame_origin)};r(),this._timer=window.setInterval(r,this._interval)}},CheckSessionIFrame.prototype.stop=function stop(){this._session_state=null,this._timer&&(n.Log.debug("CheckSessionIFrame.stop"),window.clearInterval(this._timer),this._timer=null)},CheckSessionIFrame}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SessionMonitor=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(9);t.SessionMonitor=function(){function SessionMonitor(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.CheckSessionIFrame;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SessionMonitor),!e)throw i.Log.error("SessionMonitor.ctor: No user manager passed to SessionMonitor"),new Error("userManager");this._userManager=e,this._CheckSessionIFrameCtor=r,this._userManager.events.addUserLoaded(this._start.bind(this)),this._userManager.events.addUserUnloaded(this._stop.bind(this)),this._userManager.getUser().then(function(e){e&&t._start(e)}).catch(function(e){i.Log.error("SessionMonitor ctor: error from getUser:",e.message)})}return SessionMonitor.prototype._start=function _start(e){var t=this,r=e.session_state;r&&(this._sub=e.profile.sub,this._sid=e.profile.sid,i.Log.debug("SessionMonitor._start: session_state:",r,", sub:",this._sub),this._checkSessionIFrame?this._checkSessionIFrame.start(r):this._metadataService.getCheckSessionIframe().then(function(e){if(e){i.Log.debug("SessionMonitor._start: Initializing check session iframe");var n=t._client_id,o=t._checkSessionInterval,s=t._stopCheckSessionOnError;t._checkSessionIFrame=new t._CheckSessionIFrameCtor(t._callback.bind(t),n,e,o,s),t._checkSessionIFrame.load().then(function(){t._checkSessionIFrame.start(r)})}else i.Log.warn("SessionMonitor._start: No check session iframe found in the metadata")}).catch(function(e){i.Log.error("SessionMonitor._start: Error from getCheckSessionIframe:",e.message)}))},SessionMonitor.prototype._stop=function _stop(){this._sub=null,this._sid=null,this._checkSessionIFrame&&(i.Log.debug("SessionMonitor._stop"),this._checkSessionIFrame.stop())},SessionMonitor.prototype._callback=function _callback(){var e=this;this._userManager.querySessionStatus().then(function(t){var r=!0;t?t.sub===e._sub?(r=!1,e._checkSessionIFrame.start(t.session_state),t.sid===e._sid?i.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, restarting check session iframe; session_state:",t.session_state):(i.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, session state has changed, restarting check session iframe; session_state:",t.session_state),e._userManager.events._raiseUserSessionChanged())):i.Log.debug("SessionMonitor._callback: Different subject signed into OP:",t.sub):i.Log.debug("SessionMonitor._callback: Subject no longer signed into OP"),r&&(i.Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed out event"),e._userManager.events._raiseUserSignedOut())}).catch(function(t){i.Log.debug("SessionMonitor._callback: Error calling queryCurrentSigninSession; raising signed out event",t.message),e._userManager.events._raiseUserSignedOut()})},n(SessionMonitor,[{key:"_settings",get:function get(){return this._userManager.settings}},{key:"_metadataService",get:function get(){return this._userManager.metadataService}},{key:"_client_id",get:function get(){return this._settings.client_id}},{key:"_checkSessionInterval",get:function get(){return this._settings.checkSessionInterval}},{key:"_stopCheckSessionOnError",get:function get(){return this._settings.stopCheckSessionOnError}}]),SessionMonitor}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Event=void 0;var n=r(0);t.Event=function(){function Event(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Event),this._name=e,this._callbacks=[]}return Event.prototype.addHandler=function addHandler(e){this._callbacks.push(e)},Event.prototype.removeHandler=function removeHandler(e){var t=this._callbacks.findIndex(function(t){return t===e});t>=0&&this._callbacks.splice(t,1)},Event.prototype.raise=function raise(){n.Log.debug("Event: Raising event: "+this._name);for(var e=0;e<this._callbacks.length;e++){var t;(t=this._callbacks)[e].apply(t,arguments)}},Event}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AccessTokenEvents=void 0;var n=r(0),i=r(22);var o=60;t.AccessTokenEvents=function(){function AccessTokenEvents(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.accessTokenExpiringNotificationTime,r=void 0===t?o:t,n=e.accessTokenExpiringTimer,s=void 0===n?new i.Timer("Access token expiring"):n,a=e.accessTokenExpiredTimer,u=void 0===a?new i.Timer("Access token expired"):a;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AccessTokenEvents),this._accessTokenExpiringNotificationTime=r,this._accessTokenExpiring=s,this._accessTokenExpired=u}return AccessTokenEvents.prototype.load=function load(e){if(e.access_token&&void 0!==e.expires_in){var t=e.expires_in;if(n.Log.debug("AccessTokenEvents.load: access token present, remaining duration:",t),t>0){var r=t-this._accessTokenExpiringNotificationTime;r<=0&&(r=1),n.Log.debug("AccessTokenEvents.load: registering expiring timer in:",r),this._accessTokenExpiring.init(r)}else n.Log.debug("AccessTokenEvents.load: canceling existing expiring timer becase we're past expiration."),this._accessTokenExpiring.cancel();var i=t+1;n.Log.debug("AccessTokenEvents.load: registering expired timer in:",i),this._accessTokenExpired.init(i)}else this._accessTokenExpiring.cancel(),this._accessTokenExpired.cancel()},AccessTokenEvents.prototype.unload=function unload(){n.Log.debug("AccessTokenEvents.unload: canceling existing access token timers"),this._accessTokenExpiring.cancel(),this._accessTokenExpired.cancel()},AccessTokenEvents.prototype.addAccessTokenExpiring=function addAccessTokenExpiring(e){this._accessTokenExpiring.addHandler(e)},AccessTokenEvents.prototype.removeAccessTokenExpiring=function removeAccessTokenExpiring(e){this._accessTokenExpiring.removeHandler(e)},AccessTokenEvents.prototype.addAccessTokenExpired=function addAccessTokenExpired(e){this._accessTokenExpired.addHandler(e)},AccessTokenEvents.prototype.removeAccessTokenExpired=function removeAccessTokenExpired(e){this._accessTokenExpired.removeHandler(e)},AccessTokenEvents}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.User=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0);t.User=function(){function User(e){var t=e.id_token,r=e.session_state,n=e.access_token,i=e.token_type,o=e.scope,s=e.profile,a=e.expires_at,u=e.state;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,User),this.id_token=t,this.session_state=r,this.access_token=n,this.token_type=i,this.scope=o,this.profile=s,this.expires_at=a,this.state=u}return User.prototype.toStorageString=function toStorageString(){return i.Log.debug("User.toStorageString"),JSON.stringify({id_token:this.id_token,session_state:this.session_state,access_token:this.access_token,token_type:this.token_type,scope:this.scope,profile:this.profile,expires_at:this.expires_at})},User.fromStorageString=function fromStorageString(e){return i.Log.debug("User.fromStorageString"),new User(JSON.parse(e))},n(User,[{key:"expires_in",get:function get(){if(this.expires_at){var e=parseInt(Date.now()/1e3);return this.expires_at-e}}},{key:"expired",get:function get(){var e=this.expires_in;if(void 0!==e)return e<=0}},{key:"scopes",get:function get(){return(this.scope||"").split(" ")}}]),User}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=
// @preserve Copyright (c) Microsoft Open Technologies, Inc.
function random(){for(var e="xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx",t="0123456789abcdef",r=0,n="",i=0;i<e.length;i++)"-"!==e[i]&&"4"!==e[i]&&(r=16*Math.random()|0),"x"===e[i]?n+=t[r]:"y"===e[i]?(r&=3,n+=t[r|=8]):n+=e[i];return n},e.exports=t.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SigninState=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(4),s=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(r(14));t.SigninState=function(e){function SigninState(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.nonce,n=t.authority,i=t.client_id;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SigninState);var o=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,arguments[0]));return!0===r?o._nonce=(0,s.default)():r&&(o._nonce=r),o._authority=n,o._client_id=i,o}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(SigninState,e),SigninState.prototype.toStorageString=function toStorageString(){return i.Log.debug("SigninState.toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created,nonce:this.nonce,authority:this.authority,client_id:this.client_id})},SigninState.fromStorageString=function fromStorageString(e){return i.Log.debug("SigninState.fromStorageString"),new SigninState(JSON.parse(e))},n(SigninState,[{key:"nonce",get:function get(){return this._nonce}},{key:"authority",get:function get(){return this._authority}},{key:"client_id",get:function get(){return this._client_id}}]),SigninState}(o.State)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ErrorResponse=void 0;var n=r(0);t.ErrorResponse=function(e){function ErrorResponse(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.error,i=t.error_description,o=t.error_uri,s=t.state;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ErrorResponse),!r)throw n.Log.error("No error passed to ErrorResponse"),new Error("error");var a=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,i||r));return a.name="ErrorResponse",a.error=r,a.error_description=i,a.error_uri=o,a.state=s,a}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(ErrorResponse,e),ErrorResponse}(Error)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.JsonService=void 0;var n=r(0),i=r(1);t.JsonService=function(){function JsonService(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.Global.XMLHttpRequest;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,JsonService),e&&Array.isArray(e)?this._contentTypes=e.slice():this._contentTypes=[],this._contentTypes.push("application/json"),this._XMLHttpRequest=t}return JsonService.prototype.getJson=function getJson(e,t){var r=this;if(!e)throw n.Log.error("JsonService.getJson: No url passed"),new Error("url");return n.Log.debug("JsonService.getJson, url: ",e),new Promise(function(i,o){var s=new r._XMLHttpRequest;s.open("GET",e);var a=r._contentTypes;s.onload=function(){if(n.Log.debug("JsonService.getJson: HTTP response received, status",s.status),200===s.status){var t=s.getResponseHeader("Content-Type");if(t)if(a.find(function(e){if(t.startsWith(e))return!0}))try{return void i(JSON.parse(s.responseText))}catch(e){return n.Log.error("JsonService.getJson: Error parsing JSON response",e.message),void o(e)}o(Error("Invalid response Content-Type: "+t+", from URL: "+e))}else o(Error(s.statusText+" ("+s.status+")"))},s.onerror=function(){n.Log.error("JsonService.getJson: network error"),o(Error("Network Error"))},t&&(n.Log.debug("JsonService.getJson: token passed, setting Authorization header"),s.setRequestHeader("Authorization","Bearer "+t)),s.send()})},JsonService}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.OidcClient=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(6),s=r(16),a=r(35),u=r(34),c=r(33),h=r(32),f=r(15),l=r(4);t.OidcClient=function(){function OidcClient(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OidcClient),e instanceof o.OidcClientSettings?this._settings=e:this._settings=new o.OidcClientSettings(e)}return OidcClient.prototype.createSigninRequest=function createSigninRequest(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.response_type,n=t.scope,o=t.redirect_uri,s=t.data,u=t.state,c=t.prompt,h=t.display,f=t.max_age,l=t.ui_locales,g=t.id_token_hint,p=t.login_hint,d=t.acr_values,v=t.resource,y=t.request,m=t.request_uri,S=t.extraQueryParams,F=arguments[1];i.Log.debug("OidcClient.createSigninRequest");var b=this._settings.client_id;r=r||this._settings.response_type,n=n||this._settings.scope,o=o||this._settings.redirect_uri,c=c||this._settings.prompt,h=h||this._settings.display,f=f||this._settings.max_age,l=l||this._settings.ui_locales,d=d||this._settings.acr_values,v=v||this._settings.resource,S=S||this._settings.extraQueryParams;var _=this._settings.authority;return this._metadataService.getAuthorizationEndpoint().then(function(t){i.Log.debug("OidcClient.createSigninRequest: Received authorization endpoint",t);var w=new a.SigninRequest({url:t,client_id:b,redirect_uri:o,response_type:r,scope:n,data:s||u,authority:_,prompt:c,display:h,max_age:f,ui_locales:l,id_token_hint:g,login_hint:p,acr_values:d,resource:v,request:y,request_uri:m,extraQueryParams:S}),E=w.state;return(F=F||e._stateStore).set(E.id,E.toStorageString()).then(function(){return w})})},OidcClient.prototype.processSigninResponse=function processSigninResponse(e,t){var r=this;i.Log.debug("OidcClient.processSigninResponse");var n=new u.SigninResponse(e);return n.state?(t=t||this._stateStore).remove(n.state).then(function(e){if(!e)throw i.Log.error("OidcClient.processSigninResponse: No matching state found in storage"),new Error("No matching state found in storage");var t=f.SigninState.fromStorageString(e);return i.Log.debug("OidcClient.processSigninResponse: Received state from storage; validating response"),r._validator.validateSigninResponse(t,n)}):(i.Log.error("OidcClient.processSigninResponse: No state in response"),Promise.reject(new Error("No state in response")))},OidcClient.prototype.createSignoutRequest=function createSignoutRequest(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.id_token_hint,n=t.data,o=t.state,s=t.post_logout_redirect_uri,a=arguments[1];return i.Log.debug("OidcClient.createSignoutRequest"),s=s||this._settings.post_logout_redirect_uri,this._metadataService.getEndSessionEndpoint().then(function(t){if(!t)throw i.Log.error("OidcClient.createSignoutRequest: No end session endpoint url returned"),new Error("no end session endpoint");i.Log.debug("OidcClient.createSignoutRequest: Received end session endpoint",t);var u=new c.SignoutRequest({url:t,id_token_hint:r,post_logout_redirect_uri:s,data:n||o}),h=u.state;return h&&(i.Log.debug("OidcClient.createSignoutRequest: Signout request has state to persist"),(a=a||e._stateStore).set(h.id,h.toStorageString())),u})},OidcClient.prototype.processSignoutResponse=function processSignoutResponse(e,t){var r=this;i.Log.debug("OidcClient.processSignoutResponse");var n=new h.SignoutResponse(e);if(!n.state)return i.Log.debug("OidcClient.processSignoutResponse: No state in response"),n.error?(i.Log.warn("OidcClient.processSignoutResponse: Response was error: ",n.error),Promise.reject(new s.ErrorResponse(n))):Promise.resolve(n);var o=n.state;return(t=t||this._stateStore).remove(o).then(function(e){if(!e)throw i.Log.error("OidcClient.processSignoutResponse: No matching state found in storage"),new Error("No matching state found in storage");var t=l.State.fromStorageString(e);return i.Log.debug("OidcClient.processSignoutResponse: Received state from storage; validating response"),r._validator.validateSignoutResponse(t,n)})},OidcClient.prototype.clearStaleState=function clearStaleState(e){return i.Log.debug("OidcClient.clearStaleState"),e=e||this._stateStore,l.State.clearStaleState(e,this.settings.staleStateAge)},n(OidcClient,[{key:"_stateStore",get:function get(){return this.settings.stateStore}},{key:"_validator",get:function get(){return this.settings.validator}},{key:"_metadataService",get:function get(){return this.settings.metadataService}},{key:"settings",get:function get(){return this._settings}},{key:"metadataService",get:function get(){return this._metadataService}}]),OidcClient}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CordovaIFrameNavigator=void 0;var n=r(7);t.CordovaIFrameNavigator=function(){function CordovaIFrameNavigator(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,CordovaIFrameNavigator)}return CordovaIFrameNavigator.prototype.prepare=function prepare(e){e.popupWindowFeatures="hidden=yes";var t=new n.CordovaPopupWindow(e);return Promise.resolve(t)},CordovaIFrameNavigator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CordovaPopupNavigator=void 0;var n=r(7);t.CordovaPopupNavigator=function(){function CordovaPopupNavigator(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,CordovaPopupNavigator)}return CordovaPopupNavigator.prototype.prepare=function prepare(e){var t=new n.CordovaPopupWindow(e);return Promise.resolve(t)},CordovaPopupNavigator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SilentRenewService=void 0;var n=r(0);t.SilentRenewService=function(){function SilentRenewService(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SilentRenewService),this._userManager=e}return SilentRenewService.prototype.start=function start(){this._callback||(this._callback=this._tokenExpiring.bind(this),this._userManager.events.addAccessTokenExpiring(this._callback),this._userManager.getUser().then(function(e){}).catch(function(e){n.Log.error("SilentRenewService.start: Error from getUser:",e.message)}))},SilentRenewService.prototype.stop=function stop(){this._callback&&(this._userManager.events.removeAccessTokenExpiring(this._callback),delete this._callback)},SilentRenewService.prototype._tokenExpiring=function _tokenExpiring(){var e=this;this._userManager.signinSilent().then(function(e){n.Log.debug("SilentRenewService._tokenExpiring: Silent token renewal successful")},function(t){n.Log.error("SilentRenewService._tokenExpiring: Error from signinSilent:",t.message),e._userManager.events._raiseSilentRenewError(t)})},SilentRenewService}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Timer=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(1),s=r(11);t.Timer=function(e){function Timer(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.Global.timer,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Timer);var i=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t));return i._timer=r,i._nowFunc=n||function(){return Date.now()/1e3},i}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Timer,e),Timer.prototype.init=function init(e){e<=0&&(e=1),e=parseInt(e);var t=this.now+e;if(this.expiration===t&&this._timerHandle)i.Log.debug("Timer.init timer "+this._name+" skipping initialization since already initialized for expiration:",this.expiration);else{this.cancel(),i.Log.debug("Timer.init timer "+this._name+" for duration:",e),this._expiration=t;var r=5;e<r&&(r=e),this._timerHandle=this._timer.setInterval(this._callback.bind(this),1e3*r)}},Timer.prototype.cancel=function cancel(){this._timerHandle&&(i.Log.debug("Timer.cancel: ",this._name),this._timer.clearInterval(this._timerHandle),this._timerHandle=null)},Timer.prototype._callback=function _callback(){var t=this._expiration-this.now;i.Log.debug("Timer.callback; "+this._name+" timer expires in:",t),this._expiration<=this.now&&(this.cancel(),e.prototype.raise.call(this))},n(Timer,[{key:"now",get:function get(){return parseInt(this._nowFunc())}},{key:"expiration",get:function get(){return this._expiration}}]),Timer}(s.Event)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserManagerEvents=void 0;var n=r(0),i=r(12),o=r(11);t.UserManagerEvents=function(e){function UserManagerEvents(t){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,UserManagerEvents);var r=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t));return r._userLoaded=new o.Event("User loaded"),r._userUnloaded=new o.Event("User unloaded"),r._silentRenewError=new o.Event("Silent renew error"),r._userSignedOut=new o.Event("User signed out"),r._userSessionChanged=new o.Event("User session changed"),r}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(UserManagerEvents,e),UserManagerEvents.prototype.load=function load(t){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];n.Log.debug("UserManagerEvents.load"),e.prototype.load.call(this,t),r&&this._userLoaded.raise(t)},UserManagerEvents.prototype.unload=function unload(){n.Log.debug("UserManagerEvents.unload"),e.prototype.unload.call(this),this._userUnloaded.raise()},UserManagerEvents.prototype.addUserLoaded=function addUserLoaded(e){this._userLoaded.addHandler(e)},UserManagerEvents.prototype.removeUserLoaded=function removeUserLoaded(e){this._userLoaded.removeHandler(e)},UserManagerEvents.prototype.addUserUnloaded=function addUserUnloaded(e){this._userUnloaded.addHandler(e)},UserManagerEvents.prototype.removeUserUnloaded=function removeUserUnloaded(e){this._userUnloaded.removeHandler(e)},UserManagerEvents.prototype.addSilentRenewError=function addSilentRenewError(e){this._silentRenewError.addHandler(e)},UserManagerEvents.prototype.removeSilentRenewError=function removeSilentRenewError(e){this._silentRenewError.removeHandler(e)},UserManagerEvents.prototype._raiseSilentRenewError=function _raiseSilentRenewError(e){n.Log.debug("UserManagerEvents._raiseSilentRenewError",e.message),this._silentRenewError.raise(e)},UserManagerEvents.prototype.addUserSignedOut=function addUserSignedOut(e){this._userSignedOut.addHandler(e)},UserManagerEvents.prototype.removeUserSignedOut=function removeUserSignedOut(e){this._userSignedOut.removeHandler(e)},UserManagerEvents.prototype._raiseUserSignedOut=function _raiseUserSignedOut(e){n.Log.debug("UserManagerEvents._raiseUserSignedOut"),this._userSignedOut.raise(e)},UserManagerEvents.prototype.addUserSessionChanged=function addUserSessionChanged(e){this._userSessionChanged.addHandler(e)},UserManagerEvents.prototype.removeUserSessionChanged=function removeUserSessionChanged(e){this._userSessionChanged.removeHandler(e)},UserManagerEvents.prototype._raiseUserSessionChanged=function _raiseUserSessionChanged(e){n.Log.debug("UserManagerEvents._raiseUserSessionChanged"),this._userSessionChanged.raise(e)},UserManagerEvents}(i.AccessTokenEvents)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.IFrameWindow=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0);t.IFrameWindow=function(){function IFrameWindow(e){var t=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,IFrameWindow),this._promise=new Promise(function(e,r){t._resolve=e,t._reject=r}),this._boundMessageEvent=this._message.bind(this),window.addEventListener("message",this._boundMessageEvent,!1),this._frame=window.document.createElement("iframe"),this._frame.style.visibility="hidden",this._frame.style.position="absolute",this._frame.style.display="none",this._frame.style.width=0,this._frame.style.height=0,window.document.body.appendChild(this._frame)}return IFrameWindow.prototype.navigate=function navigate(e){if(e&&e.url){var t=e.silentRequestTimeout||1e4;i.Log.debug("IFrameWindow.navigate: Using timeout of:",t),this._timer=window.setTimeout(this._timeout.bind(this),t),this._frame.src=e.url}else this._error("No url provided");return this.promise},IFrameWindow.prototype._success=function _success(e){this._cleanup(),i.Log.debug("IFrameWindow: Successful response from frame window"),this._resolve(e)},IFrameWindow.prototype._error=function _error(e){this._cleanup(),i.Log.error(e),this._reject(new Error(e))},IFrameWindow.prototype.close=function close(){this._cleanup()},IFrameWindow.prototype._cleanup=function _cleanup(){this._frame&&(i.Log.debug("IFrameWindow: cleanup"),window.removeEventListener("message",this._boundMessageEvent,!1),window.clearTimeout(this._timer),window.document.body.removeChild(this._frame),this._timer=null,this._frame=null,this._boundMessageEvent=null)},IFrameWindow.prototype._timeout=function _timeout(){i.Log.debug("IFrameWindow.timeout"),this._error("Frame window timed out")},IFrameWindow.prototype._message=function _message(e){if(i.Log.debug("IFrameWindow.message"),this._timer&&e.origin===this._origin&&e.source===this._frame.contentWindow){var t=e.data;t?this._success({url:t}):this._error("Invalid response from frame")}},IFrameWindow.notifyParent=function notifyParent(e){i.Log.debug("IFrameWindow.notifyParent"),window.parent&&window!==window.parent&&(e=e||window.location.href)&&(i.Log.debug("IFrameWindow.notifyParent: posting url message to parent"),window.parent.postMessage(e,location.protocol+"//"+location.host))},n(IFrameWindow,[{key:"promise",get:function get(){return this._promise}},{key:"_origin",get:function get(){return location.protocol+"//"+location.host}}]),IFrameWindow}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.IFrameNavigator=void 0;var n=r(0),i=r(24);t.IFrameNavigator=function(){function IFrameNavigator(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,IFrameNavigator)}return IFrameNavigator.prototype.prepare=function prepare(e){var t=new i.IFrameWindow(e);return Promise.resolve(t)},IFrameNavigator.prototype.callback=function callback(e){n.Log.debug("IFrameNavigator.callback");try{return i.IFrameWindow.notifyParent(e),Promise.resolve()}catch(e){return Promise.reject(e)}},IFrameNavigator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PopupWindow=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(2);var s=500,a="location=no,toolbar=no,width=500,height=500,left=100,top=100;",u="_blank";t.PopupWindow=function(){function PopupWindow(e){var t=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,PopupWindow),this._promise=new Promise(function(e,r){t._resolve=e,t._reject=r});var r=e.popupWindowTarget||u,n=e.popupWindowFeatures||a;this._popup=window.open("",r,n),this._popup&&(i.Log.debug("PopupWindow.ctor: popup successfully created"),this._checkForPopupClosedTimer=window.setInterval(this._checkForPopupClosed.bind(this),s))}return PopupWindow.prototype.navigate=function navigate(e){return this._popup?e&&e.url?(i.Log.debug("PopupWindow.navigate: Setting URL in popup"),this._id=e.id,this._id&&(window["popupCallback_"+e.id]=this._callback.bind(this)),this._popup.focus(),this._popup.window.location=e.url):(this._error("PopupWindow.navigate: no url provided"),this._error("No url provided")):this._error("PopupWindow.navigate: Error opening popup window"),this.promise},PopupWindow.prototype._success=function _success(e){i.Log.debug("PopupWindow.callback: Successful response from popup window"),this._cleanup(),this._resolve(e)},PopupWindow.prototype._error=function _error(e){i.Log.error("PopupWindow.error: ",e),this._cleanup(),this._reject(new Error(e))},PopupWindow.prototype.close=function close(){this._cleanup(!1)},PopupWindow.prototype._cleanup=function _cleanup(e){i.Log.debug("PopupWindow.cleanup"),window.clearInterval(this._checkForPopupClosedTimer),this._checkForPopupClosedTimer=null,delete window["popupCallback_"+this._id],this._popup&&!e&&this._popup.close(),this._popup=null},PopupWindow.prototype._checkForPopupClosed=function _checkForPopupClosed(){this._popup&&!this._popup.closed||this._error("Popup window closed")},PopupWindow.prototype._callback=function _callback(e,t){this._cleanup(t),e?(i.Log.debug("PopupWindow.callback success"),this._success({url:e})):(i.Log.debug("PopupWindow.callback: Invalid response from popup"),this._error("Invalid response from popup"))},PopupWindow.notifyOpener=function notifyOpener(e,t,r){if(window.opener){if(e=e||window.location.href){var n=o.UrlUtility.parseUrlFragment(e,r);if(n.state){var s="popupCallback_"+n.state,a=window.opener[s];a?(i.Log.debug("PopupWindow.notifyOpener: passing url message to opener"),a(e,t)):i.Log.warn("PopupWindow.notifyOpener: no matching callback found on opener")}else i.Log.warn("PopupWindow.notifyOpener: no state found in response url")}}else i.Log.warn("PopupWindow.notifyOpener: no window.opener. Can't complete notification.")},n(PopupWindow,[{key:"promise",get:function get(){return this._promise}}]),PopupWindow}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PopupNavigator=void 0;var n=r(0),i=r(26);t.PopupNavigator=function(){function PopupNavigator(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,PopupNavigator)}return PopupNavigator.prototype.prepare=function prepare(e){var t=new i.PopupWindow(e);return Promise.resolve(t)},PopupNavigator.prototype.callback=function callback(e,t,r){n.Log.debug("PopupNavigator.callback");try{return i.PopupWindow.notifyOpener(e,t,r),Promise.resolve()}catch(e){return Promise.reject(e)}},PopupNavigator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RedirectNavigator=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0);t.RedirectNavigator=function(){function RedirectNavigator(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,RedirectNavigator)}return RedirectNavigator.prototype.prepare=function prepare(){return Promise.resolve(this)},RedirectNavigator.prototype.navigate=function navigate(e){return e&&e.url?(window.location=e.url,Promise.resolve()):(i.Log.error("RedirectNavigator.navigate: No url provided"),Promise.reject(new Error("No url provided")))},n(RedirectNavigator,[{key:"url",get:function get(){return window.location.href}}]),RedirectNavigator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserManagerSettings=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=(r(0),r(6)),o=r(28),s=r(27),a=r(25),u=r(5),c=r(1);var h=60,f=2e3;t.UserManagerSettings=function(e){function UserManagerSettings(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.popup_redirect_uri,n=t.popup_post_logout_redirect_uri,i=t.popupWindowFeatures,l=t.popupWindowTarget,g=t.silent_redirect_uri,p=t.silentRequestTimeout,d=t.automaticSilentRenew,v=void 0!==d&&d,y=t.includeIdTokenInSilentRenew,m=void 0===y||y,S=t.monitorSession,F=void 0===S||S,b=t.checkSessionInterval,_=void 0===b?f:b,w=t.stopCheckSessionOnError,E=void 0===w||w,x=t.revokeAccessTokenOnSignout,C=void 0!==x&&x,P=t.accessTokenExpiringNotificationTime,A=void 0===P?h:P,k=t.redirectNavigator,I=void 0===k?new o.RedirectNavigator:k,B=t.popupNavigator,R=void 0===B?new s.PopupNavigator:B,T=t.iframeNavigator,U=void 0===T?new a.IFrameNavigator:T,M=t.userStore,L=void 0===M?new u.WebStorageStateStore({store:c.Global.sessionStorage}):M;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,UserManagerSettings);var D=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,arguments[0]));return D._popup_redirect_uri=r,D._popup_post_logout_redirect_uri=n,D._popupWindowFeatures=i,D._popupWindowTarget=l,D._silent_redirect_uri=g,D._silentRequestTimeout=p,D._automaticSilentRenew=!!v,D._includeIdTokenInSilentRenew=m,D._accessTokenExpiringNotificationTime=A,D._monitorSession=F,D._checkSessionInterval=_,D._stopCheckSessionOnError=E,D._revokeAccessTokenOnSignout=C,D._redirectNavigator=I,D._popupNavigator=R,D._iframeNavigator=U,D._userStore=L,D}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(UserManagerSettings,e),n(UserManagerSettings,[{key:"popup_redirect_uri",get:function get(){return this._popup_redirect_uri}},{key:"popup_post_logout_redirect_uri",get:function get(){return this._popup_post_logout_redirect_uri}},{key:"popupWindowFeatures",get:function get(){return this._popupWindowFeatures}},{key:"popupWindowTarget",get:function get(){return this._popupWindowTarget}},{key:"silent_redirect_uri",get:function get(){return this._silent_redirect_uri}},{key:"silentRequestTimeout",get:function get(){return this._silentRequestTimeout}},{key:"automaticSilentRenew",get:function get(){return!(!this.silent_redirect_uri||!this._automaticSilentRenew)}},{key:"includeIdTokenInSilentRenew",get:function get(){return this._includeIdTokenInSilentRenew}},{key:"accessTokenExpiringNotificationTime",get:function get(){return this._accessTokenExpiringNotificationTime}},{key:"monitorSession",get:function get(){return this._monitorSession}},{key:"checkSessionInterval",get:function get(){return this._checkSessionInterval}},{key:"stopCheckSessionOnError",get:function get(){return this._stopCheckSessionOnError}},{key:"revokeAccessTokenOnSignout",get:function get(){return this._revokeAccessTokenOnSignout}},{key:"redirectNavigator",get:function get(){return this._redirectNavigator}},{key:"popupNavigator",get:function get(){return this._popupNavigator}},{key:"iframeNavigator",get:function get(){return this._iframeNavigator}},{key:"userStore",get:function get(){return this._userStore}}]),UserManagerSettings}(i.OidcClientSettings)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserManager=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(18),s=r(29),a=r(13),u=r(23),c=r(21),h=r(10),f=r(8);t.UserManager=function(e){function UserManager(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c.SilentRenewService,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h.SessionMonitor,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:f.TokenRevocationClient;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,UserManager),t instanceof s.UserManagerSettings||(t=new s.UserManagerSettings(t));var a=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t));return a._events=new u.UserManagerEvents(t),a._silentRenewService=new r(a),a.settings.automaticSilentRenew&&(i.Log.debug("UserManager.ctor: automaticSilentRenew is configured, setting up silent renew"),a.startSilentRenew()),a.settings.monitorSession&&(i.Log.debug("UserManager.ctor: monitorSession is configured, setting up session monitor"),a._sessionMonitor=new n(a)),a._tokenRevocationClient=new o(a._settings),a}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(UserManager,e),UserManager.prototype.getUser=function getUser(){var e=this;return this._loadUser().then(function(t){return t?(i.Log.info("UserManager.getUser: user loaded"),e._events.load(t,!1),t):(i.Log.info("UserManager.getUser: user not found in storage"),null)})},UserManager.prototype.removeUser=function removeUser(){var e=this;return this.storeUser(null).then(function(){i.Log.info("UserManager.removeUser: user removed from storage"),e._events.unload()})},UserManager.prototype.signinRedirect=function signinRedirect(e){return this._signinStart(e,this._redirectNavigator).then(function(){i.Log.info("UserManager.signinRedirect: successful")})},UserManager.prototype.signinRedirectCallback=function signinRedirectCallback(e){return this._signinEnd(e||this._redirectNavigator.url).then(function(e){return e&&(e.profile&&e.profile.sub?i.Log.info("UserManager.signinRedirectCallback: successful, signed in sub: ",e.profile.sub):i.Log.info("UserManager.signinRedirectCallback: no sub")),e})},UserManager.prototype.signinPopup=function signinPopup(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.redirect_uri||this.settings.popup_redirect_uri||this.settings.redirect_uri;return t?(e.redirect_uri=t,e.display="popup",this._signin(e,this._popupNavigator,{startUrl:t,popupWindowFeatures:e.popupWindowFeatures||this.settings.popupWindowFeatures,popupWindowTarget:e.popupWindowTarget||this.settings.popupWindowTarget}).then(function(e){return e&&(e.profile&&e.profile.sub?i.Log.info("UserManager.signinPopup: signinPopup successful, signed in sub: ",e.profile.sub):i.Log.info("UserManager.signinPopup: no sub")),e})):(i.Log.error("UserManager.signinPopup: No popup_redirect_uri or redirect_uri configured"),Promise.reject(new Error("No popup_redirect_uri or redirect_uri configured")))},UserManager.prototype.signinPopupCallback=function signinPopupCallback(e){return this._signinCallback(e,this._popupNavigator).then(function(e){return e&&(e.profile&&e.profile.sub?i.Log.info("UserManager.signinPopupCallback: successful, signed in sub: ",e.profile.sub):i.Log.info("UserManager.signinPopupCallback: no sub")),e}).catch(function(e){i.Log.error("UserManager.signinPopupCallback error: "+e&&e.message)})},UserManager.prototype.signinSilent=function signinSilent(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.redirect_uri||this.settings.silent_redirect_uri;if(!r)return i.Log.error("UserManager.signinSilent: No silent_redirect_uri configured"),Promise.reject(new Error("No silent_redirect_uri configured"));t.redirect_uri=r,t.prompt="none";return(t.id_token_hint||!this.settings.includeIdTokenInSilentRenew?Promise.resolve():this._loadUser().then(function(e){t.id_token_hint=e&&e.id_token})).then(function(){return e._signin(t,e._iframeNavigator,{startUrl:r,silentRequestTimeout:t.silentRequestTimeout||e.settings.silentRequestTimeout})}).then(function(e){return e&&(e.profile&&e.profile.sub?i.Log.info("UserManager.signinSilent: successful, signed in sub: ",e.profile.sub):i.Log.info("UserManager.signinSilent: no sub")),e})},UserManager.prototype.signinSilentCallback=function signinSilentCallback(e){return this._signinCallback(e,this._iframeNavigator).then(function(e){return e&&(e.profile&&e.profile.sub?i.Log.info("UserManager.signinSilentCallback: successful, signed in sub: ",e.profile.sub):i.Log.info("UserManager.signinSilentCallback: no sub")),e})},UserManager.prototype.querySessionStatus=function querySessionStatus(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.redirect_uri||this.settings.silent_redirect_uri;return r?(t.redirect_uri=r,t.prompt="none",t.response_type="id_token",t.scope="openid",this._signinStart(t,this._iframeNavigator,{startUrl:r,silentRequestTimeout:t.silentRequestTimeout||this.settings.silentRequestTimeout}).then(function(t){return e.processSigninResponse(t.url).then(function(e){if(i.Log.debug("UserManager.querySessionStatus: got signin response"),e.session_state&&e.profile.sub&&e.profile.sid)return i.Log.info("UserManager.querySessionStatus: querySessionStatus success for sub: ",e.profile.sub),{session_state:e.session_state,sub:e.profile.sub,sid:e.profile.sid};i.Log.info("querySessionStatus successful, user not authenticated")})})):(i.Log.error("UserManager.querySessionStatus: No silent_redirect_uri configured"),Promise.reject(new Error("No silent_redirect_uri configured")))},UserManager.prototype._signin=function _signin(e,t){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this._signinStart(e,t,n).then(function(e){return r._signinEnd(e.url)})},UserManager.prototype._signinStart=function _signinStart(e,t){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t.prepare(n).then(function(t){return i.Log.debug("UserManager._signinStart: got navigator window handle"),r.createSigninRequest(e).then(function(e){return i.Log.debug("UserManager._signinStart: got signin request"),n.url=e.url,n.id=e.state.id,t.navigate(n)}).catch(function(e){throw t.close&&(i.Log.debug("UserManager._signinStart: Error after preparing navigator, closing navigator window"),t.close()),e})})},UserManager.prototype._signinEnd=function _signinEnd(e){var t=this;return this.processSigninResponse(e).then(function(e){i.Log.debug("UserManager._signinEnd: got signin response");var r=new a.User(e);return t.storeUser(r).then(function(){return i.Log.debug("UserManager._signinEnd: user stored"),t._events.load(r),r})})},UserManager.prototype._signinCallback=function _signinCallback(e,t){return i.Log.debug("UserManager._signinCallback"),t.callback(e)},UserManager.prototype.signoutRedirect=function signoutRedirect(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.post_logout_redirect_uri||this.settings.post_logout_redirect_uri;return t&&(e.post_logout_redirect_uri=t),this._signoutStart(e,this._redirectNavigator).then(function(){i.Log.info("UserManager.signoutRedirect: successful")})},UserManager.prototype.signoutRedirectCallback=function signoutRedirectCallback(e){return this._signoutEnd(e||this._redirectNavigator.url).then(function(e){return i.Log.info("UserManager.signoutRedirectCallback: successful"),e})},UserManager.prototype.signoutPopup=function signoutPopup(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.post_logout_redirect_uri||this.settings.popup_post_logout_redirect_uri||this.settings.post_logout_redirect_uri;return e.post_logout_redirect_uri=t,e.display="popup",e.post_logout_redirect_uri&&(e.state=e.state||{}),this._signout(e,this._popupNavigator,{startUrl:t,popupWindowFeatures:e.popupWindowFeatures||this.settings.popupWindowFeatures,popupWindowTarget:e.popupWindowTarget||this.settings.popupWindowTarget}).then(function(){i.Log.info("UserManager.signinPopup: successful")})},UserManager.prototype.signoutPopupCallback=function signoutPopupCallback(e,t){void 0===t&&"boolean"==typeof e&&(e=null,t=!0);return this._popupNavigator.callback(e,t,"?").then(function(){i.Log.info("UserManager.signoutPopupCallback: successful")})},UserManager.prototype._signout=function _signout(e,t){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this._signoutStart(e,t,n).then(function(e){return r._signoutEnd(e.url)})},UserManager.prototype._signoutStart=function _signoutStart(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this,r=arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r.prepare(n).then(function(r){return i.Log.debug("UserManager._signoutStart: got navigator window handle"),t._loadUser().then(function(o){return i.Log.debug("UserManager._signoutStart: loaded current user from storage"),(t._settings.revokeAccessTokenOnSignout?t._revokeInternal(o):Promise.resolve()).then(function(){var s=e.id_token_hint||o&&o.id_token;return s&&(i.Log.debug("UserManager._signoutStart: Setting id_token into signout request"),e.id_token_hint=s),t.removeUser().then(function(){return i.Log.debug("UserManager._signoutStart: user removed, creating signout request"),t.createSignoutRequest(e).then(function(e){return i.Log.debug("UserManager._signoutStart: got signout request"),n.url=e.url,e.state&&(n.id=e.state.id),r.navigate(n)})})})}).catch(function(e){throw r.close&&(i.Log.debug("UserManager._signoutStart: Error after preparing navigator, closing navigator window"),r.close()),e})})},UserManager.prototype._signoutEnd=function _signoutEnd(e){return this.processSignoutResponse(e).then(function(e){return i.Log.debug("UserManager._signoutEnd: got signout response"),e})},UserManager.prototype.revokeAccessToken=function revokeAccessToken(){var e=this;return this._loadUser().then(function(t){return e._revokeInternal(t,!0).then(function(r){if(r)return i.Log.debug("UserManager.revokeAccessToken: removing token properties from user and re-storing"),t.access_token=null,t.expires_at=null,t.token_type=null,e.storeUser(t).then(function(){i.Log.debug("UserManager.revokeAccessToken: user stored"),e._events.load(t)})})}).then(function(){i.Log.info("UserManager.revokeAccessToken: access token revoked successfully")})},UserManager.prototype._revokeInternal=function _revokeInternal(e,t){var r=e&&e.access_token;return!r||r.indexOf(".")>=0?(i.Log.debug("UserManager.revokeAccessToken: no need to revoke due to no user, token, or JWT format"),Promise.resolve(!1)):this._tokenRevocationClient.revoke(r,t).then(function(){return!0})},UserManager.prototype.startSilentRenew=function startSilentRenew(){this._silentRenewService.start()},UserManager.prototype.stopSilentRenew=function stopSilentRenew(){this._silentRenewService.stop()},UserManager.prototype._loadUser=function _loadUser(){return this._userStore.get(this._userStoreKey).then(function(e){return e?(i.Log.debug("UserManager._loadUser: user storageString loaded"),a.User.fromStorageString(e)):(i.Log.debug("UserManager._loadUser: no user storageString"),null)})},UserManager.prototype.storeUser=function storeUser(e){if(e){i.Log.debug("UserManager.storeUser: storing user");var t=e.toStorageString();return this._userStore.set(this._userStoreKey,t)}return i.Log.debug("storeUser.storeUser: removing user"),this._userStore.remove(this._userStoreKey)},n(UserManager,[{key:"_redirectNavigator",get:function get(){return this.settings.redirectNavigator}},{key:"_popupNavigator",get:function get(){return this.settings.popupNavigator}},{key:"_iframeNavigator",get:function get(){return this.settings.iframeNavigator}},{key:"_userStore",get:function get(){return this.settings.userStore}},{key:"events",get:function get(){return this._events}},{key:"_userStoreKey",get:function get(){return"user:"+this.settings.authority+":"+this.settings.client_id}}]),UserManager}(o.OidcClient)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.InMemoryWebStorage=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0);t.InMemoryWebStorage=function(){function InMemoryWebStorage(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,InMemoryWebStorage),this._data={}}return InMemoryWebStorage.prototype.getItem=function getItem(e){return i.Log.debug("InMemoryWebStorage.getItem",e),this._data[e]},InMemoryWebStorage.prototype.setItem=function setItem(e,t){i.Log.debug("InMemoryWebStorage.setItem",e),this._data[e]=t},InMemoryWebStorage.prototype.removeItem=function removeItem(e){i.Log.debug("InMemoryWebStorage.removeItem",e),delete this._data[e]},InMemoryWebStorage.prototype.key=function key(e){return Object.getOwnPropertyNames(this._data)[e]},n(InMemoryWebStorage,[{key:"length",get:function get(){return Object.getOwnPropertyNames(this._data).length}}]),InMemoryWebStorage}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SignoutResponse=void 0;var n=r(2);t.SignoutResponse=function SignoutResponse(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SignoutResponse);var t=n.UrlUtility.parseUrlFragment(e,"?");this.error=t.error,this.error_description=t.error_description,this.error_uri=t.error_uri,this.state=t.state}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SignoutRequest=void 0;var n=r(0),i=r(2),o=r(4);t.SignoutRequest=function SignoutRequest(e){var t=e.url,r=e.id_token_hint,s=e.post_logout_redirect_uri,a=e.data;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SignoutRequest),!t)throw n.Log.error("SignoutRequest.ctor: No url passed"),new Error("url");r&&(t=i.UrlUtility.addQueryParam(t,"id_token_hint",r)),s&&(t=i.UrlUtility.addQueryParam(t,"post_logout_redirect_uri",s),a&&(this.state=new o.State({data:a}),t=i.UrlUtility.addQueryParam(t,"state",this.state.id))),this.url=t}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SigninResponse=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(2);t.SigninResponse=function(){function SigninResponse(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SigninResponse);var t=i.UrlUtility.parseUrlFragment(e,"#");this.error=t.error,this.error_description=t.error_description,this.error_uri=t.error_uri,this.state=t.state,this.id_token=t.id_token,this.session_state=t.session_state,this.access_token=t.access_token,this.token_type=t.token_type,this.scope=t.scope,this.profile=void 0;var r=parseInt(t.expires_in);if("number"==typeof r&&r>0){var n=parseInt(Date.now()/1e3);this.expires_at=n+r}}return n(SigninResponse,[{key:"expires_in",get:function get(){if(this.expires_at){var e=parseInt(Date.now()/1e3);return this.expires_at-e}}},{key:"expired",get:function get(){var e=this.expires_in;if(void 0!==e)return e<=0}},{key:"scopes",get:function get(){return(this.scope||"").split(" ")}},{key:"isOpenIdConnect",get:function get(){return this.scopes.indexOf("openid")>=0||!!this.id_token}}]),SigninResponse}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SigninRequest=void 0;var n=r(0),i=r(2),o=r(15);t.SigninRequest=function(){function SigninRequest(e){var t=e.url,r=e.client_id,s=e.redirect_uri,a=e.response_type,u=e.scope,c=e.authority,h=e.data,f=e.prompt,l=e.display,g=e.max_age,p=e.ui_locales,d=e.id_token_hint,v=e.login_hint,y=e.acr_values,m=e.resource,S=e.request,F=e.request_uri,b=e.extraQueryParams;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SigninRequest),!t)throw n.Log.error("SigninRequest.ctor: No url passed"),new Error("url");if(!r)throw n.Log.error("SigninRequest.ctor: No client_id passed"),new Error("client_id");if(!s)throw n.Log.error("SigninRequest.ctor: No redirect_uri passed"),new Error("redirect_uri");if(!a)throw n.Log.error("SigninRequest.ctor: No response_type passed"),new Error("response_type");if(!u)throw n.Log.error("SigninRequest.ctor: No scope passed"),new Error("scope");if(!c)throw n.Log.error("SigninRequest.ctor: No authority passed"),new Error("authority");var _=SigninRequest.isOidc(a);this.state=new o.SigninState({nonce:_,data:h,client_id:r,authority:c}),t=i.UrlUtility.addQueryParam(t,"client_id",r),t=i.UrlUtility.addQueryParam(t,"redirect_uri",s),t=i.UrlUtility.addQueryParam(t,"response_type",a),t=i.UrlUtility.addQueryParam(t,"scope",u),t=i.UrlUtility.addQueryParam(t,"state",this.state.id),_&&(t=i.UrlUtility.addQueryParam(t,"nonce",this.state.nonce));var w={prompt:f,display:l,max_age:g,ui_locales:p,id_token_hint:d,login_hint:v,acr_values:y,resource:m,request:S,request_uri:F};for(var E in w)w[E]&&(t=i.UrlUtility.addQueryParam(t,E,w[E]));for(var x in b)t=i.UrlUtility.addQueryParam(t,x,b[x]);this.url=t}return SigninRequest.isOidc=function isOidc(e){return!!e.split(/\s+/g).filter(function(e){return"id_token"===e})[0]},SigninRequest.isOAuth=function isOAuth(e){return!!e.split(/\s+/g).filter(function(e){return"token"===e})[0]},SigninRequest}()},function(e,t){var r={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==r.call(e)}},function(e,t){t.read=function(e,t,r,n,i){var o,s,a=8*i-n-1,u=(1<<a)-1,c=u>>1,h=-7,f=r?i-1:0,l=r?-1:1,g=e[t+f];for(f+=l,o=g&(1<<-h)-1,g>>=-h,h+=a;h>0;o=256*o+e[t+f],f+=l,h-=8);for(s=o&(1<<-h)-1,o>>=-h,h+=n;h>0;s=256*s+e[t+f],f+=l,h-=8);if(0===o)o=1-c;else{if(o===u)return s?NaN:1/0*(g?-1:1);s+=Math.pow(2,n),o-=c}return(g?-1:1)*s*Math.pow(2,o-n)},t.write=function(e,t,r,n,i,o){var s,a,u,c=8*o-i-1,h=(1<<c)-1,f=h>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,g=n?0:o-1,p=n?1:-1,d=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,s=h):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),(t+=s+f>=1?l/u:l*Math.pow(2,1-f))*u>=2&&(s++,u/=2),s+f>=h?(a=0,s=h):s+f>=1?(a=(t*u-1)*Math.pow(2,i),s+=f):(a=t*Math.pow(2,f-1)*Math.pow(2,i),s=0));i>=8;e[r+g]=255&a,g+=p,a/=256,i-=8);for(s=s<<i|a,c+=i;c>0;e[r+g]=255&s,g+=p,s/=256,c-=8);e[r+g-p]|=128*d}},function(e,t,r){"use strict";t.byteLength=function byteLength(e){var t=getLens(e),r=t[0],n=t[1];return 3*(r+n)/4-n},t.toByteArray=function toByteArray(e){for(var t,r=getLens(e),n=r[0],s=r[1],a=new o(function _byteLength(e,t,r){return 3*(t+r)/4-r}(0,n,s)),u=0,c=s>0?n-4:n,h=0;h<c;h+=4)t=i[e.charCodeAt(h)]<<18|i[e.charCodeAt(h+1)]<<12|i[e.charCodeAt(h+2)]<<6|i[e.charCodeAt(h+3)],a[u++]=t>>16&255,a[u++]=t>>8&255,a[u++]=255&t;2===s&&(t=i[e.charCodeAt(h)]<<2|i[e.charCodeAt(h+1)]>>4,a[u++]=255&t);1===s&&(t=i[e.charCodeAt(h)]<<10|i[e.charCodeAt(h+1)]<<4|i[e.charCodeAt(h+2)]>>2,a[u++]=t>>8&255,a[u++]=255&t);return a},t.fromByteArray=function fromByteArray(e){for(var t,r=e.length,i=r%3,o=[],s=0,a=r-i;s<a;s+=16383)o.push(encodeChunk(e,s,s+16383>a?a:s+16383));1===i?(t=e[r-1],o.push(n[t>>2]+n[t<<4&63]+"==")):2===i&&(t=(e[r-2]<<8)+e[r-1],o.push(n[t>>10]+n[t>>4&63]+n[t<<2&63]+"="));return o.join("")};for(var n=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,u=s.length;a<u;++a)n[a]=s[a],i[s.charCodeAt(a)]=a;function getLens(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");return-1===r&&(r=t),[r,r===t?0:4-r%4]}function tripletToBase64(e){return n[e>>18&63]+n[e>>12&63]+n[e>>6&63]+n[63&e]}function encodeChunk(e,t,r){for(var n,i=[],o=t;o<r;o+=3)n=(e[o]<<16&16711680)+(e[o+1]<<8&65280)+(255&e[o+2]),i.push(tripletToBase64(n));return i.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},function(e,t){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";(function(e){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var n=r(38),i=r(37),o=r(36);function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function createBuffer(e,t){if(kMaxLength()<t)throw new RangeError("Invalid typed array length");return Buffer.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t)).__proto__=Buffer.prototype:(null===e&&(e=new Buffer(t)),e.length=t),e}function Buffer(e,t,r){if(!(Buffer.TYPED_ARRAY_SUPPORT||this instanceof Buffer))return new Buffer(e,t,r);if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return allocUnsafe(this,e)}return from(this,e,t,r)}function from(e,t,r,n){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?function fromArrayBuffer(e,t,r,n){if(t.byteLength,r<0||t.byteLength<r)throw new RangeError("'offset' is out of bounds");if(t.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");t=void 0===r&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,r):new Uint8Array(t,r,n);Buffer.TYPED_ARRAY_SUPPORT?(e=t).__proto__=Buffer.prototype:e=fromArrayLike(e,t);return e}(e,t,r,n):"string"==typeof t?function fromString(e,t,r){"string"==typeof r&&""!==r||(r="utf8");if(!Buffer.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|byteLength(t,r),i=(e=createBuffer(e,n)).write(t,r);i!==n&&(e=e.slice(0,i));return e}(e,t,r):function fromObject(e,t){if(Buffer.isBuffer(t)){var r=0|checked(t.length);return 0===(e=createBuffer(e,r)).length?e:(t.copy(e,0,0,r),e)}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||function isnan(e){return e!=e}(t.length)?createBuffer(e,0):fromArrayLike(e,t);if("Buffer"===t.type&&o(t.data))return fromArrayLike(e,t.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function assertSize(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function allocUnsafe(e,t){if(assertSize(t),e=createBuffer(e,t<0?0:0|checked(t)),!Buffer.TYPED_ARRAY_SUPPORT)for(var r=0;r<t;++r)e[r]=0;return e}function fromArrayLike(e,t){var r=t.length<0?0:0|checked(t.length);e=createBuffer(e,r);for(var n=0;n<r;n+=1)e[n]=255&t[n];return e}function checked(e){if(e>=kMaxLength())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+kMaxLength().toString(16)+" bytes");return 0|e}function byteLength(e,t){if(Buffer.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var r=e.length;if(0===r)return 0;for(var n=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return utf8ToBytes(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return base64ToBytes(e).length;default:if(n)return utf8ToBytes(e).length;t=(""+t).toLowerCase(),n=!0}}function swap(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function bidirectionalIndexOf(e,t,r,n,i){if(0===e.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=i?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(i)return-1;r=e.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof t&&(t=Buffer.from(t,n)),Buffer.isBuffer(t))return 0===t.length?-1:arrayIndexOf(e,t,r,n,i);if("number"==typeof t)return t&=255,Buffer.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):arrayIndexOf(e,[t],r,n,i);throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(e,t,r,n,i){var o,s=1,a=e.length,u=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return-1;s=2,a/=2,u/=2,r/=2}function read(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(i){var c=-1;for(o=r;o<a;o++)if(read(e,o)===read(t,-1===c?0:o-c)){if(-1===c&&(c=o),o-c+1===u)return c*s}else-1!==c&&(o-=o-c),c=-1}else for(r+u>a&&(r=a-u),o=r;o>=0;o--){for(var h=!0,f=0;f<u;f++)if(read(e,o+f)!==read(t,f)){h=!1;break}if(h)return o}return-1}function hexWrite(e,t,r,n){r=Number(r)||0;var i=e.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=t.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var s=0;s<n;++s){var a=parseInt(t.substr(2*s,2),16);if(isNaN(a))return s;e[r+s]=a}return s}function utf8Write(e,t,r,n){return blitBuffer(utf8ToBytes(t,e.length-r),e,r,n)}function asciiWrite(e,t,r,n){return blitBuffer(function asciiToBytes(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(t),e,r,n)}function latin1Write(e,t,r,n){return asciiWrite(e,t,r,n)}function base64Write(e,t,r,n){return blitBuffer(base64ToBytes(t),e,r,n)}function ucs2Write(e,t,r,n){return blitBuffer(function utf16leToBytes(e,t){for(var r,n,i,o=[],s=0;s<e.length&&!((t-=2)<0);++s)r=e.charCodeAt(s),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(t,e.length-r),e,r,n)}function base64Slice(e,t,r){return 0===t&&r===e.length?n.fromByteArray(e):n.fromByteArray(e.slice(t,r))}function utf8Slice(e,t,r){r=Math.min(e.length,r);for(var n=[],i=t;i<r;){var o,a,u,c,h=e[i],f=null,l=h>239?4:h>223?3:h>191?2:1;if(i+l<=r)switch(l){case 1:h<128&&(f=h);break;case 2:128==(192&(o=e[i+1]))&&(c=(31&h)<<6|63&o)>127&&(f=c);break;case 3:o=e[i+1],a=e[i+2],128==(192&o)&&128==(192&a)&&(c=(15&h)<<12|(63&o)<<6|63&a)>2047&&(c<55296||c>57343)&&(f=c);break;case 4:o=e[i+1],a=e[i+2],u=e[i+3],128==(192&o)&&128==(192&a)&&128==(192&u)&&(c=(15&h)<<18|(63&o)<<12|(63&a)<<6|63&u)>65535&&c<1114112&&(f=c)}null===f?(f=65533,l=1):f>65535&&(f-=65536,n.push(f>>>10&1023|55296),f=56320|1023&f),n.push(f),i+=l}return function decodeCodePointsArray(e){var t=e.length;if(t<=s)return String.fromCharCode.apply(String,e);var r="",n=0;for(;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=s));return r}(n)}t.Buffer=Buffer,t.SlowBuffer=function SlowBuffer(e){+e!=e&&(e=0);return Buffer.alloc(+e)},t.INSPECT_MAX_BYTES=50,Buffer.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:function typedArraySupport(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(e){return!1}}(),t.kMaxLength=kMaxLength(),Buffer.poolSize=8192,Buffer._augment=function(e){return e.__proto__=Buffer.prototype,e},Buffer.from=function(e,t,r){return from(null,e,t,r)},Buffer.TYPED_ARRAY_SUPPORT&&(Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0})),Buffer.alloc=function(e,t,r){return function alloc(e,t,r,n){return assertSize(t),t<=0?createBuffer(e,t):void 0!==r?"string"==typeof n?createBuffer(e,t).fill(r,n):createBuffer(e,t).fill(r):createBuffer(e,t)}(null,e,t,r)},Buffer.allocUnsafe=function(e){return allocUnsafe(null,e)},Buffer.allocUnsafeSlow=function(e){return allocUnsafe(null,e)},Buffer.isBuffer=function isBuffer(e){return!(null==e||!e._isBuffer)},Buffer.compare=function compare(e,t){if(!Buffer.isBuffer(e)||!Buffer.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var r=e.length,n=t.length,i=0,o=Math.min(r,n);i<o;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0},Buffer.isEncoding=function isEncoding(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function concat(e,t){if(!o(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return Buffer.alloc(0);var r;if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;var n=Buffer.allocUnsafe(t),i=0;for(r=0;r<e.length;++r){var s=e[r];if(!Buffer.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(n,i),i+=s.length}return n},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function swap16(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)swap(this,t,t+1);return this},Buffer.prototype.swap32=function swap32(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)swap(this,t,t+3),swap(this,t+1,t+2);return this},Buffer.prototype.swap64=function swap64(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)swap(this,t,t+7),swap(this,t+1,t+6),swap(this,t+2,t+5),swap(this,t+3,t+4);return this},Buffer.prototype.toString=function toString(){var e=0|this.length;return 0===e?"":0===arguments.length?utf8Slice(this,0,e):function slowToString(e,t,r){var n=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return hexSlice(this,t,r);case"utf8":case"utf-8":return utf8Slice(this,t,r);case"ascii":return asciiSlice(this,t,r);case"latin1":case"binary":return latin1Slice(this,t,r);case"base64":return base64Slice(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}.apply(this,arguments)},Buffer.prototype.equals=function equals(e){if(!Buffer.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===Buffer.compare(this,e)},Buffer.prototype.inspect=function inspect(){var e="",r=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(e+=" ... ")),"<Buffer "+e+">"},Buffer.prototype.compare=function compare(e,t,r,n,i){if(!Buffer.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),t<0||r>e.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&t>=r)return 0;if(n>=i)return-1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,i>>>=0,this===e)return 0;for(var o=i-n,s=r-t,a=Math.min(o,s),u=this.slice(n,i),c=e.slice(t,r),h=0;h<a;++h)if(u[h]!==c[h]){o=u[h],s=c[h];break}return o<s?-1:s<o?1:0},Buffer.prototype.includes=function includes(e,t,r){return-1!==this.indexOf(e,t,r)},Buffer.prototype.indexOf=function indexOf(e,t,r){return bidirectionalIndexOf(this,e,t,r,!0)},Buffer.prototype.lastIndexOf=function lastIndexOf(e,t,r){return bidirectionalIndexOf(this,e,t,r,!1)},Buffer.prototype.write=function write(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var i=this.length-t;if((void 0===r||r>i)&&(r=i),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return hexWrite(this,e,t,r);case"utf8":case"utf-8":return utf8Write(this,e,t,r);case"ascii":return asciiWrite(this,e,t,r);case"latin1":case"binary":return latin1Write(this,e,t,r);case"base64":return base64Write(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,e,t,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},Buffer.prototype.toJSON=function toJSON(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var s=4096;function asciiSlice(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(127&e[i]);return n}function latin1Slice(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(e[i]);return n}function hexSlice(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=t;o<r;++o)i+=toHex(e[o]);return i}function utf16leSlice(e,t,r){for(var n=e.slice(t,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function checkOffset(e,t,r){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>r)throw new RangeError("Trying to access beyond buffer length")}function checkInt(e,t,r,n,i,o){if(!Buffer.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<o)throw new RangeError('"value" argument is out of bounds');if(r+n>e.length)throw new RangeError("Index out of range")}function objectWriteUInt16(e,t,r,n){t<0&&(t=65535+t+1);for(var i=0,o=Math.min(e.length-r,2);i<o;++i)e[r+i]=(t&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function objectWriteUInt32(e,t,r,n){t<0&&(t=4294967295+t+1);for(var i=0,o=Math.min(e.length-r,4);i<o;++i)e[r+i]=t>>>8*(n?i:3-i)&255}function checkIEEE754(e,t,r,n,i,o){if(r+n>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function writeFloat(e,t,r,n,o){return o||checkIEEE754(e,0,r,4),i.write(e,t,r,n,23,4),r+4}function writeDouble(e,t,r,n,o){return o||checkIEEE754(e,0,r,8),i.write(e,t,r,n,52,8),r+8}Buffer.prototype.slice=function slice(e,t){var r,n=this.length;if(e=~~e,t=void 0===t?n:~~t,e<0?(e+=n)<0&&(e=0):e>n&&(e=n),t<0?(t+=n)<0&&(t=0):t>n&&(t=n),t<e&&(t=e),Buffer.TYPED_ARRAY_SUPPORT)(r=this.subarray(e,t)).__proto__=Buffer.prototype;else{var i=t-e;r=new Buffer(i,void 0);for(var o=0;o<i;++o)r[o]=this[o+e]}return r},Buffer.prototype.readUIntLE=function readUIntLE(e,t,r){e|=0,t|=0,r||checkOffset(e,t,this.length);for(var n=this[e],i=1,o=0;++o<t&&(i*=256);)n+=this[e+o]*i;return n},Buffer.prototype.readUIntBE=function readUIntBE(e,t,r){e|=0,t|=0,r||checkOffset(e,t,this.length);for(var n=this[e+--t],i=1;t>0&&(i*=256);)n+=this[e+--t]*i;return n},Buffer.prototype.readUInt8=function readUInt8(e,t){return t||checkOffset(e,1,this.length),this[e]},Buffer.prototype.readUInt16LE=function readUInt16LE(e,t){return t||checkOffset(e,2,this.length),this[e]|this[e+1]<<8},Buffer.prototype.readUInt16BE=function readUInt16BE(e,t){return t||checkOffset(e,2,this.length),this[e]<<8|this[e+1]},Buffer.prototype.readUInt32LE=function readUInt32LE(e,t){return t||checkOffset(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},Buffer.prototype.readUInt32BE=function readUInt32BE(e,t){return t||checkOffset(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},Buffer.prototype.readIntLE=function readIntLE(e,t,r){e|=0,t|=0,r||checkOffset(e,t,this.length);for(var n=this[e],i=1,o=0;++o<t&&(i*=256);)n+=this[e+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*t)),n},Buffer.prototype.readIntBE=function readIntBE(e,t,r){e|=0,t|=0,r||checkOffset(e,t,this.length);for(var n=t,i=1,o=this[e+--n];n>0&&(i*=256);)o+=this[e+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*t)),o},Buffer.prototype.readInt8=function readInt8(e,t){return t||checkOffset(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},Buffer.prototype.readInt16LE=function readInt16LE(e,t){t||checkOffset(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function readInt16BE(e,t){t||checkOffset(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function readInt32LE(e,t){return t||checkOffset(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},Buffer.prototype.readInt32BE=function readInt32BE(e,t){return t||checkOffset(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},Buffer.prototype.readFloatLE=function readFloatLE(e,t){return t||checkOffset(e,4,this.length),i.read(this,e,!0,23,4)},Buffer.prototype.readFloatBE=function readFloatBE(e,t){return t||checkOffset(e,4,this.length),i.read(this,e,!1,23,4)},Buffer.prototype.readDoubleLE=function readDoubleLE(e,t){return t||checkOffset(e,8,this.length),i.read(this,e,!0,52,8)},Buffer.prototype.readDoubleBE=function readDoubleBE(e,t){return t||checkOffset(e,8,this.length),i.read(this,e,!1,52,8)},Buffer.prototype.writeUIntLE=function writeUIntLE(e,t,r,n){(e=+e,t|=0,r|=0,n)||checkInt(this,e,t,r,Math.pow(2,8*r)-1,0);var i=1,o=0;for(this[t]=255&e;++o<r&&(i*=256);)this[t+o]=e/i&255;return t+r},Buffer.prototype.writeUIntBE=function writeUIntBE(e,t,r,n){(e=+e,t|=0,r|=0,n)||checkInt(this,e,t,r,Math.pow(2,8*r)-1,0);var i=r-1,o=1;for(this[t+i]=255&e;--i>=0&&(o*=256);)this[t+i]=e/o&255;return t+r},Buffer.prototype.writeUInt8=function writeUInt8(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,1,255,0),Buffer.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},Buffer.prototype.writeUInt16LE=function writeUInt16LE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):objectWriteUInt16(this,e,t,!0),t+2},Buffer.prototype.writeUInt16BE=function writeUInt16BE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):objectWriteUInt16(this,e,t,!1),t+2},Buffer.prototype.writeUInt32LE=function writeUInt32LE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):objectWriteUInt32(this,e,t,!0),t+4},Buffer.prototype.writeUInt32BE=function writeUInt32BE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):objectWriteUInt32(this,e,t,!1),t+4},Buffer.prototype.writeIntLE=function writeIntLE(e,t,r,n){if(e=+e,t|=0,!n){var i=Math.pow(2,8*r-1);checkInt(this,e,t,r,i-1,-i)}var o=0,s=1,a=0;for(this[t]=255&e;++o<r&&(s*=256);)e<0&&0===a&&0!==this[t+o-1]&&(a=1),this[t+o]=(e/s>>0)-a&255;return t+r},Buffer.prototype.writeIntBE=function writeIntBE(e,t,r,n){if(e=+e,t|=0,!n){var i=Math.pow(2,8*r-1);checkInt(this,e,t,r,i-1,-i)}var o=r-1,s=1,a=0;for(this[t+o]=255&e;--o>=0&&(s*=256);)e<0&&0===a&&0!==this[t+o+1]&&(a=1),this[t+o]=(e/s>>0)-a&255;return t+r},Buffer.prototype.writeInt8=function writeInt8(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,1,127,-128),Buffer.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},Buffer.prototype.writeInt16LE=function writeInt16LE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):objectWriteUInt16(this,e,t,!0),t+2},Buffer.prototype.writeInt16BE=function writeInt16BE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):objectWriteUInt16(this,e,t,!1),t+2},Buffer.prototype.writeInt32LE=function writeInt32LE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,4,2147483647,-2147483648),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):objectWriteUInt32(this,e,t,!0),t+4},Buffer.prototype.writeInt32BE=function writeInt32BE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):objectWriteUInt32(this,e,t,!1),t+4},Buffer.prototype.writeFloatLE=function writeFloatLE(e,t,r){return writeFloat(this,e,t,!0,r)},Buffer.prototype.writeFloatBE=function writeFloatBE(e,t,r){return writeFloat(this,e,t,!1,r)},Buffer.prototype.writeDoubleLE=function writeDoubleLE(e,t,r){return writeDouble(this,e,t,!0,r)},Buffer.prototype.writeDoubleBE=function writeDoubleBE(e,t,r){return writeDouble(this,e,t,!1,r)},Buffer.prototype.copy=function copy(e,t,r,n){if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var i,o=n-r;if(this===e&&r<t&&t<n)for(i=o-1;i>=0;--i)e[i+t]=this[i+r];else if(o<1e3||!Buffer.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)e[i+t]=this[i+r];else Uint8Array.prototype.set.call(e,this.subarray(r,r+o),t);return o},Buffer.prototype.fill=function fill(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===e.length){var i=e.charCodeAt(0);i<256&&(e=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;var o;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(o=t;o<r;++o)this[o]=e;else{var s=Buffer.isBuffer(e)?e:utf8ToBytes(new Buffer(e,n).toString()),a=s.length;for(o=0;o<r-t;++o)this[o+t]=s[o%a]}return this};var a=/[^+\/0-9A-Za-z-_]/g;function toHex(e){return e<16?"0"+e.toString(16):e.toString(16)}function utf8ToBytes(e,t){var r;t=t||1/0;for(var n=e.length,i=null,o=[],s=0;s<n;++s){if((r=e.charCodeAt(s))>55295&&r<57344){if(!i){if(r>56319){(t-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(t-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(t-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(t-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((t-=1)<0)break;o.push(r)}else if(r<2048){if((t-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function base64ToBytes(e){return n.toByteArray(function base64clean(e){if((e=function stringtrim(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}(e).replace(a,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function blitBuffer(e,t,r,n){for(var i=0;i<n&&!(i+r>=t.length||i>=e.length);++i)t[i+r]=e[i];return i}}).call(this,r(39))},function(e,t,r){"use strict";(function(n){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u={userAgent:!1},p={};
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
if(void 0===v)var v={};v.lang={extend:function extend(t,r,n){if(!r||!t)throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");var i=function d(){};if(i.prototype=r.prototype,t.prototype=new i,t.prototype.constructor=t,t.superclass=r.prototype,r.prototype.constructor==Object.prototype.constructor&&(r.prototype.constructor=r),n){var o;for(o in n)t.prototype[o]=n[o];var s=function e(){},a=["toString","valueOf"];try{/MSIE/.test(u.userAgent)&&(s=function e(t,r){for(o=0;o<a.length;o+=1){var n=a[o],i=r[n];"function"==typeof i&&i!=Object.prototype[n]&&(t[n]=i)}})}catch(e){}s(t.prototype,n)}}};
/*! CryptoJS v3.1.2 core-fix.js
 * code.google.com/p/crypto-js
 * (c) 2009-2013 by Jeff Mott. All rights reserved.
 * code.google.com/p/crypto-js/wiki/License
 * THIS IS FIX of 'core.js' to fix Hmac issue.
 * https://code.google.com/p/crypto-js/issues/detail?id=84
 * https://crypto-js.googlecode.com/svn-history/r667/branches/3.x/src/core.js
 */
var y=y||function(e,t){var r={},n=r.lib={},i=n.Base=function(){function n(){}return{extend:function extend(e){n.prototype=this;var t=new n;return e&&t.mixIn(e),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function create(){var e=this.extend();return e.init.apply(e,arguments),e},init:function init(){},mixIn:function mixIn(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function clone(){return this.init.prototype.extend(this)}}}(),o=n.WordArray=i.extend({init:function init(e,t){e=this.words=e||[],this.sigBytes=void 0!=t?t:4*e.length},toString:function toString(e){return(e||a).stringify(this)},concat:function concat(e){var t=this.words,r=e.words,n=this.sigBytes,i=e.sigBytes;if(this.clamp(),n%4)for(var o=0;o<i;o++){var s=r[o>>>2]>>>24-o%4*8&255;t[n+o>>>2]|=s<<24-(n+o)%4*8}else for(o=0;o<i;o+=4)t[n+o>>>2]=r[o>>>2];return this.sigBytes+=i,this},clamp:function clamp(){var t=this.words,r=this.sigBytes;t[r>>>2]&=4294967295<<32-r%4*8,t.length=e.ceil(r/4)},clone:function clone(){var e=i.clone.call(this);return e.words=this.words.slice(0),e},random:function random(t){for(var r=[],n=0;n<t;n+=4)r.push(4294967296*e.random()|0);return new o.init(r,t)}}),s=r.enc={},a=s.Hex={stringify:function stringify(e){for(var t=e.words,r=e.sigBytes,n=[],i=0;i<r;i++){var o=t[i>>>2]>>>24-i%4*8&255;n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")},parse:function parse(e){for(var t=e.length,r=[],n=0;n<t;n+=2)r[n>>>3]|=parseInt(e.substr(n,2),16)<<24-n%8*4;return new o.init(r,t/2)}},u=s.Latin1={stringify:function stringify(e){for(var t=e.words,r=e.sigBytes,n=[],i=0;i<r;i++){var o=t[i>>>2]>>>24-i%4*8&255;n.push(String.fromCharCode(o))}return n.join("")},parse:function parse(e){for(var t=e.length,r=[],n=0;n<t;n++)r[n>>>2]|=(255&e.charCodeAt(n))<<24-n%4*8;return new o.init(r,t)}},c=s.Utf8={stringify:function stringify(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function parse(e){return u.parse(unescape(encodeURIComponent(e)))}},h=n.BufferedBlockAlgorithm=i.extend({reset:function reset(){this._data=new o.init,this._nDataBytes=0},_append:function _append(e){"string"==typeof e&&(e=c.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function _process(t){var r=this._data,n=r.words,i=r.sigBytes,s=this.blockSize,a=i/(4*s),u=(a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0))*s,c=e.min(4*u,i);if(u){for(var h=0;h<u;h+=s)this._doProcessBlock(n,h);var f=n.splice(0,u);r.sigBytes-=c}return new o.init(f,c)},clone:function clone(){var e=i.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0}),f=(n.Hasher=h.extend({cfg:i.extend(),init:function init(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function reset(){h.reset.call(this),this._doReset()},update:function update(e){return this._append(e),this._process(),this},finalize:function finalize(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function _createHelper(e){return function(t,r){return new e.init(r).finalize(t)}},_createHmacHelper:function _createHmacHelper(e){return function(t,r){return new f.HMAC.init(e,r).finalize(t)}}}),r.algo={});return r}(Math);!function(e){var t,r=(t=y).lib,n=r.Base,i=r.WordArray;(t=t.x64={}).Word=n.extend({init:function init(e,t){this.high=e,this.low=t}}),t.WordArray=n.extend({init:function init(e,t){e=this.words=e||[],this.sigBytes=void 0!=t?t:8*e.length},toX32:function toX32(){for(var e=this.words,t=e.length,r=[],n=0;n<t;n++){var o=e[n];r.push(o.high),r.push(o.low)}return i.create(r,this.sigBytes)},clone:function clone(){for(var e=n.clone.call(this),t=e.words=this.words.slice(0),r=t.length,i=0;i<r;i++)t[i]=t[i].clone();return e}})}(),function(){var e=y,t=e.lib.WordArray;e.enc.Base64={stringify:function stringify(e){var t=e.words,r=e.sigBytes,n=this._map;e.clamp(),e=[];for(var i=0;i<r;i+=3)for(var o=(t[i>>>2]>>>24-i%4*8&255)<<16|(t[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|t[i+2>>>2]>>>24-(i+2)%4*8&255,s=0;4>s&&i+.75*s<r;s++)e.push(n.charAt(o>>>6*(3-s)&63));if(t=n.charAt(64))for(;e.length%4;)e.push(t);return e.join("")},parse:function parse(e){var r=e.length,n=this._map;(i=n.charAt(64))&&(-1!=(i=e.indexOf(i))&&(r=i));for(var i=[],o=0,s=0;s<r;s++)if(s%4){var a=n.indexOf(e.charAt(s-1))<<s%4*2,u=n.indexOf(e.charAt(s))>>>6-s%4*2;i[o>>>2]|=(a|u)<<24-o%4*8,o++}return t.create(i,o)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(e){for(var t=y,r=(i=t.lib).WordArray,n=i.Hasher,i=t.algo,o=[],s=[],a=function u(e){return 4294967296*(e-(0|e))|0},u=2,c=0;64>c;){var h;e:{h=u;for(var f=e.sqrt(h),l=2;l<=f;l++)if(!(h%l)){h=!1;break e}h=!0}h&&(8>c&&(o[c]=a(e.pow(u,.5))),s[c]=a(e.pow(u,1/3)),c++),u++}var g=[];i=i.SHA256=n.extend({_doReset:function _doReset(){this._hash=new r.init(o.slice(0))},_doProcessBlock:function _doProcessBlock(e,t){for(var r=this._hash.words,n=r[0],i=r[1],o=r[2],a=r[3],u=r[4],c=r[5],h=r[6],f=r[7],l=0;64>l;l++){if(16>l)g[l]=0|e[t+l];else{var p=g[l-15],d=g[l-2];g[l]=((p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3)+g[l-7]+((d<<15|d>>>17)^(d<<13|d>>>19)^d>>>10)+g[l-16]}p=f+((u<<26|u>>>6)^(u<<21|u>>>11)^(u<<7|u>>>25))+(u&c^~u&h)+s[l]+g[l],d=((n<<30|n>>>2)^(n<<19|n>>>13)^(n<<10|n>>>22))+(n&i^n&o^i&o),f=h,h=c,c=u,u=a+p|0,a=o,o=i,i=n,n=p+d|0}r[0]=r[0]+n|0,r[1]=r[1]+i|0,r[2]=r[2]+o|0,r[3]=r[3]+a|0,r[4]=r[4]+u|0,r[5]=r[5]+c|0,r[6]=r[6]+h|0,r[7]=r[7]+f|0},_doFinalize:function _doFinalize(){var t=this._data,r=t.words,n=8*this._nDataBytes,i=8*t.sigBytes;return r[i>>>5]|=128<<24-i%32,r[14+(i+64>>>9<<4)]=e.floor(n/4294967296),r[15+(i+64>>>9<<4)]=n,t.sigBytes=4*r.length,this._process(),this._hash},clone:function clone(){var e=n.clone.call(this);return e._hash=this._hash.clone(),e}});t.SHA256=n._createHelper(i),t.HmacSHA256=n._createHmacHelper(i)}(Math),function(){function a(){return r.create.apply(r,arguments)}for(var e=y,t=e.lib.Hasher,r=(i=e.x64).Word,n=i.WordArray,i=e.algo,o=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],s=[],u=0;80>u;u++)s[u]=a();i=i.SHA512=t.extend({_doReset:function _doReset(){this._hash=new n.init([new r.init(1779033703,4089235720),new r.init(3144134277,2227873595),new r.init(1013904242,4271175723),new r.init(2773480762,1595750129),new r.init(1359893119,2917565137),new r.init(2600822924,725511199),new r.init(528734635,4215389547),new r.init(1541459225,327033209)])},_doProcessBlock:function _doProcessBlock(e,t){for(var r=(f=this._hash.words)[0],n=f[1],i=f[2],a=f[3],u=f[4],c=f[5],h=f[6],f=f[7],l=r.high,g=r.low,p=n.high,d=n.low,v=i.high,y=i.low,m=a.high,S=a.low,F=u.high,b=u.low,_=c.high,w=c.low,E=h.high,x=h.low,C=f.high,P=f.low,A=l,k=g,I=p,B=d,R=v,T=y,U=m,M=S,L=F,D=b,N=_,O=w,H=E,j=x,K=C,q=P,W=0;80>W;W++){var V=s[W];if(16>W)var J=V.high=0|e[t+2*W],z=V.low=0|e[t+2*W+1];else{J=((z=(J=s[W-15]).high)>>>1|(Y=J.low)<<31)^(z>>>8|Y<<24)^z>>>7;var Y=(Y>>>1|z<<31)^(Y>>>8|z<<24)^(Y>>>7|z<<25),G=((z=(G=s[W-2]).high)>>>19|(X=G.low)<<13)^(z<<3|X>>>29)^z>>>6,X=(X>>>19|z<<13)^(X<<3|z>>>29)^(X>>>6|z<<26),Q=(z=s[W-7]).high,Z=($=s[W-16]).high,$=$.low;J=(J=(J=J+Q+((z=Y+z.low)>>>0<Y>>>0?1:0))+G+((z=z+X)>>>0<X>>>0?1:0))+Z+((z=z+$)>>>0<$>>>0?1:0);V.high=J,V.low=z}Q=L&N^~L&H,$=D&O^~D&j,V=A&I^A&R^I&R;var ee=k&B^k&T^B&T,te=(Y=(A>>>28|k<<4)^(A<<30|k>>>2)^(A<<25|k>>>7),G=(k>>>28|A<<4)^(k<<30|A>>>2)^(k<<25|A>>>7),(X=o[W]).high),re=X.low;Z=(Z=(Z=(Z=K+((L>>>14|D<<18)^(L>>>18|D<<14)^(L<<23|D>>>9))+((X=q+((D>>>14|L<<18)^(D>>>18|L<<14)^(D<<23|L>>>9)))>>>0<q>>>0?1:0))+Q+((X=X+$)>>>0<$>>>0?1:0))+te+((X=X+re)>>>0<re>>>0?1:0))+J+((X=X+z)>>>0<z>>>0?1:0),V=Y+V+((z=G+ee)>>>0<G>>>0?1:0),K=H,q=j,H=N,j=O,N=L,O=D,L=U+Z+((D=M+X|0)>>>0<M>>>0?1:0)|0,U=R,M=T,R=I,T=B,I=A,B=k,A=Z+V+((k=X+z|0)>>>0<X>>>0?1:0)|0}g=r.low=g+k,r.high=l+A+(g>>>0<k>>>0?1:0),d=n.low=d+B,n.high=p+I+(d>>>0<B>>>0?1:0),y=i.low=y+T,i.high=v+R+(y>>>0<T>>>0?1:0),S=a.low=S+M,a.high=m+U+(S>>>0<M>>>0?1:0),b=u.low=b+D,u.high=F+L+(b>>>0<D>>>0?1:0),w=c.low=w+O,c.high=_+N+(w>>>0<O>>>0?1:0),x=h.low=x+j,h.high=E+H+(x>>>0<j>>>0?1:0),P=f.low=P+q,f.high=C+K+(P>>>0<q>>>0?1:0)},_doFinalize:function _doFinalize(){var e=this._data,t=e.words,r=8*this._nDataBytes,n=8*e.sigBytes;return t[n>>>5]|=128<<24-n%32,t[30+(n+128>>>10<<5)]=Math.floor(r/4294967296),t[31+(n+128>>>10<<5)]=r,e.sigBytes=4*t.length,this._process(),this._hash.toX32()},clone:function clone(){var e=t.clone.call(this);return e._hash=this._hash.clone(),e},blockSize:32}),e.SHA512=t._createHelper(i),e.HmacSHA512=t._createHmacHelper(i)}(),function(){var e=y,t=(i=e.x64).Word,r=i.WordArray,n=(i=e.algo).SHA512,i=i.SHA384=n.extend({_doReset:function _doReset(){this._hash=new r.init([new t.init(3418070365,3238371032),new t.init(1654270250,914150663),new t.init(2438529370,812702999),new t.init(355462360,4144912697),new t.init(1731405415,4290775857),new t.init(2394180231,1750603025),new t.init(3675008525,1694076839),new t.init(1203062813,3204075428)])},_doFinalize:function _doFinalize(){var e=n._doFinalize.call(this);return e.sigBytes-=16,e}});e.SHA384=n._createHelper(i),e.HmacSHA384=n._createHmacHelper(i)}();
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var S,F="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_="=";function hex2b64(e){var t,r,n="";for(t=0;t+3<=e.length;t+=3)r=parseInt(e.substring(t,t+3),16),n+=F.charAt(r>>6)+F.charAt(63&r);if(t+1==e.length?(r=parseInt(e.substring(t,t+1),16),n+=F.charAt(r<<2)):t+2==e.length&&(r=parseInt(e.substring(t,t+2),16),n+=F.charAt(r>>2)+F.charAt((3&r)<<4)),_)for(;(3&n.length)>0;)n+=_;return n}function b64tohex(e){var t,r,n,i="",o=0;for(t=0;t<e.length&&e.charAt(t)!=_;++t)(n=F.indexOf(e.charAt(t)))<0||(0==o?(i+=int2char(n>>2),r=3&n,o=1):1==o?(i+=int2char(r<<2|n>>4),r=15&n,o=2):2==o?(i+=int2char(r),i+=int2char(n>>2),r=3&n,o=3):(i+=int2char(r<<2|n>>4),i+=int2char(15&n),o=0));return 1==o&&(i+=int2char(r<<2)),i}function b64toBA(e){var t,r=b64tohex(e),n=new Array;for(t=0;2*t<r.length;++t)n[t]=parseInt(r.substring(2*t,2*t+2),16);return n}function BigInteger(e,t,r){null!=e&&("number"==typeof e?this.fromNumber(e,t,r):null==t&&"string"!=typeof e?this.fromString(e,256):this.fromString(e,t))}function nbi(){return new BigInteger(null)}"Microsoft Internet Explorer"==u.appName?(BigInteger.prototype.am=function am2(e,t,r,n,i,o){for(var s=32767&t,a=t>>15;--o>=0;){var u=32767&this[e],c=this[e++]>>15,h=a*u+c*s;i=((u=s*u+((32767&h)<<15)+r[n]+(1073741823&i))>>>30)+(h>>>15)+a*c+(i>>>30),r[n++]=1073741823&u}return i},S=30):"Netscape"!=u.appName?(BigInteger.prototype.am=function am1(e,t,r,n,i,o){for(;--o>=0;){var s=t*this[e++]+r[n]+i;i=Math.floor(s/67108864),r[n++]=67108863&s}return i},S=26):(BigInteger.prototype.am=function am3(e,t,r,n,i,o){for(var s=16383&t,a=t>>14;--o>=0;){var u=16383&this[e],c=this[e++]>>14,h=a*u+c*s;i=((u=s*u+((16383&h)<<14)+r[n]+i)>>28)+(h>>14)+a*c,r[n++]=268435455&u}return i},S=28),BigInteger.prototype.DB=S,BigInteger.prototype.DM=(1<<S)-1,BigInteger.prototype.DV=1<<S;BigInteger.prototype.FV=Math.pow(2,52),BigInteger.prototype.F1=52-S,BigInteger.prototype.F2=2*S-52;var w,E,C="0123456789abcdefghijklmnopqrstuvwxyz",P=new Array;for(w="0".charCodeAt(0),E=0;E<=9;++E)P[w++]=E;for(w="a".charCodeAt(0),E=10;E<36;++E)P[w++]=E;for(w="A".charCodeAt(0),E=10;E<36;++E)P[w++]=E;function int2char(e){return C.charAt(e)}function intAt(e,t){var r=P[e.charCodeAt(t)];return null==r?-1:r}function nbv(e){var t=nbi();return t.fromInt(e),t}function nbits(e){var t,r=1;return 0!=(t=e>>>16)&&(e=t,r+=16),0!=(t=e>>8)&&(e=t,r+=8),0!=(t=e>>4)&&(e=t,r+=4),0!=(t=e>>2)&&(e=t,r+=2),0!=(t=e>>1)&&(e=t,r+=1),r}function Classic(e){this.m=e}function Montgomery(e){this.m=e,this.mp=e.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<e.DB-15)-1,this.mt2=2*e.t}function op_and(e,t){return e&t}function op_or(e,t){return e|t}function op_xor(e,t){return e^t}function op_andnot(e,t){return e&~t}function lbit(e){if(0==e)return-1;var t=0;return 0==(65535&e)&&(e>>=16,t+=16),0==(255&e)&&(e>>=8,t+=8),0==(15&e)&&(e>>=4,t+=4),0==(3&e)&&(e>>=2,t+=2),0==(1&e)&&++t,t}function cbit(e){for(var t=0;0!=e;)e&=e-1,++t;return t}function NullExp(){}function nNop(e){return e}function Barrett(e){this.r2=nbi(),this.q3=nbi(),BigInteger.ONE.dlShiftTo(2*e.t,this.r2),this.mu=this.r2.divide(e),this.m=e}Classic.prototype.convert=function cConvert(e){return e.s<0||e.compareTo(this.m)>=0?e.mod(this.m):e},Classic.prototype.revert=function cRevert(e){return e},Classic.prototype.reduce=function cReduce(e){e.divRemTo(this.m,null,e)},Classic.prototype.mulTo=function cMulTo(e,t,r){e.multiplyTo(t,r),this.reduce(r)},Classic.prototype.sqrTo=function cSqrTo(e,t){e.squareTo(t),this.reduce(t)},Montgomery.prototype.convert=function montConvert(e){var t=nbi();return e.abs().dlShiftTo(this.m.t,t),t.divRemTo(this.m,null,t),e.s<0&&t.compareTo(BigInteger.ZERO)>0&&this.m.subTo(t,t),t},Montgomery.prototype.revert=function montRevert(e){var t=nbi();return e.copyTo(t),this.reduce(t),t},Montgomery.prototype.reduce=function montReduce(e){for(;e.t<=this.mt2;)e[e.t++]=0;for(var t=0;t<this.m.t;++t){var r=32767&e[t],n=r*this.mpl+((r*this.mph+(e[t]>>15)*this.mpl&this.um)<<15)&e.DM;for(e[r=t+this.m.t]+=this.m.am(0,n,e,t,0,this.m.t);e[r]>=e.DV;)e[r]-=e.DV,e[++r]++}e.clamp(),e.drShiftTo(this.m.t,e),e.compareTo(this.m)>=0&&e.subTo(this.m,e)},Montgomery.prototype.mulTo=function montMulTo(e,t,r){e.multiplyTo(t,r),this.reduce(r)},Montgomery.prototype.sqrTo=function montSqrTo(e,t){e.squareTo(t),this.reduce(t)},BigInteger.prototype.copyTo=function bnpCopyTo(e){for(var t=this.t-1;t>=0;--t)e[t]=this[t];e.t=this.t,e.s=this.s},BigInteger.prototype.fromInt=function bnpFromInt(e){this.t=1,this.s=e<0?-1:0,e>0?this[0]=e:e<-1?this[0]=e+this.DV:this.t=0},BigInteger.prototype.fromString=function bnpFromString(e,t){var r;if(16==t)r=4;else if(8==t)r=3;else if(256==t)r=8;else if(2==t)r=1;else if(32==t)r=5;else{if(4!=t)return void this.fromRadix(e,t);r=2}this.t=0,this.s=0;for(var n=e.length,i=!1,o=0;--n>=0;){var s=8==r?255&e[n]:intAt(e,n);s<0?"-"==e.charAt(n)&&(i=!0):(i=!1,0==o?this[this.t++]=s:o+r>this.DB?(this[this.t-1]|=(s&(1<<this.DB-o)-1)<<o,this[this.t++]=s>>this.DB-o):this[this.t-1]|=s<<o,(o+=r)>=this.DB&&(o-=this.DB))}8==r&&0!=(128&e[0])&&(this.s=-1,o>0&&(this[this.t-1]|=(1<<this.DB-o)-1<<o)),this.clamp(),i&&BigInteger.ZERO.subTo(this,this)},BigInteger.prototype.clamp=function bnpClamp(){for(var e=this.s&this.DM;this.t>0&&this[this.t-1]==e;)--this.t},BigInteger.prototype.dlShiftTo=function bnpDLShiftTo(e,t){var r;for(r=this.t-1;r>=0;--r)t[r+e]=this[r];for(r=e-1;r>=0;--r)t[r]=0;t.t=this.t+e,t.s=this.s},BigInteger.prototype.drShiftTo=function bnpDRShiftTo(e,t){for(var r=e;r<this.t;++r)t[r-e]=this[r];t.t=Math.max(this.t-e,0),t.s=this.s},BigInteger.prototype.lShiftTo=function bnpLShiftTo(e,t){var r,n=e%this.DB,i=this.DB-n,o=(1<<i)-1,s=Math.floor(e/this.DB),a=this.s<<n&this.DM;for(r=this.t-1;r>=0;--r)t[r+s+1]=this[r]>>i|a,a=(this[r]&o)<<n;for(r=s-1;r>=0;--r)t[r]=0;t[s]=a,t.t=this.t+s+1,t.s=this.s,t.clamp()},BigInteger.prototype.rShiftTo=function bnpRShiftTo(e,t){t.s=this.s;var r=Math.floor(e/this.DB);if(r>=this.t)t.t=0;else{var n=e%this.DB,i=this.DB-n,o=(1<<n)-1;t[0]=this[r]>>n;for(var s=r+1;s<this.t;++s)t[s-r-1]|=(this[s]&o)<<i,t[s-r]=this[s]>>n;n>0&&(t[this.t-r-1]|=(this.s&o)<<i),t.t=this.t-r,t.clamp()}},BigInteger.prototype.subTo=function bnpSubTo(e,t){for(var r=0,n=0,i=Math.min(e.t,this.t);r<i;)n+=this[r]-e[r],t[r++]=n&this.DM,n>>=this.DB;if(e.t<this.t){for(n-=e.s;r<this.t;)n+=this[r],t[r++]=n&this.DM,n>>=this.DB;n+=this.s}else{for(n+=this.s;r<e.t;)n-=e[r],t[r++]=n&this.DM,n>>=this.DB;n-=e.s}t.s=n<0?-1:0,n<-1?t[r++]=this.DV+n:n>0&&(t[r++]=n),t.t=r,t.clamp()},BigInteger.prototype.multiplyTo=function bnpMultiplyTo(e,t){var r=this.abs(),n=e.abs(),i=r.t;for(t.t=i+n.t;--i>=0;)t[i]=0;for(i=0;i<n.t;++i)t[i+r.t]=r.am(0,n[i],t,i,0,r.t);t.s=0,t.clamp(),this.s!=e.s&&BigInteger.ZERO.subTo(t,t)},BigInteger.prototype.squareTo=function bnpSquareTo(e){for(var t=this.abs(),r=e.t=2*t.t;--r>=0;)e[r]=0;for(r=0;r<t.t-1;++r){var n=t.am(r,t[r],e,2*r,0,1);(e[r+t.t]+=t.am(r+1,2*t[r],e,2*r+1,n,t.t-r-1))>=t.DV&&(e[r+t.t]-=t.DV,e[r+t.t+1]=1)}e.t>0&&(e[e.t-1]+=t.am(r,t[r],e,2*r,0,1)),e.s=0,e.clamp()},BigInteger.prototype.divRemTo=function bnpDivRemTo(e,t,r){var n=e.abs();if(!(n.t<=0)){var i=this.abs();if(i.t<n.t)return null!=t&&t.fromInt(0),void(null!=r&&this.copyTo(r));null==r&&(r=nbi());var o=nbi(),s=this.s,a=e.s,u=this.DB-nbits(n[n.t-1]);u>0?(n.lShiftTo(u,o),i.lShiftTo(u,r)):(n.copyTo(o),i.copyTo(r));var c=o.t,h=o[c-1];if(0!=h){var f=h*(1<<this.F1)+(c>1?o[c-2]>>this.F2:0),l=this.FV/f,g=(1<<this.F1)/f,p=1<<this.F2,d=r.t,v=d-c,y=null==t?nbi():t;for(o.dlShiftTo(v,y),r.compareTo(y)>=0&&(r[r.t++]=1,r.subTo(y,r)),BigInteger.ONE.dlShiftTo(c,y),y.subTo(o,o);o.t<c;)o[o.t++]=0;for(;--v>=0;){var m=r[--d]==h?this.DM:Math.floor(r[d]*l+(r[d-1]+p)*g);if((r[d]+=o.am(0,m,r,v,0,c))<m)for(o.dlShiftTo(v,y),r.subTo(y,r);r[d]<--m;)r.subTo(y,r)}null!=t&&(r.drShiftTo(c,t),s!=a&&BigInteger.ZERO.subTo(t,t)),r.t=c,r.clamp(),u>0&&r.rShiftTo(u,r),s<0&&BigInteger.ZERO.subTo(r,r)}}},BigInteger.prototype.invDigit=function bnpInvDigit(){if(this.t<1)return 0;var e=this[0];if(0==(1&e))return 0;var t=3&e;return(t=(t=(t=(t=t*(2-(15&e)*t)&15)*(2-(255&e)*t)&255)*(2-((65535&e)*t&65535))&65535)*(2-e*t%this.DV)%this.DV)>0?this.DV-t:-t},BigInteger.prototype.isEven=function bnpIsEven(){return 0==(this.t>0?1&this[0]:this.s)},BigInteger.prototype.exp=function bnpExp(e,t){if(e>4294967295||e<1)return BigInteger.ONE;var r=nbi(),n=nbi(),i=t.convert(this),o=nbits(e)-1;for(i.copyTo(r);--o>=0;)if(t.sqrTo(r,n),(e&1<<o)>0)t.mulTo(n,i,r);else{var s=r;r=n,n=s}return t.revert(r)},BigInteger.prototype.toString=function bnToString(e){if(this.s<0)return"-"+this.negate().toString(e);var t;if(16==e)t=4;else if(8==e)t=3;else if(2==e)t=1;else if(32==e)t=5;else{if(4!=e)return this.toRadix(e);t=2}var r,n=(1<<t)-1,i=!1,o="",s=this.t,a=this.DB-s*this.DB%t;if(s-- >0)for(a<this.DB&&(r=this[s]>>a)>0&&(i=!0,o=int2char(r));s>=0;)a<t?(r=(this[s]&(1<<a)-1)<<t-a,r|=this[--s]>>(a+=this.DB-t)):(r=this[s]>>(a-=t)&n,a<=0&&(a+=this.DB,--s)),r>0&&(i=!0),i&&(o+=int2char(r));return i?o:"0"},BigInteger.prototype.negate=function bnNegate(){var e=nbi();return BigInteger.ZERO.subTo(this,e),e},BigInteger.prototype.abs=function bnAbs(){return this.s<0?this.negate():this},BigInteger.prototype.compareTo=function bnCompareTo(e){var t=this.s-e.s;if(0!=t)return t;var r=this.t;if(0!=(t=r-e.t))return this.s<0?-t:t;for(;--r>=0;)if(0!=(t=this[r]-e[r]))return t;return 0},BigInteger.prototype.bitLength=function bnBitLength(){return this.t<=0?0:this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)},BigInteger.prototype.mod=function bnMod(e){var t=nbi();return this.abs().divRemTo(e,null,t),this.s<0&&t.compareTo(BigInteger.ZERO)>0&&e.subTo(t,t),t},BigInteger.prototype.modPowInt=function bnModPowInt(e,t){var r;return r=e<256||t.isEven()?new Classic(t):new Montgomery(t),this.exp(e,r)},BigInteger.ZERO=nbv(0),BigInteger.ONE=nbv(1),NullExp.prototype.convert=nNop,NullExp.prototype.revert=nNop,NullExp.prototype.mulTo=function nMulTo(e,t,r){e.multiplyTo(t,r)},NullExp.prototype.sqrTo=function nSqrTo(e,t){e.squareTo(t)},Barrett.prototype.convert=function barrettConvert(e){if(e.s<0||e.t>2*this.m.t)return e.mod(this.m);if(e.compareTo(this.m)<0)return e;var t=nbi();return e.copyTo(t),this.reduce(t),t},Barrett.prototype.revert=function barrettRevert(e){return e},Barrett.prototype.reduce=function barrettReduce(e){for(e.drShiftTo(this.m.t-1,this.r2),e.t>this.m.t+1&&(e.t=this.m.t+1,e.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);e.compareTo(this.r2)<0;)e.dAddOffset(1,this.m.t+1);for(e.subTo(this.r2,e);e.compareTo(this.m)>=0;)e.subTo(this.m,e)},Barrett.prototype.mulTo=function barrettMulTo(e,t,r){e.multiplyTo(t,r),this.reduce(r)},Barrett.prototype.sqrTo=function barrettSqrTo(e,t){e.squareTo(t),this.reduce(t)};var I=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],R=(1<<26)/I[I.length-1];
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function Arcfour(){this.i=0,this.j=0,this.S=new Array}BigInteger.prototype.chunkSize=function bnpChunkSize(e){return Math.floor(Math.LN2*this.DB/Math.log(e))},BigInteger.prototype.toRadix=function bnpToRadix(e){if(null==e&&(e=10),0==this.signum()||e<2||e>36)return"0";var t=this.chunkSize(e),r=Math.pow(e,t),n=nbv(r),i=nbi(),o=nbi(),s="";for(this.divRemTo(n,i,o);i.signum()>0;)s=(r+o.intValue()).toString(e).substr(1)+s,i.divRemTo(n,i,o);return o.intValue().toString(e)+s},BigInteger.prototype.fromRadix=function bnpFromRadix(e,t){this.fromInt(0),null==t&&(t=10);for(var r=this.chunkSize(t),n=Math.pow(t,r),i=!1,o=0,s=0,a=0;a<e.length;++a){var u=intAt(e,a);u<0?"-"==e.charAt(a)&&0==this.signum()&&(i=!0):(s=t*s+u,++o>=r&&(this.dMultiply(n),this.dAddOffset(s,0),o=0,s=0))}o>0&&(this.dMultiply(Math.pow(t,o)),this.dAddOffset(s,0)),i&&BigInteger.ZERO.subTo(this,this)},BigInteger.prototype.fromNumber=function bnpFromNumber(e,t,r){if("number"==typeof t)if(e<2)this.fromInt(1);else for(this.fromNumber(e,r),this.testBit(e-1)||this.bitwiseTo(BigInteger.ONE.shiftLeft(e-1),op_or,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(t);)this.dAddOffset(2,0),this.bitLength()>e&&this.subTo(BigInteger.ONE.shiftLeft(e-1),this);else{var n=new Array,i=7&e;n.length=1+(e>>3),t.nextBytes(n),i>0?n[0]&=(1<<i)-1:n[0]=0,this.fromString(n,256)}},BigInteger.prototype.bitwiseTo=function bnpBitwiseTo(e,t,r){var n,i,o=Math.min(e.t,this.t);for(n=0;n<o;++n)r[n]=t(this[n],e[n]);if(e.t<this.t){for(i=e.s&this.DM,n=o;n<this.t;++n)r[n]=t(this[n],i);r.t=this.t}else{for(i=this.s&this.DM,n=o;n<e.t;++n)r[n]=t(i,e[n]);r.t=e.t}r.s=t(this.s,e.s),r.clamp()},BigInteger.prototype.changeBit=function bnpChangeBit(e,t){var r=BigInteger.ONE.shiftLeft(e);return this.bitwiseTo(r,t,r),r},BigInteger.prototype.addTo=function bnpAddTo(e,t){for(var r=0,n=0,i=Math.min(e.t,this.t);r<i;)n+=this[r]+e[r],t[r++]=n&this.DM,n>>=this.DB;if(e.t<this.t){for(n+=e.s;r<this.t;)n+=this[r],t[r++]=n&this.DM,n>>=this.DB;n+=this.s}else{for(n+=this.s;r<e.t;)n+=e[r],t[r++]=n&this.DM,n>>=this.DB;n+=e.s}t.s=n<0?-1:0,n>0?t[r++]=n:n<-1&&(t[r++]=this.DV+n),t.t=r,t.clamp()},BigInteger.prototype.dMultiply=function bnpDMultiply(e){this[this.t]=this.am(0,e-1,this,0,0,this.t),++this.t,this.clamp()},BigInteger.prototype.dAddOffset=function bnpDAddOffset(e,t){if(0!=e){for(;this.t<=t;)this[this.t++]=0;for(this[t]+=e;this[t]>=this.DV;)this[t]-=this.DV,++t>=this.t&&(this[this.t++]=0),++this[t]}},BigInteger.prototype.multiplyLowerTo=function bnpMultiplyLowerTo(e,t,r){var n,i=Math.min(this.t+e.t,t);for(r.s=0,r.t=i;i>0;)r[--i]=0;for(n=r.t-this.t;i<n;++i)r[i+this.t]=this.am(0,e[i],r,i,0,this.t);for(n=Math.min(e.t,t);i<n;++i)this.am(0,e[i],r,i,0,t-i);r.clamp()},BigInteger.prototype.multiplyUpperTo=function bnpMultiplyUpperTo(e,t,r){--t;var n=r.t=this.t+e.t-t;for(r.s=0;--n>=0;)r[n]=0;for(n=Math.max(t-this.t,0);n<e.t;++n)r[this.t+n-t]=this.am(t-n,e[n],r,0,0,this.t+n-t);r.clamp(),r.drShiftTo(1,r)},BigInteger.prototype.modInt=function bnpModInt(e){if(e<=0)return 0;var t=this.DV%e,r=this.s<0?e-1:0;if(this.t>0)if(0==t)r=this[0]%e;else for(var n=this.t-1;n>=0;--n)r=(t*r+this[n])%e;return r},BigInteger.prototype.millerRabin=function bnpMillerRabin(e){var t=this.subtract(BigInteger.ONE),r=t.getLowestSetBit();if(r<=0)return!1;var n=t.shiftRight(r);(e=e+1>>1)>I.length&&(e=I.length);for(var i=nbi(),o=0;o<e;++o){i.fromInt(I[Math.floor(Math.random()*I.length)]);var s=i.modPow(n,this);if(0!=s.compareTo(BigInteger.ONE)&&0!=s.compareTo(t)){for(var a=1;a++<r&&0!=s.compareTo(t);)if(0==(s=s.modPowInt(2,this)).compareTo(BigInteger.ONE))return!1;if(0!=s.compareTo(t))return!1}}return!0},BigInteger.prototype.clone=
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function bnClone(){var e=nbi();return this.copyTo(e),e},BigInteger.prototype.intValue=function bnIntValue(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},BigInteger.prototype.byteValue=function bnByteValue(){return 0==this.t?this.s:this[0]<<24>>24},BigInteger.prototype.shortValue=function bnShortValue(){return 0==this.t?this.s:this[0]<<16>>16},BigInteger.prototype.signum=function bnSigNum(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},BigInteger.prototype.toByteArray=function bnToByteArray(){var e=this.t,t=new Array;t[0]=this.s;var r,n=this.DB-e*this.DB%8,i=0;if(e-- >0)for(n<this.DB&&(r=this[e]>>n)!=(this.s&this.DM)>>n&&(t[i++]=r|this.s<<this.DB-n);e>=0;)n<8?(r=(this[e]&(1<<n)-1)<<8-n,r|=this[--e]>>(n+=this.DB-8)):(r=this[e]>>(n-=8)&255,n<=0&&(n+=this.DB,--e)),0!=(128&r)&&(r|=-256),0==i&&(128&this.s)!=(128&r)&&++i,(i>0||r!=this.s)&&(t[i++]=r);return t},BigInteger.prototype.equals=function bnEquals(e){return 0==this.compareTo(e)},BigInteger.prototype.min=function bnMin(e){return this.compareTo(e)<0?this:e},BigInteger.prototype.max=function bnMax(e){return this.compareTo(e)>0?this:e},BigInteger.prototype.and=function bnAnd(e){var t=nbi();return this.bitwiseTo(e,op_and,t),t},BigInteger.prototype.or=function bnOr(e){var t=nbi();return this.bitwiseTo(e,op_or,t),t},BigInteger.prototype.xor=function bnXor(e){var t=nbi();return this.bitwiseTo(e,op_xor,t),t},BigInteger.prototype.andNot=function bnAndNot(e){var t=nbi();return this.bitwiseTo(e,op_andnot,t),t},BigInteger.prototype.not=function bnNot(){for(var e=nbi(),t=0;t<this.t;++t)e[t]=this.DM&~this[t];return e.t=this.t,e.s=~this.s,e},BigInteger.prototype.shiftLeft=function bnShiftLeft(e){var t=nbi();return e<0?this.rShiftTo(-e,t):this.lShiftTo(e,t),t},BigInteger.prototype.shiftRight=function bnShiftRight(e){var t=nbi();return e<0?this.lShiftTo(-e,t):this.rShiftTo(e,t),t},BigInteger.prototype.getLowestSetBit=function bnGetLowestSetBit(){for(var e=0;e<this.t;++e)if(0!=this[e])return e*this.DB+lbit(this[e]);return this.s<0?this.t*this.DB:-1},BigInteger.prototype.bitCount=function bnBitCount(){for(var e=0,t=this.s&this.DM,r=0;r<this.t;++r)e+=cbit(this[r]^t);return e},BigInteger.prototype.testBit=function bnTestBit(e){var t=Math.floor(e/this.DB);return t>=this.t?0!=this.s:0!=(this[t]&1<<e%this.DB)},BigInteger.prototype.setBit=function bnSetBit(e){return this.changeBit(e,op_or)},BigInteger.prototype.clearBit=function bnClearBit(e){return this.changeBit(e,op_andnot)},BigInteger.prototype.flipBit=function bnFlipBit(e){return this.changeBit(e,op_xor)},BigInteger.prototype.add=function bnAdd(e){var t=nbi();return this.addTo(e,t),t},BigInteger.prototype.subtract=function bnSubtract(e){var t=nbi();return this.subTo(e,t),t},BigInteger.prototype.multiply=function bnMultiply(e){var t=nbi();return this.multiplyTo(e,t),t},BigInteger.prototype.divide=function bnDivide(e){var t=nbi();return this.divRemTo(e,t,null),t},BigInteger.prototype.remainder=function bnRemainder(e){var t=nbi();return this.divRemTo(e,null,t),t},BigInteger.prototype.divideAndRemainder=function bnDivideAndRemainder(e){var t=nbi(),r=nbi();return this.divRemTo(e,t,r),new Array(t,r)},BigInteger.prototype.modPow=function bnModPow(e,t){var r,n,i=e.bitLength(),o=nbv(1);if(i<=0)return o;r=i<18?1:i<48?3:i<144?4:i<768?5:6,n=i<8?new Classic(t):t.isEven()?new Barrett(t):new Montgomery(t);var s=new Array,a=3,u=r-1,c=(1<<r)-1;if(s[1]=n.convert(this),r>1){var h=nbi();for(n.sqrTo(s[1],h);a<=c;)s[a]=nbi(),n.mulTo(h,s[a-2],s[a]),a+=2}var f,l,g=e.t-1,p=!0,d=nbi();for(i=nbits(e[g])-1;g>=0;){for(i>=u?f=e[g]>>i-u&c:(f=(e[g]&(1<<i+1)-1)<<u-i,g>0&&(f|=e[g-1]>>this.DB+i-u)),a=r;0==(1&f);)f>>=1,--a;if((i-=a)<0&&(i+=this.DB,--g),p)s[f].copyTo(o),p=!1;else{for(;a>1;)n.sqrTo(o,d),n.sqrTo(d,o),a-=2;a>0?n.sqrTo(o,d):(l=o,o=d,d=l),n.mulTo(d,s[f],o)}for(;g>=0&&0==(e[g]&1<<i);)n.sqrTo(o,d),l=o,o=d,d=l,--i<0&&(i=this.DB-1,--g)}return n.revert(o)},BigInteger.prototype.modInverse=function bnModInverse(e){var t=e.isEven();if(this.isEven()&&t||0==e.signum())return BigInteger.ZERO;for(var r=e.clone(),n=this.clone(),i=nbv(1),o=nbv(0),s=nbv(0),a=nbv(1);0!=r.signum();){for(;r.isEven();)r.rShiftTo(1,r),t?(i.isEven()&&o.isEven()||(i.addTo(this,i),o.subTo(e,o)),i.rShiftTo(1,i)):o.isEven()||o.subTo(e,o),o.rShiftTo(1,o);for(;n.isEven();)n.rShiftTo(1,n),t?(s.isEven()&&a.isEven()||(s.addTo(this,s),a.subTo(e,a)),s.rShiftTo(1,s)):a.isEven()||a.subTo(e,a),a.rShiftTo(1,a);r.compareTo(n)>=0?(r.subTo(n,r),t&&i.subTo(s,i),o.subTo(a,o)):(n.subTo(r,n),t&&s.subTo(i,s),a.subTo(o,a))}return 0!=n.compareTo(BigInteger.ONE)?BigInteger.ZERO:a.compareTo(e)>=0?a.subtract(e):a.signum()<0?(a.addTo(e,a),a.signum()<0?a.add(e):a):a},BigInteger.prototype.pow=function bnPow(e){return this.exp(e,new NullExp)},BigInteger.prototype.gcd=function bnGCD(e){var t=this.s<0?this.negate():this.clone(),r=e.s<0?e.negate():e.clone();if(t.compareTo(r)<0){var n=t;t=r,r=n}var i=t.getLowestSetBit(),o=r.getLowestSetBit();if(o<0)return t;for(i<o&&(o=i),o>0&&(t.rShiftTo(o,t),r.rShiftTo(o,r));t.signum()>0;)(i=t.getLowestSetBit())>0&&t.rShiftTo(i,t),(i=r.getLowestSetBit())>0&&r.rShiftTo(i,r),t.compareTo(r)>=0?(t.subTo(r,t),t.rShiftTo(1,t)):(r.subTo(t,r),r.rShiftTo(1,r));return o>0&&r.lShiftTo(o,r),r},BigInteger.prototype.isProbablePrime=function bnIsProbablePrime(e){var t,r=this.abs();if(1==r.t&&r[0]<=I[I.length-1]){for(t=0;t<I.length;++t)if(r[0]==I[t])return!0;return!1}if(r.isEven())return!1;for(t=1;t<I.length;){for(var n=I[t],i=t+1;i<I.length&&n<R;)n*=I[i++];for(n=r.modInt(n);t<i;)if(n%I[t++]==0)return!1}return r.millerRabin(e)},BigInteger.prototype.square=function bnSquare(){var e=nbi();return this.squareTo(e),e},Arcfour.prototype.init=function ARC4init(e){var t,r,n;for(t=0;t<256;++t)this.S[t]=t;for(r=0,t=0;t<256;++t)r=r+this.S[t]+e[t%e.length]&255,n=this.S[t],this.S[t]=this.S[r],this.S[r]=n;this.i=0,this.j=0},Arcfour.prototype.next=function ARC4next(){var e;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,e=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=e,this.S[e+this.S[this.i]&255]};var T,U,M,L=256;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */function rng_seed_time(){!function rng_seed_int(e){U[M++]^=255&e,U[M++]^=e>>8&255,U[M++]^=e>>16&255,U[M++]^=e>>24&255,M>=L&&(M-=L)}((new Date).getTime())}if(null==U){var D;if(U=new Array,M=0,void 0!==p&&(void 0!==p.crypto||void 0!==p.msCrypto)){var N=p.crypto||p.msCrypto;if(N.getRandomValues){var O=new Uint8Array(32);for(N.getRandomValues(O),D=0;D<32;++D)U[M++]=O[D]}else if("Netscape"==u.appName&&u.appVersion<"5"){var H=p.crypto.random(32);for(D=0;D<H.length;++D)U[M++]=255&H.charCodeAt(D)}}for(;M<L;)D=Math.floor(65536*Math.random()),U[M++]=D>>>8,U[M++]=255&D;M=0,rng_seed_time()}function rng_get_byte(){if(null==T){for(rng_seed_time(),(T=function prng_newstate(){return new Arcfour}()).init(U),M=0;M<U.length;++M)U[M]=0;M=0}return T.next()}function SecureRandom(){}
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function parseBigInt(e,t){return new BigInteger(e,t)}function oaep_mgf1_arr(e,t,r){for(var n="",i=0;n.length<t;)n+=r(String.fromCharCode.apply(String,e.concat([(4278190080&i)>>24,(16711680&i)>>16,(65280&i)>>8,255&i]))),i+=1;return n}function RSAKey(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function ECFieldElementFp(e,t){this.x=t,this.q=e}function ECPointFp(e,t,r,n){this.curve=e,this.x=t,this.y=r,this.z=null==n?BigInteger.ONE:n,this.zinv=null}function ECCurveFp(e,t,r){this.q=e,this.a=this.fromBigInteger(t),this.b=this.fromBigInteger(r),this.infinity=new ECPointFp(this,null,null)}SecureRandom.prototype.nextBytes=function rng_get_bytes(e){var t;for(t=0;t<e.length;++t)e[t]=rng_get_byte()},RSAKey.prototype.doPublic=function RSADoPublic(e){return e.modPowInt(this.e,this.n)},RSAKey.prototype.setPublic=function RSASetPublic(e,t){if(this.isPublic=!0,this.isPrivate=!1,"string"!=typeof e)this.n=e,this.e=t;else{if(!(null!=e&&null!=t&&e.length>0&&t.length>0))throw"Invalid RSA public key";this.n=parseBigInt(e,16),this.e=parseInt(t,16)}},RSAKey.prototype.encrypt=function RSAEncrypt(e){var t=function pkcs1pad2(e,t){if(t<e.length+11)throw"Message too long for RSA";for(var r=new Array,n=e.length-1;n>=0&&t>0;){var i=e.charCodeAt(n--);i<128?r[--t]=i:i>127&&i<2048?(r[--t]=63&i|128,r[--t]=i>>6|192):(r[--t]=63&i|128,r[--t]=i>>6&63|128,r[--t]=i>>12|224)}r[--t]=0;for(var o=new SecureRandom,s=new Array;t>2;){for(s[0]=0;0==s[0];)o.nextBytes(s);r[--t]=s[0]}return r[--t]=2,r[--t]=0,new BigInteger(r)}(e,this.n.bitLength()+7>>3);if(null==t)return null;var r=this.doPublic(t);if(null==r)return null;var n=r.toString(16);return 0==(1&n.length)?n:"0"+n},RSAKey.prototype.encryptOAEP=function RSAEncryptOAEP(e,t,r){var n=function oaep_pad(e,t,r,n){var i=K.crypto.MessageDigest,o=K.crypto.Util,s=null;if(r||(r="sha1"),"string"==typeof r&&(s=i.getCanonicalAlgName(r),n=i.getHashLength(s),r=function f(e){return hextorstr(o.hashHex(rstrtohex(e),s))}),e.length+2*n+2>t)throw"Message too long for RSA";var a,u="";for(a=0;a<t-e.length-2*n-2;a+=1)u+="\0";var c=r("")+u+""+e,h=new Array(n);(new SecureRandom).nextBytes(h);var l=oaep_mgf1_arr(h,c.length,r),g=[];for(a=0;a<c.length;a+=1)g[a]=c.charCodeAt(a)^l.charCodeAt(a);var p=oaep_mgf1_arr(g,h.length,r),d=[0];for(a=0;a<h.length;a+=1)d[a+1]=h[a]^p.charCodeAt(a);return new BigInteger(d.concat(g))}(e,this.n.bitLength()+7>>3,t,r);if(null==n)return null;var i=this.doPublic(n);if(null==i)return null;var o=i.toString(16);return 0==(1&o.length)?o:"0"+o},RSAKey.prototype.type="RSA",ECFieldElementFp.prototype.equals=function feFpEquals(e){return e==this||this.q.equals(e.q)&&this.x.equals(e.x)},ECFieldElementFp.prototype.toBigInteger=function feFpToBigInteger(){return this.x},ECFieldElementFp.prototype.negate=function feFpNegate(){return new ECFieldElementFp(this.q,this.x.negate().mod(this.q))},ECFieldElementFp.prototype.add=function feFpAdd(e){return new ECFieldElementFp(this.q,this.x.add(e.toBigInteger()).mod(this.q))},ECFieldElementFp.prototype.subtract=function feFpSubtract(e){return new ECFieldElementFp(this.q,this.x.subtract(e.toBigInteger()).mod(this.q))},ECFieldElementFp.prototype.multiply=function feFpMultiply(e){return new ECFieldElementFp(this.q,this.x.multiply(e.toBigInteger()).mod(this.q))},ECFieldElementFp.prototype.square=function feFpSquare(){return new ECFieldElementFp(this.q,this.x.square().mod(this.q))},ECFieldElementFp.prototype.divide=function feFpDivide(e){return new ECFieldElementFp(this.q,this.x.multiply(e.toBigInteger().modInverse(this.q)).mod(this.q))},ECPointFp.prototype.getX=function pointFpGetX(){return null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q)),this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))},ECPointFp.prototype.getY=function pointFpGetY(){return null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q)),this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))},ECPointFp.prototype.equals=function pointFpEquals(e){return e==this||(this.isInfinity()?e.isInfinity():e.isInfinity()?this.isInfinity():!!e.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(e.z)).mod(this.curve.q).equals(BigInteger.ZERO)&&e.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(e.z)).mod(this.curve.q).equals(BigInteger.ZERO))},ECPointFp.prototype.isInfinity=function pointFpIsInfinity(){return null==this.x&&null==this.y||this.z.equals(BigInteger.ZERO)&&!this.y.toBigInteger().equals(BigInteger.ZERO)},ECPointFp.prototype.negate=function pointFpNegate(){return new ECPointFp(this.curve,this.x,this.y.negate(),this.z)},ECPointFp.prototype.add=function pointFpAdd(e){if(this.isInfinity())return e;if(e.isInfinity())return this;var t=e.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(e.z)).mod(this.curve.q),r=e.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(e.z)).mod(this.curve.q);if(BigInteger.ZERO.equals(r))return BigInteger.ZERO.equals(t)?this.twice():this.curve.getInfinity();var n=new BigInteger("3"),i=this.x.toBigInteger(),o=this.y.toBigInteger(),s=(e.x.toBigInteger(),e.y.toBigInteger(),r.square()),a=s.multiply(r),u=i.multiply(s),c=t.square().multiply(this.z),h=c.subtract(u.shiftLeft(1)).multiply(e.z).subtract(a).multiply(r).mod(this.curve.q),f=u.multiply(n).multiply(t).subtract(o.multiply(a)).subtract(c.multiply(t)).multiply(e.z).add(t.multiply(a)).mod(this.curve.q),l=a.multiply(this.z).multiply(e.z).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(h),this.curve.fromBigInteger(f),l)},ECPointFp.prototype.twice=function pointFpTwice(){if(this.isInfinity())return this;if(0==this.y.toBigInteger().signum())return this.curve.getInfinity();var e=new BigInteger("3"),t=this.x.toBigInteger(),r=this.y.toBigInteger(),n=r.multiply(this.z),i=n.multiply(r).mod(this.curve.q),o=this.curve.a.toBigInteger(),s=t.square().multiply(e);BigInteger.ZERO.equals(o)||(s=s.add(this.z.square().multiply(o)));var a=(s=s.mod(this.curve.q)).square().subtract(t.shiftLeft(3).multiply(i)).shiftLeft(1).multiply(n).mod(this.curve.q),u=s.multiply(e).multiply(t).subtract(i.shiftLeft(1)).shiftLeft(2).multiply(i).subtract(s.square().multiply(s)).mod(this.curve.q),c=n.square().multiply(n).shiftLeft(3).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(a),this.curve.fromBigInteger(u),c)},ECPointFp.prototype.multiply=function pointFpMultiply(e){if(this.isInfinity())return this;if(0==e.signum())return this.curve.getInfinity();var t,r=e,n=r.multiply(new BigInteger("3")),i=this.negate(),o=this;for(t=n.bitLength()-2;t>0;--t){o=o.twice();var s=n.testBit(t);s!=r.testBit(t)&&(o=o.add(s?this:i))}return o},ECPointFp.prototype.multiplyTwo=function pointFpMultiplyTwo(e,t,r){var n;n=e.bitLength()>r.bitLength()?e.bitLength()-1:r.bitLength()-1;for(var i=this.curve.getInfinity(),o=this.add(t);n>=0;)i=i.twice(),e.testBit(n)?i=r.testBit(n)?i.add(o):i.add(this):r.testBit(n)&&(i=i.add(t)),--n;return i},ECCurveFp.prototype.getQ=function curveFpGetQ(){return this.q},ECCurveFp.prototype.getA=function curveFpGetA(){return this.a},ECCurveFp.prototype.getB=function curveFpGetB(){return this.b},ECCurveFp.prototype.equals=function curveFpEquals(e){return e==this||this.q.equals(e.q)&&this.a.equals(e.a)&&this.b.equals(e.b)},ECCurveFp.prototype.getInfinity=function curveFpGetInfinity(){return this.infinity},ECCurveFp.prototype.fromBigInteger=function curveFpFromBigInteger(e){return new ECFieldElementFp(this.q,e)},ECCurveFp.prototype.decodePointHex=function curveFpDecodePointHex(e){switch(parseInt(e.substr(0,2),16)){case 0:return this.infinity;case 2:case 3:return null;case 4:case 6:case 7:var t=(e.length-2)/2,r=e.substr(2,t),n=e.substr(t+2,t);return new ECPointFp(this,this.fromBigInteger(new BigInteger(r,16)),this.fromBigInteger(new BigInteger(n,16)));default:return null}};
/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
 */
var K,q,W,V=function(){var e=new RegExp('(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:"(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*"))',"g"),t=new RegExp("\\\\(?:([^u])|u(.{4}))","g"),r={'"':'"',"/":"/","\\":"\\",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"};function h(e,t,n){return t?r[t]:String.fromCharCode(parseInt(n,16))}var n=new String(""),o=(Object,Array,Object.hasOwnProperty);return function(r,a){var u,c,f=r.match(e),l=f[0],g=!1;"{"===l?u={}:"["===l?u=[]:(u=[],g=!0);for(var p=[u],d=1-g,v=f.length;d<v;++d){var y;switch((l=f[d]).charCodeAt(0)){default:(y=p[0])[c||y.length]=+l,c=void 0;break;case 34:if(-1!==(l=l.substring(1,l.length-1)).indexOf("\\")&&(l=l.replace(t,h)),y=p[0],!c){if(!(y instanceof Array)){c=l||n;break}c=y.length}y[c]=l,c=void 0;break;case 91:y=p[0],p.unshift(y[c||y.length]=[]),c=void 0;break;case 93:p.shift();break;case 102:(y=p[0])[c||y.length]=!1,c=void 0;break;case 110:(y=p[0])[c||y.length]=null,c=void 0;break;case 116:(y=p[0])[c||y.length]=!0,c=void 0;break;case 123:y=p[0],p.unshift(y[c||y.length]={}),c=void 0;break;case 125:p.shift()}}if(g){if(1!==p.length)throw new Error;u=u[0]}else if(p.length)throw new Error;if(a){u=function s(e,t){var r=e[t];if(r&&"object"===(void 0===r?"undefined":i(r))){var n=null;for(var u in r)if(o.call(r,u)&&r!==e){var c=s(r,u);void 0!==c?r[u]=c:(n||(n=[]),n.push(u))}if(n)for(var h=n.length;--h>=0;)delete r[n[h]]}return a.call(e,t,r)}({"":u},"")}return u}}(),J=new function(){};function stoBA(e){for(var t=new Array,r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}function BAtos(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t}function BAtohex(e){for(var t="",r=0;r<e.length;r++){var n=e[r].toString(16);1==n.length&&(n="0"+n),t+=n}return t}function stohex(e){return BAtohex(stoBA(e))}function b64tob64u(e){return e=(e=(e=e.replace(/\=/g,"")).replace(/\+/g,"-")).replace(/\//g,"_")}function b64utob64(e){return e.length%4==2?e+="==":e.length%4==3&&(e+="="),e=(e=e.replace(/-/g,"+")).replace(/_/g,"/")}function hextob64u(e){return e.length%2==1&&(e="0"+e),b64tob64u(hex2b64(e))}function b64utohex(e){return b64tohex(b64utob64(e))}function utf8tohex(e){return uricmptohex(encodeURIComponentAll(e))}function hextoutf8(e){return decodeURIComponent(hextouricmp(e))}function hextorstr(e){for(var t="",r=0;r<e.length-1;r+=2)t+=String.fromCharCode(parseInt(e.substr(r,2),16));return t}function rstrtohex(e){for(var t="",r=0;r<e.length;r++)t+=("0"+e.charCodeAt(r).toString(16)).slice(-2);return t}function hextob64(e){return hex2b64(e)}function hextob64nl(e){var t=hextob64(e).replace(/(.{64})/g,"$1\r\n");return t=t.replace(/\r\n$/,"")}function b64nltohex(e){return b64tohex(e.replace(/[^0-9A-Za-z\/+=]*/g,""))}function hextopem(e,t){return"-----BEGIN "+t+"-----\r\n"+hextob64nl(e)+"\r\n-----END "+t+"-----\r\n"}function pemtohex(e,t){if(-1==e.indexOf("-----BEGIN "))throw"can't find PEM header: "+t;return b64nltohex(e=void 0!==t?(e=e.replace("-----BEGIN "+t+"-----","")).replace("-----END "+t+"-----",""):(e=e.replace(/-----BEGIN [^-]+-----/,"")).replace(/-----END [^-]+-----/,""))}function zulutomsec(e){var t,r,n,i,o,s,a,u,c,h,f;if(f=e.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/))return u=f[1],t=parseInt(u),2===u.length&&(50<=t&&t<100?t=1900+t:0<=t&&t<50&&(t=2e3+t)),r=parseInt(f[2])-1,n=parseInt(f[3]),i=parseInt(f[4]),o=parseInt(f[5]),s=parseInt(f[6]),a=0,""!==(c=f[7])&&(h=(c.substr(1)+"00").substr(0,3),a=parseInt(h)),Date.UTC(t,r,n,i,o,s,a);throw"unsupported zulu format: "+e}function zulutosec(e){return~~(zulutomsec(e)/1e3)}function uricmptohex(e){return e.replace(/%/g,"")}function hextouricmp(e){return e.replace(/(..)/g,"%$1")}function ipv6tohex(e){var t="malformed IPv6 address";if(!e.match(/^[0-9A-Fa-f:]+$/))throw t;var r=(e=e.toLowerCase()).split(":").length-1;if(r<2)throw t;var n=":".repeat(7-r+2),i=(e=e.replace("::",n)).split(":");if(8!=i.length)throw t;for(var o=0;o<8;o++)i[o]=("0000"+i[o]).slice(-4);return i.join("")}function hextoipv6(e){if(!e.match(/^[0-9A-Fa-f]{32}$/))throw"malformed IPv6 address octet";for(var t=(e=e.toLowerCase()).match(/.{1,4}/g),r=0;r<8;r++)t[r]=t[r].replace(/^0+/,""),""==t[r]&&(t[r]="0");var n=(e=":"+t.join(":")+":").match(/:(0:){2,}/g);if(null===n)return e.slice(1,-1);var i="";for(r=0;r<n.length;r++)n[r].length>i.length&&(i=n[r]);return(e=e.replace(i,"::")).slice(1,-1)}function hextoip(e){var t="malformed hex value";if(!e.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/))throw t;if(8!=e.length)return 32==e.length?hextoipv6(e):e;try{return parseInt(e.substr(0,2),16)+"."+parseInt(e.substr(2,2),16)+"."+parseInt(e.substr(4,2),16)+"."+parseInt(e.substr(6,2),16)}catch(e){throw t}}function encodeURIComponentAll(e){for(var t=encodeURIComponent(e),r="",n=0;n<t.length;n++)"%"==t[n]?(r+=t.substr(n,3),n+=2):r=r+"%"+stohex(t[n]);return r}function hextoposhex(e){return e.length%2==1?"0"+e:e.substr(0,1)>"7"?"00"+e:e}J.getLblen=function(e,t){if("8"!=e.substr(t+2,1))return 1;var r=parseInt(e.substr(t+3,1));return 0==r?-1:0<r&&r<10?r+1:-2},J.getL=function(e,t){var r=J.getLblen(e,t);return r<1?"":e.substr(t+2,2*r)},J.getVblen=function(e,t){var r;return""==(r=J.getL(e,t))?-1:("8"===r.substr(0,1)?new BigInteger(r.substr(2),16):new BigInteger(r,16)).intValue()},J.getVidx=function(e,t){var r=J.getLblen(e,t);return r<0?r:t+2*(r+1)},J.getV=function(e,t){var r=J.getVidx(e,t),n=J.getVblen(e,t);return e.substr(r,2*n)},J.getTLV=function(e,t){return e.substr(t,2)+J.getL(e,t)+J.getV(e,t)},J.getNextSiblingIdx=function(e,t){return J.getVidx(e,t)+2*J.getVblen(e,t)},J.getChildIdx=function(e,t){var r=J,n=new Array,i=r.getVidx(e,t);"03"==e.substr(t,2)?n.push(i+2):n.push(i);for(var o=r.getVblen(e,t),s=i,a=0;;){var u=r.getNextSiblingIdx(e,s);if(null==u||u-i>=2*o)break;if(a>=200)break;n.push(u),s=u,a++}return n},J.getNthChildIdx=function(e,t,r){return J.getChildIdx(e,t)[r]},J.getIdxbyList=function(e,t,r,n){var i,o,s=J;if(0==r.length){if(void 0!==n&&e.substr(t,2)!==n)throw"checking tag doesn't match: "+e.substr(t,2)+"!="+n;return t}return i=r.shift(),o=s.getChildIdx(e,t),s.getIdxbyList(e,o[i],r,n)},J.getTLVbyList=function(e,t,r,n){var i=J,o=i.getIdxbyList(e,t,r);if(void 0===o)throw"can't find nthList object";if(void 0!==n&&e.substr(o,2)!=n)throw"checking tag doesn't match: "+e.substr(o,2)+"!="+n;return i.getTLV(e,o)},J.getVbyList=function(e,t,r,n,i){var o,s,a=J;if(void 0===(o=a.getIdxbyList(e,t,r,n)))throw"can't find nthList object";return s=a.getV(e,o),!0===i&&(s=s.substr(2)),s},J.hextooidstr=function(e){var t=function h(e,t){return e.length>=t?e:new Array(t-e.length+1).join("0")+e},r=[],n=e.substr(0,2),i=parseInt(n,16);r[0]=new String(Math.floor(i/40)),r[1]=new String(i%40);for(var o=e.substr(2),s=[],a=0;a<o.length/2;a++)s.push(parseInt(o.substr(2*a,2),16));var u=[],c="";for(a=0;a<s.length;a++)128&s[a]?c+=t((127&s[a]).toString(2),7):(c+=t((127&s[a]).toString(2),7),u.push(new String(parseInt(c,2))),c="");var h=r.join(".");return u.length>0&&(h=h+"."+u.join(".")),h},J.dump=function(e,t,r,n){var i=J,o=i.getV,s=i.dump,a=i.getChildIdx,u=e;e instanceof K.asn1.ASN1Object&&(u=e.getEncodedHex());var c=function q(e,t){return e.length<=2*t?e:e.substr(0,t)+"..(total "+e.length/2+"bytes).."+e.substr(e.length-t,t)};void 0===t&&(t={ommit_long_octet:32}),void 0===r&&(r=0),void 0===n&&(n="");var h=t.ommit_long_octet;if("01"==u.substr(r,2))return"00"==(f=o(u,r))?n+"BOOLEAN FALSE\n":n+"BOOLEAN TRUE\n";if("02"==u.substr(r,2))return n+"INTEGER "+c(f=o(u,r),h)+"\n";if("03"==u.substr(r,2))return n+"BITSTRING "+c(f=o(u,r),h)+"\n";if("04"==u.substr(r,2)){var f=o(u,r);if(i.isASN1HEX(f)){var l=n+"OCTETSTRING, encapsulates\n";return l+=s(f,t,0,n+"  ")}return n+"OCTETSTRING "+c(f,h)+"\n"}if("05"==u.substr(r,2))return n+"NULL\n";if("06"==u.substr(r,2)){var g=o(u,r),p=K.asn1.ASN1Util.oidHexToInt(g),d=K.asn1.x509.OID.oid2name(p),v=p.replace(/\./g," ");return""!=d?n+"ObjectIdentifier "+d+" ("+v+")\n":n+"ObjectIdentifier ("+v+")\n"}if("0c"==u.substr(r,2))return n+"UTF8String '"+hextoutf8(o(u,r))+"'\n";if("13"==u.substr(r,2))return n+"PrintableString '"+hextoutf8(o(u,r))+"'\n";if("14"==u.substr(r,2))return n+"TeletexString '"+hextoutf8(o(u,r))+"'\n";if("16"==u.substr(r,2))return n+"IA5String '"+hextoutf8(o(u,r))+"'\n";if("17"==u.substr(r,2))return n+"UTCTime "+hextoutf8(o(u,r))+"\n";if("18"==u.substr(r,2))return n+"GeneralizedTime "+hextoutf8(o(u,r))+"\n";if("30"==u.substr(r,2)){if("3000"==u.substr(r,4))return n+"SEQUENCE {}\n";l=n+"SEQUENCE\n";var y=t;if((2==(F=a(u,r)).length||3==F.length)&&"06"==u.substr(F[0],2)&&"04"==u.substr(F[F.length-1],2)){d=i.oidname(o(u,F[0]));var m=JSON.parse(JSON.stringify(t));m.x509ExtName=d,y=m}for(var S=0;S<F.length;S++)l+=s(u,y,F[S],n+"  ");return l}if("31"==u.substr(r,2)){l=n+"SET\n";var F=a(u,r);for(S=0;S<F.length;S++)l+=s(u,t,F[S],n+"  ");return l}var b=parseInt(u.substr(r,2),16);if(0!=(128&b)){var _=31&b;if(0!=(32&b)){var l=n+"["+_+"]\n";for(F=a(u,r),S=0;S<F.length;S++)l+=s(u,t,F[S],n+"  ");return l}return"68747470"==(f=o(u,r)).substr(0,8)&&(f=hextoutf8(f)),"subjectAltName"===t.x509ExtName&&2==_&&(f=hextoutf8(f)),l=n+"["+_+"] "+f+"\n"}return n+"UNKNOWN("+u.substr(r,2)+") "+o(u,r)+"\n"},J.isASN1HEX=function(e){var t=J;if(e.length%2==1)return!1;var r=t.getVblen(e,0),n=e.substr(0,2),i=t.getL(e,0);return e.length-n.length-i.length==2*r},J.oidname=function(e){var t=K.asn1;K.lang.String.isHex(e)&&(e=t.ASN1Util.oidHexToInt(e));var r=t.x509.OID.oid2name(e);return""===r&&(r=e),r},void 0!==K&&K||(K={}),void 0!==K.lang&&K.lang||(K.lang={}),K.lang.String=function(){},"function"==typeof n?(q=function utf8tob64u(e){return b64tob64u(new n(e,"utf8").toString("base64"))},W=function b64utoutf8(e){return new n(b64utob64(e),"base64").toString("utf8")}):(q=function utf8tob64u(e){return hextob64u(uricmptohex(encodeURIComponentAll(e)))},W=function b64utoutf8(e){return decodeURIComponent(hextouricmp(b64utohex(e)))}),K.lang.String.isInteger=function(e){return!!e.match(/^[0-9]+$/)||!!e.match(/^-[0-9]+$/)},K.lang.String.isHex=function(e){return!(e.length%2!=0||!e.match(/^[0-9a-f]+$/)&&!e.match(/^[0-9A-F]+$/))},K.lang.String.isBase64=function(e){return!(!(e=e.replace(/\s+/g,"")).match(/^[0-9A-Za-z+\/]+={0,3}$/)||e.length%4!=0)},K.lang.String.isBase64URL=function(e){return!e.match(/[+/=]/)&&(e=b64utob64(e),K.lang.String.isBase64(e))},K.lang.String.isIntegerArray=function(e){return!!(e=e.replace(/\s+/g,"")).match(/^\[[0-9,]+\]$/)};void 0!==K&&K||(K={}),void 0!==K.crypto&&K.crypto||(K.crypto={}),K.crypto.Util=new function(){this.DIGESTINFOHEAD={sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",ripemd160:"3021300906052b2403020105000414"},this.DEFAULTPROVIDER={md5:"cryptojs",sha1:"cryptojs",sha224:"cryptojs",sha256:"cryptojs",sha384:"cryptojs",sha512:"cryptojs",ripemd160:"cryptojs",hmacmd5:"cryptojs",hmacsha1:"cryptojs",hmacsha224:"cryptojs",hmacsha256:"cryptojs",hmacsha384:"cryptojs",hmacsha512:"cryptojs",hmacripemd160:"cryptojs",MD5withRSA:"cryptojs/jsrsa",SHA1withRSA:"cryptojs/jsrsa",SHA224withRSA:"cryptojs/jsrsa",SHA256withRSA:"cryptojs/jsrsa",SHA384withRSA:"cryptojs/jsrsa",SHA512withRSA:"cryptojs/jsrsa",RIPEMD160withRSA:"cryptojs/jsrsa",MD5withECDSA:"cryptojs/jsrsa",SHA1withECDSA:"cryptojs/jsrsa",SHA224withECDSA:"cryptojs/jsrsa",SHA256withECDSA:"cryptojs/jsrsa",SHA384withECDSA:"cryptojs/jsrsa",SHA512withECDSA:"cryptojs/jsrsa",RIPEMD160withECDSA:"cryptojs/jsrsa",SHA1withDSA:"cryptojs/jsrsa",SHA224withDSA:"cryptojs/jsrsa",SHA256withDSA:"cryptojs/jsrsa",MD5withRSAandMGF1:"cryptojs/jsrsa",SHA1withRSAandMGF1:"cryptojs/jsrsa",SHA224withRSAandMGF1:"cryptojs/jsrsa",SHA256withRSAandMGF1:"cryptojs/jsrsa",SHA384withRSAandMGF1:"cryptojs/jsrsa",SHA512withRSAandMGF1:"cryptojs/jsrsa",RIPEMD160withRSAandMGF1:"cryptojs/jsrsa"},this.CRYPTOJSMESSAGEDIGESTNAME={md5:y.algo.MD5,sha1:y.algo.SHA1,sha224:y.algo.SHA224,sha256:y.algo.SHA256,sha384:y.algo.SHA384,sha512:y.algo.SHA512,ripemd160:y.algo.RIPEMD160},this.getDigestInfoHex=function(e,t){if(void 0===this.DIGESTINFOHEAD[t])throw"alg not supported in Util.DIGESTINFOHEAD: "+t;return this.DIGESTINFOHEAD[t]+e},this.getPaddedDigestInfoHex=function(e,t,r){var n=this.getDigestInfoHex(e,t),i=r/4;if(n.length+22>i)throw"key is too short for SigAlg: keylen="+r+","+t;for(var o="0001",s="00"+n,a="",u=i-o.length-s.length,c=0;c<u;c+=2)a+="ff";return o+a+s},this.hashString=function(e,t){return new K.crypto.MessageDigest({alg:t}).digestString(e)},this.hashHex=function(e,t){return new K.crypto.MessageDigest({alg:t}).digestHex(e)},this.sha1=function(e){return new K.crypto.MessageDigest({alg:"sha1",prov:"cryptojs"}).digestString(e)},this.sha256=function(e){return new K.crypto.MessageDigest({alg:"sha256",prov:"cryptojs"}).digestString(e)},this.sha256Hex=function(e){return new K.crypto.MessageDigest({alg:"sha256",prov:"cryptojs"}).digestHex(e)},this.sha512=function(e){return new K.crypto.MessageDigest({alg:"sha512",prov:"cryptojs"}).digestString(e)},this.sha512Hex=function(e){return new K.crypto.MessageDigest({alg:"sha512",prov:"cryptojs"}).digestHex(e)}},K.crypto.Util.md5=function(e){return new K.crypto.MessageDigest({alg:"md5",prov:"cryptojs"}).digestString(e)},K.crypto.Util.ripemd160=function(e){return new K.crypto.MessageDigest({alg:"ripemd160",prov:"cryptojs"}).digestString(e)},K.crypto.Util.SECURERANDOMGEN=new SecureRandom,K.crypto.Util.getRandomHexOfNbytes=function(e){var t=new Array(e);return K.crypto.Util.SECURERANDOMGEN.nextBytes(t),BAtohex(t)},K.crypto.Util.getRandomBigIntegerOfNbytes=function(e){return new BigInteger(K.crypto.Util.getRandomHexOfNbytes(e),16)},K.crypto.Util.getRandomHexOfNbits=function(e){var t=e%8,r=new Array((e-t)/8+1);return K.crypto.Util.SECURERANDOMGEN.nextBytes(r),r[0]=(255<<t&255^255)&r[0],BAtohex(r)},K.crypto.Util.getRandomBigIntegerOfNbits=function(e){return new BigInteger(K.crypto.Util.getRandomHexOfNbits(e),16)},K.crypto.Util.getRandomBigIntegerZeroToMax=function(e){for(var t=e.bitLength();;){var r=K.crypto.Util.getRandomBigIntegerOfNbits(t);if(-1!=e.compareTo(r))return r}},K.crypto.Util.getRandomBigIntegerMinToMax=function(e,t){var r=e.compareTo(t);if(1==r)throw"biMin is greater than biMax";if(0==r)return e;var n=t.subtract(e);return K.crypto.Util.getRandomBigIntegerZeroToMax(n).add(e)},K.crypto.MessageDigest=function(e){this.setAlgAndProvider=function(e,t){if(null!==(e=K.crypto.MessageDigest.getCanonicalAlgName(e))&&void 0===t&&(t=K.crypto.Util.DEFAULTPROVIDER[e]),-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(e)&&"cryptojs"==t){try{this.md=K.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[e].create()}catch(t){throw"setAlgAndProvider hash alg set fail alg="+e+"/"+t}this.updateString=function(e){this.md.update(e)},this.updateHex=function(e){var t=y.enc.Hex.parse(e);this.md.update(t)},this.digest=function(){return this.md.finalize().toString(y.enc.Hex)},this.digestString=function(e){return this.updateString(e),this.digest()},this.digestHex=function(e){return this.updateHex(e),this.digest()}}if(-1!=":sha256:".indexOf(e)&&"sjcl"==t){try{this.md=new sjcl.hash.sha256}catch(t){throw"setAlgAndProvider hash alg set fail alg="+e+"/"+t}this.updateString=function(e){this.md.update(e)},this.updateHex=function(e){var t=sjcl.codec.hex.toBits(e);this.md.update(t)},this.digest=function(){var e=this.md.finalize();return sjcl.codec.hex.fromBits(e)},this.digestString=function(e){return this.updateString(e),this.digest()},this.digestHex=function(e){return this.updateHex(e),this.digest()}}},this.updateString=function(e){throw"updateString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.updateHex=function(e){throw"updateHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digest=function(){throw"digest() not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digestString=function(e){throw"digestString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digestHex=function(e){throw"digestHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName},void 0!==e&&void 0!==e.alg&&(this.algName=e.alg,void 0===e.prov&&(this.provName=K.crypto.Util.DEFAULTPROVIDER[this.algName]),this.setAlgAndProvider(this.algName,this.provName))},K.crypto.MessageDigest.getCanonicalAlgName=function(e){return"string"==typeof e&&(e=(e=e.toLowerCase()).replace(/-/,"")),e},K.crypto.MessageDigest.getHashLength=function(e){var t=K.crypto.MessageDigest,r=t.getCanonicalAlgName(e);if(void 0===t.HASHLENGTH[r])throw"not supported algorithm: "+e;return t.HASHLENGTH[r]},K.crypto.MessageDigest.HASHLENGTH={md5:16,sha1:20,sha224:28,sha256:32,sha384:48,sha512:64,ripemd160:20},K.crypto.Mac=function(e){this.setAlgAndProvider=function(e,t){if(null==(e=e.toLowerCase())&&(e="hmacsha1"),"hmac"!=(e=e.toLowerCase()).substr(0,4))throw"setAlgAndProvider unsupported HMAC alg: "+e;void 0===t&&(t=K.crypto.Util.DEFAULTPROVIDER[e]),this.algProv=e+"/"+t;var r=e.substr(4);if(-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(r)&&"cryptojs"==t){try{var n=K.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[r];this.mac=y.algo.HMAC.create(n,this.pass)}catch(e){throw"setAlgAndProvider hash alg set fail hashAlg="+r+"/"+e}this.updateString=function(e){this.mac.update(e)},this.updateHex=function(e){var t=y.enc.Hex.parse(e);this.mac.update(t)},this.doFinal=function(){return this.mac.finalize().toString(y.enc.Hex)},this.doFinalString=function(e){return this.updateString(e),this.doFinal()},this.doFinalHex=function(e){return this.updateHex(e),this.doFinal()}}},this.updateString=function(e){throw"updateString(str) not supported for this alg/prov: "+this.algProv},this.updateHex=function(e){throw"updateHex(hex) not supported for this alg/prov: "+this.algProv},this.doFinal=function(){throw"digest() not supported for this alg/prov: "+this.algProv},this.doFinalString=function(e){throw"digestString(str) not supported for this alg/prov: "+this.algProv},this.doFinalHex=function(e){throw"digestHex(hex) not supported for this alg/prov: "+this.algProv},this.setPassword=function(e){if("string"==typeof e){var t=e;return e.length%2!=1&&e.match(/^[0-9A-Fa-f]+$/)||(t=rstrtohex(e)),void(this.pass=y.enc.Hex.parse(t))}if("object"!=(void 0===e?"undefined":i(e)))throw"KJUR.crypto.Mac unsupported password type: "+e;t=null;if(void 0!==e.hex){if(e.hex.length%2!=0||!e.hex.match(/^[0-9A-Fa-f]+$/))throw"Mac: wrong hex password: "+e.hex;t=e.hex}if(void 0!==e.utf8&&(t=utf8tohex(e.utf8)),void 0!==e.rstr&&(t=rstrtohex(e.rstr)),void 0!==e.b64&&(t=b64tohex(e.b64)),void 0!==e.b64u&&(t=b64utohex(e.b64u)),null==t)throw"KJUR.crypto.Mac unsupported password type: "+e;this.pass=y.enc.Hex.parse(t)},void 0!==e&&(void 0!==e.pass&&this.setPassword(e.pass),void 0!==e.alg&&(this.algName=e.alg,void 0===e.prov&&(this.provName=K.crypto.Util.DEFAULTPROVIDER[this.algName]),this.setAlgAndProvider(this.algName,this.provName)))},K.crypto.Signature=function(e){var t=null;if(this._setAlgNames=function(){var e=this.algName.match(/^(.+)with(.+)$/);e&&(this.mdAlgName=e[1].toLowerCase(),this.pubkeyAlgName=e[2].toLowerCase())},this._zeroPaddingOfSignature=function(e,t){for(var r="",n=t/4-e.length,i=0;i<n;i++)r+="0";return r+e},this.setAlgAndProvider=function(e,t){if(this._setAlgNames(),"cryptojs/jsrsa"!=t)throw"provider not supported: "+t;if(-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)){try{this.md=new K.crypto.MessageDigest({alg:this.mdAlgName})}catch(e){throw"setAlgAndProvider hash alg set fail alg="+this.mdAlgName+"/"+e}this.init=function(e,t){var r=null;try{r=void 0===t?z.getKey(e):z.getKey(e,t)}catch(e){throw"init failed:"+e}if(!0===r.isPrivate)this.prvKey=r,this.state="SIGN";else{if(!0!==r.isPublic)throw"init failed.:"+r;this.pubKey=r,this.state="VERIFY"}},this.updateString=function(e){this.md.updateString(e)},this.updateHex=function(e){this.md.updateHex(e)},this.sign=function(){if(this.sHashHex=this.md.digest(),void 0!==this.ecprvhex&&void 0!==this.eccurvename){var e=new K.crypto.ECDSA({curve:this.eccurvename});this.hSign=e.signHex(this.sHashHex,this.ecprvhex)}else if(this.prvKey instanceof RSAKey&&"rsaandmgf1"===this.pubkeyAlgName)this.hSign=this.prvKey.signWithMessageHashPSS(this.sHashHex,this.mdAlgName,this.pssSaltLen);else if(this.prvKey instanceof RSAKey&&"rsa"===this.pubkeyAlgName)this.hSign=this.prvKey.signWithMessageHash(this.sHashHex,this.mdAlgName);else if(this.prvKey instanceof K.crypto.ECDSA)this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);else{if(!(this.prvKey instanceof K.crypto.DSA))throw"Signature: unsupported private key alg: "+this.pubkeyAlgName;this.hSign=this.prvKey.signWithMessageHash(this.sHashHex)}return this.hSign},this.signString=function(e){return this.updateString(e),this.sign()},this.signHex=function(e){return this.updateHex(e),this.sign()},this.verify=function(e){if(this.sHashHex=this.md.digest(),void 0!==this.ecpubhex&&void 0!==this.eccurvename)return new K.crypto.ECDSA({curve:this.eccurvename}).verifyHex(this.sHashHex,e,this.ecpubhex);if(this.pubKey instanceof RSAKey&&"rsaandmgf1"===this.pubkeyAlgName)return this.pubKey.verifyWithMessageHashPSS(this.sHashHex,e,this.mdAlgName,this.pssSaltLen);if(this.pubKey instanceof RSAKey&&"rsa"===this.pubkeyAlgName)return this.pubKey.verifyWithMessageHash(this.sHashHex,e);if(void 0!==K.crypto.ECDSA&&this.pubKey instanceof K.crypto.ECDSA)return this.pubKey.verifyWithMessageHash(this.sHashHex,e);if(void 0!==K.crypto.DSA&&this.pubKey instanceof K.crypto.DSA)return this.pubKey.verifyWithMessageHash(this.sHashHex,e);throw"Signature: unsupported public key alg: "+this.pubkeyAlgName}}},this.init=function(e,t){throw"init(key, pass) not supported for this alg:prov="+this.algProvName},this.updateString=function(e){throw"updateString(str) not supported for this alg:prov="+this.algProvName},this.updateHex=function(e){throw"updateHex(hex) not supported for this alg:prov="+this.algProvName},this.sign=function(){throw"sign() not supported for this alg:prov="+this.algProvName},this.signString=function(e){throw"digestString(str) not supported for this alg:prov="+this.algProvName},this.signHex=function(e){throw"digestHex(hex) not supported for this alg:prov="+this.algProvName},this.verify=function(e){throw"verify(hSigVal) not supported for this alg:prov="+this.algProvName},this.initParams=e,void 0!==e&&(void 0!==e.alg&&(this.algName=e.alg,void 0===e.prov?this.provName=K.crypto.Util.DEFAULTPROVIDER[this.algName]:this.provName=e.prov,this.algProvName=this.algName+":"+this.provName,this.setAlgAndProvider(this.algName,this.provName),this._setAlgNames()),void 0!==e.psssaltlen&&(this.pssSaltLen=e.psssaltlen),void 0!==e.prvkeypem)){if(void 0!==e.prvkeypas)throw"both prvkeypem and prvkeypas parameters not supported";try{t=z.getKey(e.prvkeypem);this.init(t)}catch(e){throw"fatal error to load pem private key: "+e}}},K.crypto.Cipher=function(e){},K.crypto.Cipher.encrypt=function(e,t,r){if(t instanceof RSAKey&&t.isPublic){var n=K.crypto.Cipher.getAlgByKeyAndName(t,r);if("RSA"===n)return t.encrypt(e);if("RSAOAEP"===n)return t.encryptOAEP(e,"sha1");var i=n.match(/^RSAOAEP(\d+)$/);if(null!==i)return t.encryptOAEP(e,"sha"+i[1]);throw"Cipher.encrypt: unsupported algorithm for RSAKey: "+r}throw"Cipher.encrypt: unsupported key or algorithm"},K.crypto.Cipher.decrypt=function(e,t,r){if(t instanceof RSAKey&&t.isPrivate){var n=K.crypto.Cipher.getAlgByKeyAndName(t,r);if("RSA"===n)return t.decrypt(e);if("RSAOAEP"===n)return t.decryptOAEP(e,"sha1");var i=n.match(/^RSAOAEP(\d+)$/);if(null!==i)return t.decryptOAEP(e,"sha"+i[1]);throw"Cipher.decrypt: unsupported algorithm for RSAKey: "+r}throw"Cipher.decrypt: unsupported key or algorithm"},K.crypto.Cipher.getAlgByKeyAndName=function(e,t){if(e instanceof RSAKey){if(-1!=":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(t))return t;if(null===t||void 0===t)return"RSA";throw"getAlgByKeyAndName: not supported algorithm name for RSAKey: "+t}throw"getAlgByKeyAndName: not supported algorithm name: "+t},K.crypto.OID=new function(){this.oidhex2name={"2a864886f70d010101":"rsaEncryption","2a8648ce3d0201":"ecPublicKey","2a8648ce380401":"dsa","2a8648ce3d030107":"secp256r1","2b8104001f":"secp192k1","2b81040021":"secp224r1","2b8104000a":"secp256k1","2b81040023":"secp521r1","2b81040022":"secp384r1","2a8648ce380403":"SHA1withDSA","608648016503040301":"SHA224withDSA","608648016503040302":"SHA256withDSA"}},void 0!==K&&K||(K={}),void 0!==K.crypto&&K.crypto||(K.crypto={}),K.crypto.ECDSA=function(e){var t=new SecureRandom;this.type="EC",this.isPrivate=!1,this.isPublic=!1,this.getBigRandom=function(e){return new BigInteger(e.bitLength(),t).mod(e.subtract(BigInteger.ONE)).add(BigInteger.ONE)},this.setNamedCurve=function(e){this.ecparams=K.crypto.ECParameterDB.getByName(e),this.prvKeyHex=null,this.pubKeyHex=null,this.curveName=e},this.setPrivateKeyHex=function(e){this.isPrivate=!0,this.prvKeyHex=e},this.setPublicKeyHex=function(e){this.isPublic=!0,this.pubKeyHex=e},this.getPublicKeyXYHex=function(){var e=this.pubKeyHex;if("04"!==e.substr(0,2))throw"this method supports uncompressed format(04) only";var t=this.ecparams.keylen/4;if(e.length!==2+2*t)throw"malformed public key hex length";var r={};return r.x=e.substr(2,t),r.y=e.substr(2+t),r},this.getShortNISTPCurveName=function(){var e=this.curveName;return"secp256r1"===e||"NIST P-256"===e||"P-256"===e||"prime256v1"===e?"P-256":"secp384r1"===e||"NIST P-384"===e||"P-384"===e?"P-384":null},this.generateKeyPairHex=function(){var e=this.ecparams.n,t=this.getBigRandom(e),r=this.ecparams.G.multiply(t),n=r.getX().toBigInteger(),i=r.getY().toBigInteger(),o=this.ecparams.keylen/4,s=("0000000000"+t.toString(16)).slice(-o),a="04"+("0000000000"+n.toString(16)).slice(-o)+("0000000000"+i.toString(16)).slice(-o);return this.setPrivateKeyHex(s),this.setPublicKeyHex(a),{ecprvhex:s,ecpubhex:a}},this.signWithMessageHash=function(e){return this.signHex(e,this.prvKeyHex)},this.signHex=function(e,t){var r=new BigInteger(t,16),n=this.ecparams.n,i=new BigInteger(e,16);do{var o=this.getBigRandom(n),s=this.ecparams.G.multiply(o).getX().toBigInteger().mod(n)}while(s.compareTo(BigInteger.ZERO)<=0);var a=o.modInverse(n).multiply(i.add(r.multiply(s))).mod(n);return K.crypto.ECDSA.biRSSigToASN1Sig(s,a)},this.sign=function(e,t){var r=t,n=this.ecparams.n,i=BigInteger.fromByteArrayUnsigned(e);do{var o=this.getBigRandom(n),s=this.ecparams.G.multiply(o).getX().toBigInteger().mod(n)}while(s.compareTo(BigInteger.ZERO)<=0);var a=o.modInverse(n).multiply(i.add(r.multiply(s))).mod(n);return this.serializeSig(s,a)},this.verifyWithMessageHash=function(e,t){return this.verifyHex(e,t,this.pubKeyHex)},this.verifyHex=function(e,t,r){var n,i,o,s=K.crypto.ECDSA.parseSigHex(t);n=s.r,i=s.s,o=ECPointFp.decodeFromHex(this.ecparams.curve,r);var a=new BigInteger(e,16);return this.verifyRaw(a,n,i,o)},this.verify=function(e,t,r){var n,o,s;if(Bitcoin.Util.isArray(t)){var a=this.parseSig(t);n=a.r,o=a.s}else{if("object"!==(void 0===t?"undefined":i(t))||!t.r||!t.s)throw"Invalid value for signature";n=t.r,o=t.s}if(r instanceof ECPointFp)s=r;else{if(!Bitcoin.Util.isArray(r))throw"Invalid format for pubkey value, must be byte array or ECPointFp";s=ECPointFp.decodeFrom(this.ecparams.curve,r)}var u=BigInteger.fromByteArrayUnsigned(e);return this.verifyRaw(u,n,o,s)},this.verifyRaw=function(e,t,r,n){var i=this.ecparams.n,o=this.ecparams.G;if(t.compareTo(BigInteger.ONE)<0||t.compareTo(i)>=0)return!1;if(r.compareTo(BigInteger.ONE)<0||r.compareTo(i)>=0)return!1;var s=r.modInverse(i),a=e.multiply(s).mod(i),u=t.multiply(s).mod(i);return o.multiply(a).add(n.multiply(u)).getX().toBigInteger().mod(i).equals(t)},this.serializeSig=function(e,t){var r=e.toByteArraySigned(),n=t.toByteArraySigned(),i=[];return i.push(2),i.push(r.length),(i=i.concat(r)).push(2),i.push(n.length),(i=i.concat(n)).unshift(i.length),i.unshift(48),i},this.parseSig=function(e){var t;if(48!=e[0])throw new Error("Signature not a valid DERSequence");if(2!=e[t=2])throw new Error("First element in signature must be a DERInteger");var r=e.slice(t+2,t+2+e[t+1]);if(2!=e[t+=2+e[t+1]])throw new Error("Second element in signature must be a DERInteger");var n=e.slice(t+2,t+2+e[t+1]);return t+=2+e[t+1],{r:BigInteger.fromByteArrayUnsigned(r),s:BigInteger.fromByteArrayUnsigned(n)}},this.parseSigCompact=function(e){if(65!==e.length)throw"Signature has the wrong length";var t=e[0]-27;if(t<0||t>7)throw"Invalid signature type";var r=this.ecparams.n;return{r:BigInteger.fromByteArrayUnsigned(e.slice(1,33)).mod(r),s:BigInteger.fromByteArrayUnsigned(e.slice(33,65)).mod(r),i:t}},this.readPKCS5PrvKeyHex=function(e){var t,r,n,i=J,o=K.crypto.ECDSA.getName,s=i.getVbyList;if(!1===i.isASN1HEX(e))throw"not ASN.1 hex string";try{t=s(e,0,[2,0],"06"),r=s(e,0,[1],"04");try{n=s(e,0,[3,0],"03").substr(2)}catch(e){}}catch(e){throw"malformed PKCS#1/5 plain ECC private key"}if(this.curveName=o(t),void 0===this.curveName)throw"unsupported curve name";this.setNamedCurve(this.curveName),this.setPublicKeyHex(n),this.setPrivateKeyHex(r),this.isPublic=!1},this.readPKCS8PrvKeyHex=function(e){var t,r,n,i=J,o=K.crypto.ECDSA.getName,s=i.getVbyList;if(!1===i.isASN1HEX(e))throw"not ASN.1 hex string";try{s(e,0,[1,0],"06"),t=s(e,0,[1,1],"06"),r=s(e,0,[2,0,1],"04");try{n=s(e,0,[2,0,2,0],"03").substr(2)}catch(e){}}catch(e){throw"malformed PKCS#8 plain ECC private key"}if(this.curveName=o(t),void 0===this.curveName)throw"unsupported curve name";this.setNamedCurve(this.curveName),this.setPublicKeyHex(n),this.setPrivateKeyHex(r),this.isPublic=!1},this.readPKCS8PubKeyHex=function(e){var t,r,n=J,i=K.crypto.ECDSA.getName,o=n.getVbyList;if(!1===n.isASN1HEX(e))throw"not ASN.1 hex string";try{o(e,0,[0,0],"06"),t=o(e,0,[0,1],"06"),r=o(e,0,[1],"03").substr(2)}catch(e){throw"malformed PKCS#8 ECC public key"}if(this.curveName=i(t),null===this.curveName)throw"unsupported curve name";this.setNamedCurve(this.curveName),this.setPublicKeyHex(r)},this.readCertPubKeyHex=function(e,t){5!==t&&(t=6);var r,n,i=J,o=K.crypto.ECDSA.getName,s=i.getVbyList;if(!1===i.isASN1HEX(e))throw"not ASN.1 hex string";try{r=s(e,0,[0,t,0,1],"06"),n=s(e,0,[0,t,1],"03").substr(2)}catch(e){throw"malformed X.509 certificate ECC public key"}if(this.curveName=o(r),null===this.curveName)throw"unsupported curve name";this.setNamedCurve(this.curveName),this.setPublicKeyHex(n)},void 0!==e&&void 0!==e.curve&&(this.curveName=e.curve),void 0===this.curveName&&(this.curveName="secp256r1"),this.setNamedCurve(this.curveName),void 0!==e&&(void 0!==e.prv&&this.setPrivateKeyHex(e.prv),void 0!==e.pub&&this.setPublicKeyHex(e.pub))},K.crypto.ECDSA.parseSigHex=function(e){var t=K.crypto.ECDSA.parseSigHexInHexRS(e);return{r:new BigInteger(t.r,16),s:new BigInteger(t.s,16)}},K.crypto.ECDSA.parseSigHexInHexRS=function(e){var t=J,r=t.getChildIdx,n=t.getV;if("30"!=e.substr(0,2))throw"signature is not a ASN.1 sequence";var i=r(e,0);if(2!=i.length)throw"number of signature ASN.1 sequence elements seem wrong";var o=i[0],s=i[1];if("02"!=e.substr(o,2))throw"1st item of sequene of signature is not ASN.1 integer";if("02"!=e.substr(s,2))throw"2nd item of sequene of signature is not ASN.1 integer";return{r:n(e,o),s:n(e,s)}},K.crypto.ECDSA.asn1SigToConcatSig=function(e){var t=K.crypto.ECDSA.parseSigHexInHexRS(e),r=t.r,n=t.s;if("00"==r.substr(0,2)&&r.length%32==2&&(r=r.substr(2)),"00"==n.substr(0,2)&&n.length%32==2&&(n=n.substr(2)),r.length%32==30&&(r="00"+r),n.length%32==30&&(n="00"+n),r.length%32!=0)throw"unknown ECDSA sig r length error";if(n.length%32!=0)throw"unknown ECDSA sig s length error";return r+n},K.crypto.ECDSA.concatSigToASN1Sig=function(e){if(e.length/2*8%128!=0)throw"unknown ECDSA concatinated r-s sig  length error";var t=e.substr(0,e.length/2),r=e.substr(e.length/2);return K.crypto.ECDSA.hexRSSigToASN1Sig(t,r)},K.crypto.ECDSA.hexRSSigToASN1Sig=function(e,t){var r=new BigInteger(e,16),n=new BigInteger(t,16);return K.crypto.ECDSA.biRSSigToASN1Sig(r,n)},K.crypto.ECDSA.biRSSigToASN1Sig=function(e,t){var r=K.asn1,n=new r.DERInteger({bigint:e}),i=new r.DERInteger({bigint:t});return new r.DERSequence({array:[n,i]}).getEncodedHex()},K.crypto.ECDSA.getName=function(e){return"2a8648ce3d030107"===e?"secp256r1":"2b8104000a"===e?"secp256k1":"2b81040022"===e?"secp384r1":-1!=="|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(e)?"secp256r1":-1!=="|secp256k1|".indexOf(e)?"secp256k1":-1!=="|secp384r1|NIST P-384|P-384|".indexOf(e)?"secp384r1":null},void 0!==K&&K||(K={}),void 0!==K.crypto&&K.crypto||(K.crypto={}),K.crypto.ECParameterDB=new function(){var e={},t={};function a(e){return new BigInteger(e,16)}this.getByName=function(r){var n=r;if(void 0!==t[n]&&(n=t[r]),void 0!==e[n])return e[n];throw"unregistered EC curve name: "+n},this.regist=function(r,n,i,o,s,u,c,h,f,l,g,p){e[r]={};var d=a(i),v=a(o),y=a(s),m=a(u),S=a(c),F=new ECCurveFp(d,v,y),b=F.decodePointHex("04"+h+f);e[r].name=r,e[r].keylen=n,e[r].curve=F,e[r].G=b,e[r].n=m,e[r].h=S,e[r].oid=g,e[r].info=p;for(var _=0;_<l.length;_++)t[l[_]]=r}},K.crypto.ECParameterDB.regist("secp128r1",128,"FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC","E87579C11079F43DD824993C2CEE5ED3","FFFFFFFE0000000075A30D1B9038A115","1","161FF7528B899B2D0C28607CA52C5B86","CF5AC8395BAFEB13C02DA292DDED7A83",[],"","secp128r1 : SECG curve over a 128 bit prime field"),K.crypto.ECParameterDB.regist("secp160k1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73","0","7","0100000000000000000001B8FA16DFAB9ACA16B6B3","1","3B4C382CE37AA192A4019E763036F4F5DD4D7EBB","938CF935318FDCED6BC28286531733C3F03C4FEE",[],"","secp160k1 : SECG curve over a 160 bit prime field"),K.crypto.ECParameterDB.regist("secp160r1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC","1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45","0100000000000000000001F4C8F927AED3CA752257","1","4A96B5688EF573284664698968C38BB913CBFC82","23A628553168947D59DCC912042351377AC5FB32",[],"","secp160r1 : SECG curve over a 160 bit prime field"),K.crypto.ECParameterDB.regist("secp192k1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37","0","3","FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D","1","DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D","9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D",[]),K.crypto.ECParameterDB.regist("secp192r1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC","64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1","FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831","1","188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012","07192B95FFC8DA78631011ED6B24CDD573F977A11E794811",[]),K.crypto.ECParameterDB.regist("secp224r1",224,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE","B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4","FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D","1","B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21","BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34",[]),K.crypto.ECParameterDB.regist("secp256k1",256,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F","0","7","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141","1","79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798","483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8",[]),K.crypto.ECParameterDB.regist("secp256r1",256,"FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC","5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B","FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551","1","6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296","4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5",["NIST P-256","P-256","prime256v1"]),K.crypto.ECParameterDB.regist("secp384r1",384,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC","B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973","1","AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7","3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f",["NIST P-384","P-384"]),K.crypto.ECParameterDB.regist("secp521r1",521,"1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC","051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409","1","C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66","011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650",["NIST P-521","P-521"]);var z=function(){var t=function d(e,t,n){return r(y.AES,e,t,n)},r=function k(e,t,r,n){var i=y.enc.Hex.parse(t),o=y.enc.Hex.parse(r),s=y.enc.Hex.parse(n),a={};a.key=o,a.iv=s,a.ciphertext=i;var u=e.decrypt(a,o,{iv:s});return y.enc.Hex.stringify(u)},n=function l(e,t,r){return i(y.AES,e,t,r)},i=function g(e,t,r,n){var i=y.enc.Hex.parse(t),o=y.enc.Hex.parse(r),s=y.enc.Hex.parse(n),a=e.encrypt(i,o,{iv:s}),u=y.enc.Hex.parse(a.toString());return y.enc.Base64.stringify(u)},s={"AES-256-CBC":{proc:t,eproc:n,keylen:32,ivlen:16},"AES-192-CBC":{proc:t,eproc:n,keylen:24,ivlen:16},"AES-128-CBC":{proc:t,eproc:n,keylen:16,ivlen:16},"DES-EDE3-CBC":{proc:function e(t,n,i){return r(y.TripleDES,t,n,i)},eproc:function o(e,t,r){return i(y.TripleDES,e,t,r)},keylen:24,ivlen:8},"DES-CBC":{proc:function a(e,t,n){return r(y.DES,e,t,n)},eproc:function f(e,t,r){return i(y.DES,e,t,r)},keylen:8,ivlen:8}},u=function n(e){var t={},r=e.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)","m"));r&&(t.cipher=r[1],t.ivsalt=r[2]);var i=e.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));i&&(t.type=i[1]);var o=-1,s=0;-1!=e.indexOf("\r\n\r\n")&&(o=e.indexOf("\r\n\r\n"),s=2),-1!=e.indexOf("\n\n")&&(o=e.indexOf("\n\n"),s=1);var a=e.indexOf("-----END");if(-1!=o&&-1!=a){var u=e.substring(o+2*s,a-s);u=u.replace(/\s+/g,""),t.data=u}return t},c=function j(e,t,r){for(var n=r.substring(0,16),i=y.enc.Hex.parse(n),o=y.enc.Utf8.parse(t),a=s[e].keylen+s[e].ivlen,u="",c=null;;){var h=y.algo.MD5.create();if(null!=c&&h.update(c),h.update(o),h.update(i),c=h.finalize(),(u+=y.enc.Hex.stringify(c)).length>=2*a)break}var f={};return f.keyhex=u.substr(0,2*s[e].keylen),f.ivhex=u.substr(2*s[e].keylen,2*s[e].ivlen),f},g=function b(e,t,r,n){var i=y.enc.Base64.parse(e),o=y.enc.Hex.stringify(i);return(0,s[t].proc)(o,r,n)};return{version:"1.0.0",parsePKCS5PEM:function parsePKCS5PEM(e){return u(e)},getKeyAndUnusedIvByPasscodeAndIvsalt:function getKeyAndUnusedIvByPasscodeAndIvsalt(e,t,r){return c(e,t,r)},decryptKeyB64:function decryptKeyB64(e,t,r,n){return g(e,t,r,n)},getDecryptedKeyHex:function getDecryptedKeyHex(e,t){var r=u(e),n=(r.type,r.cipher),i=r.ivsalt,o=r.data,s=c(n,t,i).keyhex;return g(o,n,s,i)},getEncryptedPKCS5PEMFromPrvKeyHex:function getEncryptedPKCS5PEMFromPrvKeyHex(e,t,r,n,i){var o="";if(void 0!==n&&null!=n||(n="AES-256-CBC"),void 0===s[n])throw"KEYUTIL unsupported algorithm: "+n;void 0!==i&&null!=i||(i=function m(e){var t=y.lib.WordArray.random(e);return y.enc.Hex.stringify(t)}(s[n].ivlen).toUpperCase());var a=function h(e,t,r,n){return(0,s[t].eproc)(e,r,n)}(t,n,c(n,r,i).keyhex,i);o="-----BEGIN "+e+" PRIVATE KEY-----\r\n";return o+="Proc-Type: 4,ENCRYPTED\r\n",o+="DEK-Info: "+n+","+i+"\r\n",o+="\r\n",o+=a.replace(/(.{64})/g,"$1\r\n"),o+="\r\n-----END "+e+" PRIVATE KEY-----\r\n"},parseHexOfEncryptedPKCS8:function parseHexOfEncryptedPKCS8(e){var t=J,r=t.getChildIdx,n=t.getV,i={},o=r(e,0);if(2!=o.length)throw"malformed format: SEQUENCE(0).items != 2: "+o.length;i.ciphertext=n(e,o[1]);var s=r(e,o[0]);if(2!=s.length)throw"malformed format: SEQUENCE(0.0).items != 2: "+s.length;if("2a864886f70d01050d"!=n(e,s[0]))throw"this only supports pkcs5PBES2";var a=r(e,s[1]);if(2!=s.length)throw"malformed format: SEQUENCE(0.0.1).items != 2: "+a.length;var u=r(e,a[1]);if(2!=u.length)throw"malformed format: SEQUENCE(0.0.1.1).items != 2: "+u.length;if("2a864886f70d0307"!=n(e,u[0]))throw"this only supports TripleDES";i.encryptionSchemeAlg="TripleDES",i.encryptionSchemeIV=n(e,u[1]);var c=r(e,a[0]);if(2!=c.length)throw"malformed format: SEQUENCE(0.0.1.0).items != 2: "+c.length;if("2a864886f70d01050c"!=n(e,c[0]))throw"this only supports pkcs5PBKDF2";var h=r(e,c[1]);if(h.length<2)throw"malformed format: SEQUENCE(0.0.1.0.1).items < 2: "+h.length;i.pbkdf2Salt=n(e,h[0]);var f=n(e,h[1]);try{i.pbkdf2Iter=parseInt(f,16)}catch(e){throw"malformed format pbkdf2Iter: "+f}return i},getPBKDF2KeyHexFromParam:function getPBKDF2KeyHexFromParam(e,t){var r=y.enc.Hex.parse(e.pbkdf2Salt),n=e.pbkdf2Iter,i=y.PBKDF2(t,r,{keySize:6,iterations:n});return y.enc.Hex.stringify(i)},_getPlainPKCS8HexFromEncryptedPKCS8PEM:function _getPlainPKCS8HexFromEncryptedPKCS8PEM(e,t){var r=pemtohex(e,"ENCRYPTED PRIVATE KEY"),n=this.parseHexOfEncryptedPKCS8(r),i=z.getPBKDF2KeyHexFromParam(n,t),o={};o.ciphertext=y.enc.Hex.parse(n.ciphertext);var s=y.enc.Hex.parse(i),a=y.enc.Hex.parse(n.encryptionSchemeIV),u=y.TripleDES.decrypt(o,s,{iv:a});return y.enc.Hex.stringify(u)},getKeyFromEncryptedPKCS8PEM:function getKeyFromEncryptedPKCS8PEM(e,t){var r=this._getPlainPKCS8HexFromEncryptedPKCS8PEM(e,t);return this.getKeyFromPlainPrivatePKCS8Hex(r)},parsePlainPrivatePKCS8Hex:function parsePlainPrivatePKCS8Hex(e){var t=J,r=t.getChildIdx,n=t.getV,i={algparam:null};if("30"!=e.substr(0,2))throw"malformed plain PKCS8 private key(code:001)";var o=r(e,0);if(3!=o.length)throw"malformed plain PKCS8 private key(code:002)";if("30"!=e.substr(o[1],2))throw"malformed PKCS8 private key(code:003)";var s=r(e,o[1]);if(2!=s.length)throw"malformed PKCS8 private key(code:004)";if("06"!=e.substr(s[0],2))throw"malformed PKCS8 private key(code:005)";if(i.algoid=n(e,s[0]),"06"==e.substr(s[1],2)&&(i.algparam=n(e,s[1])),"04"!=e.substr(o[2],2))throw"malformed PKCS8 private key(code:006)";return i.keyidx=t.getVidx(e,o[2]),i},getKeyFromPlainPrivatePKCS8PEM:function getKeyFromPlainPrivatePKCS8PEM(e){var t=pemtohex(e,"PRIVATE KEY");return this.getKeyFromPlainPrivatePKCS8Hex(t)},getKeyFromPlainPrivatePKCS8Hex:function getKeyFromPlainPrivatePKCS8Hex(e){var t,r=this.parsePlainPrivatePKCS8Hex(e);if("2a864886f70d010101"==r.algoid)t=new RSAKey;else if("2a8648ce380401"==r.algoid)t=new K.crypto.DSA;else{if("2a8648ce3d0201"!=r.algoid)throw"unsupported private key algorithm";t=new K.crypto.ECDSA}return t.readPKCS8PrvKeyHex(e),t},_getKeyFromPublicPKCS8Hex:function _getKeyFromPublicPKCS8Hex(e){var t,r=J.getVbyList(e,0,[0,0],"06");if("2a864886f70d010101"===r)t=new RSAKey;else if("2a8648ce380401"===r)t=new K.crypto.DSA;else{if("2a8648ce3d0201"!==r)throw"unsupported PKCS#8 public key hex";t=new K.crypto.ECDSA}return t.readPKCS8PubKeyHex(e),t},parsePublicRawRSAKeyHex:function parsePublicRawRSAKeyHex(e){var t=J,r=t.getChildIdx,n=t.getV,i={};if("30"!=e.substr(0,2))throw"malformed RSA key(code:001)";var o=r(e,0);if(2!=o.length)throw"malformed RSA key(code:002)";if("02"!=e.substr(o[0],2))throw"malformed RSA key(code:003)";if(i.n=n(e,o[0]),"02"!=e.substr(o[1],2))throw"malformed RSA key(code:004)";return i.e=n(e,o[1]),i},parsePublicPKCS8Hex:function parsePublicPKCS8Hex(e){var t=J,r=t.getChildIdx,n=t.getV,i={algparam:null},o=r(e,0);if(2!=o.length)throw"outer DERSequence shall have 2 elements: "+o.length;var s=o[0];if("30"!=e.substr(s,2))throw"malformed PKCS8 public key(code:001)";var a=r(e,s);if(2!=a.length)throw"malformed PKCS8 public key(code:002)";if("06"!=e.substr(a[0],2))throw"malformed PKCS8 public key(code:003)";if(i.algoid=n(e,a[0]),"06"==e.substr(a[1],2)?i.algparam=n(e,a[1]):"30"==e.substr(a[1],2)&&(i.algparam={},i.algparam.p=t.getVbyList(e,a[1],[0],"02"),i.algparam.q=t.getVbyList(e,a[1],[1],"02"),i.algparam.g=t.getVbyList(e,a[1],[2],"02")),"03"!=e.substr(o[1],2))throw"malformed PKCS8 public key(code:004)";return i.key=n(e,o[1]).substr(2),i}}}();z.getKey=function(e,t,r){var n=(v=J).getChildIdx,i=(v.getV,v.getVbyList),o=K.crypto,s=o.ECDSA,a=o.DSA,u=RSAKey,c=pemtohex,h=z;if(void 0!==u&&e instanceof u)return e;if(void 0!==s&&e instanceof s)return e;if(void 0!==a&&e instanceof a)return e;if(void 0!==e.curve&&void 0!==e.xy&&void 0===e.d)return new s({pub:e.xy,curve:e.curve});if(void 0!==e.curve&&void 0!==e.d)return new s({prv:e.d,curve:e.curve});if(void 0===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0===e.d)return(P=new u).setPublic(e.n,e.e),P;if(void 0===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0!==e.d&&void 0!==e.p&&void 0!==e.q&&void 0!==e.dp&&void 0!==e.dq&&void 0!==e.co&&void 0===e.qi)return(P=new u).setPrivateEx(e.n,e.e,e.d,e.p,e.q,e.dp,e.dq,e.co),P;if(void 0===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0!==e.d&&void 0===e.p)return(P=new u).setPrivate(e.n,e.e,e.d),P;if(void 0!==e.p&&void 0!==e.q&&void 0!==e.g&&void 0!==e.y&&void 0===e.x)return(P=new a).setPublic(e.p,e.q,e.g,e.y),P;if(void 0!==e.p&&void 0!==e.q&&void 0!==e.g&&void 0!==e.y&&void 0!==e.x)return(P=new a).setPrivate(e.p,e.q,e.g,e.y,e.x),P;if("RSA"===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0===e.d)return(P=new u).setPublic(b64utohex(e.n),b64utohex(e.e)),P;if("RSA"===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0!==e.d&&void 0!==e.p&&void 0!==e.q&&void 0!==e.dp&&void 0!==e.dq&&void 0!==e.qi)return(P=new u).setPrivateEx(b64utohex(e.n),b64utohex(e.e),b64utohex(e.d),b64utohex(e.p),b64utohex(e.q),b64utohex(e.dp),b64utohex(e.dq),b64utohex(e.qi)),P;if("RSA"===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0!==e.d)return(P=new u).setPrivate(b64utohex(e.n),b64utohex(e.e),b64utohex(e.d)),P;if("EC"===e.kty&&void 0!==e.crv&&void 0!==e.x&&void 0!==e.y&&void 0===e.d){var f=(C=new s({curve:e.crv})).ecparams.keylen/4,l="04"+("0000000000"+b64utohex(e.x)).slice(-f)+("0000000000"+b64utohex(e.y)).slice(-f);return C.setPublicKeyHex(l),C}if("EC"===e.kty&&void 0!==e.crv&&void 0!==e.x&&void 0!==e.y&&void 0!==e.d){f=(C=new s({curve:e.crv})).ecparams.keylen/4,l="04"+("0000000000"+b64utohex(e.x)).slice(-f)+("0000000000"+b64utohex(e.y)).slice(-f);var g=("0000000000"+b64utohex(e.d)).slice(-f);return C.setPublicKeyHex(l),C.setPrivateKeyHex(g),C}if("pkcs5prv"===r){var p,d=e,v=J;if(9===(p=n(d,0)).length)(P=new u).readPKCS5PrvKeyHex(d);else if(6===p.length)(P=new a).readPKCS5PrvKeyHex(d);else{if(!(p.length>2&&"04"===d.substr(p[1],2)))throw"unsupported PKCS#1/5 hexadecimal key";(P=new s).readPKCS5PrvKeyHex(d)}return P}if("pkcs8prv"===r)return P=h.getKeyFromPlainPrivatePKCS8Hex(e);if("pkcs8pub"===r)return h._getKeyFromPublicPKCS8Hex(e);if("x509pub"===r)return X509.getPublicKeyFromCertHex(e);if(-1!=e.indexOf("-END CERTIFICATE-",0)||-1!=e.indexOf("-END X509 CERTIFICATE-",0)||-1!=e.indexOf("-END TRUSTED CERTIFICATE-",0))return X509.getPublicKeyFromCertPEM(e);if(-1!=e.indexOf("-END PUBLIC KEY-")){var y=pemtohex(e,"PUBLIC KEY");return h._getKeyFromPublicPKCS8Hex(y)}if(-1!=e.indexOf("-END RSA PRIVATE KEY-")&&-1==e.indexOf("4,ENCRYPTED")){var m=c(e,"RSA PRIVATE KEY");return h.getKey(m,null,"pkcs5prv")}if(-1!=e.indexOf("-END DSA PRIVATE KEY-")&&-1==e.indexOf("4,ENCRYPTED")){var S=i(I=c(e,"DSA PRIVATE KEY"),0,[1],"02"),F=i(I,0,[2],"02"),b=i(I,0,[3],"02"),_=i(I,0,[4],"02"),w=i(I,0,[5],"02");return(P=new a).setPrivate(new BigInteger(S,16),new BigInteger(F,16),new BigInteger(b,16),new BigInteger(_,16),new BigInteger(w,16)),P}if(-1!=e.indexOf("-END PRIVATE KEY-"))return h.getKeyFromPlainPrivatePKCS8PEM(e);if(-1!=e.indexOf("-END RSA PRIVATE KEY-")&&-1!=e.indexOf("4,ENCRYPTED")){var E=h.getDecryptedKeyHex(e,t),x=new RSAKey;return x.readPKCS5PrvKeyHex(E),x}if(-1!=e.indexOf("-END EC PRIVATE KEY-")&&-1!=e.indexOf("4,ENCRYPTED")){var C,P=i(I=h.getDecryptedKeyHex(e,t),0,[1],"04"),A=i(I,0,[2,0],"06"),k=i(I,0,[3,0],"03").substr(2);if(void 0===K.crypto.OID.oidhex2name[A])throw"undefined OID(hex) in KJUR.crypto.OID: "+A;return(C=new s({curve:K.crypto.OID.oidhex2name[A]})).setPublicKeyHex(k),C.setPrivateKeyHex(P),C.isPublic=!1,C}if(-1!=e.indexOf("-END DSA PRIVATE KEY-")&&-1!=e.indexOf("4,ENCRYPTED")){var I;S=i(I=h.getDecryptedKeyHex(e,t),0,[1],"02"),F=i(I,0,[2],"02"),b=i(I,0,[3],"02"),_=i(I,0,[4],"02"),w=i(I,0,[5],"02");return(P=new a).setPrivate(new BigInteger(S,16),new BigInteger(F,16),new BigInteger(b,16),new BigInteger(_,16),new BigInteger(w,16)),P}if(-1!=e.indexOf("-END ENCRYPTED PRIVATE KEY-"))return h.getKeyFromEncryptedPKCS8PEM(e,t);throw"not supported argument"},z.generateKeypair=function(e,t){if("RSA"==e){var r=t;(s=new RSAKey).generate(r,"10001"),s.isPrivate=!0,s.isPublic=!0;var n=new RSAKey,i=s.n.toString(16),o=s.e.toString(16);return n.setPublic(i,o),n.isPrivate=!1,n.isPublic=!0,(a={}).prvKeyObj=s,a.pubKeyObj=n,a}if("EC"==e){var s,a,u=t,c=new K.crypto.ECDSA({curve:u}).generateKeyPairHex();return(s=new K.crypto.ECDSA({curve:u})).setPublicKeyHex(c.ecpubhex),s.setPrivateKeyHex(c.ecprvhex),s.isPrivate=!0,s.isPublic=!1,(n=new K.crypto.ECDSA({curve:u})).setPublicKeyHex(c.ecpubhex),n.isPrivate=!1,n.isPublic=!0,(a={}).prvKeyObj=s,a.pubKeyObj=n,a}throw"unknown algorithm: "+e},z.getPEM=function(e,t,r,n,i,s){var a=K,u=a.asn1,c=u.DERObjectIdentifier,h=u.DERInteger,f=u.ASN1Util.newObject,l=u.x509.SubjectPublicKeyInfo,g=a.crypto,p=g.DSA,d=g.ECDSA,v=RSAKey;function A(e){return f({seq:[{int:0},{int:{bigint:e.n}},{int:e.e},{int:{bigint:e.d}},{int:{bigint:e.p}},{int:{bigint:e.q}},{int:{bigint:e.dmp1}},{int:{bigint:e.dmq1}},{int:{bigint:e.coeff}}]})}function B(e){return f({seq:[{int:1},{octstr:{hex:e.prvKeyHex}},{tag:["a0",!0,{oid:{name:e.curveName}}]},{tag:["a1",!0,{bitstr:{hex:"00"+e.pubKeyHex}}]}]})}function x(e){return f({seq:[{int:0},{int:{bigint:e.p}},{int:{bigint:e.q}},{int:{bigint:e.g}},{int:{bigint:e.y}},{int:{bigint:e.x}}]})}if((void 0!==v&&e instanceof v||void 0!==p&&e instanceof p||void 0!==d&&e instanceof d)&&1==e.isPublic&&(void 0===t||"PKCS8PUB"==t))return hextopem(b=new l(e).getEncodedHex(),"PUBLIC KEY");if("PKCS1PRV"==t&&void 0!==v&&e instanceof v&&(void 0===r||null==r)&&1==e.isPrivate)return hextopem(b=A(e).getEncodedHex(),"RSA PRIVATE KEY");if("PKCS1PRV"==t&&void 0!==d&&e instanceof d&&(void 0===r||null==r)&&1==e.isPrivate){var m=new c({name:e.curveName}).getEncodedHex(),S=B(e).getEncodedHex(),F="";return F+=hextopem(m,"EC PARAMETERS"),F+=hextopem(S,"EC PRIVATE KEY")}if("PKCS1PRV"==t&&void 0!==p&&e instanceof p&&(void 0===r||null==r)&&1==e.isPrivate)return hextopem(b=x(e).getEncodedHex(),"DSA PRIVATE KEY");if("PKCS5PRV"==t&&void 0!==v&&e instanceof v&&void 0!==r&&null!=r&&1==e.isPrivate){var b=A(e).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA",b,r,n,s)}if("PKCS5PRV"==t&&void 0!==d&&e instanceof d&&void 0!==r&&null!=r&&1==e.isPrivate){b=B(e).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("EC",b,r,n,s)}if("PKCS5PRV"==t&&void 0!==p&&e instanceof p&&void 0!==r&&null!=r&&1==e.isPrivate){b=x(e).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA",b,r,n,s)}var _=function o(e,t){var r=w(e,t);return new f({seq:[{seq:[{oid:{name:"pkcs5PBES2"}},{seq:[{seq:[{oid:{name:"pkcs5PBKDF2"}},{seq:[{octstr:{hex:r.pbkdf2Salt}},{int:r.pbkdf2Iter}]}]},{seq:[{oid:{name:"des-EDE3-CBC"}},{octstr:{hex:r.encryptionSchemeIV}}]}]}]},{octstr:{hex:r.ciphertext}}]}).getEncodedHex()},w=function c(e,t){var r=y.lib.WordArray.random(8),n=y.lib.WordArray.random(8),i=y.PBKDF2(t,r,{keySize:6,iterations:100}),o=y.enc.Hex.parse(e),s=y.TripleDES.encrypt(o,i,{iv:n})+"",a={};return a.ciphertext=s,a.pbkdf2Salt=y.enc.Hex.stringify(r),a.pbkdf2Iter=100,a.encryptionSchemeAlg="DES-EDE3-CBC",a.encryptionSchemeIV=y.enc.Hex.stringify(n),a};if("PKCS8PRV"==t&&void 0!=v&&e instanceof v&&1==e.isPrivate){var E=A(e).getEncodedHex();b=f({seq:[{int:0},{seq:[{oid:{name:"rsaEncryption"}},{null:!0}]},{octstr:{hex:E}}]}).getEncodedHex();return void 0===r||null==r?hextopem(b,"PRIVATE KEY"):hextopem(S=_(b,r),"ENCRYPTED PRIVATE KEY")}if("PKCS8PRV"==t&&void 0!==d&&e instanceof d&&1==e.isPrivate){E=new f({seq:[{int:1},{octstr:{hex:e.prvKeyHex}},{tag:["a1",!0,{bitstr:{hex:"00"+e.pubKeyHex}}]}]}).getEncodedHex(),b=f({seq:[{int:0},{seq:[{oid:{name:"ecPublicKey"}},{oid:{name:e.curveName}}]},{octstr:{hex:E}}]}).getEncodedHex();return void 0===r||null==r?hextopem(b,"PRIVATE KEY"):hextopem(S=_(b,r),"ENCRYPTED PRIVATE KEY")}if("PKCS8PRV"==t&&void 0!==p&&e instanceof p&&1==e.isPrivate){E=new h({bigint:e.x}).getEncodedHex(),b=f({seq:[{int:0},{seq:[{oid:{name:"dsa"}},{seq:[{int:{bigint:e.p}},{int:{bigint:e.q}},{int:{bigint:e.g}}]}]},{octstr:{hex:E}}]}).getEncodedHex();return void 0===r||null==r?hextopem(b,"PRIVATE KEY"):hextopem(S=_(b,r),"ENCRYPTED PRIVATE KEY")}throw"unsupported object nor format"},z.getKeyFromCSRPEM=function(e){var t=pemtohex(e,"CERTIFICATE REQUEST");return z.getKeyFromCSRHex(t)},z.getKeyFromCSRHex=function(e){var t=z.parseCSRHex(e);return z.getKey(t.p8pubkeyhex,null,"pkcs8pub")},z.parseCSRHex=function(e){var t=J,r=t.getChildIdx,n=t.getTLV,i={},o=e;if("30"!=o.substr(0,2))throw"malformed CSR(code:001)";var s=r(o,0);if(s.length<1)throw"malformed CSR(code:002)";if("30"!=o.substr(s[0],2))throw"malformed CSR(code:003)";var a=r(o,s[0]);if(a.length<3)throw"malformed CSR(code:004)";return i.p8pubkeyhex=n(o,a[2]),i},z.getJWKFromKey=function(e){var t={};if(e instanceof RSAKey&&e.isPrivate)return t.kty="RSA",t.n=hextob64u(e.n.toString(16)),t.e=hextob64u(e.e.toString(16)),t.d=hextob64u(e.d.toString(16)),t.p=hextob64u(e.p.toString(16)),t.q=hextob64u(e.q.toString(16)),t.dp=hextob64u(e.dmp1.toString(16)),t.dq=hextob64u(e.dmq1.toString(16)),t.qi=hextob64u(e.coeff.toString(16)),t;if(e instanceof RSAKey&&e.isPublic)return t.kty="RSA",t.n=hextob64u(e.n.toString(16)),t.e=hextob64u(e.e.toString(16)),t;if(e instanceof K.crypto.ECDSA&&e.isPrivate){if("P-256"!==(n=e.getShortNISTPCurveName())&&"P-384"!==n)throw"unsupported curve name for JWT: "+n;var r=e.getPublicKeyXYHex();return t.kty="EC",t.crv=n,t.x=hextob64u(r.x),t.y=hextob64u(r.y),t.d=hextob64u(e.prvKeyHex),t}if(e instanceof K.crypto.ECDSA&&e.isPublic){var n;if("P-256"!==(n=e.getShortNISTPCurveName())&&"P-384"!==n)throw"unsupported curve name for JWT: "+n;r=e.getPublicKeyXYHex();return t.kty="EC",t.crv=n,t.x=hextob64u(r.x),t.y=hextob64u(r.y),t}throw"not supported key object"},RSAKey.getPosArrayOfChildrenFromHex=function(e){return J.getChildIdx(e,0)},RSAKey.getHexValueArrayOfChildrenFromHex=function(e){var t,r=J.getV,n=r(e,(t=RSAKey.getPosArrayOfChildrenFromHex(e))[0]),i=r(e,t[1]),o=r(e,t[2]),s=r(e,t[3]),a=r(e,t[4]),u=r(e,t[5]),c=r(e,t[6]),h=r(e,t[7]),f=r(e,t[8]);return(t=new Array).push(n,i,o,s,a,u,c,h,f),t},RSAKey.prototype.readPrivateKeyFromPEMString=function(e){var t=pemtohex(e),r=RSAKey.getHexValueArrayOfChildrenFromHex(t);this.setPrivateEx(r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8])},RSAKey.prototype.readPKCS5PrvKeyHex=function(e){var t=RSAKey.getHexValueArrayOfChildrenFromHex(e);this.setPrivateEx(t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8])},RSAKey.prototype.readPKCS8PrvKeyHex=function(e){var t,r,n,i,o,s,a,u,c=J,h=c.getVbyList;if(!1===c.isASN1HEX(e))throw"not ASN.1 hex string";try{t=h(e,0,[2,0,1],"02"),r=h(e,0,[2,0,2],"02"),n=h(e,0,[2,0,3],"02"),i=h(e,0,[2,0,4],"02"),o=h(e,0,[2,0,5],"02"),s=h(e,0,[2,0,6],"02"),a=h(e,0,[2,0,7],"02"),u=h(e,0,[2,0,8],"02")}catch(e){throw"malformed PKCS#8 plain RSA private key"}this.setPrivateEx(t,r,n,i,o,s,a,u)},RSAKey.prototype.readPKCS5PubKeyHex=function(e){var t=J,r=t.getV;if(!1===t.isASN1HEX(e))throw"keyHex is not ASN.1 hex string";var n=t.getChildIdx(e,0);if(2!==n.length||"02"!==e.substr(n[0],2)||"02"!==e.substr(n[1],2))throw"wrong hex for PKCS#5 public key";var i=r(e,n[0]),o=r(e,n[1]);this.setPublic(i,o)},RSAKey.prototype.readPKCS8PubKeyHex=function(e){var t=J;if(!1===t.isASN1HEX(e))throw"not ASN.1 hex string";if("06092a864886f70d010101"!==t.getTLVbyList(e,0,[0,0]))throw"not PKCS8 RSA public key";var r=t.getTLVbyList(e,0,[1,0]);this.readPKCS5PubKeyHex(r)},RSAKey.prototype.readCertPubKeyHex=function(e,t){var r,n;(r=new X509).readCertHex(e),n=r.getPublicKeyHex(),this.readPKCS8PubKeyHex(n)};var Y=new RegExp("");function _zeroPaddingOfSignature(e,t){for(var r="",n=t/4-e.length,i=0;i<n;i++)r+="0";return r+e}function pss_mgf1_str(e,t,r){for(var n="",i=0;n.length<t;)n+=hextorstr(r(rstrtohex(e+String.fromCharCode.apply(String,[(4278190080&i)>>24,(16711680&i)>>16,(65280&i)>>8,255&i])))),i+=1;return n}function _rsasign_getAlgNameAndHashFromHexDisgestInfo(e){for(var t in K.crypto.Util.DIGESTINFOHEAD){var r=K.crypto.Util.DIGESTINFOHEAD[t],n=r.length;if(e.substring(0,n)==r)return[t,e.substring(n)]}return[]}function X509(){var e=J,t=e.getChildIdx,r=e.getV,n=e.getTLV,i=e.getVbyList,o=e.getTLVbyList,s=e.getIdxbyList,a=e.getVidx,u=e.oidname,c=X509,h=pemtohex;this.hex=null,this.version=0,this.foffset=0,this.aExtInfo=null,this.getVersion=function(){return null===this.hex||0!==this.version?this.version:"a003020102"!==o(this.hex,0,[0,0])?(this.version=1,this.foffset=-1,1):(this.version=3,3)},this.getSerialNumberHex=function(){return i(this.hex,0,[0,1+this.foffset],"02")},this.getSignatureAlgorithmField=function(){return u(i(this.hex,0,[0,2+this.foffset,0],"06"))},this.getIssuerHex=function(){return o(this.hex,0,[0,3+this.foffset],"30")},this.getIssuerString=function(){return c.hex2dn(this.getIssuerHex())},this.getSubjectHex=function(){return o(this.hex,0,[0,5+this.foffset],"30")},this.getSubjectString=function(){return c.hex2dn(this.getSubjectHex())},this.getNotBefore=function(){var e=i(this.hex,0,[0,4+this.foffset,0]);return e=e.replace(/(..)/g,"%$1"),e=decodeURIComponent(e)},this.getNotAfter=function(){var e=i(this.hex,0,[0,4+this.foffset,1]);return e=e.replace(/(..)/g,"%$1"),e=decodeURIComponent(e)},this.getPublicKeyHex=function(){return e.getTLVbyList(this.hex,0,[0,6+this.foffset],"30")},this.getPublicKeyIdx=function(){return s(this.hex,0,[0,6+this.foffset],"30")},this.getPublicKeyContentIdx=function(){var e=this.getPublicKeyIdx();return s(this.hex,e,[1,0],"30")},this.getPublicKey=function(){return z.getKey(this.getPublicKeyHex(),null,"pkcs8pub")},this.getSignatureAlgorithmName=function(){return u(i(this.hex,0,[1,0],"06"))},this.getSignatureValueHex=function(){return i(this.hex,0,[2],"03",!0)},this.verifySignature=function(e){var t=this.getSignatureAlgorithmName(),r=this.getSignatureValueHex(),n=o(this.hex,0,[0],"30"),i=new K.crypto.Signature({alg:t});return i.init(e),i.updateHex(n),i.verify(r)},this.parseExt=function(){if(3!==this.version)return-1;var r=s(this.hex,0,[0,7,0],"30"),n=t(this.hex,r);this.aExtInfo=new Array;for(var o=0;o<n.length;o++){var u={critical:!1},c=0;3===t(this.hex,n[o]).length&&(u.critical=!0,c=1),u.oid=e.hextooidstr(i(this.hex,n[o],[0],"06"));var h=s(this.hex,n[o],[1+c]);u.vidx=a(this.hex,h),this.aExtInfo.push(u)}},this.getExtInfo=function(e){var t=this.aExtInfo,r=e;if(e.match(/^[0-9.]+$/)||(r=K.asn1.x509.OID.name2oid(e)),""!==r)for(var n=0;n<t.length;n++)if(t[n].oid===r)return t[n]},this.getExtBasicConstraints=function(){var e=this.getExtInfo("basicConstraints");if(void 0===e)return e;var t=r(this.hex,e.vidx);if(""===t)return{};if("0101ff"===t)return{cA:!0};if("0101ff02"===t.substr(0,8)){var n=r(t,6);return{cA:!0,pathLen:parseInt(n,16)}}throw"basicConstraints parse error"},this.getExtKeyUsageBin=function(){var e=this.getExtInfo("keyUsage");if(void 0===e)return"";var t=r(this.hex,e.vidx);if(t.length%2!=0||t.length<=2)throw"malformed key usage value";var n=parseInt(t.substr(0,2)),i=parseInt(t.substr(2),16).toString(2);return i.substr(0,i.length-n)},this.getExtKeyUsageString=function(){for(var e=this.getExtKeyUsageBin(),t=new Array,r=0;r<e.length;r++)"1"==e.substr(r,1)&&t.push(X509.KEYUSAGE_NAME[r]);return t.join(",")},this.getExtSubjectKeyIdentifier=function(){var e=this.getExtInfo("subjectKeyIdentifier");return void 0===e?e:r(this.hex,e.vidx)},this.getExtAuthorityKeyIdentifier=function(){var e=this.getExtInfo("authorityKeyIdentifier");if(void 0===e)return e;for(var i={},o=n(this.hex,e.vidx),s=t(o,0),a=0;a<s.length;a++)"80"===o.substr(s[a],2)&&(i.kid=r(o,s[a]));return i},this.getExtExtKeyUsageName=function(){var e=this.getExtInfo("extKeyUsage");if(void 0===e)return e;var i=new Array,o=n(this.hex,e.vidx);if(""===o)return i;for(var s=t(o,0),a=0;a<s.length;a++)i.push(u(r(o,s[a])));return i},this.getExtSubjectAltName=function(){for(var e=this.getExtSubjectAltName2(),t=new Array,r=0;r<e.length;r++)"DNS"===e[r][0]&&t.push(e[r][1]);return t},this.getExtSubjectAltName2=function(){var e,i,o,s=this.getExtInfo("subjectAltName");if(void 0===s)return s;for(var a=new Array,u=n(this.hex,s.vidx),c=t(u,0),h=0;h<c.length;h++)o=u.substr(c[h],2),e=r(u,c[h]),"81"===o&&(i=hextoutf8(e),a.push(["MAIL",i])),"82"===o&&(i=hextoutf8(e),a.push(["DNS",i])),"84"===o&&(i=X509.hex2dn(e,0),a.push(["DN",i])),"86"===o&&(i=hextoutf8(e),a.push(["URI",i])),"87"===o&&(i=hextoip(e),a.push(["IP",i]));return a},this.getExtCRLDistributionPointsURI=function(){var e=this.getExtInfo("cRLDistributionPoints");if(void 0===e)return e;for(var r=new Array,n=t(this.hex,e.vidx),o=0;o<n.length;o++)try{var s=hextoutf8(i(this.hex,n[o],[0,0,0],"86"));r.push(s)}catch(e){}return r},this.getExtAIAInfo=function(){var e=this.getExtInfo("authorityInfoAccess");if(void 0===e)return e;for(var r={ocsp:[],caissuer:[]},n=t(this.hex,e.vidx),o=0;o<n.length;o++){var s=i(this.hex,n[o],[0],"06"),a=i(this.hex,n[o],[1],"86");"2b06010505073001"===s&&r.ocsp.push(hextoutf8(a)),"2b06010505073002"===s&&r.caissuer.push(hextoutf8(a))}return r},this.getExtCertificatePolicies=function(){var e=this.getExtInfo("certificatePolicies");if(void 0===e)return e;for(var o=n(this.hex,e.vidx),s=[],a=t(o,0),c=0;c<a.length;c++){var h={},f=t(o,a[c]);if(h.id=u(r(o,f[0])),2===f.length)for(var l=t(o,f[1]),g=0;g<l.length;g++){var p=i(o,l[g],[0],"06");"2b06010505070201"===p?h.cps=hextoutf8(i(o,l[g],[1])):"2b06010505070202"===p&&(h.unotice=hextoutf8(i(o,l[g],[1,0])))}s.push(h)}return s},this.readCertPEM=function(e){this.readCertHex(h(e))},this.readCertHex=function(e){this.hex=e,this.getVersion();try{s(this.hex,0,[0,7],"a3"),this.parseExt()}catch(e){}},this.getInfo=function(){var e,t,r;if(e="Basic Fields\n",e+="  serial number: "+this.getSerialNumberHex()+"\n",e+="  signature algorithm: "+this.getSignatureAlgorithmField()+"\n",e+="  issuer: "+this.getIssuerString()+"\n",e+="  notBefore: "+this.getNotBefore()+"\n",e+="  notAfter: "+this.getNotAfter()+"\n",e+="  subject: "+this.getSubjectString()+"\n",e+="  subject public key info: \n",e+="    key algorithm: "+(t=this.getPublicKey()).type+"\n","RSA"===t.type&&(e+="    n="+hextoposhex(t.n.toString(16)).substr(0,16)+"...\n",e+="    e="+hextoposhex(t.e.toString(16))+"\n"),void 0!==(r=this.aExtInfo)&&null!==r){e+="X509v3 Extensions:\n";for(var n=0;n<r.length;n++){var i=r[n],o=K.asn1.x509.OID.oid2name(i.oid);""===o&&(o=i.oid);var s="";if(!0===i.critical&&(s="CRITICAL"),e+="  "+o+" "+s+":\n","basicConstraints"===o){var a=this.getExtBasicConstraints();void 0===a.cA?e+="    {}\n":(e+="    cA=true",void 0!==a.pathLen&&(e+=", pathLen="+a.pathLen),e+="\n")}else if("keyUsage"===o)e+="    "+this.getExtKeyUsageString()+"\n";else if("subjectKeyIdentifier"===o)e+="    "+this.getExtSubjectKeyIdentifier()+"\n";else if("authorityKeyIdentifier"===o){var u=this.getExtAuthorityKeyIdentifier();void 0!==u.kid&&(e+="    kid="+u.kid+"\n")}else{if("extKeyUsage"===o)e+="    "+this.getExtExtKeyUsageName().join(", ")+"\n";else if("subjectAltName"===o)e+="    "+this.getExtSubjectAltName2()+"\n";else if("cRLDistributionPoints"===o)e+="    "+this.getExtCRLDistributionPointsURI()+"\n";else if("authorityInfoAccess"===o){var c=this.getExtAIAInfo();void 0!==c.ocsp&&(e+="    ocsp: "+c.ocsp.join(",")+"\n"),void 0!==c.caissuer&&(e+="    caissuer: "+c.caissuer.join(",")+"\n")}else if("certificatePolicies"===o)for(var h=this.getExtCertificatePolicies(),f=0;f<h.length;f++)void 0!==h[f].id&&(e+="    policy oid: "+h[f].id+"\n"),void 0!==h[f].cps&&(e+="    cps: "+h[f].cps+"\n")}}}return e+="signature algorithm: "+this.getSignatureAlgorithmName()+"\n",e+="signature: "+this.getSignatureValueHex().substr(0,16)+"...\n"}}Y.compile("[^0-9a-f]","gi"),RSAKey.prototype.sign=function(e,t){var r=function b(e){return K.crypto.Util.hashString(e,t)}(e);return this.signWithMessageHash(r,t)},RSAKey.prototype.signWithMessageHash=function(e,t){var r=parseBigInt(K.crypto.Util.getPaddedDigestInfoHex(e,t,this.n.bitLength()),16);return _zeroPaddingOfSignature(this.doPrivate(r).toString(16),this.n.bitLength())},RSAKey.prototype.signPSS=function(e,t,r){var n=function c(e){return K.crypto.Util.hashHex(e,t)}(rstrtohex(e));return void 0===r&&(r=-1),this.signWithMessageHashPSS(n,t,r)},RSAKey.prototype.signWithMessageHashPSS=function(e,t,r){var n,i=hextorstr(e),s=i.length,a=this.n.bitLength()-1,u=Math.ceil(a/8),c=function o(e){return K.crypto.Util.hashHex(e,t)};if(-1===r||void 0===r)r=s;else if(-2===r)r=u-s-2;else if(r<-2)throw"invalid salt length";if(u<s+r+2)throw"data too long";var h="";r>0&&(h=new Array(r),(new SecureRandom).nextBytes(h),h=String.fromCharCode.apply(String,h));var f=hextorstr(c(rstrtohex("\0\0\0\0\0\0\0\0"+i+h))),l=[];for(n=0;n<u-r-s-2;n+=1)l[n]=0;var g=String.fromCharCode.apply(String,l)+""+h,p=pss_mgf1_str(f,g.length,c),d=[];for(n=0;n<g.length;n+=1)d[n]=g.charCodeAt(n)^p.charCodeAt(n);var v=65280>>8*u-a&255;for(d[0]&=~v,n=0;n<s;n++)d.push(f.charCodeAt(n));return d.push(188),_zeroPaddingOfSignature(this.doPrivate(new BigInteger(d)).toString(16),this.n.bitLength())},RSAKey.prototype.verify=function(e,t){var r=parseBigInt(t=(t=t.replace(Y,"")).replace(/[ \n]+/g,""),16);if(r.bitLength()>this.n.bitLength())return 0;var n=_rsasign_getAlgNameAndHashFromHexDisgestInfo(this.doPublic(r).toString(16).replace(/^1f+00/,""));if(0==n.length)return!1;var i=n[0];return n[1]==function a(e){return K.crypto.Util.hashString(e,i)}(e)},RSAKey.prototype.verifyWithMessageHash=function(e,t){var r=parseBigInt(t=(t=t.replace(Y,"")).replace(/[ \n]+/g,""),16);if(r.bitLength()>this.n.bitLength())return 0;var n=_rsasign_getAlgNameAndHashFromHexDisgestInfo(this.doPublic(r).toString(16).replace(/^1f+00/,""));if(0==n.length)return!1;n[0];return n[1]==e},RSAKey.prototype.verifyPSS=function(t,r,n,i){var o=function e(t){return K.crypto.Util.hashHex(t,n)}(rstrtohex(t));return void 0===i&&(i=-1),this.verifyWithMessageHashPSS(o,r,n,i)},RSAKey.prototype.verifyWithMessageHashPSS=function(e,t,n,i){var o=new BigInteger(t,16);if(o.bitLength()>this.n.bitLength())return!1;var s,a=function r(e){return K.crypto.Util.hashHex(e,n)},u=hextorstr(e),c=u.length,h=this.n.bitLength()-1,f=Math.ceil(h/8);if(-1===i||void 0===i)i=c;else if(-2===i)i=f-c-2;else if(i<-2)throw"invalid salt length";if(f<c+i+2)throw"data too long";var l=this.doPublic(o).toByteArray();for(s=0;s<l.length;s+=1)l[s]&=255;for(;l.length<f;)l.unshift(0);if(188!==l[f-1])throw"encoded message does not end in 0xbc";var g=(l=String.fromCharCode.apply(String,l)).substr(0,f-c-1),p=l.substr(g.length,c),d=65280>>8*f-h&255;if(0!=(g.charCodeAt(0)&d))throw"bits beyond keysize not zero";var v=pss_mgf1_str(p,g.length,a),y=[];for(s=0;s<g.length;s+=1)y[s]=g.charCodeAt(s)^v.charCodeAt(s);y[0]&=~d;var m=f-c-i-2;for(s=0;s<m;s+=1)if(0!==y[s])throw"leftmost octets not zero";if(1!==y[m])throw"0x01 marker not found";return p===hextorstr(a(rstrtohex("\0\0\0\0\0\0\0\0"+u+String.fromCharCode.apply(String,y.slice(-i)))))},RSAKey.SALT_LEN_HLEN=-1,RSAKey.SALT_LEN_MAX=-2,RSAKey.SALT_LEN_RECOVER=-2,X509.hex2dn=function(e,t){if(void 0===t&&(t=0),"30"!==e.substr(t,2))throw"malformed DN";for(var r=new Array,n=J.getChildIdx(e,t),i=0;i<n.length;i++)r.push(X509.hex2rdn(e,n[i]));return"/"+(r=r.map(function(e){return e.replace("/","\\/")})).join("/")},X509.hex2rdn=function(e,t){if(void 0===t&&(t=0),"31"!==e.substr(t,2))throw"malformed RDN";for(var r=new Array,n=J.getChildIdx(e,t),i=0;i<n.length;i++)r.push(X509.hex2attrTypeValue(e,n[i]));return(r=r.map(function(e){return e.replace("+","\\+")})).join("+")},X509.hex2attrTypeValue=function(e,t){var r=J,n=r.getV;if(void 0===t&&(t=0),"30"!==e.substr(t,2))throw"malformed attribute type and value";var i=r.getChildIdx(e,t);2!==i.length||e.substr(i[0],2);var o=n(e,i[0]),s=K.asn1.ASN1Util.oidHexToInt(o);return K.asn1.x509.OID.oid2atype(s)+"="+hextorstr(n(e,i[1]))},X509.getPublicKeyFromCertHex=function(e){var t=new X509;return t.readCertHex(e),t.getPublicKey()},X509.getPublicKeyFromCertPEM=function(e){var t=new X509;return t.readCertPEM(e),t.getPublicKey()},X509.getPublicKeyInfoPropOfCertPEM=function(e){var t,r,n=J.getVbyList,i={};return i.algparam=null,(t=new X509).readCertPEM(e),r=t.getPublicKeyHex(),i.keyhex=n(r,0,[1],"03").substr(2),i.algoid=n(r,0,[0,0],"06"),"2a8648ce3d0201"===i.algoid&&(i.algparam=n(r,0,[0,1],"06")),i},X509.KEYUSAGE_NAME=["digitalSignature","nonRepudiation","keyEncipherment","dataEncipherment","keyAgreement","keyCertSign","cRLSign","encipherOnly","decipherOnly"],void 0!==K&&K||(K={}),void 0!==K.jws&&K.jws||(K.jws={}),K.jws.JWS=function(){var e=K.jws.JWS.isSafeJSONString;this.parseJWS=function(t,r){if(void 0===this.parsedJWS||!r&&void 0===this.parsedJWS.sigvalH){var n=t.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);if(null==n)throw"JWS signature is not a form of 'Head.Payload.SigValue'.";var i=n[1],o=n[2],s=n[3],a=i+"."+o;if(this.parsedJWS={},this.parsedJWS.headB64U=i,this.parsedJWS.payloadB64U=o,this.parsedJWS.sigvalB64U=s,this.parsedJWS.si=a,!r){var u=b64utohex(s),c=parseBigInt(u,16);this.parsedJWS.sigvalH=u,this.parsedJWS.sigvalBI=c}var h=W(i),f=W(o);if(this.parsedJWS.headS=h,this.parsedJWS.payloadS=f,!e(h,this.parsedJWS,"headP"))throw"malformed JSON string for JWS Head: "+h}}},K.jws.JWS.sign=function(e,t,r,n,o){var s,a,u,c=K,h=c.jws.JWS,f=h.readSafeJSONString,l=h.isSafeJSONString,g=c.crypto,p=(g.ECDSA,g.Mac),d=g.Signature,v=JSON;if("string"!=typeof t&&"object"!=(void 0===t?"undefined":i(t)))throw"spHeader must be JSON string or object: "+t;if("object"==(void 0===t?"undefined":i(t))&&(a=t,s=v.stringify(a)),"string"==typeof t){if(!l(s=t))throw"JWS Head is not safe JSON string: "+s;a=f(s)}if(u=r,"object"==(void 0===r?"undefined":i(r))&&(u=v.stringify(r)),""!=e&&null!=e||void 0===a.alg||(e=a.alg),""!=e&&null!=e&&void 0===a.alg&&(a.alg=e,s=v.stringify(a)),e!==a.alg)throw"alg and sHeader.alg doesn't match: "+e+"!="+a.alg;var y=null;if(void 0===h.jwsalg2sigalg[e])throw"unsupported alg name: "+e;y=h.jwsalg2sigalg[e];var m=q(s)+"."+q(u),S="";if("Hmac"==y.substr(0,4)){if(void 0===n)throw"mac key shall be specified for HS* alg";var F=new p({alg:y,prov:"cryptojs",pass:n});F.updateString(m),S=F.doFinal()}else{var b;if(-1!=y.indexOf("withECDSA"))(b=new d({alg:y})).init(n,o),b.updateString(m),hASN1Sig=b.sign(),S=K.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig);else if("none"!=y)(b=new d({alg:y})).init(n,o),b.updateString(m),S=b.sign()}return m+"."+hextob64u(S)},K.jws.JWS.verify=function(e,t,r){var n,o=K,s=o.jws.JWS,a=s.readSafeJSONString,u=o.crypto,c=u.ECDSA,h=u.Mac,f=u.Signature;void 0!==i(RSAKey)&&(n=RSAKey);var l=e.split(".");if(3!==l.length)return!1;var g=l[0]+"."+l[1],p=b64utohex(l[2]),d=a(W(l[0])),v=null,y=null;if(void 0===d.alg)throw"algorithm not specified in header";if((y=(v=d.alg).substr(0,2),null!=r&&"[object Array]"===Object.prototype.toString.call(r)&&r.length>0)&&-1==(":"+r.join(":")+":").indexOf(":"+v+":"))throw"algorithm '"+v+"' not accepted in the list";if("none"!=v&&null===t)throw"key shall be specified to verify.";if("string"==typeof t&&-1!=t.indexOf("-----BEGIN ")&&(t=z.getKey(t)),!("RS"!=y&&"PS"!=y||t instanceof n))throw"key shall be a RSAKey obj for RS* and PS* algs";if("ES"==y&&!(t instanceof c))throw"key shall be a ECDSA obj for ES* algs";var m=null;if(void 0===s.jwsalg2sigalg[d.alg])throw"unsupported alg name: "+v;if("none"==(m=s.jwsalg2sigalg[v]))throw"not supported";if("Hmac"==m.substr(0,4)){if(void 0===t)throw"hexadecimal key shall be specified for HMAC";var S=new h({alg:m,pass:t});return S.updateString(g),p==S.doFinal()}if(-1!=m.indexOf("withECDSA")){var F,b=null;try{b=c.concatSigToASN1Sig(p)}catch(e){return!1}return(F=new f({alg:m})).init(t),F.updateString(g),F.verify(b)}return(F=new f({alg:m})).init(t),F.updateString(g),F.verify(p)},K.jws.JWS.parse=function(e){var t,r,n,i=e.split("."),o={};if(2!=i.length&&3!=i.length)throw"malformed sJWS: wrong number of '.' splitted elements";return t=i[0],r=i[1],3==i.length&&(n=i[2]),o.headerObj=K.jws.JWS.readSafeJSONString(W(t)),o.payloadObj=K.jws.JWS.readSafeJSONString(W(r)),o.headerPP=JSON.stringify(o.headerObj,null,"  "),null==o.payloadObj?o.payloadPP=W(r):o.payloadPP=JSON.stringify(o.payloadObj,null,"  "),void 0!==n&&(o.sigHex=b64utohex(n)),o},K.jws.JWS.verifyJWT=function(e,t,r){var n=K.jws,o=n.JWS,s=o.readSafeJSONString,a=o.inArray,u=o.includedArray,c=e.split("."),h=c[0],f=c[1],l=(b64utohex(c[2]),s(W(h))),g=s(W(f));if(void 0===l.alg)return!1;if(void 0===r.alg)throw"acceptField.alg shall be specified";if(!a(l.alg,r.alg))return!1;if(void 0!==g.iss&&"object"===i(r.iss)&&!a(g.iss,r.iss))return!1;if(void 0!==g.sub&&"object"===i(r.sub)&&!a(g.sub,r.sub))return!1;if(void 0!==g.aud&&"object"===i(r.aud))if("string"==typeof g.aud){if(!a(g.aud,r.aud))return!1}else if("object"==i(g.aud)&&!u(g.aud,r.aud))return!1;var p=n.IntDate.getNow();return void 0!==r.verifyAt&&"number"==typeof r.verifyAt&&(p=r.verifyAt),void 0!==r.gracePeriod&&"number"==typeof r.gracePeriod||(r.gracePeriod=0),!(void 0!==g.exp&&"number"==typeof g.exp&&g.exp+r.gracePeriod<p)&&(!(void 0!==g.nbf&&"number"==typeof g.nbf&&p<g.nbf-r.gracePeriod)&&(!(void 0!==g.iat&&"number"==typeof g.iat&&p<g.iat-r.gracePeriod)&&((void 0===g.jti||void 0===r.jti||g.jti===r.jti)&&!!o.verify(e,t,r.alg))))},K.jws.JWS.includedArray=function(e,t){var r=K.jws.JWS.inArray;if(null===e)return!1;if("object"!==(void 0===e?"undefined":i(e)))return!1;if("number"!=typeof e.length)return!1;for(var n=0;n<e.length;n++)if(!r(e[n],t))return!1;return!0},K.jws.JWS.inArray=function(e,t){if(null===t)return!1;if("object"!==(void 0===t?"undefined":i(t)))return!1;if("number"!=typeof t.length)return!1;for(var r=0;r<t.length;r++)if(t[r]==e)return!0;return!1},K.jws.JWS.jwsalg2sigalg={HS256:"HmacSHA256",HS384:"HmacSHA384",HS512:"HmacSHA512",RS256:"SHA256withRSA",RS384:"SHA384withRSA",RS512:"SHA512withRSA",ES256:"SHA256withECDSA",ES384:"SHA384withECDSA",PS256:"SHA256withRSAandMGF1",PS384:"SHA384withRSAandMGF1",PS512:"SHA512withRSAandMGF1",none:"none"},K.jws.JWS.isSafeJSONString=function(e,t,r){var n=null;try{return"object"!=(void 0===(n=V(e))?"undefined":i(n))?0:n.constructor===Array?0:(t&&(t[r]=n),1)}catch(e){return 0}},K.jws.JWS.readSafeJSONString=function(e){var t=null;try{return"object"!=(void 0===(t=V(e))?"undefined":i(t))?null:t.constructor===Array?null:t}catch(e){return null}},K.jws.JWS.getEncodedSignatureValueFromJWS=function(e){var t=e.match(/^[^.]+\.[^.]+\.([^.]+)$/);if(null==t)throw"JWS signature is not a form of 'Head.Payload.SigValue'.";return t[1]},K.jws.JWS.getJWKthumbprint=function(e){if("RSA"!==e.kty&&"EC"!==e.kty&&"oct"!==e.kty)throw"unsupported algorithm for JWK Thumprint";var t="{";if("RSA"===e.kty){if("string"!=typeof e.n||"string"!=typeof e.e)throw"wrong n and e value for RSA key";t+='"e":"'+e.e+'",',t+='"kty":"'+e.kty+'",',t+='"n":"'+e.n+'"}'}else if("EC"===e.kty){if("string"!=typeof e.crv||"string"!=typeof e.x||"string"!=typeof e.y)throw"wrong crv, x and y value for EC key";t+='"crv":"'+e.crv+'",',t+='"kty":"'+e.kty+'",',t+='"x":"'+e.x+'",',t+='"y":"'+e.y+'"}'}else if("oct"===e.kty){if("string"!=typeof e.k)throw"wrong k value for oct(symmetric) key";t+='"kty":"'+e.kty+'",',t+='"k":"'+e.k+'"}'}var r=rstrtohex(t);return hextob64u(K.crypto.Util.hashHex(r,"sha256"))},K.jws.IntDate={},K.jws.IntDate.get=function(e){var t=K.jws.IntDate,r=t.getNow,n=t.getZulu;if("now"==e)return r();if("now + 1hour"==e)return r()+3600;if("now + 1day"==e)return r()+86400;if("now + 1month"==e)return r()+2592e3;if("now + 1year"==e)return r()+31536e3;if(e.match(/Z$/))return n(e);if(e.match(/^[0-9]+$/))return parseInt(e);throw"unsupported format: "+e},K.jws.IntDate.getZulu=function(e){return zulutosec(e)},K.jws.IntDate.getNow=function(){return~~(new Date/1e3)},K.jws.IntDate.intDate2UTCString=function(e){return new Date(1e3*e).toUTCString()},K.jws.IntDate.intDate2Zulu=function(e){var t=new Date(1e3*e);return("0000"+t.getUTCFullYear()).slice(-4)+("00"+(t.getUTCMonth()+1)).slice(-2)+("00"+t.getUTCDate()).slice(-2)+("00"+t.getUTCHours()).slice(-2)+("00"+t.getUTCMinutes()).slice(-2)+("00"+t.getUTCSeconds()).slice(-2)+"Z"},t.SecureRandom=SecureRandom,t.rng_seed_time=rng_seed_time,t.BigInteger=BigInteger,t.RSAKey=RSAKey,t.ECDSA=K.crypto.ECDSA,t.DSA=K.crypto.DSA,t.Signature=K.crypto.Signature,t.MessageDigest=K.crypto.MessageDigest,t.Mac=K.crypto.Mac,t.Cipher=K.crypto.Cipher,t.KEYUTIL=z,t.ASN1HEX=J,t.X509=X509,t.CryptoJS=y,t.b64tohex=b64tohex,t.b64toBA=b64toBA,t.stoBA=stoBA,t.BAtos=BAtos,t.BAtohex=BAtohex,t.stohex=stohex,t.stob64=function stob64(e){return hex2b64(stohex(e))},t.stob64u=function stob64u(e){return b64tob64u(hex2b64(stohex(e)))},t.b64utos=function b64utos(e){return BAtos(b64toBA(b64utob64(e)))},t.b64tob64u=b64tob64u,t.b64utob64=b64utob64,t.hex2b64=hex2b64,t.hextob64u=hextob64u,t.b64utohex=b64utohex,t.utf8tob64u=q,t.b64utoutf8=W,t.utf8tob64=function utf8tob64(e){return hex2b64(uricmptohex(encodeURIComponentAll(e)))},t.b64toutf8=function b64toutf8(e){return decodeURIComponent(hextouricmp(b64tohex(e)))},t.utf8tohex=utf8tohex,t.hextoutf8=hextoutf8,t.hextorstr=hextorstr,t.rstrtohex=rstrtohex,t.hextob64=hextob64,t.hextob64nl=hextob64nl,t.b64nltohex=b64nltohex,t.hextopem=hextopem,t.pemtohex=pemtohex,t.hextoArrayBuffer=function hextoArrayBuffer(e){if(e.length%2!=0)throw"input is not even length";if(null==e.match(/^[0-9A-Fa-f]+$/))throw"input is not hexadecimal";for(var t=new ArrayBuffer(e.length/2),r=new DataView(t),n=0;n<e.length/2;n++)r.setUint8(n,parseInt(e.substr(2*n,2),16));return t},t.ArrayBuffertohex=function ArrayBuffertohex(e){for(var t="",r=new DataView(e),n=0;n<e.byteLength;n++)t+=("00"+r.getUint8(n).toString(16)).slice(-2);return t},t.zulutomsec=zulutomsec,t.zulutosec=zulutosec,t.zulutodate=function zulutodate(e){return new Date(zulutomsec(e))},t.datetozulu=function datetozulu(e,t,r){var n,i=e.getUTCFullYear();if(t){if(i<1950||2049<i)throw"not proper year for UTCTime: "+i;n=(""+i).slice(-2)}else n=("000"+i).slice(-4);if(n+=("0"+(e.getUTCMonth()+1)).slice(-2),n+=("0"+e.getUTCDate()).slice(-2),n+=("0"+e.getUTCHours()).slice(-2),n+=("0"+e.getUTCMinutes()).slice(-2),n+=("0"+e.getUTCSeconds()).slice(-2),r){var o=e.getUTCMilliseconds();0!==o&&(n+="."+(o=(o=("00"+o).slice(-3)).replace(/0+$/g,"")))}return n+="Z"},t.uricmptohex=uricmptohex,t.hextouricmp=hextouricmp,t.ipv6tohex=ipv6tohex,t.hextoipv6=hextoipv6,t.hextoip=hextoip,t.iptohex=function iptohex(e){var t="malformed IP address";if(!(e=e.toLowerCase(e)).match(/^[0-9.]+$/)){if(e.match(/^[0-9a-f:]+$/)&&-1!==e.indexOf(":"))return ipv6tohex(e);throw t}var r=e.split(".");if(4!==r.length)throw t;var n="";try{for(var i=0;i<4;i++)n+=("0"+parseInt(r[i]).toString(16)).slice(-2);return n}catch(e){throw t}},t.encodeURIComponentAll=encodeURIComponentAll,t.newline_toUnix=function newline_toUnix(e){return e=e.replace(/\r\n/gm,"\n")},t.newline_toDos=function newline_toDos(e){return e=(e=e.replace(/\r\n/gm,"\n")).replace(/\n/gm,"\r\n")},t.hextoposhex=hextoposhex,t.intarystrtohex=function intarystrtohex(e){e=(e=(e=e.replace(/^\s*\[\s*/,"")).replace(/\s*\]\s*$/,"")).replace(/\s*/g,"");try{return e.split(/,/).map(function(e,t,r){var n=parseInt(e);if(n<0||255<n)throw"integer not in range 0-255";return("00"+n.toString(16)).slice(-2)}).join("")}catch(e){throw"malformed integer array string: "+e}},t.strdiffidx=function strdiffidx(e,t){var r=e.length;e.length>t.length&&(r=t.length);for(var n=0;n<r;n++)if(e.charCodeAt(n)!=t.charCodeAt(n))return n;return e.length!=t.length?r:-1},t.KJUR=K,t.crypto=K.crypto,t.asn1=K.asn1,t.jws=K.jws,t.lang=K.lang}).call(this,r(40).Buffer)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.JoseUtil=void 0;var n=r(41),i=r(0);var o=["RS256","RS384","RS512","PS256","PS384","PS512","ES256","ES384","ES512"];t.JoseUtil=function(){function JoseUtil(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,JoseUtil)}return JoseUtil.parseJwt=function parseJwt(e){i.Log.debug("JoseUtil.parseJwt");try{var t=n.jws.JWS.parse(e);return{header:t.headerObj,payload:t.payloadObj}}catch(e){i.Log.error(e)}},JoseUtil.validateJwt=function validateJwt(e,t,r,o,s,a){i.Log.debug("JoseUtil.validateJwt");try{if("RSA"===t.kty)if(t.e&&t.n)t=n.KEYUTIL.getKey(t);else{if(!t.x5c||!t.x5c.length)return i.Log.error("JoseUtil.validateJwt: RSA key missing key material",t),Promise.reject(new Error("RSA key missing key material"));var u=(0,n.b64tohex)(t.x5c[0]);t=n.X509.getPublicKeyFromCertHex(u)}else{if("EC"!==t.kty)return i.Log.error("JoseUtil.validateJwt: Unsupported key type",t&&t.kty),Promise.reject(new Error("Unsupported key type: "+t&&t.kty));if(!(t.crv&&t.x&&t.y))return i.Log.error("JoseUtil.validateJwt: EC key missing key material",t),Promise.reject(new Error("EC key missing key material"));t=n.KEYUTIL.getKey(t)}return JoseUtil._validateJwt(e,t,r,o,s,a)}catch(e){return i.Log.error(e&&e.message||e),Promise.reject("JWT validation failed")}},JoseUtil._validateJwt=function _validateJwt(e,t,r,s,a,u){a||(a=0),u||(u=parseInt(Date.now()/1e3));var c=JoseUtil.parseJwt(e).payload;if(!c.iss)return i.Log.error("JoseUtil._validateJwt: issuer was not provided"),Promise.reject(new Error("issuer was not provided"));if(c.iss!==r)return i.Log.error("JoseUtil._validateJwt: Invalid issuer in token",c.iss),Promise.reject(new Error("Invalid issuer in token: "+c.iss));if(!c.aud)return i.Log.error("JoseUtil._validateJwt: aud was not provided"),Promise.reject(new Error("aud was not provided"));if(!(c.aud===s||Array.isArray(c.aud)&&c.aud.indexOf(s)>=0))return i.Log.error("JoseUtil._validateJwt: Invalid audience in token",c.aud),Promise.reject(new Error("Invalid audience in token: "+c.aud));var h=u+a,f=u-a;if(!c.iat)return i.Log.error("JoseUtil._validateJwt: iat was not provided"),Promise.reject(new Error("iat was not provided"));if(h<c.iat)return i.Log.error("JoseUtil._validateJwt: iat is in the future",c.iat),Promise.reject(new Error("iat is in the future: "+c.iat));if(c.nbf&&h<c.nbf)return i.Log.error("JoseUtil._validateJwt: nbf is in the future",c.nbf),Promise.reject(new Error("nbf is in the future: "+c.nbf));if(!c.exp)return i.Log.error("JoseUtil._validateJwt: exp was not provided"),Promise.reject(new Error("exp was not provided"));if(c.exp<f)return i.Log.error("JoseUtil._validateJwt: exp is in the past",c.exp),Promise.reject(new Error("exp is in the past:"+c.exp));try{if(!n.jws.JWS.verify(e,t,o))return i.Log.error("JoseUtil._validateJwt: signature validation failed"),Promise.reject(new Error("signature validation failed"))}catch(e){return i.Log.error(e&&e.message||e),Promise.reject(new Error("signature validation failed"))}return Promise.resolve()},JoseUtil.hashString=function hashString(e,t){try{return n.crypto.Util.hashString(e,t)}catch(e){i.Log.error(e)}},JoseUtil.hexToBase64Url=function hexToBase64Url(e){try{return(0,n.hextob64u)(e)}catch(e){i.Log.error(e)}},JoseUtil}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserInfoService=void 0;var n=r(17),i=r(3),o=r(0);t.UserInfoService=function(){function UserInfoService(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.JsonService,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.MetadataService;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,UserInfoService),!e)throw o.Log.error("UserInfoService.ctor: No settings passed"),new Error("settings");this._settings=e,this._jsonService=new t,this._metadataService=new r(this._settings)}return UserInfoService.prototype.getClaims=function getClaims(e){var t=this;return e?this._metadataService.getUserInfoEndpoint().then(function(r){return o.Log.debug("UserInfoService.getClaims: received userinfo url",r),t._jsonService.getJson(r,e).then(function(e){return o.Log.debug("UserInfoService.getClaims: claims received",e),e})}):(o.Log.error("UserInfoService.getClaims: No token passed"),Promise.reject(new Error("A token is required")))},UserInfoService}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ResponseValidator=void 0;var n=r(0),i=r(3),o=r(43),s=r(16),a=r(42);var u=["nonce","at_hash","iat","nbf","exp","aud","iss","c_hash"];t.ResponseValidator=function(){function ResponseValidator(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.MetadataService,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o.UserInfoService,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:a.JoseUtil;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ResponseValidator),!e)throw n.Log.error("ResponseValidator.ctor: No settings passed to ResponseValidator"),new Error("settings");this._settings=e,this._metadataService=new t(this._settings),this._userInfoService=new r(this._settings),this._joseUtil=s}return ResponseValidator.prototype.validateSigninResponse=function validateSigninResponse(e,t){var r=this;return n.Log.debug("ResponseValidator.validateSigninResponse"),this._processSigninParams(e,t).then(function(t){return n.Log.debug("ResponseValidator.validateSigninResponse: state processed"),r._validateTokens(e,t).then(function(e){return n.Log.debug("ResponseValidator.validateSigninResponse: tokens validated"),r._processClaims(e).then(function(e){return n.Log.debug("ResponseValidator.validateSigninResponse: claims processed"),e})})})},ResponseValidator.prototype.validateSignoutResponse=function validateSignoutResponse(e,t){return e.id!==t.state?(n.Log.error("ResponseValidator.validateSignoutResponse: State does not match"),Promise.reject(new Error("State does not match"))):(n.Log.debug("ResponseValidator.validateSignoutResponse: state validated"),t.state=e.data,t.error?(n.Log.warn("ResponseValidator.validateSignoutResponse: Response was error",t.error),Promise.reject(new s.ErrorResponse(t))):Promise.resolve(t))},ResponseValidator.prototype._processSigninParams=function _processSigninParams(e,t){if(e.id!==t.state)return n.Log.error("ResponseValidator._processSigninParams: State does not match"),Promise.reject(new Error("State does not match"));if(!e.client_id)return n.Log.error("ResponseValidator._processSigninParams: No client_id on state"),Promise.reject(new Error("No client_id on state"));if(!e.authority)return n.Log.error("ResponseValidator._processSigninParams: No authority on state"),Promise.reject(new Error("No authority on state"));if(this._settings.authority){if(this._settings.authority&&this._settings.authority!==e.authority)return n.Log.error("ResponseValidator._processSigninParams: authority mismatch on settings vs. signin state"),Promise.reject(new Error("authority mismatch on settings vs. signin state"))}else this._settings.authority=e.authority;if(this._settings.client_id){if(this._settings.client_id&&this._settings.client_id!==e.client_id)return n.Log.error("ResponseValidator._processSigninParams: client_id mismatch on settings vs. signin state"),Promise.reject(new Error("client_id mismatch on settings vs. signin state"))}else this._settings.client_id=e.client_id;return n.Log.debug("ResponseValidator._processSigninParams: state validated"),t.state=e.data,t.error?(n.Log.warn("ResponseValidator._processSigninParams: Response was error",t.error),Promise.reject(new s.ErrorResponse(t))):e.nonce&&!t.id_token?(n.Log.error("ResponseValidator._processSigninParams: Expecting id_token in response"),Promise.reject(new Error("No id_token in response"))):!e.nonce&&t.id_token?(n.Log.error("ResponseValidator._processSigninParams: Not expecting id_token in response"),Promise.reject(new Error("Unexpected id_token in response"))):Promise.resolve(t)},ResponseValidator.prototype._processClaims=function _processClaims(e){var t=this;if(e.isOpenIdConnect){if(n.Log.debug("ResponseValidator._processClaims: response is OIDC, processing claims"),e.profile=this._filterProtocolClaims(e.profile),this._settings.loadUserInfo&&e.access_token)return n.Log.debug("ResponseValidator._processClaims: loading user info"),this._userInfoService.getClaims(e.access_token).then(function(r){return n.Log.debug("ResponseValidator._processClaims: user info claims received from user info endpoint"),r.sub!==e.profile.sub?(n.Log.error("ResponseValidator._processClaims: sub from user info endpoint does not match sub in access_token"),Promise.reject(new Error("sub from user info endpoint does not match sub in access_token"))):(e.profile=t._mergeClaims(e.profile,r),n.Log.debug("ResponseValidator._processClaims: user info claims received, updated profile:",e.profile),e)});n.Log.debug("ResponseValidator._processClaims: not loading user info")}else n.Log.debug("ResponseValidator._processClaims: response is not OIDC, not processing claims");return Promise.resolve(e)},ResponseValidator.prototype._mergeClaims=function _mergeClaims(e,t){var r=Object.assign({},e);for(var n in t){var i=t[n];Array.isArray(i)||(i=[i]);for(var o=0;o<i.length;o++){var s=i[o];r[n]?Array.isArray(r[n])?r[n].indexOf(s)<0&&r[n].push(s):r[n]!==s&&(r[n]=[r[n],s]):r[n]=s}}return r},ResponseValidator.prototype._filterProtocolClaims=function _filterProtocolClaims(e){n.Log.debug("ResponseValidator._filterProtocolClaims, incoming claims:",e);var t=Object.assign({},e);return this._settings._filterProtocolClaims?(u.forEach(function(e){delete t[e]}),n.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims filtered",t)):n.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims not filtered"),t},ResponseValidator.prototype._validateTokens=function _validateTokens(e,t){return t.id_token?t.access_token?(n.Log.debug("ResponseValidator._validateTokens: Validating id_token and access_token"),this._validateIdTokenAndAccessToken(e,t)):(n.Log.debug("ResponseValidator._validateTokens: Validating id_token"),this._validateIdToken(e,t)):(n.Log.debug("ResponseValidator._validateTokens: No id_token to validate"),Promise.resolve(t))},ResponseValidator.prototype._validateIdTokenAndAccessToken=function _validateIdTokenAndAccessToken(e,t){var r=this;return this._validateIdToken(e,t).then(function(e){return r._validateAccessToken(e)})},ResponseValidator.prototype._validateIdToken=function _validateIdToken(e,t){var r=this;if(!e.nonce)return n.Log.error("ResponseValidator._validateIdToken: No nonce on state"),Promise.reject(new Error("No nonce on state"));var i=this._joseUtil.parseJwt(t.id_token);if(!i||!i.header||!i.payload)return n.Log.error("ResponseValidator._validateIdToken: Failed to parse id_token",i),Promise.reject(new Error("Failed to parse id_token"));if(e.nonce!==i.payload.nonce)return n.Log.error("ResponseValidator._validateIdToken: Invalid nonce in id_token"),Promise.reject(new Error("Invalid nonce in id_token"));var o=i.header.kid;return this._metadataService.getIssuer().then(function(s){return n.Log.debug("ResponseValidator._validateIdToken: Received issuer"),r._metadataService.getSigningKeys().then(function(a){if(!a)return n.Log.error("ResponseValidator._validateIdToken: No signing keys from metadata"),Promise.reject(new Error("No signing keys from metadata"));n.Log.debug("ResponseValidator._validateIdToken: Received signing keys");var u=void 0;if(o)u=a.filter(function(e){return e.kid===o})[0];else{if((a=r._filterByAlg(a,i.header.alg)).length>1)return n.Log.error("ResponseValidator._validateIdToken: No kid found in id_token and more than one key found in metadata"),Promise.reject(new Error("No kid found in id_token and more than one key found in metadata"));u=a[0]}if(!u)return n.Log.error("ResponseValidator._validateIdToken: No key matching kid or alg found in signing keys"),Promise.reject(new Error("No key matching kid or alg found in signing keys"));var c=e.client_id,h=r._settings.clockSkew;return n.Log.debug("ResponseValidator._validateIdToken: Validaing JWT; using clock skew (in seconds) of: ",h),r._joseUtil.validateJwt(t.id_token,u,s,c,h).then(function(){return n.Log.debug("ResponseValidator._validateIdToken: JWT validation successful"),i.payload.sub?(t.profile=i.payload,t):(n.Log.error("ResponseValidator._validateIdToken: No sub present in id_token"),Promise.reject(new Error("No sub present in id_token")))})})})},ResponseValidator.prototype._filterByAlg=function _filterByAlg(e,t){var r=null;if(t.startsWith("RS"))r="RSA";else if(t.startsWith("PS"))r="PS";else{if(!t.startsWith("ES"))return n.Log.debug("ResponseValidator._filterByAlg: alg not supported: ",t),[];r="EC"}return n.Log.debug("ResponseValidator._filterByAlg: Looking for keys that match kty: ",r),e=e.filter(function(e){return e.kty===r}),n.Log.debug("ResponseValidator._filterByAlg: Number of keys that match kty: ",r,e.length),e},ResponseValidator.prototype._validateAccessToken=function _validateAccessToken(e){if(!e.profile)return n.Log.error("ResponseValidator._validateAccessToken: No profile loaded from id_token"),Promise.reject(new Error("No profile loaded from id_token"));if(!e.profile.at_hash)return n.Log.error("ResponseValidator._validateAccessToken: No at_hash in id_token"),Promise.reject(new Error("No at_hash in id_token"));if(!e.id_token)return n.Log.error("ResponseValidator._validateAccessToken: No id_token"),Promise.reject(new Error("No id_token"));var t=this._joseUtil.parseJwt(e.id_token);if(!t||!t.header)return n.Log.error("ResponseValidator._validateAccessToken: Failed to parse id_token",t),Promise.reject(new Error("Failed to parse id_token"));var r=t.header.alg;if(!r||5!==r.length)return n.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",r),Promise.reject(new Error("Unsupported alg: "+r));var i=r.substr(2,3);if(!i)return n.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",r,i),Promise.reject(new Error("Unsupported alg: "+r));if(256!==(i=parseInt(i))&&384!==i&&512!==i)return n.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",r,i),Promise.reject(new Error("Unsupported alg: "+r));var o="sha"+i,s=this._joseUtil.hashString(e.access_token,o);if(!s)return n.Log.error("ResponseValidator._validateAccessToken: access_token hash failed:",o),Promise.reject(new Error("Failed to validate at_hash"));var a=s.substr(0,s.length/2),u=this._joseUtil.hexToBase64Url(a);return u!==e.profile.at_hash?(n.Log.error("ResponseValidator._validateAccessToken: Failed to validate at_hash",u,e.profile.at_hash),Promise.reject(new Error("Failed to validate at_hash"))):(n.Log.debug("ResponseValidator._validateAccessToken: success"),Promise.resolve(e))},ResponseValidator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),i=r(18),o=r(6),s=r(5),a=r(31),u=r(30),c=r(12),h=r(3),f=r(20),l=r(19),g=r(9),p=r(8),d=r(10),v=r(1),y=r(13);t.default={Log:n.Log,OidcClient:i.OidcClient,OidcClientSettings:o.OidcClientSettings,WebStorageStateStore:s.WebStorageStateStore,InMemoryWebStorage:a.InMemoryWebStorage,UserManager:u.UserManager,AccessTokenEvents:c.AccessTokenEvents,MetadataService:h.MetadataService,CordovaPopupNavigator:f.CordovaPopupNavigator,CordovaIFrameNavigator:l.CordovaIFrameNavigator,CheckSessionIFrame:g.CheckSessionIFrame,TokenRevocationClient:p.TokenRevocationClient,SessionMonitor:d.SessionMonitor,Global:v.Global,User:y.User},e.exports=t.default}])});
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.authUrl = "http://222.209.94.146:3182";

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = require("./ts/login");
function showHello(divName, name) {
    console.log("sayHelloMytype");
}
showHello("myfistTS", "holle2323123");
login_1.loginModel.events();

},{"./ts/login":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var Oidc = require("oidc-client");
var const_1 = require("../common/const");
var protocol = window.location.protocol;
var local = window.location.hostname;
var port = window.location.port;
console.log(protocol, local, port, "地址信息");
var userManagerConfig = {
    authority: const_1.authUrl,
    client_id: "js",
    automaticSilentRenew: true,
    popup_redirect_uri: protocol + "//" + local + ":" + port,
    post_logout_redirect_uri: protocol + "//" + local + ":" + port + "/user/login#",
    redirect_uri: protocol + "//" + local + ":" + port,
    response_type: "id_token token",
    scope: "openid profile api1",
    filterProtocolClaims: true,
    loadUserInfo: true
};
var manager = new Oidc.UserManager(userManagerConfig);
var user;
manager.events.addUserLoaded(function (loadedUser) {
    user = loadedUser;
    console.log(user, "登录信息");
    window.location.href = "./index.html";
});
manager.signinRedirectCallback(function () {
    window.location.href = "./index.html";
}).catch(function (error) {
    console.error("未捕获到目前信息", error);
});
$(".clear").on("click", function () {
    manager.events.addUserUnloaded(function (e) {
        console.log("用户信息已经卸载!");
    });
    manager.clearStaleState();
    manager.signoutRedirectCallback().then(function (resp) {
        console.log("退出", resp);
    }).catch(function (err) {
        console.log("出错啦", err);
    });
});
$(".login").on("click", function () {
    manager.signinRedirect(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.error("error while logging in through the popup", error);
    });
});
exports.loginModel = {
    events: function events() {
        console.log("111~~~~~~~~~~~~~~~~~~1~");
    }
};

},{"../common/const":3,"jquery":1,"oidc-client":2}]},{},[4])

//# sourceMappingURL=src/layuiadmin/bundle.js.map
