/** @jsx React.DOM */

var React = require('react'),
	Select = require('react-select');
 
var SelectField = React.createClass({
	render: function() {
		var ops = [
			{ label: 'First', value: 'one' },
			{ label: 'Second', value: 'two' },
			{ label: 'Third', value: 'three' }
		];
		return <div>
			{this.props.label}
			<Select options={ops} value={this.props.value} />
		</div>;
	}
});

React.renderComponent(
	<SelectField label="Choose:"/>,
	document.getElementById('example')
);
