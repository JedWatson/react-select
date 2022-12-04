import { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';
import { Field } from '../components';

import { colourOptions } from '../data';

export default {
  title: 'Select/CustomFilterOptions',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomFilterOptions() {
  return (
    <Field label="Custom Filter Options" htmlFor="custom-filter-options-id">
      <Select
        inputId="custom-filter-options-id"
        defaultValue={customOptions[0]}
        options={customOptions}
        filterOption={filterOptions}
      />
    </Field>
  );
}

const filterOptions = (
  candidate: { label: string; value: string },
  input: string
) => {
  if (input) {
    return candidate.value === customOptions[0].value;
  }
  return true;
};

const customOptions = [
  {
    value: 'custom',
    label: 'Using a custom filter to always display this option on search',
  },
  ...colourOptions,
];
