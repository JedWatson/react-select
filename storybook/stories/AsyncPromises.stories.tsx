import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import AsyncSelect from 'react-select/async';

import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/AsyncPromises',
  component: AsyncSelect,
  argTypes: {},
} as ComponentMeta<typeof AsyncSelect>;

export function AsyncPromises() {
  return (
    <Field label="Async Promises" htmlFor="async-promises">
      <AsyncSelect
        inputId="async-promises"
        cacheOptions
        defaultOptions
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
