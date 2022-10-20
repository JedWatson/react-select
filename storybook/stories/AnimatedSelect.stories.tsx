import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { colourOptions, defaultArgs } from '../data';

export default {
  title: 'Select/Animated',
  component: Select,
} as ComponentMeta<typeof Select>;

const animatedComponents = makeAnimated();

const Template: ComponentStory<typeof Select> = ({
  inputId = 'react-select',
  ...props
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui',
        gap: '0.5rem',
      }}
    >
      <label htmlFor={inputId} style={{ fontWeight: 500 }}>
        Select
      </label>
      <Select components={animatedComponents} inputId={inputId} {...props} />
    </div>
  );
};

export const Animated = Template.bind({});
Animated.args = {
  ...defaultArgs,
  defaultValue: [colourOptions[0], colourOptions[1], colourOptions[2]],
  isMulti: true,
};
