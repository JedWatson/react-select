import { ComponentMeta } from '@storybook/react';
import React, { useRef } from 'react';
import Select, { SelectInstance } from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';

import { Field } from '../components/field';
import { ColourOption, colourOptions } from '../data';
import '../styles/tailwind.css';

export default {
  title: 'Select/AccessingInternalsViaRef',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

function filterColors(inputValue: string) {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
}

function promiseOptions(inputValue: string) {
  return new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });
}

export function AccessingInternalsViaRef() {
  const selectRef = useRef<SelectInstance<ColourOption> | null>(null);
  const asyncRef = useRef<SelectInstance<ColourOption> | null>(null);
  const creatableRef = useRef<SelectInstance<ColourOption> | null>(null);

  // Focus handlers
  const focus = () => {
    selectRef.current?.focus();
  };
  const focusAsync = () => {
    asyncRef.current?.focus();
  };
  const focusCreatable = () => {
    creatableRef.current?.focus();
  };

  // Blur handlers
  const blur = () => {
    selectRef.current?.blur();
  };
  const blurAsync = () => {
    asyncRef.current?.blur();
  };
  const blurCreatable = () => {
    creatableRef.current?.blur();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Field label="Select" htmlFor="select-id">
          <Select ref={selectRef} inputId="select-id" options={colourOptions} />
        </Field>
        <ButtonGroup>
          <Button onClick={focus}>Focus</Button>
          <Button onClick={blur}>Blur</Button>
        </ButtonGroup>
      </div>

      {/* Async Select */}
      <div className="flex flex-col gap-2">
        <Field label="Async Select" htmlFor="async-select-id">
          <AsyncSelect
            ref={asyncRef}
            inputId="async-select-id"
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
          />
        </Field>
        <ButtonGroup>
          <Button onClick={focusAsync}>Focus</Button>
          <Button onClick={blurAsync}>Blur</Button>
        </ButtonGroup>
      </div>

      {/* Creatable */}
      <div className="flex flex-col gap-2">
        <Field label="Creatable Select" htmlFor="creatable-select-id">
          <CreatableSelect
            ref={creatableRef}
            inputId="creatable-select-id"
            isClearable
            options={colourOptions}
          />
        </Field>
        <ButtonGroup>
          <button
            className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
            onClick={focusCreatable}
          >
            Focus
          </button>
          <button
            className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
            onClick={blurCreatable}
          >
            Blur
          </button>
        </ButtonGroup>
      </div>
    </div>
  );
}

function ButtonGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4">{children}</div>;
}

function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  }
) {
  return (
    <button
      className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
      {...props}
    />
  );
}
