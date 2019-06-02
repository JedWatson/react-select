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
  FixedOptions,
  StyledMulti,
  StyledSingle,
} from '../../examples';

export default function Home() {
  return md`
  # Welcome

  Each of the examples below is an interactive example of react-select.

  See the source or open the examples on codesandbox using the buttons that appear when you hover over each select below.

  For complete docs, see the [Props API](/props) and [Advanced Usage](/advanced).

  If you're coming from react-select v1, check out the [Upgrade Guide](/upgrade-guide).

  To contribute, or open an issue, check out the [source code on GitHub](https://github.com/JedWatson/react-select).

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
      label="Grouped"
      urlPath="docs/examples/BasicGrouped.js"
      raw={require('!!raw-loader!../../examples/BasicGrouped.js')}
    >
      <BasicGrouped />
    </ExampleWrapper>
  )}

  ## Animated Components

  React-Select comes with a makeAnimated function that create animated wrappers around components passed in as arguments.
  If no arguments are passed, built-in components are wrapped instead.

  ~~~jsx
  import makeAnimated from 'react-select/animated';
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
  import Async from 'react-select/async';
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
  The Creatable component enables users to create new options along with choosing existing options.

  ~~~jsx
  import Creatable from 'react-select/creatable';
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

  # Fixed Options

  ${(
    <ExampleWrapper
      label="Fixed Options Example"
      urlPath="docs/home/examples/FixedOptions.js"
      raw={require('!!raw-loader!../../examples/FixedOptions.js')}
    >
      <FixedOptions />
    </ExampleWrapper>
  )}
`;
}
