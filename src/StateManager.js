// @flow

import React, { Component } from 'react';

import Select from './Select';
import { type OptionType } from './types';

type Props = {
  inputValue?: string,
  menuIsOpen?: boolean,
  value?: OptionType,
};
type State = {
  inputValue: string,
  menuIsOpen: boolean,
  value: OptionType | null,
};

export default class StateManager extends Component<Props, State> {
  state = {
    inputValue: this.props.inputValue || '',
    menuIsOpen: this.props.menuIsOpen || false,
    value: this.props.value || null,
  };
  getSelectProp(key: string) {
    return this.props[key] !== undefined ? this.props[key] : this.state[key];
  }
  callProp(name: string, ...args: any) {
    if (typeof this.props[name] === 'function') {
      return this.props[name](...args);
    }
  }
  onChange = (value: any) => {
    this.callProp('onChange', value);
    this.setState({ value });
  };
  onInputChange = (inputValue: any) => {
    // TODO: for backwards compatibility, we allow the prop to return a new
    // value, but now inputValue is a controllable prop we probably shouldn't
    const newValue = this.callProp('onInputChange', inputValue);
    this.setState({
      inputValue: newValue !== undefined ? newValue : inputValue,
    });
  };
  onMenuOpen = () => {
    this.callProp('onMenuOpen');
    this.setState({ menuIsOpen: true });
  };
  onMenuClose = () => {
    this.callProp('onMenuClose');
    this.setState({ menuIsOpen: false });
  };
  render() {
    const inputValue = this.getSelectProp('inputValue');
    const menuIsOpen = this.getSelectProp('menuIsOpen');
    const value = this.getSelectProp('value');
    return (
      <Select
        {...this.props}
        inputValue={inputValue}
        menuIsOpen={menuIsOpen}
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        onMenuClose={this.onMenuClose}
        onMenuOpen={this.onMenuOpen}
        value={value}
      />
    );
  }
}
