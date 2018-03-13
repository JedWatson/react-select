// @flow
import React, { Component, type ElementRef, type Node } from 'react';

import {
  animatedScrollTo,
  className,
  getScrollParent,
  getScrollTop,
  normalizedHeight,
  scrollTo,
} from '../utils';
import { Div } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';
import type { InnerRef, MenuPlacement, PropsWithStyles } from '../types';

// ==============================
// Menu
// ==============================

// Get Menu Placement
// ------------------------------

type MenuState = { placement: 'bottom' | 'top' | null, maxHeight: number };
type PlacementArgs = {
  maxHeight: number,
  menuEl: HTMLElement,
  minHeight: number,
  placement: 'bottom' | 'top' | 'auto',
  shouldScroll: boolean,
};

export function getMenuPlacement({
  maxHeight,
  menuEl,
  minHeight,
  placement,
  shouldScroll,
}: PlacementArgs): MenuState {
  const scrollParent = getScrollParent(menuEl);
  const optimisticState = { placement: 'bottom', maxHeight };

  // something went wrong, return optimistic state
  if (!menuEl || !menuEl.offsetParent) return optimisticState;

  // can't trust `scrollParent.scrollHeight` --> it increases when the menu is rendered
  const { height: scrollHeight } = scrollParent.getBoundingClientRect();
  const {
    bottom: menuBottom,
    height: menuHeight,
    top: menuTop,
  } = menuEl.getBoundingClientRect();

  // $FlowFixMe function returns above if there's no offsetParent
  const { top: containerTop } = menuEl.offsetParent.getBoundingClientRect();
  const viewHeight = normalizedHeight(scrollParent);
  const scrollTop = getScrollTop(scrollParent);

  const viewSpaceAbove = containerTop - spacing.menuGutter;
  const viewSpaceBelow = viewHeight - menuTop;
  const scrollSpaceAbove = viewSpaceAbove + scrollTop;
  const scrollSpaceBelow = scrollHeight - scrollTop - menuTop;

  const scrollDown = menuBottom - viewHeight + scrollTop + spacing.menuGutter;
  const scrollUp = scrollTop + menuTop - spacing.menuGutter;
  const scrollDuration = 160;

  switch (placement) {
    case 'auto':
    case 'bottom':
      // 1: the menu will fit, do nothing
      if (viewSpaceBelow >= menuHeight) {
        return { placement: 'bottom', maxHeight };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceBelow >= menuHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        return { placement: 'bottom', maxHeight };
      }

      // 3: the menu will fit, if constrained
      if (scrollSpaceBelow >= minHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        const constrainedHeight = scrollSpaceBelow - spacing.menuGutter;

        return {
          placement: 'bottom',
          maxHeight: constrainedHeight,
        };
      }

      // 4. Forked beviour when there isn't enough space below

      // AUTO: flip the menu, render above
      if (placement === 'auto') {
        return { placement: 'top', maxHeight };
      }

      // BOTTOM: allow browser to increase scrollable area and immediately set scroll
      if (placement === 'bottom') {
        scrollTo(scrollParent, scrollDown);
        return { placement: 'bottom', maxHeight };
      }
      break;
    case 'top':
      // 1: the menu will fit, do nothing
      if (viewSpaceAbove >= menuHeight) {
        return { placement: 'top', maxHeight };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceAbove >= menuHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return { placement: 'top', maxHeight };
      }

      // 3: the menu will fit, if constrained
      if (scrollSpaceAbove >= minHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        const constrainedHeight = scrollSpaceAbove - spacing.menuGutter;

        return {
          placement: 'top',
          maxHeight: constrainedHeight,
        };
      }

      // 4. not enough space, the browser WILL NOT increase scrollable area when
      // absolutely positioned element rendered above the viewport (only below).
      // Flip the menu, render below
      return { placement: 'bottom', maxHeight };
    default:
      throw new Error(`Invalid placement provided "${placement}".`);
  }

  // fulfil contract with flow: implicit return value of undefined
  return optimisticState;
}

// Menu Component
// ------------------------------

export type MenuProps = PropsWithStyles & {
  /** The children to be rendered. */
  children: Node,
  /** Props to be passed to the menu wrapper. */
  innerProps: Object,
  /** Set the maximum height of the menu. */
  maxMenuHeight: number,
  /** Set whether the menu should be at the top, at the bottom. The auto options sets it to bottom. */
  menuPlacement: MenuPlacement,
  /** Set the minimum height of the menu. */
  minMenuHeight: number,
  /** Set whether the page should scroll to show the menu. */
  scrollMenuIntoView: boolean,
};

function alignToControl(placement) {
  const placementToCSSProp = { bottom: 'top', top: 'bottom' };
  return placement ? placementToCSSProp[placement] : 'bottom';
}
const coercePlacement = p => (p === 'auto' ? 'bottom' : p);

export const menuCSS = ({ maxHeight, placement }: MenuState) => ({
  [alignToControl(placement)]: '100%',
  backgroundColor: colors.neutral0,
  boxShadow: `0 0 0 1px ${colors.neutral10a}, 0 4px 11px ${colors.neutral10a}`,
  borderRadius: borderRadius,
  marginBottom: spacing.menuGutter,
  marginTop: spacing.menuGutter,
  maxHeight: maxHeight,
  position: 'absolute',
  width: '100%',
  zIndex: 1,
});

export class Menu extends Component<MenuProps, MenuState> {
  state = {
    maxHeight: this.props.maxMenuHeight,
    placement: null,
  };
  getPlacement = (ref: ElementRef<*>) => {
    const {
      minMenuHeight,
      maxMenuHeight,
      menuPlacement,
      scrollMenuIntoView,
    } = this.props;

    if (!ref) return;

    const state = getMenuPlacement({
      maxHeight: maxMenuHeight,
      menuEl: ref,
      minHeight: minMenuHeight,
      placement: menuPlacement,
      shouldScroll: scrollMenuIntoView,
    });

    this.setState(state);
  };
  getState = () => {
    const { menuPlacement } = this.props;
    const placement = this.state.placement || coercePlacement(menuPlacement);

    return { ...this.props, placement, maxHeight: this.state.maxHeight };
  };
  render() {
    const { children, getStyles, innerProps } = this.props;

    return (
      <Div
        className={className('menu')}
        css={getStyles('menu', this.getState())}
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
  /** Set classname for isMulti */
  isMulti: boolean,
  /* I do not know what this is - Ben */
  maxHeight: number,
};

export type MenuListProps = {
  /** The children to be rendered. */
  children: Node,
  /** Props to be passed to the wrapper component. */
  innerProps: {
    'aria-multiselectable': boolean,
    id: string,
    innerRef: InnerRef,
    role: 'listbox',
  },
};
export type MenuListComponentProps = PropsWithStyles & MenuListProps & MenuListState;
export const menuListCSS = () => ({
  maxHeight: 'inherit', // pixel max-height applied to wrapping Menu component
  overflowY: 'auto',
  paddingBottom: spacing.baseUnit,
  paddingTop: spacing.baseUnit,
  position: 'relative', // required for offset[Height, Top] > keyboard scroll
  WebkitOverflowScrolling: 'touch',
});
export const MenuList = (props: MenuListComponentProps) => {
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

export type NoticeProps = PropsWithStyles & {
  /** The children to be rendered. */
  children: Node,
  /** Props to be passed on to the wrapper. */
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
