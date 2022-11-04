import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { components, IndicatorsContainerProps } from 'react-select';

import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/CustomIndicatorsContainer',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomIndicatorsContainer() {
  return (
    <Field
      label="Custom Indicators Container"
      htmlFor="custom-indicators-container-id"
    >
      <Select
        inputId="custom-indicators-container-id"
        closeMenuOnSelect={false}
        components={{ IndicatorsContainer, IndicatorSeparator: null }}
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

function IndicatorsContainer(
  props: IndicatorsContainerProps<ColourOption, true>
) {
  return (
    <div style={{ background: colourOptions[2].color }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
}
