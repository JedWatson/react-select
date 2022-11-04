import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { components, MenuListProps } from 'react-select';

import { Field } from '../components';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  GroupedOption,
  groupedOptions,
} from '../data';

export default {
  title: 'Select/CustomMenuList',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomMenuList() {
  return (
    <Field label="Custom Menu List" htmlFor="custom-menu-list-id">
      <Select<ColourOption | FlavourOption, false, GroupedOption>
        inputId="custom-menu-list-id"
        defaultValue={colourOptions[1]}
        options={groupedOptions}
        components={{ MenuList }}
      />
    </Field>
  );
}

// =============================================================================
// Components
// =============================================================================

function MenuList(
  props: MenuListProps<ColourOption | FlavourOption, false, GroupedOption>
) {
  return (
    <components.MenuList {...props}>
      <div
        style={{
          background: colourOptions[2].color,
          color: 'white',
          padding: '8px 12px',
        }}
      >
        Custom Menu List
      </div>
      {props.children}
    </components.MenuList>
  );
}
