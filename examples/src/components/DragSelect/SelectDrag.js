import React, { Component, PropTypes } from 'react';
import ValueSquare from './ValueSquare';
import ValueDrag from './ValueDrag';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class SelectDrag extends Component {
  constructor(props) {
    super(props)
  }
  renderSquare() {

  return (
    <div
         style={{ width: '12.5%', height: '12.5%' }}>
      <ValueSquare>
        {this.renderValueDrag()}
      </ValueSquare>
    </div>
  );
  }
  renderValueDrag(){
    return <ValueDrag/>
  }
  render() {
    const squares = [this.renderSquare()];


    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }

}

export default DragDropContext(HTML5Backend)(SelectDrag);
