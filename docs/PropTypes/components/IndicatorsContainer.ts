import { Component } from 'react';
import { GroupBase, IndicatorsContainerProps, OptionBase } from 'react-select';

export default class IndicatorsContainer<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<IndicatorsContainerProps<Option, IsMulti, Group>> {}
