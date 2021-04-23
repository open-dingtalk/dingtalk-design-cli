(function () {
  var $AppxFramework;
  var $AppxRuntime;
  var $AppxRegistry;
  var $AppxStyleRegistry;
  var $global;
  var Component;
  var getApp;
  var my;
  (function (__fragment_exports__) {
    __fragment_exports__.publicComponents.context = {
      setSymbol: function (name, value) {
        switch (name) {
          case "$AppxFramework": $AppxFramework = value; break;
          case "$AppxRuntime": $AppxRuntime = value; break;
          case "$AppxRegistry": $AppxRegistry = value; break;
          case "$AppxStyleRegistry": $AppxStyleRegistry = value; break;
          case "$global": $global = value; break;
          case "Component": Component = value; break;
          case "getApp": getApp = value; break;
          case "my": my = value; break;
          default: return false;
        }
        return true;
      },
      symbols: ["$AppxFramework","$AppxRuntime","$AppxRegistry","$AppxStyleRegistry","$global","Component","getApp","my"]
    };
    if (typeof exports === 'object' && typeof module === 'object') {
      module.exports = __fragment_exports__;
    }
  })(
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+3bn":
/*!*****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_to-integer.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "/N8f":
/*!************************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/polyfills/objectAssign.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, 'assign', {
        value: function assign(target, varArgs) {
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true,
    });
}


/***/ }),

/***/ "/QwB":
/*!**********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_ctx.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "DxYy");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "/VUQ":
/*!*********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_array-includes.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "mIpV");
var toLength = __webpack_require__(/*! ./_to-length */ "j20N");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "p6lt");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 0:
/*!***********************************************************************************************************************!*\
  !*** multi /snapshot/toolkit/node_modules/@ali/antcube-build/lib/build/loader/fragment.js!./component.json?jsonAsESM ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! !/snapshot/toolkit/node_modules/@ali/antcube-build/lib/build/loader/fragment.js!/Users/wuzequan/code/worktab-plugin-sdk/plugin/component.json?jsonAsESM */"ix9Z");


/***/ }),

/***/ "0/mL":
/*!*************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_for-of.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "/QwB");
var call = __webpack_require__(/*! ./_iter-call */ "kley");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "C3cc");
var anObject = __webpack_require__(/*! ./_an-object */ "6k3Y");
var toLength = __webpack_require__(/*! ./_to-length */ "j20N");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "bj1Q");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "0yRZ":
/*!******************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_iter-detect.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "haEp")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "1CFD":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/environment.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ./constants */ "PPxh");
function environment(runtime, framework, virtualEnv) {
    var isWeb = virtualEnv.platform === 'Web';
    var isWeexiOS = virtualEnv.platform === 'iOS';
    var isWeexAndroid = virtualEnv.platform === 'android';
    var isWeex = isWeexAndroid || isWeexiOS;
    var UA = (function () {
        if (isWeb) {
            return window.navigator.userAgent.toLowerCase();
        }
        return '';
    })();
    var PCFrameConf = (function () {
        var tempConf = {};
        if (isWeb) {
            var frameName = window.name;
            try {
                var frameConf = JSON.parse(frameName);
                tempConf.containerId = frameConf.containerId;
                tempConf.version = frameConf.hostVersion;
                tempConf.language = frameConf.language || '*';
            }
            catch (e) {
                // nothing
            }
        }
        return tempConf;
    })();
    var isDingTalk = (function () {
        if (isWeex) {
            if (virtualEnv.appName === 'DingTalk' || virtualEnv.appName === 'com.alibaba.android.rimet') {
                return true;
            }
            return false;
        }
        else {
            if (UA.indexOf('dingtalk') > -1) {
                return true;
            }
            else {
                return !!PCFrameConf.containerId;
            }
        }
    })();
    var version = (function () {
        if (isWeb) {
            if (PCFrameConf.version) {
                return PCFrameConf.version;
            }
            else {
                var matches = UA.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);
                if (matches === null) {
                    matches = UA.match(/dingtalk\/([a-zA-Z0-9.-]+)/);
                }
                var matchVersion = (matches && matches[1]);
                return matchVersion || 'Unknown';
            }
        }
        else {
            return virtualEnv.appVersion;
        }
    })();
    var isPC = !!PCFrameConf.containerId;
    var isWebiOS = /iphone|ipod|ios/.test(UA);
    var isiPad = /ipad/.test(UA);
    var isWebAndroid = UA.indexOf('android') > -1;
    var isDingTalkPCMac = (UA.indexOf('mac') > -1) && isPC;
    var isDingTalkPCWindows = (UA.indexOf('win') > -1) && isPC;
    var isDingTalkPCWeb = (!isDingTalkPCMac && !isDingTalkPCWindows) && isPC;
    var isDingTalkPC = isPC;
    var platform = '';
    if (isDingTalk) {
        if (isWebiOS || isWeexiOS) {
            platform = constants_1.PLATFORM.IOS;
        }
        else if (isWebAndroid || isWeexAndroid) {
            platform = constants_1.PLATFORM.ANDROID;
        }
        else if (isiPad) {
            platform = constants_1.PLATFORM.IPAD;
        }
        else if (isDingTalkPCMac) {
            platform = constants_1.PLATFORM.MAC;
        }
        else if (isDingTalkPCWindows) {
            platform = constants_1.PLATFORM.WINDOWS;
        }
        else if (isDingTalkPCWeb) {
            platform = constants_1.PLATFORM.BROWSER;
        }
        else {
            platform = constants_1.PLATFORM.UNKNOWN;
        }
    }
    else {
        platform = constants_1.PLATFORM.UNKNOWN;
    }
    return {
        isDingTalk: isDingTalk,
        isWebiOS: isWebiOS,
        isWebAndroid: isWebAndroid,
        isWeexiOS: isWeexiOS,
        isWeexAndroid: isWeexAndroid,
        isDingTalkPCMac: isDingTalkPCMac,
        isDingTalkPCWeb: isDingTalkPCWeb,
        isDingTalkPCWindows: isDingTalkPCWindows,
        isDingTalkPC: isDingTalkPC,
        runtime: runtime,
        framework: framework,
        platform: platform,
        version: version,
        isWeex: isWeex,
    };
}
exports.default = environment;


/***/ }),

/***/ "1JM1":
/*!*******************************!*\
  !*** ./engine/parseSchema.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transItemFieldForSchema = transItemFieldForSchema;
exports.parseSchema = parseSchema;
var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
// 1.0.0版本，布局和数据分离
var SCHEMA_VERSION_1 = exports.SCHEMA_VERSION_1 = '1.0.0';
// 由老版本转为1.0.0的标记
var SCHEMA_TRANS_RECORD_OLD_1 = 'old_1.0.0';
// 1.0.0的default版本
var SCHEMA_TRANS_RECORD_DEFAULT_1 = exports.SCHEMA_TRANS_RECORD_DEFAULT_1 = 'default_1.0.0';

/**
 * 去除schema中用到的item里多余的字段
 * @param {*} item
 */
function transItemFieldForSchema(item) {
    return {
        // id要兼容取props里的，因为存在一部分老版schema的id只存在props里
        id: item.id || item.props && item.props.id,
        componentName: item.componentName,
        children: item.children
    };
}

/**
 * 将老版的schema转化为1.0.0版本
 * 主要是items换为componrnts何children
 * @param {*} schema
 */
function transOldSchemaToVersion1(schema) {
    var newSchema = Object.assign({}, schema);

    var _newSchema$components = newSchema.components,
        components = _newSchema$components === undefined ? {} : _newSchema$components,
        schemaVersion = newSchema.schemaVersion;


    if (schemaVersion === SCHEMA_VERSION_1) {
        return newSchema;
    }

    // 将组件数据存到components里，分离布局结构和数据
    var recursiveTrans = function recursiveTrans(itemList) {
        return itemList.map(function (item) {
            var id = item && item.id || item && item.props && item.props.id;
            if (id) {
                var newItem = Object.assign({}, item);
                // 需要考虑的问题是components[id]里已经有一部分数据了，这时需要assign
                components[id] = Object.assign({}, components[id], newItem);
                // 设置id
                components[id].id = id;

                if (Array.isArray(newItem.children)) {
                    newItem.children = recursiveTrans(newItem.children);
                }
                // 删除老版item里的其它数据
                return transItemFieldForSchema(newItem);
            }
            return item;
        });
    };

    if (Array.isArray(newSchema.items) && newSchema.items.length > 0) {
        // 如果符合老版本的格式（这种格式兼容审批的嵌套场景），才会进行转换
        var newItems = recursiveTrans(newSchema.items);

        newSchema.components = components;
        newSchema.items = newItems;
    }

    newSchema.schemaVersion = SCHEMA_VERSION_1;
    // 加上一个转换标志
    newSchema.schemaTransRecord = SCHEMA_TRANS_RECORD_OLD_1;

    return newSchema;
}

/**
 * 过滤掉无用的item-兼容数据需要
 * @param {*} schema
 */
function filterUselessItems(schema) {
    var newSchema = Object.assign({}, schema);

    if (Array.isArray(newSchema.items)) {
        var newItems = newSchema.items.filter(function (item) {
            if (item && item.useless) {
                return false;
            }
            return true;
        });

        newSchema.items = newItems;
    }

    return newSchema;
}

/**
 * 解析schema，将其它版本的schema转换为标准的1.0.0版本
 * schema对下Immutable，但是内部的items、components仍然会是同一个引用
 * 1.0.0版本目前props.id这个字段是可能会冗余的（为了兼容审批那边的实例数据保存逻辑，props里没id无法正常读取数据）
 * 但是这个字段不为任何凭证
 * @param {*} schema
 */
function parseSchema() {
    var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // step1: 处理老数据，转换为新的schema数据
    var newSchema = transOldSchemaToVersion1(schema);

    newSchema = filterUselessItems(newSchema);

    return newSchema;
}

/***/ }),

/***/ "1rsT":
/*!*************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/bridge/h5PcEvent.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.off=exports.on=void 0;var on=function(e,o){__webpack_require__(/*! ../packages/frame-talk-client-pc/index.js */ "mOn6").addEventListener(e,o)};exports.on=on;var off=function(e,o){__webpack_require__(/*! ../packages/frame-talk-client-pc/index.js */ "mOn6").removeEventListener(e,o)};exports.off=off;

/***/ }),

/***/ "2FaN":
/*!******************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_descriptors.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "7ZW7")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "2ZeP":
/*!****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_iterators.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "3WaP":
/*!***********************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/bridge/h5Event.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.off=exports.on=void 0;var NON_BRIDGE_EVENTS=["resume","pause","online","offline","backbutton","goBack","pullToRefresh","message","recycle","restore","drawer","tab","navHelpIcon","navRightButton","navMenu","navTitle","appLinkResponse","internalPageLinkResponse","networkEvent","hostTaskEvent","deviceOrientationChanged","autoCheckIn","deviceFound","hostCheckIn","screenshot","becomeActive","keepAlive","navTitleClick","sharePage","wxNotify","editNoteCommand","updateStyle","qrscanCommonNotify","__message__","dtChannelEvent","livePlayerEventPlay","livePlayerEventPause","livePlayerEventEnded","livePlayerEventError","navActions","attendEvents"],BizEventBridgeType="dtBizBridgeEvent",EventTypeListKey="__eventTypeList__",handlerProxyMap=function(){return"undefined"==typeof WeakMap?void 0:new WeakMap}(),getOnHandlerProxy=function(e,n){if(handlerProxyMap){var t=handlerProxyMap.get(n);return void 0===t?(t=function(e){var r=e.detail;if(r.namespace&&r.eventName){var a=r.namespace+"."+r.eventName;t&&-1!==t[EventTypeListKey].indexOf(a)&&n(r.data)}},t[EventTypeListKey]=[e],handlerProxyMap.set(n,t)):-1===t[EventTypeListKey].indexOf(e)&&t[EventTypeListKey].push(e),t}},getOffHandlerProxy=function(e,n){if(handlerProxyMap){var t=handlerProxyMap.get(n);return t&&-1!==t[EventTypeListKey].indexOf(e)&&t[EventTypeListKey].splice(t[EventTypeListKey].indexOf(e),1),t&&t[EventTypeListKey].length<=1?t:void 0}},on=function(e,n){if(-1!==NON_BRIDGE_EVENTS.indexOf(e))document.addEventListener(e,n);else{var t=getOnHandlerProxy(e,n);t?document.addEventListener(BizEventBridgeType,t):console.log("bind event : "+e+" need WeakMap support , current environment doesnot")}};exports.on=on;var off=function(e,n){if(-1!==NON_BRIDGE_EVENTS.indexOf(e))document.removeEventListener(e,n);else{var t=getOffHandlerProxy(e,n);t&&document.removeEventListener(BizEventBridgeType,t)}};exports.off=off;

/***/ }),

/***/ "3Ybk":
/*!*********************************************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/whichOneRuntime.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;function snifferMachine(e,n){for(var i=e.length,a=0,f=!0;a<i;a++)try{if(!(e[a]in n)){f=!1;break}}catch(e){f=!1;break}return f}function whichOneRuntime(){return maybeInWebView&&maybeInWeexVueEnv?snifferMachine(snifferWeexVueMap,weex)?"Web.Vue":"Web.Unknown":!maybeInWebView&&maybeInWeexVueEnv?snifferMachine(snifferWeexVueMap,weex)?"Weex.Vue":"Weex.Unknown":maybeInWebView&&maybeInNative&&!maybeInWeexVueEnv?snifferMachine(snifferWeexRaxMap,window)?"Weex.Rax":"Weex.Unknown":maybeInWebView&&snifferMachine(snifferWebViewMap,window)?"Web.Unknown":"Unknown.Unknown"}Object.defineProperty(exports,"__esModule",{value:!0});var maybeInWebView="undefined"!=typeof window,maybeInWeexVueEnv="undefined"!=typeof weex,maybeInNative="undefined"!=typeof callNative,snifferWeexRaxMap=["__weex_config__","__weex_options__","__weex_require__"],snifferWebViewMap=["localStorage","location","navigator","XMLHttpRequest"],snifferWeexVueMap=["config","requireModule","document"];exports.default=whichOneRuntime;

/***/ }),

/***/ "4+NM":
/*!************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "VYU6");
var step = __webpack_require__(/*! ./_iter-step */ "U1bm");
var Iterators = __webpack_require__(/*! ./_iterators */ "2ZeP");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "mIpV");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "r4jH")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "4GAR":
/*!*****************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/env.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getENV = exports.getUA = void 0;
var sdk_1 = __webpack_require__(/*! ./sdk */ "a+z/");
var sdk_2 = __webpack_require__(/*! ./sdk */ "a+z/");
Object.defineProperty(exports, "ENV_ENUM", { enumerable: true, get: function () { return sdk_2.ENV_ENUM; } });
Object.defineProperty(exports, "APP_TYPE", { enumerable: true, get: function () { return sdk_2.APP_TYPE; } });
Object.defineProperty(exports, "ENV_ENUM_SUB", { enumerable: true, get: function () { return sdk_2.ENV_ENUM_SUB; } });
var dingtalk_javascript_env_1 = __webpack_require__(/*! ./packages/dingtalk-javascript-env */ "KX/L");
/**
 * 获取 Top Bridge
 */
var getTopBridge = function () {
    try {
        if (typeof window !== 'undefined' && typeof window.top !== 'undefined') {
            var topWindow = window.top;
            return topWindow.__dingtalk_jsapi_top_platfrom_config__;
        }
    }
    catch (_err) {
        return;
    }
};
var EDdWeexEnv;
(function (EDdWeexEnv) {
    EDdWeexEnv["singlePage"] = "singlePage";
    EDdWeexEnv["miniApp"] = "miniApp";
    EDdWeexEnv["miniWidget"] = "miniWidget";
})(EDdWeexEnv || (EDdWeexEnv = {}));
exports.getUA = function () {
    var ua = '';
    try {
        if (typeof navigator !== 'undefined') {
            ua = navigator && (navigator.userAgent || navigator.swuserAgent) || '';
        }
    }
    catch (e) {
        ua = '';
    }
    return ua;
};
exports.getENV = function () {
    var ua = exports.getUA();
    var isInIOSEquipment = (/iPhone|iPad|iPod|iOS/i).test(ua);
    var isInAndroidEquipment = (/Android/i).test(ua);
    var isMiniAppRuntime = (/Nebula/i).test(ua);
    var isDingTalkRuntime = (/DingTalk/i).test(ua);
    var isWebviewInMiniAppRuntime = (/dd-web/i).test(ua);
    var isInNuva = (typeof nuva === 'object');
    var isHadMiniAppBridge = (typeof dd === 'object' && typeof dd.dtBridge === 'function');
    // for iOS Jailbreaking
    var isLooseIOS = (isHadMiniAppBridge && isInIOSEquipment) || (isInNuva && isInIOSEquipment);
    var inMobileDingtalk = isDingTalkRuntime || dingtalk_javascript_env_1.default.isDingTalk;
    var isIOS = (isInIOSEquipment && inMobileDingtalk || dingtalk_javascript_env_1.default.isWeexiOS) || isLooseIOS;
    var isAndroid = isInAndroidEquipment && inMobileDingtalk || dingtalk_javascript_env_1.default.isWeexAndroid;
    var isMiniApp = isMiniAppRuntime && inMobileDingtalk || isHadMiniAppBridge; // adaptate miniapp weex env
    var isWebviewInMiniApp = isWebviewInMiniAppRuntime;
    var appType = sdk_1.APP_TYPE.WEB;
    if (isWebviewInMiniApp) {
        appType = sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP;
    }
    else if (isMiniApp) {
        appType = sdk_1.APP_TYPE.MINI_APP;
    }
    else if (dingtalk_javascript_env_1.default.isWeexiOS || dingtalk_javascript_env_1.default.isWeexAndroid) {
        try {
            var ddWeexEnv = weex.config.ddWeexEnv;
            // 当是小程序组件环境时
            if (ddWeexEnv === EDdWeexEnv.miniWidget) {
                appType = sdk_1.APP_TYPE.WEEX_WIDGET;
            }
            else {
                appType = sdk_1.APP_TYPE.WEEX;
            }
        }
        catch (error) {
            appType = sdk_1.APP_TYPE.WEEX;
        }
    }
    var language = '*';
    var containerId;
    var matches = ua.match(/AliApp\(\w+\/([a-zA-Z0-9.-]+)\)/);
    if (matches === null) {
        matches = ua.match(/DingTalk\/([a-zA-Z0-9.-]+)/);
    }
    var version;
    if (matches && matches[1]) {
        version = matches[1];
    }
    var frameName = '';
    if (typeof name !== 'undefined') {
        frameName = name;
    }
    if (frameName) {
        try {
            var frameConf = JSON.parse(frameName);
            if (frameConf.hostVersion) {
                version = frameConf.hostVersion;
            }
            language = frameConf.language || navigator.language || '*';
            containerId = frameConf.containerId;
        }
        catch (e) {
            // when parse error , continue next opration
        }
    }
    var isPC = !!containerId;
    /**
     * mac 不包含 hostVersion
     */
    if (isPC && !version) {
        matches = ua.match(/DingTalk\(([a-zA-Z0-9\.-]+)\)/);
        if (matches && matches[1]) {
            version = matches[1];
        }
    }
    var platform;
    var platformSub = sdk_1.ENV_ENUM_SUB.noSub;
    if (isIOS) {
        platform = sdk_1.ENV_ENUM.ios;
    }
    else if (isAndroid) {
        platform = sdk_1.ENV_ENUM.android;
    }
    else if (isPC) {
        var isMac = ua.indexOf('Macintosh; Intel Mac OS') > -1;
        platformSub = isMac ? sdk_1.ENV_ENUM_SUB.mac : sdk_1.ENV_ENUM_SUB.win;
        platform = sdk_1.ENV_ENUM.pc;
    }
    else {
        // iFrame 下沿用宿主环境
        var topBridge = getTopBridge();
        if (topBridge && topBridge.platform) {
            platform = topBridge.platform;
        }
        else {
            platform = sdk_1.ENV_ENUM.notInDingTalk;
        }
    }
    return {
        platform: platform,
        platformSub: platformSub,
        version: version,
        appType: appType,
        language: language,
    };
};


/***/ }),

/***/ "4bnQ":
/*!****************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/platform/pc.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0});var ddSdk_1=__webpack_require__(/*! ../lib/ddSdk */ "xrN5"),env_1=__webpack_require__(/*! ../lib/env */ "jEw7"),h5Pc_1=__webpack_require__(/*! ../lib/bridge/h5Pc */ "ToOj"),eapp_1=__webpack_require__(/*! ../lib/bridge/eapp */ "7uKH"),sdk_1=__webpack_require__(/*! ../lib/sdk */ "lnAV"),h5PcEvent_1=__webpack_require__(/*! ../lib/bridge/h5PcEvent */ "1rsT");ddSdk_1.ddSdk.setPlatform({platform:env_1.ENV_ENUM.pc,bridgeInit:function(){switch(env_1.getENV().appType){case sdk_1.APP_TYPE.MINI_APP:return Promise.resolve(eapp_1.default);default:return h5Pc_1.h5PcBridgeInit().then(function(){return h5Pc_1.default})}},authMethod:"config",authParamsDeal:function(e){var r=Object.assign({},e);return r.url=window.location.href.split("#")[0],r},event:{on:function(e,r){if(env_1.getENV().appType===sdk_1.APP_TYPE.WEB)return h5PcEvent_1.on(e,r)},off:function(e,r){if(env_1.getENV().appType===sdk_1.APP_TYPE.WEB)return h5PcEvent_1.off(e,r)}}});

/***/ }),

/***/ "4k1/":
/*!********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_object-create.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "6k3Y");
var dPs = __webpack_require__(/*! ./_object-dps */ "YXrh");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "6hbf");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "INl8")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "Qj+i")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "mNdo").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "5+Gv":
/*!****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_microtask.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "T/px");
var macrotask = __webpack_require__(/*! ./_task */ "qjZe").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ "IpsO")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "6ESS":
/*!************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "d66Q").f;
var has = __webpack_require__(/*! ./_has */ "qQ7p");
var TAG = __webpack_require__(/*! ./_wks */ "haEp")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "6PdP":
/*!*************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/bridge/weexEvent.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;var _this=this;Object.defineProperty(exports,"__esModule",{value:!0}),exports.off=exports.on=void 0;var weex_1=__webpack_require__(/*! ./weex */ "V3Lu"),on=function(e,o){weex_1.requireModule("globalEvent").addEventListener(e,function(e){var t={preventDefault:function(){throw new Error("does not support preventDefault")},detail:e};o.call(_this,t)})};exports.on=on;var off=function(e,o){weex_1.requireModule("globalEvent").removeEventListener(e,o)};exports.off=off;

/***/ }),

/***/ "6hbf":
/*!********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "6k3Y":
/*!****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_an-object.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "k0kn");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "6kth":
/*!***********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_core.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "6mBL":
/*!*********************************************!*\
  !*** ./node_modules/dingtalk-jsapi/core.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;var ddSdk_1=__webpack_require__(/*! ./lib/ddSdk */ "xrN5"),otherApi=__webpack_require__(/*! ./lib/otherApi */ "nnhS"),core=Object.assign({},otherApi,ddSdk_1.ddSdk.getExportSdk());module.exports=core;

/***/ }),

/***/ "7ZW7":
/*!************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_fails.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7uKH":
/*!********************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/bridge/eapp.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0});var eappBridge=function(e,n){return new Promise(function(o,t){dd.dtBridge({m:e,args:n,onSuccess:function(e){"function"==typeof n.onSuccess&&n.onSuccess(e),o(e)},onFail:function(e){"function"==typeof n.onFail&&n.onFail(e),t(e)}})})};exports.default=eappBridge;

/***/ }),

/***/ "Byhj":
/*!**********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_uid.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "C3cc":
/*!********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_is-array-iter.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "2ZeP");
var ITERATOR = __webpack_require__(/*! ./_wks */ "haEp")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "C7tZ":
/*!************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/log.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;function padNumber(e){return e="00"+e,e.substring(e.length-2,e.length)}var __spreadArrays=this&&this.__spreadArrays||function(){for(var e=0,r=0,t=arguments.length;r<t;r++)e+=arguments[r].length;for(var o=Array(e),s=0,r=0;r<t;r++)for(var n=arguments[r],a=0,l=n.length;a<l;a++,s++)o[s]=n[a];return o};Object.defineProperty(exports,"__esModule",{value:!0}),exports.log=void 0;var log=function(e){console.log.apply(console,__spreadArrays([padNumber(e.time.getHours())+":"+padNumber(e.time.getMinutes())+":"+padNumber(e.time.getSeconds())],e.text))};exports.log=log;

/***/ }),

/***/ "COjq":
/*!***********************************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;function getVirtualEnv(){var n={};switch(framework){case constants_1.FRAMEWORK.VUE:var t=weex.config,e=t.env;n.platform=e.platform,constants_1.RUNTIME.WEEX===runtime&&(n.appVersion=e.appVersion,n.appName=e.appName);break;case constants_1.FRAMEWORK.RAX:constants_1.RUNTIME.WEEX===runtime&&(n.platform=navigator.platform,n.appName=navigator.appName,n.appVersion=navigator.appVersion);break;case constants_1.FRAMEWORK.UNKNOWN:constants_1.RUNTIME.WEB===runtime&&(n.platform=constants_1.RUNTIME.WEB),constants_1.RUNTIME.UNKNOWN===runtime&&(n.platform=constants_1.RUNTIME.UNKNOWN)}return n}Object.defineProperty(exports,"__esModule",{value:!0});var whichOneRuntime_1=__webpack_require__(/*! ./whichOneRuntime */ "3Ybk"),environment_1=__webpack_require__(/*! ./environment */ "TutT"),constants_1=__webpack_require__(/*! ./constants */ "RvhN"),_a=whichOneRuntime_1.default().split("."),runtime=_a[0],framework=_a[1],virtualEnv=getVirtualEnv(),env=environment_1.default(runtime,framework,virtualEnv);exports.default=env;

/***/ }),

/***/ "CsdP":
/*!**********************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/api/internal/request/lwp.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.lwp$ = void 0;
/* tslint:disable:no-console */
var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ "kGXD");
var apiName = 'internal.request.lwp';
var mobileParamsDeal = function (params) {
    var finalParams = Object.assign({}, params);
    finalParams.body = JSON.stringify(params.body);
    if (typeof location !== 'undefined') {
        finalParams.headers = Object.assign({
            referer: location.origin + location.pathname,
        }, finalParams.headers || {});
    }
    if (params.url) {
        finalParams.uri = params.url;
    }
    return finalParams;
};
var ERROR_ANDROID_DEAL_ERROR = '警告，存在 lwp 接口返回基础数据类型，在安卓下无法正常的处理，易出现异常情况，请让服务端同学修改此 lwp 接口，改为返回 object，不返回基础数据类型';
ddSdk_1.ddSdk.setAPI(apiName, (_a = {},
    _a[ddSdk_1.ENV_ENUM.pc] = {
        vs: '3.0.0',
        paramsDeal: function (params) {
            var finalParams = Object.assign({}, params);
            if (params.uri) {
                finalParams.url = params.uri;
            }
            return finalParams;
        },
    },
    _a[ddSdk_1.ENV_ENUM.ios] = {
        vs: '2.5.1',
        paramsDeal: mobileParamsDeal,
        resultDeal: function (result) {
            // ios返回的是json串
            var responseText = result.responseText;
            var body; // 只有成功才返回, 错误的话安卓不返回
            try {
                body = JSON.parse(responseText);
                if (typeof body !== 'object') {
                    console.warn(ERROR_ANDROID_DEAL_ERROR);
                }
            }
            catch (e) {
                body = responseText;
            }
            return {
                body: body,
                code: result.statusCode,
            };
        },
    },
    _a[ddSdk_1.ENV_ENUM.android] = {
        vs: '2.5.1',
        paramsDeal: mobileParamsDeal,
        resultDeal: function (result) {
            if (result.statusCode === 200) {
                var responseText = result.responseText;
                var body = {};
                if (responseText !== undefined) {
                    try {
                        body = JSON.parse(responseText);
                        if (typeof body !== 'object') {
                            console.warn(ERROR_ANDROID_DEAL_ERROR);
                        }
                    }
                    catch (e) {
                        body = responseText;
                    }
                }
                return {
                    body: body,
                    code: result.statusCode,
                };
            }
            else {
                var statusText = result.statusText;
                var body = {}; // 只有成功才返回, 错误的话安卓不返回
                if (statusText !== undefined) {
                    try {
                        // 新版本改为 statusText 为 body 字符串 statusCode 为 code，尝试解析
                        body = JSON.parse(statusText);
                        return {
                            body: body,
                            code: result.statusCode,
                        };
                    }
                    catch (error) {
                        // 旧版处理逻辑
                        body = {
                            reason: statusText,
                            code: result.statusCode,
                        };
                        return {
                            body: body,
                            // 如果端上没吐此code，缺省为400
                            code: 400,
                        };
                    }
                }
                else {
                    // 兼容逻辑，保障返回的结构体正常
                    return {
                        body: body,
                        // 如果端上没吐此code，缺省为400
                        code: 400,
                    };
                }
            }
        },
    },
    _a));
/**
 * lwp通道
 * @apiName internal.request.lwp
 * @supportVersion  pc: 3.0.0 ios: 2.5.1 android: 2.5.1
 */
function lwp$(params) {
    return ddSdk_1.ddSdk.invokeAPI(apiName, params);
}
exports.lwp$ = lwp$;
exports.default = lwp$;


/***/ }),

/***/ "DCPo":
/*!*************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_shared.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "6kth");
var global = __webpack_require__(/*! ./_global */ "T/px");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "LoIC") ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "DxYy":
/*!*****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_a-function.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "ErxN":
/*!**********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_promise-resolve.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "6k3Y");
var isObject = __webpack_require__(/*! ./_is-object */ "k0kn");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "f5uS");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "FGrC":
/*!*************************!*\
  !*** ./services/lwp.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOrgAppDomain = exports.setDingPortalPage = exports.customCallApiByClient = exports.callApiByClient = exports.callApi = exports.hideGroupToday = exports.getCustomSubPageModel = exports.getHomeModelPreview = exports.getHomeModel = undefined;

var _request = __webpack_require__(/*! ./request */ "TFiO");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;


var lwpFactory = function lwpFactory(uri) {
    return function (params, baseUrl) {
        return (0, _request2.default)(uri, params, baseUrl);
    };
};

var getHomeModel = exports.getHomeModel = lwpFactory('CustomI/getHomeModel');
var getHomeModelPreview = exports.getHomeModelPreview = lwpFactory('CustomI/getHomeModelPreview');
var getCustomSubPageModel = exports.getCustomSubPageModel = lwpFactory('CustomI/getCustomSubPageModel'); // TODO 等晓迪接口 getCustomSubPageModel
var hideGroupToday = exports.hideGroupToday = lwpFactory('FABHomeI/hideGroupToday');
var callApi = exports.callApi = lwpFactory('GatewayApiI/callApi');
var callApiByClient = exports.callApiByClient = lwpFactory('GatewayApiI/callApiByClient');
var customCallApiByClient = exports.customCallApiByClient = lwpFactory('CustomI/callApiByClient');
var setDingPortalPage = exports.setDingPortalPage = lwpFactory('CustomI/setDingPortalPage');
var getOrgAppDomain = exports.getOrgAppDomain = lwpFactory('CustomI/getOrgAppDomain');

/***/ }),

/***/ "G/N9":
/*!**************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_classof.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "IpsO");
var TAG = __webpack_require__(/*! ./_wks */ "haEp")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "GtrG":
/*!*******************************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/babel-runtime/node_modules/regenerator-runtime/runtime-module.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "ZUyg");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "GymP":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/whichOneRuntime.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
var maybeInWebView = typeof window !== 'undefined';
var maybeInWeexVueEnv = typeof weex !== 'undefined';
var maybeInNative = typeof callNative !== 'undefined';
var snifferWeexRaxMap = [
    '__weex_config__',
    '__weex_options__',
    '__weex_require__',
];
var snifferWebViewMap = [
    'localStorage',
    'location',
    'navigator',
    'XMLHttpRequest',
];
var snifferWeexVueMap = [
    'config',
    'requireModule',
    'document',
];
// 嗅探器
function snifferMachine(snifferMap, source) {
    var j = snifferMap.length;
    var i = 0;
    var result = true;
    for (; i < j; i++) {
        try {
            if (!(snifferMap[i] in source)) {
                result = false;
                break;
            }
        }
        catch (err) {
            result = false;
            break;
        }
    }
    return result;
}
function whichOneRuntime() {
    if (maybeInWebView && maybeInWeexVueEnv) {
        // webview
        return snifferMachine(snifferWeexVueMap, weex) ? 'Web.Vue' : 'Web.Unknown';
    }
    else if (!maybeInWebView && maybeInWeexVueEnv) {
        // native
        return snifferMachine(snifferWeexVueMap, weex) ? 'Weex.Vue' : 'Weex.Unknown';
    }
    else if (maybeInWebView && maybeInNative && !maybeInWeexVueEnv) {
        // native
        return snifferMachine(snifferWeexRaxMap, window) ? 'Weex.Rax' : 'Weex.Unknown';
    }
    else {
        // default webview
        if (maybeInWebView) {
            return snifferMachine(snifferWebViewMap, window) ? 'Web.Unknown' : 'Unknown.Unknown';
        }
    }
    return 'Unknown.Unknown';
}
exports.default = whichOneRuntime;


/***/ }),

/***/ "HzN2":
/*!**********************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/polyfills/es6Promise.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
if (typeof Promise !== 'function') {
    __webpack_require__(/*! promise-polyfill/dist/polyfill */ "OUDc");
}


/***/ }),

/***/ "INl8":
/*!*****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_shared-key.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "DCPo")('keys');
var uid = __webpack_require__(/*! ./_uid */ "Byhj");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "IpsO":
/*!**********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_cof.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "KFdN":
/*!**************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/babel-runtime/core-js/array/from.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/array/from */ "tCMc"), __esModule: true };

/***/ }),

/***/ "KX/L":
/*!****************************************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
var whichOneRuntime_1 = __webpack_require__(/*! ./whichOneRuntime */ "GymP");
var environment_1 = __webpack_require__(/*! ./environment */ "1CFD");
var constants_1 = __webpack_require__(/*! ./constants */ "PPxh");
var _a = whichOneRuntime_1.default().split('.'), runtime = _a[0], framework = _a[1];
function getVirtualEnv() {
    var containerEnv = {};
    switch (framework) {
        case constants_1.FRAMEWORK.VUE:
            var config = weex.config;
            var configEnv = config.env;
            containerEnv.platform = configEnv.platform;
            if (constants_1.RUNTIME.WEEX === runtime) {
                containerEnv.appVersion = configEnv.appVersion;
                containerEnv.appName = configEnv.appName;
            }
            break;
        case constants_1.FRAMEWORK.RAX:
            if (constants_1.RUNTIME.WEEX === runtime) {
                containerEnv.platform = navigator.platform;
                containerEnv.appName = navigator.appName;
                containerEnv.appVersion = navigator.appVersion;
            }
            break;
        case constants_1.FRAMEWORK.UNKNOWN:
            if (constants_1.RUNTIME.WEB === runtime) {
                containerEnv.platform = constants_1.RUNTIME.WEB;
            }
            if (constants_1.RUNTIME.UNKNOWN === runtime) {
                containerEnv.platform = constants_1.RUNTIME.UNKNOWN;
            }
            break;
    }
    return containerEnv;
}
var virtualEnv = getVirtualEnv();
var env = environment_1.default(runtime, framework, virtualEnv);
exports.default = env;


/***/ }),

/***/ "LNt7":
/*!*********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/es7.promise.try.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ "rG/S");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "f5uS");
var perform = __webpack_require__(/*! ./_perform */ "TP6P");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "LZ7c":
/*!**************************!*\
  !*** ./utils/bizUtil.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "p5Wu");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getDefaultPageSchema = getDefaultPageSchema;
exports.getCompatiblePageSchema = getCompatiblePageSchema;
exports.hasCustomComponent = hasCustomComponent;
exports.getParamsByQuery = getParamsByQuery;

var _parseSchema = __webpack_require__(/*! ../engine/parseSchema */ "1JM1");

var _tool = __webpack_require__(/*! ./tool */ "sFzS");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
// import logger from './logger';


var COMPATIBLE_COMPONENT_KEY = 'customWorktab_compatible_component';

function getMarketActivitySchema() {
    var marketActivitySchema = {
        // 生成一个id，手动确保运行态每个页面唯一即可
        id: COMPATIBLE_COMPONENT_KEY + '_MarketActivityView_' + new Date().getTime(),
        componentName: 'MarketActivityView',
        category: 'common',
        props: {
            label: '行业解决方案',
            showLabel: true
        }
    };
    return marketActivitySchema;
}

function getOtherAppListSchema() {
    var otherAppListSchema = {
        id: COMPATIBLE_COMPONENT_KEY + '_OtherAppsView_' + new Date().getTime(),
        componentName: 'OtherAppsView',
        category: 'common',
        props: {
            label: '其他应用',
            showLabel: true,
            columnNum: 4,
            backgroundColor: '#fff'
        }
    };

    return otherAppListSchema;
}

function getAdminConsoleSchema() {
    var adminConsoleSchema = {
        id: COMPATIBLE_COMPONENT_KEY + '_AdminConsoleView_' + new Date().getTime(),
        componentName: 'AdminConsoleView',
        category: 'common',
        props: {
            label: '管理工作台',
            showLabel: true,
            dataSource: [],
            backgroundColor: '#fff',
            dataType: 1
        }
    };

    return adminConsoleSchema;
}

/**
 * 兜底情况，生成带默认页面的homeModel数据，1.0.0版规范
 * 默认只有三个组件
 */
function getDefaultPageSchema() {
    var pageSchema = {};
    var components = {};
    var items = [];

    var adminConsoleSchema = getAdminConsoleSchema();
    components[adminConsoleSchema.id] = adminConsoleSchema;
    items.push((0, _parseSchema.transItemFieldForSchema)(adminConsoleSchema));

    var otherAppListSchema = getOtherAppListSchema();
    components[otherAppListSchema.id] = otherAppListSchema;
    items.push((0, _parseSchema.transItemFieldForSchema)(otherAppListSchema));

    var marketActivitySchema = getMarketActivitySchema();
    components[marketActivitySchema.id] = marketActivitySchema;
    items.push((0, _parseSchema.transItemFieldForSchema)(marketActivitySchema));

    pageSchema.items = items;
    pageSchema.components = components;
    pageSchema.schemaVersion = _parseSchema.SCHEMA_VERSION_1;
    // 加上一个转换标志
    pageSchema.schemaTransRecord = _parseSchema.SCHEMA_TRANS_RECORD_DEFAULT_1;

    return pageSchema;
}

/**
 * 获取兼容后的schema，兜底AdminConsoleView，OtherAppsView，MarketActivityView
 * 目前判断是否存在组件时，要遍历所有组件
 * 基于最新版本（1.0.0）的schema进行兼容
 * @param {*} pageSchema
 */
function getCompatiblePageSchema(pageSchema) {
    var newSchema = Object.assign({}, pageSchema);
    var _newSchema$items = newSchema.items,
        items = _newSchema$items === undefined ? [] : _newSchema$items;

    if (newSchema.schemaVersion !== _parseSchema.SCHEMA_VERSION_1) {
        // logger.logCustom2Retcode('compatible_pageschema_version_illegal');
        return newSchema;
    }
    if (!Array.isArray(items)) {
        // logger.logCustom2Retcode('compatible_pageschema_items_illegal');
        return newSchema;
    }
    var hasAdminConsoleView = false;
    var hasOtherAppsView = false;
    var hasMarketActivityView = false;

    var targetItemList = items.concat([]);

    while (targetItemList.length) {
        if (hasAdminConsoleView && hasOtherAppsView && hasMarketActivityView) {
            break;
        }
        // 循环遍历，寻找有没有组件
        var item = targetItemList.pop();
        if (item) {
            var componentName = item.componentName;

            if (componentName === 'AdminConsoleView') {
                hasAdminConsoleView = true;
            } else if (componentName === 'OtherAppsView') {
                hasOtherAppsView = true;
            } else if (componentName === 'MarketActivityView') {
                hasMarketActivityView = true;
            }

            // 判断是否有子级，基于item判断（实际的布局）而不是数据
            if (Array.isArray(item.children)) {
                // 考虑容器嵌套情况
                targetItemList.push.apply(targetItemList, (0, _toConsumableArray3.default)(item.children));
            }
        }
    }

    var _newSchema$components = newSchema.components,
        components = _newSchema$components === undefined ? {} : _newSchema$components;

    var newItems = items.concat([]);

    if (!hasAdminConsoleView) {
        var itemData = getAdminConsoleSchema();
        newItems.push((0, _parseSchema.transItemFieldForSchema)(itemData));
        components[itemData.id] = itemData;
    }
    if (!hasOtherAppsView) {
        var _itemData = getOtherAppListSchema();

        newItems.push((0, _parseSchema.transItemFieldForSchema)(_itemData));
        components[_itemData.id] = _itemData;
    }
    if (!hasMarketActivityView) {
        var _itemData2 = getMarketActivitySchema();

        newItems.push((0, _parseSchema.transItemFieldForSchema)(_itemData2));
        components[_itemData2.id] = _itemData2;
    }

    newSchema.items = newItems;
    newSchema.components = components;

    return newSchema;
}

/**
 * 判断schema里是否包含自定义组件
 * @param pageSchema 传入的schema，1.0.0格式，需要有items和components
 * @return {boolean}
 */
function hasCustomComponent() {
    var pageSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var isCustomComponentExist = false;
    // 实际的组件数据
    var components = pageSchema.components || {};

    if (Array.isArray(pageSchema.items)) {
        // Immutable，因为之后会进行有损操作
        var itemList = [].concat(pageSchema.items);

        while (itemList.length) {
            var item = itemList.pop();
            var id = item.id || item.props && item.props.id;
            var itemData = components[id] || {};
            if (itemData.category === 'custom'
            // 由于历史数据中，没有category，而服务商组件命名规则为"<namespace>/<componentName>"，
            // 因此用名称中是否有"/"兼容历史数据的判断
            || /(.+)\/(.+)/.test(itemData.componentName)) {
                isCustomComponentExist = true;
                break;
            }
            // 判断是否有子级，基于item判断（实际的布局）而不是数据
            if (Array.isArray(item.children)) {
                // 考虑容器嵌套情况
                itemList.push.apply(itemList, (0, _toConsumableArray3.default)(item.children));
            }
        }
    }

    return isCustomComponentExist;
}

/**
 * 从query中获取页面必现的参数
 * 1. 正常获取corpId、appUuid等参数
 * 2. iOS中进行兼容处理
 * @param {*} ddEnv
 * @param {*} query
 */
function getParamsByQuery() {
    var ddEnv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var corpId = query.corpId,
        formCode = query.formCode,
        agentId = query.agentId,
        appUuid = query.appUuid,
        previewType = query.previewType,
        funnelsource = query.funnelsource;


    var finalCorpId = corpId;
    var finalAgentId = agentId;
    var finalAppUuid = appUuid;
    var finalPreviewType = previewType;
    var finalFormCode = formCode;
    var finalFunnelsource = funnelsource;

    if (!agentId && !appUuid && ddEnv.platform === 'ios') {
        // 测试数据
        // query = {'appUuid=333333&agentId=280602930&previewType=2&funnelsource=44534':null,"corpId":"ding0e0512d61d0f6ff835c2f4657eb6378f"}
        var queryObject = {};

        // 兼容IOS临时逻辑，query参数需要特殊处理，注意，corpId在外层，不在这里
        // logger.logCustom2Retcode('getParamsByQuery_queryIOS');

        for (var key in query) {
            if (/appUuid/.test(key)) {
                queryObject = (0, _tool.getQueryObject)(key);
                (0, _tool.consoleLog)('Page getQueryObject', queryObject);
                break;
            }
        }

        finalAppUuid = queryObject.appUuid;
        finalAgentId = queryObject.agentId;

        if (queryObject.previewType) {
            finalPreviewType = queryObject.previewType;
        }

        if (queryObject.formCode) {
            finalFormCode = queryObject.formCode;
        }

        if (queryObject.funnelsource) {
            finalFunnelsource = queryObject.funnelsource;
        }
    }

    finalAgentId = parseInt(finalAgentId, 10) || undefined;
    finalPreviewType = isNaN(parseInt(finalPreviewType, 10)) ? undefined : parseInt(finalPreviewType, 10);

    return {
        corpId: finalCorpId,
        agentId: finalAgentId,
        appUuid: finalAppUuid,
        previewType: finalPreviewType,
        formCode: finalFormCode,
        funnelsource: finalFunnelsource
    };
}

/***/ }),

/***/ "LoIC":
/*!**************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_library.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "MM90":
/*!****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_to-object.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "UAHs");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "Mice":
/*!******************************!*\
  !*** ./constants/globals.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGlobals = setGlobals;
exports.getGlobals = getGlobals;
var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;

var g = {};

function setGlobals(globals) {
  g = globals || {};
}

function getGlobals() {
  return g;
}

/***/ }),

/***/ "NtqK":
/*!*****************************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/api/internal/microapp/queryInfo.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryInfo$ = void 0;
var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ "kGXD");
var apiName = 'internal.microapp.queryInfo';
ddSdk_1.ddSdk.setAPI(apiName, (_a = {},
    _a[ddSdk_1.ENV_ENUM.ios] = { vs: '3.4.1' },
    _a[ddSdk_1.ENV_ENUM.android] = { vs: '3.4.1' },
    _a));
/**
 * 批量获取微应用信息
 * @apiName internal.microapp.queryInfo
 * @supportVersion  ios: 3.4.1 android: 3.4.1
 */
function queryInfo$(params) {
    return ddSdk_1.ddSdk.invokeAPI(apiName, params);
}
exports.queryInfo$ = queryInfo$;
exports.default = queryInfo$;


/***/ }),

/***/ "OUDc":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/node_modules/promise-polyfill/dist/polyfill.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
(function (global, factory) {
	 true ? factory() :
	undefined;
}(this, (function () { 'use strict';

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

var globalNS = (function() {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
})();

if (!globalNS.Promise) {
  globalNS.Promise = Promise;
}

})));


/***/ }),

/***/ "Oi8V":
/*!******************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_set-species.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "T/px");
var core = __webpack_require__(/*! ./_core */ "6kth");
var dP = __webpack_require__(/*! ./_object-dp */ "d66Q");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "2FaN");
var SPECIES = __webpack_require__(/*! ./_wks */ "haEp")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "PPxh":
/*!********************************************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/constants.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAMEWORK = exports.PLATFORM = exports.RUNTIME = void 0;
exports.RUNTIME = {
    WEB: 'Web',
    WEEX: 'Weex',
    UNKNOWN: 'Unknown',
};
exports.PLATFORM = {
    MAC: 'Mac',
    WINDOWS: 'Windows',
    IOS: 'iOS',
    ANDROID: 'Android',
    IPAD: 'iPad',
    BROWSER: 'Browser',
    UNKNOWN: 'Unknown',
};
exports.FRAMEWORK = {
    VUE: 'Vue',
    RAX: 'Rax',
    UNKNOWN: 'Unknown',
};


/***/ }),

/***/ "Pixs":
/*!*******************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/api/biz/util/openLink.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.openLink$ = void 0;
var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ "kGXD");
var apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ "YWph");
var apiName = 'biz.util.openLink';
var paramsDeal = apiHelper_1.genDefaultParamsDealFn({
    credible: true,
    showMenuBar: true,
});
ddSdk_1.ddSdk.setAPI(apiName, (_a = {},
    _a[ddSdk_1.ENV_ENUM.pc] = { vs: '2.7.0' },
    _a[ddSdk_1.ENV_ENUM.ios] = { vs: '2.4.0', paramsDeal: paramsDeal },
    _a[ddSdk_1.ENV_ENUM.android] = { vs: '2.4.0', paramsDeal: paramsDeal },
    _a));
/**
 * 新开页面/在新窗口上打开链接
 * @apiName biz.util.openLink
 * @supportVersion  pc: 2.7.0 ios: 2.4.0 android: 2.4.0
 */
function openLink$(params) {
    return ddSdk_1.ddSdk.invokeAPI(apiName, params);
}
exports.openLink$ = openLink$;
exports.default = openLink$;


/***/ }),

/***/ "Pkh8":
/*!*************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/api/biz/util/ut.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ut$ = void 0;
var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ "kGXD");
var apiName = 'biz.util.ut';
var utParamsObj2Str = function (params) {
    var finalParams = Object.assign({}, params);
    var tempValue = finalParams.value;
    var tempStr = [];
    if (tempValue && typeof tempValue === 'object') {
        for (var i in tempValue) {
            if (tempValue[i] !== undefined) {
                tempStr.push(i + '=' + tempValue[i]);
            }
        }
        tempValue = tempStr.join(',');
    }
    finalParams.value = tempValue || '';
    return finalParams;
};
ddSdk_1.ddSdk.setAPI(apiName, (_a = {},
    _a[ddSdk_1.ENV_ENUM.pc] = {
        vs: '3.5.0',
        paramsDeal: utParamsObj2Str,
    },
    _a[ddSdk_1.ENV_ENUM.ios] = {
        vs: '2.4.0',
        paramsDeal: function (params) {
            var finalParams = Object.assign({}, params);
            var tempValue = finalParams.value;
            var tempStr = [];
            if (tempValue && typeof tempValue === 'object') {
                tempValue = JSON.stringify(tempValue);
            }
            finalParams.value = tempValue;
            return finalParams;
        },
    },
    _a[ddSdk_1.ENV_ENUM.android] = {
        vs: '2.4.0',
        paramsDeal: utParamsObj2Str,
    },
    _a));
/**
 * 上报埋点
 * @apiName biz.util.ut
 * @supportVersion  pc: 3.0.0 ios: 2.4.0 android: 2.4.0
 */
function ut$(params) {
    return ddSdk_1.ddSdk.invokeAPI(apiName, params);
}
exports.ut$ = ut$;
exports.default = ut$;


/***/ }),

/***/ "PloR":
/*!*****************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/polyfills/objectKeys.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
Object.keys||(Object.keys=function(e){if(e!==Object(e))throw new TypeError("Object.keys called on a non-object");var t,r=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.push(t);return r});

/***/ }),

/***/ "QfWi":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sdk = exports.lifecycle = undefined;
exports.setOption = setOption;

__webpack_require__(/*! dingtalk-jsapi/entry/union */ "xSbw");

var _ut = __webpack_require__(/*! @ali/dingtalk-jsapi/api/biz/util/ut */ "Pkh8");

var _ut2 = _interopRequireDefault(_ut);

var _core = __webpack_require__(/*! @ali/dingtalk-jsapi/core */ "YYgw");

var _sdk = __webpack_require__(/*! ./utils/sdk */ "mkrh");

var _globals = __webpack_require__(/*! ./constants/globals */ "Mice");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;


function didMount(name) {
  console.log(name + ' didMount');
}

function didUpdate(name) {
  console.log(name + ' didUpdate');
}

function didUnmount(name) {
  console.log(name + ' didUnmount');
}

var lifecycle = exports.lifecycle = {
  didMount: didMount,
  didUpdate: didUpdate,
  didUnmount: didUnmount
};

var sdk = exports.sdk = {
  triggerCustomEvent: _sdk.triggerCustomEvent,
  listenCustomEvent: _sdk.listenCustomEvent,
  removeCustomEvent: _sdk.removeCustomEvent,
  request: _sdk.request,
  openApp: _sdk.openApp,
  openSubPage: _sdk.openSubPage,

  // 以下为深度共创企业提供的未正式发布的SDK
  _removeCustomEvents: _sdk.removeCustomEvents,
  _dd: _core.env,
  _setStorageItem: _sdk.setStorageItem,
  _getStorageItem: _sdk.getStorageItem,
  _removeStorageItem: _sdk.removeStorageItem,
  _clearStorage: _sdk.clearStorage,
  _ut: _ut2.default,
  _log: _sdk.log

  /**
   * 工作台插件SDK必要参数设置
   * @param {string}} globals 
   */
};function setOption(globals) {
  (0, _globals.setGlobals)(globals);
}

/***/ }),

/***/ "Qj+i":
/*!*****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_dom-create.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "k0kn");
var document = __webpack_require__(/*! ./_global */ "T/px").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "R/5T":
/*!*****************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/platform/ios.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0});var ddSdk_1=__webpack_require__(/*! ../lib/ddSdk */ "xrN5"),env_1=__webpack_require__(/*! ../lib/env */ "jEw7"),sdk_1=__webpack_require__(/*! ../lib/sdk */ "lnAV"),eapp_1=__webpack_require__(/*! ../lib/bridge/eapp */ "7uKH"),webviewInMiniApp_1=__webpack_require__(/*! ../lib/bridge/webviewInMiniApp */ "vXSE"),h5Ios_1=__webpack_require__(/*! ../lib/bridge/h5Ios */ "YViV"),weex_1=__webpack_require__(/*! ../lib/bridge/weex */ "V3Lu"),h5Event_1=__webpack_require__(/*! ../lib/bridge/h5Event */ "3WaP"),weexEvent_1=__webpack_require__(/*! ../lib/bridge/weexEvent */ "6PdP");ddSdk_1.ddSdk.setPlatform({platform:env_1.ENV_ENUM.ios,bridgeInit:function(){var e=env_1.getENV();return e.appType===sdk_1.APP_TYPE.MINI_APP?Promise.resolve(eapp_1.default):e.appType===sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP?Promise.resolve(webviewInMiniApp_1.default):e.appType===sdk_1.APP_TYPE.WEEX?weex_1.iosWeexBridge():h5Ios_1.h5IosBridgeInit().then(function(){return h5Ios_1.default})},authMethod:"runtime.permission.requestJsApis",event:{on:function(e,r){var i=env_1.getENV();switch(i.appType){case sdk_1.APP_TYPE.WEB:case sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP:h5Event_1.on(e,r);break;case sdk_1.APP_TYPE.WEEX:weexEvent_1.on(e,r);break;default:throw new Error("Not support global event in the platfrom: "+i.appType)}},off:function(e,r){var i=env_1.getENV();switch(i.appType){case sdk_1.APP_TYPE.WEB:case sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP:h5Event_1.off(e,r);break;case sdk_1.APP_TYPE.WEEX:weexEvent_1.off(e,r);break;default:throw new Error("Not support global event in the platfrom: "+i.appType)}}}});

/***/ }),

/***/ "RvhN":
/*!***************************************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/constants.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.FRAMEWORK=exports.PLATFORM=exports.RUNTIME=void 0,exports.RUNTIME={WEB:"Web",WEEX:"Weex",UNKNOWN:"Unknown"},exports.PLATFORM={MAC:"Mac",WINDOWS:"Windows",IOS:"iOS",ANDROID:"Android",IPAD:"iPad",BROWSER:"Browser",UNKNOWN:"Unknown"},exports.FRAMEWORK={VUE:"Vue",RAX:"Rax",UNKNOWN:"Unknown"};

/***/ }),

/***/ "SLPr":
/*!*****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_user-agent.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "T/px");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "SjPH":
/*!*************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "Ve1z")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "r4jH")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "T/px":
/*!*************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_global.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "TFiO":
/*!*****************************!*\
  !*** ./services/request.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lwp = __webpack_require__(/*! @ali/dingtalk-jsapi/api/internal/request/lwp */ "CsdP");

var _lwp2 = _interopRequireDefault(_lwp);

var _tool = __webpack_require__(/*! ../utils/tool */ "sFzS");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;


// TODO：请按照服务端给出的lwpBaseUrl修改
var lwpBaseUrl = '/r/Adaptor';

var request = function request(uri, body, customBaseUrl) {
    var startTime = Date.now();
    return new Promise(function (resolve, reject) {
        (0, _lwp2.default)({
            uri: (customBaseUrl || lwpBaseUrl) + '/' + uri,
            body: body || [],
            onSuccess: function onSuccess() {
                var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var endTime = Date.now();

                // try {
                //     // 由于console.log的内容太多，debug时较难排查问题，去掉返回的数据
                //     consolelog(`${uri} 接口返回数据: ${JSON.stringify(result.body)}`);
                // } catch (e) {
                //     console.error(e);
                // }

                if (result.code === 200) {
                    resolve(result.body);
                    // logger.logApi2RetCode({
                    //     api: uri,
                    //     issuccess: true,
                    //     delay: endTime - startTime,
                    //     msg: `${result.code}`,
                    // });
                } else {
                    var reason = '网络错误';
                    if (result.body) {
                        reason = result.body.errorMsg || result.body.errorMessage || result.body.reason || '网络错误';
                    }
                    dd.showToast({
                        type: 'fail',
                        content: reason,
                        duration: 2000
                    });

                    try {
                        var MAX_STR_LEN = 1024;
                        // logger.logApi2RetCode({
                        //     api: uri,
                        //     issuccess: false,
                        //     delay: endTime - startTime,
                        //     msg: `${result.code}:${reason}`,
                        //     // 将错误详细信息记录日志，截取1024字符，因为retcode上报内容太多的话会出问题
                        //     detail: result.body ? JSON.stringify(result.body).substr(0, MAX_STR_LEN) : '',
                        // });
                    } catch (e) {
                        (0, _tool.consoleError)(e);
                    }
                    reject(reason);
                }
            },
            onFail: function onFail() {
                var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var endTime = Date.now();
                (0, _tool.consolelog)(uri + ' \u63A5\u53E3\u8BF7\u6C42\u5931\u8D25: ', e);

                var serviceExption = '系统错误';
                dd.showToast({
                    type: 'fail',
                    content: e.errorMessage || serviceExption,
                    duration: 2000
                });

                // logger.logApi2RetCode({
                //     api: uri,
                //     issuccess: false,
                //     delay: endTime - startTime,
                //     msg: `${e.code}:${e.errorMessage || serviceExption}`,
                // });

                reject(e.errorMessage || serviceExption);
            }
        });
    });
};

exports.default = request;
module.exports = exports['default'];

/***/ }),

/***/ "TP6P":
/*!**************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_perform.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "TRZB":
/*!************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/polyfills/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),__webpack_require__(/*! ./es6Promise */ "n5lz"),__webpack_require__(/*! ./objectAssign */ "fcHS"),__webpack_require__(/*! ./objectKeys */ "PloR");

/***/ }),

/***/ "ToOj":
/*!********************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/bridge/h5Pc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.h5PcBridgeInit=void 0;var h5PcBridgeInit=function(){return Promise.resolve(__webpack_require__(/*! ../packages/frame-talk-client-pc/index.js */ "mOn6"))};exports.h5PcBridgeInit=h5PcBridgeInit;var h5PcBridge=function(e,n){return new Promise(function(r,t){return __webpack_require__(/*! ../packages/frame-talk-client-pc/index.js */ "mOn6").invokeAPI(e,n).result.then(function(e){return"function"==typeof n.onSuccess&&n.onSuccess.call(null,e),r(e)},function(e){return"function"==typeof n.onFail&&n.onFail.call(null,e),t(e)})})};exports.default=h5PcBridge;

/***/ }),

/***/ "TutT":
/*!*****************************************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/environment.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;function environment(n,i,a){var t="Web"===a.platform,e="iOS"===a.platform,r="android"===a.platform,o=r||e,s=function(){return t?window.navigator.userAgent.toLowerCase():""}(),c=function(){var n={};if(t){var i=window.name;try{var a=JSON.parse(i);n.containerId=a.containerId,n.version=a.hostVersion,n.language=a.language||"*"}catch(n){}}return n}(),d=function(){return o?"DingTalk"===a.appName||"com.alibaba.android.rimet"===a.appName:s.indexOf("dingtalk")>-1||!!c.containerId}(),O=function(){if(t){if(c.version)return c.version;var n=s.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);null===n&&(n=s.match(/dingtalk\/([a-zA-Z0-9.-]+)/));return n&&n[1]||"Unknown"}return a.appVersion}(),u=!!c.containerId,l=/iphone|ipod|ios/.test(s),f=/ipad/.test(s),p=s.indexOf("android")>-1,m=s.indexOf("mac")>-1&&u,A=s.indexOf("win")>-1&&u,g=!m&&!A&&u,v=u,P="";return P=d?l||e?constants_1.PLATFORM.IOS:p||r?constants_1.PLATFORM.ANDROID:f?constants_1.PLATFORM.IPAD:m?constants_1.PLATFORM.MAC:A?constants_1.PLATFORM.WINDOWS:g?constants_1.PLATFORM.BROWSER:constants_1.PLATFORM.UNKNOWN:constants_1.PLATFORM.UNKNOWN,{isDingTalk:d,isWebiOS:l,isWebAndroid:p,isWeexiOS:e,isWeexAndroid:r,isDingTalkPCMac:m,isDingTalkPCWeb:g,isDingTalkPCWindows:A,isDingTalkPC:v,runtime:n,framework:i,platform:P,version:O,isWeex:o}}Object.defineProperty(exports,"__esModule",{value:!0});var constants_1=__webpack_require__(/*! ./constants */ "RvhN");exports.default=environment;

/***/ }),

/***/ "TxCu":
/*!*********************************************************!*\
  !*** /snapshot/toolkit/node_modules/process/browser.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "U1bm":
/*!****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_iter-step.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "UAHs":
/*!**************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_defined.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "UUul":
/*!********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/es6.array.from.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "/QwB");
var $export = __webpack_require__(/*! ./_export */ "rG/S");
var toObject = __webpack_require__(/*! ./_to-object */ "MM90");
var call = __webpack_require__(/*! ./_iter-call */ "kley");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "C3cc");
var toLength = __webpack_require__(/*! ./_to-length */ "j20N");
var createProperty = __webpack_require__(/*! ./_create-property */ "VBh5");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "bj1Q");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "0yRZ")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "Ui/0":
/*!********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/fn/promise.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "szSW");
__webpack_require__(/*! ../modules/es6.string.iterator */ "SjPH");
__webpack_require__(/*! ../modules/web.dom.iterable */ "ZIKm");
__webpack_require__(/*! ../modules/es6.promise */ "gRmk");
__webpack_require__(/*! ../modules/es7.promise.finally */ "bbHu");
__webpack_require__(/*! ../modules/es7.promise.try */ "LNt7");
module.exports = __webpack_require__(/*! ../modules/_core */ "6kth").Promise;


/***/ }),

/***/ "V3Lu":
/*!********************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/bridge/weex.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.androidWeexBridge=exports.iosWeexBridge=exports.requireModule=void 0;var STATUS_NO_RESULT=0,STATUS_OK=1,STATUS_ERROR=2,WEEX_IOS_BIZ_SUCCESS_CODE="0",requireModule=function(e){return"undefined"!=typeof __weex_require__?__weex_require__("@weex-module/"+e):"undefined"!=typeof weex?weex.requireModule(e):void 0};exports.requireModule=requireModule;var iosWeexBridge=function(){return Promise.resolve(function(e,r){return new Promise(function(o,i){var n=exports.requireModule("nuvajs-exec"),s=e.split("."),t=s.pop(),u=s.join(".");n.exec({plugin:u,action:t,args:r},function(e){e&&e.errorCode===WEEX_IOS_BIZ_SUCCESS_CODE?("function"==typeof r.onSuccess&&r.onSuccess(e.result),o(e.result)):("function"==typeof r.onFail&&r.onFail(e.result),i(e.result))})})})};exports.iosWeexBridge=iosWeexBridge;var androidWeexBridge=function(){return Promise.resolve(function(e,r){return new Promise(function(o,i){var n=exports.requireModule("nuvajs-exec"),s=e.split("."),t=s.pop(),u=s.join(".");n.exec({plugin:u,action:t,args:r},function(e){var n={};try{if(e&&e.__message__)if("object"==typeof e.__message__)n=e.__message__;else try{n=JSON.parse(e.__message__)}catch(r){"string"==typeof e.__message__&&(n=e.__message__)}}catch(e){}e&&parseInt(e.__status__+"",10)===STATUS_OK?("function"==typeof r.onSuccess&&r.onSuccess(n),o(n)):("function"==typeof r.onFail&&r.onFail(n),i(n))})})})};exports.androidWeexBridge=androidWeexBridge;

/***/ }),

/***/ "VBh5":
/*!**********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_create-property.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "d66Q");
var createDesc = __webpack_require__(/*! ./_property-desc */ "jq33");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "VUb2":
/*!***************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "qQ7p");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "mIpV");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "/VUQ")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "INl8")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "VYU6":
/*!*************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "Ve1z":
/*!****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_string-at.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "+3bn");
var defined = __webpack_require__(/*! ./_defined */ "UAHs");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "WF8E":
/*!*******************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/sdk/sdkLib.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;function isFunction(o){return"function"==typeof o}function compareVersion(o,e){function r(o){return parseInt(o,10)||0}for(var n=o.split(".").map(r),t=e.split(".").map(r),E=0;E<n.length;E++){if(void 0===t[E])return!1;if(n[E]<t[E])return!1;if(n[E]>t[E])return!0}return!0}Object.defineProperty(exports,"__esModule",{value:!0}),exports.LogLevel=exports.APP_TYPE=exports.ENV_ENUM_SUB=exports.ENV_ENUM=exports.ERROR_CODE=exports.compareVersion=exports.isFunction=void 0,exports.isFunction=isFunction,exports.compareVersion=compareVersion;var ERROR_CODE;!function(o){o.cancel="-1",o.not_exist="1",o.no_permission="7",o.jsapi_internal_error="22"}(ERROR_CODE=exports.ERROR_CODE||(exports.ERROR_CODE={}));var ENV_ENUM;!function(o){o.pc="pc",o.android="android",o.ios="ios",o.notInDingTalk="notInDingTalk"}(ENV_ENUM=exports.ENV_ENUM||(exports.ENV_ENUM={}));var ENV_ENUM_SUB;!function(o){o.mac="mac",o.win="win",o.noSub="noSub"}(ENV_ENUM_SUB=exports.ENV_ENUM_SUB||(exports.ENV_ENUM_SUB={}));var APP_TYPE;!function(o){o.WEB="WEB",o.MINI_APP="MINI_APP",o.WEEX="WEEX",o.WEBVIEW_IN_MINIAPP="WEBVIEW_IN_MINIAPP",o.WEEX_WIDGET="WEEX_WIDGET"}(APP_TYPE=exports.APP_TYPE||(exports.APP_TYPE={}));var LogLevel;!function(o){o[o.INFO=1]="INFO",o[o.WARNING=2]="WARNING",o[o.ERROR=3]="ERROR"}(LogLevel=exports.LogLevel||(exports.LogLevel={}));

/***/ }),

/***/ "WfUP":
/*!*****************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/polyfills/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./es6Promise */ "HzN2");
__webpack_require__(/*! ./objectAssign */ "/N8f");
__webpack_require__(/*! ./objectKeys */ "xckU");


/***/ }),

/***/ "Wvm0":
/*!******************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_iter-create.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "4k1/");
var descriptor = __webpack_require__(/*! ./_property-desc */ "jq33");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "6ESS");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "vmZR")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "haEp")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "XFF6":
/*!*******************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/platform/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),__webpack_require__(/*! ./pc */ "4bnQ"),__webpack_require__(/*! ./android */ "jjYE"),__webpack_require__(/*! ./ios */ "R/5T");

/***/ }),

/***/ "YViV":
/*!*********************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/bridge/h5Ios.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.h5IosBridgeInit=void 0;var h5BridgeReadyPromise,h5IosBridgeInit=function(){return h5BridgeReadyPromise||(h5BridgeReadyPromise=new Promise(function(e,r){if("undefined"!=typeof WebViewJavascriptBridge){try{WebViewJavascriptBridge.init(function(e,r){})}catch(e){return r()}return e({})}document.addEventListener("WebViewJavascriptBridgeReady",function(){if("undefined"==typeof WebViewJavascriptBridge)return r();try{WebViewJavascriptBridge.init(function(e,r){})}catch(e){return r()}return e({})},!1)})),h5BridgeReadyPromise};exports.h5IosBridgeInit=h5IosBridgeInit;var h5IosBridge=function(e,r){return h5BridgeReadyPromise||(h5BridgeReadyPromise=exports.h5IosBridgeInit()),h5BridgeReadyPromise.then(function(){var i=Object.assign({},r);return new Promise(function(r,n){if(!0===i.watch){var t=i.onSuccess;delete i.onSuccess,"undefined"!=typeof WebViewJavascriptBridge&&WebViewJavascriptBridge.registerHandler(e,function(e,r){"function"==typeof t&&t.call(null,e),r&&r({errorCode:"0",errorMessage:"success"})})}void 0!==window.WebViewJavascriptBridge&&window.WebViewJavascriptBridge.callHandler(e,Object.assign({},i),function(e){var t=e||{};"0"===t.errorCode?("function"==typeof i.onSuccess&&i.onSuccess.call(null,t.result),r(t.result)):("-1"===t.errorCode&&"function"==typeof i.onCancel?i.onCancel.call(null,t.result,t.errorCode):"function"==typeof i.onFail&&i.onFail.call(null,t.result,t.errorCode),n(t.result))})})})};exports.default=h5IosBridge;

/***/ }),

/***/ "YWph":
/*!***********************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/apiHelper.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.genBizStoreParamsDealFn = exports.genBoolResultDealFn = exports.forceChangeParamsDealFn = exports.genDefaultParamsDealFn = exports.addDefaultCorpIdParamsDeal = exports.addWatchParamsDeal = void 0;
exports.addWatchParamsDeal = function (params) {
    var finalParams = Object.assign({}, params);
    finalParams.watch = true;
    return finalParams;
};
exports.addDefaultCorpIdParamsDeal = function (params) {
    var finalParams = Object.assign({}, params);
    finalParams.corpId = 'corpId';
    return finalParams;
};
exports.genDefaultParamsDealFn = function (defaultParams) {
    var defaultParamsObj = Object.assign({}, defaultParams);
    return function (params) {
        return Object.assign({}, defaultParamsObj, params);
    };
};
exports.forceChangeParamsDealFn = function (forceParams) {
    var forceParamsObj = Object.assign({}, forceParams);
    return function (params) {
        return Object.assign(params, forceParamsObj);
    };
};
exports.genBoolResultDealFn = function (boolKeyList) {
    return function (params) {
        var finalParams = Object.assign({}, params);
        boolKeyList.forEach(function (key) {
            if (finalParams[key] !== undefined) {
                finalParams[key] = !!finalParams[key];
            }
        });
        return finalParams;
    };
};
exports.genBizStoreParamsDealFn = function (params) {
    var finalParams = Object.assign({}, params);
    if (typeof finalParams.params !== 'string') {
        finalParams.params = JSON.stringify(finalParams);
        return finalParams;
    }
    else {
        return finalParams;
    }
};


/***/ }),

/***/ "YXrh":
/*!*****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_object-dps.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "d66Q");
var anObject = __webpack_require__(/*! ./_an-object */ "6k3Y");
var getKeys = __webpack_require__(/*! ./_object-keys */ "hkbN");

module.exports = __webpack_require__(/*! ./_descriptors */ "2FaN") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "YYgw":
/*!**************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/core.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
var ddSdk_1 = __webpack_require__(/*! ./lib/ddSdk */ "kGXD");
var otherApi = __webpack_require__(/*! ./lib/otherApi */ "qg9k");
var core = Object.assign({}, otherApi, ddSdk_1.ddSdk.getExportSdk());
module.exports = core;


/***/ }),

/***/ "ZIKm":
/*!**********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ "4+NM");
var global = __webpack_require__(/*! ./_global */ "T/px");
var hide = __webpack_require__(/*! ./_hide */ "vmZR");
var Iterators = __webpack_require__(/*! ./_iterators */ "2ZeP");
var TO_STRING_TAG = __webpack_require__(/*! ./_wks */ "haEp")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "ZUyg":
/*!************************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/babel-runtime/node_modules/regenerator-runtime/runtime.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ "a+z/":
/*!***********************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/sdk/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sdk = exports.LogLevel = exports.APP_TYPE = exports.isFunction = exports.compareVersion = exports.ENV_ENUM_SUB = exports.ENV_ENUM = void 0;
var sdkLib_1 = __webpack_require__(/*! ./sdkLib */ "dO2f");
Object.defineProperty(exports, "APP_TYPE", { enumerable: true, get: function () { return sdkLib_1.APP_TYPE; } });
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return sdkLib_1.LogLevel; } });
Object.defineProperty(exports, "isFunction", { enumerable: true, get: function () { return sdkLib_1.isFunction; } });
Object.defineProperty(exports, "compareVersion", { enumerable: true, get: function () { return sdkLib_1.compareVersion; } });
Object.defineProperty(exports, "ENV_ENUM", { enumerable: true, get: function () { return sdkLib_1.ENV_ENUM; } });
Object.defineProperty(exports, "ENV_ENUM_SUB", { enumerable: true, get: function () { return sdkLib_1.ENV_ENUM_SUB; } });
function getTargetApiConfigVS(apiConfig, env) {
    var targetVersion = apiConfig && apiConfig.vs;
    if (typeof targetVersion === 'object') {
        targetVersion = targetVersion[env.platformSub];
    }
    return targetVersion;
}
var Sdk = /** @class */ (function () {
    function Sdk(env, logFn) {
        var _this = this;
        this.configJsApiList = [];
        this.hadConfig = false;
        this.p = {};
        this.config$ = new Promise(function (resolve, reject) {
            _this.p.reject = reject;
            _this.p.resolve = resolve;
        });
        this.logQueue = [];
        this.devConfig = {
            debug: false,
        };
        this.platformConfigMap = {};
        this.invokeAPIConfigMapByMethod = {};
        this.isBridgeDrity = true;
        this.getExportSdk = function () {
            return _this.exportSdk;
        };
        this.setAPI = function (method, config) {
            _this.invokeAPIConfigMapByMethod[method] = config;
        };
        this.setPlatform = function (core) {
            _this.isBridgeDrity = true;
            _this.platformConfigMap[core.platform] = core;
            if (core.platform === _this.env.platform) {
                core.bridgeInit().catch(function (err) {
                    _this.customLog(sdkLib_1.LogLevel.WARNING, ['auto bridgeInit error', err || '']);
                });
            }
        };
        this.getPlatformConfigMap = function () {
            return _this.platformConfigMap;
        };
        this.deleteApiConfig = function (method, platform) {
            var invokeAPIConfig = _this.invokeAPIConfigMapByMethod[method];
            if (invokeAPIConfig) {
                delete invokeAPIConfig[platform];
            }
        };
        this.invokeAPI = function (method, params, isAuthApi) {
            if (params === void 0) { params = {}; }
            if (isAuthApi === void 0) { isAuthApi = true; }
            _this.customLog(sdkLib_1.LogLevel.INFO, ["==> \"" + method + "\" params: ", params]);
            var startTime = +new Date();
            var invokeId = startTime + '_' + Math.floor(Math.random() * 1000);
            if (_this.devConfig.onBeforeInvokeAPI) {
                try {
                    _this.devConfig.onBeforeInvokeAPI({
                        invokeId: invokeId,
                        method: method,
                        params: params,
                        startTime: startTime,
                    });
                }
                catch (err) {
                    _this.customLog(sdkLib_1.LogLevel.ERROR, ["call Hook:onBeforeInvokeAPI failed, reason:", err]);
                }
            }
            if (_this.devConfig.isAuthApi === false) {
                isAuthApi = false;
            }
            return _this.bridgeInitFn().then(function (JSBridge) {
                var invokeAPIConfig = _this.invokeAPIConfigMapByMethod[method];
                // 判断是否强制开启兼容处理
                var isForceEnableDealApi = _this.devConfig.forceEnableDealApiFnMap
                    && _this.devConfig.forceEnableDealApiFnMap[method]
                    && _this.devConfig.forceEnableDealApiFnMap[method](params) === true;
                var isDisableCurrentApiDeal = !isForceEnableDealApi &&
                    (_this.devConfig.isDisableDeal === true
                        || (_this.devConfig.disbaleDealApiWhiteList
                            && _this.devConfig.disbaleDealApiWhiteList.indexOf(method) !== -1));
                if (invokeAPIConfig || !isAuthApi) {
                    var apiConfig_1;
                    if (invokeAPIConfig) {
                        apiConfig_1 = invokeAPIConfig[_this.env.platform];
                    }
                    if (apiConfig_1 || !isAuthApi) {
                        var callParams_1 = {};
                        if (!isDisableCurrentApiDeal
                            && apiConfig_1 && apiConfig_1.paramsDeal && sdkLib_1.isFunction(apiConfig_1.paramsDeal)) {
                            callParams_1 = apiConfig_1.paramsDeal(params);
                        }
                        else {
                            callParams_1 = Object.assign({}, params);
                        }
                        var resultDealFn_1 = function (res) {
                            if (!isDisableCurrentApiDeal
                                && apiConfig_1 && apiConfig_1.resultDeal && sdkLib_1.isFunction(apiConfig_1.resultDeal)) {
                                return apiConfig_1.resultDeal(res);
                            }
                            else {
                                return res;
                            }
                        };
                        if (sdkLib_1.isFunction(callParams_1.onSuccess)) {
                            var callParamsOnSuccess_1 = callParams_1.onSuccess;
                            callParams_1.onSuccess = function (res) {
                                callParamsOnSuccess_1(resultDealFn_1(res));
                            };
                        }
                        return JSBridge(method, callParams_1).then(resultDealFn_1, function (err) {
                            var isConfiging = _this.hadConfig && _this.isReady === undefined
                                && _this.configJsApiList.indexOf(method) !== -1;
                            var isNoPermissionErr = (typeof err === 'object' && typeof err.errorCode === 'string'
                                && err.errorCode === sdkLib_1.ERROR_CODE.no_permission);
                            var isCancelErr = (typeof err === 'object' && typeof err.errorCode === 'string'
                                && err.errorCode === sdkLib_1.ERROR_CODE.cancel);
                            var targetVersionForSupport = getTargetApiConfigVS(apiConfig_1, _this.env);
                            var isSupportByStaticData = (targetVersionForSupport && _this.env.version
                                && sdkLib_1.compareVersion(_this.env.version, targetVersionForSupport));
                            // 移动端判断
                            var mobileJudgeIsRetry = (_this.env.platform === sdkLib_1.ENV_ENUM.ios || _this.env.platform === sdkLib_1.ENV_ENUM.android) &&
                                isConfiging &&
                                isNoPermissionErr;
                            // pc端判断（需要兼容老版本），jsapi支持当前平台 且 在config流程中 且 isAuthApi 且不是 -1取消错误
                            var pcJudgeIsRetry = _this.env.platform === sdkLib_1.ENV_ENUM.pc && isConfiging && ((isSupportByStaticData
                                && !isCancelErr
                                && isAuthApi) || isNoPermissionErr);
                            if (mobileJudgeIsRetry || pcJudgeIsRetry) {
                                return _this.config$.then(function () {
                                    return JSBridge(method, callParams_1).then(resultDealFn_1);
                                });
                            }
                            else {
                                return Promise.reject(err);
                            }
                        }).then(function (res) {
                            if (_this.devConfig.onAfterInvokeAPI) {
                                try {
                                    _this.devConfig.onAfterInvokeAPI({
                                        invokeId: invokeId,
                                        method: method,
                                        params: params,
                                        payload: res,
                                        isSuccess: true,
                                        startTime: startTime,
                                        duration: (+new Date()) - startTime,
                                    });
                                }
                                catch (err) {
                                    _this.customLog(sdkLib_1.LogLevel.ERROR, ["call Hook:onAfterInvokeAPI failed, reason:", err]);
                                }
                            }
                            _this.customLog(sdkLib_1.LogLevel.INFO, ["<== \"" + method + "\" success result: ", res]);
                            return res;
                        }, function (err) {
                            if (_this.devConfig.onAfterInvokeAPI) {
                                try {
                                    _this.devConfig.onAfterInvokeAPI({
                                        invokeId: invokeId,
                                        method: method,
                                        params: params,
                                        payload: err,
                                        startTime: startTime,
                                        duration: (+new Date()) - startTime,
                                        isSuccess: false,
                                    });
                                }
                                catch (err) {
                                    _this.customLog(sdkLib_1.LogLevel.ERROR, ["call Hook:onAfterInvokeAPI failed, reason:", err]);
                                }
                            }
                            _this.customLog(sdkLib_1.LogLevel.WARNING, ["<== \"" + method + "\" fail result: ", err]);
                            return Promise.reject(err);
                        });
                    }
                    else {
                        var errorMessage = "\"" + method + "\" do not support the current platform (" + _this.env.platform + ")";
                        _this.customLog(sdkLib_1.LogLevel.ERROR, [errorMessage]);
                        return Promise.reject({
                            errorCode: sdkLib_1.ERROR_CODE.jsapi_internal_error,
                            errorMessage: errorMessage,
                        });
                    }
                }
                else {
                    var errorMessage = "This API method is not configured for the platform (" + _this.env.platform + ")";
                    _this.customLog(sdkLib_1.LogLevel.ERROR, [errorMessage]);
                    return Promise.reject({
                        errorCode: sdkLib_1.ERROR_CODE.jsapi_internal_error,
                        errorMessage: errorMessage,
                    });
                }
            });
        };
        this.customLog = function (level, text) {
            var newLogObj = {
                level: level,
                text: text,
                time: new Date(),
            };
            if (_this.devConfig.debug === true) {
                _this.customLogInstance(newLogObj);
            }
            else {
                _this.logQueue.push(newLogObj);
                var MAX_CACHE_LOG = 10;
                if (_this.logQueue.length > MAX_CACHE_LOG) {
                    _this.logQueue = _this.logQueue.slice(_this.logQueue.length - MAX_CACHE_LOG);
                }
            }
        };
        this.clearLogQueue = function () {
            _this.logQueue.forEach(function (logObj) {
                _this.customLogInstance(logObj);
            });
            _this.logQueue = [];
        };
        this.customLogInstance = logFn;
        this.env = env;
        this.bridgeInitFn = function () {
            if (_this.bridgeInitFnPromise && !_this.isBridgeDrity) {
                return _this.bridgeInitFnPromise;
            }
            else {
                _this.isBridgeDrity = false;
                var platformCore = _this.platformConfigMap[env.platform];
                if (platformCore) {
                    _this.bridgeInitFnPromise = platformCore.bridgeInit().catch(function (err) {
                        _this.customLog(sdkLib_1.LogLevel.ERROR, ['JsBridge initialization fails, jsapi will not work']);
                        return Promise.reject(err);
                    });
                }
                else {
                    var errMsg = "Do not support the current environment\uFF1A" + env.platform;
                    _this.customLog(sdkLib_1.LogLevel.WARNING, [errMsg]);
                    _this.bridgeInitFnPromise = Promise.reject(new Error(errMsg));
                }
                return _this.bridgeInitFnPromise;
            }
        };
        var devConfig = function (devConfigParams) {
            if (devConfigParams === void 0) { devConfigParams = {}; }
            _this.devConfig = Object.assign(_this.devConfig, devConfigParams);
            if (devConfigParams.debug === true) {
                _this.clearLogQueue();
            }
            if (devConfigParams.extraPlatform) {
                _this.setPlatform(devConfigParams.extraPlatform);
            }
        };
        this.exportSdk = {
            config: function (configParams) {
                if (configParams === void 0) { configParams = {}; }
                /** TODO: compatible */
                var isOnlyDevConfig = true;
                Object.keys(configParams).forEach(function (key) {
                    if (['debug', 'usePromise'].indexOf(key) === -1) {
                        isOnlyDevConfig = false;
                    }
                });
                if (isOnlyDevConfig) {
                    _this.customLog(sdkLib_1.LogLevel.WARNING, ['This is a deprecated feature, recommend use dd.devConfig']);
                    devConfig(configParams);
                }
                else {
                    if (!_this.hadConfig) {
                        if (configParams.jsApiList) {
                            _this.configJsApiList = configParams.jsApiList;
                        }
                        _this.hadConfig = true;
                        _this.bridgeInitFn().then(function (JSBridge) {
                            var platformCore = _this.platformConfigMap[env.platform];
                            var inConfigParams = configParams;
                            if (platformCore.authParamsDeal) {
                                inConfigParams = platformCore.authParamsDeal(inConfigParams);
                            }
                            JSBridge(platformCore.authMethod, inConfigParams).then(function (res) {
                                _this.isReady = true;
                                _this.p.resolve(res);
                            }).catch(function (err) {
                                _this.isReady = false;
                                _this.p.reject(err);
                            });
                        }, function (err) {
                            _this.customLog(sdkLib_1.LogLevel.ERROR, ['JsBridge initialization failed and "dd.config" failed to call']);
                            // SEE: https://work.aone.alibaba-inc.com/issue/29105600
                            _this.p.reject(err);
                        });
                    }
                    else {
                        _this.customLog(sdkLib_1.LogLevel.WARNING, ['Config has been executed']);
                    }
                }
            },
            devConfig: devConfig,
            ready: function (callback) {
                /** TODO: compatible */
                if (_this.hadConfig === false) {
                    _this.customLog(sdkLib_1.LogLevel.WARNING, ['You don \'t use a dd.config, '
                            + 'so you don\'t need to wrap dd.ready, recommend remove dd.ready']);
                    _this.bridgeInitFn().then(function () {
                        callback();
                    });
                }
                else {
                    _this.config$.then(function (res) {
                        callback();
                    });
                }
            },
            error: function (callback) {
                _this.config$.catch(function (res) {
                    callback(res);
                });
            },
            on: function (type, handler) {
                _this.bridgeInitFn().then(function () {
                    var platformCore = _this.platformConfigMap[env.platform];
                    platformCore.event.on(type, handler);
                });
            },
            off: function (type, handler) {
                _this.bridgeInitFn().then(function () {
                    var platformCore = _this.platformConfigMap[env.platform];
                    platformCore.event.off(type, handler);
                });
            },
            env: env,
            checkJsApi: function (params) {
                if (params === void 0) { params = {}; }
                var res = {};
                if (params.jsApiList) {
                    params.jsApiList.forEach(function (method) {
                        var invokeAPIConfig = _this.invokeAPIConfigMapByMethod[method];
                        if (invokeAPIConfig) {
                            var apiConfig = invokeAPIConfig[env.platform];
                            var targetVersion = getTargetApiConfigVS(apiConfig, env);
                            if (targetVersion
                                && env.version
                                && sdkLib_1.compareVersion(env.version, targetVersion)) {
                                res[method] = true;
                            }
                        }
                        if (!res[method]) {
                            res[method] = false;
                        }
                    });
                }
                return Promise.resolve(res);
            },
            _invoke: function (method, params) {
                if (params === void 0) { params = {}; }
                return _this.invokeAPI(method, params, false);
            },
        };
    }
    return Sdk;
}());
exports.Sdk = Sdk;


/***/ }),

/***/ "bOZP":
/*!*******************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_to-primitive.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "k0kn");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "bbHu":
/*!*************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/es7.promise.finally.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ "rG/S");
var core = __webpack_require__(/*! ./_core */ "6kth");
var global = __webpack_require__(/*! ./_global */ "T/px");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "xXvE");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "ErxN");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "bj1Q":
/*!******************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/core.get-iterator-method.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "G/N9");
var ITERATOR = __webpack_require__(/*! ./_wks */ "haEp")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "2ZeP");
module.exports = __webpack_require__(/*! ./_core */ "6kth").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "cjKa":
/*!*********************************************************!*\
  !*** ./node_modules/eventemitter2/lib/eventemitter2.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {
  var hasOwnProperty= Object.hasOwnProperty;
  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;
  var nextTickSupported= typeof process=='object' && typeof process.nextTick=='function';
  var symbolsSupported= typeof Symbol==='function';
  var reflectSupported= typeof Reflect === 'object';
  var setImmediateSupported= typeof setImmediate === 'function';
  var _setImmediate= setImmediateSupported ? setImmediate : setTimeout;
  var ownKeys= symbolsSupported? (reflectSupported && typeof Reflect.ownKeys==='function'? Reflect.ownKeys : function(obj){
    var arr= Object.getOwnPropertyNames(obj);
    arr.push.apply(arr, Object.getOwnPropertySymbols(obj));
    return arr;
  }) : Object.keys;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);

      if(conf.maxListeners!==undefined){
          this._maxListeners= conf.maxListeners;
      }

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this._newListener = conf.newListener);
      conf.removeListener && (this._removeListener = conf.removeListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);
      conf.ignoreErrors && (this.ignoreErrors = conf.ignoreErrors);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' +
        'leak detected. ' + count + ' listeners added. ' +
        'Use emitter.setMaxListeners() to increase limit.';

    if(this.verboseMemoryLeak){
      errorMsg += ' Event name: ' + eventName + '.';
    }

    if(typeof process !== 'undefined' && process.emitWarning){
      var e = new Error(errorMsg);
      e.name = 'MaxListenersExceededWarning';
      e.emitter = this;
      e.count = count;
      process.emitWarning(e);
    } else {
      console.error(errorMsg);

      if (console.trace){
        console.trace();
      }
    }
  }

  var toArray = function (a, b, c) {
    var n = arguments.length;
    switch (n) {
      case 0:
        return [];
      case 1:
        return [a];
      case 2:
        return [a, b];
      case 3:
        return [a, b, c];
      default:
        var arr = new Array(n);
        while (n--) {
          arr[n] = arguments[n];
        }
        return arr;
    }
  };

  function toObject(keys, values) {
    var obj = {};
    var key;
    var len = keys.length;
    var valuesCount = values ? value.length : 0;
    for (var i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = i < valuesCount ? values[i] : undefined;
    }
    return obj;
  }

  function TargetObserver(emitter, target, options) {
    this._emitter = emitter;
    this._target = target;
    this._listeners = {};
    this._listenersCount = 0;

    var on, off;

    if (options.on || options.off) {
      on = options.on;
      off = options.off;
    }

    if (target.addEventListener) {
      on = target.addEventListener;
      off = target.removeEventListener;
    } else if (target.addListener) {
      on = target.addListener;
      off = target.removeListener;
    } else if (target.on) {
      on = target.on;
      off = target.off;
    }

    if (!on && !off) {
      throw Error('target does not implement any known event API');
    }

    if (typeof on !== 'function') {
      throw TypeError('on method must be a function');
    }

    if (typeof off !== 'function') {
      throw TypeError('off method must be a function');
    }

    this._on = on;
    this._off = off;

    var _observers= emitter._observers;
    if(_observers){
      _observers.push(this);
    }else{
      emitter._observers= [this];
    }
  }

  Object.assign(TargetObserver.prototype, {
    subscribe: function(event, localEvent, reducer){
      var observer= this;
      var target= this._target;
      var emitter= this._emitter;
      var listeners= this._listeners;
      var handler= function(){
        var args= toArray.apply(null, arguments);
        var eventObj= {
          data: args,
          name: localEvent,
          original: event
        };
        if(reducer){
          var result= reducer.call(target, eventObj);
          if(result!==false){
            emitter.emit.apply(emitter, [eventObj.name].concat(args))
          }
          return;
        }
        emitter.emit.apply(emitter, [localEvent].concat(args));
      };


      if(listeners[event]){
        throw Error('Event \'' + event + '\' is already listening');
      }

      this._listenersCount++;

      if(emitter._newListener && emitter._removeListener && !observer._onNewListener){

        this._onNewListener = function (_event) {
          if (_event === localEvent && listeners[event] === null) {
            listeners[event] = handler;
            observer._on.call(target, event, handler);
          }
        };

        emitter.on('newListener', this._onNewListener);

        this._onRemoveListener= function(_event){
          if(_event === localEvent && !emitter.hasListeners(_event) && listeners[event]){
            listeners[event]= null;
            observer._off.call(target, event, handler);
          }
        };

        listeners[event]= null;

        emitter.on('removeListener', this._onRemoveListener);
      }else{
        listeners[event]= handler;
        observer._on.call(target, event, handler);
      }
    },

    unsubscribe: function(event){
      var observer= this;
      var listeners= this._listeners;
      var emitter= this._emitter;
      var handler;
      var events;
      var off= this._off;
      var target= this._target;
      var i;

      if(event && typeof event!=='string'){
        throw TypeError('event must be a string');
      }

      function clearRefs(){
        if(observer._onNewListener){
          emitter.off('newListener', observer._onNewListener);
          emitter.off('removeListener', observer._onRemoveListener);
          observer._onNewListener= null;
          observer._onRemoveListener= null;
        }
        var index= findTargetIndex.call(emitter, observer);
        emitter._observers.splice(index, 1);
      }

      if(event){
        handler= listeners[event];
        if(!handler) return;
        off.call(target, event, handler);
        delete listeners[event];
        if(!--this._listenersCount){
          clearRefs();
        }
      }else{
        events= ownKeys(listeners);
        i= events.length;
        while(i-->0){
          event= events[i];
          off.call(target, event, listeners[event]);
        }
        this._listeners= {};
        this._listenersCount= 0;
        clearRefs();
      }
    }
  });

  function resolveOptions(options, schema, reducers, allowUnknown) {
    var computedOptions = Object.assign({}, schema);

    if (!options) return computedOptions;

    if (typeof options !== 'object') {
      throw TypeError('options must be an object')
    }

    var keys = Object.keys(options);
    var length = keys.length;
    var option, value;
    var reducer;

    function reject(reason) {
      throw Error('Invalid "' + option + '" option value' + (reason ? '. Reason: ' + reason : ''))
    }

    for (var i = 0; i < length; i++) {
      option = keys[i];
      if (!allowUnknown && !hasOwnProperty.call(schema, option)) {
        throw Error('Unknown "' + option + '" option');
      }
      value = options[option];
      if (value !== undefined) {
        reducer = reducers[option];
        computedOptions[option] = reducer ? reducer(value, reject) : value;
      }
    }
    return computedOptions;
  }

  function constructorReducer(value, reject) {
    if (typeof value !== 'function' || !value.hasOwnProperty('prototype')) {
      reject('value must be a constructor');
    }
    return value;
  }

  function makeTypeReducer(types) {
    var message= 'value must be type of ' + types.join('|');
    var len= types.length;
    var firstType= types[0];
    var secondType= types[1];

    if (len === 1) {
      return function (v, reject) {
        if (typeof v === firstType) {
          return v;
        }
        reject(message);
      }
    }

    if (len === 2) {
      return function (v, reject) {
        var kind= typeof v;
        if (kind === firstType || kind === secondType) return v;
        reject(message);
      }
    }

    return function (v, reject) {
      var kind = typeof v;
      var i = len;
      while (i-- > 0) {
        if (kind === types[i]) return v;
      }
      reject(message);
    }
  }

  var functionReducer= makeTypeReducer(['function']);

  var objectFunctionReducer= makeTypeReducer(['object', 'function']);

  function makeCancelablePromise(Promise, executor, options) {
    var isCancelable;
    var callbacks;
    var timer= 0;
    var subscriptionClosed;

    var promise = new Promise(function (resolve, reject, onCancel) {
      options= resolveOptions(options, {
        timeout: 0,
        overload: false
      }, {
        timeout: function(value, reject){
          value*= 1;
          if (typeof value !== 'number' || value < 0 || !Number.isFinite(value)) {
            reject('timeout must be a positive number');
          }
          return value;
        }
      });

      isCancelable = !options.overload && typeof Promise.prototype.cancel === 'function' && typeof onCancel === 'function';

      function cleanup() {
        if (callbacks) {
          callbacks = null;
        }
        if (timer) {
          clearTimeout(timer);
          timer = 0;
        }
      }

      var _resolve= function(value){
        cleanup();
        resolve(value);
      };

      var _reject= function(err){
        cleanup();
        reject(err);
      };

      if (isCancelable) {
        executor(_resolve, _reject, onCancel);
      } else {
        callbacks = [function(reason){
          _reject(reason || Error('canceled'));
        }];
        executor(_resolve, _reject, function (cb) {
          if (subscriptionClosed) {
            throw Error('Unable to subscribe on cancel event asynchronously')
          }
          if (typeof cb !== 'function') {
            throw TypeError('onCancel callback must be a function');
          }
          callbacks.push(cb);
        });
        subscriptionClosed= true;
      }

      if (options.timeout > 0) {
        timer= setTimeout(function(){
          var reason= Error('timeout');
          reason.code = 'ETIMEDOUT'
          timer= 0;
          promise.cancel(reason);
          reject(reason);
        }, options.timeout);
      }
    });

    if (!isCancelable) {
      promise.cancel = function (reason) {
        if (!callbacks) {
          return;
        }
        var length = callbacks.length;
        for (var i = 1; i < length; i++) {
          callbacks[i](reason);
        }
        // internal callback to reject the promise
        callbacks[0](reason);
        callbacks = null;
      };
    }

    return promise;
  }

  function findTargetIndex(observer) {
    var observers = this._observers;
    if(!observers){
      return -1;
    }
    var len = observers.length;
    for (var i = 0; i < len; i++) {
      if (observers[i]._target === observer) return i;
    }
    return -1;
  }

  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i, typeLength) {
    if (!tree) {
      return null;
    }

    if (i === 0) {
      var kind = typeof type;
      if (kind === 'string') {
        var ns, n, l = 0, j = 0, delimiter = this.delimiter, dl = delimiter.length;
        if ((n = type.indexOf(delimiter)) !== -1) {
          ns = new Array(5);
          do {
            ns[l++] = type.slice(j, n);
            j = n + dl;
          } while ((n = type.indexOf(delimiter, j)) !== -1);

          ns[l++] = type.slice(j);
          type = ns;
          typeLength = l;
        } else {
          type = [type];
          typeLength = 1;
        }
      } else if (kind === 'object') {
        typeLength = type.length;
      } else {
        type = [type];
        typeLength = 1;
      }
    }

    var listeners= null, branch, xTree, xxTree, isolatedBranch, endReached, currentType = type[i],
        nextType = type[i + 1], branches, _listeners;

    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        handlers && handlers.push.apply(handlers, tree._listeners);
        return [tree];
      }
    }

    if (currentType === '*') {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      branches= ownKeys(tree);
      n= branches.length;
      while(n-->0){
        branch= branches[n];
        if (branch !== '_listeners') {
          _listeners = searchListenerTree(handlers, type, tree[branch], i + 1, typeLength);
          if(_listeners){
            if(listeners){
              listeners.push.apply(listeners, _listeners);
            }else{
              listeners = _listeners;
            }
          }
        }
      }
      return listeners;
    } else if (currentType === '**') {
      endReached = (i + 1 === typeLength || (i + 2 === typeLength && nextType === '*'));
      if (endReached && tree._listeners) {
        // The next element has a _listeners, add it to the handlers.
        listeners = searchListenerTree(handlers, type, tree, typeLength, typeLength);
      }

      branches= ownKeys(tree);
      n= branches.length;
      while(n-->0){
        branch= branches[n];
        if (branch !== '_listeners') {
          if (branch === '*' || branch === '**') {
            if (tree[branch]._listeners && !endReached) {
              _listeners = searchListenerTree(handlers, type, tree[branch], typeLength, typeLength);
              if(_listeners){
                if(listeners){
                  listeners.push.apply(listeners, _listeners);
                }else{
                  listeners = _listeners;
                }
              }
            }
            _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
          } else if (branch === nextType) {
            _listeners = searchListenerTree(handlers, type, tree[branch], i + 2, typeLength);
          } else {
            // No match on this one, shift into the tree but not in the type array.
            _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
          }
          if(_listeners){
            if(listeners){
              listeners.push.apply(listeners, _listeners);
            }else{
              listeners = _listeners;
            }
          }
        }
      }
      return listeners;
    }else if (tree[currentType]) {
      listeners= searchListenerTree(handlers, type, tree[currentType], i + 1, typeLength);
    }

      xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i + 1, typeLength);
    }

    xxTree = tree['**'];
    if (xxTree) {
      if (i < typeLength) {
        if (xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
        }

        // Build arrays of matching next branches and others.
        branches= ownKeys(xxTree);
        n= branches.length;
        while(n-->0){
          branch= branches[n];
          if (branch !== '_listeners') {
            if (branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i + 2, typeLength);
            } else if (branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i + 1, typeLength);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, {'**': isolatedBranch}, i + 1, typeLength);
            }
          }
        }
      } else if (xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
      } else if (xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength, typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener, prepend) {
    var len = 0, j = 0, i, delimiter = this.delimiter, dl= delimiter.length, ns;

    if(typeof type==='string') {
      if ((i = type.indexOf(delimiter)) !== -1) {
        ns = new Array(5);
        do {
          ns[len++] = type.slice(j, i);
          j = i + dl;
        } while ((i = type.indexOf(delimiter, j)) !== -1);

        ns[len++] = type.slice(j);
      }else{
        ns= [type];
        len= 1;
      }
    }else{
      ns= type;
      len= type.length;
    }

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    if (len > 1) {
      for (i = 0; i + 1 < len; i++) {
        if (ns[i] === '**' && ns[i + 1] === '**') {
          return;
        }
      }
    }



    var tree = this.listenerTree, name;

    for (i = 0; i < len; i++) {
      name = ns[i];

      tree = tree[name] || (tree[name] = {});

      if (i === len - 1) {
        if (!tree._listeners) {
          tree._listeners = listener;
        } else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          if (prepend) {
            tree._listeners.unshift(listener);
          } else {
            tree._listeners.push(listener);
          }

          if (
              !tree._listeners.warned &&
              this._maxListeners > 0 &&
              tree._listeners.length > this._maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
    }

    return true;
  }

  function collectTreeEvents(tree, events, root, asArray){
     var branches= ownKeys(tree);
     var i= branches.length;
     var branch, branchName, path;
     var hasListeners= tree['_listeners'];
     var isArrayPath;

     while(i-->0){
         branchName= branches[i];

         branch= tree[branchName];

         if(branchName==='_listeners'){
             path= root;
         }else {
             path = root ? root.concat(branchName) : [branchName];
         }

         isArrayPath= asArray || typeof branchName==='symbol';

         hasListeners && events.push(isArrayPath? path : path.join(this.delimiter));

         if(typeof branch==='object'){
             collectTreeEvents.call(this, branch, events, path, isArrayPath);
         }
     }

     return events;
  }

  function recursivelyGarbageCollect(root) {
    var keys = ownKeys(root);
    var i= keys.length;
    var obj, key, flag;
    while(i-->0){
      key = keys[i];
      obj = root[key];

      if(obj){
          flag= true;
          if(key !== '_listeners' && !recursivelyGarbageCollect(obj)){
             delete root[key];
          }
      }
    }

    return flag;
  }

  function Listener(emitter, event, listener){
    this.emitter= emitter;
    this.event= event;
    this.listener= listener;
  }

  Listener.prototype.off= function(){
    this.emitter.off(this.event, this.listener);
    return this;
  };

  function setupListener(event, listener, options){
      if (options === true) {
        promisify = true;
      } else if (options === false) {
        async = true;
      } else {
        if (!options || typeof options !== 'object') {
          throw TypeError('options should be an object or true');
        }
        var async = options.async;
        var promisify = options.promisify;
        var nextTick = options.nextTick;
        var objectify = options.objectify;
      }

      if (async || nextTick || promisify) {
        var _listener = listener;
        var _origin = listener._origin || listener;

        if (nextTick && !nextTickSupported) {
          throw Error('process.nextTick is not supported');
        }

        if (promisify === undefined) {
          promisify = listener.constructor.name === 'AsyncFunction';
        }

        listener = function () {
          var args = arguments;
          var context = this;
          var event = this.event;

          return promisify ? (nextTick ? Promise.resolve() : new Promise(function (resolve) {
            _setImmediate(resolve);
          }).then(function () {
            context.event = event;
            return _listener.apply(context, args)
          })) : (nextTick ? process.nextTick : _setImmediate)(function () {
            context.event = event;
            _listener.apply(context, args)
          });
        };

        listener._async = true;
        listener._origin = _origin;
      }

    return [listener, objectify? new Listener(this, event, listener): this];
  }

  function EventEmitter(conf) {
    this._events = {};
    this._newListener = false;
    this._removeListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }

  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  EventEmitter.prototype.listenTo= function(target, events, options){
    if(typeof target!=='object'){
      throw TypeError('target musts be an object');
    }

    var emitter= this;

    options = resolveOptions(options, {
      on: undefined,
      off: undefined,
      reducers: undefined
    }, {
      on: functionReducer,
      off: functionReducer,
      reducers: objectFunctionReducer
    });

    function listen(events){
      if(typeof events!=='object'){
        throw TypeError('events must be an object');
      }

      var reducers= options.reducers;
      var index= findTargetIndex.call(emitter, target);
      var observer;

      if(index===-1){
        observer= new TargetObserver(emitter, target, options);
      }else{
        observer= emitter._observers[index];
      }

      var keys= ownKeys(events);
      var len= keys.length;
      var event;
      var isSingleReducer= typeof reducers==='function';

      for(var i=0; i<len; i++){
        event= keys[i];
        observer.subscribe(
            event,
            events[event] || event,
            isSingleReducer ? reducers : reducers && reducers[event]
        );
      }
    }

    isArray(events)?
        listen(toObject(events)) :
        (typeof events==='string'? listen(toObject(events.split(/\s+/))): listen(events));

    return this;
  };

  EventEmitter.prototype.stopListeningTo = function (target, event) {
    var observers = this._observers;

    if(!observers){
      return false;
    }

    var i = observers.length;
    var observer;
    var matched= false;

    if(target && typeof target!=='object'){
      throw TypeError('target should be an object');
    }

    while (i-- > 0) {
      observer = observers[i];
      if (!target || observer._target === target) {
        observer.unsubscribe(event);
        matched= true;
      }
    }

    return matched;
  };

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    if (n !== undefined) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.getMaxListeners = function() {
    return this._maxListeners;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn, options) {
    return this._once(event, fn, false, options);
  };

  EventEmitter.prototype.prependOnceListener = function(event, fn, options) {
    return this._once(event, fn, true, options);
  };

  EventEmitter.prototype._once = function(event, fn, prepend, options) {
    return this._many(event, 1, fn, prepend, options);
  };

  EventEmitter.prototype.many = function(event, ttl, fn, options) {
    return this._many(event, ttl, fn, false, options);
  };

  EventEmitter.prototype.prependMany = function(event, ttl, fn, options) {
    return this._many(event, ttl, fn, true, options);
  };

  EventEmitter.prototype._many = function(event, ttl, fn, prepend, options) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    return this._on(event, listener, prepend, options);
  };

  EventEmitter.prototype.emit = function() {
    if (!this._events && !this._all) {
      return false;
    }

    this._events || init.call(this);

    var type = arguments[0], ns, wildcard= this.wildcard;
    var args,l,i,j, containsSymbol;

    if (type === 'newListener' && !this._newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    if (wildcard) {
      ns= type;
      if(type!=='newListener' && type!=='removeListener'){
        if (typeof type === 'object') {
          l = type.length;
          if (symbolsSupported) {
            for (i = 0; i < l; i++) {
              if (typeof type[i] === 'symbol') {
                containsSymbol = true;
                break;
              }
            }
          }
          if (!containsSymbol) {
            type = type.join(this.delimiter);
          }
        }
      }
    }

    var al = arguments.length;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this, type);
          break;
        case 2:
          handler[i].call(this, type, arguments[1]);
          break;
        case 3:
          handler[i].call(this, type, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, arguments);
        }
      }
    }

    if (wildcard) {
      handler = [];
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0, l);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this);
          break;
        case 2:
          handler[i].call(this, arguments[1]);
          break;
        case 3:
          handler[i].call(this, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this.ignoreErrors && !this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {
    if (!this._events && !this._all) {
      return false;
    }

    this._events || init.call(this);

    var type = arguments[0], wildcard= this.wildcard, ns, containsSymbol;
    var args,l,i,j;

    if (type === 'newListener' && !this._newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    if (wildcard) {
      ns= type;
      if(type!=='newListener' && type!=='removeListener'){
        if (typeof type === 'object') {
          l = type.length;
          if (symbolsSupported) {
            for (i = 0; i < l; i++) {
              if (typeof type[i] === 'symbol') {
                containsSymbol = true;
                break;
              }
            }
          }
          if (!containsSymbol) {
            type = type.join(this.delimiter);
          }
        }
      }
    }

    var promises= [];

    var al = arguments.length;
    var handler;

    if (this._all) {
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(this._all[i].call(this, type));
          break;
        case 2:
          promises.push(this._all[i].call(this, type, arguments[1]));
          break;
        case 3:
          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
          break;
        default:
          promises.push(this._all[i].apply(this, arguments));
        }
      }
    }

    if (wildcard) {
      handler = [];
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this));
          break;
        case 2:
          promises.push(handler[i].call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler[i].call(this, arguments[1], arguments[2]));
          break;
        default:
          promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this.ignoreErrors && !this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function(type, listener, options) {
    return this._on(type, listener, false, options);
  };

  EventEmitter.prototype.prependListener = function(type, listener, options) {
    return this._on(type, listener, true, options);
  };

  EventEmitter.prototype.onAny = function(fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function(fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function(fn, prepend){
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if(prepend){
      this._all.unshift(fn);
    }else{
      this._all.push(fn);
    }

    return this;
  };

  EventEmitter.prototype._on = function(type, listener, prepend, options) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    var returnValue= this, temp;

    if (options !== undefined) {
      temp = setupListener.call(this, type, listener, options);
      listener = temp[0];
      returnValue = temp[1];
    }

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    if (this._newListener) {
      this.emit('newListener', type, listener);
    }

    if (this.wildcard) {
      growListenerTree.call(this, type, listener, prepend);
      return returnValue;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    } else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if(prepend){
        this._events[type].unshift(listener);
      }else{
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._maxListeners > 0 &&
        this._events[type].length > this._maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return returnValue;
  };

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
      if(!leafs) return this;
    } else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        if (this._removeListener)
          this.emit("removeListener", type, listener);

        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
        if (this._removeListener)
          this.emit("removeListener", type, listener);
      }
    }

    this.listenerTree && recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          if (this._removeListener)
            this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      if (this._removeListener) {
        for(i = 0, l = fns.length; i < l; i++)
          this.emit("removeListenerAny", fns[i]);
      }
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function (type) {
    if (type === undefined) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var leafs = searchListenerTree.call(this, null, type, this.listenerTree, 0), leaf, i;
      if (!leafs) return this;
      for (i = 0; i < leafs.length; i++) {
        leaf = leafs[i];
        leaf._listeners = null;
      }
      this.listenerTree && recursivelyGarbageCollect(this.listenerTree);
    } else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function (type) {
    var _events = this._events;
    var keys, listeners, allListeners;
    var i;
    var listenerTree;

    if (type === undefined) {
      if (this.wildcard) {
        throw Error('event name required for wildcard emitter');
      }

      if (!_events) {
        return [];
      }

      keys = ownKeys(_events);
      i = keys.length;
      allListeners = [];
      while (i-- > 0) {
        listeners = _events[keys[i]];
        if (typeof listeners === 'function') {
          allListeners.push(listeners);
        } else {
          allListeners.push.apply(allListeners, listeners);
        }
      }
      return allListeners;
    } else {
      if (this.wildcard) {
        listenerTree= this.listenerTree;
        if(!listenerTree) return [];
        var handlers = [];
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        searchListenerTree.call(this, handlers, ns, listenerTree, 0);
        return handlers;
      }

      if (!_events) {
        return [];
      }

      listeners = _events[type];

      if (!listeners) {
        return [];
      }
      return typeof listeners === 'function' ? [listeners] : listeners;
    }
  };

  EventEmitter.prototype.eventNames = function(nsAsArray){
    var _events= this._events;
    return this.wildcard? collectTreeEvents.call(this, this.listenerTree, [], null, nsAsArray) : (_events? ownKeys(_events) : []);
  };

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.hasListeners = function (type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers.length > 0;
    }

    var _events = this._events;
    var _all = this._all;

    return !!(_all && _all.length || _events && (type === undefined ? ownKeys(_events).length : _events[type]));
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  EventEmitter.prototype.waitFor = function (event, options) {
    var self = this;
    var type = typeof options;
    if (type === 'number') {
      options = {timeout: options};
    } else if (type === 'function') {
      options = {filter: options};
    }

    options= resolveOptions(options, {
      timeout: 0,
      filter: undefined,
      handleError: false,
      Promise: Promise,
      overload: false
    }, {
      filter: functionReducer,
      Promise: constructorReducer
    });

    return makeCancelablePromise(options.Promise, function (resolve, reject, onCancel) {
      function listener() {
        var filter= options.filter;
        if (filter && !filter.apply(self, arguments)) {
          return;
        }
        self.off(event, listener);
        if (options.handleError) {
          var err = arguments[0];
          err ? reject(err) : resolve(toArray.apply(null, arguments).slice(1));
        } else {
          resolve(toArray.apply(null, arguments));
        }
      }

      onCancel(function(){
        self.off(event, listener);
      });

      self._on(event, listener, false);
    }, {
      timeout: options.timeout,
      overload: options.overload
    })
  };

  function once(emitter, name, options) {
    options= resolveOptions(options, {
      Promise: Promise,
      timeout: 0,
      overload: false
    }, {
      Promise: constructorReducer
    });

    var _Promise= options.Promise;

    return makeCancelablePromise(_Promise, function(resolve, reject, onCancel){
      var handler;
      if (typeof emitter.addEventListener === 'function') {
        handler=  function () {
          resolve(toArray.apply(null, arguments));
        };

        onCancel(function(){
          emitter.removeEventListener(name, handler);
        });

        emitter.addEventListener(
            name,
            handler,
            {once: true}
        );
        return;
      }

      var eventListener = function(){
        errorListener && emitter.removeListener('error', errorListener);
        resolve(toArray.apply(null, arguments));
      };

      var errorListener;

      if (name !== 'error') {
        errorListener = function (err){
          emitter.removeListener(name, eventListener);
          reject(err);
        };

        emitter.once('error', errorListener);
      }

      onCancel(function(){
        errorListener && emitter.removeListener('error', errorListener);
        emitter.removeListener(name, eventListener);
      });

      emitter.once(name, eventListener);
    }, {
      timeout: options.timeout,
      overload: options.overload
    });
  }

  var prototype= EventEmitter.prototype;

  Object.defineProperties(EventEmitter, {
    defaultMaxListeners: {
      get: function () {
        return prototype._maxListeners;
      },
      set: function (n) {
        if (typeof n !== 'number' || n < 0 || Number.isNaN(n)) {
          throw TypeError('n must be a non-negative number')
        }
        prototype._maxListeners = n;
      },
      enumerable: true
    },
    once: {
      value: once,
      writable: true,
      configurable: true
    }
  });

  Object.defineProperties(prototype, {
      _maxListeners: {
          value: defaultMaxListeners,
          writable: true,
          configurable: true
      },
      _observers: {value: null, writable: true, configurable: true}
  });

  if (true) {
     // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return EventEmitter;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { }
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../snapshot/toolkit/node_modules/process/browser.js */ "TxCu")))

/***/ }),

/***/ "d66Q":
/*!****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_object-dp.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "6k3Y");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "xfZ3");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "bOZP");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "2FaN") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "dO2f":
/*!************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/sdk/sdkLib.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = exports.APP_TYPE = exports.ENV_ENUM_SUB = exports.ENV_ENUM = exports.ERROR_CODE = exports.compareVersion = exports.isFunction = void 0;
function isFunction(param) {
    return typeof param === 'function';
}
exports.isFunction = isFunction;
/**
 * when origin >= target ,return true
 * 关于为什么没有跟otherApi保持一致，主要是当初因为otherApi里的方法是复制旧版jsapi的，有一定缺陷
 * 但是担心线上环境利用了缺陷来做逻辑，所以没有保持一致使用同一个方法
 * TODO: 但其实另起方法太冗余，以及丑陋，后续还是需要整个统一掉
 * @param origin
 * @param target
 */
function compareVersion(origin, target) {
    function transform(item) {
        return parseInt(item, 10) || 0;
    }
    var originVersionArr = origin.split('.').map(transform);
    var targetVersionArr = target.split('.').map(transform);
    var i = 0;
    for (; i < originVersionArr.length; i++) {
        if (typeof targetVersionArr[i] !== 'undefined') {
            if (originVersionArr[i] < targetVersionArr[i]) {
                return false;
            }
            else if (originVersionArr[i] > targetVersionArr[i]) {
                return true;
            }
        }
        else {
            return false;
        }
    }
    return true;
}
exports.compareVersion = compareVersion;
var ERROR_CODE;
(function (ERROR_CODE) {
    ERROR_CODE["cancel"] = "-1";
    ERROR_CODE["not_exist"] = "1";
    ERROR_CODE["no_permission"] = "7";
    ERROR_CODE["jsapi_internal_error"] = "22";
})(ERROR_CODE = exports.ERROR_CODE || (exports.ERROR_CODE = {}));
var ENV_ENUM;
(function (ENV_ENUM) {
    ENV_ENUM["pc"] = "pc";
    ENV_ENUM["android"] = "android";
    ENV_ENUM["ios"] = "ios";
    ENV_ENUM["notInDingTalk"] = "notInDingTalk";
})(ENV_ENUM = exports.ENV_ENUM || (exports.ENV_ENUM = {}));
var ENV_ENUM_SUB;
(function (ENV_ENUM_SUB) {
    ENV_ENUM_SUB["mac"] = "mac";
    ENV_ENUM_SUB["win"] = "win";
    ENV_ENUM_SUB["noSub"] = "noSub";
})(ENV_ENUM_SUB = exports.ENV_ENUM_SUB || (exports.ENV_ENUM_SUB = {}));
var APP_TYPE;
(function (APP_TYPE) {
    APP_TYPE["WEB"] = "WEB";
    APP_TYPE["MINI_APP"] = "MINI_APP";
    APP_TYPE["WEEX"] = "WEEX";
    APP_TYPE["WEBVIEW_IN_MINIAPP"] = "WEBVIEW_IN_MINIAPP";
    APP_TYPE["WEEX_WIDGET"] = "WEEX_WIDGET";
})(APP_TYPE = exports.APP_TYPE || (exports.APP_TYPE = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARNING"] = 2] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));


/***/ }),

/***/ "e1Jk":
/*!************************************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/node_modules/promise-polyfill/dist/polyfill.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
(function (global, factory) {
	 true ? factory() :
	undefined;
}(this, (function () { 'use strict';

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

var globalNS = (function() {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
})();

if (!globalNS.Promise) {
  globalNS.Promise = Promise;
}

})));


/***/ }),

/***/ "f1pH":
/*!******************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_an-instance.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "f5uS":
/*!*****************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_new-promise-capability.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ "DxYy");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "fGSN":
/*!*****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_object-gpo.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "qQ7p");
var toObject = __webpack_require__(/*! ./_to-object */ "MM90");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "INl8")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "fcHS":
/*!*******************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/polyfills/objectAssign.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){"use strict";if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),r=1;r<arguments.length;r++){var o=arguments[r];if(null!=o)for(var c in o)Object.prototype.hasOwnProperty.call(o,c)&&(n[c]=o[c])}return n},writable:!0,configurable:!0});

/***/ }),

/***/ "gRmk":
/*!*****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/es6.promise.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "LoIC");
var global = __webpack_require__(/*! ./_global */ "T/px");
var ctx = __webpack_require__(/*! ./_ctx */ "/QwB");
var classof = __webpack_require__(/*! ./_classof */ "G/N9");
var $export = __webpack_require__(/*! ./_export */ "rG/S");
var isObject = __webpack_require__(/*! ./_is-object */ "k0kn");
var aFunction = __webpack_require__(/*! ./_a-function */ "DxYy");
var anInstance = __webpack_require__(/*! ./_an-instance */ "f1pH");
var forOf = __webpack_require__(/*! ./_for-of */ "0/mL");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "xXvE");
var task = __webpack_require__(/*! ./_task */ "qjZe").set;
var microtask = __webpack_require__(/*! ./_microtask */ "5+Gv")();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ "f5uS");
var perform = __webpack_require__(/*! ./_perform */ "TP6P");
var userAgent = __webpack_require__(/*! ./_user-agent */ "SLPr");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "ErxN");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ "haEp")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ "uWkV")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ "6ESS")($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ "Oi8V")(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ "6kth")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ "0yRZ")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "gipX":
/*!***********************************!*\
  !*** ./constants/previewTypes.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
/**
 * previewType 预览类型
 * 枚举文件汇总，不用magicNumber
 */

exports.default = {
  /**
   * 服务商创建并交付模板，客户进行验收预览
   */
  PREVIEW_FROM_PORTAL_READY: 3,
  /**
   * 服务商创建并配置模板，在编辑器进行预览
   */
  PREVIEW_FROM_TEMP_DESIGN: 2,
  /**
   * 服务商为客户配置钉门户，在编辑器进行预览
   */
  PREVIEW_FROM_PORTAL_DESIGN: 1,
  /**
   * 服务商配置工作台后并发布，客户在手机端或者PC后台进行预览
   */
  PREVIEW_FROM_MOBILE: 0,
  /**
   * previewType to funnelsource
   */
  PREVIEW_TYPE_MAP: {
    preview_3: 'portalReady',
    preview_2: 'tempDesign',
    preview_1: 'portalDesign',
    preview_0: 'mobile'
  }

};
module.exports = exports['default'];

/***/ }),

/***/ "h7cE":
/*!********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/babel-runtime/helpers/asyncToGenerator.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(/*! ../core-js/promise */ "uOgS");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),

/***/ "haEp":
/*!**********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_wks.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "DCPo")('wks');
var uid = __webpack_require__(/*! ./_uid */ "Byhj");
var Symbol = __webpack_require__(/*! ./_global */ "T/px").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "hkbN":
/*!******************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_object-keys.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "VUb2");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "6hbf");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "ix9Z":
/*!*****************************************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/@ali/antcube-build/lib/build/loader/fragment.js!./component.json?jsonAsESM ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    module.exports = {
      __meta__: {
        version: "0.4.7",
      },
      component2: false,
      main: function () {
        return __webpack_require__(/*! ./index.js */ "QfWi");
      },
      pluginId: undefined,
      publicComponents: {
        pluginInfo: null,
        publicComponents: {
          
        },
        renderType: 8,
        callback: function () {
          
          
          
          return {
            style: [].join('\n'),
          };
        },
      },
    };
    

/***/ }),

/***/ "j20N":
/*!****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_to-length.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "+3bn");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "jEw7":
/*!************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/env.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.getENV=exports.getUA=exports.ENV_ENUM_SUB=exports.APP_TYPE=exports.ENV_ENUM=void 0;var sdk_1=__webpack_require__(/*! ./sdk */ "lnAV"),sdk_2=__webpack_require__(/*! ./sdk */ "lnAV");Object.defineProperty(exports,"ENV_ENUM",{enumerable:!0,get:function(){return sdk_2.ENV_ENUM}}),Object.defineProperty(exports,"APP_TYPE",{enumerable:!0,get:function(){return sdk_2.APP_TYPE}}),Object.defineProperty(exports,"ENV_ENUM_SUB",{enumerable:!0,get:function(){return sdk_2.ENV_ENUM_SUB}});var dingtalk_javascript_env_1=__webpack_require__(/*! ./packages/dingtalk-javascript-env */ "COjq"),EDdWeexEnv;!function(e){e.singlePage="singlePage",e.miniApp="miniApp",e.miniWidget="miniWidget"}(EDdWeexEnv||(EDdWeexEnv={}));var getUA=function(){var e="";try{"undefined"!=typeof navigator&&(e=navigator&&(navigator.userAgent||navigator.swuserAgent)||"")}catch(t){e=""}return e};exports.getUA=getUA;var getENV=function(){var e=exports.getUA(),t=/iPhone|iPad|iPod|iOS/i.test(e),i=/Android/i.test(e),n=/Nebula/i.test(e),a=/DingTalk/i.test(e),r=/dd-web/i.test(e),d="object"==typeof nuva,s="object"==typeof dd&&"function"==typeof dd.dtBridge,_=s&&t||d&&t,E=a||dingtalk_javascript_env_1.default.isDingTalk,o=t&&E||dingtalk_javascript_env_1.default.isWeexiOS||_,g=i&&E||dingtalk_javascript_env_1.default.isWeexAndroid,p=n&&E||s,v=r,P=sdk_1.APP_TYPE.WEB;if(v)P=sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP;else if(p)P=sdk_1.APP_TYPE.MINI_APP;else if(dingtalk_javascript_env_1.default.isWeexiOS||dingtalk_javascript_env_1.default.isWeexAndroid)try{var l=weex.config.ddWeexEnv;P=l===EDdWeexEnv.miniWidget?sdk_1.APP_TYPE.WEEX_WIDGET:sdk_1.APP_TYPE.WEEX}catch(e){P=sdk_1.APP_TYPE.WEEX}var u,c="*",N=e.match(/AliApp\(\w+\/([a-zA-Z0-9.-]+)\)/);null===N&&(N=e.match(/DingTalk\/([a-zA-Z0-9.-]+)/));var f;N&&N[1]&&(f=N[1]);var k="";if("undefined"!=typeof name&&(k=name),k)try{var A=JSON.parse(k);A.hostVersion&&(f=A.hostVersion),c=A.language||navigator.language||"*",u=A.containerId}catch(e){}var U=!!u;U&&!f&&(N=e.match(/DingTalk\(([a-zA-Z0-9\.-]+)\)/))&&N[1]&&(f=N[1]);var x,V=sdk_1.ENV_ENUM_SUB.noSub;if(o)x=sdk_1.ENV_ENUM.ios;else if(g)x=sdk_1.ENV_ENUM.android;else if(U){var W=e.indexOf("Macintosh; Intel Mac OS")>-1;V=W?sdk_1.ENV_ENUM_SUB.mac:sdk_1.ENV_ENUM_SUB.win,x=sdk_1.ENV_ENUM.pc}else x=sdk_1.ENV_ENUM.notInDingTalk;return{platform:x,platformSub:V,version:f,appType:P,language:c}};exports.getENV=getENV;

/***/ }),

/***/ "jjYE":
/*!*********************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/platform/android.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0});var ddSdk_1=__webpack_require__(/*! ../lib/ddSdk */ "xrN5"),env_1=__webpack_require__(/*! ../lib/env */ "jEw7"),sdk_1=__webpack_require__(/*! ../lib/sdk */ "lnAV"),eapp_1=__webpack_require__(/*! ../lib/bridge/eapp */ "7uKH"),webviewInMiniApp_1=__webpack_require__(/*! ../lib/bridge/webviewInMiniApp */ "vXSE"),h5Android_1=__webpack_require__(/*! ../lib/bridge/h5Android */ "oa4a"),weex_1=__webpack_require__(/*! ../lib/bridge/weex */ "V3Lu"),h5Event_1=__webpack_require__(/*! ../lib/bridge/h5Event */ "3WaP"),weexEvent_1=__webpack_require__(/*! ../lib/bridge/weexEvent */ "6PdP");ddSdk_1.ddSdk.setPlatform({platform:env_1.ENV_ENUM.android,bridgeInit:function(){var e=env_1.getENV();return e.appType===sdk_1.APP_TYPE.MINI_APP?Promise.resolve(eapp_1.default):e.appType===sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP?Promise.resolve(webviewInMiniApp_1.default):e.appType===sdk_1.APP_TYPE.WEEX?weex_1.androidWeexBridge():h5Android_1.h5AndroidbridgeInit().then(function(){return h5Android_1.default})},authMethod:"runtime.permission.requestJsApis",event:{on:function(e,r){var i=env_1.getENV();switch(i.appType){case sdk_1.APP_TYPE.WEB:case sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP:h5Event_1.on(e,r);break;case sdk_1.APP_TYPE.WEEX:weexEvent_1.on(e,r);break;default:throw new Error("Not support global event in the platfrom: "+i.appType)}},off:function(e,r){var i=env_1.getENV();switch(i.appType){case sdk_1.APP_TYPE.WEB:case sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP:h5Event_1.off(e,r);break;case sdk_1.APP_TYPE.WEEX:weexEvent_1.off(e,r);break;default:throw new Error("Not support global event in the platfrom: "+i.appType)}}}});

/***/ }),

/***/ "jmbV":
/*!***********************************!*\
  !*** ./constants/homeAppTypes.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
/**
 * 工作台AppType类型
 * 枚举文件汇总，不用magicNumber
 */

exports.default = {
  /**
   * 微应用
   */
  HOME_APP_TYPE_APP: 0,
  /**
   * 日志模板
   */
  HOME_APP_TYPE_REPORT: 1,
  /**
   * 审批模板
   */
  HOME_APP_TYPE_TASK: 2,
  /**
   * 智能报表
   */
  HOME_APP_TYPE_CLOUD_DATA: 3,
  /**
   * 工作条
   */
  HOME_APP_TYPE_WORKER: 7,
  /**
   * H5
   */
  HOME_APP_TYPE_H5: 11,
  /**
   * 添加客户
   */
  HOME_APP_TYPE_ADD_CUSTOMER: 12,
  /**
   * 扫名片
   */
  HOME_APP_TYPE_SCAN_CARD: 13,
  /**
   * 作战宝典
   */
  HOME_APP_TYPE_BATTLE_BOOK: 14,
  /**
   * 企业广场
   */
  HOME_APP_TYPE_SQUARE: 15,
  /**
   * 微应用模板
   */
  HOME_APP_TYPE_APP_TEMPLATE: 17,
  /**
   * 快捷方式
   */
  HOME_APP_TYPE_APP_SHORTCUT: 33
};
module.exports = exports["default"];

/***/ }),

/***/ "jq33":
/*!********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_property-desc.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "k0kn":
/*!****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_is-object.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "kGXD":
/*!*******************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/ddSdk.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ddSdk = void 0;
var env_1 = __webpack_require__(/*! ./env */ "4GAR");
var log_1 = __webpack_require__(/*! ./log */ "mCtW");
var env_2 = __webpack_require__(/*! ./env */ "4GAR");
Object.defineProperty(exports, "ENV_ENUM", { enumerable: true, get: function () { return env_2.ENV_ENUM; } });
Object.defineProperty(exports, "ENV_ENUM_SUB", { enumerable: true, get: function () { return env_2.ENV_ENUM_SUB; } });
var sdk_1 = __webpack_require__(/*! ./sdk */ "a+z/");
__webpack_require__(/*! ./polyfills */ "WfUP");
exports.ddSdk = new sdk_1.Sdk(env_1.getENV(), log_1.log);


/***/ }),

/***/ "kley":
/*!****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_iter-call.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "6k3Y");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "lnAV":
/*!******************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/sdk/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;function getTargetApiConfigVS(e,o){var i=e&&e.vs;return"object"==typeof i&&(i=i[o.platformSub]),i}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Sdk=exports.LogLevel=exports.APP_TYPE=exports.isFunction=exports.compareVersion=exports.ENV_ENUM_SUB=exports.ENV_ENUM=void 0;var sdkLib_1=__webpack_require__(/*! ./sdkLib */ "WF8E");Object.defineProperty(exports,"APP_TYPE",{enumerable:!0,get:function(){return sdkLib_1.APP_TYPE}}),Object.defineProperty(exports,"LogLevel",{enumerable:!0,get:function(){return sdkLib_1.LogLevel}}),Object.defineProperty(exports,"isFunction",{enumerable:!0,get:function(){return sdkLib_1.isFunction}}),Object.defineProperty(exports,"compareVersion",{enumerable:!0,get:function(){return sdkLib_1.compareVersion}}),Object.defineProperty(exports,"ENV_ENUM",{enumerable:!0,get:function(){return sdkLib_1.ENV_ENUM}}),Object.defineProperty(exports,"ENV_ENUM_SUB",{enumerable:!0,get:function(){return sdkLib_1.ENV_ENUM_SUB}});var Sdk=function(){function e(e,o){var i=this;this.configJsApiList=[],this.hadConfig=!1,this.p={},this.config$=new Promise(function(e,o){i.p.reject=o,i.p.resolve=e}),this.logQueue=[],this.devConfig={debug:!1},this.platformConfigMap={},this.invokeAPIConfigMapByMethod={},this.isBridgeDrity=!0,this.getExportSdk=function(){return i.exportSdk},this.setAPI=function(e,o){i.invokeAPIConfigMapByMethod[e]=o},this.setPlatform=function(e){i.isBridgeDrity=!0,i.platformConfigMap[e.platform]=e,e.platform===i.env.platform&&e.bridgeInit().catch(function(e){i.customLog(sdkLib_1.LogLevel.WARNING,["auto bridgeInit error",e||""])})},this.getPlatformConfigMap=function(){return i.platformConfigMap},this.deleteApiConfig=function(e,o){var n=i.invokeAPIConfigMapByMethod[e];n&&delete n[o]},this.invokeAPI=function(e,o,n){void 0===o&&(o={}),void 0===n&&(n=!0),i.customLog(sdkLib_1.LogLevel.INFO,['==> "'+e+'" params: ',o]);var t=+new Date,r=t+"_"+Math.floor(1e3*Math.random());if(i.devConfig.onBeforeInvokeAPI)try{i.devConfig.onBeforeInvokeAPI({invokeId:r,method:e,params:o,startTime:t})}catch(e){i.customLog(sdkLib_1.LogLevel.ERROR,["call Hook:onBeforeInvokeAPI failed, reason:",e])}return!1===i.devConfig.isAuthApi&&(n=!1),i.bridgeInitFn().then(function(s){var a=i.invokeAPIConfigMapByMethod[e],f=i.devConfig.forceEnableDealApiFnMap&&i.devConfig.forceEnableDealApiFnMap[e]&&!0===i.devConfig.forceEnableDealApiFnMap[e](o),d=!f&&(!0===i.devConfig.isDisableDeal||i.devConfig.disbaleDealApiWhiteList&&-1!==i.devConfig.disbaleDealApiWhiteList.indexOf(e));if(a||!n){var c;if(a&&(c=a[i.env.platform]),c||!n){var u={};u=!d&&c&&c.paramsDeal&&sdkLib_1.isFunction(c.paramsDeal)?c.paramsDeal(o):Object.assign({},o);var g=function(e){return!d&&c&&c.resultDeal&&sdkLib_1.isFunction(c.resultDeal)?c.resultDeal(e):e};if(sdkLib_1.isFunction(u.onSuccess)){var l=u.onSuccess;u.onSuccess=function(e){l(g(e))}}return s(e,u).then(g,function(o){var t=i.hadConfig&&void 0===i.isReady&&-1!==i.configJsApiList.indexOf(e),r="object"==typeof o&&"string"==typeof o.errorCode&&o.errorCode===sdkLib_1.ERROR_CODE.no_permission,a="object"==typeof o&&"string"==typeof o.errorCode&&o.errorCode===sdkLib_1.ERROR_CODE.cancel,f=getTargetApiConfigVS(c,i.env),d=f&&i.env.version&&sdkLib_1.compareVersion(i.env.version,f),l=(i.env.platform===sdkLib_1.ENV_ENUM.ios||i.env.platform===sdkLib_1.ENV_ENUM.android)&&t&&r,p=i.env.platform===sdkLib_1.ENV_ENUM.pc&&t&&(d&&!a&&n||r);return l||p?i.config$.then(function(){return s(e,u).then(g)}):Promise.reject(o)}).then(function(n){if(i.devConfig.onAfterInvokeAPI)try{i.devConfig.onAfterInvokeAPI({invokeId:r,method:e,params:o,payload:n,isSuccess:!0,startTime:t,duration:+new Date-t})}catch(e){i.customLog(sdkLib_1.LogLevel.ERROR,["call Hook:onAfterInvokeAPI failed, reason:",e])}return i.customLog(sdkLib_1.LogLevel.INFO,['<== "'+e+'" success result: ',n]),n},function(n){if(i.devConfig.onAfterInvokeAPI)try{i.devConfig.onAfterInvokeAPI({invokeId:r,method:e,params:o,payload:n,startTime:t,duration:+new Date-t,isSuccess:!1})}catch(n){i.customLog(sdkLib_1.LogLevel.ERROR,["call Hook:onAfterInvokeAPI failed, reason:",n])}return i.customLog(sdkLib_1.LogLevel.WARNING,['<== "'+e+'" fail result: ',n]),Promise.reject(n)})}var p='"'+e+'" do not support the current platform ('+i.env.platform+")";return i.customLog(sdkLib_1.LogLevel.ERROR,[p]),Promise.reject({errorCode:sdkLib_1.ERROR_CODE.jsapi_internal_error,errorMessage:p})}var p="This API method is not configured for the platform ("+i.env.platform+")";return i.customLog(sdkLib_1.LogLevel.ERROR,[p]),Promise.reject({errorCode:sdkLib_1.ERROR_CODE.jsapi_internal_error,errorMessage:p})})},this.customLog=function(e,o){var n={level:e,text:o,time:new Date};if(!0===i.devConfig.debug)i.customLogInstance(n);else{i.logQueue.push(n);i.logQueue.length>10&&(i.logQueue=i.logQueue.slice(i.logQueue.length-10))}},this.clearLogQueue=function(){i.logQueue.forEach(function(e){i.customLogInstance(e)}),i.logQueue=[]},this.customLogInstance=o,this.env=e,this.bridgeInitFn=function(){if(i.bridgeInitFnPromise&&!i.isBridgeDrity)return i.bridgeInitFnPromise;i.isBridgeDrity=!1;var o=i.platformConfigMap[e.platform];if(o)i.bridgeInitFnPromise=o.bridgeInit().catch(function(e){return i.customLog(sdkLib_1.LogLevel.ERROR,["\b\b\b\b\bJsBridge initialization fails, jsapi will not work"]),Promise.reject(e)});else{var n="Do not support the current environment："+e.platform;i.customLog(sdkLib_1.LogLevel.WARNING,[n]),i.bridgeInitFnPromise=Promise.reject(new Error(n))}return i.bridgeInitFnPromise};var n=function(e){void 0===e&&(e={}),i.devConfig=Object.assign(i.devConfig,e),!0===e.debug&&i.clearLogQueue(),e.extraPlatform&&i.setPlatform(e.extraPlatform)};this.exportSdk={config:function(o){void 0===o&&(o={});var t=!0;Object.keys(o).forEach(function(e){-1===["debug","usePromise"].indexOf(e)&&(t=!1)}),t?(i.customLog(sdkLib_1.LogLevel.WARNING,["This is a deprecated feature, recommend use dd.devConfig"]),n(o)):i.hadConfig?i.customLog(sdkLib_1.LogLevel.WARNING,["Config has been executed"]):(o.jsApiList&&(i.configJsApiList=o.jsApiList),i.hadConfig=!0,i.bridgeInitFn().then(function(n){var t=i.platformConfigMap[e.platform],r=o;t.authParamsDeal&&(r=t.authParamsDeal(r)),n(t.authMethod,r).then(function(e){i.isReady=!0,i.p.resolve(e)}).catch(function(e){i.isReady=!1,i.p.reject(e)})},function(e){i.customLog(sdkLib_1.LogLevel.ERROR,['\b\b\b\b\bJsBridge initialization failed and "dd.config" failed to call']),i.p.reject(e)}))},devConfig:n,ready:function(e){!1===i.hadConfig?(i.customLog(sdkLib_1.LogLevel.WARNING,["You don 't use a dd.config, so you don't need to wrap dd.ready, recommend remove dd.ready"]),i.bridgeInitFn().then(function(){e()})):i.config$.then(function(o){e()})},error:function(e){i.config$.catch(function(o){e(o)})},on:function(o,n){i.bridgeInitFn().then(function(){i.platformConfigMap[e.platform].event.on(o,n)})},off:function(o,n){i.bridgeInitFn().then(function(){i.platformConfigMap[e.platform].event.off(o,n)})},env:e,checkJsApi:function(o){void 0===o&&(o={});var n={};return o.jsApiList&&o.jsApiList.forEach(function(o){var t=i.invokeAPIConfigMapByMethod[o];if(t){var r=t[e.platform],s=getTargetApiConfigVS(r,e);s&&e.version&&sdkLib_1.compareVersion(e.version,s)&&(n[o]=!0)}n[o]||(n[o]=!1)}),Promise.resolve(n)},_invoke:function(e,o){return void 0===o&&(o={}),i.invokeAPI(e,o,!1)}}}return e}();exports.Sdk=Sdk;

/***/ }),

/***/ "mCtW":
/*!*****************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/log.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
/* tslint:disable:no-console */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
function padNumber(str) {
    str = '00' + str;
    return str.substring(str.length - 2, str.length);
}
exports.log = function (option) {
    console.log.apply(console, __spreadArrays([padNumber(option.time.getHours()) + ":" + padNumber(option.time.getMinutes()) + ":" + padNumber(option.time.getSeconds())], option.text));
};


/***/ }),

/***/ "mIpV":
/*!*****************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_to-iobject.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "v01c");
var defined = __webpack_require__(/*! ./_defined */ "UAHs");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "mNdo":
/*!***********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_html.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "T/px").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "mOn6":
/*!********************************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/packages/frame-talk-client-pc/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// var global = undefined,
//     self = undefined,
//     window = undefined,
//     document = undefined,
//     location = undefined,
//     XMLHttpRequest = undefined,
//     AlipayJSBridge = undefined,
//     importScript = undefined,
//     importScripts = undefined,
//     AFAppX = undefined,
//     fetch = undefined,
//     $AppxFramework = undefined,
//     $AppxRuntime = undefined,
//     mqEnvironment = undefined,
//     wxEnvironment = undefined,
//     __CUBE_KERNEL__ = undefined,
//     $AppxRegistry = undefined,
//     $AppxStyleRegistry = undefined;
!function(t,e){ true?module.exports=e():undefined}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=721)}({199:function(t,e,n){"use strict";var r=n(201);t.exports=r},201:function(t,e,n){"use strict";var r=n(203),o=n(204),i=n(202),u=n(205),c=new i,a=!1,s="",f=null,l={},p=/{.*}/;try{var h=window.name.match(p);if(h&&h[0])var l=JSON.parse(h[0])}catch(t){l={}}l.hostOrigin&&".dingtalk.com"===l.hostOrigin.split(":")[1].slice(0-".dingtalk.com".length)&&l.containerId&&(a=!0,s=l.hostOrigin,f=l.containerId);var d={},v=new Promise(function(t,e){d._resolve=t,d._reject=e}),y={},_=null;window.top!==window?(_=window.top,d._resolve()):"object"==typeof dingtalk&&"object"==typeof dingtalk.platform&&"function"==typeof dingtalk.platform.invokeAPI&&(_=window,d._resolve()),y[u.SYS_INIT]=function(t){_=t.frameWindow,d._resolve(),t.respond({})},window.addEventListener("message",function(t){var e=t.data,n=t.origin;if(n===s)if("response"===e.type&&e.msgId){var r=e.msgId,i=c.getMsyById(r);i&&i.methodName!==u.SYS_EVENT&&i.receiveResponse(e.body,!e.success)}else if("event"===e.type&&e.msgId){var r=e.msgId,i=c.getMsyById(r);i&&i.receiveEvent(e.eventName,e.body)}else if("request"===e.type&&e.msgId){var i=new o(t.source,n,e);y[i.methodName]&&y[i.methodName](i)}}),e.invokeAPI=function(t,e){var n=new r(f,t,e);return a&&v.then(function(){_&&_.postMessage(n.getPayload(),s),c.addPending(n)}),n};var b=null;e.addEventListener=function(t,n){b||(b=e.invokeAPI(u.SYS_EVENT,{})),b.addEventListener(t,n)},e.removeEventListener=function(t,e){b&&b.removeEventListener(t,e)}},202:function(t,e,n){"use strict";var r=function(){this.pendingMsgs={}};r.prototype.addPending=function(t){this.pendingMsgs[t.id]=t;var e=function(){delete this.pendingMsgs[t.id],t.removeEventListener("_finish",e)}.bind(this);t.addEventListener("_finish",e)},r.prototype.getMsyById=function(t){return this.pendingMsgs[t]},t.exports=r},203:function(t,e,n){"use strict";var r=n(716),o=n(715),i=0,u=Math.floor(1e3*Math.random()),c=function(){return 1e3*(1e3*u+Math.floor(1e3*Math.random()))+ ++i%1e3},a={code:408,reason:"timeout"},s={TIMEOUT:"_timeout",FINISH:"_finish"},f={timeout:-1},l=function(t,e,n,r){this.id=c(),this.methodName=e,this.containerId=t,this.option=o({},f,r);var n=n||{};this._p={},this.result=new Promise(function(t,e){this._p._resolve=t,this._p._reject=e}.bind(this)),this.callbacks={},this.plainMsg=this._handleMsg(n),this._eventsHandle={},this._timeoutTimer=null,this._initTimeout(),this.isFinish=!1};l.prototype._initTimeout=function(){this._clearTimeout(),this.option.timeout>0&&(this._timeoutTimer=setTimeout(function(){this.receiveEvent(s.TIMEOUT),this.receiveResponse(a,!0)}.bind(this),this.option.timeout))},l.prototype._clearTimeout=function(){clearTimeout(this._timeoutTimer)},l.prototype._handleMsg=function(t){var e={};return Object.keys(t).forEach(function(n){var o=t[n];"function"==typeof o&&"on"===n.slice(0,2)?this.callbacks[n]=o:e[n]=r(o)}.bind(this)),e},l.prototype.getPayload=function(){return{msgId:this.id,containerId:this.containerId,methodName:this.methodName,body:this.plainMsg,type:"request"}},l.prototype.receiveEvent=function(t,e){if(this.isFinish&&t!==s.FINISH)return!1;t!==s.FINISH&&t!==s.TIMEOUT&&this._initTimeout(),Array.isArray(this._eventsHandle[t])&&this._eventsHandle[t].forEach(function(t){try{t(e)}catch(t){console.error(e)}});var n="on"+t.charAt(0).toUpperCase()+t.slice(1);return this.callbacks[n]&&this.callbacks[n](e),!0},l.prototype.addEventListener=function(t,e){if(!t||"function"!=typeof e)throw"eventName is null or handle is not a function, addEventListener fail";Array.isArray(this._eventsHandle[t])||(this._eventsHandle[t]=[]),this._eventsHandle[t].push(e)},l.prototype.removeEventListener=function(t,e){if(!t||!e)throw"eventName is null or handle is null, invoke removeEventListener fail";if(Array.isArray(this._eventsHandle[t])){var n=this._eventsHandle[t].indexOf(e);-1!==n&&this._eventsHandle[t].splice(n,1)}},l.prototype.receiveResponse=function(t,e){if(!0===this.isFinish)return!1;this._clearTimeout();var e=!!e;return e?this._p._reject(t):this._p._resolve(t),setTimeout(function(){this.receiveEvent(s.FINISH)}.bind(this),0),this.isFinish=!0,!0},t.exports=l},204:function(t,e,n){"use strict";var r=function(t,e,n){if(this._msgId=n.msgId,this.frameWindow=t,this.methodName=n.methodName,this.clientOrigin=e,this.containerId=n.containerId,this.params=n.body,!this._msgId)throw"msgId not exist";if(!this.frameWindow)throw"frameWindow not exist";if(!this.methodName)throw"methodName not exits";if(!this.clientOrigin)throw"clientOrigin not exist";this.hasResponded=!1};r.prototype.respond=function(t,e){var e=!!e;if(!0!==this.hasResponded){var n={type:"response",success:!e,body:t,msgId:this._msgId};this.frameWindow.postMessage(n,this.clientOrigin),this.hasResponded=!0}},r.prototype.emit=function(t,e){var n={type:"event",eventName:t,body:e,msgId:this._msgId};this.frameWindow.postMessage(n,this.clientOrigin)},t.exports=r},205:function(t,e,n){"use strict";t.exports={SYS_EVENT:"SYS_openAPIContainerInitEvent",SYS_INIT:"SYS_openAPIContainerInit"}},4:function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},714:function(t,e,n){(function(t,n){function r(t,e){return t.set(e[0],e[1]),t}function o(t,e){return t.add(e),t}function i(t,e){for(var n=-1,r=t.length;++n<r&&!1!==e(t[n],n,t););return t}function u(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t}function c(t,e,n,r){var o=-1,i=t.length;for(r&&i&&(n=t[++o]);++o<i;)n=e(n,t[o],o,t);return n}function a(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}function s(t){return t&&t.Object===Object?t:null}function f(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function l(t){var e=-1,n=Array(t.size);return t.forEach(function(t,r){n[++e]=[r,t]}),n}function p(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}function h(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function d(){this.__data__=ke?ke(null):{}}function v(t){return this.has(t)&&delete this.__data__[t]}function y(t){var e=this.__data__;if(ke){var n=e[t];return n===St?void 0:n}return ye.call(e,t)?e[t]:void 0}function _(t){var e=this.__data__;return ke?void 0!==e[t]:ye.call(e,t)}function b(t,e){return this.__data__[t]=ke&&void 0===e?St:e,this}function g(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function m(){this.__data__=[]}function j(t){var e=this.__data__,n=W(e,t);return!(n<0||(n==e.length-1?e.pop():xe.call(e,n,1),0))}function w(t){var e=this.__data__,n=W(e,t);return n<0?void 0:e[n][1]}function I(t){return W(this.__data__,t)>-1}function O(t,e){var n=this.__data__,r=W(n,t);return r<0?n.push([t,e]):n[r][1]=e,this}function x(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function A(){this.__data__={hash:new h,map:new(Me||g),string:new h}}function E(t){return rt(this,t).delete(t)}function S(t){return rt(this,t).get(t)}function M(t){return rt(this,t).has(t)}function N(t,e){return rt(this,t).set(t,e),this}function P(t){this.__data__=new g(t)}function T(){this.__data__=new g}function k(t){return this.__data__.delete(t)}function F(t){return this.__data__.get(t)}function H(t){return this.__data__.has(t)}function L(t,e){var n=this.__data__;return n instanceof g&&n.__data__.length==Et&&(n=this.__data__=new x(n.__data__)),n.set(t,e),this}function $(t,e,n){var r=t[e];ye.call(t,e)&&yt(r,n)&&(void 0!==n||e in t)||(t[e]=n)}function W(t,e){for(var n=t.length;n--;)if(yt(t[n][0],e))return n;return-1}function U(t,e){return t&&tt(e,At(e),t)}function R(t,e,n,r,o,u,c){var a;if(r&&(a=u?r(t,o,u,c):r(t)),void 0!==a)return a;if(!wt(t))return t;var s=Ye(t);if(s){if(a=at(t),!e)return Z(t,a)}else{var l=ct(t),p=l==kt||l==Ft;if(Ce(t))return D(t,e);if(l==$t||l==Nt||p&&!u){if(f(t))return u?t:{};if(a=st(p?{}:t),!e)return et(t,U(a,t))}else{if(!re[l])return u?t:{};a=ft(t,l,R,e)}}c||(c=new P);var h=c.get(t);if(h)return h;if(c.set(t,a),!s)var d=n?nt(t):At(t);return i(d||t,function(o,i){d&&(i=o,o=t[i]),$(a,i,R(o,e,n,r,i,t,c))}),a}function B(t){return wt(t)?Ie(t):{}}function Y(t,e,n){var r=e(t);return Ye(t)?r:u(r,n(t))}function C(t,e){return ye.call(t,e)||"object"==typeof t&&e in t&&null===it(t)}function V(t){return Ee(Object(t))}function D(t,e){if(e)return t.slice();var n=new t.constructor(t.length);return t.copy(n),n}function G(t){var e=new t.constructor(t.byteLength);return new je(e).set(new je(t)),e}function q(t,e){var n=e?G(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}function z(t,e,n){return c(e?n(l(t),!0):l(t),r,new t.constructor)}function J(t){var e=new t.constructor(t.source,te.exec(t));return e.lastIndex=t.lastIndex,e}function K(t,e,n){return c(e?n(p(t),!0):p(t),o,new t.constructor)}function Q(t){return Re?Object(Re.call(t)):{}}function X(t,e){var n=e?G(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}function Z(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}function tt(t,e,n,r){n||(n={});for(var o=-1,i=e.length;++o<i;){var u=e[o];$(n,u,r?r(n[u],t[u],u,n,t):t[u])}return n}function et(t,e){return tt(t,ut(t),e)}function nt(t){return Y(t,At,ut)}function rt(t,e){var n=t.__data__;return ht(e)?n["string"==typeof e?"string":"hash"]:n.map}function ot(t,e){var n=t[e];return Ot(n)?n:void 0}function it(t){return Ae(Object(t))}function ut(t){return we(Object(t))}function ct(t){return _e.call(t)}function at(t){var e=t.length,n=t.constructor(e);return e&&"string"==typeof t[0]&&ye.call(t,"index")&&(n.index=t.index,n.input=t.input),n}function st(t){return"function"!=typeof t.constructor||dt(t)?{}:B(it(t))}function ft(t,e,n,r){var o=t.constructor;switch(e){case Yt:return G(t);case Pt:case Tt:return new o(+t);case Ct:return q(t,r);case Vt:case Dt:case Gt:case qt:case zt:case Jt:case Kt:case Qt:case Xt:return X(t,r);case Ht:return z(t,r,n);case Lt:case Rt:return new o(t);case Wt:return J(t);case Ut:return K(t,r,n);case Bt:return Q(t)}}function lt(t){var e=t?t.length:void 0;return jt(e)&&(Ye(t)||xt(t)||_t(t))?a(e,String):null}function pt(t,e){return!!(e=null==e?Mt:e)&&("number"==typeof t||ne.test(t))&&t>-1&&t%1==0&&t<e}function ht(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}function dt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||de)}function vt(t){if(null!=t){try{return ve.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function yt(t,e){return t===e||t!==t&&e!==e}function _t(t){return gt(t)&&ye.call(t,"callee")&&(!Oe.call(t,"callee")||_e.call(t)==Nt)}function bt(t){return null!=t&&jt(Be(t))&&!mt(t)}function gt(t){return It(t)&&bt(t)}function mt(t){var e=wt(t)?_e.call(t):"";return e==kt||e==Ft}function jt(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=Mt}function wt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function It(t){return!!t&&"object"==typeof t}function Ot(t){return!!wt(t)&&(mt(t)||f(t)?be:ee).test(vt(t))}function xt(t){return"string"==typeof t||!Ye(t)&&It(t)&&_e.call(t)==Rt}function At(t){var e=dt(t);if(!e&&!bt(t))return V(t);var n=lt(t),r=!!n,o=n||[],i=o.length;for(var u in t)!C(t,u)||r&&("length"==u||pt(u,i))||e&&"constructor"==u||o.push(u);return o}var Et=200,St="__lodash_hash_undefined__",Mt=9007199254740991,Nt="[object Arguments]",Pt="[object Boolean]",Tt="[object Date]",kt="[object Function]",Ft="[object GeneratorFunction]",Ht="[object Map]",Lt="[object Number]",$t="[object Object]",Wt="[object RegExp]",Ut="[object Set]",Rt="[object String]",Bt="[object Symbol]",Yt="[object ArrayBuffer]",Ct="[object DataView]",Vt="[object Float32Array]",Dt="[object Float64Array]",Gt="[object Int8Array]",qt="[object Int16Array]",zt="[object Int32Array]",Jt="[object Uint8Array]",Kt="[object Uint8ClampedArray]",Qt="[object Uint16Array]",Xt="[object Uint32Array]",Zt=/[\\^$.*+?()[\]{}|]/g,te=/\w*$/,ee=/^\[object .+?Constructor\]$/,ne=/^(?:0|[1-9]\d*)$/,re={};re[Nt]=re["[object Array]"]=re[Yt]=re[Ct]=re[Pt]=re[Tt]=re[Vt]=re[Dt]=re[Gt]=re[qt]=re[zt]=re[Ht]=re[Lt]=re[$t]=re[Wt]=re[Ut]=re[Rt]=re[Bt]=re[Jt]=re[Kt]=re[Qt]=re[Xt]=!0,re["[object Error]"]=re[kt]=re["[object WeakMap]"]=!1;var oe={function:!0,object:!0},ie=oe[typeof e]&&e&&!e.nodeType?e:void 0,ue=oe[typeof t]&&t&&!t.nodeType?t:void 0,ce=ue&&ue.exports===ie?ie:void 0,ae=s(ie&&ue&&"object"==typeof n&&n),se=s(oe[typeof self]&&self),fe=s(oe[typeof window]&&window),le=s(oe[typeof this]&&this),pe=ae||fe!==(le&&le.window)&&fe||se||le||Function("return this")(),he=Array.prototype,de=Object.prototype,ve=Function.prototype.toString,ye=de.hasOwnProperty,_e=de.toString,be=RegExp("^"+ve.call(ye).replace(Zt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ge=ce?pe.Buffer:void 0,me=pe.Symbol,je=pe.Uint8Array,we=Object.getOwnPropertySymbols,Ie=Object.create,Oe=de.propertyIsEnumerable,xe=he.splice,Ae=Object.getPrototypeOf,Ee=Object.keys,Se=ot(pe,"DataView"),Me=ot(pe,"Map"),Ne=ot(pe,"Promise"),Pe=ot(pe,"Set"),Te=ot(pe,"WeakMap"),ke=ot(Object,"create"),Fe=vt(Se),He=vt(Me),Le=vt(Ne),$e=vt(Pe),We=vt(Te),Ue=me?me.prototype:void 0,Re=Ue?Ue.valueOf:void 0;h.prototype.clear=d,h.prototype.delete=v,h.prototype.get=y,h.prototype.has=_,h.prototype.set=b,g.prototype.clear=m,g.prototype.delete=j,g.prototype.get=w,g.prototype.has=I,g.prototype.set=O,x.prototype.clear=A,x.prototype.delete=E,x.prototype.get=S,x.prototype.has=M,x.prototype.set=N,P.prototype.clear=T,P.prototype.delete=k,P.prototype.get=F,P.prototype.has=H,P.prototype.set=L;var Be=function(t){return function(t){return null==t?void 0:t.length}}();we||(ut=function(){return[]}),(Se&&ct(new Se(new ArrayBuffer(1)))!=Ct||Me&&ct(new Me)!=Ht||Ne&&"[object Promise]"!=ct(Ne.resolve())||Pe&&ct(new Pe)!=Ut||Te&&"[object WeakMap]"!=ct(new Te))&&(ct=function(t){var e=_e.call(t),n=e==$t?t.constructor:void 0,r=n?vt(n):void 0;if(r)switch(r){case Fe:return Ct;case He:return Ht;case Le:return"[object Promise]";case $e:return Ut;case We:return"[object WeakMap]"}return e});var Ye=Array.isArray,Ce=ge?function(t){return t instanceof ge}:function(t){return function(){return!1}}();t.exports=R}).call(e,n(719)(t),n(4))},715:function(t,e,n){function r(t,e,n){var r=t[e];m.call(t,e)&&a(r,n)&&(void 0!==n||e in t)||(t[e]=n)}function o(t,e,n,o){n||(n={});for(var i=-1,u=e.length;++i<u;){var c=e[i];r(n,c,o?o(n[c],t[c],c,n,t):t[c])}return n}function i(t,e){return!!(e=null==e?v:e)&&("number"==typeof t||b.test(t))&&t>-1&&t%1==0&&t<e}function u(t,e,n){if(!p(n))return!1;var r=typeof e;return!!("number"==r?s(n)&&i(e,n.length):"string"==r&&e in n)&&a(n[e],t)}function c(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||g)}function a(t,e){return t===e||t!==t&&e!==e}function s(t){return null!=t&&l(O(t))&&!f(t)}function f(t){var e=p(t)?j.call(t):"";return e==y||e==_}function l(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=v}function p(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var h=n(717),d=n(718),v=9007199254740991,y="[object Function]",_="[object GeneratorFunction]",b=/^(?:0|[1-9]\d*)$/,g=Object.prototype,m=g.hasOwnProperty,j=g.toString,w=g.propertyIsEnumerable,I=!w.call({valueOf:1},"valueOf"),O=function(t){return function(t){return null==t?void 0:t.length}}(),x=function(t){return d(function(e,n){var r=-1,o=n.length,i=o>1?n[o-1]:void 0,c=o>2?n[2]:void 0;for(i=t.length>3&&"function"==typeof i?(o--,i):void 0,c&&u(n[0],n[1],c)&&(i=o<3?void 0:i,o=1),e=Object(e);++r<o;){var a=n[r];a&&t(e,a)}return e})}(function(t,e){if(I||c(e)||s(e))return void o(e,h(e),t);for(var n in e)m.call(e,n)&&r(t,n,e[n])});t.exports=x},716:function(t,e,n){function r(t){return o(t,!0,!0)}var o=n(714);t.exports=r},717:function(t,e){function n(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}function r(t,e){var r=x(t)||c(t)?n(t.length,String):[],o=r.length,u=!!o;for(var a in t)!e&&!j.call(t,a)||u&&("length"==a||i(a,o))||r.push(a);return r}function o(t){if(!u(t))return O(t);var e=[];for(var n in Object(t))j.call(t,n)&&"constructor"!=n&&e.push(n);return e}function i(t,e){return!!(e=null==e?v:e)&&("number"==typeof t||g.test(t))&&t>-1&&t%1==0&&t<e}function u(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||m)}function c(t){return s(t)&&j.call(t,"callee")&&(!I.call(t,"callee")||w.call(t)==y)}function a(t){return null!=t&&l(t.length)&&!f(t)}function s(t){return h(t)&&a(t)}function f(t){var e=p(t)?w.call(t):"";return e==_||e==b}function l(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=v}function p(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function h(t){return!!t&&"object"==typeof t}function d(t){return a(t)?r(t):o(t)}var v=9007199254740991,y="[object Arguments]",_="[object Function]",b="[object GeneratorFunction]",g=/^(?:0|[1-9]\d*)$/,m=Object.prototype,j=m.hasOwnProperty,w=m.toString,I=m.propertyIsEnumerable,O=function(t,e){return function(n){return t(e(n))}}(Object.keys,Object),x=Array.isArray;t.exports=d},718:function(t,e){function n(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}function r(t,e){return e=I(void 0===e?t.length-1:e,0),function(){for(var r=arguments,o=-1,i=I(r.length-e,0),u=Array(i);++o<i;)u[o]=r[e+o];o=-1;for(var c=Array(e+1);++o<e;)c[o]=r[o];return c[e]=u,n(t,this,c)}}function o(t,e){if("function"!=typeof t)throw new TypeError(l);return e=void 0===e?e:s(e),r(t,e)}function i(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function u(t){return!!t&&"object"==typeof t}function c(t){return"symbol"==typeof t||u(t)&&w.call(t)==v}function a(t){return t?(t=f(t))===p||t===-p?(t<0?-1:1)*h:t===t?t:0:0===t?t:0}function s(t){var e=a(t),n=e%1;return e===e?n?e-n:e:0}function f(t){if("number"==typeof t)return t;if(c(t))return d;if(i(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=i(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(y,"");var n=b.test(t);return n||g.test(t)?m(t.slice(2),n?2:8):_.test(t)?d:+t}var l="Expected a function",p=1/0,h=1.7976931348623157e308,d=NaN,v="[object Symbol]",y=/^\s+|\s+$/g,_=/^[-+]0x[0-9a-f]+$/i,b=/^0b[01]+$/i,g=/^0o[0-7]+$/i,m=parseInt,j=Object.prototype,w=j.toString,I=Math.max;t.exports=o},719:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},721:function(t,e,n){t.exports=n(199)}})});

/***/ }),

/***/ "mkrh":
/*!**********************!*\
  !*** ./utils/sdk.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = undefined;

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "qO4V");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "h7cE");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var request = exports.request = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dataSource, params) {
    var globals, apiKey, reqParams, clientId, res, _res, _res2;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            globals = (0, _globals2.getGlobals)();

            if (dataSource) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return');

          case 3:
            // 兼容原来request第一个参数是apiKey的情况
            apiKey = typeof dataSource === 'object' ? dataSource.apiKey : dataSource;

            console.log('initSdkRequest 自定义接口请求参数 apiKey：', apiKey);
            console.log('initSdkRequest 自定义接口请求参数 params：', params);

            if (apiKey) {
              _context.next = 9;
              break;
            }

            console.error('custom request apiKey is missing');
            // logger.logCustom2Retcode('sdk_request_apiKey_missing');
            return _context.abrupt('return');

          case 9:
            reqParams = typeof params === 'object' ? JSON.stringify(params) : params;

            // 如果存在clientId，则走新的接口

            if (!(dataSource && dataSource.clientId)) {
              _context.next = 26;
              break;
            }

            clientId = dataSource.clientId;

            console.log('\u8FDB\u5165callApiByClient\u94FE\u8DEF\uFF0CclientId\u4E3A ' + clientId + '\uFF0CapiKey\u4E3A' + apiKey);

            if (!isPreviewMode()) {
              _context.next = 20;
              break;
            }

            _context.next = 16;
            return (0, _lwp.customCallApiByClient)([{
              'corpId': globals.corpId,
              'appUuid': globals.appUuid,
              'type': 'YGW',
              'clientId': clientId,
              'action': apiKey,
              'params': reqParams,
              'previewType': globals.previewType
            }]);

          case 16:
            res = _context.sent;
            return _context.abrupt('return', compileResponse(res));

          case 20:
            _context.next = 22;
            return (0, _lwp.callApiByClient)([globals.corpId, globals.appUuid, 'YGW', clientId, apiKey, reqParams]);

          case 22:
            _res = _context.sent;
            return _context.abrupt('return', compileResponse(_res));

          case 24:
            _context.next = 31;
            break;

          case 26:
            // 走老的接口
            console.log('\u8FDB\u5165callApi\u94FE\u8DEF\uFF0CapiKey\u4E3A ' + apiKey);
            _context.next = 29;
            return (0, _lwp.callApi)([globals.corpId, globals.appUuid, 'YGW', apiKey, '1', reqParams]);

          case 29:
            _res2 = _context.sent;
            return _context.abrupt('return', compileResponse(_res2));

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function request(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.setStorageItem = setStorageItem;
exports.getStorageItem = getStorageItem;
exports.removeStorageItem = removeStorageItem;
exports.clearStorage = clearStorage;
exports.triggerCustomEvent = triggerCustomEvent;
exports.listenCustomEvent = listenCustomEvent;
exports.removeCustomEvent = removeCustomEvent;
exports.removeCustomEvents = removeCustomEvents;
exports.fetchAppCheckConfigIfNecessary = fetchAppCheckConfigIfNecessary;
exports.openApp = openApp;
exports.log = log;
exports.openSubPage = openSubPage;

var _eventemitter = __webpack_require__(/*! eventemitter2 */ "cjKa");

var _openLink = __webpack_require__(/*! @ali/dingtalk-jsapi/api/biz/util/openLink */ "Pixs");

var _openLink2 = _interopRequireDefault(_openLink);

var _previewTypes = __webpack_require__(/*! ../constants/previewTypes */ "gipX");

var _previewTypes2 = _interopRequireDefault(_previewTypes);

var _bizUtil = __webpack_require__(/*! ./bizUtil */ "LZ7c");

var _tool = __webpack_require__(/*! ./tool */ "sFzS");

var _lwp = __webpack_require__(/*! ../services/lwp */ "FGrC");

var _globals2 = __webpack_require__(/*! ../constants/globals */ "Mice");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
/* eslint-disable no-console */

// import logger from './logger';


/**
 * 全局自定义组件的存储空间
 */
var storage = {};
/**
 * 返回storage空间
 * @param {String} namespace
 */
function getStorage(namespace) {
  if (!storage[namespace]) {
    storage[namespace] = {};
  }
  return storage[namespace];
}

/**
 * 将数据缓存在全局中，只能存储基础数据类型，不能包含Function、Blob等
 * @param {String} namespace
 * @param {String} key
 * @param {any} value 只能存储基础数据类型，如string、number、boolean、object，不能存储Function、Blob等
 */
function setStorageItem(namespace, key, value) {
  if (typeof namespace !== 'string') {
    console.error('setStorage namespace ' + namespace + ' is not string');
    return;
  }
  if (typeof key !== 'string') {
    console.error('setStorage key ' + key + ' is not string');
    return;
  }
  if (value === undefined) {
    console.error('setStorage value is missing');
    return;
  }
  var store = getStorage(namespace);
  // TODO 检测value只能包含数据，不能嵌套有Function、Blob等类型
  store[key] = value;
}

/**
 * 获取存储空间中的某一项
 * @param {String} namespace
 * @param {String} key
 */
function getStorageItem(namespace, key) {
  if (typeof namespace !== 'string') {
    console.error('getStorage namespace ' + namespace + ' is not string');
    return;
  }
  if (typeof key !== 'string') {
    console.error('getStorage key ' + key + ' is not string');
    return;
  }
  var store = getStorage(namespace);
  return store[key];
}

/**
 * 删除存储空间中的某一项
 * @param {String} namespace
 * @param {String} key
 */
function removeStorageItem(namespace, key) {
  if (typeof namespace !== 'string') {
    console.error('setStorage namespace ' + namespace + ' is not string');
    return;
  }
  if (typeof key !== 'string') {
    console.error('setStorage key ' + key + ' is not string');
    return;
  }
  var store = getStorage(namespace);
  store[key] = undefined;
}

/**
 * 清空存储空间
 * @param {String} namespace
 */
function clearStorage(namespace) {
  if (typeof namespace !== 'string') {
    console.error('setStorage namespace ' + namespace + ' is not string');
    return;
  }
  getStorage(namespace);
  storage[namespace] = {};
}

var emitter = new _eventemitter.EventEmitter2();

function triggerCustomEvent(eventType, params) {
  // 保证trigger一定发生在listen之后，尤其是都是声明在didMount的情况
  setTimeout(function () {
    emitter.emit(eventType, params);
  }, 0);
}
function listenCustomEvent(eventType, cb) {
  emitter.on(eventType, cb);
}
function removeCustomEvent(eventType, cb) {
  emitter.off(eventType, cb);
}
function removeCustomEvents() {
  emitter.removeAllListeners();
}

// 从服务端查到的应用校验信息，用来校验openAppSdk跳转的地址是否合法
var appCheckConfig = {};

/**
 * 根据页面schema，判断是否用到自定义组件，如果有自定义组件，则从服务端获取应用校验信息
 * 获取到的信息，用于调用openApp SDK时校验是否合法的地址
 * @param pageSchema
 */
function fetchAppCheckConfigIfNecessary() {
  var pageSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // 已经获取过了，就不再重复获取
  if (appCheckConfig && (appCheckConfig.domains || appCheckConfig.miniAppIds)) return;
  if ((0, _bizUtil.hasCustomComponent)(pageSchema)) {
    // 获取应用的校验信息
    (0, _lwp.getOrgAppDomain)([(0, _globals2.getGlobals)().corpId]).then(function (res) {
      appCheckConfig = res || { domains: [], miniAppIds: [] };
    }, function (e) {
      console.log('getOrgAppDomain error');
      console.error(JSON.stringify(e));
    });
  }
}

/**
 * 打开应用
 * @param opt
 */
function openApp() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var url = opt.url;
  // 如果是小程序，校验miniAppId是否在已安装小程序中存在；如果是H5微应用，判断域名是不是与某个微应用匹配
  // const { domains = [], miniAppIds = [], } = appCheckConfig;
  // let isValid = false;
  // if (/^dingtalk/.test(url)) {
  //     // 如果是小程序，校验ID是不是匹配
  //     isValid = miniAppIds.some((miniAppId) => {
  //         return new RegExp(`miniAppId=${miniAppId}`).test(url);
  //     });
  // } else {
  //     // H5链接，校验域名是不是匹配
  //     isValid = domains.some((domain) => {
  //         return new RegExp(domain).test(url);
  //     });
  // }
  // TODO
  // 由于鑫蜂维反馈，云际给的小程序跳转地址不能正确跳转，先把判断临时去掉，待判断条件修复成和云际给的一致后再校验
  // if (isValid) {

  (0, _openLink2.default)({
    url: url,
    enableShare: false
  }).catch(function (err) {
    try {
      // try catch 保障stringify不出问题
      // logger.logError2RetCode(JSON.stringify({ url, err }));
    } catch (e) {
      console.error(e);
    }
  });
  // } else {
  //     dd.showToast({
  //         type: 'fail',
  //         content: '跳转地址错误，不是已安装应用的地址',
  //         duration: 2000,
  //     });
  // }
}

function log(msg) {
  // logger.log(msg);
}

function isPreviewMode() {
  var _getGlobals = (0, _globals2.getGlobals)(),
      previewType = _getGlobals.previewType;

  return _previewTypes2.default.PREVIEW_TYPE_MAP && _previewTypes2.default.PREVIEW_TYPE_MAP['preview_' + previewType];
}

/**
 * 打开二级页面
 * @param app
 */
function openSubPage(formUuid) {
  var _globals = globals,
      corpId = _globals.corpId,
      appUuid = _globals.appUuid,
      agentId = _globals.agentId,
      previewType = _globals.previewType;

  var isPreview = isPreviewMode();
  var orgParams = 'corpId=' + corpId + '&appUuid=' + appUuid + '&agentId=' + agentId + '&formCode=' + formUuid + '&funnelsource=portalDesign';
  var params = '' + orgParams + (isPreview ? '&previewType=' + previewType : '');
  var targetMiniAppId = isPreview ? '2019071765816859' : '2019080966146696';
  var finalUrl = 'dingtalk://dingtalkclient/action/open_mini_app?pVersion=1&packageType=1&ddCombined=1&miniAppId=' + targetMiniAppId + '&page=pages/subPage/index?' + params;
  console.log('open SubPage start: ' + (0, _tool.getCurrentTime)());
  // if (isPreview) {
  // dd.navigateTo({
  //     url: `/pages/subPage/index?${params}`,
  // });
  // } else {
  // 安卓端在门户下打开二级页面有BUG，按风念的说法预计2020年3月份才能修复，因此在真实门户场景下采用openLink方式跳转
  (0, _openLink2.default)({
    'url': finalUrl,
    'enableShare': false
  });
  // }
}

/**
 * 移动端返回的是json结构，小程序IDE测试网关又返回的是字符串，在这里统一处理一下，让开发者不用感知这个问题
 * @param res
 */
function compileResponse(res) {
  if (typeof res === 'string') {
    try {
      return JSON.parse(res);
    } catch (e) {
      console.error(e);
    }
  }
  return res;
}

;

/***/ }),

/***/ "n5lz":
/*!*****************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/polyfills/es6Promise.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
"function"!=typeof Promise&&__webpack_require__(/*! promise-polyfill/dist/polyfill */ "e1Jk");

/***/ }),

/***/ "nnhS":
/*!*****************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/otherApi.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.version=exports.language=exports.compareVersion=exports.other=exports.pc=exports.android=exports.ios=void 0;var env_1=__webpack_require__(/*! ./env */ "jEw7"),ENV=env_1.getENV();exports.ios=ENV.platform===env_1.ENV_ENUM.ios,exports.android=ENV.platform===env_1.ENV_ENUM.android,exports.pc=ENV.platform===env_1.ENV_ENUM.pc,exports.other=ENV.platform===env_1.ENV_ENUM.notInDingTalk;var compareVersion=function(e,r,o){function t(e){return parseInt(e,10)||0}if("string"!=typeof e||"string"!=typeof r)return!1;for(var s,p,n=e.split("-")[0].split(".").map(t),i=r.split("-")[0].split(".").map(t);s===p&&i.length>0;)s=n.shift(),p=i.shift();return o?(p||0)>=(s||0):(p||0)>(s||0)};exports.compareVersion=compareVersion,exports.language=ENV.language,exports.version=ENV.version;

/***/ }),

/***/ "oa4a":
/*!*************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/bridge/h5Android.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.h5AndroidbridgeInit=void 0;var h5BridgeReadyPromise,h5AndroidbridgeInit=function(){return h5BridgeReadyPromise||(h5BridgeReadyPromise=new Promise(function(e,i){var n=function(){try{window.WebViewJavascriptBridgeAndroid=window.nuva&&window.nuva.require(),e({})}catch(e){i(e)}};window.nuva&&(void 0===window.nuva.isReady||window.nuva.isReady)?n():(document.addEventListener("runtimeready",function(){n()},!1),document.addEventListener("runtimefailed",function(e){var n=e&&e.detail||{errorCode:"2",errorMessage:"unknown nuvajs bootstrap error"};i(n)},!1))})),h5BridgeReadyPromise};exports.h5AndroidbridgeInit=h5AndroidbridgeInit;var h5AndroidBridge=function(e,i){return h5BridgeReadyPromise||(h5BridgeReadyPromise=exports.h5AndroidbridgeInit()),h5BridgeReadyPromise.then(function(){return new Promise(function(n,r){var d=e.split("."),o=d.pop()||"",t=d.join("."),a=function(e){"function"==typeof i.onSuccess&&i.onSuccess(e),n(e)},u=function(e){"function"==typeof i.onFail&&i.onFail(e),r(e)};"function"==typeof window.WebViewJavascriptBridgeAndroid&&window.WebViewJavascriptBridgeAndroid(a,u,t,o,i)})})};exports.default=h5AndroidBridge;

/***/ }),

/***/ "p5Wu":
/*!*********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/babel-runtime/helpers/toConsumableArray.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(/*! ../core-js/array/from */ "KFdN");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),

/***/ "p6lt":
/*!************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "+3bn");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "qO4V":
/*!*************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/babel-runtime/regenerator/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "GtrG");


/***/ }),

/***/ "qQ7p":
/*!**********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_has.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "qg9k":
/*!**********************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/otherApi.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.language = exports.compareVersion = exports.other = exports.pc = exports.android = exports.ios = void 0;
var env_1 = __webpack_require__(/*! ./env */ "4GAR");
var ENV = env_1.getENV();
/**
 * @deprecated 兼容老接口，可用 `dd.env.platform === 'ios'` 代替
 */
exports.ios = ENV.platform === env_1.ENV_ENUM.ios;
/**
 * @deprecated 兼容老接口，可用 `dd.env.platform === 'ios'` 代替
 */
exports.android = ENV.platform === env_1.ENV_ENUM.android;
/**
 * @deprecated 兼容老接口，可用 `dd.env.platform === 'pc'` 代替
 */
exports.pc = ENV.platform === env_1.ENV_ENUM.pc;
/**
 * @deprecated 兼容老接口，可用 `dd.env.platform === 'notInDingTalk'` 代替
 */
exports.other = ENV.platform === env_1.ENV_ENUM.notInDingTalk;
/**
 * @deprecated 用于比较版本号，适用于钉钉内业务简易的版本比较
 * 例如3.5.0 > 3.4.9, 而semver的版本号则不支持
 * semver的版本号会忽略tag，例如3.5.0-realse.1 跟 3.5.0-realse.2 相等
 */
exports.compareVersion = function (oldVersion, newVersion, containEqual) {
    if (typeof oldVersion !== 'string' || typeof newVersion !== 'string') {
        return false;
    }
    function transform(item) {
        return parseInt(item, 10) || 0;
    }
    var oldArray = oldVersion.split('-')[0].split('.').map(transform);
    var newArray = newVersion.split('-')[0].split('.').map(transform);
    var o;
    var n;
    while (o === n && newArray.length > 0) {
        o = oldArray.shift();
        n = newArray.shift();
    }
    if (containEqual) {
        return (n || 0) >= (o || 0);
    }
    else {
        return (n || 0) > (o || 0);
    }
};
/**
 * @deprecated recommend use navigator.language to get current language
 */
exports.language = ENV.language;
/** @deprecated 即容器版本号, 推荐使用 dd.env.version */
exports.version = ENV.version;


/***/ }),

/***/ "qjZe":
/*!***********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_task.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "/QwB");
var invoke = __webpack_require__(/*! ./_invoke */ "uslv");
var html = __webpack_require__(/*! ./_html */ "mNdo");
var cel = __webpack_require__(/*! ./_dom-create */ "Qj+i");
var global = __webpack_require__(/*! ./_global */ "T/px");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ "IpsO")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "r4jH":
/*!******************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_iter-define.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "LoIC");
var $export = __webpack_require__(/*! ./_export */ "rG/S");
var redefine = __webpack_require__(/*! ./_redefine */ "t+K9");
var hide = __webpack_require__(/*! ./_hide */ "vmZR");
var Iterators = __webpack_require__(/*! ./_iterators */ "2ZeP");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "Wvm0");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "6ESS");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "fGSN");
var ITERATOR = __webpack_require__(/*! ./_wks */ "haEp")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "rG/S":
/*!*************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_export.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "T/px");
var core = __webpack_require__(/*! ./_core */ "6kth");
var ctx = __webpack_require__(/*! ./_ctx */ "/QwB");
var hide = __webpack_require__(/*! ./_hide */ "vmZR");
var has = __webpack_require__(/*! ./_has */ "qQ7p");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "sFzS":
/*!***********************!*\
  !*** ./utils/tool.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getQueryObject = undefined;
exports.consoleLog = consoleLog;
exports.consoleError = consoleError;
exports.replaceUrlCorpIdTemplate = replaceUrlCorpIdTemplate;
exports.isObj = isObj;
exports.changeStrToJsonSafe = changeStrToJsonSafe;
exports.transApplicationAuthByQueryInfo = transApplicationAuthByQueryInfo;
exports.getCurrentTime = getCurrentTime;

var _queryInfo = __webpack_require__(/*! @ali/dingtalk-jsapi/api/internal/microapp/queryInfo */ "NtqK");

var _queryInfo2 = _interopRequireDefault(_queryInfo);

var _homeAppTypes = __webpack_require__(/*! ../constants/homeAppTypes */ "jmbV");

var _homeAppTypes2 = _interopRequireDefault(_homeAppTypes);

var _globals = __webpack_require__(/*! ../constants/globals */ "Mice");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
// import logger from './logger';
var HOME_APP_TYPE_APP = _homeAppTypes2.default.HOME_APP_TYPE_APP;

/**
 * 默认appx线上会去掉console.log
 */

function consoleLog() {
    var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var arg2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var arg3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var _getGlobals = (0, _globals.getGlobals)(),
        debug = _getGlobals.debug;
    // iOS9下，使用console.log.apply会报错，导致之后其它组件的代码无法运行，因此降级成手动打印参数方式
    // eslint-disable-next-line


    debug && console.log(arg1, arg2, arg3);
}

function consoleError() {
    var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var arg2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var arg3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    // eslint-disable-next-line
    console.error(arg1, arg2, arg3);
}

/**
 * 将url链接中的corpId占位符替换掉
 * 需要将$CORPID$和编码后的$CORPID$都替换
 * @param {string} url
 * @param {string} corpId
 */
function replaceUrlCorpIdTemplate(url, corpId) {
    if (!url) {
        // logger.logCustom2Retcode('replace_url_error_url_not_exist');
        return url;
    }
    if (corpId === undefined) {
        // logger.logCustom2Retcode('replace_url_error_corpId_not_exist');
        return url;
    }
    var finalUrl = url;

    if (finalUrl && finalUrl.indexOf('$CORPID$') !== -1) {
        finalUrl = finalUrl.replace(/\$CORPID\$/, corpId);
    }
    if (finalUrl && finalUrl.indexOf('%24CORPID%24') !== -1) {
        finalUrl = finalUrl.replace(/%24CORPID%24/, corpId);
    }

    return finalUrl;
}

function isObj(obj) {
    // 为null时是[object Null]
    return Object.prototype.toString.call(obj) === '[object Object]';
}

function changeStrToJsonSafe(str) {
    if (typeof str !== 'string') {
        return str;
    }
    var finalRes = str;
    try {
        finalRes = JSON.parse(str);
    } catch (error) {
        // do no thing
    }

    return finalRes;
}

function filterListByQueryInfo(itemList, agentInfos) {
    var appAppIdConfigMap = {};

    if (Array.isArray(agentInfos)) {
        for (var i = 0, len = agentInfos.length; i < len; i++) {
            var agentIdConfig = agentInfos[i] || {};
            // 以appId为key存到map中
            appAppIdConfigMap[agentIdConfig.agentId] = agentIdConfig.location;
        }
    }

    return itemList.filter(function () {
        var appItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var appId = appItem.appId,
            appType = appItem.appType;


        if (appType === HOME_APP_TYPE_APP && appId && Array.isArray(agentInfos) && !appAppIdConfigMap[appId]) {
            // appId不存在也可见
            // 过滤应用市场这个手动添加的应用
            // 如果可见性里没有包含这个appid
            return false;
        }
        return true;
    });
}

/**
 * 基于jsap过滤微应用的可见性
 * @param {*} corpId
 * @param {*} itemList
 */
function transApplicationAuthByQueryInfo(corpId) {
    var itemList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


    return new Promise(function (resolve) {
        // 只过滤微应用的可见性
        var paraAgentIds = [];

        for (var i = 0, len = itemList.length; i < len; i++) {
            var item = itemList[i] || {};
            var appType = item.appType,
                appId = item.appId;


            if (appType === HOME_APP_TYPE_APP) {
                // 只选微应用
                paraAgentIds.push(appId);
            }
        }

        // 否则需要进行可见性查询
        (0, _queryInfo2.default)({
            corpId: corpId,
            // 以前是单独查询nativeId，这次直接忽略
            appIds: [],
            agentIds: paraAgentIds
        }).then(function () {
            var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var _res$agentInfos = res.agentInfos,
                agentInfos = _res$agentInfos === undefined ? [] : _res$agentInfos;


            resolve(filterListByQueryInfo(itemList, agentInfos));
        }).catch(function (err) {
            // eslint-disable-next-line no-console
            console.log('可见性查询失败:', err);
            // 可见性查询失败，兜底
            resolve(itemList);
        });
    });
}

// appUuid=SWAPP-ED91E1A946DC4BDF&agentId=280602930&previewType=2
// appUuid=SWAPP-ED91E1A946DC4BDF
var getQueryObject = exports.getQueryObject = function getQueryObject(queryString) {
    var queryObject = {};
    var list = [];
    if (queryString) {
        list = queryString.split('&');

        list.forEach(function (item) {
            var temp = item.split('=');
            if (temp.length === 2) {
                queryObject[temp[0]] = temp[1];
            }
        });
    }
    return queryObject;
};

function getCurrentTime() {
    var d = new Date();
    var seconds = d.getSeconds();
    return d.getHours() + ':' + d.getMinutes() + ':' + (seconds.length > 1 ? seconds : '0' + seconds);
}

// //拼接search串
// export const formQueryString = (query) => {
//   return Object.keys(query).reduce((pre, next) => {
//     return `${pre}&${next}=${query[next]}`
//   }, '').slice(1);
// }

// //转换钉钉内部用的MediaId为web可用的url兼容http类型mock数据，为空时返回undefined，注：不支持日常环境
// export const formatImageUrl = (url) => {
//   return url ? (url.startsWith('http') ? url : mid2Url(url)) : undefined;
// }

// //跳转前检测页面堆栈
// export const navigateTo = (url) => {
//   if (getCurrentPages().length < 4) {
//     dd.navigateTo({url})
//   } else {
//     dd.redirectTo({url})
//   }
// }

// //调用自定义jsApi
// export const callApi = (options) => {
//   const startTime = Date.now();
//   return new Promise(function (resolve, reject) {
//     dd.dtBridge({
//       m: options.api,
//       args: options.params,
//       onSuccess: function (result) {
//         logger.logApi2RetCode(options.api, true, Date.now() - startTime, {
//           request: options.params,
//           response: result,
//         });
//         resolve(result);
//       },
//       onFail: function (err) {
//         logger.logApi2RetCode(options.api, false, Date.now() - startTime, {
//           request: options.params,
//           response: err,
//         });
//         reject(err);
//       }
//     });
//   });
// }

/***/ }),

/***/ "szSW":
/*!**************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "t+K9":
/*!***************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_redefine.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ "vmZR");


/***/ }),

/***/ "tCMc":
/*!***********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/fn/array/from.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "SjPH");
__webpack_require__(/*! ../../modules/es6.array.from */ "UUul");
module.exports = __webpack_require__(/*! ../../modules/_core */ "6kth").Array.from;


/***/ }),

/***/ "uOgS":
/*!***********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/babel-runtime/core-js/promise.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/promise */ "Ui/0"), __esModule: true };

/***/ }),

/***/ "uWkV":
/*!*******************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_redefine-all.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(/*! ./_hide */ "vmZR");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "uslv":
/*!*************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_invoke.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "v01c":
/*!**************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_iobject.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "IpsO");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "vXSE":
/*!********************************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/bridge/webviewInMiniApp.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0});var noop=function(){},webviewInMiniappBridge=function(e,n){return new Promise(function(r,i){var o=n.onSuccess||noop,a=n.onFail||noop;if(delete n.onSuccess,delete n.onFail,AlipayJSBridge){var p=e.split("."),l=p.pop()||"",t=p.join(".");AlipayJSBridge.call.apply(null,["webDdExec",{serviceName:t,actionName:l,args:n},function(e){var n={},p=e.content;if(p)try{n=JSON.parse(p)}catch(e){console.error("parse dt api result error",p,e)}e.success?(o.apply(null,[n]),r(n)):(a.apply(null,[n]),i(n))}])}else{var c=new Error("Fatal error, cannot find bridge ,current env is WebView in MiniApp");a(c),i(c)}})};exports.default=webviewInMiniappBridge;

/***/ }),

/***/ "vmZR":
/*!***********************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_hide.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "d66Q");
var createDesc = __webpack_require__(/*! ./_property-desc */ "jq33");
module.exports = __webpack_require__(/*! ./_descriptors */ "2FaN") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "xSbw":
/*!****************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/entry/union.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;var dd=__webpack_require__(/*! ../core */ "6mBL");__webpack_require__(/*! ../platform */ "XFF6"),module.exports=dd;

/***/ }),

/***/ "xXvE":
/*!**************************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_species-constructor.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ "6k3Y");
var aFunction = __webpack_require__(/*! ./_a-function */ "DxYy");
var SPECIES = __webpack_require__(/*! ./_wks */ "haEp")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "xckU":
/*!**********************************************************************!*\
  !*** ./node_modules/@ali/dingtalk-jsapi/lib/polyfills/objectKeys.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
if (!Object.keys) {
    Object.keys = function (o) {
        if (o !== Object(o)) {
            throw new TypeError('Object.keys called on a non-object');
        }
        var k = [];
        var p;
        for (p in o) {
            if (Object.prototype.hasOwnProperty.call(o, p)) {
                k.push(p);
            }
        }
        return k;
    };
}


/***/ }),

/***/ "xfZ3":
/*!*********************************************************************************!*\
  !*** /snapshot/toolkit/node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "2FaN") && !__webpack_require__(/*! ./_fails */ "7ZW7")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "Qj+i")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "xrN5":
/*!**************************************************!*\
  !*** ./node_modules/dingtalk-jsapi/lib/ddSdk.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = undefined,
    self = undefined,
    window = undefined,
    document = undefined,
    location = undefined,
    XMLHttpRequest = undefined,
    AlipayJSBridge = undefined,
    importScript = undefined,
    importScripts = undefined,
    AFAppX = undefined,
    fetch = undefined,
    $AppxFramework = undefined,
    $AppxRuntime = undefined,
    mqEnvironment = undefined,
    wxEnvironment = undefined,
    __CUBE_KERNEL__ = undefined,
    $AppxRegistry = undefined,
    $AppxStyleRegistry = undefined;
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.ddSdk=exports.ENV_ENUM_SUB=exports.ENV_ENUM=void 0;var env_1=__webpack_require__(/*! ./env */ "jEw7"),log_1=__webpack_require__(/*! ./log */ "C7tZ"),env_2=__webpack_require__(/*! ./env */ "jEw7");Object.defineProperty(exports,"ENV_ENUM",{enumerable:!0,get:function(){return env_2.ENV_ENUM}}),Object.defineProperty(exports,"ENV_ENUM_SUB",{enumerable:!0,get:function(){return env_2.ENV_ENUM_SUB}});var sdk_1=__webpack_require__(/*! ./sdk */ "lnAV");__webpack_require__(/*! ./polyfills */ "TRZB"),exports.ddSdk=new sdk_1.Sdk(env_1.getENV(),log_1.log);

/***/ })

/******/ })
  );
})();