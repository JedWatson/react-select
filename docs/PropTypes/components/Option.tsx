import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { OptionProps } from 'react-select/src/components/Option';

export default class Option extends Component<
  OptionProps<OptionTypeBase, boolean>
> {}
