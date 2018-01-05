/* global describe, it, beforeEach */

import helper from '../testHelpers/jsdomHelper';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import unexpected from 'unexpected';
import unexpectedDom from 'unexpected-dom';
import unexpectedSinon from 'unexpected-sinon';

import blockEvent from '../src/utils/blockEvent';

import Option from '../src/Option';

helper();
const expect = unexpected
	.clone()
	.installPlugin(unexpectedSinon)
	.installPlugin(unexpectedDom);

describe('Option component', () => {
	let onFocus, onSelect, onUnfocus, instance, node;
	const createOption = props => {
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

	beforeEach(() => {
		const props = {
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
		node = ReactDOM.findDOMNode(instance);
	});

	it('renders the given option', () => {
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

	it('does not focus if Option isFocused already', () => {
		const props = {
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
		node = ReactDOM.findDOMNode(instance);
		expect(onFocus, 'was not called');
		TestUtils.Simulate.mouseEnter(node);
		expect(onFocus, 'was not called');
	});

	it('simulates touch events', () => {
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

	describe('blockEvent', () => {
		let preventDefault, stopPropagation, openStub;
		beforeEach(() =>{
			preventDefault = sinon.spy();
			stopPropagation = sinon.spy();
			openStub = sinon.stub(window, 'open');
		});

		afterEach(() => {
			openStub.restore();
		});

		it('should call window.open', () => {
			const event = {
				target: {
					href: 'http://go.com',
					tagName: 'A',
					target: 'yes',
				},
				preventDefault,
				stopPropagation,
			};

			blockEvent(event);

			expect(openStub, 'was called once');
			expect(openStub, 'was called with', event.target.href, event.target.target);
		});

		it('should set window.location.href and not call window.open', () => {
			const event = {
				target: {
					href: 'http://go.com',
					tagName: 'A',
				},
				preventDefault,
				stopPropagation,
			};

			Object.defineProperty(window.location, 'href', {
				writable: true,
				value: 'url'
			});

			expect(window.location.href, 'not to equal', event.target.href);

			blockEvent(event);

			expect(window.location.href, 'to equal', event.target.href);
			expect(openStub, 'was not called');
		});

		it('should return and not call window.open when tagName !=A', () => {
			const event = {
				target: {
					href: 'http://go.com',
					tagName: '',
				},
				preventDefault,
				stopPropagation,
			};

			Object.defineProperty(window.location, 'href', {
				writable: true,
				value: 'url'
			});

			expect(window.location.href, 'to equal', 'url');

			blockEvent(event);

			expect(window.location.href, 'to equal', 'url');
			expect(openStub, 'was not called');
		});

		it('should return and not call window.open when no href', () => {
			const event = {
				target: {
					tagName: 'A',
				},
				preventDefault,
				stopPropagation,
			};

			Object.defineProperty(window.location, 'href', {
				writable: true,
				value: 'url'
			});

			expect(window.location.href, 'to equal', 'url');

			blockEvent(event);

			expect(window.location.href, 'to equal', 'url');
			expect(openStub, 'was not called');
		});
	});
});
