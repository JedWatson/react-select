import { Component } from 'react';
import { GroupBase, ClearIndicatorProps, OptionBase } from 'react-select';

export default class ClearIndicator<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<ClearIndicatorProps<Option, IsMulti, Group>> {}
