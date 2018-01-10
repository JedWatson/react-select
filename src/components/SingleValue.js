// @flow
import React from 'react';

import { colors, spacing } from '../theme';
import { Div } from '../primitives';
import { marginHorizontal } from '../mixins';

type ValueProps = {
  children: string,
  data: any,
  isDisabled: boolean,
};

const SingleValue = ({ isDisabled, ...props }: ValueProps) => (
  <Div
    css={{
      ...marginHorizontal(spacing.baseUnit / 2),
      color: isDisabled ? colors.neutral40 : colors.text,
      position: 'absolute',
    }}
    {...props}
  />
);

export default SingleValue;
