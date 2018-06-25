import React from 'react';

import Select from '../../src';
import { fixedColourOptions } from '../data';

export default () => (
  <Select
    defaultValue={[fixedColourOptions[1], fixedColourOptions[2], fixedColourOptions[3]]}
    isMulti
    name="colors"
    options={fixedColourOptions}
    className="basic-multi-select"
    classNamePrefix="select"
  />
);
