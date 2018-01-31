// @flow
import { type ElementRef } from 'react';

export type OptionType = {
  [string]: any,
};

export type OptionsType = Array<OptionType>;

export type ValueType = OptionType | OptionsType | null | void;

export type FocusEventHandler = (SyntheticFocusEvent<HTMLElement>) => void;
export type MouseEventHandler = (SyntheticMouseEvent<HTMLElement>) => void;
export type KeyboardEventHandler = (
  SyntheticKeyboardEvent<HTMLElement>
) => void;

export type InnerRef = ElementRef<typeof HTMLElement>;
export type PropsWithInnerRef = {
  innerRef: InnerRef,
};
export type PropsWithStyles = {
  getStyles: (string, any) => {},
};

export type ActionMeta = {
  action:
    | 'select-option'
    | 'remove-value'
    | 'deselect-value'
    | 'pop-value'
    | 'clear',
};

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
