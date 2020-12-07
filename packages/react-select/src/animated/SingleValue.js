// @flow

import React, { type AbstractComponent } from 'react';
import { type SingleValueProps } from '../components/SingleValue';
import { Fade } from './transitions';

// instant fade; all transition-group children must be transitions

const AnimatedSingleValue = (
  WrappedComponent: AbstractComponent<SingleValueProps>
): AbstractComponent<SingleValueProps> => (props) => (
  // $FlowFixMe_0_108_0
  <Fade component={WrappedComponent} {...props} />
);

export default AnimatedSingleValue;
