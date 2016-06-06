import React from 'react';
import classNames from 'classnames';

var _dragElement = null;
var _lastHoveredElement = null;

const Value = React.createClass({

	displayName: 'Value',

	propTypes: {
		children: React.PropTypes.node,
		disabled: React.PropTypes.bool,               // disabled prop passed to ReactSelect
		id: React.PropTypes.string,                   // Unique id for the value - used for aria
		onClick: React.PropTypes.func,                // method to handle click on value label
		onRemove: React.PropTypes.func,               // method to handle removal of the value
		value: React.PropTypes.object.isRequired,     // the option object for this value.
		dragToReorder: React.PropTypes.bool           // boolean to enable the drag and drop to reorder option for multiple values
	},

	mouseDownHandler (e) {
		if (e.type === 'mousedown' && e.button !== 0) { return; }

		if (this.props.dragToReorder) {

			// IE uses srcElement, others use target
			var parent = e.target.parentElement != null ? e.target.parentElement : e.srcElement;
			parent.className += ' drag';
			_dragElement = parent;

			// tell our code to start moving the element with the mouse
			document.onmousemove = this.mouseMoveHandler;
			document.onmouseup = this.mouseUpHandler;

			// cancel out any text selections
			document.body.focus();

			// prevent text selection in IE
			document.onselectstart = function () { return false; };
			// prevent IE from trying to drag an image
			parent.ondragstart = function() { return false; };

			// prevent text selection (except IE)
			return false;
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
    	if (_dragElement !== null) {
    		_lastHoveredElement = e.target;

    		//Inserts a spacer after a element
			this.insertAfter(document.getElementById('spacer'), this.getValueElement(_lastHoveredElement));
    	}
    },

    mouseUpHandler (e) {
		if (_dragElement !== null) {
			let currElement = this.getValueElement(_lastHoveredElement);
			let elements = document.getElementsByClassName('Select-value')

			if (currElement === elements[0]) {
				currElement.parentNode.insertBefore(_dragElement, currElement);
			} else {
				this.insertAfter(_dragElement, currElement)
			}

			//_dragElement.parent.getElementById('spacer').remove();

			// Remove drag class
			_dragElement.classList.remove('drag');

			// we're done with these events until the next OnMouseDown
			document.onmousemove = null;
			document.onselectstart = null;

			// this is how we know we're not dragging
			_dragElement = null;
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

	handleTouchEndRemove (event){
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if(this.dragging) return;

		// Fire the mouse events
		this.onRemove(event);
	},

	handleTouchMove (event) {
		// Set a flag that the view is being dragged
		console.log('test');
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
			<div id={'sort-' + this.props.sort} className={classNames('Select-value', this.props.value.className)}
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
