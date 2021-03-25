import { Component } from 'react';

import { CreatableProps } from 'react-select/src/Creatable';
import { GroupBase, OptionBase } from 'react-select';

export default class Select<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<CreatableProps<Option, IsMulti, Group>> {}
