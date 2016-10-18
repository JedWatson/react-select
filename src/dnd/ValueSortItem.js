import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';
import { VALUE_ITEM } from '../Value';


const dragSource = {

	beginDrag(props) {
		return {
			index: props.index,
			contextId: props.contextId
		};
	},

	endDrag(props, monitor) {
		if (!monitor.didDrop()) {
			return;
		}
	}
};

function collect(connect, monitor) {
	return {
		// Call this function inside render()
		// to let React DnD handle the drag events:
		connectDragSource: connect.dragSource(),
		// You can ask the monitor about the current drag state:
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview()
	};
}

class ValueSortItem extends Component {

	
	render() {
		//const url = `url(${this.props.url}) no-repeat`;
		const { isDragging, connectDragSource, connectDragPreview, previewUrl, previewHtml } = this.props;
		const item = connectDragSource(
			<div>
				{!isDragging ? this.props.children : false}
			</div>
		);
		return item;
	}

}


ValueSortItem.propTypes = {
	children: PropTypes.any,
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	previewHeight: PropTypes.string,
	previewHtml: PropTypes.any,
	previewWidth: PropTypes.string,
	previewUrl: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

ValueSortItem.defaultProps = {
	previewHtml: false,
	previewHeight: '200px',
	previewWidth: '200px',
	previewUrl: false
};

export default DragSource(VALUE_ITEM, dragSource, collect)(ValueSortItem);

