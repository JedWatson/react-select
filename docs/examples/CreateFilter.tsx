import React, { Component, Fragment } from 'react';
import Select, { createFilter } from 'react-select';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = (props: JSX.IntrinsicElements['input']) => (
  <input type="checkbox" {...props} />
);

interface State {
  readonly ignoreCase: boolean;
  readonly ignoreAccents: boolean;
  readonly trim: boolean;
  readonly matchFromStart: boolean;
}

export default class SelectCreateFilter extends Component<{}, State> {
  state: State = {
    ignoreCase: false,
    ignoreAccents: false,
    trim: false,
    matchFromStart: false,
  };
  toggleOption = (key: keyof State) => () => {
    this.setState(state => ({ ...state, [key]: !state[key] }));
  };
  render() {
    const { ignoreCase, ignoreAccents, trim, matchFromStart } = this.state;

    const filterConfig = {
      ignoreCase,
      ignoreAccents,
      trim,
      matchFrom: this.state.matchFromStart
        ? ('start' as const)
        : ('any' as const),
    };

    return (
      <Fragment>
        <Select
          defaultValue={colourOptions[0]}
          isClearable
          isSearchable
          name="color"
          options={colourOptions}
          filterOption={createFilter(filterConfig)}
        />
        <Note Tag="label">
          <Checkbox
            checked={ignoreCase}
            onChange={this.toggleOption('ignoreCase')}
            id="cypress-single__clearable-checkbox"
          />
          Ignore Case
        </Note>
        <Note Tag="label">
          <Checkbox
            checked={ignoreAccents}
            onChange={this.toggleOption('ignoreAccents')}
            id="cypress-single__clearable-checkbox"
          />
          Ignore Accents
        </Note>
        <Note Tag="label">
          <Checkbox
            checked={trim}
            onChange={this.toggleOption('trim')}
            id="cypress-single__clearable-checkbox"
          />
          Trim
        </Note>
        <Note Tag="label">
          <Checkbox
            checked={matchFromStart}
            onChange={this.toggleOption('matchFromStart')}
            id="cypress-single__clearable-checkbox"
          />
          Match from the start
        </Note>
      </Fragment>
    );
  }
}
