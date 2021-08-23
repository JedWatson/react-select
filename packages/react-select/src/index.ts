import Select from './Select';
import { GroupBase } from './types';

export { default } from './stateManager';
export { default as NonceProvider } from './NonceProvider';
export { mergeStyles } from './styles';
export { defaultTheme } from './theme';
export { createFilter } from './filters';
export { components } from './components';
export type SelectInstance<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Select<Option, IsMulti, Group>;
export type { StateManagerProps as Props } from './useStateManager';

export type {
  ContainerProps,
  IndicatorsContainerProps,
  ValueContainerProps,
} from './components/containers';
export type { ControlProps } from './components/Control';
export type { GroupProps, GroupHeadingProps } from './components/Group';
export type {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from './components/indicators';
export type { InputProps } from './components/Input';
export type { MenuListProps, MenuProps, NoticeProps } from './components/Menu';
export type {
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
} from './components/MultiValue';
export type { OptionProps } from './components/Option';
export type { PlaceholderProps } from './components/Placeholder';
export type { SingleValueProps } from './components/SingleValue';
export type { StylesConfig } from './styles';
export * from './types';
export type {
  OptionContext,
  GuidanceContext,
  AriaLive,
  AriaGuidanceProps,
  AriaOnChangeProps,
  AriaOnFilterProps,
  AriaOnFocusProps,
  AriaLiveMessages,
  AriaGuidance,
  AriaOnChange,
  AriaOnFilter,
  AriaOnFocus,
} from './accessibility';
