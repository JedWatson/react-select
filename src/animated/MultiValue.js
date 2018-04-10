// @flow

import React from 'react';
import { components } from '../components';
import { Collapse, type fn } from './transitions';

// strip transition props off before spreading onto actual component
type Props = {
  in: boolean,
  onExited: fn,
};

const AnimatedMultiValue = ({ in: inProp, onExited, ...props }: Props) => (
  <Collapse in={inProp} onExited={onExited}>
    {/* $FlowFixMe */}
    <components.MultiValue cropWithEllipsis={inProp} {...props} />
  </Collapse>
);

export default AnimatedMultiValue;
