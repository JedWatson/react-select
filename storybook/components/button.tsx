import * as React from 'react';

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  }
) {
  return (
    <button
      className="px-3 bg-blue-600 text-white py-1 text-sm rounded inline-flex items-center gap-2"
      {...props}
    />
  );
}
