// @flow
import React from 'react';
import AutosizeInput from 'react-input-autosize';

import { spacing } from '../theme';
import { marginHorizontal } from '../mixins';

const Input = ({ innerRef, ...props }: any) => (
  <AutosizeInput
    ref={innerRef}
    style={marginHorizontal(spacing.baseUnit / 2)}
    {...props}
  />
);
export default Input;
