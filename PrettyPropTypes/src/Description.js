// @flow
import React, { type Node } from 'react';

export default function ReadmeDescription({ children }: { children: Node }) {
  const style = { marginTop: 12 };

  return typeof children === 'string' ? (
    <p>{children}</p>
  ) : (
    <div style={style}>{children}</div>
  );
}
