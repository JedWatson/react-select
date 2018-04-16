import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { Note } from '../styled-components';

type State = {
  exampleConfig: string,
  placeholder: string,
  noOptionsMessage: string,
  loadingMessage: string,
};

export default class PlaceholderMsg extends Component<*, State> {
  state = {
    placeholder: 'Provide a placeholder message',
  };
  onChange = ({ currentTarget }) => {
    this.setState({
      placeholder: currentTarget.value,
    });
  }

  render() {
    const {
      placeholder
    } = this.state;
    return (
      <Fragment>
        <Note Tag="label">
          <input
            value={placeholder}
            onChange={this.onChange}
            id="cypress-single__clearable-checkbox"
          />
          Placeholder
        </Note>
        <Select
          placeholder={placeholder}
          isDisabled
          isClearable
          isSearchable
          name="color"
        />
      </Fragment>
    );
  }
}
