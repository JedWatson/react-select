import React from 'react';

import Select from '../../../src';
import { colourOptions } from '../../data';
import ExampleWrapper from '../../ExampleWrapper';

export default () => (
  <ExampleWrapper label="Multi" urlPath="/docs/home/examples/BasicMulti.js">
    <Select
      defaultValue={[colourOptions[2], colourOptions[3]]}
      isMulti
      name="colors"
      options={colourOptions}
    />
  </ExampleWrapper>
);
