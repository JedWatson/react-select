// @flow
import React from 'react';

import { borderRadius, colors, spacing } from '../theme';
import { className } from '../utils';
import { CrossIcon } from './indicators';
import { Div } from '../primitives';
import { paddingHorizontal } from '../mixins';
import { type PropsWithStyles } from '../types';

export type ValueProps = {
  children: Node,
  components: any,
  innerProps: any,
  isDisabled: boolean,
  removeProps: {
    onClick: any => void,
    onMouseDown: any => void,
  },
};
type Props = PropsWithStyles & ValueProps;

export const multiValueCSS = () => ({
  backgroundColor: colors.neutral10,
  borderRadius: borderRadius / 2,
  display: 'flex ',
  margin: spacing.baseUnit / 2,
  minWidth: 0, // resolves flex/text-overflow bug
});
export const multiValueLabelCSS = () => ({
  color: colors.text,
  fontSize: '85%',
  overflow: 'hidden',
  padding: 3,
  paddingLeft: 6,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});
export const multiValueRemoveCSS = () => ({
  alignItems: 'center',
  borderRadius: borderRadius / 2,
  color: colors.textLight,
  display: 'flex ',
  ...paddingHorizontal(spacing.baseUnit),

  ':hover': {
    backgroundColor: colors.dangerLight,
    color: colors.danger,
  },
});

export const MultiValueContainer = Div;
export const MultiValueLabel = Div;
export const MultiValueRemove = Div;

const MultiValue = (props: Props) => {
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

export default MultiValue;
