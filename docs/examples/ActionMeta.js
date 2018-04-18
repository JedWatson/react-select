// @flow
import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = props => <input type="checkbox" {...props} />;
type State = {
  resetInputOnBlur: boolean,
  resetInputOnClose: boolean,
  resetInputOnSetValue: boolean,
  inputValue: string,
}

export default class ActionMeta extends Component<{}, State> {
  state = {
    inputValue: '',
    resetInputOnBlur: false,
    resetInputOnClose: false,
    resetInputOnSetValue: false,
  }

  onInputChange = (a: string, b: { action: string }) => {
    let { resetInputOnClose, resetInputOnBlur, resetInputOnSetValue } = this.state;
    if (b.action === 'input-change') {
      this.setState({ inputValue: a });
    }

    // Note that if resetInputOnClose is true, setting either of the below will be
    // overwritten as by default both also call a menu-close
    if (resetInputOnClose) {
      if (b.action === 'menu-close') {
        this.setState({ inputValue: '' });
      }
    }

    if (resetInputOnBlur) {
      if (b.action === 'input-blur') {
        this.setState({ inputValue: '' });
      }
    }

    if (resetInputOnSetValue) {
      if (b.action === 'set-value') {
        this.setState({ inputValue: '' });
      }
    }
  }

  render() {
    let { inputValue, resetInputOnBlur, resetInputOnClose, resetInputOnSetValue } = this.state;
    return (
      <Fragment>
        <Select
          options={colourOptions}
          isMulti
          name="color"
          inputValue={inputValue}
          onInputChange={this.onInputChange}
        />
        <Note Tag="label">
          <Checkbox
            checked={resetInputOnClose}
            onChange={() => this.setState({ resetInputOnClose: !resetInputOnClose })}
            id="cypress-single__clearable-checkbox"
          />
          Reset Input On Close
        </Note>
        <Note Tag="label">
          <Checkbox
            checked={resetInputOnBlur}
            onChange={() => this.setState({ resetInputOnBlur: !resetInputOnBlur })}
            id="cypress-single__clearable-checkbox"
          />
          Reset Input On Blur
        </Note>
        <Note Tag="label">
          <Checkbox
            checked={resetInputOnSetValue}
            onChange={() => this.setState({ resetInputOnSetValue: !resetInputOnSetValue })}
            id="cypress-single__clearable-checkbox"
          />
          Reset Input On Select
        </Note>
      </Fragment>
    );
  }
}
