'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRotate = exports.isPdf = exports.isPageNumber = exports.isPageIndex = exports.isPage = exports.isLinkService = exports.isFile = exports.isClassName = exports.eventsProps = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.once');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _events = require('./events');

var _LinkService = require('../LinkService');

var _LinkService2 = _interopRequireDefault(_LinkService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventsProps = exports.eventsProps = (0, _lodash2.default)(function () {
  var eventProps = {};

  [].concat(_events.mouseEvents, _events.touchEvents).forEach(function (eventName) {
    eventProps[eventName] = _propTypes2.default.func;
  });

  return eventProps;
});

var fileTypes = [_propTypes2.default.string, _propTypes2.default.instanceOf(ArrayBuffer), _propTypes2.default.shape({
  data: _propTypes2.default.object,
  httpHeaders: _propTypes2.default.object,
  range: _propTypes2.default.object,
  url: _propTypes2.default.string,
  withCredentials: _propTypes2.default.bool
})];
if (typeof File !== 'undefined') {
  fileTypes.push(_propTypes2.default.instanceOf(File));
}
if (typeof Blob !== 'undefined') {
  fileTypes.push(_propTypes2.default.instanceOf(Blob));
}

var isClassName = exports.isClassName = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]);

var isFile = exports.isFile = _propTypes2.default.oneOfType(fileTypes);

var isLinkService = exports.isLinkService = _propTypes2.default.instanceOf(_LinkService2.default);

var isPage = exports.isPage = _propTypes2.default.shape({
  commonObjs: _propTypes2.default.shape({
    objs: _propTypes2.default.object.isRequired
  }).isRequired,
  getAnnotations: _propTypes2.default.func.isRequired,
  getTextContent: _propTypes2.default.func.isRequired,
  getViewport: _propTypes2.default.func.isRequired,
  render: _propTypes2.default.func.isRequired,
  transport: _propTypes2.default.shape({
    fontLoader: _propTypes2.default.object.isRequired
  }).isRequired
});

var isPageIndex = exports.isPageIndex = function isPageIndex(props, propName, componentName) {
  var pageIndex = props[propName];
  var pageNumber = props.pageNumber,
      pdf = props.pdf;


  if (!(0, _utils.isDefined)(pdf)) {
    return null;
  }

  if ((0, _utils.isDefined)(pageIndex)) {
    if (typeof pageIndex !== 'number') {
      return new Error('`' + propName + '` of type `' + (typeof pageIndex === 'undefined' ? 'undefined' : (0, _typeof3.default)(pageIndex)) + '` supplied to `' + componentName + '`, expected `number`.');
    }

    if (pageIndex < 0) {
      return new Error('Expected `' + propName + '` to be greater or equal to 0.');
    }

    var numPages = pdf.pdfInfo.numPages;


    if (pageIndex + 1 > numPages) {
      return new Error('Expected `' + propName + '` to be less or equal to ' + (numPages - 1) + '.');
    }
  } else if (!(0, _utils.isDefined)(pageNumber)) {
    return new Error('`' + propName + '` not supplied. Either pageIndex or pageNumber must be supplied to `' + componentName + '`.');
  }

  // Everything is fine
  return null;
};

var isPageNumber = exports.isPageNumber = function isPageNumber(props, propName, componentName) {
  var pageNumber = props[propName];
  var pageIndex = props.pageIndex,
      pdf = props.pdf;


  if (!(0, _utils.isDefined)(pdf)) {
    return null;
  }

  if ((0, _utils.isDefined)(pageNumber)) {
    if (typeof pageNumber !== 'number') {
      return new Error('`' + propName + '` of type `' + (typeof pageNumber === 'undefined' ? 'undefined' : (0, _typeof3.default)(pageNumber)) + '` supplied to `' + componentName + '`, expected `number`.');
    }

    if (pageNumber < 1) {
      return new Error('Expected `' + propName + '` to be greater or equal to 1.');
    }

    var numPages = pdf.pdfInfo.numPages;


    if (pageNumber > numPages) {
      return new Error('Expected `' + propName + '` to be less or equal to ' + numPages + '.');
    }
  } else if (!(0, _utils.isDefined)(pageIndex)) {
    return new Error('`' + propName + '` not supplied. Either pageIndex or pageNumber must be supplied to `' + componentName + '`.');
  }

  // Everything is fine
  return null;
};

var isPdf = exports.isPdf = _propTypes2.default.oneOfType([_propTypes2.default.shape({
  getDestination: _propTypes2.default.func.isRequired,
  getOutline: _propTypes2.default.func.isRequired,
  getPage: _propTypes2.default.func.isRequired,
  numPages: _propTypes2.default.number.isRequired
}), _propTypes2.default.bool]);

var isRotate = exports.isRotate = _propTypes2.default.oneOf([0, 90, 180, 270]);