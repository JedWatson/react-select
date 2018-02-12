// @flow

import { Component, type Element, type ElementRef } from 'react';
import { findDOMNode } from 'react-dom';

type Props = {
  children: Element<any>,
  innerRef: ElementRef<*>,
};

export default class NodeFinder extends Component<Props> {
  componentDidMount() {
    this.props.innerRef(findDOMNode(this));
  }
  componentWillUnmount() {
    this.props.innerRef(null);
  }
  render() {
    return this.props.children;
  }
}
