import * as React from 'react';

export function Svg(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      role="presentation"
      {...props}
    />
  );
}

export function ChevronDown(props: JSX.IntrinsicElements['svg']) {
  return (
    <Svg style={{ marginRight: -6 }} {...props}>
      <path
        d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  );
}
