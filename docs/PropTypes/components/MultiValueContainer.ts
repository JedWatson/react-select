import { Component } from 'react';
import { GroupBase, MultiValueGenericProps } from 'react-select';

export default class MultiValueContainer<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<MultiValueGenericProps<Option, IsMulti, Group>> {}
