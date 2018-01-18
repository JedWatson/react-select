// @flow
import React from 'react';
import AutosizeInput from 'react-input-autosize';

import { className } from '../utils';
import { spacing } from '../theme';
import { marginHorizontal } from '../mixins';

const Input = ({ innerRef, ...props }: any) => (
  <AutosizeInput
    className={className('input')}
    ref={innerRef}
    style={marginHorizontal(spacing.baseUnit / 2)}
    {...props}
  />
);
export default Input;
