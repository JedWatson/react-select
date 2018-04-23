// @flow
import React, { type ElementRef } from 'react';
import AutosizeInput from 'react-input-autosize';

import { colors, spacing } from '../theme';
import { Div } from '../primitives';

import type { PropsWithStyles } from '../types';

export type InputProps = PropsWithStyles & {
  cx: string => string | void,
  /** Reference to the internal element */
  innerRef: (ElementRef<*>) => void,
  /** Set whether the input should be visible. Does not affect input size. */
  isHidden: boolean,
  /** Whether the input is disabled */
  isDisabled?: boolean,
};

export const css = ({ isDisabled }: InputProps) => ({
  margin: spacing.baseUnit / 2,
  paddingBottom: spacing.baseUnit / 2,
  paddingTop: spacing.baseUnit / 2,
  visibility: isDisabled ? 'hidden' : 'visible',
  color: colors.text,
});
const inputStyle = isHidden => ({
  background: 0,
  border: 0,
  fontSize: 'inherit',
  opacity: isHidden ? 0 : 1,
  outline: 0,
  padding: 0,
  color: 'inherit',
});

const Input = ({
  cx,
  getStyles,
  innerRef,
  isHidden,
  isDisabled,
  ...props
}: InputProps) => (
  <Div css={getStyles('input', props)}>
    <AutosizeInput
      className={cx('input')}
      inputRef={innerRef}
      inputStyle={inputStyle(isHidden)}
      disabled={isDisabled}
      {...props}
    />
  </Div>
);
export default Input;
