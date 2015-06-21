/* eslint react/prop-types: 0 */

var React = require('react');
var Select = require('react-select');

var STATES = require('./data/states');
var id = 0;

function logChange(value) {
	console.log('Select value changed: ' + value);
}

var CountrySelect = React.createClass({
	onClick: function() {
		this.props.onSelect(this.props.value);
	},
	render: function() {
		var className = this.props.value === this.props.selected ? 'active' : 'link';
		return <span onClick={this.onClick} className={className}>{this.props.children}</span>;
	}
});

var StatesField = React.createClass({
	getDefaultProps: function () {
		return {
			searchable: true,
			label: 'States:'
		};
	},
	getInitialState: function() {
		return {
			country: 'AU',
			disabled: false,
			id: ++id,
			selectValue: 'new-south-wales'
		};
	},
	switchCountry: function(newCountry) {
		console.log('Country changed to ' + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null
		});
	},
	updateValue: function(newValue) {
		logChange('State changed to ' + newValue);
		this.setState({
			selectValue: newValue || null
		});
	},
	focusStateSelect: function() {
		this.refs.stateSelect.focus();
	},
	toggleDisabled: function(e) {
		this.setState({ disabled: e.target.checked });
	},
	render: function() {
		var ops = STATES[this.state.country];
		return (
			<div>
				<label>{this.props.label}</label>
				<Select ref="stateSelect" options={ops} disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue} searchable={this.props.searchable} />
				<div className="switcher">
					Country:
					<CountrySelect value="AU" selected={this.state.country} onSelect={this.switchCountry}>Australia</CountrySelect>
					<CountrySelect value="US" selected={this.state.country} onSelect={this.switchCountry}>US</CountrySelect>
					&nbsp; <button type="button" onClick={this.focusStateSelect}>Focus Select</button>
					&nbsp; <input type="checkbox" checked={this.state.disabled} id={'disable-states-' + this.state.id} onChange={this.toggleDisabled}/>
					<label htmlFor={'disable-states-' + this.state.id}>Disable</label>
				</div>
			</div>
		);
	}
});

var RemoteSelectField = React.createClass({
	loadOptions: function(input, callback) {
		input = input.toLowerCase();
		var rtn = {
			options: [
				{ label: 'One', value: 'one' },
				{ label: 'Two', value: 'two' },
				{ label: 'Three', value: 'three' }
			],
			complete: true
		};
		if (input.slice(0, 1) === 'a') {
			if (input.slice(0, 2) === 'ab') {
				rtn = {
					options: [
						{ label: 'AB', value: 'ab' },
						{ label: 'ABC', value: 'abc' },
						{ label: 'ABCD', value: 'abcd' }
					],
					complete: true
				};
			} else {
				rtn = {
					options: [
						{ label: 'A', value: 'a' },
						{ label: 'AA', value: 'aa' },
						{ label: 'AB', value: 'ab' }
					],
					complete: false
				};
			}
		} else if (!input.length) {
			rtn.complete = false;
		}

		setTimeout(function() {
			callback(null, rtn);
		}, 500);
	},
	render: function() {
		return (
			<div>
				<label>{this.props.label}</label>
				<Select asyncOptions={this.loadOptions} className="remote-example" />
			</div>
		);
	}
});


var MultiSelectField = React.createClass({
	getInitialState: function() {
		return {
			disabled: false,
			value: []
		};
	},
	handleSelectChange: function(value, values) {
		logChange('New value:', value, 'Values:', values);
		this.setState({ value: value });
	},
	toggleDisabled: function(e) {
		this.setState({ 'disabled': e.target.checked });
	},
	render: function() {
		var ops = [
			{ label: 'Chocolate', value: 'chocolate' },
			{ label: 'Vanilla', value: 'vanilla' },
			{ label: 'Strawberry', value: 'strawberry' },
			{ label: 'Caramel', value: 'caramel' },
			{ label: 'Cookies and Cream', value: 'cookiescream' },
			{ label: 'Peppermint', value: 'peppermint' }
		];
		return (
			<span>
				<div>
					<label>{this.props.label}</label>
					<Select multi={true} disabled={this.state.disabled} value={this.state.value} placeholder="Select your favourite(s)" options={ops} onChange={this.handleSelectChange} />
				</div>
				<div>
					<input type="checkbox" checked={this.state.disabled} id="disable-multiselect" onChange={this.toggleDisabled}/>
					<label htmlFor="disable-multiselect">Disable</label>
				</div>
			</span>
		);
	}
});

var SelectedValuesField = React.createClass({
	onLabelClick: function (data, event) {
		console.log(data, event);
	},
	render: function() {
		var ops = [
			{ label: 'Chocolate', value: 'chocolate' },
			{ label: 'Vanilla', value: 'vanilla' },
			{ label: 'Strawberry', value: 'strawberry' },
			{ label: 'Caramel', value: 'caramel' },
			{ label: 'Cookies and Cream', value: 'cookiescream' },
			{ label: 'Peppermint', value: 'peppermint' }
		];
		return (
			<div>
				<label>{this.props.label}</label>
				<Select
					onOptionLabelClick={this.onLabelClick}
					value="chocolate,vanilla,strawberry"
					multi={true}
					placeholder="Select your favourite(s)"
					options={ops}
					onChange={logChange} />
			</div>
		);
	}
});

var SelectedValuesFieldCreate = React.createClass({
	onLabelClick: function (data, event) {
		console.log(data, event);
	},
	render: function() {
		var ops = [
			{ label: 'First Option', value: 'first' },
			{ label: 'Second Option', value: 'second' },
			{ label: 'Third Option', value: 'third' }
		];
		return (
			<div>
				<label>{this.props.label}</label>
				<Select
					value="first"
					delimiter=","
					multi={true}
					allowCreate={true}
					placeholder="Select your favourite(s)"
					options={ops}
					onChange={logChange} />
			</div>
		);
	}
});

var CustomRenderField = React.createClass({
	onLabelClick: function (data, event) {
		console.log(data, event);
	},
	renderOption: function(option) {
		return <span style={{ color: option.hex }}>{option.label} ({option.hex})</span>;

	},
	renderValue: function(option) {
		return <strong style={{ color: option.hex }}>{option.label}</strong>;
	},
	render: function() {
		var ops = [
			{ label: 'Red', value: 'red', hex: '#EC6230' },
			{ label: 'Green', value: 'green', hex: '#4ED84E' },
			{ label: 'Blue', value: 'blue', hex: '#6D97E2' }
		];
		return (
			<div>
				<label>{this.props.label}</label>
				<Select
					delimiter=","
					multi={true}
					allowCreate={true}
					placeholder="Select your favourite(s)"
					options={ops}
					optionRenderer={this.renderOption}
					valueRenderer={this.renderValue}
					onChange={logChange} />
			</div>
		);
	}
});

React.render(
	<div>
		<StatesField />
		<StatesField label="States (non-searchable):" searchable={false} />
		<MultiSelectField label="Multiselect:"/>
		<SelectedValuesField label="Clickable labels (labels as links):" />
		<SelectedValuesFieldCreate label="Option Creation (tags mode):" />
		<CustomRenderField label="Custom rendering for options and values:" />
		<RemoteSelectField label="Remote Options:"/>
	</div>,
	document.getElementById('example')
);
