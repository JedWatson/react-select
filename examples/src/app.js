var React = require('react'),
	Select = require('react-select');

var STATES = require('./data/states');

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
			label: 'States:',
		};
	},

	getInitialState: function() {
		return {
			country: 'AU',
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
	render: function() {
		var ops = STATES[this.state.country];
		return (
			<div>
				<label>{this.props.label}</label>
				<Select options={ops} value={this.state.selectValue} onChange={this.updateValue} searchable={this.props.searchable} />
				<div className="switcher">
					Country:
					<CountrySelect value="AU" selected={this.state.country} onSelect={this.switchCountry}>Australia</CountrySelect>
					<CountrySelect value="US" selected={this.state.country} onSelect={this.switchCountry}>US</CountrySelect>
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
		
		if (input.slice(0,1) === 'a') {
			if (input.slice(0,2) === 'ab') {
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
		return <div>
			<label>{this.props.label}</label>
			<Select asyncOptions={this.loadOptions} className="remote-example" />
		</div>;
	}
});


var MultiSelectField = React.createClass({
	render: function() {
		var ops = [
			{ label: 'Chocolate', value: 'chocolate' },
			{ label: 'Vanilla', value: 'vanilla' },
			{ label: 'Strawberry', value: 'strawberry' },
			{ label: 'Caramel', value: 'caramel' },
			{ label: 'Cookies and Cream', value: 'cookiescream' },
			{ label: 'Peppermint', value: 'peppermint' }
		];
		return <div>
			<label>{this.props.label}</label>
			<Select multi={true} placeholder="Select your favourite(s)" options={ops} onChange={logChange} />
		</div>;
	}
});

var PrePopulatedField = React.createClass({
	render: function() {
		var ops = [
			{ label: 'Chocolate', value: 'chocolate', selected: true },
			{ label: 'Vanilla', value: 'vanilla' },
			{ label: 'Strawberry', value: 'strawberry', selected: true },
			{ label: 'Caramel', value: 'caramel', selected: true },
			{ label: 'Cookies and Cream', value: 'cookiescream' },
			{ label: 'Peppermint', value: 'peppermint' }
		];
		return <div>
			<label>{this.props.label}</label>
			<Select multi={true} options={ops} />
		</div>;
	}
});

var RemoteSelectedField = React.createClass({
	loadOptions: function(input, callback) {

		setTimeout(function() {
			callback(null, {
				options: [
					{ label: 'Chocolate', value: 'chocolate', selected: true },
					{ label: 'Vanilla', value: 'vanilla' },
					{ label: 'Strawberry', value: 'strawberry', selected: true },
					{ label: 'Caramel', value: 'caramel', selected: true },
					{ label: 'Cookies and Cream', value: 'cookiescream' },
					{ label: 'Peppermint', value: 'peppermint' }
				],
				complete: true
			});
		}, 500);

	},
	render: function() {
		return <div>
			<label>{this.props.label}</label>
			<Select multi={true} asyncOptions={this.loadOptions} className="remote-example" />
		</div>;
	}
});


React.render(
	<div>
		<PrePopulatedField label="Pre populated field" />
		<RemoteSelectedField label="Pre populated field (from remote)" />
		<StatesField />
		<StatesField label="States (non-searchable):" searchable={false} />
		<MultiSelectField label="Multiselect:"/>
		<RemoteSelectField label="Remote Options:"/>
	</div>,
	document.getElementById('example')
);
