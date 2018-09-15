'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allowedProperties = ['cMapUrl', 'cMapPacked', 'disableWorker', 'workerSrc', 'workerPort'];

var makeSetOptions = function makeSetOptions(pdfjs) {
  return function (options) {
    if (!(options instanceof Object)) {
      return;
    }

    /* eslint-disable no-param-reassign */
    (0, _keys2.default)(options).filter(function (property) {
      return allowedProperties.includes(property);
    }).forEach(function (property) {
      pdfjs.PDFJS[property] = options[property];
    });
  };
};

exports.default = makeSetOptions;