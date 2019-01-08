'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Async = require('./Async');

var _Creatable = require('./Creatable');

var _stateManager = require('./stateManager');

var _stateManager2 = _interopRequireDefault(_stateManager);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _Async.makeAsyncSelect)((0, _stateManager2.default)((0, _Creatable.makeCreatableSelect)(_Select2.default)));