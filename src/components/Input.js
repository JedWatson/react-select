// @flow
import React from 'react';
import AutosizeInput from 'react-input-autosize';

import { className } from '../utils';
import { spacing } from '../theme';
import { marginHorizontal } from '../mixins';

type Props = {
  innerRef: HTMLElement => void
}

const Input = ({ innerRef, ...props }: Props) => (
  <AutosizeInput
    className={className('input')}
    ref={innerRef}
    style={marginHorizontal(spacing.baseUnit / 2)}
    {...props}
  />
);
export default Input;
