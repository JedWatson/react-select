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
					this.select.closeMenu();
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
		var fValue = '';
		if (!this.props.multi && this.props.value) {
			fValue = this.props.value;
		}
		return {
			inputValue: fValue,
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

		console.log(value);
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
				inputValue: value.label,
				isPseudoFocused: this.state.isFocused
			}, function () {
				_this3.setValue(value);
			});
		}
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
			!isOpen && showRequiredMsg && this.props.isRequired && !this.props.multi && !this.state.inputValue && this.renderRequiredMessage(),
			isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null
		);
	}

});

exports['default'] = Select;
module.exports = exports['default'];

},{"./Async":1,"./AsyncCreatable":2,"./Creatable":3,"./Option":4,"./Value":5,"./utils/defaultArrowRenderer":6,"./utils/defaultClearRenderer":7,"./utils/defaultFilterOptions":8,"./utils/defaultMenuRenderer":9,"classnames":undefined,"create-react-class":undefined,"prop-types":undefined,"react":undefined,"react-dom":undefined,"react-input-autosize":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS95ZHJhcmd5cm9zL0Rlc2t0b3AvQXJ0bGltZXMvYXJ0bGltZXMtc2VsZWN0L21pbmltYWwtcmVhY3Qtc2VsZWN0L3NyYy9Bc3luYy5qcyIsIi9ob21lL3lkcmFyZ3lyb3MvRGVza3RvcC9BcnRsaW1lcy9hcnRsaW1lcy1zZWxlY3QvbWluaW1hbC1yZWFjdC1zZWxlY3Qvc3JjL0FzeW5jQ3JlYXRhYmxlLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvQ3JlYXRhYmxlLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvT3B0aW9uLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvVmFsdWUuanMiLCIvaG9tZS95ZHJhcmd5cm9zL0Rlc2t0b3AvQXJ0bGltZXMvYXJ0bGltZXMtc2VsZWN0L21pbmltYWwtcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0QXJyb3dSZW5kZXJlci5qcyIsIi9ob21lL3lkcmFyZ3lyb3MvRGVza3RvcC9BcnRsaW1lcy9hcnRsaW1lcy1zZWxlY3QvbWluaW1hbC1yZWFjdC1zZWxlY3Qvc3JjL3V0aWxzL2RlZmF1bHRDbGVhclJlbmRlcmVyLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvdXRpbHMvZGVmYXVsdEZpbHRlck9wdGlvbnMuanMiLCIvaG9tZS95ZHJhcmd5cm9zL0Rlc2t0b3AvQXJ0bGltZXMvYXJ0bGltZXMtc2VsZWN0L21pbmltYWwtcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvdXRpbHMvc3RyaXBEaWFjcml0aWNzLmpzIiwiL2hvbWUveWRyYXJneXJvcy9EZXNrdG9wL0FydGxpbWVzL2FydGxpbWVzLXNlbGVjdC9taW5pbWFsLXJlYWN0LXNlbGVjdC9zcmMvU2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDQWlDLE9BQU87Ozs7eUJBQ2xCLFlBQVk7Ozs7c0JBQ2YsVUFBVTs7OztvQ0FDRCx5QkFBeUI7Ozs7QUFFckQsSUFBTSxTQUFTLEdBQUc7QUFDakIsU0FBUSxFQUFFLHVCQUFVLElBQUksQ0FBQyxVQUFVO0FBQ25DLE1BQUssRUFBRSx1QkFBVSxHQUFHO0FBQ3BCLFNBQVEsRUFBRSx1QkFBVSxJQUFJLENBQUMsVUFBVTtBQUNuQyxjQUFhLEVBQUUsdUJBQVUsSUFBSTtBQUM3QixXQUFVLEVBQUUsdUJBQVUsSUFBSTtBQUMxQixtQkFBa0IsRUFBRSx1QkFBVSxTQUFTLENBQUM7QUFDdkMsd0JBQVUsTUFBTSxFQUNoQix1QkFBVSxJQUFJLENBQ2QsQ0FBQztBQUNGLFlBQVcsRUFBRSx1QkFBVSxJQUFJLENBQUMsVUFBVTtBQUN0QyxNQUFLLEVBQUUsdUJBQVUsSUFBSTtBQUNyQixRQUFPLEVBQUUsdUJBQVUsS0FBSyxDQUFDLFVBQVU7QUFDbkMsWUFBVyxFQUFFLHVCQUFVLFNBQVMsQ0FBQztBQUNoQyx3QkFBVSxNQUFNLEVBQ2hCLHVCQUFVLElBQUksQ0FDZCxDQUFDO0FBQ0YsY0FBYSxFQUFFLHVCQUFVLFNBQVMsQ0FBQztBQUNsQyx3QkFBVSxNQUFNLEVBQ2hCLHVCQUFVLElBQUksQ0FDZCxDQUFDO0FBQ0YsU0FBUSxFQUFFLHVCQUFVLElBQUk7QUFDeEIsaUJBQWdCLEVBQUUsdUJBQVUsU0FBUyxDQUFDO0FB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QTRCLEVBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxBQUFDO0tBQy9FLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQztLQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQztLQUMzQztJQUNOLGFBQWE7SUFDYixJQUFJLENBQUMsYUFBYSxFQUFFO0lBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUU7SUFDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRTtJQUNkO0dBQ0wsQ0FBQyxNQUFNLElBQUksZUFBZSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7R0FDN0gsQ0FBQyxNQUFNLElBQUksZUFBZSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7R0FDbEksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLElBQUksRUFBRSxhQUFhLENBQUMsR0FBRyxJQUFJO0dBQzNGLENBQ0w7RUFDRjs7Q0FFRCxDQUFDLENBQUM7O3FCQUVZLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vU2VsZWN0JztcbmltcG9ydCBzdHJpcERpYWNyaXRpY3MgZnJvbSAnLi91dGlscy9zdHJpcERpYWNyaXRpY3MnO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG5cdGF1dG9sb2FkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLCAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGNhbGwgdGhlIGBsb2FkT3B0aW9uc2AgcHJvcCBvbi1tb3VudDsgZGVmYXVsdHMgdG8gdHJ1ZVxuXHRjYWNoZTogUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAgICAgICAgICAgLy8gb2JqZWN0IHRvIHVzZSB0byBjYWNoZSByZXN1bHRzOyBzZXQgdG8gbnVsbC9mYWxzZSB0byBkaXNhYmxlIGNhY2hpbmdcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsICAgICAgIC8vIENoaWxkIGZ1bmN0aW9uIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGUgaW5uZXIgU2VsZWN0IGNvbXBvbmVudDsgKHByb3BzOiBPYmplY3QpOiBQcm9wVHlwZXMuZWxlbWVudFxuXHRpZ25vcmVBY2NlbnRzOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgLy8gc3RyaXAgZGlhY3JpdGljcyB3aGVuIGZpbHRlcmluZzsgZGVmYXVsdHMgdG8gdHJ1ZVxuXHRpZ25vcmVDYXNlOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAgLy8gcGVyZm9ybSBjYXNlLWluc2Vuc2l0aXZlIGZpbHRlcmluZzsgZGVmYXVsdHMgdG8gdHJ1ZVxuXHRsb2FkaW5nUGxhY2Vob2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoWyAgLy8gcmVwbGFjZXMgdGhlIHBsYWNlaG9sZGVyIHdoaWxlIG9wdGlvbnMgYXJlIGxvYWRpbmdcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFByb3BUeXBlcy5ub2RlXG5cdF0pLFxuXHRsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCwgICAgLy8gY2FsbGJhY2sgdG8gbG9hZCBvcHRpb25zIGFzeW5jaHJvbm91c2x5OyAoaW5wdXRWYWx1ZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiA/UHJvbWlzZVxuXHRtdWx0aTogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAgICAgICAgLy8gbXVsdGktdmFsdWUgaW5wdXRcblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsICAgICAgICAgICAgIC8vIGFycmF5IG9mIG9wdGlvbnNcblx0cGxhY2Vob2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoWyAgICAgICAgIC8vIGZpZWxkIHBsYWNlaG9sZGVyLCBkaXNwbGF5ZWQgd2hlbiB0aGVyZSdzIG5vIHZhbHVlIChzaGFyZWQgd2l0aCBTZWxlY3QpXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcblx0XHRQcm9wVHlwZXMubm9kZVxuXHRdKSxcblx0bm9SZXN1bHRzVGV4dDogUHJvcFR5cGVzLm9uZU9mVHlwZShbICAgICAgIC8vIGZpZWxkIG5vUmVzdWx0c1RleHQsIGRpc3BsYXllZCB3aGVuIG5vIG9wdGlvbnMgY29tZSBiYWNrIGZyb20gdGhlIHNlcnZlclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UHJvcFR5cGVzLm5vZGVcblx0XSksXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgICAvLyBvbkNoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAobmV3VmFsdWUpIHt9XG5cdHNlYXJjaFByb21wdFRleHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoWyAgICAvLyBsYWJlbCB0byBwcm9tcHQgZm9yIHNlYXJjaCBpbnB1dFxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UHJvcFR5cGVzLm5vZGVcblx0XSksXG5cdG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAvLyBvcHRpb25hbCBmb3Iga2VlcGluZyB0cmFjayBvZiB3aGF0IGlzIGJlaW5nIHR5cGVkXG5cdHZhbHVlOiBQcm9wVHlwZXMuYW55LCAgICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIGZpZWxkIHZhbHVlXG59O1xuXG5jb25zdCBkZWZhdWx0Q2FjaGUgPSB7fTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuXHRhdXRvbG9hZDogdHJ1ZSxcblx0Y2FjaGU6IGRlZmF1bHRDYWNoZSxcblx0Y2hpbGRyZW46IGRlZmF1bHRDaGlsZHJlbixcblx0aWdub3JlQWNjZW50czogdHJ1ZSxcblx0aWdub3JlQ2FzZTogdHJ1ZSxcblx0bG9hZGluZ1BsYWNlaG9sZGVyOiAnTG9hZGluZy4uLicsXG5cdG9wdGlvbnM6IFtdLFxuXHRzZWFyY2hQcm9tcHRUZXh0OiAnVHlwZSB0byBzZWFyY2gnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXN5bmMgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvciAocHJvcHMsIGNvbnRleHQpIHtcblx0XHRzdXBlcihwcm9wcywgY29udGV4dCk7XG5cblx0XHR0aGlzLl9jYWNoZSA9IHByb3BzLmNhY2hlID09PSBkZWZhdWx0Q2FjaGUgPyB7fSA6IHByb3BzLmNhY2hlO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRvcHRpb25zOiBwcm9wcy5vcHRpb25zLFxuXHRcdH07XG5cblx0XHR0aGlzLl9vbklucHV0Q2hhbmdlID0gdGhpcy5fb25JbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXHRcdGNvbnN0IHsgYXV0b2xvYWQgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAoYXV0b2xvYWQpIHtcblx0XHRcdHRoaXMubG9hZE9wdGlvbnMoJycpO1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVcGRhdGUgKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG5cdFx0Y29uc3QgcHJvcGVydGllc1RvU3luYyA9IFsnb3B0aW9ucyddO1xuXHRcdHByb3BlcnRpZXNUb1N5bmMuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMucHJvcHNbcHJvcF0gIT09IG5leHRQcm9wc1twcm9wXSkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRbcHJvcF06IG5leHRQcm9wc1twcm9wXVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGNsZWFyT3B0aW9ucygpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgb3B0aW9uczogW10gfSk7XG5cdH1cblxuXHRsb2FkT3B0aW9ucyAoaW5wdXRWYWx1ZSkge1xuXHRcdGNvbnN0IHsgbG9hZE9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgY2FjaGUgPSB0aGlzLl9jYWNoZTtcblxuXHRcdGlmIChcblx0XHRcdGNhY2hlICYmXG5cdFx0XHRjYWNoZS5oYXNPd25Qcm9wZXJ0eShpbnB1dFZhbHVlKVxuXHRcdCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdG9wdGlvbnM6IGNhY2hlW2lucHV0VmFsdWVdXG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNhbGxiYWNrID0gKGVycm9yLCBkYXRhKSA9PiB7XG5cdFx0XHRpZiAoY2FsbGJhY2sgPT09IHRoaXMuX2NhbGxiYWNrKSB7XG5cdFx0XHRcdHRoaXMuX2NhbGxiYWNrID0gbnVsbDtcblxuXHRcdFx0XHRjb25zdCBvcHRpb25zID0gZGF0YSAmJiBkYXRhLm9wdGlvbnMgfHwgW107XG5cblx0XHRcdFx0aWYgKGNhY2hlKSB7XG5cdFx0XHRcdFx0Y2FjaGVbaW5wdXRWYWx1ZV0gPSBvcHRpb25zO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0aXNMb2FkaW5nOiBmYWxzZSxcblx0XHRcdFx0XHRvcHRpb25zXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyBJZ25vcmUgYWxsIGJ1dCB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdFxuXHRcdHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cblx0XHRjb25zdCBwcm9taXNlID0gbG9hZE9wdGlvbnMoaW5wdXRWYWx1ZSwgY2FsbGJhY2spO1xuXHRcdGlmIChwcm9taXNlKSB7XG5cdFx0XHRwcm9taXNlLnRoZW4oXG5cdFx0XHRcdChkYXRhKSA9PiBjYWxsYmFjayhudWxsLCBkYXRhKSxcblx0XHRcdFx0KGVycm9yKSA9PiBjYWxsYmFjayhlcnJvcilcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKFxuXHRcdFx0dGhpcy5fY2FsbGJhY2sgJiZcblx0XHRcdCF0aGlzLnN0YXRlLmlzTG9hZGluZ1xuXHRcdCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzTG9hZGluZzogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlucHV0VmFsdWU7XG5cdH1cblxuXHRfb25JbnB1dENoYW5nZSAoaW5wdXRWYWx1ZSkge1xuXHRcdGNvbnN0IHsgaWdub3JlQWNjZW50cywgaWdub3JlQ2FzZSwgb25JbnB1dENoYW5nZSB9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmIChpZ25vcmVBY2NlbnRzKSB7XG5cdFx0XHRpbnB1dFZhbHVlID0gc3RyaXBEaWFjcml0aWNzKGlucHV0VmFsdWUpO1xuXHRcdH1cblxuXHRcdGlmIChpZ25vcmVDYXNlKSB7XG5cdFx0XHRpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdH1cblxuXHRcdGlmIChvbklucHV0Q2hhbmdlKSB7XG5cdFx0XHRvbklucHV0Q2hhbmdlKGlucHV0VmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmxvYWRPcHRpb25zKGlucHV0VmFsdWUpO1xuXHR9XG5cblx0aW5wdXRWYWx1ZSgpIHtcblx0XHRpZiAodGhpcy5zZWxlY3QpIHtcblx0XHRcdHJldHVybiB0aGlzLnNlbGVjdC5zdGF0ZS5pbnB1dFZhbHVlO1xuXHRcdH1cblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRub1Jlc3VsdHNUZXh0KCkge1xuXHRcdGNvbnN0IHsgbG9hZGluZ1BsYWNlaG9sZGVyLCBub1Jlc3VsdHNUZXh0LCBzZWFyY2hQcm9tcHRUZXh0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHsgaXNMb2FkaW5nIH0gPSB0aGlzLnN0YXRlO1xuXG5cdFx0Y29uc3QgaW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRWYWx1ZSgpO1xuXG5cdFx0aWYgKGlzTG9hZGluZykge1xuXHRcdFx0cmV0dXJuIGxvYWRpbmdQbGFjZWhvbGRlcjtcblx0XHR9XG5cdFx0aWYgKGlucHV0VmFsdWUgJiYgbm9SZXN1bHRzVGV4dCkge1xuXHRcdFx0cmV0dXJuIG5vUmVzdWx0c1RleHQ7XG5cdFx0fVxuXHRcdHJldHVybiBzZWFyY2hQcm9tcHRUZXh0O1xuXHR9XG5cblx0Zm9jdXMgKCkge1xuXHRcdHRoaXMuc2VsZWN0LmZvY3VzKCk7XG5cdH1cblxuXHRyZW5kZXIgKCkge1xuXHRcdGNvbnN0IHsgY2hpbGRyZW4sIGxvYWRpbmdQbGFjZWhvbGRlciwgcGxhY2Vob2xkZXIgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgeyBpc0xvYWRpbmcsIG9wdGlvbnMgfSA9IHRoaXMuc3RhdGU7XG5cblx0XHRjb25zdCBwcm9wcyA9IHtcblx0XHRcdG5vUmVzdWx0c1RleHQ6IHRoaXMubm9SZXN1bHRzVGV4dCgpLFxuXHRcdFx0cGxhY2Vob2xkZXI6IGlzTG9hZGluZyA/IGxvYWRpbmdQbGFjZWhvbGRlciA6IHBsYWNlaG9sZGVyLFxuXHRcdFx0b3B0aW9uczogKGlzTG9hZGluZyAmJiBsb2FkaW5nUGxhY2Vob2xkZXIpID8gW10gOiBvcHRpb25zLFxuXHRcdFx0cmVmOiAocmVmKSA9PiAodGhpcy5zZWxlY3QgPSByZWYpLFxuXHRcdFx0b25DaGFuZ2U6IChuZXdWYWx1ZXMpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMucHJvcHMubXVsdGkgJiYgdGhpcy5wcm9wcy52YWx1ZSAmJiAobmV3VmFsdWVzLmxlbmd0aCA+IHRoaXMucHJvcHMudmFsdWUubGVuZ3RoKSkge1xuXHRcdFx0XHRcdHRoaXMuY2xlYXJPcHRpb25zKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZShuZXdWYWx1ZXMpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gY2hpbGRyZW4oe1xuXHRcdFx0Li4udGhpcy5wcm9wcyxcblx0XHRcdC4uLnByb3BzLFxuXHRcdFx0aXNMb2FkaW5nLFxuXHRcdFx0b25JbnB1dENoYW5nZTogdGhpcy5fb25JbnB1dENoYW5nZVxuXHRcdH0pO1xuXHR9XG59XG5cbkFzeW5jLnByb3BUeXBlcyA9IHByb3BUeXBlcztcbkFzeW5jLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuZnVuY3Rpb24gZGVmYXVsdENoaWxkcmVuIChwcm9wcykge1xuXHRyZXR1cm4gKFxuXHRcdDxTZWxlY3Qgey4uLnByb3BzfSAvPlxuXHQpO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICcuL1NlbGVjdCc7XG5cbmZ1bmN0aW9uIHJlZHVjZShvYmosIHByb3BzID0ge30pe1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKVxuICAucmVkdWNlKChwcm9wcywga2V5KSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBvYmpba2V5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkgcHJvcHNba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBwcm9wcztcbiAgfSwgcHJvcHMpO1xufVxuXG5jb25zdCBBc3luY0NyZWF0YWJsZSA9IGNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdBc3luY0NyZWF0YWJsZVNlbGVjdCcsXG5cblx0Zm9jdXMgKCkge1xuXHRcdHRoaXMuc2VsZWN0LmZvY3VzKCk7XG5cdH0sXG5cblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PFNlbGVjdC5Bc3luYyB7Li4udGhpcy5wcm9wc30+XG5cdFx0XHRcdHsoYXN5bmNQcm9wcykgPT4gKFxuXHRcdFx0XHRcdDxTZWxlY3QuQ3JlYXRhYmxlIHsuLi50aGlzLnByb3BzfT5cblx0XHRcdFx0XHRcdHsoY3JlYXRhYmxlUHJvcHMpID0+IChcblx0XHRcdFx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdFx0XHRcdHsuLi5yZWR1Y2UoYXN5bmNQcm9wcywgcmVkdWNlKGNyZWF0YWJsZVByb3BzLCB7fSkpfVxuXHRcdFx0XHRcdFx0XHRcdG9uSW5wdXRDaGFuZ2U9eyhpbnB1dCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRhYmxlUHJvcHMub25JbnB1dENoYW5nZShpbnB1dCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYXN5bmNQcm9wcy5vbklucHV0Q2hhbmdlKGlucHV0KTtcblx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdHJlZj17KHJlZikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5zZWxlY3QgPSByZWY7XG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGFibGVQcm9wcy5yZWYocmVmKTtcblx0XHRcdFx0XHRcdFx0XHRcdGFzeW5jUHJvcHMucmVmKHJlZik7XG5cdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdCl9XG5cdFx0XHRcdFx0PC9TZWxlY3QuQ3JlYXRhYmxlPlxuXHRcdFx0XHQpfVxuXHRcdFx0PC9TZWxlY3QuQXN5bmM+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXN5bmNDcmVhdGFibGU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ2NyZWF0ZS1yZWFjdC1jbGFzcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICcuL1NlbGVjdCc7XG5pbXBvcnQgZGVmYXVsdEZpbHRlck9wdGlvbnMgZnJvbSAnLi91dGlscy9kZWZhdWx0RmlsdGVyT3B0aW9ucyc7XG5pbXBvcnQgZGVmYXVsdE1lbnVSZW5kZXJlciBmcm9tICcuL3V0aWxzL2RlZmF1bHRNZW51UmVuZGVyZXInO1xuXG5jb25zdCBDcmVhdGFibGUgPSBjcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQ3JlYXRhYmxlU2VsZWN0JyxcblxuXHRwcm9wVHlwZXM6IHtcblx0XHQvLyBDaGlsZCBmdW5jdGlvbiByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGlubmVyIFNlbGVjdCBjb21wb25lbnRcblx0XHQvLyBUaGlzIGNvbXBvbmVudCBjYW4gYmUgdXNlZCB0byBjb21wb3NlIEhPQ3MgKGVnIENyZWF0YWJsZSBhbmQgQXN5bmMpXG5cdFx0Ly8gKHByb3BzOiBPYmplY3QpOiBQcm9wVHlwZXMuZWxlbWVudFxuXHRcdGNoaWxkcmVuOiBQcm9wVHlwZXMuZnVuYyxcblxuXHRcdC8vIFNlZSBTZWxlY3QucHJvcFR5cGVzLmZpbHRlck9wdGlvbnNcblx0XHRmaWx0ZXJPcHRpb25zOiBQcm9wVHlwZXMuYW55LFxuXG5cdFx0Ly8gU2VhcmNoZXMgZm9yIGFueSBtYXRjaGluZyBvcHRpb24gd2l0aGluIHRoZSBzZXQgb2Ygb3B0aW9ucy5cblx0XHQvLyBUaGlzIGZ1bmN0aW9uIHByZXZlbnRzIGR1cGxpY2F0ZSBvcHRpb25zIGZyb20gYmVpbmcgY3JlYXRlZC5cblx0XHQvLyAoeyBvcHRpb246IE9iamVjdCwgb3B0aW9uczogQXJyYXksIGxhYmVsS2V5OiBzdHJpbmcsIHZhbHVlS2V5OiBzdHJpbmcgfSk6IGJvb2xlYW5cblx0XHRpc09wdGlvblVuaXF1ZTogUHJvcFR5cGVzLmZ1bmMsXG5cblx0ICAgIC8vIERldGVybWluZXMgaWYgdGhlIGN1cnJlbnQgaW5wdXQgdGV4dCByZXByZXNlbnRzIGEgdmFsaWQgb3B0aW9uLlxuXHQgICAgLy8gKHsgbGFiZWw6IHN0cmluZyB9KTogYm9vbGVhblxuXHQgICAgaXNWYWxpZE5ld09wdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG5cblx0XHQvLyBTZWUgU2VsZWN0LnByb3BUeXBlcy5tZW51UmVuZGVyZXJcblx0XHRtZW51UmVuZGVyZXI6IFByb3BUeXBlcy5hbnksXG5cblx0ICAgIC8vIEZhY3RvcnkgdG8gY3JlYXRlIG5ldyBvcHRpb24uXG5cdCAgICAvLyAoeyBsYWJlbDogc3RyaW5nLCBsYWJlbEtleTogc3RyaW5nLCB2YWx1ZUtleTogc3RyaW5nIH0pOiBPYmplY3Rcblx0XHRuZXdPcHRpb25DcmVhdG9yOiBQcm9wVHlwZXMuZnVuYyxcblxuXHRcdC8vIGlucHV0IGNoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAoaW5wdXRWYWx1ZSkge31cblx0XHRvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcblxuXHRcdC8vIGlucHV0IGtleURvd24gaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuXHRcdG9uSW5wdXRLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcblxuXHRcdC8vIG5ldyBvcHRpb24gY2xpY2sgaGFuZGxlcjogZnVuY3Rpb24gKG9wdGlvbikge31cblx0XHRvbk5ld09wdGlvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcblxuXHRcdC8vIFNlZSBTZWxlY3QucHJvcFR5cGVzLm9wdGlvbnNcblx0XHRvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXksXG5cblx0ICAgIC8vIENyZWF0ZXMgcHJvbXB0L3BsYWNlaG9sZGVyIG9wdGlvbiB0ZXh0LlxuXHQgICAgLy8gKGZpbHRlclRleHQ6IHN0cmluZyk6IHN0cmluZ1xuXHRcdHByb21wdFRleHRDcmVhdG9yOiBQcm9wVHlwZXMuZnVuYyxcblxuXHRcdC8vIERlY2lkZXMgaWYgYSBrZXlEb3duIGV2ZW50IChlZyBpdHMgYGtleUNvZGVgKSBzaG91bGQgcmVzdWx0IGluIHRoZSBjcmVhdGlvbiBvZiBhIG5ldyBvcHRpb24uXG5cdFx0c2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uOiBQcm9wVHlwZXMuZnVuYyxcblx0fSxcblxuXHQvLyBEZWZhdWx0IHByb3AgbWV0aG9kc1xuXHRzdGF0aWNzOiB7XG5cdFx0aXNPcHRpb25VbmlxdWUsXG5cdFx0aXNWYWxpZE5ld09wdGlvbixcblx0XHRuZXdPcHRpb25DcmVhdG9yLFxuXHRcdHByb21wdFRleHRDcmVhdG9yLFxuXHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvblxuXHR9LFxuXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGZpbHRlck9wdGlvbnM6IGRlZmF1bHRGaWx0ZXJPcHRpb25zLFxuXHRcdFx0aXNPcHRpb25VbmlxdWUsXG5cdFx0XHRpc1ZhbGlkTmV3T3B0aW9uLFxuXHRcdFx0bWVudVJlbmRlcmVyOiBkZWZhdWx0TWVudVJlbmRlcmVyLFxuXHRcdFx0bmV3T3B0aW9uQ3JlYXRvcixcblx0XHRcdHByb21wdFRleHRDcmVhdG9yLFxuXHRcdFx0c2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uLFxuXHRcdH07XG5cdH0sXG5cblx0Y3JlYXRlTmV3T3B0aW9uICgpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRpc1ZhbGlkTmV3T3B0aW9uLFxuXHRcdFx0bmV3T3B0aW9uQ3JlYXRvcixcblx0XHRcdG9uTmV3T3B0aW9uQ2xpY2ssXG5cdFx0XHRvcHRpb25zID0gW10sXG5cdFx0XHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb25cblx0XHR9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmIChpc1ZhbGlkTmV3T3B0aW9uKHsgbGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSB9KSkge1xuXHRcdFx0Y29uc3Qgb3B0aW9uID0gbmV3T3B0aW9uQ3JlYXRvcih7IGxhYmVsOiB0aGlzLmlucHV0VmFsdWUsIGxhYmVsS2V5OiB0aGlzLmxhYmVsS2V5LCB2YWx1ZUtleTogdGhpcy52YWx1ZUtleSB9KTtcblx0XHRcdGNvbnN0IGlzT3B0aW9uVW5pcXVlID0gdGhpcy5pc09wdGlvblVuaXF1ZSh7IG9wdGlvbiB9KTtcblxuXHRcdFx0Ly8gRG9uJ3QgYWRkIHRoZSBzYW1lIG9wdGlvbiB0d2ljZS5cblx0XHRcdGlmIChpc09wdGlvblVuaXF1ZSkge1xuXHRcdFx0XHRpZiAob25OZXdPcHRpb25DbGljaykge1xuXHRcdFx0XHRcdG9uTmV3T3B0aW9uQ2xpY2sob3B0aW9uKTtcblx0XHRcdFx0XHQvLyBDbG9zZXMgdGhlIG1lbnUgd2hlbiBhIG5ldyBvcHRpb24gaXMgY2xpY2tlZC4gQ2xlYXJzIHRoZSBpbnB1dCB2YWx1ZXMgaWYgb25DbG9zZVJlc2V0c0lucHV0IGlzIHNldCB0byB0cnVlIHtkZWZhdWx0OiB0cnVlfS5cblx0XHRcdFx0XHR0aGlzLnNlbGVjdC5jbG9zZU1lbnUoKTtcblx0XHRcdFx0XHQvLyBSZW1vdmUgcmVxdWlyZWRNc2dcblx0XHRcdFx0XHR0aGlzLnNlbGVjdC5yZW1vdmVSZXF1aXJlZE1zZygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG9wdGlvbnMudW5zaGlmdChvcHRpb24pO1xuXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3Quc2VsZWN0VmFsdWUob3B0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRmaWx0ZXJPcHRpb25zICguLi5wYXJhbXMpIHtcblx0XHRjb25zdCB7IGZpbHRlck9wdGlvbnMsIGlzVmFsaWROZXdPcHRpb24sIG9wdGlvbnMsIHByb21wdFRleHRDcmVhdG9yIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0Ly8gVFJJQ0tZIENoZWNrIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb25zIGFzIHdlbGwuXG5cdFx0Ly8gRG9uJ3QgZGlzcGxheSBhIGNyZWF0ZS1wcm9tcHQgZm9yIGEgdmFsdWUgdGhhdCdzIHNlbGVjdGVkLlxuXHRcdC8vIFRoaXMgY292ZXJzIGFzeW5jIGVkZ2UtY2FzZXMgd2hlcmUgYSBuZXdseS1jcmVhdGVkIE9wdGlvbiBpc24ndCB5ZXQgaW4gdGhlIGFzeW5jLWxvYWRlZCBhcnJheS5cblx0XHRjb25zdCBleGNsdWRlT3B0aW9ucyA9IHBhcmFtc1syXSB8fCBbXTtcblxuXHRcdGNvbnN0IGZpbHRlcmVkT3B0aW9ucyA9IGZpbHRlck9wdGlvbnMoLi4ucGFyYW1zKSB8fCBbXTtcblxuXHRcdGlmIChpc1ZhbGlkTmV3T3B0aW9uKHsgbGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSB9KSkge1xuXHRcdFx0Y29uc3QgeyBuZXdPcHRpb25DcmVhdG9yIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0XHRjb25zdCBvcHRpb24gPSBuZXdPcHRpb25DcmVhdG9yKHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSxcblx0XHRcdFx0bGFiZWxLZXk6IHRoaXMubGFiZWxLZXksXG5cdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gVFJJQ0tZIENvbXBhcmUgdG8gYWxsIG9wdGlvbnMgKG5vdCBqdXN0IGZpbHRlcmVkIG9wdGlvbnMpIGluIGNhc2Ugb3B0aW9uIGhhcyBhbHJlYWR5IGJlZW4gc2VsZWN0ZWQpLlxuXHRcdFx0Ly8gRm9yIG11bHRpLXNlbGVjdHMsIHRoaXMgd291bGQgcmVtb3ZlIGl0IGZyb20gdGhlIGZpbHRlcmVkIGxpc3QuXG5cdFx0XHRjb25zdCBpc09wdGlvblVuaXF1ZSA9IHRoaXMuaXNPcHRpb25VbmlxdWUoe1xuXHRcdFx0XHRvcHRpb24sXG5cdFx0XHRcdG9wdGlvbnM6IGV4Y2x1ZGVPcHRpb25zLmNvbmNhdChmaWx0ZXJlZE9wdGlvbnMpXG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGlzT3B0aW9uVW5pcXVlKSB7XG5cdFx0XHRcdGNvbnN0IHByb21wdCA9IHByb21wdFRleHRDcmVhdG9yKHRoaXMuaW5wdXRWYWx1ZSk7XG5cblx0XHRcdFx0dGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24gPSBuZXdPcHRpb25DcmVhdG9yKHtcblx0XHRcdFx0XHRsYWJlbDogcHJvbXB0LFxuXHRcdFx0XHRcdGxhYmVsS2V5OiB0aGlzLmxhYmVsS2V5LFxuXHRcdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGZpbHRlcmVkT3B0aW9ucy51bnNoaWZ0KHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyT3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmlsdGVyZWRPcHRpb25zO1xuXHR9LFxuXG5cdGlzT3B0aW9uVW5pcXVlICh7XG5cdFx0b3B0aW9uLFxuXHRcdG9wdGlvbnNcblx0fSkge1xuXHRcdGNvbnN0IHsgaXNPcHRpb25VbmlxdWUgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB0aGlzLnNlbGVjdC5maWx0ZXJPcHRpb25zKCk7XG5cblx0XHRyZXR1cm4gaXNPcHRpb25VbmlxdWUoe1xuXHRcdFx0bGFiZWxLZXk6IHRoaXMubGFiZWxLZXksXG5cdFx0XHRvcHRpb24sXG5cdFx0XHRvcHRpb25zLFxuXHRcdFx0dmFsdWVLZXk6IHRoaXMudmFsdWVLZXlcblx0XHR9KTtcblx0fSxcblxuXHRtZW51UmVuZGVyZXIgKHBhcmFtcykge1xuXHRcdGNvbnN0IHsgbWVudVJlbmRlcmVyIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0cmV0dXJuIG1lbnVSZW5kZXJlcih7XG5cdFx0XHQuLi5wYXJhbXMsXG5cdFx0XHRvblNlbGVjdDogdGhpcy5vbk9wdGlvblNlbGVjdCxcblx0XHRcdHNlbGVjdFZhbHVlOiB0aGlzLm9uT3B0aW9uU2VsZWN0XG5cdFx0fSk7XG5cdH0sXG5cblx0b25JbnB1dENoYW5nZSAoaW5wdXQpIHtcblx0XHRjb25zdCB7IG9uSW5wdXRDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAob25JbnB1dENoYW5nZSkge1xuXHRcdFx0b25JbnB1dENoYW5nZShpbnB1dCk7XG5cdFx0fVxuXG5cdFx0Ly8gVGhpcyB2YWx1ZSBtYXkgYmUgbmVlZGVkIGluIGJldHdlZW4gU2VsZWN0IG1vdW50cyAod2hlbiB0aGlzLnNlbGVjdCBpcyBudWxsKVxuXHRcdHRoaXMuaW5wdXRWYWx1ZSA9IGlucHV0O1xuXHR9LFxuXG5cdG9uSW5wdXRLZXlEb3duIChldmVudCkge1xuXHRcdGNvbnN0IHsgc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uLCBvbklucHV0S2V5RG93biB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCBmb2N1c2VkT3B0aW9uID0gdGhpcy5zZWxlY3QuZ2V0Rm9jdXNlZE9wdGlvbigpO1xuXG5cdFx0aWYgKFxuXHRcdFx0Zm9jdXNlZE9wdGlvbiAmJlxuXHRcdFx0Zm9jdXNlZE9wdGlvbiA9PT0gdGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24gJiZcblx0XHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbih7IGtleUNvZGU6IGV2ZW50LmtleUNvZGUgfSlcblx0XHQpIHtcblx0XHRcdHRoaXMuY3JlYXRlTmV3T3B0aW9uKCk7XG5cblx0XHRcdC8vIFByZXZlbnQgZGVjb3JhdGVkIFNlbGVjdCBmcm9tIGRvaW5nIGFueXRoaW5nIGFkZGl0aW9uYWwgd2l0aCB0aGlzIGtleURvd24gZXZlbnRcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSBlbHNlIGlmIChvbklucHV0S2V5RG93bikge1xuXHRcdFx0b25JbnB1dEtleURvd24oZXZlbnQpO1xuXHRcdH1cblx0fSxcblxuXHRvbk9wdGlvblNlbGVjdCAob3B0aW9uLCBldmVudCkge1xuXHRcdGlmIChvcHRpb24gPT09IHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyT3B0aW9uKSB7XG5cdFx0XHR0aGlzLmNyZWF0ZU5ld09wdGlvbigpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNlbGVjdC5zZWxlY3RWYWx1ZShvcHRpb24pO1xuXHRcdH1cblx0fSxcblxuXHRmb2N1cyAoKSB7XG5cdFx0dGhpcy5zZWxlY3QuZm9jdXMoKTtcblx0fSxcblxuXHRyZW5kZXIgKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdG5ld09wdGlvbkNyZWF0b3IsXG5cdFx0XHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24sXG5cdFx0XHQuLi5yZXN0UHJvcHNcblx0XHR9ID0gdGhpcy5wcm9wcztcblxuXHRcdGxldCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0Ly8gV2UgY2FuJ3QgdXNlIGRlc3RydWN0dXJpbmcgZGVmYXVsdCB2YWx1ZXMgdG8gc2V0IHRoZSBjaGlsZHJlbixcblx0XHQvLyBiZWNhdXNlIGl0IHdvbid0IGFwcGx5IHdvcmsgaWYgYGNoaWxkcmVuYCBpcyBudWxsLiBBIGZhbHN5IGNoZWNrIGlzXG5cdFx0Ly8gbW9yZSByZWxpYWJsZSBpbiByZWFsIHdvcmxkIHVzZS1jYXNlcy5cblx0XHRpZiAoIWNoaWxkcmVuKSB7XG5cdFx0XHRjaGlsZHJlbiA9IGRlZmF1bHRDaGlsZHJlbjtcblx0XHR9XG5cblx0XHRjb25zdCBwcm9wcyA9IHtcblx0XHRcdC4uLnJlc3RQcm9wcyxcblx0XHRcdGFsbG93Q3JlYXRlOiB0cnVlLFxuXHRcdFx0ZmlsdGVyT3B0aW9uczogdGhpcy5maWx0ZXJPcHRpb25zLFxuXHRcdFx0bWVudVJlbmRlcmVyOiB0aGlzLm1lbnVSZW5kZXJlcixcblx0XHRcdG9uSW5wdXRDaGFuZ2U6IHRoaXMub25JbnB1dENoYW5nZSxcblx0XHRcdG9uSW5wdXRLZXlEb3duOiB0aGlzLm9uSW5wdXRLZXlEb3duLFxuXHRcdFx0cmVmOiAocmVmKSA9PiB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ID0gcmVmO1xuXG5cdFx0XHRcdC8vIFRoZXNlIHZhbHVlcyBtYXkgYmUgbmVlZGVkIGluIGJldHdlZW4gU2VsZWN0IG1vdW50cyAod2hlbiB0aGlzLnNlbGVjdCBpcyBudWxsKVxuXHRcdFx0XHRpZiAocmVmKSB7XG5cdFx0XHRcdFx0dGhpcy5sYWJlbEtleSA9IHJlZi5wcm9wcy5sYWJlbEtleTtcblx0XHRcdFx0XHR0aGlzLnZhbHVlS2V5ID0gcmVmLnByb3BzLnZhbHVlS2V5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBjaGlsZHJlbihwcm9wcyk7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBkZWZhdWx0Q2hpbGRyZW4gKHByb3BzKSB7XG5cdHJldHVybiAoXG5cdFx0PFNlbGVjdCB7Li4ucHJvcHN9IC8+XG5cdCk7XG59O1xuXG5mdW5jdGlvbiBpc09wdGlvblVuaXF1ZSAoeyBvcHRpb24sIG9wdGlvbnMsIGxhYmVsS2V5LCB2YWx1ZUtleSB9KSB7XG5cdHJldHVybiBvcHRpb25zXG5cdFx0LmZpbHRlcigoZXhpc3RpbmdPcHRpb24pID0+XG5cdFx0XHRleGlzdGluZ09wdGlvbltsYWJlbEtleV0gPT09IG9wdGlvbltsYWJlbEtleV0gfHxcblx0XHRcdGV4aXN0aW5nT3B0aW9uW3ZhbHVlS2V5XSA9PT0gb3B0aW9uW3ZhbHVlS2V5XVxuXHRcdClcblx0XHQubGVuZ3RoID09PSAwO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZE5ld09wdGlvbiAoeyBsYWJlbCB9KSB7XG5cdHJldHVybiAhIWxhYmVsO1xufTtcblxuZnVuY3Rpb24gbmV3T3B0aW9uQ3JlYXRvciAoeyBsYWJlbCwgbGFiZWxLZXksIHZhbHVlS2V5IH0pIHtcblx0Y29uc3Qgb3B0aW9uID0ge307XG5cdG9wdGlvblt2YWx1ZUtleV0gPSBsYWJlbDtcbiBcdG9wdGlvbltsYWJlbEtleV0gPSBsYWJlbDtcbiBcdG9wdGlvbi5jbGFzc05hbWUgPSAnU2VsZWN0LWNyZWF0ZS1vcHRpb24tcGxhY2Vob2xkZXInO1xuIFx0cmV0dXJuIG9wdGlvbjtcbn07XG5cbmZ1bmN0aW9uIHByb21wdFRleHRDcmVhdG9yIChsYWJlbCkge1xuXHRyZXR1cm4gYENyZWF0ZSBvcHRpb24gXCIke2xhYmVsfVwiYDtcbn1cblxuZnVuY3Rpb24gc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uICh7IGtleUNvZGUgfSkge1xuXHRzd2l0Y2ggKGtleUNvZGUpIHtcblx0XHRjYXNlIDk6ICAgLy8gVEFCXG5cdFx0Y2FzZSAxMzogIC8vIEVOVEVSXG5cdFx0Y2FzZSAxODg6IC8vIENPTU1BXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ3JlYXRhYmxlXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ2NyZWF0ZS1yZWFjdC1jbGFzcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IE9wdGlvbiA9IGNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgICAgLy8gY2xhc3NOYW1lIChiYXNlZCBvbiBtb3VzZSBwb3NpdGlvbilcblx0XHRpbnN0YW5jZVByZWZpeDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLCAgLy8gdW5pcXVlIHByZWZpeCBmb3IgdGhlIGlkcyAodXNlZCBmb3IgYXJpYSlcblx0XHRpc0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgIC8vIHRoZSBvcHRpb24gaXMgZGlzYWJsZWRcblx0XHRpc0ZvY3VzZWQ6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgIC8vIHRoZSBvcHRpb24gaXMgZm9jdXNlZFxuXHRcdGlzU2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgLy8gdGhlIG9wdGlvbiBpcyBzZWxlY3RlZFxuXHRcdG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBtb3VzZUVudGVyIG9uIG9wdGlvbiBlbGVtZW50XG5cdFx0b25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgICAvLyBtZXRob2QgdG8gaGFuZGxlIGNsaWNrIG9uIG9wdGlvbiBlbGVtZW50XG5cdFx0b25VbmZvY3VzOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAvLyBtZXRob2QgdG8gaGFuZGxlIG1vdXNlTGVhdmUgb24gb3B0aW9uIGVsZW1lbnRcblx0XHRvcHRpb246IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgICAgIC8vIG9iamVjdCB0aGF0IGlzIGJhc2UgZm9yIHRoYXQgb3B0aW9uXG5cdFx0b3B0aW9uSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsICAgICAgICAgICAvLyBpbmRleCBvZiB0aGUgb3B0aW9uLCB1c2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBpZHMgZm9yIGFyaWFcblx0fSxcblx0YmxvY2tFdmVudCAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGlmICgoZXZlbnQudGFyZ2V0LnRhZ05hbWUgIT09ICdBJykgfHwgISgnaHJlZicgaW4gZXZlbnQudGFyZ2V0KSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoZXZlbnQudGFyZ2V0LnRhcmdldCkge1xuXHRcdFx0d2luZG93Lm9wZW4oZXZlbnQudGFyZ2V0LmhyZWYsIGV2ZW50LnRhcmdldC50YXJnZXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGV2ZW50LnRhcmdldC5ocmVmO1xuXHRcdH1cblx0fSxcblxuXHRoYW5kbGVNb3VzZURvd24gKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR0aGlzLnByb3BzLm9uU2VsZWN0KHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XG5cdH0sXG5cblx0aGFuZGxlTW91c2VFbnRlciAoZXZlbnQpIHtcblx0XHR0aGlzLm9uRm9jdXMoZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZU1vdXNlTW92ZSAoZXZlbnQpIHtcblx0XHR0aGlzLm9uRm9jdXMoZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoRW5kKGV2ZW50KXtcblx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdGlmKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaE1vdmUgKGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaFN0YXJ0IChldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBub3QgYmVpbmcgZHJhZ2dlZFxuXHRcdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblx0fSxcblxuXHRvbkZvY3VzIChldmVudCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5pc0ZvY3VzZWQpIHtcblx0XHRcdHRoaXMucHJvcHMub25Gb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHRcdH1cblx0fSxcblx0aGFuZGxlT3B0aW9uRGVsZXRlKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5vbkRlbGV0ZSh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRoYW5kbGVPcHRpb25EZWxldGVUb3VjaEVuZChldmVudCkge1xuXHRcdGlmKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHJldHVybiB0aGlzLnByb3BzLm9uRGVsZXRlKHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIHsgb3B0aW9uLCBpbnN0YW5jZVByZWZpeCwgb3B0aW9uSW5kZXgsIGRlbGV0YWJsZSB9ID0gdGhpcy5wcm9wcztcblx0XHR2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcyh0aGlzLnByb3BzLmNsYXNzTmFtZSwgb3B0aW9uLmNsYXNzTmFtZSk7XG5cblx0XHRyZXR1cm4gZGVsZXRhYmxlID8gKFxuXHRcdFx0b3B0aW9uLmRpc2FibGVkID8gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmJsb2NrRXZlbnR9XG5cdFx0XHRcdFx0b25DbGljaz17dGhpcy5ibG9ja0V2ZW50fT5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtY2xlYXIgU2VsZWN0LWNsZWFyLW1lbnVcIiBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVPcHRpb25EZWxldGV9Png8L3NwYW4+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KSA6IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRzdHlsZT17b3B0aW9uLnN0eWxlfVxuXHRcdFx0XHRcdHJvbGU9XCJvcHRpb25cIlxuXHRcdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn1cblx0XHRcdFx0XHRvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn1cblx0XHRcdFx0XHRvbk1vdXNlTW92ZT17dGhpcy5oYW5kbGVNb3VzZU1vdmV9XG5cdFx0XHRcdFx0b25Ub3VjaFN0YXJ0PXt0aGlzLmhhbmRsZVRvdWNoU3RhcnR9XG5cdFx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxuXHRcdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmR9XG5cdFx0XHRcdFx0aWQ9e2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIG9wdGlvbkluZGV4fVxuXHRcdFx0XHRcdHRpdGxlPXtvcHRpb24udGl0bGV9PlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1jbGVhciBTZWxlY3QtY2xlYXItbWVudVwiIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU9wdGlvbkRlbGV0ZX0gb25Ub3VjaEVuZD17dGhpcy5oYW5kbGVPcHRpb25EZWxldGVUb3VjaEVuZH0+eDwvc3Bhbj5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0KSA6IChcblx0XHRcdG9wdGlvbi5kaXNhYmxlZCA/IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5ibG9ja0V2ZW50fVxuXHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuYmxvY2tFdmVudH0+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KSA6IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRzdHlsZT17b3B0aW9uLnN0eWxlfVxuXHRcdFx0XHRcdHJvbGU9XCJvcHRpb25cIlxuXHRcdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn1cblx0XHRcdFx0XHRvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn1cblx0XHRcdFx0XHRvbk1vdXNlTW92ZT17dGhpcy5oYW5kbGVNb3VzZU1vdmV9XG5cdFx0XHRcdFx0b25Ub3VjaFN0YXJ0PXt0aGlzLmhhbmRsZVRvdWNoU3RhcnR9XG5cdFx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxuXHRcdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmR9XG5cdFx0XHRcdFx0aWQ9e2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIG9wdGlvbkluZGV4fVxuXHRcdFx0XHRcdHRpdGxlPXtvcHRpb24udGl0bGV9PlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBPcHRpb247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ2NyZWF0ZS1yZWFjdC1jbGFzcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IFZhbHVlID0gY3JlYXRlQ2xhc3Moe1xuXG5cdGRpc3BsYXlOYW1lOiAnVmFsdWUnLFxuXG5cdHByb3BUeXBlczoge1xuXHRcdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblx0XHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAgLy8gZGlzYWJsZWQgcHJvcCBwYXNzZWQgdG8gUmVhY3RTZWxlY3Rcblx0XHRpZDogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgICAgICAgICAgLy8gVW5pcXVlIGlkIGZvciB0aGUgdmFsdWUgLSB1c2VkIGZvciBhcmlhXG5cdFx0b25DbGljazogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgY2xpY2sgb24gdmFsdWUgbGFiZWxcblx0XHRvblJlbW92ZTogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSByZW1vdmFsIG9mIHRoZSB2YWx1ZVxuXHRcdHZhbHVlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsICAgICAvLyB0aGUgb3B0aW9uIG9iamVjdCBmb3IgdGhpcyB2YWx1ZVxuXHR9LFxuXG5cdGhhbmRsZU1vdXNlRG93biAoZXZlbnQpIHtcblx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0dGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMudmFsdWUsIGV2ZW50KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKHRoaXMucHJvcHMudmFsdWUuaHJlZikge1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHR9LFxuXG5cdG9uUmVtb3ZlIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0dGhpcy5wcm9wcy5vblJlbW92ZSh0aGlzLnByb3BzLnZhbHVlKTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaEVuZFJlbW92ZSAoZXZlbnQpe1xuXHRcdC8vIENoZWNrIGlmIHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWQsIEluIHRoaXMgY2FzZVxuXHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG5cdFx0aWYodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0Ly8gRmlyZSB0aGUgbW91c2UgZXZlbnRzXG5cdFx0dGhpcy5vblJlbW92ZShldmVudCk7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hNb3ZlIChldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hTdGFydCAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cdH0sXG5cblx0cmVuZGVyUmVtb3ZlSWNvbiAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgIXRoaXMucHJvcHMub25SZW1vdmUpIHJldHVybjtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LXZhbHVlLWljb25cIlxuXHRcdFx0XHRhcmlhLWhpZGRlbj1cInRydWVcIlxuXHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5vblJlbW92ZX1cblx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5oYW5kbGVUb3VjaEVuZFJlbW92ZX1cblx0XHRcdFx0b25Ub3VjaFN0YXJ0PXt0aGlzLmhhbmRsZVRvdWNoU3RhcnR9XG5cdFx0XHRcdG9uVG91Y2hNb3ZlPXt0aGlzLmhhbmRsZVRvdWNoTW92ZX0+XG5cdFx0XHRcdCZ0aW1lcztcblx0XHRcdDwvc3Bhbj5cblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlckxhYmVsICgpIHtcblx0XHRsZXQgY2xhc3NOYW1lID0gJ1NlbGVjdC12YWx1ZS1sYWJlbCc7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMub25DbGljayB8fCB0aGlzLnByb3BzLnZhbHVlLmhyZWYgPyAoXG5cdFx0XHQ8YSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gaHJlZj17dGhpcy5wcm9wcy52YWx1ZS5ocmVmfSB0YXJnZXQ9e3RoaXMucHJvcHMudmFsdWUudGFyZ2V0fSBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259IG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlTW91c2VEb3dufT5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHQ8L2E+XG5cdFx0KSA6IChcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSByb2xlPVwib3B0aW9uXCIgYXJpYS1zZWxlY3RlZD1cInRydWVcIiBpZD17dGhpcy5wcm9wcy5pZH0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9zcGFuPlxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ1NlbGVjdC12YWx1ZScsIHRoaXMucHJvcHMudmFsdWUuY2xhc3NOYW1lKX1cblx0XHRcdFx0c3R5bGU9e3RoaXMucHJvcHMudmFsdWUuc3R5bGV9XG5cdFx0XHRcdHRpdGxlPXt0aGlzLnByb3BzLnZhbHVlLnRpdGxlfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdHt0aGlzLnJlbmRlclJlbW92ZUljb24oKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyTGFiZWwoKX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsdWU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcnJvd1JlbmRlcmVyICh7IG9uTW91c2VEb3duIH0pIHtcblx0cmV0dXJuIChcblx0XHQ8c3BhblxuXHRcdFx0Y2xhc3NOYW1lPVwiU2VsZWN0LWFycm93XCJcblx0XHRcdG9uTW91c2VEb3duPXtvbk1vdXNlRG93bn1cblx0XHQvPlxuXHQpO1xufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsZWFyUmVuZGVyZXIgKCkge1xuXHRyZXR1cm4gKFxuXHRcdDxzcGFuXG5cdFx0XHRjbGFzc05hbWU9XCJTZWxlY3QtY2xlYXJcIlxuXHRcdFx0ZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiAnJnRpbWVzOycgfX1cblx0XHQvPlxuXHQpO1xufTtcbiIsImltcG9ydCBzdHJpcERpYWNyaXRpY3MgZnJvbSAnLi9zdHJpcERpYWNyaXRpY3MnO1xuXG5mdW5jdGlvbiBmaWx0ZXJPcHRpb25zIChvcHRpb25zLCBmaWx0ZXJWYWx1ZSwgZXhjbHVkZU9wdGlvbnMsIHByb3BzKSB7XG5cdGlmIChwcm9wcy5pZ25vcmVBY2NlbnRzKSB7XG5cdFx0ZmlsdGVyVmFsdWUgPSBzdHJpcERpYWNyaXRpY3MoZmlsdGVyVmFsdWUpO1xuXHR9XG5cblx0aWYgKHByb3BzLmlnbm9yZUNhc2UpIHtcblx0XHRmaWx0ZXJWYWx1ZSA9IGZpbHRlclZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdH1cblxuXHRpZiAoZXhjbHVkZU9wdGlvbnMpIGV4Y2x1ZGVPcHRpb25zID0gZXhjbHVkZU9wdGlvbnMubWFwKGkgPT4gaVtwcm9wcy52YWx1ZUtleV0pO1xuXG5cdHJldHVybiBvcHRpb25zLmZpbHRlcihvcHRpb24gPT4ge1xuXHRcdGlmIChleGNsdWRlT3B0aW9ucyAmJiBleGNsdWRlT3B0aW9ucy5pbmRleE9mKG9wdGlvbltwcm9wcy52YWx1ZUtleV0pID4gLTEpIHJldHVybiBmYWxzZTtcblx0XHRpZiAocHJvcHMuZmlsdGVyT3B0aW9uKSByZXR1cm4gcHJvcHMuZmlsdGVyT3B0aW9uLmNhbGwodGhpcywgb3B0aW9uLCBmaWx0ZXJWYWx1ZSk7XG5cdFx0aWYgKCFmaWx0ZXJWYWx1ZSkgcmV0dXJuIHRydWU7XG5cdFx0dmFyIHZhbHVlVGVzdCA9IFN0cmluZyhvcHRpb25bcHJvcHMudmFsdWVLZXldKTtcblx0XHR2YXIgbGFiZWxUZXN0ID0gU3RyaW5nKG9wdGlvbltwcm9wcy5sYWJlbEtleV0pO1xuXHRcdGlmIChwcm9wcy5pZ25vcmVBY2NlbnRzKSB7XG5cdFx0XHRpZiAocHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnKSB2YWx1ZVRlc3QgPSBzdHJpcERpYWNyaXRpY3ModmFsdWVUZXN0KTtcblx0XHRcdGlmIChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScpIGxhYmVsVGVzdCA9IHN0cmlwRGlhY3JpdGljcyhsYWJlbFRlc3QpO1xuXHRcdH1cblx0XHRpZiAocHJvcHMuaWdub3JlQ2FzZSkge1xuXHRcdFx0aWYgKHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJykgdmFsdWVUZXN0ID0gdmFsdWVUZXN0LnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAocHJvcHMubWF0Y2hQcm9wICE9PSAndmFsdWUnKSBsYWJlbFRlc3QgPSBsYWJlbFRlc3QudG9Mb3dlckNhc2UoKTtcblx0XHR9XG5cdFx0cmV0dXJuIHByb3BzLm1hdGNoUG9zID09PSAnc3RhcnQnID8gKFxuXHRcdFx0KHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJyAmJiB2YWx1ZVRlc3Quc3Vic3RyKDAsIGZpbHRlclZhbHVlLmxlbmd0aCkgPT09IGZpbHRlclZhbHVlKSB8fFxuXHRcdFx0KHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJyAmJiBsYWJlbFRlc3Quc3Vic3RyKDAsIGZpbHRlclZhbHVlLmxlbmd0aCkgPT09IGZpbHRlclZhbHVlKVxuXHRcdCkgOiAoXG5cdFx0XHQocHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnICYmIHZhbHVlVGVzdC5pbmRleE9mKGZpbHRlclZhbHVlKSA+PSAwKSB8fFxuXHRcdFx0KHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJyAmJiBsYWJlbFRlc3QuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgPj0gMClcblx0XHQpO1xuXHR9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaWx0ZXJPcHRpb25zO1xuIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBtZW51UmVuZGVyZXIgKHtcblx0Zm9jdXNlZE9wdGlvbixcblx0aW5zdGFuY2VQcmVmaXgsXG5cdGxhYmVsS2V5LFxuXHRvbkZvY3VzLFxuXHRvblNlbGVjdCxcblx0b25EZWxldGUsXG5cdGRlbGV0YWJsZSxcblx0b3B0aW9uQ2xhc3NOYW1lLFxuXHRvcHRpb25Db21wb25lbnQsXG5cdG9wdGlvblJlbmRlcmVyLFxuXHRvcHRpb25zLFxuXHR2YWx1ZUFycmF5LFxuXHR2YWx1ZUtleSxcblx0b25PcHRpb25SZWZcbn0pIHtcblx0bGV0IE9wdGlvbiA9IG9wdGlvbkNvbXBvbmVudDtcblxuXHRyZXR1cm4gb3B0aW9ucy5tYXAoKG9wdGlvbiwgaSkgPT4ge1xuXHRcdGxldCBpc1NlbGVjdGVkID0gdmFsdWVBcnJheSAmJiB2YWx1ZUFycmF5LmluZGV4T2Yob3B0aW9uKSA+IC0xO1xuXHRcdGxldCBpc0ZvY3VzZWQgPSBvcHRpb24gPT09IGZvY3VzZWRPcHRpb247XG5cdFx0bGV0IG9wdGlvbkNsYXNzID0gY2xhc3NOYW1lcyhvcHRpb25DbGFzc05hbWUsIHtcblx0XHRcdCdTZWxlY3Qtb3B0aW9uJzogdHJ1ZSxcblx0XHRcdCdpcy1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsXG5cdFx0XHQnaXMtZm9jdXNlZCc6IGlzRm9jdXNlZCxcblx0XHRcdCdpcy1kaXNhYmxlZCc6IG9wdGlvbi5kaXNhYmxlZFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxPcHRpb25cblx0XHRcdFx0Y2xhc3NOYW1lPXtvcHRpb25DbGFzc31cblx0XHRcdFx0aW5zdGFuY2VQcmVmaXg9e2luc3RhbmNlUHJlZml4fVxuXHRcdFx0XHRpc0Rpc2FibGVkPXtvcHRpb24uZGlzYWJsZWR9XG5cdFx0XHRcdGlzRm9jdXNlZD17aXNGb2N1c2VkfVxuXHRcdFx0XHRpc1NlbGVjdGVkPXtpc1NlbGVjdGVkfVxuXHRcdFx0XHRrZXk9e2BvcHRpb24tJHtpfS0ke29wdGlvblt2YWx1ZUtleV19YH1cblx0XHRcdFx0b25Gb2N1cz17b25Gb2N1c31cblx0XHRcdFx0b25TZWxlY3Q9e29uU2VsZWN0fVxuXHRcdFx0XHRvbkRlbGV0ZT17b25EZWxldGV9XG5cdFx0XHRcdGRlbGV0YWJsZT17ZGVsZXRhYmxlfVxuXHRcdFx0XHRvcHRpb249e29wdGlvbn1cblx0XHRcdFx0b3B0aW9uSW5kZXg9e2l9XG5cdFx0XHRcdHJlZj17cmVmID0+IHsgb25PcHRpb25SZWYocmVmLCBpc0ZvY3VzZWQpOyB9fVxuXHRcdFx0PlxuXHRcdFx0XHR7b3B0aW9uUmVuZGVyZXIob3B0aW9uLCBpKX1cblx0XHRcdDwvT3B0aW9uPlxuXHRcdCk7XG5cdH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbnVSZW5kZXJlcjtcbiIsInZhciBtYXAgPSBbXG5cdHsgJ2Jhc2UnOidBJywgJ2xldHRlcnMnOi9bXFx1MDA0MVxcdTI0QjZcXHVGRjIxXFx1MDBDMFxcdTAwQzFcXHUwMEMyXFx1MUVBNlxcdTFFQTRcXHUxRUFBXFx1MUVBOFxcdTAwQzNcXHUwMTAwXFx1MDEwMlxcdTFFQjBcXHUxRUFFXFx1MUVCNFxcdTFFQjJcXHUwMjI2XFx1MDFFMFxcdTAwQzRcXHUwMURFXFx1MUVBMlxcdTAwQzVcXHUwMUZBXFx1MDFDRFxcdTAyMDBcXHUwMjAyXFx1MUVBMFxcdTFFQUNcXHUxRUI2XFx1MUUwMFxcdTAxMDRcXHUwMjNBXFx1MkM2Rl0vZyB9LFxuXHR7ICdiYXNlJzonQUEnLCdsZXR0ZXJzJzovW1xcdUE3MzJdL2cgfSxcblx0eyAnYmFzZSc6J0FFJywnbGV0dGVycyc6L1tcXHUwMEM2XFx1MDFGQ1xcdTAxRTJdL2cgfSxcblx0eyAnYmFzZSc6J0FPJywnbGV0dGVycyc6L1tcXHVBNzM0XS9nIH0sXG5cdHsgJ2Jhc2UnOidBVScsJ2xldHRlcnMnOi9bXFx1QTczNl0vZyB9LFxuXHR7ICdiYXNlJzonQVYnLCdsZXR0ZXJzJzovW1xcdUE3MzhcXHVBNzNBXS9nIH0sXG5cdHsgJ2Jhc2UnOidBWScsJ2xldHRlcnMnOi9bXFx1QTczQ10vZyB9LFxuXHR7ICdiYXNlJzonQicsICdsZXR0ZXJzJzovW1xcdTAwNDJcXHUyNEI3XFx1RkYyMlxcdTFFMDJcXHUxRTA0XFx1MUUwNlxcdTAyNDNcXHUwMTgyXFx1MDE4MV0vZyB9LFxuXHR7ICdiYXNlJzonQycsICdsZXR0ZXJzJzovW1xcdTAwNDNcXHUyNEI4XFx1RkYyM1xcdTAxMDZcXHUwMTA4XFx1MDEwQVxcdTAxMENcXHUwMEM3XFx1MUUwOFxcdTAxODdcXHUwMjNCXFx1QTczRV0vZyB9LFxuXHR7ICdiYXNlJzonRCcsICdsZXR0ZXJzJzovW1xcdTAwNDRcXHUyNEI5XFx1RkYyNFxcdTFFMEFcXHUwMTBFXFx1MUUwQ1xcdTFFMTBcXHUxRTEyXFx1MUUwRVxcdTAxMTBcXHUwMThCXFx1MDE4QVxcdTAxODlcXHVBNzc5XS9nIH0sXG5cdHsgJ2Jhc2UnOidEWicsJ2xldHRlcnMnOi9bXFx1MDFGMVxcdTAxQzRdL2cgfSxcblx0eyAnYmFzZSc6J0R6JywnbGV0dGVycyc6L1tcXHUwMUYyXFx1MDFDNV0vZyB9LFxuXHR7ICdiYXNlJzonRScsICdsZXR0ZXJzJzovW1xcdTAwNDVcXHUyNEJBXFx1RkYyNVxcdTAwQzhcXHUwMEM5XFx1MDBDQVxcdTFFQzBcXHUxRUJFXFx1MUVDNFxcdTFFQzJcXHUxRUJDXFx1MDExMlxcdTFFMTRcXHUxRTE2XFx1MDExNFxcdTAxMTZcXHUwMENCXFx1MUVCQVxcdTAxMUFcXHUwMjA0XFx1MDIwNlxcdTFFQjhcXHUxRUM2XFx1MDIyOFxcdTFFMUNcXHUwMTE4XFx1MUUxOFxcdTFFMUFcXHUwMTkwXFx1MDE4RV0vZyB9LFxuXHR7ICdiYXNlJzonRicsICdsZXR0ZXJzJzovW1xcdTAwNDZcXHUyNEJCXFx1RkYyNlxcdTFFMUVcXHUwMTkxXFx1QTc3Ql0vZyB9LFxuXHR7ICdiYXNlJzonRycsICdsZXR0ZXJzJzovW1xcdTAwNDdcXHUyNEJDXFx1RkYyN1xcdTAxRjRcXHUwMTFDXFx1MUUyMFxcdTAxMUVcXHUwMTIwXFx1MDFFNlxcdTAxMjJcXHUwMUU0XFx1MDE5M1xcdUE3QTBcXHVBNzdEXFx1QTc3RV0vZyB9LFxuXHR7ICdiYXNlJzonSCcsICdsZXR0ZXJzJzovW1xcdTAwNDhcXHUyNEJEXFx1RkYyOFxcdTAxMjRcXHUxRTIyXFx1MUUyNlxcdTAyMUVcXHUxRTI0XFx1MUUyOFxcdTFFMkFcXHUwMTI2XFx1MkM2N1xcdTJDNzVcXHVBNzhEXS9nIH0sXG5cdHsgJ2Jhc2UnOidJJywgJ2xldHRlcnMnOi9bXFx1MDA0OVxcdTI0QkVcXHVGRjI5XFx1MDBDQ1xcdTAwQ0RcXHUwMENFXFx1MDEyOFxcdTAxMkFcXHUwMTJDXFx1MDEzMFxcdTAwQ0ZcXHUxRTJFXFx1MUVDOFxcdTAxQ0ZcXHUwMjA4XFx1MDIwQVxcdTFFQ0FcXHUwMTJFXFx1MUUyQ1xcdTAxOTddL2cgfSxcblx0eyAnYmFzZSc6J0onLCAnbGV0dGVycyc6L1tcXHUwMDRBXFx1MjRCRlxcdUZGMkFcXHUwMTM0XFx1MDI0OF0vZyB9LFxuXHR7ICdiYXNlJzonSycsICdsZXR0ZXJzJzovW1xcdTAwNEJcXHUyNEMwXFx1RkYyQlxcdTFFMzBcXHUwMUU4XFx1MUUzMlxcdTAxMzZcXHUxRTM0XFx1MDE5OFxcdTJDNjlcXHVBNzQwXFx1QTc0MlxcdUE3NDRcXHVBN0EyXS9nIH0sXG5cdHsgJ2Jhc2UnOidMJywgJ2xldHRlcnMnOi9bXFx1MDA0Q1xcdTI0QzFcXHVGRjJDXFx1MDEzRlxcdTAxMzlcXHUwMTNEXFx1MUUzNlxcdTFFMzhcXHUwMTNCXFx1MUUzQ1xcdTFFM0FcXHUwMTQxXFx1MDIzRFxcdTJDNjJcXHUyQzYwXFx1QTc0OFxcdUE3NDZcXHVBNzgwXS9nIH0sXG5cdHsgJ2Jhc2UnOidMSicsJ2xldHRlcnMnOi9bXFx1MDFDN10vZyB9LFxuXHR7ICdiYXNlJzonTGonLCdsZXR0ZXJzJzovW1xcdTAxQzhdL2cgfSxcblx0eyAnYmFzZSc6J00nLCAnbGV0dGVycyc6L1tcXHUwMDREXFx1MjRDMlxcdUZGMkRcXHUxRTNFXFx1MUU0MFxcdTFFNDJcXHUyQzZFXFx1MDE5Q10vZyB9LFxuXHR7ICdiYXNlJzonTicsICdsZXR0ZXJzJzovW1xcdTAwNEVcXHUyNEMzXFx1RkYyRVxcdTAxRjhcXHUwMTQzXFx1MDBEMVxcdTFFNDRcXHUwMTQ3XFx1MUU0NlxcdTAxNDVcXHUxRTRBXFx1MUU0OFxcdTAyMjBcXHUwMTlEXFx1QTc5MFxcdUE3QTRdL2cgfSxcblx0eyAnYmFzZSc6J05KJywnbGV0dGVycyc6L1tcXHUwMUNBXS9nIH0sXG5cdHsgJ2Jhc2UnOidOaicsJ2xldHRlcnMnOi9bXFx1MDFDQl0vZyB9LFxuXHR7ICdiYXNlJzonTycsICdsZXR0ZXJzJzovW1xcdTAwNEZcXHUyNEM0XFx1RkYyRlxcdTAwRDJcXHUwMEQzXFx1MDBENFxcdTFFRDJcXHUxRUQwXFx1MUVENlxcdTFFRDRcXHUwMEQ1XFx1MUU0Q1xcdTAyMkNcXHUxRTRFXFx1MDE0Q1xcdTFFNTBcXHUxRTUyXFx1MDE0RVxcdTAyMkVcXHUwMjMwXFx1MDBENlxcdTAyMkFcXHUxRUNFXFx1MDE1MFxcdTAxRDFcXHUwMjBDXFx1MDIwRVxcdTAxQTBcXHUxRURDXFx1MUVEQVxcdTFFRTBcXHUxRURFXFx1MUVFMlxcdTFFQ0NcXHUxRUQ4XFx1MDFFQVxcdTAxRUNcXHUwMEQ4XFx1MDFGRVxcdTAxODZcXHUwMTlGXFx1QTc0QVxcdUE3NENdL2cgfSxcblx0eyAnYmFzZSc6J09JJywnbGV0dGVycyc6L1tcXHUwMUEyXS9nIH0sXG5cdHsgJ2Jhc2UnOidPTycsJ2xldHRlcnMnOi9bXFx1QTc0RV0vZyB9LFxuXHR7ICdiYXNlJzonT1UnLCdsZXR0ZXJzJzovW1xcdTAyMjJdL2cgfSxcblx0eyAnYmFzZSc6J1AnLCAnbGV0dGVycyc6L1tcXHUwMDUwXFx1MjRDNVxcdUZGMzBcXHUxRTU0XFx1MUU1NlxcdTAxQTRcXHUyQzYzXFx1QTc1MFxcdUE3NTJcXHVBNzU0XS9nIH0sXG5cdHsgJ2Jhc2UnOidRJywgJ2xldHRlcnMnOi9bXFx1MDA1MVxcdTI0QzZcXHVGRjMxXFx1QTc1NlxcdUE3NThcXHUwMjRBXS9nIH0sXG5cdHsgJ2Jhc2UnOidSJywgJ2xldHRlcnMnOi9bXFx1MDA1MlxcdTI0QzdcXHVGRjMyXFx1MDE1NFxcdTFFNThcXHUwMTU4XFx1MDIxMFxcdTAyMTJcXHUxRTVBXFx1MUU1Q1xcdTAxNTZcXHUxRTVFXFx1MDI0Q1xcdTJDNjRcXHVBNzVBXFx1QTdBNlxcdUE3ODJdL2cgfSxcblx0eyAnYmFzZSc6J1MnLCAnbGV0dGVycyc6L1tcXHUwMDUzXFx1MjRDOFxcdUZGMzNcXHUxRTlFXFx1MDE1QVxcdTFFNjRcXHUwMTVDXFx1MUU2MFxcdTAxNjBcXHUxRTY2XFx1MUU2MlxcdTFFNjhcXHUwMjE4XFx1MDE1RVxcdTJDN0VcXHVBN0E4XFx1QTc4NF0vZyB9LFxuXHR7ICdiYXNlJzonVCcsICdsZXR0ZXJzJzovW1xcdTAwNTRcXHUyNEM5XFx1RkYzNFxcdTFFNkFcXHUwMTY0XFx1MUU2Q1xcdTAyMUFcXHUwMTYyXFx1MUU3MFxcdTFFNkVcXHUwMTY2XFx1MDFBQ1xcdTAxQUVcXHUwMjNFXFx1QTc4Nl0vZyB9LFxuXHR7ICdiYXNlJzonVFonLCdsZXR0ZXJzJzovW1xcdUE3MjhdL2cgfSxcblx0eyAnYmFzZSc6J1UnLCAnbGV0dGVycyc6L1tcXHUwMDU1XFx1MjRDQVxcdUZGMzVcXHUwMEQ5XFx1MDBEQVxcdTAwREJcXHUwMTY4XFx1MUU3OFxcdTAxNkFcXHUxRTdBXFx1MDE2Q1xcdTAwRENcXHUwMURCXFx1MDFEN1xcdTAxRDVcXHUwMUQ5XFx1MUVFNlxcdTAxNkVcXHUwMTcwXFx1MDFEM1xcdTAyMTRcXHUwMjE2XFx1MDFBRlxcdTFFRUFcXHUxRUU4XFx1MUVFRVxcdTFFRUNcXHUxRUYwXFx1MUVFNFxcdTFFNzJcXHUwMTcyXFx1MUU3NlxcdTFFNzRcXHUwMjQ0XS9nIH0sXG5cdHsgJ2Jhc2UnOidWJywgJ2xldHRlcnMnOi9bXFx1MDA1NlxcdTI0Q0JcXHVGRjM2XFx1MUU3Q1xcdTFFN0VcXHUwMUIyXFx1QTc1RVxcdTAyNDVdL2cgfSxcblx0eyAnYmFzZSc6J1ZZJywnbGV0dGVycyc6L1tcXHVBNzYwXS9nIH0sXG5cdHsgJ2Jhc2UnOidXJywgJ2xldHRlcnMnOi9bXFx1MDA1N1xcdTI0Q0NcXHVGRjM3XFx1MUU4MFxcdTFFODJcXHUwMTc0XFx1MUU4NlxcdTFFODRcXHUxRTg4XFx1MkM3Ml0vZyB9LFxuXHR7ICdiYXNlJzonWCcsICdsZXR0ZXJzJzovW1xcdTAwNThcXHUyNENEXFx1RkYzOFxcdTFFOEFcXHUxRThDXS9nIH0sXG5cdHsgJ2Jhc2UnOidZJywgJ2xldHRlcnMnOi9bXFx1MDA1OVxcdTI0Q0VcXHVGRjM5XFx1MUVGMlxcdTAwRERcXHUwMTc2XFx1MUVGOFxcdTAyMzJcXHUxRThFXFx1MDE3OFxcdTFFRjZcXHUxRUY0XFx1MDFCM1xcdTAyNEVcXHUxRUZFXS9nIH0sXG5cdHsgJ2Jhc2UnOidaJywgJ2xldHRlcnMnOi9bXFx1MDA1QVxcdTI0Q0ZcXHVGRjNBXFx1MDE3OVxcdTFFOTBcXHUwMTdCXFx1MDE3RFxcdTFFOTJcXHUxRTk0XFx1MDFCNVxcdTAyMjRcXHUyQzdGXFx1MkM2QlxcdUE3NjJdL2cgfSxcblx0eyAnYmFzZSc6J2EnLCAnbGV0dGVycyc6L1tcXHUwMDYxXFx1MjREMFxcdUZGNDFcXHUxRTlBXFx1MDBFMFxcdTAwRTFcXHUwMEUyXFx1MUVBN1xcdTFFQTVcXHUxRUFCXFx1MUVBOVxcdTAwRTNcXHUwMTAxXFx1MDEwM1xcdTFFQjFcXHUxRUFGXFx1MUVCNVxcdTFFQjNcXHUwMjI3XFx1MDFFMVxcdTAwRTRcXHUwMURGXFx1MUVBM1xcdTAwRTVcXHUwMUZCXFx1MDFDRVxcdTAyMDFcXHUwMjAzXFx1MUVBMVxcdTFFQURcXHUxRUI3XFx1MUUwMVxcdTAxMDVcXHUyQzY1XFx1MDI1MF0vZyB9LFxuXHR7ICdiYXNlJzonYWEnLCdsZXR0ZXJzJzovW1xcdUE3MzNdL2cgfSxcblx0eyAnYmFzZSc6J2FlJywnbGV0dGVycyc6L1tcXHUwMEU2XFx1MDFGRFxcdTAxRTNdL2cgfSxcblx0eyAnYmFzZSc6J2FvJywnbGV0dGVycyc6L1tcXHVBNzM1XS9nIH0sXG5cdHsgJ2Jhc2UnOidhdScsJ2xldHRlcnMnOi9bXFx1QTczN10vZyB9LFxuXHR7ICdiYXNlJzonYXYnLCdsZXR0ZXJzJzovW1xcdUE3MzlcXHVBNzNCXS9nIH0sXG5cdHsgJ2Jhc2UnOidheScsJ2xldHRlcnMnOi9bXFx1QTczRF0vZyB9LFxuXHR7ICdiYXNlJzonYicsICdsZXR0ZXJzJzovW1xcdTAwNjJcXHUyNEQxXFx1RkY0MlxcdTFFMDNcXHUxRTA1XFx1MUUwN1xcdTAxODBcXHUwMTgzXFx1MDI1M10vZyB9LFxuXHR7ICdiYXNlJzonYycsICdsZXR0ZXJzJzovW1xcdTAwNjNcXHUyNEQyXFx1RkY0M1xcdTAxMDdcXHUwMTA5XFx1MDEwQlxcdTAxMERcXHUwMEU3XFx1MUUwOVxcdTAxODhcXHUwMjNDXFx1QTczRlxcdTIxODRdL2cgfSxcblx0eyAnYmFzZSc6J2QnLCAnbGV0dGVycyc6L1tcXHUwMDY0XFx1MjREM1xcdUZGNDRcXHUxRTBCXFx1MDEwRlxcdTFFMERcXHUxRTExXFx1MUUxM1xcdTFFMEZcXHUwMTExXFx1MDE4Q1xcdTAyNTZcXHUwMjU3XFx1QTc3QV0vZyB9LFxuXHR7ICdiYXNlJzonZHonLCdsZXR0ZXJzJzovW1xcdTAxRjNcXHUwMUM2XS9nIH0sXG5cdHsgJ2Jhc2UnOidlJywgJ2xldHRlcnMnOi9bXFx1MDA2NVxcdTI0RDRcXHVGRjQ1XFx1MDBFOFxcdTAwRTlcXHUwMEVBXFx1MUVDMVxcdTFFQkZcXHUxRUM1XFx1MUVDM1xcdTFFQkRcXHUwMTEzXFx1MUUxNVxcdTFFMTdcXHUwMTE1XFx1MDExN1xcdTAwRUJcXHUxRUJCXFx1MDExQlxcdTAyMDVcXHUwMjA3XFx1MUVCOVxcdTFFQzdcXHUwMjI5XFx1MUUxRFxcdTAxMTlcXHUxRTE5XFx1MUUxQlxcdTAyNDdcXHUwMjVCXFx1MDFERF0vZyB9LFxuXHR7ICdiYXNlJzonZicsICdsZXR0ZXJzJzovW1xcdTAwNjZcXHUyNEQ1XFx1RkY0NlxcdTFFMUZcXHUwMTkyXFx1QTc3Q10vZyB9LFxuXHR7ICdiYXNlJzonZycsICdsZXR0ZXJzJzovW1xcdTAwNjdcXHUyNEQ2XFx1RkY0N1xcdTAxRjVcXHUwMTFEXFx1MUUyMVxcdTAxMUZcXHUwMTIxXFx1MDFFN1xcdTAxMjNcXHUwMUU1XFx1MDI2MFxcdUE3QTFcXHUxRDc5XFx1QTc3Rl0vZyB9LFxuXHR7ICdiYXNlJzonaCcsICdsZXR0ZXJzJzovW1xcdTAwNjhcXHUyNEQ3XFx1RkY0OFxcdTAxMjVcXHUxRTIzXFx1MUUyN1xcdTAyMUZcXHUxRTI1XFx1MUUyOVxcdTFFMkJcXHUxRTk2XFx1MDEyN1xcdTJDNjhcXHUyQzc2XFx1MDI2NV0vZyB9LFxuXHR7ICdiYXNlJzonaHYnLCdsZXR0ZXJzJzovW1xcdTAxOTVdL2cgfSxcblx0eyAnYmFzZSc6J2knLCAnbGV0dGVycyc6L1tcXHUwMDY5XFx1MjREOFxcdUZGNDlcXHUwMEVDXFx1MDBFRFxcdTAwRUVcXHUwMTI5XFx1MDEyQlxcdTAxMkRcXHUwMEVGXFx1MUUyRlxcdTFFQzlcXHUwMUQwXFx1MDIwOVxcdTAyMEJcXHUxRUNCXFx1MDEyRlxcdTFFMkRcXHUwMjY4XFx1MDEzMV0vZyB9LFxuXHR7ICdiYXNlJzonaicsICdsZXR0ZXJzJzovW1xcdTAwNkFcXHUyNEQ5XFx1RkY0QVxcdTAxMzVcXHUwMUYwXFx1MDI0OV0vZyB9LFxuXHR7ICdiYXNlJzonaycsICdsZXR0ZXJzJzovW1xcdTAwNkJcXHUyNERBXFx1RkY0QlxcdTFFMzFcXHUwMUU5XFx1MUUzM1xcdTAxMzdcXHUxRTM1XFx1MDE5OVxcdTJDNkFcXHVBNzQxXFx1QTc0M1xcdUE3NDVcXHVBN0EzXS9nIH0sXG5cdHsgJ2Jhc2UnOidsJywgJ2xldHRlcnMnOi9bXFx1MDA2Q1xcdTI0REJcXHVGRjRDXFx1MDE0MFxcdTAxM0FcXHUwMTNFXFx1MUUzN1xcdTFFMzlcXHUwMTNDXFx1MUUzRFxcdTFFM0JcXHUwMTdGXFx1MDE0MlxcdTAxOUFcXHUwMjZCXFx1MkM2MVxcdUE3NDlcXHVBNzgxXFx1QTc0N10vZyB9LFxuXHR7ICdiYXNlJzonbGonLCdsZXR0ZXJzJzovW1xcdTAxQzldL2cgfSxcblx0eyAnYmFzZSc6J20nLCAnbGV0dGVycyc6L1tcXHUwMDZEXFx1MjREQ1xcdUZGNERcXHUxRTNGXFx1MUU0MVxcdTFFNDNcXHUwMjcxXFx1MDI2Rl0vZyB9LFxuXHR7ICdiYXNlJzonbicsICdsZXR0ZXJzJzovW1xcdTAwNkVcXHUyNEREXFx1RkY0RVxcdTAxRjlcXHUwMTQ0XFx1MDBGMVxcdTFFNDVcXHUwMTQ4XFx1MUU0N1xcdTAxNDZcXHUxRTRCXFx1MUU0OVxcdTAxOUVcXHUwMjcyXFx1MDE0OVxcdUE3OTFcXHVBN0E1XS9nIH0sXG5cdHsgJ2Jhc2UnOiduaicsJ2xldHRlcnMnOi9bXFx1MDFDQ10vZyB9LFxuXHR7ICdiYXNlJzonbycsICdsZXR0ZXJzJzovW1xcdTAwNkZcXHUyNERFXFx1RkY0RlxcdTAwRjJcXHUwMEYzXFx1MDBGNFxcdTFFRDNcXHUxRUQxXFx1MUVEN1xcdTFFRDVcXHUwMEY1XFx1MUU0RFxcdTAyMkRcXHUxRTRGXFx1MDE0RFxcdTFFNTFcXHUxRTUzXFx1MDE0RlxcdTAyMkZcXHUwMjMxXFx1MDBGNlxcdTAyMkJcXHUxRUNGXFx1MDE1MVxcdTAxRDJcXHUwMjBEXFx1MDIwRlxcdTAxQTFcXHUxRUREXFx1MUVEQlxcdTFFRTFcXHUxRURGXFx1MUVFM1xcdTFFQ0RcXHUxRUQ5XFx1MDFFQlxcdTAxRURcXHUwMEY4XFx1MDFGRlxcdTAyNTRcXHVBNzRCXFx1QTc0RFxcdTAyNzVdL2cgfSxcblx0eyAnYmFzZSc6J29pJywnbGV0dGVycyc6L1tcXHUwMUEzXS9nIH0sXG5cdHsgJ2Jhc2UnOidvdScsJ2xldHRlcnMnOi9bXFx1MDIyM10vZyB9LFxuXHR7ICdiYXNlJzonb28nLCdsZXR0ZXJzJzovW1xcdUE3NEZdL2cgfSxcblx0eyAnYmFzZSc6J3AnLCAnbGV0dGVycyc6L1tcXHUwMDcwXFx1MjRERlxcdUZGNTBcXHUxRTU1XFx1MUU1N1xcdTAxQTVcXHUxRDdEXFx1QTc1MVxcdUE3NTNcXHVBNzU1XS9nIH0sXG5cdHsgJ2Jhc2UnOidxJywgJ2xldHRlcnMnOi9bXFx1MDA3MVxcdTI0RTBcXHVGRjUxXFx1MDI0QlxcdUE3NTdcXHVBNzU5XS9nIH0sXG5cdHsgJ2Jhc2UnOidyJywgJ2xldHRlcnMnOi9bXFx1MDA3MlxcdTI0RTFcXHVGRjUyXFx1MDE1NVxcdTFFNTlcXHUwMTU5XFx1MDIxMVxcdTAyMTNcXHUxRTVCXFx1MUU1RFxcdTAxNTdcXHUxRTVGXFx1MDI0RFxcdTAyN0RcXHVBNzVCXFx1QTdBN1xcdUE3ODNdL2cgfSxcblx0eyAnYmFzZSc6J3MnLCAnbGV0dGVycyc6L1tcXHUwMDczXFx1MjRFMlxcdUZGNTNcXHUwMERGXFx1MDE1QlxcdTFFNjVcXHUwMTVEXFx1MUU2MVxcdTAxNjFcXHUxRTY3XFx1MUU2M1xcdTFFNjlcXHUwMjE5XFx1MDE1RlxcdTAyM0ZcXHVBN0E5XFx1QTc4NVxcdTFFOUJdL2cgfSxcblx0eyAnYmFzZSc6J3QnLCAnbGV0dGVycyc6L1tcXHUwMDc0XFx1MjRFM1xcdUZGNTRcXHUxRTZCXFx1MUU5N1xcdTAxNjVcXHUxRTZEXFx1MDIxQlxcdTAxNjNcXHUxRTcxXFx1MUU2RlxcdTAxNjdcXHUwMUFEXFx1MDI4OFxcdTJDNjZcXHVBNzg3XS9nIH0sXG5cdHsgJ2Jhc2UnOid0eicsJ2xldHRlcnMnOi9bXFx1QTcyOV0vZyB9LFxuXHR7ICdiYXNlJzondScsICdsZXR0ZXJzJzovW1xcdTAwNzVcXHUyNEU0XFx1RkY1NVxcdTAwRjlcXHUwMEZBXFx1MDBGQlxcdTAxNjlcXHUxRTc5XFx1MDE2QlxcdTFFN0JcXHUwMTZEXFx1MDBGQ1xcdTAxRENcXHUwMUQ4XFx1MDFENlxcdTAxREFcXHUxRUU3XFx1MDE2RlxcdTAxNzFcXHUwMUQ0XFx1MDIxNVxcdTAyMTdcXHUwMUIwXFx1MUVFQlxcdTFFRTlcXHUxRUVGXFx1MUVFRFxcdTFFRjFcXHUxRUU1XFx1MUU3M1xcdTAxNzNcXHUxRTc3XFx1MUU3NVxcdTAyODldL2cgfSxcblx0eyAnYmFzZSc6J3YnLCAnbGV0dGVycyc6L1tcXHUwMDc2XFx1MjRFNVxcdUZGNTZcXHUxRTdEXFx1MUU3RlxcdTAyOEJcXHVBNzVGXFx1MDI4Q10vZyB9LFxuXHR7ICdiYXNlJzondnknLCdsZXR0ZXJzJzovW1xcdUE3NjFdL2cgfSxcblx0eyAnYmFzZSc6J3cnLCAnbGV0dGVycyc6L1tcXHUwMDc3XFx1MjRFNlxcdUZGNTdcXHUxRTgxXFx1MUU4M1xcdTAxNzVcXHUxRTg3XFx1MUU4NVxcdTFFOThcXHUxRTg5XFx1MkM3M10vZyB9LFxuXHR7ICdiYXNlJzoneCcsICdsZXR0ZXJzJzovW1xcdTAwNzhcXHUyNEU3XFx1RkY1OFxcdTFFOEJcXHUxRThEXS9nIH0sXG5cdHsgJ2Jhc2UnOid5JywgJ2xldHRlcnMnOi9bXFx1MDA3OVxcdTI0RThcXHVGRjU5XFx1MUVGM1xcdTAwRkRcXHUwMTc3XFx1MUVGOVxcdTAyMzNcXHUxRThGXFx1MDBGRlxcdTFFRjdcXHUxRTk5XFx1MUVGNVxcdTAxQjRcXHUwMjRGXFx1MUVGRl0vZyB9LFxuXHR7ICdiYXNlJzoneicsICdsZXR0ZXJzJzovW1xcdTAwN0FcXHUyNEU5XFx1RkY1QVxcdTAxN0FcXHUxRTkxXFx1MDE3Q1xcdTAxN0VcXHUxRTkzXFx1MUU5NVxcdTAxQjZcXHUwMjI1XFx1MDI0MFxcdTJDNkNcXHVBNzYzXS9nIH0sXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmlwRGlhY3JpdGljcyAoc3RyKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbWFwLmxlbmd0aDsgaSsrKSB7XG5cdFx0c3RyID0gc3RyLnJlcGxhY2UobWFwW2ldLmxldHRlcnMsIG1hcFtpXS5iYXNlKTtcblx0fVxuXHRyZXR1cm4gc3RyO1xufTtcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vcmVhY3Qtc2VsZWN0XG4qL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ2NyZWF0ZS1yZWFjdC1jbGFzcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgQXV0b3NpemVJbnB1dCBmcm9tICdyZWFjdC1pbnB1dC1hdXRvc2l6ZSc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGRlZmF1bHRBcnJvd1JlbmRlcmVyIGZyb20gJy4vdXRpbHMvZGVmYXVsdEFycm93UmVuZGVyZXInO1xuaW1wb3J0IGRlZmF1bHRGaWx0ZXJPcHRpb25zIGZyb20gJy4vdXRpbHMvZGVmYXVsdEZpbHRlck9wdGlvbnMnO1xuaW1wb3J0IGRlZmF1bHRNZW51UmVuZGVyZXIgZnJvbSAnLi91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyJztcbmltcG9ydCBkZWZhdWx0Q2xlYXJSZW5kZXJlciBmcm9tICcuL3V0aWxzL2RlZmF1bHRDbGVhclJlbmRlcmVyJztcblxuaW1wb3J0IEFzeW5jIGZyb20gJy4vQXN5bmMnO1xuaW1wb3J0IEFzeW5jQ3JlYXRhYmxlIGZyb20gJy4vQXN5bmNDcmVhdGFibGUnO1xuaW1wb3J0IENyZWF0YWJsZSBmcm9tICcuL0NyZWF0YWJsZSc7XG5pbXBvcnQgT3B0aW9uIGZyb20gJy4vT3B0aW9uJztcbmltcG9ydCBWYWx1ZSBmcm9tICcuL1ZhbHVlJztcblxuZnVuY3Rpb24gc3RyaW5naWZ5VmFsdWUgKHZhbHVlKSB7XG5cdGNvbnN0IHZhbHVlVHlwZSA9IHR5cGVvZiB2YWx1ZTtcblx0aWYgKHZhbHVlVHlwZSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0gZWxzZSBpZiAodmFsdWVUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cdH0gZWxzZSBpZiAodmFsdWVUeXBlID09PSAnbnVtYmVyJyB8fCB2YWx1ZVR5cGUgPT09ICdib29sZWFuJykge1xuXHRcdHJldHVybiBTdHJpbmcodmFsdWUpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAnJztcblx0fVxufVxuXG5jb25zdCBzdHJpbmdPck5vZGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtcblx0UHJvcFR5cGVzLnN0cmluZyxcblx0UHJvcFR5cGVzLm5vZGVcbl0pO1xuXG5sZXQgaW5zdGFuY2VJZCA9IDE7XG5cbmNvbnN0IFNlbGVjdCA9IGNyZWF0ZUNsYXNzKHtcblxuXHRkaXNwbGF5TmFtZTogJ1NlbGVjdCcsXG5cblx0cHJvcFR5cGVzOiB7XG5cdFx0YWRkTGFiZWxUZXh0OiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAvLyBwbGFjZWhvbGRlciBkaXNwbGF5ZWQgd2hlbiB5b3Ugd2FudCB0byBhZGQgYSBsYWJlbCBvbiBhIG11bHRpLXZhbHVlIGlucHV0XG5cdFx0J2FyaWEtZGVzY3JpYmVkYnknOiBQcm9wVHlwZXMuc3RyaW5nLFx0Ly8gSFRNTCBJRChzKSBvZiBlbGVtZW50KHMpIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gZGVzY3JpYmUgdGhpcyBpbnB1dCAoZm9yIGFzc2lzdGl2ZSB0ZWNoKVxuXHRcdCdhcmlhLWxhYmVsJzogUHJvcFR5cGVzLnN0cmluZywgICAgICAgLy8gQXJpYSBsYWJlbCAoZm9yIGFzc2lzdGl2ZSB0ZWNoKVxuXHRcdCdhcmlhLWxhYmVsbGVkYnknOiBQcm9wVHlwZXMuc3RyaW5nLFx0Ly8gSFRNTCBJRCBvZiBhbiBlbGVtZW50IHRoYXQgc2hvdWxkIGJlIHVzZWQgYXMgdGhlIGxhYmVsIChmb3IgYXNzaXN0aXZlIHRlY2gpXG5cdFx0YXJyb3dSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXHRcdFx0XHQvLyBDcmVhdGUgZHJvcC1kb3duIGNhcmV0IGVsZW1lbnRcblx0XHRhdXRvQmx1cjogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgYmx1ciB0aGUgY29tcG9uZW50IHdoZW4gYW4gb3B0aW9uIGlzIHNlbGVjdGVkXG5cdFx0YXV0b2ZvY3VzOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAvLyBhdXRvZm9jdXMgdGhlIGNvbXBvbmVudCBvbiBtb3VudFxuXHRcdGF1dG9zaXplOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgLy8gd2hldGhlciB0byBlbmFibGUgYXV0b3NpemluZyBvciBub3Rcblx0XHRiYWNrc3BhY2VSZW1vdmVzOiBQcm9wVHlwZXMuYm9vbCwgICAgIC8vIHdoZXRoZXIgYmFja3NwYWNlIHJlbW92ZXMgYW4gaXRlbSBpZiB0aGVyZSBpcyBubyB0ZXh0IGlucHV0XG5cdFx0YmFja3NwYWNlVG9SZW1vdmVNZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLCAgLy8gTWVzc2FnZSB0byB1c2UgZm9yIHNjcmVlbnJlYWRlcnMgdG8gcHJlc3MgYmFja3NwYWNlIHRvIHJlbW92ZSB0aGUgY3VycmVudCBpdGVtIC0ge2xhYmVsfSBpcyByZXBsYWNlZCB3aXRoIHRoZSBpdGVtIGxhYmVsXG5cdFx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAvLyBjbGFzc05hbWUgZm9yIHRoZSBvdXRlciBlbGVtZW50XG5cdFx0Y2xlYXJBbGxUZXh0OiBzdHJpbmdPck5vZGUsICAgICAgICAgICAgICAgICAvLyB0aXRsZSBmb3IgdGhlIFwiY2xlYXJcIiBjb250cm9sIHdoZW4gbXVsdGk6IHRydWVcblx0XHRjbGVhclJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYywgICAgICAgIC8vIGNyZWF0ZSBjbGVhcmFibGUgeCBlbGVtZW50XG5cdFx0Y2xlYXJWYWx1ZVRleHQ6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAvLyB0aXRsZSBmb3IgdGhlIFwiY2xlYXJcIiBjb250cm9sXG5cdFx0Y2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAvLyBzaG91bGQgaXQgYmUgcG9zc2libGUgdG8gcmVzZXQgdmFsdWVcblx0XHRkZWxldGFibGU6IFByb3BUeXBlcy5ib29sLFx0XHRcdC8vIHNob3dzIHggYnV0dG9uIHRvIHJlbW92ZSBvcHRpb25zIGZyb20gbWVudVxuXHRcdGRlbGV0ZVJlbW92ZXM6IFByb3BUeXBlcy5ib29sLCAgICAgICAgLy8gd2hldGhlciBiYWNrc3BhY2UgcmVtb3ZlcyBhbiBpdGVtIGlmIHRoZXJlIGlzIG5vIHRleHQgaW5wdXRcblx0XHRkZWxldGVPcHRpb246IFByb3BUeXBlcy5mdW5jLFx0XHRcdFx0XHQvLyBoYW5kbGVzIHRoZSBtZW11IG9wdGlvbiBkZWxldGUuIFRha2VzIHRoZSBjbGlja2VkIG9wdGlvbiBvYmogYXMgYXJndW1lbnRcblx0XHRkZWxpbWl0ZXI6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgIC8vIGRlbGltaXRlciB0byB1c2UgdG8gam9pbiBtdWx0aXBsZSB2YWx1ZXMgZm9yIHRoZSBoaWRkZW4gZmllbGQgdmFsdWVcblx0XHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIHdoZXRoZXIgdGhlIFNlbGVjdCBpcyBkaXNhYmxlZCBvciBub3Rcblx0XHRlc2NhcGVDbGVhcnNWYWx1ZTogUHJvcFR5cGVzLmJvb2wsICAgIC8vIHdoZXRoZXIgZXNjYXBlIGNsZWFycyB0aGUgdmFsdWUgd2hlbiB0aGUgbWVudSBpcyBjbG9zZWRcblx0XHRmaWx0ZXJPcHRpb246IFByb3BUeXBlcy5mdW5jLCAgICAgICAgIC8vIG1ldGhvZCB0byBmaWx0ZXIgYSBzaW5nbGUgb3B0aW9uIChvcHRpb24sIGZpbHRlclN0cmluZylcblx0XHRmaWx0ZXJPcHRpb25zOiBQcm9wVHlwZXMuYW55LCAgICAgICAgIC8vIGJvb2xlYW4gdG8gZW5hYmxlIGRlZmF1bHQgZmlsdGVyaW5nIG9yIGZ1bmN0aW9uIHRvIGZpbHRlciB0aGUgb3B0aW9ucyBhcnJheSAoW29wdGlvbnNdLCBmaWx0ZXJTdHJpbmcsIFt2YWx1ZXNdKVxuXHRcdGlnbm9yZUFjY2VudHM6IFByb3BUeXBlcy5ib29sLCAgICAgICAgLy8gd2hldGhlciB0byBzdHJpcCBkaWFjcml0aWNzIHdoZW4gZmlsdGVyaW5nXG5cdFx0aWdub3JlQ2FzZTogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAvLyB3aGV0aGVyIHRvIHBlcmZvcm0gY2FzZS1pbnNlbnNpdGl2ZSBmaWx0ZXJpbmdcblx0XHRpbnB1dFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LCAgICAgICAgIC8vIGN1c3RvbSBhdHRyaWJ1dGVzIGZvciB0aGUgSW5wdXRcblx0XHRpbnB1dFJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYywgICAgICAgIC8vIHJldHVybnMgYSBjdXN0b20gaW5wdXQgY29tcG9uZW50XG5cdFx0aW5zdGFuY2VJZDogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAvLyBzZXQgdGhlIGNvbXBvbmVudHMgaW5zdGFuY2VJZFxuXHRcdGlzTG9hZGluZzogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gd2hldGhlciB0aGUgU2VsZWN0IGlzIGxvYWRpbmcgZXh0ZXJuYWxseSBvciBub3QgKHN1Y2ggYXMgb3B0aW9ucyBiZWluZyBsb2FkZWQpXG5cdFx0aXNSZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAvLyBjdXN0b20gc3R5bGluZyBpbiB0aGUgbGFiZWwgaWYgdGhlcmUgaXMgbm90IGEgdmFsdWUgYXQgb25CbHVyXG5cdFx0am9pblZhbHVlczogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAvLyBqb2lucyBtdWx0aXBsZSB2YWx1ZXMgaW50byBhIHNpbmdsZSBmb3JtIGZpZWxkIHdpdGggdGhlIGRlbGltaXRlciAobGVnYWN5IG1vZGUpXG5cdFx0bGFiZWxLZXk6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBwYXRoIG9mIHRoZSBsYWJlbCB2YWx1ZSBpbiBvcHRpb24gb2JqZWN0c1xuXHRcdG1hdGNoUG9zOiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgLy8gKGFueXxzdGFydCkgbWF0Y2ggdGhlIHN0YXJ0IG9yIGVudGlyZSBzdHJpbmcgd2hlbiBmaWx0ZXJpbmdcblx0XHRtYXRjaFByb3A6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgIC8vIChhbnl8bGFiZWx8dmFsdWUpIHdoaWNoIG9wdGlvbiBwcm9wZXJ0eSB0byBmaWx0ZXIgb25cblx0XHRtZW51QnVmZmVyOiBQcm9wVHlwZXMubnVtYmVyLCAgICAgICAgIC8vIG9wdGlvbmFsIGJ1ZmZlciAoaW4gcHgpIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQgYW5kIHRoZSBib3R0b20gb2YgdGhlIG1lbnVcblx0XHRtZW51Q29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBtZW51IGNvbnRhaW5lclxuXHRcdG1lbnVSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgLy8gcmVuZGVycyBhIGN1c3RvbSBtZW51IHdpdGggb3B0aW9uc1xuXHRcdG1lbnVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCwgICAgICAgICAgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIG1lbnVcblx0XHRtdWx0aTogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAgIC8vIG11bHRpLXZhbHVlIGlucHV0XG5cdFx0bmFtZTogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZXMgYSBoaWRkZW4gPGlucHV0IC8+IHRhZyB3aXRoIHRoaXMgZmllbGQgbmFtZSBmb3IgaHRtbCBmb3Jtc1xuXHRcdG5vUmVzdWx0c1RleHQ6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAgLy8gcGxhY2Vob2xkZXIgZGlzcGxheWVkIHdoZW4gdGhlcmUgYXJlIG5vIG1hdGNoaW5nIHNlYXJjaCByZXN1bHRzXG5cdFx0b25CbHVyOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAvLyBvbkJsdXIgaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuXHRcdG9uQmx1clJlc2V0c0lucHV0OiBQcm9wVHlwZXMuYm9vbCwgICAgLy8gd2hldGhlciBpbnB1dCBpcyBjbGVhcmVkIG9uIGJsdXJcblx0XHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgIC8vIG9uQ2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge31cblx0XHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgIC8vIGZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkXG5cdFx0b25DbG9zZVJlc2V0c0lucHV0OiBQcm9wVHlwZXMuYm9vbCxcdFx0Ly8gd2hldGhlciBpbnB1dCBpcyBjbGVhcmVkIHdoZW4gbWVudSBpcyBjbG9zZWQgdGhyb3VnaCB0aGUgYXJyb3dcblx0XHRvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgIC8vIG9uRm9jdXMgaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuXHRcdG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgLy8gb25JbnB1dENoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAoaW5wdXRWYWx1ZSkge31cblx0XHRvbklucHV0S2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsICAgICAgIC8vIGlucHV0IGtleURvd24gaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuXHRcdG9uTWVudVNjcm9sbFRvQm90dG9tOiBQcm9wVHlwZXMuZnVuYywgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBzY3JvbGxlZCB0byB0aGUgYm90dG9tOyBjYW4gYmUgdXNlZCB0byBwYWdpbmF0ZSBvcHRpb25zXG5cdFx0b25PcGVuOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAvLyBmaXJlcyB3aGVuIHRoZSBtZW51IGlzIG9wZW5lZFxuXHRcdG9uVmFsdWVDbGljazogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgLy8gb25DbGljayBoYW5kbGVyIGZvciB2YWx1ZSBsYWJlbHM6IGZ1bmN0aW9uICh2YWx1ZSwgZXZlbnQpIHt9XG5cdFx0b3BlbkFmdGVyRm9jdXM6IFByb3BUeXBlcy5ib29sLCAgICAgICAvLyBib29sZWFuIHRvIGVuYWJsZSBvcGVuaW5nIGRyb3Bkb3duIHdoZW4gZm9jdXNlZFxuXHRcdG9wZW5PbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgLy8gYWx3YXlzIG9wZW4gb3B0aW9ucyBtZW51IG9uIGZvY3VzXG5cdFx0b3B0aW9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAgICAvLyBhZGRpdGlvbmFsIGNsYXNzKGVzKSB0byBhcHBseSB0byB0aGUgPE9wdGlvbiAvPiBlbGVtZW50c1xuXHRcdG9wdGlvbkNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsICAgICAgLy8gb3B0aW9uIGNvbXBvbmVudCB0byByZW5kZXIgaW4gZHJvcGRvd25cblx0XHRvcHRpb25SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsICAgICAgIC8vIG9wdGlvblJlbmRlcmVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxuXHRcdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheSwgICAgICAgICAgICAgLy8gYXJyYXkgb2Ygb3B0aW9uc1xuXHRcdHBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLCAgICAgICAgICAgLy8gbnVtYmVyIG9mIGVudHJpZXMgdG8gcGFnZSB3aGVuIHVzaW5nIHBhZ2UgdXAvZG93biBrZXlzXG5cdFx0cGxhY2Vob2xkZXI6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAgICAvLyBmaWVsZCBwbGFjZWhvbGRlciwgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyB2YWx1ZVxuXHRcdHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgLy8gYXBwbGllcyBIVE1MNSByZXF1aXJlZCBhdHRyaWJ1dGUgd2hlbiBuZWVkZWRcblx0XHRyZXNldFZhbHVlOiBQcm9wVHlwZXMuYW55LCAgICAgICAgICAgIC8vIHZhbHVlIHRvIHVzZSB3aGVuIHlvdSBjbGVhciB0aGUgY29udHJvbFxuXHRcdHNjcm9sbE1lbnVJbnRvVmlldzogUHJvcFR5cGVzLmJvb2wsICAgLy8gYm9vbGVhbiB0byBlbmFibGUgdGhlIHZpZXdwb3J0IHRvIHNoaWZ0IHNvIHRoYXQgdGhlIGZ1bGwgbWVudSBmdWxseSB2aXNpYmxlIHdoZW4gZW5nYWdlZFxuXHRcdHNlYXJjaGFibGU6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgLy8gd2hldGhlciB0byBlbmFibGUgc2VhcmNoaW5nIGZlYXR1cmUgb3Igbm90XG5cdFx0c2VsZWN0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHRcdFx0XHQvLyBUaGUgZmllbGQgdGl0bGVcblx0XHRzaW1wbGVWYWx1ZTogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgIC8vIHBhc3MgdGhlIHZhbHVlIHRvIG9uQ2hhbmdlIGFzIGEgc2ltcGxlIHZhbHVlIChsZWdhY3kgcHJlIDEuMCBtb2RlKSwgZGVmYXVsdHMgdG8gZmFsc2Vcblx0XHRzdHlsZTogUHJvcFR5cGVzLm9iamVjdCwgICAgICAgICAgICAgIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBjb250cm9sXG5cdFx0dGFiSW5kZXg6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBvcHRpb25hbCB0YWIgaW5kZXggb2YgdGhlIGNvbnRyb2xcblx0XHR0YWJTZWxlY3RzVmFsdWU6IFByb3BUeXBlcy5ib29sLCAgICAgIC8vIHdoZXRoZXIgdG8gdHJlYXQgdGFiYmluZyBvdXQgd2hpbGUgZm9jdXNlZCB0byBiZSB2YWx1ZSBzZWxlY3Rpb25cblx0XHR0aGVtZTogUHJvcFR5cGVzLnN0cmluZyxcdFx0XHRcdFx0XHRcdC8vIG1hZGUgZm9yIGRhcmsgdGhlbWVzLiBJZiBzZXQgdG8gdHJ1ZSB0aGUgY29tcG9uZW50IHN0eWxlIHdpbGwgc3dpdGNoIGZvciBkYXJrIGJhY2tncm91bmRzXG5cdFx0dmFsdWU6IFByb3BUeXBlcy5hbnksICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIGZpZWxkIHZhbHVlXG5cdFx0dmFsdWVDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLCAgICAgICAvLyB2YWx1ZSBjb21wb25lbnQgdG8gcmVuZGVyXG5cdFx0dmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBwYXRoIG9mIHRoZSBsYWJlbCB2YWx1ZSBpbiBvcHRpb24gb2JqZWN0c1xuXHRcdHZhbHVlUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgLy8gdmFsdWVSZW5kZXJlcjogZnVuY3Rpb24gKG9wdGlvbikge31cblx0XHR3cmFwcGVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsICAgICAgIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBjb21wb25lbnQgd3JhcHBlclxuXHR9LFxuXG5cdHN0YXRpY3M6IHsgQXN5bmMsIEFzeW5jQ3JlYXRhYmxlLCBDcmVhdGFibGUgfSxcblxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRhZGRMYWJlbFRleHQ6ICdBZGQgXCJ7bGFiZWx9XCI/Jyxcblx0XHRcdGFycm93UmVuZGVyZXI6IGRlZmF1bHRBcnJvd1JlbmRlcmVyLFxuXHRcdFx0YXV0b3NpemU6IHRydWUsXG5cdFx0XHRiYWNrc3BhY2VSZW1vdmVzOiB0cnVlLFxuXHRcdFx0YmFja3NwYWNlVG9SZW1vdmVNZXNzYWdlOiAnUHJlc3MgYmFja3NwYWNlIHRvIHJlbW92ZSB7bGFiZWx9Jyxcblx0XHRcdGNsZWFyYWJsZTogdHJ1ZSxcblx0XHRcdGNsZWFyQWxsVGV4dDogJ0NsZWFyIGFsbCcsXG5cdFx0XHRjbGVhclJlbmRlcmVyOiBkZWZhdWx0Q2xlYXJSZW5kZXJlcixcblx0XHRcdGNsZWFyVmFsdWVUZXh0OiAnQ2xlYXIgdmFsdWUnLFxuXHRcdFx0ZGVsZXRhYmxlOiB0cnVlLFxuXHRcdFx0ZGVsZXRlUmVtb3ZlczogdHJ1ZSxcblx0XHRcdGRlbGltaXRlcjogJywnLFxuXHRcdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdFx0ZXNjYXBlQ2xlYXJzVmFsdWU6IHRydWUsXG5cdFx0XHRmaWx0ZXJPcHRpb25zOiBkZWZhdWx0RmlsdGVyT3B0aW9ucyxcblx0XHRcdGlnbm9yZUFjY2VudHM6IHRydWUsXG5cdFx0XHRpZ25vcmVDYXNlOiB0cnVlLFxuXHRcdFx0aW5wdXRQcm9wczoge30sXG5cdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0aXNSZXF1aXJlZDogZmFsc2UsXG5cdFx0XHRqb2luVmFsdWVzOiBmYWxzZSxcblx0XHRcdGxhYmVsS2V5OiAnbGFiZWwnLFxuXHRcdFx0bWF0Y2hQb3M6ICdhbnknLFxuXHRcdFx0bWF0Y2hQcm9wOiAnYW55Jyxcblx0XHRcdG1lbnVCdWZmZXI6IDAsXG5cdFx0XHRtZW51UmVuZGVyZXI6IGRlZmF1bHRNZW51UmVuZGVyZXIsXG5cdFx0XHRtdWx0aTogZmFsc2UsXG5cdFx0XHRub1Jlc3VsdHNUZXh0OiAnTm8gcmVzdWx0cyBmb3VuZCcsXG5cdFx0XHRvbkJsdXJSZXNldHNJbnB1dDogdHJ1ZSxcblx0XHRcdG9uQ2xvc2VSZXNldHNJbnB1dDogdHJ1ZSxcblx0XHRcdG9wdGlvbkNvbXBvbmVudDogT3B0aW9uLFxuXHRcdFx0cGFnZVNpemU6IDUsXG5cdFx0XHRwbGFjZWhvbGRlcjogJ1NlbGVjdC4uLicsXG5cdFx0XHRyZXF1aXJlZDogZmFsc2UsXG5cdFx0XHRzY3JvbGxNZW51SW50b1ZpZXc6IHRydWUsXG5cdFx0XHRzZWFyY2hhYmxlOiB0cnVlLFxuXHRcdFx0c2ltcGxlVmFsdWU6IGZhbHNlLFxuXHRcdFx0dGFiU2VsZWN0c1ZhbHVlOiB0cnVlLFxuXHRcdFx0dGhlbWU6ICcnLFxuXHRcdFx0dmFsdWVDb21wb25lbnQ6IFZhbHVlLFxuXHRcdFx0dmFsdWVLZXk6ICd2YWx1ZSdcblx0XHR9O1xuXHR9LFxuXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0bGV0IGZWYWx1ZSA9ICcnO1xuXHRcdGlmICghdGhpcy5wcm9wcy5tdWx0aSAmJiB0aGlzLnByb3BzLnZhbHVlKSB7XG5cdFx0XHRmVmFsdWUgPSB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5wdXRWYWx1ZTogZlZhbHVlLFxuXHRcdFx0aXNGb2N1c2VkOiBmYWxzZSxcblx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0cmVxdWlyZWQ6IGZhbHNlLFxuXHRcdFx0c2hvd1JlcXVpcmVkTXNnOiBmYWxzZVxuXHRcdH07XG5cdH0sXG5cblx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcblx0XHR0aGlzLl9pbnN0YW5jZVByZWZpeCA9ICdtaW5pbWFsLXJlYWN0LXNlbGVjdC0nICsgKHRoaXMucHJvcHMuaW5zdGFuY2VJZCB8fCArK2luc3RhbmNlSWQpICsgJy0nO1xuXHRcdGNvbnN0IHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5yZXF1aXJlZCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdHJlcXVpcmVkOiB0aGlzLmhhbmRsZVJlcXVpcmVkKHZhbHVlQXJyYXlbMF0sIHRoaXMucHJvcHMubXVsdGkpLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5hdXRvZm9jdXMpIHtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9XG5cdH0sXG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG5cdFx0Y29uc3QgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheShuZXh0UHJvcHMudmFsdWUsIG5leHRQcm9wcyk7XG5cblx0XHRpZiAobmV4dFByb3BzLnJlcXVpcmVkKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0cmVxdWlyZWQ6IHRoaXMuaGFuZGxlUmVxdWlyZWQodmFsdWVBcnJheVswXSwgbmV4dFByb3BzLm11bHRpKSxcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnRXaWxsVXBkYXRlIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuXHRcdGlmIChuZXh0U3RhdGUuaXNPcGVuICE9PSB0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0dGhpcy50b2dnbGVUb3VjaE91dHNpZGVFdmVudChuZXh0U3RhdGUuaXNPcGVuKTtcblx0XHRcdGNvbnN0IGhhbmRsZXIgPSBuZXh0U3RhdGUuaXNPcGVuID8gbmV4dFByb3BzLm9uT3BlbiA6IG5leHRQcm9wcy5vbkNsb3NlO1xuXHRcdFx0aGFuZGxlciAmJiBoYW5kbGVyKCk7XG5cdFx0fVxuXHR9LFxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSAocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcblx0XHQvLyBmb2N1cyB0byB0aGUgc2VsZWN0ZWQgb3B0aW9uXG5cdFx0aWYgKHRoaXMubWVudSAmJiB0aGlzLmZvY3VzZWQgJiYgdGhpcy5zdGF0ZS5pc09wZW4gJiYgIXRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbikge1xuXHRcdFx0bGV0IGZvY3VzZWRPcHRpb25Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5mb2N1c2VkKTtcblx0XHRcdGxldCBtZW51Tm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMubWVudSk7XG5cdFx0XHRtZW51Tm9kZS5zY3JvbGxUb3AgPSBmb2N1c2VkT3B0aW9uTm9kZS5vZmZzZXRUb3A7XG5cdFx0XHR0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHR0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgJiYgdGhpcy5mb2N1c2VkICYmIHRoaXMubWVudSkge1xuXHRcdFx0dGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgPSBmYWxzZTtcblx0XHRcdHZhciBmb2N1c2VkRE9NID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5mb2N1c2VkKTtcblx0XHRcdHZhciBtZW51RE9NID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5tZW51KTtcblx0XHRcdHZhciBmb2N1c2VkUmVjdCA9IGZvY3VzZWRET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHR2YXIgbWVudVJlY3QgPSBtZW51RE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0aWYgKGZvY3VzZWRSZWN0LmJvdHRvbSA+IG1lbnVSZWN0LmJvdHRvbSB8fCBmb2N1c2VkUmVjdC50b3AgPCBtZW51UmVjdC50b3ApIHtcblx0XHRcdFx0bWVudURPTS5zY3JvbGxUb3AgPSAoZm9jdXNlZERPTS5vZmZzZXRUb3AgKyBmb2N1c2VkRE9NLmNsaWVudEhlaWdodCAtIG1lbnVET00ub2Zmc2V0SGVpZ2h0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMucHJvcHMuc2Nyb2xsTWVudUludG9WaWV3ICYmIHRoaXMubWVudUNvbnRhaW5lcikge1xuXHRcdFx0dmFyIG1lbnVDb250YWluZXJSZWN0ID0gdGhpcy5tZW51Q29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0aWYgKHdpbmRvdy5pbm5lckhlaWdodCA8IG1lbnVDb250YWluZXJSZWN0LmJvdHRvbSArIHRoaXMucHJvcHMubWVudUJ1ZmZlcikge1xuXHRcdFx0XHR3aW5kb3cuc2Nyb2xsQnkoMCwgbWVudUNvbnRhaW5lclJlY3QuYm90dG9tICsgdGhpcy5wcm9wcy5tZW51QnVmZmVyIC0gd2luZG93LmlubmVySGVpZ2h0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHByZXZQcm9wcy5kaXNhYmxlZCAhPT0gdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGlzRm9jdXNlZDogZmFsc2UgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcblx0XHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdFx0fVxuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcblx0XHRpZiAoIWRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcblx0XHRcdGRvY3VtZW50LmRldGFjaEV2ZW50KCdvbnRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0fVxuXHR9LFxuXG5cdHRvZ2dsZVRvdWNoT3V0c2lkZUV2ZW50IChlbmFibGVkKSB7XG5cdFx0aWYgKGVuYWJsZWQpIHtcblx0XHRcdGlmICghZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAmJiBkb2N1bWVudC5hdHRhY2hFdmVudCkge1xuXHRcdFx0XHRkb2N1bWVudC5hdHRhY2hFdmVudCgnb250b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCFkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyICYmIGRvY3VtZW50LmRldGFjaEV2ZW50KSB7XG5cdFx0XHRcdGRvY3VtZW50LmRldGFjaEV2ZW50KCdvbnRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRoYW5kbGVUb3VjaE91dHNpZGUgKGV2ZW50KSB7XG5cdFx0Ly8gaGFuZGxlIHRvdWNoIG91dHNpZGUgb24gaW9zIHRvIGRpc21pc3MgbWVudVxuXHRcdGlmICh0aGlzLndyYXBwZXIgJiYgIXRoaXMud3JhcHBlci5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG5cdFx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHRcdH1cblx0fSxcblxuXHRmb2N1cyAoKSB7XG5cdFx0aWYgKCF0aGlzLmlucHV0KSByZXR1cm47XG5cdFx0dGhpcy5pbnB1dC5mb2N1cygpO1xuXHR9LFxuXG5cdGJsdXJJbnB1dCAoKSB7XG5cdFx0aWYgKCF0aGlzLmlucHV0KSByZXR1cm47XG5cdFx0dGhpcy5pbnB1dC5ibHVyKCk7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hNb3ZlIChldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hTdGFydCAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hFbmQgKGV2ZW50KSB7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0Ly8gRmlyZSB0aGUgbW91c2UgZXZlbnRzXG5cdFx0dGhpcy5oYW5kbGVNb3VzZURvd24oZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoRW5kQ2xlYXJWYWx1ZSAoZXZlbnQpIHtcblx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdGlmICh0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHQvLyBDbGVhciB0aGUgdmFsdWVcblx0XHR0aGlzLmNsZWFyVmFsdWUoZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoRW5kT25BcnJvdyAoZXZlbnQpIHtcbiBcdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG4gXHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG4gXHRcdGlmICh0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cbiBcdFx0Ly8gQ2xlYXIgdGhlIHZhbHVlXG4gXHRcdHRoaXMuaGFuZGxlTW91c2VEb3duT25BcnJvdyhldmVudCk7XG4gXHR9LFxuXG5cdGhhbmRsZU1vdXNlRG93biAoZXZlbnQpIHtcblx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XG5cdFx0Ly8gYnV0dG9uLCBvciBpZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBpZ25vcmUgaXQuXG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBwcmV2ZW50IGRlZmF1bHQgZXZlbnQgaGFuZGxlcnNcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Ly8gZm9yIHRoZSBub24tc2VhcmNoYWJsZSBzZWxlY3QsIHRvZ2dsZSB0aGUgbWVudVxuXHRcdGlmICghdGhpcy5wcm9wcy5zZWFyY2hhYmxlKSB7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogIXRoaXMuc3RhdGUuaXNPcGVuLFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuc3RhdGUuaXNGb2N1c2VkKSB7XG5cdFx0XHQvLyBPbiBpT1MsIHdlIGNhbiBnZXQgaW50byBhIHN0YXRlIHdoZXJlIHdlIHRoaW5rIHRoZSBpbnB1dCBpcyBmb2N1c2VkIGJ1dCBpdCBpc24ndCByZWFsbHksXG5cdFx0XHQvLyBzaW5jZSBpT1MgaWdub3JlcyBwcm9ncmFtbWF0aWMgY2FsbHMgdG8gaW5wdXQuZm9jdXMoKSB0aGF0IHdlcmVuJ3QgdHJpZ2dlcmVkIGJ5IGEgY2xpY2sgZXZlbnQuXG5cdFx0XHQvLyBDYWxsIGZvY3VzKCkgYWdhaW4gaGVyZSB0byBiZSBzYWZlLlxuXHRcdFx0dGhpcy5mb2N1cygpO1xuXG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0O1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dC5nZXRJbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHQvLyBHZXQgdGhlIGFjdHVhbCBET00gaW5wdXQgaWYgdGhlIHJlZiBpcyBhbiA8QXV0b3NpemVJbnB1dCAvPiBjb21wb25lbnRcblx0XHRcdFx0aW5wdXQgPSBpbnB1dC5nZXRJbnB1dCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjbGVhcnMgdGhlIHZhbHVlIHNvIHRoYXQgdGhlIGN1cnNvciB3aWxsIGJlIGF0IHRoZSBlbmQgb2YgaW5wdXQgd2hlbiB0aGUgY29tcG9uZW50IHJlLXJlbmRlcnNcblx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cblx0XHRcdC8vIGlmIHRoZSBpbnB1dCBpcyBmb2N1c2VkLCBlbnN1cmUgdGhlIG1lbnUgaXMgb3BlblxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBvdGhlcndpc2UsIGZvY3VzIHRoZSBpbnB1dCBhbmQgb3BlbiB0aGUgbWVudVxuXHRcdFx0dGhpcy5fb3BlbkFmdGVyRm9jdXMgPSB0cnVlO1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH1cblx0fSxcblxuXHRoYW5kbGVNb3VzZURvd25PbkFycm93IChldmVudCkge1xuXHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHQvLyBidXR0b24sIG9yIGlmIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQsIGlnbm9yZSBpdC5cblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvLyBJZiB0aGUgbWVudSBpc24ndCBvcGVuLCBsZXQgdGhlIGV2ZW50IGJ1YmJsZSB0byB0aGUgbWFpbiBoYW5kbGVNb3VzZURvd25cblx0XHRpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIHByZXZlbnQgZGVmYXVsdCBldmVudCBoYW5kbGVyc1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Ly8gY2xvc2UgdGhlIG1lbnVcblx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHR9LFxuXG5cdGhhbmRsZU1vdXNlRG93bk9uTWVudSAoZXZlbnQpIHtcblx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XG5cdFx0Ly8gYnV0dG9uLCBvciBpZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBpZ25vcmUgaXQuXG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gdHJ1ZTtcblx0XHR0aGlzLmZvY3VzKCk7XG5cdH0sXG5cblx0Y2xvc2VNZW51ICgpIHtcblx0XHRpZih0aGlzLnByb3BzLm9uQ2xvc2VSZXNldHNJbnB1dCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgJiYgIXRoaXMucHJvcHMubXVsdGksXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgJiYgIXRoaXMucHJvcHMubXVsdGksXG5cdFx0XHRcdGlucHV0VmFsdWU6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbiA9IGZhbHNlO1xuXHR9LFxuXG5cdGhhbmRsZUlucHV0Rm9jdXMgKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHJldHVybjtcblx0XHR2YXIgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW4gfHwgdGhpcy5fb3BlbkFmdGVyRm9jdXMgfHwgdGhpcy5wcm9wcy5vcGVuT25Gb2N1cztcblx0XHRpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuXHRcdH1cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGlzRm9jdXNlZDogdHJ1ZSxcblx0XHRcdGlzT3BlbjogaXNPcGVuXG5cdFx0fSk7XG5cdFx0dGhpcy5fb3BlbkFmdGVyRm9jdXMgPSBmYWxzZTtcblx0fSxcblxuXHRoYW5kbGVJbnB1dEJsdXIgKGV2ZW50KSB7XG5cdFx0Ly8gbWFrZXMgdGhlIFwiZmllbGQgaXMgcmVxdWlyZWRcIiBtZXNzYWdlIHRvIGFwcGVhciBvbiBibHVyXCJcblx0XHR0aGlzLnByb3BzLmlzUmVxdWlyZWQgJiYgdGhpcy5zZXRTdGF0ZSh7c2hvd1JlcXVpcmVkTXNnOnRydWV9KTtcblx0XHQvLyBUaGUgY2hlY2sgZm9yIG1lbnUuY29udGFpbnMoYWN0aXZlRWxlbWVudCkgaXMgbmVjZXNzYXJ5IHRvIHByZXZlbnQgSUUxMSdzIHNjcm9sbGJhciBmcm9tIGNsb3NpbmcgdGhlIG1lbnUgaW4gY2VydGFpbiBjb250ZXh0cy5cblx0XHRpZiAodGhpcy5tZW51ICYmICh0aGlzLm1lbnUgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgdGhpcy5tZW51LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSkge1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnByb3BzLm9uQmx1cikge1xuXHRcdFx0dGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuXHRcdH1cblx0XHR2YXIgb25CbHVycmVkU3RhdGUgPSB7XG5cdFx0XHRpc0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXG5cdFx0fTtcblx0XHRpZiAodGhpcy5wcm9wcy5vbkJsdXJSZXNldHNJbnB1dCkge1xuXHRcdFx0b25CbHVycmVkU3RhdGUuaW5wdXRWYWx1ZSA9ICcnO1xuXHRcdH1cblx0XHR0aGlzLnNldFN0YXRlKG9uQmx1cnJlZFN0YXRlKTtcblx0fSxcblxuXHRoYW5kbGVJbnB1dENoYW5nZSAoZXZlbnQpIHtcblx0XHRsZXQgbmV3SW5wdXRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblxuXHRcdGlmICh0aGlzLnN0YXRlLmlucHV0VmFsdWUgIT09IGV2ZW50LnRhcmdldC52YWx1ZSAmJiB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UpIHtcblx0XHRcdGxldCBuZXh0U3RhdGUgPSB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UobmV3SW5wdXRWYWx1ZSk7XG5cdFx0XHQvLyBOb3RlOiAhPSB1c2VkIGRlbGliZXJhdGVseSBoZXJlIHRvIGNhdGNoIHVuZGVmaW5lZCBhbmQgbnVsbFxuXHRcdFx0aWYgKG5leHRTdGF0ZSAhPSBudWxsICYmIHR5cGVvZiBuZXh0U3RhdGUgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdG5ld0lucHV0VmFsdWUgPSAnJyArIG5leHRTdGF0ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRpbnB1dFZhbHVlOiBuZXdJbnB1dFZhbHVlLFxuXHRcdH0pO1xuXHR9LFxuXG5cdGhhbmRsZUtleURvd24gKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHJldHVybjtcblxuXHRcdGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbklucHV0S2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhpcy5wcm9wcy5vbklucHV0S2V5RG93bihldmVudCk7XG5cdFx0XHRpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRjYXNlIDg6IC8vIGJhY2tzcGFjZVxuXHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAmJiB0aGlzLnByb3BzLmJhY2tzcGFjZVJlbW92ZXMpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMucG9wVmFsdWUoKTtcblx0XHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdFx0Y2FzZSA5OiAvLyB0YWJcblx0XHRcdFx0aWYgKGV2ZW50LnNoaWZ0S2V5IHx8ICF0aGlzLnN0YXRlLmlzT3BlbiB8fCAhdGhpcy5wcm9wcy50YWJTZWxlY3RzVmFsdWUpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zZWxlY3RGb2N1c2VkT3B0aW9uKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0XHRjYXNlIDEzOiAvLyBlbnRlclxuXHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSByZXR1cm47XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAyNzogLy8gZXNjYXBlXG5cdFx0XHRcdGlmICh0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0XHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5jbGVhcmFibGUgJiYgdGhpcy5wcm9wcy5lc2NhcGVDbGVhcnNWYWx1ZSkge1xuXHRcdFx0XHRcdHRoaXMuY2xlYXJWYWx1ZShldmVudCk7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzODogLy8gdXBcblx0XHRcdFx0dGhpcy5mb2N1c1ByZXZpb3VzT3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgNDA6IC8vIGRvd25cblx0XHRcdFx0dGhpcy5mb2N1c05leHRPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzMzogLy8gcGFnZSB1cFxuXHRcdFx0XHR0aGlzLmZvY3VzUGFnZVVwT3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzQ6IC8vIHBhZ2UgZG93blxuXHRcdFx0XHR0aGlzLmZvY3VzUGFnZURvd25PcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzNTogLy8gZW5kIGtleVxuXHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5mb2N1c0VuZE9wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM2OiAvLyBob21lIGtleVxuXHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5mb2N1c1N0YXJ0T3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgNDY6IC8vIGJhY2tzcGFjZVxuXHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAmJiB0aGlzLnByb3BzLmRlbGV0ZVJlbW92ZXMpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMucG9wVmFsdWUoKTtcblx0XHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdFx0ZGVmYXVsdDogcmV0dXJuO1xuXHRcdH1cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9LFxuXG5cdGhhbmRsZVZhbHVlQ2xpY2sgKG9wdGlvbiwgZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMub25WYWx1ZUNsaWNrKSByZXR1cm47XG5cdFx0dGhpcy5wcm9wcy5vblZhbHVlQ2xpY2sob3B0aW9uLCBldmVudCk7XG5cdH0sXG5cblx0aGFuZGxlTWVudVNjcm9sbCAoZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMub25NZW51U2Nyb2xsVG9Cb3R0b20pIHJldHVybjtcblx0XHRsZXQgeyB0YXJnZXQgfSA9IGV2ZW50O1xuXHRcdGlmICh0YXJnZXQuc2Nyb2xsSGVpZ2h0ID4gdGFyZ2V0Lm9mZnNldEhlaWdodCAmJiAhKHRhcmdldC5zY3JvbGxIZWlnaHQgLSB0YXJnZXQub2Zmc2V0SGVpZ2h0IC0gdGFyZ2V0LnNjcm9sbFRvcCkpIHtcblx0XHRcdHRoaXMucHJvcHMub25NZW51U2Nyb2xsVG9Cb3R0b20oKTtcblx0XHR9XG5cdH0sXG5cblx0aGFuZGxlUmVxdWlyZWQgKHZhbHVlLCBtdWx0aSkge1xuXHRcdGlmICghdmFsdWUpIHJldHVybiB0cnVlO1xuXHRcdHJldHVybiAobXVsdGkgPyB2YWx1ZS5sZW5ndGggPT09IDAgOiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwKTtcblx0fSxcblxuXHRnZXRPcHRpb25MYWJlbCAob3ApIHtcblx0XHRyZXR1cm4gb3BbdGhpcy5wcm9wcy5sYWJlbEtleV07XG5cdH0sXG5cblx0LyoqXG5cdCAqIFR1cm5zIGEgdmFsdWUgaW50byBhbiBhcnJheSBmcm9tIHRoZSBnaXZlbiBvcHRpb25zXG5cdCAqIEBwYXJhbVx0e1N0cmluZ3xOdW1iZXJ8QXJyYXl9XHR2YWx1ZVx0XHQtIHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IGlucHV0XG5cdCAqIEBwYXJhbVx0e09iamVjdH1cdFx0bmV4dFByb3BzXHQtIG9wdGlvbmFsbHkgc3BlY2lmeSB0aGUgbmV4dFByb3BzIHNvIHRoZSByZXR1cm5lZCBhcnJheSB1c2VzIHRoZSBsYXRlc3QgY29uZmlndXJhdGlvblxuXHQgKiBAcmV0dXJuc1x0e0FycmF5fVx0dGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgcmVwcmVzZW50ZWQgaW4gYW4gYXJyYXlcblx0ICovXG5cdGdldFZhbHVlQXJyYXkgKHZhbHVlLCBuZXh0UHJvcHMpIHtcblx0XHQvKiogc3VwcG9ydCBvcHRpb25hbGx5IHBhc3NpbmcgaW4gdGhlIGBuZXh0UHJvcHNgIHNvIGBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzYCB1cGRhdGVzIHdpbGwgZnVuY3Rpb24gYXMgZXhwZWN0ZWQgKi9cblx0XHRjb25zdCBwcm9wcyA9IHR5cGVvZiBuZXh0UHJvcHMgPT09ICdvYmplY3QnID8gbmV4dFByb3BzIDogdGhpcy5wcm9wcztcblx0XHRpZiAocHJvcHMubXVsdGkpIHtcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB2YWx1ZSA9IHZhbHVlLnNwbGl0KHByb3BzLmRlbGltaXRlcik7XG5cdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW107XG5cdFx0XHRcdHZhbHVlID0gW3ZhbHVlXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWx1ZS5tYXAodmFsdWUgPT4gdGhpcy5leHBhbmRWYWx1ZSh2YWx1ZSwgcHJvcHMpKS5maWx0ZXIoaSA9PiBpKTtcblx0XHR9XG5cdFx0dmFyIGV4cGFuZGVkVmFsdWUgPSB0aGlzLmV4cGFuZFZhbHVlKHZhbHVlLCBwcm9wcyk7XG5cdFx0cmV0dXJuIGV4cGFuZGVkVmFsdWUgPyBbZXhwYW5kZWRWYWx1ZV0gOiBbXTtcblx0fSxcblxuXHQvKipcblx0ICogUmV0cmlldmUgYSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBvcHRpb25zIGFuZCB2YWx1ZUtleVxuXHQgKiBAcGFyYW1cdHtTdHJpbmd8TnVtYmVyfEFycmF5fVx0dmFsdWVcdC0gdGhlIHNlbGVjdGVkIHZhbHVlKHMpXG5cdCAqIEBwYXJhbVx0e09iamVjdH1cdFx0cHJvcHNcdC0gdGhlIFNlbGVjdCBjb21wb25lbnQncyBwcm9wcyAob3IgbmV4dFByb3BzKVxuXHQgKi9cblx0ZXhwYW5kVmFsdWUgKHZhbHVlLCBwcm9wcykge1xuXHRcdGNvbnN0IHZhbHVlVHlwZSA9IHR5cGVvZiB2YWx1ZTtcblx0XHRpZiAodmFsdWVUeXBlICE9PSAnc3RyaW5nJyAmJiB2YWx1ZVR5cGUgIT09ICdudW1iZXInICYmIHZhbHVlVHlwZSAhPT0gJ2Jvb2xlYW4nKSByZXR1cm4gdmFsdWU7XG5cdFx0bGV0IHsgb3B0aW9ucywgdmFsdWVLZXkgfSA9IHByb3BzO1xuXHRcdGlmICghb3B0aW9ucykgcmV0dXJuO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKG9wdGlvbnNbaV1bdmFsdWVLZXldID09PSB2YWx1ZSkgcmV0dXJuIG9wdGlvbnNbaV07XG5cdFx0fVxuXHR9LFxuXG5cdHNldFZhbHVlICh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLnByb3BzLmF1dG9CbHVyKXtcblx0XHRcdHRoaXMuYmx1cklucHV0KCk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5wcm9wcy5vbkNoYW5nZSkgcmV0dXJuO1xuXHRcdGlmICh0aGlzLnByb3BzLnJlcXVpcmVkKSB7XG5cdFx0XHRjb25zdCByZXF1aXJlZCA9IHRoaXMuaGFuZGxlUmVxdWlyZWQodmFsdWUsIHRoaXMucHJvcHMubXVsdGkpO1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHJlcXVpcmVkIH0pO1xuXHRcdH1cblx0XHRpZiAodGhpcy5wcm9wcy5zaW1wbGVWYWx1ZSAmJiB2YWx1ZSkge1xuXHRcdFx0dmFsdWUgPSB0aGlzLnByb3BzLm11bHRpID8gdmFsdWUubWFwKGkgPT4gaVt0aGlzLnByb3BzLnZhbHVlS2V5XSkuam9pbih0aGlzLnByb3BzLmRlbGltaXRlcikgOiB2YWx1ZVt0aGlzLnByb3BzLnZhbHVlS2V5XTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG5cdH0sXG5cblx0c2VsZWN0VmFsdWUgKHZhbHVlKSB7XG5cdFx0Y29uc29sZS5sb2codmFsdWUpO1xuXHRcdC8vTk9URTogdXBkYXRlIHZhbHVlIGluIHRoZSBjYWxsYmFjayB0byBtYWtlIHN1cmUgdGhlIGlucHV0IHZhbHVlIGlzIGVtcHR5IHNvIHRoYXQgdGhlcmUgYXJlIG5vIHN0eWxpbmcgaXNzdWVzIChDaHJvbWUgaGFkIGlzc3VlIG90aGVyd2lzZSlcblx0XHR0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSBmYWxzZTtcblx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0XHRmb2N1c2VkSW5kZXg6IG51bGxcblx0XHRcdH0sICgpID0+IHtcblx0XHRcdFx0dGhpcy5hZGRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGlucHV0VmFsdWU6IHZhbHVlLmxhYmVsLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkLFxuXHRcdFx0fSwgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcblxuXHRkZWxldGVPcHRpb24gKG9wdGlvbikge1xuXHRcdGlmICh0aGlzLnByb3BzLmRlbGV0ZU9wdGlvbikge1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuZGVsZXRlT3B0aW9uKCBvcHRpb24gKTtcblx0XHR9XG5cdH0sXG5cblx0YWRkVmFsdWUgKHZhbHVlKSB7XG5cdFx0dmFyIHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0Y29uc3QgdmlzaWJsZU9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9ucy5maWx0ZXIodmFsID0+ICF2YWwuZGlzYWJsZWQpO1xuXHRcdGNvbnN0IGxhc3RWYWx1ZUluZGV4ID0gdmlzaWJsZU9wdGlvbnMuaW5kZXhPZih2YWx1ZSk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZUFycmF5LmNvbmNhdCh2YWx1ZSkpO1xuXHRcdGlmICh2aXNpYmxlT3B0aW9ucy5sZW5ndGggLSAxID09PSBsYXN0VmFsdWVJbmRleCkge1xuXHRcdFx0Ly8gdGhlIGxhc3Qgb3B0aW9uIHdhcyBzZWxlY3RlZDsgZm9jdXMgdGhlIHNlY29uZC1sYXN0IG9uZVxuXHRcdFx0dGhpcy5mb2N1c09wdGlvbih2aXNpYmxlT3B0aW9uc1tsYXN0VmFsdWVJbmRleCAtIDFdKTtcblx0XHR9IGVsc2UgaWYgKHZpc2libGVPcHRpb25zLmxlbmd0aCA+IGxhc3RWYWx1ZUluZGV4KSB7XG5cdFx0XHQvLyBmb2N1cyB0aGUgb3B0aW9uIGJlbG93IHRoZSBzZWxlY3RlZCBvbmVcblx0XHRcdHRoaXMuZm9jdXNPcHRpb24odmlzaWJsZU9wdGlvbnNbbGFzdFZhbHVlSW5kZXggKyAxXSk7XG5cdFx0fVxuXHR9LFxuXG5cdHBvcFZhbHVlICgpIHtcblx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRpZiAoIXZhbHVlQXJyYXkubGVuZ3RoKSByZXR1cm47XG5cdFx0aWYgKHZhbHVlQXJyYXlbdmFsdWVBcnJheS5sZW5ndGgtMV0uY2xlYXJhYmxlVmFsdWUgPT09IGZhbHNlKSByZXR1cm47XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZUFycmF5LnNsaWNlKDAsIHZhbHVlQXJyYXkubGVuZ3RoIC0gMSkpO1xuXHR9LFxuXG5cdHJlbW92ZVZhbHVlICh2YWx1ZSkge1xuXHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5maWx0ZXIoaSA9PiBpICE9PSB2YWx1ZSkpO1xuXHRcdHRoaXMuZm9jdXMoKTtcblx0fSxcblxuXHRjbGVhclZhbHVlIChldmVudCkge1xuXHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHQvLyBidXR0b24sIGlnbm9yZSBpdC5cblx0XHRpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh0aGlzLmdldFJlc2V0VmFsdWUoKSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0aW5wdXRWYWx1ZTogJycsXG5cdFx0fSwgdGhpcy5mb2N1cyk7XG5cdH0sXG5cblx0Z2V0UmVzZXRWYWx1ZSAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMucmVzZXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5yZXNldFZhbHVlO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0cmVtb3ZlUmVxdWlyZWRNc2cgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2hvd1JlcXVpcmVkTXNnOiBmYWxzZVxuXHRcdH0pO1xuXHR9LFxuXG5cdGZvY3VzT3B0aW9uIChvcHRpb24pIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZvY3VzZWRPcHRpb246IG9wdGlvblxuXHRcdH0pO1xuXHR9LFxuXG5cdGZvY3VzTmV4dE9wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCduZXh0Jyk7XG5cdH0sXG5cblx0Zm9jdXNQcmV2aW91c09wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwcmV2aW91cycpO1xuXHR9LFxuXG5cdGZvY3VzUGFnZVVwT3B0aW9uICgpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3BhZ2VfdXAnKTtcblx0fSxcblxuXHRmb2N1c1BhZ2VEb3duT3B0aW9uICgpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3BhZ2VfZG93bicpO1xuXHR9LFxuXG5cdGZvY3VzU3RhcnRPcHRpb24gKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignc3RhcnQnKTtcblx0fSxcblxuXHRmb2N1c0VuZE9wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdlbmQnKTtcblx0fSxcblxuXHRmb2N1c0FkamFjZW50T3B0aW9uIChkaXIpIHtcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zXG5cdFx0XHQubWFwKChvcHRpb24sIGluZGV4KSA9PiAoeyBvcHRpb24sIGluZGV4IH0pKVxuXHRcdFx0LmZpbHRlcihvcHRpb24gPT4gIW9wdGlvbi5vcHRpb24uZGlzYWJsZWQpO1xuXHRcdHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlID0gdHJ1ZTtcblx0XHRpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdFx0Zm9jdXNlZE9wdGlvbjogdGhpcy5fZm9jdXNlZE9wdGlvbiB8fCAob3B0aW9ucy5sZW5ndGggPyBvcHRpb25zW2RpciA9PT0gJ25leHQnID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMV0ub3B0aW9uIDogbnVsbClcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoIW9wdGlvbnMubGVuZ3RoKSByZXR1cm47XG5cdFx0dmFyIGZvY3VzZWRJbmRleCA9IC0xO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuX2ZvY3VzZWRPcHRpb24gPT09IG9wdGlvbnNbaV0ub3B0aW9uKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IGk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoZGlyID09PSAnbmV4dCcgJiYgZm9jdXNlZEluZGV4ICE9PSAtMSApIHtcblx0XHRcdGZvY3VzZWRJbmRleCA9IChmb2N1c2VkSW5kZXggKyAxKSAlIG9wdGlvbnMubGVuZ3RoO1xuXHRcdH0gZWxzZSBpZiAoZGlyID09PSAncHJldmlvdXMnKSB7XG5cdFx0XHRpZiAoZm9jdXNlZEluZGV4ID4gMCkge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBmb2N1c2VkSW5kZXggLSAxO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoZGlyID09PSAnc3RhcnQnKSB7XG5cdFx0XHRmb2N1c2VkSW5kZXggPSAwO1xuXHRcdH0gZWxzZSBpZiAoZGlyID09PSAnZW5kJykge1xuXHRcdFx0Zm9jdXNlZEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXHRcdH0gZWxzZSBpZiAoZGlyID09PSAncGFnZV91cCcpIHtcblx0XHRcdHZhciBwb3RlbnRpYWxJbmRleCA9IGZvY3VzZWRJbmRleCAtIHRoaXMucHJvcHMucGFnZVNpemU7XG5cdFx0XHRpZiAocG90ZW50aWFsSW5kZXggPCAwKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IDA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBwb3RlbnRpYWxJbmRleDtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3BhZ2VfZG93bicpIHtcblx0XHRcdHZhciBwb3RlbnRpYWxJbmRleCA9IGZvY3VzZWRJbmRleCArIHRoaXMucHJvcHMucGFnZVNpemU7XG5cdFx0XHRpZiAocG90ZW50aWFsSW5kZXggPiBvcHRpb25zLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gcG90ZW50aWFsSW5kZXg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGZvY3VzZWRJbmRleCA9PT0gLTEpIHtcblx0XHRcdGZvY3VzZWRJbmRleCA9IDA7XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb2N1c2VkSW5kZXg6IG9wdGlvbnNbZm9jdXNlZEluZGV4XS5pbmRleCxcblx0XHRcdGZvY3VzZWRPcHRpb246IG9wdGlvbnNbZm9jdXNlZEluZGV4XS5vcHRpb25cblx0XHR9KTtcblx0fSxcblxuXHRnZXRGb2N1c2VkT3B0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZm9jdXNlZE9wdGlvbjtcblx0fSxcblxuXHRnZXRJbnB1dFZhbHVlICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5pbnB1dFZhbHVlO1xuXHR9LFxuXG5cdHNlbGVjdEZvY3VzZWRPcHRpb24gKCkge1xuXHRcdGlmICh0aGlzLl9mb2N1c2VkT3B0aW9uKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3RWYWx1ZSh0aGlzLl9mb2N1c2VkT3B0aW9uKTtcblx0XHR9XG5cdH0sXG5cblx0cmVuZGVyTG9hZGluZyAoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLmlzTG9hZGluZykgcmV0dXJuO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtbG9hZGluZy16b25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1sb2FkaW5nXCIgLz5cblx0XHRcdDwvc3Bhbj5cblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlclZhbHVlICh2YWx1ZUFycmF5LCBpc09wZW4pIHtcblx0XHRsZXQgcmVuZGVyTGFiZWwgPSB0aGlzLnByb3BzLnZhbHVlUmVuZGVyZXIgfHwgdGhpcy5nZXRPcHRpb25MYWJlbDtcblx0XHRsZXQgVmFsdWVDb21wb25lbnQgPSB0aGlzLnByb3BzLnZhbHVlQ29tcG9uZW50O1xuXHRcdGlmICghdmFsdWVBcnJheS5sZW5ndGgpIHtcblx0XHRcdHJldHVybiAhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlID8gPGRpdiBjbGFzc05hbWU9XCJTZWxlY3QtcGxhY2Vob2xkZXJcIj57dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn08L2Rpdj4gOiBudWxsO1xuXHRcdH1cblx0XHRsZXQgb25DbGljayA9IHRoaXMucHJvcHMub25WYWx1ZUNsaWNrID8gdGhpcy5oYW5kbGVWYWx1ZUNsaWNrIDogbnVsbDtcblx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlQXJyYXkubWFwKCh2YWx1ZSwgaSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxWYWx1ZUNvbXBvbmVudFxuXHRcdFx0XHRcdFx0aWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZS0nICsgaX1cblx0XHRcdFx0XHRcdGluc3RhbmNlUHJlZml4PXt0aGlzLl9pbnN0YW5jZVByZWZpeH1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkIHx8IHZhbHVlLmNsZWFyYWJsZVZhbHVlID09PSBmYWxzZX1cblx0XHRcdFx0XHRcdGtleT17YHZhbHVlLSR7aX0tJHt2YWx1ZVt0aGlzLnByb3BzLnZhbHVlS2V5XX1gfVxuXHRcdFx0XHRcdFx0b25DbGljaz17b25DbGlja31cblx0XHRcdFx0XHRcdG9uUmVtb3ZlPXt0aGlzLnJlbW92ZVZhbHVlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHtyZW5kZXJMYWJlbCh2YWx1ZSwgaSl9XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtYXJpYS1vbmx5XCI+Jm5ic3A7PC9zcGFuPlxuXHRcdFx0XHRcdDwvVmFsdWVDb21wb25lbnQ+XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUpIHtcblx0XHRcdGlmIChpc09wZW4pIG9uQ2xpY2sgPSBudWxsO1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFZhbHVlQ29tcG9uZW50XG5cdFx0XHRcdFx0aWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZS1pdGVtJ31cblx0XHRcdFx0XHRkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRpbnN0YW5jZVByZWZpeD17dGhpcy5faW5zdGFuY2VQcmVmaXh9XG5cdFx0XHRcdFx0b25DbGljaz17b25DbGlja31cblx0XHRcdFx0XHR2YWx1ZT17dmFsdWVBcnJheVswXX1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdHtyZW5kZXJMYWJlbCh2YWx1ZUFycmF5WzBdKX1cblx0XHRcdFx0PC9WYWx1ZUNvbXBvbmVudD5cblx0XHRcdCk7XG5cdFx0fVxuXHR9LFxuXG5cdHJlbmRlcklucHV0ICh2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uSW5kZXgpIHtcblx0XHR2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygnU2VsZWN0LWlucHV0JywgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSk7XG5cdFx0Y29uc3QgaXNPcGVuID0gISF0aGlzLnN0YXRlLmlzT3BlbjtcblxuXHRcdGNvbnN0IGFyaWFPd25zID0gY2xhc3NOYW1lcyh7XG5cdFx0XHRbdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWxpc3QnXTogaXNPcGVuLFxuXHRcdFx0W3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1iYWNrc3BhY2UtcmVtb3ZlLW1lc3NhZ2UnXTogdGhpcy5wcm9wcy5tdWx0aVxuXHRcdFx0XHQmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZFxuXHRcdFx0XHQmJiB0aGlzLnN0YXRlLmlzRm9jdXNlZFxuXHRcdFx0XHQmJiAhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG5cdFx0fSk7XG5cblx0XHQvLyBUT0RPOiBDaGVjayBob3cgdGhpcyBwcm9qZWN0IGluY2x1ZGVzIE9iamVjdC5hc3NpZ24oKVxuXHRcdGNvbnN0IGlucHV0UHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLmlucHV0UHJvcHMsIHtcblx0XHRcdHJvbGU6ICdjb21ib2JveCcsXG5cdFx0XHQnYXJpYS1leHBhbmRlZCc6ICcnICsgaXNPcGVuLFxuXHRcdFx0J2FyaWEtb3ducyc6IGFyaWFPd25zLFxuXHRcdFx0J2FyaWEtaGFzcG9wdXAnOiAnJyArIGlzT3Blbixcblx0XHRcdCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnOiBpc09wZW4gPyB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctb3B0aW9uLScgKyBmb2N1c2VkT3B0aW9uSW5kZXggOiB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctdmFsdWUnLFxuXHRcdFx0J2FyaWEtZGVzY3JpYmVkYnknOiB0aGlzLnByb3BzWydhcmlhLWRlc2NyaWJlZGJ5J10sXG5cdFx0XHQnYXJpYS1sYWJlbGxlZGJ5JzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbGxlZGJ5J10sXG5cdFx0XHQnYXJpYS1sYWJlbCc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSxcblx0XHRcdGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0dGFiSW5kZXg6IHRoaXMucHJvcHMudGFiSW5kZXgsXG5cdFx0XHRvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXRCbHVyLFxuXHRcdFx0b25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsXG5cdFx0XHRvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG5cdFx0XHRyZWY6IHJlZiA9PiB0aGlzLmlucHV0ID0gcmVmLFxuXHRcdFx0cmVxdWlyZWQ6IHRoaXMuc3RhdGUucmVxdWlyZWQsXG5cdFx0XHR2YWx1ZTogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKGlucHV0UHJvcHMpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8ICF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcblx0XHRcdGNvbnN0IHsgaW5wdXRDbGFzc05hbWUsIC4uLmRpdlByb3BzIH0gPSB0aGlzLnByb3BzLmlucHV0UHJvcHM7XG5cblx0XHRcdGNvbnN0IGFyaWFPd25zID0gY2xhc3NOYW1lcyh7XG5cdFx0XHRcdFt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCddOiBpc09wZW4sXG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdHsuLi5kaXZQcm9wc31cblx0XHRcdFx0XHRyb2xlPVwiY29tYm9ib3hcIlxuXHRcdFx0XHRcdGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cblx0XHRcdFx0XHRhcmlhLW93bnM9e2FyaWFPd25zfVxuXHRcdFx0XHRcdGFyaWEtYWN0aXZlZGVzY2VuZGFudD17aXNPcGVuID8gdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLW9wdGlvbi0nICsgZm9jdXNlZE9wdGlvbkluZGV4IDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJ31cblx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHR0YWJJbmRleD17dGhpcy5wcm9wcy50YWJJbmRleCB8fCAwfVxuXHRcdFx0XHRcdG9uQmx1cj17dGhpcy5oYW5kbGVJbnB1dEJsdXJ9XG5cdFx0XHRcdFx0b25Gb2N1cz17dGhpcy5oYW5kbGVJbnB1dEZvY3VzfVxuXHRcdFx0XHRcdHJlZj17cmVmID0+IHRoaXMuaW5wdXQgPSByZWZ9XG5cdFx0XHRcdFx0YXJpYS1yZWFkb25seT17JycgKyAhIXRoaXMucHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0c3R5bGU9e3sgYm9yZGVyOiAwLCB3aWR0aDogMSwgZGlzcGxheTonaW5saW5lLWJsb2NrJyB9fS8+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnByb3BzLmF1dG9zaXplKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8QXV0b3NpemVJbnB1dCB7Li4uaW5wdXRQcm9wc30gbWluV2lkdGg9XCI1XCIgLz5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17IGNsYXNzTmFtZSB9PlxuXHRcdFx0XHQ8aW5wdXQgey4uLmlucHV0UHJvcHN9IC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlckNsZWFyICgpIHtcblxuXHRcdGlmICghdGhpcy5wcm9wcy5jbGVhcmFibGUgfHwgdGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMudmFsdWUgPT09IG51bGwgfHwgdGhpcy5wcm9wcy5tdWx0aSAmJiAhdGhpcy5wcm9wcy52YWx1ZS5sZW5ndGggfHwgdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0aGlzLnByb3BzLmlzTG9hZGluZykgcmV0dXJuO1xuXHRcdGNvbnN0IGNsZWFyID0gdGhpcy5wcm9wcy5jbGVhclJlbmRlcmVyKCk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LWNsZWFyLXpvbmVcIiB0aXRsZT17dGhpcy5wcm9wcy5tdWx0aSA/IHRoaXMucHJvcHMuY2xlYXJBbGxUZXh0IDogdGhpcy5wcm9wcy5jbGVhclZhbHVlVGV4dH1cblx0XHRcdFx0YXJpYS1sYWJlbD17dGhpcy5wcm9wcy5tdWx0aSA/IHRoaXMucHJvcHMuY2xlYXJBbGxUZXh0IDogdGhpcy5wcm9wcy5jbGVhclZhbHVlVGV4dH1cblx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuY2xlYXJWYWx1ZX1cblx0XHRcdFx0b25Ub3VjaFN0YXJ0PXt0aGlzLmhhbmRsZVRvdWNoU3RhcnR9XG5cdFx0XHRcdG9uVG91Y2hNb3ZlPXt0aGlzLmhhbmRsZVRvdWNoTW92ZX1cblx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5oYW5kbGVUb3VjaEVuZENsZWFyVmFsdWV9XG5cdFx0XHQ+XG5cdFx0XHRcdHtjbGVhcn1cblx0XHRcdDwvc3Bhbj5cblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlckFycm93ICgpIHtcblx0XHRjb25zdCBvbk1vdXNlRG93biA9IHRoaXMuaGFuZGxlTW91c2VEb3duT25BcnJvdztcbiAgICAgICAgICAgICAgICBjb25zdCBpc09wZW4gPSB0aGlzLnN0YXRlLmlzT3Blbjtcblx0XHRjb25zdCBhcnJvdyA9IHRoaXMucHJvcHMuYXJyb3dSZW5kZXJlcih7IG9uTW91c2VEb3duLCBpc09wZW4gfSk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNwYW5cblx0XHRcdFx0Y2xhc3NOYW1lPVwiU2VsZWN0LWFycm93LXpvbmVcIlxuXHRcdFx0XHRvbk1vdXNlRG93bj17b25Nb3VzZURvd259XG5cdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRvblRvdWNoTW92ZT17dGhpcy5oYW5kbGVUb3VjaE1vdmV9XG5cdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmRPbkFycm93fVxuXHRcdFx0PlxuXHRcdFx0XHR7YXJyb3d9XG5cdFx0XHQ8L3NwYW4+XG5cdFx0KTtcblx0fSxcblxuXHRmaWx0ZXJPcHRpb25zIChleGNsdWRlT3B0aW9ucykge1xuXHRcdHZhciBmaWx0ZXJWYWx1ZSA9IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZTtcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucyB8fCBbXTtcblx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXJPcHRpb25zKSB7XG5cdFx0XHQvLyBNYWludGFpbiBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIGJvb2xlYW4gYXR0cmlidXRlXG5cdFx0XHRjb25zdCBmaWx0ZXJPcHRpb25zID0gdHlwZW9mIHRoaXMucHJvcHMuZmlsdGVyT3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdFx0XHQ/IHRoaXMucHJvcHMuZmlsdGVyT3B0aW9uc1xuXHRcdFx0XHQ6IGRlZmF1bHRGaWx0ZXJPcHRpb25zO1xuXG5cdFx0XHRyZXR1cm4gZmlsdGVyT3B0aW9ucyhcblx0XHRcdFx0b3B0aW9ucyxcblx0XHRcdFx0ZmlsdGVyVmFsdWUsXG5cdFx0XHRcdGV4Y2x1ZGVPcHRpb25zLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZmlsdGVyT3B0aW9uOiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbixcblx0XHRcdFx0XHRpZ25vcmVBY2NlbnRzOiB0aGlzLnByb3BzLmlnbm9yZUFjY2VudHMsXG5cdFx0XHRcdFx0aWdub3JlQ2FzZTogdGhpcy5wcm9wcy5pZ25vcmVDYXNlLFxuXHRcdFx0XHRcdGxhYmVsS2V5OiB0aGlzLnByb3BzLmxhYmVsS2V5LFxuXHRcdFx0XHRcdG1hdGNoUG9zOiB0aGlzLnByb3BzLm1hdGNoUG9zLFxuXHRcdFx0XHRcdG1hdGNoUHJvcDogdGhpcy5wcm9wcy5tYXRjaFByb3AsXG5cdFx0XHRcdFx0dmFsdWVLZXk6IHRoaXMucHJvcHMudmFsdWVLZXksXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdH1cblx0fSxcblxuXHRvbk9wdGlvblJlZihyZWYsIGlzRm9jdXNlZCkge1xuXHRcdGlmIChpc0ZvY3VzZWQpIHtcblx0XHRcdHRoaXMuZm9jdXNlZCA9IHJlZjtcblx0XHR9XG5cdH0sXG5cblx0cmVuZGVyTWVudSAob3B0aW9ucywgdmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbikge1xuXHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5tZW51UmVuZGVyZXIoe1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uLFxuXHRcdFx0XHRmb2N1c09wdGlvbjogdGhpcy5mb2N1c09wdGlvbixcblx0XHRcdFx0aW5zdGFuY2VQcmVmaXg6IHRoaXMuX2luc3RhbmNlUHJlZml4LFxuXHRcdFx0XHRsYWJlbEtleTogdGhpcy5wcm9wcy5sYWJlbEtleSxcblx0XHRcdFx0b25Gb2N1czogdGhpcy5mb2N1c09wdGlvbixcblx0XHRcdFx0b25TZWxlY3Q6IHRoaXMuc2VsZWN0VmFsdWUsXG5cdFx0XHRcdG9uRGVsZXRlOiB0aGlzLmRlbGV0ZU9wdGlvbixcblx0XHRcdFx0ZGVsZXRhYmxlOiB0aGlzLnByb3BzLmRlbGV0YWJsZSxcblx0XHRcdFx0b3B0aW9uQ2xhc3NOYW1lOiB0aGlzLnByb3BzLm9wdGlvbkNsYXNzTmFtZSxcblx0XHRcdFx0b3B0aW9uQ29tcG9uZW50OiB0aGlzLnByb3BzLm9wdGlvbkNvbXBvbmVudCxcblx0XHRcdFx0b3B0aW9uUmVuZGVyZXI6IHRoaXMucHJvcHMub3B0aW9uUmVuZGVyZXIgfHwgdGhpcy5nZXRPcHRpb25MYWJlbCxcblx0XHRcdFx0b3B0aW9ucyxcblx0XHRcdFx0c2VsZWN0VmFsdWU6IHRoaXMuc2VsZWN0VmFsdWUsXG5cdFx0XHRcdHZhbHVlQXJyYXksXG5cdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnByb3BzLnZhbHVlS2V5LFxuXHRcdFx0XHRvbk9wdGlvblJlZjogdGhpcy5vbk9wdGlvblJlZixcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5ub1Jlc3VsdHNUZXh0KSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlNlbGVjdC1ub3Jlc3VsdHNcIj5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5ub1Jlc3VsdHNUZXh0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fSxcblxuXHRyZW5kZXJIaWRkZW5GaWVsZCAodmFsdWVBcnJheSkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5uYW1lKSByZXR1cm47XG5cdFx0aWYgKHRoaXMucHJvcHMuam9pblZhbHVlcykge1xuXHRcdFx0bGV0IHZhbHVlID0gdmFsdWVBcnJheS5tYXAoaSA9PiBzdHJpbmdpZnlWYWx1ZShpW3RoaXMucHJvcHMudmFsdWVLZXldKSkuam9pbih0aGlzLnByb3BzLmRlbGltaXRlcik7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8aW5wdXRcblx0XHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcblx0XHRcdFx0XHRyZWY9e3JlZiA9PiB0aGlzLnZhbHVlID0gcmVmfVxuXHRcdFx0XHRcdG5hbWU9e3RoaXMucHJvcHMubmFtZX1cblx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9IC8+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVBcnJheS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG5cdFx0XHQ8aW5wdXQga2V5PXsnaGlkZGVuLicgKyBpbmRleH1cblx0XHRcdFx0dHlwZT1cImhpZGRlblwiXG5cdFx0XHRcdHJlZj17J3ZhbHVlJyArIGluZGV4fVxuXHRcdFx0XHRuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG5cdFx0XHRcdHZhbHVlPXtzdHJpbmdpZnlWYWx1ZShpdGVtW3RoaXMucHJvcHMudmFsdWVLZXldKX1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9IC8+XG5cdFx0KSk7XG5cdH0sXG5cblx0cmVuZGVyUmVxdWlyZWRNZXNzYWdlICgpIHtcblx0XHRjb25zdCBmaWVsZFJlcXVpcmVkTWVzc2FnZSA9ICdGaWVsZCBpcyByZXF1aXJlZCc7XG5cdFx0cmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cInJlcXVpcmVkLW1lc3NhZ2VcIj57ZmllbGRSZXF1aXJlZE1lc3NhZ2V9PC9zcGFuPlxuXHR9LFxuXG5cdGdldEZvY3VzYWJsZU9wdGlvbkluZGV4IChzZWxlY3RlZE9wdGlvbikge1xuXHRcdHZhciBvcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnM7XG5cdFx0aWYgKCFvcHRpb25zLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cblx0XHRsZXQgZm9jdXNlZE9wdGlvbiA9IHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbiB8fCBzZWxlY3RlZE9wdGlvbjtcblx0XHRpZiAoZm9jdXNlZE9wdGlvbiAmJiAhZm9jdXNlZE9wdGlvbi5kaXNhYmxlZCkge1xuXHRcdFx0bGV0IGZvY3VzZWRPcHRpb25JbmRleCA9IC0xO1xuXHRcdFx0b3B0aW9ucy5zb21lKChvcHRpb24sIGluZGV4KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGlzT3B0aW9uRXF1YWwgPSBvcHRpb24udmFsdWUgPT09IGZvY3VzZWRPcHRpb24udmFsdWU7XG5cdFx0XHRcdGlmIChpc09wdGlvbkVxdWFsKSB7XG5cdFx0XHRcdFx0Zm9jdXNlZE9wdGlvbkluZGV4ID0gaW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGlzT3B0aW9uRXF1YWw7XG5cdFx0XHR9KTtcblx0XHRcdGlmIChmb2N1c2VkT3B0aW9uSW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdHJldHVybiBmb2N1c2VkT3B0aW9uSW5kZXg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoIW9wdGlvbnNbaV0uZGlzYWJsZWQpIHJldHVybiBpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHRyZW5kZXJPdXRlciAob3B0aW9ucywgdmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbikge1xuXHRcdGxldCBtZW51ID0gdGhpcy5yZW5kZXJNZW51KG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pO1xuXHRcdGlmICghbWVudSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgcmVmPXtyZWYgPT4gdGhpcy5tZW51Q29udGFpbmVyID0gcmVmfSBjbGFzc05hbWU9XCJTZWxlY3QtbWVudS1vdXRlclwiIHN0eWxlPXt0aGlzLnByb3BzLm1lbnVDb250YWluZXJTdHlsZX0+XG5cdFx0XHRcdDxkaXYgcmVmPXtyZWYgPT4gdGhpcy5tZW51ID0gcmVmfSByb2xlPVwibGlzdGJveFwiIGNsYXNzTmFtZT1cIlNlbGVjdC1tZW51XCIgaWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1saXN0J31cblx0XHRcdFx0XHRcdCBzdHlsZT17dGhpcy5wcm9wcy5tZW51U3R5bGV9XG5cdFx0XHRcdFx0XHQgb25TY3JvbGw9e3RoaXMuaGFuZGxlTWVudVNjcm9sbH1cblx0XHRcdFx0XHRcdCBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd25Pbk1lbnV9PlxuXHRcdFx0XHRcdHttZW51fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyU2VsZWN0TGFiZWwgKCkge1xuXHRcdGlmKHRoaXMucHJvcHMuc2VsZWN0TGFiZWwpIHtcblx0XHRcdGxldCBjbGFzc05hbWVzID0gdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgPyAnc2VsZWN0LWZpZWxkLWxhYmVsIHNlbGVjdC1maWVsZC1sYWJlbC1mb2N1c2VkJyA6ICdzZWxlY3QtZmllbGQtbGFiZWwnO1xuXHRcdFx0cmV0dXJuIDxoMyBjbGFzc05hbWU9e2NsYXNzTmFtZXN9Pnt0aGlzLnByb3BzLnNlbGVjdExhYmVsfXt0aGlzLnByb3BzLmlzUmVxdWlyZWQgJiYgPHNwYW4gY2xhc3NOYW1lPVwicmVxdWlyZWQtYXN0ZXJpc2tcIj4gKjwvc3Bhbj59PC9oMz47XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdHJlbmRlciAoKSB7XG5cdFx0bGV0IHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0bGV0IG9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9ucyA9IHRoaXMuZmlsdGVyT3B0aW9ucyh0aGlzLnByb3BzLm11bHRpID8gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpIDogbnVsbCk7XG5cdFx0bGV0IGlzT3BlbiA9IHRoaXMuc3RhdGUuaXNPcGVuO1xuXHRcdGxldCBzaG93UmVxdWlyZWRNc2cgPSB0aGlzLnN0YXRlLnNob3dSZXF1aXJlZE1zZztcblx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSAmJiAhb3B0aW9ucy5sZW5ndGggJiYgdmFsdWVBcnJheS5sZW5ndGggJiYgIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSkgaXNPcGVuID0gZmFsc2U7XG5cdFx0Y29uc3QgZm9jdXNlZE9wdGlvbkluZGV4ID0gdGhpcy5nZXRGb2N1c2FibGVPcHRpb25JbmRleCh2YWx1ZUFycmF5WzBdKTtcblxuXHRcdGxldCBmb2N1c2VkT3B0aW9uID0gbnVsbDtcblx0XHRpZiAoZm9jdXNlZE9wdGlvbkluZGV4ICE9PSBudWxsKSB7XG5cdFx0XHRmb2N1c2VkT3B0aW9uID0gdGhpcy5fZm9jdXNlZE9wdGlvbiA9IG9wdGlvbnNbZm9jdXNlZE9wdGlvbkluZGV4XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9jdXNlZE9wdGlvbiA9IHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBudWxsO1xuXHRcdH1cblx0XHRsZXQgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygnU2VsZWN0JywgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcblx0XHRcdCdTZWxlY3QtZGFyayc6ICh0aGlzLnByb3BzLnRoZW1lID09PSAnZGFyaycpLFxuXHRcdFx0J1NlbGVjdC0tbXVsdGknOiB0aGlzLnByb3BzLm11bHRpLFxuXHRcdFx0J1NlbGVjdC0tc2luZ2xlJzogIXRoaXMucHJvcHMubXVsdGksXG5cdFx0XHQnaXMtY2xlYXJhYmxlJzogdGhpcy5wcm9wcy5jbGVhcmFibGUsXG5cdFx0XHQnaXMtZGlzYWJsZWQnOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuXHRcdFx0J2lzLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmlzRm9jdXNlZCxcblx0XHRcdCdpcy1sb2FkaW5nJzogdGhpcy5wcm9wcy5pc0xvYWRpbmcsXG5cdFx0XHQnaXMtb3Blbic6IGlzT3Blbixcblx0XHRcdCdpcy1wc2V1ZG8tZm9jdXNlZCc6IHRoaXMuc3RhdGUuaXNQc2V1ZG9Gb2N1c2VkLFxuXHRcdFx0J2lzLXNlYXJjaGFibGUnOiB0aGlzLnByb3BzLnNlYXJjaGFibGUsXG5cdFx0XHQnaGFzLXZhbHVlJzogdmFsdWVBcnJheS5sZW5ndGgsXG5cdFx0fSk7XG5cblx0XHRsZXQgcmVtb3ZlTWVzc2FnZSA9IG51bGw7XG5cdFx0aWYgKHRoaXMucHJvcHMubXVsdGkgJiZcblx0XHRcdCF0aGlzLnByb3BzLmRpc2FibGVkICYmXG5cdFx0XHR2YWx1ZUFycmF5Lmxlbmd0aCAmJlxuXHRcdFx0IXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAmJlxuXHRcdFx0dGhpcy5zdGF0ZS5pc0ZvY3VzZWQgJiZcblx0XHRcdHRoaXMucHJvcHMuYmFja3NwYWNlUmVtb3Zlcykge1xuXHRcdFx0cmVtb3ZlTWVzc2FnZSA9IChcblx0XHRcdFx0PHNwYW4gaWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1iYWNrc3BhY2UtcmVtb3ZlLW1lc3NhZ2UnfSBjbGFzc05hbWU9XCJTZWxlY3QtYXJpYS1vbmx5XCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCI+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuYmFja3NwYWNlVG9SZW1vdmVNZXNzYWdlLnJlcGxhY2UoJ3tsYWJlbH0nLCB2YWx1ZUFycmF5W3ZhbHVlQXJyYXkubGVuZ3RoIC0gMV1bdGhpcy5wcm9wcy5sYWJlbEtleV0pfVxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IHJlZj17cmVmID0+IHRoaXMud3JhcHBlciA9IHJlZn1cblx0XHRcdFx0IGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHQgc3R5bGU9e3RoaXMucHJvcHMud3JhcHBlclN0eWxlfT5cblx0XHRcdFx0IHt0aGlzLnJlbmRlclNlbGVjdExhYmVsKCl9XG5cdFx0XHRcdHt0aGlzLnJlbmRlckhpZGRlbkZpZWxkKHZhbHVlQXJyYXkpfVxuXHRcdFx0XHQ8ZGl2IHJlZj17cmVmID0+IHRoaXMuY29udHJvbCA9IHJlZn1cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJTZWxlY3QtY29udHJvbFwiXG5cdFx0XHRcdFx0c3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG5cdFx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmR9XG5cdFx0XHRcdFx0b25Ub3VjaFN0YXJ0PXt0aGlzLmhhbmRsZVRvdWNoU3RhcnR9XG5cdFx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LW11bHRpLXZhbHVlLXdyYXBwZXJcIiBpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJ30+XG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSh2YWx1ZUFycmF5LCBpc09wZW4pfVxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVySW5wdXQodmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbkluZGV4KX1cblx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0e3JlbW92ZU1lc3NhZ2V9XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyTG9hZGluZygpfVxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckNsZWFyKCl9XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3coKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHshaXNPcGVuICYmIHNob3dSZXF1aXJlZE1zZyAmJiB0aGlzLnByb3BzLmlzUmVxdWlyZWQgJiYgdGhpcy5wcm9wcy5tdWx0aSAmJiAhdmFsdWVBcnJheS5sZW5ndGggJiYgdGhpcy5yZW5kZXJSZXF1aXJlZE1lc3NhZ2UoKX1cblx0XHRcdFx0eyFpc09wZW4gJiYgc2hvd1JlcXVpcmVkTXNnICYmIHRoaXMucHJvcHMuaXNSZXF1aXJlZCAmJiAhdGhpcy5wcm9wcy5tdWx0aSAmJiAhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmIHRoaXMucmVuZGVyUmVxdWlyZWRNZXNzYWdlKCl9XG5cdFx0XHRcdHtpc09wZW4gPyB0aGlzLnJlbmRlck91dGVyKG9wdGlvbnMsICF0aGlzLnByb3BzLm11bHRpID8gdmFsdWVBcnJheSA6IG51bGwsIGZvY3VzZWRPcHRpb24pIDogbnVsbH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDtcbiJdfQ==
