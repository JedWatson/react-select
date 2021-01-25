import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';

export default class Placeholder extends Component<
  PlaceholderProps<OptionTypeBase, boolean>
> {}
