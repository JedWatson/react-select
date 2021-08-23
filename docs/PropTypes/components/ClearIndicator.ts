import { Component } from 'react';
import { GroupBase, ClearIndicatorProps } from 'react-select';

export default class ClearIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<ClearIndicatorProps<Option, IsMulti, Group>> {}
