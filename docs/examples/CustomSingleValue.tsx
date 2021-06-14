import React, { Component } from 'react';
import Select, { components, SingleValueProps } from 'react-select';
import { ColourOption, colourOptions } from '../data';

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<ColourOption>) => (
  <components.SingleValue {...props}>{children}</components.SingleValue>
);

export default class CustomControl extends Component {
  render() {
    return (
      <Select
        defaultValue={colourOptions[0]}
        isClearable
        styles={{
          singleValue: (base) => ({
            ...base,
            padding: 5,
            borderRadius: 5,
            background: colourOptions[2].color,
            color: 'white',
            display: 'flex',
          }),
        }}
        components={{ SingleValue }}
        isSearchable
        name="color"
        options={colourOptions}
      />
    );
  }
}
