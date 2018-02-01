// @flow

import React, { Component } from 'react';
import { withValue } from 'react-value';

import Select from '../../src';
import * as Animated from '../../src/animated';

import { Link, H1, Section } from '../components';
import { colourOptions } from '../data';

const SelectWithValue = withValue(Select);

export default class AnimatedPage extends Component<*> {
  render() {
    return (
      <Section id={this.props.id}>
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

        <div id="cypress-multi-animated">
          <SelectWithValue
            components={Animated}
            defaultValue={[colourOptions[4], colourOptions[5]]}
            isMulti
            options={colourOptions}
          />
        </div>
      </Section>
    );
  }
}
