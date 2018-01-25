// @flow

import React from 'react';
import { components } from '../components';
import { Collapse, type fn } from './transitions';

// strip transition props off before spreading onto select component
type Props = {
  in: boolean,
  onExited: fn,
};

const MultiValue = ({ in: inProp, onExited, ...props }: Props) => (
  <Collapse in={inProp} onExited={onExited}>
    {/* $FlowFixMe */}
    <components.MultiValue {...props} />
  </Collapse>
);

export default MultiValue;
