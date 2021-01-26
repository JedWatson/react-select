import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
import { ColourOption, colourOptions } from '../data';
import { ActionMeta, ValueType } from 'react-select';

export default class CreatableMulti extends Component<{}> {
  handleChange = (
    newValue: ValueType<ColourOption, true>,
    actionMeta: ActionMeta<ColourOption>
  ) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    return (
      <CreatableSelect
        isMulti
        onChange={this.handleChange}
        options={colourOptions}
      />
    );
  }
}
