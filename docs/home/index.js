// @flow

import React from 'react';
import md from '../markdown/renderer';

import {
  AnimatedMulti,
  AsyncCallbacks,
  AsyncPromises,
  BasicSingle,
  BasicGrouped,
  BasicMulti,
  StyledMulti,
  StyledSingle,
  CreatableAdvanced,
  CreatableInputOnly,
  CreatableMulti,
  CreatableSingle,
} from './examples';

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

  ${<BasicSingle />}

  ${<BasicGrouped />}

  ${<BasicMulti />}

  ## Animated Components

  React-Select comes with Animated variants that wrap the built-in
  components.

  Remove the values below to see them in action.

  ${<AnimatedMulti />}

  ## Custom Styles

  Style individual components with custom css using the \`styles\` prop.

  ${<StyledSingle />}

  ${<StyledMulti />}

  ## Creatable

  ${<CreatableSingle />}

  ${<CreatableMulti />}

  ${<CreatableAdvanced />}

  > This example uses the \`onCreateOption\` prop to handle new options.

  > To simulate waiting for a back-end service to create a new option, the input is disabled for a second before the new option is added to the list and the value is updated.

  ${<CreatableInputOnly />}

  > This example applies several customisations to produce a text input that has no menu but allows multiple values to be entered.

  ## Async

  Use the Async component to load options from a remote source as the user types.

  ~~~jsx
  import { Async } from 'react-select'
  ~~~

  ${<AsyncCallbacks />}

  ${<AsyncPromises />}
`;
}
