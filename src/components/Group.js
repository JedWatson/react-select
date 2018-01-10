// @flow
import React, { Children, cloneElement, type Node } from 'react';

import { paddingHorizontal, paddingVertical } from '../mixins';
import { Li, Ul, Strong } from '../primitives';
import { spacing } from '../theme';

type Props = {
  children: Node,
  label: Node,
};

const Group = ({ children, label, ...props }: Props) => {
  const cloneProps = { withinGroup: true, ...props };

  return (
    <Li
      aria-label={label}
      aria-expanded="true"
      role="group"
      css={paddingVertical(spacing.baseUnit * 2)}
      {...props}
    >
      <GroupHeading>{label}</GroupHeading>
      <Ul>{Children.map(children, k => cloneElement(k, cloneProps))}</Ul>
    </Li>
  );
};

const GroupHeading = props => (
  <Strong
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
