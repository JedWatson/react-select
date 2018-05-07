// @flow
import React, { Component, type Node } from 'react';

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
      components,
      cx,
      getStyles,
      innerProps,
      isDisabled,
      removeProps,
    } = this.props;
    const cn = {
      container: cx('multi-value', { isDisabled }),
      label: cx('multi-value__label'),
      remove: cx('multi-value__remove'),
    };
    const css = {
      container: getStyles('multiValue', this.props),
      label: getStyles('multiValueLabel', this.props),
      remove: getStyles('multiValueRemove', this.props),
    };
    const { Container, Label, Remove } = components;

    return (
      <Container
        className={cn.container}
        css={css.container}
        {...innerProps}
        >
        <Label className={cn.label} css={css.label}>
          {children}
        </Label>
        <Remove className={cn.remove} css={css.remove} {...removeProps} />
      </Container>
    );
  }
}

export default MultiValue;
