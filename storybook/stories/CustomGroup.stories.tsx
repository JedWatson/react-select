import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { components, GroupProps } from 'react-select';

import { Field } from '../components';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  groupedOptions,
} from '../data';

export default {
  title: 'Select/CustomGroup',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomGroup() {
  return (
    <Field label="Custom Group" htmlFor="custom-group-id">
      <Select<ColourOption | FlavourOption>
        inputId="custom-group-id"
        defaultValue={colourOptions[1]}
        options={groupedOptions}
        components={{ Group }}
      />
    </Field>
  );
}

// =============================================================================
// Components
// =============================================================================

function Group(props: GroupProps<ColourOption | FlavourOption, false>) {
  return (
    <div
      style={{
        border: `2px dotted ${colourOptions[2].color}`,
        borderRadius: '5px',
        background: '#f2fcff',
      }}
    >
      <components.Group {...props} />
    </div>
  );
}
