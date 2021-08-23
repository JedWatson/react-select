import { Component } from 'react';
import { GroupBase, LoadingIndicatorProps } from 'react-select';

export default class LoadingIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<LoadingIndicatorProps<Option, IsMulti, Group>> {}
