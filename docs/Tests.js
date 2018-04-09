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
  isFixed: boolean,
  isLoading: boolean,
  blockScroll: boolean,
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
  state = {
    isDisabled: false,
    isFixed: false,
    isLoading: false,
    portalPlacement: 'top',
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

  setPlacement = ({ currentTarget }: SyntheticEvent<*>) => {
    const portalPlacement = currentTarget && currentTarget.value;
    this.setState({ portalPlacement });
  };

  render() {
    const { isFixed, portalPlacement, blockScroll } = this.state;
    const { selectComponent: SelectComp, idSuffix } = this.props;
    const menuPortalTarget = !isFixed ? document.body : null;
    return (
      <div id={`cypress-container-${idSuffix}`}>
        <div id={`cypress-${idSuffix}`}>
          <SelectComp
            autoFocus
            defaultValue={colourOptions[0]}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 999 }),
            }}
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
            boxSizing: 'border-box',
            height: 200,
            overflow: 'auto',
            padding: 15,
            width: '100%',
          }}
        >
          <div style={{ height: 100 }} />
          <pre>{'overflow: hidden; position: absolute;'}</pre>
          <SelectComp
            defaultValue={colourOptions[0]}
            options={colourOptions}
            menuPortalTarget={menuPortalTarget}
            menuShouldBlockScroll={blockScroll}
            menuShouldScrollIntoView
            menuPlacement={portalPlacement}
            menuPosition={isFixed ? 'fixed' : 'absolute'}
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
      </div>
    );
  }
}

export default function Tests() {
  return (
    <div style={{ margin: 'auto', maxWidth: 440, padding: 20, position: 'relative' }}>
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
