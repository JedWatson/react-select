import React, { Component } from 'react';

import AsyncSelect from '../../src/Async';
import { carOptions } from '../data';

type State = {
  inputValue: string,
};

const filterCars = (inputValue: string, page: number, itemsPerPage: number) =>
  (console.log(inputValue),
  carOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  ).slice((page-1) * itemsPerPage, page * itemsPerPage));

const loadOptions = (inputValue, page, callback) => {
  setTimeout(() => {
    callback(filterCars(inputValue, page, 10));
  }, 1000);
};

export default class WithPagination extends Component<*, State> {
  state = { inputValue: '' };
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <div>
        <pre>inputValue: "{this.state.inputValue}"</pre>
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          pagination
        />
      </div>
    );
  }
}
