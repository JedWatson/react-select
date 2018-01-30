// @flow

import React, { Component } from 'react';
import { withValue } from 'react-value';

import Select from '../../src';
import { Code, Link, H1, Hr, Note } from '../components';
import { colourOptions, groupedOptions } from '../data';

const SelectWithValue = withValue(Select);
type State = { isDisabled: boolean, isLoading: boolean };

export default class App extends Component<*, State> {
  state = { isDisabled: false, isLoading: false };
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  render() {
    return (
      <div>
        <H1>React Select v2</H1>
        <p>Currently in alpha. Try it out:</p>
        <p>
          <Code>yarn add react-select@next</Code>
        </p>
        <p>
          <Link
            href="https://github.com/JedWatson/react-select/tree/v2"
            target="_blank"
          >
            GitHub Project
          </Link>
          {' | '}
          <Link
            href="https://github.com/JedWatson/react-select/blob/v2/examples/pages/Home.js"
            target="_blank"
          >
            Examples Source
          </Link>
        </p>

        <h2>Single Select</h2>
        <div id="cypress-single">
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
          <input
            type="checkbox"
            onChange={this.toggleDisabled}
            id="cypress-single__disabled-checkbox"
          />
          Disabled
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <input
            type="checkbox"
            onChange={this.toggleLoading}
            id="cypress-single__loading-checkbox"
          />
          Loading
        </Note>

        <h4>Grouped</h4>
        <div id="cypress-single-grouped">
          <SelectWithValue
            defaultValue={colourOptions[1]}
            options={groupedOptions}
          />
        </div>

        <Hr />

        <h2>Multi Select</h2>
        <div id="cypress-multi">
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
