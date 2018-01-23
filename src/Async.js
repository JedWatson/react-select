// @flow

import React, { Component } from 'react';
import Select from './Select';
import { handleInputChange } from './utils';
import type { OptionsType } from './types';

type Props = {
  defaultOptions: OptionsType | boolean,
  loadOptions: (string, (any, OptionsType) => void) => void,
  onInputChange?: string => void,
  cacheOptions: any,
};

const defaultProps = {
  cacheOptions: false,
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
  optionsCache: { [string]: OptionsType } = {};
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
  componentWillReceiveProps(nextProps: Props) {
    // if the cacheOptions prop changes, clear the cache
    if (nextProps.cacheOptions !== this.props.cacheOptions) {
      this.optionsCache = {};
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  handleInputChange = (newValue: string) => {
    const { cacheOptions, onInputChange } = this.props;
    const inputValue = handleInputChange(newValue, onInputChange);
    if (!inputValue) {
      delete this.lastRequest;
      this.setState({
        inputValue: '',
        loadedInputValue: '',
        loadedOptions: [],
        isLoading: false,
      });
      return;
    }
    if (cacheOptions && this.optionsCache[inputValue]) {
      this.setState({
        inputValue,
        loadedInputValue: inputValue,
        loadedOptions: this.optionsCache[inputValue],
        isLoading: false,
      });
    } else {
      const request = (this.lastRequest = {});
      this.setState({ inputValue, isLoading: true }, () => {
        this.props.loadOptions(inputValue, options => {
          if (!this.mounted || !options) return;
          this.optionsCache[inputValue] = options;
          if (request !== this.lastRequest) return;
          delete this.lastRequest;
          this.setState({
            isLoading: false,
            loadedInputValue: inputValue,
            loadedOptions: options,
          });
        });
      });
    }
    return inputValue;
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
