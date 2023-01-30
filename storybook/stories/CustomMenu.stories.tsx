import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { components, MenuProps } from 'react-select';

import { Field } from '../components';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  GroupedOption,
  groupedOptions,
} from '../data';

export default {
  title: 'Select/CustomMenu',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomMenu() {
  return (
    <Field label="Custom Menu" htmlFor="custom-menu-id">
      <Select<ColourOption | FlavourOption, false, GroupedOption>
        inputId="custom-menu-id"
        defaultValue={colourOptions[1]}
        options={groupedOptions}
        components={{ Menu }}
      />
    </Field>
  );
}

// =============================================================================
// Components
// =============================================================================

function Menu(
  props: MenuProps<ColourOption | FlavourOption, false, GroupedOption>
) {
  const optionsLength = getLength(props.options);
  return (
    <React.Fragment>
      <div
        style={{
          padding: '8px 12px',
        }}
      >
        Custom Menu with {optionsLength} options
      </div>
      <components.Menu<ColourOption | FlavourOption, false, GroupedOption>
        {...props}
      >
        {props.children}
      </components.Menu>
    </React.Fragment>
  );
}

// =============================================================================
// Utils
// =============================================================================

function getLength(
  options: readonly (GroupedOption | ColourOption | FlavourOption)[]
): number {
  return options.reduce((acc, curr) => {
    if ('options' in curr) return acc + getLength(curr.options);
    return acc + 1;
  }, 0);
}
