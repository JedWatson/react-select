import { Component } from 'react';

import { OptionTypeBase } from 'react-select';
import { CreatableProps, defaultProps } from 'react-select/src/Creatable';

export default class Select extends Component<
  CreatableProps<OptionTypeBase, boolean>
> {
  defaultProps = defaultProps;
}
