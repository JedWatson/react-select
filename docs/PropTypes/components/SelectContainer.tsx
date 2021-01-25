import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { ContainerProps } from 'react-select/src/components/containers';

export default class SelectContainer extends Component<
  ContainerProps<OptionTypeBase, boolean>
> {}
