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

var Select = React.createClass({
		
	getInitialState: function() {
		return {
			value: this.props.value,
			inputValue: '',
			placeholder: '',
			focusedOption: null,
			isFocused: false,
			isOpen: false
		};
	},
	
	componentWillMount: function() {
		this.setState(this.getStateFromValue(this.state.value));
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
		this.setState({
			isOpen: true,
			inputValue: event.target.value
		});
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
	
	filterOptions: function() {
		return _.filter(this.props.options, this.filterOption, this);
	},
	
	filterOption: function(op) {
		return (
			!this.state.inputValue
			|| op.value.toLowerCase().indexOf(this.state.inputValue.toLowerCase()) >= 0
			|| op.label.toLowerCase().indexOf(this.state.inputValue.toLowerCase()) >= 0
		);
	},
	
	getOptions: function() {
		
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
		// console.log(this.state);
		
		var menu = this.state.isOpen ? React.DOM.div({ className: "Select-menu" }, this.getOptions()) : null;
		var clear = this.state.value ? React.DOM.span({ className: "Select-clear", onClick: this.clearValue }, "×") : null;
		
		var selectClass = classes('Select', {
			'is-open': this.state.isOpen,
			'is-focused': this.state.isFocused
		});
		
		return React.DOM.div({ className: selectClass }, 
			React.DOM.input({ type: "hidden", ref: "value", name: this.props.name, value: this.state.value }), 
			React.DOM.div({ className: "Select-control", tabIndex: "-1", ref: "control", onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onFocus: this.handleFocus, onBlur: this.handleBlur }, 
				React.DOM.input({ className: "Select-input", placeholder: this.state.placeholder, ref: "input", onMouseDown: this.handleInputMouseDown, value: this.state.inputValue, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, onChange: this.handleInputChange }), 
				clear
			), 
			menu
		);
	}
	
});

module.exports = Select;

},{"react":undefined,"underscore":undefined}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9KZWQvRGV2ZWxvcG1lbnQvUGFja2FnZXMvcmVhY3Qtc2VsZWN0L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2xpYi9zZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyksXG5cdFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuXG52YXIgbG9nRXZlbnQgPSBmdW5jdGlvbihtc2cpIHtcblx0Y29uc29sZS5sb2cobXNnKTtcbn07XG5cbi8vIGNvbW1lbnQgb3V0IHRoaXMgbGluZSB0byBkZWJ1ZyB0aGUgY29udHJvbCBzdGF0ZVxubG9nRXZlbnQgPSBub29wO1xuXG52YXIgY2xhc3NlcyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgcnRuID0gW107XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKCdzdHJpbmcnID09PSB0eXBlb2YgYXJndW1lbnRzW2ldKSB7XG5cdFx0XHRydG4ucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdH0gZWxzZSBpZiAoXy5pc09iamVjdChhcmd1bWVudHNbaV0pKSB7XG5cdFx0XHRfLmVhY2goYXJndW1lbnRzW2ldLCBmdW5jdGlvbih2YWwsIGtleSkge1xuXHRcdFx0XHRpZiAodmFsKSB7XG5cdFx0XHRcdFx0cnRuLnB1c2goa2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBydG4uam9pbignICcpIHx8IHVuZGVmaW5lZDtcbn1cblxudmFyIFNlbGVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdHBsYWNlaG9sZGVyOiAnJyxcblx0XHRcdGZvY3VzZWRPcHRpb246IG51bGwsXG5cdFx0XHRpc0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0aXNPcGVuOiBmYWxzZVxuXHRcdH07XG5cdH0sXG5cdFxuXHRjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUodGhpcy5nZXRTdGF0ZUZyb21WYWx1ZSh0aGlzLnN0YXRlLnZhbHVlKSk7XG5cdH0sXG5cdFxuXHRnZXRTdGF0ZUZyb21WYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcblx0XHR2YXIgc2VsZWN0ZWRPcHRpb24gPSAoJ3N0cmluZycgPT09IHR5cGVvZiB2YWx1ZSkgPyBfLmZpbmRXaGVyZSh0aGlzLnByb3BzLm9wdGlvbnMsIHsgdmFsdWU6IHZhbHVlIH0pIDogdmFsdWU7XG5cdFx0cmV0dXJuIHNlbGVjdGVkT3B0aW9uID8ge1xuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0aW5wdXRWYWx1ZTogc2VsZWN0ZWRPcHRpb24ubGFiZWwsXG5cdFx0XHRwbGFjZWhvbGRlcjogc2VsZWN0ZWRPcHRpb24ubGFiZWwsXG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBzZWxlY3RlZE9wdGlvblxuXHRcdH0gOiB7XG5cdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8ICdTZWxlY3QuLi4nLFxuXHRcdFx0Zm9jdXNlZE9wdGlvbjogbnVsbFxuXHRcdH07XG5cdH0sXG5cdFxuXHRrZXlib2FyZEFjdGlvbnM6IHtcblx0XHQxMzogJ3NlbGVjdEZvY3VzZWRPcHRpb24nLFxuXHRcdDI3OiAnY2xvc2VPbkVzY2FwZScsXG5cdFx0Mzg6ICdmb2N1c1ByZXZpb3VzT3B0aW9uJyxcblx0XHQ0MDogJ2ZvY3VzTmV4dE9wdGlvbidcblx0fSxcblx0XG5cdGhhbmRsZUtleURvd246IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0bG9nRXZlbnQoJy0tLS0tLScpO1xuXHRcdGxvZ0V2ZW50KGV2ZW50KTtcblx0XHR2YXIgYWN0aW9uID0gdGhpcy5rZXlib2FyZEFjdGlvbnNbZXZlbnQua2V5Q29kZV07XG5cdFx0aWYgKCFhY3Rpb24pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzW2FjdGlvbl0uY2FsbCh0aGlzKTtcblx0fSxcblx0XG5cdGhhbmRsZU1vdXNlRG93bjogZnVuY3Rpb24oKSB7XG5cdFx0bG9nRXZlbnQoJ2NsaWNrOiBjb250cm9sJyk7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aXNPcGVuOiBmYWxzZVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLl9jb250cm9sSXNGb2N1c2VkID0gdHJ1ZTtcblx0XHRcdHRoaXMucmVmcy5jb250cm9sLmdldERPTU5vZGUoKS5mb2N1cygpO1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuYmx1clRpbWVyKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdFx0aW5wdXRWYWx1ZTogJydcblx0XHRcdH0pO1xuXHRcdFx0aWYgKCF0aGlzLl9pbnB1dElzRm9jdXNlZCkge1xuXHRcdFx0XHR0aGlzLnJlZnMuaW5wdXQuZ2V0RE9NTm9kZSgpLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRcblx0aGFuZGxlRm9jdXM6IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aGlzLl9jb250cm9sSXNGb2N1c2VkKSByZXR1cm47XG5cdFx0bG9nRXZlbnQoJ2ZvY3VzOiBjb250cm9sJyk7XG5cdFx0dGhpcy5fY29udHJvbElzRm9jdXNlZCA9IHRydWU7XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuYmx1clRpbWVyKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCF0aGlzLl9pbnB1dElzRm9jdXNlZCkge1xuXHRcdFx0XHR0aGlzLnJlZnMuaW5wdXQuZ2V0RE9NTm9kZSgpLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpLCAwKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGlzRm9jdXNlZDogdHJ1ZVxuXHRcdH0pO1xuXHR9LFxuXHRcblx0aGFuZGxlQmx1cjogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMuX2NvbnRyb2xJc0ZvY3VzZWQpIHJldHVybjtcblx0XHR0aGlzLl9jb250cm9sSXNGb2N1c2VkID0gZmFsc2U7XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuYmx1clRpbWVyKTtcblx0XHR0aGlzLmJsdXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRsb2dFdmVudCgnYmx1cjogY29udHJvbCcpO1xuXHRcdFx0dmFyIGJsdXJTdGF0ZSA9IHRoaXMuZ2V0U3RhdGVGcm9tVmFsdWUodGhpcy5zdGF0ZS52YWx1ZSk7XG5cdFx0XHRibHVyU3RhdGUuaXNGb2N1c2VkID0gZmFsc2U7XG5cdFx0XHRibHVyU3RhdGUuaXNPcGVuID0gZmFsc2U7XG5cdFx0XHR0aGlzLnNldFN0YXRlKGJsdXJTdGF0ZSk7XG5cdFx0fS5iaW5kKHRoaXMpLCAxMDApO1xuXHR9LFxuXHRcblx0aGFuZGxlSW5wdXRNb3VzZURvd246IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMuX2lucHV0SXNGb2N1c2VkKSB7XG5cdFx0XHRsb2dFdmVudCgnY2xpY2s6IGlucHV0Jyk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdH0sXG5cdFxuXHRoYW5kbGVJbnB1dEZvY3VzOiBmdW5jdGlvbihldmVudCkge1xuXHRcdGxvZ0V2ZW50KCdmb2N1czogaW5wdXQnKTtcblx0XHRjbGVhclRpbWVvdXQodGhpcy5ibHVyVGltZXIpO1xuXHRcdHRoaXMuX2lucHV0SXNGb2N1c2VkID0gdHJ1ZTtcblx0fSxcblx0XG5cdGhhbmRsZUlucHV0Qmx1cjogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRsb2dFdmVudCgnYmx1cjogaW5wdXQnKTtcblx0XHR0aGlzLl9pbnB1dElzRm9jdXNlZCA9IGZhbHNlO1xuXHR9LFxuXHRcblx0aGFuZGxlSW5wdXRDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRpbnB1dFZhbHVlOiBldmVudC50YXJnZXQudmFsdWVcblx0XHR9KTtcblx0fSxcblx0XG5cdHNlbGVjdE9wdGlvbjogZnVuY3Rpb24ob3B0aW9uKSB7XG5cdFx0dGhpcy5zZXRWYWx1ZShvcHRpb24pO1xuXHRcdHRoaXMucmVmcy5jb250cm9sLmdldERPTU5vZGUoKS5mb2N1cygpO1xuXHR9LFxuXHRcblx0c2V0VmFsdWU6IGZ1bmN0aW9uKG9wdGlvbikge1xuXHRcdHZhciBuZXdTdGF0ZSA9IHRoaXMuZ2V0U3RhdGVGcm9tVmFsdWUob3B0aW9uKTtcblx0XHRuZXdTdGF0ZS5pc09wZW4gPSBmYWxzZTtcblx0XHR0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcblx0fSxcblx0XG5cdHNlbGVjdEZvY3VzZWRPcHRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnNldFZhbHVlKHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbik7XG5cdH0sXG5cdFxuXHRjbGVhclZhbHVlOiBmdW5jdGlvbihldmVudCkge1xuXHRcdGxvZ0V2ZW50KCdjbGVhciB2YWx1ZScpO1xuXHRcdHRoaXMuc2V0VmFsdWUobnVsbCk7XG5cdH0sXG5cdFxuXHRjbG9zZU9uRXNjYXBlOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnNldFZhbHVlKHRoaXMuc3RhdGUudmFsdWUpO1xuXHR9LFxuXHRcblx0Zm9jdXNPcHRpb246IGZ1bmN0aW9uKG9wKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBvcFxuXHRcdH0pO1xuXHR9LFxuXHRcblx0dW5mb2N1c09wdGlvbjogZnVuY3Rpb24ob3ApIHtcblx0XHRpZiAodGhpcy5zdGF0ZS5mb2N1c2VkT3B0aW9uID09PSBvcCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb246IG51bGxcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcblx0XG5cdGZvY3VzTmV4dE9wdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCduZXh0Jyk7XG5cdH0sXG5cdFxuXHRmb2N1c1ByZXZpb3VzT3B0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3ByZXZpb3VzJyk7XG5cdH0sXG5cdFxuXHRmb2N1c0FkamFjZW50T3B0aW9uOiBmdW5jdGlvbihkaXIpIHtcblx0XHRcblx0XHRpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiAnJ1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBvcHMgPSB0aGlzLmZpbHRlck9wdGlvbnMoKTtcblx0XHRcblx0XHRpZiAoIW9wcy5sZW5ndGgpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0XG5cdFx0dmFyIGZvY3VzZWRJbmRleCA9IC0xO1xuXHRcdFxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3BzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5mb2N1c2VkT3B0aW9uID09PSBvcHNbaV0pIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gaTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBmb2N1c2VkT3B0aW9uID0gb3BzWzBdO1xuXHRcdFxuXHRcdGlmIChkaXIgPT09ICduZXh0JyAmJiBmb2N1c2VkSW5kZXggPiAtMSAmJiBmb2N1c2VkSW5kZXggPCBvcHMubGVuZ3RoIC0gMSkge1xuXHRcdFx0Zm9jdXNlZE9wdGlvbiA9IG9wc1tmb2N1c2VkSW5kZXggKyAxXTtcblx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3ByZXZpb3VzJykge1xuXHRcdFx0aWYgKGZvY3VzZWRJbmRleCA+IDApIHtcblx0XHRcdFx0Zm9jdXNlZE9wdGlvbiA9IG9wc1tmb2N1c2VkSW5kZXggLSAxXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb24gPSBvcHNbb3BzLmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZvY3VzZWRPcHRpb246IGZvY3VzZWRPcHRpb25cblx0XHR9KTtcblx0XHRcblx0fSxcblx0XG5cdGZpbHRlck9wdGlvbnM6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBfLmZpbHRlcih0aGlzLnByb3BzLm9wdGlvbnMsIHRoaXMuZmlsdGVyT3B0aW9uLCB0aGlzKTtcblx0fSxcblx0XG5cdGZpbHRlck9wdGlvbjogZnVuY3Rpb24ob3ApIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0IXRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuXHRcdFx0fHwgb3AudmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpKSA+PSAwXG5cdFx0XHR8fCBvcC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zdGF0ZS5pbnB1dFZhbHVlLnRvTG93ZXJDYXNlKCkpID49IDBcblx0XHQpO1xuXHR9LFxuXHRcblx0Z2V0T3B0aW9uczogZnVuY3Rpb24oKSB7XG5cdFx0XG5cdFx0dmFyIG9wcyA9IHt9O1xuXHRcdFxuXHRcdF8uZWFjaCh0aGlzLmZpbHRlck9wdGlvbnMoKSwgZnVuY3Rpb24ob3ApIHtcblx0XHRcdFxuXHRcdFx0dmFyIG9wdGlvbkNsYXNzID0gY2xhc3Nlcyh7XG5cdFx0XHRcdCdTZWxlY3Qtb3B0aW9uJzogdHJ1ZSxcblx0XHRcdFx0J2lzLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24gPT09IG9wXG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0dmFyIG1vdXNlRW50ZXIgPSB0aGlzLmZvY3VzT3B0aW9uLmJpbmQodGhpcywgb3ApLFxuXHRcdFx0XHRtb3VzZUxlYXZlID0gdGhpcy51bmZvY3VzT3B0aW9uLmJpbmQodGhpcywgb3ApLFxuXHRcdFx0XHRtb3VzZURvd24gPSB0aGlzLnNlbGVjdE9wdGlvbi5iaW5kKHRoaXMsIG9wKTtcblx0XHRcdFxuXHRcdFx0b3BzW29wLnZhbHVlXSA9IFJlYWN0LkRPTS5kaXYoe1xuXHRcdFx0XHRjbGFzc05hbWU6IG9wdGlvbkNsYXNzLFxuXHRcdFx0XHRvbk1vdXNlRW50ZXI6IG1vdXNlRW50ZXIsXG5cdFx0XHRcdG9uTW91c2VMZWF2ZTogbW91c2VMZWF2ZSxcblx0XHRcdFx0b25Nb3VzZURvd246IG1vdXNlRG93blxuXHRcdFx0fSwgb3AubGFiZWwpO1xuXHRcdFx0XG5cdFx0fSwgdGhpcyk7XG5cdFx0XG5cdFx0aWYgKF8uaXNFbXB0eShvcHMpKSB7XG5cdFx0XHRvcHMuX25vX29wcyA9IFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJTZWxlY3Qtbm9yZXN1bHRzXCJ9LCBcIk5vIHJlc3VsdHMgZm91bmRcIik7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBvcHM7XG5cdFx0XG5cdH0sXG5cdFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdGxvZ0V2ZW50KCdyZW5kZXInKTtcblx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcblx0XHRcblx0XHR2YXIgbWVudSA9IHRoaXMuc3RhdGUuaXNPcGVuID8gUmVhY3QuRE9NLmRpdih7IGNsYXNzTmFtZTogXCJTZWxlY3QtbWVudVwiIH0sIHRoaXMuZ2V0T3B0aW9ucygpKSA6IG51bGw7XG5cdFx0dmFyIGNsZWFyID0gdGhpcy5zdGF0ZS52YWx1ZSA/IFJlYWN0LkRPTS5zcGFuKHsgY2xhc3NOYW1lOiBcIlNlbGVjdC1jbGVhclwiLCBvbkNsaWNrOiB0aGlzLmNsZWFyVmFsdWUgfSwgXCLDl1wiKSA6IG51bGw7XG5cdFx0XG5cdFx0dmFyIHNlbGVjdENsYXNzID0gY2xhc3NlcygnU2VsZWN0Jywge1xuXHRcdFx0J2lzLW9wZW4nOiB0aGlzLnN0YXRlLmlzT3Blbixcblx0XHRcdCdpcy1mb2N1c2VkJzogdGhpcy5zdGF0ZS5pc0ZvY3VzZWRcblx0XHR9KTtcblx0XHRcblx0XHRyZXR1cm4gUmVhY3QuRE9NLmRpdih7IGNsYXNzTmFtZTogc2VsZWN0Q2xhc3MgfSwgXG5cdFx0XHRSZWFjdC5ET00uaW5wdXQoeyB0eXBlOiBcImhpZGRlblwiLCByZWY6IFwidmFsdWVcIiwgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSB9KSwgXG5cdFx0XHRSZWFjdC5ET00uZGl2KHsgY2xhc3NOYW1lOiBcIlNlbGVjdC1jb250cm9sXCIsIHRhYkluZGV4OiBcIi0xXCIsIHJlZjogXCJjb250cm9sXCIsIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLCBvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVNb3VzZURvd24sIG9uRm9jdXM6IHRoaXMuaGFuZGxlRm9jdXMsIG9uQmx1cjogdGhpcy5oYW5kbGVCbHVyIH0sIFxuXHRcdFx0XHRSZWFjdC5ET00uaW5wdXQoeyBjbGFzc05hbWU6IFwiU2VsZWN0LWlucHV0XCIsIHBsYWNlaG9sZGVyOiB0aGlzLnN0YXRlLnBsYWNlaG9sZGVyLCByZWY6IFwiaW5wdXRcIiwgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlSW5wdXRNb3VzZURvd24sIHZhbHVlOiB0aGlzLnN0YXRlLmlucHV0VmFsdWUsIG9uRm9jdXM6IHRoaXMuaGFuZGxlSW5wdXRGb2N1cywgb25CbHVyOiB0aGlzLmhhbmRsZUlucHV0Qmx1ciwgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgfSksIFxuXHRcdFx0XHRjbGVhclxuXHRcdFx0KSwgXG5cdFx0XHRtZW51XG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcbiJdfQ==
