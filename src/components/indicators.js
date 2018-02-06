// @flow
// @jsx glam
import React, { type ElementType } from 'react';
import glam from 'glam';

import { className } from '../utils';
import { Div, Span, SROnly } from '../primitives';
import { colors, spacing } from '../theme';
import { type PropsWithStyles } from '../types';

// ==============================
// Dropdown & Clear Icons
// ==============================

const Svg = ({ size, ...props }: { size: number }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 20 20"
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
export const CrossIcon = (props: any) => (
  <Svg
    size={20}
    focusable="false"
    role="presentation"
    className={className(['icon', 'cross-icon'])}
    {...props}
  >
    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
  </Svg>
);
export const DownChevron = (props: any) => (
  <Svg
    size={20}
    focusable="false"
    role="presentation"
    className={className(['icon', 'down-icon'])}
    {...props}
  >
    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
  </Svg>
);

// ==============================
// Dropdown & Clear Buttons
// ==============================

type IndicatorProps = PropsWithStyles & {
  children: ElementType,
  isFocused: boolean,
  innerProps: any,
};

export const css = ({ isFocused }: IndicatorProps) => ({
  color: isFocused ? colors.text : colors.neutral20,
  cursor: 'pointer',
  display: 'flex ',
  padding: '8px 2px',
  transition: 'opacity 200ms',

  ':first-child': { paddingLeft: spacing.baseUnit * 2 },
  ':last-child': { paddingRight: spacing.baseUnit * 2 },

  ':hover': {
    color: isFocused ? colors.text : colors.neutral40,
  },
});

export const DropdownIndicator = (props: IndicatorProps) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div
      {...innerProps}
      css={getStyles('indicator', props)}
      className={className(['indicator', 'dropdown-indicator'])}
    >
      {children}
    </Div>
  );
};
DropdownIndicator.defaultProps = {
  children: <DownChevron />,
};

export const ClearIndicator = (props: IndicatorProps) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div
      {...innerProps}
      css={getStyles('indicator', props)}
      className={className(['indicator', 'clear-indicator'])}
    >
      {children}
    </Div>
  );
};
ClearIndicator.defaultProps = {
  children: <CrossIcon />,
};

// ==============================
// Loading
// ==============================

const keyframesName = 'react-select-loading-indicator';

const LoadingContainer = ({ size }: { size: number }) => (
  <Div
    css={{
      alignSelf: 'center',
      fontSize: size,
      lineHeight: 1,
      marginRight: size,
      textAlign: 'center',
      verticalAlign: 'middle',
    }}
  />
);
type DotProps = { color: string, delay: number, offset: boolean };
const LoadingDot = ({ color, delay, offset }: DotProps) => (
  <Span
    css={{
      animationDuration: '1s',
      animationDelay: `${delay}ms`,
      animationIterationCount: 'infinite',
      animationName: keyframesName,
      animationTimingFunction: 'ease-in-out',
      backgroundColor: color,
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : null,
      height: '1em',
      verticalAlign: 'top',
      width: '1em',
    }}
  />
);
// TODO @jossmac Source `keyframes` solution for glam
// - at the very least, ensure this is only rendered once to the DOM
const LoadingAnimation = () => (
  <style type="text/css">
    {`@keyframes ${keyframesName} {
        0%, 80%, 100% { opacity: 0; }
        40% { opacity: 1; }
    };`}
  </style>
);

type LoadingIconProps = { isFocused: boolean, size: number };
const LoadingIcon = ({ isFocused, size = 4 }: LoadingIconProps) => {
  const clr = isFocused ? colors.text : colors.neutral20;

  return (
    <LoadingContainer size={size}>
      <LoadingAnimation />
      <LoadingDot color={clr} />
      <LoadingDot color={clr} delay={160} offset />
      <LoadingDot color={clr} delay={320} offset />
      <SROnly>Loading</SROnly>
    </LoadingContainer>
  );
};

export const LoadingIndicator = (props: IndicatorProps) => {
  const { getStyles, innerProps } = props;
  return (
    <Div
      {...innerProps}
      css={getStyles('indicator', props)}
      className={className(['indicator', 'loading-indicator'])}
    >
      <LoadingIcon isFocused={props.isFocused} />
    </Div>
  );
};
