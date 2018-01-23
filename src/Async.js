// @flow

import React, { Component } from 'react';
import Select from './Select';
import type { OptionsType } from './types';

type Props = {
  defaultOptions: OptionsType | boolean,
  loadOptions: (string, (any, OptionsType) => void) => void,
};

const defaultProps = {
  defaultOptions: false,
};

type State = {
  defaultOptions?: OptionsType,
  inputValue: string,
  isLoading: boolean,
  loadedInputValue?: string,
  loadedOptions: OptionsType,
};

export default class Async extends Component<Props, State> {
  static defaultProps = defaultProps;
  lastRequest: {};
  mounted: boolean = false;
  constructor(props: Props) {
    super();
    this.state = {
      defaultOptions: Array.isArray(props.defaultOptions)
        ? props.defaultOptions
        : undefined,
      inputValue: '',
      isLoading: props.defaultOptions === true ? true : false,
      loadedOptions: [],
    };
  }
  componentDidMount() {
    this.mounted = true;
    const { defaultOptions } = this.props;
    if (defaultOptions === true) {
      this.props.loadOptions('', options => {
        if (!this.mounted || !options) return;
        const isLoading = !!this.lastRequest;
        this.setState({ defaultOptions: options, isLoading });
      });
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  handleInputChange = (inputValue: string) => {
    if (!inputValue) {
      delete this.lastRequest;
      this.setState({
        inputValue,
        loadedInputValue: '',
        loadedOptions: [],
        isLoading: false,
      });
      return;
    }
    const request = (this.lastRequest = {});
    this.setState({ inputValue, isLoading: true }, () => {
      this.props.loadOptions(inputValue, options => {
        if (!this.mounted || request !== this.lastRequest || !options) return;
        delete this.lastRequest;
        this.setState({
          isLoading: false,
          loadedInputValue: inputValue,
          loadedOptions: options,
        });
      });
    });
  };
  render() {
    const { loadOptions, ...props } = this.props;
    const {
      defaultOptions,
      inputValue,
      isLoading,
      loadedInputValue,
      loadedOptions,
    } = this.state;
    const options =
      inputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
    return (
      <Select
        {...props}
        options={options}
        filterOption={null}
        isLoading={isLoading}
        onInputChange={this.handleInputChange}
      />
    );
  }
}
