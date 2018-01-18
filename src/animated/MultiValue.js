// @flow

import React from 'react';
import { components } from '../components';

import { Collapse, type fn } from './transitions';

import type { ValueProps as MultiValueProps } from '../components/MultiValue';

// strip transition props off before spreading onto select component
type Props = {
  ...MultiValueProps,
  in: boolean, onExited: fn
};
const MultiValue = ({ in: inProp, onExited, ...props }: Props) => (
  <Collapse in={inProp} onExited={onExited}>
    <components.MultiValue {...props} />
  </Collapse>
);

export default MultiValue;
