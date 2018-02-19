import React, { Component } from 'react';

import CreatableSelect from '../../../src/Creatable';
import { colourOptions } from '../../data';

type State = {
  inputValue: string,
};

export default class WithCallbacks extends Component<*, State> {
  state = { inputValue: '' };
  handleChange = (newValue: any, actionMeta: any) => {
    console.log('Value changed:', newValue);
    console.log('Action meta:', actionMeta);
  };
  handleCreate = (newOption: any) => {
    console.log('Option created:', newOption);
  };
  render() {
    return (
      <div>
        <CreatableSelect
          autoFocus
          options={colourOptions}
          onChange={this.handleChange}
          onCreateOption={this.handleCreate}
        />
      </div>
    );
  }
}
