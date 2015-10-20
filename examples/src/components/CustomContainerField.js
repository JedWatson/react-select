import React from 'react';
import Select from 'react-select';

const STATES = require('../data/states');

const StatesField = React.createClass({
	displayName: 'StatesField',
	propTypes: {
		label: React.PropTypes.string,
		searchable: React.PropTypes.bool,
	},
	getDefaultProps () {
		return {
			label: 'States:'
		};
	},
	getInitialState () {
		return {
      selectValue: 'new-south-wales'
    };
	},
	updateValue (newValue) {
		this.setState({
			selectValue: newValue || null
		});
	},
	render () {
		const ops = STATES['AU'];
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
        <div className="scrollable-container">
				    <Select ref="select"
              options={ops}
              value={this.state.selectValue}
              onChange={this.updateValue}
              menuContainer={document.body} />

            <p className="hint">Hidden overflow<br/>▼<br/>▼<br/>▼<br/>▼</p>
        </div>
      </div>
		);
	}
});


module.exports = StatesField;
