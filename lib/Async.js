'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _utilsStripDiacritics = require('./utils/stripDiacritics');

var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);

var requestId = 0;

function initCache(cache) {
	if (cache && typeof cache !== 'object') {
		cache = {};
	}
	return cache ? cache : null;
}

function updateCache(cache, input, data) {
	if (!cache) return;
	cache[input] = data;
}

function getFromCache(cache, input) {
	if (!cache) return;
	for (var i = input.length; i >= 0; --i) {
		var cacheKey = input.slice(0, i);
		if (cache[cacheKey] && (input === cacheKey || cache[cacheKey].complete)) {
			return cache[cacheKey];
		}
	}
}

function thenPromise(promise, callback) {
	if (!promise || typeof promise.then !== 'function') return;
	return promise.then(function (data) {
		callback(null, data);
	}, function (err) {
		callback(err);
	});
}

var stringOrNode = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]);

var Async = (function (_Component) {
	_inherits(Async, _Component);

	function Async() {
		_classCallCheck(this, Async);

		_get(Object.getPrototypeOf(Async.prototype), 'constructor', this).apply(this, arguments);

		this.state = {
			cache: initCache(this.props.cache),
			isLoading: false,
			options: []
		};
	}

	_createClass(Async, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._lastInput = '';
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.loadOptions('');
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.cache !== this.props.cache) {
				this.setState({
					cache: initCache(nextProps.cache)
				});
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.refs.select.focus();
		}
	}, {
		key: 'resetState',
		value: function resetState() {
			this._currentRequestId = -1;
			this.setState({
				isLoading: false,
				options: []
			});
		}
	}, {
		key: 'getResponseHandler',
		value: function getResponseHandler(input) {
			var _this = this;

			var _requestId = this._currentRequestId = requestId++;
			return function (err, data) {
				if (err) throw err;
				//if (!this.isMounted()) return;
				updateCache(_this.state.cache, input, data);
				if (_requestId !== _this._currentRequestId) return;
				_this.setState({
					isLoading: false,
					options: data && data.options || []
				});
			};
		}
	}, {
		key: 'loadOptions',
		value: function loadOptions(input) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(input);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null) {
					input = '' + nextState;
				}
			}
			if (this.props.ignoreAccents) input = (0, _utilsStripDiacritics2['default'])(input);
			if (this.props.ignoreCase) input = input.toLowerCase();

			this._lastInput = input;
			if (input.length < this.props.minimumInput) {
				return this.resetState();
			}
			var cacheResult = getFromCache(this.state.cache, input);
			if (cacheResult) {
				return this.setState({
					options: cacheResult.options
				});
			}
			this.setState({
				isLoading: true
			});
			var responseHandler = this.getResponseHandler(input);
			var inputPromise = thenPromise(this.props.loadOptions(input, responseHandler), responseHandler);
			return inputPromise ? inputPromise.then(function () {
				return input;
			}) : input;
		}
	}, {
		key: 'render',
		value: function render() {
			var noResultsText = this.props.noResultsText;
			var _state = this.state;
			var isLoading = _state.isLoading;
			var options = _state.options;

			if (this.props.isLoading) isLoading = true;
			var placeholder = isLoading ? this.props.loadingPlaceholder : this.props.placeholder;
			if (isLoading) {
				noResultsText = this.props.searchingText;
			} else if (!options.length && this._lastInput.length < this.props.minimumInput) {
				noResultsText = this.props.searchPromptText;
			}
			return _react2['default'].createElement(_Select2['default'], _extends({}, this.props, {
				ref: 'select',
				isLoading: isLoading,
				noResultsText: noResultsText,
				onInputChange: this.loadOptions,
				options: options,
				placeholder: placeholder
			}));
		}
	}]);

	return Async;
})(_react.Component);

Async.propTypes = {
	cache: _react2['default'].PropTypes.any, // object to use to cache results, can be null to disable cache
	ignoreAccents: _react2['default'].PropTypes.bool, // whether to strip diacritics when filtering (shared with Select)
	ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering (shared with Select)
	isLoading: _react2['default'].PropTypes.bool, // overrides the isLoading state when set to true
	loadOptions: _react2['default'].PropTypes.func.isRequired, // function to call to load options asynchronously
	loadingPlaceholder: _react2['default'].PropTypes.string, // replaces the placeholder while options are loading
	minimumInput: _react2['default'].PropTypes.number, // the minimum number of characters that trigger loadOptions
	noResultsText: stringOrNode, // placeholder displayed when there are no matching search results (shared with Select)
	onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function (inputValue) {}
	placeholder: stringOrNode, // field placeholder, displayed when there's no value (shared with Select)
	searchPromptText: stringOrNode, // label to prompt for search input
	searchingText: _react2['default'].PropTypes.string };

// message to display while options are loading
Async.defaultProps = {
	cache: true,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	minimumInput: 0,
	searchingText: 'Searching...',
	searchPromptText: 'Type to search'
};

module.exports = Async;