// @flow
import React, { type Node, type ComponentType } from 'react';
import { css } from 'emotion';

import type { CommonProps } from '../types';

type ComponentProps = {
  /** The children to be rendered. */
  children: Node,
  /** Component to wrap the label, recieves headingProps. */
  Heading: ComponentType<any>,
  /** Props to pass to Heading. */
  headingProps: any,
  /** Label to be displayed in the heading component. */
  label: Node,
};
export type GroupProps = CommonProps & ComponentProps;

export const groupCSS = ({ theme: { spacing } }: GroupProps) => ({
  paddingBottom: spacing.baseUnit * 2,
  paddingTop: spacing.baseUnit * 2,
});

const Group = (props: GroupProps) => {
  const {
    children,
    className,
    cx,
    getStyles,
    Heading,
    headingProps,
    label,
    theme,
  } = props;
  return (
    <div
      className={cx(
        css(getStyles('group', props)),
        { 'group': true },
        className,
      )}
    >
      <Heading {...headingProps} theme={theme} getStyles={getStyles} cx={cx}>
        {label}
      </Heading>
      <div>{children}</div>
    </div>
  );
};

export const groupHeadingCSS = ({ theme: { spacing } }: GroupProps) => ({
  color: '#999',
  cursor: 'default',
  display: 'block',
  fontSize: '75%',
  fontWeight: '500',
  marginBottom: '0.25em',
  paddingLeft: spacing.baseUnit * 3,
  paddingRight: spacing.baseUnit * 3,
  textTransform: 'uppercase',
});

export const GroupHeading = (props: any) => {
  const { className, cx, getStyles, theme, ...cleanProps } = props;
  return (
    <div
      className={cx(
        css(getStyles('groupHeading', { theme, ...cleanProps })),
        { 'group-heading': true },
        className
      )}
      {...cleanProps}
    />
  );
};

export default Group;
