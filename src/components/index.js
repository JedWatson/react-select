// @flow
import type { ComponentType } from 'react';
import {
  type IndicatorContainerProps,
  type ContainerProps,
  type ValueContainerProps,
  IndicatorsContainer,
  SelectContainer,
  ValueContainer,
} from './containers';
import {
  type IndicatorProps,
  type LoadingIconProps,
  ClearIndicator,
  DropdownIndicator,
  LoadingIndicator,
  IndicatorSeparator,
} from './indicators';

import Control, { type ControlProps } from './Control';
import Group, { type GroupProps, GroupHeading } from './Group';
import Input, { type InputProps } from './Input';
import Menu, { type MenuProps, MenuList, type MenuListComponentProps, type NoticeProps, NoOptionsMessage, LoadingMessage } from './Menu';
import MultiValue, {
  type MultiValueProps,
  MultiValueContainer,
  MultiValueLabel,
  MultiValueRemove,
} from './MultiValue';
import Option, { type OptionProps } from './Option';
import Placeholder, { type PlaceholderProps } from './Placeholder';
import SingleValue, { type SingleValueProps } from './SingleValue';

type IndicatorComponentType = ComponentType<IndicatorProps>

export type SelectComponents = {
  ClearIndicator: IndicatorComponentType,
  Control: ComponentType<ControlProps>,
  DropdownIndicator: IndicatorComponentType,
  Group: ComponentType<GroupProps>,
  GroupHeading: ComponentType<any>,
  IndicatorsContainer: ComponentType<IndicatorContainerProps>,
  IndicatorSeparator: IndicatorComponentType,
  Input: ComponentType<InputProps>,
  LoadingIndicator: ComponentType<LoadingIconProps>,
  Menu: ComponentType<MenuProps>,
  MenuList: ComponentType<MenuListComponentProps>,
  LoadingMessage: ComponentType<NoticeProps>,
  NoOptionsMessage: ComponentType<NoticeProps>,
  MultiValue: ComponentType<MultiValueProps>,
  MultiValueContainer: ComponentType<any>,
  MultiValueLabel: ComponentType<any>,
  MultiValueRemove: ComponentType<any>,
  Option: ComponentType<OptionProps>,
  Placeholder: ComponentType<PlaceholderProps>,
  SelectContainer: ComponentType<ContainerProps>,
  SingleValue: ComponentType<SingleValueProps>,
  ValueContainer: ComponentType<ValueContainerProps>,
};

export type SelectComponentsConfig = $Shape<SelectComponents>;

export const components: SelectComponents = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu,
  MenuList: MenuList,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer,
};

type Props = {
  components: SelectComponentsConfig,
};

export const defaultComponents = (props: Props) => ({
  ...components,
  ...props.components,
});
