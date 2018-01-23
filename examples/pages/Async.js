// @flow

import React, { Component } from 'react';
import { withValue } from 'react-value';

import AsyncSelect from '../../src/Async';
import { colourOptions } from '../data';

const SelectWithValue = withValue(AsyncSelect);
type State = {
  inputValue: string,
};

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
  state = { inputValue: '' };
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <div>
        <h1>new-select</h1>
        <p>A sandbox for the new react-select</p>

        <h2>Async</h2>
        <div>
          <pre>inputValue: "{this.state.inputValue}"</pre>
          <SelectWithValue
            autoFocus
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            onInputChange={this.handleInputChange}
          />
        </div>
        {/* <SelectWithValue autoFocus loadOptions={asyncOptions} /> */}
      </div>
    );
  }
}
