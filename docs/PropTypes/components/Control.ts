import { Component } from 'react';
import { ControlProps, GroupBase } from 'react-select';

export default class Control<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<ControlProps<Option, IsMulti, Group>> {}
