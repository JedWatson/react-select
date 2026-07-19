import React from 'react';
import Select, { components, DummyInputProps } from 'react-select';
import { StateOption, stateOptions } from '../data';

const DummyInput = (props: DummyInputProps<StateOption, false>) => {
  return (
    <div
      style={{
        alignItems: 'center',
        border: '1px dashed #2684FF',
        borderRadius: 4,
        display: 'inline-flex',
        gap: 6,
        padding: '2px 6px',
      }}
    >
      <span style={{ color: '#2684FF', fontSize: 11, fontWeight: 600 }}>
        Custom Dummy Input
      </span>
      <components.DummyInput {...props} />
    </div>
  );
};

export default () => (
  <Select
    isSearchable={false}
    options={stateOptions}
    components={{ DummyInput }}
    placeholder="Select an option"
  />
);
