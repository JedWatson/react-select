// @flow
import React, { Component, type Node } from 'react';

import { borderRadius, colors, spacing } from '../theme';
import { CrossIcon } from './indicators';
import { Div } from '../primitives';
import type { CommonProps, OptionType, ActionMeta } from '../types';

type LabelProps = { cropWithEllipsis: boolean };
export type ValueProps = LabelProps & {
  children: Node,
  components: any,
  innerProps: any,
  onClick?: (OptionType, ActionMeta) => void,
  isFocused: boolean,
  isDisabled: boolean,
  removeProps: {
    onClick: any => void,
    onMouseDown: any => void,
  },
  valueProps: {
    onClick?: (OptionType, ActionMeta) => void,
    onMouseDown: any => void,
  },
  data: OptionType,
};
export type MultiValueProps = CommonProps & ValueProps;

export const multiValueCSS = ({ isFocused, valueProps }: MultiValueProps) => ({
  backgroundColor: isFocused && typeof valueProps.onClick === 'function' ? colors.dangerLight : colors.neutral10,
  borderRadius: borderRadius / 2,
  display: 'flex',
  margin: spacing.baseUnit / 2,
  minWidth: 0, // resolves flex/text-overflow bug
});
export const multiValueLabelCSS = ({ cropWithEllipsis, valueProps }: MultiValueProps) => ({
  color: colors.text,
  fontSize: '85%',
  overflow: 'hidden',
  padding: 3,
  paddingLeft: 6,
  textOverflow: cropWithEllipsis ? 'ellipsis' : null,
  whiteSpace: 'nowrap',
  ':hover': {
    backgroundColor: typeof valueProps.onClick === 'function' ? colors.dangerLight: colors.neutral10,
    color: typeof valueProps.onClick === 'function' && colors.danger
  }
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
  handleOnClick = (event: SyntheticEvent<*>) => {
    const { valueProps, data } = this.props;
    if (valueProps.onClick) {
      valueProps.onClick(data, { action: 'focused-value-clicked' });
    }
    return;
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
      valueProps,
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
        onClick={this.handleOnClick}
        onMouseDown={valueProps.onMouseDown}
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
