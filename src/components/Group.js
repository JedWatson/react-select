// @flow
import React, { type Node, type ComponentType } from 'react';
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
    selectProps,
  } = props;

  let classNames = cx("", {
    'group': true
  }, className);
  
  return (
    <div
      className={classNames}
      style={getStyles('group', props)}
    >
      <Heading
        {...headingProps}
        selectProps={selectProps}
        theme={theme}
        getStyles={getStyles}
        cx={cx}
      >
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
  const { className, cx, getStyles, theme, selectProps, ...cleanProps } = props;
  let classNames = cx("", {
    'group-heading': true
  }, className);

  return (
    <div
    className={classNames}
    style={getStyles('groupHeading', { theme, ...cleanProps })}
      {...cleanProps}
    />
  );
};

export default Group;
