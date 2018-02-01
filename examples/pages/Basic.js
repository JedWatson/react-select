// @flow

import React, { Component } from 'react';
import { H1, Hr, Note, Section } from '../components';
import { withValue } from 'react-value';

import Select from '../../src';
import { colourOptions, groupedOptions } from '../data';

const SelectWithValue = withValue(Select);
type State = { isDisabled: boolean, isLoading: boolean };

export default class Basic extends Component<*, State> {
  state = { isDisabled: false, isLoading: false };
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  render() {
    return (
      <Section id={this.props.id}>
        <H1>Basic Usage</H1>
        <h4>Single Select</h4>
        <div id="cypress-single">
          <SelectWithValue
            defaultValue={colourOptions[0]}
            isDisabled={this.state.isDisabled}
            isLoading={this.state.isLoading}
            options={colourOptions}
            onFocus={() => {
              console.log('Select Focused');
            }}
            onBlur={() => {
              console.log('Select Blurred');
            }}
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
        <h4>Multi Select</h4>
        <div id="cypress-multi">
          <SelectWithValue
            defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            options={colourOptions}
          />
        </div>
      </Section>
    );
  }
}
