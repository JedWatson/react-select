import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { InputActionMeta } from 'react-select';

import { Field } from '../components';
import { colourOptions } from '../data';

export default {
  title: 'Select/OnSelectKeepsInput',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function OnSelectKeepsInput() {
  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>();

  function handleInputChange(
    inputValue: string,
    { action, prevInputValue }: InputActionMeta
  ) {
    if (action === 'input-change') return inputValue;
    if (action === 'menu-close') {
      if (prevInputValue) {
        setMenuIsOpen(true);
      } else {
        setMenuIsOpen(undefined);
      }
    }
    return prevInputValue;
  }

  return (
    <Field
      htmlFor="on-select-keeps-input"
      label="On Select Keeps Input"
      secondaryLabel="In this example, if you type in the input and then select an option, your search query will not be cleared."
    >
      <Select
        inputId="on-select-keeps-input"
        isMulti
        defaultValue={colourOptions[0]}
        isClearable
        isSearchable
        onInputChange={handleInputChange}
        name="color"
        options={colourOptions}
        menuIsOpen={menuIsOpen}
      />
    </Field>
  );
}
