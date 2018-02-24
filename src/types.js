// @flow
import type { Ref } from 'react';

export type OptionType = {
  [string]: any,
};

export type OptionsType = Array<OptionType>;

export type GroupType = {
  options: OptionsType,
  [string]: any,
};

export type ValueType = OptionType | OptionsType | null | void;

export type FocusEventHandler = (SyntheticFocusEvent<HTMLElement>) => void;
export type MouseEventHandler = (SyntheticMouseEvent<HTMLElement>) => void;
export type KeyboardEventHandler = (
  SyntheticKeyboardEvent<HTMLElement>
) => void;

export type InnerRef = Ref<*>;
export type PropsWithInnerRef = {
  innerRef: Ref<*>,
};

export type PropsWithStyles = {
  getStyles: (string, any) => {},
};

export type CommonProps = {
  clearValue: () => void,
  getStyles: (string, any) => {},
  getValue: () => ValueType,
  hasValue: boolean,
  isMulti: boolean,
  options: OptionsType,
  selectOption: OptionType => void,
  selectProps: any,
  setValue: (ValueType, ActionTypes) => void,
};

export type ActionTypes =
  | 'select-option'
  | 'deselect-option'
  | 'remove-value'
  | 'pop-value'
  | 'set-value'
  | 'clear'
  | 'create-option';

export type ActionMeta = {
  action: ActionTypes,
};

export type MenuPlacement = 'auto' | 'bottom' | 'top';

export type FocusDirection =
  | 'up'
  | 'down'
  | 'pageup'
  | 'pagedown'
  | 'first'
  | 'last';

export type OptionProps = PropsWithInnerRef & {
  data: any,
  id: number,
  index: number,
  isDisabled: boolean,
  isFocused: boolean,
  isSelected: boolean,
  label: string,
  onClick: MouseEventHandler,
  onMouseOver: MouseEventHandler,
  value: any,
};
