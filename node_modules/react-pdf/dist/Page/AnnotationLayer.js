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

var AnnotationLayer = function (_Component) {
  (0, _inherits3.default)(AnnotationLayer, _Component);

  function AnnotationLayer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AnnotationLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AnnotationLayer.__proto__ || (0, _getPrototypeOf2.default)(AnnotationLayer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      annotations: null
    }, _this.onGetAnnotationsSuccess = function (annotations) {
      (0, _utils.callIfDefined)(_this.context.onGetAnnotationsSuccess, annotations);

      _this.setState({ annotations: annotations });
    }, _this.onGetAnnotationsError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error.message, error);

      (0, _utils.callIfDefined)(_this.context.onGetAnnotationsError, error);

      _this.setState({ annotations: false });
    }, _this.onRenderSuccess = function () {
      (0, _utils.callIfDefined)(_this.context.onRenderAnnotationsSuccess);
    }, _this.onRenderError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error.message, error);

      (0, _utils.callIfDefined)(_this.context.onRenderError, error);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AnnotationLayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getAnnotations();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      if (nextContext.page !== this.context.page) {
        if (this.state.annotations !== null) {
          this.setState({ annotations: null });
        }

        this.getAnnotations(nextContext);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _utils.cancelRunningTask)(this.runningTask);
    }

    /**
     * Called when a annotations fails to render.
     */

  }, {
    key: 'getAnnotations',
    value: function getAnnotations() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.context;
      var page = context.page;


      if (!page) {
        throw new Error('Attempted to load page annotations, but no page was specified.');
      }

      this.runningTask = (0, _utils.makeCancellable)(page.getAnnotations());

      return this.runningTask.promise.then(this.onGetAnnotationsSuccess).catch(this.onGetAnnotationsError);
    }
  }, {
    key: 'renderAnnotations',
    value: function renderAnnotations() {
      var annotations = this.state.annotations;


      if (!annotations) {
        return;
      }

      var _context = this.context,
          linkService = _context.linkService,
          page = _context.page;

      var viewport = this.viewport.clone({ dontFlip: true });

      var parameters = {
        annotations: annotations,
        div: this.annotationLayer,
        linkService: linkService,
        page: page,
        viewport: viewport
      };

      try {
        PDFJS.AnnotationLayer.render(parameters);
        this.onRenderSuccess();
      } catch (error) {
        this.onRenderError(error);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'react-pdf__Page__annotations annotationLayer',
          ref: function ref(_ref2) {
            _this2.annotationLayer = _ref2;
          }
        },
        this.renderAnnotations()
      );
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
  return AnnotationLayer;
}(_react.Component);

exports.default = AnnotationLayer;


AnnotationLayer.contextTypes = {
  linkService: _propTypes3.isLinkService,
  onGetAnnotationsError: _propTypes2.default.func,
  onGetAnnotationsSuccess: _propTypes2.default.func,
  onRenderAnnotationsError: _propTypes2.default.func,
  onRenderAnnotationsSuccess: _propTypes2.default.func,
  page: _propTypes3.isPage,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number
};