import React from 'react';
import Select from 'react-select';

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var ValuesAsNumbersField = React.createClass({
	displayName: 'ValuesAsNumbersField',
	propTypes: {
		label: React.PropTypes.string
	},

	getInitialState () {
		return {
			options: [
				{ value: 10, label: 'Ten' },
				{ value: 11, label: 'Eleven' },
				{ value: 12, label: 'Twelve' },
				{ value: 23, label: 'Twenty-three' },
				{ value: 24, label: 'Twenty-four' }
			],
			matchPos: 'any',
			matchValue: true,
			matchLabel: true,
			value: null,
			multi: false
		};
	},

	onChangeMatchStart(event) {
		this.setState({
			matchPos: event.target.checked ? 'start' : 'any'
		});
	},

	onChangeMatchValue(event) {
		this.setState({
			matchValue: event.target.checked
		});
	},

	onChangeMatchLabel(event) {
		this.setState({
			matchLabel: event.target.checked
		});
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

		var matchProp = 'any';

		if (this.state.matchLabel && !this.state.matchValue) {
			matchProp = 'label';
		}

		if (!this.state.matchLabel && this.state.matchValue) {
			matchProp = 'value';
		}

		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					searchable
					matchProp={matchProp}
					matchPos={this.state.matchPos}
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
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.matchValue} onChange={this.onChangeMatchValue} />
						<span className="checkbox-label">Match value only</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.matchLabel} onChange={this.onChangeMatchLabel} />
						<span className="checkbox-label">Match label only</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.matchPos === 'start'} onChange={this.onChangeMatchStart} />
						<span className="checkbox-label">Only include matches from the start of the string</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = ValuesAsNumbersField;
