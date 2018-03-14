// @flow

import md from '../../markdown/renderer';
import React from 'react';
import ExampleWrapper from '../../ExampleWrapper';

import {
  AsyncCreatable,
  CreatableAdvanced,
  CreatableInputOnly,
  CreatableMulti,
  CreatableSingle,
} from '../../examples';

export default function Creatable() {
  return md`
    # Creatable

    ~~~jsx
    import Creatable from 'react-select/lib/Creatable';
    ~~~

    ${(
      <ExampleWrapper
        label="Creatable Example"
        urlPath="docs/home/examples/CreatableSingle.js"
        raw={require('!!raw-loader!../../examples/CreatableSingle.js')}
      >
        <CreatableSingle />
      </ExampleWrapper>
    )}

    ${(
      <ExampleWrapper
        label="Creatable Multiselect Example"
        urlPath="docs/home/examples/CreatableMulti.js"
        raw={require('!!raw-loader!../../examples/CreatableMulti.js')}
      >
        <CreatableMulti />
      </ExampleWrapper>
    )}

    ${(
      <ExampleWrapper
        label="Advanced Example"
        urlPath="docs/home/examples/CreatableAdvanced.js"
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
        urlPath="docs/home/examples/AsyncCreatable.js"
        raw={require('!!raw-loader!../../examples/AsyncCreatable.js')}
      >
        <AsyncCreatable />
      </ExampleWrapper>
    )}

    > This example uses the combined async + creatable variant, imported from \`react-select/lib/AsyncCreatable\`

    ${(
      <ExampleWrapper
        label="Multi-select text input"
        urlPath="docs/home/examples/CreatableInputOnly.js"
        raw={require('!!raw-loader!../../examples/CreatableInputOnly.js')}
      >
        <CreatableInputOnly />
      </ExampleWrapper>
    )}
  `;
}
