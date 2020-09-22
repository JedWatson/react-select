"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/extends"), 
require("@babel/runtime/helpers/slicedToArray"), require("@babel/runtime/helpers/toConsumableArray"), 
require("@babel/runtime/helpers/defineProperty");

var _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck")), _createClass = _interopDefault(require("@babel/runtime/helpers/createClass"));

require("@babel/runtime/helpers/assertThisInitialized");

var _inherits = _interopDefault(require("@babel/runtime/helpers/inherits")), _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn")), _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf")), React = require("react"), React__default = _interopDefault(React), memoizeOne = _interopDefault(require("memoize-one")), core = require("@emotion/core");

require("react-dom"), require("@babel/runtime/helpers/typeof");

var index$1 = require("./index-4b3e5ea6.cjs.prod.js"), reactSelect = require("./Select-6fdb1c7d.cjs.prod.js");

require("@emotion/css"), require("@babel/runtime/helpers/taggedTemplateLiteral"), 
require("react-input-autosize");

var stateManager = require("./stateManager-55f1941f.cjs.prod.js"), createCache = _interopDefault(require("@emotion/cache"));

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function() {
    var result, Super = _getPrototypeOf(Derived);
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else result = Super.apply(this, arguments);
    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), 
    !0;
  } catch (e) {
    return !1;
  }
}

var NonceProvider = function(_Component) {
  _inherits(NonceProvider, _Component);
  var _super = _createSuper(NonceProvider);
  function NonceProvider(props) {
    var _this;
    return _classCallCheck(this, NonceProvider), (_this = _super.call(this, props)).createEmotionCache = function(nonce) {
      return createCache({
        nonce: nonce
      });
    }, _this.createEmotionCache = memoizeOne(_this.createEmotionCache), _this;
  }
  return _createClass(NonceProvider, [ {
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
