import { Component } from 'react';
import { GroupBase, MultiValueProps, OptionBase } from 'react-select';

export default class MultiValue<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<MultiValueProps<Option, IsMulti, Group>> {}
