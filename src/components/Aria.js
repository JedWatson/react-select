// @flow
import React, { type Node } from 'react';

import { SROnly } from '../primitives';
import { className } from '../utils';

type StatusProps = { children: Node };
export const AriaStatus = (props: StatusProps) => (
  <SROnly className={className('aria-status')} {...props} />
);
