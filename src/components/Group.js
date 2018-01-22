// @flow
import React, { type Node } from 'react';

import { className } from '../utils';
import { paddingHorizontal } from '../mixins';
import { Li, Ul, Strong } from '../primitives';
import { spacing } from '../theme';

type Props = {
  children: Node,
  data: any,
  groupProps: any,
};

// TODO: Group currently expects a `label` property, which must be a string.
// we could possibly implement a formatter for it, with aria-labelledby here

const Group = ({ children, data, groupProps }: Props) => {
  return (
    <Li aria-label={data.label} {...groupProps}>
      <GroupHeading>{data.label}</GroupHeading>
      <Ul>{children}</Ul>
    </Li>
  );
};

const GroupHeading = props => (
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
