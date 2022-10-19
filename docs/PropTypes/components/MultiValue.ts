import { Component } from 'react';
import { GroupBase, MultiValueProps } from 'react-select';

export default class MultiValue<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<MultiValueProps<Option, IsMulti, Group>> {}
