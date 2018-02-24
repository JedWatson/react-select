import React, { Component } from 'react';
import Select from '../../../src';
import { colourOptions } from '../../data';
import { Note } from '../../components';

const Checkbox = props => <input type="checkbox" {...props} />;

type State = {
  isClearable: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  isRtl: boolean,
  isSearchable: boolean,
};

export default class SingleSelect extends Component<*, State> {
  state = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };

  toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }));
  render() {
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = this.state;
    return (
      <div>
        <Select
          autoFocus
          defaultValue={colourOptions[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={colourOptions}
        />
        <Note Tag="label">
          <Checkbox checked={isClearable} onChange={this.toggleClearable} />
          Clearable
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <Checkbox checked={isSearchable} onChange={this.toggleSearchable} />
          Searchable
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <Checkbox checked={isDisabled} onChange={this.toggleDisabled} />
          Disabled
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <Checkbox checked={isLoading} onChange={this.toggleLoading} />
          Loading
        </Note>
        <Note Tag="label" style={{ marginLeft: '1em' }}>
          <Checkbox type="checkbox" checked={isRtl} onChange={this.toggleRtl} />
          RTL
        </Note>
      </div>
    );
  }
}
