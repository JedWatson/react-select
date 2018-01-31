// @flow
import React from 'react';

import { className } from '../utils';
import { colors, spacing } from '../theme';
import { Div } from '../primitives';
import { marginHorizontal } from '../mixins';
import { type PropsWithStyles } from '../types';

type State = { isDisabled: boolean, isMulti: boolean };
type Props = PropsWithStyles & State;

export const css = () => ({
  ...marginHorizontal(spacing.baseUnit / 2),
  color: colors.neutral60,
  position: 'absolute',
});

const Placeholder = (props: Props) => {
  const { getStyles, isDisabled, isMulti, ...cleanProps } = props;
  return (
    <Div
      className={className('placeholder')}
      css={getStyles('placeholder', props)}
      {...cleanProps}
    />
  );
};

export default Placeholder;
