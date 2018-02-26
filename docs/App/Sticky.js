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
  preserveHeight: boolean,
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
  static defaultProps = { preserveHeight: false };
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
    const innerTop = (this.innerEl.offsetTop && this.innerEl.offsetTop) || 0;
    const scrollY = window.pageYOffset;
    const { isFixed } = this.state;

    // check for `isFixed` before setting state to prevent thrashing
    if (isFixed && outerTop > 0) {
      this.setState({ isFixed: false });
    } else if (!isFixed && scrollY >= innerTop) {
      this.setState({ isFixed: true });
    }
  });
  getOuterEl = (ref: ElementRef<*>) => {
    if (!ref) return;

    this.outerEl = ref;
  };
  getInnerEl = (ref: ElementRef<*>) => {
    if (!ref) return;

    this.innerEl = ref;

    // get dimensions once, we're not interested in resize events
    const { height, width } = ref.firstElementChild.getBoundingClientRect();
    if (typeof this.state.height !== 'number') {
      console.warn({ height, width });
      this.setState({ height, width });
    }
  };
  render() {
    const { preserveHeight } = this.props;
    const { height, isFixed, width } = this.state;
    const outerStyle = isFixed && preserveHeight ? { height } : null;
    const innerStyle = isFixed ? { position: 'fixed', top: 0, width } : null;

    return (
      <div ref={this.getOuterEl} style={outerStyle}>
        <div ref={this.getInnerEl} style={innerStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
