// @flow

import React from 'react';
import { Input } from '../primitives';

export default (props: any) => (
  <Input
    {...props}
    css={{
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
