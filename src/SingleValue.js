var React = require('react');

var SingleValue = React.createClass({
	propTypes: {
		placeholder: React.PropTypes.string,       // this is default value provided by React-Select based component
		value: React.PropTypes.object              // selected option
	},
	render: function() {
		return (
			<div className="Select-placeholder">{this.props.placeholder}</div>
		);
	}
});

module.exports = SingleValue;
