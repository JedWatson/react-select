import '../styles/tailwind.css';

import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { SelectInstance } from 'react-select';

import { Field, Inline, Stack } from '../components';
import { colourOptions } from '../data';

export default {
  title: 'Select/ControlledMenu',
  component: Select,
} as ComponentMeta<typeof Select>;

export function ControlledMenu() {
  const inputRef = React.useRef<SelectInstance>(null);
  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false);

  function toggleMenuIsOpen() {
    setMenuIsOpen((value) => !value);
    const selectEl = inputRef.current;
    if (!selectEl) return;
    if (menuIsOpen) selectEl.blur();
    else selectEl.focus();
  }

  return (
    <Stack>
      <Inline>
        <input
          id="menu-toggle"
          type="checkbox"
          checked={menuIsOpen}
          onChange={toggleMenuIsOpen}
        />
        <label htmlFor="menu-toggle">Click to toggle menu</label>
      </Inline>
      <Field label="Controlled Menu" htmlFor="controlled-menu-id">
        <Select
          inputId="controlled-menu-id"
          ref={inputRef}
          defaultValue={colourOptions[0]}
          menuIsOpen={menuIsOpen}
          options={colourOptions}
          styles={{ menu: (base) => ({ ...base, position: 'relative' }) }}
        />
      </Field>
    </Stack>
  );
}
