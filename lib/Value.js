'use strict';

var React = require('react');

var Option = React.createClass({

	displayName: 'Value',

	propTypes: {
		label: React.PropTypes.string.isRequired,
		node: React.PropTypes.node,
		closable: React.PropTypes.bool
	},

	blockEvent: function blockEvent(event) {
		event.stopPropagation();
	},

	render: function render() {
		var label = this.props.label;

		if (this.props.optionLabelClick) {
			label = React.createElement(
				'a',
				{ className: 'Select-item-label__a',
					onMouseDown: this.blockEvent,
					onTouchEnd: this.props.onOptionLabelClick,
					onClick: this.props.onOptionLabelClick },
				label
			);
		}

		var closableClass = '';
		if (this.props.closable !== null && !this.props.closable) {
			closableClass += ' not-closable';
		}

		return React.createElement(
			'div',
			{ className: 'Select-item' },
			React.createElement(
				'span',
				{ className: 'Select-item-icon' + closableClass,
					onMouseDown: this.blockEvent,
					onClick: this.props.onRemove,
					onTouchEnd: this.props.onRemove },
				'×'
			),
			React.createElement(
				'span',
				{ className: 'Select-item-label' },
				this.props.node || label
			)
		);
	}

});

module.exports = Option;