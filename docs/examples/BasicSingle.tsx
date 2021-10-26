import React, { Component, Fragment } from 'react';

import Select from 'react-select';
import { colourOptions } from '../data';

const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

interface State {
  readonly isClearable: boolean;
  readonly isDisabled: boolean;
  readonly isLoading: boolean;
  readonly isRtl: boolean;
  readonly isSearchable: boolean;
}

export default class SingleSelect extends Component<{}, State> {
  state: State = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };

  toggleClearable = () =>
    this.setState((state) => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState((state) => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState((state) => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState((state) => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState((state) => ({ isSearchable: !state.isSearchable }));

  render() {
    const {
      toggleClearable,
      toggleDisabled,
      toggleLoading,
      toggleRtl,
      toggleSearchable,
    } = this;

    const { isClearable, isSearchable, isDisabled, isLoading, isRtl } =
      this.state;

    return (
      <Fragment>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={colourOptions[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={colourOptions}
        />

        <div
          style={{
            color: 'hsl(0, 0%, 40%)',
            display: 'inline-block',
            fontSize: 12,
            fontStyle: 'italic',
            marginTop: '1em',
          }}
        >
          <Checkbox checked={isClearable} onChange={toggleClearable}>
            Clearable
          </Checkbox>
          <Checkbox checked={isSearchable} onChange={toggleSearchable}>
            Searchable
          </Checkbox>
          <Checkbox checked={isDisabled} onChange={toggleDisabled}>
            Disabled
          </Checkbox>
          <Checkbox checked={isLoading} onChange={toggleLoading}>
            Loading
          </Checkbox>
          <Checkbox checked={isRtl} onChange={toggleRtl}>
            RTL
          </Checkbox>
        </div>
      </Fragment>
    );
  }
}
