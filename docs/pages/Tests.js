// @flow

import React, { Component } from 'react';

import Select from '../../src';
import { H1, Hr, Note } from '../components';
import { colourOptions, groupedOptions } from '../data';

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
          <Select
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
          <Select defaultValue={colourOptions[1]} options={groupedOptions} />
        </div>
        <Hr />
        <h2>Multi Select</h2>
        <div id="cypress-multi">
          <Select
            defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            options={colourOptions}
          />
        </div>
      </div>
    );
  }
}
