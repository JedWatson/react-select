import * as React from 'react';

type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: keyof typeof gapSize;
};

export function Stack({
  children,
  gap = 'small',
  style,
  ...consumerProps
}: StackProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
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
