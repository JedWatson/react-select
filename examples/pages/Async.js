// @flow

import React, { Component } from 'react';
import { withValue } from 'react-value';

import AsyncSelect from '../../src/Async';
import { colourOptions } from '../data';

const SelectWithValue = withValue(AsyncSelect);
type State = {};

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const filterColors = (inputValue: string) =>
  colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};

// const asyncOptions = async inputValue => {
//   await delay(1000);
//   return filterColors(inputValue);
// };

export default class App extends Component<*, State> {
  state = {};
  render() {
    return (
      <div>
        <h1>new-select</h1>
        <p>A sandbox for the new react-select</p>

        <h2>Async</h2>
        <div>
          <SelectWithValue autoFocus loadOptions={loadOptions} defaultOptions />
        </div>
        {/* <SelectWithValue autoFocus loadOptions={asyncOptions} /> */}
      </div>
    );
  }
}
