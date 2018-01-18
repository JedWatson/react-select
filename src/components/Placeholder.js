// @flow
import React from 'react';

import { className } from '../utils';
import { colors, spacing } from '../theme';
import { Div } from '../primitives';
import { marginHorizontal } from '../mixins';

type Props = { isDisabled: boolean, isMulti: boolean };

const Placeholder = ({ isDisabled, isMulti, ...props }: Props) => (
  <Div
    className={className('placeholder')}
    css={{
      ...marginHorizontal(spacing.baseUnit / 2),
      color: colors.neutral60,
      position: 'absolute',
    }}
    {...props}
  />
);

export default Placeholder;
