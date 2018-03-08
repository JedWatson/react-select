import { propsList } from './utils';
import * as SelectProps from './SelectPropTypes';
import * as CustomComponentProps from './CustomComponentPropTypes';

export const Selects = {
  Base: propsList(SelectProps.BaseSelect),
};

export const CustomComponents = {
  ClearIndicator: propsList(CustomComponentProps.IndicatorProps),
  Control: propsList(CustomComponentProps.ControlProps),
  DropdownIndicator: propsList(CustomComponentProps.IndicatorProps),
  Group: propsList(CustomComponentProps.GroupProps),
  GroupHeading: '{ Object }',
  IndicatorsContainer: propsList(CustomComponentProps.IndicatorsContainer),
  IndicatorSeparator: propsList(CustomComponentProps.IndicatorProps),
  Input: [],
  LoadingIndicator: [],
  Menu: [],
  MenuList: [],
  LoadingMessage: [],
  NoOptionsMessage: [],
  MultiValue: [],
  MultiValueContainer: [],
  MultiValueLabel: [],
  MultiValueRemove: [],
  Option: [],
  Placeholder: [],
  SelectContainer: [],
  SingleValue: [],
  ValueContainer: [],
};
