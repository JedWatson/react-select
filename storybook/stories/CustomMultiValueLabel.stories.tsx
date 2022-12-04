import Tooltip from '@atlaskit/tooltip';
import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, {
  components,
  MultiValueGenericProps,
  StylesConfig,
} from 'react-select';

import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/CustomMultiValueLabel',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomMultiValueLabel() {
  return (
    <Field
      label="Custom Multi Value Remove"
      htmlFor="custom-multi-value-remove-id"
    >
      <Select
        inputId="custom-multi-value-remove-id"
        components={{ MultiValueLabel }}
        defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
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
  multiValueLabel: (base) => ({
    ...base,
    backgroundColor: colourOptions[2].color,
    color: 'white',
  }),
};

// =============================================================================
// Components
// =============================================================================

function MultiValueLabel(props: MultiValueGenericProps<ColourOption>) {
  return (
    <Tooltip content="Customise your multi-value label component!">
      <components.MultiValueLabel {...props} />
    </Tooltip>
  );
}
