"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/extends"), 
require("@babel/runtime/helpers/toConsumableArray");

var _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck")), _createClass = _interopDefault(require("@babel/runtime/helpers/createClass")), _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn")), _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf")), _assertThisInitialized = _interopDefault(require("@babel/runtime/helpers/assertThisInitialized")), _inherits = _interopDefault(require("@babel/runtime/helpers/inherits")), _defineProperty = _interopDefault(require("@babel/runtime/helpers/defineProperty")), React = require("react"), React__default = _interopDefault(React), memoizeOne = _interopDefault(require("memoize-one")), core = require("@emotion/core");

require("react-dom"), require("prop-types"), require("@babel/runtime/helpers/typeof"), 
require("raf"), require("./utils-0597d710.cjs.prod.js");

var index$1 = require("./index-103894a4.cjs.prod.js"), reactSelect = require("./Select-f92ffe4c.cjs.prod.js");

require("@emotion/css"), require("@babel/runtime/helpers/taggedTemplateLiteral"), 
require("react-input-autosize");

var stateManager = require("./stateManager-37bb71fd.cjs.prod.js"), createCache = _interopDefault(require("@emotion/cache")), NonceProvider = function(_Component) {
  function NonceProvider(props) {
    var _this;
    return _classCallCheck(this, NonceProvider), _this = _possibleConstructorReturn(this, _getPrototypeOf(NonceProvider).call(this, props)), 
    _defineProperty(_assertThisInitialized(_this), "createEmotionCache", function(nonce) {
      return createCache({
        nonce: nonce
      });
    }), _this.createEmotionCache = memoizeOne(_this.createEmotionCache), _this;
  }
  return _inherits(NonceProvider, _Component), _createClass(NonceProvider, [ {
    key: "render",
    value: function() {
      var emotionCache = this.createEmotionCache(this.props.nonce);
      return React__default.createElement(core.CacheProvider, {
        value: emotionCache
      }, this.props.children);
    }
  } ]), NonceProvider;
}(React.Component), index = stateManager.manageState(reactSelect.Select);

exports.components = index$1.components, exports.createFilter = reactSelect.createFilter, 
exports.defaultTheme = reactSelect.defaultTheme, exports.mergeStyles = reactSelect.mergeStyles, 
exports.NonceProvider = NonceProvider, exports.default = index;
