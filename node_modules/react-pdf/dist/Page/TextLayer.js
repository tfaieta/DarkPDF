'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _TextLayerItem = require('./TextLayerItem');

var _TextLayerItem2 = _interopRequireDefault(_TextLayerItem);

var _utils = require('../shared/utils');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextLayer = function (_Component) {
  (0, _inherits3.default)(TextLayer, _Component);

  function TextLayer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TextLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TextLayer.__proto__ || (0, _getPrototypeOf2.default)(TextLayer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      textItems: null
    }, _this.onGetTextSuccess = function (textContent) {
      var textItems = null;
      if (textContent) {
        textItems = textContent.items;
      }

      (0, _utils.callIfDefined)(_this.context.onGetTextSuccess, textItems);

      _this.setState({ textItems: textItems });
    }, _this.onGetTextError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error.message, error);

      (0, _utils.callIfDefined)(_this.context.onGetTextError, error);

      _this.setState({ textItems: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TextLayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getTextContent();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      if (nextContext.page !== this.context.page) {
        if (this.state.textItems !== null) {
          this.setState({ textItems: null });
        }

        this.getTextContent(nextContext);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _utils.cancelRunningTask)(this.runningTask);
    }
  }, {
    key: 'getTextContent',
    value: function getTextContent() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.context;
      var page = context.page;


      if (!page) {
        throw new Error('Attempted to load page text content, but no page was specified.');
      }

      this.runningTask = (0, _utils.makeCancellable)(page.getTextContent());

      return this.runningTask.promise.then(this.onGetTextSuccess).catch(this.onGetTextError);
    }
  }, {
    key: 'renderTextItems',
    value: function renderTextItems() {
      var textItems = this.state.textItems;


      if (!textItems) {
        return null;
      }

      return textItems.map(function (textItem, itemIndex) {
        return _react2.default.createElement(_TextLayerItem2.default
        // eslint-disable-next-line react/no-array-index-key
        , (0, _extends3.default)({ key: itemIndex,
          itemIndex: itemIndex
        }, textItem));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var viewport = this.unrotatedViewport,
          rotate = this.rotate;


      return _react2.default.createElement(
        'div',
        {
          className: 'react-pdf__Page__textContent',
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: viewport.width + 'px',
            height: viewport.height + 'px',
            color: 'transparent',
            transform: 'translate(-50%, -50%) rotate(' + rotate + 'deg)',
            pointerEvents: 'none'
          }
        },
        this.renderTextItems()
      );
    }
  }, {
    key: 'unrotatedViewport',
    get: function get() {
      var _context = this.context,
          page = _context.page,
          scale = _context.scale;


      return page.getViewport(scale);
    }

    /**
     * It might happen that the page is rotated by default. In such cases, we shouldn't rotate
     * text content.
     */

  }, {
    key: 'rotate',
    get: function get() {
      var _context2 = this.context,
          page = _context2.page,
          rotate = _context2.rotate;

      return rotate - page.rotate;
    }
  }]);
  return TextLayer;
}(_react.Component);

exports.default = TextLayer;


TextLayer.contextTypes = {
  onGetTextError: _propTypes2.default.func,
  onGetTextSuccess: _propTypes2.default.func,
  page: _propTypes3.isPage.isRequired,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number
};