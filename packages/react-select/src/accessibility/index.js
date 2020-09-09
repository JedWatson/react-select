// @flow

import { type OptionType, type OptionsType } from '../types';

export type AccessibilityProp = {
  valueFocusAriaMessage?: (args: {
    focusedValue: OptionType,
    getOptionLabel: (data: OptionType) => string,
    selectValue: OptionsType
  }) => string,
  optionFocusAriaMessage?: (args: {
    focusedOption: OptionType,
    getOptionLabel: (data: OptionType) => string,
    options: OptionsType
  }) => string,
  resultsAriaMessage?: (args: { inputValue: string, screenReaderMessage: string }) => string,
  valueEventAriaMessage?: (event: ValueEventType, context: ValueEventContext) => string,
  instructionsAriaMessage?: (event: InstructionEventType, context?: InstructionsContext) => string
};

export type AccessibilityConfig = {
  valueFocusAriaMessage: (args: {
    focusedValue: OptionType,
    getOptionLabel: (data: OptionType) => string,
    selectValue: OptionsType
  }) => string,
  optionFocusAriaMessage: (args: {
    focusedOption: OptionType,
    getOptionLabel: (data: OptionType) => string,
    options: OptionsType
  }) => string,
  resultsAriaMessage: (args: { inputValue: string, screenReaderMessage: string }) => string,
  valueEventAriaMessage: (event: ValueEventType, context: ValueEventContext) => string,
  instructionsAriaMessage: (event: InstructionEventType, context?: InstructionsContext) => string
}

export type InstructionsContext = {
  isSearchable?: boolean,
  isMulti?: boolean,
  label?: string,
  isDisabled?: boolean
};
export type ValueEventContext = { value: string, isDisabled?: boolean };

export type InstructionEventType = 'menu' | 'input' | 'value';

export const instructionsAriaMessage = (
  event: InstructionEventType,
  context?: InstructionsContext = {}
) => {
  const { isSearchable, isMulti, label, isDisabled } = context;
  switch (event) {
    case 'menu':
      return `Use Up and Down to choose options${isDisabled ? '' : ', press Enter to select the currently focused option'}, press Escape to exit the menu, press Tab to select the option and exit the menu.`;
    case 'input':
      return `${label ? label : 'Select'} is focused ${
        isSearchable ? ',type to refine list' : ''
        }, press Down to open the menu, ${
        isMulti ? ' press left to focus selected values' : ''
        }`;
    case 'value':
      return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
    default:
      return '';
  }
};

export type ValueEventType = 'deselect-option' | 'pop-value' | 'remove-value' | 'select-option';

export const valueEventAriaMessage = (
  event: ValueEventType,
  context: ValueEventContext
) => {
  const { value, isDisabled } = context;
  if (!value) return '';
  switch (event) {
    case 'deselect-option':
    case 'pop-value':
    case 'remove-value':
      return `option ${value}, deselected.`;
    case 'select-option':
      return isDisabled ? `option ${value} is disabled. Select another option.` : `option ${value}, selected.`;
    default:
      return '';
  }
};

export const valueFocusAriaMessage = ({
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
  ) + 1} of ${selectValue.length}.`;

export const optionFocusAriaMessage = ({
  focusedOption,
  getOptionLabel,
  options,
}: {
  focusedOption: OptionType,
  getOptionLabel: (option: OptionType) => string,
  options: OptionsType,
}) =>
  `option ${getOptionLabel(focusedOption)} focused${focusedOption.isDisabled ? ' disabled' : ''}, ${options.indexOf(
    focusedOption
  ) + 1} of ${options.length}.`;

export const resultsAriaMessage = ({
  inputValue,
  screenReaderMessage,
}: {
  inputValue: string,
  screenReaderMessage: string,
}) =>
  `${screenReaderMessage}${
  inputValue ? ' for search term ' + inputValue : ''
  }.`;
