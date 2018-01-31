// @flow

import React, { Component } from 'react';
import { withValue } from 'react-value';

import Select from '../../src';
import { H1, Hr, Note } from '../components';
import { colourOptions, groupedOptions } from '../data';

const SelectWithValue = withValue(Select);
type State = { isDisabled: boolean, isLoading: boolean };

export default class Tests extends Component<*, State> {
  state = { isDisabled: false, isLoading: false };
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  render() {
    return (
      <div>
        <H1>Test Page for Cypress</H1>
        <h2>Single Select</h2>
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
