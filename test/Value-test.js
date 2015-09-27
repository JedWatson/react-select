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
var TestUtils = require('react-addons-test-utils');

var OPTION = { label: 'TEST-LABEL', value: 'TEST-VALUE' };

var Value = require('../src/Value');

describe('Value component', function() {

	var props;
	var value;

	beforeEach(function() {
		props = {
			option: OPTION,
			onRemove: sinon.spy()
		};
		value = TestUtils.renderIntoDocument(<Value {...props}/>);
	});

	it('requests its own removal when the remove icon is clicked', function() {
		var selectItemIcon = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-item-icon');
		TestUtils.Simulate.click(selectItemIcon);
		expect(props.onRemove, 'was called');
	});

	it('requests its own removal when the remove icon is touched', function() {
		var selectItemIcon = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-item-icon');
		TestUtils.Simulate.touchEnd(selectItemIcon);
		expect(props.onRemove, 'was called');
	});

	it('prevents event propagation, pt 1', function() {
		var mockEvent = { stopPropagation: sinon.spy() };
		value.blockEvent(mockEvent);
		expect(mockEvent.stopPropagation, 'was called');
	});

	describe('without a custom click handler', function() {

		it('presents the given label', function() {
			var selectItemLabel = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-item-label');
			expect(ReactDOM.findDOMNode(selectItemLabel), 'to have text', OPTION.label);
		});

	});

	describe('with a custom click handler', function() {
		var selectItemLabelA;

		beforeEach(function() {
			props = {
				option: OPTION,
				onRemove: sinon.spy(),
				optionLabelClick: true,
				onOptionLabelClick: sinon.spy()
			};
			value = TestUtils.renderIntoDocument(<Value {...props}/>);
			selectItemLabelA = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-item-label__a');
		});

		it('presents the given label', function() {
			expect(ReactDOM.findDOMNode(selectItemLabelA), 'to have text', OPTION.label);
		});

		it('calls a custom callback when the anchor is clicked', function() {
			TestUtils.Simulate.click(selectItemLabelA);
			expect(props.onOptionLabelClick, 'was called');
		});

		it('calls a custom callback when the anchor is touched', function() {
			TestUtils.Simulate.touchEnd(selectItemLabelA);
			expect(props.onOptionLabelClick, 'was called');
		});

	});

});
