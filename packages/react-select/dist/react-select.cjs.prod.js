"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/extends"), 
require("@babel/runtime/helpers/toConsumableArray"), require("@babel/runtime/helpers/objectSpread");

var _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck")), _createClass = _interopDefault(require("@babel/runtime/helpers/createClass")), _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn")), _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf")), _inherits = _interopDefault(require("@babel/runtime/helpers/inherits")), _assertThisInitialized = _interopDefault(require("@babel/runtime/helpers/assertThisInitialized")), _defineProperty = _interopDefault(require("@babel/runtime/helpers/defineProperty")), React = require("react"), React__default = _interopDefault(React), memoizeOne = _interopDefault(require("memoize-one")), core = require("@emotion/core");

require("react-dom"), require("prop-types"), require("@babel/runtime/helpers/typeof"), 
require("raf"), require("./chunk-c9662232.cjs.prod.js");

var __chunk_2 = require("./chunk-5b70513c.cjs.prod.js"), reactSelect = require("./base/dist/react-select-20b69c9f.cjs.prod.js");

require("@emotion/css"), require("@babel/runtime/helpers/taggedTemplateLiteral"), 
require("react-input-autosize");

var __chunk_3 = require("./chunk-185dfbdc.cjs.prod.js"), createCache = _interopDefault(require("@emotion/cache")), NonceProvider = function(_Component) {
  function NonceProvider(props) {
    var _this;
    return _classCallCheck(this, NonceProvider), _this = _possibleConstructorReturn(this, _getPrototypeOf(NonceProvider).call(this, props)), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createEmotionCache", function(nonce) {
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
}(React.Component), index = __chunk_3.manageState(reactSelect.Select);

exports.components = __chunk_2.components, exports.createFilter = reactSelect.createFilter, 
exports.defaultTheme = reactSelect.defaultTheme, exports.mergeStyles = reactSelect.mergeStyles, 
exports.NonceProvider = NonceProvider, exports.default = index;
