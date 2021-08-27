import React, { Component, Fragment } from 'react';

import Select, { SelectInstance } from 'react-select';
import { ColourOption, colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = (props: JSX.IntrinsicElements['input']) => (
  <input type="checkbox" {...props} />
);

interface State {
  readonly menuIsOpen: boolean;
}

export default class controlledMenu extends Component<{}, State> {
  state: State = {
    menuIsOpen: false,
  };
  select?: SelectInstance<ColourOption> | null;
  toggleMenuIsOpen = () => {
    this.setState((state) => ({ menuIsOpen: !state.menuIsOpen }));
    if (this.select) {
      return !this.state.menuIsOpen ? this.select.focus() : this.select.blur();
    }
  };
  render() {
    const { menuIsOpen } = this.state;
    return (
      <Fragment>
        <Select
          ref={(ref) => {
            this.select = ref;
          }}
          defaultValue={colourOptions[0]}
          isClearable
          menuIsOpen={menuIsOpen}
          styles={{ menu: { position: 'relative' } }}
          name="color"
          options={colourOptions}
        />
        <Note Tag="label">
          <Checkbox
            checked={menuIsOpen}
            onChange={this.toggleMenuIsOpen}
            id="cypress-single__clearable-checkbox"
          />
          menuIsOpen
        </Note>
      </Fragment>
    );
  }
}
