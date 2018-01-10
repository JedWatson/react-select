// @flow
import React from 'react';

import { borderRadius, colors, spacing } from '../theme';
import { CrossIcon } from './indicators';
import { Div } from '../primitives';
import { paddingHorizontal } from '../mixins';

type ValueProps = {
  isDisabled?: boolean,
  label: string,
  onRemove: (value: any) => void,
  data: any,
};

const MultiValue = ({
  isDisabled,
  label,
  onRemove,
  data,
  ...props
}: ValueProps) => (
  <Div
    css={{
      backgroundColor: colors.neutral10,
      borderRadius: borderRadius / 2,
      display: 'flex ',
      margin: spacing.baseUnit / 2,
    }}
    {...props}
  >
    <Div
      css={{
        color: colors.text,
        fontSize: '85%',
        padding: 3,
        paddingLeft: 6,
      }}
    >
      {label}
    </Div>
    <Div
      css={{
        alignItems: 'center',
        borderRadius: borderRadius / 2,
        color: colors.textLight,
        display: 'flex ',
        ...paddingHorizontal(spacing.baseUnit),

        ':hover': {
          backgroundColor: colors.dangerLight,
          color: colors.danger,
        },
      }}
      onClick={() => onRemove(data)}
      onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <CrossIcon label={`Remove ${label}`} size={14} />
    </Div>
  </Div>
);

export default MultiValue;
