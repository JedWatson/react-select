// @flow
/** @jsx jsx */
import { PureComponent, type Element } from 'react';
import { jsx } from '@emotion/core';
import ScrollLock from './ScrollLock/index';

type Props = {
  children: Element<*>,
  isEnabled: boolean,
  targetRef: HTMLElement | null,
};

// NOTE:
// We shouldn't need this after updating to React v16.3.0, which introduces:
// - createRef() https://reactjs.org/docs/react-api.html#reactcreateref
// - forwardRef() https://reactjs.org/docs/react-api.html#reactforwardref

export default class ScrollBlock extends PureComponent<Props> {

  // this will close the menu when a user clicks outside
  blurSelectInput = () => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  render() {
    const { children, isEnabled, targetRef: touchScrollTarget } = this.props;

    // bail early if not enabled
    if (!isEnabled) return children;

    /*
     * Div
     * ------------------------------
     * blocks scrolling on non-body elements behind the menu

     * ScrollLock
     * ------------------------------
     * actually does the scroll locking
     */
    return (
      <div>
        <div
          onClick={this.blurSelectInput}
          css={{ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 }}
        />
        {children}
        {touchScrollTarget ? (
          <ScrollLock touchScrollTarget={touchScrollTarget} />
        ) : null}
      </div>
    );
  }
}
