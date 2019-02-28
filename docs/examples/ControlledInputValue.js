import React, { Component, Fragment } from 'react';

import Select from '../../src';
import { colourOptions } from '../data';

type State = {
  inputValue: string,
};

export default class controlledInputValue extends Component<*, State> {
  state = {
    inputValue: 'Default Input Value',
  };
  select: ElementRef<*>;
  onInputChange = (inputValue, { action }) => {
    if (action === 'input-change') {
      this.setState(() => ({ inputValue }));
    }
  }
  render() {
    const { inputValue } = this.state;
    return (
      <Fragment>
        <p><code>inputValue:</code> {inputValue}</p>
        <Select
          ref={(ref) => { this.select = ref; }}
          isClearable
          inputValue={inputValue}
          onInputChange={this.onInputChange}
          styles={{ menu: base => ({ ...base, position: 'relative' }) }}
          name="color"
          options={colourOptions}
        />
      </Fragment>
    );
  }
}
