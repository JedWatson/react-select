import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components/field';
import { defaultArgs } from '../data';

/**
 * More on default export:
 * @see https://storybook.js.org/docs/react/writing-stories/introduction#default-export
 */
export default {
  title: 'Select/BasicSingle',
  component: Select,
  /**
   * More on argTypes:
   * @see https://storybook.js.org/docs/react/api/argtypes
   */
  argTypes: {},
} as ComponentMeta<typeof Select>;

/**
 * More on component templates:
 * @see https://storybook.js.org/docs/react/writing-stories/introduction#using-args
 */
const Template: ComponentStory<typeof Select> = ({
  inputId = 'react-select',
  ...props
}) => {
  return (
    <Field htmlFor={inputId}>
      <Select inputId={inputId} {...props} />
    </Field>
  );
};

export const BasicSingle = Template.bind({});
/**
 * More on args:
 * @see https://storybook.js.org/docs/react/writing-stories/args
 */
BasicSingle.args = {
  ...defaultArgs,
};
