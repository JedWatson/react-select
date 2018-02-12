// @flow

import React from 'react';
import { Input } from '../primitives';

export default (props: any) => (
  <Input
    {...props}
    css={{
      background: 0,
      border: 0,
      fontSize: 'inherit',
      opacity: 0, // removes the cursor
      outline: 0,
      padding: 0,
      width: 1,
    }}
  />
);
