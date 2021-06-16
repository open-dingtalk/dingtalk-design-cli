/* eslint-disable */
// @ts-ignore
'use strict';

Object.defineProperty(exports, '__esModule', { value: true, });

var monitorStack = require('./monitor-stack');

function _typeof(obj) {
  '@babel/helpers - typeof';

  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === 'number') {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true,
          };
          return {
            done: false,
            value: o[i++],
          };
        },
        e: function (e) {
          throw e;
        },
        f: F,
      };
    }

    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }

  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function allFieldsReady(logItem) {
  var requiredFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var logger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  if (!requiredFields.length) {
    return true;
  }

  var _iterator = _createForOfIteratorHelper(requiredFields),
    _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var field = _step.value;

      if (logItem[field] === null || logItem[field] === undefined) {
        if (logger) {
          logger('Field "'.concat(field, '" is required. Log cached.'));
        }

        return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}
/**
 * 浅拷贝对象，将对象 b 中所有 a 不存在的 kv 拷贝给 a
 *
 * @export
 * @param {object} a
 * @param {object} b
 */

function shallowMerge(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
}
function objectAssign(target, obj) {
  if (!obj || _typeof(obj) !== 'object') {
    return target;
  }

  var tar = target || {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      tar[key] = obj[key];
    }
  }

  return tar;
}

/**
 * Gets the value at path of object
 * @param {object} obj object to query
 * @param {string} path query path
 * @returns {any} - if {@param path} requests element from array, then `undefined` will be returned
 */

function getProperty(obj, path) {
  var name = path.split('.');

  for (var i = 0; i < name.length - 1; i++) {
    obj = obj[name[i]];

    if (_typeof(obj) !== 'object' || !obj || Array.isArray(obj)) {
      return '';
    }
  }

  return obj[name.pop()];
}
/**
 * Sets the value at path of object. Stops execution, if {@param path} requests element from array to be set
 * @param {object} obj object to query
 * @param {string} path query path
 * @param {any} value value to be set
 * @returns {void}
 */

function setProperty(obj, path, value) {
  var name = path.split('.');

  for (var i = 0; i < name.length - 1; i++) {
    if (_typeof(obj[name[i]]) !== 'object' && obj[name[i]] !== undefined) {
      return;
    }

    if (Array.isArray(obj[name[i]])) {
      return;
    }

    if (!obj[name[i]]) {
      obj[name[i]] = {};
    }

    obj = obj[name[i]];
  }

  obj[name.pop()] = value;
}
/**
 * A Options Defaulter for Monitor Sdks
 * - Inspired by webpack optionsDefaulter
 * @export
 * @class OptionsDefaulter
 */

var OptionsDefaulter = /*#__PURE__*/function () {
  function OptionsDefaulter() {
    _classCallCheck(this, OptionsDefaulter);

    this.defaults = {};
    this.configs = {};
  }
  /**
   * build up default values
   *
   * @param {string} name option path
   * @param {ConfigType} config config if define is provided, then only config is allowed
   * @param {Define} [define] defaults
   * @memberof OptionsDefaulter
   */


  _createClass(OptionsDefaulter, [{
    key: 'set',
    value: function set(name, config, define) {
      if (define !== undefined) {
        this.defaults[name] = define;
        this.configs[name] = config;
      } else {
        this.defaults[name] = config;
        delete this.configs[name];
      }
    },
    /**
     * executing values with default values
     *
     * @param {{}} options options provide by user
     * @memberof OptionsDefaulter
     */

  }, {
    key: 'process',
    value: function process(options) {
      var _oldValue;

      options = objectAssign({}, options);

      for (var name in this.defaults) {
        if (this.defaults.hasOwnProperty(name)) {
          switch (this.configs[name]) {
          case 'call':
            setProperty(options, name, this.defaults[name].call(this, getProperty(options, name), options));
            break;

          case 'make':
            if (getProperty(options, name) === undefined) {
              setProperty(options, name, this.defaults[name].call(this, options));
            }

            break;

          case 'append':
            var oldValue = getProperty(options, name);

            if (!Array.isArray(oldValue)) {
              oldValue = [];
            }

            (_oldValue = oldValue).push.apply(_oldValue, _toConsumableArray(this.defaults[name]));

            setProperty(options, name, oldValue);
            break;

          default:
            if (getProperty(options, name) === undefined) {
              setProperty(options, name, this.defaults[name]);
            }

          }
        }
      }

      return options;
    },
  }]);

  return OptionsDefaulter;
}();

// 将dom转化为Array
function nodeListToArray(nodes) {
  var arr;
  var length;

  try {
    arr = [].slice.call(nodes);
    return arr;
  } catch (err) {
    arr = []; // eslint-disable-next-line prefer-destructuring

    length = nodes.length;

    for (var i = 0; i < length; i++) {
      arr.push(nodes[i]);
    }

    return arr;
  }
}
function getAttr(element, attrName) {
  return element && element.getAttribute ? element.getAttribute(attrName) || '' : '';
}

/* eslint-disable no-console */
var warnCache = {};

function warnDeprecated(property, suggestion) {
  if (!console || !console.warn || warnCache[property]) {
    return;
  }

  warnCache[property] = 1;
  console.warn('\u914D\u7F6E\u9879 ['.concat(property, '] \u5DF2\u4E0D\u63A8\u8350\u4F7F\u7528\u3002\u8BF7\u4F7F\u7528 [').concat(suggestion, ']\u3002'));
}

var defaulterSingleton;

function getGlobal() {
  if (!eval) {
    return global || window;
  }

  return (0, eval)('this');
}

function getOptionsDefaulter() {
  if (!defaulterSingleton) {
    defaulterSingleton = createOptionsDefaulter();
  }

  return defaulterSingleton;
}

var getMetaInfo = function (win) {
  return function (metaKey) {
    var _win$document;

    if (!(win === null || win === void 0 ? void 0 : (_win$document = win.document) === null || _win$document === void 0 ? void 0 : _win$document.querySelectorAll)) {
      return '';
    }

    var metas = nodeListToArray(win.document.querySelectorAll('meta'));

    for (var i = 0; i < metas.length; i++) {
      var m = metas[i];

      if (getAttr(m, 'name') === metaKey) {
        return getAttr(m, 'content');
      }
    }

    return null;
  };
}(getGlobal());

var metaMap = {
  _appId: 'bm_app_id',
  yuyanId: 'yuyan_id',
  sprintId: 'bm_sprint_id',
};

function getMetaOptions() {
  var options = {};

  for (var key in metaMap) {
    if (metaMap.hasOwnProperty(key)) {
      var metaContent = getMetaInfo(metaMap[key]);

      if (metaContent) {
        options[key] = metaContent;
      }
    }
  }

  return options;
}

function createOptionsDefaulter() {
  var defaulter = new OptionsDefaulter();
  var metaOptions = getMetaOptions(); // bmAppid 的兼容获取逻辑

  defaulter.set('bmAppid', 'call', function (value, options) {
    // 如果显式设置了 bmAppid，则直接取值
    if (value) {
      warnDeprecated('bmAppid', '_appId');
      return value;
    } // appid: 1.x appx 和 node 的接口rol


    if (options.appid) {
      warnDeprecated('appid', '_appId');
      return options.appid;
    } // _appId: 2.0 新增的建议 fallback 接口


    return options._appId || metaOptions._appId;
  });
  defaulter.set('yuyanId', 'call', function (value) {
    return value || metaOptions.yuyanId;
  });
  defaulter.set('userId', 'call', function (value, options) {
    if (options.roleId) {
      warnDeprecated('roleId', 'userId');
      return options.roleId;
    }

    return value;
  });
  defaulter.set('disableInterface', 'call', function (value) {
    return value || false;
  });
  defaulter.set('oncePerSession', 'call', function (value) {
    return value || false;
  });
  defaulter.set('autoCapture', 'call', function (_, options) {
    // 如果传入的属性里有写 autoCapture, 则用 Boolean 后的 autoCapture
    if (options.hasOwnProperty('autoCapture')) {
      return Boolean(options.autoCapture);
    }

    return true;
  });
  defaulter.set('defaults', 'call', function (value) {
    return objectAssign({}, value);
  });
  defaulter.set('sprintId', 'call', function (value) {
    return value || metaOptions.sprintId;
  }); // 只是做一下强转。。
  // 兼容一下用户只写一个字段的情况。。

  defaulter.set('requiredFields', 'call', function (value) {
    if (!Array.isArray(value)) {
      return typeof value === 'string' ? [value] : [];
    }

    return value;
  });
  defaulter.set('eventId', 'call', function (_, options) {
    return options.appType === 'PC' ? '102022' : '102023';
  });
  defaulter.set('beforeLog', 'call', function (value) {
    if (typeof value === 'function') {
      return value;
    }
  });
  defaulter.set('callBridge', 'call', function (value) {
    if (typeof value === 'function') {
      return value;
    }
  });
  defaulter.set('plugins', 'call', function (value) {
    return Array.isArray(value) ? value : ['performance', 'buc'];
  });
  return defaulter;
}

var ErrorCodeEnums = {
  JS: 1,
  REQUEST: 2,
  PROMISEREJECTION: 3,
  ASSETS: 4,
};

var enums = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ErrorCodeEnums: ErrorCodeEnums,
});

var es = new monitorStack.ErrorStack();
function logError(err, hashDetect, _ref) {
  var log = _ref.log,
    _warn = _ref._warn;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  try {
    var code = (options === null || options === void 0 ? void 0 : options.code) || ErrorCodeEnums.JS; // 监控项code

    var hashValue = '';

    if (err) {
      if (err.stack) {
        var _es$stackFormatter = es.stackFormatter(err),
          hash = _es$stackFormatter.hash,
          stackList = _es$stackFormatter.stackList;

        hashValue = hash; // 判断堆栈是否上报过

        if (hash && stackList && stackList.length) {
          hashDetect(hash).then(function (detect) {
            if (!detect) {
              log(_objectSpread2(_objectSpread2({}, options), {}, {
                code: ErrorCodeEnums.JS,
                s1: hash,
                s2: monitorStack.compressStack(stackList),
                s3: 1,
              }));
            }
          }).catch(function (e) {
            _warn('hash检测失败', e);
          });
        } // 上报日志信息


        log(_objectSpread2({
          code: code,
          msg: err.message,
          s10: hashValue,
        }, options));
      } else {
        log(_objectSpread2({
          code: code,
          msg: err.message || err,
        }, options));
      }
    }
  } catch (e) {
    _warn('异常上报失败:', e);
  }
}

exports.OptionsDefaulter = OptionsDefaulter;
exports.allFieldsReady = allFieldsReady;
exports.createOptionsDefaulter = createOptionsDefaulter;
exports.enums = enums;
exports.getOptionsDefaulter = getOptionsDefaulter;
exports.logError = logError;
exports.objectAssign = objectAssign;
exports.shallowMerge = shallowMerge;
