import { Component } from 'react';
import { DropdownIndicatorProps, GroupBase, OptionBase } from 'react-select';

export default class DropdownIndicator<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<DropdownIndicatorProps<Option, IsMulti, Group>> {}
