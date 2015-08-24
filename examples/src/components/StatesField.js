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
	switchCountry (e) {
		var newCountry = e.target.value;
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
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select ref="stateSelect" options={ops} disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue} searchable={this.props.searchable} />
				
				<div style={{ marginTop: 14 }}>
					<button type="button" onClick={this.focusStateSelect}>Focus Select</button>
					<label className="checkbox" style={{ marginLeft: 10 }}>
						<input type="checkbox" className="checkbox-control" checked={this.state.disabled} onChange={this.toggleDisabled}/>
						<span className="checkbox-label">Disabled</span>
					</label>
				</div>
				<div className="checkbox-list">
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={this.state.country === 'AU'} value="AU" onChange={this.switchCountry}/>
						<span className="checkbox-label">Australia</span>
					</label>
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={this.state.country === 'US'} value="US" onChange={this.switchCountry}/>
						<span className="checkbox-label">United States</span>
					</label>
				</div>
			</div>
		);
	}
});


module.exports = StatesField;