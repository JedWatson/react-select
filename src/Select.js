import React from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-input-autosize';
import classNames from 'classnames';

import stripDiacritics from './utils/stripDiacritics';

import Async from './Async';
import Option from './Option';
import Value from './Value';

const Select = React.createClass({

	statics: { Async },

	displayName: 'Select',

	propTypes: {
		addLabelText: React.PropTypes.string,       // placeholder displayed when you want to add a label on a multi-value input
		allowCreate: React.PropTypes.bool,          // whether to allow creation of new entries
		backspaceRemoves: React.PropTypes.bool,     // whether backspace removes an item if there is no text input
		className: React.PropTypes.string,          // className for the outer element
		clearAllText: React.PropTypes.string,       // title for the "clear" control when multi: true
		clearValueText: React.PropTypes.string,     // title for the "clear" control
		clearable: React.PropTypes.bool,            // should it be possible to reset value
		delimiter: React.PropTypes.string,          // delimiter to use to join multiple values for the hidden field value
		disabled: React.PropTypes.bool,             // whether the Select is disabled or not
		escapeClearsValue: React.PropTypes.bool,    // whether escape clears the value when the menu is closed
		filterOption: React.PropTypes.func,         // method to filter a single option  (option, filterString)
		filterOptions: React.PropTypes.any,         // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
		ignoreAccents: React.PropTypes.bool,        // whether to strip diacritics when filtering
		ignoreCase: React.PropTypes.bool,           // whether to perform case-insensitive filtering
		inputProps: React.PropTypes.object,         // custom attributes for the Input (in the Select-control) e.g: {'data-foo': 'bar'}
		isLoading: React.PropTypes.bool,            // whether the Select is loading externally or not (such as options being loaded)
		labelKey: React.PropTypes.string,           // path of the label value in option objects
		matchPos: React.PropTypes.string,           // (any|start) match the start or entire string when filtering
		matchProp: React.PropTypes.string,          // (any|label|value) which option property to filter on
		multi: React.PropTypes.bool,                // multi-value input
		name: React.PropTypes.string,               // generates a hidden <input /> tag with this field name for html forms
		newOptionCreator: React.PropTypes.func,     // factory to create new options when allowCreate set
		noResultsText: React.PropTypes.string,      // placeholder displayed when there are no matching search results
		onBlur: React.PropTypes.func,               // onBlur handler: function (event) {}
		onChange: React.PropTypes.func,             // onChange handler: function (newValue) {}
		onFocus: React.PropTypes.func,              // onFocus handler: function (event) {}
		onInputChange: React.PropTypes.func,        // onInputChange handler: function (inputValue) {}
		onValueClick: React.PropTypes.func,         // onClick handler for value labels: function (value, event) {}
		onMenuScrollToBottom: React.PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
		optionComponent: React.PropTypes.func,      // option component to render in dropdown
		optionRenderer: React.PropTypes.func,       // optionRenderer: function (option) {}
		options: React.PropTypes.array,             // array of options
		placeholder: React.PropTypes.string,        // field placeholder, displayed when there's no value
		searchable: React.PropTypes.bool,           // whether to enable searching feature or not
		simpleValue: React.PropTypes.bool,          // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
		value: React.PropTypes.any,                 // initial field value
		valueComponent: React.PropTypes.func,       // value component to render
		valueKey: React.PropTypes.string,           // path of the label value in option objects
		valueRenderer: React.PropTypes.func         // valueRenderer: function (option) {}
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
			multi: false,
			noResultsText: 'No results found',
			optionComponent: Option,
			placeholder: 'Select...',
			searchable: true,
			simpleValue: false,
			valueComponent: Value,
			valueKey: 'value',
		};
	},

	getInitialState () {
		return {
			inputValue: '',
			isFocused: false,
			isLoading: false,
			isOpen: false,
			isPseudoFocused: false,
		};
	},

	componentDidUpdate (prevProps, prevState) {
		if (prevState.inputValue !== this.state.inputValue && this.props.onInputChange) {
			this.props.onInputChange(this.state.inputValue);
		}
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

		// for the non-searchable select, close the dropdown when button is clicked
		if (this.state.isOpen && !this.props.searchable) {
			this.setState({
				isOpen: false,
			});
			return;
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
			isPseudoFocused: this.state.isFocused && !this.props.multi
		});
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
		if (document.activeElement.isEqualNode(this.refs.menu)) {
			return;
		}
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
		this.setState({
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
		});
	},

	handleInputChange (event) {
		if (this.props.asyncOptions) {
			this.setState({
				// isLoading: true,
				isPseudoFocused: false,
				inputValue: event.target.value
			});
			// this.loadAsyncOptions(event.target.value, {
			// 	isLoading: false,
			// 	isOpen: true
			// }, this._bindCloseMenuIfClickedOutside);
		} else {
			// var filteredOptions = this.filterOptions(this.state.options);
			this.setState({
				isOpen: true,
				isPseudoFocused: false,
				inputValue: event.target.value,
				// filteredOptions: filteredOptions,
				// focusedOption: this._getNewFocusedOption(filteredOptions)
			});
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
				if (event.shiftKey || !this.state.isOpen || !this.state.focusedOption) {
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
		if (!this.props.onMenuScrollToBottom) return;
		let { target } = event;
		if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
			this.props.onMenuScrollToBottom();
		}
	},

	getOptionLabel (op) {
		return op[this.props.labelKey];
	},

	getValueArray () {
		let value = this.props.value;
		if (this.props.multi) {
			if (typeof value === 'string') value = value.split(this.props.delimiter);
			if (!Array.isArray(value)) {
				if (!value) return [];
				value = [value];
			}
			return value.map(this.expandValue).filter(i => i);
		}
		var expandedValue = this.expandValue(value);
		return expandedValue ? [expandedValue] : [];
	},

	expandValue (value) {
		if (typeof value !== 'string' && typeof value !== 'number') return value;
		if (!this.props.options) return;
		for (var i = 0; i < this.props.options.length; i++) {
			if (this.props.options[i][this.props.valueKey] === value) return this.props.options[i];
		}
	},

	setValue (value) {
		if (!this.props.onChange) return;
		if (this.props.simpleValue && value) {
			value = this.props.multi ? value && value.map(i => i[this.props.valueKey]).join(this.props.delimiter) : value[this.props.valueKey];
		}
		this.props.onChange(value);
	},

	selectValue (value) {
		if (this.props.multi) {
			this.addValue(value);
			this.setState({
				inputValue: '',
			});
		} else {
			this.setValue(value);
			this.setState({
				isOpen: false,
				inputValue: '',
				isPseudoFocused: this.state.isFocused,
			});
		}
	},

	addValue (value) {
		var valueArray = this.getValueArray();
		this.setValue(valueArray.concat(value));
	},

	popValue () {
		var valueArray = this.getValueArray();
		if (!valueArray.length) return;
		this.setValue(valueArray.slice(0, valueArray.length - 1));
	},

	removeValue (value) {
		var valueArray = this.getValueArray();
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
		this.setState({
			isOpen: false,
			inputValue: '',
		}, this.focus);
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
		var options = this._visibleOptions.filter(i => !i.disabled);
		this._scrollToFocusedOptionOnUpdate = true;
		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				inputValue: '',
				focusedOption: this._focusedOption || options[dir === 'next' ? 0 : options.length - 1]
			});
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
			return valueArray.map(i => {
				return (
					<ValueComponent
						disabled={this.props.disabled}
						key={i[this.props.valueKey]}
						onClick={onClick}
						onRemove={this.removeValue}
						value={i}
						>
						{renderLabel(i)}
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
			if (this.props.multi && valueArray.length) return;
			return <div className={className}>&nbsp;</div>;
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

	filterOptions (excludeOptions) {
		var filterValue = this.state.inputValue;
		var options = this.props.options || [];
		if (typeof this.props.filterOptions === 'function') {
			return this.props.filterOptions.call(this, options, filterValue, excludeOptions);
		} else if (this.props.filterOptions) {
			if (this.props.ignoreAccents) {
				filterValue = stripDiacritics(filterValue);
			}
			if (this.props.ignoreCase) {
				filterValue = filterValue.toLowerCase();
			}
			if (excludeOptions) excludeOptions = excludeOptions.map(i => i[this.props.valueKey]);
			return options.filter(option => {
				if (excludeOptions && excludeOptions.indexOf(option[this.props.valueKey]) > -1) return false;
				if (this.props.filterOption) return this.props.filterOption.call(this, option, filterValue);
				if (!filterValue) return true;
				var valueTest = String(option[this.props.valueKey]);
				var labelTest = String(option[this.props.labelKey]);
				if (this.props.ignoreAccents) {
					if (this.props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
					if (this.props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
				}
				if (this.props.ignoreCase) {
					if (this.props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
					if (this.props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
				}
				return this.props.matchPos === 'start' ? (
					(this.props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue) ||
					(this.props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue)
				) : (
					(this.props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0) ||
					(this.props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0)
				);
			});
		} else {
			return options;
		}
	},

	renderMenu (options, valueArray, focusedOption) {
		if (options && options.length) {
			let Option = this.props.optionComponent;
			let renderLabel = this.props.optionRenderer || this.getOptionLabel;
			return options.map(option => {
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
						key={'option-' + option[this.props.valueKey]}
						onSelect={this.selectValue}
						onFocus={this.focusOption}
						option={option}
						isSelected={isSelected}
						ref={optionRef}
						>
						{renderLabel(option)}
					</Option>
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
		let value = valueArray.join(this.props.delimiter);
		return <input type="hidden" ref="value" name={this.props.name} value={value} disabled={this.props.disabled} />;
	},

	getFocusableOption (selectedOption) {
		var options = this._visibleOptions;
		if (!options.length) return;
		let focusedOption = this.state.focusedOption || selectedOption;
		if (focusedOption && options.indexOf(focusedOption) > -1) return focusedOption;
		for (var i = 0; i <= options.length; i++) {
			if (!options[i].disabled) return options[i];
		}
	},

	render () {
		let valueArray = this.getValueArray();
		let options = this._visibleOptions = this.filterOptions(this.props.multi ? valueArray : null);
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
		return (
			<div ref="wrapper" className={className}>
				{this.renderHiddenField(valueArray)}
				<div className="Select-control" ref="control" onKeyDown={this.handleKeyDown} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
					{this.renderValue(valueArray, isOpen)}
					{this.renderInput(valueArray)}
					{this.renderLoading()}
					{this.renderClear()}
					{this.renderArrow()}
				</div>
				{isOpen ? (
					<div ref="menuContainer" className="Select-menu-outer">
						<div ref="menu" className="Select-menu" onScroll={this.handleMenuScroll} onMouseDown={this.handleMouseDownOnMenu}>
							{this.renderMenu(options, !this.props.multi ? valueArray : null, focusedOption)}
						</div>
					</div>
				) : null}
			</div>
		);
	}

});

export default Select;
