'use strict';
/* global describe, it, beforeEach */

var helper = require('../testHelpers/jsdomHelper');
helper();

var sinon = require('sinon');
var unexpected = require('unexpected');
var unexpectedDom = require('unexpected-dom');
var unexpectedSinon = require('unexpected-sinon');
var expect = unexpected
	.clone()
	.installPlugin(unexpectedDom)
	.installPlugin(unexpectedSinon);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Select = require('../src/Select');

describe('Select', function() {

	describe('with simple options', function () {
		var options, instance, onChange;

		beforeEach(function () {

			options = [
				{value: 'one', label: 'One'},
				{value: 'two', label: 'Two'}
			];
			
			onChange = sinon.spy();

			// Render an instance of the component
			instance = TestUtils.renderIntoDocument(
				<Select
					name="form-field-name"
					value="one"
					options={options}
					onChange={onChange}
					/>
			);

		});

		it('should assign the given name', function () {
			var selectInputElement = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
			expect(React.findDOMNode(selectInputElement).name, 'to equal', 'form-field-name');
		});
		
	});
});
