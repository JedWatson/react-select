import { Component } from 'react';
import { GroupBase, MenuProps, OptionBase } from 'react-select';

export default class Menu<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<MenuProps<Option, IsMulti, Group>> {}
