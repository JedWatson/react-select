// @flow
import React from 'react';
import AutosizeInput from 'react-input-autosize';

import { className } from '../utils';
import { spacing } from '../theme';
import { Div } from '../primitives';
import { marginHorizontal } from '../mixins';

import type { PropsWithInnerRef, PropsWithStyles } from '../types';

type Props = PropsWithStyles & PropsWithInnerRef;

export const css = () => marginHorizontal(spacing.baseUnit / 2);

const Input = ({ getStyles, innerRef, ...props }: Props) => (
  <Div css={getStyles('input', props)}>
    <AutosizeInput
      className={className('input')}
      inputRef={innerRef}
      {...props}
    />
  </Div>
);
export default Input;
