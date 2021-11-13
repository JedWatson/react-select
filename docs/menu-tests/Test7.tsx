import React from 'react';
import Select from 'react-select';
import { colourOptions } from '../data';
import {
  scrollContainerHeight,
  selectHeightWithMenuOpen,
  viewportHeight,
} from './menuHeights';

const spaceAboveScrollContainer = 200;
const spaceAboveSelect = scrollContainerHeight - selectHeightWithMenuOpen + 1;

export default function Test7() {
  return (
    <div id="menu-tests-container" style={{ height: viewportHeight }}>
      <div style={{ height: spaceAboveScrollContainer }} />
      <div
        id="menu-tests-scroll-container"
        style={{ overflow: 'auto', height: scrollContainerHeight }}
      >
        <div style={{ height: scrollContainerHeight + 1 }}>
          <div style={{ height: spaceAboveSelect }} />
          <Select
            id="menu-tests-select"
            classNamePrefix="react-select"
            options={colourOptions}
          />
        </div>
      </div>
    </div>
  );
}
