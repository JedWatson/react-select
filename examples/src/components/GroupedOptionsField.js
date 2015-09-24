import React from 'react';
import Select from 'react-select';

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var ops = [{
  label: 'Primary Colors',
  options: [
    { label: 'Yellow', value: 'yellow' },
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' }
  ]
}, {
  label: 'Secondary Colors',
  options: [
    { label: 'Orange', value: 'orange' },
    { label: 'Violet', value: 'violet' },
    { label: 'Green', value: 'green' }
  ]
}];

var GroupedOptionsField = React.createClass({
	displayName: 'GroupedOptionsField',
	propTypes: {
		delimiter: React.PropTypes.string,
		label: React.PropTypes.string,
		multi: React.PropTypes.bool,
	},

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					placeholder="Select a color"
					options={ops}
					onChange={logChange} />
			</div>
		);
	}
});

module.exports = GroupedOptionsField;

