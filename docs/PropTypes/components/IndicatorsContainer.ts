import { Component } from 'react';
import { GroupBase, IndicatorsContainerProps } from 'react-select';

export default class IndicatorsContainer<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<IndicatorsContainerProps<Option, IsMulti, Group>> {}
