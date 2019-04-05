// This file exists as an entry point for bundling our umd builds.
// Both in rollup and in webpack, umd builds built from es6 modules are not
// compatible with mixed imports (which exist in index.js)
// This file does away with named imports in favor of a single export default.

import SelectBase from './Select';
import manageState from './stateManager';

import Async from './Async';
import AsyncCreatable from './AsyncCreatable';
import Creatable from './Creatable';

import { createFilter } from './filters';
import { components } from './components/index';
import { mergeStyles } from './styles';
import { defaultTheme } from './theme';

const SelectState =  manageState(SelectBase);

export default {
  Async: Async,
  AsyncCreatable: AsyncCreatable,
  Creatable: Creatable,
  SelectBase: SelectBase,
  Select: SelectState,
  createFilter: createFilter,
  components: components,
  mergeStyles: mergeStyles,
  defaultTheme: defaultTheme
};

