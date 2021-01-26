import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
import { ColourOption, colourOptions } from '../data';
import { ActionMeta, ValueType } from 'react-select';

export default class CreatableSingle extends Component {
  handleChange = (
    newValue: ValueType<ColourOption, false>,
    actionMeta: ActionMeta<ColourOption>
  ) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    return (
      <CreatableSelect
        isClearable
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={colourOptions}
      />
    );
  }
}
