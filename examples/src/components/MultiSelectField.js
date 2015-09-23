import React from 'react';
import Select from 'react-select';

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			disabled: false,
			categorized: false,
			value: []
		};
	},
	handleSelectChange (value, values) {
		logChange('New value:', value, 'Values:', values);
		this.setState({ value: value });
	},
	toggleDisabled (e) {
		this.setState({ 'disabled': e.target.checked });
	},
	toggleCategorized (e) {
		this.setState({ 'categorized': e.target.checked });
	},
	render () {
		var ops = [
			{ label: 'Chocolate', value: 'chocolate' },
			{ label: 'Vanilla', value: 'vanilla' },
			{ label: 'Strawberry', value: 'strawberry' },
			{ label: 'Caramel', value: 'caramel' },
			{ label: 'Cookies and Cream', value: 'cookiescream' },
			{ label: 'Peppermint', value: 'peppermint' }
		];

		if (this.state.categorized) {
			ops = {
				basic: [
					{ label: 'Chocolate', value: 'chocolate' },
					{ label: 'Vanilla', value: 'vanilla' },
					{ label: 'Strawberry', value: 'strawberry' }
				],
				specialty: [
					{ label: 'Caramel', value: 'caramel' },
					{ label: 'Cookies and Cream', value: 'cookiescream' },
					{ label: 'Peppermint', value: 'peppermint' }
				]
			};
		}

		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi categorized={this.state.categorized} disabled={this.state.disabled} value={this.state.value} placeholder="Select your favourite(s)" options={ops} onChange={this.handleSelectChange} />

				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.disabled} onChange={this.toggleDisabled} />
						<span className="checkbox-label">Disabled</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbonx-control" checked={this.state.categorized} onChange={this.toggleCategorized} />
						<span className="checkbox-label">Categorized</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = MultiSelectField;
