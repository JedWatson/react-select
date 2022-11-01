import '../styles/tailwind.css';

import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { StylesConfig } from 'react-select';

import { Button, ChevronDown, Svg } from '../components';
import { StateOption, stateOptions } from '../data';

export default {
  title: 'Select/Popout',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function Popout() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState<StateOption | null>(null);

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      target={
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          {value ? `State: ${value.label}` : 'Select a State'}
          <ChevronDown />
        </Button>
      }
    >
      <Select
        autoFocus
        backspaceRemovesValue={false}
        components={{ DropdownIndicator, IndicatorSeparator: null }}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        menuIsOpen
        onChange={(newValue) => {
          setValue(newValue);
          setIsOpen(false);
        }}
        options={stateOptions}
        placeholder="Search..."
        styles={selectStyles}
        tabSelectsValue={false}
        value={value}
      />
    </Dropdown>
  );
}

// =============================================================================
// Styles
// =============================================================================

const selectStyles: StylesConfig<StateOption, false> = {
  control: (provided) => ({
    ...provided,
    minWidth: 240,
    margin: 8,
  }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
};

// =============================================================================
// Styled components
// =============================================================================

function Menu(props: JSX.IntrinsicElements['div']) {
  return (
    <div
      className="absolute z-10 mt-2 bg-white rounded shadow-lg border"
      {...props}
    />
  );
}

function Blanket(props: JSX.IntrinsicElements['div']) {
  return <div className="fixed inset-0 transition-colors" {...props} />;
}

function Dropdown({
  children,
  isOpen,
  target,
  onClose,
}: {
  children?: React.ReactNode;
  readonly isOpen: boolean;
  readonly target: React.ReactNode;
  readonly onClose: () => void;
}) {
  return (
    <div className="relative">
      {target}
      {isOpen ? <Blanket onClick={onClose} /> : null}
      {isOpen ? <Menu>{children}</Menu> : null}
    </div>
  );
}

function DropdownIndicator() {
  return (
    <div className="h-6 w-8 text-gray-300">
      <Svg>
        <path
          d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </Svg>
    </div>
  );
}
