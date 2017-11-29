import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { COUNTRIES } from '../data/countries';

var AutoCompleteField = createClass({
	displayName: 'AutoCompleteField',
	propTypes: {
		label: PropTypes.string,
		autoComplete: PropTypes.string,
	},
	componentDidMount() {
		// reveal hidden input for testing
		document.querySelector('[autocomplete="country"]').classList.remove('Select-hidden');
	},
	getInitialState () {
		return {
			selectValue: '',
		};
	},
	updateValue (newValue) {
		this.setState({
			selectValue: newValue,
		});
	},
	handleAutoFill (e) {
		console.log(e);
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/AutoComplete.js">(Source)</a></h3>
				<input placeholder="email (for testing autoComplete)" type="email" autoComplete="email" />
				<Select
					id="country"
					ref="autoCompleteSelect"
					multi={false}
					autosize={false}
					options={COUNTRIES}
					simpleValue
					name="country"
					value={this.state.selectValue}
					onChange={this.updateValue}
					autoComplete={this.props.autoComplete}
					onAutoFill={this.handleAutoFill}
				/>
			</div>
		);
	}
});


module.exports = AutoCompleteField;
