import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import CreatableSelect from 'react-select/creatable';
import { Field } from '../components';

export default {
  title: 'Select/CreatableInputOnly',
  component: CreatableSelect,
} as ComponentMeta<typeof CreatableSelect>;

export function CreatableInputOnly() {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState<readonly Option[]>([]);

  function handleKeyDown(event: React.KeyboardEvent<Element>) {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, { label: inputValue, value: inputValue }]);
        setInputValue('');
        event.preventDefault();
    }
  }

  return (
    <Field label="Creatable Input Only" htmlFor="creatable-input-only-id">
      <CreatableSelect
        inputId="creatable-input-only-id"
        components={{ DropdownIndicator: null }}
        inputValue={inputValue}
        isMulti
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="Type something and press enter..."
        value={value}
      />
    </Field>
  );
}

interface Option {
  readonly label: string;
  readonly value: string;
}
