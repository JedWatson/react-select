'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueContainer = exports.SingleValue = exports.Placeholder = exports.MultiValue = exports.Input = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _memoizeOne = require('memoize-one');

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _reactFastCompare = require('../internal/react-fast-compare');

var _reactFastCompare2 = _interopRequireDefault(_reactFastCompare);

var _index = require('../components/index');

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _MultiValue = require('./MultiValue');

var _MultiValue2 = _interopRequireDefault(_MultiValue);

var _Placeholder = require('./Placeholder');

var _Placeholder2 = _interopRequireDefault(_Placeholder);

var _SingleValue = require('./SingleValue');

var _SingleValue2 = _interopRequireDefault(_SingleValue);

var _ValueContainer = require('./ValueContainer');

var _ValueContainer2 = _interopRequireDefault(_ValueContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var makeAnimated = function makeAnimated(externalComponents) {
  var components = (0, _index.defaultComponents)({ components: externalComponents });

  var Input = components.Input,
      MultiValue = components.MultiValue,
      Placeholder = components.Placeholder,
      SingleValue = components.SingleValue,
      ValueContainer = components.ValueContainer,
      rest = _objectWithoutProperties(components, ['Input', 'MultiValue', 'Placeholder', 'SingleValue', 'ValueContainer']);

  return _extends({
    Input: (0, _Input2.default)(Input),
    MultiValue: (0, _MultiValue2.default)(MultiValue),
    Placeholder: (0, _Placeholder2.default)(Placeholder),
    SingleValue: (0, _SingleValue2.default)(SingleValue),
    ValueContainer: (0, _ValueContainer2.default)(ValueContainer)
  }, rest);
};

var AnimatedComponents = makeAnimated();

var Input = exports.Input = AnimatedComponents.Input;
var MultiValue = exports.MultiValue = AnimatedComponents.MultiValue;
var Placeholder = exports.Placeholder = AnimatedComponents.Placeholder;
var SingleValue = exports.SingleValue = AnimatedComponents.SingleValue;
var ValueContainer = exports.ValueContainer = AnimatedComponents.ValueContainer;

exports.default = (0, _memoizeOne2.default)(makeAnimated, _reactFastCompare2.default);