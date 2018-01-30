// @flow

import React, { Component } from 'react';
import moment from 'moment';
import chrono from 'chrono-node';

import Select from '../../src';

import { Link } from '../components';

const createOptionForDate = date => {
  const m = moment(date);
  return {
    value: date,
    label: m.calendar(null, {
      sameDay: '[Today] (Do MMM)',
      nextDay: '[Tomorrow] (Do MMM)',
      nextWeek: '[Next] dddd (Do MMM)',
      lastDay: '[Yesterday] (Do MMM)',
      lastWeek: '[Last] dddd (Do MMM)',
      sameElse: 'Do MMMM YYYY',
    }),
  };
};

const last28 = [];
for (let i = 2; i < 30; i++) {
  last28.push(`${i} days ago`);
}
const defaultOptions = ['tomorrow', 'today', 'yesterday']
  .concat(last28)
  .map(i => createOptionForDate(chrono.parseDate(i)));

class DatePicker extends Component<*, *> {
  state = {
    options: defaultOptions,
  };
  handleInputChange = value => {
    if (!value) {
      this.setState({ options: defaultOptions });
      return;
    }
    const date = chrono.parseDate(value);
    if (date) {
      this.setState({
        options: [createOptionForDate(date)],
      });
    } else {
      this.setState({
        options: [],
      });
    }
  };
  render() {
    const { value } = this.props;
    const { options } = this.state;
    return (
      <Select
        {...this.props}
        filterOption={null}
        onChange={this.props.onChange}
        onInputChange={this.handleInputChange}
        isMulti={false}
        options={options}
        value={value}
      />
    );
  }
}

export default class App extends Component<*, *> {
  state = {
    value: defaultOptions[1],
  };
  handleChange = (value: any) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    const displayValue = value && value.value ? value.value.toString() : 'null';
    return (
      <div>
        <h1>Labs</h1>
        <p>
          Don't try this at home... but if you do:{' '}
          <Link
            href="https://github.com/JedWatson/react-select/blob/v2/examples/pages/Experimental.js"
            target="_blank"
          >
            Source
          </Link>
        </p>

        <h2>Date Picker</h2>
        <div>
          <DatePicker autoFocus value={value} onChange={this.handleChange} />
        </div>
        <pre>Value: {displayValue}</pre>
      </div>
    );
  }
}
