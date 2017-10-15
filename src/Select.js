/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
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

let instanceId = 1;

class Select extends React.Component {
	constructor(props) {
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

	componentWillMount() {
		const { value, multi, required, instanceId } = this.props;

		this._instancePrefix = 'react-select-' + (instanceId || ++instanceId) + '-';
		const valueArray = this.getValueArray(value);

		if (required) {
			this.setState({
				required: this.handleRequired(valueArray[0], multi),
			});
		}
	}

	componentDidMount() {
		const { autofocus } = this.props;

		if (typeof autofocus !== 'undefined' && typeof console !== 'undefined') {
			console.warn('Warning: The autofocus prop will be deprecated in react-select1.0.0 in favor of autoFocus to match React\'s autoFocus prop');
		}
		if (autoFocus || autofocus) {
			this.focus();
		}
	}

	componentWillReceiveProps(nextProps) {
		const { value, multi, required } = nextProps;

		const valueArray = this.getValueArray(value, nextProps);

		if (required) {
			this.setState({
				required: this.handleRequired(valueArray[0], multi),
			});
		} else if (this.props.required) {
			// Used to be required but it's not any more
			this.setState({ required: false });
		}
	}

	componentWillUpdate(nextProps, nextState) {
		const { isOpen } = nextState;
		const { onOpen, onClose } = nextProps;

		if (isOpen !== this.state.isOpen) {
			this.toggleTouchOutsideEvent(isOpen);
			const handler = isOpen ? onOpen : onClose;
			handler && handler();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { isOpen } = this.state;
		const { disabled, menuBuffer, scrollMenuIntoView } = this.props;

		// focus to the selected option
		if (this.menu && this.focused && isOpen && !this.hasScrolledToOption) {
			let focusedOptionNode = ReactDOM.findDOMNode(this.focused);
			let menuNode = ReactDOM.findDOMNode(this.menu);
			menuNode.scrollTop = focusedOptionNode.offsetTop;
			this.hasScrolledToOption = true;
		} else if (!isOpen) {
			this.hasScrolledToOption = false;
		}

		if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
			this._scrollToFocusedOptionOnUpdate = false;
			var focusedDOM = ReactDOM.findDOMNode(this.focused);
			var menuDOM = ReactDOM.findDOMNode(this.menu);
			var focusedRect = focusedDOM.getBoundingClientRect();
			var menuRect = menuDOM.getBoundingClientRect();
			if (focusedRect.bottom > menuRect.bottom) {
				menuDOM.scrollTop = (focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight);
			} else if (focusedRect.top < menuRect.top) {
				menuDOM.scrollTop = focusedDOM.offsetTop;
			}
		}
		if (scrollMenuIntoView && this.menuContainer) {
			var menuContainerRect = this.menuContainer.getBoundingClientRect();
			if (window.innerHeight < menuContainerRect.bottom + menuBuffer) {
				window.scrollBy(0, menuContainerRect.bottom + menuBuffer - window.innerHeight);
			}
		}
		if (prevProps.disabled !== disabled) {
			this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
			this.closeMenu();
		}
	}

	componentWillUnmount() {
		if (!document.removeEventListener && document.detachEvent) {
			document.detachEvent('ontouchstart', this.handleTouchOutside);
		} else {
			document.removeEventListener('touchstart', this.handleTouchOutside);
		}
	}

	toggleTouchOutsideEvent(enabled) {
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

	handleTouchOutside(event) {
		// handle touch outside on ios to dismiss menu
		if (this.wrapper && !this.wrapper.contains(event.target)) {
			this.closeMenu();
		}
	}

	focus() {
		if (!this.input) return;
		this.input.focus();
	}

	blurInput() {
		if (!this.input) return;
		this.input.blur();
	}

	handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	}

	handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	}

	handleTouchEnd(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Fire the mouse events
		this.handleMouseDown(event);
	}

	handleTouchEndClearValue(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Clear the value
		this.clearValue(event);
	}

	handleMouseDown(event) {
		const { isOpen, isFocused } = this.state;
		const { disabled, searchable, openOnClick } = this.props;

		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}

		if (event.target.tagName === 'INPUT') {
			return;
		}

		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();

		// for the non-searchable select, toggle the menu
		if (!searchable) {
			// TODO: This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
			this.focus();
			return this.setState({
				isOpen: !isOpen,
			});
		}

		if (isFocused) {
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
			this._openAfterFocus = openOnClick;
			this.focus();
		}
	}

	handleMouseDownOnArrow(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}
		// If the menu isn't open, let the event bubble to the main handleMouseDown
		if (!this.state.isOpen) {
			return;
		}
		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();
		// close the menu
		this.closeMenu();
	}

	handleMouseDownOnMenu(event) {
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

	closeMenu() {
		const { isFocused } = this.state;
		const { multi, onCloseResetsInput } = this.props;

		if (onCloseResetsInput) {
			this.setState({
				isOpen: false,
				isPseudoFocused: isFocused && !multi,
				inputValue: this.handleInputValueChange('')
			});
		} else {
			this.setState({
				isOpen: false,
				isPseudoFocused: isFocused && !multi
			});
		}
		this.hasScrolledToOption = false;
	}

	handleInputFocus(event) {
		const { onFocus, disabled, openOnFocus } = this.props;

		if (disabled) return;
		var isOpen = this.state.isOpen || this._openAfterFocus || openOnFocus;
		if (onFocus) {
			onFocus(event);
		}
		this.setState({
			isFocused: true,
			isOpen: isOpen,
		});
		this._openAfterFocus = false;
	}

	handleInputBlur(event) {
		const { onBlur, onBlurResetsInput } = this.props;

		// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
		if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
			this.focus();
			return;
		}

		if (onBlur) {
			onBlur(event);
		}
		var onBlurredState = {
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
		};
		if (onBlurResetsInput) {
			onBlurredState.inputValue = this.handleInputValueChange('');
		}
		this.setState(onBlurredState);
	}

	handleInputChange(event) {
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
		const { onInputChange } = this.props;

		if (onInputChange) {
			let nextState = onInputChange(newValue);
			// Note: != used deliberately here to catch undefined and null
			if (nextState != null && typeof nextState !== 'object') {
				newValue = '' + nextState;
			}
		}
		return newValue;
	}

	handleKeyDown(event) {
		const {
			disabled,
			onInputKeyDown,
			backspaceRemoves,
			tabSelectsValue,
			clearable,
			escapeClearsValue,
			deleteRemoves
		} = this.props;

		const { inputValue, isOpen } = this.state;

		if (disabled) return;

		if (typeof onInputKeyDown === 'function') {
			onInputKeyDown(event);
			if (event.defaultPrevented) {
				return;
			}
		}

		switch (event.keyCode) {
			case 8: // backspace
				if (!inputValue && backspaceRemoves) {
					event.preventDefault();
					this.popValue();
				}
				return;
			case 9: // tab
				if (event.shiftKey || !isOpen || !tabSelectsValue) {
					return;
				}
				this.selectFocusedOption();
				return;
			case 13: // enter
				if (!isOpen) return;
				event.stopPropagation();
				this.selectFocusedOption();
				break;
			case 27: // escape
				if (isOpen) {
					this.closeMenu();
					event.stopPropagation();
				} else if (clearable && escapeClearsValue) {
					this.clearValue(event);
					event.stopPropagation();
				}
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
			case 46: // backspace
				if (!inputValue && deleteRemoves) {
					event.preventDefault();
					this.popValue();
				}
				return;
			default: return;
		}
		event.preventDefault();
	}

	handleValueClick(option, event) {
		const { onValueClick } = this.props;

		if (!onValueClick) return;
		onValueClick(option, event);
	}

	handleMenuScroll(event) {
		const { onMenuScrollToBottom } = this.props;

		if (!onMenuScrollToBottom) return;
		let { target } = event;
		if (target.scrollHeight > target.offsetHeight && (target.scrollHeight - target.offsetHeight - target.scrollTop) <= 0) {
			onMenuScrollToBottom();
		}
	}

	handleRequired(value, multi) {
		if (!value) return true;
		return (multi ? value.length === 0 : Object.keys(value).length === 0);
	}

	getOptionLabel(op) {
		return op[this.props.labelKey];
	}

	/**
	 * Turns a value into an array from the given options
	 * @param	{String|Number|Array}	value		- the value of the select input
	 * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
	 * @returns	{Array}	the value of the select represented in an array
	 */
	getValueArray(value, nextProps) {
		/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
		const props = typeof nextProps === 'object' ? nextProps : this.props;
		if (props.multi) {
			if (typeof value === 'string') value = value.split(props.delimiter);
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
	expandValue(value, props) {
		const valueType = typeof value;
		if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
		let { options, valueKey } = props;
		if (!options) return;
		for (var i = 0; i < options.length; i++) {
			if (options[i][valueKey] === value) return options[i];
		}
	}

	setValue(value) {
		const {
			autoBlur,
			required,
			multi,
			onChange,
			valueKey,
			simpleValue,
			delimiter,
			onChange
		} = this.props;

		if (autoBlur) {
			this.blurInput();
		}
		if (required) {
			const required = this.handleRequired(value, multi);
			this.setState({ required });
		}
		if (onChange) {
			if (simpleValue && value) {
				value = multi ? value.map(i => i[valueKey]).join(delimiter) : value[valueKey];
			}
			onChange(value);
		}
	}

	selectValue(value) {
		const {
			closeOnSelect,
			multi,
			onSelectResetsInput
		 } = this.props;

		const { inputValue, isFocused } = this.state;

		// NOTE: we actually add/set the value in a callback to make sure the
		// input value is empty to avoid styling issues in Chrome
		if (closeOnSelect) {
			this.hasScrolledToOption = false;
		}
		if (multi) {
			const updatedValue = onSelectResetsInput ? '' : inputValue;
			this.setState({
				focusedIndex: null,
				inputValue: this.handleInputValueChange(updatedValue),
				isOpen: !closeOnSelect,
			}, () => {
				this.addValue(value);
			});
		} else {
			this.setState({
				inputValue: this.handleInputValueChange(''),
				isOpen: !closeOnSelect,
				isPseudoFocused: isFocused,
			}, () => {
				this.setValue(value);
			});
		}
	}

	addValue(value) {
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

	popValue() {
		var valueArray = this.getValueArray(this.props.value);
		if (!valueArray.length) return;
		if (valueArray[valueArray.length - 1].clearableValue === false) return;
		this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null);
	}

	removeValue(value) {
		var valueArray = this.getValueArray(this.props.value);
		this.setValue(valueArray.filter(i => i !== value));
		this.focus();
	}

	clearValue(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event && event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
		this.setValue(this.getResetValue());
		this.setState({
			isOpen: false,
			inputValue: this.handleInputValueChange(''),
		}, this.focus);
	}

	getResetValue() {
		const { resetValue, multi } = this.props;

		if (resetValue !== undefined) {
			return resetValue;
		} else if (multi) {
			return [];
		} else {
			return null;
		}
	}

	focusOption(option) {
		this.setState({
			focusedOption: option
		});
	}

	focusNextOption() {
		this.focusAdjacentOption('next');
	}

	focusPreviousOption() {
		this.focusAdjacentOption('previous');
	}

	focusPageUpOption() {
		this.focusAdjacentOption('page_up');
	}

	focusPageDownOption() {
		this.focusAdjacentOption('page_down');
	}

	focusStartOption() {
		this.focusAdjacentOption('start');
	}

	focusEndOption() {
		this.focusAdjacentOption('end');
	}

	focusAdjacentOption(dir) {
		const { pageSize } = this.props;

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
		if (dir === 'next' && focusedIndex !== -1) {
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
			var potentialIndex = focusedIndex - pageSize;
			if (potentialIndex < 0) {
				focusedIndex = 0;
			} else {
				focusedIndex = potentialIndex;
			}
		} else if (dir === 'page_down') {
			var potentialIndex = focusedIndex + pageSize;
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

	getFocusedOption() {
		return this._focusedOption;
	}

	getInputValue() {
		return this.state.inputValue;
	}

	selectFocusedOption() {
		if (this._focusedOption) {
			return this.selectValue(this._focusedOption);
		}
	}

	renderLoading() {
		if (!this.props.isLoading) return;
		return (
			<span className="Select-loading-zone" aria-hidden="true">
				<span className="Select-loading" />
			</span>
		);
	}

	renderValue(valueArray, isOpen) {
		const {
			valueRenderer,
			valueComponent,
			placeholder,
			onValueClick,
			multi,
			valueKey,
			disabled
		 } = this.props;

		const { inputValue } = this.state;

		let renderLabel = valueRenderer || this.getOptionLabel;
		let ValueComponent = valueComponent;
		if (!valueArray.length) {
			return !inputValue ? <div className="Select-placeholder">{placeholder}</div> : null;
		}
		let onClick = onValueClick ? this.handleValueClick : null;
		if (multi) {
			return valueArray.map((value, i) => {
				return (
					<ValueComponent
						id={this._instancePrefix + '-value-' + i}
						instancePrefix={this._instancePrefix}
						disabled={disabled || value.clearableValue === false}
						key={`value-${i}-${value[valueKey]}`}
						onClick={onClick}
						onRemove={this.removeValue}
						value={value}
					>
						{renderLabel(value, i)}
						<span className="Select-aria-only">&nbsp;</span>
					</ValueComponent>
				);
			});
		} else if (!inputValue) {
			if (isOpen) onClick = null;
			return (
				<ValueComponent
					id={this._instancePrefix + '-value-item'}
					disabled={disabled}
					instancePrefix={this._instancePrefix}
					onClick={onClick}
					value={valueArray[0]}
				>
					{renderLabel(valueArray[0])}
				</ValueComponent>
			);
		}
	}

	renderInput(valueArray, focusedOptionIndex) {
		const {
			inputProps,
			multi,
			disabled,
			tabIndex,
			inputRenderer,
			autosize,
			searchable
		} = this.props;

		const {
			isOpen,
			isFocused,
			inputValue,
			required
		} = this.state;

		var className = classNames('Select-input', inputProps.className);
		const isOpen = !!isOpen;

		const ariaOwns = classNames({
			[this._instancePrefix + '-list']: isOpen,
			[this._instancePrefix + '-backspace-remove-message']: multi
			&& !disabled
			&& isFocused
			&& !inputValue
		});

		const inputProps = {
			...inputProps,
			role: 'combobox',
			'aria-expanded': '' + isOpen,
			'aria-owns': ariaOwns,
			'aria-haspopup': '' + isOpen,
			'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
			'aria-describedby': this.props['aria-describedby'],
			'aria-labelledby': this.props['aria-labelledby'],
			'aria-label': this.props['aria-label'],
			className: className,
			tabIndex: tabIndex,
			onBlur: this.handleInputBlur,
			onChange: this.handleInputChange,
			onFocus: this.handleInputFocus,
			ref: ref => this.input = ref,
			required: required,
			value: inputValue,
		};

		if (inputRenderer) {
			return inputRenderer(inputProps);
		}

		if (disabled || !searchable) {
			const { inputClassName, ...divProps } = inputProps;

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
					className={className}
					tabIndex={tabIndex || 0}
					onBlur={this.handleInputBlur}
					onFocus={this.handleInputFocus}
					ref={ref => this.input = ref}
					aria-readonly={'' + !!disabled}
					style={{ border: 0, width: 1, display: 'inline-block' }} />
			);
		}

		if (autosize) {
			return (
				<AutosizeInput {...inputProps} minWidth="5" />
			);
		}
		return (
			<div className={className} key="input-wrap">
				<input {...inputProps} />
			</div>
		);
	}

	renderClear() {
		const {
			clearable,
			value,
			multi,
			disabled,
			isLoading,
			clearRenderer,
			clearAllText,
			clearValueText
		} = this.props;

		if (!clearable || value === undefined || value === null || multi && !value.length || disabled || isLoading) return;
		const clear = clearRenderer();

		return (
			<span className="Select-clear-zone" title={multi ? clearAllText : clearValueText}
				aria-label={multi ? clearAllText : clearValueText}
				onMouseDown={this.clearValue}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
				onTouchEnd={this.handleTouchEndClearValue}
			>
				{clear}
			</span>
		);
	}

	renderArrow() {
		const onMouseDown = this.handleMouseDownOnArrow;
		const isOpen = this.state.isOpen;
		const arrow = this.props.arrowRenderer({ onMouseDown, isOpen });

		return (
			<span
				className="Select-arrow-zone"
				onMouseDown={onMouseDown}
			>
				{arrow}
			</span>
		);
	}

	filterOptions(excludeOptions) {
		const {
			options,
			filterOptions,
			filterOption,
			ignoreAccents,
			ignoreCase,
			labelKey,
			matchPos,
			matchProp,
			valueKey
		} = this.props;

		var filterValue = this.state.inputValue;
		var options = options || [];
		if (filterOptions) {
			// Maintain backwards compatibility with boolean attribute
			const filterOptions = typeof filterOptions === 'function'
				? filterOptions
				: defaultFilterOptions;

			return filterOptions(
				options,
				filterValue,
				excludeOptions,
				{
					filterOption,
					ignoreAccents,
					ignoreCase,
					labelKey,
					matchPos,
					matchProp,
					valueKey,
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

	renderMenu(options, valueArray, focusedOption) {
		const {
			menuRenderer,
			labelKey,
			optionClassName,
			optionComponent,
			optionRenderer,
			valueKey,
			noResultsText
		} = this.props;

		if (options && options.length) {
			return menuRenderer({
				focusedOption,
				focusOption: this.focusOption,
				instancePrefix: this._instancePrefix,
				labelKey: labelKey,
				onFocus: this.focusOption,
				onSelect: this.selectValue,
				optionClassName: optionClassName,
				optionComponent: optionComponent,
				optionRenderer: optionRenderer || this.getOptionLabel,
				options,
				selectValue: this.selectValue,
				valueArray,
				valueKey: valueKey,
				onOptionRef: this.onOptionRef,
			});
		} else if (noResultsText) {
			return (
				<div className="Select-noresults">
					{noResultsText}
				</div>
			);
		} else {
			return null;
		}
	}

	renderHiddenField(valueArray) {
		const {
			name,
			joinValues,
			delimiter,
			valueKey,
			disabled
		} = this.props;

		if (!name) return;
		if (joinValues) {
			let value = valueArray.map(i => stringifyValue(i[valueKey])).join(delimiter);
			return (
				<input
					type="hidden"
					ref={ref => this.value = ref}
					name={name}
					value={value}
					disabled={disabled} />
			);
		}
		return valueArray.map((item, index) => (
			<input key={'hidden.' + index}
				type="hidden"
				ref={'value' + index}
				name={name}
				value={stringifyValue(item[valueKey])}
				disabled={disabled} />
		));
	}

	getFocusableOptionIndex(selectedOption) {
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

	renderOuter(options, valueArray, focusedOption) {
		const { menuContainerStyle, menuStyle } = this.props;

		let menu = this.renderMenu(options, valueArray, focusedOption);
		if (!menu) {
			return null;
		}

		return (
			<div ref={ref => this.menuContainer = ref} className="Select-menu-outer" style={menuContainerStyle}>
				<div ref={ref => this.menu = ref} role="listbox" tabIndex={-1} className="Select-menu" id={this._instancePrefix + '-list'}
					style={menuStyle}
					onScroll={this.handleMenuScroll}
					onMouseDown={this.handleMouseDownOnMenu}>
					{menu}
				</div>
			</div>
		);
	}

	render() {
		const {
			value,
			multi,
			clearable,
			disabled,
			isLoading,
			searchable,
			backspaceRemoves,
			backspaceToRemoveMessage,
			labelKey,
			style,
			wrapperStyle,
			className
		 } = this.props;

		const { 
			inputValue,
			isOpen,
			isFocused,
			isPseudoFocused
		} = this.state;

		let valueArray = this.getValueArray(value);
		let options = this._visibleOptions = this.filterOptions(multi ? this.getValueArray(value) : null);
		let isOpen = isOpen;
		if (multi && !options.length && valueArray.length && !inputValue) isOpen = false;
		const focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

		let focusedOption = null;
		if (focusedOptionIndex !== null) {
			focusedOption = this._focusedOption = options[focusedOptionIndex];
		} else {
			focusedOption = this._focusedOption = null;
		}
		let className = classNames('Select', className, {
			'Select--multi': multi,
			'Select--single': !multi,
			'is-clearable': clearable,
			'is-disabled': disabled,
			'is-focused': isFocused,
			'is-loading': isLoading,
			'is-open': isOpen,
			'is-pseudo-focused': isPseudoFocused,
			'is-searchable': searchable,
			'has-value': valueArray.length,
		});

		let removeMessage = null;
		if (multi &&
			!disabled &&
			valueArray.length &&
			!inputValue &&
			isFocused &&
			backspaceRemoves) {
			removeMessage = (
				<span id={this._instancePrefix + '-backspace-remove-message'} className="Select-aria-only" aria-live="assertive">
					{backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][labelKey])}
				</span>
			);
		}

		return (
			<div ref={ref => this.wrapper = ref}
				className={className}
				style={wrapperStyle}>
				{this.renderHiddenField(valueArray)}
				<div ref={ref => this.control = ref}
					className="Select-control"
					style={style}
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
				{isOpen ? this.renderOuter(options, !multi ? valueArray : null, focusedOption) : null}
			</div>
		);
	}
};

Select.propTypes = {
	'aria-describedby': PropTypes.string, // HTML ID(s) of element(s) that should be used to describe this input (for assistive tech)
	'aria-label': PropTypes.string,       // Aria label (for assistive tech)
	'aria-labelledby': PropTypes.string,  // HTML ID of an element that should be used as the label (for assistive tech)
	addLabelText: PropTypes.string,       // placeholder displayed when you want to add a label on a multi-value input
	arrowRenderer: PropTypes.func,        // Create drop-down caret element
	autoBlur: PropTypes.bool,             // automatically blur the component when an option is selected
	autofocus: PropTypes.bool,            // deprecated; use autoFocus instead
	autoFocus: PropTypes.bool,            // autofocus the component on mount
	autosize: PropTypes.bool,             // whether to enable autosizing or not
	backspaceRemoves: PropTypes.bool,     // whether backspace removes an item if there is no text input
	backspaceToRemoveMessage: PropTypes.string,  // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
	className: PropTypes.string,          // className for the outer element
	clearAllText: stringOrNode,           // title for the "clear" control when multi: true
	clearRenderer: PropTypes.func,        // create clearable x element
	clearValueText: stringOrNode,         // title for the "clear" control
	clearable: PropTypes.bool,            // should it be possible to reset value
	closeOnSelect: PropTypes.bool,        // whether to close the menu when a value is selected
	deleteRemoves: PropTypes.bool,        // whether backspace removes an item if there is no text input
	delimiter: PropTypes.string,          // delimiter to use to join multiple values for the hidden field value
	disabled: PropTypes.bool,             // whether the Select is disabled or not
	escapeClearsValue: PropTypes.bool,    // whether escape clears the value when the menu is closed
	filterOption: PropTypes.func,         // method to filter a single option (option, filterString)
	filterOptions: PropTypes.any,         // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
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
	required: PropTypes.bool,             // applies HTML5 required attribute when needed
	resetValue: PropTypes.any,            // value to use when you clear the control
	scrollMenuIntoView: PropTypes.bool,   // boolean to enable the viewport to shift so that the full menu fully visible when engaged
	searchable: PropTypes.bool,           // whether to enable searching feature or not
	simpleValue: PropTypes.bool,          // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
	style: PropTypes.object,              // optional style to apply to the control
	tabIndex: PropTypes.string,           // optional tab index of the control
	tabSelectsValue: PropTypes.bool,      // whether to treat tabbing out while focused to be value selection
	value: PropTypes.any,                 // initial field value
	valueComponent: PropTypes.func,       // value component to render
	valueKey: PropTypes.string,           // path of the label value in option objects
	valueRenderer: PropTypes.func,        // valueRenderer: function (option) {}
	wrapperStyle: PropTypes.object,       // optional style to apply to the component wrapper
};

Select.defaultProps = {
	addLabelText: 'Add "{label}"?',
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
	required: false,
	scrollMenuIntoView: true,
	searchable: true,
	simpleValue: false,
	tabSelectsValue: true,
	valueComponent: Value,
	valueKey: 'value',
};

export default Select;
