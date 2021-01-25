import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { MenuProps } from 'react-select/src/components/Menu';

export default class Menu extends Component<
  MenuProps<OptionTypeBase, boolean>
> {}
