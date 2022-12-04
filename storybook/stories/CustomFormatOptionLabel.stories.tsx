import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';
import { Field } from '../components';

import { colourOptions } from '../data';

export default {
  title: 'Select/CustomFormatOptionLabel',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomFormatOptionLabel() {
  return (
    <Field
      label="Custom Format Option Label"
      htmlFor="custom-format-option-label-id"
    >
      <Select
        inputId="custom-format-option-label-id"
        defaultValue={colourOptions[2]}
        options={colourOptions}
        formatOptionLabel={formatOptionLabel}
      />
    </Field>
  );
}

function formatOptionLabel(option: typeof colourOptions[number]) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      <div
        style={{
          backgroundColor: option.color,
          borderRadius: 9999,
          height: 8,
          width: 8,
        }}
      />
      <div>{option.label}</div>
    </div>
  );
}
