import SelectBase from './Select';
import manageState from './stateManager';

export default manageState(SelectBase);

export { default as NonceProvider } from './NonceProvider';
export { mergeStyles } from './styles';
export { defaultTheme } from './theme';
export { createFilter } from './filters';
export { components } from './components';

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
