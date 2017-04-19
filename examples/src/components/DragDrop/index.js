import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Knight from './Knight';
import Square from './Square';
import Board from './Board';
import { moveKnight, knightPosition } from './Game';
import { observe } from './Game';

export default class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.state ={
      'position':[4,7]
    };
    this.unobserve = observe(this.handleChange.bind(this));
    console.log(this.unobserve,'unobserve');
    this.handleChange = this.handleChange.bind(this);

    }
    handleChange(position){
      console.log('handleChange');
      this.setState({ 'position':position });
    }
    render() {
      return(
        <div style={{
          height:'400px',
          width: '400px'
        }}>
        <Board handleChange={this.handleChange}knightPosition={this.state.position} />
        </div>
    );
    }
  }
