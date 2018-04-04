// @flow

import React from 'react';
import ExampleWrapper from '../../ExampleWrapper';
import md from '../../markdown/renderer';
import {
  AsyncCallbacks,
  AsyncPromises,
  AnimatedMulti,
  BasicSingle,
  BasicGrouped,
  BasicMulti,
  CreatableSingle,
  StyledMulti,
  StyledSingle,
} from '../../examples';

export default function Home() {
  return md`
  # Welcome

  React Select v2 is nearly ready, and we'd love your feedback.

  View the [source code](https://github.com/JedWatson/react-select/tree/v2) and
  [Pull Request on github](https://github.com/JedWatson/react-select/pull/2289).

  ${(
    <ExampleWrapper
      label="Single"
      urlPath="docs/examples/BasicSingle.js"
      raw={require('!!raw-loader!../../examples/BasicSingle.js')}
    >
      <BasicSingle />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Multi"
      urlPath="docs/examples/BasicMulti.js"
      raw={require('!!raw-loader!../../examples/BasicMulti.js')}
    >
      <BasicMulti />
    </ExampleWrapper>
  )}

  ## Getting Started

  Start by installing \`react-select\` (use the next tag to install the alpha)

  ~~~bash
  yarn add react-select@next
  ~~~

  Import the default export and render in your component:

  ~~~jsx
  import React, { Component } from 'react'
  import Select from 'react-select'

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const MyComponent = () => (
    <Select options={options} />
  )
  ~~~

  ${(
    <ExampleWrapper
      label="Grouped"
      urlPath="docs/examples/BasicGrouped.js"
      raw={require('!!raw-loader!../../examples/BasicGrouped.js')}
    >
      <BasicGrouped />
    </ExampleWrapper>
  )}

  ## Animated Components

  React-Select comes with Animated variants that wrap the built-in
  components.

  ~~~jsx
  import Animated from 'react-select/lib/animated';
  ~~~

  Remove the values below to see them in action.

  ${(
    <ExampleWrapper
      label="Animation"
      urlPath="docs/examples/AnimatedMulti.js"
      raw={require('!!raw-loader!../../examples/AnimatedMulti.js')}
    >
      <AnimatedMulti />
    </ExampleWrapper>
  )}

  ## Custom Styles

  Style individual components with custom css using the \`styles\` prop.

  ${(
    <ExampleWrapper
      label="Single"
      urlPath="docs/examples/StyledSingle.js"
      raw={require('!!raw-loader!../../examples/StyledSingle.js')}
    >
      <StyledSingle />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Multi Select"
      urlPath="docs/examples/StyledMulti.js"
      raw={require('!!raw-loader!../../examples/StyledMulti.js')}
    >
      <StyledMulti />
    </ExampleWrapper>
  )}

  You can see a full explanation of how to do this on the [styles](/styles) page.

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

  You can see a full explanation of how to do this on the [async](/async) page.

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

  You can see a full explanation of how to do this on the [creatable](/creatable) page.
`;
}
