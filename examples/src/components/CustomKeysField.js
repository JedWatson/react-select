import React from 'react';
import Select from 'react-select';

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var CustomKeysField = React.createClass({
	displayName: 'CustomKeysField',
	propTypes: {
		label: React.PropTypes.string
	},

	getInitialState () {
		return {
			options: [
				{ id: '1', name: 'One' },
				{ id: '2', name: 'Two' },
				{ id: '3', name: 'Three' },
				{ id: '4', name: 'Four' }
			],
			value: null,
			multi: false
		};
	},

	onChange(value, values) {
		this.setState({
			value: value
		});
		logChange(value, values);
	},

	onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					searchable
					labelKey="name"
					valueKey="id"
					options={this.state.options}
					onChange={this.onChange}
					value={this.state.value}
					multi={this.state.multi}
					/>
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

module.exports = CustomKeysField;
