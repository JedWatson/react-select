import React, { Component, Fragment } from 'react';
import Select from 'react-select';

import { colourOptions } from '../data';

const accessibility = {
  valueEventAriaMessage: (event, context) => {
    const { value, isDisabled } = context;
    if (event === 'select-option' && !isDisabled) {
      return `CUSTOM: option ${value} is selected.`;
    }
  }
};

export default class Accessibility extends Component {
  render() {
    return (
      <Fragment>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="color"
          options={colourOptions}
          accessibility={accessibility}
        />
      </Fragment>
    );
  }
}