import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import flow from 'lodash/flow';
import { DragSource, DropTarget } from 'react-dnd';

const ItemTypes = { TAG: 'value' };

const dragSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

const dropCollect = (connect) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const tagSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
  }
};

const tagTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.handlerReorder(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const Value = React.createClass({

	displayName: 'Value',

	propTypes: {
		index: PropTypes.number.isRequired,
		children: PropTypes.node,
		disabled: PropTypes.bool,               // disabled prop passed to ReactSelect
		id: PropTypes.string,                   // Unique id for the value - used for aria
		onClick: PropTypes.func,                // method to handle click on value label
		onRemove: PropTypes.func,               // method to handle removal of the value
		value: PropTypes.object.isRequired,     // the option object for this value
		handlerReorder: PropTypes.func,
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
    	connectDropTarget: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
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

	handleParentMouseDown (event) {
		event.stopPropagation();
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

	renderDragIcon () {
		if (this.props.disabled || !this.props.onRemove) return;
		return (
			<span className="Select-value-icon"
				aria-hidden="true"
				style={{cursor: 'move'}}>
				&hArr;
			</span>
		);
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
			<span className={className} role="option" aria-selected="true" id={this.props.id}>
				{this.props.children}
			</span>
		);
	},

	render () {
		const { connectDragSource, isDragging, connectDropTarget, connectDragPreview } = this.props;
		const styles = {...this.props.value.style, opacity: isDragging ? 0.5 : 1};
		return connectDragPreview(
			<div className={classNames('Select-value', this.props.value.className)}
				style={styles}
				title={this.props.value.title}
				onMouseDown={this.handleParentMouseDown}
				>
				{connectDragSource(connectDropTarget(this.renderDragIcon()))}
				{this.renderLabel()}
				{this.renderRemoveIcon()}
			</div>
		);
	}

});

module.exports = flow(
	DragSource(ItemTypes.TAG, tagSource, dragSource),
  	DropTarget(ItemTypes.TAG, tagTarget, dropCollect)
)(Value);
