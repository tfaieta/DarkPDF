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

var _mergeClassNames = require('merge-class-names');

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _OutlineItem = require('./OutlineItem');

var _OutlineItem2 = _interopRequireDefault(_OutlineItem);

var _utils = require('./shared/utils');

var _events = require('./shared/events');

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Outline = function (_Component) {
  (0, _inherits3.default)(Outline, _Component);

  function Outline() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Outline);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Outline.__proto__ || (0, _getPrototypeOf2.default)(Outline)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      outline: null
    }, _this.onLoadSuccess = function (outline) {
      _this.setState({ outline: outline }, function () {
        (0, _utils.callIfDefined)(_this.props.onLoadSuccess, outline);
      });
    }, _this.onLoadError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error.message, error);

      (0, _utils.callIfDefined)(_this.props.onLoadError, error);

      _this.setState({ outline: false });
    }, _this.onItemClick = function (_ref2) {
      var pageIndex = _ref2.pageIndex,
          pageNumber = _ref2.pageNumber;

      (0, _utils.callIfDefined)(_this.props.onItemClick, {
        pageIndex: pageIndex,
        pageNumber: pageNumber
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Outline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadOutline();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      if (this.getPdf(nextProps, nextContext) !== this.getPdf()) {
        this.loadOutline(nextProps, nextContext);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _utils.cancelRunningTask)(this.runningTask);
    }
  }, {
    key: 'getPdf',
    value: function getPdf() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      return props.pdf || context.pdf;
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        pdf: this.getPdf(),
        onClick: this.onItemClick
      };
    }
  }, {
    key: 'loadOutline',
    value: function loadOutline() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      var pdf = this.getPdf(props, context);

      if (!pdf) {
        throw new Error('Attempted to load an outline, but no document was specified.');
      }

      if (this.state.outline !== null) {
        this.setState({ outline: null });
      }

      this.runningTask = (0, _utils.makeCancellable)(pdf.getOutline());

      return this.runningTask.promise.then(this.onLoadSuccess).catch(this.onLoadError);
    }
  }, {
    key: 'renderOutline',
    value: function renderOutline() {
      var outline = this.state.outline;


      return _react2.default.createElement(
        'ul',
        null,
        outline.map(function (item, itemIndex) {
          return _react2.default.createElement(_OutlineItem2.default, {
            key: typeof item.destination === 'string' ? item.destination : itemIndex,
            item: item
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var pdf = this.getPdf();
      var outline = this.state.outline;


      if (!pdf || !outline) {
        return null;
      }

      var className = this.props.className;


      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
          className: (0, _mergeClassNames2.default)('react-pdf__Outline', className),
          ref: this.props.inputRef
        }, this.eventProps),
        this.renderOutline()
      );
    }
  }, {
    key: 'eventProps',
    get: function get() {
      var _this2 = this;

      return (0, _events.makeEventProps)(this.props, function () {
        return _this2.state.outline;
      });
    }

    /**
     * Called when an outline is read successfully
     */


    /**
     * Called when an outline failed to read successfully
     */

  }]);
  return Outline;
}(_react.Component);

exports.default = Outline;


Outline.childContextTypes = {
  onClick: _propTypes2.default.func,
  pdf: _propTypes3.isPdf
};

Outline.contextTypes = {
  pdf: _propTypes3.isPdf
};

Outline.propTypes = (0, _extends3.default)({
  className: _propTypes3.isClassName,
  inputRef: _propTypes2.default.func,
  onItemClick: _propTypes2.default.func,
  onLoadError: _propTypes2.default.func,
  onLoadSuccess: _propTypes2.default.func
}, (0, _propTypes3.eventsProps)());