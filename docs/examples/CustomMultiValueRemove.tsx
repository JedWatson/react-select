import React from 'react';
import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import Tooltip from '@atlaskit/tooltip';
import Select, { components, MultiValueRemoveProps } from 'react-select';
import { ColourOption, colourOptions } from '../data';

const MultiValueRemove = (props: MultiValueRemoveProps<ColourOption>) => {
  return (
    <Tooltip content={'Customise your multi-value remove component!'} truncate>
      <components.MultiValueRemove {...props}>
        <EmojiIcon label="Emoji" primaryColor={colourOptions[2].color} />
      </components.MultiValueRemove>
    </Tooltip>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ MultiValueRemove }}
    styles={{
      multiValueRemove: base => ({
        ...base,
        border: `1px dotted ${colourOptions[2].color}`,
        height: '100%',
      }),
    }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
