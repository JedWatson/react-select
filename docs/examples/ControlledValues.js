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

export default class ControlledValues extends Component<*, State> {
  state = {
    eventCalled: '',
    inputValue: '',
    menuIsOpen: false,
    value: colourOptions[0],
  };

  toggleMenuIsOpen = () =>
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }));

  updateInputValue = (event) =>
    this.setState({ inputValue: event.target.value });

  updateValue = ({ currentTarget }) => {
    let label = currentTarget.value;
    this.setState({
      value: colourOptions.find(option => option.label === label),
    });
  }

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
        <Note Tag="label">
          <select onChange={this.updateValue}>
            {colourOptions.map(option => <option>{option.label}</option>)}
          </select>
          value
        </Note>
        <Select
          inputValue={this.state.inputValue}
          value={this.state.value}
          menuIsOpen={menuIsOpen}
          isClearable
          onInputChange={this.onInputChange}
          name="color"
          options={colourOptions}
        />
      </Fragment>
    );
  }
}
