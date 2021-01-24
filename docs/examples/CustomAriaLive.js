// @flow
import React from 'react';

import Select from 'react-select';
import { colourOptions } from '../data';

export default function CustomAriaLive() {
  return (
    <form>
      <label id="aria-live-select-label" htmlFor="select-aria-live-example">
        Select a color
      </label>

      <Select
        aria-labelledby="aria-live-select-label"
        // ariaLiveMessages={{
        //   focusOption: ({ focusedOption, getOptionLabel }) => {
        //     return `custom aria option focus message:
        //       ${getOptionLabel(focusedOption)}`;
        //   },
        // }}
        inputId="select-aria-live-example"
        name="aria-live-color"
        options={colourOptions}
        menuIsOpen
      />
    </form>
  );
}
