// @flow
import React from 'react';

import { borderRadius, colors, spacing } from '../theme';
import { className } from '../utils';
import { CrossIcon } from './indicators';
import { Div } from '../primitives';
import { type PropsWithStyles } from '../types';

type LabelProps = { cropWithEllipsis: boolean };
export type ValueProps = LabelProps & {
  children: Node,
  components: any,
  innerProps: any,
  isDisabled: boolean,
  removeProps: {
    onClick: any => void,
    onMouseDown: any => void,
  },
};
export type MultiValueProps = PropsWithStyles & ValueProps;

export const multiValueCSS = () => ({
  backgroundColor: colors.neutral10,
  borderRadius: borderRadius / 2,
  display: 'flex ',
  margin: spacing.baseUnit / 2,
  minWidth: 0, // resolves flex/text-overflow bug
});
export const multiValueLabelCSS = ({ cropWithEllipsis }: LabelProps) => ({
  color: colors.text,
  fontSize: '85%',
  overflow: 'hidden',
  padding: 3,
  paddingLeft: 6,
  textOverflow: cropWithEllipsis ? 'ellipsis' : null,
  whiteSpace: 'nowrap',
});
export const multiValueRemoveCSS = () => ({
  alignItems: 'center',
  borderRadius: borderRadius / 2,
  color: colors.textLight,
  display: 'flex ',
  paddingLeft: spacing.baseUnit,
  paddingRight: spacing.baseUnit,

  ':hover': {
    backgroundColor: colors.dangerLight,
    color: colors.danger,
  },
});

export const MultiValueContainer = Div;
export const MultiValueLabel = Div;
export const MultiValueRemove = Div;

const MultiValue = (props: MultiValueProps) => {
  const {
    children,
    components,
    getStyles,
    innerProps,
    isDisabled,
    removeProps,
  } = props;
  const cn = {
    container: className('multi-value', { isDisabled }),
    label: className('multi-value__label'),
    remove: className('multi-value__remove'),
  };
  const css = {
    container: getStyles('multiValue', props),
    label: getStyles('multiValueLabel', props),
    remove: getStyles('multiValueRemove', props),
  };
  const { Container, Label, Remove } = components;

  return (
    <Container className={cn.container} css={css.container} {...innerProps}>
      <Label className={cn.label} css={css.label}>
        {children}
      </Label>
      <Remove className={cn.remove} css={css.remove} {...removeProps}>
        <CrossIcon size={14} />
      </Remove>
    </Container>
  );
};
MultiValue.defaultProps = {
  cropWithEllipsis: true,
};

export default MultiValue;
