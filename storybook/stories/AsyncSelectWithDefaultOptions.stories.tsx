import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import AsyncSelect from 'react-select/async';
import { Field } from '../components';

import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/AsyncSelectWithDefaultOptions',
  component: AsyncSelect,
  argTypes: {},
} as ComponentMeta<typeof AsyncSelect>;

export function AsyncSelectWithDefaultOptions() {
  return (
    <Field
      label="Async Select With Default Options"
      htmlFor="async-select-with-default-options-id"
    >
      <AsyncSelect
        inputId="async-select-with-default-options-id"
        cacheOptions={false}
        defaultOptions={colourOptions}
        loadOptions={promiseOptions}
      />
    </Field>
  );
}

// =============================================================================
// Utils
// =============================================================================

function filterColors(inputValue: string) {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
}

function promiseOptions(inputValue: string) {
  return new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });
}
