'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../shared/utils');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageCanvas = function (_Component) {
  (0, _inherits3.default)(PageCanvas, _Component);

  function PageCanvas() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PageCanvas);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PageCanvas.__proto__ || (0, _getPrototypeOf2.default)(PageCanvas)).call.apply(_ref, [this].concat(args))), _this), _this.onRenderSuccess = function () {
      _this.renderer = null;

      var _this$context = _this.context,
          page = _this$context.page,
          scale = _this$context.scale;


      (0, _utils.callIfDefined)(_this.context.onRenderSuccess, (0, _utils.makePageCallback)(page, scale));
    }, _this.onRenderError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error.message, error);

      (0, _utils.callIfDefined)(_this.context.onRenderError, error);
    }, _this.drawPageOnCanvas = function (canvas) {
      if (!canvas) {
        return null;
      }

      var page = _this.context.page;
      var _this2 = _this,
          renderViewport = _this2.renderViewport,
          viewport = _this2.viewport;


      canvas.width = renderViewport.width;
      canvas.height = renderViewport.height;

      canvas.style.width = Math.floor(viewport.width) + 'px';
      canvas.style.height = Math.floor(viewport.height) + 'px';

      var renderContext = {
        get canvasContext() {
          return canvas.getContext('2d');
        },
        viewport: renderViewport
      };

      // If another render is in progress, let's cancel it
      /* eslint-disable no-underscore-dangle */
      if (_this.renderer && _this.renderer._internalRenderTask.running) {
        _this.renderer._internalRenderTask.cancel();
      }
      /* eslint-enable no-underscore-dangle */

      _this.renderer = page.render(renderContext);

      return _this.renderer.then(_this.onRenderSuccess).catch(_this.onRenderError);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PageCanvas, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      /* eslint-disable no-underscore-dangle */
      if (this.renderer && this.renderer._internalRenderTask.running) {
        this.renderer._internalRenderTask.cancel();
      }
      /* eslint-enable no-underscore-dangle */
    }

    /**
     * Called when a page is rendered successfully.
     */


    /**
     * Called when a page fails to render.
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('canvas', {
        className: 'react-pdf__Page__canvas',
        style: {
          display: 'block',
          userSelect: 'none'
        },
        ref: this.drawPageOnCanvas
      });
    }
  }, {
    key: 'renderViewport',
    get: function get() {
      var _context = this.context,
          page = _context.page,
          rotate = _context.rotate,
          scale = _context.scale;


      var pixelRatio = (0, _utils.getPixelRatio)();

      return page.getViewport(scale * pixelRatio, rotate);
    }
  }, {
    key: 'viewport',
    get: function get() {
      var _context2 = this.context,
          page = _context2.page,
          rotate = _context2.rotate,
          scale = _context2.scale;


      return page.getViewport(scale, rotate);
    }
  }]);
  return PageCanvas;
}(_react.Component);

exports.default = PageCanvas;


PageCanvas.contextTypes = {
  onRenderError: _propTypes2.default.func,
  onRenderSuccess: _propTypes2.default.func,
  page: _propTypes3.isPage.isRequired,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number
};