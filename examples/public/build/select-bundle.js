require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-select":[function(require,module,exports){
/** @jsx React.DOM */

var _ = require('underscore'),
	React = require('react');

var noop = function() {};

var logEvent = function(msg) {
	console.log(msg);
};

// comment out this line to debug the control state
logEvent = noop;

var classes = function() {
	var rtn = [];
	for (var i = 0; i < arguments.length; i++) {
		if ('string' === typeof arguments[i]) {
			rtn.push(arguments[i]);
		} else if (_.isObject(arguments[i])) {
			_.each(arguments[i], function(val, key) {
				if (val) {
					rtn.push(key);
				}
			});
		}
	}
	return rtn.join(' ') || undefined;
}

var requestId = 0;

var Select = React.createClass({displayName: 'Select',
	
	getDefaultProps: function() {
		return {
			autoload: true
		};
	},
	
	getInitialState: function() {
		return {
			value: this.props.value,
			inputValue: '',
			placeholder: '',
			options: this.props.options || [],
			focusedOption: null,
			isFocused: false,
			isOpen: false,
			isLoading: false
		};
	},
	
	componentWillMount: function() {
		
		this._optionsCache = {};
		this.setState(this.getStateFromValue(this.state.value));
		
		if (this.props.asyncOptions && this.props.autoload) {
			this.autoloadAsyncOptions();
		}
		
	},
	
	getStateFromValue: function(value) {
		var selectedOption = ('string' === typeof value) ? _.findWhere(this.props.options || this.state.options, { value: value }) : value;
		return selectedOption ? {
			value: selectedOption.value,
			inputValue: selectedOption.label,
			placeholder: selectedOption.label,
			focusedOption: selectedOption
		} : {
			value: '',
			inputValue: '',
			placeholder: this.props.placeholder || 'Select...',
			focusedOption: null
		};
	},
	
	handleKeyDown: function(event) {
		
		logEvent('Key down: ' + event.keyCode);
		
		switch (event.keyCode) {
			
			case 9: // tab
				if (event.shiftKey || !this.state.isOpen) {
					return;
				}
				this.selectFocusedOption();
			break;
			
			case 13: // enter
				this.selectFocusedOption();
			break;
			
			case 27: // escape
				if (this.state.isOpen) {
					this.closeOnEscape();
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
	
	handleMouseDown: function() {
		logEvent('click: control');
		if (this.state.isOpen) {
			this.setState({
				isOpen: false
			});
			this._controlIsFocused = true;
			this.refs.control.getDOMNode().focus();
			clearTimeout(this.blurTimer);
		} else {
			this.setState({
				isOpen: true,
				inputValue: ''
			});
			if (!this._inputIsFocused) {
				this.refs.input.getDOMNode().focus();
			}
		}
	},
	
	handleFocus: function() {
		if (this._controlIsFocused) return;
		logEvent('focus: control');
		this._controlIsFocused = true;
		clearTimeout(this.blurTimer);
		setTimeout(function() {
			if (!this._inputIsFocused) {
				this.refs.input.getDOMNode().focus();
			}
		}.bind(this), 0);
		this.setState({
			isFocused: true
		});
	},
	
	handleBlur: function(event) {
		if (!this._controlIsFocused) return;
		this._controlIsFocused = false;
		clearTimeout(this.blurTimer);

		var _blur = function() {
			logEvent('blur: control');
			var blurState = this.getStateFromValue(this.state.value);
			blurState.isFocused = false;
			blurState.isOpen = false;
			if (this.isMounted()) {
				this.setState(blurState);
			}
		}.bind(this);

		this.blurTimer = setTimeout(_blur, 100);
	},
	
	handleInputMouseDown: function(event) {
		if (this._inputIsFocused) {
			logEvent('click: input');
			event.stopPropagation();
		}
	},
	
	handleInputFocus: function(event) {
		logEvent('focus: input');
		clearTimeout(this.blurTimer);
		this._inputIsFocused = true;
	},
	
	handleInputBlur: function(event) {
		logEvent('blur: input');
		this._inputIsFocused = false;
	},
	
	handleInputChange: function(event) {
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
			this.setState({
				isOpen: true,
				inputValue: event.target.value
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
				this.setState(_.extend({
					options: this._optionsCache[cacheKey].options
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
				options: data.options
			}, state));
			
		}.bind(this));
		
	},
	
	filterOptions: function() {
		return _.filter(this.state.options, this.filterOption, this);
	},
	
	filterOption: function(op) {
		return (
			!this.state.inputValue
			|| op.value.toLowerCase().indexOf(this.state.inputValue.toLowerCase()) >= 0
			|| op.label.toLowerCase().indexOf(this.state.inputValue.toLowerCase()) >= 0
		);
	},
	
	selectOption: function(option) {
		this.setValue(option);
		this.refs.control.getDOMNode().focus();
	},
	
	setValue: function(option) {
		var newState = this.getStateFromValue(option);
		newState.isOpen = false;
		this.setState(newState);
	},
	
	selectFocusedOption: function() {
		return this.setValue(this.state.focusedOption);
	},
	
	clearValue: function(event) {
		logEvent('clear value');
		this.setValue(null);
	},
	
	closeOnEscape: function() {
		this.setValue(this.state.value);
	},
	
	focusOption: function(op) {
		this.setState({
			focusedOption: op
		});
	},
	
	unfocusOption: function(op) {
		if (this.state.focusedOption === op) {
			this.setState({
				focusedOption: null
			});
		}
	},
	
	focusNextOption: function() {
		this.focusAdjacentOption('next');
	},
	
	focusPreviousOption: function() {
		this.focusAdjacentOption('previous');
	},
	
	focusAdjacentOption: function(dir) {
		
		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				inputValue: ''
			});
			return;
		}
		
		var ops = this.filterOptions();
		
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
	
	buildMenu: function() {
		
		var ops = [];

		_.each(this.filterOptions(), function(op) {
			
			var optionClass = classes({
				'Select-option': true,
				'is-focused': this.state.focusedOption === op
			});
			
			var mouseEnter = this.focusOption.bind(this, op),
				mouseLeave = this.unfocusOption.bind(this, op),
				mouseDown = this.selectOption.bind(this, op);
			
			ops.push(React.DOM.div({
				className: optionClass,
				onMouseEnter: mouseEnter,
				onMouseLeave: mouseLeave,
				onMouseDown: mouseDown
			}, op.label));
			
		}, this);
		
		if (_.isEmpty(ops)) {
			ops.push(React.DOM.div({className: "Select-noresults"}, "No results found"));
		}
		
		return ops;
		
	},
	
	render: function() {
		
		logEvent('render');
		
		var menu = this.state.isOpen ? React.DOM.div({ className: "Select-menu" }, this.buildMenu()) : null;
		var loading = this.state.isLoading ? React.DOM.span({ className: "Select-loading" }) : null;
		var clear = this.state.value ? React.DOM.span({ className: "Select-clear", onClick: this.clearValue, dangerouslySetInnerHTML: { __html: '&times;' } }) : null;
		
		var selectClass = classes('Select', {
			'is-multi': this.props.multi,
			'is-open': this.state.isOpen,
			'is-focused': this.state.isFocused,
			'is-loading': this.state.isLoading,
			'has-value': this.state.value
		});
		
		return React.DOM.div({ className: selectClass }, 
			React.DOM.input({ type: "hidden", ref: "value", name: this.props.name, value: this.state.value }), 
			React.DOM.div({ className: "Select-control", tabIndex: "-1", ref: "control", onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onFocus: this.handleFocus, onBlur: this.handleBlur }, 
				React.DOM.input({ className: "Select-input", placeholder: this.state.placeholder, ref: "input", onMouseDown: this.handleInputMouseDown, value: this.state.inputValue, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, onChange: this.handleInputChange }), 
				React.DOM.span({ className: "Select-arrow" }),
				loading,
				clear
			), 
			menu
		);
	}
	
});

module.exports = Select;

},{"react":undefined,"underscore":undefined}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rZGF3a2lucy9Mb2NhbFByb2plY3RzL3JlYWN0LXNlbGVjdC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiLi9saWIvc2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuXHRSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcblxudmFyIGxvZ0V2ZW50ID0gZnVuY3Rpb24obXNnKSB7XG5cdGNvbnNvbGUubG9nKG1zZyk7XG59O1xuXG4vLyBjb21tZW50IG91dCB0aGlzIGxpbmUgdG8gZGVidWcgdGhlIGNvbnRyb2wgc3RhdGVcbmxvZ0V2ZW50ID0gbm9vcDtcblxudmFyIGNsYXNzZXMgPSBmdW5jdGlvbigpIHtcblx0dmFyIHJ0biA9IFtdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGFyZ3VtZW50c1tpXSkge1xuXHRcdFx0cnRuLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHR9IGVsc2UgaWYgKF8uaXNPYmplY3QoYXJndW1lbnRzW2ldKSkge1xuXHRcdFx0Xy5lYWNoKGFyZ3VtZW50c1tpXSwgZnVuY3Rpb24odmFsLCBrZXkpIHtcblx0XHRcdFx0aWYgKHZhbCkge1xuXHRcdFx0XHRcdHJ0bi5wdXNoKGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcnRuLmpvaW4oJyAnKSB8fCB1bmRlZmluZWQ7XG59XG5cbnZhciByZXF1ZXN0SWQgPSAwO1xuXG52YXIgU2VsZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnU2VsZWN0Jyxcblx0XG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGF1dG9sb2FkOiB0cnVlXG5cdFx0fTtcblx0fSxcblx0XG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxuXHRcdFx0aW5wdXRWYWx1ZTogJycsXG5cdFx0XHRwbGFjZWhvbGRlcjogJycsXG5cdFx0XHRvcHRpb25zOiB0aGlzLnByb3BzLm9wdGlvbnMgfHwgW10sXG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBudWxsLFxuXHRcdFx0aXNGb2N1c2VkOiBmYWxzZSxcblx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRpc0xvYWRpbmc6IGZhbHNlXG5cdFx0fTtcblx0fSxcblx0XG5cdGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0XG5cdFx0dGhpcy5fb3B0aW9uc0NhY2hlID0ge307XG5cdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLmdldFN0YXRlRnJvbVZhbHVlKHRoaXMuc3RhdGUudmFsdWUpKTtcblx0XHRcblx0XHRpZiAodGhpcy5wcm9wcy5hc3luY09wdGlvbnMgJiYgdGhpcy5wcm9wcy5hdXRvbG9hZCkge1xuXHRcdFx0dGhpcy5hdXRvbG9hZEFzeW5jT3B0aW9ucygpO1xuXHRcdH1cblx0XHRcblx0fSxcblx0XG5cdGdldFN0YXRlRnJvbVZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHZhciBzZWxlY3RlZE9wdGlvbiA9ICgnc3RyaW5nJyA9PT0gdHlwZW9mIHZhbHVlKSA/IF8uZmluZFdoZXJlKHRoaXMucHJvcHMub3B0aW9ucyB8fCB0aGlzLnN0YXRlLm9wdGlvbnMsIHsgdmFsdWU6IHZhbHVlIH0pIDogdmFsdWU7XG5cdFx0cmV0dXJuIHNlbGVjdGVkT3B0aW9uID8ge1xuXHRcdFx0dmFsdWU6IHNlbGVjdGVkT3B0aW9uLnZhbHVlLFxuXHRcdFx0aW5wdXRWYWx1ZTogc2VsZWN0ZWRPcHRpb24ubGFiZWwsXG5cdFx0XHRwbGFjZWhvbGRlcjogc2VsZWN0ZWRPcHRpb24ubGFiZWwsXG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBzZWxlY3RlZE9wdGlvblxuXHRcdH0gOiB7XG5cdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8ICdTZWxlY3QuLi4nLFxuXHRcdFx0Zm9jdXNlZE9wdGlvbjogbnVsbFxuXHRcdH07XG5cdH0sXG5cdFxuXHRoYW5kbGVLZXlEb3duOiBmdW5jdGlvbihldmVudCkge1xuXHRcdFxuXHRcdGxvZ0V2ZW50KCdLZXkgZG93bjogJyArIGV2ZW50LmtleUNvZGUpO1xuXHRcdFxuXHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XG5cdFx0XHRjYXNlIDk6IC8vIHRhYlxuXHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkgfHwgIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2VsZWN0Rm9jdXNlZE9wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRcblx0XHRcdGNhc2UgMTM6IC8vIGVudGVyXG5cdFx0XHRcdHRoaXMuc2VsZWN0Rm9jdXNlZE9wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRcblx0XHRcdGNhc2UgMjc6IC8vIGVzY2FwZVxuXHRcdFx0XHRpZiAodGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdFx0XHR0aGlzLmNsb3NlT25Fc2NhcGUoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmNsZWFyVmFsdWUoKTtcblx0XHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0XHRcblx0XHRcdGNhc2UgMzg6IC8vIHVwXG5cdFx0XHRcdHRoaXMuZm9jdXNQcmV2aW91c09wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRcblx0XHRcdGNhc2UgNDA6IC8vIGRvd25cblx0XHRcdFx0dGhpcy5mb2N1c05leHRPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0XG5cdFx0XHRkZWZhdWx0OiByZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdH0sXG5cdFxuXHRoYW5kbGVNb3VzZURvd246IGZ1bmN0aW9uKCkge1xuXHRcdGxvZ0V2ZW50KCdjbGljazogY29udHJvbCcpO1xuXHRcdGlmICh0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5fY29udHJvbElzRm9jdXNlZCA9IHRydWU7XG5cdFx0XHR0aGlzLnJlZnMuY29udHJvbC5nZXRET01Ob2RlKCkuZm9jdXMoKTtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLmJsdXJUaW1lcik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnXG5cdFx0XHR9KTtcblx0XHRcdGlmICghdGhpcy5faW5wdXRJc0ZvY3VzZWQpIHtcblx0XHRcdFx0dGhpcy5yZWZzLmlucHV0LmdldERPTU5vZGUoKS5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0XG5cdGhhbmRsZUZvY3VzOiBmdW5jdGlvbigpIHtcblx0XHRpZiAodGhpcy5fY29udHJvbElzRm9jdXNlZCkgcmV0dXJuO1xuXHRcdGxvZ0V2ZW50KCdmb2N1czogY29udHJvbCcpO1xuXHRcdHRoaXMuX2NvbnRyb2xJc0ZvY3VzZWQgPSB0cnVlO1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLmJsdXJUaW1lcik7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5faW5wdXRJc0ZvY3VzZWQpIHtcblx0XHRcdFx0dGhpcy5yZWZzLmlucHV0LmdldERPTU5vZGUoKS5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSwgMCk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc0ZvY3VzZWQ6IHRydWVcblx0XHR9KTtcblx0fSxcblx0XG5cdGhhbmRsZUJsdXI6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLl9jb250cm9sSXNGb2N1c2VkKSByZXR1cm47XG5cdFx0dGhpcy5fY29udHJvbElzRm9jdXNlZCA9IGZhbHNlO1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLmJsdXJUaW1lcik7XG5cblx0XHR2YXIgX2JsdXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdGxvZ0V2ZW50KCdibHVyOiBjb250cm9sJyk7XG5cdFx0XHR2YXIgYmx1clN0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21WYWx1ZSh0aGlzLnN0YXRlLnZhbHVlKTtcblx0XHRcdGJsdXJTdGF0ZS5pc0ZvY3VzZWQgPSBmYWxzZTtcblx0XHRcdGJsdXJTdGF0ZS5pc09wZW4gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLmlzTW91bnRlZCgpKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoYmx1clN0YXRlKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmJsdXJUaW1lciA9IHNldFRpbWVvdXQoX2JsdXIsIDEwMCk7XG5cdH0sXG5cdFxuXHRoYW5kbGVJbnB1dE1vdXNlRG93bjogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRpZiAodGhpcy5faW5wdXRJc0ZvY3VzZWQpIHtcblx0XHRcdGxvZ0V2ZW50KCdjbGljazogaW5wdXQnKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSxcblx0XG5cdGhhbmRsZUlucHV0Rm9jdXM6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0bG9nRXZlbnQoJ2ZvY3VzOiBpbnB1dCcpO1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLmJsdXJUaW1lcik7XG5cdFx0dGhpcy5faW5wdXRJc0ZvY3VzZWQgPSB0cnVlO1xuXHR9LFxuXHRcblx0aGFuZGxlSW5wdXRCbHVyOiBmdW5jdGlvbihldmVudCkge1xuXHRcdGxvZ0V2ZW50KCdibHVyOiBpbnB1dCcpO1xuXHRcdHRoaXMuX2lucHV0SXNGb2N1c2VkID0gZmFsc2U7XG5cdH0sXG5cdFxuXHRoYW5kbGVJbnB1dENoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5hc3luY09wdGlvbnMpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc0xvYWRpbmc6IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLmxvYWRBc3luY09wdGlvbnMoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XG5cdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdGlzT3BlbjogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXHRcblx0YXV0b2xvYWRBc3luY09wdGlvbnM6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMubG9hZEFzeW5jT3B0aW9ucygnJywge30sIGZ1bmN0aW9uKCkge30pO1xuXHR9LFxuXHRcblx0bG9hZEFzeW5jT3B0aW9uczogZnVuY3Rpb24oaW5wdXQsIHN0YXRlKSB7XG5cdFx0XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gaW5wdXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBjYWNoZUtleSA9IGlucHV0LnNsaWNlKDAsIGkpO1xuXHRcdFx0aWYgKHRoaXMuX29wdGlvbnNDYWNoZVtjYWNoZUtleV0gJiYgKGlucHV0ID09PSBjYWNoZUtleSB8fCB0aGlzLl9vcHRpb25zQ2FjaGVbY2FjaGVLZXldLmNvbXBsZXRlKSkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKF8uZXh0ZW5kKHtcblx0XHRcdFx0XHRvcHRpb25zOiB0aGlzLl9vcHRpb25zQ2FjaGVbY2FjaGVLZXldLm9wdGlvbnNcblx0XHRcdFx0fSwgc3RhdGUpKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHR2YXIgdGhpc1JlcXVlc3RJZCA9IHRoaXMuX2N1cnJlbnRSZXF1ZXN0SWQgPSByZXF1ZXN0SWQrKztcblx0XHRcblx0XHR0aGlzLnByb3BzLmFzeW5jT3B0aW9ucyhpbnB1dCwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG5cdFx0XHRcblx0XHRcdHRoaXMuX29wdGlvbnNDYWNoZVtpbnB1dF0gPSBkYXRhO1xuXHRcdFx0XG5cdFx0XHRpZiAodGhpc1JlcXVlc3RJZCAhPT0gdGhpcy5fY3VycmVudFJlcXVlc3RJZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMuc2V0U3RhdGUoXy5leHRlbmQoe1xuXHRcdFx0XHRvcHRpb25zOiBkYXRhLm9wdGlvbnNcblx0XHRcdH0sIHN0YXRlKSk7XG5cdFx0XHRcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFxuXHR9LFxuXHRcblx0ZmlsdGVyT3B0aW9uczogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIF8uZmlsdGVyKHRoaXMuc3RhdGUub3B0aW9ucywgdGhpcy5maWx0ZXJPcHRpb24sIHRoaXMpO1xuXHR9LFxuXHRcblx0ZmlsdGVyT3B0aW9uOiBmdW5jdGlvbihvcCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG5cdFx0XHR8fCBvcC52YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zdGF0ZS5pbnB1dFZhbHVlLnRvTG93ZXJDYXNlKCkpID49IDBcblx0XHRcdHx8IG9wLmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnN0YXRlLmlucHV0VmFsdWUudG9Mb3dlckNhc2UoKSkgPj0gMFxuXHRcdCk7XG5cdH0sXG5cdFxuXHRzZWxlY3RPcHRpb246IGZ1bmN0aW9uKG9wdGlvbikge1xuXHRcdHRoaXMuc2V0VmFsdWUob3B0aW9uKTtcblx0XHR0aGlzLnJlZnMuY29udHJvbC5nZXRET01Ob2RlKCkuZm9jdXMoKTtcblx0fSxcblx0XG5cdHNldFZhbHVlOiBmdW5jdGlvbihvcHRpb24pIHtcblx0XHR2YXIgbmV3U3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVZhbHVlKG9wdGlvbik7XG5cdFx0bmV3U3RhdGUuaXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cdH0sXG5cdFxuXHRzZWxlY3RGb2N1c2VkT3B0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRWYWx1ZSh0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24pO1xuXHR9LFxuXHRcblx0Y2xlYXJWYWx1ZTogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRsb2dFdmVudCgnY2xlYXIgdmFsdWUnKTtcblx0XHR0aGlzLnNldFZhbHVlKG51bGwpO1xuXHR9LFxuXHRcblx0Y2xvc2VPbkVzY2FwZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5zZXRWYWx1ZSh0aGlzLnN0YXRlLnZhbHVlKTtcblx0fSxcblx0XG5cdGZvY3VzT3B0aW9uOiBmdW5jdGlvbihvcCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Zm9jdXNlZE9wdGlvbjogb3Bcblx0XHR9KTtcblx0fSxcblx0XG5cdHVuZm9jdXNPcHRpb246IGZ1bmN0aW9uKG9wKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbiA9PT0gb3ApIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uOiBudWxsXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cdFxuXHRmb2N1c05leHRPcHRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignbmV4dCcpO1xuXHR9LFxuXHRcblx0Zm9jdXNQcmV2aW91c09wdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwcmV2aW91cycpO1xuXHR9LFxuXHRcblx0Zm9jdXNBZGphY2VudE9wdGlvbjogZnVuY3Rpb24oZGlyKSB7XG5cdFx0XG5cdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdFx0aW5wdXRWYWx1ZTogJydcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHR2YXIgb3BzID0gdGhpcy5maWx0ZXJPcHRpb25zKCk7XG5cdFx0XG5cdFx0aWYgKCFvcHMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBmb2N1c2VkSW5kZXggPSAtMTtcblx0XHRcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9wcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbiA9PT0gb3BzW2ldKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IGk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHR2YXIgZm9jdXNlZE9wdGlvbiA9IG9wc1swXTtcblx0XHRcblx0XHRpZiAoZGlyID09PSAnbmV4dCcgJiYgZm9jdXNlZEluZGV4ID4gLTEgJiYgZm9jdXNlZEluZGV4IDwgb3BzLmxlbmd0aCAtIDEpIHtcblx0XHRcdGZvY3VzZWRPcHRpb24gPSBvcHNbZm9jdXNlZEluZGV4ICsgMV07XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwcmV2aW91cycpIHtcblx0XHRcdGlmIChmb2N1c2VkSW5kZXggPiAwKSB7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb24gPSBvcHNbZm9jdXNlZEluZGV4IC0gMV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uID0gb3BzW29wcy5sZW5ndGggLSAxXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBmb2N1c2VkT3B0aW9uXG5cdFx0fSk7XG5cdFx0XG5cdH0sXG5cdFxuXHRidWlsZE1lbnU6IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdHZhciBvcHMgPSBbXTtcblxuXHRcdF8uZWFjaCh0aGlzLmZpbHRlck9wdGlvbnMoKSwgZnVuY3Rpb24ob3ApIHtcblx0XHRcdFxuXHRcdFx0dmFyIG9wdGlvbkNsYXNzID0gY2xhc3Nlcyh7XG5cdFx0XHRcdCdTZWxlY3Qtb3B0aW9uJzogdHJ1ZSxcblx0XHRcdFx0J2lzLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24gPT09IG9wXG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0dmFyIG1vdXNlRW50ZXIgPSB0aGlzLmZvY3VzT3B0aW9uLmJpbmQodGhpcywgb3ApLFxuXHRcdFx0XHRtb3VzZUxlYXZlID0gdGhpcy51bmZvY3VzT3B0aW9uLmJpbmQodGhpcywgb3ApLFxuXHRcdFx0XHRtb3VzZURvd24gPSB0aGlzLnNlbGVjdE9wdGlvbi5iaW5kKHRoaXMsIG9wKTtcblx0XHRcdFxuXHRcdFx0b3BzLnB1c2goUmVhY3QuRE9NLmRpdih7XG5cdFx0XHRcdGNsYXNzTmFtZTogb3B0aW9uQ2xhc3MsXG5cdFx0XHRcdG9uTW91c2VFbnRlcjogbW91c2VFbnRlcixcblx0XHRcdFx0b25Nb3VzZUxlYXZlOiBtb3VzZUxlYXZlLFxuXHRcdFx0XHRvbk1vdXNlRG93bjogbW91c2VEb3duXG5cdFx0XHR9LCBvcC5sYWJlbCkpO1xuXHRcdFx0XG5cdFx0fSwgdGhpcyk7XG5cdFx0XG5cdFx0aWYgKF8uaXNFbXB0eShvcHMpKSB7XG5cdFx0XHRvcHMucHVzaChSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiU2VsZWN0LW5vcmVzdWx0c1wifSwgXCJObyByZXN1bHRzIGZvdW5kXCIpKTtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIG9wcztcblx0XHRcblx0fSxcblx0XG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XG5cdFx0bG9nRXZlbnQoJ3JlbmRlcicpO1xuXHRcdFxuXHRcdHZhciBtZW51ID0gdGhpcy5zdGF0ZS5pc09wZW4gPyBSZWFjdC5ET00uZGl2KHsgY2xhc3NOYW1lOiBcIlNlbGVjdC1tZW51XCIgfSwgdGhpcy5idWlsZE1lbnUoKSkgOiBudWxsO1xuXHRcdHZhciBsb2FkaW5nID0gdGhpcy5zdGF0ZS5pc0xvYWRpbmcgPyBSZWFjdC5ET00uc3Bhbih7IGNsYXNzTmFtZTogXCJTZWxlY3QtbG9hZGluZ1wiIH0pIDogbnVsbDtcblx0XHR2YXIgY2xlYXIgPSB0aGlzLnN0YXRlLnZhbHVlID8gUmVhY3QuRE9NLnNwYW4oeyBjbGFzc05hbWU6IFwiU2VsZWN0LWNsZWFyXCIsIG9uQ2xpY2s6IHRoaXMuY2xlYXJWYWx1ZSwgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHsgX19odG1sOiAnJnRpbWVzOycgfSB9KSA6IG51bGw7XG5cdFx0XG5cdFx0dmFyIHNlbGVjdENsYXNzID0gY2xhc3NlcygnU2VsZWN0Jywge1xuXHRcdFx0J2lzLW11bHRpJzogdGhpcy5wcm9wcy5tdWx0aSxcblx0XHRcdCdpcy1vcGVuJzogdGhpcy5zdGF0ZS5pc09wZW4sXG5cdFx0XHQnaXMtZm9jdXNlZCc6IHRoaXMuc3RhdGUuaXNGb2N1c2VkLFxuXHRcdFx0J2lzLWxvYWRpbmcnOiB0aGlzLnN0YXRlLmlzTG9hZGluZyxcblx0XHRcdCdoYXMtdmFsdWUnOiB0aGlzLnN0YXRlLnZhbHVlXG5cdFx0fSk7XG5cdFx0XG5cdFx0cmV0dXJuIFJlYWN0LkRPTS5kaXYoeyBjbGFzc05hbWU6IHNlbGVjdENsYXNzIH0sIFxuXHRcdFx0UmVhY3QuRE9NLmlucHV0KHsgdHlwZTogXCJoaWRkZW5cIiwgcmVmOiBcInZhbHVlXCIsIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUgfSksIFxuXHRcdFx0UmVhY3QuRE9NLmRpdih7IGNsYXNzTmFtZTogXCJTZWxlY3QtY29udHJvbFwiLCB0YWJJbmRleDogXCItMVwiLCByZWY6IFwiY29udHJvbFwiLCBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93biwgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlTW91c2VEb3duLCBvbkZvY3VzOiB0aGlzLmhhbmRsZUZvY3VzLCBvbkJsdXI6IHRoaXMuaGFuZGxlQmx1ciB9LCBcblx0XHRcdFx0UmVhY3QuRE9NLmlucHV0KHsgY2xhc3NOYW1lOiBcIlNlbGVjdC1pbnB1dFwiLCBwbGFjZWhvbGRlcjogdGhpcy5zdGF0ZS5wbGFjZWhvbGRlciwgcmVmOiBcImlucHV0XCIsIG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZUlucHV0TW91c2VEb3duLCB2YWx1ZTogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlLCBvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsIG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dEJsdXIsIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlIH0pLCBcblx0XHRcdFx0UmVhY3QuRE9NLnNwYW4oeyBjbGFzc05hbWU6IFwiU2VsZWN0LWFycm93XCIgfSksXG5cdFx0XHRcdGxvYWRpbmcsXG5cdFx0XHRcdGNsZWFyXG5cdFx0XHQpLCBcblx0XHRcdG1lbnVcblx0XHQpO1xuXHR9XG5cdFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0O1xuIl19
