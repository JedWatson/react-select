'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('@babel/runtime/helpers/objectWithoutProperties');
require('@babel/runtime/helpers/extends');
require('@babel/runtime/helpers/slicedToArray');
require('@babel/runtime/helpers/toConsumableArray');
require('@babel/runtime/helpers/defineProperty');
require('@babel/runtime/helpers/classCallCheck');
require('@babel/runtime/helpers/createClass');
require('@babel/runtime/helpers/assertThisInitialized');
require('@babel/runtime/helpers/inherits');
require('@babel/runtime/helpers/possibleConstructorReturn');
require('@babel/runtime/helpers/getPrototypeOf');
require('react');
require('memoize-one');
require('@emotion/core');
require('react-dom');
require('@babel/runtime/helpers/typeof');
require('../../dist/index-77464eac.cjs.dev.js');
var reactSelect = require('../../dist/Select-3b5ecf67.cjs.dev.js');
require('@emotion/css');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('react-input-autosize');
var stateManager = require('../../dist/stateManager-71df4ad8.cjs.dev.js');
var reactSelect$1 = require('../../async/dist/react-select.cjs.dev.js');
var reactSelect$2 = require('../../creatable/dist/react-select.cjs.dev.js');

var SelectCreatable = reactSelect$2.makeCreatableSelect(reactSelect.Select);
var SelectCreatableState = stateManager.manageState(SelectCreatable);
var AsyncCreatable = reactSelect$1.makeAsyncSelect(SelectCreatableState);

exports.default = AsyncCreatable;
