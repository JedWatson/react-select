'use strict';
/* global describe, it, beforeEach */

var jsdom = require('mocha-jsdom');
var chai = require('chai');
var expect = chai.expect;

chai.should();

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Select = require('../src/Select');

describe('Select test', function() {
	jsdom();

	var options, instance;

	function logChange(val) {
		console.log('Selected: ' + val);
	}

	beforeEach(function() {

		options = [
			{ value: 'one', label: 'One' },
			{ value: 'two', label: 'Two' }
		];

		// Render an instance of the component
		instance = TestUtils.renderIntoDocument(
			<Select
				name="form-field-name"
				value="one"
				options={options}
				onChange={logChange}/>
		);

	});

	it('should assign the given name', function() {
		var selectInputElement = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
		expect(selectInputElement.getDOMNode().name).to.equal('form-field-name');
	});

});
