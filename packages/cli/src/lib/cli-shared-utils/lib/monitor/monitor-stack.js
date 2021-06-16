/* eslint-disable */
// @ts-ignore
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var checkEnv = function (window) {
  return function () {
    if (!window || !window.navigator || !window.navigator.userAgent) {
      return '';
    }

    var ua = window.navigator.userAgent;
    var isIos = !!ua.match(/iphone|ipad|iPod/gi);
    var isAndroid = !!ua.match(/android/gi);
    var isFirefox = !!ua.match(/Firefox/gi);
    var isChrome = !!ua.match(/Chrome/gi);
    var isSafari = !ua.match(/Chrome/gi) && !!ua.match(/Safari/gi);
    var isOpera = !!ua.match(/Opera/gi);
    var isIe = !!ua.match(/MSIE/gi);
    var env = '';

    if (isIos) {
      env = 'iOS';
    }

    if (isAndroid) {
      env = 'Android';
    }

    if (isFirefox) {
      env = 'Firefox';
    }

    if (isChrome) {
      env = 'Chrome';
    }

    if (isSafari) {
      env = 'Safari';
    }

    if (isOpera) {
      env = 'Opera';
    }

    if (isIe) {
      env = 'IE';
    }

    return env;
  };
}(undefined);

function checkAndriodSpecial() {
  // todo by white list or else
  return true;
}

var generateHandler = function generateHandler(env) {
  switch (env) {
    case 'iOS':
      return {
        filter: function filter(line) {
          return line.indexOf('[native code]') < 0 && line.indexOf('@') >= 0;
        }
      };

    case 'Android':
      return {
        filter: function filter(line, index) {
          return index && line.indexOf('nonymous') < 0 && checkAndriodSpecial();
        }
      };

    default:
      return {
        filter: function filter() {
          return true;
        }
      };
  }
};

/**
 * copy from blueimp-md5@2.10.0
 * 由于bigfish rollup 打包问题，引入
 */

/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
* Bitwise rotate a 32-bit number to the left.
*/


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
* These functions implement the four basic operations the algorithm uses.
*/


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
/*
* Calculate the MD5 of an array of little-endian words, and a bit length.
*/


function binlMD5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  var i;
  var olda;
  var oldb;
  var oldc;
  var oldd;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
* Convert an array of little-endian words to a string
*/


function binl2rstr(input) {
  var i;
  var output = '';
  var length32 = input.length * 32;

  for (i = 0; i < length32; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
  }

  return output;
}
/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/


function rstr2binl(input) {
  var i;
  var output = [];
  output[(input.length >> 2) - 1] = undefined;

  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }

  var length8 = input.length * 8;

  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
  }

  return output;
}
/*
* Calculate the MD5 of a raw string
*/


function rstrMD5(s) {
  return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}
/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/


function rstrHMACMD5(key, data) {
  var i;
  var bkey = rstr2binl(key);
  var ipad = [];
  var opad = [];
  var hash;
  ipad[15] = opad[15] = undefined;

  if (bkey.length > 16) {
    bkey = binlMD5(bkey, key.length * 8);
  }

  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5c5c5c5c;
  }

  hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}
/*
* Convert a raw string to a hex string
*/


function rstr2hex(input) {
  var hexTab = '0123456789abcdef';
  var output = '';
  var x;
  var i;

  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i);
    output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
  }

  return output;
}
/*
* Encode a string as utf-8
*/


function str2rstrUTF8(input) {
  return unescape(encodeURIComponent(input));
}
/*
* Take string arguments and return either raw or hex encoded strings
*/


function rawMD5(s) {
  return rstrMD5(str2rstrUTF8(s));
}

function hexMD5(s) {
  return rstr2hex(rawMD5(s));
}

function rawHMACMD5(k, d) {
  return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
}

function hexHMACMD5(k, d) {
  return rstr2hex(rawHMACMD5(k, d));
}

function md5(string, key, raw) {
  if (!key) {
    if (!raw) {
      return hexMD5(string);
    }

    return rawMD5(string);
  }

  if (!raw) {
    return hexHMACMD5(key, string);
  }

  return rawHMACMD5(key, string);
}

var ErrorStack = /*#__PURE__*/function () {
  function ErrorStack(env) {
    _classCallCheck(this, ErrorStack);

    this.env = env || checkEnv();
    this.stackFilter = generateHandler(this.env).filter;
  }

  _createClass(ErrorStack, [{
    key: "makeReg",
    value: function makeReg() {
      switch (this.env) {
        case 'iOS':
          return new RegExp('(?:\\s*)\\w+(?=@)|(?:@).*?(?=:\\d*:)|(?::)\\d*(?=:)|(?::)\\d*$', 'g');
        // case 'Android':
        //   return new RegExp('(?<=\\s*)\\w+(?=@)|(?<=@).*?(?=:\\d*:)|(?<=:)\\d*(?=:)|(?<=:)\\d*$', 'g');

        default:
          return null;
      }
    }
  }, {
    key: "stackFormatter",
    value: function stackFormatter(error) {
      var message = error.message,
          stack = error.stack;
      var stackList = [];
      var isAndroid = this.env === 'Android';
      var isIOS = this.env === 'iOS';
      var filterList = stack.split('\n').filter(this.stackFilter);
      filterList.shift();
      var stackStr = filterList.join('\n');
      var reg = this.makeReg();

      if (reg) {
        filterList.map(function (line) {
          var res = line.match(reg);

          if (res) {
            var _res = _slicedToArray(res, 4),
                _res$ = _res[0],
                func = _res$ === void 0 ? '' : _res$,
                _res$2 = _res[1],
                filePath = _res$2 === void 0 ? '' : _res$2,
                _res$3 = _res[2],
                lineNumber = _res$3 === void 0 ? '' : _res$3,
                _res$4 = _res[3],
                locationNumebr = _res$4 === void 0 ? '' : _res$4;

            var funcName = isAndroid ? func.split('.').reverse()[0] : func;
            var gap = isIOS ? 1 : 0;
            stackList.push("at ".concat(funcName, " (").concat(filePath.substr(gap), ":").concat(lineNumber.substr(gap), ":").concat(locationNumebr.substr(gap), ")"));
          } else {
            stackList.push(line);
          }

          return null;
        });
      } else {
        stackList = filterList;
      }

      var hash = this.encryptStack(message, stackList);
      return {
        hash: hash,
        message: message,
        stackList: stackList,
        stackStr: stackStr
      };
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "encryptStack",
    value: function encryptStack(message, stackList) {
      // 抽样取最多10行日志，靠前的取的密
      var stackSampleList = [].concat(_toConsumableArray(stackList.slice(0, 6)), _toConsumableArray(stackList.slice(7, 8)), _toConsumableArray(stackList.slice(9, 10)), _toConsumableArray(stackList.slice(11, 12)), _toConsumableArray(stackList.slice(13, 14)));
      var stackStr = stackSampleList.join(';');
      return md5("".concat(message, ":").concat(stackStr));
    }
  }]);

  return ErrorStack;
}();

/**
 * 解析错误对象中的 stack，并尝试压缩 js
 *
 * 压缩逻辑
 * 1. 提取 stack 中所有的 js 名，并为其附一个简化的标识符，形如 #1#
 * 2. 将 stack 中所有的 xxx.js 替换为对应的标识符
 * 3. 所有的标识符通过 `js名@标识符` 的形式保存，多个组合用 ; 隔开，保存为字段中的 c1
 * 4. 客户端读到 stack 后再按照原规则解析
 *
 * @param  {Object} errorObj 原生 Error
 * @return {string}
 */
var STACK_LENGTH_LIMIT = 20; // regex borrowed from https://github.com/getsentry/raven-js/blob/master/vendor/TraceKit/tracekit.js

var ChromeREGEX = /^\s*at .*? ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::\d+)?(?::\d+)?\)?\s*$/i;
var GeckoREGEX = /^\s*.*?(?:\(.*?\))?(?:^|@)((?:file|https?|blob|chrome|resource|\[native).*?)(?::\d+)?(?::\d+)?\s*$/i;
var WinJSREGEX = /^\s*at (?:(?:\[object object\])?.+ )?\(?((?:file|ms-appx|https?|blob):.*?):\d+(?::\d+)?\)?\s*$/i; // for test

if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process.env.NODE_ENV === 'test') {
  ChromeREGEX = /([^()]+\.spec\.js)/i;
}

function parseStack(arrList) {
  var arr = arrList.slice(0, STACK_LENGTH_LIMIT);
  var result = ['', '']; // 由于 stack 中 js 地址很长，压缩同名的 js，以获得更多的 stack 捕获

  var jsObj = {};
  var identifierIndex = 1;

  for (var i = 0; i < arr.length; i += 1) {
    var matchRegex = ChromeREGEX;
    var matches = (arr[i] || '').match(matchRegex);

    if (matches === null) {
      matchRegex = GeckoREGEX;
      matches = (arr[i] || '').match(matchRegex);
    }

    if (matches === null) {
      matchRegex = WinJSREGEX;
      matches = (arr[i] || '').match(matchRegex);
    }

    if (matches !== null) {
      var jsFile = matches[1];
      var identifier = jsObj[jsFile];

      if (identifier === undefined) {
        jsObj[jsFile] = "#".concat(identifierIndex, "#");
        identifierIndex += 1;
        identifier = jsObj[jsFile];
      }

      arr[i] = arr[i].replace(jsFile, identifier);
    }
  }

  if (arr.length > 0) {
    result[1] = arr.map(function (line) {
      return line.trim();
    }).join("\x03");
  }

  var identifiers = '';

  for (var _jsFile in jsObj) {
    if (jsObj.hasOwnProperty(_jsFile)) {
      identifiers += "".concat(_jsFile, "@").concat(jsObj[_jsFile], ";");
    }
  }

  identifiers = identifiers.replace(/;$/, '');
  result[0] = identifiers;
  return result.join("\x10").replace(/\^/g, "\x04").replace(/=/g, "\x05").replace(/,/g, "\x06");
}

function unParseStack(stackStr) {
  var stack = stackStr && stackStr.split("\x10") || [];

  if (!stack[0] || !stack[1]) {
    return stackStr;
  }

  var jsObj = {};
  var jsFiles = stack[0].split(';');

  for (var i = 0; i < jsFiles.length; i += 1) {
    var files = jsFiles[i] && jsFiles[i].split('@#');
    jsObj["#".concat(files[1])] = files[0];
  }

  return stack[1].replace(/#[0-9]+#/g, function (reg) {
    return jsObj[reg] || '';
  }).replace(/\u0004/g, '^').replace(/\u0005/g, '=').replace(/\u0006/g, ',').split("\x03");
}

var helper = {
  compressStack: function compressStack(stackList) {
    return parseStack(stackList);
  },
  uncompressStack: function uncompressStack(stackStr) {
    return unParseStack(stackStr);
  }
};

var compressStack = helper.compressStack,
    uncompressStack = helper.uncompressStack;

exports.ErrorStack = ErrorStack;
exports.compressStack = compressStack;
exports.uncompressStack = uncompressStack;
