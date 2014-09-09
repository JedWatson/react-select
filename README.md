React-Select
============

A Select control built with and for [React](http://facebook.github.io/react/index.html), initially being developed for use in [KeystoneJS](http://www.keystonejs.com).

## Demo & Examples

Live demo: [jedwatson.github.io/react-select](http://jedwatson.github.io/react-select/)

To build the examples locally, run:

```
npm install
gulp build-examples
```

Then open `./examples/public/index.html` in a browser.


## Project Status

This is currently a work in progress.

It's loosely based on [Selectize](http://brianreavis.github.io/selectize.js/) (in terms of behaviour and user expereience) and [React-Autocomplete](https://github.com/rackt/react-autocomplete) (as a native React Combobox implemenation), as well as other select controls including [Chosen](http://harvesthq.github.io/chosen/) and [Select2](http://ivaynberg.github.io/select2/).

TODO:

- CSS Styles and theme support (in progress)
- Remote options loading (in progress)
- Cleanup of focus state management (in progress)
- Standalone build & publish to Bower (in progress)
- Documentation website (currently just examples)
- Multiselect
- Custom options rendering

## Installation

The easiest way to use React-Select is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/select.js` and `dist/default.css` in your page. If you use this, make sure you have already included React and Underscore. (they must be available through a browserify-style `require()` call, global support is coming soon)

```
npm install react-select --save
```

### Using the built 

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

### Async options

If you want to load options asynchronously, instead of providing an `options` Array, provide a `asyncOptions` Function.

The function takes two arguments `String input, Function callback`and will be called when the input text is changed.

When your async process finishes getting the options, pass them to `callback(err, data)` in a Object `{ options: [] }`.

The select control will intelligently cache options for input strings that have already been fetched. Async options will still be filtered like the normal options array, so if your async process would only return a smaller set of results for a more specific query, also pass `complete: true` in the callback object.

Unless you specify the property `autoload="false"` the control will automatically load the default set of options (i.e. for `input: ''`) when it is mounted.

```
var Select = require('react-select');

var getOptions = function(input, callback) {
	setTimeout(function() {
		callback(null, {
			options: [
				{ value: 'one', label: 'One' },
				{ value: 'two', label: 'Two' }
			],
			complete: true
		});
	}, 500);
};

<Select 
	name="form-field-name"
	value="one"
	asyncOptions={getOptions}
}>
```

