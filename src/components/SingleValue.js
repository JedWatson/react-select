// @flow
import React from 'react';

import { Div } from '../primitives';
import { colors, spacing } from '../theme';
import type { CommonProps, ActionMeta, OptionType } from '../types';

type State = {
  /** Whether this is disabled */
  isDisabled: boolean,
};
type ValueProps = {
  /** The children to be rendered. */
  children: string,
  /* The data of the selected option rendered in the Single Value componentn */
  data: any,
  /** Props passed to the wrapping element for the group. */
  innerProps: any,
  valueProps: {
    onClick: (OptionType, ActionMeta) => void,
    onMouseDown: any => void,
  }
};
export type SingleValueProps = CommonProps & ValueProps & State;

export const css = ({ isDisabled, valueProps }: SingleValueProps) => ({
  color: isDisabled ? colors.neutral40 : colors.text,
  borderBottom: valueProps.onClick && '2px dotted',
  marginLeft: spacing.baseUnit / 2,
  marginRight: spacing.baseUnit / 2,
  maxWidth: `calc(100% - ${spacing.baseUnit * 2}px)`,
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  top: '50%',
  transform: 'translateY(-50%)',
  ':hover': {
    color: valueProps.onClick && colors.primary,
    cursor: valueProps.onClick && 'pointer',
  }
});

const SingleValue = (props: SingleValueProps) => {
  const { children, cx, getStyles, isDisabled, innerProps, valueProps } = props;
  return (
    <Div
      className={cx('single-value', { isDisabled })}
      css={getStyles('singleValue', props)}
      {...innerProps}
      {...valueProps}
    >
      {children}
    </Div>
  );
};

export default SingleValue;
