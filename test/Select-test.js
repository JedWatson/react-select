'use strict';
/* global describe, it, beforeEach */

var helper = require('../testHelpers/jsdomHelper');
helper();

var sinon = require('sinon');
var unexpected = require('unexpected');
var unexpectedDom = require('unexpected-dom');
var unexpectedSinon = require('unexpected-sinon');
var expect = unexpected
	.clone()
	.installPlugin(unexpectedDom)
	.installPlugin(unexpectedSinon);

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
		var Component = this.props.childComponent;
		return (<Component {...this.state} ref="child" />);
	}
}

describe('Select', function() {
	var options, instance, onChange;
	var searchInputNode;

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

	function typeSearchText(text) {
		TestUtils.Simulate.change(searchInputNode, { target: { value: text } });
	}

	function getSelectControl(instance) {
		return React.findDOMNode(instance).querySelector('.Select-control');
	}
	
	describe('with simple options', function () {

		beforeEach(function () {

			options = [
				{ value: 'one', label: 'One' },
				{ value: 'two', label: 'Two' },
				{ value: 'three', label: 'Three' }
			];
			
			onChange = sinon.spy();

			// Render an instance of the component
			instance = TestUtils.renderIntoDocument(
				<Select
					name="form-field-name"
					value="one"
					options={options}
					onChange={onChange}
					searchable={true}
					/>
			);
			
			// Focus on the input, such that mouse events are accepted
			searchInputNode = instance.getInputNode().getDOMNode().querySelector('input');
			TestUtils.Simulate.focus(searchInputNode);

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
		
		it('should clear the selection on escape', function () {
			
			var selectControl = getSelectControl(instance);
			TestUtils.Simulate.mouseDown(selectControl);
			TestUtils.Simulate.keyDown(selectControl, { keyCode: 27, key: 'Escape' });
			expect(React.findDOMNode(instance).querySelectorAll('.Select-option'),
				'to have length', 0);
			
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
				expect(domNode.querySelectorAll('.Select-option.is-focused'), 'to have length', 0);
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

	describe('with options and value', function () {
		
		var wrapper;

		beforeEach(function () {

			options = [
				{ value: 'one', label: 'One' },
				{ value: 'two', label: 'Two' },
				{ value: 'three', label: 'Three' }
			];

			onChange = sinon.spy();

			// Render an instance of the component
			wrapper = TestUtils.renderIntoDocument(
				<PropsWrapper
					childComponent={Select}
					name="form-field-name"
					value="one"
					options={options}
					onChange={onChange}
					searchable={true}
				/>
			);

			// Focus on the input, such that mouse events are accepted
			instance = wrapper.getChild();
			searchInputNode = instance.getInputNode().getDOMNode().querySelector('input');
			TestUtils.Simulate.focus(searchInputNode);
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
	
	describe('with allowCreate=true', function () {

		var wrapper;

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

			onChange = sinon.spy();

			// Render an instance of the component
			wrapper = TestUtils.renderIntoDocument(
				<PropsWrapper
					childComponent={Select}
					name="form-field-name"
					value="one"
					options={options}
					onChange={onChange}
					allowCreate={true}
					searchable={true}
					addLabelText="Add {label} to values?"
					/>
			);

			// Focus on the input, such that mouse events are accepted
			instance = wrapper.getChild();
			searchInputNode = instance.getInputNode().getDOMNode().querySelector('input');
			TestUtils.Simulate.focus(searchInputNode);
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
			expect(React.findDOMNode(instance).querySelectorAll('.Select-menu .Select-option')[0],
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

			onChange = sinon.spy();
			asyncOptions = sinon.stub();

			asyncOptions.withArgs('te').callsArgWith(1, null, {
				options: [
					{value: 'test', label: 'TEST one'},
					{value: 'test2', label: 'TEST two'},
					{value: 'tell', label: 'TELL three'}
				]
			});

			asyncOptions.withArgs('tes').callsArgWith(1, null, {
				options: [
					{value: 'test', label: 'TEST one'},
					{value: 'test2', label: 'TEST two'}
				]
			});


		});

		describe('with autoload=true', function () {

			beforeEach(function () {

				// Render an instance of the component
				instance = TestUtils.renderIntoDocument(
					<Select
						name="form-field-name"
						value=""
						asyncOptions={asyncOptions}
						onChange={onChange}
						autoload={true}
						/>
				);

				// Focus on the input, such that mouse events are accepted
				searchInputNode = instance.getInputNode().getDOMNode().querySelector('input');
				TestUtils.Simulate.focus(searchInputNode);
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
						{value: 'test', label: 'TEST one'},
						{value: 'test2', label: 'TEST two'},
						{value: 'tell', label: 'TELL three'}
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


		});
		
		describe('with autoload=false', function () {
			
			beforeEach(function () {

				// Render an instance of the component
				instance = TestUtils.renderIntoDocument(
					<Select
						name="form-field-name"
						value=""
						asyncOptions={asyncOptions}
						onChange={onChange}
						autoload={false}
						/>
				);

				// Focus on the input, such that mouse events are accepted
				searchInputNode = instance.getInputNode().getDOMNode().querySelector('input');
				TestUtils.Simulate.focus(searchInputNode);
			});
			
			it('does not initially call asyncOptions', function () {
				
				expect(asyncOptions, 'was not called');
			});
			
			it('calls the asyncOptions on first key entry', function () {
				
				typeSearchText('a');
				expect(asyncOptions, 'was called with', 'a');
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

			onChange = sinon.spy();

			// Render an instance of the component
			instance = TestUtils.renderIntoDocument(
				<Select
					name="form-field-name"
					value=""
					options={options}
					onChange={onChange}
					searchable={true}
					allowCreate={true}
					multi={true}
					/>
			);

			// Focus on the input, such that mouse events are accepted
			searchInputNode = instance.getInputNode().getDOMNode().querySelector('input');
			TestUtils.Simulate.focus(searchInputNode);

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
		
		it('removes the last selected option with backspace', function () {
			
			typeSearchText('fo');
			pressEnterToAccept();
			typeSearchText('th');
			pressEnterToAccept();
			onChange.reset();  // Ignore previous onChange calls
			pressBackspace();
			expect(onChange, 'was called with', 'four', [{ label: 'Four', value: 'four' }]);
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

	});
	
	describe('with props', function () {
		
		var defaultOptions = [
			{ value: 'one', label: 'One' },
			{ value: 'two', label: '222' },
			{ value: 'three', label: 'Three' },
			{ value: 'four', label: 'AbcDef' }
		];
		
		var createControl = function(props) {


			onChange = sinon.spy();
			// Render an instance of the component
			instance = TestUtils.renderIntoDocument(
				<Select
					onChange={onChange}
					{...props}
					/>
			);

			// Focus on the input, such that mouse events are accepted
			var searchInstance = React.findDOMNode(instance.getInputNode());
			searchInputNode = null;
			if (searchInstance) {
				searchInputNode = searchInstance.querySelector('input');
				if (searchInputNode) {
					TestUtils.Simulate.focus(searchInputNode);
				}
			}
			return instance;
			
		};
		
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
				
				expect(React.findDOMNode(instance).querySelectorAll('.Select-clear'), 'to have length', 0);
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
						
						expect(React.findDOMNode(instance).querySelectorAll('.Select-menu'), 'to have length', 0);
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
				expect(React.findDOMNode(instance).querySelectorAll('.Select-option'), 'to have length', 0);
			});

			it('does not respond to mouseDown', function () {

				TestUtils.Simulate.mouseDown(getSelectControl(instance));
				expect(React.findDOMNode(instance).querySelectorAll('.Select-option'), 'to have length', 0);
			});

			it('does not respond to mouseDown on the arrow', function () {

				TestUtils.Simulate.mouseDown(getSelectControl(instance).querySelector('.Select-arrow'));
				expect(React.findDOMNode(instance).querySelectorAll('.Select-option'), 'to have length', 0);
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
				var options = React.findDOMNode(instance).querySelectorAll('.Select-option');
				expect(options, 'to have length', 0);
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
					
					expect(React.findDOMNode(instance).querySelectorAll('.extra-class-name'), 'to have length', 0);
					expect(React.findDOMNode(instance).querySelectorAll('#search-input-id'), 'to have length', 0);
				});
			});
		});
	});
});
