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
        <p>
          The project has grown way beyond the original use-case to become one
          of the most popular react components: with nearly a million downloads
          per month, statistically over one in seven people installing{' '}
          <Code>react-dom</Code> also install <Code>react-select</Code> 😆
        </p>
        <p>
          Over the years the API has also grown organically to accommodate a
          huge amount of flexibility and customisation.
        </p>
        <p>
          For the last half-year, with several team members from Thinkmill I've
          been working with Atlassian to develop their new UI library Atlaskit.
          We've had the opportunity to do a lot of deep thinking on component
          architecture, and are now turning our attention to Select components,
          which will use <Code>react-select</Code> as their base.
        </p>
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
