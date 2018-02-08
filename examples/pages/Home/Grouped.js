import React from 'react';
import { withValue } from 'react-value';
import Select from '../../../src';
import { colourOptions, groupedOptions } from '../../data';

const SelectWithValue = withValue(Select);


const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);


export default () => (
  <SelectWithValue defaultValue={colourOptions[1]} options={groupedOptions} formatGroupLabel={formatGroupLabel} />
);
