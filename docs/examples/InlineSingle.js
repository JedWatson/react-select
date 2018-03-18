// @flow

import React from 'react';

import Select from '../../src';
import { colourOptions } from '../data';

export default function InlineSingle() {
  return (
    <Select defaultValue={colourOptions[4]} isInline options={colourOptions} />
  );
}
