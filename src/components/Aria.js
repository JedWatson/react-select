// @flow
import React, { type Node } from 'react';

import { SROnly } from '../primitives';

type StatusProps = { children: Node, ariaStatusProps: {} };
export const AriaStatus = ({ children, ariaStatusProps }: StatusProps) => (
  <SROnly {...ariaStatusProps}>{children}</SROnly>
);
