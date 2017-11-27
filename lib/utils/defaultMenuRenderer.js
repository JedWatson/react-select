'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption,
	    focusOption = _ref.focusOption,
	    inputValue = _ref.inputValue,
	    instancePrefix = _ref.instancePrefix,
	    labelKey = _ref.labelKey,
	    onFocus = _ref.onFocus,
	    onOptionRef = _ref.onOptionRef,
	    onSelect = _ref.onSelect,
	    optionClassName = _ref.optionClassName,
	    optionComponent = _ref.optionComponent,
	    optionRenderer = _ref.optionRenderer,
	    options = _ref.options,
	    removeValue = _ref.removeValue,
	    selectValue = _ref.selectValue,
	    valueArray = _ref.valueArray,
	    valueKey = _ref.valueKey;

	var Option = optionComponent;

	return options.map(function (option, i) {
		var isSelected = valueArray && valueArray.some(function (x) {
			return x[valueKey] == option[valueKey];
		});
		var isFocused = option === focusedOption;
		var optionClass = (0, _classnames2.default)(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});

		return _react2.default.createElement(
			Option,
			{
				className: optionClass,
				focusOption: focusOption,
				inputValue: inputValue,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				option: option,
				optionIndex: i,
				ref: function ref(_ref2) {
					onOptionRef(_ref2, isFocused);
				},
				removeValue: removeValue,
				selectValue: selectValue
			},
			optionRenderer(option, i, inputValue)
		);
	});
}

exports.default = menuRenderer;