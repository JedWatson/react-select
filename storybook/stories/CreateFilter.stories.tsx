import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { createFilter } from 'react-select';
import { Field, Inline, Stack } from '../components';
import { colourOptions } from '../data';

export default {
  title: 'Select/CreateFilter',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CreateFilter() {
  const [ignoreCase, setIgnoreCase] = React.useState(true);
  const [ignoreAccents, setIgnoreAccents] = React.useState(true);
  const [trim, setTrim] = React.useState(true);
  const [matchFromStart, setMatchFromStart] = React.useState(false);

  const filterConfig = {
    ignoreCase,
    ignoreAccents,
    trim,
    matchFrom: matchFromStart ? ('start' as const) : ('any' as const),
  };

  const options = React.useMemo(() => {
    return [
      {
        id: 'ignore-case',
        label: 'Ignore Case',
        checked: ignoreCase,
        onChange: () => setIgnoreCase((prev) => !prev),
      },
      {
        id: 'ignore-accents',
        label: 'Ignore Accents',
        checked: ignoreAccents,
        onChange: () => setIgnoreAccents((prev) => !prev),
      },
      {
        id: 'trim',
        label: 'Trim',
        checked: trim,
        onChange: () => setTrim((prev) => !prev),
      },
      {
        id: 'match-from-start',
        label: 'Match From Start',
        checked: matchFromStart,
        onChange: () => setMatchFromStart((prev) => !prev),
      },
    ];
  }, [ignoreAccents, ignoreCase, matchFromStart, trim]);

  return (
    <Stack>
      <Field label="Create Filter" htmlFor="create-filter-id">
        <Select
          inputId="create-filter-id"
          defaultValue={colourOptions[0]}
          options={colourOptions}
          filterOption={createFilter(filterConfig)}
        />
      </Field>
      <Inline gap="medium">
        {options.map((option) => (
          <Inline key={option.id}>
            <input
              type="checkbox"
              id={option.id}
              checked={option.checked}
              onChange={option.onChange}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </Inline>
        ))}
      </Inline>
    </Stack>
  );
}
