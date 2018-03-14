// @flow

import React from 'react';
import ExampleWrapper from '../../ExampleWrapper';
import md from '../../markdown/renderer';
import {
  AsyncCallbacks,
  AsyncMulti,
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
        urlPath="docs/examples/AsyncCallbacks.js"
        raw={require('!!raw-loader!../../examples/AsyncCallbacks.js')}
      >
        <AsyncCallbacks />
      </ExampleWrapper>
    )}

    ${(
      <ExampleWrapper
        label="Promises"
        urlPath="docs/examples/AsyncPromises.js"
        raw={require('!!raw-loader!../../examples/AsyncPromises.js')}
      >
        <AsyncPromises />
      </ExampleWrapper>
    )}

    ${(
      <ExampleWrapper
        label="Async MultiSelect"
        urlPath="docs/examples/AsyncMulti.js"
        raw={require('!!raw-loader!../../examples/AsyncMulti.js')}
      >
        <AsyncMulti/>
      </ExampleWrapper>
    )}
  `;
}
