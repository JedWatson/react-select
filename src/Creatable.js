// @flow

import React, { Component, type Node, type ComponentType } from 'react';
import Select, { type Props as SelectProps } from './Select';
import type { OptionType, OptionsType, ValueType, ActionMeta } from './types';
import { cleanValue } from './utils';
import manageState from './stateManager';

export type Props = SelectProps & {
  allowCreateWhileLoading: boolean,
  formatCreateLabel: string => Node,
  isValidNewOption: (string, ValueType, OptionsType) => boolean,
  getNewOptionData: (string, Node) => OptionType,
  onCreateOption?: string => void,
};

const compareOption = (inputValue, option) => {
  const candidate = inputValue.toLowerCase();
  return (
    option.value.toLowerCase() === candidate ||
    option.label.toLowerCase() === candidate
  );
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
  getNewOptionData: (inputValue: string, optionLabel: string) => ({
    label: optionLabel,
    value: inputValue,
    __isNew__: true,
  }),
};

const defaultProps = {
  allowCreateWhileLoading: false,
  ...builtins,
};

type State = {
  newOption: OptionType | void,
  options: OptionsType,
};

export const makeCreatableSelect = (SelectComponent: ComponentType<*>) =>
  class Creatable extends Component<Props, State> {
    static defaultProps = defaultProps;
    constructor(props: Props) {
      super(props);
      const options = props.options || [];
      this.state = {
        newOption: undefined,
        options: options,
      };
    }
    componentWillReceiveProps(nextProps: Props) {
      const {
        allowCreateWhileLoading,
        formatCreateLabel,
        getNewOptionData,
        inputValue,
        isLoading,
        isValidNewOption,
        value,
      } = nextProps;
      const options = nextProps.options || [];
      let { newOption } = this.state;
      if (isValidNewOption(inputValue, cleanValue(value), options)) {
        newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
      } else {
        newOption = undefined;
      }
      this.setState({
        newOption: newOption,
        options:
          (allowCreateWhileLoading || !isLoading) && newOption
            ? [...options, newOption]
            : options,
      });
    }
    onChange = (newValue: ValueType, actionMeta: ActionMeta) => {
      const {
        getNewOptionData,
        inputValue,
        isMulti,
        onChange,
        onCreateOption,
        value,
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
          const newActionMeta = { action: 'create-option' };
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
    render() {
      const { ...props } = this.props;
      const { options } = this.state;
      return (
        <SelectComponent
          {...props}
          ref={props.selectRef}
          options={options}
          onChange={this.onChange}
        />
      );
    }
  };

// TODO: do this in package entrypoint
export default manageState(makeCreatableSelect(Select));
