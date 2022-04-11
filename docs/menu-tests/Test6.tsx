import React from 'react';
import Select from 'react-select';
import { colourOptions } from '../data';
import { scrollContainerHeight, viewportHeight } from './menuHeights';

const spaceAboveScrollContainer = 200;

export default function Test6() {
  return (
    <div id="menu-tests-container" style={{ height: viewportHeight }}>
      <div style={{ height: spaceAboveScrollContainer }} />
      <div
        id="menu-tests-scroll-container"
        style={{ overflow: 'auto', height: scrollContainerHeight }}
      >
        <Select
          id="menu-tests-select"
          classNamePrefix="react-select"
          options={colourOptions}
        />
      </div>
    </div>
  );
}
