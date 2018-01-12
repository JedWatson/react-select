// @flow

import React from 'react';
import { components } from '../components';

import { type BaseTransition } from './transitions';

// strip transition props off before spreading onto select component
// eslint-disable-next-line no-unused-vars
const Input = ({ in: inProp, onExited, ...props }: BaseTransition) => {
  return <components.Input {...props} />;
};

export default Input;
