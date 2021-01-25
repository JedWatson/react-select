import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { LoadingIndicatorProps } from 'react-select/src/components/indicators';

export default class LoadingIndicator extends Component<
  LoadingIndicatorProps<OptionTypeBase, boolean>
> {}
