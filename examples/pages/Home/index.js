// @flow

import React, { Component } from 'react';
import { Code, Link, H1 } from '../../components';

import ExampleWrapper from '../../ExampleWrapper';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import Grouped from './Grouped';
import carouselPropTypes from './props';
import PrettyProp, { TypeDefinition } from '../../PrettyProp';

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
        <span style={{ fontSize: 14 }}>{text}</span>
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
        <h4>Areas of improvement on v1:</h4>
        <List items={changes} />
        <h4>Try it out:</h4>
        <p>
          <Code>yarn add react-select@next</Code>
        </p>
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

        <h2>Props</h2>
        <p>
          To understand some of the prop types below, we'll surface internal
          opaque types:
        </p>
        <TypeDefinition>{`type OptionType = { [string]: any }
type OptionsType = Array<OptionType>

type GroupType = {
  [string]: any, // group label
  options: OptionsType,
}

type ValueType = OptionType | OptionsType | null | void

type CommonProps = {
  clearValue: () => void,
  getStyles: (string, any) => {},
  getValue: () => ValueType,
  hasValue: boolean,
  isMulti: boolean,
  options: OptionsType,
  selectOption: OptionType => void,
  selectProps: any,
  setValue: (ValueType, ActionTypes) => void,
}

// passed as the second argument to \`onChange\`
type ActionTypes =
  | 'clear'
  | 'create-option'
  | 'deselect-option'
  | 'pop-value'
  | 'remove-value'
  | 'select-option'
  | 'set-value'
`}</TypeDefinition>
        {carouselPropTypes.map(p => <PrettyProp key={p.name} {...p} />)}
      </div>
    );
  }
}
