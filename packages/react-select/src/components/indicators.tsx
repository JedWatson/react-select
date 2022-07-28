/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx, keyframes } from '@emotion/react';

import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';

// ==============================
// Dropdown & Clear Icons
// ==============================

const Svg = ({
  size,
  ...props
}: JSX.IntrinsicElements['svg'] & { size: number }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 20 20"
    aria-hidden="true"
    focusable="false"
    css={{
      display: 'inline-block',
      fill: 'currentColor',
      lineHeight: 1,
      stroke: 'currentColor',
      strokeWidth: 0,
    }}
    {...props}
  />
);

export type CrossIconProps = JSX.IntrinsicElements['svg'] & { size?: number };
export const CrossIcon = (props: CrossIconProps) => (
  <Svg size={20} {...props}>
    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
  </Svg>
);
export type DownChevronProps = JSX.IntrinsicElements['svg'] & { size?: number };
export const DownChevron = (props: DownChevronProps) => (
  <Svg size={20} {...props}>
    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
  </Svg>
);

// ==============================
// Dropdown & Clear Buttons
// ==============================

export interface DropdownIndicatorProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** The children to be rendered inside the indicator. */
  children?: ReactNode;
  /** Props that will be passed on to the children. */
  innerProps: JSX.IntrinsicElements['div'];
  /** The focused state of the select. */
  isFocused: boolean;
  isDisabled: boolean;
}

const baseCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  isFocused,
  theme: {
    spacing: { baseUnit },
    colors,
  },
}:
  | DropdownIndicatorProps<Option, IsMulti, Group>
  | ClearIndicatorProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  label: 'indicatorContainer',
  color: isFocused ? colors.neutral60 : colors.neutral20,
  display: 'flex',
  padding: baseUnit * 2,
  transition: 'color 150ms',

  ':hover': {
    color: isFocused ? colors.neutral80 : colors.neutral40,
  },
});

export const dropdownIndicatorCSS = baseCSS;
export const DropdownIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  const { children, className, cx, getStyles, innerProps } = props;
  return (
    <div
      css={getStyles('dropdownIndicator', props)}
      className={cx(
        {
          indicator: true,
          'dropdown-indicator': true,
        },
        className
      )}
      {...innerProps}
    >
      {children || <DownChevron />}
    </div>
  );
};

export interface ClearIndicatorProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** The children to be rendered inside the indicator. */
  children?: ReactNode;
  /** Props that will be passed on to the children. */
  innerProps: JSX.IntrinsicElements['div'];
  /** The focused state of the select. */
  isFocused: boolean;
}

export const clearIndicatorCSS = baseCSS;
export const ClearIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => {
  const { children, className, cx, getStyles, innerProps } = props;
  return (
    <div
      css={getStyles('clearIndicator', props)}
      className={cx(
        {
          indicator: true,
          'clear-indicator': true,
        },
        className
      )}
      {...innerProps}
    >
      {children || <CrossIcon />}
    </div>
  );
};

// ==============================
// Separator
// ==============================

export interface IndicatorSeparatorProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  isDisabled: boolean;
  isFocused: boolean;
  innerProps?: JSX.IntrinsicElements['span'];
}

export const indicatorSeparatorCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  isDisabled,
  theme: {
    spacing: { baseUnit },
    colors,
  },
}: IndicatorSeparatorProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  label: 'indicatorSeparator',
  alignSelf: 'stretch',
  backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
  marginBottom: baseUnit * 2,
  marginTop: baseUnit * 2,
  width: 1,
});

export const IndicatorSeparator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: IndicatorSeparatorProps<Option, IsMulti, Group>
) => {
  const { className, cx, getStyles, innerProps } = props;
  return (
    <span
      {...innerProps}
      css={getStyles('indicatorSeparator', props)}
      className={cx({ 'indicator-separator': true }, className)}
    />
  );
};

// ==============================
// Loading
// ==============================

const loadingDotAnimations = keyframes`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`;

export const loadingIndicatorCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  isFocused,
  size,
  theme: {
    colors,
    spacing: { baseUnit },
  },
}: LoadingIndicatorProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  label: 'loadingIndicator',
  color: isFocused ? colors.neutral60 : colors.neutral20,
  display: 'flex',
  padding: baseUnit * 2,
  transition: 'color 150ms',
  alignSelf: 'center',
  fontSize: size,
  lineHeight: 1,
  marginRight: size,
  textAlign: 'center',
  verticalAlign: 'middle',
});

interface LoadingDotProps {
  delay: number;
  offset: boolean;
}
const LoadingDot = ({ delay, offset }: LoadingDotProps) => (
  <span
    css={{
      animation: `${loadingDotAnimations} 1s ease-in-out ${delay}ms infinite;`,
      backgroundColor: 'currentColor',
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : undefined,
      height: '1em',
      verticalAlign: 'top',
      width: '1em',
    }}
  />
);

export interface LoadingIndicatorProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** Props that will be passed on to the children. */
  innerProps: JSX.IntrinsicElements['div'];
  /** The focused state of the select. */
  isFocused: boolean;
  isDisabled: boolean;
  /** Set size of the container. */
  size: number;
}
export const LoadingIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: LoadingIndicatorProps<Option, IsMulti, Group>
) => {
  const { className, cx, getStyles, innerProps, isRtl } = props;

  return (
    <div
      css={getStyles('loadingIndicator', props)}
      className={cx(
        {
          indicator: true,
          'loading-indicator': true,
        },
        className
      )}
      {...innerProps}
    >
      <LoadingDot delay={0} offset={isRtl} />
      <LoadingDot delay={160} offset />
      <LoadingDot delay={320} offset={!isRtl} />
    </div>
  );
};
LoadingIndicator.defaultProps = { size: 4 };
