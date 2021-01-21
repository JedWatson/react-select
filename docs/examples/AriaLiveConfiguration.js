// @flow
import React from 'react';

import Select from 'react-select';
import { colourOptions } from '../data';

export default function AriaLiveConfiguration() {
  return (
    <form>
      <label id="aria-live-select-label" htmlFor="select-aria-live-example">
        Test form label
      </label>

      <Select
        aria-labelledby="select-label"
        ariaLiveMessages={{
          focusOption: ({ focusedOption, getOptionLabel }) => {
            return `custom aria option focus message: 
              ${getOptionLabel(focusedOption)}`;
          },
        }}
        id="select-aria-live-example"
        name="color"
        options={colourOptions}
      />
    </form>
  );
}
