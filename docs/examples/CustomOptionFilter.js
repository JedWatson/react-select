import React, { Component, Fragment } from 'react';
import Select from '../../src';
import { colourOptions } from '../data';

export default class SelectCreateFilter extends Component<*, State> {
  customOptionFilter = (option, inputValue) => () => {
    const expr = new RegExp(`^${inputValue}`, 'i');
    return expr.test(option.label);
  }
  render () {
    return (
      <Fragment>
        <Select
          defaultValue={colourOptions[0]}
          isClearable
          isSearchable
          name="color"
          options={colourOptions}
          filterOption={this.customOptionFilter}
        />
      </Fragment>
    );
  }
}
