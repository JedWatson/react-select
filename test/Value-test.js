'use strict';
/* global describe, it, beforeEach */

const helper = require('../testHelpers/jsdomHelper');
helper();

const unexpected = require('unexpected');
const unexpectedDom = require('unexpected-dom');
const unexpectedSinon = require('unexpected-sinon');
const sinon = require('sinon');

const expect = unexpected
	.clone()
	.installPlugin(unexpectedSinon)
	.installPlugin(unexpectedDom);

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-dom/test-utils');

const OPTION = { label: 'TEST-LABEL', value: 'TEST-VALUE' };

const Value = require('../src/Value');

describe('Value component', function () {

	let props;
	let value;

	beforeEach(function () {
		props = {
			value: OPTION,
			onRemove: sinon.spy()
		};
		value = TestUtils.renderIntoDocument(<Value {...props}>{OPTION.label}</Value>);
	});

	it('requests its own removal when the remove icon is clicked', function () {
		const selectItemIcon = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-value-icon');
		TestUtils.Simulate.mouseDown(selectItemIcon);
		expect(props.onRemove, 'was called');
	});

	it('requests its own removal when the remove icon is touched', function () {
		const selectItemIcon = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-value-icon');
		TestUtils.Simulate.touchStart(selectItemIcon);
		TestUtils.Simulate.touchEnd(selectItemIcon);
		expect(props.onRemove, 'was called');
	});

	it('ignores its own removal when the remove icon is touched and dragged', function () {
		const selectItemIcon = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-value-icon');
		TestUtils.Simulate.touchStart(selectItemIcon);
		TestUtils.Simulate.touchMove(selectItemIcon);
		TestUtils.Simulate.touchEnd(selectItemIcon);
		expect(props.onRemove, 'was not called');
	});

	describe('without a custom click handler', function () {

		it('presents the given label', function () {
			const selectItemLabel = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-value-label');
			expect(ReactDOM.findDOMNode(selectItemLabel), 'to have text', OPTION.label);
		});

	});

	describe('with a custom click handler', function () {
		let valueLabel;

		beforeEach(function () {
			props = {
				value: OPTION,
				onRemove: sinon.spy(),
				onClick: sinon.spy(),
			};
			value = TestUtils.renderIntoDocument(<Value {...props}>{OPTION.label}</Value>);
			valueLabel = TestUtils.findRenderedDOMComponentWithClass(value, 'Select-value-label');
		});

		it('presents the given label', function () {
			expect(ReactDOM.findDOMNode(valueLabel), 'to have text', OPTION.label);
		});

		it('calls a custom callback when the anchor is clicked', function () {
			TestUtils.Simulate.mouseDown(valueLabel, { button: 0 });
			expect(props.onClick, 'was called');
		});

		it('calls a custom callback when the anchor is touched', function () {
			TestUtils.Simulate.touchEnd(valueLabel);
			expect(props.onClick, 'was called');
		});

	});

});
