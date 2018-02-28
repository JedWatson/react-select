// @flow

import React from 'react';

import Select from '../../../src';
import * as Animated from '../../../src/animated';
import ExampleWrapper from '../../ExampleWrapper';
import { colourOptions } from '../../data';

export default function AnimatedMulti() {
  return (
    <ExampleWrapper
      label="Animation"
      urlPath="/docs/home/examples/AnimatedMulti.js"
    >
      <div id="cypress-multi-animated">
        <Select
          closeMenuOnSelect={false}
          components={Animated}
          defaultValue={[colourOptions[4], colourOptions[5]]}
          isMulti
          options={colourOptions}
        />
      </div>
    </ExampleWrapper>
  );
}
