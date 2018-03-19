// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import ExampleWrapper from '../../ExampleWrapper';
import md from '../../markdown/renderer';
import {
  AsyncCallbacks,
  AsyncMulti,
  AsyncPromises,
} from '../../examples';


export default function Async() {
  return (
  <Fragment>
    <Helmet>
      <title>Async - React Select</title>
      <meta
        name="description"
        content="The react-select Async Component."
      />
    </Helmet>
    {md`
    # Async
    Use the Async component to load options from a remote source as the user types.

    ~~~jsx
    import Async from 'react-select/lib/Async';
    ~~~

    ## Loading Asynchronously

    The loadOptions prop allows users to either resolve from a callback...

    ${(
      <ExampleWrapper
        label="Callbacks"
        urlPath="docs/examples/AsyncCallbacks.js"
        raw={require('!!raw-loader!../../examples/AsyncCallbacks.js')}
      >
        <AsyncCallbacks />
      </ExampleWrapper>
    )}

    or resolve from a returned promise....

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
  `}
</Fragment>);
};
