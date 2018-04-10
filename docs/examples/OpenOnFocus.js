import React, { Component } from 'react';
import Select from 'react-select';
import { colourOptions } from '../data';

export default class OnSelectResetsInput extends Component {
  state = {
    menuIsOpen: false,
  }
  onFocus = (event) => {
    if (!this.state.menuIsOpen) {
      this.setState(state => ({
        menuIsOpen: !state.menuIsOpen,
      }));
    }
  }
  onBlur = (event) => {
    if (this.state.menuIsOpen) {
      this.setState(state => ({
        menuIsOpen: !state.menuIsOpen,
      }));
    }
  }
  render () {
    const { menuIsOpen } = this.state;
    return (
      <Select
        isMulti
        defaultValue={colourOptions[0]}
        isClearable
        isSearchable
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        name="color"
        options={colourOptions}
        menuIsOpen={menuIsOpen}
      />
    );
  }
};
