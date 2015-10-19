import React from 'react';
import Select from 'react-select';

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var CustomRenderField = React.createClass({
	displayName: 'CustomRenderField',
	propTypes: {
		delimiter: React.PropTypes.string,
		label: React.PropTypes.string,
		multi: React.PropTypes.bool,
	},
	getInitialState () {
		return {};
	},
	onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},
	renderOption (option) {
		return <span style={{ color: option.hex }}>{option.label} ({option.hex})</span>;

	},
	renderValue (option) {
		return <strong style={{ color: option.hex }}>{option.label}</strong>;
	},
	render () {
		var ops = [
			{ label: 'Red', value: 'red', hex: '#EC6230' },
			{ label: 'Green', value: 'green', hex: '#4ED84E' },
			{ label: 'Blue', value: 'blue', hex: '#6D97E2' }
		];
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					delimiter={this.props.delimiter}
					multi={this.state.multi}
					allowCreate
					placeholder="Select your favourite"
					options={ops}
					optionRenderer={this.renderOption}
					valueRenderer={this.renderValue}
					onChange={logChange} />
				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.multi} onChange={this.onChangeMulti} />
						<span className="checkbox-label">Multi-Select</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = CustomRenderField;
