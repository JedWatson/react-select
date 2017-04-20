import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
const squareTarget = {
  drop(props) {
    props.handleDrop(props.index,props.value)
  }
};
class Square extends Component {
  constructor(props) {
    super(props);
    }
  render() {
    const { x, y, connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display:'inline',
        zIndex:1
      }}>
          {this.props.children}
      </div>
    );

  }
}

Square.propTypes = {
  index:PropTypes.number.isRequired,
  isOver:PropTypes.bool.isRequired,
  handleDrop:PropTypes.func,
  value:PropTypes.object
};
export default DropTarget('value', squareTarget, collect)(Square);
