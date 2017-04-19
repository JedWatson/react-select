import React from 'react';
import Select from 'react-select';

const FLAVOURS = [{ label: 'mathew', value: 'mathew' },
{ label: 'mark', value: 'mark' },{ label: 'luke', value: 'luke' },
{ label: 'paul', value: 'paul' },{'label':'john','value':'john'}];

const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

var DuplicateSelect = React.createClass({
	displayName: 'DuplicateSelect',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			options: FLAVOURS,
			value: [{ label: 'mathew', value: 'mathew' },
			{ label: 'mark', value: 'mark' },{ label: 'luke', value: 'luke' },
			{ label: 'paul', value: 'paul' }],
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
  onValueClick(){
    console.log('value click');
  },
  arrowRenderer(){
    return (
      <span onClick={this.onValueClick}>+</span>
    )
  },
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
          multi
          simpleValue
          onValueClick={this.onValueClick}
          arrowRenderer={this.arrowRenderer}
          dragAndDrop={true}
          trackByIndex={true}
          allowDuplicates={true}
          disabled={this.state.disabled}
          value={this.state.value}
          placeholder="Select your favourite(s)"
          options={this.state.options}
          onChange={this.handleSelectChange} />

				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.disabled} onChange={this.toggleDisabled} />
						<span className="checkbox-label">Disable the control</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = DuplicateSelect;
