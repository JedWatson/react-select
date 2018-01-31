// @flow
import React from 'react';

import { marginHorizontal } from '../mixins';
import { Div } from '../primitives';
import { colors, spacing } from '../theme';
import { className } from '../utils';
import { type PropsWithStyles } from '../types';

type State = { isDisabled: boolean };
type ValueProps = {
  children: string,
  data: any,
};
type Props = PropsWithStyles & ValueProps & State;

export const css = ({ isDisabled }: State) => ({
  ...marginHorizontal(spacing.baseUnit / 2),
  color: isDisabled ? colors.neutral40 : colors.text,
  position: 'absolute',
});

const SingleValue = (props: Props) => {
  const { data, getStyles, isDisabled, ...cleanProps } = props;
  return (
    <Div
      className={className('single-value', { isDisabled })}
      css={getStyles('singleValue', props)}
      {...cleanProps}
    />
  );
};

export default SingleValue;
