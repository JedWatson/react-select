// @flow

import React, { useState } from 'react';
import md from '../../markdown/renderer';
import { colourOptions } from '../../data';
import Select from 'react-select';

const SingleStateManaged = () => {
  const [value, setValue] = useState(colourOptions[0]);
  console.log('State Managed Single Select value is:', value);
  return (
    <Select
      options={colourOptions}
      value={value}
      onChange={newValue => setValue(newValue)}
    />
  );
};

export default function Dev() {
  return md`
  # Single Select
  ## Self-contained
  ${<Select options={colourOptions} />}

  ## State Controlled
  ${<SingleStateManaged />}
`;
}
