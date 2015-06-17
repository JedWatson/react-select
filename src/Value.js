var React = require('react');

var classes = require('classnames');

var Option = React.createClass({

	displayName: 'Value',

	propTypes: {
		label: React.PropTypes.string.isRequired,
		node: React.PropTypes.node,
		closable: React.PropTypes.bool,
    className: React.PropTypes.string
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
			<div className={classes('Select-item', this.props.className)}>
				<span
          className={classes('Select-item-icon', {
            notClosable: this.props.closable !== null && !this.props.closable
          })}
					onMouseDown={this.blockEvent}
					onClick={this.props.onRemove}
					onTouchEnd={this.props.onRemove}>&times;</span>
				<span className="Select-item-label">{this.props.node || label}</span>
			</div>
		);
	}

});

module.exports = Option;
