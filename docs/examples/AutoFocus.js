// @flow

import React, { Component } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = props => <input type="checkbox" {...props} />;

export default class AutoFocus extends Component<{}, { showSelect: boolean }> {
  state = { showSelect: false };

  toggleShowSelect = () =>
    this.setState({ showSelect: !this.state.showSelect });

  render() {
    let { showSelect } = this.state;
    return (
      <div>
        <Note Tag="label">
          <Checkbox
            checked={showSelect}
            onChange={this.toggleShowSelect}
            id="cypress-single__clearable-checkbox"
          />
          Show Autofocused Select
        </Note>
        {showSelect ? <Select autoFocus options={colourOptions} /> : null}
      </div>
    );
  }
}
