import React from 'react';
import { withValue } from 'react-value';
import { colourOptions } from '../../data';
import Select from '../../../src';
import chroma from 'chroma-js';

const SelectWithValue = withValue(Select);

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
};

const colourStylesMulti = {
  ...colourStyles,
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

export default () => (
  <SelectWithValue
    closeMenuOnSelect={false}
    defaultValue={[colourOptions[0], colourOptions[1]]}
    isMulti
    options={colourOptions}
    styles={colourStylesMulti}
  />
);
