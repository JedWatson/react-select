import React, { Component, Fragment } from 'react';

import Select from 'react-select';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = props => <input type="checkbox" {...props} />;

type State = {
  menuIsOpen: boolean,
};

export default class controlledMenu extends Component<*, State> {
  state = {
    menuIsOpen: false,
  };
  select: ElementRef<*>;
  toggleMenuIsOpen = () => {
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }));
    if (this.select) {
      return !this.state.menuIsOpen ? this.select.focus() : this.select.blur();
    }
  };
  render() {
    const { menuIsOpen } = this.state;
    return (
      <Fragment>
        <Select
          ref={ref => {
            this.select = ref;
          }}
          defaultValue={colourOptions[0]}
          isClearable
          menuIsOpen={menuIsOpen}
          styles={{ menu: base => ({ ...base, position: 'relative' }) }}
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
