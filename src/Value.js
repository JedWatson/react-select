var React = require('react');

var Option = React.createClass({

	displayName: 'Value',

	propTypes: {
		label: React.PropTypes.string.isRequired,
		onOptionLabelClick: React.PropTypes.func,
		onRemove: React.PropTypes.func,
		optionLabelClick: React.PropTypes.bool,
		disabled: React.PropTypes.bool
	},

	blockEvent: function(event) {
		event.stopPropagation();
	},

	handleOnRemove: function(event) {
		if (!this.props.disabled) {
			this.props.onRemove(event);
		}
	},

	render: function() {
		var label = this.props.label;
		var deleteIcon = null;

		if (this.props.optionLabelClick) {
			label = (
				<a className="Select-item-label__a"
					onMouseDown={this.blockEvent}
					onTouchEnd={this.props.onOptionLabelClick}
					onClick={this.props.onOptionLabelClick}>
					{label}
				</a>
			);
		}

		return (
			<div className="Select-item">
				<span className="Select-item-icon"
					onMouseDown={this.blockEvent}
					onClick={this.handleOnRemove}
					onTouchEnd={this.handleOnRemove}>&times;</span>
				<span className="Select-item-label">{label}</span>
			</div>
		);
	}

});

module.exports = Option;
