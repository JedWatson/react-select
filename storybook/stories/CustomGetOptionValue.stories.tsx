import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components';
import { dogOptions } from '../data';

export default {
  title: 'Select/CustomGetOptionValue',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomGetOptionValue() {
  return (
    <Field
      label="Custom Get Option Value"
      secondaryLabel="Using id property, instead of value property."
      htmlFor="custom-get-option-value-id"
    >
      <Select
        inputId="custom-get-option-value-id"
        options={dogOptions}
        getOptionValue={(option) => `${option['id']}`}
      />
    </Field>
  );
}
