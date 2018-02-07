import React from 'react';
import { withValue } from 'react-value';
import Select from '../../../src';
import { colourOptions } from '../../data';

const SelectWithValue = withValue(Select);

export default () => (
  <SelectWithValue
    defaultValue={[colourOptions[2], colourOptions[3]]}
    isMulti
    name="colors"
    options={colourOptions}
  />
);
