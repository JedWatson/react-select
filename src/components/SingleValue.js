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
  innerProps: any,
};
type Props = PropsWithStyles & ValueProps & State;

export const css = ({ isDisabled }: State) => ({
  ...marginHorizontal(spacing.baseUnit / 2),
  color: isDisabled ? colors.neutral40 : colors.text,
  maxWidth: '100%',
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const SingleValue = (props: Props) => {
  const { children, getStyles, isDisabled, innerProps } = props;
  return (
    <Div
      className={className('single-value', { isDisabled })}
      css={getStyles('singleValue', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

export default SingleValue;
