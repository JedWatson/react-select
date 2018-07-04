/* global describe, it, beforeEach */

import helper from '../testHelpers/jsdomHelper';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import unexpected from 'unexpected';
import unexpectedDom from 'unexpected-dom';
import unexpectedSinon from 'unexpected-sinon';

import Outer from '../src/Outer';

helper();
const expect = unexpected
	.clone()
	.installPlugin(unexpectedSinon)
	.installPlugin(unexpectedDom);

describe('Outer component', () => {

	let onMenuMouseDown, onMenuScroll, menuContainer, menu, instance;
	const createOuter = props => {
		onMenuMouseDown = sinon.spy();
		onMenuScroll = sinon.spy();
		// Render an instance of the component
		let instance = TestUtils.renderIntoDocument(
			<Outer
				onMenuContainerRef={ref => menuContainer = ref}
				onMenuRef={ref => menu = ref}
				onMenuMouseDown={onMenuMouseDown}
				onMenuScroll={onMenuScroll}
				{...props}>
				{props.children}
			</Outer>
		);

		return instance;
	};

	beforeEach(() => {
		const props = {
			instancePrefix: 'test',
			menuComponent: <div>Menu here</div>,
			menuContainerStyle: { color: 'red' },
			menuStyle: { color: 'blue' },
			children: <div>Menu here</div>
		};
		instance = createOuter(props);
	});

	it('sets the menu container ref', () => {
		expect(menuContainer, 'not to equal', undefined);
	});

	it('sets the menu ref', () => {
		expect(menu, 'not to equal', undefined);
	});

	it('renders the menu container', () => {
		expect(menuContainer.className, 'to equal', 'Select-menu-outer');
		expect(menuContainer.style.cssText, 'to equal', 'color: red;');
	});

	it('renders the menu', () => {
		expect(menu.className, 'to equal', 'Select-menu');
		expect(menu.style.cssText, 'to equal', 'color: blue;');
	});

	it('renders the menu options', () => {
		expect(menu.textContent, 'to equal', 'Menu here');
	});

	it('simulates menu click', () => {
		expect(onMenuMouseDown, 'was not called');
		TestUtils.Simulate.mouseDown(menu, { button: 0 });
		expect(onMenuMouseDown, 'was called');
	});

	it('simulates menu scroll', () => {
		expect(onMenuScroll, 'was not called');
		TestUtils.Simulate.scroll(menu);
		expect(onMenuScroll, 'was called');
	});
});
