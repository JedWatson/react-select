import { Component } from 'react';

interface Props {
  readonly isEditable?: boolean;
  readonly label: string;
  readonly urlPath?: string;
  readonly raw: string;
}

export default class ExampleWrapper extends Component<Props> {}
