import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import blockEvent from './utils/blockEvent';

class Option extends React.Component {

	constructor(props) {
		super(props);

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	}

	handleMouseEnter (event) {
		this.onFocus(event);
	}

	handleMouseMove (event) {
		this.onFocus(event);
	}

	handleTouchEnd(event){
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if(this.dragging) return;

		this.handleMouseDown(event);
	}

	handleTouchMove () {
		// Set a flag that the view is being dragged
		this.dragging = true;
	}

	handleTouchStart () {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	}

	onFocus (event) {
		if (!this.props.isFocused) {
			this.props.onFocus(this.props.option, event);
		}
	}

	render () {
		const { option, instancePrefix, optionIndex } = this.props;
		const className = classNames(this.props.className, option.className);

		return option.disabled ? (
			<div className={className}
				onMouseDown={blockEvent}
				onClick={blockEvent}>
				{this.props.children}
			</div>
		) : (
			<div className={className}
				style={option.style}
				role="option"
				aria-label={option.label}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
				onTouchEnd={this.handleTouchEnd}
				id={`${instancePrefix}-option-${optionIndex}`}
				title={option.title}>
				{this.props.children}
			</div>
		);
	}
}

Option.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,             // className (based on mouse position)
	instancePrefix: PropTypes.string.isRequired,  // unique prefix for the ids (used for aria)
	isDisabled: PropTypes.bool,              // the option is disabled
	isFocused: PropTypes.bool,               // the option is focused
	isSelected: PropTypes.bool,              // the option is selected
	onFocus: PropTypes.func,                 // method to handle mouseEnter on option element
	onSelect: PropTypes.func,                // method to handle click on option element
	onUnfocus: PropTypes.func,               // method to handle mouseLeave on option element
	option: PropTypes.object.isRequired,     // object that is base for that option
	optionIndex: PropTypes.number,           // index of the option, used to generate unique ids for aria
};

export default Option;
