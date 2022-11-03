import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components';
import { flavourOptions } from '../data';

export default {
  title: 'Select/CustomGetOptionLabel',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomGetOptionLabel() {
  return (
    <Field
      label="Custom Get Option Label"
      secondaryLabel="Composing a display label from the label property and rating property in the options object."
      htmlFor="custom-get-option-label-id"
    >
      <Select
        inputId="custom-get-option-label-id"
        options={flavourOptions}
        getOptionLabel={(option) => `${option.label}: ${option.rating}`}
      />
    </Field>
  );
}
