import { Component } from 'react';

import { AsyncProps, defaultProps } from 'react-select/src/Async';
import { GroupBase, OptionBase } from 'react-select';

export default class Select<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<AsyncProps<Option, IsMulti, Group>> {
  defaultProps = defaultProps;
}
