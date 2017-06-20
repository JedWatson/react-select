import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Value = createClass({

	displayName: 'Value',

	propTypes: {
		children: PropTypes.node,
		cssPrefix: PropTypes.string,
		disabled: PropTypes.bool,               // disabled prop passed to ReactSelect
		id: PropTypes.string,                   // Unique id for the value - used for aria
		onClick: PropTypes.func,                // method to handle click on value label
		onRemove: PropTypes.func,               // method to handle removal of the value
		value: PropTypes.object.isRequired,     // the option object for this value
	},

	getDefaultProps () {
		return {
			cssPrefix: 'Select'
		};
	},

	handleMouseDown (event) {
		if (event.type === 'mousedown' && event.button !== 0) {
			return;
		}
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

	handleTouchEndRemove (event){
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if(this.dragging) return;

		// Fire the mouse events
		this.onRemove(event);
	},

	handleTouchMove (event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	},

	handleTouchStart (event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	},

	renderRemoveIcon () {
		const { cssPrefix } = this.props;
		if (this.props.disabled || !this.props.onRemove) return;
		return (
			<span className={`${cssPrefix}-value-icon`}
				aria-hidden="true"
				onMouseDown={this.onRemove}
				onTouchEnd={this.handleTouchEndRemove}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}>
				&times;
			</span>
		);
	},

	renderLabel () {
		const { cssPrefix } = this.props;
		let className = `${cssPrefix}-value-label`;
		return this.props.onClick || this.props.value.href ? (
			<a className={className} href={this.props.value.href} target={this.props.value.target} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
				{this.props.children}
			</a>
		) : (
			<span className={className} role="option" aria-selected="true" id={this.props.id}>
				{this.props.children}
			</span>
		);
	},

	render () {
		const { cssPrefix } = this.props;
		return (
			<div className={classNames(`${cssPrefix}-value`, this.props.value.className)}
				style={this.props.value.style}
				title={this.props.value.title}
				>
				{this.renderRemoveIcon()}
				{this.renderLabel()}
			</div>
		);
	}

});

module.exports = Value;
