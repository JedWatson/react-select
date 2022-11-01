import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, {
  components,
  PlaceholderProps,
  StylesConfig,
} from 'react-select';

import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/CustomPlaceholder',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomPlaceholder() {
  return (
    <Field label="Custom Placeholder" htmlFor="custom-placeholder-id">
      <Select
        inputId="custom-placeholder-id"
        components={{ Placeholder }}
        options={colourOptions}
        placeholder={'custom placeholder component'}
        styles={styles}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption> = {
  placeholder: (base) => ({
    ...base,
    fontSize: '1em',
    color: colourOptions[2].color,
    fontWeight: 400,
  }),
};

// =============================================================================
// Components
// =============================================================================

function Placeholder(props: PlaceholderProps<ColourOption>) {
  return <components.Placeholder {...props} />;
}
