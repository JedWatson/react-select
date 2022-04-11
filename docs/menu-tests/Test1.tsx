import React from 'react';
import Select from 'react-select';
import { colourOptions } from '../data';
import { selectHeightWithMenuOpen, viewportHeight } from './menuHeights';

const spaceAbove = viewportHeight - selectHeightWithMenuOpen;

export default function Test1() {
  return (
    <div id="menu-tests-container" style={{ height: viewportHeight }}>
      <div style={{ height: spaceAbove }} />
      <Select
        id="menu-tests-select"
        classNamePrefix="react-select"
        options={colourOptions}
      />
    </div>
  );
}
