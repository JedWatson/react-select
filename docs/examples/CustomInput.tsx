import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Select, { components, InputProps } from 'react-select';
import { ColourOption, colourOptions } from '../data';

const Input = (props: InputProps<ColourOption, true>) => {
  if (props.isHidden) {
    return <components.Input {...props} />;
  }
  return (
    <div style={{ border: `1px dotted ${colourOptions[2].color}` }}>
      <Tooltip content={'Custom Input'}>
        <components.Input {...props} />
      </Tooltip>
    </div>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ Input }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
