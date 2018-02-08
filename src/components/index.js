// @flow
import {
  IndicatorsContainer,
  SelectContainer,
  ValueContainer,
} from './containers';
import {
  ClearIndicator,
  DropdownIndicator,
  LoadingIndicator,
  IndicatorSeparator,
} from './indicators';

import Control from './Control';
import Group, { GroupHeading } from './Group';
import Input from './Input';
import Menu, { MenuList, NoOptionsMessage, LoadingMessage } from './Menu';
import MultiValue, {
  MultiValueContainer,
  MultiValueLabel,
  MultiValueRemove,
} from './MultiValue';
import Option from './Option';
import Placeholder from './Placeholder';
import SingleValue from './SingleValue';

export type SelectComponents = {
  ClearIndicator: typeof ClearIndicator,
  Control: typeof Control,
  DropdownIndicator: typeof DropdownIndicator,
  Group: typeof Group,
  GroupHeading: typeof GroupHeading,
  IndicatorsContainer: typeof IndicatorsContainer,
  IndicatorSeparator: typeof IndicatorSeparator,
  Input: typeof Input,
  LoadingIndicator: typeof LoadingIndicator,
  Menu: typeof Menu,
  MenuList: typeof MenuList,
  LoadingMessage: typeof LoadingMessage,
  NoOptionsMessage: typeof NoOptionsMessage,
  MultiValue: typeof MultiValue,
  MultiValueContainer: typeof MultiValueContainer,
  MultiValueLabel: typeof MultiValueLabel,
  MultiValueRemove: typeof MultiValueRemove,
  Option: typeof Option,
  Placeholder: typeof Placeholder,
  SelectContainer: typeof SelectContainer,
  SingleValue: typeof SingleValue,
  ValueContainer: typeof ValueContainer,
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
