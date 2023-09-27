import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  GroupedOption,
  groupedOptions,
} from '../data';

export default {
  title: 'Select/BasicGrouped',
  component: Select,
} as ComponentMeta<typeof Select>;

export function BasicGrouped() {
  return (
    <Field label="Basic Grouped" htmlFor="basic-grouped-id">
      <Select<ColourOption | FlavourOption, false, GroupedOption>
        inputId="basic-grouped-id"
        defaultValue={colourOptions[1]}
        options={groupedOptions}
        formatGroupLabel={FormatGroupLabel}
      />
    </Field>
  );
}

function FormatGroupLabel({ label, options }: GroupedOption) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span>{label}</span>
      <span
        style={{
          backgroundColor: colourOptions[2].color,
          borderRadius: '2em',
          color: '#fff',
          display: 'inline-block',
          fontSize: 12,
          fontWeight: 'normal',
          lineHeight: '1',
          minWidth: 1,
          padding: '0.16666666666667em 0.5em',
          textAlign: 'center',
        }}
      >
        {options.length}
      </span>
    </div>
  );
}
