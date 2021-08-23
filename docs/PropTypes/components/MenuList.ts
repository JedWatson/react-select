import { Component } from 'react';
import { GroupBase, MenuListProps } from 'react-select';

export default class MenuList<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<MenuListProps<Option, IsMulti, Group>> {}
