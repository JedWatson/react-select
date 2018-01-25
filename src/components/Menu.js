// @flow
import React from 'react';

import { className } from '../utils';
import { Div, Ul } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';
import { marginVertical, paddingHorizontal, paddingVertical } from '../mixins';
import { type PropsWithStyles } from '../types';

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

type MenuListProps = {
  id: string,
  isMulti: boolean,
  maxHeight: number,
};
type Props = PropsWithStyles & MenuListProps;
export const menulistCSS = ({ maxHeight }: MenuListProps) => ({
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
      css={getStyles('menulist', props)}
      {...cleanProps}
    />
  );
};

export const NoOptionsMessage = (props: any) => (
  <Div
    className={className('menu-no-options-message')}
    css={{
      color: colors.neutral40,
      ...paddingHorizontal(spacing.baseUnit * 3),
      ...paddingVertical(spacing.baseUnit * 2),
      textAlign: 'center',
    }}
    {...props}
  />
);

export const LoadingMessage = (props: any) => (
  <Div
    className={className('menu-loading-message')}
    css={{
      color: colors.neutral40,
      ...paddingHorizontal(spacing.baseUnit * 3),
      ...paddingVertical(spacing.baseUnit * 2),
      textAlign: 'center',
    }}
    {...props}
  />
);
