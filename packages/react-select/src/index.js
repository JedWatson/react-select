// @flow
import { type ElementConfig } from 'react';

import SelectBase from './Select';
import manageState from './stateManager';

export default manageState<ElementConfig<typeof SelectBase>>(SelectBase);

export { default as NonceProvider } from './NonceProvider';

// this stuff is temporary until a fix for this bug is in rollup
import { mergeStyles as mergeStylesRenamed } from './styles';
import { defaultTheme as defaultThemeRenamed } from './theme';
import { createFilter as createFilterRenamed } from './filters';
import { components as componentsRenamed } from './components';

export let mergeStyles = mergeStylesRenamed;
export let defaultTheme = defaultThemeRenamed;
export let createFilter = createFilterRenamed;
export let components = componentsRenamed;
