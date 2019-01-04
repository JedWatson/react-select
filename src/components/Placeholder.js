// @flow
import React, { type Node } from 'react';
import { ClassNames } from '@emotion/core';
import type { CommonProps } from '../types';

export type PlaceholderProps = CommonProps & {
  /** The children to be rendered. */
  children: Node,
  /** props passed to the wrapping element for the group. */
  innerProps: { [string]: any },
};

export const placeholderCSS = ({ theme: { spacing, colors } }: PlaceholderProps) => ({
  label: 'placeholder',
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
    <ClassNames>
      {({ css }) => (
        <div
          className={cx(
            css(getStyles('placeholder', props)),
            {
              'placeholder': true,
            },
            className
          )}
          {...innerProps}
        >
          {children}
        </div>
      )}
    </ClassNames>
  );
};

export default Placeholder;
