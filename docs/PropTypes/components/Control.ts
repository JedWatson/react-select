import { Component } from 'react';
import { ControlProps, GroupBase, OptionBase } from 'react-select';

export default class Control<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<ControlProps<Option, IsMulti, Group>> {}
