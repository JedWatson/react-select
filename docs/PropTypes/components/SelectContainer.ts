import { Component } from 'react';
import { ContainerProps, GroupBase } from 'react-select';

export default class SelectContainer<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<ContainerProps<Option, IsMulti, Group>> {}
