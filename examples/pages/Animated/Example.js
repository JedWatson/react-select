import React from 'react';

import Select from '../../../src';
import * as Animated from '../../../src/animated';

import { colourOptions } from '../../data';

export default () => (
  <div id="cypress-multi-animated">
    <Select
      autoFocus
      closeMenuOnSelect={false}
      components={Animated}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
    />
  </div>
);
