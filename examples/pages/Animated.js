// @flow

import React, { Component } from 'react';
import { withValue } from 'react-value';

import Select from '../../src';
import * as Animated from '../../src/animated';

import { Link, H1 } from '../components';
import { colourOptions } from '../data';

const SelectWithValue = withValue(Select);

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
        <div id="cypress-multi-animated">
          <SelectWithValue
            autoFocus
            closeMenuOnSelect={false}
            components={Animated}
            defaultValue={[colourOptions[4], colourOptions[5]]}
            isMulti
            options={colourOptions}
          />
        </div>
      </div>
    );
  }
}
