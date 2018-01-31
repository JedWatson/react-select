// @flow
import React from 'react';
import AutosizeInput from 'react-input-autosize';

import { className } from '../utils';
import { spacing } from '../theme';
import { Div } from '../primitives';
import { marginHorizontal } from '../mixins';

import type { PropsWithInnerRef, PropsWithStyles } from '../types';

type Props = PropsWithStyles & PropsWithInnerRef & { isHidden: boolean };

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
