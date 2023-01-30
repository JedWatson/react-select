import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { components, DropdownIndicatorProps } from 'react-select';

import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/CustomDropdownIndicator',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomDropdownIndicator() {
  return (
    <Field label="Custom Menu List" htmlFor="custom-menu-list-id">
      <Select
        inputId="custom-menu-list-id"
        components={{ DropdownIndicator }}
        options={colourOptions}
      />
    </Field>
  );
}

// =============================================================================
// Components
// =============================================================================

function DropdownIndicator(props: DropdownIndicatorProps<ColourOption, true>) {
  return (
    <components.DropdownIndicator {...props}>
      <EmojiIcon label="Emoji" primaryColor={colourOptions[2].color} />
    </components.DropdownIndicator>
  );
}
