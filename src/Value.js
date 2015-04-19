var React = require('react');

var Option = React.createClass({

	displayName: 'Value',

	propTypes: {
		label: React.PropTypes.string.isRequired
	},

	blockEvent: function(event) {
		event.stopPropagation();
	},

	render: function() {
		var label = this.props.label;

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
					onClick={this.props.onRemove}
					onTouchEnd={this.props.onRemove}>{String.fromCharCode(215)}</span>
				<span className="Select-item-label">{label}</span>
			</div>
		);
	}

});

module.exports = Option;
