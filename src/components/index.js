// @flow
import {
  IndicatorsContainer,
  SelectContainer,
  ValueContainer,
} from './containers';
import { ClearIndicator, DropdownIndicator } from './indicators';

import Control from './Control';
import Group from './Group';
import Input from './Input';
import Label from './Label';
import Menu, { MenuList, NoOptions } from './Menu';
import MultiValue from './MultiValue';
import Option from './Option';
import Placeholder from './Placeholder';
import SingleValue from './SingleValue';

export type SelectComponents = {
  ClearIndicator: typeof ClearIndicator,
  Control: typeof Control,
  DropdownIndicator: typeof DropdownIndicator,
  Group: typeof Group,
  Label: typeof Label,
  IndicatorsContainer: typeof IndicatorsContainer,
  Input: typeof Input,
  Menu: typeof Menu,
  MenuList: typeof MenuList,
  MultiValue: typeof MultiValue,
  NoOptions: typeof NoOptions,
  Option: typeof Option,
  Placeholder: typeof Placeholder,
  SelectContainer: typeof SelectContainer,
  SingleValue: typeof SingleValue,
  ValueContainer: typeof ValueContainer,
};

export const components: SelectComponents = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  Group: Group,
  Label: Label,
  IndicatorsContainer: IndicatorsContainer,
  Input: Input,
  Menu: Menu,
  MenuList: MenuList,
  MultiValue: MultiValue,
  NoOptions: NoOptions,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer,
};

type Props = {
  components: SelectComponents,
};

export const defaultComponents = (props: Props) => ({
  ...components,
  ...props.components,
});
