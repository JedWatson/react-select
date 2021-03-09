export interface OptionBase {}

export interface GroupBase<Option extends OptionBase> {
  readonly options: readonly Option[];
}

export type OptionsOrGroups<
  Option extends OptionBase,
  Group extends GroupBase<Option>
> = readonly (Option | Group)[];

export type Options<Option extends OptionBase> = readonly Option[];

export type SingleValue<Option extends OptionBase> = Option | null;
export type MultiValue<Option extends OptionBase> = readonly Option[];

export type PropsValue<Option extends OptionBase> =
  | MultiValue<Option>
  | SingleValue<Option>;

export type OnChangeValue<
  Option extends OptionBase,
  IsMulti extends boolean
> = IsMulti extends true ? MultiValue<Option> : SingleValue<Option>;

interface Colors {
  primary: string;
  primary75: string;
  primary50: string;
  primary25: string;

  danger: string;
  dangerLight: string;

  neutral0: string;
  neutral5: string;
  neutral10: string;
  neutral20: string;
  neutral30: string;
  neutral40: string;
  neutral50: string;
  neutral60: string;
  neutral70: string;
  neutral80: string;
  neutral90: string;
}

interface ThemeSpacing {
  baseUnit: number;
  controlHeight: number;
  menuGutter: number;
}

export interface Theme {
  borderRadius: number;
  colors: Colors;
  spacing: ThemeSpacing;
}

export type ClassNamesState = { [key: string]: boolean };

export interface CommonProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  clearValue: () => void;
  cx: (state: ClassNamesState, className?: string) => string | void;
  /**
    Get the styles of a particular part of the select. Pass in the name of the
    property as the first argument, and the current props as the second argument.
    See the `styles` object for the properties available.
  */
  getStyles: (name: string, props: any) => {};
  getValue: () => Options<Option>;
  hasValue: boolean;
  isMulti: boolean;
  isRtl: boolean;
  options: OptionsOrGroups<Option, Group>;
  selectOption: (newValue: Option) => void;
  selectProps: any;
  setValue: (
    newValue: OnChangeValue<Option, IsMulti>,
    action: SetValueAction,
    option: Option
  ) => void;
  theme: Theme;
}

export interface SelectOptionActionMeta<Option extends OptionBase> {
  action: 'select-option';
  option: Option | undefined;
  name?: string;
}

export interface DeselectOptionActionMeta<Option extends OptionBase> {
  action: 'deselect-option';
  option: Option | undefined;
  name?: string;
}

export interface RemoveValueActionMeta<Option extends OptionBase> {
  action: 'remove-value';
  removedValue: Option;
  name?: string;
}

export interface PopValueActionMeta<Option extends OptionBase> {
  action: 'pop-value';
  removedValue: Option;
  name?: string;
}

export interface ClearActionMeta {
  action: 'clear';
  name?: string;
}

export interface CreateOptionActionMeta {
  action: 'create-option';
  name?: string;
}

export type ActionMeta<Option extends OptionBase> =
  | SelectOptionActionMeta<Option>
  | DeselectOptionActionMeta<Option>
  | RemoveValueActionMeta<Option>
  | PopValueActionMeta<Option>
  | ClearActionMeta
  | CreateOptionActionMeta;

export type SetValueAction = 'select-option' | 'deselect-option';

export type InputAction =
  | 'set-value'
  | 'input-change'
  | 'input-blur'
  | 'menu-close';

export interface InputActionMeta {
  action: InputAction;
}

export type MenuPlacement = 'auto' | 'bottom' | 'top';
export type MenuPosition = 'absolute' | 'fixed';

export type FocusDirection =
  | 'up'
  | 'down'
  | 'pageup'
  | 'pagedown'
  | 'first'
  | 'last';
