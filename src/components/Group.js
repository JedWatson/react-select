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

export const css = () => paddingVertical(spacing.baseUnit * 2);

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
      <Heading>{label}</Heading>
      <Ul>{children}</Ul>
    </Li>
  );
};

export const GroupHeading = (props: any) => (
  <Strong
    className={className('group-heading')}
    css={{
      color: '#999',
      cursor: 'default',
      display: 'block',
      fontSize: '75%',
      fontWeight: '500',
      marginBottom: '0.25em',
      ...paddingHorizontal(spacing.baseUnit * 3),
      textTransform: 'uppercase',
    }}
    {...props}
  />
);

export default Group;
