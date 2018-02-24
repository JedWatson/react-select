// @flow

import React, { Component } from 'react';
import { Code, Link, H1, H2 } from '../../components';

import ExampleWrapper from '../../ExampleWrapper';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import Grouped from './Grouped';

const changes = [
  { icon: '🎨', text: 'CSS-in-JS with a complete styling API' },
  {
    icon: '🏗',
    text: 'Replace any of the built-in rendering components',
  },
  {
    icon: '🤖',
    text: 'Simpler and more extensible; fewer props',
  },
  { icon: '⚡️', text: 'Attention to detail and performance' },
];
const List = ({ items }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {items.map(({ icon, text }, j) => (
      <li key={j} style={{ alignItems: 'center', display: 'flex ' }}>
        <span style={{ fontSize: 24, marginRight: '0.5em' }}>{icon}</span>
        <span style={{ fontSize: 16 }}>{text}</span>
      </li>
    ))}
  </ul>
);

export default class Home extends Component<*, *> {
  render() {
    return (
      <div>
        <H1>
          React Select v2{' '}
          <small style={{ color: '#999', fontWeight: 500 }}>(alpha)</small>
        </H1>
        <p style={{ color: '#999' }}>
          <Link
            href="https://github.com/JedWatson/react-select/tree/v2"
            target="_blank"
          >
            GitHub Project
          </Link>{' '}
          &middot;{' '}
          <Link
            href="https://github.com/JedWatson/react-select/blob/v2/examples/pages/Home.js"
            target="_blank"
          >
            Examples Source
          </Link>
        </p>
        <h4>Areas of improvement on v1:</h4>
        <List items={changes} />
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
          urlPath="/examples/pages/Home/SingleSelect.js"
        >
          <SingleSelect />
        </ExampleWrapper>
        <ExampleWrapper
          label="Grouped"
          urlPath="/examples/pages/Home/Grouped.js"
        >
          <Grouped />
        </ExampleWrapper>
        <ExampleWrapper
          label="Multi Select"
          urlPath="/examples/pages/Home/MultiSelect.js"
        >
          <MultiSelect />
        </ExampleWrapper>
      </div>
    );
  }
}
