// @flow
// @jsx glam

import React, { Component } from 'react';
import glam from 'glam';
import { Code, Link, H1, Hr, Note } from '../components';
import { withValue } from 'react-value';

import Select from '../../src';
import { colourOptions, groupedOptions } from '../data';

const SelectWithValue = withValue(Select);
type State = { isDisabled: boolean, isLoading: boolean };

const List = ({ items }) => (
  <ul css={{ listStyle: 'none', padding: 0 }}>
    {items.map((i, j) => (
      <li key={j} css={{ alignItems: 'center', display: 'flex ' }}>
        <span css={{ marginRight: '0.5em' }}>{i.icon}</span>
        <span css={{ fontSize: 14 }}>{i.text}</span>
      </li>
    ))}
  </ul>
);

export default class Home extends Component<*, State> {
  state = { isDisabled: false, isLoading: false };
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  render() {
    return (
      <div>
        <H1>
          React Select v2{' '}
          <small css={{ color: '#999', fontWeight: 500 }}>(alpha)</small>
        </H1>
        <h4>Areas of improvement on v1:</h4>
        <List
          items={[
            { icon: '🎨', text: 'CSS-in-JS with a complete styling API' },
            {
              icon: '🏗',
              text: 'Replace any of the built-in rendering components',
            },
            {
              icon: '🤖',
              text: 'Simpler and more extensible; fewer properties',
            },
            { icon: '⚡️', text: 'Attention to performance' },
          ]}
        />
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
            divs Source
          </Link>
        </p>

        <h2 css={{ marginTop: '2em' }}>Basic Usage</h2>
        <h4>Single Select</h4>
        <div>
          <SelectWithValue
            autoFocus
            defaultValue={colourOptions[0]}
            isDisabled={this.state.isDisabled}
            isLoading={this.state.isLoading}
            options={colourOptions}
            onFocus={() => {
              console.log('Select Focused');
            }}
            onBlur={() => {
              console.log('Select Blurred');
            }}
          />
        </div>
        <Note Tag="label">
          <input type="checkbox" onChange={this.toggleDisabled} />
          Disabled
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <input type="checkbox" onChange={this.toggleLoading} />
          Loading
        </Note>
        <h4>Grouped</h4>
        <div>
          <SelectWithValue
            defaultValue={colourOptions[1]}
            options={groupedOptions}
          />
        </div>
        <Hr />
        <h4>Multi Select</h4>
        <div>
          <SelectWithValue
            defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            options={colourOptions}
          />
        </div>
      </div>
    );
  }
}
