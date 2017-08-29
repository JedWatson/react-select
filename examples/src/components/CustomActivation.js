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

var CustomActivation = React.createClass({
	displayName: 'CustomActivation',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			isOpen: null,
		};
	},
	handleMouseLeave() {
		this.setState({ isOpen: false });
	},
	handleClose() {
		this.setState({ isOpen: null });
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<div
					onMouseLeave={this.handleMouseLeave}
				>
					<Select
						multi
						simpleValue
						disabled={this.state.disabled}
						value={this.state.value}
						placeholder="Select your favourite(s)"
						options={FLAVOURS}
						onChange={this.handleSelectChange}
						isOpen={this.state.isOpen}
						onClose={this.handleClose}
					/>
				</div>
				<div className="hint">
					This example uses the isOpen prop to handle closing the dropdown content on a mouse leave. It's possible to use this prop in any other way, this is just one example.
				</div>
			</div>
		);
	}
});

module.exports = CustomActivation;
