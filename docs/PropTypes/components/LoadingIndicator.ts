import { Component } from 'react';
import { GroupBase, LoadingIndicatorProps, OptionBase } from 'react-select';

export default class LoadingIndicator<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<LoadingIndicatorProps<Option, IsMulti, Group>> {}
