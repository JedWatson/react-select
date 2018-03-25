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
  loadOptions: ((string, (OptionsType) => void) => Promise<*> | void) &
		((string, number, (OptionsType) => void) => Promise<*> | void),
  /* If cacheOptions is truthy, then the loaded data will be cached. The cache
     will remain until `cacheOptions` changes value. */
  cacheOptions: any,
  /* Indicate that loadOptions should be called with page
    and to also trigger it when the user scrolls to the bottom of the options. */
  pagination: boolean,
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
  page: number,
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
    optionsCache: {
      [string]: {
        options: OptionsType,
        page: number,
        hasReachedLastPage: boolean,
      },
    } = {};
    constructor(props: Props) {
      super();
      this.state = {
        defaultOptions: Array.isArray(props.defaultOptions)
          ? props.defaultOptions
          : undefined,
        inputValue: '',
        isLoading: props.defaultOptions === true ? true : false,
        page: 0,
        loadedOptions: [],
        passEmptyOptions: false,
      };
    }
    componentDidMount() {
      this.mounted = true;
      const { defaultOptions } = this.props;
      if (defaultOptions === true) {
        this.optionsFromCacheOrLoad('');
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
    focus() {
      this.select.focus();
    }
    blur() {
      this.select.blur();
    }
    loadOptions(
      inputValue: string,
      page: number,
      callback: (?Array<*>) => void
    ) {
      const { loadOptions, pagination } = this.props;
      if (!loadOptions) return callback();
      const loader = pagination
        ? loadOptions(inputValue, page, callback)
        : loadOptions(inputValue, callback);
      if (loader && typeof loader.then === 'function') {
        loader.then(callback, () => callback());
      }
    }
    optionsFromCacheOrLoad(inputValue: string, page: number = 1) {
      const { cacheOptions, pagination } = this.props;
      const cache = this.optionsCache[inputValue];
      if (cacheOptions && cache && cache.options) {
        this.setState({
          inputValue,
          loadedInputValue: inputValue,
          loadedOptions: cache.options,
          isLoading: false,
          page: cache.page,
          passEmptyOptions: false,
        });
        if (
          !pagination ||
          (pagination && (cache.page >= page || cache.hasReachedLastPage))
        ) {
          return;
        }
      }
      const request = (this.lastRequest = {});
      this.setState(
        {
          inputValue,
          isLoading: true,
          passEmptyOptions: !this.state.loadedInputValue,
        },
        () => {
          this.loadOptions(inputValue, page, options => {
            if (!this.mounted) return;
            if (options) {
              const hasReachedLastPage = pagination && options.length === 0;
              if (page > 1) {
                options = this.state.loadedOptions.concat(options);
              }
              this.optionsCache[inputValue] = {
                options,
                hasReachedLastPage,
                page,
              };
            }
            if (request !== this.lastRequest) return;
            delete this.lastRequest;
            this.setState({
              isLoading: false,
              page,
              loadedInputValue: inputValue,
              loadedOptions: options || [],
              passEmptyOptions: false,
              defaultOptions:
                page === 1 && !inputValue
                  ? options || this.state.defaultOptions
                  : [],
            });
          });
        }
      );
    }
    handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
      const inputValue = handleInputChange(
        newValue,
        actionMeta,
        this.props.onInputChange
      );
      this.optionsFromCacheOrLoad(inputValue);
      return inputValue;
    };
    handleMenuScrollToBottom = () => {
      if (!this.props.pagination || this.state.isLoading) return;
      this.optionsFromCacheOrLoad(this.state.inputValue, this.state.page + 1);
    };
    render() {
      const { loadOptions, pagination, ...props } = this.props;
      const {
        defaultOptions,
        inputValue,
        isLoading,
        loadedInputValue,
        loadedOptions,
        passEmptyOptions,
        page,
      } = this.state;
      const options =
        !pagination && passEmptyOptions
          ? []
          : (inputValue && loadedInputValue) || page > 1
            ? loadedOptions
            : defaultOptions || [];
      return (
        // $FlowFixMe
        <SelectComponent
          {...props}
          ref={ref => {
            this.select = ref;
          }}
          options={options}
          filterOption={null}
          isLoading={isLoading}
          onInputChange={this.handleInputChange}
          onMenuScrollToBottom={this.handleMenuScrollToBottom}
        />
      );
    }
  };

export default makeAsyncSelect(manageState(Select));
