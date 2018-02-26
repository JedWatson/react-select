// @flow

import React, { Component } from 'react';
import { Code, H1, H2 } from '../../components';

import ExampleWrapper from '../../ExampleWrapper';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import Grouped from './Grouped';

export default class Home extends Component<*, *> {
  render() {
    return (
      <div>
        <H1>Intro</H1>
        <p>// TODO</p>
        <h4>Try it out:</h4>
        <p>
          <Code>yarn add react-select@next</Code>
        </p>
        <H2>Examples</H2>
        <p>
          Check out the pages to the left for more in-depth examples and
          variations.
        </p>
        <ExampleWrapper
          label="Single Select"
          urlPath="/docs/pages/Home/SingleSelect.js"
        >
          <SingleSelect />
        </ExampleWrapper>
        <ExampleWrapper label="Grouped" urlPath="/docs/pages/Home/Grouped.js">
          <Grouped />
        </ExampleWrapper>
        <ExampleWrapper
          label="Multi Select"
          urlPath="/docs/pages/Home/MultiSelect.js"
        >
          <MultiSelect />
        </ExampleWrapper>
      </div>
    );
  }
}
