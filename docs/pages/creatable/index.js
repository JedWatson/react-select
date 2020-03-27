// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';
import ExampleWrapper from '../../ExampleWrapper';

import {
  AsyncCreatable,
  CreatableAdvanced,
  CreatableInputOnly,
  CreatableMulti,
  CreatableSingle,
} from '../../examples';

export default function Creatable() {
  return (
    <Fragment>
      <Helmet>
        <title>Creatable - React Select</title>
        <meta
          name="description"
          content="The react-select Creatable Component."
        />
      </Helmet>
      {md`
      # Creatable

      ~~~jsx
      import Creatable, { makeCreatableSelect } from 'react-select/creatable';
      ~~~

      For the prop definition, please see the API docs [here](/props)

      ${(
        <ExampleWrapper
          label="Creatable Example"
          urlPath="docs/examples/CreatableSingle.js"
          raw={require('!!raw-loader!../../examples/CreatableSingle.js')}
        >
          <CreatableSingle />
        </ExampleWrapper>
      )}

      ${(
        <ExampleWrapper
          label="Creatable Multiselect Example"
          urlPath="docs/examples/CreatableMulti.js"
          raw={require('!!raw-loader!../../examples/CreatableMulti.js')}
        >
          <CreatableMulti />
        </ExampleWrapper>
      )}

      ${(
        <ExampleWrapper
          label="Advanced Example"
          urlPath="docs/examples/CreatableAdvanced.js"
          raw={require('!!raw-loader!../../examples/CreatableAdvanced.js')}
        >
          <CreatableAdvanced />
        </ExampleWrapper>
      )}

      > This example uses the \`onCreateOption\` prop to handle new options.

      > To simulate waiting for a back-end service to create a new option, the input is disabled for a second before the new option is added to the list and the value is updated.

      ${(
        <ExampleWrapper
          label="Async Creatable Example"
          urlPath="docs/examples/AsyncCreatable.js"
          raw={require('!!raw-loader!../../examples/AsyncCreatable.js')}
        >
          <AsyncCreatable />
        </ExampleWrapper>
      )}

      > This example uses the combined async + creatable variant, imported from \`react-select/async-creatable\`

      ${(
        <ExampleWrapper
          label="Multi-select text input"
          urlPath="docs/examples/CreatableInputOnly.js"
          raw={require('!!raw-loader!../../examples/CreatableInputOnly.js')}
        >
          <CreatableInputOnly />
        </ExampleWrapper>
      )}
    `}
    </Fragment>
  );
}
