import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = props => <input type="checkbox" {...props} />;

export default class OpenOnClick extends Component {
  state = {
    menuIsOpen: false,
    openOnClick: false,
  }
  toggleProp = (event) => {
    console.log(event);
  }
  render () {
    const { openOnClick } = this.state;
    return (
      <Fragment>
        <Select
          isMulti
          defaultValue={colourOptions[0]}
          isClearable
          isSearchable
          openOnClick={openOnClick}
          name="color"
          options={colourOptions}
        />
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <Checkbox
            checked={openOnClick}
            onChange={this.toggleProp}
            id="cypress-single__openOnClick-checkbox"
          />
          Open on click
        </Note>
      </Fragment>
    );
  }
};
