/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/react';
import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';
import { getStyleProps } from '../utils';

// ==============================
// Root Container
// ==============================

export interface ContainerProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** Whether the select is disabled. */
  isDisabled: boolean;
  isFocused: boolean;
  /** The children to be rendered. */
  children: ReactNode;
  /** Inner props to be passed down to the container. */
  innerProps: JSX.IntrinsicElements['div'];
}
export const containerCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  isDisabled,
  isRtl,
}: ContainerProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  label: 'container',
  direction: isRtl ? 'rtl' : undefined,
  pointerEvents: isDisabled ? 'none' : undefined, // cancel mouse events when disabled
  position: 'relative',
});
export const SelectContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ContainerProps<Option, IsMulti, Group>
) => {
  const { children, innerProps, isDisabled, isRtl } = props;
  return (
    <div
      {...getStyleProps(props, 'container', {
        '--is-disabled': isDisabled,
        '--is-rtl': isRtl,
      })}
      {...innerProps}
    >
      {children}
    </div>
  );
};

// ==============================
// Value Container
// ==============================

export interface ValueContainerProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** Props to be passed to the value container element. */
  innerProps?: JSX.IntrinsicElements['div'];
  /** The children to be rendered. */
  children: ReactNode;
  isDisabled: boolean;
}
export const valueContainerCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    theme: { spacing },
    isMulti,
    hasValue,
    selectProps: { controlShouldRenderValue },
  }: ValueContainerProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => ({
  alignItems: 'center',
  display: isMulti && hasValue && controlShouldRenderValue ? 'flex' : 'grid',
  flex: 1,
  flexWrap: 'wrap',
  WebkitOverflowScrolling: 'touch',
  position: 'relative',
  overflow: 'hidden',
  ...(unstyled
    ? {}
    : {
        padding: `${spacing.baseUnit / 2}px ${spacing.baseUnit * 2}px`,
      }),
});
export const ValueContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ValueContainerProps<Option, IsMulti, Group>
) => {
  const { children, innerProps, isMulti, hasValue } = props;

  return (
    <div
      {...getStyleProps(props, 'valueContainer', {
        'value-container': true,
        'value-container--is-multi': isMulti,
        'value-container--has-value': hasValue,
      })}
      {...innerProps}
    >
      {children}
    </div>
  );
};

// ==============================
// Indicator Container
// ==============================

export interface IndicatorsContainerProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  isDisabled: boolean;
  /** The children to be rendered. */
  children: ReactNode;
  /** Props to be passed to the indicators container element. */
  innerProps?: {};
}

export const indicatorsContainerCSS = (): CSSObjectWithLabel => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  flexShrink: 0,
});
export const IndicatorsContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: IndicatorsContainerProps<Option, IsMulti, Group>
) => {
  const { children, innerProps } = props;

  return (
    <div
      {...getStyleProps(props, 'indicatorsContainer', {
        indicators: true,
      })}
      {...innerProps}
    >
      {children}
    </div>
  );
};
