import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components';
import { flavourOptions } from '../data';

export default {
  title: 'Select/Theme',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function Theme() {
  return (
    <Field label="Themed Select" htmlFor="themed-select-id">
      <Select
        inputId="themed-select-id"
        defaultValue={flavourOptions[2]}
        options={flavourOptions}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'hotpink',
            primary: 'black',
          },
        })}
      />
    </Field>
  );
}
