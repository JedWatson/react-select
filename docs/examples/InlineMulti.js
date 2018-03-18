// @flow

import React from 'react';

import Select from '../../src';
import { colourOptions } from '../data';

export default function InlineMulti() {
  return (
    <Select
      isMulti
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isInline
      options={colourOptions}
    />
  );
}
