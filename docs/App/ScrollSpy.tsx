import React, { Component, RefCallback } from 'react';
import rafSchedule from 'raf-schd';
import NodeResolver from 'react-node-resolver';

interface Props {
  readonly onChange: (elements: readonly (string | null)[]) => void;
}
interface State {
  readonly elements: readonly HTMLElement[];
}

function getStyle(el: HTMLElement, prop: string) {
  const val = window.getComputedStyle(el, null).getPropertyValue(prop);
  return parseFloat(val);
}
function isInView(el: HTMLElement) {
  let rect = el.getBoundingClientRect();

  const topOffset =
    (getStyle(el, 'padding-top') + getStyle(el, 'margin-top')) * -1;

  if (rect.top >= topOffset && rect.bottom <= window.innerHeight) {
    return true;
  }

  return false;
}

export default class ScrollSpy extends Component<Props, State> {
  nav: HTMLElement | undefined;
  allIds = [];
  state: State = { elements: [] };
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

    const idsInView = elements.filter(isInView).map(i => i.getAttribute('id'));
    if (idsInView.length) {
      onChange(idsInView);
    }
  });
  getElements: RefCallback<HTMLElement> = ref => {
    if (!ref) return;
    this.nav = ref;
  };
  buildNodeList = () => {
    if (!this.nav) return;

    const anchorList = this.nav.querySelectorAll<HTMLElement>('[data-hash]');
    const elements = Array.from(anchorList).map(
      i => document.querySelector<HTMLElement>(`#${i.dataset.hash}`)!
    );

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
