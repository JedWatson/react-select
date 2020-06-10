import React from 'react';
import Select from 'react-select';

import { colourOptions } from '../data';

const NoDefaultMenuOptionFocus = () => (
  <Select
    options={colourOptions}
    focusDefaultOption={false}
  />
);

export default NoDefaultMenuOptionFocus;
