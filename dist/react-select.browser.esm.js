import '@babel/runtime/helpers/objectWithoutProperties';
import '@babel/runtime/helpers/extends';
import '@babel/runtime/helpers/slicedToArray';
import '@babel/runtime/helpers/toConsumableArray';
import '@babel/runtime/helpers/defineProperty';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/esm/getPrototypeOf';
import React, { Component } from 'react';
import memoizeOne from 'memoize-one';
import { CacheProvider } from '@emotion/core';
import 'react-dom';
import '@babel/runtime/helpers/typeof';
export { F as components } from './index-64187825.browser.esm.js';
import { S as Select } from './Select-c6f30849.browser.esm.js';
export { c as createFilter, a as defaultTheme, m as mergeStyles } from './Select-c6f30849.browser.esm.js';
import '@emotion/css';
import '@babel/runtime/helpers/taggedTemplateLiteral';
import 'react-input-autosize';
import { m as manageState } from './stateManager-2f2b6f5b.browser.esm.js';
import createCache from '@emotion/cache';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var NonceProvider = /*#__PURE__*/function (_Component) {
  _inherits(NonceProvider, _Component);

  var _super = _createSuper(NonceProvider);

  function NonceProvider(props) {
    var _this;

    _classCallCheck(this, NonceProvider);

    _this = _super.call(this, props);

    _this.createEmotionCache = function (nonce) {
      return createCache({
        nonce: nonce
      });
    };

    _this.createEmotionCache = memoizeOne(_this.createEmotionCache);
    return _this;
  }

  _createClass(NonceProvider, [{
    key: "render",
    value: function render() {
      var emotionCache = this.createEmotionCache(this.props.nonce);
      return /*#__PURE__*/React.createElement(CacheProvider, {
        value: emotionCache
      }, this.props.children);
    }
  }]);

  return NonceProvider;
}(Component);

var index = manageState(Select);

export default index;
export { NonceProvider };
