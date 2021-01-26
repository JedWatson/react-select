import React, { Component } from 'react';

import Select, { components, ControlProps } from 'react-select';
import { ColourOption, colourOptions } from '../data';
const controlStyles = {
  borderRadius: '1px solid black',
  padding: '5px',
  background: colourOptions[2].color,
  color: 'white',
};

const ControlComponent = (props: ControlProps<ColourOption, false>) => (
  <div style={controlStyles}>
    {<p>Custom Control</p>}
    <components.Control {...props} />
  </div>
);

export default class CustomControl extends Component {
  render() {
    return (
      <Select
        defaultValue={colourOptions[0]}
        isClearable
        components={{ Control: ControlComponent }}
        isSearchable
        name="color"
        options={colourOptions}
      />
    );
  }
}
