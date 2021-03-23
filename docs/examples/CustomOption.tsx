import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Select, { components, OptionProps } from 'react-select';
import { ColourOption, colourOptions } from '../data';

const Option = (props: OptionProps<ColourOption>) => {
  return (
    <Tooltip content={'Customise your option component!'} truncate>
      <components.Option {...props} />
    </Tooltip>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ Option }}
    styles={{
      option: base => ({
        ...base,
        border: `1px dotted ${colourOptions[2].color}`,
        height: '100%',
      }),
    }}
    defaultValue={colourOptions[4]}
    options={colourOptions}
  />
);
