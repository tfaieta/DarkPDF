'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Render disproportion above which font will be considered broken and fallback will be used
var BROKEN_FONT_ALARM_THRESHOLD = 0.1;

var TextLayerItem = function (_PureComponent) {
  (0, _inherits3.default)(TextLayerItem, _PureComponent);

  function TextLayerItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TextLayerItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TextLayerItem.__proto__ || (0, _getPrototypeOf2.default)(TextLayerItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      transform: null
    }, _this.getElementWidth = function (element) {
      var _this2 = _this,
          sideways = _this2.sideways;

      return element.getBoundingClientRect()[sideways ? 'height' : 'width'];
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TextLayerItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.alignTextItem();
    }
  }, {
    key: 'getFontData',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fontFamily) {
        var page, font;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                page = this.context.page;
                _context.next = 3;
                return page.commonObjs.ensureObj(fontFamily);

              case 3:
                font = _context.sent;
                return _context.abrupt('return', font.data);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getFontData(_x) {
        return _ref2.apply(this, arguments);
      }

      return getFontData;
    }()
  }, {
    key: 'alignTextItem',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var element, scale, _props, fontName, width, targetWidth, fontData, actualWidth, widthDisproportion, repairsNeeded, fallbackFontName, ascent;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.item) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                element = this.item;

                element.style.transform = '';

                scale = this.context.scale;
                _props = this.props, fontName = _props.fontName, width = _props.width;
                targetWidth = width * scale;
                _context2.next = 9;
                return this.getFontData(fontName);

              case 9:
                fontData = _context2.sent;
                actualWidth = this.getElementWidth(element);
                widthDisproportion = Math.abs(targetWidth / actualWidth - 1);
                repairsNeeded = widthDisproportion > BROKEN_FONT_ALARM_THRESHOLD;

                if (repairsNeeded) {
                  fallbackFontName = fontData ? fontData.fallbackName : 'sans-serif';

                  element.style.fontFamily = fallbackFontName;

                  actualWidth = this.getElementWidth(element);
                }

                ascent = fontData ? fontData.ascent : 1;


                this.setState({
                  transform: 'scaleX(' + targetWidth / actualWidth + ') translateY(' + (1 - ascent) * 100 + '%)'
                });

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function alignTextItem() {
        return _ref3.apply(this, arguments);
      }

      return alignTextItem;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var fontSize = this.fontSize,
          top = this.top,
          left = this.left;
      var scale = this.context.scale;
      var _props2 = this.props,
          fontName = _props2.fontName,
          text = _props2.str;
      var transform = this.state.transform;


      return _react2.default.createElement(
        'div',
        {
          style: {
            height: '1em',
            fontFamily: fontName,
            fontSize: fontSize * scale + 'px',
            position: 'absolute',
            top: top * scale + 'px',
            left: left * scale + 'px',
            transformOrigin: 'left bottom',
            whiteSpace: 'pre',
            pointerEvents: 'all',
            transform: transform
          },
          ref: function ref(_ref4) {
            _this3.item = _ref4;
          }
        },
        this.context.customTextRenderer ? this.context.customTextRenderer(this.props) : text
      );
    }
  }, {
    key: 'unrotatedViewport',
    get: function get() {
      var _context3 = this.context,
          page = _context3.page,
          scale = _context3.scale;


      return page.getViewport(scale);
    }

    /**
     * It might happen that the page is rotated by default. In such cases, we shouldn't rotate
     * text content.
     */

  }, {
    key: 'rotate',
    get: function get() {
      var _context4 = this.context,
          page = _context4.page,
          rotate = _context4.rotate;

      return rotate - page.rotate;
    }
  }, {
    key: 'sideways',
    get: function get() {
      var rotate = this.rotate;

      return rotate % 180 !== 0;
    }
  }, {
    key: 'defaultSideways',
    get: function get() {
      var rotation = this.unrotatedViewport.rotation;

      return rotation % 180 !== 0;
    }
  }, {
    key: 'fontSize',
    get: function get() {
      var transform = this.props.transform;
      var defaultSideways = this.defaultSideways;

      var _transform = (0, _slicedToArray3.default)(transform, 2),
          fontHeightPx = _transform[0],
          fontWidthPx = _transform[1];

      return defaultSideways ? fontWidthPx : fontHeightPx;
    }
  }, {
    key: 'top',
    get: function get() {
      var transform = this.props.transform;
      var viewport = this.unrotatedViewport,
          defaultSideways = this.defaultSideways;

      var _transform2 = (0, _slicedToArray3.default)(transform, 6),
          /* fontHeightPx */offsetX = _transform2[2],
          offsetY = _transform2[3],
          x = _transform2[4],
          y = _transform2[5];

      var _viewport$viewBox = (0, _slicedToArray3.default)(viewport.viewBox, 4),
          /* xMin */yMin = _viewport$viewBox[1],
          /* xMax */yMax = _viewport$viewBox[3];

      return defaultSideways ? x + offsetX + yMin : yMax - (y + offsetY);
    }
  }, {
    key: 'left',
    get: function get() {
      var transform = this.props.transform;
      var viewport = this.unrotatedViewport,
          defaultSideways = this.defaultSideways;

      var _transform3 = (0, _slicedToArray3.default)(transform, 6),
          /* fontHeightPx */ /* fontWidthPx */ /* offsetX */x = _transform3[4],
          y = _transform3[5];

      var _viewport$viewBox2 = (0, _slicedToArray3.default)(viewport.viewBox, 1),
          xMin = _viewport$viewBox2[0];

      return defaultSideways ? y - xMin : x - xMin;
    }
  }]);
  return TextLayerItem;
}(_react.PureComponent);

exports.default = TextLayerItem;


TextLayerItem.contextTypes = {
  customTextRenderer: _propTypes2.default.func,
  page: _propTypes3.isPage.isRequired,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number
};

TextLayerItem.propTypes = {
  fontName: _propTypes2.default.string.isRequired,
  itemIndex: _propTypes2.default.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  str: _propTypes2.default.string.isRequired,
  transform: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  width: _propTypes2.default.number.isRequired
};