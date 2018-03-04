// @flow

import React from 'react';
import md from '../markdown/renderer';
import ExampleWrapper from '../ExampleWrapper';

import {
  AnimatedMulti,
  AsyncCallbacks,
  AsyncPromises,
  BasicSingle,
  BasicGrouped,
  BasicMulti,
  Experimental,
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

  ${(
    <ExampleWrapper label="Single" urlPath="docs/home/examples/BasicSingle.js">
      <BasicSingle />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Grouped"
      urlPath="docs/home/examples/BasicGrouped.js"
    >
      <BasicGrouped />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper label="Multi" urlPath="docs/home/examples/BasicMulti.js">
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
      urlPath="docs/home/examples/AnimatedMulti.js"
    >
      <AnimatedMulti />
    </ExampleWrapper>
  )}

  ## Custom Styles

  Style individual components with custom css using the \`styles\` prop.

  ${(
    <ExampleWrapper label="Single" urlPath="docs/home/examples/StyledSingle.js">
      <StyledSingle />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Multi Select"
      urlPath="docs/home/examples/StyledMulti.js"
    >
      <StyledMulti />
    </ExampleWrapper>
  )}

  ## Creatable

  ${(
    <ExampleWrapper
      label="Creatable Example"
      urlPath="docs/home/examples/CreatableSingle.js"
    >
      <CreatableSingle />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Creatable Multiselect Example"
      urlPath="docs/home/examples/CreatableMulti.js"
    >
      <CreatableMulti />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Advanced Example"
      urlPath="docs/home/examples/CreatableAdvanced.js"
    >
      <CreatableAdvanced />
    </ExampleWrapper>
  )}

  > This example uses the \`onCreateOption\` prop to handle new options.

  > To simulate waiting for a back-end service to create a new option, the input is disabled for a second before the new option is added to the list and the value is updated.

  ${(
    <ExampleWrapper
      label="Multi-select text input"
      urlPath="docs/home/examples/CreatableInputOnly.js"
    >
      <CreatableInputOnly />
    </ExampleWrapper>
  )}

  > This example applies several customisations to produce a text input that has no menu but allows multiple values to be entered.

  ## Async

  Use the Async component to load options from a remote source as the user types.

  ~~~jsx
  import { Async } from 'react-select'
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
  ## Experimental

  Wild experiments with react-select v2

  ${(
    <ExampleWrapper
      isEditable={false}
      label="Date Picker"
      urlPath="docs/home/examples/Datepicker.js"
    >
      <Experimental />
    </ExampleWrapper>
  )}

  > This example uses a combination of custom components and functions to make react-select behave like a date picker.

  > Type a date like "25/8/18", "tomorrow", "next monday", or "6 weeks from now" into the field to get date suggestions.
`;
}
