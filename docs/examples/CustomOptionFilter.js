import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { colourOptions } from '../data';

const customOptionFilter = (option, inputValue) => {
  const expr = new RegExp(`^${inputValue}`);
  return expr.test(option.label);
}

export default class SelectCreateFilter extends Component<*, State> {
  render () {
    return (
      <Fragment>
        <Select
          defaultValue={colourOptions[0]}
          isClearable
          isSearchable
          name="color"
          options={colourOptions}
          filterOption={customOptionFilter}
        />
      </Fragment>
    );
  }
}
