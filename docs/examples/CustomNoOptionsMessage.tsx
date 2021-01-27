import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Select, { components, OptionTypeBase } from 'react-select';
import { NoticeProps } from 'react-select/src/components/Menu';
import { colourOptions } from '../data';
const msgStyles = {
  background: colourOptions[2].color,
  color: 'white',
};

const NoOptionsMessage = (props: NoticeProps<OptionTypeBase, false>) => {
  return (
    <Tooltip content="Custom NoOptionsMessage Component">
      <components.NoOptionsMessage {...props} />
    </Tooltip>
  );
};

const CustomNoOptionsMessage = () => {
  return (
    <Select
      isClearable
      components={{ NoOptionsMessage }}
      styles={{ noOptionsMessage: base => ({ ...base, ...msgStyles }) }}
      isSearchable
      name="color"
      options={[]}
    />
  );
};

export default CustomNoOptionsMessage;
