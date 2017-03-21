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

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _utilsStripDiacritics = require('./utils/stripDiacritics');

var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);

var propTypes = {
	autoload: _react2['default'].PropTypes.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: _react2['default'].PropTypes.any, // object to use to cache results; set to null/false to disable caching
	children: _react2['default'].PropTypes.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: _react2['default'].PropTypes.bool, // strip diacritics when filtering; defaults to true
	ignoreCase: _react2['default'].PropTypes.bool, // perform case-insensitive filtering; defaults to true
	loadingPlaceholder: _react2['default'].PropTypes.oneOfType([// replaces the placeholder while options are loading
	_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
	loadOptions: _react2['default'].PropTypes.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	multi: _react2['default'].PropTypes.bool, // multi-value input
	options: _react.PropTypes.array.isRequired, // array of options
	placeholder: _react2['default'].PropTypes.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
	_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
	noResultsText: _react2['default'].PropTypes.oneOfType([// field noResultsText, displayed when no options come back from the server
	_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
	onChange: _react2['default'].PropTypes.func, // onChange handler: function (newValue) {}
	searchPromptText: _react2['default'].PropTypes.oneOfType([// label to prompt for search input
	_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
	onInputChange: _react2['default'].PropTypes.func, // optional for keeping track of what is being typed
	value: _react2['default'].PropTypes.any };

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
					_this3._onInputChange('');
					if (_this3.props.multi) {
						_this3.focus();
					}
					_this3.props.onChange(newValues);
				}
			};

			return children(_extends({}, this.props, props, {
				isLoading: isLoading,
				onInputChange: this._onInputChange,
				onBlur: function onBlur() {
					_this3._onInputChange('');
				}
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
};
module.exports = exports['default'];

},{"./Select":"react-select","./utils/stripDiacritics":10,"react":undefined}],2:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var AsyncCreatable = _react2['default'].createClass({
	displayName: 'AsyncCreatableSelect',

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

},{"./Select":"react-select","react":undefined}],3:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _utilsDefaultFilterOptions = require('./utils/defaultFilterOptions');

var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

var _utilsDefaultMenuRenderer = require('./utils/defaultMenuRenderer');

var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

var Creatable = _react2['default'].createClass({
	displayName: 'CreatableSelect',

	propTypes: {
		// Child function responsible for creating the inner Select component
		// This component can be used to compose HOCs (eg Creatable and Async)
		// (props: Object): PropTypes.element
		children: _react2['default'].PropTypes.func,

		// See Select.propTypes.filterOptions
		filterOptions: _react2['default'].PropTypes.any,

		// Searches for any matching option within the set of options.
		// This function prevents duplicate options from being created.
		// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
		isOptionUnique: _react2['default'].PropTypes.func,

		// Determines if the current input text represents a valid option.
		// ({ label: string }): boolean
		isValidNewOption: _react2['default'].PropTypes.func,

		// See Select.propTypes.menuRenderer
		menuRenderer: _react2['default'].PropTypes.any,

		// Factory to create new option.
		// ({ label: string, labelKey: string, valueKey: string }): Object
		newOptionCreator: _react2['default'].PropTypes.func,

		// input change handler: function (inputValue) {}
		onInputChange: _react2['default'].PropTypes.func,

		// input keyDown handler: function (event) {}
		onInputKeyDown: _react2['default'].PropTypes.func,

		// new option click handler: function (option) {}
		onNewOptionClick: _react2['default'].PropTypes.func,

		// See Select.propTypes.options
		options: _react2['default'].PropTypes.array,

		// Creates prompt/placeholder option text.
		// (filterText: string): string
		promptTextCreator: _react2['default'].PropTypes.func,

		// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
		shouldKeyDownEventCreateNewOption: _react2['default'].PropTypes.func
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

},{"./Select":"react-select","./utils/defaultFilterOptions":8,"./utils/defaultMenuRenderer":9,"react":undefined}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Option = _react2['default'].createClass({
	displayName: 'Option',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		className: _react2['default'].PropTypes.string, // className (based on mouse position)
		instancePrefix: _react2['default'].PropTypes.string.isRequired, // unique prefix for the ids (used for aria)
		isDisabled: _react2['default'].PropTypes.bool, // the option is disabled
		isFocused: _react2['default'].PropTypes.bool, // the option is focused
		isSelected: _react2['default'].PropTypes.bool, // the option is selected
		onFocus: _react2['default'].PropTypes.func, // method to handle mouseEnter on option element
		onSelect: _react2['default'].PropTypes.func, // method to handle click on option element
		onUnfocus: _react2['default'].PropTypes.func, // method to handle mouseLeave on option element
		option: _react2['default'].PropTypes.object.isRequired, // object that is base for that option
		optionIndex: _react2['default'].PropTypes.number },
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
	render: function render() {
		var _props = this.props;
		var option = _props.option;
		var instancePrefix = _props.instancePrefix;
		var optionIndex = _props.optionIndex;

		var className = (0, _classnames2['default'])(this.props.className, option.className);

		return option.disabled ? _react2['default'].createElement(
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

},{"classnames":undefined,"react":undefined}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Value = _react2['default'].createClass({

	displayName: 'Value',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		disabled: _react2['default'].PropTypes.bool, // disabled prop passed to ReactSelect
		id: _react2['default'].PropTypes.string, // Unique id for the value - used for aria
		onClick: _react2['default'].PropTypes.func, // method to handle click on value label
		onRemove: _react2['default'].PropTypes.func, // method to handle removal of the value
		value: _react2['default'].PropTypes.object.isRequired },

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

},{"classnames":undefined,"react":undefined}],6:[function(require,module,exports){
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

},{}],"react-select":[function(require,module,exports){
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

var stringOrNode = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]);

var instanceId = 1;

var Select = _react2['default'].createClass({

	displayName: 'Select',

	propTypes: {
		addLabelText: _react2['default'].PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
		'aria-label': _react2['default'].PropTypes.string, // Aria label (for assistive tech)
		'aria-labelledby': _react2['default'].PropTypes.string, // HTML ID of an element that should be used as the label (for assistive tech)
		arrowRenderer: _react2['default'].PropTypes.func, // Create drop-down caret element
		autoBlur: _react2['default'].PropTypes.bool, // automatically blur the component when an option is selected
		autofocus: _react2['default'].PropTypes.bool, // autofocus the component on mount
		autosize: _react2['default'].PropTypes.bool, // whether to enable autosizing or not
		backspaceRemoves: _react2['default'].PropTypes.bool, // whether backspace removes an item if there is no text input
		backspaceToRemoveMessage: _react2['default'].PropTypes.string, // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
		className: _react2['default'].PropTypes.string, // className for the outer element
		clearAllText: stringOrNode, // title for the "clear" control when multi: true
		clearRenderer: _react2['default'].PropTypes.func, // create clearable x element
		clearValueText: stringOrNode, // title for the "clear" control
		clearable: _react2['default'].PropTypes.bool, // should it be possible to reset value
		deleteRemoves: _react2['default'].PropTypes.bool, // whether backspace removes an item if there is no text input
		delimiter: _react2['default'].PropTypes.string, // delimiter to use to join multiple values for the hidden field value
		disabled: _react2['default'].PropTypes.bool, // whether the Select is disabled or not
		escapeClearsValue: _react2['default'].PropTypes.bool, // whether escape clears the value when the menu is closed
		filterOption: _react2['default'].PropTypes.func, // method to filter a single option (option, filterString)
		filterOptions: _react2['default'].PropTypes.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
		ignoreAccents: _react2['default'].PropTypes.bool, // whether to strip diacritics when filtering
		ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering
		inputProps: _react2['default'].PropTypes.object, // custom attributes for the Input
		inputRenderer: _react2['default'].PropTypes.func, // returns a custom input component
		instanceId: _react2['default'].PropTypes.string, // set the components instanceId
		isLoading: _react2['default'].PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
		joinValues: _react2['default'].PropTypes.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
		labelKey: _react2['default'].PropTypes.string, // path of the label value in option objects
		matchPos: _react2['default'].PropTypes.string, // (any|start) match the start or entire string when filtering
		matchProp: _react2['default'].PropTypes.string, // (any|label|value) which option property to filter on
		menuBuffer: _react2['default'].PropTypes.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
		menuContainerStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu container
		menuRenderer: _react2['default'].PropTypes.func, // renders a custom menu with options
		menuStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu
		multi: _react2['default'].PropTypes.bool, // multi-value input
		name: _react2['default'].PropTypes.string, // generates a hidden <input /> tag with this field name for html forms
		noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
		onBlur: _react2['default'].PropTypes.func, // onBlur handler: function (event) {}
		onBlurResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared on blur
		onChange: _react2['default'].PropTypes.func, // onChange handler: function (newValue) {}
		onClose: _react2['default'].PropTypes.func, // fires when the menu is closed
		onCloseResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared when menu is closed through the arrow
		onFocus: _react2['default'].PropTypes.func, // onFocus handler: function (event) {}
		onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function (inputValue) {}
		onInputKeyDown: _react2['default'].PropTypes.func, // input keyDown handler: function (event) {}
		onMenuScrollToBottom: _react2['default'].PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
		onOpen: _react2['default'].PropTypes.func, // fires when the menu is opened
		onValueClick: _react2['default'].PropTypes.func, // onClick handler for value labels: function (value, event) {}
		openAfterFocus: _react2['default'].PropTypes.bool, // boolean to enable opening dropdown when focused
		openOnFocus: _react2['default'].PropTypes.bool, // always open options menu on focus
		optionClassName: _react2['default'].PropTypes.string, // additional class(es) to apply to the <Option /> elements
		optionComponent: _react2['default'].PropTypes.func, // option component to render in dropdown
		optionRenderer: _react2['default'].PropTypes.func, // optionRenderer: function (option) {}
		options: _react2['default'].PropTypes.array, // array of options
		pageSize: _react2['default'].PropTypes.number, // number of entries to page when using page up/down keys
		placeholder: stringOrNode, // field placeholder, displayed when there's no value
		required: _react2['default'].PropTypes.bool, // applies HTML5 required attribute when needed
		resetValue: _react2['default'].PropTypes.any, // value to use when you clear the control
		scrollMenuIntoView: _react2['default'].PropTypes.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
		searchable: _react2['default'].PropTypes.bool, // whether to enable searching feature or not
		simpleValue: _react2['default'].PropTypes.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
		style: _react2['default'].PropTypes.object, // optional style to apply to the control
		tabIndex: _react2['default'].PropTypes.string, // optional tab index of the control
		tabSelectsValue: _react2['default'].PropTypes.bool, // whether to treat tabbing out while focused to be value selection
		value: _react2['default'].PropTypes.any, // initial field value
		valueComponent: _react2['default'].PropTypes.func, // value component to render
		valueKey: _react2['default'].PropTypes.string, // path of the label value in option objects
		valueRenderer: _react2['default'].PropTypes.func, // valueRenderer: function (option) {}
		wrapperStyle: _react2['default'].PropTypes.object },

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
			deleteRemoves: true,
			delimiter: ',',
			disabled: false,
			escapeClearsValue: true,
			filterOptions: _utilsDefaultFilterOptions2['default'],
			ignoreAccents: true,
			ignoreCase: true,
			inputProps: {},
			isLoading: false,
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
			openAfterFocus: false,
			optionComponent: _Option2['default'],
			pageSize: 5,
			placeholder: 'Select...',
			required: false,
			scrollMenuIntoView: true,
			searchable: true,
			simpleValue: false,
			tabSelectsValue: true,
			valueComponent: _Value2['default'],
			valueKey: 'value'
		};
	},

	getInitialState: function getInitialState() {
		return {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false
		};
	},

	componentWillMount: function componentWillMount() {
		this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
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

		if (this.props.openAfterFocus) {
			this.setState({
				isOpen: true
			});
		}
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
			this._openAfterFocus = this.props.openOnFocus;
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

			return _react2['default'].createElement('div', _extends({}, divProps, {
				role: 'combobox',
				'aria-expanded': isOpen,
				'aria-owns': isOpen ? this._instancePrefix + '-list' : this._instancePrefix + '-value',
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
		if (!this.props.clearable || !this.props.value || this.props.value === 0 || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
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
				onMouseDown: onMouseDown
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

	render: function render() {
		var _this8 = this;

		var valueArray = this.getValueArray(this.props.value);
		var options = this._visibleOptions = this.filterOptions(this.props.multi ? this.getValueArray(this.props.value) : null);
		var isOpen = this.state.isOpen;
		if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
		var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

		var focusedOption = null;
		if (focusedOptionIndex !== null) {
			focusedOption = this._focusedOption = options[focusedOptionIndex];
		} else {
			focusedOption = this._focusedOption = null;
		}
		var className = (0, _classnames2['default'])('Select', this.props.className, {
			'Select--multi': this.props.multi,
			'Select--single': !this.props.multi,
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
			isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null
		);
	}

});

exports['default'] = Select;
module.exports = exports['default'];

},{"./Async":1,"./AsyncCreatable":2,"./Creatable":3,"./Option":4,"./Value":5,"./utils/defaultArrowRenderer":6,"./utils/defaultClearRenderer":7,"./utils/defaultFilterOptions":8,"./utils/defaultMenuRenderer":9,"classnames":undefined,"react":undefined,"react-dom":undefined,"react-input-autosize":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy92YWtuaW5pci9yZWFjdC1zZWxlY3QtZGVrZWwvcmVhY3Qtc2VsZWN0L3NyYy9Bc3luYy5qcyIsIkM6L1VzZXJzL3Zha25pbmlyL3JlYWN0LXNlbGVjdC1kZWtlbC9yZWFjdC1zZWxlY3Qvc3JjL0FzeW5jQ3JlYXRhYmxlLmpzIiwiQzovVXNlcnMvdmFrbmluaXIvcmVhY3Qtc2VsZWN0LWRla2VsL3JlYWN0LXNlbGVjdC9zcmMvQ3JlYXRhYmxlLmpzIiwiQzovVXNlcnMvdmFrbmluaXIvcmVhY3Qtc2VsZWN0LWRla2VsL3JlYWN0LXNlbGVjdC9zcmMvT3B0aW9uLmpzIiwiQzovVXNlcnMvdmFrbmluaXIvcmVhY3Qtc2VsZWN0LWRla2VsL3JlYWN0LXNlbGVjdC9zcmMvVmFsdWUuanMiLCJDOi9Vc2Vycy92YWtuaW5pci9yZWFjdC1zZWxlY3QtZGVrZWwvcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0QXJyb3dSZW5kZXJlci5qcyIsIkM6L1VzZXJzL3Zha25pbmlyL3JlYWN0LXNlbGVjdC1kZWtlbC9yZWFjdC1zZWxlY3Qvc3JjL3V0aWxzL2RlZmF1bHRDbGVhclJlbmRlcmVyLmpzIiwiQzovVXNlcnMvdmFrbmluaXIvcmVhY3Qtc2VsZWN0LWRla2VsL3JlYWN0LXNlbGVjdC9zcmMvdXRpbHMvZGVmYXVsdEZpbHRlck9wdGlvbnMuanMiLCJDOi9Vc2Vycy92YWtuaW5pci9yZWFjdC1zZWxlY3QtZGVrZWwvcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyLmpzIiwiQzovVXNlcnMvdmFrbmluaXIvcmVhY3Qtc2VsZWN0LWRla2VsL3JlYWN0LXNlbGVjdC9zcmMvdXRpbHMvc3RyaXBEaWFjcml0aWNzLmpzIiwiQzovVXNlcnMvdmFrbmluaXIvcmVhY3Qtc2VsZWN0LWRla2VsL3JlYWN0LXNlbGVjdC9zcmMvU2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDQTRDLE9BQU87Ozs7c0JBQ2hDLFVBQVU7Ozs7b0NBQ0QseUJBQXlCOzs7O0FBRXJELElBQU0sU0FBUyxHQUFHO0FBQ2pCLFNBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDekMsTUFBSyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxHQUFHO0FBQzFCLFNBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDekMsY0FBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ25DLFdBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxtQkFBa0IsRUFBRSxtQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDO0FBQzdDLG9CQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQ3RCLG1CQUFNLFNBQVMsQ0FBQyxJQUFJLENBQ3BCLENBQUM7QUFDRixZQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzVDLE1BQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMzQixRQUFPLEVBQUUsaUJBQVUsS0FBSyxDQUFDLFVBQVU7QUFDbkMsWUFBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFDdEMsb0JBQU0sU0FBUyxDQUFDLE1BQU0sRUFDdEIsbUJBQU0sU0FBUyxDQUFDLElBQUksQ0FDcEIsQ0FBQztBQUNGLGNBQWEsRUFBRSxtQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDO0FBQ3hDLG9CQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQ3RCLG1CQUFNLFNBQVMsQ0FBQyxJQUFJLENBQ3BCLENBQUM7QUFDRixTQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsaUJBQWdCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUMzQyxvQkFBTSxTQUFTLENBQUMsTUFBTSxFQUN0QixtQkFBTSxTQUFTLENBQUMsSUFBSSxDQUNwQixDQUFDO0FBQ0YsY0FBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ25DLE1BQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsR0FBRyxFQUMxQixDQUFDOzs7QUFFRixJQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7O0FBRXhCLElBQU0sWUFBWSxHQUFHO0FBQ3BCLFNBQVEsRUFBRSxJQUFJO0FBQ2QsTUFBSyxFQUFFLFlBQVk7QUFDbkIsU0FBUSxFQUFFLGVBQWU7QUFDekIsY0FBYSxFQUFFLElBQUk7QUFDbkIsV0FBVSxFQUFFLElBQUk7QUFDaEIsbUJBQWtCLEVBQUUsWUFBWTtBQUNoQyxRQUFPLEVBQUUsRUFBRTtBQUNYLGlCQUFnQixFQUFFLGdCQUFnQjtDQUNsQyxDQUFDOztJQUVtQixLQUFLO1dBQUwsS0FBSzs7QUFDYixVQURRLEtBQUssQ0FDWixLQUFLLEVBQUUsT0FBTyxFQUFFO3dCQURULEtBQUs7O0FBRXhCLDZCQUZtQixLQUFLLDZDQUVsQixLQUFLLEVBQUUsT0FBTyxFQUFFOztBQUV0QixNQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEtBQUssWUFBWSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDOztBQUU5RCxNQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1osWUFBUyxFQUFFLEtBQUs7QUFDaEIsVUFBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO0dBQ3RCLENBQUM7O0FBRUYsTUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNyRDs7Y0FabUIsS0FBSzs7U0FjUCw2QkFBRztPQUNaLFFBQVEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUF2QixRQUFROztBQUVoQixPQUFJLFFBQVEsRUFBRTtBQUNiLFFBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckI7R0FDRDs7O1NBRW1CLDZCQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUU7OztBQUMxQyxPQUFNLGdCQUFnQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsbUJBQWdCLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2xDLFFBQUksTUFBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pDLFdBQUssUUFBUSxxQkFDWCxJQUFJLEVBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUN0QixDQUFDO0tBQ0g7SUFDRCxDQUFDLENBQUM7R0FDSDs7O1NBRVcsd0JBQUc7QUFDZCxPQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDL0I7OztTQUVXLHFCQUFDLFVBQVUsRUFBRTs7O09BQ2hCLFdBQVcsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUExQixXQUFXOztBQUNuQixPQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUUxQixPQUNDLEtBQUssSUFDTCxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUMvQjtBQUNELFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDYixZQUFPLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQztLQUMxQixDQUFDLENBQUM7O0FBRUgsV0FBTztJQUNQOztBQUVELE9BQU0sUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFJLEtBQUssRUFBRSxJQUFJLEVBQUs7QUFDakMsUUFBSSxRQUFRLEtBQUssT0FBSyxTQUFTLEVBQUU7QUFDaEMsWUFBSyxTQUFTLEdBQUcsSUFBSSxDQUFDOztBQUV0QixTQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7O0FBRTNDLFNBQUksS0FBSyxFQUFFO0FBQ1YsV0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztNQUM1Qjs7QUFFRCxZQUFLLFFBQVEsQ0FBQztBQUNiLGVBQVMsRUFBRSxLQUFLO0FBQ2hCLGFBQU8sRUFBUCxPQUFPO01BQ1AsQ0FBQyxDQUFDO0tBQ0g7SUFDRCxDQUFDOzs7QUFHRixPQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQzs7QUFFMUIsT0FBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRCxPQUFJLE9BQU8sRUFBRTtBQUNaLFdBQU8sQ0FBQyxJQUFJLENBQ1gsVUFBQyxJQUFJO1lBQUssUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7S0FBQSxFQUM5QixVQUFDLEtBQUs7WUFBSyxRQUFRLENBQUMsS0FBSyxDQUFDO0tBQUEsQ0FDMUIsQ0FBQztJQUNGOztBQUVELE9BQ0MsSUFBSSxDQUFDLFNBQVMsSUFDZCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUNwQjtBQUNELFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDYixjQUFTLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQztJQUNIOztBQUVELFVBQU8sVUFBVSxDQUFDO0dBQ2xCOzs7U0FFYyx3QkFBQyxVQUFVLEVBQUU7Z0JBQzBCLElBQUksQ0FBQyxLQUFLO09BQXZELGFBQWEsVUFBYixhQUFhO09BQUUsVUFBVSxVQUFWLFVBQVU7T0FBRSxhQUFhLFVBQWIsYUFBYTs7QUFFaEQsT0FBSSxhQUFhLEVBQUU7QUFDbEIsY0FBVSxHQUFHLHVDQUFnQixVQUFVLENBQUMsQ0FBQztJQUN6Qzs7QUFFRCxPQUFJLFVBQVUsRUFBRTtBQUNmLGNBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEM7O0FBRUQsT0FBSSxhQUFhLEVBQUU7QUFDbEIsaUJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxQjs7QUFFRCxVQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7R0FDcEM7OztTQUVTLHNCQUFHO0FBQ1osT0FBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2hCLFdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ3BDO0FBQ0QsVUFBTyxFQUFFLENBQUM7R0FDVjs7O1NBRVkseUJBQUc7aUJBQ2lELElBQUksQ0FBQyxLQUFLO09BQWxFLGtCQUFrQixXQUFsQixrQkFBa0I7T0FBRSxhQUFhLFdBQWIsYUFBYTtPQUFFLGdCQUFnQixXQUFoQixnQkFBZ0I7T0FDbkQsU0FBUyxHQUFLLElBQUksQ0FBQyxLQUFLLENBQXhCLFNBQVM7O0FBRWpCLE9BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7QUFFckMsT0FBSSxTQUFTLEVBQUU7QUFDZCxXQUFPLGtCQUFrQixDQUFDO0lBQzFCO0FBQ0QsT0FBSSxVQUFVLElBQUksYUFBYSxFQUFFO0FBQ2hDLFdBQU8sYUFBYSxDQUFDO0lBQ3JCO0FBQ0QsVUFBTyxnQkFBZ0IsQ0FBQztHQUN4Qjs7O1NBRUssaUJBQUc7QUFDUixPQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0dBQ3BCOzs7U0FFTSxrQkFBRzs7O2lCQUM2QyxJQUFJLENBQUMsS0FBSztPQUF4RCxRQUFRLFdBQVIsUUFBUTtPQUFFLGtCQUFrQixXQUFsQixrQkFBa0I7T0FBRSxXQUFXLFdBQVgsV0FBVztnQkFDbEIsSUFBSSxDQUFDLEtBQUs7T0FBakMsU0FBUyxVQUFULFNBQVM7T0FBRSxPQUFPLFVBQVAsT0FBTzs7QUFFMUIsT0FBTSxLQUFLLEdBQUc7QUFDYixpQkFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDbkMsZUFBVyxFQUFFLFNBQVMsR0FBRyxrQkFBa0IsR0FBRyxXQUFXO0FBQ3pELFdBQU8sRUFBRSxBQUFDLFNBQVMsSUFBSSxrQkFBa0IsR0FBSSxFQUFFLEdBQUcsT0FBTztBQUN6RCxPQUFHLEVBQUUsYUFBQyxJQUFHO1lBQU0sT0FBSyxNQUFNLEdBQUcsSUFBRztLQUFDO0FBQ2pDLFlBQVEsRUFBRSxrQkFBQyxTQUFTLEVBQUs7QUFDeEIsWUFBSyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDeEIsU0FBSSxPQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDckIsYUFBSyxLQUFLLEVBQUUsQ0FBQztNQUNiO0FBQ0QsWUFBSyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsQ0FBQzs7QUFFRixVQUFPLFFBQVEsY0FDWCxJQUFJLENBQUMsS0FBSyxFQUNWLEtBQUs7QUFDUixhQUFTLEVBQVQsU0FBUztBQUNULGlCQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7QUFDbEMsVUFBTSxFQUFFLGtCQUFNO0FBQUUsWUFBSyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7S0FBRztNQUMxQyxDQUFDO0dBQ0g7OztRQWpLbUIsS0FBSzs7O3FCQUFMLEtBQUs7O0FBb0sxQixLQUFLLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUM1QixLQUFLLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQzs7QUFFbEMsU0FBUyxlQUFlLENBQUUsS0FBSyxFQUFFO0FBQ2hDLFFBQ0Msc0RBQVksS0FBSyxDQUFJLENBQ3BCO0NBQ0YsQ0FBQzs7Ozs7Ozs7OztxQkMxTmdCLE9BQU87Ozs7c0JBQ04sVUFBVTs7OztBQUU3QixTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQWE7S0FBWCxLQUFLLHlEQUFHLEVBQUU7O0FBQzdCLFFBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDdEIsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBSztBQUN0QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsTUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDNUMsU0FBTyxLQUFLLENBQUM7RUFDZCxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ1g7O0FBRUQsSUFBTSxjQUFjLEdBQUcsbUJBQU0sV0FBVyxDQUFDO0FBQ3hDLFlBQVcsRUFBRSxzQkFBc0I7O0FBRW5DLE9BQU0sRUFBQyxrQkFBRzs7O0FBQ1QsU0FDQztBQUFDLHVCQUFPLEtBQUs7R0FBSyxJQUFJLENBQUMsS0FBSztHQUMxQixVQUFDLFVBQVU7V0FDWDtBQUFDLHlCQUFPLFNBQVM7S0FBSyxNQUFLLEtBQUs7S0FDOUIsVUFBQyxjQUFjO2FBQ2YsbUVBQ0ssTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELG9CQUFhLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDekIsc0JBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsZUFBTyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLEFBQUM7QUFDRixVQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUs7QUFDYixzQkFBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QixrQkFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixBQUFDO1NBQ0Q7TUFDRjtLQUNpQjtJQUNuQjtHQUNhLENBQ2Q7RUFDRjtDQUNELENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7cUJDeENkLE9BQU87Ozs7c0JBQ04sVUFBVTs7Ozt5Q0FDSSw4QkFBOEI7Ozs7d0NBQy9CLDZCQUE2Qjs7OztBQUU3RCxJQUFNLFNBQVMsR0FBRyxtQkFBTSxXQUFXLENBQUM7QUFDbkMsWUFBVyxFQUFFLGlCQUFpQjs7QUFFOUIsVUFBUyxFQUFFOzs7O0FBSVYsVUFBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJOzs7QUFHOUIsZUFBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxHQUFHOzs7OztBQUtsQyxnQkFBYyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJOzs7O0FBSWpDLGtCQUFnQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJOzs7QUFHekMsY0FBWSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxHQUFHOzs7O0FBSWpDLGtCQUFnQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJOzs7QUFHdEMsZUFBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJOzs7QUFHbkMsZ0JBQWMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTs7O0FBR3BDLGtCQUFnQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJOzs7QUFHdEMsU0FBTyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLOzs7O0FBSTlCLG1CQUFpQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJOzs7QUFHdkMsbUNBQWlDLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7RUFDdkQ7OztBQUdELFFBQU8sRUFBRTtBQUNSLGdCQUFjLEVBQWQsY0FBYztBQUNkLGtCQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIsa0JBQWdCLEVBQWhCLGdCQUFnQjtBQUNoQixtQkFBaUIsRUFBakIsaUJBQWlCO0FBQ2pCLG1DQUFpQyxFQUFqQyxpQ0FBaUM7RUFDakM7O0FBRUQsZ0JBQWUsRUFBQywyQkFBRztBQUNsQixTQUFPO0FBQ04sZ0JBQWEsd0NBQXNCO0FBQ25DLGlCQUFjLEVBQWQsY0FBYztBQUNkLG1CQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIsZUFBWSx1Q0FBcUI7QUFDakMsbUJBQWdCLEVBQWhCLGdCQUFnQjtBQUNoQixvQkFBaUIsRUFBakIsaUJBQWlCO0FBQ2pCLG9DQUFpQyxFQUFqQyxpQ0FBaUM7R0FDakMsQ0FBQztFQUNGOztBQUVELGdCQUFlLEVBQUMsMkJBQUc7ZUFPZCxJQUFJLENBQUMsS0FBSztNQUxiLGdCQUFnQixVQUFoQixnQkFBZ0I7TUFDaEIsZ0JBQWdCLFVBQWhCLGdCQUFnQjtNQUNoQixnQkFBZ0IsVUFBaEIsZ0JBQWdCOzhCQUNoQixPQUFPO01BQVAsT0FBTyxrQ0FBRyxFQUFFO01BQ1osaUNBQWlDLFVBQWpDLGlDQUFpQzs7QUFHbEMsTUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRTtBQUNqRCxPQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUM5RyxPQUFNLGVBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxDQUFDLENBQUM7OztBQUd2RCxPQUFJLGVBQWMsRUFBRTtBQUNuQixRQUFJLGdCQUFnQixFQUFFO0FBQ3JCLHFCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3pCLE1BQU07QUFDTixZQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV4QixTQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNoQztJQUNEO0dBQ0Q7RUFDRDs7QUFFRCxjQUFhLEVBQUMseUJBQVk7Z0JBQytDLElBQUksQ0FBQyxLQUFLO01BQTFFLGFBQWEsV0FBYixhQUFhO01BQUUsZ0JBQWdCLFdBQWhCLGdCQUFnQjtNQUFFLE9BQU8sV0FBUCxPQUFPO01BQUUsaUJBQWlCLFdBQWpCLGlCQUFpQjs7Ozs7QUFLbkUsTUFBTSxjQUFjLEdBQUcsVUFBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRXZDLE1BQU0sZUFBZSxHQUFHLGFBQWEsNEJBQVcsSUFBSSxFQUFFLENBQUM7O0FBRXZELE1BQUksZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUU7T0FDekMsaUJBQWdCLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBL0IsZ0JBQWdCOztBQUV4QixPQUFNLE1BQU0sR0FBRyxpQkFBZ0IsQ0FBQztBQUMvQixTQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVU7QUFDdEIsWUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO0FBQ3ZCLFlBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtJQUN2QixDQUFDLENBQUM7Ozs7QUFJSCxPQUFNLGdCQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztBQUMxQyxVQUFNLEVBQU4sTUFBTTtBQUNOLFdBQU8sRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUMvQyxDQUFDLENBQUM7O0FBRUgsT0FBSSxnQkFBYyxFQUFFO0FBQ25CLFFBQU0sT0FBTSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFbEQsUUFBSSxDQUFDLHdCQUF3QixHQUFHLGlCQUFnQixDQUFDO0FBQ2hELFVBQUssRUFBRSxPQUFNO0FBQ2IsYUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO0FBQ3ZCLGFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtLQUN2QixDQUFDLENBQUM7O0FBRUgsbUJBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDdkQ7R0FDRDs7QUFFRCxTQUFPLGVBQWUsQ0FBQztFQUN2Qjs7QUFFRCxlQUFjLEVBQUMsd0JBQUMsS0FHZixFQUFFO01BRkYsTUFBTSxHQURTLEtBR2YsQ0FGQSxNQUFNO01BQ04sT0FBTyxHQUZRLEtBR2YsQ0FEQSxPQUFPO01BRUMsY0FBYyxHQUFLLElBQUksQ0FBQyxLQUFLLENBQTdCLGNBQWM7O0FBRXRCLFNBQU8sR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7QUFFakQsU0FBTyxjQUFjLENBQUM7QUFDckIsV0FBUSxFQUFFLElBQUksQ0FBQyxRQUFRO0FBQ3ZCLFNBQU0sRUFBTixNQUFNO0FBQ04sVUFBTyxFQUFQLE9BQU87QUFDUCxXQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7R0FDdkIsQ0FBQyxDQUFDO0VBQ0g7O0FBRUQsYUFBWSxFQUFDLHNCQUFDLE1BQU0sRUFBRTtNQUNiLFlBQVksR0FBSyxJQUFJLENBQUMsS0FBSyxDQUEzQixZQUFZOztBQUVwQixTQUFPLFlBQVksY0FDZixNQUFNO0FBQ1QsV0FBUSxFQUFFLElBQUksQ0FBQyxjQUFjO0FBQzdCLGNBQVcsRUFBRSxJQUFJLENBQUMsY0FBYztLQUMvQixDQUFDO0VBQ0g7O0FBRUQsY0FBYSxFQUFDLHVCQUFDLEtBQUssRUFBRTtNQUNiLGFBQWEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUE1QixhQUFhOztBQUVyQixNQUFJLGFBQWEsRUFBRTtBQUNsQixnQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3JCOzs7QUFHRCxNQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztFQUN4Qjs7QUFFRCxlQUFjLEVBQUMsd0JBQUMsS0FBSyxFQUFFO2dCQUN3QyxJQUFJLENBQUMsS0FBSztNQUFoRSxpQ0FBaUMsV0FBakMsaUNBQWlDO01BQUUsY0FBYyxXQUFkLGNBQWM7O0FBQ3pELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7QUFFckQsTUFDQyxhQUFhLElBQ2IsYUFBYSxLQUFLLElBQUksQ0FBQyx3QkFBd0IsSUFDL0MsaUNBQWlDLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQzVEO0FBQ0QsT0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7QUFHdkIsUUFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0dBQ3ZCLE1BQU0sSUFBSSxjQUFjLEVBQUU7QUFDMUIsaUJBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUN0QjtFQUNEOztBQUVELGVBQWMsRUFBQyx3QkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQzlCLE1BQUksTUFBTSxLQUFLLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtBQUM3QyxPQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7R0FDdkIsTUFBTTtBQUNOLE9BQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ2hDO0VBQ0Q7O0FBRUQsT0FBTSxFQUFDLGtCQUFHOzs7Z0JBS0wsSUFBSSxDQUFDLEtBQUs7TUFIYixnQkFBZ0IsV0FBaEIsZ0JBQWdCO01BQ2hCLGlDQUFpQyxXQUFqQyxpQ0FBaUM7O01BQzlCLFNBQVM7O01BR1AsUUFBUSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQXZCLFFBQVE7Ozs7O0FBS2QsTUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNkLFdBQVEsR0FBRyxlQUFlLENBQUM7R0FDM0I7O0FBRUQsTUFBTSxLQUFLLGdCQUNQLFNBQVM7QUFDWixjQUFXLEVBQUUsSUFBSTtBQUNqQixnQkFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO0FBQ2pDLGVBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtBQUMvQixnQkFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO0FBQ2pDLGlCQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7QUFDbkMsTUFBRyxFQUFFLGFBQUMsSUFBRyxFQUFLO0FBQ2IsVUFBSyxNQUFNLEdBQUcsSUFBRyxDQUFDOzs7QUFHbEIsUUFBSSxJQUFHLEVBQUU7QUFDUixXQUFLLFFBQVEsR0FBRyxJQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztBQUNuQyxXQUFLLFFBQVEsR0FBRyxJQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztLQUNuQztJQUNEO0lBQ0QsQ0FBQzs7QUFFRixTQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUN2QjtDQUNELENBQUMsQ0FBQzs7QUFFSCxTQUFTLGVBQWUsQ0FBRSxLQUFLLEVBQUU7QUFDaEMsUUFDQyxzREFBWSxLQUFLLENBQUksQ0FDcEI7Q0FDRixDQUFDOztBQUVGLFNBQVMsY0FBYyxDQUFFLEtBQXVDLEVBQUU7S0FBdkMsTUFBTSxHQUFSLEtBQXVDLENBQXJDLE1BQU07S0FBRSxPQUFPLEdBQWpCLEtBQXVDLENBQTdCLE9BQU87S0FBRSxRQUFRLEdBQTNCLEtBQXVDLENBQXBCLFFBQVE7S0FBRSxRQUFRLEdBQXJDLEtBQXVDLENBQVYsUUFBUTs7QUFDN0QsUUFBTyxPQUFPLENBQ1osTUFBTSxDQUFDLFVBQUMsY0FBYztTQUN0QixjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUM3QyxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQztFQUFBLENBQzdDLENBQ0EsTUFBTSxLQUFLLENBQUMsQ0FBQztDQUNmLENBQUM7O0FBRUYsU0FBUyxnQkFBZ0IsQ0FBRSxLQUFTLEVBQUU7S0FBVCxLQUFLLEdBQVAsS0FBUyxDQUFQLEtBQUs7O0FBQ2pDLFFBQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztDQUNmLENBQUM7O0FBRUYsU0FBUyxnQkFBZ0IsQ0FBRSxLQUE2QixFQUFFO0tBQTdCLEtBQUssR0FBUCxLQUE2QixDQUEzQixLQUFLO0tBQUUsUUFBUSxHQUFqQixLQUE2QixDQUFwQixRQUFRO0tBQUUsUUFBUSxHQUEzQixLQUE2QixDQUFWLFFBQVE7O0FBQ3JELEtBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNsQixPQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLE9BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDekIsT0FBTSxDQUFDLFNBQVMsR0FBRyxrQ0FBa0MsQ0FBQztBQUN0RCxRQUFPLE1BQU0sQ0FBQztDQUNmLENBQUM7O0FBRUYsU0FBUyxpQkFBaUIsQ0FBRSxLQUFLLEVBQUU7QUFDbEMsNEJBQXlCLEtBQUssT0FBSTtDQUNsQzs7QUFFRCxTQUFTLGlDQUFpQyxDQUFFLEtBQVcsRUFBRTtLQUFYLE9BQU8sR0FBVCxLQUFXLENBQVQsT0FBTzs7QUFDcEQsU0FBUSxPQUFPO0FBQ2QsT0FBSyxDQUFDLENBQUM7QUFDUCxPQUFLLEVBQUUsQ0FBQztBQUNSLE9BQUssR0FBRzs7QUFDUCxVQUFPLElBQUksQ0FBQztBQUFBLEVBQ2I7O0FBRUQsUUFBTyxLQUFLLENBQUM7Q0FDYixDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDOzs7Ozs7O3FCQzdSVCxPQUFPOzs7OzBCQUNGLFlBQVk7Ozs7QUFFbkMsSUFBTSxNQUFNLEdBQUcsbUJBQU0sV0FBVyxDQUFDOzs7QUFDaEMsVUFBUyxFQUFFO0FBQ1YsVUFBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLFdBQVMsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyxnQkFBYyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUNqRCxZQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsV0FBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQy9CLFlBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxTQUFPLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDN0IsVUFBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLFdBQVMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixRQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3pDLGFBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxFQUNuQzs7QUFDRCxXQUFVLEVBQUMsb0JBQUMsS0FBSyxFQUFFO0FBQ2xCLE9BQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QixPQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDeEIsTUFBSSxBQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLEdBQUcsSUFBSyxFQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFBLEFBQUMsRUFBRTtBQUNoRSxVQUFPO0dBQ1A7QUFDRCxNQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ3hCLFNBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUNwRCxNQUFNO0FBQ04sU0FBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7R0FDekM7RUFDRDs7QUFFRCxnQkFBZSxFQUFDLHlCQUFDLEtBQUssRUFBRTtBQUN2QixPQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsT0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3hCLE1BQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0VBQzlDOztBQUVELGlCQUFnQixFQUFDLDBCQUFDLEtBQUssRUFBRTtBQUN4QixNQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3BCOztBQUVELGdCQUFlLEVBQUMseUJBQUMsS0FBSyxFQUFFO0FBQ3ZCLE1BQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDcEI7O0FBRUQsZUFBYyxFQUFBLHdCQUFDLEtBQUssRUFBQzs7O0FBR3BCLE1BQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPOztBQUV6QixNQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQzVCOztBQUVELGdCQUFlLEVBQUMseUJBQUMsS0FBSyxFQUFFOztBQUV2QixNQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztFQUNyQjs7QUFFRCxpQkFBZ0IsRUFBQywwQkFBQyxLQUFLLEVBQUU7O0FBRXhCLE1BQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0VBQ3RCOztBQUVELFFBQU8sRUFBQyxpQkFBQyxLQUFLLEVBQUU7QUFDZixNQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDMUIsT0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDN0M7RUFDRDtBQUNELE9BQU0sRUFBQyxrQkFBRztlQUNxQyxJQUFJLENBQUMsS0FBSztNQUFsRCxNQUFNLFVBQU4sTUFBTTtNQUFFLGNBQWMsVUFBZCxjQUFjO01BQUUsV0FBVyxVQUFYLFdBQVc7O0FBQ3pDLE1BQUksU0FBUyxHQUFHLDZCQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbkUsU0FBTyxNQUFNLENBQUMsUUFBUSxHQUNyQjs7S0FBSyxTQUFTLEVBQUUsU0FBUyxBQUFDO0FBQ3pCLGVBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxBQUFDO0FBQzdCLFdBQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxBQUFDO0dBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtHQUNmLEdBRU47O0tBQUssU0FBUyxFQUFFLFNBQVMsQUFBQztBQUN6QixTQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQUFBQztBQUNwQixRQUFJLEVBQUMsUUFBUTtBQUNiLGVBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxBQUFDO0FBQ2xDLGdCQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixBQUFDO0FBQ3BDLGVBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxBQUFDO0FBQ2xDLGdCQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixBQUFDO0FBQ3BDLGVBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxBQUFDO0FBQ2xDLGNBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxBQUFDO0FBQ2hDLE1BQUUsRUFBRSxjQUFjLEdBQUcsVUFBVSxHQUFHLFdBQVcsQUFBQztBQUM5QyxTQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQUFBQztHQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7R0FDZixBQUNOLENBQUM7RUFDRjtDQUNELENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7Ozs7OztxQkMvRk4sT0FBTzs7OzswQkFDRixZQUFZOzs7O0FBRW5DLElBQU0sS0FBSyxHQUFHLG1CQUFNLFdBQVcsQ0FBQzs7QUFFL0IsWUFBVyxFQUFFLE9BQU87O0FBRXBCLFVBQVMsRUFBRTtBQUNWLFVBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixVQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsSUFBRSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzFCLFNBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM3QixVQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsT0FBSyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUN4Qzs7O0FBRUQsZ0JBQWUsRUFBQyx5QkFBQyxLQUFLLEVBQUU7QUFDdkIsTUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNyRCxVQUFPO0dBQ1A7QUFDRCxNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ3ZCLFFBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUN4QixPQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1QyxVQUFPO0dBQ1A7QUFDRCxNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtBQUMxQixRQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7R0FDeEI7RUFDRDs7QUFFRCxTQUFRLEVBQUMsa0JBQUMsS0FBSyxFQUFFO0FBQ2hCLE9BQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QixPQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDeEIsTUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUN0Qzs7QUFFRCxxQkFBb0IsRUFBQyw4QkFBQyxLQUFLLEVBQUM7OztBQUczQixNQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTzs7O0FBR3pCLE1BQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckI7O0FBRUQsZ0JBQWUsRUFBQyx5QkFBQyxLQUFLLEVBQUU7O0FBRXZCLE1BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0VBQ3JCOztBQUVELGlCQUFnQixFQUFDLDBCQUFDLEtBQUssRUFBRTs7QUFFeEIsTUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7RUFDdEI7O0FBRUQsaUJBQWdCLEVBQUMsNEJBQUc7QUFDbkIsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU87QUFDeEQsU0FDQzs7S0FBTSxTQUFTLEVBQUMsbUJBQW1CO0FBQ2xDLG1CQUFZLE1BQU07QUFDbEIsZUFBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEFBQUM7QUFDM0IsY0FBVSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQUFBQztBQUN0QyxnQkFBWSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQUFBQztBQUNwQyxlQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQUFBQzs7R0FFNUIsQ0FDTjtFQUNGOztBQUVELFlBQVcsRUFBQyx1QkFBRztBQUNkLE1BQUksU0FBUyxHQUFHLG9CQUFvQixDQUFDO0FBQ3JDLFNBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUNqRDs7S0FBRyxTQUFTLEVBQUUsU0FBUyxBQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQUFBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEFBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQUFBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxBQUFDO0dBQ3pKLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtHQUNqQixHQUVKOztLQUFNLFNBQVMsRUFBRSxTQUFTLEFBQUMsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLGlCQUFjLE1BQU0sRUFBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEFBQUM7R0FDL0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0dBQ2QsQUFDUCxDQUFDO0VBQ0Y7O0FBRUQsT0FBTSxFQUFDLGtCQUFHO0FBQ1QsU0FDQzs7S0FBSyxTQUFTLEVBQUUsNkJBQVcsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxBQUFDO0FBQ3RFLFNBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUM7QUFDOUIsU0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQzs7R0FFN0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0dBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUU7R0FDZCxDQUNMO0VBQ0Y7O0NBRUQsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOzs7Ozs7OztxQkM5RkMsYUFBYTs7OztxQkFGbkIsT0FBTzs7OztBQUVWLFNBQVMsYUFBYSxDQUFFLElBQWUsRUFBRTtLQUFmLFdBQVcsR0FBYixJQUFlLENBQWIsV0FBVzs7QUFDbkQsUUFDQztBQUNDLFdBQVMsRUFBQyxjQUFjO0FBQ3hCLGFBQVcsRUFBRSxXQUFXLEFBQUM7R0FDeEIsQ0FDRDtDQUNGOztBQUFBLENBQUM7Ozs7Ozs7OztxQkNQc0IsYUFBYTs7OztxQkFGbkIsT0FBTzs7OztBQUVWLFNBQVMsYUFBYSxHQUFJO0FBQ3hDLFFBQ0M7QUFDQyxXQUFTLEVBQUMsY0FBYztBQUN4Qix5QkFBdUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQUFBQztHQUM5QyxDQUNEO0NBQ0Y7O0FBQUEsQ0FBQzs7Ozs7Ozs7K0JDVDBCLG1CQUFtQjs7OztBQUUvQyxTQUFTLGFBQWEsQ0FBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUU7OztBQUNwRSxLQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDeEIsYUFBVyxHQUFHLGtDQUFnQixXQUFXLENBQUMsQ0FBQztFQUMzQzs7QUFFRCxLQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDckIsYUFBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztFQUN4Qzs7QUFFRCxLQUFJLGNBQWMsRUFBRSxjQUFjLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7U0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztFQUFBLENBQUMsQ0FBQzs7QUFFaEYsUUFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQy9CLE1BQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQ3hGLE1BQUksS0FBSyxDQUFDLFlBQVksRUFBRSxPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFPLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNsRixNQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQzlCLE1BQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDL0MsTUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUMvQyxNQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDeEIsT0FBSSxLQUFLLENBQUMsU0FBUyxLQUFLLE9BQU8sRUFBRSxTQUFTLEdBQUcsa0NBQWdCLFNBQVMsQ0FBQyxDQUFDO0FBQ3hFLE9BQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxPQUFPLEVBQUUsU0FBUyxHQUFHLGtDQUFnQixTQUFTLENBQUMsQ0FBQztHQUN4RTtBQUNELE1BQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUNyQixPQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssT0FBTyxFQUFFLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDckUsT0FBSSxLQUFLLENBQUMsU0FBUyxLQUFLLE9BQU8sRUFBRSxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0dBQ3JFO0FBQ0QsU0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLE9BQU8sR0FDaEMsQUFBQyxLQUFLLENBQUMsU0FBUyxLQUFLLE9BQU8sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxJQUN0RixLQUFLLENBQUMsU0FBUyxLQUFLLE9BQU8sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxBQUFDLEdBRXhGLEFBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxPQUFPLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQ2xFLEtBQUssQ0FBQyxTQUFTLEtBQUssT0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxBQUFDLEFBQ3BFLENBQUM7RUFDRixDQUFDLENBQUM7Q0FDSDs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQzs7Ozs7OzswQkNyQ1IsWUFBWTs7OztxQkFDakIsT0FBTzs7OztBQUV6QixTQUFTLFlBQVksQ0FBRSxJQWF0QixFQUFFO0tBWkYsYUFBYSxHQURTLElBYXRCLENBWkEsYUFBYTtLQUNiLGNBQWMsR0FGUSxJQWF0QixDQVhBLGNBQWM7S0FDZCxRQUFRLEdBSGMsSUFhdEIsQ0FWQSxRQUFRO0tBQ1IsT0FBTyxHQUplLElBYXRCLENBVEEsT0FBTztLQUNQLFFBQVEsR0FMYyxJQWF0QixDQVJBLFFBQVE7S0FDUixlQUFlLEdBTk8sSUFhdEIsQ0FQQSxlQUFlO0tBQ2YsZUFBZSxHQVBPLElBYXRCLENBTkEsZUFBZTtLQUNmLGNBQWMsR0FSUSxJQWF0QixDQUxBLGNBQWM7S0FDZCxPQUFPLEdBVGUsSUFhdEIsQ0FKQSxPQUFPO0tBQ1AsVUFBVSxHQVZZLElBYXRCLENBSEEsVUFBVTtLQUNWLFFBQVEsR0FYYyxJQWF0QixDQUZBLFFBQVE7S0FDUixXQUFXLEdBWlcsSUFhdEIsQ0FEQSxXQUFXOztBQUVYLEtBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQzs7QUFFN0IsUUFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTSxFQUFFLENBQUMsRUFBSztBQUNqQyxNQUFJLFVBQVUsR0FBRyxVQUFVLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMvRCxNQUFJLFNBQVMsR0FBRyxNQUFNLEtBQUssYUFBYSxDQUFDO0FBQ3pDLE1BQUksV0FBVyxHQUFHLDZCQUFXLGVBQWUsRUFBRTtBQUM3QyxrQkFBZSxFQUFFLElBQUk7QUFDckIsZ0JBQWEsRUFBRSxVQUFVO0FBQ3pCLGVBQVksRUFBRSxTQUFTO0FBQ3ZCLGdCQUFhLEVBQUUsTUFBTSxDQUFDLFFBQVE7R0FDOUIsQ0FBQyxDQUFDOztBQUVILFNBQ0M7QUFBQyxTQUFNOztBQUNOLGFBQVMsRUFBRSxXQUFXLEFBQUM7QUFDdkIsa0JBQWMsRUFBRSxjQUFjLEFBQUM7QUFDL0IsY0FBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEFBQUM7QUFDNUIsYUFBUyxFQUFFLFNBQVMsQUFBQztBQUNyQixjQUFVLEVBQUUsVUFBVSxBQUFDO0FBQ3ZCLE9BQUcsY0FBWSxDQUFDLFNBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxBQUFHO0FBQ3ZDLFdBQU8sRUFBRSxPQUFPLEFBQUM7QUFDakIsWUFBUSxFQUFFLFFBQVEsQUFBQztBQUNuQixVQUFNLEVBQUUsTUFBTSxBQUFDO0FBQ2YsZUFBVyxFQUFFLENBQUMsQUFBQztBQUNmLE9BQUcsRUFBRSxVQUFBLEdBQUcsRUFBSTtBQUFFLGdCQUFXLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQUUsQUFBQzs7R0FFNUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7R0FDbEIsQ0FDUjtFQUNGLENBQUMsQ0FBQztDQUNIOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDOzs7OztBQ2pEOUIsSUFBSSxHQUFHLEdBQUcsQ0FDVCxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLGlOQUFpTixFQUFFLEVBQzNPLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFFLEVBQ3JDLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsdUJBQXVCLEVBQUUsRUFDakQsRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUUsRUFDckMsRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUUsRUFDckMsRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBRSxFQUMzQyxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBRSxFQUNyQyxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLDJEQUEyRCxFQUFFLEVBQ3JGLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsNkVBQTZFLEVBQUUsRUFDdkcsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyx5RkFBeUYsRUFBRSxFQUNuSCxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixFQUFFLEVBQzNDLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsaUJBQWlCLEVBQUUsRUFDM0MsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyx5TEFBeUwsRUFBRSxFQUNuTixFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLHlDQUF5QyxFQUFFLEVBQ25FLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsK0ZBQStGLEVBQUUsRUFDekgsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyx5RkFBeUYsRUFBRSxFQUNuSCxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLDZIQUE2SCxFQUFFLEVBQ3ZKLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsbUNBQW1DLEVBQUUsRUFDN0QsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyx5RkFBeUYsRUFBRSxFQUNuSCxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLGlIQUFpSCxFQUFFLEVBQzNJLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFFLEVBQ3JDLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFFLEVBQ3JDLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMscURBQXFELEVBQUUsRUFDL0UsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyxxR0FBcUcsRUFBRSxFQUMvSCxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBRSxFQUNyQyxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBRSxFQUNyQyxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLHVRQUF1USxFQUFFLEVBQ2pTLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFFLEVBQ3JDLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFFLEVBQ3JDLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFFLEVBQ3JDLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsaUVBQWlFLEVBQUUsRUFDM0YsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyx5Q0FBeUMsRUFBRSxFQUNuRSxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLDJHQUEyRyxFQUFFLEVBQ3JJLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsMkdBQTJHLEVBQUUsRUFDckksRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQywrRkFBK0YsRUFBRSxFQUN6SCxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBRSxFQUNyQyxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLGlOQUFpTixFQUFFLEVBQzNPLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMscURBQXFELEVBQUUsRUFDL0UsRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUUsRUFDckMsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyxpRUFBaUUsRUFBRSxFQUMzRixFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLG1DQUFtQyxFQUFFLEVBQzdELEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsK0ZBQStGLEVBQUUsRUFDekgsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyx5RkFBeUYsRUFBRSxFQUNuSCxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLHVOQUF1TixFQUFFLEVBQ2pQLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFFLEVBQ3JDLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsdUJBQXVCLEVBQUUsRUFDakQsRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUUsRUFDckMsRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUUsRUFDckMsRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBRSxFQUMzQyxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBRSxFQUNyQyxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLDJEQUEyRCxFQUFFLEVBQ3JGLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsbUZBQW1GLEVBQUUsRUFDN0csRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyx5RkFBeUYsRUFBRSxFQUNuSCxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixFQUFFLEVBQzNDLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsK0xBQStMLEVBQUUsRUFDek4sRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyx5Q0FBeUMsRUFBRSxFQUNuRSxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLCtGQUErRixFQUFFLEVBQ3pILEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsK0ZBQStGLEVBQUUsRUFDekgsRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUUsRUFDckMsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyw2SEFBNkgsRUFBRSxFQUN2SixFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLHlDQUF5QyxFQUFFLEVBQ25FLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMseUZBQXlGLEVBQUUsRUFDbkgsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyx1SEFBdUgsRUFBRSxFQUNqSixFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBRSxFQUNyQyxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLHFEQUFxRCxFQUFFLEVBQy9FLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsMkdBQTJHLEVBQUUsRUFDckksRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUUsRUFDckMsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyx1UUFBdVEsRUFBRSxFQUNqUyxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBRSxFQUNyQyxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBRSxFQUNyQyxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBRSxFQUNyQyxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLGlFQUFpRSxFQUFFLEVBQzNGLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMseUNBQXlDLEVBQUUsRUFDbkUsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQywyR0FBMkcsRUFBRSxFQUNySSxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLGlIQUFpSCxFQUFFLEVBQzNJLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMscUdBQXFHLEVBQUUsRUFDL0gsRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUUsRUFDckMsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyxpTkFBaU4sRUFBRSxFQUMzTyxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLHFEQUFxRCxFQUFFLEVBQy9FLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFFLEVBQ3JDLEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsdUVBQXVFLEVBQUUsRUFDakcsRUFBRSxNQUFNLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyxtQ0FBbUMsRUFBRSxFQUM3RCxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLHFHQUFxRyxFQUFFLEVBQy9ILEVBQUUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMseUZBQXlGLEVBQUUsQ0FDbkgsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsZUFBZSxDQUFFLEdBQUcsRUFBRTtBQUMvQyxNQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNwQyxLQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUMvQztBQUNELFFBQU8sR0FBRyxDQUFDO0NBQ1gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDdEZnQixPQUFPOzs7O3dCQUNKLFdBQVc7Ozs7a0NBQ04sc0JBQXNCOzs7OzBCQUN6QixZQUFZOzs7O3lDQUVGLDhCQUE4Qjs7Ozt5Q0FDOUIsOEJBQThCOzs7O3dDQUMvQiw2QkFBNkI7Ozs7eUNBQzVCLDhCQUE4Qjs7OztxQkFFN0MsU0FBUzs7Ozs4QkFDQSxrQkFBa0I7Ozs7eUJBQ3ZCLGFBQWE7Ozs7c0JBQ2hCLFVBQVU7Ozs7cUJBQ1gsU0FBUzs7OztBQUUzQixTQUFTLGNBQWMsQ0FBRSxLQUFLLEVBQUU7QUFDL0IsS0FBTSxTQUFTLEdBQUcsT0FBTyxLQUFLLENBQUM7QUFDL0IsS0FBSSxTQUFTLEtBQUssUUFBUSxFQUFFO0FBQzNCLFNBQU8sS0FBSyxDQUFDO0VBQ2IsTUFBTSxJQUFJLFNBQVMsS0FBSyxRQUFRLEVBQUU7QUFDbEMsU0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQzdCLE1BQU0sSUFBSSxTQUFTLEtBQUssUUFBUSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7QUFDN0QsU0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckIsTUFBTTtBQUNOLFNBQU8sRUFBRSxDQUFDO0VBQ1Y7Q0FDRDs7QUFFRCxJQUFNLFlBQVksR0FBRyxtQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQzlDLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQ3RCLG1CQUFNLFNBQVMsQ0FBQyxJQUFJLENBQ3BCLENBQUMsQ0FBQzs7QUFFSCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7O0FBRW5CLElBQU0sTUFBTSxHQUFHLG1CQUFNLFdBQVcsQ0FBQzs7QUFFaEMsWUFBVyxFQUFFLFFBQVE7O0FBRXJCLFVBQVMsRUFBRTtBQUNWLGNBQVksRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNwQyxjQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDcEMsbUJBQWlCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDekMsZUFBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ25DLFVBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixXQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDL0IsVUFBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLGtCQUFnQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3RDLDBCQUF3QixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2hELFdBQVMsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyxjQUFZLEVBQUUsWUFBWTtBQUMxQixlQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbkMsZ0JBQWMsRUFBRSxZQUFZO0FBQzVCLFdBQVMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMvQixlQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbkMsV0FBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2pDLFVBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixtQkFBaUIsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUN2QyxjQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEMsZUFBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxHQUFHO0FBQ2xDLGVBQWEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNuQyxZQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsWUFBVSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLGVBQWEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNuQyxZQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsV0FBUyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQy9CLFlBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNoQyxVQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsVUFBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLFdBQVMsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyxZQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsb0JBQWtCLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDMUMsY0FBWSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2xDLFdBQVMsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUNqQyxPQUFLLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDM0IsTUFBSSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzVCLGVBQWEsRUFBRSxZQUFZO0FBQzNCLFFBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM1QixtQkFBaUIsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUN2QyxVQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDOUIsU0FBTyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzdCLG9CQUFrQixFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3hDLFNBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM3QixlQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbkMsZ0JBQWMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxzQkFBb0IsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMxQyxRQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDNUIsY0FBWSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2xDLGdCQUFjLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDcEMsYUFBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2pDLGlCQUFlLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDdkMsaUJBQWUsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNyQyxnQkFBYyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3BDLFNBQU8sRUFBRSxtQkFBTSxTQUFTLENBQUMsS0FBSztBQUM5QixVQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsYUFBVyxFQUFFLFlBQVk7QUFDekIsVUFBUSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzlCLFlBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsR0FBRztBQUMvQixvQkFBa0IsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUN4QyxZQUFVLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDaEMsYUFBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ2pDLE9BQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM3QixVQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsaUJBQWUsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNyQyxPQUFLLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEdBQUc7QUFDMUIsZ0JBQWMsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNwQyxVQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDaEMsZUFBYSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ25DLGNBQVksRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxFQUNwQzs7O0FBRUQsUUFBTyxFQUFFLEVBQUUsS0FBSyxvQkFBQSxFQUFFLGNBQWMsNkJBQUEsRUFBRSxTQUFTLHdCQUFBLEVBQUU7O0FBRTdDLGdCQUFlLEVBQUMsMkJBQUc7QUFDbEIsU0FBTztBQUNOLGVBQVksRUFBRSxnQkFBZ0I7QUFDOUIsZ0JBQWEsd0NBQXNCO0FBQ25DLFdBQVEsRUFBRSxJQUFJO0FBQ2QsbUJBQWdCLEVBQUUsSUFBSTtBQUN0QiwyQkFBd0IsRUFBRSxtQ0FBbUM7QUFDN0QsWUFBUyxFQUFFLElBQUk7QUFDZixlQUFZLEVBQUUsV0FBVztBQUN6QixnQkFBYSx3Q0FBc0I7QUFDbkMsaUJBQWMsRUFBRSxhQUFhO0FBQzdCLGdCQUFhLEVBQUUsSUFBSTtBQUNuQixZQUFTLEVBQUUsR0FBRztBQUNkLFdBQVEsRUFBRSxLQUFLO0FBQ2Ysb0JBQWlCLEVBQUUsSUFBSTtBQUN2QixnQkFBYSx3Q0FBc0I7QUFDbkMsZ0JBQWEsRUFBRSxJQUFJO0FBQ25CLGFBQVUsRUFBRSxJQUFJO0FBQ2hCLGFBQVUsRUFBRSxFQUFFO0FBQ2QsWUFBUyxFQUFFLEtBQUs7QUFDaEIsYUFBVSxFQUFFLEtBQUs7QUFDakIsV0FBUSxFQUFFLE9BQU87QUFDakIsV0FBUSxFQUFFLEtBQUs7QUFDZixZQUFTLEVBQUUsS0FBSztBQUNoQixhQUFVLEVBQUUsQ0FBQztBQUNiLGVBQVksdUNBQXFCO0FBQ2pDLFFBQUssRUFBRSxLQUFLO0FBQ1osZ0JBQWEsRUFBRSxrQkFBa0I7QUFDakMsb0JBQWlCLEVBQUUsSUFBSTtBQUN2QixxQkFBa0IsRUFBRSxJQUFJO0FBQ3hCLGlCQUFjLEVBQUUsS0FBSztBQUNyQixrQkFBZSxxQkFBUTtBQUN2QixXQUFRLEVBQUUsQ0FBQztBQUNYLGNBQVcsRUFBRSxXQUFXO0FBQ3hCLFdBQVEsRUFBRSxLQUFLO0FBQ2YscUJBQWtCLEVBQUUsSUFBSTtBQUN4QixhQUFVLEVBQUUsSUFBSTtBQUNoQixjQUFXLEVBQUUsS0FBSztBQUNsQixrQkFBZSxFQUFFLElBQUk7QUFDckIsaUJBQWMsb0JBQU87QUFDckIsV0FBUSxFQUFFLE9BQU87R0FDakIsQ0FBQztFQUNGOztBQUVELGdCQUFlLEVBQUMsMkJBQUc7QUFDbEIsU0FBTztBQUNOLGFBQVUsRUFBRSxFQUFFO0FBQ2QsWUFBUyxFQUFFLEtBQUs7QUFDaEIsU0FBTSxFQUFFLEtBQUs7QUFDYixrQkFBZSxFQUFFLEtBQUs7QUFDdEIsV0FBUSxFQUFFLEtBQUs7R0FDZixDQUFDO0VBQ0Y7O0FBRUQsbUJBQWtCLEVBQUMsOEJBQUc7QUFDckIsTUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxVQUFVLENBQUEsQUFBQyxHQUFHLEdBQUcsQ0FBQztBQUN2RixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXhELE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDeEIsT0FBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLFlBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUM5RCxDQUFDLENBQUM7R0FDSDtFQUNEOztBQUVELGtCQUFpQixFQUFDLDZCQUFHO0FBQ3BCLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDekIsT0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0dBQ2I7RUFDRDs7QUFFRCwwQkFBeUIsRUFBQyxtQ0FBQyxTQUFTLEVBQUU7QUFDckMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztBQUVsRSxNQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDdkIsT0FBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLFlBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQzdELENBQUMsQ0FBQztHQUNIO0VBQ0Q7O0FBRUQsb0JBQW1CLEVBQUMsNkJBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRTtBQUMxQyxNQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDM0MsT0FBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQyxPQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUN4RSxVQUFPLElBQUksT0FBTyxFQUFFLENBQUM7R0FDckI7RUFDRDs7QUFFRCxtQkFBa0IsRUFBQyw0QkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFOztBQUV6QyxNQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtBQUNoRixPQUFJLGlCQUFpQixHQUFHLHNCQUFTLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0QsT0FBSSxRQUFRLEdBQUcsc0JBQVMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQyxXQUFRLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztBQUNqRCxPQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0dBQ2hDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQzlCLE9BQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7R0FDakM7O0FBRUQsTUFBSSxJQUFJLENBQUMsOEJBQThCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ3JFLE9BQUksQ0FBQyw4QkFBOEIsR0FBRyxLQUFLLENBQUM7QUFDNUMsT0FBSSxVQUFVLEdBQUcsc0JBQVMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwRCxPQUFJLE9BQU8sR0FBRyxzQkFBUyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlDLE9BQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3JELE9BQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQy9DLE9BQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtBQUMzRSxXQUFPLENBQUMsU0FBUyxHQUFJLFVBQVUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxBQUFDLENBQUM7SUFDNUY7R0FDRDtBQUNELE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ3hELE9BQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ25FLE9BQUksTUFBTSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDMUUsVUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxRjtHQUNEO0FBQ0QsTUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQy9DLE9BQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUNwQyxPQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7R0FDakI7RUFDRDs7QUFFRCxxQkFBb0IsRUFBQyxnQ0FBRztBQUN2QixNQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7QUFDMUQsV0FBUSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7R0FDOUQsTUFBTTtBQUNOLFdBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7R0FDcEU7RUFDRDs7QUFFRCx3QkFBdUIsRUFBQyxpQ0FBQyxPQUFPLEVBQUU7QUFDakMsTUFBSSxPQUFPLEVBQUU7QUFDWixPQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7QUFDdkQsWUFBUSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUQsTUFBTTtBQUNOLFlBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDakU7R0FDRCxNQUFNO0FBQ04sT0FBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO0FBQzFELFlBQVEsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlELE1BQU07QUFDTixZQUFRLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3BFO0dBQ0Q7RUFDRDs7QUFFRCxtQkFBa0IsRUFBQyw0QkFBQyxLQUFLLEVBQUU7O0FBRTFCLE1BQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUN6RCxPQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7R0FDakI7RUFDRDs7QUFFRCxNQUFLLEVBQUMsaUJBQUc7QUFDUixNQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPO0FBQ3hCLE1BQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRW5CLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDOUIsT0FBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLFVBQU0sRUFBRSxJQUFJO0lBQ1osQ0FBQyxDQUFDO0dBQ0g7RUFDRDs7QUFFRCxVQUFTLEVBQUMscUJBQUc7QUFDWixNQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPO0FBQ3hCLE1BQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7RUFDbEI7O0FBRUQsZ0JBQWUsRUFBQyx5QkFBQyxLQUFLLEVBQUU7O0FBRXZCLE1BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0VBQ3JCOztBQUVELGlCQUFnQixFQUFDLDBCQUFDLEtBQUssRUFBRTs7QUFFeEIsTUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7RUFDdEI7O0FBRUQsZUFBYyxFQUFDLHdCQUFDLEtBQUssRUFBRTs7O0FBR3RCLE1BQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPOzs7QUFHMUIsTUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUM1Qjs7QUFFRCx5QkFBd0IsRUFBQyxrQ0FBQyxLQUFLLEVBQUU7OztBQUdoQyxNQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTzs7O0FBRzFCLE1BQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDdkI7O0FBRUQsZ0JBQWUsRUFBQyx5QkFBQyxLQUFLLEVBQUU7OztBQUd2QixNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxBQUFDLEVBQUU7QUFDOUUsVUFBTztHQUNQOztBQUVELE1BQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO0FBQ3JDLFVBQU87R0FDUDs7O0FBR0QsT0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3hCLE9BQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7O0FBR3ZCLE1BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUMzQixPQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDYixVQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDcEIsVUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO0lBQzFCLENBQUMsQ0FBQztHQUNIOztBQUVELE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7QUFJekIsT0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUViLE9BQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkIsT0FBSSxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFOztBQUV6QyxTQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCOzs7QUFHRCxRQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzs7O0FBR2pCLE9BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixVQUFNLEVBQUUsSUFBSTtBQUNaLG1CQUFlLEVBQUUsS0FBSztJQUN0QixDQUFDLENBQUM7R0FDSCxNQUFNOztBQUVOLE9BQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7QUFDOUMsT0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0dBQ2I7RUFDRDs7QUFFRCx1QkFBc0IsRUFBQyxnQ0FBQyxLQUFLLEVBQUU7OztBQUc5QixNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxBQUFDLEVBQUU7QUFDOUUsVUFBTztHQUNQOztBQUVELE1BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUN2QixVQUFPO0dBQ1A7O0FBRUQsT0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3hCLE9BQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFdkIsTUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0VBQ2pCOztBQUVELHNCQUFxQixFQUFDLCtCQUFDLEtBQUssRUFBRTs7O0FBRzdCLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUssS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEFBQUMsRUFBRTtBQUM5RSxVQUFPO0dBQ1A7QUFDRCxPQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDeEIsT0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUV2QixNQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztBQUM1QixNQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDYjs7QUFFRCxVQUFTLEVBQUMscUJBQUc7QUFDWixNQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUU7QUFDakMsT0FBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLFVBQU0sRUFBRSxLQUFLO0FBQ2IsbUJBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztBQUMxRCxjQUFVLEVBQUUsRUFBRTtJQUNkLENBQUMsQ0FBQztHQUNILE1BQU07QUFDTixPQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsVUFBTSxFQUFFLEtBQUs7QUFDYixtQkFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQzFELGNBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7SUFDakMsQ0FBQyxDQUFDO0dBQ0g7QUFDRCxNQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0VBQ2pDOztBQUVELGlCQUFnQixFQUFDLDBCQUFDLEtBQUssRUFBRTtBQUN4QixNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU87QUFDaEMsTUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztBQUNqRixNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ3ZCLE9BQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQzFCO0FBQ0QsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLFlBQVMsRUFBRSxJQUFJO0FBQ2YsU0FBTSxFQUFFLE1BQU07R0FDZCxDQUFDLENBQUM7QUFDSCxNQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztFQUM3Qjs7QUFFRCxnQkFBZSxFQUFDLHlCQUFDLEtBQUssRUFBRTs7QUFFdkIsTUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUEsQUFBQyxFQUFFO0FBQ3RHLE9BQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNiLFVBQU87R0FDUDs7QUFFRCxNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3RCLE9BQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3pCO0FBQ0QsTUFBSSxjQUFjLEdBQUc7QUFDcEIsWUFBUyxFQUFFLEtBQUs7QUFDaEIsU0FBTSxFQUFFLEtBQUs7QUFDYixrQkFBZSxFQUFFLEtBQUs7R0FDdEIsQ0FBQztBQUNGLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUNqQyxpQkFBYyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7R0FDL0I7QUFDRCxNQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0VBQzlCOztBQUVELGtCQUFpQixFQUFDLDJCQUFDLEtBQUssRUFBRTtBQUN6QixNQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7QUFFdkMsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtBQUM3RSxPQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFeEQsT0FBSSxTQUFTLElBQUksSUFBSSxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFBRTtBQUN2RCxpQkFBYSxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFDL0I7R0FDRDs7QUFFRCxNQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsU0FBTSxFQUFFLElBQUk7QUFDWixrQkFBZSxFQUFFLEtBQUs7QUFDdEIsYUFBVSxFQUFFLGFBQWE7R0FDekIsQ0FBQyxDQUFDO0VBQ0g7O0FBRUQsY0FBYSxFQUFDLHVCQUFDLEtBQUssRUFBRTtBQUNyQixNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU87O0FBRWhDLE1BQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsS0FBSyxVQUFVLEVBQUU7QUFDcEQsT0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsT0FBSSxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7QUFDM0IsV0FBTztJQUNQO0dBQ0Q7O0FBRUQsVUFBUSxLQUFLLENBQUMsT0FBTztBQUNwQixRQUFLLENBQUM7O0FBQ0wsUUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7QUFDMUQsVUFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNoQjtBQUNGLFdBQU87QUFBQSxBQUNQLFFBQUssQ0FBQzs7QUFDTCxRQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFO0FBQ3hFLFlBQU87S0FDUDtBQUNELFFBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQzVCLFdBQU87QUFBQSxBQUNQLFFBQUssRUFBRTs7QUFDTixRQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTztBQUMvQixTQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDeEIsUUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7QUFDNUIsVUFBTTtBQUFBLEFBQ04sUUFBSyxFQUFFOztBQUNOLFFBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDdEIsU0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2pCLFVBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUN4QixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUNoRSxTQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLFVBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUN4QjtBQUNGLFVBQU07QUFBQSxBQUNOLFFBQUssRUFBRTs7QUFDTixRQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztBQUM1QixVQUFNO0FBQUEsQUFDTixRQUFLLEVBQUU7O0FBQ04sUUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3hCLFVBQU07QUFBQSxBQUNOLFFBQUssRUFBRTs7QUFDTixRQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUMxQixVQUFNO0FBQUEsQUFDTixRQUFLLEVBQUU7O0FBQ04sUUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7QUFDNUIsVUFBTTtBQUFBLEFBQ04sUUFBSyxFQUFFOztBQUNOLFFBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUNuQixZQUFPO0tBQ1A7QUFDRCxRQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsVUFBTTtBQUFBLEFBQ04sUUFBSyxFQUFFOztBQUNOLFFBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUNuQixZQUFPO0tBQ1A7QUFDRCxRQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUN6QixVQUFNO0FBQUEsQUFDTixRQUFLLEVBQUU7O0FBQ04sUUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQ3ZELFVBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QixTQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDaEI7QUFDRixXQUFPO0FBQUEsQUFDUDtBQUFTLFdBQU87QUFBQSxHQUNoQjtBQUNELE9BQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztFQUN2Qjs7QUFFRCxpQkFBZ0IsRUFBQywwQkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ2hDLE1BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxPQUFPO0FBQ3JDLE1BQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztFQUN2Qzs7QUFFRCxpQkFBZ0IsRUFBQywwQkFBQyxLQUFLLEVBQUU7QUFDeEIsTUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsT0FBTztNQUN2QyxNQUFNLEdBQUssS0FBSyxDQUFoQixNQUFNOztBQUNaLE1BQUksTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUEsQUFBQyxFQUFFO0FBQ2pILE9BQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztHQUNsQztFQUNEOztBQUVELGVBQWMsRUFBQyx3QkFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQzdCLE1BQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDeEIsU0FBUSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFFO0VBQ3RFOztBQUVELGVBQWMsRUFBQyx3QkFBQyxFQUFFLEVBQUU7QUFDbkIsU0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUMvQjs7Ozs7Ozs7QUFRRCxjQUFhLEVBQUMsdUJBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRTs7OztBQUVoQyxNQUFNLEtBQUssR0FBRyxPQUFPLFNBQVMsS0FBSyxRQUFRLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDckUsTUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ2hCLE9BQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNwRSxPQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUMxQixRQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQztBQUNyRCxTQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQjtBQUNELFVBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7V0FBSSxNQUFLLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUM7V0FBSSxDQUFDO0lBQUEsQ0FBQyxDQUFDO0dBQ3pFO0FBQ0QsTUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbkQsU0FBTyxhQUFhLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDNUM7Ozs7Ozs7QUFPRCxZQUFXLEVBQUMscUJBQUMsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUMxQixNQUFNLFNBQVMsR0FBRyxPQUFPLEtBQUssQ0FBQztBQUMvQixNQUFJLFNBQVMsS0FBSyxRQUFRLElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFLE9BQU8sS0FBSyxDQUFDO01BQ3hGLE9BQU8sR0FBZSxLQUFLLENBQTNCLE9BQU87TUFBRSxRQUFRLEdBQUssS0FBSyxDQUFsQixRQUFROztBQUN2QixNQUFJLENBQUMsT0FBTyxFQUFFLE9BQU87QUFDckIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEMsT0FBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxFQUFFLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3REO0VBQ0Q7O0FBRUQsU0FBUSxFQUFDLGtCQUFDLEtBQUssRUFBRTs7O0FBQ2hCLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUM7QUFDdkIsT0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0dBQ2pCO0FBQ0QsTUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU87QUFDakMsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUN4QixPQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlELE9BQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFFLENBQUMsQ0FBQztHQUM1QjtBQUNELE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksS0FBSyxFQUFFO0FBQ3BDLFFBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztXQUFJLENBQUMsQ0FBQyxPQUFLLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDMUg7QUFDRCxNQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUMzQjs7QUFFRCxZQUFXLEVBQUMscUJBQUMsS0FBSyxFQUFFOzs7O0FBRW5CLE1BQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDakMsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNyQixPQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsY0FBVSxFQUFFLEVBQUU7QUFDZCxnQkFBWSxFQUFFLElBQUk7SUFDbEIsRUFBRSxZQUFNO0FBQ1IsV0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDO0dBQ0gsTUFBTTtBQUNOLE9BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixVQUFNLEVBQUUsS0FBSztBQUNiLGNBQVUsRUFBRSxFQUFFO0FBQ2QsbUJBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7SUFDckMsRUFBRSxZQUFNO0FBQ1IsV0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDO0dBQ0g7RUFDRDs7QUFFRCxTQUFRLEVBQUMsa0JBQUMsS0FBSyxFQUFFO0FBQ2hCLE1BQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUc7VUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRO0dBQUEsQ0FBQyxDQUFDO0FBQ3pFLE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckQsTUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDeEMsTUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxjQUFjLEVBQUU7O0FBRWpELE9BQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3JELE1BQU0sSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLGNBQWMsRUFBRTs7QUFFbEQsT0FBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDckQ7RUFDRDs7QUFFRCxTQUFRLEVBQUMsb0JBQUc7QUFDWCxNQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEQsTUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTztBQUMvQixNQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUUsT0FBTztBQUNyRSxNQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRDs7QUFFRCxZQUFXLEVBQUMscUJBQUMsS0FBSyxFQUFFO0FBQ25CLE1BQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxNQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDO1VBQUksQ0FBQyxLQUFLLEtBQUs7R0FBQSxDQUFDLENBQUMsQ0FBQztBQUNuRCxNQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDYjs7QUFFRCxXQUFVLEVBQUMsb0JBQUMsS0FBSyxFQUFFOzs7QUFHbEIsTUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDOUQsVUFBTztHQUNQO0FBQ0QsT0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3hCLE9BQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QixNQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixTQUFNLEVBQUUsS0FBSztBQUNiLGFBQVUsRUFBRSxFQUFFO0dBQ2QsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDZjs7QUFFRCxjQUFhLEVBQUMseUJBQUc7QUFDaEIsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7QUFDeEMsVUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztHQUM3QixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDNUIsVUFBTyxFQUFFLENBQUM7R0FDVixNQUFNO0FBQ04sVUFBTyxJQUFJLENBQUM7R0FDWjtFQUNEOztBQUVELFlBQVcsRUFBQyxxQkFBQyxNQUFNLEVBQUU7QUFDcEIsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLGdCQUFhLEVBQUUsTUFBTTtHQUNyQixDQUFDLENBQUM7RUFDSDs7QUFFRCxnQkFBZSxFQUFDLDJCQUFHO0FBQ2xCLE1BQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNqQzs7QUFFRCxvQkFBbUIsRUFBQywrQkFBRztBQUN0QixNQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7RUFDckM7O0FBRUQsa0JBQWlCLEVBQUMsNkJBQUc7QUFDcEIsTUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQ3BDOztBQUVELG9CQUFtQixFQUFDLCtCQUFHO0FBQ3RCLE1BQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztFQUN0Qzs7QUFFRCxpQkFBZ0IsRUFBQyw0QkFBRztBQUNuQixNQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7RUFDbEM7O0FBRUQsZUFBYyxFQUFDLDBCQUFHO0FBQ2pCLE1BQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNoQzs7QUFFRCxvQkFBbUIsRUFBQyw2QkFBQyxHQUFHLEVBQUU7QUFDekIsTUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDaEMsR0FBRyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUs7VUFBTSxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRTtHQUFDLENBQUMsQ0FDM0MsTUFBTSxDQUFDLFVBQUEsTUFBTTtVQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRO0dBQUEsQ0FBQyxDQUFDO0FBQzVDLE1BQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUM7QUFDM0MsTUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3ZCLE9BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixVQUFNLEVBQUUsSUFBSTtBQUNaLGNBQVUsRUFBRSxFQUFFO0FBQ2QsaUJBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxLQUFLLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsS0FBSyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQSxBQUFDO0lBQ3ZILENBQUMsQ0FBQztBQUNILFVBQU87R0FDUDtBQUNELE1BQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU87QUFDNUIsTUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEMsT0FBSSxJQUFJLENBQUMsY0FBYyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDOUMsZ0JBQVksR0FBRyxDQUFDLENBQUM7QUFDakIsVUFBTTtJQUNOO0dBQ0Q7QUFDRCxNQUFJLEdBQUcsS0FBSyxNQUFNLElBQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxFQUFHO0FBQzNDLGVBQVksR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUEsR0FBSSxPQUFPLENBQUMsTUFBTSxDQUFDO0dBQ25ELE1BQU0sSUFBSSxHQUFHLEtBQUssVUFBVSxFQUFFO0FBQzlCLE9BQUksWUFBWSxHQUFHLENBQUMsRUFBRTtBQUNyQixnQkFBWSxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDaEMsTUFBTTtBQUNOLGdCQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDbEM7R0FDRCxNQUFNLElBQUksR0FBRyxLQUFLLE9BQU8sRUFBRTtBQUMzQixlQUFZLEdBQUcsQ0FBQyxDQUFDO0dBQ2pCLE1BQU0sSUFBSSxHQUFHLEtBQUssS0FBSyxFQUFFO0FBQ3pCLGVBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztHQUNsQyxNQUFNLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtBQUM3QixPQUFJLGNBQWMsR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDeEQsT0FBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZCLGdCQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE1BQU07QUFDTixnQkFBWSxHQUFHLGNBQWMsQ0FBQztJQUM5QjtHQUNELE1BQU0sSUFBSSxHQUFHLEtBQUssV0FBVyxFQUFFO0FBQy9CLE9BQUksY0FBYyxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztBQUN4RCxPQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN4QyxnQkFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE1BQU07QUFDTixnQkFBWSxHQUFHLGNBQWMsQ0FBQztJQUM5QjtHQUNEOztBQUVELE1BQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ3hCLGVBQVksR0FBRyxDQUFDLENBQUM7R0FDakI7O0FBRUQsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLGVBQVksRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSztBQUN6QyxnQkFBYSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNO0dBQzNDLENBQUMsQ0FBQztFQUNIOztBQUVELGlCQUFnQixFQUFDLDRCQUFHO0FBQ25CLFNBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztFQUMzQjs7QUFFRCxjQUFhLEVBQUMseUJBQUc7QUFDaEIsU0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztFQUM3Qjs7QUFFRCxvQkFBbUIsRUFBQywrQkFBRztBQUN0QixNQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7QUFDeEIsVUFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztHQUM3QztFQUNEOztBQUVELGNBQWEsRUFBQyx5QkFBRztBQUNoQixNQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTztBQUNsQyxTQUNDOztLQUFNLFNBQVMsRUFBQyxxQkFBcUIsRUFBQyxlQUFZLE1BQU07R0FDdkQsMkNBQU0sU0FBUyxFQUFDLGdCQUFnQixHQUFHO0dBQzdCLENBQ047RUFDRjs7QUFFRCxZQUFXLEVBQUMscUJBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O0FBQ2hDLE1BQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7QUFDbEUsTUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7QUFDL0MsTUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDdkIsVUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHOztNQUFLLFNBQVMsRUFBQyxvQkFBb0I7SUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7SUFBTyxHQUFHLElBQUksQ0FBQztHQUMxRztBQUNELE1BQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDckUsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNyQixVQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFLO0FBQ25DLFdBQ0M7QUFBQyxtQkFBYzs7QUFDZCxRQUFFLEVBQUUsT0FBSyxlQUFlLEdBQUcsU0FBUyxHQUFHLENBQUMsQUFBQztBQUN6QyxvQkFBYyxFQUFFLE9BQUssZUFBZSxBQUFDO0FBQ3JDLGNBQVEsRUFBRSxPQUFLLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLGNBQWMsS0FBSyxLQUFLLEFBQUM7QUFDaEUsU0FBRyxhQUFXLENBQUMsU0FBSSxLQUFLLENBQUMsT0FBSyxLQUFLLENBQUMsUUFBUSxDQUFDLEFBQUc7QUFDaEQsYUFBTyxFQUFFLE9BQU8sQUFBQztBQUNqQixjQUFRLEVBQUUsT0FBSyxXQUFXLEFBQUM7QUFDM0IsV0FBSyxFQUFFLEtBQUssQUFBQzs7S0FFWixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUN0Qjs7UUFBTSxTQUFTLEVBQUMsa0JBQWtCOztNQUFjO0tBQ2hDLENBQ2hCO0lBQ0YsQ0FBQyxDQUFDO0dBQ0gsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDbEMsT0FBSSxNQUFNLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztBQUMzQixVQUNDO0FBQUMsa0JBQWM7O0FBQ2QsT0FBRSxFQUFFLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxBQUFDO0FBQ3pDLGFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQUFBQztBQUM5QixtQkFBYyxFQUFFLElBQUksQ0FBQyxlQUFlLEFBQUM7QUFDckMsWUFBTyxFQUFFLE9BQU8sQUFBQztBQUNqQixVQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxBQUFDOztJQUVwQixXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FDaEI7R0FDRjtFQUNEOztBQUVELFlBQVcsRUFBQyxxQkFBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQUU7Ozs7QUFDNUMsTUFBSSxTQUFTLEdBQUcsNkJBQVcsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVFLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7QUFFbkMsTUFBTSxRQUFRLEdBQUcsNkVBQ2YsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLEVBQUcsTUFBTSxnQ0FDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRywyQkFBMkIsRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFDbEUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQ3BCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLGdCQUN6QixDQUFDOzs7QUFHSCxNQUFNLFVBQVUsR0FBRyxTQUFjLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUMzRCxPQUFJLEVBQUUsVUFBVTtBQUNoQixrQkFBZSxFQUFFLEVBQUUsR0FBRyxNQUFNO0FBQzVCLGNBQVcsRUFBRSxRQUFRO0FBQ3JCLGtCQUFlLEVBQUUsRUFBRSxHQUFHLE1BQU07QUFDNUIsMEJBQXVCLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxHQUFHLGtCQUFrQixHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUTtBQUMxSCxvQkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO0FBQ2hELGVBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN0QyxZQUFTLEVBQUUsU0FBUztBQUNwQixXQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQzdCLFNBQU0sRUFBRSxJQUFJLENBQUMsZUFBZTtBQUM1QixXQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtBQUNoQyxVQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtBQUM5QixNQUFHLEVBQUUsYUFBQSxJQUFHO1dBQUksT0FBSyxLQUFLLEdBQUcsSUFBRztJQUFBO0FBQzVCLFdBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDN0IsUUFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtHQUM1QixDQUFDLENBQUM7O0FBRUgsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtBQUM3QixVQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0dBQzVDOztBQUVELE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTsyQkFDVixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7T0FBckQsY0FBYyxxQkFBZCxjQUFjOztPQUFLLFFBQVE7O0FBQ25DLFVBQ0MscURBQ0ssUUFBUTtBQUNaLFFBQUksRUFBQyxVQUFVO0FBQ2YscUJBQWUsTUFBTSxBQUFDO0FBQ3RCLGlCQUFXLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQUFBQztBQUNyRiw2QkFBdUIsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxHQUFHLGtCQUFrQixHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxBQUFDO0FBQ3pILGFBQVMsRUFBRSxTQUFTLEFBQUM7QUFDckIsWUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsQUFBQztBQUNuQyxVQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsQUFBQztBQUM3QixXQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixBQUFDO0FBQy9CLE9BQUcsRUFBRSxVQUFBLEdBQUc7WUFBSSxPQUFLLEtBQUssR0FBRyxHQUFHO0tBQUEsQUFBQztBQUM3QixxQkFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDO0FBQzFDLFNBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUMsY0FBYyxFQUFFLEFBQUMsSUFBRSxDQUN6RDtHQUNGOztBQUVELE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDeEIsVUFDQywrRUFBbUIsVUFBVSxJQUFFLFFBQVEsRUFBQyxHQUFHLElBQUcsQ0FDN0M7R0FDRjtBQUNELFNBQ0M7O0tBQUssU0FBUyxFQUFHLFNBQVMsQUFBRTtHQUMzQiwwQ0FBVyxVQUFVLENBQUk7R0FDcEIsQ0FDTDtFQUNGOztBQUVELFlBQVcsRUFBQyx1QkFBRztBQUNkLE1BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsQUFBQyxJQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxBQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTztBQUNwTCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDOztBQUV6QyxTQUNDOztLQUFNLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEFBQUM7QUFDakgsa0JBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEFBQUM7QUFDbkYsZUFBVyxFQUFFLElBQUksQ0FBQyxVQUFVLEFBQUM7QUFDN0IsZ0JBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUM7QUFDcEMsZUFBVyxFQUFFLElBQUksQ0FBQyxlQUFlLEFBQUM7QUFDbEMsY0FBVSxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQUFBQzs7R0FFekMsS0FBSztHQUNBLENBQ047RUFDRjs7QUFFRCxZQUFXLEVBQUMsdUJBQUc7QUFDZCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7QUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDL0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxXQUFXLEVBQVgsV0FBVyxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsQ0FBQyxDQUFDOztBQUVoRSxTQUNDOzs7QUFDQyxhQUFTLEVBQUMsbUJBQW1CO0FBQzdCLGVBQVcsRUFBRSxXQUFXLEFBQUM7O0dBRXhCLEtBQUs7R0FDQSxDQUNOO0VBQ0Y7O0FBRUQsY0FBYSxFQUFDLHVCQUFDLGNBQWMsRUFBRTtBQUM5QixNQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztBQUN4QyxNQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDdkMsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTs7QUFFN0IsT0FBTSxhQUFhLEdBQUcsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsS0FBSyxVQUFVLEdBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSx5Q0FDSixDQUFDOztBQUV4QixVQUFPLGFBQWEsQ0FDbkIsT0FBTyxFQUNQLFdBQVcsRUFDWCxjQUFjLEVBQ2Q7QUFDQyxnQkFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNyQyxpQkFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtBQUN2QyxjQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQ2pDLFlBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDN0IsWUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtBQUM3QixhQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQy9CLFlBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7SUFDN0IsQ0FDRCxDQUFDO0dBQ0YsTUFBTTtBQUNOLFVBQU8sT0FBTyxDQUFDO0dBQ2Y7RUFDRDs7QUFFRCxZQUFXLEVBQUEscUJBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUMzQixNQUFJLFNBQVMsRUFBRTtBQUNkLE9BQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0dBQ25CO0VBQ0Q7O0FBRUQsV0FBVSxFQUFDLG9CQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFO0FBQy9DLE1BQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDOUIsVUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztBQUM5QixpQkFBYSxFQUFiLGFBQWE7QUFDYixlQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7QUFDN0Isa0JBQWMsRUFBRSxJQUFJLENBQUMsZUFBZTtBQUNwQyxZQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQzdCLFdBQU8sRUFBRSxJQUFJLENBQUMsV0FBVztBQUN6QixZQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVc7QUFDMUIsbUJBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDM0MsbUJBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDM0Msa0JBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYztBQUNoRSxXQUFPLEVBQVAsT0FBTztBQUNQLGVBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztBQUM3QixjQUFVLEVBQVYsVUFBVTtBQUNWLFlBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDN0IsZUFBVyxFQUFFLElBQUksQ0FBQyxXQUFXO0lBQzdCLENBQUMsQ0FBQztHQUNILE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtBQUNwQyxVQUNDOztNQUFLLFNBQVMsRUFBQyxrQkFBa0I7SUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhO0lBQ3BCLENBQ0w7R0FDRixNQUFNO0FBQ04sVUFBTyxJQUFJLENBQUM7R0FDWjtFQUNEOztBQUVELGtCQUFpQixFQUFDLDJCQUFDLFVBQVUsRUFBRTs7O0FBQzlCLE1BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPO0FBQzdCLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDMUIsT0FBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7V0FBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25HLFVBQ0M7QUFDQyxRQUFJLEVBQUMsUUFBUTtBQUNiLE9BQUcsRUFBRSxVQUFBLEdBQUc7WUFBSSxPQUFLLEtBQUssR0FBRyxHQUFHO0tBQUEsQUFBQztBQUM3QixRQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEFBQUM7QUFDdEIsU0FBSyxFQUFFLEtBQUssQUFBQztBQUNiLFlBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQUFBQyxHQUFHLENBQ2pDO0dBQ0Y7QUFDRCxTQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztVQUNqQyw0Q0FBTyxHQUFHLEVBQUUsU0FBUyxHQUFHLEtBQUssQUFBQztBQUM3QixRQUFJLEVBQUMsUUFBUTtBQUNiLE9BQUcsRUFBRSxPQUFPLEdBQUcsS0FBSyxBQUFDO0FBQ3JCLFFBQUksRUFBRSxPQUFLLEtBQUssQ0FBQyxJQUFJLEFBQUM7QUFDdEIsU0FBSyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBSyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQUFBQztBQUNqRCxZQUFRLEVBQUUsT0FBSyxLQUFLLENBQUMsUUFBUSxBQUFDLEdBQUc7R0FDbEMsQ0FBQyxDQUFDO0VBQ0g7O0FBRUQsd0JBQXVCLEVBQUMsaUNBQUMsY0FBYyxFQUFFO0FBQ3hDLE1BQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7QUFDbkMsTUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUM7O0FBRWpDLE1BQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLGNBQWMsQ0FBQztBQUMvRCxNQUFJLGFBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7QUFDN0MsT0FBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1QixVQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUssRUFBSztBQUMvQixRQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLGFBQWEsQ0FBQyxLQUFLLENBQUM7QUFDM0QsUUFBSSxhQUFhLEVBQUU7QUFDbEIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO0tBQzNCO0FBQ0QsV0FBTyxhQUFhLENBQUM7SUFDckIsQ0FBQyxDQUFDO0FBQ0gsT0FBSSxrQkFBa0IsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUM5QixXQUFPLGtCQUFrQixDQUFDO0lBQzFCO0dBQ0Q7O0FBRUQsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEMsT0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDbkM7QUFDRCxTQUFPLElBQUksQ0FBQztFQUNaOztBQUVELFlBQVcsRUFBQyxxQkFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRTs7O0FBQ2hELE1BQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUMvRCxNQUFJLENBQUMsSUFBSSxFQUFFO0FBQ1YsVUFBTyxJQUFJLENBQUM7R0FDWjs7QUFFRCxTQUNDOztLQUFLLEdBQUcsRUFBRSxVQUFBLEdBQUc7WUFBSSxPQUFLLGFBQWEsR0FBRyxHQUFHO0tBQUEsQUFBQyxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQUFBQztHQUM3Rzs7TUFBSyxHQUFHLEVBQUUsVUFBQSxHQUFHO2FBQUksT0FBSyxJQUFJLEdBQUcsR0FBRztNQUFBLEFBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxhQUFhLEVBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxBQUFDO0FBQ3pHLFVBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQUFBQztBQUM1QixhQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixBQUFDO0FBQ2hDLGdCQUFXLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixBQUFDO0lBQ3pDLElBQUk7SUFDQTtHQUNELENBQ0w7RUFDRjs7QUFFRCxPQUFNLEVBQUMsa0JBQUc7OztBQUNULE1BQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxNQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3hILE1BQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQy9CLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3ZHLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV2RSxNQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDekIsTUFBSSxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7QUFDaEMsZ0JBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0dBQ2xFLE1BQU07QUFDTixnQkFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0dBQzNDO0FBQ0QsTUFBSSxTQUFTLEdBQUcsNkJBQVcsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQzFELGtCQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQ2pDLG1CQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQ25DLGdCQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQ2xDLGVBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7QUFDbEMsZUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztBQUNsQyxZQUFTLEVBQUUsTUFBTTtBQUNqQixzQkFBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWU7QUFDL0Msa0JBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7QUFDdEMsY0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNO0dBQzlCLENBQUMsQ0FBQzs7QUFFSCxNQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDekIsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFDbkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFDcEIsVUFBVSxDQUFDLE1BQU0sSUFDakIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7QUFDN0IsZ0JBQWEsR0FDWjs7TUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsR0FBRywyQkFBMkIsQUFBQyxFQUFDLFNBQVMsRUFBQyxrQkFBa0IsRUFBQyxhQUFVLFdBQVc7SUFDOUcsSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekcsQUFDUCxDQUFDO0dBQ0Y7O0FBRUQsU0FDQzs7S0FBSyxHQUFHLEVBQUUsVUFBQSxHQUFHO1lBQUksT0FBSyxPQUFPLEdBQUcsR0FBRztLQUFBLEFBQUM7QUFDbEMsYUFBUyxFQUFFLFNBQVMsQUFBQztBQUNyQixTQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEFBQUM7R0FDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztHQUNuQzs7TUFBSyxHQUFHLEVBQUUsVUFBQSxHQUFHO2FBQUksT0FBSyxPQUFPLEdBQUcsR0FBRztNQUFBLEFBQUM7QUFDbkMsY0FBUyxFQUFDLGdCQUFnQjtBQUMxQixVQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUM7QUFDeEIsY0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEFBQUM7QUFDOUIsZ0JBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxBQUFDO0FBQ2xDLGVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxBQUFDO0FBQ2hDLGlCQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixBQUFDO0FBQ3BDLGdCQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQUFBQzs7SUFFbEM7O09BQU0sU0FBUyxFQUFDLDRCQUE0QixFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQUFBQztLQUMvRSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUM7S0FDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUM7S0FDM0M7SUFDTixhQUFhO0lBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRTtJQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFO0lBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQUU7SUFDZDtHQUNMLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxJQUFJLEVBQUUsYUFBYSxDQUFDLEdBQUcsSUFBSTtHQUMzRixDQUNMO0VBQ0Y7O0NBRUQsQ0FBQyxDQUFDOztxQkFFWSxNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9TZWxlY3QnO1xuaW1wb3J0IHN0cmlwRGlhY3JpdGljcyBmcm9tICcuL3V0aWxzL3N0cmlwRGlhY3JpdGljcyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcblx0YXV0b2xvYWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYGxvYWRPcHRpb25zYCBwcm9wIG9uLW1vdW50OyBkZWZhdWx0cyB0byB0cnVlXG5cdGNhY2hlOiBSZWFjdC5Qcm9wVHlwZXMuYW55LCAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3QgdG8gdXNlIHRvIGNhY2hlIHJlc3VsdHM7IHNldCB0byBudWxsL2ZhbHNlIHRvIGRpc2FibGUgY2FjaGluZ1xuXHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCwgICAgICAgLy8gQ2hpbGQgZnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoZSBpbm5lciBTZWxlY3QgY29tcG9uZW50OyAocHJvcHM6IE9iamVjdCk6IFByb3BUeXBlcy5lbGVtZW50XG5cdGlnbm9yZUFjY2VudHM6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyBzdHJpcCBkaWFjcml0aWNzIHdoZW4gZmlsdGVyaW5nOyBkZWZhdWx0cyB0byB0cnVlXG5cdGlnbm9yZUNhc2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgICAvLyBwZXJmb3JtIGNhc2UtaW5zZW5zaXRpdmUgZmlsdGVyaW5nOyBkZWZhdWx0cyB0byB0cnVlXG5cdGxvYWRpbmdQbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbICAvLyByZXBsYWNlcyB0aGUgcGxhY2Vob2xkZXIgd2hpbGUgb3B0aW9ucyBhcmUgbG9hZGluZ1xuXHRcdFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UmVhY3QuUHJvcFR5cGVzLm5vZGVcblx0XSksXG5cdGxvYWRPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLCAgICAvLyBjYWxsYmFjayB0byBsb2FkIG9wdGlvbnMgYXN5bmNocm9ub3VzbHk7IChpbnB1dFZhbHVlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6ID9Qcm9taXNlXG5cdG11bHRpOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAgICAgICAvLyBtdWx0aS12YWx1ZSBpbnB1dFxuXHRvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCwgICAgICAgICAgICAgLy8gYXJyYXkgb2Ygb3B0aW9uc1xuXHRwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbICAgICAgICAgLy8gZmllbGQgcGxhY2Vob2xkZXIsIGRpc3BsYXllZCB3aGVuIHRoZXJlJ3Mgbm8gdmFsdWUgKHNoYXJlZCB3aXRoIFNlbGVjdClcblx0XHRSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFJlYWN0LlByb3BUeXBlcy5ub2RlXG5cdF0pLFxuXHRub1Jlc3VsdHNUZXh0OiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFsgICAgICAgLy8gZmllbGQgbm9SZXN1bHRzVGV4dCwgZGlzcGxheWVkIHdoZW4gbm8gb3B0aW9ucyBjb21lIGJhY2sgZnJvbSB0aGUgc2VydmVyXG5cdFx0UmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRSZWFjdC5Qcm9wVHlwZXMubm9kZVxuXHRdKSxcblx0b25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgICAgIC8vIG9uQ2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge31cblx0c2VhcmNoUHJvbXB0VGV4dDogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbICAgIC8vIGxhYmVsIHRvIHByb21wdCBmb3Igc2VhcmNoIGlucHV0XG5cdFx0UmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRSZWFjdC5Qcm9wVHlwZXMubm9kZVxuXHRdKSxcblx0b25JbnB1dENoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgIC8vIG9wdGlvbmFsIGZvciBrZWVwaW5nIHRyYWNrIG9mIHdoYXQgaXMgYmVpbmcgdHlwZWRcblx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5hbnksICAgICAgICAgICAgICAgICAgICAgIC8vIGluaXRpYWwgZmllbGQgdmFsdWVcbn07XG5cbmNvbnN0IGRlZmF1bHRDYWNoZSA9IHt9O1xuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG5cdGF1dG9sb2FkOiB0cnVlLFxuXHRjYWNoZTogZGVmYXVsdENhY2hlLFxuXHRjaGlsZHJlbjogZGVmYXVsdENoaWxkcmVuLFxuXHRpZ25vcmVBY2NlbnRzOiB0cnVlLFxuXHRpZ25vcmVDYXNlOiB0cnVlLFxuXHRsb2FkaW5nUGxhY2Vob2xkZXI6ICdMb2FkaW5nLi4uJyxcblx0b3B0aW9uczogW10sXG5cdHNlYXJjaFByb21wdFRleHQ6ICdUeXBlIHRvIHNlYXJjaCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3luYyBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yIChwcm9wcywgY29udGV4dCkge1xuXHRcdHN1cGVyKHByb3BzLCBjb250ZXh0KTtcblxuXHRcdHRoaXMuX2NhY2hlID0gcHJvcHMuY2FjaGUgPT09IGRlZmF1bHRDYWNoZSA/IHt9IDogcHJvcHMuY2FjaGU7XG5cblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0aXNMb2FkaW5nOiBmYWxzZSxcblx0XHRcdG9wdGlvbnM6IHByb3BzLm9wdGlvbnMsXG5cdFx0fTtcblxuXHRcdHRoaXMuX29uSW5wdXRDaGFuZ2UgPSB0aGlzLl9vbklucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XG5cdFx0Y29uc3QgeyBhdXRvbG9hZCB9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmIChhdXRvbG9hZCkge1xuXHRcdFx0dGhpcy5sb2FkT3B0aW9ucygnJyk7XG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcblx0XHRjb25zdCBwcm9wZXJ0aWVzVG9TeW5jID0gWydvcHRpb25zJ107XG5cdFx0cHJvcGVydGllc1RvU3luYy5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5wcm9wc1twcm9wXSAhPT0gbmV4dFByb3BzW3Byb3BdKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFtwcm9wXTogbmV4dFByb3BzW3Byb3BdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXJPcHRpb25zKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBvcHRpb25zOiBbXSB9KTtcblx0fVxuXG5cdGxvYWRPcHRpb25zIChpbnB1dFZhbHVlKSB7XG5cdFx0Y29uc3QgeyBsb2FkT3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCBjYWNoZSA9IHRoaXMuX2NhY2hlO1xuXG5cdFx0aWYgKFxuXHRcdFx0Y2FjaGUgJiZcblx0XHRcdGNhY2hlLmhhc093blByb3BlcnR5KGlucHV0VmFsdWUpXG5cdFx0KSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0b3B0aW9uczogY2FjaGVbaW5wdXRWYWx1ZV1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgY2FsbGJhY2sgPSAoZXJyb3IsIGRhdGEpID0+IHtcblx0XHRcdGlmIChjYWxsYmFjayA9PT0gdGhpcy5fY2FsbGJhY2spIHtcblx0XHRcdFx0dGhpcy5fY2FsbGJhY2sgPSBudWxsO1xuXG5cdFx0XHRcdGNvbnN0IG9wdGlvbnMgPSBkYXRhICYmIGRhdGEub3B0aW9ucyB8fCBbXTtcblxuXHRcdFx0XHRpZiAoY2FjaGUpIHtcblx0XHRcdFx0XHRjYWNoZVtpbnB1dFZhbHVlXSA9IG9wdGlvbnM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRcdG9wdGlvbnNcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIElnbm9yZSBhbGwgYnV0IHRoZSBtb3N0IHJlY2VudCByZXF1ZXN0XG5cdFx0dGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdGNvbnN0IHByb21pc2UgPSBsb2FkT3B0aW9ucyhpbnB1dFZhbHVlLCBjYWxsYmFjayk7XG5cdFx0aWYgKHByb21pc2UpIHtcblx0XHRcdHByb21pc2UudGhlbihcblx0XHRcdFx0KGRhdGEpID0+IGNhbGxiYWNrKG51bGwsIGRhdGEpLFxuXHRcdFx0XHQoZXJyb3IpID0+IGNhbGxiYWNrKGVycm9yKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHR0aGlzLl9jYWxsYmFjayAmJlxuXHRcdFx0IXRoaXMuc3RhdGUuaXNMb2FkaW5nXG5cdFx0KSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aXNMb2FkaW5nOiB0cnVlXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaW5wdXRWYWx1ZTtcblx0fVxuXG5cdF9vbklucHV0Q2hhbmdlIChpbnB1dFZhbHVlKSB7XG5cdFx0Y29uc3QgeyBpZ25vcmVBY2NlbnRzLCBpZ25vcmVDYXNlLCBvbklucHV0Q2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0aWYgKGlnbm9yZUFjY2VudHMpIHtcblx0XHRcdGlucHV0VmFsdWUgPSBzdHJpcERpYWNyaXRpY3MoaW5wdXRWYWx1ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKGlnbm9yZUNhc2UpIHtcblx0XHRcdGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdFx0fVxuXG5cdFx0aWYgKG9uSW5wdXRDaGFuZ2UpIHtcblx0XHRcdG9uSW5wdXRDaGFuZ2UoaW5wdXRWYWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMubG9hZE9wdGlvbnMoaW5wdXRWYWx1ZSk7XG5cdH1cblxuXHRpbnB1dFZhbHVlKCkge1xuXHRcdGlmICh0aGlzLnNlbGVjdCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc2VsZWN0LnN0YXRlLmlucHV0VmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdG5vUmVzdWx0c1RleHQoKSB7XG5cdFx0Y29uc3QgeyBsb2FkaW5nUGxhY2Vob2xkZXIsIG5vUmVzdWx0c1RleHQsIHNlYXJjaFByb21wdFRleHQgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgeyBpc0xvYWRpbmcgfSA9IHRoaXMuc3RhdGU7XG5cblx0XHRjb25zdCBpbnB1dFZhbHVlID0gdGhpcy5pbnB1dFZhbHVlKCk7XG5cblx0XHRpZiAoaXNMb2FkaW5nKSB7XG5cdFx0XHRyZXR1cm4gbG9hZGluZ1BsYWNlaG9sZGVyO1xuXHRcdH1cblx0XHRpZiAoaW5wdXRWYWx1ZSAmJiBub1Jlc3VsdHNUZXh0KSB7XG5cdFx0XHRyZXR1cm4gbm9SZXN1bHRzVGV4dDtcblx0XHR9XG5cdFx0cmV0dXJuIHNlYXJjaFByb21wdFRleHQ7XG5cdH1cblxuXHRmb2N1cyAoKSB7XG5cdFx0dGhpcy5zZWxlY3QuZm9jdXMoKTtcblx0fVxuXG5cdHJlbmRlciAoKSB7XG5cdFx0Y29uc3QgeyBjaGlsZHJlbiwgbG9hZGluZ1BsYWNlaG9sZGVyLCBwbGFjZWhvbGRlciB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB7IGlzTG9hZGluZywgb3B0aW9ucyB9ID0gdGhpcy5zdGF0ZTtcblxuXHRcdGNvbnN0IHByb3BzID0ge1xuXHRcdFx0bm9SZXN1bHRzVGV4dDogdGhpcy5ub1Jlc3VsdHNUZXh0KCksXG5cdFx0XHRwbGFjZWhvbGRlcjogaXNMb2FkaW5nID8gbG9hZGluZ1BsYWNlaG9sZGVyIDogcGxhY2Vob2xkZXIsXG5cdFx0XHRvcHRpb25zOiAoaXNMb2FkaW5nICYmIGxvYWRpbmdQbGFjZWhvbGRlcikgPyBbXSA6IG9wdGlvbnMsXG5cdFx0XHRyZWY6IChyZWYpID0+ICh0aGlzLnNlbGVjdCA9IHJlZiksXG5cdFx0XHRvbkNoYW5nZTogKG5ld1ZhbHVlcykgPT4ge1xuXHRcdFx0XHR0aGlzLl9vbklucHV0Q2hhbmdlKCcnKTtcblx0XHRcdFx0aWYgKHRoaXMucHJvcHMubXVsdGkpIHtcblx0XHRcdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZShuZXdWYWx1ZXMpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gY2hpbGRyZW4oe1xuXHRcdFx0Li4udGhpcy5wcm9wcyxcblx0XHRcdC4uLnByb3BzLFxuXHRcdFx0aXNMb2FkaW5nLFxuXHRcdFx0b25JbnB1dENoYW5nZTogdGhpcy5fb25JbnB1dENoYW5nZSxcblx0XHRcdG9uQmx1cjogKCkgPT4geyB0aGlzLl9vbklucHV0Q2hhbmdlKCcnKTsgIH1cblx0XHR9KTtcblx0fVxufVxuXG5Bc3luYy5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5Bc3luYy5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbmZ1bmN0aW9uIGRlZmF1bHRDaGlsZHJlbiAocHJvcHMpIHtcblx0cmV0dXJuIChcblx0XHQ8U2VsZWN0IHsuLi5wcm9wc30gLz5cblx0KTtcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vU2VsZWN0JztcclxuXHJcbmZ1bmN0aW9uIHJlZHVjZShvYmosIHByb3BzID0ge30pe1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopXHJcbiAgLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSBvYmpba2V5XTtcclxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSBwcm9wc1trZXldID0gdmFsdWU7XHJcbiAgICByZXR1cm4gcHJvcHM7XHJcbiAgfSwgcHJvcHMpO1xyXG59XHJcblxyXG5jb25zdCBBc3luY0NyZWF0YWJsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRkaXNwbGF5TmFtZTogJ0FzeW5jQ3JlYXRhYmxlU2VsZWN0JyxcclxuXHJcblx0cmVuZGVyICgpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTZWxlY3QuQXN5bmMgey4uLnRoaXMucHJvcHN9PlxyXG5cdFx0XHRcdHsoYXN5bmNQcm9wcykgPT4gKFxyXG5cdFx0XHRcdFx0PFNlbGVjdC5DcmVhdGFibGUgey4uLnRoaXMucHJvcHN9PlxyXG5cdFx0XHRcdFx0XHR7KGNyZWF0YWJsZVByb3BzKSA9PiAoXHJcblx0XHRcdFx0XHRcdFx0PFNlbGVjdFxyXG5cdFx0XHRcdFx0XHRcdFx0ey4uLnJlZHVjZShhc3luY1Byb3BzLCByZWR1Y2UoY3JlYXRhYmxlUHJvcHMsIHt9KSl9XHJcblx0XHRcdFx0XHRcdFx0XHRvbklucHV0Q2hhbmdlPXsoaW5wdXQpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRhYmxlUHJvcHMub25JbnB1dENoYW5nZShpbnB1dCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBhc3luY1Byb3BzLm9uSW5wdXRDaGFuZ2UoaW5wdXQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fX1cclxuXHRcdFx0XHRcdFx0XHRcdHJlZj17KHJlZikgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGFibGVQcm9wcy5yZWYocmVmKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YXN5bmNQcm9wcy5yZWYocmVmKTtcclxuXHRcdFx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0KX1cclxuXHRcdFx0XHRcdDwvU2VsZWN0LkNyZWF0YWJsZT5cclxuXHRcdFx0XHQpfVxyXG5cdFx0XHQ8L1NlbGVjdC5Bc3luYz5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXN5bmNDcmVhdGFibGU7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9TZWxlY3QnO1xyXG5pbXBvcnQgZGVmYXVsdEZpbHRlck9wdGlvbnMgZnJvbSAnLi91dGlscy9kZWZhdWx0RmlsdGVyT3B0aW9ucyc7XHJcbmltcG9ydCBkZWZhdWx0TWVudVJlbmRlcmVyIGZyb20gJy4vdXRpbHMvZGVmYXVsdE1lbnVSZW5kZXJlcic7XHJcblxyXG5jb25zdCBDcmVhdGFibGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdDcmVhdGFibGVTZWxlY3QnLFxyXG5cclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdC8vIENoaWxkIGZ1bmN0aW9uIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGUgaW5uZXIgU2VsZWN0IGNvbXBvbmVudFxyXG5cdFx0Ly8gVGhpcyBjb21wb25lbnQgY2FuIGJlIHVzZWQgdG8gY29tcG9zZSBIT0NzIChlZyBDcmVhdGFibGUgYW5kIEFzeW5jKVxyXG5cdFx0Ly8gKHByb3BzOiBPYmplY3QpOiBQcm9wVHlwZXMuZWxlbWVudFxyXG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cclxuXHRcdC8vIFNlZSBTZWxlY3QucHJvcFR5cGVzLmZpbHRlck9wdGlvbnNcclxuXHRcdGZpbHRlck9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hbnksXHJcblxyXG5cdFx0Ly8gU2VhcmNoZXMgZm9yIGFueSBtYXRjaGluZyBvcHRpb24gd2l0aGluIHRoZSBzZXQgb2Ygb3B0aW9ucy5cclxuXHRcdC8vIFRoaXMgZnVuY3Rpb24gcHJldmVudHMgZHVwbGljYXRlIG9wdGlvbnMgZnJvbSBiZWluZyBjcmVhdGVkLlxyXG5cdFx0Ly8gKHsgb3B0aW9uOiBPYmplY3QsIG9wdGlvbnM6IEFycmF5LCBsYWJlbEtleTogc3RyaW5nLCB2YWx1ZUtleTogc3RyaW5nIH0pOiBib29sZWFuXHJcblx0XHRpc09wdGlvblVuaXF1ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblxyXG5cdCAgICAvLyBEZXRlcm1pbmVzIGlmIHRoZSBjdXJyZW50IGlucHV0IHRleHQgcmVwcmVzZW50cyBhIHZhbGlkIG9wdGlvbi5cclxuXHQgICAgLy8gKHsgbGFiZWw6IHN0cmluZyB9KTogYm9vbGVhblxyXG5cdCAgICBpc1ZhbGlkTmV3T3B0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHJcblx0XHQvLyBTZWUgU2VsZWN0LnByb3BUeXBlcy5tZW51UmVuZGVyZXJcclxuXHRcdG1lbnVSZW5kZXJlcjogUmVhY3QuUHJvcFR5cGVzLmFueSxcclxuXHJcblx0ICAgIC8vIEZhY3RvcnkgdG8gY3JlYXRlIG5ldyBvcHRpb24uXHJcblx0ICAgIC8vICh7IGxhYmVsOiBzdHJpbmcsIGxhYmVsS2V5OiBzdHJpbmcsIHZhbHVlS2V5OiBzdHJpbmcgfSk6IE9iamVjdFxyXG5cdFx0bmV3T3B0aW9uQ3JlYXRvcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblxyXG5cdFx0Ly8gaW5wdXQgY2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChpbnB1dFZhbHVlKSB7fVxyXG5cdFx0b25JbnB1dENoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblxyXG5cdFx0Ly8gaW5wdXQga2V5RG93biBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XHJcblx0XHRvbklucHV0S2V5RG93bjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblxyXG5cdFx0Ly8gbmV3IG9wdGlvbiBjbGljayBoYW5kbGVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxyXG5cdFx0b25OZXdPcHRpb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblxyXG5cdFx0Ly8gU2VlIFNlbGVjdC5wcm9wVHlwZXMub3B0aW9uc1xyXG5cdFx0b3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG5cclxuXHQgICAgLy8gQ3JlYXRlcyBwcm9tcHQvcGxhY2Vob2xkZXIgb3B0aW9uIHRleHQuXHJcblx0ICAgIC8vIChmaWx0ZXJUZXh0OiBzdHJpbmcpOiBzdHJpbmdcclxuXHRcdHByb21wdFRleHRDcmVhdG9yOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHJcblx0XHQvLyBEZWNpZGVzIGlmIGEga2V5RG93biBldmVudCAoZWcgaXRzIGBrZXlDb2RlYCkgc2hvdWxkIHJlc3VsdCBpbiB0aGUgY3JlYXRpb24gb2YgYSBuZXcgb3B0aW9uLlxyXG5cdFx0c2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHR9LFxyXG5cclxuXHQvLyBEZWZhdWx0IHByb3AgbWV0aG9kc1xyXG5cdHN0YXRpY3M6IHtcclxuXHRcdGlzT3B0aW9uVW5pcXVlLFxyXG5cdFx0aXNWYWxpZE5ld09wdGlvbixcclxuXHRcdG5ld09wdGlvbkNyZWF0b3IsXHJcblx0XHRwcm9tcHRUZXh0Q3JlYXRvcixcclxuXHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvblxyXG5cdH0sXHJcblxyXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmaWx0ZXJPcHRpb25zOiBkZWZhdWx0RmlsdGVyT3B0aW9ucyxcclxuXHRcdFx0aXNPcHRpb25VbmlxdWUsXHJcblx0XHRcdGlzVmFsaWROZXdPcHRpb24sXHJcblx0XHRcdG1lbnVSZW5kZXJlcjogZGVmYXVsdE1lbnVSZW5kZXJlcixcclxuXHRcdFx0bmV3T3B0aW9uQ3JlYXRvcixcclxuXHRcdFx0cHJvbXB0VGV4dENyZWF0b3IsXHJcblx0XHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbixcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlTmV3T3B0aW9uICgpIHtcclxuXHRcdGNvbnN0IHtcclxuXHRcdFx0aXNWYWxpZE5ld09wdGlvbixcclxuXHRcdFx0bmV3T3B0aW9uQ3JlYXRvcixcclxuXHRcdFx0b25OZXdPcHRpb25DbGljayxcclxuXHRcdFx0b3B0aW9ucyA9IFtdLFxyXG5cdFx0XHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb25cclxuXHRcdH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdGlmIChpc1ZhbGlkTmV3T3B0aW9uKHsgbGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSB9KSkge1xyXG5cdFx0XHRjb25zdCBvcHRpb24gPSBuZXdPcHRpb25DcmVhdG9yKHsgbGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSwgbGFiZWxLZXk6IHRoaXMubGFiZWxLZXksIHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5IH0pO1xyXG5cdFx0XHRjb25zdCBpc09wdGlvblVuaXF1ZSA9IHRoaXMuaXNPcHRpb25VbmlxdWUoeyBvcHRpb24gfSk7XHJcblxyXG5cdFx0XHQvLyBEb24ndCBhZGQgdGhlIHNhbWUgb3B0aW9uIHR3aWNlLlxyXG5cdFx0XHRpZiAoaXNPcHRpb25VbmlxdWUpIHtcclxuXHRcdFx0XHRpZiAob25OZXdPcHRpb25DbGljaykge1xyXG5cdFx0XHRcdFx0b25OZXdPcHRpb25DbGljayhvcHRpb24pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLnVuc2hpZnQob3B0aW9uKTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLnNlbGVjdC5zZWxlY3RWYWx1ZShvcHRpb24pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGZpbHRlck9wdGlvbnMgKC4uLnBhcmFtcykge1xyXG5cdFx0Y29uc3QgeyBmaWx0ZXJPcHRpb25zLCBpc1ZhbGlkTmV3T3B0aW9uLCBvcHRpb25zLCBwcm9tcHRUZXh0Q3JlYXRvciB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHQvLyBUUklDS1kgQ2hlY2sgY3VycmVudGx5IHNlbGVjdGVkIG9wdGlvbnMgYXMgd2VsbC5cclxuXHRcdC8vIERvbid0IGRpc3BsYXkgYSBjcmVhdGUtcHJvbXB0IGZvciBhIHZhbHVlIHRoYXQncyBzZWxlY3RlZC5cclxuXHRcdC8vIFRoaXMgY292ZXJzIGFzeW5jIGVkZ2UtY2FzZXMgd2hlcmUgYSBuZXdseS1jcmVhdGVkIE9wdGlvbiBpc24ndCB5ZXQgaW4gdGhlIGFzeW5jLWxvYWRlZCBhcnJheS5cclxuXHRcdGNvbnN0IGV4Y2x1ZGVPcHRpb25zID0gcGFyYW1zWzJdIHx8IFtdO1xyXG5cclxuXHRcdGNvbnN0IGZpbHRlcmVkT3B0aW9ucyA9IGZpbHRlck9wdGlvbnMoLi4ucGFyYW1zKSB8fCBbXTtcclxuXHJcblx0XHRpZiAoaXNWYWxpZE5ld09wdGlvbih7IGxhYmVsOiB0aGlzLmlucHV0VmFsdWUgfSkpIHtcclxuXHRcdFx0Y29uc3QgeyBuZXdPcHRpb25DcmVhdG9yIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdFx0Y29uc3Qgb3B0aW9uID0gbmV3T3B0aW9uQ3JlYXRvcih7XHJcblx0XHRcdFx0bGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSxcclxuXHRcdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcclxuXHRcdFx0XHR2YWx1ZUtleTogdGhpcy52YWx1ZUtleVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIFRSSUNLWSBDb21wYXJlIHRvIGFsbCBvcHRpb25zIChub3QganVzdCBmaWx0ZXJlZCBvcHRpb25zKSBpbiBjYXNlIG9wdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHNlbGVjdGVkKS5cclxuXHRcdFx0Ly8gRm9yIG11bHRpLXNlbGVjdHMsIHRoaXMgd291bGQgcmVtb3ZlIGl0IGZyb20gdGhlIGZpbHRlcmVkIGxpc3QuXHJcblx0XHRcdGNvbnN0IGlzT3B0aW9uVW5pcXVlID0gdGhpcy5pc09wdGlvblVuaXF1ZSh7XHJcblx0XHRcdFx0b3B0aW9uLFxyXG5cdFx0XHRcdG9wdGlvbnM6IGV4Y2x1ZGVPcHRpb25zLmNvbmNhdChmaWx0ZXJlZE9wdGlvbnMpXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKGlzT3B0aW9uVW5pcXVlKSB7XHJcblx0XHRcdFx0Y29uc3QgcHJvbXB0ID0gcHJvbXB0VGV4dENyZWF0b3IodGhpcy5pbnB1dFZhbHVlKTtcclxuXHJcblx0XHRcdFx0dGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24gPSBuZXdPcHRpb25DcmVhdG9yKHtcclxuXHRcdFx0XHRcdGxhYmVsOiBwcm9tcHQsXHJcblx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcclxuXHRcdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGZpbHRlcmVkT3B0aW9ucy51bnNoaWZ0KHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyT3B0aW9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmaWx0ZXJlZE9wdGlvbnM7XHJcblx0fSxcclxuXHJcblx0aXNPcHRpb25VbmlxdWUgKHtcclxuXHRcdG9wdGlvbixcclxuXHRcdG9wdGlvbnNcclxuXHR9KSB7XHJcblx0XHRjb25zdCB7IGlzT3B0aW9uVW5pcXVlIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHRoaXMuc2VsZWN0LmZpbHRlck9wdGlvbnMoKTtcclxuXHJcblx0XHRyZXR1cm4gaXNPcHRpb25VbmlxdWUoe1xyXG5cdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcclxuXHRcdFx0b3B0aW9uLFxyXG5cdFx0XHRvcHRpb25zLFxyXG5cdFx0XHR2YWx1ZUtleTogdGhpcy52YWx1ZUtleVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0bWVudVJlbmRlcmVyIChwYXJhbXMpIHtcclxuXHRcdGNvbnN0IHsgbWVudVJlbmRlcmVyIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuXHRcdHJldHVybiBtZW51UmVuZGVyZXIoe1xyXG5cdFx0XHQuLi5wYXJhbXMsXHJcblx0XHRcdG9uU2VsZWN0OiB0aGlzLm9uT3B0aW9uU2VsZWN0LFxyXG5cdFx0XHRzZWxlY3RWYWx1ZTogdGhpcy5vbk9wdGlvblNlbGVjdFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0b25JbnB1dENoYW5nZSAoaW5wdXQpIHtcclxuXHRcdGNvbnN0IHsgb25JbnB1dENoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRpZiAob25JbnB1dENoYW5nZSkge1xyXG5cdFx0XHRvbklucHV0Q2hhbmdlKGlucHV0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUaGlzIHZhbHVlIG1heSBiZSBuZWVkZWQgaW4gYmV0d2VlbiBTZWxlY3QgbW91bnRzICh3aGVuIHRoaXMuc2VsZWN0IGlzIG51bGwpXHJcblx0XHR0aGlzLmlucHV0VmFsdWUgPSBpbnB1dDtcclxuXHR9LFxyXG5cclxuXHRvbklucHV0S2V5RG93biAoZXZlbnQpIHtcclxuXHRcdGNvbnN0IHsgc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uLCBvbklucHV0S2V5RG93biB9ID0gdGhpcy5wcm9wcztcclxuXHRcdGNvbnN0IGZvY3VzZWRPcHRpb24gPSB0aGlzLnNlbGVjdC5nZXRGb2N1c2VkT3B0aW9uKCk7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHRmb2N1c2VkT3B0aW9uICYmXHJcblx0XHRcdGZvY3VzZWRPcHRpb24gPT09IHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyT3B0aW9uICYmXHJcblx0XHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbih7IGtleUNvZGU6IGV2ZW50LmtleUNvZGUgfSlcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLmNyZWF0ZU5ld09wdGlvbigpO1xyXG5cclxuXHRcdFx0Ly8gUHJldmVudCBkZWNvcmF0ZWQgU2VsZWN0IGZyb20gZG9pbmcgYW55dGhpbmcgYWRkaXRpb25hbCB3aXRoIHRoaXMga2V5RG93biBldmVudFxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fSBlbHNlIGlmIChvbklucHV0S2V5RG93bikge1xyXG5cdFx0XHRvbklucHV0S2V5RG93bihldmVudCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0b25PcHRpb25TZWxlY3QgKG9wdGlvbiwgZXZlbnQpIHtcclxuXHRcdGlmIChvcHRpb24gPT09IHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyT3B0aW9uKSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlTmV3T3B0aW9uKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNlbGVjdC5zZWxlY3RWYWx1ZShvcHRpb24pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRjb25zdCB7XHJcblx0XHRcdG5ld09wdGlvbkNyZWF0b3IsXHJcblx0XHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbixcclxuXHRcdFx0Li4ucmVzdFByb3BzXHJcblx0XHR9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHRsZXQgeyBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcclxuXHJcblx0XHQvLyBXZSBjYW4ndCB1c2UgZGVzdHJ1Y3R1cmluZyBkZWZhdWx0IHZhbHVlcyB0byBzZXQgdGhlIGNoaWxkcmVuLFxyXG5cdFx0Ly8gYmVjYXVzZSBpdCB3b24ndCBhcHBseSB3b3JrIGlmIGBjaGlsZHJlbmAgaXMgbnVsbC4gQSBmYWxzeSBjaGVjayBpc1xyXG5cdFx0Ly8gbW9yZSByZWxpYWJsZSBpbiByZWFsIHdvcmxkIHVzZS1jYXNlcy5cclxuXHRcdGlmICghY2hpbGRyZW4pIHtcclxuXHRcdFx0Y2hpbGRyZW4gPSBkZWZhdWx0Q2hpbGRyZW47XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgcHJvcHMgPSB7XHJcblx0XHRcdC4uLnJlc3RQcm9wcyxcclxuXHRcdFx0YWxsb3dDcmVhdGU6IHRydWUsXHJcblx0XHRcdGZpbHRlck9wdGlvbnM6IHRoaXMuZmlsdGVyT3B0aW9ucyxcclxuXHRcdFx0bWVudVJlbmRlcmVyOiB0aGlzLm1lbnVSZW5kZXJlcixcclxuXHRcdFx0b25JbnB1dENoYW5nZTogdGhpcy5vbklucHV0Q2hhbmdlLFxyXG5cdFx0XHRvbklucHV0S2V5RG93bjogdGhpcy5vbklucHV0S2V5RG93bixcclxuXHRcdFx0cmVmOiAocmVmKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3QgPSByZWY7XHJcblxyXG5cdFx0XHRcdC8vIFRoZXNlIHZhbHVlcyBtYXkgYmUgbmVlZGVkIGluIGJldHdlZW4gU2VsZWN0IG1vdW50cyAod2hlbiB0aGlzLnNlbGVjdCBpcyBudWxsKVxyXG5cdFx0XHRcdGlmIChyZWYpIHtcclxuXHRcdFx0XHRcdHRoaXMubGFiZWxLZXkgPSByZWYucHJvcHMubGFiZWxLZXk7XHJcblx0XHRcdFx0XHR0aGlzLnZhbHVlS2V5ID0gcmVmLnByb3BzLnZhbHVlS2V5O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gY2hpbGRyZW4ocHJvcHMpO1xyXG5cdH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBkZWZhdWx0Q2hpbGRyZW4gKHByb3BzKSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxTZWxlY3Qgey4uLnByb3BzfSAvPlxyXG5cdCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc09wdGlvblVuaXF1ZSAoeyBvcHRpb24sIG9wdGlvbnMsIGxhYmVsS2V5LCB2YWx1ZUtleSB9KSB7XHJcblx0cmV0dXJuIG9wdGlvbnNcclxuXHRcdC5maWx0ZXIoKGV4aXN0aW5nT3B0aW9uKSA9PlxyXG5cdFx0XHRleGlzdGluZ09wdGlvbltsYWJlbEtleV0gPT09IG9wdGlvbltsYWJlbEtleV0gfHxcclxuXHRcdFx0ZXhpc3RpbmdPcHRpb25bdmFsdWVLZXldID09PSBvcHRpb25bdmFsdWVLZXldXHJcblx0XHQpXHJcblx0XHQubGVuZ3RoID09PSAwO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gaXNWYWxpZE5ld09wdGlvbiAoeyBsYWJlbCB9KSB7XHJcblx0cmV0dXJuICEhbGFiZWw7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBuZXdPcHRpb25DcmVhdG9yICh7IGxhYmVsLCBsYWJlbEtleSwgdmFsdWVLZXkgfSkge1xyXG5cdGNvbnN0IG9wdGlvbiA9IHt9O1xyXG5cdG9wdGlvblt2YWx1ZUtleV0gPSBsYWJlbDtcclxuIFx0b3B0aW9uW2xhYmVsS2V5XSA9IGxhYmVsO1xyXG4gXHRvcHRpb24uY2xhc3NOYW1lID0gJ1NlbGVjdC1jcmVhdGUtb3B0aW9uLXBsYWNlaG9sZGVyJztcclxuIFx0cmV0dXJuIG9wdGlvbjtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHByb21wdFRleHRDcmVhdG9yIChsYWJlbCkge1xyXG5cdHJldHVybiBgQ3JlYXRlIG9wdGlvbiBcIiR7bGFiZWx9XCJgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24gKHsga2V5Q29kZSB9KSB7XHJcblx0c3dpdGNoIChrZXlDb2RlKSB7XHJcblx0XHRjYXNlIDk6ICAgLy8gVEFCXHJcblx0XHRjYXNlIDEzOiAgLy8gRU5URVJcclxuXHRcdGNhc2UgMTg4OiAvLyBDT01NQVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ3JlYXRhYmxlO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbmNvbnN0IE9wdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcclxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgICAgLy8gY2xhc3NOYW1lIChiYXNlZCBvbiBtb3VzZSBwb3NpdGlvbilcclxuXHRcdGluc3RhbmNlUHJlZml4OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsICAvLyB1bmlxdWUgcHJlZml4IGZvciB0aGUgaWRzICh1c2VkIGZvciBhcmlhKVxyXG5cdFx0aXNEaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIGRpc2FibGVkXHJcblx0XHRpc0ZvY3VzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgIC8vIHRoZSBvcHRpb24gaXMgZm9jdXNlZFxyXG5cdFx0aXNTZWxlY3RlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkXHJcblx0XHRvbkZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgbW91c2VFbnRlciBvbiBvcHRpb24gZWxlbWVudFxyXG5cdFx0b25TZWxlY3Q6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgICAvLyBtZXRob2QgdG8gaGFuZGxlIGNsaWNrIG9uIG9wdGlvbiBlbGVtZW50XHJcblx0XHRvblVuZm9jdXM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgbW91c2VMZWF2ZSBvbiBvcHRpb24gZWxlbWVudFxyXG5cdFx0b3B0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsICAgICAvLyBvYmplY3QgdGhhdCBpcyBiYXNlIGZvciB0aGF0IG9wdGlvblxyXG5cdFx0b3B0aW9uSW5kZXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsICAgICAgICAgICAvLyBpbmRleCBvZiB0aGUgb3B0aW9uLCB1c2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBpZHMgZm9yIGFyaWFcclxuXHR9LFxyXG5cdGJsb2NrRXZlbnQgKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRpZiAoKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQScpIHx8ICEoJ2hyZWYnIGluIGV2ZW50LnRhcmdldCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGV2ZW50LnRhcmdldC50YXJnZXQpIHtcclxuXHRcdFx0d2luZG93Lm9wZW4oZXZlbnQudGFyZ2V0LmhyZWYsIGV2ZW50LnRhcmdldC50YXJnZXQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBldmVudC50YXJnZXQuaHJlZjtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRoYW5kbGVNb3VzZURvd24gKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR0aGlzLnByb3BzLm9uU2VsZWN0KHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlTW91c2VFbnRlciAoZXZlbnQpIHtcclxuXHRcdHRoaXMub25Gb2N1cyhldmVudCk7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlTW91c2VNb3ZlIChldmVudCkge1xyXG5cdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcclxuXHR9LFxyXG5cclxuXHRoYW5kbGVUb3VjaEVuZChldmVudCl7XHJcblx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2VcclxuXHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXHJcblx0XHRpZih0aGlzLmRyYWdnaW5nKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5oYW5kbGVNb3VzZURvd24oZXZlbnQpO1xyXG5cdH0sXHJcblxyXG5cdGhhbmRsZVRvdWNoTW92ZSAoZXZlbnQpIHtcclxuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXHJcblx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRoYW5kbGVUb3VjaFN0YXJ0IChldmVudCkge1xyXG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIG5vdCBiZWluZyBkcmFnZ2VkXHJcblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0b25Gb2N1cyAoZXZlbnQpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc0ZvY3VzZWQpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkZvY3VzKHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0dmFyIHsgb3B0aW9uLCBpbnN0YW5jZVByZWZpeCwgb3B0aW9uSW5kZXggfSA9IHRoaXMucHJvcHM7XHJcblx0XHR2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcyh0aGlzLnByb3BzLmNsYXNzTmFtZSwgb3B0aW9uLmNsYXNzTmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIG9wdGlvbi5kaXNhYmxlZCA/IChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuXHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5ibG9ja0V2ZW50fVxyXG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuYmxvY2tFdmVudH0+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KSA6IChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuXHRcdFx0XHRzdHlsZT17b3B0aW9uLnN0eWxlfVxyXG5cdFx0XHRcdHJvbGU9XCJvcHRpb25cIlxyXG5cdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn1cclxuXHRcdFx0XHRvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn1cclxuXHRcdFx0XHRvbk1vdXNlTW92ZT17dGhpcy5oYW5kbGVNb3VzZU1vdmV9XHJcblx0XHRcdFx0b25Ub3VjaFN0YXJ0PXt0aGlzLmhhbmRsZVRvdWNoU3RhcnR9XHJcblx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxyXG5cdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmR9XHJcblx0XHRcdFx0aWQ9e2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIG9wdGlvbkluZGV4fVxyXG5cdFx0XHRcdHRpdGxlPXtvcHRpb24udGl0bGV9PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT3B0aW9uO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbmNvbnN0IFZhbHVlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRkaXNwbGF5TmFtZTogJ1ZhbHVlJyxcclxuXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXHJcblx0XHRkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAgLy8gZGlzYWJsZWQgcHJvcCBwYXNzZWQgdG8gUmVhY3RTZWxlY3RcclxuXHRcdGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgICAgICAgICAvLyBVbmlxdWUgaWQgZm9yIHRoZSB2YWx1ZSAtIHVzZWQgZm9yIGFyaWFcclxuXHRcdG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgICAvLyBtZXRob2QgdG8gaGFuZGxlIGNsaWNrIG9uIHZhbHVlIGxhYmVsXHJcblx0XHRvblJlbW92ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSByZW1vdmFsIG9mIHRoZSB2YWx1ZVxyXG5cdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgICAgIC8vIHRoZSBvcHRpb24gb2JqZWN0IGZvciB0aGlzIHZhbHVlXHJcblx0fSxcclxuXHJcblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xyXG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy52YWx1ZSwgZXZlbnQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wcm9wcy52YWx1ZS5ocmVmKSB7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdG9uUmVtb3ZlIChldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0dGhpcy5wcm9wcy5vblJlbW92ZSh0aGlzLnByb3BzLnZhbHVlKTtcclxuXHR9LFxyXG5cclxuXHRoYW5kbGVUb3VjaEVuZFJlbW92ZSAoZXZlbnQpe1xyXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXHJcblx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxyXG5cdFx0aWYodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xyXG5cclxuXHRcdC8vIEZpcmUgdGhlIG1vdXNlIGV2ZW50c1xyXG5cdFx0dGhpcy5vblJlbW92ZShldmVudCk7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlVG91Y2hNb3ZlIChldmVudCkge1xyXG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWRcclxuXHRcdHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdGhhbmRsZVRvdWNoU3RhcnQgKGV2ZW50KSB7XHJcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcclxuXHRcdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXJSZW1vdmVJY29uICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8ICF0aGlzLnByb3BzLm9uUmVtb3ZlKSByZXR1cm47XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtdmFsdWUtaWNvblwiXHJcblx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuXHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5vblJlbW92ZX1cclxuXHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kUmVtb3ZlfVxyXG5cdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxyXG5cdFx0XHRcdG9uVG91Y2hNb3ZlPXt0aGlzLmhhbmRsZVRvdWNoTW92ZX0+XHJcblx0XHRcdFx0JnRpbWVzO1xyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckxhYmVsICgpIHtcclxuXHRcdGxldCBjbGFzc05hbWUgPSAnU2VsZWN0LXZhbHVlLWxhYmVsJztcclxuXHRcdHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2sgfHwgdGhpcy5wcm9wcy52YWx1ZS5ocmVmID8gKFxyXG5cdFx0XHQ8YSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gaHJlZj17dGhpcy5wcm9wcy52YWx1ZS5ocmVmfSB0YXJnZXQ9e3RoaXMucHJvcHMudmFsdWUudGFyZ2V0fSBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259IG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlTW91c2VEb3dufT5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0PC9hPlxyXG5cdFx0KSA6IChcclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHJvbGU9XCJvcHRpb25cIiBhcmlhLXNlbGVjdGVkPVwidHJ1ZVwiIGlkPXt0aGlzLnByb3BzLmlkfT5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ1NlbGVjdC12YWx1ZScsIHRoaXMucHJvcHMudmFsdWUuY2xhc3NOYW1lKX1cclxuXHRcdFx0XHRzdHlsZT17dGhpcy5wcm9wcy52YWx1ZS5zdHlsZX1cclxuXHRcdFx0XHR0aXRsZT17dGhpcy5wcm9wcy52YWx1ZS50aXRsZX1cclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0e3RoaXMucmVuZGVyUmVtb3ZlSWNvbigpfVxyXG5cdFx0XHRcdHt0aGlzLnJlbmRlckxhYmVsKCl9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVmFsdWU7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcnJvd1JlbmRlcmVyICh7IG9uTW91c2VEb3duIH0pIHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PHNwYW5cclxuXHRcdFx0Y2xhc3NOYW1lPVwiU2VsZWN0LWFycm93XCJcclxuXHRcdFx0b25Nb3VzZURvd249e29uTW91c2VEb3dufVxyXG5cdFx0Lz5cclxuXHQpO1xyXG59O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xlYXJSZW5kZXJlciAoKSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxzcGFuXHJcblx0XHRcdGNsYXNzTmFtZT1cIlNlbGVjdC1jbGVhclwiXHJcblx0XHRcdGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogJyZ0aW1lczsnIH19XHJcblx0XHQvPlxyXG5cdCk7XHJcbn07XHJcbiIsImltcG9ydCBzdHJpcERpYWNyaXRpY3MgZnJvbSAnLi9zdHJpcERpYWNyaXRpY3MnO1xyXG5cclxuZnVuY3Rpb24gZmlsdGVyT3B0aW9ucyAob3B0aW9ucywgZmlsdGVyVmFsdWUsIGV4Y2x1ZGVPcHRpb25zLCBwcm9wcykge1xyXG5cdGlmIChwcm9wcy5pZ25vcmVBY2NlbnRzKSB7XHJcblx0XHRmaWx0ZXJWYWx1ZSA9IHN0cmlwRGlhY3JpdGljcyhmaWx0ZXJWYWx1ZSk7XHJcblx0fVxyXG5cclxuXHRpZiAocHJvcHMuaWdub3JlQ2FzZSkge1xyXG5cdFx0ZmlsdGVyVmFsdWUgPSBmaWx0ZXJWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHJcblx0aWYgKGV4Y2x1ZGVPcHRpb25zKSBleGNsdWRlT3B0aW9ucyA9IGV4Y2x1ZGVPcHRpb25zLm1hcChpID0+IGlbcHJvcHMudmFsdWVLZXldKTtcclxuXHJcblx0cmV0dXJuIG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XHJcblx0XHRpZiAoZXhjbHVkZU9wdGlvbnMgJiYgZXhjbHVkZU9wdGlvbnMuaW5kZXhPZihvcHRpb25bcHJvcHMudmFsdWVLZXldKSA+IC0xKSByZXR1cm4gZmFsc2U7XHJcblx0XHRpZiAocHJvcHMuZmlsdGVyT3B0aW9uKSByZXR1cm4gcHJvcHMuZmlsdGVyT3B0aW9uLmNhbGwodGhpcywgb3B0aW9uLCBmaWx0ZXJWYWx1ZSk7XHJcblx0XHRpZiAoIWZpbHRlclZhbHVlKSByZXR1cm4gdHJ1ZTtcclxuXHRcdHZhciB2YWx1ZVRlc3QgPSBTdHJpbmcob3B0aW9uW3Byb3BzLnZhbHVlS2V5XSk7XHJcblx0XHR2YXIgbGFiZWxUZXN0ID0gU3RyaW5nKG9wdGlvbltwcm9wcy5sYWJlbEtleV0pO1xyXG5cdFx0aWYgKHByb3BzLmlnbm9yZUFjY2VudHMpIHtcclxuXHRcdFx0aWYgKHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJykgdmFsdWVUZXN0ID0gc3RyaXBEaWFjcml0aWNzKHZhbHVlVGVzdCk7XHJcblx0XHRcdGlmIChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScpIGxhYmVsVGVzdCA9IHN0cmlwRGlhY3JpdGljcyhsYWJlbFRlc3QpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHByb3BzLmlnbm9yZUNhc2UpIHtcclxuXHRcdFx0aWYgKHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJykgdmFsdWVUZXN0ID0gdmFsdWVUZXN0LnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdGlmIChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScpIGxhYmVsVGVzdCA9IGxhYmVsVGVzdC50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHByb3BzLm1hdGNoUG9zID09PSAnc3RhcnQnID8gKFxyXG5cdFx0XHQocHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnICYmIHZhbHVlVGVzdC5zdWJzdHIoMCwgZmlsdGVyVmFsdWUubGVuZ3RoKSA9PT0gZmlsdGVyVmFsdWUpIHx8XHJcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgbGFiZWxUZXN0LnN1YnN0cigwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZSlcclxuXHRcdCkgOiAoXHJcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcgJiYgdmFsdWVUZXN0LmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDApIHx8XHJcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgbGFiZWxUZXN0LmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDApXHJcblx0XHQpO1xyXG5cdH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZpbHRlck9wdGlvbnM7XHJcbiIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZnVuY3Rpb24gbWVudVJlbmRlcmVyICh7XHJcblx0Zm9jdXNlZE9wdGlvbixcclxuXHRpbnN0YW5jZVByZWZpeCxcclxuXHRsYWJlbEtleSxcclxuXHRvbkZvY3VzLFxyXG5cdG9uU2VsZWN0LFxyXG5cdG9wdGlvbkNsYXNzTmFtZSxcclxuXHRvcHRpb25Db21wb25lbnQsXHJcblx0b3B0aW9uUmVuZGVyZXIsXHJcblx0b3B0aW9ucyxcclxuXHR2YWx1ZUFycmF5LFxyXG5cdHZhbHVlS2V5LFxyXG5cdG9uT3B0aW9uUmVmXHJcbn0pIHtcclxuXHRsZXQgT3B0aW9uID0gb3B0aW9uQ29tcG9uZW50O1xyXG5cclxuXHRyZXR1cm4gb3B0aW9ucy5tYXAoKG9wdGlvbiwgaSkgPT4ge1xyXG5cdFx0bGV0IGlzU2VsZWN0ZWQgPSB2YWx1ZUFycmF5ICYmIHZhbHVlQXJyYXkuaW5kZXhPZihvcHRpb24pID4gLTE7XHJcblx0XHRsZXQgaXNGb2N1c2VkID0gb3B0aW9uID09PSBmb2N1c2VkT3B0aW9uO1xyXG5cdFx0bGV0IG9wdGlvbkNsYXNzID0gY2xhc3NOYW1lcyhvcHRpb25DbGFzc05hbWUsIHtcclxuXHRcdFx0J1NlbGVjdC1vcHRpb24nOiB0cnVlLFxyXG5cdFx0XHQnaXMtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkLFxyXG5cdFx0XHQnaXMtZm9jdXNlZCc6IGlzRm9jdXNlZCxcclxuXHRcdFx0J2lzLWRpc2FibGVkJzogb3B0aW9uLmRpc2FibGVkLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PE9wdGlvblxyXG5cdFx0XHRcdGNsYXNzTmFtZT17b3B0aW9uQ2xhc3N9XHJcblx0XHRcdFx0aW5zdGFuY2VQcmVmaXg9e2luc3RhbmNlUHJlZml4fVxyXG5cdFx0XHRcdGlzRGlzYWJsZWQ9e29wdGlvbi5kaXNhYmxlZH1cclxuXHRcdFx0XHRpc0ZvY3VzZWQ9e2lzRm9jdXNlZH1cclxuXHRcdFx0XHRpc1NlbGVjdGVkPXtpc1NlbGVjdGVkfVxyXG5cdFx0XHRcdGtleT17YG9wdGlvbi0ke2l9LSR7b3B0aW9uW3ZhbHVlS2V5XX1gfVxyXG5cdFx0XHRcdG9uRm9jdXM9e29uRm9jdXN9XHJcblx0XHRcdFx0b25TZWxlY3Q9e29uU2VsZWN0fVxyXG5cdFx0XHRcdG9wdGlvbj17b3B0aW9ufVxyXG5cdFx0XHRcdG9wdGlvbkluZGV4PXtpfVxyXG5cdFx0XHRcdHJlZj17cmVmID0+IHsgb25PcHRpb25SZWYocmVmLCBpc0ZvY3VzZWQpOyB9fVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0e29wdGlvblJlbmRlcmVyKG9wdGlvbiwgaSl9XHJcblx0XHRcdDwvT3B0aW9uPlxyXG5cdFx0KTtcclxuXHR9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtZW51UmVuZGVyZXI7XHJcbiIsInZhciBtYXAgPSBbXHJcblx0eyAnYmFzZSc6J0EnLCAnbGV0dGVycyc6L1tcXHUwMDQxXFx1MjRCNlxcdUZGMjFcXHUwMEMwXFx1MDBDMVxcdTAwQzJcXHUxRUE2XFx1MUVBNFxcdTFFQUFcXHUxRUE4XFx1MDBDM1xcdTAxMDBcXHUwMTAyXFx1MUVCMFxcdTFFQUVcXHUxRUI0XFx1MUVCMlxcdTAyMjZcXHUwMUUwXFx1MDBDNFxcdTAxREVcXHUxRUEyXFx1MDBDNVxcdTAxRkFcXHUwMUNEXFx1MDIwMFxcdTAyMDJcXHUxRUEwXFx1MUVBQ1xcdTFFQjZcXHUxRTAwXFx1MDEwNFxcdTAyM0FcXHUyQzZGXS9nIH0sXHJcblx0eyAnYmFzZSc6J0FBJywnbGV0dGVycyc6L1tcXHVBNzMyXS9nIH0sXHJcblx0eyAnYmFzZSc6J0FFJywnbGV0dGVycyc6L1tcXHUwMEM2XFx1MDFGQ1xcdTAxRTJdL2cgfSxcclxuXHR7ICdiYXNlJzonQU8nLCdsZXR0ZXJzJzovW1xcdUE3MzRdL2cgfSxcclxuXHR7ICdiYXNlJzonQVUnLCdsZXR0ZXJzJzovW1xcdUE3MzZdL2cgfSxcclxuXHR7ICdiYXNlJzonQVYnLCdsZXR0ZXJzJzovW1xcdUE3MzhcXHVBNzNBXS9nIH0sXHJcblx0eyAnYmFzZSc6J0FZJywnbGV0dGVycyc6L1tcXHVBNzNDXS9nIH0sXHJcblx0eyAnYmFzZSc6J0InLCAnbGV0dGVycyc6L1tcXHUwMDQyXFx1MjRCN1xcdUZGMjJcXHUxRTAyXFx1MUUwNFxcdTFFMDZcXHUwMjQzXFx1MDE4MlxcdTAxODFdL2cgfSxcclxuXHR7ICdiYXNlJzonQycsICdsZXR0ZXJzJzovW1xcdTAwNDNcXHUyNEI4XFx1RkYyM1xcdTAxMDZcXHUwMTA4XFx1MDEwQVxcdTAxMENcXHUwMEM3XFx1MUUwOFxcdTAxODdcXHUwMjNCXFx1QTczRV0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidEJywgJ2xldHRlcnMnOi9bXFx1MDA0NFxcdTI0QjlcXHVGRjI0XFx1MUUwQVxcdTAxMEVcXHUxRTBDXFx1MUUxMFxcdTFFMTJcXHUxRTBFXFx1MDExMFxcdTAxOEJcXHUwMThBXFx1MDE4OVxcdUE3NzldL2cgfSxcclxuXHR7ICdiYXNlJzonRFonLCdsZXR0ZXJzJzovW1xcdTAxRjFcXHUwMUM0XS9nIH0sXHJcblx0eyAnYmFzZSc6J0R6JywnbGV0dGVycyc6L1tcXHUwMUYyXFx1MDFDNV0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidFJywgJ2xldHRlcnMnOi9bXFx1MDA0NVxcdTI0QkFcXHVGRjI1XFx1MDBDOFxcdTAwQzlcXHUwMENBXFx1MUVDMFxcdTFFQkVcXHUxRUM0XFx1MUVDMlxcdTFFQkNcXHUwMTEyXFx1MUUxNFxcdTFFMTZcXHUwMTE0XFx1MDExNlxcdTAwQ0JcXHUxRUJBXFx1MDExQVxcdTAyMDRcXHUwMjA2XFx1MUVCOFxcdTFFQzZcXHUwMjI4XFx1MUUxQ1xcdTAxMThcXHUxRTE4XFx1MUUxQVxcdTAxOTBcXHUwMThFXS9nIH0sXHJcblx0eyAnYmFzZSc6J0YnLCAnbGV0dGVycyc6L1tcXHUwMDQ2XFx1MjRCQlxcdUZGMjZcXHUxRTFFXFx1MDE5MVxcdUE3N0JdL2cgfSxcclxuXHR7ICdiYXNlJzonRycsICdsZXR0ZXJzJzovW1xcdTAwNDdcXHUyNEJDXFx1RkYyN1xcdTAxRjRcXHUwMTFDXFx1MUUyMFxcdTAxMUVcXHUwMTIwXFx1MDFFNlxcdTAxMjJcXHUwMUU0XFx1MDE5M1xcdUE3QTBcXHVBNzdEXFx1QTc3RV0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidIJywgJ2xldHRlcnMnOi9bXFx1MDA0OFxcdTI0QkRcXHVGRjI4XFx1MDEyNFxcdTFFMjJcXHUxRTI2XFx1MDIxRVxcdTFFMjRcXHUxRTI4XFx1MUUyQVxcdTAxMjZcXHUyQzY3XFx1MkM3NVxcdUE3OERdL2cgfSxcclxuXHR7ICdiYXNlJzonSScsICdsZXR0ZXJzJzovW1xcdTAwNDlcXHUyNEJFXFx1RkYyOVxcdTAwQ0NcXHUwMENEXFx1MDBDRVxcdTAxMjhcXHUwMTJBXFx1MDEyQ1xcdTAxMzBcXHUwMENGXFx1MUUyRVxcdTFFQzhcXHUwMUNGXFx1MDIwOFxcdTAyMEFcXHUxRUNBXFx1MDEyRVxcdTFFMkNcXHUwMTk3XS9nIH0sXHJcblx0eyAnYmFzZSc6J0onLCAnbGV0dGVycyc6L1tcXHUwMDRBXFx1MjRCRlxcdUZGMkFcXHUwMTM0XFx1MDI0OF0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidLJywgJ2xldHRlcnMnOi9bXFx1MDA0QlxcdTI0QzBcXHVGRjJCXFx1MUUzMFxcdTAxRThcXHUxRTMyXFx1MDEzNlxcdTFFMzRcXHUwMTk4XFx1MkM2OVxcdUE3NDBcXHVBNzQyXFx1QTc0NFxcdUE3QTJdL2cgfSxcclxuXHR7ICdiYXNlJzonTCcsICdsZXR0ZXJzJzovW1xcdTAwNENcXHUyNEMxXFx1RkYyQ1xcdTAxM0ZcXHUwMTM5XFx1MDEzRFxcdTFFMzZcXHUxRTM4XFx1MDEzQlxcdTFFM0NcXHUxRTNBXFx1MDE0MVxcdTAyM0RcXHUyQzYyXFx1MkM2MFxcdUE3NDhcXHVBNzQ2XFx1QTc4MF0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidMSicsJ2xldHRlcnMnOi9bXFx1MDFDN10vZyB9LFxyXG5cdHsgJ2Jhc2UnOidMaicsJ2xldHRlcnMnOi9bXFx1MDFDOF0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidNJywgJ2xldHRlcnMnOi9bXFx1MDA0RFxcdTI0QzJcXHVGRjJEXFx1MUUzRVxcdTFFNDBcXHUxRTQyXFx1MkM2RVxcdTAxOUNdL2cgfSxcclxuXHR7ICdiYXNlJzonTicsICdsZXR0ZXJzJzovW1xcdTAwNEVcXHUyNEMzXFx1RkYyRVxcdTAxRjhcXHUwMTQzXFx1MDBEMVxcdTFFNDRcXHUwMTQ3XFx1MUU0NlxcdTAxNDVcXHUxRTRBXFx1MUU0OFxcdTAyMjBcXHUwMTlEXFx1QTc5MFxcdUE3QTRdL2cgfSxcclxuXHR7ICdiYXNlJzonTkonLCdsZXR0ZXJzJzovW1xcdTAxQ0FdL2cgfSxcclxuXHR7ICdiYXNlJzonTmonLCdsZXR0ZXJzJzovW1xcdTAxQ0JdL2cgfSxcclxuXHR7ICdiYXNlJzonTycsICdsZXR0ZXJzJzovW1xcdTAwNEZcXHUyNEM0XFx1RkYyRlxcdTAwRDJcXHUwMEQzXFx1MDBENFxcdTFFRDJcXHUxRUQwXFx1MUVENlxcdTFFRDRcXHUwMEQ1XFx1MUU0Q1xcdTAyMkNcXHUxRTRFXFx1MDE0Q1xcdTFFNTBcXHUxRTUyXFx1MDE0RVxcdTAyMkVcXHUwMjMwXFx1MDBENlxcdTAyMkFcXHUxRUNFXFx1MDE1MFxcdTAxRDFcXHUwMjBDXFx1MDIwRVxcdTAxQTBcXHUxRURDXFx1MUVEQVxcdTFFRTBcXHUxRURFXFx1MUVFMlxcdTFFQ0NcXHUxRUQ4XFx1MDFFQVxcdTAxRUNcXHUwMEQ4XFx1MDFGRVxcdTAxODZcXHUwMTlGXFx1QTc0QVxcdUE3NENdL2cgfSxcclxuXHR7ICdiYXNlJzonT0knLCdsZXR0ZXJzJzovW1xcdTAxQTJdL2cgfSxcclxuXHR7ICdiYXNlJzonT08nLCdsZXR0ZXJzJzovW1xcdUE3NEVdL2cgfSxcclxuXHR7ICdiYXNlJzonT1UnLCdsZXR0ZXJzJzovW1xcdTAyMjJdL2cgfSxcclxuXHR7ICdiYXNlJzonUCcsICdsZXR0ZXJzJzovW1xcdTAwNTBcXHUyNEM1XFx1RkYzMFxcdTFFNTRcXHUxRTU2XFx1MDFBNFxcdTJDNjNcXHVBNzUwXFx1QTc1MlxcdUE3NTRdL2cgfSxcclxuXHR7ICdiYXNlJzonUScsICdsZXR0ZXJzJzovW1xcdTAwNTFcXHUyNEM2XFx1RkYzMVxcdUE3NTZcXHVBNzU4XFx1MDI0QV0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidSJywgJ2xldHRlcnMnOi9bXFx1MDA1MlxcdTI0QzdcXHVGRjMyXFx1MDE1NFxcdTFFNThcXHUwMTU4XFx1MDIxMFxcdTAyMTJcXHUxRTVBXFx1MUU1Q1xcdTAxNTZcXHUxRTVFXFx1MDI0Q1xcdTJDNjRcXHVBNzVBXFx1QTdBNlxcdUE3ODJdL2cgfSxcclxuXHR7ICdiYXNlJzonUycsICdsZXR0ZXJzJzovW1xcdTAwNTNcXHUyNEM4XFx1RkYzM1xcdTFFOUVcXHUwMTVBXFx1MUU2NFxcdTAxNUNcXHUxRTYwXFx1MDE2MFxcdTFFNjZcXHUxRTYyXFx1MUU2OFxcdTAyMThcXHUwMTVFXFx1MkM3RVxcdUE3QThcXHVBNzg0XS9nIH0sXHJcblx0eyAnYmFzZSc6J1QnLCAnbGV0dGVycyc6L1tcXHUwMDU0XFx1MjRDOVxcdUZGMzRcXHUxRTZBXFx1MDE2NFxcdTFFNkNcXHUwMjFBXFx1MDE2MlxcdTFFNzBcXHUxRTZFXFx1MDE2NlxcdTAxQUNcXHUwMUFFXFx1MDIzRVxcdUE3ODZdL2cgfSxcclxuXHR7ICdiYXNlJzonVFonLCdsZXR0ZXJzJzovW1xcdUE3MjhdL2cgfSxcclxuXHR7ICdiYXNlJzonVScsICdsZXR0ZXJzJzovW1xcdTAwNTVcXHUyNENBXFx1RkYzNVxcdTAwRDlcXHUwMERBXFx1MDBEQlxcdTAxNjhcXHUxRTc4XFx1MDE2QVxcdTFFN0FcXHUwMTZDXFx1MDBEQ1xcdTAxREJcXHUwMUQ3XFx1MDFENVxcdTAxRDlcXHUxRUU2XFx1MDE2RVxcdTAxNzBcXHUwMUQzXFx1MDIxNFxcdTAyMTZcXHUwMUFGXFx1MUVFQVxcdTFFRThcXHUxRUVFXFx1MUVFQ1xcdTFFRjBcXHUxRUU0XFx1MUU3MlxcdTAxNzJcXHUxRTc2XFx1MUU3NFxcdTAyNDRdL2cgfSxcclxuXHR7ICdiYXNlJzonVicsICdsZXR0ZXJzJzovW1xcdTAwNTZcXHUyNENCXFx1RkYzNlxcdTFFN0NcXHUxRTdFXFx1MDFCMlxcdUE3NUVcXHUwMjQ1XS9nIH0sXHJcblx0eyAnYmFzZSc6J1ZZJywnbGV0dGVycyc6L1tcXHVBNzYwXS9nIH0sXHJcblx0eyAnYmFzZSc6J1cnLCAnbGV0dGVycyc6L1tcXHUwMDU3XFx1MjRDQ1xcdUZGMzdcXHUxRTgwXFx1MUU4MlxcdTAxNzRcXHUxRTg2XFx1MUU4NFxcdTFFODhcXHUyQzcyXS9nIH0sXHJcblx0eyAnYmFzZSc6J1gnLCAnbGV0dGVycyc6L1tcXHUwMDU4XFx1MjRDRFxcdUZGMzhcXHUxRThBXFx1MUU4Q10vZyB9LFxyXG5cdHsgJ2Jhc2UnOidZJywgJ2xldHRlcnMnOi9bXFx1MDA1OVxcdTI0Q0VcXHVGRjM5XFx1MUVGMlxcdTAwRERcXHUwMTc2XFx1MUVGOFxcdTAyMzJcXHUxRThFXFx1MDE3OFxcdTFFRjZcXHUxRUY0XFx1MDFCM1xcdTAyNEVcXHUxRUZFXS9nIH0sXHJcblx0eyAnYmFzZSc6J1onLCAnbGV0dGVycyc6L1tcXHUwMDVBXFx1MjRDRlxcdUZGM0FcXHUwMTc5XFx1MUU5MFxcdTAxN0JcXHUwMTdEXFx1MUU5MlxcdTFFOTRcXHUwMUI1XFx1MDIyNFxcdTJDN0ZcXHUyQzZCXFx1QTc2Ml0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidhJywgJ2xldHRlcnMnOi9bXFx1MDA2MVxcdTI0RDBcXHVGRjQxXFx1MUU5QVxcdTAwRTBcXHUwMEUxXFx1MDBFMlxcdTFFQTdcXHUxRUE1XFx1MUVBQlxcdTFFQTlcXHUwMEUzXFx1MDEwMVxcdTAxMDNcXHUxRUIxXFx1MUVBRlxcdTFFQjVcXHUxRUIzXFx1MDIyN1xcdTAxRTFcXHUwMEU0XFx1MDFERlxcdTFFQTNcXHUwMEU1XFx1MDFGQlxcdTAxQ0VcXHUwMjAxXFx1MDIwM1xcdTFFQTFcXHUxRUFEXFx1MUVCN1xcdTFFMDFcXHUwMTA1XFx1MkM2NVxcdTAyNTBdL2cgfSxcclxuXHR7ICdiYXNlJzonYWEnLCdsZXR0ZXJzJzovW1xcdUE3MzNdL2cgfSxcclxuXHR7ICdiYXNlJzonYWUnLCdsZXR0ZXJzJzovW1xcdTAwRTZcXHUwMUZEXFx1MDFFM10vZyB9LFxyXG5cdHsgJ2Jhc2UnOidhbycsJ2xldHRlcnMnOi9bXFx1QTczNV0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidhdScsJ2xldHRlcnMnOi9bXFx1QTczN10vZyB9LFxyXG5cdHsgJ2Jhc2UnOidhdicsJ2xldHRlcnMnOi9bXFx1QTczOVxcdUE3M0JdL2cgfSxcclxuXHR7ICdiYXNlJzonYXknLCdsZXR0ZXJzJzovW1xcdUE3M0RdL2cgfSxcclxuXHR7ICdiYXNlJzonYicsICdsZXR0ZXJzJzovW1xcdTAwNjJcXHUyNEQxXFx1RkY0MlxcdTFFMDNcXHUxRTA1XFx1MUUwN1xcdTAxODBcXHUwMTgzXFx1MDI1M10vZyB9LFxyXG5cdHsgJ2Jhc2UnOidjJywgJ2xldHRlcnMnOi9bXFx1MDA2M1xcdTI0RDJcXHVGRjQzXFx1MDEwN1xcdTAxMDlcXHUwMTBCXFx1MDEwRFxcdTAwRTdcXHUxRTA5XFx1MDE4OFxcdTAyM0NcXHVBNzNGXFx1MjE4NF0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidkJywgJ2xldHRlcnMnOi9bXFx1MDA2NFxcdTI0RDNcXHVGRjQ0XFx1MUUwQlxcdTAxMEZcXHUxRTBEXFx1MUUxMVxcdTFFMTNcXHUxRTBGXFx1MDExMVxcdTAxOENcXHUwMjU2XFx1MDI1N1xcdUE3N0FdL2cgfSxcclxuXHR7ICdiYXNlJzonZHonLCdsZXR0ZXJzJzovW1xcdTAxRjNcXHUwMUM2XS9nIH0sXHJcblx0eyAnYmFzZSc6J2UnLCAnbGV0dGVycyc6L1tcXHUwMDY1XFx1MjRENFxcdUZGNDVcXHUwMEU4XFx1MDBFOVxcdTAwRUFcXHUxRUMxXFx1MUVCRlxcdTFFQzVcXHUxRUMzXFx1MUVCRFxcdTAxMTNcXHUxRTE1XFx1MUUxN1xcdTAxMTVcXHUwMTE3XFx1MDBFQlxcdTFFQkJcXHUwMTFCXFx1MDIwNVxcdTAyMDdcXHUxRUI5XFx1MUVDN1xcdTAyMjlcXHUxRTFEXFx1MDExOVxcdTFFMTlcXHUxRTFCXFx1MDI0N1xcdTAyNUJcXHUwMUREXS9nIH0sXHJcblx0eyAnYmFzZSc6J2YnLCAnbGV0dGVycyc6L1tcXHUwMDY2XFx1MjRENVxcdUZGNDZcXHUxRTFGXFx1MDE5MlxcdUE3N0NdL2cgfSxcclxuXHR7ICdiYXNlJzonZycsICdsZXR0ZXJzJzovW1xcdTAwNjdcXHUyNEQ2XFx1RkY0N1xcdTAxRjVcXHUwMTFEXFx1MUUyMVxcdTAxMUZcXHUwMTIxXFx1MDFFN1xcdTAxMjNcXHUwMUU1XFx1MDI2MFxcdUE3QTFcXHUxRDc5XFx1QTc3Rl0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidoJywgJ2xldHRlcnMnOi9bXFx1MDA2OFxcdTI0RDdcXHVGRjQ4XFx1MDEyNVxcdTFFMjNcXHUxRTI3XFx1MDIxRlxcdTFFMjVcXHUxRTI5XFx1MUUyQlxcdTFFOTZcXHUwMTI3XFx1MkM2OFxcdTJDNzZcXHUwMjY1XS9nIH0sXHJcblx0eyAnYmFzZSc6J2h2JywnbGV0dGVycyc6L1tcXHUwMTk1XS9nIH0sXHJcblx0eyAnYmFzZSc6J2knLCAnbGV0dGVycyc6L1tcXHUwMDY5XFx1MjREOFxcdUZGNDlcXHUwMEVDXFx1MDBFRFxcdTAwRUVcXHUwMTI5XFx1MDEyQlxcdTAxMkRcXHUwMEVGXFx1MUUyRlxcdTFFQzlcXHUwMUQwXFx1MDIwOVxcdTAyMEJcXHUxRUNCXFx1MDEyRlxcdTFFMkRcXHUwMjY4XFx1MDEzMV0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidqJywgJ2xldHRlcnMnOi9bXFx1MDA2QVxcdTI0RDlcXHVGRjRBXFx1MDEzNVxcdTAxRjBcXHUwMjQ5XS9nIH0sXHJcblx0eyAnYmFzZSc6J2snLCAnbGV0dGVycyc6L1tcXHUwMDZCXFx1MjREQVxcdUZGNEJcXHUxRTMxXFx1MDFFOVxcdTFFMzNcXHUwMTM3XFx1MUUzNVxcdTAxOTlcXHUyQzZBXFx1QTc0MVxcdUE3NDNcXHVBNzQ1XFx1QTdBM10vZyB9LFxyXG5cdHsgJ2Jhc2UnOidsJywgJ2xldHRlcnMnOi9bXFx1MDA2Q1xcdTI0REJcXHVGRjRDXFx1MDE0MFxcdTAxM0FcXHUwMTNFXFx1MUUzN1xcdTFFMzlcXHUwMTNDXFx1MUUzRFxcdTFFM0JcXHUwMTdGXFx1MDE0MlxcdTAxOUFcXHUwMjZCXFx1MkM2MVxcdUE3NDlcXHVBNzgxXFx1QTc0N10vZyB9LFxyXG5cdHsgJ2Jhc2UnOidsaicsJ2xldHRlcnMnOi9bXFx1MDFDOV0vZyB9LFxyXG5cdHsgJ2Jhc2UnOidtJywgJ2xldHRlcnMnOi9bXFx1MDA2RFxcdTI0RENcXHVGRjREXFx1MUUzRlxcdTFFNDFcXHUxRTQzXFx1MDI3MVxcdTAyNkZdL2cgfSxcclxuXHR7ICdiYXNlJzonbicsICdsZXR0ZXJzJzovW1xcdTAwNkVcXHUyNEREXFx1RkY0RVxcdTAxRjlcXHUwMTQ0XFx1MDBGMVxcdTFFNDVcXHUwMTQ4XFx1MUU0N1xcdTAxNDZcXHUxRTRCXFx1MUU0OVxcdTAxOUVcXHUwMjcyXFx1MDE0OVxcdUE3OTFcXHVBN0E1XS9nIH0sXHJcblx0eyAnYmFzZSc6J25qJywnbGV0dGVycyc6L1tcXHUwMUNDXS9nIH0sXHJcblx0eyAnYmFzZSc6J28nLCAnbGV0dGVycyc6L1tcXHUwMDZGXFx1MjRERVxcdUZGNEZcXHUwMEYyXFx1MDBGM1xcdTAwRjRcXHUxRUQzXFx1MUVEMVxcdTFFRDdcXHUxRUQ1XFx1MDBGNVxcdTFFNERcXHUwMjJEXFx1MUU0RlxcdTAxNERcXHUxRTUxXFx1MUU1M1xcdTAxNEZcXHUwMjJGXFx1MDIzMVxcdTAwRjZcXHUwMjJCXFx1MUVDRlxcdTAxNTFcXHUwMUQyXFx1MDIwRFxcdTAyMEZcXHUwMUExXFx1MUVERFxcdTFFREJcXHUxRUUxXFx1MUVERlxcdTFFRTNcXHUxRUNEXFx1MUVEOVxcdTAxRUJcXHUwMUVEXFx1MDBGOFxcdTAxRkZcXHUwMjU0XFx1QTc0QlxcdUE3NERcXHUwMjc1XS9nIH0sXHJcblx0eyAnYmFzZSc6J29pJywnbGV0dGVycyc6L1tcXHUwMUEzXS9nIH0sXHJcblx0eyAnYmFzZSc6J291JywnbGV0dGVycyc6L1tcXHUwMjIzXS9nIH0sXHJcblx0eyAnYmFzZSc6J29vJywnbGV0dGVycyc6L1tcXHVBNzRGXS9nIH0sXHJcblx0eyAnYmFzZSc6J3AnLCAnbGV0dGVycyc6L1tcXHUwMDcwXFx1MjRERlxcdUZGNTBcXHUxRTU1XFx1MUU1N1xcdTAxQTVcXHUxRDdEXFx1QTc1MVxcdUE3NTNcXHVBNzU1XS9nIH0sXHJcblx0eyAnYmFzZSc6J3EnLCAnbGV0dGVycyc6L1tcXHUwMDcxXFx1MjRFMFxcdUZGNTFcXHUwMjRCXFx1QTc1N1xcdUE3NTldL2cgfSxcclxuXHR7ICdiYXNlJzoncicsICdsZXR0ZXJzJzovW1xcdTAwNzJcXHUyNEUxXFx1RkY1MlxcdTAxNTVcXHUxRTU5XFx1MDE1OVxcdTAyMTFcXHUwMjEzXFx1MUU1QlxcdTFFNURcXHUwMTU3XFx1MUU1RlxcdTAyNERcXHUwMjdEXFx1QTc1QlxcdUE3QTdcXHVBNzgzXS9nIH0sXHJcblx0eyAnYmFzZSc6J3MnLCAnbGV0dGVycyc6L1tcXHUwMDczXFx1MjRFMlxcdUZGNTNcXHUwMERGXFx1MDE1QlxcdTFFNjVcXHUwMTVEXFx1MUU2MVxcdTAxNjFcXHUxRTY3XFx1MUU2M1xcdTFFNjlcXHUwMjE5XFx1MDE1RlxcdTAyM0ZcXHVBN0E5XFx1QTc4NVxcdTFFOUJdL2cgfSxcclxuXHR7ICdiYXNlJzondCcsICdsZXR0ZXJzJzovW1xcdTAwNzRcXHUyNEUzXFx1RkY1NFxcdTFFNkJcXHUxRTk3XFx1MDE2NVxcdTFFNkRcXHUwMjFCXFx1MDE2M1xcdTFFNzFcXHUxRTZGXFx1MDE2N1xcdTAxQURcXHUwMjg4XFx1MkM2NlxcdUE3ODddL2cgfSxcclxuXHR7ICdiYXNlJzondHonLCdsZXR0ZXJzJzovW1xcdUE3MjldL2cgfSxcclxuXHR7ICdiYXNlJzondScsICdsZXR0ZXJzJzovW1xcdTAwNzVcXHUyNEU0XFx1RkY1NVxcdTAwRjlcXHUwMEZBXFx1MDBGQlxcdTAxNjlcXHUxRTc5XFx1MDE2QlxcdTFFN0JcXHUwMTZEXFx1MDBGQ1xcdTAxRENcXHUwMUQ4XFx1MDFENlxcdTAxREFcXHUxRUU3XFx1MDE2RlxcdTAxNzFcXHUwMUQ0XFx1MDIxNVxcdTAyMTdcXHUwMUIwXFx1MUVFQlxcdTFFRTlcXHUxRUVGXFx1MUVFRFxcdTFFRjFcXHUxRUU1XFx1MUU3M1xcdTAxNzNcXHUxRTc3XFx1MUU3NVxcdTAyODldL2cgfSxcclxuXHR7ICdiYXNlJzondicsICdsZXR0ZXJzJzovW1xcdTAwNzZcXHUyNEU1XFx1RkY1NlxcdTFFN0RcXHUxRTdGXFx1MDI4QlxcdUE3NUZcXHUwMjhDXS9nIH0sXHJcblx0eyAnYmFzZSc6J3Z5JywnbGV0dGVycyc6L1tcXHVBNzYxXS9nIH0sXHJcblx0eyAnYmFzZSc6J3cnLCAnbGV0dGVycyc6L1tcXHUwMDc3XFx1MjRFNlxcdUZGNTdcXHUxRTgxXFx1MUU4M1xcdTAxNzVcXHUxRTg3XFx1MUU4NVxcdTFFOThcXHUxRTg5XFx1MkM3M10vZyB9LFxyXG5cdHsgJ2Jhc2UnOid4JywgJ2xldHRlcnMnOi9bXFx1MDA3OFxcdTI0RTdcXHVGRjU4XFx1MUU4QlxcdTFFOERdL2cgfSxcclxuXHR7ICdiYXNlJzoneScsICdsZXR0ZXJzJzovW1xcdTAwNzlcXHUyNEU4XFx1RkY1OVxcdTFFRjNcXHUwMEZEXFx1MDE3N1xcdTFFRjlcXHUwMjMzXFx1MUU4RlxcdTAwRkZcXHUxRUY3XFx1MUU5OVxcdTFFRjVcXHUwMUI0XFx1MDI0RlxcdTFFRkZdL2cgfSxcclxuXHR7ICdiYXNlJzoneicsICdsZXR0ZXJzJzovW1xcdTAwN0FcXHUyNEU5XFx1RkY1QVxcdTAxN0FcXHUxRTkxXFx1MDE3Q1xcdTAxN0VcXHUxRTkzXFx1MUU5NVxcdTAxQjZcXHUwMjI1XFx1MDI0MFxcdTJDNkNcXHVBNzYzXS9nIH0sXHJcbl07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmlwRGlhY3JpdGljcyAoc3RyKSB7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXAubGVuZ3RoOyBpKyspIHtcclxuXHRcdHN0ciA9IHN0ci5yZXBsYWNlKG1hcFtpXS5sZXR0ZXJzLCBtYXBbaV0uYmFzZSk7XHJcblx0fVxyXG5cdHJldHVybiBzdHI7XHJcbn07XHJcbiIsIi8qIVxyXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxyXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXHJcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vcmVhY3Qtc2VsZWN0XHJcbiovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IEF1dG9zaXplSW5wdXQgZnJvbSAncmVhY3QtaW5wdXQtYXV0b3NpemUnO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuXHJcbmltcG9ydCBkZWZhdWx0QXJyb3dSZW5kZXJlciBmcm9tICcuL3V0aWxzL2RlZmF1bHRBcnJvd1JlbmRlcmVyJztcclxuaW1wb3J0IGRlZmF1bHRGaWx0ZXJPcHRpb25zIGZyb20gJy4vdXRpbHMvZGVmYXVsdEZpbHRlck9wdGlvbnMnO1xyXG5pbXBvcnQgZGVmYXVsdE1lbnVSZW5kZXJlciBmcm9tICcuL3V0aWxzL2RlZmF1bHRNZW51UmVuZGVyZXInO1xyXG5pbXBvcnQgZGVmYXVsdENsZWFyUmVuZGVyZXIgZnJvbSAnLi91dGlscy9kZWZhdWx0Q2xlYXJSZW5kZXJlcic7XHJcblxyXG5pbXBvcnQgQXN5bmMgZnJvbSAnLi9Bc3luYyc7XHJcbmltcG9ydCBBc3luY0NyZWF0YWJsZSBmcm9tICcuL0FzeW5jQ3JlYXRhYmxlJztcclxuaW1wb3J0IENyZWF0YWJsZSBmcm9tICcuL0NyZWF0YWJsZSc7XHJcbmltcG9ydCBPcHRpb24gZnJvbSAnLi9PcHRpb24nO1xyXG5pbXBvcnQgVmFsdWUgZnJvbSAnLi9WYWx1ZSc7XHJcblxyXG5mdW5jdGlvbiBzdHJpbmdpZnlWYWx1ZSAodmFsdWUpIHtcclxuXHRjb25zdCB2YWx1ZVR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcblx0aWYgKHZhbHVlVHlwZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcblx0fSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdudW1iZXInIHx8IHZhbHVlVHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRyZXR1cm4gU3RyaW5nKHZhbHVlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuICcnO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3Qgc3RyaW5nT3JOb2RlID0gUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcblx0UmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHRSZWFjdC5Qcm9wVHlwZXMubm9kZVxyXG5dKTtcclxuXHJcbmxldCBpbnN0YW5jZUlkID0gMTtcclxuXHJcbmNvbnN0IFNlbGVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0ZGlzcGxheU5hbWU6ICdTZWxlY3QnLFxyXG5cclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdGFkZExhYmVsVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgLy8gcGxhY2Vob2xkZXIgZGlzcGxheWVkIHdoZW4geW91IHdhbnQgdG8gYWRkIGEgbGFiZWwgb24gYSBtdWx0aS12YWx1ZSBpbnB1dFxyXG5cdFx0J2FyaWEtbGFiZWwnOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAvLyBBcmlhIGxhYmVsIChmb3IgYXNzaXN0aXZlIHRlY2gpXHJcblx0XHQnYXJpYS1sYWJlbGxlZGJ5JzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcdC8vIEhUTUwgSUQgb2YgYW4gZWxlbWVudCB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIHRoZSBsYWJlbCAoZm9yIGFzc2lzdGl2ZSB0ZWNoKVxyXG5cdFx0YXJyb3dSZW5kZXJlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHRcdFx0XHQvLyBDcmVhdGUgZHJvcC1kb3duIGNhcmV0IGVsZW1lbnRcclxuXHRcdGF1dG9CbHVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgLy8gYXV0b21hdGljYWxseSBibHVyIHRoZSBjb21wb25lbnQgd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWRcclxuXHRcdGF1dG9mb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gYXV0b2ZvY3VzIHRoZSBjb21wb25lbnQgb24gbW91bnRcclxuXHRcdGF1dG9zaXplOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgLy8gd2hldGhlciB0byBlbmFibGUgYXV0b3NpemluZyBvciBub3RcclxuXHRcdGJhY2tzcGFjZVJlbW92ZXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgLy8gd2hldGhlciBiYWNrc3BhY2UgcmVtb3ZlcyBhbiBpdGVtIGlmIHRoZXJlIGlzIG5vIHRleHQgaW5wdXRcclxuXHRcdGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgIC8vIE1lc3NhZ2UgdG8gdXNlIGZvciBzY3JlZW5yZWFkZXJzIHRvIHByZXNzIGJhY2tzcGFjZSB0byByZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSAtIHtsYWJlbH0gaXMgcmVwbGFjZWQgd2l0aCB0aGUgaXRlbSBsYWJlbFxyXG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAvLyBjbGFzc05hbWUgZm9yIHRoZSBvdXRlciBlbGVtZW50XHJcblx0XHRjbGVhckFsbFRleHQ6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAgIC8vIHRpdGxlIGZvciB0aGUgXCJjbGVhclwiIGNvbnRyb2wgd2hlbiBtdWx0aTogdHJ1ZVxyXG5cdFx0Y2xlYXJSZW5kZXJlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAvLyBjcmVhdGUgY2xlYXJhYmxlIHggZWxlbWVudFxyXG5cdFx0Y2xlYXJWYWx1ZVRleHQ6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAvLyB0aXRsZSBmb3IgdGhlIFwiY2xlYXJcIiBjb250cm9sXHJcblx0XHRjbGVhcmFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgIC8vIHNob3VsZCBpdCBiZSBwb3NzaWJsZSB0byByZXNldCB2YWx1ZVxyXG5cdFx0ZGVsZXRlUmVtb3ZlczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAvLyB3aGV0aGVyIGJhY2tzcGFjZSByZW1vdmVzIGFuIGl0ZW0gaWYgdGhlcmUgaXMgbm8gdGV4dCBpbnB1dFxyXG5cdFx0ZGVsaW1pdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAvLyBkZWxpbWl0ZXIgdG8gdXNlIHRvIGpvaW4gbXVsdGlwbGUgdmFsdWVzIGZvciB0aGUgaGlkZGVuIGZpZWxkIHZhbHVlXHJcblx0XHRkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIHdoZXRoZXIgdGhlIFNlbGVjdCBpcyBkaXNhYmxlZCBvciBub3RcclxuXHRcdGVzY2FwZUNsZWFyc1ZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgLy8gd2hldGhlciBlc2NhcGUgY2xlYXJzIHRoZSB2YWx1ZSB3aGVuIHRoZSBtZW51IGlzIGNsb3NlZFxyXG5cdFx0ZmlsdGVyT3B0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyBtZXRob2QgdG8gZmlsdGVyIGEgc2luZ2xlIG9wdGlvbiAob3B0aW9uLCBmaWx0ZXJTdHJpbmcpXHJcblx0XHRmaWx0ZXJPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYW55LCAgICAgICAgIC8vIGJvb2xlYW4gdG8gZW5hYmxlIGRlZmF1bHQgZmlsdGVyaW5nIG9yIGZ1bmN0aW9uIHRvIGZpbHRlciB0aGUgb3B0aW9ucyBhcnJheSAoW29wdGlvbnNdLCBmaWx0ZXJTdHJpbmcsIFt2YWx1ZXNdKVxyXG5cdFx0aWdub3JlQWNjZW50czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAvLyB3aGV0aGVyIHRvIHN0cmlwIGRpYWNyaXRpY3Mgd2hlbiBmaWx0ZXJpbmdcclxuXHRcdGlnbm9yZUNhc2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgLy8gd2hldGhlciB0byBwZXJmb3JtIGNhc2UtaW5zZW5zaXRpdmUgZmlsdGVyaW5nXHJcblx0XHRpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LCAgICAgICAgIC8vIGN1c3RvbSBhdHRyaWJ1dGVzIGZvciB0aGUgSW5wdXRcclxuXHRcdGlucHV0UmVuZGVyZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgLy8gcmV0dXJucyBhIGN1c3RvbSBpbnB1dCBjb21wb25lbnRcclxuXHRcdGluc3RhbmNlSWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgLy8gc2V0IHRoZSBjb21wb25lbnRzIGluc3RhbmNlSWRcclxuXHRcdGlzTG9hZGluZzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gd2hldGhlciB0aGUgU2VsZWN0IGlzIGxvYWRpbmcgZXh0ZXJuYWxseSBvciBub3QgKHN1Y2ggYXMgb3B0aW9ucyBiZWluZyBsb2FkZWQpXHJcblx0XHRqb2luVmFsdWVzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgIC8vIGpvaW5zIG11bHRpcGxlIHZhbHVlcyBpbnRvIGEgc2luZ2xlIGZvcm0gZmllbGQgd2l0aCB0aGUgZGVsaW1pdGVyIChsZWdhY3kgbW9kZSlcclxuXHRcdGxhYmVsS2V5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgLy8gcGF0aCBvZiB0aGUgbGFiZWwgdmFsdWUgaW4gb3B0aW9uIG9iamVjdHNcclxuXHRcdG1hdGNoUG9zOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgLy8gKGFueXxzdGFydCkgbWF0Y2ggdGhlIHN0YXJ0IG9yIGVudGlyZSBzdHJpbmcgd2hlbiBmaWx0ZXJpbmdcclxuXHRcdG1hdGNoUHJvcDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gKGFueXxsYWJlbHx2YWx1ZSkgd2hpY2ggb3B0aW9uIHByb3BlcnR5IHRvIGZpbHRlciBvblxyXG5cdFx0bWVudUJ1ZmZlcjogUmVhY3QuUHJvcFR5cGVzLm51bWJlciwgICAgICAgICAvLyBvcHRpb25hbCBidWZmZXIgKGluIHB4KSBiZXR3ZWVuIHRoZSBib3R0b20gb2YgdGhlIHZpZXdwb3J0IGFuZCB0aGUgYm90dG9tIG9mIHRoZSBtZW51XHJcblx0XHRtZW51Q29udGFpbmVyU3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBtZW51IGNvbnRhaW5lclxyXG5cdFx0bWVudVJlbmRlcmVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyByZW5kZXJzIGEgY3VzdG9tIG1lbnUgd2l0aCBvcHRpb25zXHJcblx0XHRtZW51U3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsICAgICAgICAgIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBtZW51XHJcblx0XHRtdWx0aTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAgIC8vIG11bHRpLXZhbHVlIGlucHV0XHJcblx0XHRuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlcyBhIGhpZGRlbiA8aW5wdXQgLz4gdGFnIHdpdGggdGhpcyBmaWVsZCBuYW1lIGZvciBodG1sIGZvcm1zXHJcblx0XHRub1Jlc3VsdHNUZXh0OiBzdHJpbmdPck5vZGUsICAgICAgICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGRpc3BsYXllZCB3aGVuIHRoZXJlIGFyZSBubyBtYXRjaGluZyBzZWFyY2ggcmVzdWx0c1xyXG5cdFx0b25CbHVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAvLyBvbkJsdXIgaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxyXG5cdFx0b25CbHVyUmVzZXRzSW5wdXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAvLyB3aGV0aGVyIGlucHV0IGlzIGNsZWFyZWQgb24gYmx1clxyXG5cdFx0b25DaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAvLyBvbkNoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAobmV3VmFsdWUpIHt9XHJcblx0XHRvbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgIC8vIGZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkXHJcblx0XHRvbkNsb3NlUmVzZXRzSW5wdXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFx0XHQvLyB3aGV0aGVyIGlucHV0IGlzIGNsZWFyZWQgd2hlbiBtZW51IGlzIGNsb3NlZCB0aHJvdWdoIHRoZSBhcnJvd1xyXG5cdFx0b25Gb2N1czogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAvLyBvbkZvY3VzIGhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge31cclxuXHRcdG9uSW5wdXRDaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgLy8gb25JbnB1dENoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAoaW5wdXRWYWx1ZSkge31cclxuXHRcdG9uSW5wdXRLZXlEb3duOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgLy8gaW5wdXQga2V5RG93biBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XHJcblx0XHRvbk1lbnVTY3JvbGxUb0JvdHRvbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsIC8vIGZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbTsgY2FuIGJlIHVzZWQgdG8gcGFnaW5hdGUgb3B0aW9uc1xyXG5cdFx0b25PcGVuOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAvLyBmaXJlcyB3aGVuIHRoZSBtZW51IGlzIG9wZW5lZFxyXG5cdFx0b25WYWx1ZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyBvbkNsaWNrIGhhbmRsZXIgZm9yIHZhbHVlIGxhYmVsczogZnVuY3Rpb24gKHZhbHVlLCBldmVudCkge31cclxuXHRcdG9wZW5BZnRlckZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgLy8gYm9vbGVhbiB0byBlbmFibGUgb3BlbmluZyBkcm9wZG93biB3aGVuIGZvY3VzZWRcclxuXHRcdG9wZW5PbkZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgLy8gYWx3YXlzIG9wZW4gb3B0aW9ucyBtZW51IG9uIGZvY3VzXHJcblx0XHRvcHRpb25DbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgIC8vIGFkZGl0aW9uYWwgY2xhc3MoZXMpIHRvIGFwcGx5IHRvIHRoZSA8T3B0aW9uIC8+IGVsZW1lbnRzXHJcblx0XHRvcHRpb25Db21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgIC8vIG9wdGlvbiBjb21wb25lbnQgdG8gcmVuZGVyIGluIGRyb3Bkb3duXHJcblx0XHRvcHRpb25SZW5kZXJlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgIC8vIG9wdGlvblJlbmRlcmVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxyXG5cdFx0b3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LCAgICAgICAgICAgICAvLyBhcnJheSBvZiBvcHRpb25zXHJcblx0XHRwYWdlU2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlciwgICAgICAgICAgIC8vIG51bWJlciBvZiBlbnRyaWVzIHRvIHBhZ2Ugd2hlbiB1c2luZyBwYWdlIHVwL2Rvd24ga2V5c1xyXG5cdFx0cGxhY2Vob2xkZXI6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAgICAvLyBmaWVsZCBwbGFjZWhvbGRlciwgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyB2YWx1ZVxyXG5cdFx0cmVxdWlyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyBhcHBsaWVzIEhUTUw1IHJlcXVpcmVkIGF0dHJpYnV0ZSB3aGVuIG5lZWRlZFxyXG5cdFx0cmVzZXRWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAvLyB2YWx1ZSB0byB1c2Ugd2hlbiB5b3UgY2xlYXIgdGhlIGNvbnRyb2xcclxuXHRcdHNjcm9sbE1lbnVJbnRvVmlldzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgLy8gYm9vbGVhbiB0byBlbmFibGUgdGhlIHZpZXdwb3J0IHRvIHNoaWZ0IHNvIHRoYXQgdGhlIGZ1bGwgbWVudSBmdWxseSB2aXNpYmxlIHdoZW4gZW5nYWdlZFxyXG5cdFx0c2VhcmNoYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAvLyB3aGV0aGVyIHRvIGVuYWJsZSBzZWFyY2hpbmcgZmVhdHVyZSBvciBub3RcclxuXHRcdHNpbXBsZVZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgLy8gcGFzcyB0aGUgdmFsdWUgdG8gb25DaGFuZ2UgYXMgYSBzaW1wbGUgdmFsdWUgKGxlZ2FjeSBwcmUgMS4wIG1vZGUpLCBkZWZhdWx0cyB0byBmYWxzZVxyXG5cdFx0c3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsICAgICAgICAgICAgICAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgY29udHJvbFxyXG5cdFx0dGFiSW5kZXg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBvcHRpb25hbCB0YWIgaW5kZXggb2YgdGhlIGNvbnRyb2xcclxuXHRcdHRhYlNlbGVjdHNWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgLy8gd2hldGhlciB0byB0cmVhdCB0YWJiaW5nIG91dCB3aGlsZSBmb2N1c2VkIHRvIGJlIHZhbHVlIHNlbGVjdGlvblxyXG5cdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5hbnksICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIGZpZWxkIHZhbHVlXHJcblx0XHR2YWx1ZUNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgIC8vIHZhbHVlIGNvbXBvbmVudCB0byByZW5kZXJcclxuXHRcdHZhbHVlS2V5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgLy8gcGF0aCBvZiB0aGUgbGFiZWwgdmFsdWUgaW4gb3B0aW9uIG9iamVjdHNcclxuXHRcdHZhbHVlUmVuZGVyZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgLy8gdmFsdWVSZW5kZXJlcjogZnVuY3Rpb24gKG9wdGlvbikge31cclxuXHRcdHdyYXBwZXJTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgICAgICAgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIGNvbXBvbmVudCB3cmFwcGVyXHJcblx0fSxcclxuXHJcblx0c3RhdGljczogeyBBc3luYywgQXN5bmNDcmVhdGFibGUsIENyZWF0YWJsZSB9LFxyXG5cclxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWRkTGFiZWxUZXh0OiAnQWRkIFwie2xhYmVsfVwiPycsXHJcblx0XHRcdGFycm93UmVuZGVyZXI6IGRlZmF1bHRBcnJvd1JlbmRlcmVyLFxyXG5cdFx0XHRhdXRvc2l6ZTogdHJ1ZSxcclxuXHRcdFx0YmFja3NwYWNlUmVtb3ZlczogdHJ1ZSxcclxuXHRcdFx0YmFja3NwYWNlVG9SZW1vdmVNZXNzYWdlOiAnUHJlc3MgYmFja3NwYWNlIHRvIHJlbW92ZSB7bGFiZWx9JyxcclxuXHRcdFx0Y2xlYXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRjbGVhckFsbFRleHQ6ICdDbGVhciBhbGwnLFxyXG5cdFx0XHRjbGVhclJlbmRlcmVyOiBkZWZhdWx0Q2xlYXJSZW5kZXJlcixcclxuXHRcdFx0Y2xlYXJWYWx1ZVRleHQ6ICdDbGVhciB2YWx1ZScsXHJcblx0XHRcdGRlbGV0ZVJlbW92ZXM6IHRydWUsXHJcblx0XHRcdGRlbGltaXRlcjogJywnLFxyXG5cdFx0XHRkaXNhYmxlZDogZmFsc2UsXHJcblx0XHRcdGVzY2FwZUNsZWFyc1ZhbHVlOiB0cnVlLFxyXG5cdFx0XHRmaWx0ZXJPcHRpb25zOiBkZWZhdWx0RmlsdGVyT3B0aW9ucyxcclxuXHRcdFx0aWdub3JlQWNjZW50czogdHJ1ZSxcclxuXHRcdFx0aWdub3JlQ2FzZTogdHJ1ZSxcclxuXHRcdFx0aW5wdXRQcm9wczoge30sXHJcblx0XHRcdGlzTG9hZGluZzogZmFsc2UsXHJcblx0XHRcdGpvaW5WYWx1ZXM6IGZhbHNlLFxyXG5cdFx0XHRsYWJlbEtleTogJ2xhYmVsJyxcclxuXHRcdFx0bWF0Y2hQb3M6ICdhbnknLFxyXG5cdFx0XHRtYXRjaFByb3A6ICdhbnknLFxyXG5cdFx0XHRtZW51QnVmZmVyOiAwLFxyXG5cdFx0XHRtZW51UmVuZGVyZXI6IGRlZmF1bHRNZW51UmVuZGVyZXIsXHJcblx0XHRcdG11bHRpOiBmYWxzZSxcclxuXHRcdFx0bm9SZXN1bHRzVGV4dDogJ05vIHJlc3VsdHMgZm91bmQnLFxyXG5cdFx0XHRvbkJsdXJSZXNldHNJbnB1dDogdHJ1ZSxcclxuXHRcdFx0b25DbG9zZVJlc2V0c0lucHV0OiB0cnVlLFxyXG5cdFx0XHRvcGVuQWZ0ZXJGb2N1czogZmFsc2UsXHJcblx0XHRcdG9wdGlvbkNvbXBvbmVudDogT3B0aW9uLFxyXG5cdFx0XHRwYWdlU2l6ZTogNSxcclxuXHRcdFx0cGxhY2Vob2xkZXI6ICdTZWxlY3QuLi4nLFxyXG5cdFx0XHRyZXF1aXJlZDogZmFsc2UsXHJcblx0XHRcdHNjcm9sbE1lbnVJbnRvVmlldzogdHJ1ZSxcclxuXHRcdFx0c2VhcmNoYWJsZTogdHJ1ZSxcclxuXHRcdFx0c2ltcGxlVmFsdWU6IGZhbHNlLFxyXG5cdFx0XHR0YWJTZWxlY3RzVmFsdWU6IHRydWUsXHJcblx0XHRcdHZhbHVlQ29tcG9uZW50OiBWYWx1ZSxcclxuXHRcdFx0dmFsdWVLZXk6ICd2YWx1ZScsXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcclxuXHRcdFx0aXNGb2N1c2VkOiBmYWxzZSxcclxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcclxuXHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcclxuXHRcdFx0cmVxdWlyZWQ6IGZhbHNlLFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRXaWxsTW91bnQgKCkge1xyXG5cdFx0dGhpcy5faW5zdGFuY2VQcmVmaXggPSAncmVhY3Qtc2VsZWN0LScgKyAodGhpcy5wcm9wcy5pbnN0YW5jZUlkIHx8ICsraW5zdGFuY2VJZCkgKyAnLSc7XHJcblx0XHRjb25zdCB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xyXG5cclxuXHRcdGlmICh0aGlzLnByb3BzLnJlcXVpcmVkKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdHJlcXVpcmVkOiB0aGlzLmhhbmRsZVJlcXVpcmVkKHZhbHVlQXJyYXlbMF0sIHRoaXMucHJvcHMubXVsdGkpLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5hdXRvZm9jdXMpIHtcclxuXHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xyXG5cdFx0Y29uc3QgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheShuZXh0UHJvcHMudmFsdWUsIG5leHRQcm9wcyk7XHJcblxyXG5cdFx0aWYgKG5leHRQcm9wcy5yZXF1aXJlZCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRyZXF1aXJlZDogdGhpcy5oYW5kbGVSZXF1aXJlZCh2YWx1ZUFycmF5WzBdLCBuZXh0UHJvcHMubXVsdGkpLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRXaWxsVXBkYXRlIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG5cdFx0aWYgKG5leHRTdGF0ZS5pc09wZW4gIT09IHRoaXMuc3RhdGUuaXNPcGVuKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlVG91Y2hPdXRzaWRlRXZlbnQobmV4dFN0YXRlLmlzT3Blbik7XHJcblx0XHRcdGNvbnN0IGhhbmRsZXIgPSBuZXh0U3RhdGUuaXNPcGVuID8gbmV4dFByb3BzLm9uT3BlbiA6IG5leHRQcm9wcy5vbkNsb3NlO1xyXG5cdFx0XHRoYW5kbGVyICYmIGhhbmRsZXIoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnREaWRVcGRhdGUgKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XHJcblx0XHQvLyBmb2N1cyB0byB0aGUgc2VsZWN0ZWQgb3B0aW9uXHJcblx0XHRpZiAodGhpcy5tZW51ICYmIHRoaXMuZm9jdXNlZCAmJiB0aGlzLnN0YXRlLmlzT3BlbiAmJiAhdGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uKSB7XHJcblx0XHRcdGxldCBmb2N1c2VkT3B0aW9uTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMuZm9jdXNlZCk7XHJcblx0XHRcdGxldCBtZW51Tm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMubWVudSk7XHJcblx0XHRcdG1lbnVOb2RlLnNjcm9sbFRvcCA9IGZvY3VzZWRPcHRpb25Ob2RlLm9mZnNldFRvcDtcclxuXHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XHJcblx0XHRcdHRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbiA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9zY3JvbGxUb0ZvY3VzZWRPcHRpb25PblVwZGF0ZSAmJiB0aGlzLmZvY3VzZWQgJiYgdGhpcy5tZW51KSB7XHJcblx0XHRcdHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlID0gZmFsc2U7XHJcblx0XHRcdHZhciBmb2N1c2VkRE9NID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5mb2N1c2VkKTtcclxuXHRcdFx0dmFyIG1lbnVET00gPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLm1lbnUpO1xyXG5cdFx0XHR2YXIgZm9jdXNlZFJlY3QgPSBmb2N1c2VkRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHR2YXIgbWVudVJlY3QgPSBtZW51RE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRpZiAoZm9jdXNlZFJlY3QuYm90dG9tID4gbWVudVJlY3QuYm90dG9tIHx8IGZvY3VzZWRSZWN0LnRvcCA8IG1lbnVSZWN0LnRvcCkge1xyXG5cdFx0XHRcdG1lbnVET00uc2Nyb2xsVG9wID0gKGZvY3VzZWRET00ub2Zmc2V0VG9wICsgZm9jdXNlZERPTS5jbGllbnRIZWlnaHQgLSBtZW51RE9NLm9mZnNldEhlaWdodCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnByb3BzLnNjcm9sbE1lbnVJbnRvVmlldyAmJiB0aGlzLm1lbnVDb250YWluZXIpIHtcclxuXHRcdFx0dmFyIG1lbnVDb250YWluZXJSZWN0ID0gdGhpcy5tZW51Q29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRpZiAod2luZG93LmlubmVySGVpZ2h0IDwgbWVudUNvbnRhaW5lclJlY3QuYm90dG9tICsgdGhpcy5wcm9wcy5tZW51QnVmZmVyKSB7XHJcblx0XHRcdFx0d2luZG93LnNjcm9sbEJ5KDAsIG1lbnVDb250YWluZXJSZWN0LmJvdHRvbSArIHRoaXMucHJvcHMubWVudUJ1ZmZlciAtIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChwcmV2UHJvcHMuZGlzYWJsZWQgIT09IHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGlzRm9jdXNlZDogZmFsc2UgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcclxuXHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XHJcblx0XHRpZiAoIWRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcclxuXHRcdFx0ZG9jdW1lbnQuZGV0YWNoRXZlbnQoJ29udG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlVG91Y2hPdXRzaWRlRXZlbnQgKGVuYWJsZWQpIHtcclxuXHRcdGlmIChlbmFibGVkKSB7XHJcblx0XHRcdGlmICghZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAmJiBkb2N1bWVudC5hdHRhY2hFdmVudCkge1xyXG5cdFx0XHRcdGRvY3VtZW50LmF0dGFjaEV2ZW50KCdvbnRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKCFkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyICYmIGRvY3VtZW50LmRldGFjaEV2ZW50KSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZGV0YWNoRXZlbnQoJ29udG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0aGFuZGxlVG91Y2hPdXRzaWRlIChldmVudCkge1xyXG5cdFx0Ly8gaGFuZGxlIHRvdWNoIG91dHNpZGUgb24gaW9zIHRvIGRpc21pc3MgbWVudVxyXG5cdFx0aWYgKHRoaXMud3JhcHBlciAmJiAhdGhpcy53cmFwcGVyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuXHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRmb2N1cyAoKSB7XHJcblx0XHRpZiAoIXRoaXMuaW5wdXQpIHJldHVybjtcclxuXHRcdHRoaXMuaW5wdXQuZm9jdXMoKTtcclxuXHJcblx0XHRpZiAodGhpcy5wcm9wcy5vcGVuQWZ0ZXJGb2N1cykge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRpc09wZW46IHRydWUsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGJsdXJJbnB1dCAoKSB7XHJcblx0XHRpZiAoIXRoaXMuaW5wdXQpIHJldHVybjtcclxuXHRcdHRoaXMuaW5wdXQuYmx1cigpO1xyXG5cdH0sXHJcblxyXG5cdGhhbmRsZVRvdWNoTW92ZSAoZXZlbnQpIHtcclxuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXHJcblx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRoYW5kbGVUb3VjaFN0YXJ0IChldmVudCkge1xyXG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIG5vdCBiZWluZyBkcmFnZ2VkXHJcblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlVG91Y2hFbmQgKGV2ZW50KSB7XHJcblx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2VcclxuXHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXHJcblx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xyXG5cclxuXHRcdC8vIEZpcmUgdGhlIG1vdXNlIGV2ZW50c1xyXG5cdFx0dGhpcy5oYW5kbGVNb3VzZURvd24oZXZlbnQpO1xyXG5cdH0sXHJcblxyXG5cdGhhbmRsZVRvdWNoRW5kQ2xlYXJWYWx1ZSAoZXZlbnQpIHtcclxuXHRcdC8vIENoZWNrIGlmIHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWQsIEluIHRoaXMgY2FzZVxyXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcclxuXHRcdGlmICh0aGlzLmRyYWdnaW5nKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gQ2xlYXIgdGhlIHZhbHVlXHJcblx0XHR0aGlzLmNsZWFyVmFsdWUoZXZlbnQpO1xyXG5cdH0sXHJcblxyXG5cdGhhbmRsZU1vdXNlRG93biAoZXZlbnQpIHtcclxuXHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcclxuXHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxyXG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gcHJldmVudCBkZWZhdWx0IGV2ZW50IGhhbmRsZXJzXHJcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0Ly8gZm9yIHRoZSBub24tc2VhcmNoYWJsZSBzZWxlY3QsIHRvZ2dsZSB0aGUgbWVudVxyXG5cdFx0aWYgKCF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcclxuXHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0aXNPcGVuOiAhdGhpcy5zdGF0ZS5pc09wZW4sXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlLmlzRm9jdXNlZCkge1xyXG5cdFx0XHQvLyBPbiBpT1MsIHdlIGNhbiBnZXQgaW50byBhIHN0YXRlIHdoZXJlIHdlIHRoaW5rIHRoZSBpbnB1dCBpcyBmb2N1c2VkIGJ1dCBpdCBpc24ndCByZWFsbHksXHJcblx0XHRcdC8vIHNpbmNlIGlPUyBpZ25vcmVzIHByb2dyYW1tYXRpYyBjYWxscyB0byBpbnB1dC5mb2N1cygpIHRoYXQgd2VyZW4ndCB0cmlnZ2VyZWQgYnkgYSBjbGljayBldmVudC5cclxuXHRcdFx0Ly8gQ2FsbCBmb2N1cygpIGFnYWluIGhlcmUgdG8gYmUgc2FmZS5cclxuXHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cclxuXHRcdFx0bGV0IGlucHV0ID0gdGhpcy5pbnB1dDtcclxuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dC5nZXRJbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdC8vIEdldCB0aGUgYWN0dWFsIERPTSBpbnB1dCBpZiB0aGUgcmVmIGlzIGFuIDxBdXRvc2l6ZUlucHV0IC8+IGNvbXBvbmVudFxyXG5cdFx0XHRcdGlucHV0ID0gaW5wdXQuZ2V0SW5wdXQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gY2xlYXJzIHRoZSB2YWx1ZSBzbyB0aGF0IHRoZSBjdXJzb3Igd2lsbCBiZSBhdCB0aGUgZW5kIG9mIGlucHV0IHdoZW4gdGhlIGNvbXBvbmVudCByZS1yZW5kZXJzXHJcblx0XHRcdGlucHV0LnZhbHVlID0gJyc7XHJcblxyXG5cdFx0XHQvLyBpZiB0aGUgaW5wdXQgaXMgZm9jdXNlZCwgZW5zdXJlIHRoZSBtZW51IGlzIG9wZW5cclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0aXNPcGVuOiB0cnVlLFxyXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gb3RoZXJ3aXNlLCBmb2N1cyB0aGUgaW5wdXQgYW5kIG9wZW4gdGhlIG1lbnVcclxuXHRcdFx0dGhpcy5fb3BlbkFmdGVyRm9jdXMgPSB0aGlzLnByb3BzLm9wZW5PbkZvY3VzO1xyXG5cdFx0XHR0aGlzLmZvY3VzKCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0aGFuZGxlTW91c2VEb3duT25BcnJvdyAoZXZlbnQpIHtcclxuXHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcclxuXHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxyXG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8gSWYgdGhlIG1lbnUgaXNuJ3Qgb3BlbiwgbGV0IHRoZSBldmVudCBidWJibGUgdG8gdGhlIG1haW4gaGFuZGxlTW91c2VEb3duXHJcblx0XHRpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdC8vIHByZXZlbnQgZGVmYXVsdCBldmVudCBoYW5kbGVyc1xyXG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0Ly8gY2xvc2UgdGhlIG1lbnVcclxuXHRcdHRoaXMuY2xvc2VNZW51KCk7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlTW91c2VEb3duT25NZW51IChldmVudCkge1xyXG5cdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxyXG5cdFx0Ly8gYnV0dG9uLCBvciBpZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBpZ25vcmUgaXQuXHJcblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dGhpcy5fb3BlbkFmdGVyRm9jdXMgPSB0cnVlO1xyXG5cdFx0dGhpcy5mb2N1cygpO1xyXG5cdH0sXHJcblxyXG5cdGNsb3NlTWVudSAoKSB7XHJcblx0XHRpZih0aGlzLnByb3BzLm9uQ2xvc2VSZXNldHNJbnB1dCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRpc09wZW46IGZhbHNlLFxyXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgJiYgIXRoaXMucHJvcHMubXVsdGksXHJcblx0XHRcdFx0aW5wdXRWYWx1ZTogJydcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRpc09wZW46IGZhbHNlLFxyXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgJiYgIXRoaXMucHJvcHMubXVsdGksXHJcblx0XHRcdFx0aW5wdXRWYWx1ZTogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlSW5wdXRGb2N1cyAoZXZlbnQpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm47XHJcblx0XHR2YXIgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW4gfHwgdGhpcy5fb3BlbkFmdGVyRm9jdXMgfHwgdGhpcy5wcm9wcy5vcGVuT25Gb2N1cztcclxuXHRcdGlmICh0aGlzLnByb3BzLm9uRm9jdXMpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRpc0ZvY3VzZWQ6IHRydWUsXHJcblx0XHRcdGlzT3BlbjogaXNPcGVuXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlSW5wdXRCbHVyIChldmVudCkge1xyXG5cdFx0Ly8gVGhlIGNoZWNrIGZvciBtZW51LmNvbnRhaW5zKGFjdGl2ZUVsZW1lbnQpIGlzIG5lY2Vzc2FyeSB0byBwcmV2ZW50IElFMTEncyBzY3JvbGxiYXIgZnJvbSBjbG9zaW5nIHRoZSBtZW51IGluIGNlcnRhaW4gY29udGV4dHMuXHJcblx0XHRpZiAodGhpcy5tZW51ICYmICh0aGlzLm1lbnUgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgdGhpcy5tZW51LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSkge1xyXG5cdFx0XHR0aGlzLmZvY3VzKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIG9uQmx1cnJlZFN0YXRlID0ge1xyXG5cdFx0XHRpc0ZvY3VzZWQ6IGZhbHNlLFxyXG5cdFx0XHRpc09wZW46IGZhbHNlLFxyXG5cdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlLFxyXG5cdFx0fTtcclxuXHRcdGlmICh0aGlzLnByb3BzLm9uQmx1clJlc2V0c0lucHV0KSB7XHJcblx0XHRcdG9uQmx1cnJlZFN0YXRlLmlucHV0VmFsdWUgPSAnJztcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0U3RhdGUob25CbHVycmVkU3RhdGUpO1xyXG5cdH0sXHJcblxyXG5cdGhhbmRsZUlucHV0Q2hhbmdlIChldmVudCkge1xyXG5cdFx0bGV0IG5ld0lucHV0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAhPT0gZXZlbnQudGFyZ2V0LnZhbHVlICYmIHRoaXMucHJvcHMub25JbnB1dENoYW5nZSkge1xyXG5cdFx0XHRsZXQgbmV4dFN0YXRlID0gdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKG5ld0lucHV0VmFsdWUpO1xyXG5cdFx0XHQvLyBOb3RlOiAhPSB1c2VkIGRlbGliZXJhdGVseSBoZXJlIHRvIGNhdGNoIHVuZGVmaW5lZCBhbmQgbnVsbFxyXG5cdFx0XHRpZiAobmV4dFN0YXRlICE9IG51bGwgJiYgdHlwZW9mIG5leHRTdGF0ZSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRuZXdJbnB1dFZhbHVlID0gJycgKyBuZXh0U3RhdGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0aXNPcGVuOiB0cnVlLFxyXG5cdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlLFxyXG5cdFx0XHRpbnB1dFZhbHVlOiBuZXdJbnB1dFZhbHVlLFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlS2V5RG93biAoZXZlbnQpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uSW5wdXRLZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRoaXMucHJvcHMub25JbnB1dEtleURvd24oZXZlbnQpO1xyXG5cdFx0XHRpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG5cdFx0XHRjYXNlIDg6IC8vIGJhY2tzcGFjZVxyXG5cdFx0XHRcdGlmICghdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmIHRoaXMucHJvcHMuYmFja3NwYWNlUmVtb3Zlcykge1xyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdHRoaXMucG9wVmFsdWUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdFx0Y2FzZSA5OiAvLyB0YWJcclxuXHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkgfHwgIXRoaXMuc3RhdGUuaXNPcGVuIHx8ICF0aGlzLnByb3BzLnRhYlNlbGVjdHNWYWx1ZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRjYXNlIDEzOiAvLyBlbnRlclxyXG5cdFx0XHRcdGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHJldHVybjtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMjc6IC8vIGVzY2FwZVxyXG5cdFx0XHRcdGlmICh0aGlzLnN0YXRlLmlzT3Blbikge1xyXG5cdFx0XHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5jbGVhcmFibGUgJiYgdGhpcy5wcm9wcy5lc2NhcGVDbGVhcnNWYWx1ZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5jbGVhclZhbHVlKGV2ZW50KTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMzg6IC8vIHVwXHJcblx0XHRcdFx0dGhpcy5mb2N1c1ByZXZpb3VzT3B0aW9uKCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDQwOiAvLyBkb3duXHJcblx0XHRcdFx0dGhpcy5mb2N1c05leHRPcHRpb24oKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMzM6IC8vIHBhZ2UgdXBcclxuXHRcdFx0XHR0aGlzLmZvY3VzUGFnZVVwT3B0aW9uKCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDM0OiAvLyBwYWdlIGRvd25cclxuXHRcdFx0XHR0aGlzLmZvY3VzUGFnZURvd25PcHRpb24oKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMzU6IC8vIGVuZCBrZXlcclxuXHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5mb2N1c0VuZE9wdGlvbigpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAzNjogLy8gaG9tZSBrZXlcclxuXHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5mb2N1c1N0YXJ0T3B0aW9uKCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDQ2OiAvLyBiYWNrc3BhY2VcclxuXHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAmJiB0aGlzLnByb3BzLmRlbGV0ZVJlbW92ZXMpIHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHR0aGlzLnBvcFZhbHVlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHRcdGRlZmF1bHQ6IHJldHVybjtcclxuXHRcdH1cclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlVmFsdWVDbGljayAob3B0aW9uLCBldmVudCkge1xyXG5cdFx0aWYgKCF0aGlzLnByb3BzLm9uVmFsdWVDbGljaykgcmV0dXJuO1xyXG5cdFx0dGhpcy5wcm9wcy5vblZhbHVlQ2xpY2sob3B0aW9uLCBldmVudCk7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlTWVudVNjcm9sbCAoZXZlbnQpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5vbk1lbnVTY3JvbGxUb0JvdHRvbSkgcmV0dXJuO1xyXG5cdFx0bGV0IHsgdGFyZ2V0IH0gPSBldmVudDtcclxuXHRcdGlmICh0YXJnZXQuc2Nyb2xsSGVpZ2h0ID4gdGFyZ2V0Lm9mZnNldEhlaWdodCAmJiAhKHRhcmdldC5zY3JvbGxIZWlnaHQgLSB0YXJnZXQub2Zmc2V0SGVpZ2h0IC0gdGFyZ2V0LnNjcm9sbFRvcCkpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbk1lbnVTY3JvbGxUb0JvdHRvbSgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGhhbmRsZVJlcXVpcmVkICh2YWx1ZSwgbXVsdGkpIHtcclxuXHRcdGlmICghdmFsdWUpIHJldHVybiB0cnVlO1xyXG5cdFx0cmV0dXJuIChtdWx0aSA/IHZhbHVlLmxlbmd0aCA9PT0gMCA6IE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDApO1xyXG5cdH0sXHJcblxyXG5cdGdldE9wdGlvbkxhYmVsIChvcCkge1xyXG5cdFx0cmV0dXJuIG9wW3RoaXMucHJvcHMubGFiZWxLZXldO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIFR1cm5zIGEgdmFsdWUgaW50byBhbiBhcnJheSBmcm9tIHRoZSBnaXZlbiBvcHRpb25zXHJcblx0ICogQHBhcmFtXHR7U3RyaW5nfE51bWJlcnxBcnJheX1cdHZhbHVlXHRcdC0gdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgaW5wdXRcclxuXHQgKiBAcGFyYW1cdHtPYmplY3R9XHRcdG5leHRQcm9wc1x0LSBvcHRpb25hbGx5IHNwZWNpZnkgdGhlIG5leHRQcm9wcyBzbyB0aGUgcmV0dXJuZWQgYXJyYXkgdXNlcyB0aGUgbGF0ZXN0IGNvbmZpZ3VyYXRpb25cclxuXHQgKiBAcmV0dXJuc1x0e0FycmF5fVx0dGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgcmVwcmVzZW50ZWQgaW4gYW4gYXJyYXlcclxuXHQgKi9cclxuXHRnZXRWYWx1ZUFycmF5ICh2YWx1ZSwgbmV4dFByb3BzKSB7XHJcblx0XHQvKiogc3VwcG9ydCBvcHRpb25hbGx5IHBhc3NpbmcgaW4gdGhlIGBuZXh0UHJvcHNgIHNvIGBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzYCB1cGRhdGVzIHdpbGwgZnVuY3Rpb24gYXMgZXhwZWN0ZWQgKi9cclxuXHRcdGNvbnN0IHByb3BzID0gdHlwZW9mIG5leHRQcm9wcyA9PT0gJ29iamVjdCcgPyBuZXh0UHJvcHMgOiB0aGlzLnByb3BzO1xyXG5cdFx0aWYgKHByb3BzLm11bHRpKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB2YWx1ZSA9IHZhbHVlLnNwbGl0KHByb3BzLmRlbGltaXRlcik7XHJcblx0XHRcdGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFtdO1xyXG5cdFx0XHRcdHZhbHVlID0gW3ZhbHVlXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdmFsdWUubWFwKHZhbHVlID0+IHRoaXMuZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKSkuZmlsdGVyKGkgPT4gaSk7XHJcblx0XHR9XHJcblx0XHR2YXIgZXhwYW5kZWRWYWx1ZSA9IHRoaXMuZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKTtcclxuXHRcdHJldHVybiBleHBhbmRlZFZhbHVlID8gW2V4cGFuZGVkVmFsdWVdIDogW107XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogUmV0cmlldmUgYSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBvcHRpb25zIGFuZCB2YWx1ZUtleVxyXG5cdCAqIEBwYXJhbVx0e1N0cmluZ3xOdW1iZXJ8QXJyYXl9XHR2YWx1ZVx0LSB0aGUgc2VsZWN0ZWQgdmFsdWUocylcclxuXHQgKiBAcGFyYW1cdHtPYmplY3R9XHRcdHByb3BzXHQtIHRoZSBTZWxlY3QgY29tcG9uZW50J3MgcHJvcHMgKG9yIG5leHRQcm9wcylcclxuXHQgKi9cclxuXHRleHBhbmRWYWx1ZSAodmFsdWUsIHByb3BzKSB7XHJcblx0XHRjb25zdCB2YWx1ZVR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcblx0XHRpZiAodmFsdWVUeXBlICE9PSAnc3RyaW5nJyAmJiB2YWx1ZVR5cGUgIT09ICdudW1iZXInICYmIHZhbHVlVHlwZSAhPT0gJ2Jvb2xlYW4nKSByZXR1cm4gdmFsdWU7XHJcblx0XHRsZXQgeyBvcHRpb25zLCB2YWx1ZUtleSB9ID0gcHJvcHM7XHJcblx0XHRpZiAoIW9wdGlvbnMpIHJldHVybjtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAob3B0aW9uc1tpXVt2YWx1ZUtleV0gPT09IHZhbHVlKSByZXR1cm4gb3B0aW9uc1tpXTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRzZXRWYWx1ZSAodmFsdWUpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLmF1dG9CbHVyKXtcclxuXHRcdFx0dGhpcy5ibHVySW5wdXQoKTtcclxuXHRcdH1cclxuXHRcdGlmICghdGhpcy5wcm9wcy5vbkNoYW5nZSkgcmV0dXJuO1xyXG5cdFx0aWYgKHRoaXMucHJvcHMucmVxdWlyZWQpIHtcclxuXHRcdFx0Y29uc3QgcmVxdWlyZWQgPSB0aGlzLmhhbmRsZVJlcXVpcmVkKHZhbHVlLCB0aGlzLnByb3BzLm11bHRpKTtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHJlcXVpcmVkIH0pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMucHJvcHMuc2ltcGxlVmFsdWUgJiYgdmFsdWUpIHtcclxuXHRcdFx0dmFsdWUgPSB0aGlzLnByb3BzLm11bHRpID8gdmFsdWUubWFwKGkgPT4gaVt0aGlzLnByb3BzLnZhbHVlS2V5XSkuam9pbih0aGlzLnByb3BzLmRlbGltaXRlcikgOiB2YWx1ZVt0aGlzLnByb3BzLnZhbHVlS2V5XTtcclxuXHRcdH1cclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWUpO1xyXG5cdH0sXHJcblxyXG5cdHNlbGVjdFZhbHVlICh2YWx1ZSkge1xyXG5cdFx0Ly9OT1RFOiB1cGRhdGUgdmFsdWUgaW4gdGhlIGNhbGxiYWNrIHRvIG1ha2Ugc3VyZSB0aGUgaW5wdXQgdmFsdWUgaXMgZW1wdHkgc28gdGhhdCB0aGVyZSBhcmUgbm8gc3R5bGluZyBpc3N1ZXMgKENocm9tZSBoYWQgaXNzdWUgb3RoZXJ3aXNlKVxyXG5cdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRpbnB1dFZhbHVlOiAnJyxcclxuXHRcdFx0XHRmb2N1c2VkSW5kZXg6IG51bGxcclxuXHRcdFx0fSwgKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuYWRkVmFsdWUodmFsdWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXHJcblx0XHRcdFx0aW5wdXRWYWx1ZTogJycsXHJcblx0XHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiB0aGlzLnN0YXRlLmlzRm9jdXNlZCxcclxuXHRcdFx0fSwgKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRhZGRWYWx1ZSAodmFsdWUpIHtcclxuXHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xyXG5cdFx0Y29uc3QgdmlzaWJsZU9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9ucy5maWx0ZXIodmFsID0+ICF2YWwuZGlzYWJsZWQpO1xyXG5cdFx0Y29uc3QgbGFzdFZhbHVlSW5kZXggPSB2aXNpYmxlT3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcclxuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5jb25jYXQodmFsdWUpKTtcclxuXHRcdGlmICh2aXNpYmxlT3B0aW9ucy5sZW5ndGggLSAxID09PSBsYXN0VmFsdWVJbmRleCkge1xyXG5cdFx0XHQvLyB0aGUgbGFzdCBvcHRpb24gd2FzIHNlbGVjdGVkOyBmb2N1cyB0aGUgc2Vjb25kLWxhc3Qgb25lXHJcblx0XHRcdHRoaXMuZm9jdXNPcHRpb24odmlzaWJsZU9wdGlvbnNbbGFzdFZhbHVlSW5kZXggLSAxXSk7XHJcblx0XHR9IGVsc2UgaWYgKHZpc2libGVPcHRpb25zLmxlbmd0aCA+IGxhc3RWYWx1ZUluZGV4KSB7XHJcblx0XHRcdC8vIGZvY3VzIHRoZSBvcHRpb24gYmVsb3cgdGhlIHNlbGVjdGVkIG9uZVxyXG5cdFx0XHR0aGlzLmZvY3VzT3B0aW9uKHZpc2libGVPcHRpb25zW2xhc3RWYWx1ZUluZGV4ICsgMV0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHBvcFZhbHVlICgpIHtcclxuXHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xyXG5cdFx0aWYgKCF2YWx1ZUFycmF5Lmxlbmd0aCkgcmV0dXJuO1xyXG5cdFx0aWYgKHZhbHVlQXJyYXlbdmFsdWVBcnJheS5sZW5ndGgtMV0uY2xlYXJhYmxlVmFsdWUgPT09IGZhbHNlKSByZXR1cm47XHJcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlQXJyYXkuc2xpY2UoMCwgdmFsdWVBcnJheS5sZW5ndGggLSAxKSk7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlVmFsdWUgKHZhbHVlKSB7XHJcblx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcclxuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5maWx0ZXIoaSA9PiBpICE9PSB2YWx1ZSkpO1xyXG5cdFx0dGhpcy5mb2N1cygpO1xyXG5cdH0sXHJcblxyXG5cdGNsZWFyVmFsdWUgKGV2ZW50KSB7XHJcblx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XHJcblx0XHQvLyBidXR0b24sIGlnbm9yZSBpdC5cclxuXHRcdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy5zZXRWYWx1ZSh0aGlzLmdldFJlc2V0VmFsdWUoKSk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcclxuXHRcdFx0aW5wdXRWYWx1ZTogJycsXHJcblx0XHR9LCB0aGlzLmZvY3VzKTtcclxuXHR9LFxyXG5cclxuXHRnZXRSZXNldFZhbHVlICgpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLnJlc2V0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5yZXNldFZhbHVlO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLm11bHRpKSB7XHJcblx0XHRcdHJldHVybiBbXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGZvY3VzT3B0aW9uIChvcHRpb24pIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBvcHRpb25cclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGZvY3VzTmV4dE9wdGlvbiAoKSB7XHJcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ25leHQnKTtcclxuXHR9LFxyXG5cclxuXHRmb2N1c1ByZXZpb3VzT3B0aW9uICgpIHtcclxuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbigncHJldmlvdXMnKTtcclxuXHR9LFxyXG5cclxuXHRmb2N1c1BhZ2VVcE9wdGlvbiAoKSB7XHJcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3BhZ2VfdXAnKTtcclxuXHR9LFxyXG5cclxuXHRmb2N1c1BhZ2VEb3duT3B0aW9uICgpIHtcclxuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbigncGFnZV9kb3duJyk7XHJcblx0fSxcclxuXHJcblx0Zm9jdXNTdGFydE9wdGlvbiAoKSB7XHJcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3N0YXJ0Jyk7XHJcblx0fSxcclxuXHJcblx0Zm9jdXNFbmRPcHRpb24gKCkge1xyXG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdlbmQnKTtcclxuXHR9LFxyXG5cclxuXHRmb2N1c0FkamFjZW50T3B0aW9uIChkaXIpIHtcclxuXHRcdHZhciBvcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnNcclxuXHRcdFx0Lm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKHsgb3B0aW9uLCBpbmRleCB9KSlcclxuXHRcdFx0LmZpbHRlcihvcHRpb24gPT4gIW9wdGlvbi5vcHRpb24uZGlzYWJsZWQpO1xyXG5cdFx0dGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgPSB0cnVlO1xyXG5cdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRpc09wZW46IHRydWUsXHJcblx0XHRcdFx0aW5wdXRWYWx1ZTogJycsXHJcblx0XHRcdFx0Zm9jdXNlZE9wdGlvbjogdGhpcy5fZm9jdXNlZE9wdGlvbiB8fCAob3B0aW9ucy5sZW5ndGggPyBvcHRpb25zW2RpciA9PT0gJ25leHQnID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMV0ub3B0aW9uIDogbnVsbClcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmICghb3B0aW9ucy5sZW5ndGgpIHJldHVybjtcclxuXHRcdHZhciBmb2N1c2VkSW5kZXggPSAtMTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5fZm9jdXNlZE9wdGlvbiA9PT0gb3B0aW9uc1tpXS5vcHRpb24pIHtcclxuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoZGlyID09PSAnbmV4dCcgJiYgZm9jdXNlZEluZGV4ICE9PSAtMSApIHtcclxuXHRcdFx0Zm9jdXNlZEluZGV4ID0gKGZvY3VzZWRJbmRleCArIDEpICUgb3B0aW9ucy5sZW5ndGg7XHJcblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3ByZXZpb3VzJykge1xyXG5cdFx0XHRpZiAoZm9jdXNlZEluZGV4ID4gMCkge1xyXG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IGZvY3VzZWRJbmRleCAtIDE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3N0YXJ0Jykge1xyXG5cdFx0XHRmb2N1c2VkSW5kZXggPSAwO1xyXG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdlbmQnKSB7XHJcblx0XHRcdGZvY3VzZWRJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcclxuXHRcdH0gZWxzZSBpZiAoZGlyID09PSAncGFnZV91cCcpIHtcclxuXHRcdFx0dmFyIHBvdGVudGlhbEluZGV4ID0gZm9jdXNlZEluZGV4IC0gdGhpcy5wcm9wcy5wYWdlU2l6ZTtcclxuXHRcdFx0aWYgKHBvdGVudGlhbEluZGV4IDwgMCkge1xyXG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IDA7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gcG90ZW50aWFsSW5kZXg7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoZGlyID09PSAncGFnZV9kb3duJykge1xyXG5cdFx0XHR2YXIgcG90ZW50aWFsSW5kZXggPSBmb2N1c2VkSW5kZXggKyB0aGlzLnByb3BzLnBhZ2VTaXplO1xyXG5cdFx0XHRpZiAocG90ZW50aWFsSW5kZXggPiBvcHRpb25zLmxlbmd0aCAtIDEpIHtcclxuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gcG90ZW50aWFsSW5kZXg7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xyXG5cdFx0XHRmb2N1c2VkSW5kZXggPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRmb2N1c2VkSW5kZXg6IG9wdGlvbnNbZm9jdXNlZEluZGV4XS5pbmRleCxcclxuXHRcdFx0Zm9jdXNlZE9wdGlvbjogb3B0aW9uc1tmb2N1c2VkSW5kZXhdLm9wdGlvblxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Z2V0Rm9jdXNlZE9wdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZm9jdXNlZE9wdGlvbjtcclxuXHR9LFxyXG5cclxuXHRnZXRJbnB1dFZhbHVlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnN0YXRlLmlucHV0VmFsdWU7XHJcblx0fSxcclxuXHJcblx0c2VsZWN0Rm9jdXNlZE9wdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3RWYWx1ZSh0aGlzLl9mb2N1c2VkT3B0aW9uKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW5kZXJMb2FkaW5nICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5pc0xvYWRpbmcpIHJldHVybjtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1sb2FkaW5nLXpvbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtbG9hZGluZ1wiIC8+XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyVmFsdWUgKHZhbHVlQXJyYXksIGlzT3Blbikge1xyXG5cdFx0bGV0IHJlbmRlckxhYmVsID0gdGhpcy5wcm9wcy52YWx1ZVJlbmRlcmVyIHx8IHRoaXMuZ2V0T3B0aW9uTGFiZWw7XHJcblx0XHRsZXQgVmFsdWVDb21wb25lbnQgPSB0aGlzLnByb3BzLnZhbHVlQ29tcG9uZW50O1xyXG5cdFx0aWYgKCF2YWx1ZUFycmF5Lmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSA/IDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LXBsYWNlaG9sZGVyXCI+e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9PC9kaXY+IDogbnVsbDtcclxuXHRcdH1cclxuXHRcdGxldCBvbkNsaWNrID0gdGhpcy5wcm9wcy5vblZhbHVlQ2xpY2sgPyB0aGlzLmhhbmRsZVZhbHVlQ2xpY2sgOiBudWxsO1xyXG5cdFx0aWYgKHRoaXMucHJvcHMubXVsdGkpIHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlQXJyYXkubWFwKCh2YWx1ZSwgaSkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8VmFsdWVDb21wb25lbnRcclxuXHRcdFx0XHRcdFx0aWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZS0nICsgaX1cclxuXHRcdFx0XHRcdFx0aW5zdGFuY2VQcmVmaXg9e3RoaXMuX2luc3RhbmNlUHJlZml4fVxyXG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB2YWx1ZS5jbGVhcmFibGVWYWx1ZSA9PT0gZmFsc2V9XHJcblx0XHRcdFx0XHRcdGtleT17YHZhbHVlLSR7aX0tJHt2YWx1ZVt0aGlzLnByb3BzLnZhbHVlS2V5XX1gfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtvbkNsaWNrfVxyXG5cdFx0XHRcdFx0XHRvblJlbW92ZT17dGhpcy5yZW1vdmVWYWx1ZX1cclxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxyXG5cdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHR7cmVuZGVyTGFiZWwodmFsdWUsIGkpfVxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtYXJpYS1vbmx5XCI+Jm5ic3A7PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9WYWx1ZUNvbXBvbmVudD5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSkge1xyXG5cdFx0XHRpZiAoaXNPcGVuKSBvbkNsaWNrID0gbnVsbDtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8VmFsdWVDb21wb25lbnRcclxuXHRcdFx0XHRcdGlkPXt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctdmFsdWUtaXRlbSd9XHJcblx0XHRcdFx0XHRkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuXHRcdFx0XHRcdGluc3RhbmNlUHJlZml4PXt0aGlzLl9pbnN0YW5jZVByZWZpeH1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xpY2t9XHJcblx0XHRcdFx0XHR2YWx1ZT17dmFsdWVBcnJheVswXX1cclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHR7cmVuZGVyTGFiZWwodmFsdWVBcnJheVswXSl9XHJcblx0XHRcdFx0PC9WYWx1ZUNvbXBvbmVudD5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW5kZXJJbnB1dCAodmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbkluZGV4KSB7XHJcblx0XHR2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygnU2VsZWN0LWlucHV0JywgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSk7XHJcblx0XHRjb25zdCBpc09wZW4gPSAhIXRoaXMuc3RhdGUuaXNPcGVuO1xyXG5cclxuXHRcdGNvbnN0IGFyaWFPd25zID0gY2xhc3NOYW1lcyh7XHJcblx0XHRcdFt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCddOiBpc09wZW4sXHJcblx0XHRcdFt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctYmFja3NwYWNlLXJlbW92ZS1tZXNzYWdlJ106IHRoaXMucHJvcHMubXVsdGlcclxuXHRcdFx0XHQmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZFxyXG5cdFx0XHRcdCYmIHRoaXMuc3RhdGUuaXNGb2N1c2VkXHJcblx0XHRcdFx0JiYgIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gVE9ETzogQ2hlY2sgaG93IHRoaXMgcHJvamVjdCBpbmNsdWRlcyBPYmplY3QuYXNzaWduKClcclxuXHRcdGNvbnN0IGlucHV0UHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLmlucHV0UHJvcHMsIHtcclxuXHRcdFx0cm9sZTogJ2NvbWJvYm94JyxcclxuXHRcdFx0J2FyaWEtZXhwYW5kZWQnOiAnJyArIGlzT3BlbixcclxuXHRcdFx0J2FyaWEtb3ducyc6IGFyaWFPd25zLFxyXG5cdFx0XHQnYXJpYS1oYXNwb3B1cCc6ICcnICsgaXNPcGVuLFxyXG5cdFx0XHQnYXJpYS1hY3RpdmVkZXNjZW5kYW50JzogaXNPcGVuID8gdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLW9wdGlvbi0nICsgZm9jdXNlZE9wdGlvbkluZGV4IDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJyxcclxuXHRcdFx0J2FyaWEtbGFiZWxsZWRieSc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWxsZWRieSddLFxyXG5cdFx0XHQnYXJpYS1sYWJlbCc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSxcclxuXHRcdFx0Y2xhc3NOYW1lOiBjbGFzc05hbWUsXHJcblx0XHRcdHRhYkluZGV4OiB0aGlzLnByb3BzLnRhYkluZGV4LFxyXG5cdFx0XHRvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXRCbHVyLFxyXG5cdFx0XHRvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSxcclxuXHRcdFx0b25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxyXG5cdFx0XHRyZWY6IHJlZiA9PiB0aGlzLmlucHV0ID0gcmVmLFxyXG5cdFx0XHRyZXF1aXJlZDogdGhpcy5zdGF0ZS5yZXF1aXJlZCxcclxuXHRcdFx0dmFsdWU6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHRoaXMucHJvcHMuaW5wdXRSZW5kZXJlcikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKGlucHV0UHJvcHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8ICF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcclxuXHRcdFx0Y29uc3QgeyBpbnB1dENsYXNzTmFtZSwgLi4uZGl2UHJvcHMgfSA9IHRoaXMucHJvcHMuaW5wdXRQcm9wcztcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2XHJcblx0XHRcdFx0XHR7Li4uZGl2UHJvcHN9XHJcblx0XHRcdFx0XHRyb2xlPVwiY29tYm9ib3hcIlxyXG5cdFx0XHRcdFx0YXJpYS1leHBhbmRlZD17aXNPcGVufVxyXG5cdFx0XHRcdFx0YXJpYS1vd25zPXtpc09wZW4gPyB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCcgOiB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctdmFsdWUnfVxyXG5cdFx0XHRcdFx0YXJpYS1hY3RpdmVkZXNjZW5kYW50PXtpc09wZW4gPyB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctb3B0aW9uLScgKyBmb2N1c2VkT3B0aW9uSW5kZXggOiB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctdmFsdWUnfVxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcblx0XHRcdFx0XHR0YWJJbmRleD17dGhpcy5wcm9wcy50YWJJbmRleCB8fCAwfVxyXG5cdFx0XHRcdFx0b25CbHVyPXt0aGlzLmhhbmRsZUlucHV0Qmx1cn1cclxuXHRcdFx0XHRcdG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1c31cclxuXHRcdFx0XHRcdHJlZj17cmVmID0+IHRoaXMuaW5wdXQgPSByZWZ9XHJcblx0XHRcdFx0XHRhcmlhLXJlYWRvbmx5PXsnJyArICEhdGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuXHRcdFx0XHRcdHN0eWxlPXt7IGJvcmRlcjogMCwgd2lkdGg6IDEsIGRpc3BsYXk6J2lubGluZS1ibG9jaycgfX0vPlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnByb3BzLmF1dG9zaXplKSB7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PEF1dG9zaXplSW5wdXQgey4uLmlucHV0UHJvcHN9IG1pbldpZHRoPVwiNVwiIC8+XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17IGNsYXNzTmFtZSB9PlxyXG5cdFx0XHRcdDxpbnB1dCB7Li4uaW5wdXRQcm9wc30gLz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlckNsZWFyICgpIHtcclxuXHRcdGlmICghdGhpcy5wcm9wcy5jbGVhcmFibGUgfHwgKCF0aGlzLnByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMudmFsdWUgPT09IDApIHx8ICh0aGlzLnByb3BzLm11bHRpICYmICF0aGlzLnByb3BzLnZhbHVlLmxlbmd0aCkgfHwgdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0aGlzLnByb3BzLmlzTG9hZGluZykgcmV0dXJuO1xyXG5cdFx0Y29uc3QgY2xlYXIgPSB0aGlzLnByb3BzLmNsZWFyUmVuZGVyZXIoKTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtY2xlYXItem9uZVwiIHRpdGxlPXt0aGlzLnByb3BzLm11bHRpID8gdGhpcy5wcm9wcy5jbGVhckFsbFRleHQgOiB0aGlzLnByb3BzLmNsZWFyVmFsdWVUZXh0fVxyXG5cdFx0XHRcdGFyaWEtbGFiZWw9e3RoaXMucHJvcHMubXVsdGkgPyB0aGlzLnByb3BzLmNsZWFyQWxsVGV4dCA6IHRoaXMucHJvcHMuY2xlYXJWYWx1ZVRleHR9XHJcblx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuY2xlYXJWYWx1ZX1cclxuXHRcdFx0XHRvblRvdWNoU3RhcnQ9e3RoaXMuaGFuZGxlVG91Y2hTdGFydH1cclxuXHRcdFx0XHRvblRvdWNoTW92ZT17dGhpcy5oYW5kbGVUb3VjaE1vdmV9XHJcblx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5oYW5kbGVUb3VjaEVuZENsZWFyVmFsdWV9XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7Y2xlYXJ9XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyQXJyb3cgKCkge1xyXG5cdFx0Y29uc3Qgb25Nb3VzZURvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bk9uQXJyb3c7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc09wZW4gPSB0aGlzLnN0YXRlLmlzT3BlbjtcclxuXHRcdGNvbnN0IGFycm93ID0gdGhpcy5wcm9wcy5hcnJvd1JlbmRlcmVyKHsgb25Nb3VzZURvd24sIGlzT3BlbiB9KTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8c3BhblxyXG5cdFx0XHRcdGNsYXNzTmFtZT1cIlNlbGVjdC1hcnJvdy16b25lXCJcclxuXHRcdFx0XHRvbk1vdXNlRG93bj17b25Nb3VzZURvd259XHJcblx0XHRcdD5cclxuXHRcdFx0XHR7YXJyb3d9XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblx0ZmlsdGVyT3B0aW9ucyAoZXhjbHVkZU9wdGlvbnMpIHtcclxuXHRcdHZhciBmaWx0ZXJWYWx1ZSA9IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZTtcclxuXHRcdHZhciBvcHRpb25zID0gdGhpcy5wcm9wcy5vcHRpb25zIHx8IFtdO1xyXG5cdFx0aWYgKHRoaXMucHJvcHMuZmlsdGVyT3B0aW9ucykge1xyXG5cdFx0XHQvLyBNYWludGFpbiBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIGJvb2xlYW4gYXR0cmlidXRlXHJcblx0XHRcdGNvbnN0IGZpbHRlck9wdGlvbnMgPSB0eXBlb2YgdGhpcy5wcm9wcy5maWx0ZXJPcHRpb25zID09PSAnZnVuY3Rpb24nXHJcblx0XHRcdFx0PyB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnNcclxuXHRcdFx0XHQ6IGRlZmF1bHRGaWx0ZXJPcHRpb25zO1xyXG5cclxuXHRcdFx0cmV0dXJuIGZpbHRlck9wdGlvbnMoXHJcblx0XHRcdFx0b3B0aW9ucyxcclxuXHRcdFx0XHRmaWx0ZXJWYWx1ZSxcclxuXHRcdFx0XHRleGNsdWRlT3B0aW9ucyxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRmaWx0ZXJPcHRpb246IHRoaXMucHJvcHMuZmlsdGVyT3B0aW9uLFxyXG5cdFx0XHRcdFx0aWdub3JlQWNjZW50czogdGhpcy5wcm9wcy5pZ25vcmVBY2NlbnRzLFxyXG5cdFx0XHRcdFx0aWdub3JlQ2FzZTogdGhpcy5wcm9wcy5pZ25vcmVDYXNlLFxyXG5cdFx0XHRcdFx0bGFiZWxLZXk6IHRoaXMucHJvcHMubGFiZWxLZXksXHJcblx0XHRcdFx0XHRtYXRjaFBvczogdGhpcy5wcm9wcy5tYXRjaFBvcyxcclxuXHRcdFx0XHRcdG1hdGNoUHJvcDogdGhpcy5wcm9wcy5tYXRjaFByb3AsXHJcblx0XHRcdFx0XHR2YWx1ZUtleTogdGhpcy5wcm9wcy52YWx1ZUtleSxcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRvbk9wdGlvblJlZihyZWYsIGlzRm9jdXNlZCkge1xyXG5cdFx0aWYgKGlzRm9jdXNlZCkge1xyXG5cdFx0XHR0aGlzLmZvY3VzZWQgPSByZWY7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVuZGVyTWVudSAob3B0aW9ucywgdmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbikge1xyXG5cdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMubWVudVJlbmRlcmVyKHtcclxuXHRcdFx0XHRmb2N1c2VkT3B0aW9uLFxyXG5cdFx0XHRcdGZvY3VzT3B0aW9uOiB0aGlzLmZvY3VzT3B0aW9uLFxyXG5cdFx0XHRcdGluc3RhbmNlUHJlZml4OiB0aGlzLl9pbnN0YW5jZVByZWZpeCxcclxuXHRcdFx0XHRsYWJlbEtleTogdGhpcy5wcm9wcy5sYWJlbEtleSxcclxuXHRcdFx0XHRvbkZvY3VzOiB0aGlzLmZvY3VzT3B0aW9uLFxyXG5cdFx0XHRcdG9uU2VsZWN0OiB0aGlzLnNlbGVjdFZhbHVlLFxyXG5cdFx0XHRcdG9wdGlvbkNsYXNzTmFtZTogdGhpcy5wcm9wcy5vcHRpb25DbGFzc05hbWUsXHJcblx0XHRcdFx0b3B0aW9uQ29tcG9uZW50OiB0aGlzLnByb3BzLm9wdGlvbkNvbXBvbmVudCxcclxuXHRcdFx0XHRvcHRpb25SZW5kZXJlcjogdGhpcy5wcm9wcy5vcHRpb25SZW5kZXJlciB8fCB0aGlzLmdldE9wdGlvbkxhYmVsLFxyXG5cdFx0XHRcdG9wdGlvbnMsXHJcblx0XHRcdFx0c2VsZWN0VmFsdWU6IHRoaXMuc2VsZWN0VmFsdWUsXHJcblx0XHRcdFx0dmFsdWVBcnJheSxcclxuXHRcdFx0XHR2YWx1ZUtleTogdGhpcy5wcm9wcy52YWx1ZUtleSxcclxuXHRcdFx0XHRvbk9wdGlvblJlZjogdGhpcy5vbk9wdGlvblJlZixcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMubm9SZXN1bHRzVGV4dCkge1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LW5vcmVzdWx0c1wiPlxyXG5cdFx0XHRcdFx0e3RoaXMucHJvcHMubm9SZXN1bHRzVGV4dH1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlbmRlckhpZGRlbkZpZWxkICh2YWx1ZUFycmF5KSB7XHJcblx0XHRpZiAoIXRoaXMucHJvcHMubmFtZSkgcmV0dXJuO1xyXG5cdFx0aWYgKHRoaXMucHJvcHMuam9pblZhbHVlcykge1xyXG5cdFx0XHRsZXQgdmFsdWUgPSB2YWx1ZUFycmF5Lm1hcChpID0+IHN0cmluZ2lmeVZhbHVlKGlbdGhpcy5wcm9wcy52YWx1ZUtleV0pKS5qb2luKHRoaXMucHJvcHMuZGVsaW1pdGVyKTtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8aW5wdXRcclxuXHRcdFx0XHRcdHR5cGU9XCJoaWRkZW5cIlxyXG5cdFx0XHRcdFx0cmVmPXtyZWYgPT4gdGhpcy52YWx1ZSA9IHJlZn1cclxuXHRcdFx0XHRcdG5hbWU9e3RoaXMucHJvcHMubmFtZX1cclxuXHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cclxuXHRcdFx0XHRcdGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfSAvPlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZhbHVlQXJyYXkubWFwKChpdGVtLCBpbmRleCkgPT4gKFxyXG5cdFx0XHQ8aW5wdXQga2V5PXsnaGlkZGVuLicgKyBpbmRleH1cclxuXHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcclxuXHRcdFx0XHRyZWY9eyd2YWx1ZScgKyBpbmRleH1cclxuXHRcdFx0XHRuYW1lPXt0aGlzLnByb3BzLm5hbWV9XHJcblx0XHRcdFx0dmFsdWU9e3N0cmluZ2lmeVZhbHVlKGl0ZW1bdGhpcy5wcm9wcy52YWx1ZUtleV0pfVxyXG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfSAvPlxyXG5cdFx0KSk7XHJcblx0fSxcclxuXHJcblx0Z2V0Rm9jdXNhYmxlT3B0aW9uSW5kZXggKHNlbGVjdGVkT3B0aW9uKSB7XHJcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zO1xyXG5cdFx0aWYgKCFvcHRpb25zLmxlbmd0aCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0bGV0IGZvY3VzZWRPcHRpb24gPSB0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24gfHwgc2VsZWN0ZWRPcHRpb247XHJcblx0XHRpZiAoZm9jdXNlZE9wdGlvbiAmJiAhZm9jdXNlZE9wdGlvbi5kaXNhYmxlZCkge1xyXG5cdFx0XHRsZXQgZm9jdXNlZE9wdGlvbkluZGV4ID0gLTE7XHJcblx0XHRcdG9wdGlvbnMuc29tZSgob3B0aW9uLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGlzT3B0aW9uRXF1YWwgPSBvcHRpb24udmFsdWUgPT09IGZvY3VzZWRPcHRpb24udmFsdWU7XHJcblx0XHRcdFx0aWYgKGlzT3B0aW9uRXF1YWwpIHtcclxuXHRcdFx0XHRcdGZvY3VzZWRPcHRpb25JbmRleCA9IGluZGV4O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gaXNPcHRpb25FcXVhbDtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChmb2N1c2VkT3B0aW9uSW5kZXggIT09IC0xKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZvY3VzZWRPcHRpb25JbmRleDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoIW9wdGlvbnNbaV0uZGlzYWJsZWQpIHJldHVybiBpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyT3V0ZXIgKG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIHtcclxuXHRcdGxldCBtZW51ID0gdGhpcy5yZW5kZXJNZW51KG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pO1xyXG5cdFx0aWYgKCFtZW51KSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgcmVmPXtyZWYgPT4gdGhpcy5tZW51Q29udGFpbmVyID0gcmVmfSBjbGFzc05hbWU9XCJTZWxlY3QtbWVudS1vdXRlclwiIHN0eWxlPXt0aGlzLnByb3BzLm1lbnVDb250YWluZXJTdHlsZX0+XHJcblx0XHRcdFx0PGRpdiByZWY9e3JlZiA9PiB0aGlzLm1lbnUgPSByZWZ9IHJvbGU9XCJsaXN0Ym94XCIgY2xhc3NOYW1lPVwiU2VsZWN0LW1lbnVcIiBpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWxpc3QnfVxyXG5cdFx0XHRcdFx0XHQgc3R5bGU9e3RoaXMucHJvcHMubWVudVN0eWxlfVxyXG5cdFx0XHRcdFx0XHQgb25TY3JvbGw9e3RoaXMuaGFuZGxlTWVudVNjcm9sbH1cclxuXHRcdFx0XHRcdFx0IG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bk9uTWVudX0+XHJcblx0XHRcdFx0XHR7bWVudX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlciAoKSB7XHJcblx0XHRsZXQgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcclxuXHRcdGxldCBvcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnMgPSB0aGlzLmZpbHRlck9wdGlvbnModGhpcy5wcm9wcy5tdWx0aSA/IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKSA6IG51bGwpO1xyXG5cdFx0bGV0IGlzT3BlbiA9IHRoaXMuc3RhdGUuaXNPcGVuO1xyXG5cdFx0aWYgKHRoaXMucHJvcHMubXVsdGkgJiYgIW9wdGlvbnMubGVuZ3RoICYmIHZhbHVlQXJyYXkubGVuZ3RoICYmICF0aGlzLnN0YXRlLmlucHV0VmFsdWUpIGlzT3BlbiA9IGZhbHNlO1xyXG5cdFx0Y29uc3QgZm9jdXNlZE9wdGlvbkluZGV4ID0gdGhpcy5nZXRGb2N1c2FibGVPcHRpb25JbmRleCh2YWx1ZUFycmF5WzBdKTtcclxuXHJcblx0XHRsZXQgZm9jdXNlZE9wdGlvbiA9IG51bGw7XHJcblx0XHRpZiAoZm9jdXNlZE9wdGlvbkluZGV4ICE9PSBudWxsKSB7XHJcblx0XHRcdGZvY3VzZWRPcHRpb24gPSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gb3B0aW9uc1tmb2N1c2VkT3B0aW9uSW5kZXhdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Zm9jdXNlZE9wdGlvbiA9IHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBudWxsO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoJ1NlbGVjdCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XHJcblx0XHRcdCdTZWxlY3QtLW11bHRpJzogdGhpcy5wcm9wcy5tdWx0aSxcclxuXHRcdFx0J1NlbGVjdC0tc2luZ2xlJzogIXRoaXMucHJvcHMubXVsdGksXHJcblx0XHRcdCdpcy1kaXNhYmxlZCc6IHRoaXMucHJvcHMuZGlzYWJsZWQsXHJcblx0XHRcdCdpcy1mb2N1c2VkJzogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQsXHJcblx0XHRcdCdpcy1sb2FkaW5nJzogdGhpcy5wcm9wcy5pc0xvYWRpbmcsXHJcblx0XHRcdCdpcy1vcGVuJzogaXNPcGVuLFxyXG5cdFx0XHQnaXMtcHNldWRvLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmlzUHNldWRvRm9jdXNlZCxcclxuXHRcdFx0J2lzLXNlYXJjaGFibGUnOiB0aGlzLnByb3BzLnNlYXJjaGFibGUsXHJcblx0XHRcdCdoYXMtdmFsdWUnOiB2YWx1ZUFycmF5Lmxlbmd0aCxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCByZW1vdmVNZXNzYWdlID0gbnVsbDtcclxuXHRcdGlmICh0aGlzLnByb3BzLm11bHRpICYmXHJcblx0XHRcdCF0aGlzLnByb3BzLmRpc2FibGVkICYmXHJcblx0XHRcdHZhbHVlQXJyYXkubGVuZ3RoICYmXHJcblx0XHRcdCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiZcclxuXHRcdFx0dGhpcy5zdGF0ZS5pc0ZvY3VzZWQgJiZcclxuXHRcdFx0dGhpcy5wcm9wcy5iYWNrc3BhY2VSZW1vdmVzKSB7XHJcblx0XHRcdHJlbW92ZU1lc3NhZ2UgPSAoXHJcblx0XHRcdFx0PHNwYW4gaWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1iYWNrc3BhY2UtcmVtb3ZlLW1lc3NhZ2UnfSBjbGFzc05hbWU9XCJTZWxlY3QtYXJpYS1vbmx5XCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCI+XHJcblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5iYWNrc3BhY2VUb1JlbW92ZU1lc3NhZ2UucmVwbGFjZSgne2xhYmVsfScsIHZhbHVlQXJyYXlbdmFsdWVBcnJheS5sZW5ndGggLSAxXVt0aGlzLnByb3BzLmxhYmVsS2V5XSl9XHJcblx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgcmVmPXtyZWYgPT4gdGhpcy53cmFwcGVyID0gcmVmfVxyXG5cdFx0XHRcdCBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuXHRcdFx0XHQgc3R5bGU9e3RoaXMucHJvcHMud3JhcHBlclN0eWxlfT5cclxuXHRcdFx0XHR7dGhpcy5yZW5kZXJIaWRkZW5GaWVsZCh2YWx1ZUFycmF5KX1cclxuXHRcdFx0XHQ8ZGl2IHJlZj17cmVmID0+IHRoaXMuY29udHJvbCA9IHJlZn1cclxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cIlNlbGVjdC1jb250cm9sXCJcclxuXHRcdFx0XHRcdHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfVxyXG5cdFx0XHRcdFx0b25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XHJcblx0XHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259XHJcblx0XHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kfVxyXG5cdFx0XHRcdFx0b25Ub3VjaFN0YXJ0PXt0aGlzLmhhbmRsZVRvdWNoU3RhcnR9XHJcblx0XHRcdFx0XHRvblRvdWNoTW92ZT17dGhpcy5oYW5kbGVUb3VjaE1vdmV9XHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LW11bHRpLXZhbHVlLXdyYXBwZXJcIiBpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJ30+XHJcblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlclZhbHVlKHZhbHVlQXJyYXksIGlzT3Blbil9XHJcblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlcklucHV0KHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb25JbmRleCl9XHJcblx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHR7cmVtb3ZlTWVzc2FnZX1cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckxvYWRpbmcoKX1cclxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckNsZWFyKCl9XHJcblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJBcnJvdygpfVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdHtpc09wZW4gPyB0aGlzLnJlbmRlck91dGVyKG9wdGlvbnMsICF0aGlzLnByb3BzLm11bHRpID8gdmFsdWVBcnJheSA6IG51bGwsIGZvY3VzZWRPcHRpb24pIDogbnVsbH1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0O1xyXG4iXX0=
