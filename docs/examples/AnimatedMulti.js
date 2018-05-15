// @flow

import React from 'react';

import Select from '../../src';
import * as Animated from '../../src/animated';
import { colourOptions } from '../data';

export default function AnimatedMulti() {
  return (
    <Select
      closeMenuOnSelect={false}
      isSearchable={false}
      components={Animated}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
    />
  );
}
