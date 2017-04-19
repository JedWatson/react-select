import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
  constructor(props) {
    super(props);
    }
  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',

      }}>
        {this.props.children}
      </div>
    );
  }
}
Board.propTypes = {
  handleChange: PropTypes.func,
};
export default DragDropContext(HTML5Backend)(Board);
