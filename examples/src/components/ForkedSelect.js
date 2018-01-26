import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

/**
 * This example demonstrates the enhancements and new properties available within this forked
 * version of react-select. The specific properties are as follows:
 *
 * initInput - Input field is initialized with an initial value upon mount
 * tabSelectsInput - Tabbing out will select the current value in the input field.
 * enterSelectsInput - Hitting enter will select the current value in the input field.
 * selectChangesInput - Helps to keep the input field in sync with the selected value.
 * focusChangesInput - Helps to keep the input field in sync with the focused value.
 *
 */
var ForkedSelect = createClass({
	displayName: 'ForkedSelect',
	propTypes: {
		label: PropTypes.string
	},
	getInitialState () {
		return {
			options: [
				{ value: 'Red', label: 'Red' },
				{ value: 'Green', label: 'Green' },
				{ value: 'Blue', label: 'Blue' }
			],
			value: undefined
		};
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.debug('QSN componentWillReceiveProps: selectedValue: '+nextProps.value);
			this.lastFilter = nextProps.value;
		}
	},
	handleOnChange (value) {
		this.setState({ value });
	},
	debug(msg) {
		// console.log(msg);
	},
	onSelect(value) {
		this.debug(`onSelect: selectedValue: ${value} focus should be false`);
		this.lastFilter = value;
	},
	filterOptions(options, filterValue, excludeOptions, props) {
		this.debug(`filterOptions: options.length: ${options.length} filter: ${filterValue} first label: ${options.length > 0 ? options[0].label : ''}`);

		//filter value should always be the input field value
		if (!filterValue) {
			this.debug('...returning no options');
			return [];
		}

		let matchValue = filterValue;
		if (this.lastFilter && this.lastFilter.length < filterValue.length) {
			matchValue = this.lastFilter;
		}
		matchValue = matchValue.toLowerCase();

		this.lastFilter = matchValue;

		const result = options.filter((option) => {
			return option[props.valueKey].toLowerCase().substr(0, matchValue.length) === matchValue;
		});

		this.debug(`filterOptions: matchValue: ${matchValue} found ${result.length} matches`);
		return result;
	},
	isOptionUnique(ref) {
		const { option, options, labelKey, valueKey } = ref;
		if (!options || !options.length) {
			return true;
		}
		const result = options.filter(function (existingOption) {
				return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
			}).length === 0;
		this.debug(`isOptionUnique: value: ${option[valueKey]} label: ${option[labelKey]} result: ${result}`);
		return result;
	},
	render () {
		const { options, value } = this.state;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/Creatable.js">(Source)</a></h3>
				<Select.Creatable
					initInput={true}
					tabSelectsInput={true}
					enterSelectsInput={true}
					selectChangesInput={true}
					focusChangesInput={true}
					onSelectResetsInput={false}
					onBlurResetsInput={false}
					onCloseResetsInput={false}
					multi={false}
					options={options}
					onChange={this.handleOnChange}
					value={value}
					filterOptions={this.filterOptions}
					isOptionUnique={this.isOptionUnique}
					onSelect={this.onSelect}
					autosize={false}
				/>
			</div>
		);
	}
});

module.exports = ForkedSelect;
