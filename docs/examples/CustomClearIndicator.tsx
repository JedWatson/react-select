import React, { FunctionComponent } from 'react';

import Select, { ClearIndicatorProps } from 'react-select';
import { CSSObject } from '@emotion/serialize';
import { ColourOption, colourOptions } from '../data';

const CustomClearText: FunctionComponent = () => <>clear all</>;
const ClearIndicator = (props: ClearIndicatorProps<ColourOption, true>) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      <div style={{ padding: '0px 5px' }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = (
  base: CSSObject,
  state: ClearIndicatorProps<ColourOption>
): CSSObject => ({
  ...base,
  cursor: 'pointer',
  color: state.isFocused ? 'blue' : 'black',
});

export default function CustomClearIndicator() {
  return (
    <Select
      closeMenuOnSelect={false}
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
    />
  );
}
