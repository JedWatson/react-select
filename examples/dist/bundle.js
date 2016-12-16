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
					if (_this3.props.value && newValues.length > _this3.props.value.length) {
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
};
module.exports = exports['default'];

},{"./Select":"react-select","./utils/stripDiacritics":9,"react":undefined}],2:[function(require,module,exports){
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
		var _props4$children = _props4.children;
		var children = _props4$children === undefined ? defaultChildren : _props4$children;
		var newOptionCreator = _props4.newOptionCreator;
		var shouldKeyDownEventCreateNewOption = _props4.shouldKeyDownEventCreateNewOption;

		var restProps = _objectWithoutProperties(_props4, ['children', 'newOptionCreator', 'shouldKeyDownEventCreateNewOption']);

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

},{"./Select":"react-select","./utils/defaultFilterOptions":7,"./utils/defaultMenuRenderer":8,"react":undefined}],4:[function(require,module,exports){
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

},{"./stripDiacritics":9}],8:[function(require,module,exports){
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

},{"classnames":undefined,"react":undefined}],9:[function(require,module,exports){
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
		console.log("MouseDown");
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

		var newInputValue = this.state.inputValue;
		if (this.props.onInputChange && this.props.onBlurResetsInput) {
			var nextState = this.props.onInputChange('');
			// Note: != used deliberately here to catch undefined and null
			if (nextState != null && typeof nextState !== 'object') {
				newInputValue = '' + nextState;
			}
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
				isPseudoFocused: false,
				inputValue: newInputValue
			});
		} else {
			//otherwise, focus the input and open the menu
			this.setState({
				inputValue: newInputValue
			});

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
		this.setValue(valueArray.concat(value));
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
				focusedOption: this._focusedOption || options[dir === 'next' ? 0 : options.length - 1].option
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
		return _react2['default'].createElement(
			'span',
			{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
				'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
				onMouseDown: this.clearValue,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEndClearValue
			},
			_react2['default'].createElement('span', { className: 'Select-clear', dangerouslySetInnerHTML: { __html: '&times;' } })
		);
	},

	renderArrow: function renderArrow() {
		var onMouseDown = this.handleMouseDownOnArrow;
		var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown });

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
			var focusedOptionIndex = options.indexOf(focusedOption);
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

},{"./Async":1,"./AsyncCreatable":2,"./Creatable":3,"./Option":4,"./Value":5,"./utils/defaultArrowRenderer":6,"./utils/defaultFilterOptions":7,"./utils/defaultMenuRenderer":8,"classnames":undefined,"react":undefined,"react-dom":undefined,"react-input-autosize":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiRDovUHJvamVjdHMvU3RhbmRhcnQvcmVhY3Qtc2VsZWN0L3NyYy9Bc3luYy5qcyIsIkQ6L1Byb2plY3RzL1N0YW5kYXJ0L3JlYWN0LXNlbGVjdC9zcmMvQXN5bmNDcmVhdGFibGUuanMiLCJEOi9Qcm9qZWN0cy9TdGFuZGFydC9yZWFjdC1zZWxlY3Qvc3JjL0NyZWF0YWJsZS5qcyIsIkQ6L1Byb2plY3RzL1N0YW5kYXJ0L3JlYWN0LXNlbGVjdC9zcmMvT3B0aW9uLmpzIiwiRDovUHJvamVjdHMvU3RhbmRhcnQvcmVhY3Qtc2VsZWN0L3NyYy9WYWx1ZS5qcyIsIkQ6L1Byb2plY3RzL1N0YW5kYXJ0L3JlYWN0LXNlbGVjdC9zcmMvdXRpbHMvZGVmYXVsdEFycm93UmVuZGVyZXIuanMiLCJEOi9Qcm9qZWN0cy9TdGFuZGFydC9yZWFjdC1zZWxlY3Qvc3JjL3V0aWxzL2RlZmF1bHRGaWx0ZXJPcHRpb25zLmpzIiwiRDovUHJvamVjdHMvU3RhbmRhcnQvcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyLmpzIiwiRDovUHJvamVjdHMvU3RhbmRhcnQvcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9zdHJpcERpYWNyaXRpY3MuanMiLCJEOi9Qcm9qZWN0cy9TdGFuZGFydC9yZWFjdC1zZWxlY3Qvc3JjL1NlbGVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0E0QyxPQUFPOzs7O3NCQUNoQyxVQUFVOzs7O29DQUNELHlCQUF5Qjs7OztBQUVyRCxJQUFNLFNBQVMsR0FBRztBQUNqQixTQUFRLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQ3pDLE1BQUssRUFBRSxtQkFBTSxTQUFT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R0FDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztHQUNuQzs7TUFBSyxHQUFHLEVBQUUsVUFBQSxHQUFHO2FBQUksT0FBSyxPQUFPLEdBQUcsR0FBRztNQUFBLEFBQUM7QUFDbkMsY0FBUyxFQUFDLGdCQUFnQjtBQUMxQixVQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUM7QUFDeEIsY0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEFBQUM7QUFDOUIsZ0JBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxBQUFDO0FBQ2xDLGVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxBQUFDO0FBQ2hDLGlCQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixBQUFDO0FBQ3BDLGdCQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQUFBQzs7SUFFbEM7O09BQU0sU0FBUyxFQUFDLDRCQUE0QixFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQUFBQztLQUMvRSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUM7S0FDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUM7S0FDM0M7SUFDTixhQUFhO0lBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRTtJQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFO0lBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQUU7SUFDZDtHQUNMLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxJQUFJLEVBQUUsYUFBYSxDQUFDLEdBQUcsSUFBSTtHQUMzRixDQUNMO0VBQ0Y7O0NBRUQsQ0FBQyxDQUFDOztxQkFFWSxNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9TZWxlY3QnO1xuaW1wb3J0IHN0cmlwRGlhY3JpdGljcyBmcm9tICcuL3V0aWxzL3N0cmlwRGlhY3JpdGljcyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcblx0YXV0b2xvYWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYGxvYWRPcHRpb25zYCBwcm9wIG9uLW1vdW50OyBkZWZhdWx0cyB0byB0cnVlXG5cdGNhY2hlOiBSZWFjdC5Qcm9wVHlwZXMuYW55LCAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3QgdG8gdXNlIHRvIGNhY2hlIHJlc3VsdHM7IHNldCB0byBudWxsL2ZhbHNlIHRvIGRpc2FibGUgY2FjaGluZ1xuXHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCwgICAgICAgLy8gQ2hpbGQgZnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoZSBpbm5lciBTZWxlY3QgY29tcG9uZW50OyAocHJvcHM6IE9iamVjdCk6IFByb3BUeXBlcy5lbGVtZW50XG5cdGlnbm9yZUFjY2VudHM6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyBzdHJpcCBkaWFjcml0aWNzIHdoZW4gZmlsdGVyaW5nOyBkZWZhdWx0cyB0byB0cnVlXG5cdGlnbm9yZUNhc2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgICAvLyBwZXJmb3JtIGNhc2UtaW5zZW5zaXRpdmUgZmlsdGVyaW5nOyBkZWZhdWx0cyB0byB0cnVlXG5cdGxvYWRpbmdQbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbICAvLyByZXBsYWNlcyB0aGUgcGxhY2Vob2xkZXIgd2hpbGUgb3B0aW9ucyBhcmUgbG9hZGluZ1xuXHRcdFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UmVhY3QuUHJvcFR5cGVzLm5vZGVcblx0XSksXG5cdGxvYWRPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLCAgICAvLyBjYWxsYmFjayB0byBsb2FkIG9wdGlvbnMgYXN5bmNocm9ub3VzbHk7IChpbnB1dFZhbHVlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6ID9Qcm9taXNlXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLCAgICAgICAgICAgICAvLyBhcnJheSBvZiBvcHRpb25zXG5cdHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFsgICAgICAgICAvLyBmaWVsZCBwbGFjZWhvbGRlciwgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyB2YWx1ZSAoc2hhcmVkIHdpdGggU2VsZWN0KVxuXHRcdFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UmVhY3QuUHJvcFR5cGVzLm5vZGVcblx0XSksXG5cdG5vUmVzdWx0c1RleHQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoWyAgICAgICAvLyBmaWVsZCBub1Jlc3VsdHNUZXh0LCBkaXNwbGF5ZWQgd2hlbiBubyBvcHRpb25zIGNvbWUgYmFjayBmcm9tIHRoZSBzZXJ2ZXJcblx0XHRSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFJlYWN0LlByb3BUeXBlcy5ub2RlXG5cdF0pLFxuXHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgICAgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7fVxuXHRzZWFyY2hQcm9tcHRUZXh0OiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFsgICAgLy8gbGFiZWwgdG8gcHJvbXB0IGZvciBzZWFyY2ggaW5wdXRcblx0XHRSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFJlYWN0LlByb3BUeXBlcy5ub2RlXG5cdF0pLFxuXHRvbklucHV0Q2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgLy8gb3B0aW9uYWwgZm9yIGtlZXBpbmcgdHJhY2sgb2Ygd2hhdCBpcyBiZWluZyB0eXBlZFxuXHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCBmaWVsZCB2YWx1ZVxufTtcblxuY29uc3QgZGVmYXVsdENhY2hlID0ge307XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcblx0YXV0b2xvYWQ6IHRydWUsXG5cdGNhY2hlOiBkZWZhdWx0Q2FjaGUsXG5cdGNoaWxkcmVuOiBkZWZhdWx0Q2hpbGRyZW4sXG5cdGlnbm9yZUFjY2VudHM6IHRydWUsXG5cdGlnbm9yZUNhc2U6IHRydWUsXG5cdGxvYWRpbmdQbGFjZWhvbGRlcjogJ0xvYWRpbmcuLi4nLFxuXHRvcHRpb25zOiBbXSxcblx0c2VhcmNoUHJvbXB0VGV4dDogJ1R5cGUgdG8gc2VhcmNoJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzeW5jIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IgKHByb3BzLCBjb250ZXh0KSB7XG5cdFx0c3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG5cdFx0dGhpcy5fY2FjaGUgPSBwcm9wcy5jYWNoZSA9PT0gZGVmYXVsdENhY2hlID8ge30gOiBwcm9wcy5jYWNoZTtcblxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0b3B0aW9uczogcHJvcHMub3B0aW9ucyxcblx0XHR9O1xuXG5cdFx0dGhpcy5fb25JbnB1dENoYW5nZSA9IHRoaXMuX29uSW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcblx0XHRjb25zdCB7IGF1dG9sb2FkIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0aWYgKGF1dG9sb2FkKSB7XG5cdFx0XHR0aGlzLmxvYWRPcHRpb25zKCcnKTtcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVXBkYXRlIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuXHRcdGNvbnN0IHByb3BlcnRpZXNUb1N5bmMgPSBbJ29wdGlvbnMnXTtcblx0XHRwcm9wZXJ0aWVzVG9TeW5jLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdGlmICh0aGlzLnByb3BzW3Byb3BdICE9PSBuZXh0UHJvcHNbcHJvcF0pIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0W3Byb3BdOiBuZXh0UHJvcHNbcHJvcF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRjbGVhck9wdGlvbnMoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IG9wdGlvbnM6IFtdIH0pO1xuXHR9XG5cblx0bG9hZE9wdGlvbnMgKGlucHV0VmFsdWUpIHtcblx0XHRjb25zdCB7IGxvYWRPcHRpb25zIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IGNhY2hlID0gdGhpcy5fY2FjaGU7XG5cblx0XHRpZiAoXG5cdFx0XHRjYWNoZSAmJlxuXHRcdFx0Y2FjaGUuaGFzT3duUHJvcGVydHkoaW5wdXRWYWx1ZSlcblx0XHQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRvcHRpb25zOiBjYWNoZVtpbnB1dFZhbHVlXVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBjYWxsYmFjayA9IChlcnJvciwgZGF0YSkgPT4ge1xuXHRcdFx0aWYgKGNhbGxiYWNrID09PSB0aGlzLl9jYWxsYmFjaykge1xuXHRcdFx0XHR0aGlzLl9jYWxsYmFjayA9IG51bGw7XG5cblx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGRhdGEgJiYgZGF0YS5vcHRpb25zIHx8IFtdO1xuXG5cdFx0XHRcdGlmIChjYWNoZSkge1xuXHRcdFx0XHRcdGNhY2hlW2lucHV0VmFsdWVdID0gb3B0aW9ucztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdFx0b3B0aW9uc1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gSWdub3JlIGFsbCBidXQgdGhlIG1vc3QgcmVjZW50IHJlcXVlc3Rcblx0XHR0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0Y29uc3QgcHJvbWlzZSA9IGxvYWRPcHRpb25zKGlucHV0VmFsdWUsIGNhbGxiYWNrKTtcblx0XHRpZiAocHJvbWlzZSkge1xuXHRcdFx0cHJvbWlzZS50aGVuKFxuXHRcdFx0XHQoZGF0YSkgPT4gY2FsbGJhY2sobnVsbCwgZGF0YSksXG5cdFx0XHRcdChlcnJvcikgPT4gY2FsbGJhY2soZXJyb3IpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChcblx0XHRcdHRoaXMuX2NhbGxiYWNrICYmXG5cdFx0XHQhdGhpcy5zdGF0ZS5pc0xvYWRpbmdcblx0XHQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc0xvYWRpbmc6IHRydWVcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBpbnB1dFZhbHVlO1xuXHR9XG5cblx0X29uSW5wdXRDaGFuZ2UgKGlucHV0VmFsdWUpIHtcblx0XHRjb25zdCB7IGlnbm9yZUFjY2VudHMsIGlnbm9yZUNhc2UsIG9uSW5wdXRDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAoaWdub3JlQWNjZW50cykge1xuXHRcdFx0aW5wdXRWYWx1ZSA9IHN0cmlwRGlhY3JpdGljcyhpbnB1dFZhbHVlKTtcblx0XHR9XG5cblx0XHRpZiAoaWdub3JlQ2FzZSkge1xuXHRcdFx0aW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHR9XG5cblx0XHRpZiAob25JbnB1dENoYW5nZSkge1xuXHRcdFx0b25JbnB1dENoYW5nZShpbnB1dFZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5sb2FkT3B0aW9ucyhpbnB1dFZhbHVlKTtcblx0fVxuXG5cdGlucHV0VmFsdWUoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3Quc3RhdGUuaW5wdXRWYWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bm9SZXN1bHRzVGV4dCgpIHtcblx0XHRjb25zdCB7IGxvYWRpbmdQbGFjZWhvbGRlciwgbm9SZXN1bHRzVGV4dCwgc2VhcmNoUHJvbXB0VGV4dCB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB7IGlzTG9hZGluZyB9ID0gdGhpcy5zdGF0ZTtcblxuXHRcdGNvbnN0IGlucHV0VmFsdWUgPSB0aGlzLmlucHV0VmFsdWUoKTtcblxuXHRcdGlmIChpc0xvYWRpbmcpIHtcblx0XHRcdHJldHVybiBsb2FkaW5nUGxhY2Vob2xkZXI7XG5cdFx0fVxuXHRcdGlmIChpbnB1dFZhbHVlICYmIG5vUmVzdWx0c1RleHQpIHtcblx0XHRcdHJldHVybiBub1Jlc3VsdHNUZXh0O1xuXHRcdH1cblx0XHRyZXR1cm4gc2VhcmNoUHJvbXB0VGV4dDtcblx0fVxuXG5cdHJlbmRlciAoKSB7XG5cdFx0Y29uc3QgeyBjaGlsZHJlbiwgbG9hZGluZ1BsYWNlaG9sZGVyLCBwbGFjZWhvbGRlciB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB7IGlzTG9hZGluZywgb3B0aW9ucyB9ID0gdGhpcy5zdGF0ZTtcblxuXHRcdGNvbnN0IHByb3BzID0ge1xuXHRcdFx0bm9SZXN1bHRzVGV4dDogdGhpcy5ub1Jlc3VsdHNUZXh0KCksXG5cdFx0XHRwbGFjZWhvbGRlcjogaXNMb2FkaW5nID8gbG9hZGluZ1BsYWNlaG9sZGVyIDogcGxhY2Vob2xkZXIsXG5cdFx0XHRvcHRpb25zOiAoaXNMb2FkaW5nICYmIGxvYWRpbmdQbGFjZWhvbGRlcikgPyBbXSA6IG9wdGlvbnMsXG5cdFx0XHRyZWY6IChyZWYpID0+ICh0aGlzLnNlbGVjdCA9IHJlZiksXG5cdFx0XHRvbkNoYW5nZTogKG5ld1ZhbHVlcykgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5wcm9wcy52YWx1ZSAmJiAobmV3VmFsdWVzLmxlbmd0aCA+IHRoaXMucHJvcHMudmFsdWUubGVuZ3RoKSkge1xuXHRcdFx0XHRcdHRoaXMuY2xlYXJPcHRpb25zKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZShuZXdWYWx1ZXMpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gY2hpbGRyZW4oe1xuXHRcdFx0Li4udGhpcy5wcm9wcyxcblx0XHRcdC4uLnByb3BzLFxuXHRcdFx0aXNMb2FkaW5nLFxuXHRcdFx0b25JbnB1dENoYW5nZTogdGhpcy5fb25JbnB1dENoYW5nZVxuXHRcdH0pO1xuXHR9XG59XG5cbkFzeW5jLnByb3BUeXBlcyA9IHByb3BUeXBlcztcbkFzeW5jLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuZnVuY3Rpb24gZGVmYXVsdENoaWxkcmVuIChwcm9wcykge1xuXHRyZXR1cm4gKFxuXHRcdDxTZWxlY3Qgey4uLnByb3BzfSAvPlxuXHQpO1xufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vU2VsZWN0JztcblxuZnVuY3Rpb24gcmVkdWNlKG9iaiwgcHJvcHMgPSB7fSl7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopXG4gIC5yZWR1Y2UoKHByb3BzLCBrZXkpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSBwcm9wc1trZXldID0gdmFsdWU7XG4gICAgcmV0dXJuIHByb3BzO1xuICB9LCBwcm9wcyk7XG59XG5cbmNvbnN0IEFzeW5jQ3JlYXRhYmxlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ0FzeW5jQ3JlYXRhYmxlU2VsZWN0JyxcblxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8U2VsZWN0LkFzeW5jIHsuLi50aGlzLnByb3BzfT5cblx0XHRcdFx0eyhhc3luY1Byb3BzKSA9PiAoXG5cdFx0XHRcdFx0PFNlbGVjdC5DcmVhdGFibGUgey4uLnRoaXMucHJvcHN9PlxuXHRcdFx0XHRcdFx0eyhjcmVhdGFibGVQcm9wcykgPT4gKFxuXHRcdFx0XHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0XHRcdFx0ey4uLnJlZHVjZShhc3luY1Byb3BzLCByZWR1Y2UoY3JlYXRhYmxlUHJvcHMsIHt9KSl9XG5cdFx0XHRcdFx0XHRcdFx0b25JbnB1dENoYW5nZT17KGlucHV0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGFibGVQcm9wcy5vbklucHV0Q2hhbmdlKGlucHV0KTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBhc3luY1Byb3BzLm9uSW5wdXRDaGFuZ2UoaW5wdXQpO1xuXHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0cmVmPXsocmVmKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGFibGVQcm9wcy5yZWYocmVmKTtcblx0XHRcdFx0XHRcdFx0XHRcdGFzeW5jUHJvcHMucmVmKHJlZik7XG5cdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdCl9XG5cdFx0XHRcdFx0PC9TZWxlY3QuQ3JlYXRhYmxlPlxuXHRcdFx0XHQpfVxuXHRcdFx0PC9TZWxlY3QuQXN5bmM+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXN5bmNDcmVhdGFibGU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICcuL1NlbGVjdCc7XG5pbXBvcnQgZGVmYXVsdEZpbHRlck9wdGlvbnMgZnJvbSAnLi91dGlscy9kZWZhdWx0RmlsdGVyT3B0aW9ucyc7XG5pbXBvcnQgZGVmYXVsdE1lbnVSZW5kZXJlciBmcm9tICcuL3V0aWxzL2RlZmF1bHRNZW51UmVuZGVyZXInO1xuXG5jb25zdCBDcmVhdGFibGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQ3JlYXRhYmxlU2VsZWN0JyxcblxuXHRwcm9wVHlwZXM6IHtcblx0XHQvLyBDaGlsZCBmdW5jdGlvbiByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGlubmVyIFNlbGVjdCBjb21wb25lbnRcblx0XHQvLyBUaGlzIGNvbXBvbmVudCBjYW4gYmUgdXNlZCB0byBjb21wb3NlIEhPQ3MgKGVnIENyZWF0YWJsZSBhbmQgQXN5bmMpXG5cdFx0Ly8gKHByb3BzOiBPYmplY3QpOiBQcm9wVHlwZXMuZWxlbWVudFxuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuXHRcdC8vIFNlZSBTZWxlY3QucHJvcFR5cGVzLmZpbHRlck9wdGlvbnNcblx0XHRmaWx0ZXJPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYW55LFxuXG5cdFx0Ly8gU2VhcmNoZXMgZm9yIGFueSBtYXRjaGluZyBvcHRpb24gd2l0aGluIHRoZSBzZXQgb2Ygb3B0aW9ucy5cblx0XHQvLyBUaGlzIGZ1bmN0aW9uIHByZXZlbnRzIGR1cGxpY2F0ZSBvcHRpb25zIGZyb20gYmVpbmcgY3JlYXRlZC5cblx0XHQvLyAoeyBvcHRpb246IE9iamVjdCwgb3B0aW9uczogQXJyYXksIGxhYmVsS2V5OiBzdHJpbmcsIHZhbHVlS2V5OiBzdHJpbmcgfSk6IGJvb2xlYW5cblx0XHRpc09wdGlvblVuaXF1ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvLyBEZXRlcm1pbmVzIGlmIHRoZSBjdXJyZW50IGlucHV0IHRleHQgcmVwcmVzZW50cyBhIHZhbGlkIG9wdGlvbi5cbiAgICAvLyAoeyBsYWJlbDogc3RyaW5nIH0pOiBib29sZWFuXG4gICAgaXNWYWxpZE5ld09wdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cblx0XHQvLyBTZWUgU2VsZWN0LnByb3BUeXBlcy5tZW51UmVuZGVyZXJcblx0XHRtZW51UmVuZGVyZXI6IFJlYWN0LlByb3BUeXBlcy5hbnksXG5cbiAgICAvLyBGYWN0b3J5IHRvIGNyZWF0ZSBuZXcgb3B0aW9uLlxuICAgIC8vICh7IGxhYmVsOiBzdHJpbmcsIGxhYmVsS2V5OiBzdHJpbmcsIHZhbHVlS2V5OiBzdHJpbmcgfSk6IE9iamVjdFxuXHRcdG5ld09wdGlvbkNyZWF0b3I6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gaW5wdXQgY2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChpbnB1dFZhbHVlKSB7fVxuXHRcdG9uSW5wdXRDaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gaW5wdXQga2V5RG93biBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdFx0b25JbnB1dEtleURvd246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gbmV3IG9wdGlvbiBjbGljayBoYW5kbGVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxuXHRcdG9uTmV3T3B0aW9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gU2VlIFNlbGVjdC5wcm9wVHlwZXMub3B0aW9uc1xuXHRcdG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcblxuICAgIC8vIENyZWF0ZXMgcHJvbXB0L3BsYWNlaG9sZGVyIG9wdGlvbiB0ZXh0LlxuICAgIC8vIChmaWx0ZXJUZXh0OiBzdHJpbmcpOiBzdHJpbmdcblx0XHRwcm9tcHRUZXh0Q3JlYXRvcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cblx0XHQvLyBEZWNpZGVzIGlmIGEga2V5RG93biBldmVudCAoZWcgaXRzIGBrZXlDb2RlYCkgc2hvdWxkIHJlc3VsdCBpbiB0aGUgY3JlYXRpb24gb2YgYSBuZXcgb3B0aW9uLlxuXHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdH0sXG5cblx0Ly8gRGVmYXVsdCBwcm9wIG1ldGhvZHNcblx0c3RhdGljczoge1xuXHRcdGlzT3B0aW9uVW5pcXVlLFxuXHRcdGlzVmFsaWROZXdPcHRpb24sXG5cdFx0bmV3T3B0aW9uQ3JlYXRvcixcblx0XHRwcm9tcHRUZXh0Q3JlYXRvcixcblx0XHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb25cblx0fSxcblxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRmaWx0ZXJPcHRpb25zOiBkZWZhdWx0RmlsdGVyT3B0aW9ucyxcblx0XHRcdGlzT3B0aW9uVW5pcXVlLFxuXHRcdFx0aXNWYWxpZE5ld09wdGlvbixcblx0XHRcdG1lbnVSZW5kZXJlcjogZGVmYXVsdE1lbnVSZW5kZXJlcixcblx0XHRcdG5ld09wdGlvbkNyZWF0b3IsXG5cdFx0XHRwcm9tcHRUZXh0Q3JlYXRvcixcblx0XHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbixcblx0XHR9O1xuXHR9LFxuXG5cdGNyZWF0ZU5ld09wdGlvbiAoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0aXNWYWxpZE5ld09wdGlvbixcblx0XHRcdG5ld09wdGlvbkNyZWF0b3IsXG5cdFx0XHRvbk5ld09wdGlvbkNsaWNrLFxuXHRcdFx0b3B0aW9ucyA9IFtdLFxuXHRcdFx0c2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAoaXNWYWxpZE5ld09wdGlvbih7IGxhYmVsOiB0aGlzLmlucHV0VmFsdWUgfSkpIHtcblx0XHRcdGNvbnN0IG9wdGlvbiA9IG5ld09wdGlvbkNyZWF0b3IoeyBsYWJlbDogdGhpcy5pbnB1dFZhbHVlLCBsYWJlbEtleTogdGhpcy5sYWJlbEtleSwgdmFsdWVLZXk6IHRoaXMudmFsdWVLZXkgfSk7XG5cdFx0XHRjb25zdCBpc09wdGlvblVuaXF1ZSA9IHRoaXMuaXNPcHRpb25VbmlxdWUoeyBvcHRpb24gfSk7XG5cblx0XHRcdC8vIERvbid0IGFkZCB0aGUgc2FtZSBvcHRpb24gdHdpY2UuXG5cdFx0XHRpZiAoaXNPcHRpb25VbmlxdWUpIHtcblx0XHRcdFx0aWYgKG9uTmV3T3B0aW9uQ2xpY2spIHtcblx0XHRcdFx0XHRvbk5ld09wdGlvbkNsaWNrKG9wdGlvbik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0b3B0aW9ucy51bnNoaWZ0KG9wdGlvbik7XG5cblx0XHRcdFx0XHR0aGlzLnNlbGVjdC5zZWxlY3RWYWx1ZShvcHRpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGZpbHRlck9wdGlvbnMgKC4uLnBhcmFtcykge1xuXHRcdGNvbnN0IHsgZmlsdGVyT3B0aW9ucywgaXNWYWxpZE5ld09wdGlvbiwgb3B0aW9ucywgcHJvbXB0VGV4dENyZWF0b3IgfSA9IHRoaXMucHJvcHM7XG5cblx0XHQvLyBUUklDS1kgQ2hlY2sgY3VycmVudGx5IHNlbGVjdGVkIG9wdGlvbnMgYXMgd2VsbC5cblx0XHQvLyBEb24ndCBkaXNwbGF5IGEgY3JlYXRlLXByb21wdCBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2VsZWN0ZWQuXG5cdFx0Ly8gVGhpcyBjb3ZlcnMgYXN5bmMgZWRnZS1jYXNlcyB3aGVyZSBhIG5ld2x5LWNyZWF0ZWQgT3B0aW9uIGlzbid0IHlldCBpbiB0aGUgYXN5bmMtbG9hZGVkIGFycmF5LlxuXHRcdGNvbnN0IGV4Y2x1ZGVPcHRpb25zID0gcGFyYW1zWzJdIHx8IFtdO1xuXG5cdFx0Y29uc3QgZmlsdGVyZWRPcHRpb25zID0gZmlsdGVyT3B0aW9ucyguLi5wYXJhbXMpIHx8IFtdO1xuXG5cdFx0aWYgKGlzVmFsaWROZXdPcHRpb24oeyBsYWJlbDogdGhpcy5pbnB1dFZhbHVlIH0pKSB7XG5cdFx0XHRjb25zdCB7IG5ld09wdGlvbkNyZWF0b3IgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRcdGNvbnN0IG9wdGlvbiA9IG5ld09wdGlvbkNyZWF0b3Ioe1xuXHRcdFx0XHRsYWJlbDogdGhpcy5pbnB1dFZhbHVlLFxuXHRcdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcblx0XHRcdFx0dmFsdWVLZXk6IHRoaXMudmFsdWVLZXlcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBUUklDS1kgQ29tcGFyZSB0byBhbGwgb3B0aW9ucyAobm90IGp1c3QgZmlsdGVyZWQgb3B0aW9ucykgaW4gY2FzZSBvcHRpb24gaGFzIGFscmVhZHkgYmVlbiBzZWxlY3RlZCkuXG5cdFx0XHQvLyBGb3IgbXVsdGktc2VsZWN0cywgdGhpcyB3b3VsZCByZW1vdmUgaXQgZnJvbSB0aGUgZmlsdGVyZWQgbGlzdC5cblx0XHRcdGNvbnN0IGlzT3B0aW9uVW5pcXVlID0gdGhpcy5pc09wdGlvblVuaXF1ZSh7XG5cdFx0XHRcdG9wdGlvbixcblx0XHRcdFx0b3B0aW9uczogZXhjbHVkZU9wdGlvbnMuY29uY2F0KGZpbHRlcmVkT3B0aW9ucylcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoaXNPcHRpb25VbmlxdWUpIHtcblx0XHRcdFx0Y29uc3QgcHJvbXB0ID0gcHJvbXB0VGV4dENyZWF0b3IodGhpcy5pbnB1dFZhbHVlKTtcblxuXHRcdFx0XHR0aGlzLl9jcmVhdGVQbGFjZWhvbGRlck9wdGlvbiA9IG5ld09wdGlvbkNyZWF0b3Ioe1xuXHRcdFx0XHRcdGxhYmVsOiBwcm9tcHQsXG5cdFx0XHRcdFx0bGFiZWxLZXk6IHRoaXMubGFiZWxLZXksXG5cdFx0XHRcdFx0dmFsdWVLZXk6IHRoaXMudmFsdWVLZXlcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0ZmlsdGVyZWRPcHRpb25zLnVuc2hpZnQodGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmaWx0ZXJlZE9wdGlvbnM7XG5cdH0sXG5cblx0aXNPcHRpb25VbmlxdWUgKHtcblx0XHRvcHRpb24sXG5cdFx0b3B0aW9uc1xuXHR9KSB7XG5cdFx0Y29uc3QgeyBpc09wdGlvblVuaXF1ZSB9ID0gdGhpcy5wcm9wcztcblxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHRoaXMuc2VsZWN0LmZpbHRlck9wdGlvbnMoKTtcblxuXHRcdHJldHVybiBpc09wdGlvblVuaXF1ZSh7XG5cdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcblx0XHRcdG9wdGlvbixcblx0XHRcdG9wdGlvbnMsXG5cdFx0XHR2YWx1ZUtleTogdGhpcy52YWx1ZUtleVxuXHRcdH0pO1xuXHR9LFxuXG5cdG1lbnVSZW5kZXJlciAocGFyYW1zKSB7XG5cdFx0Y29uc3QgeyBtZW51UmVuZGVyZXIgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRyZXR1cm4gbWVudVJlbmRlcmVyKHtcblx0XHRcdC4uLnBhcmFtcyxcblx0XHRcdG9uU2VsZWN0OiB0aGlzLm9uT3B0aW9uU2VsZWN0LFxuXHRcdFx0c2VsZWN0VmFsdWU6IHRoaXMub25PcHRpb25TZWxlY3Rcblx0XHR9KTtcblx0fSxcblxuXHRvbklucHV0Q2hhbmdlIChpbnB1dCkge1xuXHRcdGNvbnN0IHsgb25JbnB1dENoYW5nZSB9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmIChvbklucHV0Q2hhbmdlKSB7XG5cdFx0XHRvbklucHV0Q2hhbmdlKGlucHV0KTtcblx0XHR9XG5cblx0XHQvLyBUaGlzIHZhbHVlIG1heSBiZSBuZWVkZWQgaW4gYmV0d2VlbiBTZWxlY3QgbW91bnRzICh3aGVuIHRoaXMuc2VsZWN0IGlzIG51bGwpXG5cdFx0dGhpcy5pbnB1dFZhbHVlID0gaW5wdXQ7XG5cdH0sXG5cblx0b25JbnB1dEtleURvd24gKGV2ZW50KSB7XG5cdFx0Y29uc3QgeyBzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24sIG9uSW5wdXRLZXlEb3duIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IGZvY3VzZWRPcHRpb24gPSB0aGlzLnNlbGVjdC5nZXRGb2N1c2VkT3B0aW9uKCk7XG5cblx0XHRpZiAoXG5cdFx0XHRmb2N1c2VkT3B0aW9uICYmXG5cdFx0XHRmb2N1c2VkT3B0aW9uID09PSB0aGlzLl9jcmVhdGVQbGFjZWhvbGRlck9wdGlvbiAmJlxuXHRcdFx0c2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uKHsga2V5Q29kZTogZXZlbnQua2V5Q29kZSB9KVxuXHRcdCkge1xuXHRcdFx0dGhpcy5jcmVhdGVOZXdPcHRpb24oKTtcblxuXHRcdFx0Ly8gUHJldmVudCBkZWNvcmF0ZWQgU2VsZWN0IGZyb20gZG9pbmcgYW55dGhpbmcgYWRkaXRpb25hbCB3aXRoIHRoaXMga2V5RG93biBldmVudFxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9IGVsc2UgaWYgKG9uSW5wdXRLZXlEb3duKSB7XG5cdFx0XHRvbklucHV0S2V5RG93bihldmVudCk7XG5cdFx0fVxuXHR9LFxuXG5cdG9uT3B0aW9uU2VsZWN0IChvcHRpb24sIGV2ZW50KSB7XG5cdFx0aWYgKG9wdGlvbiA9PT0gdGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24pIHtcblx0XHRcdHRoaXMuY3JlYXRlTmV3T3B0aW9uKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2VsZWN0LnNlbGVjdFZhbHVlKG9wdGlvbik7XG5cdFx0fVxuXHR9LFxuXG5cdHJlbmRlciAoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0Y2hpbGRyZW4gPSBkZWZhdWx0Q2hpbGRyZW4sXG5cdFx0XHRuZXdPcHRpb25DcmVhdG9yLFxuXHRcdFx0c2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uLFxuXHRcdFx0Li4ucmVzdFByb3BzXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cblx0XHRjb25zdCBwcm9wcyA9IHtcblx0XHRcdC4uLnJlc3RQcm9wcyxcblx0XHRcdGFsbG93Q3JlYXRlOiB0cnVlLFxuXHRcdFx0ZmlsdGVyT3B0aW9uczogdGhpcy5maWx0ZXJPcHRpb25zLFxuXHRcdFx0bWVudVJlbmRlcmVyOiB0aGlzLm1lbnVSZW5kZXJlcixcblx0XHRcdG9uSW5wdXRDaGFuZ2U6IHRoaXMub25JbnB1dENoYW5nZSxcblx0XHRcdG9uSW5wdXRLZXlEb3duOiB0aGlzLm9uSW5wdXRLZXlEb3duLFxuXHRcdFx0cmVmOiAocmVmKSA9PiB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ID0gcmVmO1xuXG5cdFx0XHRcdC8vIFRoZXNlIHZhbHVlcyBtYXkgYmUgbmVlZGVkIGluIGJldHdlZW4gU2VsZWN0IG1vdW50cyAod2hlbiB0aGlzLnNlbGVjdCBpcyBudWxsKVxuXHRcdFx0XHRpZiAocmVmKSB7XG5cdFx0XHRcdFx0dGhpcy5sYWJlbEtleSA9IHJlZi5wcm9wcy5sYWJlbEtleTtcblx0XHRcdFx0XHR0aGlzLnZhbHVlS2V5ID0gcmVmLnByb3BzLnZhbHVlS2V5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBjaGlsZHJlbihwcm9wcyk7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBkZWZhdWx0Q2hpbGRyZW4gKHByb3BzKSB7XG5cdHJldHVybiAoXG5cdFx0PFNlbGVjdCB7Li4ucHJvcHN9IC8+XG5cdCk7XG59O1xuXG5mdW5jdGlvbiBpc09wdGlvblVuaXF1ZSAoeyBvcHRpb24sIG9wdGlvbnMsIGxhYmVsS2V5LCB2YWx1ZUtleSB9KSB7XG5cdHJldHVybiBvcHRpb25zXG5cdFx0LmZpbHRlcigoZXhpc3RpbmdPcHRpb24pID0+XG5cdFx0XHRleGlzdGluZ09wdGlvbltsYWJlbEtleV0gPT09IG9wdGlvbltsYWJlbEtleV0gfHxcblx0XHRcdGV4aXN0aW5nT3B0aW9uW3ZhbHVlS2V5XSA9PT0gb3B0aW9uW3ZhbHVlS2V5XVxuXHRcdClcblx0XHQubGVuZ3RoID09PSAwO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZE5ld09wdGlvbiAoeyBsYWJlbCB9KSB7XG5cdHJldHVybiAhIWxhYmVsO1xufTtcblxuZnVuY3Rpb24gbmV3T3B0aW9uQ3JlYXRvciAoeyBsYWJlbCwgbGFiZWxLZXksIHZhbHVlS2V5IH0pIHtcblx0Y29uc3Qgb3B0aW9uID0ge307XG5cdG9wdGlvblt2YWx1ZUtleV0gPSBsYWJlbDtcbiBcdG9wdGlvbltsYWJlbEtleV0gPSBsYWJlbDtcbiBcdG9wdGlvbi5jbGFzc05hbWUgPSAnU2VsZWN0LWNyZWF0ZS1vcHRpb24tcGxhY2Vob2xkZXInO1xuIFx0cmV0dXJuIG9wdGlvbjtcbn07XG5cbmZ1bmN0aW9uIHByb21wdFRleHRDcmVhdG9yIChsYWJlbCkge1xuXHRyZXR1cm4gYENyZWF0ZSBvcHRpb24gXCIke2xhYmVsfVwiYDtcbn1cblxuZnVuY3Rpb24gc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uICh7IGtleUNvZGUgfSkge1xuXHRzd2l0Y2ggKGtleUNvZGUpIHtcblx0XHRjYXNlIDk6ICAgLy8gVEFCXG5cdFx0Y2FzZSAxMzogIC8vIEVOVEVSXG5cdFx0Y2FzZSAxODg6IC8vIENPTU1BXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ3JlYXRhYmxlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBPcHRpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAgIC8vIGNsYXNzTmFtZSAoYmFzZWQgb24gbW91c2UgcG9zaXRpb24pXG5cdFx0aW5zdGFuY2VQcmVmaXg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCwgIC8vIHVuaXF1ZSBwcmVmaXggZm9yIHRoZSBpZHMgKHVzZWQgZm9yIGFyaWEpXG5cdFx0aXNEaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIGRpc2FibGVkXG5cdFx0aXNGb2N1c2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIGZvY3VzZWRcblx0XHRpc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgIC8vIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWRcblx0XHRvbkZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgbW91c2VFbnRlciBvbiBvcHRpb24gZWxlbWVudFxuXHRcdG9uU2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBjbGljayBvbiBvcHRpb24gZWxlbWVudFxuXHRcdG9uVW5mb2N1czogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBtb3VzZUxlYXZlIG9uIG9wdGlvbiBlbGVtZW50XG5cdFx0b3B0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsICAgICAvLyBvYmplY3QgdGhhdCBpcyBiYXNlIGZvciB0aGF0IG9wdGlvblxuXHRcdG9wdGlvbkluZGV4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCAgICAgICAgICAgLy8gaW5kZXggb2YgdGhlIG9wdGlvbiwgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRzIGZvciBhcmlhXG5cdH0sXG5cdGJsb2NrRXZlbnQgKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRpZiAoKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQScpIHx8ICEoJ2hyZWYnIGluIGV2ZW50LnRhcmdldCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGV2ZW50LnRhcmdldC50YXJnZXQpIHtcblx0XHRcdHdpbmRvdy5vcGVuKGV2ZW50LnRhcmdldC5ocmVmLCBldmVudC50YXJnZXQudGFyZ2V0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBldmVudC50YXJnZXQuaHJlZjtcblx0XHR9XG5cdH0sXG5cblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0dGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZU1vdXNlRW50ZXIgKGV2ZW50KSB7XG5cdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVNb3VzZU1vdmUgKGV2ZW50KSB7XG5cdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaEVuZChldmVudCl7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZih0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHR0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCk7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hNb3ZlIChldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hTdGFydCAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cdH0sXG5cblx0b25Gb2N1cyAoZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNGb2N1c2VkKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uRm9jdXModGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIHsgb3B0aW9uLCBpbnN0YW5jZVByZWZpeCwgb3B0aW9uSW5kZXggfSA9IHRoaXMucHJvcHM7XG5cdFx0dmFyIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXModGhpcy5wcm9wcy5jbGFzc05hbWUsIG9wdGlvbi5jbGFzc05hbWUpO1xuXG5cdFx0cmV0dXJuIG9wdGlvbi5kaXNhYmxlZCA/IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmJsb2NrRXZlbnR9XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuYmxvY2tFdmVudH0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9kaXY+XG5cdFx0KSA6IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdHN0eWxlPXtvcHRpb24uc3R5bGV9XG5cdFx0XHRcdHJvbGU9XCJvcHRpb25cIlxuXHRcdFx0XHQgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn1cblx0XHRcdFx0b25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfVxuXHRcdFx0XHRvblRvdWNoU3RhcnQ9e3RoaXMuaGFuZGxlVG91Y2hTdGFydH1cblx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxuXHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kfVxuXHRcdFx0XHRpZD17aW5zdGFuY2VQcmVmaXggKyAnLW9wdGlvbi0nICsgb3B0aW9uSW5kZXh9XG5cdFx0XHRcdHRpdGxlPXtvcHRpb24udGl0bGV9PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9wdGlvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY29uc3QgVmFsdWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0ZGlzcGxheU5hbWU6ICdWYWx1ZScsXG5cblx0cHJvcFR5cGVzOiB7XG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuXHRcdGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAvLyBkaXNhYmxlZCBwcm9wIHBhc3NlZCB0byBSZWFjdFNlbGVjdFxuXHRcdGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgICAgICAgICAvLyBVbmlxdWUgaWQgZm9yIHRoZSB2YWx1ZSAtIHVzZWQgZm9yIGFyaWFcblx0XHRvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBjbGljayBvbiB2YWx1ZSBsYWJlbFxuXHRcdG9uUmVtb3ZlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAvLyBtZXRob2QgdG8gaGFuZGxlIHJlbW92YWwgb2YgdGhlIHZhbHVlXG5cdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgICAgIC8vIHRoZSBvcHRpb24gb2JqZWN0IGZvciB0aGlzIHZhbHVlXG5cdH0sXG5cblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xuXHRcdGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKHRoaXMucHJvcHMub25DbGljaykge1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy52YWx1ZSwgZXZlbnQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAodGhpcy5wcm9wcy52YWx1ZS5ocmVmKSB7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdH0sXG5cblx0b25SZW1vdmUgKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR0aGlzLnByb3BzLm9uUmVtb3ZlKHRoaXMucHJvcHMudmFsdWUpO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoRW5kUmVtb3ZlIChldmVudCl7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZih0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHQvLyBGaXJlIHRoZSBtb3VzZSBldmVudHNcblx0XHR0aGlzLm9uUmVtb3ZlKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaE1vdmUgKGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaFN0YXJ0IChldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBub3QgYmVpbmcgZHJhZ2dlZFxuXHRcdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblx0fSxcblxuXHRyZW5kZXJSZW1vdmVJY29uICgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAhdGhpcy5wcm9wcy5vblJlbW92ZSkgcmV0dXJuO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtdmFsdWUtaWNvblwiXG5cdFx0XHRcdGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG5cdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLm9uUmVtb3ZlfVxuXHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kUmVtb3ZlfVxuXHRcdFx0XHRvblRvdWNoU3RhcnQ9e3RoaXMuaGFuZGxlVG91Y2hTdGFydH1cblx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfT5cblx0XHRcdFx0JnRpbWVzO1xuXHRcdFx0PC9zcGFuPlxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyTGFiZWwgKCkge1xuXHRcdGxldCBjbGFzc05hbWUgPSAnU2VsZWN0LXZhbHVlLWxhYmVsJztcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrIHx8IHRoaXMucHJvcHMudmFsdWUuaHJlZiA/IChcblx0XHRcdDxhIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBocmVmPXt0aGlzLnByb3BzLnZhbHVlLmhyZWZ9IHRhcmdldD17dGhpcy5wcm9wcy52YWx1ZS50YXJnZXR9IG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn0gb25Ub3VjaEVuZD17dGhpcy5oYW5kbGVNb3VzZURvd259PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdDwvYT5cblx0XHQpIDogKFxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHJvbGU9XCJvcHRpb25cIiBhcmlhLXNlbGVjdGVkPVwidHJ1ZVwiIGlkPXt0aGlzLnByb3BzLmlkfT5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHQ8L3NwYW4+XG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnU2VsZWN0LXZhbHVlJywgdGhpcy5wcm9wcy52YWx1ZS5jbGFzc05hbWUpfVxuXHRcdFx0XHRzdHlsZT17dGhpcy5wcm9wcy52YWx1ZS5zdHlsZX1cblx0XHRcdFx0dGl0bGU9e3RoaXMucHJvcHMudmFsdWUudGl0bGV9XG5cdFx0XHRcdD5cblx0XHRcdFx0e3RoaXMucmVuZGVyUmVtb3ZlSWNvbigpfVxuXHRcdFx0XHR7dGhpcy5yZW5kZXJMYWJlbCgpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWYWx1ZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFycm93UmVuZGVyZXIgKHsgb25Nb3VzZURvd24gfSkge1xuXHRyZXR1cm4gKFxuXHRcdDxzcGFuXG5cdFx0XHRjbGFzc05hbWU9XCJTZWxlY3QtYXJyb3dcIlxuXHRcdFx0b25Nb3VzZURvd249e29uTW91c2VEb3dufVxuXHRcdC8+XG5cdCk7XG59O1xuIiwiaW1wb3J0IHN0cmlwRGlhY3JpdGljcyBmcm9tICcuL3N0cmlwRGlhY3JpdGljcyc7XG5cbmZ1bmN0aW9uIGZpbHRlck9wdGlvbnMgKG9wdGlvbnMsIGZpbHRlclZhbHVlLCBleGNsdWRlT3B0aW9ucywgcHJvcHMpIHtcblx0aWYgKHByb3BzLmlnbm9yZUFjY2VudHMpIHtcblx0XHRmaWx0ZXJWYWx1ZSA9IHN0cmlwRGlhY3JpdGljcyhmaWx0ZXJWYWx1ZSk7XG5cdH1cblxuXHRpZiAocHJvcHMuaWdub3JlQ2FzZSkge1xuXHRcdGZpbHRlclZhbHVlID0gZmlsdGVyVmFsdWUudG9Mb3dlckNhc2UoKTtcblx0fVxuXG5cdGlmIChleGNsdWRlT3B0aW9ucykgZXhjbHVkZU9wdGlvbnMgPSBleGNsdWRlT3B0aW9ucy5tYXAoaSA9PiBpW3Byb3BzLnZhbHVlS2V5XSk7XG5cblx0cmV0dXJuIG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG5cdFx0aWYgKGV4Y2x1ZGVPcHRpb25zICYmIGV4Y2x1ZGVPcHRpb25zLmluZGV4T2Yob3B0aW9uW3Byb3BzLnZhbHVlS2V5XSkgPiAtMSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmIChwcm9wcy5maWx0ZXJPcHRpb24pIHJldHVybiBwcm9wcy5maWx0ZXJPcHRpb24uY2FsbCh0aGlzLCBvcHRpb24sIGZpbHRlclZhbHVlKTtcblx0XHRpZiAoIWZpbHRlclZhbHVlKSByZXR1cm4gdHJ1ZTtcblx0XHR2YXIgdmFsdWVUZXN0ID0gU3RyaW5nKG9wdGlvbltwcm9wcy52YWx1ZUtleV0pO1xuXHRcdHZhciBsYWJlbFRlc3QgPSBTdHJpbmcob3B0aW9uW3Byb3BzLmxhYmVsS2V5XSk7XG5cdFx0aWYgKHByb3BzLmlnbm9yZUFjY2VudHMpIHtcblx0XHRcdGlmIChwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcpIHZhbHVlVGVzdCA9IHN0cmlwRGlhY3JpdGljcyh2YWx1ZVRlc3QpO1xuXHRcdFx0aWYgKHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJykgbGFiZWxUZXN0ID0gc3RyaXBEaWFjcml0aWNzKGxhYmVsVGVzdCk7XG5cdFx0fVxuXHRcdGlmIChwcm9wcy5pZ25vcmVDYXNlKSB7XG5cdFx0XHRpZiAocHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnKSB2YWx1ZVRlc3QgPSB2YWx1ZVRlc3QudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmIChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScpIGxhYmVsVGVzdCA9IGxhYmVsVGVzdC50b0xvd2VyQ2FzZSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gcHJvcHMubWF0Y2hQb3MgPT09ICdzdGFydCcgPyAoXG5cdFx0XHQocHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnICYmIHZhbHVlVGVzdC5zdWJzdHIoMCwgZmlsdGVyVmFsdWUubGVuZ3RoKSA9PT0gZmlsdGVyVmFsdWUpIHx8XG5cdFx0XHQocHJvcHMubWF0Y2hQcm9wICE9PSAndmFsdWUnICYmIGxhYmVsVGVzdC5zdWJzdHIoMCwgZmlsdGVyVmFsdWUubGVuZ3RoKSA9PT0gZmlsdGVyVmFsdWUpXG5cdFx0KSA6IChcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcgJiYgdmFsdWVUZXN0LmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDApIHx8XG5cdFx0XHQocHJvcHMubWF0Y2hQcm9wICE9PSAndmFsdWUnICYmIGxhYmVsVGVzdC5pbmRleE9mKGZpbHRlclZhbHVlKSA+PSAwKVxuXHRcdCk7XG5cdH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbHRlck9wdGlvbnM7XG4iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIG1lbnVSZW5kZXJlciAoe1xuXHRmb2N1c2VkT3B0aW9uLFxuXHRpbnN0YW5jZVByZWZpeCxcblx0bGFiZWxLZXksXG5cdG9uRm9jdXMsXG5cdG9uU2VsZWN0LFxuXHRvcHRpb25DbGFzc05hbWUsXG5cdG9wdGlvbkNvbXBvbmVudCxcblx0b3B0aW9uUmVuZGVyZXIsXG5cdG9wdGlvbnMsXG5cdHZhbHVlQXJyYXksXG5cdHZhbHVlS2V5LFxuXHRvbk9wdGlvblJlZlxufSkge1xuXHRsZXQgT3B0aW9uID0gb3B0aW9uQ29tcG9uZW50O1xuXG5cdHJldHVybiBvcHRpb25zLm1hcCgob3B0aW9uLCBpKSA9PiB7XG5cdFx0bGV0IGlzU2VsZWN0ZWQgPSB2YWx1ZUFycmF5ICYmIHZhbHVlQXJyYXkuaW5kZXhPZihvcHRpb24pID4gLTE7XG5cdFx0bGV0IGlzRm9jdXNlZCA9IG9wdGlvbiA9PT0gZm9jdXNlZE9wdGlvbjtcblx0XHRsZXQgb3B0aW9uQ2xhc3MgPSBjbGFzc05hbWVzKG9wdGlvbkNsYXNzTmFtZSwge1xuXHRcdFx0J1NlbGVjdC1vcHRpb24nOiB0cnVlLFxuXHRcdFx0J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCxcblx0XHRcdCdpcy1mb2N1c2VkJzogaXNGb2N1c2VkLFxuXHRcdFx0J2lzLWRpc2FibGVkJzogb3B0aW9uLmRpc2FibGVkLFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxPcHRpb25cblx0XHRcdFx0Y2xhc3NOYW1lPXtvcHRpb25DbGFzc31cblx0XHRcdFx0aW5zdGFuY2VQcmVmaXg9e2luc3RhbmNlUHJlZml4fVxuXHRcdFx0XHRpc0Rpc2FibGVkPXtvcHRpb24uZGlzYWJsZWR9XG5cdFx0XHRcdGlzRm9jdXNlZD17aXNGb2N1c2VkfVxuXHRcdFx0XHRpc1NlbGVjdGVkPXtpc1NlbGVjdGVkfVxuXHRcdFx0XHRrZXk9e2BvcHRpb24tJHtpfS0ke29wdGlvblt2YWx1ZUtleV19YH1cblx0XHRcdFx0b25Gb2N1cz17b25Gb2N1c31cblx0XHRcdFx0b25TZWxlY3Q9e29uU2VsZWN0fVxuXHRcdFx0XHRvcHRpb249e29wdGlvbn1cblx0XHRcdFx0b3B0aW9uSW5kZXg9e2l9XG5cdFx0XHRcdHJlZj17cmVmID0+IHsgb25PcHRpb25SZWYocmVmLCBpc0ZvY3VzZWQpOyB9fVxuXHRcdFx0PlxuXHRcdFx0XHR7b3B0aW9uUmVuZGVyZXIob3B0aW9uLCBpKX1cblx0XHRcdDwvT3B0aW9uPlxuXHRcdCk7XG5cdH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbnVSZW5kZXJlcjtcbiIsInZhciBtYXAgPSBbXG5cdHsgJ2Jhc2UnOidBJywgJ2xldHRlcnMnOi9bXFx1MDA0MVxcdTI0QjZcXHVGRjIxXFx1MDBDMFxcdTAwQzFcXHUwMEMyXFx1MUVBNlxcdTFFQTRcXHUxRUFBXFx1MUVBOFxcdTAwQzNcXHUwMTAwXFx1MDEwMlxcdTFFQjBcXHUxRUFFXFx1MUVCNFxcdTFFQjJcXHUwMjI2XFx1MDFFMFxcdTAwQzRcXHUwMURFXFx1MUVBMlxcdTAwQzVcXHUwMUZBXFx1MDFDRFxcdTAyMDBcXHUwMjAyXFx1MUVBMFxcdTFFQUNcXHUxRUI2XFx1MUUwMFxcdTAxMDRcXHUwMjNBXFx1MkM2Rl0vZyB9LFxuXHR7ICdiYXNlJzonQUEnLCdsZXR0ZXJzJzovW1xcdUE3MzJdL2cgfSxcblx0eyAnYmFzZSc6J0FFJywnbGV0dGVycyc6L1tcXHUwMEM2XFx1MDFGQ1xcdTAxRTJdL2cgfSxcblx0eyAnYmFzZSc6J0FPJywnbGV0dGVycyc6L1tcXHVBNzM0XS9nIH0sXG5cdHsgJ2Jhc2UnOidBVScsJ2xldHRlcnMnOi9bXFx1QTczNl0vZyB9LFxuXHR7ICdiYXNlJzonQVYnLCdsZXR0ZXJzJzovW1xcdUE3MzhcXHVBNzNBXS9nIH0sXG5cdHsgJ2Jhc2UnOidBWScsJ2xldHRlcnMnOi9bXFx1QTczQ10vZyB9LFxuXHR7ICdiYXNlJzonQicsICdsZXR0ZXJzJzovW1xcdTAwNDJcXHUyNEI3XFx1RkYyMlxcdTFFMDJcXHUxRTA0XFx1MUUwNlxcdTAyNDNcXHUwMTgyXFx1MDE4MV0vZyB9LFxuXHR7ICdiYXNlJzonQycsICdsZXR0ZXJzJzovW1xcdTAwNDNcXHUyNEI4XFx1RkYyM1xcdTAxMDZcXHUwMTA4XFx1MDEwQVxcdTAxMENcXHUwMEM3XFx1MUUwOFxcdTAxODdcXHUwMjNCXFx1QTczRV0vZyB9LFxuXHR7ICdiYXNlJzonRCcsICdsZXR0ZXJzJzovW1xcdTAwNDRcXHUyNEI5XFx1RkYyNFxcdTFFMEFcXHUwMTBFXFx1MUUwQ1xcdTFFMTBcXHUxRTEyXFx1MUUwRVxcdTAxMTBcXHUwMThCXFx1MDE4QVxcdTAxODlcXHVBNzc5XS9nIH0sXG5cdHsgJ2Jhc2UnOidEWicsJ2xldHRlcnMnOi9bXFx1MDFGMVxcdTAxQzRdL2cgfSxcblx0eyAnYmFzZSc6J0R6JywnbGV0dGVycyc6L1tcXHUwMUYyXFx1MDFDNV0vZyB9LFxuXHR7ICdiYXNlJzonRScsICdsZXR0ZXJzJzovW1xcdTAwNDVcXHUyNEJBXFx1RkYyNVxcdTAwQzhcXHUwMEM5XFx1MDBDQVxcdTFFQzBcXHUxRUJFXFx1MUVDNFxcdTFFQzJcXHUxRUJDXFx1MDExMlxcdTFFMTRcXHUxRTE2XFx1MDExNFxcdTAxMTZcXHUwMENCXFx1MUVCQVxcdTAxMUFcXHUwMjA0XFx1MDIwNlxcdTFFQjhcXHUxRUM2XFx1MDIyOFxcdTFFMUNcXHUwMTE4XFx1MUUxOFxcdTFFMUFcXHUwMTkwXFx1MDE4RV0vZyB9LFxuXHR7ICdiYXNlJzonRicsICdsZXR0ZXJzJzovW1xcdTAwNDZcXHUyNEJCXFx1RkYyNlxcdTFFMUVcXHUwMTkxXFx1QTc3Ql0vZyB9LFxuXHR7ICdiYXNlJzonRycsICdsZXR0ZXJzJzovW1xcdTAwNDdcXHUyNEJDXFx1RkYyN1xcdTAxRjRcXHUwMTFDXFx1MUUyMFxcdTAxMUVcXHUwMTIwXFx1MDFFNlxcdTAxMjJcXHUwMUU0XFx1MDE5M1xcdUE3QTBcXHVBNzdEXFx1QTc3RV0vZyB9LFxuXHR7ICdiYXNlJzonSCcsICdsZXR0ZXJzJzovW1xcdTAwNDhcXHUyNEJEXFx1RkYyOFxcdTAxMjRcXHUxRTIyXFx1MUUyNlxcdTAyMUVcXHUxRTI0XFx1MUUyOFxcdTFFMkFcXHUwMTI2XFx1MkM2N1xcdTJDNzVcXHVBNzhEXS9nIH0sXG5cdHsgJ2Jhc2UnOidJJywgJ2xldHRlcnMnOi9bXFx1MDA0OVxcdTI0QkVcXHVGRjI5XFx1MDBDQ1xcdTAwQ0RcXHUwMENFXFx1MDEyOFxcdTAxMkFcXHUwMTJDXFx1MDEzMFxcdTAwQ0ZcXHUxRTJFXFx1MUVDOFxcdTAxQ0ZcXHUwMjA4XFx1MDIwQVxcdTFFQ0FcXHUwMTJFXFx1MUUyQ1xcdTAxOTddL2cgfSxcblx0eyAnYmFzZSc6J0onLCAnbGV0dGVycyc6L1tcXHUwMDRBXFx1MjRCRlxcdUZGMkFcXHUwMTM0XFx1MDI0OF0vZyB9LFxuXHR7ICdiYXNlJzonSycsICdsZXR0ZXJzJzovW1xcdTAwNEJcXHUyNEMwXFx1RkYyQlxcdTFFMzBcXHUwMUU4XFx1MUUzMlxcdTAxMzZcXHUxRTM0XFx1MDE5OFxcdTJDNjlcXHVBNzQwXFx1QTc0MlxcdUE3NDRcXHVBN0EyXS9nIH0sXG5cdHsgJ2Jhc2UnOidMJywgJ2xldHRlcnMnOi9bXFx1MDA0Q1xcdTI0QzFcXHVGRjJDXFx1MDEzRlxcdTAxMzlcXHUwMTNEXFx1MUUzNlxcdTFFMzhcXHUwMTNCXFx1MUUzQ1xcdTFFM0FcXHUwMTQxXFx1MDIzRFxcdTJDNjJcXHUyQzYwXFx1QTc0OFxcdUE3NDZcXHVBNzgwXS9nIH0sXG5cdHsgJ2Jhc2UnOidMSicsJ2xldHRlcnMnOi9bXFx1MDFDN10vZyB9LFxuXHR7ICdiYXNlJzonTGonLCdsZXR0ZXJzJzovW1xcdTAxQzhdL2cgfSxcblx0eyAnYmFzZSc6J00nLCAnbGV0dGVycyc6L1tcXHUwMDREXFx1MjRDMlxcdUZGMkRcXHUxRTNFXFx1MUU0MFxcdTFFNDJcXHUyQzZFXFx1MDE5Q10vZyB9LFxuXHR7ICdiYXNlJzonTicsICdsZXR0ZXJzJzovW1xcdTAwNEVcXHUyNEMzXFx1RkYyRVxcdTAxRjhcXHUwMTQzXFx1MDBEMVxcdTFFNDRcXHUwMTQ3XFx1MUU0NlxcdTAxNDVcXHUxRTRBXFx1MUU0OFxcdTAyMjBcXHUwMTlEXFx1QTc5MFxcdUE3QTRdL2cgfSxcblx0eyAnYmFzZSc6J05KJywnbGV0dGVycyc6L1tcXHUwMUNBXS9nIH0sXG5cdHsgJ2Jhc2UnOidOaicsJ2xldHRlcnMnOi9bXFx1MDFDQl0vZyB9LFxuXHR7ICdiYXNlJzonTycsICdsZXR0ZXJzJzovW1xcdTAwNEZcXHUyNEM0XFx1RkYyRlxcdTAwRDJcXHUwMEQzXFx1MDBENFxcdTFFRDJcXHUxRUQwXFx1MUVENlxcdTFFRDRcXHUwMEQ1XFx1MUU0Q1xcdTAyMkNcXHUxRTRFXFx1MDE0Q1xcdTFFNTBcXHUxRTUyXFx1MDE0RVxcdTAyMkVcXHUwMjMwXFx1MDBENlxcdTAyMkFcXHUxRUNFXFx1MDE1MFxcdTAxRDFcXHUwMjBDXFx1MDIwRVxcdTAxQTBcXHUxRURDXFx1MUVEQVxcdTFFRTBcXHUxRURFXFx1MUVFMlxcdTFFQ0NcXHUxRUQ4XFx1MDFFQVxcdTAxRUNcXHUwMEQ4XFx1MDFGRVxcdTAxODZcXHUwMTlGXFx1QTc0QVxcdUE3NENdL2cgfSxcblx0eyAnYmFzZSc6J09JJywnbGV0dGVycyc6L1tcXHUwMUEyXS9nIH0sXG5cdHsgJ2Jhc2UnOidPTycsJ2xldHRlcnMnOi9bXFx1QTc0RV0vZyB9LFxuXHR7ICdiYXNlJzonT1UnLCdsZXR0ZXJzJzovW1xcdTAyMjJdL2cgfSxcblx0eyAnYmFzZSc6J1AnLCAnbGV0dGVycyc6L1tcXHUwMDUwXFx1MjRDNVxcdUZGMzBcXHUxRTU0XFx1MUU1NlxcdTAxQTRcXHUyQzYzXFx1QTc1MFxcdUE3NTJcXHVBNzU0XS9nIH0sXG5cdHsgJ2Jhc2UnOidRJywgJ2xldHRlcnMnOi9bXFx1MDA1MVxcdTI0QzZcXHVGRjMxXFx1QTc1NlxcdUE3NThcXHUwMjRBXS9nIH0sXG5cdHsgJ2Jhc2UnOidSJywgJ2xldHRlcnMnOi9bXFx1MDA1MlxcdTI0QzdcXHVGRjMyXFx1MDE1NFxcdTFFNThcXHUwMTU4XFx1MDIxMFxcdTAyMTJcXHUxRTVBXFx1MUU1Q1xcdTAxNTZcXHUxRTVFXFx1MDI0Q1xcdTJDNjRcXHVBNzVBXFx1QTdBNlxcdUE3ODJdL2cgfSxcblx0eyAnYmFzZSc6J1MnLCAnbGV0dGVycyc6L1tcXHUwMDUzXFx1MjRDOFxcdUZGMzNcXHUxRTlFXFx1MDE1QVxcdTFFNjRcXHUwMTVDXFx1MUU2MFxcdTAxNjBcXHUxRTY2XFx1MUU2MlxcdTFFNjhcXHUwMjE4XFx1MDE1RVxcdTJDN0VcXHVBN0E4XFx1QTc4NF0vZyB9LFxuXHR7ICdiYXNlJzonVCcsICdsZXR0ZXJzJzovW1xcdTAwNTRcXHUyNEM5XFx1RkYzNFxcdTFFNkFcXHUwMTY0XFx1MUU2Q1xcdTAyMUFcXHUwMTYyXFx1MUU3MFxcdTFFNkVcXHUwMTY2XFx1MDFBQ1xcdTAxQUVcXHUwMjNFXFx1QTc4Nl0vZyB9LFxuXHR7ICdiYXNlJzonVFonLCdsZXR0ZXJzJzovW1xcdUE3MjhdL2cgfSxcblx0eyAnYmFzZSc6J1UnLCAnbGV0dGVycyc6L1tcXHUwMDU1XFx1MjRDQVxcdUZGMzVcXHUwMEQ5XFx1MDBEQVxcdTAwREJcXHUwMTY4XFx1MUU3OFxcdTAxNkFcXHUxRTdBXFx1MDE2Q1xcdTAwRENcXHUwMURCXFx1MDFEN1xcdTAxRDVcXHUwMUQ5XFx1MUVFNlxcdTAxNkVcXHUwMTcwXFx1MDFEM1xcdTAyMTRcXHUwMjE2XFx1MDFBRlxcdTFFRUFcXHUxRUU4XFx1MUVFRVxcdTFFRUNcXHUxRUYwXFx1MUVFNFxcdTFFNzJcXHUwMTcyXFx1MUU3NlxcdTFFNzRcXHUwMjQ0XS9nIH0sXG5cdHsgJ2Jhc2UnOidWJywgJ2xldHRlcnMnOi9bXFx1MDA1NlxcdTI0Q0JcXHVGRjM2XFx1MUU3Q1xcdTFFN0VcXHUwMUIyXFx1QTc1RVxcdTAyNDVdL2cgfSxcblx0eyAnYmFzZSc6J1ZZJywnbGV0dGVycyc6L1tcXHVBNzYwXS9nIH0sXG5cdHsgJ2Jhc2UnOidXJywgJ2xldHRlcnMnOi9bXFx1MDA1N1xcdTI0Q0NcXHVGRjM3XFx1MUU4MFxcdTFFODJcXHUwMTc0XFx1MUU4NlxcdTFFODRcXHUxRTg4XFx1MkM3Ml0vZyB9LFxuXHR7ICdiYXNlJzonWCcsICdsZXR0ZXJzJzovW1xcdTAwNThcXHUyNENEXFx1RkYzOFxcdTFFOEFcXHUxRThDXS9nIH0sXG5cdHsgJ2Jhc2UnOidZJywgJ2xldHRlcnMnOi9bXFx1MDA1OVxcdTI0Q0VcXHVGRjM5XFx1MUVGMlxcdTAwRERcXHUwMTc2XFx1MUVGOFxcdTAyMzJcXHUxRThFXFx1MDE3OFxcdTFFRjZcXHUxRUY0XFx1MDFCM1xcdTAyNEVcXHUxRUZFXS9nIH0sXG5cdHsgJ2Jhc2UnOidaJywgJ2xldHRlcnMnOi9bXFx1MDA1QVxcdTI0Q0ZcXHVGRjNBXFx1MDE3OVxcdTFFOTBcXHUwMTdCXFx1MDE3RFxcdTFFOTJcXHUxRTk0XFx1MDFCNVxcdTAyMjRcXHUyQzdGXFx1MkM2QlxcdUE3NjJdL2cgfSxcblx0eyAnYmFzZSc6J2EnLCAnbGV0dGVycyc6L1tcXHUwMDYxXFx1MjREMFxcdUZGNDFcXHUxRTlBXFx1MDBFMFxcdTAwRTFcXHUwMEUyXFx1MUVBN1xcdTFFQTVcXHUxRUFCXFx1MUVBOVxcdTAwRTNcXHUwMTAxXFx1MDEwM1xcdTFFQjFcXHUxRUFGXFx1MUVCNVxcdTFFQjNcXHUwMjI3XFx1MDFFMVxcdTAwRTRcXHUwMURGXFx1MUVBM1xcdTAwRTVcXHUwMUZCXFx1MDFDRVxcdTAyMDFcXHUwMjAzXFx1MUVBMVxcdTFFQURcXHUxRUI3XFx1MUUwMVxcdTAxMDVcXHUyQzY1XFx1MDI1MF0vZyB9LFxuXHR7ICdiYXNlJzonYWEnLCdsZXR0ZXJzJzovW1xcdUE3MzNdL2cgfSxcblx0eyAnYmFzZSc6J2FlJywnbGV0dGVycyc6L1tcXHUwMEU2XFx1MDFGRFxcdTAxRTNdL2cgfSxcblx0eyAnYmFzZSc6J2FvJywnbGV0dGVycyc6L1tcXHVBNzM1XS9nIH0sXG5cdHsgJ2Jhc2UnOidhdScsJ2xldHRlcnMnOi9bXFx1QTczN10vZyB9LFxuXHR7ICdiYXNlJzonYXYnLCdsZXR0ZXJzJzovW1xcdUE3MzlcXHVBNzNCXS9nIH0sXG5cdHsgJ2Jhc2UnOidheScsJ2xldHRlcnMnOi9bXFx1QTczRF0vZyB9LFxuXHR7ICdiYXNlJzonYicsICdsZXR0ZXJzJzovW1xcdTAwNjJcXHUyNEQxXFx1RkY0MlxcdTFFMDNcXHUxRTA1XFx1MUUwN1xcdTAxODBcXHUwMTgzXFx1MDI1M10vZyB9LFxuXHR7ICdiYXNlJzonYycsICdsZXR0ZXJzJzovW1xcdTAwNjNcXHUyNEQyXFx1RkY0M1xcdTAxMDdcXHUwMTA5XFx1MDEwQlxcdTAxMERcXHUwMEU3XFx1MUUwOVxcdTAxODhcXHUwMjNDXFx1QTczRlxcdTIxODRdL2cgfSxcblx0eyAnYmFzZSc6J2QnLCAnbGV0dGVycyc6L1tcXHUwMDY0XFx1MjREM1xcdUZGNDRcXHUxRTBCXFx1MDEwRlxcdTFFMERcXHUxRTExXFx1MUUxM1xcdTFFMEZcXHUwMTExXFx1MDE4Q1xcdTAyNTZcXHUwMjU3XFx1QTc3QV0vZyB9LFxuXHR7ICdiYXNlJzonZHonLCdsZXR0ZXJzJzovW1xcdTAxRjNcXHUwMUM2XS9nIH0sXG5cdHsgJ2Jhc2UnOidlJywgJ2xldHRlcnMnOi9bXFx1MDA2NVxcdTI0RDRcXHVGRjQ1XFx1MDBFOFxcdTAwRTlcXHUwMEVBXFx1MUVDMVxcdTFFQkZcXHUxRUM1XFx1MUVDM1xcdTFFQkRcXHUwMTEzXFx1MUUxNVxcdTFFMTdcXHUwMTE1XFx1MDExN1xcdTAwRUJcXHUxRUJCXFx1MDExQlxcdTAyMDVcXHUwMjA3XFx1MUVCOVxcdTFFQzdcXHUwMjI5XFx1MUUxRFxcdTAxMTlcXHUxRTE5XFx1MUUxQlxcdTAyNDdcXHUwMjVCXFx1MDFERF0vZyB9LFxuXHR7ICdiYXNlJzonZicsICdsZXR0ZXJzJzovW1xcdTAwNjZcXHUyNEQ1XFx1RkY0NlxcdTFFMUZcXHUwMTkyXFx1QTc3Q10vZyB9LFxuXHR7ICdiYXNlJzonZycsICdsZXR0ZXJzJzovW1xcdTAwNjdcXHUyNEQ2XFx1RkY0N1xcdTAxRjVcXHUwMTFEXFx1MUUyMVxcdTAxMUZcXHUwMTIxXFx1MDFFN1xcdTAxMjNcXHUwMUU1XFx1MDI2MFxcdUE3QTFcXHUxRDc5XFx1QTc3Rl0vZyB9LFxuXHR7ICdiYXNlJzonaCcsICdsZXR0ZXJzJzovW1xcdTAwNjhcXHUyNEQ3XFx1RkY0OFxcdTAxMjVcXHUxRTIzXFx1MUUyN1xcdTAyMUZcXHUxRTI1XFx1MUUyOVxcdTFFMkJcXHUxRTk2XFx1MDEyN1xcdTJDNjhcXHUyQzc2XFx1MDI2NV0vZyB9LFxuXHR7ICdiYXNlJzonaHYnLCdsZXR0ZXJzJzovW1xcdTAxOTVdL2cgfSxcblx0eyAnYmFzZSc6J2knLCAnbGV0dGVycyc6L1tcXHUwMDY5XFx1MjREOFxcdUZGNDlcXHUwMEVDXFx1MDBFRFxcdTAwRUVcXHUwMTI5XFx1MDEyQlxcdTAxMkRcXHUwMEVGXFx1MUUyRlxcdTFFQzlcXHUwMUQwXFx1MDIwOVxcdTAyMEJcXHUxRUNCXFx1MDEyRlxcdTFFMkRcXHUwMjY4XFx1MDEzMV0vZyB9LFxuXHR7ICdiYXNlJzonaicsICdsZXR0ZXJzJzovW1xcdTAwNkFcXHUyNEQ5XFx1RkY0QVxcdTAxMzVcXHUwMUYwXFx1MDI0OV0vZyB9LFxuXHR7ICdiYXNlJzonaycsICdsZXR0ZXJzJzovW1xcdTAwNkJcXHUyNERBXFx1RkY0QlxcdTFFMzFcXHUwMUU5XFx1MUUzM1xcdTAxMzdcXHUxRTM1XFx1MDE5OVxcdTJDNkFcXHVBNzQxXFx1QTc0M1xcdUE3NDVcXHVBN0EzXS9nIH0sXG5cdHsgJ2Jhc2UnOidsJywgJ2xldHRlcnMnOi9bXFx1MDA2Q1xcdTI0REJcXHVGRjRDXFx1MDE0MFxcdTAxM0FcXHUwMTNFXFx1MUUzN1xcdTFFMzlcXHUwMTNDXFx1MUUzRFxcdTFFM0JcXHUwMTdGXFx1MDE0MlxcdTAxOUFcXHUwMjZCXFx1MkM2MVxcdUE3NDlcXHVBNzgxXFx1QTc0N10vZyB9LFxuXHR7ICdiYXNlJzonbGonLCdsZXR0ZXJzJzovW1xcdTAxQzldL2cgfSxcblx0eyAnYmFzZSc6J20nLCAnbGV0dGVycyc6L1tcXHUwMDZEXFx1MjREQ1xcdUZGNERcXHUxRTNGXFx1MUU0MVxcdTFFNDNcXHUwMjcxXFx1MDI2Rl0vZyB9LFxuXHR7ICdiYXNlJzonbicsICdsZXR0ZXJzJzovW1xcdTAwNkVcXHUyNEREXFx1RkY0RVxcdTAxRjlcXHUwMTQ0XFx1MDBGMVxcdTFFNDVcXHUwMTQ4XFx1MUU0N1xcdTAxNDZcXHUxRTRCXFx1MUU0OVxcdTAxOUVcXHUwMjcyXFx1MDE0OVxcdUE3OTFcXHVBN0E1XS9nIH0sXG5cdHsgJ2Jhc2UnOiduaicsJ2xldHRlcnMnOi9bXFx1MDFDQ10vZyB9LFxuXHR7ICdiYXNlJzonbycsICdsZXR0ZXJzJzovW1xcdTAwNkZcXHUyNERFXFx1RkY0RlxcdTAwRjJcXHUwMEYzXFx1MDBGNFxcdTFFRDNcXHUxRUQxXFx1MUVEN1xcdTFFRDVcXHUwMEY1XFx1MUU0RFxcdTAyMkRcXHUxRTRGXFx1MDE0RFxcdTFFNTFcXHUxRTUzXFx1MDE0RlxcdTAyMkZcXHUwMjMxXFx1MDBGNlxcdTAyMkJcXHUxRUNGXFx1MDE1MVxcdTAxRDJcXHUwMjBEXFx1MDIwRlxcdTAxQTFcXHUxRUREXFx1MUVEQlxcdTFFRTFcXHUxRURGXFx1MUVFM1xcdTFFQ0RcXHUxRUQ5XFx1MDFFQlxcdTAxRURcXHUwMEY4XFx1MDFGRlxcdTAyNTRcXHVBNzRCXFx1QTc0RFxcdTAyNzVdL2cgfSxcblx0eyAnYmFzZSc6J29pJywnbGV0dGVycyc6L1tcXHUwMUEzXS9nIH0sXG5cdHsgJ2Jhc2UnOidvdScsJ2xldHRlcnMnOi9bXFx1MDIyM10vZyB9LFxuXHR7ICdiYXNlJzonb28nLCdsZXR0ZXJzJzovW1xcdUE3NEZdL2cgfSxcblx0eyAnYmFzZSc6J3AnLCAnbGV0dGVycyc6L1tcXHUwMDcwXFx1MjRERlxcdUZGNTBcXHUxRTU1XFx1MUU1N1xcdTAxQTVcXHUxRDdEXFx1QTc1MVxcdUE3NTNcXHVBNzU1XS9nIH0sXG5cdHsgJ2Jhc2UnOidxJywgJ2xldHRlcnMnOi9bXFx1MDA3MVxcdTI0RTBcXHVGRjUxXFx1MDI0QlxcdUE3NTdcXHVBNzU5XS9nIH0sXG5cdHsgJ2Jhc2UnOidyJywgJ2xldHRlcnMnOi9bXFx1MDA3MlxcdTI0RTFcXHVGRjUyXFx1MDE1NVxcdTFFNTlcXHUwMTU5XFx1MDIxMVxcdTAyMTNcXHUxRTVCXFx1MUU1RFxcdTAxNTdcXHUxRTVGXFx1MDI0RFxcdTAyN0RcXHVBNzVCXFx1QTdBN1xcdUE3ODNdL2cgfSxcblx0eyAnYmFzZSc6J3MnLCAnbGV0dGVycyc6L1tcXHUwMDczXFx1MjRFMlxcdUZGNTNcXHUwMERGXFx1MDE1QlxcdTFFNjVcXHUwMTVEXFx1MUU2MVxcdTAxNjFcXHUxRTY3XFx1MUU2M1xcdTFFNjlcXHUwMjE5XFx1MDE1RlxcdTAyM0ZcXHVBN0E5XFx1QTc4NVxcdTFFOUJdL2cgfSxcblx0eyAnYmFzZSc6J3QnLCAnbGV0dGVycyc6L1tcXHUwMDc0XFx1MjRFM1xcdUZGNTRcXHUxRTZCXFx1MUU5N1xcdTAxNjVcXHUxRTZEXFx1MDIxQlxcdTAxNjNcXHUxRTcxXFx1MUU2RlxcdTAxNjdcXHUwMUFEXFx1MDI4OFxcdTJDNjZcXHVBNzg3XS9nIH0sXG5cdHsgJ2Jhc2UnOid0eicsJ2xldHRlcnMnOi9bXFx1QTcyOV0vZyB9LFxuXHR7ICdiYXNlJzondScsICdsZXR0ZXJzJzovW1xcdTAwNzVcXHUyNEU0XFx1RkY1NVxcdTAwRjlcXHUwMEZBXFx1MDBGQlxcdTAxNjlcXHUxRTc5XFx1MDE2QlxcdTFFN0JcXHUwMTZEXFx1MDBGQ1xcdTAxRENcXHUwMUQ4XFx1MDFENlxcdTAxREFcXHUxRUU3XFx1MDE2RlxcdTAxNzFcXHUwMUQ0XFx1MDIxNVxcdTAyMTdcXHUwMUIwXFx1MUVFQlxcdTFFRTlcXHUxRUVGXFx1MUVFRFxcdTFFRjFcXHUxRUU1XFx1MUU3M1xcdTAxNzNcXHUxRTc3XFx1MUU3NVxcdTAyODldL2cgfSxcblx0eyAnYmFzZSc6J3YnLCAnbGV0dGVycyc6L1tcXHUwMDc2XFx1MjRFNVxcdUZGNTZcXHUxRTdEXFx1MUU3RlxcdTAyOEJcXHVBNzVGXFx1MDI4Q10vZyB9LFxuXHR7ICdiYXNlJzondnknLCdsZXR0ZXJzJzovW1xcdUE3NjFdL2cgfSxcblx0eyAnYmFzZSc6J3cnLCAnbGV0dGVycyc6L1tcXHUwMDc3XFx1MjRFNlxcdUZGNTdcXHUxRTgxXFx1MUU4M1xcdTAxNzVcXHUxRTg3XFx1MUU4NVxcdTFFOThcXHUxRTg5XFx1MkM3M10vZyB9LFxuXHR7ICdiYXNlJzoneCcsICdsZXR0ZXJzJzovW1xcdTAwNzhcXHUyNEU3XFx1RkY1OFxcdTFFOEJcXHUxRThEXS9nIH0sXG5cdHsgJ2Jhc2UnOid5JywgJ2xldHRlcnMnOi9bXFx1MDA3OVxcdTI0RThcXHVGRjU5XFx1MUVGM1xcdTAwRkRcXHUwMTc3XFx1MUVGOVxcdTAyMzNcXHUxRThGXFx1MDBGRlxcdTFFRjdcXHUxRTk5XFx1MUVGNVxcdTAxQjRcXHUwMjRGXFx1MUVGRl0vZyB9LFxuXHR7ICdiYXNlJzoneicsICdsZXR0ZXJzJzovW1xcdTAwN0FcXHUyNEU5XFx1RkY1QVxcdTAxN0FcXHUxRTkxXFx1MDE3Q1xcdTAxN0VcXHUxRTkzXFx1MUU5NVxcdTAxQjZcXHUwMjI1XFx1MDI0MFxcdTJDNkNcXHVBNzYzXS9nIH0sXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmlwRGlhY3JpdGljcyAoc3RyKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbWFwLmxlbmd0aDsgaSsrKSB7XG5cdFx0c3RyID0gc3RyLnJlcGxhY2UobWFwW2ldLmxldHRlcnMsIG1hcFtpXS5iYXNlKTtcblx0fVxuXHRyZXR1cm4gc3RyO1xufTtcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vcmVhY3Qtc2VsZWN0XG4qL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgQXV0b3NpemVJbnB1dCBmcm9tICdyZWFjdC1pbnB1dC1hdXRvc2l6ZSc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IGRlZmF1bHRBcnJvd1JlbmRlcmVyIGZyb20gJy4vdXRpbHMvZGVmYXVsdEFycm93UmVuZGVyZXInO1xuaW1wb3J0IGRlZmF1bHRGaWx0ZXJPcHRpb25zIGZyb20gJy4vdXRpbHMvZGVmYXVsdEZpbHRlck9wdGlvbnMnO1xuaW1wb3J0IGRlZmF1bHRNZW51UmVuZGVyZXIgZnJvbSAnLi91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyJztcblxuaW1wb3J0IEFzeW5jIGZyb20gJy4vQXN5bmMnO1xuaW1wb3J0IEFzeW5jQ3JlYXRhYmxlIGZyb20gJy4vQXN5bmNDcmVhdGFibGUnO1xuaW1wb3J0IENyZWF0YWJsZSBmcm9tICcuL0NyZWF0YWJsZSc7XG5pbXBvcnQgT3B0aW9uIGZyb20gJy4vT3B0aW9uJztcbmltcG9ydCBWYWx1ZSBmcm9tICcuL1ZhbHVlJztcblxuZnVuY3Rpb24gc3RyaW5naWZ5VmFsdWUgKHZhbHVlKSB7XG5cdGNvbnN0IHZhbHVlVHlwZSA9IHR5cGVvZiB2YWx1ZTtcblx0aWYgKHZhbHVlVHlwZSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0gZWxzZSBpZiAodmFsdWVUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cdH0gZWxzZSBpZiAodmFsdWVUeXBlID09PSAnbnVtYmVyJyB8fCB2YWx1ZVR5cGUgPT09ICdib29sZWFuJykge1xuXHRcdHJldHVybiBTdHJpbmcodmFsdWUpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAnJztcblx0fVxufVxuXG5jb25zdCBzdHJpbmdPck5vZGUgPSBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcblx0UmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0UmVhY3QuUHJvcFR5cGVzLm5vZGVcbl0pO1xuXG5sZXQgaW5zdGFuY2VJZCA9IDE7XG5cbmNvbnN0IFNlbGVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRkaXNwbGF5TmFtZTogJ1NlbGVjdCcsXG5cblx0cHJvcFR5cGVzOiB7XG5cdFx0YWRkTGFiZWxUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAvLyBwbGFjZWhvbGRlciBkaXNwbGF5ZWQgd2hlbiB5b3Ugd2FudCB0byBhZGQgYSBsYWJlbCBvbiBhIG11bHRpLXZhbHVlIGlucHV0XG5cdFx0J2FyaWEtbGFiZWwnOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAvLyBBcmlhIGxhYmVsIChmb3IgYXNzaXN0aXZlIHRlY2gpXG5cdFx0J2FyaWEtbGFiZWxsZWRieSc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHQvLyBIVE1MIElEIG9mIGFuIGVsZW1lbnQgdGhhdCBzaG91bGQgYmUgdXNlZCBhcyB0aGUgbGFiZWwgKGZvciBhc3Npc3RpdmUgdGVjaClcblx0XHRhcnJvd1JlbmRlcmVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcdFx0XHRcdC8vIENyZWF0ZSBkcm9wLWRvd24gY2FyZXQgZWxlbWVudFxuXHRcdGF1dG9CbHVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgLy8gYXV0b21hdGljYWxseSBibHVyIHRoZSBjb21wb25lbnQgd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWRcblx0XHRhdXRvZm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgIC8vIGF1dG9mb2N1cyB0aGUgY29tcG9uZW50IG9uIG1vdW50XG5cdFx0YXV0b3NpemU6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyB3aGV0aGVyIHRvIGVuYWJsZSBhdXRvc2l6aW5nIG9yIG5vdFxuXHRcdGJhY2tzcGFjZVJlbW92ZXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgLy8gd2hldGhlciBiYWNrc3BhY2UgcmVtb3ZlcyBhbiBpdGVtIGlmIHRoZXJlIGlzIG5vIHRleHQgaW5wdXRcblx0XHRiYWNrc3BhY2VUb1JlbW92ZU1lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAvLyBNZXNzYWdlIHRvIHVzZSBmb3Igc2NyZWVucmVhZGVycyB0byBwcmVzcyBiYWNrc3BhY2UgdG8gcmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gLSB7bGFiZWx9IGlzIHJlcGxhY2VkIHdpdGggdGhlIGl0ZW0gbGFiZWxcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgIC8vIGNsYXNzTmFtZSBmb3IgdGhlIG91dGVyIGVsZW1lbnRcblx0XHRjbGVhckFsbFRleHQ6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAgIC8vIHRpdGxlIGZvciB0aGUgXCJjbGVhclwiIGNvbnRyb2wgd2hlbiBtdWx0aTogdHJ1ZVxuXHRcdGNsZWFyVmFsdWVUZXh0OiBzdHJpbmdPck5vZGUsICAgICAgICAgICAgICAgLy8gdGl0bGUgZm9yIHRoZSBcImNsZWFyXCIgY29udHJvbFxuXHRcdGNsZWFyYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gc2hvdWxkIGl0IGJlIHBvc3NpYmxlIHRvIHJlc2V0IHZhbHVlXG5cdFx0ZGVsZXRlUmVtb3ZlczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAvLyB3aGV0aGVyIGJhY2tzcGFjZSByZW1vdmVzIGFuIGl0ZW0gaWYgdGhlcmUgaXMgbm8gdGV4dCBpbnB1dFxuXHRcdGRlbGltaXRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gZGVsaW1pdGVyIHRvIHVzZSB0byBqb2luIG11bHRpcGxlIHZhbHVlcyBmb3IgdGhlIGhpZGRlbiBmaWVsZCB2YWx1ZVxuXHRcdGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgLy8gd2hldGhlciB0aGUgU2VsZWN0IGlzIGRpc2FibGVkIG9yIG5vdFxuXHRcdGVzY2FwZUNsZWFyc1ZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgLy8gd2hldGhlciBlc2NhcGUgY2xlYXJzIHRoZSB2YWx1ZSB3aGVuIHRoZSBtZW51IGlzIGNsb3NlZFxuXHRcdGZpbHRlck9wdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgLy8gbWV0aG9kIHRvIGZpbHRlciBhIHNpbmdsZSBvcHRpb24gKG9wdGlvbiwgZmlsdGVyU3RyaW5nKVxuXHRcdGZpbHRlck9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hbnksICAgICAgICAgLy8gYm9vbGVhbiB0byBlbmFibGUgZGVmYXVsdCBmaWx0ZXJpbmcgb3IgZnVuY3Rpb24gdG8gZmlsdGVyIHRoZSBvcHRpb25zIGFycmF5IChbb3B0aW9uc10sIGZpbHRlclN0cmluZywgW3ZhbHVlc10pXG5cdFx0aWdub3JlQWNjZW50czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAvLyB3aGV0aGVyIHRvIHN0cmlwIGRpYWNyaXRpY3Mgd2hlbiBmaWx0ZXJpbmdcblx0XHRpZ25vcmVDYXNlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgIC8vIHdoZXRoZXIgdG8gcGVyZm9ybSBjYXNlLWluc2Vuc2l0aXZlIGZpbHRlcmluZ1xuXHRcdGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsICAgICAgICAgLy8gY3VzdG9tIGF0dHJpYnV0ZXMgZm9yIHRoZSBJbnB1dFxuXHRcdGlucHV0UmVuZGVyZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgLy8gcmV0dXJucyBhIGN1c3RvbSBpbnB1dCBjb21wb25lbnRcblx0XHRpbnN0YW5jZUlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgIC8vIHNldCB0aGUgY29tcG9uZW50cyBpbnN0YW5jZUlkXG5cdFx0aXNMb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAvLyB3aGV0aGVyIHRoZSBTZWxlY3QgaXMgbG9hZGluZyBleHRlcm5hbGx5IG9yIG5vdCAoc3VjaCBhcyBvcHRpb25zIGJlaW5nIGxvYWRlZClcblx0XHRqb2luVmFsdWVzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgIC8vIGpvaW5zIG11bHRpcGxlIHZhbHVlcyBpbnRvIGEgc2luZ2xlIGZvcm0gZmllbGQgd2l0aCB0aGUgZGVsaW1pdGVyIChsZWdhY3kgbW9kZSlcblx0XHRsYWJlbEtleTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgIC8vIHBhdGggb2YgdGhlIGxhYmVsIHZhbHVlIGluIG9wdGlvbiBvYmplY3RzXG5cdFx0bWF0Y2hQb3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyAoYW55fHN0YXJ0KSBtYXRjaCB0aGUgc3RhcnQgb3IgZW50aXJlIHN0cmluZyB3aGVuIGZpbHRlcmluZ1xuXHRcdG1hdGNoUHJvcDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gKGFueXxsYWJlbHx2YWx1ZSkgd2hpY2ggb3B0aW9uIHByb3BlcnR5IHRvIGZpbHRlciBvblxuXHRcdG1lbnVCdWZmZXI6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsICAgICAgICAgLy8gb3B0aW9uYWwgYnVmZmVyIChpbiBweCkgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCBhbmQgdGhlIGJvdHRvbSBvZiB0aGUgbWVudVxuXHRcdG1lbnVDb250YWluZXJTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIG1lbnUgY29udGFpbmVyXG5cdFx0bWVudVJlbmRlcmVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyByZW5kZXJzIGEgY3VzdG9tIG1lbnUgd2l0aCBvcHRpb25zXG5cdFx0bWVudVN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LCAgICAgICAgICAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgbWVudVxuXHRcdG11bHRpOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAgLy8gbXVsdGktdmFsdWUgaW5wdXRcblx0XHRuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlcyBhIGhpZGRlbiA8aW5wdXQgLz4gdGFnIHdpdGggdGhpcyBmaWVsZCBuYW1lIGZvciBodG1sIGZvcm1zXG5cdFx0bm9SZXN1bHRzVGV4dDogc3RyaW5nT3JOb2RlLCAgICAgICAgICAgICAgICAvLyBwbGFjZWhvbGRlciBkaXNwbGF5ZWQgd2hlbiB0aGVyZSBhcmUgbm8gbWF0Y2hpbmcgc2VhcmNoIHJlc3VsdHNcblx0XHRvbkJsdXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgIC8vIG9uQmx1ciBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdFx0b25CbHVyUmVzZXRzSW5wdXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAvLyB3aGV0aGVyIGlucHV0IGlzIGNsZWFyZWQgb24gYmx1clxuXHRcdG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7fVxuXHRcdG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBjbG9zZWRcblx0XHRvbkNsb3NlUmVzZXRzSW5wdXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFx0XHQvLyB3aGV0aGVyIGlucHV0IGlzIGNsZWFyZWQgd2hlbiBtZW51IGlzIGNsb3NlZCB0aHJvdWdoIHRoZSBhcnJvd1xuXHRcdG9uRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgLy8gb25Gb2N1cyBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdFx0b25JbnB1dENoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAvLyBvbklucHV0Q2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChpbnB1dFZhbHVlKSB7fVxuXHRcdG9uSW5wdXRLZXlEb3duOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgLy8gaW5wdXQga2V5RG93biBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdFx0b25NZW51U2Nyb2xsVG9Cb3R0b206IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAvLyBmaXJlcyB3aGVuIHRoZSBtZW51IGlzIHNjcm9sbGVkIHRvIHRoZSBib3R0b207IGNhbiBiZSB1c2VkIHRvIHBhZ2luYXRlIG9wdGlvbnNcblx0XHRvbk9wZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgIC8vIGZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgb3BlbmVkXG5cdFx0b25WYWx1ZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyBvbkNsaWNrIGhhbmRsZXIgZm9yIHZhbHVlIGxhYmVsczogZnVuY3Rpb24gKHZhbHVlLCBldmVudCkge31cblx0XHRvcGVuQWZ0ZXJGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgIC8vIGJvb2xlYW4gdG8gZW5hYmxlIG9wZW5pbmcgZHJvcGRvd24gd2hlbiBmb2N1c2VkXG5cdFx0b3Blbk9uRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAvLyBhbHdheXMgb3BlbiBvcHRpb25zIG1lbnUgb24gZm9jdXNcblx0XHRvcHRpb25DbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgIC8vIGFkZGl0aW9uYWwgY2xhc3MoZXMpIHRvIGFwcGx5IHRvIHRoZSA8T3B0aW9uIC8+IGVsZW1lbnRzXG5cdFx0b3B0aW9uQ29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAvLyBvcHRpb24gY29tcG9uZW50IHRvIHJlbmRlciBpbiBkcm9wZG93blxuXHRcdG9wdGlvblJlbmRlcmVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgLy8gb3B0aW9uUmVuZGVyZXI6IGZ1bmN0aW9uIChvcHRpb24pIHt9XG5cdFx0b3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LCAgICAgICAgICAgICAvLyBhcnJheSBvZiBvcHRpb25zXG5cdFx0cGFnZVNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsICAgICAgICAgICAvLyBudW1iZXIgb2YgZW50cmllcyB0byBwYWdlIHdoZW4gdXNpbmcgcGFnZSB1cC9kb3duIGtleXNcblx0XHRwbGFjZWhvbGRlcjogc3RyaW5nT3JOb2RlLCAgICAgICAgICAgICAgICAgIC8vIGZpZWxkIHBsYWNlaG9sZGVyLCBkaXNwbGF5ZWQgd2hlbiB0aGVyZSdzIG5vIHZhbHVlXG5cdFx0cmVxdWlyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyBhcHBsaWVzIEhUTUw1IHJlcXVpcmVkIGF0dHJpYnV0ZSB3aGVuIG5lZWRlZFxuXHRcdHJlc2V0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5hbnksICAgICAgICAgICAgLy8gdmFsdWUgdG8gdXNlIHdoZW4geW91IGNsZWFyIHRoZSBjb250cm9sXG5cdFx0c2Nyb2xsTWVudUludG9WaWV3OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAvLyBib29sZWFuIHRvIGVuYWJsZSB0aGUgdmlld3BvcnQgdG8gc2hpZnQgc28gdGhhdCB0aGUgZnVsbCBtZW51IGZ1bGx5IHZpc2libGUgd2hlbiBlbmdhZ2VkXG5cdFx0c2VhcmNoYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAvLyB3aGV0aGVyIHRvIGVuYWJsZSBzZWFyY2hpbmcgZmVhdHVyZSBvciBub3Rcblx0XHRzaW1wbGVWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgIC8vIHBhc3MgdGhlIHZhbHVlIHRvIG9uQ2hhbmdlIGFzIGEgc2ltcGxlIHZhbHVlIChsZWdhY3kgcHJlIDEuMCBtb2RlKSwgZGVmYXVsdHMgdG8gZmFsc2Vcblx0XHRzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgICAgICAgICAgICAgIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBjb250cm9sXG5cdFx0dGFiSW5kZXg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBvcHRpb25hbCB0YWIgaW5kZXggb2YgdGhlIGNvbnRyb2xcblx0XHR0YWJTZWxlY3RzVmFsdWU6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgIC8vIHdoZXRoZXIgdG8gdHJlYXQgdGFiYmluZyBvdXQgd2hpbGUgZm9jdXNlZCB0byBiZSB2YWx1ZSBzZWxlY3Rpb25cblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAgICAgIC8vIGluaXRpYWwgZmllbGQgdmFsdWVcblx0XHR2YWx1ZUNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgIC8vIHZhbHVlIGNvbXBvbmVudCB0byByZW5kZXJcblx0XHR2YWx1ZUtleTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgIC8vIHBhdGggb2YgdGhlIGxhYmVsIHZhbHVlIGluIG9wdGlvbiBvYmplY3RzXG5cdFx0dmFsdWVSZW5kZXJlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAvLyB2YWx1ZVJlbmRlcmVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxuXHRcdHdyYXBwZXJTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgICAgICAgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIGNvbXBvbmVudCB3cmFwcGVyXG5cdH0sXG5cblx0c3RhdGljczogeyBBc3luYywgQXN5bmNDcmVhdGFibGUsIENyZWF0YWJsZSB9LFxuXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFkZExhYmVsVGV4dDogJ0FkZCBcIntsYWJlbH1cIj8nLFxuXHRcdFx0YXJyb3dSZW5kZXJlcjogZGVmYXVsdEFycm93UmVuZGVyZXIsXG5cdFx0XHRhdXRvc2l6ZTogdHJ1ZSxcblx0XHRcdGJhY2tzcGFjZVJlbW92ZXM6IHRydWUsXG5cdFx0XHRiYWNrc3BhY2VUb1JlbW92ZU1lc3NhZ2U6ICdQcmVzcyBiYWNrc3BhY2UgdG8gcmVtb3ZlIHtsYWJlbH0nLFxuXHRcdFx0Y2xlYXJhYmxlOiB0cnVlLFxuXHRcdFx0Y2xlYXJBbGxUZXh0OiAnQ2xlYXIgYWxsJyxcblx0XHRcdGNsZWFyVmFsdWVUZXh0OiAnQ2xlYXIgdmFsdWUnLFxuXHRcdFx0ZGVsZXRlUmVtb3ZlczogdHJ1ZSxcblx0XHRcdGRlbGltaXRlcjogJywnLFxuXHRcdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdFx0ZXNjYXBlQ2xlYXJzVmFsdWU6IHRydWUsXG5cdFx0XHRmaWx0ZXJPcHRpb25zOiBkZWZhdWx0RmlsdGVyT3B0aW9ucyxcblx0XHRcdGlnbm9yZUFjY2VudHM6IHRydWUsXG5cdFx0XHRpZ25vcmVDYXNlOiB0cnVlLFxuXHRcdFx0aW5wdXRQcm9wczoge30sXG5cdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0am9pblZhbHVlczogZmFsc2UsXG5cdFx0XHRsYWJlbEtleTogJ2xhYmVsJyxcblx0XHRcdG1hdGNoUG9zOiAnYW55Jyxcblx0XHRcdG1hdGNoUHJvcDogJ2FueScsXG5cdFx0XHRtZW51QnVmZmVyOiAwLFxuXHRcdFx0bWVudVJlbmRlcmVyOiBkZWZhdWx0TWVudVJlbmRlcmVyLFxuXHRcdFx0bXVsdGk6IGZhbHNlLFxuXHRcdFx0bm9SZXN1bHRzVGV4dDogJ05vIHJlc3VsdHMgZm91bmQnLFxuXHRcdFx0b25CbHVyUmVzZXRzSW5wdXQ6IHRydWUsXG5cdFx0XHRvbkNsb3NlUmVzZXRzSW5wdXQ6IHRydWUsXG5cdFx0XHRvcGVuQWZ0ZXJGb2N1czogZmFsc2UsXG5cdFx0XHRvcHRpb25Db21wb25lbnQ6IE9wdGlvbixcblx0XHRcdHBhZ2VTaXplOiA1LFxuXHRcdFx0cGxhY2Vob2xkZXI6ICdTZWxlY3QuLi4nLFxuXHRcdFx0cmVxdWlyZWQ6IGZhbHNlLFxuXHRcdFx0c2Nyb2xsTWVudUludG9WaWV3OiB0cnVlLFxuXHRcdFx0c2VhcmNoYWJsZTogdHJ1ZSxcblx0XHRcdHNpbXBsZVZhbHVlOiBmYWxzZSxcblx0XHRcdHRhYlNlbGVjdHNWYWx1ZTogdHJ1ZSxcblx0XHRcdHZhbHVlQ29tcG9uZW50OiBWYWx1ZSxcblx0XHRcdHZhbHVlS2V5OiAndmFsdWUnLFxuXHRcdH07XG5cdH0sXG5cblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5wdXRWYWx1ZTogJycsXG5cdFx0XHRpc0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRyZXF1aXJlZDogZmFsc2UsXG5cdFx0fTtcblx0fSxcblxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdFx0dGhpcy5faW5zdGFuY2VQcmVmaXggPSAncmVhY3Qtc2VsZWN0LScgKyAodGhpcy5wcm9wcy5pbnN0YW5jZUlkIHx8ICsraW5zdGFuY2VJZCkgKyAnLSc7XG5cdFx0Y29uc3QgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblxuXHRcdGlmICh0aGlzLnByb3BzLnJlcXVpcmVkKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0cmVxdWlyZWQ6IHRoaXMuaGFuZGxlUmVxdWlyZWQodmFsdWVBcnJheVswXSwgdGhpcy5wcm9wcy5tdWx0aSksXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmF1dG9mb2N1cykge1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuXHRcdGNvbnN0IHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkobmV4dFByb3BzLnZhbHVlLCBuZXh0UHJvcHMpO1xuXG5cdFx0aWYgKG5leHRQcm9wcy5yZXF1aXJlZCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdHJlcXVpcmVkOiB0aGlzLmhhbmRsZVJlcXVpcmVkKHZhbHVlQXJyYXlbMF0sIG5leHRQcm9wcy5tdWx0aSksXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcblx0XHRpZiAobmV4dFN0YXRlLmlzT3BlbiAhPT0gdGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdHRoaXMudG9nZ2xlVG91Y2hPdXRzaWRlRXZlbnQobmV4dFN0YXRlLmlzT3Blbik7XG5cdFx0XHRjb25zdCBoYW5kbGVyID0gbmV4dFN0YXRlLmlzT3BlbiA/IG5leHRQcm9wcy5vbk9wZW4gOiBuZXh0UHJvcHMub25DbG9zZTtcblx0XHRcdGhhbmRsZXIgJiYgaGFuZGxlcigpO1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnREaWRVcGRhdGUgKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG5cdFx0Ly8gZm9jdXMgdG8gdGhlIHNlbGVjdGVkIG9wdGlvblxuXHRcdGlmICh0aGlzLm1lbnUgJiYgdGhpcy5mb2N1c2VkICYmIHRoaXMuc3RhdGUuaXNPcGVuICYmICF0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24pIHtcblx0XHRcdGxldCBmb2N1c2VkT3B0aW9uTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMuZm9jdXNlZCk7XG5cdFx0XHRsZXQgbWVudU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLm1lbnUpO1xuXHRcdFx0bWVudU5vZGUuc2Nyb2xsVG9wID0gZm9jdXNlZE9wdGlvbk5vZGUub2Zmc2V0VG9wO1xuXHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlICYmIHRoaXMuZm9jdXNlZCAmJiB0aGlzLm1lbnUpIHtcblx0XHRcdHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlID0gZmFsc2U7XG5cdFx0XHR2YXIgZm9jdXNlZERPTSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMuZm9jdXNlZCk7XG5cdFx0XHR2YXIgbWVudURPTSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMubWVudSk7XG5cdFx0XHR2YXIgZm9jdXNlZFJlY3QgPSBmb2N1c2VkRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0dmFyIG1lbnVSZWN0ID0gbWVudURPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGlmIChmb2N1c2VkUmVjdC5ib3R0b20gPiBtZW51UmVjdC5ib3R0b20gfHwgZm9jdXNlZFJlY3QudG9wIDwgbWVudVJlY3QudG9wKSB7XG5cdFx0XHRcdG1lbnVET00uc2Nyb2xsVG9wID0gKGZvY3VzZWRET00ub2Zmc2V0VG9wICsgZm9jdXNlZERPTS5jbGllbnRIZWlnaHQgLSBtZW51RE9NLm9mZnNldEhlaWdodCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLnNjcm9sbE1lbnVJbnRvVmlldyAmJiB0aGlzLm1lbnVDb250YWluZXIpIHtcblx0XHRcdHZhciBtZW51Q29udGFpbmVyUmVjdCA9IHRoaXMubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgPCBtZW51Q29udGFpbmVyUmVjdC5ib3R0b20gKyB0aGlzLnByb3BzLm1lbnVCdWZmZXIpIHtcblx0XHRcdFx0d2luZG93LnNjcm9sbEJ5KDAsIG1lbnVDb250YWluZXJSZWN0LmJvdHRvbSArIHRoaXMucHJvcHMubWVudUJ1ZmZlciAtIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChwcmV2UHJvcHMuZGlzYWJsZWQgIT09IHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyBpc0ZvY3VzZWQ6IGZhbHNlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG5cdFx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRpZiAoIWRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcblx0XHRcdGRvY3VtZW50LmRldGFjaEV2ZW50KCdvbnRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0fVxuXHR9LFxuXG5cdHRvZ2dsZVRvdWNoT3V0c2lkZUV2ZW50KGVuYWJsZWQpIHtcblx0XHRpZiAoZW5hYmxlZCkge1xuXHRcdFx0aWYgKCFkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICYmIGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG5cdFx0XHRcdGRvY3VtZW50LmF0dGFjaEV2ZW50KCdvbnRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIWRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcblx0XHRcdFx0ZG9jdW1lbnQuZGV0YWNoRXZlbnQoJ29udG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGhhbmRsZVRvdWNoT3V0c2lkZShldmVudCkge1xuXHRcdC8vIGhhbmRsZSB0b3VjaCBvdXRzaWRlIG9uIGlvcyB0byBkaXNtaXNzIG1lbnVcblx0XHRpZiAodGhpcy53cmFwcGVyICYmICF0aGlzLndyYXBwZXIuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuXHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHR9XG5cdH0sXG5cblx0Zm9jdXMgKCkge1xuXHRcdGlmICghdGhpcy5pbnB1dCkgcmV0dXJuO1xuXHRcdHRoaXMuaW5wdXQuZm9jdXMoKTtcblxuXHRcdGlmICh0aGlzLnByb3BzLm9wZW5BZnRlckZvY3VzKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXG5cdGJsdXJJbnB1dCgpIHtcblx0XHRpZiAoIXRoaXMuaW5wdXQpIHJldHVybjtcblx0XHR0aGlzLmlucHV0LmJsdXIoKTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaE1vdmUgKGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaFN0YXJ0IChldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBub3QgYmVpbmcgZHJhZ2dlZFxuXHRcdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaEVuZCAoZXZlbnQpIHtcblx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdGlmKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdC8vIEZpcmUgdGhlIG1vdXNlIGV2ZW50c1xuXHRcdHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUgKGV2ZW50KSB7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZih0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHQvLyBDbGVhciB0aGUgdmFsdWVcblx0XHR0aGlzLmNsZWFyVmFsdWUoZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZU1vdXNlRG93biAoZXZlbnQpIHtcblx0XHRjb25zb2xlLmxvZyhcIk1vdXNlRG93blwiKVxuXHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHQvLyBidXR0b24sIG9yIGlmIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQsIGlnbm9yZSBpdC5cblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIHByZXZlbnQgZGVmYXVsdCBldmVudCBoYW5kbGVyc1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvLyBmb3IgdGhlIG5vbi1zZWFyY2hhYmxlIHNlbGVjdCwgdG9nZ2xlIHRoZSBtZW51XG5cdFx0aWYgKCF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdHJldHVybiB0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aXNPcGVuOiAhdGhpcy5zdGF0ZS5pc09wZW4sXG5cdFx0XHR9KTtcblx0XHR9XG5cbiAgICAgICAgbGV0IG5ld0lucHV0VmFsdWUgPSB0aGlzLnN0YXRlLmlucHV0VmFsdWVcblx0XHRpZiAodGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlICYmIHRoaXMucHJvcHMub25CbHVyUmVzZXRzSW5wdXQpIHtcblx0XHRcdGxldCBuZXh0U3RhdGUgPSB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UoJycpO1xuXHRcdFx0Ly8gTm90ZTogIT0gdXNlZCBkZWxpYmVyYXRlbHkgaGVyZSB0byBjYXRjaCB1bmRlZmluZWQgYW5kIG51bGxcblx0XHRcdGlmIChuZXh0U3RhdGUgIT0gbnVsbCAmJiB0eXBlb2YgbmV4dFN0YXRlICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRuZXdJbnB1dFZhbHVlID0gJycgKyBuZXh0U3RhdGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuc3RhdGUuaXNGb2N1c2VkKSB7XG5cdFx0XHQvLyBPbiBpT1MsIHdlIGNhbiBnZXQgaW50byBhIHN0YXRlIHdoZXJlIHdlIHRoaW5rIHRoZSBpbnB1dCBpcyBmb2N1c2VkIGJ1dCBpdCBpc24ndCByZWFsbHksXG5cdFx0XHQvLyBzaW5jZSBpT1MgaWdub3JlcyBwcm9ncmFtbWF0aWMgY2FsbHMgdG8gaW5wdXQuZm9jdXMoKSB0aGF0IHdlcmVuJ3QgdHJpZ2dlcmVkIGJ5IGEgY2xpY2sgZXZlbnQuXG5cdFx0XHQvLyBDYWxsIGZvY3VzKCkgYWdhaW4gaGVyZSB0byBiZSBzYWZlLlxuXHRcdFx0dGhpcy5mb2N1cygpO1xuXG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0O1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dC5nZXRJbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHQvLyBHZXQgdGhlIGFjdHVhbCBET00gaW5wdXQgaWYgdGhlIHJlZiBpcyBhbiA8QXV0b3NpemVJbnB1dCAvPiBjb21wb25lbnRcblx0XHRcdFx0aW5wdXQgPSBpbnB1dC5nZXRJbnB1dCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjbGVhcnMgdGhlIHZhbHVlIHNvIHRoYXQgdGhlIGN1cnNvciB3aWxsIGJlIGF0IHRoZSBlbmQgb2YgaW5wdXQgd2hlbiB0aGUgY29tcG9uZW50IHJlLXJlbmRlcnNcblx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cblx0XHRcdC8vIGlmIHRoZSBpbnB1dCBpcyBmb2N1c2VkLCBlbnN1cmUgdGhlIG1lbnUgaXMgb3BlblxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHRcdFx0aW5wdXRWYWx1ZTogbmV3SW5wdXRWYWx1ZVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vb3RoZXJ3aXNlLCBmb2N1cyB0aGUgaW5wdXQgYW5kIG9wZW4gdGhlIG1lbnVcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpbnB1dFZhbHVlOiBuZXdJbnB1dFZhbHVlXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fb3BlbkFmdGVyRm9jdXMgPSB0cnVlO1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH1cblx0fSxcblxuXHRoYW5kbGVNb3VzZURvd25PbkFycm93IChldmVudCkge1xuXHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHQvLyBidXR0b24sIG9yIGlmIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQsIGlnbm9yZSBpdC5cblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvLyBJZiB0aGUgbWVudSBpc24ndCBvcGVuLCBsZXQgdGhlIGV2ZW50IGJ1YmJsZSB0byB0aGUgbWFpbiBoYW5kbGVNb3VzZURvd25cblx0XHRpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIHByZXZlbnQgZGVmYXVsdCBldmVudCBoYW5kbGVyc1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Ly8gY2xvc2UgdGhlIG1lbnVcblx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHR9LFxuXG5cdGhhbmRsZU1vdXNlRG93bk9uTWVudSAoZXZlbnQpIHtcblx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XG5cdFx0Ly8gYnV0dG9uLCBvciBpZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBpZ25vcmUgaXQuXG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gdHJ1ZTtcblx0XHR0aGlzLmZvY3VzKCk7XG5cdH0sXG5cblx0Y2xvc2VNZW51ICgpIHtcblx0XHRpZih0aGlzLnByb3BzLm9uQ2xvc2VSZXNldHNJbnB1dCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgJiYgIXRoaXMucHJvcHMubXVsdGksXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnXG5cdFx0XHR9KTtcblx0XHR9XHRlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmICF0aGlzLnByb3BzLm11bHRpLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiB0aGlzLnN0YXRlLmlucHV0VmFsdWVcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSBmYWxzZTtcblx0fSxcblxuXHRoYW5kbGVJbnB1dEZvY3VzIChldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm47XG5cdFx0dmFyIGlzT3BlbiA9IHRoaXMuc3RhdGUuaXNPcGVuIHx8IHRoaXMuX29wZW5BZnRlckZvY3VzIHx8IHRoaXMucHJvcHMub3Blbk9uRm9jdXM7XG5cdFx0aWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuXHRcdFx0dGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc0ZvY3VzZWQ6IHRydWUsXG5cdFx0XHRpc09wZW46IGlzT3BlblxuXHRcdH0pO1xuXHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gZmFsc2U7XG5cdH0sXG5cblx0aGFuZGxlSW5wdXRCbHVyIChldmVudCkge1xuXHRcdC8vIFRoZSBjaGVjayBmb3IgbWVudS5jb250YWlucyhhY3RpdmVFbGVtZW50KSBpcyBuZWNlc3NhcnkgdG8gcHJldmVudCBJRTExJ3Mgc2Nyb2xsYmFyIGZyb20gY2xvc2luZyB0aGUgbWVudSBpbiBjZXJ0YWluIGNvbnRleHRzLlxuXHRcdGlmICh0aGlzLm1lbnUgJiYgKHRoaXMubWVudSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCB0aGlzLm1lbnUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpKSB7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uQmx1cihldmVudCk7XG5cdFx0fVxuXHRcdHZhciBvbkJsdXJyZWRTdGF0ZSA9IHtcblx0XHRcdGlzRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLnByb3BzLm9uQmx1clJlc2V0c0lucHV0KSB7XG5cdFx0XHRvbkJsdXJyZWRTdGF0ZS5pbnB1dFZhbHVlID0gJyc7XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUob25CbHVycmVkU3RhdGUpO1xuXHR9LFxuXG5cdGhhbmRsZUlucHV0Q2hhbmdlIChldmVudCkge1xuXHRcdGxldCBuZXdJbnB1dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAhPT0gZXZlbnQudGFyZ2V0LnZhbHVlICYmIHRoaXMucHJvcHMub25JbnB1dENoYW5nZSkge1xuXHRcdFx0bGV0IG5leHRTdGF0ZSA9IHRoaXMucHJvcHMub25JbnB1dENoYW5nZShuZXdJbnB1dFZhbHVlKTtcblx0XHRcdC8vIE5vdGU6ICE9IHVzZWQgZGVsaWJlcmF0ZWx5IGhlcmUgdG8gY2F0Y2ggdW5kZWZpbmVkIGFuZCBudWxsXG5cdFx0XHRpZiAobmV4dFN0YXRlICE9IG51bGwgJiYgdHlwZW9mIG5leHRTdGF0ZSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0bmV3SW5wdXRWYWx1ZSA9ICcnICsgbmV4dFN0YXRlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHRcdGlucHV0VmFsdWU6IG5ld0lucHV0VmFsdWVcblx0XHR9KTtcblx0fSxcblxuXHRoYW5kbGVLZXlEb3duIChldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm47XG5cblx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMub25JbnB1dEtleURvd24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRoaXMucHJvcHMub25JbnB1dEtleURvd24oZXZlbnQpO1xuXHRcdFx0aWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0Y2FzZSA4OiAvLyBiYWNrc3BhY2Vcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgdGhpcy5wcm9wcy5iYWNrc3BhY2VSZW1vdmVzKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLnBvcFZhbHVlKCk7XG5cdFx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRcdGNhc2UgOTogLy8gdGFiXG5cdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSB8fCAhdGhpcy5zdGF0ZS5pc09wZW4gfHwgIXRoaXMucHJvcHMudGFiU2VsZWN0c1ZhbHVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2VsZWN0Rm9jdXNlZE9wdGlvbigpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdFx0Y2FzZSAxMzogLy8gZW50ZXJcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3BlbikgcmV0dXJuO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0dGhpcy5zZWxlY3RGb2N1c2VkT3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMjc6IC8vIGVzY2FwZVxuXHRcdFx0XHRpZiAodGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdFx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMuY2xlYXJhYmxlICYmIHRoaXMucHJvcHMuZXNjYXBlQ2xlYXJzVmFsdWUpIHtcblx0XHRcdFx0XHR0aGlzLmNsZWFyVmFsdWUoZXZlbnQpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzg6IC8vIHVwXG5cdFx0XHRcdHRoaXMuZm9jdXNQcmV2aW91c09wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDQwOiAvLyBkb3duXG5cdFx0XHRcdHRoaXMuZm9jdXNOZXh0T3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzM6IC8vIHBhZ2UgdXBcblx0XHRcdFx0dGhpcy5mb2N1c1BhZ2VVcE9wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM0OiAvLyBwYWdlIGRvd25cblx0XHRcdFx0dGhpcy5mb2N1c1BhZ2VEb3duT3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzU6IC8vIGVuZCBrZXlcblx0XHRcdFx0aWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuZm9jdXNFbmRPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzNjogLy8gaG9tZSBrZXlcblx0XHRcdFx0aWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuZm9jdXNTdGFydE9wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDQ2OiAvLyBiYWNrc3BhY2Vcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgdGhpcy5wcm9wcy5kZWxldGVSZW1vdmVzKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLnBvcFZhbHVlKCk7XG5cdFx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRcdGRlZmF1bHQ6IHJldHVybjtcblx0XHR9XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fSxcblxuXHRoYW5kbGVWYWx1ZUNsaWNrIChvcHRpb24sIGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLm9uVmFsdWVDbGljaykgcmV0dXJuO1xuXHRcdHRoaXMucHJvcHMub25WYWx1ZUNsaWNrKG9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZU1lbnVTY3JvbGwgKGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLm9uTWVudVNjcm9sbFRvQm90dG9tKSByZXR1cm47XG5cdFx0bGV0IHsgdGFyZ2V0IH0gPSBldmVudDtcblx0XHRpZiAodGFyZ2V0LnNjcm9sbEhlaWdodCA+IHRhcmdldC5vZmZzZXRIZWlnaHQgJiYgISh0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0Lm9mZnNldEhlaWdodCAtIHRhcmdldC5zY3JvbGxUb3ApKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uTWVudVNjcm9sbFRvQm90dG9tKCk7XG5cdFx0fVxuXHR9LFxuXG5cdGhhbmRsZVJlcXVpcmVkICh2YWx1ZSwgbXVsdGkpIHtcblx0XHRpZiAoIXZhbHVlKSByZXR1cm4gdHJ1ZTtcblx0XHRyZXR1cm4gKG11bHRpID8gdmFsdWUubGVuZ3RoID09PSAwIDogT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMCk7XG5cdH0sXG5cblx0Z2V0T3B0aW9uTGFiZWwgKG9wKSB7XG5cdFx0cmV0dXJuIG9wW3RoaXMucHJvcHMubGFiZWxLZXldO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBUdXJucyBhIHZhbHVlIGludG8gYW4gYXJyYXkgZnJvbSB0aGUgZ2l2ZW4gb3B0aW9uc1xuXHQgKiBAcGFyYW1cdHtTdHJpbmd8TnVtYmVyfEFycmF5fVx0dmFsdWVcdFx0LSB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBpbnB1dFxuXHQgKiBAcGFyYW1cdHtPYmplY3R9XHRcdG5leHRQcm9wc1x0LSBvcHRpb25hbGx5IHNwZWNpZnkgdGhlIG5leHRQcm9wcyBzbyB0aGUgcmV0dXJuZWQgYXJyYXkgdXNlcyB0aGUgbGF0ZXN0IGNvbmZpZ3VyYXRpb25cblx0ICogQHJldHVybnNcdHtBcnJheX1cdHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IHJlcHJlc2VudGVkIGluIGFuIGFycmF5XG5cdCAqL1xuXHRnZXRWYWx1ZUFycmF5ICh2YWx1ZSwgbmV4dFByb3BzKSB7XG5cdFx0LyoqIHN1cHBvcnQgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgbmV4dFByb3BzYCBzbyBgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc2AgdXBkYXRlcyB3aWxsIGZ1bmN0aW9uIGFzIGV4cGVjdGVkICovXG5cdFx0Y29uc3QgcHJvcHMgPSB0eXBlb2YgbmV4dFByb3BzID09PSAnb2JqZWN0JyA/IG5leHRQcm9wcyA6IHRoaXMucHJvcHM7XG5cdFx0aWYgKHByb3BzLm11bHRpKSB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgdmFsdWUgPSB2YWx1ZS5zcGxpdChwcm9wcy5kZWxpbWl0ZXIpO1xuXHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFtdO1xuXHRcdFx0XHR2YWx1ZSA9IFt2YWx1ZV07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWUubWFwKHZhbHVlID0+IHRoaXMuZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKSkuZmlsdGVyKGkgPT4gaSk7XG5cdFx0fVxuXHRcdHZhciBleHBhbmRlZFZhbHVlID0gdGhpcy5leHBhbmRWYWx1ZSh2YWx1ZSwgcHJvcHMpO1xuXHRcdHJldHVybiBleHBhbmRlZFZhbHVlID8gW2V4cGFuZGVkVmFsdWVdIDogW107XG5cdH0sXG5cblx0LyoqXG5cdCAqIFJldHJpZXZlIGEgdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gb3B0aW9ucyBhbmQgdmFsdWVLZXlcblx0ICogQHBhcmFtXHR7U3RyaW5nfE51bWJlcnxBcnJheX1cdHZhbHVlXHQtIHRoZSBzZWxlY3RlZCB2YWx1ZShzKVxuXHQgKiBAcGFyYW1cdHtPYmplY3R9XHRcdHByb3BzXHQtIHRoZSBTZWxlY3QgY29tcG9uZW50J3MgcHJvcHMgKG9yIG5leHRQcm9wcylcblx0ICovXG5cdGV4cGFuZFZhbHVlICh2YWx1ZSwgcHJvcHMpIHtcblx0XHRjb25zdCB2YWx1ZVR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdFx0aWYgKHZhbHVlVHlwZSAhPT0gJ3N0cmluZycgJiYgdmFsdWVUeXBlICE9PSAnbnVtYmVyJyAmJiB2YWx1ZVR5cGUgIT09ICdib29sZWFuJykgcmV0dXJuIHZhbHVlO1xuXHRcdGxldCB7IG9wdGlvbnMsIHZhbHVlS2V5IH0gPSBwcm9wcztcblx0XHRpZiAoIW9wdGlvbnMpIHJldHVybjtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChvcHRpb25zW2ldW3ZhbHVlS2V5XSA9PT0gdmFsdWUpIHJldHVybiBvcHRpb25zW2ldO1xuXHRcdH1cblx0fSxcblxuXHRzZXRWYWx1ZSAodmFsdWUpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5hdXRvQmx1cil7XG5cdFx0XHR0aGlzLmJsdXJJbnB1dCgpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMucHJvcHMub25DaGFuZ2UpIHJldHVybjtcblx0XHRpZiAodGhpcy5wcm9wcy5yZXF1aXJlZCkge1xuXHRcdFx0Y29uc3QgcmVxdWlyZWQgPSB0aGlzLmhhbmRsZVJlcXVpcmVkKHZhbHVlLCB0aGlzLnByb3BzLm11bHRpKTtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyByZXF1aXJlZCB9KTtcblx0XHR9XG5cdFx0aWYgKHRoaXMucHJvcHMuc2ltcGxlVmFsdWUgJiYgdmFsdWUpIHtcblx0XHRcdHZhbHVlID0gdGhpcy5wcm9wcy5tdWx0aSA/IHZhbHVlLm1hcChpID0+IGlbdGhpcy5wcm9wcy52YWx1ZUtleV0pLmpvaW4odGhpcy5wcm9wcy5kZWxpbWl0ZXIpIDogdmFsdWVbdGhpcy5wcm9wcy52YWx1ZUtleV07XG5cdFx0fVxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWUpO1xuXHR9LFxuXG5cdHNlbGVjdFZhbHVlICh2YWx1ZSkge1xuXHRcdC8vTk9URTogdXBkYXRlIHZhbHVlIGluIHRoZSBjYWxsYmFjayB0byBtYWtlIHN1cmUgdGhlIGlucHV0IHZhbHVlIGlzIGVtcHR5IHNvIHRoYXQgdGhlcmUgYXJlIG5vIHN0eWxpbmcgaXNzdWVzIChDaHJvbWUgaGFkIGlzc3VlIG90aGVyd2lzZSlcblx0XHR0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSBmYWxzZTtcblx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0XHRmb2N1c2VkSW5kZXg6IG51bGxcblx0XHRcdH0sICgpID0+IHtcblx0XHRcdFx0dGhpcy5hZGRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkLFxuXHRcdFx0fSwgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcblxuXHRhZGRWYWx1ZSAodmFsdWUpIHtcblx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlQXJyYXkuY29uY2F0KHZhbHVlKSk7XG5cdH0sXG5cblx0cG9wVmFsdWUgKCkge1xuXHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdGlmICghdmFsdWVBcnJheS5sZW5ndGgpIHJldHVybjtcblx0XHRpZiAodmFsdWVBcnJheVt2YWx1ZUFycmF5Lmxlbmd0aC0xXS5jbGVhcmFibGVWYWx1ZSA9PT0gZmFsc2UpIHJldHVybjtcblx0XHR0aGlzLnNldFZhbHVlKHZhbHVlQXJyYXkuc2xpY2UoMCwgdmFsdWVBcnJheS5sZW5ndGggLSAxKSk7XG5cdH0sXG5cblx0cmVtb3ZlVmFsdWUgKHZhbHVlKSB7XG5cdFx0dmFyIHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZUFycmF5LmZpbHRlcihpID0+IGkgIT09IHZhbHVlKSk7XG5cdFx0dGhpcy5mb2N1cygpO1xuXHR9LFxuXG5cdGNsZWFyVmFsdWUgKGV2ZW50KSB7XG5cdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdC8vIGJ1dHRvbiwgaWdub3JlIGl0LlxuXHRcdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnNldFZhbHVlKHRoaXMuZ2V0UmVzZXRWYWx1ZSgpKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHR9LCB0aGlzLmZvY3VzKTtcblx0fSxcblxuXHRnZXRSZXNldFZhbHVlKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLnJlc2V0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMucmVzZXRWYWx1ZTtcblx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMubXVsdGkpIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdGZvY3VzT3B0aW9uIChvcHRpb24pIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZvY3VzZWRPcHRpb246IG9wdGlvblxuXHRcdH0pO1xuXHR9LFxuXG5cdGZvY3VzTmV4dE9wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCduZXh0Jyk7XG5cdH0sXG5cblx0Zm9jdXNQcmV2aW91c09wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwcmV2aW91cycpO1xuXHR9LFxuXG5cdGZvY3VzUGFnZVVwT3B0aW9uICgpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3BhZ2VfdXAnKTtcblx0fSxcblxuXHRmb2N1c1BhZ2VEb3duT3B0aW9uICgpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3BhZ2VfZG93bicpO1xuXHR9LFxuXG5cdGZvY3VzU3RhcnRPcHRpb24gKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignc3RhcnQnKTtcblx0fSxcblxuXHRmb2N1c0VuZE9wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdlbmQnKTtcblx0fSxcblxuXHRmb2N1c0FkamFjZW50T3B0aW9uIChkaXIpIHtcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zXG5cdFx0XHQubWFwKChvcHRpb24sIGluZGV4KSA9PiAoeyBvcHRpb24sIGluZGV4IH0pKVxuXHRcdFx0LmZpbHRlcihvcHRpb24gPT4gIW9wdGlvbi5vcHRpb24uZGlzYWJsZWQpO1xuXHRcdHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlID0gdHJ1ZTtcblx0XHRpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdFx0Zm9jdXNlZE9wdGlvbjogdGhpcy5fZm9jdXNlZE9wdGlvbiB8fCBvcHRpb25zW2RpciA9PT0gJ25leHQnID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMV0ub3B0aW9uXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKCFvcHRpb25zLmxlbmd0aCkgcmV0dXJuO1xuXHRcdHZhciBmb2N1c2VkSW5kZXggPSAtMTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLl9mb2N1c2VkT3B0aW9uID09PSBvcHRpb25zW2ldLm9wdGlvbikge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGRpciA9PT0gJ25leHQnICYmIGZvY3VzZWRJbmRleCAhPT0gLTEgKSB7XG5cdFx0XHRmb2N1c2VkSW5kZXggPSAoZm9jdXNlZEluZGV4ICsgMSkgJSBvcHRpb25zLmxlbmd0aDtcblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3ByZXZpb3VzJykge1xuXHRcdFx0aWYgKGZvY3VzZWRJbmRleCA+IDApIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gZm9jdXNlZEluZGV4IC0gMTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3N0YXJ0Jykge1xuXHRcdFx0Zm9jdXNlZEluZGV4ID0gMDtcblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ2VuZCcpIHtcblx0XHRcdGZvY3VzZWRJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3BhZ2VfdXAnKSB7XG5cdFx0XHR2YXIgcG90ZW50aWFsSW5kZXggPSBmb2N1c2VkSW5kZXggLSB0aGlzLnByb3BzLnBhZ2VTaXplO1xuXHRcdFx0aWYgKCBwb3RlbnRpYWxJbmRleCA8IDAgKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IDA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBwb3RlbnRpYWxJbmRleDtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3BhZ2VfZG93bicpIHtcblx0XHRcdHZhciBwb3RlbnRpYWxJbmRleCA9IGZvY3VzZWRJbmRleCArIHRoaXMucHJvcHMucGFnZVNpemU7XG5cdFx0XHRpZiAoIHBvdGVudGlhbEluZGV4ID4gb3B0aW9ucy5sZW5ndGggLSAxICkge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBwb3RlbnRpYWxJbmRleDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuXHRcdFx0Zm9jdXNlZEluZGV4ID0gMDtcblx0XHR9XG5cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZvY3VzZWRJbmRleDogb3B0aW9uc1tmb2N1c2VkSW5kZXhdLmluZGV4LFxuXHRcdFx0Zm9jdXNlZE9wdGlvbjogb3B0aW9uc1tmb2N1c2VkSW5kZXhdLm9wdGlvblxuXHRcdH0pO1xuXHR9LFxuXG5cdGdldEZvY3VzZWRPcHRpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9mb2N1c2VkT3B0aW9uO1xuXHR9LFxuXG5cdGdldElucHV0VmFsdWUgKCkge1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLmlucHV0VmFsdWU7XG5cdH0sXG5cblx0c2VsZWN0Rm9jdXNlZE9wdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX2ZvY3VzZWRPcHRpb24pIHtcblx0XHRcdHJldHVybiB0aGlzLnNlbGVjdFZhbHVlKHRoaXMuX2ZvY3VzZWRPcHRpb24pO1xuXHRcdH1cblx0fSxcblxuXHRyZW5kZXJMb2FkaW5nICgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNMb2FkaW5nKSByZXR1cm47XG5cdFx0cmV0dXJuIChcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1sb2FkaW5nLXpvbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LWxvYWRpbmdcIiAvPlxuXHRcdFx0PC9zcGFuPlxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyVmFsdWUgKHZhbHVlQXJyYXksIGlzT3Blbikge1xuXHRcdGxldCByZW5kZXJMYWJlbCA9IHRoaXMucHJvcHMudmFsdWVSZW5kZXJlciB8fCB0aGlzLmdldE9wdGlvbkxhYmVsO1xuXHRcdGxldCBWYWx1ZUNvbXBvbmVudCA9IHRoaXMucHJvcHMudmFsdWVDb21wb25lbnQ7XG5cdFx0aWYgKCF2YWx1ZUFycmF5Lmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuICF0aGlzLnN0YXRlLmlucHV0VmFsdWUgPyA8ZGl2IGNsYXNzTmFtZT1cIlNlbGVjdC1wbGFjZWhvbGRlclwiPnt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfTwvZGl2PiA6IG51bGw7XG5cdFx0fVxuXHRcdGxldCBvbkNsaWNrID0gdGhpcy5wcm9wcy5vblZhbHVlQ2xpY2sgPyB0aGlzLmhhbmRsZVZhbHVlQ2xpY2sgOiBudWxsO1xuXHRcdGlmICh0aGlzLnByb3BzLm11bHRpKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWVBcnJheS5tYXAoKHZhbHVlLCBpKSA9PiB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFZhbHVlQ29tcG9uZW50XG5cdFx0XHRcdFx0XHRpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlLScgKyBpfVxuXHRcdFx0XHRcdFx0aW5zdGFuY2VQcmVmaXg9e3RoaXMuX2luc3RhbmNlUHJlZml4fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWQgfHwgdmFsdWUuY2xlYXJhYmxlVmFsdWUgPT09IGZhbHNlfVxuXHRcdFx0XHRcdFx0a2V5PXtgdmFsdWUtJHtpfS0ke3ZhbHVlW3RoaXMucHJvcHMudmFsdWVLZXldfWB9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtvbkNsaWNrfVxuXHRcdFx0XHRcdFx0b25SZW1vdmU9e3RoaXMucmVtb3ZlVmFsdWV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0e3JlbmRlckxhYmVsKHZhbHVlLCBpKX1cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1hcmlhLW9ubHlcIj4mbmJzcDs8L3NwYW4+XG5cdFx0XHRcdFx0PC9WYWx1ZUNvbXBvbmVudD5cblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSkge1xuXHRcdFx0aWYgKGlzT3Blbikgb25DbGljayA9IG51bGw7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8VmFsdWVDb21wb25lbnRcblx0XHRcdFx0XHRpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlLWl0ZW0nfVxuXHRcdFx0XHRcdGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdGluc3RhbmNlUHJlZml4PXt0aGlzLl9pbnN0YW5jZVByZWZpeH1cblx0XHRcdFx0XHRvbkNsaWNrPXtvbkNsaWNrfVxuXHRcdFx0XHRcdHZhbHVlPXt2YWx1ZUFycmF5WzBdfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0e3JlbmRlckxhYmVsKHZhbHVlQXJyYXlbMF0pfVxuXHRcdFx0XHQ8L1ZhbHVlQ29tcG9uZW50PlxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cblx0cmVuZGVySW5wdXQgKHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb25JbmRleCkge1xuXHRcdHZhciBjbGFzc05hbWUgPSBjbGFzc05hbWVzKCdTZWxlY3QtaW5wdXQnLCB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKTtcblx0XHRjb25zdCBpc09wZW4gPSAhIXRoaXMuc3RhdGUuaXNPcGVuO1xuXG5cdFx0Y29uc3QgYXJpYU93bnMgPSBjbGFzc05hbWVzKHtcblx0XHRcdFt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCddOiBpc09wZW4sXG5cdFx0XHRbdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWJhY2tzcGFjZS1yZW1vdmUtbWVzc2FnZSddOiB0aGlzLnByb3BzLm11bHRpXG5cdFx0XHRcdCYmICF0aGlzLnByb3BzLmRpc2FibGVkXG5cdFx0XHRcdCYmIHRoaXMuc3RhdGUuaXNGb2N1c2VkXG5cdFx0XHRcdCYmICF0aGlzLnN0YXRlLmlucHV0VmFsdWVcblx0XHR9KTtcblxuXHRcdC8vIFRPRE86IENoZWNrIGhvdyB0aGlzIHByb2plY3QgaW5jbHVkZXMgT2JqZWN0LmFzc2lnbigpXG5cdFx0Y29uc3QgaW5wdXRQcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuaW5wdXRQcm9wcywge1xuXHRcdFx0cm9sZTogJ2NvbWJvYm94Jyxcblx0XHRcdCdhcmlhLWV4cGFuZGVkJzogJycgKyBpc09wZW4sXG5cdFx0XHQnYXJpYS1vd25zJzogYXJpYU93bnMsXG5cdFx0XHQnYXJpYS1oYXNwb3B1cCc6ICcnICsgaXNPcGVuLFxuXHRcdFx0J2FyaWEtYWN0aXZlZGVzY2VuZGFudCc6IGlzT3BlbiA/IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIGZvY3VzZWRPcHRpb25JbmRleCA6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZScsXG5cdFx0XHQnYXJpYS1sYWJlbGxlZGJ5JzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbGxlZGJ5J10sXG5cdFx0XHQnYXJpYS1sYWJlbCc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSxcblx0XHRcdGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0dGFiSW5kZXg6IHRoaXMucHJvcHMudGFiSW5kZXgsXG5cdFx0XHRvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXRCbHVyLFxuXHRcdFx0b25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsXG5cdFx0XHRvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG5cdFx0XHRyZWY6IHJlZiA9PiB0aGlzLmlucHV0ID0gcmVmLFxuXHRcdFx0cmVxdWlyZWQ6IHRoaXMuc3RhdGUucmVxdWlyZWQsXG5cdFx0XHR2YWx1ZTogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKGlucHV0UHJvcHMpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8ICF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcblx0XHRcdGNvbnN0IHsgaW5wdXRDbGFzc05hbWUsIC4uLmRpdlByb3BzIH0gPSB0aGlzLnByb3BzLmlucHV0UHJvcHM7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0ey4uLmRpdlByb3BzfVxuXHRcdFx0XHRcdHJvbGU9XCJjb21ib2JveFwiXG5cdFx0XHRcdFx0YXJpYS1leHBhbmRlZD17aXNPcGVufVxuXHRcdFx0XHRcdGFyaWEtb3ducz17aXNPcGVuID8gdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWxpc3QnIDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJ31cblx0XHRcdFx0XHRhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2lzT3BlbiA/IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIGZvY3VzZWRPcHRpb25JbmRleCA6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZSd9XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0dGFiSW5kZXg9e3RoaXMucHJvcHMudGFiSW5kZXggfHwgMH1cblx0XHRcdFx0XHRvbkJsdXI9e3RoaXMuaGFuZGxlSW5wdXRCbHVyfVxuXHRcdFx0XHRcdG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1c31cblx0XHRcdFx0XHRyZWY9e3JlZiA9PiB0aGlzLmlucHV0ID0gcmVmfVxuXHRcdFx0XHRcdGFyaWEtcmVhZG9ubHk9eycnICsgISF0aGlzLnByb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdHN0eWxlPXt7IGJvcmRlcjogMCwgd2lkdGg6IDEsIGRpc3BsYXk6J2lubGluZS1ibG9jaycgfX0vPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcm9wcy5hdXRvc2l6ZSkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEF1dG9zaXplSW5wdXQgey4uLmlucHV0UHJvcHN9IG1pbldpZHRoPVwiNVwiIC8+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9eyBjbGFzc05hbWUgfT5cblx0XHRcdFx0PGlucHV0IHsuLi5pbnB1dFByb3BzfSAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXJDbGVhciAoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLmNsZWFyYWJsZSB8fCAoIXRoaXMucHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy52YWx1ZSA9PT0gMCkgfHwgKHRoaXMucHJvcHMubXVsdGkgJiYgIXRoaXMucHJvcHMudmFsdWUubGVuZ3RoKSB8fCB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRoaXMucHJvcHMuaXNMb2FkaW5nKSByZXR1cm47XG5cdFx0cmV0dXJuIChcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1jbGVhci16b25lXCIgdGl0bGU9e3RoaXMucHJvcHMubXVsdGkgPyB0aGlzLnByb3BzLmNsZWFyQWxsVGV4dCA6IHRoaXMucHJvcHMuY2xlYXJWYWx1ZVRleHR9XG5cdFx0XHRcdGFyaWEtbGFiZWw9e3RoaXMucHJvcHMubXVsdGkgPyB0aGlzLnByb3BzLmNsZWFyQWxsVGV4dCA6IHRoaXMucHJvcHMuY2xlYXJWYWx1ZVRleHR9XG5cdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmNsZWFyVmFsdWV9XG5cdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRvblRvdWNoTW92ZT17dGhpcy5oYW5kbGVUb3VjaE1vdmV9XG5cdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmRDbGVhclZhbHVlfVxuXHRcdFx0PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtY2xlYXJcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6ICcmdGltZXM7JyB9fSAvPlxuXHRcdFx0PC9zcGFuPlxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyQXJyb3cgKCkge1xuXHRcdGNvbnN0IG9uTW91c2VEb3duID0gdGhpcy5oYW5kbGVNb3VzZURvd25PbkFycm93O1xuXHRcdGNvbnN0IGFycm93ID0gdGhpcy5wcm9wcy5hcnJvd1JlbmRlcmVyKHsgb25Nb3VzZURvd24gfSk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNwYW5cblx0XHRcdFx0Y2xhc3NOYW1lPVwiU2VsZWN0LWFycm93LXpvbmVcIlxuXHRcdFx0XHRvbk1vdXNlRG93bj17b25Nb3VzZURvd259XG5cdFx0XHQ+XG5cdFx0XHRcdHthcnJvd31cblx0XHRcdDwvc3Bhbj5cblx0XHQpO1xuXHR9LFxuXG5cdGZpbHRlck9wdGlvbnMgKGV4Y2x1ZGVPcHRpb25zKSB7XG5cdFx0dmFyIGZpbHRlclZhbHVlID0gdGhpcy5zdGF0ZS5pbnB1dFZhbHVlO1xuXHRcdHZhciBvcHRpb25zID0gdGhpcy5wcm9wcy5vcHRpb25zIHx8IFtdO1xuXHRcdGlmICh0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMpIHtcblx0XHRcdC8vIE1haW50YWluIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggYm9vbGVhbiBhdHRyaWJ1dGVcblx0XHRcdGNvbnN0IGZpbHRlck9wdGlvbnMgPSB0eXBlb2YgdGhpcy5wcm9wcy5maWx0ZXJPcHRpb25zID09PSAnZnVuY3Rpb24nXG5cdFx0XHRcdD8gdGhpcy5wcm9wcy5maWx0ZXJPcHRpb25zXG5cdFx0XHRcdDogZGVmYXVsdEZpbHRlck9wdGlvbnM7XG5cblx0XHRcdHJldHVybiBmaWx0ZXJPcHRpb25zKFxuXHRcdFx0XHRvcHRpb25zLFxuXHRcdFx0XHRmaWx0ZXJWYWx1ZSxcblx0XHRcdFx0ZXhjbHVkZU9wdGlvbnMsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmaWx0ZXJPcHRpb246IHRoaXMucHJvcHMuZmlsdGVyT3B0aW9uLFxuXHRcdFx0XHRcdGlnbm9yZUFjY2VudHM6IHRoaXMucHJvcHMuaWdub3JlQWNjZW50cyxcblx0XHRcdFx0XHRpZ25vcmVDYXNlOiB0aGlzLnByb3BzLmlnbm9yZUNhc2UsXG5cdFx0XHRcdFx0bGFiZWxLZXk6IHRoaXMucHJvcHMubGFiZWxLZXksXG5cdFx0XHRcdFx0bWF0Y2hQb3M6IHRoaXMucHJvcHMubWF0Y2hQb3MsXG5cdFx0XHRcdFx0bWF0Y2hQcm9wOiB0aGlzLnByb3BzLm1hdGNoUHJvcCxcblx0XHRcdFx0XHR2YWx1ZUtleTogdGhpcy5wcm9wcy52YWx1ZUtleSxcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0fVxuXHR9LFxuXG5cdG9uT3B0aW9uUmVmKHJlZiwgaXNGb2N1c2VkKSB7XG5cdFx0aWYgKGlzRm9jdXNlZCkge1xuXHRcdFx0dGhpcy5mb2N1c2VkID0gcmVmO1xuXHRcdH1cblx0fSxcblxuXHRyZW5kZXJNZW51IChvcHRpb25zLCB2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uKSB7XG5cdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5sZW5ndGgpIHtcblx0XHRcdHJldHVybiB0aGlzLnByb3BzLm1lbnVSZW5kZXJlcih7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb24sXG5cdFx0XHRcdGZvY3VzT3B0aW9uOiB0aGlzLmZvY3VzT3B0aW9uLFxuXHRcdFx0XHRpbnN0YW5jZVByZWZpeDogdGhpcy5faW5zdGFuY2VQcmVmaXgsXG5cdFx0XHRcdGxhYmVsS2V5OiB0aGlzLnByb3BzLmxhYmVsS2V5LFxuXHRcdFx0XHRvbkZvY3VzOiB0aGlzLmZvY3VzT3B0aW9uLFxuXHRcdFx0XHRvblNlbGVjdDogdGhpcy5zZWxlY3RWYWx1ZSxcblx0XHRcdFx0b3B0aW9uQ2xhc3NOYW1lOiB0aGlzLnByb3BzLm9wdGlvbkNsYXNzTmFtZSxcblx0XHRcdFx0b3B0aW9uQ29tcG9uZW50OiB0aGlzLnByb3BzLm9wdGlvbkNvbXBvbmVudCxcblx0XHRcdFx0b3B0aW9uUmVuZGVyZXI6IHRoaXMucHJvcHMub3B0aW9uUmVuZGVyZXIgfHwgdGhpcy5nZXRPcHRpb25MYWJlbCxcblx0XHRcdFx0b3B0aW9ucyxcblx0XHRcdFx0c2VsZWN0VmFsdWU6IHRoaXMuc2VsZWN0VmFsdWUsXG5cdFx0XHRcdHZhbHVlQXJyYXksXG5cdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnByb3BzLnZhbHVlS2V5LFxuXHRcdFx0XHRvbk9wdGlvblJlZjogdGhpcy5vbk9wdGlvblJlZixcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5ub1Jlc3VsdHNUZXh0KSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlNlbGVjdC1ub3Jlc3VsdHNcIj5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5ub1Jlc3VsdHNUZXh0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fSxcblxuXHRyZW5kZXJIaWRkZW5GaWVsZCAodmFsdWVBcnJheSkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5uYW1lKSByZXR1cm47XG5cdFx0aWYgKHRoaXMucHJvcHMuam9pblZhbHVlcykge1xuXHRcdFx0bGV0IHZhbHVlID0gdmFsdWVBcnJheS5tYXAoaSA9PiBzdHJpbmdpZnlWYWx1ZShpW3RoaXMucHJvcHMudmFsdWVLZXldKSkuam9pbih0aGlzLnByb3BzLmRlbGltaXRlcik7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8aW5wdXRcblx0XHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcblx0XHRcdFx0XHRyZWY9e3JlZiA9PiB0aGlzLnZhbHVlID0gcmVmfVxuXHRcdFx0XHRcdG5hbWU9e3RoaXMucHJvcHMubmFtZX1cblx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9IC8+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVBcnJheS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG5cdFx0XHQ8aW5wdXQga2V5PXsnaGlkZGVuLicgKyBpbmRleH1cblx0XHRcdFx0dHlwZT1cImhpZGRlblwiXG5cdFx0XHRcdHJlZj17J3ZhbHVlJyArIGluZGV4fVxuXHRcdFx0XHRuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG5cdFx0XHRcdHZhbHVlPXtzdHJpbmdpZnlWYWx1ZShpdGVtW3RoaXMucHJvcHMudmFsdWVLZXldKX1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9IC8+XG5cdFx0KSk7XG5cdH0sXG5cblx0Z2V0Rm9jdXNhYmxlT3B0aW9uSW5kZXggKHNlbGVjdGVkT3B0aW9uKSB7XG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9ucztcblx0XHRpZiAoIW9wdGlvbnMubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuXHRcdGxldCBmb2N1c2VkT3B0aW9uID0gdGhpcy5zdGF0ZS5mb2N1c2VkT3B0aW9uIHx8IHNlbGVjdGVkT3B0aW9uO1xuXHRcdGlmIChmb2N1c2VkT3B0aW9uICYmICFmb2N1c2VkT3B0aW9uLmRpc2FibGVkKSB7XG5cdFx0XHRjb25zdCBmb2N1c2VkT3B0aW9uSW5kZXggPSBvcHRpb25zLmluZGV4T2YoZm9jdXNlZE9wdGlvbik7XG5cdFx0XHRpZiAoZm9jdXNlZE9wdGlvbkluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRyZXR1cm4gZm9jdXNlZE9wdGlvbkluZGV4O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCFvcHRpb25zW2ldLmRpc2FibGVkKSByZXR1cm4gaTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0cmVuZGVyT3V0ZXIgKG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIHtcblx0XHRsZXQgbWVudSA9IHRoaXMucmVuZGVyTWVudShvcHRpb25zLCB2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uKTtcblx0XHRpZiAoIW1lbnUpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IHJlZj17cmVmID0+IHRoaXMubWVudUNvbnRhaW5lciA9IHJlZn0gY2xhc3NOYW1lPVwiU2VsZWN0LW1lbnUtb3V0ZXJcIiBzdHlsZT17dGhpcy5wcm9wcy5tZW51Q29udGFpbmVyU3R5bGV9PlxuXHRcdFx0XHQ8ZGl2IHJlZj17cmVmID0+IHRoaXMubWVudSA9IHJlZn0gcm9sZT1cImxpc3Rib3hcIiBjbGFzc05hbWU9XCJTZWxlY3QtbWVudVwiIGlkPXt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCd9XG5cdFx0XHRcdFx0XHQgc3R5bGU9e3RoaXMucHJvcHMubWVudVN0eWxlfVxuXHRcdFx0XHRcdFx0IG9uU2Nyb2xsPXt0aGlzLmhhbmRsZU1lbnVTY3JvbGx9XG5cdFx0XHRcdFx0XHQgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3duT25NZW51fT5cblx0XHRcdFx0XHR7bWVudX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlciAoKSB7XG5cdFx0bGV0IHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0bGV0IG9wdGlvbnMgPVx0dGhpcy5fdmlzaWJsZU9wdGlvbnMgPSB0aGlzLmZpbHRlck9wdGlvbnModGhpcy5wcm9wcy5tdWx0aSA/IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKSA6IG51bGwpO1xuXHRcdGxldCBpc09wZW4gPSB0aGlzLnN0YXRlLmlzT3Blbjtcblx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSAmJiAhb3B0aW9ucy5sZW5ndGggJiYgdmFsdWVBcnJheS5sZW5ndGggJiYgIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSkgaXNPcGVuID0gZmFsc2U7XG5cdFx0Y29uc3QgZm9jdXNlZE9wdGlvbkluZGV4ID0gdGhpcy5nZXRGb2N1c2FibGVPcHRpb25JbmRleCh2YWx1ZUFycmF5WzBdKTtcblxuXHRcdGxldCBmb2N1c2VkT3B0aW9uID0gbnVsbDtcblx0XHRpZiAoZm9jdXNlZE9wdGlvbkluZGV4ICE9PSBudWxsKSB7XG5cdFx0XHRmb2N1c2VkT3B0aW9uID0gdGhpcy5fZm9jdXNlZE9wdGlvbiA9IG9wdGlvbnNbZm9jdXNlZE9wdGlvbkluZGV4XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9jdXNlZE9wdGlvbiA9IHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBudWxsO1xuXHRcdH1cblx0XHRsZXQgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygnU2VsZWN0JywgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcblx0XHRcdCdTZWxlY3QtLW11bHRpJzogdGhpcy5wcm9wcy5tdWx0aSxcblx0XHRcdCdTZWxlY3QtLXNpbmdsZSc6ICF0aGlzLnByb3BzLm11bHRpLFxuXHRcdFx0J2lzLWRpc2FibGVkJzogdGhpcy5wcm9wcy5kaXNhYmxlZCxcblx0XHRcdCdpcy1mb2N1c2VkJzogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQsXG5cdFx0XHQnaXMtbG9hZGluZyc6IHRoaXMucHJvcHMuaXNMb2FkaW5nLFxuXHRcdFx0J2lzLW9wZW4nOiBpc09wZW4sXG5cdFx0XHQnaXMtcHNldWRvLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmlzUHNldWRvRm9jdXNlZCxcblx0XHRcdCdpcy1zZWFyY2hhYmxlJzogdGhpcy5wcm9wcy5zZWFyY2hhYmxlLFxuXHRcdFx0J2hhcy12YWx1ZSc6IHZhbHVlQXJyYXkubGVuZ3RoLFxuXHRcdH0pO1xuXG5cdFx0bGV0IHJlbW92ZU1lc3NhZ2UgPSBudWxsO1xuXHRcdGlmICh0aGlzLnByb3BzLm11bHRpICYmXG5cdFx0XHQhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJlxuXHRcdFx0dmFsdWVBcnJheS5sZW5ndGggJiZcblx0XHRcdCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiZcblx0XHRcdHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmXG5cdFx0XHR0aGlzLnByb3BzLmJhY2tzcGFjZVJlbW92ZXMpIHtcblx0XHRcdHJlbW92ZU1lc3NhZ2UgPSAoXG5cdFx0XHRcdDxzcGFuIGlkPXt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctYmFja3NwYWNlLXJlbW92ZS1tZXNzYWdlJ30gY2xhc3NOYW1lPVwiU2VsZWN0LWFyaWEtb25seVwiIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZS5yZXBsYWNlKCd7bGFiZWx9JywgdmFsdWVBcnJheVt2YWx1ZUFycmF5Lmxlbmd0aCAtIDFdW3RoaXMucHJvcHMubGFiZWxLZXldKX1cblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiByZWY9e3JlZiA9PiB0aGlzLndyYXBwZXIgPSByZWZ9XG5cdFx0XHRcdCBjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0IHN0eWxlPXt0aGlzLnByb3BzLndyYXBwZXJTdHlsZX0+XG5cdFx0XHRcdHt0aGlzLnJlbmRlckhpZGRlbkZpZWxkKHZhbHVlQXJyYXkpfVxuXHRcdFx0XHQ8ZGl2IHJlZj17cmVmID0+IHRoaXMuY29udHJvbCA9IHJlZn1cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJTZWxlY3QtY29udHJvbFwiXG5cdFx0XHRcdFx0c3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG5cdFx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmR9XG5cdFx0XHRcdFx0b25Ub3VjaFN0YXJ0PXt0aGlzLmhhbmRsZVRvdWNoU3RhcnR9XG5cdFx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LW11bHRpLXZhbHVlLXdyYXBwZXJcIiBpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJ30+XG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSh2YWx1ZUFycmF5LCBpc09wZW4pfVxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVySW5wdXQodmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbkluZGV4KX1cblx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0e3JlbW92ZU1lc3NhZ2V9XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyTG9hZGluZygpfVxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckNsZWFyKCl9XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3coKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHtpc09wZW4gPyB0aGlzLnJlbmRlck91dGVyKG9wdGlvbnMsICF0aGlzLnByb3BzLm11bHRpID8gdmFsdWVBcnJheSA6IG51bGwsIGZvY3VzZWRPcHRpb24pIDogbnVsbH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDtcbiJdfQ==
