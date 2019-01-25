// @flow

import React, {
  Component,
  type ElementConfig,
  type AbstractComponent,
  type ElementRef,
} from 'react';
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
  onInputChange: (string, InputActionMeta) => void,
  inputValue: string,
};

export type Props = SelectProps & AsyncProps;

export const defaultProps = {
  cacheOptions: false,
  defaultOptions: false,
  filterOption: null,
};

type State = {
  defaultOptions?: OptionsType,
  inputValue: string,
  isLoading: boolean,
  loadedInputValue?: string,
  loadedOptions: OptionsType,
  passEmptyOptions: boolean,
};

export const makeAsyncSelect = <C: {}>(
  SelectComponent: AbstractComponent<C>
): AbstractComponent<C & AsyncProps> =>
  class Async extends Component<C & AsyncProps, State> {
    static defaultProps = defaultProps;
    select: ElementRef<*>;
    lastRequest: {};
    mounted: boolean = false;
    optionsCache: { [string]: OptionsType } = {};
    constructor(props: C & AsyncProps) {
      super();
      this.state = {
        defaultOptions: Array.isArray(props.defaultOptions)
          ? props.defaultOptions
          : undefined,
        inputValue:
          typeof props.inputValue !== 'undefined' ? props.inputValue : '',
        isLoading: props.defaultOptions === true ? true : false,
        loadedOptions: [],
        passEmptyOptions: false,
      };
    }
    componentDidMount() {
      this.mounted = true;
      const { defaultOptions } = this.props;
      const { inputValue } = this.state;
      if (defaultOptions === true) {
        this.loadOptions(inputValue, options => {
          if (!this.mounted) return;
          const isLoading = !!this.lastRequest;
          this.setState({ defaultOptions: options || [], isLoading });
        });
      }
    }
    componentWillReceiveProps(nextProps: C & AsyncProps) {
      // if the cacheOptions prop changes, clear the cache
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
      const { cacheOptions, onInputChange } = this.props;
      // TODO
      const inputValue = handleInputChange(newValue, actionMeta, onInputChange);
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
        : inputValue && loadedInputValue
        ? loadedOptions
        : defaultOptions || [];
      return (
        <SelectComponent
          {...props}
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

const SelectState = manageState<ElementConfig<typeof Select>>(Select);

export default makeAsyncSelect<ElementConfig<typeof SelectState>>(SelectState);
