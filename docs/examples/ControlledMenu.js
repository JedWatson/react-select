import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = props => <input type="checkbox" {...props} />;

const TextInput = props => <input type="text" {...props} />;

type State = {
  inputValue: string,
  menuIsOpen: boolean,
};

export default class controlledMenu extends Component<*, State> {
  state = {
    inputValue: '',
    menuIsOpen: false,
  };

  toggleMenuIsOpen = () =>
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }));

  updateInputValue = (event) =>
    this.setState({ inputValue: event.target.value });

  render() {
    const { menuIsOpen } = this.state;
    return (
      <Fragment>
        <Note Tag="label">
          <Checkbox
            checked={menuIsOpen}
            onChange={this.toggleMenuIsOpen}
            id="cypress-single__clearable-checkbox"
          />
          menuIsOpen
        </Note>
        <Note Tag="label">
          <TextInput
            id="cypress-single__input_value_text"
            onChange={this.updateInputValue}
            value={this.state.inputValue}
          />
          inputValue
        </Note>
        <Select
          defaultInputValue={this.state.defaultInputValue}
          defaultValue={colourOptions[0]}
          inputValue={this.state.inputValue}
          isClearable
          menuIsOpen={menuIsOpen}
          styles={{ menu: base => ({ ...base, position: 'relative' }) }}
          name="color"
          options={colourOptions}
        />
      </Fragment>
    );
  }
}
