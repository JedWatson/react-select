// @flow
import React from 'react';

import { SROnly } from '../primitives';
import { className } from '../utils';

type StatusProps = { availableResults: number };
export const AriaStatus = ({ availableResults }: StatusProps) => (
  <SROnly
    aria-atomic="true"
    aria-live="polite"
    role="status"
    className={className('sr-only')}
  >
    {availableResults} results are available.
  </SROnly>
);
