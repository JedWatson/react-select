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
			isOpen: false,
			isLoading: false
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
		
		var menu = this.state.isOpen ? React.DOM.div({ className: "Select-menu" }, this.getOptions()) : null;
		var loading = this.stat.isLoading ? React.DOM.span({ className: "Select-loading" }) : null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9KZWQvRGV2ZWxvcG1lbnQvUGFja2FnZXMvcmVhY3Qtc2VsZWN0L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2xpYi9zZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyksXG5cdFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuXG52YXIgbG9nRXZlbnQgPSBmdW5jdGlvbihtc2cpIHtcblx0Y29uc29sZS5sb2cobXNnKTtcbn07XG5cbi8vIGNvbW1lbnQgb3V0IHRoaXMgbGluZSB0byBkZWJ1ZyB0aGUgY29udHJvbCBzdGF0ZVxubG9nRXZlbnQgPSBub29wO1xuXG52YXIgY2xhc3NlcyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgcnRuID0gW107XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKCdzdHJpbmcnID09PSB0eXBlb2YgYXJndW1lbnRzW2ldKSB7XG5cdFx0XHRydG4ucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdH0gZWxzZSBpZiAoXy5pc09iamVjdChhcmd1bWVudHNbaV0pKSB7XG5cdFx0XHRfLmVhY2goYXJndW1lbnRzW2ldLCBmdW5jdGlvbih2YWwsIGtleSkge1xuXHRcdFx0XHRpZiAodmFsKSB7XG5cdFx0XHRcdFx0cnRuLnB1c2goa2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBydG4uam9pbignICcpIHx8IHVuZGVmaW5lZDtcbn1cblxudmFyIFNlbGVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdHBsYWNlaG9sZGVyOiAnJyxcblx0XHRcdGZvY3VzZWRPcHRpb246IG51bGwsXG5cdFx0XHRpc0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdGlzTG9hZGluZzogZmFsc2Vcblx0XHR9O1xuXHR9LFxuXHRcblx0Y29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnNldFN0YXRlKHRoaXMuZ2V0U3RhdGVGcm9tVmFsdWUodGhpcy5zdGF0ZS52YWx1ZSkpO1xuXHR9LFxuXHRcblx0Z2V0U3RhdGVGcm9tVmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0dmFyIHNlbGVjdGVkT3B0aW9uID0gKCdzdHJpbmcnID09PSB0eXBlb2YgdmFsdWUpID8gXy5maW5kV2hlcmUodGhpcy5wcm9wcy5vcHRpb25zLCB7IHZhbHVlOiB2YWx1ZSB9KSA6IHZhbHVlO1xuXHRcdHJldHVybiBzZWxlY3RlZE9wdGlvbiA/IHtcblx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdGlucHV0VmFsdWU6IHNlbGVjdGVkT3B0aW9uLmxhYmVsLFxuXHRcdFx0cGxhY2Vob2xkZXI6IHNlbGVjdGVkT3B0aW9uLmxhYmVsLFxuXHRcdFx0Zm9jdXNlZE9wdGlvbjogc2VsZWN0ZWRPcHRpb25cblx0XHR9IDoge1xuXHRcdFx0dmFsdWU6ICcnLFxuXHRcdFx0aW5wdXRWYWx1ZTogJycsXG5cdFx0XHRwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCAnU2VsZWN0Li4uJyxcblx0XHRcdGZvY3VzZWRPcHRpb246IG51bGxcblx0XHR9O1xuXHR9LFxuXHRcblx0a2V5Ym9hcmRBY3Rpb25zOiB7XG5cdFx0MTM6ICdzZWxlY3RGb2N1c2VkT3B0aW9uJyxcblx0XHQyNzogJ2Nsb3NlT25Fc2NhcGUnLFxuXHRcdDM4OiAnZm9jdXNQcmV2aW91c09wdGlvbicsXG5cdFx0NDA6ICdmb2N1c05leHRPcHRpb24nXG5cdH0sXG5cdFxuXHRoYW5kbGVLZXlEb3duOiBmdW5jdGlvbihldmVudCkge1xuXHRcdGxvZ0V2ZW50KCctLS0tLS0nKTtcblx0XHRsb2dFdmVudChldmVudCk7XG5cdFx0dmFyIGFjdGlvbiA9IHRoaXMua2V5Ym9hcmRBY3Rpb25zW2V2ZW50LmtleUNvZGVdO1xuXHRcdGlmICghYWN0aW9uKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpc1thY3Rpb25dLmNhbGwodGhpcyk7XG5cdH0sXG5cdFxuXHRoYW5kbGVNb3VzZURvd246IGZ1bmN0aW9uKCkge1xuXHRcdGxvZ0V2ZW50KCdjbGljazogY29udHJvbCcpO1xuXHRcdGlmICh0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5fY29udHJvbElzRm9jdXNlZCA9IHRydWU7XG5cdFx0XHR0aGlzLnJlZnMuY29udHJvbC5nZXRET01Ob2RlKCkuZm9jdXMoKTtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLmJsdXJUaW1lcik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnXG5cdFx0XHR9KTtcblx0XHRcdGlmICghdGhpcy5faW5wdXRJc0ZvY3VzZWQpIHtcblx0XHRcdFx0dGhpcy5yZWZzLmlucHV0LmdldERPTU5vZGUoKS5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0XG5cdGhhbmRsZUZvY3VzOiBmdW5jdGlvbigpIHtcblx0XHRpZiAodGhpcy5fY29udHJvbElzRm9jdXNlZCkgcmV0dXJuO1xuXHRcdGxvZ0V2ZW50KCdmb2N1czogY29udHJvbCcpO1xuXHRcdHRoaXMuX2NvbnRyb2xJc0ZvY3VzZWQgPSB0cnVlO1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLmJsdXJUaW1lcik7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5faW5wdXRJc0ZvY3VzZWQpIHtcblx0XHRcdFx0dGhpcy5yZWZzLmlucHV0LmdldERPTU5vZGUoKS5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSwgMCk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc0ZvY3VzZWQ6IHRydWVcblx0XHR9KTtcblx0fSxcblx0XG5cdGhhbmRsZUJsdXI6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLl9jb250cm9sSXNGb2N1c2VkKSByZXR1cm47XG5cdFx0dGhpcy5fY29udHJvbElzRm9jdXNlZCA9IGZhbHNlO1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLmJsdXJUaW1lcik7XG5cdFx0dGhpcy5ibHVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0bG9nRXZlbnQoJ2JsdXI6IGNvbnRyb2wnKTtcblx0XHRcdHZhciBibHVyU3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVZhbHVlKHRoaXMuc3RhdGUudmFsdWUpO1xuXHRcdFx0Ymx1clN0YXRlLmlzRm9jdXNlZCA9IGZhbHNlO1xuXHRcdFx0Ymx1clN0YXRlLmlzT3BlbiA9IGZhbHNlO1xuXHRcdFx0dGhpcy5zZXRTdGF0ZShibHVyU3RhdGUpO1xuXHRcdH0uYmluZCh0aGlzKSwgMTAwKTtcblx0fSxcblx0XG5cdGhhbmRsZUlucHV0TW91c2VEb3duOiBmdW5jdGlvbihldmVudCkge1xuXHRcdGlmICh0aGlzLl9pbnB1dElzRm9jdXNlZCkge1xuXHRcdFx0bG9nRXZlbnQoJ2NsaWNrOiBpbnB1dCcpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHR9LFxuXHRcblx0aGFuZGxlSW5wdXRGb2N1czogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRsb2dFdmVudCgnZm9jdXM6IGlucHV0Jyk7XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuYmx1clRpbWVyKTtcblx0XHR0aGlzLl9pbnB1dElzRm9jdXNlZCA9IHRydWU7XG5cdH0sXG5cdFxuXHRoYW5kbGVJbnB1dEJsdXI6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0bG9nRXZlbnQoJ2JsdXI6IGlucHV0Jyk7XG5cdFx0dGhpcy5faW5wdXRJc0ZvY3VzZWQgPSBmYWxzZTtcblx0fSxcblx0XG5cdGhhbmRsZUlucHV0Q2hhbmdlOiBmdW5jdGlvbihldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0aW5wdXRWYWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlXG5cdFx0fSk7XG5cdH0sXG5cdFxuXHRzZWxlY3RPcHRpb246IGZ1bmN0aW9uKG9wdGlvbikge1xuXHRcdHRoaXMuc2V0VmFsdWUob3B0aW9uKTtcblx0XHR0aGlzLnJlZnMuY29udHJvbC5nZXRET01Ob2RlKCkuZm9jdXMoKTtcblx0fSxcblx0XG5cdHNldFZhbHVlOiBmdW5jdGlvbihvcHRpb24pIHtcblx0XHR2YXIgbmV3U3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVZhbHVlKG9wdGlvbik7XG5cdFx0bmV3U3RhdGUuaXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cdH0sXG5cdFxuXHRzZWxlY3RGb2N1c2VkT3B0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRWYWx1ZSh0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24pO1xuXHR9LFxuXHRcblx0Y2xlYXJWYWx1ZTogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRsb2dFdmVudCgnY2xlYXIgdmFsdWUnKTtcblx0XHR0aGlzLnNldFZhbHVlKG51bGwpO1xuXHR9LFxuXHRcblx0Y2xvc2VPbkVzY2FwZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5zZXRWYWx1ZSh0aGlzLnN0YXRlLnZhbHVlKTtcblx0fSxcblx0XG5cdGZvY3VzT3B0aW9uOiBmdW5jdGlvbihvcCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Zm9jdXNlZE9wdGlvbjogb3Bcblx0XHR9KTtcblx0fSxcblx0XG5cdHVuZm9jdXNPcHRpb246IGZ1bmN0aW9uKG9wKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbiA9PT0gb3ApIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uOiBudWxsXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cdFxuXHRmb2N1c05leHRPcHRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignbmV4dCcpO1xuXHR9LFxuXHRcblx0Zm9jdXNQcmV2aW91c09wdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwcmV2aW91cycpO1xuXHR9LFxuXHRcblx0Zm9jdXNBZGphY2VudE9wdGlvbjogZnVuY3Rpb24oZGlyKSB7XG5cdFx0XG5cdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdFx0aW5wdXRWYWx1ZTogJydcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHR2YXIgb3BzID0gdGhpcy5maWx0ZXJPcHRpb25zKCk7XG5cdFx0XG5cdFx0aWYgKCFvcHMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBmb2N1c2VkSW5kZXggPSAtMTtcblx0XHRcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9wcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbiA9PT0gb3BzW2ldKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IGk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHR2YXIgZm9jdXNlZE9wdGlvbiA9IG9wc1swXTtcblx0XHRcblx0XHRpZiAoZGlyID09PSAnbmV4dCcgJiYgZm9jdXNlZEluZGV4ID4gLTEgJiYgZm9jdXNlZEluZGV4IDwgb3BzLmxlbmd0aCAtIDEpIHtcblx0XHRcdGZvY3VzZWRPcHRpb24gPSBvcHNbZm9jdXNlZEluZGV4ICsgMV07XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwcmV2aW91cycpIHtcblx0XHRcdGlmIChmb2N1c2VkSW5kZXggPiAwKSB7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb24gPSBvcHNbZm9jdXNlZEluZGV4IC0gMV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uID0gb3BzW29wcy5sZW5ndGggLSAxXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBmb2N1c2VkT3B0aW9uXG5cdFx0fSk7XG5cdFx0XG5cdH0sXG5cdFxuXHRmaWx0ZXJPcHRpb25zOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gXy5maWx0ZXIodGhpcy5wcm9wcy5vcHRpb25zLCB0aGlzLmZpbHRlck9wdGlvbiwgdGhpcyk7XG5cdH0sXG5cdFxuXHRmaWx0ZXJPcHRpb246IGZ1bmN0aW9uKG9wKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdCF0aGlzLnN0YXRlLmlucHV0VmFsdWVcblx0XHRcdHx8IG9wLnZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnN0YXRlLmlucHV0VmFsdWUudG9Mb3dlckNhc2UoKSkgPj0gMFxuXHRcdFx0fHwgb3AubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpKSA+PSAwXG5cdFx0KTtcblx0fSxcblx0XG5cdGdldE9wdGlvbnM6IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdHZhciBvcHMgPSB7fTtcblx0XHRcblx0XHRfLmVhY2godGhpcy5maWx0ZXJPcHRpb25zKCksIGZ1bmN0aW9uKG9wKSB7XG5cdFx0XHRcblx0XHRcdHZhciBvcHRpb25DbGFzcyA9IGNsYXNzZXMoe1xuXHRcdFx0XHQnU2VsZWN0LW9wdGlvbic6IHRydWUsXG5cdFx0XHRcdCdpcy1mb2N1c2VkJzogdGhpcy5zdGF0ZS5mb2N1c2VkT3B0aW9uID09PSBvcFxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHZhciBtb3VzZUVudGVyID0gdGhpcy5mb2N1c09wdGlvbi5iaW5kKHRoaXMsIG9wKSxcblx0XHRcdFx0bW91c2VMZWF2ZSA9IHRoaXMudW5mb2N1c09wdGlvbi5iaW5kKHRoaXMsIG9wKSxcblx0XHRcdFx0bW91c2VEb3duID0gdGhpcy5zZWxlY3RPcHRpb24uYmluZCh0aGlzLCBvcCk7XG5cdFx0XHRcblx0XHRcdG9wc1tvcC52YWx1ZV0gPSBSZWFjdC5ET00uZGl2KHtcblx0XHRcdFx0Y2xhc3NOYW1lOiBvcHRpb25DbGFzcyxcblx0XHRcdFx0b25Nb3VzZUVudGVyOiBtb3VzZUVudGVyLFxuXHRcdFx0XHRvbk1vdXNlTGVhdmU6IG1vdXNlTGVhdmUsXG5cdFx0XHRcdG9uTW91c2VEb3duOiBtb3VzZURvd25cblx0XHRcdH0sIG9wLmxhYmVsKTtcblx0XHRcdFxuXHRcdH0sIHRoaXMpO1xuXHRcdFxuXHRcdGlmIChfLmlzRW1wdHkob3BzKSkge1xuXHRcdFx0b3BzLl9ub19vcHMgPSBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiU2VsZWN0LW5vcmVzdWx0c1wifSwgXCJObyByZXN1bHRzIGZvdW5kXCIpO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gb3BzO1xuXHRcdFxuXHR9LFxuXHRcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcblx0XHRsb2dFdmVudCgncmVuZGVyJyk7XG5cdFx0XG5cdFx0dmFyIG1lbnUgPSB0aGlzLnN0YXRlLmlzT3BlbiA/IFJlYWN0LkRPTS5kaXYoeyBjbGFzc05hbWU6IFwiU2VsZWN0LW1lbnVcIiB9LCB0aGlzLmdldE9wdGlvbnMoKSkgOiBudWxsO1xuXHRcdHZhciBsb2FkaW5nID0gdGhpcy5zdGF0LmlzTG9hZGluZyA/IFJlYWN0LkRPTS5zcGFuKHsgY2xhc3NOYW1lOiBcIlNlbGVjdC1sb2FkaW5nXCIgfSkgOiBudWxsO1xuXHRcdHZhciBjbGVhciA9IHRoaXMuc3RhdGUudmFsdWUgPyBSZWFjdC5ET00uc3Bhbih7IGNsYXNzTmFtZTogXCJTZWxlY3QtY2xlYXJcIiwgb25DbGljazogdGhpcy5jbGVhclZhbHVlLCBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6ICcmdGltZXM7JyB9IH0pIDogbnVsbDtcblx0XHRcblx0XHR2YXIgc2VsZWN0Q2xhc3MgPSBjbGFzc2VzKCdTZWxlY3QnLCB7XG5cdFx0XHQnaXMtb3Blbic6IHRoaXMuc3RhdGUuaXNPcGVuLFxuXHRcdFx0J2lzLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmlzRm9jdXNlZFxuXHRcdH0pO1xuXHRcdFxuXHRcdHJldHVybiBSZWFjdC5ET00uZGl2KHsgY2xhc3NOYW1lOiBzZWxlY3RDbGFzcyB9LCBcblx0XHRcdFJlYWN0LkRPTS5pbnB1dCh7IHR5cGU6IFwiaGlkZGVuXCIsIHJlZjogXCJ2YWx1ZVwiLCBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlIH0pLCBcblx0XHRcdFJlYWN0LkRPTS5kaXYoeyBjbGFzc05hbWU6IFwiU2VsZWN0LWNvbnRyb2xcIiwgdGFiSW5kZXg6IFwiLTFcIiwgcmVmOiBcImNvbnRyb2xcIiwgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sIG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZU1vdXNlRG93biwgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cywgb25CbHVyOiB0aGlzLmhhbmRsZUJsdXIgfSwgXG5cdFx0XHRcdFJlYWN0LkRPTS5pbnB1dCh7IGNsYXNzTmFtZTogXCJTZWxlY3QtaW5wdXRcIiwgcGxhY2Vob2xkZXI6IHRoaXMuc3RhdGUucGxhY2Vob2xkZXIsIHJlZjogXCJpbnB1dFwiLCBvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVJbnB1dE1vdXNlRG93biwgdmFsdWU6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSwgb25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLCBvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXRCbHVyLCBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSB9KSwgXG5cdFx0XHRcdFJlYWN0LkRPTS5zcGFuKHsgY2xhc3NOYW1lOiBcIlNlbGVjdC1hcnJvd1wiIH0pLFxuXHRcdFx0XHRsb2FkaW5nLFxuXHRcdFx0XHRjbGVhclxuXHRcdFx0KSwgXG5cdFx0XHRtZW51XG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcbiJdfQ==
