import React, { Component } from 'react';
import Select, { components } from 'react-select';
import { colourOptions } from '../data';

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>{children}</components.SingleValue>
);

type State = {};

export default class CustomControl extends Component<*, State> {
  state = {};
  render() {
    return (
      <Select
        defaultValue={colourOptions[0]}
        isClearable
        components={{ SingleValue }}
        isSearchable
        name="color"
        options={colourOptions}
      />
    );
  }
}
