'use strict';
/* global describe, it, beforeEach */

var jsdom = require('mocha-jsdom');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;

chai.should();
chai.use(sinonChai);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var OPTION = { label: 'TEST-LABEL', value: 'TEST-VALUE' };

var Value = require('../src/Value');

describe('Value component', function() {
	jsdom();

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
		TestUtils.Simulate.click(selectItemIcon.getDOMNode());
		expect(props.onRemove).to.have.been.called;
	});

	it('requests its own removal when the remove icon is touched', function() {
		var selectItemIcon = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-item-icon');
		TestUtils.Simulate.touchEnd(selectItemIcon.getDOMNode());
		expect(props.onRemove).to.have.been.called;
	});

	it('prevents event propagation, pt 1', function() {
		var mockEvent = { stopPropagation: sinon.spy() };
		value.blockEvent(mockEvent);
		expect(mockEvent.stopPropagation).to.have.been.called;
	});

	describe('without a custom click handler', function() {

		it('presents the given label', function() {
			var selectItemLabel = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-item-label');
			expect(selectItemLabel.getDOMNode().textContent).to.equal(OPTION.label);
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
			expect(selectItemLabelA.getDOMNode().textContent).to.equal(OPTION.label);
		});

		it('calls a custom callback when the anchor is clicked', function() {
			TestUtils.Simulate.click(selectItemLabelA.getDOMNode());
			expect(props.onOptionLabelClick).to.have.been.called;
		});

		it('calls a custom callback when the anchor is touched', function() {
			TestUtils.Simulate.touchEnd(selectItemLabelA.getDOMNode());
			expect(props.onOptionLabelClick).to.have.been.called;
		});

	});

});
