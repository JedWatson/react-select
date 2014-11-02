var React = require('react'),
	Select = require('react-select');
 
var SelectField = React.createClass({
	render: function() {
		var ops = [
			{ label: 'Australian Capital Territory', value: 'australian-capital-territory' },
			{ label: 'New South Wales', value: 'new-south-wales' },
			{ label: 'Victoria', value: 'victoria' },
			{ label: 'Queensland', value: 'queensland' },
			{ label: 'Western Australia', value: 'western-australia' },
			{ label: 'South Australia', value: 'south-australia' },
			{ label: 'Tasmania', value: 'tasmania' },
			{ label: 'Northern Territory', value: 'northern-territory' }
		];
		return <div>
			<label>{this.props.label}</label>
			<Select options={ops} value={this.props.value} />
		</div>;
	}
});
 
var RemoteSelectField = React.createClass({
	loadOptions: function(input, callback) {
		
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
			<Select asyncOptions={this.loadOptions} value={this.props.value} />
		</div>;
	}
});

/*
var MultiSelectField = React.createClass({
	render: function() {
		var ops = [
			{ label: 'Chocolate', value: 'chocolate' },
			{ label: 'Vanilla', value: 'vanilla' },
			{ label: 'Strawberry', value: 'strawberry' }
		];
		return <div>
			<label>{this.props.label}</label>
			<Select multi={true} options={ops} value={this.props.value} />
		</div>;
	}
});
*/

React.render(
	<div>
		<SelectField label="State:"/>
		<RemoteSelectField label="Remote:"/>
		{{/*<MultiSelectField label="Multi:"/>*/}}
	</div>,
	document.getElementById('example')
);
