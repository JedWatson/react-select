import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import Select from 'react-select';

import { defaultArgs } from '../data';

/**
 * More on default export:
 * @see https://storybook.js.org/docs/react/writing-stories/introduction#default-export
 */
export default {
  title: 'Select/Basic',
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
      <Select inputId={inputId} {...props} />
    </div>
  );
};

export const Basic = Template.bind({});
/**
 * More on args:
 * @see https://storybook.js.org/docs/react/writing-stories/args
 */
Basic.args = {
  ...defaultArgs,
};
