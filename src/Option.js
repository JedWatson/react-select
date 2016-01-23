import React from 'react';
import classNames from 'classnames';

const Option = React.createClass({
	propTypes: {
		children: React.PropTypes.node,
		className: React.PropTypes.string,             // className (based on mouse position)
		isDisabled: React.PropTypes.bool,              // the option is disabled
		isFocused: React.PropTypes.bool,               // the option is focused
		isSelected: React.PropTypes.bool,              // the option is selected
		onFocus: React.PropTypes.func,                 // method to handle mouseEnter on option element
		onSelect: React.PropTypes.func,                // method to handle click on option element
		onUnfocus: React.PropTypes.func,               // method to handle mouseLeave on option element
		option: React.PropTypes.object.isRequired,     // object that is base for that option
	},
	blockEvent (event) {
		event.preventDefault();
		event.stopPropagation();
		if ((event.target.tagName !== 'A') || !('href' in event.target)) {
			return;
		}
		if (event.target.target) {
			window.open(event.target.href, event.target.target);
		} else {
			window.location.href = event.target.href;
		}
	},
	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter (event) {
		this.onFocus(event);
	},
	handleMouseMove (event) {
		this.onFocus(event);
	},
	onFocus (event) {
		if (!this.props.isFocused) {
			this.props.onFocus(this.props.option, event);
		}
	},
	render () {
		var { option } = this.props;
		var className = classNames(this.props.className, option.className);

		return option.disabled ? (
			<div className={className}
				onMouseDown={this.blockEvent}
				onClick={this.blockEvent}>
				{this.props.children}
			</div>
		) : (
			<div className={className}
				style={option.style}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				title={option.title}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Option;
