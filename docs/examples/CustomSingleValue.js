import React, { PureComponent } from 'react';
import Select, { components } from '../../src';
import { colourOptions } from '../data';


const SingleValue = ({ children, ...props }) => {
  const boxStyle = {
    height: '10px',
    width: '10px',
    margin: '4px 5px 0 0',
    background: props.data.color
  };
  return (
    <components.SingleValue {...props}>
      <div style={boxStyle}/>
      {children}
    </components.SingleValue>
  );
};

export default class CustomControl extends PureComponent<*> {
  render() {
    return (
      <Select
        defaultValue={colourOptions[0]}
        isClearable
        styles={{ singleValue: (base) => ({ ...base, padding: 5, borderRadius: 5, background: colourOptions[2].color, color: 'white', display: 'flex' }) }}
        components={{ SingleValue }}
        isSearchable
        name="color"
        options={colourOptions}
      />
    );
  }
}
