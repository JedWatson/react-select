import { Component } from 'react';
import { GroupBase, OptionBase } from 'react-select';
import { StateMangerProps, defaultProps } from 'react-select/src/stateManager';

export default class StateManager<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<StateMangerProps<Option, IsMulti, Group>> {
  defaultProps = defaultProps;
}
