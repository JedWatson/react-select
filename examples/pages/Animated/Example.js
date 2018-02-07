import React from 'react';
import { withValue } from 'react-value';

import Select from '../../../src';
import * as Animated from '../../../src/animated';

import { colourOptions } from '../../data';

const SelectWithValue = withValue(Select);
export default () => (
  <div id="cypress-multi-animated">
    <SelectWithValue
      autoFocus
      closeMenuOnSelect={false}
      components={Animated}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
    />
  </div>
);
