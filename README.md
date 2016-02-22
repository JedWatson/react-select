[![NPM](https://badge.fury.io/js/react-select.png)](https://www.npmjs.com/package/react-select)
[![Build Status](https://travis-ci.org/JedWatson/react-select.svg?branch=master)](https://travis-ci.org/JedWatson/react-select)
[![Coverage Status](https://coveralls.io/repos/JedWatson/react-select/badge.svg?branch=master&service=github)](https://coveralls.io/github/JedWatson/react-select?branch=master)

React-Select
============

A Select control built with and for [React](http://facebook.github.io/react/index.html). Initially built for use in [KeystoneJS](http://www.keystonejs.com).


## New version 1.0.0-beta

I've nearly completed a major rewrite of this component (see issue [#568](https://github.com/JedWatson/react-select/issues/568) for details and progress). The new code has been merged into `master`, and `react-select@1.0.0-beta` has been published to npm and bower.

1.0.0 has some breaking changes. The documentation below still needs to be updated for the new API; notes on the changes can be found in [CHANGES.md](https://github.com/JedWatson/react-select/blob/master/CHANGES.md) and will be finalised into [HISTORY.md](https://github.com/JedWatson/react-select/blob/master/HISTORY.md) soon.

Our tests need some major updates to work with the new API (see [#571](https://github.com/JedWatson/react-select/issues/571)) and are causing the build to fail, but the component is stable and robust in actual usage.

Testing, feedback and PRs for the new version are appreciated.


## Demo & Examples

Live demo: [jedwatson.github.io/react-select](http://jedwatson.github.io/react-select/)

The live demo is still running `v0.9.1`.

To build the **new 1.0.0** examples locally, clone this repo then run:

```javascript
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use React-Select is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

```javascript
npm install react-select --save
```

You can also use the standalone build by including `dist/react-select.js` and `dist/react-select.css` in your page. If you use this, make sure you have already included the following dependencies:

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
* By default, selected options can be cleared. To disable the possibility of clearing a particular option, add `clearableValue: false` to that option:
```javascript
var options = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two', clearableValue: false }
];
```
Note: the `clearable` prop of the Select component should also be set to `false` to prevent allowing clearing all fields at once

### Async options

If you want to load options asynchronously, instead of providing an `options` Array, provide a `loadOptions` Function.

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

<Select.Async
    name="form-field-name"
    loadOptions={getOptions}
/>
```

### Async options with Promises

`loadOptions` supports Promises, which can be used in very much the same way as callbacks.

Everything that applies to `loadOptions` with callbacks still applies to the Promises approach (e.g. caching, autoload, ...)

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

<Select.Async
	name="form-field-name"
	value="one"
	loadOptions={getOptions}
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


	Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
	addLabelText	|	string	|	'Add "{label}"?'	|	text to display when `allowCreate` is true
	autoBlur	|	bool | false | Blurs the input element after a selection has been made. Handy for lowering the keyboard on mobile devices
	allowCreate	|	bool	|	false		|	allow new options to be created in multi mode (displays an "Add \<option> ?" item when a value not already in the `options` array is entered)
	autoload 	|	bool	|	true		|	whether to auto-load the default async options set
	backspaceRemoves 	|	bool	|	true	|	whether pressing backspace removes the last item when there is no input value
	cacheAsyncResults	|	bool	|	true	|	enables the options cache for `asyncOptions` (default: `true`)
	className 	|	string	|	undefined	|	className for the outer element
	clearable 	|	bool	|	true		|	should it be possible to reset value
	clearAllText 	|	string	|	'Clear all'	|	title for the "clear" control when `multi` is true
	clearValueText 	|	string	|	'Clear value'	|	title for the "clear" control
	delimiter 	|	string	|	','		|	delimiter to use to join multiple values
	disabled 	|	bool	|	false		|	whether the Select is disabled or not
	filterOption 	|	func	|	undefined	|	method to filter a single option: `function(option, filterString)`
	filterOptions 	|	func	|	undefined	|	method to filter the options array: `function([options], filterString, [values])`
	ignoreCase 	|	bool	|	true		|	whether to perform case-insensitive filtering
	inputProps 	|	object	|	{}		|	custom attributes for the Input (in the Select-control) e.g: `{'data-foo': 'bar'}`
	isLoading	|	bool	|	false		|	whether the Select is loading externally or not (such as options being loaded)
	labelKey	|	string	|	'label'		|	the option property to use for the label
	loadOptions	|	func	|	undefined	|	function that returns a promise or calls a callback with the options: `function(input, [callback])`
	matchPos 	|	string	|	'any'		|	(any, start) match the start or entire string when filtering
	matchProp 	|	string	|	'any'		|	(any, label, value) which option property to filter on
	scrollMenuIntoView |	bool	|	true		|	whether the viewport will shift to display the entire menu when engaged
	menuBuffer	|	number	|	0		|	buffer of px between the base of the dropdown and the viewport to shift if menu doesnt fit in viewport
	multi 		|	bool	|	undefined	|	multi-value input
	name 		|	string	|	undefined	|	field name, for hidden `<input />` tag
	newOptionCreator	|	func	|	undefined	|	factory to create new options when `allowCreate` is true
	noResultsText 	|	string	|	'No results found'	|	placeholder displayed when there are no matching search results or a falsy value to hide it
	onBlur 		|	func	|	undefined	|	onBlur handler: `function(event) {}`
	onBlurResetsInput	|	bool	|	true	|	whether to clear input on blur or not
	onChange 	|	func	|	undefined	|	onChange handler: `function(newValue) {}`
	onFocus 	|	func	|	undefined	|	onFocus handler: `function(event) {}`
	onInputChange	|	func	|	undefined	|	onInputChange handler: `function(inputValue) {}`
	onValueClick	|	func	|	undefined	|	onClick handler for value labels: `function (value, event) {}`
	onOpen		|	func	|	undefined	|	handler for when the menu opens: `function () {}`
	onClose		|	func	|	undefined	|	handler for when the menu closes: `function () {}`
	optionRenderer	|	func	|	undefined	|	function which returns a custom way to render the options in the menu
	options 	|	array	|	undefined	|	array of options
	placeholder 	|	string	|	'Select ...'	|	field placeholder, displayed when there's no value
	searchable 	|	bool	|	true		|	whether to enable searching feature or not
	searchingText	|	string	|	'Searching...'	|	message to display whilst options are loading via asyncOptions, or when `isLoading` is true
	searchPromptText |	string	|	'Type to search'	|	label to prompt for search input
	value 		|	any	|	undefined	|	initial field value
	valueKey	|	string	|	'value'		|	the option property to use for the value
	valueRenderer	|	func	|	undefined	|	function which returns a custom way to render the value selected

### Methods

Right now there's simply a `focus()` method that gives the control focus. All other methods on `<Select>` elements should be considered private and prone to change.

```javascript
// focuses the input element
<instance>.focus();
```

# Contributing

See our [CONTRIBUTING.md](https://github.com/JedWatson/react-select/blob/master/CONTRIBUTING.md) for information on how to contribute.

Thanks to the projects this was inspired by: [Selectize](http://brianreavis.github.io/selectize.js/) (in terms of behaviour and user experience), [React-Autocomplete](https://github.com/rackt/react-autocomplete) (as a quality React Combobox implementation), as well as other select controls including [Chosen](http://harvesthq.github.io/chosen/) and [Select2](http://ivaynberg.github.io/select2/).


# License

MIT Licensed. Copyright (c) Jed Watson 2016.
