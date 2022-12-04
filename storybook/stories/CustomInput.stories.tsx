import Tooltip from '@atlaskit/tooltip';
import { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { components, InputProps } from 'react-select';

import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/CustomInput',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomInput() {
  return (
    <Field label="Custom Input" htmlFor="custom-input-id">
      <Select
        inputId="custom-input-id"
        components={{ Input }}
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

function Input(props: InputProps<ColourOption, true>) {
  const component = <components.Input {...props} />;
  if (props.isHidden) return component;
  return (
    <div style={{ border: `1px dotted ${colourOptions[2].color}` }}>
      <Tooltip content="Custom Input" position="top">
        {component}
      </Tooltip>
    </div>
  );
}
