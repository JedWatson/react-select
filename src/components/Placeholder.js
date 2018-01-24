// @flow
import React from 'react';

import { className } from '../utils';
import { colors, spacing } from '../theme';
import { Div } from '../primitives';
import { marginHorizontal } from '../mixins';
import { type PropsWithStyles } from '../types';

type PlaceholderProps = { isDisabled: boolean, isMulti: boolean };
type Props = PropsWithStyles & PlaceholderProps;

export const css = () => ({
  ...marginHorizontal(spacing.baseUnit / 2),
  color: colors.neutral60,
  position: 'absolute',
});

const Placeholder = ({ getStyles, ...props }: Props) => {
  const { isDisabled, isMulti, ...cleanProps } = props;
  return (
    <Div
      className={className('placeholder')}
      css={getStyles('placeholder', props)}
      {...cleanProps}
    />
  );
};

export default Placeholder;
