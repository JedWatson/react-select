import React from 'react';
import Select from 'react-select';

const CONTRIBUTORS = require('../data/contributors');
const MAX_CONTRIBUTORS = 6;
const ASYNC_DELAY = 500;

const Contributors = React.createClass({
	displayName: 'Contributors',
	propTypes: {
		hint: React.PropTypes.string,
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			value: 'jedwatson',
		};
	},
	onChange (value) {
		this.setState({
			value: value
		});
	},
	getContributors (input, callback) {
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(i => {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS,
		};
		setTimeout(function() {
			callback(null, data);
		}, ASYNC_DELAY);
	},
	gotoContributor (value, event) {
		window.open('https://github.com/' + value.github);
	},
	renderHint () {
		if (!this.props.hint) return null;
		return (
			<div className="hint">{this.props.hint}</div>
		);
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select.Async multi value={this.state.value} onChange={this.onChange} onValueClick={this.gotoContributor} valueKey="github" labelKey="name" loadOptions={this.getContributors} />
				{this.renderHint()}
			</div>
		);
	}
});

module.exports = Contributors;
