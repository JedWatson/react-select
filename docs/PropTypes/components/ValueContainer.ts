import { Component } from 'react';
import { GroupBase, ValueContainerProps } from 'react-select';

export default class ValueContainer<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<ValueContainerProps<Option, IsMulti, Group>> {}
