// @flow
import React from 'react';

import { Div } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';

type FocusType = { isDisabled: boolean, isFocused: boolean };

const Control = ({ isDisabled, isFocused, ...props }: FocusType) => (
  <Div
    css={{
      alignItems: 'center',
      backgroundColor: isDisabled
        ? colors.neutral5
        : isFocused ? colors.neutral0 : colors.neutral2,
      borderColor: isDisabled
        ? colors.neutral10
        : isFocused ? colors.primary : colors.neutral20,
      borderRadius: borderRadius,
      borderStyle: 'solid',
      borderWidth: 1,
      boxShadow: isFocused ? `0 0 0 1px ${colors.primary}` : null,
      cursor: 'default',
      display: 'flex ',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      minHeight: spacing.controlHeight,
      outline: '0 !important',
      position: 'relative',
      transition:
        'background-color 100ms, border-color 100ms, box-shadow 100ms',

      '&:hover': {
        borderColor: isFocused ? colors.primary : colors.neutral30,
      },
    }}
    {...props}
  />
);

export default Control;
