// @flow

import React, {
  Component,
  type Config,
  type ElementConfig,
  type AbstractComponent,
  type ElementRef,
} from 'react';
import Select, { type Props as SelectProps } from './Select';
import { handleInputChange } from './utils';
import manageState from './stateManager';
import type { OptionsType, InputActionMeta } from './types';

type DefaultAsyncProps = {|
  /* The default set of options to show before the user starts searching. When
     set to `true`, the results for loadOptions('') will be autoloaded. */
  defaultOptions: OptionsType | boolean,
  /* If cacheOptions is truthy, then the loaded data will be cached. The cache
    will remain until `cacheOptions` changes value. */
  cacheOptions: any,
|};
export type AsyncProps = {
  ...DefaultAsyncProps,
  /* Function that returns a promise, which is the set of options to be used
     once the promise resolves. */
  loadOptions: (string, (OptionsType) => void) => Promise<*> | void,
  /* Same behaviour as for Select */
  onInputChange?: (string, InputActionMeta) => void,
  /* Same behaviour as for Select */
  inputValue?: string,
  /* Will cause the select to be displayed in the loading state, even if the
     Async select is not currently waiting for loadOptions to resolve */
  isLoading: boolean,
  /* Will prevent menu position and size recalculation on async data
     load finish */
  preventMenuPositionRecalculation: boolean,
};

export type Props = SelectProps & AsyncProps;

export const defaultProps = {
  cacheOptions: false,
  defaultOptions: false,
  filterOption: null,
  isLoading: false,
  preventMenuPositionRecalculation: false,
};

type State = {
  defaultOptions?: OptionsType,
  inputValue: string,
  isLoading: boolean,
  loadedInputValue?: string,
  loadedOptions: OptionsType,
  passEmptyOptions: boolean,
  optionsCache: { [string]: OptionsType },
  prevDefaultOptions: OptionsType | boolean | void,
  prevCacheOptions: any | void,
};

export const makeAsyncSelect = <C: {}>(
  SelectComponent: AbstractComponent<C>
): AbstractComponent<C & Config<AsyncProps, DefaultAsyncProps>> =>
  class Async extends Component<C & AsyncProps, State> {
    static defaultProps = defaultProps;
    select: ElementRef<*>;
    lastRequest: {};
    mounted: boolean = false;
    constructor(props: C & AsyncProps) {
      super();
      this.state = {
        defaultOptions: Array.isArray(props.defaultOptions)
          ? props.defaultOptions
          : undefined,
        inputValue:
          typeof props.inputValue !== 'undefined' ? props.inputValue : '',
        isLoading: props.defaultOptions === true,
        loadedOptions: [],
        passEmptyOptions: false,
        optionsCache: {},
        prevDefaultOptions: undefined,
        prevCacheOptions: undefined,
      };
    }
    static getDerivedStateFromProps(props: C & AsyncProps, state: State) {
      const newCacheOptionsState =
        props.cacheOptions !== state.prevCacheOptions
          ? {
              prevCacheOptions: props.cacheOptions,
              optionsCache: {},
            }
          : {};
      const newDefaultOptionsState =
        props.defaultOptions !== state.prevDefaultOptions
          ? {
              prevDefaultOptions: props.defaultOptions,
              defaultOptions: Array.isArray(props.defaultOptions)
                ? props.defaultOptions
                : undefined,
            }
          : {};
      return {
        ...newCacheOptionsState,
        ...newDefaultOptionsState,
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
    componentWillUnmount() {
      this.mounted = false;
    }
    focus() {
      this.select.focus();
    }
    blur() {
      this.select.blur();
    }
    recalculateMenuPlacement = () => {
      if (this.select?.select?.menuPlacerRef) {
        this.select.select.menuPlacerRef.recalculatePlacement();
      }
    }
    loadOptions(inputValue: string, callback: (?Array<*>) => void) {
      const { loadOptions } = this.props;
      if (!loadOptions) return callback();

      const wrappedCallback = (...args) => {
        callback(...args);
        if (!this.props.preventMenuPositionRecalculation) {
          this.recalculateMenuPlacement();
        }
      };

      const loader = loadOptions(inputValue, wrappedCallback);
      if (loader && typeof loader.then === 'function') {
        loader.then(wrappedCallback, () => callback());
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
      if (cacheOptions && this.state.optionsCache[inputValue]) {
        this.setState({
          inputValue,
          loadedInputValue: inputValue,
          loadedOptions: this.state.optionsCache[inputValue],
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
              if (request !== this.lastRequest) return;
              delete this.lastRequest;
              this.setState(state => ({
                isLoading: false,
                loadedInputValue: inputValue,
                loadedOptions: options || [],
                passEmptyOptions: false,
                optionsCache: options
                  ? { ...state.optionsCache, [inputValue]: options }
                  : state.optionsCache,
              }));
            });
          }
        );
      }
      return inputValue;
    };
    render() {
      const { loadOptions, isLoading: isLoadingProp, ...props } = this.props;
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
          isLoading={isLoading || isLoadingProp}
          onInputChange={this.handleInputChange}
        />
      );
    }
  };

const SelectState = manageState<ElementConfig<typeof Select>>(Select);

export default makeAsyncSelect<ElementConfig<typeof SelectState>>(SelectState);
