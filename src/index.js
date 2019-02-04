// @flow
import { type ElementConfig } from 'react';

import SelectBase from './Select';
import manageState from './stateManager';

export default manageState<ElementConfig<typeof SelectBase>>(SelectBase);

export { SelectBase };
export { default as Async } from './Async';
export { default as AsyncCreatable } from './AsyncCreatable';
export { default as Creatable } from './Creatable';
export { createFilter } from './filters';
export { default as makeAnimated } from './animated/index';
export { components } from './components/index';
export { mergeStyles } from './styles';
export { defaultTheme } from './theme';
