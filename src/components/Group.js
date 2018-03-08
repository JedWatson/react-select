// @flow
import React, { type Node, type ComponentType } from 'react';

import { className } from '../utils';
import { Div } from '../primitives';
import { spacing } from '../theme';
import { type PropsWithStyles } from '../types';

type ComponentProps = {
  children: Node,
  Heading: ComponentType<any>,
  headingProps: {
    'aria-labelledby': string,
  },
  innerProps: {
    'aria-expanded': boolean,
    'aria-label': string,
    role: 'group',
  },
  label: Node,
};
export type GroupProps = PropsWithStyles & ComponentProps;

export const groupCSS = () => ({
  paddingBottom: spacing.baseUnit * 2,
  paddingTop: spacing.baseUnit * 2,
});

const Group = (props: GroupProps) => {
  const {
    children,
    getStyles,
    Heading,
    headingProps,
    label,
    innerProps,
  } = props;
  return (
    <Div
      className={className('group')}
      css={getStyles('group', props)}
      {...innerProps}
    >
      <Heading getStyles={getStyles} {...headingProps}>
        {label}
      </Heading>
      <Div>{children}</Div>
    </Div>
  );
};

export const groupHeadingCSS = () => ({
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
  const { getStyles, ...cleanProps } = props;
  return (
    <Div
      className={className('group-heading')}
      css={getStyles('groupHeading', props)}
      {...cleanProps}
    />
  );
};

export default Group;
