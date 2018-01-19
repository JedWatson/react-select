// @flow
import React from 'react';

import type { OptionProps } from '../types';
import { className } from '../utils';
import { colors, spacing } from '../theme';
import { Li } from '../primitives';
import { paddingHorizontal, paddingVertical } from '../mixins';

const Option = ({
  data,
  isDisabled,
  isFocused,
  isSelected,
  withinGroup,
  ...props
}: OptionProps) => (
  <Li
    className={className('option', { isFocused, isSelected, withinGroup })}
    css={{
      backgroundColor: isSelected
        ? colors.primary
        : isFocused ? colors.primaryLight : 'transparent',
      color: isDisabled
        ? colors.neutral20
        : isSelected ? colors.neutral0 : 'inherit',
      cursor: isDisabled ? 'default' : 'pointer',
      display: 'block',
      fontSize: 'inherit',
      ...paddingHorizontal(spacing.baseUnit * 3),
      ...paddingVertical(spacing.baseUnit * 2),
      width: '100%',
    }}
    {...props}
  />
);

export default Option;
