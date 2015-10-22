[![Build Status](https://travis-ci.org/JedWatson/react-select.svg?branch=master)](https://travis-ci.org/JedWatson/react-select)
[![Coverage Status](https://coveralls.io/repos/JedWatson/react-select/badge.svg?branch=master&service=github)](https://coveralls.io/github/JedWatson/react-select?branch=master)

React-Select
============

A Select control built with and for [React](http://facebook.github.io/react/index.html). Initially built for use in [KeystoneJS](http://www.keystonejs.com).


## Demo & Examples

Live demo: [jedwatson.github.io/react-select](http://jedwatson.github.io/react-select/)

To build the examples locally, run:

```javascript
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Project Status

This project is quite stable and ready for production use, however there are plans to improve it including:

- CSS Styles and theme support (working, could be improved)
- Documentation website (currently just examples)
- Custom options rendering (in progress)

It's loosely based on [Selectize](http://brianreavis.github.io/selectize.js/) (in terms of behaviour and user experience) and [React-Autocomplete](https://github.com/rackt/react-autocomplete) (as a native React Combobox implementation), as well as other select controls including [Chosen](http://harvesthq.github.io/chosen/) and [Select2](http://ivaynberg.github.io/select2/).


## Installation

The easiest way to use React-Select is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

```javascript
npm install react-select --save
```

You can also use the standalone build by including `dist/select.js` and `dist/default.css` in your page. If you use this, make sure you have already included the following dependencies:

* [React](http://facebook.github.io/react/)
* [classNames](http://jedwatson.github.io/classnames/)
* [react-input-autosize](https://github.com/JedWatson/react-input-autosize)


## Usage

React-Select generates a hidden text field containing the selected value, so you can submit it as part of a standard form. You can also listen for changes with the `onChange` event property.

Options should be provided as an `Array` of `Object`s, each with a `value` and `label` property for rendering and searching. You can use a `disabled` property to indicate whether the option is disabled or not.

The `value` property of each option should be set to either a string or a number.

When the value is changed, `onChange(newValue, [selectedOptions])` will fire.

```javascript
var Select = require('react-select');

var options = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' }
];

function logChange(val) {
	console.log("Selected: " + val);
}

<Select
	name="form-field-name"
	value="one"
	options={options}
	onChange={logChange}
/>
```

### Multiselect options

You can enable multi-value selection by setting `multi={true}`. In this mode:

* Selected options will be removed from the dropdown menu
* The values of the selected items are joined using the `delimiter` property to create the input value
* A simple value, if provided, will be split using the `delimiter` property
* The `onChange` event provides an array of the selected options as the second argument
* The first argument to `onChange` is always a string, regardless of whether the values of the selected options are numbers or strings
* By default, only options in the `options` array can be selected. Setting `allowCreate` to true allows new options to be created if they do not already exist.

### Async options

If you want to load options asynchronously, instead of providing an `options` Array, provide a `asyncOptions` Function.

The function takes two arguments `String input, Function callback`and will be called when the input text is changed.

When your async process finishes getting the options, pass them to `callback(err, data)` in a Object `{ options: [] }`.

The select control will intelligently cache options for input strings that have already been fetched. The cached result set will be filtered as more specific searches are input, so if your async process would only return a smaller set of results for a more specific query, also pass `complete: true` in the callback object. Caching can be disabled by setting `cacheAsyncResults` to `false` (Note that `complete: true` will then have no effect).

Unless you specify the property `autoload={false}` the control will automatically load the default set of options (i.e. for `input: ''`) when it is mounted.

```javascript
var Select = require('react-select');

var getOptions = function(input, callback) {
	setTimeout(function() {
		callback(null, {
			options: [
				{ value: 'one', label: 'One' },
				{ value: 'two', label: 'Two' }
			],
			// CAREFUL! Only set this to true when there are no more options,
			// or more specific queries will not be sent to the server.
			complete: true
		});
	}, 500);
};

<Select
	name="form-field-name"
	value="one"
	asyncOptions={getOptions}
/>
```

### Async options with Promises

`asyncOptions` now supports Promises, which can be used in very much the same way as callbacks.

Everything that applies to `asyncOptions` with callbacks still applies to the Promises approach (e.g. caching, autoload, ...)

An example using the `fetch` API and ES6 syntax, with an API that returns an object like:

```javascript
import Select from 'react-select';

/*
 * assuming the API returns something like this:
 *   const json = [ 
 * 	   { value: 'one', label: 'One' },
 * 	   { value: 'two', label: 'Two' }
 *   ]
 */

const getOptions = (input) => {
  return fetch(`/users/${input}.json`)
    .then((response) => {
      return response.json();
    }).then((json) => {
      return { options: json };
    });
}

<Select
	name="form-field-name"
	value="one"
	asyncOptions={getOptions}
/>
```

### Async options loaded externally

If you want to load options asynchronously externally from the `Select` component, you can have the `Select` component show a loading spinner by passing in the `isLoading` prop set to `true`.

```javascript
var Select = require('react-select');

var isLoadingExternally = true;

<Select
  name="form-field-name"
	isLoading={isLoadingExternally}
	...
/>
```

### Filtering options

You can control how options are filtered with the following properties:

* `matchPos`: `"start"` or `"any"`: whether to match the text entered at the start or any position in the option value
* `matchProp`: `"label"`, `"value"` or `"any"`: whether to match the value, label or both values of each option when filtering
* `ignoreCase`: `Boolean`: whether to ignore case or match the text exactly when filtering

`matchProp` and `matchPos` both default to `"any"`.
`ignoreCase` defaults to `true`.

#### Advanced filters

You can also completely replace the method used to filter either a single option, or the entire options array (allowing custom sort mechanisms, etc.)

* `filterOption`: `function(Object option, String filter)` returns `Boolean`. Will override `matchPos`, `matchProp` and `ignoreCase` options.
* `filterOptions`: `function(Array options, String filter, Array currentValues)` returns `Array filteredOptions`. Will override `filterOption`, `matchPos`, `matchProp` and `ignoreCase` options.

For multi-select inputs, when providing a custom `filterOptions` method, remember to exclude current values from the returned array of options.

### Further options


	Property			|	Type		|	Description
:-----------------------|:--------------|:--------------------------------
	addLabelText		|	string		|	text to display when `allowCreate` is true
	allowCreate			|	bool		|	allow new options to be created in multi mode (displays an "Add \<option> ?" item when a value not already in the `options` array is entered)
	asyncOptions 		|	func		|	function to call to get options
	autoload 			|	bool		|	whether to auto-load the default async options set
	backspaceRemoves 	|	bool		|	whether pressing backspace removes the last item when there is no input value
	cacheAsyncResults	|	bool		|	enables the options cache for `asyncOptions` (default: `true`)
	className 			|	string		|	className for the outer element
	clearable 			|	bool		|	should it be possible to reset value
	clearAllText 		|	string		|	title for the "clear" control when `multi` is true
	clearValueText 		|	string		|	title for the "clear" control
	delimiter 			|	string		|	delimiter to use to join multiple values
	disabled 			|	bool		|	whether the Select is disabled or not
	filterOption 		|	func		|	method to filter a single option: `function(option, filterString)`
	filterOptions 		|	func		|	method to filter the options array: `function([options], filterString, [values])`
	ignoreCase 			|	bool		|	whether to perform case-insensitive filtering
	inputProps 			|	object		|	custom attributes for the Input (in the Select-control) e.g: `{'data-foo': 'bar'}`
	isLoading			|	bool		|	whether the Select is loading externally or not (such as options being loaded)
	labelKey			|	string		|	the option property to use for the label
	matchPos 			|	string		|	(any, start) match the start or entire string when filtering
	matchProp 			|	string		|	(any, label, value) which option property to filter on
	multi 				|	bool		|	multi-value input
	name 				|	string		|	field name, for hidden `<input />` tag
	newOptionCreator	|	func		|	factory to create new options when `allowCreate` is true
	noResultsText 		|	string		|	placeholder displayed when there are no matching search results
	onBlur 				|	func		|	onBlur handler: `function(event) {}`
	onChange 			|	func		|	onChange handler: `function(newValue) {}`
	onFocus 			|	func		|	onFocus handler: `function(event) {}`
	onInputChange		|	func		|	onInputChange handler: `function(inputValue) {}`
	onOptionLabelClick	|	func		|	onClick handler for value labels: `function (value, event) {}`
	optionRenderer		|	func		|	function which returns a custom way to render the options in the menu
	options 			|	array		|	array of options
	placeholder 		|	string		|	field placeholder, displayed when there's no value
	searchable 			|	bool		|	whether to enable searching feature or not
	searchingText		|	string		|	message to display whilst options are loading via asyncOptions, or when `isLoading` is true
	searchPromptText 	|	string		|	label to prompt for search input
	value 				|	any			|	initial field value
	valueKey			|	string		|	the option property to use for the value
	valueRenderer		|	func		|	function which returns a custom way to render the value selected

### Methods

Right now there's simply a `focus()` method that gives the control focus. All other methods on `<Select>` elements should be considered private and prone to change.

```javascript
// focuses the input element
<instance>.focus();
```

# Contributing

See our [CONTRIBUTING.md](https://github.com/JedWatson/react-select/blob/master/CONTRIBUTING.md) for information on how to contribute.


# License

MIT Licensed. Copyright (c) Jed Watson 2015.
