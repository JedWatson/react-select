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
	.installPlugin(unexpectedSinon)
	.installPlugin(require('../testHelpers/nodeListType'));

jsdomHelper();

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

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

describe('Select', () => {
	var options, onChange, onInputChange;
	var instance, wrapper;
	var searchInputNode;

	var getSelectControl = (instance) => {
		return ReactDOM.findDOMNode(instance).querySelector('.Select-control');
	};

	var enterSingleCharacter = ()  =>{
		TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 65, key: 'a' });
	};

	var pressEnterToAccept = () => {
		TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 13, key: 'Enter' });
	};

	var pressTabToAccept = () => {
		TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 9, key: 'Tab' });
	};

	var pressEscape = () => {
		TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 27, key: 'Escape' });
	};

	var pressBackspace = () => {
		TestUtils.Simulate.keyDown(searchInputNode, { keyCode: 8, key: 'Backspace' });
	};

	var pressUp = () => {
		TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 38, key: 'ArrowUp' });
	};

	var pressDown = () => {
		TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
	};

	var typeSearchText = (text) => {
		TestUtils.Simulate.change(searchInputNode, { target: { value: text } });
	};

	var clickArrowToOpen = () => {
		var selectArrow = ReactDOM.findDOMNode(instance).querySelector('.Select-arrow');
		TestUtils.Simulate.mouseDown(selectArrow);
	};

	var clickDocument = () => {
		var clickEvent = document.createEvent('MouseEvents');
		clickEvent.initEvent('click', true, true);
		document.dispatchEvent(clickEvent);
	};

	var findAndFocusInputControl = () => {
		// Focus on the input, such that mouse events are accepted
		var searchInstance = ReactDOM.findDOMNode(instance.getInputNode());
		searchInputNode = null;
		if (searchInstance) {
			searchInputNode = searchInstance.querySelector('input');
			if (searchInputNode) {
				TestUtils.Simulate.focus(searchInputNode);
			}
		}
	};

	var createControl = (props) => {
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

	var createControlWithWrapper = (props) => {
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

	describe('with simple options', () => {
		beforeEach(() => {
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


		it('should assign the given name', () => {
			var selectInputElement = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
			expect(ReactDOM.findDOMNode(selectInputElement).name, 'to equal', 'form-field-name');
		});

		it('should show the options on mouse click', function () {
			TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(instance).querySelector('.Select-control'));
			var node = ReactDOM.findDOMNode(instance);
			expect(node, 'queried for', '.Select-option', 'to have length', 3);
		});

		it('should display the labels on mouse click', () => {
			TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(instance).querySelector('.Select-control'));
			var node = ReactDOM.findDOMNode(instance);
			expect(node, 'queried for', '.Select-option:nth-child(1)', 'to have items satisfying', 'to have text', 'One');
			expect(node, 'queried for', '.Select-option:nth-child(2)', 'to have items satisfying', 'to have text', 'Two');
			expect(node, 'queried for', '.Select-option:nth-child(3)', 'to have items satisfying', 'to have text', 'Three');
		});

		it('should filter after entering some text', () => {
			typeSearchText('T');
			var node = ReactDOM.findDOMNode(instance);
			expect(node, 'queried for', '.Select-option:nth-child(1)', 'to have items satisfying', 'to have text', 'Two');
			expect(node, 'queried for', '.Select-option:nth-child(2)', 'to have items satisfying', 'to have text', 'Three');
			expect(node, 'queried for', '.Select-option', 'to have length', 2);
		});

		it('should pass input value when entering text', () => {
			typeSearchText('a');
			enterSingleCharacter('a');
			expect(onInputChange, 'was called with', 'a');
		});

		it('should filter case insensitively', () => {
			typeSearchText('t');
			var node = ReactDOM.findDOMNode(instance);
			expect(node, 'queried for', '.Select-option:nth-child(1)', 'to have items satisfying', 'to have text', 'Two');
			expect(node, 'queried for', '.Select-option:nth-child(2)', 'to have items satisfying', 'to have text', 'Three');
			expect(node, 'queried for', '.Select-option', 'to have length', 2);
		});

		it('should filter using "contains"', () => {
			// Search 'h', should only show 'Three'
			typeSearchText('h');
			var node = ReactDOM.findDOMNode(instance);
			expect(node, 'queried for', '.Select-option:nth-child(1)', 'to have items satisfying', 'to have text', 'Three');
			expect(node, 'queried for', '.Select-option', 'to have length', 1);
		});

		it('should accept when enter is pressed', () => {
			// Search 'h', should only show 'Three'
			typeSearchText('h');
			pressEnterToAccept();
			expect(onChange, 'was called with', 'three');
		});

		it('should accept when tab is pressed', () => {
			// Search 'h', should only show 'Three'
			typeSearchText('h');
			pressTabToAccept();
			expect(onChange, 'was called with', 'three');
		});

		describe('pressing escape', () => {
			beforeEach(() => {
				typeSearchText('h');
				pressTabToAccept();
				expect(onChange, 'was called with', 'three');
				onChange.reset();
				pressEscape();
			});

			it('should call onChange with a empty value', () => {
				// TODO: Shouldn't this be null, really?
				expect(onChange, 'was called with', '');
			});

			it('should clear the display', () => {
				expect(ReactDOM.findDOMNode(instance).querySelector(DISPLAYED_SELECTION_SELECTOR),
					'to have text', 'Select...');
			});
		});

		it('should focus the first value on mouse click', () => {
			TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(instance).querySelector('.Select-control'));
			expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'One');
		});

		it('should move the focused value to the second value when down pressed', () => {
			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'Two');
		});

		it('should move the focused value to the second value when down pressed', () => {
			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'Three');
		});

		it('should loop round to top item when down is pressed on the last item', () => {
			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'One');
		});

		it('should loop round to bottom item when up is pressed on the first item', () => {
			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 38, key: 'ArrowUp' });
			expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'Three');
		});

		it('should move the focused value to the second item when up pressed twice', () => {
			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 38, key: 'ArrowUp' });
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 38, key: 'ArrowUp' });
			expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'Two');
		});

		it('should clear the selection on escape', () => {
			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 27, key: 'Escape' });
			expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-option');

		});

		it('should open the options on arrow down with the top option focused, when the options are closed', () => {

			var selectControl = getSelectControl(instance);
			var domNode = ReactDOM.findDOMNode(instance);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 38, key: 'ArrowDown' });
			expect(domNode, 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'One');
		});

		it('should open the options on arrow up with the top option focused, when the options are closed', () => {
			var selectControl = getSelectControl(instance);
			var domNode = ReactDOM.findDOMNode(instance);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
			expect(domNode, 'queried for', '.Select-option.is-focused',
				'to have items satisfying',
				'to have text', 'One');
		});

		it('should close the options one the second click on the arrow', () => {
			var selectArrow = ReactDOM.findDOMNode(instance).querySelector('.Select-arrow');
			TestUtils.Simulate.mouseDown(selectArrow);
			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option'), 'to have length', 3);

			TestUtils.Simulate.mouseDown(selectArrow);
			expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
		});

		it('should ignore a right mouse click on the arrow', () => {
			var selectArrow = ReactDOM.findDOMNode(instance).querySelector('.Select-arrow');
			TestUtils.Simulate.mouseDown(selectArrow, { type: 'mousedown', button: 1 });
			expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
		});


		describe('after mouseEnter and leave of an option', () => {
			beforeEach(() => {
				// Show the options
				var selectControl = getSelectControl(instance);
				TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });

				var optionTwo = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option')[1];
				TestUtils.SimulateNative.mouseOver(optionTwo);
				TestUtils.SimulateNative.mouseOut(optionTwo);
			});

			it('should have no focused options', () => {
				var domNode = ReactDOM.findDOMNode(instance);
				expect(domNode, 'to contain no elements matching', '.Select-option.is-focused');
			});

			it('should focus top option after down arrow pressed', () => {
				var selectControl = getSelectControl(instance);
				TestUtils.Simulate.keyDown(selectControl, { keyCode: 40, key: 'ArrowDown' });
				var domNode = ReactDOM.findDOMNode(instance);
				expect(domNode, 'queried for', '.Select-option.is-focused',
					'to have items satisfying',
					'to have text', 'One');

			});

			it('should focus last option after up arrow pressed', () => {
				var selectControl = getSelectControl(instance);
				TestUtils.Simulate.keyDown(selectControl, { keyCode: 38, key: 'ArrowUp' });
				var domNode = ReactDOM.findDOMNode(instance);
				expect(domNode, 'queried for', '.Select-option.is-focused',
					'to have items satisfying',
					'to have text', 'Three');
			});
		});
	});

	describe('with values as numbers', () => {
		beforeEach(() => {
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

		it('selects the initial value', () => {
			expect(ReactDOM.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have text', 'Two');
		});

		it('set the initial value of the hidden input control', () => {
			expect(ReactDOM.findDOMNode(wrapper).querySelector(FORM_VALUE).value, 'to equal', '2' );
		});

		it('updates the value when the value prop is set', () => {
			wrapper.setPropsForChild({ value: 3 });
			expect(ReactDOM.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have text', 'Three');
		});

		it('updates the value of the hidden input control after new value prop', () => {
			wrapper.setPropsForChild({ value: 3 });
			expect(ReactDOM.findDOMNode(wrapper).querySelector(FORM_VALUE).value, 'to equal', '3' );
		});

		it('calls onChange with the new value as a number', () => {

			clickArrowToOpen();
			pressDown();
			pressEnterToAccept();
			expect(onChange, 'was called with', 3, [ { value: 3, label: 'Three' }]);
		});

		it('supports setting the value to 0 via prop', () => {

			wrapper.setPropsForChild({ value: 0 });
			expect(ReactDOM.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have text', 'Zero');
		});

		it('supports selecting the zero value', () => {

			clickArrowToOpen();
			pressUp();
			pressUp();
			pressEnterToAccept();
			expect(onChange, 'was called with', 0, [ { value: 0, label: 'Zero' }]);
		});

		describe('with multi=true', () => {

			beforeEach(() => {

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

			it('selects the initial value', () => {

				expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-item .Select-item-label',
					'to satisfy', [
						expect.it('to have text', 'Two'),
						expect.it('to have text', 'One')
					]);
			});

			it('calls onChange with the correct value when 1 option is selected', () => {

				var removeIcons = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item .Select-item-icon');
				TestUtils.Simulate.click(removeIcons[0]);
				// For multi-select, the "value" (first arg) to onChange is always a string
				expect(onChange, 'was called with', '1', [{ value: 1, label: 'One' }]);
			});

			it('supports updating the values via props', () => {

				wrapper.setPropsForChild({
					value: '3,4'
				});

				expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-item .Select-item-label',
					'to satisfy', [
						expect.it('to have text', 'Three'),
						expect.it('to have text', 'Four')
					]);
			});

			it('supports updating the value to 0', () => {

				// This test is specifically in case there's a "if (value) {... " somewhere
				wrapper.setPropsForChild({
					value: 0
				});

				expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-item .Select-item-label',
					'to satisfy', [
						expect.it('to have text', 'Zero')
					]);
			});

			it('calls onChange with the correct values when multiple options are selected', () => {

				typeSearchText('fo');
				pressEnterToAccept(); // Select 'Four'

				expect(onChange, 'was called with', '2,1,4', [
					{ value: 2, label: 'Two' },
					{ value: 1, label: 'One' },
					{ value: 4, label: 'Four' }
				]);
			});
		});

		describe('searching', () => {

			let searchOptions = [
				{ value: 1, label: 'One' },
				{ value: 2, label: 'Two' },
				{ value: 10, label: 'Ten' },
				{ value: 20, label: 'Twenty' },
				{ value: 21, label: 'Twenty-one' },
				{ value: 34, label: 'Thirty-four' },
				{ value: 54, label: 'Fifty-four' }
			];

			describe('with matchPos=any and matchProp=any', () => {
				beforeEach(() => {
					instance = createControl({
						matchPos: 'any',
						matchProp: 'any',
						options: searchOptions
					});
				});

				it('finds text anywhere in value', () => {

					typeSearchText('1');
					expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option',
					'to satisfy', [
							expect.it('to have text', 'One'),
							expect.it('to have text', 'Ten'),
							expect.it('to have text', 'Twenty-one')
						]);
				});

				it('finds text at end', () => {

					typeSearchText('4');
					expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option',
						'to satisfy', [
							expect.it('to have text', 'Thirty-four'),
							expect.it('to have text', 'Fifty-four')
						]);
				});
			});

			describe('with matchPos=start and matchProp=any', () => {

				beforeEach(() => {
					instance = createControl({
						matchPos: 'start',
						matchProp: 'any',
						options: searchOptions
					});
				});

				it('finds text at the start of the value', () => {

					typeSearchText('1');
					expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option',
						'to satisfy', [
							expect.it('to have text', 'One'),
							expect.it('to have text', 'Ten')
						]);
				});

				it('does not match text at end', () => {

					typeSearchText('4');
					expect(ReactDOM.findDOMNode(instance), 'to contain elements matching',
						'.Select-noresults');
					expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching',
						'.Select-option');
				});
			});

			describe('with matchPos=any and matchProp=value', () => {
				beforeEach(() => {
					instance = createControl({
						matchPos: 'any',
						matchProp: 'value',
						options: searchOptions
					});
				});

				it('finds text anywhere in value', () => {

					typeSearchText('1');
					expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option',
						'to satisfy', [
							expect.it('to have text', 'One'),
							expect.it('to have text', 'Ten'),
							expect.it('to have text', 'Twenty-one')
						]);
				});

				it('finds text at end', () => {

					typeSearchText('4');
					expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option',
						'to satisfy', [
							expect.it('to have text', 'Thirty-four'),
							expect.it('to have text', 'Fifty-four')
						]);
				});
			});

			describe('with matchPos=start and matchProp=value', () => {

				beforeEach(() => {
					instance = createControl({
						matchPos: 'start',
						matchProp: 'value',
						options: searchOptions
					});
				});

				it('finds text at the start of the value', () => {

					typeSearchText('1');
					expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option',
						'to satisfy', [
							expect.it('to have text', 'One'),
							expect.it('to have text', 'Ten')
						]);
				});

				it('does not match text at end', () => {

					typeSearchText('4');
					expect(ReactDOM.findDOMNode(instance), 'to contain elements matching',
						'.Select-noresults');
					expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching',
						'.Select-option');
				});
			});
		});
	});

	describe('with options and value', () => {
		beforeEach(() => {

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

		it('starts with the given value', () => {

			var node = ReactDOM.findDOMNode(instance);
			expect(node, 'queried for', DISPLAYED_SELECTION_SELECTOR,
				'to have items satisfying', 'to have text', 'One');
		});



		it('supports setting the value via prop', () => {

			wrapper.setPropsForChild({
				value: 'three'
			});

			expect(ReactDOM.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
				'to have items satisfying', 'to have text', 'Three');
		});

		it('sets the value of the hidden form node', () => {

			wrapper.setPropsForChild({
				value: 'three'
			});

			expect(ReactDOM.findDOMNode(wrapper).querySelector(FORM_VALUE).value, 'to equal', 'three' );
		});

		it('display the raw value if the option is not available', () => {

			wrapper.setPropsForChild({
				value: 'something new'
			});

			expect(ReactDOM.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
				'to have items satisfying', 'to have text', 'something new');
		});

		it('updates the display text if the option appears later', () => {

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

			expect(ReactDOM.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
				'to have items satisfying', 'to have text', 'New item in the options');

		});
	});

	describe('with a disabled option', () => {

		beforeEach(() => {

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

		it('adds the is-disabled class to the disabled option', () => {

			clickArrowToOpen();
			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option')[1],
				'to have attributes', {
					class: 'is-disabled'
            });
		});

		it('is not selectable by clicking', () => {

			clickArrowToOpen();
			TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option')[1]);

			expect(onChange, 'was not called');
			expect(ReactDOM.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have text', 'Select...');
		});

		it('is not selectable by keyboard', () => {

			clickArrowToOpen();
			// Press down to get to the second option
			TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
			// Check the disable option is not focused
			expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-option.is-disabled.is-focused');
		});

		it('jumps over the disabled option', () => {

			clickArrowToOpen();
			// Press down to get to the second option
			TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
			// Check the focused option is the one after the disabled option
			expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-option.is-focused',
				'to have text', 'Three');
		});

		it('jumps back to beginning when disabled option is last option', () => {

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
			expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-option.is-focused',
				'to have text', 'One');
		});

		it('skips over last option when looping round when last option is disabled', () => {

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
			expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-option.is-focused',
				'to have text', 'Two');
		});

		it('focuses initially on the second option when the first is disabled', () => {

			wrapper = createControlWithWrapper({
				options: [
					{ value: 'one', label: 'One', disabled: true },
					{ value: 'two', label: 'Two' },
					{ value: 'three', label: 'Three' }
				]
			});

			clickArrowToOpen();
			expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-option.is-focused',
				'to have text', 'Two');
		});

		it('doesn\'t focus anything when all options are disabled', () => {

			wrapper = createControlWithWrapper({
				options: [
					{ value: 'one', label: 'One', disabled: true },
					{ value: 'two', label: 'Two', disabled: true },
					{ value: 'three', label: 'Three', disabled: true }
				]
			});

			clickArrowToOpen();

			TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
			expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-option.is-focused');
		});

		it('doesn\'t select anything when all options are disabled and enter is pressed', () => {

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
			expect(ReactDOM.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have text', 'Select...');
		});

		it("doesn't select anything when a disabled option is the only item in the list after a search", () => {

			typeSearchText('tw'); // Only 'two' in the list
			pressEnterToAccept();
			expect(onChange, 'was not called');
			// And the menu is still open
			expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', DISPLAYED_SELECTION_SELECTOR);
			expect(ReactDOM.findDOMNode(instance), 'queried for' , '.Select-option',
				'to satisfy', [
					expect.it('to have text', 'Two')
				]);
		});

		it("doesn't select anything when a disabled option value matches the entered text", () => {

			typeSearchText('two');  // Matches value
			pressEnterToAccept();
			expect(onChange, 'was not called');
			// And the menu is still open
			expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', DISPLAYED_SELECTION_SELECTOR);
			expect(ReactDOM.findDOMNode(instance), 'queried for' , '.Select-option',
				'to satisfy', [
					expect.it('to have text', 'Two')
				]);
		});

		it("doesn't select anything when a disabled option label matches the entered text", () => {

			typeSearchText('Two');  // Matches label
			pressEnterToAccept();
			expect(onChange, 'was not called');
			// And the menu is still open
			expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', DISPLAYED_SELECTION_SELECTOR);
			expect(ReactDOM.findDOMNode(instance), 'queried for' , '.Select-option',
				'to satisfy', [
					expect.it('to have text', 'Two')
				]);
		});

		it('shows disabled results in a search', () => {

			typeSearchText('t');
			var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(options[0], 'to have text', 'Two');
			expect(options[0], 'to have attributes', {
				class: 'is-disabled'
			});
			expect(options[1], 'to have text', 'Three');
		});

		it('is does not close menu when disabled option is clicked', () => {

			clickArrowToOpen();
			TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option')[1]);

			var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(options.length, 'to equal', 3);
		});
	});

	describe('with styled options', () => {

		beforeEach(() => {

			options = [
				{ value: 'one', label: 'One', className: 'extra-one', title: 'Eins' },
				{ value: 'two', label: 'Two', className: 'extra-two', title: 'Zwei' },
				{ value: 'three', label: 'Three', style: { fontSize: 25 } }
			];

			wrapper = createControlWithWrapper({
				options: options
			});
		});

		it('uses the given className for an option', () => {

			clickArrowToOpen();
			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option')[0], 'to have attributes',
				{
					class: 'extra-one'
				});
		});

		it('uses the given style for an option', () => {

			clickArrowToOpen();
			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option')[2], 'to have attributes',
				{
					style: { 'font-size': '25px' }
				});
		});

		it('uses the given title for an option', () => {

			clickArrowToOpen();
			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option')[1], 'to have attributes',
				{
					title: 'Zwei'
				});
		});

		it('uses the given className for a single selection', () => {

			typeSearchText('tw');
			pressEnterToAccept();
			expect(ReactDOM.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have attributes', {
					class: 'extra-two'
				});
		});

		it('uses the given style for a single selection', () => {

			typeSearchText('th');
			pressEnterToAccept();
			expect(ReactDOM.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have attributes', {
					style: {
						'font-size': '25px'
					}
				});
		});

		it('uses the given title for a single selection', () => {

			typeSearchText('tw');
			pressEnterToAccept();
			expect(ReactDOM.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
				'to have attributes', {
					title: 'Zwei'
				});
		});

		describe('with multi', () => {

			beforeEach(() => {

				wrapper.setPropsForChild({ multi: true });
			});


			it('uses the given className for a selected value', () => {

				typeSearchText('tw');
				pressEnterToAccept();
				expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-item',
					'to have attributes', {
						class: 'extra-two'
					});
			});

			it('uses the given style for a selected value', () => {

				typeSearchText('th');
				pressEnterToAccept();
				expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-item',
					'to have attributes', {
						style: {
							'font-size': '25px'
						}
					});
			});

			it('uses the given title for a selected value', () => {

				typeSearchText('tw');
				pressEnterToAccept();
				expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-item',
					'to have attributes', {
						title: 'Zwei'
					});
			});

		});

	});

	describe('with allowCreate=true', () => {

		beforeEach(() => {

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

		it('has an "Add xyz" option when entering xyz', () => {
			typeSearchText('xyz');

			expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-menu .Select-option',
				'to have items satisfying', 'to have text', 'Add xyz to values?');
		});

		it('fires an onChange with the new value when selecting the Add option', () => {

			typeSearchText('xyz');
			TestUtils.Simulate.click(ReactDOM.findDOMNode(instance).querySelector('.Select-menu .Select-option'));

			expect(onChange, 'was called with', 'xyz');
		});

		it('allows updating the options with a new label, following the onChange', () => {

			typeSearchText('xyz');
			TestUtils.Simulate.click(ReactDOM.findDOMNode(instance).querySelector('.Select-menu .Select-option'));

			expect(onChange, 'was called with', 'xyz');

			// Now the client adds the option, with a new label
			wrapper.setPropsForChild({
				options: [
					{ value: 'one', label: 'One' },
					{ value: 'xyz', label: 'XYZ Label' }
				],
				value: 'xyz'
			});

			expect(ReactDOM.findDOMNode(instance).querySelector(DISPLAYED_SELECTION_SELECTOR),
				'to have text', 'XYZ Label');
		});

		it('displays an add option when a value with spaces is entered', () => {

			typeSearchText('got');

			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[0],
				'to have text', 'Add got to values?');
		});

		it('displays an add option when a value with spaces is entered', () => {

			typeSearchText('got');

			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[0],
				'to have text', 'Add got to values?');
		});

		it('displays an add option when a label with spaces is entered', () => {

			typeSearchText('test');

			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[0],
				'to have text', 'Add test to values?');
		});

		it('does not display the option label when an existing value is entered', () => {

			typeSearchText('zzzzz');

			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option'),
				'to have length', 1);
			expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-menu .Select-option',
				'to have text', 'Add zzzzz to values?');
		});

		it('renders the existing option and an add option when an existing display label is entered', () => {

			typeSearchText('test value');

			// First item should be the add option (as the "value" is not in the collection)
			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[0],
				'to have text', 'Add test value to values?');
			// Second item should be the existing option with the matching label
			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[1],
				'to have text', 'test value');
			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option'),
				'to have length', 2);
		});
	});

	describe('with async options', () => {

		var asyncOptions;

		beforeEach(() => {

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

		describe('with autoload=true', () => {

			beforeEach(() => {

				// Render an instance of the component
				wrapper = createControlWithWrapper({
					value: '',
					asyncOptions: asyncOptions,
					autoload: true
				});
			});


			it('calls the asyncOptions initially with autoload=true', () => {

				expect(asyncOptions, 'was called with', '');
			});

			it('calls the asyncOptions again when the input changes', () => {

				typeSearchText('ab');

				expect(asyncOptions, 'was called twice');
				expect(asyncOptions, 'was called with', 'ab');
			});

			it('shows the returned options after asyncOptions calls back', () => {

				typeSearchText('te');

				var optionList = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option');
				expect(optionList, 'to have length', 3);
				expect(optionList[0], 'to have text', 'TEST one');
				expect(optionList[1], 'to have text', 'TEST two');
				expect(optionList[2], 'to have text', 'TELL three');
			});

			it('uses the options cache when the same text is entered again', () => {


				typeSearchText('te');
				typeSearchText('tes');

				expect(asyncOptions, 'was called times', 3);

				typeSearchText('te');

				expect(asyncOptions, 'was called times', 3);

			});

			it('displays the correct options from the cache after the input is changed back to a previous value', () => {

				typeSearchText('te');
				typeSearchText('tes');
				typeSearchText('te');
				// Double check the options list is still correct
				var optionList = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option');
				expect(optionList, 'to have length', 3);
				expect(optionList[0], 'to have text', 'TEST one');
				expect(optionList[1], 'to have text', 'TEST two');
				expect(optionList[2], 'to have text', 'TELL three');
			});

			it('re-filters an existing options list if complete:true is provided', () => {

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
				var optionList = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option');
				expect(optionList, 'to have length', 1);
				expect(optionList[0], 'to have text', 'TELL three');
			});

			it('rethrows the error if err is set in the callback', () => {

				asyncOptions.withArgs('tes').callsArgWith(1, new Error('Something\'s wrong jim'), {
					options: [
						{ value: 'test', label: 'TEST one' },
						{ value: 'test2', label: 'TEST two' }
					]
				});

				expect(() => {
					typeSearchText('tes');
				}, 'to throw exception', new Error('Something\'s wrong jim'));
			});

			it('calls the asyncOptions function when the value prop changes', () => {

				expect(asyncOptions, 'was called once');

				wrapper.setPropsForChild({ value: 'test2' });

				expect(asyncOptions, 'was called twice');
			});


		});

		describe('with autoload=false', () => {

			beforeEach(() => {

				// Render an instance of the component
				instance = createControl({
					value: '',
					asyncOptions: asyncOptions,
					autoload: false
				});
			});

			it('does not initially call asyncOptions', () => {

				expect(asyncOptions, 'was not called');
			});

			it('calls the asyncOptions on first key entry', () => {

				typeSearchText('a');
				expect(asyncOptions, 'was called with', 'a');
			});
		});

		describe('with cacheAsyncResults=false', () => {

			beforeEach(() => {

				// Render an instance of the component
				wrapper = createControlWithWrapper({
					value: '',
					asyncOptions: asyncOptions,
					cacheAsyncResults: false
				});

				// Focus on the input, such that mouse events are accepted
				searchInputNode = ReactDOM.findDOMNode(instance.getInputNode()).querySelector('input');
				TestUtils.Simulate.focus(searchInputNode);
			});

			it('does not use cache when the same text is entered again', () => {

				typeSearchText('te');
				typeSearchText('tes');

				expect(asyncOptions, 'was called times', 3);

				typeSearchText('te');

				expect(asyncOptions, 'was called times', 4);

			});

			it('updates the displayed value after changing value and refreshing from asyncOptions', () => {

				asyncOptions.reset();
				asyncOptions.callsArgWith(1, null, {
					options: [
						{ value: 'newValue', label: 'New Value from Server' },
						{ value: 'test', label: 'TEST one' }
					]
				});

				wrapper.setPropsForChild({ value: 'newValue' });

				expect(ReactDOM.findDOMNode(instance), 'queried for first', DISPLAYED_SELECTION_SELECTOR,
					'to have text', 'New Value from Server');
			});


		});
	});

	describe('with async options (using promises)', () => {

		var asyncOptions, callCount, callInput;

		beforeEach(() => {

			asyncOptions = sinon.spy((input) => {
			  const options = [
					{ value: 'test', label: 'TEST one' },
					{ value: 'test2', label: 'TEST two' },
					{ value: 'tell', label: 'TELL three' }
				].filter((elm) => {
				  return (elm.value.indexOf(input) !== -1 || elm.label.indexOf(input) !== -1);
				});

				return new Promise((resolve, reject) => {
					input === '_FAIL'? reject('nope') : resolve({options: options});
				})
			});
		});

		describe('[mocked promise]', () => {

			beforeEach(() => {

				// Render an instance of the component
				wrapper = createControlWithWrapper({
					value: '',
					asyncOptions: asyncOptions,
					autoload: true
				});
			});

			it('should fulfill asyncOptions promise', () => {
				return expect(instance.props.asyncOptions(''), 'to be fulfilled');
			});

			it('should fulfill with 3 options when asyncOptions promise with input = "te"', () => {
				return expect(instance.props.asyncOptions('te'), 'to be fulfilled with', {
					options: [
						{ value: 'test', label: 'TEST one' },
						{ value: 'test2', label: 'TEST two' },
						{ value: 'tell', label: 'TELL three' }
					]
				});
			});

			it('should fulfill with 2 options when asyncOptions promise with input = "tes"', () => {
				return expect(instance.props.asyncOptions('tes'), 'to be fulfilled with', {
					options: [
						{ value: 'test', label: 'TEST one' },
						{ value: 'test2', label: 'TEST two' }
					]
				});
			});

			it('should reject when asyncOptions promise with input = "_FAIL"', () => {
				return expect(instance.props.asyncOptions('_FAIL'), 'to be rejected');
			});
		});

		describe('with autoload=true', () => {

			beforeEach(() => {

				// Render an instance of the component
				wrapper = createControlWithWrapper({
					value: '',
					asyncOptions: asyncOptions,
					autoload: true
				});
			});

			it('should be called once at the beginning', () => {
				expect(asyncOptions, 'was called');
			});

			it('calls the asyncOptions again when the input changes', () => {

				typeSearchText('ab');

				expect(asyncOptions, 'was called twice');
				expect(asyncOptions, 'was called with', 'ab');
			});

			it('shows the returned options after asyncOptions promise is resolved', (done) => {

				typeSearchText('te');

				return asyncOptions.secondCall.returnValue.then(() => {
					setTimeout(() => {
						expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option',
							'to satisfy', [
								expect.it('to have text', 'TEST one'),
								expect.it('to have text', 'TEST two'),
								expect.it('to have text', 'TELL three')
							]);
						done();
					});
				});

			});

			it('doesn\'t update the returned options when asyncOptions is rejected', (done) => {

				typeSearchText('te');
				expect(asyncOptions, 'was called with', 'te');

				asyncOptions.secondCall.returnValue.then(() => {
					setTimeout(() => {
						expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option',
							'to satisfy', [
								expect.it('to have text', 'TEST one'),
								expect.it('to have text', 'TEST two'),
								expect.it('to have text', 'TELL three')
							]);

						// asyncOptions mock is set to reject the promise when invoked with '_FAIL'
						typeSearchText('_FAIL');
						expect(asyncOptions, 'was called with', '_FAIL');

						asyncOptions.thirdCall.returnValue.then(null, () => {
							setTimeout(() => {
								expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option',
									'to satisfy', [
										expect.it('to have text', 'TEST one'),
										expect.it('to have text', 'TEST two'),
										expect.it('to have text', 'TELL three')
									]);

								done();
							});

						});
					});

				});
			});

		});

		describe('with autoload=false', () => {

			beforeEach(() => {

				// Render an instance of the component
				instance = createControl({
					value: '',
					asyncOptions: asyncOptions,
					autoload: false
				});
			});

			it('does not initially call asyncOptions', () => {
				expect(asyncOptions, 'was not called');
			});

			it('calls the asyncOptions on first key entry', () => {

				typeSearchText('a');
				expect(asyncOptions, 'was called once');
				expect(asyncOptions, 'was called with', 'a');
			});
		});
	});

	describe('with multi-select', () => {

		beforeEach(() => {

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

		it('selects a single option on enter', () => {

			typeSearchText('fo');
			pressEnterToAccept();
			expect(onChange, 'was called with', 'four', [{ label: 'Four', value: 'four' }]);
		});

		it('selects a second option', () => {

			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('th');
			onChange.reset();  // Ignore previous onChange calls
			pressEnterToAccept();
			expect(onChange, 'was called with', 'four,three',
				[{ label: 'Four', value: 'four' }, { label: 'Three', value: 'three' }]);
		});

		it('displays both selected options', () => {

			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('th');
			pressEnterToAccept();
			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item-label')[0],
				'to have text', 'Four');
			expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item-label')[1],
				'to have text', 'Three');
		});

		it('filters the existing selections from the options', () => {

			wrapper.setPropsForChild({
				value: 'four,three'
			});

			typeSearchText('o');

			var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(options[0], 'to have text', 'Add "o"?');
			expect(options[1], 'to have text', 'One');
			expect(options[2], 'to have text', 'Two');
			expect(options, 'to have length', 3);  // No "Four", as already selected
		});

		it('removes the last selected option with backspace', () => {

			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('th');
			pressEnterToAccept();
			onChange.reset();  // Ignore previous onChange calls
			pressBackspace();
			expect(onChange, 'was called with', 'four', [{ label: 'Four', value: 'four' }]);
		});

		it('does not remove the last selected option with backspace when backspaceRemoves=false', () => {

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
			var items = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item-label');
			expect(items[0], 'to have text', 'Four');
			expect(items[1], 'to have text', 'Three');
		});

		it('removes an item when clicking on the X', () => {

			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('th');
			pressEnterToAccept();
			typeSearchText('tw');
			pressEnterToAccept();
			onChange.reset();  // Ignore previous onChange calls

			var threeDeleteButton = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item-icon')[1];
			TestUtils.Simulate.click(threeDeleteButton);

			expect(onChange, 'was called with', 'four,two', [
				{ label: 'Four', value: 'four' },
				{ label: 'Two', value: 'two' }
			]);
		});

		it('uses the selected text as an item when comma is pressed', () => {

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

		describe('with late options', () => {

			beforeEach(() => {

				wrapper = createControlWithWrapper({
					multi: true,
					options: options,
					value: 'one,two'
				});
			});

			it('updates the label when the options are updated', () => {

				wrapper.setPropsForChild({
					options: [
						{ value: 'one', label: 'new label for One' },
						{ value: 'two', label: 'new label for Two' },
						{ value: 'three', label: 'new label for Three' }
					]
				});

				var items = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item');

				expect(items[0], 'queried for', '.Select-item-label',
					'to have items satisfying',
					'to have text', 'new label for One');

				expect(items[1], 'queried for', '.Select-item-label',
					'to have items satisfying',
					'to have text', 'new label for Two');
			});
		});

	});

	describe('with multi=true and searchable=false', () => {

		beforeEach(() => {

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

		it('selects multiple options', () => {

			clickArrowToOpen();

			var items = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
			TestUtils.Simulate.mouseDown(items[1]);
			// The menu is now closed, click the arrow to open it again
			clickArrowToOpen();
			items = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
			TestUtils.Simulate.mouseDown(items[0]);

			var selectedItems = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item-label');
			expect(selectedItems[0], 'to have text', 'Two');
			expect(selectedItems[1], 'to have text', 'One');
			expect(selectedItems, 'to have length', 2);
		});

		it('calls onChange when each option is selected', () => {

			clickArrowToOpen();
			// First item
			var items = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
			TestUtils.Simulate.mouseDown(items[1]);
			expect(onChange, 'was called once');
			expect(onChange, 'was called with', 'two', [{ value: 'two', label: 'Two' }]);

			// Second item

			// The menu is now closed, click the arrow to open it again
			clickArrowToOpen();
			items = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
			TestUtils.Simulate.mouseDown(items[0]);
			expect(onChange, 'was called twice');
		});

		it('removes the selected options from the menu', () => {

			clickArrowToOpen();

			var items = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');

			// Click the option "Two" to select it
			expect(items[1], 'to have text', 'Two');
			TestUtils.Simulate.mouseDown(items[1]);
			expect(onChange, 'was called times', 1);

			// Now get the list again,
			// The menu is now closed, click the arrow to open it again
			clickArrowToOpen();
			items = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(items[0], 'to have text', 'One');
			expect(items[1], 'to have text', 'Three');
			expect(items[2], 'to have text', 'Four');
			expect(items, 'to have length', 3);

			// Click first item, 'One'
			TestUtils.Simulate.mouseDown(items[0]);

			expect(onChange, 'was called times', 2);
			// The menu is now closed, click the arrow to open it again
			clickArrowToOpen();
			items = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(items[0], 'to have text', 'Three');
			expect(items[1], 'to have text', 'Four');
			expect(items, 'to have length', 2);

			// Click second item, 'Four'
			TestUtils.Simulate.mouseDown(items[1]);
			expect(onChange, 'was called times', 3);

			// The menu is now closed, click the arrow to open it again
			clickArrowToOpen();
			items = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
			expect(items[0], 'to have text', 'Three');
			expect(items, 'to have length', 1);
		});

	});

	describe('with props', () => {


		describe('className', () => {

			it('assigns the className to the outer-most element', () => {

				var instance = createControl({ className: 'test-class' });
				expect(ReactDOM.findDOMNode(instance), 'to have attributes', {
					class: 'test-class'
				});
			});
		});

		describe('clearable=true', () => {

			beforeEach(() => {

				var instance = createControl({
					clearable: true,
					options: defaultOptions,
					value: 'three'
				});

				expect(ReactDOM.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
					'to have items satisfying', 'to have text', 'Three');

			});

			describe('on pressing escape', () => {

				beforeEach(() => {

					pressEscape();
				});

				it('calls onChange with empty', () => {

					expect(onChange, 'was called with', '');
				});

				it('resets the display value', () => {

					expect(ReactDOM.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
						'to have items satisfying', 'to have text', 'Select...');
				});

				it('resets the control value', () => {

					expect(ReactDOM.findDOMNode(instance).querySelector('input').value, 'to equal', '');
				});
			});

			describe('on clicking `clear`', () => {
				beforeEach(() => {
					TestUtils.Simulate.click(ReactDOM.findDOMNode(instance).querySelector('.Select-clear'));
				});

				it('calls onChange with empty', () => {
					expect(onChange, 'was called with', '');
				});

				it('resets the display value', () => {
					expect(ReactDOM.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
						'to have items satisfying', 'to have text', 'Select...');
				});

				it('resets the control value', () => {
					expect(ReactDOM.findDOMNode(instance).querySelector('input').value, 'to equal', '');
				});
			});
		});

		describe('clearable=false', () => {

			beforeEach(() => {

				var instance = createControl({
					clearable: false,
					options: defaultOptions,
					value: 'three'
				});

				expect(ReactDOM.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
					'to have items satisfying', 'to have text', 'Three');

			});

			it('does not render a clear button', () => {

				expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-clear');
			});

			describe('on escape', () => {
				beforeEach(() => {

					pressEscape();
				});

				it('does not call onChange', () => {

					expect(onChange, 'was not called');
				});

				it('does not reset the display value', () => {

					expect(ReactDOM.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
						'to have items satisfying', 'to have text', 'Three');
				});

				it('does not reset the control value', () => {

					expect(ReactDOM.findDOMNode(instance).querySelector('input').value, 'to equal', 'three');
				});

			});

			describe('when open', () => {

				beforeEach(() => {

					typeSearchText('abc');
				});

				describe('on escape', () => {

					beforeEach(() => {
						pressEscape();
					});

					it('closes the menu', () => {

						expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-menu');
					});

					it('resets the control value to the original', () => {

						expect(ReactDOM.findDOMNode(instance).querySelector('input').value, 'to equal', 'three');
					});

					it('renders the original display label', () => {

						expect(ReactDOM.findDOMNode(instance), 'queried for', DISPLAYED_SELECTION_SELECTOR,
							'to have items satisfying', 'to have text', 'Three');
					});
				});
			});
		});

		describe('clearAllText', () => {

			beforeEach(() => {

				instance = createControl({
					multi: true,
					clearable: true,
					value: 'three',
					clearAllText: 'Remove All Items Test Title',
					clearValueText: 'Remove Value Test Title',  // Should be ignored, multi=true
					options: defaultOptions
				});
			});

			it('uses the prop as the title for clear', () => {

				expect(ReactDOM.findDOMNode(instance).querySelector('.Select-clear-zone'), 'to have attributes', {
					title: 'Remove All Items Test Title'
				});
			});
		});

		describe('clearValueText', () => {

			beforeEach(() => {

				instance = createControl({
					multi: false,
					clearable: true,
					value: 'three',
					clearAllText: 'Remove All Items Test Title', // Should be ignored, multi=false
					clearValueText: 'Remove Value Test Title',
					options: defaultOptions
				});
			});

			it('uses the prop as the title for clear', () => {

				expect(ReactDOM.findDOMNode(instance).querySelector('.Select-clear-zone'), 'to have attributes', {
					title: 'Remove Value Test Title'
				});
			});
		});

		describe('delimiter', () => {

			describe('is ;', () => {

				beforeEach(() => {

					instance = createControl({
						multi: true,
						value: 'four;three',
						delimiter: ';',
						options: defaultOptions
					});
				});

				it('interprets the initial options correctly', () => {

					var values = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item');

					expect(values[0], 'queried for', '.Select-item-label', 'to have items satisfying',
						'to have text', 'AbcDef');
					expect(values[1], 'queried for', '.Select-item-label', 'to have items satisfying',
						'to have text', 'Three');
					expect(values, 'to have length', 2);
				});

				it('adds an additional option with the correct delimiter', () => {

					typeSearchText('one');
					pressEnterToAccept();
					expect(onChange, 'was called with', 'four;three;one', [
						{ value: 'four', label: 'AbcDef' },
						{ value: 'three', label: 'Three' },
						{ value: 'one', label: 'One' }
					]);
				});
			});

			describe('is a multi-character string (`==XXX==`)', () => {

				beforeEach(() => {

					instance = createControl({
						multi: true,
						value: 'four==XXX==three',
						delimiter: '==XXX==',
						options: defaultOptions
					});
				});

				it('interprets the initial options correctly', () => {

					var values = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item');

					expect(values[0], 'queried for', '.Select-item-label', 'to have items satisfying',
						'to have text', 'AbcDef');
					expect(values[1], 'queried for', '.Select-item-label', 'to have items satisfying',
						'to have text', 'Three');
					expect(values, 'to have length', 2);
				});

				it('adds an additional option with the correct delimiter', () => {

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

		describe('disabled=true', () => {

			beforeEach(() => {

				instance = createControl({
					options: defaultOptions,
					value: 'three',
					disabled: true,
					searchable: true
				});
			});

			it('does not render an input search control', () => {

				expect(searchInputNode, 'to be null');
			});

			it('does not react to keyDown', () => {

				TestUtils.Simulate.keyDown(getSelectControl(instance), { keyCode: 40, key: 'ArrowDown' });
				expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
			});

			it('does not respond to mouseDown', () => {

				TestUtils.Simulate.mouseDown(getSelectControl(instance));
				expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
			});

			it('does not respond to mouseDown on the arrow', () => {

				TestUtils.Simulate.mouseDown(getSelectControl(instance).querySelector('.Select-arrow'));
				expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
			});

			it('renders the given value', () => {

				expect(ReactDOM.findDOMNode(instance).querySelector(DISPLAYED_SELECTION_SELECTOR), 'to have text', 'Three');
			});
		});

		describe('custom filterOption function', () => {

			// Custom function returns true only for value "four"
			var filterOption = (option) => {
				if (option.value === 'four') {
					return true;
				}

				return false;
			};
			var spyFilterOption;

			beforeEach(() => {

				spyFilterOption = sinon.spy(filterOption);

				instance = createControl({
					options: defaultOptions,
					filterOption: spyFilterOption
				});
			});

			it('calls the filter with each option', () => {

				expect(spyFilterOption, 'was called times', 4);
				expect(spyFilterOption, 'was called with', defaultOptions[0], '');
				expect(spyFilterOption, 'was called with', defaultOptions[1], '');
				expect(spyFilterOption, 'was called with', defaultOptions[2], '');
				expect(spyFilterOption, 'was called with', defaultOptions[3], '');
			});

			describe('when entering text', () => {

				beforeEach(() => {

					spyFilterOption.reset();
					typeSearchText('xyz');
				});

				it('calls the filterOption function for each option', () => {

					expect(spyFilterOption, 'was called times', 4);
					expect(spyFilterOption, 'was called with', defaultOptions[0], 'xyz');
					expect(spyFilterOption, 'was called with', defaultOptions[1], 'xyz');
					expect(spyFilterOption, 'was called with', defaultOptions[2], 'xyz');
					expect(spyFilterOption, 'was called with', defaultOptions[3], 'xyz');
				});

				it('only shows the filtered option', () => {

					expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option'),
						'to have length', 1);

					expect(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option'),
						'to have items satisfying',
						'to have text', 'AbcDef');
				});
			});
		});

		describe('custom filterOptions function', () => {

			var spyFilterOptions;

			beforeEach(() => {

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

			it('calls the filterOptions function initially', () => {

				expect(spyFilterOptions, 'was called');
			});

			it('calls the filterOptions function initially with the initial options', () => {

				expect(spyFilterOptions, 'was called with', defaultOptions, '');
			});

			it('uses the returned options', () => {

				TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(instance).querySelector('.Select-arrow'));

				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options[0], 'to have text', 'Return One');
				expect(options[1], 'to have text', 'Return Two');
				expect(options, 'to have length', 2);
			});

			it('calls the filterOptions function on text change', () => {

				typeSearchText('xyz');
				expect(spyFilterOptions, 'was called with', defaultOptions, 'xyz');
			});

			it('uses new options after text change', () => {

				spyFilterOptions.returns([
					{ value: 'abc', label: 'AAbbcc' },
					{ value: 'def', label: 'DDeeff' }
				]);
				typeSearchText('xyz');

				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options[0], 'to have text', 'AAbbcc');
				expect(options[1], 'to have text', 'DDeeff');
				expect(options, 'to have length', 2);
			});
		});

		describe('ignoreCase=false', () => {

			beforeEach(() => {

				instance = createControl({
					searchable: true,
					ignoreCase: false,
					options: defaultOptions
				});
			});

			it('does not find options in a different case', () => {

				typeSearchText('def');
				expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
			});

			it('finds options in the same case', () => {

				typeSearchText('Def');
				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options[0], 'to have text', 'AbcDef');
				expect(options, 'to have length', 1);
			});
		});

		describe('inputProps', () => {


			beforeEach(() => {

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

			it('passes id through to the search input box', () => {
				expect(searchInputNode, 'to have attributes', {
					id: 'search-input-id'
				});
			});

			it('passes the inputClassName to the search input box', () => {

				expect(searchInputNode, 'to have attributes', {
					class: 'extra-input-class'
				});
			});

			it('adds the className on to the auto-size input', () => {

				expect(ReactDOM.findDOMNode(instance.getInputNode()),
					'to have attributes', {
						class: ['extra-class-name', 'Select-input']
					});
			});

			describe('and not searchable', () => {

				beforeEach(() => {

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

				it('sets the className and id on the placeholder for the input', () => {

					expect(ReactDOM.findDOMNode(instance).querySelector('.extra-class-name'),
						'to have attributes', {
							id: 'search-input-id'
						});
				});
			});

			describe('and disabled', () => {

				beforeEach(() => {

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

				it('doesn\'t pass the inputProps through', () => {

					expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.extra-class-name');
					expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '#search-input-id');
				});
			});
		});

		describe('matchPos=start', () => {

			beforeEach(() => {

				instance = createControl({
					searchable: true,
					matchPos: 'start',
					options: defaultOptions
				});
			});

			it('searches only at the start', () => {

				typeSearchText('o');
				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options[0], 'to have text', 'One');
				expect(options, 'to have length', 1);
			});
		});

		describe('matchProp=value', () => {

			beforeEach(() => {

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

			it('searches only the value', () => {

				typeSearchText('aa');  // Matches value "three", and label "AbcDef"
				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options, 'to have length', 1);
				expect(options[0], 'to have text', '111');
			});
		});

		describe('matchProp=label', () => {

			beforeEach(() => {

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

			it('searches only the value', () => {

				typeSearchText('bb');  // Matches value "three", and label "AbcDef"
				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options, 'to have length', 1);
				expect(options[0], 'to have text', 'bbb');
			});
		});

		describe('matchPos=start and matchProp=value', () => {

			beforeEach(() => {

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

			it('searches only the value', () => {

				typeSearchText('aa');  // Matches value "three", and label "AbcDef"
				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options, 'to have length', 1);
				expect(options[0], 'to have text', '111');
			});
		});

		describe('matchPos=start and matchProp=label', () => {

			beforeEach(() => {

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

			it('searches only the label', () => {

				typeSearchText('bb');  // Matches value "three", and label "AbcDef"
				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options, 'to have length', 1);
				expect(options[0], 'to have text', 'bbb');
			});
		});

		describe('noResultsText', () => {

			beforeEach(() => {

				wrapper = createControlWithWrapper({
					searchable: true,
					options: defaultOptions,
					noResultsText: 'No results unit test'
				});
			});

			it('displays the text when no results are found', () => {

				typeSearchText('DOES NOT EXIST');
				expect(ReactDOM.findDOMNode(instance).querySelector('.Select-menu'),
					'to have text', 'No results unit test');
			});

			it('supports updating the text', () => {

				wrapper.setPropsForChild({
					noResultsText: 'Updated no results text'
				});

				typeSearchText('DOES NOT EXIST');
				expect(ReactDOM.findDOMNode(instance).querySelector('.Select-menu'),
					'to have text', 'Updated no results text');
			});
		});

		describe('onBlur', () => {

			var onBlur;

			it('calls the onBlur prop when blurring the input', () => {

				onBlur = sinon.spy();

				instance = createControl({
					options: defaultOptions,
					onBlur: onBlur
				});

				TestUtils.Simulate.blur(searchInputNode);
				expect(onBlur, 'was called once');
			});
		});

		describe('onFocus', () => {

			var onFocus;

			beforeEach(() => {

				onFocus = sinon.spy();

				instance = createControl({
					options: defaultOptions,
					onFocus: onFocus
				});
			});

			it('calls the onFocus prop when focusing the control', () => {

				expect(onFocus, 'was called once');
			});
		});

		describe('onOptionLabelClick', () => {
			var onOptionLabelClick;

			beforeEach(() => {

				onOptionLabelClick = sinon.spy();

				instance = createControl({
					options: defaultOptions,
					multi: true,
					value: 'two,one',
					onOptionLabelClick: onOptionLabelClick
				});
			});

			it('calls the function when clicking on a label', () => {

				TestUtils.Simulate.click(ReactDOM.findDOMNode(instance).querySelector('.Select-item-label a'));
				expect(onOptionLabelClick, 'was called once');
			});

			it('calls the function with the value', () => {

				TestUtils.Simulate.click(ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item-label a')[0]);
				expect(onOptionLabelClick, 'was called with', { value: 'two', label: '222' });
			});
		});

		describe('optionRenderer', () => {

			var optionRenderer;

			beforeEach(() => {

				optionRenderer = (option) => {
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

			it('renders the options using the optionRenderer', () => {

				var selectArrow = ReactDOM.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);
				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');

				expect(options[0].querySelector('span'), 'to have attributes', {
					id: 'TESTOPTION_one'
				});
				expect(options[0].querySelector('span'), 'to have text', 'ONE');
				expect(options[1].querySelector('span'), 'to have attributes', {
					id: 'TESTOPTION_two'
				});
				expect(options[1].querySelector('span'), 'to have text', '222');
			});

			it('calls the renderer exactly once for each option', () => {
				var selectArrow = ReactDOM.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);
				expect(optionRenderer, 'was called times', 4);
			});
		});

		describe('optionRendererDisabled', () => {

			var optionRenderer;
			var renderLink = (props) => {
				return <a {...props} >Upgrade here!</a>;
			};

			var links = [
				{ href: '/link' },
				{ href: '/link2', target: '_blank' }
			];

			var ops = [
				{ label: 'Disabled', value: 'disabled', disabled: true, link: renderLink(links[0]) },
				{ label: 'Disabled 2', value: 'disabled_2', disabled: true, link: renderLink(links[1]) },
				{ label: 'Enabled', value: 'enabled' }
			];

			/**
			 * Since we don't have access to an actual Location object,
			 * this method will test a string (path) by the end of global.window.location.href
			 * @param  {string}  path Ending href path to check
			 * @return {Boolean}      Whether the location is at the path
			 */
			var isNavigated = (path) => {
				var window_location = global.window.location.href;
				return window_location.indexOf(path, window_location.length - path.length) !== -1;
			};

			var startUrl = 'http://dummy/startLink';

			beforeEach(() => {
				window.location.href = startUrl;

				optionRenderer = (option) => {
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

			it('disabled option link is still clickable', () => {
				var selectArrow = ReactDOM.findDOMNode(instance).querySelector('.Select-arrow');
				var selectArrow = ReactDOM.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);
				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
				var link = options[0].querySelector('a');
				expect(link, 'to have attributes', {
					href: links[0].href
				});

				expect(isNavigated(links[0].href), 'to be false');
				TestUtils.Simulate.click(link);
				expect(isNavigated(links[0].href), 'to be true');
			});

			it('disabled option link with target doesn\'t navigate the current window', () => {
				var selectArrow = ReactDOM.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);
				var options = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-option');
				var link = options[1].querySelector('a');
				expect(link, 'to have attributes', {
					href: links[1].href,
					target: '_blank'
				});

				expect(isNavigated(startUrl), 'to be true');
				TestUtils.Simulate.click(link);
				expect(isNavigated(links[1].href), 'to be false');
			});
		});

		describe('placeholder', () => {

			beforeEach(() => {

				wrapper = createControlWithWrapper({
					value: null,
					options: defaultOptions,
					placeholder: 'Choose Option Placeholder test'
				});
			});

			it('uses the placeholder initially', () => {
				expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-placeholder',
					'to have items satisfying',
					'to have text', 'Choose Option Placeholder test');
			});

			it('displays a selected value', () => {

				wrapper.setPropsForChild({
					value: 'three'
				});

				expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-placeholder',
					'to have items satisfying',
					'to have text', 'Three');
			});

			it('returns to the default placeholder when value is cleared', () => {

				wrapper.setPropsForChild({
					value: 'three'
				});

				wrapper.setPropsForChild({
					value: null
				});

				expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-placeholder',
					'to have items satisfying',
					'to have text', 'Choose Option Placeholder test');
			});

			it('allows changing the placeholder via props', () => {

				wrapper.setPropsForChild({
					placeholder: 'New placeholder from props'
				});

				expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-placeholder',
					'to have items satisfying',
					'to have text', 'New placeholder from props');
			});

			it('allows setting the placeholder to the selected value', () => {

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

				expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-placeholder',
					'to have items satisfying',
					'to have text', 'Three');

			});
		});

		describe('searchingText', () => {

			var asyncOptions;
			var asyncOptionsCallback;

			beforeEach(() => {

				asyncOptions = sinon.spy();

				instance = createControl({
					asyncOptions: asyncOptions,
					autoload: false,
					searchingText: 'Testing async loading...',
					noResultsText: 'Testing No results found',
					searchPromptText: 'Testing enter search query'
				});
			});

			it('uses the searchingText whilst the asyncOptions are loading', () => {

				clickArrowToOpen();
				expect(asyncOptions, 'was not called');
				typeSearchText('abc');
				expect(asyncOptions, 'was called');
				expect(ReactDOM.findDOMNode(instance), 'to contain elements matching', '.Select-loading');
				expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-searching',
					'to have text', 'Testing async loading...');
			});

			it('clears the searchingText when results arrive', () => {

				clickArrowToOpen();
				typeSearchText('abc');

				expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-searching',
					'to have text', 'Testing async loading...');

				asyncOptions.args[0][1](null, {
					options: [{ value: 'abc', label: 'Abc' }]
				});

				expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-noresults');
			});

			it('switches the searchingText to noResultsText when options arrive, but empty', () => {

				clickArrowToOpen();
				typeSearchText('abc');

				expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-searching',
					'to have text', 'Testing async loading...');
				expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-noresults');

				asyncOptions.args[0][1](null, {
					options: []
				});

				expect(ReactDOM.findDOMNode(instance), 'queried for first', '.Select-noresults',
					'to have text', 'Testing No results found');
				expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-searching');
			});
		});

		describe('searchPromptText', () => {
			var asyncOptions;

			beforeEach(() => {

				asyncOptions = sinon.stub();

				instance = createControl({
					asyncOptions: asyncOptions,
					autoload: false,
					searchPromptText: 'Unit test prompt text'
				});
			});

			it('uses the searchPromptText before text is entered', () => {

				var selectArrow = ReactDOM.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);

				expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-search-prompt',
					'to have items satisfying',
					'to have text', 'Unit test prompt text');
			});

			it('clears the searchPromptText when results arrive', () => {

				asyncOptions.callsArgWith(1, null, {
					options: [{ value: 'abcd', label: 'ABCD' }]
				});

				var selectArrow = ReactDOM.findDOMNode(instance).querySelector('.Select-arrow');
				TestUtils.Simulate.mouseDown(selectArrow);

				typeSearchText('abc');
				expect(asyncOptions, 'was called once');

				expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-prompt');
				expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-noresults');
			});
		});

		describe('valueRenderer', () => {

			var valueRenderer;

			beforeEach(() => {

				valueRenderer = (option) => {
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


			it('renders the value using the provided renderer', () => {

				var labelNode = ReactDOM.findDOMNode(instance).querySelector('.Select-value span');
				expect(labelNode, 'to have text', 'THREE');
				expect(labelNode, 'to have attributes', {
					id: 'TESTOPTION_three'
				});
			});
		});

		describe('valueRenderer and multi=true', () => {
			var valueRenderer;

			beforeEach(() => {

				valueRenderer = (option) => {
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

			it('renders the values using the provided renderer', () => {

				var labelNode = ReactDOM.findDOMNode(instance).querySelectorAll('.Select-item-label span');
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

	describe('clicking outside', () => {

		beforeEach(() => {

			instance = createControl({
				options: defaultOptions
			});
		});

		it('closes the menu', () => {

			TestUtils.Simulate.mouseDown(getSelectControl(instance));
			expect(ReactDOM.findDOMNode(instance), 'queried for', '.Select-option',
				'to have length', 4);

			clickDocument();
			expect(ReactDOM.findDOMNode(instance), 'to contain no elements matching', '.Select-option');
		});
	});
});
