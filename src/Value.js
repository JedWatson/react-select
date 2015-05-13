var React = require('react');

var Option = React.createClass({

	displayName: 'Value',

	propTypes: {
		label: React.PropTypes.string.isRequired,
		node: React.PropTypes.node,
		closable: React.PropTypes.bool
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

		var closableClass = '';
		if (this.props.closable !== null && !this.props.closable) {
			closableClass += ' not-closable';
		}

		return (
			<div className="Select-item">
				<span className={'Select-item-icon' + closableClass}
					onMouseDown={this.blockEvent}
					onClick={this.props.onRemove}
					onTouchEnd={this.props.onRemove}>&times;</span>
				<span className="Select-item-label">{this.props.node || label}</span>
			</div>
		);
	}

});

module.exports = Option;
