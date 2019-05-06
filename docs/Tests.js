// @flow

import React, { Component, type ComponentType } from 'react';

import Select from 'react-select';
import type { MenuPlacement } from 'react-select/src/types';
import { H1, Note } from './styled-components';
import { colourOptions, groupedOptions, optionLength } from './data';

import * as animatedComponents from 'react-select/animated';

type SuiteProps = {
  selectComponent: ComponentType<any>,
  idSuffix: string,
};
type SuiteState = {
  isDisabled: boolean,
  isFixed: boolean,
  isLoading: boolean,
  escapeClearsValue: boolean,
  blockScroll: boolean,
  portalPlacement: MenuPlacement,
};

const AnimatedSelect = props => (
  <Select
    {...props}
    components={{
      ...animatedComponents,
      ...props.components,
    }}
  />
);

class TestSuite extends Component<SuiteProps, SuiteState> {
  state = {
    isDisabled: false,
    isFixed: false,
    isLoading: false,
    escapeClearsValue: false,
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
  toggleEscapeClearsValue = () => {
    this.setState(state => ({ escapeClearsValue: !state.escapeClearsValue }));
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
            id={`basic-select-${idSuffix}`}
            instanceId={`basic-select-${idSuffix}`}
            classNamePrefix="react-select"
            defaultValue={colourOptions[0]}
            styles={{
              menuPortal: base => ({ ...base, zIndex: 999 }),
            }}
            isDisabled={this.state.isDisabled}
            isLoading={this.state.isLoading}
            options={colourOptions}
          />
          <Note Tag="label">
            <input
              type="checkbox"
              onChange={this.toggleDisabled}
              className="disable-checkbox"
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
        </div>

        <h4>Grouped</h4>
        <div id={`cypress-${idSuffix}-grouped`}>
          <SelectComp
            id={`grouped-options-${idSuffix}`}
            instancePrefix={`grouped-options-${idSuffix}`}
            classNamePrefix="react-select"
            defaultValue={colourOptions[1]}
            options={groupedOptions}
          />
        </div>

        <h4>Clearable</h4>
        <div id={`cypress-${idSuffix}-clearable`}>
          <SelectComp
            id={`clearable-select-${idSuffix}`}
            instancePrefix={`clearable-select-${idSuffix}`}
            isClearable
            escapeClearsValue={this.state.escapeClearsValue}
            classNamePrefix="react-select"
            defaultValue={colourOptions[1]}
            options={groupedOptions}
          />
          <Note Tag="label">
            <input
              type="checkbox"
              onChange={this.toggleEscapeClearsValue}
              className="escape-clears-value-checkbox"
            />
            escapeClearsValue
          </Note>
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
            id={`portalled-select-${idSuffix}`}
            instanceId={`portalled-select-${idSuffix}`}
            classNamePrefix="react-select"
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
    <div
      style={{
        margin: 'auto',
        maxWidth: 440,
        padding: 20,
        position: 'relative',
      }}
    >
      <H1>Test Page for Cypress</H1>
      <h2>Single Select</h2>
      <TestSuite selectComponent={Select} idSuffix="single" />
      <h3>Animated components</h3>
      <TestSuite selectComponent={AnimatedSelect} idSuffix="animated" />
      <h2>Multi Select</h2>
      <div id="cypress-multi">
        <Select
          id="multi-select"
          instanceId="multi-select"
          classNamePrefix="react-select"
          defaultValue={[colourOptions[2], colourOptions[3]]}
          isMulti
          options={colourOptions}
        />
      </div>
      <div style={{ height: 400 }} />
      <h3> Long Values </h3>
      <div id={'cypress-long-values'}>
        <Select
          id="long-value-select"
          instanceId="long-value-select"
          classNamePrefix="react-select"
          defaultValue={optionLength[3]}
          options={optionLength}
        />
      </div>
    </div>
  );
}
