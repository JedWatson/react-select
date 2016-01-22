'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactInputAutosize = require('react-input-autosize');

var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsStripDiacritics = require('./utils/stripDiacritics');

var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);

var _Async = require('./Async');

var _Async2 = _interopRequireDefault(_Async);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _Value = require('./Value');

var _Value2 = _interopRequireDefault(_Value);

function stringifyValue(value) {
	if (typeof value === 'object') {
		return JSON.stringify(value);
	} else {
		return value;
	}
}

function getValueState(state, props) {
	var value = props.value;
	var delimeter = props.delimeter;
	var multi = props.multi;

	if (value == null) {
		return { valueArray: [] };
	}

	var expandValue = createValueExpander(props);

	if (multi) {
		var values = null;
		if (typeof value === 'string') {
			values = value.split(delimeter);
		} else if (!Array.isArray(value)) {
			values = [value];
		}
		return { valueArray: values.map(expandValue).filter(function (i) {
				return i;
			}) };
	}

	var expandedValue = expandValue(value);
	return { valueArray: expandedValue ? [expandedValue] : [] };
};

var createValueExpander = function createValueExpander(props) {
	return function (value) {
		if (typeof value !== 'string' && typeof value !== 'number') return value;
		var options = props.options;
		var valueKey = props.valueKey;

		if (!options) return;
		for (var i = 0; i < options.length; i++) {
			if (options[i][valueKey] === value) return options[i];
		}
	};
};

function getVisibleOptionsState(state, props) {
	return { visibleOptions: getVisibleOptions(state, props) };
}

function getVisibleOptions(state, props) {
	var _this = this;

	var options = props.options;
	var filterOptions = props.filterOptions;
	var valueArray = state.valueArray;
	var inputValue = state.inputValue;

	if (typeof filterOptions === 'function') {
		return filterOptions(options, inputValue, valueArray);
	}

	if (!filterOptions) {
		return options;
	}

	if (props.ignoreAccents) {
		inputValue = (0, _utilsStripDiacritics2['default'])(inputValue);
	}

	if (props.ignoreCase) {
		inputValue = inputValue.toLowerCase();
	}

	if (valueArray) {
		valueArray = valueArray.map(function (i) {
			return i[props.valueKey];
		});
	}

	return options.filter(function (option) {
		if (valueArray && valueArray.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(_this, option, inputValue);
		if (!inputValue) return true;
		var valueTest = String(option[props.valueKey]);
		var labelTest = String(option[props.labelKey]);
		if (props.ignoreAccents) {
			if (props.matchProp !== 'label') valueTest = (0, _utilsStripDiacritics2['default'])(valueTest);
			if (props.matchProp !== 'value') labelTest = (0, _utilsStripDiacritics2['default'])(labelTest);
		}
		if (props.ignoreCase) {
			if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}
		return props.matchPos === 'start' ? props.matchProp !== 'label' && valueTest.substr(0, inputValue.length) === inputValue || props.matchProp !== 'value' && labelTest.substr(0, inputValue.length) === inputValue : props.matchProp !== 'label' && valueTest.indexOf(inputValue) >= 0 || props.matchProp !== 'value' && labelTest.indexOf(inputValue) >= 0;
	});
};

var Select = _react2['default'].createClass({

	statics: { Async: _Async2['default'] },

	displayName: 'Select',

	propTypes: {
		addLabelText: _react2['default'].PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
		allowCreate: _react2['default'].PropTypes.bool, // whether to allow creation of new entries
		autofocus: _react2['default'].PropTypes.bool, // autofocus the component on mount
		backspaceRemoves: _react2['default'].PropTypes.bool, // whether backspace removes an item if there is no text input
		className: _react2['default'].PropTypes.string, // className for the outer element
		clearAllText: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]), // title for the "clear" control when multi: true
		clearValueText: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]), // title for the "clear" control
		clearable: _react2['default'].PropTypes.bool, // should it be possible to reset value
		delimiter: _react2['default'].PropTypes.string, // delimiter to use to join multiple values for the hidden field value
		disabled: _react2['default'].PropTypes.bool, // whether the Select is disabled or not
		escapeClearsValue: _react2['default'].PropTypes.bool, // whether escape clears the value when the menu is closed
		filterOption: _react2['default'].PropTypes.func, // method to filter a single option (option, filterString)
		filterOptions: _react2['default'].PropTypes.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
		ignoreAccents: _react2['default'].PropTypes.bool, // whether to strip diacritics when filtering
		ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering
		inputProps: _react2['default'].PropTypes.object, // custom attributes for the Input
		isLoading: _react2['default'].PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
		labelKey: _react2['default'].PropTypes.string, // path of the label value in option objects
		matchPos: _react2['default'].PropTypes.string, // (any|start) match the start or entire string when filtering
		matchProp: _react2['default'].PropTypes.string, // (any|label|value) which option property to filter on
		scrollMenuIntoView: _react2['default'].PropTypes.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
		menuBuffer: _react2['default'].PropTypes.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
		menuStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu
		menuContainerStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu container
		multi: _react2['default'].PropTypes.bool, // multi-value input
		name: _react2['default'].PropTypes.string, // generates a hidden <input /> tag with this field name for html forms
		newOptionCreator: _react2['default'].PropTypes.func, // factory to create new options when allowCreate set
		noResultsText: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]), // placeholder displayed when there are no matching search results
		onBlur: _react2['default'].PropTypes.func, // onBlur handler: function (event) {}
		onBlurResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared on blur
		onChange: _react2['default'].PropTypes.func, // onChange handler: function (newValue) {}
		onFocus: _react2['default'].PropTypes.func, // onFocus handler: function (event) {}
		onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function (inputValue) {}
		onValueClick: _react2['default'].PropTypes.func, // onClick handler for value labels: function (value, event) {}
		onMenuScrollToBottom: _react2['default'].PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
		optionComponent: _react2['default'].PropTypes.func, // option component to render in dropdown
		optionRenderer: _react2['default'].PropTypes.func, // optionRenderer: function (option) {}
		options: _react2['default'].PropTypes.array, // array of options
		placeholder: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]), // field placeholder, displayed when there's no value
		searchable: _react2['default'].PropTypes.bool, // whether to enable searching feature or not
		simpleValue: _react2['default'].PropTypes.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
		style: _react2['default'].PropTypes.object, // optional style to apply to the control
		tabIndex: _react2['default'].PropTypes.string, // optional tab index of the control
		value: _react2['default'].PropTypes.any, // initial field value
		valueComponent: _react2['default'].PropTypes.func, // value component to render
		valueKey: _react2['default'].PropTypes.string, // path of the label value in option objects
		valueRenderer: _react2['default'].PropTypes.func, // valueRenderer: function (option) {}
		wrapperStyle: _react2['default'].PropTypes.object },

	// optional style to apply to the component wrapper
	getDefaultProps: function getDefaultProps() {
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
			optionComponent: _Option2['default'],
			options: [],
			placeholder: 'Select...',
			scrollMenuIntoView: true,
			searchable: true,
			simpleValue: false,
			valueComponent: _Value2['default'],
			valueKey: 'value'
		};
	},

	getInitialState: function getInitialState() {
		var state = _extends({
			inputValue: '',
			isFocused: false,
			isLoading: false,
			hasBeenOpened: false,
			isOpen: false,
			isScrolledToBottom: false,
			isPseudoFocused: false
		}, getValueState({}, this.props));
		return _extends({}, state, getVisibleOptionsState(state, this.props));
	},

	componentDidMount: function componentDidMount() {
		if (this.props.autofocus) {
			this.focus();
		}
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

		// If value has changed, then update the stored `valueArray`.
		var valueArray = this.state.valueArray;

		if (nextProps.value !== this.props.value) {
			this.setState(getValueState);
		}

		// If anything changes the way results are displayed, update them.
		if (nextProps.options !== this.props.options || nextProps.filterOptions !== this.props.filterOptions || nextProps.ignoreAccents !== this.props.ignoreAccents || nextProps.ignoreCase !== this.props.ignoreCase || nextProps.matchProps !== this.props.matchProps || nextProps.multi !== this.props.multi) {
			this.setState(getVisibleOptionsState);
		}
	},

	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		if (this._scrollToFocusedOptionOnUpdate && this.refs.focused && this.refs.menu) {
			this._scrollToFocusedOptionOnUpdate = false;
			var focusedDOM = _reactDom2['default'].findDOMNode(this.refs.focused);
			var menuDOM = _reactDom2['default'].findDOMNode(this.refs.menu);
			var focusedRect = focusedDOM.getBoundingClientRect();
			var menuRect = menuDOM.getBoundingClientRect();
			if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
				menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
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

	focus: function focus() {
		if (!this.refs.input) return;
		this.refs.input.focus();
	},

	handleMouseDown: function handleMouseDown(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
			return;
		}

		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();

		// for the non-searchable select, toggle the menu
		if (!this.props.searchable) {
			this.focus();
			return this.setState({
				isOpen: !this.state.isOpen
			});
		}

		if (this.state.isFocused) {
			// if the input is focused, ensure the menu is open
			this.setState({
				isOpen: true,
				isPseudoFocused: false
			});
		} else {
			// otherwise, focus the input and open the menu
			this._openAfterFocus = true;
			this.focus();
		}
	},

	handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
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

	closeMenu: function closeMenu() {
		this.setState({
			isOpen: false,
			isPseudoFocused: this.state.isFocused && !this.props.multi
		});
		this.setInputValue('');
	},

	handleInputFocus: function handleInputFocus(event) {
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

	handleInputBlur: function handleInputBlur(event) {
		if (this.refs.menu && document.activeElement.isEqualNode(this.refs.menu)) {
			return;
		}

		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
		var onBlurredState = {
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false
		};
		if (this.props.onBlurResetsInput) {
			onBlurredState.inputValue = '';
		}
		this.setState(onBlurredState);
	},

	handleInputChange: function handleInputChange(event) {
		this.setState({
			isOpen: true,
			isPseudoFocused: false
		});
		this.setInputValue(event.target.value);
	},

	setInputValue: function setInputValue(value) {
		if (this.state.value !== value) {
			this.props.onInputChange(this.state.inputValue);
			this.setState({ inputValue: value });
			this.setState(getVisibleOptionsState);
		}
	},

	handleKeyDown: function handleKeyDown(event) {
		if (this.props.disabled) return;
		switch (event.keyCode) {
			case 8:
				// backspace
				if (!this.state.inputValue && this.props.backspaceRemoves) {
					event.preventDefault();
					this.popValue();
				}
				return;
			case 9:
				// tab
				if (event.shiftKey || !this.state.isOpen) {
					return;
				}
				this.selectFocusedOption();
				break;
			case 13:
				// enter
				if (!this.state.isOpen) return;
				this.selectFocusedOption();
				break;
			case 27:
				// escape
				if (this.state.isOpen) {
					this.closeMenu();
				} else if (this.props.clearable && this.props.escapeClearsValue) {
					this.clearValue(event);
				}
				break;
			case 38:
				// up
				this.focusPreviousOption();
				break;
			case 40:
				// down
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
			default:
				return;
		}
		event.preventDefault();
	},

	handleValueClick: function handleValueClick(option, event) {
		if (this.props.onValueClick) {
			this.props.onValueClick(option, event);
		}
	},

	handleMenuScroll: function handleMenuScroll(event) {
		this.checkScrolledToBottom();
	},

	checkScrolledToBottom: function checkScrolledToBottom() {
		if (!this.props.onMenuScrollToBottom) return;
		var menu = this.refs.menu;

		var isScrolledToBottom = menu && menu.scrollHeight - menu.offsetHeight - menu.scrollTop === 0;
		if (this.state.isScrolledToBottom !== isScrolledToBottom) {
			if (isScrolledToBottom) {
				this.props.onMenuScrollToBottom();
			}
			this.setState({ isScrolledToBottom: isScrolledToBottom });
		}
	},

	getOptionLabel: function getOptionLabel(op) {
		return op[this.props.labelKey];
	},

	setValue: function setValue(value) {
		var _this2 = this;

		if (!this.props.onChange) return;
		if (this.props.simpleValue && value) {
			value = this.props.multi ? value.map(function (i) {
				return i[_this2.props.valueKey];
			}).join(this.props.delimiter) : value[this.props.valueKey];
		}
		this.props.onChange(value);
	},

	selectValue: function selectValue(value) {
		if (this.props.multi) {
			this.addValue(value);
		} else {
			this.setValue(value);
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused
			});
		}
		this.setInputValue('');
	},

	addValue: function addValue(value) {
		var valueArray = this.state.valueArray;

		this.setValue(valueArray.concat(value));
	},

	popValue: function popValue() {
		var valueArray = this.state.valueArray;

		if (!valueArray.length) return;
		if (valueArray[valueArray.length - 1].clearableValue === false) return;
		this.setValue(valueArray.slice(0, valueArray.length - 1));
	},

	removeValue: function removeValue(value) {
		var valueArray = this.state.valueArray;

		this.setValue(valueArray.filter(function (i) {
			return i !== value;
		}));
		this.focus();
	},

	clearValue: function clearValue(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event && event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
		this.setValue(null);
		this.setInputValue('');
		this.setState({ isOpen: false }, this.focus);
	},

	focusOption: function focusOption(option) {
		this.setState({
			focusedOption: option
		});
	},

	focusNextOption: function focusNextOption() {
		this.focusAdjacentOption('next');
	},

	focusPreviousOption: function focusPreviousOption() {
		this.focusAdjacentOption('previous');
	},

	focusAdjacentOption: function focusAdjacentOption(dir) {
		var _state = this.state;
		var isOpen = _state.isOpen;
		var visibleOptions = _state.visibleOptions;

		var options = visibleOptions.filter(function (i) {
			return !i.disabled;
		});
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

	selectFocusedOption: function selectFocusedOption() {
		// if (this.props.allowCreate && !this.state.focusedOption) {
		// 	return this.selectValue(this.state.inputValue);
		// }
		if (this._focusedOption) {
			return this.selectValue(this._focusedOption);
		}
	},

	renderLoading: function renderLoading() {
		if (!this.props.isLoading) return;
		return _react2['default'].createElement(
			'span',
			{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
			_react2['default'].createElement('span', { className: 'Select-loading' })
		);
	},

	renderValue: function renderValue(valueArray, isOpen) {
		var _this3 = this;

		var renderLabel = this.props.valueRenderer || this.getOptionLabel;
		var ValueComponent = this.props.valueComponent;
		if (!valueArray.length) {
			return !this.state.inputValue ? _react2['default'].createElement(
				'div',
				{ className: 'Select-placeholder' },
				this.props.placeholder
			) : null;
		}
		if (this.props.multi) {
			return valueArray.map(function (value, i) {
				return _react2['default'].createElement(
					ValueComponent,
					{
						disabled: _this3.props.disabled || value.clearableValue === false,
						key: 'value-' + i + '-' + value[_this3.props.valueKey],
						onClick: _this3.handleValueClick,
						onRemove: _this3.removeValue,
						value: value
					},
					renderLabel(value)
				);
			});
		} else if (!this.state.inputValue) {
			return _react2['default'].createElement(
				ValueComponent,
				{
					disabled: this.props.disabled,
					onClick: isOpen ? null : this.handleValueClick,
					value: valueArray[0]
				},
				renderLabel(valueArray[0])
			);
		}
	},

	renderInput: function renderInput(valueArray) {
		var className = (0, _classnames2['default'])('Select-input', this.props.inputProps.className);
		if (this.props.disabled || !this.props.searchable) {
			return _react2['default'].createElement('div', _extends({}, this.props.inputProps, {
				className: className,
				tabIndex: this.props.tabIndex || 0,
				onBlur: this.handleInputBlur,
				onFocus: this.handleInputFocus,
				ref: 'input',
				style: { border: 0, width: 1, display: 'inline-block' }
			}));
		}
		return _react2['default'].createElement(_reactInputAutosize2['default'], _extends({}, this.props.inputProps, {
			className: className,
			tabIndex: this.props.tabIndex,
			onBlur: this.handleInputBlur,
			onChange: this.handleInputChange,
			onFocus: this.handleInputFocus,
			minWidth: '5',
			ref: 'input',
			value: this.state.inputValue
		}));
	},

	renderClear: function renderClear() {
		if (!this.props.clearable || !this.props.value || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
		return _react2['default'].createElement(
			'span',
			{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText, 'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText, onMouseDown: this.clearValue, onTouchEnd: this.clearValue },
			_react2['default'].createElement('span', { className: 'Select-clear', dangerouslySetInnerHTML: { __html: '&times;' } })
		);
	},

	renderArrow: function renderArrow() {
		return _react2['default'].createElement(
			'span',
			{ className: 'Select-arrow-zone', onMouseDown: this.handleMouseDownOnArrow },
			_react2['default'].createElement('span', { className: 'Select-arrow', onMouseDown: this.handleMouseDownOnArrow })
		);
	},

	renderMenu: function renderMenu(options, valueArray, focusedOption) {
		var _this4 = this;

		if (options && options.length) {
			var _ret = (function () {
				var Option = _this4.props.optionComponent;
				var renderLabel = _this4.props.optionRenderer || _this4.getOptionLabel;
				return {
					v: options.map(function (option, i) {
						var isSelected = valueArray && valueArray.indexOf(option) > -1;
						var isFocused = option === focusedOption;
						var optionRef = isFocused ? 'focused' : null;
						var optionClass = (0, _classnames2['default'])({
							'Select-option': true,
							'is-selected': isSelected,
							'is-focused': isFocused,
							'is-disabled': option.disabled
						});
						return _react2['default'].createElement(Option, {
							className: optionClass,
							isDisabled: option.disabled,
							isFocused: isFocused,
							key: 'option-' + i + '-' + option[_this4.props.valueKey],
							onSelect: _this4.selectValue,
							onFocus: _this4.focusOption,
							option: option,
							isSelected: isSelected,
							ref: optionRef,
							renderLabel: renderLabel
						});
					})
				};
			})();

			if (typeof _ret === 'object') return _ret.v;
		} else {
			return _react2['default'].createElement(
				'div',
				{ className: 'Select-noresults' },
				this.props.noResultsText
			);
		}
	},

	renderHiddenField: function renderHiddenField(valueArray) {
		var _this5 = this;

		if (!this.props.name) return;
		var value = valueArray.map(function (i) {
			return stringifyValue(i[_this5.props.valueKey]);
		}).join(this.props.delimiter);
		return _react2['default'].createElement('input', { type: 'hidden', ref: 'value', name: this.props.name, value: value, disabled: this.props.disabled });
	},

	getFocusableOption: function getFocusableOption(selectedOption) {
		var options = this.state.visibleOptions;
		if (!options.length) return;
		var focusedOption = this.state.focusedOption || selectedOption;
		if (focusedOption && options.indexOf(focusedOption) > -1) return focusedOption;
		for (var i = 0; i < options.length; i++) {
			if (!options[i].disabled) return options[i];
		}
	},

	render: function render() {
		var _state2 = this.state;
		var hasBeenOpened = _state2.hasBeenOpened;
		var valueArray = _state2.valueArray;

		var options = this.state.visibleOptions;
		var isOpen = this.state.isOpen;
		if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
		var focusedOption = this._focusedOption = this.getFocusableOption(valueArray[0]);
		var className = (0, _classnames2['default'])('Select', this.props.className, {
			'Select--multi': this.props.multi,
			'is-disabled': this.props.disabled,
			'is-focused': this.state.isFocused,
			'is-loading': this.props.isLoading,
			'is-open': isOpen,
			'is-pseudo-focused': this.state.isPseudoFocused,
			'is-searchable': this.props.searchable,
			'has-value': valueArray.length
		});
		var menuStyle = _extends({
			display: isOpen ? undefined : 'none'
		}, this.props.menuStyle);
		return _react2['default'].createElement(
			'div',
			{ ref: 'wrapper', className: className, style: this.props.wrapperStyle },
			this.renderHiddenField(valueArray),
			_react2['default'].createElement(
				'div',
				{ ref: 'control', className: 'Select-control', style: this.props.style, onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.renderValue(valueArray, isOpen),
				this.renderInput(valueArray),
				this.renderLoading(),
				this.renderClear(),
				this.renderArrow()
			),
			
			// Only render options if the menu has been opened before. This saves
			// rendering in the case that the user will never open the menu.
			hasBeenOpened && _react2['default'].createElement(
				'div',
				{ ref: 'menuContainer', className: 'Select-menu-outer',
					style: this.props.menuContainerStyle
				},
				_react2['default'].createElement(
					'div',
					{ ref: 'menu', className: 'Select-menu',
						style: menuStyle,
						onScroll: this.handleMenuScroll,
						onMouseDown: this.handleMouseDownOnMenu
					},
					this.renderMenu(options, !this.props.multi ? valueArray : null, focusedOption)
				)
			)
		);
	}

});

exports['default'] = Select;
module.exports = exports['default'];