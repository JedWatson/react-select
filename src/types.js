// @flow

type MouseEventHandler = (SyntheticMouseEvent<HTMLElement>) => void;

export type OptionType = {
  [string]: any,
};

export type OptionsType = Array<OptionType>;

export type ValueType = OptionType | OptionsType | null | void;

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

export type OptionProps = {
  data: any,
  id: number,
  index: number,
  innerRef: HTMLElement => void,
  isFocused: boolean,
  isSelected: boolean,
  label: string,
  onClick: MouseEventHandler,
  onMouseOver: MouseEventHandler,
  value: any,
  withinGroup: boolean,
};
