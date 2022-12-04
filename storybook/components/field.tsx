import * as React from 'react';

type FieldProps = {
  label?: string;
  secondaryLabel?: string;
  children: React.ReactNode;
  htmlFor: string;
};

export function Field({
  children,
  htmlFor,
  label = 'Select',
  secondaryLabel,
}: FieldProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <label
        htmlFor={htmlFor}
        style={{
          fontWeight: 500,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <span>{label}</span>
        {secondaryLabel && (
          <span style={{ fontWeight: 400, opacity: 0.7 }}>
            {secondaryLabel}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
