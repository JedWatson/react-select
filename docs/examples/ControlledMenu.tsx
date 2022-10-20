import React, { useRef, useState } from 'react';

import Select, { SelectInstance } from 'react-select';
import { colourOptions } from '../data';
import { Note } from '../styled-components';

const Checkbox = (props: JSX.IntrinsicElements['input']) => (
  <input type="checkbox" {...props} />
);

export default () => {
  const ref = useRef<SelectInstance>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const toggleMenuIsOpen = () => {
    setMenuIsOpen((value) => !value);
    const { current } = ref;
    if (!current) return;
    if (menuIsOpen) current.blur();
    else current.focus();
  };

  return (
    <>
      <Select
        ref={ref}
        defaultValue={colourOptions[0]}
        isClearable
        menuIsOpen={menuIsOpen}
        styles={{ menu: (base) => ({ ...base, position: 'relative' }) }}
        name="color"
        options={colourOptions}
      />
      <Note Tag="label">
        <Checkbox
          checked={menuIsOpen}
          onChange={toggleMenuIsOpen}
          id="cypress-single__clearable-checkbox"
        />
        menuIsOpen
      </Note>
    </>
  );
};
