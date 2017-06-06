import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import flow from 'lodash/flow';
import { DragSource, DropTarget } from 'react-dnd';

import Value from './Value';

const ItemTypes = { TAG: 'value' };

const dragSource = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
};

const dropCollect = (connect) => {
	return {
		connectDropTarget: connect.dropTarget()
	};
};

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

const propTypes = {
	children: PropTypes.node,
	connectDragPreview: PropTypes.func.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	disabled: PropTypes.bool,               // disabled prop passed to ReactSelect
	handlerReorder: PropTypes.func,
	id: PropTypes.string,                   // Unique id for the value - used for aria
	index: PropTypes.number.isRequired,
	isDragging: PropTypes.bool.isRequired,
	onClick: PropTypes.func,                // method to handle click on value label
	onRemove: PropTypes.func,               // method to handle removal of the value
	value: PropTypes.object.isRequired,     // the option object for this value
};

class DraggableValue extends Value {

	handleParentMouseDown (event) {
		event.stopPropagation();
	}

	renderDragIcon () {
		if (this.props.disabled || !this.props.onRemove) return;
		return (
			<span className="Select-value-drag-icon"
				aria-hidden="true"
				style={ { cursor: 'move' } }>
				&hArr;
			</span>
		);
	}

	render () {
		const { connectDragSource, isDragging, connectDropTarget, connectDragPreview } = this.props;
		const styles = { ...this.props.value.style, opacity: isDragging ? 0.5 : 1 };
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
};

DraggableValue.propTypes = propTypes;

module.exports = flow(
	DragSource(ItemTypes.TAG, tagSource, dragSource),
  	DropTarget(ItemTypes.TAG, tagTarget, dropCollect)
)(DraggableValue);
