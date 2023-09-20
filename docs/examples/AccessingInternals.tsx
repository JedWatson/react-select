import React, { Fragment, useRef } from 'react';

import Select, { SelectInstance } from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';

import { Note } from '../styled-components';
import { ColourOption, colourOptions } from '../data';

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue: string) =>
  new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default function AccessingInternals() {
  const selectRef = useRef<SelectInstance<ColourOption> | null>(null);
  const asyncRef = useRef<SelectInstance<ColourOption> | null>(null);
  const creatableRef = useRef<SelectInstance<ColourOption> | null>(null);

  // Focus handlers
  const focus = () => {
    console.log(selectRef);
    selectRef.current?.focus();
  };
  const focusAsync = () => {
    console.log(asyncRef);
    asyncRef.current?.focus();
  };
  const focusCreatable = () => {
    console.log(creatableRef);
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
    <Fragment>
      <h4>Creatable Select</h4>
      <CreatableSelect ref={creatableRef} isClearable options={colourOptions} />
      <Note Tag="label">
        <button
          onClick={focusCreatable}
          id="cypress-single__clearable-checkbox"
        >
          Focus
        </button>
      </Note>
      <Note Tag="label">
        <button onClick={blurCreatable} id="cypress-single__clearable-checkbox">
          Blur
        </button>
      </Note>
      <h4>Async Select</h4>
      <AsyncSelect
        ref={asyncRef}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />
      <Note Tag="label">
        <button onClick={focusAsync} id="cypress-single__clearable-checkbox">
          Focus
        </button>
      </Note>
      <Note Tag="label">
        <button onClick={blurAsync} id="cypress-single__clearable-checkbox">
          Blur
        </button>
      </Note>
      <h4>Select</h4>
      <Select
        ref={selectRef}
        defaultValue={colourOptions[2]}
        name="colors"
        options={colourOptions}
      />
      <Note Tag="label">
        <button onClick={focus} id="cypress-single__clearable-checkbox">
          Focus
        </button>
      </Note>
      <Note Tag="label">
        <button onClick={blur} id="cypress-single__clearable-checkbox">
          Blur
        </button>
      </Note>
    </Fragment>
  );
}
