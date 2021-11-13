import React from 'react';
import Select from 'react-select';
import { colourOptions } from '../data';
import { selectHeightWithMenuOpen, viewportHeight } from './menuHeights';

const scrollHeight = viewportHeight + 1;
const spaceAbove = viewportHeight - selectHeightWithMenuOpen + 1;

export default function Test2() {
  return (
    <div style={{ height: scrollHeight }}>
      <div style={{ height: spaceAbove }} />
      <Select
        id="menu-tests-select"
        classNamePrefix="react-select"
        options={colourOptions}
      />
    </div>
  );
}
