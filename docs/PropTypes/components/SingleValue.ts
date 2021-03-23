import { Component } from 'react';
import { GroupBase, OptionBase, SingleValueProps } from 'react-select';

export default class SingleValue<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<SingleValueProps<Option, IsMulti, Group>> {}
