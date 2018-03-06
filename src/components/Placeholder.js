// @flow
import React, { type Node } from 'react';

import { className } from '../utils';
import { colors, spacing } from '../theme';
import { Div } from '../primitives';
import { type PropsWithStyles } from '../types';

export type PlaceholderProps = PropsWithStyles & {
  children: Node,
  innerProps: { [string]: any },
};

export const css = () => ({
  color: colors.neutral50,
  marginLeft: spacing.baseUnit / 2,
  marginRight: spacing.baseUnit / 2,
  position: 'absolute',
});

const Placeholder = (props: PlaceholderProps) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div
      className={className('placeholder')}
      css={getStyles('placeholder', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

export default Placeholder;
