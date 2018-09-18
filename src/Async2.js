// @flow
import React, { Component, type ComponentType, type ElementRef } from 'react';
import Select, { type Props as SelectProps } from './Select';
import manageState from './stateManager';
import type { OptionsType } from './types';

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
  isLoading: boolean,
  loadedInputValue?: string,
  loadedOptions: OptionsType,
  passEmptyOptions: boolean,
};

export const makeAsyncSelect = (SelectComponent: ComponentType<*>) => {
  return class Async extends Component<Props, State> {
    static defaultProps = defaultProps;
    select: ElementRef<*>;
    lastRequest = {};
    mounted: boolean = false;
    optionsCache: { [string]: OptionsType } = {};

    constructor(props: Props) {
      super(props);
      this.state = {
        defaultOptions: Array.isArray(props.defaultOptions)
          ? props.defaultOptions
          : undefined,
        isLoading: props.defaultOptions === true ? true : false,
        loadedOptions: [],
        passEmptyOptions: false,
      };
    }
    componentDidMount () {
      this.mounted = true;
      console.log('INPUT VALUE', this.props.inputValue);
      if (this.props.defaultOptions === true) {
        if (this.props.inputValue) {
          this.handleInputChange(this.props.inputValue);
        } else {
          this.loadOptions('', options => {
            if (!this.mounted) return;
            const isLoading = !!this.lastRequest;
            this.setState({ defaultOptions: options || [], isLoading });
          });
        }
      }
    }

    componentWillReceiveProps (nextProps: Props) {
      if (nextProps.cacheOptions !== this.props.cacheOptions) {
        this.optionsCache = {};
      }
      if (nextProps.defaultOptions !== this.props.defaultOptions) {
        this.setState({
          defaultOptions: Array.isArray(nextProps.defaultOptions)
            ? nextProps.defaultOptions
            : undefined,
        });
      }
      if (nextProps.inputValue !== this.props.inputValue) {
        this.handleInputChange(nextProps.inputValue);
      }
    }
    getAsyncSelectRef = (ref: ElementRef<*>) => {
      this.select = ref;
    }
    handleInputChange = async (inputValue: string) => {
      const { cacheOptions } = this.props;
      if (!inputValue) {
        delete this.lastRequest;
        await this.setState({
          loadedInputValue: '',
          loadedOptions: [],
          isLoading: false,
          passEmptyOptions: false,
        });
      }

      if (cacheOptions && this.optionsCache[inputValue]) {
        await this.setState({
          loadedInputValue: inputValue,
          loadedOptions: this.optionsCache[inputValue],
          isLoading: false,
          passEmptyOptions: false,
        });
      } else {
        const request = (this.lastRequest = {});
        await this.setState({
          isLoading: true,
          passEmptyOptions: !this.state.loadedInputValue,
        });
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
    }

    loadOptions(inputValue: string, callback: (?Array<*>) => void) {
      console.log('loadOptions!!!!');
      const { loadOptions } = this.props;
      if (!loadOptions) return callback();
      const loader = loadOptions(inputValue, callback);
      if (loader && typeof loader.then === 'function') {
        loader.then(callback, () => callback());
      }
    }

    render() {
      const {
        loadOptions,
        inputValue,
        filterOption,
        ...props
      } = this.props;
      const {
        defaultOptions,
        isLoading,
        loadedInputValue,
        loadedOptions,
        passEmptyOptions,
      } = this.state;
      const options = passEmptyOptions
        ? []
        : inputValue && loadedInputValue
          ? loadedOptions
          : defaultOptions || [];

      return (
        <SelectComponent
          {...props}
          inputValue={inputValue}
          filterOption={filterOption || null}
          ref={this.getAsyncSelectRef}
          isLoading={isLoading}
          options={options}
        />
      );
    }
  };
};



export default manageState(makeAsyncSelect(Select));
