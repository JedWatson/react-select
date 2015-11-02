import React from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-input-autosize';
import classNames from 'classnames';

import MultiValue from './MultiValue';
import Option from './Option';
import SingleValue from './SingleValue';

var requestId = 0;

var Select = React.createClass({

	displayName: 'Select',

	propTypes: {
		addLabelText: React.PropTypes.string,       // placeholder displayed when you want to add a label on a multi-value input
		allowCreate: React.PropTypes.bool,          // whether to allow creation of new entries
		asyncOptions: React.PropTypes.func,         // function to call to get options
		autoload: React.PropTypes.bool,             // whether to auto-load the default async options set
		backspaceRemoves: React.PropTypes.bool,     // whether backspace removes an item if there is no text input
		cacheAsyncResults: React.PropTypes.bool,    // whether to allow cache
		className: React.PropTypes.string,          // className for the outer element
		clearAllText: React.PropTypes.string,       // title for the "clear" control when multi: true
		clearValueText: React.PropTypes.string,     // title for the "clear" control
		clearable: React.PropTypes.bool,            // should it be possible to reset value
		delimiter: React.PropTypes.string,          // delimiter to use to join multiple values
		disabled: React.PropTypes.bool,             // whether the Select is disabled or not
		filterOption: React.PropTypes.func,         // method to filter a single option  (option, filterString)
		filterOptions: React.PropTypes.func,        // method to filter the options array: function ([options], filterString, [values])
		ignoreCase: React.PropTypes.bool,           // whether to perform case-insensitive filtering
		inputProps: React.PropTypes.object,         // custom attributes for the Input (in the Select-control) e.g: {'data-foo': 'bar'}
		isLoading: React.PropTypes.bool,            // whether the Select is loading externally or not (such as options being loaded)
		labelKey: React.PropTypes.string,           // path of the label value in option objects
		matchPos: React.PropTypes.string,           // (any|start) match the start or entire string when filtering
		matchProp: React.PropTypes.string,          // (any|label|value) which option property to filter on
		multi: React.PropTypes.bool,                // multi-value input
		multiValueComponent: React.PropTypes.func,  // value component to render when multiple is set to true
		name: React.PropTypes.string,               // field name, for hidden <input /> tag
		newOptionCreator: React.PropTypes.func,     // factory to create new options when allowCreate set
		noResultsText: React.PropTypes.string,      // placeholder displayed when there are no matching search results
		onBlur: React.PropTypes.func,               // onBlur handler: function (event) {}
		onChange: React.PropTypes.func,             // onChange handler: function (newValue) {}
		onFocus: React.PropTypes.func,              // onFocus handler: function (event) {}
		onInputChange: React.PropTypes.func,        // onInputChange handler: function (inputValue) {}
		onOptionLabelClick: React.PropTypes.func,   // onCLick handler for value labels: function (value, event) {}
		optionComponent: React.PropTypes.func,      // option component to render in dropdown
		optionRenderer: React.PropTypes.func,       // optionRenderer: function (option) {}
		options: React.PropTypes.array,             // array of options
		placeholder: React.PropTypes.string,        // field placeholder, displayed when there's no value
		searchable: React.PropTypes.bool,           // whether to enable searching feature or not
		searchingText: React.PropTypes.string,      // message to display whilst options are loading via asyncOptions
		searchPromptText: React.PropTypes.string,   // label to prompt for search input
		singleValueComponent: React.PropTypes.func, // value component to render when multiple is set to false
		value: React.PropTypes.any,                 // initial field value
		valueKey: React.PropTypes.string,           // path of the label value in option objects
		valueRenderer: React.PropTypes.func         // valueRenderer: function (option) {}
	},

	getDefaultProps () {
		return {
			addLabelText: 'Add "{label}"?',
			allowCreate: false,
			autoload: true,
			backspaceRemoves: true,
			cacheAsyncResults: true,
			clearAllText: 'Clear all',
			clearValueText: 'Clear value',
			clearable: true,
			delimiter: ',',
			disabled: false,
			ignoreCase: true,
			inputProps: {},
			isLoading: false,
			labelKey: 'label',
			matchPos: 'any',
			matchProp: 'any',
			multi: false,
			multiValueComponent: MultiValue,
			noResultsText: 'No results found',
			optionComponent: Option,
			placeholder: 'Select...',
			searchable: true,
			searchingText: 'Searching...',
			searchPromptText: 'Type to search',
			singleValueComponent: SingleValue,
			valueKey: 'value',
		};
	},

	getInitialState () {
		return {
			isFocused: false,
			isLoading: false,
			isOpen: false
		};
	},

	focus () {
		if (!this.refs.input) return;
		this.refs.input.focus();
	},

	getOptionLabel (op) {
		return op[this.props.labelKey];
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
				isOpen: false
			});
			return;
		}

		if (this.state.isFocused) {
			// if the input is focused, ensure the menu is open
			this.setState({
				isOpen: true
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
		this.setState({
			isOpen: false
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
			isOpen: false
		});
	},

	handleInputChange (event) {
		if (this.props.onInputChange) {
			this.props.onInputChange(event.target.value);
		}
		if (this.props.asyncOptions) {
			this.setState({
				// isLoading: true,
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
				inputValue: event.target.value,
				// filteredOptions: filteredOptions,
				// focusedOption: this._getNewFocusedOption(filteredOptions)
			});
		}
	},

	getValueArray () {
		if (this.props.multi) {
			if (!Array.isArray(this.props.value)) return [];
			return this.props.value.map(this.expandValue).filter(i => i);
		}
		var expandedValue = this.expandValue(this.props.value);
		return expandedValue ? [expandedValue] : [];
	},

	expandValue (value) {
		if (typeof value !== 'string') return value;
		if (!this.props.options) return;
		for (var i = 0; i < this.props.options.length; i++) {
			if (this.props.options[i][this.props.valueKey] === value) return this.props.options[i];
		}
	},

	setValue (value) {
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	},

	selectValue (value) {
		if (!this.props.multi) {
			this.setValue(value);
		} else if (value) {
			this.addValue(value);
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
	},

	focusOption (option) {
		this.setState({
			focusedOption: option
		});
	},

	unfocusOption (option) {
		if (this.state.focusedOption === option) {
			this.setState({
				focusedOption: null
			});
		}
	},

	isLoading () {
		return this.props.isLoading || this.state.isLoading;
	},

	renderLoading () {
		if (!this.isLoading()) return;
		return (
			<span className="Select-loading-zone" aria-hidden="true">
				<span className="Select-loading" />
			</span>
		);
	},

	renderValue (valueArray) {
		var renderLabel = this.props.valueRenderer || this.getOptionLabel;
		var MultiValueComponent = this.props.multiValueComponent;
		var SingleValueComponent = this.props.singleValueComponent;
		if (!valueArray.length) {
			return <div className="Select-placeholder">{this.props.placeholder}</div>;
		}
		if (this.props.multi) {
			return valueArray.map(i => {
				return (
					<MultiValueComponent
						key={i[this.props.valueKey]}
						value={i}
						onRemove={this.removeValue}
						disabled={this.props.disabled}
						>
						{renderLabel(i)}
					</MultiValueComponent>
				);
			});
		} else if (!this.state.inputValue) {
			return (
				<SingleValueComponent
					value={valueArray[0]}>
					{renderLabel(valueArray[0])}
				</SingleValueComponent>
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
		if (!this.props.clearable || !this.props.value || (this.props.multi && !this.props.value.length) || this.props.disabled || this.isLoading()) return;
		return (
			<span className="Select-clear-zone" title={this.props.multi ? this.props.clearAllText : this.props.clearValueText} aria-label={this.props.multi ? this.props.clearAllText : this.props.clearValueText} onMouseDown={this.clearValue} onTouchEnd={this.clearValue} onClick={this.clearValue}>
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

	renderMenuOptions (valueArray) {
		// TODO: filter options
		// TODO: don't re-gen unless options / input have changed
		// TODO: other ways of getting options (async options)...
		if (this.props.options && this.props.options.length) {
			var Option = this.props.optionComponent;
			var renderLabel = this.props.optionRenderer || this.getOptionLabel;
			return this.props.options.map(option => {
				var isSelected = valueArray.indexOf(option) > -1;
				var isFocused = option === this.state.focusedOption;
				var optionRef = isFocused ? 'focused' : null;
				var optionClass = classNames({
					'Select-option': true,
					'is-selected': isSelected,
					'is-focused': isFocused,
					'is-disabled': option.disabled,
				});
				return (
					<Option
						className={optionClass}
						key={'option-' + option[this.props.valueKey]}
						mouseDown={this.selectValue}
						mouseEnter={this.focusOption}
						mouseLeave={this.unfocusOption}
						option={option}
						ref={optionRef}
						>
						{renderLabel(option)}
					</Option>
				);
			});
		} else {
			var noResultsText;
			var noResultsClass;
			if (this.isLoading()) {
				noResultsClass = 'Select-searching';
				noResultsText = this.props.searchingText;
			} else if (this.state.inputValue || !this.props.asyncOptions) {
				noResultsClass = 'Select-noresults';
				noResultsText = this.props.noResultsText;
			} else {
				noResultsClass = 'Select-search-prompt';
				noResultsText = this.props.searchPromptText;
			}
			return (
				<div className={noResultsClass}>
					{noResultsText}
				</div>
			);
		}
	},

	renderMenu (valueArray) {
		if (!this.state.isOpen) return;
		return (
			<div ref="menuContainer" className="Select-menu-outer">
				<div ref="menu" className="Select-menu" onMouseDown={this.handleMouseDownOnMenu}>
					{this.renderMenuOptions(valueArray)}
				</div>
			</div>
		);
	},

	getWrapperClassName (hasValue) {
		return classNames('Select', this.props.className, {
			'Select--multi': this.props.multi,
			'is-searchable': this.props.searchable,
			'is-open': this.state.isOpen,
			'is-focused': this.state.isFocused,
			'is-loading': this.isLoading(),
			'is-disabled': this.props.disabled,
			'has-value': hasValue,
		});
	},

	render () {
		let valueArray = this.getValueArray();
		return (
			<div ref="wrapper" className={this.getWrapperClassName(valueArray.length)}>
				<input type="hidden" ref="value" name={this.props.name} value={this.state.value} disabled={this.props.disabled} />
				<div className="Select-control" ref="control" onKeyDown={this.handleKeyDown} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
					{this.renderValue(valueArray)}
					{this.renderInput(valueArray)}
					{this.renderLoading()}
					{this.renderClear()}
					{this.renderArrow()}
				</div>
				{this.renderMenu(valueArray)}
			</div>
		);
	}

});

export default Select;
