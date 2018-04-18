import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = props => <input type="checkbox" {...props} />;

type State = {
  backspaceRemovesValue: boolean,
  blurInputOnSelect: boolean,
  closeMenuOnSelect: boolean,
  escapeClearsValue: boolean,
  tabSelectsValue: boolean,
};

export default class ControlCustomisations extends Component<*, State> {
  state = {
    backspaceRemovesValue: true,
    blurInputOnSelect: false,
    closeMenuOnSelect: true,
    escapeClearsValue: false,
    tabSelectsValue: true,
  };

  toggleOption = ({ currentTarget }) => {
    this.setState(state => ({
      [currentTarget.name]: !state[currentTarget.name]
    }));
  }

  render() {
    const {
      backspaceRemovesValue,
      blurInputOnSelect,
      closeMenuOnSelect,
      escapeClearsValue,
      tabSelectsValue,
    } = this.state;
    return (
      <Fragment>
        <Select
          defaultValue={colourOptions[0]}
          backspaceRemovesValue={backspaceRemovesValue}
          blurInputOnSelect={blurInputOnSelect}
          closeMenuOnSelect={closeMenuOnSelect}
          escapeClearsValue={escapeClearsValue}
          tabSelectsValue={tabSelectsValue}
          name="color"
          options={colourOptions}
          isClearable
        />
        <Note Tag="label">
          <Checkbox
            name={'backspaceRemovesValue'}
            checked={backspaceRemovesValue}
            onChange={this.toggleOption}
            id="cypress-single__backspaceRemovesValue-checkbox"
          />
          backspaceRemovesValue
        </Note>
        <Note Tag="label" display="block">
          <Checkbox
            name={'blurInputOnSelect'}
            checked={blurInputOnSelect}
            onChange={this.toggleOption}
            id="cypress-single__blurInputOnSelect-checkbox"
          />
          blurInputOnSelect
        </Note>
        <Note Tag="label" display="block">
          <Checkbox
            name={'closeMenuOnSelect'}
            checked={closeMenuOnSelect}
            onChange={this.toggleOption}
            id="cypress-single__closeMenuOnSelect-checkbox"
          />
          closeMenuOnSelect
        </Note>
        <Note Tag="label" display="block">
          <Checkbox
            name={'escapeClearsValue'}
            checked={escapeClearsValue}
            onChange={this.toggleOption}
            id="cypress-single__escapeClearsValue-checkbox"
          />
          escapeClearsValue
        </Note>
        <Note Tag="label" display="block">
          <Checkbox
            name={'tabSelectsValue'}
            type="checkbox"
            checked={tabSelectsValue}
            onChange={this.toggleOption}
            id="cypress-single__tabSelectsValue-checkbox"
          />
          tabSelectsValue
        </Note>
      </Fragment>
    );
  }
}
