import '@babel/runtime/helpers/esm/objectWithoutProperties';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/toConsumableArray';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/esm/getPrototypeOf';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import React, { Component } from 'react';
import memoizeOne from 'memoize-one';
import { CacheProvider } from '@emotion/core';
import 'react-dom';
import 'prop-types';
import '@babel/runtime/helpers/esm/typeof';
import 'raf';
import './utils-168d9ce8.esm.js';
export { y as components } from './index-376c2573.esm.js';
import { S as Select } from './Select-614da515.esm.js';
export { c as createFilter, a as defaultTheme, m as mergeStyles } from './Select-614da515.esm.js';
import '@emotion/css';
import '@babel/runtime/helpers/esm/taggedTemplateLiteral';
import 'react-input-autosize';
import { m as manageState } from './stateManager-c18cdf75.esm.js';
import createCache from '@emotion/cache';

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
      return React.createElement(CacheProvider, {
        value: emotionCache
      }, this.props.children);
    }
  }]);

  return NonceProvider;
}(Component);

var index = manageState(Select);

export default index;
export { NonceProvider };
