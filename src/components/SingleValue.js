// @flow
import React from 'react';

import { marginHorizontal } from '../mixins';
import { Div } from '../primitives';
import { colors, spacing } from '../theme';
import { className } from '../utils';
import { type PropsWithStyles } from '../types';

type ValueProps = {
  children: string,
  data: any,
  isDisabled: boolean,
};
type Props = PropsWithStyles & ValueProps;

export const css = ({ isDisabled }: ValueProps) => ({
  ...marginHorizontal(spacing.baseUnit / 2),
  color: isDisabled ? colors.neutral40 : colors.text,
  position: 'absolute',
});

const SingleValue = (props: Props) => {
  const { getStyles, isDisabled, data, ...cleanProps } = props;
  return (
    <Div
      className={className('single-value', { isDisabled })}
      css={getStyles('singleValue', props)}
      {...cleanProps}
    />
  );
};

export default SingleValue;
