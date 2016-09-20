import React from 'react';
import Select from 'react-select';

const USERS = require('../data/users');

var SelectDirection = React.createClass({
  displayName: 'SelectDirection',
  propTypes: {
    label: React.PropTypes.string
  },
  getDefaultProps () {
    return {
      label: 'SelectDirection:',
      searchable: true
    };
  },
  getInitialState () {
    return {
      selectValue: 'John Smith',
      up: true
    };
  },
  updateValue (newValue) {
    console.log('State changed to ' + newValue);
    this.setState({
      selectValue: newValue
    });
  },
  switchDirection (newValue) {
    let targetValue = newValue.target.value;
    console.log('Direction changed to ' + targetValue);
    this.setState({
      up: targetValue === 'up'
    });
  },
  render () {
    return (
      <div className="section">
        <h3 className="section-heading">{this.props.label}</h3>
        <Select ref="stateSelect" autofocus openOuterUp={this.state.up} options={USERS} simpleValue name="selected-state" value={this.state.selectValue} onChange={this.updateValue} />
        <div className="checkbox-list">
          <label className="checkbox">
            <input type="radio" className="checkbox-control" checked={this.state.up} value="up" onChange={this.switchDirection}/>
            <span className="checkbox-label">Up</span>
          </label>
          <label className="checkbox">
            <input type="radio" className="checkbox-control" checked={!this.state.up} value="down" onChange={this.switchDirection}/>
            <span className="checkbox-label">Down</span>
          </label>
        </div>
        <div className="hint">This example select direction of menu</div>
      </div>
    );
  }
});


module.exports = SelectDirection;
