// @flow

import React, { Component, type ComponentType, type ElementRef } from 'react';
import Select, { type Props as SelectProps } from './Select';
import { handleInputChange } from './utils';
import manageState from './stateManager';
import type { OptionsType, InputActionMeta } from './types';

export type AsyncProps = {
  /* The default set of options to show before the user starts searching. When
     set to `true`, the results for loadOptions('') will be autoloaded. */
  defaultOptions: OptionsType | boolean,
  /* Function that returns a promise, which is the set of options to be used
     once the promise resolves. */
  loadOptions: (string, (OptionsType) => void) => Promise<*> | void,
  /* If cacheOptions is truthy, then the loaded data will be cached. The cache
     will remain until `cacheOptions` changes value. */
  cacheOptions: any,
};

export type Props = SelectProps & AsyncProps;

export const defaultProps = {
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

export const makeAsyncSelect = (SelectComponent: ComponentType<*>) =>
  class Async extends Component<Props, State> {
    static defaultProps = defaultProps;
    select: ElementRef<*>;
    lastRequest: {};
    mounted: boolean = false;
    optionsCache: { [string]: OptionsType } = {};
    constructor(props: Props) {
      super();
      this.state = {
        loadedOptions: Array.isArray(props.defaultOptions)
          ? props.defaultOptions
          : [],
        inputValue: '',
        isLoading: props.defaultOptions === true ? true : false,
        passEmptyOptions: false,
      };
    }
    componentDidMount() {
      this.mounted = true;
      const { defaultOptions } = this.props;
      if (defaultOptions === true) {
        this.loadDefaultOptions();
      }
    }
    loadDefaultOptions = () => {
      this.loadOptions('', options => {
        if (!this.mounted) return;
        const isLoading = !!this.lastRequest;
        this.optionsCache[''] = options || [];
        this.setState({ loadedOptions: options || [], isLoading });
      });
    }
    componentWillReceiveProps(nextProps: Props) {
      // if the cacheOptions prop changes, clear the cache
      if (nextProps.cacheOptions !== this.props.cacheOptions) {
        this.optionsCache = {};
      }
      if (nextProps.defaultOptions !== this.props.defaultOptions) {
        this.setState({
          loadedOptions: Array.isArray(nextProps.defaultOptions)
            ? nextProps.defaultOptions
            : [],
        });
      }

    }
    componentWillUnmount() {
      this.mounted = false;
    }
    focus() {
      this.select.focus();
    }
    blur() {
      this.select.blur();
    }
    loadOptions(inputValue: string, callback: (?Array<*>) => void) {
      const { loadOptions } = this.props;
      if (!loadOptions) return callback();
      const loader = loadOptions(inputValue, callback);
      if (loader && typeof loader.then === 'function') {
        loader.then(callback, () => callback());
      }
    }
    handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
      const { defaultOptions, cacheOptions, onInputChange } = this.props;
      // TODO
      const inputValue = handleInputChange(newValue, actionMeta, onInputChange);

      // If we are caching options, then load from cache
      if ((cacheOptions && this.optionsCache[inputValue]) ||
          // If we have default values and the input is empty, load from the cache
          (!inputValue && Array.isArray(defaultOptions))) {
        this.setState({
          inputValue,
          loadedInputValue: inputValue,
          loadedOptions: this.optionsCache[inputValue],
          isLoading: false,
          passEmptyOptions: false,
        });
      } else {
        // Otherwise, make the request
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
      const { defaultOptions, loadOptions, ...props } = this.props;
      const {
        inputValue,
        isLoading,
        loadedOptions,
        passEmptyOptions,
      } = this.state;
      const options = passEmptyOptions
        ? []
        : (!inputValue && Array.isArray(defaultOptions)) ? defaultOptions : loadedOptions || [];
      return (
        // $FlowFixMe
        <SelectComponent
          {...props}
          filterOption={this.props.filterOption || null}
          ref={ref => {
            this.select = ref;
          }}
          options={options}
          isLoading={isLoading}
          onInputChange={this.handleInputChange}
        />
      );
    }
  };

export default makeAsyncSelect(manageState(Select));
