// @flow

import React from 'react';
import ScrollLock from 'react-scrolllock';
import { Div } from '../primitives';

export default function ScrollBlock() {
  return (
    <Div css={{ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 }}>
      <ScrollLock />
    </Div>
  );
}
