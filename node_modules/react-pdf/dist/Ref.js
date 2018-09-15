"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ref = function () {
  function Ref(_ref) {
    var num = _ref.num,
        gen = _ref.gen;
    (0, _classCallCheck3.default)(this, Ref);

    this.num = num;
    this.gen = gen;
  }

  (0, _createClass3.default)(Ref, [{
    key: "toString",
    value: function toString() {
      var str = this.num + "R";
      if (this.gen !== 0) {
        str += this.gen;
      }
      return str;
    }
  }]);
  return Ref;
}();

exports.default = Ref;