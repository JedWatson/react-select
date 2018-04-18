import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { Note } from '../styled-components';
import { colourOptions } from '../data';

type State = {
  exampleConfig: string,
  placeholder: string,
  noOptionsMessage: string,
  loadingMessage: string,
};

export default class LoadingMsg extends Component<*, State> {
  state = {
    loadingMessage: 'Provide a custom loading message',
  };
  onChange = ({ currentTarget }) => {
    this.setState({
      placeholder: currentTarget.value,
    });
  }

  render() {
    const {
      loadingMessage
    } = this.state;
    return (
      <Fragment>
        <Note Tag="label">
          <input
            value={loadingMessage}
            onChange={this.onChange}
            id="cypress-single__clearable-checkbox"
          />
          Loading Message
        </Note>
        <Select
          options={colourOptions}
          isLoading
          inputValue={'search text to show loading message...'}
          menuIsOpen
          loadingMessage={() => loadingMessage}
          isSearchable
          name="color"
        />
      </Fragment>
    );
  }
}
