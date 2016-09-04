'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _utilsDefaultFilterOptions = require('./utils/defaultFilterOptions');

var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

var _utilsDefaultMenuRenderer = require('./utils/defaultMenuRenderer');

var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

var Creatable = _react2['default'].createClass({
	displayName: 'CreatableSelect',

	propTypes: {
		// See Select.propTypes.filterOptions
		filterOptions: _react2['default'].PropTypes.any,

		// Searches for any matching option within the set of options.
		// This function prevents duplicate options from being created.
		// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
		isOptionUnique: _react2['default'].PropTypes.func,

		// Determines if the current input text represents a valid option.
		// ({ label: string }): boolean
		isValidNewOption: _react2['default'].PropTypes.func,

		// See Select.propTypes.menuRenderer
		menuRenderer: _react2['default'].PropTypes.any,

		// Factory to create new option.
		// ({ label: string, labelKey: string, valueKey: string }): Object
		newOptionCreator: _react2['default'].PropTypes.func,

		// Creates prompt/placeholder option text.
		// (filterText: string): string
		promptTextCreator: _react2['default'].PropTypes.func,

		// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
		shouldKeyDownEventCreateNewOption: _react2['default'].PropTypes.func
	},

	// Default prop methods
	statics: {
		isOptionUnique: isOptionUnique,
		isValidNewOption: isValidNewOption,
		newOptionCreator: newOptionCreator,
		promptTextCreator: promptTextCreator,
		shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
	},

	getDefaultProps: function getDefaultProps() {
		return {
			filterOptions: _utilsDefaultFilterOptions2['default'],
			isOptionUnique: isOptionUnique,
			isValidNewOption: isValidNewOption,
			menuRenderer: _utilsDefaultMenuRenderer2['default'],
			newOptionCreator: newOptionCreator,
			promptTextCreator: promptTextCreator,
			shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
		};
	},

	createNewOption: function createNewOption() {
		var _props = this.props;
		var isValidNewOption = _props.isValidNewOption;
		var newOptionCreator = _props.newOptionCreator;
		var shouldKeyDownEventCreateNewOption = _props.shouldKeyDownEventCreateNewOption;
		var _select$props = this.select.props;
		var labelKey = _select$props.labelKey;
		var options = _select$props.options;
		var valueKey = _select$props.valueKey;

		var inputValue = this.select.getInputValue();

		if (isValidNewOption({ label: inputValue })) {
			var option = newOptionCreator({ label: inputValue, labelKey: labelKey, valueKey: valueKey });
			var _isOptionUnique = this.isOptionUnique({ option: option });

			// Don't add the same option twice.
			if (_isOptionUnique) {
				options.unshift(option);

				this.select.selectValue(option);
			}
		}
	},

	filterOptions: function filterOptions() {
		var _props2 = this.props;
		var filterOptions = _props2.filterOptions;
		var isValidNewOption = _props2.isValidNewOption;
		var promptTextCreator = _props2.promptTextCreator;

		var filteredOptions = filterOptions.apply(undefined, arguments);

		var inputValue = this.select ? this.select.getInputValue() : '';

		if (isValidNewOption({ label: inputValue })) {
			var _newOptionCreator = this.props.newOptionCreator;
			var _select$props2 = this.select.props;
			var labelKey = _select$props2.labelKey;
			var options = _select$props2.options;
			var valueKey = _select$props2.valueKey;

			var option = _newOptionCreator({ label: inputValue, labelKey: labelKey, valueKey: valueKey });

			// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
			// For multi-selects, this would remove it from the filtered list.
			var _isOptionUnique2 = this.isOptionUnique({ option: option, options: options });

			if (_isOptionUnique2) {
				var _prompt = promptTextCreator(inputValue);

				this._createPlaceholderOption = _newOptionCreator({ label: _prompt, labelKey: labelKey, valueKey: valueKey });

				filteredOptions.unshift(this._createPlaceholderOption);
			}
		}

		return filteredOptions;
	},

	isOptionUnique: function isOptionUnique(_ref) {
		var option = _ref.option;
		var options = _ref.options;

		if (!this.select) {
			return false;
		}

		var isOptionUnique = this.props.isOptionUnique;
		var _select$props3 = this.select.props;
		var labelKey = _select$props3.labelKey;
		var valueKey = _select$props3.valueKey;

		options = options || this.select.filterOptions();

		return isOptionUnique({
			labelKey: labelKey,
			option: option,
			options: options,
			valueKey: valueKey
		});
	},

	menuRenderer: function menuRenderer(params) {
		var menuRenderer = this.props.menuRenderer;

		return menuRenderer(_extends({}, params, {
			onSelect: this.onOptionSelect
		}));
	},

	onInputKeyDown: function onInputKeyDown(event) {
		var shouldKeyDownEventCreateNewOption = this.props.shouldKeyDownEventCreateNewOption;

		var focusedOption = this.select.getFocusedOption();

		if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
			this.createNewOption();

			// Prevent decorated Select from doing anything additional with this keyDown event
			event.preventDefault();
		}
	},

	onOptionSelect: function onOptionSelect(option, event) {
		if (option === this._createPlaceholderOption) {
			this.createNewOption();
		} else {
			this.select.selectValue(option);
		}
	},

	render: function render() {
		var _this = this;

		var _props3 = this.props;
		var newOptionCreator = _props3.newOptionCreator;
		var shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption;

		var restProps = _objectWithoutProperties(_props3, ['newOptionCreator', 'shouldKeyDownEventCreateNewOption']);

		return _react2['default'].createElement(_Select2['default'], _extends({}, restProps, {
			allowCreate: true,
			filterOptions: this.filterOptions,
			menuRenderer: this.menuRenderer,
			onInputKeyDown: this.onInputKeyDown,
			ref: function (ref) {
				return _this.select = ref;
			}
		}));
	}
});

function isOptionUnique(_ref2) {
	var option = _ref2.option;
	var options = _ref2.options;
	var labelKey = _ref2.labelKey;
	var valueKey = _ref2.valueKey;

	return options.filter(function (existingOption) {
		return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
	}).length === 0;
};

function isValidNewOption(_ref3) {
	var label = _ref3.label;

	return !!label;
};

function newOptionCreator(_ref4) {
	var label = _ref4.label;
	var labelKey = _ref4.labelKey;
	var valueKey = _ref4.valueKey;

	var option = {};
	option[valueKey] = label;
	option[labelKey] = label;
	option.className = 'Select-create-option-placeholder';
	return option;
};

function promptTextCreator(label) {
	return 'Create option "' + label + '"';
}

function shouldKeyDownEventCreateNewOption(_ref5) {
	var keyCode = _ref5.keyCode;

	switch (keyCode) {
		case 9: // TAB
		case 13: // ENTER
		case 188:
			// COMMA
			return true;
	}

	return false;
};

module.exports = Creatable;