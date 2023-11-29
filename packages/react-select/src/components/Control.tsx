/** @jsx jsx */
import { ReactNode, Ref } from 'react';
import { jsx } from '@emotion/react';

import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';
import { getStyleProps } from '../utils';

export interface ControlProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** Children to render. */
  children: ReactNode;
  innerRef: Ref<HTMLDivElement>;
  /** The mouse down event and the innerRef to pass down to the controller element. */
  innerProps: JSX.IntrinsicElements['div'];
  /** Whether the select is disabled. */
  isDisabled: boolean;
  /** Whether the select is focused. */
  isFocused: boolean;
  /** Whether the select is expanded. */
  menuIsOpen: boolean;
}

export const css = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    isDisabled,
    isFocused,
    theme: { colors, borderRadius, spacing },
  }: ControlProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => ({
  label: 'control',
  alignItems: 'center',
  cursor: 'default',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  minHeight: spacing.controlHeight,
  outline: '0 !important',
  position: 'relative',
  transition: 'all 100ms',
  ...(unstyled
    ? {}
    : {
        backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
        borderColor: isDisabled
          ? colors.neutral10
          : isFocused
          ? colors.primary
          : colors.neutral20,
        borderRadius: borderRadius,
        borderStyle: 'solid',
        borderWidth: 1,
        boxShadow: isFocused ? `0 0 0 1px ${colors.primary}` : undefined,
        '&:hover': {
          borderColor: isFocused ? colors.primary : colors.neutral30,
        },
      }),
});

const Control = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ControlProps<Option, IsMulti, Group>
) => {
  const { children, isDisabled, isFocused, innerRef, innerProps, menuIsOpen } =
    props;
  return (
    <div
      ref={innerRef}
      {...getStyleProps(props, 'control', {
        control: true,
        'control--is-disabled': isDisabled,
        'control--is-focused': isFocused,
        'control--menu-is-open': menuIsOpen,
      })}
      {...innerProps}
      aria-disabled={isDisabled || undefined}
    >
      {children}
    </div>
  );
};

export default Control;
