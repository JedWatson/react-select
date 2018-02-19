// @flow

import React, { Component, type Node } from 'react';
import Select, { type Props as SelectProps } from './Select';
import type { OptionType, OptionsType, ValueType, ActionMeta } from './types';
import { cleanValue } from './utils';
import withState from './stateManager';

type Props = SelectProps & {
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
  isValidNewOption: (inputValue, selectValue, selectOptions) =>
    !(
      !inputValue ||
      selectValue.some(option => compareOption(inputValue, option)) ||
      selectOptions.some(option => compareOption(inputValue, option))
    ),
  getNewOptionData: (inputValue, optionLabel) => ({
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

class Creatable extends Component<Props, State> {
  static defaultProps = defaultProps;
  state = {
    newOption: undefined,
    options: [],
  };
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps: Props) {
    const {
      getNewOptionData,
      formatCreateLabel,
      isValidNewOption,
      inputValue: oldInputValue,
    } = this.props;
    const { inputValue, value, options } = nextProps;
    this.setState({
      newOption: undefined,
      options: options,
    });
    if (nextProps.inputValue !== oldInputValue) {
      if (isValidNewOption(inputValue, cleanValue(value), options)) {
        const newOption = getNewOptionData(
          inputValue,
          formatCreateLabel(inputValue)
        );
        this.setState({
          newOption: newOption,
          options: [...options, newOption],
        });
      }
    }
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
    return <Select {...props} options={options} onChange={this.onChange} />;
  }
}

// TODO: do this in package entrypoint
export default withState(Creatable);
