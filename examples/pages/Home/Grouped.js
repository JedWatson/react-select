import React from 'react';
import { withValue } from 'react-value';
import Select from '../../../src';
import { colourOptions, groupedOptions } from '../../data';

const SelectWithValue = withValue(Select);

export default () => (
  <SelectWithValue defaultValue={colourOptions[1]} options={groupedOptions} />
);
