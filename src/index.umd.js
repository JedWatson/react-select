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

const Select = manageState(SelectBase);
Select.Async = Async;
Select.AsyncCreatable = AsyncCreatable;
Select.Creatable = Creatable;
Select.SelectBase = SelectBase;
Select.createFilter = createFilter;
Select.components = components;
Select.mergeStyles = mergeStyles;

export default Select;
