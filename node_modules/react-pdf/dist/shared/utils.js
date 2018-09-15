'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePageCallback = exports.cancelRunningTask = exports.makeCancellable = exports.displayCORSWarning = exports.errorOnDev = exports.warnOnDev = exports.getPixelRatio = exports.callIfDefined = exports.dataURItoUint8Array = exports.isParamObject = exports.isDataURI = exports.isFile = exports.isBlob = exports.isArrayBuffer = exports.isString = exports.isProvided = exports.isDefined = exports.isProduction = exports.isLocalFileSystem = exports.isBrowser = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if we're running in a browser environment.
 */
var isBrowser = exports.isBrowser = typeof window !== 'undefined';

/**
 * Checks whether we're running from a local file system.
 */
var isLocalFileSystem = exports.isLocalFileSystem = isBrowser && window.location.protocol === 'file:';

/**
 * Checks whether we're running on a production build or not.
 */
var isProduction = exports.isProduction = process.env.NODE_ENV === 'production';

/**
 * Checks whether a variable is defined.
 *
 * @param {*} variable Variable to check
 */
var isDefined = exports.isDefined = function isDefined(variable) {
  return typeof variable !== 'undefined';
};

/**
 * Checks whether a variable is defined and not null.
 *
 * @param {*} variable Variable to check
 */
var isProvided = exports.isProvided = function isProvided(variable) {
  return isDefined(variable) && variable !== null;
};

/**
 * Checkes whether a variable provided is a string.
 *
 * @param {*} variable Variable to check
 */
var isString = exports.isString = function isString(variable) {
  return typeof variable === 'string';
};

/**
 * Checks whether a variable provided is an ArrayBuffer.
 *
 * @param {*} variable Variable to check
 */
var isArrayBuffer = exports.isArrayBuffer = function isArrayBuffer(variable) {
  return variable instanceof ArrayBuffer;
};

/**
 * Checkes whether a variable provided is a Blob.
 *
 * @param {*} variable Variable to check
 */
var isBlob = exports.isBlob = function isBlob(variable) {
  if (!isBrowser) {
    throw new Error('Attempted to check if a variable is a Blob on a non-browser environment.');
  }

  return variable instanceof Blob;
};

/**
 * Checkes whether a variable provided is a File.
 *
 * @param {*} variable Variable to check
 */
var isFile = exports.isFile = function isFile(variable) {
  if (!isBrowser) {
    throw new Error('Attempted to check if a variable is a File on a non-browser environment.');
  }

  return variable instanceof File;
};

/**
 * Checks whether a string provided is a data URI.
 *
 * @param {String} str String to check
 */
var isDataURI = exports.isDataURI = function isDataURI(str) {
  return isString(str) && /^data:/.test(str);
};

var isParamObject = exports.isParamObject = function isParamObject(file) {
  return file instanceof Object && ('data' in file || 'range' in file || 'url' in file);
};

var dataURItoUint8Array = exports.dataURItoUint8Array = function dataURItoUint8Array(dataURI) {
  if (!isDataURI(dataURI)) {
    throw new Error('dataURItoUint8Array was provided with an argument which is not a valid data URI.');
  }

  var byteString = void 0;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }

  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }

  return ia;
};

/**
 * Calls a function, if it's defined, with specified arguments
 * @param {Function} fn
 * @param {Object} args
 */
var callIfDefined = exports.callIfDefined = function callIfDefined(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (fn && typeof fn === 'function') {
    fn.apply(undefined, args);
  }
};

var getPixelRatio = exports.getPixelRatio = function getPixelRatio() {
  return isBrowser && window.devicePixelRatio || 1;
};

var consoleOnDev = function consoleOnDev(method) {
  for (var _len2 = arguments.length, message = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    message[_key2 - 1] = arguments[_key2];
  }

  if (!isProduction) {
    var _console;

    // eslint-disable-next-line no-console
    (_console = console)[method].apply(_console, message);
  }
};

var warnOnDev = exports.warnOnDev = function warnOnDev() {
  for (var _len3 = arguments.length, message = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    message[_key3] = arguments[_key3];
  }

  return consoleOnDev.apply(undefined, ['warn'].concat(message));
};

var errorOnDev = exports.errorOnDev = function errorOnDev() {
  for (var _len4 = arguments.length, message = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    message[_key4] = arguments[_key4];
  }

  return consoleOnDev.apply(undefined, ['error'].concat(message));
};

var displayCORSWarning = exports.displayCORSWarning = function displayCORSWarning() {
  if (isLocalFileSystem) {
    // eslint-disable-next-line no-console
    warnOnDev('Loading PDF as base64 strings/URLs might not work on protocols other than HTTP/HTTPS. On Google Chrome, you can use --allow-file-access-from-files flag for debugging purposes.');
  }
};

var PromiseCancelledException = function (_Error) {
  (0, _inherits3.default)(PromiseCancelledException, _Error);

  function PromiseCancelledException(message, type) {
    (0, _classCallCheck3.default)(this, PromiseCancelledException);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PromiseCancelledException.__proto__ || (0, _getPrototypeOf2.default)(PromiseCancelledException)).call(this, message, type));

    _this.name = 'PromiseCancelledException';
    _this.message = message;
    _this.type = type;
    return _this;
  }

  return PromiseCancelledException;
}(Error);

var makeCancellable = exports.makeCancellable = function makeCancellable(promise) {
  var isCancelled = false;

  var wrappedPromise = new _promise2.default(function (resolve, reject) {
    promise.then(function () {
      return isCancelled ? reject(new PromiseCancelledException('Promise cancelled')) : resolve.apply(undefined, arguments);
    }, function (error) {
      return isCancelled ? reject(new PromiseCancelledException('Promise cancelled')) : reject(error);
    });
  });

  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      isCancelled = true;
    }
  };
};

var cancelRunningTask = exports.cancelRunningTask = function cancelRunningTask(runningTask) {
  if (!runningTask || !runningTask.cancel) {
    return;
  }

  runningTask.cancel();
};

var makePageCallback = exports.makePageCallback = function makePageCallback(page, scale) {
  Object.defineProperty(page, 'width', {
    get: function get() {
      return this.view[2] * scale;
    },
    configurable: true });
  Object.defineProperty(page, 'height', {
    get: function get() {
      return this.view[3] * scale;
    },
    configurable: true });
  Object.defineProperty(page, 'originalWidth', {
    get: function get() {
      return this.view[2];
    },
    configurable: true });
  Object.defineProperty(page, 'originalHeight', {
    get: function get() {
      return this.view[3];
    },
    configurable: true });
  return page;
};