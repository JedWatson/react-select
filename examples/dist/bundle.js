require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/fraserxu/Desktop/tmp/react-select/node_modules/classnames/index.js":[function(require,module,exports){
function classnames() {
	var args = arguments, classes = [];
	for (var i = 0; i < args.length; i++) {
		if (args[i] && 'string' === typeof args[i]) {
			classes.push(args[i]);
		} else if ('object' === typeof args[i]) {
			classes = classes.concat(Object.keys(args[i]).filter(function(cls) {
				return args[i][cls];
			}));
		}
	}
	return classes.join(' ') || undefined;
}

module.exports = classnames;

},{}],"/Users/fraserxu/Desktop/tmp/react-select/src/Value.js":[function(require,module,exports){
var _ = require('underscore'),
	React = require('react'),
	classes = require('classnames');

var Option = React.createClass({

	displayName: 'Value',

	propTypes: {
		label: React.PropTypes.string.isRequired
	},

	blockEvent: function(event) {
		event.stopPropagation();
	},

	render: function() {
		return (
			React.createElement("div", {className: "Select-item"}, 
				React.createElement("span", {className: "Select-item-icon", onMouseDown: this.blockEvent, onTouchEnd: this.props.onRemove, onClick: this.props.onRemove}, "×"), 
				React.createElement("span", {className: "Select-item-label"}, this.props.label)
			)
		);
	}

});

module.exports = Option;

},{"classnames":"/Users/fraserxu/Desktop/tmp/react-select/node_modules/classnames/index.js","react":false,"underscore":false}],"react-select":[function(require,module,exports){
var _ = require('underscore'),
	React = require('react'),
	Input = require('react-input-autosize'),
	classes = require('classnames'),
	Value = require('./Value');

var requestId = 0;

var Select = React.createClass({

	displayName: 'Select',

	propTypes: {
		value: React.PropTypes.any,             // initial field value
		multi: React.PropTypes.bool,            // multi-value input
		options: React.PropTypes.array,         // array of options
		delimiter: React.PropTypes.string,      // delimiter to use to join multiple values
		asyncOptions: React.PropTypes.func,     // function to call to get options
		autoload: React.PropTypes.bool,         // whether to auto-load the default async options set
		placeholder: React.PropTypes.string,    // field placeholder, displayed when there's no value
		name: React.PropTypes.string,           // field name, for hidden <input /> tag
		onChange: React.PropTypes.func,         // onChange handler: function(newValue) {}
		className: React.PropTypes.string,      // className for the outer element
		filterOption: React.PropTypes.func,     // method to filter a single option: function(option, filterString)
		filterOptions: React.PropTypes.func,    // method to filter the options array: function([options], filterString, [values])
		matchPos: React.PropTypes.string,       // (any|start) match the start or entire string when filtering
		matchProp: React.PropTypes.string       // (any|label|value) which option property to filter on
	},

	getDefaultProps: function() {
		return {
			value: undefined,
			options: [],
			delimiter: ',',
			asyncOptions: undefined,
			autoload: true,
			placeholder: '',
			name: undefined,
			onChange: undefined,
			className: undefined,
			matchPos: 'any',
			matchProp: 'any'
		};
	},

	getInitialState: function() {
		return {
			/*
			 * set by getStateFromValue on componentWillMount:
			 * - value
			 * - values
			 * - filteredOptions
			 * - inputValue
			 * - placeholder
			 * - focusedOption
			*/
			options: this.props.options,
			isFocused: false,
			isOpen: false,
			isLoading: false
		};
	},

	componentWillMount: function() {
		this._optionsCache = {};
		this._optionsFilterString = '';
		this.setState(this.getStateFromValue(this.props.value));

		if (this.props.asyncOptions && this.props.autoload) {
			this.autoloadAsyncOptions();
		}
	},

	componentWillUnmount: function() {
		clearTimeout(this._blurTimeout);
		clearTimeout(this._focusTimeout);
	},

	componentWillReceiveProps: function(newProps) {
		if (newProps.value !== this.state.value) {
			this.setState(this.getStateFromValue(newProps.value));
		}
		if (JSON.stringify(newProps.options) !== JSON.stringify(this.props.options)) {
			this.setState({
				options: newProps.options,
				filteredOptions: this.filterOptions(newProps.options)
			});
		}
	},

	componentDidUpdate: function() {
		if (this._focusAfterUpdate) {
			clearTimeout(this._blurTimeout);
			this._focusTimeout = setTimeout(function() {
				this.refs.input.focus();
				this._focusAfterUpdate = false;
			}.bind(this), 50);
		}
	},

	initValuesArray: function(values) {

		if (!Array.isArray(values)) {
			if ('string' === typeof values) {
				values = values.split(this.props.delimiter);
			} else {
				values = values ? [values] : []
			}
		};

		return values.map(function(val) {
			return ('string' === typeof val) ? val = _.findWhere(this.state.options, { value: val }) || { value: val, label: val } : val;
		}.bind(this));

	},

	getStateFromValue: function(value) {

		// reset internal filter string
		this._optionsFilterString = '';

		var values = this.initValuesArray(value),
			filteredOptions = this.filterOptions(this.state.options, values);

		return {
			value: values.map(function(v) { return v.value }).join(this.props.delimiter),
			values: values,
			inputValue: '',
			filteredOptions: filteredOptions,
			placeholder: !this.props.multi && values.length ? values[0].label : this.props.placeholder || 'Select...',
			focusedOption: !this.props.multi && values.length ? values[0] : filteredOptions[0]
		};

	},

	setValue: function(value) {
		this._focusAfterUpdate = true;
		var newState = this.getStateFromValue(value);
		newState.isOpen = false;
		this.fireChangeEvent(newState);
		this.setState(newState);
	},

	selectValue: function(value) {
		this[this.props.multi ? 'addValue' : 'setValue'](value);
	},

	addValue: function(value) {
		this.setValue(this.state.values.concat(value));
	},

	popValue: function() {
		this.setValue(_.initial(this.state.values));
	},

	removeValue: function(value) {
		this.setValue(_.without(this.state.values, value));
	},

	clearValue: function(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event && event.type == 'mousedown' && event.button !== 0) {
			return;
		}
		this.setValue(null);
	},

	resetValue: function() {
		this.setValue(this.state.value);
	},

	fireChangeEvent: function(newState) {
		if (newState.value !== this.state.value && this.props.onChange) {
			this.props.onChange(newState.value, newState.values);
		}
	},

	handleMouseDown: function(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event.type == 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
		if (this.state.isFocused) {
			this.setState({
				isOpen: true
			});
		} else {
			this._openAfterFocus = true;
			this.refs.input.focus();
		}
	},

	handleInputFocus: function() {
		this.setState({
			isFocused: true,
			isOpen: this.state.isOpen || this._openAfterFocus
		});
		this._openAfterFocus = false;
	},

	handleInputBlur: function(event) {
		this._blurTimeout = setTimeout(function() {
			if (this._focusAfterUpdate) return;
			this.setState({
				isOpen: false,
				isFocused: false
			});
		}.bind(this), 50);
	},

	handleKeyDown: function(event) {

		switch (event.keyCode) {

			case 8: // backspace
				if (!this.state.inputValue) {
					this.popValue();
				}
				return;
			break;

			case 9: // tab
				if (event.shiftKey || !this.state.isOpen || !this.state.focusedOption) {
					return;
				}
				this.selectFocusedOption();
			break;

			case 13: // enter
				this.selectFocusedOption();
			break;

			case 27: // escape
				if (this.state.isOpen) {
					this.resetValue();
				} else {
					this.clearValue();
				}
			break;

			case 38: // up
				this.focusPreviousOption();
			break;

			case 40: // down
				this.focusNextOption();
			break;

			default: return;
		}

		event.preventDefault();

	},

	handleInputChange: function(event) {

		// assign an internal variable because we need to use
		// the latest value before setState() has completed.
		this._optionsFilterString = event.target.value;

		if (this.props.asyncOptions) {
			this.setState({
				isLoading: true,
				inputValue: event.target.value
			});
			this.loadAsyncOptions(event.target.value, {
				isLoading: false,
				isOpen: true
			});
		} else {
			var filteredOptions = this.filterOptions(this.state.options);
			this.setState({
				isOpen: true,
				inputValue: event.target.value,
				filteredOptions: filteredOptions,
				focusedOption: _.contains(filteredOptions, this.state.focusedOption) ? this.state.focusedOption : filteredOptions[0]
			});
		}

	},

	autoloadAsyncOptions: function() {
		this.loadAsyncOptions('', {}, function() {});
	},

	loadAsyncOptions: function(input, state) {

		for (var i = 0; i <= input.length; i++) {
			var cacheKey = input.slice(0, i);
			if (this._optionsCache[cacheKey] && (input === cacheKey || this._optionsCache[cacheKey].complete)) {
				var options = this._optionsCache[cacheKey].options;
				this.setState(_.extend({
					options: options,
					filteredOptions: this.filterOptions(options)
				}, state));
				return;
			}
		}

		var thisRequestId = this._currentRequestId = requestId++;

		this.props.asyncOptions(input, function(err, data) {

			this._optionsCache[input] = data;

			if (thisRequestId !== this._currentRequestId) {
				return;
			}

			this.setState(_.extend({
				options: data.options,
				filteredOptions: this.filterOptions(data.options)
			}, state));

		}.bind(this));

	},

	filterOptions: function(options, values) {
		var filterValue = this._optionsFilterString;
		var exclude = (values || this.state.values).map(function(i) {
			return i.value;
		});
		if (this.props.filterOptions) {
			return this.props.filterOptions.call(this, options, filterValue, exclude);
		} else {
			var filterOption = function(op) {
				if (this.props.multi && _.contains(exclude, op.value)) return false;
				if (this.props.filterOption) return this.props.filterOption.call(this, op, filterValue);
				return !filterValue || (this.props.matchPos === 'start') ? (
					(this.props.matchProp !== 'label' && op.value.toLowerCase().substr(0, filterValue.length) === filterValue) ||
					(this.props.matchProp !== 'value' && op.label.toLowerCase().substr(0, filterValue.length) === filterValue)
				) : (
					(this.props.matchProp !== 'label' && op.value.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0) ||
					(this.props.matchProp !== 'value' && op.label.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0)
				);
			}
			return _.filter(options, filterOption, this);
		}
	},

	selectFocusedOption: function() {
		return this.selectValue(this.state.focusedOption);
	},

	focusOption: function(op) {
		this.setState({
			focusedOption: op
		});
	},

	focusNextOption: function() {
		this.focusAdjacentOption('next');
	},

	focusPreviousOption: function() {
		this.focusAdjacentOption('previous');
	},

	focusAdjacentOption: function(dir) {

		var ops = this.state.filteredOptions;

		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				inputValue: '',
				focusedOption: this.state.focusedOption || ops[dir === 'next' ? 0 : ops.length - 1]
			});
			return;
		}

		if (!ops.length) {
			return;
		}

		var focusedIndex = -1;

		for (var i = 0; i < ops.length; i++) {
			if (this.state.focusedOption === ops[i]) {
				focusedIndex = i;
				break;
			}
		}

		var focusedOption = ops[0];

		if (dir === 'next' && focusedIndex > -1 && focusedIndex < ops.length - 1) {
			focusedOption = ops[focusedIndex + 1];
		} else if (dir === 'previous') {
			if (focusedIndex > 0) {
				focusedOption = ops[focusedIndex - 1];
			} else {
				focusedOption = ops[ops.length - 1];
			}
		}

		this.setState({
			focusedOption: focusedOption
		});

	},

	unfocusOption: function(op) {
		if (this.state.focusedOption === op) {
			this.setState({
				focusedOption: null
			});
		}
	},

	buildMenu: function() {

		var focusedValue = this.state.focusedOption ? this.state.focusedOption.value : null;

		var ops = _.map(this.state.filteredOptions, function(op) {

			var optionClass = classes({
				'Select-option': true,
				'is-focused': focusedValue === op.value
			});

			var mouseEnter = this.focusOption.bind(this, op),
				mouseLeave = this.unfocusOption.bind(this, op),
				mouseDown = this.selectValue.bind(this, op);

			return React.createElement("div", {key: 'option-' + op.value, className: optionClass, onMouseEnter: mouseEnter, onMouseLeave: mouseLeave, onMouseDown: mouseDown, onClick: mouseDown}, op.label);

		}, this);

		return ops.length ? ops : React.createElement("div", {className: "Select-noresults"}, "No results found");

	},

	render: function() {

		var selectClass = classes('Select', this.props.className, {
			'is-multi': this.props.multi,
			'is-open': this.state.isOpen,
			'is-focused': this.state.isFocused,
			'is-loading': this.state.isLoading,
			'has-value': this.state.value
		});

		var value = [];

		if (this.props.multi) {
			this.state.values.forEach(function(val) {
				props = _.extend({
					key: val.value,
					onRemove: this.removeValue.bind(this, val)
				}, val);
				value.push(React.createElement(Value, React.__spread({},  props)));
			}, this);
		}

		if (!this.state.inputValue && (!this.props.multi || !value.length)) {
			value.push(React.createElement("div", {className: "Select-placeholder", key: "placeholder"}, this.state.placeholder));
		}

		var loading = this.state.isLoading ? React.createElement("span", {className: "Select-loading", "aria-hidden": "true"}) : null;
		var clear = this.state.value ? React.createElement("span", {className: "Select-clear", "aria-label": "Clear value", onMouseDown: this.clearValue, onClick: this.clearValue, dangerouslySetInnerHTML: { __html: '&times;'}}) : null;
		var menu = this.state.isOpen ? React.createElement("div", {className: "Select-menu"}, this.buildMenu()) : null;

		return (
			React.createElement("div", {ref: "wrapper", className: selectClass}, 
				React.createElement("input", {type: "hidden", ref: "value", name: this.props.name, value: this.state.value}), 
				React.createElement("div", {className: "Select-control", ref: "control", onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown}, 
					value, 
					React.createElement(Input, {className: "Select-input", tabIndex: this.props.tabIndex, ref: "input", value: this.state.inputValue, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, onChange: this.handleInputChange, minWidth: "5"}), 
					React.createElement("span", {className: "Select-arrow"}), 
					loading, 
					clear
				), 
				menu
			)
		);

	}

});

module.exports = Select;

},{"./Value":"/Users/fraserxu/Desktop/tmp/react-select/src/Value.js","classnames":"/Users/fraserxu/Desktop/tmp/react-select/node_modules/classnames/index.js","react":false,"react-input-autosize":false,"underscore":false}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsInNyYy9WYWx1ZS5qcyIsInNyYy9TZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gY2xhc3NuYW1lcygpIHtcblx0dmFyIGFyZ3MgPSBhcmd1bWVudHMsIGNsYXNzZXMgPSBbXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKGFyZ3NbaV0gJiYgJ3N0cmluZycgPT09IHR5cGVvZiBhcmdzW2ldKSB7XG5cdFx0XHRjbGFzc2VzLnB1c2goYXJnc1tpXSk7XG5cdFx0fSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGFyZ3NbaV0pIHtcblx0XHRcdGNsYXNzZXMgPSBjbGFzc2VzLmNvbmNhdChPYmplY3Qua2V5cyhhcmdzW2ldKS5maWx0ZXIoZnVuY3Rpb24oY2xzKSB7XG5cdFx0XHRcdHJldHVybiBhcmdzW2ldW2Nsc107XG5cdFx0XHR9KSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKSB8fCB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NuYW1lcztcbiIsInZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuXHRSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG5cdGNsYXNzZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbnZhciBPcHRpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0ZGlzcGxheU5hbWU6ICdWYWx1ZScsXG5cblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxuXHR9LFxuXG5cdGJsb2NrRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIlNlbGVjdC1pdGVtXCJ9LCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJTZWxlY3QtaXRlbS1pY29uXCIsIG9uTW91c2VEb3duOiB0aGlzLmJsb2NrRXZlbnQsIG9uVG91Y2hFbmQ6IHRoaXMucHJvcHMub25SZW1vdmUsIG9uQ2xpY2s6IHRoaXMucHJvcHMub25SZW1vdmV9LCBcIsOXXCIpLCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJTZWxlY3QtaXRlbS1sYWJlbFwifSwgdGhpcy5wcm9wcy5sYWJlbClcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9wdGlvbjtcbiIsInZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuXHRSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG5cdElucHV0ID0gcmVxdWlyZSgncmVhY3QtaW5wdXQtYXV0b3NpemUnKSxcblx0Y2xhc3NlcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKSxcblx0VmFsdWUgPSByZXF1aXJlKCcuL1ZhbHVlJyk7XG5cbnZhciByZXF1ZXN0SWQgPSAwO1xuXG52YXIgU2VsZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdGRpc3BsYXlOYW1lOiAnU2VsZWN0JyxcblxuXHRwcm9wVHlwZXM6IHtcblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAgLy8gaW5pdGlhbCBmaWVsZCB2YWx1ZVxuXHRcdG11bHRpOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAvLyBtdWx0aS12YWx1ZSBpbnB1dFxuXHRcdG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSwgICAgICAgICAvLyBhcnJheSBvZiBvcHRpb25zXG5cdFx0ZGVsaW1pdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgIC8vIGRlbGltaXRlciB0byB1c2UgdG8gam9pbiBtdWx0aXBsZSB2YWx1ZXNcblx0XHRhc3luY09wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgLy8gZnVuY3Rpb24gdG8gY2FsbCB0byBnZXQgb3B0aW9uc1xuXHRcdGF1dG9sb2FkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAvLyB3aGV0aGVyIHRvIGF1dG8tbG9hZCB0aGUgZGVmYXVsdCBhc3luYyBvcHRpb25zIHNldFxuXHRcdHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAvLyBmaWVsZCBwbGFjZWhvbGRlciwgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyB2YWx1ZVxuXHRcdG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBmaWVsZCBuYW1lLCBmb3IgaGlkZGVuIDxpbnB1dCAvPiB0YWdcblx0XHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24obmV3VmFsdWUpIHt9XG5cdFx0Y2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgIC8vIGNsYXNzTmFtZSBmb3IgdGhlIG91dGVyIGVsZW1lbnRcblx0XHRmaWx0ZXJPcHRpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgLy8gbWV0aG9kIHRvIGZpbHRlciBhIHNpbmdsZSBvcHRpb246IGZ1bmN0aW9uKG9wdGlvbiwgZmlsdGVyU3RyaW5nKVxuXHRcdGZpbHRlck9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAvLyBtZXRob2QgdG8gZmlsdGVyIHRoZSBvcHRpb25zIGFycmF5OiBmdW5jdGlvbihbb3B0aW9uc10sIGZpbHRlclN0cmluZywgW3ZhbHVlc10pXG5cdFx0bWF0Y2hQb3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgIC8vIChhbnl8c3RhcnQpIG1hdGNoIHRoZSBzdGFydCBvciBlbnRpcmUgc3RyaW5nIHdoZW4gZmlsdGVyaW5nXG5cdFx0bWF0Y2hQcm9wOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nICAgICAgIC8vIChhbnl8bGFiZWx8dmFsdWUpIHdoaWNoIG9wdGlvbiBwcm9wZXJ0eSB0byBmaWx0ZXIgb25cblx0fSxcblxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTogdW5kZWZpbmVkLFxuXHRcdFx0b3B0aW9uczogW10sXG5cdFx0XHRkZWxpbWl0ZXI6ICcsJyxcblx0XHRcdGFzeW5jT3B0aW9uczogdW5kZWZpbmVkLFxuXHRcdFx0YXV0b2xvYWQ6IHRydWUsXG5cdFx0XHRwbGFjZWhvbGRlcjogJycsXG5cdFx0XHRuYW1lOiB1bmRlZmluZWQsXG5cdFx0XHRvbkNoYW5nZTogdW5kZWZpbmVkLFxuXHRcdFx0Y2xhc3NOYW1lOiB1bmRlZmluZWQsXG5cdFx0XHRtYXRjaFBvczogJ2FueScsXG5cdFx0XHRtYXRjaFByb3A6ICdhbnknXG5cdFx0fTtcblx0fSxcblxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHQvKlxuXHRcdFx0ICogc2V0IGJ5IGdldFN0YXRlRnJvbVZhbHVlIG9uIGNvbXBvbmVudFdpbGxNb3VudDpcblx0XHRcdCAqIC0gdmFsdWVcblx0XHRcdCAqIC0gdmFsdWVzXG5cdFx0XHQgKiAtIGZpbHRlcmVkT3B0aW9uc1xuXHRcdFx0ICogLSBpbnB1dFZhbHVlXG5cdFx0XHQgKiAtIHBsYWNlaG9sZGVyXG5cdFx0XHQgKiAtIGZvY3VzZWRPcHRpb25cblx0XHRcdCovXG5cdFx0XHRvcHRpb25zOiB0aGlzLnByb3BzLm9wdGlvbnMsXG5cdFx0XHRpc0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdGlzTG9hZGluZzogZmFsc2Vcblx0XHR9O1xuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5fb3B0aW9uc0NhY2hlID0ge307XG5cdFx0dGhpcy5fb3B0aW9uc0ZpbHRlclN0cmluZyA9ICcnO1xuXHRcdHRoaXMuc2V0U3RhdGUodGhpcy5nZXRTdGF0ZUZyb21WYWx1ZSh0aGlzLnByb3BzLnZhbHVlKSk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5hc3luY09wdGlvbnMgJiYgdGhpcy5wcm9wcy5hdXRvbG9hZCkge1xuXHRcdFx0dGhpcy5hdXRvbG9hZEFzeW5jT3B0aW9ucygpO1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2JsdXJUaW1lb3V0KTtcblx0XHRjbGVhclRpbWVvdXQodGhpcy5fZm9jdXNUaW1lb3V0KTtcblx0fSxcblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXdQcm9wcykge1xuXHRcdGlmIChuZXdQcm9wcy52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLmdldFN0YXRlRnJvbVZhbHVlKG5ld1Byb3BzLnZhbHVlKSk7XG5cdFx0fVxuXHRcdGlmIChKU09OLnN0cmluZ2lmeShuZXdQcm9wcy5vcHRpb25zKSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcy5vcHRpb25zKSkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdG9wdGlvbnM6IG5ld1Byb3BzLm9wdGlvbnMsXG5cdFx0XHRcdGZpbHRlcmVkT3B0aW9uczogdGhpcy5maWx0ZXJPcHRpb25zKG5ld1Byb3BzLm9wdGlvbnMpXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cblx0Y29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbigpIHtcblx0XHRpZiAodGhpcy5fZm9jdXNBZnRlclVwZGF0ZSkge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2JsdXJUaW1lb3V0KTtcblx0XHRcdHRoaXMuX2ZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRoaXMucmVmcy5pbnB1dC5mb2N1cygpO1xuXHRcdFx0XHR0aGlzLl9mb2N1c0FmdGVyVXBkYXRlID0gZmFsc2U7XG5cdFx0XHR9LmJpbmQodGhpcyksIDUwKTtcblx0XHR9XG5cdH0sXG5cblx0aW5pdFZhbHVlc0FycmF5OiBmdW5jdGlvbih2YWx1ZXMpIHtcblxuXHRcdGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG5cdFx0XHRpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB2YWx1ZXMpIHtcblx0XHRcdFx0dmFsdWVzID0gdmFsdWVzLnNwbGl0KHRoaXMucHJvcHMuZGVsaW1pdGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhbHVlcyA9IHZhbHVlcyA/IFt2YWx1ZXNdIDogW11cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24odmFsKSB7XG5cdFx0XHRyZXR1cm4gKCdzdHJpbmcnID09PSB0eXBlb2YgdmFsKSA/IHZhbCA9IF8uZmluZFdoZXJlKHRoaXMuc3RhdGUub3B0aW9ucywgeyB2YWx1ZTogdmFsIH0pIHx8IHsgdmFsdWU6IHZhbCwgbGFiZWw6IHZhbCB9IDogdmFsO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRnZXRTdGF0ZUZyb21WYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcblxuXHRcdC8vIHJlc2V0IGludGVybmFsIGZpbHRlciBzdHJpbmdcblx0XHR0aGlzLl9vcHRpb25zRmlsdGVyU3RyaW5nID0gJyc7XG5cblx0XHR2YXIgdmFsdWVzID0gdGhpcy5pbml0VmFsdWVzQXJyYXkodmFsdWUpLFxuXHRcdFx0ZmlsdGVyZWRPcHRpb25zID0gdGhpcy5maWx0ZXJPcHRpb25zKHRoaXMuc3RhdGUub3B0aW9ucywgdmFsdWVzKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTogdmFsdWVzLm1hcChmdW5jdGlvbih2KSB7IHJldHVybiB2LnZhbHVlIH0pLmpvaW4odGhpcy5wcm9wcy5kZWxpbWl0ZXIpLFxuXHRcdFx0dmFsdWVzOiB2YWx1ZXMsXG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdGZpbHRlcmVkT3B0aW9uczogZmlsdGVyZWRPcHRpb25zLFxuXHRcdFx0cGxhY2Vob2xkZXI6ICF0aGlzLnByb3BzLm11bHRpICYmIHZhbHVlcy5sZW5ndGggPyB2YWx1ZXNbMF0ubGFiZWwgOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8ICdTZWxlY3QuLi4nLFxuXHRcdFx0Zm9jdXNlZE9wdGlvbjogIXRoaXMucHJvcHMubXVsdGkgJiYgdmFsdWVzLmxlbmd0aCA/IHZhbHVlc1swXSA6IGZpbHRlcmVkT3B0aW9uc1swXVxuXHRcdH07XG5cblx0fSxcblxuXHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcblx0XHR0aGlzLl9mb2N1c0FmdGVyVXBkYXRlID0gdHJ1ZTtcblx0XHR2YXIgbmV3U3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVZhbHVlKHZhbHVlKTtcblx0XHRuZXdTdGF0ZS5pc09wZW4gPSBmYWxzZTtcblx0XHR0aGlzLmZpcmVDaGFuZ2VFdmVudChuZXdTdGF0ZSk7XG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cdH0sXG5cblx0c2VsZWN0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0dGhpc1t0aGlzLnByb3BzLm11bHRpID8gJ2FkZFZhbHVlJyA6ICdzZXRWYWx1ZSddKHZhbHVlKTtcblx0fSxcblxuXHRhZGRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcblx0XHR0aGlzLnNldFZhbHVlKHRoaXMuc3RhdGUudmFsdWVzLmNvbmNhdCh2YWx1ZSkpO1xuXHR9LFxuXG5cdHBvcFZhbHVlOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnNldFZhbHVlKF8uaW5pdGlhbCh0aGlzLnN0YXRlLnZhbHVlcykpO1xuXHR9LFxuXG5cdHJlbW92ZVZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHRoaXMuc2V0VmFsdWUoXy53aXRob3V0KHRoaXMuc3RhdGUudmFsdWVzLCB2YWx1ZSkpO1xuXHR9LFxuXG5cdGNsZWFyVmFsdWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdC8vIGJ1dHRvbiwgaWdub3JlIGl0LlxuXHRcdGlmIChldmVudCAmJiBldmVudC50eXBlID09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLnNldFZhbHVlKG51bGwpO1xuXHR9LFxuXG5cdHJlc2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuc2V0VmFsdWUodGhpcy5zdGF0ZS52YWx1ZSk7XG5cdH0sXG5cblx0ZmlyZUNoYW5nZUV2ZW50OiBmdW5jdGlvbihuZXdTdGF0ZSkge1xuXHRcdGlmIChuZXdTdGF0ZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKG5ld1N0YXRlLnZhbHVlLCBuZXdTdGF0ZS52YWx1ZXMpO1xuXHRcdH1cblx0fSxcblxuXHRoYW5kbGVNb3VzZURvd246IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdC8vIGJ1dHRvbiwgaWdub3JlIGl0LlxuXHRcdGlmIChldmVudC50eXBlID09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmICh0aGlzLnN0YXRlLmlzRm9jdXNlZCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gdHJ1ZTtcblx0XHRcdHRoaXMucmVmcy5pbnB1dC5mb2N1cygpO1xuXHRcdH1cblx0fSxcblxuXHRoYW5kbGVJbnB1dEZvY3VzOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGlzRm9jdXNlZDogdHJ1ZSxcblx0XHRcdGlzT3BlbjogdGhpcy5zdGF0ZS5pc09wZW4gfHwgdGhpcy5fb3BlbkFmdGVyRm9jdXNcblx0XHR9KTtcblx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IGZhbHNlO1xuXHR9LFxuXG5cdGhhbmRsZUlucHV0Qmx1cjogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR0aGlzLl9ibHVyVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAodGhpcy5fZm9jdXNBZnRlclVwZGF0ZSkgcmV0dXJuO1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGlzRm9jdXNlZDogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdH0uYmluZCh0aGlzKSwgNTApO1xuXHR9LFxuXG5cdGhhbmRsZUtleURvd246IGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblxuXHRcdFx0Y2FzZSA4OiAvLyBiYWNrc3BhY2Vcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUpIHtcblx0XHRcdFx0XHR0aGlzLnBvcFZhbHVlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgOTogLy8gdGFiXG5cdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSB8fCAhdGhpcy5zdGF0ZS5pc09wZW4gfHwgIXRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbikge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDEzOiAvLyBlbnRlclxuXHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDI3OiAvLyBlc2NhcGVcblx0XHRcdFx0aWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdFx0dGhpcy5yZXNldFZhbHVlKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5jbGVhclZhbHVlKCk7XG5cdFx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDM4OiAvLyB1cFxuXHRcdFx0XHR0aGlzLmZvY3VzUHJldmlvdXNPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDQwOiAvLyBkb3duXG5cdFx0XHRcdHRoaXMuZm9jdXNOZXh0T3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDogcmV0dXJuO1xuXHRcdH1cblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0fSxcblxuXHRoYW5kbGVJbnB1dENoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdC8vIGFzc2lnbiBhbiBpbnRlcm5hbCB2YXJpYWJsZSBiZWNhdXNlIHdlIG5lZWQgdG8gdXNlXG5cdFx0Ly8gdGhlIGxhdGVzdCB2YWx1ZSBiZWZvcmUgc2V0U3RhdGUoKSBoYXMgY29tcGxldGVkLlxuXHRcdHRoaXMuX29wdGlvbnNGaWx0ZXJTdHJpbmcgPSBldmVudC50YXJnZXQudmFsdWU7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5hc3luY09wdGlvbnMpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc0xvYWRpbmc6IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLmxvYWRBc3luY09wdGlvbnMoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XG5cdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdGlzT3BlbjogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBmaWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmZpbHRlck9wdGlvbnModGhpcy5zdGF0ZS5vcHRpb25zKTtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcblx0XHRcdFx0ZmlsdGVyZWRPcHRpb25zOiBmaWx0ZXJlZE9wdGlvbnMsXG5cdFx0XHRcdGZvY3VzZWRPcHRpb246IF8uY29udGFpbnMoZmlsdGVyZWRPcHRpb25zLCB0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24pID8gdGhpcy5zdGF0ZS5mb2N1c2VkT3B0aW9uIDogZmlsdGVyZWRPcHRpb25zWzBdXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fSxcblxuXHRhdXRvbG9hZEFzeW5jT3B0aW9uczogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5sb2FkQXN5bmNPcHRpb25zKCcnLCB7fSwgZnVuY3Rpb24oKSB7fSk7XG5cdH0sXG5cblx0bG9hZEFzeW5jT3B0aW9uczogZnVuY3Rpb24oaW5wdXQsIHN0YXRlKSB7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8PSBpbnB1dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGNhY2hlS2V5ID0gaW5wdXQuc2xpY2UoMCwgaSk7XG5cdFx0XHRpZiAodGhpcy5fb3B0aW9uc0NhY2hlW2NhY2hlS2V5XSAmJiAoaW5wdXQgPT09IGNhY2hlS2V5IHx8IHRoaXMuX29wdGlvbnNDYWNoZVtjYWNoZUtleV0uY29tcGxldGUpKSB7XG5cdFx0XHRcdHZhciBvcHRpb25zID0gdGhpcy5fb3B0aW9uc0NhY2hlW2NhY2hlS2V5XS5vcHRpb25zO1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKF8uZXh0ZW5kKHtcblx0XHRcdFx0XHRvcHRpb25zOiBvcHRpb25zLFxuXHRcdFx0XHRcdGZpbHRlcmVkT3B0aW9uczogdGhpcy5maWx0ZXJPcHRpb25zKG9wdGlvbnMpXG5cdFx0XHRcdH0sIHN0YXRlKSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgdGhpc1JlcXVlc3RJZCA9IHRoaXMuX2N1cnJlbnRSZXF1ZXN0SWQgPSByZXF1ZXN0SWQrKztcblxuXHRcdHRoaXMucHJvcHMuYXN5bmNPcHRpb25zKGlucHV0LCBmdW5jdGlvbihlcnIsIGRhdGEpIHtcblxuXHRcdFx0dGhpcy5fb3B0aW9uc0NhY2hlW2lucHV0XSA9IGRhdGE7XG5cblx0XHRcdGlmICh0aGlzUmVxdWVzdElkICE9PSB0aGlzLl9jdXJyZW50UmVxdWVzdElkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zZXRTdGF0ZShfLmV4dGVuZCh7XG5cdFx0XHRcdG9wdGlvbnM6IGRhdGEub3B0aW9ucyxcblx0XHRcdFx0ZmlsdGVyZWRPcHRpb25zOiB0aGlzLmZpbHRlck9wdGlvbnMoZGF0YS5vcHRpb25zKVxuXHRcdFx0fSwgc3RhdGUpKTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRmaWx0ZXJPcHRpb25zOiBmdW5jdGlvbihvcHRpb25zLCB2YWx1ZXMpIHtcblx0XHR2YXIgZmlsdGVyVmFsdWUgPSB0aGlzLl9vcHRpb25zRmlsdGVyU3RyaW5nO1xuXHRcdHZhciBleGNsdWRlID0gKHZhbHVlcyB8fCB0aGlzLnN0YXRlLnZhbHVlcykubWFwKGZ1bmN0aW9uKGkpIHtcblx0XHRcdHJldHVybiBpLnZhbHVlO1xuXHRcdH0pO1xuXHRcdGlmICh0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMpIHtcblx0XHRcdHJldHVybiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zLCBmaWx0ZXJWYWx1ZSwgZXhjbHVkZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBmaWx0ZXJPcHRpb24gPSBmdW5jdGlvbihvcCkge1xuXHRcdFx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSAmJiBfLmNvbnRhaW5zKGV4Y2x1ZGUsIG9wLnZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXJPcHRpb24pIHJldHVybiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbi5jYWxsKHRoaXMsIG9wLCBmaWx0ZXJWYWx1ZSk7XG5cdFx0XHRcdHJldHVybiAhZmlsdGVyVmFsdWUgfHwgKHRoaXMucHJvcHMubWF0Y2hQb3MgPT09ICdzdGFydCcpID8gKFxuXHRcdFx0XHRcdCh0aGlzLnByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJyAmJiBvcC52YWx1ZS50b0xvd2VyQ2FzZSgpLnN1YnN0cigwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZSkgfHxcblx0XHRcdFx0XHQodGhpcy5wcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgb3AubGFiZWwudG9Mb3dlckNhc2UoKS5zdWJzdHIoMCwgZmlsdGVyVmFsdWUubGVuZ3RoKSA9PT0gZmlsdGVyVmFsdWUpXG5cdFx0XHRcdCkgOiAoXG5cdFx0XHRcdFx0KHRoaXMucHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnICYmIG9wLnZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJWYWx1ZS50b0xvd2VyQ2FzZSgpKSA+PSAwKSB8fFxuXHRcdFx0XHRcdCh0aGlzLnByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJyAmJiBvcC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUudG9Mb3dlckNhc2UoKSkgPj0gMClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfLmZpbHRlcihvcHRpb25zLCBmaWx0ZXJPcHRpb24sIHRoaXMpO1xuXHRcdH1cblx0fSxcblxuXHRzZWxlY3RGb2N1c2VkT3B0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZWxlY3RWYWx1ZSh0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24pO1xuXHR9LFxuXG5cdGZvY3VzT3B0aW9uOiBmdW5jdGlvbihvcCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Zm9jdXNlZE9wdGlvbjogb3Bcblx0XHR9KTtcblx0fSxcblxuXHRmb2N1c05leHRPcHRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignbmV4dCcpO1xuXHR9LFxuXG5cdGZvY3VzUHJldmlvdXNPcHRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbigncHJldmlvdXMnKTtcblx0fSxcblxuXHRmb2N1c0FkamFjZW50T3B0aW9uOiBmdW5jdGlvbihkaXIpIHtcblxuXHRcdHZhciBvcHMgPSB0aGlzLnN0YXRlLmZpbHRlcmVkT3B0aW9ucztcblxuXHRcdGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0XHRmb2N1c2VkT3B0aW9uOiB0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24gfHwgb3BzW2RpciA9PT0gJ25leHQnID8gMCA6IG9wcy5sZW5ndGggLSAxXVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCFvcHMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIGZvY3VzZWRJbmRleCA9IC0xO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvcHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24gPT09IG9wc1tpXSkge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgZm9jdXNlZE9wdGlvbiA9IG9wc1swXTtcblxuXHRcdGlmIChkaXIgPT09ICduZXh0JyAmJiBmb2N1c2VkSW5kZXggPiAtMSAmJiBmb2N1c2VkSW5kZXggPCBvcHMubGVuZ3RoIC0gMSkge1xuXHRcdFx0Zm9jdXNlZE9wdGlvbiA9IG9wc1tmb2N1c2VkSW5kZXggKyAxXTtcblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3ByZXZpb3VzJykge1xuXHRcdFx0aWYgKGZvY3VzZWRJbmRleCA+IDApIHtcblx0XHRcdFx0Zm9jdXNlZE9wdGlvbiA9IG9wc1tmb2N1c2VkSW5kZXggLSAxXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb24gPSBvcHNbb3BzLmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Zm9jdXNlZE9wdGlvbjogZm9jdXNlZE9wdGlvblxuXHRcdH0pO1xuXG5cdH0sXG5cblx0dW5mb2N1c09wdGlvbjogZnVuY3Rpb24ob3ApIHtcblx0XHRpZiAodGhpcy5zdGF0ZS5mb2N1c2VkT3B0aW9uID09PSBvcCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb246IG51bGxcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcblxuXHRidWlsZE1lbnU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dmFyIGZvY3VzZWRWYWx1ZSA9IHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbiA/IHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbi52YWx1ZSA6IG51bGw7XG5cblx0XHR2YXIgb3BzID0gXy5tYXAodGhpcy5zdGF0ZS5maWx0ZXJlZE9wdGlvbnMsIGZ1bmN0aW9uKG9wKSB7XG5cblx0XHRcdHZhciBvcHRpb25DbGFzcyA9IGNsYXNzZXMoe1xuXHRcdFx0XHQnU2VsZWN0LW9wdGlvbic6IHRydWUsXG5cdFx0XHRcdCdpcy1mb2N1c2VkJzogZm9jdXNlZFZhbHVlID09PSBvcC52YWx1ZVxuXHRcdFx0fSk7XG5cblx0XHRcdHZhciBtb3VzZUVudGVyID0gdGhpcy5mb2N1c09wdGlvbi5iaW5kKHRoaXMsIG9wKSxcblx0XHRcdFx0bW91c2VMZWF2ZSA9IHRoaXMudW5mb2N1c09wdGlvbi5iaW5kKHRoaXMsIG9wKSxcblx0XHRcdFx0bW91c2VEb3duID0gdGhpcy5zZWxlY3RWYWx1ZS5iaW5kKHRoaXMsIG9wKTtcblxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2tleTogJ29wdGlvbi0nICsgb3AudmFsdWUsIGNsYXNzTmFtZTogb3B0aW9uQ2xhc3MsIG9uTW91c2VFbnRlcjogbW91c2VFbnRlciwgb25Nb3VzZUxlYXZlOiBtb3VzZUxlYXZlLCBvbk1vdXNlRG93bjogbW91c2VEb3duLCBvbkNsaWNrOiBtb3VzZURvd259LCBvcC5sYWJlbCk7XG5cblx0XHR9LCB0aGlzKTtcblxuXHRcdHJldHVybiBvcHMubGVuZ3RoID8gb3BzIDogUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIlNlbGVjdC1ub3Jlc3VsdHNcIn0sIFwiTm8gcmVzdWx0cyBmb3VuZFwiKTtcblxuXHR9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cblx0XHR2YXIgc2VsZWN0Q2xhc3MgPSBjbGFzc2VzKCdTZWxlY3QnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuXHRcdFx0J2lzLW11bHRpJzogdGhpcy5wcm9wcy5tdWx0aSxcblx0XHRcdCdpcy1vcGVuJzogdGhpcy5zdGF0ZS5pc09wZW4sXG5cdFx0XHQnaXMtZm9jdXNlZCc6IHRoaXMuc3RhdGUuaXNGb2N1c2VkLFxuXHRcdFx0J2lzLWxvYWRpbmcnOiB0aGlzLnN0YXRlLmlzTG9hZGluZyxcblx0XHRcdCdoYXMtdmFsdWUnOiB0aGlzLnN0YXRlLnZhbHVlXG5cdFx0fSk7XG5cblx0XHR2YXIgdmFsdWUgPSBbXTtcblxuXHRcdGlmICh0aGlzLnByb3BzLm11bHRpKSB7XG5cdFx0XHR0aGlzLnN0YXRlLnZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbCkge1xuXHRcdFx0XHRwcm9wcyA9IF8uZXh0ZW5kKHtcblx0XHRcdFx0XHRrZXk6IHZhbC52YWx1ZSxcblx0XHRcdFx0XHRvblJlbW92ZTogdGhpcy5yZW1vdmVWYWx1ZS5iaW5kKHRoaXMsIHZhbClcblx0XHRcdFx0fSwgdmFsKTtcblx0XHRcdFx0dmFsdWUucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KFZhbHVlLCBSZWFjdC5fX3NwcmVhZCh7fSwgIHByb3BzKSkpO1xuXHRcdFx0fSwgdGhpcyk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgKCF0aGlzLnByb3BzLm11bHRpIHx8ICF2YWx1ZS5sZW5ndGgpKSB7XG5cdFx0XHR2YWx1ZS5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJTZWxlY3QtcGxhY2Vob2xkZXJcIiwga2V5OiBcInBsYWNlaG9sZGVyXCJ9LCB0aGlzLnN0YXRlLnBsYWNlaG9sZGVyKSk7XG5cdFx0fVxuXG5cdFx0dmFyIGxvYWRpbmcgPSB0aGlzLnN0YXRlLmlzTG9hZGluZyA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwiU2VsZWN0LWxvYWRpbmdcIiwgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIn0pIDogbnVsbDtcblx0XHR2YXIgY2xlYXIgPSB0aGlzLnN0YXRlLnZhbHVlID8gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJTZWxlY3QtY2xlYXJcIiwgXCJhcmlhLWxhYmVsXCI6IFwiQ2xlYXIgdmFsdWVcIiwgb25Nb3VzZURvd246IHRoaXMuY2xlYXJWYWx1ZSwgb25DbGljazogdGhpcy5jbGVhclZhbHVlLCBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6ICcmdGltZXM7J319KSA6IG51bGw7XG5cdFx0dmFyIG1lbnUgPSB0aGlzLnN0YXRlLmlzT3BlbiA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJTZWxlY3QtbWVudVwifSwgdGhpcy5idWlsZE1lbnUoKSkgOiBudWxsO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3JlZjogXCJ3cmFwcGVyXCIsIGNsYXNzTmFtZTogc2VsZWN0Q2xhc3N9LCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImhpZGRlblwiLCByZWY6IFwidmFsdWVcIiwgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZX0pLCBcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIlNlbGVjdC1jb250cm9sXCIsIHJlZjogXCJjb250cm9sXCIsIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLCBvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVNb3VzZURvd24sIG9uVG91Y2hFbmQ6IHRoaXMuaGFuZGxlTW91c2VEb3dufSwgXG5cdFx0XHRcdFx0dmFsdWUsIFxuXHRcdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHtjbGFzc05hbWU6IFwiU2VsZWN0LWlucHV0XCIsIHRhYkluZGV4OiB0aGlzLnByb3BzLnRhYkluZGV4LCByZWY6IFwiaW5wdXRcIiwgdmFsdWU6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSwgb25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLCBvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXRCbHVyLCBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSwgbWluV2lkdGg6IFwiNVwifSksIFxuXHRcdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwiU2VsZWN0LWFycm93XCJ9KSwgXG5cdFx0XHRcdFx0bG9hZGluZywgXG5cdFx0XHRcdFx0Y2xlYXJcblx0XHRcdFx0KSwgXG5cdFx0XHRcdG1lbnVcblx0XHRcdClcblx0XHQpO1xuXG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0O1xuIl19
