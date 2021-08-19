import { Component } from 'react';
import { GroupBase, GroupProps } from 'react-select';

export default class Group<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<GroupProps<Option, IsMulti, Group>> {}
