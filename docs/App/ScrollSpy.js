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
  query: '[data-hash]',
};
type State = {
  elements: Array<HTMLElement>,
};

function getStyle(el, prop, numeric = true) {
  const val = window.getComputedStyle(el, null).getPropertyValue(prop);
  return numeric ? parseFloat(val) : val;
}
function isInView(el, elements) {
  const { top } = el.getBoundingClientRect();
  const offset = getStyle(el, 'padding-top') * -1;
  const nextIndex = elements.indexOf(el) + 1;
  // $FlowFixMe parentElement def exists
  const wrapperHeight = el.parentElement.offsetHeight;
  const scrollBottom = window.pageYOffset + window.innerHeight;
  const bottom = elements[nextIndex]
    ? elements[nextIndex].getBoundingClientRect().top
    : wrapperHeight;

  return top >= offset && bottom <= scrollBottom;
}

export default class ScrollSpy extends Component<Props, State> {
  nav: Element;
  allIds = [];
  state = { elements: [] };
  static defaultProps = { preserveHeight: false };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    this.buildNodeList();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = rafSchedule((event: Event) => {
    event.preventDefault();
    const { onChange } = this.props;
    const { elements } = this.state;
    if (!elements.length) return;

    const idsInView = elements
      .filter(el => isInView(el, elements))
      .map(i => i.getAttribute('id'));

    if (idsInView.length) {
      onChange(idsInView);
    }
  });
  getElements = (ref: ElementRef<*>) => {
    if (!ref) return;
    this.nav = ref;
  };
  buildNodeList = () => {
    if (!this.nav) return;

    const anchorList = this.nav.querySelectorAll('[data-hash]');
    const els = Array.from(anchorList).map(i =>
      document.querySelector(`#${i.dataset.hash}`)
    );

    const elements = ((els: any): Array<HTMLElement>); // suck it flow...

    this.setState({ elements });
  };
  render() {
    return (
      <NodeResolver innerRef={this.getElements}>
        {this.props.children}
      </NodeResolver>
    );
  }
}
