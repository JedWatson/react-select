// @flow
import React, { type Node, Component } from 'react';

import { className } from '../utils';
import { Div } from '../primitives';
import { paddingHorizontal, paddingVertical } from '../mixins';
import { spacing } from '../theme';
import { type PropsWithStyles, type KeyboardEventHandler } from '../types';

// ==============================
// Root Container
// ==============================

type ContainerState = { isDisabled: boolean };
type ContainerProps = PropsWithStyles &
  ContainerState & {
    children: Node,
    innerProps: { onKeyDown: KeyboardEventHandler },
  };
export const containerCSS = ({ isDisabled }: ContainerState) => ({
  pointerEvents: isDisabled ? 'none' : 'initial', // cancel mouse events when disabled
  position: 'relative',
});
export const SelectContainer = (props: ContainerProps) => {
  const { children, getStyles, isDisabled, innerProps } = props;
  return (
    <Div
      css={getStyles('container', props)}
      className={className('container', { isDisabled })}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

// ==============================
// Value Container
// ==============================

type ValueContainerProps = PropsWithStyles & {
  isMulti: boolean,
  hasValue: boolean,
  maxHeight: number,
};
export const valueContainerCSS = ({ maxHeight }: ValueContainerProps) => ({
  alignItems: 'baseline',
  display: 'flex ',
  flex: 1,
  flexWrap: 'wrap',
  maxHeight: maxHeight, // max-height allows scroll when multi
  overflowY: 'auto',
  ...paddingHorizontal(spacing.baseUnit * 2),
  ...paddingVertical(spacing.baseUnit / 2),
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
    if (this.shouldScrollBottom) {
      this.node.scrollTop = this.node.scrollHeight;
    }
  }
  getScrollContainer = (ref: HTMLElement) => {
    this.node = ref;
  };
  render() {
    const {
      isMulti,
      getStyles,
      hasValue,
      maxHeight, // Unused var: invalid DOM attribute, React will warn if not removed
      ...cleanProps
    } = this.props;

    return (
      <Div
        innerRef={isMulti ? this.getScrollContainer : null}
        className={className('value-container', { isMulti, hasValue })}
        css={getStyles('valueContainer', this.props)}
        {...cleanProps}
      />
    );
  }
}

// ==============================
// Indicator Container
// ==============================

export const indicatorsContainerCSS = () => ({
  display: 'flex ',
  flexShrink: 0,
});
export const IndicatorsContainer = ({
  getStyles,
  ...props
}: PropsWithStyles) => {
  return (
    <Div
      className={className('indicators')}
      css={getStyles('indicatorsContainer', props)}
      {...props}
    />
  );
};
