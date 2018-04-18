import React, { Component } from 'react';
import Select, { components } from '../../src';
import { colourOptions } from '../data';


const ValueContainer = ({ children, ...props }) => (
  <components.ValueContainer {...props}>
    {children}
  </components.ValueContainer>
);

type State = {};

export default class CustomValueContainer extends Component<*, State> {
  state = {};
  render() {
    return (
      <Select
        defaultValue={colourOptions[0]}
        isClearable
        styles={{
          singleValue: (base) => ({ ...base, color: 'white' }),
          valueContainer: (base) => ({ ...base, background: '#2684FF', color: 'white', width: '100%' }),
        }}
        components={{ ValueContainer }}
        isSearchable
        name="color"
        options={colourOptions}
      />
    );
  }
}
