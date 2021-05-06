import { Component } from 'react';
import { GroupBase, MenuListProps, OptionBase } from 'react-select';

export default class MenuList<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<MenuListProps<Option, IsMulti, Group>> {}
