'use strict';
/* global describe, it, beforeEach */

var jsdomHelper = require('../testHelpers/jsdomHelper');

var sinon = require('sinon');
var unexpected = require('unexpected');
var unexpectedDom = require('unexpected-dom');
var unexpectedSinon = require('unexpected-sinon');
var expect = unexpected
	.clone()
	.installPlugin(unexpectedDom)
	.installPlugin(unexpectedSinon);

jsdomHelper();

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Select = require('../src/Select');

// The displayed text of the currently selected item, when items collapsed
var DISPLAYED_SELECTION_SELECTOR = '.Select-placeholder';
var FORM_VALUE = '.Select > input';

class PropsWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = props || {};
	}

	setPropsForChild(props) {
		this.setState(props);
	}

	getChild() {
		return this.refs.child;
	}

	render() {
		var Component = this.props.childComponent; // eslint-disable-line react/prop-types
		return <Component {...this.state} ref="child" />;
	}
}

describe('Select', function() {
	var options, onChange, onInputChange;
	var instance, wrapper;
	var searchInputNode;

	function getSelectControl(instance) {
		return React.findDOMNode(instance).querySelector('.Select-control');
	}

	function enterSingleCharacter() {
		TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 65, key: 'a' });
	}

	function pressEnterToAccept() {
		TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 13, key: 'Enter' });
	}

	function pressTabToAccept() {
		TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 9, key: 'Tab' });
	}

	function pressEscape() {
		TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 27, key: 'Escape' });
	}

	function pressBackspace() {
		TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 8, key: 'Backspace' });
	}

	function pressUp() {
		TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 38, key: 'ArrowUp' });
	}

	function pressDown() {
		TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
	}

	function typeSearchText(text) {
		TestUtils.Simulate.change(searchInputNode, { target: { value: text } });
	}

	function clickArrowToOpen() {
		var selectArrow = React.findDOMNode(instance).querySelector('.Select-arrow');
		TestUtils.Simulate.mouseDown(selectArrow);
	}

	function clickDocument() {
		var clickEvent = document.createEvent('MouseEvents');
		clickEvent.initEvent('click', true, true);
		document.dispatchEvent(clickEvent);
	}

	function findAndFocusInputControl() {
		// Focus on the input, such that mouse events are accepted
		var searchInstance = React.findDOMNode(instance.getInputNode());
		searchInputNode = null;
		if (searchInstance) {
			searchInputNode = searchInstance.querySelector('input');
			if (searchInputNode) {
				TestUtils.Simulate.focus(searchInputNode);
			}
		}
	}

	var createControl = function(props) {

		onChange = sinon.spy();
		onInputChange = sinon.spy();
		// Render an instance of the component
		instance = TestUtils.renderIntoDocument(
			<Select
				onChange={onChange}
				onInputChange={onInputChange}
				{...props}
				/>
		);

		findAndFocusInputControl();
		return instance;

	};

	var createControlWithWrapper = function (props) {
		onChange = sinon.spy();
		onInputChange = sinon.spy();

		wrapper = TestUtils.renderIntoDocument(
			<PropsWrapper
				childComponent={Select}
				onChange={onChange}
				onInputChange={onInputChange}
				{...props}
				/>
		);

		instance = wrapper.getChild();

		findAndFocusInputControl();

		return wrapper;
	};

	var defaultOptions = [
		{ value: 'one', label: 'One' },
		{ value: 'two', label: '222' },
		{ value: 'three', label: 'Three' },
		{ value: 'four', label: 'AbcDef' }
	];


	describe('with simple options', function () {

		beforeEach(function () {

			options = [
				{ value: 'one', label: 'One' },
				{ value: 'two', label: 'Two' },
				{ value: 'three', label: 'Three' }
			];

			instance = createControl({
					name: 'form-field-name',
					value: 'one',
					options: options,
					searchable: true
			});
		});


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

		it('should pass input value when entering text', function () {
			typeSearchText('a');
			enterSingleCharacter('a');
			expect(onInputChange, 'was called with', 'a');
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

		describe('pressing escape', function () {
			beforeEach(function () {
				typeSearchText('h');
				pressTabToAccept();
				expect(onChange, 'was called with', 'three');
				onChange.reset();
				pressEscape();
			});

			it('should call onChange with a empty value', function () {

				// TODO: Shouldn't this be null, really?
				expect(onChange, 'was called with', '');
			});

			it('should clear the display', function () {

				expect(React.findDOMNode(instance).querySelector(DISPLAYED_SELECTION_SELECTOR),
					'to have text', 'Select...');
			});
		});

		it('should focus the first value on mouse click', function () {

			TestUtils.Simulate.mouseDown(React.findDOMNode(instance).querySelector('.Select-control'));
			expect(React.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'One');
		});

		it('should move the focused value to the second value when down pressed', function () {

			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			expect(React.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'Two');
		});

		it('should move the focused value to the second value when down pressed', function () {

			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			expect(React.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'Three');
		});

		it('should loop round to top item when down is pressed on the last item', function () {

			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			expect(React.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'One');
		});

		it('should loop round to bottom item when up is pressed on the first item', function () {

			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 38, key: 'ArrowUp' });
			expect(React.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'Three');
		});

		it('should move the focused value to the second item when up pressed twice', function () {

			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 38, key: 'ArrowUp' });
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 38, key: 'ArrowUp' });
			expect(React.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'Two');
		});

		it('should clear the selection on escape', function () {

			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 27, key: 'Escape' });
			expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-option');

		});

		it('should open the options on arrow down with the top option focused, when the options are closed', function () {

			var selectControl = getSelectControl(instance);
			var domNode = React.findDOMNode(instance);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 38, key: 'ArrowDown' });
			expect(domNode, 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'One');
		});

		it('should open the options on arrow up with the top option focused, when the options are closed', function () {

			var selectControl = getSelectControl(instance);
			var domNode = React.findDOMNode(instance);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			expect(domNode, 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'One');
		});

		it('should close the options one the second click on the arrow', function () {
			var selectArrow = React.findDOMNode(instance).querySelector('.Select-arrow');
			TestUtils.Simulate.mouseDown(selectArrow);
			expect(React.findDOMNode(instance).querySelectorAll('.Select-option'), 'to have length', 3);

			TestUtils.Simulate.mouseDown(selectArrow);
			expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
		});

		it('should ignore a right mouse click on the arrow', function () {
			var selectArrow = React.findDOMNode(instance).querySelector('.Select-arrow');
			TestUtils.Simulate.mouseDown(selectArrow, { type: 'mousedown', button: 1 });
			expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
		});


		describe('after mouseEnter and leave of an option', function () {

			beforeEach(function () {

				// Show the options
				var selectControl = getSelectControl(instance);
				TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });

				var optionTwo = React.findDOMNode(instance).querySelectorAll('.Select-option')[1];
				TestUtils.SimulateNative.mouseOver(optionTwo);
				TestUtils.SimulateNative.mouseOut(optionTwo);
			});

			it('should have no focused options', function () {

				var domNode = React.findDOMNode(instance);
				expect(domNode, 'to contain no elements matching', '.Select-option.is-focused');
			});

			it('should focus top option after down arrow pressed', function () {

				var selectControl = getSelectControl(instance);
				TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
				var domNode = React.findDOMNode(instance);
				expect(domNode, 'queried for', '.Select-option.is-focused',
					'to have items satisfying',
					'to have text', 'One');

			});

			it('should focus last option after up arrow pressed', function () {

				var selectControl = getSelectControl(instance);
				TestUtils.Simulate.keyDown(selectControl, { keyCode: 38, key: 'ArrowUp' });
				var domNode = React.findDOMNode(instance);
				expect(domNode, 'queried for', '.Select-option.is-focused',
					'to have items satisfying',
					'to have text', 'Three');
			});

		});

	});

	describe('with values as numbers', function () {

		beforeEach(function () {

			options = [
				{ value: 0, label: 'Zero' },
				{ value: 1, label: 'One' },
				{ value: 2, label: 'Two' },
				{ value: 3, label: 'Three' }
			];

			wrapper = createControlWithWrapper({
				value: 2,
				options: options,
				searchable: true
			});
		});

		it('selects the initial value', function () {

			expect(React.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have text', 'Two');
		});

		it('set the initial value of the hidden input control', function () {

			expect(React.findDOMNode(wrapper).querySelector(FORM_VALUE).value, 'to equal', '2' );
		});

		it('updates the value when the value prop is set', function () {

			wrapper.setPropsForChild({ value: 3 });
			expect(React.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have text', 'Three');
		});

		it('updates the value of the hidden input control after new value prop', function () {

			wrapper.setPropsForChild({ value: 3 });
			expect(React.findDOMNode(wrapper).querySelector(FORM_VALUE).value, 'to equal', '3' );
		});

		it('calls onChange with the new value as a number', function () {

			clickArrowToOpen();
			pressDown();
			pressEnterToAccept();
			expect(onChange, 'was called with', 3, [ { value: 3, label: 'Three' }]);
		});

		it('supports setting the value to 0 via prop', function () {

			wrapper.setPropsForChild({ value: 0 });
			expect(React.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have text', 'Zero');
		});

		it('supports selecting the zero value', function () {

			clickArrowToOpen();
			pressUp();
			pressUp();
			pressEnterToAccept();
			expect(onChange, 'was called with', 0, [ { value: 0, label: 'Zero' }]);
		});

		describe('with multi=true', function () {

			beforeEach(function () {

				options = [
					{ value: 0, label: 'Zero' },
					{ value: 1, label: 'One' },
					{ value: 2, label: 'Two' },
					{ value: 3, label: 'Three' },
					{ value: 4, label: 'Four' }
				];

				wrapper = createControlWithWrapper({
					value: '2,1',
					options: options,
					multi: true,
					searchable: true
				});
			});

			it('selects the initial value', function () {

				expect(React.findDOMNode(instance), 'queried for', '.Select-item .Select-item-label',
					'to satisfy', [
						expect.it('to have text', 'Two'),
						expect.it('to have text', 'One')
					]);
			});

			it('calls onChange with the correct value when 1 option is selected', function () {

				var removeIcons = React.findDOMNode(instance).querySelectorAll('.Select-item .Select-item-icon');
				TestUtils.Simulate.click(removeIcons[0]);
				// For multi-select, the "value" (first arg) to onChange is always a string
				expect(onChange, 'was called with', '1', [{ value: 1, label: 'One' }]);
			});

			it('supports updating the values via props', function () {

				wrapper.setPropsForChild({
					value: '3,4'
				});

				expect(React.findDOMNode(instance), 'queried for', '.Select-item .Select-item-label',
					'to satisfy', [
						expect.it('to have text', 'Three'),
						expect.it('to have text', 'Four')
					]);
			});

			it('supports updating the value to 0', function () {

				// This test is specifically in case there's a "if (value) {... " somewhere
				wrapper.setPropsForChild({
					value: 0
				});

				expect(React.findDOMNode(instance), 'queried for', '.Select-item .Select-item-label',
					'to satisfy', [
						expect.it('to have text', 'Zero')
					]);
			});

			it('calls onChange with the correct values when multiple options are selected', function () {

				typeSearchText('fo');
				pressEnterToAccept(); // Select 'Four'

				expect(onChange, 'was called with', '2,1,4', [
					{ value: 2, label: 'Two' },
					{ value: 1, label: 'One' },
					{ value: 4, label: 'Four' }
				]);
			});
		});

		describe('searching', function () {

			let searchOptions = [
				{ value: 1, label: 'One' },
				{ value: 2, label: 'Two' },
				{ value: 10, label: 'Ten' },
				{ value: 20, label: 'Twenty' },
				{ value: 21, label: 'Twenty-one' },
				{ value: 34, label: 'Thirty-four' },
				{ value: 54, label: 'Fifty-four' }
			];

			describe('with matchPos=any and matchProp=any', function () {
				beforeEach(function () {
					instance = createControl({
						matchPos: 'any',
						matchProp: 'any',
						options: searchOptions
					});
				});

				it('finds text anywhere in value', function () {

					typeSearchText('1');
					expect(React.findDOMNode(instance), 'queried for', '.Select-option',
					'to satisfy', [
							expect.it('to have text', 'One'),
							expect.it('to have text', 'Ten'),
							expect.it('to have text', 'Twenty-one')
						]);
				});

				it('finds text at end', function () {

					typeSearchText('4');
					expect(React.findDOMNode(instance), 'queried for', '.Select-option',
						'to satisfy', [
							expect.it('to have text', 'Thirty-four'),
							expect.it('to have text', 'Fifty-four')
						]);
				});
			});

			describe('with matchPos=start and matchProp=any', function () {

				beforeEach(function () {
					instance = createControl({
						matchPos: 'start',
						matchProp: 'any',
						options: searchOptions
					});
				});

				it('finds text at the start of the value', function () {

					typeSearchText('1');
					expect(React.findDOMNode(instance), 'queried for', '.Select-option',
						'to satisfy', [
							expect.it('to have text', 'One'),
							expect.it('to have text', 'Ten')
						]);
				});

				it('does not match text at end', function () {

					typeSearchText('4');
					expect(React.findDOMNode(instance), 'to contain elements matching',
						'.Select-noresults');
					expect(React.findDOMNode(instance), 'to contain no elements matching',
						'.Select-option');
				});
			});

			describe('with matchPos=any and matchProp=value', function () {
				beforeEach(function () {
					instance = createControl({
						matchPos: 'any',
						matchProp: 'value',
						options: searchOptions
					});
				});

				it('finds text anywhere in value', function () {

					typeSearchText('1');
					expect(React.findDOMNode(instance), 'queried for', '.Select-option',
						'to satisfy', [
							expect.it('to have text', 'One'),
							expect.it('to have text', 'Ten'),
							expect.it('to have text', 'Twenty-one')
						]);
				});

				it('finds text at end', function () {

					typeSearchText('4');
					expect(React.findDOMNode(instance), 'queried for', '.Select-option',
						'to satisfy', [
							expect.it('to have text', 'Thirty-four'),
							expect.it('to have text', 'Fifty-four')
						]);
				});
			});

			describe('with matchPos=start and matchProp=value', function () {

				beforeEach(function () {
					instance = createControl({
						matchPos: 'start',
						matchProp: 'value',
						options: searchOptions
					});
				});

				it('finds text at the start of the value', function () {

					typeSearchText('1');
					expect(React.findDOMNode(instance), 'queried for', '.Select-option',
						'to satisfy', [
							expect.it('to have text', 'One'),
							expect.it('to have text', 'Ten')
						]);
				});

				it('does not match text at end', function () {

					typeSearchText('4');
					expect(React.findDOMNode(instance), 'to contain elements matching',
						'.Select-noresults');
					expect(React.findDOMNode(instance), 'to contain no elements matching',
						'.Select-option');
				});
			});
		});
	});

	describe('with options and value', function () {
		beforeEach(function () {

			options = [
				{ value: 'one', label: 'One' },
				{ value: 'two', label: 'Two' },
				{ value: 'three', label: 'Three' }
			];

			// Render an instance of the component
			wrapper = createControlWithWrapper({
				value: 'one',
				options: options,
				searchable: true
			});
		});

		it('starts with the given value', function () {

			var node = React.findDOMNode(instance);
			expect(node, 'queried for', DISPLAYED_SELECTION_SELECTOR,
				'to have items satisfying', 'to have text', 'One');
		});



		it('supports setting the value via prop', function () {

			wrapper.setPropsForChild({
				value: 'three'
			});

			expect(React.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
				'to have items satisfying', 'to have text', 'Three');
		});

		it('sets the value of the hidden form node', function () {

			wrapper.setPropsForChild({
				value: 'three'
			});

			expect(React.findDOMNode(wrapper).querySelector(FORM_VALUE).value, 'to equal', 'three' );
		});

		it('display the raw value if the option is not available', function () {

			wrapper.setPropsForChild({
				value: 'something new'
			});

			expect(React.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
				'to have items satisfying', 'to have text', 'something new');
		});

		it('updates the display text if the option appears later', function () {

			wrapper.setPropsForChild({
				value: 'new'
			});

			wrapper.setPropsForChild({
				options: [
					{ value: 'one', label: 'One' },
					{ value: 'two', labal: 'Two' },
					{ value: 'new', label: 'New item in the options' },
					{ value: 'three', label: 'Three' }
				]
			});

			expect(React.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
				'to have items satisfying', 'to have text', 'New item in the options');

		});
	});

	describe('with a disabled option', function () {

		beforeEach(function () {

			options = [
				{ value: 'one', label: 'One' },
				{ value: 'two', label: 'Two', disabled: true },
				{ value: 'three', label: 'Three' }
			];

			wrapper = createControlWithWrapper({
				options: options,
				searchable: true
			});
		});

		it('adds the is-disabled class to the disabled option', function () {

			clickArrowToOpen();
			expect(React.findDOMNode(instance).querySelectorAll('.Select-option')[1],
				'to have attributes', {
					class: 'is-disabled'
            });
		});

		it('is not selectable by clicking', function () {

			clickArrowToOpen();
			TestUtils.Simulate.mouseDown(React.findDOMNode(instance).querySelectorAll('.Select-option')[1]);

			expect(onChange, 'was not called');
			expect(React.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have text', 'Select...');
		});

		it('is not selectable by keyboard', function () {

			clickArrowToOpen();
			// Press down to get to the second option
			TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
			// Check the disable option is not focused
			expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-option.is-disabled.is-focused');
		});

		it('jumps over the disabled option', function () {

			clickArrowToOpen();
			// Press down to get to the second option
			TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
			// Check the focused option is the one after the disabled option
			expect(React.findDOMNode(instance), 'queried for first', '.Select-option.is-focused',
				'to have text', 'Three');
		});

		it('jumps back to beginning when disabled option is last option', function () {

			wrapper = createControlWithWrapper({
				options: [
					{ value: 'one', label: 'One' },
					{ value: 'two', label: 'Two' },
					{ value: 'three', label: 'Three', disabled: true }
				]
			});

			clickArrowToOpen();
			// Down twice
			TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
			TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });

			// Selected option should be back to 'One'
			expect(React.findDOMNode(instance), 'queried for first', '.Select-option.is-focused',
				'to have text', 'One');
		});

		it('skips over last option when looping round when last option is disabled', function () {

			wrapper = createControlWithWrapper({
				options: [
					{ value: 'one', label: 'One' },
					{ value: 'two', label: 'Two' },
					{ value: 'three', label: 'Three', disabled: true }
				]
			});

			clickArrowToOpen();
			// Press up, should skip the bottom entry 'Three'...
			TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 38, key: 'ArrowUp' });

			// ... and land on 'Two'
			expect(React.findDOMNode(instance), 'queried for first', '.Select-option.is-focused',
				'to have text', 'Two');
		});

		it('focuses initially on the second option when the first is disabled', function () {

			wrapper = createControlWithWrapper({
				options: [
					{ value: 'one', label: 'One', disabled: true },
					{ value: 'two', label: 'Two' },
					{ value: 'three', label: 'Three' }
				]
			});

			clickArrowToOpen();
			expect(React.findDOMNode(instance), 'queried for first', '.Select-option.is-focused',
				'to have text', 'Two');
		});

		it('doesn\'t focus anything when all options are disabled', function () {

			wrapper = createControlWithWrapper({
				options: [
					{ value: 'one', label: 'One', disabled: true },
					{ value: 'two', label: 'Two', disabled: true },
					{ value: 'three', label: 'Three', disabled: true }
				]
			});

			clickArrowToOpen();

			TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
			expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-option.is-focused');
		});

		it('doesn\'t select anything when all options are disabled and enter is pressed', function () {

			wrapper = createControlWithWrapper({
				options: [
					{ value: 'one', label: 'One', disabled: true },
					{ value: 'two', label: 'Two', disabled: true },
					{ value: 'three', label: 'Three', disabled: true }
				]
			});

			clickArrowToOpen();

			TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 13, key: 'Enter' });
			expect(onChange, 'was not called');
			expect(React.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have text', 'Select...');
		});

		it("doesn't select anything when a disabled option is the only item in the list after a search", function () {

			typeSearchText('tw'); // Only 'two' in the list
			pressEnterToAccept();
			expect(onChange, 'was not called');
			// And the menu is still open
			expect(React.findDOMNode(instance), 'to contain no elements matching', DISPLAYED_SELECTION_SELECTOR);
			expect(React.findDOMNode(instance), 'queried for' , '.Select-option',
				'to satisfy', [
					expect.it('to have text', 'Two')
				]);
		});

		it("doesn't select anything when a disabled option value matches the entered text", function () {

			typeSearchText('two');  // Matches value
			pressEnterToAccept();
			expect(onChange, 'was not called');
			// And the menu is still open
			expect(React.findDOMNode(instance), 'to contain no elements matching', DISPLAYED_SELECTION_SELECTOR);
			expect(React.findDOMNode(instance), 'queried for' , '.Select-option',
				'to satisfy', [
					expect.it('to have text', 'Two')
				]);
		});

		it("doesn't select anything when a disabled option label matches the entered text", function () {

			typeSearchText('Two');  // Matches label
			pressEnterToAccept();
			expect(onChange, 'was not called');
			// And the menu is still open
			expect(React.findDOMNode(instance), 'to contain no elements matching', DISPLAYED_SELECTION_SELECTOR);
			expect(React.findDOMNode(instance), 'queried for' , '.Select-option',
				'to satisfy', [
					expect.it('to have text', 'Two')
				]);
		});

		it('shows disabled results in a search', function () {

			typeSearchText('t');
			var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(options[0], 'to have text', 'Two');
			expect(options[0], 'to have attributes', {
				class: 'is-disabled'
			});
			expect(options[1], 'to have text', 'Three');
		});

		it('is does not close menu when disabled option is clicked', function () {

			clickArrowToOpen();
			TestUtils.Simulate.mouseDown(React.findDOMNode(instance).querySelectorAll('.Select-option')[1]);

			var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(options.length, 'to equal', 3);
		});
	});

	describe('with styled options', function () {

		beforeEach(function () {

			options = [
				{ value: 'one', label: 'One', className: 'extra-one', title: 'Eins' },
				{ value: 'two', label: 'Two', className: 'extra-two', title: 'Zwei' },
				{ value: 'three', label: 'Three', style: { fontSize: 25 } }
			];

			wrapper = createControlWithWrapper({
				options: options
			});
		});

		it('uses the given className for an option', function () {

			clickArrowToOpen();
			expect(React.findDOMNode(instance).querySelectorAll('.Select-option')[0], 'to have attributes',
				{
					class: 'extra-one'
				});
		});

		it('uses the given style for an option', function () {

			clickArrowToOpen();
			expect(React.findDOMNode(instance).querySelectorAll('.Select-option')[2], 'to have attributes',
				{
					style: { 'font-size': '25px' }
				});
		});

		it('uses the given title for an option', function () {

			clickArrowToOpen();
			expect(React.findDOMNode(instance).querySelectorAll('.Select-option')[1], 'to have attributes',
				{
					title: 'Zwei'
				});
		});

		it('uses the given className for a single selection', function () {

			typeSearchText('tw');
			pressEnterToAccept();
			expect(React.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have attributes', {
					class: 'extra-two'
				});
		});

		it('uses the given style for a single selection', function () {

			typeSearchText('th');
			pressEnterToAccept();
			expect(React.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have attributes', {
					style: {
						'font-size': '25px'
					}
				});
		});

		it('uses the given title for a single selection', function () {

			typeSearchText('tw');
			pressEnterToAccept();
			expect(React.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have attributes', {
					title: 'Zwei'
				});
		});

		describe('with multi', function () {

			beforeEach(function () {

				wrapper.setPropsForChild({ multi: true });
			});


			it('uses the given className for a selected value', function () {

				typeSearchText('tw');
				pressEnterToAccept();
				expect(React.findDOMNode(instance), 'queried for first', '.Select-item',
					'to have attributes', {
						class: 'extra-two'
					});
			});

			it('uses the given style for a selected value', function () {

				typeSearchText('th');
				pressEnterToAccept();
				expect(React.findDOMNode(instance), 'queried for first', '.Select-item',
					'to have attributes', {
						style: {
							'font-size': '25px'
						}
					});
			});

			it('uses the given title for a selected value', function () {

				typeSearchText('tw');
				pressEnterToAccept();
				expect(React.findDOMNode(instance), 'queried for first', '.Select-item',
					'to have attributes', {
						title: 'Zwei'
					});
			});

		});

	});

	describe('with allowCreate=true', function () {

		beforeEach(function () {

			options = [
				{ value: 'one', label: 'One' },
				{ value: 'two', label: 'Two' },
				{ value: 'got spaces', label: 'Label for spaces' },
				{ value: 'gotnospaces', label: 'Label for gotnospaces' },
				{ value: 'abc 123', label: 'Label for abc 123' },
				{ value: 'three', label: 'Three' },
				{ value: 'zzzzz', label: 'test value' }
			];

			// Render an instance of the component
			wrapper = createControlWithWrapper({
				value: 'one',
				options: options,
				allowCreate: true,
				searchable: true,
				addLabelText: 'Add {label} to values?'
			});
		});

		it('has an "Add xyz" option when entering xyz', function () {
			typeSearchText('xyz');

			expect(React.findDOMNode(instance), 'queried for', '.Select-menu .Select-option',
				'to have items satisfying', 'to have text', 'Add xyz to values?');
		});

		it('fires an onChange with the new value when selecting the Add option', function () {

			typeSearchText('xyz');
			TestUtils.Simulate.click(React.findDOMNode(instance).querySelector('.Select-menu .Select-option'));

			expect(onChange, 'was called with', 'xyz');
		});

		it('allows updating the options with a new label, following the onChange', function () {

			typeSearchText('xyz');
			TestUtils.Simulate.click(React.findDOMNode(instance).querySelector('.Select-menu .Select-option'));

			expect(onChange, 'was called with', 'xyz');

			// Now the client adds the option, with a new label
			wrapper.setPropsForChild({
				options: [
					{ value: 'one', label: 'One' },
					{ value: 'xyz', label: 'XYZ Label' }
				],
				value: 'xyz'
			});

			expect(React.findDOMNode(instance).querySelector(DISPLAYED_SELECTION_SELECTOR),
				'to have text', 'XYZ Label');
		});

		it('displays an add option when a value with spaces is entered', function () {

			typeSearchText('got');

			expect(React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[0],
				'to have text', 'Add got to values?');
		});

		it('displays an add option when a value with spaces is entered', function () {

			typeSearchText('got');

			expect(React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[0],
				'to have text', 'Add got to values?');
		});

		it('displays an add option when a label with spaces is entered', function () {

			typeSearchText('test');

			expect(React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[0],
				'to have text', 'Add test to values?');
		});

		it('does not display the option label when an existing value is entered', function () {

			typeSearchText('zzzzz');

			expect(React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option'),
				'to have length', 1);
			expect(React.findDOMNode(instance), 'queried for first', '.Select-menu .Select-option',
				'to have text', 'Add zzzzz to values?');
		});

		it('renders the existing option and an add option when an existing display label is entered', function () {

			typeSearchText('test value');

			// First item should be the add option (as the "value" is not in the collection)
			expect(React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[0],
				'to have text', 'Add test value to values?');
			// Second item should be the existing option with the matching label
			expect(React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[1],
				'to have text', 'test value');
			expect(React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option'),
				'to have length', 2);
		});
	});

	describe('with async options', function () {

		var asyncOptions;

		beforeEach(function () {

			asyncOptions = sinon.stub();

			asyncOptions.withArgs('te').callsArgWith(1, null, {
				options: [
					{ value: 'test', label: 'TEST one' },
					{ value: 'test2', label: 'TEST two' },
					{ value: 'tell', label: 'TELL three' }
				]
			});

			asyncOptions.withArgs('tes').callsArgWith(1, null, {
				options: [
					{ value: 'test', label: 'TEST one' },
					{ value: 'test2', label: 'TEST two' }
				]
			});


		});

		describe('with autoload=true', function () {

			beforeEach(function () {

				// Render an instance of the component
				wrapper = createControlWithWrapper({
					value: '',
					asyncOptions: asyncOptions,
					autoload: true
				});
			});


			it('calls the asyncOptions initially with autoload=true', function () {

				expect(asyncOptions, 'was called with', '');
			});

			it('calls the asyncOptions again when the input changes', function () {

				typeSearchText('ab');

				expect(asyncOptions, 'was called twice');
				expect(asyncOptions, 'was called with', 'ab');
			});

			it('shows the returned options after asyncOptions calls back', function () {

				typeSearchText('te');

				var optionList = React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option');
				expect(optionList, 'to have length', 3);
				expect(optionList[0], 'to have text', 'TEST one');
				expect(optionList[1], 'to have text', 'TEST two');
				expect(optionList[2], 'to have text', 'TELL three');
			});

			it('uses the options cache when the same text is entered again', function () {


				typeSearchText('te');
				typeSearchText('tes');

				expect(asyncOptions, 'was called times', 3);

				typeSearchText('te');

				expect(asyncOptions, 'was called times', 3);

			});

			it('displays the correct options from the cache after the input is changed back to a previous value', function () {

				typeSearchText('te');
				typeSearchText('tes');
				typeSearchText('te');
				// Double check the options list is still correct
				var optionList = React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option');
				expect(optionList, 'to have length', 3);
				expect(optionList[0], 'to have text', 'TEST one');
				expect(optionList[1], 'to have text', 'TEST two');
				expect(optionList[2], 'to have text', 'TELL three');
			});

			it('re-filters an existing options list if complete:true is provided', function () {

				asyncOptions.withArgs('te').callsArgWith(1, null, {
					options: [
						{ value: 'test', label: 'TEST one' },
						{ value: 'test2', label: 'TEST two' },
						{ value: 'tell', label: 'TELL three' }
					],
					complete: true
				});

				typeSearchText('te');
				expect(asyncOptions, 'was called times', 2);
				typeSearchText('tel');
				expect(asyncOptions, 'was called times', 2);
				var optionList = React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option');
				expect(optionList, 'to have length', 1);
				expect(optionList[0], 'to have text', 'TELL three');
			});

			it('rethrows the error if err is set in the callback', function () {

				asyncOptions.withArgs('tes').callsArgWith(1, new Error('Something\'s wrong jim'), {
					options: [
						{ value: 'test', label: 'TEST one' },
						{ value: 'test2', label: 'TEST two' }
					]
				});

				expect(function () {
					typeSearchText('tes');
				}, 'to throw exception', new Error('Something\'s wrong jim'));
			});

			it('calls the asyncOptions function when the value prop changes', function () {

				expect(asyncOptions, 'was called once');

				wrapper.setPropsForChild({ value: 'test2' });

				expect(asyncOptions, 'was called twice');
			});


		});

		describe('with autoload=false', function () {

			beforeEach(function () {

				// Render an instance of the component
				instance = createControl({
					value: '',
					asyncOptions: asyncOptions,
					autoload: false
				});
			});

			it('does not initially call asyncOptions', function () {

				expect(asyncOptions, 'was not called');
			});

			it('calls the asyncOptions on first key entry', function () {

				typeSearchText('a');
				expect(asyncOptions, 'was called with', 'a');
			});
		});

		describe('with cacheAsyncResults=false', function () {

			beforeEach(function () {

				// Render an instance of the component
				wrapper = createControlWithWrapper({
					value: '',
					asyncOptions: asyncOptions,
					cacheAsyncResults: false
				});

				// Focus on the input, such that mouse events are accepted
				searchInputNode = instance.getInputNode().getDOMNode().querySelector('input');
				TestUtils.Simulate.focus(searchInputNode);
			});

			it('does not use cache when the same text is entered again', function () {

				typeSearchText('te');
				typeSearchText('tes');

				expect(asyncOptions, 'was called times', 3);

				typeSearchText('te');

				expect(asyncOptions, 'was called times', 4);

			});

			it('updates the displayed value after changing value and refreshing from asyncOptions', function () {

				asyncOptions.reset();
				asyncOptions.callsArgWith(1, null, {
					options: [
						{ value: 'newValue', label: 'New Value from Server' },
						{ value: 'test', label: 'TEST one' }
					]
				});

				wrapper.setPropsForChild({ value: 'newValue' });

				expect(React.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
					'to have text', 'New Value from Server');
			});


		});
	});

	describe('with multi-select', function () {

		beforeEach(function () {

			options = [
				{ value: 'one', label: 'One' },
				{ value: 'two', label: 'Two' },
				{ value: 'three', label: 'Three' },
				{ value: 'four', label: 'Four' }
			];

			// Render an instance of the component
			wrapper = createControlWithWrapper({
				value: '',
				options: options,
				searchable: true,
				allowCreate: true,
				multi: true
			});
		});

		it('selects a single option on enter', function () {

			typeSearchText('fo');
			pressEnterToAccept();
			expect(onChange, 'was called with', 'four', [{ label: 'Four', value: 'four' }]);
		});

		it('selects a second option', function () {

			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('th');
			onChange.reset();  // Ignore previous onChange calls
			pressEnterToAccept();
			expect(onChange, 'was called with', 'four,three',
				[{ label: 'Four', value: 'four' }, { label: 'Three', value: 'three' }]);
		});

		it('displays both selected options', function () {

			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('th');
			pressEnterToAccept();
			expect(React.findDOMNode(instance).querySelectorAll('.Select-item-label')[0],
				'to have text', 'Four');
			expect(React.findDOMNode(instance).querySelectorAll('.Select-item-label')[1],
				'to have text', 'Three');
		});

		it('filters the existing selections from the options', function () {

			wrapper.setPropsForChild({
				value: 'four,three'
			});

			typeSearchText('o');

			var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(options[0], 'to have text', 'Add "o"?');
			expect(options[1], 'to have text', 'One');
			expect(options[2], 'to have text', 'Two');
			expect(options, 'to have length', 3);  // No "Four", as already selected
		});

		it('removes the last selected option with backspace', function () {

			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('th');
			pressEnterToAccept();
			onChange.reset();  // Ignore previous onChange calls
			pressBackspace();
			expect(onChange, 'was called with', 'four', [{ label: 'Four', value: 'four' }]);
		});

		it('does not remove the last selected option with backspace when backspaceRemoves=false', function () {

			// Disable backspace
			wrapper.setPropsForChild({
				backspaceRemoves: false
			});

			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('th');
			pressEnterToAccept();
			onChange.reset();  // Ignore previous onChange calls

			pressBackspace();

			expect(onChange, 'was not called');
			var items = React.findDOMNode(instance).querySelectorAll('.Select-item-label');
			expect(items[0], 'to have text', 'Four');
			expect(items[1], 'to have text', 'Three');
		});

		it('removes an item when clicking on the X', function () {

			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('th');
			pressEnterToAccept();
			typeSearchText('tw');
			pressEnterToAccept();
			onChange.reset();  // Ignore previous onChange calls

			var threeDeleteButton = React.findDOMNode(instance).querySelectorAll('.Select-item-icon')[1];
			TestUtils.Simulate.click(threeDeleteButton);

			expect(onChange, 'was called with', 'four,two', [
				{ label: 'Four', value: 'four' },
				{ label: 'Two', value: 'two' }
			]);
		});

		it('uses the selected text as an item when comma is pressed', function () {

			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('new item');
			onChange.reset();

			TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 188, key: ',' });
			expect(onChange, 'was called with', 'four,new item', [
				{ value: 'four', label: 'Four' },
				{ value: 'new item', label: 'new item' }
			]);

		});

		describe('with late options', function () {

			beforeEach(function () {

				wrapper = createControlWithWrapper({
					multi: true,
					options: options,
					value: 'one,two'
				});
			});

			it('updates the label when the options are updated', function () {

				wrapper.setPropsForChild({
					options: [
						{ value: 'one', label: 'new label for One' },
						{ value: 'two', label: 'new label for Two' },
						{ value: 'three', label: 'new label for Three' }
					]
				});

				var items = React.findDOMNode(instance).querySelectorAll('.Select-item');

				expect(items[0], 'queried for', '.Select-item-label',
					'to have items satisfying',
					'to have text', 'new label for One');

				expect(items[1], 'queried for', '.Select-item-label',
					'to have items satisfying',
					'to have text', 'new label for Two');
			});
		});

	});

	describe('with multi=true and searchable=false', function () {

		beforeEach(function () {

			options = [
				{ value: 'one', label: 'One' },
				{ value: 'two', label: 'Two' },
				{ value: 'three', label: 'Three' },
				{ value: 'four', label: 'Four' }
			];

			// Render an instance of the component
			wrapper = createControlWithWrapper({
				value: '',
				options: options,
				searchable: false,
				multi: true
			});

			// We need a hack here.
			// JSDOM (at least v3.x) doesn't appear to support div's with tabindex
			// This just hacks that we are focused
			// This is (obviously) implementation dependent, and may need to change
			instance.setState({
				isFocused: true
			});

		});

		it('selects multiple options', function () {

			clickArrowToOpen();

			var items = React.findDOMNode(instance).querySelectorAll('.Select-option');
			TestUtils.Simulate.mouseDown(items[1]);
			// The menu is now closed, click the arrow to open it again
			clickArrowToOpen();
			items = React.findDOMNode(instance).querySelectorAll('.Select-option');
			TestUtils.Simulate.mouseDown(items[0]);

			var selectedItems = React.findDOMNode(instance).querySelectorAll('.Select-item-label');
			expect(selectedItems[0], 'to have text', 'Two');
			expect(selectedItems[1], 'to have text', 'One');
			expect(selectedItems, 'to have length', 2);
		});

		it('calls onChange when each option is selected', function () {

			clickArrowToOpen();
			// First item
			var items = React.findDOMNode(instance).querySelectorAll('.Select-option');
			TestUtils.Simulate.mouseDown(items[1]);
			expect(onChange, 'was called once');
			expect(onChange, 'was called with', 'two', [{ value: 'two', label: 'Two' }]);

			// Second item

			// The menu is now closed, click the arrow to open it again
			clickArrowToOpen();
			items = React.findDOMNode(instance).querySelectorAll('.Select-option');
			TestUtils.Simulate.mouseDown(items[0]);
			expect(onChange, 'was called twice');
		});

		it('removes the selected options from the menu', function () {

			clickArrowToOpen();

			var items = React.findDOMNode(instance).querySelectorAll('.Select-option');

			// Click the option "Two" to select it
			expect(items[1], 'to have text', 'Two');
			TestUtils.Simulate.mouseDown(items[1]);
			expect(onChange, 'was called times', 1);

			// Now get the list again,
			// The menu is now closed, click the arrow to open it again
			clickArrowToOpen();
			items = React.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(items[0], 'to have text', 'One');
			expect(items[1], 'to have text', 'Three');
			expect(items[2], 'to have text', 'Four');
			expect(items, 'to have length', 3);

			// Click first item, 'One'
			TestUtils.Simulate.mouseDown(items[0]);

			expect(onChange, 'was called times', 2);
			// The menu is now closed, click the arrow to open it again
			clickArrowToOpen();
			items = React.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(items[0], 'to have text', 'Three');
			expect(items[1], 'to have text', 'Four');
			expect(items, 'to have length', 2);

			// Click second item, 'Four'
			TestUtils.Simulate.mouseDown(items[1]);
			expect(onChange, 'was called times', 3);

			// The menu is now closed, click the arrow to open it again
			clickArrowToOpen();
			items = React.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(items[0], 'to have text', 'Three');
			expect(items, 'to have length', 1);
		});

	});

	describe('with props', function () {


		describe('className', function () {

			it('assigns the className to the outer-most element', function () {

				var instance = createControl({ className: 'test-class' });
				expect(React.findDOMNode(instance), 'to have attributes', {
					class: 'test-class'
				});
			});
		});

		describe('clearable=true', function () {

			beforeEach(function () {

				var instance = createControl({
					clearable: true,
					options: defaultOptions,
					value: 'three'
				});

				expect(React.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
					'to have items satisfying', 'to have text', 'Three');

			});

			describe('on pressing escape', function () {

				beforeEach(function () {

					pressEscape();
				});

				it('calls onChange with empty', function () {

					expect(onChange, 'was called with', '');
				});

				it('resets the display value', function () {

					expect(React.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
						'to have items satisfying', 'to have text', 'Select...');
				});

				it('resets the control value', function () {

					expect(React.findDOMNode(instance).querySelector('input').value, 'to equal', '');
				});
			});

			describe('on clicking `clear`', function () {

				beforeEach(function () {
					TestUtils.Simulate.click(React.findDOMNode(instance).querySelector('.Select-clear'));
				});

				it('calls onChange with empty', function () {

					expect(onChange, 'was called with', '');
				});

				it('resets the display value', function () {

					expect(React.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
						'to have items satisfying', 'to have text', 'Select...');
				});

				it('resets the control value', function () {

					expect(React.findDOMNode(instance).querySelector('input').value, 'to equal', '');
				});
			});
		});

		describe('clearable=false', function () {

			beforeEach(function () {

				var instance = createControl({
					clearable: false,
					options: defaultOptions,
					value: 'three'
				});

				expect(React.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
					'to have items satisfying', 'to have text', 'Three');

			});

			it('does not render a clear button', function () {

				expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-clear');
			});

			describe('on escape', function () {
				beforeEach(function () {

					pressEscape();
				});

				it('does not call onChange', function () {

					expect(onChange, 'was not called');
				});

				it('does not reset the display value', function () {

					expect(React.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
						'to have items satisfying', 'to have text', 'Three');
				});

				it('does not reset the control value', function () {

					expect(React.findDOMNode(instance).querySelector('input').value, 'to equal', 'three');
				});

			});

			describe('when open', function () {

				beforeEach(function () {

					typeSearchText('abc');
				});

				describe('on escape', function () {

					beforeEach(function () {
						pressEscape();
					});

					it('closes the menu', function () {

						expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-menu');
					});

					it('resets the control value to the original', function () {

						expect(React.findDOMNode(instance).querySelector('input').value, 'to equal', 'three');
					});

					it('renders the original display label', function () {

						expect(React.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
							'to have items satisfying', 'to have text', 'Three');
					});
				});
			});
		});

		describe('clearAllText', function () {

			beforeEach(function () {

				instance = createControl({
					multi: true,
					clearable: true,
					value: 'three',
					clearAllText: 'Remove All Items Test Title',
					clearValueText: 'Remove Value Test Title',  // Should be ignored, multi=true
					options: defaultOptions
				});
			});

			it('uses the prop as the title for clear', function () {

				expect(React.findDOMNode(instance).querySelector('.Select-clear'), 'to have attributes', {
					title: 'Remove All Items Test Title'
				});
			});
		});

		describe('clearValueText', function () {

			beforeEach(function () {

				instance = createControl({
					multi: false,
					clearable: true,
					value: 'three',
					clearAllText: 'Remove All Items Test Title', // Should be ignored, multi=false
					clearValueText: 'Remove Value Test Title',
					options: defaultOptions
				});
			});

			it('uses the prop as the title for clear', function () {

				expect(React.findDOMNode(instance).querySelector('.Select-clear'), 'to have attributes', {
					title: 'Remove Value Test Title'
				});
			});
		});

		describe('delimiter', function () {

			describe('is ;', function () {

				beforeEach(function () {

					instance = createControl({
						multi: true,
						value: 'four;three',
						delimiter: ';',
						options: defaultOptions
					});
				});

				it('interprets the initial options correctly', function () {

					var values = React.findDOMNode(instance).querySelectorAll('.Select-item');

					expect(values[0], 'queried for', '.Select-item-label', 'to have items satisfying',
						'to have text', 'AbcDef');
					expect(values[1], 'queried for', '.Select-item-label', 'to have items satisfying',
						'to have text', 'Three');
					expect(values, 'to have length', 2);
				});

				it('adds an additional option with the correct delimiter', function () {

					typeSearchText('one');
					pressEnterToAccept();
					expect(onChange, 'was called with', 'four;three;one', [
						{ value: 'four', label: 'AbcDef' },
						{ value: 'three', label: 'Three' },
						{ value: 'one', label: 'One' }
					]);
				});
			});

			describe('is a multi-character string (`==XXX==`)', function () {

				beforeEach(function () {

					instance = createControl({
						multi: true,
						value: 'four==XXX==three',
						delimiter: '==XXX==',
						options: defaultOptions
					});
				});

				it('interprets the initial options correctly', function () {

					var values = React.findDOMNode(instance).querySelectorAll('.Select-item');

					expect(values[0], 'queried for', '.Select-item-label', 'to have items satisfying',
						'to have text', 'AbcDef');
					expect(values[1], 'queried for', '.Select-item-label', 'to have items satisfying',
						'to have text', 'Three');
					expect(values, 'to have length', 2);
				});

				it('adds an additional option with the correct delimiter', function () {

					typeSearchText('one');
					pressEnterToAccept();
					expect(onChange, 'was called with', 'four==XXX==three==XXX==one', [
						{ value: 'four', label: 'AbcDef' },
						{ value: 'three', label: 'Three' },
						{ value: 'one', label: 'One' }
					]);
				});
			});
		});

		describe('disabled=true', function () {

			beforeEach(function () {

				instance = createControl({
					options: defaultOptions,
					value: 'three',
					disabled: true,
					searchable: true
				});
			});

			it('does not render an input search control', function () {

				expect(searchInputNode, 'to be null');
			});

			it('does not react to keyDown', function () {

				TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
				expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
			});

			it('does not respond to mouseDown', function () {

				TestUtils.Simulate.mouseDown(getSelectControl(instance));
				expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
			});

			it('does not respond to mouseDown on the arrow', function () {

				TestUtils.Simulate.mouseDown(getSelectControl(instance).querySelector('.Select-arrow'));
				expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
			});

			it('renders the given value', function () {

				expect(React.findDOMNode(instance).querySelector(DISPLAYED_SELECTION_SELECTOR), 'to have text', 'Three');
			});
		});

		describe('custom filterOption function', function () {

			// Custom function returns true only for value "four"
			var filterOption = function (option) {
				if (option.value === 'four') {
					return true;
				}

				return false;
			};
			var spyFilterOption;

			beforeEach(function () {

				spyFilterOption = sinon.spy(filterOption);

				instance = createControl({
					options: defaultOptions,
					filterOption: spyFilterOption
				});
			});

			it('calls the filter with each option', function () {

				expect(spyFilterOption, 'was called times', 4);
				expect(spyFilterOption, 'was called with', defaultOptions[0], '');
				expect(spyFilterOption, 'was called with', defaultOptions[1], '');
				expect(spyFilterOption, 'was called with', defaultOptions[2], '');
				expect(spyFilterOption, 'was called with', defaultOptions[3], '');
			});

			describe('when entering text', function () {

				beforeEach(function () {

					spyFilterOption.reset();
					typeSearchText('xyz');
				});

				it('calls the filterOption function for each option', function () {

					expect(spyFilterOption, 'was called times', 4);
					expect(spyFilterOption, 'was called with', defaultOptions[0], 'xyz');
					expect(spyFilterOption, 'was called with', defaultOptions[1], 'xyz');
					expect(spyFilterOption, 'was called with', defaultOptions[2], 'xyz');
					expect(spyFilterOption, 'was called with', defaultOptions[3], 'xyz');
				});

				it('only shows the filtered option', function () {

					expect(React.findDOMNode(instance).querySelectorAll('.Select-option'),
						'to have length', 1);

					expect(React.findDOMNode(instance).querySelectorAll('.Select-option'),
						'to have items satisfying',
						'to have text', 'AbcDef');
				});
			});
		});

		describe('custom filterOptions function', function () {

			var spyFilterOptions;

			beforeEach(function () {

				spyFilterOptions = sinon.stub();
				spyFilterOptions.returns([
					{ label: 'Return One', value: 'one' },
					{ label: 'Return Two', value: 'two' }
				]);

				instance = createControl({
					options: defaultOptions,
					filterOptions: spyFilterOptions,
					searchable: true
				});
			});

			it('calls the filterOptions function initially', function () {

				expect(spyFilterOptions, 'was called');
			});

			it('calls the filterOptions function initially with the initial options', function () {

				expect(spyFilterOptions, 'was called with', defaultOptions, '');
			});

			it('uses the returned options', function () {

				TestUtils.Simulate.mouseDown(React.findDOMNode(instance).querySelector('.Select-arrow'));

				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options[0], 'to have text', 'Return One');
				expect(options[1], 'to have text', 'Return Two');
				expect(options, 'to have length', 2);
			});

			it('calls the filterOptions function on text change', function () {

				typeSearchText('xyz');
				expect(spyFilterOptions, 'was called with', defaultOptions, 'xyz');
			});

			it('uses new options after text change', function () {

				spyFilterOptions.returns([
					{ value: 'abc', label: 'AAbbcc' },
					{ value: 'def', label: 'DDeeff' }
				]);
				typeSearchText('xyz');

				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options[0], 'to have text', 'AAbbcc');
				expect(options[1], 'to have text', 'DDeeff');
				expect(options, 'to have length', 2);
			});
		});

		describe('ignoreCase=false', function () {

			beforeEach(function () {

				instance = createControl({
					searchable: true,
					ignoreCase: false,
					options: defaultOptions
				});
			});

			it('does not find options in a different case', function () {

				typeSearchText('def');
				expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
			});

			it('finds options in the same case', function () {

				typeSearchText('Def');
				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options[0], 'to have text', 'AbcDef');
				expect(options, 'to have length', 1);
			});
		});

		describe('inputProps', function () {


			beforeEach(function () {

				instance = createControl({
					searchable: true,
					inputProps: {
						inputClassName: 'extra-input-class',
						className: 'extra-class-name',
						id: 'search-input-id'
					},
					options: defaultOptions
				});
			});

			it('passes id through to the search input box', function () {
				expect(searchInputNode, 'to have attributes', {
					id: 'search-input-id'
				});
			});

			it('passes the inputClassName to the search input box', function () {

				expect(searchInputNode, 'to have attributes', {
					class: 'extra-input-class'
				});
			});

			it('adds the className on to the auto-size input', function () {

				expect(React.findDOMNode(instance.getInputNode()),
					'to have attributes', {
						class: ['extra-class-name', 'Select-input']
					});
			});

			describe('and not searchable', function () {

				beforeEach(function () {

					instance = createControl({
						searchable: false,
						inputProps: {
							inputClassName: 'extra-input-class',
							className: 'extra-class-name',
							id: 'search-input-id'
						},
						options: defaultOptions
					});
				});

				it('sets the className and id on the placeholder for the input', function () {

					expect(React.findDOMNode(instance).querySelector('.extra-class-name'),
						'to have attributes', {
							id: 'search-input-id'
						});
				});
			});

			describe('and disabled', function () {

				beforeEach(function () {

					instance = createControl({
						searchable: true,
						disabled: true,
						inputProps: {
							inputClassName: 'extra-input-class',
							className: 'extra-class-name',
							id: 'search-input-id'
						},
						options: defaultOptions
					});
				});

				it('doesn\'t pass the inputProps through', function () {

					expect(React.findDOMNode(instance), 'to contain no elements matching', '.extra-class-name');
					expect(React.findDOMNode(instance), 'to contain no elements matching', '#search-input-id');
				});
			});
		});

		describe('matchPos=start', function () {

			beforeEach(function () {

				instance = createControl({
					searchable: true,
					matchPos: 'start',
					options: defaultOptions
				});
			});

			it('searches only at the start', function () {

				typeSearchText('o');
				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options[0], 'to have text', 'One');
				expect(options, 'to have length', 1);
			});
		});

		describe('matchProp=value', function () {

			beforeEach(function () {

				instance = createControl({
					searchable: true,
					matchProp: 'value',
					options: [
						{ value: 'aaa', label: '111' },
						{ value: 'bbb', label: '222' },
						{ value: 'ccc', label: 'Three' },
						{ value: 'four', label: 'Abcaaa' }
					]
				});
			});

			it('searches only the value', function () {

				typeSearchText('aa');  // Matches value "three", and label "AbcDef"
				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options, 'to have length', 1);
				expect(options[0], 'to have text', '111');
			});
		});

		describe('matchProp=label', function () {

			beforeEach(function () {

				instance = createControl({
					searchable: true,
					matchProp: 'label',
					options: [
						{ value: 'aaa', label: 'bbb' },
						{ value: 'bbb', label: '222' },
						{ value: 'ccc', label: 'Three' },
						{ value: 'four', label: 'Abcaaa' }
					]
				});
			});

			it('searches only the value', function () {

				typeSearchText('bb');  // Matches value "three", and label "AbcDef"
				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options, 'to have length', 1);
				expect(options[0], 'to have text', 'bbb');
			});
		});

		describe('matchPos=start and matchProp=value', function () {

			beforeEach(function () {

				instance = createControl({
					searchable: true,
					matchProp: 'value',
					matchPos: 'start',
					options: [
						{ value: 'aaa', label: '111' },
						{ value: 'bbb', label: '222' },
						{ value: 'cccaa', label: 'Three' },
						{ value: 'four', label: 'aaAbca' }
					]
				});
			});

			it('searches only the value', function () {

				typeSearchText('aa');  // Matches value "three", and label "AbcDef"
				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options, 'to have length', 1);
				expect(options[0], 'to have text', '111');
			});
		});

		describe('matchPos=start and matchProp=label', function () {

			beforeEach(function () {

				instance = createControl({
					searchable: true,
					matchProp: 'label',
					matchPos: 'start',
					options: [
						{ value: 'aaa', label: 'bbb' },
						{ value: 'bbb', label: '222' },
						{ value: 'cccbbb', label: 'Three' },
						{ value: 'four', label: 'Abcbbb' }
					]
				});
			});

			it('searches only the label', function () {

				typeSearchText('bb');  // Matches value "three", and label "AbcDef"
				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options, 'to have length', 1);
				expect(options[0], 'to have text', 'bbb');
			});
		});

		describe('noResultsText', function () {

			beforeEach(function () {

				wrapper = createControlWithWrapper({
					searchable: true,
					options: defaultOptions,
					noResultsText: 'No results unit test'
				});
			});

			it('displays the text when no results are found', function () {

				typeSearchText('DOES NOT EXIST');
				expect(React.findDOMNode(instance).querySelector('.Select-menu'),
					'to have text', 'No results unit test');
			});

			it('supports updating the text', function () {

				wrapper.setPropsForChild({
					noResultsText: 'Updated no results text'
				});

				typeSearchText('DOES NOT EXIST');
				expect(React.findDOMNode(instance).querySelector('.Select-menu'),
					'to have text', 'Updated no results text');
			});
		});

		describe('onBlur', function () {

			var onBlur;

			it('calls the onBlur prop when blurring the input', function () {

				onBlur = sinon.spy();

				instance = createControl({
					options: defaultOptions,
					onBlur: onBlur
				});

				TestUtils.Simulate.blur(searchInputNode);
				expect(onBlur, 'was called once');
			});
		});

		describe('onFocus', function () {

			var onFocus;

			beforeEach(function () {

				onFocus = sinon.spy();

				instance = createControl({
					options: defaultOptions,
					onFocus: onFocus
				});
			});

			it('calls the onFocus prop when focusing the control', function () {

				expect(onFocus, 'was called once');
			});
		});

		describe('onOptionLabelClick', function () {
			var onOptionLabelClick;

			beforeEach(function () {

				onOptionLabelClick = sinon.spy();

				instance = createControl({
					options: defaultOptions,
					multi: true,
					value: 'two,one',
					onOptionLabelClick: onOptionLabelClick
				});
			});

			it('calls the function when clicking on a label', function () {

				TestUtils.Simulate.click(React.findDOMNode(instance).querySelector('.Select-item-label a'));
				expect(onOptionLabelClick, 'was called once');
			});

			it('calls the function with the value', function () {

				TestUtils.Simulate.click(React.findDOMNode(instance).querySelectorAll('.Select-item-label a')[0]);
				expect(onOptionLabelClick, 'was called with', { value: 'two', label: '222' });
			});
		});

		describe('optionRenderer', function () {

			var optionRenderer;

			beforeEach(function () {

				optionRenderer = function (option) {
					return (
						<span id={'TESTOPTION_' + option.value}>{option.label.toUpperCase()}</span>
					);
				};

				optionRenderer = sinon.spy(optionRenderer);

				instance = createControl({
					options: defaultOptions,
					optionRenderer: optionRenderer
				});
			});

			it('renders the options using the optionRenderer', function () {

				var selectArrow = React.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);
				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');

				expect(options[0].querySelector('span'), 'to have attributes', {
					id: 'TESTOPTION_one'
				});
				expect(options[0].querySelector('span'), 'to have text', 'ONE');
				expect(options[1].querySelector('span'), 'to have attributes', {
					id: 'TESTOPTION_two'
				});
				expect(options[1].querySelector('span'), 'to have text', '222');
			});

			it('calls the renderer exactly once for each option', function () {
				var selectArrow = React.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);
				expect(optionRenderer, 'was called times', 4);
			});
		});

		describe('optionRendererDisabled', function () {

			var optionRenderer;
			var renderLink = function(props) {
				return <a {...props} >Upgrade here!</a>;
			};

			var links = [
				{ href: '/link' },
				{ href: '/link2', target: '_blank' }
			];

			var ops = [
				{ label: 'Disabled', value: 'disabled', disabled: true, link: renderLink(links[0]) },
				{ label: 'Disabled 2', value: 'disabled_2', disabled: true, link: renderLink(links[1]) },
				{ label: 'Enabled', value: 'enabled' },
			];

			/**
			 * Since we don't have access to an actual Location object,
			 * this method will test a string (path) by the end of global.window.location.href
			 * @param  {string}  path Ending href path to check
			 * @return {Boolean}      Whether the location is at the path
			 */
			var isNavigated = function(path) {
				var window_location = global.window.location.href;
				return window_location.indexOf(path, window_location.length - path.length) !== -1;
			};

			beforeEach(function () {

				optionRenderer = function (option) {
					return (
						<span>{option.label} {option.link} </span>
					);
				};

				optionRenderer = sinon.spy(optionRenderer);

				instance = createControl({
					options: ops,
					optionRenderer: optionRenderer
				});
			});

			it('disabled option link is still clickable', function () {
				var selectArrow = React.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);
				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				var link = options[0].querySelector('a');
				expect(link, 'to have attributes', {
					href: links[0].href
				});

				expect(isNavigated(links[0].href), 'to be false');
				TestUtils.Simulate.click(link);
				expect(isNavigated(links[0].href), 'to be true');
			});

			it('disabled option link with target doesn\'t navigate the current window', function () {
				var selectArrow = React.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);
				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				var link = options[1].querySelector('a');
				expect(link, 'to have attributes', {
					href: links[1].href,
					target: '_blank'
				});

				expect(isNavigated(links[0].href), 'to be true');
				TestUtils.Simulate.click(link);
				expect(isNavigated(links[1].href), 'to be false');
			});

		});

		describe('placeholder', function () {

			beforeEach(function () {

				wrapper = createControlWithWrapper({
					value: null,
					options: defaultOptions,
					placeholder: 'Choose Option Placeholder test'
				});
			});

			it('uses the placeholder initially', function () {
				expect(React.findDOMNode(instance), 'queried for', '.Select-placeholder',
					'to have items satisfying',
					'to have text', 'Choose Option Placeholder test');
			});

			it('displays a selected value', function () {

				wrapper.setPropsForChild({
					value: 'three'
				});

				expect(React.findDOMNode(instance), 'queried for', '.Select-placeholder',
					'to have items satisfying',
					'to have text', 'Three');
			});

			it('returns to the default placeholder when value is cleared', function () {

				wrapper.setPropsForChild({
					value: 'three'
				});

				wrapper.setPropsForChild({
					value: null
				});

				expect(React.findDOMNode(instance), 'queried for', '.Select-placeholder',
					'to have items satisfying',
					'to have text', 'Choose Option Placeholder test');
			});

			it('allows changing the placeholder via props', function () {

				wrapper.setPropsForChild({
					placeholder: 'New placeholder from props'
				});

				expect(React.findDOMNode(instance), 'queried for', '.Select-placeholder',
					'to have items satisfying',
					'to have text', 'New placeholder from props');
			});

			it('allows setting the placeholder to the selected value', function () {

				/*  This is an unlikely scenario, but given that the current
				 *  implementation uses the placeholder to display the selected value,
				 *  it seems prudent to check that this obscure case still works
				 *
				 *  We set the value via props, then change the placeholder to the
				 *  same as the display label for the chosen option, then reset
				 *  the value (to null).
				 *
				 *  The expected result is that the display does NOT change, as the
				 *  placeholder is now the same as label.
				 */

				wrapper.setPropsForChild({
					value: 'three'
				});

				wrapper.setPropsForChild({
					placeholder: 'Three'    // Label for value 'three'
				});

				wrapper.setPropsForChild({
					value: null
				});

				expect(React.findDOMNode(instance), 'queried for', '.Select-placeholder',
					'to have items satisfying',
					'to have text', 'Three');

			});
		});

		describe('searchingText', function () {

			var asyncOptions;
			var asyncOptionsCallback;

			beforeEach(function () {

				asyncOptions = sinon.spy();

				instance = createControl({
					asyncOptions: asyncOptions,
					autoload: false,
					searchingText: 'Testing async loading...',
					noResultsText: 'Testing No results found',
					searchPromptText: 'Testing enter search query'
				});
			});

			it('uses the searchingText whilst the asyncOptions are loading', function () {

				clickArrowToOpen();
				expect(asyncOptions, 'was not called');
				typeSearchText('abc');
				expect(asyncOptions, 'was called');
				expect(React.findDOMNode(instance), 'to contain elements matching', '.Select-loading');
				expect(React.findDOMNode(instance), 'queried for first', '.Select-searching',
					'to have text', 'Testing async loading...');
			});

			it('clears the searchingText when results arrive', function () {

				clickArrowToOpen();
				typeSearchText('abc');

				expect(React.findDOMNode(instance), 'queried for first', '.Select-searching',
					'to have text', 'Testing async loading...');

				asyncOptions.args[0][1](null, {
					options: [{ value: 'abc', label: 'Abc' }]
				});

				expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-noresults');
			});

			it('switches the searchingText to noResultsText when options arrive, but empty', function () {

				clickArrowToOpen();
				typeSearchText('abc');

				expect(React.findDOMNode(instance), 'queried for first', '.Select-searching',
					'to have text', 'Testing async loading...');
				expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-noresults');

				asyncOptions.args[0][1](null, {
					options: []
				});

				expect(React.findDOMNode(instance), 'queried for first', '.Select-noresults',
					'to have text', 'Testing No results found');
				expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-searching');
			});
		});

		describe('searchPromptText', function () {
			var asyncOptions;

			beforeEach(function () {

				asyncOptions = sinon.stub();

				instance = createControl({
					asyncOptions: asyncOptions,
					autoload: false,
					searchPromptText: 'Unit test prompt text'
				});
			});

			it('uses the searchPromptText before text is entered', function () {

				var selectArrow = React.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);

				expect(React.findDOMNode(instance), 'queried for', '.Select-search-prompt',
					'to have items satisfying',
					'to have text', 'Unit test prompt text');
			});

			it('clears the searchPromptText when results arrive', function () {

				asyncOptions.callsArgWith(1, null, {
					options: [{ value: 'abcd', label: 'ABCD' }]
				});

				var selectArrow = React.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);

				typeSearchText('abc');
				expect(asyncOptions, 'was called once');

				expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-prompt');
				expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-noresults');
			});
		});

		describe('valueRenderer', function () {

			var valueRenderer;

			beforeEach(function () {

				valueRenderer = function (option) {
					return (
						<span id={'TESTOPTION_' + option.value}>{option.label.toUpperCase()}</span>
					);
				};

				valueRenderer = sinon.spy(valueRenderer);

				instance = createControl({
					options: defaultOptions,
					value: 'three',
					valueRenderer: valueRenderer
				});
			});


			it('renders the value using the provided renderer', function () {

				var labelNode = React.findDOMNode(instance).querySelector('.Select-value span');
				expect(labelNode, 'to have text', 'THREE');
				expect(labelNode, 'to have attributes', {
					id: 'TESTOPTION_three'
				});
			});
		});

		describe('valueRenderer and multi=true', function () {
			var valueRenderer;

			beforeEach(function () {

				valueRenderer = function (option) {
					return (
						<span id={'TESTOPTION_' + option.value}>{option.label.toUpperCase()}</span>
					);
				};

				valueRenderer = sinon.spy(valueRenderer);

				instance = createControl({
					options: defaultOptions,
					value: 'three,two',
					multi: true,
					valueRenderer: valueRenderer
				});
			});

			it('renders the values using the provided renderer', function () {

				var labelNode = React.findDOMNode(instance).querySelectorAll('.Select-item-label span');
				expect(labelNode[0], 'to have text', 'THREE');
				expect(labelNode[0], 'to have attributes', {
					id: 'TESTOPTION_three'
				});
				expect(labelNode[1], 'to have text', '222');
				expect(labelNode[1], 'to have attributes', {
					id: 'TESTOPTION_two'
				});
			});
		});
	});

	describe('clicking outside', function () {

		beforeEach(function () {

			instance = createControl({
				options: defaultOptions
			});
		});

		it('closes the menu', function () {

			TestUtils.Simulate.mouseDown(getSelectControl(instance));
			expect(React.findDOMNode(instance), 'queried for', '.Select-option',
				'to have length', 4);

			clickDocument();
			expect(React.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
		});
	});
});
