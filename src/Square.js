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
    console.log('hello world');
    // moveKnight(0,props.index);
    console.log(props,'isdragging');
    props.handleDrop(props.index)
  }
};
class Square extends Component {
  constructor(props) {
    super(props);
    console.log(props,'props');
    }
  render() {
    const { x, y, connectDropTarget, isOver } = this.props;
    console.log(this.props,'props in squares');
    return connectDropTarget(
      <div style={{
        position: 'relative',
        backgroundColor:'green',
        border:'solid black 2px',
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
  handleDrop:PropTypes.func
};
export default DropTarget('value', squareTarget, collect)(Square);
