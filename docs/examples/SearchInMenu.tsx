import React from 'react';

import Select from 'react-select';
import { colourOptions } from '../data';

export default () => (
  <Select
    defaultValue={[colourOptions[2]]}
    isMulti
    searchInMenu
    name="colors"
    options={colourOptions}
  />
);
