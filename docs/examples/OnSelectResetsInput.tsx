import React, { Component } from 'react';
import Select, { InputActionMeta } from 'react-select';
import { colourOptions } from '../data';

interface State {
  readonly menuIsOpen?: boolean;
}

export default class OnSelectResetsInput extends Component<{}, State> {
  state: State = {};
  onInputChange = (inputValue: string, { action, currentValue }: InputActionMeta) => {
    console.log(inputValue, action);
    switch (action) {
      case 'input-change':
        return inputValue;
      case 'menu-close':
        console.log(currentValue);
        let menuIsOpen = undefined;
        if (currentValue) {
          menuIsOpen = true;
        }
        this.setState({
          menuIsOpen,
        });
        return currentValue;
      default:
        return currentValue;
    }
  };
  render() {
    const { menuIsOpen } = this.state;
    return (
      <Select
        isMulti
        defaultValue={colourOptions[0]}
        isClearable
        isSearchable
        onInputChange={this.onInputChange}
        name="color"
        options={colourOptions}
        menuIsOpen={menuIsOpen}
      />
    );
  }
}
