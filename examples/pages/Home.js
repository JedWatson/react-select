// @flow

import React, { Component } from 'react';
import { withValue } from 'react-value';

import Select from '../../src';
import * as Animated from '../../src/animated';
import { Hr, Note } from '../components';
import { colourOptions, groupedOptions } from '../data';

const colourStyles = {
  singleValue: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
};

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
        <h1>new-select</h1>
        <p>A sandbox for the new react-select</p>

        <h2>Single</h2>
        <div id="cypress-single">
          <SelectWithValue
            autoFocus
            defaultValue={colourOptions[0]}
            isDisabled={this.state.isDisabled}
            isLoading={this.state.isLoading}
            options={colourOptions}
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

        <h2>Multi</h2>
        <div id="cypress-multi">
          <SelectWithValue
            defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            options={colourOptions}
          />
        </div>

        <Hr />

        <h2>Colours</h2>
        <SelectWithValue
          defaultValue={colourOptions[4]}
          label="Single select"
          options={colourOptions}
          styles={colourStyles}
        />

        <Hr />

        <h2>Animated</h2>
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
