import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { Props, defaultProps } from 'react-select/src/stateManager';

export default class StateManager extends Component<
  Props<OptionTypeBase, boolean>
> {
  defaultProps = defaultProps;
}
