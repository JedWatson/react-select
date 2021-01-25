import { Component } from 'react';

import { OptionTypeBase } from 'react-select';
import { AsyncProps, defaultProps } from 'react-select/src/Async';

export default class Select extends Component<AsyncProps<OptionTypeBase>> {
  defaultProps = defaultProps;
}
