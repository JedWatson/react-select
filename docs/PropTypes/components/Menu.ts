import { Component } from 'react';
import { GroupBase, MenuProps } from 'react-select';

export default class Menu<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<MenuProps<Option, IsMulti, Group>> {}
