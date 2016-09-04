import React from 'react';
import Select from './Select';
import defaultFilterOptions from './utils/defaultFilterOptions';
import defaultMenuRenderer from './utils/defaultMenuRenderer';

const Creatable = React.createClass({
	displayName: 'CreatableSelect',

	propTypes: {
		// See Select.propTypes.filterOptions
		filterOptions: React.PropTypes.any,

		// Searches for any matching option within the set of options.
		// This function prevents duplicate options from being created.
		// (newOption: Object, options: Array, labelKey: string, valueKey: string): boolean
		isOptionUnique: React.PropTypes.func,

    // Determines if the current input text represents a valid option.
    // (label: string): boolean
    isValidNewOption: React.PropTypes.func,

		// See Select.propTypes.menuRenderer
		menuRenderer: React.PropTypes.any,

    // Factory to create new option.
    // (label: string, labelKey: string, valueKey: string): Object
		newOptionCreator: React.PropTypes.func,

    // Creates prompt/placeholder option text.
    // (filterText: string): string
		promptTextCreator: React.PropTypes.func,

		// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
		shouldKeyDownEventCreateNewOption: React.PropTypes.func,
	},

	// Default prop methods
	statics: {
		isOptionUnique,
		isValidNewOption,
		newOptionCreator,
		promptTextCreator,
		shouldKeyDownEventCreateNewOption
	},

	getDefaultProps () {
		return {
			filterOptions: defaultFilterOptions,
			isOptionUnique,
			isValidNewOption,
			menuRenderer: defaultMenuRenderer,
			newOptionCreator,
			promptTextCreator,
			shouldKeyDownEventCreateNewOption,
		};
	},

	createNewOption () {
		const { isValidNewOption, newOptionCreator, shouldKeyDownEventCreateNewOption } = this.props;
		const { labelKey, options, valueKey } = this.select.props;

		const inputValue = this.select.getInputValue();

		if (isValidNewOption(inputValue)) {
			const newOption = newOptionCreator(inputValue, labelKey, valueKey);
			const isOptionUnique = this.isOptionUnique({ newOption });

			// Don't add the same option twice.
			if (isOptionUnique) {
				options.unshift(newOption);

				this.select.selectValue(newOption);
			}
		}
	},

	filterOptions (...params) {
		const { filterOptions, isValidNewOption, promptTextCreator } = this.props;

		const filteredOptions = filterOptions(...params);

		const inputValue = this.select
			? this.select.getInputValue()
			: '';

		if (isValidNewOption(inputValue)) {
			const { newOptionCreator } = this.props;
			const { labelKey, options, valueKey } = this.select.props;

			const newOption = newOptionCreator(inputValue, labelKey, valueKey);

			// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
			// For multi-selects, this would remove it from the filtered list.
			const isOptionUnique = this.isOptionUnique({
				newOption,
				options
			});

			if (isOptionUnique) {
				const prompt = promptTextCreator(inputValue);

				this._createPlaceholderOption = newOptionCreator(prompt, labelKey, valueKey);

				filteredOptions.unshift(this._createPlaceholderOption);
			}
		}

		return filteredOptions;
	},

	isOptionUnique ({
		newOption,
		options
	}) {
		if (!this.select) {
			return false;
		}

		const { isOptionUnique } = this.props;
		const { labelKey, valueKey } = this.select.props;

		options = options || this.select.filterOptions();

		return isOptionUnique(newOption, options, labelKey, valueKey);
	},

	menuRenderer (params) {
		const { menuRenderer } = this.props;

		return menuRenderer({
			...params,
			onSelect: this.onOptionSelect
		});
	},

	onInputKeyDown (event) {
		const { shouldKeyDownEventCreateNewOption } = this.props;
		const focusedOption = this.select.getFocusedOption();

		if (
			focusedOption &&
			focusedOption === this._createPlaceholderOption &&
			shouldKeyDownEventCreateNewOption(event.keyCode)
		) {
			this.createNewOption();

			// Prevent decorated Select from doing anything additional with this keyDown event
			event.preventDefault();
		}
	},

	onOptionSelect (option, event) {
		if (option === this._createPlaceholderOption) {
			this.createNewOption();
		} else {
			this.select.selectValue(option);
		}
	},

	render () {
		const { newOptionCreator, shouldKeyDownEventCreateNewOption, ...restProps } = this.props;

		return (
			<Select
				{...restProps}
				allowCreate
				filterOptions={this.filterOptions}
				menuRenderer={this.menuRenderer}
				onInputKeyDown={this.onInputKeyDown}
				ref={(ref) => this.select = ref}
			/>
		);
	}
});

function isOptionUnique (newOption, options, labelKey, valueKey) {
	return options
		.filter((option) =>
			option[labelKey] === newOption[labelKey] ||
			option[valueKey] === newOption[valueKey]
		)
		.length === 0;
};

function isValidNewOption (label) {
	return !!label;
};

function newOptionCreator (label, labelKey, valueKey) {
	const option = {};
	option[valueKey] = label;
 	option[labelKey] = label;
 	option.className = 'Select-create-option-placeholder';
 	return option;
};

function promptTextCreator (label) {
	return `Create option "${label}"`;
}

function shouldKeyDownEventCreateNewOption (keyCode, label) {
	switch (keyCode) {
		case 9:   // TAB
		case 13:  // ENTER
		case 188: // COMMA
			return true;
	}

	return false;
};

module.exports = Creatable;
