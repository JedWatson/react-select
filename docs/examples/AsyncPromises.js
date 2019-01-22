import React, { Component } from 'react';

import AsyncSelect from '../../src/Async';
import { colourOptions } from '../data';

const filterColors = (inputValue: string) => {
  return colourOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = inputValue => {
  console.log('I AM BEING CALLED');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });
};

export default class WithPromises extends Component {
  render() {
    return (
      <AsyncSelect
        defaultInputValue="n"
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />
    );
  }
}
