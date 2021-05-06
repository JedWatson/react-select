import React from 'react';
import Select, { IndicatorSeparatorProps } from 'react-select';
import { ColourOption, colourOptions } from '../data';

const indicatorSeparatorStyle = {
  alignSelf: 'stretch',
  backgroundColor: colourOptions[2].color,
  marginBottom: 8,
  marginTop: 8,
  width: 1,
};

const IndicatorSeparator = ({
  innerProps,
}: IndicatorSeparatorProps<ColourOption, true>) => {
  return <span style={indicatorSeparatorStyle} {...innerProps} />;
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ IndicatorSeparator }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
