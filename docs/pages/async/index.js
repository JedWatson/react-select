// @flow

import React from 'react';
import ExampleWrapper from '../../ExampleWrapper';
import md from '../../markdown/renderer';
import {
  AsyncCallbacks,
  AsyncPromises,
} from '../../examples';


export default function Async() {
  return md`
    # Async
    Use the Async component to load options from a remote source as the user types.

    ~~~jsx
    import Async from 'react-select/lib/Async';
    ~~~

    ${(
      <ExampleWrapper
        label="Callbacks"
        urlPath="docs/home/examples/AsyncCallbacks.js"
      >
        <AsyncCallbacks />
      </ExampleWrapper>
    )}

    ${(
      <ExampleWrapper
        label="Promises"
        urlPath="docs/home/examples/AsyncPromises.js"
      >
        <AsyncPromises />
      </ExampleWrapper>
    )}
  `;
}
