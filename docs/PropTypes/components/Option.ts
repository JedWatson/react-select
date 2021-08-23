import { Component } from 'react';
import { GroupBase, OptionProps } from 'react-select';

export default class Option<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<OptionProps<Option, IsMulti, Group>> {}
