import { Component } from 'react';
import { ContainerProps, GroupBase, OptionBase } from 'react-select';

export default class SelectContainer<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<ContainerProps<Option, IsMulti, Group>> {}
