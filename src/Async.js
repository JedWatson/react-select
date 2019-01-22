// @flow

import React, {
  Component,
  type ElementConfig,
  type AbstractComponent,
  type ElementRef,
} from 'react';
import Select, { type Props as SelectProps } from './Select';
import manageState from './stateManager';
import type { OptionsType, InputActionMeta, OptionType } from './types';

export type AsyncProps = {
  /** inputValue */
  inputValue: string,
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
  filterOption: (({ label: string, value: string, data: OptionType }, string) => boolean) | null,
};

export type Props = SelectProps & AsyncProps;

export const defaultProps = {
  cacheOptions: false,
  defaultOptions: false,
  filterOption: null,
};

type State = {
  defaultOptions?: OptionsType,
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
    componentDidMount() {
      this.mounted = true;
      const { defaultOptions, inputValue } = this.props;
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

      if (nextProps.inputValue !== this.props.inputValue) {
        this.handleInputChange(nextProps.inputValue);
      }

    }
    componentWillUnmount() {
      this.mounted = false;
    }
    getAsyncSelectRef = (ref: ElementRef<*>) => {
      this.select = ref;
    }
    focus() {
      this.select.focus();
    }
    blur() {
      this.select.blur();
    }

    handleInputChange = (inputValue: string) => {
      const { cacheOptions } = this.props;
      if (!inputValue) {
        delete this.lastRequest;
        this.setState({
          loadedInputValue: '',
          loadedOptions: [],
          isLoading: false,
          passEmptyOptions: false,
        });
        return;
      }
      if (cacheOptions && this.optionsCache[inputValue]) {
        this.setState({
          loadedInputValue: inputValue,
          loadedOptions: this.optionsCache[inputValue],
          isLoading: false,
          passEmptyOptions: false,
        });
      } else {
        const request = (this.lastRequest = {});
        this.setState({
          isLoading: true,
          passEmptyOptions: !this.state.loadedInputValue,
        }, () => {
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
        });
      }
    };

    loadOptions(inputValue: string, callback: (?Array<*>) => void) {
      const { loadOptions } = this.props;
      if (!loadOptions) return callback();
      const loader = loadOptions(inputValue, callback);
      if (loader && typeof loader.then === 'function') {
        loader.then(callback, () => callback());
      }
    }

    render() {
      const { loadOptions, inputValue, filterOption, ...props } = this.props;
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
          filterOption={filterOption || null}
          inputValue={inputValue}
          isLoading={isLoading}
          options={options}
          ref={this.getAsyncSelectRef}
        />
      );
    }
  };

const AsyncSelect = makeAsyncSelect<ElementConfig<typeof Select>>(Select);
export default manageState<ElementConfig<typeof AsyncSelect>>(AsyncSelect);
