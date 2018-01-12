// @flow

import React from 'react';
import { components } from '../components';
import { Fade, collapseDuration } from './transitions';

// fade in when last multi-value removed, otherwise instant
const Placeholder = (props: any) => (
  <Fade
    component={components.Placeholder}
    duration={props.isMulti ? collapseDuration : 1}
    {...props}
  />
);
export default Placeholder;
