import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Select, {
  components,
  MultiValueGenericProps,
  StylesConfig,
} from 'react-select';

import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/CustomMultiValueContainer',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomMultiValueContainer() {
  return (
    <Field
      label="CustomMultiValueContainer"
      htmlFor="custom-multi-value-container-id"
    >
      <Select
        inputId="custom-multi-value-container-id"
        closeMenuOnSelect={false}
        components={{ MultiValueContainer }}
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
  multiValue: (base) => ({
    ...base,
    border: `2px dotted ${colourOptions[2].color}`,
  }),
};

// =============================================================================
// Components
// =============================================================================

function MultiValueContainer(props: MultiValueGenericProps<ColourOption>) {
  return (
    <Tooltip content="Customise your multi-value container!">
      <components.MultiValueContainer {...props} />
    </Tooltip>
  );
}
