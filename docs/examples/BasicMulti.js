import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = props => <input type="checkbox" {...props} />;

export default class MultiSelect extends Component {

  state = {
    hideSelectedOptions: true,
  }

  toggleHideSelectedOptions = () =>
    this.setState(prevState => ({ hideSelectedOptions: !prevState.hideSelectedOptions }));

  render() {
    return (
      <Fragment>
        <Select
          defaultValue={[colourOptions[2], colourOptions[3]]}
          hideSelectedOptions={this.state.hideSelectedOptions}
          isMulti
          name="colors"
          options={colourOptions}
        />
        <Note Tag="label">
          <Checkbox
            checked={this.state.hideSelectedOptions}
            onChange={this.toggleHideSelectedOptions}
            id="cypress-multi-hide-selected-options-checkbox"
          />
          Hide Selected Options
        </Note>
      </Fragment>
    );
  }
}
