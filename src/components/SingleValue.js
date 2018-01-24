// @flow
import React from 'react';

import { marginHorizontal } from '../mixins';
import { Div } from '../primitives';
import { colors, spacing } from '../theme';
import { className } from '../utils';
import { type PropsWithStyles } from '../types';

type ValueProps = PropsWithStyles & {
  children: string,
  data: any,
  isDisabled: boolean,
};

export const css = ({ isDisabled }: { isDisabled: boolean }) => ({
  ...marginHorizontal(spacing.baseUnit / 2),
  color: isDisabled ? colors.neutral40 : colors.text,
  position: 'absolute',
});

const SingleValue = ({ getStyles, ...props }: ValueProps) => {
  const { isDisabled, data, ...cleanProps } = props;
  return (
    <Div
      className={className('single-value', { isDisabled })}
      css={getStyles('singleValue', props)}
      {...cleanProps}
    />
  );
};

export default SingleValue;
