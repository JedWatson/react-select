/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/
import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import AutosizeInput from 'react-input-autosize';
import classNames from 'classnames';

import defaultArrowRenderer from './utils/defaultArrowRenderer';
import defaultFilterOptions from './utils/defaultFilterOptions';
import defaultMenuRenderer from './utils/defaultMenuRenderer';
import defaultClearRenderer from './utils/defaultClearRenderer';

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

class Select extends React.Component {
	constructor (props) {
		super(props);
		[
			'clearValue',
			'focusOption',
			'handleInputBlur',
			'handleInputChange',
			'handleInputFocus',
			'handleInputValueChange',
			'handleKeyDown',
			'handleMenuScroll',
			'handleMouseDown',
			'handleMouseDownOnArrow',
			'handleMouseDownOnMenu',
			'handleRequired',
			'handleTouchOutside',
			'handleTouchMove',
			'handleTouchStart',
			'handleTouchEnd',
			'handleTouchEndClearValue',
			'handleValueClick',
			'getOptionLabel',
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
		};
	}

	componentWillMount () {
		this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
		const valueArray = this.getValueArray(this.props.value);

		if (this.props.required) {
			this.setState({
				required: this.handleRequired(valueArray[0], this.props.multi),
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
				required: this.handleRequired(valueArray[0], nextProps.multi),
			});
		} else if (this.props.required) {
			// Used to be required but it's not any more
			this.setState({ required: false });
		}
	}

	componentDidUpdate (prevProps, prevState) {
		// focus to the selected option
		if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
			let focusedOptionNode = findDOMNode(this.focused);
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
			var focusedDOM = findDOMNode(this.focused);
			var menuDOM = findDOMNode(this.menu);
			var focusedRect = focusedDOM.getBoundingClientRect();
			var menuRect = menuDOM.getBoundingClientRect();
			if (focusedRect.bottom > menuRect.bottom) {
				menuDOM.scrollTop = (focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight);
			} else if (focusedRect.top < menuRect.top) {
				menuDOM.scrollTop = focusedDOM.offsetTop;
			}
		}
		if (this.props.scrollMenuIntoView && this.menuContainer) {
			var menuContainerRect = this.menuContainer.getBoundingClientRect();
			if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
				window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
			}
		}
		if (prevProps.disabled !== this.props.disabled) {
			this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
			this.closeMenu();
		}
		if (prevState.isOpen !== this.state.isOpen) {
			this.toggleTouchOutsideEvent(this.state.isOpen);
			const handler = this.state.isOpen ? this.props.onOpen : this.props.onClose;
			handler && handler();
		}

		// let the input have focus as current code does not close menu on clicking outside on the body
		// with focus user can perform all the actions and get more control over closing the menu
		if(this.state.isOpen){
			this.focus();
		}
	}

	componentWillUnmount () {
		this.toggleTouchOutsideEvent(false);
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

	handleTouchMove (event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	}

	handleTouchStart (event) {
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
			// TODO: This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
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
			if (typeof input.getInput === 'function') {
				// Get the actual DOM input if the ref is an <AutosizeInput /> component
				input = input.getInput();
			}

			// clears the value so that the cursor will be at the end of input when the component re-renders
			input.value = '';

			// if the input is focused, ensure the menu is open
			this.setState({
				isOpen: true,
				isPseudoFocused: false,
			});
		} else {
			// otherwise, focus the input and open the menu
			this._openAfterFocus = this.props.openOnClick;
			this.focus();
		}
	}

	handleMouseDownOnArrow (event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}
		// If the menu isn't open, let the event bubble to the main handleMouseDown
		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
			});
		}
		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();
		// close the menu
		if(this.state.isOpen){
			this.closeMenu();
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
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi,
				inputValue: this.handleInputValueChange('')
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
		var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
		this.setState({
			isFocused: true,
			isOpen: isOpen,
		});
		this._openAfterFocus = false;
	}

	handleInputBlur (event) {
		// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
		if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
			this.focus();
			return;
		}

		if (this.props.onBlur) {
			// allow onBlur to decide to close the menu or keep it open
			// this will allow tether users to take control of closing the menu on their conditions
			// this fix is useful when consumer is using tether and avoiding closing menu if you drag the scroll bar in IE
			const allowBlur = this.props.onBlur(event);

			// explicit check for false value to avoid break in code
			if(allowBlur === false){
				this.focus();
				return;
			}
		}
		var onBlurredState = {
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
			isOpen: true,
			isPseudoFocused: false,
			inputValue: newInputValue,
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
			return;
			case 9: // tab
				if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
					return;
				}
				event.preventDefault();
				this.selectFocusedOption();
			return;
			case 13: // enter
				event.preventDefault();
				event.stopPropagation();
				if (this.state.isOpen) {
					this.selectFocusedOption();
				} else {
					this.focusNextOption();
				}
				return;
			break;
			case 27: // escape
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
					return;
				}
				event.preventDefault();
				if (!this.state.isOpen) {
					this.focusNextOption();
					return;
				}
				event.stopPropagation();
				this.selectFocusedOption();
			break;
			case 38: // up
				this.focusPreviousOption();
			break;
			case 40: // down
				this.focusNextOption();
			break;
			case 33: // page up
				this.focusPageUpOption();
			break;
			case 34: // page down
				this.focusPageDownOption();
			break;
			case 35: // end key
				if (event.shiftKey) {
					return;
				}
				this.focusEndOption();
			break;
			case 36: // home key
				if (event.shiftKey) {
					return;
				}
				this.focusStartOption();
			break;
			case 46: // delete
				if (!this.state.inputValue && this.props.deleteRemoves) {
					event.preventDefault();
					this.popValue();
				}
			return;
			default: return;
		}
		event.preventDefault();
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

	handleRequired (value, multi) {
		if (!value) return true;
		return (multi ? value.length === 0 : Object.keys(value).length === 0);
	}

	getOptionLabel (op) {
		return op[this.props.labelKey];
	}

	/**
	 * Turns a value into an array from the given options
	 * @param	{String|Number|Array}	value		- the value of the select input
	 * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
	 * @returns	{Array}	the value of the select represented in an array
	 */
	getValueArray (value, nextProps) {
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
			return value.map(value => this.expandValue(value, props)).filter(i => i);
		}
		var expandedValue = this.expandValue(value, props);
		return expandedValue ? [expandedValue] : [];
	}

	/**
	 * Retrieve a value from the given options and valueKey
	 * @param	{String|Number|Array}	value	- the selected value(s)
	 * @param	{Object}		props	- the Select component's props (or nextProps)
	 */
	expandValue (value, props) {
		const valueType = typeof value;
		if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
		let { options, valueKey } = props;
		if (!options) return;
		for (var i = 0; i < options.length; i++) {
			if (String(options[i][valueKey]) === String(value)) return options[i];
		}
	}

	setValue (value) {
		if (this.props.autoBlur) {
			this.blurInput();
		}
		if (this.props.required) {
			const required = this.handleRequired(value, this.props.multi);
			this.setState({ required });
		}
		if (this.props.onChange) {
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(i => i[this.props.valueKey]).join(this.props.delimiter) : value[this.props.valueKey];
			}
			this.props.onChange(value);
		}
	}

	selectValue (value) {
		// NOTE: we actually add/set the value in a callback to make sure the
		// input value is empty to avoid styling issues in Chrome
		if (this.props.closeOnSelect) {
			this.hasScrolledToOption = false;
		}
		if (this.props.multi) {
			const updatedValue = this.props.onSelectResetsInput ? '' : this.state.inputValue;
			this.setState({
				focusedIndex: null,
				inputValue: this.handleInputValueChange(updatedValue),
				isOpen: !this.props.closeOnSelect,
			}, () => {
				var valueArray = this.getValueArray(this.props.value);
				if (valueArray.some(i => i[this.props.valueKey] === value[this.props.valueKey])) {
					this.removeValue(value);
				} else {
					this.addValue(value);
				}
			});
		} else {
			this.setState({
				inputValue: this.handleInputValueChange(''),
				isOpen: !this.props.closeOnSelect,
				isPseudoFocused: this.state.isFocused,
			}, () => {
				this.setValue(value);
			});
		}
	}

	addValue (value) {
		var valueArray = this.getValueArray(this.props.value);
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
		var valueArray = this.getValueArray(this.props.value);
		if (!valueArray.length) return;
		if (valueArray[valueArray.length-1].clearableValue === false) return;
		this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null);
	}

	removeValue (value) {
		var valueArray = this.getValueArray(this.props.value);
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
			isOpen: false,
			inputValue: this.handleInputValueChange(''),
		}, this.focus);
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
		var options = this._visibleOptions
			.map((option, index) => ({ option, index }))
			.filter(option => !option.option.disabled);
		this._scrollToFocusedOptionOnUpdate = true;
		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				inputValue: '',
				focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null)
			});
			return;
		}
		if (!options.length) return;
		var focusedIndex = -1;
		for (var i = 0; i < options.length; i++) {
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
			var potentialIndex = focusedIndex - this.props.pageSize;
			if (potentialIndex < 0) {
				focusedIndex = 0;
			} else {
				focusedIndex = potentialIndex;
			}
		} else if (dir === 'page_down') {
			var potentialIndex = focusedIndex + this.props.pageSize;
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
			return !this.state.inputValue ? <div className="Select-placeholder">{this.props.placeholder}</div> : null;
		}
		let onClick = this.props.onValueClick ? this.handleValueClick : null;
		if (this.props.multi) {
			return valueArray.map((value, i) => {
				return (
					<ValueComponent
						id={this._instancePrefix + '-value-' + i}
						instancePrefix={this._instancePrefix}
						disabled={this.props.disabled || value.clearableValue === false}
						key={`value-${i}-${value[this.props.valueKey]}`}
						onClick={onClick}
						onRemove={this.removeValue}
						value={value}
					>
						{renderLabel(value, i)}
						<span className="Select-aria-only">&nbsp;</span>
					</ValueComponent>
				);
			});
		} else if (!this.state.inputValue) {
			if (isOpen) onClick = null;
			return (
				<ValueComponent
					id={this._instancePrefix + '-value-item'}
					disabled={this.props.disabled}
					instancePrefix={this._instancePrefix}
					onClick={onClick}
					value={valueArray[0]}
				>
					{renderLabel(valueArray[0])}
				</ValueComponent>
			);
		}
	}

	renderInput (valueArray, focusedOptionIndex) {
		var className = classNames('Select-input', this.props.inputProps.className);
		const isOpen = !!this.state.isOpen;

		const ariaOwns = classNames({
			[this._instancePrefix + '-list']: isOpen,
			[this._instancePrefix + '-backspace-remove-message']: this.props.multi
				&& !this.props.disabled
				&& this.state.isFocused
				&& !this.state.inputValue
		});
		const inputProps = {
			...this.props.inputProps,
			role: 'combobox',
			'aria-expanded': '' + isOpen,
			'aria-owns': ariaOwns,
			'aria-haspopup': '' + isOpen,
			'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
			'aria-describedby': this.props['aria-describedby'],
			'aria-labelledby': this.props['aria-labelledby'],
			'aria-label': this.props['aria-label'],
			className: className,
			tabIndex: this.props.tabIndex,
			onBlur: this.handleInputBlur,
			onChange: this.handleInputChange,
			onFocus: this.handleInputFocus,
			ref: ref => this.input = ref,
			required: this.state.required,
			value: this.state.inputValue,
		};

		if (this.props.inputRenderer) {
			return this.props.inputRenderer(inputProps);
		}

		if (this.props.disabled || !this.props.searchable) {
			const { inputClassName, ...divProps } = this.props.inputProps;

			const ariaOwns = classNames({
				[this._instancePrefix + '-list']: isOpen,
			});
			return (

				<div
					{...divProps}
					role="combobox"
					aria-expanded={isOpen}
					aria-owns={ariaOwns}
					aria-activedescendant={isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value'}
					aria-labelledby={this.props['aria-labelledby']}
					aria-label={this.props['aria-label']}
					className={className}
					tabIndex={this.props.tabIndex || 0}
					onBlur={this.handleInputBlur}
					onFocus={this.handleInputFocus}
					ref={ref => this.input = ref}
					aria-disabled={'' + !!this.props.disabled}
					style={{ border: 0, width: 1, display:'inline-block' }}/>
			);
		}

		if (this.props.autosize) {
			return (
				<AutosizeInput id={this.props.id} {...inputProps} minWidth="5" />
			);
		}
		return (
			<div className={ className } key="input-wrap">
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
		const clear = this.props.clearRenderer();

		return (
			<span className="Select-clear-zone" title={this.props.multi ? this.props.clearAllText : this.props.clearValueText}
				aria-label={this.props.multi ? this.props.clearAllText : this.props.clearValueText}
				onMouseDown={this.clearValue}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
				onTouchEnd={this.handleTouchEndClearValue}
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
		var filterValue = this.state.inputValue;
		var options = this.props.options || [];
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
					valueKey: this.props.valueKey,
					trimFilter: this.props.trimFilter
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
				onSelect: this.selectValue,
				optionClassName: this.props.optionClassName,
				optionComponent: this.props.optionComponent,
				optionRenderer: this.props.optionRenderer || this.getOptionLabel,
				options,
				selectValue: this.selectValue,
				removeValue: this.removeValue,
				valueArray,
				valueKey: this.props.valueKey,
				onOptionRef: this.onOptionRef,
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
					type="hidden"
					ref={ref => this.value = ref}
					name={this.props.name}
					value={value}
					disabled={this.props.disabled} />
			);
		}
		return valueArray.map((item, index) => (
			<input key={'hidden.' + index}
				type="hidden"
				ref={'value' + index}
				name={this.props.name}
				value={stringifyValue(item[this.props.valueKey])}
				disabled={this.props.disabled} />
		));
	}

	getFocusableOptionIndex (selectedOption) {
		var options = this._visibleOptions;
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

		for (var i = 0; i < options.length; i++) {
			if (!options[i].disabled) return i;
		}
		return null;
	}

	renderOuter (options, valueArray, focusedOption) {
		let menu = this.renderMenu(options, valueArray, focusedOption);
		if (!menu) {
			return null;
		}

		return (
			<div ref={ref => this.menuContainer = ref} className="Select-menu-outer" style={this.props.menuContainerStyle}>
				<div ref={ref => this.menu = ref} role="listbox" tabIndex={-1} className="Select-menu" id={this._instancePrefix + '-list'}
						 style={this.props.menuStyle}
						 onScroll={this.handleMenuScroll}
						 onMouseDown={this.handleMouseDownOnMenu}>
					{menu}
				</div>
			</div>
		);
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
			'Select--multi': this.props.multi,
			'Select--single': !this.props.multi,
			'is-clearable': this.props.clearable,
			'is-disabled': this.props.disabled,
			'is-focused': this.state.isFocused,
			'is-loading': this.props.isLoading,
			'is-open': isOpen,
			'is-pseudo-focused': this.state.isPseudoFocused,
			'is-searchable': this.props.searchable,
			'has-value': valueArray.length,
			'Select--rtl': this.props.rtl,
		});

		let removeMessage = null;
		if (this.props.multi &&
			!this.props.disabled &&
			valueArray.length &&
			!this.state.inputValue &&
			this.state.isFocused &&
			this.props.backspaceRemoves) {
			removeMessage = (
				<span id={this._instancePrefix + '-backspace-remove-message'} className="Select-aria-only" aria-live="assertive">
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
					style={this.props.style}
					onKeyDown={this.handleKeyDown}
					onMouseDown={this.handleMouseDown}
					onTouchEnd={this.handleTouchEnd}
					onTouchStart={this.handleTouchStart}
					onTouchMove={this.handleTouchMove}
				>
					<span className="Select-multi-value-wrapper" id={this._instancePrefix + '-value'}>
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
};

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
	onSelectResetsInput: true,
	onCloseResetsInput: true,
	openOnClick: true,
	optionComponent: Option,
	pageSize: 5,
	placeholder: 'Select...',
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
