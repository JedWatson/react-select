import { CSSObject } from '@emotion/serialize';
import { Props } from './Select';
import { StylesProps } from './styles';

export interface GroupBase<Option> {
  readonly options: readonly Option[];
  readonly label?: string;
}

export type OptionsOrGroups<Option, Group extends GroupBase<Option>> =
  readonly (Option | Group)[];

export type Options<Option> = readonly Option[];

export type SingleValue<Option> = Option | null;
export type MultiValue<Option> = readonly Option[];

export type PropsValue<Option> = MultiValue<Option> | SingleValue<Option>;

export type OnChangeValue<Option, IsMulti extends boolean> =
  IsMulti extends true ? MultiValue<Option> : SingleValue<Option>;

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

export type CX = (state: ClassNamesState, className?: string) => string;
export type GetStyles<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = <Key extends keyof StylesProps<Option, IsMulti, Group>>(
  propertyName: Key,
  props: StylesProps<Option, IsMulti, Group>[Key]
) => CSSObjectWithLabel;

export interface CommonProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  clearValue: () => void;
  cx: CX;
  /**
    Get the styles of a particular part of the select. Pass in the name of the
    property as the first argument, and the current props as the second argument.
    See the `styles` object for the properties available.
  */
  getStyles: GetStyles<Option, IsMulti, Group>;
  getValue: () => Options<Option>;
  hasValue: boolean;
  isMulti: boolean;
  isRtl: boolean;
  options: OptionsOrGroups<Option, Group>;
  selectOption: (newValue: Option) => void;
  selectProps: Props<Option, IsMulti, Group>;
  setValue: (
    newValue: OnChangeValue<Option, IsMulti>,
    action: SetValueAction,
    option: Option
  ) => void;
  theme: Theme;
}

export interface CommonPropsAndClassName<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends CommonProps<Option, IsMulti, Group> {
  className?: string | undefined;
}

export interface ActionMetaBase<Option> {
  option?: Option | undefined;
  removedValue?: Option;
  removedValues?: Options<Option>;
  name?: string;
}

export interface SelectOptionActionMeta<Option> extends ActionMetaBase<Option> {
  action: 'select-option';
  option: Option | undefined;
  name?: string;
}

export interface DeselectOptionActionMeta<Option>
  extends ActionMetaBase<Option> {
  action: 'deselect-option';
  option: Option | undefined;
  name?: string;
}

export interface RemoveValueActionMeta<Option> extends ActionMetaBase<Option> {
  action: 'remove-value';
  removedValue: Option;
  name?: string;
}

export interface PopValueActionMeta<Option> extends ActionMetaBase<Option> {
  action: 'pop-value';
  removedValue: Option;
  name?: string;
}

export interface ClearActionMeta<Option> extends ActionMetaBase<Option> {
  action: 'clear';
  removedValues: Options<Option>;
  name?: string;
}

export interface CreateOptionActionMeta<Option> extends ActionMetaBase<Option> {
  action: 'create-option';
  name?: string;
  option: Option;
}

export interface InitialInputFocusedActionMeta<Option, IsMulti extends boolean>
  extends ActionMetaBase<Option> {
  action: 'initial-input-focus';
  value: OnChangeValue<Option, IsMulti>;
  options?: Options<Option>;
}

export type ActionMeta<Option> =
  | SelectOptionActionMeta<Option>
  | DeselectOptionActionMeta<Option>
  | RemoveValueActionMeta<Option>
  | PopValueActionMeta<Option>
  | ClearActionMeta<Option>
  | CreateOptionActionMeta<Option>;

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
export type CoercedMenuPlacement = 'bottom' | 'top';
export type MenuPosition = 'absolute' | 'fixed';

export type FocusDirection =
  | 'up'
  | 'down'
  | 'pageup'
  | 'pagedown'
  | 'first'
  | 'last';

export type GetOptionLabel<Option> = (option: Option) => string;
export type GetOptionValue<Option> = (option: Option) => string;

export type CSSObjectWithLabel = CSSObject & { label?: string };
