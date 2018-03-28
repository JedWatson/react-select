import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

let timer;

const Checkbox = props => <input type="checkbox" {...props} />;

const TextInput = props => <input type="text" {...props} />;

type State = {
  inputValue: string,
  menuIsOpen: boolean,
};

const flash = () => ({
  color: '#fffb00',
  background: '#0000af',
  animation: 'flashy 0.1s linear',
});

export default class controlledMenu extends Component<*, State> {
  state = {
    eventCalled: '',
    inputValue: '',
    menuIsOpen: false,
  };

  revertEventCalledState = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.setState({ eventCalled: '' });
    }, 1500);
  }

  toggleMenuIsOpen = () =>
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }));

  updateInputValue = (event) =>
    this.setState({ inputValue: event.target.value });

  onMenuOpen = () => {
    this.setState({ eventCalled: 'onMenuOpen Called' });
    this.revertEventCalledState();
  }

  onMenuClose = () => {
    this.setState({ eventCalled: 'onMenuClose Called' });
    this.revertEventCalledState();
  }

  onInputChange = () => {
    console.log('dfdsfdsd');
    this.setState({ eventCalled: 'onInputChange Called' });
    this.revertEventCalledState();
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
        <div>
          Action: {this.state.eventCalled && <span style={{ ...flash() }}>{this.state.eventCalled}</span>}
        </div>
        <Select
          defaultInputValue={this.state.defaultInputValue}
          defaultValue={colourOptions[0]}
          inputValue={this.state.inputValue}
          isClearable
          menuIsOpen={menuIsOpen}
          onInputChange={this.onInputChange}
          onMenuClose={this.onMenuClose}
          onMenuOpen={this.onMenuOpen}
          styles={{ menu: base => ({ ...base, position: 'relative' }) }}
          name="color"
          options={colourOptions}
        />
      </Fragment>
    );
  }
}
