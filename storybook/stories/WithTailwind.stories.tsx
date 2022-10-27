import '../styles/tailwind.css';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components/field';
import { defaultArgs } from '../data';

export default {
  title: 'Select/WithTailwind',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({
  inputId = 'react-select',
  ...props
}) => {
  return (
    <Field htmlFor={inputId}>
      <Select
        inputId={inputId}
        {...props}
        // TODO
        styles={{
          valueContainer: (base, { hasValue }) => {
            return {
              ...base,
              backgroundColor: hasValue ? 'red' : 'blue',
            };
          },
        }}
        classNames={{
          valueContainer: ({ hasValue }) =>
            hasValue ? 'bg-green-200' : 'bg-blue-200',
        }}
      />
    </Field>
  );
};

export const WithTailwind = Template.bind({});
WithTailwind.args = {
  ...defaultArgs,
};
