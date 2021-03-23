import { Component } from 'react';
import { GroupBase, DropdownIndicatorProps, OptionBase } from 'react-select';

export default class DropdownIndicator<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<DropdownIndicatorProps<Option, IsMulti, Group>> {}
