import React from 'react';
import Select, { components, PlaceholderProps } from 'react-select';
import { ColourOption, colourOptions } from '../data';

const Placeholder = (props: PlaceholderProps<ColourOption, false>) => {
  return <components.Placeholder {...props} />;
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ Placeholder }}
    placeholder={'custom placeholder component'}
    styles={{
      placeholder: base => ({
        ...base,
        fontSize: '1em',
        color: colourOptions[2].color,
        fontWeight: 400,
      }),
    }}
    options={colourOptions}
  />
);
