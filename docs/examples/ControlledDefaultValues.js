import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const TextInput = props => <input type="text" {...props} />;
const Checkbox = props => <input type="checkbox" {...props} />;

type State = {
  inputValue: string,
  menuIsOpen: boolean,
};

export default class ControlledDefaultValues extends Component<*, State> {
  state = {
    eventCalled: '',
    defaultInputValue: 'O',
    defaultMenuIsOpen: true,
    defaultValue: colourOptions[0],
    showSelect: true,
  };

  select;

  toggleMenuIsOpen = () =>
    this.setState(state => ({ defaultMenuIsOpen: !state.defaultMenuIsOpen }));

  updateDefaultValue = ({ currentTarget }) => {
    this.setState({ defaultValue: colourOptions.find(option => option.label === currentTarget.value) });
  }

  updateDefaultInputValue = (event) => {
    this.setState({ defaultInputValue: event.target.value });
  }

  updateDefaultMenuIsOpen = (event) => {
    this.setState({ menuIsOpen: event.target.value });
  }

  rerenderSelect = (event) => {
    this.setState({ showSelect: false }, () => {
      this.setState({ showSelect: true });
    });
  };

  render() {
    const { defaultMenuIsOpen, defaultInputValue, defaultValue, showSelect } = this.state;
    return (
      <Fragment>
        <Note Tag="label">
          <Note Tag="label">
            <TextInput
              id="cypress-single__input_value_text"
              onChange={this.updateDefaultInputValue}
              value={this.state.defaultInputValue}
            />
            Default Input Value
          </Note>
        </Note>
        <Note Tag="label">
          <Note Tag="label">
            <select onChange={this.updateDefaultValue}>
              {
                colourOptions.map(option =>
                  <option>{option.label}</option>)
              }
            </select>
            Default Value
          </Note>
        </Note>
        <Note Tag="label">
          <Note Tag="label">
            <Checkbox
              checked={defaultMenuIsOpen}
              onChange={this.toggleMenuIsOpen}
              id="cypress-single__clearable-checkbox"
            />
            Default Menu Is Open
          </Note>
        </Note>
        <Note Tag="label">
          <button onClick={this.rerenderSelect}>re-render</button>
        </Note>
        {showSelect ?
        <Select
          ref={ref => { this.select = ref; }}
          defaultMenuIsOpen={defaultMenuIsOpen}
          defaultInputValue={defaultInputValue}
          defaultValue={defaultValue}
          isClearable
          styles={{ menu: base => ({ ...base, position: 'relative' }) }}
          name="color"
          options={colourOptions}
        /> : null
        }
      </Fragment>
    );
  }
}
