(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./examples/src/app.js":[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react'),
	Select = require('react-select');
 
var SelectField = React.createClass({displayName: 'SelectField',
	render: function() {
		var ops = [
			{ label: 'First', value: 'one' },
			{ label: 'Second', value: 'two' },
			{ label: 'Third', value: 'three' }
		];
		return React.DOM.div(null, 
			this.props.label, 
			Select({options: ops, value: this.props.value})
		);
	}
});

React.renderComponent(
	SelectField({label: "Choose:"}),
	document.getElementById('example')
);

},{"react":false,"react-select":false}]},{},["./examples/src/app.js"]);
