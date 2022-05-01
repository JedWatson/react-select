import React from 'react';
import Select, {
  components,
  IndicatorsContainerProps,
  defaultTheme,
} from 'react-select';
import { ColourOption, colourOptions } from '../data';

const { colors } = defaultTheme;

const IndicatorsContainer = (
  props: IndicatorsContainerProps<ColourOption, true>
) => {
  return (
    <div style={{ background: colourOptions[2].color }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

const customStyles = {
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: colors.neutral20,
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: colors.neutral20,
  }),
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ IndicatorsContainer }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
    styles={customStyles}
  />
);
