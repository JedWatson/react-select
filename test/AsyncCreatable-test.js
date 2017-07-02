'use strict';
/* global describe, it, beforeEach */
/* eslint react/jsx-boolean-value: 0 */

const jsdomHelper = require('../testHelpers/jsdomHelper');
jsdomHelper();
const unexpected = require('unexpected');
const unexpectedDom = require('unexpected-dom');
const unexpectedReact = require('unexpected-react');
const expect = unexpected
	.clone()
	.installPlugin(unexpectedDom)
	.installPlugin(unexpectedReact);

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-dom/test-utils');
const ShallowRenderer = require('react-test-renderer/shallow');
const sinon = require('sinon');
const Select = require('../src/Select');

// noinspection JSUnnecessarySemicolon
describe('AsyncCreatable', () => {
	let creatableInstance, creatableNode, filterInputNode, loadOptions, renderer;

	beforeEach(() => {
		loadOptions = sinon.stub();
		renderer = new ShallowRenderer();
	});

	function createControl(props = {}) {
		props.loadOptions = props.loadOptions || loadOptions;
		creatableInstance = TestUtils.renderIntoDocument(
			<Select.AsyncCreatable {...props} />
		);
		creatableNode = ReactDOM.findDOMNode(creatableInstance);
		findAndFocusInputControl();
	}

	function findAndFocusInputControl() {
		filterInputNode = creatableNode.querySelector('input');
		if (filterInputNode) {
			TestUtils.Simulate.focus(filterInputNode);
		}
	}

	it('should create an inner Select', () => {
		createControl();
		expect(creatableNode, 'to have attributes', {
			class: [ 'Select' ]
		});
	});

	it('should render a decorated Select (with passed through properties)', () => {
		createControl({
			inputProps: {
				className: 'foo'
			}
		});
		expect(creatableNode.querySelector('.Select-input'), 'to have attributes', {
			class: [ 'foo' ]
		});
	});

	describe('.focus()', () => {
		beforeEach(() => {
			createControl({});
			TestUtils.Simulate.blur(filterInputNode);
		});

		it('focuses the search input', () => {
			expect(filterInputNode, 'not to equal', document.activeElement);
			creatableInstance.focus();
			expect(filterInputNode, 'to equal', document.activeElement);
		});
	});
});
