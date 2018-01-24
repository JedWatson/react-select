// @flow
// @glam

import React, { Component } from 'react';
import { withValue } from 'react-value';
import chroma from 'chroma-js';

import Select from '../../src';
import { colourOptions } from '../data';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex ',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: ' ',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

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
          ? chroma.contrast(color, 'white') > 4.5 ? 'white' : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
};

const colourStylesSingle = {
  ...colourStyles,
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
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

const SelectWithValue = withValue(Select);
type State = {};

export default class StyledApp extends Component<*, State> {
  state = {};
  render() {
    return (
      <div>
        <h1>Styled</h1>
        <p>Style individual component with custom css.</p>

        <h2>Colours</h2>
        <SelectWithValue
          autoFocus
          defaultValue={colourOptions[4]}
          label="Single select"
          options={colourOptions}
          styles={colourStylesSingle}
        />

        <h4>Multi Select</h4>
        <SelectWithValue
          styles={colourStylesMulti}
          defaultValue={[colourOptions[2], colourOptions[3]]}
          isMulti
          options={colourOptions}
        />
      </div>
    );
  }
}
