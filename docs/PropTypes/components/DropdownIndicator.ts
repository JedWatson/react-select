import { Component } from 'react';
import { GroupBase, DropdownIndicatorProps } from 'react-select';

export default class DropdownIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<DropdownIndicatorProps<Option, IsMulti, Group>> {}
