// @flow
import React, { Component, type Element } from 'react';
import NodeFinder from './NodeFinder';

type Props = {
  children: Element<*>,
  enabled: boolean,
};

function cancelScrollEvent(event: SyntheticEvent<HTMLElement>) {
  event.stopPropagation();
  event.preventDefault();
  // nativeEvent is `undefined`, not sure why this is the case...
  // event.nativeEvent.stopImmediatePropagation();
  return false;
}

export default class ScrollLock extends Component<Props> {
  scrollTarget: HTMLElement;
  touchStart: number;
  static defaultProps = { enabled: true };

  componentDidMount() {
    if (this.props.enabled) {
      this.listenToScrollEvents(this.scrollTarget);
    }
  }
  componentWillUnmount() {
    this.stopListeningToScrollEvents(this.scrollTarget);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.enabled === nextProps.enabled) return;

    const fn = nextProps.enabled
      ? this.listenToScrollEvents
      : this.stopListeningToScrollEvents;

    fn(this.scrollTarget);
  }

  getScrollTarget = (ref: HTMLElement) => {
    this.scrollTarget = ref;
  };

  handleEventDelta = (event: SyntheticEvent<HTMLElement>, delta: number) => {
    const isDeltaPositive = delta > 0;
    const elem = this.scrollTarget;
    const { scrollTop, scrollHeight, clientHeight } = elem;

    let shouldCancelScroll = false;

    // bottom limit
    if (isDeltaPositive && delta > scrollHeight - clientHeight - scrollTop) {
      elem.scrollTop = scrollHeight;
      shouldCancelScroll = true;

      // top limit
    } else if (!isDeltaPositive && -delta > scrollTop) {
      elem.scrollTop = 0;
      shouldCancelScroll = true;
    }

    // kill it
    if (shouldCancelScroll) {
      cancelScrollEvent(event);
    }
  };

  onWheelHandler = (event: SyntheticWheelEvent<HTMLElement>) => {
    this.handleEventDelta(event, event.deltaY);
  };

  onTouchStartHandler = (event: SyntheticTouchEvent<HTMLElement>) => {
    // set touch start so we can calculate touchmove delta
    this.touchStart = event.changedTouches[0].clientY;
  };

  onTouchMoveHandler = (event: SyntheticTouchEvent<HTMLElement>) => {
    const delta = this.touchStart - event.changedTouches[0].clientY;
    this.handleEventDelta(event, delta);
  };

  listenToScrollEvents = (el: HTMLElement) => {
    // bail early if no scroll available
    if (el.scrollHeight <= el.clientHeight) return;

    // all the if statements are to appease Flow 😢
    if (typeof el.addEventListener === 'function') {
      el.addEventListener('wheel', this.onWheelHandler, false);
    }
    if (typeof el.addEventListener === 'function') {
      el.addEventListener('touchstart', this.onTouchStartHandler, false);
    }
    if (typeof el.addEventListener === 'function') {
      el.addEventListener('touchmove', this.onTouchMoveHandler, false);
    }
  };

  stopListeningToScrollEvents = (el: HTMLElement) => {
    // bail early if no scroll available
    if (el.scrollHeight <= el.clientHeight) return;

    // all the if statements are to appease Flow 😢
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('wheel', this.onWheelHandler, false);
    }
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('touchstart', this.onTouchStartHandler, false);
    }
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('touchmove', this.onTouchMoveHandler, false);
    }
  };

  render() {
    return (
      <NodeFinder innerRef={this.getScrollTarget}>
        {this.props.children}
      </NodeFinder>
    );
  }
}
