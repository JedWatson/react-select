'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _stateManager = require('./stateManager');

var _stateManager2 = _interopRequireDefault(_stateManager);

var _Async = require('./Async');

var _Async2 = _interopRequireDefault(_Async);

var _AsyncCreatable = require('./AsyncCreatable');

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _Creatable = require('./Creatable');

var _Creatable2 = _interopRequireDefault(_Creatable);

var _filters = require('./filters');

var _index = require('./components/index');

var _styles = require('./styles');

var _theme = require('./theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = (0, _stateManager2.default)(_Select2.default); // This file exists as an entry point for bundling our umd builds.
// Both in rollup and in webpack, umd builds built from es6 modules are not
// compatible with mixed imports (which exist in index.js)
// This file does away with named imports in favor of a single export default.

Select.Async = _Async2.default;
Select.AsyncCreatable = _AsyncCreatable2.default;
Select.Creatable = _Creatable2.default;
Select.SelectBase = _Select2.default;
Select.createFilter = _filters.createFilter;
Select.components = _index.components;
Select.mergeStyles = _styles.mergeStyles;
Select.defaultTheme = _theme.defaultTheme;

exports.default = Select;