import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components';
import { flavourOptions } from '../data';

export default {
  title: 'Select/CustomIsOptionDisabled',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomIsOptionDisabled() {
  return (
    <Field
      label="Custom isOptionDisabled"
      secondaryLabel="Disable all options that do not have a 'safe' rating, via the isOptionsDisabled prop."
      htmlFor="custom-is-option-disabled-id"
    >
      <Select
        inputId="custom-is-option-disabled-id"
        defaultValue={flavourOptions[0]}
        isOptionDisabled={(option) => option.rating !== 'safe'}
        options={flavourOptions}
      />
    </Field>
  );
}
