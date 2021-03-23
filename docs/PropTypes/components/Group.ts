import { Component } from 'react';
import { GroupBase, GroupProps, OptionBase } from 'react-select';

export default class Group<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<GroupProps<Option, IsMulti, Group>> {}
