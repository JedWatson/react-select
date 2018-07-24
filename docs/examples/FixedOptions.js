import React, { Component } from 'react';

import Select, { components } from '../../src';
import { colourOptions } from '../data';

type State = {
  value: [{ [string]: string }]
};

const TagStyle = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 } : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  }
};

const ClearIndicator = (props) => {
  let value = props.getValue();
  let isFixed = value && value.reduce((p, v) => p && v.isFixed, true);
  return isFixed ? (<span/>) : (<components.ClearIndicator {...props}/>);
};

const OrderOptions = (values) => {
  return values.filter((v) => v.isFixed).concat(values.filter((v) => !v.isFixed));
};

export default class FixedOptions extends Component<*, State> {
  state = {
    value: OrderOptions([colourOptions[0], colourOptions[1], colourOptions[3]])
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange (value, { action, removedValue }) {
    switch (action) {
      case 'remove-value':
      case 'pop-value':
        if (removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        value = colourOptions.filter((v) => v.isFixed);
        break;
    }

    value = OrderOptions(value);
    this.setState({ value: value });
  }

  render () {
    return (
      <Select
        value={this.state.value}
        isMulti
        styles={TagStyle}
        components={{ ClearIndicator }}
        name="colors"
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={this.onChange}
        options={colourOptions}
      />
    );
  }
}
