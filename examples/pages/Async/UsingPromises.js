import React, { Component } from 'react';
import { withValue } from 'react-value';

import AsyncSelect from '../../../src/Async';
import { colourOptions } from '../../data';

const SelectWithValue = withValue(AsyncSelect);
type State = {
  inputValue: string,
};

const filterColors = (inputValue: string) =>
  colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default class WithCallbacks extends Component<*, State> {
  state = { inputValue: '' };
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <SelectWithValue
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />
    );
  }
}
