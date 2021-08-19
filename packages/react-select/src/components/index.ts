import { ComponentType } from 'react';
import {
  ContainerProps,
  IndicatorsContainer,
  IndicatorsContainerProps,
  SelectContainer,
  ValueContainer,
  ValueContainerProps,
} from './containers';
import {
  ClearIndicator,
  ClearIndicatorProps,
  CrossIcon,
  CrossIconProps,
  DownChevron,
  DownChevronProps,
  DropdownIndicator,
  DropdownIndicatorProps,
  IndicatorSeparator,
  IndicatorSeparatorProps,
  LoadingIndicator,
  LoadingIndicatorProps,
} from './indicators';

import Control, { ControlProps } from './Control';
import Group, { GroupHeading, GroupHeadingProps, GroupProps } from './Group';
import Input, { InputProps } from './Input';
import Menu, {
  LoadingMessage,
  MenuList,
  MenuListProps,
  MenuPortal,
  MenuPortalProps,
  MenuProps,
  NoOptionsMessage,
  NoticeProps,
} from './Menu';
import MultiValue, {
  MultiValueContainer,
  MultiValueGenericProps,
  MultiValueLabel,
  MultiValueProps,
  MultiValueRemove,
  MultiValueRemoveProps,
} from './MultiValue';
import Option, { OptionProps } from './Option';
import Placeholder, { PlaceholderProps } from './Placeholder';
import SingleValue, { SingleValueProps } from './SingleValue';
import { GroupBase } from '../types';

export interface SelectComponents<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  ClearIndicator: ComponentType<ClearIndicatorProps<Option, IsMulti, Group>>;
  Control: ComponentType<ControlProps<Option, IsMulti, Group>>;
  DropdownIndicator: ComponentType<
    DropdownIndicatorProps<Option, IsMulti, Group>
  > | null;
  DownChevron: ComponentType<DownChevronProps>;
  CrossIcon: ComponentType<CrossIconProps>;
  Group: ComponentType<GroupProps<Option, IsMulti, Group>>;
  GroupHeading: ComponentType<GroupHeadingProps<Option, IsMulti, Group>>;
  IndicatorsContainer: ComponentType<
    IndicatorsContainerProps<Option, IsMulti, Group>
  >;
  IndicatorSeparator: ComponentType<
    IndicatorSeparatorProps<Option, IsMulti, Group>
  > | null;
  Input: ComponentType<InputProps<Option, IsMulti, Group>>;
  LoadingIndicator: ComponentType<
    LoadingIndicatorProps<Option, IsMulti, Group>
  >;
  Menu: ComponentType<MenuProps<Option, IsMulti, Group>>;
  MenuList: ComponentType<MenuListProps<Option, IsMulti, Group>>;
  MenuPortal: ComponentType<MenuPortalProps<Option, IsMulti, Group>>;
  LoadingMessage: ComponentType<NoticeProps<Option, IsMulti, Group>>;
  NoOptionsMessage: ComponentType<NoticeProps<Option, IsMulti, Group>>;
  MultiValue: ComponentType<MultiValueProps<Option, IsMulti, Group>>;
  MultiValueContainer: ComponentType<
    MultiValueGenericProps<Option, IsMulti, Group>
  >;
  MultiValueLabel: ComponentType<
    MultiValueGenericProps<Option, IsMulti, Group>
  >;
  MultiValueRemove: ComponentType<
    MultiValueRemoveProps<Option, IsMulti, Group>
  >;
  Option: ComponentType<OptionProps<Option, IsMulti, Group>>;
  Placeholder: ComponentType<PlaceholderProps<Option, IsMulti, Group>>;
  SelectContainer: ComponentType<ContainerProps<Option, IsMulti, Group>>;
  SingleValue: ComponentType<SingleValueProps<Option, IsMulti, Group>>;
  ValueContainer: ComponentType<ValueContainerProps<Option, IsMulti, Group>>;
}

export type SelectComponentsConfig<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = Partial<SelectComponents<Option, IsMulti, Group>>;

export const components = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu,
  MenuList: MenuList,
  MenuPortal: MenuPortal,
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

export type SelectComponentsGeneric = typeof components;

interface Props<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  components: SelectComponentsConfig<Option, IsMulti, Group>;
}

export const defaultComponents = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: Props<Option, IsMulti, Group>
): SelectComponentsGeneric =>
  ({
    ...components,
    ...props.components,
  } as SelectComponentsGeneric);
