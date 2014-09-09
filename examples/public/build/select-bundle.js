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

var Select = React.createClass({
	
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
		var selectedOption = ('string' === typeof value) ? _.findWhere(this.props.options, { value: value }) : value;
		return selectedOption ? {
			value: value,
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
	
	keyboardActions: {
		13: 'selectFocusedOption',
		27: 'closeOnEscape',
		38: 'focusPreviousOption',
		40: 'focusNextOption'
	},
	
	handleKeyDown: function(event) {
		logEvent('------');
		logEvent(event);
		var action = this.keyboardActions[event.keyCode];
		if (!action) {
			return;
		}
		event.preventDefault();
		this[action].call(this);
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
		this.blurTimer = setTimeout(function() {
			logEvent('blur: control');
			var blurState = this.getStateFromValue(this.state.value);
			blurState.isFocused = false;
			blurState.isOpen = false;
			this.setState(blurState);
		}.bind(this), 100);
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
		
		var ops = {};
		
		_.each(this.filterOptions(), function(op) {
			
			var optionClass = classes({
				'Select-option': true,
				'is-focused': this.state.focusedOption === op
			});
			
			var mouseEnter = this.focusOption.bind(this, op),
				mouseLeave = this.unfocusOption.bind(this, op),
				mouseDown = this.selectOption.bind(this, op);
			
			ops[op.value] = React.DOM.div({
				className: optionClass,
				onMouseEnter: mouseEnter,
				onMouseLeave: mouseLeave,
				onMouseDown: mouseDown
			}, op.label);
			
		}, this);
		
		if (_.isEmpty(ops)) {
			ops._no_ops = React.DOM.div({className: "Select-noresults"}, "No results found");
		}
		
		return ops;
		
	},
	
	render: function() {
		
		logEvent('render');
		
		var menu = this.state.isOpen ? React.DOM.div({ className: "Select-menu" }, this.buildMenu()) : null;
		var loading = this.state.isLoading ? React.DOM.span({ className: "Select-loading" }) : null;
		var clear = this.state.value ? React.DOM.span({ className: "Select-clear", onClick: this.clearValue, dangerouslySetInnerHTML: { __html: '&times;' } }) : null;
		
		var selectClass = classes('Select', {
			'is-open': this.state.isOpen,
			'is-focused': this.state.isFocused
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9KZWQvRGV2ZWxvcG1lbnQvUGFja2FnZXMvcmVhY3Qtc2VsZWN0L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2xpYi9zZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKSxcblx0UmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XG5cbnZhciBsb2dFdmVudCA9IGZ1bmN0aW9uKG1zZykge1xuXHRjb25zb2xlLmxvZyhtc2cpO1xufTtcblxuLy8gY29tbWVudCBvdXQgdGhpcyBsaW5lIHRvIGRlYnVnIHRoZSBjb250cm9sIHN0YXRlXG5sb2dFdmVudCA9IG5vb3A7XG5cbnZhciBjbGFzc2VzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBydG4gPSBbXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBhcmd1bWVudHNbaV0pIHtcblx0XHRcdHJ0bi5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0fSBlbHNlIGlmIChfLmlzT2JqZWN0KGFyZ3VtZW50c1tpXSkpIHtcblx0XHRcdF8uZWFjaChhcmd1bWVudHNbaV0sIGZ1bmN0aW9uKHZhbCwga2V5KSB7XG5cdFx0XHRcdGlmICh2YWwpIHtcblx0XHRcdFx0XHRydG4ucHVzaChrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJ0bi5qb2luKCcgJykgfHwgdW5kZWZpbmVkO1xufVxuXG52YXIgcmVxdWVzdElkID0gMDtcblxudmFyIFNlbGVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGF1dG9sb2FkOiB0cnVlXG5cdFx0fTtcblx0fSxcblx0XG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxuXHRcdFx0aW5wdXRWYWx1ZTogJycsXG5cdFx0XHRwbGFjZWhvbGRlcjogJycsXG5cdFx0XHRvcHRpb25zOiB0aGlzLnByb3BzLm9wdGlvbnMgfHwgW10sXG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBudWxsLFxuXHRcdFx0aXNGb2N1c2VkOiBmYWxzZSxcblx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRpc0xvYWRpbmc6IGZhbHNlXG5cdFx0fTtcblx0fSxcblx0XG5cdGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0XG5cdFx0dGhpcy5fb3B0aW9uc0NhY2hlID0ge307XG5cdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLmdldFN0YXRlRnJvbVZhbHVlKHRoaXMuc3RhdGUudmFsdWUpKTtcblx0XHRcblx0XHRpZiAodGhpcy5wcm9wcy5hc3luY09wdGlvbnMgJiYgdGhpcy5wcm9wcy5hdXRvbG9hZCkge1xuXHRcdFx0dGhpcy5hdXRvbG9hZEFzeW5jT3B0aW9ucygpO1xuXHRcdH1cblx0XHRcblx0fSxcblx0XG5cdGdldFN0YXRlRnJvbVZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHZhciBzZWxlY3RlZE9wdGlvbiA9ICgnc3RyaW5nJyA9PT0gdHlwZW9mIHZhbHVlKSA/IF8uZmluZFdoZXJlKHRoaXMucHJvcHMub3B0aW9ucywgeyB2YWx1ZTogdmFsdWUgfSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gc2VsZWN0ZWRPcHRpb24gPyB7XG5cdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRpbnB1dFZhbHVlOiBzZWxlY3RlZE9wdGlvbi5sYWJlbCxcblx0XHRcdHBsYWNlaG9sZGVyOiBzZWxlY3RlZE9wdGlvbi5sYWJlbCxcblx0XHRcdGZvY3VzZWRPcHRpb246IHNlbGVjdGVkT3B0aW9uXG5cdFx0fSA6IHtcblx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0cGxhY2Vob2xkZXI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgJ1NlbGVjdC4uLicsXG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBudWxsXG5cdFx0fTtcblx0fSxcblx0XG5cdGtleWJvYXJkQWN0aW9uczoge1xuXHRcdDEzOiAnc2VsZWN0Rm9jdXNlZE9wdGlvbicsXG5cdFx0Mjc6ICdjbG9zZU9uRXNjYXBlJyxcblx0XHQzODogJ2ZvY3VzUHJldmlvdXNPcHRpb24nLFxuXHRcdDQwOiAnZm9jdXNOZXh0T3B0aW9uJ1xuXHR9LFxuXHRcblx0aGFuZGxlS2V5RG93bjogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRsb2dFdmVudCgnLS0tLS0tJyk7XG5cdFx0bG9nRXZlbnQoZXZlbnQpO1xuXHRcdHZhciBhY3Rpb24gPSB0aGlzLmtleWJvYXJkQWN0aW9uc1tldmVudC5rZXlDb2RlXTtcblx0XHRpZiAoIWFjdGlvbikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXNbYWN0aW9uXS5jYWxsKHRoaXMpO1xuXHR9LFxuXHRcblx0aGFuZGxlTW91c2VEb3duOiBmdW5jdGlvbigpIHtcblx0XHRsb2dFdmVudCgnY2xpY2s6IGNvbnRyb2wnKTtcblx0XHRpZiAodGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IGZhbHNlXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuX2NvbnRyb2xJc0ZvY3VzZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5yZWZzLmNvbnRyb2wuZ2V0RE9NTm9kZSgpLmZvY3VzKCk7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5ibHVyVGltZXIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiAnJ1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAoIXRoaXMuX2lucHV0SXNGb2N1c2VkKSB7XG5cdFx0XHRcdHRoaXMucmVmcy5pbnB1dC5nZXRET01Ob2RlKCkuZm9jdXMoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdFxuXHRoYW5kbGVGb2N1czogZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHRoaXMuX2NvbnRyb2xJc0ZvY3VzZWQpIHJldHVybjtcblx0XHRsb2dFdmVudCgnZm9jdXM6IGNvbnRyb2wnKTtcblx0XHR0aGlzLl9jb250cm9sSXNGb2N1c2VkID0gdHJ1ZTtcblx0XHRjbGVhclRpbWVvdXQodGhpcy5ibHVyVGltZXIpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIXRoaXMuX2lucHV0SXNGb2N1c2VkKSB7XG5cdFx0XHRcdHRoaXMucmVmcy5pbnB1dC5nZXRET01Ob2RlKCkuZm9jdXMoKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcyksIDApO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aXNGb2N1c2VkOiB0cnVlXG5cdFx0fSk7XG5cdH0sXG5cdFxuXHRoYW5kbGVCbHVyOiBmdW5jdGlvbihldmVudCkge1xuXHRcdGlmICghdGhpcy5fY29udHJvbElzRm9jdXNlZCkgcmV0dXJuO1xuXHRcdHRoaXMuX2NvbnRyb2xJc0ZvY3VzZWQgPSBmYWxzZTtcblx0XHRjbGVhclRpbWVvdXQodGhpcy5ibHVyVGltZXIpO1xuXHRcdHRoaXMuYmx1clRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGxvZ0V2ZW50KCdibHVyOiBjb250cm9sJyk7XG5cdFx0XHR2YXIgYmx1clN0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21WYWx1ZSh0aGlzLnN0YXRlLnZhbHVlKTtcblx0XHRcdGJsdXJTdGF0ZS5pc0ZvY3VzZWQgPSBmYWxzZTtcblx0XHRcdGJsdXJTdGF0ZS5pc09wZW4gPSBmYWxzZTtcblx0XHRcdHRoaXMuc2V0U3RhdGUoYmx1clN0YXRlKTtcblx0XHR9LmJpbmQodGhpcyksIDEwMCk7XG5cdH0sXG5cdFxuXHRoYW5kbGVJbnB1dE1vdXNlRG93bjogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRpZiAodGhpcy5faW5wdXRJc0ZvY3VzZWQpIHtcblx0XHRcdGxvZ0V2ZW50KCdjbGljazogaW5wdXQnKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSxcblx0XG5cdGhhbmRsZUlucHV0Rm9jdXM6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0bG9nRXZlbnQoJ2ZvY3VzOiBpbnB1dCcpO1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLmJsdXJUaW1lcik7XG5cdFx0dGhpcy5faW5wdXRJc0ZvY3VzZWQgPSB0cnVlO1xuXHR9LFxuXHRcblx0aGFuZGxlSW5wdXRCbHVyOiBmdW5jdGlvbihldmVudCkge1xuXHRcdGxvZ0V2ZW50KCdibHVyOiBpbnB1dCcpO1xuXHRcdHRoaXMuX2lucHV0SXNGb2N1c2VkID0gZmFsc2U7XG5cdH0sXG5cdFxuXHRoYW5kbGVJbnB1dENoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5hc3luY09wdGlvbnMpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc0xvYWRpbmc6IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLmxvYWRBc3luY09wdGlvbnMoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XG5cdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdGlzT3BlbjogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXHRcblx0YXV0b2xvYWRBc3luY09wdGlvbnM6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMubG9hZEFzeW5jT3B0aW9ucygnJywge30sIGZ1bmN0aW9uKCkge30pO1xuXHR9LFxuXHRcblx0bG9hZEFzeW5jT3B0aW9uczogZnVuY3Rpb24oaW5wdXQsIHN0YXRlKSB7XG5cdFx0XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gaW5wdXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBjYWNoZUtleSA9IGlucHV0LnNsaWNlKDAsIGkpO1xuXHRcdFx0aWYgKHRoaXMuX29wdGlvbnNDYWNoZVtjYWNoZUtleV0gJiYgKGlucHV0ID09PSBjYWNoZUtleSB8fCB0aGlzLl9vcHRpb25zQ2FjaGVbY2FjaGVLZXldLmNvbXBsZXRlKSkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKF8uZXh0ZW5kKHtcblx0XHRcdFx0XHRvcHRpb25zOiB0aGlzLl9vcHRpb25zQ2FjaGVbY2FjaGVLZXldLm9wdGlvbnNcblx0XHRcdFx0fSwgc3RhdGUpKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHR2YXIgdGhpc1JlcXVlc3RJZCA9IHRoaXMuX2N1cnJlbnRSZXF1ZXN0SWQgPSByZXF1ZXN0SWQrKztcblx0XHRcblx0XHR0aGlzLnByb3BzLmFzeW5jT3B0aW9ucyhpbnB1dCwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG5cdFx0XHRcblx0XHRcdHRoaXMuX29wdGlvbnNDYWNoZVtpbnB1dF0gPSBkYXRhO1xuXHRcdFx0XG5cdFx0XHRpZiAodGhpc1JlcXVlc3RJZCAhPT0gdGhpcy5fY3VycmVudFJlcXVlc3RJZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMuc2V0U3RhdGUoXy5leHRlbmQoe1xuXHRcdFx0XHRvcHRpb25zOiBkYXRhLm9wdGlvbnNcblx0XHRcdH0sIHN0YXRlKSk7XG5cdFx0XHRcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFxuXHR9LFxuXHRcblx0ZmlsdGVyT3B0aW9uczogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIF8uZmlsdGVyKHRoaXMuc3RhdGUub3B0aW9ucywgdGhpcy5maWx0ZXJPcHRpb24sIHRoaXMpO1xuXHR9LFxuXHRcblx0ZmlsdGVyT3B0aW9uOiBmdW5jdGlvbihvcCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG5cdFx0XHR8fCBvcC52YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zdGF0ZS5pbnB1dFZhbHVlLnRvTG93ZXJDYXNlKCkpID49IDBcblx0XHRcdHx8IG9wLmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnN0YXRlLmlucHV0VmFsdWUudG9Mb3dlckNhc2UoKSkgPj0gMFxuXHRcdCk7XG5cdH0sXG5cdFxuXHRzZWxlY3RPcHRpb246IGZ1bmN0aW9uKG9wdGlvbikge1xuXHRcdHRoaXMuc2V0VmFsdWUob3B0aW9uKTtcblx0XHR0aGlzLnJlZnMuY29udHJvbC5nZXRET01Ob2RlKCkuZm9jdXMoKTtcblx0fSxcblx0XG5cdHNldFZhbHVlOiBmdW5jdGlvbihvcHRpb24pIHtcblx0XHR2YXIgbmV3U3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVZhbHVlKG9wdGlvbik7XG5cdFx0bmV3U3RhdGUuaXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cdH0sXG5cdFxuXHRzZWxlY3RGb2N1c2VkT3B0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRWYWx1ZSh0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24pO1xuXHR9LFxuXHRcblx0Y2xlYXJWYWx1ZTogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRsb2dFdmVudCgnY2xlYXIgdmFsdWUnKTtcblx0XHR0aGlzLnNldFZhbHVlKG51bGwpO1xuXHR9LFxuXHRcblx0Y2xvc2VPbkVzY2FwZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5zZXRWYWx1ZSh0aGlzLnN0YXRlLnZhbHVlKTtcblx0fSxcblx0XG5cdGZvY3VzT3B0aW9uOiBmdW5jdGlvbihvcCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Zm9jdXNlZE9wdGlvbjogb3Bcblx0XHR9KTtcblx0fSxcblx0XG5cdHVuZm9jdXNPcHRpb246IGZ1bmN0aW9uKG9wKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbiA9PT0gb3ApIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uOiBudWxsXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cdFxuXHRmb2N1c05leHRPcHRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignbmV4dCcpO1xuXHR9LFxuXHRcblx0Zm9jdXNQcmV2aW91c09wdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwcmV2aW91cycpO1xuXHR9LFxuXHRcblx0Zm9jdXNBZGphY2VudE9wdGlvbjogZnVuY3Rpb24oZGlyKSB7XG5cdFx0XG5cdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdFx0aW5wdXRWYWx1ZTogJydcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHR2YXIgb3BzID0gdGhpcy5maWx0ZXJPcHRpb25zKCk7XG5cdFx0XG5cdFx0aWYgKCFvcHMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBmb2N1c2VkSW5kZXggPSAtMTtcblx0XHRcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9wcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbiA9PT0gb3BzW2ldKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IGk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHR2YXIgZm9jdXNlZE9wdGlvbiA9IG9wc1swXTtcblx0XHRcblx0XHRpZiAoZGlyID09PSAnbmV4dCcgJiYgZm9jdXNlZEluZGV4ID4gLTEgJiYgZm9jdXNlZEluZGV4IDwgb3BzLmxlbmd0aCAtIDEpIHtcblx0XHRcdGZvY3VzZWRPcHRpb24gPSBvcHNbZm9jdXNlZEluZGV4ICsgMV07XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwcmV2aW91cycpIHtcblx0XHRcdGlmIChmb2N1c2VkSW5kZXggPiAwKSB7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb24gPSBvcHNbZm9jdXNlZEluZGV4IC0gMV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uID0gb3BzW29wcy5sZW5ndGggLSAxXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBmb2N1c2VkT3B0aW9uXG5cdFx0fSk7XG5cdFx0XG5cdH0sXG5cdFxuXHRidWlsZE1lbnU6IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdHZhciBvcHMgPSB7fTtcblx0XHRcblx0XHRfLmVhY2godGhpcy5maWx0ZXJPcHRpb25zKCksIGZ1bmN0aW9uKG9wKSB7XG5cdFx0XHRcblx0XHRcdHZhciBvcHRpb25DbGFzcyA9IGNsYXNzZXMoe1xuXHRcdFx0XHQnU2VsZWN0LW9wdGlvbic6IHRydWUsXG5cdFx0XHRcdCdpcy1mb2N1c2VkJzogdGhpcy5zdGF0ZS5mb2N1c2VkT3B0aW9uID09PSBvcFxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHZhciBtb3VzZUVudGVyID0gdGhpcy5mb2N1c09wdGlvbi5iaW5kKHRoaXMsIG9wKSxcblx0XHRcdFx0bW91c2VMZWF2ZSA9IHRoaXMudW5mb2N1c09wdGlvbi5iaW5kKHRoaXMsIG9wKSxcblx0XHRcdFx0bW91c2VEb3duID0gdGhpcy5zZWxlY3RPcHRpb24uYmluZCh0aGlzLCBvcCk7XG5cdFx0XHRcblx0XHRcdG9wc1tvcC52YWx1ZV0gPSBSZWFjdC5ET00uZGl2KHtcblx0XHRcdFx0Y2xhc3NOYW1lOiBvcHRpb25DbGFzcyxcblx0XHRcdFx0b25Nb3VzZUVudGVyOiBtb3VzZUVudGVyLFxuXHRcdFx0XHRvbk1vdXNlTGVhdmU6IG1vdXNlTGVhdmUsXG5cdFx0XHRcdG9uTW91c2VEb3duOiBtb3VzZURvd25cblx0XHRcdH0sIG9wLmxhYmVsKTtcblx0XHRcdFxuXHRcdH0sIHRoaXMpO1xuXHRcdFxuXHRcdGlmIChfLmlzRW1wdHkob3BzKSkge1xuXHRcdFx0b3BzLl9ub19vcHMgPSBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiU2VsZWN0LW5vcmVzdWx0c1wifSwgXCJObyByZXN1bHRzIGZvdW5kXCIpO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gb3BzO1xuXHRcdFxuXHR9LFxuXHRcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcblx0XHRsb2dFdmVudCgncmVuZGVyJyk7XG5cdFx0XG5cdFx0dmFyIG1lbnUgPSB0aGlzLnN0YXRlLmlzT3BlbiA/IFJlYWN0LkRPTS5kaXYoeyBjbGFzc05hbWU6IFwiU2VsZWN0LW1lbnVcIiB9LCB0aGlzLmJ1aWxkTWVudSgpKSA6IG51bGw7XG5cdFx0dmFyIGxvYWRpbmcgPSB0aGlzLnN0YXRlLmlzTG9hZGluZyA/IFJlYWN0LkRPTS5zcGFuKHsgY2xhc3NOYW1lOiBcIlNlbGVjdC1sb2FkaW5nXCIgfSkgOiBudWxsO1xuXHRcdHZhciBjbGVhciA9IHRoaXMuc3RhdGUudmFsdWUgPyBSZWFjdC5ET00uc3Bhbih7IGNsYXNzTmFtZTogXCJTZWxlY3QtY2xlYXJcIiwgb25DbGljazogdGhpcy5jbGVhclZhbHVlLCBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6ICcmdGltZXM7JyB9IH0pIDogbnVsbDtcblx0XHRcblx0XHR2YXIgc2VsZWN0Q2xhc3MgPSBjbGFzc2VzKCdTZWxlY3QnLCB7XG5cdFx0XHQnaXMtb3Blbic6IHRoaXMuc3RhdGUuaXNPcGVuLFxuXHRcdFx0J2lzLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmlzRm9jdXNlZFxuXHRcdH0pO1xuXHRcdFxuXHRcdHJldHVybiBSZWFjdC5ET00uZGl2KHsgY2xhc3NOYW1lOiBzZWxlY3RDbGFzcyB9LCBcblx0XHRcdFJlYWN0LkRPTS5pbnB1dCh7IHR5cGU6IFwiaGlkZGVuXCIsIHJlZjogXCJ2YWx1ZVwiLCBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlIH0pLCBcblx0XHRcdFJlYWN0LkRPTS5kaXYoeyBjbGFzc05hbWU6IFwiU2VsZWN0LWNvbnRyb2xcIiwgdGFiSW5kZXg6IFwiLTFcIiwgcmVmOiBcImNvbnRyb2xcIiwgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sIG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZU1vdXNlRG93biwgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cywgb25CbHVyOiB0aGlzLmhhbmRsZUJsdXIgfSwgXG5cdFx0XHRcdFJlYWN0LkRPTS5pbnB1dCh7IGNsYXNzTmFtZTogXCJTZWxlY3QtaW5wdXRcIiwgcGxhY2Vob2xkZXI6IHRoaXMuc3RhdGUucGxhY2Vob2xkZXIsIHJlZjogXCJpbnB1dFwiLCBvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVJbnB1dE1vdXNlRG93biwgdmFsdWU6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSwgb25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLCBvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXRCbHVyLCBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSB9KSwgXG5cdFx0XHRcdFJlYWN0LkRPTS5zcGFuKHsgY2xhc3NOYW1lOiBcIlNlbGVjdC1hcnJvd1wiIH0pLFxuXHRcdFx0XHRsb2FkaW5nLFxuXHRcdFx0XHRjbGVhclxuXHRcdFx0KSwgXG5cdFx0XHRtZW51XG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcbiJdfQ==
