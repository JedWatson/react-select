import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { MenuListComponentProps } from 'react-select/src/components/Menu';

export default class MenuList extends Component<
  MenuListComponentProps<OptionTypeBase, boolean>
> {}
