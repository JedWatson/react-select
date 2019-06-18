// @flow
/** @jsx jsx */
import { Component } from 'react';
import { jsx } from '@emotion/core';

export default class DummyInput extends Component<any> {
  render () {
    const { in: inProp, out, onExited, appear, enter, exit, innerRef, emotion, ...props } = this.props;
    return(
      <input
        ref={innerRef}
        {...props}
        css={{
          label: 'dummyInput',
          // get rid of any default styles
          background: 0,
          border: 0,
          fontSize: 'inherit',
          outline: 0,
          padding: 0,
          // important! without `width` browsers won't allow focus
          width: 1,

          // remove cursor on desktop
          color: 'transparent',

          // remove cursor on mobile whilst maintaining "scroll into view" behaviour
          left: -100,
          opacity: 0,
          position: 'relative',
          transform: 'scale(0)',
        }}
      />
    );
  }
}
