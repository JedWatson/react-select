import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import CreatableSelect from 'react-select/creatable';

import { Field } from '../components';
import { NumberOption, numbers } from '../data';

export default {
  title: 'Select/CreatableAdvanced',
  component: CreatableSelect,
} as ComponentMeta<typeof CreatableSelect>;

export function CreatableAdvanced() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [options, setOptions] = React.useState(numbers);
  const [value, setValue] = React.useState<NumberOption | null>(null);

  function handleCreate(inputValue: string) {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = {
        label: inputValue,
        value: slugify(inputValue),
      };
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  }

  return (
    <Field label="Creatable Advanced" htmlFor="creatable-advanced-id">
      <CreatableSelect
        inputId="creatable-advanced-id"
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => setValue(newValue)}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
    </Field>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
