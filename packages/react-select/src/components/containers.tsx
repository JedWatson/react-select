/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/react';
import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
  OptionBase,
} from '../types';

// ==============================
// Root Container
// ==============================

export interface ContainerProps<
  Option extends OptionBase = OptionBase,
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
  Option extends OptionBase,
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
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ContainerProps<Option, IsMulti, Group>
) => {
  const { children, className, cx, getStyles, innerProps, isDisabled, isRtl } =
    props;
  return (
    <div
      css={getStyles('container', props)}
      className={cx(
        {
          '--is-disabled': isDisabled,
          '--is-rtl': isRtl,
        },
        className
      )}
      {...innerProps}
      // this should tell JAWS not treat the component as a custom widget
      // and not intercept keyboard events
      role="application"
    >
      {children}
    </div>
  );
};

// ==============================
// Value Container
// ==============================

export interface ValueContainerProps<
  Option extends OptionBase = OptionBase,
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
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  theme: { spacing },
}: ValueContainerProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',
  padding: `${spacing.baseUnit / 2}px ${spacing.baseUnit * 2}px`,
  WebkitOverflowScrolling: 'touch',
  position: 'relative',
  overflow: 'hidden',
});
export const ValueContainer = <
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ValueContainerProps<Option, IsMulti, Group>
) => {
  const { children, className, cx, innerProps, isMulti, getStyles, hasValue } =
    props;

  return (
    <div
      css={getStyles('valueContainer', props)}
      className={cx(
        {
          'value-container': true,
          'value-container--is-multi': isMulti,
          'value-container--has-value': hasValue,
        },
        className
      )}
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
  Option extends OptionBase = OptionBase,
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
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: IndicatorsContainerProps<Option, IsMulti, Group>
) => {
  const { children, className, cx, innerProps, getStyles } = props;

  return (
    <div
      css={getStyles('indicatorsContainer', props)}
      className={cx(
        {
          indicators: true,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};
