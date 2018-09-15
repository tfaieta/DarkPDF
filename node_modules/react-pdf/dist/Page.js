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

var _PageCanvas = require('./Page/PageCanvas');

var _PageCanvas2 = _interopRequireDefault(_PageCanvas);

var _PageSVG = require('./Page/PageSVG');

var _PageSVG2 = _interopRequireDefault(_PageSVG);

var _TextLayer = require('./Page/TextLayer');

var _TextLayer2 = _interopRequireDefault(_TextLayer);

var _AnnotationLayer = require('./Page/AnnotationLayer');

var _AnnotationLayer2 = _interopRequireDefault(_AnnotationLayer);

var _utils = require('./shared/utils');

var _events = require('./shared/events');

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function (_Component) {
  (0, _inherits3.default)(Page, _Component);

  function Page() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Page);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      page: null
    }, _this.onLoadSuccess = function (page) {
      _this.setState({ page: page }, function () {
        (0, _utils.callIfDefined)(_this.props.onLoadSuccess, (0, _utils.makePageCallback)(page, _this.scale));

        (0, _utils.callIfDefined)(_this.context.registerPage, page.pageIndex, _this.ref);
      });
    }, _this.onLoadError = function (error) {
      if (error.name === 'RenderingCancelledException' || error.name === 'PromiseCancelledException') {
        return;
      }

      (0, _utils.errorOnDev)(error.message, error);

      (0, _utils.callIfDefined)(_this.props.onLoadError, error);

      _this.setState({ page: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Page, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadPage();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      if (this.getPdf(nextProps, nextContext) !== this.getPdf() || this.getPageNumber(nextProps) !== this.getPageNumber()) {
        (0, _utils.callIfDefined)(this.context.unregisterPage, this.pageIndex);

        if (this.state.page !== null) {
          this.setState({ page: null });
        }

        this.loadPage(nextProps, nextContext);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _utils.callIfDefined)(this.context.unregisterPage, this.pageIndex);

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
      if (!this.state.page) {
        return {};
      }

      var context = {
        page: this.state.page,
        pdf: this.getPdf(),
        rotate: this.rotate,
        scale: this.scale
      };

      if (this.props.onRenderError) {
        context.onRenderError = this.props.onRenderError;
      }
      if (this.props.onRenderSuccess) {
        context.onRenderSuccess = this.props.onRenderSuccess;
      }
      if (this.props.onGetAnnotationsError) {
        context.onGetAnnotationsError = this.props.onGetAnnotationsError;
      }
      if (this.props.onGetAnnotationsSuccess) {
        context.onGetAnnotationsSuccess = this.props.onGetAnnotationsSuccess;
      }
      if (this.props.onGetTextError) {
        context.onGetTextError = this.props.onGetTextError;
      }
      if (this.props.onGetTextSuccess) {
        context.onGetTextSuccess = this.props.onGetTextSuccess;
      }
      if (this.props.customTextRenderer) {
        context.customTextRenderer = this.props.customTextRenderer;
      }
      return context;
    }

    /**
     * Called when a page is loaded successfully
     */


    /**
     * Called when a page failed to load
     */

  }, {
    key: 'getPageIndex',
    value: function getPageIndex() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if ((0, _utils.isProvided)(props.pageNumber)) {
        return props.pageNumber - 1;
      }

      if ((0, _utils.isProvided)(props.pageIndex)) {
        return props.pageIndex;
      }

      return null;
    }
  }, {
    key: 'getPageNumber',
    value: function getPageNumber() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if ((0, _utils.isProvided)(props.pageNumber)) {
        return props.pageNumber;
      }

      if ((0, _utils.isProvided)(props.pageIndex)) {
        return props.pageIndex + 1;
      }

      return null;
    }
  }, {
    key: 'loadPage',
    value: function loadPage() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      var pdf = this.getPdf(props, context);

      if (!pdf) {
        throw new Error('Attempted to load a page, but no document was specified.');
      }

      var pageNumber = this.getPageNumber(props);

      if (!pageNumber) {
        return null;
      }

      this.runningTask = (0, _utils.makeCancellable)(pdf.getPage(pageNumber));

      return this.runningTask.promise.then(this.onLoadSuccess).catch(this.onLoadError);
    }
  }, {
    key: 'renderTextLayer',
    value: function renderTextLayer() {
      var renderTextLayer = this.props.renderTextLayer;


      if (!renderTextLayer) {
        return null;
      }

      return _react2.default.createElement(_TextLayer2.default, { key: this.pageKey + '_text' });
    }
  }, {
    key: 'renderAnnotations',
    value: function renderAnnotations() {
      var renderAnnotations = this.props.renderAnnotations;


      if (!renderAnnotations) {
        return null;
      }

      return _react2.default.createElement(_AnnotationLayer2.default, { key: this.pageKey + '_annotations' });
    }
  }, {
    key: 'renderSVG',
    value: function renderSVG() {
      return [_react2.default.createElement(_PageSVG2.default, { key: this.pageKeyNoScale + '_svg' }),
      /**
       * As of now, PDF.js 2.0.120 returns warnings on unimplemented annotations.
       * Therefore, as a fallback, we render "traditional" AnnotationLayer component.
       */
      this.renderAnnotations()];
    }
  }, {
    key: 'renderCanvas',
    value: function renderCanvas() {
      return [_react2.default.createElement(_PageCanvas2.default, { key: this.pageKey + '_canvas' }), this.renderTextLayer(), this.renderAnnotations()];
    }
  }, {
    key: 'renderNoData',
    value: function renderNoData() {
      return _react2.default.createElement(
        'div',
        { className: 'react-pdf__message react-pdf__message--no-data' },
        this.props.noData
      );
    }
  }, {
    key: 'renderError',
    value: function renderError() {
      return _react2.default.createElement(
        'div',
        { className: 'react-pdf__message react-pdf__message--error' },
        this.props.error
      );
    }
  }, {
    key: 'renderLoader',
    value: function renderLoader() {
      return _react2.default.createElement(
        'div',
        { className: 'react-pdf__message react-pdf__message--loading' },
        this.props.loading
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _props = this.props,
          children = _props.children,
          renderMode = _props.renderMode;


      return [renderMode === 'svg' ? this.renderSVG() : this.renderCanvas(), children];
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var pageNumber = this.pageNumber;

      var pdf = this.getPdf();
      var className = this.props.className;
      var page = this.state.page;


      var content = void 0;
      if (!pageNumber) {
        content = this.renderNoData();
      } else if (pdf === null || page === null) {
        content = this.renderLoader();
      } else if (pdf === false || page === false) {
        content = this.renderError();
      } else {
        content = this.renderChildren();
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
          className: (0, _mergeClassNames2.default)('react-pdf__Page', className),
          ref: function ref(_ref2) {
            var inputRef = _this2.props.inputRef;

            if (inputRef) {
              inputRef(_ref2);
            }

            _this2.ref = _ref2;
          },
          style: { position: 'relative' },
          'data-page-number': pageNumber
        }, this.eventProps),
        content
      );
    }
  }, {
    key: 'pageIndex',
    get: function get() {
      return this.getPageIndex();
    }
  }, {
    key: 'pageNumber',
    get: function get() {
      return this.getPageNumber();
    }
  }, {
    key: 'rotate',
    get: function get() {
      if ((0, _utils.isProvided)(this.props.rotate)) {
        return this.props.rotate;
      }

      if ((0, _utils.isProvided)(this.context.rotate)) {
        return this.context.rotate;
      }

      var page = this.state.page;


      return page.rotate;
    }
  }, {
    key: 'scale',
    get: function get() {
      var _props2 = this.props,
          scale = _props2.scale,
          width = _props2.width;
      var page = this.state.page;
      var rotate = this.rotate;

      // Be default, we'll render page at 100% * scale width.

      var pageScale = 1;

      // If width is defined, calculate the scale of the page so it could be of desired width.
      if (width) {
        var viewport = page.getViewport(scale, rotate);
        pageScale = width / viewport.width;
      }

      return scale * pageScale;
    }
  }, {
    key: 'eventProps',
    get: function get() {
      var _this3 = this;

      return (0, _events.makeEventProps)(this.props, function () {
        var page = _this3.state.page;

        return (0, _utils.makePageCallback)(page, _this3.scale);
      });
    }
  }, {
    key: 'pageKey',
    get: function get() {
      return this.state.page.pageIndex + '@' + this.scale + '/' + this.rotate;
    }
  }, {
    key: 'pageKeyNoScale',
    get: function get() {
      return this.state.page.pageIndex + '/' + this.rotate;
    }
  }, {
    key: 'pageProps',
    get: function get() {
      return {
        page: this.state.page,
        rotate: this.rotate,
        scale: this.scale
      };
    }
  }]);
  return Page;
}(_react.Component);

exports.default = Page;


Page.defaultProps = {
  error: 'Failed to load the page.',
  loading: 'Loading page…',
  noData: 'No page specified.',
  renderAnnotations: true,
  renderMode: 'canvas',
  renderTextLayer: true,
  scale: 1.0
};

Page.childContextTypes = {
  customTextRenderer: _propTypes2.default.func,
  onGetTextError: _propTypes2.default.func,
  onGetTextSuccess: _propTypes2.default.func,
  onRenderError: _propTypes2.default.func,
  onRenderSuccess: _propTypes2.default.func,
  page: _propTypes3.isPage,
  pdf: _propTypes3.isPdf,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number
};

Page.contextTypes = {
  linkService: _propTypes3.isLinkService,
  pdf: _propTypes3.isPdf,
  registerPage: _propTypes2.default.func,
  rotate: _propTypes3.isRotate,
  unregisterPage: _propTypes2.default.func
};

Page.propTypes = (0, _extends3.default)({
  children: _propTypes2.default.node,
  className: _propTypes3.isClassName,
  customTextRenderer: _propTypes2.default.func,
  error: _propTypes2.default.string,
  inputRef: _propTypes2.default.func,
  loading: _propTypes2.default.string,
  noData: _propTypes2.default.node,
  onGetTextError: _propTypes2.default.func,
  onGetTextSuccess: _propTypes2.default.func,
  onLoadError: _propTypes2.default.func,
  onLoadSuccess: _propTypes2.default.func,
  onRenderError: _propTypes2.default.func,
  onRenderSuccess: _propTypes2.default.func,
  pageIndex: _propTypes3.isPageIndex,
  pageNumber: _propTypes3.isPageNumber,
  renderAnnotations: _propTypes2.default.bool,
  renderMode: _propTypes2.default.oneOf(['canvas', 'svg']),
  renderTextLayer: _propTypes2.default.bool,
  rotate: _propTypes3.isRotate,
  scale: _propTypes2.default.number,
  width: _propTypes2.default.number
}, (0, _propTypes3.eventsProps)());