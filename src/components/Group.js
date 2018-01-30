// @flow
import React, { type Node } from 'react';

import { className } from '../utils';
import { paddingHorizontal, paddingVertical } from '../mixins';
import { Li, Ul, Strong } from '../primitives';
import { spacing } from '../theme';
import { type PropsWithStyles } from '../types';

type GroupProps = {
  children: Node,
  components: { Heading: typeof GroupHeading },
  label: string,
};
type Props = PropsWithStyles & GroupProps;

export const groupCSS = () => paddingVertical(spacing.baseUnit * 2);

const Group = (props: Props) => {
  const { components, getStyles, children, label, ...cleanProps } = props;
  const { Heading } = components;
  return (
    <Li
      aria-label={label}
      className={className('group')}
      css={getStyles('group', props)}
      {...cleanProps}
    >
      <Heading getStyles={getStyles}>{label}</Heading>
      <Ul>{children}</Ul>
    </Li>
  );
};

export const groupHeadingCSS = () => ({
  color: '#999',
  cursor: 'default',
  display: 'block',
  fontSize: '75%',
  fontWeight: '500',
  marginBottom: '0.25em',
  ...paddingHorizontal(spacing.baseUnit * 3),
  textTransform: 'uppercase',
});

export const GroupHeading = (props: any) => {
  const { getStyles, ...cleanProps } = props;
  return (
    <Strong
      className={className('group-heading')}
      css={getStyles('groupHeading', props)}
      {...cleanProps}
    />
  );
};

export default Group;
