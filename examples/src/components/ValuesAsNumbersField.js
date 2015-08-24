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
				{ value: 24, label: 'Twenty-three' }
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
					searchable={true}
					matchProp={matchProp}
					matchPos={this.state.matchPos}
					options={this.state.options}
					onChange={this.onChange}
					value={this.state.value}
					multi={this.state.multi}
					/>
				<div>
					<label htmlFor="values-as-numbers-multi">Multi-Select?</label>
					<input type="checkbox" id="values-as-numbers-multi" checked={this.state.multi} onChange={this.onChangeMulti} />
					<label htmlFor="values-as-numbers-matchstart">Match only at start?</label>
					<input type="checkbox" id="values-as-numbers-matchstart" checked={this.state.matchPos === 'start'} onChange={this.onChangeMatchStart} />
					<label htmlFor="values-as-numbers-matchvalue">Match value?</label>
					<input type="checkbox" id="values-as-numbers-matchvalue" checked={this.state.matchValue} onChange={this.onChangeMatchValue} />
					<label htmlFor="values-as-numbers-matchlabel">Match label?</label>
					<input type="checkbox" id="values-as-numbers-matchlabel" checked={this.state.matchLabel} onChange={this.onChangeMatchLabel} />
				</div>
			</div>
		);
	}
});

module.exports = ValuesAsNumbersField;