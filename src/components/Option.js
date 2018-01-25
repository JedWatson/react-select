// @flow
import React from 'react';

import type { OptionProps } from '../types';
import { className } from '../utils';
import { colors, spacing } from '../theme';
import { Li } from '../primitives';
import { paddingHorizontal, paddingVertical } from '../mixins';
import { type PropsWithStyles } from '../types';

type Props = PropsWithStyles & OptionProps;

export const css = ({ isDisabled, isFocused, isSelected }: OptionProps) => ({
  backgroundColor: isSelected
    ? colors.primary
    : isFocused ? colors.primaryLight : 'transparent',
  color: isDisabled
    ? colors.neutral20
    : isSelected ? colors.neutral0 : 'inherit',
  cursor: 'default',
  display: 'block',
  fontSize: 'inherit',
  ...paddingHorizontal(spacing.baseUnit * 3),
  ...paddingVertical(spacing.baseUnit * 2),
  width: '100%',
});

const Option = (props: Props) => {
  const {
    data,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    ...cleanProps
  } = props;
  return (
    <Li
      className={className('option', { isFocused, isSelected })}
      css={getStyles('option', props)}
      {...cleanProps}
    />
  );
};

export default Option;
