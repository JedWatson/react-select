// @flow
import React, { type ElementRef } from 'react';
import AutosizeInput from 'react-input-autosize';

import { className } from '../utils';
import { spacing } from '../theme';
import { Div } from '../primitives';

import type { PropsWithStyles } from '../types';

export type InputProps = PropsWithStyles & {
  innerRef: (ElementRef<*>) => void,
  isHidden: boolean,
};

export const css = () => ({
  margin: spacing.baseUnit / 2,
  paddingBottom: spacing.baseUnit / 2,
  paddingTop: spacing.baseUnit / 2,
});
const inputStyle = isHidden => ({
  background: 0,
  border: 0,
  fontSize: 'inherit',
  opacity: isHidden ? 0 : 1,
  outline: 0,
  padding: 0,
});

const Input = ({ getStyles, innerRef, isHidden, ...props }: InputProps) => (
  <Div css={getStyles('input', props)}>
    <AutosizeInput
      className={className('input')}
      inputRef={innerRef}
      inputStyle={inputStyle(isHidden)}
      {...props}
    />
  </Div>
);
export default Input;
