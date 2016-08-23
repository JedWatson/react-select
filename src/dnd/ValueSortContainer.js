import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import { VALUE_ITEM } from '../Value';
const target = {
	canDrop(props, monitor) {
		const item = monitor.getItem();
		return item.contextId === props.contextId;
	},

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		component.setState({ dragIndex, hoverIndex });
	},

	drop(props, monitor , component) {
		const { handleSorting } = props;
		const { state } = component;
		if(typeof handleSorting === 'function') {
			handleSorting(state.dragIndex, state.hoverIndex);
		}
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	};
}


class ValueSortContainer extends Component {

	constructor() {
		super(...arguments);
		this.state = {
			dragIndex: -1,
			hoverIndex: -1
		};
	}


	render() {
		const { connectDropTarget, isOver, canDrop, className } = this.props;
		const allClassNames = classNames(className, { 'Sort-item--CanDrop': canDrop && isOver, 'Sort-item--CantDrop': !canDrop && isOver });
		return connectDropTarget(
			<div className={allClassNames}>
				{this.props.children}
			</div>
		);

	}
}

ValueSortContainer.propTypes = {
	canDrop: PropTypes.bool,
	children: PropTypes.any,
	connectDropTarget: PropTypes.func,
	handleSorting: PropTypes.func.isRequired,
	isOver: PropTypes.bool.isRequired,
	contextId: React.PropTypes.oneOfType([
		React.PropTypes.number,
		React.PropTypes.string
	]),                                           //Unique Identifier for the drag context (parent component which contains the dnd context)
	className: PropTypes.string                  //String of extra classnames to give to the container component (default: '')
};

ValueSortContainer.defaulProps = {
	className: ''
};

export default DropTarget(VALUE_ITEM, target, collect)(ValueSortContainer);
