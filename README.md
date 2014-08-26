React-Select
============

A Select control built with and for [React](http://facebook.github.io/react/index.html), initially being developed for use in [KeystoneJS](http://www.keystonejs.com).

## Project Status

This is currently a work in progress.

It's loosely based on [Selectize](http://brianreavis.github.io/selectize.js/) (in terms of behaviour and user expereience) and [React-Autocomplete](https://github.com/rackt/react-autocomplete) (as a native React Combobox implemenation), as well as other select controls including [Chosen](http://harvesthq.github.io/chosen/) and [Select2](http://ivaynberg.github.io/select2/).

TODO:

- CSS Styles and theme support
- Multiselect
- Remote options loading
- Custom options rendering
- Cleanup of focus state management

## Installation

You currently need to install this component via NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

Standalone builds will be available in the future.

```
npm install react-select --save
```

## Usage

React-Select generates a hidden text field containing the selected value, so you can submit it as part of a standard form.

Options should be provided as an `Array` of `Object`s, each with a `value` and `label` property for rendering and searching.

```
var Select = require('react-select');

var options = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' }
];

<Select 
	name="form-field-name"
	value="one"
	options={options}
}>
```
