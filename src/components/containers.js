// @flow
import React, { Component } from 'react';

import { Div } from '../primitives';
import { paddingHorizontal, paddingVertical } from '../mixins';
import { spacing } from '../theme';

type SelectContainerProps = { isDisabled: boolean };
export const SelectContainer = ({
  isDisabled,
  ...props
}: SelectContainerProps) => (
  <Div
    css={{
      // cancel mouse events when disabled
      pointerEvents: isDisabled ? 'none' : 'initial',
      position: 'relative',
    }}
    {...props}
  />
);

type ValueContainerProps = {
  isMulti: boolean,
  hasValue: boolean,
  maxHeight: number,
};
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
    if (this.shouldScrollBottom) {
      this.node.scrollTop = this.node.scrollHeight;
    }
  }
  getScrollContainer = (ref: HTMLElement) => {
    this.node = ref;
  };
  render() {
    const { isMulti, hasValue, maxHeight, ...props } = this.props;

    return (
      <Div
        innerRef={isMulti ? this.getScrollContainer : null}
        css={{
          alignItems: 'baseline',
          display: 'flex ',
          flex: 1,
          flexWrap: 'wrap',
          maxHeight: maxHeight, // max-height allows scroll when multi
          overflowY: 'auto',
          ...paddingHorizontal(spacing.baseUnit * 2),
          ...paddingVertical(spacing.baseUnit / 2),
        }}
        {...props}
      />
    );
  }
}

export const IndicatorsContainer = (props: any) => (
  <Div
    css={{
      display: 'flex ',
      flexShrink: 0,
    }}
    {...props}
  />
);
