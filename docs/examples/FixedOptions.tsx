import React, { Component } from 'react';

import Select, { ActionMeta, StylesConfig, ValueType } from 'react-select';
import { ColourOption, colourOptions } from '../data';

interface State {
  readonly value: readonly ColourOption[];
}

const styles: StylesConfig<ColourOption, true> = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  },
};

const orderOptions = (values: readonly ColourOption[]) => {
  return values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
};

export default class FixedOptions extends Component<{}, State> {
  state = {
    value: orderOptions([colourOptions[0], colourOptions[1], colourOptions[3]]),
  };

  constructor(props: {}) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(
    value: ValueType<ColourOption, true>,
    { action, removedValue }: ActionMeta<ColourOption>
  ) {
    switch (action) {
      case 'remove-value':
      case 'pop-value':
        if (removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        value = colourOptions.filter(v => v.isFixed);
        break;
    }

    value = orderOptions(value);
    this.setState({ value: value });
  }

  render() {
    return (
      <Select
        value={this.state.value}
        isMulti
        styles={styles}
        isClearable={this.state.value.some(v => !v.isFixed)}
        name="colors"
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={this.onChange}
        options={colourOptions}
      />
    );
  }
}
