import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { StylesConfig } from 'react-select';
import { Field } from '../components';

import { colourOptions, StateOption } from '../data';

export default {
  title: 'Select/MenuBuffer',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function MenuBuffer() {
  return (
    <Field
      label="Menu Buffer"
      secondaryLabel="Using the style API to replace `menuBuffer`"
      htmlFor="menu-buffer-id"
    >
      <Select
        defaultValue={colourOptions[0]}
        options={colourOptions}
        styles={selectStyles}
      />
    </Field>
  );
}

const selectStyles: StylesConfig<StateOption, false> = {
  menu: (base) => ({ ...base, marginBottom: 76 }),
};
