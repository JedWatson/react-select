import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Value extends React.Component {

	constructor(props) {
		super(props);

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.handleTouchEndRemove = this.handleTouchEndRemove.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
	}

	handleMouseDown (event) {
		const { onClick, value } = this.props;

		if (event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		if (onClick) {
			event.stopPropagation();
			onClick(value, event);
			return;
		}
		if (value.href) {
			event.stopPropagation();
		}
	}

	onRemove (event) {
		const { value, onRemove } = this.props;

		event.preventDefault();
		event.stopPropagation();
		onRemove(value);
	}

	handleTouchEndRemove (event){
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if(this.dragging) return;

		// Fire the mouse events
		this.onRemove(event);
	}

	handleTouchMove (event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	}

	handleTouchStart (event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	}

	renderRemoveIcon () {
		const { disabled, onRemove } = this.props;

		if (disabled || !onRemove) return;
		return (
			<span className="Select-value-icon"
				aria-hidden="true"
				onMouseDown={this.onRemove}
				onTouchEnd={this.handleTouchEndRemove}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}>
				&times;
			</span>
		);
	}

	renderLabel () {
		const { value, onClick, children, id } = this.props;

		let className = 'Select-value-label';
		return onClick || value.href ? (
			<a className={className} href={value.href} target={value.target} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
				{children}
			</a>
		) : (
			<span className={className} role="option" aria-selected="true" id={id}>
				{children}
			</span>
		);
	}

	render () {
		const { value } = this.props;

		return (
			<div className={classNames('Select-value', value.className)}
				style={value.style}
				title={value.title}
				>
				{this.renderRemoveIcon()}
				{this.renderLabel()}
			</div>
		);
	}
};


Value.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool,               // disabled prop passed to ReactSelect
	id: PropTypes.string,                   // Unique id for the value - used for aria
	onClick: PropTypes.func,                // method to handle click on value label
	onRemove: PropTypes.func,               // method to handle removal of the value
	value: PropTypes.object.isRequired,     // the option object for this value
};

export default Value;
