// @flow
import React, { type Node, type Ref } from 'react';

import { className } from '../utils';
import { Div } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';
import type { PropsWithStyles } from '../types';

type State = { isDisabled: boolean, isFocused: boolean };
type Props = PropsWithStyles &
  State & {
    children: Node,
    innerProps: {
      onMouseDown: (SyntheticMouseEvent<HTMLElement>) => void,
      innerRef: Ref<*>,
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

const Control = (props: Props) => {
  const { children, getStyles, isDisabled, isFocused, innerProps } = props;
  return (
    <Div
      className={className('control', { isDisabled, isFocused })}
      css={getStyles('control', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

export default Control;
