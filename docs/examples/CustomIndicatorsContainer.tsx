import React from 'react';
import Select, { components, IndicatorsContainerProps } from 'react-select';
import { ColourOption, colourOptions } from '../data';

const IndicatorsContainer = (
  props: IndicatorsContainerProps<ColourOption, true>
) => {
  return (
    <div style={{ background: colourOptions[2].color }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ IndicatorsContainer }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
