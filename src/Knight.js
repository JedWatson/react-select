import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props,thing) {
    console.log(props,'knight');
    // props.handleDrag(props.index)
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Knight extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        color: this.props.index == 1 ? 'red':'green',
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        ♘
      </div>
    );
  }
}

Knight.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  handleDrag:PropTypes.func,
  index:PropTypes.number,
};

export default DragSource('knight', knightSource, collect)(Knight);
