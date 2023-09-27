import '../styles/tailwind.css';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import classNames from 'classnames';
import * as React from 'react';
import Select from 'react-select';

import { Field } from '../components/field';
import { defaultArgs } from '../data';

export default {
  title: 'Select/UnstyledWithTailwind',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({
  inputId = 'react-select',
  ...props
}) => {
  return (
    <Field htmlFor={inputId} label="Unstyled With Tailwind">
      <Select
        inputId={inputId}
        {...props}
        unstyled // Remove all non-essential styles
        classNames={{
          clearIndicator: ({ isFocused }) =>
            classNames(
              isFocused ? 'text-neutral-600' : 'text-neutral-200',
              'p-2',
              isFocused ? 'hover:text-neutral-800' : 'hover:text-neutral-400'
            ),
          // container: () => classNames(),
          control: ({ isDisabled, isFocused }) =>
            classNames(
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
              isFocused ? 'hover:border-purple-800' : 'hover:border-neutral-300'
            ),
          dropdownIndicator: ({ isFocused }) =>
            classNames(
              isFocused ? 'text-neutral-600' : 'text-neutral-200',
              'p-2',
              isFocused ? 'hover:text-neutral-800' : 'hover:text-neutral-400'
            ),
          group: () => classNames('py-2'),
          groupHeading: () =>
            classNames(
              'text-neutral-400',
              'text-xs',
              'font-medium',
              'mb-1',
              'px-3',
              'uppercase'
            ),
          // indicatorsContainer: () => classNames(),
          indicatorSeparator: ({ isDisabled }) =>
            classNames(
              isDisabled ? 'bg-neutral-100' : 'bg-neutral-200',
              'my-2'
            ),
          input: () => classNames('m-0.5', 'py-0.5', 'text-neutral-800'),
          loadingIndicator: ({ isFocused }) =>
            classNames(
              isFocused ? 'text-neutral-600' : 'text-neutral-200',
              'p-2'
            ),
          loadingMessage: () => classNames('text-neutral-400', 'py-2', 'px-3'),
          menu: () =>
            classNames(
              'bg-white',
              'rounded',
              'shadow-[0_0_0_1px_rgba(0,0,0,0.1)]',
              'my-1'
            ),
          menuList: () => classNames('py-1'),
          // menuPortal: () => classNames(),
          multiValue: () => classNames('bg-neutral-100', 'rounded-sm', 'm-0.5'),
          multiValueLabel: () =>
            classNames(
              'rounded-sm',
              'text-neutral-800',
              'text-sm',
              'p-[3]',
              'pl-[6]'
            ),
          multiValueRemove: ({ isFocused }) =>
            classNames(
              'rounded-sm',
              isFocused && 'bg-red-500',
              'px-1',
              'hover:bg-red-500',
              'hover:text-red-800'
            ),
          noOptionsMessage: () =>
            classNames('text-neutral-400', 'py-2', 'px-3'),
          option: ({ isDisabled, isFocused, isSelected }) =>
            classNames(
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
          placeholder: () => classNames('text-neutral-500', 'mx-0.5'),
          singleValue: ({ isDisabled }) =>
            classNames(
              isDisabled ? 'text-neutral-400' : 'text-neutral-800',
              'mx-0.5'
            ),
          valueContainer: () => classNames('py-0.5', 'px-2'),
        }}
      />
    </Field>
  );
};

export const UnstyledWithTailwind = Template.bind({});
UnstyledWithTailwind.args = {
  ...defaultArgs,
};
