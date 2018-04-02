// @flow

import React, { Component, type ComponentType } from 'react';

import Select from '../src';
import type { MenuPlacement } from '../src/types';
import { H1, Note } from './styled-components';
import { colourOptions, groupedOptions } from './data';

import * as animatedComponents from '../src/animated';
import * as defaultComponents from '../src/components';

type SuiteProps = {
  selectComponent: ComponentType<any>,
  idSuffix: string,
}
type SuiteState = {
  isDisabled: boolean,
  isLoading: boolean,
  portalPlacement: MenuPlacement,
};

const AnimatedSelect = (props) => (
  <Select
    {...props}
    components={{
      ...defaultComponents,
      ...animatedComponents,
      ...props.components
    }}
  />
);

class TestSuite extends Component<SuiteProps, SuiteState> {
  state = { isDisabled: false, isLoading: false, portalPlacement: 'bottom' };
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  setPlacement = (portalPlacement: MenuPlacement) =>
    this.setState({ portalPlacement });
  render() {
    const { selectComponent: SelectComp, idSuffix } = this.props;
    return (
      <div id={`cypress-container-${idSuffix}`}>
        <div id={`cypress-${idSuffix}`}>
          <SelectComp
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
            id={`cypress-${idSuffix}__disabled-checkbox`}
          />
          Disabled
          </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <input
            type="checkbox"
            onChange={this.toggleLoading}
            id={`cypress-${idSuffix}__loading-checkbox`}
          />
          Loading
          </Note>

        <h4>Grouped</h4>
        <div id={`cypress-${idSuffix}-grouped`}>
          <SelectComp defaultValue={colourOptions[1]} options={groupedOptions} />
        </div>

        <h4>Portalled</h4>
        <div
          id={`cypress-${idSuffix}-portalled`}
          style={{
            backgroundColor: 'papayaWhip',
            borderRadius: 5,
            overflow: 'hidden',
            padding: 5,
          }}
        >
          <SelectComp
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
              id={`cypress-${idSuffix}-portalled__radio-bottom`}
            />
            Bottom
            </Note>
          <Note Tag="label" style={{ marginLeft: '1em' }}>
            <input
              type="radio"
              onChange={() => this.setPlacement('top')}
              value="top"
              checked={this.state.portalPlacement === 'top'}
              id={`cypress-${idSuffix}-portalled__radio-top`}
            />
            Top
            </Note>
          <Note Tag="label" style={{ marginLeft: '1em' }}>
            <input
              type="radio"
              onChange={() => this.setPlacement('auto')}
              value="auto"
              checked={this.state.portalPlacement === 'auto'}
              id={`cypress-${idSuffix}-portalled__radio-auto`}
            />
            Auto
            </Note>
        </div>
      </div>
    );
  }
}

export default function Tests() {
  return (
    <div style={{ margin: 'auto', maxWidth: 440, padding: 20 }}>
      <H1>Test Page for Cypress</H1>
      <h2>Single Select</h2>
      <TestSuite selectComponent={Select} idSuffix="single" />
      <h3>Animated components</h3>
      <TestSuite selectComponent={AnimatedSelect} idSuffix="animated" />
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
