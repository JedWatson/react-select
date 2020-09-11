// @flow

import React, {
  Component,
  type Config,
  type Node,
  type AbstractComponent,
  type ElementRef,
  type ElementConfig,
} from 'react';
import Select, { type Props as SelectProps } from './Select';
import type { OptionType, OptionsType, ValueType, ActionMeta, InputActionMeta } from './types';
import { cleanValue } from './utils';

export type DefaultCreatableProps = {|
  /* Allow options to be created while the `isLoading` prop is true. Useful to
     prevent the "create new ..." option being displayed while async results are
     still being loaded. */
  allowCreateWhileLoading: boolean,
  /* Sets the position of the createOption element in your options list. Defaults to 'last' */
  createOptionPosition: 'first' | 'last',
  /* Gets the label for the "create new ..." option in the menu. Is given the
     current input value. */
  formatCreateLabel: string => Node,
  /* Determines whether the "create new ..." option should be displayed based on
     the current input value, select value and options array. */
  isValidNewOption: (string, OptionsType, OptionsType) => boolean,
  /* Returns the data for the new option when it is created. Used to display the
     value, and is passed to `onChange`. */
  getNewOptionData: (string, Node) => OptionType,
|};
export type CreatableProps = {
  ...DefaultCreatableProps,
  /* If provided, this will be called with the input value when a new option is
     created, and `onChange` will **not** be called. Use this when you need more
     control over what happens when new options are created. */
  onCreateOption?: string => void,
  /* Sets the position of the createOption element in your options list. Defaults to 'last' */
  createOptionPosition: 'first' | 'last',
  /* Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string,
  options?: OptionsType,
  inputValue: string,
  value: ValueType,
  isLoading?: boolean,
  isMulti?: boolean,
  onChange: (ValueType, ActionMeta) => void,
  onInputChange: (string, InputActionMeta) => void,
};

export type Props = SelectProps & CreatableProps;

const compareOption = (inputValue = '', option) => {
  const candidate = String(inputValue).toLowerCase();
  const optionValue = String(option.value).toLowerCase();
  const optionLabel = String(option.label).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};

const builtins = {
  formatCreateLabel: (inputValue: string) => `Create "${inputValue}"`,
  isValidNewOption: (
    inputValue: string,
    selectValue: OptionsType,
    selectOptions: OptionsType
  ) =>
    !(
      !inputValue ||
      selectValue.some(option => compareOption(inputValue, option)) ||
      selectOptions.some(option => compareOption(inputValue, option))
    ),
  getNewOptionData: (inputValue: string, optionLabel: Node) => ({
    label: optionLabel,
    value: inputValue,
    __isNew__: true,
  }),
};

export const defaultProps: DefaultCreatableProps = {
  allowCreateWhileLoading: false,
  createOptionPosition: 'last',
  ...builtins,
};

type State = {
  inputValue: string,
};

export const makeCreatableSelect = <C: {}>(
  SelectComponent: AbstractComponent<C>
): AbstractComponent<C & Config<CreatableProps, DefaultCreatableProps>> =>
  class Creatable extends Component<CreatableProps & C, State> {
    static defaultProps = defaultProps;
    select: ElementRef<*>;
    buildOptions = createMemoizedOptionsBuilder();
    state = {
      inputValue: '',
    };
    static getDerivedStateFromProps(props: CreatableProps, state: State) {
      if (inputIsControlled(props) && props.inputValue !== state.inputValue) {
        return {
          inputValue: props.inputValue
        };
      }

      return null;
    }
    onChange = (newValue: ValueType, actionMeta: ActionMeta) => {
      const {
        getNewOptionData,
        inputValue,
        isMulti,
        onChange,
        onCreateOption,
        value,
        name,
      } = this.props;
      if (actionMeta.action !== 'select-option') {
        return onChange(newValue, actionMeta);
      }
      const newOption = this.buildOptions.getNewOption();
      const valueArray = Array.isArray(newValue) ? newValue : [newValue];

      if (valueArray[valueArray.length - 1] === newOption) {
        if (onCreateOption) onCreateOption(inputValue);
        else {
          const newOptionData = getNewOptionData(inputValue, inputValue);
          const newActionMeta = { action: 'create-option', name };
          if (isMulti) {
            onChange([...cleanValue(value), newOptionData], newActionMeta);
          } else {
            onChange(newOptionData, newActionMeta);
          }
        }
        return;
      }
      onChange(newValue, actionMeta);
    };
    onInputChange = (value: string, actionMeta: InputActionMeta) => {
      if (inputIsControlled(this.props)) {
        if (typeof this.props.onInputChange === 'function') {
          this.props.onInputChange(value, actionMeta);
        }
      } else {
        this.setState({
          inputValue: value,
        });
      }
    };
    focus() {
      this.select.focus();
    }
    blur() {
      this.select.blur();
    }
    render() {
      return (
        <SelectComponent
          {...this.props}
          ref={ref => {
            this.select = ref;
          }}
          options={this.buildOptions({ ...this.state, ...this.props })}
          onChange={this.onChange}
          onInputChange={this.onInputChange}
          inputValue={inputIsControlled(this.props) ? this.props.inputValue : this.state.inputValue}
        />
      );
    }
  };

// TODO: do this in package entrypoint
export default makeCreatableSelect<ElementConfig<typeof Select>>(
  Select
);

const inputIsControlled = (props: CreatableProps): boolean => typeof props.inputValue === 'string';

const newOptionComputationDependencies: $Keys<CreatableProps>[] = ['isValidNewOption', 'inputValue', 'value', 'options'];
const optionsComputationDependencies: $Keys<CreatableProps>[] = ['options', 'createOptionPosition'];
const createMemoizedOptionsBuilder = () => {
  let prevProps: CreatableProps = {};
  let cachedNewOption: ?OptionType;
  let cachedOptions: ?OptionsType;

  const getMemoizedOptions = (props: CreatableProps): OptionsType => {
    const {
      allowCreateWhileLoading,
      createOptionPosition,
      formatCreateLabel,
      getNewOptionData,
      inputValue,
      isLoading,
      isValidNewOption,
      value,
      options = [],
    } = props;

    let newOption = cachedNewOption;
    if (!newOption || newOptionComputationDependencies.some(key => prevProps[key] !== props[key])) {
      newOption = isValidNewOption(inputValue, cleanValue(value), options)
        ? getNewOptionData(inputValue, formatCreateLabel(inputValue))
        : undefined;
    }

    if (
      !cachedOptions ||
      newOption !== cachedNewOption ||
      (!allowCreateWhileLoading && prevProps.isLoading !== isLoading) || // only check isLoading in case allowCreateWhileLoading is false
      (allowCreateWhileLoading !== prevProps.allowCreateWhileLoading && (allowCreateWhileLoading ? prevProps.isLoading : isLoading)) || // a change in createWhileLoading only requires a new computation in case the result of allowCreateWhileLoading || !isLoading changed
      optionsComputationDependencies.some(key => prevProps[key] !== props[key])
    ) {
      cachedOptions = (allowCreateWhileLoading || !isLoading) && newOption
        ? createOptionPosition === 'first'
          ? [newOption, ...options]
          : [...options, newOption]
        : options;
    }

    cachedNewOption = newOption;
    return cachedOptions;
  };
  getMemoizedOptions.getNewOption = () => cachedNewOption;

  return getMemoizedOptions;
};