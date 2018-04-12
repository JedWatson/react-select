import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note, FadeIn } from '../styled-components';

let menuOpenCloseTimer, inputValueChangeTimer, onChangeHookCalledTimer;

type State = {
  inputValue: string,
  menuIsOpen: boolean,
};

const defaultStyle = {
  transition: 'width 200ms ease-in-out',
  opacity: 0,
  display: 'inline-block',
  marginLeft: '1em',
  background: 'green',
  color: 'white',
  padding: '0 5px',
  borderRadius: '2px',
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

export default class EventHooks extends Component<*, State> {
  state = {
    inputHookCalled: '',
    menuEventCalled: '',
    onChangeHookCalled: '',
  };

  revertMenuOpenCloseEventState = () => {
    if (menuOpenCloseTimer) {
      clearTimeout(menuOpenCloseTimer);
    }
    menuOpenCloseTimer = setTimeout(() => {
      this.setState({ menuEventCalled: '' });
    }, 1500);
  }

  revertOnInputValueEventState = () => {
    if (inputValueChangeTimer) {
      clearTimeout(inputValueChangeTimer);
    }
    inputValueChangeTimer = setTimeout(() => {
      this.setState({ inputHookCalled: '' });
    }, 1500);
  }

  revertOnChangeEventState = () => {
    if (onChangeHookCalledTimer) {
      clearTimeout(onChangeHookCalledTimer);
    }
    onChangeHookCalledTimer = setTimeout(() => {
      this.setState({ onChangeHookCalled: '' });
    }, 1500);
  }

  onMenuOpen = () => {
    this.setState({ menuEventCalled: 'onMenuOpen Called' });
    this.revertMenuOpenCloseEventState();
  }

  onMenuClose = () => {
    this.setState({ menuEventCalled: 'onMenuClose Called' });
    this.revertMenuOpenCloseEventState();
  }

  onInputChange = (value, action) => {
    this.setState({ inputHookCalled: `onInputChange Called with ${value} and ${JSON.stringify(action)}` });
    this.revertOnInputValueEventState();
  }

  onChange = (value, action) => {
    this.setState({ onChangeHookCalled: `onChange Called with ${JSON.stringify(value)} and ${JSON.stringify(action)}` });
    this.revertOnChangeEventState();
  }

  render() {
    return (
      <Fragment>
        <div>
          <Note Tag="label">
            <div style={{ marginBottom: '1em' }}>
              Menu open and close hook
              <FadeIn
                in={this.state.menuEventCalled !== ''}
                defaultStyle={defaultStyle}
                transitionStyles={transitionStyles}
              >
                {this.state.menuEventCalled}
              </FadeIn>
            </div>
          </Note>
        </div>
        <div>
          <Note Tag="label">
            <div style={{ marginBottom: '1em' }}>
              InputValue hook
              <FadeIn
                in={this.state.inputHookCalled !== ''}
                defaultStyle={defaultStyle}
                transitionStyles={transitionStyles}
              >
                {this.state.inputHookCalled}
              </FadeIn>
            </div>
          </Note>
        </div>
        <div>
          <Note Tag="label">
            <div style={{ marginBottom: '1em' }}>
              onChange hook
              <FadeIn
                in={this.state.onChangeHookCalled !== ''}
                defaultStyle={defaultStyle}
                transitionStyles={transitionStyles}
              >
                {this.state.onChangeHookCalled}
              </FadeIn>
            </div>
          </Note>
        </div>
        <Select
          defaultInputValue={this.state.defaultInputValue}
          defaultValue={colourOptions[0]}
          isClearable
          onChange={this.onChange}
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
