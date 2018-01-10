// @flow

import React, { Component } from 'react';
import { withValue } from 'react-value';

import Select from '../../src';
import { Hr, Note } from '../components';
import { colourOptions, groupedOptions } from '../data';

const SelectWithValue = withValue(Select);
type State = { isDisabled: boolean };

export default class App extends Component<*, State> {
  state = { isDisabled: false };
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  render() {
    return (
      <div>
        <h1>new-select</h1>
        <p>A sandbox for the new react-select</p>

        <h2>Single</h2>
        <SelectWithValue
          autoFocus
          defaultValue={colourOptions[0]}
          isDisabled={this.state.isDisabled}
          label="Single select"
          options={colourOptions}
        />
        <Note Tag="label">
          <input type="checkbox" onChange={this.toggleDisabled} />
          Disabled
        </Note>

        <h4>Grouped</h4>
        <SelectWithValue
          defaultValue={colourOptions[0]}
          label="Grouped select"
          options={groupedOptions}
        />

        <Hr />

        <h2>Multi</h2>
        <SelectWithValue
          defaultValue={[colourOptions[1], colourOptions[2]]}
          isMulti
          label="Multi select"
          options={colourOptions}
        />
      </div>
    );
  }
}
