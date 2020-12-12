import React from 'react';
import Select from 'react-select';

import { colourOptions } from '../data';

const DisableDefaultFocus = () => (
  <Select
    options={colourOptions}
    focusDefaultOption={false}
  />
);

export default DisableDefaultFocus;
