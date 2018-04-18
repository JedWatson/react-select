import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note, FadeIn } from '../styled-components';

let timers = {
  onFocusTimer: undefined,
  onBlurTimer: undefined,
  onKeyDownTimer: undefined,
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

export default class InteractionListeners extends Component<*, State> {
  state = {
    onBlurCalled: '',
    onFocusCalled: '',
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

  onFocus = () => {
    this.setState({ onFocusCalled: 'onFocus Called' });
    this.revertEventState('onFocusCalled');
  }

  onBlur = () => {
    this.setState({ onBlurCalled: 'onBlur Called' });
    this.revertEventState('onBlurCalled');
  }

  onKeyDown = ({ key }) => {
    this.setState({ onKeyDownCalled: `onKeyDown Called with ${key}` });
    this.revertEventState('onKeyDownCalled');
  }

  render() {
    return (
      <Fragment>
        <Note Tag="label" display="block">
          <div style={{ marginBottom: '1em' }}>
            onFocus hook
            <FadeIn
              in={this.state.onFocusCalled !== ''}
              defaultStyle={defaultStyle}
              transitionStyles={transitionStyles}
            >
              {this.state.onFocusCalled}
            </FadeIn>
          </div>
        </Note>
        <Note Tag="label" display="block">
          <div style={{ marginBottom: '1em' }}>
            onBlur hook
            <FadeIn
              in={this.state.onBlurCalled !== ''}
              defaultStyle={defaultStyle}
              transitionStyles={transitionStyles}
            >
              {this.state.onBlurCalled}
            </FadeIn>
          </div>
        </Note>
        <Note Tag="label" display="block">
          <div style={{ marginBottom: '1em' }}>
            onKeyDown hook
            <FadeIn
              in={this.state.onKeyDownCalled !== ''}
              defaultStyle={defaultStyle}
              transitionStyles={transitionStyles}
            >
              {this.state.onKeyDownCalled}
            </FadeIn>
          </div>
        </Note>
        <Select
          defaultInputValue={this.state.defaultInputValue}
          defaultValue={colourOptions[0]}
          isClearable
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          styles={{ menu: base => ({ ...base, position: 'relative' }) }}
          name="color"
          options={colourOptions}
        />
      </Fragment>
    );
  }
}
