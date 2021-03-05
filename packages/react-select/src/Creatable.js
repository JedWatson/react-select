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
import type { OptionType, OptionsType, ValueType, ActionMeta } from './types';
import { cleanValue } from './utils';
import manageState from './stateManager';
import {
  getOptionValue as baseGetOptionValue,
  getOptionLabel as baseGetOptionLabel,
} from './builtins';

type AccessorType = {|
  getOptionValue: typeof baseGetOptionValue,
  getOptionLabel: typeof baseGetOptionLabel,
|};

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
  isValidNewOption: (string, OptionsType, OptionsType, AccessorType) => boolean,
  /* Returns the data for the new option when it is created. Used to display the
     value, and is passed to `onChange`. */
  getNewOptionData: (string, Node) => OptionType,
  ...AccessorType,
|};
export type CreatableProps = {
  ...DefaultCreatableProps,
  /* If provided, this will be called with the input value when a new option is
     created, and `onChange` will **not** be called. Use this when you need more
     control over what happens when new options are created. */
  onCreateOption?: string => void,
  /* Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string,
  options?: OptionsType,
  inputValue: string,
  value: ValueType,
  isLoading?: boolean,
  isMulti?: boolean,
  onChange: (ValueType, ActionMeta) => void,
};

export type Props = SelectProps & CreatableProps;

const compareOption = (inputValue = '', option, accessors) => {
  const candidate = String(inputValue).toLowerCase();
  const optionValue = String(accessors.getOptionValue(option)).toLowerCase();
  const optionLabel = String(accessors.getOptionLabel(option)).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};

const builtins = {
  formatCreateLabel: (inputValue: string) => `Create "${inputValue}"`,
  isValidNewOption: (
    inputValue: string,
    selectValue: OptionsType,
    selectOptions: OptionsType,
    accessors: AccessorType
  ) =>
    !(
      !inputValue ||
      selectValue.some(option =>
        compareOption(inputValue, option, accessors)
      ) ||
      selectOptions.some(option => compareOption(inputValue, option, accessors))
    ),
  getNewOptionData: (inputValue: string, optionLabel: Node) => ({
    label: optionLabel,
    value: inputValue,
    __isNew__: true,
  }),
  getOptionValue: baseGetOptionValue,
  getOptionLabel: baseGetOptionLabel,
};

export const defaultProps: DefaultCreatableProps = {
  allowCreateWhileLoading: false,
  createOptionPosition: 'last',
  ...builtins,
};

type State = {
  newOption: OptionType | void,
  options: OptionsType,
};

export const makeCreatableSelect = <C: {}>(
  SelectComponent: AbstractComponent<C>
): AbstractComponent<C & Config<CreatableProps, DefaultCreatableProps>> =>
  class Creatable extends Component<CreatableProps & C, State> {
    static defaultProps = defaultProps;
    select: ElementRef<*>;
    constructor(props: CreatableProps & C) {
      super(props);
      const options = props.options || [];
      this.state = {
        newOption: undefined,
        options: options,
      };
    }
    static getDerivedStateFromProps(props: CreatableProps & C, state: State) {
      const {
        allowCreateWhileLoading,
        createOptionPosition,
        formatCreateLabel,
        getNewOptionData,
        inputValue,
        isLoading,
        isValidNewOption,
        value,
        getOptionValue,
        getOptionLabel,
      } = props;
      const options = props.options || [];
      let { newOption } = state;
      if (
        isValidNewOption(inputValue, cleanValue(value), options, {
          getOptionValue,
          getOptionLabel,
        })
      ) {
        newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
      } else {
        newOption = undefined;
      }
      return {
        newOption: newOption,
        options:
          (allowCreateWhileLoading || !isLoading) && newOption
            ? createOptionPosition === 'first'
              ? [newOption, ...options]
              : [...options, newOption]
            : options,
      };
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
      const { newOption } = this.state;
      const valueArray = Array.isArray(newValue) ? newValue : [newValue];

      if (valueArray[valueArray.length - 1] === newOption) {
        if (onCreateOption) onCreateOption(inputValue);
        else {
          const newOptionData = getNewOptionData(inputValue, inputValue);
          const newActionMeta = {
            action: 'create-option',
            name,
            option: newOptionData,
          };
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
    focus() {
      this.select.focus();
    }
    blur() {
      this.select.blur();
    }
    render() {
      const { options } = this.state;
      return (
        <SelectComponent
          {...this.props}
          ref={ref => {
            this.select = ref;
          }}
          options={options}
          onChange={this.onChange}
        />
      );
    }
  };

// TODO: do this in package entrypoint
const SelectCreatable = makeCreatableSelect<ElementConfig<typeof Select>>(
  Select
);

export default manageState<ElementConfig<typeof SelectCreatable>>(
  SelectCreatable
);
