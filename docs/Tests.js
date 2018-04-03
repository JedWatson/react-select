// @flow

import React, { Component } from 'react';

import Select from '../src';
import { H1, Note } from './styled-components';
import { colourOptions, groupedOptions } from './data';

type Placement = 'bottom' | 'top';
type State = {
  isDisabled: boolean,
  isFixed: boolean,
  isLoading: boolean,
  portalPlacement: Placement,
  blockScroll: boolean,
};

export default class Tests extends Component<*, State> {
  state = {
    isDisabled: false,
    isFixed: false,
    isLoading: false,
    portalPlacement: 'bottom',
    blockScroll: true,
  };
  toggleDisabled = () => {
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  };
  toggleLoading = () => {
    this.setState(state => ({ isLoading: !state.isLoading }));
  };
  toggleScroll = () => {
    this.setState(state => ({ blockScroll: !state.blockScroll }));
  };
  toggleMode = () => {
    this.setState(state => ({ isFixed: !state.isFixed }));
  };
  setPlacement = ({ target }: Event) => {
    // $FlowFixMe targets have values...
    const portalPlacement = target && target.value;
    this.setState({ portalPlacement });
  };

  render() {
    const { isFixed, portalPlacement, blockScroll } = this.state;
    const menuPortalTarget = !isFixed ? document.body : null;

    return (
      <div style={{ margin: 'auto', maxWidth: 440, position: 'relative' }}>
        <H1>Test Page for Cypress</H1>
        <h2>Single Select</h2>
        <div id="cypress-single">
          <Select
            autoFocus
            defaultValue={colourOptions[0]}
            isDisabled={this.state.isDisabled}
            isLoading={this.state.isLoading}
            options={colourOptions}
          />
        </div>
        <Note Tag="label">
          <input
            type="checkbox"
            onChange={this.toggleDisabled}
            id="cypress-single__disabled-checkbox"
          />
          Disabled
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <input
            type="checkbox"
            onChange={this.toggleLoading}
            id="cypress-single__loading-checkbox"
          />
          Loading
        </Note>

        <h4>Grouped</h4>
        <div id="cypress-single-grouped">
          <Select defaultValue={colourOptions[1]} options={groupedOptions} />
        </div>

        <h4>Portalled</h4>
        <div
          id="cypress-single-portalled"
          style={{
            backgroundColor: 'papayaWhip',
            borderRadius: 5,
            boxSizing: 'border-box',
            height: 200,
            overflow: 'auto',
            padding: 15,
            position: 'absolute',
            width: '100%',
          }}
        >
          <div style={{ height: 100 }} />
          <pre>{'overflow: hidden; position: absolute;'}</pre>
          <Select
            defaultValue={colourOptions[0]}
            options={colourOptions}
            menuPortalTarget={menuPortalTarget}
            menuShouldBlockScroll={blockScroll}
            menuShouldScrollIntoView
            menuPlacement={portalPlacement}
            menuPosition={isFixed ? 'fixed' : 'absolute'}
            // menuIsOpen
          />
          <Note Tag="label">
            <select
              type="radio"
              onChange={this.setPlacement}
              value={portalPlacement}
              id="cypress-portalled__radio-bottom"
            >
              <option value="auto">auto</option>
              <option value="bottom">bottom</option>
              <option value="top">top</option>
            </select>
          </Note>
          <Note Tag="label" style={{ marginLeft: '1em' }}>
            <input
              type="radio"
              onChange={this.toggleMode}
              value="fixed"
              checked={isFixed}
              id="cypress-portalled__fixed"
            />
            Fixed
          </Note>
          <Note Tag="label" style={{ marginLeft: '1em' }}>
            <input
              type="radio"
              onChange={this.toggleMode}
              value="portal"
              checked={!isFixed}
              id="cypress-portalled__portal"
            />
            Portal
          </Note>
          <Note Tag="label" style={{ marginLeft: '1em' }}>
            <input
              type="checkbox"
              onChange={this.toggleScroll}
              value="blockScroll"
              checked={blockScroll}
              id="cypress-portalled__scroll"
            />
            Block Scroll
          </Note>
          <div style={{ height: 100 }} />
        </div>
        <div style={{ height: 200 }} />

        <h2>Multi Select</h2>
        <div id="cypress-multi">
          <Select
            defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            options={colourOptions}
          />
        </div>
        <div style={{ height: 400 }} />
      </div>
    );
  }
}
