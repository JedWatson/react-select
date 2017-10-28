'use strict';
/* global describe, it, beforeEach */

var helper = require('../testHelpers/jsdomHelper');
helper();

var unexpected = require('unexpected');
var unexpectedDom = require('unexpected-dom');
var unexpectedSinon = require('unexpected-sinon');
var sinon = require('sinon');

var expect = unexpected
	.clone()
	.installPlugin(unexpectedSinon)
	.installPlugin(unexpectedDom);

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');

var Option = require('../src/Option').default;


describe('Option component', function() {
	var onFocus, onSelect, onUnfocus, instance;
	var createOption = (props) => {
		onFocus = sinon.spy();
		onSelect = sinon.spy();
		onUnfocus = sinon.spy();
		// Render an instance of the component
		instance = TestUtils.renderIntoDocument(
			<Option
				onFocus={onFocus}
				onSelect={onSelect}
				onUnfocus={onUnfocus}
				{...props}
				/>
		);
		return instance;

	};

	it('renders the given option', function() {
		var props = {
			instancePrefix: 'test',
			className: 'Wrapper-Class',
			children: 'Test Label',
			option: {
				title: 'testitem',
				label: 'testitem',
				className: 'Option-Class'
			}
		};
		instance = createOption(props);
		var node = ReactDOM.findDOMNode(instance);
		expect(node.textContent, 'to equal', 'Test Label');
		expect(onSelect, 'was not called');
		TestUtils.Simulate.mouseDown(node);
		expect(onSelect, 'was called');
		expect(onFocus, 'was not called');
		TestUtils.Simulate.mouseEnter(node);
		expect(onFocus, 'was called');
		TestUtils.Simulate.mouseMove(node);
		expect(onFocus, 'was called');
	});
	it('does not focus if Option isFocused already', function() {
		var props = {
			isFocused: true,
			instancePrefix: 'test',
			className: 'Wrapper-Class',
			children: 'Test Label',
			option: {
				title: 'testitem',
				label: 'testitem',
				className: 'Option-Class'
			}
		};
		instance = createOption(props);
		var node = ReactDOM.findDOMNode(instance);
		expect(onFocus, 'was not called');
		TestUtils.Simulate.mouseEnter(node);
		expect(onFocus, 'was not called');
	});
	it('simulates touch events', function() {
		var props = {
			instancePrefix: 'test',
			className: 'Wrapper-Class',
			children: 'Test Label',
			option: {
				title: 'testitem',
				label: 'testitem',
				className: 'Option-Class'
			}
		};
		instance = createOption(props);
		var node = ReactDOM.findDOMNode(instance);
		expect(instance.dragging, 'to equal', undefined);
		// simulate scrolling event
		TestUtils.Simulate.touchStart(node);
		expect(instance.dragging, 'to equal', false);
		TestUtils.Simulate.touchMove(node);
		expect(instance.dragging, 'to equal', true);
		TestUtils.Simulate.touchEnd(node);
		expect(instance.dragging, 'to equal', true);
		// simulate touch to select option.
		TestUtils.Simulate.touchStart(node);
		expect(instance.dragging, 'to equal', false);
		expect(onSelect, 'was not called');
		TestUtils.Simulate.touchEnd(node);
		expect(onSelect, 'was called');
		expect(instance.dragging, 'to equal', false);
	});
});
