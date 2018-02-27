// @flow

import React, { Component } from 'react';

import { H1 } from '../../styled-components';
import ExampleWrapper from '../../ExampleWrapper';
import Example from './Example';

export default class App extends Component<*> {
  render() {
    return (
      <div>
        <H1>Animated Components</H1>
        <p>
          React-Select comes with Animated variants that wrap the built-in
          components.
        </p>
        <p>Remove the values below to see them in action.</p>
        <ExampleWrapper
          label="Animation"
          urlPath="/docs/pages/Animated/Example.js"
        >
          <Example />
        </ExampleWrapper>
      </div>
    );
  }
}
