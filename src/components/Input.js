// @flow
import React from 'react';
import AutosizeInput from 'react-input-autosize';

import { className } from '../utils';
import { spacing } from '../theme';
import { marginHorizontal } from '../mixins';

import type { PropsWithInnerRef } from '../types';

const Input = ({ innerRef, ...props }: PropsWithInnerRef) => (
  <AutosizeInput
    className={className('input')}
    inputRef={innerRef}
    style={marginHorizontal(spacing.baseUnit / 2)}
    {...props}
  />
);
export default Input;
