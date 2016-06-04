import React from 'react';
import classNames from 'classnames';

var _startX = 0;            // mouse starting positions
var _startY = 0;
var _offsetX = 0;           // current element offset
var _offsetY = 0;
var _dragElement;           // needs to be passed from OnMouseDown to OnMouseMove
var _oldZIndex = 0;         // we temporarily increase the z-index during drag
var _currentMouseOverElement;

const Value = React.createClass({

	displayName: 'Value',

	propTypes: {
		children: React.PropTypes.node,
		disabled: React.PropTypes.bool,               // disabled prop passed to ReactSelect
		id: React.PropTypes.string,                   // Unique id for the value - used for aria
		onClick: React.PropTypes.func,                // method to handle click on value label
		onRemove: React.PropTypes.func,               // method to handle removal of the value
		value: React.PropTypes.object.isRequired,     // the option object for this value.
		dragToReorder: React.PropTypes.bool,          // boolean to enable the drag and drop to reorder option for multiple values //ToDo: Change to options, which can contain mor options
		sort: React.PropTypes.number                 // The id to sort by
	},

	extractNumber(value) {
		var n = parseInt(value);
		return n == null || isNaN(n) ? 0 : n;
	},

	resetCoordinates() {
		_startX = 0;            // mouse starting positions
        _startY = 0;
        _offsetX = 0;           // current element offset
        _offsetY = 0;
        _oldZIndex = 0;
        _dragElement = null;
	},

	mouseDownHandler (e) {
		//e.preventDefault();

		if (e.type === 'mousedown' && e.button !== 0) {
			return;
		}

		if (this.props.dragToReorder) {
			// IE uses srcElement, others use target
			var parent = e.target.parentElement // != null ? e.target.parentElement : e.srcElement;

			// Reset coordinates of parent element
			parent.style.top = 0;
			parent.style.left = 0;

			parent.className += ' drag';

			// grab the mouse position
			_startX = e.clientX;
			_startY = e.clientY;// - e.target.offsetHeight + 1; // ToDo: Optimize -> Get the dragging div out of the way for the mouseOverEvent

			// grab the clicked element's position
			_offsetX = this.extractNumber(parent.style.left);
			_offsetY = this.extractNumber(parent.style.top);

			// bring the clicked element to the front while it is being dragged
			_oldZIndex = parent.style.zIndex;
			parent.style.zIndex = 9999999;

			// we need to access the element in OnMouseMove
			_dragElement = parent;

			// tell our code to start moving the element with the mouse
			//this.handleMouseMove()
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

	mouseMoveHandler (e) {
		//e.preventDefault();

		if (e == null)
			var e = window.event;

			// this is the actual "drag code"
			//_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
			_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';

			//_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
			_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
	},

	mouseUpHandler(e) {
		if (_dragElement != null) {

			// Remove drag class
			_dragElement.classList.remove('drag');


			_dragElement.style.zIndex = _oldZIndex;

			// we're done with these events until the next OnMouseDown
			document.onmousemove = null;
			document.onselectstart = null;
			_dragElement.ondragstart = null;

			// this is how we know we're not dragging
			_dragElement = null;
		}
    },

    mouseOverHandler(e) {
    	if (_dragElement != null) {
			// Get parent if child
			if (e.target.className.indexOf('label') > 0 || e.target.className.indexOf('icon') > 0) {
				var currElement = e.target.parentNode

				var elements = document.getElementsByClassName('Select-value')
				if (currElement === elements[0]) {
					currElement.parentNode.insertBefore(_dragElement, currElement);
				} else {
					this.insertAfter(_dragElement, currElement)
				}


			} else {

				var elements = document.getElementsByClassName('Select-value')
				if (e.target === elements[0]) {
					e.target.parentNode.insertBefore(_dragElement, e.target);
				} else {
					this.insertAfter(_dragElement, e.target);
				}
			}
    	}
    },

    insertAfter(newNode, referenceNode) {

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
	console.log('handleTouchMove');
		// Set a flag that the view is being dragged
		console.log('test');
		this.dragging = true;
	},

	handleTouchStart (event) {
	console.log('handleTouchStart');
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
				onTouchMove={this.handleTouchMove}>
				&times;
			</span>
		);
	},

	renderLabel () {
		let className = 'Select-value-label';
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
