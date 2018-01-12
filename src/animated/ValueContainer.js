// @flow

import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { components } from '../components';

// make ValueContainer a transition group
const ValueContainer = (props: any) => (
  <TransitionGroup component={components.ValueContainer} {...props} />
);

export default ValueContainer;
