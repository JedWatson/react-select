React-Select
============

A Select control built with and for [React](http://facebook.github.io/react/index.html). Initially built for use in [KeystoneJS](http://www.keystonejs.com).


## Demo & Examples

Live demo: [jedwatson.github.io/react-select](http://jedwatson.github.io/react-select/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Project Status

This project is quite stable and ready for production use, however there are plans to improve it including:

- CSS Styles and theme support (working, could be improved)
- Documentation website (currently just examples)
- Custom options rendering

It's loosely based on [Selectize](http://brianreavis.github.io/selectize.js/) (in terms of behaviour and user experience) and [React-Autocomplete](https://github.com/rackt/react-autocomplete) (as a native React Combobox implemenation), as well as other select controls including [Chosen](http://harvesthq.github.io/chosen/) and [Select2](http://ivaynberg.github.io/select2/).


## Installation

The easiest way to use React-Select is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

```
npm install react-select --save
```

You can also use the standalone build by including `dist/select.js` and `dist/default.css` in your page. If you use this, make sure you have already included the following dependencies: 

* [React](http://facebook.github.io/react/)
* [classNames](http://jedwatson.github.io/classnames/)
* [react-input-autosize](https://github.com/JedWatson/react-input-autosize)


## Usage

React-Select generates a hidden text field containing the selected value, so you can submit it as part of a standard form. You can also listen for changes with the `onChange` event property.

Options should be provided as an `Array` of `Object`s, each with a `value` and `label` property for rendering and searching.

When the value is changed, `onChange(newValue, [selectedOptions])` will fire.

```
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

### Async options

If you want to load options asynchronously, instead of providing an `options` Array, provide a `asyncOptions` Function.

The function takes two arguments `String input, Function callback`and will be called when the input text is changed.

When your async process finishes getting the options, pass them to `callback(err, data)` in a Object `{ options: [] }`.

The select control will intelligently cache options for input strings that have already been fetched. Async options will still be filtered like the normal options array, so if your async process would only return a smaller set of results for a more specific query, also pass `complete: true` in the callback object.

Unless you specify the property `autoload={false}` the control will automatically load the default set of options (i.e. for `input: ''`) when it is mounted.

```
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

### Filtering options

You can control how options are filtered with the following properties:

* `matchPos`: `"start"` or `"any"`: whether to match the text entered at the start or any position in the option value
* `matchProp`: `"label"`, `"value"` or `"any"`: whether to match the value, label or both values of each option when filtering

Both properties default to `"any"`.

#### Advanced filters

You can also completely replace the method used to filter either a single option, or the entire options array (allowing custom sort mechanisms, etc.)

* `filterOption`: `function(Object option, String filter)` returns `Boolean`. Will override `matchPos` and `matchProp` options.
* `filterOptions`: `function(Array options, String filter, Array currentValues)` returns `Array filteredOptions`. Will override `filterOption`, `matchPos` and `matchProp` options.

For multi-select inputs, when providing a custom `filterOptions` method, remember to exclude current values from the returned array of options.

### Further options


	Property			|	Type		|	Description
:-----------------------|:--------------|:--------------------------------
	value 				|	any			|	 initial field value
	multi 				|	bool		|	 multi-value input
	disabled 			|	bool		|	 whether the Select is disabled or not
	options 			|	array		|	 array of options
	delimiter 			|	string		|	 delimiter to use to join multiple values
	asyncOptions 		|	func		|	 function to call to get options
	autoload 			|	bool		|	 whether to auto-load the default async options set
	placeholder 		|	string		|	 field placeholder, displayed when there's no value
	noResultsText 		|	string		|	 placeholder displayed when there are no matching search results
	clearable 			|	bool		|	 should it be possible to reset value
	clearValueText 		|	string		|	 title for the "clear" control
	clearAllText 		|	string		|	 title for the "clear" control when multi: true
	searchable 			|	bool		|	 whether to enable searching feature or not
	searchPromptText 	|	string		|	 label to prompt for search input
	name 				|	string		|	 field name, for hidden <input /> tag
	onChange 			|	func		|	 onChange handler: function(newValue) {}
	onFocus 			|	func		|	 onFocus handler: function(event) {}
	onBlur 				|	func		|	 onBlur handler: function(event) {}
	className 			|	string		|	 className for the outer element
	filterOption 		|	func		|	 method to filter a single option: function(option, filterString)
	filterOptions 		|	func		|	 method to filter the options array: function([options], filterString, [values])
	matchPos 			|	string		|	 (any, start) match the start or entire string when filtering
	matchProp 			|	string		|	 (any, label, value) which option property to filter on
	inputProps 			|	object		|	 custom attributes for the Input (in the Select-control) e.g: {'data-foo': 'bar'}


# Contributing

See our [CONTRIBUTING.md](https://github.com/JedWatson/react-select/blob/master/CONTRIBUTING.md) for information on how to contribute.


# License

MIT Licensed. Copyright (c) Jed Watson 2015.
