// @flow

import {
  type ActionMeta,
  type OptionType,
  type OptionsType,
  type ValueType,
} from '../types';

export type FocusedType = 'option' | 'value';

export type GuidanceType = 'menu' | 'input' | 'value';

export type AriaLiveProp = 'polite' | 'off' | 'assertive';

export type OptionContext = {
  // derived label of selected option via getOptionLabel
  // Note: different aria attributes could potentially introduce need for DOM query selectors
  label?: string,
  // selected option was disabled, used only for accessibility purposes
  isDisabled?: boolean,
  // option is selected
  isSelected?: boolean,
};

export type SelectionContext = ActionMeta &
  OptionContext & {
    // selected "thing" (option, removedValue, value)
    selected?: OptionType | null,
  };

export type FocusedContext = OptionContext & {
  type: FocusedType,
  options: OptionsType,
  value?: ValueType,
};

export type GuidanceContext = OptionContext & {
  isSearchable?: boolean,
  isMulti?: boolean,
  isDisabled?: boolean,
  tabSelectsValue?: boolean,
};

export type AriaSelectionType = SelectionContext & {
  // first parameter passed in onChange
  value?: ValueType,
};

export type AriaLiveMessagesProps = {
  onChange?: (value: ValueType, context: SelectionContext) => string,
  onFocus?: (focused: OptionType, context: FocusedContext) => string,
  onFilter?: (args: {
    inputValue: string,
    screenReaderMessage: string,
  }) => string,
  guidance?: (type: GuidanceType, context?: GuidanceContext) => string,
};

export const defaultAriaLiveMessages = {
  guidance: (type: GuidanceType, context?: GuidanceContext = {}) => {
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
        return `${label || 'Select'} is focused ${
          isSearchable ? ',type to refine list' : ''
        }, press Down to open the menu, ${
          isMulti ? ' press left to focus selected values' : ''
        }`;
      case 'value':
        return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
      default:
        return '';
    }
  },

  onChange: (value: ValueType, context: SelectionContext) => {
    const { action, label, isDisabled } = context;
    if (!label) return '';
    switch (action) {
      case 'deselect-option':
      case 'pop-value':
      case 'remove-value':
        return `option ${label}, deselected.`;
      case 'select-option':
        return isDisabled
          ? `option ${label} is disabled. Select another option.`
          : `option ${label}, selected.`;
      default:
        return '';
    }
  },

  onFocus: (focused: OptionType, context: FocusedContext) => {
    const { type, value, options, label = '', isSelected } = context;
    const getIndexOf = (arr, item) =>
      arr && arr.length ? `${arr.indexOf(item) + 1} of ${arr.length}` : '';

    if (type === 'value' && value) {
      return `value ${label} focused, ${getIndexOf(value, focused)}.`;
    }

    if (type === 'option') {
      const disabled = focused.isDisabled ? ' disabled' : '';
      const status = `${isSelected ? 'selected' : 'focused'}${disabled}`;

      return `option ${label} ${status}, ${getIndexOf(options, focused)}.`;
    }
    return '';
  },

  onFilter: ({
    inputValue,
    resultsMessage,
  }: {
    inputValue: string,
    resultsMessage: string,
  }) =>
    `${resultsMessage}${inputValue ? ' for search term ' + inputValue : ''}.`,
};
