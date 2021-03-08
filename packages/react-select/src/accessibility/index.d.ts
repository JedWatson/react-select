import { ActionMeta, OptionBase } from '../types';

export type OptionContext = 'menu' | 'value';

export type GuidanceContext = 'menu' | 'input' | 'value';

export type AriaLive = 'polite' | 'off' | 'assertive';

export interface AriaGuidanceProps {
  /** String value of selectProp aria-label */
  'aria-label'?: string;
  /** String indicating user's current context and availabile keyboard interactivity */
  context: GuidanceContext;
  /** Boolean value of selectProp isSearchable */
  isSearchable?: boolean;
  /** Boolean value of selectProp isMulti */
  isMulti?: boolean;
  /** Boolean value of selectProp isDisabled */
  isDisabled?: boolean;
  /** Boolean value of selectProp tabSelectsValue */
  tabSelectsValue?: boolean;
}

export type AriaOnChangeProps<Option extends OptionBase> = ActionMeta<
  Option
> & {
  // selected option(s) of the Select
  // selectValue?: ValueType;
  /** String derived label from selected or removed option/value */
  label?: string;
  /** Boolean indicating if the selected menu option is disabled */
  isDisabled?: boolean;
};

export interface AriaOnFilterProps {
  /** String indicating current inputValue of the input */
  inputValue: string;
  /** String dervied from selectProp screenReaderStatus */
  resultsMessage: string;
}

export interface AriaOnFocusProps<Option extends OptionBase> {
  /** String indicating whether the option was focused in the menu or as (multi-) value */
  context: OptionContext;
  /** Option that is being focused */
  focused: Option;
  /** Boolean indicating whether focused menu option has been disabled */
  isDisabled?: boolean;
  /** Boolean indicating whether focused menu option is an already selcted option */
  isSelected?: boolean;
  /** String derived label from focused option/value */
  label?: string;
  // Options provided as props to Select used to determine indexing
  // options?: OptionsType;
  // selected option(s) of the Select
  // selectValue?: ValueType;
}

export type AriaGuidance = (props: AriaGuidanceProps) => string;
export type AriaOnChange<Option extends OptionBase> = (
  props: AriaOnChangeProps<Option>
) => string;
export type AriaOnFilter = (props: AriaOnFilterProps) => string;
export type AriaOnFocus<Option extends OptionBase> = (
  props: AriaOnFocusProps<Option>
) => string;

export interface AriaLiveMessages<Option extends OptionBase> {
  /** Guidance message used to convey component state and specific keyboard interactivity */
  guidance?: AriaGuidance;
  /** OnChange message used to convey changes to value but also called when user selects disabled option */
  onChange?: AriaOnChange<Option>;
  /** OnFilter message used to convey information about filtered results displayed in the menu */
  onFilter?: AriaOnFilter;
  /** OnFocus message used to convey information about the currently focused option or value */
  onFocus?: AriaOnFocus<Option>;
}
