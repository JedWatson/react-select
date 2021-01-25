import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { ControlProps } from 'react-select/src/components/Control';

export default class Control extends Component<
  ControlProps<OptionTypeBase, boolean>
> {}
