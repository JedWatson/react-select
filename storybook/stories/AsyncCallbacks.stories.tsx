import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import AsyncSelect from 'react-select/async';

import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/AsyncCallbacks',
  component: AsyncSelect,
} as ComponentMeta<typeof AsyncSelect>;

export function AsyncCallbacks() {
  return (
    <Field label="Async Callbacks" htmlFor="async-callbacks-id">
      <AsyncSelect
        inputId="async-callbacks-id"
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
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

function loadOptions(
  inputValue: string,
  callback: (options: ColourOption[]) => void
) {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
}
