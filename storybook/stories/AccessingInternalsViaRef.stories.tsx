import Button from '@atlaskit/button/standard-button';
import type { ComponentMeta } from '@storybook/react';
import React, { useRef } from 'react';
import Select, { SelectInstance } from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';

import { Field, Inline, Stack } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/AccessingInternalsViaRef',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function AccessingInternalsViaRef() {
  const selectRef = useRef<SelectInstance<ColourOption> | null>(null);
  const asyncRef = useRef<SelectInstance<ColourOption> | null>(null);
  const creatableRef = useRef<SelectInstance<ColourOption> | null>(null);

  // Focus handlers
  const focus = () => {
    selectRef.current?.focus();
  };
  const focusAsync = () => {
    asyncRef.current?.focus();
  };
  const focusCreatable = () => {
    creatableRef.current?.focus();
  };

  // Blur handlers
  const blur = () => {
    selectRef.current?.blur();
  };
  const blurAsync = () => {
    asyncRef.current?.blur();
  };
  const blurCreatable = () => {
    creatableRef.current?.blur();
  };

  return (
    <Stack gap="large">
      <Stack>
        <Field label="Select" htmlFor="select-id">
          <Select ref={selectRef} inputId="select-id" options={colourOptions} />
        </Field>
        <Inline>
          <Button onClick={focus}>Focus</Button>
          <Button onClick={blur}>Blur</Button>
        </Inline>
      </Stack>

      {/* Async Select */}
      <Stack>
        <Field label="Async Select" htmlFor="async-select-id">
          <AsyncSelect
            ref={asyncRef}
            inputId="async-select-id"
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
          />
        </Field>
        <Inline>
          <Button onClick={focusAsync}>Focus</Button>
          <Button onClick={blurAsync}>Blur</Button>
        </Inline>
      </Stack>

      {/* Creatable */}
      <Stack>
        <Field label="Creatable Select" htmlFor="creatable-select-id">
          <CreatableSelect
            ref={creatableRef}
            inputId="creatable-select-id"
            isClearable
            options={colourOptions}
          />
        </Field>
        <Inline>
          <Button onClick={focusCreatable}>Focus</Button>
          <Button onClick={blurCreatable}>Blur</Button>
        </Inline>
      </Stack>
    </Stack>
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
