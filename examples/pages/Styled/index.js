// @flow
// @glam

import React, { Component } from 'react';

import { Code, Link, H1 } from '../../components';
import ExampleWrapper from '../../ExampleWrapper';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';

type State = {};

export default class StyledApp extends Component<*, State> {
  state = {};
  render() {
    return (
      <div>
        <H1>Custom Styles</H1>
        <p>
          Style individual components with custom css using the{' '}
          <Code>styles</Code> prop.{' '}
          <Link
            href="https://github.com/JedWatson/react-select/blob/v2/examples/pages/Styled.js"
            target="_blank"
          >
            Source
          </Link>
        </p>

        <h2>Examples</h2>
        <ExampleWrapper
          label="Single Select"
          urlPath="/examples/pages/Styled/SingleSelect.js"
        >
          <SingleSelect />
        </ExampleWrapper>
        <ExampleWrapper
          label="Multi Select"
          urlPath="/examples/pages/Styled/MultiSelect.js"
        >
          <MultiSelect />
        </ExampleWrapper>
      </div>
    );
  }
}
