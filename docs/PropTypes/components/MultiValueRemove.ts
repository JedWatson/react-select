import { Component } from 'react';
import { GroupBase, MultiValueGenericProps } from 'react-select';

export default class MultiValueRemove<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<MultiValueGenericProps<Option, IsMulti, Group>> {}
