// @flow

type MouseEventHandler = (SyntheticMouseEvent<HTMLElement>) => void;

export type OptionType = {
  [string]: any,
};

export type OptionsType = Array<OptionType>;

export type ValueType = OptionType | OptionsType | null | void;

export type PropsWithInnerRef = {
  innerRef: (?HTMLElement) => void,
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
  withinGroup: boolean,
};
