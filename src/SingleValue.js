var React = require('react');
var classes = require('classnames');

var SingleValue = React.createClass({
	propTypes: {
		placeholder: React.PropTypes.string,       // this is default value provided by React-Select based component
		value: React.PropTypes.object              // selected option
	},
	render: function() {

		var classNames = classes('Select-placeholder', this.props.value && this.props.value.className);
		return (
			<div className={classNames} style={this.props.value && this.props.value.style}>{this.props.placeholder}</div>
		);
	}
});

module.exports = SingleValue;
