import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Select, { components } from 'react-select';
import { MultiValueGenericProps } from 'react-select/src/components/MultiValue';
import { ColourOption, colourOptions } from '../data';

const MultiValueContainer = (props: MultiValueGenericProps<ColourOption>) => {
  return (
    <Tooltip content={'Customise your multi-value container!'}>
      <components.MultiValueContainer {...props} />
    </Tooltip>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ MultiValueContainer }}
    styles={{
      multiValue: base => ({
        ...base,
        border: `2px dotted ${colourOptions[2].color}`,
      }),
    }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
