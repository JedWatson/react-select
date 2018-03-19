// @flow
import React, { type Node } from 'react';

import { className } from '../utils';
import { colors, spacing } from '../theme';
import { Div } from '../primitives';
import { type PropsWithStyles, type InnerRef } from '../types';

type State = {
  /** Wether the option is disabled. */
  isDisabled: boolean,
  /** Wether the option is focused. */
  isFocused: boolean,
  /** Whether the option is selected. */
  isSelected: boolean,
};
type InnerProps = {
  'aria-selected': boolean,
  id: string,
  innerRef: InnerRef,
  key: string,
  onClick: MouseEventHandler,
  onMouseOver: MouseEventHandler,
  role: 'option',
  tabIndex: number,
};
export type OptionProps = PropsWithStyles &
  State & {
    /** The children to be rendered. */
    children: Node,
    /** props passed to the wrapping element for the group. */
    innerProps: InnerProps,
    /* Text to be displayed representing the option. */
    label: string,
    /* Type is used by the menu to determine whether this is an option or a group.
    In the case of option this is always `option`. */
    type: 'option',
  };

export const css = ({ isDisabled, isFocused, isSelected }: State) => ({
  backgroundColor: isSelected
    ? colors.primary
    : isFocused ? colors.primary25 : 'transparent',
  color: isDisabled
    ? colors.neutral20
    : isSelected ? colors.neutral0 : 'inherit',
  cursor: 'default',
  display: 'block',
  fontSize: 'inherit',
  padding: `${spacing.baseUnit * 2}px ${spacing.baseUnit * 3}px`,
  width: '100%',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

  // provide some affordance on touch devices
  ':active': {
    backgroundColor: isSelected ? colors.primary : colors.primary50,
  },
});

const Option = (props: OptionProps) => {
  const { children, getStyles, isFocused, isSelected, innerProps } = props;

  return (
    <Div
      className={className('option', { isFocused, isSelected })}
      css={getStyles('option', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

export default Option;
