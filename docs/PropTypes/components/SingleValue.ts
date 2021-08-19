import { Component } from 'react';
import { GroupBase, SingleValueProps } from 'react-select';

export default class SingleValue<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<SingleValueProps<Option, IsMulti, Group>> {}
