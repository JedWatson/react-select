// @flow

import React, { Component } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';

export default class InHTMLForm extends Component<{}, {}> {
  onFormSubmit = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('Here we can perform actions based on form submission');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <Select options={colourOptions} name="color" />
          <button type="submit">Submit Form</button>
        </form>
      </div>
    );
  }
}
