import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { IndicatorSeparatorProps } from 'react-select';

import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/CustomIndicatorSeparator',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomIndicatorSeparator() {
  return (
    <Field
      label="Custom Indicator Separator"
      htmlFor="custom-indicator-separator-id"
    >
      <Select
        inputId="custom-indicator-separator-id"
        components={{ IndicatorSeparator }}
        defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={colourOptions}
      />
    </Field>
  );
}

// =============================================================================
// Components
// =============================================================================

function IndicatorSeparator({
  innerProps,
}: IndicatorSeparatorProps<ColourOption, true>) {
  return (
    <span
      style={{
        alignSelf: 'stretch',
        backgroundColor: colourOptions[2].color,
        marginBottom: 8,
        marginTop: 8,
        width: 2,
      }}
      {...innerProps}
    />
  );
}
