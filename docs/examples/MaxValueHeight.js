import React, { Component } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';

export default class MaxValueHeight extends Component<{}> {
  render() {
    return (
      <Select
        isMulti
        defaultValue={[...colourOptions]}
        isClearable
        isSearchable
        name="color"
        options={colourOptions}
        maxValueHeight={30}
      />
    );
  }
}
