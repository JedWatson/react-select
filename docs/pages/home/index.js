// @flow

import React from 'react';
import ExampleWrapper from '../../ExampleWrapper';
import md from '../../markdown/renderer';
import {
  AnimatedMulti,
  BasicSingle,
  BasicGrouped,
  BasicMulti,
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
