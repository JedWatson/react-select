import React, { Component } from 'react';

import CreatableSelect from '../../../src/Creatable';
import { colourOptions } from '../../data';
import ExampleWrapper from '../../ExampleWrapper';

export default class CreatableMulti extends Component<*, State> {
  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    return (
      <ExampleWrapper
        label="Creatable Multiselect Example"
        urlPath="/docs/pages/Creatable/CreatableMulti.js"
      >
        <CreatableSelect
          isMulti
          onChange={this.handleChange}
          options={colourOptions}
        />
      </ExampleWrapper>
    );
  }
}
