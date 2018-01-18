// @flow
import React from 'react';

import type { OptionProps } from '../types';
import { className } from '../utils';
import { colors, spacing } from '../theme';
import { Li } from '../primitives';
import { paddingHorizontal, paddingVertical } from '../mixins';

const Option = ({
  data,
  index,
  id,
  isFocused,
  isSelected,
  label,
  innerRef,
  onClick,
  onMouseOver,
  value,
  withinGroup,
  ...props
}: OptionProps) => (
  <Li
    aria-selected={isSelected}
    className={className('option', { isFocused, isSelected, withinGroup })}
    id={id}
    onClick={onClick}
    onMouseOver={onMouseOver}
    role={withinGroup ? 'treeitem' : 'option'}
    tabIndex="-1"
    innerRef={innerRef}
    css={{
      backgroundColor: isSelected
        ? colors.primary
        : isFocused ? colors.primaryLight : 'transparent',
      color: isSelected ? colors.neutral0 : 'inherit',
      cursor: 'default',
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
