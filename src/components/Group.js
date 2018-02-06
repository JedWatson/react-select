// @flow
import React, { type Node } from 'react';

import { className } from '../utils';
import { paddingHorizontal, paddingVertical } from '../mixins';
import { Li, Ul, Strong } from '../primitives';
import { spacing } from '../theme';
import type { PropsWithStyles, MenuOptions, OptionsType } from '../types';

type GroupProps = {
  children: Node,
  Heading: typeof GroupHeading,
  menuOptions: MenuOptions,
  selectValue: OptionsType,
  innerProps: {
    'aria-expanded': boolean,
    'aria-label': string,
    role: 'group',
  },
  label: string,
};
type Props = PropsWithStyles & GroupProps;

export const groupCSS = () => paddingVertical(spacing.baseUnit * 2);

const Group = (props: Props) => {
  const { children, getStyles, Heading, label, innerProps } = props;
  return (
    <Li
      className={className('group')}
      css={getStyles('group', props)}
      {...innerProps}
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
