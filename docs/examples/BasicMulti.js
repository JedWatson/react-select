import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note } from '../styled-components';
const Checkbox = props => <input type="checkbox" {...props} />;

type State = {
  hideSelectedOptions: boolean,
}

export default class Multi extends Component<*, State> {
  state = {
    hideSelectedOptions: true,
  }
  toggleOption = (event) => {
    this.setState(state => ({
      hideSelectedOptions: !state.hideSelectedOptions
    }));
  }
  render () {
    const { hideSelectedOptions } = this.state;
    return (
      <Fragment>
        <Select
          defaultValue={[colourOptions[2], colourOptions[3]]}
          isMulti
          hideSelectedOptions={hideSelectedOptions}
          name="colors"
          options={colourOptions}
        />
        <Note Tag="label">
          <Checkbox
            checked={hideSelectedOptions}
            onChange={this.toggleOption}
            id="cypress-single__disabled-checkbox"
          />
          hideSelectedOptions
        </Note>
      </Fragment>
    );
  }
}
