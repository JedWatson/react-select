import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { Note } from '../styled-components';

type State = {
  noOptionsMessage: string,
};

export default class NoOptionsMsg extends Component<*, State> {
  state = {
    noOptionsMessage: 'Provide a no options message here....',
  };
  onChange = ({ currentTarget }) => {
    this.setState({
      noOptionsMessage: currentTarget.value,
    });
  }
  render() {
    return (
      <Fragment>
        <Note Tag="label" display="block">
          <input
            value={this.state.noOptionsMessage}
            onChange={this.onChange}
            id="cypress-single__clearable-checkbox"
          />
          No Options Message
        </Note>
        <Select
          options={[]}
          menuIsOpen
          noOptionsMessage={({ inputValue }) => !inputValue ? this.state.noOptionsMessage : `There are no results available for ${inputValue}`}
          isDisabled
          isClearable
          isSearchable
          name="color"
        />
      </Fragment>
    );
  }
}
