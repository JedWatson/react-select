import { Component } from 'react';

import { Props, defaultProps } from 'react-select/src/Select';
import { GroupBase, OptionBase } from 'react-select';

export default class Select<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<Props<Option, IsMulti, Group>> {
  defaultProps = defaultProps;
}
