// @flow

import React, { Component } from 'react';
import { Code, H1 } from '../../components';
import ExampleWrapper from '../../ExampleWrapper';
import Creatable from './Creatable';

export default class App extends Component<*> {
  render() {
    return (
      <div>
        <H1>Creatable (tags) Variant</H1>
        <p>Use the Creatable component to create new options</p>
        <p>
          <Code>{"import { Creatable } from 'react-select'"}</Code>
        </p>

        <ExampleWrapper
          label="Creatable Example"
          urlPath="/examples/pages/Creatable/Creatable.js"
        >
          <Creatable />
        </ExampleWrapper>
      </div>
    );
  }
}
