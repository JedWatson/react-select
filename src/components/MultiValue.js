// @flow
import React from 'react';

import { borderRadius, colors, spacing } from '../theme';
import { className } from '../utils';
import { CrossIcon } from './indicators';
import { Div } from '../primitives';
import { paddingHorizontal } from '../mixins';
import { type PropsWithStyles } from '../types';

export type ValueProps = {
  components: any,
  data: any,
  isDisabled: boolean,
  label: string,
  onRemoveClick: any => void,
  onRemoveMouseDown: any => void,
};
type Props = PropsWithStyles & ValueProps;

export const multiValueCSS = () => ({
  backgroundColor: colors.neutral10,
  borderRadius: borderRadius / 2,
  display: 'flex ',
  margin: spacing.baseUnit / 2,
});
export const multiValueLabelCSS = () => ({
  color: colors.text,
  fontSize: '85%',
  padding: 3,
  paddingLeft: 6,
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

export const MultiValueLabel = Div;
export const MultiValueRemove = Div;

const MultiValue = ({ getStyles, ...props }: Props) => {
  const {
    components,
    data,
    isDisabled,
    label,
    onRemoveClick,
    onRemoveMouseDown,
    ...cleanProps
  } = props;
  const cn = {
    root: className('multi-value', { isDisabled }),
    label: className('multi-value__label'),
    remove: className('multi-value__remove'),
  };
  const css = {
    root: getStyles('multiValue', props),
    label: getStyles('multiValueLabel', props),
    remove: getStyles('multiValueRemove', props),
  };
  const { Label, Remove } = components;

  return (
    <Div className={cn.root} css={css.root} {...cleanProps}>
      <Label className={cn.label} css={css.label}>
        {label}
      </Label>
      <Remove
        className={cn.remove}
        css={css.remove}
        onClick={onRemoveClick}
        onMouseDown={onRemoveMouseDown}
      >
        <CrossIcon label={`Remove ${label}`} size={14} />
      </Remove>
    </Div>
  );
};

export default MultiValue;
