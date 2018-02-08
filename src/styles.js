// @flow

import {
  containerCSS,
  indicatorsContainerCSS,
  valueContainerCSS,
} from './components/containers';
import { css as controlCSS } from './components/Control';
import { groupCSS, groupHeadingCSS } from './components/Group';
import {
  clearIndicatorCSS,
  dropdownIndicatorCSS,
  loadingIndicatorCSS,
  indicatorSeparatorCSS,
} from './components/indicators';
import { css as inputCSS } from './components/Input';
import { css as placeholderCSS } from './components/Placeholder';
import { css as optionCSS } from './components/Option';
import {
  menuCSS,
  menuListCSS,
  noOptionsMessageCSS,
  loadingMessageCSS,
} from './components/Menu';
import { css as singleValueCSS } from './components/SingleValue';
import {
  multiValueCSS,
  multiValueLabelCSS,
  multiValueRemoveCSS,
} from './components/MultiValue';

type Props = { [key: string]: any };

export type Styles = {
  clearIndicator?: Props => {},
  container?: Props => {},
  control?: Props => {},
  dropdownIndicator?: Props => {},
  group?: Props => {},
  groupHeading?: Props => {},
  indicatorsContainer?: Props => {},
  indicatorSeparator?: Props => {},
  input?: Props => {},
  loadingIndicator?: Props => {},
  loadingMessageCSS?: Props => {},
  menu?: Props => {},
  menuList?: Props => {},
  multiValue?: Props => {},
  multiValueLabel?: Props => {},
  multiValueRemove?: Props => {},
  noOptionsMessageCSS?: Props => {},
  option?: Props => {},
  placeholder?: Props => {},
  singleValue?: Props => {},
  valueContainer: Props => {},
};
export type StylesConfig = $Shape<Styles>;
export type GetStyles = (string, Props) => {};

export const defaultStyles: Styles = {
  clearIndicator: clearIndicatorCSS,
  container: containerCSS,
  control: controlCSS,
  dropdownIndicator: dropdownIndicatorCSS,
  group: groupCSS,
  groupHeading: groupHeadingCSS,
  indicatorsContainer: indicatorsContainerCSS,
  indicatorSeparator: indicatorSeparatorCSS,
  input: inputCSS,
  loadingIndicator: loadingIndicatorCSS,
  loadingMessage: loadingMessageCSS,
  menu: menuCSS,
  menuList: menuListCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  noOptionsMessage: noOptionsMessageCSS,
  option: optionCSS,
  placeholder: placeholderCSS,
  singleValue: singleValueCSS,
  valueContainer: valueContainerCSS,
};
