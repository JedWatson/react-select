import React from 'react';
import Select from 'react-select';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

var DropdownCheckbox = React.createClass({
	displayName: 'DropdownCheckbox',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			options: FLAVOURS,
			value: [],
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	renderOption (option) {
		const { value } = this.state;
		const isSelected = value.indexOf(option.value) > -1;

		return (
			<div>
				<input type="checkbox" checked={isSelected} readOnly />
				{option.label}
			</div>
		);
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue value={this.state.value} placeholder="Select your favourite(s)" options={this.state.options} onChange={this.handleSelectChange} filterOptionsMulti={false} optionRenderer={this.renderOption} />

			</div>
		);
	}
});

module.exports = DropdownCheckbox;
