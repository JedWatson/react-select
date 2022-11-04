import Tooltip from '@atlaskit/tooltip';
import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { components, ContainerProps, StylesConfig } from 'react-select';
import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/CustomSelectContainer',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomSelectContainer() {
  return (
    <Field label="Custom Select Container" htmlFor="custom-select-container-id">
      <Select
        inputId="custom-select-container-id"
        components={{ SelectContainer }}
        options={colourOptions}
        styles={styles}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption> = {
  container: (base) => ({
    ...base,
    backgroundColor: colourOptions[2].color,
    padding: 5,
  }),
};

// =============================================================================
// Components
// =============================================================================

function SelectContainer({ children, ...props }: ContainerProps<ColourOption>) {
  return (
    <Tooltip content={'customise your select container'} delay={0}>
      <components.SelectContainer {...props}>
        {children}
      </components.SelectContainer>
    </Tooltip>
  );
}
