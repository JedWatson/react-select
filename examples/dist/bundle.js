require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _utilsStripDiacritics = require('./utils/stripDiacritics');

var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);

var propTypes = {
	autoload: _propTypes2['default'].bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: _propTypes2['default'].any, // object to use to cache results; set to null/false to disable caching
	children: _propTypes2['default'].func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: _propTypes2['default'].bool, // strip diacritics when filtering; defaults to true
	ignoreCase: _propTypes2['default'].bool, // perform case-insensitive filtering; defaults to true
	loadingPlaceholder: _propTypes2['default'].oneOfType([// replaces the placeholder while options are loading
	_propTypes2['default'].string, _propTypes2['default'].node]),
	loadOptions: _propTypes2['default'].func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	multi: _propTypes2['default'].bool, // multi-value input
	options: _propTypes2['default'].array.isRequired, // array of options
	placeholder: _propTypes2['default'].oneOfType([// field placeholder, displayed when there's no value (shared with Select)
	_propTypes2['default'].string, _propTypes2['default'].node]),
	noResultsText: _propTypes2['default'].oneOfType([// field noResultsText, displayed when no options come back from the server
	_propTypes2['default'].string, _propTypes2['default'].node]),
	onChange: _propTypes2['default'].func, // onChange handler: function (newValue) {}
	searchPromptText: _propTypes2['default'].oneOfType([// label to prompt for search input
	_propTypes2['default'].string, _propTypes2['default'].node]),
	onInputChange: _propTypes2['default'].func, // optional for keeping track of what is being typed
	value: _propTypes2['default'].any };

// initial field value
var defaultCache = {};

var defaultProps = {
	autoload: true,
	cache: defaultCache,
	children: defaultChildren,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	searchPromptText: 'Type to search'
};

var Async = (function (_Component) {
	_inherits(Async, _Component);

	function Async(props, context) {
		_classCallCheck(this, Async);

		_get(Object.getPrototypeOf(Async.prototype), 'constructor', this).call(this, props, context);

		this._cache = props.cache === defaultCache ? {} : props.cache;

		this.state = {
			isLoading: false,
			options: props.options
		};

		this._onInputChange = this._onInputChange.bind(this);
	}

	_createClass(Async, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var autoload = this.props.autoload;

			if (autoload) {
				this.loadOptions('');
			}
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			var _this = this;

			var propertiesToSync = ['options'];
			propertiesToSync.forEach(function (prop) {
				if (_this.props[prop] !== nextProps[prop]) {
					_this.setState(_defineProperty({}, prop, nextProps[prop]));
				}
			});
		}
	}, {
		key: 'clearOptions',
		value: function clearOptions() {
			this.setState({ options: [] });
		}
	}, {
		key: 'loadOptions',
		value: function loadOptions(inputValue) {
			var _this2 = this;

			var loadOptions = this.props.loadOptions;

			var cache = this._cache;

			if (cache && cache.hasOwnProperty(inputValue)) {
				this.setState({
					options: cache[inputValue]
				});

				return;
			}

			var callback = function callback(error, data) {
				if (callback === _this2._callback) {
					_this2._callback = null;

					var options = data && data.options || [];

					if (cache) {
						cache[inputValue] = options;
					}

					_this2.setState({
						isLoading: false,
						options: options
					});
				}
			};

			// Ignore all but the most recent request
			this._callback = callback;

			var promise = loadOptions(inputValue, callback);
			if (promise) {
				promise.then(function (data) {
					return callback(null, data);
				}, function (error) {
					return callback(error);
				});
			}

			if (this._callback && !this.state.isLoading) {
				this.setState({
					isLoading: true
				});
			}

			return inputValue;
		}
	}, {
		key: '_onInputChange',
		value: function _onInputChange(inputValue) {
			var _props = this.props;
			var ignoreAccents = _props.ignoreAccents;
			var ignoreCase = _props.ignoreCase;
			var onInputChange = _props.onInputChange;

			if (ignoreAccents) {
				inputValue = (0, _utilsStripDiacritics2['default'])(inputValue);
			}

			if (ignoreCase) {
				inputValue = inputValue.toLowerCase();
			}

			if (onInputChange) {
				onInputChange(inputValue);
			}

			return this.loadOptions(inputValue);
		}
	}, {
		key: 'inputValue',
		value: function inputValue() {
			if (this.select) {
				return this.select.state.inputValue;
			}
			return '';
		}
	}, {
		key: 'noResultsText',
		value: function noResultsText() {
			var _props2 = this.props;
			var loadingPlaceholder = _props2.loadingPlaceholder;
			var noResultsText = _props2.noResultsText;
			var searchPromptText = _props2.searchPromptText;
			var isLoading = this.state.isLoading;

			var inputValue = this.inputValue();

			if (isLoading) {
				return loadingPlaceholder;
			}
			if (inputValue && noResultsText) {
				return noResultsText;
			}
			return searchPromptText;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props3 = this.props;
			var children = _props3.children;
			var loadingPlaceholder = _props3.loadingPlaceholder;
			var placeholder = _props3.placeholder;
			var _state = this.state;
			var isLoading = _state.isLoading;
			var options = _state.options;

			var props = {
				noResultsText: this.noResultsText(),
				placeholder: isLoading ? loadingPlaceholder : placeholder,
				options: isLoading && loadingPlaceholder ? [] : options,
				ref: function ref(_ref) {
					return _this3.select = _ref;
				},
				onChange: function onChange(newValues) {
					if (_this3.props.multi && _this3.props.value && newValues.length > _this3.props.value.length) {
						_this3.clearOptions();
					}
					_this3.props.onChange(newValues);
				}
			};

			return children(_extends({}, this.props, props, {
				isLoading: isLoading,
				onInputChange: this._onInputChange
			}));
		}
	}]);

	return Async;
})(_react.Component);

exports['default'] = Async;

Async.propTypes = propTypes;
Async.defaultProps = defaultProps;

function defaultChildren(props) {
	return _react2['default'].createElement(_Select2['default'], props);
}
module.exports = exports['default'];

},{"./Select":"minimal-react-select","./utils/stripDiacritics":10,"prop-types":undefined,"react":undefined}],2:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

function reduce(obj) {
	var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	return Object.keys(obj).reduce(function (props, key) {
		var value = obj[key];
		if (value !== undefined) props[key] = value;
		return props;
	}, props);
}

var AsyncCreatable = (0, _createReactClass2['default'])({
	displayName: 'AsyncCreatableSelect',

	focus: function focus() {
		this.select.focus();
	},

	render: function render() {
		var _this = this;

		return _react2['default'].createElement(
			_Select2['default'].Async,
			this.props,
			function (asyncProps) {
				return _react2['default'].createElement(
					_Select2['default'].Creatable,
					_this.props,
					function (creatableProps) {
						return _react2['default'].createElement(_Select2['default'], _extends({}, reduce(asyncProps, reduce(creatableProps, {})), {
							onInputChange: function (input) {
								creatableProps.onInputChange(input);
								return asyncProps.onInputChange(input);
							},
							ref: function (ref) {
								_this.select = ref;
								creatableProps.ref(ref);
								asyncProps.ref(ref);
							}
						}));
					}
				);
			}
		);
	}
});

module.exports = AsyncCreatable;

},{"./Select":"minimal-react-select","create-react-class":undefined,"react":undefined}],3:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _utilsDefaultFilterOptions = require('./utils/defaultFilterOptions');

var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

var _utilsDefaultMenuRenderer = require('./utils/defaultMenuRenderer');

var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

var Creatable = (0, _createReactClass2['default'])({
	displayName: 'CreatableSelect',

	propTypes: {
		// Child function responsible for creating the inner Select component
		// This component can be used to compose HOCs (eg Creatable and Async)
		// (props: Object): PropTypes.element
		children: _propTypes2['default'].func,

		// See Select.propTypes.filterOptions
		filterOptions: _propTypes2['default'].any,

		// Searches for any matching option within the set of options.
		// This function prevents duplicate options from being created.
		// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
		isOptionUnique: _propTypes2['default'].func,

		// Determines if the current input text represents a valid option.
		// ({ label: string }): boolean
		isValidNewOption: _propTypes2['default'].func,

		// See Select.propTypes.menuRenderer
		menuRenderer: _propTypes2['default'].any,

		// Factory to create new option.
		// ({ label: string, labelKey: string, valueKey: string }): Object
		newOptionCreator: _propTypes2['default'].func,

		// input change handler: function (inputValue) {}
		onInputChange: _propTypes2['default'].func,

		// input keyDown handler: function (event) {}
		onInputKeyDown: _propTypes2['default'].func,

		// new option click handler: function (option) {}
		onNewOptionClick: _propTypes2['default'].func,

		// See Select.propTypes.options
		options: _propTypes2['default'].array,

		// Creates prompt/placeholder option text.
		// (filterText: string): string
		promptTextCreator: _propTypes2['default'].func,

		// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
		shouldKeyDownEventCreateNewOption: _propTypes2['default'].func
	},

	// Default prop methods
	statics: {
		isOptionUnique: isOptionUnique,
		isValidNewOption: isValidNewOption,
		newOptionCreator: newOptionCreator,
		promptTextCreator: promptTextCreator,
		shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
	},

	getDefaultProps: function getDefaultProps() {
		return {
			filterOptions: _utilsDefaultFilterOptions2['default'],
			isOptionUnique: isOptionUnique,
			isValidNewOption: isValidNewOption,
			menuRenderer: _utilsDefaultMenuRenderer2['default'],
			newOptionCreator: newOptionCreator,
			promptTextCreator: promptTextCreator,
			shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
		};
	},

	createNewOption: function createNewOption() {
		var _props = this.props;
		var isValidNewOption = _props.isValidNewOption;
		var newOptionCreator = _props.newOptionCreator;
		var onNewOptionClick = _props.onNewOptionClick;
		var _props$options = _props.options;
		var options = _props$options === undefined ? [] : _props$options;
		var shouldKeyDownEventCreateNewOption = _props.shouldKeyDownEventCreateNewOption;

		if (isValidNewOption({ label: this.inputValue })) {
			var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
			var _isOptionUnique = this.isOptionUnique({ option: option });

			// Don't add the same option twice.
			if (_isOptionUnique) {
				if (onNewOptionClick) {
					onNewOptionClick(option);
					// Closes the menu when a new option is clicked. Clears the input values if onCloseResetsInput is set to true {default: true}.
					// this.select.closeMenu();
					// Remove requiredMsg
					this.select.removeRequiredMsg();
				} else {
					options.unshift(option);

					this.select.selectValue(option);
				}
			}
		}
	},

	filterOptions: function filterOptions() {
		var _props2 = this.props;
		var filterOptions = _props2.filterOptions;
		var isValidNewOption = _props2.isValidNewOption;
		var options = _props2.options;
		var promptTextCreator = _props2.promptTextCreator;

		// TRICKY Check currently selected options as well.
		// Don't display a create-prompt for a value that's selected.
		// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.
		var excludeOptions = arguments[2] || [];

		var filteredOptions = filterOptions.apply(undefined, arguments) || [];

		if (isValidNewOption({ label: this.inputValue })) {
			var _newOptionCreator = this.props.newOptionCreator;

			var option = _newOptionCreator({
				label: this.inputValue,
				labelKey: this.labelKey,
				valueKey: this.valueKey
			});

			// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
			// For multi-selects, this would remove it from the filtered list.
			var _isOptionUnique2 = this.isOptionUnique({
				option: option,
				options: excludeOptions.concat(filteredOptions)
			});

			if (_isOptionUnique2) {
				var _prompt = promptTextCreator(this.inputValue);

				this._createPlaceholderOption = _newOptionCreator({
					label: _prompt,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				filteredOptions.unshift(this._createPlaceholderOption);
			}
		}

		return filteredOptions;
	},

	isOptionUnique: function isOptionUnique(_ref2) {
		var option = _ref2.option;
		var options = _ref2.options;
		var isOptionUnique = this.props.isOptionUnique;

		options = options || this.select.filterOptions();

		return isOptionUnique({
			labelKey: this.labelKey,
			option: option,
			options: options,
			valueKey: this.valueKey
		});
	},

	menuRenderer: function menuRenderer(params) {
		var menuRenderer = this.props.menuRenderer;

		return menuRenderer(_extends({}, params, {
			onSelect: this.onOptionSelect,
			selectValue: this.onOptionSelect
		}));
	},

	onInputChange: function onInputChange(input) {
		var onInputChange = this.props.onInputChange;

		if (onInputChange) {
			onInputChange(input);
		}

		// This value may be needed in between Select mounts (when this.select is null)
		this.inputValue = input;
	},

	onInputKeyDown: function onInputKeyDown(event) {
		var _props3 = this.props;
		var shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption;
		var onInputKeyDown = _props3.onInputKeyDown;

		var focusedOption = this.select.getFocusedOption();

		if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
			this.createNewOption();

			// Prevent decorated Select from doing anything additional with this keyDown event
			event.preventDefault();
		} else if (onInputKeyDown) {
			onInputKeyDown(event);
		}
	},

	onOptionSelect: function onOptionSelect(option, event) {
		if (option === this._createPlaceholderOption) {
			this.createNewOption();
		} else {
			this.select.selectValue(option);
		}
	},

	focus: function focus() {
		this.select.focus();
	},

	render: function render() {
		var _this = this;

		var _props4 = this.props;
		var newOptionCreator = _props4.newOptionCreator;
		var shouldKeyDownEventCreateNewOption = _props4.shouldKeyDownEventCreateNewOption;

		var restProps = _objectWithoutProperties(_props4, ['newOptionCreator', 'shouldKeyDownEventCreateNewOption']);

		var children = this.props.children;

		// We can't use destructuring default values to set the children,
		// because it won't apply work if `children` is null. A falsy check is
		// more reliable in real world use-cases.
		if (!children) {
			children = defaultChildren;
		}

		var props = _extends({}, restProps, {
			allowCreate: true,
			filterOptions: this.filterOptions,
			menuRenderer: this.menuRenderer,
			onInputChange: this.onInputChange,
			onInputKeyDown: this.onInputKeyDown,
			ref: function ref(_ref) {
				_this.select = _ref;

				// These values may be needed in between Select mounts (when this.select is null)
				if (_ref) {
					_this.labelKey = _ref.props.labelKey;
					_this.valueKey = _ref.props.valueKey;
				}
			}
		});

		return children(props);
	}
});

function defaultChildren(props) {
	return _react2['default'].createElement(_Select2['default'], props);
};

function isOptionUnique(_ref3) {
	var option = _ref3.option;
	var options = _ref3.options;
	var labelKey = _ref3.labelKey;
	var valueKey = _ref3.valueKey;

	return options.filter(function (existingOption) {
		return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
	}).length === 0;
};

function isValidNewOption(_ref4) {
	var label = _ref4.label;

	return !!label;
};

function newOptionCreator(_ref5) {
	var label = _ref5.label;
	var labelKey = _ref5.labelKey;
	var valueKey = _ref5.valueKey;

	var option = {};
	option[valueKey] = label;
	option[labelKey] = label;
	option.className = 'Select-create-option-placeholder';
	return option;
};

function promptTextCreator(label) {
	return 'Create option "' + label + '"';
}

function shouldKeyDownEventCreateNewOption(_ref6) {
	var keyCode = _ref6.keyCode;

	switch (keyCode) {
		case 9: // TAB
		case 13: // ENTER
		case 188:
			// COMMA
			return true;
	}

	return false;
};

module.exports = Creatable;

},{"./Select":"minimal-react-select","./utils/defaultFilterOptions":8,"./utils/defaultMenuRenderer":9,"create-react-class":undefined,"prop-types":undefined,"react":undefined}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Option = (0, _createReactClass2['default'])({
	propTypes: {
		children: _propTypes2['default'].node,
		className: _propTypes2['default'].string, // className (based on mouse position)
		instancePrefix: _propTypes2['default'].string.isRequired, // unique prefix for the ids (used for aria)
		isDisabled: _propTypes2['default'].bool, // the option is disabled
		isFocused: _propTypes2['default'].bool, // the option is focused
		isSelected: _propTypes2['default'].bool, // the option is selected
		onFocus: _propTypes2['default'].func, // method to handle mouseEnter on option element
		onSelect: _propTypes2['default'].func, // method to handle click on option element
		onUnfocus: _propTypes2['default'].func, // method to handle mouseLeave on option element
		option: _propTypes2['default'].object.isRequired, // object that is base for that option
		optionIndex: _propTypes2['default'].number },
	// index of the option, used to generate unique ids for aria
	blockEvent: function blockEvent(event) {
		event.preventDefault();
		event.stopPropagation();
		if (event.target.tagName !== 'A' || !('href' in event.target)) {
			return;
		}
		if (event.target.target) {
			window.open(event.target.href, event.target.target);
		} else {
			window.location.href = event.target.href;
		}
	},

	handleMouseDown: function handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},

	handleMouseEnter: function handleMouseEnter(event) {
		this.onFocus(event);
	},

	handleMouseMove: function handleMouseMove(event) {
		this.onFocus(event);
	},

	handleTouchEnd: function handleTouchEnd(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		this.handleMouseDown(event);
	},

	handleTouchMove: function handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	},

	handleTouchStart: function handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	},

	onFocus: function onFocus(event) {
		if (!this.props.isFocused) {
			this.props.onFocus(this.props.option, event);
		}
	},
	handleOptionDelete: function handleOptionDelete(event) {
		event.preventDefault();
		event.stopPropagation();
		return this.props.onDelete(this.props.option, event);
	},
	handleOptionDeleteTouchEnd: function handleOptionDeleteTouchEnd(event) {
		if (this.dragging) return;
		event.preventDefault();
		event.stopPropagation();
		return this.props.onDelete(this.props.option, event);
	},
	render: function render() {
		var _props = this.props;
		var option = _props.option;
		var instancePrefix = _props.instancePrefix;
		var optionIndex = _props.optionIndex;
		var deletable = _props.deletable;

		var className = (0, _classnames2['default'])(this.props.className, option.className);

		return deletable ? option.disabled ? _react2['default'].createElement(
			'div',
			{ className: className,
				onMouseDown: this.blockEvent,
				onClick: this.blockEvent },
			_react2['default'].createElement(
				'span',
				{ className: 'Select-clear Select-clear-menu', onMouseDown: this.handleOptionDelete },
				'x'
			),
			this.props.children
		) : _react2['default'].createElement(
			'div',
			{ className: className,
				style: option.style,
				role: 'option',
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEnd,
				id: instancePrefix + '-option-' + optionIndex,
				title: option.title },
			_react2['default'].createElement(
				'span',
				{ className: 'Select-clear Select-clear-menu', onMouseDown: this.handleOptionDelete, onTouchEnd: this.handleOptionDeleteTouchEnd },
				'x'
			),
			this.props.children
		) : option.disabled ? _react2['default'].createElement(
			'div',
			{ className: className,
				onMouseDown: this.blockEvent,
				onClick: this.blockEvent },
			this.props.children
		) : _react2['default'].createElement(
			'div',
			{ className: className,
				style: option.style,
				role: 'option',
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEnd,
				id: instancePrefix + '-option-' + optionIndex,
				title: option.title },
			this.props.children
		);
	}
});

module.exports = Option;

},{"classnames":undefined,"create-react-class":undefined,"prop-types":undefined,"react":undefined}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Value = (0, _createReactClass2['default'])({

	displayName: 'Value',

	propTypes: {
		children: _propTypes2['default'].node,
		disabled: _propTypes2['default'].bool, // disabled prop passed to ReactSelect
		id: _propTypes2['default'].string, // Unique id for the value - used for aria
		onClick: _propTypes2['default'].func, // method to handle click on value label
		onRemove: _propTypes2['default'].func, // method to handle removal of the value
		value: _propTypes2['default'].object.isRequired },

	// the option object for this value
	handleMouseDown: function handleMouseDown(event) {
		if (event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		if (this.props.onClick) {
			event.stopPropagation();
			this.props.onClick(this.props.value, event);
			return;
		}
		if (this.props.value.href) {
			event.stopPropagation();
		}
	},

	onRemove: function onRemove(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onRemove(this.props.value);
	},

	handleTouchEndRemove: function handleTouchEndRemove(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Fire the mouse events
		this.onRemove(event);
	},

	handleTouchMove: function handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	},

	handleTouchStart: function handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	},

	renderRemoveIcon: function renderRemoveIcon() {
		if (this.props.disabled || !this.props.onRemove) return;
		return _react2['default'].createElement(
			'span',
			{ className: 'Select-value-icon',
				'aria-hidden': 'true',
				onMouseDown: this.onRemove,
				onTouchEnd: this.handleTouchEndRemove,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove },
			'×'
		);
	},

	renderLabel: function renderLabel() {
		var className = 'Select-value-label';
		return this.props.onClick || this.props.value.href ? _react2['default'].createElement(
			'a',
			{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
			this.props.children
		) : _react2['default'].createElement(
			'span',
			{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
			this.props.children
		);
	},

	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: (0, _classnames2['default'])('Select-value', this.props.value.className),
				style: this.props.value.style,
				title: this.props.value.title
			},
			this.renderRemoveIcon(),
			this.renderLabel()
		);
	}

});

module.exports = Value;

},{"classnames":undefined,"create-react-class":undefined,"prop-types":undefined,"react":undefined}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = arrowRenderer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function arrowRenderer(_ref) {
	var onMouseDown = _ref.onMouseDown;

	return _react2["default"].createElement("span", {
		className: "Select-arrow",
		onMouseDown: onMouseDown
	});
}

;
module.exports = exports["default"];

},{"react":undefined}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = clearRenderer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function clearRenderer() {
	return _react2['default'].createElement('span', {
		className: 'Select-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
}

;
module.exports = exports['default'];

},{"react":undefined}],8:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stripDiacritics = require('./stripDiacritics');

var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

function filterOptions(options, filterValue, excludeOptions, props) {
	var _this = this;

	if (props.ignoreAccents) {
		filterValue = (0, _stripDiacritics2['default'])(filterValue);
	}

	if (props.ignoreCase) {
		filterValue = filterValue.toLowerCase();
	}

	if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
		return i[props.valueKey];
	});

	return options.filter(function (option) {
		if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(_this, option, filterValue);
		if (!filterValue) return true;
		var valueTest = String(option[props.valueKey]);
		var labelTest = String(option[props.labelKey]);
		if (props.ignoreAccents) {
			if (props.matchProp !== 'label') valueTest = (0, _stripDiacritics2['default'])(valueTest);
			if (props.matchProp !== 'value') labelTest = (0, _stripDiacritics2['default'])(labelTest);
		}
		if (props.ignoreCase) {
			if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}
		return props.matchPos === 'start' ? props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
	});
}

module.exports = filterOptions;

},{"./stripDiacritics":10}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption;
	var instancePrefix = _ref.instancePrefix;
	var labelKey = _ref.labelKey;
	var onFocus = _ref.onFocus;
	var onSelect = _ref.onSelect;
	var onDelete = _ref.onDelete;
	var deletable = _ref.deletable;
	var optionClassName = _ref.optionClassName;
	var optionComponent = _ref.optionComponent;
	var optionRenderer = _ref.optionRenderer;
	var options = _ref.options;
	var valueArray = _ref.valueArray;
	var valueKey = _ref.valueKey;
	var onOptionRef = _ref.onOptionRef;

	var Option = optionComponent;

	return options.map(function (option, i) {
		var isSelected = valueArray && valueArray.indexOf(option) > -1;
		var isFocused = option === focusedOption;
		var optionClass = (0, _classnames2['default'])(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});

		return _react2['default'].createElement(
			Option,
			{
				className: optionClass,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				onDelete: onDelete,
				deletable: deletable,
				option: option,
				optionIndex: i,
				ref: function (ref) {
					onOptionRef(ref, isFocused);
				}
			},
			optionRenderer(option, i)
		);
	});
}

module.exports = menuRenderer;

},{"classnames":undefined,"react":undefined}],10:[function(require,module,exports){
'use strict';

var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

module.exports = function stripDiacritics(str) {
	for (var i = 0; i < map.length; i++) {
		str = str.replace(map[i].letters, map[i].base);
	}
	return str;
};

},{}],"minimal-react-select":[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactInputAutosize = require('react-input-autosize');

var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDefaultArrowRenderer = require('./utils/defaultArrowRenderer');

var _utilsDefaultArrowRenderer2 = _interopRequireDefault(_utilsDefaultArrowRenderer);

var _utilsDefaultFilterOptions = require('./utils/defaultFilterOptions');

var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

var _utilsDefaultMenuRenderer = require('./utils/defaultMenuRenderer');

var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

var _utilsDefaultClearRenderer = require('./utils/defaultClearRenderer');

var _utilsDefaultClearRenderer2 = _interopRequireDefault(_utilsDefaultClearRenderer);

var _Async = require('./Async');

var _Async2 = _interopRequireDefault(_Async);

var _AsyncCreatable = require('./AsyncCreatable');

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _Creatable = require('./Creatable');

var _Creatable2 = _interopRequireDefault(_Creatable);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _Value = require('./Value');

var _Value2 = _interopRequireDefault(_Value);

function stringifyValue(value) {
	var valueType = typeof value;
	if (valueType === 'string') {
		return value;
	} else if (valueType === 'object') {
		return JSON.stringify(value);
	} else if (valueType === 'number' || valueType === 'boolean') {
		return String(value);
	} else {
		return '';
	}
}

var stringOrNode = _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].node]);

var instanceId = 1;

var Select = (0, _createReactClass2['default'])({

	displayName: 'Select',

	propTypes: {
		addLabelText: _propTypes2['default'].string, // placeholder displayed when you want to add a label on a multi-value input
		'aria-describedby': _propTypes2['default'].string, // HTML ID(s) of element(s) that should be used to describe this input (for assistive tech)
		'aria-label': _propTypes2['default'].string, // Aria label (for assistive tech)
		'aria-labelledby': _propTypes2['default'].string, // HTML ID of an element that should be used as the label (for assistive tech)
		arrowRenderer: _propTypes2['default'].func, // Create drop-down caret element
		autoBlur: _propTypes2['default'].bool, // automatically blur the component when an option is selected
		autofocus: _propTypes2['default'].bool, // autofocus the component on mount
		autosize: _propTypes2['default'].bool, // whether to enable autosizing or not
		backspaceRemoves: _propTypes2['default'].bool, // whether backspace removes an item if there is no text input
		backspaceToRemoveMessage: _propTypes2['default'].string, // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
		className: _propTypes2['default'].string, // className for the outer element
		clearAllText: stringOrNode, // title for the "clear" control when multi: true
		clearRenderer: _propTypes2['default'].func, // create clearable x element
		clearValueText: stringOrNode, // title for the "clear" control
		clearable: _propTypes2['default'].bool, // should it be possible to reset value
		deletable: _propTypes2['default'].bool, // shows x button to remove options from menu
		deleteRemoves: _propTypes2['default'].bool, // whether backspace removes an item if there is no text input
		deleteOption: _propTypes2['default'].func, // handles the memu option delete. Takes the clicked option obj as argument
		delimiter: _propTypes2['default'].string, // delimiter to use to join multiple values for the hidden field value
		disabled: _propTypes2['default'].bool, // whether the Select is disabled or not
		escapeClearsValue: _propTypes2['default'].bool, // whether escape clears the value when the menu is closed
		filterOption: _propTypes2['default'].func, // method to filter a single option (option, filterString)
		filterOptions: _propTypes2['default'].any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
		ignoreAccents: _propTypes2['default'].bool, // whether to strip diacritics when filtering
		ignoreCase: _propTypes2['default'].bool, // whether to perform case-insensitive filtering
		inputProps: _propTypes2['default'].object, // custom attributes for the Input
		inputRenderer: _propTypes2['default'].func, // returns a custom input component
		instanceId: _propTypes2['default'].string, // set the components instanceId
		isLoading: _propTypes2['default'].bool, // whether the Select is loading externally or not (such as options being loaded)
		isRequired: _propTypes2['default'].bool, // custom styling in the label if there is not a value at onBlur
		joinValues: _propTypes2['default'].bool, // joins multiple values into a single form field with the delimiter (legacy mode)
		labelKey: _propTypes2['default'].string, // path of the label value in option objects
		matchPos: _propTypes2['default'].string, // (any|start) match the start or entire string when filtering
		matchProp: _propTypes2['default'].string, // (any|label|value) which option property to filter on
		menuBuffer: _propTypes2['default'].number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
		menuContainerStyle: _propTypes2['default'].object, // optional style to apply to the menu container
		menuRenderer: _propTypes2['default'].func, // renders a custom menu with options
		menuStyle: _propTypes2['default'].object, // optional style to apply to the menu
		multi: _propTypes2['default'].bool, // multi-value input
		name: _propTypes2['default'].string, // generates a hidden <input /> tag with this field name for html forms
		noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
		onBlur: _propTypes2['default'].func, // onBlur handler: function (event) {}
		onBlurResetsInput: _propTypes2['default'].bool, // whether input is cleared on blur
		onChange: _propTypes2['default'].func, // onChange handler: function (newValue) {}
		onClose: _propTypes2['default'].func, // fires when the menu is closed
		onCloseResetsInput: _propTypes2['default'].bool, // whether input is cleared when menu is closed through the arrow
		onFocus: _propTypes2['default'].func, // onFocus handler: function (event) {}
		onInputChange: _propTypes2['default'].func, // onInputChange handler: function (inputValue) {}
		onInputKeyDown: _propTypes2['default'].func, // input keyDown handler: function (event) {}
		onMenuScrollToBottom: _propTypes2['default'].func, // fires when the menu is scrolled to the bottom; can be used to paginate options
		onOpen: _propTypes2['default'].func, // fires when the menu is opened
		onValueClick: _propTypes2['default'].func, // onClick handler for value labels: function (value, event) {}
		openAfterFocus: _propTypes2['default'].bool, // boolean to enable opening dropdown when focused
		openOnFocus: _propTypes2['default'].bool, // always open options menu on focus
		optionClassName: _propTypes2['default'].string, // additional class(es) to apply to the <Option /> elements
		optionComponent: _propTypes2['default'].func, // option component to render in dropdown
		optionRenderer: _propTypes2['default'].func, // optionRenderer: function (option) {}
		options: _propTypes2['default'].array, // array of options
		pageSize: _propTypes2['default'].number, // number of entries to page when using page up/down keys
		placeholder: stringOrNode, // field placeholder, displayed when there's no value
		required: _propTypes2['default'].bool, // applies HTML5 required attribute when needed
		resetValue: _propTypes2['default'].any, // value to use when you clear the control
		scrollMenuIntoView: _propTypes2['default'].bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
		searchable: _propTypes2['default'].bool, // whether to enable searching feature or not
		selectLabel: _propTypes2['default'].string, // The field title
		simpleValue: _propTypes2['default'].bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
		style: _propTypes2['default'].object, // optional style to apply to the control
		tabIndex: _propTypes2['default'].string, // optional tab index of the control
		tabSelectsValue: _propTypes2['default'].bool, // whether to treat tabbing out while focused to be value selection
		theme: _propTypes2['default'].string, // made for dark themes. If set to true the component style will switch for dark backgrounds
		value: _propTypes2['default'].any, // initial field value
		valueComponent: _propTypes2['default'].func, // value component to render
		valueKey: _propTypes2['default'].string, // path of the label value in option objects
		valueRenderer: _propTypes2['default'].func, // valueRenderer: function (option) {}
		wrapperStyle: _propTypes2['default'].object },

	// optional style to apply to the component wrapper
	statics: { Async: _Async2['default'], AsyncCreatable: _AsyncCreatable2['default'], Creatable: _Creatable2['default'] },

	getDefaultProps: function getDefaultProps() {
		return {
			addLabelText: 'Add "{label}"?',
			arrowRenderer: _utilsDefaultArrowRenderer2['default'],
			autosize: true,
			backspaceRemoves: true,
			backspaceToRemoveMessage: 'Press backspace to remove {label}',
			clearable: true,
			clearAllText: 'Clear all',
			clearRenderer: _utilsDefaultClearRenderer2['default'],
			clearValueText: 'Clear value',
			deletable: true,
			deleteRemoves: true,
			delimiter: ',',
			disabled: false,
			escapeClearsValue: true,
			filterOptions: _utilsDefaultFilterOptions2['default'],
			ignoreAccents: true,
			ignoreCase: true,
			inputProps: {},
			isLoading: false,
			isRequired: false,
			joinValues: false,
			labelKey: 'label',
			matchPos: 'any',
			matchProp: 'any',
			menuBuffer: 0,
			menuRenderer: _utilsDefaultMenuRenderer2['default'],
			multi: false,
			noResultsText: 'No results found',
			onBlurResetsInput: true,
			onCloseResetsInput: true,
			optionComponent: _Option2['default'],
			pageSize: 5,
			placeholder: 'Select...',
			required: false,
			scrollMenuIntoView: true,
			searchable: true,
			simpleValue: false,
			tabSelectsValue: true,
			theme: '',
			valueComponent: _Value2['default'],
			valueKey: 'value'
		};
	},

	getInitialState: function getInitialState() {
		// var fValue = '';
		// if (!this.props.multi && this.props.searchable && this.props.value) {
		// 	fValue = this.props.value;
		// }
		return {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false,
			showRequiredMsg: false
		};
	},

	componentWillMount: function componentWillMount() {
		this._instancePrefix = 'minimal-react-select-' + (this.props.instanceId || ++instanceId) + '-';
		var valueArray = this.getValueArray(this.props.value);

		if (this.props.required) {
			this.setState({
				required: this.handleRequired(valueArray[0], this.props.multi)
			});
		}
	},

	componentDidMount: function componentDidMount() {
		if (this.props.autofocus) {
			this.focus();
		}
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var valueArray = this.getValueArray(nextProps.value, nextProps);

		if (nextProps.required) {
			this.setState({
				required: this.handleRequired(valueArray[0], nextProps.multi)
			});
		}
	},

	componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
		if (nextState.isOpen !== this.state.isOpen) {
			this.toggleTouchOutsideEvent(nextState.isOpen);
			var handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;
			handler && handler();
		}
	},

	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		// focus to the selected option
		if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
			var focusedOptionNode = _reactDom2['default'].findDOMNode(this.focused);
			var menuNode = _reactDom2['default'].findDOMNode(this.menu);
			menuNode.scrollTop = focusedOptionNode.offsetTop;
			this.hasScrolledToOption = true;
		} else if (!this.state.isOpen) {
			this.hasScrolledToOption = false;
		}

		if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
			this._scrollToFocusedOptionOnUpdate = false;
			var focusedDOM = _reactDom2['default'].findDOMNode(this.focused);
			var menuDOM = _reactDom2['default'].findDOMNode(this.menu);
			var focusedRect = focusedDOM.getBoundingClientRect();
			var menuRect = menuDOM.getBoundingClientRect();
			if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
				menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
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
	},

	componentWillUnmount: function componentWillUnmount() {
		if (!document.removeEventListener && document.detachEvent) {
			document.detachEvent('ontouchstart', this.handleTouchOutside);
		} else {
			document.removeEventListener('touchstart', this.handleTouchOutside);
		}
	},

	toggleTouchOutsideEvent: function toggleTouchOutsideEvent(enabled) {
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
	},

	handleTouchOutside: function handleTouchOutside(event) {
		// handle touch outside on ios to dismiss menu
		if (this.wrapper && !this.wrapper.contains(event.target)) {
			this.closeMenu();
		}
	},

	focus: function focus() {
		if (!this.input) return;
		this.input.focus();
	},

	blurInput: function blurInput() {
		if (!this.input) return;
		this.input.blur();
	},

	handleTouchMove: function handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	},

	handleTouchStart: function handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	},

	handleTouchEnd: function handleTouchEnd(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Fire the mouse events
		this.handleMouseDown(event);
	},

	handleTouchEndClearValue: function handleTouchEndClearValue(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Clear the value
		this.clearValue(event);
	},

	handleTouchEndOnArrow: function handleTouchEndOnArrow(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Clear the value
		this.handleMouseDownOnArrow(event);
	},

	handleMouseDown: function handleMouseDown(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
			return;
		}

		if (event.target.tagName === 'INPUT') {
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
			// On iOS, we can get into a state where we think the input is focused but it isn't really,
			// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
			// Call focus() again here to be safe.
			this.focus();

			var input = this.input;
			if (typeof input.getInput === 'function') {
				// Get the actual DOM input if the ref is an <AutosizeInput /> component
				input = input.getInput();
			}

			// clears the value so that the cursor will be at the end of input when the component re-renders
			input.value = '';

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

	handleMouseDownOnMenu: function handleMouseDownOnMenu(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();

		this._openAfterFocus = true;
		this.focus();
	},

	closeMenu: function closeMenu() {
		if (this.props.onCloseResetsInput) {
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi,
				inputValue: ''
			});
		} else {
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi,
				inputValue: this.state.inputValue
			});
		}
		this.hasScrolledToOption = false;
	},

	handleInputFocus: function handleInputFocus(event) {
		if (this.props.disabled) return;
		var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
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
		// makes the "field is required" message to appear on blur"
		this.props.isRequired && this.setState({ showRequiredMsg: true });
		// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
		if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
			this.focus();
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
		var newInputValue = event.target.value;

		if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
			var nextState = this.props.onInputChange(newInputValue);
			// Note: != used deliberately here to catch undefined and null
			if (nextState != null && typeof nextState !== 'object') {
				newInputValue = '' + nextState;
			}
		}

		this.setState({
			isOpen: true,
			isPseudoFocused: false,
			inputValue: newInputValue
		});
	},

	handleKeyDown: function handleKeyDown(event) {
		if (this.props.disabled) return;

		if (typeof this.props.onInputKeyDown === 'function') {
			this.props.onInputKeyDown(event);
			if (event.defaultPrevented) {
				return;
			}
		}

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
				if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
					return;
				}
				this.selectFocusedOption();
				return;
			case 13:
				// enter
				if (!this.state.isOpen) return;
				event.stopPropagation();
				this.selectFocusedOption();
				break;
			case 27:
				// escape
				if (this.state.isOpen) {
					this.closeMenu();
					event.stopPropagation();
				} else if (this.props.clearable && this.props.escapeClearsValue) {
					this.clearValue(event);
					event.stopPropagation();
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
			case 33:
				// page up
				this.focusPageUpOption();
				break;
			case 34:
				// page down
				this.focusPageDownOption();
				break;
			case 35:
				// end key
				if (event.shiftKey) {
					return;
				}
				this.focusEndOption();
				break;
			case 36:
				// home key
				if (event.shiftKey) {
					return;
				}
				this.focusStartOption();
				break;
			case 46:
				// backspace
				if (!this.state.inputValue && this.props.deleteRemoves) {
					event.preventDefault();
					this.popValue();
				}
				return;
			default:
				return;
		}
		event.preventDefault();
	},

	handleValueClick: function handleValueClick(option, event) {
		if (!this.props.onValueClick) return;
		this.props.onValueClick(option, event);
	},

	handleMenuScroll: function handleMenuScroll(event) {
		if (!this.props.onMenuScrollToBottom) return;
		var target = event.target;

		if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
			this.props.onMenuScrollToBottom();
		}
	},

	handleRequired: function handleRequired(value, multi) {
		if (!value) return true;
		return multi ? value.length === 0 : Object.keys(value).length === 0;
	},

	getOptionLabel: function getOptionLabel(op) {
		return op[this.props.labelKey];
	},

	/**
  * Turns a value into an array from the given options
  * @param	{String|Number|Array}	value		- the value of the select input
  * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
  * @returns	{Array}	the value of the select represented in an array
  */
	getValueArray: function getValueArray(value, nextProps) {
		var _this = this;

		/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
		var props = typeof nextProps === 'object' ? nextProps : this.props;
		if (props.multi) {
			if (typeof value === 'string') value = value.split(props.delimiter);
			if (!Array.isArray(value)) {
				if (value === null || value === undefined) return [];
				value = [value];
			}
			return value.map(function (value) {
				return _this.expandValue(value, props);
			}).filter(function (i) {
				return i;
			});
		}
		var expandedValue = this.expandValue(value, props);
		return expandedValue ? [expandedValue] : [];
	},

	/**
  * Retrieve a value from the given options and valueKey
  * @param	{String|Number|Array}	value	- the selected value(s)
  * @param	{Object}		props	- the Select component's props (or nextProps)
  */
	expandValue: function expandValue(value, props) {
		var valueType = typeof value;
		if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
		var options = props.options;
		var valueKey = props.valueKey;

		if (!options) return;
		for (var i = 0; i < options.length; i++) {
			if (options[i][valueKey] === value) return options[i];
		}
	},

	setValue: function setValue(value) {
		var _this2 = this;

		if (this.props.autoBlur) {
			this.blurInput();
		}
		if (!this.props.onChange) return;
		if (this.props.required) {
			var required = this.handleRequired(value, this.props.multi);
			this.setState({ required: required });
		}
		if (this.props.simpleValue && value) {
			value = this.props.multi ? value.map(function (i) {
				return i[_this2.props.valueKey];
			}).join(this.props.delimiter) : value[this.props.valueKey];
		}
		this.props.onChange(value);
	},

	selectValue: function selectValue(value) {
		var _this3 = this;

		//NOTE: update value in the callback to make sure the input value is empty so that there are no styling issues (Chrome had issue otherwise)
		this.hasScrolledToOption = false;
		if (this.props.multi) {
			this.setState({
				inputValue: '',
				focusedIndex: null
			}, function () {
				_this3.addValue(value);
			});
		} else {
			this.setState({
				isOpen: false,
				inputValue: '',
				isPseudoFocused: this.state.isFocused
			}, function () {
				_this3.setValue(value);
			});
		}
		this.removeRequiredMsg();
	},

	deleteOption: function deleteOption(option) {
		if (this.props.deleteOption) {
			return this.props.deleteOption(option);
		}
	},

	addValue: function addValue(value) {
		var valueArray = this.getValueArray(this.props.value);
		var visibleOptions = this._visibleOptions.filter(function (val) {
			return !val.disabled;
		});
		var lastValueIndex = visibleOptions.indexOf(value);
		this.setValue(valueArray.concat(value));
		if (visibleOptions.length - 1 === lastValueIndex) {
			// the last option was selected; focus the second-last one
			this.focusOption(visibleOptions[lastValueIndex - 1]);
		} else if (visibleOptions.length > lastValueIndex) {
			// focus the option below the selected one
			this.focusOption(visibleOptions[lastValueIndex + 1]);
		}
	},

	popValue: function popValue() {
		var valueArray = this.getValueArray(this.props.value);
		if (!valueArray.length) return;
		if (valueArray[valueArray.length - 1].clearableValue === false) return;
		this.setValue(valueArray.slice(0, valueArray.length - 1));
	},

	removeValue: function removeValue(value) {
		var valueArray = this.getValueArray(this.props.value);
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
		this.setValue(this.getResetValue());
		this.setState({
			isOpen: false,
			inputValue: ''
		}, this.focus);
	},

	getResetValue: function getResetValue() {
		if (this.props.resetValue !== undefined) {
			return this.props.resetValue;
		} else if (this.props.multi) {
			return [];
		} else {
			return null;
		}
	},

	removeRequiredMsg: function removeRequiredMsg() {
		this.setState({
			showRequiredMsg: false
		});
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

	focusPageUpOption: function focusPageUpOption() {
		this.focusAdjacentOption('page_up');
	},

	focusPageDownOption: function focusPageDownOption() {
		this.focusAdjacentOption('page_down');
	},

	focusStartOption: function focusStartOption() {
		this.focusAdjacentOption('start');
	},

	focusEndOption: function focusEndOption() {
		this.focusAdjacentOption('end');
	},

	focusAdjacentOption: function focusAdjacentOption(dir) {
		var options = this._visibleOptions.map(function (option, index) {
			return { option: option, index: index };
		}).filter(function (option) {
			return !option.option.disabled;
		});
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
	},

	getFocusedOption: function getFocusedOption() {
		return this._focusedOption;
	},

	getInputValue: function getInputValue() {
		return this.state.inputValue;
	},

	selectFocusedOption: function selectFocusedOption() {
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
		var _this4 = this;

		var renderLabel = this.props.valueRenderer || this.getOptionLabel;
		var ValueComponent = this.props.valueComponent;
		if (!valueArray.length) {
			return !this.state.inputValue ? _react2['default'].createElement(
				'div',
				{ className: 'Select-placeholder' },
				this.props.placeholder
			) : null;
		}
		var onClick = this.props.onValueClick ? this.handleValueClick : null;
		if (this.props.multi) {
			return valueArray.map(function (value, i) {
				return _react2['default'].createElement(
					ValueComponent,
					{
						id: _this4._instancePrefix + '-value-' + i,
						instancePrefix: _this4._instancePrefix,
						disabled: _this4.props.disabled || value.clearableValue === false,
						key: 'value-' + i + '-' + value[_this4.props.valueKey],
						onClick: onClick,
						onRemove: _this4.removeValue,
						value: value
					},
					renderLabel(value, i),
					_react2['default'].createElement(
						'span',
						{ className: 'Select-aria-only' },
						' '
					)
				);
			});
		} else if (!this.state.inputValue) {
			if (isOpen) onClick = null;
			return _react2['default'].createElement(
				ValueComponent,
				{
					id: this._instancePrefix + '-value-item',
					disabled: this.props.disabled,
					instancePrefix: this._instancePrefix,
					onClick: onClick,
					value: valueArray[0]
				},
				renderLabel(valueArray[0])
			);
		}
	},

	renderInput: function renderInput(valueArray, focusedOptionIndex) {
		var _classNames,
		    _this5 = this;

		var className = (0, _classnames2['default'])('Select-input', this.props.inputProps.className);
		var isOpen = !!this.state.isOpen;

		var ariaOwns = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

		// TODO: Check how this project includes Object.assign()
		var inputProps = _extends({}, this.props.inputProps, {
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
			ref: function ref(_ref) {
				return _this5.input = _ref;
			},
			required: this.state.required,
			value: this.state.inputValue
		});

		if (this.props.inputRenderer) {
			return this.props.inputRenderer(inputProps);
		}

		if (this.props.disabled || !this.props.searchable) {
			var _props$inputProps = this.props.inputProps;
			var inputClassName = _props$inputProps.inputClassName;

			var divProps = _objectWithoutProperties(_props$inputProps, ['inputClassName']);

			var _ariaOwns = (0, _classnames2['default'])(_defineProperty({}, this._instancePrefix + '-list', isOpen));

			return _react2['default'].createElement('div', _extends({}, divProps, {
				role: 'combobox',
				'aria-expanded': isOpen,
				'aria-owns': _ariaOwns,
				'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
				className: className,
				tabIndex: this.props.tabIndex || 0,
				onBlur: this.handleInputBlur,
				onFocus: this.handleInputFocus,
				ref: function (ref) {
					return _this5.input = ref;
				},
				'aria-readonly': '' + !!this.props.disabled,
				style: { border: 0, width: 1, display: 'inline-block' } }));
		}

		if (this.props.autosize) {
			return _react2['default'].createElement(_reactInputAutosize2['default'], _extends({}, inputProps, { minWidth: '5' }));
		}
		return _react2['default'].createElement(
			'div',
			{ className: className },
			_react2['default'].createElement('input', inputProps)
		);
	},

	renderClear: function renderClear() {

		if (!this.props.clearable || this.props.value === undefined || this.props.value === null || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
		var clear = this.props.clearRenderer();

		return _react2['default'].createElement(
			'span',
			{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
				'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
				onMouseDown: this.clearValue,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEndClearValue
			},
			clear
		);
	},

	renderArrow: function renderArrow() {
		var onMouseDown = this.handleMouseDownOnArrow;
		var isOpen = this.state.isOpen;
		var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen });

		return _react2['default'].createElement(
			'span',
			{
				className: 'Select-arrow-zone',
				onMouseDown: onMouseDown,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEndOnArrow
			},
			arrow
		);
	},

	filterOptions: function filterOptions(excludeOptions) {
		var filterValue = this.state.inputValue;
		var options = this.props.options || [];
		if (this.props.filterOptions) {
			// Maintain backwards compatibility with boolean attribute
			var filterOptions = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : _utilsDefaultFilterOptions2['default'];

			return filterOptions(options, filterValue, excludeOptions, {
				filterOption: this.props.filterOption,
				ignoreAccents: this.props.ignoreAccents,
				ignoreCase: this.props.ignoreCase,
				labelKey: this.props.labelKey,
				matchPos: this.props.matchPos,
				matchProp: this.props.matchProp,
				valueKey: this.props.valueKey
			});
		} else {
			return options;
		}
	},

	onOptionRef: function onOptionRef(ref, isFocused) {
		if (isFocused) {
			this.focused = ref;
		}
	},

	renderMenu: function renderMenu(options, valueArray, focusedOption) {
		if (options && options.length) {
			return this.props.menuRenderer({
				focusedOption: focusedOption,
				focusOption: this.focusOption,
				instancePrefix: this._instancePrefix,
				labelKey: this.props.labelKey,
				onFocus: this.focusOption,
				onSelect: this.selectValue,
				onDelete: this.deleteOption,
				deletable: this.props.deletable,
				optionClassName: this.props.optionClassName,
				optionComponent: this.props.optionComponent,
				optionRenderer: this.props.optionRenderer || this.getOptionLabel,
				options: options,
				selectValue: this.selectValue,
				valueArray: valueArray,
				valueKey: this.props.valueKey,
				onOptionRef: this.onOptionRef
			});
		} else if (this.props.noResultsText) {
			return _react2['default'].createElement(
				'div',
				{ className: 'Select-noresults' },
				this.props.noResultsText
			);
		} else {
			return null;
		}
	},

	renderHiddenField: function renderHiddenField(valueArray) {
		var _this6 = this;

		if (!this.props.name) return;
		if (this.props.joinValues) {
			var value = valueArray.map(function (i) {
				return stringifyValue(i[_this6.props.valueKey]);
			}).join(this.props.delimiter);
			return _react2['default'].createElement('input', {
				type: 'hidden',
				ref: function (ref) {
					return _this6.value = ref;
				},
				name: this.props.name,
				value: value,
				disabled: this.props.disabled });
		}
		return valueArray.map(function (item, index) {
			return _react2['default'].createElement('input', { key: 'hidden.' + index,
				type: 'hidden',
				ref: 'value' + index,
				name: _this6.props.name,
				value: stringifyValue(item[_this6.props.valueKey]),
				disabled: _this6.props.disabled });
		});
	},

	renderRequiredMessage: function renderRequiredMessage() {
		var fieldRequiredMessage = 'Field is required';
		return _react2['default'].createElement(
			'span',
			{ className: 'required-message' },
			fieldRequiredMessage
		);
	},

	getFocusableOptionIndex: function getFocusableOptionIndex(selectedOption) {
		var options = this._visibleOptions;
		if (!options.length) return null;

		var focusedOption = this.state.focusedOption || selectedOption;
		if (focusedOption && !focusedOption.disabled) {
			var focusedOptionIndex = -1;
			options.some(function (option, index) {
				var isOptionEqual = option.value === focusedOption.value;
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
	},

	renderOuter: function renderOuter(options, valueArray, focusedOption) {
		var _this7 = this;

		var menu = this.renderMenu(options, valueArray, focusedOption);
		if (!menu) {
			return null;
		}

		return _react2['default'].createElement(
			'div',
			{ ref: function (ref) {
					return _this7.menuContainer = ref;
				}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
			_react2['default'].createElement(
				'div',
				{ ref: function (ref) {
						return _this7.menu = ref;
					}, role: 'listbox', className: 'Select-menu', id: this._instancePrefix + '-list',
					style: this.props.menuStyle,
					onScroll: this.handleMenuScroll,
					onMouseDown: this.handleMouseDownOnMenu },
				menu
			)
		);
	},

	renderSelectLabel: function renderSelectLabel() {
		if (this.props.selectLabel) {
			var _classNames3 = this.state.isFocused ? 'select-field-label select-field-label-focused' : 'select-field-label';
			return _react2['default'].createElement(
				'h3',
				{ className: _classNames3 },
				this.props.selectLabel,
				this.props.isRequired && _react2['default'].createElement(
					'span',
					{ className: 'required-asterisk' },
					' *'
				)
			);
		}
		return null;
	},

	render: function render() {
		var _this8 = this;

		var valueArray = this.getValueArray(this.props.value);
		var options = this._visibleOptions = this.filterOptions(this.props.multi ? this.getValueArray(this.props.value) : null);
		var isOpen = this.state.isOpen;
		var showRequiredMsg = this.state.showRequiredMsg;
		if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
		var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

		var focusedOption = null;
		if (focusedOptionIndex !== null) {
			focusedOption = this._focusedOption = options[focusedOptionIndex];
		} else {
			focusedOption = this._focusedOption = null;
		}
		var className = (0, _classnames2['default'])('Select', this.props.className, {
			'Select-dark': this.props.theme === 'dark',
			'Select--multi': this.props.multi,
			'Select--single': !this.props.multi,
			'is-clearable': this.props.clearable,
			'is-disabled': this.props.disabled,
			'is-focused': this.state.isFocused,
			'is-loading': this.props.isLoading,
			'is-open': isOpen,
			'is-pseudo-focused': this.state.isPseudoFocused,
			'is-searchable': this.props.searchable,
			'has-value': valueArray.length
		});

		var removeMessage = null;
		if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
			removeMessage = _react2['default'].createElement(
				'span',
				{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
				this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
			);
		}

		return _react2['default'].createElement(
			'div',
			{ ref: function (ref) {
					return _this8.wrapper = ref;
				},
				className: className,
				style: this.props.wrapperStyle },
			this.renderSelectLabel(),
			this.renderHiddenField(valueArray),
			_react2['default'].createElement(
				'div',
				{ ref: function (ref) {
						return _this8.control = ref;
					},
					className: 'Select-control',
					style: this.props.style,
					onKeyDown: this.handleKeyDown,
					onMouseDown: this.handleMouseDown,
					onTouchEnd: this.handleTouchEnd,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove
				},
				_react2['default'].createElement(
					'span',
					{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
					this.renderValue(valueArray, isOpen),
					this.renderInput(valueArray, focusedOptionIndex)
				),
				removeMessage,
				this.renderLoading(),
				this.renderClear(),
				this.renderArrow()
			),
			!isOpen && showRequiredMsg && this.props.isRequired && this.props.multi && !valueArray.length && this.renderRequiredMessage(),
			!isOpen && showRequiredMsg && this.props.isRequired && !this.props.multi && !this.state.inputValue && !this.props.value && this.renderRequiredMessage(),
			isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null
		);
	}

});

exports['default'] = Select;
module.exports = exports['default'];

},{"./Async":1,"./AsyncCreatable":2,"./Creatable":3,"./Option":4,"./Value":5,"./utils/defaultArrowRenderer":6,"./utils/defaultClearRenderer":7,"./utils/defaultFilterOptions":8,"./utils/defaultMenuRenderer":9,"classnames":undefined,"create-react-class":undefined,"prop-types":undefined,"react":undefined,"react-dom":undefined,"react-input-autosize":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS95ZHJhcmd5cm9zL0Rlc2t0b3AvQXJ0bGltZXMvYXJ0bGltZXMtc2VsZWN0L21pbmltYWwtcmVhY3Qtc2VsZWN0L3NyYy9Bc3luYy5qcyIsIi9ob21lL3lkcmFyZ3lyb3MvRGVza3RvcC9BcnRsaW1lcy9hcnRsaW1lcy1zZWxlY3QvbWluaW1hbC1yZWFjdC1zZWxlY3Qvc3JjL0FzeW5jQ3JlYXRhYmxlLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvQ3JlYXRhYmxlLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvT3B0aW9uLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvVmFsdWUuanMiLCIvaG9tZS95ZHJhcmd5cm9zL0Rlc2t0b3AvQXJ0bGltZXMvYXJ0bGltZXMtc2VsZWN0L21pbmltYWwtcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0QXJyb3dSZW5kZXJlci5qcyIsIi9ob21lL3lkcmFyZ3lyb3MvRGVza3RvcC9BcnRsaW1lcy9hcnRsaW1lcy1zZWxlY3QvbWluaW1hbC1yZWFjdC1zZWxlY3Qvc3JjL3V0aWxzL2RlZmF1bHRDbGVhclJlbmRlcmVyLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvdXRpbHMvZGVmYXVsdEZpbHRlck9wdGlvbnMuanMiLCIvaG9tZS95ZHJhcmd5cm9zL0Rlc2t0b3AvQXJ0bGltZXMvYXJ0bGltZXMtc2VsZWN0L21pbmltYWwtcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvdXRpbHMvc3RyaXBEaWFjcml0aWNzLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvU2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDQWlDLE9BQU87Ozs7eUJBQ2xCLFlBQVk7Ozs7c0JBQ2YsVUFBVTs7OztvQ0FDRCx5QkFBeUI7Ozs7QUFFckQsSUFBTSxTQUFTLEdBQUc7QUFDakIsU0FBUSxFQUFFLHVCQUFVLElBQUksQ0FBQyxVQUFVO0FBQ25DLE1BQUssRUFBRSx1QkFBVSxHQUFHO0FBQ3BCLFNBQVEsRUFBRSx1QkFBVSxJQUFJLENBQUMsVUFBVTtBQUNuQyxjQUFhLEVBQUUsdUJBQVUsSUFBSTtBQUM3QixXQUFVLEVBQUUsdUJBQVUsSUFBSTtBQUMxQixtQkFBa0IsRUFBRSx1QkFBVSxTQUFTLENBQUM7QUFDdkMsd0JBQVUsTUFBTSxFQUNoQix1QkFBVSxJQUFJLENBQ2QsQ0FBQztBQUNGLFlBQVcsRUFBRSx1QkFBVSxJQUFJLENBQUMsVUFBVTtBQUN0QyxNQUFLLEVBQUUsdUJBQVUsSUFBSTtBQUNyQixRQUFPLEVBQUUsdUJBQVUsS0FBSyxDQUFDLFVBQVU7QUFDbkMsWUFBVyxFQUFFLHVCQUFVLFNBQVMsQ0FBQztBQUNoQyx3QkFBVSxNQUFNLEVBQ2hCLHVCQUFVLElBQUksQ0FDZCxDQUFDO0FBQ0YsY0FBYSxFQUFFLHVCQUFVLFNBQVMsQ0FBQztBQUNsQyx3QkFBVSxNQUFNLEVBQ2hCLHVCQUFVLElBQUksQ0FDZCxDQUFDO0FBQ0YsU0FBUSxFQUFFLHVCQUFVLElBQUk7QUFDeEIsaUJBQWdCLEVBQUUsdUJBQVUsU0FBUyxDQUFDO0FB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QixJQUFJLENBQUMsV0FBVyxFQUFFO0lBQ2Q7R0FDTCxDQUFDLE1BQU0sSUFBSSxlQUFlLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtHQUM3SCxDQUFDLE1BQU0sSUFBSSxlQUFlLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO0dBQ3ZKLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxJQUFJLEVBQUUsYUFBYSxDQUFDLEdBQUcsSUFBSTtHQUMzRixDQUNMO0VBQ0Y7O0NBRUQsQ0FBQyxDQUFDOztxQkFFWSxNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICcuL1NlbGVjdCc7XG5pbXBvcnQgc3RyaXBEaWFjcml0aWNzIGZyb20gJy4vdXRpbHMvc3RyaXBEaWFjcml0aWNzJztcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuXHRhdXRvbG9hZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCwgICAgICAgLy8gYXV0b21hdGljYWxseSBjYWxsIHRoZSBgbG9hZE9wdGlvbnNgIHByb3Agb24tbW91bnQ7IGRlZmF1bHRzIHRvIHRydWVcblx0Y2FjaGU6IFByb3BUeXBlcy5hbnksICAgICAgICAgICAgICAgICAgICAgIC8vIG9iamVjdCB0byB1c2UgdG8gY2FjaGUgcmVzdWx0czsgc2V0IHRvIG51bGwvZmFsc2UgdG8gZGlzYWJsZSBjYWNoaW5nXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLCAgICAgICAvLyBDaGlsZCBmdW5jdGlvbiByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGlubmVyIFNlbGVjdCBjb21wb25lbnQ7IChwcm9wczogT2JqZWN0KTogUHJvcFR5cGVzLmVsZW1lbnRcblx0aWdub3JlQWNjZW50czogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIHN0cmlwIGRpYWNyaXRpY3Mgd2hlbiBmaWx0ZXJpbmc7IGRlZmF1bHRzIHRvIHRydWVcblx0aWdub3JlQ2FzZTogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAgIC8vIHBlcmZvcm0gY2FzZS1pbnNlbnNpdGl2ZSBmaWx0ZXJpbmc7IGRlZmF1bHRzIHRvIHRydWVcblx0bG9hZGluZ1BsYWNlaG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFsgIC8vIHJlcGxhY2VzIHRoZSBwbGFjZWhvbGRlciB3aGlsZSBvcHRpb25zIGFyZSBsb2FkaW5nXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcblx0XHRQcm9wVHlwZXMubm9kZVxuXHRdKSxcblx0bG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsICAgIC8vIGNhbGxiYWNrIHRvIGxvYWQgb3B0aW9ucyBhc3luY2hyb25vdXNseTsgKGlucHV0VmFsdWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogP1Byb21pc2Vcblx0bXVsdGk6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgICAgICAgIC8vIG11bHRpLXZhbHVlIGlucHV0XG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLCAgICAgICAgICAgICAvLyBhcnJheSBvZiBvcHRpb25zXG5cdHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFsgICAgICAgICAvLyBmaWVsZCBwbGFjZWhvbGRlciwgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyB2YWx1ZSAoc2hhcmVkIHdpdGggU2VsZWN0KVxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UHJvcFR5cGVzLm5vZGVcblx0XSksXG5cdG5vUmVzdWx0c1RleHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoWyAgICAgICAvLyBmaWVsZCBub1Jlc3VsdHNUZXh0LCBkaXNwbGF5ZWQgd2hlbiBubyBvcHRpb25zIGNvbWUgYmFjayBmcm9tIHRoZSBzZXJ2ZXJcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFByb3BUeXBlcy5ub2RlXG5cdF0pLFxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgICAgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7fVxuXHRzZWFyY2hQcm9tcHRUZXh0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFsgICAgLy8gbGFiZWwgdG8gcHJvbXB0IGZvciBzZWFyY2ggaW5wdXRcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFByb3BUeXBlcy5ub2RlXG5cdF0pLFxuXHRvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgLy8gb3B0aW9uYWwgZm9yIGtlZXBpbmcgdHJhY2sgb2Ygd2hhdCBpcyBiZWluZyB0eXBlZFxuXHR2YWx1ZTogUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCBmaWVsZCB2YWx1ZVxufTtcblxuY29uc3QgZGVmYXVsdENhY2hlID0ge307XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcblx0YXV0b2xvYWQ6IHRydWUsXG5cdGNhY2hlOiBkZWZhdWx0Q2FjaGUsXG5cdGNoaWxkcmVuOiBkZWZhdWx0Q2hpbGRyZW4sXG5cdGlnbm9yZUFjY2VudHM6IHRydWUsXG5cdGlnbm9yZUNhc2U6IHRydWUsXG5cdGxvYWRpbmdQbGFjZWhvbGRlcjogJ0xvYWRpbmcuLi4nLFxuXHRvcHRpb25zOiBbXSxcblx0c2VhcmNoUHJvbXB0VGV4dDogJ1R5cGUgdG8gc2VhcmNoJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzeW5jIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IgKHByb3BzLCBjb250ZXh0KSB7XG5cdFx0c3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG5cdFx0dGhpcy5fY2FjaGUgPSBwcm9wcy5jYWNoZSA9PT0gZGVmYXVsdENhY2hlID8ge30gOiBwcm9wcy5jYWNoZTtcblxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0b3B0aW9uczogcHJvcHMub3B0aW9ucyxcblx0XHR9O1xuXG5cdFx0dGhpcy5fb25JbnB1dENoYW5nZSA9IHRoaXMuX29uSW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcblx0XHRjb25zdCB7IGF1dG9sb2FkIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0aWYgKGF1dG9sb2FkKSB7XG5cdFx0XHR0aGlzLmxvYWRPcHRpb25zKCcnKTtcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVXBkYXRlIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuXHRcdGNvbnN0IHByb3BlcnRpZXNUb1N5bmMgPSBbJ29wdGlvbnMnXTtcblx0XHRwcm9wZXJ0aWVzVG9TeW5jLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdGlmICh0aGlzLnByb3BzW3Byb3BdICE9PSBuZXh0UHJvcHNbcHJvcF0pIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0W3Byb3BdOiBuZXh0UHJvcHNbcHJvcF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRjbGVhck9wdGlvbnMoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IG9wdGlvbnM6IFtdIH0pO1xuXHR9XG5cblx0bG9hZE9wdGlvbnMgKGlucHV0VmFsdWUpIHtcblx0XHRjb25zdCB7IGxvYWRPcHRpb25zIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IGNhY2hlID0gdGhpcy5fY2FjaGU7XG5cblx0XHRpZiAoXG5cdFx0XHRjYWNoZSAmJlxuXHRcdFx0Y2FjaGUuaGFzT3duUHJvcGVydHkoaW5wdXRWYWx1ZSlcblx0XHQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRvcHRpb25zOiBjYWNoZVtpbnB1dFZhbHVlXVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBjYWxsYmFjayA9IChlcnJvciwgZGF0YSkgPT4ge1xuXHRcdFx0aWYgKGNhbGxiYWNrID09PSB0aGlzLl9jYWxsYmFjaykge1xuXHRcdFx0XHR0aGlzLl9jYWxsYmFjayA9IG51bGw7XG5cblx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGRhdGEgJiYgZGF0YS5vcHRpb25zIHx8IFtdO1xuXG5cdFx0XHRcdGlmIChjYWNoZSkge1xuXHRcdFx0XHRcdGNhY2hlW2lucHV0VmFsdWVdID0gb3B0aW9ucztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdFx0b3B0aW9uc1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gSWdub3JlIGFsbCBidXQgdGhlIG1vc3QgcmVjZW50IHJlcXVlc3Rcblx0XHR0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0Y29uc3QgcHJvbWlzZSA9IGxvYWRPcHRpb25zKGlucHV0VmFsdWUsIGNhbGxiYWNrKTtcblx0XHRpZiAocHJvbWlzZSkge1xuXHRcdFx0cHJvbWlzZS50aGVuKFxuXHRcdFx0XHQoZGF0YSkgPT4gY2FsbGJhY2sobnVsbCwgZGF0YSksXG5cdFx0XHRcdChlcnJvcikgPT4gY2FsbGJhY2soZXJyb3IpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChcblx0XHRcdHRoaXMuX2NhbGxiYWNrICYmXG5cdFx0XHQhdGhpcy5zdGF0ZS5pc0xvYWRpbmdcblx0XHQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc0xvYWRpbmc6IHRydWVcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBpbnB1dFZhbHVlO1xuXHR9XG5cblx0X29uSW5wdXRDaGFuZ2UgKGlucHV0VmFsdWUpIHtcblx0XHRjb25zdCB7IGlnbm9yZUFjY2VudHMsIGlnbm9yZUNhc2UsIG9uSW5wdXRDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAoaWdub3JlQWNjZW50cykge1xuXHRcdFx0aW5wdXRWYWx1ZSA9IHN0cmlwRGlhY3JpdGljcyhpbnB1dFZhbHVlKTtcblx0XHR9XG5cblx0XHRpZiAoaWdub3JlQ2FzZSkge1xuXHRcdFx0aW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHR9XG5cblx0XHRpZiAob25JbnB1dENoYW5nZSkge1xuXHRcdFx0b25JbnB1dENoYW5nZShpbnB1dFZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5sb2FkT3B0aW9ucyhpbnB1dFZhbHVlKTtcblx0fVxuXG5cdGlucHV0VmFsdWUoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3Quc3RhdGUuaW5wdXRWYWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bm9SZXN1bHRzVGV4dCgpIHtcblx0XHRjb25zdCB7IGxvYWRpbmdQbGFjZWhvbGRlciwgbm9SZXN1bHRzVGV4dCwgc2VhcmNoUHJvbXB0VGV4dCB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB7IGlzTG9hZGluZyB9ID0gdGhpcy5zdGF0ZTtcblxuXHRcdGNvbnN0IGlucHV0VmFsdWUgPSB0aGlzLmlucHV0VmFsdWUoKTtcblxuXHRcdGlmIChpc0xvYWRpbmcpIHtcblx0XHRcdHJldHVybiBsb2FkaW5nUGxhY2Vob2xkZXI7XG5cdFx0fVxuXHRcdGlmIChpbnB1dFZhbHVlICYmIG5vUmVzdWx0c1RleHQpIHtcblx0XHRcdHJldHVybiBub1Jlc3VsdHNUZXh0O1xuXHRcdH1cblx0XHRyZXR1cm4gc2VhcmNoUHJvbXB0VGV4dDtcblx0fVxuXG5cdGZvY3VzICgpIHtcblx0XHR0aGlzLnNlbGVjdC5mb2N1cygpO1xuXHR9XG5cblx0cmVuZGVyICgpIHtcblx0XHRjb25zdCB7IGNoaWxkcmVuLCBsb2FkaW5nUGxhY2Vob2xkZXIsIHBsYWNlaG9sZGVyIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHsgaXNMb2FkaW5nLCBvcHRpb25zIH0gPSB0aGlzLnN0YXRlO1xuXG5cdFx0Y29uc3QgcHJvcHMgPSB7XG5cdFx0XHRub1Jlc3VsdHNUZXh0OiB0aGlzLm5vUmVzdWx0c1RleHQoKSxcblx0XHRcdHBsYWNlaG9sZGVyOiBpc0xvYWRpbmcgPyBsb2FkaW5nUGxhY2Vob2xkZXIgOiBwbGFjZWhvbGRlcixcblx0XHRcdG9wdGlvbnM6IChpc0xvYWRpbmcgJiYgbG9hZGluZ1BsYWNlaG9sZGVyKSA/IFtdIDogb3B0aW9ucyxcblx0XHRcdHJlZjogKHJlZikgPT4gKHRoaXMuc2VsZWN0ID0gcmVmKSxcblx0XHRcdG9uQ2hhbmdlOiAobmV3VmFsdWVzKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLnByb3BzLm11bHRpICYmIHRoaXMucHJvcHMudmFsdWUgJiYgKG5ld1ZhbHVlcy5sZW5ndGggPiB0aGlzLnByb3BzLnZhbHVlLmxlbmd0aCkpIHtcblx0XHRcdFx0XHR0aGlzLmNsZWFyT3B0aW9ucygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UobmV3VmFsdWVzKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGNoaWxkcmVuKHtcblx0XHRcdC4uLnRoaXMucHJvcHMsXG5cdFx0XHQuLi5wcm9wcyxcblx0XHRcdGlzTG9hZGluZyxcblx0XHRcdG9uSW5wdXRDaGFuZ2U6IHRoaXMuX29uSW5wdXRDaGFuZ2Vcblx0XHR9KTtcblx0fVxufVxuXG5Bc3luYy5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5Bc3luYy5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbmZ1bmN0aW9uIGRlZmF1bHRDaGlsZHJlbiAocHJvcHMpIHtcblx0cmV0dXJuIChcblx0XHQ8U2VsZWN0IHsuLi5wcm9wc30gLz5cblx0KTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAnY3JlYXRlLXJlYWN0LWNsYXNzJztcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9TZWxlY3QnO1xuXG5mdW5jdGlvbiByZWR1Y2Uob2JqLCBwcm9wcyA9IHt9KXtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcbiAgLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHByb3BzW2tleV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gcHJvcHM7XG4gIH0sIHByb3BzKTtcbn1cblxuY29uc3QgQXN5bmNDcmVhdGFibGUgPSBjcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQXN5bmNDcmVhdGFibGVTZWxlY3QnLFxuXG5cdGZvY3VzICgpIHtcblx0XHR0aGlzLnNlbGVjdC5mb2N1cygpO1xuXHR9LFxuXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxTZWxlY3QuQXN5bmMgey4uLnRoaXMucHJvcHN9PlxuXHRcdFx0XHR7KGFzeW5jUHJvcHMpID0+IChcblx0XHRcdFx0XHQ8U2VsZWN0LkNyZWF0YWJsZSB7Li4udGhpcy5wcm9wc30+XG5cdFx0XHRcdFx0XHR7KGNyZWF0YWJsZVByb3BzKSA9PiAoXG5cdFx0XHRcdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRcdFx0XHR7Li4ucmVkdWNlKGFzeW5jUHJvcHMsIHJlZHVjZShjcmVhdGFibGVQcm9wcywge30pKX1cblx0XHRcdFx0XHRcdFx0XHRvbklucHV0Q2hhbmdlPXsoaW5wdXQpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0YWJsZVByb3BzLm9uSW5wdXRDaGFuZ2UoaW5wdXQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGFzeW5jUHJvcHMub25JbnB1dENoYW5nZShpbnB1dCk7XG5cdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRyZWY9eyhyZWYpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0ID0gcmVmO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRhYmxlUHJvcHMucmVmKHJlZik7XG5cdFx0XHRcdFx0XHRcdFx0XHRhc3luY1Byb3BzLnJlZihyZWYpO1xuXHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQpfVxuXHRcdFx0XHRcdDwvU2VsZWN0LkNyZWF0YWJsZT5cblx0XHRcdFx0KX1cblx0XHRcdDwvU2VsZWN0LkFzeW5jPlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzeW5jQ3JlYXRhYmxlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9TZWxlY3QnO1xuaW1wb3J0IGRlZmF1bHRGaWx0ZXJPcHRpb25zIGZyb20gJy4vdXRpbHMvZGVmYXVsdEZpbHRlck9wdGlvbnMnO1xuaW1wb3J0IGRlZmF1bHRNZW51UmVuZGVyZXIgZnJvbSAnLi91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyJztcblxuY29uc3QgQ3JlYXRhYmxlID0gY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ0NyZWF0YWJsZVNlbGVjdCcsXG5cblx0cHJvcFR5cGVzOiB7XG5cdFx0Ly8gQ2hpbGQgZnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoZSBpbm5lciBTZWxlY3QgY29tcG9uZW50XG5cdFx0Ly8gVGhpcyBjb21wb25lbnQgY2FuIGJlIHVzZWQgdG8gY29tcG9zZSBIT0NzIChlZyBDcmVhdGFibGUgYW5kIEFzeW5jKVxuXHRcdC8vIChwcm9wczogT2JqZWN0KTogUHJvcFR5cGVzLmVsZW1lbnRcblx0XHRjaGlsZHJlbjogUHJvcFR5cGVzLmZ1bmMsXG5cblx0XHQvLyBTZWUgU2VsZWN0LnByb3BUeXBlcy5maWx0ZXJPcHRpb25zXG5cdFx0ZmlsdGVyT3B0aW9uczogUHJvcFR5cGVzLmFueSxcblxuXHRcdC8vIFNlYXJjaGVzIGZvciBhbnkgbWF0Y2hpbmcgb3B0aW9uIHdpdGhpbiB0aGUgc2V0IG9mIG9wdGlvbnMuXG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiBwcmV2ZW50cyBkdXBsaWNhdGUgb3B0aW9ucyBmcm9tIGJlaW5nIGNyZWF0ZWQuXG5cdFx0Ly8gKHsgb3B0aW9uOiBPYmplY3QsIG9wdGlvbnM6IEFycmF5LCBsYWJlbEtleTogc3RyaW5nLCB2YWx1ZUtleTogc3RyaW5nIH0pOiBib29sZWFuXG5cdFx0aXNPcHRpb25VbmlxdWU6IFByb3BUeXBlcy5mdW5jLFxuXG5cdCAgICAvLyBEZXRlcm1pbmVzIGlmIHRoZSBjdXJyZW50IGlucHV0IHRleHQgcmVwcmVzZW50cyBhIHZhbGlkIG9wdGlvbi5cblx0ICAgIC8vICh7IGxhYmVsOiBzdHJpbmcgfSk6IGJvb2xlYW5cblx0ICAgIGlzVmFsaWROZXdPcHRpb246IFByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gU2VlIFNlbGVjdC5wcm9wVHlwZXMubWVudVJlbmRlcmVyXG5cdFx0bWVudVJlbmRlcmVyOiBQcm9wVHlwZXMuYW55LFxuXG5cdCAgICAvLyBGYWN0b3J5IHRvIGNyZWF0ZSBuZXcgb3B0aW9uLlxuXHQgICAgLy8gKHsgbGFiZWw6IHN0cmluZywgbGFiZWxLZXk6IHN0cmluZywgdmFsdWVLZXk6IHN0cmluZyB9KTogT2JqZWN0XG5cdFx0bmV3T3B0aW9uQ3JlYXRvcjogUHJvcFR5cGVzLmZ1bmMsXG5cblx0XHQvLyBpbnB1dCBjaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKGlucHV0VmFsdWUpIHt9XG5cdFx0b25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG5cblx0XHQvLyBpbnB1dCBrZXlEb3duIGhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge31cblx0XHRvbklucHV0S2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG5cblx0XHQvLyBuZXcgb3B0aW9uIGNsaWNrIGhhbmRsZXI6IGZ1bmN0aW9uIChvcHRpb24pIHt9XG5cdFx0b25OZXdPcHRpb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG5cblx0XHQvLyBTZWUgU2VsZWN0LnByb3BUeXBlcy5vcHRpb25zXG5cdFx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LFxuXG5cdCAgICAvLyBDcmVhdGVzIHByb21wdC9wbGFjZWhvbGRlciBvcHRpb24gdGV4dC5cblx0ICAgIC8vIChmaWx0ZXJUZXh0OiBzdHJpbmcpOiBzdHJpbmdcblx0XHRwcm9tcHRUZXh0Q3JlYXRvcjogUHJvcFR5cGVzLmZ1bmMsXG5cblx0XHQvLyBEZWNpZGVzIGlmIGEga2V5RG93biBldmVudCAoZWcgaXRzIGBrZXlDb2RlYCkgc2hvdWxkIHJlc3VsdCBpbiB0aGUgY3JlYXRpb24gb2YgYSBuZXcgb3B0aW9uLlxuXHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG5cdH0sXG5cblx0Ly8gRGVmYXVsdCBwcm9wIG1ldGhvZHNcblx0c3RhdGljczoge1xuXHRcdGlzT3B0aW9uVW5pcXVlLFxuXHRcdGlzVmFsaWROZXdPcHRpb24sXG5cdFx0bmV3T3B0aW9uQ3JlYXRvcixcblx0XHRwcm9tcHRUZXh0Q3JlYXRvcixcblx0XHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb25cblx0fSxcblxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRmaWx0ZXJPcHRpb25zOiBkZWZhdWx0RmlsdGVyT3B0aW9ucyxcblx0XHRcdGlzT3B0aW9uVW5pcXVlLFxuXHRcdFx0aXNWYWxpZE5ld09wdGlvbixcblx0XHRcdG1lbnVSZW5kZXJlcjogZGVmYXVsdE1lbnVSZW5kZXJlcixcblx0XHRcdG5ld09wdGlvbkNyZWF0b3IsXG5cdFx0XHRwcm9tcHRUZXh0Q3JlYXRvcixcblx0XHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbixcblx0XHR9O1xuXHR9LFxuXG5cdGNyZWF0ZU5ld09wdGlvbiAoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0aXNWYWxpZE5ld09wdGlvbixcblx0XHRcdG5ld09wdGlvbkNyZWF0b3IsXG5cdFx0XHRvbk5ld09wdGlvbkNsaWNrLFxuXHRcdFx0b3B0aW9ucyA9IFtdLFxuXHRcdFx0c2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAoaXNWYWxpZE5ld09wdGlvbih7IGxhYmVsOiB0aGlzLmlucHV0VmFsdWUgfSkpIHtcblx0XHRcdGNvbnN0IG9wdGlvbiA9IG5ld09wdGlvbkNyZWF0b3IoeyBsYWJlbDogdGhpcy5pbnB1dFZhbHVlLCBsYWJlbEtleTogdGhpcy5sYWJlbEtleSwgdmFsdWVLZXk6IHRoaXMudmFsdWVLZXkgfSk7XG5cdFx0XHRjb25zdCBpc09wdGlvblVuaXF1ZSA9IHRoaXMuaXNPcHRpb25VbmlxdWUoeyBvcHRpb24gfSk7XG5cblx0XHRcdC8vIERvbid0IGFkZCB0aGUgc2FtZSBvcHRpb24gdHdpY2UuXG5cdFx0XHRpZiAoaXNPcHRpb25VbmlxdWUpIHtcblx0XHRcdFx0aWYgKG9uTmV3T3B0aW9uQ2xpY2spIHtcblx0XHRcdFx0XHRvbk5ld09wdGlvbkNsaWNrKG9wdGlvbik7XG5cdFx0XHRcdFx0Ly8gQ2xvc2VzIHRoZSBtZW51IHdoZW4gYSBuZXcgb3B0aW9uIGlzIGNsaWNrZWQuIENsZWFycyB0aGUgaW5wdXQgdmFsdWVzIGlmIG9uQ2xvc2VSZXNldHNJbnB1dCBpcyBzZXQgdG8gdHJ1ZSB7ZGVmYXVsdDogdHJ1ZX0uXG5cdFx0XHRcdFx0Ly8gdGhpcy5zZWxlY3QuY2xvc2VNZW51KCk7XG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIHJlcXVpcmVkTXNnXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3QucmVtb3ZlUmVxdWlyZWRNc2coKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvcHRpb25zLnVuc2hpZnQob3B0aW9uKTtcblxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0LnNlbGVjdFZhbHVlKG9wdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0ZmlsdGVyT3B0aW9ucyAoLi4ucGFyYW1zKSB7XG5cdFx0Y29uc3QgeyBmaWx0ZXJPcHRpb25zLCBpc1ZhbGlkTmV3T3B0aW9uLCBvcHRpb25zLCBwcm9tcHRUZXh0Q3JlYXRvciB9ID0gdGhpcy5wcm9wcztcblxuXHRcdC8vIFRSSUNLWSBDaGVjayBjdXJyZW50bHkgc2VsZWN0ZWQgb3B0aW9ucyBhcyB3ZWxsLlxuXHRcdC8vIERvbid0IGRpc3BsYXkgYSBjcmVhdGUtcHJvbXB0IGZvciBhIHZhbHVlIHRoYXQncyBzZWxlY3RlZC5cblx0XHQvLyBUaGlzIGNvdmVycyBhc3luYyBlZGdlLWNhc2VzIHdoZXJlIGEgbmV3bHktY3JlYXRlZCBPcHRpb24gaXNuJ3QgeWV0IGluIHRoZSBhc3luYy1sb2FkZWQgYXJyYXkuXG5cdFx0Y29uc3QgZXhjbHVkZU9wdGlvbnMgPSBwYXJhbXNbMl0gfHwgW107XG5cblx0XHRjb25zdCBmaWx0ZXJlZE9wdGlvbnMgPSBmaWx0ZXJPcHRpb25zKC4uLnBhcmFtcykgfHwgW107XG5cblx0XHRpZiAoaXNWYWxpZE5ld09wdGlvbih7IGxhYmVsOiB0aGlzLmlucHV0VmFsdWUgfSkpIHtcblx0XHRcdGNvbnN0IHsgbmV3T3B0aW9uQ3JlYXRvciB9ID0gdGhpcy5wcm9wcztcblxuXHRcdFx0Y29uc3Qgb3B0aW9uID0gbmV3T3B0aW9uQ3JlYXRvcih7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLmlucHV0VmFsdWUsXG5cdFx0XHRcdGxhYmVsS2V5OiB0aGlzLmxhYmVsS2V5LFxuXHRcdFx0XHR2YWx1ZUtleTogdGhpcy52YWx1ZUtleVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFRSSUNLWSBDb21wYXJlIHRvIGFsbCBvcHRpb25zIChub3QganVzdCBmaWx0ZXJlZCBvcHRpb25zKSBpbiBjYXNlIG9wdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHNlbGVjdGVkKS5cblx0XHRcdC8vIEZvciBtdWx0aS1zZWxlY3RzLCB0aGlzIHdvdWxkIHJlbW92ZSBpdCBmcm9tIHRoZSBmaWx0ZXJlZCBsaXN0LlxuXHRcdFx0Y29uc3QgaXNPcHRpb25VbmlxdWUgPSB0aGlzLmlzT3B0aW9uVW5pcXVlKHtcblx0XHRcdFx0b3B0aW9uLFxuXHRcdFx0XHRvcHRpb25zOiBleGNsdWRlT3B0aW9ucy5jb25jYXQoZmlsdGVyZWRPcHRpb25zKVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChpc09wdGlvblVuaXF1ZSkge1xuXHRcdFx0XHRjb25zdCBwcm9tcHQgPSBwcm9tcHRUZXh0Q3JlYXRvcih0aGlzLmlucHV0VmFsdWUpO1xuXG5cdFx0XHRcdHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyT3B0aW9uID0gbmV3T3B0aW9uQ3JlYXRvcih7XG5cdFx0XHRcdFx0bGFiZWw6IHByb21wdCxcblx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcblx0XHRcdFx0XHR2YWx1ZUtleTogdGhpcy52YWx1ZUtleVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRmaWx0ZXJlZE9wdGlvbnMudW5zaGlmdCh0aGlzLl9jcmVhdGVQbGFjZWhvbGRlck9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZpbHRlcmVkT3B0aW9ucztcblx0fSxcblxuXHRpc09wdGlvblVuaXF1ZSAoe1xuXHRcdG9wdGlvbixcblx0XHRvcHRpb25zXG5cdH0pIHtcblx0XHRjb25zdCB7IGlzT3B0aW9uVW5pcXVlIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwgdGhpcy5zZWxlY3QuZmlsdGVyT3B0aW9ucygpO1xuXG5cdFx0cmV0dXJuIGlzT3B0aW9uVW5pcXVlKHtcblx0XHRcdGxhYmVsS2V5OiB0aGlzLmxhYmVsS2V5LFxuXHRcdFx0b3B0aW9uLFxuXHRcdFx0b3B0aW9ucyxcblx0XHRcdHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5XG5cdFx0fSk7XG5cdH0sXG5cblx0bWVudVJlbmRlcmVyIChwYXJhbXMpIHtcblx0XHRjb25zdCB7IG1lbnVSZW5kZXJlciB9ID0gdGhpcy5wcm9wcztcblxuXHRcdHJldHVybiBtZW51UmVuZGVyZXIoe1xuXHRcdFx0Li4ucGFyYW1zLFxuXHRcdFx0b25TZWxlY3Q6IHRoaXMub25PcHRpb25TZWxlY3QsXG5cdFx0XHRzZWxlY3RWYWx1ZTogdGhpcy5vbk9wdGlvblNlbGVjdFxuXHRcdH0pO1xuXHR9LFxuXG5cdG9uSW5wdXRDaGFuZ2UgKGlucHV0KSB7XG5cdFx0Y29uc3QgeyBvbklucHV0Q2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0aWYgKG9uSW5wdXRDaGFuZ2UpIHtcblx0XHRcdG9uSW5wdXRDaGFuZ2UoaW5wdXQpO1xuXHRcdH1cblxuXHRcdC8vIFRoaXMgdmFsdWUgbWF5IGJlIG5lZWRlZCBpbiBiZXR3ZWVuIFNlbGVjdCBtb3VudHMgKHdoZW4gdGhpcy5zZWxlY3QgaXMgbnVsbClcblx0XHR0aGlzLmlucHV0VmFsdWUgPSBpbnB1dDtcblx0fSxcblxuXHRvbklucHV0S2V5RG93biAoZXZlbnQpIHtcblx0XHRjb25zdCB7IHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbiwgb25JbnB1dEtleURvd24gfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgZm9jdXNlZE9wdGlvbiA9IHRoaXMuc2VsZWN0LmdldEZvY3VzZWRPcHRpb24oKTtcblxuXHRcdGlmIChcblx0XHRcdGZvY3VzZWRPcHRpb24gJiZcblx0XHRcdGZvY3VzZWRPcHRpb24gPT09IHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyT3B0aW9uICYmXG5cdFx0XHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24oeyBrZXlDb2RlOiBldmVudC5rZXlDb2RlIH0pXG5cdFx0KSB7XG5cdFx0XHR0aGlzLmNyZWF0ZU5ld09wdGlvbigpO1xuXG5cdFx0XHQvLyBQcmV2ZW50IGRlY29yYXRlZCBTZWxlY3QgZnJvbSBkb2luZyBhbnl0aGluZyBhZGRpdGlvbmFsIHdpdGggdGhpcyBrZXlEb3duIGV2ZW50XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH0gZWxzZSBpZiAob25JbnB1dEtleURvd24pIHtcblx0XHRcdG9uSW5wdXRLZXlEb3duKGV2ZW50KTtcblx0XHR9XG5cdH0sXG5cblx0b25PcHRpb25TZWxlY3QgKG9wdGlvbiwgZXZlbnQpIHtcblx0XHRpZiAob3B0aW9uID09PSB0aGlzLl9jcmVhdGVQbGFjZWhvbGRlck9wdGlvbikge1xuXHRcdFx0dGhpcy5jcmVhdGVOZXdPcHRpb24oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZWxlY3Quc2VsZWN0VmFsdWUob3B0aW9uKTtcblx0XHR9XG5cdH0sXG5cblx0Zm9jdXMgKCkge1xuXHRcdHRoaXMuc2VsZWN0LmZvY3VzKCk7XG5cdH0sXG5cblx0cmVuZGVyICgpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRuZXdPcHRpb25DcmVhdG9yLFxuXHRcdFx0c2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uLFxuXHRcdFx0Li4ucmVzdFByb3BzXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cblx0XHRsZXQgeyBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcblxuXHRcdC8vIFdlIGNhbid0IHVzZSBkZXN0cnVjdHVyaW5nIGRlZmF1bHQgdmFsdWVzIHRvIHNldCB0aGUgY2hpbGRyZW4sXG5cdFx0Ly8gYmVjYXVzZSBpdCB3b24ndCBhcHBseSB3b3JrIGlmIGBjaGlsZHJlbmAgaXMgbnVsbC4gQSBmYWxzeSBjaGVjayBpc1xuXHRcdC8vIG1vcmUgcmVsaWFibGUgaW4gcmVhbCB3b3JsZCB1c2UtY2FzZXMuXG5cdFx0aWYgKCFjaGlsZHJlbikge1xuXHRcdFx0Y2hpbGRyZW4gPSBkZWZhdWx0Q2hpbGRyZW47XG5cdFx0fVxuXG5cdFx0Y29uc3QgcHJvcHMgPSB7XG5cdFx0XHQuLi5yZXN0UHJvcHMsXG5cdFx0XHRhbGxvd0NyZWF0ZTogdHJ1ZSxcblx0XHRcdGZpbHRlck9wdGlvbnM6IHRoaXMuZmlsdGVyT3B0aW9ucyxcblx0XHRcdG1lbnVSZW5kZXJlcjogdGhpcy5tZW51UmVuZGVyZXIsXG5cdFx0XHRvbklucHV0Q2hhbmdlOiB0aGlzLm9uSW5wdXRDaGFuZ2UsXG5cdFx0XHRvbklucHV0S2V5RG93bjogdGhpcy5vbklucHV0S2V5RG93bixcblx0XHRcdHJlZjogKHJlZikgPT4ge1xuXHRcdFx0XHR0aGlzLnNlbGVjdCA9IHJlZjtcblxuXHRcdFx0XHQvLyBUaGVzZSB2YWx1ZXMgbWF5IGJlIG5lZWRlZCBpbiBiZXR3ZWVuIFNlbGVjdCBtb3VudHMgKHdoZW4gdGhpcy5zZWxlY3QgaXMgbnVsbClcblx0XHRcdFx0aWYgKHJlZikge1xuXHRcdFx0XHRcdHRoaXMubGFiZWxLZXkgPSByZWYucHJvcHMubGFiZWxLZXk7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZUtleSA9IHJlZi5wcm9wcy52YWx1ZUtleTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gY2hpbGRyZW4ocHJvcHMpO1xuXHR9XG59KTtcblxuZnVuY3Rpb24gZGVmYXVsdENoaWxkcmVuIChwcm9wcykge1xuXHRyZXR1cm4gKFxuXHRcdDxTZWxlY3Qgey4uLnByb3BzfSAvPlxuXHQpO1xufTtcblxuZnVuY3Rpb24gaXNPcHRpb25VbmlxdWUgKHsgb3B0aW9uLCBvcHRpb25zLCBsYWJlbEtleSwgdmFsdWVLZXkgfSkge1xuXHRyZXR1cm4gb3B0aW9uc1xuXHRcdC5maWx0ZXIoKGV4aXN0aW5nT3B0aW9uKSA9PlxuXHRcdFx0ZXhpc3RpbmdPcHRpb25bbGFiZWxLZXldID09PSBvcHRpb25bbGFiZWxLZXldIHx8XG5cdFx0XHRleGlzdGluZ09wdGlvblt2YWx1ZUtleV0gPT09IG9wdGlvblt2YWx1ZUtleV1cblx0XHQpXG5cdFx0Lmxlbmd0aCA9PT0gMDtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWROZXdPcHRpb24gKHsgbGFiZWwgfSkge1xuXHRyZXR1cm4gISFsYWJlbDtcbn07XG5cbmZ1bmN0aW9uIG5ld09wdGlvbkNyZWF0b3IgKHsgbGFiZWwsIGxhYmVsS2V5LCB2YWx1ZUtleSB9KSB7XG5cdGNvbnN0IG9wdGlvbiA9IHt9O1xuXHRvcHRpb25bdmFsdWVLZXldID0gbGFiZWw7XG4gXHRvcHRpb25bbGFiZWxLZXldID0gbGFiZWw7XG4gXHRvcHRpb24uY2xhc3NOYW1lID0gJ1NlbGVjdC1jcmVhdGUtb3B0aW9uLXBsYWNlaG9sZGVyJztcbiBcdHJldHVybiBvcHRpb247XG59O1xuXG5mdW5jdGlvbiBwcm9tcHRUZXh0Q3JlYXRvciAobGFiZWwpIHtcblx0cmV0dXJuIGBDcmVhdGUgb3B0aW9uIFwiJHtsYWJlbH1cImA7XG59XG5cbmZ1bmN0aW9uIHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbiAoeyBrZXlDb2RlIH0pIHtcblx0c3dpdGNoIChrZXlDb2RlKSB7XG5cdFx0Y2FzZSA5OiAgIC8vIFRBQlxuXHRcdGNhc2UgMTM6ICAvLyBFTlRFUlxuXHRcdGNhc2UgMTg4OiAvLyBDT01NQVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENyZWF0YWJsZVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBPcHRpb24gPSBjcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblx0XHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAgIC8vIGNsYXNzTmFtZSAoYmFzZWQgb24gbW91c2UgcG9zaXRpb24pXG5cdFx0aW5zdGFuY2VQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCwgIC8vIHVuaXF1ZSBwcmVmaXggZm9yIHRoZSBpZHMgKHVzZWQgZm9yIGFyaWEpXG5cdFx0aXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIGRpc2FibGVkXG5cdFx0aXNGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIGZvY3VzZWRcblx0XHRpc1NlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgIC8vIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWRcblx0XHRvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgbW91c2VFbnRlciBvbiBvcHRpb24gZWxlbWVudFxuXHRcdG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBjbGljayBvbiBvcHRpb24gZWxlbWVudFxuXHRcdG9uVW5mb2N1czogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBtb3VzZUxlYXZlIG9uIG9wdGlvbiBlbGVtZW50XG5cdFx0b3B0aW9uOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsICAgICAvLyBvYmplY3QgdGhhdCBpcyBiYXNlIGZvciB0aGF0IG9wdGlvblxuXHRcdG9wdGlvbkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLCAgICAgICAgICAgLy8gaW5kZXggb2YgdGhlIG9wdGlvbiwgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRzIGZvciBhcmlhXG5cdH0sXG5cdGJsb2NrRXZlbnQgKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRpZiAoKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQScpIHx8ICEoJ2hyZWYnIGluIGV2ZW50LnRhcmdldCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGV2ZW50LnRhcmdldC50YXJnZXQpIHtcblx0XHRcdHdpbmRvdy5vcGVuKGV2ZW50LnRhcmdldC5ocmVmLCBldmVudC50YXJnZXQudGFyZ2V0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBldmVudC50YXJnZXQuaHJlZjtcblx0XHR9XG5cdH0sXG5cblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0dGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZU1vdXNlRW50ZXIgKGV2ZW50KSB7XG5cdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVNb3VzZU1vdmUgKGV2ZW50KSB7XG5cdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaEVuZChldmVudCl7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZih0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHR0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCk7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hNb3ZlIChldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hTdGFydCAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cdH0sXG5cblx0b25Gb2N1cyAoZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNGb2N1c2VkKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uRm9jdXModGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0XHR9XG5cdH0sXG5cdGhhbmRsZU9wdGlvbkRlbGV0ZShldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMub25EZWxldGUodGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0fSxcblx0aGFuZGxlT3B0aW9uRGVsZXRlVG91Y2hFbmQoZXZlbnQpIHtcblx0XHRpZih0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5vbkRlbGV0ZSh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciB7IG9wdGlvbiwgaW5zdGFuY2VQcmVmaXgsIG9wdGlvbkluZGV4LCBkZWxldGFibGUgfSA9IHRoaXMucHJvcHM7XG5cdFx0dmFyIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXModGhpcy5wcm9wcy5jbGFzc05hbWUsIG9wdGlvbi5jbGFzc05hbWUpO1xuXG5cdFx0cmV0dXJuIGRlbGV0YWJsZSA/IChcblx0XHRcdG9wdGlvbi5kaXNhYmxlZCA/IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5ibG9ja0V2ZW50fVxuXHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuYmxvY2tFdmVudH0+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LWNsZWFyIFNlbGVjdC1jbGVhci1tZW51XCIgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlT3B0aW9uRGVsZXRlfT54PC9zcGFuPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCkgOiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0c3R5bGU9e29wdGlvbi5zdHlsZX1cblx0XHRcdFx0XHRyb2xlPVwib3B0aW9uXCJcblx0XHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259XG5cdFx0XHRcdFx0b25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXJ9XG5cdFx0XHRcdFx0b25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfVxuXHRcdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRcdG9uVG91Y2hNb3ZlPXt0aGlzLmhhbmRsZVRvdWNoTW92ZX1cblx0XHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kfVxuXHRcdFx0XHRcdGlkPXtpbnN0YW5jZVByZWZpeCArICctb3B0aW9uLScgKyBvcHRpb25JbmRleH1cblx0XHRcdFx0XHR0aXRsZT17b3B0aW9uLnRpdGxlfT5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtY2xlYXIgU2VsZWN0LWNsZWFyLW1lbnVcIiBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVPcHRpb25EZWxldGV9IG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlT3B0aW9uRGVsZXRlVG91Y2hFbmR9Png8L3NwYW4+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdCkgOiAoXG5cdFx0XHRvcHRpb24uZGlzYWJsZWQgPyAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuYmxvY2tFdmVudH1cblx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmJsb2NrRXZlbnR9PlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCkgOiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0c3R5bGU9e29wdGlvbi5zdHlsZX1cblx0XHRcdFx0XHRyb2xlPVwib3B0aW9uXCJcblx0XHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259XG5cdFx0XHRcdFx0b25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXJ9XG5cdFx0XHRcdFx0b25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfVxuXHRcdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRcdG9uVG91Y2hNb3ZlPXt0aGlzLmhhbmRsZVRvdWNoTW92ZX1cblx0XHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kfVxuXHRcdFx0XHRcdGlkPXtpbnN0YW5jZVByZWZpeCArICctb3B0aW9uLScgKyBvcHRpb25JbmRleH1cblx0XHRcdFx0XHR0aXRsZT17b3B0aW9uLnRpdGxlfT5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gT3B0aW9uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBWYWx1ZSA9IGNyZWF0ZUNsYXNzKHtcblxuXHRkaXNwbGF5TmFtZTogJ1ZhbHVlJyxcblxuXHRwcm9wVHlwZXM6IHtcblx0XHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG5cdFx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgIC8vIGRpc2FibGVkIHByb3AgcGFzc2VkIHRvIFJlYWN0U2VsZWN0XG5cdFx0aWQ6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAgICAgICAgIC8vIFVuaXF1ZSBpZCBmb3IgdGhlIHZhbHVlIC0gdXNlZCBmb3IgYXJpYVxuXHRcdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgICAvLyBtZXRob2QgdG8gaGFuZGxlIGNsaWNrIG9uIHZhbHVlIGxhYmVsXG5cdFx0b25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgcmVtb3ZhbCBvZiB0aGUgdmFsdWVcblx0XHR2YWx1ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLCAgICAgLy8gdGhlIG9wdGlvbiBvYmplY3QgZm9yIHRoaXMgdmFsdWVcblx0fSxcblxuXHRoYW5kbGVNb3VzZURvd24gKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLnZhbHVlLCBldmVudCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLnZhbHVlLmhyZWYpIHtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSxcblxuXHRvblJlbW92ZSAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy52YWx1ZSk7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hFbmRSZW1vdmUgKGV2ZW50KXtcblx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdGlmKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdC8vIEZpcmUgdGhlIG1vdXNlIGV2ZW50c1xuXHRcdHRoaXMub25SZW1vdmUoZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoTW92ZSAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZFxuXHRcdHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoU3RhcnQgKGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIG5vdCBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXHR9LFxuXG5cdHJlbmRlclJlbW92ZUljb24gKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8ICF0aGlzLnByb3BzLm9uUmVtb3ZlKSByZXR1cm47XG5cdFx0cmV0dXJuIChcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC12YWx1ZS1pY29uXCJcblx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMub25SZW1vdmV9XG5cdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmRSZW1vdmV9XG5cdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRvblRvdWNoTW92ZT17dGhpcy5oYW5kbGVUb3VjaE1vdmV9PlxuXHRcdFx0XHQmdGltZXM7XG5cdFx0XHQ8L3NwYW4+XG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXJMYWJlbCAoKSB7XG5cdFx0bGV0IGNsYXNzTmFtZSA9ICdTZWxlY3QtdmFsdWUtbGFiZWwnO1xuXHRcdHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2sgfHwgdGhpcy5wcm9wcy52YWx1ZS5ocmVmID8gKFxuXHRcdFx0PGEgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGhyZWY9e3RoaXMucHJvcHMudmFsdWUuaHJlZn0gdGFyZ2V0PXt0aGlzLnByb3BzLnZhbHVlLnRhcmdldH0gb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufSBvblRvdWNoRW5kPXt0aGlzLmhhbmRsZU1vdXNlRG93bn0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9hPlxuXHRcdCkgOiAoXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gcm9sZT1cIm9wdGlvblwiIGFyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCIgaWQ9e3RoaXMucHJvcHMuaWR9PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdDwvc3Bhbj5cblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdTZWxlY3QtdmFsdWUnLCB0aGlzLnByb3BzLnZhbHVlLmNsYXNzTmFtZSl9XG5cdFx0XHRcdHN0eWxlPXt0aGlzLnByb3BzLnZhbHVlLnN0eWxlfVxuXHRcdFx0XHR0aXRsZT17dGhpcy5wcm9wcy52YWx1ZS50aXRsZX1cblx0XHRcdFx0PlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJSZW1vdmVJY29uKCl9XG5cdFx0XHRcdHt0aGlzLnJlbmRlckxhYmVsKCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbHVlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXJyb3dSZW5kZXJlciAoeyBvbk1vdXNlRG93biB9KSB7XG5cdHJldHVybiAoXG5cdFx0PHNwYW5cblx0XHRcdGNsYXNzTmFtZT1cIlNlbGVjdC1hcnJvd1wiXG5cdFx0XHRvbk1vdXNlRG93bj17b25Nb3VzZURvd259XG5cdFx0Lz5cblx0KTtcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbGVhclJlbmRlcmVyICgpIHtcblx0cmV0dXJuIChcblx0XHQ8c3BhblxuXHRcdFx0Y2xhc3NOYW1lPVwiU2VsZWN0LWNsZWFyXCJcblx0XHRcdGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogJyZ0aW1lczsnIH19XG5cdFx0Lz5cblx0KTtcbn07XG4iLCJpbXBvcnQgc3RyaXBEaWFjcml0aWNzIGZyb20gJy4vc3RyaXBEaWFjcml0aWNzJztcblxuZnVuY3Rpb24gZmlsdGVyT3B0aW9ucyAob3B0aW9ucywgZmlsdGVyVmFsdWUsIGV4Y2x1ZGVPcHRpb25zLCBwcm9wcykge1xuXHRpZiAocHJvcHMuaWdub3JlQWNjZW50cykge1xuXHRcdGZpbHRlclZhbHVlID0gc3RyaXBEaWFjcml0aWNzKGZpbHRlclZhbHVlKTtcblx0fVxuXG5cdGlmIChwcm9wcy5pZ25vcmVDYXNlKSB7XG5cdFx0ZmlsdGVyVmFsdWUgPSBmaWx0ZXJWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHR9XG5cblx0aWYgKGV4Y2x1ZGVPcHRpb25zKSBleGNsdWRlT3B0aW9ucyA9IGV4Y2x1ZGVPcHRpb25zLm1hcChpID0+IGlbcHJvcHMudmFsdWVLZXldKTtcblxuXHRyZXR1cm4gb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IHtcblx0XHRpZiAoZXhjbHVkZU9wdGlvbnMgJiYgZXhjbHVkZU9wdGlvbnMuaW5kZXhPZihvcHRpb25bcHJvcHMudmFsdWVLZXldKSA+IC0xKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYgKHByb3BzLmZpbHRlck9wdGlvbikgcmV0dXJuIHByb3BzLmZpbHRlck9wdGlvbi5jYWxsKHRoaXMsIG9wdGlvbiwgZmlsdGVyVmFsdWUpO1xuXHRcdGlmICghZmlsdGVyVmFsdWUpIHJldHVybiB0cnVlO1xuXHRcdHZhciB2YWx1ZVRlc3QgPSBTdHJpbmcob3B0aW9uW3Byb3BzLnZhbHVlS2V5XSk7XG5cdFx0dmFyIGxhYmVsVGVzdCA9IFN0cmluZyhvcHRpb25bcHJvcHMubGFiZWxLZXldKTtcblx0XHRpZiAocHJvcHMuaWdub3JlQWNjZW50cykge1xuXHRcdFx0aWYgKHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJykgdmFsdWVUZXN0ID0gc3RyaXBEaWFjcml0aWNzKHZhbHVlVGVzdCk7XG5cdFx0XHRpZiAocHJvcHMubWF0Y2hQcm9wICE9PSAndmFsdWUnKSBsYWJlbFRlc3QgPSBzdHJpcERpYWNyaXRpY3MobGFiZWxUZXN0KTtcblx0XHR9XG5cdFx0aWYgKHByb3BzLmlnbm9yZUNhc2UpIHtcblx0XHRcdGlmIChwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcpIHZhbHVlVGVzdCA9IHZhbHVlVGVzdC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJykgbGFiZWxUZXN0ID0gbGFiZWxUZXN0LnRvTG93ZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHJldHVybiBwcm9wcy5tYXRjaFBvcyA9PT0gJ3N0YXJ0JyA/IChcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcgJiYgdmFsdWVUZXN0LnN1YnN0cigwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZSkgfHxcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgbGFiZWxUZXN0LnN1YnN0cigwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZSlcblx0XHQpIDogKFxuXHRcdFx0KHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJyAmJiB2YWx1ZVRlc3QuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgPj0gMCkgfHxcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgbGFiZWxUZXN0LmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDApXG5cdFx0KTtcblx0fSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsdGVyT3B0aW9ucztcbiIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gbWVudVJlbmRlcmVyICh7XG5cdGZvY3VzZWRPcHRpb24sXG5cdGluc3RhbmNlUHJlZml4LFxuXHRsYWJlbEtleSxcblx0b25Gb2N1cyxcblx0b25TZWxlY3QsXG5cdG9uRGVsZXRlLFxuXHRkZWxldGFibGUsXG5cdG9wdGlvbkNsYXNzTmFtZSxcblx0b3B0aW9uQ29tcG9uZW50LFxuXHRvcHRpb25SZW5kZXJlcixcblx0b3B0aW9ucyxcblx0dmFsdWVBcnJheSxcblx0dmFsdWVLZXksXG5cdG9uT3B0aW9uUmVmXG59KSB7XG5cdGxldCBPcHRpb24gPSBvcHRpb25Db21wb25lbnQ7XG5cblx0cmV0dXJuIG9wdGlvbnMubWFwKChvcHRpb24sIGkpID0+IHtcblx0XHRsZXQgaXNTZWxlY3RlZCA9IHZhbHVlQXJyYXkgJiYgdmFsdWVBcnJheS5pbmRleE9mKG9wdGlvbikgPiAtMTtcblx0XHRsZXQgaXNGb2N1c2VkID0gb3B0aW9uID09PSBmb2N1c2VkT3B0aW9uO1xuXHRcdGxldCBvcHRpb25DbGFzcyA9IGNsYXNzTmFtZXMob3B0aW9uQ2xhc3NOYW1lLCB7XG5cdFx0XHQnU2VsZWN0LW9wdGlvbic6IHRydWUsXG5cdFx0XHQnaXMtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkLFxuXHRcdFx0J2lzLWZvY3VzZWQnOiBpc0ZvY3VzZWQsXG5cdFx0XHQnaXMtZGlzYWJsZWQnOiBvcHRpb24uZGlzYWJsZWRcblx0XHR9KTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8T3B0aW9uXG5cdFx0XHRcdGNsYXNzTmFtZT17b3B0aW9uQ2xhc3N9XG5cdFx0XHRcdGluc3RhbmNlUHJlZml4PXtpbnN0YW5jZVByZWZpeH1cblx0XHRcdFx0aXNEaXNhYmxlZD17b3B0aW9uLmRpc2FibGVkfVxuXHRcdFx0XHRpc0ZvY3VzZWQ9e2lzRm9jdXNlZH1cblx0XHRcdFx0aXNTZWxlY3RlZD17aXNTZWxlY3RlZH1cblx0XHRcdFx0a2V5PXtgb3B0aW9uLSR7aX0tJHtvcHRpb25bdmFsdWVLZXldfWB9XG5cdFx0XHRcdG9uRm9jdXM9e29uRm9jdXN9XG5cdFx0XHRcdG9uU2VsZWN0PXtvblNlbGVjdH1cblx0XHRcdFx0b25EZWxldGU9e29uRGVsZXRlfVxuXHRcdFx0XHRkZWxldGFibGU9e2RlbGV0YWJsZX1cblx0XHRcdFx0b3B0aW9uPXtvcHRpb259XG5cdFx0XHRcdG9wdGlvbkluZGV4PXtpfVxuXHRcdFx0XHRyZWY9e3JlZiA9PiB7IG9uT3B0aW9uUmVmKHJlZiwgaXNGb2N1c2VkKTsgfX1cblx0XHRcdD5cblx0XHRcdFx0e29wdGlvblJlbmRlcmVyKG9wdGlvbiwgaSl9XG5cdFx0XHQ8L09wdGlvbj5cblx0XHQpO1xuXHR9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZW51UmVuZGVyZXI7XG4iLCJ2YXIgbWFwID0gW1xuXHR7ICdiYXNlJzonQScsICdsZXR0ZXJzJzovW1xcdTAwNDFcXHUyNEI2XFx1RkYyMVxcdTAwQzBcXHUwMEMxXFx1MDBDMlxcdTFFQTZcXHUxRUE0XFx1MUVBQVxcdTFFQThcXHUwMEMzXFx1MDEwMFxcdTAxMDJcXHUxRUIwXFx1MUVBRVxcdTFFQjRcXHUxRUIyXFx1MDIyNlxcdTAxRTBcXHUwMEM0XFx1MDFERVxcdTFFQTJcXHUwMEM1XFx1MDFGQVxcdTAxQ0RcXHUwMjAwXFx1MDIwMlxcdTFFQTBcXHUxRUFDXFx1MUVCNlxcdTFFMDBcXHUwMTA0XFx1MDIzQVxcdTJDNkZdL2cgfSxcblx0eyAnYmFzZSc6J0FBJywnbGV0dGVycyc6L1tcXHVBNzMyXS9nIH0sXG5cdHsgJ2Jhc2UnOidBRScsJ2xldHRlcnMnOi9bXFx1MDBDNlxcdTAxRkNcXHUwMUUyXS9nIH0sXG5cdHsgJ2Jhc2UnOidBTycsJ2xldHRlcnMnOi9bXFx1QTczNF0vZyB9LFxuXHR7ICdiYXNlJzonQVUnLCdsZXR0ZXJzJzovW1xcdUE3MzZdL2cgfSxcblx0eyAnYmFzZSc6J0FWJywnbGV0dGVycyc6L1tcXHVBNzM4XFx1QTczQV0vZyB9LFxuXHR7ICdiYXNlJzonQVknLCdsZXR0ZXJzJzovW1xcdUE3M0NdL2cgfSxcblx0eyAnYmFzZSc6J0InLCAnbGV0dGVycyc6L1tcXHUwMDQyXFx1MjRCN1xcdUZGMjJcXHUxRTAyXFx1MUUwNFxcdTFFMDZcXHUwMjQzXFx1MDE4MlxcdTAxODFdL2cgfSxcblx0eyAnYmFzZSc6J0MnLCAnbGV0dGVycyc6L1tcXHUwMDQzXFx1MjRCOFxcdUZGMjNcXHUwMTA2XFx1MDEwOFxcdTAxMEFcXHUwMTBDXFx1MDBDN1xcdTFFMDhcXHUwMTg3XFx1MDIzQlxcdUE3M0VdL2cgfSxcblx0eyAnYmFzZSc6J0QnLCAnbGV0dGVycyc6L1tcXHUwMDQ0XFx1MjRCOVxcdUZGMjRcXHUxRTBBXFx1MDEwRVxcdTFFMENcXHUxRTEwXFx1MUUxMlxcdTFFMEVcXHUwMTEwXFx1MDE4QlxcdTAxOEFcXHUwMTg5XFx1QTc3OV0vZyB9LFxuXHR7ICdiYXNlJzonRFonLCdsZXR0ZXJzJzovW1xcdTAxRjFcXHUwMUM0XS9nIH0sXG5cdHsgJ2Jhc2UnOidEeicsJ2xldHRlcnMnOi9bXFx1MDFGMlxcdTAxQzVdL2cgfSxcblx0eyAnYmFzZSc6J0UnLCAnbGV0dGVycyc6L1tcXHUwMDQ1XFx1MjRCQVxcdUZGMjVcXHUwMEM4XFx1MDBDOVxcdTAwQ0FcXHUxRUMwXFx1MUVCRVxcdTFFQzRcXHUxRUMyXFx1MUVCQ1xcdTAxMTJcXHUxRTE0XFx1MUUxNlxcdTAxMTRcXHUwMTE2XFx1MDBDQlxcdTFFQkFcXHUwMTFBXFx1MDIwNFxcdTAyMDZcXHUxRUI4XFx1MUVDNlxcdTAyMjhcXHUxRTFDXFx1MDExOFxcdTFFMThcXHUxRTFBXFx1MDE5MFxcdTAxOEVdL2cgfSxcblx0eyAnYmFzZSc6J0YnLCAnbGV0dGVycyc6L1tcXHUwMDQ2XFx1MjRCQlxcdUZGMjZcXHUxRTFFXFx1MDE5MVxcdUE3N0JdL2cgfSxcblx0eyAnYmFzZSc6J0cnLCAnbGV0dGVycyc6L1tcXHUwMDQ3XFx1MjRCQ1xcdUZGMjdcXHUwMUY0XFx1MDExQ1xcdTFFMjBcXHUwMTFFXFx1MDEyMFxcdTAxRTZcXHUwMTIyXFx1MDFFNFxcdTAxOTNcXHVBN0EwXFx1QTc3RFxcdUE3N0VdL2cgfSxcblx0eyAnYmFzZSc6J0gnLCAnbGV0dGVycyc6L1tcXHUwMDQ4XFx1MjRCRFxcdUZGMjhcXHUwMTI0XFx1MUUyMlxcdTFFMjZcXHUwMjFFXFx1MUUyNFxcdTFFMjhcXHUxRTJBXFx1MDEyNlxcdTJDNjdcXHUyQzc1XFx1QTc4RF0vZyB9LFxuXHR7ICdiYXNlJzonSScsICdsZXR0ZXJzJzovW1xcdTAwNDlcXHUyNEJFXFx1RkYyOVxcdTAwQ0NcXHUwMENEXFx1MDBDRVxcdTAxMjhcXHUwMTJBXFx1MDEyQ1xcdTAxMzBcXHUwMENGXFx1MUUyRVxcdTFFQzhcXHUwMUNGXFx1MDIwOFxcdTAyMEFcXHUxRUNBXFx1MDEyRVxcdTFFMkNcXHUwMTk3XS9nIH0sXG5cdHsgJ2Jhc2UnOidKJywgJ2xldHRlcnMnOi9bXFx1MDA0QVxcdTI0QkZcXHVGRjJBXFx1MDEzNFxcdTAyNDhdL2cgfSxcblx0eyAnYmFzZSc6J0snLCAnbGV0dGVycyc6L1tcXHUwMDRCXFx1MjRDMFxcdUZGMkJcXHUxRTMwXFx1MDFFOFxcdTFFMzJcXHUwMTM2XFx1MUUzNFxcdTAxOThcXHUyQzY5XFx1QTc0MFxcdUE3NDJcXHVBNzQ0XFx1QTdBMl0vZyB9LFxuXHR7ICdiYXNlJzonTCcsICdsZXR0ZXJzJzovW1xcdTAwNENcXHUyNEMxXFx1RkYyQ1xcdTAxM0ZcXHUwMTM5XFx1MDEzRFxcdTFFMzZcXHUxRTM4XFx1MDEzQlxcdTFFM0NcXHUxRTNBXFx1MDE0MVxcdTAyM0RcXHUyQzYyXFx1MkM2MFxcdUE3NDhcXHVBNzQ2XFx1QTc4MF0vZyB9LFxuXHR7ICdiYXNlJzonTEonLCdsZXR0ZXJzJzovW1xcdTAxQzddL2cgfSxcblx0eyAnYmFzZSc6J0xqJywnbGV0dGVycyc6L1tcXHUwMUM4XS9nIH0sXG5cdHsgJ2Jhc2UnOidNJywgJ2xldHRlcnMnOi9bXFx1MDA0RFxcdTI0QzJcXHVGRjJEXFx1MUUzRVxcdTFFNDBcXHUxRTQyXFx1MkM2RVxcdTAxOUNdL2cgfSxcblx0eyAnYmFzZSc6J04nLCAnbGV0dGVycyc6L1tcXHUwMDRFXFx1MjRDM1xcdUZGMkVcXHUwMUY4XFx1MDE0M1xcdTAwRDFcXHUxRTQ0XFx1MDE0N1xcdTFFNDZcXHUwMTQ1XFx1MUU0QVxcdTFFNDhcXHUwMjIwXFx1MDE5RFxcdUE3OTBcXHVBN0E0XS9nIH0sXG5cdHsgJ2Jhc2UnOidOSicsJ2xldHRlcnMnOi9bXFx1MDFDQV0vZyB9LFxuXHR7ICdiYXNlJzonTmonLCdsZXR0ZXJzJzovW1xcdTAxQ0JdL2cgfSxcblx0eyAnYmFzZSc6J08nLCAnbGV0dGVycyc6L1tcXHUwMDRGXFx1MjRDNFxcdUZGMkZcXHUwMEQyXFx1MDBEM1xcdTAwRDRcXHUxRUQyXFx1MUVEMFxcdTFFRDZcXHUxRUQ0XFx1MDBENVxcdTFFNENcXHUwMjJDXFx1MUU0RVxcdTAxNENcXHUxRTUwXFx1MUU1MlxcdTAxNEVcXHUwMjJFXFx1MDIzMFxcdTAwRDZcXHUwMjJBXFx1MUVDRVxcdTAxNTBcXHUwMUQxXFx1MDIwQ1xcdTAyMEVcXHUwMUEwXFx1MUVEQ1xcdTFFREFcXHUxRUUwXFx1MUVERVxcdTFFRTJcXHUxRUNDXFx1MUVEOFxcdTAxRUFcXHUwMUVDXFx1MDBEOFxcdTAxRkVcXHUwMTg2XFx1MDE5RlxcdUE3NEFcXHVBNzRDXS9nIH0sXG5cdHsgJ2Jhc2UnOidPSScsJ2xldHRlcnMnOi9bXFx1MDFBMl0vZyB9LFxuXHR7ICdiYXNlJzonT08nLCdsZXR0ZXJzJzovW1xcdUE3NEVdL2cgfSxcblx0eyAnYmFzZSc6J09VJywnbGV0dGVycyc6L1tcXHUwMjIyXS9nIH0sXG5cdHsgJ2Jhc2UnOidQJywgJ2xldHRlcnMnOi9bXFx1MDA1MFxcdTI0QzVcXHVGRjMwXFx1MUU1NFxcdTFFNTZcXHUwMUE0XFx1MkM2M1xcdUE3NTBcXHVBNzUyXFx1QTc1NF0vZyB9LFxuXHR7ICdiYXNlJzonUScsICdsZXR0ZXJzJzovW1xcdTAwNTFcXHUyNEM2XFx1RkYzMVxcdUE3NTZcXHVBNzU4XFx1MDI0QV0vZyB9LFxuXHR7ICdiYXNlJzonUicsICdsZXR0ZXJzJzovW1xcdTAwNTJcXHUyNEM3XFx1RkYzMlxcdTAxNTRcXHUxRTU4XFx1MDE1OFxcdTAyMTBcXHUwMjEyXFx1MUU1QVxcdTFFNUNcXHUwMTU2XFx1MUU1RVxcdTAyNENcXHUyQzY0XFx1QTc1QVxcdUE3QTZcXHVBNzgyXS9nIH0sXG5cdHsgJ2Jhc2UnOidTJywgJ2xldHRlcnMnOi9bXFx1MDA1M1xcdTI0QzhcXHVGRjMzXFx1MUU5RVxcdTAxNUFcXHUxRTY0XFx1MDE1Q1xcdTFFNjBcXHUwMTYwXFx1MUU2NlxcdTFFNjJcXHUxRTY4XFx1MDIxOFxcdTAxNUVcXHUyQzdFXFx1QTdBOFxcdUE3ODRdL2cgfSxcblx0eyAnYmFzZSc6J1QnLCAnbGV0dGVycyc6L1tcXHUwMDU0XFx1MjRDOVxcdUZGMzRcXHUxRTZBXFx1MDE2NFxcdTFFNkNcXHUwMjFBXFx1MDE2MlxcdTFFNzBcXHUxRTZFXFx1MDE2NlxcdTAxQUNcXHUwMUFFXFx1MDIzRVxcdUE3ODZdL2cgfSxcblx0eyAnYmFzZSc6J1RaJywnbGV0dGVycyc6L1tcXHVBNzI4XS9nIH0sXG5cdHsgJ2Jhc2UnOidVJywgJ2xldHRlcnMnOi9bXFx1MDA1NVxcdTI0Q0FcXHVGRjM1XFx1MDBEOVxcdTAwREFcXHUwMERCXFx1MDE2OFxcdTFFNzhcXHUwMTZBXFx1MUU3QVxcdTAxNkNcXHUwMERDXFx1MDFEQlxcdTAxRDdcXHUwMUQ1XFx1MDFEOVxcdTFFRTZcXHUwMTZFXFx1MDE3MFxcdTAxRDNcXHUwMjE0XFx1MDIxNlxcdTAxQUZcXHUxRUVBXFx1MUVFOFxcdTFFRUVcXHUxRUVDXFx1MUVGMFxcdTFFRTRcXHUxRTcyXFx1MDE3MlxcdTFFNzZcXHUxRTc0XFx1MDI0NF0vZyB9LFxuXHR7ICdiYXNlJzonVicsICdsZXR0ZXJzJzovW1xcdTAwNTZcXHUyNENCXFx1RkYzNlxcdTFFN0NcXHUxRTdFXFx1MDFCMlxcdUE3NUVcXHUwMjQ1XS9nIH0sXG5cdHsgJ2Jhc2UnOidWWScsJ2xldHRlcnMnOi9bXFx1QTc2MF0vZyB9LFxuXHR7ICdiYXNlJzonVycsICdsZXR0ZXJzJzovW1xcdTAwNTdcXHUyNENDXFx1RkYzN1xcdTFFODBcXHUxRTgyXFx1MDE3NFxcdTFFODZcXHUxRTg0XFx1MUU4OFxcdTJDNzJdL2cgfSxcblx0eyAnYmFzZSc6J1gnLCAnbGV0dGVycyc6L1tcXHUwMDU4XFx1MjRDRFxcdUZGMzhcXHUxRThBXFx1MUU4Q10vZyB9LFxuXHR7ICdiYXNlJzonWScsICdsZXR0ZXJzJzovW1xcdTAwNTlcXHUyNENFXFx1RkYzOVxcdTFFRjJcXHUwMEREXFx1MDE3NlxcdTFFRjhcXHUwMjMyXFx1MUU4RVxcdTAxNzhcXHUxRUY2XFx1MUVGNFxcdTAxQjNcXHUwMjRFXFx1MUVGRV0vZyB9LFxuXHR7ICdiYXNlJzonWicsICdsZXR0ZXJzJzovW1xcdTAwNUFcXHUyNENGXFx1RkYzQVxcdTAxNzlcXHUxRTkwXFx1MDE3QlxcdTAxN0RcXHUxRTkyXFx1MUU5NFxcdTAxQjVcXHUwMjI0XFx1MkM3RlxcdTJDNkJcXHVBNzYyXS9nIH0sXG5cdHsgJ2Jhc2UnOidhJywgJ2xldHRlcnMnOi9bXFx1MDA2MVxcdTI0RDBcXHVGRjQxXFx1MUU5QVxcdTAwRTBcXHUwMEUxXFx1MDBFMlxcdTFFQTdcXHUxRUE1XFx1MUVBQlxcdTFFQTlcXHUwMEUzXFx1MDEwMVxcdTAxMDNcXHUxRUIxXFx1MUVBRlxcdTFFQjVcXHUxRUIzXFx1MDIyN1xcdTAxRTFcXHUwMEU0XFx1MDFERlxcdTFFQTNcXHUwMEU1XFx1MDFGQlxcdTAxQ0VcXHUwMjAxXFx1MDIwM1xcdTFFQTFcXHUxRUFEXFx1MUVCN1xcdTFFMDFcXHUwMTA1XFx1MkM2NVxcdTAyNTBdL2cgfSxcblx0eyAnYmFzZSc6J2FhJywnbGV0dGVycyc6L1tcXHVBNzMzXS9nIH0sXG5cdHsgJ2Jhc2UnOidhZScsJ2xldHRlcnMnOi9bXFx1MDBFNlxcdTAxRkRcXHUwMUUzXS9nIH0sXG5cdHsgJ2Jhc2UnOidhbycsJ2xldHRlcnMnOi9bXFx1QTczNV0vZyB9LFxuXHR7ICdiYXNlJzonYXUnLCdsZXR0ZXJzJzovW1xcdUE3MzddL2cgfSxcblx0eyAnYmFzZSc6J2F2JywnbGV0dGVycyc6L1tcXHVBNzM5XFx1QTczQl0vZyB9LFxuXHR7ICdiYXNlJzonYXknLCdsZXR0ZXJzJzovW1xcdUE3M0RdL2cgfSxcblx0eyAnYmFzZSc6J2InLCAnbGV0dGVycyc6L1tcXHUwMDYyXFx1MjREMVxcdUZGNDJcXHUxRTAzXFx1MUUwNVxcdTFFMDdcXHUwMTgwXFx1MDE4M1xcdTAyNTNdL2cgfSxcblx0eyAnYmFzZSc6J2MnLCAnbGV0dGVycyc6L1tcXHUwMDYzXFx1MjREMlxcdUZGNDNcXHUwMTA3XFx1MDEwOVxcdTAxMEJcXHUwMTBEXFx1MDBFN1xcdTFFMDlcXHUwMTg4XFx1MDIzQ1xcdUE3M0ZcXHUyMTg0XS9nIH0sXG5cdHsgJ2Jhc2UnOidkJywgJ2xldHRlcnMnOi9bXFx1MDA2NFxcdTI0RDNcXHVGRjQ0XFx1MUUwQlxcdTAxMEZcXHUxRTBEXFx1MUUxMVxcdTFFMTNcXHUxRTBGXFx1MDExMVxcdTAxOENcXHUwMjU2XFx1MDI1N1xcdUE3N0FdL2cgfSxcblx0eyAnYmFzZSc6J2R6JywnbGV0dGVycyc6L1tcXHUwMUYzXFx1MDFDNl0vZyB9LFxuXHR7ICdiYXNlJzonZScsICdsZXR0ZXJzJzovW1xcdTAwNjVcXHUyNEQ0XFx1RkY0NVxcdTAwRThcXHUwMEU5XFx1MDBFQVxcdTFFQzFcXHUxRUJGXFx1MUVDNVxcdTFFQzNcXHUxRUJEXFx1MDExM1xcdTFFMTVcXHUxRTE3XFx1MDExNVxcdTAxMTdcXHUwMEVCXFx1MUVCQlxcdTAxMUJcXHUwMjA1XFx1MDIwN1xcdTFFQjlcXHUxRUM3XFx1MDIyOVxcdTFFMURcXHUwMTE5XFx1MUUxOVxcdTFFMUJcXHUwMjQ3XFx1MDI1QlxcdTAxRERdL2cgfSxcblx0eyAnYmFzZSc6J2YnLCAnbGV0dGVycyc6L1tcXHUwMDY2XFx1MjRENVxcdUZGNDZcXHUxRTFGXFx1MDE5MlxcdUE3N0NdL2cgfSxcblx0eyAnYmFzZSc6J2cnLCAnbGV0dGVycyc6L1tcXHUwMDY3XFx1MjRENlxcdUZGNDdcXHUwMUY1XFx1MDExRFxcdTFFMjFcXHUwMTFGXFx1MDEyMVxcdTAxRTdcXHUwMTIzXFx1MDFFNVxcdTAyNjBcXHVBN0ExXFx1MUQ3OVxcdUE3N0ZdL2cgfSxcblx0eyAnYmFzZSc6J2gnLCAnbGV0dGVycyc6L1tcXHUwMDY4XFx1MjREN1xcdUZGNDhcXHUwMTI1XFx1MUUyM1xcdTFFMjdcXHUwMjFGXFx1MUUyNVxcdTFFMjlcXHUxRTJCXFx1MUU5NlxcdTAxMjdcXHUyQzY4XFx1MkM3NlxcdTAyNjVdL2cgfSxcblx0eyAnYmFzZSc6J2h2JywnbGV0dGVycyc6L1tcXHUwMTk1XS9nIH0sXG5cdHsgJ2Jhc2UnOidpJywgJ2xldHRlcnMnOi9bXFx1MDA2OVxcdTI0RDhcXHVGRjQ5XFx1MDBFQ1xcdTAwRURcXHUwMEVFXFx1MDEyOVxcdTAxMkJcXHUwMTJEXFx1MDBFRlxcdTFFMkZcXHUxRUM5XFx1MDFEMFxcdTAyMDlcXHUwMjBCXFx1MUVDQlxcdTAxMkZcXHUxRTJEXFx1MDI2OFxcdTAxMzFdL2cgfSxcblx0eyAnYmFzZSc6J2onLCAnbGV0dGVycyc6L1tcXHUwMDZBXFx1MjREOVxcdUZGNEFcXHUwMTM1XFx1MDFGMFxcdTAyNDldL2cgfSxcblx0eyAnYmFzZSc6J2snLCAnbGV0dGVycyc6L1tcXHUwMDZCXFx1MjREQVxcdUZGNEJcXHUxRTMxXFx1MDFFOVxcdTFFMzNcXHUwMTM3XFx1MUUzNVxcdTAxOTlcXHUyQzZBXFx1QTc0MVxcdUE3NDNcXHVBNzQ1XFx1QTdBM10vZyB9LFxuXHR7ICdiYXNlJzonbCcsICdsZXR0ZXJzJzovW1xcdTAwNkNcXHUyNERCXFx1RkY0Q1xcdTAxNDBcXHUwMTNBXFx1MDEzRVxcdTFFMzdcXHUxRTM5XFx1MDEzQ1xcdTFFM0RcXHUxRTNCXFx1MDE3RlxcdTAxNDJcXHUwMTlBXFx1MDI2QlxcdTJDNjFcXHVBNzQ5XFx1QTc4MVxcdUE3NDddL2cgfSxcblx0eyAnYmFzZSc6J2xqJywnbGV0dGVycyc6L1tcXHUwMUM5XS9nIH0sXG5cdHsgJ2Jhc2UnOidtJywgJ2xldHRlcnMnOi9bXFx1MDA2RFxcdTI0RENcXHVGRjREXFx1MUUzRlxcdTFFNDFcXHUxRTQzXFx1MDI3MVxcdTAyNkZdL2cgfSxcblx0eyAnYmFzZSc6J24nLCAnbGV0dGVycyc6L1tcXHUwMDZFXFx1MjRERFxcdUZGNEVcXHUwMUY5XFx1MDE0NFxcdTAwRjFcXHUxRTQ1XFx1MDE0OFxcdTFFNDdcXHUwMTQ2XFx1MUU0QlxcdTFFNDlcXHUwMTlFXFx1MDI3MlxcdTAxNDlcXHVBNzkxXFx1QTdBNV0vZyB9LFxuXHR7ICdiYXNlJzonbmonLCdsZXR0ZXJzJzovW1xcdTAxQ0NdL2cgfSxcblx0eyAnYmFzZSc6J28nLCAnbGV0dGVycyc6L1tcXHUwMDZGXFx1MjRERVxcdUZGNEZcXHUwMEYyXFx1MDBGM1xcdTAwRjRcXHUxRUQzXFx1MUVEMVxcdTFFRDdcXHUxRUQ1XFx1MDBGNVxcdTFFNERcXHUwMjJEXFx1MUU0RlxcdTAxNERcXHUxRTUxXFx1MUU1M1xcdTAxNEZcXHUwMjJGXFx1MDIzMVxcdTAwRjZcXHUwMjJCXFx1MUVDRlxcdTAxNTFcXHUwMUQyXFx1MDIwRFxcdTAyMEZcXHUwMUExXFx1MUVERFxcdTFFREJcXHUxRUUxXFx1MUVERlxcdTFFRTNcXHUxRUNEXFx1MUVEOVxcdTAxRUJcXHUwMUVEXFx1MDBGOFxcdTAxRkZcXHUwMjU0XFx1QTc0QlxcdUE3NERcXHUwMjc1XS9nIH0sXG5cdHsgJ2Jhc2UnOidvaScsJ2xldHRlcnMnOi9bXFx1MDFBM10vZyB9LFxuXHR7ICdiYXNlJzonb3UnLCdsZXR0ZXJzJzovW1xcdTAyMjNdL2cgfSxcblx0eyAnYmFzZSc6J29vJywnbGV0dGVycyc6L1tcXHVBNzRGXS9nIH0sXG5cdHsgJ2Jhc2UnOidwJywgJ2xldHRlcnMnOi9bXFx1MDA3MFxcdTI0REZcXHVGRjUwXFx1MUU1NVxcdTFFNTdcXHUwMUE1XFx1MUQ3RFxcdUE3NTFcXHVBNzUzXFx1QTc1NV0vZyB9LFxuXHR7ICdiYXNlJzoncScsICdsZXR0ZXJzJzovW1xcdTAwNzFcXHUyNEUwXFx1RkY1MVxcdTAyNEJcXHVBNzU3XFx1QTc1OV0vZyB9LFxuXHR7ICdiYXNlJzoncicsICdsZXR0ZXJzJzovW1xcdTAwNzJcXHUyNEUxXFx1RkY1MlxcdTAxNTVcXHUxRTU5XFx1MDE1OVxcdTAyMTFcXHUwMjEzXFx1MUU1QlxcdTFFNURcXHUwMTU3XFx1MUU1RlxcdTAyNERcXHUwMjdEXFx1QTc1QlxcdUE3QTdcXHVBNzgzXS9nIH0sXG5cdHsgJ2Jhc2UnOidzJywgJ2xldHRlcnMnOi9bXFx1MDA3M1xcdTI0RTJcXHVGRjUzXFx1MDBERlxcdTAxNUJcXHUxRTY1XFx1MDE1RFxcdTFFNjFcXHUwMTYxXFx1MUU2N1xcdTFFNjNcXHUxRTY5XFx1MDIxOVxcdTAxNUZcXHUwMjNGXFx1QTdBOVxcdUE3ODVcXHUxRTlCXS9nIH0sXG5cdHsgJ2Jhc2UnOid0JywgJ2xldHRlcnMnOi9bXFx1MDA3NFxcdTI0RTNcXHVGRjU0XFx1MUU2QlxcdTFFOTdcXHUwMTY1XFx1MUU2RFxcdTAyMUJcXHUwMTYzXFx1MUU3MVxcdTFFNkZcXHUwMTY3XFx1MDFBRFxcdTAyODhcXHUyQzY2XFx1QTc4N10vZyB9LFxuXHR7ICdiYXNlJzondHonLCdsZXR0ZXJzJzovW1xcdUE3MjldL2cgfSxcblx0eyAnYmFzZSc6J3UnLCAnbGV0dGVycyc6L1tcXHUwMDc1XFx1MjRFNFxcdUZGNTVcXHUwMEY5XFx1MDBGQVxcdTAwRkJcXHUwMTY5XFx1MUU3OVxcdTAxNkJcXHUxRTdCXFx1MDE2RFxcdTAwRkNcXHUwMURDXFx1MDFEOFxcdTAxRDZcXHUwMURBXFx1MUVFN1xcdTAxNkZcXHUwMTcxXFx1MDFENFxcdTAyMTVcXHUwMjE3XFx1MDFCMFxcdTFFRUJcXHUxRUU5XFx1MUVFRlxcdTFFRURcXHUxRUYxXFx1MUVFNVxcdTFFNzNcXHUwMTczXFx1MUU3N1xcdTFFNzVcXHUwMjg5XS9nIH0sXG5cdHsgJ2Jhc2UnOid2JywgJ2xldHRlcnMnOi9bXFx1MDA3NlxcdTI0RTVcXHVGRjU2XFx1MUU3RFxcdTFFN0ZcXHUwMjhCXFx1QTc1RlxcdTAyOENdL2cgfSxcblx0eyAnYmFzZSc6J3Z5JywnbGV0dGVycyc6L1tcXHVBNzYxXS9nIH0sXG5cdHsgJ2Jhc2UnOid3JywgJ2xldHRlcnMnOi9bXFx1MDA3N1xcdTI0RTZcXHVGRjU3XFx1MUU4MVxcdTFFODNcXHUwMTc1XFx1MUU4N1xcdTFFODVcXHUxRTk4XFx1MUU4OVxcdTJDNzNdL2cgfSxcblx0eyAnYmFzZSc6J3gnLCAnbGV0dGVycyc6L1tcXHUwMDc4XFx1MjRFN1xcdUZGNThcXHUxRThCXFx1MUU4RF0vZyB9LFxuXHR7ICdiYXNlJzoneScsICdsZXR0ZXJzJzovW1xcdTAwNzlcXHUyNEU4XFx1RkY1OVxcdTFFRjNcXHUwMEZEXFx1MDE3N1xcdTFFRjlcXHUwMjMzXFx1MUU4RlxcdTAwRkZcXHUxRUY3XFx1MUU5OVxcdTFFRjVcXHUwMUI0XFx1MDI0RlxcdTFFRkZdL2cgfSxcblx0eyAnYmFzZSc6J3onLCAnbGV0dGVycyc6L1tcXHUwMDdBXFx1MjRFOVxcdUZGNUFcXHUwMTdBXFx1MUU5MVxcdTAxN0NcXHUwMTdFXFx1MUU5M1xcdTFFOTVcXHUwMUI2XFx1MDIyNVxcdTAyNDBcXHUyQzZDXFx1QTc2M10vZyB9LFxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHJpcERpYWNyaXRpY3MgKHN0cikge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IG1hcC5sZW5ndGg7IGkrKykge1xuXHRcdHN0ciA9IHN0ci5yZXBsYWNlKG1hcFtpXS5sZXR0ZXJzLCBtYXBbaV0uYmFzZSk7XG5cdH1cblx0cmV0dXJuIHN0cjtcbn07XG4iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL3JlYWN0LXNlbGVjdFxuKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEF1dG9zaXplSW5wdXQgZnJvbSAncmVhY3QtaW5wdXQtYXV0b3NpemUnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBkZWZhdWx0QXJyb3dSZW5kZXJlciBmcm9tICcuL3V0aWxzL2RlZmF1bHRBcnJvd1JlbmRlcmVyJztcbmltcG9ydCBkZWZhdWx0RmlsdGVyT3B0aW9ucyBmcm9tICcuL3V0aWxzL2RlZmF1bHRGaWx0ZXJPcHRpb25zJztcbmltcG9ydCBkZWZhdWx0TWVudVJlbmRlcmVyIGZyb20gJy4vdXRpbHMvZGVmYXVsdE1lbnVSZW5kZXJlcic7XG5pbXBvcnQgZGVmYXVsdENsZWFyUmVuZGVyZXIgZnJvbSAnLi91dGlscy9kZWZhdWx0Q2xlYXJSZW5kZXJlcic7XG5cbmltcG9ydCBBc3luYyBmcm9tICcuL0FzeW5jJztcbmltcG9ydCBBc3luY0NyZWF0YWJsZSBmcm9tICcuL0FzeW5jQ3JlYXRhYmxlJztcbmltcG9ydCBDcmVhdGFibGUgZnJvbSAnLi9DcmVhdGFibGUnO1xuaW1wb3J0IE9wdGlvbiBmcm9tICcuL09wdGlvbic7XG5pbXBvcnQgVmFsdWUgZnJvbSAnLi9WYWx1ZSc7XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVZhbHVlICh2YWx1ZSkge1xuXHRjb25zdCB2YWx1ZVR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdGlmICh2YWx1ZVR5cGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXHR9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gJ251bWJlcicgfHwgdmFsdWVUeXBlID09PSAnYm9vbGVhbicpIHtcblx0XHRyZXR1cm4gU3RyaW5nKHZhbHVlKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cbn1cblxuY29uc3Qgc3RyaW5nT3JOb2RlID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbXG5cdFByb3BUeXBlcy5zdHJpbmcsXG5cdFByb3BUeXBlcy5ub2RlXG5dKTtcblxubGV0IGluc3RhbmNlSWQgPSAxO1xuXG5jb25zdCBTZWxlY3QgPSBjcmVhdGVDbGFzcyh7XG5cblx0ZGlzcGxheU5hbWU6ICdTZWxlY3QnLFxuXG5cdHByb3BUeXBlczoge1xuXHRcdGFkZExhYmVsVGV4dDogUHJvcFR5cGVzLnN0cmluZywgICAgICAgLy8gcGxhY2Vob2xkZXIgZGlzcGxheWVkIHdoZW4geW91IHdhbnQgdG8gYWRkIGEgbGFiZWwgb24gYSBtdWx0aS12YWx1ZSBpbnB1dFxuXHRcdCdhcmlhLWRlc2NyaWJlZGJ5JzogUHJvcFR5cGVzLnN0cmluZyxcdC8vIEhUTUwgSUQocykgb2YgZWxlbWVudChzKSB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIGRlc2NyaWJlIHRoaXMgaW5wdXQgKGZvciBhc3Npc3RpdmUgdGVjaClcblx0XHQnYXJpYS1sYWJlbCc6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgIC8vIEFyaWEgbGFiZWwgKGZvciBhc3Npc3RpdmUgdGVjaClcblx0XHQnYXJpYS1sYWJlbGxlZGJ5JzogUHJvcFR5cGVzLnN0cmluZyxcdC8vIEhUTUwgSUQgb2YgYW4gZWxlbWVudCB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIHRoZSBsYWJlbCAoZm9yIGFzc2lzdGl2ZSB0ZWNoKVxuXHRcdGFycm93UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFx0XHRcdFx0Ly8gQ3JlYXRlIGRyb3AtZG93biBjYXJldCBlbGVtZW50XG5cdFx0YXV0b0JsdXI6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGJsdXIgdGhlIGNvbXBvbmVudCB3aGVuIGFuIG9wdGlvbiBpcyBzZWxlY3RlZFxuXHRcdGF1dG9mb2N1czogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gYXV0b2ZvY3VzIHRoZSBjb21wb25lbnQgb24gbW91bnRcblx0XHRhdXRvc2l6ZTogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIHdoZXRoZXIgdG8gZW5hYmxlIGF1dG9zaXppbmcgb3Igbm90XG5cdFx0YmFja3NwYWNlUmVtb3ZlczogUHJvcFR5cGVzLmJvb2wsICAgICAvLyB3aGV0aGVyIGJhY2tzcGFjZSByZW1vdmVzIGFuIGl0ZW0gaWYgdGhlcmUgaXMgbm8gdGV4dCBpbnB1dFxuXHRcdGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZywgIC8vIE1lc3NhZ2UgdG8gdXNlIGZvciBzY3JlZW5yZWFkZXJzIHRvIHByZXNzIGJhY2tzcGFjZSB0byByZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSAtIHtsYWJlbH0gaXMgcmVwbGFjZWQgd2l0aCB0aGUgaXRlbSBsYWJlbFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gY2xhc3NOYW1lIGZvciB0aGUgb3V0ZXIgZWxlbWVudFxuXHRcdGNsZWFyQWxsVGV4dDogc3RyaW5nT3JOb2RlLCAgICAgICAgICAgICAgICAgLy8gdGl0bGUgZm9yIHRoZSBcImNsZWFyXCIgY29udHJvbCB3aGVuIG11bHRpOiB0cnVlXG5cdFx0Y2xlYXJSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAvLyBjcmVhdGUgY2xlYXJhYmxlIHggZWxlbWVudFxuXHRcdGNsZWFyVmFsdWVUZXh0OiBzdHJpbmdPck5vZGUsICAgICAgICAgICAgICAgLy8gdGl0bGUgZm9yIHRoZSBcImNsZWFyXCIgY29udHJvbFxuXHRcdGNsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gc2hvdWxkIGl0IGJlIHBvc3NpYmxlIHRvIHJlc2V0IHZhbHVlXG5cdFx0ZGVsZXRhYmxlOiBQcm9wVHlwZXMuYm9vbCxcdFx0XHQvLyBzaG93cyB4IGJ1dHRvbiB0byByZW1vdmUgb3B0aW9ucyBmcm9tIG1lbnVcblx0XHRkZWxldGVSZW1vdmVzOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgIC8vIHdoZXRoZXIgYmFja3NwYWNlIHJlbW92ZXMgYW4gaXRlbSBpZiB0aGVyZSBpcyBubyB0ZXh0IGlucHV0XG5cdFx0ZGVsZXRlT3B0aW9uOiBQcm9wVHlwZXMuZnVuYyxcdFx0XHRcdFx0Ly8gaGFuZGxlcyB0aGUgbWVtdSBvcHRpb24gZGVsZXRlLiBUYWtlcyB0aGUgY2xpY2tlZCBvcHRpb24gb2JqIGFzIGFyZ3VtZW50XG5cdFx0ZGVsaW1pdGVyOiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAvLyBkZWxpbWl0ZXIgdG8gdXNlIHRvIGpvaW4gbXVsdGlwbGUgdmFsdWVzIGZvciB0aGUgaGlkZGVuIGZpZWxkIHZhbHVlXG5cdFx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyB3aGV0aGVyIHRoZSBTZWxlY3QgaXMgZGlzYWJsZWQgb3Igbm90XG5cdFx0ZXNjYXBlQ2xlYXJzVmFsdWU6IFByb3BUeXBlcy5ib29sLCAgICAvLyB3aGV0aGVyIGVzY2FwZSBjbGVhcnMgdGhlIHZhbHVlIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkXG5cdFx0ZmlsdGVyT3B0aW9uOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyBtZXRob2QgdG8gZmlsdGVyIGEgc2luZ2xlIG9wdGlvbiAob3B0aW9uLCBmaWx0ZXJTdHJpbmcpXG5cdFx0ZmlsdGVyT3B0aW9uczogUHJvcFR5cGVzLmFueSwgICAgICAgICAvLyBib29sZWFuIHRvIGVuYWJsZSBkZWZhdWx0IGZpbHRlcmluZyBvciBmdW5jdGlvbiB0byBmaWx0ZXIgdGhlIG9wdGlvbnMgYXJyYXkgKFtvcHRpb25zXSwgZmlsdGVyU3RyaW5nLCBbdmFsdWVzXSlcblx0XHRpZ25vcmVBY2NlbnRzOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgIC8vIHdoZXRoZXIgdG8gc3RyaXAgZGlhY3JpdGljcyB3aGVuIGZpbHRlcmluZ1xuXHRcdGlnbm9yZUNhc2U6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgLy8gd2hldGhlciB0byBwZXJmb3JtIGNhc2UtaW5zZW5zaXRpdmUgZmlsdGVyaW5nXG5cdFx0aW5wdXRQcm9wczogUHJvcFR5cGVzLm9iamVjdCwgICAgICAgICAvLyBjdXN0b20gYXR0cmlidXRlcyBmb3IgdGhlIElucHV0XG5cdFx0aW5wdXRSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAvLyByZXR1cm5zIGEgY3VzdG9tIGlucHV0IGNvbXBvbmVudFxuXHRcdGluc3RhbmNlSWQ6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgLy8gc2V0IHRoZSBjb21wb25lbnRzIGluc3RhbmNlSWRcblx0XHRpc0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgIC8vIHdoZXRoZXIgdGhlIFNlbGVjdCBpcyBsb2FkaW5nIGV4dGVybmFsbHkgb3Igbm90IChzdWNoIGFzIG9wdGlvbnMgYmVpbmcgbG9hZGVkKVxuXHRcdGlzUmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgLy8gY3VzdG9tIHN0eWxpbmcgaW4gdGhlIGxhYmVsIGlmIHRoZXJlIGlzIG5vdCBhIHZhbHVlIGF0IG9uQmx1clxuXHRcdGpvaW5WYWx1ZXM6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgLy8gam9pbnMgbXVsdGlwbGUgdmFsdWVzIGludG8gYSBzaW5nbGUgZm9ybSBmaWVsZCB3aXRoIHRoZSBkZWxpbWl0ZXIgKGxlZ2FjeSBtb2RlKVxuXHRcdGxhYmVsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgLy8gcGF0aCBvZiB0aGUgbGFiZWwgdmFsdWUgaW4gb3B0aW9uIG9iamVjdHNcblx0XHRtYXRjaFBvczogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgIC8vIChhbnl8c3RhcnQpIG1hdGNoIHRoZSBzdGFydCBvciBlbnRpcmUgc3RyaW5nIHdoZW4gZmlsdGVyaW5nXG5cdFx0bWF0Y2hQcm9wOiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAvLyAoYW55fGxhYmVsfHZhbHVlKSB3aGljaCBvcHRpb24gcHJvcGVydHkgdG8gZmlsdGVyIG9uXG5cdFx0bWVudUJ1ZmZlcjogUHJvcFR5cGVzLm51bWJlciwgICAgICAgICAvLyBvcHRpb25hbCBidWZmZXIgKGluIHB4KSBiZXR3ZWVuIHRoZSBib3R0b20gb2YgdGhlIHZpZXdwb3J0IGFuZCB0aGUgYm90dG9tIG9mIHRoZSBtZW51XG5cdFx0bWVudUNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgbWVudSBjb250YWluZXJcblx0XHRtZW51UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgIC8vIHJlbmRlcnMgYSBjdXN0b20gbWVudSB3aXRoIG9wdGlvbnNcblx0XHRtZW51U3R5bGU6IFByb3BUeXBlcy5vYmplY3QsICAgICAgICAgIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBtZW51XG5cdFx0bXVsdGk6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgICAvLyBtdWx0aS12YWx1ZSBpbnB1dFxuXHRcdG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGVzIGEgaGlkZGVuIDxpbnB1dCAvPiB0YWcgd2l0aCB0aGlzIGZpZWxkIG5hbWUgZm9yIGh0bWwgZm9ybXNcblx0XHRub1Jlc3VsdHNUZXh0OiBzdHJpbmdPck5vZGUsICAgICAgICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGRpc3BsYXllZCB3aGVuIHRoZXJlIGFyZSBubyBtYXRjaGluZyBzZWFyY2ggcmVzdWx0c1xuXHRcdG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgLy8gb25CbHVyIGhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge31cblx0XHRvbkJsdXJSZXNldHNJbnB1dDogUHJvcFR5cGVzLmJvb2wsICAgIC8vIHdoZXRoZXIgaW5wdXQgaXMgY2xlYXJlZCBvbiBibHVyXG5cdFx0b25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAvLyBvbkNoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAobmV3VmFsdWUpIHt9XG5cdFx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAvLyBmaXJlcyB3aGVuIHRoZSBtZW51IGlzIGNsb3NlZFxuXHRcdG9uQ2xvc2VSZXNldHNJbnB1dDogUHJvcFR5cGVzLmJvb2wsXHRcdC8vIHdoZXRoZXIgaW5wdXQgaXMgY2xlYXJlZCB3aGVuIG1lbnUgaXMgY2xvc2VkIHRocm91Z2ggdGhlIGFycm93XG5cdFx0b25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAvLyBvbkZvY3VzIGhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge31cblx0XHRvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYywgICAgICAgIC8vIG9uSW5wdXRDaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKGlucHV0VmFsdWUpIHt9XG5cdFx0b25JbnB1dEtleURvd246IFByb3BUeXBlcy5mdW5jLCAgICAgICAvLyBpbnB1dCBrZXlEb3duIGhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge31cblx0XHRvbk1lbnVTY3JvbGxUb0JvdHRvbTogUHJvcFR5cGVzLmZ1bmMsIC8vIGZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbTsgY2FuIGJlIHVzZWQgdG8gcGFnaW5hdGUgb3B0aW9uc1xuXHRcdG9uT3BlbjogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBvcGVuZWRcblx0XHRvblZhbHVlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgIC8vIG9uQ2xpY2sgaGFuZGxlciBmb3IgdmFsdWUgbGFiZWxzOiBmdW5jdGlvbiAodmFsdWUsIGV2ZW50KSB7fVxuXHRcdG9wZW5BZnRlckZvY3VzOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgLy8gYm9vbGVhbiB0byBlbmFibGUgb3BlbmluZyBkcm9wZG93biB3aGVuIGZvY3VzZWRcblx0XHRvcGVuT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgIC8vIGFsd2F5cyBvcGVuIG9wdGlvbnMgbWVudSBvbiBmb2N1c1xuXHRcdG9wdGlvbkNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZywgICAgLy8gYWRkaXRpb25hbCBjbGFzcyhlcykgdG8gYXBwbHkgdG8gdGhlIDxPcHRpb24gLz4gZWxlbWVudHNcblx0XHRvcHRpb25Db21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLCAgICAgIC8vIG9wdGlvbiBjb21wb25lbnQgdG8gcmVuZGVyIGluIGRyb3Bkb3duXG5cdFx0b3B0aW9uUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAgICAgICAvLyBvcHRpb25SZW5kZXJlcjogZnVuY3Rpb24gKG9wdGlvbikge31cblx0XHRvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXksICAgICAgICAgICAgIC8vIGFycmF5IG9mIG9wdGlvbnNcblx0XHRwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlciwgICAgICAgICAgIC8vIG51bWJlciBvZiBlbnRyaWVzIHRvIHBhZ2Ugd2hlbiB1c2luZyBwYWdlIHVwL2Rvd24ga2V5c1xuXHRcdHBsYWNlaG9sZGVyOiBzdHJpbmdPck5vZGUsICAgICAgICAgICAgICAgICAgLy8gZmllbGQgcGxhY2Vob2xkZXIsIGRpc3BsYXllZCB3aGVuIHRoZXJlJ3Mgbm8gdmFsdWVcblx0XHRyZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIGFwcGxpZXMgSFRNTDUgcmVxdWlyZWQgYXR0cmlidXRlIHdoZW4gbmVlZGVkXG5cdFx0cmVzZXRWYWx1ZTogUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAvLyB2YWx1ZSB0byB1c2Ugd2hlbiB5b3UgY2xlYXIgdGhlIGNvbnRyb2xcblx0XHRzY3JvbGxNZW51SW50b1ZpZXc6IFByb3BUeXBlcy5ib29sLCAgIC8vIGJvb2xlYW4gdG8gZW5hYmxlIHRoZSB2aWV3cG9ydCB0byBzaGlmdCBzbyB0aGF0IHRoZSBmdWxsIG1lbnUgZnVsbHkgdmlzaWJsZSB3aGVuIGVuZ2FnZWRcblx0XHRzZWFyY2hhYmxlOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgIC8vIHdoZXRoZXIgdG8gZW5hYmxlIHNlYXJjaGluZyBmZWF0dXJlIG9yIG5vdFxuXHRcdHNlbGVjdExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFx0XHRcdFx0Ly8gVGhlIGZpZWxkIHRpdGxlXG5cdFx0c2ltcGxlVmFsdWU6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAvLyBwYXNzIHRoZSB2YWx1ZSB0byBvbkNoYW5nZSBhcyBhIHNpbXBsZSB2YWx1ZSAobGVnYWN5IHByZSAxLjAgbW9kZSksIGRlZmF1bHRzIHRvIGZhbHNlXG5cdFx0c3R5bGU6IFByb3BUeXBlcy5vYmplY3QsICAgICAgICAgICAgICAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgY29udHJvbFxuXHRcdHRhYkluZGV4OiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgLy8gb3B0aW9uYWwgdGFiIGluZGV4IG9mIHRoZSBjb250cm9sXG5cdFx0dGFiU2VsZWN0c1ZhbHVlOiBQcm9wVHlwZXMuYm9vbCwgICAgICAvLyB3aGV0aGVyIHRvIHRyZWF0IHRhYmJpbmcgb3V0IHdoaWxlIGZvY3VzZWQgdG8gYmUgdmFsdWUgc2VsZWN0aW9uXG5cdFx0dGhlbWU6IFByb3BUeXBlcy5zdHJpbmcsXHRcdFx0XHRcdFx0XHQvLyBtYWRlIGZvciBkYXJrIHRoZW1lcy4gSWYgc2V0IHRvIHRydWUgdGhlIGNvbXBvbmVudCBzdHlsZSB3aWxsIHN3aXRjaCBmb3IgZGFyayBiYWNrZ3JvdW5kc1xuXHRcdHZhbHVlOiBQcm9wVHlwZXMuYW55LCAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCBmaWVsZCB2YWx1ZVxuXHRcdHZhbHVlQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYywgICAgICAgLy8gdmFsdWUgY29tcG9uZW50IHRvIHJlbmRlclxuXHRcdHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgLy8gcGF0aCBvZiB0aGUgbGFiZWwgdmFsdWUgaW4gb3B0aW9uIG9iamVjdHNcblx0XHR2YWx1ZVJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYywgICAgICAgIC8vIHZhbHVlUmVuZGVyZXI6IGZ1bmN0aW9uIChvcHRpb24pIHt9XG5cdFx0d3JhcHBlclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LCAgICAgICAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgY29tcG9uZW50IHdyYXBwZXJcblx0fSxcblxuXHRzdGF0aWNzOiB7IEFzeW5jLCBBc3luY0NyZWF0YWJsZSwgQ3JlYXRhYmxlIH0sXG5cblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YWRkTGFiZWxUZXh0OiAnQWRkIFwie2xhYmVsfVwiPycsXG5cdFx0XHRhcnJvd1JlbmRlcmVyOiBkZWZhdWx0QXJyb3dSZW5kZXJlcixcblx0XHRcdGF1dG9zaXplOiB0cnVlLFxuXHRcdFx0YmFja3NwYWNlUmVtb3ZlczogdHJ1ZSxcblx0XHRcdGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogJ1ByZXNzIGJhY2tzcGFjZSB0byByZW1vdmUge2xhYmVsfScsXG5cdFx0XHRjbGVhcmFibGU6IHRydWUsXG5cdFx0XHRjbGVhckFsbFRleHQ6ICdDbGVhciBhbGwnLFxuXHRcdFx0Y2xlYXJSZW5kZXJlcjogZGVmYXVsdENsZWFyUmVuZGVyZXIsXG5cdFx0XHRjbGVhclZhbHVlVGV4dDogJ0NsZWFyIHZhbHVlJyxcblx0XHRcdGRlbGV0YWJsZTogdHJ1ZSxcblx0XHRcdGRlbGV0ZVJlbW92ZXM6IHRydWUsXG5cdFx0XHRkZWxpbWl0ZXI6ICcsJyxcblx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdGVzY2FwZUNsZWFyc1ZhbHVlOiB0cnVlLFxuXHRcdFx0ZmlsdGVyT3B0aW9uczogZGVmYXVsdEZpbHRlck9wdGlvbnMsXG5cdFx0XHRpZ25vcmVBY2NlbnRzOiB0cnVlLFxuXHRcdFx0aWdub3JlQ2FzZTogdHJ1ZSxcblx0XHRcdGlucHV0UHJvcHM6IHt9LFxuXHRcdFx0aXNMb2FkaW5nOiBmYWxzZSxcblx0XHRcdGlzUmVxdWlyZWQ6IGZhbHNlLFxuXHRcdFx0am9pblZhbHVlczogZmFsc2UsXG5cdFx0XHRsYWJlbEtleTogJ2xhYmVsJyxcblx0XHRcdG1hdGNoUG9zOiAnYW55Jyxcblx0XHRcdG1hdGNoUHJvcDogJ2FueScsXG5cdFx0XHRtZW51QnVmZmVyOiAwLFxuXHRcdFx0bWVudVJlbmRlcmVyOiBkZWZhdWx0TWVudVJlbmRlcmVyLFxuXHRcdFx0bXVsdGk6IGZhbHNlLFxuXHRcdFx0bm9SZXN1bHRzVGV4dDogJ05vIHJlc3VsdHMgZm91bmQnLFxuXHRcdFx0b25CbHVyUmVzZXRzSW5wdXQ6IHRydWUsXG5cdFx0XHRvbkNsb3NlUmVzZXRzSW5wdXQ6IHRydWUsXG5cdFx0XHRvcHRpb25Db21wb25lbnQ6IE9wdGlvbixcblx0XHRcdHBhZ2VTaXplOiA1LFxuXHRcdFx0cGxhY2Vob2xkZXI6ICdTZWxlY3QuLi4nLFxuXHRcdFx0cmVxdWlyZWQ6IGZhbHNlLFxuXHRcdFx0c2Nyb2xsTWVudUludG9WaWV3OiB0cnVlLFxuXHRcdFx0c2VhcmNoYWJsZTogdHJ1ZSxcblx0XHRcdHNpbXBsZVZhbHVlOiBmYWxzZSxcblx0XHRcdHRhYlNlbGVjdHNWYWx1ZTogdHJ1ZSxcblx0XHRcdHRoZW1lOiAnJyxcblx0XHRcdHZhbHVlQ29tcG9uZW50OiBWYWx1ZSxcblx0XHRcdHZhbHVlS2V5OiAndmFsdWUnXG5cdFx0fTtcblx0fSxcblxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdC8vIHZhciBmVmFsdWUgPSAnJztcblx0XHQvLyBpZiAoIXRoaXMucHJvcHMubXVsdGkgJiYgdGhpcy5wcm9wcy5zZWFyY2hhYmxlICYmIHRoaXMucHJvcHMudmFsdWUpIHtcblx0XHQvLyBcdGZWYWx1ZSA9IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0Ly8gfVxuXHRcdHJldHVybiB7XG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdGlzRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHRcdHJlcXVpcmVkOiBmYWxzZSxcblx0XHRcdHNob3dSZXF1aXJlZE1zZzogZmFsc2Vcblx0XHR9O1xuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG5cdFx0dGhpcy5faW5zdGFuY2VQcmVmaXggPSAnbWluaW1hbC1yZWFjdC1zZWxlY3QtJyArICh0aGlzLnByb3BzLmluc3RhbmNlSWQgfHwgKytpbnN0YW5jZUlkKSArICctJztcblx0XHRjb25zdCB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMucmVxdWlyZWQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRyZXF1aXJlZDogdGhpcy5oYW5kbGVSZXF1aXJlZCh2YWx1ZUFycmF5WzBdLCB0aGlzLnByb3BzLm11bHRpKSxcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuYXV0b2ZvY3VzKSB7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fVxuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuXHRcdGNvbnN0IHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkobmV4dFByb3BzLnZhbHVlLCBuZXh0UHJvcHMpO1xuXG5cdFx0aWYgKG5leHRQcm9wcy5yZXF1aXJlZCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdHJlcXVpcmVkOiB0aGlzLmhhbmRsZVJlcXVpcmVkKHZhbHVlQXJyYXlbMF0sIG5leHRQcm9wcy5tdWx0aSksXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcblx0XHRpZiAobmV4dFN0YXRlLmlzT3BlbiAhPT0gdGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdHRoaXMudG9nZ2xlVG91Y2hPdXRzaWRlRXZlbnQobmV4dFN0YXRlLmlzT3Blbik7XG5cdFx0XHRjb25zdCBoYW5kbGVyID0gbmV4dFN0YXRlLmlzT3BlbiA/IG5leHRQcm9wcy5vbk9wZW4gOiBuZXh0UHJvcHMub25DbG9zZTtcblx0XHRcdGhhbmRsZXIgJiYgaGFuZGxlcigpO1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnREaWRVcGRhdGUgKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG5cdFx0Ly8gZm9jdXMgdG8gdGhlIHNlbGVjdGVkIG9wdGlvblxuXHRcdGlmICh0aGlzLm1lbnUgJiYgdGhpcy5mb2N1c2VkICYmIHRoaXMuc3RhdGUuaXNPcGVuICYmICF0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24pIHtcblx0XHRcdGxldCBmb2N1c2VkT3B0aW9uTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMuZm9jdXNlZCk7XG5cdFx0XHRsZXQgbWVudU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLm1lbnUpO1xuXHRcdFx0bWVudU5vZGUuc2Nyb2xsVG9wID0gZm9jdXNlZE9wdGlvbk5vZGUub2Zmc2V0VG9wO1xuXHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlICYmIHRoaXMuZm9jdXNlZCAmJiB0aGlzLm1lbnUpIHtcblx0XHRcdHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlID0gZmFsc2U7XG5cdFx0XHR2YXIgZm9jdXNlZERPTSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMuZm9jdXNlZCk7XG5cdFx0XHR2YXIgbWVudURPTSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMubWVudSk7XG5cdFx0XHR2YXIgZm9jdXNlZFJlY3QgPSBmb2N1c2VkRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0dmFyIG1lbnVSZWN0ID0gbWVudURPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGlmIChmb2N1c2VkUmVjdC5ib3R0b20gPiBtZW51UmVjdC5ib3R0b20gfHwgZm9jdXNlZFJlY3QudG9wIDwgbWVudVJlY3QudG9wKSB7XG5cdFx0XHRcdG1lbnVET00uc2Nyb2xsVG9wID0gKGZvY3VzZWRET00ub2Zmc2V0VG9wICsgZm9jdXNlZERPTS5jbGllbnRIZWlnaHQgLSBtZW51RE9NLm9mZnNldEhlaWdodCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLnNjcm9sbE1lbnVJbnRvVmlldyAmJiB0aGlzLm1lbnVDb250YWluZXIpIHtcblx0XHRcdHZhciBtZW51Q29udGFpbmVyUmVjdCA9IHRoaXMubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgPCBtZW51Q29udGFpbmVyUmVjdC5ib3R0b20gKyB0aGlzLnByb3BzLm1lbnVCdWZmZXIpIHtcblx0XHRcdFx0d2luZG93LnNjcm9sbEJ5KDAsIG1lbnVDb250YWluZXJSZWN0LmJvdHRvbSArIHRoaXMucHJvcHMubWVudUJ1ZmZlciAtIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChwcmV2UHJvcHMuZGlzYWJsZWQgIT09IHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyBpc0ZvY3VzZWQ6IGZhbHNlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG5cdFx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG5cdFx0aWYgKCFkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyICYmIGRvY3VtZW50LmRldGFjaEV2ZW50KSB7XG5cdFx0XHRkb2N1bWVudC5kZXRhY2hFdmVudCgnb250b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdH1cblx0fSxcblxuXHR0b2dnbGVUb3VjaE91dHNpZGVFdmVudCAoZW5hYmxlZCkge1xuXHRcdGlmIChlbmFibGVkKSB7XG5cdFx0XHRpZiAoIWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuYXR0YWNoRXZlbnQpIHtcblx0XHRcdFx0ZG9jdW1lbnQuYXR0YWNoRXZlbnQoJ29udG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICghZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciAmJiBkb2N1bWVudC5kZXRhY2hFdmVudCkge1xuXHRcdFx0XHRkb2N1bWVudC5kZXRhY2hFdmVudCgnb250b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hPdXRzaWRlIChldmVudCkge1xuXHRcdC8vIGhhbmRsZSB0b3VjaCBvdXRzaWRlIG9uIGlvcyB0byBkaXNtaXNzIG1lbnVcblx0XHRpZiAodGhpcy53cmFwcGVyICYmICF0aGlzLndyYXBwZXIuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuXHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHR9XG5cdH0sXG5cblx0Zm9jdXMgKCkge1xuXHRcdGlmICghdGhpcy5pbnB1dCkgcmV0dXJuO1xuXHRcdHRoaXMuaW5wdXQuZm9jdXMoKTtcblx0fSxcblxuXHRibHVySW5wdXQgKCkge1xuXHRcdGlmICghdGhpcy5pbnB1dCkgcmV0dXJuO1xuXHRcdHRoaXMuaW5wdXQuYmx1cigpO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoTW92ZSAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZFxuXHRcdHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoU3RhcnQgKGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIG5vdCBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoRW5kIChldmVudCkge1xuXHRcdC8vIENoZWNrIGlmIHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWQsIEluIHRoaXMgY2FzZVxuXHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG5cdFx0aWYgKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdC8vIEZpcmUgdGhlIG1vdXNlIGV2ZW50c1xuXHRcdHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUgKGV2ZW50KSB7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0Ly8gQ2xlYXIgdGhlIHZhbHVlXG5cdFx0dGhpcy5jbGVhclZhbHVlKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaEVuZE9uQXJyb3cgKGV2ZW50KSB7XG4gXHRcdC8vIENoZWNrIGlmIHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWQsIEluIHRoaXMgY2FzZVxuIFx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuIFx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG4gXHRcdC8vIENsZWFyIHRoZSB2YWx1ZVxuIFx0XHR0aGlzLmhhbmRsZU1vdXNlRG93bk9uQXJyb3coZXZlbnQpO1xuIFx0fSxcblxuXHRoYW5kbGVNb3VzZURvd24gKGV2ZW50KSB7XG5cdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8IChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gcHJldmVudCBkZWZhdWx0IGV2ZW50IGhhbmRsZXJzXG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIGZvciB0aGUgbm9uLXNlYXJjaGFibGUgc2VsZWN0LCB0b2dnbGUgdGhlIG1lbnVcblx0XHRpZiAoIXRoaXMucHJvcHMuc2VhcmNoYWJsZSkge1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46ICF0aGlzLnN0YXRlLmlzT3Blbixcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnN0YXRlLmlzRm9jdXNlZCkge1xuXHRcdFx0Ly8gT24gaU9TLCB3ZSBjYW4gZ2V0IGludG8gYSBzdGF0ZSB3aGVyZSB3ZSB0aGluayB0aGUgaW5wdXQgaXMgZm9jdXNlZCBidXQgaXQgaXNuJ3QgcmVhbGx5LFxuXHRcdFx0Ly8gc2luY2UgaU9TIGlnbm9yZXMgcHJvZ3JhbW1hdGljIGNhbGxzIHRvIGlucHV0LmZvY3VzKCkgdGhhdCB3ZXJlbid0IHRyaWdnZXJlZCBieSBhIGNsaWNrIGV2ZW50LlxuXHRcdFx0Ly8gQ2FsbCBmb2N1cygpIGFnYWluIGhlcmUgdG8gYmUgc2FmZS5cblx0XHRcdHRoaXMuZm9jdXMoKTtcblxuXHRcdFx0bGV0IGlucHV0ID0gdGhpcy5pbnB1dDtcblx0XHRcdGlmICh0eXBlb2YgaW5wdXQuZ2V0SW5wdXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Ly8gR2V0IHRoZSBhY3R1YWwgRE9NIGlucHV0IGlmIHRoZSByZWYgaXMgYW4gPEF1dG9zaXplSW5wdXQgLz4gY29tcG9uZW50XG5cdFx0XHRcdGlucHV0ID0gaW5wdXQuZ2V0SW5wdXQoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2xlYXJzIHRoZSB2YWx1ZSBzbyB0aGF0IHRoZSBjdXJzb3Igd2lsbCBiZSBhdCB0aGUgZW5kIG9mIGlucHV0IHdoZW4gdGhlIGNvbXBvbmVudCByZS1yZW5kZXJzXG5cdFx0XHRpbnB1dC52YWx1ZSA9ICcnO1xuXG5cdFx0XHQvLyBpZiB0aGUgaW5wdXQgaXMgZm9jdXNlZCwgZW5zdXJlIHRoZSBtZW51IGlzIG9wZW5cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gb3RoZXJ3aXNlLCBmb2N1cyB0aGUgaW5wdXQgYW5kIG9wZW4gdGhlIG1lbnVcblx0XHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gdHJ1ZTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9XG5cdH0sXG5cblx0aGFuZGxlTW91c2VEb3duT25BcnJvdyAoZXZlbnQpIHtcblx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XG5cdFx0Ly8gYnV0dG9uLCBvciBpZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBpZ25vcmUgaXQuXG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly8gSWYgdGhlIG1lbnUgaXNuJ3Qgb3BlbiwgbGV0IHRoZSBldmVudCBidWJibGUgdG8gdGhlIG1haW4gaGFuZGxlTW91c2VEb3duXG5cdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvLyBwcmV2ZW50IGRlZmF1bHQgZXZlbnQgaGFuZGxlcnNcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdC8vIGNsb3NlIHRoZSBtZW51XG5cdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0fSxcblxuXHRoYW5kbGVNb3VzZURvd25Pbk1lbnUgKGV2ZW50KSB7XG5cdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8IChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IHRydWU7XG5cdFx0dGhpcy5mb2N1cygpO1xuXHR9LFxuXG5cdGNsb3NlTWVudSAoKSB7XG5cdFx0aWYodGhpcy5wcm9wcy5vbkNsb3NlUmVzZXRzSW5wdXQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmICF0aGlzLnByb3BzLm11bHRpLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiAnJ1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmICF0aGlzLnByb3BzLm11bHRpLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiB0aGlzLnN0YXRlLmlucHV0VmFsdWVcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSBmYWxzZTtcblx0fSxcblxuXHRoYW5kbGVJbnB1dEZvY3VzIChldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm47XG5cdFx0dmFyIGlzT3BlbiA9IHRoaXMuc3RhdGUuaXNPcGVuIHx8IHRoaXMuX29wZW5BZnRlckZvY3VzIHx8IHRoaXMucHJvcHMub3Blbk9uRm9jdXM7XG5cdFx0aWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuXHRcdFx0dGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc0ZvY3VzZWQ6IHRydWUsXG5cdFx0XHRpc09wZW46IGlzT3BlblxuXHRcdH0pO1xuXHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gZmFsc2U7XG5cdH0sXG5cblx0aGFuZGxlSW5wdXRCbHVyIChldmVudCkge1xuXHRcdC8vIG1ha2VzIHRoZSBcImZpZWxkIGlzIHJlcXVpcmVkXCIgbWVzc2FnZSB0byBhcHBlYXIgb24gYmx1clwiXG5cdFx0dGhpcy5wcm9wcy5pc1JlcXVpcmVkICYmIHRoaXMuc2V0U3RhdGUoe3Nob3dSZXF1aXJlZE1zZzp0cnVlfSk7XG5cdFx0Ly8gVGhlIGNoZWNrIGZvciBtZW51LmNvbnRhaW5zKGFjdGl2ZUVsZW1lbnQpIGlzIG5lY2Vzc2FyeSB0byBwcmV2ZW50IElFMTEncyBzY3JvbGxiYXIgZnJvbSBjbG9zaW5nIHRoZSBtZW51IGluIGNlcnRhaW4gY29udGV4dHMuXG5cdFx0aWYgKHRoaXMubWVudSAmJiAodGhpcy5tZW51ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IHRoaXMubWVudS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkpIHtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcblx0XHRcdHRoaXMucHJvcHMub25CbHVyKGV2ZW50KTtcblx0XHR9XG5cdFx0dmFyIG9uQmx1cnJlZFN0YXRlID0ge1xuXHRcdFx0aXNGb2N1c2VkOiBmYWxzZSxcblx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdH07XG5cdFx0aWYgKHRoaXMucHJvcHMub25CbHVyUmVzZXRzSW5wdXQpIHtcblx0XHRcdG9uQmx1cnJlZFN0YXRlLmlucHV0VmFsdWUgPSAnJztcblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZShvbkJsdXJyZWRTdGF0ZSk7XG5cdH0sXG5cblx0aGFuZGxlSW5wdXRDaGFuZ2UgKGV2ZW50KSB7XG5cdFx0bGV0IG5ld0lucHV0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cblx0XHRpZiAodGhpcy5zdGF0ZS5pbnB1dFZhbHVlICE9PSBldmVudC50YXJnZXQudmFsdWUgJiYgdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKSB7XG5cdFx0XHRsZXQgbmV4dFN0YXRlID0gdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKG5ld0lucHV0VmFsdWUpO1xuXHRcdFx0Ly8gTm90ZTogIT0gdXNlZCBkZWxpYmVyYXRlbHkgaGVyZSB0byBjYXRjaCB1bmRlZmluZWQgYW5kIG51bGxcblx0XHRcdGlmIChuZXh0U3RhdGUgIT0gbnVsbCAmJiB0eXBlb2YgbmV4dFN0YXRlICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRuZXdJbnB1dFZhbHVlID0gJycgKyBuZXh0U3RhdGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0aW5wdXRWYWx1ZTogbmV3SW5wdXRWYWx1ZSxcblx0XHR9KTtcblx0fSxcblxuXHRoYW5kbGVLZXlEb3duIChldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm47XG5cblx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMub25JbnB1dEtleURvd24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRoaXMucHJvcHMub25JbnB1dEtleURvd24oZXZlbnQpO1xuXHRcdFx0aWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0Y2FzZSA4OiAvLyBiYWNrc3BhY2Vcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgdGhpcy5wcm9wcy5iYWNrc3BhY2VSZW1vdmVzKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLnBvcFZhbHVlKCk7XG5cdFx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRcdGNhc2UgOTogLy8gdGFiXG5cdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSB8fCAhdGhpcy5zdGF0ZS5pc09wZW4gfHwgIXRoaXMucHJvcHMudGFiU2VsZWN0c1ZhbHVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2VsZWN0Rm9jdXNlZE9wdGlvbigpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdFx0Y2FzZSAxMzogLy8gZW50ZXJcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3BlbikgcmV0dXJuO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0dGhpcy5zZWxlY3RGb2N1c2VkT3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMjc6IC8vIGVzY2FwZVxuXHRcdFx0XHRpZiAodGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdFx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMuY2xlYXJhYmxlICYmIHRoaXMucHJvcHMuZXNjYXBlQ2xlYXJzVmFsdWUpIHtcblx0XHRcdFx0XHR0aGlzLmNsZWFyVmFsdWUoZXZlbnQpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzg6IC8vIHVwXG5cdFx0XHRcdHRoaXMuZm9jdXNQcmV2aW91c09wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDQwOiAvLyBkb3duXG5cdFx0XHRcdHRoaXMuZm9jdXNOZXh0T3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzM6IC8vIHBhZ2UgdXBcblx0XHRcdFx0dGhpcy5mb2N1c1BhZ2VVcE9wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM0OiAvLyBwYWdlIGRvd25cblx0XHRcdFx0dGhpcy5mb2N1c1BhZ2VEb3duT3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzU6IC8vIGVuZCBrZXlcblx0XHRcdFx0aWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuZm9jdXNFbmRPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzNjogLy8gaG9tZSBrZXlcblx0XHRcdFx0aWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuZm9jdXNTdGFydE9wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDQ2OiAvLyBiYWNrc3BhY2Vcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgdGhpcy5wcm9wcy5kZWxldGVSZW1vdmVzKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLnBvcFZhbHVlKCk7XG5cdFx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRcdGRlZmF1bHQ6IHJldHVybjtcblx0XHR9XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fSxcblxuXHRoYW5kbGVWYWx1ZUNsaWNrIChvcHRpb24sIGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLm9uVmFsdWVDbGljaykgcmV0dXJuO1xuXHRcdHRoaXMucHJvcHMub25WYWx1ZUNsaWNrKG9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZU1lbnVTY3JvbGwgKGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLm9uTWVudVNjcm9sbFRvQm90dG9tKSByZXR1cm47XG5cdFx0bGV0IHsgdGFyZ2V0IH0gPSBldmVudDtcblx0XHRpZiAodGFyZ2V0LnNjcm9sbEhlaWdodCA+IHRhcmdldC5vZmZzZXRIZWlnaHQgJiYgISh0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0Lm9mZnNldEhlaWdodCAtIHRhcmdldC5zY3JvbGxUb3ApKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uTWVudVNjcm9sbFRvQm90dG9tKCk7XG5cdFx0fVxuXHR9LFxuXG5cdGhhbmRsZVJlcXVpcmVkICh2YWx1ZSwgbXVsdGkpIHtcblx0XHRpZiAoIXZhbHVlKSByZXR1cm4gdHJ1ZTtcblx0XHRyZXR1cm4gKG11bHRpID8gdmFsdWUubGVuZ3RoID09PSAwIDogT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMCk7XG5cdH0sXG5cblx0Z2V0T3B0aW9uTGFiZWwgKG9wKSB7XG5cdFx0cmV0dXJuIG9wW3RoaXMucHJvcHMubGFiZWxLZXldO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBUdXJucyBhIHZhbHVlIGludG8gYW4gYXJyYXkgZnJvbSB0aGUgZ2l2ZW4gb3B0aW9uc1xuXHQgKiBAcGFyYW1cdHtTdHJpbmd8TnVtYmVyfEFycmF5fVx0dmFsdWVcdFx0LSB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBpbnB1dFxuXHQgKiBAcGFyYW1cdHtPYmplY3R9XHRcdG5leHRQcm9wc1x0LSBvcHRpb25hbGx5IHNwZWNpZnkgdGhlIG5leHRQcm9wcyBzbyB0aGUgcmV0dXJuZWQgYXJyYXkgdXNlcyB0aGUgbGF0ZXN0IGNvbmZpZ3VyYXRpb25cblx0ICogQHJldHVybnNcdHtBcnJheX1cdHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IHJlcHJlc2VudGVkIGluIGFuIGFycmF5XG5cdCAqL1xuXHRnZXRWYWx1ZUFycmF5ICh2YWx1ZSwgbmV4dFByb3BzKSB7XG5cdFx0LyoqIHN1cHBvcnQgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgbmV4dFByb3BzYCBzbyBgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc2AgdXBkYXRlcyB3aWxsIGZ1bmN0aW9uIGFzIGV4cGVjdGVkICovXG5cdFx0Y29uc3QgcHJvcHMgPSB0eXBlb2YgbmV4dFByb3BzID09PSAnb2JqZWN0JyA/IG5leHRQcm9wcyA6IHRoaXMucHJvcHM7XG5cdFx0aWYgKHByb3BzLm11bHRpKSB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgdmFsdWUgPSB2YWx1ZS5zcGxpdChwcm9wcy5kZWxpbWl0ZXIpO1xuXHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFtdO1xuXHRcdFx0XHR2YWx1ZSA9IFt2YWx1ZV07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWUubWFwKHZhbHVlID0+IHRoaXMuZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKSkuZmlsdGVyKGkgPT4gaSk7XG5cdFx0fVxuXHRcdHZhciBleHBhbmRlZFZhbHVlID0gdGhpcy5leHBhbmRWYWx1ZSh2YWx1ZSwgcHJvcHMpO1xuXHRcdHJldHVybiBleHBhbmRlZFZhbHVlID8gW2V4cGFuZGVkVmFsdWVdIDogW107XG5cdH0sXG5cblx0LyoqXG5cdCAqIFJldHJpZXZlIGEgdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gb3B0aW9ucyBhbmQgdmFsdWVLZXlcblx0ICogQHBhcmFtXHR7U3RyaW5nfE51bWJlcnxBcnJheX1cdHZhbHVlXHQtIHRoZSBzZWxlY3RlZCB2YWx1ZShzKVxuXHQgKiBAcGFyYW1cdHtPYmplY3R9XHRcdHByb3BzXHQtIHRoZSBTZWxlY3QgY29tcG9uZW50J3MgcHJvcHMgKG9yIG5leHRQcm9wcylcblx0ICovXG5cdGV4cGFuZFZhbHVlICh2YWx1ZSwgcHJvcHMpIHtcblx0XHRjb25zdCB2YWx1ZVR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdFx0aWYgKHZhbHVlVHlwZSAhPT0gJ3N0cmluZycgJiYgdmFsdWVUeXBlICE9PSAnbnVtYmVyJyAmJiB2YWx1ZVR5cGUgIT09ICdib29sZWFuJykgcmV0dXJuIHZhbHVlO1xuXHRcdGxldCB7IG9wdGlvbnMsIHZhbHVlS2V5IH0gPSBwcm9wcztcblx0XHRpZiAoIW9wdGlvbnMpIHJldHVybjtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChvcHRpb25zW2ldW3ZhbHVlS2V5XSA9PT0gdmFsdWUpIHJldHVybiBvcHRpb25zW2ldO1xuXHRcdH1cblx0fSxcblxuXHRzZXRWYWx1ZSAodmFsdWUpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5hdXRvQmx1cil7XG5cdFx0XHR0aGlzLmJsdXJJbnB1dCgpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMucHJvcHMub25DaGFuZ2UpIHJldHVybjtcblx0XHRpZiAodGhpcy5wcm9wcy5yZXF1aXJlZCkge1xuXHRcdFx0Y29uc3QgcmVxdWlyZWQgPSB0aGlzLmhhbmRsZVJlcXVpcmVkKHZhbHVlLCB0aGlzLnByb3BzLm11bHRpKTtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyByZXF1aXJlZCB9KTtcblx0XHR9XG5cdFx0aWYgKHRoaXMucHJvcHMuc2ltcGxlVmFsdWUgJiYgdmFsdWUpIHtcblx0XHRcdHZhbHVlID0gdGhpcy5wcm9wcy5tdWx0aSA/IHZhbHVlLm1hcChpID0+IGlbdGhpcy5wcm9wcy52YWx1ZUtleV0pLmpvaW4odGhpcy5wcm9wcy5kZWxpbWl0ZXIpIDogdmFsdWVbdGhpcy5wcm9wcy52YWx1ZUtleV07XG5cdFx0fVxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWUpO1xuXHR9LFxuXG5cdHNlbGVjdFZhbHVlICh2YWx1ZSkge1xuXHRcdC8vTk9URTogdXBkYXRlIHZhbHVlIGluIHRoZSBjYWxsYmFjayB0byBtYWtlIHN1cmUgdGhlIGlucHV0IHZhbHVlIGlzIGVtcHR5IHNvIHRoYXQgdGhlcmUgYXJlIG5vIHN0eWxpbmcgaXNzdWVzIChDaHJvbWUgaGFkIGlzc3VlIG90aGVyd2lzZSlcblx0XHR0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSBmYWxzZTtcblx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0XHRmb2N1c2VkSW5kZXg6IG51bGxcblx0XHRcdH0sICgpID0+IHtcblx0XHRcdFx0dGhpcy5hZGRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkLFxuXHRcdFx0fSwgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnJlbW92ZVJlcXVpcmVkTXNnKCk7XG5cdH0sXG5cblx0ZGVsZXRlT3B0aW9uIChvcHRpb24pIHtcblx0XHRpZiAodGhpcy5wcm9wcy5kZWxldGVPcHRpb24pIHtcblx0XHRcdHJldHVybiB0aGlzLnByb3BzLmRlbGV0ZU9wdGlvbiggb3B0aW9uICk7XG5cdFx0fVxuXHR9LFxuXG5cdGFkZFZhbHVlICh2YWx1ZSkge1xuXHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdGNvbnN0IHZpc2libGVPcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnMuZmlsdGVyKHZhbCA9PiAhdmFsLmRpc2FibGVkKTtcblx0XHRjb25zdCBsYXN0VmFsdWVJbmRleCA9IHZpc2libGVPcHRpb25zLmluZGV4T2YodmFsdWUpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5jb25jYXQodmFsdWUpKTtcblx0XHRpZiAodmlzaWJsZU9wdGlvbnMubGVuZ3RoIC0gMSA9PT0gbGFzdFZhbHVlSW5kZXgpIHtcblx0XHRcdC8vIHRoZSBsYXN0IG9wdGlvbiB3YXMgc2VsZWN0ZWQ7IGZvY3VzIHRoZSBzZWNvbmQtbGFzdCBvbmVcblx0XHRcdHRoaXMuZm9jdXNPcHRpb24odmlzaWJsZU9wdGlvbnNbbGFzdFZhbHVlSW5kZXggLSAxXSk7XG5cdFx0fSBlbHNlIGlmICh2aXNpYmxlT3B0aW9ucy5sZW5ndGggPiBsYXN0VmFsdWVJbmRleCkge1xuXHRcdFx0Ly8gZm9jdXMgdGhlIG9wdGlvbiBiZWxvdyB0aGUgc2VsZWN0ZWQgb25lXG5cdFx0XHR0aGlzLmZvY3VzT3B0aW9uKHZpc2libGVPcHRpb25zW2xhc3RWYWx1ZUluZGV4ICsgMV0pO1xuXHRcdH1cblx0fSxcblxuXHRwb3BWYWx1ZSAoKSB7XG5cdFx0dmFyIHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0aWYgKCF2YWx1ZUFycmF5Lmxlbmd0aCkgcmV0dXJuO1xuXHRcdGlmICh2YWx1ZUFycmF5W3ZhbHVlQXJyYXkubGVuZ3RoLTFdLmNsZWFyYWJsZVZhbHVlID09PSBmYWxzZSkgcmV0dXJuO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5zbGljZSgwLCB2YWx1ZUFycmF5Lmxlbmd0aCAtIDEpKTtcblx0fSxcblxuXHRyZW1vdmVWYWx1ZSAodmFsdWUpIHtcblx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlQXJyYXkuZmlsdGVyKGkgPT4gaSAhPT0gdmFsdWUpKTtcblx0XHR0aGlzLmZvY3VzKCk7XG5cdH0sXG5cblx0Y2xlYXJWYWx1ZSAoZXZlbnQpIHtcblx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XG5cdFx0Ly8gYnV0dG9uLCBpZ25vcmUgaXQuXG5cdFx0aWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMuc2V0VmFsdWUodGhpcy5nZXRSZXNldFZhbHVlKCkpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdH0sIHRoaXMuZm9jdXMpO1xuXHR9LFxuXG5cdGdldFJlc2V0VmFsdWUgKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLnJlc2V0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMucmVzZXRWYWx1ZTtcblx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMubXVsdGkpIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdHJlbW92ZVJlcXVpcmVkTXNnICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3dSZXF1aXJlZE1zZzogZmFsc2Vcblx0XHR9KTtcblx0fSxcblxuXHRmb2N1c09wdGlvbiAob3B0aW9uKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBvcHRpb25cblx0XHR9KTtcblx0fSxcblxuXHRmb2N1c05leHRPcHRpb24gKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignbmV4dCcpO1xuXHR9LFxuXG5cdGZvY3VzUHJldmlvdXNPcHRpb24gKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbigncHJldmlvdXMnKTtcblx0fSxcblxuXHRmb2N1c1BhZ2VVcE9wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwYWdlX3VwJyk7XG5cdH0sXG5cblx0Zm9jdXNQYWdlRG93bk9wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwYWdlX2Rvd24nKTtcblx0fSxcblxuXHRmb2N1c1N0YXJ0T3B0aW9uICgpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3N0YXJ0Jyk7XG5cdH0sXG5cblx0Zm9jdXNFbmRPcHRpb24gKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignZW5kJyk7XG5cdH0sXG5cblx0Zm9jdXNBZGphY2VudE9wdGlvbiAoZGlyKSB7XG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9uc1xuXHRcdFx0Lm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKHsgb3B0aW9uLCBpbmRleCB9KSlcblx0XHRcdC5maWx0ZXIob3B0aW9uID0+ICFvcHRpb24ub3B0aW9uLmRpc2FibGVkKTtcblx0XHR0aGlzLl9zY3JvbGxUb0ZvY3VzZWRPcHRpb25PblVwZGF0ZSA9IHRydWU7XG5cdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdFx0aW5wdXRWYWx1ZTogJycsXG5cdFx0XHRcdGZvY3VzZWRPcHRpb246IHRoaXMuX2ZvY3VzZWRPcHRpb24gfHwgKG9wdGlvbnMubGVuZ3RoID8gb3B0aW9uc1tkaXIgPT09ICduZXh0JyA/IDAgOiBvcHRpb25zLmxlbmd0aCAtIDFdLm9wdGlvbiA6IG51bGwpXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKCFvcHRpb25zLmxlbmd0aCkgcmV0dXJuO1xuXHRcdHZhciBmb2N1c2VkSW5kZXggPSAtMTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLl9mb2N1c2VkT3B0aW9uID09PSBvcHRpb25zW2ldLm9wdGlvbikge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGRpciA9PT0gJ25leHQnICYmIGZvY3VzZWRJbmRleCAhPT0gLTEgKSB7XG5cdFx0XHRmb2N1c2VkSW5kZXggPSAoZm9jdXNlZEluZGV4ICsgMSkgJSBvcHRpb25zLmxlbmd0aDtcblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3ByZXZpb3VzJykge1xuXHRcdFx0aWYgKGZvY3VzZWRJbmRleCA+IDApIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gZm9jdXNlZEluZGV4IC0gMTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3N0YXJ0Jykge1xuXHRcdFx0Zm9jdXNlZEluZGV4ID0gMDtcblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ2VuZCcpIHtcblx0XHRcdGZvY3VzZWRJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3BhZ2VfdXAnKSB7XG5cdFx0XHR2YXIgcG90ZW50aWFsSW5kZXggPSBmb2N1c2VkSW5kZXggLSB0aGlzLnByb3BzLnBhZ2VTaXplO1xuXHRcdFx0aWYgKHBvdGVudGlhbEluZGV4IDwgMCkge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSAwO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gcG90ZW50aWFsSW5kZXg7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwYWdlX2Rvd24nKSB7XG5cdFx0XHR2YXIgcG90ZW50aWFsSW5kZXggPSBmb2N1c2VkSW5kZXggKyB0aGlzLnByb3BzLnBhZ2VTaXplO1xuXHRcdFx0aWYgKHBvdGVudGlhbEluZGV4ID4gb3B0aW9ucy5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IHBvdGVudGlhbEluZGV4O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChmb2N1c2VkSW5kZXggPT09IC0xKSB7XG5cdFx0XHRmb2N1c2VkSW5kZXggPSAwO1xuXHRcdH1cblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Zm9jdXNlZEluZGV4OiBvcHRpb25zW2ZvY3VzZWRJbmRleF0uaW5kZXgsXG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBvcHRpb25zW2ZvY3VzZWRJbmRleF0ub3B0aW9uXG5cdFx0fSk7XG5cdH0sXG5cblx0Z2V0Rm9jdXNlZE9wdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2ZvY3VzZWRPcHRpb247XG5cdH0sXG5cblx0Z2V0SW5wdXRWYWx1ZSAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUuaW5wdXRWYWx1ZTtcblx0fSxcblxuXHRzZWxlY3RGb2N1c2VkT3B0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikge1xuXHRcdFx0cmV0dXJuIHRoaXMuc2VsZWN0VmFsdWUodGhpcy5fZm9jdXNlZE9wdGlvbik7XG5cdFx0fVxuXHR9LFxuXG5cdHJlbmRlckxvYWRpbmcgKCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5pc0xvYWRpbmcpIHJldHVybjtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LWxvYWRpbmctem9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtbG9hZGluZ1wiIC8+XG5cdFx0XHQ8L3NwYW4+XG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXJWYWx1ZSAodmFsdWVBcnJheSwgaXNPcGVuKSB7XG5cdFx0bGV0IHJlbmRlckxhYmVsID0gdGhpcy5wcm9wcy52YWx1ZVJlbmRlcmVyIHx8IHRoaXMuZ2V0T3B0aW9uTGFiZWw7XG5cdFx0bGV0IFZhbHVlQ29tcG9uZW50ID0gdGhpcy5wcm9wcy52YWx1ZUNvbXBvbmVudDtcblx0XHRpZiAoIXZhbHVlQXJyYXkubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSA/IDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LXBsYWNlaG9sZGVyXCI+e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9PC9kaXY+IDogbnVsbDtcblx0XHR9XG5cdFx0bGV0IG9uQ2xpY2sgPSB0aGlzLnByb3BzLm9uVmFsdWVDbGljayA/IHRoaXMuaGFuZGxlVmFsdWVDbGljayA6IG51bGw7XG5cdFx0aWYgKHRoaXMucHJvcHMubXVsdGkpIHtcblx0XHRcdHJldHVybiB2YWx1ZUFycmF5Lm1hcCgodmFsdWUsIGkpID0+IHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8VmFsdWVDb21wb25lbnRcblx0XHRcdFx0XHRcdGlkPXt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctdmFsdWUtJyArIGl9XG5cdFx0XHRcdFx0XHRpbnN0YW5jZVByZWZpeD17dGhpcy5faW5zdGFuY2VQcmVmaXh9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB2YWx1ZS5jbGVhcmFibGVWYWx1ZSA9PT0gZmFsc2V9XG5cdFx0XHRcdFx0XHRrZXk9e2B2YWx1ZS0ke2l9LSR7dmFsdWVbdGhpcy5wcm9wcy52YWx1ZUtleV19YH1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xpY2t9XG5cdFx0XHRcdFx0XHRvblJlbW92ZT17dGhpcy5yZW1vdmVWYWx1ZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHR7cmVuZGVyTGFiZWwodmFsdWUsIGkpfVxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LWFyaWEtb25seVwiPiZuYnNwOzwvc3Bhbj5cblx0XHRcdFx0XHQ8L1ZhbHVlQ29tcG9uZW50PlxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIGlmICghdGhpcy5zdGF0ZS5pbnB1dFZhbHVlKSB7XG5cdFx0XHRpZiAoaXNPcGVuKSBvbkNsaWNrID0gbnVsbDtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxWYWx1ZUNvbXBvbmVudFxuXHRcdFx0XHRcdGlkPXt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctdmFsdWUtaXRlbSd9XG5cdFx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0aW5zdGFuY2VQcmVmaXg9e3RoaXMuX2luc3RhbmNlUHJlZml4fVxuXHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xpY2t9XG5cdFx0XHRcdFx0dmFsdWU9e3ZhbHVlQXJyYXlbMF19XG5cdFx0XHRcdD5cblx0XHRcdFx0XHR7cmVuZGVyTGFiZWwodmFsdWVBcnJheVswXSl9XG5cdFx0XHRcdDwvVmFsdWVDb21wb25lbnQ+XG5cdFx0XHQpO1xuXHRcdH1cblx0fSxcblxuXHRyZW5kZXJJbnB1dCAodmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbkluZGV4KSB7XG5cdFx0dmFyIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoJ1NlbGVjdC1pbnB1dCcsIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUpO1xuXHRcdGNvbnN0IGlzT3BlbiA9ICEhdGhpcy5zdGF0ZS5pc09wZW47XG5cblx0XHRjb25zdCBhcmlhT3ducyA9IGNsYXNzTmFtZXMoe1xuXHRcdFx0W3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1saXN0J106IGlzT3Blbixcblx0XHRcdFt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctYmFja3NwYWNlLXJlbW92ZS1tZXNzYWdlJ106IHRoaXMucHJvcHMubXVsdGlcblx0XHRcdFx0JiYgIXRoaXMucHJvcHMuZGlzYWJsZWRcblx0XHRcdFx0JiYgdGhpcy5zdGF0ZS5pc0ZvY3VzZWRcblx0XHRcdFx0JiYgIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuXHRcdH0pO1xuXG5cdFx0Ly8gVE9ETzogQ2hlY2sgaG93IHRoaXMgcHJvamVjdCBpbmNsdWRlcyBPYmplY3QuYXNzaWduKClcblx0XHRjb25zdCBpbnB1dFByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLCB7XG5cdFx0XHRyb2xlOiAnY29tYm9ib3gnLFxuXHRcdFx0J2FyaWEtZXhwYW5kZWQnOiAnJyArIGlzT3Blbixcblx0XHRcdCdhcmlhLW93bnMnOiBhcmlhT3ducyxcblx0XHRcdCdhcmlhLWhhc3BvcHVwJzogJycgKyBpc09wZW4sXG5cdFx0XHQnYXJpYS1hY3RpdmVkZXNjZW5kYW50JzogaXNPcGVuID8gdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLW9wdGlvbi0nICsgZm9jdXNlZE9wdGlvbkluZGV4IDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJyxcblx0XHRcdCdhcmlhLWRlc2NyaWJlZGJ5JzogdGhpcy5wcm9wc1snYXJpYS1kZXNjcmliZWRieSddLFxuXHRcdFx0J2FyaWEtbGFiZWxsZWRieSc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWxsZWRieSddLFxuXHRcdFx0J2FyaWEtbGFiZWwnOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10sXG5cdFx0XHRjbGFzc05hbWU6IGNsYXNzTmFtZSxcblx0XHRcdHRhYkluZGV4OiB0aGlzLnByb3BzLnRhYkluZGV4LFxuXHRcdFx0b25CbHVyOiB0aGlzLmhhbmRsZUlucHV0Qmx1cixcblx0XHRcdG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLFxuXHRcdFx0b25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxuXHRcdFx0cmVmOiByZWYgPT4gdGhpcy5pbnB1dCA9IHJlZixcblx0XHRcdHJlcXVpcmVkOiB0aGlzLnN0YXRlLnJlcXVpcmVkLFxuXHRcdFx0dmFsdWU6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuXHRcdH0pO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMuaW5wdXRSZW5kZXJlcikge1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuaW5wdXRSZW5kZXJlcihpbnB1dFByb3BzKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAhdGhpcy5wcm9wcy5zZWFyY2hhYmxlKSB7XG5cdFx0XHRjb25zdCB7IGlucHV0Q2xhc3NOYW1lLCAuLi5kaXZQcm9wcyB9ID0gdGhpcy5wcm9wcy5pbnB1dFByb3BzO1xuXG5cdFx0XHRjb25zdCBhcmlhT3ducyA9IGNsYXNzTmFtZXMoe1xuXHRcdFx0XHRbdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWxpc3QnXTogaXNPcGVuLFxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXZcblx0XHRcdFx0XHR7Li4uZGl2UHJvcHN9XG5cdFx0XHRcdFx0cm9sZT1cImNvbWJvYm94XCJcblx0XHRcdFx0XHRhcmlhLWV4cGFuZGVkPXtpc09wZW59XG5cdFx0XHRcdFx0YXJpYS1vd25zPXthcmlhT3duc31cblx0XHRcdFx0XHRhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2lzT3BlbiA/IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIGZvY3VzZWRPcHRpb25JbmRleCA6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZSd9XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0dGFiSW5kZXg9e3RoaXMucHJvcHMudGFiSW5kZXggfHwgMH1cblx0XHRcdFx0XHRvbkJsdXI9e3RoaXMuaGFuZGxlSW5wdXRCbHVyfVxuXHRcdFx0XHRcdG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1c31cblx0XHRcdFx0XHRyZWY9e3JlZiA9PiB0aGlzLmlucHV0ID0gcmVmfVxuXHRcdFx0XHRcdGFyaWEtcmVhZG9ubHk9eycnICsgISF0aGlzLnByb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdHN0eWxlPXt7IGJvcmRlcjogMCwgd2lkdGg6IDEsIGRpc3BsYXk6J2lubGluZS1ibG9jaycgfX0vPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcm9wcy5hdXRvc2l6ZSkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEF1dG9zaXplSW5wdXQgey4uLmlucHV0UHJvcHN9IG1pbldpZHRoPVwiNVwiIC8+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9eyBjbGFzc05hbWUgfT5cblx0XHRcdFx0PGlucHV0IHsuLi5pbnB1dFByb3BzfSAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXJDbGVhciAoKSB7XG5cblx0XHRpZiAoIXRoaXMucHJvcHMuY2xlYXJhYmxlIHx8IHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLnZhbHVlID09PSBudWxsIHx8IHRoaXMucHJvcHMubXVsdGkgJiYgIXRoaXMucHJvcHMudmFsdWUubGVuZ3RoIHx8IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdGhpcy5wcm9wcy5pc0xvYWRpbmcpIHJldHVybjtcblx0XHRjb25zdCBjbGVhciA9IHRoaXMucHJvcHMuY2xlYXJSZW5kZXJlcigpO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1jbGVhci16b25lXCIgdGl0bGU9e3RoaXMucHJvcHMubXVsdGkgPyB0aGlzLnByb3BzLmNsZWFyQWxsVGV4dCA6IHRoaXMucHJvcHMuY2xlYXJWYWx1ZVRleHR9XG5cdFx0XHRcdGFyaWEtbGFiZWw9e3RoaXMucHJvcHMubXVsdGkgPyB0aGlzLnByb3BzLmNsZWFyQWxsVGV4dCA6IHRoaXMucHJvcHMuY2xlYXJWYWx1ZVRleHR9XG5cdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmNsZWFyVmFsdWV9XG5cdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRvblRvdWNoTW92ZT17dGhpcy5oYW5kbGVUb3VjaE1vdmV9XG5cdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmRDbGVhclZhbHVlfVxuXHRcdFx0PlxuXHRcdFx0XHR7Y2xlYXJ9XG5cdFx0XHQ8L3NwYW4+XG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXJBcnJvdyAoKSB7XG5cdFx0Y29uc3Qgb25Nb3VzZURvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bk9uQXJyb3c7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW47XG5cdFx0Y29uc3QgYXJyb3cgPSB0aGlzLnByb3BzLmFycm93UmVuZGVyZXIoeyBvbk1vdXNlRG93biwgaXNPcGVuIH0pO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxzcGFuXG5cdFx0XHRcdGNsYXNzTmFtZT1cIlNlbGVjdC1hcnJvdy16b25lXCJcblx0XHRcdFx0b25Nb3VzZURvd249e29uTW91c2VEb3dufVxuXHRcdFx0XHRvblRvdWNoU3RhcnQ9e3RoaXMuaGFuZGxlVG91Y2hTdGFydH1cblx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxuXHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kT25BcnJvd31cblx0XHRcdD5cblx0XHRcdFx0e2Fycm93fVxuXHRcdFx0PC9zcGFuPlxuXHRcdCk7XG5cdH0sXG5cblx0ZmlsdGVyT3B0aW9ucyAoZXhjbHVkZU9wdGlvbnMpIHtcblx0XHR2YXIgZmlsdGVyVmFsdWUgPSB0aGlzLnN0YXRlLmlucHV0VmFsdWU7XG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLnByb3BzLm9wdGlvbnMgfHwgW107XG5cdFx0aWYgKHRoaXMucHJvcHMuZmlsdGVyT3B0aW9ucykge1xuXHRcdFx0Ly8gTWFpbnRhaW4gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCBib29sZWFuIGF0dHJpYnV0ZVxuXHRcdFx0Y29uc3QgZmlsdGVyT3B0aW9ucyA9IHR5cGVvZiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMgPT09ICdmdW5jdGlvbidcblx0XHRcdFx0PyB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnNcblx0XHRcdFx0OiBkZWZhdWx0RmlsdGVyT3B0aW9ucztcblxuXHRcdFx0cmV0dXJuIGZpbHRlck9wdGlvbnMoXG5cdFx0XHRcdG9wdGlvbnMsXG5cdFx0XHRcdGZpbHRlclZhbHVlLFxuXHRcdFx0XHRleGNsdWRlT3B0aW9ucyxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZpbHRlck9wdGlvbjogdGhpcy5wcm9wcy5maWx0ZXJPcHRpb24sXG5cdFx0XHRcdFx0aWdub3JlQWNjZW50czogdGhpcy5wcm9wcy5pZ25vcmVBY2NlbnRzLFxuXHRcdFx0XHRcdGlnbm9yZUNhc2U6IHRoaXMucHJvcHMuaWdub3JlQ2FzZSxcblx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5wcm9wcy5sYWJlbEtleSxcblx0XHRcdFx0XHRtYXRjaFBvczogdGhpcy5wcm9wcy5tYXRjaFBvcyxcblx0XHRcdFx0XHRtYXRjaFByb3A6IHRoaXMucHJvcHMubWF0Y2hQcm9wLFxuXHRcdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnByb3BzLnZhbHVlS2V5LFxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9XG5cdH0sXG5cblx0b25PcHRpb25SZWYocmVmLCBpc0ZvY3VzZWQpIHtcblx0XHRpZiAoaXNGb2N1c2VkKSB7XG5cdFx0XHR0aGlzLmZvY3VzZWQgPSByZWY7XG5cdFx0fVxuXHR9LFxuXG5cdHJlbmRlck1lbnUgKG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIHtcblx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMubWVudVJlbmRlcmVyKHtcblx0XHRcdFx0Zm9jdXNlZE9wdGlvbixcblx0XHRcdFx0Zm9jdXNPcHRpb246IHRoaXMuZm9jdXNPcHRpb24sXG5cdFx0XHRcdGluc3RhbmNlUHJlZml4OiB0aGlzLl9pbnN0YW5jZVByZWZpeCxcblx0XHRcdFx0bGFiZWxLZXk6IHRoaXMucHJvcHMubGFiZWxLZXksXG5cdFx0XHRcdG9uRm9jdXM6IHRoaXMuZm9jdXNPcHRpb24sXG5cdFx0XHRcdG9uU2VsZWN0OiB0aGlzLnNlbGVjdFZhbHVlLFxuXHRcdFx0XHRvbkRlbGV0ZTogdGhpcy5kZWxldGVPcHRpb24sXG5cdFx0XHRcdGRlbGV0YWJsZTogdGhpcy5wcm9wcy5kZWxldGFibGUsXG5cdFx0XHRcdG9wdGlvbkNsYXNzTmFtZTogdGhpcy5wcm9wcy5vcHRpb25DbGFzc05hbWUsXG5cdFx0XHRcdG9wdGlvbkNvbXBvbmVudDogdGhpcy5wcm9wcy5vcHRpb25Db21wb25lbnQsXG5cdFx0XHRcdG9wdGlvblJlbmRlcmVyOiB0aGlzLnByb3BzLm9wdGlvblJlbmRlcmVyIHx8IHRoaXMuZ2V0T3B0aW9uTGFiZWwsXG5cdFx0XHRcdG9wdGlvbnMsXG5cdFx0XHRcdHNlbGVjdFZhbHVlOiB0aGlzLnNlbGVjdFZhbHVlLFxuXHRcdFx0XHR2YWx1ZUFycmF5LFxuXHRcdFx0XHR2YWx1ZUtleTogdGhpcy5wcm9wcy52YWx1ZUtleSxcblx0XHRcdFx0b25PcHRpb25SZWY6IHRoaXMub25PcHRpb25SZWYsXG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMubm9SZXN1bHRzVGV4dCkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJTZWxlY3Qtbm9yZXN1bHRzXCI+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMubm9SZXN1bHRzVGV4dH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0cmVuZGVySGlkZGVuRmllbGQgKHZhbHVlQXJyYXkpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMubmFtZSkgcmV0dXJuO1xuXHRcdGlmICh0aGlzLnByb3BzLmpvaW5WYWx1ZXMpIHtcblx0XHRcdGxldCB2YWx1ZSA9IHZhbHVlQXJyYXkubWFwKGkgPT4gc3RyaW5naWZ5VmFsdWUoaVt0aGlzLnByb3BzLnZhbHVlS2V5XSkpLmpvaW4odGhpcy5wcm9wcy5kZWxpbWl0ZXIpO1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0dHlwZT1cImhpZGRlblwiXG5cdFx0XHRcdFx0cmVmPXtyZWYgPT4gdGhpcy52YWx1ZSA9IHJlZn1cblx0XHRcdFx0XHRuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG5cdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfSAvPlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlQXJyYXkubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuXHRcdFx0PGlucHV0IGtleT17J2hpZGRlbi4nICsgaW5kZXh9XG5cdFx0XHRcdHR5cGU9XCJoaWRkZW5cIlxuXHRcdFx0XHRyZWY9eyd2YWx1ZScgKyBpbmRleH1cblx0XHRcdFx0bmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuXHRcdFx0XHR2YWx1ZT17c3RyaW5naWZ5VmFsdWUoaXRlbVt0aGlzLnByb3BzLnZhbHVlS2V5XSl9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfSAvPlxuXHRcdCkpO1xuXHR9LFxuXG5cdHJlbmRlclJlcXVpcmVkTWVzc2FnZSAoKSB7XG5cdFx0Y29uc3QgZmllbGRSZXF1aXJlZE1lc3NhZ2UgPSAnRmllbGQgaXMgcmVxdWlyZWQnO1xuXHRcdHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJyZXF1aXJlZC1tZXNzYWdlXCI+e2ZpZWxkUmVxdWlyZWRNZXNzYWdlfTwvc3Bhbj5cblx0fSxcblxuXHRnZXRGb2N1c2FibGVPcHRpb25JbmRleCAoc2VsZWN0ZWRPcHRpb24pIHtcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zO1xuXHRcdGlmICghb3B0aW9ucy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG5cdFx0bGV0IGZvY3VzZWRPcHRpb24gPSB0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24gfHwgc2VsZWN0ZWRPcHRpb247XG5cdFx0aWYgKGZvY3VzZWRPcHRpb24gJiYgIWZvY3VzZWRPcHRpb24uZGlzYWJsZWQpIHtcblx0XHRcdGxldCBmb2N1c2VkT3B0aW9uSW5kZXggPSAtMTtcblx0XHRcdG9wdGlvbnMuc29tZSgob3B0aW9uLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRjb25zdCBpc09wdGlvbkVxdWFsID0gb3B0aW9uLnZhbHVlID09PSBmb2N1c2VkT3B0aW9uLnZhbHVlO1xuXHRcdFx0XHRpZiAoaXNPcHRpb25FcXVhbCkge1xuXHRcdFx0XHRcdGZvY3VzZWRPcHRpb25JbmRleCA9IGluZGV4O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBpc09wdGlvbkVxdWFsO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAoZm9jdXNlZE9wdGlvbkluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRyZXR1cm4gZm9jdXNlZE9wdGlvbkluZGV4O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCFvcHRpb25zW2ldLmRpc2FibGVkKSByZXR1cm4gaTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0cmVuZGVyT3V0ZXIgKG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIHtcblx0XHRsZXQgbWVudSA9IHRoaXMucmVuZGVyTWVudShvcHRpb25zLCB2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uKTtcblx0XHRpZiAoIW1lbnUpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IHJlZj17cmVmID0+IHRoaXMubWVudUNvbnRhaW5lciA9IHJlZn0gY2xhc3NOYW1lPVwiU2VsZWN0LW1lbnUtb3V0ZXJcIiBzdHlsZT17dGhpcy5wcm9wcy5tZW51Q29udGFpbmVyU3R5bGV9PlxuXHRcdFx0XHQ8ZGl2IHJlZj17cmVmID0+IHRoaXMubWVudSA9IHJlZn0gcm9sZT1cImxpc3Rib3hcIiBjbGFzc05hbWU9XCJTZWxlY3QtbWVudVwiIGlkPXt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCd9XG5cdFx0XHRcdFx0XHQgc3R5bGU9e3RoaXMucHJvcHMubWVudVN0eWxlfVxuXHRcdFx0XHRcdFx0IG9uU2Nyb2xsPXt0aGlzLmhhbmRsZU1lbnVTY3JvbGx9XG5cdFx0XHRcdFx0XHQgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3duT25NZW51fT5cblx0XHRcdFx0XHR7bWVudX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlclNlbGVjdExhYmVsICgpIHtcblx0XHRpZih0aGlzLnByb3BzLnNlbGVjdExhYmVsKSB7XG5cdFx0XHRsZXQgY2xhc3NOYW1lcyA9IHRoaXMuc3RhdGUuaXNGb2N1c2VkID8gJ3NlbGVjdC1maWVsZC1sYWJlbCBzZWxlY3QtZmllbGQtbGFiZWwtZm9jdXNlZCcgOiAnc2VsZWN0LWZpZWxkLWxhYmVsJztcblx0XHRcdHJldHVybiA8aDMgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT57dGhpcy5wcm9wcy5zZWxlY3RMYWJlbH17dGhpcy5wcm9wcy5pc1JlcXVpcmVkICYmIDxzcGFuIGNsYXNzTmFtZT1cInJlcXVpcmVkLWFzdGVyaXNrXCI+ICo8L3NwYW4+fTwvaDM+O1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHRyZW5kZXIgKCkge1xuXHRcdGxldCB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdGxldCBvcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnMgPSB0aGlzLmZpbHRlck9wdGlvbnModGhpcy5wcm9wcy5tdWx0aSA/IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKSA6IG51bGwpO1xuXHRcdGxldCBpc09wZW4gPSB0aGlzLnN0YXRlLmlzT3Blbjtcblx0XHRsZXQgc2hvd1JlcXVpcmVkTXNnID0gdGhpcy5zdGF0ZS5zaG93UmVxdWlyZWRNc2c7XG5cdFx0aWYgKHRoaXMucHJvcHMubXVsdGkgJiYgIW9wdGlvbnMubGVuZ3RoICYmIHZhbHVlQXJyYXkubGVuZ3RoICYmICF0aGlzLnN0YXRlLmlucHV0VmFsdWUpIGlzT3BlbiA9IGZhbHNlO1xuXHRcdGNvbnN0IGZvY3VzZWRPcHRpb25JbmRleCA9IHRoaXMuZ2V0Rm9jdXNhYmxlT3B0aW9uSW5kZXgodmFsdWVBcnJheVswXSk7XG5cblx0XHRsZXQgZm9jdXNlZE9wdGlvbiA9IG51bGw7XG5cdFx0aWYgKGZvY3VzZWRPcHRpb25JbmRleCAhPT0gbnVsbCkge1xuXHRcdFx0Zm9jdXNlZE9wdGlvbiA9IHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25zW2ZvY3VzZWRPcHRpb25JbmRleF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvY3VzZWRPcHRpb24gPSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gbnVsbDtcblx0XHR9XG5cdFx0bGV0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoJ1NlbGVjdCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG5cdFx0XHQnU2VsZWN0LWRhcmsnOiAodGhpcy5wcm9wcy50aGVtZSA9PT0gJ2RhcmsnKSxcblx0XHRcdCdTZWxlY3QtLW11bHRpJzogdGhpcy5wcm9wcy5tdWx0aSxcblx0XHRcdCdTZWxlY3QtLXNpbmdsZSc6ICF0aGlzLnByb3BzLm11bHRpLFxuXHRcdFx0J2lzLWNsZWFyYWJsZSc6IHRoaXMucHJvcHMuY2xlYXJhYmxlLFxuXHRcdFx0J2lzLWRpc2FibGVkJzogdGhpcy5wcm9wcy5kaXNhYmxlZCxcblx0XHRcdCdpcy1mb2N1c2VkJzogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQsXG5cdFx0XHQnaXMtbG9hZGluZyc6IHRoaXMucHJvcHMuaXNMb2FkaW5nLFxuXHRcdFx0J2lzLW9wZW4nOiBpc09wZW4sXG5cdFx0XHQnaXMtcHNldWRvLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmlzUHNldWRvRm9jdXNlZCxcblx0XHRcdCdpcy1zZWFyY2hhYmxlJzogdGhpcy5wcm9wcy5zZWFyY2hhYmxlLFxuXHRcdFx0J2hhcy12YWx1ZSc6IHZhbHVlQXJyYXkubGVuZ3RoLFxuXHRcdH0pO1xuXG5cdFx0bGV0IHJlbW92ZU1lc3NhZ2UgPSBudWxsO1xuXHRcdGlmICh0aGlzLnByb3BzLm11bHRpICYmXG5cdFx0XHQhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJlxuXHRcdFx0dmFsdWVBcnJheS5sZW5ndGggJiZcblx0XHRcdCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiZcblx0XHRcdHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmXG5cdFx0XHR0aGlzLnByb3BzLmJhY2tzcGFjZVJlbW92ZXMpIHtcblx0XHRcdHJlbW92ZU1lc3NhZ2UgPSAoXG5cdFx0XHRcdDxzcGFuIGlkPXt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctYmFja3NwYWNlLXJlbW92ZS1tZXNzYWdlJ30gY2xhc3NOYW1lPVwiU2VsZWN0LWFyaWEtb25seVwiIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZS5yZXBsYWNlKCd7bGFiZWx9JywgdmFsdWVBcnJheVt2YWx1ZUFycmF5Lmxlbmd0aCAtIDFdW3RoaXMucHJvcHMubGFiZWxLZXldKX1cblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiByZWY9e3JlZiA9PiB0aGlzLndyYXBwZXIgPSByZWZ9XG5cdFx0XHRcdCBjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0IHN0eWxlPXt0aGlzLnByb3BzLndyYXBwZXJTdHlsZX0+XG5cdFx0XHRcdCB7dGhpcy5yZW5kZXJTZWxlY3RMYWJlbCgpfVxuXHRcdFx0XHR7dGhpcy5yZW5kZXJIaWRkZW5GaWVsZCh2YWx1ZUFycmF5KX1cblx0XHRcdFx0PGRpdiByZWY9e3JlZiA9PiB0aGlzLmNvbnRyb2wgPSByZWZ9XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiU2VsZWN0LWNvbnRyb2xcIlxuXHRcdFx0XHRcdHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuXHRcdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn1cblx0XHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kfVxuXHRcdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRcdG9uVG91Y2hNb3ZlPXt0aGlzLmhhbmRsZVRvdWNoTW92ZX1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1tdWx0aS12YWx1ZS13cmFwcGVyXCIgaWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZSd9PlxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUodmFsdWVBcnJheSwgaXNPcGVuKX1cblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlcklucHV0KHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb25JbmRleCl9XG5cdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdHtyZW1vdmVNZXNzYWdlfVxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckxvYWRpbmcoKX1cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDbGVhcigpfVxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckFycm93KCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHR7IWlzT3BlbiAmJiBzaG93UmVxdWlyZWRNc2cgJiYgdGhpcy5wcm9wcy5pc1JlcXVpcmVkICYmIHRoaXMucHJvcHMubXVsdGkgJiYgIXZhbHVlQXJyYXkubGVuZ3RoICYmIHRoaXMucmVuZGVyUmVxdWlyZWRNZXNzYWdlKCl9XG5cdFx0XHRcdHshaXNPcGVuICYmIHNob3dSZXF1aXJlZE1zZyAmJiB0aGlzLnByb3BzLmlzUmVxdWlyZWQgJiYgIXRoaXMucHJvcHMubXVsdGkgJiYgIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAmJiAhdGhpcy5wcm9wcy52YWx1ZSAmJiB0aGlzLnJlbmRlclJlcXVpcmVkTWVzc2FnZSgpfVxuXHRcdFx0XHR7aXNPcGVuID8gdGhpcy5yZW5kZXJPdXRlcihvcHRpb25zLCAhdGhpcy5wcm9wcy5tdWx0aSA/IHZhbHVlQXJyYXkgOiBudWxsLCBmb2N1c2VkT3B0aW9uKSA6IG51bGx9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Q7XG4iXX0=
