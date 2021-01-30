// Type definitions for react-select 4.0
// Project: https://github.com/JedWatson/react-select#readme
// Definitions by: Claas Ahlrichs <https://github.com/claasahl>
//                 Jon Freedman <https://github.com/jonfreedman>
//                 Nathan Bierema <https://github.com/Methuselah96>
//                 Thomas Chia <https://github.com/thchia>
//                 Joonas Rouhiainen <https://github.com/rjoonas>
//                 Kyle Holmberg <https://github.com/kylemh>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { StateManager } from './stateManager';

export default StateManager;

export * from './types';
export { createFilter } from './filters';
export { mergeStyles, Styles, StylesConfig } from './styles';
export { defaultTheme } from './theme';

export { NonceProvider } from './NonceProvider';
export { Props, FormatOptionLabelMeta, NamedProps } from './Select';

export {
  components,
  SelectComponentsConfig,
  IndicatorComponentType,
} from './components';
export {
  ValueContainerProps,
  ContainerProps,
  IndicatorContainerProps,
} from './components/containers';
export { IndicatorProps } from './components/indicators';
export { ControlProps } from './components/Control';
export { GroupProps } from './components/Group';
export { InputProps } from './components/Input';
export { MenuProps, MenuListComponentProps } from './components/Menu';
export { MultiValueProps } from './components/MultiValue';
export { OptionProps } from './components/Option';
export { PlaceholderProps } from './components/Placeholder';
export { SingleValueProps } from './components/SingleValue';
