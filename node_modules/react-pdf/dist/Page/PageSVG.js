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

var PageSVG = function (_Component) {
  (0, _inherits3.default)(PageSVG, _Component);

  function PageSVG() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PageSVG);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PageSVG.__proto__ || (0, _getPrototypeOf2.default)(PageSVG)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      svg: null
    }, _this.onRenderSuccess = function () {
      _this.renderer = null;

      var _this$context = _this.context,
          page = _this$context.page,
          scale = _this$context.scale;


      (0, _utils.callIfDefined)(_this.context.onRenderSuccess, (0, _utils.makePageCallback)(page, scale));
    }, _this.onRenderError = function (error) {
      if (error.name === 'RenderingCancelledException') {
        return;
      }

      (0, _utils.callIfDefined)(_this.context.onRenderError, error);
    }, _this.renderSVG = function () {
      var page = _this.context.page;


      _this.renderer = page.getOperatorList();

      return _this.renderer.then(function (operatorList) {
        var svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
        _this.renderer = svgGfx.getSVG(operatorList, _this.viewport).then(function (svg) {
          svg.style.maxWidth = '100%';
          svg.style.height = 'auto';
          _this.setState({ svg: svg }, function () {
            return _this.onRenderSuccess();
          });
        }).catch(_this.onRenderError);
      }).catch(_this.onRenderError);
    }, _this.drawPageOnContainer = function (element) {
      var svg = _this.state.svg;


      if (!element || !svg) {
        return;
      }

      var renderedPage = element.firstElementChild;
      if (renderedPage) {
        var _this$viewport = _this.viewport,
            width = _this$viewport.width,
            height = _this$viewport.height;

        renderedPage.setAttribute('width', width);
        renderedPage.setAttribute('height', height);
      } else {
        element.appendChild(svg);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PageSVG, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderSVG();
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
      var _this2 = this;

      return _react2.default.createElement('div', {
        className: 'react-pdf__Page__svg',
        style: {
          display: 'block',
          backgroundColor: 'white'
        }
        // Note: This cannot be shortened, as we need this function to be called with each render.
        , ref: function ref(_ref2) {
          return _this2.drawPageOnContainer(_ref2);
        }
      });
    }
  }, {
    key: 'viewport',
    get: function get() {
      var _context = this.context,
          page = _context.page,
          rotate = _context.rotate,
          scale = _context.scale;


      return page.getViewport(scale, rotate);
    }
  }]);
  return PageSVG;
}(_react.Component);

exports.default = PageSVG;


PageSVG.contextTypes = {
  onRenderError: _propTypes2.default.func,
  onRenderSuccess: _propTypes2.default.func,
  page: _propTypes3.isPage.isRequired,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number
};