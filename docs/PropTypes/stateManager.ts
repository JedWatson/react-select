import { Component } from 'react';

import { StateManagerProps } from 'react-select/src/stateManager';
import { GroupBase, OptionBase } from 'react-select';

export default class StateManager<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<StateManagerProps<Option, IsMulti, Group>> {}
