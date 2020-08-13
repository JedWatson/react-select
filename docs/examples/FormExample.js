// @flow
import React, { Component } from 'react';

import Select from 'react-select';
import { colourOptions } from '../data';


export default class FormExample extends Component<*> {
  render() {
    return (
      <form>
        <label id="select-label" htmlFor="select-example">
          Test form label
        </label>

        <Select
          aria-labelledby="select-label"
          accessibility={{
            optionFocusAriaMessage:
              ({ focusedOption, getOptionLabel }) => {
                return `custom aria option focus message: ${getOptionLabel(focusedOption)}`;
              }
          }}
          id="select-example"
          className="basic-single"
          classNamePrefix="select"
          name="color"
          options={colourOptions}
        />
      </form>
    );
  }
}
