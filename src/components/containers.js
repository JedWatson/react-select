// @flow
import React, { Component, type Node, type ElementRef } from 'react';

import { Div } from '../primitives';
import { spacing } from '../theme';
import type { CommonProps, KeyboardEventHandler } from '../types';

// ==============================
// Root Container
// ==============================

type ContainerState = {
  /** Whether the select is disabled. */
  isDisabled: boolean,
  /** Whether the text in the select is indented from right to left. */
  isRtl: boolean,
};

export type ContainerProps = CommonProps &
  ContainerState & {
    /** The children to be rendered. */
    children: Node,
    /** Inner props to be passed down to the container. */
    innerProps: { onKeyDown: KeyboardEventHandler },
  };
export const containerCSS = ({ isDisabled, isRtl }: ContainerState) => ({
  direction: isRtl ? 'rtl' : null,
  pointerEvents: isDisabled ? 'none' : null, // cancel mouse events when disabled
  position: 'relative',
});
export const SelectContainer = (props: ContainerProps) => {
  const { children, cx, getStyles, innerProps, isDisabled, isRtl } = props;
  return (
    <Div
      css={getStyles('container', props)}
      className={cx('container', { isDisabled, isRtl })}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

// ==============================
// Value Container
// ==============================

export type ValueContainerProps = CommonProps & {
  /** Set when the value container should hold multiple values. This is important for styling. */
  isMulti: boolean,
  /** Whether the value container currently holds a value. */
  hasValue: boolean,
  /** Whether there should be a maximum height to the container */
  maxHeight: number,
  /** The children to be rendered. */
  children: Node,
};
export const valueContainerCSS = ({ maxHeight }: ValueContainerProps) => ({
  alignItems: 'center',
  display: 'flex ',
  flex: 1,
  flexWrap: 'wrap',
  maxHeight: maxHeight, // max-height allows scroll when multi
  overflowY: 'auto',
  padding: `${spacing.baseUnit / 2}px ${spacing.baseUnit * 2}px`,
  WebkitOverflowScrolling: 'touch',
});
export class ValueContainer extends Component<ValueContainerProps> {
  shouldScrollBottom: boolean = false;
  node: HTMLElement;
  componentWillUpdate() {
    if (!this.props.isMulti) return;

    // scroll only if the user was already at the bottom
    const total = this.node.scrollTop + this.node.offsetHeight;
    this.shouldScrollBottom = total === this.node.scrollHeight;
  }
  componentDidUpdate() {
    if (!this.props.isMulti) return;

    // ensure we're showing items being added by forcing scroll to the bottom
    if (this.shouldScrollBottom && this.node) {
      this.node.scrollTop = this.node.scrollHeight;
    }
  }
  getScrollContainer = (ref: ElementRef<*>) => {
    this.node = ref;
  };
  render() {
    const { children, cx, isMulti, getStyles, hasValue } = this.props;

    return (
      <Div
        innerRef={isMulti ? this.getScrollContainer : undefined}
        className={cx('value-container', { isMulti, hasValue })}
        css={getStyles('valueContainer', this.props)}
      >
        {children}
      </Div>
    );
  }
}

// ==============================
// Indicator Container
// ==============================

type IndicatorsState = {
  /** Whether the text should be rendered right to left. */
  isRtl: boolean,
};

export type IndicatorContainerProps = CommonProps &
  IndicatorsState & {
    /** The children to be rendered. */
    children: Node,
  };

export const indicatorsContainerCSS = () => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex ',
  flexShrink: 0,
});
export const IndicatorsContainer = (props: IndicatorContainerProps) => {
  const { children, cx, getStyles } = props;

  return (
    <Div
      className={cx('indicators')}
      css={getStyles('indicatorsContainer', props)}
    >
      {children}
    </Div>
  );
};
