import { Component } from 'react';
import { GroupBase, InputProps, OptionBase } from 'react-select';

export default class Input<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<InputProps<Option, IsMulti, Group>> {}
