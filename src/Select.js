/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/
import AutosizeInput from 'react-input-autosize';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { createPortal, findDOMNode } from 'react-dom';

import defaultArrowRenderer from './utils/defaultArrowRenderer';
import defaultClearRenderer from './utils/defaultClearRenderer';
import defaultFilterOptions from './utils/defaultFilterOptions';
import defaultMenuRenderer from './utils/defaultMenuRenderer';

import Option from './Option';
import Value from './Value';

const stringifyValue = value =>
	typeof value === 'string'
		? value
		: (value !== null && JSON.stringify(value)) || '';

const stringOrNode = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.node,
]);
const stringOrNumber = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number
]);

let instanceId = 1;

const shouldShowValue = (state, props) => {
	const { inputValue, isPseudoFocused, isFocused } = state;
	const { onSelectResetsInput } = props;

	if (!inputValue) return true;

	if (!onSelectResetsInput){
		return !(!isFocused && isPseudoFocused || isFocused && !isPseudoFocused);
	}

	return false;
};

const shouldShowPlaceholder = (state, props, isOpen) => {
	const { inputValue, isPseudoFocused, isFocused } = state;
	const { onSelectResetsInput } = props;

	return !inputValue || !onSelectResetsInput && !isOpen && !isPseudoFocused && !isFocused;
};

/**
 * Retrieve a value from the given options and valueKey
 * @param {String|Number|Array} value	- the selected value(s)
 * @param {Object}		 props	- the Select component's props (or nextProps)
 */
const expandValue = (value, props) => {
	const valueType = typeof value;
	if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
	let { options, valueKey } = props;
	if (!options) return;
	for (let i = 0; i < options.length; i++) {
		if (String(options[i][valueKey]) === String(value)) return options[i];
	}
};

const handleRequired = (value, multi) => {
	if (!value) return true;
	return (multi ? value.length === 0 : Object.keys(value).length === 0);
};

class Select extends React.Component {
	constructor (props) {
		super(props);
		[
			'clearValue',
			'focusOption',
			'getOptionLabel',
			'handleInputBlur',
			'handleInputChange',
			'handleInputFocus',
			'handleInputValueChange',
			'handleKeyDown',
			'handleMenuScroll',
			'handleMouseDown',
			'handleMouseDownOnArrow',
			'handleMouseDownOnMenu',
			'handleTouchEnd',
			'handleTouchEndClearValue',
			'handleTouchMove',
			'handleTouchOutside',
			'handleTouchStart',
			'handleValueClick',
			'onOptionRef',
			'removeValue',
			'selectValue',
		].forEach((fn) => this[fn] = this[fn].bind(this));

		this.state = {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false,
			controlX: 0,
			controlY: 0,
			controlHeight: 0,
			controlWidth: 0,
			menuHeight: 0,
			menuWidth: 0,
			windowHeight: 0,
			windowWidth: 0
		};

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.updateMenuPortalPosition = this.updateMenuPortalPosition.bind(this);
	}

	componentWillMount () {
		this._instancePrefix = `react-select-${(this.props.instanceId || ++instanceId)}-`;
		const valueArray = this.getValueArray(this.props.value);

		if (this.props.required) {
			this.setState({
				required: handleRequired(valueArray[0], this.props.multi),
			});
		}
	}

	componentDidMount () {
		if (typeof this.props.autofocus !== 'undefined' && typeof console !== 'undefined') {
			console.warn('Warning: The autofocus prop has changed to autoFocus, support will be removed after react-select@1.0');
		}
		if (this.props.autoFocus || this.props.autofocus) {
			this.focus();
		}
	}

	componentWillReceiveProps (nextProps) {
		const valueArray = this.getValueArray(nextProps.value, nextProps);

		if (nextProps.required) {
			this.setState({
				required: handleRequired(valueArray[0], nextProps.multi),
			});
		} else if (this.props.required) {
			// Used to be required but it's not any more
			this.setState({ required: false });
		}

		if (this.state.inputValue && this.props.value !== nextProps.value && nextProps.onSelectResetsInput) {
			this.setState({ inputValue: this.handleInputValueChange('') });
		}
	}

	componentDidUpdate (prevProps, prevState) {
		// focus to the selected option
		if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
			const focusedOptionNode = findDOMNode(this.focused);
			let menuNode = findDOMNode(this.menu);

			const scrollTop = menuNode.scrollTop;
			const scrollBottom = scrollTop + menuNode.offsetHeight;
			const optionTop = focusedOptionNode.offsetTop;
			const optionBottom = optionTop + focusedOptionNode.offsetHeight;

			if (scrollTop > optionTop || scrollBottom < optionBottom) {
				menuNode.scrollTop = focusedOptionNode.offsetTop;
			}

			// We still set hasScrolledToOption to true even if we didn't
			// actually need to scroll, as we've still confirmed that the
			// option is in view.
			this.hasScrolledToOption = true;
		} else if (!this.state.isOpen) {
			this.hasScrolledToOption = false;
		}

		if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
			this._scrollToFocusedOptionOnUpdate = false;
			const focusedDOM = findDOMNode(this.focused);
			let menuDOM = findDOMNode(this.menu);
			const focusedRect = focusedDOM.getBoundingClientRect();
			const menuRect = menuDOM.getBoundingClientRect();
			if (focusedRect.bottom > menuRect.bottom) {
				menuDOM.scrollTop = (focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight);
			} else if (focusedRect.top < menuRect.top) {
				menuDOM.scrollTop = focusedDOM.offsetTop;
			}
		}
		if (this.props.scrollMenuIntoView && this.menuContainer) {
			const menuContainerRect = this.menuContainer.getBoundingClientRect();
			if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
				window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
			}
		}
		if (prevProps.disabled !== this.props.disabled) {
			this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
			this.closeMenu();
		}
		if (prevState.isOpen !== this.state.isOpen) {
			this.toggleClickOutsideEvent(this.state.isOpen);
			this.toggleTouchOutsideEvent(this.state.isOpen);

			if (this.props.menuPortalTarget) {
				this.togglePortalEvents(this.state.isOpen);
				if (this.state.isOpen) {
					const { width: menuWidth, height: menuHeight } = this.menuContainer.getBoundingClientRect();
					this.setState({ // eslint-disable-line react/no-did-update-set-state
						menuWidth,
						menuHeight
					});
				}
			}

			const handler = this.state.isOpen ? this.props.onOpen : this.props.onClose;
			handler && handler();
		}
	}

	componentWillUnmount () {
		this.toggleTouchOutsideEvent(false);
	}

	togglePortalEvents(isOpen) {
		if (isOpen) {
			this.updateMenuPortalPosition();
			window.addEventListener('resize', this.updateMenuPortalPosition);
			window.addEventListener('scroll', this.updateMenuPortalPosition);
			document.addEventListener('wheel', this.updateMenuPortalPosition);
		} else {
			window.removeEventListener('resize', this.updateMenuPortalPosition);
			window.removeEventListener('scroll', this.updateMenuPortalPosition);
			document.removeEventListener('wheel', this.updateMenuPortalPosition);
		}
	}

	updateMenuPortalPosition(e) {
		const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
		const { left: controlX, top: controlY, width: controlWidth, height: controlHeight } = this.control.getBoundingClientRect();

		this.setState({
			controlX,
			controlY,
			controlWidth,
			controlHeight,
			windowWidth,
			windowHeight
		});
	}

	handleClickOutside (event) {
		if (event.which !== 1 && this.wrapper && !this.wrapper.contains(event.target)) {
			this.closeMenu();
		}
	}

	toggleClickOutsideEvent (enabled) {
		if (enabled) {
			document.addEventListener('mousedown', this.handleClickOutside);
		} else {
			document.removeEventListener('mousedown', this.handleClickOutside);
		}
	}

	toggleTouchOutsideEvent (enabled) {
		if (enabled) {
			if (!document.addEventListener && document.attachEvent) {
				document.attachEvent('ontouchstart', this.handleTouchOutside);
			} else {
				document.addEventListener('touchstart', this.handleTouchOutside);
			}
		} else {
			if (!document.removeEventListener && document.detachEvent) {
				document.detachEvent('ontouchstart', this.handleTouchOutside);
			} else {
				document.removeEventListener('touchstart', this.handleTouchOutside);
			}
		}
	}

	handleTouchOutside (event) {
		// handle touch outside on ios to dismiss menu
		if (this.wrapper && !this.wrapper.contains(event.target)) {
			this.closeMenu();
		}
	}

	focus () {
		if (!this.input) return;
		this.input.focus();
	}

	blurInput () {
		if (!this.input) return;
		this.input.blur();
	}

	handleTouchMove () {
		// Set a flag that the view is being dragged
		this.dragging = true;
	}

	handleTouchStart () {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	}

	handleTouchEnd (event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Fire the mouse events
		this.handleMouseDown(event);
	}

	handleTouchEndClearValue (event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Clear the value
		this.clearValue(event);
	}

	handleMouseDown (event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}

		if (event.target.tagName === 'INPUT') {
			if (!this.state.isFocused) {
				this._openAfterFocus = this.props.openOnClick;
				this.focus();
			} else if (!this.state.isOpen) {
				this.setState({
					isOpen: true,
					isPseudoFocused: false,
				});
			}

			return;
		}

		// prevent default event handlers
		event.preventDefault();

		// for the non-searchable select, toggle the menu
		if (!this.props.searchable) {
			// This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
			this.focus();
			return this.setState({
				isOpen: !this.state.isOpen,
			});
		}

		if (this.state.isFocused) {
			// On iOS, we can get into a state where we think the input is focused but it isn't really,
			// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
			// Call focus() again here to be safe.
			this.focus();

			let input = this.input;
			let toOpen = true;

			if (typeof input.getInput === 'function') {
				// Get the actual DOM input if the ref is an <AutosizeInput /> component
				input = input.getInput();
			}

			// clears the value so that the cursor will be at the end of input when the component re-renders
			input.value = '';

			if (this._focusAfterClear) {
				toOpen = false;
				this._focusAfterClear = false;
			}

			// if the input is focused, ensure the menu is open
			this.setState({
				isOpen: toOpen,
				isPseudoFocused: false,
				focusedOption: null,
			});
		} else {
			// otherwise, focus the input and open the menu
			this._openAfterFocus = this.props.openOnClick;
			this.focus();
			this.setState({ focusedOption: null });
		}
	}

	handleMouseDownOnArrow (event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}

		if (this.state.isOpen) {
			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();
			// close the menu
			this.closeMenu();
		} else {
			// If the menu isn't open, let the event bubble to the main handleMouseDown
			this.setState({
				isOpen: true,
			});
		}
	}

	handleMouseDownOnMenu (event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}

		event.stopPropagation();
		event.preventDefault();

		this._openAfterFocus = true;
		this.focus();
	}

	closeMenu () {
		if(this.props.onCloseResetsInput) {
			this.setState({
				inputValue: this.handleInputValueChange(''),
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi,
			});
		} else {
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi
			});
		}
		this.hasScrolledToOption = false;
	}

	handleInputFocus (event) {
		if (this.props.disabled) return;

		let toOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
		toOpen = this._focusAfterClear ? false : toOpen;  //if focus happens after clear values, don't open dropdown yet.

		if (this.props.onFocus) {
			this.props.onFocus(event);
		}

		this.setState({
			isFocused: true,
			isOpen: !!toOpen,
		});

		this._focusAfterClear = false;
		this._openAfterFocus = false;
	}

	handleInputBlur (event) {
		// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
		if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
			this.focus();
			return;
		}

		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
		let onBlurredState = {
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
		};
		if (this.props.onBlurResetsInput) {
			onBlurredState.inputValue = this.handleInputValueChange('');
		}
		this.setState(onBlurredState);
	}

	handleInputChange (event) {
		let newInputValue = event.target.value;

		if (this.state.inputValue !== event.target.value) {
			newInputValue = this.handleInputValueChange(newInputValue);
		}

		this.setState({
			inputValue: newInputValue,
			isOpen: true,
			isPseudoFocused: false,
		});
	}

	setInputValue(newValue) {
		if (this.props.onInputChange) {
			let nextState = this.props.onInputChange(newValue);
			if (nextState != null && typeof nextState !== 'object') {
				newValue = '' + nextState;
			}
		}
		this.setState({
			inputValue: newValue
		});
	}

	handleInputValueChange(newValue) {
		if (this.props.onInputChange) {
			let nextState = this.props.onInputChange(newValue);
			// Note: != used deliberately here to catch undefined and null
			if (nextState != null && typeof nextState !== 'object') {
				newValue = '' + nextState;
			}
		}
		return newValue;
	}

	handleKeyDown (event) {
		if (this.props.disabled) return;

		if (typeof this.props.onInputKeyDown === 'function') {
			this.props.onInputKeyDown(event);
			if (event.defaultPrevented) {
				return;
			}
		}

		switch (event.keyCode) {
			case 8: // backspace
				if (!this.state.inputValue && this.props.backspaceRemoves) {
					event.preventDefault();
					this.popValue();
				}
				break;
			case 9: // tab
				if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
					break;
				}
				event.preventDefault();
				this.selectFocusedOption();
				break;
			case 13: // enter
				event.preventDefault();
				event.stopPropagation();
				if (this.state.isOpen) {
					this.selectFocusedOption();
				} else {
					this.focusNextOption();
				}
				break;
			case 27: // escape
				event.preventDefault();
				if (this.state.isOpen) {
					this.closeMenu();
					event.stopPropagation();
				} else if (this.props.clearable && this.props.escapeClearsValue) {
					this.clearValue(event);
					event.stopPropagation();
				}
				break;
			case 32: // space
				if (this.props.searchable) {
					break;
				}
				event.preventDefault();
				if (!this.state.isOpen) {
					this.focusNextOption();
					break;
				}
				event.stopPropagation();
				this.selectFocusedOption();
				break;
			case 38: // up
				event.preventDefault();
				this.focusPreviousOption();
				break;
			case 40: // down
				event.preventDefault();
				this.focusNextOption();
				break;
			case 33: // page up
				event.preventDefault();
				this.focusPageUpOption();
				break;
			case 34: // page down
				event.preventDefault();
				this.focusPageDownOption();
				break;
			case 35: // end key
				if (event.shiftKey) {
					break;
				}
				event.preventDefault();
				this.focusEndOption();
				break;
			case 36: // home key
				if (event.shiftKey) {
					break;
				}
				event.preventDefault();
				this.focusStartOption();
				break;
			case 46: // delete
				if (!this.state.inputValue && this.props.deleteRemoves) {
					event.preventDefault();
					this.popValue();
				}
				break;
		}
	}

	handleValueClick (option, event) {
		if (!this.props.onValueClick) return;
		this.props.onValueClick(option, event);
	}

	handleMenuScroll (event) {
		if (!this.props.onMenuScrollToBottom) return;
		let { target } = event;
		if (target.scrollHeight > target.offsetHeight && (target.scrollHeight - target.offsetHeight - target.scrollTop) <= 0) {
			this.props.onMenuScrollToBottom();
		}
	}

	getOptionLabel (op) {
		return op[this.props.labelKey];
	}

	/**
	 * Turns a value into an array from the given options
	 * @param {String|Number|Array} value		- the value of the select input
	 * @param {Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
	 * @returns	{Array}	the value of the select represented in an array
	 */
	getValueArray (value, nextProps = undefined) {
		/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
		const props = typeof nextProps === 'object' ? nextProps : this.props;
		if (props.multi) {
			if (typeof value === 'string') {
				value = value.split(props.delimiter);
			}
			if (!Array.isArray(value)) {
				if (value === null || value === undefined) return [];
				value = [value];
			}
			return value.map(value => expandValue(value, props)).filter(i => i);
		}
		const expandedValue = expandValue(value, props);
		return expandedValue ? [expandedValue] : [];
	}

	setValue (value) {
		if (this.props.autoBlur) {
			this.blurInput();
		}
		if (this.props.required) {
			const required = handleRequired(value, this.props.multi);
			this.setState({ required });
		}
		if (this.props.simpleValue && value) {
			value = this.props.multi ? value.map(i => i[this.props.valueKey]).join(this.props.delimiter) : value[this.props.valueKey];
		}
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	}

	selectValue (value) {
		// NOTE: we actually add/set the value in a callback to make sure the
		// input value is empty to avoid styling issues in Chrome
		if (this.props.closeOnSelect) {
			this.hasScrolledToOption = false;
		}
		const updatedValue = this.props.onSelectResetsInput ? '' : this.state.inputValue;
		if (this.props.multi) {
			this.setState({
				focusedIndex: null,
				inputValue: this.handleInputValueChange(updatedValue),
				isOpen: !this.props.closeOnSelect,
			}, () => {
				const valueArray = this.getValueArray(this.props.value);
				if (valueArray.some(i => i[this.props.valueKey] === value[this.props.valueKey])) {
					this.removeValue(value);
				} else {
					this.addValue(value);
				}
			});
		} else {
			this.setState({
				inputValue: this.handleInputValueChange(updatedValue),
				isOpen: !this.props.closeOnSelect,
				isPseudoFocused: this.state.isFocused,
			}, () => {
				this.setValue(value);
			});
		}
	}

	addValue (value) {
		let valueArray = this.getValueArray(this.props.value);
		const visibleOptions = this._visibleOptions.filter(val => !val.disabled);
		const lastValueIndex = visibleOptions.indexOf(value);
		this.setValue(valueArray.concat(value));
		if (visibleOptions.length - 1 === lastValueIndex) {
			// the last option was selected; focus the second-last one
			this.focusOption(visibleOptions[lastValueIndex - 1]);
		} else if (visibleOptions.length > lastValueIndex) {
			// focus the option below the selected one
			this.focusOption(visibleOptions[lastValueIndex + 1]);
		}
	}

	popValue () {
		let valueArray = this.getValueArray(this.props.value);
		if (!valueArray.length) return;
		if (valueArray[valueArray.length-1].clearableValue === false) return;
		this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null);
	}

	removeValue (value) {
		let valueArray = this.getValueArray(this.props.value);
		this.setValue(valueArray.filter(i => i[this.props.valueKey] !== value[this.props.valueKey]));
		this.focus();
	}

	clearValue (event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event && event.type === 'mousedown' && event.button !== 0) {
			return;
		}

		event.preventDefault();

		this.setValue(this.getResetValue());
		this.setState({
			inputValue: this.handleInputValueChange(''),
			isOpen: false,
		}, this.focus);

		this._focusAfterClear = true;
	}

	getResetValue () {
		if (this.props.resetValue !== undefined) {
			return this.props.resetValue;
		} else if (this.props.multi) {
			return [];
		} else {
			return null;
		}
	}

	focusOption (option) {
		this.setState({
			focusedOption: option
		});
	}

	focusNextOption () {
		this.focusAdjacentOption('next');
	}

	focusPreviousOption () {
		this.focusAdjacentOption('previous');
	}

	focusPageUpOption () {
		this.focusAdjacentOption('page_up');
	}

	focusPageDownOption () {
		this.focusAdjacentOption('page_down');
	}

	focusStartOption () {
		this.focusAdjacentOption('start');
	}

	focusEndOption () {
		this.focusAdjacentOption('end');
	}

	focusAdjacentOption (dir) {
		const options = this._visibleOptions
			.map((option, index) => ({ option, index }))
			.filter(option => !option.option.disabled);
		this._scrollToFocusedOptionOnUpdate = true;
		if (!this.state.isOpen) {
			const newState = {
				focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null),
				isOpen: true,
			};
			if (this.props.onSelectResetsInput) {
				newState.inputValue = '';
			}
			this.setState(newState);
			return;
		}
		if (!options.length) return;
		let focusedIndex = -1;
		for (let i = 0; i < options.length; i++) {
			if (this._focusedOption === options[i].option) {
				focusedIndex = i;
				break;
			}
		}
		if (dir === 'next' && focusedIndex !== -1 ) {
			focusedIndex = (focusedIndex + 1) % options.length;
		} else if (dir === 'previous') {
			if (focusedIndex > 0) {
				focusedIndex = focusedIndex - 1;
			} else {
				focusedIndex = options.length - 1;
			}
		} else if (dir === 'start') {
			focusedIndex = 0;
		} else if (dir === 'end') {
			focusedIndex = options.length - 1;
		} else if (dir === 'page_up') {
			const potentialIndex = focusedIndex - this.props.pageSize;
			if (potentialIndex < 0) {
				focusedIndex = 0;
			} else {
				focusedIndex = potentialIndex;
			}
		} else if (dir === 'page_down') {
			const potentialIndex = focusedIndex + this.props.pageSize;
			if (potentialIndex > options.length - 1) {
				focusedIndex = options.length - 1;
			} else {
				focusedIndex = potentialIndex;
			}
		}

		if (focusedIndex === -1) {
			focusedIndex = 0;
		}

		this.setState({
			focusedIndex: options[focusedIndex].index,
			focusedOption: options[focusedIndex].option
		});
	}

	getFocusedOption () {
		return this._focusedOption;
	}

	selectFocusedOption () {
		if (this._focusedOption) {
			return this.selectValue(this._focusedOption);
		}
	}

	renderLoading () {
		if (!this.props.isLoading) return;
		return (
			<span className="Select-loading-zone" aria-hidden="true">
				<span className="Select-loading" />
			</span>
		);
	}

	renderValue (valueArray, isOpen) {
		let renderLabel = this.props.valueRenderer || this.getOptionLabel;
		let ValueComponent = this.props.valueComponent;
		if (!valueArray.length) {
			const showPlaceholder = shouldShowPlaceholder(this.state, this.props, isOpen);
			return showPlaceholder ? <div className="Select-placeholder">{this.props.placeholder}</div> : null;
		}
		let onClick = this.props.onValueClick ? this.handleValueClick : null;
		if (this.props.multi) {
			return valueArray.map((value, i) => {
				return (
					<ValueComponent
						disabled={this.props.disabled || value.clearableValue === false}
						id={`${this._instancePrefix}-value-${i}`}
						instancePrefix={this._instancePrefix}
						key={`value-${i}-${value[this.props.valueKey]}`}
						onClick={onClick}
						onRemove={this.removeValue}
						placeholder={this.props.placeholder}
						value={value}
					>
						{renderLabel(value, i)}
						<span className="Select-aria-only">&nbsp;</span>
					</ValueComponent>
				);
			});
		} else if (shouldShowValue(this.state, this.props)) {
			if (isOpen) onClick = null;
			return (
				<ValueComponent
					disabled={this.props.disabled}
					id={`${this._instancePrefix}-value-item`}
					instancePrefix={this._instancePrefix}
					onClick={onClick}
					placeholder={this.props.placeholder}
					value={valueArray[0]}
				>
					{renderLabel(valueArray[0])}
				</ValueComponent>
			);
		}
	}

	renderInput (valueArray, focusedOptionIndex) {
		const className = classNames('Select-input', this.props.inputProps.className);
		const isOpen = this.state.isOpen;

		const ariaOwns = classNames({
			[`${this._instancePrefix}-list`]: isOpen,
			[`${this._instancePrefix}-backspace-remove-message`]: this.props.multi
				&& !this.props.disabled
				&& this.state.isFocused
				&& !this.state.inputValue
		});

		let value = this.state.inputValue;
		if (value && !this.props.onSelectResetsInput && !this.state.isFocused){
			// it hides input value when it is not focused and was not reset on select
			value= '';
		}

		const inputProps = {
			...this.props.inputProps,
			'aria-activedescendant': isOpen ? `${this._instancePrefix}-option-${focusedOptionIndex}` : `${this._instancePrefix}-value`,
			'aria-describedby': this.props['aria-describedby'],
			'aria-expanded': '' + isOpen,
			'aria-haspopup': '' + isOpen,
			'aria-label': this.props['aria-label'],
			'aria-labelledby': this.props['aria-labelledby'],
			'aria-owns': ariaOwns,
			className: className,
			onBlur: this.handleInputBlur,
			onChange: this.handleInputChange,
			onFocus: this.handleInputFocus,
			ref: ref => this.input = ref,
			role: 'combobox',
			required: this.state.required,
			tabIndex: this.props.tabIndex,
			value,
		};

		if (this.props.inputRenderer) {
			return this.props.inputRenderer(inputProps);
		}

		if (this.props.disabled || !this.props.searchable) {
			const { ...divProps } = this.props.inputProps;

			const ariaOwns = classNames({
				[`${this._instancePrefix}-list`]: isOpen,
			});
			return (

				<div
					{...divProps}
					aria-expanded={isOpen}
					aria-owns={ariaOwns}
					aria-activedescendant={isOpen ? `${this._instancePrefix}-option-${focusedOptionIndex}` : `${this._instancePrefix}-value`}
					aria-disabled={'' + this.props.disabled}
					aria-label={this.props['aria-label']}
					aria-labelledby={this.props['aria-labelledby']}
					className={className}
					onBlur={this.handleInputBlur}
					onFocus={this.handleInputFocus}
					ref={ref => this.input = ref}
					role="combobox"
					style={{ border: 0, width: 1, display:'inline-block' }}
					tabIndex={this.props.tabIndex || 0}
				/>
			);
		}

		if (this.props.autosize) {
			return (
				<AutosizeInput id={this.props.id} {...inputProps} minWidth="5" />
			);
		}
		return (
			<div className={ className } key="input-wrap" style={{ display: 'inline-block' }}>
				<input id={this.props.id} {...inputProps} />
			</div>
		);
	}

	renderClear () {
		const valueArray = this.getValueArray(this.props.value);
		if (!this.props.clearable
			|| !valueArray.length
			|| this.props.disabled
			|| this.props.isLoading) return;
		const ariaLabel = this.props.multi ? this.props.clearAllText : this.props.clearValueText;
		const clear = this.props.clearRenderer();

		return (
			<span
				aria-label={ariaLabel}
				className="Select-clear-zone"
				onMouseDown={this.clearValue}
				onTouchEnd={this.handleTouchEndClearValue}
				onTouchMove={this.handleTouchMove}
				onTouchStart={this.handleTouchStart}
				title={ariaLabel}
			>
				{clear}
			</span>
		);
	}

	renderArrow () {
		if (!this.props.arrowRenderer) return;

		const onMouseDown = this.handleMouseDownOnArrow;
		const isOpen = this.state.isOpen;
		const arrow = this.props.arrowRenderer({ onMouseDown, isOpen });

		if (!arrow) {
			return null;
		}

		return (
			<span
				className="Select-arrow-zone"
				onMouseDown={onMouseDown}
			>
				{arrow}
			</span>
		);
	}

	filterOptions (excludeOptions) {
		const filterValue = this.state.inputValue;
		const options = this.props.options || [];
		if (this.props.filterOptions) {
			// Maintain backwards compatibility with boolean attribute
			const filterOptions = typeof this.props.filterOptions === 'function'
				? this.props.filterOptions
				: defaultFilterOptions;

			return filterOptions(
				options,
				filterValue,
				excludeOptions,
				{
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					trimFilter: this.props.trimFilter,
					valueKey: this.props.valueKey,
				}
			);
		} else {
			return options;
		}
	}

	onOptionRef(ref, isFocused) {
		if (isFocused) {
			this.focused = ref;
		}
	}

	renderMenu (options, valueArray, focusedOption) {
		if (options && options.length) {
			return this.props.menuRenderer({
				focusedOption,
				focusOption: this.focusOption,
				inputValue: this.state.inputValue,
				instancePrefix: this._instancePrefix,
				labelKey: this.props.labelKey,
				onFocus: this.focusOption,
				onOptionRef: this.onOptionRef,
				onSelect: this.selectValue,
				optionClassName: this.props.optionClassName,
				optionComponent: this.props.optionComponent,
				optionRenderer: this.props.optionRenderer || this.getOptionLabel,
				options,
				removeValue: this.removeValue,
				selectValue: this.selectValue,
				valueArray,
				valueKey: this.props.valueKey,
			});
		} else if (this.props.noResultsText) {
			return (
				<div className="Select-noresults">
					{this.props.noResultsText}
				</div>
			);
		} else {
			return null;
		}
	}

	renderHiddenField (valueArray) {
		if (!this.props.name) return;
		if (this.props.joinValues) {
			let value = valueArray.map(i => stringifyValue(i[this.props.valueKey])).join(this.props.delimiter);
			return (
				<input
					disabled={this.props.disabled}
					name={this.props.name}
					ref={ref => this.value = ref}
					type="hidden"
					value={value}
				/>
			);
		}
		return valueArray.map((item, index) => (
			<input
				disabled={this.props.disabled}
				key={`hidden.${index}`}
				name={this.props.name}
				ref={`value${index}`}
				type="hidden"
				value={stringifyValue(item[this.props.valueKey])}
			/>
		));
	}

	getFocusableOptionIndex (selectedOption) {
		const options = this._visibleOptions;
		if (!options.length) return null;

		const valueKey = this.props.valueKey;
		let focusedOption = this.state.focusedOption || selectedOption;
		if (focusedOption && !focusedOption.disabled) {
			let focusedOptionIndex = -1;
			options.some((option, index) => {
				const isOptionEqual = option[valueKey] === focusedOption[valueKey];
				if (isOptionEqual) {
					focusedOptionIndex = index;
				}
				return isOptionEqual;
			});
			if (focusedOptionIndex !== -1) {
				return focusedOptionIndex;
			}
		}

		for (let i = 0; i < options.length; i++) {
			if (!options[i].disabled) return i;
		}
		return null;
	}

	renderOuter (options, valueArray, focusedOption) {
		let menu = this.renderMenu(options, valueArray, focusedOption);
		if (!menu) {
			return null;
		}

		const menuContainer = (
			<div ref={ref => this.menuContainer = ref} className="Select-menu-outer" style={this.props.menuContainerStyle}>
				<div
					className="Select-menu"
					id={`${this._instancePrefix}-list`}
					onMouseDown={this.handleMouseDownOnMenu}
					onScroll={this.handleMenuScroll}
					ref={ref => this.menu = ref}
					role="listbox"
					style={this.props.menuStyle}
					tabIndex={-1}
				>
					{menu}
				</div>
			</div>
		);

		if (this.props.menuPortalTarget) {
			const { controlX, controlY, controlWidth, controlHeight, windowHeight, menuHeight } = this.state;
			const portalCSS = {
				position: 'absolute',
				left: controlX,
				width: controlWidth,
				top: controlY + controlHeight + menuHeight > windowHeight && controlY - menuHeight > 0 ? 1 + controlY - menuHeight : controlY + controlHeight - 1,
				height: 0
			};
			return createPortal(
				<div ref={ref => this.menuContainerPortal = ref} style={portalCSS} className="Select-menu-portal">{menuContainer}</div>,
				this.props.menuPortalTarget
			);
		}

		return menuContainer;
	}

	render () {
		let valueArray = this.getValueArray(this.props.value);
		let options = this._visibleOptions = this.filterOptions(this.props.multi && this.props.removeSelected ? valueArray : null);
		let isOpen = this.state.isOpen;
		if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
		const focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

		let focusedOption = null;
		if (focusedOptionIndex !== null) {
			focusedOption = this._focusedOption = options[focusedOptionIndex];
		} else {
			focusedOption = this._focusedOption = null;
		}
		let className = classNames('Select', this.props.className, {
			'has-value': valueArray.length,
			'is-clearable': this.props.clearable,
			'is-disabled': this.props.disabled,
			'is-focused': this.state.isFocused,
			'is-loading': this.props.isLoading,
			'is-open': isOpen,
			'is-pseudo-focused': this.state.isPseudoFocused,
			'is-searchable': this.props.searchable,
			'Select--multi': this.props.multi,
			'Select--rtl': this.props.rtl,
			'Select--single': !this.props.multi,
		});

		let removeMessage = null;
		if (this.props.multi &&
			!this.props.disabled &&
			valueArray.length &&
			!this.state.inputValue &&
			this.state.isFocused &&
			this.props.backspaceRemoves) {
			removeMessage = (
				<span id={`${this._instancePrefix}-backspace-remove-message`} className="Select-aria-only" aria-live="assertive">
					{this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])}
				</span>
			);
		}

		return (
			<div ref={ref => this.wrapper = ref}
				 className={className}
				 style={this.props.wrapperStyle}>
				{this.renderHiddenField(valueArray)}
				<div ref={ref => this.control = ref}
					className="Select-control"
					onKeyDown={this.handleKeyDown}
					onMouseDown={this.handleMouseDown}
					onTouchEnd={this.handleTouchEnd}
					onTouchMove={this.handleTouchMove}
					onTouchStart={this.handleTouchStart}
					style={this.props.style}
				>
					<span className="Select-multi-value-wrapper" id={`${this._instancePrefix}-value`}>
						{this.renderValue(valueArray, isOpen)}
						{this.renderInput(valueArray, focusedOptionIndex)}
					</span>
					{removeMessage}
					{this.renderLoading()}
					{this.renderClear()}
					{this.renderArrow()}
				</div>
				{isOpen ? this.renderOuter(options, valueArray, focusedOption) : null}
			</div>
		);
	}
}

Select.propTypes = {
	'aria-describedby': PropTypes.string, // html id(s) of element(s) that should be used to describe this input (for assistive tech)
	'aria-label': PropTypes.string,       // aria label (for assistive tech)
	'aria-labelledby': PropTypes.string,  // html id of an element that should be used as the label (for assistive tech)
	arrowRenderer: PropTypes.func,        // create the drop-down caret element
	autoBlur: PropTypes.bool,             // automatically blur the component when an option is selected
	autoFocus: PropTypes.bool,            // autofocus the component on mount
	autofocus: PropTypes.bool,            // deprecated; use autoFocus instead
	autosize: PropTypes.bool,             // whether to enable autosizing or not
	backspaceRemoves: PropTypes.bool,     // whether backspace removes an item if there is no text input
	backspaceToRemoveMessage: PropTypes.string,  // message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
	className: PropTypes.string,          // className for the outer element
	clearAllText: stringOrNode,           // title for the "clear" control when multi: true
	clearRenderer: PropTypes.func,        // create clearable x element
	clearValueText: stringOrNode,         // title for the "clear" control
	clearable: PropTypes.bool,            // should it be possible to reset value
	closeOnSelect: PropTypes.bool,        // whether to close the menu when a value is selected
	deleteRemoves: PropTypes.bool,        // whether delete removes an item if there is no text input
	delimiter: PropTypes.string,          // delimiter to use to join multiple values for the hidden field value
	disabled: PropTypes.bool,             // whether the Select is disabled or not
	escapeClearsValue: PropTypes.bool,    // whether escape clears the value when the menu is closed
	filterOption: PropTypes.func,         // method to filter a single option (option, filterString)
	filterOptions: PropTypes.any,         // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
	id: PropTypes.string, 				        // html id to set on the input element for accessibility or tests
	ignoreAccents: PropTypes.bool,        // whether to strip diacritics when filtering
	ignoreCase: PropTypes.bool,           // whether to perform case-insensitive filtering
	inputProps: PropTypes.object,         // custom attributes for the Input
	inputRenderer: PropTypes.func,        // returns a custom input component
	instanceId: PropTypes.string,         // set the components instanceId
	isLoading: PropTypes.bool,            // whether the Select is loading externally or not (such as options being loaded)
	joinValues: PropTypes.bool,           // joins multiple values into a single form field with the delimiter (legacy mode)
	labelKey: PropTypes.string,           // path of the label value in option objects
	matchPos: PropTypes.string,           // (any|start) match the start or entire string when filtering
	matchProp: PropTypes.string,          // (any|label|value) which option property to filter on
	menuBuffer: PropTypes.number,         // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
	menuContainerStyle: PropTypes.object, // optional style to apply to the menu container
	menuPortalTarget: PropTypes.instanceOf(Element),// element to use for portal 
	menuRenderer: PropTypes.func,         // renders a custom menu with options
	menuStyle: PropTypes.object,          // optional style to apply to the menu
	multi: PropTypes.bool,                // multi-value input
	name: PropTypes.string,               // generates a hidden <input /> tag with this field name for html forms
	noResultsText: stringOrNode,          // placeholder displayed when there are no matching search results
	onBlur: PropTypes.func,               // onBlur handler: function (event) {}
	onBlurResetsInput: PropTypes.bool,    // whether input is cleared on blur
	onChange: PropTypes.func,             // onChange handler: function (newValue) {}
	onClose: PropTypes.func,              // fires when the menu is closed
	onCloseResetsInput: PropTypes.bool,   // whether input is cleared when menu is closed through the arrow
	onFocus: PropTypes.func,              // onFocus handler: function (event) {}
	onInputChange: PropTypes.func,        // onInputChange handler: function (inputValue) {}
	onInputKeyDown: PropTypes.func,       // input keyDown handler: function (event) {}
	onMenuScrollToBottom: PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
	onOpen: PropTypes.func,               // fires when the menu is opened
	onSelectResetsInput: PropTypes.bool,  // whether input is cleared on select (works only for multiselect)
	onValueClick: PropTypes.func,         // onClick handler for value labels: function (value, event) {}
	openOnClick: PropTypes.bool,          // boolean to control opening the menu when the control is clicked
	openOnFocus: PropTypes.bool,          // always open options menu on focus
	optionClassName: PropTypes.string,    // additional class(es) to apply to the <Option /> elements
	optionComponent: PropTypes.func,      // option component to render in dropdown
	optionRenderer: PropTypes.func,       // optionRenderer: function (option) {}
	options: PropTypes.array,             // array of options
	pageSize: PropTypes.number,           // number of entries to page when using page up/down keys
	placeholder: stringOrNode,            // field placeholder, displayed when there's no value
	removeSelected: PropTypes.bool,       // whether the selected option is removed from the dropdown on multi selects
	required: PropTypes.bool,             // applies HTML5 required attribute when needed
	resetValue: PropTypes.any,            // value to use when you clear the control
	rtl: PropTypes.bool, 									// set to true in order to use react-select in right-to-left direction
	scrollMenuIntoView: PropTypes.bool,   // boolean to enable the viewport to shift so that the full menu fully visible when engaged
	searchable: PropTypes.bool,           // whether to enable searching feature or not
	simpleValue: PropTypes.bool,          // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
	style: PropTypes.object,              // optional style to apply to the control
	tabIndex: stringOrNumber,             // optional tab index of the control
	tabSelectsValue: PropTypes.bool,      // whether to treat tabbing out while focused to be value selection
	trimFilter: PropTypes.bool,           // whether to trim whitespace around filter value
	value: PropTypes.any,                 // initial field value
	valueComponent: PropTypes.func,       // value component to render
	valueKey: PropTypes.string,           // path of the label value in option objects
	valueRenderer: PropTypes.func,        // valueRenderer: function (option) {}
	wrapperStyle: PropTypes.object,       // optional style to apply to the component wrapper
};

Select.defaultProps = {
	arrowRenderer: defaultArrowRenderer,
	autosize: true,
	backspaceRemoves: true,
	backspaceToRemoveMessage: 'Press backspace to remove {label}',
	clearable: true,
	clearAllText: 'Clear all',
	clearRenderer: defaultClearRenderer,
	clearValueText: 'Clear value',
	closeOnSelect: true,
	deleteRemoves: true,
	delimiter: ',',
	disabled: false,
	escapeClearsValue: true,
	filterOptions: defaultFilterOptions,
	ignoreAccents: true,
	ignoreCase: true,
	inputProps: {},
	isLoading: false,
	joinValues: false,
	labelKey: 'label',
	matchPos: 'any',
	matchProp: 'any',
	menuBuffer: 0,
	menuRenderer: defaultMenuRenderer,
	multi: false,
	noResultsText: 'No results found',
	onBlurResetsInput: true,
	onCloseResetsInput: true,
	onSelectResetsInput: true,
	openOnClick: true,
	optionComponent: Option,
	pageSize: 5,
	placeholder: 'Select...',
	menuPortalTarget: null,
	removeSelected: true,
	required: false,
	rtl: false,
	scrollMenuIntoView: true,
	searchable: true,
	simpleValue: false,
	tabSelectsValue: true,
	trimFilter: true,
	valueComponent: Value,
	valueKey: 'value',
};

export default Select;
