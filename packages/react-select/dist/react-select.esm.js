import '@babel/runtime/helpers/esm/objectWithoutProperties';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/toConsumableArray';
import '@babel/runtime/helpers/esm/objectSpread';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/esm/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import React, { Component } from 'react';
import memoizeOne from 'memoize-one';
import { CacheProvider } from '@emotion/core';
import 'react-dom';
import 'prop-types';
import '@babel/runtime/helpers/esm/typeof';
import 'raf';
import './chunk-e8ae4b0f.esm.js';
export { y as components } from './chunk-ca26b926.esm.js';
import { S as Select } from './base/dist/react-select-3e2680bf.esm.js';
export { c as createFilter, a as defaultTheme, m as mergeStyles } from './base/dist/react-select-3e2680bf.esm.js';
import '@emotion/css';
import '@babel/runtime/helpers/esm/taggedTemplateLiteral';
import 'react-input-autosize';
import { m as manageState } from './chunk-b36baf1a.esm.js';
import createCache from '@emotion/cache';

var NonceProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(NonceProvider, _Component);

  function NonceProvider(props) {
    var _this;

    _classCallCheck(this, NonceProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NonceProvider).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createEmotionCache", function (nonce) {
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
