import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { Note } from '../styled-components';

type State = {
  screenReaderStatus: string,
};

export default class ScreenReaderStatus extends Component<*, State> {
  state = {
    screenReaderStatus: 'Provide a no options message here....',
  };
  onChange = ({ currentTarget }) => {
    this.setState({
      screenReaderStatus: currentTarget.value,
    });
  }
  render() {
    return (
      <Fragment>
        <Note Tag="label" display="block">
          <input
            value={this.state.screenReaderStatus}
            onChange={this.onChange}
            id="cypress-single__clearable-checkbox"
          />
          No Options Message
        </Note>
        <Select
          options={[]}
          menuIsOpen
          screenReaderStatus={({ inputValue }) => !inputValue ? this.state.screenReaderStatus : `There are no results available for ${inputValue}`}
          isDisabled
          isClearable
          isSearchable
          name="color"
        />
      </Fragment>
    );
  }
}
