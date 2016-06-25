import React from 'react';
import classNames from 'classnames';

var dragElement = null;
var hoveredElement = null;

const Value = React.createClass({

	displayName: 'Value',

	propTypes: {
		children: React.PropTypes.node,
		disabled: React.PropTypes.bool,               // disabled prop passed to ReactSelect
		dragToReorder: React.PropTypes.bool,          // drag to reorder option for multiple values
		id: React.PropTypes.string,                   // Unique id for the value - used for aria
		onClick: React.PropTypes.func,                // method to handle click on value label
		onRemove: React.PropTypes.func,               // method to handle removal of the value
		value: React.PropTypes.object.isRequired      // the option object for this value
	},

	getInitialState () {
		return {
			dragElement: null,
			hoveredElement: null
		};
	},

	mouseDownHandler (e) {
		if (e.type === 'mousedown' && e.button !== 0) { return; }

		if (this.props.dragToReorder) {
			var parent = e.target.parentElement != null ? e.target.parentElement : e.srcElement;
			parent.className += ' drag';
			dragElement = parent;
			spacer.style.display = 'inherit';
			document.onmouseup = this.mouseUpHandler;
		}

		if (this.props.onClick) {
			e.stopPropagation();
			this.props.onClick(this.props.value, e);
			return;
		}
		if (this.props.value.href) {
			e.stopPropagation();
		}
	},

    mouseOverHandler (e) {
    	if (dragElement !== null) {
    		hoveredElement = e.target;

    		//Inserts a spacer after a element
			this.insertAfter(spacer, this.getValueElement(hoveredElement));
    	}
    },

    mouseUpHandler (e) {
		if (dragElement !== null) {
			let currElement = this.getValueElement(hoveredElement);
			let elements = document.getElementsByClassName('Select-value');

			if (currElement === elements[0]) {
				currElement.parentNode.insertBefore(dragElement, currElement);
			} else {
				this.insertAfter(dragElement, currElement);
			}

			spacer.style.display = 'none';

			dragElement.classList.remove('drag');
			document.onmousemove = null;
			document.onselectstart = null;
			dragElement = null;
		}
	},

	getValueElement (element) {
		if (element.className.indexOf('label') > 0 || element.className.indexOf('icon') > 0) {
			return element.parentNode;
		} else {
			return element;
		}
	},

    insertAfter (newNode, referenceNode) {

        referenceNode.parentNode.insertBefore(newNode, referenceNode);
    },

	onRemove (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onRemove(this.props.value);
	},

	handleTouchEndRemove (event) {
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
		if (this.props.disabled || !this.props.onRemove) return;
		return (
			<span className="Select-value-icon"
				aria-hidden="true"
				onMouseDown={this.onRemove}
				onTouchEnd={this.handleTouchEndRemove}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
			>
				&times;
			</span>
		);
	},

	renderLabel () {
		let className = 'Select-value-label';
		className += this.props.dragToReorder ? ' move-cursor' : '';
		return this.props.onClick || this.props.value.href ? (
			<a className={className} href={this.props.value.href} target={this.props.value.target} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
				{this.props.children}
			</a>
		) : (
			<span className={className}
				role="option"
				aria-selected="true"
				id={this.props.id}
				onMouseDown={this.mouseDownHandler}
			>
				{this.props.children}
			</span>
		);
	},

	render () {
		return (
			<div className={classNames('Select-value', this.props.value.className)}
				style={this.props.value.style}
				title={this.props.value.title}
				onMouseOver={this.mouseOverHandler}
			>
				{this.renderRemoveIcon()}
				{this.renderLabel()}
			</div>
		);
	}

});

module.exports = Value;
