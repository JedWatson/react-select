// @flow

import React, { Component } from 'react';

import Select from '../src';
import { H1, Note } from './styled-components';
import { colourOptions, groupedOptions } from './data';

import Modal from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';

type Placement = 'bottom' | 'top';
type State = {
  isDisabled: boolean,
  isLoading: boolean,
  portalPlacement: Placement,
  isOpen: boolean;
};

export default class Tests extends Component<*, State> {
  state = { isDisabled: false, isLoading: false, portalPlacement: 'bottom', isOpen: false};
  open = () => this.setState(state => ({ ...state, isOpen: true }));
  close = () => this.setState(state => ({ ...state, isOpen: false }));
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  setPlacement = (portalPlacement: Placement) =>
    this.setState({ portalPlacement });
  render() {
    return (
      <div style={{ margin: 'auto', maxWidth: 440, padding: 20 }}>
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
            overflow: 'hidden',
            padding: 5,
          }}
        >
          <Button onClick={this.open}>Open Modal</Button>
          {
            this.state.isOpen ?
            <Modal onClose={this.close}>
              <Select
                defaultValue={colourOptions[0]}
                options={colourOptions}
                menuPortalTarget={document.body}
                menuPlacement={this.state.portalPlacement}
              />
              <pre style={{ marginBottom: 0 }}>{'div { overflow: hidden; }'}</pre>
              <Note Tag="label">
                <input
                  type="radio"
                  onChange={() => this.setPlacement('bottom')}
                  value="bottom"
                  checked={this.state.portalPlacement === 'bottom'}
                  id="cypress-portalled__radio-bottom"
                />
                Bottom
              </Note>
              <Note Tag="label" style={{ marginLeft: '1em' }}>
                <input
                  type="radio"
                  onChange={() => this.setPlacement('top')}
                  value="top"
                  checked={this.state.portalPlacement === 'top'}
                  id="cypress-portalled__radio-top"
                />
                Top
              </Note>
            </Modal>
            : null
          }
        </div>

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
