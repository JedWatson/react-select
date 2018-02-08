// @flow
import React, { Component, type ElementRef, type Node } from 'react';

import { className, inViewport } from '../utils';
import { Div } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';
import { type PropsWithStyles, type InnerRef } from '../types';

// ==============================
// Menu
// ==============================

type MenuProps = PropsWithStyles & { children: Node, innerProps: Object };
type MenuState = { placement: 'bottom' | 'top' };

const placementToPosition = { bottom: 'top', top: 'bottom' };

export const menuCSS = ({ placement }: MenuState) => ({
  backgroundColor: colors.neutral0,
  boxShadow: `0 0 0 1px ${colors.neutral10a}, 0 4px 11px ${colors.neutral10a}`,
  borderRadius: borderRadius,
  marginBottom: spacing.baseUnit * 2,
  marginTop: spacing.baseUnit * 2,
  position: 'absolute',
  width: '100%',
  zIndex: 1,
  [placementToPosition[placement]]: '100%',
});
const initialState = { placement: 'bottom' };

export class Menu extends Component<MenuProps, MenuState> {
  state = initialState;
  getPlacement = (ref: ElementRef<*>) => {
    if (!ref) return;

    if (!inViewport(ref)) {
      this.setState({ placement: 'top' });
    }
  };
  render() {
    const { children, getStyles, innerProps } = this.props;
    const { placement } = this.state;
    const shouldFlip = placement === 'top';

    return (
      <Div
        className={className('menu', { shouldFlip })}
        css={getStyles('menu', { ...this.props, ...this.state })}
        innerRef={this.getPlacement}
        {...innerProps}
      >
        {children}
      </Div>
    );
  }
}

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
  paddingBottom: spacing.baseUnit,
  paddingTop: spacing.baseUnit,
  position: 'relative', // required for offset[Height, Top] > keyboard scroll
});
export const MenuList = (props: Props) => {
  const { children, getStyles, isMulti, innerProps } = props;
  return (
    <Div
      className={className('menu-list', { isMulti })}
      css={getStyles('menuList', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

// ==============================
// Menu Notices
// ==============================

const noticeCSS = () => ({
  color: colors.neutral40,
  padding: `${spacing.baseUnit * 2}px ${spacing.baseUnit * 3}px`,
  textAlign: 'center',
});
export const noOptionsMessageCSS = noticeCSS;
export const loadingMessageCSS = noticeCSS;

type NoticeProps = PropsWithStyles & {
  children: Node,
  innerProps: { [string]: any },
};

export const NoOptionsMessage = (props: NoticeProps) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div
      className={className(['menu-notice', 'menu-notice--no-options'])}
      css={getStyles('noOptionsMessage', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};
NoOptionsMessage.defaultProps = {
  children: 'No options',
};

export const LoadingMessage = (props: NoticeProps) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div
      className={className(['menu-notice', 'menu-notice--loading'])}
      css={getStyles('loadingMessage', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};
LoadingMessage.defaultProps = {
  children: 'Loading...',
};
