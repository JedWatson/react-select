// @flow

import { type OptionType, type OptionsType, type ActionTypes } from '../types';

export type InstructionsContext = {
  isSearchable?: boolean,
  isMulti?: boolean,
  label?: string,
  isDisabled?: boolean,
  tabSelectsValue?: boolean,
};

export type InstructionsType = 'menu' | 'input' | 'multi-value';

export type ChangeValueContext = { value: string, isDisabled?: boolean };

export type AriaLiveMessagesProps = {
  focusValue?: (args: {
    focusedValue: OptionType,
    getOptionLabel: (data: OptionType) => string,
    selectValue: OptionsType,
  }) => string,
  focusOption?: (args: {
    focusedOption: OptionType,
    getOptionLabel: (data: OptionType) => string,
    options: OptionsType,
  }) => string,
  filterResults?: (args: {
    inputValue: string,
    screenReaderMessage: string,
  }) => string,
  selectValue?: (event: ActionTypes, context: ChangeValueContext) => string,
  instructions?: (
    event: InstructionsType,
    context?: InstructionsContext
  ) => string,
};

export function getAriaLiveMessages() {
  return {
    instructions: (
      type: InstructionsType,
      context?: InstructionsContext = {}
    ) => {
      const {
        isSearchable,
        isMulti,
        label,
        isDisabled,
        tabSelectsValue,
      } = context;
      switch (type) {
        case 'menu':
          return `Use Up and Down to choose options${
            isDisabled
              ? ''
              : ', press Enter to select the currently focused option'
          }, press Escape to exit the menu${
            tabSelectsValue
              ? ', press Tab to select the option and exit the menu'
              : ''
          }.`;
        case 'input':
          return `${label ? label : 'Select'} is focused ${
            isSearchable ? ',type to refine list' : ''
          }, press Down to open the menu, ${
            isMulti ? ' press left to focus selected values' : ''
          }`;
        case 'multi-value':
          return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
        default:
          return '';
      }
    },

    selectValue: (event: ActionTypes, context: ChangeValueContext) => {
      const { value, isDisabled } = context;
      if (!value) return '';
      switch (event) {
        case 'deselect-option':
        case 'pop-value':
        case 'remove-value':
          return `option ${value}, deselected.`;
        case 'select-option':
          return isDisabled
            ? `option ${value} is disabled. Select another option.`
            : `option ${value}, selected.`;
        default:
          return '';
      }
    },

    focusValue: ({
      focusedValue,
      getOptionLabel,
      selectValue,
    }: {
      focusedValue: OptionType,
      getOptionLabel: (option: OptionType) => string,
      selectValue: OptionsType,
    }) =>
      `value ${getOptionLabel(focusedValue)} focused, ${selectValue.indexOf(
        focusedValue
      ) + 1} of ${selectValue.length}.`,

    focusOption: ({
      focusedOption,
      getOptionLabel,
      options,
    }: {
      focusedOption: OptionType,
      getOptionLabel: (option: OptionType) => string,
      options: OptionsType,
    }) =>
      `option ${getOptionLabel(focusedOption)} focused${
        focusedOption.isDisabled ? ' disabled' : ''
      }, ${options.indexOf(focusedOption) + 1} of ${options.length}.`,

    filterResults: ({
      inputValue,
      screenReaderMessage,
    }: {
      inputValue: string,
      screenReaderMessage: string,
    }) =>
      `${screenReaderMessage}${
        inputValue ? ' for search term ' + inputValue : ''
      }.`,
  };
}
