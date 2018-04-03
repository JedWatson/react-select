// @flow

import React from 'react';
import { components } from '../components';

import { type BaseTransition } from './transitions';
import { type PropsWithInnerRef } from '../types';

type InputProps = BaseTransition & PropsWithInnerRef;

// strip transition props off before spreading onto select component
// note we need to be explicit about innerRef for flow
const AnimatedInput = ({
  in: inProp,
  onExited,
  appear,
  enter,
  exit,
  innerRef,
  ...props
}: InputProps) => {
  // $FlowFixMe
  return <components.Input innerRef={innerRef} {...props} />;
};

export default AnimatedInput;
