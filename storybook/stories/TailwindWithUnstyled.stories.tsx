import '../styles/tailwind.css';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import classnames from 'classnames';
import * as React from 'react';
import Select from 'react-select';

import { Field, Stack } from '../components';
import { defaultArgs } from '../data';

export default {
  title: 'Select/TailwindWithUnstyled',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({
  inputId = 'react-select',
  ...props
}) => {
  return (
    <Stack>
      <p>
        Example of how you can customise React Select using Tailwind using the{' '}
        <code>unstyled</code> API to remove all base presentational styles.
      </p>
      <Field htmlFor={inputId} label="Tailwind with unstyled">
        <Select
          inputId={inputId}
          {...props}
          unstyled // Remove all non-essential styles
          classNames={{
            clearIndicator: ({ isFocused }) =>
              classnames(
                isFocused ? 'text-neutral-600' : 'text-neutral-200',
                'p-2',
                isFocused ? 'hover:text-neutral-800' : 'hover:text-neutral-400'
              ),
            // container: () => classNames(),
            control: ({ isDisabled, isFocused }) =>
              classnames(
                isDisabled ? 'bg-neutral-50' : 'bg-white',
                isDisabled
                  ? 'border-neutral-100'
                  : isFocused
                  ? 'border-purple-800'
                  : 'border-neutral-200',
                'rounded',
                'border-solid',
                'border',
                isFocused && 'shadow-[0_0_0_1px] shadow-purple-800',
                isFocused
                  ? 'hover:border-purple-800'
                  : 'hover:border-neutral-300'
              ),
            dropdownIndicator: ({ isFocused }) =>
              classnames(
                isFocused ? 'text-neutral-600' : 'text-neutral-200',
                'p-2',
                isFocused ? 'hover:text-neutral-800' : 'hover:text-neutral-400'
              ),
            group: () => classnames('py-2'),
            groupHeading: () =>
              classnames(
                'text-neutral-400',
                'text-xs',
                'font-medium',
                'mb-1',
                'px-3',
                'uppercase'
              ),
            // indicatorsContainer: () => classNames(),
            indicatorSeparator: ({ isDisabled }) =>
              classnames(
                isDisabled ? 'bg-neutral-100' : 'bg-neutral-200',
                'my-2'
              ),
            input: () => classnames('m-0.5', 'py-0.5', 'text-neutral-800'),
            loadingIndicator: ({ isFocused }) =>
              classnames(
                isFocused ? 'text-neutral-600' : 'text-neutral-200',
                'p-2'
              ),
            loadingMessage: () =>
              classnames('text-neutral-400', 'py-2', 'px-3'),
            menu: () =>
              classnames(
                'bg-white',
                'rounded',
                'shadow-[0_0_0_1px_rgba(0,0,0,0.1)]',
                'my-1'
              ),
            menuList: () => classnames('py-1'),
            // menuPortal: () => classNames(),
            multiValue: () =>
              classnames('bg-neutral-100', 'rounded-sm', 'm-0.5'),
            multiValueLabel: () =>
              classnames(
                'rounded-sm',
                'text-neutral-800',
                'text-sm',
                'p-[3]',
                'pl-[6]'
              ),
            multiValueRemove: ({ isFocused }) =>
              classnames(
                'rounded-sm',
                isFocused && 'bg-red-500',
                'px-1',
                'hover:bg-red-500',
                'hover:text-red-800'
              ),
            noOptionsMessage: () =>
              classnames('text-neutral-400', 'py-2', 'px-3'),
            option: ({ isDisabled, isFocused, isSelected }) =>
              classnames(
                isSelected
                  ? 'bg-purple-800'
                  : isFocused
                  ? 'bg-purple-300'
                  : 'bg-transparent',
                isDisabled
                  ? 'text-neutral-200'
                  : isSelected
                  ? 'text-white'
                  : 'text-inherit',
                'py-2',
                'px-3',
                !isDisabled &&
                  (isSelected ? 'active:bg-purple-800' : 'active:bg-purple-500')
              ),
            placeholder: () => classnames('text-neutral-500', 'mx-0.5'),
            singleValue: ({ isDisabled }) =>
              classnames(
                isDisabled ? 'text-neutral-400' : 'text-neutral-800',
                'mx-0.5'
              ),
            valueContainer: () => classnames('py-0.5', 'px-2'),
          }}
        />
      </Field>
    </Stack>
  );
};

export const TailwindWithUnstyled = Template.bind({});
TailwindWithUnstyled.args = {
  ...defaultArgs,
};
