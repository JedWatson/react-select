import '../styles/tailwind.css';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import classNames from 'classnames';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components/field';
import { defaultArgs } from '../data';

export default {
  title: 'Select/ClassNamesWithTailwind',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

// This ensures that Emotion's styles are inserted before Tailwind's styles so that Tailwind classes have precedence over Emotion
const EmotionCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = React.useMemo(
    () =>
      createCache({
        key: 'with-tailwind',
        insertionPoint: document.querySelector('title')!,
      }),
    []
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

const Template: ComponentStory<typeof Select> = ({
  inputId = 'react-select',
  ...props
}) => {
  return (
    <EmotionCacheProvider>
      <Field htmlFor={inputId} label="ClassNames With Tailwind">
        <Select
          inputId={inputId}
          {...props}
          classNames={{
            control: ({ isDisabled, isFocused }) =>
              classNames(
                !isDisabled && isFocused && 'border-purple-800',
                isFocused && 'shadow-[0_0_0_1px] shadow-purple-800',
                isFocused && 'hover:border-purple-800'
              ),
            option: ({ isDisabled, isFocused, isSelected }) =>
              classNames(
                isSelected && 'bg-purple-800',
                !isSelected && isFocused && 'bg-purple-300',
                !isDisabled && isSelected && 'active:bg-purple-800',
                !isDisabled && !isSelected && 'active:bg-purple-500'
              ),
          }}
        />
      </Field>
    </EmotionCacheProvider>
  );
};

export const ClassNamesWithTailwind = Template.bind({});
ClassNamesWithTailwind.args = {
  ...defaultArgs,
};
