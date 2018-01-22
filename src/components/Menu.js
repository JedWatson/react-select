// @flow
import React from 'react';

import { className } from '../utils';
import { Div, Ul } from '../primitives';
import { colors, spacing } from '../theme';
import { paddingHorizontal, paddingVertical } from '../mixins';

const Menu = ({ menuProps, children }: any) => (
  <Div {...menuProps}>{children}</Div>
);

export default Menu;

type MenuListProps = {
  id: string,
  isMulti: boolean,
  maxHeight: number,
  role: 'listbox' | 'tree',
};
export const MenuList = ({
  isMulti,
  maxHeight,
  role,
  ...props
}: MenuListProps) => (
  <Ul
    className={className('menu-list', { isMulti })}
    css={{
      maxHeight,
      overflowY: 'auto',
      ...paddingVertical(spacing.baseUnit),
      position: 'relative', // required for offset[Height, Top] > keyboard scroll
    }}
    {...props}
  />
);

export const NoOptions = (props: any) => (
  <Div
    className={className('menu-no-option')}
    css={{
      color: colors.neutral40,
      ...paddingHorizontal(spacing.baseUnit * 3),
      ...paddingVertical(spacing.baseUnit * 2),
      textAlign: 'center',
    }}
    {...props}
  />
);
