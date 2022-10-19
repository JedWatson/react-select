import { Component } from 'react';
import { GroupBase, PlaceholderProps } from 'react-select';

export default class Placeholder<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<PlaceholderProps<Option, IsMulti, Group>> {}
