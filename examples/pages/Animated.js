// @flow

import React, { Component } from 'react';
import { withValue } from 'react-value';

import Select from '../../src';
import * as Animated from '../../src/animated';

import { Link } from '../components';
import { colourOptions } from '../data';

const SelectWithValue = withValue(Select);

export default class App extends Component<*> {
  render() {
    return (
      <div>
        <h1>Animated Components</h1>
        <p>
          React-Select comes with Animated component variants.{' '}
          <Link
            href="https://github.com/JedWatson/react-select/blob/v2/examples/pages/Animated.js"
            target="_blank"
          >
            Source
          </Link>
        </p>

        <h2>Example</h2>
        <div id="cypress-multi-animated">
          <SelectWithValue
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
