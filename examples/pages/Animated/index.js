// @flow

import React, { Component } from 'react';

import { Link, H1 } from '../../components';
import ExampleWrapper from '../../ExampleWrapper';
import Example from './Example';

export default class App extends Component<*> {
  render() {
    return (
      <div>
        <H1>Animated Components</H1>
        <p>
          React-Select comes with Animated variants that wrap the built-in
          components.{' '}
          <Link
            href="https://github.com/JedWatson/react-select/blob/v2/examples/pages/Animated.js"
            target="_blank"
          >
            Source
          </Link>
        </p>
        <p>Remove the values below to see them in action.</p>
        <h2>Example</h2>
        <ExampleWrapper
          label="Animation"
          urlPath="/examples/pages/Animated/Example.js"
        >
          <Example />
        </ExampleWrapper>
      </div>
    );
  }
}
