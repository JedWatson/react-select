import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components';
import { colourOptions, defaultArgs } from '../data';

export default {
  title: 'Select/BasicMulti',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({
  inputId = 'react-select',
  ...props
}) => {
  return (
    <Field htmlFor={inputId} label="Basic Multi Select">
      <Select inputId={inputId} {...props} />
    </Field>
  );
};

export const BasicMulti = Template.bind({});
BasicMulti.args = {
  ...defaultArgs,
  defaultValue: [colourOptions[0], colourOptions[1], colourOptions[2]],
  isMulti: true,
};
