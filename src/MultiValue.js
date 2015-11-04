import React from 'react';
import classes from 'classnames';

const MultiValue = React.createClass({

	displayName: 'MultiValue',

	propTypes: {
		disabled: React.PropTypes.bool,               // disabled prop passed to ReactSelect
		onClick: React.PropTypes.func,                // method to handle click on value label
		onRemove: React.PropTypes.func,               // method to handle remove of that value
		value: React.PropTypes.object.isRequired,     // option passed to component
	},

	handleMouseDown (event) {
		if (this.props.onClick) {
			event.stopPropagation();
			this.props.onClick(this.props.value, event);
			return;
		}
		if (this.props.value.href) {
			event.stopPropagation();
		}
	},

	onRemove (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onRemove(this.props.value);
	},

	renderRemoveIcon () {
		if (this.props.disabled || !this.props.onRemove) return;
		return (
			<span className="Select-item-icon"
				onMouseDown={this.onRemove}
				onTouchEnd={this.onRemove}>
				&times;
			</span>
		);
	},

	renderLabel () {
		let className = 'Select-item-label';
		return this.props.onClick || this.props.value.href ? (
			<a className={className} href={this.props.value.href} target={this.props.value.target} onMouseDown={this.handleMouseDown} onTouchEnd={this.props.handleMouseDown}>
				{this.props.children}
			</a>
		) : (
			<span className="Select-item-label">
				{this.props.children}
			</span>
		);
	},

	render () {
		return (
			<div className={classes('Select-item', this.props.value.className)}
				style={this.props.value.style}
				title={this.props.value.title}
				>
				{this.renderRemoveIcon()}
				{this.renderLabel()}
			</div>
		);
	}

});

module.exports = MultiValue;
