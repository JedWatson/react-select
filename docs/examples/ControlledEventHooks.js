import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note, FadeIn } from '../styled-components';

let timers = {
  menuOpenCloseTimer: undefined,
  inputValueChangeTimer: undefined,
  onChangeHookCalledTimer: undefined
};

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

export default class ControlledEventHooks extends Component<*, State> {
  state = {
    inputHookCalled: '',
    menuEventCalled: '',
    onChangeHookCalled: '',
  };

  revertEventState = (key) => {
    let eventTimer = timers[key];
    if (eventTimer) {
      clearTimeout(eventTimer);
    }

    eventTimer = setTimeout(() => {
      this.setState({ [key]: '' });
    }, 1500);
  }

  onMenuOpen = () => {
    this.setState({ menuEventCalled: 'onMenuOpen Called' });
    this.revertEventState('menuEventCalled');
  }

  onMenuClose = () => {
    this.setState({ menuEventCalled: 'onMenuClose Called' });
    this.revertEventState('menuEventCalled');
  }

  onInputChange = (value, action) => {
    this.setState({ inputHookCalled: `onInputChange Called with ${value} and ${JSON.stringify(action)}` });
    this.revertEventState('inputHookCalled');
  }

  onChange = (value, action) => {
    this.setState({ onChangeHookCalled: `onChange Called with ${JSON.stringify(value)} and ${JSON.stringify(action)}` });
    this.revertEventState('onChangeHookCalled');
  }

  render() {
    return (
      <Fragment>
        <Note Tag="label" display="block">
          <div style={{ marginBottom: '1em' }}>
            menu open and close hook
            <FadeIn
              in={this.state.menuEventCalled !== ''}
              defaultStyle={defaultStyle}
              transitionStyles={transitionStyles}
            >
              {this.state.menuEventCalled}
            </FadeIn>
          </div>
        </Note>
        <Note Tag="label" display="block">
          <div style={{ marginBottom: '1em' }}>
            inputValue hook
            <FadeIn
              in={this.state.inputHookCalled !== ''}
              defaultStyle={defaultStyle}
              transitionStyles={transitionStyles}
            >
              {this.state.inputHookCalled}
            </FadeIn>
          </div>
        </Note>
        <Note Tag="label" display="block">
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
