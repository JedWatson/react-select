import '../styles/tailwind.css';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import classnames from 'classnames';
import * as React from 'react';
import type {
  GroupBase,
  OptionProps,
  ValueContainerProps,
  DropdownIndicatorProps,
  ClassNamesConfig,
} from 'react-select';
import Select, { components } from 'react-select';
import { omit } from 'remeda';

import { Field, Stack } from '../components';
import type { PersonOption } from '../data';
import { defaultArgs, people } from '../data';

export default {
  title: 'Select/TailwindWithCustomComponents',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({
  inputId = 'react-select',
  ...props
}) => {
  const [value, setValue] = React.useState<PersonOption | null>(people[0]);

  return (
    <Stack>
      <p>
        Example of how you can customise React Select using Tailwind and custom
        inner components.
      </p>
      <Field htmlFor={inputId} label="Assigned to">
        {/* @ts-ignore */}
        <Select<PersonOption>
          {...props}
          inputId={inputId}
          classNamePrefix="react-select"
          classNames={classNames}
          components={{
            DropdownIndicator,
            Option,
            ValueContainer,
          }}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => String(option.id)}
          onChange={(newValue) => setValue(newValue)}
          options={people}
          unstyled
          isClearable={false}
          value={value}
        />
      </Field>
      {value && !value.online ? (
        <p className="text-gray-700">User {value.name} is currently offline.</p>
      ) : undefined}
    </Stack>
  );
};

export const TailwindWithCustomComponents = Template.bind({});
TailwindWithCustomComponents.args = {
  ...omit(defaultArgs, ['defaultValue', 'isClearable', 'isMulti', 'options']),
};

// =============================================================================
// Styles
// =============================================================================

const classNames: ClassNamesConfig<PersonOption, false> = {
  container({ isFocused }) {
    return classnames(
      'relative cursor-default rounded-md border bg-white px-3 text-left shadow-sm sm:text-sm',
      isFocused
        ? 'border-indigo-500 outline-none ring-1 ring-indigo-500'
        : 'border-gray-300'
    );
  },
  menu() {
    return 'z-10 left-0 right-0 mt-2 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm';
  },
  option({ isFocused }) {
    return classnames(
      'px-3 py-2',
      isFocused ? 'bg-indigo-600 text-white' : 'text-gray-900'
    );
  },
};

// =============================================================================
// Components
// =============================================================================

function ValueContainer<
  IsMulti extends boolean = false,
  Group extends GroupBase<PersonOption> = GroupBase<PersonOption>
>({ children, ...props }: ValueContainerProps<PersonOption, IsMulti, Group>) {
  const { value, isMulti } = props.selectProps;
  // @ts-expect-error selectProps can't infer `online` here.
  const online: boolean = value?.online;

  return (
    <components.ValueContainer {...props}>
      <span className="flex flex-1 items-center gap-2 text-left">
        {isMulti ? null : <StatusCircle online={online} />}
        <span className="flex w-full items-center">{children}</span>
      </span>
    </components.ValueContainer>
  );
}

function Option<
  IsMulti extends boolean = false,
  Group extends GroupBase<PersonOption> = GroupBase<PersonOption>
>({ children, ...props }: OptionProps<PersonOption, IsMulti, Group>) {
  return (
    <components.Option {...props}>
      <span className="flex flex-1 items-center gap-2 text-left">
        <StatusCircle online={Boolean(props.data?.online)} />
        <span className="flex w-full items-center">{children}</span>
        {/* @ts-expect-error selectProps can't infer `value` here. */}
        {props.selectProps.value?.id === props.data.id && (
          // Check icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </components.Option>
  );
}

function DropdownIndicator<
  IsMulti extends boolean = false,
  Group extends GroupBase<PersonOption> = GroupBase<PersonOption>
>({
  children,
  ...props
}: DropdownIndicatorProps<PersonOption, IsMulti, Group>) {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
    </components.DropdownIndicator>
  );
}

function StatusCircle({ online }: { online?: boolean }) {
  return (
    <div
      className={classnames(
        online ? 'bg-green-500' : 'bg-gray-200',
        'h-2 w-2 rounded-full'
      )}
    />
  );
}
