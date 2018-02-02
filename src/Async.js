// @flow

import React, { Component } from 'react';
import Select from './Select';
import { handleInputChange } from './utils';
import type { OptionsType } from './types';

type Props = {
  defaultOptions: OptionsType | boolean,
  loadOptions: (string, (OptionsType) => void) => Promise<*> | void,
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
  passEmptyOptions: boolean,
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
      passEmptyOptions: false,
    };
  }
  componentDidMount() {
    this.mounted = true;
    const { defaultOptions } = this.props;
    if (defaultOptions === true) {
      this.loadOptions('', options => {
        if (!this.mounted) return;
        const isLoading = !!this.lastRequest;
        this.setState({ defaultOptions: options || [], isLoading });
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
  loadOptions(inputValue: string, callback: (?Array<*>) => void) {
    const { loadOptions } = this.props;
    if (!loadOptions) return callback();
    const loader = loadOptions(inputValue, callback);
    if (loader && typeof loader.then === 'function') {
      loader.then(callback, () => callback());
    }
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
        passEmptyOptions: false,
      });
      return;
    }
    if (cacheOptions && this.optionsCache[inputValue]) {
      this.setState({
        inputValue,
        loadedInputValue: inputValue,
        loadedOptions: this.optionsCache[inputValue],
        isLoading: false,
        passEmptyOptions: false,
      });
    } else {
      const request = (this.lastRequest = {});
      this.setState(
        {
          inputValue,
          isLoading: true,
          passEmptyOptions: !this.state.loadedInputValue,
        },
        () => {
          this.loadOptions(inputValue, options => {
            if (!this.mounted) return;
            if (options) {
              this.optionsCache[inputValue] = options;
            }
            if (request !== this.lastRequest) return;
            delete this.lastRequest;
            this.setState({
              isLoading: false,
              loadedInputValue: inputValue,
              loadedOptions: options || [],
              passEmptyOptions: false,
            });
          });
        }
      );
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
      passEmptyOptions,
    } = this.state;
    const options = passEmptyOptions
      ? []
      : inputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
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
