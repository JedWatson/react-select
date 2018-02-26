// @flow
// @jsx glam

import glam from 'glam';
import React, {
  Component,
  type ElementRef,
  type Element as ReactElement,
} from 'react';
import rafSchedule from 'raf-schd';

type Props = {
  children: ReactElement<*>, // Component | Element
};
type State = {
  height: number | 'auto',
  isFixed: boolean,
  width: number | 'auto',
};

export default class Sticky extends Component<Props, State> {
  innerEl: Element;
  outerEl: Element;
  state = { height: 'auto', isFixed: false, width: 'auto' };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    // this.handleScroll();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = rafSchedule((event: Event) => {
    if (!this.innerEl || !this.outerEl) return;

    const {
      height,
      top: outerTop,
      width,
    } = this.outerEl.getBoundingClientRect();
    const innerTop = (this.innerEl.offsetTop && this.innerEl.offsetTop) || 0;
    const scrollY = window.pageYOffset;
    const { isFixed } = this.state;

    if (isFixed && outerTop > 0) {
      this.setState({ height, isFixed: false, width });
    } else if (!isFixed && scrollY >= innerTop) {
      this.setState({ height, isFixed: true, width });
    }
  });
  getOuterEl = (ref: ElementRef<*>) => {
    this.outerEl = ref;
  };
  getInnerEl = (ref: ElementRef<*>) => {
    this.innerEl = ref;
  };
  render() {
    const { height, isFixed, width } = this.state;
    const style = isFixed ? { position: 'fixed', top: 0, width } : null;
    return (
      <div ref={this.getOuterEl} style={{ height }}>
        <div ref={this.getInnerEl} style={style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
