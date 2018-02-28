// @flow
// @jsx glam

import glam from 'glam';
import React, {
  Component,
  type ElementRef,
  type Element as ReactElement,
} from 'react';
import rafSchedule from 'raf-schd';
import NodeResolver from 'react-node-resolver';

type Props = {
  children: ReactElement<*>, // Component | Element
  onChange: (Array<any>) => void,
};
type State = {
  elements: Array<Element>,
};

function isInView(el) {
  var rect = el.getBoundingClientRect();

  const topThird = rect.top >= 0 && rect.bottom <= window.innerHeight;

  if (topThird) return true;

  return false;
}
// const unique = (item, pos, self) => self.indexOf(item) == pos;

export default class ScrollSpy extends Component<Props, State> {
  nav: Element;
  allIds = [];
  state = { elements: [] };
  static defaultProps = { preserveHeight: false };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = rafSchedule((event: Event) => {
    const { onChange } = this.props;
    const { elements } = this.state;
    if (!elements.length) return;

    const idsInView = elements.filter(isInView).map(i => i.getAttribute('id'));

    // console.log('idsInView', idsInView);

    if (idsInView.length) {
      onChange(idsInView);
    }
  });
  getNav = (ref: ElementRef<*>) => {
    if (!ref || this.state.elements.length) return;

    this.nav = ref;

    // get the elements once
    const anchorList = this.nav.querySelectorAll('a');
    const elements = Array.from(anchorList).map(i =>
      document.querySelector(i.getAttribute('href'))
    );

    this.setState({ elements });
  };
  render() {
    return (
      <NodeResolver innerRef={this.getNav}>{this.props.children}</NodeResolver>
    );
  }
}
