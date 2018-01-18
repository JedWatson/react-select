// @flow
import React from 'react';

import { className } from '../utils';
import { Div, Ul } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';
import { marginVertical, paddingHorizontal, paddingVertical } from '../mixins';

const Menu = (props: any) => (
  <Div
    className={className('menu')}
    css={{
      backgroundColor: colors.neutral0,
      boxShadow: `0 0 0 1px ${colors.neutral10a}, 0 4px 11px ${
        colors.neutral10a
      }`,
      borderRadius: borderRadius,
      ...marginVertical(spacing.baseUnit * 2),
      position: 'absolute',
      top: '100%',
      width: '100%',
      zIndex: 1,
    }}
    {...props}
  />
);

export default Menu;

type MenuListProps = {
  id: string,
  isMulti: boolean,
  maxHeight: number,
  role: 'listbox' | 'tree',
};
export const MenuList = ({
  id,
  isMulti,
  maxHeight,
  role,
  ...props
}: MenuListProps) => (
  <Ul
    aria-multiselectable={isMulti}
    id={id}
    role={role}
    tabIndex="-1"
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
