import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { Field } from '../components/field';
import { colourOptions, defaultArgs } from '../data';

export default {
  title: 'Select/AnimatedMulti',
  component: Select,
} as ComponentMeta<typeof Select>;

const animatedComponents = makeAnimated();

const Template: ComponentStory<typeof Select> = ({
  inputId = 'react-select',
  ...props
}) => {
  return (
    <Field
      htmlFor={inputId}
      label="Animated Multi Select"
      secondaryLabel="Removing an item from this list will trigger an exit animation."
    >
      <Select components={animatedComponents} inputId={inputId} {...props} />
    </Field>
  );
};

export const AnimatedMulti = Template.bind({});
AnimatedMulti.args = {
  ...defaultArgs,
  defaultValue: [colourOptions[0], colourOptions[1], colourOptions[2]],
  isMulti: true,
};
