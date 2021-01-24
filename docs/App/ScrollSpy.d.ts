import { Component } from 'react';

interface Props {
  onChange: (ids: string[]) => void;
}

export default class ScrollSpy extends Component<Props> {
  buildNodeList: () => void;
}
