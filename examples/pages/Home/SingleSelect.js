import React, { Component } from 'react';
import { withValue } from 'react-value';
import Select from '../../../src';
import { colourOptions } from '../../data';
import { Note } from '../../components';

const SelectWithValue = withValue(Select);

export default class SingleSelect extends Component {
  state = { isDisabled: false, isLoading: false };
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));

  render() {
    return (
      <div>
        <SelectWithValue
          autoFocus
          defaultValue={colourOptions[0]}
          isDisabled={this.state.isDisabled}
          isLoading={this.state.isLoading}
          name="color"
          options={colourOptions}
          onFocus={() => {
            console.log('Select Focused');
          }}
          onBlur={() => {
            console.log('Select Blurred');
          }}
        />
        <Note Tag="label">
          <input type="checkbox" onChange={this.toggleDisabled} />
          Disabled
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <input type="checkbox" onChange={this.toggleLoading} />
          Loading
        </Note>
      </div>
    );
  }
}
