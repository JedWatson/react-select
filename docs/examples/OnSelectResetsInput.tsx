import React from 'react';
import Select, { InputActionMeta } from 'react-select';
import { colourOptions } from '../data';

export default () => {
  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>();

  const onInputChange = (
    inputValue: string,
    { action, prevInputValue }: InputActionMeta
  ) => {
    if (action === 'input-change') return inputValue;
    if (action === 'menu-close') {
      if (prevInputValue) setMenuIsOpen(true);
      else setMenuIsOpen(undefined);
    }
    return prevInputValue;
  };

  return (
    <Select
      isMulti
      defaultValue={colourOptions[0]}
      isClearable
      isSearchable
      onInputChange={onInputChange}
      name="color"
      options={colourOptions}
      menuIsOpen={menuIsOpen}
    />
  );
};
