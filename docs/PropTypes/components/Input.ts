import { Component } from 'react';
import { GroupBase, InputProps } from 'react-select';

export default class Input<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<InputProps<Option, IsMulti, Group>> {}
