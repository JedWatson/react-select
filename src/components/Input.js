// @flow
import React, { type ElementRef } from 'react';
import AutosizeInput from 'react-input-autosize';

import { className } from '../utils';
import { spacing } from '../theme';
import { Div } from '../primitives';
import { marginHorizontal } from '../mixins';

import type { PropsWithStyles } from '../types';

type Props = PropsWithStyles & {
  innerRef: (ElementRef<*>) => void,
  isHidden: boolean,
};

export const css = () => marginHorizontal(spacing.baseUnit / 2);
const inputStyle = isHidden => ({
  background: 0,
  border: 0,
  fontSize: 'inherit',
  opacity: isHidden ? 0 : 1,
  outline: 0,
  padding: 0,
});

const Input = ({ getStyles, innerRef, isHidden, ...props }: Props) => (
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
