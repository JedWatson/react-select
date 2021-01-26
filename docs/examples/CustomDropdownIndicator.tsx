import React from 'react';
import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import Select, { components } from 'react-select';
import { ColourOption, colourOptions } from '../data';
import { IndicatorProps } from 'react-select/src/components/indicators';

const DropdownIndicator = (props: IndicatorProps<ColourOption, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      <EmojiIcon label="emoji" primaryColor={colourOptions[2].color} />
    </components.DropdownIndicator>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ DropdownIndicator }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
