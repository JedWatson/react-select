import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

type State = {
  minMenuHeight: number,
  maxMenuHeight: number,
  menuPlacement: 'auto' | 'bottom' | 'top',
  menuShouldScrollIntoView: boolean,
  captureMenuScroll: boolean,
  menuShouldBlockScroll: boolean,
  menuPosition: string,
};

export default class MenuHeight extends Component<*, State> {
  state = {
    minMenuHeight: 140,
    maxMenuHeight: 300,
  };

  toggleOption = ({ currentTarget }) => {
    this.setState(state => ({
      [currentTarget.name]: !state[currentTarget.name]
    }));
  }
  onChange = ({ currentTarget }) => {
    this.setState({
      [currentTarget.name]: currentTarget.value
    });
  }

  render() {
    const {
      minMenuHeight,
      maxMenuHeight,
    } = this.state;
    return (
      <Fragment>
        <Select
          defaultValue={colourOptions[0]}
          minMenuHeight={minMenuHeight}
          maxMenuHeight={maxMenuHeight}
          menuIsOpen
          styles={{
            menu: (base) => ({ ...base, position: 'relative' })
          }}
          options={colourOptions}
          isClearable
        />
        <Note Tag="label" display="block">
          <input
            name={'minMenuHeight'}
            type={'number'}
            value={minMenuHeight}
            onChange={this.onChange}
            id="cypress-single__minMenuHeight-checkbox"
          />
          minMenuHeight
        </Note>

        <Select
          minMenuHeight={minMenuHeight}
          menuIsOpen
          styles={{
            menu: (base) => ({ ...base, position: 'relative' })
          }}
          isClearable
        />
        <Note Tag="label" display="block">
          <input
            name={'maxMenuHeight'}
            type={'number'}
            value={maxMenuHeight}
            onChange={this.onChange}
            id="cypress-single__maxMenuHeight-checkbox"
          />
          maxMenuHeight
        </Note>
      </Fragment>
    );
  }
}
