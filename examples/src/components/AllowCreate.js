import React from 'react';
import Select from 'react-select';

const FLAVOURS = [
	{ label: 'Chocolate', value: 42 },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

var AllowCreate = React.createClass({
	displayName: 'AllowCreate',

	propTypes: {
		allowCreate: React.PropTypes.bool,
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

	onLabelClick (data, event) {
		console.log(data, event);
	},

	handleSelectChange (value){
		this.setState({ value });
	},

	renderHint () {
		return (
			<div className="hint">Create options in tag mode</div>
		);
	},

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					allowCreate={this.props.allowCreate}
					value={this.state.value}
					multi
					placeholder="Select your favourite(s)"
					options={this.state.options}
					onChange={this.handleSelectChange}
					addItemOnKeyCode={188}
				/>

				{this.renderHint()}
			</div>
		);
	}
});

module.exports = AllowCreate;
