import { Component } from 'react';

import { Props, defaultProps } from 'react-select/src/Select';
import { GroupBase } from 'react-select';

export default class Select extends Component<
  Props<unknown, boolean, GroupBase<unknown>>
> {
  defaultProps = defaultProps;
}
