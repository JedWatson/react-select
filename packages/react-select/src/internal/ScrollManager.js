// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { PureComponent, type Element } from 'react';
import ScrollLock from './ScrollLock/index';

type RefCallback<T> = (T | null) => void;

type Props = {
  children: (RefCallback<HTMLElement>) => Element<*>,
  lockEnabled: boolean,
  captureEnabled: boolean,
  onBottomArrive?: (event: SyntheticEvent<HTMLElement>) => void,
  onBottomLeave?: (event: SyntheticEvent<HTMLElement>) => void,
  onTopArrive?: (event: SyntheticEvent<HTMLElement>) => void,
  onTopLeave?: (event: SyntheticEvent<HTMLElement>) => void,
}

type State = {
  enableLock: boolean
}

const defaultProps = {
  captureEnabled: true
};

export default class ScrollManager extends PureComponent<Props,State> {
  static defaultProps = defaultProps;

  isBottom: boolean = false;
  isTop: boolean = false;
  touchStart: number;

  state = {
    enableLock: false
  }

  targetRef = React.createRef<HTMLElement>();

  blurSelectInput = () => document.activeElement && document.activeElement.blur();

  componentDidMount() {
    if (this.props.captureEnabled) {
      this.startListening(this.targetRef.current);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.captureEnabled !== this.props.captureEnabled) {
      if (this.props.captureEnabled) {
        this.startListening(this.targetRef.current);
      } else {
        this.stopListening(this.targetRef.current);
      }
    }
  }

  componentWillUnmount() {
    this.stopListening(this.targetRef.current);
  }

  startListening(el: ?HTMLElement) {
    // bail early if no element is available to attach to
    if (!el) return;

    // all the if statements are to appease Flow 😢
    if (typeof el.addEventListener === 'function') {
      el.addEventListener('wheel', this.onWheel, false);
    }
    if (typeof el.addEventListener === 'function') {
      el.addEventListener('touchstart', this.onTouchStart, false);
    }
    if (typeof el.addEventListener === 'function') {
      el.addEventListener('touchmove', this.onTouchMove, false);
    }
  }

  stopListening(el: ?HTMLElement) {
    // bail early if no element is available to detach from
    if (!el) return;

    // all the if statements are to appease Flow 😢
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('wheel', this.onWheel, false);
    }
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('touchstart', this.onTouchStart, false);
    }
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('touchmove', this.onTouchMove, false);
    }
  }

  cancelScroll = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  handleEventDelta = (event: SyntheticEvent<HTMLElement>, delta: number) => {
    const {
      onBottomArrive,
      onBottomLeave,
      onTopArrive,
      onTopLeave,
    } = this.props;

    // Reference should never be `null` at this point, but flow complains otherwise
    if (this.targetRef.current === null) return;

    const { scrollTop, scrollHeight, clientHeight } = this.targetRef.current;
    const target = this.targetRef.current;
    const isDeltaPositive = delta > 0;
    const availableScroll = scrollHeight - clientHeight - scrollTop;
    let shouldCancelScroll = false;

    // reset bottom/top flags
    if (availableScroll > delta && this.isBottom) {
      if (onBottomLeave) onBottomLeave(event);
      this.isBottom = false;
    }
    if (isDeltaPositive && this.isTop) {
      if (onTopLeave) onTopLeave(event);
      this.isTop = false;
    }

    // bottom limit
    if (isDeltaPositive && delta > availableScroll) {
      if (onBottomArrive && !this.isBottom) {
        onBottomArrive(event);
      }
      target.scrollTop = scrollHeight;
      shouldCancelScroll = true;
      this.isBottom = true;

      // top limit
    } else if (!isDeltaPositive && -delta > scrollTop) {
      if (onTopArrive && !this.isTop) {
        onTopArrive(event);
      }
      target.scrollTop = 0;
      shouldCancelScroll = true;
      this.isTop = true;
    }

    // cancel scroll
    if (shouldCancelScroll) {
      this.cancelScroll(event);
    }
  };

  onWheel = (event: SyntheticWheelEvent<HTMLElement>) => {
    this.handleEventDelta(event, event.deltaY);
  };
  onTouchStart = (event: SyntheticTouchEvent<HTMLElement>) => {
    // set touch start so we can calculate touchmove delta
    this.touchStart = event.changedTouches[0].clientY;
  };
  onTouchMove = (event: SyntheticTouchEvent<HTMLElement>) => {
    const deltaY = this.touchStart - event.changedTouches[0].clientY;
    this.handleEventDelta(event, deltaY);
  };

  setTargetRef = (instance: HTMLElement | null) => {
    this.targetRef.current = instance;
    this.setState({ enableLock: !!instance });
  }

  render() {
    const { children, lockEnabled } = this.props;

    /*
     * Div
     * ------------------------------
     * blocks scrolling on non-body elements behind the menu
     * ScrollLock
     * ------------------------------
     * actually does the scroll locking
     */
    return (
      <React.Fragment>
        {lockEnabled && <div
            onClick={this.blurSelectInput}
            css={{ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 }}
        />}
        {children(this.setTargetRef)}
        {(this.state.enableLock && this.targetRef.current) && <ScrollLock touchScrollTarget={this.targetRef.current} />}
      </React.Fragment>
    );
  }
}
