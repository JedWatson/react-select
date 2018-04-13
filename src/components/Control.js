// @flow
import React, { type Node, type ElementRef } from 'react';

import { Div } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';
import type { CommonProps, PropsWithStyles } from '../types';

type State = {
  /** Whether the select is disabled. */
  isDisabled: boolean,
  /** Whether the select is focused. */
  isFocused: boolean,
};

export type ControlProps = CommonProps &
  PropsWithStyles &
  State & {
    /** Children to render. */
    children: Node,
    /** The mouse down event and the innerRef to pass down to the controller element. */
    innerProps: {
      onMouseDown: (SyntheticMouseEvent<HTMLElement>) => void,
      innerRef: ElementRef<*>,
    },
  };

export const css = ({ isDisabled, isFocused }: State) => ({
  alignItems: 'center',
  backgroundColor: isDisabled
    ? colors.neutral5
    : isFocused ? colors.neutral0 : colors.neutral2,
  borderColor: isDisabled
    ? colors.neutral10
    : isFocused ? colors.primary : colors.neutral20,
  borderRadius: borderRadius,
  borderStyle: 'solid',
  borderWidth: 1,
  boxShadow: isFocused ? `0 0 0 1px ${colors.primary}` : null,
  cursor: 'default',
  display: 'flex ',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  minHeight: spacing.controlHeight,
  outline: '0 !important',
  position: 'relative',
  transition: 'all 100ms',

  '&:hover': {
    borderColor: isFocused ? colors.primary : colors.neutral30,
  },
});

const Control = (props: ControlProps) => {
  const { children, cx, getStyles, isDisabled, isFocused, innerProps } = props;
  return (
    <Div
      className={cx('control', { isDisabled, isFocused })}
      css={getStyles('control', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

export default Control;
