// @flow
import React, { type Node } from 'react';

import { className } from '../utils';
import { Div, Ul } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';
import { marginVertical, paddingHorizontal, paddingVertical } from '../mixins';
import { type PropsWithStyles } from '../types';

// ==============================
// Menu
// ==============================

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

const Menu = ({ getStyles, ...props }: PropsWithStyles) => (
  <Div
    className={className('menu')}
    css={getStyles('menu', props)}
    {...props}
  />
);

export default Menu;

// ==============================
// Menu List
// ==============================

type MenuListProps = {
  id: string,
  isMulti: boolean,
  maxHeight: number,
};
type Props = PropsWithStyles & MenuListProps;
export const menuListCSS = ({ maxHeight }: MenuListProps) => ({
  maxHeight,
  overflowY: 'auto',
  ...paddingVertical(spacing.baseUnit),
  position: 'relative', // required for offset[Height, Top] > keyboard scroll
});
export const MenuList = (props: Props) => {
  const { getStyles, isMulti, maxHeight, ...cleanProps } = props;
  return (
    <Ul
      className={className('menu-list', { isMulti })}
      css={getStyles('menuList', props)}
      {...cleanProps}
    />
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
export const menuNoticeNoOptionsCSS = noticeCSS;
export const menuNoticeLoadingCSS = noticeCSS;

type NoticeProps = PropsWithStyles & {
  children: Node,
};

export const MenuNoticeNoOptions = (props: NoticeProps) => {
  const { getStyles, ...cleanProps } = props;
  return (
    <Div
      className={className('menu-notice menu-notice--no-options')}
      css={getStyles('menuNoticeNoOptions', props)}
      {...cleanProps}
    />
  );
};
MenuNoticeNoOptions.defaultProps = {
  children: 'No options',
};

export const MenuNoticeLoading = (props: NoticeProps) => {
  const { getStyles, ...cleanProps } = props;
  return (
    <Div
      className={className('menu-notice menu-notice--loading')}
      css={getStyles('menuNoticeLoading', props)}
      {...cleanProps}
    />
  );
};
MenuNoticeLoading.defaultProps = {
  children: 'Loading...',
};
