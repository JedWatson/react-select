// @flow

import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { components } from '../components';

// make ValueContainer a transition group
const AnimatedValueContainer = (props: any) => (
  <TransitionGroup component={components.ValueContainer} {...props} />
);

export default AnimatedValueContainer;
