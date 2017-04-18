import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import ValueDrag from './ValueDrag.js'

const squareTarget = {
  drop(props) {
    console.log(props,'props');
    // moveKnight(props.x, props.y);
    // moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class ValueSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'value':{
        'label':'hello',
        'value':'world'
      }
    }
    }
  render() {
    const { x, y, connectDropTarget, isOver } = this.props;
      return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
      <ValueDrag value={this.state.value}/>
      </div>
    );
  }
}

ValueSquare.propTypes = {

};

export default DropTarget('valueDrag', squareTarget, collect)(ValueSquare);
