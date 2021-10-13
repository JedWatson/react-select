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

  To contribute, or open an issue, check out the [source code on GitHub](https://github.com/JedWatson/react-select).

  ${(
    <ExampleWrapper
      label="Single"
      urlPath="docs/examples/BasicSingle.tsx"
      raw={require('!!raw-loader!../../examples/BasicSingle.tsx')}
    >
      <BasicSingle />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Multi"
      urlPath="docs/examples/BasicMulti.tsx"
      raw={require('!!raw-loader!../../examples/BasicMulti.tsx')}
    >
      <BasicMulti />
    </ExampleWrapper>
  )}

  ${(<br />)}

  ## Getting Started

  Start by installing \`react-select\`

  ~~~bash
  yarn add react-select
  ~~~

  or

  ~~~bash
  npm i --save react-select
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
      urlPath="docs/examples/BasicGrouped.tsx"
      raw={require('!!raw-loader!../../examples/BasicGrouped.tsx')}
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
      urlPath="docs/examples/AnimatedMulti.tsx"
      raw={require('!!raw-loader!../../examples/AnimatedMulti.tsx')}
    >
      <AnimatedMulti />
    </ExampleWrapper>
  )}

  ## Custom Styles

  Style individual components with custom css using the \`styles\` prop.

  ${(
    <ExampleWrapper
      label="Single"
      urlPath="docs/examples/StyledSingle.tsx"
      raw={require('!!raw-loader!../../examples/StyledSingle.tsx')}
    >
      <StyledSingle />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Multi Select"
      urlPath="docs/examples/StyledMulti.tsx"
      raw={require('!!raw-loader!../../examples/StyledMulti.tsx')}
    >
      <StyledMulti />
    </ExampleWrapper>
  )}

  You can see a full explanation of how to do this on the [styles](/styles) page.

  # Async
  Use the Async component to load options from a remote source as the user types.

  ~~~jsx
  import AsyncSelect from 'react-select/async';
  ~~~

  ${(
    <ExampleWrapper
      label="Callbacks"
      urlPath="docs/examples/AsyncCallbacks.tsx"
      raw={require('!!raw-loader!../../examples/AsyncCallbacks.tsx')}
    >
      <AsyncCallbacks />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Promises"
      urlPath="docs/examples/AsyncPromises.tsx"
      raw={require('!!raw-loader!../../examples/AsyncPromises.tsx')}
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
      urlPath="docs/home/examples/CreatableSingle.tsx"
      raw={require('!!raw-loader!../../examples/CreatableSingle.tsx')}
    >
      <CreatableSingle />
    </ExampleWrapper>
  )}

  You can see a full explanation of how to do this on the [creatable](/creatable) page.

  # Fixed Options

  ${(
    <ExampleWrapper
      label="Fixed Options Example"
      urlPath="docs/home/examples/FixedOptions.tsx"
      raw={require('!!raw-loader!../../examples/FixedOptions.tsx')}
    >
      <FixedOptions />
    </ExampleWrapper>
  )}
`;
}
