// @flow

import React from 'react';
import { components } from '../components';
import { Fade } from './transitions';

// instant fade; all transition-group children must be transitions
const AnimatedSingleValue = (props: any) => (
  <Fade component={components.SingleValue} {...props} />
);

export default AnimatedSingleValue;
