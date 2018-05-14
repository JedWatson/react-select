// @flow
import React, { type Node } from 'react';
import { css as emotionCss } from 'emotion';

import { colors, spacing } from '../theme';
import type { CommonProps } from '../types';

export type PlaceholderProps = CommonProps & {
  /** The children to be rendered. */
  children: Node,
  /** props passed to the wrapping element for the group. */
  innerProps: { [string]: any },
};

export const css = () => ({
  color: colors.neutral50,
  marginLeft: spacing.baseUnit / 2,
  marginRight: spacing.baseUnit / 2,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});

const Placeholder = (props: PlaceholderProps) => {
  const { children, className, cx, getStyles, innerProps } = props;
  return (
    <div
      className={cx(
        emotionCss(getStyles('placeholder', props)),
        {
          'placeholder': true,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export default Placeholder;
