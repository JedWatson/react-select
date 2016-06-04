import React from 'react';
import Select from 'react-select';

const FLAVOURS = [
	{ sort: 1, label: 'Chocolate', value: 'chocolate' },
	{ sort: 2, label: 'Vanilla', value: 'vanilla' },
	{ sort: 3, label: 'Strawberry', value: 'strawberry' },
	{ sort: 4, label: 'Caramel', value: 'caramel' },
	{ sort: 5, label: 'Cookies and Cream', value: 'cookiescream' },
	{ sort: 6, label: 'Peppermint', value: 'peppermint' },
];

const WHY_WOULD_YOU = [
	{ sort: 1, label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

var MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			options: FLAVOURS,
			value: [],
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleDisabled (e) {
		this.setState({ disabled: e.target.checked });
	},
	toggleChocolate (e) {
		let crazy = e.target.checked;
		this.setState({
			crazy: crazy,
			options: crazy ? WHY_WOULD_YOU : FLAVOURS,
		});
	},

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue dragToReorder={true} disabled={this.state.disabled} value={this.state.value} placeholder="Select your favourite(s)" options={this.state.options} onChange={this.handleSelectChange} />

				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.disabled} onChange={this.toggleDisabled} />
						<span className="checkbox-label">Disable the control</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.crazy} onChange={this.toggleChocolate} />
						<span className="checkbox-label">I don't like Chocolate (disabled the option)</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = MultiSelectField;
