import React from 'react';
import Select from 'react-select';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
	{ label: 'Almendra', value: 'almendra' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Cereza', value: 'cereza' },
	{ label: 'Coco', value: 'coco' },
	{ label: 'Dolcatta', value: 'dolcatta' },
];

var MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			selectAll: true,
			options: FLAVOURS,
			value: [],
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleSelectAll (e) {
		this.setState({ selectAll: e.target.checked });
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue value={this.state.value} placeholder="Select your favourite(s)" options={this.state.options} onChange={this.handleSelectChange} selectAll={this.state.selectAll} />

				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.selectAll} onChange={this.toggleSelectAll} />
						<span className="checkbox-label">selectAll</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = MultiSelectField;
