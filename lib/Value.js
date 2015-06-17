'use strict';

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

		return React.createElement(
			'div',
			{ className: classes('Select-item', this.props.className) },
			React.createElement(
				'span',
				{
					className: classes('Select-item-icon', {
						notClosable: this.props.closable !== null && !this.props.closable
					}),
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