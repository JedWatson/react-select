var _ = require('underscore'),
	React = require('react'),
	classes = require('classnames');

var Option = React.createClass({
	
	displayName: 'Value',
	
	propTypes: {
		label: React.PropTypes.string.isRequired
	},
	
	blockEvent: function(event) {
		event.stopPropagation();
	},
	
	render: function() {
		return (
			<div className="Select-item">
				<span className="Select-item-icon" onMouseDown={this.blockEvent} onClick={this.props.onRemove} onTouchEnd={this.props.onRemove}>&times;</span>
				<span className="Select-item-label">{this.props.label}</span>
			</div>
		);
	}
	
});

module.exports = Option;
