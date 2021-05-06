import { Component } from 'react';
import { GroupBase, OptionBase, PlaceholderProps } from 'react-select';

export default class Placeholder<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<PlaceholderProps<Option, IsMulti, Group>> {}
