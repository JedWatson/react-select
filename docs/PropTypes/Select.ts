import { Component } from 'react';

import { Props, defaultProps } from 'react-select/src/Select';
import { GroupBase, OptionBase } from 'react-select';

export default class Select extends Component<
  Props<OptionBase, boolean, GroupBase<OptionBase>>
> {
  defaultProps = defaultProps;
}
