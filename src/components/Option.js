// @flow
import React, { type Node } from 'react';

import { className } from '../utils';
import { colors, spacing } from '../theme';
import { Li } from '../primitives';
import { paddingHorizontal, paddingVertical } from '../mixins';
import { type PropsWithStyles, type InnerRef } from '../types';

type State = {
  isDisabled: boolean,
  isFocused: boolean,
  isSelected: boolean,
};
type InnerProps = {
  'aria-selected': boolean,
  id: string,
  innerRef: InnerRef,
  key: string,
  onClick: MouseEventHandler,
  onMouseOver: MouseEventHandler,
  role: 'option',
  tabIndex: number,
};
type Props = PropsWithStyles &
  State & {
    children: Node,
    data: {},
    innerProps: InnerProps,
    label: string,
    type: 'option',
  };

export const css = ({ isDisabled, isFocused, isSelected }: State) => ({
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
  /* eslint-disable no-unused-vars */
  const {
    children,
    data, // invalid DOM attr, must be removed before spreading
    getStyles,
    isDisabled, // invalid DOM attr, must be removed before spreading
    isFocused,
    isSelected,
    innerProps,
  } = props;
  /* eslint-enable no-unused-vars */

  return (
    <Li
      className={className('option', { isFocused, isSelected })}
      css={getStyles('option', props)}
      {...innerProps}
    >
      {children}
    </Li>
  );
};

export default Option;
