// @flow
import React, { type Node } from 'react';

import { colors, spacing } from '../theme';
import { Div } from '../primitives';
import type { CommonProps } from '../types';

export type PlaceholderProps = CommonProps & {
  /** The children to be rendered. */
  children: Node,
  /** props passed to the wrapping element for the group. */
  innerProps: { [string]: any },
} & State;

export type State = {
  cssPosition: 'relative' | 'absolute',
}

export const css = ({ cssPosition }: State) => ({
  color: colors.neutral50,
  marginLeft: spacing.baseUnit / 2,
  marginRight: spacing.baseUnit / 2,
  position: cssPosition || 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});

const Placeholder = (props: PlaceholderProps) => {
  const { children, cx, getStyles, innerProps } = props;
  return (
    <Div
      className={cx('placeholder')}
      css={getStyles('placeholder', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

export default Placeholder;
