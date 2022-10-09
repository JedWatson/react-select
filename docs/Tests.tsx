import React, {
  ChangeEventHandler,
  Component,
  ComponentProps,
  ComponentType,
} from 'react';

import Select, { MenuPlacement } from 'react-select';
import { H1, Note } from './styled-components';
import { colourOptions, groupedOptions, optionLength } from './data';

import * as animatedComponents from 'react-select/animated';

interface SuiteProps {
  readonly selectComponent: ComponentType<ComponentProps<typeof Select>>;
  readonly idSuffix: string;
}
interface SuiteState {
  readonly isDisabled: boolean;
  readonly isFixed: boolean;
  readonly isLoading: boolean;
  readonly escapeClearsValue: boolean;
  readonly blockScroll: boolean;
  readonly portalPlacement: MenuPlacement;
}

const AnimatedSelect = (props: ComponentProps<typeof Select>) => (
  <Select
    {...props}
    components={{
      ...animatedComponents,
      ...props.components,
    }}
  />
);

class TestSuite extends Component<SuiteProps, SuiteState> {
  state: SuiteState = {
    isDisabled: false,
    isFixed: false,
    isLoading: false,
    escapeClearsValue: false,
    portalPlacement: 'top',
    blockScroll: true,
  };
  toggleDisabled = () => {
    this.setState((state) => ({ isDisabled: !state.isDisabled }));
  };
  toggleLoading = () => {
    this.setState((state) => ({ isLoading: !state.isLoading }));
  };
  toggleScroll = () => {
    this.setState((state) => ({ blockScroll: !state.blockScroll }));
  };
  toggleMode = () => {
    this.setState((state) => ({ isFixed: !state.isFixed }));
  };
  toggleEscapeClearsValue = () => {
    this.setState((state) => ({ escapeClearsValue: !state.escapeClearsValue }));
  };

  setPlacement: ChangeEventHandler<HTMLSelectElement> = ({ currentTarget }) => {
    const portalPlacement =
      currentTarget && (currentTarget.value as MenuPlacement);
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
              menuPortal: (base) => ({ ...base, zIndex: 999 }),
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
            classNamePrefix="react-select"
            defaultValue={colourOptions[1]}
            options={groupedOptions}
          />
        </div>

        <h4>Clearable</h4>
        <div id={`cypress-${idSuffix}-clearable`}>
          <SelectComp
            id={`clearable-select-${idSuffix}`}
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

        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'flex-end',
            height: '80vh'
          }}
        >
          <div
            style={{
              background: 'lightgrey',
              padding: '12px',
              overflow: 'auto',
              width: '320px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              height: '80vh'
            }}
          >
            <h4>menuPlacement = auto</h4>
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="color"
              options={colourOptions}
              menuPlacement="auto"
              menuPortalTarget={window.document.body}
            />
            <h4>menuPlacement = top</h4>
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="color"
              options={colourOptions}
              menuPlacement="top"
              menuPortalTarget={window.document.body}
            />
            <h4>menuPlacement = bottom</h4>
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="color"
              options={colourOptions}
              menuPlacement="bottom"
              menuPortalTarget={window.document.body}
            />
            <h4>menuPlacement = auto, menuPortalTarget = false</h4>
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="color"
              options={colourOptions}
              menuPlacement="auto"
              menuPortalTarget={null}
            />
          </div>
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
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'flex-end',
        height: '80vh'
      }}
    >
      <div
        style={{
          background: 'lightgrey',
          padding: '12px',
          overflow: 'auto',
          width: '320px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '80vh'
        }}
      >
        <h4>menuPlacement = auto</h4>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="color"
          options={colourOptions}
          menuPlacement="auto"
          menuPortalTarget={window.document.body}
        />
        <h4>menuPlacement = top</h4>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="color"
          options={colourOptions}
          menuPlacement="top"
          menuPortalTarget={window.document.body}
        />
        <h4>menuPlacement = bottom</h4>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="color"
          options={colourOptions}
          menuPlacement="bottom"
          menuPortalTarget={window.document.body}
        />
        <h4>menuPlacement = auto, menuPortalTarget = false</h4>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="color"
          options={colourOptions}
          menuPlacement="auto"
          menuPortalTarget={null}
        />
      </div>
    </div>
  );
}
