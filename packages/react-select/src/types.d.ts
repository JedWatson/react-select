import * as React from 'react';
import { InternalBaseSelectProps } from './Select';

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

export interface OptionTypeBase {
  [key: string]: any;
}

export type OptionsType<OptionType extends OptionTypeBase> = ReadonlyArray<
  OptionType
>;

export interface GroupTypeBase<OptionType extends OptionTypeBase> {
  options: OptionsType<OptionType>;
  [key: string]: any;
}

export type GroupedOptionsType<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType> = GroupTypeBase<OptionType>
> = ReadonlyArray<GroupType>;

export type ValueType<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean
> = IsMulti extends true ? OptionsType<OptionType> : OptionType | null;

export type FocusEventHandler = (event: React.FocusEvent<HTMLElement>) => void;
export type MouseEventHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type KeyboardEventHandler = (
  event: React.KeyboardEvent<HTMLElement>
) => void;

export type InnerRef = React.Ref<any>;
export interface PropsWithInnerRef {
  /** The inner reference. */
  innerRef: React.Ref<any>;
}

export type ClassNameList = string[];
export type ClassNamesState = { [key: string]: boolean } | undefined;

export interface CommonProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupTypeBase<Option> = GroupTypeBase<Option>
> {
  clearValue: () => void;
  className?: string;
  cx: (
    state: ClassNamesState | undefined,
    className: string | undefined
  ) => string;
  /**
   * Get the styles of a particular part of the select. Pass in the name of the
   * property as the first argument, and the current props as the second argument.
   * See the `styles` object for the properties available.
   */
  getStyles: (name: string, props: any) => {};
  getValue: () => OptionsType<Option>;
  /** Whether the value container currently holds a value. */
  hasValue: boolean;
  /** Set when the value container should hold multiple values */
  isMulti: boolean;
  /** Whether the text is right to left */
  isRtl: boolean;
  options: OptionsType<Option>;
  selectOption: (option: Option) => void;
  selectProps: InternalBaseSelectProps<Option, IsMulti, Group>;
  setValue: (
    newValue: ValueType<Option, IsMulti>,
    action: SetValueAction,
    option?: Option
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

export type Action = ActionMeta<OptionTypeBase>['action'];
export type SetValueAction = 'select-option' | 'deselect-option';

export type InputActionTypes =
  | 'set-value'
  | 'input-change'
  | 'input-blur'
  | 'menu-close';

export interface InputActionMeta {
  action: InputActionTypes;
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

export type OptionProps = PropsWithInnerRef & {
  data: any;
  id: number;
  index: number;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
  label: string;
  onClick: MouseEventHandler;
  onMouseOver: MouseEventHandler;
  value: any;
};

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

export type GetOptionValue<Option extends OptionBase> = (
  option: Option
) => string;
export type GetOptionLabel<Option extends OptionBase> = (
  option: Option
) => string;
