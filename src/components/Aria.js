// @flow
import React from 'react';

import { Div, SROnly } from '../primitives';

type StatusProps = { availableResults: number };
export const AriaStatus = ({ availableResults }: StatusProps) => (
  <SROnly aria-atomic="true" aria-live="polite" role="status">
    {availableResults} results are available.
  </SROnly>
);
