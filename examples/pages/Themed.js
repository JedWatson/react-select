// @flow

import React, { Component } from 'react';
import { withValue } from 'react-value';

import Select from '../../src';
import { colourOptions } from '../data';

const SelectWithValue = withValue(Select);
type State = {};

export default class ThemedApp extends Component<*, State> {
  state = {};
  render() {
    return (
      <div>
        <h1>new-select</h1>
        <p>A sandbox for the new react-select</p>

        <h2>Themed</h2>
        <div>
          <SelectWithValue
            autoFocus
            options={colourOptions}
            theme={{
              control: ({ isHovered }) => ({
                borderColor: isHovered ? 'red' : 'blue',
                borderWidth: 1,
              }),
            }}
          />
        </div>
      </div>
    );
  }
}
