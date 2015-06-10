'use strict';
/*global describe, it, jest, expect*/

jest.dontMock('../Value');

var React = require('react/addons');
var Value = require('../Value');
var TestUtils = React.addons.TestUtils;

describe('Value component', function() {

	var props;
	var value;

	beforeEach(function() {
		props = {
			label : 'TEST-LABEL',
			onRemove : jest.genMockFn()
		};
		value = TestUtils.renderIntoDocument(<Value {...props}/>);
	});

	it('requests its own removal when the remove icon is clicked', function() {
		var selectItemIcon = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-item-icon');
		TestUtils.Simulate.click(selectItemIcon.getDOMNode());
		expect(props.onRemove).toBeCalled();
	});

	it('requests its own removal when the remove icon is touched', function() {
		var selectItemIcon = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-item-icon');
		TestUtils.Simulate.touchEnd(selectItemIcon.getDOMNode());
		expect(props.onRemove).toBeCalled();
	});

	it('prevents event propagation', function() {
		var mockEvent = { stopPropagation : jest.genMockFn() };
		value.blockEvent(mockEvent);
		expect(mockEvent.stopPropagation).toBeCalled();

		// Note: we presently cannot mock the blockEvent method and trigger the mock
		// with mouseDown - relevant discussion here -
		// https://github.com/facebook/jest/issues/207

	});

	describe('without a custom click handler', function() {

		it('presents the given label', function() {
			var selectItemLabel = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-item-label');
			expect(selectItemLabel.getDOMNode().textContent).toBe(props.label);
		});

	});

	describe('with a custom click handler', function() {
		var selectItemLabelA;

		beforeEach(function() {
			props = {
				label : 'TEST-LABEL',
				onRemove : jest.genMockFn(),
				optionLabelClick : true,
				onOptionLabelClick : jest.genMockFn()
			};
			value = TestUtils.renderIntoDocument(<Value {...props}/>);
			selectItemLabelA = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-item-label__a');
		});

		it('presents the given label', function() {
			expect(selectItemLabelA.getDOMNode().textContent).toBe(props.label);
		});

		it('calls a custom callback when the anchor is clicked', function() {
			TestUtils.Simulate.click(selectItemLabelA.getDOMNode());
			expect(props.onOptionLabelClick).toBeCalled();
		});

		it('calls a custom callback when the anchor is touched', function() {
			TestUtils.Simulate.touchEnd(selectItemLabelA.getDOMNode());
			expect(props.onOptionLabelClick).toBeCalled();
		});

	
	
	});

});

