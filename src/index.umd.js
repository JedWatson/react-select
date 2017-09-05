// This file exists as an entry point for bundling our umd builds.
// Both in rollup and in webpack, umd builds built from es6 modules are not compatible with mixed imports. (which exist in index.js)
// This file does away with named imports in favor of a single export default.
import Select from './Select';
import Async from './Async';
import AsyncCreatable from './AsyncCreatable';
import Creatable from './Creatable';

Select.Async = Async;
Select.AsyncCreatable = AsyncCreatable;
Select.Creatable = Creatable;

export default Select;
