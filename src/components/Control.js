// @flow
import React from 'react';

import { className } from '../utils';
import { Div } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';
import { type PropsWithStyles } from '../types';

type ControlProps = { isDisabled: boolean, isFocused: boolean };
type Props = PropsWithStyles & ControlProps;

export const css = ({ isDisabled, isFocused }: ControlProps) => ({
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
  const { getStyles, isDisabled, isFocused, ...cleanProps } = props;
  return (
    <Div
      className={className('control', { isDisabled, isFocused })}
      css={getStyles('control', props)}
      {...cleanProps}
    />
  );
};

export default Control;
