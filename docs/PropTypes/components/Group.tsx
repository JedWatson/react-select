import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { GroupProps } from 'react-select/src/components/Group';

export default class Group extends Component<
  GroupProps<OptionTypeBase, boolean>
> {}
