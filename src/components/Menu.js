// @flow
import React, { type Node } from 'react';

import { className } from '../utils';
import { Div, Ul } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';
import { marginVertical, paddingHorizontal, paddingVertical } from '../mixins';
import { type PropsWithStyles, type InnerRef } from '../types';

// ==============================
// Menu
// ==============================

type MenuProps = PropsWithStyles & { children: Node, innerProps: Object };

export const menuCSS = () => ({
  backgroundColor: colors.neutral0,
  boxShadow: `0 0 0 1px ${colors.neutral10a}, 0 4px 11px ${colors.neutral10a}`,
  borderRadius: borderRadius,
  ...marginVertical(spacing.baseUnit * 2),
  position: 'absolute',
  top: '100%',
  width: '100%',
  zIndex: 1,
});

const Menu = (props: MenuProps) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div
      className={className('menu')}
      css={getStyles('menu', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

export default Menu;

// ==============================
// Menu List
// ==============================

type MenuListState = {
  isMulti: boolean,
  maxHeight: number,
};

type MenuListProps = {
  children: Node,
  innerProps: {
    'aria-multiselectable': boolean,
    id: string,
    innerRef: InnerRef,
    role: 'listbox',
  },
};
type Props = PropsWithStyles & MenuListProps & MenuListState;
export const menuListCSS = ({ maxHeight }: MenuListState) => ({
  maxHeight,
  overflowY: 'auto',
  ...paddingVertical(spacing.baseUnit),
  position: 'relative', // required for offset[Height, Top] > keyboard scroll
});
export const MenuList = (props: Props) => {
  const { children, getStyles, isMulti, innerProps } = props;
  return (
    <Ul
      className={className('menu-list', { isMulti })}
      css={getStyles('menuList', props)}
      {...innerProps}
    >
      {children}
    </Ul>
  );
};

// ==============================
// Menu Notices
// ==============================

const noticeCSS = () => ({
  color: colors.neutral40,
  ...paddingHorizontal(spacing.baseUnit * 3),
  ...paddingVertical(spacing.baseUnit * 2),
  textAlign: 'center',
});
export const noOptionsMessageCSS = noticeCSS;
export const loadingMessageCSS = noticeCSS;

type NoticeProps = PropsWithStyles & {
  children: Node,
};

export const NoOptionsMessage = (props: NoticeProps) => {
  const { getStyles, ...cleanProps } = props;
  return (
    <Div
      className={className(['menu-notice', 'menu-notice--no-options'])}
      css={getStyles('noOptionsMessage', props)}
      {...cleanProps}
    />
  );
};
NoOptionsMessage.defaultProps = {
  children: 'No options',
};

export const LoadingMessage = (props: NoticeProps) => {
  const { getStyles, ...cleanProps } = props;
  return (
    <Div
      className={className(['menu-notice', 'menu-notice--loading'])}
      css={getStyles('loadingMessage', props)}
      {...cleanProps}
    />
  );
};
LoadingMessage.defaultProps = {
  children: 'Loading...',
};
