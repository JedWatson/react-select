import React, { useState } from 'react';
import Select, { createFilter } from 'react-select';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = (props: JSX.IntrinsicElements['input']) => (
  <input type="checkbox" {...props} />
);

export default () => {
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreAccents, setIgnoreAccents] = useState(false);
  const [trim, setTrim] = useState(false);
  const [matchFromStart, setMatchFromStart] = useState(false);

  const filterConfig = {
    ignoreCase,
    ignoreAccents,
    trim,
    matchFrom: matchFromStart ? ('start' as const) : ('any' as const),
  };

  return (
    <>
      <Select
        defaultValue={colourOptions[0]}
        isClearable
        isSearchable
        name="color"
        options={colourOptions}
        filterOption={createFilter(filterConfig)}
      />
      <Note Tag="label">
        <Checkbox
          checked={ignoreCase}
          onChange={() => setIgnoreCase((prev) => !prev)}
          id="cypress-single__clearable-checkbox"
        />
        Ignore Case
      </Note>
      <Note Tag="label">
        <Checkbox
          checked={ignoreAccents}
          onChange={() => setIgnoreAccents((prev) => !prev)}
          id="cypress-single__clearable-checkbox"
        />
        Ignore Accents
      </Note>
      <Note Tag="label">
        <Checkbox
          checked={trim}
          onChange={() => setTrim((prev) => !prev)}
          id="cypress-single__clearable-checkbox"
        />
        Trim
      </Note>
      <Note Tag="label">
        <Checkbox
          checked={matchFromStart}
          onChange={() => setMatchFromStart((prev) => !prev)}
          id="cypress-single__clearable-checkbox"
        />
        Match from the start
      </Note>
    </>
  );
};
