import { Component } from 'react';
import { GroupBase, OptionBase, OptionProps } from 'react-select';

export default class Option<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<OptionProps<Option, IsMulti, Group>> {}
