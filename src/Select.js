import React from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-input-autosize';
import classNames from 'classnames';

import stripDiacritics from './utils/stripDiacritics';

import Async from './Async';
import Option from './Option';
import Value from './Value';

function stringifyValue (value) {
	if (typeof value === 'object') {
		return JSON.stringify(value);
	} else {
		return value;
	}
}

function getValueState (state, props) {
	const { value, delimeter, multi } = props;

	if (value == null) {
		return { valueArray: [] };
	}

	const expandValue = createValueExpander(props);

	if (multi) {
		let values = null;
		if (typeof value === 'string') {
			values = value.split(delimeter);
		} else if (!Array.isArray(value)) {
			values = [value];
		}
		return { valueArray: values.map(expandValue).filter(i => i) }
	}

	const expandedValue = expandValue(value);
	return { valueArray: expandedValue ? [expandedValue] : [] };
};

const createValueExpander = props => value => {
	if (typeof value !== 'string' && typeof value !== 'number') return value;
	let { options, valueKey } = props;
	if (!options) return;
	for (var i = 0; i < options.length; i++) {
		if (options[i][valueKey] === value) return options[i];
	}
};

function getVisibleOptionsState (state, props) {
	return { visibleOptions: getVisibleOptions(state, props) };
}

function getVisibleOptions (state, props) {
	const { options, filterOptions } = props;
	let { valueArray, inputValue } = state;

	if (typeof filterOptions === 'function') {
		return filterOptions(options, inputValue, valueArray);
	}

	if (!filterOptions) {
		return options;
	}

	if (props.ignoreAccents) {
		inputValue = stripDiacritics(inputValue);
	}

	if (props.ignoreCase) {
		inputValue = inputValue.toLowerCase();
	}

	if (valueArray) {
		valueArray = valueArray.map(i => i[props.valueKey]);
	}

	return options.filter(option => {
		if (valueArray && valueArray.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(this, option, inputValue);
		if (!inputValue) return true;
		let valueTest = String(option[props.valueKey]);
		let labelTest = String(option[props.labelKey]);
		if (props.ignoreAccents) {
			if (props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
			if (props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
		}
		if (props.ignoreCase) {
			if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}
		return props.matchPos === 'start' ? (
			(props.matchProp !== 'label' && valueTest.substr(0, inputValue.length) === inputValue) ||
			(props.matchProp !== 'value' && labelTest.substr(0, inputValue.length) === inputValue)
		) : (
			(props.matchProp !== 'label' && valueTest.indexOf(inputValue) >= 0) ||
			(props.matchProp !== 'value' && labelTest.indexOf(inputValue) >= 0)
		);
	});
};

const Select = React.createClass({

	statics: { Async },

	displayName: 'Select',

	propTypes: {
		addLabelText: React.PropTypes.string,       // placeholder displayed when you want to add a label on a multi-value input
		allowCreate: React.PropTypes.bool,          // whether to allow creation of new entries
		autofocus: React.PropTypes.bool,            // autofocus the component on mount
		backspaceRemoves: React.PropTypes.bool,     // whether backspace removes an item if there is no text input
		className: React.PropTypes.string,          // className for the outer element
		clearAllText: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.node
		]),                                         // title for the "clear" control when multi: true
		clearValueText: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.node
		]),                                         // title for the "clear" control
		clearable: React.PropTypes.bool,            // should it be possible to reset value
		delimiter: React.PropTypes.string,          // delimiter to use to join multiple values for the hidden field value
		disabled: React.PropTypes.bool,             // whether the Select is disabled or not
		escapeClearsValue: React.PropTypes.bool,    // whether escape clears the value when the menu is closed
		filterOption: React.PropTypes.func,         // method to filter a single option (option, filterString)
		filterOptions: React.PropTypes.any,         // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
		ignoreAccents: React.PropTypes.bool,        // whether to strip diacritics when filtering
		ignoreCase: React.PropTypes.bool,           // whether to perform case-insensitive filtering
		inputProps: React.PropTypes.object,         // custom attributes for the Input
		isLoading: React.PropTypes.bool,            // whether the Select is loading externally or not (such as options being loaded)
		labelKey: React.PropTypes.string,           // path of the label value in option objects
		matchPos: React.PropTypes.string,           // (any|start) match the start or entire string when filtering
		matchProp: React.PropTypes.string,          // (any|label|value) which option property to filter on
		scrollMenuIntoView: React.PropTypes.bool,   // boolean to enable the viewport to shift so that the full menu fully visible when engaged
		menuBuffer: React.PropTypes.number,         // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
		menuStyle: React.PropTypes.object,          // optional style to apply to the menu
		menuContainerStyle: React.PropTypes.object, // optional style to apply to the menu container
		multi: React.PropTypes.bool,                // multi-value input
		name: React.PropTypes.string,               // generates a hidden <input /> tag with this field name for html forms
		newOptionCreator: React.PropTypes.func,     // factory to create new options when allowCreate set
		noResultsText: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.node
		]),                                         // placeholder displayed when there are no matching search results
		onBlur: React.PropTypes.func,               // onBlur handler: function (event) {}
		onBlurResetsInput: React.PropTypes.bool,    // whether input is cleared on blur
		onChange: React.PropTypes.func,             // onChange handler: function (newValue) {}
		onFocus: React.PropTypes.func,              // onFocus handler: function (event) {}
		onInputChange: React.PropTypes.func,        // onInputChange handler: function (inputValue) {}
		onValueClick: React.PropTypes.func,         // onClick handler for value labels: function (value, event) {}
		onMenuScrollToBottom: React.PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
		optionComponent: React.PropTypes.func,      // option component to render in dropdown
		optionRenderer: React.PropTypes.func,       // optionRenderer: function (option) {}
		options: React.PropTypes.array,             // array of options
		placeholder: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.node
		]),                                         // field placeholder, displayed when there's no value
		searchable: React.PropTypes.bool,           // whether to enable searching feature or not
		simpleValue: React.PropTypes.bool,          // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
		style: React.PropTypes.object,              // optional style to apply to the control
		tabIndex: React.PropTypes.string,           // optional tab index of the control
		value: React.PropTypes.any,                 // initial field value
		valueComponent: React.PropTypes.func,       // value component to render
		valueKey: React.PropTypes.string,           // path of the label value in option objects
		valueRenderer: React.PropTypes.func,        // valueRenderer: function (option) {}
		wrapperStyle: React.PropTypes.object,       // optional style to apply to the component wrapper
	},

	getDefaultProps () {
		return {
			addLabelText: 'Add "{label}"?',
			allowCreate: false,
			backspaceRemoves: true,
			clearAllText: 'Clear all',
			clearValueText: 'Clear value',
			clearable: true,
			delimiter: ',',
			disabled: false,
			escapeClearsValue: true,
			filterOptions: true,
			ignoreAccents: true,
			ignoreCase: true,
			inputProps: {},
			isLoading: false,
			labelKey: 'label',
			matchPos: 'any',
			matchProp: 'any',
			menuBuffer: 0,
			multi: false,
			noResultsText: 'No results found',
			onBlurResetsInput: true,
			optionComponent: Option,
			options: [],
			placeholder: 'Select...',
			scrollMenuIntoView: true,
			searchable: true,
			simpleValue: false,
			valueComponent: Value,
			valueKey: 'value',
		};
	},

	getInitialState () {
		const state = {
			inputValue: '',
			isFocused: false,
			isLoading: false,
			hasBeenOpened: false,
			isOpen: false,
			isScrolledToBottom: false,
			isPseudoFocused: false,
			...getValueState({}, this.props)
		}
		return { ...state, ...getVisibleOptionsState(state, this.props) };
	},

	componentDidMount () {
		if (this.props.autofocus) {
			this.focus();
		}
	},
	
	componentWillReceiveProps (nextProps) {

		// If value has changed, then update the stored `valueArray`.
		let { valueArray } = this.state;
		if (nextProps.value !== this.props.value) {
			this.setState(getValueState);
		}

		// If anything changes the way results are displayed, update them.
		if (
			nextProps.options       !== this.props.options       ||
			nextProps.filterOptions !== this.props.filterOptions ||
			nextProps.ignoreAccents !== this.props.ignoreAccents ||
			nextProps.ignoreCase    !== this.props.ignoreCase    ||
			nextProps.matchProps    !== this.props.matchProps    ||
			nextProps.multi         !== this.props.multi
		) {
			this.setState(getVisibleOptionsState);
		}
	},

	componentDidUpdate (prevProps, prevState) {
		if (this._scrollToFocusedOptionOnUpdate && this.refs.focused && this.refs.menu) {
			this._scrollToFocusedOptionOnUpdate = false;
			var focusedDOM = ReactDOM.findDOMNode(this.refs.focused);
			var menuDOM = ReactDOM.findDOMNode(this.refs.menu);
			var focusedRect = focusedDOM.getBoundingClientRect();
			var menuRect = menuDOM.getBoundingClientRect();
			if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
				menuDOM.scrollTop = (focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight);
			}
		}
		if (this.props.scrollMenuIntoView && this.refs.menuContainer) {
			var menuContainerRect = this.refs.menuContainer.getBoundingClientRect();
			if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
				window.scrollTo(0, window.scrollY + menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
			}
		}

		if (this.state.isOpen && !this.state.hasBeenOpened) {
			this.setState({ hasBeenOpened: true });
		}

		if (prevProps.disabled !== this.props.disabled) {
			this.setState({ isFocused: false });
		}

		// The number of options has changed. This may have caused the bottom of the
		// results list to be brought into view.
		if (prevState.visibleOptions !== this.state.visibleOptions) {
			this.checkScrolledToBottom();
		}
	},

	focus () {
		if (!this.refs.input) return;
		this.refs.input.focus();
	},

	handleMouseDown (event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}

		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();

		// for the non-searchable select, toggle the menu
		if (!this.props.searchable) {
			this.focus();
			return this.setState({
				isOpen: !this.state.isOpen,
			});
		}

		if (this.state.isFocused) {
			// if the input is focused, ensure the menu is open
			this.setState({
				isOpen: true,
				isPseudoFocused: false,
			});
		} else {
			// otherwise, focus the input and open the menu
			this._openAfterFocus = true;
			this.focus();
		}
	},

	handleMouseDownOnArrow (event) {
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
	},

	closeMenu () {
		this.setState({
			isOpen: false,
			isPseudoFocused: this.state.isFocused && !this.props.multi,
		});
		this.setInputValue('');
	},

	handleInputFocus (event) {
		var isOpen = this.state.isOpen || this._openAfterFocus;
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
		this.setState({
			isFocused: true,
			isOpen: isOpen
		});
		this._openAfterFocus = false;
	},

	handleInputBlur (event) {
 		if (this.refs.menu && document.activeElement.isEqualNode(this.refs.menu)) {
 			return;
 		}

		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
		var onBlurredState = {
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
		};
		if (this.props.onBlurResetsInput) {
			onBlurredState.inputValue = '';
		}
		this.setState(onBlurredState);
	},

	handleInputChange (event) {
		this.setState({
			isOpen: true,
			isPseudoFocused: false
		});
		this.setInputValue(event.target.value);
	},

	setInputValue (value) {
		if (this.state.value !== value) {
			this.props.onInputChange(this.state.inputValue);
			this.setState({ inputValue: value });
			this.setState(getVisibleOptionsState);
		}
	},

	handleKeyDown (event) {
		if (this.props.disabled) return;
		switch (event.keyCode) {
			case 8: // backspace
				if (!this.state.inputValue && this.props.backspaceRemoves) {
					event.preventDefault();
					this.popValue();
				}
			return;
			case 9: // tab
				if (event.shiftKey || !this.state.isOpen) {
					return;
				}
				this.selectFocusedOption();
			break;
			case 13: // enter
				if (!this.state.isOpen) return;
				this.selectFocusedOption();
			break;
			case 27: // escape
				if (this.state.isOpen) {
					this.closeMenu();
				} else if (this.props.clearable && this.props.escapeClearsValue) {
					this.clearValue(event);
				}
			break;
			case 38: // up
				this.focusPreviousOption();
			break;
			case 40: // down
				this.focusNextOption();
			break;
			// case 188: // ,
			// 	if (this.props.allowCreate && this.props.multi) {
			// 		event.preventDefault();
			// 		event.stopPropagation();
			// 		this.selectFocusedOption();
			// 	} else {
			// 		return;
			// 	}
			// break;
			default: return;
		}
		event.preventDefault();
	},

	handleValueClick (option, event) {
		if (!this.props.onValueClick) return;
		this.props.onValueClick(option, event);
	},

	handleMenuScroll (event) {
		this.checkScrolledToBottom();
	},

	checkScrolledToBottom () {
		if (!this.props.onMenuScrollToBottom) return;
		const { menu } = this.refs;
		const isScrolledToBottom = menu &&
			menu.scrollHeight - menu.offsetHeight - menu.scrollTop === 0;
		if (this.state.isScrolledToBottom !== isScrolledToBottom) {
			if (isScrolledToBottom) {
				this.props.onMenuScrollToBottom();
			}
			this.setState({ isScrolledToBottom });
		}
	},

	getOptionLabel (op) {
		return op[this.props.labelKey];
	},

	setValue (value) {
		if (!this.props.onChange) return;
		if (this.props.simpleValue && value) {
			value = this.props.multi
				? value.map(i => i[this.props.valueKey]).join(this.props.delimiter)
				: value[this.props.valueKey];
		}
		this.props.onChange(value);
	},

	selectValue (value) {
		if (this.props.multi) {
			this.addValue(value);
		} else {
			this.setValue(value);
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused,
			});
		}
		this.setInputValue('');
	},

	addValue (value) {
		const { valueArray } = this.state;
		this.setValue(valueArray.concat(value));
	},

	popValue () {
		const { valueArray } = this.state;
		if (!valueArray.length) return;
		if (valueArray[valueArray.length-1].clearableValue === false) return;
		this.setValue(valueArray.slice(0, valueArray.length - 1));
	},

	removeValue (value) {
		const { valueArray } = this.state;
		this.setValue(valueArray.filter(i => i !== value));
		this.focus();
	},

	clearValue (event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event && event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
		this.setValue(null);
		this.setInputValue('');
		this.setState({ isOpen: false, }, this.focus);
	},

	focusOption (option) {
		this.setState({
			focusedOption: option
		});
	},

	focusNextOption () {
		this.focusAdjacentOption('next');
	},

	focusPreviousOption () {
		this.focusAdjacentOption('previous');
	},

	focusAdjacentOption (dir) {
		const { isOpen, visibleOptions } = this.state;
		var options = visibleOptions.filter(i => !i.disabled);
		this._scrollToFocusedOptionOnUpdate = true;
		if (!isOpen) {
			this.setState({
				isOpen: true,
				focusedOption: this._focusedOption || options[dir === 'next' ? 0 : options.length - 1]
			});
			this.setInputValue('');
			return;
		}
		if (!options.length) return;
		var focusedIndex = -1;
		for (var i = 0; i < options.length; i++) {
			if (this._focusedOption === options[i]) {
				focusedIndex = i;
				break;
			}
		}
		var focusedOption = options[0];
		if (dir === 'next' && focusedIndex > -1 && focusedIndex < options.length - 1) {
			focusedOption = options[focusedIndex + 1];
		} else if (dir === 'previous') {
			if (focusedIndex > 0) {
				focusedOption = options[focusedIndex - 1];
			} else {
				focusedOption = options[options.length - 1];
			}
		}
		this.setState({
			focusedOption: focusedOption
		});
	},

	selectFocusedOption () {
		// if (this.props.allowCreate && !this.state.focusedOption) {
		// 	return this.selectValue(this.state.inputValue);
		// }
		if (this._focusedOption) {
			return this.selectValue(this._focusedOption);
		}
	},

	renderLoading () {
		if (!this.props.isLoading) return;
		return (
			<span className="Select-loading-zone" aria-hidden="true">
				<span className="Select-loading" />
			</span>
		);
	},

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
						disabled={this.props.disabled || value.clearableValue === false}
						key={`value-${i}-${value[this.props.valueKey]}`}
						onClick={onClick}
						onRemove={this.removeValue}
						value={value}
						>
						{renderLabel(value)}
					</ValueComponent>
				);
			});
		} else if (!this.state.inputValue) {
			if (isOpen) onClick = null;
			return (
				<ValueComponent
					disabled={this.props.disabled}
					onClick={onClick}
					value={valueArray[0]}
					>
					{renderLabel(valueArray[0])}
				</ValueComponent>
			);
		}
	},

	renderInput (valueArray) {
		var className = classNames('Select-input', this.props.inputProps.className);
		if (this.props.disabled || !this.props.searchable) {
			return (
				<div
					{...this.props.inputProps}
					className={className}
					tabIndex={this.props.tabIndex || 0}
					onBlur={this.handleInputBlur}
					onFocus={this.handleInputFocus}
					ref="input"
					style={{ border: 0, width: 1, display:'inline-block' }}
				/>
			);
		}
		return (
			<Input
				{...this.props.inputProps}
				className={className}
				tabIndex={this.props.tabIndex}
				onBlur={this.handleInputBlur}
				onChange={this.handleInputChange}
				onFocus={this.handleInputFocus}
				minWidth="5"
				ref="input"
				value={this.state.inputValue}
			/>
		);
	},

	renderClear () {
		if (!this.props.clearable || !this.props.value || (this.props.multi && !this.props.value.length) || this.props.disabled || this.props.isLoading) return;
		return (
			<span className="Select-clear-zone" title={this.props.multi ? this.props.clearAllText : this.props.clearValueText} aria-label={this.props.multi ? this.props.clearAllText : this.props.clearValueText} onMouseDown={this.clearValue} onTouchEnd={this.clearValue}>
				<span className="Select-clear" dangerouslySetInnerHTML={{ __html: '&times;' }} />
			</span>
		);
	},

	renderArrow () {
		return (
			<span className="Select-arrow-zone" onMouseDown={this.handleMouseDownOnArrow}>
				<span className="Select-arrow" onMouseDown={this.handleMouseDownOnArrow} />
			</span>
		);
	},

	renderMenu (options, valueArray, focusedOption) {
		if (options && options.length) {
			let Option = this.props.optionComponent;
			let renderLabel = this.props.optionRenderer || this.getOptionLabel;
			return options.map((option, i) => {
				let isSelected = valueArray && valueArray.indexOf(option) > -1;
				let isFocused = option === focusedOption;
				let optionRef = isFocused ? 'focused' : null;
				let optionClass = classNames({
					'Select-option': true,
					'is-selected': isSelected,
					'is-focused': isFocused,
					'is-disabled': option.disabled,
				});
				return (
					<Option
						className={optionClass}
						isDisabled={option.disabled}
						isFocused={isFocused}
						key={`option-${i}-${option[this.props.valueKey]}`}
						onSelect={this.selectValue}
						onFocus={this.focusOption}
						option={option}
						isSelected={isSelected}
						ref={optionRef}
						renderLabel={renderLabel}
					/>
				);
			});
		} else {
			return (
				<div className="Select-noresults">
					{this.props.noResultsText}
				</div>
			);
		}
	},

	renderHiddenField (valueArray) {
		if (!this.props.name) return;
		let value = valueArray.map(i => stringifyValue(i[this.props.valueKey])).join(this.props.delimiter);
		return <input type="hidden" ref="value" name={this.props.name} value={value} disabled={this.props.disabled} />;
	},

	getFocusableOption (selectedOption) {
		const options = this.state.visibleOptions;
		if (!options.length) return;
		const focusedOption = this.state.focusedOption || selectedOption;
		if (focusedOption && options.indexOf(focusedOption) > -1) return focusedOption;
		for (var i = 0; i < options.length; i++) {
			if (!options[i].disabled) return options[i];
		}
	},

	render () {
		const { hasBeenOpened, valueArray } = this.state;
		let options = this.state.visibleOptions;
		let isOpen = this.state.isOpen;
		if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
		let focusedOption = this._focusedOption = this.getFocusableOption(valueArray[0]);
		let className = classNames('Select', this.props.className, {
			'Select--multi': this.props.multi,
			'is-disabled': this.props.disabled,
			'is-focused': this.state.isFocused,
			'is-loading': this.props.isLoading,
			'is-open': isOpen,
			'is-pseudo-focused': this.state.isPseudoFocused,
			'is-searchable': this.props.searchable,
			'has-value': valueArray.length,
		});
		const menuStyle = {
			display: isOpen ? undefined : 'none',
			...this.props.menuStyle,
		};
		return (
			<div ref="wrapper" className={className} style={this.props.wrapperStyle}>
				{this.renderHiddenField(valueArray)}
				<div ref="control" className="Select-control" style={this.props.style} onKeyDown={this.handleKeyDown} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
					{this.renderValue(valueArray, isOpen)}
					{this.renderInput(valueArray)}
					{this.renderLoading()}
					{this.renderClear()}
					{this.renderArrow()}
				</div>
				{
					// Only render options if the menu has been opened before. This saves
					// rendering in the case that the user will never open the menu.
					hasBeenOpened && (
						<div ref="menuContainer" className="Select-menu-outer"
							style={this.props.menuContainerStyle}
						>
							<div ref="menu" className="Select-menu"
								style={menuStyle}
								onScroll={this.handleMenuScroll}
								onMouseDown={this.handleMouseDownOnMenu}
							>
								{this.renderMenu(options, !this.props.multi ? valueArray : null, focusedOption)}
							</div>
						</div>
					)
				}
			</div>
		);
	}

});

export default Select;
