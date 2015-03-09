"use strict";

var _ = require("lodash"),
    React = require("react");

var Option = React.createClass({

	displayName: "Value",

	propTypes: {
		label: React.PropTypes.string.isRequired
	},

	blockEvent: function blockEvent(event) {
		event.stopPropagation();
	},

	render: function render() {
		var label = this.props.label;

		if (this.props.optionLabelClick) {
			label = React.createElement(
				"a",
				{ className: "Select-item-label__a",
					onMouseDown: this.blockEvent,
					onTouchEnd: this.props.onOptionLabelClick,
					onClick: this.props.onOptionLabelClick },
				label
			);
		}

		return React.createElement(
			"div",
			{ className: "Select-item" },
			React.createElement(
				"span",
				{ className: "Select-item-icon",
					onMouseDown: this.blockEvent,
					onClick: this.props.onRemove,
					onTouchEnd: this.props.onRemove },
				"×"
			),
			React.createElement(
				"span",
				{ className: "Select-item-label" },
				label
			)
		);
	}

});

module.exports = Option;