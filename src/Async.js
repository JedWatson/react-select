// @flow

import React, { Component } from 'react';
import Select from './Select';
import type { OptionsType } from './types';

type Props = {
  loadOptions: (string, (any, OptionsType) => void) => void,
};

type State = {
  isLoading: boolean,
  options: OptionsType,
};

export default class Async extends Component<Props, State> {
  state = {
    isLoading: false,
    options: [],
  };
  lastRequest: {};
  mounted: boolean = false;
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  handleInputChange = (inputValue: string) => {
    const request = (this.lastRequest = {});
    this.setState({ isLoading: true }, () => {
      this.props.loadOptions(inputValue, (err, options) => {
        if (!this.mounted || request !== this.lastRequest) return;
        this.setState({ isLoading: false, options });
      });
    });
  };
  render() {
    const { loadOptions, ...props } = this.props;
    const { options, isLoading } = this.state;
    return (
      <Select
        {...props}
        options={options}
        filterOption={null}
        isLoading={isLoading}
        displayMenu={!options}
        onInputChange={this.handleInputChange}
      />
    );
  }
}
