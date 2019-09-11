'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

require("@babel/runtime/helpers/objectWithoutProperties");

require("@babel/runtime/helpers/extends");

require("@babel/runtime/helpers/toConsumableArray");

var _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass = _interopDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized = _interopDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits = _interopDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty = _interopDefault(require("@babel/runtime/helpers/defineProperty"));

var React = require('react');

var React__default = _interopDefault(React);

var memoizeOne = _interopDefault(require('memoize-one'));

var core = require('@emotion/core');

require('react-dom');

require('prop-types');

require("@babel/runtime/helpers/typeof");

require('raf');

require('./utils-0fcf9684.browser.cjs.js');

var index$1 = require('./index-73a4f0e5.browser.cjs.js');

var reactSelect = require('./Select-5f7738bf.browser.cjs.js');

require('@emotion/css');

require("@babel/runtime/helpers/taggedTemplateLiteral");

require('react-input-autosize');

var stateManager = require('./stateManager-481a69b2.browser.cjs.js');

var createCache = _interopDefault(require('@emotion/cache'));

var NonceProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(NonceProvider, _Component);

  function NonceProvider(props) {
    var _this;

    _classCallCheck(this, NonceProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NonceProvider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "createEmotionCache", function (nonce) {
      return createCache({
        nonce: nonce
      });
    });

    _this.createEmotionCache = memoizeOne(_this.createEmotionCache);
    return _this;
  }

  _createClass(NonceProvider, [{
    key: "render",
    value: function render() {
      var emotionCache = this.createEmotionCache(this.props.nonce);
      return React__default.createElement(core.CacheProvider, {
        value: emotionCache
      }, this.props.children);
    }
  }]);

  return NonceProvider;
}(React.Component);

var index = stateManager.manageState(reactSelect.Select);
exports.components = index$1.components;
exports.createFilter = reactSelect.createFilter;
exports.defaultTheme = reactSelect.defaultTheme;
exports.mergeStyles = reactSelect.mergeStyles;
exports.NonceProvider = NonceProvider;
exports.default = index;
