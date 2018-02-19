// @flow

import React, { Component } from 'react';
import { Code, H1, Note } from '../../components';
import ExampleWrapper from '../../ExampleWrapper';
import CreatableAdvanced from './CreatableAdvanced';
import CreatableMulti from './CreatableMulti';
import CreatableSingle from './CreatableSingle';
import MultiTextInput from './MultiTextInput';

export default class App extends Component<*> {
  render() {
    return (
      <div>
        <H1>Creatable Variant</H1>
        <p>Use the Creatable component to create new options</p>
        <p>
          <Code>{"import { Creatable } from 'react-select'"}</Code>
        </p>

        <ExampleWrapper
          label="Creatable Example"
          urlPath="/examples/pages/Creatable/CreatableSingle.js"
        >
          <CreatableSingle />
        </ExampleWrapper>

        <ExampleWrapper
          label="Creatable Multiselect Example"
          urlPath="/examples/pages/Creatable/CreatableMulti.js"
        >
          <CreatableMulti />
        </ExampleWrapper>

        <ExampleWrapper
          label="Advanced Example"
          urlPath="/examples/pages/Creatable/CreatableAdvanced.js"
        >
          <CreatableAdvanced />
        </ExampleWrapper>
        <Note>
          This example uses the <Code>onCreateOption</Code> prop to handle new
          options.
        </Note>
        <Note>
          To simulate waiting for a back-end service to create a new option, the
          input is disabled for a second before the new option is added to the
          list and the value is updated.
        </Note>

        <ExampleWrapper
          label="Multi-select text input"
          urlPath="/examples/pages/Creatable/MultiTextInput.js"
        >
          <MultiTextInput />
        </ExampleWrapper>
        <Note>
          This example applies several customisations to produce a text input
          that has no menu but allows multiple values to be entered.
        </Note>
      </div>
    );
  }
}
