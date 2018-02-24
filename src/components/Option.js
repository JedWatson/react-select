// @flow
import React, { type Node } from 'react';

import { className } from '../utils';
import { colors, spacing } from '../theme';
import { Div } from '../primitives';
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
    innerProps: InnerProps,
    label: string,
    type: 'option',
  };

export const css = ({ isDisabled, isFocused, isSelected }: State) => ({
  backgroundColor: isSelected
    ? colors.primary
    : isFocused ? colors.primary25 : 'transparent',
  color: isDisabled
    ? colors.neutral20
    : isSelected ? colors.neutral0 : 'inherit',
  cursor: 'default',
  display: 'block',
  fontSize: 'inherit',
  padding: `${spacing.baseUnit * 2}px ${spacing.baseUnit * 3}px`,
  width: '100%',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

  // provide some affordance on touch devices
  ':active': {
    backgroundColor: isSelected ? colors.primary : colors.primary50,
  },
});

const Option = (props: Props) => {
  const { children, getStyles, isFocused, isSelected, innerProps } = props;

  return (
    <Div
      className={className('option', { isFocused, isSelected })}
      css={getStyles('option', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

export default Option;
