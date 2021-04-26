import { Component } from 'react';

import { AsyncProps } from 'react-select/src/Async';
import { GroupBase, OptionBase } from 'react-select';

export default class Select<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<AsyncProps<Option, IsMulti, Group>> {}
