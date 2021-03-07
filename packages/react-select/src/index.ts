import Select from './Select';
import { GroupBase, OptionBase } from './types';

export { default } from './stateManager';
export { default as NonceProvider } from './NonceProvider';
export { mergeStyles } from './styles';
export { defaultTheme } from './theme';
export { createFilter } from './filters';
export { components } from './components';
export type SelectInstance<
  Option extends OptionBase = OptionBase,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Select<Option, IsMulti, Group>;
export { StateManagerProps as Props } from './useStateManager';

export {
  ContainerProps,
  IndicatorContainerProps,
  ValueContainerProps,
} from './components/containers';
export { ControlProps } from './components/Control';
export { GroupProps, GroupHeadingProps } from './components/Group';
export { IndicatorProps, LoadingIndicatorProps } from './components/indicators';
export { InputProps } from './components/Input';
export {
  MenuListComponentProps,
  MenuProps,
  NoticeProps,
} from './components/Menu';
export {
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
} from './components/MultiValue';
export { OptionProps } from './components/Option';
export { PlaceholderProps } from './components/Placeholder';
export { SingleValueProps } from './components/SingleValue';
export { StylesConfig } from './styles';
export * from './types';
