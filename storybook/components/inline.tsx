import * as React from 'react';

export function Inline({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-4">{children}</div>;
}
