// @flow
import React, { Component, type Node } from 'react';
import { css } from 'emotion';

import { borderRadius, colors, spacing } from '../theme';
import { CrossIcon } from './indicators';
import { Div } from '../primitives';
import type { CommonProps } from '../types';

type LabelProps = { cropWithEllipsis: boolean };
export type ValueProps = LabelProps & {
  children: Node,
  components: any,
  innerProps: any,
  isFocused: boolean,
  isDisabled: boolean,
  removeProps: {
    onTouchEnd: any => void,
    onClick: any => void,
    onMouseDown: any => void,
  },
};
export type MultiValueProps = CommonProps & ValueProps;

export const multiValueCSS = () => ({
  backgroundColor: colors.neutral10,
  borderRadius: borderRadius / 2,
  display: 'flex',
  margin: spacing.baseUnit / 2,
  minWidth: 0, // resolves flex/text-overflow bug
});
export const multiValueLabelCSS = ({ cropWithEllipsis }: MultiValueProps) => ({
  color: colors.text,
  fontSize: '85%',
  overflow: 'hidden',
  padding: 3,
  paddingLeft: 6,
  textOverflow: cropWithEllipsis ? 'ellipsis' : null,
  whiteSpace: 'nowrap',
});
export const multiValueRemoveCSS = ({ isFocused }: MultiValueProps) => ({
  alignItems: 'center',
  borderRadius: borderRadius / 2,
  backgroundColor: isFocused && colors.dangerLight,
  display: 'flex',
  paddingLeft: spacing.baseUnit,
  paddingRight: spacing.baseUnit,
  ':hover': {
    backgroundColor: colors.dangerLight,
    color: colors.danger,
  },
});

export const MultiValueContainer = Div;
export const MultiValueLabel = Div;
export type MultiValueRemoveProps = CommonProps & {
  children: Node,
  innerProps: any,
  removeProps: {
    onTouchEnd: any => void,
    onClick: any => void,
    onMouseDown: any => void,
  },
};
export class MultiValueRemove extends Component<MultiValueRemoveProps> {
  static defaultProps = {
    children: <CrossIcon size={14} />,
  };
  render() {
    const { children, ...props } = this.props;
    return <Div {...props}>{children}</Div>;
  }
}

class MultiValue extends Component<MultiValueProps> {
  static defaultProps = {
    cropWithEllipsis: true,
  }
  render () {
    const {
      children,
      className,
      components,
      cx,
      getStyles,
      innerProps,
      isDisabled,
      removeProps,
    } = this.props;
    const cn = {
      container: cx(
        css(getStyles('multiValue', this.props)),
        {
          'multi-value': true,
          'multi-value--is-disabled': isDisabled
        }, className),
      label: cx(
        css(getStyles('multiValueLabel', this.props)),
        {
          'multi-value__label': true,
        }, className),
      remove: cx(
        css(getStyles('multiValueRemove', this.props),), {
          'multi-value__remove': true,
        }, className),
    };
    const { Container, Label, Remove } = components;

    return (
      <Container
        className={cn.container}
        {...innerProps}
        >
        <Label className={cn.label}>
          {children}
        </Label>
        <Remove className={cn.remove} {...removeProps} />
      </Container>
    );
  }
}

export default MultiValue;
