// @flow
import React from 'react';

import type { OptionProps } from '../types';
import { Li } from '../primitives';

const Option = ({
  data,
  isDisabled,
  isFocused,
  isSelected,
  withinGroup,
  optionStyles,
  optionClassName,
  ...props
}: OptionProps & { optionStyles: any, optionClassName: string }) => (
  <Li className={optionClassName} css={optionStyles} {...props} />
);

export default Option;
