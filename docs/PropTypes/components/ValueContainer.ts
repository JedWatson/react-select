import { Component } from 'react';
import { GroupBase, OptionBase, ValueContainerProps } from 'react-select';

export default class ValueContainer<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<ValueContainerProps<Option, IsMulti, Group>> {}
