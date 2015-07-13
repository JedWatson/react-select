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
		var searchInputNode;

		beforeEach(function () {

			options = [
				{value: 'one', label: 'One'},
				{value: 'two', label: 'Two'},
				{value: 'three', label: 'Three'}
			];
			
			onChange = sinon.spy();

			// Render an instance of the component
			instance = TestUtils.renderIntoDocument(
				<Select
					name="form-field-name"
					value="one"
					options={options}
					onChange={onChange}
					searchable={true}
					/>
			);
			
			// Focus on the input, such that mouse events are accepted
			searchInputNode = instance.getInputNode().getDOMNode().querySelector('input');
			TestUtils.Simulate.focus(searchInputNode);

		});
		
		function pressEnterToAccept() {
			TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 13, key: 'Enter' });
		}
		function pressTabToAccept() {
			TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 9, key: 'Tab' });
		}
		
		function typeSearchText(text) {
			TestUtils.Simulate.change(searchInputNode, { target: { value: text } });
		}

		it('should assign the given name', function () {
			var selectInputElement = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
			expect(React.findDOMNode(selectInputElement).name, 'to equal', 'form-field-name');
		});
		
		it('should show the options on mouse click', function () {
			TestUtils.Simulate.mouseDown(React.findDOMNode(instance).querySelector('.Select-control'));
			var node = React.findDOMNode(instance);
			expect(node, 'queried for', '.Select-option', 'to have length', 3);
		});
		
		it('should display the labels on mouse click', function () {
			TestUtils.Simulate.mouseDown(React.findDOMNode(instance).querySelector('.Select-control'));
			var node = React.findDOMNode(instance);
			expect(node, 'queried for', '.Select-option:nth-child(1)', 'to have items satisfying', 'to have text', 'One');
			expect(node, 'queried for', '.Select-option:nth-child(2)', 'to have items satisfying', 'to have text', 'Two');
			expect(node, 'queried for', '.Select-option:nth-child(3)', 'to have items satisfying', 'to have text', 'Three');
		});
		
		it('should filter after entering some text', function () {
			
			typeSearchText('T');
			var node = React.findDOMNode(instance);
			expect(node, 'queried for', '.Select-option:nth-child(1)', 'to have items satisfying', 'to have text', 'Two');
			expect(node, 'queried for', '.Select-option:nth-child(2)', 'to have items satisfying', 'to have text', 'Three');
			expect(node, 'queried for', '.Select-option', 'to have length', 2);
		});
		
		it('should filter case insensitively', function () {

			typeSearchText('t');
			var node = React.findDOMNode(instance);
			expect(node, 'queried for', '.Select-option:nth-child(1)', 'to have items satisfying', 'to have text', 'Two');
			expect(node, 'queried for', '.Select-option:nth-child(2)', 'to have items satisfying', 'to have text', 'Three');
			expect(node, 'queried for', '.Select-option', 'to have length', 2);
		});
		
		it('should filter using "contains"', function () {
			
			// Search 'h', should only show 'Three'
			typeSearchText('h');
			var node = React.findDOMNode(instance);
			expect(node, 'queried for', '.Select-option:nth-child(1)', 'to have items satisfying', 'to have text', 'Three');
			expect(node, 'queried for', '.Select-option', 'to have length', 1);
		});
		
		it('should accept when enter is pressed', function () {

			// Search 'h', should only show 'Three'
			typeSearchText('h');
			pressEnterToAccept();
			expect(onChange, 'was called with', 'three');
		});
		
		it('should accept when tab is pressed', function () {

			// Search 'h', should only show 'Three'
			typeSearchText('h');
			pressTabToAccept();
			expect(onChange, 'was called with', 'three');
		});
	});
});
