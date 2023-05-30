import * as React from 'react';

type InlineProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: keyof typeof gapSize;
};

export function Inline({
  children,
  gap = 'small',
  style,
  ...consumerProps
}: InlineProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: gapSize[gap],
        ...style,
      }}
      {...consumerProps}
    >
      {children}
    </div>
  );
}

const gapSize = {
  small: '0.5rem',
  medium: '1rem',
  large: '2rem',
};
