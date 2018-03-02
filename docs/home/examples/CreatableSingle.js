import React, { Component } from 'react';

import CreatableSelect from '../../../src/Creatable';
import { colourOptions } from '../../data';
import ExampleWrapper from '../../ExampleWrapper';

export default class CreatableSingle extends Component<*, State> {
  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    return (
      <ExampleWrapper
        label="Creatable Example"
        urlPath="docs/home/examples/CreatableSingle.js"
      >
        <CreatableSelect
          isClearable
          onChange={this.handleChange}
          options={colourOptions}
        />
      </ExampleWrapper>
    );
  }
}
