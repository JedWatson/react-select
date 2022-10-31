import '../styles/tailwind.css';

import Button from '@atlaskit/button/standard-button';
import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { StylesConfig } from 'react-select';

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
        <Button
          iconAfter={<ChevronDown />}
          onClick={() => setIsOpen((prev) => !prev)}
          isSelected={isOpen}
        >
          {value ? `State: ${value.label}` : 'Select a State'}
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

function Svg(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      role="presentation"
      {...props}
    />
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

function ChevronDown() {
  return (
    <Svg className="-mr-1.5">
      <path
        d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  );
}
