// @flow

import {
  containerCSS,
  indicatorsContainerCSS,
  valueContainerCSS,
} from './components/containers';
import { css as controlCSS } from './components/Control';
import { groupCSS, groupHeadingCSS } from './components/Group';
import { css as indicatorCSS } from './components/indicators';
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
  container?: Props => {},
  control?: Props => {},
  group?: Props => {},
  groupHeading?: Props => {},
  indicator?: Props => {},
  indicatorsContainer?: Props => {},
  input?: Props => {},
  menu?: Props => {},
  menuList?: Props => {},
  noOptionsMessageCSS?: Props => {},
  loadingMessageCSS?: Props => {},
  multiValue?: Props => {},
  multiValueLabel?: Props => {},
  multiValueRemove?: Props => {},
  option?: Props => {},
  placeholder?: Props => {},
  singleValue?: Props => {},
  valueContainer: Props => {},
};
export type StylesConfig = $Shape<Styles>;
export type GetStyles = (string, Props) => {};

export const defaultStyles: Styles = {
  container: containerCSS,
  control: controlCSS,
  group: groupCSS,
  groupHeading: groupHeadingCSS,
  indicator: indicatorCSS,
  indicatorsContainer: indicatorsContainerCSS,
  input: inputCSS,
  menu: menuCSS,
  menuList: menuListCSS,
  loadingMessage: loadingMessageCSS,
  noOptionsMessage: noOptionsMessageCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  option: optionCSS,
  placeholder: placeholderCSS,
  singleValue: singleValueCSS,
  valueContainer: valueContainerCSS,
};
