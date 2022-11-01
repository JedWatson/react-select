import * as React from 'react';

export function ButtonGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4">{children}</div>;
}
