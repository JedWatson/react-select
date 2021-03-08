// @flow

import {
  type ActionMeta,
  type OptionType,
  type OptionsType,
  type ValueType,
} from '../types';

export type OptionContextType = 'menu' | 'value';

export type GuidanceContextType = 'menu' | 'input' | 'value';

export type AriaLiveProp = 'polite' | 'off' | 'assertive';

export type AriaSelectionType = ActionMeta & {
  value?: ValueType,
};

export type AriaGuidanceProps = {
  // String value of selectProp aria-label
  'aria-label'?: string,
  // String indicating user's current context and availabile keyboard interactivity
  context: GuidanceContextType,
  // Boolean value of selectProp isSearchable
  isSearchable?: boolean,
  // Boolean value of selectProp isMulti
  isMulti?: boolean,
  // Boolean value of selectProp isDisabled
  isDisabled?: boolean,
  // Boolean value of selectProp tabSelectsValue
  tabSelectsValue?: boolean,
};

export type AriaOnChangeProps = ActionMeta & {
  // selected option(s) of the Select
  selectValue?: ValueType,
  // String derived label from selected or removed option/value
  label?: string,
  // Boolean indicating if the selected menu option is disabled
  isDisabled?: boolean,
};

export type AriaOnFilterProps = {
  // String indicating current inputValue of the input
  inputValue: string,
  // String dervied from selectProp screenReaderStatus
  resultsMessage: string,
};

export type AriaOnFocusProps = {
  // String indicating whether the option was focused in the menu or as (multi-) value
  context: OptionContextType,
  // Option that is being focused
  focused: OptionType,
  // Boolean indicating whether focused menu option has been disabled
  isDisabled?: boolean,
  // Boolean indicating whether focused menu option is an already selcted option
  isSelected?: boolean,
  // String derived label from focused option/value
  label?: string,
  // Options provided as props to Select used to determine indexing
  options?: OptionsType,
  // selected option(s) of the Select
  selectValue?: ValueType,
};

export type AriaLiveMessagesProps = {
  // Guidance message used to convey component state and specific keyboard interactivity
  guidance?: (props: AriaGuidanceProps) => string,
  // OnChange message used to convey changes to value but also called when user selects disabled option
  onChange?: (props: AriaOnChangeProps) => string,
  // OnFilter message used to convey information about filtered results displayed in the menu
  onFilter?: (props: AriaOnFilterProps) => string,
  // OnFocus message used to convey information about the currently focused option or value
  onFocus?: (props: AriaOnFocusProps) => string,
};

export const defaultAriaLiveMessages = {
  guidance: (props: AriaGuidanceProps) => {
    const {
      isSearchable,
      isMulti,
      isDisabled,
      tabSelectsValue,
      context,
    } = props;
    switch (context) {
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
        return `${props['aria-label'] || 'Select'} is focused ${
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

  onChange: (props: AriaOnChangeProps) => {
    const { action, label = '', isDisabled } = props;
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

  onFocus: (props: AriaOnFocusProps) => {
    const {
      context,
      focused = {},
      options,
      label = '',
      selectValue,
      isDisabled,
      isSelected,
    } = props;

    const getArrayIndex = (arr, item) =>
      arr && arr.length ? `${arr.indexOf(item) + 1} of ${arr.length}` : '';

    if (context === 'value' && selectValue) {
      return `value ${label} focused, ${getArrayIndex(selectValue, focused)}.`;
    }

    if (context === 'menu') {
      const disabled = isDisabled ? ' disabled' : '';
      const status = `${isSelected ? 'selected' : 'focused'}${disabled}`;
      return `option ${label} ${status}, ${getArrayIndex(options, focused)}.`;
    }
    return '';
  },

  onFilter: (props: AriaOnFilterProps) => {
    const { inputValue, resultsMessage } = props;
    return `${resultsMessage}${
      inputValue ? ' for search term ' + inputValue : ''
    }.`;
  },
};
