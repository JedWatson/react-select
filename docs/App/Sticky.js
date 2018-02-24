// @flow
// @jsx glam

import glam from 'glam';
import React, { Component, type ElementRef } from 'react';
import rafSchedule from 'raf-schd';

type Props = {
  children: Element,
};
type State = { isFixed: boolean };

export default class Sticky extends Component<Props, State> {
  innerEl: Element
  outerEl: Element
  state = { isFixed: false };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    // this.handleScroll();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = rafSchedule((event: Event) => {
    if (!this.innerEl || !this.outerEl) return;

    const { top: outerTop } = this.outerEl.getBoundingClientRect();
    const innerTop = this.innerEl.offsetTop && this.innerEl.offsetTop || 0;
    const scrollY = window.pageYOffset;
    const { isFixed } = this.state;

    if (isFixed && outerTop > 0) {
      this.setState({ isFixed: false });
    } else if (!isFixed && scrollY >= innerTop) {
      this.setState({ isFixed: true });
    }
  });
  getOuterEl = (ref: ElementRef<*>) => {
    this.outerEl = ref;
  };
  getInnerEl = (ref: ElementRef<*>) => {
    this.innerEl = ref;
  };
  render() {
    const { isFixed } = this.state;
    const style = isFixed ? { position: 'fixed', top: 0 } : null;
    return (
      <div ref={this.getOuterEl}>
        <div ref={this.getInnerEl} style={style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
