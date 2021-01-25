import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { ValueContainerProps } from 'react-select/src/components/containers';

export default class ValueContainer extends Component<
  ValueContainerProps<OptionTypeBase, boolean>
> {}
