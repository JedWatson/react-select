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
  Experimental,
  StyledMulti,
  StyledSingle,
} from '../../examples';

export default function Home() {
  return md`
  # Welcome

  TODO needs content!

  ## Quick Start

  Start by installing \`react-select\`

  ~~~bash
  yarn add react-select
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
      label="Single"
      urlPath="docs/examples/BasicSingle.js"
      raw={require('!!raw-loader!../../examples/BasicSingle.js')}
    >
      <BasicSingle />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Grouped"
      urlPath="docs/examples/BasicGrouped.js"
      raw={require('!!raw-loader!../../examples/BasicGrouped.js')}
    >
      <BasicGrouped />
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

  ## Animated Components

  React-Select comes with Animated variants that wrap the built-in
  components.

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


  ## Experimental

  Wild experiments with react-select v2

  ${(
    <ExampleWrapper
      isEditable={false}
      label="Date Picker"
      urlPath="docs/examples/Experimental.js"
      raw={require('!!raw-loader!../../examples/Experimental.js')}
    >
      <Experimental />
    </ExampleWrapper>
  )}

  > This example uses a combination of custom components and functions to make react-select behave like a date picker.

  > Type a date like "25/8/18", "tomorrow", "next monday", or "6 weeks from now" into the field to get date suggestions.
`;
}
