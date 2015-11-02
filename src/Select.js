import React from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-input-autosize';
import classnames from 'classnames';

import MultiValue from './MultiValue';
import Option from './Option';
import SingleValue from './SingleValue';

var requestId = 0;

var Select = React.createClass({

	displayName: 'Select',

	propTypes: {
		addLabelText: React.PropTypes.string,      // placeholder displayed when you want to add a label on a multi-value input
		allowCreate: React.PropTypes.bool,         // whether to allow creation of new entries
		asyncOptions: React.PropTypes.func,        // function to call to get options
		autoload: React.PropTypes.bool,            // whether to auto-load the default async options set
		backspaceRemoves: React.PropTypes.bool,    // whether backspace removes an item if there is no text input
		cacheAsyncResults: React.PropTypes.bool,   // whether to allow cache
		className: React.PropTypes.string,         // className for the outer element
		clearAllText: React.PropTypes.string,      // title for the "clear" control when multi: true
		clearValueText: React.PropTypes.string,    // title for the "clear" control
		clearable: React.PropTypes.bool,           // should it be possible to reset value
		delimiter: React.PropTypes.string,         // delimiter to use to join multiple values
		disabled: React.PropTypes.bool,            // whether the Select is disabled or not
		filterOption: React.PropTypes.func,        // method to filter a single option  (option, filterString)
		filterOptions: React.PropTypes.func,       // method to filter the options array: function ([options], filterString, [values])
		ignoreCase: React.PropTypes.bool,          // whether to perform case-insensitive filtering
		inputProps: React.PropTypes.object,        // custom attributes for the Input (in the Select-control) e.g: {'data-foo': 'bar'}
		isLoading: React.PropTypes.bool,           // whether the Select is loading externally or not (such as options being loaded)
		labelKey: React.PropTypes.string,          // path of the label value in option objects
		matchPos: React.PropTypes.string,          // (any|start) match the start or entire string when filtering
		matchProp: React.PropTypes.string,         // (any|label|value) which option property to filter on
		multi: React.PropTypes.bool,               // multi-value input
		multiValueComponent: React.PropTypes.func, // value component to render when multiple is set to true
		name: React.PropTypes.string,              // field name, for hidden <input /> tag
		newOptionCreator: React.PropTypes.func,    // factory to create new options when allowCreate set
		noResultsText: React.PropTypes.string,     // placeholder displayed when there are no matching search results
		onBlur: React.PropTypes.func,              // onBlur handler: function (event) {}
		onChange: React.PropTypes.func,            // onChange handler: function (newValue) {}
		onFocus: React.PropTypes.func,             // onFocus handler: function (event) {}
		onInputChange: React.PropTypes.func,       // onInputChange handler: function (inputValue) {}
		onOptionLabelClick: React.PropTypes.func,  // onCLick handler for value labels: function (value, event) {}
		optionComponent: React.PropTypes.func,     // option component to render in dropdown
		optionRenderer: React.PropTypes.func,      // optionRenderer: function (option) {}
		options: React.PropTypes.array,            // array of options
		placeholder: React.PropTypes.string,       // field placeholder, displayed when there's no value
		searchable: React.PropTypes.bool,          // whether to enable searching feature or not
		searchingText: React.PropTypes.string,     // message to display whilst options are loading via asyncOptions
		searchPromptText: React.PropTypes.string,  // label to prompt for search input
		singleValueComponent: React.PropTypes.func,// value component to render when multiple is set to false
		value: React.PropTypes.any,                // initial field value
		valueKey: React.PropTypes.string,          // path of the label value in option objects
		valueRenderer: React.PropTypes.func        // valueRenderer: function (option) {}
	},

	getDefaultProps () {
		return {
			addLabelText: 'Add "{label}"?',
			allowCreate: false,
			asyncOptions: undefined,
			autoload: true,
			backspaceRemoves: true,
			cacheAsyncResults: true,
			className: undefined,
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
			multiValueComponent: MultiValue,
			name: undefined,
			newOptionCreator: undefined,
			noResultsText: 'No results found',
			onChange: undefined,
			onInputChange: undefined,
			onOptionLabelClick: undefined,
			optionComponent: Option,
			options: undefined,
			placeholder: 'Select...',
			searchable: true,
			searchingText: 'Searching...',
			searchPromptText: 'Type to search',
			singleValueComponent: SingleValue,
			value: undefined,
			valueKey: 'value',
		};
	},

	getInitialState () {
		return {
			isFocused: false,
			isLoading: false,
			isOpen: false,
			options: this.props.options
		};
	},

	isLoading () {
		return this.props.isLoading || this.state.isLoading;
	},

	render () {
		var selectClass = classnames('Select', this.props.className, {
			'Select--multi': this.props.multi,
			'is-searchable': this.props.searchable,
			'is-open': this.state.isOpen,
			'is-focused': this.state.isFocused,
			'is-loading': this.isLoading(),
			'is-disabled': this.props.disabled,
			'has-value': this.state.value
		});

		// loading spinner
		var loading = this.isLoading() ? (
			<span className="Select-loading-zone" aria-hidden="true">
				<span className="Select-loading" />
			</span>
		) : null;

		// clear "x" button
		var clear = (this.props.clearable && this.state.value && !this.props.disabled && !(this.isLoading())) ? (
			<span className="Select-clear-zone" title={this.props.multi ? this.props.clearAllText : this.props.clearValueText} aria-label={this.props.multi ? this.props.clearAllText : this.props.clearValueText} onMouseDown={this.clearValue} onTouchEnd={this.clearValue} onClick={this.clearValue}>
				<span className="Select-clear" dangerouslySetInnerHTML={{ __html: '&times;' }} />
			</span>
		) : null;

		// indicator arrow
		var arrow = (
			<span className="Select-arrow-zone" onMouseDown={this.handleMouseDownOnArrow}>
				<span className="Select-arrow" onMouseDown={this.handleMouseDownOnArrow} />
			</span>
		);

		// value
		var value;

		// input
		var input;
		var inputProps = {
			ref: 'input',
			className: 'Select-input ' + (this.props.inputProps.className || ''),
			tabIndex: this.props.tabIndex || 0,
			onFocus: this.handleInputFocus,
			onBlur: this.handleInputBlur
		};
		for (var key in this.props.inputProps) {
			if (this.props.inputProps.hasOwnProperty(key) && key !== 'className') {
				inputProps[key] = this.props.inputProps[key];
			}
		}

		if (!this.props.disabled) {
			if (this.props.searchable) {
				input = <Input value={this.state.inputValue} onChange={this.handleInputChange} minWidth="5" {...inputProps} />;
			} else {
				input = <div {...inputProps}>&nbsp;</div>;
			}
		} else if (!this.props.multi || !this.state.values.length) {
			input = <div className="Select-input">&nbsp;</div>;
		}

		// menu
		var menu;

		return (
			<div ref="wrapper" className={selectClass}>
				<input type="hidden" ref="value" name={this.props.name} value={this.state.value} disabled={this.props.disabled} />
				<div className="Select-control" ref="control" onKeyDown={this.handleKeyDown} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
					{value}
					{input}
					{loading}
					{clear}
					{arrow}
				</div>
				{menu}
			</div>
		);
	}

});

export default Select;
