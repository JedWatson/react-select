// @flow

import React, { Component } from 'react';

import Select from '../../src';

const pageSizes = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
];

export default class PageSize extends Component<*, { pageSize: number }> {
  state = { pageSize: 1 }

  onChange = (option: { value: number, label: string }) => {
    this.setState({ pageSize: option.value });
  }
  render() {
    return (
        <Select
          defaultValue={pageSizes[0]}
          pageSize={this.state.pageSize}
          options={pageSizes}
          onChange={this.onChange}
        />
    );
  }
}
