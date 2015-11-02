var React = require('react');
var classes = require('classnames');

var SingleValue = React.createClass({
	propTypes: {
		value: React.PropTypes.object.isRequired,
	},
	render () {
		var classNames = classes('Select-placeholder', this.props.value.className);
		return (
			<div
				className={classNames}
				style={this.props.value.style}
				title={this.props.value.title}
				>
				{this.props.children}
			</div>
		);
	}
});

module.exports = SingleValue;
