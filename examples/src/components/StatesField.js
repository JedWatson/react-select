import React from 'react';
import Select from 'react-select';

import CountrySelect from '../components/CountrySelect';
const STATES = require('../data/states');
var id = 0;

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var StatesField = React.createClass({
	displayName: 'StatesField',
	propTypes: {
		label: React.PropTypes.string,
		searchable: React.PropTypes.bool,
	},
	getDefaultProps () {
		return {
			label: 'States:',
			searchable: true,
		};
	},
	getInitialState () {
		return {
			country: 'AU',
			disabled: false,
			id: ++id,
			selectValue: 'new-south-wales'
		};
	},
	switchCountry (newCountry) {
		console.log('Country changed to ' + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null
		});
	},
	updateValue (newValue) {
		logChange('State changed to ' + newValue);
		this.setState({
			selectValue: newValue || null
		});
	},
	focusStateSelect () {
		this.refs.stateSelect.focus();
	},
	toggleDisabled (e) {
		this.setState({ disabled: e.target.checked });
	},
	render () {
		var ops = STATES[this.state.country];
		return (
			<div>
				<label className="section-label" className="section-label" className="section-label">{this.props.label}</label>
				<Select ref="stateSelect" options={ops} disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue} searchable={this.props.searchable} />
				<div className="switcher">
					Country:
					<CountrySelect value="AU" selected={this.state.country} onSelect={this.switchCountry}>Australia</CountrySelect>
					<CountrySelect value="US" selected={this.state.country} onSelect={this.switchCountry}>US</CountrySelect>
					&nbsp; <button type="button" onClick={this.focusStateSelect}>Focus Select</button>
					&nbsp; <input type="checkbox" checked={this.state.disabled} id={'disable-states-' + this.state.id} onChange={this.toggleDisabled}/>
					<label htmlFor={'disable-states-' + this.state.id}>Disable</label>
				</div>
			</div>
		);
	}
});


module.exports = StatesField;